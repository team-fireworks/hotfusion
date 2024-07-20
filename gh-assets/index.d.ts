import * as Types from "./Types"

/**
 * The entry point to the Fusion library.
 */
declare namespace Fusion {
	/** Types that can be expressed as vectors of numbers, and so can be animated. */
	export type Animatable = Types.Animatable
	/** Passing values of this type to `Use` returns `T`. */
	export type UsedAs<T> = Types.UsedAs<T>
	/** A collection of instances that may be parented to another instance. */
	export type Child = Types.Child
	/** A state object whose value is derived from other objects using a callback. */
	export type Computed<T> = Types.Computed<T>
	/** An object which stores a value scoped in time. */
	export type Contextual<T> = Types.Contextual<T>
	/** A graph object which can have dependents. */
	export type Dependency = Types.Dependency
	/** A graph object which can have dependencies. */
	export type Dependent = Types.Dependent
	/** A state object which maps over keys and/or values in another table. */
	export type For<KO, VO> = Types.For<KO, VO>
	/** An object which can listen for updates on another state object. */
	export type Observer = Types.Observer
	/** A table that defines an instance's properties, handlers and children. */
	export type PropertyTable = Types.PropertyTable<Instance>
	/** A scope of tasks to clean up. */
	export type Scope<Constructors> = Types.Scope<Constructors>
	/** An object which uses a scope to dictate how long it lives. */
	export type ScopedObject = Types.ScopedObject
	/** Defines a custom operation to apply to a Roblox instance. */
	export type SpecialKey = Types.SpecialKey
	/** A state object which follows another state object using spring simulation. */
	export type Spring<T> = Types.Spring<T>
	/** An object which stores a piece of reactive state. */
	export type StateObject<T> = Types.StateObject<T>
	/** A task which can be accepted for cleanup. */
	export type Task = Types.Task
	/** A state object which follows another state object using tweens. */
	export type Tween<T> = Types.Tween<T>
	/** Function signature for use callbacks. */
	export type Use = Types.Use
	/** A state object whose value can be set at any time by the user. */
	export type Value<T, S = T> = Types.Value<T, S>
	/** Script-readable version information. */
	export type Version = Types.Version

	/*
		General
	*/

	/**
	 * The version of the Fusion source code. `isRelease` is only true when
	 * using a version of Fusion downloaded from the Releases page.
	 */
	export const version: Version
	/**
	 * Constructs and returns a new contextual.
	 *
	 * @param defaultValue - The value which `Contextual:now()` should return if
	 * no value has been specified by `Contextual:is():during()`.
	 *
	 * @returns A freshly constructed contextual.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/best-practices/sharing-values/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/general/members/contextual/
	 *
	 * @since Fusion 0.3
	 */
	export const Contextual: Types.ContextualConstructor
	/**
	 * Safely runs a function and returns the value it produces. If the function
	 * fails, the `fallback` function can handle the error and produces a
	 * fallback value.
	 *
	 * Safe acts like a version of `xpcall` that is easier to use in
	 * calculations and expressions, because it only returns the values from the
	 * functions, rather than returning a success boolean.
	 *
	 * @param callbacks - A pair of callbacks, the former which is a possibly
	 * erroneous calculation or expression; the latter a fallback calculation
	 * that should provide a backup answer if the possibly erroneous calculation
	 * throws an error.
	 *
	 * @returns The value produced by `try` if it's successful, or the value
	 * produced by `fallback` if an error occurs during `try`.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/best-practices/error-safety/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/general/members/safe/
	 *
	 * @since Fusion 0.3
	 */
	export const Safe: Types.Safe

	/*
		Memory
	*/

