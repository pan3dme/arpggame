var pan3d;
(function (pan3d) {
    var Scene3dInit = /** @class */ (function () {
        function Scene3dInit() {
        }
        Scene3dInit.initData = function () {
            //替换SceneManager场景管理对象；
            pan3d.OverrideSceneManager.initConfig();
            //替换Engine引擎对象；
            pan3d.OverrideEngine.initConfig();
            Scene_data.fileRoot = " http://" + document.domain + "/res/";
            Engine.init(main.canvas); //初始化场景
            Engine.resetSize(main.canvas.width, main.canvas.height); //设置canvas大小
            Engine.initPbr();
            Scene3dInit.isConfig = true; //完成
            SceneManager.getInstance().ready = true; //场景update可以
            this.addGridLineSprite();
            new scenedis.CharSkillPlayModel();
            //new CharModelShow();
            //    scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
            //  scenedis.SceneMouseEventModel.getInstance().initSceneFocueEvent();
        };
        Scene3dInit.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        };
        Scene3dInit.isConfig = false;
        return Scene3dInit;
    }());
    pan3d.Scene3dInit = Scene3dInit;
})(pan3d || (pan3d = {}));
//# sourceMappingURL=Scene3dInit.js.map