--!strict
--!nolint LocalUnused
--!nolint LocalShadow

--[[
	TEAM FIREWORKS NOTE: no upstream
	Lune implementation for Fusion's abstract provider layer.
]]

local task = require("@lune/task")
local stdio = require("@lune/stdio")

local Package = script.Parent.Parent
local External = require(Package.External)

local LuneExternal = {}

LuneExternal.policies = {
	allowWebLinks = true
}

--[[
   Sends an immediate task to the external provider. Throws if none is set.
]]
function LuneExternal.doTaskImmediate(resume: () -> ())
	task.spawn(resume)
end

--[[
	Sends a deferred task to the external provider. Throws if none is set.
]]
function LuneExternal.doTaskDeferred(resume: () -> ())
	task.defer(resume)
end

--[[
	Errors in a different thread to preserve the flow of execution.
]]
function LuneExternal.logErrorNonFatal(errorString: string)
	stdio.ewrite("\n" .. errorString)
end

--[[
	Shows a warning message in the output.
]]
local WARN_STYLE = stdio.color("yellow") .. stdio.style("bold")
local RESET_STYLE = stdio.color("reset") .. stdio.style("reset")
function LuneExternal.logWarn(errorString: string)
	stdio.write(WARN_STYLE .. errorString .. RESET_STYLE)
end

--[[
	Sends an update step to Fusion using the system clock time.
]]
local function performUpdateStep()
	External.performUpdateStep(os.clock())
end

--[[
	Binds Fusion's update step to a scheduler thread.
	TODO: i refuse to believe this is the best way to do this 💀
]]
local schedulerThread: thread? = nil
function LuneExternal.startScheduler()
	if schedulerThread then
		return
	end
	schedulerThread = task.spawn(function()
		while task.wait() do
			performUpdateStep()
		end
	end)
end

--[[
	Stops the scheduler thread.
]]
function LuneExternal.stopScheduler()
	if schedulerThread ~= nil then
		local success = pcall(task.cancel, schedulerThread)
		if success then
			schedulerThread = nil
		end
	end
end

return LuneExternal
