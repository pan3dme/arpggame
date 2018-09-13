module faction {

    export class FactionLeaguEvent extends BaseEvent {
        public static SHOW_LEAGUE_EVENT: string = "SHOW_LEAGUE_EVENT";
        public static HIDE_LEAGUE_EVENT: string = "HIDE_LEAGUE_EVENT";

        public static SHOW_GZ_EVENT: string = "SHOW_GZ_EVENT";
        public static SHOW_LS_EVENT: string = "SHOW_LS_EVENT";

        public static REFRESH_STAGE_EVENT: string = "REFRESH_STAGE_EVENT";
        public static REFRESH_SESSION_EVENT: string = "REFRESH_SESSION_EVENT";

        public data: any;
    }

    export class FactionLeagueProcessor extends BaseProcessor {
        private _factionLeagueUiPanel: FactionLeagueUiPanel;

        public getName(): string {
            return "FactionLeagueProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            var evt: FactionLeaguEvent = <FactionLeaguEvent>$event;
            if ($event instanceof FactionLeaguEvent) {
                if (evt.type == FactionLeaguEvent.SHOW_LEAGUE_EVENT) {
                    this.showFactionUi();
                } else if (evt.type == FactionLeaguEvent.HIDE_LEAGUE_EVENT) {
                    this.hideFactionBossUi()
                } else if (evt.type == FactionLeaguEvent.SHOW_GZ_EVENT) {
                    this.showgz();
                } else if (evt.type == FactionLeaguEvent.SHOW_LS_EVENT) {
                    this.showls();
                } else if (evt.type == FactionLeaguEvent.REFRESH_STAGE_EVENT) {
                    if(this._factionLeagueUiPanel && this._factionLeagueUiPanel.hasStage){
                        this._factionLeagueUiPanel.selecModul();
                        this._factionLeagueUiPanel.sendmsg();
                    }
                }
            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.MONEY_TYPE_SILVER
                    || $engineEvent.type == EngineEvent.MONEY_TYPE_GOLD_INGOT) {

                }

            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._factionLeagueUiPanel) {
                    this._factionLeagueUiPanel.dispose();
                    this._factionLeagueUiPanel = null;
                    //console.log("释放面板 _factionBuildUiPanel")
                }
                if (panelEvent.panel == this.leaguegz) {
                    this.leaguegz.dispose();
                    this.leaguegz = null;
                    //console.log("释放面板 leaguegz")
                }
                if (panelEvent.panel == this.leaguels) {
                    this.leaguels.dispose();
                    this.leaguels = null;
                    //console.log("释放面板 leaguegz")
                }
            }
        }
        
        private leaguels:LeagueLs;
        private showls(): void {
            if (!this.leaguels) {
                this.leaguels = new LeagueLs();
            }
            this.leaguels.load(() => {
                //停止绘制前面的ui
                this.leaguels.show();
            })
        }

        private leaguegz:LeagueGz;
        private showgz(): void {
            if (!this.leaguegz) {
                this.leaguegz = new LeagueGz();
            }
            this.leaguegz.load(() => {
                //停止绘制前面的ui
                this.leaguegz.show();
            })
        }

        private hideFactionBossUi(): void {
            if (this._factionLeagueUiPanel) {
                this._factionLeagueUiPanel.hide();
            }
        }

        private showFactionUi(): void {
            if (!this._factionLeagueUiPanel) {
                this._factionLeagueUiPanel = new FactionLeagueUiPanel();
            }
            this._factionLeagueUiPanel.load(() => {
                //停止绘制前面的ui
                this._factionLeagueUiPanel.show();
            })
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FactionLeaguEvent(FactionLeaguEvent.SHOW_LEAGUE_EVENT),
                new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT),

                new FactionLeaguEvent(FactionLeaguEvent.SHOW_GZ_EVENT),
                new FactionLeaguEvent(FactionLeaguEvent.SHOW_LS_EVENT),

                new FactionLeaguEvent(FactionLeaguEvent.REFRESH_STAGE_EVENT),

                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SHOW_FACTION_MATCH_INFO_LIST] = ($byte: ByteArray) => { this.getNewList($byte) };
            return obj;
        }

        private getNewList($byte: ByteArray): void {
            var $vo:s2c_show_faction_match_info_list  = new s2c_show_faction_match_info_list;
            s2c_show_faction_match_info_list.read($vo, $byte);

            //console.log("---faction_match_info---",$vo);
            //数据先传至model层
            FactionLeagueModel.getInstance().writeData($vo);
            //通知面板获取到新数据
            if(this._factionLeagueUiPanel && this._factionLeagueUiPanel.hasStage){
                this._factionLeagueUiPanel.drawData();
            }


            // var evttt = new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_END_PANEL);
            // evttt.data = $vo;
            // ModuleEventManager.dispatchEvent(evttt);
        }

    }
}