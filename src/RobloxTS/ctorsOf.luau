--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Constructs and returns a new namespace with constructors that have a scope
	be silently passed in as the first parameter.

	This method is utterly useless in Luau. Rather, it serves to fulfill
	roblox-ts by allowing scopable functions to be destructured and used with
	ease.
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)

local function constructorsOf(scope: Types.Scope<unknown>, target: { [unknown]: unknown }): { [unknown]: unknown }
	local methods: { [unknown]: unknown } = {}
	for key, value in pairs(target) do
		if typeof(value) ~= "function" then
			methods[key] = value
			continue
		end
		local constructor = value :: (Types.Scope<unknown>, ...unknown) -> ...unknown
		methods[key] = function(...: unknown)
			return constructor(scope, ...)
		end
	end
	return methods
end

return constructorsOf
