// https://github.com/Dionysusnu/Fusion/blob/jsx/src/Instances/jsx.d.ts
import {Child, Children, OnChangeKey, OnEventKey, OutKey, Scope, SpecialKey, UsedAs, Value, ValueSetter} from "../Types"

declare global {
	namespace JSX {
		// FIXME: allowing [unknown]: unknown for now to allow special keys but
		// we rly should fix this later
		type JsxPropertyTable<T extends Instance> = {
			Scope: Scope<unknown>
		} & Partial<
			{
				Uses: [SpecialKey, unknown] | Array<[SpecialKey, unknown]>
			} & {
				[K in string]: unknown
			} & {
				[K in keyof WritableInstanceProperties<T> as K]: UsedAs<WritableInstanceProperties<T>[K]>
			} & {
				[K in InstancePropertyNames<T> as OutKey<K>]: ValueSetter
			} & {
				[K in InstancePropertyNames<T> as OnChangeKey<K>]: (newValue: T[K]) => void
			} & {
				[K in InstanceEventNames<T> as OnEventKey<K>]: T[K] extends RBXScriptSignal<infer C>
					? (...args: Parameters<C>) => void
					: never
			} & Record<Children, Child> &
				Map<SpecialKey, unknown>
		>

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		type LibraryManagedAttributes<T, A> = A extends {[K in Children]: unknown} ? A : A & {[K in Children]?: never}

		type Component = (scope: Scope<unknown>, props: Record<string, unknown>) => Element
		type ElementType = string | Component
		type Element = Child
		type ElementClass = never
		type ElementChildrenAttribute = Record<Children, never>

		type IntrinsicAttributes = defined

		// see classNames.luau for updating this
		interface IntrinsicElements {
			accessory: JsxPropertyTable<Accessory>
			accessorydescription: JsxPropertyTable<AccessoryDescription>
			accoutrement: JsxPropertyTable<Accoutrement>
			actor: JsxPropertyTable<Actor>
			adgui: JsxPropertyTable<AdGui>
			adportal: JsxPropertyTable<AdPortal>
			aircontroller: JsxPropertyTable<AirController>
			alignorientation: JsxPropertyTable<AlignOrientation>
			alignposition: JsxPropertyTable<AlignPosition>
			angularvelocity: JsxPropertyTable<AngularVelocity>
			animation: JsxPropertyTable<Animation>
			animationconstraint: JsxPropertyTable<AnimationConstraint>
			animationcontroller: JsxPropertyTable<AnimationController>
			animationrigdata: JsxPropertyTable<AnimationRigData>
			animator: JsxPropertyTable<Animator>
			archandles: JsxPropertyTable<ArcHandles>
			atmosphere: JsxPropertyTable<Atmosphere>
			attachment: JsxPropertyTable<Attachment>
			audioanalyzer: JsxPropertyTable<AudioAnalyzer>
			audiochorus: JsxPropertyTable<AudioChorus>
			audiocompressor: JsxPropertyTable<AudioCompressor>
			audiodeviceinput: JsxPropertyTable<AudioDeviceInput>
			audiodeviceoutput: JsxPropertyTable<AudioDeviceOutput>
			audiodistortion: JsxPropertyTable<AudioDistortion>
			audioecho: JsxPropertyTable<AudioEcho>
			audioemitter: JsxPropertyTable<AudioEmitter>
			audioequalizer: JsxPropertyTable<AudioEqualizer>
			audiofader: JsxPropertyTable<AudioFader>
			audioflanger: JsxPropertyTable<AudioFlanger>
			audiolistener: JsxPropertyTable<AudioListener>
			audiopitchshifter: JsxPropertyTable<AudioPitchShifter>
			audioplayer: JsxPropertyTable<AudioPlayer>
			audioreverb: JsxPropertyTable<AudioReverb>
			audiosearchparams: JsxPropertyTable<AudioSearchParams>
			backpack: JsxPropertyTable<Backpack>
			ballsocketconstraint: JsxPropertyTable<BallSocketConstraint>
			beam: JsxPropertyTable<Beam>
			billboardgui: JsxPropertyTable<BillboardGui>
			bindableevent: JsxPropertyTable<BindableEvent>
			bindablefunction: JsxPropertyTable<BindableFunction>
			blockmesh: JsxPropertyTable<BlockMesh>
			bloomeffect: JsxPropertyTable<BloomEffect>
			blureffect: JsxPropertyTable<BlurEffect>
			bodyangularvelocity: JsxPropertyTable<BodyAngularVelocity>
			bodycolors: JsxPropertyTable<BodyColors>
			bodyforce: JsxPropertyTable<BodyForce>
			bodygyro: JsxPropertyTable<BodyGyro>
			bodypartdescription: JsxPropertyTable<BodyPartDescription>
			bodyposition: JsxPropertyTable<BodyPosition>
			bodythrust: JsxPropertyTable<BodyThrust>
			bodyvelocity: JsxPropertyTable<BodyVelocity>
			bone: JsxPropertyTable<Bone>
			boolvalue: JsxPropertyTable<BoolValue>
			boxhandleadornment: JsxPropertyTable<BoxHandleAdornment>
			breakpoint: JsxPropertyTable<Breakpoint>
			brickcolorvalue: JsxPropertyTable<BrickColorValue>
			bubblechatmessageproperties: JsxPropertyTable<BubbleChatMessageProperties>
			buoyancysensor: JsxPropertyTable<BuoyancySensor>
			camera: JsxPropertyTable<Camera>
			canvasgroup: JsxPropertyTable<CanvasGroup>
			cframevalue: JsxPropertyTable<CFrameValue>
			charactermesh: JsxPropertyTable<CharacterMesh>
			chorussoundeffect: JsxPropertyTable<ChorusSoundEffect>
			clickdetector: JsxPropertyTable<ClickDetector>
			climbcontroller: JsxPropertyTable<ClimbController>
			clouds: JsxPropertyTable<Clouds>
			color3value: JsxPropertyTable<Color3Value>
			colorcorrectioneffect: JsxPropertyTable<ColorCorrectionEffect>
			compressorsoundeffect: JsxPropertyTable<CompressorSoundEffect>
			conehandleadornment: JsxPropertyTable<ConeHandleAdornment>
			configuration: JsxPropertyTable<Configuration>
			controllermanager: JsxPropertyTable<ControllerManager>
			controllerpartsensor: JsxPropertyTable<ControllerPartSensor>
			cornerwedgepart: JsxPropertyTable<CornerWedgePart>
			curveanimation: JsxPropertyTable<CurveAnimation>
			cylinderhandleadornment: JsxPropertyTable<CylinderHandleAdornment>
			cylindermesh: JsxPropertyTable<CylinderMesh>
			cylindricalconstraint: JsxPropertyTable<CylindricalConstraint>
			datastoregetoptions: JsxPropertyTable<DataStoreGetOptions>
			datastoreincrementoptions: JsxPropertyTable<DataStoreIncrementOptions>
			datastoreoptions: JsxPropertyTable<DataStoreOptions>
			datastoresetoptions: JsxPropertyTable<DataStoreSetOptions>
			decal: JsxPropertyTable<Decal>
			depthoffieldeffect: JsxPropertyTable<DepthOfFieldEffect>
			dialog: JsxPropertyTable<Dialog>
			dialogchoice: JsxPropertyTable<DialogChoice>
			distortionsoundeffect: JsxPropertyTable<DistortionSoundEffect>
			doubleconstrainedvalue: JsxPropertyTable<DoubleConstrainedValue>
			dragdetector: JsxPropertyTable<DragDetector>
			dragger: JsxPropertyTable<Dragger>
			echosoundeffect: JsxPropertyTable<EchoSoundEffect>
			editableimage: JsxPropertyTable<EditableImage>
			editablemesh: JsxPropertyTable<EditableMesh>
			equalizersoundeffect: JsxPropertyTable<EqualizerSoundEffect>
			eulerrotationcurve: JsxPropertyTable<EulerRotationCurve>
			experienceinviteoptions: JsxPropertyTable<ExperienceInviteOptions>
			explosion: JsxPropertyTable<Explosion>
			facecontrols: JsxPropertyTable<FaceControls>
			filemesh: JsxPropertyTable<FileMesh>
			fire: JsxPropertyTable<Fire>
			flangesoundeffect: JsxPropertyTable<FlangeSoundEffect>
			floatcurve: JsxPropertyTable<FloatCurve>
			floorwire: JsxPropertyTable<FloorWire>
			folder: JsxPropertyTable<Folder>
			forcefield: JsxPropertyTable<ForceField>
			frame: JsxPropertyTable<Frame>
			gettextboundsparams: JsxPropertyTable<GetTextBoundsParams>
			glue: JsxPropertyTable<Glue>
			groundcontroller: JsxPropertyTable<GroundController>
			handles: JsxPropertyTable<Handles>
			hat: JsxPropertyTable<Hat>
			hiddensurfaceremovalasset: JsxPropertyTable<HiddenSurfaceRemovalAsset>
			highlight: JsxPropertyTable<Highlight>
			hingeconstraint: JsxPropertyTable<HingeConstraint>
			hole: JsxPropertyTable<Hole>
			humanoid: JsxPropertyTable<Humanoid>
			humanoidcontroller: JsxPropertyTable<HumanoidController>
			humanoiddescription: JsxPropertyTable<HumanoidDescription>
			ikcontrol: JsxPropertyTable<IKControl>
			imagebutton: JsxPropertyTable<ImageButton>
			imagehandleadornment: JsxPropertyTable<ImageHandleAdornment>
			imagelabel: JsxPropertyTable<ImageLabel>
			intconstrainedvalue: JsxPropertyTable<IntConstrainedValue>
			internalsyncitem: JsxPropertyTable<InternalSyncItem>
			intersectoperation: JsxPropertyTable<IntersectOperation>
			intvalue: JsxPropertyTable<IntValue>
			keyframe: JsxPropertyTable<Keyframe>
			keyframemarker: JsxPropertyTable<KeyframeMarker>
			keyframesequence: JsxPropertyTable<KeyframeSequence>
			linearvelocity: JsxPropertyTable<LinearVelocity>
			lineforce: JsxPropertyTable<LineForce>
			linehandleadornment: JsxPropertyTable<LineHandleAdornment>
			localizationtable: JsxPropertyTable<LocalizationTable>
			localscript: JsxPropertyTable<LocalScript>
			manualglue: JsxPropertyTable<ManualGlue>
			manualweld: JsxPropertyTable<ManualWeld>
			markercurve: JsxPropertyTable<MarkerCurve>
			materialvariant: JsxPropertyTable<MaterialVariant>
			meshpart: JsxPropertyTable<MeshPart>
			model: JsxPropertyTable<Model>
			modulescript: JsxPropertyTable<ModuleScript>
			motor: JsxPropertyTable<Motor>
			motor6d: JsxPropertyTable<Motor6D>
			motorfeature: JsxPropertyTable<MotorFeature>
			negateoperation: JsxPropertyTable<NegateOperation>
			nocollisionconstraint: JsxPropertyTable<NoCollisionConstraint>
			numberpose: JsxPropertyTable<NumberPose>
			numbervalue: JsxPropertyTable<NumberValue>
			objectvalue: JsxPropertyTable<ObjectValue>
			operationgraph: JsxPropertyTable<OperationGraph>
			pants: JsxPropertyTable<Pants>
			part: JsxPropertyTable<Part>
			particleemitter: JsxPropertyTable<ParticleEmitter>
			partoperation: JsxPropertyTable<PartOperation>
			path2d: JsxPropertyTable<Path2D>
			pathfindinglink: JsxPropertyTable<PathfindingLink>
			pathfindingmodifier: JsxPropertyTable<PathfindingModifier>
			pitchshiftsoundeffect: JsxPropertyTable<PitchShiftSoundEffect>
			plane: JsxPropertyTable<Plane>
			planeconstraint: JsxPropertyTable<PlaneConstraint>
			plugincapabilities: JsxPropertyTable<PluginCapabilities>
			pointlight: JsxPropertyTable<PointLight>
			pose: JsxPropertyTable<Pose>
			prismaticconstraint: JsxPropertyTable<PrismaticConstraint>
			proximityprompt: JsxPropertyTable<ProximityPrompt>
			rayvalue: JsxPropertyTable<RayValue>
			remoteevent: JsxPropertyTable<RemoteEvent>
			remotefunction: JsxPropertyTable<RemoteFunction>
			reverbsoundeffect: JsxPropertyTable<ReverbSoundEffect>
			rigidconstraint: JsxPropertyTable<RigidConstraint>
			robloxeditableimage: JsxPropertyTable<RobloxEditableImage>
			rocketpropulsion: JsxPropertyTable<RocketPropulsion>
			rodconstraint: JsxPropertyTable<RodConstraint>
			ropeconstraint: JsxPropertyTable<RopeConstraint>
			rotate: JsxPropertyTable<Rotate>
			rotatep: JsxPropertyTable<RotateP>
			rotatev: JsxPropertyTable<RotateV>
			rotationcurve: JsxPropertyTable<RotationCurve>
			screengui: JsxPropertyTable<ScreenGui>
			script: JsxPropertyTable<Script>
			scrollingframe: JsxPropertyTable<ScrollingFrame>
			seat: JsxPropertyTable<Seat>
			selectionbox: JsxPropertyTable<SelectionBox>
			selectionpartlasso: JsxPropertyTable<SelectionPartLasso>
			selectionpointlasso: JsxPropertyTable<SelectionPointLasso>
			selectionsphere: JsxPropertyTable<SelectionSphere>
			shirt: JsxPropertyTable<Shirt>
			shirtgraphic: JsxPropertyTable<ShirtGraphic>
			skateboardcontroller: JsxPropertyTable<SkateboardController>
			skateboardplatform: JsxPropertyTable<SkateboardPlatform>
			sky: JsxPropertyTable<Sky>
			smoke: JsxPropertyTable<Smoke>
			snap: JsxPropertyTable<Snap>
			sound: JsxPropertyTable<Sound>
			soundgroup: JsxPropertyTable<SoundGroup>
			sparkles: JsxPropertyTable<Sparkles>
			spawnlocation: JsxPropertyTable<SpawnLocation>
			specialmesh: JsxPropertyTable<SpecialMesh>
			spherehandleadornment: JsxPropertyTable<SphereHandleAdornment>
			spotlight: JsxPropertyTable<SpotLight>
			springconstraint: JsxPropertyTable<SpringConstraint>
			startergear: JsxPropertyTable<StarterGear>
			stringvalue: JsxPropertyTable<StringValue>
			studioattachment: JsxPropertyTable<StudioAttachment>
			studiocallout: JsxPropertyTable<StudioCallout>
			stylederive: JsxPropertyTable<StyleDerive>
			stylelink: JsxPropertyTable<StyleLink>
			stylerule: JsxPropertyTable<StyleRule>
			stylesheet: JsxPropertyTable<StyleSheet>
			sunrayseffect: JsxPropertyTable<SunRaysEffect>
			surfaceappearance: JsxPropertyTable<SurfaceAppearance>
			surfacegui: JsxPropertyTable<SurfaceGui>
			surfacelight: JsxPropertyTable<SurfaceLight>
			surfaceselection: JsxPropertyTable<SurfaceSelection>
			swimcontroller: JsxPropertyTable<SwimController>
			team: JsxPropertyTable<Team>
			teleportoptions: JsxPropertyTable<TeleportOptions>
			terraindetail: JsxPropertyTable<TerrainDetail>
			terrainregion: JsxPropertyTable<TerrainRegion>
			textbox: JsxPropertyTable<TextBox>
			textbutton: JsxPropertyTable<TextButton>
			textchannel: JsxPropertyTable<TextChannel>
			textchatcommand: JsxPropertyTable<TextChatCommand>
			textchatmessageproperties: JsxPropertyTable<TextChatMessageProperties>
			textlabel: JsxPropertyTable<TextLabel>
			texture: JsxPropertyTable<Texture>
			tool: JsxPropertyTable<Tool>
			torque: JsxPropertyTable<Torque>
			torsionspringconstraint: JsxPropertyTable<TorsionSpringConstraint>
			trackerstreamanimation: JsxPropertyTable<TrackerStreamAnimation>
			trail: JsxPropertyTable<Trail>
			tremolosoundeffect: JsxPropertyTable<TremoloSoundEffect>
			trusspart: JsxPropertyTable<TrussPart>
			uiaspectratioconstraint: JsxPropertyTable<UIAspectRatioConstraint>
			uicorner: JsxPropertyTable<UICorner>
			uiflexitem: JsxPropertyTable<UIFlexItem>
			uigradient: JsxPropertyTable<UIGradient>
			uigridlayout: JsxPropertyTable<UIGridLayout>
			uilistlayout: JsxPropertyTable<UIListLayout>
			uipadding: JsxPropertyTable<UIPadding>
			uipagelayout: JsxPropertyTable<UIPageLayout>
			uiscale: JsxPropertyTable<UIScale>
			uisizeconstraint: JsxPropertyTable<UISizeConstraint>
			uistroke: JsxPropertyTable<UIStroke>
			uitablelayout: JsxPropertyTable<UITableLayout>
			uitextsizeconstraint: JsxPropertyTable<UITextSizeConstraint>
			unionoperation: JsxPropertyTable<UnionOperation>
			universalconstraint: JsxPropertyTable<UniversalConstraint>
			unreliableremoteevent: JsxPropertyTable<UnreliableRemoteEvent>
			vector3curve: JsxPropertyTable<Vector3Curve>
			vector3value: JsxPropertyTable<Vector3Value>
			vectorforce: JsxPropertyTable<VectorForce>
			vehiclecontroller: JsxPropertyTable<VehicleController>
			vehicleseat: JsxPropertyTable<VehicleSeat>
			velocitymotor: JsxPropertyTable<VelocityMotor>
			videoframe: JsxPropertyTable<VideoFrame>
			viewportframe: JsxPropertyTable<ViewportFrame>
			wedgepart: JsxPropertyTable<WedgePart>
			weld: JsxPropertyTable<Weld>
			weldconstraint: JsxPropertyTable<WeldConstraint>
			wire: JsxPropertyTable<Wire>
			wireframehandleadornment: JsxPropertyTable<WireframeHandleAdornment>
			worldmodel: JsxPropertyTable<WorldModel>
			wraplayer: JsxPropertyTable<WrapLayer>
			wraptarget: JsxPropertyTable<WrapTarget>
		}
	}
}

declare function NewJSX(element: JSX.ElementType, props: {[K in string]: unknown}, children: Child): Instance
export = NewJSX
