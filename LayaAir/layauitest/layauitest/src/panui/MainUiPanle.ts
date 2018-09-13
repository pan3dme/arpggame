
module panui {


    export class MainUiPanle extends UIPanel {
    
        public _topRender: UIRenderComponent;


        public constructor() {
            super();

            this.width = 960;
            this.height = 540;

            this.top = 0;
            this.left = 0;



            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this.loadScenePanelH5UI();

        }
     

        private loadScenePanelH5UI(): void {
            this._topRender.uiAtlas = new UIAtlas();
            this._topRender.uiAtlas.setInfo("pan/test/football/playscene/playscene.xml", "pan/test/football/playscene/playscene.png", () => { this.loadConfigCom() });

        }
        private a_scene_bg: UICompenent;
        private a_scene_door: UICompenent;
        private a_ball: FrameCompenent;

        private loadConfigCom(): void {

            this.a_ball = <FrameCompenent>this.addEvntBut("a_ball", this._topRender);
            this.a_ball.speed = 1;

    
            this.a_ball.x = 0
            this.a_ball.y=0
          
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);

            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/1024.png", new Rectangle(-200, -200, 1500, 1500));

            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/house1.png", new Rectangle(800, 200, 256, 256));

            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/house2.png", new Rectangle(900, 500, 256, 256));

            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/house3.png", new Rectangle(500, 200, 256, 256));

  
            this.addPicByPos(Scene_data.fileRoot + "pan/test/layatest/house1.png", new Vector2D(100, 100))
          //  this.addPicByPos(Scene_data.fileRoot + "pan/test/layatest/house2.png", new Vector2D(600, 100))
          //  this.addPicByPos(Scene_data.fileRoot + "pan/test/layatest/house3.png", new Vector2D(400, 400))


           // Laya. Stat.show();

            this.setup();
        }
        private setup(): void {
            // 该文本自动适应尺寸
            var autoSizeText: Laya.Text = this.createSampleText();
            autoSizeText.overflow = Laya.Text.VISIBLE;
            autoSizeText.y = 50;

            // 该文本被限制了宽度
            var widthLimitText: Laya.Text = this.createSampleText();
            widthLimitText.width = 100;
            widthLimitText.y = 180;

            //该文本被限制了高度 
            var heightLimitText: Laya.Text = this.createSampleText();
            heightLimitText.height = 20;
            heightLimitText.y = 320;
        }

        private createSampleText(): Laya.Text {
            var text: Laya.Text = new Laya.Text();
            text.overflow = Laya.Text.HIDDEN;

            text.color = "#FFFFFF";
            text.font = "Impact";
            text.fontSize = 20;
            text.borderColor = "#FFFF00";
            text.x = 80;

            Laya.stage.addChild(text);
            text.text = "A POWERFUL HTML5 ENGINE潘佳治123 ON FLASH TECHNICAL\n" + "A POWERFUL HTML5 ENGINE ON FLASH TECHNICAL\n" + "A POWERFUL HTML5 ENGINE ON FLASH TECHNICAL";

            return text;
        }
        private addPicByPos($url:string,$v2d: Vector2D): void {
            
            var $imag: Laya.Image = new Laya.Image($url)
            $imag.pos($v2d.x, $v2d.y)
            Laya.stage.addChild($imag);
        }
        private  addRoleChar(): void {
            for (var i: number = 0; i < 10; i++) {
                var $sc: pan2d.Scene2dChar = new pan2d.Scene2dChar();
                $sc.setRoleUrl(getRoleUrl("npc_0002"));
                //  $sc.setRoleUrl(getRoleUrl("pan003"));
                /*
                $sc.setWingByID("901");
                $sc.setMountById("4103");
                $sc.setWeaponByAvatar(50011);
                          $sc.play(CharAction.STAND_MOUNT);
                */


                $sc.rotationY = random(360)

                $sc.set2dPos(i * 100, i * 100);  //坐标
                SceneManager.getInstance().addMovieDisplay($sc);
            }

        }

        private addFrameBg($url: string, $rect: Rectangle): void {

           
            var $dis: pan2d. Ground2dBaseSprite =pan2d.GroundModel.getInstance().addGroundPicByeUrl()
            //图片坐标和高宽
            $dis.width = $rect.width
            $dis.height = $rect.height
            $dis.x = $rect.x;
            $dis.y = $rect.y;
            $dis.setPicUrl($url); //图片地址
        }
        public onMouseDown($evt: InteractiveEvent): void {
            //this.a_ball.x = $evt.x / UIData.Scale
            //this.a_ball.y = $evt.y / UIData.Scale;

            var $mousePos: Vector2D = new Vector2D($evt.x, $evt.y)
            $mousePos.x -= pan2d.CanvasPostionModel.getInstance().tureMoveV2d.x
            $mousePos.y -= pan2d.CanvasPostionModel.getInstance().tureMoveV2d.y
            var $sc: pan2d.Scene2dChar = new pan2d.Scene2dChar();

            $sc.setRoleUrl(getRoleUrl("npc_0002"));
            $sc.set2dPos($mousePos.x, $mousePos.y);  //坐标
            $sc.rotationY=215
            SceneManager.getInstance().addMovieDisplay($sc);


           

        }
        protected butClik($evt: InteractiveEvent): void {
            console.log($evt.target)


       
   
        }

   

    }
}