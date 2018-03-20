class WindowCentenMin extends UIPanel {

    private winbgRender: UIRenderComponent;
    protected winmidRender: UIRenderComponent;
    private wintopRender: UIRenderComponent;
    private winBlackBgRender: UIRenderComponent;

    public dispose():void{
        if(this.winbgRender){
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
        }
        if(this.winBlackBgRender){
            this.winBlackBgRender.uiAtlas = null;
            this.winBlackBgRender.dispose();
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

    private _titlenum: number
    public constructor(titlenum: number = 0) {
        super();
        this._titlenum = titlenum;
        this.addWinUiPanel();
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

    private addWinUiPanel(): void {


        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
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
    private c_tittle_bg_left: UICompenent;
    private c_height_left: UICompenent;
    private c_angle_left: UICompenent;

    private c_tittle_bg_right: UICompenent;
    private c_height_right: UICompenent;
    private c_angle_right: UICompenent;

    private c_width: UICompenent;
    protected c_close: UICompenent;
    private c_bg: UICompenent
    private _hasInit: boolean = false;
    private winComplete(): void {

        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;

        this.c_bg = this.addChild(this.winbgRender.getComponent("c_bg"));
        this.c_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
        this.c_tittle_bg_left = this.addChild(this.wintopRender.getComponent("c_tittle_bg"));
        this.c_height_left = this.addChild(this.winbgRender.getComponent("c_height"));
        this.c_angle_left = this.addChild(this.wintopRender.getComponent("c_angle"));

        this.c_tittle_bg_right = this.addChild(this.wintopRender.getComponent("c_tittle_bg"));
        this.c_height_right = this.addChild(this.winbgRender.getComponent("c_height"));
        this.c_angle_right = this.addChild(this.wintopRender.getComponent("c_angle"));

        this.c_width = this.addChild(this.wintopRender.getComponent("c_width"));
        this.c_close = this.addEvntButUp("c_close", this.wintopRender);


        if (this._needBlackBg) {
            this.addBlackBg();
        }
        this._hasInit = true;

        this.applyLoad();

    }
    public resize(): void {
        super.resize();
        if (this.winbgRender) {
            this.c_tittle_bg_right.isU = true
            this.c_tittle_bg_right.x = this.c_tittle_bg_left.x + this.c_tittle_bg_left.width - 1;

            this.c_angle_right.isU = true
            this.c_angle_right.x = (this.c_tittle_bg_right.x + this.c_tittle_bg_right.width) - this.c_angle_right.width - 21;

            this.c_height_right.isU = true
            this.c_height_right.x = this.c_angle_right.x + this.c_angle_right.width - this.c_height_right.width + 2;

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