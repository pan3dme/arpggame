module fb {
    export class ExpEvent extends BaseEvent {
        public static SHOW_EXP_PANEL: string = "SHOW_EXP_PANEL";
        public static HIDE_EXP_PANEL: string = "HIDE_EXP_PANEL";
        public static REFRESH_TIMES_PANEL: string = "REFRESH_TIMES_PANEL";
        public data: any;
        public seltab: any
    }
    export class ExpProcessor extends BaseProcessor {

        public getName(): string {
            return "ExpProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof ExpEvent) {
                var evt: ExpEvent = <ExpEvent>$event;
                if (evt.type == ExpEvent.SHOW_EXP_PANEL) {
                    this.showPanel(evt.data,evt.seltab)
                }
                if (evt.type == ExpEvent.HIDE_EXP_PANEL) {
                    this.hidePanel()
                }
                if (evt.type == ExpEvent.REFRESH_TIMES_PANEL) {
                    this.refreshTimes()
                }
            }

            if ($event instanceof copytask.CopytaskUiEvent) {
                if ($event.type == copytask.CopytaskUiEvent.SELECT_ITEM_EVENT) {
                    this.selectitem($event.data);
                }
                if ($event.type == copytask.CopytaskUiEvent.CHG_TEAM_NUM) {
                    this.refreshTeamNum();
                }
            }

            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                    if(this._expUiPanel && this._expUiPanel.hasStage){
                        this._expUiPanel.showTab1();
                    }
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._expUiPanel) {
                    this._expUiPanel.dispose();
                    this._expUiPanel = null;
                    //console.log("释放面板 trainingUiPanel")
                }
            }
        }

        private selectitem($data: SListItemData) {
            if (this._expUiPanel && this._expUiPanel.teamcopyUiPanel) {
                this._expUiPanel.teamcopyUiPanel.resetData($data.data);
            }
        }

        private refreshTeamNum() {
            if (this._expUiPanel && this._expUiPanel.teamcopyUiPanel && this._expUiPanel.teamcopyUiPanel.hasStage) {
                this._expUiPanel.teamcopyUiPanel.drawBuynum();
            }
        }

        private refreshTimes(){
            if(this._expUiPanel && this._expUiPanel.exptaskpanel && this._expUiPanel.exptaskpanel.hasStage){
                this._expUiPanel.exptaskpanel.refreshNum();
            }
        }

        private hidePanel(): void {
            if (this._expUiPanel) {
                this._expUiPanel.hide();
            }
        }
        private _expUiPanel: ExpUiPanel
        private showPanel($data: any,$seltab: any): void {
            if (!this._expUiPanel) {
                this._expUiPanel = new ExpUiPanel();
            }
            this._expUiPanel.load(() => {
                if(!$data){
                    $data = [SharedDef.MODULE_TEAMINSTANCE_EXP,SharedDef.MODULE_TEAMINSTANCE_TEAM]
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

                this._expUiPanel.show($data,$seltab);

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_GW
                ModuleEventManager.dispatchEvent($scenePange);

            }, true);
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ExpEvent(ExpEvent.SHOW_EXP_PANEL),
                new ExpEvent(ExpEvent.HIDE_EXP_PANEL),
                new ExpEvent(ExpEvent.REFRESH_TIMES_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.CHG_TEAM_NUM),
                new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SELECT_ITEM_EVENT),
            ];
        }

    }


}