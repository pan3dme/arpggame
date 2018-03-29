var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var display3D;
    (function (display3D) {
        var Display3dBg = (function (_super) {
            __extends(Display3dBg, _super);
            function Display3dBg() {
                var _this = _super.call(this) || this;
                _this._scaleData = [1, 1];
                _this.shader = ProgrmaManager.getInstance().getProgram(UIImageShader.UI_IMG_SHADER);
                _this.program = _this.shader;
                _this.initData();
                return _this;
            }
            Display3dBg.prototype.initData = function () {
                this.objData = new engine.base.ObjData();
                this.objData.vertices.push(-1, 1, 0.99, 1, 1, 0.99, 1, -1, 0.99, -1, -1, 0.99);
                this.objData.uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
                this.objData.indexs.push(0, 1, 2, 0, 2, 3);
                this.objData.treNum = 6;
                this.objData.vertexBuffer = engine.context.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = engine.context.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = engine.context.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            };
            Display3dBg.prototype.resize = function () {
                this.appleyPos();
            };
            Display3dBg.prototype.setImgInfo = function ($url, $width, $height) {
                this.setImgUrl($url);
                this._width = $width;
                this._height = $height;
            };
            Display3dBg.prototype.setImgUrl = function ($url) {
                //TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($texture: WebGLTexture) => {
                //    this.texture = $texture;
                //});
            };
            Display3dBg.prototype.appleyPos = function () {
                var widthScale = this._width / engine.context.Scene_data.stageWidth;
                var heightScale = this._height / engine.context.Scene_data.stageHeight;
                if (widthScale < heightScale) {
                    this._scaleData[0] = 1;
                    this._scaleData[1] = (this._height / engine.context.Scene_data.stageHeight) / widthScale;
                }
                else {
                    this._scaleData[0] = (this._width / engine.context.Scene_data.stageWidth) / heightScale;
                    this._scaleData[1] = 1;
                }
            };
            Display3dBg.prototype.update = function () {
                this.appleyPos();
                engine.context.Scene_data.context3D.setBlendParticleFactors(0);
                engine.context.Scene_data.context3D.setProgram(this.program);
                engine.context.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                engine.context.Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                engine.context.Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);
                engine.context.Scene_data.context3D.setVcFloat(this.shader, "alpha", [1.0]);
                engine.context.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
                engine.context.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            };
            return Display3dBg;
        }(engine.display3D.Display3D));
        display3D.Display3dBg = Display3dBg;
    })(display3D = engine.display3D || (engine.display3D = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Display3dBg.js.map