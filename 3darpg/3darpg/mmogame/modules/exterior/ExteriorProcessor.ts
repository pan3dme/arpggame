module exterior {
    export class ExteriorEvent extends BaseEvent {
        public static SHOW_EXTERIOR_EVENT: string = "SHOW_EXTERIOR_EVENT"; //显示面板
        public static REFRISH_EXTERIOR_PANEL: string = "REFRISH_EXTERIOR_PANEL"; //显示面板
        public static SELECT_EXTERIOR_CELL: string = "SELECT_EXTERIOR_CELL"; //显示面板

        public static SHOW_IDENTIFICATION_EVENT: string = "SHOW_IDENTIFICATION_EVENT"; //显示面板
        //public static EXTERIOR_CHG_EVENT: string = "EXTERIOR_CHG_EVENT"; 


        public exteriorCellVo: ExteriorCellVo
    }
    export class ExteriorModule extends Module {
        public getModuleName(): string {
            return "ExteriorModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new ExteriorProcessor()];
        }
    }
    export class ExteriorProcessor extends BaseProcessor {
        public getName(): string {
            return "ExteriorProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof ExteriorEvent) {
                var $ExteriorEvent: ExteriorEvent = <ExteriorEvent>$event;
                if ($ExteriorEvent.type == ExteriorEvent.SHOW_EXTERIOR_EVENT) {
                    this.showPanel();
                }

                if ($ExteriorEvent.type == ExteriorEvent.SHOW_IDENTIFICATION_EVENT) {
                    this.showIdentificationPanel();
                }

                if (this.exteriorPanel) {
                    if ($ExteriorEvent.type == ExteriorEvent.REFRISH_EXTERIOR_PANEL) {
                        this.processRedPoint();
                        this.exteriorPanel.refrish();
                        console.log("外观变化")
                    }
                    if ($ExteriorEvent.type == ExteriorEvent.SELECT_EXTERIOR_CELL) {
                        this.exteriorPanel.selectCell($ExteriorEvent.exteriorCellVo)
                    }

                }
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {
                this.initRedNode();
            }else if($event.type == EngineEvent.SYSTEM_OPEN_EVENT){
                this.processRedPoint();
            }else if($event.type == charbg.CharBgEvent.BGDATA_CHANGE_EVENT){
                // if(this._needItem){
                //     if(this.isNeedItem((<charbg.CharBgEvent>$event).change)){
                //         this.processRedPoint();
                //     }
                // }else{
                    this.processRedPoint();
                // }
            } else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.exteriorPanel) {
                    var pnode22: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(22).children;
                    for (var i = 0; i < pnode22.length; i++) {
                        pnode22[i].unBind();
                    }
                    var pnode25: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(25).children;
                    for (var i = 0; i < pnode25.length; i++) {
                        pnode25[i].unBind();
                    }

                    this.exteriorPanel.dispose();
                    this.exteriorPanel = null;
                    console.log("释放面板 exteriorPanel")
                }else if(panelEvent.panel == this.identificationPanel){
                    this.identificationPanel.dispose();
                    this.identificationPanel = null;
                    console.log("释放面板 exteriorPanel");
                }
            }
        }

        // private isNeedItem($chgary:Array<number>):boolean{
        //     if($chgary){
        //         for (let i = 0; i < $chgary.length; i++) {
        //             var hasflag = this._needItem.indexOf($chgary[i]);
        //             if(hasflag != -1){
        //                 return true;
        //             }
        //         }
        //     }
        //     return false;
        // }


        // private _needItem:Array<number>

        private exteriorPanel: ExteriorPanel
        private showPanel(): void {
            if (!this.exteriorPanel) {
                this.exteriorPanel = new ExteriorPanel();
            }
            this.exteriorPanel.load(() => {
                this.exteriorPanel.show();
            }, false);
        }

        private identificationPanel: IdentificationPanel
        private showIdentificationPanel(): void {
            if (!this.identificationPanel) {
                this.identificationPanel = new IdentificationPanel();
            }
            this.identificationPanel.load(() => {
                this.identificationPanel.show();
            }, false);
        }

        private _nodeInit: boolean = false;
        private initRedNode(): void {
            if (this._nodeInit) {
                return;
            }
            var pnode: RedPointNode = RedPointManager.getInstance().getNodeByID(22);

            var $arr: Array<number>;
            $arr = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguan;
            for (var i: number = 0; i < $arr.length; i++) {
                var tbObj: tb.TB_appearance_info = tb.TB_appearance_info.getTempVo($arr[i]);
                var node: RedPointNode = new RedPointNode();
                node.data = tbObj;
                pnode.addChild(node);
            }

            pnode = RedPointManager.getInstance().getNodeByID(25);
            $arr = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).weaponwg;
            for (var i: number = 0; i < $arr.length; i++) {
                var tbObj: tb.TB_appearance_info = tb.TB_appearance_info.getTempVo($arr[i]);
                var node: RedPointNode = new RedPointNode();
                node.data = tbObj;
                pnode.addChild(node);
            }
            this._nodeInit = true;

            this.processRedPoint();
        }

        private processRedPoint(): void {
            // if(!this._needItem){
            //     this._needItem = new Array
            // }
            var $hasIdArr: Array<number> = GuidData.grow.getSpellIntFieldAppearanceId();
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FASHION,SharedDef.MODULE_FASHION_CLOTHES)) {
                this.processRedPointByID(22,$hasIdArr);
            }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FASHION,SharedDef.MODULE_FASHION_WEAPON)) {
                this.processRedPointByID(25,$hasIdArr);
            }
        }

        private processRedPointByID($id:number,$hasIdArr: Array<number>):void{

            var ary: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID($id).children;
            for (var i: number = 0; i < ary.length; i++) {
                var obj:any = ary[i].data;
                // if(this._needItem.indexOf(obj.costs[0][0]) == -1){
                //     this._needItem.push(obj.costs[0][0]);
                // }
                if(GuidData.bag.getItemCount(obj.costs[0][0]) >= obj.costs[0][1] && $hasIdArr.indexOf(obj.id) == -1){
                    ary[i].show = true;
                }else{
                    ary[i].show = false;
                }
            }
        }

        

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ExteriorEvent(ExteriorEvent.SHOW_EXTERIOR_EVENT),
                new ExteriorEvent(ExteriorEvent.REFRISH_EXTERIOR_PANEL),
                new ExteriorEvent(ExteriorEvent.SELECT_EXTERIOR_CELL),
                new ExteriorEvent(ExteriorEvent.SHOW_IDENTIFICATION_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

            ];
        }
    }

}
