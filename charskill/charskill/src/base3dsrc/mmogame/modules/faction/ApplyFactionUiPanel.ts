module faction {

    export class ApplyFactionUiPanel extends WindowUi {
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
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

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/faction/newfaction/joinfaction.xml", "ui/uidata/faction/newfaction/joinfaction.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
        }



        private tab_chuang: SelectButton;
        private tab_zhao: SelectButton;
        private tab_sai: SelectButton;
        public applybuildpanel: ApplyBuildPanel;
        public applyzhaomupanel: ApplyZhaomuPanel;

        private un_liansai:UICompenent

        
        private loadConfigCom(): void {

            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;

            var renderLevel: UIRenderComponent = this._baseRender;
            this._topRender.uiAtlas = this._baseRender.uiAtlas

            this.applybuildpanel = new ApplyBuildPanel();
            this.applybuildpanel.initUiAtlas(renderLevel.uiAtlas, this.winmidRender);
            this.applyzhaomupanel = new ApplyZhaomuPanel();
            this.applyzhaomupanel.initUiAtlas(renderLevel.uiAtlas, this.winmidRender);

            this.tab_zhao = <SelectButton>this.addEvntBut("tab_zhao", renderLevel);
            this.tab_chuang = <SelectButton>this.addEvntBut("tab_chuang", renderLevel);
            this.tab_sai = <SelectButton>this.addEvntBut("tab_sai", renderLevel);

            // UIuitl.getInstance().drawCostUI(renderLevel.uiAtlas,xxx.skinName,[104,100],"#853d07",90,20);

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", renderLevel);


            this.addUIList(["title"], this._baseRender);

            this.un_liansai = this._topRender.getComponent("un_liansai");
            this.un_liansai.addEventListener(InteractiveEvent.Down, ()=>{
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "开服第三天开启", 99)
            }, this);

            this.winmidRender.applyObjData();
            this.applyLoadComplete();
        }

        private selecttype($value: number): void {
            if ($value == SharedDef.MODULE_FACTION_RECRUIT) {
                this.tab_zhao.selected = true;
                this.tab_chuang.selected = false;
                this.tab_sai.selected = false;
                this.applybuildpanel.hide();
                this.applyzhaomupanel.show();
                ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            } else if ($value == SharedDef.MODULE_FACTION_CREATE) {
                this.tab_chuang.selected = true;
                this.tab_zhao.selected = false;
                this.tab_sai.selected = false;
                this.applybuildpanel.show();
                this.applyzhaomupanel.hide();
                ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            } else if ($value == SharedDef.MODULE_FACTION_WAR) {
                this.tab_zhao.selected = false;
                this.tab_chuang.selected = false;
                this.tab_sai.selected = true;
                ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.SHOW_LEAGUE_EVENT));
                this.applybuildpanel.hide();
                this.applyzhaomupanel.hide();
            }

            var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
            if ($value == 0) {
                $scenePange.data = SharedDef.MODULE_FACTION
            }
            ModuleEventManager.dispatchEvent($scenePange);
        }

        public refresh(): void {
            var session:number = GuidData.globelValue.getFactionLeagueSession();
            this.setUiListVisibleByItem([this.un_liansai],session == 0);
        }

        public show(value: number): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(value);
            this.refresh();
        }
        public hide(): void {
            this.applybuildpanel.hide();
            this.applyzhaomupanel.hide();
            ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            UIManager.getInstance().removeUIContainer(this);
            super.hide();
        }


        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.tab_chuang:
                    this.selecttype(SharedDef.MODULE_FACTION_CREATE);
                    break
                case this.tab_zhao:
                    this.selecttype(SharedDef.MODULE_FACTION_RECRUIT);
                    break
                case this.tab_sai:
                    this.selecttype(SharedDef.MODULE_FACTION_WAR);
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