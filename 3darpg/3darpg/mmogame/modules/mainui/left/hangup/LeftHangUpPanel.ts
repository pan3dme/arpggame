module leftui {

    export class LeftHangUpPanel extends UIPanel {
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;
        private _topRender1: UIRenderComponent;

        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.left = 40;

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._topRender1 = new UIRenderComponent;
            this.addRender(this._topRender1)

            this._topRender.uiAtlas = new UIAtlas();
            this._tickFun = () => { this.upTimeFrame() };
        }
        private upTimeFrame(): void {
            if (this.hasStage) {
                // this.refresh();
                this.leftHangUpBaseVo.upTimeFrame();
            } else {
                console.log("移处挂机监听---------------");
                TimeUtil.removeTimeTick(this._tickFun);
            }
        }
        private _tickFun: Function;
        private bFun: Function;
        private mask_mc: UICompenent
        public loadAtlas($bfun: Function): void {
            this.bFun = $bfun
            this._topRender.uiAtlas.setInfo("ui/uidata/mainui/left/lefthangup/lefthangup.xml", "ui/uidata/mainui/left/lefthangup/lefthangup.png", () => { this.loadConfigCom() });
        }
        private leftHangUpBaseVo: LeftHangUpBaseVo
        private leftHangUpBossVo: LeftHangUpBossVo
        private loadConfigCom(): void {

            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this._topRender1.uiAtlas = this._topRender.uiAtlas;
            this.leftHangUpBaseVo = new LeftHangUpBaseVo(this, this._midRender, this._topRender,this._topRender1);
            this.leftHangUpBossVo = new LeftHangUpBossVo(this, this._midRender, this._topRender);

            if (this.bFun) {
                this.bFun();
            }
        }
        protected butClik(evt: InteractiveEvent): void {
      
        }
        public refresh(): void
        {
            this.leftHangUpBaseVo.refresh();
            this.leftHangUpBossVo.refresh();
        }
        private isBossPanel:boolean=false
        public show(): void {
            UIManager.getInstance().addUIContainer(this);

            TimeUtil.removeTimeTick(this._tickFun);
            TimeUtil.addTimeTick(1000, this._tickFun);

            this.isBossPanel = GuidData.map.isAdventureBossScene();
            if (this.isBossPanel) {
                this.leftHangUpBaseVo.hide();
                this.leftHangUpBossVo.show();
            } else {
                this.leftHangUpBaseVo.show();
                this.leftHangUpBossVo.hide();
            }

        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}