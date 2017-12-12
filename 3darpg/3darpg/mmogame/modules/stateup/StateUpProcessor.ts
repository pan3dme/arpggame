module stateup {
    export class StateUpModule extends Module {
        public getModuleName(): string {
            return "StateUpModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new StateUpProcessor()];
        }
    }
    export class StateUpEvent extends BaseEvent {
        public static SHOW_STATEUP_PANEL: string = "SHOW_STATEUP_PANEL";
        public static HIDE_STATEUP_PANEL: string = "HIDE_STATEUP_PANEL";
        public static REFRESH_LIST_PANEL: string = "REFRESH_LIST_PANEL";
        public static REFRESH_TASK_PANEL: string = "REFRESH_TASK_PANEL";
        public static REFRESH_LEV_PANEL: string = "REFRESH_LEV_PANEL";
        public static REFRESH_EXP_PANEL: string = "REFRESH_EXP_PANEL";
        public static SHOW_EFFECT_PANEL: string = "SHOW_EFFECT_PANEL";
        public static CLICK_EVT: string = "CLICK_EVT";

        public static POP_SHOW_PANEL: string = "POP_SHOW_PANEL";
        public data: any;
    }
    export class StateUpProcessor extends BaseProcessor {

        public getName(): string {
            return "StateUpProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof StateUpEvent) {
                var evt: StateUpEvent = <StateUpEvent>$event;
                if (evt.type == StateUpEvent.SHOW_STATEUP_PANEL) {
                    this.showPanel(evt.data)
                }
                if (evt.type == StateUpEvent.HIDE_STATEUP_PANEL) {
                    this.hidePanel()
                }
                if (evt.type == StateUpEvent.REFRESH_LIST_PANEL) {
                    this.refreshNode();
                    this.refreshlist()
                }
                if (evt.type == StateUpEvent.REFRESH_TASK_PANEL) {
                    this.refreshtask()
                }
                if (evt.type == StateUpEvent.REFRESH_LEV_PANEL) {
                    this.refreshlev()
                }
                if (evt.type == StateUpEvent.REFRESH_EXP_PANEL) {
                    this.refreshExp()
                }
                if (evt.type == StateUpEvent.SHOW_EFFECT_PANEL) {
                    this.showeff(evt.data)
                }
                if (evt.type == StateUpEvent.CLICK_EVT) {
                    if (this.stateUpUiPanel) {
                        this.stateUpUiPanel.setpoint(evt.data);
                    }
                }
                if (evt.type == StateUpEvent.POP_SHOW_PANEL) {
                    this.popshow();
                }
            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {

                } else if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                        this.stateUpUiPanel.drawPersonLev();
                    }
                } else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.refreshNode();
                } else if ($engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    this.refreshNode();
                    if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                        this.stateUpUiPanel.opensystem();
                    }
                }
            }

            // if ($event instanceof skillUi.SkillUiEvent) {
            //     var skillevent: skillUi.SkillUiEvent = <skillUi.SkillUiEvent>$event;
            //     if (skillevent.type == skillUi.SkillUiEvent.SKILL_UP_EVENT) {
            //         this.showSkillUpEff();
            //     }
            // }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.stateUpUiPanel) {
                    this.stateUpUiPanel.dispose();
                    this.stateUpUiPanel = null;
                    console.log("释放面板 trainingUiPanel")
                }
            }
        }

        private refreshNode(): void {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_REALM, SharedDef.MODULE_REALM_ALL)) {
                var taskcellary: Array<TaskCell> = StateUpModel.getInstance().getTaskAry();
                var node124: RedPointNode = RedPointManager.getInstance().getNodeByID(124);
                node124.show = false;
                for (let i = 0; i < taskcellary.length; i++) {
                    if (taskcellary[i].qusdata.taskState == SharedDef.QUEST_STATUS_COMPLETE) {
                        node124.show = true;
                        break;
                    }
                }
            }
        }

        private showeff($vo:item_reward_info) {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.showBezierEff($vo.num);
                this.stateUpUiPanel.showExpEff();
                // this.stateUpUiPanel.showflyword(ColorType.Yellowedce7e+"境界经验+"+$vo.num);
            }
        }

        private refreshExp() {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.chgExp();
            }
        }
        private refreshlev() {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.chgLev();
            }
        }
        private refreshtask() {
            if (this.stateUpUiPanel && this.stateUpUiPanel.hasStage) {
                this.stateUpUiPanel.refreshState();
            }
        }
        private refreshlist() {
            if (this.stateUpUiPanel && this.stateUpUiPanel.achievementList && this.stateUpUiPanel.achievementList.hasStage) {
                this.stateUpUiPanel.achievementList.refreshDraw();
            }
        }
        private hidePanel(): void {
            if (this.stateUpUiPanel) {
                this.stateUpUiPanel.hide();
            }
        }
        private stateUpUiPanel: StateUpUiPanel
        private showPanel($data: any): void {
            if (!this.stateUpUiPanel) {
                this.stateUpUiPanel = new StateUpUiPanel();
            }
            this.stateUpUiPanel.load(() => {
                console.log("--$data---", $data);
                if (!$data) {
                    $data = SharedDef.MODULE_REALM_ALL
                } else if ($data instanceof Array) {
                    $data = $data[0]
                }

                this.stateUpUiPanel.show($data);

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_WORLD_RISK
                ModuleEventManager.dispatchEvent($scenePange);

            }, false);
        }


        private stateupPopPanel: StateupPopPanel
        private popshow(): void {
            if (!this.stateupPopPanel) {
                this.stateupPopPanel = new StateupPopPanel();
            }
            this.stateupPopPanel.load(() => {
                this.stateupPopPanel.show();
            }, false);
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new StateUpEvent(StateUpEvent.SHOW_STATEUP_PANEL),
                new StateUpEvent(StateUpEvent.HIDE_STATEUP_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_LIST_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_TASK_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_LEV_PANEL),
                new StateUpEvent(StateUpEvent.REFRESH_EXP_PANEL),
                new StateUpEvent(StateUpEvent.SHOW_EFFECT_PANEL),
                new StateUpEvent(StateUpEvent.CLICK_EVT),
                new StateUpEvent(StateUpEvent.POP_SHOW_PANEL),
                // new StateUpEvent(StateUpEvent.REFRESH_SKILL_PANEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                // new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SKILL_UP_EVENT),
            ];
        }

    }


}