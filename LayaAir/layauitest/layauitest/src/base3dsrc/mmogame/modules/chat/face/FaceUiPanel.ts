module faceui {
    export class FaceUiPanel extends UIConatiner {

        private _bootomRender: UIRenderComponent;
        private _faceRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        public constructor() {
            super();
            this.width = 450;
            this.height = 280;
            this.bottom = 0
            this.left = 0

            this._bootomRender = new UIRenderComponent();
            this.addRender(this._bootomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);

            this._faceRender = new UIRenderComponent();
            this.addRender(this._faceRender);


            this._midRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {

            this._midRender.uiAtlas.setInfo("ui/uidata/chat/face/face.xml", "ui/uidata/chat/face/face.png", () => { this.loadConfigCom() });
        }
        private setSizeForPanelUi($ui: UICompenent, $uiName: string): void {
            var temp: UICompenent = this._midRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        }
        private a_bg:UICompenent
        private loadConfigCom(): void {
            this._bootomRender.uiAtlas = GameData.publicbgUiAtlas
            this._faceRender.uiAtlas = this._midRender.uiAtlas

            this.a_bg = this.addEvntBut("a_bg", this._midRender)

            var pos: Vector2D = new Vector2D(30, 20)
            for (var i: number = 0; i < 4 * 4; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addEvntBut("a_face_icon", this._faceRender)
                $ui.x = i % 6 * 68 + pos.x;
                $ui.y = Math.floor(i / 6) * 58 + pos.y;
                $ui.width = 50;
                $ui.height = 50;
                $ui.goToAndStop(i);
                $ui.data = i;
                this.drawFaceIconToCtx($ui,i)
            }
            this.applyLoadComplete();

        }
        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
        
                default:
                    if (evt.target.data) {
                        this.close();
                        this.selectFaceType(evt.target.data);
                    }
                    break;
            }

        }
        private selectFaceType(value: number): void {
            this.close()
            //  var $str: string = Chat.FACE_TYPE.faceItem[value]

            var $str: string = UIData.faceItem[value];
            if (this.bfun) {
                this.bfun($str)
            } 
               //  ChatHtmlInput.chatHtmlInput.value += $str;


        }
        public bfun:Function
        private close(): void
        {
            ModuleEventManager.dispatchEvent(new faceui.FaceUiEvent(faceui.FaceUiEvent.HIDE_FACE_UI_PANEL));
        }
        private drawFaceIconToCtx($ui: FrameCompenent,$id:number): void
        {
            var $toRect: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            UiDraw.cxtDrawImg($ctx, "F_FACE_" + ($id+1), new Rectangle(0, 0,$toRect.width,$toRect.height), UIData.publicUi);
            $ui.drawToCtx(this._midRender.uiAtlas, $ctx);
        }
      
    }

}