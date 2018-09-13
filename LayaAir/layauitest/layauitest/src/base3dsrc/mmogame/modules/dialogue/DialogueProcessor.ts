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
        public tabId: number = -1;
    }
    export class DialogueProcessor extends BaseProcessor {

        public getName(): string {
            return "DialogueProcessor";
        }
        private npcEtryId: number;
        private tabId: number = -1;
        private faceToNpc($npcEtryId): void {
            for (var i: number = 0; GameInstance.roleList && i < GameInstance.roleList.length; i++) {
                var $tempChar: SceneChar = <SceneChar>GameInstance.roleList[i];
                if ($tempChar.unit && $tempChar.unit.getEntry() == $npcEtryId) {
                    GameInstance.mainChar.watch($tempChar)
                }
            }
        }


        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof DialogueEvent) {
                var evt: DialogueEvent = <DialogueEvent>$event;
                if (evt.type == DialogueEvent.SHOW_DIALOGUE_PANEL) {
                    if (SceneManager.getInstance().render == true) {
                        this.npcEtryId = evt.entryId;
                        this.tabId = evt.tabId;
                        this.showDialoguePanel(evt.entryId);
                        this.faceToNpc(this.npcEtryId)
                    } else {
        


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
                    //console.log("释放面板 _dialoguePanel")
                }
            }
        }

        private _dialoguePanel: DialoguePanel;  //对战人员列表
        private showDialoguePanel($id: number): void {
            if (GuidData.map.isBaseMap()) {

                var $taskItem: Array<quest.QuestTaskVo> = quest.QuestModel.getInstance().getQuestDialogueVo($id);

                if (this.tabId != -1) {
                    if (DialoguePanel.openPanelByTab($id, this.tabId)) {
                        return;
                    }
                }else{
                    var $taskItem: Array<quest.QuestTaskVo> = quest.QuestModel.getInstance().getQuestDialogueVo($id);
                    if($taskItem.length == 0){
                        if (DialoguePanel.openPanelByTab($id, this.tabId)) {
                            return;
                        }
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

        private npcFun(npcid: number): boolean{
            /*
            console.log(this.npcEtryId )
            var sdv:tb.TB_creature_dialogue = tb.TB_creature_dialogue.get_TB_creature_dialogue($dialogueId);
            if(sdv.type > 0){
                if(sdv.type == 1){
                    if(this.tabId == -1){
                        ModulePageManager.openNpcPanel(sdv.typedata[0][0]);
                    }else{
                        ModulePageManager.openNpcPanel(sdv.typedata[0][0],[this.tabId]);
                    }
                    
                }
                return true;
            }
            return false;
            */
            return DialoguePanel.openPanelByTab(npcid, this.tabId)
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