import Hotfusion, {type Constructors, type Child, type Scope, NewJSX, ctorsOf, peek} from "@rbxts/hotfusion"

export function Counter(props: {Scope: Scope<object>}): Child {
	const scope = props.Scope
	const {Computed, Value} = ctorsOf(props.Scope, Hotfusion) as Constructors
	const [counter, setCounter] = Value(0)
	return (
		<textbutton
			Scope={scope}
			Text={Computed((use, scope) => {
				return `${use(counter)} clicks`
			})}
			OnEvent:Activated={() => setCounter(peek(counter) + 1)}
		></textbutton>
	)
}
