# This is a modified fork of Fusion. The original README is below

This fork is built for internal usage by Team Fireworks and implements the
following features:

- Comprehensive TypeScript declarations for `init.luau` and `Types.luau`
- Push for a runtime agnostic Fusion, in the future implementing a
  `LuneExternal` external for continuous integration
- Implements a bevy of built-in utilities, mostly geared at Roblox TypeScript:
  - `methodsOf` allows silently passing in a `scope` parameter, hugely useful
    for the Roblox TypeScript world as you cannot specify a callback nor a
    method
  - `queueScope` allows queuing tasks to a scope. I find this far more
    favorable than `table.insert` calls, as this is not only less verbose, but
    also guards against adding multiple tasks, accepts a variadic number of
    tasks, and returns the tasks you insert, allowing you to use it in
    declarations
- `Markup` constructor which behaves like `New` with JSX markup syntax
- `Computed` and similar objects now warns you if you're not using a `scope`
  while using other constructors
- `doCleanup` has been extended to work with Promises, signals, threads, and
  and generic disconnect object methods
- The library is renamed to Hotfusion to avoid conflicts with the original
  Fusion

You can install this fork with your preferred package manager of choice:

```bash
# Wally
wally add znotfireman/hotfusion
# NPM
npm i rbxts/hotfusion
# PNPM
pnpm i rbxts/hotfusion
```

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
