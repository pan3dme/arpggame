module Chat {


    export class ChatBaseLeftMenu extends UIVirtualContainer {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public static testNum: number = 0
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0
            this.left = 0
        }
        public setRender($bg: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top
            this.loadConfigCom();
        }
        private w_black:UICompenent
        private loadConfigCom(): void {


            this.w_black = this.addEvntButUp("w_black", this._bottomRender)
         //   w_black

            this.menuTypeButs = new Array;
            this.a_an0 = <SelectButton>this.addEvntBut("a_an0", this._midRender)
            this.a_an0.data = SharedDef.CHAT_TYPE_SYSTEM

            this.a_an1 = <SelectButton>this.addEvntBut("a_an1", this._midRender)
            this.a_an1.data = SharedDef.CHAT_TYPE_WORLD

            this.a_an2 = <SelectButton>this.addEvntBut("a_an2", this._midRender)
            this.a_an2.data = SharedDef.CHAT_TYPE_CURRENT

            this.a_an3 = <SelectButton>this.addEvntBut("a_an3", this._midRender)
            this.a_an3.data = SharedDef.CHAT_TYPE_FACTION



            this.menuTypeButs.push(this.a_an0)
            this.menuTypeButs.push(this.a_an1)
            this.menuTypeButs.push(this.a_an2)
            this.menuTypeButs.push(this.a_an3)



            this.a_an_txt_0 = <UICompenent>this.addChild(this._topRender.getComponent("a_an_txt_0"));
            this.a_an_txt_1 = <UICompenent>this.addChild(this._topRender.getComponent("a_an_txt_1"));
            this.a_an_txt_2 = <UICompenent>this.addChild(this._topRender.getComponent("a_an_txt_2"));
            this.a_an_txt_3 = <UICompenent>this.addChild(this._topRender.getComponent("a_an_txt_3"));



            this.redItem = new Array()
            for (var i: number = 0; i <= 5; i++) {
                this.redItem.push(<UICompenent>this.addChild(this._topRender.getComponent("a_mes_red_icon")))
            }
            this.redItem[0].data = SharedDef.CHAT_TYPE_SYSTEM  //系统
            this.redItem[1].data = SharedDef.CHAT_TYPE_WORLD  //世界
            this.redItem[2].data = SharedDef.CHAT_TYPE_CURRENT  //附近

            this.redItem[3].data = SharedDef.CHAT_TYPE_FACTION  //家族




        }
        private redItem: Array<UICompenent>;

        public resize(): void {
            super.resize()
            this.w_black.height = Scene_data.stageHeight / UIData.Scale - 65
            this.w_black.width=480
        }
        private a_an0: SelectButton;
        private a_an1: SelectButton;
        private a_an2: SelectButton;
        private a_an3: SelectButton;

        private a_an_txt_0: UICompenent
        private a_an_txt_1: UICompenent
        private a_an_txt_2: UICompenent
        private a_an_txt_3: UICompenent


        private menuTypeButs: Array<SelectButton>
    
        private setMenuByType(value: number): void {
            for (var i: number = 0; i < this.menuTypeButs.length; i++) {
                this.menuTypeButs[i].selected = Boolean(this.menuTypeButs[i].data == value)
            }
            ChatModel.showType = value;
        }
        public refresh(): void {
            this.setMenuByType(ChatModel.showType)

            for (var i: number = 0; i < this.redItem.length; i++) {
                var $redui: UICompenent = this.redItem[i]
                $redui.x = -600;
                $redui.y = i * 46;
                var $needShow: boolean = false;
                for (var j: number = 0; j < ChatModel.getInstance().chatItem.length; j++) {
                    var vo: ChatVo = ChatModel.getInstance().chatItem[j];
                    if (!vo.showLast && Number($redui.data) == vo.s2c_send_chat.channel) {
                        $needShow = true
                        $redui.x = 60;
                    }
                }
            }
        }
        protected butClik(evt: InteractiveEvent): void {

            if (!isNaN(evt.target.data)) {
                this.setMenuByType(evt.target.data);
               (<ChatBasePanel>this.parent).refresh();
            }
        }

    }
 
}