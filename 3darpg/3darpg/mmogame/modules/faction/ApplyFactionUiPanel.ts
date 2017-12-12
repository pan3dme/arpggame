module faction {

    export class ApplyFactionUiPanel extends WindowUi {
        private _publicbgRender: UIRenderComponent;

        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this.applybuildpanel.dispose();
            this.applybuildpanel = null;
            this.applyzhaomupanel.dispose();
            this.applyzhaomupanel = null;
            super.dispose();
        }


        public constructor() {
            super(0);
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/faction/newfaction/joinfaction.xml", "ui/uidata/faction/newfaction/joinfaction.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
        }



        private tab_chuang: SelectButton;
        private tab_zhao: SelectButton;
        public applybuildpanel: ApplyBuildPanel;
        public applyzhaomupanel: ApplyZhaomuPanel;

        private BaseUiAry: Array<UICompenent>
        private loadConfigCom(): void {

            this.winmidRender.uiAtlas = this._publicbgRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._baseRender;

            this.applybuildpanel = new ApplyBuildPanel();
            this.applybuildpanel.initUiAtlas(renderLevel.uiAtlas, this._publicbgRender.uiAtlas);
            this.applyzhaomupanel = new ApplyZhaomuPanel();
            this.applyzhaomupanel.initUiAtlas(renderLevel.uiAtlas, this._publicbgRender.uiAtlas);

            this.tab_zhao = <SelectButton>this.addEvntBut("tab_zhao", renderLevel);
            this.tab_chuang = <SelectButton>this.addEvntBut("tab_chuang", renderLevel);

            // UIuitl.getInstance().drawCostUI(renderLevel.uiAtlas,xxx.skinName,[104,100],"#853d07",90,20);

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", renderLevel);

            this.BaseUiAry = new Array
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", renderLevel);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", renderLevel);
            this.BaseUiAry.push(cnew_right_bg_top);
            this.BaseUiAry.push(cnew_right_bg_bottom);

            this.addUIList(["title", "b_newbg"], this._baseRender);

            this.winmidRender.applyObjData();
            this.applyLoadComplete();
        }

        private selecttype($value: number): void {
            if ($value == 0) {
                this.tab_zhao.selected = true;
                this.tab_chuang.selected = false;
                this.applybuildpanel.hide();
                this.applyzhaomupanel.show();
            } else {
                this.tab_chuang.selected = true;
                this.tab_zhao.selected = false;
                this.applybuildpanel.show();
                this.applyzhaomupanel.hide();
            }

            var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
            if ($value == 0) {
                $scenePange.data = SharedDef.MODULE_FACTION
            }
            ModuleEventManager.dispatchEvent($scenePange);
        }

        public show(value: number = 0): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(0);
        }
        public hide(): void {
            this.applybuildpanel.hide();
            this.applyzhaomupanel.hide();
            UIManager.getInstance().removeUIContainer(this);
            super.hide();
        }


        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.tab_chuang:
                    this.selecttype(1);
                    break
                case this.tab_zhao:
                    this.selecttype(0);
                    break
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_APPLYFACTIONUI_EVENT));
                    break
                default:
                    break;
            }
        }
    }
}