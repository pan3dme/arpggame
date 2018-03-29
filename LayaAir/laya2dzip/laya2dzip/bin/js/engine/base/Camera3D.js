var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var base;
    (function (base) {
        var Camera3D = (function (_super) {
            __extends(Camera3D, _super);
            function Camera3D() {
                var _this = _super.call(this) || this;
                _this._distance = 500;
                _this.offset = new engine.math.Vector3D();
                _this.lastFoucs3D = new engine.math.Vector3D;
                _this.needChange = true;
                _this.cameraMatrix = new engine.math.Matrix3D;
                return _this;
            }
            Object.defineProperty(Camera3D.prototype, "distance", {
                get: function () {
                    return this._distance;
                },
                set: function (value) {
                    this._distance = value;
                },
                enumerable: true,
                configurable: true
            });
            Camera3D.prototype.lookAt = function ($target) {
                this.lookAtTarget = $target;
            };
            Object.defineProperty(Camera3D.prototype, "astarRect", {
                set: function (value) {
                    this._astarRect = new Rectangle();
                    this._astarRect.x = value.x;
                    this._astarRect.y = value.y;
                    this._astarRect.width = value.width;
                    this._astarRect.height = value.height;
                    this._midPos = new Vector3D();
                    this._midPos.x = this._astarRect.x + this._astarRect.width / 2;
                    this._midPos.z = this._astarRect.y + this._astarRect.height / 2;
                    this._scaleVec = new Vector3D();
                    this._scaleVec.x = (this._astarRect.width - 100) / this._astarRect.width;
                    this._scaleVec.z = (this._astarRect.height - 100) / this._astarRect.height;
                },
                enumerable: true,
                configurable: true
            });
            Camera3D.prototype.update = function () {
                if (this.lookAtTarget) {
                    var ty = 28;
                    if (this._astarRect && this._astarRect.width < 600) {
                        var $toPos = new engine.math.Vector3D;
                        $toPos.x = ((this.lookAtTarget.px - this._midPos.x) * this._scaleVec.x) + this._midPos.x;
                        $toPos.z = ((this.lookAtTarget.pz - this._midPos.z) * this._scaleVec.z) + this._midPos.z;
                        $toPos.y = this.lookAtTarget.py;
                        engine.context.Scene_data.focus3D.x = $toPos.x;
                        engine.context.Scene_data.focus3D.y = $toPos.y + ty;
                        engine.context.Scene_data.focus3D.z = $toPos.z;
                    }
                    else {
                        engine.context.Scene_data.focus3D.x = this.lookAtTarget.px;
                        engine.context.Scene_data.focus3D.y = this.lookAtTarget.py + ty;
                        engine.context.Scene_data.focus3D.z = this.lookAtTarget.pz;
                    }
                    if (this.lastFoucs3D.x != engine.context.Scene_data.focus3D.x || this.lastFoucs3D.y != engine.context.Scene_data.focus3D.y || this.lastFoucs3D.z != engine.context.Scene_data.focus3D.z) {
                        this.lastFoucs3D.x = engine.context.Scene_data.focus3D.x;
                        this.lastFoucs3D.y = engine.context.Scene_data.focus3D.y;
                        this.lastFoucs3D.z = engine.context.Scene_data.focus3D.z;
                        this.needChange = true;
                    }
                    else {
                        this.needChange = false;
                    }
                }
            };
            Object.defineProperty(Camera3D.prototype, "postion", {
                get: function () {
                    return new engine.math.Vector3D(this.x, this.y, this.z);
                },
                enumerable: true,
                configurable: true
            });
            return Camera3D;
        }(engine.base.Object3D));
        base.Camera3D = Camera3D;
    })(base = engine.base || (engine.base = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Camera3D.js.map