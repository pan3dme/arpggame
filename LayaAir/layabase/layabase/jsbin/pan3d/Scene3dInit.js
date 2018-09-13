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
            //   new scenedis.CharSkillPlayModel();
            //new CharModelShow();
            scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
            scenedis.SceneMouseEventModel.getInstance().initSceneFocueEvent();
            Scene_data.cam3D.distance = 400;
            document.addEventListener(MouseType.KeyDown, function ($evt) {
                Scene3dInit.playLyf("model/npc_0001_lyf.txt");
            });
            //    SceneManager.getInstance().loadScene("1", Scene3dInit.configFinish, Scene3dInit.mainSceneProgress, Scene3dInit.mainSceneAnalysisComplete)
        };
        Scene3dInit.mainSceneProgress = function (num) {
            console.log(num);
        };
        Scene3dInit.mainSceneAnalysisComplete = function () {
        };
        Scene3dInit.configFinish = function () {
        };
        Scene3dInit.playLyf = function ($url) {
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + $url, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        ParticleManager.getInstance().addParticle($particle);
                        // $particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
                    }
                    else {
                        //console.log("播放的不是单纯特效");
                    }
                }
            });
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