module newbieguide {
    export class NewbieguideModule extends Module {
        public getModuleName(): string {
            return "NewbieguideModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new NewbieguideProcessor()];
        }
    }
    export class NewbieguideEvent extends BaseEvent {
        public static SHOW_BIEGUIDE_EVENT: string = "SHOW_BIEGUIDE_EVENT";
        public static HIDE_BIEGUIDE_EVENT: string = "HIDE_BIEGUIDE_EVENT";

        public static SHOW_OPTIONL_GUIDE_EVENT: string = "SHOW_OPTIONL_GUIDE_EVENT";
        public static HIDE_OPTIONL_GUIDE_EVENT: string = "HIDE_OPTIONL_GUIDE_EVENT";

        public static SHOW_SYSTRAILER_EVENT: string = "SHOW_SYSTRAILER_EVENT";
        public static HIDE_SYSTRAILER_EVENT: string = "HIDE_SYSTRAILER_EVENT";

        public static SHOW_USEITEM_EVENT: string = "SHOW_USEITEM_EVENT";
        public static HIDE_USEITEM_EVENT: string = "HIDE_USEITEM_EVENT";

        public data: any
    }

    export class NewbieguideProcessor extends BaseProcessor {

        private _newbieguide: Newbieguide
        public getName(): string {
            return "NewbieguideProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            if ($event instanceof NewbieguideEvent) {
                var $skillUIEvent: NewbieguideEvent = <NewbieguideEvent>$event;
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_BIEGUIDE_EVENT) {
                    this.showBieGuideUi($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_BIEGUIDE_EVENT) {
                    this.hideBieGuideUi();
                }
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT) {
                    this.showOptionlGuide($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT) {
                    this.hideOptionlGuide();
                }
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_SYSTRAILER_EVENT) {
                    this.showsystemtrailer($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_SYSTRAILER_EVENT) {
                    this.hidesystemtrailer();
                }
                if ($skillUIEvent.type == NewbieguideEvent.SHOW_USEITEM_EVENT) {
                    this.showuseitem($skillUIEvent.data);
                }
                if ($skillUIEvent.type == NewbieguideEvent.HIDE_USEITEM_EVENT) {
                    this.hideuseitem();
                }
            }

            if($event instanceof EngineEvent){
                var engEvent:EngineEvent = <EngineEvent>$event;
                if (engEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    this.opensystrailer();
                }
            }


            if($event instanceof UIPanelEvent){
                var panelEvent:UIPanelEvent = <UIPanelEvent>$event;
                if(panelEvent.panel == this._newbieguide){
                    this._newbieguide.dispose();
                    this._newbieguide = null;
                    console.log("释放面板 _newbieguide")
                }
                if(panelEvent.panel == this._systemtrailer){
                    this._systemtrailer.dispose();
                    this._systemtrailer = null;
                    console.log("释放面板 _systemtrailer")
                }
            }
        }

        private _tabary:Array<tb.TB_system_preview>
        private opensystrailer(){
            if(!this._tabary){
                this._tabary = tb.TB_system_preview.getItem();
            }

            for (var i: number = 0; i < this._tabary.length; i++) {
                if (this._tabary[i].level == GuidData.player.getLevel()) {
                    this.showsystemtrailer(this._tabary[i].id);
                    break;
                }
            }

        }


        private _optionalGuidePop: OptionalGuidePop;
        private optionTbData: tb.TB_system_guide
        private showOptionlGuide($data: tb.TB_system_guide): void {
            this.optionTbData = $data
            if (!this._optionalGuidePop) {
                this._optionalGuidePop = new OptionalGuidePop();
            }
            this._optionalGuidePop.load(() => {
                this._optionalGuidePop.initData(this.optionTbData)
                UIManager.getInstance().addUIContainer(this._optionalGuidePop);
            });
        }
        private hideOptionlGuide(): void {
            if (this._optionalGuidePop) {
                UIManager.getInstance().removeUIContainer(this._optionalGuidePop);
            }
        }


        private hidesystemtrailer(): void {
            if (this._systemtrailer) {
                this._systemtrailer.hide();
            }
        }
        private _systemtrailer:Systemtrailer
        private showsystemtrailer($data:number): void {
            if (!this._systemtrailer) {
                this._systemtrailer = new Systemtrailer();
            } 
            this._systemtrailer.load(() => {
                this._systemtrailer.show($data);
            });
        }

        private hideuseitem(): void {
            if (this._useitempanel) {
                this._useitempanel.hide();
            }
        }

        private _useitempanel:UseItemPanel
        private showuseitem($data:UseItemVo): void {
            if (!this._useitempanel) {
                this._useitempanel = new UseItemPanel();
            } 

            this._useitempanel.addData($data);
            this._useitempanel.load(() => {
                UIManager.getInstance().addUIContainer(this._useitempanel);
            });
        }


        private hideBieGuideUi(): void {
            if (this._newbieguide) {
                UIManager.getInstance().removeUIContainer(this._newbieguide);
            }
        }
        
        private lastData: tb.TB_system_guide
        private showBieGuideUi($data:tb.TB_system_guide): void {
            if (!this._newbieguide) {
                this._newbieguide = new Newbieguide();
            } else {
                if (this._newbieguide.hasStage) {
                    UIManager.getInstance().removeUIContainer(this._newbieguide);
                }
            }
            this.lastData = $data
            this._newbieguide.load(() => {
                this._newbieguide.initData(this.lastData);

       
                UIManager.getInstance().addUIContainer(this._newbieguide);
            });
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new NewbieguideEvent(NewbieguideEvent.SHOW_BIEGUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_BIEGUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.SHOW_OPTIONL_GUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_OPTIONL_GUIDE_EVENT),
                new NewbieguideEvent(NewbieguideEvent.SHOW_SYSTRAILER_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_SYSTRAILER_EVENT),
                new NewbieguideEvent(NewbieguideEvent.SHOW_USEITEM_EVENT),
                new NewbieguideEvent(NewbieguideEvent.HIDE_USEITEM_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
            ];
        }
    }

}