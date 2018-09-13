module turnonwarehouse {

    

    export class TurnonWarehouseList {

        //private _listRender: UIListRenderComponent;
        private perent: UIConatiner;
        private uiAtlas:UIAtlas
        public constructor($perent: UIConatiner,$uiAtlas:UIAtlas) {

            this.perent = $perent;
            this.uiAtlas = $uiAtlas;
            //this._listRender = new UIListRenderComponent;
            this.addList();
        }

        public dispose(){
            // this._listRender.dispose();
            // this._listRender  = null;
            if(this._bgList){
                this._bgList.dispose();
                this._bgList = null;
            }
        }

        //private _bgMask: UIMask;
        private _bgList: SList;
        private addList(): void {
            // var $pos: Vector2D = new Vector2D(130, 120);
             // var $pos: Vector2D = new Vector2D(298, 105);
             // this._bgList = this._listRender.createGridList();
             // this._bgList.x = $pos.x;
             // this._bgList.y = $pos.y;
             // this.perent.addChild(this._bgList);
 
             this._bgList = new SList()//this._listRender.createGridList();
             this._bgList.baseAtlas = this.uiAtlas;
             this._bgList.setData([], TurnonWarehouseListRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
             this._bgList.center = 0;
             this._bgList.middle = 0;
             UIManager.getInstance().addUIContainer(this._bgList);
 
 
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

        // public itemDataClick($listItemData: ListItemData): void {
        //     var _listItemArr: Array<ListItemData> ;//= this._bgList.data
        //     for (var i: number = 0; _listItemArr && i < _listItemArr.length; i++) {
        //         if (_listItemArr[i] == $listItemData) {
        //             _listItemArr[i].itemRender.selected = true;
        //         } else {
        //             _listItemArr[i].itemRender.selected = false
        //         }
        //     }
        //     if ($listItemData.data) {
        //         // var $evt: exchange.ExchangepEvent = new exchange.ExchangepEvent(exchange.ExchangepEvent.SHOW_EXCHANGE_PANEL)
        //         // $evt.showType=1
        //         // $evt.data = $listItemData.data
        //         // ModuleEventManager.dispatchEvent($evt)
        //         var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        //         evt.data = $listItemData.data;
        //         evt.buttonType = 5;
        //         ModuleEventManager.dispatchEvent(evt);

        //     }
        // }
        // private selectDic: Object = new Object


        public show(): void {
            //this.perent.addRender(this._listRender);
            UIManager.getInstance().addUIContainer(this._bgList);
            this.refreshData()
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this._bgList);
            //this.perent.removeRender(this._listRender);
        }
    }

}