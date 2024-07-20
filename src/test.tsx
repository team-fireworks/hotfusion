import Hotfusion from "."
import {type Computed, methodsOf, scoped, Markup} from "."

export = () => {
	const scope = scoped(Hotfusion)
	const {Computed, Value} = methodsOf(scope, Hotfusion)
	const test = Value(true)
	return (
		<frame Scope={scope} Name="What">
			<textlabel
				Scope={scope}
				Text={
					Computed((use, scope): string => {
						return use(test) ? "Hi" : "nil"
					}) as Computed<string>
				}
			></textlabel>
		</frame>
	)
}
