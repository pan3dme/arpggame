module donation {
    export class DonationModule extends Module {
        public getModuleName(): string {
            return "DonationModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new DonationRrocessor()];
        }
    }
    export class DonationEvent extends BaseEvent {
        public static SHOW_DONATION_PANEL: string = "SHOW_DONATION_PANEL";
        public static HIDE_DONATION_PANEL: string = "HIDE_DONATION_PANEL";
        public data:number


    }
    export class DonationRrocessor extends BaseProcessor {

        public getName(): string {
            return "DonationRrocessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof DonationEvent) {
                var evt: DonationEvent = <DonationEvent>$event;
                if (evt.type == DonationEvent.SHOW_DONATION_PANEL) {
                    this.showPanel(evt.data);

                }
                if (this.donationPanel) {
                    if (evt.type == DonationEvent.HIDE_DONATION_PANEL) {
                        this.hidePanel()
                    }
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.donationPanel) {
                    this.donationPanel.dispose();
                    this.donationPanel = null;
                    console.log("释放面板 exchangepPanel")
                }
            }

        }
        private hidePanel(): void {
            this.donationPanel.hide()

        }
        private donationPanel: DonationPanel
        private showPanel($type:number): void {
            if (!this.donationPanel) {
                this.donationPanel = new DonationPanel();
            }
            this.donationPanel.load(() => {
                this.donationPanel.show($type)
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new DonationEvent(DonationEvent.SHOW_DONATION_PANEL),
                new DonationEvent(DonationEvent.HIDE_DONATION_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

    }


}