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
var turnonwarehouse;
(function (turnonwarehouse) {
    var TurnonWarehouseListRender = /** @class */ (function (_super) {
        __extends(TurnonWarehouseListRender, _super);
        function TurnonWarehouseListRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hasLight = false;
            return _this;
        }
        TurnonWarehouseListRender.prototype.setNewData = function ($data) {
            this._listItemData.data = $data;
            this.draw();
        };
        TurnonWarehouseListRender.prototype.draw = function () {
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
                    $ctx.drawImage($img, 0, 0, $num56, $num56, 2, 2, $num60, $num60);
                    UiDraw.cxtDrawImg($ctx, ItemGoodQuality.getQuaStr($EquMeshVo.entryData.quality), new Rectangle(2, 2, $num60, $num60), UIData.publicUi);
                    _this.atlas.updateCtx($ctx, _this.uvData.ox, _this.uvData.oy);
                });
            }
        };
        Object.defineProperty(TurnonWarehouseListRender.prototype, "selected", {
            set: function (value) {
                if (this.hasLight != value) {
                    this.hasLight = value;
                    this.draw();
                }
            },
            enumerable: true,
            configurable: true
        });
        return TurnonWarehouseListRender;
    }(ListItemRender));
    turnonwarehouse.TurnonWarehouseListRender = TurnonWarehouseListRender;
    var TurnonWarehouseList = /** @class */ (function () {
        function TurnonWarehouseList($perent) {
            this.selectDic = new Object;
            this.perent = $perent;
            this._listRender = new UIListRenderComponent;
            this.addList();
        }
        TurnonWarehouseList.prototype.dispose = function () {
            this._listRender.dispose();
            this._listRender = null;
        };
        TurnonWarehouseList.prototype.addList = function () {
            // var $pos: Vector2D = new Vector2D(130, 120);
            var $pos = new Vector2D(298, 105);
            this._bgList = this._listRender.createGridList();
            this._bgList.x = $pos.x;
            this._bgList.y = $pos.y;
            this.perent.addChild(this._bgList);
            this._bgMask = new UIMask();
            this._bgMask.x = $pos.x;
            this._bgMask.y = $pos.y;
            this._bgMask.width = 75 * 5;
            this._bgMask.height = 75 * 5;
            this.perent.addMask(this._bgMask);
            this._bgMask.level = 3;
            this._listRender.mask = this._bgMask;
        };
        TurnonWarehouseList.prototype.refreshData = function () {
            var _this = this;
            var $handInQuality = tb.TB_faction_privilege.get_TB_faction_privilege(1).handInQuality;
            var $bgData = GuidData.bag.getEquBgData();
            var ary = new Array;
            for (var i = 0; i < $bgData.length; i++) {
                var $listItemData = new ListItemData();
                if ($bgData[i] && $bgData[i].entryData && $bgData[i].entryData.quality >= $handInQuality) {
                    $listItemData.data = $bgData[i];
                    $listItemData.clickFun = function ($listItemData) { _this.itemDataClick($listItemData); };
                    ary.push($listItemData);
                }
            }
            while (ary.length < 30) {
                var $listItemData = new ListItemData();
                $listItemData.data = null;
                $listItemData.clickFun = function ($listItemData) { _this.itemDataClick($listItemData); };
                ary.push($listItemData);
            }
            this._bgList.contentY = 0;
            // this._bgList.setGridData(ary, TreasurehouseUpListRender, 5, 60, 60, 1024, 1024, 300, 300);
            this._bgList.setGridData(ary, TurnonWarehouseListRender, 5, 75, 75, 512, 512, 75 * 5, 75 * 5);
        };
        TurnonWarehouseList.prototype.itemDataClick = function ($listItemData) {
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
                // $evt.showType=1
                // $evt.data = $listItemData.data
                // ModuleEventManager.dispatchEvent($evt)
                var evt = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                evt.data = $listItemData.data;
                evt.buttonType = 5;
                ModuleEventManager.dispatchEvent(evt);
            }
        };
        TurnonWarehouseList.prototype.show = function () {
            this.perent.addRender(this._listRender);
            this.refreshData();
        };
        TurnonWarehouseList.prototype.hide = function () {
            this.perent.removeRender(this._listRender);
        };
        return TurnonWarehouseList;
    }());
    turnonwarehouse.TurnonWarehouseList = TurnonWarehouseList;
})(turnonwarehouse || (turnonwarehouse = {}));
//# sourceMappingURL=TurnonWarehouseList.js.map