module pass {
    export class PassEvent extends BaseEvent {
        public static SHOW_PASS_PANEL: string = "SHOW_PASS_PANEL"; //显示面板
        public static HIDE_PASS_PANEL: string = "HIDE_PASS_PANEL"; //隐藏面板

        public static SHOW_BOXREWARD_PANEL: string = "SHOW_BOXREWARD_PANEL"; //显示宝箱奖励面板
        public static HIDE_BOXREWARD_PANEL: string = "HIDE_BOXREWARD_PANEL"; //隐藏宝箱奖励面板

        public static SHOW_BOSS_PANEL: string = "SHOW_BOSS_PANEL"; //显示宝箱奖励面板
        public static HIDE_BOSS_PANEL: string = "HIDE_BOSS_PANEL"; //隐藏宝箱奖励面板

        public static REFFRESH_BOX_PANEL: string = "REFFRESH_BOX_PANEL"; //宝箱奖励刷新面板
        public data: any
        public SubmitFun: Function; //回调函数;
    }
    export class PassModule extends Module {
        public getModuleName(): string {
            return "PassModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new PassProcessor()];
        }
    }

    export class PassProcessor extends BaseProcessor {
        public getName(): string {
            return "PassProcessor";
        }

        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof PassEvent) {
                var $PassEvent: PassEvent = <PassEvent>$event;


                if ($PassEvent.type == PassEvent.SHOW_PASS_PANEL) {
                    this.showmapPanel();
                } else if ($PassEvent.type == PassEvent.HIDE_PASS_PANEL) {
                    this.hidemapPanel();
                } else if ($PassEvent.type == PassEvent.SHOW_BOXREWARD_PANEL) {
                    this.showboxrewardpanel($PassEvent);
                } else if ($PassEvent.type == PassEvent.HIDE_BOXREWARD_PANEL) {
                    this.hideboxrewardpanel();
                } else if ($PassEvent.type == PassEvent.SHOW_BOSS_PANEL) {
                    this.showbosspanel($PassEvent.data);
                } else if ($PassEvent.type == PassEvent.HIDE_BOSS_PANEL) {
                    this.hidebosspanel();
                } else if ($PassEvent.type == PassEvent.REFFRESH_BOX_PANEL) {
                    this.refreshBox();
                }

            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this.passUiPanel && this.passUiPanel.hasStage) {
                        if (this.openChapter()) {
                            //播放效果
                            this.passUiPanel.showSysOpenEff();
                        }
                    }
                } else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.init();
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.passUiPanel) {
                    this.passUiPanel.dispose();
                    this.passUiPanel = null;
                    //console.log("释放面板 passUiPanel")
                }
                if (panelEvent.panel == this.boxrewardpanel) {
                    this.boxrewardpanel.dispose();
                    this.boxrewardpanel = null;
                    //console.log("释放面板 boxrewardpanel")
                }
                if (panelEvent.panel == this.bossUiPanel) {
                    this.bossUiPanel.dispose();
                    this.bossUiPanel = null;
                    //console.log("释放面板 bossUiPanel")
                }
            }
        }

        private _openAry: Array<boolean>
        private init() {
            this._openAry = new Array
            //按章节顺序记录。已开启为true
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_instance_stage_chapter);
            for (var $key in $obj.data) {
                if ($obj.data[$key]["stages"][0] <= GuidData.player.getCurPassId()) {
                    //已开放
                    this._openAry.push(true);
                } else {
                    if ($obj.data[$key]["stages"][0] == GuidData.player.getCurPassId() + 1 && $obj.data[$key]["limLev"] <= GuidData.player.getLevel()) {
                        this._openAry.push(true);
                    } else {
                        this._openAry.push(false);
                    }
                }
            }
        }

        private openChapter(): boolean {
            for (let i = 0; i < this._openAry.length; i++) {
                if (!this._openAry[i]) {
                    var $obj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, i + 1);
                    if ($obj["stages"][0] == GuidData.player.getCurPassId() + 1 && $obj["limLev"] <= GuidData.player.getLevel()) {
                        this._openAry[i] = true;
                        return true;
                    }
                }
            }
            return false;
        }

        private refreshBox() {
            if (this.passUiPanel && this.passUiPanel.hasStage) {
                this.passUiPanel.refreshBox();
            }
        }

        private hidebosspanel(): void {
            if (this.bossUiPanel) {
                this.bossUiPanel.hide();
            }
        }
        private bossUiPanel: BossUiPanel
        private showbosspanel($data: any): void {
            if (!this.bossUiPanel) {
                this.bossUiPanel = new BossUiPanel();
            }
            this.bossUiPanel.load(() => {
                this.bossUiPanel.show($data);
                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_CP
                ModuleEventManager.dispatchEvent($scenePange);

            })
        }

        private hideboxrewardpanel(): void {
            if (this.boxrewardpanel) {
                this.boxrewardpanel.hide();
            }
        }
        private boxrewardpanel: BoxRewardPanel
        private showboxrewardpanel($data: PassEvent): void {
            if (!this.boxrewardpanel) {
                this.boxrewardpanel = new BoxRewardPanel();
            }
            this.boxrewardpanel.load(() => {
                this.boxrewardpanel.show($data);
            })
        }

        private hidemapPanel(): void {
            if (this.passUiPanel) {
                this.passUiPanel.hide();
            }
        }
        private passUiPanel: PassUiPanel
        private showmapPanel(): void {
            if (!this.passUiPanel) {
                this.passUiPanel = new PassUiPanel();
            }
            this.passUiPanel.load(() => {
                this.passUiPanel.show();
                if (this.openChapter()) {
                    this.passUiPanel.showSysOpenEff();
                }

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_CP
                ModuleEventManager.dispatchEvent($scenePange);
            })
        }


        // private smsgSendMapLine($byte: ByteArray): void {
        //     if(this.mapUiPanel && this.mapUiPanel.minimap && this.mapUiPanel.minimap.hasStage){
        //         var $vo: s2c_send_map_line = new s2c_send_map_line();
        //         s2c_send_map_line.read($vo, $byte)
        //         this.mapUiPanel.minimap.refreshLine($vo)
        //     }
        // }
        // public getHanderMap(): Object {
        //     var obj: Object = new Object;
        //     obj[Protocols.SMSG_SEND_MAP_LINE] = ($byte: ByteArray) => { this.smsgSendMapLine($byte) };
        //     return obj;
        // }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new PassEvent(PassEvent.SHOW_PASS_PANEL),
                new PassEvent(PassEvent.HIDE_PASS_PANEL),
                new PassEvent(PassEvent.SHOW_BOXREWARD_PANEL),
                new PassEvent(PassEvent.HIDE_BOXREWARD_PANEL),
                new PassEvent(PassEvent.SHOW_BOSS_PANEL),
                new PassEvent(PassEvent.HIDE_BOSS_PANEL),
                new PassEvent(PassEvent.REFFRESH_BOX_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
            ];
        }






    }

}