	/** @deprecated use `doCleanup()` instead */
	export const cleanup: (task: Task) => void
	/**
	 * Returns a blank scope with the same methods as an existing scope, plus
	 * some optional additional methods which are merged in to only the new scope.
	 * Unlike innerScope, the returned scope has a completely independent
	 * lifecycle from the original scope.
	 *
	 * @param existing - An existing scope, whose methods should be re-used for
	 * the new scope.
	 * @param addMethods - A series of tables, ideally including functions which
	 * take a scope as a `this` parameter. Those functions will turn into
	 * methods on the scope.
	 *
	 * @returns A blank (non-inner) scope with the same methods as the existing
	 * scope, plus the extra methods provided.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/derivescope
	 * @see https://elttob.uk/Fusion/0.3/api-reference/memory/members/docleanup/
	 *
	 * @since Fusion 0.3
	 */
	export const deriveScope: Types.DeriveScopeConstructor
	/**
	 * Attempts to destroy all arguments based on their runtime type.
	 *
	 * @param task - A value which should be disposed of; the value's runtime
	 * type will be inspected to determine what should happen.
	 *
	 * - if `function`, it is called
	 * - ...else if `{ destroy(): void }`, .destroy() is called
	 * - ...else if `{ Destroy(): void }`, .Destroy() is called
	 * - ...else if `Task[]`, doCleanup is called on all members
	 *
	 * When Fusion is running inside of Roblox:
	 *
	 * - if `Instance`, `.Destroy()` is called
	 * - ...else if `RBXScriptConnection`, `.Disconnect()` is called
	 *
	 * If none of these conditions match, the value is ignored.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/scopes
	 * @see https://elttob.uk/Fusion/0.3/api-reference/memory/members/docleanup/
	 *
	 * @since Fusion 0.2
	 */
	export const doCleanup: (task: Task) => void
	/**
	 * Returns a blank scope with the same methods as an existing scope, plus
	 * some optional additional methods which are merged in to only the new
	 * scope.
	 *
	 * Unlike `deriveScope`, the returned scope is an inner scope of the
	 * original scope. It exists until either the user calls `doCleanup` on it,
	 * or the original scope is cleaned up.
	 *
	 * @param existing - An existing scope, whose methods should be re-used for
	 * the new scope.
	 * @param addMethods - A series of tables, ideally including functions which
	 * take a scope as a `this` parameter. Those functions will turn into
	 * methods on the scope.
	 *
	 * @returns A blank inner scope with the same methods as the existing scope,
	 * plus the extra methods provided.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/scopes
	 * @see https://elttob.uk/Fusion/0.3/api-reference/memory/members/innerscope/
	 *
	 * @since Fusion 0.3
	 */
	export const innerScope: Types.DeriveScopeConstructor
	/**
	 * Returns a blank scope. Any method tables passed in as arguments are
	 * merged together, and used as the `__index` of the new scope, such that
	 * they can be called with method notation on the created scope.
	 *
	 * @param methods - A series of tables, ideally including functions which take
	 * a scope as a `this` parameter. Those functions will turn into methods on
	 * the scope.
	 *
	 * @returns A blank scope with the specified methods.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/scopes
	 * @see https://elttob.uk/Fusion/0.3/api-reference/memory/members/scoped/
	 *
	 * @since Fusion 0.3
	 */
	export const scoped: Types.ScopedConstructor

	/*
		State
	*/

