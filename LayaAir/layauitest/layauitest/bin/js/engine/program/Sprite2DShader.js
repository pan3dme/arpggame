var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var program;
    (function (program) {
        var Sprite2DShader = (function (_super) {
            __extends(Sprite2DShader, _super);
            function Sprite2DShader() {
                return _super.call(this) || this;
            }
            Sprite2DShader.prototype.binLocation = function ($context) {
                $context.bindAttribLocation(this.program, 0, "v3Pos");
                $context.bindAttribLocation(this.program, 1, "v2uv");
            };
            Sprite2DShader.prototype.getVertexShaderString = function () {
                var $str = "attribute vec3 v3Pos;" +
                    "attribute vec3 v2uv;" +
                    "uniform mat4 viewMatrix3D;\n" +
                    "uniform mat4 camMatrix3D;\n" +
                    "uniform mat4 watchCamMatrix3D;\n" +
                    "uniform vec4 posdata[12];" +
                    "varying vec2 v_texCoord;" +
                    "void main(void)" +
                    "{" +
                    "   vec4 data = posdata[int(v2uv.z)];" +
                    "   vec4 vt0= vec4(v3Pos * data.w,1.0);" +
                    "   vt0= watchCamMatrix3D * vt0;" +
                    "   vt0.xyz += data.xyz;" +
                    "   v_texCoord = vec2(v2uv.x,v2uv.y);" +
                    "   gl_Position = viewMatrix3D * camMatrix3D * vt0;" +
                    "}";
                return $str;
            };
            Sprite2DShader.prototype.getFragmentShaderString = function () {
                var $str = " precision mediump float;\n" +
                    "uniform sampler2D s_texture;\n" +
                    "varying vec2 v_texCoord;\n" +
                    "void main(void)\n" +
                    "{\n" +
                    "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                    "infoUv.xyz *= infoUv.w;\n" +
                    "if(infoUv.w < 0.1){discard;}\n" +
                    "gl_FragColor = infoUv;\n" +
                    "}";
                return $str;
            };
            return Sprite2DShader;
        }(engine.program.Shader3D));
        Sprite2DShader.SPRITE2D_SHADER = "Sprite2DShader";
        program.Sprite2DShader = Sprite2DShader;
    })(program = engine.program || (engine.program = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Sprite2DShader.js.map