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
            var RoleRes = (function (_super) {
                __extends(RoleRes, _super);
                function RoleRes() {
                    var _this = _super.call(this) || this;
                    _this.meshBatchNum = 1;
                    return _this;
                }
                RoleRes.prototype.load = function (url, $fun) {
                    var _this = this;
                    this._fun = $fun;
                    utils.LoadManager.getInstance().load(url, utils.LoadManager.BYTE_TYPE, function ($byte) {
                        _this.loadComplete($byte);
                    });
                };
                RoleRes.prototype.loadComplete = function ($byte) {
                    this._byte = new ByteArray($byte);
                    this._byte.position = 0;
                    this.version = this._byte.readInt();
                    this.readMesh();
                };
                RoleRes.prototype.readMesh = function () {
                    this.roleUrl = this._byte.readUTF();
                    if (this.version >= 16) {
                        this.ambientLightColor = new Vector3D;
                        this.sunLigthColor = new Vector3D;
                        this.nrmDircet = new Vector3D;
                        this.ambientLightColor.x = this._byte.readFloat();
                        this.ambientLightColor.y = this._byte.readFloat();
                        this.ambientLightColor.z = this._byte.readFloat();
                        this.ambientLightIntensity = this._byte.readFloat();
                        this.ambientLightColor.scaleBy(this.ambientLightIntensity);
                        this.sunLigthColor.x = this._byte.readFloat();
                        this.sunLigthColor.y = this._byte.readFloat();
                        this.sunLigthColor.z = this._byte.readFloat();
                        this.sunLigthIntensity = this._byte.readFloat();
                        this.sunLigthColor.scaleBy(this.sunLigthIntensity);
                        this.nrmDircet.x = this._byte.readFloat();
                        this.nrmDircet.y = this._byte.readFloat();
                        this.nrmDircet.z = this._byte.readFloat();
                    }
                    utils.MeshDataManager.getInstance().readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);
                    this.readAction();
                };
                RoleRes.prototype.readAction = function () {
                    var _this = this;
                    var $actionByte;
                    if (this.version >= 30) {
                        $actionByte = getZipByte(this._byte);
                    }
                    else {
                        $actionByte = this._byte;
                    }
                    this.actionAry = new Array;
                    var actionNum = $actionByte.readInt();
                    for (var i = 0; i < actionNum; i++) {
                        var actionName = $actionByte.readUTF();
                        utils.AnimManager.getInstance().readData($actionByte, this.roleUrl + actionName);
                        this.actionAry.push(actionName);
                    }
                    this.read(function () { _this.readNext(); }); //readimg 
                };
                RoleRes.prototype.readNext = function () {
                    this.read(); //readmaterial
                    this.read(); //readparticle;
                    this._fun();
                };
                return RoleRes;
            }(engine.utils.res.BaseRes));
            res.RoleRes = RoleRes;
        })(res = utils.res || (utils.res = {}));
    })(utils = engine.utils || (engine.utils = {}));
})(engine || (engine = {}));
//# sourceMappingURL=RoleRes.js.map