module leftui {
    export class LeftUiModule extends Module {
        public getModuleName(): string {
            return "LeftUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new LeftUiProcessor()];
        }
    }
    export class LeftUiEvent extends BaseEvent {
        public static SHOW_LEFT_UI_PANEL: string = "SHOW_LEFT_UI_PANEL";
        public static HIDE_LEFT_UI_PANEL: string = "HIDE_LEFT_UI_PANEL";

        public static REFRESH_QUEST_EVENT: string = "REFRESH_QUEST_EVENT";

        public static LEFT_HANGUP_BASE_REFRESH: string = "LEFT_HANGUP_BASE_REFRESH";  // 基础挂机数据更新
    }
    export class LeftUiProcessor extends BaseProcessor {

        public getName(): string {
            return "LeftUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof LeftUiEvent) {
                var $topUiEvent: LeftUiEvent = <LeftUiEvent>$event;
                if ($topUiEvent.type == LeftUiEvent.SHOW_LEFT_UI_PANEL) {
                    this.showPanel();
                }
                if ($topUiEvent.type == LeftUiEvent.LEFT_HANGUP_BASE_REFRESH) {
                    //   this.showEffect();
                }
                if ($topUiEvent.type == LeftUiEvent.HIDE_LEFT_UI_PANEL) {
                    this.hidePanel();
                }
                if ($topUiEvent.type == LeftUiEvent.REFRESH_QUEST_EVENT) {
                    if (this.leftUiPanel) {
                        this.leftUiPanel.leftUiQuestPanel.refresh();
                        if (GuidData.map.isBaseMap()) {
                            this.questFinishWalkToNextNpc()
                        }
                    }
                }
            }
            if ($event instanceof EngineEvent) {
                var $EngineEvent: EngineEvent = <EngineEvent>$event;
                if ($EngineEvent.type == EngineEvent.MONEY_CHANGE) {
                    if (this.leftUiPanel) {
                        this.leftUiPanel.leftUiQuestPanel.refresh();
                        console.log("刷新任务")
                    }
                }
            }
        }
        private showEffect(): void {
            var $data: msgtip.MsgEffectsMoveData = new msgtip.MsgEffectsMoveData()
            var $pos: Vector2D = new Vector2D(UIData.designWidth / 2, UIData.designHeight / 2)
            $data.startTM = TimeUtil.getTimer() + random(200);
            $data.endTM = $data.startTM + 500;
            $data.pos = $pos;
            $data.MONEY_TYPE = 1
            $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
            $data.toPos = new Vector2D(150, 178);
            var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA)
            $MsgTipEvent.data = $data
            ModuleEventManager.dispatchEvent($MsgTipEvent);
        }
        private questFinishWalkToNextNpc(): void {
            if (GameInstance.questMoveVo) {  //有记录的任务，以及是挂机模式
                quest.QuestModel.getInstance().walkToNewMainQuest()
            }
        }
        private hidePanel(): void {
            if (this.leftUiPanel) {
                this.leftUiPanel.hide();
            }
        }
        private leftUiPanel: LeftUiPanel;
        private showPanel(): void {
            if (!this.leftUiPanel) {
                this.leftUiPanel = new LeftUiPanel();
            }
            this.leftUiPanel.load(() => {

                if (GuidData.map.isFamilyScene()) {  //家族和挂机
                    //    this.leftUiPanel.tabId = 1;
                } else {
                    //     this.leftUiPanel.tabId = 0;

                }
                if (GuidData.map.isAdventureBossScene()) {
                    AotuSkillManager.getInstance().aotuBattle = true;
                }
                this.leftUiPanel.show()

            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new LeftUiEvent(LeftUiEvent.SHOW_LEFT_UI_PANEL),
                new LeftUiEvent(LeftUiEvent.HIDE_LEFT_UI_PANEL),
                new LeftUiEvent(LeftUiEvent.LEFT_HANGUP_BASE_REFRESH),
                new LeftUiEvent(LeftUiEvent.REFRESH_QUEST_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),

                
            ];
        }

    }


}