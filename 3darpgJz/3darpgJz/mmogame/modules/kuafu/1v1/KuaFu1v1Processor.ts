module kuafu {


    export class KuaFu1v1Event extends BaseEvent {
        public static SHOW_1V1_LOG_PANEL: string = "SHOW_1V1_LOG_PANEL";
        public static SHOW_1V1_SCENE_PANEL: string = "SHOW_1V1_SCENE_PANEL";
        public static SHOW_1V1_END_PANEL: string = "SHOW_1V1_END_PANEL";
 
    }
    export class KuaFu1v1Processor extends BaseProcessor {

        public getName(): string {
            return "KuaFu1v1Processor";
        }


        protected receivedModuleEvent($event: BaseEvent): void {
          


            if ($event instanceof KuaFu1v1Event) {
                var $kuaFu1v1Event: KuaFu1v1Event = <KuaFu1v1Event>$event;
                if ($kuaFu1v1Event.type == KuaFu1v1Event.SHOW_1V1_LOG_PANEL) {
                    //this.showKuafu1v1LogPanel();
                }
                if ($kuaFu1v1Event.type == KuaFu1v1Event.SHOW_1V1_SCENE_PANEL) {
                    this.showKuafu1v1SceneTopPanel();
                }
                if ($kuaFu1v1Event.type == KuaFu1v1Event.SHOW_1V1_END_PANEL) {
               //     this.showKuafu1V1EndPanel();
                }
            }

            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                // if(panelEvent.panel == this._kuafu1V1EndPanel){
                //     this._kuafu1V1EndPanel.dispose();
                //     this._kuafu1V1EndPanel = null;
                //     console.log("释放面板 _kuafu1V1EndPanel")
                // }
                // if(panelEvent.panel == this._kuafu1v1LogPanel){
                //     this._kuafu1v1LogPanel.dispose();
                //     this._kuafu1v1LogPanel = null;
                //     console.log("释放面板 _kuafu1v1LogPanel")
                // }
                if(panelEvent.panel == this._kuafu1v1SceneTopPanel){
                    this._kuafu1v1SceneTopPanel.dispose();
                    this._kuafu1v1SceneTopPanel = null;
                    console.log("释放面板 _kuafu1v1SceneTopPanel")
                }
            }
   
        }
        // private _kuafu1V1EndPanel: Kuafu1V1EndPanel; 
        // private showKuafu1V1EndPanel(): void {
        //     if (!this._kuafu1V1EndPanel) {
        //         this._kuafu1V1EndPanel = new Kuafu1V1EndPanel();
        //     }
        //     this._kuafu1V1EndPanel.load(() => {
        //         this._kuafu1V1EndPanel.show();
        //     }, false);
        // }


        // private _kuafu1v1LogPanel: Kuafu1v1LogPanel;  //对战人员列表
        // private showKuafu1v1LogPanel(): void {
        //     if (!this._kuafu1v1LogPanel) {
        //         this._kuafu1v1LogPanel = new Kuafu1v1LogPanel();
        //     }
        //     this._kuafu1v1LogPanel.load(() => {
        //         this._kuafu1v1LogPanel.refresh();
        //         UIManager.getInstance().addUIContainer(this._kuafu1v1LogPanel);
        //     },false)
        // }
        private _kuafu1v1SceneTopPanel: Kuafu1v1SceneTopPanel;  //对战人员列表
        private showKuafu1v1SceneTopPanel(): void {
            if (!this._kuafu1v1SceneTopPanel) {
                this._kuafu1v1SceneTopPanel = new Kuafu1v1SceneTopPanel();
            }
            this._kuafu1v1SceneTopPanel.load(() => {
                this._kuafu1v1SceneTopPanel.show();
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new KuaFu1v1Event(KuaFu1v1Event.SHOW_1V1_LOG_PANEL),
                new KuaFu1v1Event(KuaFu1v1Event.SHOW_1V1_SCENE_PANEL),
                new KuaFu1v1Event(KuaFu1v1Event.SHOW_1V1_END_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }
    }
}