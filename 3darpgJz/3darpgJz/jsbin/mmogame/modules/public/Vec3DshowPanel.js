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
var Vec3DshowPanel = /** @class */ (function (_super) {
    __extends(Vec3DshowPanel, _super);
    function Vec3DshowPanel() {
        var _this = _super.call(this) || this;
        _this._lastMouseX = 0;
        _this._lastRoleRotatioinY = 0;
        _this.width = UIData.designWidth;
        _this.height = UIData.designHeight;
        _this.center = 0;
        _this.middle = 0;
        //公共资源纹理
        _this._wtRender = new UIRenderComponent;
        _this.addRender(_this._wtRender);
        _this._midRender = new UIRenderComponent;
        _this.addRender(_this._midRender);
        // this._baseRender = new UIRenderComponent;
        // this.addRender(this._baseRender)
        GameData.getPublicUiAtlas(function ($publicbgUiAtlas) {
            _this._wtRender.uiAtlas = $publicbgUiAtlas;
            _this._midRender.setInfo("ui/uidata/PopTimeout/systemtrailer.xml", "ui/uidata/PopTimeout/systemtrailer.png", function () { _this.loadConfigCom(); });
        });
        return _this;
    }
    Vec3DshowPanel.prototype.loadConfigCom = function () {
        this._complete = true;
        // this._baseRender.uiAtlas = this._midRender.uiAtlas;
        this.guiBg0 = this.addEvntBut("baseBg", this._wtRender); //半透明背景，不可点击
        this.useBtn = this.addEvntButUp("but_2", this._wtRender); //使用按钮背景
        this.setUiSizeByName(this.useBtn, "btn");
        this._wtRender.applyObjData();
        var renderLevel = this._midRender;
        this.addChild(renderLevel.getComponent("a_bg"));
        this.btn_txt = this.addChild(renderLevel.getComponent("btn_txt"));
        this.a_info = this.addChild(renderLevel.getComponent("a_info"));
        this.a_name = this.addChild(renderLevel.getComponent("a_name"));
        this.role = this.addChild(renderLevel.getComponent("role"));
        this.role.isVirtual = true;
        this.role.addEventListener(InteractiveEvent.Down, this.A_left_bg_MouseDown, this);
        this.addPersonChar();
        this.refresh();
        this.resize();
    };
    Vec3DshowPanel.prototype.setUiSizeByName = function ($ui, $name) {
        var $temp = this._midRender.getComponent($name);
        $ui.x = $temp.x;
        $ui.y = $temp.y;
        $ui.width = $temp.width;
        $ui.height = $temp.height;
    };
    Vec3DshowPanel.prototype.resize = function () {
        if (this.guiBg0) {
            this.guiBg0.top = 0;
            this.guiBg0.left = 0;
            this.guiBg0.y = 0;
            this.guiBg0.x = 0;
            this.guiBg0.height = Scene_data.stageHeight / UIData.Scale;
            this.guiBg0.width = Scene_data.stageWidth / UIData.Scale;
            this.resizeRole();
        }
        _super.prototype.resize.call(this);
    };
    Vec3DshowPanel.prototype.addPersonChar = function () {
        var _this = this;
        this.showDisPlay = new Person2DChar();
        // this.showDisPlay = new sb.ShenBingDisp2D();
        this._midRender.addModel(this.showDisPlay);
        this._rotationFun = function (d) { _this.rotationRole(); };
        // this.refreshRole();
    };
    Vec3DshowPanel.prototype.A_left_bg_MouseDown = function (evt) {
        this._lastMouseX = evt.x;
        this._lastRoleRotatioinY = this.showDisPlay.rotationY;
        Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
        Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
    };
    Vec3DshowPanel.prototype.A_left_bg_MouseMove = function (evt) {
        this.showDisPlay.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
    };
    Vec3DshowPanel.prototype.A_left_bg_MouseUp = function (evt) {
        Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
        Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
    };
    Vec3DshowPanel.prototype.rotationRole = function () {
        this.showDisPlay.rotationY -= 0.5;
    };
    Vec3DshowPanel.prototype.resizeRole = function () {
        if (this.showDisPlay) {
            this.showDisPlay.resize();
            this.showDisPlay.scale = this._scale * UIData.Scale;
            this.showDisPlay.rotationY = 0;
            this.showDisPlay.y = this._posy * UIData.Scale;
        }
    };
    Vec3DshowPanel.prototype.changeButEnd = function () {
        UIManager.getInstance().removeUIContainer(this);
        GuidData.player.resetSystemItem();
        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
    };
    Vec3DshowPanel.prototype.butClik = function (evt) {
        switch (evt.target) {
            case this.guiBg0:
                break;
            case this.useBtn:
                //根据state来确定具体执行什么操作
                if (this._vo.state == 0) {
                    switch (this._vo.id) {
                        case 1:
                            ModulePageManager.openPanel(SharedDef.MODULE_DIVINE, null);
                            break;
                        case 2:
                            // ModulePageManager.openPanel(SharedDef.MODULE_MOUNT, null);
                            this.changeButEnd();
                            break;
                        case 3:
                            ModulePageManager.openPanel(SharedDef.MODULE_DIVINE, null);
                            break;
                        default:
                            console.log("没有设置");
                            break;
                    }
                    //  NetManager.getInstance().protocolos.divine_switch(this._vo.id);
                }
                else if (this._vo.state == 1) {
                    NetManager.getInstance().protocolos.ride_mount();
                }
                this.close();
            default:
                break;
        }
    };
    Vec3DshowPanel.prototype.close = function () {
        UIManager.getInstance().removeUIContainer(this);
    };
    Vec3DshowPanel.prototype.refresh = function () {
        if (this._complete) {
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_name.skinName, "[d4e8ff]" + this._vo.name, 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_info.skinName, "[d4e8ff]" + this._vo.info, 16, TextAlign.CENTER);
            this.btn_txt.goToAndStop(this._vo.state);
            // this.showDisPlay.setAvatar(5001);
            // var $sex: number;
            // if ($proptabvo.sex == 1) {
            //     $sex = 10001
            // } else if ($proptabvo.sex == 2) {
            //     $sex = 10011
            // }
            if (this._vo.type == 1) {
                this.showDisPlay.showAvatarVisibel = false;
                this.showDisPlay.setAvatar(6302);
                this.showDisPlay.setWeaponByAvatar(this._vo.modelid);
                this._scale = 4;
                this._posy = 30;
            }
            else {
                this.showDisPlay.showAvatarVisibel = true;
                this.showDisPlay.removePart(SceneChar.WEAPON_PART);
                this.showDisPlay.setAvatar(this._vo.modelid);
                this._scale = 3;
                this._posy = -35;
            }
            this.resizeRole();
        }
    };
    Vec3DshowPanel.getInstance = function () {
        if (!this._instance) {
            this._instance = new Vec3DshowPanel();
        }
        return this._instance;
    };
    Vec3DshowPanel.prototype.show = function ($vo) {
        this._vo = $vo;
        this.refresh();
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
        }
    };
    return Vec3DshowPanel;
}(UIConatiner));
var vec3DshowVo = /** @class */ (function () {
    function vec3DshowVo() {
    }
    return vec3DshowVo;
}());
//# sourceMappingURL=Vec3DshowPanel.js.map