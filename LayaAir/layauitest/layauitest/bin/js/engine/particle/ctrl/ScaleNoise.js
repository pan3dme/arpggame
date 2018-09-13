var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var ctrl;
        (function (ctrl) {
            var ScaleNoise = (function (_super) {
                __extends(ScaleNoise, _super);
                function ScaleNoise() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ScaleNoise.prototype.coreCalculate = function () {
                    this.num = this.amplitude + this.amplitude * Math.sin(this.speed * this.time);
                };
                Object.defineProperty(ScaleNoise.prototype, "data", {
                    set: function (value) {
                        this.beginTime = Number(value[0].value);
                        if (Number(value[1].value) == -1) {
                            this.lastTime = Scene_data.MAX_NUMBER;
                        }
                        else {
                            this.lastTime = Number(value[1].value);
                        }
                        this.amplitude = Number(value[2].value);
                        this.speed = Number(value[3].value) * 0.01;
                    },
                    enumerable: true,
                    configurable: true
                });
                ScaleNoise.prototype.dataByte = function (va, arr) {
                    this.beginTime = arr[0];
                    if (arr[1] == -1) {
                        this.lastTime = Scene_data.MAX_NUMBER;
                    }
                    else {
                        this.lastTime = arr[1];
                    }
                    this.amplitude = arr[2];
                    this.speed = arr[3] * 0.01;
                };
                ScaleNoise.prototype.getAllNum = function (allTime) {
                    this.baseNum = this.amplitude + this.amplitude * Math.sin(this.speed * allTime);
                };
                return ScaleNoise;
            }(engine.particle.ctrl.BaseAnim));
            ctrl.ScaleNoise = ScaleNoise;
        })(ctrl = particle.ctrl || (particle.ctrl = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=ScaleNoise.js.map