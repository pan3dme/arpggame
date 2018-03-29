var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var utils;
    (function (utils) {
        var res;
        (function (res) {
            var ModelRes = (function (_super) {
                __extends(ModelRes, _super);
                function ModelRes() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ModelRes.prototype.load = function (url, $fun) {
                    var _this = this;
                    this._fun = $fun;
                    utils.LoadManager.getInstance().load(url, utils.LoadManager.BYTE_TYPE, function ($byte) {
                        _this.loadComplete($byte);
                    });
                };
                ModelRes.prototype.loadComplete = function ($byte) {
                    var _this = this;
                    this._byte = new ByteArray($byte);
                    this._byte.position = 0;
                    this.read(function () { _this.readNexte(); }); //img
                };
                ModelRes.prototype.readNexte = function () {
                    this.read(); //obj
                    this.read(); //material
                    this.objUrl = this._byte.readUTF();
                    this.materialUrl = this._byte.readUTF();
                    if (this._byte.readBoolean()) {
                        this.light = new LightVo();
                        this.light.ambientColor[0] = this._byte.readFloat();
                        this.light.ambientColor[1] = this._byte.readFloat();
                        this.light.ambientColor[2] = this._byte.readFloat();
                        this.light.sunColor[0] = this._byte.readFloat();
                        this.light.sunColor[1] = this._byte.readFloat();
                        this.light.sunColor[2] = this._byte.readFloat();
                        this.light.sunDirect[0] = this._byte.readFloat();
                        this.light.sunDirect[1] = this._byte.readFloat();
                        this.light.sunDirect[2] = this._byte.readFloat();
                    }
                    this._fun();
                };
                return ModelRes;
            }(engine.utils.res.BaseRes));
            res.ModelRes = ModelRes;
        })(res = utils.res || (utils.res = {}));
    })(utils = engine.utils || (engine.utils = {}));
})(engine || (engine = {}));
//# sourceMappingURL=ModelRes.js.map