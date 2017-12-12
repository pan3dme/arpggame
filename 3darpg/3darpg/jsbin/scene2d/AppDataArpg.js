var scene2d;
(function (scene2d) {
    var AppDataArpg = /** @class */ (function () {
        function AppDataArpg() {
        }
        //以下为2D的换算
        AppDataArpg.math3dto2Darpg = function ($p) {
            var $point = Scene_data.vpMatrix.transformVector($p);
            var fovw = Scene_data.stageWidth / 4 / scene2d.Engine2d.htmlScale;
            var fovh = Scene_data.stageHeight / 4 / scene2d.Engine2d.htmlScale;
            var tx = fovw + $point.x * fovw;
            var ty = fovh - $point.y * fovh;
            return new Vector2D(tx, ty);
        };
        //通过3D坐标计算出2D场景中的坐标
        AppDataArpg.getScene2DBy3Dpostion = function ($v3d) {
            var $v2 = this.math3dto2Darpg($v3d);
            $v2.x -= AppDataArpg.sceneStagePos.x;
            $v2.y -= AppDataArpg.sceneStagePos.y;
            return $v2;
        };
        AppDataArpg.math2Dto3DGroundarpg = function ($p) {
            this._vpMatrixInver = Scene_data.vpMatrix.clone();
            this._vpMatrixInver.invert();
            var $k0 = this.math2dto3Darpg($p, 100);
            var $k1 = this.math2dto3Darpg($p, 200);
            if (!this.triItem) {
                this.triItem = new Array;
                this.triItem.push(new Vector3D(0, 0, 0));
                this.triItem.push(new Vector3D(-100, 0, 100));
                this.triItem.push(new Vector3D(+100, 0, 100));
            }
            return MathUtil.getLinePlaneInterectPointByTri($k0, $k1, this.triItem);
        };
        AppDataArpg.math2dto3Darpg = function ($p, $deph) {
            if ($deph === void 0) { $deph = 100; }
            var fovw = Scene_data.stageWidth / 4;
            var fovh = Scene_data.stageHeight / 4;
            var tx = $p.x;
            var ty = $p.y;
            var $point = new Vector3D();
            $point.y = (fovh - ty) / fovh;
            $point.x = (tx - fovw) / fovw;
            $point.z = $deph;
            //$point = this._viewMatrixInver.transformVector($point);
            //$point = this._camMatrixInver.transformVector($point);
            $point = this._vpMatrixInver.transformVector($point);
            return $point;
        };
        AppDataArpg.refrishPos = function ($vec) {
            AppDataArpg.sceneStagePos.x = $vec.x;
            AppDataArpg.sceneStagePos.y = $vec.y;
            Scene_data.focus3D.x = -AppDataArpg.sceneStagePos.x / 2;
            Scene_data.focus3D.z = AppDataArpg.sceneStagePos.y / 2 / (Math.sin(45 * Math.PI / 180));
            scene2d.SceneGroundModel.getInstance().resetViewMatrx3D();
        };
        AppDataArpg.resetSelfPosCenter = function () {
            if (GameInstance.mainChar) {
                var $v2 = this.getScene2DBy3Dpostion(new Vector3D(GameInstance.mainChar.x, 0, GameInstance.mainChar.z));
                var $tw = Scene_data.stageWidth / 4 / scene2d.Engine2d.htmlScale;
                var $th = Scene_data.stageHeight / 4 / scene2d.Engine2d.htmlScale;
                var $tox = new Vector2D($tw - $v2.x, $th - $v2.y);
                this.refrishPos($tox);
            }
        };
        AppDataArpg.sceneStagePos = new Vector2D;
        AppDataArpg.lockMainChar = true;
        return AppDataArpg;
    }());
    scene2d.AppDataArpg = AppDataArpg;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=AppDataArpg.js.map