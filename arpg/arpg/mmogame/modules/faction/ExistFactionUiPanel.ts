module faction {

    export class ExistFactionUiPanel extends WindowUi {
        private _publicbgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;

            this.factionFunctionPanel.dispose();
            this.factionFunctionPanel = null;
            this.factionPersonPanel.dispose();
            this.factionPersonPanel = null;

            this._redPointRender.dispose();
            this._redPointRender = null;
            super.dispose();
        }

        public constructor() {
            super(2);
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._topRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/newfaction/extisfaction.xml", "ui/uidata/faction/newfaction/extisfaction.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
        }

        private tab_person: SelectButton;
        private tab_shang: SelectButton;
        private tab_sai: SelectButton;
        private un_liansai:UICompenent

        public factionFunctionPanel: FactionFunctionPanel;
        public factionPersonPanel: FactionPersonPanel;

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._topRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbgRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._topRender;

            this.factionPersonPanel = new FactionPersonPanel();
            this.factionPersonPanel.initUiAtlas(renderLevel.uiAtlas, this._publicbgRender.uiAtlas);
            this.factionPersonPanel.parent = this;


            this.factionFunctionPanel = new FactionFunctionPanel();
            this.factionFunctionPanel.initUiAtlas(renderLevel.uiAtlas,this);

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "bg_1", renderLevel);

            this.addUIList(["title"], renderLevel);

            this.tab_person = <SelectButton>this.addEvntBut("tab_person", this._baseRender);
            this.tab_shang = <SelectButton>this.addEvntBut("tab_shang", this._baseRender);
            this.tab_sai = <SelectButton>this.addEvntBut("tab_sai", this._baseRender);
            
            this.un_liansai = this._topRender.getComponent("un_liansai");
            this.un_liansai.addEventListener(InteractiveEvent.Down, ()=>{
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "开服第三天开启", 99)
            }, this);

            this._redPointRender.getRedPointUI(this, 61, new Vector2D(this.tab_person.x + this.tab_person.width - 5, this.tab_person.y));
            this._redPointRender.getRedPointUI(this, 63, new Vector2D(this.tab_shang.x + this.tab_shang.width - 5, this.tab_shang.y));

            this.applyLoadComplete();
        }


        private selectlo($value: number): void {
            if ($value == SharedDef.MODULE_FACTION_MEMBER) {
                this.tab_person.selected = true;
                this.tab_shang.selected = false;
                this.tab_sai.selected = false;
            } else if ($value == SharedDef.MODULE_FACTION_FUNCTION) {
                this.tab_person.selected = false;
                this.tab_sai.selected = false;
                this.tab_shang.selected = true;
            } else if ($value == SharedDef.MODULE_FACTION_WAR) {
                this.tab_person.selected = false;
                this.tab_sai.selected = true;
                this.tab_shang.selected = false;
            }
            this.selectdatalo($value);
        }

        private showhide_select($value: number) {
            if ($value == SharedDef.MODULE_FACTION_MEMBER) {
                this.factionFunctionPanel.hide();
                ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT));
                this.factionPersonPanel.show();
            } else if ($value == SharedDef.MODULE_FACTION_FUNCTION) {
                this.factionPersonPanel.hide();
                ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT));
                this.factionFunctionPanel.show();
            } else if ($value == SharedDef.MODULE_FACTION_WAR) {
                this.factionPersonPanel.hide();
                this.factionFunctionPanel.hide();
                ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.SHOW_LEAGUE_EVENT));
            }
        }

        private _typelo: number;//当前tab
        private selectdatalo($value: number): void {
            if (this._typelo == $value) {
                return;
            }
            this._typelo = $value
            //处理逻辑
            this.showhide_select($value);
        }


        public refresh(): void {
            var session:number = GuidData.globelValue.getFactionLeagueSession();
            this.setUiListVisibleByItem([this.un_liansai],session == 0);
        }

        public show(value: number): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selectlo(value);
            this.refresh();
        }
        public hide(): void {
            this._typelo = -1;
            UIManager.getInstance().removeUIContainer(this);
            this.factionPersonPanel.hide();
            this.factionFunctionPanel.hide();
            ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.HIDE_LEAGUE_EVENT));
            super.hide();
            // this.queenPanel.hide();
        }

        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            //console.log("--btn---", evt.target);
            switch (evt.target) {
                case this.tab_person:
                    this.selectlo(SharedDef.MODULE_FACTION_MEMBER);
                    break
                case this.tab_shang:
                    this.selectlo(SharedDef.MODULE_FACTION_FUNCTION);
                    break
                case this.tab_sai:
                    this.selectlo(SharedDef.MODULE_FACTION_WAR);
                    break

                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_EXISTFACTIONUI_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}