	/**
	 * Constructs and returns a new computed state object.
	 *
	 * @param this - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param processor - Computes the value that will be used by the computed.
	 *
	 * The processor is given a use function for including other objects in the
	 * computation, and a scope for queueing destruction tasks to run on
	 * re-computation. The given scope has the same methods as the scope used to
	 * create the computed.
	 *
	 * @returns A freshly constructed computed state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/computeds
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/computed/
	 *
	 * @since Fusion 0.1
	 */
	export const Computed: Types.ComputedConstructor
	/**
	 * Constructs and returns a new For state object which processes keys and
	 * preserves values.
	 *
	 * @param this - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param inputTable - The table which will provide the input keys and input
	 * values for this object. If it is a state object, this object will respond
	 * to changes in that state.
	 * @param processor - Accepts a `KI` key from the input table, and returns
	 * the `KO` key that should appear in the output table.
	 *
	 * The processor is given a use function for including other objects in the
	 * computation, and a scope for queueing destruction tasks to run on
	 * re-computation. The given scope has the same methods as the scope used to
	 * create the whole object.
	 *
	 * @returns A freshly constructed For state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/forkeys/
	 * @see https://elttob.uk/Fusion/0.3/tutorials/tables/forkeys/
	 *
	 * @since Fusion 0.2
	 */
	export const ForKeys: Types.ForKeysConstructor
	/**
	 * Constructs and returns a new For state object which processes keys and
	 * values in pairs.
	 *
	 * @param this - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param inputTable - The table which will provide the input keys and input
	 * values for this object. If it is a state object, this object will respond
	 * to changes in that state.
	 * @param processor - Accepts a `KI` key and `VI` value pair from the input
	 * table, and returns the `KO` key and `VO` value pair that should appear in
	 * the output table.
	 *
	 * The processor is given a use function for including other objects in the
	 * computation, and a scope for queueing destruction tasks to run on
	 * re-computation. The given scope has the same methods as the scope used to
	 * create the whole object.
	 *
	 * @returns A freshly constructed For state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/forpairs/
	 * @see https://elttob.uk/Fusion/0.3/tutorials/tables/forpairs/
	 *
	 * @since Fusion 0.2
	 */
	export const ForPairs: Types.ForPairsConstructor
	/**
	 * Constructs and returns a new For state object which processes values and
	 * preserves keys.
	 *
	 * @param this - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param inputTable - The table which will provide the input keys and input
	 * values for this object. If it is a state object, this object will respond
	 * to changes in that state.
	 * @param processor - Accepts a `VI` value from the input table, and returns
	 * the `VO` value that should appear in the output table.
	 *
	 * The processor is given a use function for including other objects in the
	 * computation, and a scope for queueing destruction tasks to run on
	 * re-computation. The given scope has the same methods as the scope used to
	 * create the whole object.
	 *
	 * @returns A freshly constructed For state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/forvalues/
	 * @see https://elttob.uk/Fusion/0.3/tutorials/tables/forvalues/
	 *
	 * @since Fusion 0.2
	 */
	export const ForValues: Types.ForValuesConstructor
	/**
	 * Constructs and returns a new observer.
	 *
	 * @param this - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param watching - The target that the observer should watch for changes.
	 *
	 * @returns A freshly constructed observer.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/observers/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/observer/
	 *
	 * @since Fusion 0.1
	 */
	export const Observer: Types.ObserverConstructor
	/**
	 * Extract a value of type `T` from its input.
	 *
	 * This is a general-purpose implementation of `Use`. It does not do any
	 * extra processing or book-keeping beyond what is required to determine the
	 * returned value.
	 *
	 * @param target - The abstract representation of T to extract a value from.
	 *
	 * @returns The current value of `T`, derived from `target`.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/values
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/peek/
	 *
	 * @since Fusion 0.3
	 */
	export const peek: Use
	/**
	 * Constructs and returns a new value state object.
	 *
	 * @param scope - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param initialValue - The initial value that will be stored until the
	 * next value is `:set()`.
	 *
	 * @returns A freshly constructed value state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/fundamentals/values/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/state/members/value/
	 *
	 * @since Fusion 0.1
	 */
	export const Value: Types.ValueConstructor

