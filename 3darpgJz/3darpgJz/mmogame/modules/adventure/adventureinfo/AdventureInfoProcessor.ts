module adventureinfo {
    export class AdventureInfoModule extends Module {
        public getModuleName(): string {
            return "AdventureInfoModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new AdventureInfoProcessor()];
        }
    }
    export class AdventurInfoEvent extends BaseEvent {
        public static SHOW_ADVENTURE_INFO_UI_PANEL: string = "SHOW_ADVENTURE_INFO_UI_PANEL";
        public static HIDE_ADVENTURE_INFO_UI_PANEL: string = "HIDE_ADVENTURE_INFO_UI_PANEL";
        public static ADVENTURE_TRIAL_PROCESS: string = "ADVENTURE_TRIAL_PROCESS";
        public static ADVENTURE_BOSS_PROCESS_FINISH: string = "ADVENTURE_BOSS_PROCESS_FINISH";
        public static UPLEV_SHOW: string = "UPLEV_SHOW";
        public static SET_AUTOFLAG: string = "SET_AUTOFLAG";
    }
    export class AdventureInfoProcessor extends BaseProcessor {

        public getName(): string {
            return "AdventureInfoProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof AdventurInfoEvent) {
                var evt: AdventurInfoEvent = <AdventurInfoEvent>$event;
                if (evt.type == AdventurInfoEvent.UPLEV_SHOW) {
                    this.showuplevfoPanelPanel();
                }
                if (evt.type == AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL) {
                    if (GuidData.map.isAdventureScene()) {
                        this.showPanel();
                    } else {
                        this.hidePanel();
                    }
                }
                if (this.adventureInfoPanel) {
                    if (evt.type == AdventurInfoEvent.HIDE_ADVENTURE_INFO_UI_PANEL) {
                        this.hidePanel()
                    }
                    if (evt.type == AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS) {
                        this.adventureInfoPanel.refresh()
                    }
                    if (evt.type == AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH) {
                        this.adventureInfoPanel.hideExitBossBut()
                    }
                }

                if (evt.type == AdventurInfoEvent.SET_AUTOFLAG) {
                    if (this.adventureInfoPanel && this.adventureInfoPanel.hasStage) {
                        this.adventureInfoPanel.setautoflag(false);
                    }
                }
            }

            if ($event.type == EngineEvent.ENTER_SCENE_EVENT) {
                if (GuidData.map.isAdventureScene() && this.adventureInfoPanel) {
                    if (this.adventureInfoPanel.needUpLevShow()) {
                        if (GameInstance.sceneResEqu) {
                            this.hidePanel();
                            AotuSkillManager.getInstance().aotuBattle = false;
                            //TimeUtil.addTimeOut(200,()=>{ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT))});
                            ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT));
                            TimeUtil.addTimeOut(2500, () => {
                                this.showPanel();
                                this.adventureInfoPanel.showuppanel();
                                AotuSkillManager.getInstance().aotuBattle = true;
                            })
                        } else {
                            ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT));
                            this.adventureInfoPanel.showuppanel();
                        }
                    }

                } else {
                    ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT));
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.uplevfoPanel) {
                    this.uplevfoPanel.dispose();
                    this.uplevfoPanel = null;
                    console.log("释放面板 uplevfoPanel")
                }
            }

            if ($event instanceof newbieguide.NewbieguideEvent) {
                if (this.adventureInfoPanel) {
                    if ($event.type == newbieguide.NewbieguideEvent.SHOW_BIEGUIDE_EVENT) {
                        this.adventureInfoPanel.setautoflag(false);
                    } else if ($event.type == newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT) {
                        this.adventureInfoPanel.setautoflag(true);
                    }
                }

            }


        }
        private hidePanel(): void {
            if (this.adventureInfoPanel) {
                UIManager.getInstance().removeUIContainer(this.adventureInfoPanel);
            }

        }
        private adventureInfoPanel: AdventureInfoPanel
        private showPanel(): void {
            if (!this.adventureInfoPanel) {
                this.adventureInfoPanel = new AdventureInfoPanel();
            }
            this.adventureInfoPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.adventureInfoPanel);
                this.adventureInfoPanel.refresh()
            }, false);
        }

        private uplevfoPanel: UplevfoPanel
        private showuplevfoPanelPanel(): void {
            if (!this.uplevfoPanel) {
                this.uplevfoPanel = new UplevfoPanel();
            }
            this.uplevfoPanel.load(() => {
                this.uplevfoPanel.show()
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new AdventurInfoEvent(AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL),
                new AdventurInfoEvent(AdventurInfoEvent.HIDE_ADVENTURE_INFO_UI_PANEL),
                new AdventurInfoEvent(AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS),
                new AdventurInfoEvent(AdventurInfoEvent.ADVENTURE_BOSS_PROCESS_FINISH),
                new AdventurInfoEvent(AdventurInfoEvent.UPLEV_SHOW),
                new AdventurInfoEvent(AdventurInfoEvent.SET_AUTOFLAG),
                new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_BIEGUIDE_EVENT),
                new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT),

            ];
        }

    }


}