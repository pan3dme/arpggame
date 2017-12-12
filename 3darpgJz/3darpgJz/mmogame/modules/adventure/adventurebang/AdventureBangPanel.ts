module adventurebang {

    export class AdventureBangPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.bottom = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/offlinereward/offlinereward.xml", "ui/uidata/adventure/offlinereward/offlinereward.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(this._bottomRender.getComponent("a_bg"));

            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }
        protected butClik(evt: InteractiveEvent): void {

            this.close();
        }
        private close(): void
        {
    
        }

        public refresh(): void {


        }


    }
}