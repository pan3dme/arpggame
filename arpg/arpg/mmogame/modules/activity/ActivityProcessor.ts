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

        public static ACTIVITY_REFRESHTIME_EVENT: string = "ACTIVITY_REFRESHTIME_EVENT";

        public static USEEXPCARD_EVENT: string = "USEEXPCARD_EVENT";


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
                } else if ($givingUiEvent.type == ActivityEvent.USEEXPCARD_EVENT) {
                    this.useExpCard($givingUiEvent.data);
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT) {
                    var idx: number = $givingUiEvent.data;
                    var id: number = idx - SharedDef.INSTANCE_INT_FIELD_ACTIVE_START + 1;
                    console.log("活动数据变化 id:" + id + " 次数：" + GuidData.instanceData.getActivityNum(idx));
                    this.refreshTabAndRedpoint();//次数变化刷新列表
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_CHANGE_EVENT) {
                    if (this._activityUiPanel && this._activityUiPanel.hasStage) {
                        var num: number = GuidData.instanceData.getActivity();
                        this._activityUiPanel.setProgressAndAchievement(num);
                    }
                    // //console.log("活跃度数值：" + );
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_REWARD_EVENT) {
                    // //console.log("奖励状态",GuidData.instanceData.getActivityRewardState())
                    this.refreshRewardSate();
                } else if ($givingUiEvent.type == ActivityEvent.ACTIVITY_REFRESHTIME_EVENT) {
                    if (this._activityUiPanel && this._activityUiPanel.hasStage) {
                        this._activityUiPanel.refreshTime();
                    }
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
                    //console.log("释放面板 _activityUiPanel")
                }
            }
        }

        private processRedPoint(): void {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ACTIVE, SharedDef.MODULE_ACTIVE_ALL)) {
                //先判断tab页签红点。如果tab页签红点不需要显示，在判断奖励。
                var flag: boolean = false;
                var aryitem1: Array<ActivityItemVo> = ActivityModel.getInstance().getList(ActivityType.DAILY);
                for (var j = 0; j < aryitem1.length; j++) {
                    if (aryitem1[j].state == 1 && !aryitem1[j].canreceive) {
                        RedPointManager.getInstance().getNodeByID(129).show = true;
                        j = aryitem1.length;
                        flag = true;
                    }
                }

                if (!flag) {
                    RedPointManager.getInstance().getNodeByID(129).show = false;
                }

                var aryitem2: Array<ActivityItemVo> = ActivityModel.getInstance().getList(ActivityType.TIMELIMIT);
                for (var k = 0; k < aryitem2.length; k++) {
                    if (aryitem2[k].state == 1 && !aryitem2[k].canreceive) {
                        RedPointManager.getInstance().getNodeByID(130).show = true;
                        k = aryitem2.length;
                        flag = true;
                    }
                }

                if (flag) {
                    return;
                }else{
                    RedPointManager.getInstance().getNodeByID(130).show = false;
                }

                var node116: RedPointNode = RedPointManager.getInstance().getNodeByID(116);
                node116.show = false;
                //奖励是否领取
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

            }
        }

        private useExpCard($id:number) {
            var $templateobj: any = TableData.getInstance().getData(TableData.tb_item_template, 242);
            var $expobj: any = TableData.getInstance().getData(TableData.tb_offline_exp_base, 1);
            var using_effect: number = $templateobj["using_effect"][0];
            var hanguptime: number = GuidData.player.getHangUpTime();
            var alltime: number = Number(using_effect) + Number(hanguptime);
            var strinfo: string;
            if (alltime > $expobj["limitMins"]) {
                strinfo = ColorType.Brown7a2f21 + "使用该道具后你的离线挂机总时间将溢出，溢出部分无法获得，是否继续?";
            } else {
                strinfo = ColorType.Brown7a2f21 + "是否使用离线挂机卡增加" + (using_effect / 60) + "小时的离线时间？"
            }
            AlertUtil.show(strinfo, "",
                (val: number) => {
                    if (val == 1) {
                        GuidData.bag.useItem($id)
                    }
                }, 2, ["是", "否"])
        }

        private refreshTabAndRedpoint(): void {
            if (this._activityUiPanel && this._activityUiPanel.everydayActivityList && this._activityUiPanel.everydayActivityList.hasStage) {
                this._activityUiPanel.everydayActivityList.refreshDataByNewData();
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

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_ACTIVE
                ModuleEventManager.dispatchEvent($scenePange);

            })

        }



        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ActivityEvent(ActivityEvent.SHOW_ACTIVITY_EVENT),
                new ActivityEvent(ActivityEvent.HIDE_ACTIVITY_EVENT),
                new ActivityEvent(ActivityEvent.USEEXPCARD_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_CHANGE_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_REWARD_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_TABREDPOINT_EVENT),
                new ActivityEvent(ActivityEvent.ACTIVITY_REFRESHTIME_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
            ];
        }
    }

}