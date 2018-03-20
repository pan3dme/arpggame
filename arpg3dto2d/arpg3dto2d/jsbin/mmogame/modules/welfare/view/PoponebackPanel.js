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
var welfare;
(function (welfare) {
    var PoponebackVo = /** @class */ (function () {
        function PoponebackVo() {
        }
        return PoponebackVo;
    }());
    welfare.PoponebackVo = PoponebackVo;
    var PoponebackPanel = /** @class */ (function (_super) {
        __extends(PoponebackPanel, _super);
        function PoponebackPanel() {
            var _this = _super.call(this) || this;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this.middle = 0;
            _this.center = 0;
            //添加好友面板渲染器
            _this._AbgRender = new UIRenderComponent;
            _this.addRender(_this._AbgRender);
            _this._AbottomRender = new UIRenderComponent;
            _this.addRender(_this._AbottomRender);
            _this._AbaseRender = new UIRenderComponent;
            _this.addRender(_this._AbaseRender);
            return _this;
            // this._AtopRender1 = new UIRenderComponent;
            // this.addRender(this._AtopRender1)
            // this._AtopRender2 = new UIRenderComponent;
            // this.addRender(this._AtopRender2)
            // this._AtopRender3 = new UIRenderComponent;
            // this.addRender(this._AtopRender3)
        }
        // private _AtopRender1: UIRenderComponent;
        // private _AtopRender2: UIRenderComponent;
        // private _AtopRender3: UIRenderComponent;
        PoponebackPanel.prototype.dispose = function () {
            // this._AbgRender.dispose();
            // this._AbgRender = null;
            // this._AbottomRender.dispose();
            // this._AbottomRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
        };
        PoponebackPanel.prototype.init = function ($uiAtlas, $publicuiAtlas) {
            this._AbgRender.uiAtlas = $publicuiAtlas;
            this._AbottomRender.uiAtlas = $publicuiAtlas;
            this._AbaseRender.uiAtlas = $uiAtlas;
            // this._AtopRender1.uiAtlas = $uiAtlas;
            // this._AtopRender2.uiAtlas = $uiAtlas;
            // this._AtopRender3.uiAtlas = $uiAtlas;
            this.loadConfigCom();
        };
        PoponebackPanel.prototype.loadConfigCom = function () {
            this.bg_2_1 = this.addEvntBut("baseBg", this._AbgRender);
            var guiBg0 = this.addChild(this._AbgRender.getComponent("guiBg0"));
            guiBg0.x = 278;
            guiBg0.y = 53;
            guiBg0.width = 399;
            guiBg0.height = 430;
            var guiBg1 = this.addChild(this._AbgRender.getComponent("guiBg1"));
            guiBg1.x = 287;
            guiBg1.y = 136;
            guiBg1.width = 381;
            guiBg1.height = 276;
            this._AbgRender.applyObjData();
            var titleBg = this.addChild(this._AbottomRender.getComponent("titleBg"));
            titleBg.x = 374;
            titleBg.y = 66;
            titleBg.width = 219;
            this.but_qx = this.addEvntButUp("but_1", this._AbottomRender);
            this.but_qx.x = 325;
            this.but_qx.y = 421;
            this.but_qr = this.addEvntButUp("but_1", this._AbottomRender);
            this.but_qr.x = 505;
            this.but_qr.y = 421;
            var qx = this.addChild(this._AbottomRender.getComponent("qx"));
            qx.x = 362;
            qx.y = 433;
            var qr = this.addChild(this._AbottomRender.getComponent("qr"));
            qr.x = 543;
            qr.y = 433;
            var renderLevel = this._AbaseRender;
            this.addChild(renderLevel.getComponent("a_56"));
            this.a_7 = this.addChild(renderLevel.getComponent("a_7"));
            this.a_11 = this.addChild(renderLevel.getComponent("a_11"));
            this.addUIList(["a_51", "a_52", "a_53"], renderLevel);
            this.cost = this.addChild(renderLevel.getComponent("a_54"));
            this.costtype = this.addChild(renderLevel.getComponent("a_55"));
        };
        PoponebackPanel.prototype.initData = function () {
            var type = this._data.costtype ? 50 : 100;
            this.drawCost();
            ArtFont.getInstance().writeFontToSkinName(this._AbaseRender.uiAtlas, this.costtype.skinName, type + "%", this._data.costtype ? ArtFont.num7 : ArtFont.num3, TextAlign.LEFT, this._data.costtype ? 2 : 4);
            if (this._data.costtype) {
                this.a_7.goToAndStop(0);
            }
            else {
                this.a_7.goToAndStop(1);
            }
            if (!this.rewardMsgList) {
                this.rewardMsgList = new RewardMsgList();
                this.rewardMsgList.init(this._AbaseRender.uiAtlas);
            }
            this.rewardMsgList.show(this._data.items);
            this.resize();
        };
        PoponebackPanel.prototype.drawCost = function () {
            var $goldtxtrec = this._AbaseRender.uiAtlas.getRec(this.cost.skinName);
            var $ctx = UIManager.getInstance().getContext2D($goldtxtrec.pixelWitdh, $goldtxtrec.pixelHeight, false);
            if (this._data.costtype) {
                //银币
                UiDraw.cxtDrawImg($ctx, PuiData.A_YINBI, new Rectangle(0, 0, 20, 20), UIData.publicUi);
            }
            else {
                //元宝
                UiDraw.cxtDrawImg($ctx, PuiData.A_YUANBAO, new Rectangle(0, 0, 20, 20), UIData.publicUi);
            }
            ArtFont.getInstance().writeFontToCtxLeft($ctx, String(this._data.cost), this._data.costtype ? ArtFont.num7 : ArtFont.num3, 21, 3, 4);
            this._AbaseRender.uiAtlas.updateCtx($ctx, $goldtxtrec.pixelX, $goldtxtrec.pixelY);
        };
        PoponebackPanel.prototype.type2str = function ($type) {
            var $str;
            switch ($type) {
                case 0:
                    $str = "元宝";
                    break;
                case 2:
                    $str = "银币";
                    break;
                default:
                    break;
            }
            return $str;
        };
        PoponebackPanel.prototype.resize = function () {
            this.bg_2_1.top = 0;
            this.bg_2_1.left = 0;
            this.bg_2_1.y = 0;
            this.bg_2_1.x = 0;
            this.bg_2_1.height = Scene_data.stageHeight / UIData.Scale;
            this.bg_2_1.width = Scene_data.stageWidth / UIData.Scale;
            _super.prototype.resize.call(this);
            if (this.rewardMsgList) {
                this.rewardMsgList.left = this.a_11.parent.x / UIData.Scale + this.a_11.x - 6;
                this.rewardMsgList.top = this.a_11.parent.y / UIData.Scale + this.a_11.y + 26;
            }
        };
        PoponebackPanel.prototype.show = function ($data) {
            this._data = $data;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.initData();
        };
        PoponebackPanel.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.rewardMsgList) {
                this.rewardMsgList.hide();
            }
        };
        PoponebackPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.but_qx:
                    this.hide();
                    break;
                case this.but_qr:
                    if (this._data.cost > this.type2res(this._data.costtype)) {
                        // alert("资源不足");
                        msgtip.MsgTipManager.outStrById(22, 29);
                    }
                    else {
                        var $type = this._data.costtype ? 0 : 1;
                        NetManager.getInstance().protocolos.welfare_getall_getback($type);
                        this.hide();
                    }
                    break;
                default:
                    break;
            }
        };
        PoponebackPanel.prototype.type2res = function ($type) {
            switch ($type) {
                case 0:
                    return GuidData.player.getGoldIngot();
                case 2:
                    return GuidData.player.getSilver();
                default:
                    break;
            }
        };
        return PoponebackPanel;
    }(UIConatiner));
    welfare.PoponebackPanel = PoponebackPanel;
    /**
     * 奖励信息list
     */
    var RewardMsgList = /** @class */ (function (_super) {
        __extends(RewardMsgList, _super);
        function RewardMsgList() {
            var _this = _super.call(this) || this;
            _this.left = 372;
            _this.top = 198;
            return _this;
        }
        RewardMsgList.prototype.init = function ($uiAtlas) {
            RewardMsgListRender.baseAtlas = $uiAtlas;
            this.initData();
        };
        RewardMsgList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, RewardMsgListRender, 256, 230, 0, 21, 11, 256, 256, 1, 12);
        };
        /**
         * refreshData
         */
        RewardMsgList.prototype.refreshDataByNewData = function () {
            var $sListItemData = this.getData(this._ary);
            this.refreshData($sListItemData);
        };
        RewardMsgList.prototype.getData = function ($data) {
            var ary = new Array;
            for (var i = 0; i < $data.length; i = i + 2) {
                if ($data[i].length > 0) {
                    var vo = new PoponebackVo();
                    vo.num = Number($data[i + 1]);
                    vo.type = Number($data[i]);
                    var item = new SListItemData;
                    item.data = vo;
                    item.id = i;
                    ary.push(item);
                }
            }
            return ary;
        };
        RewardMsgList.prototype.show = function ($data) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._ary = $data;
            this.refreshDataByNewData();
        };
        RewardMsgList.prototype.hide = function () {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        };
        return RewardMsgList;
    }(SList));
    welfare.RewardMsgList = RewardMsgList;
    var RewardMsgListRender = /** @class */ (function (_super) {
        __extends(RewardMsgListRender, _super);
        function RewardMsgListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;
        RewardMsgListRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            this.I3text = this.creatSUI($baseRender, RewardMsgListRender.baseAtlas, "I3text", 0, 0, 256, 21);
            $container.addChild(this.I3text);
        };
        RewardMsgListRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo = $data.data;
                var entryData = TableData.getInstance().getData(TableData.tb_item_template, vo.type);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.I3text.skinName, entryData.name + " *" + vo.num, 16, TextAlign.CENTER, getColorQua(entryData.quality));
            }
            else {
                this.setnull();
            }
        };
        RewardMsgListRender.prototype.setnull = function () {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I3text.skinName, "", 16, TextAlign.LEFT, "#d6e7ff");
        };
        return RewardMsgListRender;
    }(SListItem));
    welfare.RewardMsgListRender = RewardMsgListRender;
})(welfare || (welfare = {}));
//# sourceMappingURL=PoponebackPanel.js.map