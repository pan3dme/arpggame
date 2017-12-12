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
var StateupPopPanel = /** @class */ (function (_super) {
    __extends(StateupPopPanel, _super);
    function StateupPopPanel() {
        var _this = _super.call(this) || this;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.middle = 0;
        _this.center = 0;
        _this._basebgRender = new UIRenderComponent;
        _this.addRender(_this._basebgRender);
        _this._bgRender = new UIRenderComponent;
        _this.addRender(_this._bgRender);
        _this._baseRender = new UIRenderComponent;
        _this.addRender(_this._baseRender);
        _this._topRender = new UIRenderComponent;
        _this.addRender(_this._topRender);
        return _this;
    }
    StateupPopPanel.prototype.applyLoad = function () {
        var _this = this;
        this._baseUiAtlas = new UIAtlas();
        this._baseUiAtlas.setInfo("ui/uidata/stateup/stateuppop.xml", "ui/uidata/stateup/stateuppop.png", function () { _this.loadConfigCom(); }, "ui/uidata/stateup/stateuppc.png");
    };
    StateupPopPanel.prototype.loadConfigCom = function () {
        this._basebgRender.uiAtlas = this._baseUiAtlas;
        this._baseRender.uiAtlas = this._baseUiAtlas;
        this._bgRender.uiAtlas = this._baseUiAtlas;
        this._topRender.uiAtlas = this._baseUiAtlas;
        var a_bg0 = this.addChild(this._bgRender.getComponent("a_bg0"));
        var a_bg1 = this.addChild(this._bgRender.getComponent("a_bg1"));
        a_bg1.isU = true;
        a_bg0.addEventListener(InteractiveEvent.Down, function () { }, this);
        a_bg0.addEventListener(InteractiveEvent.Up, function () { }, this);
        a_bg1.addEventListener(InteractiveEvent.Down, function () { }, this);
        a_bg1.addEventListener(InteractiveEvent.Up, function () { }, this);
        this._bgRender.applyObjData();
        this.aryui = new Array;
        this.aryui.push(this._baseRender.getComponent("a_txtbg1"));
        this.aryui.push(this._topRender.getComponent("a_txt1"));
        this.addUIList(["a_txtbg0", "a_title"], this._baseRender);
        this.a_icon = this.addChild(this._topRender.getComponent("a_icon"));
        this.a_name = this.addChild(this._topRender.getComponent("a_name"));
        this.a_txt0 = this.addChild(this._topRender.getComponent("a_txt0"));
        this.c_basebg = this.addEvntButUp("a_basebg", this._basebgRender);
        this.c_basebg.addEventListener(InteractiveEvent.Down, function () { }, this);
        this.resize();
        this.applyLoadComplete();
    };
    StateupPopPanel.prototype.resize = function () {
        this.c_basebg.top = 0;
        this.c_basebg.left = 0;
        this.c_basebg.y = 0;
        this.c_basebg.x = 0;
        this.c_basebg.height = Scene_data.stageHeight / UIData.Scale;
        this.c_basebg.width = Scene_data.stageWidth / UIData.Scale;
        _super.prototype.resize.call(this);
    };
    StateupPopPanel.prototype.butClik = function (evt) {
        if (evt.target == this.c_basebg) {
            this.hide();
        }
    };
    StateupPopPanel.prototype.hide = function () {
        UIManager.getInstance().removeUIContainer(this);
    };
    StateupPopPanel.prototype.show = function () {
        UIManager.getInstance().addUIContainer(this);
        this.aaa();
    };
    StateupPopPanel.prototype.aaa = function () {
        var $obj = TableData.getInstance().getData(TableData.tb_realmbreak_base, GuidData.player.getStateLev());
        if ($obj["level"] > GuidData.player.getLevel()) {
            //未达到等级
            var defvalue = Number($obj["level"]) - GuidData.player.getLevel();
            this.bbb(defvalue, $obj);
        }
        else {
            this.bbb(0, $obj);
        }
    };
    StateupPopPanel.prototype.bbb = function ($defval, $tab) {
        //渲染用
        this.setUiListVisibleByItem(this.aryui, $defval > 0);
        if ($defval > 0) {
            LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.aryui[1].skinName, ColorType.Brown541616 + "再升" + ColorType.Redff0000 + $defval + ColorType.Brown541616 + "级,战力暴涨" + ColorType.Redff0000 + $tab["force"] + "!!!", 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.a_txt0.skinName, ColorType.Brown541616 + "境界领先等级！请尽快提升等级", 16, TextAlign.CENTER);
        }
        else {
            LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.a_txt0.skinName, ColorType.Brown541616 + "成功突破" + $tab["name"] + ",战力暴涨" + $tab["force"] + "!!!", 16, TextAlign.CENTER);
        }
        LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.a_name.skinName, ColorType.Whiteffeec9 + $tab["name"], 16, TextAlign.CENTER);
        this.drawPic(this.a_icon, $tab["id"]);
    };
    StateupPopPanel.prototype.drawPic = function ($ui, $iconurl) {
        IconManager.getInstance().getIcon(getStateUpIconUrl($iconurl), function ($img) {
            var rec = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture($ui.uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        });
    };
    return StateupPopPanel;
}(UIPanel));
//# sourceMappingURL=StateupPopPanel.js.map