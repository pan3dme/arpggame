module homeui {

    export class HomeUiPanel extends UIPanel {
        //private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent
        //private _topRender: UIRenderComponent;
        private _redPointRender:RedPointRender;


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;


           // this._bottomRender = new UIRenderComponent;
           // this.addRender(this._bottomRender);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);



            //this._topRender = new UIRenderComponent;
           // this.addRender(this._topRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);


            this._baseRender.uiAtlas = new UIAtlas;
     
        }
 
        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/mainui/home/home.xml", "ui/uidata/mainui/home/home.png", () => { this.loadConfigCom() });
        }
        public homeSysPanel: HomeSysPanel;
        private loadConfigCom(): void {

            //this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            //this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.homeSysPanel = new HomeSysPanel();
            this.homeSysPanel.setRender(this._baseRender,this._redPointRender);
            this.addVirtualContainer(this.homeSysPanel);


            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }

    }
}