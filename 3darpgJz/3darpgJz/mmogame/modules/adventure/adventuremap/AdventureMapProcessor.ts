module adventuremap {
    export class AdventureMapModule extends Module {
        public getModuleName(): string {
            return "AdventureMapModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new AdventureMapProcessor()];
        }
    }
    export class AdventureMapEvent extends BaseEvent {
        public static SHOW_ADVENTURE_MAP_PANEL: string = "SHOW_ADVENTURE_UI_PANEL";
        public static HIDE_ADVENTURE_MAP_PANEL: string = "HIDE_ADVENTURE_UI_PANEL";
        public data:any;
    }
    export class AdventureMapProcessor extends BaseProcessor {

        public getName(): string {
            return "AdventureMapProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof AdventureMapEvent) {
                var evt: AdventureMapEvent = <AdventureMapEvent>$event;
                if (evt.type == AdventureMapEvent.SHOW_ADVENTURE_MAP_PANEL) {
                    this.showPanel(evt.data)
                }
                if (evt.type == AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL) {
                    this.hidePanel()
                }
            }

            if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                if (this.worldAdventureUiPanel) {
                    this.worldAdventureUiPanel.refreshOpenLev();
                }
            }
        }
        private hidePanel(): void {
            if (this.worldAdventureUiPanel) {
                this.worldAdventureUiPanel.hide();
            }
        }
        private worldAdventureUiPanel: WorldAdventureUiPanel
        private showPanel($data:any): void {
            if (!this.worldAdventureUiPanel) {
                this.worldAdventureUiPanel = new WorldAdventureUiPanel();
            }
            this.worldAdventureUiPanel.load(() => {
                console.log("--$data---",$data);
                if(!$data){
                    $data = SharedDef.MODULE_TEST_RISK
                }

                this.worldAdventureUiPanel.show($data);

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_WORLD_RISK
                ModuleEventManager.dispatchEvent($scenePange);


            }, false);
        }


        private _rankPanle: WindowRankPanel;
        public showRank(byte: ByteArray): void {
            var rankresult: s2c_risk_get_rank_result = new s2c_risk_get_rank_result()
            s2c_risk_get_rank_result.read(rankresult, byte);

            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list: Array<WindowRankVo> = new Array;
            for (var i: number = 0; i < rankresult.list.length; i++) {
                var $obj: WindowRankVo = new WindowRankVo();
                var $name = rankresult.list[i].name
                if ($name) {
                    $obj.rank = String(i+1);
                    var tab = tb.TB_risk_data.get_TB_risk_data(rankresult.list[i].value);
                    $obj.val = tab.name;
                    $obj.name = getBaseName($name);
                    $obj.isme = rankresult.list[i].name == GuidData.player.getName();
                    list.push($obj);
                }
            }

            var myStr:string = "我的排名：未上榜";
            for (var j = 0; j < list.length; j++) {
                if(list[j].isme){
                    myStr = "我的排名：" + list[j].rank;
                    break;
                }
            }

            this._rankPanle.load(() => {
                this._rankPanle.show(["排名","玩家名字","关卡"], list,myStr);
            })
        }
        
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_RISK_GET_RANK_RESULT] = ($byte: ByteArray) => { this.showRank($byte) };
            return obj;
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new AdventureMapEvent(AdventureMapEvent.SHOW_ADVENTURE_MAP_PANEL),
                new AdventureMapEvent(AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        }

    }


}