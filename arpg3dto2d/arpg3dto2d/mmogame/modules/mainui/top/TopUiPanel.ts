module topui {

    export class TopUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _centerRender:UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _cdRender: CdRenderComponent
        private _redPointRender:RedPointRender;
        private _effRender:FrameUIRender

        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;


            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);
            
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._centerRender = new UIRenderComponent;
            this.addRender(this._centerRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._redPointRender = new RedPointRender();
            this.addRender(this._redPointRender);


            this._cdRender = new CdRenderComponent();
            this.addRender(this._cdRender);

            

            this._effRender = new FrameUIRender;
            this.addRender(this._effRender);

            this._midRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/top/top.xml", "ui/uidata/mainui/top/top.png", () => { this.loadConfigCom() });
        }
        public topPandaPanel: TopPandaPanel;
        public topHeadPanel: TopHeadPanel;
        public topTargetHeadPanel: TopTargetHeadPanel;
      //  public topUiBuffPanel: TopUiBuffPanel
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._cdRender.uiAtlas = this._midRender.uiAtlas;
            this._centerRender.uiAtlas = this._midRender.uiAtlas;

  
            this.topPandaPanel = new TopPandaPanel();
            this.topPandaPanel.setRender(this._bottomRender, this._midRender, this._topRender,this._redPointRender);
            this.addVirtualContainer(this.topPandaPanel);

            this.topHeadPanel = new TopHeadPanel();
            this.topHeadPanel.setRender(this._bottomRender, this._midRender, this._topRender,this._effRender,this._redPointRender);
            this.addVirtualContainer(this.topHeadPanel);

            this.topTargetHeadPanel = new TopTargetHeadPanel();
            this.topTargetHeadPanel.setRender(this._bottomRender, this._midRender, this._topRender,this._centerRender);
            this.addVirtualContainer(this.topTargetHeadPanel);

            //this.topUiBuffPanel = new TopUiBuffPanel();
            //this.topUiBuffPanel.setRender(this._topRender,this._cdRender);
            //this.addVirtualContainer(this.topUiBuffPanel);

            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }
        public refresh(): void {
            if (this.uiAtlasComplet) {
                this.topPandaPanel.refresh();
                this.topHeadPanel.refresh();
                //this.topUiBuffPanel.refresh();
            }
        }
       

    }
}