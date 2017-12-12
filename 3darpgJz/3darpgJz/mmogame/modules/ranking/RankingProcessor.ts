module ranking {

    export class RankingModule extends Module {
        public getModuleName(): string {
            return "RankingModule";
        }
        protected listProcessors(): Array<Processor> {
            //this.init();
            return [new RankingProcessor()];
        }
    }

    export class RankingEvent extends BaseEvent {
        public static HIDE_RANKING_EVENT: string = "HIDE_RANKING_EVENT";
        public static SHOW_RANKING_EVENT: string = "SHOW_RANKING_EVENT";
        public static REFRESH_RANKING_RIGHTPANEL_EVENT: string = "REFRESH_RANKING_RIGHTPANEL_EVENT";
        public static RANKING_DATA_EVENT: string = "ranking_data_event";
        public static RANKING_LIKE_CHG_EVENT: string = "RANKING_LIKE_CHG_EVENT";
        public static RANKING_OWN_EVENT: string = "RANKING_OWN_EVENT";
        public static REWARD_RANK_PANLE: string = "REWARD_RANK_PANLE";

        public data: any;
    }

    export class RankingProcessor extends BaseProcessor {
        private _rankingUiPanel: RankingUiPanel;

        public getName(): string {
            return "RankingProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            var evt: RankingEvent = <RankingEvent>$event;
            if ($event instanceof RankingEvent) {
                if (evt.type == RankingEvent.SHOW_RANKING_EVENT) {
                    this.showRankingUi(evt.data);
                } else if (evt.type == RankingEvent.HIDE_RANKING_EVENT) {
                    this.hideRankingUi()
                } else if (evt.type == RankingEvent.REFRESH_RANKING_RIGHTPANEL_EVENT) {
                    //更新右侧面板事件
                    this.refreshRightPanel(evt.data)
                } else if (evt.type == RankingEvent.RANKING_DATA_EVENT) {
                    var data: RankQueryData = evt.data;
                    this.rankQueryResult(data);
                } else if (evt.type == RankingEvent.RANKING_LIKE_CHG_EVENT) {
                    this.rankLikeChg();
                } else if (evt.type == RankingEvent.RANKING_OWN_EVENT) {
                    this.rankQueryResult(evt.data);
                } else if (evt.type == RankingEvent.REWARD_RANK_PANLE) {
                    this.showRewardPanel(evt.data);
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._rankingUiPanel) {
                    this._rankingUiPanel.dispose();
                    this._rankingUiPanel = null;
                    console.log("释放面板 _rankingUiPanel")
                }
                if (panelEvent.panel == this._rankReward) {
                    this._rankReward.dispose();
                    this._rankReward = null;
                    console.log("释放面板 _rankReward")
                }
            }


        }


        private _rankReward: RankReward;
        private showRewardPanel($type:number): void {

            console.log("===222",$type);
            if (!this._rankReward) {
                this._rankReward = new RankReward();
            }
            this._rankReward.load(() => {
                this._rankReward.show($type);
            }, false);
        }

        private rankLikeChg() {
            if (this._rankingUiPanel
                && this._rankingUiPanel.currentServerRanking
                && this._rankingUiPanel.currentServerRanking.currentRankingrightPanel) {
                this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.setNum(this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.likenum + 1);
            }
        }

        private rankQueryResult(data: RankQueryData): void {
            //自己的排行结果
            if (this._rankingUiPanel
                && this._rankingUiPanel.currentServerRanking
                && this._rankingUiPanel.currentServerRanking.currentRankingCenterPanel
                && this._rankingUiPanel.currentServerRanking.currentRankingCenterPanel.currentServerRankingList) {
                this._rankingUiPanel.currentServerRanking.currentRankingCenterPanel.resetData(data);
            }

        }


        private refreshRightPanel($data: any): void {
            if (this._rankingUiPanel
                && this._rankingUiPanel.currentServerRanking
                && this._rankingUiPanel.currentServerRanking.currentRankingrightPanel) {
                this._rankingUiPanel.currentServerRanking.currentRankingrightPanel.resetData($data);
            }
        }

        private hideRankingUi(): void {
            if (this._rankingUiPanel) {
                this._rankingUiPanel.hide();
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        private showRankingUi($data: Array<number>): void {
            if (!this._rankingUiPanel) {
                this._rankingUiPanel = new RankingUiPanel();
            }

            this._rankingUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                this._rankingUiPanel.show();
            })
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new RankingEvent(RankingEvent.SHOW_RANKING_EVENT),
                new RankingEvent(RankingEvent.HIDE_RANKING_EVENT),
                new RankingEvent(RankingEvent.REFRESH_RANKING_RIGHTPANEL_EVENT),
                new RankingEvent(RankingEvent.RANKING_DATA_EVENT),
                new RankingEvent(RankingEvent.RANKING_LIKE_CHG_EVENT),
                new RankingEvent(RankingEvent.RANKING_OWN_EVENT),
                new RankingEvent(RankingEvent.REWARD_RANK_PANLE),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
    }

    export class RankQueryData {
        public type: number;
        public rank: number;
        public list: any;
        public allNum: number;
    }

    export class RankItemData {
        public guid: string;
        public name: string;
        public faction: string;
        public rank: number;
        public title: number;

        public power: number;
        public coat: number;
        public weapon: number;
        public vip: number;
        public gender: number;

        public level: number;
        public money: number;

        public divineNum: number;

        public factionActive: number;
        public factionIcon: number;

        public mountLev: number;
        public mountStart: number;

        public like: number;
        public wingid: number;


    }
}