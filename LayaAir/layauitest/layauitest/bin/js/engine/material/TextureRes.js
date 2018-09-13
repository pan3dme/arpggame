var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var material;
    (function (material) {
        var TextureRes = (function (_super) {
            __extends(TextureRes, _super);
            function TextureRes() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TextureRes.prototype.destory = function () {
                Scene_data.context3D.deleteTexture(this.texture);
            };
            return TextureRes;
        }(engine.base.ResCount));
        material.TextureRes = TextureRes;
    })(material = engine.material || (engine.material = {}));
})(engine || (engine = {}));
//# sourceMappingURL=TextureRes.js.map