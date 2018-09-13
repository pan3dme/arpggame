module faction {

    export class FactionBossUiPanel extends WindowUi {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
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
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)


            this._topRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
                this._publicRender.uiAtlas = $publicbgUiAtlas;
                this._topRender.uiAtlas.setInfo("ui/uidata/faction/factionboss/factionboss.xml", "ui/uidata/faction/factionboss/factionboss.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionboss/factionbossuse.png");
            });
        }



        public a_5: UICompenent
        public a_6: UICompenent
        public a_7: UICompenent
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._topRender.uiAtlas;
            this.winmidRender.uiAtlas = this._topRender.uiAtlas
            var renderLevel: UIRenderComponent = this._topRender;



          //  this.addChild(<UICompenent>renderLevel.getComponent("test"));
          


            this.addChild(this.winmidRender.getComponent("a_list_bg"));
            this.addChild(this.winmidRender.getComponent("a_left_line"));



            this.addChild(this._baseRender.getComponent("a_bottom_bg"));

            this.addChild(this._baseRender.getComponent("a_num_bg2"));
            this.addChild(this._baseRender.getComponent("a_num_bg1"));
            this.addChild(this._baseRender.getComponent("a_num_bg0"));

            this.addChild(renderLevel.getComponent("a_res_icon1"));
            this.addChild(renderLevel.getComponent("a_res_icon0"));


            this.a_5 = this.addChild(<UICompenent>renderLevel.getComponent("a_5"));
            this.a_6 = this.addChild(<UICompenent>renderLevel.getComponent("a_6"));
            this.a_7 = this.addChild(<UICompenent>renderLevel.getComponent("a_7"));




            this.addChild(renderLevel.getComponent("a_rand_but"));
            this.addChild(renderLevel.getComponent("a_boss_lp_label"));
            this.addChild(renderLevel.getComponent("a_kill_jifen_label"));
            this.addChild(renderLevel.getComponent("a_day_canget_label"));
            this.addChild(renderLevel.getComponent("a_boss_buy_label"));
            this.addChild(renderLevel.getComponent("a_rewaard_info_label"));
            this.addChild(renderLevel.getComponent("a_win_tittle"));



            this.applyLoadComplete();
        }

        public factionBossRightPanel: FactionBossRightPanel;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.factionBossRightPanel) {
                this.factionBossRightPanel = new FactionBossRightPanel();
                this.factionBossRightPanel.initUiAtlas(this._topRender.uiAtlas, this._publicRender.uiAtlas);
            }
            this.factionBossRightPanel.show();

            this.refreshCurrentNum();
            this.refreshCurrentIntegral();
            this.refreshCurrentResidue();
            ModulePageManager.showResTittle([1, 2, 3]);
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if(this.factionBossRightPanel){
               this.factionBossRightPanel.hide(); 
            }
            super.hide()
        }

        public resize(): void {
            super.resize();
        }

        public refreshCurrentNum() {
            var tab2 = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
           // GuidData.faction.getBossTokenNum() + "/" + tab2.token_max_keep
          //  ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_5.skinName, GuidData.faction.getBossTokenNum() + "/" + tab2.token_max_keep, ArtFont.num1, TextAlign.RIGHT);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_5.skinName, ColorType.Orange853d07 + GuidData.faction.getBossTokenNum() + "/" + tab2.token_max_keep, 16);
        }

        public refreshCurrentIntegral() {
            var tab2 = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
         //   ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_6.skinName, GuidData.faction.getBossTokenPoints() + "/" + tab2.token_points, ArtFont.num1, TextAlign.LEFT);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_6.skinName, ColorType.Orange853d07 + GuidData.faction.getBossTokenPoints() + "/" + tab2.token_points, 16);
        
        }

        public refreshCurrentResidue() {
            var tab2 = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            var residue = tab2.token_daily - GuidData.faction.getBossTokenPointscount();
           // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_7.skinName, String(residue), ArtFont.num1, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_7.skinName, ColorType.Orange853d07 + String(residue), 16);
        
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.HIDE_BOSS_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}