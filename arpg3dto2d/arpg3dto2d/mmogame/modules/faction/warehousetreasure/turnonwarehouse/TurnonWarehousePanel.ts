module turnonwarehouse {
    export class TurnonWarehouseListRender extends charbg.BagItemRender {

        protected equClick(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();

                var itemevt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                itemevt.data = this.itdata.data;
                itemevt.buttonType = 5;
                ModuleEventManager.dispatchEvent(itemevt);
            }
        }


    }
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
            if (this._bgList) {
                this._bgList.dispose();
                this._bgList = null;
            }
            super.dispose();
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/warehousetreasure.xml", "ui/uidata/faction/warehousetreasure/warehousetreasure.png", () => { this.loadConfigCom() }, "ui/uidata/faction/warehousetreasure/warehouseuse.png");
        }

        private loadConfigCom(): void {

            this.addChild(this._midRender.getComponent("f_tittle_txt"));
            //this.treasurehouseUpList = new TurnonWarehouseList(this,this._midRender.uiAtlas)
            this.uiAtlasComplet = true;
            this.addList();
            this.applyLoadComplete();

        }

        private _bgList: SList;
        private addList(): void {
            // var $pos: Vector2D = new Vector2D(130, 120);
            // var $pos: Vector2D = new Vector2D(298, 105);
            // this._bgList = this._listRender.createGridList();
            // this._bgList.x = $pos.x;
            // this._bgList.y = $pos.y;
            // this.perent.addChild(this._bgList);

            this._bgList = new SList()//this._listRender.createGridList();
            this._bgList.baseAtlas = this._midRender.uiAtlas;
            this._bgList.setData([], TurnonWarehouseListRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
            this._bgList.center = 0;
            this._bgList.middle = 0;
            this._bgList.setShowLevel(4);
            this.refreshData();
            //UIManager.getInstance().addUIContainer(this._bgList);


            // this._bgMask = new UIMask();
            // this._bgMask.x = $pos.x;
            // this._bgMask.y = $pos.y;
            // this._bgMask.width = 75 * 5;
            // this._bgMask.height = 75 * 5;
            // this.perent.addMask(this._bgMask);
            // this._bgMask.level = 3
            // this._listRender.mask = this._bgMask;




        }
        private refreshData(): void {

            var $handInQuality: number = tb.TB_faction_privilege.get_TB_faction_privilege(1).handInQuality
            var $bgData: Array<BagItemData> = GuidData.bag.getEquBgData();

            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $bgData.length; i++) {
                var $listItemData: SListItemData = new SListItemData();
                if ($bgData[i] && $bgData[i].entryData && $bgData[i].entryData.quality >= $handInQuality) {
                    $listItemData.data = $bgData[i];
                    //$listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                    ary.push($listItemData);
                }

            }
            // while (ary.length < 30) {
            //     var $listItemData: ListItemData = new ListItemData();
            //     $listItemData.data = null
            //     $listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
            //     ary.push($listItemData);
            // }
            //this._bgList.contentY = 0;
            // this._bgList.setGridData(ary, TreasurehouseUpListRender, 5, 60, 60, 1024, 1024, 300, 300);
            //this._bgList.setGridData(ary, TurnonWarehouseListRender, 5, 75, 75, 512, 512, 75 * 5, 75 * 5);
            this._bgList.refreshData(ary);
        }

        public resize(): void {
            super.resize();
        }

        //private treasurehouseUpList: TurnonWarehouseList;

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.c_close:

                    this.hide()
                    break;

            }
        }

        public show(): void {
            if (!this.hasStage) {
                //this.treasurehouseUpList.show()
                UIManager.getInstance().addUIContainer(this);
                UIManager.getInstance().addUIContainer(this._bgList);
                this.refreshData();
            }
        }
        public refresh(): void {
            if (this.hasStage) {
                //this.treasurehouseUpList.show()
                this.refreshData();
            }
        }
        public hide(): void {
            if (this.hasStage) {
                //this.treasurehouseUpList.hide()
                UIManager.getInstance().removeUIContainer(this);
                UIManager.getInstance().removeUIContainer(this._bgList);
            }
        }



    }
}