	/**
	 * Given an attribute name, returns a special key which can modify
	 * attributes of that name.
	 *
	 * When paired with a value in a property table, the special key sets the
	 * attribute to that value.
	 *
	 * @param attributeName - The name of the attribute that the special key
	 * should target.
	 *
	 * @returns A special key for modifying attributes of that name.
	 *
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/attribute/
	 *
	 * @since Fusion 0.3
	 */
	export const Attribute: (attributeName: string) => SpecialKey
	/**
	 * Given an attribute name, returns a special key which can listen to
	 * changes for attributes of that name.
	 *
	 * When paired with a callback in a property table, the special key connects
	 * the callback to the attribute's change event.
	 *
	 * @param attributeName - The name of the attribute that the special key
	 * should target.
	 *
	 * @returns A special key for listening to changes for attributes of that
	 * name.
	 *
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/attributechange/
	 *
	 * @since Fusion 0.3
	 */
	export const AttributeChange: (attributeName: string) => SpecialKey
	/**
	 * Given an attribute name, returns a special key which can output values
	 * from attributes of that name.
	 *
	 * When paired with a value object in a property table, the special key sets
	 * the value when the attribute changes.
	 *
	 * @param attributeName - The name of the attribute that the special key
	 * should target.
	 *
	 * @returns A special key for outputting values from attributes of that
	 * name.
	 *
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/attributeout/
	 *
	 * @since Fusion 0.3
	 */
	export const AttributeOut: (attributeName: string) => SpecialKey
	/**
	 * Returns the child passed into it.
	 *
	 * This function does no processing. It only serves as a hint to the Luau
	 * type system, constraining the type of the argument.
	 *
	 * @param child - The argument whose type should be constrained.
	 *
	 * @returns The argument with the newly cast static type.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/parenting/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/child/
	 *
	 * @since Fusion 0.3
	 */
	export const Child: (child: Child[]) => Child
	/**
	 * A special key which parents other instances into this instance.
	 *
	 * When paired with a Child in a property table, the special key explores
	 * the Child to find every Instance nested inside. It then parents those
	 * instances under the instance which the special key was applied to.
	 *
	 * In particular, this special key will recursively explore arrays and bind
	 * to any state objects.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/parenting/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/children/
	 *
	 * @since Fusion 0.1
	 */
	export const Children: Types.Children
	/**
	 * Given an instance, returns a component for binding extra functionality to
	 * that instance.
	 *
	 * In the property table, string keys are assigned as properties on the
	 * instance. If the value is a state object, it is re-assigned every time
	 * the value of the state object changes.
	 *
	 * Any special keys present in the property table are applied to the
	 * instance after string keys are processed, in the order specified by their
	 * `stage`.
	 *
	 * A special exception is made for assigning Parent, which is only assigned
	 * after the `descendants` stage.
	 *
	 * @param target - The instance which should be modified.
	 *
	 * @returns A component that hydrates that instance, accepting various
	 * properties to build up bindings and operations applied to the instance.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/hydration/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/hydrate/
	 *
	 * @since Fusion 0.2
	 */
	export const Hydrate: Types.Hydrate
	/**
	 * Given a class name, returns a component for constructing instances of
	 * that class.
	 *
	 * In the property table, string keys are assigned as properties on the
	 * instance. If the value is a state object, it is re-assigned every time
	 * the value of the state object changes.
	 *
	 * Any special keys present in the property table are applied to the
	 * instance after string keys are processed, in the order specified by their
	 * `stage`.
	 *
	 * A special exception is made for assigning Parent, which is only assigned
	 * after the `descendants` stage.
	 *
	 * @param className - The kind of instance that should be constructed.
	 *
	 * @returns A component that constructs instances of that type, accepting
	 * various properties to customise each instance uniquely.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/new-instances/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/new/
	 *
	 * @since Fusion 0.1
	 */
	export const New: Types.New
	/**
	 * Given an property name, returns a special key which can listen to changes
	 * for properties of that name.
	 *
	 * When paired with a callback in a property table, the special key connects
	 * the callback to the property's change event.
	 *
	 * @param propertyName - The name of the property that the special key should
	 * target.
	 *
	 * @returns A special key for listening to changes for properties of that
	 * name.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/change-events
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/onchange/
	 *
	 * @since Fusion 0.1
	 */
	export const OnChange: <T extends string>(propertyName: T) => Types.OnChangeKey<T>
	/**
	 * Given an event name, returns a special key which can listen for events of
	 * that name.
	 *
	 * When paired with a callback in a property table, the special key connects
	 * the callback to the event.
	 *
	 * @param eventName - The name of the event that the special key should
	 * target.
	 *
	 * @returns A special key for listening to events of that name.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/events/
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/onevent/
	 *
	 * @since Fusion 0.1
	 */
	export const OnEvent: <T extends string>(eventName: T) => Types.OnEventKey<T>
	/**
	 * Given an property name, returns a special key which can output values
	 * from properties of that name.
	 *
	 * When paired with a value object in a property table, the special key sets
	 * the value when the property changes.
	 *
	 * @param propertyName - The name of the property that the special key
	 * should target.
	 *
	 * @returns A special key for outputting values from properties of that
	 * name.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/roblox/outputs
	 * @see https://elttob.uk/Fusion/0.3/api-reference/roblox/members/out/
	 *
	 * @since Fusion 0.2
	 */
	export const Out: <T extends string>(propertyName: T) => Types.OutKey<T>

	/*
		Animation
	*/

	/**
	 * Constructs and returns a new tween state object.
	 *
	 * @param scope - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param goal - The goal that this object should follow. For best results,
	 * the goal should be animatable.
	 * @param info - Determines the easing curve that the motion will follow.
	 *
	 * @returns A freshly constructed tween state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/animation/tweens
	 * @see https://elttob.uk/Fusion/0.3/api-reference/animation/members/tween/
	 *
	 * @since Fusion 0.1
	 */
	export const Tween: Types.TweenConstructor
	/**
	 * Constructs and returns a new spring state object.
	 *
	 * @param scope - The scope which should be used to store destruction tasks
	 * for this object.
	 * @param goal - The goal that this object should follow. For best results,
	 * the goal should be animatable.
	 * @param speed - Multiplies how fast the motion should occur; doubling the
	 * speed exactly halves the time it takes for the motion to complete.
	 * @param damping - The amount of resistance the motion encounters.
	 * 0 represents no resistance, 1 is just enough resistance to prevent
	 * overshoot (critical damping), and larger values damp out inertia effects
	 * and straighten the motion.
	 *
	 * @returns A freshly constructed tween state object.
	 *
	 * @see https://elttob.uk/Fusion/0.3/tutorials/animation/springs
	 * @see https://elttob.uk/Fusion/0.3/api-reference/animation/members/spring/
	 *
	 * @since Fusion 0.1
	 */
	export const Spring: Types.SpringConstructor
}

export = Fusion
