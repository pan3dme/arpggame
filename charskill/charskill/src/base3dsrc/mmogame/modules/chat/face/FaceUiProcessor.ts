module faceui {
    export class FaceUiModule extends Module {
        public getModuleName(): string {
            return "FaceUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new FaceUiProcessor()];
        }
    }
    export class FaceUiEvent extends BaseEvent {
        public static SHOW_FACE_UI_PANEL: string = "SHOW_FACE_UI_PANEL";
        public static HIDE_FACE_UI_PANEL: string = "HIDE_FACE_UI_PANEL";
        public data:any
    }
    export class FaceUiProcessor extends BaseProcessor {

        public getName(): string {
            return "FaceUiProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof FaceUiEvent) {
                var $faceUiEvent: FaceUiEvent = <FaceUiEvent>$event;
                if ($faceUiEvent.type == FaceUiEvent.SHOW_FACE_UI_PANEL) {
                    this.showPanel()
                    this.faceUiPanel.bfun = $faceUiEvent.data.bfun;
                    if ($faceUiEvent.data.left) {
                        this.faceUiPanel.left = $faceUiEvent.data.left;
                    }
                    if ($faceUiEvent.data.bottom) {
                        this.faceUiPanel.bottom = $faceUiEvent.data.bottom;
                    }
                    
                }
                if ($faceUiEvent.type == FaceUiEvent.HIDE_FACE_UI_PANEL) {
                    this.hidePanel()
                }
            }
        }
        private hidePanel(): void {
            if (this.faceUiPanel) {
                UIManager.getInstance().removeUIContainer(this.faceUiPanel);
            }

        }
        private faceUiPanel: FaceUiPanel
        private showPanel(): void {
            if (!this.faceUiPanel) {
                this.faceUiPanel = new FaceUiPanel();
            }
            this.faceUiPanel.load(() => {
                UIManager.getInstance().addUIContainer(this.faceUiPanel);
            }, false);
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FaceUiEvent(FaceUiEvent.SHOW_FACE_UI_PANEL),
                new FaceUiEvent(FaceUiEvent.HIDE_FACE_UI_PANEL),

            ];
        }

    }


}