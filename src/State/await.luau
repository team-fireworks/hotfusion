--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Yields the current running thread until the given state propagates a change.
	Returns the value of said change, allowing this to be used in declarations.
]]

local Package = script.Parent.Parent
local External = require(Package.External)
local Types = require(Package.Types)
local InternalTypes = require(Package.InternalTypes)
-- State
local Observer = require(Package.State.Observer)
local isState = require(Package.State.isState)

local function await<T>(
	target: Types.UsedAs<T>
): T
	if not isState(target) then
		return target :: T
	end
	local awaiting = target :: InternalTypes.StateObject<T>
	local runningThread = coroutine.running()
	local scope = awaiting.scope :: Types.Scope<unknown>
	Observer(scope, awaiting):once(function()
		External.doTaskImmediate(function()
			coroutine.resume(runningThread, awaiting:_peek())
		end)
	end)
	return coroutine.yield()
end

return await