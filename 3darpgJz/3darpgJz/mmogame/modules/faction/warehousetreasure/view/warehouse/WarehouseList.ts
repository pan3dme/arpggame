module warehousetreasure {
 


    export class TreasurehouseListRender extends ListItemRender {

        public setNewData($data: any): void {
            this._listItemData.data = $data;
            this.draw();

        }
        public draw(): void {
            var $num60: number = 58
            var $num56: number = $num60 - 4
            var $EquMeshVo: BagItemData = <BagItemData>this._listItemData.data;

            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            UiDraw.cxtDrawImg($ctx, PuiData.NewPicBg, new Rectangle(0, 0, 62, 62), UIData.publicUi);
            this.atlas.updateCtx($ctx, this.uvData.ox, this.uvData.oy);
            if ($EquMeshVo) {
    
                IconManager.getInstance().getIcon(geteqiconIconUrl($EquMeshVo.entryData.icon),
                    ($img: any) => {
                        var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
                        UiDraw.cxtDrawImg($ctx, PuiData.A_WUPINKUANG, new Rectangle(2, 2, $num60, $num60), UIData.publicUi);
                        UiDraw.cxtDrawImg($ctx, ItemGoodQuality.getQuaStr($EquMeshVo.entryData.quality), new Rectangle(2, 2, $num60, $num60), UIData.publicUi);
                        $ctx.drawImage($img, 0, 0, $num56, $num56, 2, 2, $num60, $num60);
                        this.atlas.updateCtx($ctx, this.uvData.ox, this.uvData.oy);
                    });
            }
        }
        protected hasLight: boolean = false;
        public set selected(value: boolean) {
            if (this.hasLight != value) {
                this.hasLight = value;
                this.draw();
            }
        }


    }

    export class WarehouseList {

        private _listRender: UIListRenderComponent;
        private perent: UIConatiner
        public constructor($perent: UIConatiner) {

            this.perent = $perent;
            this._listRender = new UIListRenderComponent;
            this.addList();
        }

        public dispose(){
            this._listRender.dispose();
            this._listRender = null;
        }

        private _bgMask: UIMask;
        private _bgList: GridList;
        private addList(): void {
            var $pos: Vector2D = new Vector2D(548, 86);
            this._bgList = this._listRender.createGridList();
            this._bgList.x = $pos.x;
            this._bgList.y = $pos.y;
            this.perent.addChild(this._bgList);

            this._bgMask = new UIMask();
            this._bgMask.x = $pos.x;
            this._bgMask.y = $pos.y - 5;
            this._bgMask.width = 315;
            this._bgMask.height = 380;
            this.perent.addMask(this._bgMask);
            this._listRender.mask = this._bgMask;
        }

        private refreshData(): void {
            var $list: Array<BagItemData> = GuidData.faction.getFactionStorehouse();
            console.log("现在有这么多个", $list.length)
            var $listDataArr: Array<ListItemData> = new Array;
            for (var i: number = 0; i < $list.length; i++) {

                if ($list[i]) {
                    var $listItemData: ListItemData = new ListItemData();
                    $listItemData.data = $list[i];
                    $listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                    $listDataArr.push($listItemData);
                }

            }
            var $tb: tb.TB_faction_building = faction.FactionBuildModel.getInstance().getTabvo(2)
            while ($listDataArr.length < Math.max($tb.params[0],30)) {
                var $listItemData: ListItemData = new ListItemData();
                $listDataArr.push($listItemData);
            }
            this._bgList.contentY = 0;
            // this._bgList.setGridData($listDataArr, TreasurehouseListRender, 5, 60, 60, 1024, 1024, 300, 300);
            this._bgList.setGridData($listDataArr, TreasurehouseListRender, 5, 62, 62, 512, 512, 370, 380);
        }
        private itemDataClick($listItemData: ListItemData): void {
            var _listItemArr: Array<ListItemData> = this._bgList.data
            for (var i: number = 0; _listItemArr && i < _listItemArr.length; i++) {
                if (_listItemArr[i] == $listItemData) {
                    _listItemArr[i].itemRender.selected = true;
                } else {
                    _listItemArr[i].itemRender.selected = false
                }
            }
            if ($listItemData.data) {
                // var $evt: exchange.ExchangepEvent = new exchange.ExchangepEvent(exchange.ExchangepEvent.SHOW_EXCHANGE_PANEL)
                // $evt.data = $listItemData.data
                // $evt.showType = 0
                // ModuleEventManager.dispatchEvent($evt)
                
                var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                evt.data = $listItemData.data;
                evt.buttonType = 4;
                ModuleEventManager.dispatchEvent(evt);
            }
        }

        public show(): void {
            this.perent.addRender(this._listRender);
            this.refresh()
        }
        public refresh(): void {
            if (this._listRender.rendering) {
                this.refreshData()
            }
        }
        public hide(): void {
            this.perent.removeRender(this._listRender);


        }
    }

}