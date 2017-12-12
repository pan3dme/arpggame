class WindowUi extends UIPanel {

    private winbgRender: UIRenderComponent;
    protected bigPic: UIRenderOnlyPicComponent;
    protected winmidRender: UIRenderComponent;
    protected wintopRender: UIRenderComponent;
    private _baImg: UIBackImg;
    public static winUIAtlas: UIAtlas

    private _titlenum: number
    public constructor(titlenum: number = 0) {
        super();
        this._titlenum = titlenum;
        this.addWinUiPanel();
    }

    private addWinUiPanel(): void {
        this._baImg = new UIBackImg();
        this._baImg.alpha = 0.5;
        // this._baImg.setImgInfo("ui/uidata/basebg/skillbg.png", 128, 64);
        this._baImg.setFbo();
        this.addRender(this._baImg);
        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.bigPic = new UIRenderOnlyPicComponent;
        this.addRender(this.bigPic);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);

        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);

    }
    public bigPicUI: UICompenent
    public loadBigPicByUrl($url: string): UICompenent {
        this.bigPic.setImgUrl($url);
        if (!this.bigPicUI) {
            this.bigPicUI = this.addChild(this.bigPic.getComponent("w_bg"));
        }
        return this.bigPicUI;
    }

    public addBigPic():void{
        if(this.bigPicUI && !this.bigPicUI.parent){
            this.addChild(this.bigPicUI);
        }
    }

    public removeBigPic():void{
        if(this.bigPicUI && this.bigPicUI.parent){
            this.removeChild(this.bigPicUI);
        }
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
    private w_tittle_bg_left: UICompenent;
    private w_height_left: UICompenent;
    private w_angle_left: UICompenent;

    private w_tittle_bg_right: UICompenent;
    private w_height_right: UICompenent;
    private w_angle_right: UICompenent;

    private w_width: UICompenent;
    protected w_close: UICompenent

    private winComplete(): void {

        this.wintopRender.uiAtlas = WindowUi.winUIAtlas;
        this.winbgRender.uiAtlas = WindowUi.winUIAtlas;
        this.bigPic.uiAtlas = WindowUi.winUIAtlas;

        this.addChild(this.winbgRender.getComponent("w_bg"));
        // var w_bg: UICompenent = this.addEvntBut("w_bg", this.winbgRender)
        // w_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);


        this.w_height_left = this.addChild(this.wintopRender.getComponent("w_height"));
        this.w_height_right = this.addChild(this.wintopRender.getComponent("w_height"));

        this.w_width = this.addChild(this.wintopRender.getComponent("w_width"));

        this.w_tittle_bg_left = this.addChild(this.wintopRender.getComponent("w_tittle_bg"));
        this.w_tittle_bg_right = this.addChild(this.wintopRender.getComponent("w_tittle_bg"));

        this.w_angle_right = this.addChild(this.wintopRender.getComponent("w_angle"));
        this.w_angle_left = this.addChild(this.wintopRender.getComponent("w_angle"));


        this.w_close = this.addEvntButUp("w_close", this.wintopRender);



        this.applyLoad();

    }
 
    public resize(): void {
        super.resize();
        if (this.w_tittle_bg_right) {
            this.w_tittle_bg_right.isU = true
            this.w_tittle_bg_right.x = this.w_tittle_bg_left.x + this.w_tittle_bg_left.width - 0;

            this.w_angle_right.isU = true
            this.w_angle_right.x = (this.w_tittle_bg_right.x + this.w_tittle_bg_right.width) - this.w_angle_right.width - 7;

            this.w_height_right.isU = true
            this.w_height_right.x = this.w_angle_right.x + this.w_angle_right.width - this.w_height_right.width - 9;

            this.wintopRender.applyObjData();


        }
    }
    public hide(): void {
        ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    }

    public onAdd(): void {
        super.onAdd();
        SceneManager.getInstance().updateFBO();
    }

    public dispose():void{
        if(this.winbgRender){
            this.winbgRender.uiAtlas = null;
            this.winbgRender.dispose();
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

        if(this._baImg){
            this._baImg.dispose();
        }

    }

}