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
var YaoGanModelPanel = /** @class */ (function (_super) {
    __extends(YaoGanModelPanel, _super);
    function YaoGanModelPanel() {
        var _this = _super.call(this) || this;
        _this.isMouseDown = false;
        _this.bindPos = new Vector2D();
        _this.interfaceUI = true;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.bottom = 0;
        _this.left = 0;
        _this._bottomRender = new UIRenderComponent;
        _this.addRender(_this._bottomRender);
        _this._midRender = new UIRenderComponent;
        _this.addRender(_this._midRender);
        if (!_this.hasStage) {
            UIManager.getInstance().addUIContainer(_this);
        }
        _this.configuiAtlas();
        return _this;
    }
    YaoGanModelPanel.getInstance = function () {
        if (!this._instance) {
            this._instance = new YaoGanModelPanel();
        }
        return this._instance;
    };
    YaoGanModelPanel.prototype.initData = function ($bfun) {
        if ($bfun === void 0) { $bfun = null; }
        this.yaoganFunction = $bfun;
    };
    YaoGanModelPanel.prototype.addMouseEvent = function () {
        var _this = this;
        if (Scene_data.isPc) {
            document.addEventListener(MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
            this.b_yaogan_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
            this.baseBindPos = new Vector2D(this.b_yaogan_bg.x + this.b_yaogan_bg.width / 2, this.b_yaogan_bg.y + this.b_yaogan_bg.height / 2);
        }
    };
    YaoGanModelPanel.prototype.setBasePostion = function () {
        this.b_yaogan_bar.x = this.baseBindPos.x - this.b_yaogan_bar.width / 2;
        this.b_yaogan_bar.y = this.baseBindPos.y - this.b_yaogan_bar.height / 2;
        this.b_yaogan_bg.x = this.baseBindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.baseBindPos.y - this.b_yaogan_bg.height / 2;
        var $mainChar = GameInstance.mainChar;
        if ($mainChar && $mainChar._speedDirect) {
            MainCharControlModel.getInstance().sendStop();
        }
    };
    YaoGanModelPanel.prototype.onMouse = function ($e) {
        if ($e.type) {
            if ($e.type == MouseType.MouseDown) {
            }
            else if ($e.type == MouseType.MouseUp) {
                this.isMouseDown = false;
                this.setBasePostion();
            }
            else if ($e.type == MouseType.MouseMove) {
            }
        }
    };
    YaoGanModelPanel.prototype.onStageMouseMove = function (evt) {
        if (this.isMouseDown) {
            var $mouse = new Vector2D;
            $mouse.x = evt.x / UIData.Scale - this.x / UIData.Scale;
            $mouse.y = evt.y / UIData.Scale - this.y / UIData.Scale;
            this.changeBingPostion($mouse);
        }
    };
    YaoGanModelPanel.prototype.changeBingPostion = function (mousePos) {
        var dis = Vector2D.distance(mousePos, this.bindPos);
        if (dis > 50) {
            var $nrm = new Vector2D(this.bindPos.x - mousePos.x, this.bindPos.y - mousePos.y);
            $nrm.normalize();
            $nrm.scaleBy(50);
            this.bindPos.x = mousePos.x + $nrm.x;
            this.bindPos.y = mousePos.y + $nrm.y;
        }
        var kk = this.b_yaogan_bg.parent;
        var v2d = new Vector2D(mousePos.x - this.bindPos.x, mousePos.y - this.bindPos.y);
        v2d.normalize();
        this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2 + v2d.x * 20;
        this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2 + v2d.y * 20;
        this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2;
        var $a = Math.atan2(v2d.y, v2d.x) * 180 / Math.PI;
        var $m = new Matrix3D();
        $m.appendRotation($a, Vector3D.Y_AXIS);
        this._speedDirect = $m.transformVector(new Vector3D(1, 0, 0));
        this.changeMainChar($a);
        if (this.yaoganFunction) {
            this.yaoganFunction($a);
        }
    };
    YaoGanModelPanel.prototype.changeMainChar = function ($a) {
        MainCharControlModel.getInstance().setSpeedDirect(this._speedDirect);
    };
    YaoGanModelPanel.prototype.butClik = function (evt) {
        this.isMouseDown = true;
        MainCharControlModel.getInstance().sendStop();
    };
    YaoGanModelPanel.prototype.configuiAtlas = function () {
        var $uiAtlas = new UIAtlas;
        $uiAtlas.configData = new Array();
        var $uiRect = new Rectangle(0, 0, 256, 128);
        $uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRect.width, $uiRect.height, false);
        $uiAtlas.textureRes = new TextureRes;
        $uiAtlas.textureRes.texture = Scene_data.context3D.getTexture($uiAtlas.ctx.canvas, 0, 1); //不是线性纹理
        $uiAtlas.configData.push($uiAtlas.getObject("b_yaogan_bg", 0, 0, 128, 128, $uiRect.width, $uiRect.height));
        $uiAtlas.configData.push($uiAtlas.getObject("b_yaogan_bar", 128, 0, 128, 128, $uiRect.width, $uiRect.height));
        this._bottomRender.uiAtlas = $uiAtlas;
        this._midRender.uiAtlas = $uiAtlas;
        this.loadConfigCom();
    };
    YaoGanModelPanel.prototype.loadConfigCom = function () {
        this.b_yaogan_bg = this.addChild(this._bottomRender.creatBaseComponent("b_yaogan_bg"));
        this.b_yaogan_bar = this.addChild(this._bottomRender.creatBaseComponent("b_yaogan_bar"));
        this.b_yaogan_bg.x = 90;
        this.b_yaogan_bg.y = 334;
        this.b_yaogan_bg.width = 130;
        this.b_yaogan_bg.height = 130;
        this.b_yaogan_bar.x = 115;
        this.b_yaogan_bar.y = 360;
        this.b_yaogan_bar.width = 80;
        this.b_yaogan_bar.height = 80;
        this._midRender.uiAtlas.upDataPicToTexture("pan/pic/b_yaogan_bar.png", this.b_yaogan_bar.skinName);
        this._midRender.uiAtlas.upDataPicToTexture("pan/pic/b_yaogan_bg.png", this.b_yaogan_bg.skinName);
        // GameMouseManager.getInstance().setBtn(this.b_yaogan_bar, this.b_yaogan_bg);
        this.addMouseEvent();
    };
    return YaoGanModelPanel;
}(UIPanel));
//# sourceMappingURL=YaoGanModelPanel.js.map