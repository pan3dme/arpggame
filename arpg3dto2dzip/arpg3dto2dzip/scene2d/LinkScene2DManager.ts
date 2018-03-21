module scene2d {
    export class LinkScene2DManager {
        private static _instance: LinkScene2DManager;
        public static getInstance(): LinkScene2DManager {
            if (!this._instance) {
                this._instance = new LinkScene2DManager();
            }
            return this._instance;
        }
        //播放技能  $fileName技能文件名， $effectName特效名字
        public playSkillByChar($sc: SceneChar, $fileName: string = "jichu_3", $effectName: string = "skill_02"): void {
            var $skill: Skill = SkillManager.getInstance().getSkill(getSkillUrl($fileName), $effectName);
            if (!$skill.keyAry) {
                return;
            }
            $skill.configFixEffect($sc);
            $sc.playSkill($skill);
        }
        //创建角色 2vd为A星坐标
        public makeSceneCharById($id: string, $v2d: Vector2D): Scene2dChar {
            var $tempChar: Scene2dChar = new Scene2dChar();
            $tempChar.setRoleUrl(getRoleUrl($id));
            SceneManager.getInstance().addMovieDisplay($tempChar);
            var $p: Vector3D = SceneAstarModel.getInstance().getWorldPosByStart2D($v2d)
            $tempChar.px = $p.x;
            $tempChar.pz = $p.z;
            return $tempChar
        }
        //清理场景
        public clearScene(): void {
            SceneManager.getInstance().clearStaticScene();
            SceneManager.getInstance().clearScene();
            SceneManager.getInstance().ready = false;
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        }
        //加载地图
        public loadMapById($mapId: number): void {
            LinkScene2DManager.getInstance().clearScene();
            LoadManager.getInstance().load(Scene_data.fileRoot + get2dMapdataById($mapId), LoadManager.XML_TYPE,
                ($str: string) => {
                    Scene_data.sceneNumId++;
                    MapConfig.getInstance().anlyData($str);
                    AstarUtil.makeStarGraph(MapConfig.getInstance().astarItem);
                    SceneGroundModel.getInstance().initData($mapId);
                    SceneAstarModel.getInstance().showAstarLine();
                    SceneManager.getInstance().ready = true
               
                });
        }
        public makesceneChar(): void {
            GameInstance.mainChar = LinkScene2DManager.getInstance().makeSceneCharById("123456", new Vector2D(32, 25));
            AppDataArpg.lockMainChar = true;
            GameInstance.mainChar.showName("习近d平")
            GameInstance.mainChar.showBlood(0)
            for (var i: number = 0; i < 10; i++) {
             //   LinkScene2DManager.getInstance().makeSceneCharById("50001", new Vector2D(32 + random(10) - 5, 25 + random(10) - 5));
            }
        }
        private addRandomPostion(): void {
            //690060
            //690052
            //690092
            for (var i: number = 0; i < 20; i++) {
                var $sceneChar: SceneChar = LinkScene2DManager.getInstance().makeSceneCharById("690092", new Vector2D(random(50), random(50)));
                $sceneChar.showBlood(1)
                $sceneChar.showName("习近平")
            }

        }
        public addChuanshongDian($v2d: Vector2D): ScenePortal {
            var $tempChar: ScenePortal = new ScenePortal();
            SceneManager.getInstance().addMovieDisplay($tempChar);
            var $p: Vector3D = AstarUtil.getWorldPosByStart2D($v2d);
            $tempChar.setAvatar(670001)
            $tempChar.px = $p.x;
            $tempChar.pz = $p.z;
            return $tempChar
        }
    }

}