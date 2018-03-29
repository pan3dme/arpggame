module pan2d {
    export class Scene2dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            //替换SceneManager场景管理对象；
            Override2dSceneManager.initConfig();
            //替换Engine引擎对象；
            Override2dEngine.initConfig();
            Scene_data.fileRoot = " http://" + document.domain + "/res/";

            Engine.init(main.canvas) //初始化场景
            Engine.resetSize(main.canvas.width, main.canvas.height); //设置canvas大小
            Engine.initPbr();
            Scene2dInit.isConfig = true;   //完成
            SceneManager.getInstance().ready = true; //场景update可以

            //AppDataArpg.refrishPos(AppDataArpg.sceneStagePos)

            this.addGridLineSprite();

           // new scenedis.CharModelShow();
            new scenedis.CharSkillPlayModel();

            scenedis.ModelshowMouseManager.getInstance().addMouseEvent();
        }
        private static addGridLineSprite(): void {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            SceneManager.getInstance().addDisplay(new GridLineSprite());
        }




    }
}