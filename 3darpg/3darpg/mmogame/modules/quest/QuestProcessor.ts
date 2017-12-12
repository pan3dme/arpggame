module quest {
    export class QuestEvent extends BaseEvent {

        public static SHOW_DAILY_QUEST_EVENT: string = "SHOW_DAILY_QUEST_EVENT"; //显示日常任务面板
        public static HIDE_DAILY_QUEST_EVENT: string = "HIDE_DAILY_QUEST_EVENT"; //隐藏日常任务面板
        public static REFRESH_DAILY_QUEST_EVENT: string = "REFRESH_DAILY_QUEST_EVENT";//更新日常任务面板
        public tabType: number = 0

    }
    export class QuestModule extends Module {
        public getModuleName(): string {
            return "QuestModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new QuestProcessor()];
        }
    }

    export class QuestProcessor extends BaseProcessor {
        public getName(): string {
            return "QuestProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof QuestEvent) {
                var $QuestEvent: QuestEvent = <QuestEvent>$event;
                if ($QuestEvent.type == QuestEvent.SHOW_DAILY_QUEST_EVENT) {
                    this.showDailyQuestPanel();
                } else if ($QuestEvent.type == QuestEvent.HIDE_DAILY_QUEST_EVENT) {
                    if (this._dailyquestpanel) {
                        this._dailyquestpanel.close();
                    }
                } else if ($QuestEvent.type == QuestEvent.REFRESH_DAILY_QUEST_EVENT) {
                    if (this._dailyquestpanel && this._dailyquestpanel.hasStage) {
                        this._dailyquestpanel.refrish();
                    }
                }
            }

            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                if(panelEvent.panel == this._dailyquestpanel){
                    this._dailyquestpanel.dispose();
                    this._dailyquestpanel = null;
                    console.log("释放面板 _questPanel")
                }
            }
        }
  
        private _dailyquestpanel: QuestDailyPanel


        private showDailyQuestPanel(): void {

            if (!this._dailyquestpanel) {
                this._dailyquestpanel = new QuestDailyPanel();
            }

            this._dailyquestpanel.load(() => {
                if(!this._dailyquestpanel.hasStage){
                    UIManager.getInstance().addUIContainer(this._dailyquestpanel);
                    this._dailyquestpanel.refrish();
                }
            })

        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new QuestEvent(QuestEvent.SHOW_DAILY_QUEST_EVENT),
                new QuestEvent(QuestEvent.HIDE_DAILY_QUEST_EVENT),
                new QuestEvent(QuestEvent.REFRESH_DAILY_QUEST_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }

}