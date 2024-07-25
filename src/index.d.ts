import * as Types from "./Types"

/**
 * The entry point to the Fusion library.
 */
export = Hotfusion
export as namespace Hotfusion
declare namespace Hotfusion {
	export type Animatable = Types.Animatable
	export type UsedAs<T> = Types.UsedAs<T>
	export type Child = Types.Child
	export type Computed<T> = Types.Computed<T>
	export type Constructors = Types.Constructors
	export type Contextual<T> = Types.Contextual<T>
	export type Dependency = Types.Dependency
	export type Dependent = Types.Dependent
	export type For<KO, VO> = Types.For<KO, VO>
	export type Observer = Types.Observer
	export type PropertyTable = Types.PropertyTable<Instance>
	export type Scope<Constructors> = Types.Scope<Constructors>
	export type ScopedObject = Types.ScopedObject
	export type SpecialKey = Types.SpecialKey
	export type Spring<T> = Types.Spring<T>
	export type StateObject<T> = Types.StateObject<T>
	export type Task = Types.Task
	export type Tween<T> = Types.Tween<T>
	export type Use = Types.Use
	export type Value<T, S = T> = Types.Value<T, S>
	export type Version = Types.Version

	export const version: Version

	/* Memory */
	/** @deprecated use `doCleanup()` instead */
	export const cleanup: (task: Task) => void
	export const deriveScope: Types.DeriveScopeConstructor
	export const doCleanup: (task: Task) => void
	export const innerScope: Types.DeriveScopeConstructor
	export const queueScope: <T extends Task[]>(scope: Scope<unknown>, ...tasks: T) => LuaTuple<T>
	export const scoped: Types.ScopedConstructor

	/* State */
	export const expect: Types.Use
	export const flatten: Types.Flatten
	export const Computed: Types.ComputedConstructor
	export const Contextual: Types.ContextualConstructor
	export const ForKeys: Types.ForKeysConstructor
	export const ForPairs: Types.ForPairsConstructor
	export const ForValues: Types.ForValuesConstructor
	export const Observer: Types.ObserverConstructor
	export const peek: Use
	export const Value: Types.ValueConstructor

	/* Components */
	export function Show<T, S>(
		scope: Scope<S>,
		props: {
			when: UsedAs<any>
			component: (use: Use, scope: Scope<S>) => T
		},
	): StateObject<T | undefined>
	export function Show<Component, Fallback, S>(
		scope: Scope<S>,
		props: {
			when: UsedAs<any>
			component: (use: Use, scope: Scope<S>) => Component
			fallback: (use: Use, scope: Scope<S>) => Fallback
		},
	): StateObject<Component | Fallback>
	export const Switch: Types.SwitchConstructor
	export const Safe: Types.SafeConstructor

	/* Roblox */
	export const Attribute: (attributeName: string) => SpecialKey
	export const AttributeChange: (attributeName: string) => SpecialKey
	export const AttributeOut: (attributeName: string) => SpecialKey
	export const Child: (child: Child[]) => Child
	export const Children: Types.Children
	export const Hydrate: Types.HydrateConstructor
	export const New: Types.NewConstructor
	export const OnChange: <T extends string>(propertyName: T) => Types.OnChangeKey<T>
	export const OnEvent: <T extends string>(eventName: T) => Types.OnEventKey<T>
	export const Out: <T extends string>(propertyName: T) => Types.OutKey<T>

	/* TypeScript */
	export const NewJSX: Types.NewJSXConstructor
	export const ctorsOf: Types.ConstructorsOfConstructor

	/* Animation */
	export const Tween: Types.TweenConstructor
	export const Spring: Types.SpringConstructor
}
