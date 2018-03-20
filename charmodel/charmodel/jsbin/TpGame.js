var TpGame = /** @class */ (function () {
    function TpGame() {
        this.uiReadyNum = 0;
        this.uiAllNum = 0;
    }
    TpGame.prototype.init = function () {
        this.loadDataComplet();
    };
    TpGame.prototype.loadDataComplet = function () {
        CharShow.TpModuleList.startup(); //启动所有模块
        Engine.initPbr();
        CharShow.ModelshowMouseManager.getInstance().addMouseEvent();
        CharShow.SceneMouseEventModel.getInstance().initSceneFocueEvent();
        this.loadBaseMap();
    };
    TpGame.prototype.loadBaseMap = function () {
        var $evt = new CharShow.TpSceneEvent(CharShow.TpSceneEvent.SHOW_TP_SCENE_EVENT);
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