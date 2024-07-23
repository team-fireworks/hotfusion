local Package = script.Parent.Parent
local Types = require(Package.Types)
-- State
local Computed = require(Package.State.Computed)

local function Switch<TI, TO, S>(scope: Types.Scope<S>, target: Types.UsedAs<TI>)
	return function(
		cases: { [TI]: (Types.Use, Types.Scope<S>) -> TO, _: ((Types.Use, Types.Scope<S>) -> TO)? }
	): Types.StateObject<TO?>
		return Computed(scope, function(use, scope): TO?
			local target = use(target)
			if cases[target] then
				return cases[target](use, scope)
			elseif cases._ then
				return cases._(use, scope)
			else
				return nil
			end
		end)
	end
end

return Switch
