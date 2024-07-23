--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Cleans up the tasks passed in as the arguments.
	A task can be any of the following:

	- an Instance - will be destroyed
	- a function - will be run
	- a Connection - will be disconnected
	- a thread - will be closed
	- a Promise - will be cancelled
	- a table with a `Destroy` or `destroy` function - will be called
	- an array - `cleanup` will be called on each item
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)
local External = require(Package.External)

type Connection = { Connected: boolean, Disconnect: (self: Connection) -> () }
type Promise = { getStatus: (self: Promise) -> string, cancel: (self: Promise) -> () }

local GENERIC_CLEANUP_METHODS = {
	"destroy",
	"Destroy",
	"disconnect",
	"Disconnect",
}

local alreadyDestroying: { [Types.Task]: true } = {}

local function castToConnection(x: unknown): Connection?
	if typeof(x) == "RBXScriptConnection" then
		return x :: any
	elseif typeof(x) == "table" then
		local x = x :: { [unknown]: unknown }
		if typeof(x.Connected) == "boolean" and typeof(x.Disconnect) == "function" then
			return x :: Connection
		end
	end
	return nil
end

local function castToPromise(x: unknown): Promise?
	if typeof(x) == "table" then
		local x = x :: { [unknown]: unknown }
		if typeof(x.getStatus) == "function" and typeof(x.cancel) == "function" then
			return x :: Promise
		end
	end
	return nil
end

local function doCleanup(task: Types.Task): ()
	if alreadyDestroying[task] then
		return External.logError("destroyedTwice")
	end
	alreadyDestroying[task] = true

	-- case 1: Instance
	if typeof(task) == "Instance" then
		task:Destroy()

	-- case 2: callback
	elseif typeof(task) == "function" then
		task()

	-- case 3: Connection
	elseif castToConnection(task) then
		local task = task :: Connection
		if task.Connected == true then
			task:Disconnect()
		end

	-- case 4: threads
	elseif typeof(task) == "thread" then
		local cancelled = false
		if task ~= coroutine.running() then
			cancelled = coroutine.close(task)
		end
		if not cancelled then
			local toCancel = task
			External.doTaskDeferred(function()
				coroutine.close(toCancel)
			end)
		end

	-- case 5: Promise
	elseif castToPromise(task) then
		local task = task :: Promise
		if task:getStatus() == "Started" then
			task:cancel()
		end
	elseif typeof(task) == "table" then
		local task: { [unknown]: unknown } = task :: any

		local destroyed = false
		for _, method in ipairs(GENERIC_CLEANUP_METHODS) do
			if typeof(task[method]) == "function" then
				-- case 6: destructor method
				local destructor = task[method] :: (self: typeof(task)) -> ()
				destroyed = pcall(destructor, task)
				break
			end
		end

		-- case 8: array of tasks
		if not destroyed and task[1] ~= nil then
			local task = task :: { Types.Task }
			-- It is important to iterate backwards through the table, since
			-- objects are added in order of construction.
			for index = #task, 1, -1 do
				doCleanup(task[index])
				task[index] = nil
			end
		end
	end

	alreadyDestroying[task] = nil
end

return doCleanup
