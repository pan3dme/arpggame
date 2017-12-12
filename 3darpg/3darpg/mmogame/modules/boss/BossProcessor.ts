module boss {

    export class BossModule extends Module {
        public getModuleName(): string {
            return "BossModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new BossProcessor()];
        }
    }

    export class BossEvent extends BaseEvent {
        public static SHOW_BOSS_PANEL_EVENT: string = "show_boss_panel_event";
        public static HIDE_BOSS_PANEL_EVENT: string = "hide_boss_panel_event";
        public static SHOW_BOSSHP_EVENT: string = "show_bosshp_event";
        public static HIDE_BOSSHP_EVENT: string = "hide_bosshp_event";
        public static SHOW_CHEST_EVENT: string = "show_chest_event";
        public static HIDE_CHEST_EVENT: string = "hide_chest_event";
        public static BOSS_HP_CHANGE_EVENT: string = "boss_hp_change_event";
        public static CHEST_CHANGE_EVENT: string = "chest_change_event";
        public static SHOW_OFTENRANK_PANEL: string = "SHOW_OFTENRANK_PANEL";
        public static HIDE_OFTENRANK_PANEL: string = "HIDE_OFTENRANK_PANEL";
        public static SHOW_BOSSVIEW_PANEL:string = "SHOW_BOSSVIEW_PANEL";
        public data: any;
 
    }

    export class BossProcessor extends BaseProcessor {
        //private _outBossPanel: OutBossPanel;
        private _bossHpPanel: BossHpPanel;
        //private _chestPanel: ChestPanel;
        private bossRankPanel: BossRankPanel;


        public getName(): string {
            return "BossProcessor";
        }

        protected receivedModuleEvent($event: BaseEvent): void {


            if ($event instanceof BossEvent) {
                var $bossEvent: BossEvent = <BossEvent>$event;
                if ($bossEvent.type == BossEvent.SHOW_BOSS_PANEL_EVENT) {
                    //this.show($bossEvent.data);
                } else if ($bossEvent.type == BossEvent.HIDE_BOSS_PANEL_EVENT) {
                    //this.hide();
                } else if ($bossEvent.type == BossEvent.SHOW_BOSSHP_EVENT) {
                    //this.showBossUiHp()
                    this.showHp($bossEvent.data);
                } else if ($bossEvent.type == BossEvent.HIDE_BOSSHP_EVENT) {
                    this.hideHp();
                } else if ($bossEvent.type == BossEvent.BOSS_HP_CHANGE_EVENT) {
                    this.refreshHp($bossEvent.data);
                } else if ($bossEvent.type == BossEvent.SHOW_CHEST_EVENT) {
                    //this.showChest($bossEvent.data);
                } else if ($bossEvent.type == BossEvent.HIDE_CHEST_EVENT) {
                    //this.hideChest();
                } else if ($bossEvent.type == BossEvent.CHEST_CHANGE_EVENT) {
                    //this.refreshChest($bossEvent.data)
                } else if ($bossEvent.type == BossEvent.SHOW_OFTENRANK_PANEL) {
                    //时时排行榜
                    this.showrank(Boolean($bossEvent.data));
                } else if ($bossEvent.type == BossEvent.HIDE_OFTENRANK_PANEL) {
                    this.hiderank();
                }else if($bossEvent.type == BossEvent.SHOW_BOSSVIEW_PANEL){
                    this.showBossView($bossEvent.data);
                }
            }

        }

        private _rankPanle: WindowRankPanel;
        public showwindowRank($data: ByteArray): void {
            var $vo: s2c_show_faction_bossdefense_damage_list = new s2c_show_faction_bossdefense_damage_list();
            s2c_show_faction_bossdefense_damage_list.read($vo, $data);

            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var myrank:number = -1;
            var list: Array<WindowRankVo> = new Array;
            for (var i: number = 0; i < $vo.list.length; i++) {
                var $rankvo: mass_boss_rank_info = $vo.list[i];

                var $obj: WindowRankVo = new WindowRankVo();
                var $name = $rankvo.name;

                if ($name) {
                    $obj.rank = String(i + 1);
                    $obj.val = String($rankvo.dam);
                    $obj.name = getBaseName($name);
                    list.push($obj);
                }
                if($rankvo.name == GuidData.player.getName()){
                    myrank = Number($obj.rank);
                }
            }

            var myStr:string;
            if(myrank > 0){
                myStr = "我的排名：" + myrank;
            }else{
                myStr = "我的排名：未上榜";
            }

            this._rankPanle.load(() => {
                this._rankPanle.show(["排名","玩家名字","输出"], list,myStr);
            })
        }

        private _bossViewPanel:BossViewPanel;
        private showBossView($data:any): void {
            if(!this._bossViewPanel){
                this._bossViewPanel = new BossViewPanel();
            }

            this._bossViewPanel.load(() => {
                //UIManager.getInstance().addUIContainer(this._bossViewPanel);
                this._bossViewPanel.show($data);

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = 901
                ModuleEventManager.dispatchEvent($scenePange);

            })
        }

        private showrank(value:Boolean): void {
            if (!this.bossRankPanel) {
                this.bossRankPanel = new BossRankPanel();
            }
            if (this.bossRankPanel.hasStage && value) {
                this.bossRankPanel.hide();
            } else {
                this.bossRankPanel.load(() => {
                    this.bossRankPanel.show(value);
                }, false)
            }
        }
        private hiderank(): void {

            console.log("---隐藏--");
            if (this.bossRankPanel) {
                this.bossRankPanel.hide();
            }
        }

        // private hide(): void {
        //     if (this._outBossPanel) {
        //         this._outBossPanel.hide();
        //     }
        //     ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        // }

        // private show($data: any): void {
        //     if (!this._outBossPanel) {
        //         this._outBossPanel = new OutBossPanel();
        //     }
        //     this._outBossPanel.load(() => {
        //         if ($data) {
        //             this._outBossPanel.pageTab = $data
        //         }
        //         SceneManager.getInstance().render = false;
        //         ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
        //         this._outBossPanel.show();
        //     })
        // }

        private showHp($data: any): void {
            if (!this._bossHpPanel) {
                this._bossHpPanel = new BossHpPanel();
            }
            this._bossHpPanel.load(() => {
                UIManager.getInstance().addUIContainer(this._bossHpPanel);
                this._bossHpPanel.initUnitData($data);
            },false)
        }


        private hideHp(): void {
            if (this._bossHpPanel) {
                UIManager.getInstance().removeUIContainer(this._bossHpPanel);
            }
        }

        // private showChest($data: any): void {
        //     if (!this._chestPanel) {
        //         this._chestPanel = new ChestPanel();
        //         if (this._bossHpPanel ) {
        //           //  this._chestPanel.init(this._bossHpPanel.uiAtlas);
        //         } else {
        //             this._chestPanel.init(null);
        //         }
        //     }
        //     this._chestPanel.setData($data);
        //     UIManager.getInstance().addUIContainer(this._chestPanel);
        // }

        // private hideChest(): void {
        //     if (this._chestPanel) {
        //         UIManager.getInstance().removeUIContainer(this._chestPanel);
        //     }
        // }

        private refreshHp($data: any): void {
            if (this._bossHpPanel) {
                if ($data.num <= 0) {
                    this.hideHp()
                } else {
                    this._bossHpPanel.setHp($data.num, $data.id);
                }
    
            }
        }

        // private refreshChest($data: any): void {
        //     this._chestPanel.setHp($data);
        // }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new BossEvent(BossEvent.SHOW_BOSS_PANEL_EVENT),
                new BossEvent(BossEvent.HIDE_BOSS_PANEL_EVENT),
                new BossEvent(BossEvent.SHOW_BOSSHP_EVENT),
                new BossEvent(BossEvent.HIDE_BOSSHP_EVENT),
                new BossEvent(BossEvent.SHOW_CHEST_EVENT),
                new BossEvent(BossEvent.HIDE_CHEST_EVENT),
                new BossEvent(BossEvent.BOSS_HP_CHANGE_EVENT),
                new BossEvent(BossEvent.CHEST_CHANGE_EVENT),
                new BossEvent(BossEvent.SHOW_OFTENRANK_PANEL),
                new BossEvent(BossEvent.HIDE_OFTENRANK_PANEL),
                new BossEvent(BossEvent.SHOW_BOSSVIEW_PANEL),


            ];
        }
        public smsg_world_boss_rank($byte: ByteArray): void {

            var $vo: s2c_boss_rank = new s2c_boss_rank();
            s2c_boss_rank.read($vo, $byte);

            if (this.bossRankPanel && this.bossRankPanel.hasStage) {
                this.bossRankPanel.setRankData($vo)
            }

            if (this._bossHpPanel) {
                this._bossHpPanel.showRankBut(true);
            }

        }
        public getHanderMap(): Object {
            var obj: Object = new Object;
            //obj[Protocols.SMSG_FACTION_GET_LIST_RESULT] = ($byte: ByteArray) => { this.getNewList($byte) };

            obj[Protocols.SMSG_BOSS_RANK] = ($byte: ByteArray) => { this.smsg_world_boss_rank($byte) };
            obj[Protocols.SMSG_SHOW_FACTION_BOSSDEFENSE_DAMAGE_LIST] = ($byte: ByteArray) => { this.showwindowRank($byte) };
            return obj;
        }

    }
}