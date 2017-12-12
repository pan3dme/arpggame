var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var warehousetreasure;
(function (warehousetreasure) {
    var TreasurehouseListRender = /** @class */ (function (_super) {
        __extends(TreasurehouseListRender, _super);
        function TreasurehouseListRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hasLight = false;
            return _this;
        }
        TreasurehouseListRender.prototype.setNewData = function ($data) {
            this._listItemData.data = $data;
            this.draw();
        };
        TreasurehouseListRender.prototype.draw = function () {
            var _this = this;
            var $num60 = 58;
            var $num56 = $num60 - 4;
            var $EquMeshVo = this._listItemData.data;
            var $ctx = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            UiDraw.cxtDrawImg($ctx, PuiData.NewPicBg, new Rectangle(0, 0, 62, 62), UIData.publicUi);
            this.atlas.updateCtx($ctx, this.uvData.ox, this.uvData.oy);
            if ($EquMeshVo) {
                IconManager.getInstance().getIcon(geteqiconIconUrl($EquMeshVo.entryData.icon), function ($img) {
                    var $ctx = UIManager.getInstance().getContext2D(_this.uvData.ow, _this.uvData.oh, false);
                    UiDraw.cxtDrawImg($ctx, PuiData.A_WUPINKUANG, new Rectangle(2, 2, $num60, $num60), UIData.publicUi);
                    UiDraw.cxtDrawImg($ctx, ItemGoodQuality.getQuaStr($EquMeshVo.entryData.quality), new Rectangle(2, 2, $num60, $num60), UIData.publicUi);
                    $ctx.drawImage($img, 0, 0, $num56, $num56, 2, 2, $num60, $num60);
                    _this.atlas.updateCtx($ctx, _this.uvData.ox, _this.uvData.oy);
                });
            }
        };
        Object.defineProperty(TreasurehouseListRender.prototype, "selected", {
            set: function (value) {
                if (this.hasLight != value) {
                    this.hasLight = value;
                    this.draw();
                }
            },
            enumerable: true,
            configurable: true
        });
        return TreasurehouseListRender;
    }(ListItemRender));
    warehousetreasure.TreasurehouseListRender = TreasurehouseListRender;
    var WarehouseList = /** @class */ (function () {
        function WarehouseList($perent) {
            this.perent = $perent;
            this._listRender = new UIListRenderComponent;
            this.addList();
        }
        WarehouseList.prototype.dispose = function () {
            this._listRender.dispose();
            this._listRender = null;
        };
        WarehouseList.prototype.addList = function () {
            var $pos = new Vector2D(548, 86);
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
        };
        WarehouseList.prototype.refreshData = function () {
            var _this = this;
            var $list = GuidData.faction.getFactionStorehouse();
            console.log("现在有这么多个", $list.length);
            var $listDataArr = new Array;
            for (var i = 0; i < $list.length; i++) {
                if ($list[i]) {
                    var $listItemData = new ListItemData();
                    $listItemData.data = $list[i];
                    $listItemData.clickFun = function ($listItemData) { _this.itemDataClick($listItemData); };
                    $listDataArr.push($listItemData);
                }
            }
            var $tb = faction.FactionBuildModel.getInstance().getTabvo(2);
            while ($listDataArr.length < Math.max($tb.params[0], 30)) {
                var $listItemData = new ListItemData();
                $listDataArr.push($listItemData);
            }
            this._bgList.contentY = 0;
            // this._bgList.setGridData($listDataArr, TreasurehouseListRender, 5, 60, 60, 1024, 1024, 300, 300);
            this._bgList.setGridData($listDataArr, TreasurehouseListRender, 5, 62, 62, 512, 512, 370, 380);
        };
        WarehouseList.prototype.itemDataClick = function ($listItemData) {
            var _listItemArr = this._bgList.data;
            for (var i = 0; _listItemArr && i < _listItemArr.length; i++) {
                if (_listItemArr[i] == $listItemData) {
                    _listItemArr[i].itemRender.selected = true;
                }
                else {
                    _listItemArr[i].itemRender.selected = false;
                }
            }
            if ($listItemData.data) {
                // var $evt: exchange.ExchangepEvent = new exchange.ExchangepEvent(exchange.ExchangepEvent.SHOW_EXCHANGE_PANEL)
                // $evt.data = $listItemData.data
                // $evt.showType = 0
                // ModuleEventManager.dispatchEvent($evt)
                var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                evt.data = $listItemData.data;
                evt.buttonType = 4;
                ModuleEventManager.dispatchEvent(evt);
            }
        };
        WarehouseList.prototype.show = function () {
            this.perent.addRender(this._listRender);
            this.refresh();
        };
        WarehouseList.prototype.refresh = function () {
            if (this._listRender.rendering) {
                this.refreshData();
            }
        };
        WarehouseList.prototype.hide = function () {
            this.perent.removeRender(this._listRender);
        };
        return WarehouseList;
    }());
    warehousetreasure.WarehouseList = WarehouseList;
})(warehousetreasure || (warehousetreasure = {}));
//# sourceMappingURL=WarehouseList.js.map