var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var program;
    (function (program) {
        var UIMaskShader = (function (_super) {
            __extends(UIMaskShader, _super);
            function UIMaskShader() {
                return _super.call(this) || this;
            }
            UIMaskShader.prototype.binLocation = function ($context) {
                $context.bindAttribLocation(this.program, 0, "v3Pos");
            };
            UIMaskShader.prototype.getVertexShaderString = function () {
                var $str = "attribute vec3 v3Pos;" +
                    "uniform vec4 ui;" +
                    "void main(void)" +
                    "{" +
                    "   vec3 pos = vec3(0.0,0.0,0.0);" +
                    "   pos.xy = v3Pos.xy * ui.zw * 2.0;" +
                    "   pos.x += ui.x * 2.0 - 1.0;" +
                    "   pos.y += -ui.y * 2.0 + 1.0;" +
                    "   vec4 vt0= vec4(pos, 1.0);" +
                    "   gl_Position = vt0;" +
                    "}";
                return $str;
            };
            UIMaskShader.prototype.getFragmentShaderString = function () {
                var $str = " precision mediump float;\n" +
                    "void main(void)\n" +
                    "{\n" +
                    "gl_FragColor = vec4(0.5,0.5,0.5,1.0);\n" +
                    "}";
                return $str;
            };
            return UIMaskShader;
        }(engine.program.Shader3D));
        UIMaskShader.UI_MASK_SHADER = "UImaskShader";
        program.UIMaskShader = UIMaskShader;
    })(program = engine.program || (engine.program = {}));
})(engine || (engine = {}));
//# sourceMappingURL=UIMaskShader.js.map