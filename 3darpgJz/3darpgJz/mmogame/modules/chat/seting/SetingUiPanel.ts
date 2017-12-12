module setingui {
    export class SetingUiPanel extends UIConatiner {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.width = 500;
            this.height = 350;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);


            this._topRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {
            GameData.getPublicUiAtlas(($uiAtlas: UIAtlas) => { this.makePanelUi($uiAtlas) });
        }
        private makePanelUi($uiAtlas: UIAtlas): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/seting/seting.xml", "ui/uidata/chat/seting/seting.png", () => { this.loadConfigCom() });
        }
        private setSizeForPanelUi($ui: UICompenent, $uiName: string): void {
            var temp: UICompenent = this._topRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;

        }
        private b_close: UICompenent;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = GameData.publicbgUiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;


            var guiBg0: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("guiBg0"));
            this.setSizeForPanelUi(guiBg0, "a_bg");
            this.b_close = this.addEvntBut("b_close", this._bottomRender)
            this.setSizeForPanelUi(this.b_close, "a_close");
            var titleBg: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("titleBg"));
            this.setSizeForPanelUi(titleBg, "a_tittle_bg");

            this._bottomRender.applyObjData();
            

            this.addChild(<UICompenent>this._midRender.getComponent("a_tittle_txt"));

            this.addChild(<UICompenent>this._midRender.getComponent("a_label2"));
            this.addChild(<UICompenent>this._midRender.getComponent("a_label1"));
            this.addChild(<UICompenent>this._midRender.getComponent("a_label4"));
            this.addChild(<UICompenent>this._midRender.getComponent("a_label3"));
            this.addChild(<UICompenent>this._midRender.getComponent("a_label0"));

            this.a_select_0 = this.addEvntBut("a_select_0", this._midRender);
            this.a_select_1 = this.addEvntBut("a_select_1", this._midRender);
            this.a_select_2 = this.addEvntBut("a_select_2", this._midRender);
            this.a_select_3 = this.addEvntBut("a_select_3", this._midRender);
            this.a_select_4 = this.addEvntBut("a_select_4", this._midRender);

            this.a_pinbi_but= this.addEvntBut("a_pinbi_but", this._midRender);
            

            this.uiAtlasComplet = true;
            this.applyLoadComplete();
    
        }
        private a_select_0: SelectButton;
        private a_select_1: SelectButton;
        private a_select_2: SelectButton;
        private a_select_3: SelectButton;
        private a_select_4: SelectButton;

        private a_pinbi_but: UICompenent;
        private getData(): ByteArray {

            var ba: ByteArray = new ByteArray;
            ba.endian = Endian.LITTLE_ENDIAN;
            ba.writeUint8(this.a_select_0.selected ? 0 : 1)
            ba.writeUint8(this.a_select_1.selected ? 0 : 1)
            ba.writeUint8(this.a_select_2.selected ? 0 : 1)
            ba.writeUint8(this.a_select_3.selected ? 0 : 1)
            ba.writeUint8(this.a_select_4.selected ? 0 : 1)
            ba.writeUint8(0)
            ba.writeUint8(0)
            ba.writeUint8(0)

            return ba

        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.b_close:
                    this.close();
                    break
                case this.a_select_0:
                case this.a_select_1:
                case this.a_select_2:
                case this.a_select_3:
                case this.a_select_4:
                    var ba: ByteArray = this.getData();
                    ba.position = 0;
                    var aa: number = ba.readUint32();
                    var bb: number = ba.readUint32();
                    console.log(aa, bb);
                    NetManager.getInstance().protocolos.msg_decline(aa, bb);
                    break
                case this.a_pinbi_but:
                    this.close();
                    ModuleEventManager.dispatchEvent(new shieldui.ShieldUiEvent(shieldui.ShieldUiEvent.SHOW_SHIELD_UI_PANEL));

                    break
                default:
                    break;
            }

        }
        private close(): void
        {
            ModuleEventManager.dispatchEvent(new SetingUiEvent(SetingUiEvent.HIDE_SETING_UI_PANEL));
        }
        private uiAtlasComplet:boolean=false
        public refresh(): void {
            if (this.uiAtlasComplet) {
      
                var $arr: Array<number> = GuidData.player.getPlayerFieldDeclineChanel();
                console.log($arr)
                this.a_select_0.selected = $arr[0] == 0;
                this.a_select_1.selected = $arr[1] == 0;
                this.a_select_2.selected = $arr[2] == 0;
                this.a_select_3.selected = $arr[3] == 0;
                this.a_select_4.selected = $arr[4] == 0;
            }
        }

    }

}