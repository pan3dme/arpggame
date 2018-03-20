declare module tb {
    export class TB_item_slot {
        slot: string
        static getTempVo($id): TB_item_slot
    }
}

declare class Object3D {
    rotationX: number;
    rotationY: number;
    rotationZ: number;

    _rotationX: number;
    _rotationY: number;
    _rotationZ: number;

    x: number;
    y: number;
    z: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    posMatrix: Matrix3D;

}
declare class Camera3D extends Object3D {
    distance: number;
    cameraMatrix: Matrix3D;
}

declare class MathUtil {
    static lookAt(eyePos: Vector3D, lookAt: Vector3D): Matrix3D 
    static math3DWorldtoDisplay2DPos($pos: Vector3D): Vector2D 
}
declare class Shader3D {
    program: WebGLProgram;
}
declare class ProgrmaManager {
    static getInstance(): ProgrmaManager
    registe($str, $shader3D: Shader3D): void
    getProgram($str: string): Shader3D
}
declare class EventDispatcher {
    addEventListener(types: string, listener: Function, thisObject: any): void
}
declare class UIStage extends EventDispatcher {
}
declare class Material extends ResCount {
    texList: any
}
declare class MeshData extends ObjData {
    boneIDOffsets: number;
    boneWeightOffsets: number;
    material: Material;
    public uid: number;

}

declare class Context3D {
    renderContext: WebGLRenderingContext;
    setProgram($program: WebGLProgram): void
    setVcMatrix4fv($program: Shader3D, $name: string, $m: Float32Array): void
    setVcMatrix3fv($program: Shader3D, $name: string, $m: Float32Array): void

    setVpMatrix($program: Shader3D, $m: Float32Array)
    setRenderTexture($program: Shader3D, $name: string, $textureObject: WebGLTexture, $level: number, test?: boolean)
    drawCall($iBuffer: WebGLBuffer, $numTri: number)
    setVaOffset(dataId: number, dataWidth: number, stride: number, offset: number): void
    setDepthTest(tf: boolean): void
    update(): void

    setWriteDepth(tf: boolean): void
    setVc4fv($program: Shader3D, $name: string, $m: any)
    setVc3fv($program: Shader3D, $name: string, $m: any)
    pushVa(dataBuffer: WebGLBuffer): boolean
}
declare class FBO {

    static fw: number
    static fh: number
    frameBuffer: WebGLFramebuffer;
    depthBuffer: WebGLRenderbuffer;
    texture: WebGLRenderbuffer;
}
declare class GroupItem {
    materialUrl: string;
    objUrl: string
    materialInfoArr: Array<any>
    types: number

}


declare class ObjDataManager {
    static getInstance(): ObjDataManager
    getObjData($url: string, $fun: Function): void
}
declare class LightVo {
    sunDirect: Array<number>
    sunColor: Array<number>
    ambientColor: Array<number>
    setData(sd: any, sc: any, ac: any): void
}
declare class Scene_data {
    static fbo: FBO;
    static gameAngle: number
    static vpMatrix: Matrix3D;
    static viewMatrx3D: Matrix3D
    static context3D: Context3D;
    static fileRoot: string
    static focus3D: Object3D
    static cam3D: Camera3D
    static uiBlankStage: UIStage
    static uiStage: UIStage
    static canvas3D: HTMLCanvasElement;
    static isPc: boolean
    static stageWidth: number
    static stageHeight: number
    static light: LightVo;


}
declare class CombineParticle extends EventDispatcher {
    sceneVisible: boolean
    dynamic: boolean
}
declare class ParticleManager {
    static getInstance(): ParticleManager
    getParticleByte($url: string): CombineParticle
    addParticle($particle: CombineParticle): void
}


declare class MathClass {
    static getCamView(_Cam: Camera3D, _focus_3d: Object3D): Float32Array
    static updateVp(): void

}
declare class UIConatiner {
}
declare class UIPanel extends UIConatiner {
}

declare class SceneAstarModel extends UIPanel {

