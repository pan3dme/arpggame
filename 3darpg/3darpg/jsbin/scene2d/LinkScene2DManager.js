var scene2d;
(function (scene2d) {
    var LinkScene2DManager = /** @class */ (function () {
        function LinkScene2DManager() {
        }
        LinkScene2DManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new LinkScene2DManager();
            }
            return this._instance;
        };
        //播放技能  $fileName技能文件名， $effectName特效名字
        LinkScene2DManager.prototype.playSkillByChar = function ($sc, $fileName, $effectName) {
            if ($fileName === void 0) { $fileName = "jichu_3"; }
            if ($effectName === void 0) { $effectName = "skill_02"; }
            var $skill = SkillManager.getInstance().getSkill(getSkillUrl($fileName), $effectName);
            if (!$skill.keyAry) {
                return;
            }
            $skill.configFixEffect($sc);
            $sc.playSkill($skill);
        };
        //创建角色 2vd为A星坐标
        LinkScene2DManager.prototype.makeSceneCharById = function ($id, $v2d) {
            var $tempChar = new scene2d.Scene2dChar();
            $tempChar.setRoleUrl(getRoleUrl($id));
            SceneManager.getInstance().addMovieDisplay($tempChar);
            var $p = scene2d.SceneAstarModel.getInstance().getWorldPosByStart2D($v2d);
            $tempChar.px = $p.x;
            $tempChar.pz = $p.z;
            return $tempChar;
        };
        //清理场景
        LinkScene2DManager.prototype.clearScene = function () {
            SceneManager.getInstance().clearStaticScene();
            SceneManager.getInstance().clearScene();
            SceneManager.getInstance().ready = false;
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        };
        //加载地图
        LinkScene2DManager.prototype.loadMapById = function ($mapId) {
            LinkScene2DManager.getInstance().clearScene();
            LoadManager.getInstance().load(Scene_data.fileRoot + get2dMapdataById($mapId), LoadManager.XML_TYPE, function ($str) {
                Scene_data.sceneNumId++;
                scene2d.MapConfig.getInstance().anlyData($str);
                AstarUtil.makeStarGraph(scene2d.MapConfig.getInstance().astarItem);
                scene2d.SceneGroundModel.getInstance().initData($mapId);
                scene2d.SceneAstarModel.getInstance().showAstarLine();
                SceneManager.getInstance().ready = true;
            });
        };
        LinkScene2DManager.prototype.makesceneChar = function () {
            GameInstance.mainChar = LinkScene2DManager.getInstance().makeSceneCharById("50001", new Vector2D(32, 25));
            scene2d.AppDataArpg.lockMainChar = true;
            GameInstance.mainChar.showName("习近平");
            GameInstance.mainChar.showBlood(0);
            for (var i = 0; i < 10; i++) {
                //   LinkScene2DManager.getInstance().makeSceneCharById("50001", new Vector2D(32 + random(10) - 5, 25 + random(10) - 5));
            }
        };
        LinkScene2DManager.prototype.addRandomPostion = function () {
            //690060
            //690052
            //690092
            for (var i = 0; i < 20; i++) {
                var $sceneChar = LinkScene2DManager.getInstance().makeSceneCharById("690092", new Vector2D(random(50), random(50)));
                $sceneChar.showBlood(1);
                $sceneChar.showName("习近平");
            }
        };
        LinkScene2DManager.prototype.addChuanshongDian = function ($v2d) {
            var $tempChar = new ScenePortal();
            SceneManager.getInstance().addMovieDisplay($tempChar);
            var $p = AstarUtil.getWorldPosByStart2D($v2d);
            $tempChar.setAvatar(670001);
            $tempChar.px = $p.x;
            $tempChar.pz = $p.z;
            return $tempChar;
        };
        return LinkScene2DManager;
    }());
    scene2d.LinkScene2DManager = LinkScene2DManager;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=LinkScene2DManager.js.map