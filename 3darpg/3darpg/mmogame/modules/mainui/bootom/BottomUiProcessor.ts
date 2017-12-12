module bottomui {
    export class BottomUiModule extends Module {
        public getModuleName(): string {
            return "BottomUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new BottomUiProcessor()];
        }
    }
    export class BottomUiEvent extends BaseEvent {
        public static SHOW_BOTTOM_UI_PANEL: string = "SHOW_BOTTOM_UI_PANEL";
        public static HIDE_BOTTOM_UI_PANEL: string = "HIDE_BOTTOM_UI_PANEL";
        public static BOTTOM_SYSTIME_HORM_INFO: string = "BOTTOM_SYSTIME_HORM_INFO";
        public static BOTTOM_REFRESH_INFO_ICON: string = "BOTTOM_REFRESH_INFO_ICON";
        public data: any;
    }
    export class BottomUiProcessor extends BaseProcessor {

        public getName(): string {
            return "BottomUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof BottomUiEvent) {
                var $topUiEvent: BottomUiEvent = <BottomUiEvent>$event;
                if ($topUiEvent.type == BottomUiEvent.SHOW_BOTTOM_UI_PANEL) {
                 
                    if (!GuidData.map.is1V1()) {
                        this.showPanel();
                    }
                }
                if (this.bootomUiPanel) {
                    if ($topUiEvent.type == BottomUiEvent.HIDE_BOTTOM_UI_PANEL) {
                        this.hidePanel();
                    }
                    if ($topUiEvent.type == BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO) {
                        this.bootomUiPanel.pushSysInfoTop($topUiEvent.data)
                    }
                    if ($topUiEvent.type == BottomUiEvent.BOTTOM_REFRESH_INFO_ICON) {
                        this.bootomUiPanel.refreshInfoTipManager();
                    }
                }
            }
            // if ($event instanceof faction.GiftreceiveEvent) {
            //     if (this.bootomUiPanel) {
            //         var $fiftprocessingEvent: faction.GiftreceiveEvent = <faction.GiftreceiveEvent>$event;
            //         if ($fiftprocessingEvent.type == faction.GiftreceiveEvent.QUEEN_RECEIVE_GIFT_EVENT) {
            //             this.bootomUiPanel.refreshInfoTipManager();
            //         }
            //         if ($fiftprocessingEvent.type == faction.GiftreceiveEvent.QUEEN_RECEIVE_REMOVE_GIFT_EVENT) {
            //             GuidData.faction.queenGiftUncheckNum = 0
            //             this.bootomUiPanel.refreshInfoTipManager();
            //         }
            //     }
            // }
            if (this.bootomUiPanel) {
                if ($event instanceof fightui.FightUiEvent) {
                    this.bootomUiPanel.setShowChatGrid(true)
                }
                if ($event instanceof homeui.HomeUiEvent) {
                    this.bootomUiPanel.setShowChatGrid(false)
                }
            }

        }
        private hidePanel(): void {
            if (this.bootomUiPanel) {
                UIManager.getInstance().removeUIContainer(this.bootomUiPanel);
            }
        }
        private bootomUiPanel: BottomUiPanel;
        private showPanel(): void {
            if (!this.bootomUiPanel) {
                this.bootomUiPanel = new BottomUiPanel();
            }
            this.bootomUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.bootomUiPanel);
                this.bootomUiPanel.refresh()
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new BottomUiEvent(BottomUiEvent.SHOW_BOTTOM_UI_PANEL),
                new BottomUiEvent(BottomUiEvent.HIDE_BOTTOM_UI_PANEL),
                new BottomUiEvent(BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO),
                new BottomUiEvent(BottomUiEvent.BOTTOM_REFRESH_INFO_ICON),

                new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL),
                new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL),


                //         if (mainUi.MainUiModel.skillTabIndex == 0) {
                //    ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL));
                //} else {
                //    ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL));
                //}
            ];
        }
        private smsgSendChat($byte: ByteArray): void {
            var $vo: s2c_send_chat = new s2c_send_chat();
            s2c_send_chat.read($vo, $byte);
            Chat.ChatModel.getInstance().pushNewMes($vo);
            console.log("==聊天==", $vo);
            if ($vo.channel == SharedDef.CHAT_TYPE_HORM) {
                //  GameInstance.mainUi.bottomCenterPanel.pushWaithornToItem($vo)
            }
            var $ChatEvent: Chat.ChatEvent = new Chat.ChatEvent(Chat.ChatEvent.CHAT_INFO_TO_PANEL);
            ModuleEventManager.dispatchEvent($ChatEvent);
            this.bootomUiPanel.bottomChatPanel.restChatList();

            if ($vo.channel == SharedDef.CHAT_TYPE_WHISPER) {
                ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));

                var aaa = new whisper.WhisperUiEvent(whisper.WhisperUiEvent.RECIVE_NEWS_MSG_EVENT);
                aaa.data = [$vo.guid, $vo.to_guid]
                ModuleEventManager.dispatchEvent(aaa);
            }

        }
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SEND_CHAT] = ($byte: ByteArray) => { this.smsgSendChat($byte) };
            return obj;
        }

    }


}