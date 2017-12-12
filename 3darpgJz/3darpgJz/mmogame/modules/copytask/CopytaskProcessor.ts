module copytask {
    export class CopytaskUiModule extends Module {
        public getModuleName(): string {
            return "CopytaskUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new CopytaskProcessor()];
        }
    }
    export class CopytaskUiEvent extends BaseEvent {
        //展示法宝面板
        public static SHOW_COPYTASK_EVENT: string = "SHOW_COPYTASK_EVENT";
        //隐藏法宝面板
        public static HIDE_COPYTASK_EVENT: string = "HIDE_COPYTASK_EVENT";
        //选中item
        public static SELECT_ITEM_EVENT: string = "SELECT_ITEM_EVENT";
        //解锁法宝
        public static UNLOCK_WEAPON_EVENT: string = "UNLOCK_WEAPON_EVENT";
        //更新法宝数据
        public static CHANGE_WEAPON_EVENT: string = "CHANGE_WEAPON_EVENT";
        //首胜flag变化
        public static CHANGE_FIRST_EVENT: string = "CHANGE_FIRST_EVENT";
        //打开匹配面板
        public static SHOW_WAITJOIN_PANEL: string = "SHOW_WAITJOIN_PANEL";

        public static RES_FUBEN_REFRESH: string = "RES_FUBEN_REFRESH";

        public static TOWER_FUBEN_SWEEP: string = "TOWER_FUBEN_SWEEP";

        public static SHOW_TOWER_RANK: string = "SHOW_TOWER_RANK";
        //组队副本挑战次数变化
        public static CHG_TEAM_NUM: string = "CHG_TEAM_NUM";

        public data: any
        public seltab: any
    }

    export class CopytaskProcessor extends BaseProcessor {
        private _copytaskUiPanel: CopytaskUiPanel

        public getName(): string {
            return "TreasureProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof CopytaskUiEvent) {
                var $uiEvent: CopytaskUiEvent = <CopytaskUiEvent>$event;
                if ($uiEvent.type == CopytaskUiEvent.SHOW_COPYTASK_EVENT) {
                    this.showUi($uiEvent.data,$uiEvent.seltab);
                } else if ($uiEvent.type == CopytaskUiEvent.HIDE_COPYTASK_EVENT) {
                    this.hideUi()
                } else if ($uiEvent.type == CopytaskUiEvent.SELECT_ITEM_EVENT) {
                    this.selectitem($uiEvent.data);
                } else if ($uiEvent.type == CopytaskUiEvent.UNLOCK_WEAPON_EVENT) {
                    // this.unlockweapon();
                } else if ($uiEvent.type == CopytaskUiEvent.CHANGE_WEAPON_EVENT) {
                    // this.changeweapon();
                } else if ($uiEvent.type == CopytaskUiEvent.CHANGE_FIRST_EVENT) {
                    this.changezhanli();
                } else if ($uiEvent.type == CopytaskUiEvent.SHOW_WAITJOIN_PANEL) {
                    this.showwaitjoinPanel($uiEvent.data);
                } else if ($uiEvent.type == CopytaskUiEvent.RES_FUBEN_REFRESH) {
                    this.refreshRes();
                    this.processRedPoint();
                } else if ($uiEvent.type == CopytaskUiEvent.TOWER_FUBEN_SWEEP) {
                    this.refreshTower();
                } else if ($uiEvent.type == CopytaskUiEvent.SHOW_TOWER_RANK) {
                    this.showRank($uiEvent.data);
                } else if ($uiEvent.type == CopytaskUiEvent.CHG_TEAM_NUM) {
                    this.refreshTeamNum();
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._copytaskUiPanel) {

                    var ary122: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(122).children;
                    for (var i: number = 0; i < ary122.length; i++) {
                        ary122[i].unBind();
                    }

                    this._copytaskUiPanel.dispose();
                    this._copytaskUiPanel = null;
                    console.log("释放面板 _copytaskUiPanel")
                }
                if (panelEvent.panel == this._waitjoinPanel) {
                    this._waitjoinPanel.dispose();
                    this._waitjoinPanel = null;
                    console.log("释放面板 _waitjoinPanel")
                }
            }

            if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                //红点初始化
                this.initRedNode();
            } else if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                    this._copytaskUiPanel.sysopen();
                }
                this.processRedPoint();
            } else if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                this.processRedPoint();
            } else if ($event.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL) {
                if (this._copytaskUiPanel && this._copytaskUiPanel.resCopyTaskPanel && this._copytaskUiPanel.resCopyTaskPanel.hasStage) {
                    this._copytaskUiPanel.resCopyTaskPanel.visiableBtn();
                }
            }
        }

        private _nodeInit: boolean = false;
        private initRedNode(): void {
            if (this._nodeInit) {
                return;
            }
            var pnode122: RedPointNode = RedPointManager.getInstance().getNodeByID(122);
            var $arr122: Array<fb.FuBenResVo> = fb.FuBenModel.getInstance().getFubenResItem();
            for (var i: number = 0; i < $arr122.length; i++) {
                var node: RedPointNode = new RedPointNode();
                node.data = $arr122[i];
                pnode122.addChild(node);
            }

            this._nodeInit = true;
            this.processRedPoint();
        }

        private processRedPoint(): void {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_INSTANCE,SharedDef.MODULE_INSTANCE_RES)) {
                var $arr122: Array<fb.FuBenResVo> = fb.FuBenModel.getInstance().getFubenResItem();
                var ary122: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(122).children;
                for (var j: number = 0; j < ary122.length; j++) {
                    ary122[j].data = $arr122[j];
                    var aa: fb.FuBenResVo = $arr122[j];
                    ary122[j].show = aa.num < aa.maxtime && aa.data.limLev <= GuidData.player.getLevel()
                }
            }
        }

        private refreshTeamNum() {
            if (this._copytaskUiPanel && this._copytaskUiPanel.teamcopyUiPanel && this._copytaskUiPanel.teamcopyUiPanel.hasStage) {
                this._copytaskUiPanel.teamcopyUiPanel.drawBuynum();
            }
        }

        private changezhanli() {
            if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                // this._copytaskUiPanel.setZhanli();
            }
        }

        private refreshRes(): void {
            if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                this._copytaskUiPanel.refreshRes();
            }
        }

        private refreshTower(): void {
            if (this._copytaskUiPanel && this._copytaskUiPanel.hasStage) {
                this._copytaskUiPanel.refreshTower();
            }
        }

        private _rankPanle: WindowRankPanel;
        public showRank($data: any): void {
            if (!this._rankPanle) {
                this._rankPanle = new WindowRankPanel();
            }
            var list: Array<WindowRankVo> = new Array;
            for (var i: number = 0; i < $data.list.length; i++) {
                var $guidObject: GuidObject = $data.list[i];

                var $obj: WindowRankVo = new WindowRankVo();
                var $name = $guidObject.GetStr(SharedDef.RANK_LIST_CURRENT_OBJ_STR_FIELD_PLAYER_NAME)

                if ($name) {
                    $obj.rank = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_RANKING));
                    $obj.val = String($guidObject.GetUInt32(SharedDef.RANK_LIST_CURRENT_OBJ_INT_FIELD_TRIAL));
                    $obj.name = getBaseName($name);
                    list.push($obj);
                }
            }

            var myStr: string;
            if ($data.self > 0) {
                myStr = "我的排名：" + $data.self;
            } else {
                myStr = "我的排名：未上榜";
            }

            this._rankPanle.load(() => {
                this._rankPanle.show(["排名", "玩家名字", "关卡"], list, myStr);
            })
        }


        private selectitem($data: SListItemData) {
            if (this._copytaskUiPanel && this._copytaskUiPanel.teamcopyUiPanel) {
                this._copytaskUiPanel.teamcopyUiPanel.resetData($data.data);
            }
        }

        private hideUi(): void {
            this._copytaskUiPanel.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        private showUi($data: any,$seltab: any): void {
            if (!this._copytaskUiPanel) {
                this._copytaskUiPanel = new CopytaskUiPanel();
            }
            this._copytaskUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                
                if(!$data){
                    $data = [2,3,4]
                }else{
                    if(!($data instanceof Array)){
                        $data = [$data];  
                    }
                }

                if(!$seltab){
                    $seltab = $data[0]
                }else{
                    if($seltab instanceof Array){
                        $seltab = $seltab[0]
                    }
                }

                this._copytaskUiPanel.show($data,$seltab);


                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_INSTANCE
                ModuleEventManager.dispatchEvent($scenePange);

            });
        }


        private _waitjoinPanel: waitjoinPanel;
        private showwaitjoinPanel($data: s2c_kuafu_match_wait): void {
            if (!this._waitjoinPanel) {
                this._waitjoinPanel = new waitjoinPanel();
            }
            this._waitjoinPanel.load(() => {
                this._waitjoinPanel.show($data);
            }, false);
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new CopytaskUiEvent(CopytaskUiEvent.SHOW_COPYTASK_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.HIDE_COPYTASK_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.SELECT_ITEM_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.UNLOCK_WEAPON_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.CHANGE_WEAPON_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.CHANGE_FIRST_EVENT),
                new CopytaskUiEvent(CopytaskUiEvent.RES_FUBEN_REFRESH),
                new CopytaskUiEvent(CopytaskUiEvent.TOWER_FUBEN_SWEEP),
                new CopytaskUiEvent(CopytaskUiEvent.SHOW_TOWER_RANK),
                new CopytaskUiEvent(CopytaskUiEvent.CHG_TEAM_NUM),

                new CopytaskUiEvent(CopytaskUiEvent.SHOW_WAITJOIN_PANEL),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        }
    }

}