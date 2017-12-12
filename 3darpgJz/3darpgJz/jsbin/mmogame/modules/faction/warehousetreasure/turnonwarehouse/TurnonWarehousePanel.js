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
    var TurnonWarehousePanel = /** @class */ (function (_super) {
        __extends(TurnonWarehousePanel, _super);
        function TurnonWarehousePanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.setBlackBg();
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._midRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TurnonWarehousePanel.prototype.dispose = function () {
            this._midRender.dispose();
            this._midRender = null;
            if (this.treasurehouseUpList) {
                this.treasurehouseUpList.dispose();
                this.treasurehouseUpList = null;
            }
            _super.prototype.dispose.call(this);
        };
        TurnonWarehousePanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/warehousetreasure.xml", "ui/uidata/faction/warehousetreasure/warehousetreasure.png", function () { _this.loadConfigCom(); }, "ui/uidata/faction/warehousetreasure/warehouseuse.png");
        };
        TurnonWarehousePanel.prototype.loadConfigCom = function () {
            this.addChild(this._midRender.getComponent("f_tittle_txt"));
            this.treasurehouseUpList = new turnonwarehouse.TurnonWarehouseList(this);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        TurnonWarehousePanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        TurnonWarehousePanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break;
            }
        };
        TurnonWarehousePanel.prototype.show = function () {
            if (!this.hasStage) {
                this.treasurehouseUpList.show();
                UIManager.getInstance().addUIContainer(this);
            }
        };
        TurnonWarehousePanel.prototype.refresh = function () {
            if (this.hasStage) {
                this.treasurehouseUpList.show();
            }
        };
        TurnonWarehousePanel.prototype.hide = function () {
            if (this.hasStage) {
                this.treasurehouseUpList.hide();
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return TurnonWarehousePanel;
    }(WindowCentenMin));
    turnonwarehouse.TurnonWarehousePanel = TurnonWarehousePanel;
})(turnonwarehouse || (turnonwarehouse = {}));
//# sourceMappingURL=TurnonWarehousePanel.js.map