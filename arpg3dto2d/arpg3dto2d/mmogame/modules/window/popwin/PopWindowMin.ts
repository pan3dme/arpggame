
class PopWindowMin extends UIPanel {

    private winbgRender: UIRenderComponent;
    protected winmidRender: UIRenderComponent;
    private wintopRender: UIRenderComponent;
    private winBlackBgRender: UIRenderComponent;


    public static winUIAtlas: UIAtlas
    public constructor() {
        super();
        this.addWinUiPanel();
    }

    public dispose(): void {
        if (this.winbgRender) {
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
        }
        if (this.winBlackBgRender) {
            this.winBlackBgRender.uiAtlas = null;
            this.winBlackBgRender.dispose();
        }

        if (this.winmidRender) {
            this.winmidRender.uiAtlas = null;
            this.winmidRender.dispose();
        }
        if (this.wintopRender) {
            this.wintopRender.uiAtlas = null;
            this.wintopRender.dispose();
        }
    }
    private _hasInit: boolean = false;
    private _needBlackBg: boolean = false;
    protected setBlackBg(): void {
        this._needBlackBg = true;
        if (this._hasInit) {
            this.addBlackBg();
        }
    }

    private _blackBgUI: UICompenent;
    private addBlackBg(): void {
        this.winBlackBgRender = new UIRenderComponent;
        this.winBlackBgRender.uiAtlas = PopWindowMin.winUIAtlas;
        this.addRenderAt(this.winBlackBgRender, 0);
        this._blackBgUI = this.winBlackBgRender.getComponent("w_black_bg");
        this.addChild(this._blackBgUI);
        this._blackBgUI.addEventListener(InteractiveEvent.Down, v => { }, this);
        this._blackBgUI.addEventListener(InteractiveEvent.Up, v => { }, this);
    }


    private addWinUiPanel(): void {


        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
    }
    protected makeBaseWinUi(): void {
        if (!PopWindowMin.winUIAtlas) {
            PopWindowMin.winUIAtlas = new UIAtlas;
        }
        if (!PopWindowMin.winUIAtlas.configData) {
            PopWindowMin.winUIAtlas.setInfo("ui/uidata/window/popwin/popwin.xml", "ui/uidata/window/popwin/popwin.png", () => { this.winComplete() });
        } else {
            if (this.wintopRender.uiAtlas) {
                this.applyLoad();
            } else {
                this.winComplete();
            }
        }
    }

    private winComplete(): void {

        this.wintopRender.uiAtlas = PopWindowMin.winUIAtlas;
        this.winbgRender.uiAtlas = PopWindowMin.winUIAtlas;



        this.addChild(this.winbgRender.getComponent("b_win_bg"));
        this.addChild(this.wintopRender.getComponent("b_tittle_bg"));

        if (this._needBlackBg) {
            this.addBlackBg();
        }
        this._hasInit = true;

        this.applyLoad();


    }


    public hide(): void {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    }


    public resize(): void {
        super.resize();
        if (this._blackBgUI) {
            this._blackBgUI.left = 0;
            this._blackBgUI.top = 0;
            this._blackBgUI.height = Scene_data.stageHeight / UIData.Scale;
            this._blackBgUI.width = Scene_data.stageWidth / UIData.Scale;
        }

    }



}
