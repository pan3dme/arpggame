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
        TpModuleList.startup();//启动所有模块
        Engine.initPbr();
        SkillMouseManager.getInstance().addMouseEvent();
        SkillMouseEventModel.getInstance().initSceneFocueEvent();
        this.loadBaseMap()
    }
    private loadBaseMap(): void
    {
        var $evt: TpSceneEvent = new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT);
        $evt.mapId = 1003
        $evt.mapId = 1005
        $evt.mapId = 5001
        ModuleEventManager.dispatchEvent($evt);
    }
}