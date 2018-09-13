module fightui {

    export class FightUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;
        private _cdUIRenderComponent: CdRenderComponent;

        private uiAtlasComplet:boolean=false
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.bottom = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);



            this._cdUIRenderComponent = new CdRenderComponent();
            this.addRender(this._cdUIRenderComponent);


            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;
            TimeUtil.addFrameTick((t: number) => { this.update(t) });
        }
        public update(t: number): void {
            if (this.uiAtlasComplet) {
                this.fightSkillPanel.update(t)
            }

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/fight/fight.xml", "ui/uidata/mainui/fight/fight.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._cdUIRenderComponent.uiAtlas = this._midRender.uiAtlas;

            this.fightSkillPanel = new FightSkillPanel();
            this.fightSkillPanel.setRender(this._bottomRender, this._midRender, this._topRender, this._cdUIRenderComponent);
            this.addVirtualContainer(this.fightSkillPanel); 

            this.uiAtlasComplet = true
            this.applyLoadComplete();
          
        }
        public fightSkillPanel: FightSkillPanel
    }
}