module warehousetreasure {


    export class WarehouseTreasurePanel extends WindowUi {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);


            this._midRender.uiAtlas = new UIAtlas;

        }

        public dispose(){
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;

            
            if(this.warehousePanel){
                this.warehousePanel.dispose();
                this.warehousePanel = null;
            }
            if(this.treasurePanel){
                this.treasurePanel.dispose();
                this.treasurePanel = null;
            }
            if(this.warehouseTreasureLogList){
                this.warehouseTreasureLogList.dispose();
                this.warehouseTreasureLogList = null;
            }
            super.dispose();
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/warehousetreasure.xml", "ui/uidata/faction/warehousetreasure/warehousetreasure.png", () => { this.loadConfigCom() });
        }
        public treasurePanel: TreasurePanel;

        private c_tab_0: SelectButton;
        private c_tab_1: SelectButton;

        public warehousePanel: WarehousePanel;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "c_tab_bg", this._topRender);

            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._topRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._topRender);
            this.winmidRender.applyObjData();
            

            this.treasurePanel = new TreasurePanel();
            this.treasurePanel.initUiAtlas(this._topRender.uiAtlas);

            this.warehousePanel = new WarehousePanel();
            this.warehousePanel.initView(this._topRender.uiAtlas);

            this.addChild(this._midRender.getComponent("c_win_tittle"));

            
            this.c_log_tittle_line=    this.addChild(this._midRender.getComponent("c_log_tittle_line"));
            

            this.addChild(this._bottomRender.getComponent("a_titlebg"));
            this.c_log_tittle_name=  this.addChild(this._midRender.getComponent("c_log_tittle_name"));

            this.c_tab_0 = this.addEvntBut("c_tab_0", this._midRender);
            this.c_tab_1 = this.addEvntBut("c_tab_1", this._midRender);
            


            var a_bjzs_line_1: UICompenent = this.addChild(this._topRender.getComponent("a_bjzs_line_1"));
            // var a_bjzs_line_2: UICompenent = this.addChild(this._topRender.getComponent("c_bjzs_line_2"));
            // a_bjzs_line_2.isU = true;


            this.warehouseTreasureLogList = new logall.WarehouseTreasureLogList();
            this.warehouseTreasureLogList.init(this._topRender.uiAtlas);
   

            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }
        private c_log_tittle_line:UICompenent

        private c_log_tittle_name:UICompenent
        private warehouseTreasureLogList: logall. WarehouseTreasureLogList;

        public refreshWareBagList(): void {
            if (this.uiAtlasComplet) {
                this.warehousePanel.refreshWareBagList()
            }
        }

        public refreshLog(): void
        {
            if (this.uiAtlasComplet) {
                var $sListItemData: Array<SListItemData> 
                if (this.showType == 0) {
                    //宝库
                    $sListItemData = this.treasurePanel.getListItem();
                } else {
                    //仓库
                    $sListItemData = this.warehousePanel.getListItem();
                 }
                this.warehouseTreasureLogList.refreshData($sListItemData);
                var $tittleName: string = ColorType.Orange853d07  + (this.showType == 1 ? "仓库记录" : "捐献记录");
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_log_tittle_name.skinName, $tittleName, 16, TextAlign.CENTER);

            }
     
        }
        public resize(): void {
            super.resize();

            this.warehouseTreasureLogList.left = this.c_log_tittle_line.parent.x / UIData.Scale + this.c_log_tittle_line.x-5;
            this.warehouseTreasureLogList.top = this.c_log_tittle_line.parent.y / UIData.Scale + this.c_log_tittle_line.y+15 ;

        }
        private showType: number = 0;
        public refresh(): void
        {
            this.warehouseTreasureLogList.show()
            if (this.showType == 0) {  //宝库
                this.c_tab_0.selected = true;
                this.c_tab_1.selected = false;
                this.treasurePanel.show();
                this.warehousePanel.hide();
            } else {//仓库
                this.c_tab_0.selected = false;
                this.c_tab_1.selected = true;
                this.treasurePanel.hide();
                this.warehousePanel.show();
            }
            this.refreshLog();
        }
        


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_tab_0:
                    ModuleEventManager.dispatchEvent(new turnonwarehouse.TurnonWarehouseEvent(turnonwarehouse.TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL))
         
                    this.showType = 0;
                    this.refresh();
                    break;
                case this.c_tab_1:
                    this.showType = 1;
                    this.refresh();
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new WarehouseEvent(WarehouseEvent.HIDE_WAREHOUSE_PANEL))
                    break;
                default:
                    break
            }

         //  
        }
        public hide(): void
        {
            
            this.treasurePanel.hide();
            this.warehousePanel.hide();
            this.warehouseTreasureLogList.hide()
            UIManager.getInstance().removeUIContainer(this);
            super.hide()

        }

    }
}