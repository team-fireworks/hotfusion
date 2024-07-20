import Hotfusion from "."
import {type Computed, methodsOf, scoped, NewJSX} from "."

export = () => {
	const scope = scoped(Hotfusion)
	const {Computed, Value} = methodsOf(scope, Hotfusion)
	const test = Value(true)
	return (
		<frame Scope={scope} Name="What">
			<textlabel
				Scope={scope}
				Text={
					Computed((use, scope) => {
						return use(test) ? "Hi" : "nil"
					}) as Computed<string>
				}
			></textlabel>
		</frame>
	)
}
