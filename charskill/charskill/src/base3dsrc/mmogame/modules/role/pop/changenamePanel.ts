module role {

    export class changenamePanel extends UIPanel {

        private _baseRender: UIRenderComponent;
        private _publicbgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        }


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)


            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas
            this._bgRender.uiAtlas.setInfo("ui/uidata/role/changename.xml", "ui/uidata/role/changename.png", () => { this.loadConfigCom() });
            // });

        }

        private a_basebg: UICompenent
        private cnew_btn0: UICompenent
        private cnew_btn1: UICompenent
        private a_txtbg: UICompenent
        private a_name: UICompenent
        private a_cost: UICompenent
        private loadConfigCom(): void {

            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;

            this.a_basebg = this.addEvntBut("a_basebg", this._bgRender);
            this.a_basebg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(this._bgRender.getComponent("a_bg"))
            this.a_name = this.addChild(this._midRender.getComponent("a_name"))
            this.a_cost = this.addChild(this._midRender.getComponent("a_cost"))
            this.a_txtbg = this.addEvntButUp("a_txtbg", this._baseRender);
            this.addUIList(["a_title", "a_txt", "a_btnqd", "a_btnqx"], this._midRender);

            this.cnew_btn0 = this.addEvntButUp("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.cnew_btn0, "btnBg0", this._midRender);

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg1", this._midRender);

            this.resize();
            this.applyLoadComplete();
        }

        public resize(): void {
            this.a_basebg.top = 0
            this.a_basebg.left = 0
            this.a_basebg.y = 0;
            this.a_basebg.x = 0;
            this.a_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.a_basebg.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_basebg:
                    break;
                case this.cnew_btn0:
                    //确定
                    if (this.checkStr(this._msg) && this._type && this._canbuy) {
                        var byte: ByteArray = new ByteArray()
                        byte.writeUTF(this._msg);
                        if (byte.length > 20) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "字符太长", 99);
                            return;
                        }
                        NetManager.getInstance().protocolos.rename(this._msg);
                        UIManager.getInstance().removeUIContainer(this);
                    } else {
                        if (!this._type) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "名称修改失败，与原名相同", 99);
                            return;
                        }
                        if (!this._canbuy) {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = this._resid
                            ModuleEventManager.dispatchEvent($aaa);
                            return;
                        }
                        if (!this.checkStr(this._msg)) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "含敏感词汇,请更正", 99);
                            return;
                        }
                    }
                    break;
                case this.cnew_btn1:
                    //取消
                    UIManager.getInstance().removeUIContainer(this);
                    break;
                case this.a_txtbg:
                    //输入框
                    InputPanel.show(($str: string) => { this.inputBfunGG($str) }, this._type ? this._msg : "", 0, 320)
                    break;

                default:
                    break;
            }
        }
        
        private _resid:number;
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            this.resetInputtxt();
            var num = GuidData.player.getChgNameTime();
            var panum = num + 1;
            var tabary = tb.TB_rename_info.get_TB_rename_info();
            for (var i = 0; i < tabary.length; i++) {
                var start = tabary[i].range[0]
                var end = tabary[i].range[1] == -1 ? 100000 : tabary[i].range[1];
                if (panum >= start && panum <= end) {
                    this._resid = tabary[i].costs[0][0]
                    this.drawCost(tabary[i].costs[0]);
                    break;
                }
            }
        }

        private drawCost($costary: Array<number>) {
            if ($costary[1] == 0) {
                this._canbuy = true;
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_cost.skinName, "首次改名免费", 16, TextAlign.LEFT, ColorType.colorff7200);
            } else {
                this._canbuy = UiDraw.drawRewardIconAndtxt(this.a_cost, $costary, true, TextAlign.LEFT);
            }
        }

        private _canbuy: boolean;
        private _type: boolean;
        private _msg: string;
        public resetInputtxt() {
            this._msg = GuidData.player.getBaseName();
            this._type = false;
            this.refreshInputBfunGG();
        }

        private inputBfunGG($str: string): void {
            var byte: ByteArray = new ByteArray()
            byte.writeUTF($str);
            if (byte.length > 20 || $str.length > 6) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "输入太长了（超过6个字了）", 99);
                return;
            } else if (byte.length > 0) {
                this._type = true;
                this._msg = $str;
            } else {
                this._type = false;
                this._msg = GuidData.player.getBaseName();
            }
            this.refreshInputBfunGG();
        }

        private refreshInputBfunGG(): void {
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_name.skinName, this._msg, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        //Fix
        public checkStr($str: string): boolean {
            return true;
        }

    }
}