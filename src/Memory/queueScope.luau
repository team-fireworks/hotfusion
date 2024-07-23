--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Appends items to the scope. This is useful for adding destruction tasks with
	ease, such as script connections, which often is `table.insert`ed directly 
	into a scope. This also returns the queued items, allowing it to be used in
	declarations.
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)
local External = require(Package.External)

-- Dictates how to manage tasks that are queued several times. overrideEarliest
-- preserves the earliest task that has been added, while overrideLatest
-- removes older tasks, and dontOverride disallows queuing multiple times.
local OVERRIDE_MODE: "dontOverride" | "overrideEarliest" | "overrideLatest" = "dontOverride"

local function queueScope<T...>(scope: Types.Scope<unknown>, ...: T...): T...
	local size = select("#", ...)
	for index = 1, size do
		local queued = select(index, ...)
		local foundIndex = table.find(scope, queued)
		if foundIndex ~= nil then
			if OVERRIDE_MODE == "dontOverride" then
				External.logError("queuedTwice")
			elseif OVERRIDE_MODE == "overrideEarliest" then
				continue
			else
				table.remove(scope, foundIndex)
			end
		end
		table.insert(scope, queued)
	end
	return ...
end

return queueScope
