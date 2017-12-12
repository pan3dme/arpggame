module mapnew {
    export class MapNewEvent extends BaseEvent {
        public static SHOW_MAP_FORM_MINI: string = "SHOW_MAP_FORM_MINI"; //显示面板
        public static SHOW_MAP_NEW_EVENT: string = "SHOW_MAP_NEW_EVENT"; //显示面板
        public static SHOW_MAP_NEW_WORLD_EVENT: string = "SHOW_MAP_NEW_WORLD_EVENT"; //显示面板
        public static HIDE_MAP_NEW_EVENT: string = "HIDE_MAP_NEW_EVENT"; //显示面板
        public static SELECT_MAP_NEW_CELL: string = "SELECT_MAP_NEW_CELL"; //显示面板
        public data:any
    }
    export class MapNewModule extends Module {
        public getModuleName(): string {
            return "MapNewModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MapNewProcessor()];
        }
    }

    export class MapNewProcessor extends BaseProcessor {
        public getName(): string {
            return "MapNewProcessor";
        }
    
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MapNewEvent) {
                var $mapNewEvent: MapNewEvent = <MapNewEvent>$event;
                
                
                if ($mapNewEvent.type == MapNewEvent.SHOW_MAP_FORM_MINI) {
                    if (this.lastOpenTab == 0) {
                        $mapNewEvent.type = MapNewEvent.SHOW_MAP_NEW_EVENT;
                    } else {
                        $mapNewEvent.type = MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT;
                    }
                }

                if ($mapNewEvent.type == MapNewEvent.SHOW_MAP_NEW_EVENT) {
                    this.showmapNewPanel()
                    this.lastOpenTab = 0;
                }
                if ($mapNewEvent.type == MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT) {
                    this.showMapNewWorldPanel()
                    this.lastOpenTab = 1;
                }
                if (this.mapNewPanel) {
                    if ($mapNewEvent.type == MapNewEvent.HIDE_MAP_NEW_EVENT) {
                        this.hidePanel()
                    }

                    if ($mapNewEvent.type == MapNewEvent.SELECT_MAP_NEW_CELL) {
                        //console.log($mapNewEvent.data)
                        var $dd: MapnewLisDataMesh = <MapnewLisDataMesh>$mapNewEvent.data
                        if ($dd.type == 0) { //线
                            console.log("换线");
                            NetManager.getInstance().protocolos.change_line(Number($dd.data));
                        }
                        if ($dd.type == 1) { //线
           
                            this.mapNewPanel.selectmapOBJ(<tb.TB_map_object>$dd.data)
              
                        }
                     //   
                    }
                }
            }
        }
        private hidePanel(): void 
        {
            if (this.mapNewPanel) {
                this.mapNewPanel.hide();
            }
        }
        private lastOpenTab: number = 0;
        private mapNewPanel: MapNewPanel;
        private showmapNewPanel(): void {
            if (!this.mapNewPanel) {
                this.mapNewPanel = new MapNewPanel();
            }
            this.mapNewPanel.load(() => {
                this.mapNewPanel.show()
            })
        }

        private mapNewWorldPanel: MapNewWorldPanel;
        private showMapNewWorldPanel(): void {
            if (!this.mapNewWorldPanel) {
                this.mapNewWorldPanel = new MapNewWorldPanel();
            }
            this.mapNewWorldPanel.load(() => {
                this.mapNewWorldPanel.show()
            })
        }
 
        private smsgSendMapLine($byte: ByteArray): void {

            var $vo: s2c_send_map_line = new s2c_send_map_line();
            s2c_send_map_line.read($vo, $byte)
            this.mapNewPanel.refreshLine($vo)
      
        }
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SEND_MAP_LINE] = ($byte: ByteArray) => { this.smsgSendMapLine($byte) };
            return obj;
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MapNewEvent(MapNewEvent.SHOW_MAP_NEW_EVENT),
                new MapNewEvent(MapNewEvent.HIDE_MAP_NEW_EVENT),
                new MapNewEvent(MapNewEvent.SELECT_MAP_NEW_CELL),
                new MapNewEvent(MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT),
                new MapNewEvent(MapNewEvent.SHOW_MAP_FORM_MINI),
            ];
        }


   



    }

}
