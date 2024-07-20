import {Child, Children, OnChangeKey, OnEventKey, OutKey, Scope, SpecialKey, UsedAs, Value} from "../Types"

// https://github.com/Dionysusnu/Fusion/blob/jsx/src/Instances/jsx.d.ts
declare global {
	namespace JSX {
		type JsxPropertyTable<T extends Instance> = {
			Scope: Scope<unknown>
		} & Partial<
			{
				[K in keyof WritableInstanceProperties<T>]: UsedAs<WritableInstanceProperties<T>[K]>
			} & {
				[K in InstancePropertyNames<T> as OutKey<K>]: Value<T[K]>
			} & {
				[K in InstancePropertyNames<T> as OnChangeKey<K>]: (newValue: T[K]) => void
			} & {
				[K in InstanceEventNames<T> as OnEventKey<K>]: T[K] extends RBXScriptSignal<infer C>
					? (...args: Parameters<C>) => void
					: never
			} & Record<Children, Child> &
				Map<SpecialKey, unknown>
		>
		// personally physically harassing facebook for this
		// type IntrinsicElements = {
		// 	[K in keyof CreatableInstances as Uncapitalize<K>]: JsxPropertyTable<CreatableInstances[K]>
		// }
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
			ballsocketconstraint: JsxPropertyTable<BallSocketConstraint>
			beam: JsxPropertyTable<Beam>
			billboardgui: JsxPropertyTable<BillboardGui>
			blockmesh: JsxPropertyTable<BlockMesh>
			bloomeffect: JsxPropertyTable<BloomEffect>
			blureffect: JsxPropertyTable<BlurEffect>
			bodyangularvelocity: JsxPropertyTable<BodyAngularVelocity>
			bodycolors: JsxPropertyTable<BodyColors>
			bodyforce: JsxPropertyTable<BodyForce>
			bodygyro: JsxPropertyTable<BodyGyro>
			bodyposition: JsxPropertyTable<BodyPosition>
			bodythrust: JsxPropertyTable<BodyThrust>
			bodyvelocity: JsxPropertyTable<BodyVelocity>
			bone: JsxPropertyTable<Bone>
			boolvalue: JsxPropertyTable<BoolValue>
			boxhandleadornment: JsxPropertyTable<BoxHandleAdornment>
			brickcolorvalue: JsxPropertyTable<BrickColorValue>
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
			decal: JsxPropertyTable<Decal>
			depthoffieldeffect: JsxPropertyTable<DepthOfFieldEffect>
			distortionsoundeffect: JsxPropertyTable<DistortionSoundEffect>
			doubleconstrainedvalue: JsxPropertyTable<DoubleConstrainedValue>
			dragdetector: JsxPropertyTable<DragDetector>
			dragger: JsxPropertyTable<Dragger>
			echosoundeffect: JsxPropertyTable<EchoSoundEffect>
			editableimage: JsxPropertyTable<EditableImage>
			editablemesh: JsxPropertyTable<EditableMesh>
			equalizersoundeffect: JsxPropertyTable<EqualizerSoundEffect>
			eulerrotationcurve: JsxPropertyTable<EulerRotationCurve>
			facecontrols: JsxPropertyTable<FaceControls>
			fire: JsxPropertyTable<Fire>
			flangesoundeffect: JsxPropertyTable<FlangeSoundEffect>
			floatcurve: JsxPropertyTable<FloatCurve>
			floorwire: JsxPropertyTable<FloorWire>
			folder: JsxPropertyTable<Folder>
			forcefield: JsxPropertyTable<ForceField>
			frame: JsxPropertyTable<Frame>
			groundcontroller: JsxPropertyTable<GroundController>
			handles: JsxPropertyTable<Handles>
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
			intvalue: JsxPropertyTable<IntValue>
			keyframe: JsxPropertyTable<Keyframe>
			keyframemarker: JsxPropertyTable<KeyframeMarker>
			keyframesequence: JsxPropertyTable<KeyframeSequence>
			linearvelocity: JsxPropertyTable<LinearVelocity>
			lineforce: JsxPropertyTable<LineForce>
			linehandleadornment: JsxPropertyTable<LineHandleAdornment>
			localizationtable: JsxPropertyTable<LocalizationTable>
			localscript: JsxPropertyTable<LocalScript>
			markercurve: JsxPropertyTable<MarkerCurve>
			materialvariant: JsxPropertyTable<MaterialVariant>
			model: JsxPropertyTable<Model>
			motor: JsxPropertyTable<Motor>
			motor6d: JsxPropertyTable<Motor6D>
			nocollisionconstraint: JsxPropertyTable<NoCollisionConstraint>
			numberpose: JsxPropertyTable<NumberPose>
			numbervalue: JsxPropertyTable<NumberValue>
			objectvalue: JsxPropertyTable<ObjectValue>
			pants: JsxPropertyTable<Pants>
			part: JsxPropertyTable<Part>
			particleemitter: JsxPropertyTable<ParticleEmitter>
			pitchshiftsoundeffect: JsxPropertyTable<PitchShiftSoundEffect>
			planeconstraint: JsxPropertyTable<PlaneConstraint>
			pointlight: JsxPropertyTable<PointLight>
			pose: JsxPropertyTable<Pose>
			prismaticconstraint: JsxPropertyTable<PrismaticConstraint>
			proximityprompt: JsxPropertyTable<ProximityPrompt>
			rayvalue: JsxPropertyTable<RayValue>
			reverbsoundeffect: JsxPropertyTable<ReverbSoundEffect>
			rigidconstraint: JsxPropertyTable<RigidConstraint>
			rocketpropulsion: JsxPropertyTable<RocketPropulsion>
			rodconstraint: JsxPropertyTable<RodConstraint>
			ropeconstraint: JsxPropertyTable<RopeConstraint>
			rotationcurve: JsxPropertyTable<RotationCurve>
			screengui: JsxPropertyTable<ScreenGui>
			script: JsxPropertyTable<Script>
			scrollingframe: JsxPropertyTable<ScrollingFrame>
			seat: JsxPropertyTable<Seat>
			selectionbox: JsxPropertyTable<SelectionBox>
			selectionsphere: JsxPropertyTable<SelectionSphere>
			shirt: JsxPropertyTable<Shirt>
			shirtgraphic: JsxPropertyTable<ShirtGraphic>
			sky: JsxPropertyTable<Sky>
			smoke: JsxPropertyTable<Smoke>
			sound: JsxPropertyTable<Sound>
			soundgroup: JsxPropertyTable<SoundGroup>
			sparkles: JsxPropertyTable<Sparkles>
			spawnlocation: JsxPropertyTable<SpawnLocation>
			specialmesh: JsxPropertyTable<SpecialMesh>
			spherehandleadornment: JsxPropertyTable<SphereHandleAdornment>
			spotlight: JsxPropertyTable<SpotLight>
			springconstraint: JsxPropertyTable<SpringConstraint>
			stringvalue: JsxPropertyTable<StringValue>
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
			textbox: JsxPropertyTable<TextBox>
			textbutton: JsxPropertyTable<TextButton>
			textlabel: JsxPropertyTable<TextLabel>
			texture: JsxPropertyTable<Texture>
			tool: JsxPropertyTable<Tool>
			torque: JsxPropertyTable<Torque>
			torsionspringconstraint: JsxPropertyTable<TorsionSpringConstraint>
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
			universalconstraint: JsxPropertyTable<UniversalConstraint>
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
		type IntrinsicAttributes = defined
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		type LibraryManagedAttributes<T, A> = A extends {[K in Children]: unknown} ? A : A & {[K in Children]?: never}
		type ElementClass = never
		type Element = Child
		type FunctionComponent = (scope: Scope<unknown>, args: unknown[]) => Element
		type ElementType = string | FunctionComponent
		type ElementChildrenAttribute = Record<Children, never>
	}
}

declare type MarkupConstructor = (
	scope: Scope<unknown>,
	element: JSX.ElementType,
	props: defined,
	children: Child,
) => Instance
