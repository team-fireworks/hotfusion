--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler
--[[
	The entry point for the Fusion library.
]]

local Types = require(script.Types)
local External = require(script.External)

export type Animatable = Types.Animatable
export type UsedAs<T> = Types.UsedAs<T>
export type Child = Types.Child
export type Computed<T> = Types.Computed<T>
export type Contextual<T> = Types.Contextual<T>
export type Dependency = Types.Dependency
export type Dependent = Types.Dependent
export type For<KO, VO> = Types.For<KO, VO>
export type Observer = Types.Observer
export type PropertyTable = Types.PropertyTable
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

-- FIXME: Lune doesnt actually work yet, perhaps look into darklua for string requires?
do
	-- selene: allow(global_usage)
	if _G.UTIL_TARGET == "roblox" or typeof(script) == "Instance" then
		External.setExternalProvider(require(script.RobloxExternal))
	end
	if string.sub(_VERSION, 1, 5):lower() == "lune " then
		External.setExternalProvider(require(script.LuneExternal))
	end
end

local Hotfusion: Types.Hotfusion = table.freeze({
	version = { major = 0, minor = 3, isRelease = false },

	-- Memory
	cleanup = require(script.Memory.legacyCleanup),
	deriveScope = require(script.Memory.deriveScope),
	doCleanup = require(script.Memory.doCleanup),
	innerScope = require(script.Memory.innerScope),
	queueScope = require(script.Memory.queueScope),
	scoped = require(script.Memory.scoped),

	-- State
	expect = require(script.State.expect),
	flatten = require(script.State.flatten) :: Types.Flatten,
	Computed = require(script.State.Computed),
	Contextual = require(script.State.Contextual),
	ForKeys = require(script.State.ForKeys) :: Types.ForKeysConstructor,
	ForPairs = require(script.State.ForPairs) :: Types.ForPairsConstructor,
	ForValues = require(script.State.ForValues) :: Types.ForValuesConstructor,
	Observer = require(script.State.Observer),
	peek = require(script.State.peek),
	Value = require(script.State.Value),

	-- Components
	Safe = require(script.Components.Safe),
	Show = require(script.Components.Show) :: Types.ShowConstructor,
	Switch = require(script.Components.Switch),

	-- Roblox
	Attribute = require(script.Roblox.Attribute),
	AttributeChange = require(script.Roblox.AttributeChange),
	AttributeOut = require(script.Roblox.AttributeOut),
	Child = require(script.Roblox.Child),
	Children = require(script.Roblox.Children),
	Hydrate = require(script.Roblox.Hydrate),
	New = require(script.Roblox.New),
	OnChange = require(script.Roblox.OnChange),
	OnEvent = require(script.Roblox.OnEvent),
	Out = require(script.Roblox.Out),

	-- RobloxTS
	NewJSX = require(script.RobloxTS.NewJSX) :: Types.NewJSXConstructor,
	ctorsOf = require(script.RobloxTS.ctorsOf),

	-- Animation
	Tween = require(script.Animation.Tween),
	Spring = require(script.Animation.Spring),
})

return Hotfusion
