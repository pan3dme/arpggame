var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var scene;
    (function (scene) {
        var grldLevel;
        (function (grldLevel) {
            var LineDisplayShader = (function (_super) {
                __extends(LineDisplayShader, _super);
                function LineDisplayShader() {
                    return _super.call(this) || this;
                }
                LineDisplayShader.prototype.binLocation = function ($context) {
                    $context.bindAttribLocation(this.program, 0, "v3Position");
                    $context.bindAttribLocation(this.program, 1, "v3Color");
                };
                LineDisplayShader.prototype.getVertexShaderString = function () {
                    var $str = "attribute vec3 v3Position;" +
                        "attribute vec3 v3Color;" +
                        "uniform mat4 viewMatrix3D;" +
                        "uniform mat4 camMatrix3D;" +
                        "uniform mat4 posMatrix3D;" +
                        "varying vec4 colorData;" +
                        "void main(void)" +
                        "{" +
                        "   vec4 vt0= vec4(v3Position, 1.0);" +
                        "   colorData =vec4(v3Color,1) ;" +
                        "   vt0 = posMatrix3D * vt0;" +
                        "   vt0 = camMatrix3D * vt0;" +
                        "   vt0 = viewMatrix3D * vt0;" +
                        "   gl_Position = vt0;" +
                        "}";
                    return $str;
                };
                LineDisplayShader.prototype.getFragmentShaderString = function () {
                    var $str = " precision mediump float;\n" +
                        "varying vec4 colorData;\n" +
                        "void main(void)\n" +
                        "{\n" +
                        "gl_FragColor =colorData;\n" +
                        "}";
                    return $str;
                };
                return LineDisplayShader;
            }(engine.program.Shader3D));
            LineDisplayShader.LineShader = "LineShader";
            grldLevel.LineDisplayShader = LineDisplayShader;
        })(grldLevel = scene.grldLevel || (scene.grldLevel = {}));
    })(scene = engine.scene || (engine.scene = {}));
})(engine || (engine = {}));
//# sourceMappingURL=LineDisplayShader.js.map