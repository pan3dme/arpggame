module rightui {
    export class RightUiModule extends Module {
        public getModuleName(): string {
            return "RightUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new RightUiProcessor()];
        }
    }
    export class RightUiEvent extends BaseEvent {
        public static SHOW_RIGHT_UI_PANEL: string = "SHOW_RIGHT_UI_PANEL";
        public static HIDE_RIGHT_UI_PANEL: string = "HIDE_RIGHT_UI_PANEL";

    }
    export class RightUiProcessor extends BaseProcessor {

        public getName(): string {
            return "RightUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof RightUiEvent) {
                var $topUiEvent: RightUiEvent = <RightUiEvent>$event;
                if ($topUiEvent.type == RightUiEvent.SHOW_RIGHT_UI_PANEL) {
                    this.showPanel();
                }
                if ($topUiEvent.type == RightUiEvent.HIDE_RIGHT_UI_PANEL) {
                    this.hidePanel();
                }
            }

            if ($event instanceof faction.FactionEvent) {
                if (this.rightUiPanel) {
                    if ($event.type == faction.FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT) {
                        this.rightUiPanel.refreshNotice();
                    }
                }
            }

            if ($event instanceof fightui.FightUiEvent) {
                if (this.rightUiPanel) {
                    if ($event.type == fightui.FightUiEvent.REFRESH_SKILL_AOTUBATTLE) {
                        this.rightUiPanel.changeSkillAotu();
                    }
                }
            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
      
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.rightUiPanel) {
                        this.rightUiPanel.drawSysTemTip()
                    }

                }
     
            }
        }
        private hidePanel(): void
        {
            if (this.rightUiPanel) {
                this.rightUiPanel.hide()
            }
        }

        private rightUiPanel: RightUiPanel;
        private showPanel(): void {
            if (!this.rightUiPanel) {
                this.rightUiPanel = new RightUiPanel();
            }
            this.rightUiPanel.load(() => {
                this.rightUiPanel.show()
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new RightUiEvent(RightUiEvent.SHOW_RIGHT_UI_PANEL),
                new RightUiEvent(RightUiEvent.HIDE_RIGHT_UI_PANEL),
                new RightUiEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new fightui.FightUiEvent(fightui.FightUiEvent.REFRESH_SKILL_AOTUBATTLE),
                new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT),

            ];
        }

    }


}