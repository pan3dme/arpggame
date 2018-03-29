var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var base;
    (function (base) {
        var MeshData = (function (_super) {
            __extends(MeshData, _super);
            function MeshData() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.boneIDAry = new Array;
                _this.boneWeightAry = new Array;
                _this.boneNewIDAry = new Array;
                _this.particleAry = new Array;
                return _this;
            }
            MeshData.prototype.destory = function () {
                _super.prototype.destory.call(this);
                if (this.materialParam) {
                    this.materialParam.destory();
                    this.materialParam = null;
                    this.materialParamData = null;
                }
                this.boneIDAry.length = 0;
                this.boneWeightAry.length = 0;
                this.boneNewIDAry.length = 0;
                this.boneIDAry = null;
                this.boneWeightAry = null;
                this.boneNewIDAry = null;
                if (this.boneWeightBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.boneWeightBuffer);
                    this.boneWeightBuffer = null;
                }
                if (this.boneIdBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.boneIdBuffer);
                    this.boneIdBuffer = null;
                }
                if (this.material) {
                    this.material.clearUseNum();
                }
                this.particleAry.length = 0;
                this.particleAry = null;
                //for (){
                //}
            };
            return MeshData;
        }(engine.base.ObjData));
        base.MeshData = MeshData;
        var BindParticle = (function () {
            //public particle: CombineParticle;
            function BindParticle($url, $socketName) {
                this.url = $url;
                this.socketName = $socketName;
            }
            return BindParticle;
        }());
        base.BindParticle = BindParticle;
    })(base = engine.base || (engine.base = {}));
})(engine || (engine = {}));
//# sourceMappingURL=MeshData.js.map