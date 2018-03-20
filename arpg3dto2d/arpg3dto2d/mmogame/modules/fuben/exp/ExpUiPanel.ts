module fb {

    export class ExpUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;

            if (this.teamcopyUiPanel) {
                this.teamcopyUiPanel.dispose();
                this.teamcopyUiPanel = null;
            }
            if (this.exptaskpanel) {
                this.exptaskpanel.dispose();
                this.exptaskpanel = null;
            }

            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)


            this._bgRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/fuben/exp/exp.xml", "ui/uidata/fuben/exp/exp.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();

            this.applyLoadComplete();
        }

        private TabAry: Array<SelectButton>
        // private t_unlock0: UICompenent
        private t_unlock2: UICompenent

        private tab1dis: UICompenent
        private initData(): void {
            this.TabAry = new Array
            for (var i = 0; i < 2; i++) {
                var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = SharedDef.MODULE_TEAMINSTANCE_EXP + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }


            this.tab1dis = this._baseRender.getComponent("t_tab1_dis");
            this.tab1dis.addEventListener(InteractiveEvent.Up, this.butClik, this);
            // var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab0"));
            // a.data = SharedDef.MODULE_TEAMINSTANCE_EXP;
            // a.addEventListener(InteractiveEvent.Up, this.click, this);
            // this.TabAry.push(a);

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bgRender);

            this.winmidRender.applyObjData();

            this.addUIList(["a_title"], this._bgRender);
            this.addUIList(["a_line1"], this._baseRender);

        }

        public resize(): void {
            super.resize();
        }

        public showTab1(): void {
            if (this.tab1dis.parent) {
                this.refreshOpenLev(this.TabAry[1]);
            }
        }

        private refreshOpenLev($tab: SelectButton) {
            var $page: number = $tab.data;
            if ($page == SharedDef.MODULE_TEAMINSTANCE_EXP) {
                this.setUiListVisibleByItem([$tab], true);
                return;
            }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_TEAMINSTANCE, $page)) {
                this.setUiListVisibleByItem([$tab], true);
                this.setUiListVisibleByItem([this.tab1dis], false);
            } else {
                var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_TEAMINSTANCE * 10 + $page));
                this.setUiListVisibleByItem([$tab], false);
                this.setUiListVisibleByItem([this.tab1dis], true);
                this.tab1dis.data = $tb_system_base;
                this.tab1dis.y = $tab.y
            }
        }

        private getTabidx($aryTab: Array<number>, $curTab: number): number {
            return $aryTab.indexOf($curTab);
        }

        //只能默认选中第一个。如果需要设定选中哪个，则自己调整Tab顺序
        public show($aryTab: Array<number>, $selTab: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }

            for (let i = 0; i < this.TabAry.length; i++) {
                var $idx: number = this.getTabidx($aryTab, Number(this.TabAry[i].data));
                if ($idx != -1) {
                    this.TabAry[i].y = $idx * 94 + 100
                    this.refreshOpenLev(this.TabAry[i]);
                } else {
                    this.setUiListVisibleByItem([this.TabAry[i], this.tab1dis], false);
                }
            }

            this.selectedTab($selTab);
            this.resize();
        }


        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        }

        public selectedTab($value: number) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }
            this.hideTabPage($value);
            this.showTabPage($value);
        }


        // public divineswordTask: DivineswordTask
        public exptaskpanel: ExpTaskPanel
        public teamcopyUiPanel: copytask.TeamcopyUiPanel;

        private showTabPage($value: number) {
            switch ($value) {
                case SharedDef.MODULE_TEAMINSTANCE_EXP:
                    if (!this.exptaskpanel) {
                        this.exptaskpanel = new ExpTaskPanel();
                        this.exptaskpanel.parent = this;
                        this.exptaskpanel.initUiAtlas(this._bgRender.uiAtlas, WindowUi.winUIAtlas);
                    }
                    this.exptaskpanel.show();
                    break;
                case SharedDef.MODULE_TEAMINSTANCE_TEAM:
                    if (!this.teamcopyUiPanel) {
                        this.teamcopyUiPanel = new copytask.TeamcopyUiPanel();
                        this.teamcopyUiPanel.initUiAtlas(this._bgRender.uiAtlas, WindowUi.winUIAtlas, this.winmidRender);
                    }
                    this.teamcopyUiPanel.show();
                    break;

                default:
                    break;
            }
        }

        private hideTabPage($value: number = -1) {
            switch ($value) {
                case SharedDef.MODULE_TEAMINSTANCE_EXP:
                    if (this.teamcopyUiPanel) {
                        this.teamcopyUiPanel.hide();
                    }

                    break;
                case SharedDef.MODULE_TEAMINSTANCE_TEAM:
                    if (this.exptaskpanel) {
                        this.exptaskpanel.hide();
                    }
                    break;

                default:
                    if (this.exptaskpanel) {
                        this.exptaskpanel.hide();
                    }
                    if (this.teamcopyUiPanel) {
                        this.teamcopyUiPanel.hide();
                    }
                    break;
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new ExpEvent(ExpEvent.HIDE_EXP_PANEL))
                    break;
                case this.tab1dis:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.tab1dis.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        }

        private click(evt: InteractiveEvent): void {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        }
    }

}