module dialog {

    export class DialogueModule extends Module {
        public getModuleName(): string {
            return "DialogueModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new DialogueProcessor()];
        }
    }
    export class DialogueEvent extends BaseEvent {
        public static SHOW_DIALOGUE_PANEL: string = "SHOW_DIALOGUE_PANEL";
        public static HIDE_DIALOGUE_PANEL: string = "HIDE_DIALOGUE_PANEL";
        public entryId: number;

    }
    export class DialogueProcessor extends BaseProcessor {

        public getName(): string {
            return "DialogueProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof DialogueEvent) {
                var evt: DialogueEvent = <DialogueEvent>$event;
                if (evt.type == DialogueEvent.SHOW_DIALOGUE_PANEL) {
                    if (SceneManager.getInstance().render == true) {
                        this.showDialoguePanel(evt.entryId);
                    }
                }
                if (evt.type == DialogueEvent.HIDE_DIALOGUE_PANEL) {
                    if (this._dialoguePanel) {
                        if (this._dialoguePanel.hasStage) {
                            UIManager.getInstance().removeUIContainer(this._dialoguePanel);
                            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
                        }
                    }
                }
            }
            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._dialoguePanel) {
                    this._dialoguePanel.dispose();
                    this._dialoguePanel = null;
                    console.log("释放面板 _dialoguePanel")
                }
            }
        }

        private _dialoguePanel: DialoguePanel;  //对战人员列表
        private showDialoguePanel($id: number): void {
            if (GuidData.map.isBaseMap()) {

                var $taskItem: Array<quest.QuestTaskVo> = quest.QuestModel.getInstance().getQuestDialogueVo($id);
                if($taskItem.length == 0){//打开功能
                    var $entryVo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($id);
                    if(this.npcFun($entryVo.dialogue_id)){
                        return;
                    }
                }

                if (!this._dialoguePanel) {
                    this._dialoguePanel = new DialoguePanel();
                }
                this._dialoguePanel.show($id);
                this._dialoguePanel.load(() => {
                    ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                    UIManager.getInstance().addUIContainer(this._dialoguePanel);
                    this._dialoguePanel.setCamViewMatrx3d()
                })
            }
        }

        private npcFun($dialogueId:number):boolean{
            var sdv:tb.TB_creature_dialogue = tb.TB_creature_dialogue.get_TB_creature_dialogue($dialogueId);
            if(sdv.type > 0){
                if(sdv.type == 1){
                    ModulePageManager.openNpcPanel(sdv.typedata[0][0],sdv.typedata[1]);
                }
                return true;
            }
            return false;
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new DialogueEvent(DialogueEvent.SHOW_DIALOGUE_PANEL),
                new DialogueEvent(DialogueEvent.HIDE_DIALOGUE_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }



    }


}