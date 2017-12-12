module skillUi {
    export class SkillUiModule extends Module {
        public getModuleName(): string {
            return "SkillUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new SkillUiProcessor()];
        }
    }
    export class SkillUiEvent extends BaseEvent {
        //展示技能面板
        public static SHOW_SKILLUI_EVENT: string = "SHOW_SKILLUI_EVENT";
        //隐藏技能面板
        public static HIDE_SKILLUI_EVENT: string = "HIDE_SKILLUI_EVENT";
        //技能列表事件
        public static SELECT_SKILLUI_TYPE_EVENT: string = "SELECT_SKILLUI_TYPE_EVENT";
        //显示“技能的详细信息”事件
        public static SELECT_SKILLCONTENT_TYPE_EVENT: string = "SELECT_SKILLCONTENT_TYPE_EVENT";
        //打开获取真气面板
        public static SHOW_MAXVPPANEL_EVENT: string = "SHOW_MAXVPPANEL_EVENT";
        //关闭获取真气面板
        public static HIDE_MAXVPPANEL_EVENT: string = "HIDE_MAXVPPANEL_EVENT";
        //技能有更新，当页面有打开时，需要更新数据
        public static RESET_SKILL_UI_DATA: string = "RESET_SKILL_UI_DATA";
        public static SKILL_UP_EVENT: string = "SKILL_UP_EVENT";
        //
        public skillBaseDataVo: tb.SkillDataVo
        public data: any

    }

    export class SkillUiProcessor extends BaseProcessor {
        //private _skillUiPanel: SkillUiPanel

        public getName(): string {
            return "SkillUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof SkillUiEvent) {
                var $skillUIEvent: SkillUiEvent = <SkillUiEvent>$event;
                if ($skillUIEvent.type == SkillUiEvent.SHOW_SKILLUI_EVENT) {
                    this.showNewUI();
                    //this.showUi();
                } else if ($skillUIEvent.type == SkillUiEvent.HIDE_SKILLUI_EVENT) {
                    //this.hideUi()
                } else if ($skillUIEvent.type == SkillUiEvent.SKILL_UP_EVENT) {
                    this.showSkillUpEff();
                } else if ($skillUIEvent.type == SkillUiEvent.RESET_SKILL_UI_DATA) {
                    this.refreshNode();
                    this.resetSkillUiData();
                }
            } else if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.MONEY_CHANGE || $engineEvent.type == EngineEvent.SYSTEM_OPEN_EVENT || $engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    this.refreshNode();
                } else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                    this.initNode();
                }
            } else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._skillPanel) {
                    this._skillPanel.dispose();
                    this._skillPanel = null;
                    console.log("释放面板 _skillUiPanel")
                }
            }
        }
        private resetSkillUiData(): void {
            //    if (this._skillUiPanel) {
            //         this._skillUiPanel.refresh()
            //    }
            if (this._skillPanel && this._skillPanel.hasStage) {
                this._skillPanel.refreshLev();
            }
        }
        // /**
        //  *选择技能详细内容
        //  */
        // private selectSkillContent($SkillBaseDataVo: tb.SkillDataVo): void {
        //     if (this._skillUiPanel) {
        //         this._skillUiPanel.skillPanelC.resetData($SkillBaseDataVo);
        //     }
        // }
        // private hideUi(): void {
        //     UIManager.getInstance().removeUIContainer(this._skillUiPanel);
        //     ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        // }
        // private showUi(): void {
        //     if (!this._skillUiPanel) {
        //         this._skillUiPanel = new SkillUiPanel();
        //     }
        //     this._skillUiPanel.load(() => {
        //         //停止绘制前面的ui
        //         SceneManager.getInstance().render = false;
        //         ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
        //         this.resetSkillUiData();
        //         UIManager.getInstance().addUIContainer(this._skillUiPanel);

        //         var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
        //         $scenePange.data = SharedDef.MODULE_SPELL
        //         ModuleEventManager.dispatchEvent($scenePange);
        //     })

        // }
        private _skillPanel: SkillPanel;
        private showNewUI(): void {
            if (!this._skillPanel) {
                this._skillPanel = new SkillPanel();
            }
            this._skillPanel.load(() => {
                var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);
                this._skillPanel.show();


                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_SPELL
                ModuleEventManager.dispatchEvent($scenePange);
            })
        }

        private showSkillUpEff():void{
            if(this._skillPanel){
                this._skillPanel.showSkillUpEff();
            }
        }


        private initNode(): void {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_show, GuidData.player.getCharType());
            var zhudongList: Array<number> = $obj.zhudong_list;
            var beidongList: Array<number> = $obj.passive_list;

            var pnode: RedPointNode = RedPointManager.getInstance().getNodeByID(15);
            for (var i: number = 0; i < zhudongList.length; i++) {
                var node: RedPointNode = new RedPointNode();
                node.data = zhudongList[i];
                pnode.addChild(node);

            }

            pnode = RedPointManager.getInstance().getNodeByID(16);
            for (var i: number = 0; i < beidongList.length; i++) {
                var node: RedPointNode = new RedPointNode();
                node.data = beidongList[i];
                pnode.addChild(node);
            }
            this.refreshNode();

        }
        private refreshNode(): void {
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_SPELL,SharedDef.MODULE_SPELL_ALL)) {
                if(GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_SPELL)){
                    this.refreshNodeByID(15);
                    this.refreshNodeByID(16);
                }
                if(this._skillPanel){
                    this._skillPanel.showRedPoint();
                }    
            }
        }
        private refreshNodeByID($id: number): boolean {

            var flag :boolean = false;
            var ary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID($id).children;
            var plev: number = GuidData.player.getLevel();
            for (var i: number = 0; i < ary.length; i++) {
                var id: number = ary[i].data;
                var lev: number = GuidData.grow.getSkillLev(id);

                var baseData: any = TableData.getInstance().getData(TableData.tb_skill_base, id);
                if((baseData.uplevel_id[1] - baseData.uplevel_id[0]) < lev){
                    ary[i].show = false;
                    continue;
                }
                var levData: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, baseData.uplevel_id[0] + lev - 1);
                

                if (lev > 0 && hasEnoughRes(levData.uplevel_cost[0]) && levData.need_level <= plev) {
                    ary[i].show = true;
                    flag = true;
                } else {
                    ary[i].show = false;
                }
                
            }

            return flag;

        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SkillUiEvent(SkillUiEvent.SHOW_SKILLUI_EVENT),
                new SkillUiEvent(SkillUiEvent.HIDE_SKILLUI_EVENT),
                new SkillUiEvent(SkillUiEvent.SELECT_SKILLUI_TYPE_EVENT),
                new SkillUiEvent(SkillUiEvent.SELECT_SKILLCONTENT_TYPE_EVENT),
                new SkillUiEvent(SkillUiEvent.SHOW_MAXVPPANEL_EVENT),
                new SkillUiEvent(SkillUiEvent.HIDE_MAXVPPANEL_EVENT),
                new SkillUiEvent(SkillUiEvent.RESET_SKILL_UI_DATA),
                new SkillUiEvent(SkillUiEvent.SKILL_UP_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }

}