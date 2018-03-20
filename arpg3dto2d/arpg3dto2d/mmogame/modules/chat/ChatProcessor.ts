module Chat {
    export class ChatEvent extends BaseEvent {
        public static SHOW_CHAT_EVENT: string = "SHOW_CHAT_EVENT"; //显示面板
        public static HIDE_CHAT_EVENT: string = "HIDE_CHAT_EVENT"; //显示面板

        public static CHAT_INFO_TO_PANEL: string = "CHAT_INFO_TO_PANEL"; //主场UI显示聊天内容

    

  


        public static REFRESH_EMAIL_LIST: string = "REFRESH_EMAIL_LIST"; //
  
      //  public static PLAYER_STRING_FIELD_BLOCK: string = "PLAYER_STRING_FIELD_BLOCK"; //

        public data:any;
    }
    export class ChatModule extends Module {
        public getModuleName(): string {
            return "ChatModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new ChatProcessor()];
        }
    }

    export class ChatProcessor extends BaseProcessor {
        public getName(): string {
            return "ChatProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof mainUi.MainUiEvent) {
                if (this._chatBasePanel) {
                    this._chatBasePanel.close()
                }
           
            }
            if ($event instanceof ChatEvent) {
                var evt: ChatEvent = <ChatEvent>$event;
                if (evt.type == ChatEvent.SHOW_CHAT_EVENT) {
                  
               
                        this.showBasePanel();
                
                 
                }
                if (evt.type == ChatEvent.HIDE_CHAT_EVENT) {
                
                    if (this._chatBasePanel) {
                        this._chatBasePanel.close()
                    }
           
                }
             
                // if (evt.type == ChatEvent.REFRESH_EMAIL_LIST) {
                //     if (this._chatBasePanel) {
                //         this._chatBasePanel.refresh()
                //     }
        
                //     ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
       

                // }
       
  
                if (evt.type == ChatEvent.CHAT_INFO_TO_PANEL) {
                    if (this._chatBasePanel) {
                        this._chatBasePanel.refresh()
                    }
              
                }
            }
           
        }
   






        private _chatBasePanel: ChatBasePanel;
        private showBasePanel(): void {
            if (!this._chatBasePanel) {
                this._chatBasePanel = new ChatBasePanel();
            }
            this._chatBasePanel.load(() => {
                UIManager.getInstance().addUIContainer(this._chatBasePanel);
                this._chatBasePanel.refresh()
            })
        }





        protected listenModuleEvents(): Array<BaseEvent> {
            return [

                new ChatEvent(ChatEvent.SHOW_CHAT_EVENT),
                new ChatEvent(ChatEvent.HIDE_CHAT_EVENT),
                new ChatEvent(ChatEvent.CHAT_INFO_TO_PANEL),

           
                new ChatEvent(ChatEvent.REFRESH_EMAIL_LIST),
 
                new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT),

            ];
        }

    }


}