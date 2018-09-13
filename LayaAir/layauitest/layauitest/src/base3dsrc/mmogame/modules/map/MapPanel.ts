module map {
    export class MapPanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _pointRender: UIRenderComponent;
        private _lineRender: UIRenderComponent
        private _listRender: UIListRenderComponent
        public mapWalkLineComponent: MapWalkLineComponent

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._pointRender.dispose();
            this._pointRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._lineRender.dispose();
            this._lineRender = null;
            this._listRender.dispose();
            this._listRender = null;
            this.mapWalkLineComponent.dispose();
            this.mapWalkLineComponent = null;
        }
        
        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;



            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);




            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);


            this.mapWalkLineComponent = new MapWalkLineComponent;
            this.addRender(this.mapWalkLineComponent)

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);



            this._pointRender = new UIRenderComponent();
            this.addRender(this._pointRender);
            this._lineRender = new UIRenderComponent();
           // this.addRender(this._lineRender);
            this._listRender = new UIListRenderComponent;
            this.addRender(this._listRender);
            this._midRender.uiAtlas = new UIAtlas;

        }
        public applyLoad(): void {

            var img: any = new Image();
            img.onload = () => {
                MapModel.worldMapImg = img;
                this._midRender.uiAtlas.setInfo("ui/uidata/map/map.xml", "ui/uidata/map/map.png", () => { this.loadConfigCom() }, "ui/uidata/map/mapuse.png");
            }
            img.src = Scene_data.fileRoot + "ui/load/map/worldmap.jpg"


        }
    
        private mapLeftPanel: MapLeftPanel;
        public mapCetentPanel: MapCetentPanel;
        private mapRightPanel: MapRightPanel;
        private mapLinePanel: MapLinePanel;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._pointRender.uiAtlas = this._midRender.uiAtlas;
            this._lineRender.uiAtlas = this._midRender.uiAtlas;

       
        
            this.mapLeftPanel = new MapLeftPanel();
            this.mapLeftPanel.setRender(this._bottomRender, this._midRender);
            this.addVirtualContainer(this.mapLeftPanel);


            this.mapCetentPanel = new MapCetentPanel();
            this.mapCetentPanel.setRender(this._bottomRender, this._midRender,this._topRender, this._pointRender);
            this.addVirtualContainer(this.mapCetentPanel);

            this.mapRightPanel = new MapRightPanel();
            this.mapRightPanel.setRender(this._bottomRender, this._midRender, this._listRender);
            this.addVirtualContainer(this.mapRightPanel);



            this.mapLinePanel = new MapLinePanel();
            this.mapLinePanel.setRender(this._topRender, this._lineRender);
            this.addVirtualContainer(this.mapLinePanel);

  



            this.upFun = () => { this.upData() }
            this.uiAtlasComplet = true
            this.applyLoadComplete();
 
        }
        private uiAtlasComplet:boolean=false

        private upFun: Function;
        private upData(): void {
            this.mapCetentPanel.upData();
        }
        public addTime(): void {
            TimeUtil.addTimeTick(10, this.upFun)
        }
        public removeTime(): void {
            TimeUtil.removeTimeTick(this.upFun)
        }

      
 
        public setTabType(value: number): void
        {
            MapModel.tabType = value;
            MapModel.getInstance().refresh()
            this.mapLeftPanel.setTabType(value)
            this.mapCetentPanel.setTabType(value)
            this.mapRightPanel.setTabType(value)

            this.renderSetVisibel([this.mapWalkLineComponent], value == 0);
            this.renderSetVisibel([this._pointRender,this._listRender], value == 0);
        }
        public resize(): void {
            super.resize();
        }
        public refresh(): void {
            if (this.uiAtlasComplet) {
                this.mapWalkLineComponent.makeLineUiItem(null)
                NetManager.getInstance().protocolos.show_map_line()
                this.setTabType(MapModel.tabType)
            }
        }
        public refreshLine(): void
        {
            this.mapRightPanel.refreshLine();
        }

        
        public showLinePanel(): void
        {
            if (this._lineRender.rendering) {
                this.removeRender(this._lineRender);
            } else {
                this.addRender(this._lineRender);
                this.mapLinePanel.showLinePanel()
            }
   
        }
        public close(): void {
            this.removeTime();
            UIManager.getInstance().removeUIContainer(this);

            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

        }


    }




}