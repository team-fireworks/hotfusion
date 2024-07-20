# This is a modified fork of Fusion. The original README is below

This fork implements some features desired by Team Fireworks. The following are
changes made from upstream:

- Implements comprehensive TypeScript declarations for `init.luau` and
  `Types.luau`
- Pushes for a runtime agnostic Fusion, in the future implementing a
  `LuneExternal` external for continuous integration
- Implements a bevy of built-in utilities, mostly geared at Roblox TypeScript:
  - `await` yields the current running thread until the given state object
    changes, effectively a yielding `Use` callback
  - `methodsOf` allows silently passing in a `scope` parameter, hugely useful
    for the Roblox TypeScript world as you cannot specify a callback nor a
    method
  - `queueScope` allows queuing tasks to a scope. I find this far more
    favorable than `table.insert` calls, as this is not only less verbose, but
    also guards against adding multiple tasks, accepts a variadic number of
    tasks, and returns the tasks you insert, allowing you to use it in
    declarations
- Observer callbacks are renamed from `onChange` and `onBind` to `listen` and
  `subscribe` for further descriptiveness
  - Implements a new `once` callback for listening to a single update
- Implements `NewJSX` constructor which behaves like `New` with JSX markup
  syntax
- `Computed` and similar objects now warns you if you're not using a `scope`
  while using other constructors (TODO: not actually implemented yet)
- `doCleanup` has been extended to work with Promises, signals, threads, and
  and generic disconnect object methods
- The library is renamed to Hotfusion to avoid conflicts with the original
  Fusion

Install this fork with your preferred package manager of choice:

```bash
# Wally
wally add znotfireman/hotfusion
# npm
npm i rbxts/hotfusion
# pnpm
pnpm i rbxts/hotfusion
```

Fusion 0.3 employs a greater focus on manual memory management via the use of
scopes. You'd use constructors as methods on a scope.

TypeScript does not let you specify if you're using a method of callback. For
convenience, Hotfusion provides the `methodsOf` function.

Pass in your scope, and a table of constructors, and constructors will have the
scope silently passed for you:

```ts
import {type BuiltinMethods, scoped, methodsOf}, Hotfusion from "@rbxts/hotfusion"
const scope = scoped()
// note: types are a bit funky, see "Known Issues"
const {Value} = methodsOf(scope, Hotfusion)
const myValue = Value("Hotfusion rules!")
```

To use JSX-style `New` calls, you need to upgrade your version of roblox-ts:

```bash
# npm
npm i -D roblox-ts@=2.3.0-dev-26ec859 
# pnpm
pnpm i -D roblox-ts@=2.3.0-dev-26ec859  
```

Update your `tsconfig.json` file to point towards Hotfusion:

```json
// tsconfig.json
"compilerOptions": {
    "jsx": "react",
    "jsxFactory": "NewJSX",
}
```

Finally, import `NewJSX` from Hotfusion into a `.tsx` file:

```tsx
// Component.tsx
import {type Scope, NewJSX} from "@rbxts/hotfusion"

export function Component(
    scope: Scope<unknown>,
    props: {
        Message: string
    }
) {
    return (
        <textlabel Scope={scope}, Text={props.Message}/>
    )
}
```

Note that all JSX elements require you to explicitly pass the scope in order for
Fusion to create instances.

## Known Issues

### `methodsOf` does not preserve generics

[TypeScript cannot preserve `methodsOf` constructors](https://stackoverflow.com/questions/64948037/generics-type-loss-while-infering).
Therefore, constructors fallback to unknown:

```ts
import {scoped, methodsOf}, Hotfusion from "@rbxts/hotfusion"
const scope = scoped()
const {Computed} = methodsOf(scope, Hotfusion)
// expected `Computed` to be inferred as `<T, S>(callback: (use: Use, scope: S) => T) => Computed<T>`
// actually inferred as `(callback: (use: Use, scope: Task[]) => unknown) => Computed<unknown>`
```

For now, if you're only passing Hotfusion, cast the result of `methodsOf` with
the `BuiltinMethods` type:

```ts
import {type BuiltinMethods, scoped, methodsOf}, Hotfusion from "@rbxts/hotfusion"
const scope = scoped()
const {Computed} = methodsOf(scope, Hotfusion) as BuiltinMethods
// now correctly inferred as `<T, S>(callback: (use: Use, scope: S) => T) => Computed<T>`
```

## Errors

### queuedTwice

```txt
Attempted to queue a task for destruction multiple times.
```

**Thrown by:** `queueScope`

Either you've specified the same object twice in `queueScope`, or an earlier
`queueScope` has been called on the object and scope. As Fusion discourages
repeated destruction, Hotfusion will disallow repeated queues.

---

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
