module faction {

    export class FactionActivePanel extends WindowUi {

        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;


        private _leaderPanel: FactionLeaderPanel;
        private _tripPanel: FactionTripPanel;

        public dispose(): void {

            this._baseRender.dispose();
            this._baseRender = null;

            this._topRender.dispose();
            this._topRender = null;
            if(this._leaderPanel){
                this._leaderPanel.dispose();
                this._leaderPanel = null;
            }
            if(this._tripPanel){
                this._tripPanel.dispose();
                this._tripPanel = null;
            }
            super.dispose();
        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._baseUiAtlas = new UIAtlas();

            this._leaderPanel = new FactionLeaderPanel();
            this._tripPanel = new FactionTripPanel();
        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.w_close) {
                this.hide();
            }
        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/faction/factionactive/factionactive.xml", "ui/uidata/faction/factionactive/factionactive.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this.applyLoadComplete();

            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this._leaderPanel.setUIAtlas(this._baseUiAtlas, this);
            this._tripPanel.setUIAtlas(this._baseUiAtlas, this.winmidRender);

            this.setIdx(0);

            this.resize();

        }
        private tab0: SelectButton;
        private tab1: SelectButton;1
        private initUI(): void {
            this.addUIList(["t_win_bian"], this.winmidRender);
            this.addUIList(["t_win_line"], this._topRender);

            this.addChild(this._baseRender.getComponent("t_win_title"));

            this.tab0 = <SelectButton>this._baseRender.getComponent("t_tab0");
            this.addChild(this.tab0);
            this.tab0.addEventListener(InteractiveEvent.Down,this.tabClick,this);

            this.tab1 = <SelectButton>this._baseRender.getComponent("t_tab1");
            this.addChild(this.tab1);
            this.tab1.addEventListener(InteractiveEvent.Down,this.tabClick,this);

        }

        private tabClick($e:InteractiveEvent):void{
            if($e.target == this.tab0){
                this.setIdx(0);
            }else if($e.target == this.tab1){
                this.setIdx(1);
            }
        }

        private _selIdx:number = 0;
        public setIdx($idx: number): void {
            if ($idx == 0) {
                this.tab0.selected = true;
                this.tab1.selected = false;

                this._tripPanel.show();
                this._leaderPanel.hide();

            } else if ($idx == 1) {
                this.tab0.selected = false;
                this.tab1.selected = true;
                this._tripPanel.hide();
                this._leaderPanel.show();
            }
            this._selIdx = $idx;
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            SceneManager.getInstance().render = false;

            if(this._baseRender.uiAtlas){
                this.setIdx(0);
            }
            
            //UIManager.getInstance().addUIContainer(this._tripPanel);


            var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if(this._selIdx == 0){
                this._tripPanel.hide();
            }else if(this._selIdx == 1){
                this._leaderPanel.hide();
            }
            //UIManager.getInstance().removeUIContainer(this._leaderPanel);
            //UIManager.getInstance().removeUIContainer(this._tripPanel);
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            super.hide();
        }

        public leadDataChg(): void {
            if (this._leaderPanel && this._leaderPanel.hasStage) {
                this._leaderPanel.drawLead();
            }
        }

        public tripDataChg(): void {
            if (this._tripPanel && this._tripPanel.hasStage) {
                this._tripPanel.maxChg();
            }

        }

    }
}