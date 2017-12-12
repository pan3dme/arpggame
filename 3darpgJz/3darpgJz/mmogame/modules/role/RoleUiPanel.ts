module role {

    export class RoleUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _publicbguiRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _redPointRender: RedPointRender

        public achievementPanel: AchievementPanel;
        public attributeUiPanel: AttributeUiPanel;
        public designationPanel: DesignationPanel;
        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;

            if (this.achievementPanel) {
                this.achievementPanel.dispose();
                this.achievementPanel = null;
            }
            if (this.attributeUiPanel) {
                this.attributeUiPanel.dispose();
                this.attributeUiPanel = null;
            }
            if (this.designationPanel) {
                this.designationPanel.dispose();
                this.designationPanel = null;
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
            this._publicbguiRender = new UIRenderComponent;
            this.addRender(this._publicbguiRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);


            this._roleRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/role/newrole.xml", "ui/uidata/role/newrole.png", () => { this.loadConfigCom() }, "ui/uidata/role/newrolepc.png");
            // });
        }

        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.initData();
            this.applyLoadComplete();
        }

        private tab0UiAry: Array<UICompenent>;
        private a_tab2: SelectButton
        private a_tab1: SelectButton
        private a_tab0: SelectButton
        private initData(): void {
            //添加UI控件初始化

            this.addChild(this._bgRender.getComponent("t_title"));

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);

            this.tab0UiAry = new Array
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.tab0UiAry.push(cnew_right_bg_top);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.tab0UiAry.push(cnew_right_bg_bottom);

            this.a_tab2 = <SelectButton>this.addEvntBut("tab2", this._roleRender);
            this.a_tab1 = <SelectButton>this.addEvntBut("tab1", this._roleRender);
            this.a_tab0 = <SelectButton>this.addEvntBut("tab0", this._roleRender);

            this._redPointRender.getRedPointUI(this, 7, new Vector2D(this.a_tab1.x + this.a_tab1.width - 5, this.a_tab1.y));
            this._redPointRender.getRedPointUI(this, 10, new Vector2D(this.a_tab2.x + this.a_tab2.width - 5, this.a_tab2.y));

            this.addChild(this._roleRender.getComponent("t_line"));
        }

        private selecttype($value: number): void {
            this.setUiListVisibleByItem(this.tab0UiAry, $value != 1);
            if ($value == 0) {
                this.a_tab0.selected = true;
                this.a_tab1.selected = false;
                this.a_tab2.selected = false;
                this.showTab0pnael();
                this.setSizeForPanelUiCopy(this.tab0UiAry[0], "b_right_bg_top", this._roleRender);
                this.setSizeForPanelUiCopy(this.tab0UiAry[1], "b_right_bg_bottom", this._roleRender);
            } else if ($value == 1) {
                this.a_tab1.selected = true;
                this.a_tab0.selected = false;
                this.a_tab2.selected = false;
                this.showTab1pnael();
            } else {
                this.a_tab2.selected = true;
                this.a_tab0.selected = false;
                this.a_tab1.selected = false;
                this.showTab2pnael();
                this.setSizeForPanelUiCopy(this.tab0UiAry[0], "b_right_bg_top1", this._roleRender);
                this.setSizeForPanelUiCopy(this.tab0UiAry[1], "b_right_bg_bottom1", this._roleRender);
            }
            this.winmidRender.applyObjData();
            this.resize();
        }

        private showTab0pnael() {
            if (!this.attributeUiPanel) {
                this.attributeUiPanel = new AttributeUiPanel();
                this.attributeUiPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
            }
            this.attributeUiPanel.show();
            if (this.achievementPanel) {
                this.achievementPanel.hide();
            }
            if (this.designationPanel) {
                this.designationPanel.hide();
            }
        }

        private showTab1pnael() {
            if (!this.achievementPanel) {
                this.achievementPanel = new AchievementPanel();
                this.achievementPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
            }
            this.achievementPanel.show();
            if (this.attributeUiPanel) {
                this.attributeUiPanel.hide();
            }
            if (this.designationPanel) {
                this.designationPanel.hide();
            }
        }

        private showTab2pnael() {
            if (!this.designationPanel) {
                this.designationPanel = new DesignationPanel();
                this.designationPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
            }
            this.designationPanel.show();
            if (this.achievementPanel) {
                this.achievementPanel.hide();
            }
            if (this.attributeUiPanel) {
                this.attributeUiPanel.hide();
            }

        }

        private hidealltab() {
            if (this.achievementPanel) {
                this.achievementPanel.hide();
            }
            if (this.attributeUiPanel) {
                this.attributeUiPanel.hide();
            }
            if (this.designationPanel) {
                this.designationPanel.hide();
            }
        }


        public resize(): void {
            super.resize();
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(0);
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.hidealltab();
            ModulePageManager.hideResTittle();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new RoleUiEvent(RoleUiEvent.HIDE_ROLE_EVENT));
                    break;
                case this.a_tab0:
                    this.selecttype(0);
                    break;
                case this.a_tab1:
                    this.selecttype(1);
                    break;
                case this.a_tab2:
                    this.selecttype(2);
                    break;
                default:
                    break;
            }
        }
    }

}