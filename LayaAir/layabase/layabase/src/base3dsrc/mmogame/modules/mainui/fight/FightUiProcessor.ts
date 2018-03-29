module fightui {
    export class FightUiModule extends Module {
        public getModuleName(): string {
            return "FightUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new FightUiProcessor()];
        }
    }
    export class FightUiEvent extends BaseEvent {
        public static SHOW_FIGHT_UI_PANEL: string = "SHOW_FIGHT_UI_PANEL";
        public static HIDE_FIGHT_UI_PANEL: string = "HIDE_FIGHT_UI_PANEL";
        public static REFRESH_SKILL_AOTUBATTLE: string = "REFRESH_SKILL_AOTUBATTLE";
       
    }
    export class FightUiProcessor extends BaseProcessor {

        public getName(): string {
            return "FightUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof FightUiEvent) {
                var evt: FightUiEvent = <FightUiEvent>$event;
                if (evt.type == FightUiEvent.SHOW_FIGHT_UI_PANEL) {

                    if (GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                        this.showPanel()
                    }
                } 
      
                if (this._fightUiPanel) {
                    if (evt.type == FightUiEvent.HIDE_FIGHT_UI_PANEL) {
                        this.hidePanel()
                    }
                    // if (evt.type == FightUiEvent.REFRESH_SKILL_AOTUBATTLE) {
                    //     if (this._fightUiPanel.fightSkillPanel) {
                    //         this._fightUiPanel.fightSkillPanel.changeSkillAotu()
                    //     }
                    // }
                }

            }
            if ($event instanceof mainUi.MainUiEvent && this._fightUiPanel && this._fightUiPanel.fightSkillPanel) {
                var $mainUIEvent: mainUi.MainUiEvent = <mainUi.MainUiEvent>$event;
                if ($mainUIEvent.type == mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH) {
                    this._fightUiPanel.fightSkillPanel.refreshCdBySkillId(Number($mainUIEvent.data));
                }
                if ($mainUIEvent.type == mainUi.MainUiEvent.RESET_SKILL_ICON) {
                    this._fightUiPanel.fightSkillPanel.refresh()
                }
            }

        }

   

        private hidePanel(): void {
            if (this._fightUiPanel) {
                UIManager.getInstance().removeUIContainer(this._fightUiPanel);
            }

        }
        private _fightUiPanel: FightUiPanel
        private showPanel(): void {
            if (!this._fightUiPanel) {
                this._fightUiPanel = new FightUiPanel();
            }
            this._fightUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this._fightUiPanel);
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FightUiEvent(FightUiEvent.SHOW_FIGHT_UI_PANEL),
                new FightUiEvent(FightUiEvent.HIDE_FIGHT_UI_PANEL),
                // new FightUiEvent(FightUiEvent.REFRESH_SKILL_AOTUBATTLE),
                new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON),
                new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH),

      

            ];
        }

    }


}