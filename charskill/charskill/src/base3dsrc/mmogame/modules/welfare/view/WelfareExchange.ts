module welfare {

    export class WelfareExchange extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;


        public dispose(): void {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
        }

        public initUiAtlas($uiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private f_btn: UICompenent
        private f_txt: UICompenent
        private f_txtbg: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this.addChild(this._bottomRender.getComponent("f_info"));

            this.f_txtbg = this.addEvntButUp("f_txtbg", this._bottomRender);
            this.f_txt = this.addChild(renderLevel.getComponent("f_txt"));
            this.f_btn = this.addEvntButUp("f_btn", renderLevel);
        }

        public resize(): void {
            super.resize();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public resetData(): void {
            this.resetInputtxt();
            this.resize();
        }

        private _type: boolean;
        private _msg: string;
        public resetInputtxt() {
            this._msg = "";
            this._type = false;
            this.refreshInputBfunGG();
        }

        private inputBfunGG($str: string): void {
            var byte: ByteArray = new ByteArray()
            byte.writeUTF($str);
            if (byte.length > 0) {
                this._type = true;
                this._msg = $str;
            } else {
                this._type = false;
                this._msg = "";
            }
            this.refreshInputBfunGG();
        }

        private refreshInputBfunGG(): void {
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.f_txt.skinName, this._msg, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.f_txtbg:
                    //输入框
                    InputPanel.show(($str: string) => { this.inputBfunGG($str) }, this._type ? this._msg : "", 0, 320)
                    break;
                case this.f_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    //确定
                    if (this._type) {
                        var byte: ByteArray = new ByteArray()
                        byte.writeUTF(this._msg);
                        if (byte.length > 25) {
                            console.log("=-----byte.length----",byte.length);
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "兑换码不正确", 99);
                            return;
                        }
                        NetManager.getInstance().protocolos.use_giftcode(this._msg);
                        // this.resetInputtxt();

                    }
                    break;
                default:
                    if (evt.target.data[0] == 1) {
                        NetManager.getInstance().protocolos.get_seven_day_recharge_extra_reward(evt.target.data[1]);
                    } else if (evt.target.data[0] == 0) {
                        //查看奖励信息
                        var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(evt.target.data[2]);

                        var bag: BagItemData = new BagItemData();
                        bag.entryData = obj;

                        var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                        aa.data = bag;
                        aa.buttonType = -1;
                        ModuleEventManager.dispatchEvent(aa);
                    }
                    break;
            }
        }
    }
}