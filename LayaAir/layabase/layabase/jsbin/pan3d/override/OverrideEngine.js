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
var pan3d;
(function (pan3d) {
    var OverrideEngine = /** @class */ (function (_super) {
        __extends(OverrideEngine, _super);
        function OverrideEngine() {
            return _super.call(this) || this;
        }
        OverrideEngine.initConfig = function () {
            var _this = this;
            Engine.update = function () { _this.update(); }; //更换update
            Engine.init = function ($caves) { _this.init($caves); }; //更换引擎初始化
            Engine.resetSize = function (width, height) { _this.resetSize(width, height); }; //更尺寸变化
        };
        OverrideEngine.update = function () {
            TimeUtil.update();
            SceneManager.getInstance().update();
        };
        OverrideEngine.resetSize = function (width, height) {
            Scene_data.stageWidth = width;
            Scene_data.stageHeight = height;
            Scene_data.canvas3D.width = Scene_data.stageWidth;
            Scene_data.canvas3D.height = Scene_data.stageHeight;
            Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);
            UIManager.getInstance().resize();
            BloodManager.getInstance().resize();
            Engine.resetViewMatrx3D();
        };
        OverrideEngine.init = function ($caves) {
            var isIpad = /ipad/i.test(navigator.userAgent);
            var isIphone = /iPhone/i.test(navigator.userAgent);
            var isAndroid = /android/i.test(navigator.userAgent);
            var isWindow = /iindow/i.test(navigator.userAgent);
            var sUserAgent = navigator.userAgent.toLowerCase();
            ////console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
            if (isIpad || isIphone || isAndroid) {
                Scene_data.isPc = false;
            }
            else {
                Scene_data.isPc = true;
            }
            Scene_data.vpMatrix = new Matrix3D;
            Scene_data.canvas3D = $caves;
            Scene_data.context3D = new Context3D();
            Scene_data.context3D.init($caves);
            UIManager.getInstance().init();
            Scene_data.cam3D = new Camera3D;
            Scene_data.focus3D = new Object3D;
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationY = 135;
            Scene_data.focus3D.rotationX = -45;
            Scene_data.light = new LightVo();
            TimeUtil.init();
            Scene_data.supportBlob = true;
        };
        return OverrideEngine;
    }(Engine));
    pan3d.OverrideEngine = OverrideEngine;
})(pan3d || (pan3d = {}));
//# sourceMappingURL=OverrideEngine.js.map