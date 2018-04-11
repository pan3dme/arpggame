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
var panui;
(function (panui) {
    var MainUiPanle = /** @class */ (function (_super) {
        __extends(MainUiPanle, _super);
        function MainUiPanle() {
            var _this = _super.call(this) || this;
            _this.width = 960;
            _this.height = 540;
            _this.top = 0;
            _this.left = 0;
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.loadScenePanelH5UI();
            return _this;
        }
        MainUiPanle.prototype.loadScenePanelH5UI = function () {
            var _this = this;
            this._topRender.uiAtlas = new UIAtlas();
            this._topRender.uiAtlas.setInfo("pan/test/football/playscene/playscene.xml", "pan/test/football/playscene/playscene.png", function () { _this.loadConfigCom(); });
        };
        MainUiPanle.prototype.loadConfigCom = function () {
            this.a_ball = this.addEvntBut("a_ball", this._topRender);
            this.a_ball.speed = 1;
            this.a_ball.x = 0;
            this.a_ball.y = 0;
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        };
        MainUiPanle.prototype.onMouseDown = function ($evt) {
            this.a_ball.x = $evt.x / UIData.Scale;
            this.a_ball.y = $evt.y / UIData.Scale;
        };
        MainUiPanle.prototype.butClik = function ($evt) {
            console.log($evt.target);
        };
        return MainUiPanle;
    }(UIPanel));
    panui.MainUiPanle = MainUiPanle;
})(panui || (panui = {}));
//# sourceMappingURL=MainUiPanle.js.map