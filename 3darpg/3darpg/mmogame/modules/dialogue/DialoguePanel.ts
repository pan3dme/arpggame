module dialog {

    export class QuestButVo{
        public txt: UICompenent
        public bg:UICompenent
    }

    export class DialoguePanel extends UIPanel {

        private _bgRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender:UIRenderComponent

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();


            this.center = 0
            this.bottom = 0;
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);


            this._midRender.uiAtlas = new UIAtlas;

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/dialogue/dialogue.xml", "ui/uidata/dialogue/dialogue.png", () => { this.loadConfigCom() });
        }

        private a_talk_txt: UICompenent;

        private a_but_next: UICompenent;

        private a_quest_bg_top: UICompenent;
        private a_quest_bg_mid: UICompenent;
        private a_quest_bg_bottom: UICompenent;

        private a_title_bg: UICompenent;
        private a_npc_name: UICompenent;
        private bg: UICompenent;
        private a_talk_bg: UICompenent;

        private questUiItemTXT: Array<QuestButVo>
        private loadConfigCom(): void {
            this._bgRender.uiAtlas=this._midRender.uiAtlas
            this._bottomRender.uiAtlas=this._midRender.uiAtlas
            this._topRender.uiAtlas = this._midRender.uiAtlas;
  
            this.bg = this.addChild(<UICompenent>this._bgRender.getComponent("bg"));
            this.bg.addEventListener(InteractiveEvent.Up, this.clickEvt, this);
            
     

            this.a_quest_bg_top = this._bottomRender.getComponent("a_quest_bg_top");
            this.a_quest_bg_mid = this._bottomRender.getComponent("a_quest_bg_mid");
            this.a_quest_bg_bottom = this._bottomRender.getComponent("a_quest_bg_bottom");

            this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom],true)

            this.a_but_next = this.addEvntBut("a_but_next", this._topRender)


            this.a_talk_bg = this.addChild(<UICompenent>this._bottomRender.getComponent("a_talk_bg"));
            //this.addEvntButUp("a_talk_bg", this._bottomRender)

            this.a_title_bg = this.addChild(<UICompenent>this._midRender.getComponent("a_title_bg"));

            this.a_npc_name = this.addChild(<UICompenent>this._topRender.getComponent("a_npc_name"));

            this.a_talk_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_talk_txt"));
       
            
            

            this.questUiItemTXT = new Array;
            for (var i: number = 0; i < 3; i++) {
                var $QuestButVo: QuestButVo = new QuestButVo();
                $QuestButVo.txt = this.addEvntBut("a_quest_" + i, this._topRender);
                $QuestButVo.bg = this._midRender.getComponent("a_quest_but_bg")
                $QuestButVo.bg.x = $QuestButVo.txt.x
                $QuestButVo.bg.y = $QuestButVo.txt.y-5
                this.questUiItemTXT.push($QuestButVo);
            }
            this.addRoleChar()
            this.uiAtlasComplet = true
            this.applyLoadComplete();
            this.refresh()

        }
        private uiAtlasComplet:boolean=false
        private roleChar: DialogueUIChar

        private addRoleChar(): void {
            this.roleChar = new DialogueUIChar();
            this.roleChar.loadFinishFun = () => { this.loadRoleFinish()}
            this._topRender.addModel(this.roleChar);

        }
        public loadRoleFinish(): void {
            this.resize();
        }
        protected butClik(evt: InteractiveEvent): void {
            this.endTime = TimeUtil.getTimer() + 100//特殊零时延时有BUG
            if (evt.target.data) {
                this.selectQuestToPanel(evt.target.data)
            } else {
                this.selectButClik()
            }
        }
        private selectQuestToPanel($vo:quest.QuestTaskVo): void
        {

            if ($vo.tb_quest.specialButton) {
                console.log($vo.tb_quest.specialButton)
                this.sendToNpcTalk(this._entryId, $vo.id);
                this.close()

            } else {
                this.needSelectQuest = false;
                this.setButVisible(false)
                this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], false)
                this.selectQuestTaskVo = $vo;
                this.showTextList(this.selectQuestTaskVo.tb_quest.dialogue);
            }
        }

        private setButVisible(value:boolean): void
        {
            for (var i: number = 0; i < this.questUiItemTXT.length; i++) {
                this.setUiListVisibleByItem([this.questUiItemTXT[i].txt], false);
                this.setUiListVisibleByItem([this.questUiItemTXT[i].bg], false);
            }
        }
        private selectButClik(): void
        {
            if (this.selectQuestTaskVo&&this.selectQuestTaskVo.tb_quest.specialButton) {
                this.close();
            } else {
                if (this.selectDialogueVo.next_id) {
                    this.showTextList(this.selectDialogueVo.next_id);
                } else {
                    if (this.needSelectQuest) {  //需要选择并没有选中任务
                        if (GameInstance.questMoveVo) {
                            this.selectQuestToPanel(GameInstance.questMoveVo.data)
                        }
                    } else {
                        if (!this.needSelectQuest && this.selectQuestTaskVo) {
                            this.sendToNpcTalk(this._entryId, this.selectQuestTaskVo.id);
                        } else {
                            //this.sendToNpcTalk(this._entryId, 0);
                        }
                        this.close()
                    }

                }
            }
        }
        private sendToNpcTalk($entryId:number,$quid:number): void
        {

            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                if (GameInstance.roleList[i].unit.getEntry() == $entryId) {
                    console.log("发送", GameInstance.roleList[i].unit.getUintGuid(), $quid)
                    NetManager.getInstance().protocolos.talk_with_npc(GameInstance.roleList[i].unit.getUintGuid(), $quid);
                    return;
                }
            }

      
        }
        public clickEvt($evt: any): void {
            if (this.endTime < TimeUtil.getTimer() && this.uiAtlasComplet) {
             //   this.close();
                this.selectButClik();
            }
        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

            Engine.resetViewMatrx3D()

        }
        private needSelectQuest: boolean = false;
        private selectQuestTaskVo: quest.QuestTaskVo
        private endTime:number=0
        public refresh(): void {
            this.selectQuestTaskVo = null

            if (this.a_talk_txt) {
                var $entryVo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template(this._entryId);
                var $taskItem: Array<quest.QuestTaskVo> = quest.QuestModel.getInstance().getQuestDialogueVo(this._entryId);

                // if($taskItem.length == 0){//打开功能
                //     if(this.npcFun($entryVo.dialogue_id)){
                //         return;
                //     }
                // }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_npc_name.skinName, $entryVo.name, 18, TextAlign.CENTER, "#ffde45");

                
             
                var $hasSpecial:boolean=false
                for (var i: number = 0; i < $taskItem.length; i++) {
                    if ($taskItem[i].tb_quest.specialButton) {
                        $hasSpecial=true
                    }
                }
                this.setButVisible(false)
                var $dialogueId: number = $entryVo.dialogue_id
                if ($taskItem.length > 1 || $hasSpecial) {
                    var blen: number = Math.min(3, $taskItem.length);
                    this.a_quest_bg_top.y = 350 - (16 * 2 + blen * 45);

                    this.a_quest_bg_mid.y = this.a_quest_bg_top.y + this.a_quest_bg_top.height;
                    this.a_quest_bg_mid.height = blen * 45;
                    this.a_quest_bg_bottom.y = this.a_quest_bg_mid.y + this.a_quest_bg_mid.height;

                    this.a_quest_bg_mid.x = this.a_quest_bg_top.x;
                    this.a_quest_bg_bottom.x = this.a_quest_bg_top.x;

                    this.showQuestListBut($taskItem);
                    this.needSelectQuest = true
                    this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], true);

                } else {
                    this.setUiListVisibleByItem([this.a_quest_bg_top, this.a_quest_bg_mid, this.a_quest_bg_bottom], false)
                }
                if ($taskItem.length == 1) {
                    $dialogueId= $taskItem[0].tb_quest.dialogue
                    this.selectQuestTaskVo = $taskItem[0]
                }
                this.showTextList($dialogueId);
             
                this.endTime = TimeUtil.getTimer() + 100//特殊零时延时有BUG
            }
        }
        private showQuestListBut($taskItem: Array<quest.QuestTaskVo> ): void
        {
        
   
            for (var i: number = 0; i < this.questUiItemTXT.length&&i<3; i++) {
     
                if (Boolean($taskItem[i])) {
                    this.setUiListVisibleByItem([this.questUiItemTXT[i].txt], true);
                    this.setUiListVisibleByItem([this.questUiItemTXT[i].bg], true);

                    this.questUiItemTXT[i].bg.x = this.a_quest_bg_top.x + 20;
                    this.questUiItemTXT[i].txt.x = this.a_quest_bg_top.x + 20;
                    this.questUiItemTXT[i].bg.y = i * 45 + this.a_quest_bg_top.y + this.a_quest_bg_top.height;
                    this.questUiItemTXT[i].txt.y = this.questUiItemTXT[i].bg.y + 15;


                    this.questUiItemTXT[i].txt.data = $taskItem[i];
                    var $txtStr: string =  $taskItem[i].tb_quest.questName;
                    if ($taskItem[i].tb_quest.specialButton) {
                        $txtStr =  $taskItem[i].tb_quest.specialButton;
                    }
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.questUiItemTXT[i].txt.skinName, "[59d9fe]"+ $txtStr,16,TextAlign.CENTER)
                }
          
            }

        }

        
        private selectDialogueVo: tb.TB_creature_dialogue;
        public showTextList($dialogueId:number): void
        {
            this.selectDialogueVo = tb.TB_creature_dialogue.get_TB_creature_dialogue($dialogueId);
            var $str: string = this.selectDialogueVo.npc_dialogue
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_talk_txt.skinName, $str, 16, TextAlign.LEFT);
           var $tb_Vo:tb.TB_creature_template= tb.TB_creature_template.get_TB_creature_template(this._entryId)
     
           this.roleChar.setAvatar($tb_Vo.avatar);
            this.resize()
        }
        public resize(): void {

            super.resize();
            if (this.roleChar) {
                this.roleChar.scale = 5 * UIData.Scale;
                this.roleChar.x = 100
                this.roleChar.y = 600+this.y/2
                this.roleChar.resize();
                this.roleChar.updateMatrix();


            }
            if(this.bg){
                this.bg.left = 0;
                this.bg.top = 0;
                this.bg.width = Scene_data.stageWidth / UIData.Scale
                this.bg.height = Scene_data.stageHeight / UIData.Scale


                this.a_talk_bg.left = 0;
                this.a_talk_bg.bottom = 0;
                this.a_talk_bg.width = Scene_data.stageWidth / UIData.Scale

            }
        }

        private _entryId: number;
        public show( $entryId: number): void {
            this._entryId = $entryId;
            this.refresh();

         
        }
        public setCamViewMatrx3d(): void
        {
            Scene_data.viewMatrx3D.identity()
            var fovw: number = Scene_data.stageWidth
            var fovh: number = Scene_data.stageHeight
            Scene_data.sceneViewHW = Math.max(fovw, fovh)
            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 50, Scene_data.camFar);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            Scene_data.viewMatrx3D.appendScale(1, 1, 0.1);
            Scene_data.viewMatrx3D.appendTranslation(0, 0, 0.9);
        }
    }
}