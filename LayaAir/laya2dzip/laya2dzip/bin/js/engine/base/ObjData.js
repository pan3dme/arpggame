var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var base;
    (function (base) {
        var ObjData = (function (_super) {
            __extends(ObjData, _super);
            function ObjData() {
                var _this = _super.call(this) || this;
                _this.vertices = new Array;
                _this.uvs = new Array;
                _this.indexs = new Array;
                _this.lightuvs = new Array;
                _this.normals = new Array;
                _this.tangents = new Array;
                _this.bitangents = new Array;
                //public collision: CollisionItemVo;
                _this.treNum = 0;
                /**顶点 uv lightuv normal 合成一个 va */
                _this.compressBuffer = false;
                _this.hasdispose = false;
                return _this;
            }
            ObjData.prototype.destory = function () {
                this.vertices.length = 0;
                this.vertices = null;
                this.uvs.length = 0;
                this.uvs = null;
                this.indexs.length = 0;
                this.indexs = null;
                this.lightuvs.length = 0;
                this.lightuvs = null;
                this.normals.length = 0;
                this.normals = null;
                this.tangents.length = 0;
                this.tangents = null;
                this.bitangents.length = 0;
                this.bitangents = null;
                if (this.vertexBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.vertexBuffer);
                    this.vertexBuffer = null;
                }
                if (this.uvBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.uvBuffer);
                    this.uvBuffer = null;
                }
                if (this.indexBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.indexBuffer);
                    this.indexBuffer = null;
                }
                if (this.lightUvBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.lightUvBuffer);
                    this.lightUvBuffer = null;
                }
                if (this.normalsBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.normalsBuffer);
                    this.normalsBuffer = null;
                }
                if (this.tangentBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.tangentBuffer);
                    this.tangentBuffer = null;
                }
                if (this.bitangentBuffer) {
                    engine.context.Scene_data.context3D.deleteBuffer(this.bitangentBuffer);
                    this.bitangentBuffer = null;
                }
                this.hasdispose = true;
            };
            return ObjData;
        }(engine.base.ResCount));
        base.ObjData = ObjData;
    })(base = engine.base || (engine.base = {}));
})(engine || (engine = {}));
//# sourceMappingURL=ObjData.js.map