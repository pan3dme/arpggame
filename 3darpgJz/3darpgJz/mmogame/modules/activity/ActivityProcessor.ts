module activity {
    export class ActivityModule extends Module {
        public getModuleName(): string {
            return "ActivityModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new ActivityProcessor()];
        }
    }
    export class ActivityEvent extends BaseEvent {
        //展示面板
        public static SHOW_ACTIVITY_EVENT: string = "SHOW_ACTIVITY_EVENT";
        //隐藏面板
        public static HIDE_ACTIVITY_EVENT: string = "HIDE_ACTIVITY_EVENT";
        //数据更改
        public static ACTIVITY_CHANGE_EVENT: string = "ACTIVITY_CHANGE_EVENT";

        public static ACTIVITY_ITEM_CHANGE_EVENT: string = "ACTIVITY_ITEM_CHANGE_EVENT";

        public static ACTIVITY_REWARD_EVENT: string = "ACTIVITY_REWARD_EVENT";

        public static ACTIVITY_TABREDPOINT_EVENT: string = "ACTIVITY_TABREDPOINT_EVENT";


        public data: any;

    }

    export class ActivityProcessor extends BaseProcessor {
        private _activityUiPanel: ActivityUiPanel

        public getName(): string {
            return "ActivityProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof ActivityEvent) {
                this.processRedPoint();
                var $givingUiEvent: ActivityEvent = <ActivityEvent>$event;
                if ($givingUiEvent.type == ActivityEvent.SHOW_ACTIVITY_EVENT) {
                    this.showUi();
                } else if ($givingUiEvent.type == ActivityEvent.HIDE_ACTIVITY_EVENT) {
                    this.hideUi()
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT) {
                    var idx: number = $givingUiEvent.data;
                    var id: number = idx - SharedDef.INSTANCE_INT_FIELD_ACTIVE_START + 1;
                    // console.log("活动数据变化 id:" + id + " 次数：" + GuidData.instanceData.getActivityNum(idx));
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_CHANGE_EVENT) {
                    // console.log("活跃度数值：" + GuidData.instanceData.getActivity());
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_REWARD_EVENT) {
                    // console.log("奖励状态",GuidData.instanceData.getActivityRewardState())
                    this.refreshRewardSate();
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_TABREDPOINT_EVENT) {
                    this.refreshTabAndRedpoint();
                }
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._activityUiPanel) {
                    this._activityUiPanel.dispose();
                    this._activityUiPanel = null;
                    console.log("释放面板 _activityUiPanel")
                }
            }
        }

        private processRedPoint(): void {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ACTIVE,SharedDef.MODULE_ACTIVE_ALL)) {
                var node116: RedPointNode = RedPointManager.getInstance().getNodeByID(116);
                node116.show = false;
                var $tabAryReward: Array<tb.TB_activity_reward> = tb.TB_activity_reward.get_TB_activity_reward();
                var $rewardState: Array<boolean> = GuidData.instanceData.getActivityRewardState();
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

                var aryitem: Array<ActivityItemVo> = ActivityModel.getInstance().getList(ActivityType.ALL);
                for (var j = 0; j < aryitem.length; j++) {
                    if (aryitem[j].state == 1 && !aryitem[j].canreceive) {
                        node116.show = true;
                        j = aryitem.length;
                        return;
                    }
                }
            }
        }

        private refreshTabAndRedpoint(): void {
            if (this._activityUiPanel && this._activityUiPanel.everydayActivityList && this._activityUiPanel.everydayActivityList.hasStage) {
                this._activityUiPanel.everydayActivityList.refreshDataByNewData(ActivityType.ALL);
            }
        }

        private refreshRewardSate(): void {
            if (this._activityUiPanel && this._activityUiPanel.hasStage) {
                this._activityUiPanel.resetRewardState();
            }
        }

        private hideUi(): void {
            this._activityUiPanel.hide();

            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

        }
        private showUi(): void {
            if (!this._activityUiPanel) {
                this._activityUiPanel = new ActivityUiPanel();
            }
            this._activityUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._activityUiPanel.show();
            })

        }



        protected listenModuleEvents(): Array<BaseEvent> {
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
        }
    }

}