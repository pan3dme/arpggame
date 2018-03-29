var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
自定义着色器
*/
var myShader = /** @class */ (function (_super) {
    __extends(myShader, _super);
    function myShader() {
        var _this = this;
        //顶点着色器程序和片元着色器程序。
        var vs = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1.0);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}";
        var ps = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = vec4(0.0,0.0,0.0,0.0);}";
        _this = _super.call(this, vs, ps, "myShader") || this;
        return _this;
    }
    /**
     *当前着色器的一个实例对象
     */
    myShader.shader = new myShader();
    return myShader;
}(Laya.Shader));
var myShaderValue = /** @class */ (function (_super) {
    __extends(myShaderValue, _super);
    function myShaderValue() {
        var _this = _super.call(this, 0, 0) || this;
        var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        return _this;
    }
    return myShaderValue;
}(Laya.Value2D));
/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
var myShaderSprite = /** @class */ (function (_super) {
    __extends(myShaderSprite, _super);
    function myShaderSprite() {
        var _this = _super.call(this) || this;
        _this.iNum = 0;
        return _this;
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    myShaderSprite.prototype.init = function (texture, vb, ib) {
        if (vb === void 0) { vb = null; }
        if (ib === void 0) { ib = null; }
        this.vBuffer = Laya.VertexBuffer2D.create();
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        var vbArray;
        var ibArray;
        if (vb) {
            vbArray = vb;
        }
        else {
            vbArray = [];
            var texWidth = texture.width;
            var texHeight = texture.height;
            //定义颜色值，取值范围0~1浮点
            var red = 1;
            var greed = 1;
            var blue = 1;
            var alpha = 1;
            //在顶点数组中放入4个顶点
            //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
            vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
            vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
        }
        if (ib) {
            ibArray = ib;
        }
        else {
            ibArray = [];
            //在顶点索引数组中放入组成三角形的顶点索引
            //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
            ibArray.push(0, 1, 3); //从第一个三角形的顶点索引
            //ibArray.push(3,1,2);第二个三角形的顶点索引
        }
        this.iNum = ibArray.length;
        this.vbData = new Float32Array(vbArray);
        this.ibData = new Uint16Array(ibArray);
        this.vBuffer.append(this.vbData);
        this.iBuffer.append(this.ibData);
        this.shaderValue = new myShaderValue();
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式
    };
    //重写渲染函数
    myShaderSprite.prototype.customRender = function (context, x, y) {
        context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, myShader.shader, this.shaderValue, 0, 0);
        var $temp = true;
        if ($temp) {
            if (pan2d.Scene2dInit.isConfig) {
                Engine.update();
            }
            else {
                pan2d.Scene2dInit.initData();
            }
        }
        else {
            if (pan3d.Scene3dInit.isConfig) {
                Engine.update();
            }
            else {
                pan3d.Scene3dInit.initData();
            }
        }
    };
    return myShaderSprite;
}(Laya.Sprite));
//# sourceMappingURL=myShaderSprite.js.map