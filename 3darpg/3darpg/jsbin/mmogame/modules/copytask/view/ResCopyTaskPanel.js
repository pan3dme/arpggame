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
var copytask;
(function (copytask) {
    var ResCopyTaskPanel = /** @class */ (function (_super) {
        __extends(ResCopyTaskPanel, _super);
        function ResCopyTaskPanel() {
            var _this = _super.call(this) || this;
            _this._curDataID = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.center = 0;
            _this.middle = 0;
            return _this;
        }
        ResCopyTaskPanel.prototype.setUIAtlas = function ($uiatlas, $winMidRender) {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._winMidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);
            this._btnRender = new UIRenderComponent();
            this._btnRender.uiAtlas = WindowUi.winUIAtlas;
            this.addRender(this._btnRender);
            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);
            this.initUI();
            this.addSelfRole();
        };
        ResCopyTaskPanel.prototype.initUI = function () {
            this.initBg();
            this.addUIList(["t_bg1", "t_bg2", "t_title1", "t_title2"], this._bgRender);
            this.t_vip_add = this.addChild(this._baseRender.getComponent("t_vip_add"));
            var ui;
            ui = this.addChild(this._baseRender.getComponent("t_lab1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "通关奖励", 14, TextAlign.CENTER, ColorType.colorb96d49);
            ui = this.addChild(this._baseRender.getComponent("t_lab2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "几率获得", 14, TextAlign.CENTER, ColorType.colorb96d49);
            ui = this.addChild(this._baseRender.getComponent("t_vip_lab"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "VIP特权可扫荡", 14, TextAlign.CENTER, ColorType.color9a683f);
            this.btnname_sweep = this._baseRender.getComponent("t_lab3");
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.btnname_sweep.skinName, "扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_lab4"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "开始挑战", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.btn_sweep = this._btnRender.getComponent("cnew_btn1");
            this.setSizeForPanelUiCopy(this.btn_sweep, "t_btn1", this._bgRender);
            this.btn_sweep.addEventListener(InteractiveEvent.Up, this.sweep, this);
            ui = this.addChild(this._btnRender.getComponent("cnew_btn1"));
            this.setSizeForPanelUiCopy(ui, "t_btn2", this._bgRender);
            ui.addEventListener(InteractiveEvent.Up, this.enter, this);
            this.bossName = this.addChild(this._baseRender.getComponent("t_name_lab"));
            this.rewardIcon = this.addChild(this._baseRender.getComponent("t_reward"));
            this.iconAry = new Array;
            for (var i = 0; i < 2; i++) {
                this.iconAry.push(this.addChild(this._baseRender.getComponent("t_icon" + i)));
            }
            //this.draw();
        };
        ResCopyTaskPanel.prototype.visiableBtn = function () {
            this.setUiListVisibleByItem([this.btn_sweep, this.btnname_sweep], GuidData.player.getIsVIP());
        };
        ResCopyTaskPanel.prototype.initBg = function () {
            this._bgAry = new Array;
            this._bgAry.push(this.addByCopy("cnew_bg_yellow", "t_list_bg"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_top", "t_win_bg1"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "t_win_bg2"));
        };
        ResCopyTaskPanel.prototype.addByCopy = function ($name1, $name2) {
            var ui = this._winMidRender.getComponent($name1);
            this.setSizeForPanelUiCopy(ui, $name2, this._bgRender);
            return ui;
        };
        ResCopyTaskPanel.prototype.draw = function ($data) {
            if (this._curDataID == $data.data.id) {
                return;
            }
            this._curDataID = $data.data.id;
            this._curData = $data;
            IconManager.getInstance().drawItemIcon60(this.rewardIcon, $data.data.basereward[0][0], 1);
            for (var i = 0; i < this.iconAry.length; i++) {
                IconManager.getInstance().drawItemIcon60(this.iconAry[i], $data.data.randomreward[i][0], 1);
            }
            var boss = TableData.getInstance().getData(TableData.tb_creature_template, $data.data.boss);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.bossName.skinName, boss.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.selfRole.setAvatar(boss.avatar);
        };
        ResCopyTaskPanel.prototype.sweep = function ($e) {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._curData.passed > 0 && this._curData.num < this._curData.maxtime && GuidData.player.getVipLevel() > 0) {
                NetManager.getInstance().protocolos.res_instance_sweep(this._curData.data.id);
            }
            else {
                if (GuidData.player.getVipLevel() <= 0) {
                    msgtip.MsgTipManager.outStr("vip才可扫荡", 99);
                }
                else if (this._curData.num >= this._curData.maxtime) {
                    msgtip.MsgTipManager.outStr("副本次数已用完", 99);
                }
                else {
                    msgtip.MsgTipManager.outStr("请先挑战通关", 99);
                }
            }
        };
        ResCopyTaskPanel.prototype.enter = function ($e) {
            UIManager.popClikNameFun($e.target.name);
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._curData.data.limLev <= GuidData.player.getLevel()) {
                if (this._curData.num >= this._curData.maxtime) {
                    msgtip.MsgTipManager.outStr("副本次数已用完", 99);
                    return;
                }
                NetManager.getInstance().protocolos.res_instance_enter(this._curData.data.id);
            }
            else {
                msgtip.MsgTipManager.outStr("副本需" + this._curData.data.limLev + "级解锁", 99);
            }
        };
        ResCopyTaskPanel.prototype.addSelfRole = function () {
            this.selfRole = new MonsterUIChar();
            this._bgRender.addModel(this.selfRole);
            //this.selfRole.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            //this.selfRole.setBaseRoleWeapon(GuidData.player.getDivineID(), GuidData.player.getCharType());
            this.resize();
        };
        ResCopyTaskPanel.prototype.refreshRes = function () {
            if (this._slist) {
                this._slist.reget();
            }
        };
        ResCopyTaskPanel.prototype.showList = function () {
            if (!this._slist) {
                this._slist = new ResCopyList();
                this._slist.init(this._baseUiAtlas, this);
            }
            this._slist.show();
        };
        ResCopyTaskPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.selfRole) {
                this.selfRole.resize();
                this.selfRole.scale = 3.0 * UIData.Scale;
                this.selfRole.x = -20 * UIData.Scale;
                this.selfRole.y = -100 * UIData.Scale;
            }
        };
        ResCopyTaskPanel.prototype.addWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.addChild(this._bgAry[i]);
            }
        };
        ResCopyTaskPanel.prototype.removeWinmid = function () {
            for (var i = 0; i < this._bgAry.length; i++) {
                this.removeChild(this._bgAry[i]);
            }
        };
        ResCopyTaskPanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            //this.addChild(this._mainBg);
            this.visiableBtn();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.t_vip_add.skinName, getvipadd("resReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            if (this._baseUiAtlas) {
                //this.draw();
                this.addWinmid();
                this.showList();
            }
        };
        ResCopyTaskPanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
            this._slist.hide();
        };
        return ResCopyTaskPanel;
    }(UIConatiner));
    copytask.ResCopyTaskPanel = ResCopyTaskPanel;
    /**list */
    var ResCopyList = /** @class */ (function (_super) {
        __extends(ResCopyList, _super);
        function ResCopyList() {
            return _super.call(this) || this;
        }
        ResCopyList.prototype.init = function ($atlas, $panel) {
            this._panel = $panel;
            this.baseAtlas = $atlas;
            this.initData();
        };
        ResCopyList.prototype.initData = function () {
            var ary = this.getDataAry();
            var w = 312;
            var h = 434;
            this.setData(ary, ResCopyListItemRender, w, h, 310, 80, 5, 512, 512, 1, 6, 2);
            this.center = -280;
            this.middle = 40;
            this.setShowLevel(4);
            this.setSelectIndex(0);
            this._panel.draw(ary[0].data);
            this.resize();
        };
        ResCopyList.prototype.setSelect = function ($item) {
            if ($item.itdata && $item.itdata.data) {
                _super.prototype.setSelect.call(this, $item);
                this._panel.draw($item.itdata.data);
            }
        };
        ResCopyList.prototype.reget = function () {
            this.refreshData(this.getDataAry());
        };
        ResCopyList.prototype.getDataAry = function () {
            var tabarr = fb.FuBenModel.getInstance().getFubenResItem();
            var ary = new Array();
            var nodeList = RedPointManager.getInstance().getNodeByID(122).children;
            for (var i = 0; i < tabarr.length; i++) {
                nodeList[i].data = tabarr[i];
                tabarr[i].node = nodeList[i];
                var data = new SListItemData();
                data.data = tabarr[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        };
        ResCopyList.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
        };
        ResCopyList.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
        };
        return ResCopyList;
    }(SList));
    copytask.ResCopyList = ResCopyList;
    var ResCopyListItemRender = /** @class */ (function (_super) {
        __extends(ResCopyListItemRender, _super);
        function ResCopyListItemRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._curDataID = -1;
            _this._vipTime = -1;
            return _this;
        }
        ResCopyListItemRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            var topRender = $customizeRenderAry[0];
            var cententRender = $customizeRenderAry[1];
            this._ibg = this.creatGrid9SUI($baseRender, this.parentTarget.baseAtlas, "sa_bg", 2, 2, 303, 78, 10, 10);
            $container.addChild(this._ibg);
            this._ibg.addEventListener(InteractiveEvent.Down, this.onclick, this);
            this._name = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_lab1", 72, 15, 120, 20);
            $container.addChild(this._name);
            this._lev = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_lab2", 192, 15, 120, 20);
            $container.addChild(this._lev);
            this._numlab = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_lab3", 131, 43, 120, 22);
            $container.addChild(this._numlab);
            // this._viplab = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_lab4", 192, 43, 120, 20);
            // $container.addChild(this._viplab);
            this._img = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_img", 3, 3, 107, 74);
            $container.addChild(this._img);
            this._topImg = this.creatSUI(topRender, this.parentTarget.baseAtlas, "sa_top", 0, 0, 61, 60);
            $container.addChild(this._topImg);
            this.Redpoint = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "sa_redpoint", 286, 1, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        };
        ResCopyListItemRender.prototype.onclick = function ($e) {
            UIManager.popClikNameFun("sa_bg");
            this.parentTarget.setSelect(this);
        };
        Object.defineProperty(ResCopyListItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                if (this._selected == val) {
                    return;
                }
                this._selected = val;
                this.drawSel();
            },
            enumerable: true,
            configurable: true
        });
        ResCopyListItemRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            }
            else {
                this.setnull();
            }
        };
        ResCopyListItemRender.prototype.setnull = function () {
            this.uiAtlas.clearCtxTextureBySkilname(this._name.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._lev.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._numlab.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._ibg.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._img.skinName);
            this.uiAtlas.clearCtxTextureBySkilname(this._topImg.skinName);
            this.Redpoint.preHide();
        };
        ResCopyListItemRender.prototype.drawSel = function () {
            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_select);
            }
            else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            }
        };
        ResCopyListItemRender.prototype.applyRender = function () {
            var bd = this.itdata.data;
            if (bd.node) {
                bd.node.bindUI(this.Redpoint);
            }
            this.drawSel();
            if (this._curDataID != bd.data.id) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, bd.data.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }
            var levStr = ColorType.color9a683f + "需要等级：" + (GuidData.player.getLevel() < bd.data.limLev ? ColorType.colorcd2000 : ColorType.Green2ca937) + bd.data.limLev;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lev.skinName, levStr, 14, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._numlab.skinName, ColorType.color9a683f + "今日次数：" + ColorType.Green2ca937 + (bd.maxtime - bd.num) + "/" + bd.maxtime, 18, TextAlign.CENTER, ColorType.Brown7a2f21);
            if (this._vipTime != bd.vipAddTime) {
                // var vipStr: string;
                // if (bd.vipAddTime == 0) {
                //     vipStr = "VIP可增加次数";
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this._viplab.skinName, vipStr, 14, TextAlign.LEFT, ColorType.colorff7200);
                // } else {
                //     vipStr = "+" + bd.vipAddTime + "（V" + GuidData.player.getVipLevel() + "特权）";
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this._viplab.skinName, vipStr, 14, TextAlign.LEFT, ColorType.colorff7200);
                // }
                this._vipTime = bd.vipAddTime;
            }
            if (this._curDataID != bd.data.id) {
                this.uiAtlas.upDataPicToTexture("ui/load/rescopy/" + bd.data.id + ".png", this._img.skinName);
                this.uiAtlas.upDataPicToTexture("ui/load/rescopy/t" + bd.data.id + ".png", this._topImg.skinName);
            }
            this._curDataID = bd.data.id;
        };
        return ResCopyListItemRender;
    }(SListItem));
    copytask.ResCopyListItemRender = ResCopyListItemRender;
    /**end list */
})(copytask || (copytask = {}));
//# sourceMappingURL=ResCopyTaskPanel.js.map