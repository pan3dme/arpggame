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

            new scenedis.CharSkillPlayModel();
            //new CharModelShow();
        //    scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
          //  scenedis.SceneMouseEventModel.getInstance().initSceneFocueEvent();
        }
        private static addGridLineSprite(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        }




    }
}