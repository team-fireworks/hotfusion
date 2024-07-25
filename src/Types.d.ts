export type Error = {
	type: "Error"
	raw: string
	message: string
	trace: string
	context?: string
}

/** Types that can be expressed as vectors of numbers, and so can be animated. */
export type Animatable =
	| number
	| CFrame
	| Color3
	| ColorSequenceKeypoint
	| DateTime
	| NumberRange
	| NumberSequenceKeypoint
	| PhysicalProperties
	| Ray
	| Rect
	| Region3
	| Region3int16
	| UDim
	| UDim2
	| Vector2
	| Vector2int16
	| Vector3
	| Vector3int16

/** A task which can be accepted for cleanup. */
export type Task =
	| Instance
	| Callback
	| RBXScriptConnection
	| { Connected: boolean; Disconnect(): void }
	| thread
	| Promise<unknown>
	| { destroy(): void }
	| { Destroy(): void }
	| { disconnect(): void }
	| { Disconnect(): void }
	| Task[]

/** A scope of tasks to clean up. */
export type Scope<Constructors> = Task[] & Constructors

/** An object which uses a scope to dictate how long it lives. */
export interface ScopedObject {
	scope?: Scope<unknown>
	oldestTask: unknown
}

/** Script-readable version information. */
export type Version = {
	major: number
	minor: number
	isRelease: boolean
}

/** An object which stores a value scoped in time. */
export type Contextual<T> = {
	type: "Contextual"
	now(): T
	is(value: T): {
		during<R, A extends unknown[]>(callback: (...args: A) => R, ...args: A): R
	}
}

export type ContextualConstructor = <T>(defaultValue: T) => Contextual<T>

/** Safely runs a function and returns the value it produces. */
export type SafeConstructor = <Success, Fail>(callbacks: {
	try: () => Success
	fallback: (err: unknown) => Fail
}) => Success | Fail

/** Extracts scoped constructors to implicitly pass in the scope */
export type ConstructorsOfConstructor = <Constructors extends object>(
	scope: Scope<unknown>,
	constructors: Constructors,
) => {
	[K in keyof Constructors]: Constructors[K] extends (scope: Scope<unknown>, ...args: infer P) => infer R
		? (...args: P) => R
		: Constructors[K]
}

/** A graph object which can have dependents. */
export interface Dependency extends ScopedObject {
	dependentSet: Set<Dependent>
}

/** A graph object which can have dependencies. */
export interface Dependent extends ScopedObject {
	update(): boolean
	dependencySet: Set<Dependency>
}

/** An object which stores a piece of reactive state. */
export interface StateObject<T> extends Dependency {
	type: "State"
	kind: string
	____phantom_peekType: (arg0: never) => T
}

/** Passing values of this type to `Use` returns `T`. */
export type UsedAs<T> = StateObject<T> | T

/** Function signature for use callbacks. */
export type Use = <T>(target: UsedAs<T>) => T

/** A state object whose value can be set at any time by the user. */
export type Value<T, S = T> = StateObject<T> & {
	kind: "State"
	____phantom_setType: (arg0: never) => S
}

type ValueSetter = <T>(newValue: T, force?: boolean) => T
export type ValueConstructor = <T>(scope: Scope<unknown>, initialValue: T) => LuaTuple<[Value<T, any>, ValueSetter]>

/** A state object whose value is derived from other objects using a callback. */
export type Computed<T> = StateObject<T> &
	Dependent & {
		kind: "Computed"
	}

export type ComputedConstructor = <T, S>(scope: Scope<S>, callback: (use: Use, scope: Scope<S>) => T) => Computed<T>

/** A state object which maps over keys and/or values in another table. */
export type For<KO, VO> = StateObject<Map<KO, VO>> &
	Dependent & {
		kind: "For"
	}

export type ForPairsConstructor = <KI, KO, VI, VO, S>(
	scope: Scope<S>,
	inputTable: UsedAs<Map<KI, VI>>,
	processor: (use: Use, scope: Scope<S>, key: KI, value: VI) => LuaTuple<[KO, VO]>,
) => For<KO, VO>

