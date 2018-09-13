module pan3d {
    export class Scene3dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            //替换SceneManager场景管理对象；
            OverrideSceneManager.initConfig()
            //替换Engine引擎对象；
            OverrideEngine.initConfig()
            Scene_data.fileRoot = " http://" + document.domain + "/res/";

            Engine.init(main.canvas) //初始化场景
            Engine.resetSize(main.canvas.width, main.canvas.height); //设置canvas大小
            Engine.initPbr();
            Scene3dInit.isConfig = true;   //完成
            SceneManager.getInstance().ready = true; //场景update可以



            this.addGridLineSprite();

         //   new scenedis.CharSkillPlayModel();
            //new CharModelShow();
           scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
            scenedis.SceneMouseEventModel.getInstance().initSceneFocueEvent();

          
            Scene_data.cam3D.distance=400
            document.addEventListener(MouseType.KeyDown, ($evt: KeyboardEvent) => {

                Scene3dInit.playLyf("model/npc_0001_lyf.txt");


            })

        //    SceneManager.getInstance().loadScene("1", Scene3dInit.configFinish, Scene3dInit.mainSceneProgress, Scene3dInit.mainSceneAnalysisComplete)
        }
        private static mainSceneProgress(num: number): void {
            console.log(num)
        }
        private static mainSceneAnalysisComplete(): void {
           
        }
        private static configFinish(): void {
        }
        public static playLyf($url: string): void {

            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + $url, (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        ParticleManager.getInstance().addParticle($particle);
                        // $particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
                    } else {
                        //console.log("播放的不是单纯特效");
                    }
                }
            })

        }
        private static addGridLineSprite(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        }




    }
}