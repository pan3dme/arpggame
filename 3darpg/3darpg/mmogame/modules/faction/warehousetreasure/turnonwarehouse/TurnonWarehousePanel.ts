module turnonwarehouse {

    export class TurnonWarehousePanel extends WindowCentenMin {

        private _midRender: UIRenderComponent


        private uiAtlasComplet: boolean = false

        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);


            this._midRender.uiAtlas = new UIAtlas;

        }

        public dispose() {
            this._midRender.dispose();
            this._midRender = null;
            if(this.treasurehouseUpList){
                this.treasurehouseUpList.dispose();
                this.treasurehouseUpList = null;
            }
            super.dispose();
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/warehousetreasure.xml", "ui/uidata/faction/warehousetreasure/warehousetreasure.png", () => { this.loadConfigCom() }, "ui/uidata/faction/warehousetreasure/warehouseuse.png");
        }

        private loadConfigCom(): void {

            this.addChild(this._midRender.getComponent("f_tittle_txt"));
            this.treasurehouseUpList = new TurnonWarehouseList(this)
            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }
        public resize(): void {
            super.resize();
        }

        private treasurehouseUpList: TurnonWarehouseList;

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.c_close:

                    this.hide()
                    break;

            }
        }

        public show(): void {
            if (!this.hasStage) {
                this.treasurehouseUpList.show()
                UIManager.getInstance().addUIContainer(this);
            }
        }
        public refresh(): void {
            if (this.hasStage) {
                this.treasurehouseUpList.show()
            }
        }
        public hide(): void {
            if (this.hasStage) {
                this.treasurehouseUpList.hide()
                UIManager.getInstance().removeUIContainer(this);
            }
        }



    }
}