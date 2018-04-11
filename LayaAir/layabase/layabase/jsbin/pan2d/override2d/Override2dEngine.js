var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pan2d;
(function (pan2d) {
    var Override2dEngine = /** @class */ (function (_super) {
        __extends(Override2dEngine, _super);
        function Override2dEngine() {
            return _super.call(this) || this;
        }
        Override2dEngine.initConfig = function () {
            var _this = this;
            Engine.update = function () { _this.update(); }; //更换update
            Engine.init = function ($caves) { _this.init($caves); }; //更换引擎初始化
            Engine.resetSize = function (width, height) { _this.resetSize(width, height); }; //更尺寸变化
            Engine.resetViewMatrx3D = function () { _this.resetViewMatrx3D(); };
        };
        Override2dEngine.resetSize = function (width, height) {
            if (isNaN(width)) {
                width = document.body.clientWidth;
            }
            if (isNaN(height)) {
                height = document.body.clientHeight;
            }
            Scene_data.stageWidth = width;
            Scene_data.stageHeight = height;
            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);
            UIManager.getInstance().resize();
            BloodManager.getInstance().resize();
            Engine.resetViewMatrx3D();
            pan2d.CanvasPostionModel.getInstance().resetSize();
        };
        Override2dEngine.init = function ($caves) {
            pan3d.OverrideEngine.init($caves);
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -45;
            Scene_data.cam3D.distance = 250;
        };
        Override2dEngine.resetViewMatrx3D = function () {
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
            Scene_data.viewMatrx3D.appendScale(2 * this.htmlScale, 2 * this.htmlScale, 1);
        };
        Override2dEngine.htmlScale = 0.5;
        return Override2dEngine;
    }(pan3d.OverrideEngine));
    pan2d.Override2dEngine = Override2dEngine;
})(pan2d || (pan2d = {}));
//# sourceMappingURL=Override2dEngine.js.map