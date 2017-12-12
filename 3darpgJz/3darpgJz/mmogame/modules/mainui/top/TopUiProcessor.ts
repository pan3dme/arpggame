module topui {
    export class TopUiModule extends Module {
        public getModuleName(): string {
            return "TopUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new TopUiProcessor()];
        }
    }
    export class TopUiEvent extends BaseEvent {
        public static SHOW_TOP_UI_PANEL: string = "SHOW_TOP_UI_PANEL";
        public static HIDE_TOP_UI_PANEL: string = "HIDE_TOP_UI_PANEL";
        public static REFRESH_TOP_LEFT_BUFF: string = "REFRESH_TOP_LEFT_BUFF";
        public static REFRESH_TOP_LEFT_BLOOD: string = "REFRESH_TOP_LEFT_BLOOD";
        public static REFRESH_TOP_PANDA: string = "REFRESH_TOP_PANDA";
        public static REFRESH_TOP_PANDA_TIP: string = "REFRESH_TOP_PANDA_TIP";
        public static UNIT_FIELD_NOTORIETY: string = "UNIT_FIELD_NOTORIETY";	// 战斗模式换
        public static SHOW_TOP_PANDA_LIST: string = "SHOW_TOP_PANDA_LIST";
        public data: any
    }
    export class TopUiProcessor extends BaseProcessor {

        public getName(): string {
            return "TopUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof TopUiEvent) {
                var $topUiEvent: TopUiEvent = <TopUiEvent>$event;
                if ($topUiEvent.type == TopUiEvent.SHOW_TOP_UI_PANEL) {
                    this.showPanel();
                }
                if ($topUiEvent.type == TopUiEvent.UNIT_FIELD_NOTORIETY) {
                    console.log("战斗模式换了");
                    RelationManager.getInstance().refresh();
                    if (this.topUiPanel && GuidData.map) {
                        this.topUiPanel.topHeadPanel.refresh()
                    }

                }

                if (this.topUiPanel) {
                    if ($topUiEvent.type == TopUiEvent.REFRESH_TOP_PANDA) {
                        if (this.topUiPanel.topPandaPanel) {
                            this.topUiPanel.topPandaPanel.refresh()
                        }

                    }
                    if ($topUiEvent.type == TopUiEvent.HIDE_TOP_UI_PANEL) {
                        this.hidePanel();
                    }
                    if ($topUiEvent.type == TopUiEvent.SHOW_TOP_PANDA_LIST) {
                        if (this.topUiPanel.topPandaPanel) {
                            this.topUiPanel.topPandaPanel.changePandaVisible($topUiEvent.data);
                        }
                    }
                    if ($topUiEvent.type == TopUiEvent.REFRESH_TOP_LEFT_BLOOD) {
                        if (this.topUiPanel.topHeadPanel) {
                            this.topUiPanel.topHeadPanel.refreshBloodBar();
                        }
                    }
                    if ($topUiEvent.type == TopUiEvent.REFRESH_TOP_PANDA_TIP) {
                        this.toppandarefesh($topUiEvent.data)
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL || $engineEvent.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL || $engineEvent.type == EngineEvent.PLAYER_FIELD_FORCE) {
                    if (this.topUiPanel && this.topUiPanel.topHeadPanel) {
                        this.topUiPanel.topHeadPanel.refresh()
                    }
                }
            }
        }


        private toppandarefesh($data: string) {
            if (this.topUiPanel.topPandaPanel) {
                this.topUiPanel.topPandaPanel.setTipsData($data);
            }
        }

        private hidePanel(): void {
            if (this.topUiPanel) {
                UIManager.getInstance().removeUIContainer(this.topUiPanel);
            }
        }
        private topUiPanel: TopUiPanel;
        private showPanel(): void {
            if (!this.topUiPanel) {
                this.topUiPanel = new TopUiPanel();
            }
            this.topUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.topUiPanel);
                this.topUiPanel.refresh()
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TopUiEvent(TopUiEvent.SHOW_TOP_UI_PANEL),
                new TopUiEvent(TopUiEvent.HIDE_TOP_UI_PANEL),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_LEFT_BUFF),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_LEFT_BLOOD),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_PANDA),
                new TopUiEvent(TopUiEvent.SHOW_TOP_PANDA_LIST),
                new TopUiEvent(TopUiEvent.REFRESH_TOP_PANDA_TIP),
                new TopUiEvent(TopUiEvent.UNIT_FIELD_NOTORIETY),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),

            ];
        }

    }


}