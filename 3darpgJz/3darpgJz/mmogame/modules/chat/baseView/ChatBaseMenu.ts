module Chat {


    export class ChatBaseMenu extends UIVirtualContainer {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public static testNum: number = 0
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.bottom = 0
            this.left = 0
        }
        public setRender($bg: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top; //没用到
            this.loadConfigCom();
        }
        private w_input_bg:UICompenent
        private loadConfigCom(): void {

   
            this.addEvntBut("w_bottom_bg", this._bottomRender)


            this.uiList=new Array()

            this.w_input_bg = this.addEvntBut("w_input_bg", this._midRender);
            this.w_horn_but = this.addEvntBut("w_horn_but", this._midRender);
            this.w_face_but = this.addEvntBut("w_face_but", this._midRender);
            this.w_send = this.addEvntBut("w_send", this._midRender);


            this.w_input_ctx = <UICompenent>this._topRender.getComponent("w_input_ctx");


            this.uiList.push(this.w_input_bg)
            this.uiList.push(this.w_horn_but)
            this.uiList.push(this.w_face_but)
            this.uiList.push(this.w_send)
            this.uiList.push(this.w_input_ctx)


            this.w_sys_tips = <UICompenent>this._midRender.getComponent("w_sys_tips");




            

            this.w_sys_tips.y = 490;

            document.addEventListener(MouseType.KeyDown, ($evt: KeyboardEvent) => { this.onKeyDown($evt) })
  

        }

        private  gmId: number = 0
        private  onKeyDown($vt: KeyboardEvent): void {


            if (GameStart.GM && this.parent && this.parent.hasStage) {
                if ($vt.keyCode == KeyboardType.Up || $vt.keyCode == KeyboardType.Down) {
                    var $temp: string = localStorage.getItem("GMITEM");
                    if ($temp) {
                        var $gmitem: Array<string> = JSON.parse($temp)
                        if ($vt.keyCode == KeyboardType.Up) {
                            this.gmId++
                        }
                        if ($vt.keyCode == KeyboardType.Down) {
                            this.gmId--
                        }
                        this.gmId = Math.max(0, this.gmId);
                        this.gmId = Math.min(this.gmId, $gmitem.length - 1);
                        var selectstr: string = $gmitem[($gmitem.length - this.gmId) - 1]

                        this.setInputLabelStr(selectstr)

                    }
                }
            }
        }
        private w_input_ctx:UICompenent

        private w_sys_tips: UICompenent;

  
        private uiList: Array<UICompenent>;


        public resize(): void {

            super.resize()
            var $rect: Rectangle = new Rectangle()
            $rect.x = this.w_input_bg.x * UIData.Scale
            $rect.y = this.y + this.w_input_bg.y * UIData.Scale
            $rect.width = this.w_input_bg.width * UIData.Scale
            $rect.height = this.w_input_bg.height * UIData.Scale




        }

        private w_send: UICompenent
        private w_horn_but: UICompenent
        private w_face_but:UICompenent
        protected butClik(evt: InteractiveEvent): void {
            console.log(evt.target)
            switch (evt.target) {
                case this.w_send:
                    this.sendCharInfo();
                    break
      
                case this.w_horn_but:
                    ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT));
                    ModuleEventManager.dispatchEvent(new hornui.HornUiEvent(hornui.HornUiEvent.SHOW_HORN_UI_PANEL));
                    break
 
                case this.w_face_but:
                    //var $facePanel: FacePanel = FacePanel.show(this._bottomRender.uiAtlas,null);
                    //$facePanel.bottom = Scene_data.stageHeight - evt.y

                    var $skd: faceui.FaceUiEvent = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL)
                    $skd.data = { bfun: ($faceStr:string) => { this.faceFunBack($faceStr)}}
                    ModuleEventManager.dispatchEvent($skd);

                    break
                case this.w_input_bg:

                    if (Scene_data.verticalScene == true) {
                        console.log("横版本输入")
                    }
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this.chatHtmlText, 0, 12)
                    break
          
                    
                default:
                    break;

            }

     

        }
        private chatHtmlText:string=""
        private inputBfun($str: string): void {


            this.setInputLabelStr($str)
          
        }
        private setInputLabelStr($str: string): void
        {
            this.chatHtmlText = $str
            console.log($str)
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.w_input_ctx.skinName, ColorType.color9a683f+ $str, 16, TextAlign.LEFT)
        }
        public faceFunBack($faceStr:string): void
        {
            var str: string = this.chatHtmlText
            ChatModel.getInstance().sendCharInfo(str + $faceStr)

   
        }
        public refresh(): void {

            this.setUiListVisibleByItem(this.uiList, ChatModel.showType > 0);
            this.setUiListVisibleByItem([this.w_sys_tips], ChatModel.showType == 0);
   

            if (Scene_data.verticalScene) {
                this.w_input_ctx.x = 17
            } else {
                this.w_input_ctx.x = 17
            } 
         
            this.resize();
        }
     
        private sendCharInfo(): void {

            var str: string = this.chatHtmlText
            this.setInputLabelStr("");
            if (!str.length) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "无法发送空字符", 99);
                return;
                // str = "横版本文字.."
            }
            console.log("频道", ChatModel.showType)
            ChatModel.getInstance().sendCharInfo(str)

        

        }



    }
}