    static getInstance(): SceneAstarModel
    static getAstarBySceneV3D($v3d: Vector3D): Vector2D
    showAstarLine(): void
    getAstarSceneByMouse($evt: InteractiveEvent): Vector2D
}
declare class BaseEvent {
    constructor($type: string)
    type: string;
    target: EventDispatcher;
}
declare class Quaternion {
    constructor($x?: number, $y?: number, $z?: number, $w?: number)
    x: number
    y: number
    z: number
    w: number
    fromMatrix($matrix: Matrix3D): void
    identity(): void
    toEulerAngles(target?: Vector3D): Vector3D

    slerp: any
}
declare class ByteArray {
    constructor(buffer?: ArrayBuffer)
    position: any
    length: number
    readUTF(): string
    readInt(): number
    readUTFBytes(length: number): string
}
declare class GroupRes extends BaseRes {
    dataAry: Array<GroupItem>;
}
declare class BaseRes extends ResCount {
    byte: ByteArray;
    protected _byte: ByteArray;
    read($imgFun?: Function): void
    readUTFBytes(length: number): string
    public version: number;
    static PREFAB_TYPE: number
}
declare class InteractiveEvent extends BaseEvent {
    constructor($type: string)
    static Down: string
    static Up: string
    static Move: string
    ctrlKey: boolean
    x: number
    y: number
    type: string
}

declare class Engine {

    static init($caves: HTMLCanvasElement): void
    static resetSize(): void
    static update(): void
    static initPbr(): void 
}

declare class FpsStage {

    static getInstance(): FpsStage
    showLoadInfo(str: string): void 
    init($cadves: any, $loadCav: any): void
}
declare class UIData {
    static htmlScale: number;
    static resize(): void
    static init($res: Array<any>, $bfun: Function, $loadFun?: Function): number 
    static textlist: string 
}
declare class Disp2DBaseText {
    static uiScale: number;


}

declare class SceneGroundModel {
    static configSize: number;
    static getInstance(): SceneGroundModel;
    initData(value?: number): void
    resetViewMatrx3D(): void
}

declare class GameStart {
    constructor()
    init(): void

}

declare class Vector2D {
    constructor(a?: number, b?: number)
    x: number
    y: number

    static distance(p1: Vector2D, p2: Vector2D): number 

}

declare class MainCharControlModel {

    static getInstance(): MainCharControlModel
    update(t): void
    setWalkPathFun($item: Array<Vector2D>, $bfun?: Function): void
    setSpeedDirect(value: Vector3D): void
}
declare class GameInstance {
    static mainChar: SceneChar
    static attackChar: SceneChar
    static initData: any

}
declare class ModuleEventManager {

    static dispatchEvent: any
}

declare class MapConfig {
    static getInstance(): MapConfig
    static Scale: number
    static pix15: Vector2D
    anlyData(data: string): void
    astarItem: Array<Array<number>>
}
declare class UIManager {
    static getInstance(): UIManager
    mouseEvetData(evt: InteractiveEvent, point: Vector2D): boolean
    getContext2D($width: number, $height: number, alianDefault?: boolean): CanvasRenderingContext2D
}
declare class LineDisplayShader extends Shader3D {
    static LineShader: string
}
declare class baseMeshVo {
     _visible: boolean 
     visibleChange: boolean 
  
     pos: Vector3D;
     clear: boolean 

}
declare class CharNameMeshVo extends baseMeshVo  {


     needDraw: boolean;
     name: string
     destory(): void 

}
declare class BloodManager  {
    static getInstance(): BloodManager
    getCharNameMeshVo(value?: string): CharNameMeshVo 
}

declare class LineDisplaySprite extends Display3D {
    clear(): void
    baseColor: Vector3D
    makeLineMode(a: Vector3D, b: Vector3D, $color?: Vector3D): void 
    upToGpu(): void 
}
declare class GridLineSprite extends LineDisplaySprite {
}
declare class GroupDataManager {
    static getInstance(): GroupDataManager
    getGroupData($url: string, $fun: Function): void
}


