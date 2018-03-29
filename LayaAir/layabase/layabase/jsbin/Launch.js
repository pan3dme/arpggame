var Browser = Laya.Browser;
var Loader = Laya.Loader;
var LEvent = Laya.Event;
var Stage = Laya.Stage;
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
var Launch = /** @class */ (function () {
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
        var $imag = new Laya.Image('res/ui/blood.png');
        $imag.pos(500, 400);
        $imag.pos(500, 500);
        Laya.stage.addChild($imag);
        // this._scene2dStart = new scene2d.Scene2dStart();
        // this._scene2dStart.init();
        //  var sp:TestSprite = new TestSprite(this._scene2dStart );
        //Laya.stage.addChild(sp);
        this.onResize();
        Laya.loader.load("res/ui/logo.png", Laya.Handler.create(this, this.loadComplete));
    };
    Launch.prototype.loadComplete = function () {
        var texture = Laya.Loader.getRes("res/ui/logo.png");
        var spe = new myShaderSprite();
        spe.init(texture);
        spe.pos(0, 0);
        Laya.stage.addChild(spe);
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