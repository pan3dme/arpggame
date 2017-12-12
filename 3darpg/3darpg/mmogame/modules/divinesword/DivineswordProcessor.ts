module divinesword {
    export class DivineswordModule extends Module {
        public getModuleName(): string {
            return "DivineswordModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new DivineswordProcessor()];
        }
    }
    export class DivineswordEvent extends BaseEvent {
        public static SHOW_TRAINING_PANEL: string = "SHOW_TRAINING_PANEL";
        public static HIDE_TRAINING_PANEL: string = "HIDE_TRAINING_PANEL";
        // public static REFRESH_TRAINING_PANEL: string = "REFRESH_TRAINING_PANEL";
        public static REFRESH_SKILL_PANEL: string = "REFRESH_SKILL_PANEL";
        public data: any;
    }
    export class DivineswordProcessor extends BaseProcessor {

        public getName(): string {
            return "DivineswordProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof DivineswordEvent) {
                var evt: DivineswordEvent = <DivineswordEvent>$event;
                if (evt.type == DivineswordEvent.SHOW_TRAINING_PANEL) {
                    this.showPanel(evt.data)
                }
                if (evt.type == DivineswordEvent.HIDE_TRAINING_PANEL) {
                    this.hidePanel()
                }
                // if (evt.type == DivineswordEvent.REFRESH_TRAINING_PANEL) {
                //     this.refreshtask()
                // }
                if (evt.type == DivineswordEvent.REFRESH_SKILL_PANEL) {
                    if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.hasStage) {
                        this.divineswordUiPanel.divineswordSkill.refreshLev();
                    }
                }
            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    this.refreshNode();
                } else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.initNode();
                } else if ($engineEvent.type == EngineEvent.MONEY_CHANGE) {
                    this.refreshNode();
                    // if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordTask && this.divineswordUiPanel.divineswordTask.hasStage) {
                    //     this.divineswordUiPanel.divineswordTask.refreshCurCardNum();
                    // }
                    if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.divineswordSkill.hasStage) {
                        this.divineswordUiPanel.divineswordSkill.updataRes();
                    }
                } else if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.divineswordUiPanel) {
                        this.divineswordUiPanel.refreshOpenLev();
                    }
                }
            }

            if ($event instanceof skillUi.SkillUiEvent) {
                var skillevent: skillUi.SkillUiEvent = <skillUi.SkillUiEvent>$event;
                if (skillevent.type == skillUi.SkillUiEvent.SKILL_UP_EVENT) {
                    this.showSkillUpEff();
                }
            }

            if ($event instanceof mountui.MountUiEvent) {
                var mountevent: mountui.MountUiEvent = <mountui.MountUiEvent>$event;
                if (mountevent.type == mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT) {
                    this.refreSel()
                }
            }

            if ($event instanceof wing.WingEvent) {
                var wingevent: wing.WingEvent = <wing.WingEvent>$event;
                if (wingevent.type == wing.WingEvent.WING_ID_CHANG_EVENT) {
                    this.refreSel()
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.divineswordUiPanel) {
                    this.divineswordUiPanel.dispose();
                    this.divineswordUiPanel = null;
                    console.log("释放面板 trainingUiPanel")
                }
            }
        }

        private refreSel(){
            if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill) {
                this.divineswordUiPanel.divineswordSkill.refreshSel();
            }
        }

        private showSkillUpEff(): void {
            if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.divineswordSkill.hasStage) {
                this.divineswordUiPanel.divineswordSkill.showSkillUpEff();
            }
        }


        private initNode(): void {
            var tabary: Array<tb.TB_adventure_skill_base> = tb.TB_adventure_skill_base.get_TB_quest_adventure_base();
            var pnode: RedPointNode = RedPointManager.getInstance().getNodeByID(128);
            for (var i: number = 0; i < tabary.length; i++) {
                var node: RedPointNode = new RedPointNode();
                node.data = tabary[i];
                pnode.addChild(node);
            }

            this.refreshNode();
        }

        private refreshNode(): void {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_GW, SharedDef.MODULE_GW_ALL)) {
                if (GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_GW)) {
                    this.refreshNodeByID(128);
                    if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordSkill && this.divineswordUiPanel.divineswordSkill.hasStage) {
                        this.divineswordUiPanel.divineswordSkill.refreshredpoint();
                    }
                }
            }
        }

        private refreshNodeByID($id: number) {
            var ary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID($id).children;

            for (var i: number = 0; i < ary.length; i++) {
                var tab: tb.TB_adventure_skill_base = ary[i].data;
                if (tab.prev_limit[0]) {
                    if (!training.TrainingModel.getInstance().getprev_limitflag(tab.prev_limit[0])) {
                        ary[i].show = false;
                    } else {
                        //判断道具足够不
                        ary[i].show = this.hasResEnough(tab);
                    }
                } else {
                    //判断道具足够不
                    ary[i].show = this.hasResEnough(tab);
                }
            }
        }

        private hasResEnough(tab: tb.TB_adventure_skill_base): boolean {
            var lev: number = GuidData.player.getPassiveSkillLev(tab.id);
            var baseData: any = TableData.getInstance().getData(TableData.tb_skill_base, tab.id);
            var nexttab = tb.TB_skill_uplevel.get_TB_skill_uplevel(baseData.uplevel_id[0] + lev);
            if (lev > (baseData.uplevel_id[1] - baseData.uplevel_id[0])) {
                nexttab = null;
            }
            if (nexttab == null) {
                return false;
            }
            var costitem: Array<number> = tab.cost[0]
            if (lev > 0) {
                costitem = tb.TB_skill_uplevel.get_TB_skill_uplevel(baseData.uplevel_id[0] + lev - 1).uplevel_cost[0];
            }
            if (hasEnoughRes(costitem)) {
                return true;
            } else {
                return false;
            }
        }


        /**
         * 服务端任务状态变化
         */
        // private refreshtask() {
        //     training.TrainingModel.getInstance().refreshTaskAry();
        //     if (this.divineswordUiPanel && this.divineswordUiPanel.divineswordTask && this.divineswordUiPanel.divineswordTask.hasStage) {
        //         this.divineswordUiPanel.divineswordTask.refreshServerData();
        //     }
        // }
        private hidePanel(): void {
            if (this.divineswordUiPanel) {
                this.divineswordUiPanel.hide();
            }
        }
        private divineswordUiPanel: DivineswordUiPanel
        private showPanel($data: any): void {
            if (!this.divineswordUiPanel) {
                this.divineswordUiPanel = new DivineswordUiPanel();
            }
            this.divineswordUiPanel.load(() => {
                console.log("--$data---", $data);
                // if (!$data) {
                //     $data = SharedDef.MODULE_EXP_QUEST
                // }

                this.divineswordUiPanel.show($data);

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_GW
                ModuleEventManager.dispatchEvent($scenePange);

            }, false);
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new DivineswordEvent(DivineswordEvent.SHOW_TRAINING_PANEL),
                new DivineswordEvent(DivineswordEvent.HIDE_TRAINING_PANEL),
                // new DivineswordEvent(DivineswordEvent.REFRESH_TRAINING_PANEL),
                new DivineswordEvent(DivineswordEvent.REFRESH_SKILL_PANEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SKILL_UP_EVENT),
                new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT),
                new wing.WingEvent(wing.WingEvent.WING_ID_CHANG_EVENT),
            ];
        }

    }


}