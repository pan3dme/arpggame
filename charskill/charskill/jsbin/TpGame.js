var TpGame = /** @class */ (function () {
    function TpGame() {
        this.uiReadyNum = 0;
        this.uiAllNum = 0;
    }
    TpGame.prototype.init = function () {
        this.loadDataComplet();
    };
    TpGame.prototype.loadDataComplet = function () {
        TpModuleList.startup(); //启动所有模块
        Engine.initPbr();
        SkillMouseManager.getInstance().addMouseEvent();
        SkillMouseEventModel.getInstance().initSceneFocueEvent();
        this.loadBaseMap();
    };
    TpGame.prototype.loadBaseMap = function () {
        var $evt = new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT);
        $evt.mapId = 1003;
        $evt.mapId = 1005;
        $evt.mapId = 5001;
        ModuleEventManager.dispatchEvent($evt);
    };
    /**是否是外网 */
    TpGame.outNet = false;
    TpGame.GM = true;
    TpGame.ready = false;
    return TpGame;
}());
//# sourceMappingURL=TpGame.js.map