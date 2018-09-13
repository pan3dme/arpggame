module kuafu {


    export class KuaFu3v3PkEvent extends BaseEvent {
        public static SHOW_KUAFU_PK_SCENE_EVENT: string = "SHOW_KUAFU_PK_SCENE_EVENT";
        public static KUAFU_3V3_FIELDS_REFRESH_EVENT: string = "KUAFU_3V3_FIELDS_REFRESH_EVENT";
        public static KUAFU_3V3_FINISH_EVENT: string = "KUAFU_3V3_FINISH_EVENT";
    }
    export class KuaFu3v3PkProcessor extends BaseProcessor {

        public getName(): string {
            return "KuaFu3v3PkProcessor";
        }

        private _kuaFuEndPanel: Kuafu3V3FinishPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof KuaFu3v3PkEvent) {
                var evt: KuaFu3v3PkEvent = <KuaFu3v3PkEvent>$event;
                if (evt.type == KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT) {
                    this.showKuaFuPkPanel();
                   // GameInstance.mainUi.topLeftPanel.hide()
                }
                if (evt.type == KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT) {
                    if (this._kuaFuPkPanel) {
                        this._kuaFuPkPanel.refresh()
                    }
                }
                if (evt.type == KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT) {
                    TimeUtil.addTimeOut(3000, () => {
                        KuaFu3v3Model.getInstance().end = true
                        KuaFu3v3Model.getInstance().refreshKufuData();
                        if (!this._kuaFuEndPanel) {
                            this._kuaFuEndPanel = new Kuafu3V3FinishPanel();
                        } else {
                            this._kuaFuEndPanel.refrish();
                        }
                        UIManager.getInstance().addUIContainer(this._kuaFuEndPanel);

                        ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                    });
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._kuaFuEndPanel) {
                    this._kuaFuEndPanel.dispose();
                    this._kuaFuEndPanel = null;
                    //console.log("释放面板 _kuaFuEndPanel")
                }
                if (panelEvent.panel == this._kuaFuPkPanel) {
                    this._kuaFuPkPanel.dispose();
                    this._kuaFuPkPanel = null;
                    //console.log("释放面板 _kuaFuPkPanel")
                }
            }
        }
        private _kuaFuPkPanel: KuaFu3v3PkPanel;  //对战人员列表
        private showKuaFuPkPanel(): void {

            KuaFu3v3Model.getInstance().end = false
            if (!this._kuaFuPkPanel) {
                this._kuaFuPkPanel = new KuaFu3v3PkPanel();
            }
            this._kuaFuPkPanel.load(() => {
                this._kuaFuPkPanel.show();
                this._kuaFuPkPanel.refresh();
            })
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new KuaFu3v3PkEvent(KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT),
                new KuaFu3v3PkEvent(KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT),
                new KuaFu3v3PkEvent(KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
        public smsgKuafu3V3KillDetail($byte: ByteArray): void {
            var $aIndx: number = $byte.readUint32()
            var $bIndx: number = $byte.readUint32()
            if (this._kuaFuPkPanel) {
                this._kuaFuPkPanel.showKillLastInfo($aIndx, $bIndx)
            }
        }
        public getHanderMap(): Object {
            var obj: Object = new Object;

            obj[Protocols.SMSG_KUAFU_3V3_KILL_DETAIL] = ($byte: ByteArray) => { this.smsgKuafu3V3KillDetail($byte) };

            return obj;
        }

    }
}