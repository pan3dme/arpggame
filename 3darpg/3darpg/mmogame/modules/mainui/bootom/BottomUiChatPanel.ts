module bottomui {

    export class BottomUiChatPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI=true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.bottom = 0;
            this.center=0


        }
        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        }
        private a_chat_msg: UICompenent

 
        private a_chat_bg: UICompenent
        private loadConfigCom(): void {


            this.a_chat_bg = this.addEvntButUp("a_chat_bg", this._bottomRender)
            this.a_chat_bg.addEventListener(InteractiveEvent.Down, v=>{}, this);
            this.a_chat_msg = <UICompenent>this.addChild(this._bottomRender.getComponent("a_chat_msg"));
        }
        public setShowChatGrid(value: boolean): void {
            this.setUiListVisibleByItem([this.a_chat_bg, this.a_chat_msg], value);
        }
        public restChatList(): void {
            //var $vvv: Array<string> = new Array;
            //$vvv.push("李逍遥获得了绝世神兵赵灵儿加入了家族兵兵绝世神兵");
            //$vvv.push("李逍遥获得了绝世神兵世神兵");
            //$vvv.push("[84d500]赵灵儿加入了家族");
            //$vvv.push("[58e3ff]林月如退出了队伍");
            var $fontSize22: number = 22
            var $rect: UIRectangle = this._midRender.uiAtlas.getRec(this.a_chat_msg.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);

            $ctx.font = (true ? "bolder " : "") + " " + $fontSize22 + "px " + UIData.font;//设置字体大小
            // UiDraw.cxtDrawImg($ctx, PuiData.A_HIGHT_F, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.publicUi);


            var $arr: Array<Chat.ChatVo> = Chat.ChatModel.getInstance().getLastThreeChatVo();
            var $totalH: number = 0
            var weightNum420: number = 420
            for (var i: number = 0; i < $arr.length; i++) {
                var contxt: string = "[世界]" + getBaseName($arr[i].s2c_send_chat.name) + ":" + $arr[i].contentTxt
                var th: number = FaceFontLabel.getTextHeight($ctx, contxt, $fontSize22, weightNum420)
                console.log("宽度", TextRegExp.getTextMetrics($ctx, contxt))
                console.log("高度", th)
                $totalH += th;
                console.log("$totalH", th)
            }
            var ty: number = Math.min(3 - $totalH, 0)
            for (var i: number = 0; i < $arr.length; i++) {
                var $adTxt: string = ""
                var $color: string = "#ff0000";
                switch ($arr[i].s2c_send_chat.channel) {
                    case SharedDef.CHAT_TYPE_WORLD:
                        $color = "#ffc13a"
                        $adTxt = "[世界]"
                        break;
                    case SharedDef.CHAT_TYPE_FACTION:
                        $color = "#00b1f1"
                        $adTxt = "[家族]"
                        break;
                    case SharedDef.CHAT_TYPE_CURRENT:
                        $color = "#58e3ff"
                        $adTxt = "[附近]"
                        break;
                    default:
                        break;
                }
                var contxt: string = $adTxt + getBaseName($arr[i].s2c_send_chat.name) + ":" + $arr[i].contentTxt
                ty += FaceFontLabel.writeMultiFaceLineToCtx($ctx, contxt, 22, 0, ty * 32, weightNum420, 10, $color)
            }
            this._midRender.uiAtlas.updateCtx($ctx, $rect.pixelX, $rect.pixelY);

        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_chat_bg:
                    ModulePageManager.openPanel(SharedDef.MODULE_CHAT);
                    break;
                default:
                    break;

            }

        }
    }
}