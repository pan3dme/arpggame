module welfare {

    export class PopVipPanel extends UIConatiner {

        private _publicbgRender1: UIRenderComponent;
        private _publicbgRender2: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            // this._publicbgRender1.dispose();
            // this._publicbgRender1 = null;
            // this._publicbgRender2.dispose();
            // this._publicbgRender2 = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicbgRender1 = new UIRenderComponent;
            this.addRender(this._publicbgRender1)
            this._publicbgRender2 = new UIRenderComponent;
            this.addRender(this._publicbgRender2)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas: UIAtlas, $publicbguiAtlas: UIAtlas): void {
            this._publicbgRender1.uiAtlas = $publicbguiAtlas;
            this._publicbgRender2.uiAtlas = $publicbguiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private but_qx: UICompenent
        private but_qr: UICompenent
        private initView(): void {

            // this.but_qr = this.addEvntButUp("but_1", this._publicbgRender2);
            // this.but_qr.x = 317
            // this.but_qr.y = 331
            // this.but_qx = this.addEvntButUp("but_1", this._publicbgRender2);
            // this.but_qx.x = 497
            // this.but_qx.y = 331

            // var qx = this.addChild(<UICompenent>this._publicbgRender2.getComponent("qx"));
            // qx.x = 533
            // qx.y = 344

            var renderLevel = this._baseRender;

            // this.addUIList(["a_38", "a_45", "a_40", "a_42", "a_44_1"], renderLevel);

        }



        public resize(): void {
            super.resize();
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }


        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.but_qr:
                    //购买vip
                    ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
                case this.but_qx:
                    this.hide();
                    break
                default:
                    break;
            }
        }
    }

}