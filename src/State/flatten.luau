--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Flattens a used as value until it reaches a constant state object.
]]

local Package = script.Parent.Parent
local External = require(Package.External)
local Types = require(Package.Types)
-- State
local isState = require(Package.State.isState)
local peek = require(Package.State.peek)

-- How long should this function run before it's considered to be in an infinite
-- cycle and error out?
local TERMINATION_TIME = 1

local function flatten<T>(target: Types.UsedAs<T>, use: Types.Use?): T
	local use: Types.Use = use or peek
	local terminateBy = os.clock() + TERMINATION_TIME
	while isState(target) do
		if os.clock() > terminateBy then
			External.logError("infiniteLoop")
		end
		target = use(target)
	end
	return target :: T
end

return flatten
