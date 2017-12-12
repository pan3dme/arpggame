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
var PopWindowMin = /** @class */ (function (_super) {
    __extends(PopWindowMin, _super);
    function PopWindowMin() {
        var _this = _super.call(this) || this;
        _this.addWinUiPanel();
        return _this;
    }
    PopWindowMin.prototype.addWinUiPanel = function () {
        this.winbgRender = new UIRenderComponent;
        this.addRender(this.winbgRender);
        this.winmidRender = new UIRenderComponent;
        this.addRender(this.winmidRender);
        this.wintopRender = new UIRenderComponent;
        this.addRender(this.wintopRender);
    };
    PopWindowMin.prototype.makeBaseWinUi = function () {
        var _this = this;
        if (!PopWindowMin.winUIAtlas) {
            PopWindowMin.winUIAtlas = new UIAtlas;
        }
        if (!PopWindowMin.winUIAtlas.configData) {
            PopWindowMin.winUIAtlas.setInfo("ui/uidata/window/popwin/popwin.xml", "ui/uidata/window/popwin/popwin.png", function () { _this.winComplete(); });
        }
        else {
            if (this.wintopRender.uiAtlas) {
                this.applyLoad();
            }
            else {
                this.winComplete();
            }
        }
    };
    PopWindowMin.prototype.winComplete = function () {
        this.wintopRender.uiAtlas = PopWindowMin.winUIAtlas;
        this.winbgRender.uiAtlas = PopWindowMin.winUIAtlas;
        this.addChild(this.winbgRender.getComponent("b_win_bg"));
        this.addChild(this.wintopRender.getComponent("b_tittle_bg"));
        this.applyLoad();
    };
    PopWindowMin.prototype.hide = function () {
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL))
    };
    return PopWindowMin;
}(UIPanel));
//# sourceMappingURL=PopWindowMin.js.map