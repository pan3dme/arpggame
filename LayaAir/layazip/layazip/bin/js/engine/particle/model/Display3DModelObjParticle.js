var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var model;
        (function (model) {
            var Display3DModelObjParticle = (function (_super) {
                __extends(Display3DModelObjParticle, _super);
                function Display3DModelObjParticle() {
                    return _super.call(this) || this;
                }
                Display3DModelObjParticle.prototype.update = function () {
                    if (this._depthMode) {
                        Scene_data.context3D.setDepthTest(true);
                    }
                    _super.prototype.update.call(this);
                    if (this._depthMode) {
                        Scene_data.context3D.setDepthTest(false);
                    }
                };
                return Display3DModelObjParticle;
            }(engine.particle.model.Display3DModelPartilce));
            model.Display3DModelObjParticle = Display3DModelObjParticle;
        })(model = particle.model || (particle.model = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Display3DModelObjParticle.js.map