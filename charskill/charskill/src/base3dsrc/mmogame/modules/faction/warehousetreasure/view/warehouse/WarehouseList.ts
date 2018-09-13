module warehousetreasure {



    export class TreasurehouseListRender extends charbg.BagItemRender {


        protected equClick(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();

                var itemevt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                itemevt.data = this.itdata.data;
                itemevt.buttonType = 4;
                ModuleEventManager.dispatchEvent(itemevt);
            }
        }

    }

    export class WarehouseList {

        //private _listRender: UIListRenderComponent;
        private perent: UIConatiner;
        private uiAtlas: UIAtlas;
        public constructor($perent: UIConatiner, $uiatl: UIAtlas) {

            this.perent = $perent;
            this.uiAtlas = $uiatl;
            //this._listRender = new UIListRenderComponent;
            this.addList();
        }

        public dispose() {
            //this._listRender.dispose();
            //this._listRender = null;
            this._bgList.dispose();
        }

        //private _bgMask: UIMask;
        private _bgList: SList;
        private addList(): void {
            //var $pos: Vector2D = new Vector2D(548, 86);
            this._bgList = new SList()//this._listRender.createGridList();
            this._bgList.baseAtlas = this.uiAtlas;
            this._bgList.setData([], TreasurehouseListRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
            //this._bgList.x = $pos.x;
            //this._bgList.y = $pos.y;
            this._bgList.center = 205;
            this._bgList.middle = 0;
            //this.perent.addChild(this._bgList);
            UIManager.getInstance().addUIContainer(this._bgList);

            // this._bgMask = new UIMask();
            // this._bgMask.x = $pos.x;
            // this._bgMask.y = $pos.y - 5;
            // this._bgMask.width = 315;
            // this._bgMask.height = 380;
            // this.perent.addMask(this._bgMask);
            //this._listRender.mask = this._bgMask;
        }

        private refreshData(): void {
            var $list: Array<BagItemData> = GuidData.faction.getFactionStorehouse();
            //console.log("现在有这么多个", $list.length)
            var $listDataArr: Array<ListItemData> = new Array;
            for (var i: number = 0; i < $list.length; i++) {

                if ($list[i]) {
                    var $listItemData: ListItemData = new ListItemData();
                    $listItemData.data = $list[i];
                    //$listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                    $listDataArr.push($listItemData);
                }

            }
            // var $tb: tb.TB_faction_building = faction.FactionBuildModel.getInstance().getTabvo(2)
            // while ($listDataArr.length < Math.max($tb.params[0],30)) {
            //     var $listItemData: ListItemData = new ListItemData();
            //     $listDataArr.push($listItemData);
            // }

            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $list.length; i++) {
                var listItemData: SListItemData = new SListItemData();
                listItemData.data = $list[i];
                ary.push(listItemData);
            }
            this._bgList.refreshData(ary);

            //this._bgList.contentY = 0;
            //this._bgList.setGridData($listDataArr, TreasurehouseListRender, 5, 62, 62, 512, 512, 370, 380);
        }
        // private itemDataClick($listItemData: ListItemData): void {
        //     var _listItemArr: Array<ListItemData> //= this._bgList.data
        //     for (var i: number = 0; _listItemArr && i < _listItemArr.length; i++) {
        //         if (_listItemArr[i] == $listItemData) {
        //             _listItemArr[i].itemRender.selected = true;
        //         } else {
        //             _listItemArr[i].itemRender.selected = false
        //         }
        //     }
        //     if ($listItemData.data) {
        //         var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        //         evt.data = $listItemData.data;
        //         evt.buttonType = 4;
        //         ModuleEventManager.dispatchEvent(evt);
        //     }
        // }

        public show(): void {
            //this.perent.addRender(this._listRender);
            UIManager.getInstance().addUIContainer(this._bgList);
            this.refresh()
        }
        public refresh(): void {
            // if (this._listRender.rendering) {
            //     this.refreshData()
            // }
            this.refreshData();
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this._bgList);
            // this.perent.removeRender(this._listRender);
        }
    }

}