export type ForKeysConstructor = <KI, KO, V, S>(
	scope: Scope<S>,
	inputTable: UsedAs<Map<KI, V>>,
	processor: (use: Use, scope: Scope<S>, key: KI) => KO,
) => For<KO, V>

export type ForValuesConstructor = <K, VI, VO, S>(
	scope: Scope<S>,
	inputTable: UsedAs<Map<K, VI>>,
	processor: (use: Use, scope: Scope<S>, value: VI) => VO,
) => For<K, VO>

/** An object which can listen for updates on another state object. */
export type Observer = Dependent & {
	type: "Observer"
	listen(callback: () => void): () => void
	subscribe(callback: () => void): () => void
	once(callback: () => void): () => void
}

export type ObserverConstructor = (scope: Scope<unknown>, watching: unknown) => Observer

/** A state object which follows another state object using tweens. */
export type Tween<T> = StateObject<T> &
	Dependent & {
		kind: "Tween"
	}

export type TweenConstructor = <T>(
	scope: Scope<unknown>,
	goalState: UsedAs<T>,
	tweenInfo?: UsedAs<TweenInfo>,
) => Tween<T>

/** A state object which follows another state object using spring simulation. */
export type Spring<T> = StateObject<T> &
	Dependent & {
		kind: "Spring"
		setPosition(newPosition: T): void
		setVelocity(newVelocity: T): void
		addVelocity(deltaVelocity: T): void
	}

export type SpringConstructor = <T>(
	scope: Scope<unknown>,
	goalState: UsedAs<T>,
	speed?: UsedAs<number>,
	damping?: UsedAs<number>,
) => Spring<T>

/** Defines a custom operation to apply to a Roblox instance. */
export interface SpecialKey {
	type: "SpecialKey"
	kind: string
	stage: "self" | "descendants" | "ancestor" | "observer"
	apply(scope: Scope<unknown>, value: unknown, applyTo: Instance): void
}

/** A collection of instances that may be parented to another instance. */
export type Child =
	| Instance
	// specified StateObject as to avoid a circular reference
	| (Dependency & {
			type: "State"
			kind: string
			____phantom_peekType: (arg0: never) => Child
	  })
	| Child[]

export type Children = SpecialKey & SpecialKeyType<"Children">
export type OnChangeKey<T> = SpecialKey & SpecialKeyType<"OnChange", T>
export type OutKey<T> = SpecialKey & SpecialKeyType<"Out", T>
export type OnEventKey<T> = SpecialKey & SpecialKeyType<"OnEvent", T>
type SpecialKeyType<Kind extends string, Subtype = ""> = Subtype extends
	| string
	| number
	| bigint
	| boolean
	| null
	| undefined
	? `${Kind}:${Subtype}`
	: never

/** A table that defines an instance's properties, handlers and children. */
export type PropertyTable<T extends Instance> = Partial<
	{
		[K in keyof WritableInstanceProperties<T>]: UsedAs<WritableInstanceProperties<T>[K]>
	} & {
		[K in InstancePropertyNames<T> as OnChangeKey<K>]: (newValue: T[K]) => void
	} & {
		[K in InstancePropertyNames<T> as OutKey<K>]: ValueSetter
	} & {
		[K in InstanceEventNames<T> as OnEventKey<K>]: T[K] extends RBXScriptSignal<infer C>
			? (...args: Parameters<C>) => void
			: never
	} & Record<Children, Child> &
		Map<SpecialKey, unknown>
>

export type HydrateConstructor = <T extends Instances[keyof Instances]>(
	scope: Scope<unknown>,
	instance: T,
) => (propertyTable: PropertyTable<T>) => T

export type NewConstructor = <T extends keyof CreatableInstances>(
	scope: Scope<unknown>,
	className: T,
) => (propertyTable: PropertyTable<CreatableInstances[T]>) => CreatableInstances[T]

export type NewJSXConstructor = (element: JSX.ElementType, props: defined, children: Child) => Instance

// elttob will be proud

export type Flatten<T extends UsedAs<any> = any> = <U extends T>(
	target: U,
	use?: Use,
) => U extends StateObject<unknown> ? Flatten<U> : U

