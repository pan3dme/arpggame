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
var scene2d;
(function (scene2d) {
    var Scene2dManager = /** @class */ (function (_super) {
        __extends(Scene2dManager, _super);
        function Scene2dManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene2dManager.prototype.update = function () {
            if (this.test) {
                return;
            }
            Scene_data.context3D.update();
            Scene_data.context3D.setDepthTest(false);
            UIManager.getInstance().upBgGroundZero();
            Scene_data.context3D.setDepthTest(true);
            this.updateMovieFrame();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            if (SceneManager.getInstance().ready) {
                ParticleManager.getInstance().updateTime();
                SkillManager.getInstance().update();
                if (this.render) {
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    Scene_data.context3D.setWriteDepth(true);
                    this.updateMovieDisplay();
                    ShadowManager.getInstance().update();
                    Scene_data.context3D.setWriteDepth(false);
                    ParticleManager.getInstance().update();
                    BloodManager.getInstance().update();
                }
            }
            Scene_data.context3D.setDepthTest(false);
            UIManager.getInstance().update();
        };
        return Scene2dManager;
    }(SceneManager));
    scene2d.Scene2dManager = Scene2dManager;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=Scene2dManager.js.map