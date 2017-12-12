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
var sboss;
(function (sboss) {
    var SbossRankPanelRender = /** @class */ (function (_super) {
        __extends(SbossRankPanelRender, _super);
        function SbossRankPanelRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SbossRankPanelRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.R_RANK_ID = this.creatSUI($baseRender, SbossRankPanelRender.baseAtlas, "R_RANK_ID", 35, 11, 35, 18);
            $container.addChild(this.R_RANK_ID);
            this.R_NAME = this.creatSUI($baseRender, SbossRankPanelRender.baseAtlas, "R_NAME", 160, 11, 100, 18);
            $container.addChild(this.R_NAME);
            this.R_DAM = this.creatSUI($baseRender, SbossRankPanelRender.baseAtlas, "R_DAM", 330, 11, 65, 18);
            $container.addChild(this.R_DAM);
            this.R_BG = this.creatSUI($bgRender, SbossRankPanelRender.baseAtlas, "R_BG", 0, 0, 430, 40);
            $container.addChild(this.R_BG);
        };
        SbossRankPanelRender.prototype.applyRender = function () {
            if (this.itdata && this.itdata.data) {
                var $vo = this.itdata.data;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.R_NAME.skinName, ColorType.Brown6a4936 + getBaseName($vo.name), 14, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.R_DAM.skinName, ColorType.Brown6a4936 + String(Math.floor($vo.dam * 10) / 10) + "%", 14, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.R_RANK_ID.skinName, ColorType.Brown6a4936 + (this.itdata.id + 1), 14, TextAlign.CENTER);
            }
            if (this.itdata) {
                if (this.itdata.id % 2 == 0) {
                    UiDraw.SharedDrawImg(this.uiAtlas, SbossRankPanelRender.baseAtlas, this.R_BG.skinName, "U_CELL_BG");
                }
                else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.R_BG.skinName);
                }
            }
        };
        SbossRankPanelRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        SbossRankPanelRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this.R_BG.skinName);
        };
        return SbossRankPanelRender;
    }(SListItem));
    sboss.SbossRankPanelRender = SbossRankPanelRender;
    var SbossRankPanelList = /** @class */ (function (_super) {
        __extends(SbossRankPanelList, _super);
        function SbossRankPanelList() {
            var _this = _super.call(this) || this;
            _this.left = 325;
            _this.top = 149;
            return _this;
        }
        SbossRankPanelList.prototype.init = function ($uiAtlas) {
            SbossRankPanelRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        SbossRankPanelList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, SbossRankPanelRender, 430, 40 * 8, 256, 40, 8, 256, 1024, 1, 10);
        };
        SbossRankPanelList.prototype.setRandData = function ($data) {
            var $tbDataArr = new Array();
            for (var i = 0; i < 10; i++) {
                var $vo = new SListItemData();
                if ($data.info[i]) {
                    $vo.data = $data.info[i];
                }
                $vo.id = i;
                $tbDataArr.push($vo);
                console.log($vo.id);
            }
            this.refreshData($tbDataArr);
        };
        SbossRankPanelList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.setShowLevel(2);
        };
        SbossRankPanelList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return SbossRankPanelList;
    }(SList));
    sboss.SbossRankPanelList = SbossRankPanelList;
    var SbossRandPanel = /** @class */ (function (_super) {
        __extends(SbossRandPanel, _super);
        function SbossRandPanel() {
            var _this = _super.call(this) || this;
            _this.uiAtlasComplet = false;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            //添加好友面板渲染器
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            return _this;
        }
        SbossRandPanel.prototype.applyLoad = function () {
            var _this = this;
            this._midRender.uiAtlas = new UIAtlas();
            this._midRender.uiAtlas.setInfo("ui/uidata/boss/sboss/sboss.xml", "ui/uidata/boss/sboss/sboss.png", function () { _this.loadConfigCom(); }, "ui/uidata/boss/sboss/sbossuse.png");
        };
        SbossRandPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(this._midRender.getComponent("r_name"));
            this.addChild(this._midRender.getComponent("r_smd"));
            this.addChild(this._midRender.getComponent("r_rank_id"));
            this.addChild(this._midRender.getComponent("r_tittle"));
            this.addChild(this._midRender.getComponent("r_line_a_1"));
            this.addChild(this._midRender.getComponent("r_line_b"));
            this.addChild(this._midRender.getComponent("r_line_a_0"));
            this.r_list_pos = this.addChild(this._midRender.getComponent("r_list_pos"));
            this.addLists();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        };
        SbossRandPanel.prototype.addLists = function () {
            this.sbossRankPanelList = new SbossRankPanelList;
            this.sbossRankPanelList.init(this._midRender.uiAtlas);
        };
        SbossRandPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.sbossRankPanelList) {
                this.sbossRankPanelList.left = this.r_list_pos.parent.x / UIData.Scale + this.r_list_pos.x + 3;
                this.sbossRankPanelList.top = this.r_list_pos.parent.y / UIData.Scale + this.r_list_pos.y + 5;
            }
        };
        SbossRandPanel.prototype.butClik = function (evt) {
            this.hide();
        };
        SbossRandPanel.prototype.hide = function () {
            this.sbossRankPanelList.hide();
            UIManager.getInstance().removeUIContainer(this);
        };
        SbossRandPanel.prototype.setRandData = function ($data) {
            UIManager.getInstance().addUIContainer(this);
            this.sbossRankPanelList.show();
            this.sbossRankPanelList.setRandData($data);
        };
        return SbossRandPanel;
    }(WindowCentenMin));
    sboss.SbossRandPanel = SbossRandPanel;
})(sboss || (sboss = {}));
//# sourceMappingURL=SbossRandPanel.js.map