declare class Matrix3D {
    prependTranslation(x: number, y: number, z: number): void
    appendRotation(rad: number, axis: Vector3D): void
    transformVector($p: Vector3D): Vector3D
    m: Float32Array;
    identity(): void
    appendTranslation(x: number, y: number, z: number): void
    prepend($matrx3d: Matrix3D): void
    clone(): Matrix3D
    appendScale(x: number, y: number, z: number): void
    getRotaion(b: Float32Array): void
}
declare class Vector3D {
    constructor(a?: number, c?: number, b?: number, d?: number)
    x: number
    y: number
    z: number
    static X_AXIS: Vector3D
    static Y_AXIS: Vector3D
    static Z_AXIS: Vector3D
    scaleBy(value: number): void
    scaleByW(): void
    static distance(v1: Vector3D, v2: Vector3D): number 

}
declare class AppDataArpg {
    static sceneStagePos: Vector2D
    static lockMainChar: boolean
    static resetSelfPosCenter(): void
    static math2Dto3DGroundarpg($p: Vector2D): Vector3D
}


declare class ScenePerfab extends Display3dMovie {
    setPerfabName($str: string): void 
}
declare class Groundposition {

    static  getGroundPos($x: number, $y: number): Vector3D
}
declare class AstarUtil {
    static navmeshData: any
    static getWorldPosByStart2D(a: Vector2D): Vector3D
    static makeStarGraph($arr: Array<Array<number>>): void
    static findPath2D(gridVec2DA: Vector2D, gridVec2DB: Vector2D): Array<Vector2D>
    static getPosIsCanMove($pos: Vector3D): boolean 
    static getScenePos($x: number, $y: number): Vector3D
    static getGrapIndexByPos($pos: Vector3D): Vector2D 
    static getHeightByPos($pos: Vector3D): number 
    static sceneVectList: Array<Vector3D>
}
declare class Processor {
}
declare class BaseProcessor {
}
declare class TextureManager {
    static getInstance(): TextureManager
    getCanvasTexture(ctx: CanvasRenderingContext2D): TextureRes
    updateTexture($texture: WebGLTexture, $offsetx: number, $offsety: number, ctx: CanvasRenderingContext2D): void
}
declare class ObjData extends ResCount {

    vertexBuffer: WebGLBuffer;
    uvBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    lightUvBuffer: WebGLBuffer;
    normalsBuffer: WebGLBuffer;
    tangentBuffer: WebGLBuffer;
    bitangentBuffer: WebGLBuffer;

    uvsOffsets: number;
    normalsOffsets: number
    stride: number;
    treNum: number
    lightuvsOffsets: number;

}
declare class AnimData {
    boneQPAry: Array<Array<DualQuatFloat32Array>>;
}

declare class Dictionary {
    constructor(init?: Array<any>)
    remove(key: string): void
}


declare class Display3D extends Object3D {
    objData: ObjData;
    program: WebGLProgram;
    shader: Shader3D;
    sceneVisible: boolean
}
declare class SceneBaseChar extends Display3dMovie  {
    getSceneCharWeaponUrl(num: number, $suffix?: string ): string 
}
declare class MountChar extends SceneBaseChar {
}
declare class SceneChar extends SceneBaseChar {
    id: number;
    isMount: boolean
    static WEAPON_PART: string
    static WING_SLOT: string
    static MOUNT_SLOT: string 
    static WEAPON_DEFAULT_SLOT: string
    
    showName($color?: string): void
    showBlood($colorType?: number): void
    playSkill($skill: Skill): void
    watch($obj: any, $syn?: boolean): void
    curentAction: string;
    px: number;
    pz: number;
    x: number;
    z: number;
    walkPath: any;
    setMount(): void 
    setWing(): void 
    setWeaponByAvatar(avatar: number, $suffix?: string): void
    mountChar: MountChar;
    _wingDisplay: SceneBaseChar;

}
declare class ScenePortal extends SceneChar {

