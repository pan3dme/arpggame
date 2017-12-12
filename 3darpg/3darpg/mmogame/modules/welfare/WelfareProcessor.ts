module welfare {
    export class WelfareModule extends Module {
        public getModuleName(): string {
            return "WelfareModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new WelfareProcessor()];
        }
    }
    export class WelfareEvent extends BaseEvent {
        //展示面板
        public static SHOW_Welfare_EVENT: string = "SHOW_Welfare_EVENT";
        //隐藏面板
        public static HIDE_Welfare_EVENT: string = "HIDE_Welfare_EVENT";
        //选中Tab，打开相对应的面板事件
        public static SELECTTAB_Welfare_EVENT: string = "SELECTTAB_Welfare_EVENT";
        //刷新Tab事件
        public static REFRESHTAB_Welfare_EVENT: string = "REFRESHTAB_Welfare_EVENT";
        //累计签到状态
        public static ALLCHECKIN_Welfare_EVENT: string = "ALLCHECKIN_Welfare_EVENT";
        //每日签到状态
        public static EveryDayCHECKIN_Welfare_EVENT: string = "EveryDayCHECKIN_Welfare_EVENT";
        //升级奖励状态改变
        public static RECEIVELEVELREWARD_Welfare_EVENT: string = "RECEIVELEVELREWARD_Welfare_EVENT";
        //消耗有奖状态改变
        public static RECEIVECOSTREWARD_Welfare_EVENT: string = "RECEIVECOSTREWARD_Welfare_EVENT";
        //充值返利状态改变
        public static RECEIVERECHARGEREWARD_Welfare_EVENT: string = "RECEIVERECHARGEREWARD_Welfare_EVENT";
        //七日礼包状态改变
        public static RECEIVESEVENDAYREWARD_Welfare_EVENT: string = "RECEIVESEVENDAYREWARD_Welfare_EVENT";
        //找回数据改变时
        public static GETBACKREWARD_Welfare_EVENT: string = "GETBACKREWARD_Welfare_EVENT";
        //找回弹窗打开
        public static OPPENWIN_Welfare_EVENT: string = "OPPENWIN_Welfare_EVENT";
        //补签小弹窗
        public static OPPENWIN_Vip_Welfare_EVENT: string = "OPPENWIN_Vip_Welfare_EVENT";
        //签到小弹窗
        public static OPPENWIN_Qiandao_Welfare_EVENT: string = "OPPENWIN_Qiandao_Welfare_EVENT";
        //红点变化
        public static CHG_REDPOINT: string = "CHG_REDPOINT";

        public data: any;

    }

    export class WelfareProcessor extends BaseProcessor {
        private _welfareUiPanel: WelfareUiPanel

        public getName(): string {
            return "WelfareProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof WelfareEvent) {
                var $givingUiEvent: WelfareEvent = <WelfareEvent>$event;
                if ($givingUiEvent.type == WelfareEvent.SHOW_Welfare_EVENT) {
                    this.showUi($givingUiEvent.data);
                } else if ($givingUiEvent.type == WelfareEvent.HIDE_Welfare_EVENT) {
                    this.hideUi()
                } else if ($givingUiEvent.type == WelfareEvent.SELECTTAB_Welfare_EVENT) {
                    this.selecttabpanel($givingUiEvent.data);
                } else if ($givingUiEvent.type == WelfareEvent.REFRESHTAB_Welfare_EVENT) {
                    this.refreshTab();
                } else if ($givingUiEvent.type == WelfareEvent.ALLCHECKIN_Welfare_EVENT) {
                    this.allcheckinchange();
                } else if ($givingUiEvent.type == WelfareEvent.EveryDayCHECKIN_Welfare_EVENT) {
                    this.everydaycheckinchange();
                } else if ($givingUiEvent.type == WelfareEvent.RECEIVECOSTREWARD_Welfare_EVENT) {
                    this.receivecousumereward();
                } else if ($givingUiEvent.type == WelfareEvent.RECEIVERECHARGEREWARD_Welfare_EVENT) {
                    this.receiverechargereward();
                } else if ($givingUiEvent.type == WelfareEvent.RECEIVESEVENDAYREWARD_Welfare_EVENT) {
                    this.receivesevendayreward();
                } else if ($givingUiEvent.type == WelfareEvent.RECEIVELEVELREWARD_Welfare_EVENT) {
                    this.receivelevelreward();
                } else if ($givingUiEvent.type == WelfareEvent.GETBACKREWARD_Welfare_EVENT) {
                    this.getbackrewardreward();
                } else if ($givingUiEvent.type == WelfareEvent.OPPENWIN_Welfare_EVENT) {
                    this.openwinevent($givingUiEvent.data);
                } else if ($givingUiEvent.type == WelfareEvent.OPPENWIN_Vip_Welfare_EVENT) {
                    this.openwinvipevent();
                } else if ($givingUiEvent.type == WelfareEvent.OPPENWIN_Qiandao_Welfare_EVENT) {
                    this.openwinqiandaoevent($givingUiEvent.data);
                } else if ($givingUiEvent.type == WelfareEvent.CHG_REDPOINT) {
                    this.processRedPoint();
                }
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            // } else if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
            //     this.processRedPoint();
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._welfareUiPanel) {
                    var pnode113: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(113).children;
                    for (var i = 0; i < pnode113.length; i++) {
                        pnode113[i].unBind();
                    }

                    this._welfareUiPanel.dispose();
                    this._welfareUiPanel = null;
                    console.log("释放面板 _welfareUiPanel")
                }
            }
        }


        private _nodeInit: boolean = false;
        private initRedNode(): void {
            if (this._nodeInit) {
                return;
            }
            var pnode: RedPointNode = RedPointManager.getInstance().getNodeByID(113);

            for (var i: number = 0; i < 5; i++) {
                var node: RedPointNode = new RedPointNode();
                pnode.addChild(node);
            }

            this._nodeInit = true;
            //将刷新红点的方法，放置计时器中，1秒钟刷新一次
            this.processRedPoint();
        }

        private processRedPoint(): void {
            if (!this._nodeInit) {
                //未初始化
                return;
            }
            var ary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(113).children;
            for (var i: number = 0; i < ary.length; i++) {
                ary[i].show = false;

                if (!GuidData.player.getsyspageopen(SharedDef.MODULE_WELFARE,i + 1)) {
                    continue;
                }
                switch (i + 1) {
                    case SharedDef.MODULE_WELFARE_MONTH:
                        var a: Array<SigninEveryDayItemData> = GuidData.quest.getSigninEveryDayVoList();
                        for (var j = 0; j < a.length; j++) {
                            if (a[j].state == 2) {
                                ary[i].show = true;
                                j = a.length;
                            }
                        }

                        var $arytabvo: Array<SigninWeekItemData> = GuidData.quest.getSigninWeekList();
                        for (var index = 0; index < $arytabvo.length; index++) {
                            if($arytabvo[index].state == 2){
                                ary[i].show = true;
                                index = $arytabvo.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_LEVEL:
                        var b: Array<LevelUpRewardItemData> = GuidData.quest.getLevelUpRewardList();
                        for (var k = 0; k < b.length; k++) {
                            if (b[k].state == 1) {
                                ary[i].show = true;
                                k = b.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_SEVEN:
                        var c: Array<SevenDayaItemData> = GuidData.quest.getSevenDayList();
                        for (var m = 0; m < c.length; m++) {
                            if (c[m].state == 1) {
                                ary[i].show = true;
                                m = c.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_RECHARGE:
                        var d: Array<RechargeRewardItemData> = GuidData.quest.getRechargeRewardList();
                        for (var n = 0; n < d.length; n++) {
                            if (d[n].state == 1) {
                                ary[i].show = true;
                                n = d.length;
                            }
                        }
                        break;
                    case SharedDef.MODULE_WELFARE_CONSUME:
                        var e: Array<CostRewardItemData> = GuidData.quest.getCostRewardList();
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
        }

        private openwinvipevent(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.hasStage) {
                this._welfareUiPanel.showVipPop()
            }
        }

        private openwinqiandaoevent($data: SigninEveryDayItemData): void {
            if (this._welfareUiPanel && this._welfareUiPanel.hasStage) {
                this._welfareUiPanel.showBuqianPop($data);
            }
        }

        private openwinevent($data: SListItemData): void {
            // if (this._welfareUiPanel && this._welfareUiPanel.welfareComeback && this._welfareUiPanel.welfareComeback.hasStage) {
            //     console.log("---$data----", $data);
            //     this._welfareUiPanel.welfareComeback.singleBackPanel.show($data);
            // }
        }

        private getbackrewardreward(): void {
            // if (this._welfareUiPanel && this._welfareUiPanel.welfareComeback && this._welfareUiPanel.welfareComeback.hasStage) {
            //     this._welfareUiPanel.welfareComeback.selecttype(this._welfareUiPanel.welfareComeback.type);
            //     this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            // }
        }

        private receivelevelreward(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareLevel && this._welfareUiPanel.welfareLevel.hasStage) {
                this._welfareUiPanel.welfareLevel.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        }
        private receiverechargereward(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareRecharge && this._welfareUiPanel.welfareRecharge.hasStage) {
                this._welfareUiPanel.welfareRecharge.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        }
        private receivecousumereward(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareCost && this._welfareUiPanel.welfareCost.hasStage) {
                this._welfareUiPanel.welfareCost.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        }
        private receivesevendayreward(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareSevenDay && this._welfareUiPanel.welfareSevenDay.hasStage) {
                this._welfareUiPanel.welfareSevenDay.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        }

        private everydaycheckinchange(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareEveryCheckin && this._welfareUiPanel.welfareEveryCheckin.hasStage) {
                this._welfareUiPanel.welfareEveryCheckin.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        }
        private allcheckinchange(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareEveryCheckin && this._welfareUiPanel.welfareEveryCheckin.hasStage) {
                this._welfareUiPanel.welfareEveryCheckin.resetData();
                this._welfareUiPanel.welfareTabList.refreshDataByNewData();
            }
        }

        private refreshTab(): void {
            if (this._welfareUiPanel && this._welfareUiPanel.welfareTabList && this._welfareUiPanel.welfareTabList.hasStage) {
                this._welfareUiPanel.welfareTabList.refreshAndselectIndex();
            }
        }

        private selecttabpanel($type: number): void {
            if (this._welfareUiPanel && this._welfareUiPanel.hasStage) {
                this._welfareUiPanel.selecttype($type);
            }
        }

        private hideUi(): void {
            this._welfareUiPanel.hide();

            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

        }
        private showUi($type: number): void {
            if (!this._welfareUiPanel) {
                this._welfareUiPanel = new WelfareUiPanel();
            }
            this._welfareUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._welfareUiPanel.show($type);
            })

        }

        private getbackResultList($byte: ByteArray): void {
            var rewardStr: string = $byte.readUTF();
            var costStr: string = $byte.readUTF();

            var b = costStr.split(",");
            var a: rewardList_getback = new rewardList_getback();
            a.items = rewardStr.split(",");
            a.cost = Number(b[1]);
            a.costtype = Number(b[0]);

            // if (this._welfareUiPanel && this._welfareUiPanel.welfareComeback && this._welfareUiPanel.welfareComeback.hasStage) {
            //     this._welfareUiPanel.welfareComeback.showpop(a);
            // }
        }



        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_WELFARE_REWARDLIST_GETBACK] = ($byte: ByteArray) => { this.getbackResultList($byte) };

            return obj;
        }


        protected listenModuleEvents(): Array<BaseEvent> {
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
        }

    }

    export class rewardList_getback {
        public items: Array<string>;
        public cost: number;
        public costtype: number;
    }

}