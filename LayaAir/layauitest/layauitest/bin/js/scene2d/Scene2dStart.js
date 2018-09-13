var scene2d;
(function (scene2d) {
    var Scene2dStart = (function () {
        function Scene2dStart() {
        }
        Object.defineProperty(Scene2dStart, "sceneStagePos", {
            get: function () {
                if (!this._sceneStagePos) {
                    this._sceneStagePos = new Vector2D();
                }
                return this._sceneStagePos;
            },
            enumerable: true,
            configurable: true
        });
        //以下为2D的换算
        Scene2dStart.math3dto2Darpg = function ($p) {
            var $point = Scene_data.vpMatrix.transformVector($p);
            var fovw = Scene_data.stageWidth / 4;
            var fovh = Scene_data.stageHeight / 4;
            var tx = fovw + $point.x * fovw;
            var ty = fovh - $point.y * fovh;
            return new Vector2D(tx, ty);
        };
        //通过3D坐标计算出2D场景中的坐标
        Scene2dStart.getScene2DBy3Dpostion = function ($v3d) {
            var $v2 = this.math3dto2Darpg($v3d);
            $v2.x -= this.sceneStagePos.x;
            $v2.y -= this.sceneStagePos.y;
            return $v2;
        };
        Scene2dStart.refrishPos = function (vec) {
            Scene2dStart.sceneStagePos.x = vec.x;
            Scene2dStart.sceneStagePos.y = vec.y;
            Scene_data.focus3D.x = -Scene2dStart.sceneStagePos.x / 2;
            Scene_data.focus3D.z = Scene2dStart.sceneStagePos.y / 2 / (Math.sin(45 * Math.PI / 180));
            // SceneGroundModel.getInstance().resetViewMatrx3D();
        };
        Scene2dStart.resetViewMatrx3D = function () {
            if (Scene_data.viewMatrx3D) {
                Scene_data.viewMatrx3D.identity();
            }
            else {
                Scene_data.viewMatrx3D = new Matrix3D;
            }
            var fovw = Scene_data.stageWidth;
            var fovh = Scene_data.stageHeight;
            Scene_data.sceneViewHW = Math.max(fovw, fovh);
            Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            Scene_data.viewMatrx3D.appendScale(2, 2, 1);
        };
        Scene2dStart.prototype.init = function () {
            Engine.init(main.canvas);
            // Engine.init(<HTMLCanvasElement>document.getElementById('layaCanvas'));
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -45;
            Scene_data.cam3D.distance = 250;
            this.addGridLineSprite();
            this.makesceneChar();
            Scene2dStart.resetViewMatrx3D();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Scene2dStart.refrishPos(Scene2dStart.sceneStagePos);
            Engine.resetViewMatrx3D = function () { Scene2dStart.resetViewMatrx3D(); };
        };
        //播放技能  $fileName技能文件名， $effectName特效名字
        Scene2dStart.prototype.playSkillByChar = function ($sc, $fileName, $effectName) {
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
        Scene2dStart.prototype.makeSceneCharById = function ($id, $v2d) {
            var $tempChar = new scene2d.SceneChar();
            $tempChar.setRoleUrl(getRoleUrl($id));
            SceneManager.getInstance().addMovieDisplay($tempChar);
            $tempChar.px = 50;
            $tempChar.pz = 50;
            return $tempChar;
        };
        Scene2dStart.prototype.makesceneChar = function () {
            this.lockChar = this.makeSceneCharById("123456", new Vector2D(32, 25));
            Laya.timer.loop(1000, this, this.playSkillByChar, [this.lockChar]);
        };
        Scene2dStart.prototype.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            var $GridLineSprite = new GridLineSprite();
            $GridLineSprite.y = 0;
            SceneManager.getInstance().addDisplay($GridLineSprite);
            SceneManager.getInstance().ready = true;
        };
        Scene2dStart.prototype.update = function () {
            Engine.update();
            if (this.lockChar) {
                var $v2 = Scene2dStart.getScene2DBy3Dpostion(new Vector3D(this.lockChar.x, 0, this.lockChar.z));
                var $tw = Scene_data.stageWidth / 4;
                var $th = Scene_data.stageHeight / 4;
                var vec = new Vector2D($tw - $v2.x, $th - $v2.y);
                Scene2dStart.refrishPos(vec);
            }
        };
        Scene2dStart.prototype.resetSize = function (width, height) {
            Engine.resetSize(width, height);
            // FpsStage.getInstance().resetSize();
        };
        return Scene2dStart;
    }());
    scene2d.Scene2dStart = Scene2dStart;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=Scene2dStart.js.map