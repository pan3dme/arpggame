module wintittle {
    export class WindowRestTittleModule extends Module {
        public getModuleName(): string {
            return "WindowRestTittleModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new WindowRestTittleProcessor()];
        }
    }
    export class WindowRestTittleEvent extends BaseEvent {
        public static SHOW_WINDOW_RES_TITTLE_PANEL: string = "SHOW_WINDOW_RES_TITTLE_PANEL";
        public static HIDE_WINDOW_RES_TITTLE_PANEL: string = "HIDE_WINDOW_RES_TITTLE_PANEL";
        
        public static SHOW_WINDOW_RES_PANEL: string = "SHOW_WINDOW_RES_PANEL";
        public static HIDE_WINDOW_RES_PANEL: string = "HIDE_WINDOW_RES_PANEL";
        // public static REFRISH_RES_DATA: string = "REFRISH_RES_DATA"
        public data: any;
    }
    export class WindowRestTittleProcessor extends BaseProcessor {

        public getName(): string {
            return "WindowRestTittleProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof WindowRestTittleEvent) {
                var evt: WindowRestTittleEvent = <WindowRestTittleEvent>$event;
                if (evt.type == WindowRestTittleEvent.SHOW_WINDOW_RES_TITTLE_PANEL) {
                    this.hidePanel();
                    this.showPanel(evt.data);
                }
                if (this.donationPanel) {
                    if (evt.type == WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL) {
                        if (!UIManager.getInstance().hasWindowUI()) {
                            this.hidePanel();
                        }
                    }
                    // if (evt.type == WindowRestTittleEvent.REFRISH_RES_DATA) {
                    //     this.donationPanel.refresh()
                    // }
                }

                if (evt.type == WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL) {
                    this.showResPanel(evt.data);
                }else if (evt.type == WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL) {
                    this.hideResPanel();
                }
            }

            if ($event instanceof EngineEvent) {
                if (this.donationPanel) {
                    this.donationPanel.refresh();
                }
            }

        }
        private hidePanel(): void {
            if (this.donationPanel) {
                UIManager.getInstance().removeUIContainer(this.donationPanel);
            }
        }
        private donationPanel: WindowRestTittlePanel;
        private showPanel($data: Array<number>): void {
            if (!this.donationPanel) {
                this.donationPanel = new WindowRestTittlePanel();
            }
            this.donationPanel.load(() => {
                this.donationPanel.refresh($data)
                UIManager.getInstance().addUIContainer(this.donationPanel);
            }, false);
        }

        private windowResPanel: WindowResPanel;
        private showResPanel($data: number): void {
            if (!this.windowResPanel) {
                this.windowResPanel = new WindowResPanel();
            }
            this.windowResPanel.load(() => {
                this.windowResPanel.show($data)
            }, false);
        }
        private hideResPanel(): void {
            if (this.windowResPanel) {
                this.windowResPanel.hide();
            }
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new WindowRestTittleEvent(WindowRestTittleEvent.SHOW_WINDOW_RES_TITTLE_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL),
                new WindowRestTittleEvent(WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL),
                // new WindowRestTittleEvent(WindowRestTittleEvent.REFRISH_RES_DATA),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
            ];
        }

    }


}