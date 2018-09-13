var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var locusball;
        (function (locusball) {
            var Display3DLocusBallPartilce = (function (_super) {
                __extends(Display3DLocusBallPartilce, _super);
                //protected _posAry: Array<number>;
                //protected _angleAry: Array<number>;
                //protected _tangentAry: Array<number>;
                //protected _tangentSpeed:number;
                function Display3DLocusBallPartilce() {
                    return _super.call(this) || this;
                }
                Display3DLocusBallPartilce.prototype.creatData = function () {
                    this.data = new locusball.ParticleLocusballData;
                };
                return Display3DLocusBallPartilce;
            }(engine.particle.ball.Display3DBallPartilce));
            locusball.Display3DLocusBallPartilce = Display3DLocusBallPartilce;
        })(locusball = particle.locusball || (particle.locusball = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Display3DLocusBallPartilce.js.map