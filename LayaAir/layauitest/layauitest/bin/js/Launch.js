var Browser = Laya.Browser;
var Loader = Laya.Loader;
var LEvent = Laya.Event;
var Stage = Laya.Stage;
var Engine = engine.Engine;
var FpsStage = engine.FpsStage;
var FpsMc = engine.FpsMc;
var BaseEvent = engine.events.BaseEvent;
var EventDispatcher = engine.events.EventDispatcher;
var Rectangle = engine.math.Rectangle;
var Vector2D = engine.math.Vector2D;
var Vector3D = engine.math.Vector3D;
var Matrix3D = engine.math.Matrix3D;
var Quaternion = engine.math.Quaternion;
var ByteArray = engine.math.ByteArray;
var MathClass = engine.math.MathClass;
var Circle = engine.math.Circle;
var MathUtil = engine.math.MathUtil;
var TestTriangle = engine.math.TestTriangle;
var TimeUtil = engine.utils.TimeUtil;
var ArtFont = engine.utils.ArtFont;
var MouseType = engine.utils.MouseType;
var TextRegExp = engine.utils.TextRegExp;
var MeshDataManager = engine.utils.MeshDataManager;
var AnimManager = engine.utils.AnimManager;
var LoadManager = engine.utils.LoadManager;
var SoundManager = engine.utils.SoundManager;
var LabelTextFont = engine.utils.LabelTextFont;
var ColorTransition = engine.utils.ColorTransition;
var ObjDataManager = engine.utils.ObjDataManager;
var GroupDataManager = engine.utils.GroupDataManager;
var LightProbeManager = engine.utils.LightProbeManager;
var Curve = engine.utils.curbes.Curve;
var BaseRes = engine.utils.res.BaseRes;
var GroupRes = engine.utils.res.GroupRes;
var RoleRes = engine.utils.res.RoleRes;
var SkillRes = engine.utils.res.SkillRes;
var ModelRes = engine.utils.res.ModelRes;
var ResManager = engine.utils.res.ResManager;
var GroupItem = engine.utils.res.GroupItem;
var Shadow = engine.utils.shadow.Shadow;
var ShadowManager = engine.utils.shadow.ShadowManager;
var Dictionary = engine.base.Dictionary;
var ResCount = engine.base.ResCount;
var ObjData = engine.base.ObjData;
var MeshData = engine.base.MeshData;
var Object3D = engine.base.Object3D;
var Camera3D = engine.base.Camera3D;
var ColorType = engine.base.ColorType;
var BindParticle = engine.base.BindParticle;
var BitMapData = engine.base.BitMapData;
var LightVo = engine.vo.LightVo;
var SkinMesh = engine.vo.skinanim.SkinMesh;
var AnimData = engine.vo.skinanim.AnimData;
var BoneSocketData = engine.vo.skinanim.BoneSocketData;
var DualQuatFloat32Array = engine.vo.skinanim.DualQuatFloat32Array;
var CapsuleVo = engine.vo.collistion.CapsuleVo;
var SkillManager = engine.skill.SkillManager;
var Skill = engine.skill.Skill;
var SkillVo = engine.skill.vo.SkillVo;
var SkillType = engine.skill.vo.SkillType;
var SkillKeyVo = engine.skill.vo.SkillKeyVo;
var SkillFixEffectKeyVo = engine.skill.vo.SkillFixEffectKeyVo;
var SkillTrajectoryTargetKeyVo = engine.skill.vo.SkillTrajectoryTargetKeyVo;
var SkillKey = engine.skill.key.SkillKey;
var SkillFixEffect = engine.skill.key.SkillFixEffect;
var SkillTrajectory = engine.skill.key.SkillTrajectory;
var SkillMulTrajectory = engine.skill.key.SkillMulTrajectory;
var PathManager = engine.skill.path.PathManager;
var SkillPath = engine.skill.path.SkillPath;
var SkillMulPath = engine.skill.path.SkillMulPath;
var SceneManager = engine.scene.SceneManager;
var Scene_data = engine.context.Scene_data;
var Context3D = engine.context.Context3D;
var FBO = engine.context.FBO;
var Display3D = engine.display3D.Display3D;
var Display3dBg = engine.display3D.Display3dBg;
var Display3DSprite = engine.display3D.Display3DSprite;
var Display3dMovie = engine.display3D.Display3dMovie;
var Display3dShadow = engine.display3D.Display3dShadow;
var GroundDataMesh = engine.display3D.terrain.GroundDataMesh;
var TerrainDisplay3DSprite = engine.display3D.terrain.TerrainDisplay3DSprite;
var Shader3D = engine.program.Shader3D;
var SkyShader = engine.program.SkyShader;
var UIShader = engine.program.UIShader;
var UIImageShader = engine.program.UIImageShader;
var UIMaskShader = engine.program.UIMaskShader;
var Movie2DShader = engine.program.Movie2DShader;
var Sprite2DShader = engine.program.Sprite2DShader;
var ProgrmaManager = engine.program.ProgrmaManager;
var Display3DShadowShader = engine.program.Display3DShadowShader;
var MaterialShader = engine.program.MaterialShader;
var MaterialAnimShader = engine.program.MaterialAnimShader;
var TerrainDisplay3DShader = engine.program.TerrainDisplay3DShader;
var TexItem = engine.material.TexItem;
var MaterialBaseParam = engine.material.MaterialBaseParam;
var MaterialManager = engine.material.MaterialManager;
var TextureManager = engine.material.TextureManager;
var Material = engine.material.Material;
var TextureRes = engine.material.TextureRes;
var MaterialParam = engine.material.MaterialParam;
var DynamicTexItem = engine.material.DynamicTexItem;
var DynamicConstItem = engine.material.DynamicConstItem;
var SceneRes = engine.scene.SceneRes;
var QuadTreeNode = engine.scene.tree.QuadTreeNode;
var SceneQuadTree = engine.scene.tree.SceneQuadTree;
var LineDisplaySprite = engine.scene.grldLevel.LineDisplaySprite;
var MulLineSprite = engine.scene.grldLevel.MulLineSprite;
var LineDisplayShader = engine.scene.grldLevel.LineDisplayShader;
var GridLineSprite = engine.scene.grldLevel.GridLineSprite;
var ParticleManager = engine.particle.ParticleManager;
var CombineParticle = engine.particle.CombineParticle;
var ParticleBoneData = engine.particle.bone.ParticleBoneData;
var Display3DFacetShader = engine.particle.facet.Display3DFacetShader;
var Display3DFacetParticle = engine.particle.facet.Display3DFacetParticle;
var ParticleFacetData = engine.particle.facet.ParticleFacetData;
var ParticleBallData = engine.particle.ball.ParticleBallData;
var Display3DBallShader = engine.particle.ball.Display3DBallShader;
var Display3DBallPartilce = engine.particle.ball.Display3DBallPartilce;
var ParticleModelData = engine.particle.model.ParticleModelData;
var Display3DModelPartilce = engine.particle.model.Display3DModelPartilce;
var Display3DModelObjParticle = engine.particle.model.Display3DModelObjParticle;
var Display3dModelAnimParticle = engine.particle.model.Display3dModelAnimParticle;
var ParticleFollowData = engine.particle.follow.ParticleFollowData;
var Display3DFollowPartilce = engine.particle.follow.Display3DFollowPartilce;
var ParticleLocusData = engine.particle.locus.ParticleLocusData;
var Display3DLocusPartilce = engine.particle.locus.Display3DLocusPartilce;
var ParticleLocusballData = engine.particle.locusball.ParticleLocusballData;
var Display3DLocusBallPartilce = engine.particle.locusball.Display3DLocusBallPartilce;
var ParticleFollowLocusData = engine.particle.followlocus.ParticleFollowLocusData;
var TimeLine = engine.particle.ctrl.TimeLine;
var TimeLineData = engine.particle.ctrl.TimeLineData;
var UIManager = engine.ui.UIManager;
var UIStage = engine.ui.UIStage;
var UIData = engine.ui.base.UIData;
var UIAtlas = engine.ui.base.UIAtlas;
var UiDraw = engine.ui.base.UiDraw;
var UIMask = engine.ui.base.UIMask;
var TextAlign = engine.ui.base.TextAlign;
var UICompenent = engine.ui.base.UICompenent;
var UIRectangle = engine.ui.base.UIRectangle;
var UIGridRentangle = engine.ui.base.UIGridRentangle;
var UIConatiner = engine.ui.base.UIConatiner;
var UIRenderComponent = engine.ui.base.UIRenderComponent;
var InteractiveEvent = engine.ui.base.InteractiveEvent;
var Dis2DUIContianerBase = engine.ui.base.Dis2DUIContianerBase;
var FrameUIRender = engine.ui.base.FrameUIRender;
var Button = engine.ui.compenent.Button;
var SelectButton = engine.ui.compenent.SelectButton;
var List = engine.ui.compenent.List;
var GridList = engine.ui.compenent.GridList;
var FrameCompenent = engine.ui.compenent.FrameCompenent;
var FrameTipCompenent = engine.ui.compenent.FrameTipCompenent;
var Grid9Compenent = engine.ui.compenent.Grid9Compenent;
var AlphaUICompenent = engine.ui.compenent.AlphaUICompenent;
var AlphaUiContianer = engine.ui.compenent.AlphaUiContianer;
var Dis2DUIContianerPanel = engine.ui.compenent.Dis2DUIContianerPanel;
// 打印
var MAX_LOG_LEVEL = 4;
var log_level = MAX_LOG_LEVEL;
// 本地调试
var isDebug = false;
var getTimeShortStr = function (v) {
    return v;
};
function logd() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (log_level < 4)
        return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[D]");
    console.debug(args.join(" "));
}
function logl() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (log_level < 3)
        return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[L]");
    console.log(args.join(" "));
}
function logw() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (log_level < 2)
        return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[W]");
    console.warn(args.join(" "));
}
function loge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (log_level < 1)
        return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[E]");
    console.error(args.join(" "));
}
// 是否iphoneX
var onIPhoneX = false;
// 启动程序
var Launch = (function () {
    function Launch() {
        var _this = this;
        // 美术设计画布像素高宽
        this.widthDesginPixelw = 480;
        this.heightDesginPixelw = 800;
        // 浏览器可视高宽（在设备上的像素高宽）
        this._designWidth = 0;
        this._designHeight = 0;
        // 客户端画布缩放比
        this._clientScale = 1;
        // 场景缩放比(基于客户端画布缩放比)
        this._sceneScale = 1 * .5;
        // 机器人模式
        this._robotMode = false;
        // 是否休眠
        this.isBlur = false;
        this._showStat = false;
        // 浏览器可视原始高宽
        this._browserClientWidth = 0;
        this._browserClientHeight = 0;
        this._lockOrientation = true;
        this.onPC = false;
        window.onload = function () {
            _this.init();
        };
    }
    Object.defineProperty(Launch.prototype, "showStat", {
        get: function () {
            return this._showStat;
        },
        set: function (v) {
            this._showStat = v;
            this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Launch.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Launch.prototype.init = function () {
        isDebug = (location.href.indexOf("file") == 0);
        // 初始化舞台
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        // 主心跳
        Laya.stage.frameLoop(1, this, this.onUpdate);
        Laya.stage.mouseThrough = true;
        // 监听窗口大小变化
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);
        Laya.stage.addChild(new Laya.Image('res/ui/logo.png'));
        // this._scene2dStart = new scene2d.Scene2dStart();
        // this._scene2dStart.init();
        //  let sp:TestSprite = new TestSprite(this._scene2dStart );
        // Laya.stage.addChild(sp);
        this.onResize();
    };
    // 心跳更新
    Launch.prototype.onUpdate = function () {
        var timer = Laya.timer.currTimer;
        var diff = timer - this._prevUpdateTimer;
        // logd('Launch.onUpdate', timer - this._prevUpdateTimer, diff);   
        this._prevUpdateTimer = timer;
        if (!diff) {
            return;
        }
        // 这样做才能防止白边
        this.checkClientSize();
        // 更新设计分辨率
        // Laya.stage.designWidth = this._designWidth;
        if (Laya.stage.width != this._designWidth)
            Laya.stage.width = this._designWidth;
        // Laya.stage.designHeight = this._designHeight;
        if (Laya.stage.height != this._designHeight)
            Laya.stage.height = this._designHeight;
        // this._scene2dStart && this._scene2dStart.update();
    };
    // 竖屏的缩放值
    //private _verticalClientScale: number = 0;
    // 游戏窗口尺寸发生变化
    Launch.prototype.onResize = function () {
        logd('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio);
        logd('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio);
        logd('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.deviceXDPI, screen.deviceYDPI, screen.pixelDepth);
        logd('onIPhoneX', onIPhoneX);
        this.checkClientSize();
        var sceneScale = this._sceneScale;
        var clientScale = this._clientScale;
        var clientWidth = this._clientWidth;
        var clientHeight = this._clientHeight;
        this._scene2dStart && this._scene2dStart.resetSize(window.innerWidth, window.innerHeight);
    };
    Object.defineProperty(Launch.prototype, "lockOrientation", {
        set: function (v) {
            this._lockOrientation = v;
        },
        enumerable: true,
        configurable: true
    });
    // 校验浏览器可视屏幕像素
    Launch.prototype.checkClientSize = function () {
        var browser_clientWidth = Browser.clientWidth;
        var browser_clientHeight = Browser.clientHeight;
        this.onPC = Browser.onPC;
        if (!this.onPC && this._prevBrowserClientWidth) {
            if ((browser_clientWidth == this._prevBrowserClientWidth
                && browser_clientHeight != this._prevBrowserClientHeight)
                || (browser_clientHeight == this._prevBrowserClientHeight
                    && browser_clientWidth != this._prevBrowserClientWidth)) {
                // 呼出软键盘了
                // if(Laya.stage.screenMode == Stage.SCREEN_HORIZONTAL){
                //     // 如果自动横屏改成竖屏
                //     Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
                //     this.verticalByInput = true;
                // }
                return;
            }
        }
        var __width = browser_clientWidth;
        var __height = browser_clientHeight;
        switch (Laya.stage.screenMode) {
            case Stage.SCREEN_VERTICAL:
                browser_clientHeight = Math.max(__width, __height);
                browser_clientWidth = Math.min(__width, __height);
                break;
            case Stage.SCREEN_HORIZONTAL:
                browser_clientHeight = Math.min(__width, __height);
                browser_clientWidth = Math.max(__width, __height);
                break;
        }
        if (this._browserClientWidth == browser_clientWidth && this._browserClientHeight == browser_clientHeight) {
            return;
        }
        this._browserClientWidth = browser_clientWidth;
        this._browserClientHeight = browser_clientHeight;
        this._prevBrowserClientWidth = browser_clientWidth;
        this._prevBrowserClientHeight = browser_clientHeight;
        this._designWidth = this._browserClientWidth * Browser.pixelRatio;
        this._designHeight = this._browserClientHeight * Browser.pixelRatio;
        if (this._designWidth < this._designHeight && (this._designWidth < 960 || this._designHeight < 576)) {
            // 屏幕太小适应手机的适配方案
            this.onPC = false;
        }
        if (this.onPC) {
            this.widthDesginPixelw = 576;
            this.heightDesginPixelw = 960;
            this._clientScale = Browser.pixelRatio / 1.25;
            if (this._clientScale < 1) {
                this._clientScale = 1;
            }
            this._clientWidth = this._designWidth / this._clientScale;
            this._clientHeight = this._designHeight / this._clientScale;
        }
        else {
            this.widthDesginPixelw = 480;
            this.heightDesginPixelw = 800;
            var wScale = this._designWidth / this.widthDesginPixelw;
            var hScale = this._designHeight / this.heightDesginPixelw;
            this._clientScale = Math.min(wScale, hScale);
            if (wScale > hScale) {
                this._clientWidth = this.heightDesginPixelw * (this._designWidth / this._designHeight);
                this._clientHeight = this.heightDesginPixelw;
            }
            else {
                this._clientWidth = this.widthDesginPixelw;
                this._clientHeight = this.widthDesginPixelw * (this._designHeight / this._designWidth);
            }
        }
    };
    return Launch;
}());
var main = new Launch();
//# sourceMappingURL=Launch.js.map