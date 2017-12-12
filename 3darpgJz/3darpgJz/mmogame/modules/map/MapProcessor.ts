module map {
    export class MapEvent extends BaseEvent {
        public static SHOW_MAP_EVENT: string = "SHOW_MAP_EVENT"; //显示面板
        public static HIDE_MAP_EVENT: string = "HIDE_MAP_EVENT"; //显示面板


    }
    export class MapModule extends Module {
        public getModuleName(): string {
            return "MapModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MapProcessor()];
        }
    }

    export class MapProcessor extends BaseProcessor {
        public getName(): string {
            return "MapProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MapEvent) {
                var $comandEvent: MapEvent = <MapEvent>$event;
                if ($comandEvent.type == MapEvent.SHOW_MAP_EVENT) {
                    this.showPanel()
                }
                if ($comandEvent.type == MapEvent.HIDE_MAP_EVENT) {
                    this.hidePanel()
                }
            }

            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                if(panelEvent.panel == this._mapPanel){
                    this._mapPanel.dispose();
                    this._mapPanel = null;
                    console.log("释放面板 _mapPanel")
                }
            }
    
        }
        private hidePanel(): void 
        {

        }
        private _mapPanel: MapPanel;
        private showPanel(): void {
 

            if (!this._mapPanel) {
                this._mapPanel = new MapPanel();
            }
            this._mapPanel.load(() => {
                UIManager.getInstance().addUIContainer(this._mapPanel);
                SceneManager.getInstance().render = false;
                this._mapPanel.addTime();
                this._mapPanel.refresh();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
            })
      
        }
        private smsgSendMapLine($byte: ByteArray): void {

            var $vo: s2c_send_map_line = new s2c_send_map_line();
            s2c_send_map_line.read($vo, $byte)
            MapModel.getInstance().mapLineData = $vo;
            this._mapPanel.refreshLine()
        }
        private isHasXianFuBaoXiang($name:string): boolean
        {
            var nameStrAry: Array<string> = GuidData.map.getXianFuPlayerGuidList();
            for (var i: number = 0; i < nameStrAry.length; i++) {
                if (GuidData.map.getXianFuPlayerScore(i) > 0 && $name.search( nameStrAry[i])!=-1) {
                    return true
                }
            }
            return false
        }

        private smsgKuafuXianFuMiniMap($byte: ByteArray): void {

            var $arr: Array<MapServerVo> = new Array;
            var len: number = $byte.readUint16();
            for (var i: number=0; i < len; i++) {
                var $vo: MapServerVo = new MapServerVo()
                $vo.name = $byte.readUTF();//玩家
                $vo.pos = new Vector2D();
                $vo.pos.x = $byte.readUint16();
                $vo.pos.y = $byte.readUint16();
              
                if (this.isHasXianFuBaoXiang($vo.name)) {
                    $vo.type = 7;
                } else {
                    $vo.type = 1;
                }
            
                if ($vo.name.search(GuidData.player.getGuid())==-1) {  //不添加自己
                    $arr.push($vo)
                } else {
                    //console.log($vo.name, GuidData.player.getGuid())
                }
       
            }
            var len: number = $byte.readUint16();
            for (var i: number = 0; i < len; i++) {
                var $vo: MapServerVo = new MapServerVo()
                $byte.readUint16();
                $vo.name = "生物";
                $vo.pos = new Vector2D()
                $vo.pos.x = $byte.readUint16()
                $vo.pos.y = $byte.readUint16()
                $vo.type = 2
                $arr.push($vo)
            }
            var len: number = $byte.readUint16();
            for (var i: number = 0; i < len; i++) {
                var $vo: MapServerVo = new MapServerVo()
                $byte.readUint16();
                $vo.name = "采集物品";
                $vo.pos = new Vector2D()
                $vo.pos.x = $byte.readUint16()
                $vo.pos.y = $byte.readUint16()
                $vo.type = 5;
                $arr.push($vo)
            }
            if (this._mapPanel && this._mapPanel.hasStage) {
                console.log($arr)
                this._mapPanel.mapCetentPanel.showSeverMapInfo($arr)
            }

        }
        /*
        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SEND_MAP_LINE] = ($byte: ByteArray) => { this.smsgSendMapLine($byte) };
            obj[Protocols.SMSG_KUAFU_XIANFU_MINIMAP_INFO] = ($byte: ByteArray) => { this.smsgKuafuXianFuMiniMap($byte) };
            return obj;

            
        }
        */
       
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MapEvent(MapEvent.SHOW_MAP_EVENT),
                new MapEvent(MapEvent.HIDE_MAP_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }


   



    }

}
