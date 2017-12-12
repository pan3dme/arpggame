module whisper {
    export class WhisperUiModule extends Module {
        public getModuleName(): string {
            return "WhisperUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new whisperUiProcessor()];
        }
    }
    export class WhisperUiEvent extends BaseEvent {
        public static SHOW_WHISPER_PANEL: string = "SHOW_WHISPER_PANEL";
        public static SELECT_ITEM_EVENT: string = "SELECT_ITEM_EVENT";
        public static RECIVE_NEWS_MSG_EVENT: string = "RECIVE_NEWS_MSG_EVENT";

        //好友列表数据变化
        public static REFRESHFRIENDlIST_EVENT: string = "REFRESHFRIENDlIST_EVENT";
        //复制一条消息
        public static COPY_ONE_MSG_EVENT: string = "COPY_ONE_MSG_EVENT";

        public data: any
    }
    export class whisperUiProcessor extends BaseProcessor {

        public getName(): string {
            return "whisperUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof WhisperUiEvent) {
                var $WhisperUiEvent: WhisperUiEvent = <WhisperUiEvent>$event;
                if ($WhisperUiEvent.type == WhisperUiEvent.SHOW_WHISPER_PANEL) {
                    this.showPanel($WhisperUiEvent.data)
                } else if ($WhisperUiEvent.type == WhisperUiEvent.SELECT_ITEM_EVENT) {
                    this.selectItem($WhisperUiEvent.data);
                } else if ($WhisperUiEvent.type == WhisperUiEvent.RECIVE_NEWS_MSG_EVENT) {
                    this.recivenewsmsg($WhisperUiEvent.data);
                } else if ($WhisperUiEvent.type == WhisperUiEvent.REFRESHFRIENDlIST_EVENT) {
                    this.refreshFriendList();
                } else if ($WhisperUiEvent.type == WhisperUiEvent.COPY_ONE_MSG_EVENT) {
                    this.copyonemsg($WhisperUiEvent.data);
                }
            }


            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._whisperUiPanel) {
                    this._whisperUiPanel.dispose();
                    this._whisperUiPanel = null;
                    console.log("释放面板 _whisperUiPanel")
                }
            }
        }

        private copyonemsg($text: string) {
            if (this._whisperUiPanel && this._whisperUiPanel.hasStage) {
                this._whisperUiPanel.copyTxt($text);
            }
        }

        private refreshFriendList(): void {
            if (this._whisperUiPanel && this._whisperUiPanel.whisperFriendList && this._whisperUiPanel.whisperFriendList.hasStage) {
                this._whisperUiPanel.whisperFriendList.resetData();
            }
        }


        private recivenewsmsg($guidary: Array<string>) {
            if (this._whisperUiPanel && this._whisperUiPanel.hasStage) {
                //来新消息了，处理一下好友列表
                this.refreshFriendList();
                //如果是正在和此人聊天。则刷新一下聊天列表
                var $guid = this._whisperUiPanel.whisperChatListPanel.guid;
                if ($guid && $guid == $guidary[0] || $guid == $guidary[1]) {
                    //正在和此人聊天，刷新聊天记录                    
                    this._whisperUiPanel.whisperChatListPanel.refreshDataByNewData($guid);
                }
            }
        }

        private selectItem($data: SListItemData) {
            if (this._whisperUiPanel && this._whisperUiPanel.hasStage) {
                this._whisperUiPanel.refreshData($data.data);
            }
        }

        private _whisperUiPanel: whisperUiPanel
        private showPanel($guid: string): void {
            if (!this._whisperUiPanel) {
                this._whisperUiPanel = new whisperUiPanel();
            }
            this._whisperUiPanel.load(() => {
                this._whisperUiPanel.show($guid);
            });
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new WhisperUiEvent(WhisperUiEvent.SHOW_WHISPER_PANEL),
                new WhisperUiEvent(WhisperUiEvent.SELECT_ITEM_EVENT),
                new WhisperUiEvent(WhisperUiEvent.RECIVE_NEWS_MSG_EVENT),
                new WhisperUiEvent(WhisperUiEvent.REFRESHFRIENDlIST_EVENT),
                new WhisperUiEvent(WhisperUiEvent.COPY_ONE_MSG_EVENT),

                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }


}