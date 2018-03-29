module Camand {
    export  class ComandEvent extends BaseEvent {
        public static SHOW_COMMAND_EVENT: string = "show_command_event"; //显示面板
        public static SHOW_ASTAR_LINE: string = "SHOW_ASTAR_LINE"; //显示面板
  
    }
    export class CommandModule extends Module {
        public getModuleName(): string {
            return "CommandModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new CommandProcessor()];
        }
    }

    export class CommandProcessor extends BaseProcessor {
        public getName(): string {
            return "CommandProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof ComandEvent) {
                var $comandEvent: ComandEvent = <ComandEvent>$event;
                if ($comandEvent.type == ComandEvent.SHOW_COMMAND_EVENT) {
                    this.showCommandEvent();
                }
                if ($comandEvent.type == ComandEvent.SHOW_ASTAR_LINE) {
                    this.showAstarLine();
                }
            }

            if ($event instanceof EngineEvent) {
           
            }

        }
        private showAstarLine(): void
        {
            if (!this._cammandPanel) {
                this._cammandPanel = new CammandPanel();
            }
            this._cammandPanel.showAstarLine()
        }
   
        private showCommandEvent(): void {
            

            if (!this._cammandPanel) {
                this._cammandPanel = new CammandPanel();
            }
            this._cammandPanel.show()

       
        }

        private _cammandPanel: CammandPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ComandEvent(ComandEvent.SHOW_COMMAND_EVENT),
                new ComandEvent(ComandEvent.SHOW_ASTAR_LINE),
            ];
        }
 


  
    }

}
