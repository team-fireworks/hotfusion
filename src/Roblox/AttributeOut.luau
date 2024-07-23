--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	A special key for property tables, which allows users to save instance attributes
	into state objects
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)
local External = require(Package.External)

local keyCache: { [string]: Types.SpecialKey } = {}

local function AttributeOut(attributeName: string): Types.SpecialKey
	local key = keyCache[attributeName]
	if key == nil then
		key = {
			type = "SpecialKey",
			kind = "AttributeOut",
			stage = "observer",
			apply = function(self: Types.SpecialKey, scope: Types.Scope<unknown>, value: unknown, applyTo: Instance)
				local event = applyTo:GetAttributeChangedSignal(attributeName)

				if typeof(value) ~= "function" then
					External.logError("invalidAttributeOutType")
				end
				local setValue = value :: Types.ValueSetter
				setValue((applyTo :: any):GetAttribute(attributeName))
				table.insert(
					scope,
					event:Connect(function()
						setValue((applyTo :: any):GetAttribute(attributeName))
					end)
				)
			end,
		}
		keyCache[attributeName] = key
	end
	return key
end

return AttributeOut
