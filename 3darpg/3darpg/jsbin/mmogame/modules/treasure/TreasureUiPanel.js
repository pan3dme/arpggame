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
var treasure;
(function (treasure) {
    var TreasureUiPanel = /** @class */ (function (_super) {
        __extends(TreasureUiPanel, _super);
        function TreasureUiPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            _this._bgRender = new UIRenderComponent;
            _this.addRender(_this._bgRender);
            _this._publicbguiRender = new UIRenderComponent;
            _this.addRender(_this._publicbguiRender);
            _this._roleRender = new UIRenderComponent;
            _this.addRender(_this._roleRender);
            _this._roleRender.uiAtlas = new UIAtlas;
            return _this;
        }
        TreasureUiPanel.prototype.dispose = function () {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;
            if (this.treasureRightPanel) {
                this.treasureRightPanel.dispose();
                this.treasureRightPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        TreasureUiPanel.prototype.applyLoad = function () {
            var _this = this;
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/treasure/TreasureUi.xml", "ui/uidata/treasure/TreasureUi.png", function () { _this.loadConfigCom(); });
            // });
        };
        TreasureUiPanel.prototype.loadConfigCom = function () {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        };
        TreasureUiPanel.prototype.initData = function () {
            //添加UI控件初始化
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.addChild(this._bgRender.getComponent("t_bg"));
            this.a_ro_bg = this.addEvntBut("a_ro_bg", this._roleRender);
            this.addChild(this._bgRender.getComponent("a_zhanlinum"));
            this.addChild(this._bgRender.getComponent("a_title"));
            var cnew_bg_yellow = this.addChild(this.winmidRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._roleRender);
            this.a_zhanli_all = this.addChild(this._roleRender.getComponent("a_zhanli_all"));
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._roleRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._roleRender);
            this.winmidRender.applyObjData();
            this.mountRoleSprite = new Person2DChar();
            this.mountRoleSprite.needUIUrl = false;
            // this.mountRoleSprite .showAvatarVisibel=false
            // this.mountRoleSprite.setAvatar(6013);
            this._roleRender.addModel(this.mountRoleSprite);
        };
        TreasureUiPanel.prototype.setAvatar = function ($num, $name, $value) {
            // console.log($num);
            this.mountRoleSprite.setAvatar($num);
        };
        TreasureUiPanel.prototype.resizeRole = function () {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 4 * UIData.Scale;
                //this.mountRoleSprite.rotationY = 45
                this.mountRoleSprite.x = -10 * UIData.Scale;
                this.mountRoleSprite.y = -90 * UIData.Scale;
            }
        };
        TreasureUiPanel.prototype.resize = function () {
            this.resizeRole();
            _super.prototype.resize.call(this);
        };
        TreasureUiPanel.prototype.setZhanli = function () {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._roleRender.uiAtlas, this.a_zhanli_all.skinName, String(GuidData.player.gettalismantotalzhanli()), ArtFont.num56);
        };
        TreasureUiPanel.prototype.show = function ($type) {
            if ($type === void 0) { $type = 0; }
            if (!$type) {
                $type = 0;
            }
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.treasureRightPanel) {
                this.treasureRightPanel = new treasure.TreasureRightPanel();
                this.treasureRightPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                this.treasureRightPanel.parent = this;
            }
            this.treasureRightPanel.show();
            this.setZhanli();
            this.resize();
        };
        TreasureUiPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this.treasureRightPanel) {
                this.treasureRightPanel.hide();
            }
            ModulePageManager.hideResTittle();
        };
        TreasureUiPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_ro_bg:
                    // this.A_left_bg_MouseDown(evt)
                    break;
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.HIDE_TREASURE_EVENT));
                    break;
                default:
                    break;
            }
        };
        return TreasureUiPanel;
    }(WindowUi));
    treasure.TreasureUiPanel = TreasureUiPanel;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureUiPanel.js.map