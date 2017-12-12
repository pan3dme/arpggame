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
var mapnew;
(function (mapnew) {
    var MapClikVo = /** @class */ (function () {
        function MapClikVo() {
        }
        MapClikVo.prototype.draw = function ($uiAtlas) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.tb_world_map.mapid) + ".png", LoadManager.IMG_TYPE, function ($img) {
                var $toRect = _this.pic.getSkinCtxRect();
                var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                _this.isOpen = true;
                if (!_this.isOpen) {
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                }
                _this.pic.drawToCtx($uiAtlas, $ctx);
            });
            //  this.drawLabel($uiAtlas)
        };
        MapClikVo.prototype.drawLabel = function ($uiAtlas) {
            var $toRect = this.txt.getSkinCtxRect();
            var $ctx = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whitefff4d6 + tb.TB_map.getTB_map(this.tb_world_map.mapid).name, 16);
            this.txt.drawToCtx($uiAtlas, $ctx);
        };
        return MapClikVo;
    }());
    mapnew.MapClikVo = MapClikVo;
    var MapNewWorldPanel = /** @class */ (function (_super) {
        __extends(MapNewWorldPanel, _super);
        function MapNewWorldPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        MapNewWorldPanel.prototype.applyLoad = function () {
            var _this = this;
            this._topRender.setInfo("ui/uidata/mapnew/mapnew.xml", "ui/uidata/mapnew/mapnew.png", function () { _this.loadConfigCom(); });
        };
        MapNewWorldPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.bigPic.uiAtlas = this._topRender.uiAtlas;
            this.b_aer_map_but = this.addEvntButUp("b_aer_map_but", this._topRender);
            this.loadBigPicByUrl("ui/load/map/bigworld.jpg");
            this.resetPicData();
            this.applyLoadComplete();
        };
        MapNewWorldPanel.prototype.resetPicData = function () {
            var $uiPosList = tb.TB_world_map.getItem();
            this.wIconItem = new Array();
            for (var i = 0; i < $uiPosList.length; i++) {
                var $vo = new MapClikVo();
                $vo.tb_world_map = $uiPosList[i];
                $vo.id = i;
                $vo.txt = this._topRender.getComponent("w_label");
                $vo.txt.goToAndStop($vo.id);
                this.addChild($vo.txt);
                $vo.pic = this.addEvntButUp("w_icon", this._topRender);
                $vo.pic.data = $vo;
                $vo.pic.goToAndStop(i);
                $vo.pic.x = $vo.tb_world_map.x * 0.95 - 35;
                $vo.pic.y = $vo.tb_world_map.y * 0.95 - 40;
                $vo.txt.x = $vo.pic.x - 15;
                $vo.txt.y = $vo.pic.y + $vo.pic.height;
                this.wIconItem.push($vo);
            }
        };
        MapNewWorldPanel.prototype.loadBigPicByUrl = function ($url) {
            this.bigPic.setImgUrl($url);
            if (!this.bigPicUI) {
                this.bigPicUI = this.addChild(this.bigPic.getComponent("b_world_map_pic"));
            }
            return this.bigPicUI;
        };
        MapNewWorldPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.b_aer_map_but:
                    this.hide();
                    ModuleEventManager.dispatchEvent(new mapnew.MapNewEvent(mapnew.MapNewEvent.SHOW_MAP_NEW_EVENT));
                    break;
                default:
                    if (evt.target.data instanceof MapClikVo) {
                        var $vo = evt.target.data;
                        if ($vo.tb_world_map.mapid != GuidData.map.tbMapVo.id && $vo.isOpen) {
                            this.hide();
                            NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                        }
                        else {
                            console.log("当前地图不传");
                        }
                    }
                    break;
            }
        };
        MapNewWorldPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        MapNewWorldPanel.prototype.show = function () {
            for (var i = 0; i < this.wIconItem.length; i++) {
                this.wIconItem[i].draw(this._topRender.uiAtlas);
            }
            UIManager.getInstance().addUIContainer(this);
        };
        return MapNewWorldPanel;
    }(WindowMinUi));
    mapnew.MapNewWorldPanel = MapNewWorldPanel;
})(mapnew || (mapnew = {}));
//# sourceMappingURL=MapNewWorldPanel.js.map