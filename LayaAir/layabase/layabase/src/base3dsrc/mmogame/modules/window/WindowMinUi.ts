class WindowMinUi extends UIPanel {

    private winbgRender: UIRenderComponent;
    protected winmidRender: UIRenderComponent;
    protected wintopRender: UIRenderComponent;
    private winBlackBgRender: UIRenderComponent;
    protected bigPic: UIRenderOnlyPicComponent;


    public dispose():void{
        if(this.winbgRender){
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
        }
        if(this.winBlackBgRender){
            this.winBlackBgRender.uiAtlas = null;
            this.winBlackBgRender.dispose();
        }
        if(this.bigPic){
            this.bigPic.uiAtlas = null;
            this.bigPic.dispose();
        }

        if(this.winmidRender){
            this.winmidRender.uiAtlas = null;
            this.winmidRender.dispose();
        }
        if(this.wintopRender){
            this.wintopRender.uiAtlas = null;
            this.wintopRender.dispose();
        }
    }


    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.right = 0;
        this.middle = 0;
        this.addWinUiPanel();
    }

    private addWinUiPanel(): void {


        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);

        this.bigPic = new UIRenderOnlyPicComponent;
        this.addRender(this.bigPic);

        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
    }

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
        this.winBlackBgRender.uiAtlas = WindowUi.winUIAtlas;
        this.addRenderAt(this.winBlackBgRender, 0);
        this._blackBgUI = this.winBlackBgRender.getComponent("w_black_bg");
        this.addChild(this._blackBgUI);
        this._blackBgUI.addEventListener(InteractiveEvent.Down,v=>{}, this);
        this._blackBgUI.addEventListener(InteractiveEvent.Up,v=>{}, this);
    }

    protected makeBaseWinUi(): void {
        if (!WindowUi.winUIAtlas) {
            WindowUi.winUIAtlas = new UIAtlas;
        }
        if (!WindowUi.winUIAtlas.configData) {
            WindowUi.winUIAtlas.setInfo("ui/uidata/window/window.xml", "ui/uidata/window/window.png", () => { this.winComplete() });
        } else {
            if (this.wintopRender.uiAtlas) {
                this.applyLoad();
            } else {
                this.winComplete();
            }
        }
    }
    private e_tittle_bg_left: UICompenent;
    private e_height_left: UICompenent;
    private e_angle_left: UICompenent;

    private e_tittle_bg_right: UICompenent;
    private e_height_right: UICompenent;
    private e_angle_right: UICompenent;

    private e_width: UICompenent;
    protected e_close: UICompenent;
    protected e_bg: UICompenent;
    protected baseBg: UICompenent;
    private _hasInit: boolean = false;
    private winComplete(): void {

        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;

        this.baseBg = this.addEvntBut("baseBg", this.winbgRender);
        this.e_bg = this.addEvntBut("e_bg", this.winbgRender);
        this.e_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        this.e_tittle_bg_left = this.addChild(this.wintopRender.getComponent("e_tittle_bg"));
        this.e_height_left = this.addChild(this.winbgRender.getComponent("e_height"));
        this.e_angle_left = this.addChild(this.wintopRender.getComponent("e_angle"));

        this.e_tittle_bg_right = this.addChild(this.wintopRender.getComponent("e_tittle_bg"));
        this.e_height_right = this.addChild(this.winbgRender.getComponent("e_height"));
        this.e_angle_right = this.addChild(this.wintopRender.getComponent("e_angle"));

        this.e_width = this.addChild(this.wintopRender.getComponent("e_width"));
        this.e_close = this.addEvntButUp("e_close", this.wintopRender);

        if (this._needBlackBg) {
            this.addBlackBg();
        }


        this._hasInit = true;


        this.applyLoad();

        this.resize();

    }
    public resize(): void {
        super.resize();
        if (this.wintopRender.uiAtlas) {
            this.e_tittle_bg_right.isU = true
            this.e_tittle_bg_right.x = this.e_tittle_bg_left.x + this.e_tittle_bg_left.width - 0;

            this.e_angle_right.isU = true
            this.e_angle_right.x = (this.e_tittle_bg_right.x + this.e_tittle_bg_right.width) - this.e_angle_right.width - 8;

            this.e_height_right.isU = true
            this.e_height_right.x = this.e_angle_right.x + this.e_angle_right.width - this.e_height_right.width - 9;

            this.winbgRender.applyObjData();
            this.wintopRender.applyObjData();

            if (this._blackBgUI) {
                this._blackBgUI.left = 0;
                this._blackBgUI.top = 0;
                this._blackBgUI.height = Scene_data.stageHeight / UIData.Scale;
                this._blackBgUI.width = Scene_data.stageWidth / UIData.Scale;
            }

        }
    }

    public hide(): void {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    }



}