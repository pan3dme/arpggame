module faction {

    export class FactionBuildEvent extends BaseEvent {
        public static SHOW_BUILD_EVENT: string = "SHOW_BUILD_EVENT";
        public static HIDE_BUILD_EVENT: string = "HIDE_BUILD_EVENT";
        public static CLICK_BUILD_ITEM: string = "CLICK_BUILD_ITEM";
        public static BUILD_STATE: string = "BUILD_STATE";
        public static BUILD_ENDTIME: string = "BUILD_ENDTIME";


        public data: any;
    }

    export class FactionBuildProcessor extends BaseProcessor {
        private _factionBuildUiPanel: FactionBuildUiPanel;

        public getName(): string {
            return "FactionBuildProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            var evt: FactionBuildEvent = <FactionBuildEvent>$event;
            if ($event instanceof FactionBuildEvent) {
                if (evt.type == FactionBuildEvent.SHOW_BUILD_EVENT) {
                    this.showFactionUi();
                } else if (evt.type == FactionBuildEvent.CLICK_BUILD_ITEM) {
                    this.clickbossitem(evt.data);
                } else if (evt.type == FactionBuildEvent.HIDE_BUILD_EVENT) {
                    this.hideFactionBossUi()
                } else if (evt.type == FactionBuildEvent.BUILD_STATE) {
                    this.buildstate();
                } else if (evt.type == FactionBuildEvent.BUILD_ENDTIME) {
                    this.buildendtime();
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
                if (panelEvent.panel == this._factionBuildUiPanel) {
                    this._factionBuildUiPanel.dispose();
                    this._factionBuildUiPanel = null;
                    console.log("释放面板 _factionBuildUiPanel")
                }
            }
        }


        private buildendtime(): void {
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.hasStage) {
                this._factionBuildUiPanel.resetData();
            }

            if (this._factionBuildUiPanel && this._factionBuildUiPanel.factionBuildRightPanel && this._factionBuildUiPanel.factionBuildRightPanel.buildlist && this._factionBuildUiPanel.factionBuildRightPanel.buildlist.hasStage) {
                this._factionBuildUiPanel.factionBuildRightPanel.buildlist.refreshAndselectIndex();
            }
        }

        private buildstate(): void {
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.hasStage) {
                this._factionBuildUiPanel.Needrefresh();
                this._factionBuildUiPanel.resetData();
            }
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.factionBuildRightPanel && this._factionBuildUiPanel.factionBuildRightPanel.buildlist && this._factionBuildUiPanel.factionBuildRightPanel.buildlist.hasStage) {
                this._factionBuildUiPanel.factionBuildRightPanel.buildlist.refreshDataByNewData();
            }
        }

        private clickbossitem($data: FBuildItemVo): void {
            if (this._factionBuildUiPanel && this._factionBuildUiPanel.factionBuildRightPanel && this._factionBuildUiPanel.factionBuildRightPanel.hasStage) {
                this._factionBuildUiPanel.factionBuildRightPanel.resetData($data);
            }
        }



        private hideFactionBossUi(): void {
            if (this._factionBuildUiPanel) {
                this._factionBuildUiPanel.hide();
            }
            // SceneManager.getInstance().render = true;
            // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        private showFactionUi(): void {
            if (GuidData.faction) {
                if (!this._factionBuildUiPanel) {
                    this._factionBuildUiPanel = new FactionBuildUiPanel();
                }
                this._factionBuildUiPanel.load(() => {
                    //停止绘制前面的ui
                    // SceneManager.getInstance().render = false;
                    // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                    // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                    this._factionBuildUiPanel.show();
                })

            } else {
                ModulePageManager.openPanel(SharedDef.MODULE_FACTION);
            }
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
                new FactionBuildEvent(FactionBuildEvent.SHOW_BUILD_EVENT),
                new FactionBuildEvent(FactionBuildEvent.HIDE_BUILD_EVENT),
                new FactionBuildEvent(FactionBuildEvent.CLICK_BUILD_ITEM),
                new FactionBuildEvent(FactionBuildEvent.BUILD_STATE),
                new FactionBuildEvent(FactionBuildEvent.BUILD_ENDTIME),


                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            // obj[Protocols.SMSG_FACTION_BOSS_SEND_RESULT] = ($byte: ByteArray) => { this.getNewList($byte) };
            return obj;
        }

        // private getNewList($byte: ByteArray): void {
        //     var $vo: s2c_faction_boss_send_result = new s2c_faction_boss_send_result;
        //     s2c_faction_boss_send_result.read($vo, $byte);

        //     var evttt = new faction.FactionBuildEvent(faction.FactionBuildEvent.SHOW_END_PANEL);
        //     evttt.data = $vo;
        //     ModuleEventManager.dispatchEvent(evttt);
        // }

    }
}