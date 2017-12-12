var scene2d;
(function (scene2d) {
    var Engine2d = /** @class */ (function () {
        function Engine2d() {
        }
        Engine2d.init = function () {
            var _this = this;
            Engine2d.htmlScale = 1;
            scene2d.MapConfig.Scale = 2 * Engine2d.htmlScale; //2是最基本的scale
            scene2d.SceneGroundModel.configSize = 256; //设置地面贴图的4*4。尺寸   //256或512
            SceneManager._instance = new scene2d.Scene2dManager();
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -45;
            Scene_data.cam3D.distance = 250;
            this.resetViewMatrx3D();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            scene2d.AppDataArpg.refrishPos(scene2d.AppDataArpg.sceneStagePos);
            Engine.resetViewMatrx3D = function () { _this.resetViewMatrx3D(); };
        };
        Engine2d.resetViewMatrx3D = function () {
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
            Scene_data.viewMatrx3D.appendScale(2 * Engine2d.htmlScale, 2 * Engine2d.htmlScale, 1);
        };
        Engine2d.update = function () {
            Engine.update();
            if (scene2d.AppDataArpg.lockMainChar) {
                scene2d.AppDataArpg.resetSelfPosCenter();
            }
        };
        Engine2d.resetSize = function () {
            Engine.resetSize();
        };
        Engine2d.htmlScale = 1.0;
        return Engine2d;
    }());
    scene2d.Engine2d = Engine2d;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=Engine2d.js.map