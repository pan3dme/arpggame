module msgtip {
    export class SystemOpenShow extends UIConatiner {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _roationRenderComponent: RoationUIRenderComponent

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.middle = 0;
            this.center = 0;


            this._roationRenderComponent = new RoationUIRenderComponent();
            this.addRender(this._roationRenderComponent);

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);




            

            this._midRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/msg/systemopenshow.xml", "ui/uidata/msg/systemopenshow.png", () => { this.loadConfigCom() });
        }
        private a_text_frame: FrameCompenent;
        private a_round_bg: RoationUICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._roationRenderComponent.uiAtlas = this._midRender.uiAtlas;
            this.a_round_bg = <RoationUICompenent>this.addChild(this._roationRenderComponent.getComponent("a_round_bg"));
            this.a_round_bg.x = this.a_round_bg.x + this.a_round_bg.width / 2;
            this.a_round_bg.y = this.a_round_bg.y + this.a_round_bg.height / 2;
            this.a_round_bg.aotuRotation = 1

            this.addChild(this._midRender.getComponent("a_ico_bg"));
         
            this.a_text_frame = <FrameCompenent>this.addChild(this._topRender.getComponent("a_text_frame"));

            this.a_text_frame.goToAndStop(0)

            this.addPersonChar()
            this.a_round_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);

            this.addEvntBut("a_empty", this._topRender);

            
            this.applyLoadComplete();
        }
        private showDisPlay: Person2DChar
        private addPersonChar(): void {
            this.showDisPlay = new Person2DChar();
            this._midRender.addModel(this.showDisPlay);
          //  this.showDisPlay.setAvatar(5101);
         //   this.resizeRole()
        }
        public setModelByID($tb: tb.TB_system_icon): void {
           
            switch ($tb.showmodel) {
                case 4101:
                    this._scale = 3;
                    this._posy = -50;
                    this.showDisPlay.rotationY = 45;
                    this.a_text_frame.goToAndStop(0);
                    break
                case 951:
                    this._scale = 5;
                    this._posy = 0;
                    this.showDisPlay.rotationY = 0;
                    this.a_text_frame.goToAndStop(1);
                    break
                case 801:
                    this._scale = 3;
                    this._posy = -30;
                    this.showDisPlay.rotationY = 0;
                    this.a_text_frame.goToAndStop(2);
                    break
                default:
                    this._scale = 3;
                    this._posy = -30;
                    this.showDisPlay.rotationY = 0;
                    break
            }
            this.showDisPlay.setAvatar($tb.showmodel);
            this.resizeRole()
            TimeUtil.addTimeOut(10000, () => {
                this.close();
            });

        }
        private _posy: number;
        private _scale: number;
        private resizeRole(): void {

            if (this.showDisPlay) {
     

                this.showDisPlay.resize();
                this.showDisPlay.scale = this._scale * UIData.Scale;
   
                this.showDisPlay.y = this._posy * UIData.Scale;

            }
        }
        protected butClik(evt: InteractiveEvent): void {
            this.close()
        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);

            ModuleEventManager.dispatchEvent(new MsgTipEvent(MsgTipEvent.REFRISH_SYS_AND_UI_CHANGE));

        }
    }
}