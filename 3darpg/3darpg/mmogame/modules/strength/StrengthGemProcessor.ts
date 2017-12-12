/** 
 * 强化宝石模块
 * 
*/
module strengthgem {

    export class StrengthGemModule extends Module {
        public getModuleName(): string {
            return "StrengthGemModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new StrengthGemProcessor()];
        }
    }
    export class StrengthGemEvent extends BaseEvent {
        public static SHOW_STRENGTHGEM_PANEL: string = "show_strengthgem_panel";
        public static HIDE_STRENGTHGEM_PANEL: string = "hide_strengthgem_panel";
        public static STRENGTHGEM_DATA_CHG: string = "strengthgem_data_chg";
        public static STRENGTHGEM_MUL_CHG: string = "strengthgem_mul_chg";
        public static GEM_UPLEV_CHG: string = "gem_uplev_chg";
        public static GEM_BLESS_CHG: string = "gem_bless_chg";
        public static GEM_MUL_CHG: string = "gem_mul_chg";
        //展示祝福值动效
        public static SHOW_EFFECTS_MOVE: string = "SHOW_EFFECTS_MOVE";

        //强化等级变化
        public static STRENG_LEV_EVENT: string = "STRENG_LEV_EVENT";
        //精炼等级变化
        public static REFINING_LEV_EVENT: string = "REFINING_LEV_EVENT";
        //宝石等级变化
        public static GEM_LEV_EVENT: string = "GEM_LEV_EVENT";
        //洗炼数据变化
        public static WASH_CHG_EVENT: string = "WASH_CHG_EVENT";
        //精炼tip
        public static SHOW_REFINING_TIPS_EVENT: string = "SHOW_REFINING_TIPS_EVENT";
        //大师tip
        public static SHOW_MASTER_TIPS_EVENT: string = "SHOW_MASTER_TIPS_EVENT";
        //特效
        public static EFF_EVENT: string = "EFF_EVENT";
        //大师奖励弹出tip
        public static POP_TIPS_EVENT: string = "POP_TIPS_EVENT";



        public data: any;
        public dataType: number;
    }