    setAvatar(num: number): void
}
declare class TextureRes extends ResCount {
    texture: WebGLTexture;

}
declare interface IBind {
    getSocket(socketName: string, resultMatrix: Matrix3D): void 
    getSunType(): number 
}
declare class Display3DSprite extends Display3D {
    setObjUrl(value: string): void
    setPicUrl($str: string): void
    setLightMapUrl(value: string): void
    baseTexture: TextureRes
    lightMapTextureRes: TextureRes;
    _rotationMatrix: Matrix3D;
    dynamic: boolean
    _rotationData: Float32Array;
    setMaterialUrl(value: string, $paramData?: Array<any>): void
    setBind($bindTarget: IBind, $bindSocket: string): void 
}
declare class SkinMesh {
    meshAry: Array<MeshData>
}
declare class DualQuatFloat32Array {
    quat: Float32Array;
    pos: Float32Array;
}
declare class Display3dMovie extends Display3DSprite implements IBind  {
    meshVisible: boolean
    _skinMesh: SkinMesh;
    shadow: any
    _animDic: Object;
    _defaultAction: string
    _curentFrame: number
    addPart($key: string, $bindSocket: string, $url: string): void 
    setRoleUrl(value: string): void
    play($action: string, $completeState?: number, needFollow?: boolean): boolean

    getSocket(socketName: string, resultMatrix: Matrix3D): void 
    getSunType(): number 

}
declare class SceneManager {
    static getInstance(): SceneManager
    loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void 
    clearScene(): void;
    clearStaticScene(): void
    ready: boolean;
    addMovieDisplay($display: Display3dMovie): void
    update: any
    displayList: any
    addDisplay($display: Display3D): void
    displayRoleList(): Array<Display3dMovie>
    removeMovieDisplay($display: Display3dMovie): void 
}


declare class MouseType {


    static MouseDown: string
    static MouseUp: string
    static MouseMove: string
    static MouseClick: string
    static KeyDown: string
    static KeyUp: string
    static MouseWheel: string
    static TouchStart: string
    static TouchMove: string
    static TouchEnd: string
    static TouchClick: string
}
declare class YaoGanModelPanel {
    static getInstance(): YaoGanModelPanel
    initData($bfun?: Function): void
}
declare class LoadManager {
    static BYTE_TYPE: string
    static IMG_TYPE: string
    static XML_TYPE: string
    static getInstance(): LoadManager
    load($url: string, $type: string, $fun: Function, $info?: any, $progressFun?: Function): void
}
declare class ResCount {
}
declare class SkillKey {
}

declare class Skill extends ResCount {
    configTrajectory($active: Object3D, $target: Object3D, $completeFun?: Function, types?: number, $bloodFun?: Function): void
    keyAry: Array<SkillKey>
    configFixEffect($active: Object3D, $completeFun?: Function, $posObj?: Array<Vector3D>): void
}
declare class Module {
    static registerModule($module: Module): void
}


declare class SkillManager {
    static getInstance(): SkillManager
    getSkill($url: string, $name: string): Skill
}
declare class KeyboardType {
    static A: number;

     static Left: number
     static Up: number
     static Right: number
     static Down: number 
    static Delete: number 

     static F1: number 
     static F2: number 
}

declare class CharAction {


     static STANAD: string 
     static WALK: string
     static DEATH: string 
     static JUMP: string
     static SIT: string
     static ATTACK_01: string
     static ATTACK_02: string 
     static ATTACK_03: string 
     static ATTACK_04: string
     static ATTACK_05: string 
     static ATTACK_06: string

     static ATTACK_010: string 
     static ATTACK_020: string

     static STAND_MOUNT: string
     static WALK_MOUNT: string 
}
declare class TimeUtil {
    static addFrameTick($fun: Function): void
    static getTimer(): number
}
declare class CollisionType {

    static Polygon: number
    static BOX: number
    static BALL: number
    static Cylinder: number
    static Cone: number
}
declare class CollisionVo extends Object3D {
    type: number;
    name: string
    polygonUrl: string;
    data: any;
    radius: number
    colorInt: number
}
declare class CollisionItemVo {
    friction: number
    restitution: number
    isField: boolean
    collisionItem: Array<CollisionVo>;
}


declare class SceneRes extends BaseRes {
     static sceneConfigData: any;
}

declare function random($num: number): number
declare function float2int($num: any): number
declare function getRoleUrl($num: string): string
declare function getSkillUrl($num: string): string
declare function getUrlParam($num: string): string
declare function getModelUrl($num: string): string
declare function makeArray(a: Array<any>, b: Array<any>): void
declare function trim(s): string
declare function unZip($aryBuf: ArrayBuffer): ArrayBuffer 