export type DeriveScopeConstructor = <Existing extends Scope<unknown>, AddMethods extends object[]>(
	existing: Existing,
	...addMethods: AddMethods
) => Scope<{
	[K in keyof Existing | keyof AddMethods[number]]: K extends keyof Existing
		? Existing[K]
		: K extends keyof AddMethods[number]
			? AddMethods[number][K]
			: never
}>

export type ScopedConstructor = <Methods extends object[]>(
	...methods: Methods
) => Scope<{
	[K in keyof Methods[number]]: Methods[number][K]
}>

export type SwitchConstructor = <TI, TO, S>(
	scope: Scope<S>,
	target: UsedAs<TI>,
) => (cases: Map<TI, (use: Use, scope: Scope<S>) => TO>) => StateObject<TO | undefined>

export type Hotfusion = {
	version: Version
	Contextual: ContextualConstructor
	constructorsOf: ConstructorsOfConstructor
	Safe: SafeConstructor

	doCleanup: (...tasks: Task[]) => void
	scoped: ScopedConstructor
	deriveScope: DeriveScopeConstructor
	queueScope: <T extends Task[]>(scope: Scope<unknown>, ...tasks: T) => LuaTuple<T>
	innerScope: DeriveScopeConstructor

	expect: Use
	flatten: Flatten
	peek: Use
	Value: ValueConstructor
	Computed: ComputedConstructor
	ForPairs: ForPairsConstructor
	ForKeys: ForKeysConstructor
	ForValues: ForValuesConstructor
	Observer: ObserverConstructor

	Tween: TweenConstructor
	Spring: SpringConstructor

	New: NewConstructor
	Hydrate: HydrateConstructor

	Child: (x: Child[]) => Child
	Children: Children
	Out: <T extends string>(propertyName: T) => OnChangeKey<T>
	OnEvent: <T extends string>(eventName: T) => OnEventKey<T>
	OnChange: <T extends string>(propertyName: T) => OnChangeKey<T>
	Attribute: (attributeName: string) => SpecialKey
	AttributeChange: (attributeName: string) => SpecialKey
	AttributeOut: (attributeName: string) => SpecialKey
}

/** This preserves generics and omits non-scoped constructors */
export type Constructors = {
	Computed: <T>(callback: (use: Use, scope: Scope<object>) => T) => Computed<T>
	Value: <T>(initialValue: T) => LuaTuple<[Value<T, any>, ValueSetter]>
	ForKeys: <KI, KO, V>(
		inputTable: UsedAs<Map<KI, V>>,
		processor: (use: Use, scope: Scope<object>, key: KI) => KO,
	) => For<KO, V>
	ForPairs: <KI, KO, VI, VO>(
		inputTable: UsedAs<Map<KI, VI>>,
		processor: (use: Use, scope: Scope<object>, key: KI, value: VI) => LuaTuple<[KO, VO]>,
	) => For<KO, VO>
	ForValues: <K, VI, VO>(
		inputTable: UsedAs<Map<K, VI>>,
		processor: (use: Use, scope: Scope<object>, value: VI) => VO,
	) => For<K, VO>
	Hydrate: <T extends Instances[keyof Instances]>(instance: T) => (propertyTable: PropertyTable<T>) => T
	New: <T extends keyof CreatableInstances>(
		className: T,
	) => (propertyTable: PropertyTable<CreatableInstances[T]>) => CreatableInstances[T]
	Tween: <T>(goalState: UsedAs<T>, tweenInfo?: UsedAs<TweenInfo>) => Tween<T>
	Spring: <T>(goalState: UsedAs<T>, speed?: UsedAs<number>, damping?: UsedAs<number>) => Spring<T>
}

export interface ExternalProvider {
	policies: {
		allowWebLinks: boolean
	}

	logErrorNonFatal: (errorString: string) => void
	logWarn: (errorString: string) => void

	doTaskImmediate: (resume: () => void) => void
	doTaskDeferred: (resume: () => void) => void
	startScheduler: () => void
	stopScheduler: () => void
}
