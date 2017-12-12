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
var activity;
(function (activity) {
    var ActivityModule = /** @class */ (function (_super) {
        __extends(ActivityModule, _super);
        function ActivityModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActivityModule.prototype.getModuleName = function () {
            return "ActivityModule";
        };
        ActivityModule.prototype.listProcessors = function () {
            return [new ActivityProcessor()];
        };
        return ActivityModule;
    }(Module));
    activity.ActivityModule = ActivityModule;
    var ActivityEvent = /** @class */ (function (_super) {
        __extends(ActivityEvent, _super);
        function ActivityEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        ActivityEvent.SHOW_ACTIVITY_EVENT = "SHOW_ACTIVITY_EVENT";
        //隐藏面板
        ActivityEvent.HIDE_ACTIVITY_EVENT = "HIDE_ACTIVITY_EVENT";
        //数据更改
        ActivityEvent.ACTIVITY_CHANGE_EVENT = "ACTIVITY_CHANGE_EVENT";
        ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT = "ACTIVITY_ITEM_CHANGE_EVENT";
        ActivityEvent.ACTIVITY_REWARD_EVENT = "ACTIVITY_REWARD_EVENT";
        ActivityEvent.ACTIVITY_TABREDPOINT_EVENT = "ACTIVITY_TABREDPOINT_EVENT";
        return ActivityEvent;
    }(BaseEvent));
    activity.ActivityEvent = ActivityEvent;
    var ActivityProcessor = /** @class */ (function (_super) {
        __extends(ActivityProcessor, _super);
        function ActivityProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActivityProcessor.prototype.getName = function () {
            return "ActivityProcessor";
        };
        ActivityProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof ActivityEvent) {
                this.processRedPoint();
                var $givingUiEvent = $event;
                if ($givingUiEvent.type == ActivityEvent.SHOW_ACTIVITY_EVENT) {
                    this.showUi();
                }
                else if ($givingUiEvent.type == ActivityEvent.HIDE_ACTIVITY_EVENT) {
                    this.hideUi();
                }
                else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT) {
                    var idx = $givingUiEvent.data;
                    var id = idx - SharedDef.INSTANCE_INT_FIELD_ACTIVE_START + 1;
                    // console.log("活动数据变化 id:" + id + " 次数：" + GuidData.instanceData.getActivityNum(idx));
                }
                else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_CHANGE_EVENT) {
                    // console.log("活跃度数值：" + GuidData.instanceData.getActivity());
                }
                else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_REWARD_EVENT) {
                    // console.log("奖励状态",GuidData.instanceData.getActivityRewardState())
                    this.refreshRewardSate();
                }
                else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_TABREDPOINT_EVENT) {
                    this.refreshTabAndRedpoint();
                }
            }
            else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent = $event;
                if (panelEvent.panel == this._activityUiPanel) {
                    this._activityUiPanel.dispose();
                    this._activityUiPanel = null;
                    console.log("释放面板 _activityUiPanel");
                }
            }
        };
        ActivityProcessor.prototype.processRedPoint = function () {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ACTIVE, SharedDef.MODULE_ACTIVE_ALL)) {
                var node116 = RedPointManager.getInstance().getNodeByID(116);
                node116.show = false;
                var $tabAryReward = tb.TB_activity_reward.get_TB_activity_reward();
                var $rewardState = GuidData.instanceData.getActivityRewardState();
                for (var i = 0; i < $tabAryReward.length; i++) {
                    if (GuidData.instanceData.getActivity() >= $tabAryReward[i].active) {
                        if (!$rewardState[i * 2]) {
                            node116.show = true;
                            i = $tabAryReward.length;
                            return;
                        }
                        if (GuidData.player.getIsVIP() && !$rewardState[i * 2 + 1] && $tabAryReward[i].vipreward && $tabAryReward[i].vipreward.length > 0) {
                            node116.show = true;
                            i = $tabAryReward.length;
                            return;
                        }
                    }
                }
                var aryitem = activity.ActivityModel.getInstance().getList(activity.ActivityType.ALL);
                for (var j = 0; j < aryitem.length; j++) {
                    if (aryitem[j].state == 1 && !aryitem[j].canreceive) {
                        node116.show = true;
                        j = aryitem.length;
                        return;
                    }
                }
            }
        };
        ActivityProcessor.prototype.refreshTabAndRedpoint = function () {
            if (this._activityUiPanel && this._activityUiPanel.everydayActivityList && this._activityUiPanel.everydayActivityList.hasStage) {
                this._activityUiPanel.everydayActivityList.refreshDataByNewData(activity.ActivityType.ALL);
            }
        };
        ActivityProcessor.prototype.refreshRewardSate = function () {
            if (this._activityUiPanel && this._activityUiPanel.hasStage) {
                this._activityUiPanel.resetRewardState();
            }
        };
        ActivityProcessor.prototype.hideUi = function () {
            this._activityUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        };
        ActivityProcessor.prototype.showUi = function () {
            var _this = this;
            if (!this._activityUiPanel) {
                this._activityUiPanel = new activity.ActivityUiPanel();
            }
            this._activityUiPanel.load(function () {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                _this._activityUiPanel.show();
            });
        };
        ActivityProcessor.prototype.listenModuleEvents = function () {
            return [
                new ActivityEvent(ActivityEvent.SHOW_ACTIVITY_EVENT),
                new ActivityEvent(ActivityEvent.HIDE_ACTIVITY_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_CHANGE_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_REWARD_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_TABREDPOINT_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
            ];
        };
        return ActivityProcessor;
    }(BaseProcessor));
    activity.ActivityProcessor = ActivityProcessor;
})(activity || (activity = {}));
//# sourceMappingURL=ActivityProcessor.js.map