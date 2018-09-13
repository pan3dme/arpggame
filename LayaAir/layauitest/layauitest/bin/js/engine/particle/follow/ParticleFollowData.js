var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var follow;
        (function (follow) {
            var ParticleFollowData = (function (_super) {
                __extends(ParticleFollowData, _super);
                function ParticleFollowData() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ParticleFollowData.prototype.getParticle = function () {
                    return new follow.Display3DFollowPartilce;
                };
                ParticleFollowData.prototype.setAllByteInfo = function ($byte) {
                    _super.prototype.setAllByteInfo.call(this, $byte);
                    //this.initBingMatrixAry();
                    this.uploadGpu();
                };
                ParticleFollowData.prototype.regShader = function () {
                    if (!this.materialParam) {
                        return;
                    }
                    var shaderParameAry = this.getShaderParam();
                    //var shader: Display3DFollowShader = new Display3DFollowShader()
                    this.materialParam.shader = ProgrmaManager.getInstance().getMaterialProgram(follow.Display3DFollowShader.Display3D_Follow_Shader, follow.Display3DFollowShader, this.materialParam.material, shaderParameAry);
                    this.materialParam.program = this.materialParam.shader.program;
                };
                return ParticleFollowData;
            }(engine.particle.ball.ParticleBallData));
            follow.ParticleFollowData = ParticleFollowData;
        })(follow = particle.follow || (particle.follow = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=ParticleFollowData.js.map