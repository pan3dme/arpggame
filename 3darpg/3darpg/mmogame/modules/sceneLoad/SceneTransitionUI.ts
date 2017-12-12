class SceneTransitionUI extends UIConatiner {

    private _baImg: SceneTransitionImg;

    public constructor() {
        super();

        this.width = 400;
        this.height = 80;
        this.center = 0;
        this.bottom = 50;

        this._baImg = new SceneTransitionImg();
        this.addRender(this._baImg);
        this._baImg.setImgInfo("ui/load/transition.jpg", 1024, 512);
        this._baImg.sortnum = -1;
    }

    public show(): void {
        UIManager.getInstance().addUIContainer(this);
        this._baImg.alpha = 0;
        TweenLite.to(this._baImg, 0.5, { alpha: 1 });

    }

    public hide():void{
        TweenLite.to(this._baImg, 0.5, { alpha: 0 });
    }

    public resize(): void {
        super.resize();
        this._baImg.resize();
    }


}

class SceneTransitionImg extends UIRenderComponent {
    public constructor() {
        super();
    }
    private _width: number;
    private _height: number;
    private _wScale: number;
    private _hScale: number;
    private _scaleData: Array<number> = [1, 1];
    //private _isFBO: boolean = false;
    public alpha: number = 1.0;

    protected initData(): void {
        this.objData = new ObjData();
        ProgrmaManager.getInstance().registe(SceneTransitionShader.SCENE_TRANSITION_SHADER, new SceneTransitionShader);
        this.shader = ProgrmaManager.getInstance().getProgram(SceneTransitionShader.SCENE_TRANSITION_SHADER);
        this.program = this.shader.program;

        this.objData.vertices.push(
            -1, 1, 0,
            1, 1, 0,
            1, -1, 0,
            -1, -1, 0);
        this.objData.uvs.push(
            0, 0,
            1, 0,
            1, 1,
            0, 1);
        this.objData.indexs.push(0, 1, 2, 0, 2, 3);

        this.objData.treNum = 6;

        this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
        this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
        this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);

    }

    public resize(): void {
        this.appleyPos();
    }

    public setImgInfo($url: string, $width: number, $height: number): void {
        this.setImgUrl($url);
        this._width = $width;
        this._height = $height;

    }

    public appleyPos(): void {
        var widthScale: number = this._width / Scene_data.stageWidth;
        var heightScale: number = this._height / Scene_data.stageHeight;

        if (widthScale < heightScale) {
            this._scaleData[0] = 1
            this._scaleData[1] = (this._height / Scene_data.stageHeight) / widthScale;

        } else {
            this._scaleData[0] = (this._width / Scene_data.stageWidth) / heightScale;
            this._scaleData[1] = 1;
        }


    }

    private vOffset:number = 0;
    public update(): void {

        this.vOffset -= 0.08;
        if (this.objData && this.texture) {
            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
            Scene_data.context3D.setVc2fv(this.shader, "scale", this._scaleData);


            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);


            Scene_data.context3D.setVcFloat(this.shader, "alpha", [this.alpha]);
            Scene_data.context3D.setVcFloat(this.shader, "voffset", [this.vOffset]);

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

        }

    }

    public interactiveEvent($e: InteractiveEvent): boolean {
        return true;
    }

}


class SceneTransitionShader extends Shader3D {
    static SCENE_TRANSITION_SHADER: string = "Scene_Transition_Shader";
    constructor() {
        super();
    }
    binLocation($context: WebGLRenderingContext): void {
        $context.bindAttribLocation(this.program, 0, "v3Pos");
        $context.bindAttribLocation(this.program, 1, "v2uv");
    }
    getVertexShaderString(): string {
        var $str: string =
            "attribute vec3 v3Pos;" +
            "attribute vec2 v2uv;" +
            "uniform vec2 scale;" +

            "varying vec2 v_texCoord;" +

            "void main(void)" +
            "{" +
            "   v_texCoord = vec2(v2uv.x, v2uv.y);" +
            "   vec4 vt0= vec4(v3Pos.x*scale.x,v3Pos.y*scale.y,v3Pos.z,1.0);" +
            "   gl_Position = vt0;" +
            "}"
        return $str


    }
    getFragmentShaderString(): string {
        var $str: string =
            " precision mediump float;\n" +
            "uniform sampler2D s_texture;\n" +
            "uniform float alpha;" +
            "uniform float voffset;" +
            "varying vec2 v_texCoord;\n" +

            "void main(void)\n" +
            "{\n" +
            "vec2 uvs = vec2(v_texCoord.x,v_texCoord.y + voffset);\n" +
            "vec4 infoUv = texture2D(s_texture, uvs);\n" +
            "infoUv.w = alpha;\n" +
            "infoUv.xyz *= infoUv.w;\n" +
            "gl_FragColor = infoUv;\n" +


            "}"
        return $str

    }

}  