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
            var Display3dModelAnimParticle = (function (_super) {
                __extends(Display3dModelAnimParticle, _super);
                function Display3dModelAnimParticle() {
                    return _super.call(this) || this;
                }
                Display3dModelAnimParticle.prototype.updateUV = function () {
                    var currentFrame = this._time / Scene_data.frameTime;
                    currentFrame = currentFrame > this.modeldata._maxAnimTime ? this.modeldata._maxAnimTime : currentFrame;
                    currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);
                    this._resultUvVec[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Scene_data.frameTime * this.data._uSpeed;
                    this._resultUvVec[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Scene_data.frameTime * this.data._vSpeed;
                };
                return Display3dModelAnimParticle;
            }(engine.particle.model.Display3DModelPartilce));
            model.Display3dModelAnimParticle = Display3dModelAnimParticle;
        })(model = particle.model || (particle.model = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Display3dModelAnimParticle.js.map