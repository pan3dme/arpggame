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
            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/1024.png", new Rectangle(-200, -200, 1500, 1500));
            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/house1.png", new Rectangle(800, 200, 256, 256));
            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/house2.png", new Rectangle(900, 500, 256, 256));
            this.addFrameBg(Scene_data.fileRoot + "pan/test/layatest/house3.png", new Rectangle(500, 200, 256, 256));
            this.addPicByPos(Scene_data.fileRoot + "pan/test/layatest/house1.png", new Vector2D(100, 100));
            //  this.addPicByPos(Scene_data.fileRoot + "pan/test/layatest/house2.png", new Vector2D(600, 100))
            //  this.addPicByPos(Scene_data.fileRoot + "pan/test/layatest/house3.png", new Vector2D(400, 400))
            // Laya. Stat.show();
            this.setup();
        };
        MainUiPanle.prototype.setup = function () {
            // 该文本自动适应尺寸
            var autoSizeText = this.createSampleText();
            autoSizeText.overflow = Laya.Text.VISIBLE;
            autoSizeText.y = 50;
            // 该文本被限制了宽度
            var widthLimitText = this.createSampleText();
            widthLimitText.width = 100;
            widthLimitText.y = 180;
            //该文本被限制了高度 
            var heightLimitText = this.createSampleText();
            heightLimitText.height = 20;
            heightLimitText.y = 320;
        };
        MainUiPanle.prototype.createSampleText = function () {
            var text = new Laya.Text();
            text.overflow = Laya.Text.HIDDEN;
            text.color = "#FFFFFF";
            text.font = "Impact";
            text.fontSize = 20;
            text.borderColor = "#FFFF00";
            text.x = 80;
            Laya.stage.addChild(text);
            text.text = "A POWERFUL HTML5 ENGINE潘佳治123 ON FLASH TECHNICAL\n" + "A POWERFUL HTML5 ENGINE ON FLASH TECHNICAL\n" + "A POWERFUL HTML5 ENGINE ON FLASH TECHNICAL";
            return text;
        };
        MainUiPanle.prototype.addPicByPos = function ($url, $v2d) {
            var $imag = new Laya.Image($url);
            $imag.pos($v2d.x, $v2d.y);
            Laya.stage.addChild($imag);
        };
        MainUiPanle.prototype.addRoleChar = function () {
            for (var i = 0; i < 10; i++) {
                var $sc = new pan2d.Scene2dChar();
                $sc.setRoleUrl(getRoleUrl("npc_0002"));
                //  $sc.setRoleUrl(getRoleUrl("pan003"));
                /*
                $sc.setWingByID("901");
                $sc.setMountById("4103");
                $sc.setWeaponByAvatar(50011);
                          $sc.play(CharAction.STAND_MOUNT);
                */
                $sc.rotationY = random(360);
                $sc.set2dPos(i * 100, i * 100); //坐标
                SceneManager.getInstance().addMovieDisplay($sc);
            }
        };
        MainUiPanle.prototype.addFrameBg = function ($url, $rect) {
            var $dis = pan2d.GroundModel.getInstance().addGroundPicByeUrl();
            //图片坐标和高宽
            $dis.width = $rect.width;
            $dis.height = $rect.height;
            $dis.x = $rect.x;
            $dis.y = $rect.y;
            $dis.setPicUrl($url); //图片地址
        };
        MainUiPanle.prototype.onMouseDown = function ($evt) {
            //this.a_ball.x = $evt.x / UIData.Scale
            //this.a_ball.y = $evt.y / UIData.Scale;
            var $mousePos = new Vector2D($evt.x, $evt.y);
            $mousePos.x -= pan2d.CanvasPostionModel.getInstance().tureMoveV2d.x;
            $mousePos.y -= pan2d.CanvasPostionModel.getInstance().tureMoveV2d.y;
            var $sc = new pan2d.Scene2dChar();
            $sc.setRoleUrl(getRoleUrl("npc_0002"));
            $sc.set2dPos($mousePos.x, $mousePos.y); //坐标
            $sc.rotationY = 215;
            SceneManager.getInstance().addMovieDisplay($sc);
        };
        MainUiPanle.prototype.butClik = function ($evt) {
            console.log($evt.target);
        };
        return MainUiPanle;
    }(UIPanel));
    panui.MainUiPanle = MainUiPanle;
})(panui || (panui = {}));
//# sourceMappingURL=MainUiPanle.js.map