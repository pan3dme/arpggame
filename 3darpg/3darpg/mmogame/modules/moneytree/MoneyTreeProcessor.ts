module moneytree {

    export class MoneyTreeModule extends Module {
        public getModuleName(): string {
            return "MoneyTreeModule";
        }
        protected listProcessors(): Array<Processor> {
            //this.init();
            return [new MoneyTreeProcessor()];
        }
    }

    export class MoneyTreeEvent extends BaseEvent {
        public static HIDE_MoneyTree_EVENT: string = "HIDE_MoneyTree_EVENT";
        public static SHOW_MoneyTree_EVENT: string = "SHOW_MoneyTree_EVENT";

        public static CHG_MoneyTree_REWARD_EVENT: string = "CHG_MoneyTree_REWARD_EVENT";

        public static SHOW_EFF_MoneyTree_EVENT: string = "SHOW_EFF_MoneyTree_EVENT";
        public static EFF_EVENT: string = "EFF_EVENT";

        public data: any;
    }

    export class MoneyTreeProcessor extends BaseProcessor {
        private _moneyTree: MoneyTree;

        public getName(): string {
            return "MoneyTreeProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            var evt: MoneyTreeEvent = <MoneyTreeEvent>$event;
            if ($event instanceof MoneyTreeEvent) {
                if (evt.type == MoneyTreeEvent.SHOW_MoneyTree_EVENT) {
                    this.showRankingUi();
                } else if (evt.type == MoneyTreeEvent.HIDE_MoneyTree_EVENT) {
                    this.hideRankingUi()
                } else if (evt.type == MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT) {
                    this.chgreward();
                } else if (evt.type == MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT) {
                    if (this._moneyTree) {
                        this._moneyTree.showSkillUpEff();
                    }
                } else if (evt.type == MoneyTreeEvent.EFF_EVENT) {
                    if (this._moneyTree) {
                        this._moneyTree.showflyword(evt.data);
                    }
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._moneyTree) {
                    this._moneyTree.dispose();
                    this._moneyTree = null;
                    console.log("释放面板 _rankingUiPanel")
                }
            }

            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.MONEY_CHANGE) {
                    this.moneyChg();
                }
            }
        }

        private chgreward(){
            if (this._moneyTree) {
                this._moneyTree.drawReward();
            }
        }

        private moneyChg() {
            if (this._moneyTree) {
                this._moneyTree.resetData();
            }
        }

        private showRankingUi(): void {
            if (!this._moneyTree) {
                this._moneyTree = new MoneyTree();
            }
            this._moneyTree.load(() => {
                this._moneyTree.show();
            }, false);
        }

        private hideRankingUi(): void {
            if (this._moneyTree) {
                this._moneyTree.hide();
            }
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MoneyTreeEvent(MoneyTreeEvent.SHOW_MoneyTree_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.HIDE_MoneyTree_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT),
                new MoneyTreeEvent(MoneyTreeEvent.EFF_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE)
            ];
        }
    }
}