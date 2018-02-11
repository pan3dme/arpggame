module minmap {
    class MinMapImgShader extends Shader3D {
        static MinMapImgShader: string = "MinMapImgShader";
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
                "uniform vec4 verdata;" +

                "varying vec2 v_texCoord;" +

                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(v2uv.x, v2uv.y);" +
                "   vec4 vt0= vec4(v3Pos.x*verdata.z,v3Pos.y*verdata.w,v3Pos.z,1.0);" +

                "vt0.xy+=verdata.xy;\n" +

                "   gl_Position = vt0;" +
                "}"
            return $str


        }
        getFragmentShaderString(): string {
            var $str: string =
                " precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "uniform vec4 uvdata;" +
                "varying vec2 v_texCoord;\n" +

                "void main(void)\n" +
                "{\n" +

        

                "vec2 scaleuv = v_texCoord;\n" +

                "float angle =uvdata.w;" +
                "vec4 np = vec4(sin(angle), cos(angle), 0, 0);\n" +
                "scaleuv.x = np.x * v_texCoord.y + np.y * v_texCoord.x;\n" +
                "scaleuv.y = np.y * v_texCoord.y - np.x * v_texCoord.x;\n" +

                "scaleuv *= uvdata.z;\n" +
                "scaleuv.xy += uvdata.xy;\n" +

                "vec4 infoUv = texture2D(s_texture, scaleuv.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +


                "}"
            return $str

        }

    }  
    export  class MinMapImg extends UIRenderComponent {
        public constructor() {
            super();
        }
        private _width: number;
        private _height: number;
        private _wScale: number;
        private _hScale: number;
        private _scaleData: Array<number> = [0, 0,1,1];

        private _rotation:number=0
        protected initData(): void {
            this.objData = new ObjData();
            ProgrmaManager.getInstance().registe(MinMapImgShader.MinMapImgShader, new MinMapImgShader);
            this.shader = ProgrmaManager.getInstance().getProgram(MinMapImgShader.MinMapImgShader);
            this.program = this.shader.program;

            this.objData.vertices.push(
                -1, 1, 0,
                1, 1, 0,
                1, -1, 0,
                -1, -1, 0);
            this.objData.uvs.push(
                -1, -1,
                +1, -1,
                +1, +1,
                -1, +1);
            this.objData.indexs.push(0, 1, 2, 0, 2, 3);

            this.objData.treNum = 6;

            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);


            this._width = 120;
            this._height = 80;
        }

        public resize(): void {
            if (this.textureRes) {
                this.appleyPos();
            }
        }

        public setImgInfo($url: string): void {
            this.setImgUrl($url);
        }
        public setImgUrl($url: string): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + $url, ($texture: TextureRes) => {
                this.textureRes = $texture;
                this.resize();

                this.keyScale = this.textureRes.width / AstarUtil.minMapRect.width  //特殊比例.
            });

        }
        public keyScale:number=1

        public appleyPos(): void {
            var widthScale: number = this._width / Scene_data.stageWidth;
            var heightScale: number = this._height / Scene_data.stageHeight;

            this._scaleData[0] = 1 - widthScale * UIData.Scale;
            this._scaleData[1] = 1 - heightScale * UIData.Scale;

            this._scaleData[2] = widthScale * UIData.Scale;
            this._scaleData[3] = heightScale * UIData.Scale;
         

        }
        private uvDataPos:Vector2D=new Vector2D()
        private setPostion(): void
        {
            var bw: number = (512 / 512) / 2;
            var pos: Vector3D = GameInstance.mainChar.getCurrentPos();
            var tx: number = pos.x / AstarUtil.minMapRect.width * bw;
            var ty: number = -pos.z / AstarUtil.minMapRect.height * bw;

            this.uvDataPos.x = tx+0.5;
            this.uvDataPos.y = ty+0.5;
            this._rotation = Scene_data.gameAngle * Math.PI / 180
     
        }
        public update(): void {

            if (this.objData && this.texture) {
                this.setPostion()
                Scene_data.context3D.setBlendParticleFactors(0);
                Scene_data.context3D.setProgram(this.program);

                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);

                Scene_data.context3D.setVc4fv(this.shader, "verdata", this._scaleData);

                var $pos: Vector2D = new Vector2D(this.uvDataPos.x, this.uvDataPos.y);

     
                var $scale: Vector2D = new Vector2D(120 / 512 / 2 * this.keyScale, this._rotation);
                Scene_data.context3D.setVc4fv(this.shader, "uvdata", [$pos.x, $pos.y, $scale.x, $scale.y]);
        
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);

                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);

                //AstarUtil.sceneRotationInfo();

                
            }

        }

        public interactiveEvent($e: InteractiveEvent): boolean {
            return false;
        }



    } 




}