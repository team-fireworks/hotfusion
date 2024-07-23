local Package = script.Parent.Parent
local Types = require(Package.Types)
-- State
local Computed = require(Package.State.Computed)

local function Show<Component, Fallback, S>(
	scope: Types.Scope<S>,
	props: {
		when: Types.UsedAs<any>,
		component: (Types.Use, Types.Scope<S>) -> Component,
		fallback: ((Types.Use, Types.Scope<S>) -> Fallback)?,
	}
): Types.StateObject<Component | Fallback | nil>
	local component, fallback = props.component, props.fallback
	return Computed(scope, function(use, scope): Component | Fallback | nil
		local isTruthy = not not use(props.when)
		if isTruthy then
			return component(use, scope)
		elseif fallback then
			return fallback(use, scope)
		else
			return nil
		end
	end)
end

return Show
