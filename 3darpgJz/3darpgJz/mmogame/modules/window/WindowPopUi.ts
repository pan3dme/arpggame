class WindowPopUi extends UIPanel {

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
        this._blackBgUI.addEventListener(InteractiveEvent.Down,v=>{}, this);
        this._blackBgUI.addEventListener(InteractiveEvent.Up,v=>{}, this);
        this.addChild(this._blackBgUI);
    }

    private _titlenum: number
    public constructor(titlenum: number = 0) {
        super();
        this._titlenum = titlenum;
        this.addWinUiPanel();
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

    private _hasInit: boolean = false;
    private f_tittle_bg_left: UICompenent;
    private f_height_left: UICompenent;
    private f_angle_left: UICompenent;

    private f_tittle_bg_right: UICompenent;
    private f_height_right: UICompenent;
    private f_angle_right: UICompenent;

    private f_width: UICompenent;
    protected f_close: UICompenent;
    private f_bg: UICompenent
    private winComplete(): void {

        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;

        this.f_bg = this.addChild(this.winbgRender.getComponent("f_bg"));
        this.f_width = this.addChild(this.wintopRender.getComponent("f_width"));
        this.f_height_left = this.addChild(this.wintopRender.getComponent("f_height"));
        this.f_tittle_bg_left = this.addChild(this.wintopRender.getComponent("f_tittle_bg"));
        this.f_angle_left = this.addChild(this.wintopRender.getComponent("f_angle"));

        this.f_height_right = this.addChild(this.wintopRender.getComponent("f_height"));
        this.f_tittle_bg_right = this.addChild(this.wintopRender.getComponent("f_tittle_bg"));
        this.f_angle_right = this.addChild(this.wintopRender.getComponent("f_angle"));


        this.f_close = this.addEvntButUp("f_close", this.wintopRender);


        if (this._needBlackBg) {
            this.addBlackBg();
        }
        this._hasInit = true;


        this.applyLoad();

    }
    public resize(): void {
        super.resize();
        if(this._blackBgUI){
            this._blackBgUI.width = UIData.designWidth
            this._blackBgUI.height = UIData.designHeight
        }
        if (this.winbgRender.uiAtlas) {
            this.f_tittle_bg_right.isU = true
            this.f_tittle_bg_right.x = this.f_tittle_bg_left.x + this.f_tittle_bg_left.width - 1;

            this.f_height_right.isU = true
            this.f_height_right.x = this.f_tittle_bg_right.x + this.f_tittle_bg_right.width - this.f_height_right.width - 19;

            this.f_angle_right.isU = true
            this.f_angle_right.x = (this.f_tittle_bg_right.x + this.f_tittle_bg_right.width) - this.f_angle_right.width - 21;

            this.wintopRender.applyObjData();

        }
    }

    public hide(): void {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    }



}