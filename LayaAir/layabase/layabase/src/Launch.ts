import Browser = Laya.Browser;
import Loader = Laya.Loader;
import LEvent = Laya.Event;
import Stage = Laya.Stage;


// 打印
let MAX_LOG_LEVEL = 4
let log_level = MAX_LOG_LEVEL

// 本地调试
var isDebug: boolean = false;
var getTimeShortStr :Function = (v:number)=>{
    return v;
};
function logd(...args: any[]): void {
    if (log_level < 4) return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[D]");
    console.debug(args.join(" "));
}

function logl(...args: any[]): void {
    if (log_level < 3) return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[L]");
    console.log(args.join(" "));
}

function logw(...args: any[]): void {
    if (log_level < 2) return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[W]");
    console.warn(args.join(" "));
}

function loge(...args: any[]): void {
    if (log_level < 1) return;
    args.unshift(getTimeShortStr(Laya.timer.currTimer));
    args.unshift("[E]");
    console.error(args.join(" "));
}

// 是否iphoneX
var onIPhoneX: boolean = false;

// 启动程序
class Launch {
    // 美术设计画布像素高宽
    widthDesginPixelw: number = 480;
    heightDesginPixelw: number = 800;
    // 浏览器可视画布像素高宽
    private _clientWidth: number;
    private _clientHeight: number;
    // 浏览器可视高宽（在设备上的像素高宽）
    private _designWidth: number = 0;
    private _designHeight: number = 0;
    // 客户端画布缩放比
    private _clientScale: number = 1;
    // 场景缩放比(基于客户端画布缩放比)
    private _sceneScale: number = 1 * .5;
    // 机器人模式
    private _robotMode: boolean = false;
    // 是否休眠
    isBlur: boolean = false;

    private _showStat: boolean = false;
    get showStat(): boolean {
        return this._showStat;
    }
    set showStat(v: boolean) {
        this._showStat = v;
        this._showStat ? Laya.Stat.show() : Laya.Stat.hide();
    }

    private _canvas:HTMLCanvasElement;
    get canvas():HTMLCanvasElement{
        return this._canvas;
    }


    constructor() {
         window.onload = () => {
            this.init();
        }
    }

    private init(): void {
        isDebug = (location.href.indexOf("file") == 0);
        // 初始化舞台
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        // 主心跳
        Laya.stage.frameLoop(1, this, this.onUpdate);
        Laya.stage.mouseThrough = true;
        // 监听窗口大小变化
        Laya.stage.on(LEvent.RESIZE, this, this.onResize);

        /*
        var $imag: Laya.Image = new Laya.Image('res/ui/blood.png')
        $imag.pos(500, 400)
        $imag.pos(500, 500)
        Laya.stage.addChild($imag);

        var $imag: Laya.Image = new Laya.Image('res/ui/logo.png')
        $imag.pos(100, 500)
        Laya.stage.addChild($imag);

        var $imag: Laya.Image = new Laya.Image('res/ui/logo.png')
        $imag.pos(300, 500)
        Laya.stage.addChild($imag);

        var $imag: Laya.Image = new Laya.Image('res/ui/logo.png')
        $imag.pos(600, 500)
        Laya.stage.addChild($imag);
        */
        this.onResize();
        Laya.loader.load("res/ui/logo.png", Laya.Handler.create(this, this.loadComplete));
    }
    private loadComplete(): void {
        var texture: Laya.Texture = Laya.Loader.getRes("res/ui/logo.png");
        var spe: myShaderSprite = new myShaderSprite();
        spe.init(texture);
        spe.pos(0, 0);
        Laya.stage.addChild(spe);


   
    }

    private _prevUpdateTimer: number;
    // 心跳更新
    private onUpdate(): void {
        let timer = Laya.timer.currTimer;
        let diff = timer - this._prevUpdateTimer;
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
    }

    // 竖屏的缩放值
    //private _verticalClientScale: number = 0;

    // 游戏窗口尺寸发生变化
    onResize(): void {
        logd('Browser:', Browser.width, Browser.height, Browser.clientWidth, Browser.clientHeight, Browser.pixelRatio)
        logd('window:', window.innerWidth, window.innerHeight, window.outerWidth, window.outerHeight, window.devicePixelRatio)
        logd('screen:', screen.width, screen.height, screen.availWidth, screen.availHeight, screen.deviceXDPI, screen.deviceYDPI, screen.pixelDepth)
        logd('onIPhoneX', onIPhoneX)
        this.checkClientSize();
        let sceneScale = this._sceneScale;
        let clientScale = this._clientScale;
        let clientWidth = this._clientWidth;
        let clientHeight = this._clientHeight;

        if (Scene_data.canvas3D) {
            Engine.resetSize(clientWidth, clientHeight)
        }

    
    }

    // 浏览器可视原始高宽
    private _browserClientWidth: number = 0;
    private _browserClientHeight: number = 0;
    private _prevBrowserClientWidth: number;
    private _prevBrowserClientHeight: number;

    private _lockOrientation: boolean = true;
    private set lockOrientation(v: boolean) {
        this._lockOrientation = v;
    }

    onPC: boolean = false;
    // 校验浏览器可视屏幕像素
    private checkClientSize(): void {
        let browser_clientWidth = Browser.clientWidth;
        let browser_clientHeight = Browser.clientHeight;
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

        let __width = browser_clientWidth;
        let __height = browser_clientHeight;
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
            let wScale = this._designWidth / this.widthDesginPixelw;
            let hScale = this._designHeight / this.heightDesginPixelw;

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
    }
}

var main = new Launch();
