# Team Fireworks Fork

It's the [Fusion reactive state library](https://github.com/dphfox/Fusion), done
at 150 million degrees Celsius and a lethal amount of Thorium.

The following are changes from upstream:

- Comprehensive [roblox-ts](https://roblox-ts.com/) types for `Types.luau` and
  `init.luau`. Enjoy writing declarative GUI with useful hints and autocomplete
  you've come to love
- Value constructor now exports the object and a setter callback, as in
  `(Value<T, S = T>, ValueSetter)`
  - Deprecated `Value:set()`
  - `Out` now requires a setter function
- Implements `Observer:onlyOnce(callback)` which behaves a single run `onChange`
- Implements a bevy of built-in utilities:
  - `expect(watching)` yields the current running thread until the given state
    object changes, effectively a yielding Use callback
  - `methodsOf(scope, constructors)` allows silently passing in a scope
    parameter, hugely useful for the Roblox TypeScript world as you cannot
    specify a callback nor a method
  - `queueScope(...Task)` allows queuing tasks to a scope. We find this far more
    favorable than `table.insert` calls, as this is not only less verbose, but
    also guards against adding multiple tasks, accepts a variadic number of
    tasks, and returns the tasks you insert, allowing you to use it in
    declarations
- Implements `NewJSX` constructor which behaves like New with JSX markup syntax
- `doCleanup` has been extended to work with Promises, signals, threads, and and
  generic disconnect object methods
- The library is renamed to Hotfusion to avoid conflicts with the original
  Fusion
- Errors have been modified to separate Hotfusion specific errors

Install this fork with your preferred package manager of choice:

```bash
# Wally
wally add znotfireman/hotfusion
# npm
npm i rbxts/hotfusion
# pnpm
pnpm i rbxts/hotfusion
```

## JSX

Hotfusion implements JSX-style `New` constructors. To use it, configure the
`jsx` option in your `tsconfig.json`:

```json
"compilerOptions": {
  "jsx": "react",
  "jsxFactory": "NewJSX"
}
```

> [!IMPORTANT]
> Custom JSX factories are available in an unreleased version of roblox-ts,
> which can be installed by running `npm install -D roblox-ts@next`.

You can then import `NewJSX` from Hotfusion into a `.tsx` file:

```tsx
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
```

### Scopes

For limitations with JSX, you need to pass a scope as the `Scope` property for
all instances. For components, it may be favorable to have `Scope` as a property
instead of a separate parameter:

```ts
// New
declare type Counter(
  scope: Scope<typeof Hotfusion>,
  props: {
    Counter: Value<number>
  }
): Child

// NewJSX
declare function Counter(props: {
  Scope: Scope<typeof Hotfusion>,
  Counter: Value<number>
}): Child
```

### SpecialKeys

Given this code, how do we translate it into `NewJSX` syntax?

```lua
local OnHover: SpecialKey = {
  type = "SpecialKey",
  kind = "OnHover",
  stage = "observer",
  apply = function(scope, value, applyTo)
    -- do something with applyTo
  end
}
return scope:New "Frame" {
  [Children] = scope:New "TextLabel" {
    [OnHover] = true,
    [OnEvent "Activated"] = print()
  }
}
```

JSX disallows using objects as keys. Therefore, SpecialKeys cannot be specified
as property keys. For this, Hotfusion implements the `Uses` property allowing
you to use special keys.

Either pass in a tuple of `[SpecialKey, value]`, or an `Array<[SpecialKey,
value]>`:

```tsx
const OnHover: SpecialKey = {
  type: "SpecialKey",
  kind: "OnHover",
  stage: "observer",
  apply(scope, value, applyTo) {
    // do something with applyTo
  }
}
return (
  <frame>
    <textbutton Uses={[OnHover, true]} />
    <textbutton
      Uses={[
        [OnEvent("Activated"), () => print("clicked")],
        [OnHover, true],
      ]}
    />
  </frame>
)
```

Some built-in special keys can be specified directly:

- `OnEvent("eventName") = function` can be written as `OnEvent:eventName={() =>
  {}}`
- `OnChange("propertyName") = function` can be written as
  `OnChange:propertyName={() => {}}`
- `Out("propertyName") = setValue` can be written as `Out:propertyName={setValue}`

## Constructors

Fusion 0.3 employs a greater focus on manual memory management via the use of
scopes. You'd use constructors as methods on a scope.

Working with scopes in roblox-ts can be cumbersome, as you will often be passing
in the scope directly. Hotfusion provides the `methodsOf` function to make
scoped constructors less verbose.

Pass in a table of constructors, and Hotfusion will omit the first `scope`
parameter for you. Under the hood, Hotfusion will pass the scope directly to the
constructor:

```ts
import * as Hotfusion from "@rbxts/hotfusion"
import {scoped, ctorsOf} from "@rbxts/hotfusion"

const scope = scoped()
const {Computed, Value} = ctorsOf(scope, Hotfusion)

// no scope parameter needed :)
const lib = Value("Hotfusion")
const message = Computed((use) => `i LOVE ${use(lib)}!!`)
```

> [!WARNING]
> [Typescript fumbles with inferring function generics](https://stackoverflow.com/questions/64948037/generics-type-loss-while-infering). As such, constructors emitted by `methodsOf`
> loses its generics, becoming `unknown`.
>
> You will see this if you try to use a Hotfusion constructor:
>
> ```ts
> const {Computed} = ctorsOf(scope, Hotfusion)
> //     ^^^^^^^^ 
> //     expected Computed to be inferred as <T, S>(processor: (use: Use, scope: S) => T): Computed<T>
> //     actually inferred as (processor: (use: Use, scope: unknown) => unknown): Computed<unknown>
> ```
>
> For now, if you're using *just* Hotfusion as your constructors, cast the
> result of `ctorsOf` to the `Constructors` type:
>
> ```ts
> const {Computed} = ctorsOf(scope, Hotfusion) as BuiltinConstructors
> //     ^^^^^^^^
> //     correctly inferred as <T, S>(processor: (use: Use, scope: S) => T): Computed<T>
> ```

## Errors

### invalidOutType

```txt
[Out] properties must be given a Value setter function. Value objects differs from Fusion - see Hotfusion README.",
```

**Thrown by:** `Out`, `New`, `NewJSX`

`Out` expected you to give it a value setter function, but you gave it something
else.

Commonly, you may have tried providing a value object directly.

### missingSpecialKeyValue

```txt
Special key OnEvent needs a value, but none was provided. Provide one with `OnEvent:myValue={...}`.
```

**Thrown by:** `NewJSX`

You've tried to specify one of the built-in special key generators, but forgot
to provide a value. Use a colon to identify as such.

### queuedTwice

```txt
Attempted to queue a task for destruction multiple times.
```

**Thrown by:** `queueScope`

Either you've specified the same object twice in queueScope, or an earlier
queueScope has been called on the object and scope. As Fusion discourages
repeated destruction, Hotfusion will disallow repeated queues.

### valueSetWasRemoved

```txt
`Value:set()` has been deprecated. Capture the setter as a second return value from the constructor instead (e.g. `local value, setValue = Value(\"Foo\")`).
```

**Thrown by:** `Value`

Fusion lets you call `:set()` directly on value objects to set their current
value and notify dependencies.

With Hotfusion, this has been moved as a second return argument for `Value()`.

## Original README

<img align="left" src="./gh-assets/logo-dark-theme.svg#gh-dark-mode-only" alt="Fusion"><img align="left" src="./gh-assets/logo-light-theme.svg#gh-light-mode-only" alt="Fusion"><a href="https://elttob.uk/Fusion/latest"><img align="right" src="./gh-assets/link-docs.svg" alt="Docs"></a><a href="https://github.com/Elttob/Fusion/releases"><img align="right" src="./gh-assets/link-download.svg" alt="Download"></a><img src="./gh-assets/clearfloat.svg">

**Rediscover the joy of coding.**

Code is more dynamic, complex and intertwined than ever before. Errors cascade
out of control, things update in the wrong order, and it's all connected by
difficult, unreadable spaghetti.

No longer. Fusion introduces modern 'reactive' concepts for managing code, so
you can spend more time getting your logic right, and less time implementing
buggy boilerplate code connections.

Starting from simple roots, concepts neatly combine and build up with very little
learning curve. At every stage, you can robustly guarantee what your code will
do, and when you come back in six months, your code is easy to pick back up.

Piqued your interest? [Get going in minutes with our on-rails tutorial.](https://elttob.uk/Fusion/latest/tutorials)

## Issues & contributions

Have you read [our contribution guide](/CONTRIBUTING.md)? It's a real page turner!

We highly recommend reading it before opening an issue or pull request.

## License

Fusion is licensed freely under MIT. Go do cool stuff with it, and if you feel
like it, give us a shoutout!
