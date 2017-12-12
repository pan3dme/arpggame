
class PopWindowMin extends UIPanel {

    private winbgRender: UIRenderComponent;
    protected winmidRender: UIRenderComponent;
    private wintopRender: UIRenderComponent;


    public static winUIAtlas: UIAtlas
    public constructor() {
        super();
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

        this.applyLoad();


    }


    public hide(): void {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    }



}
