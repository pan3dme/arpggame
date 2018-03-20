class TpGame {
    /**是否是外网 */
    public static outNet: boolean = false;
    public static GM: boolean = true
    public static ready: boolean = false;
    public uiReadyNum: number = 0;
    public uiAllNum: number = 0;
    public init(): void {

        this.loadDataComplet();
    }
    private loadDataComplet(): void {
        CharShow.TpModuleList.startup();//启动所有模块
        Engine.initPbr();
        CharShow.ModelshowMouseManager.getInstance().addMouseEvent();
        CharShow.SceneMouseEventModel.getInstance().initSceneFocueEvent();
        this.loadBaseMap()
    }
    private loadBaseMap(): void
    {
        var $evt: CharShow.TpSceneEvent = new CharShow.TpSceneEvent(CharShow.TpSceneEvent.SHOW_TP_SCENE_EVENT);
        $evt.mapId = 5001
        ModuleEventManager.dispatchEvent($evt);
    }
}