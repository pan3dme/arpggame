var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var ParticleGpuData = (function (_super) {
            __extends(ParticleGpuData, _super);
            function ParticleGpuData() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ParticleGpuData;
        }(engine.base.ObjData));
        particle.ParticleGpuData = ParticleGpuData;
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=ParticleGpuData.js.map