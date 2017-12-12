module ranking {

    export class RankingUiPanel extends WindowUi {

        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.currentServerRanking) {
                this.currentServerRanking.dispose();
                this.currentServerRanking = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._publicRender.uiAtlas = WindowUi.winUIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/ranking/ranking.xml", "ui/uidata/ranking/ranking.png", () => { this.loadConfigCom() }, "ui/uidata/ranking/rankingpc.png");
        }


        private b_bg1_1: UICompenent;
        public currentServerRanking: CurrentServerRanking;
        private loadConfigCom(): void {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            var renderLevel: UIRenderComponent = this._baseRender;
            this.addChild(renderLevel.getComponent("title"));
            this.applyLoadComplete();
        }



        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.currentServerRanking) {
                this.currentServerRanking = new CurrentServerRanking();
                this.currentServerRanking.initUiAtlas(this._baseRender.uiAtlas,this._publicRender.uiAtlas,this.winmidRender);
                this.currentServerRanking.parent = this
            }
            this.currentServerRanking.show();
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.currentServerRanking) {
                this.currentServerRanking.hide();
            }
            ModulePageManager.hideResTittle();
        }


        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new ranking.RankingEvent(ranking.RankingEvent.HIDE_RANKING_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}