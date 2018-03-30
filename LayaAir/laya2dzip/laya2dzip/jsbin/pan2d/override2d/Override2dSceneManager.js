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
    var Override2dSceneManager = /** @class */ (function (_super) {
        __extends(Override2dSceneManager, _super);
        function Override2dSceneManager() {
            return _super.call(this) || this;
        }
        Override2dSceneManager.initConfig = function () {
            SceneManager._instance = new Override2dSceneManager;
        };
        Override2dSceneManager.prototype.update = function () {
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer();
            }
            pan2d.GroundModel.getInstance().update();
            this.updateMovieFrame();
            if (this._ready) {
                ParticleManager.getInstance().updateTime();
                SkillManager.getInstance().update();
                if (this.render) {
                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    Scene_data.context3D.setWriteDepth(false);
                    ParticleManager.getInstance().update();
                    BloodManager.getInstance().update();
                    Scene_data.context3D.setBlendParticleFactors(0);
                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setWriteDepth(false);
                }
            }
        };
        return Override2dSceneManager;
    }(pan3d.OverrideSceneManager));
    pan2d.Override2dSceneManager = Override2dSceneManager;
})(pan2d || (pan2d = {}));
//# sourceMappingURL=Override2dSceneManager.js.map