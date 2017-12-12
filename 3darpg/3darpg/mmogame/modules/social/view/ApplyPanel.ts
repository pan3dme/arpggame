module social {

    export class ApplyPanel extends WindowMinUi {

        private _AbgRender: UIRenderComponent;
        private _AbottomRender: UIRenderComponent;
        private _AbaseRender: UIRenderComponent;
        private _AtopRender: UIRenderComponent;

        public dispose(): void {
            this._AbgRender.dispose();
            this._AbgRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
            this._AtopRender.dispose();
            this._AtopRender = null;

            if (this.applyList) {
                this.applyList.dispose();
                this.applyList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            this.setBlackBg();

            //添加好友面板渲染器
            this._AbgRender = new UIRenderComponent;
            this.addRender(this._AbgRender)
            this._AbottomRender = new UIRenderComponent;
            this.addRender(this._AbottomRender)
            this._AbaseRender = new UIRenderComponent;
            this.addRender(this._AbaseRender)
            this._AtopRender = new UIRenderComponent;
            this.addRender(this._AtopRender)

            this._AbgRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {
            this._AbottomRender.uiAtlas = WindowUi.winUIAtlas
            this._AbgRender.uiAtlas.setInfo("ui/uidata/social/socialmodel.xml", "ui/uidata/social/socialmodel.png", () => { this.loadConfigCom() }, "ui/uidata/social/socialpc.png");
        }

        public applyList: ApplyList;

        private a_btn3: UICompenent;
        private listIndex1: UICompenent;
        private loadConfigCom(): void {
            this._AbaseRender.uiAtlas = this._AbgRender.uiAtlas;
            this._AtopRender.uiAtlas = this._AbgRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._AtopRender;

            this.a_btn3 = this.addEvntButUp("cnew_btn1", this._AbottomRender);
            this.setSizeForPanelUiCopy(this.a_btn3, "a_btn3", renderLevel);
            this._AbottomRender.applyObjData();
            this.listIndex1 = this.addChild(renderLevel.getComponent("listIndex1"));
            this.addUIList(["aF_txt3", "aF_txt2", "aF_txt1", "line1111", "line11111", "aY_cleartxt", "aY_txt", "line22", "line3_1"], renderLevel);
            this.applyLoadComplete();
            this.resize();
        }

        public resize(): void {
            super.resize();
            if (this.applyList) {
                this.applyList.left = this.listIndex1.parent.x / UIData.Scale + this.listIndex1.x
                this.applyList.top = this.listIndex1.parent.y / UIData.Scale + this.listIndex1.y
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.applyList) {
                this.applyList = new ApplyList();
                this.applyList.init(this._AtopRender.uiAtlas);
            }
            this.applyList.show();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.applyList) {
                this.applyList.hide();
            }
        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break
                case this.a_btn3:

                    var $ary: Array<SocialItemData> = GuidData.social.getApplyList();
                    if ($ary.length > 0) {
                        // console.log("一键清空");
                        NetManager.getInstance().protocolos.social_clear_apply();
                    }

                    break
                default:
                    break;
            }
        }
    }
}