module faction {

    export class NoticePanel extends WindowCentenMin {

        private _publicbgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            super.dispose();
        }

        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            //添加好友面板渲染器
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

        }

        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            //     this._publicbgRender.uiAtlas = $publicbgUiAtlas;
                this._topRender.setInfo("ui/uidata/faction/gonggao/announcement.xml", "ui/uidata/faction/gonggao/announcement.png", () => { this.loadConfigCom() });
            // });
        }

        private g_bg_6: UICompenent;
        private g_bg_7: UICompenent;
        private g_bg_8: UICompenent;
        private b_btnbg_qx: UICompenent;
        private b_btnbg_qr: UICompenent;
        private GG: UICompenent;
        private QQ: UICompenent;
        private WeChat: UICompenent;
        private loadConfigCom(): void {
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            var renderLevel: UIRenderComponent = this._topRender;
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;

           

            this.g_bg_6 = this.addEvntBut("cnew_infobg", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.g_bg_6,"g_bg_6",renderLevel);

            this.g_bg_7 = this.addEvntBut("cnew_txtbg", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.g_bg_7,"g_bg_7",renderLevel);

            this.g_bg_8 = this.addEvntBut("cnew_txtbg", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.g_bg_8,"g_bg_8",renderLevel);

            this._publicbgRender.applyObjData();

            this.addUIList(["a_49", "a_50", "a_48"], renderLevel);

            this.addChild(<UICompenent>this._midRender.getComponent("a_1"));

            this.b_btnbg_qr = this.addEvntBut("a_34_1", renderLevel);
            this.b_btnbg_qx = this.addEvntBut("a_51", renderLevel);

            this.GG = this.addChild(<UICompenent>renderLevel.getComponent("a_52"));
            this.QQ = this.addChild(<UICompenent>renderLevel.getComponent("a_54"));
            this.WeChat = this.addChild(<UICompenent>renderLevel.getComponent("a_53"));
            this.applyLoadComplete();
        }

        private initData(): void {
            var str: string = GuidData.faction.getNotice();
            if (str && str.length > 0) {
                var ary: Array<string> = str.split("\1")
                if (ary[0].length > 0) {
                    this._msgTxtGG = ary[0];
                    this._type = true;
                } else {
                    this._msgTxtGG = "在此处输入文字"
                    this._type = false;
                }
                this._msgTxtQQ = ary[1];
                this._msgTxtWeChat = ary[2];
            } else {
                this._msgTxtGG = "在此处输入文字"
                this._type = false;
                this._msgTxtQQ = "";
                this._msgTxtWeChat = "";
            }
            this.refreshInputBfunGG(this._msgTxtGG, this._type);
            this.refreshInputBfunQQ(this._msgTxtQQ);
            this.refreshInputBfunWeChat(this._msgTxtWeChat);
        }

        public resize(): void {
            super.resize();
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.initData();
            }
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }


        private _msgTxtGG: string;
        private _msgTxtQQ: string;
        private _msgTxtWeChat: string;
        private _type: boolean
        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break
                case this.g_bg_6:
                    //文本框监听事件  
                    InputPanel.show(($str: string) => { this.inputBfunGG($str) }, this._type ? this._msgTxtGG : "", 0, 200)
                    break
                case this.g_bg_7:
                    //文本框监听事件  
                    InputPanel.show(($str: string) => { this.inputBfunQQ($str) }, this._msgTxtQQ)
                    break
                case this.g_bg_8:
                    //文本框监听事件  
                    InputPanel.show(($str: string) => { this.inputBfunWeChat($str) }, this._msgTxtWeChat)
                    break
                case this.b_btnbg_qx:
                    this.hide();
                    break
                case this.b_btnbg_qr:
                    var key: string = "\1";
                    var str: string = this._msgTxtGG == "在此处输入文字" ? "" : this._msgTxtGG;
                    var completestr = str + key + this._msgTxtQQ + key + this._msgTxtWeChat;
                    var byte:ByteArray = new ByteArray()
                    byte.writeUTF(completestr);
                    if(byte.length > 100){
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "字符太长", 99);
                        return;
                    }
                    NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_NOTICE, 0, 0,completestr , "");
                    this.hide();
                    break
                default:
                    break;
            }
        }

        private inputBfunGG($str: string): void {
            if ($str.length > 0) {
                this._type = true;
                this._msgTxtGG = $str;
            } else {
                this._type = false;
                this._msgTxtGG = "在此处输入文字";
            }
            this.refreshInputBfunGG(this._msgTxtGG, this._type)

        }
        private inputBfunQQ($str: string): void {
            this._msgTxtQQ = $str;
            this.refreshInputBfunQQ($str)
        }
        private inputBfunWeChat($str: string): void {
            this._msgTxtWeChat = $str;
            this.refreshInputBfunWeChat($str)
        }

        private refreshInputBfunGG($str: string, $type: boolean): void {
            LabelTextFont.writeText(this._topRender.uiAtlas, this.GG.skinName, 10, 5, $str, 16, $type ? "#853d07" : "#853d07", 320, true);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.h_label_num_txt.skinName,"99",ArtFont.num1)
        }
        private refreshInputBfunQQ($str: string): void {

            var ary: Array<string> = $str.split("\1")
            if (ary[1] == "") {
                $str = ""
            }
            LabelTextFont.writeText(this._topRender.uiAtlas, this.QQ.skinName, 10, 5, $str, 16, "#853d07", 180, true);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.h_label_num_txt.skinName,"99",ArtFont.num1)
        }
        private refreshInputBfunWeChat($str: string): void {

            var ary: Array<string> = $str.split("\1")
            if (ary[1] == "") {
                $str = ""
            }
            LabelTextFont.writeText(this._topRender.uiAtlas, this.WeChat.skinName, 10, 5, $str, 16, "#853d07", 180, true);
            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.h_label_num_txt.skinName,"99",ArtFont.num1)
        }
    }
}