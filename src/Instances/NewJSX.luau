--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Constructs and returns a new instance, with options for setting properties,
	event handlers and other attributes on the instance right away. This
	function allows for using JSX markup and is designed to be used with
	roblox-ts.
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)
local External = require(Package.External)
local Attribute = require(Package.Instances.Attribute)
local AttributeChange = require(Package.Instances.AttributeChange)
local AttributeOut = require(Package.Instances.AttributeOut)
local Children = require(Package.Instances.Children)
local OnChange = require(Package.Instances.OnChange)
local OnEvent = require(Package.Instances.OnEvent)
local Out = require(Package.Instances.Out)
local applyInstanceProps = require(Package.Instances.applyInstanceProps)
local defaultProps = require(Package.Instances.defaultProps)
local xtypeof = require(Package.Utility.xtypeof)

type Component = (scope: Types.Scope<unknown>, ...unknown) -> Instance
type MaybeSpecialKey = Types.SpecialKey | (string) -> Types.SpecialKey

local SPECIAL_KEY_LOOKUP: {[string]: MaybeSpecialKey} = {
	Attribute = Attribute,
	AttributeChange = AttributeChange,
	AttributeOut = AttributeOut,
	Children = Children,
	OnChange = OnChange,
	OnEvent = OnEvent,
	Out = Out,
}

local function NewJSX(
	component: string | Component,
	props: {[string]: unknown},
	...: Types.Child
): Instance
	local scope = props.Scope :: Types.Scope<unknown>
	if scope == nil then
		External.logError("scopeMissing", nil, "instances using Markup", `myScope:Markup({tostring(component)}, \{ ... })`)
	end
	if typeof(component) == "function" then
		return component(scope, props)
	end
	local className = component:sub(1, 1):upper() .. component:sub(2)
	local ok, instance = pcall(Instance.new, className)
	if not ok then
		External.logError("cannotCreateClass", nil, className)
	end

	local appliedProps: Types.PropertyTable = defaultProps[className] or {}
	for name, value in pairs(props) do
		if typeof(name) ~= "string" then
			return External.logError("unrecognisedPropertyKey", nil, xtypeof(name))
		end

		local colon = string.find(name, ":")
		local specialKey = colon and string.sub(name, 1, colon - 1)
		local specialValue: string = colon and string.sub(name, colon + 1) :: any

		local newKey: Types.SpecialKey?
		local impl = SPECIAL_KEY_LOOKUP[specialKey :: any]
		if impl then
			newKey =
				if typeof(impl) == "function" then
					impl(specialValue)
				else 
					impl
		end

		if newKey then
			appliedProps[newKey] = value
			continue
		end
		appliedProps[name] = value
	end

	table.insert(scope, instance)
	applyInstanceProps(scope, appliedProps, instance)

	return instance
end

return NewJSX