var pan2d;
(function (pan2d) {
    var Scene2dInit = /** @class */ (function () {
        function Scene2dInit() {
        }
        Scene2dInit.initData = function () {
            //替换SceneManager场景管理对象；
            pan2d.Override2dSceneManager.initConfig();
            //替换Engine引擎对象；
            pan2d.Override2dEngine.initConfig();
            Scene_data.fileRoot = " http://" + document.domain + "/res/";
            Engine.init(main.canvas); //初始化场景
            Engine.resetSize(main.canvas.width, main.canvas.height); //设置canvas大小
            Engine.initPbr();
            Scene2dInit.isConfig = true; //完成
            SceneManager.getInstance().ready = true; //场景update可以
            //AppDataArpg.refrishPos(AppDataArpg.sceneStagePos)
            this.addGridLineSprite();
            // new scenedis.CharModelShow();
            new scenedis.CharSkillPlayModel();
            scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
        };
        Scene2dInit.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        };
        Scene2dInit.isConfig = false;
        return Scene2dInit;
    }());
    pan2d.Scene2dInit = Scene2dInit;
})(pan2d || (pan2d = {}));
//# sourceMappingURL=Scene2dInit.js.map