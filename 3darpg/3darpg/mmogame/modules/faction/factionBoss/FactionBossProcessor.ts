module faction {

    export class FactionBossEvent extends BaseEvent {
        public static SHOW_BOSS_EVENT: string = "SHOW_BOSS_EVENT";
        public static HIDE_BOSS_EVENT: string = "HIDE_BOSS_EVENT";
        public static CLICK_BOSS_ITEM: string = "CLICK_BOSS_ITEM";
        public static SHOW_END_PANEL: string = "SHOW_END_PANEL";

        public static CHANGE_BOSS_CURRENTNUM: string = "CHANGE_BOSS_CURRENTNUM";
        public static CHANGE_BOSS_INTEGRAL: string = "CHANGE_BOSS_INTEGRAL";
        public static CHANGE_BOSS_RESIDUE: string = "CHANGE_BOSS_RESIDUE";
        public static CHANGE_BOSS_CURRENTID: string = "CHANGE_BOSS_CURRENTID";
        public static BOSS_NEED_REDPOINT: string = "BOSS_NEED_REDPOINT";

        public data: any;
    }

    export class FactionBossProcessor extends BaseProcessor {
        private _factionBossUiPanel: FactionBossUiPanel;

        public getName(): string {
            return "FactionBossProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            var evt: FactionBossEvent = <FactionBossEvent>$event;
            if ($event instanceof FactionBossEvent) {
                if (evt.type == FactionBossEvent.SHOW_BOSS_EVENT) {
                    this.showFactionUi();
                } else if (evt.type == FactionBossEvent.CLICK_BOSS_ITEM) {
                    this.clickbossitem(evt.data);
                } else if (evt.type == FactionBossEvent.SHOW_END_PANEL) {
                    this.showfactionBossEndPanel(evt.data);
                } else if (evt.type == FactionBossEvent.HIDE_BOSS_EVENT) {
                    this.hideFactionBossUi()
                } else if (evt.type == FactionBossEvent.CHANGE_BOSS_CURRENTNUM) {
                    this.bosscurnum();
                } else if (evt.type == FactionBossEvent.CHANGE_BOSS_INTEGRAL) {
                    this.bossintegral();
                } else if (evt.type == FactionBossEvent.CHANGE_BOSS_RESIDUE) {
                    this.bossresidue();
                } else if (evt.type == FactionBossEvent.CHANGE_BOSS_CURRENTID) {
                    this.bosscurrentid();
                } else if (evt.type == FactionBossEvent.BOSS_NEED_REDPOINT) {
                    this.needredpoint();
                }
            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.MONEY_TYPE_SILVER
                    || $engineEvent.type == EngineEvent.MONEY_TYPE_GOLD_INGOT) {
                    // if (this._factionBossUiPanel && this._factionBossUiPanel.factionTreasurePanel) {
                    //     this._factionBossUiPanel.factionTreasurePanel.treasureTopPanel.resetMoney();
                    // }
                }

            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._factionBossUiPanel) {
                    this._factionBossUiPanel.dispose();
                    this._factionBossUiPanel = null;
                    console.log("释放面板 _factionBossUiPanel")
                }

                if (panelEvent.panel == this._factionBossEnd) {
                    this._factionBossEnd.dispose();
                    this._factionBossEnd = null;
                    console.log("释放面板 _factionBossEnd")
                }
            }
        }

        private needredpoint(): void {
            if (this._factionBossUiPanel && this._factionBossUiPanel.factionBossRightPanel && this._factionBossUiPanel.factionBossRightPanel.hasStage) {
                this._factionBossUiPanel.factionBossRightPanel.Isneedredpoint();
            }
        }

        private bosscurrentid(): void {
            if (this._factionBossUiPanel && this._factionBossUiPanel.factionBossRightPanel && this._factionBossUiPanel.factionBossRightPanel.hasStage) {
                this._factionBossUiPanel.factionBossRightPanel.Needrefresh();
            }
        }

        private bosscurnum(): void {
            if (this._factionBossUiPanel && this._factionBossUiPanel.hasStage) {
                this._factionBossUiPanel.refreshCurrentNum();
            }
        }

        private bossintegral(): void {
            if (this._factionBossUiPanel && this._factionBossUiPanel.hasStage) {
                this._factionBossUiPanel.refreshCurrentIntegral();
            }
        }

        private bossresidue(): void {
            if (this._factionBossUiPanel && this._factionBossUiPanel.hasStage) {
                this._factionBossUiPanel.refreshCurrentResidue();
            }
        }

        private clickbossitem($data: FBossItemVo): void {
            if (this._factionBossUiPanel && this._factionBossUiPanel.factionBossRightPanel && this._factionBossUiPanel.factionBossRightPanel.hasStage) {
                this._factionBossUiPanel.factionBossRightPanel.resetData($data);
            }
        }



        private hideFactionBossUi(): void {
            if (this._factionBossUiPanel) {
                this._factionBossUiPanel.hide();
            }
            // SceneManager.getInstance().render = true;
            // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        private showFactionUi(): void {

            if (!this._factionBossUiPanel) {
                this._factionBossUiPanel = new FactionBossUiPanel();
            }
            this._factionBossUiPanel.load(() => {
                //停止绘制前面的ui
                // SceneManager.getInstance().render = false;
                // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                this._factionBossUiPanel.show();
            })
        }

        private _factionBossEnd: FactionBossEnd;
        private showfactionBossEndPanel($data: s2c_faction_boss_send_result): void {
            if (!this._factionBossEnd) {
                this._factionBossEnd = new FactionBossEnd();
            }
            this._factionBossEnd.load(() => {
                this._factionBossEnd.show($data);
            }, false);
        }




        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FactionBossEvent(FactionBossEvent.SHOW_BOSS_EVENT),
                new FactionBossEvent(FactionBossEvent.HIDE_BOSS_EVENT),
                new FactionBossEvent(FactionBossEvent.CLICK_BOSS_ITEM),
                new FactionBossEvent(FactionBossEvent.SHOW_END_PANEL),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_CURRENTNUM),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_INTEGRAL),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_RESIDUE),
                new FactionBossEvent(FactionBossEvent.CHANGE_BOSS_CURRENTID),
                new FactionBossEvent(FactionBossEvent.BOSS_NEED_REDPOINT),


                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_FACTION_BOSS_SEND_RESULT] = ($byte: ByteArray) => { this.getNewList($byte) };
            return obj;
        }

        private getNewList($byte: ByteArray): void {
            var $vo: s2c_faction_boss_send_result = new s2c_faction_boss_send_result;
            s2c_faction_boss_send_result.read($vo, $byte);

            var evttt = new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_END_PANEL);
            evttt.data = $vo;
            ModuleEventManager.dispatchEvent(evttt);
        }

    }
}