    export class StrengthGemProcessor extends BaseProcessor {
        private _newStrengUiPanel: NewStrengUiPanel;
        public getName(): string {
            return "StrengthGemProcessor";
        }

        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof StrengthGemEvent) {
                //红点先处理
                this.processRedPoint();
                var sgEvent: StrengthGemEvent = <StrengthGemEvent>$event;
                if (sgEvent.type == StrengthGemEvent.SHOW_STRENGTHGEM_PANEL) {
                    this.showPanel(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.HIDE_STRENGTHGEM_PANEL) {
                    this.hidePanel();
                    // } else if (sgEvent.type == StrengthGemEvent.STRENGTHGEM_DATA_CHG) {
                    //     this._sgPanel.strengthDataChange(sgEvent.data);
                    // } else if (sgEvent.type == StrengthGemEvent.STRENGTHGEM_MUL_CHG) {
                    //     this._sgPanel.strengMulChange();
                    // } else if (sgEvent.type == StrengthGemEvent.GEM_UPLEV_CHG) {
                    //     this._sgPanel.gemLevChange(sgEvent.data);
                    // } else if (sgEvent.type == StrengthGemEvent.GEM_BLESS_CHG) {
                    //     this._sgPanel.gemBlessChange(sgEvent.data);
                    // } else if (sgEvent.type == StrengthGemEvent.GEM_MUL_CHG) {
                    //     this._sgPanel.gemMulChange();
                } else if (sgEvent.type == StrengthGemEvent.SHOW_EFFECTS_MOVE) {
                    this.showEffectsMove(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.STRENG_LEV_EVENT) {
                    this.strenglevevent(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.REFINING_LEV_EVENT) {
                    this.refininglevevent(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.GEM_LEV_EVENT) {
                    this.gemlevevent(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.WASH_CHG_EVENT) {
                    this.washvochg();
                } else if (sgEvent.type == StrengthGemEvent.SHOW_REFINING_TIPS_EVENT) {
                    this.showrefiningtipsPanel(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.SHOW_MASTER_TIPS_EVENT) {
                    this.showmastertipsPanel(sgEvent.data);
                } else if (sgEvent.type == StrengthGemEvent.EFF_EVENT) {
                    this.effshow();
                } else if (sgEvent.type == StrengthGemEvent.POP_TIPS_EVENT) {
                    this.showpoptios(sgEvent.data);
                }

            } else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                // if (panelEvent.panel == this._sgPanel) {
                //     this._sgPanel.dispose();
                //     this._sgPanel = null;
                //     console.log("释放面板 _sgPanel")
                // }
                if (panelEvent.panel == this._newStrengUiPanel) {
                    this._newStrengUiPanel.dispose();
                    this._newStrengUiPanel = null;
                    console.log("释放面板 _newStrengUiPanel")
                }
                if (panelEvent.panel == this._refiningtipsPanel) {
                    this._refiningtipsPanel.dispose();
                    this._refiningtipsPanel = null;
                    console.log("释放面板 _refiningtipsPanel")
                }
                if (panelEvent.panel == this._masterLevtipsPanel) {
                    this._masterLevtipsPanel.dispose();
                    this._masterLevtipsPanel = null;
                    console.log("释放面板 _masterLevtipsPanel")
                }
                if (panelEvent.panel == this._poplevtipspanel) {
                    this._poplevtipspanel.dispose();
                    this._poplevtipspanel = null;
                    console.log("释放面板 _poplevtipspanel")
                }
            } else if ($event.type == EngineEvent.MONEY_CHANGE) {
                this.refreshCost();
                this.processRedPoint();
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            } else if ($event instanceof charbg.CharBgEvent) {
                if ($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT) {
                    // if(this._needItem){
                    //     if(this.isNeedItem($event.change)){
                    //         this.processRedPoint();
                    //     }
                    // }else{
                        this.processRedPoint();
                    // }
                    
                    if ($event.showType == BagData.TYPE_EQU) {
                        this.bagChg($event.data);
                    } else {
                        // this.refreshCost();
                    }

                    //刷新红点、资源数等UI。
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                        this._newStrengUiPanel.strengTab0.refreshPartChg(this._newStrengUiPanel.strengTab0.lastselect + 1);
                    }
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                        this._newStrengUiPanel.strengTab1.refreshPartChg(this._newStrengUiPanel.strengTab1.lastselect + 1);
                    }
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab2 && this._newStrengUiPanel.strengTab2.hasStage) {
                        this._newStrengUiPanel.strengTab2.refreshPartChg(this._newStrengUiPanel.strengTab2.lastselect + 1);
                    }
                    if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                        this._newStrengUiPanel.strengTab3.drawResItem();
                    }
                }
            }

        }

        // private isNeedItem($chgary:Array<number>):boolean{
        //     if($chgary){
        //         for (let i = 0; i < $chgary.length; i++) {
        //             var hasflag = this._needItem.indexOf($chgary[i]);
        //             if(hasflag != -1){
        //                 return true;
        //             }
        //         }
        //     }
        //     return false;
        // }


