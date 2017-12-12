module sboss {

    export class SbossPanel extends WindowUi {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender

        private uiAtlasComplet: boolean = false;

        public personBossPanel: PersonBossPanel;
        public smassBossPanel: SmassBossPanel;
        public wBossPanel: WbossPanel;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._midRender.uiAtlas = new UIAtlas;
        }


        public dispose(): void {
            // this._bgRender.dispose();
            // this._bgRender = null;
            // this._roleRender.dispose();
            // this._roleRender = null;
            // this._redPointRender.dispose();
            // this._redPointRender = null;

            // if (this.achievementPanel) {
            //     this.achievementPanel.dispose();
            //     this.achievementPanel = null;
            // }
            // if (this.attributeUiPanel) {
            //     this.attributeUiPanel.dispose();
            //     this.attributeUiPanel = null;
            // }
            // if (this.designationPanel) {
            //     this.designationPanel.dispose();
            //     this.designationPanel = null;
            // }
            super.dispose();
        }

        public applyLoad(): void {

            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._midRender.uiAtlas.setInfo("ui/uidata/boss/sboss/sboss.xml", "ui/uidata/boss/sboss/sboss.png", () => { this.loadConfigCom() }, "ui/uidata/boss/sboss/sbossuse.png");

        }

        public wbossChg(): void {
            if (this.wBossPanel && this.wBossPanel.hasStage) {
                this.wBossPanel.setBtnLab();
            }
        }

        public show($data: number): void {
            ModulePageManager.showResTittle([1, 2, 3]);
            UIManager.getInstance().addUIContainer(this);
            this.refreshOpenLev();
            this.selectTabById($data)
        }




        public hide(): void {
            this.personBossPanel.hide();
            this.smassBossPanel.hide();
            this.wBossPanel.hide();
            UIManager.getInstance().removeUIContainer(this);
            super.hide();

        }

        public onRemove() {
            super.onRemove();
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.SET_LASTID));
            var $evt = new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA_TIP);
            $evt.data = null;
            ModuleEventManager.dispatchEvent($evt);
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_tab0:
                    this.selectTabById(SharedDef.MODULE_BOSS_RISK_BOSS)
                    break;
                case this.a_tab1:
                    this.selectTabById(SharedDef.MODULE_BOSS_WORLD_BOSS)
                    break;
                case this.a_tab2:
                    this.selectTabById(SharedDef.MODULE_BOSS_PERSON_BOSS)
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock1.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock2.data.level + "级后解锁", 99);
                    break;
                case this.w_close:
                    this.hide();
                    break;
                default:
                    break;

            }

        }
        private tabType: number = 0;
        public selectTabById(value: number): void {
            this.tabType = value;
            if (this.tabType == SharedDef.MODULE_BOSS_RISK_BOSS) {
                this.a_tab0.selected = false;
                this.a_tab1.selected = true;
                this.a_tab2.selected = true;
                this.smassBossPanel.show();
                this.personBossPanel.hide();
                this.wBossPanel.hide();
            } else if (this.tabType == SharedDef.MODULE_BOSS_WORLD_BOSS) {
                this.a_tab0.selected = true;
                this.a_tab1.selected = false;
                this.a_tab2.selected = true;
                this.smassBossPanel.hide();
                this.personBossPanel.hide();
                this.wBossPanel.show();
            } else {
                this.a_tab0.selected = true;
                this.a_tab1.selected = true;
                this.a_tab2.selected = false;
                this.smassBossPanel.hide();
                this.wBossPanel.hide();
                this.personBossPanel.show();
            }
        }

        private a_tab0: SelectButton;
        private a_tab1: SelectButton;
        private a_tab2: SelectButton;
        private UnlockUIAry: Array<UICompenent>
        private t_unlock0: UICompenent
        private t_unlock1: UICompenent
        private t_unlock2: UICompenent
        private TabAry: Array<SelectButton>
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.initRightBg()

            this.a_tab0 = this.addEvntBut("a_tab0", this._midRender);
            this.a_tab1 = this.addEvntBut("a_tab1", this._midRender);
            this.a_tab2 = this.addEvntBut("a_tab2", this._midRender);

            this.TabAry = new Array
            this.TabAry.push(this.a_tab2);
            this.TabAry.push(this.a_tab0);
            this.TabAry.push(this.a_tab1);

            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._topRender.getComponent("t_win_line"));

            this.UnlockUIAry = new Array
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._midRender);
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._midRender);
            this.UnlockUIAry.push(this.t_unlock1);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._midRender);
            this.UnlockUIAry.push(this.t_unlock2);

            this.smassBossPanel = new SmassBossPanel();
            this.smassBossPanel.setRender(this._midRender.uiAtlas, this.winmidRender);

            this.personBossPanel = new PersonBossPanel();
            this.personBossPanel.setRender(this._midRender.uiAtlas, this.winmidRender);

            this.wBossPanel = new WbossPanel();
            this.wBossPanel.setUIAtlas(this._midRender.uiAtlas, this.winmidRender);

            this._redPointRender.getRedPointUI(this, 118, new Vector2D(this.a_tab2.x + this.a_tab2.width - 5, this.a_tab2.y));

            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }
        private initRightBg(): void {

            var rightLinebg: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "a_right_tab_bg", this._midRender);
            // var cnew_right_bg_top: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            // this.setSizeForPanelUiCopy(cnew_right_bg_top, "a_right_bg_top", this._midRender);
            // var cnew_right_bg_bottom: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            // this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "a_right_bg_bottom", this._midRender);

            // this.winmidRender.applyObjData();
        }


        public refreshOpenLev() {
            var tabsysary: Array<tb.TB_system_base> = new Array
            //读表，判断解锁情况
            for (var j = 0; j < SharedDef.MODULE_BOSS_WORLD_BOSS; j++) {
                var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_BOSS * 10 + j + 1));
                tabsysary.push($tb_system_base);
            }

            for (var i = 0; i < tabsysary.length; i++) {
                if (tabsysary[i].level <= GuidData.player.getLevel()) {
                    this.setUiListVisibleByItem([this.TabAry[i]], true);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                } else {
                    this.setUiListVisibleByItem([this.TabAry[i]], false);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                    this.UnlockUIAry[i].data = tabsysary[i];
                }
            }
        }



    }
}