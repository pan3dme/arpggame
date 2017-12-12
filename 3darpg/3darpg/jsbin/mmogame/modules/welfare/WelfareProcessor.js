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
    var WelfareModule = /** @class */ (function (_super) {
        __extends(WelfareModule, _super);
        function WelfareModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WelfareModule.prototype.getModuleName = function () {
            return "WelfareModule";
        };
        WelfareModule.prototype.listProcessors = function () {
            return [new WelfareProcessor()];
        };
        return WelfareModule;
    }(Module));
    welfare.WelfareModule = WelfareModule;
    var WelfareEvent = /** @class */ (function (_super) {
        __extends(WelfareEvent, _super);
        function WelfareEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        WelfareEvent.SHOW_Welfare_EVENT = "SHOW_Welfare_EVENT";
        //隐藏面板
        WelfareEvent.HIDE_Welfare_EVENT = "HIDE_Welfare_EVENT";
        //选中Tab，打开相对应的面板事件
        WelfareEvent.SELECTTAB_Welfare_EVENT = "SELECTTAB_Welfare_EVENT";
        //刷新Tab事件
        WelfareEvent.REFRESHTAB_Welfare_EVENT = "REFRESHTAB_Welfare_EVENT";
        //累计签到状态
        WelfareEvent.ALLCHECKIN_Welfare_EVENT = "ALLCHECKIN_Welfare_EVENT";
        //每日签到状态
        WelfareEvent.EveryDayCHECKIN_Welfare_EVENT = "EveryDayCHECKIN_Welfare_EVENT";
        //升级奖励状态改变
        WelfareEvent.RECEIVELEVELREWARD_Welfare_EVENT = "RECEIVELEVELREWARD_Welfare_EVENT";
        //消耗有奖状态改变
        WelfareEvent.RECEIVECOSTREWARD_Welfare_EVENT = "RECEIVECOSTREWARD_Welfare_EVENT";
        //充值返利状态改变
        WelfareEvent.RECEIVERECHARGEREWARD_Welfare_EVENT = "RECEIVERECHARGEREWARD_Welfare_EVENT";
        //七日礼包状态改变
        WelfareEvent.RECEIVESEVENDAYREWARD_Welfare_EVENT = "RECEIVESEVENDAYREWARD_Welfare_EVENT";
        //找回数据改变时
        WelfareEvent.GETBACKREWARD_Welfare_EVENT = "GETBACKREWARD_Welfare_EVENT";
        //找回弹窗打开
        WelfareEvent.OPPENWIN_Welfare_EVENT = "OPPENWIN_Welfare_EVENT";
        //补签小弹窗
        WelfareEvent.OPPENWIN_Vip_Welfare_EVENT = "OPPENWIN_Vip_Welfare_EVENT";
        //签到小弹窗
        WelfareEvent.OPPENWIN_Qiandao_Welfare_EVENT = "OPPENWIN_Qiandao_Welfare_EVENT";
        //红点变化
        WelfareEvent.CHG_REDPOINT = "CHG_REDPOINT";
        return WelfareEvent;
    }(BaseEvent));
    welfare.WelfareEvent = WelfareEvent;
    var WelfareProcessor = /** @class */ (function (_super) {
        __extends(WelfareProcessor, _super);
        function WelfareProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._nodeInit = false;
            return _this;
        }
        WelfareProcessor.prototype.getName = function () {
            return "WelfareProcessor";
        };
        WelfareProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof WelfareEvent) {
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == WelfareEvent.SHOW_Welfare_EVENT) {
                    this.showUi($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == WelfareEvent.HIDE_Welfare_EVENT) {
                    this.hideUi();
                }
                else if ($givingUiEvent.type == WelfareEvent.SELECTTAB_Welfare_EVENT) {
                    this.selecttabpanel($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == WelfareEvent.REFRESHTAB_Welfare_EVENT) {
                    this.refreshTab();
                }
                else if ($givingUiEvent.type == WelfareEvent.ALLCHECKIN_Welfare_EVENT) {
                    this.allcheckinchange();
                }
                else if ($givingUiEvent.type == WelfareEvent.EveryDayCHECKIN_Welfare_EVENT) {
                    this.everydaycheckinchange();
                }
                else if ($givingUiEvent.type == WelfareEvent.RECEIVECOSTREWARD_Welfare_EVENT) {
                    this.receivecousumereward();
                }
                else if ($givingUiEvent.type == WelfareEvent.RECEIVERECHARGEREWARD_Welfare_EVENT) {
                    this.receiverechargereward();
                }
                else if ($givingUiEvent.type == WelfareEvent.RECEIVESEVENDAYREWARD_Welfare_EVENT) {
                    this.receivesevendayreward();
                }
                else if ($givingUiEvent.type == WelfareEvent.RECEIVELEVELREWARD_Welfare_EVENT) {
                    this.receivelevelreward();
                }
                else if ($givingUiEvent.type == WelfareEvent.GETBACKREWARD_Welfare_EVENT) {
                    this.getbackrewardreward();
                }
                else if ($givingUiEvent.type == WelfareEvent.OPPENWIN_Welfare_EVENT) {
                    this.openwinevent($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == WelfareEvent.OPPENWIN_Vip_Welfare_EVENT) {
                    this.openwinvipevent();
                }
                else if ($givingUiEvent.type == WelfareEvent.OPPENWIN_Qiandao_Welfare_EVENT) {
                    this.openwinqiandaoevent($givingUiEvent.data);
                }
                else if ($givingUiEvent.type == WelfareEvent.CHG_REDPOINT) {
                    this.processRedPoint();
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
                // } else if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                //     this.processRedPoint();
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._welfareUiPanel) {
                    var pnode113 = RedPointManager.getInstance().getNodeByID(113).children;
                    for (var i = 0; i < pnode113.length; i++) {
                        pnode113[i].unBind();
                    }
                    this._welfareUiPanel.dispose();
                    this._welfareUiPanel = null;
                    console.log("释放面板 _welfareUiPanel");
                }
            }
        };
        WelfareProcessor.prototype.initRedNode = function () {
            if (this._nodeInit) {
                return;
            }
            var pnode = RedPointManager.getInstance().getNodeByID(113);
            for (var i = 0; i < 5; i++) {
                var node = new RedPointNode();
                pnode.addChild(node);
            }
            this._nodeInit = true;
            //将刷新红点的方法，放置计时器中，1秒钟刷新一次
            this.processRedPoint();
        };
        WelfareProcessor.prototype.processRedPoint = function () {
            if (!this._nodeInit) {
                //未初始化
                return;
            }
            var ary = RedPointManager.getInstance().getNodeByID(113).children;
            for (var i = 0; i < ary.length; i++) {
                ary[i].show = false;
                if (!GuidData.player.getsyspageopen(SharedDef.MODULE_WELFARE, i + 1)) {
                    continue;
                }
                switch (i + 1) {
                    case SharedDef.MODULE_WELFARE_MONTH:
                        var a = GuidData.quest.getSigninEveryDayVoList();
                        for (var j = 0; j < a.length; j++) {
                            if (a[j].state == 2) {
                                ary[i].show = true;
                                j = a.length;
                            }
                        }
                        var $arytabvo = GuidData.quest.getSigninWeekList();
                        for (var index = 0; index < $arytabvo.length; index++) {
                            if ($arytabvo[index].state == 2) {
                                ary[i].show = true;
                                index = $arytabvo.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_LEVEL:
                        var b = GuidData.quest.getLevelUpRewardList();
                        for (var k = 0; k < b.length; k++) {
                            if (b[k].state == 1) {
                                ary[i].show = true;
                                k = b.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_SEVEN:
                        var c = GuidData.quest.getSevenDayList();
                        for (var m = 0; m < c.length; m++) {
                            if (c[m].state == 1) {
                                ary[i].show = true;
                                m = c.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_RECHARGE:
                        var d = GuidData.quest.getRechargeRewardList();
                        for (var n = 0; n < d.length; n++) {
                            if (d[n].state == 1) {
                                ary[i].show = true;
                                n = d.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_CONSUME:
                        var e = GuidData.quest.getCostRewardList();
                        for (var v = 0; v < e.length; v++) {
                            if (e[v].state == 1) {
                                ary[i].show = true;
                                v = e.length;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        WelfareProcessor.prototype.openwinvipevent = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.hasStage) {
                this._welfareUiPanel.showVipPop();
            }
        };
        WelfareProcessor.prototype.openwinqiandaoevent = function ($data) {
            if (this._welfareUiPanel && this._welfareUiPanel.hasStage) {
                this._welfareUiPanel.showBuqianPop($data);
            }
        };
        WelfareProcessor.prototype.openwinevent = function ($data) {
            // if (this._welfareUiPanel && this._welfareUiPanel.welfareComeback && this._welfareUiPanel.welfareComeback.hasStage) {
            //     console.log("---$data----", $data);
            //     this._welfareUiPanel.welfareComeback.singleBackPanel.show($data);
            // }
        };
        WelfareProcessor.prototype.getbackrewardreward = function () {
            // if (this._welfareUiPanel && this._welfareUiPanel.welfareComeback && this._welfareUiPanel.welfareComeback.hasStage) {
            //     this._welfareUiPanel.welfareComeback.selecttype(this._welfareUiPanel.welfareComeback.type);
            //     this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            // }
        };
        WelfareProcessor.prototype.receivelevelreward = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareLevel && this._welfareUiPanel.welfareLevel.hasStage) {
                this._welfareUiPanel.welfareLevel.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        };
        WelfareProcessor.prototype.receiverechargereward = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareRecharge && this._welfareUiPanel.welfareRecharge.hasStage) {
                this._welfareUiPanel.welfareRecharge.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        };
        WelfareProcessor.prototype.receivecousumereward = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareCost && this._welfareUiPanel.welfareCost.hasStage) {
                this._welfareUiPanel.welfareCost.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        };
        WelfareProcessor.prototype.receivesevendayreward = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareSevenDay && this._welfareUiPanel.welfareSevenDay.hasStage) {
                this._welfareUiPanel.welfareSevenDay.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        };
        WelfareProcessor.prototype.everydaycheckinchange = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareEveryCheckin && this._welfareUiPanel.welfareEveryCheckin.hasStage) {
                this._welfareUiPanel.welfareEveryCheckin.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        };
        WelfareProcessor.prototype.allcheckinchange = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareEveryCheckin && this._welfareUiPanel.welfareEveryCheckin.hasStage) {
                this._welfareUiPanel.welfareEveryCheckin.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        };
        WelfareProcessor.prototype.refreshTab = function () {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareTabList && this._welfareUiPanel.welfareTabList.hasStage) {
                this._welfareUiPanel.welfareTabList.refreshAndselectIndex();
            }
        };
        WelfareProcessor.prototype.selecttabpanel = function ($type) {
            if (this._welfareUiPanel && this._welfareUiPanel.hasStage) {
                this._welfareUiPanel.selecttype($type);
            }
        };
        WelfareProcessor.prototype.hideUi = function () {
            this._welfareUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        WelfareProcessor.prototype.showUi = function ($type) {
            var _this = this;
            if (!this._welfareUiPanel) {
                this._welfareUiPanel = new welfare.WelfareUiPanel();
            }
            this._welfareUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._welfareUiPanel.show($type);
            });
        };
        WelfareProcessor.prototype.getbackResultList = function ($byte) {
            var rewardStr = $byte.readUTF();
            var costStr = $byte.readUTF();
            var b = costStr.split(",");
            var a = new rewardList_getback();
            a.items = rewardStr.split(",");
            a.cost = Number(b[1]);
            a.costtype = Number(b[0]);
            // if (this._welfareUiPanel && this._welfareUiPanel.welfareComeback && this._welfareUiPanel.welfareComeback.hasStage) {
            //     this._welfareUiPanel.welfareComeback.showpop(a);
            // }
        };
        WelfareProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_WELFARE_REWARDLIST_GETBACK] = function ($byte) { _this.getbackResultList($byte); };
            return obj;
        };
        WelfareProcessor.prototype.listenModuleEvents = function () {
            return [
                new WelfareEvent(WelfareEvent.SHOW_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.HIDE_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.SELECTTAB_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.REFRESHTAB_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.ALLCHECKIN_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.EveryDayCHECKIN_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.RECEIVELEVELREWARD_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.RECEIVECOSTREWARD_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.RECEIVERECHARGEREWARD_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.RECEIVESEVENDAYREWARD_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.GETBACKREWARD_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.OPPENWIN_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.OPPENWIN_Vip_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.OPPENWIN_Qiandao_Welfare_EVENT),
                new WelfareEvent(WelfareEvent.CHG_REDPOINT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        return WelfareProcessor;
    }(BaseProcessor));
    welfare.WelfareProcessor = WelfareProcessor;
    var rewardList_getback = /** @class */ (function () {
        function rewardList_getback() {
        }
        return rewardList_getback;
    }());
    welfare.rewardList_getback = rewardList_getback;
})(welfare || (welfare = {}));
//# sourceMappingURL=WelfareProcessor.js.map