        // private _needItem:Array<number>
        private processRedPoint(): void {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MIX,SharedDef.MODULE_MIX_STRENGTH)) {
                //处理节点38下面的子节点
                var strengary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(38).children;
                for (var i: number = 0; i < strengary.length; i++) {
                    var strengVo: StrengVo = NewStrengModel.getInstance().getstrengvo(i + 1);

                    if (strengVo.state == 0 || strengVo.partlev >= GuidData.player.getLevel()) {
                        strengary[i].show = false;
                    } else {
                        var itemtab: tb.TB_equipdevelop_strength = strengVo.nexttab ? strengVo.nexttab : strengVo.curtab

                        var flagarystreng: Array<boolean> = new Array;
                        for (var j = 0; j < itemtab.cost.length; j++) {
                            flagarystreng.push(hasEnoughResItem(itemtab.cost[j]));
                            // if(this._needItem.indexOf(itemtab.cost[j][0]) == -1){
                            //     this._needItem.push(itemtab.cost[j][0]);
                            // }
                        }
                        strengary[i].show = true;
                        for (var flagid = 0; flagid < flagarystreng.length; flagid++) {
                            strengary[i].show = strengary[i].show && flagarystreng[flagid];
                        }
                    }
                }
            }


            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MIX,SharedDef.MODULE_MIX_POLISHED)) {
                //处理节点41下面的子节点
                var refineary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(41).children;
                for (var i: number = 0; i < refineary.length; i++) {
                    var refiningVo: RefiningVo = NewStrengModel.getInstance().getrefiningvo(i + 1);

                    if (refiningVo.state == 0) {
                        refineary[i].show = false;
                    } else {
                        var refiningtab: tb.TB_equipdevelop_refine = refiningVo.nexttab ? refiningVo.nexttab : refiningVo.curtab

                        var flagaryrefining: Array<boolean> = new Array;
                        for (var j = 0; j < refiningtab.cost.length; j++) {
                            flagaryrefining.push(hasEnoughResItem(refiningtab.cost[j]));
                            // if(this._needItem.indexOf(refiningtab.cost[j][0]) == -1){
                            //     this._needItem.push(refiningtab.cost[j][0]);
                            // }
                        }
                        refineary[i].show = true;
                        for (var flagid = 0; flagid < flagaryrefining.length; flagid++) {
                            refineary[i].show = refineary[i].show && flagaryrefining[flagid];
                        }
                    }
                }
            }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_MIX,SharedDef.MODULE_MIX_GEM)) {
                //处理节点44下面的子节点
                var gemary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(44).children;
                for (var i: number = 0; i < gemary.length; i++) {
                    var gemvoary: Array<GemVo> = NewStrengModel.getInstance().getGemvo(i + 1);
                    for (var index = 0; index < gemvoary.length; index++) {
                        gemary[i].show = false;
                        //宝石数据但凡有一个满足红点需求，无需再往下判断
                        if (gemvoary[index].state == 1 || gemvoary[index].state == 3) {
                            var gemvo = gemvoary[index].nexttab ? gemvoary[index].nexttab : gemvoary[index].curtab
                            var flagarygem: Array<boolean> = new Array;
                            for (var j = 0; j < gemvo.cost.length; j++) {
                                flagarygem.push(hasEnoughResItem(gemvo.cost[j]));
                                // if(this._needItem.indexOf(gemvo.cost[j][0]) == -1){
                                //     this._needItem.push(gemvo.cost[j][0]);
                                // }
                            }
                            var aaa: boolean = true;
                            for (var flagid = 0; flagid < flagarygem.length; flagid++) {
                                if (!flagarygem[flagid]) {
                                    aaa = false;
                                    break;
                                }
                            }
                            if (aaa) {
                                gemary[i].show = true;
                                break;
                            }
                        }
                    }
                }
            }
            // console.log("111---",RedPointManager.getInstance().getNodeByID(37));

        }


        private _masterLevtipsPanel: masterLevtipsPanel;
        private showmastertipsPanel($data: number): void {
            if (!this._masterLevtipsPanel) {
                this._masterLevtipsPanel = new masterLevtipsPanel();
            }
            this._masterLevtipsPanel.load(() => {
                this._masterLevtipsPanel.show($data);
            }, false);
        }

        private _refiningtipsPanel: refiningtipsPanel;
        private showrefiningtipsPanel($data: Array<number>): void {
            if (!this._refiningtipsPanel) {
                this._refiningtipsPanel = new refiningtipsPanel();
            }
            this._refiningtipsPanel.load(() => {
                this._refiningtipsPanel.show($data);
            }, false);
        }

        private effshow() {
            if (this._newStrengUiPanel) {
                if (this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                    this._newStrengUiPanel.strengTab0.showExpEff();
                }
                if (this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                    this._newStrengUiPanel.strengTab1.showExpEff();
                }
            }
        }

        private bagChg($partid: Array<number>) {
            if (this._newStrengUiPanel) {
                if (this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                    this._newStrengUiPanel.strengTab0.refreshEqu();
                }
                if (this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                    this._newStrengUiPanel.strengTab1.refreshEqu();
                }
                if (this._newStrengUiPanel.strengTab2 && this._newStrengUiPanel.strengTab2.hasStage) {
                    this._newStrengUiPanel.strengTab2.refreshEqu();
                }
                if (this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                    this._newStrengUiPanel.strengTab3.refreshEqu();
                    this._newStrengUiPanel.strengTab3.drawAttr();
                }
            }
        }

        private washvochg() {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                this._newStrengUiPanel.strengTab3.drawNewAttr();
                this._newStrengUiPanel.strengTab3.drawBtn()
            }
            if (this._newStrengUiPanel && this._newStrengUiPanel.hasStage) {
                this._newStrengUiPanel.refreshCurMasterLev();
            }
        }

        private refreshCost() {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                this._newStrengUiPanel.strengTab0.drawResItem();
            }
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                this._newStrengUiPanel.strengTab1.drawResItem();
            }
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab3 && this._newStrengUiPanel.strengTab3.hasStage) {
                this._newStrengUiPanel.strengTab3.drawResItem();
            }
        }

        private gemlevevent($partid: number) {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab2 && this._newStrengUiPanel.strengTab2.hasStage) {
                this._newStrengUiPanel.strengTab2.refreshPartChg($partid);
            }
        }

        private refininglevevent($partid: number) {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab1 && this._newStrengUiPanel.strengTab1.hasStage) {
                this._newStrengUiPanel.strengTab1.refreshPartChg($partid);
            }
        }

        private strenglevevent($partid: number) {
            if (this._newStrengUiPanel && this._newStrengUiPanel.strengTab0 && this._newStrengUiPanel.strengTab0.hasStage) {
                this._newStrengUiPanel.strengTab0.refreshPartChg($partid);
            }
        }

        private showEffectsMove($num: number): void {
            // if (this._sgPanel && this._sgPanel.strengthPanel && this._sgPanel.strengthPanel.hasStage) {
            //     this._sgPanel.strengthPanel.showEffectsMove($num);
            // }
            // if (this._sgPanel && this._sgPanel.gemPanel && this._sgPanel.gemPanel.hasStage) {
            //     this._sgPanel.gemPanel.showEffectsMove($num);
            // }
        }

        private _poplevtipspanel:PopLevTipsPanel
        private showpoptios($data:Array<number>): void {
            if (!this._poplevtipspanel) {
                this._poplevtipspanel = new PopLevTipsPanel();
            }
            this._poplevtipspanel.load(() => {
                this._poplevtipspanel.show($data);
            });
        }

        private showPanel($data: any): void {
            if (!this._newStrengUiPanel) {
                this._newStrengUiPanel = new NewStrengUiPanel();
            }
            this._newStrengUiPanel.load(() => {
                SceneManager.getInstance().render = false;
                var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);

                if($data instanceof Array){
                    this._newStrengUiPanel.show($data[0]);
                }else{
                    this._newStrengUiPanel.show($data);
                }
                

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_MIX
                ModuleEventManager.dispatchEvent($scenePange);
            });


        }

        private hidePanel(): void {
            if (this._newStrengUiPanel) {
                this._newStrengUiPanel.hide();
            }
            UIManager.popClikNameFun("w_close");
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new StrengthGemEvent(StrengthGemEvent.SHOW_STRENGTHGEM_PANEL),
                new StrengthGemEvent(StrengthGemEvent.HIDE_STRENGTHGEM_PANEL),
                new StrengthGemEvent(StrengthGemEvent.STRENGTHGEM_DATA_CHG),
                new StrengthGemEvent(StrengthGemEvent.STRENGTHGEM_MUL_CHG),
                new StrengthGemEvent(StrengthGemEvent.GEM_UPLEV_CHG),
                new StrengthGemEvent(StrengthGemEvent.GEM_BLESS_CHG),
                new StrengthGemEvent(StrengthGemEvent.GEM_MUL_CHG),
                new StrengthGemEvent(StrengthGemEvent.SHOW_EFFECTS_MOVE),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new EngineEvent(EngineEvent.MONEY_TYPE_GEM),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),


                new StrengthGemEvent(StrengthGemEvent.STRENG_LEV_EVENT),
                new StrengthGemEvent(StrengthGemEvent.REFINING_LEV_EVENT),
                new StrengthGemEvent(StrengthGemEvent.GEM_LEV_EVENT),
                new StrengthGemEvent(StrengthGemEvent.WASH_CHG_EVENT),
                new StrengthGemEvent(StrengthGemEvent.SHOW_REFINING_TIPS_EVENT),
                new StrengthGemEvent(StrengthGemEvent.SHOW_MASTER_TIPS_EVENT),
                new StrengthGemEvent(StrengthGemEvent.EFF_EVENT),
                new StrengthGemEvent(StrengthGemEvent.POP_TIPS_EVENT),
            ];
        }

    }





}