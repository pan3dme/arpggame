module leftui {

    export class LeftUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _redPointRender: RedPointRender;

        private uiAtlasComplet: boolean = false;

        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.left = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);


            this._midRender.uiAtlas = new UIAtlas;


            this.leftUiQuestPanel = new LeftUiQuestPanel();
            this.leftGropPanel = new LeftGropPanel();


        }
        //   public leftHangUpPanel: LeftHangUpPanel
        //public leftFamilyUiPanel: LeftFamilyUiPanel;
        public leftUiQuestPanel: LeftUiQuestPanel;
        public leftGropPanel: LeftGropPanel;
        public applyLoad(): void {
            this.leftUiQuestPanel.loadAtlas(() => {
                this.leftGropPanel.loadAtlas(() => {
                    this._midRender.uiAtlas.setInfo("ui/uidata/mainui/left/left.xml", "ui/uidata/mainui/left/left.png", () => { this.loadConfigCom() });
                })

            })

        }
        private a_hide_but: UICompenent;
        private a_change: UICompenent;
        private a_quest: SelectButton;
        private a_lilian: SelectButton;

        //private a_quest:SelectButton;
        //private a_lilian:SelectButton;
        private a_boss: SelectButton;
        private a_team: SelectButton;

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(<UICompenent>this._bottomRender.getComponent("a_bg"));

            this.a_quest = <SelectButton>this.addEvntBut("a_state2_tab0", this._midRender);
            this.a_lilian = <SelectButton>this.addEvntBut("a_state2_tab1", this._midRender);
            this.a_boss = <SelectButton>this.addEvntBut("a_boss", this._midRender);
            this.a_team = <SelectButton>this.addEvntBut("a_team", this._midRender);
            this.a_boss.x = this.a_lilian.x = this.a_quest.x;



            this.a_change = this._midRender.getComponent("a_change");
            this.a_change.addEventListener(InteractiveEvent.Up, this.changeClick, this);

            this._redPointRender.getRedPointUI(this, 123, new Vector2D(this.a_change.x + this.a_change.width - 5, this.a_change.y));

            this.a_hide_but = this.addEvntBut("a_hide_but", this._midRender);
            this.a_hide_but.left = 6;

            this.uiAtlasComplet = true;
            this.applyLoadComplete();

            mainUi.MainUiModel.mainUiLoadFinish();

        }

        private changeClick($e: InteractiveEvent) {
            UiTweenScale.getInstance().changeButSize($e.target);
            var $evt = new chgfish.ChgfishEvent(chgfish.ChgfishEvent.SHOW_Chgfish_EVENT);
            $evt.data = this.a_change;
            ModuleEventManager.dispatchEvent($evt);
        }

        public refreshQuestPanel() {
            if (this.uiAtlasComplet) {
                this.leftUiQuestPanel.refresh();
            }
        }
        public refreshGroupPanel() {
            if (this.uiAtlasComplet) {
                this.leftGropPanel.refrish();
            }
        }

        public showChange() {
            var sysopen: boolean = GuidData.player.getsyspageopen(SharedDef.MODULE_FISH, SharedDef.MODULE_FISH_ALL);
            var redary: Array<RedPointNode> = chgfish.ChgfishModel.getInstance().getList();
            this.setUiListVisibleByItem([this.a_change], sysopen && redary.length > 0);
        }

        public refresh(): void {
            this.showChange();
            if (GuidData.map.showAreaById(AreaType.topleftpalce_2)) {
                this.left = 0
                this.setUiListVisibleByItem([this.a_hide_but], true);
            } else {
                this.left = -1000
                this.setUiListVisibleByItem([this.a_hide_but], false);
                return
            }
            this.setUiListVisibleByItem([this.a_team], true);
            this.setUiListVisibleByItem([this.a_lilian], GuidData.player.isOpenSystemById(SharedDef.MODULE_EXP));

            this.showTab();
            this.a_hide_but.isU = !this.openOrClose;
            if (!this.openOrClose) {
                this.pxleft = -300
            } else {
                this.pxleft = 0
            }

            this.selectTab(TaskListUi.showType);




        }

        public showTab(): void {
            /*
            if(GuidData.map.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_MASS_BOSS){
                this.removeChild(this.a_quest);
                this.addChild(this.a_boss);
                TaskListUi.showType = 2;
            }else{
                this.addChild(this.a_quest);
                this.removeChild(this.a_boss);
                TaskListUi.showType = 0;
            }
            */
        }

        private selectTab($type: number) {
            if ($type != 3) {
                if (GuidData.map.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_MASS_BOSS) {
                    $type = 2;
                } else {
                    $type = 0;
                }
            }
            TaskListUi.showType = $type

            this.a_team.selected = false;
            this.a_quest.selected = false;
            this.a_lilian.selected = false;
            this.a_boss.selected = false;


            if ($type == 0) {
                this.setUiListVisibleByItem([this.a_quest], true)
                this.setUiListVisibleByItem([this.a_lilian, this.a_boss], false);
                this.a_quest.selected = true;

                this.leftUiQuestPanel.refreshType(TaskListUi.showType);
            } else if ($type == 1) {
                this.setUiListVisibleByItem([this.a_lilian], true)
                this.setUiListVisibleByItem([this.a_quest, this.a_boss], false);
                this.a_lilian.selected = true;
                this.leftUiQuestPanel.refreshType(TaskListUi.showType);
            } else if ($type == 2) {
                this.setUiListVisibleByItem([this.a_boss], true)
                this.setUiListVisibleByItem([this.a_quest, this.a_lilian], false)
                this.a_boss.selected = true;
                this.leftUiQuestPanel.refreshType(TaskListUi.showType);
            } else if ($type == 3) {
                this.a_team.selected = true;
            }

            if (TaskListUi.showType == 3) {
                this.leftGropPanel.show()
                this.leftUiQuestPanel.hide()
            } else {
                this.leftGropPanel.hide();
                this.leftUiQuestPanel.show()

            }
        }
        private openOrClose: boolean = true
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_quest:
                    this.selectTab(0);
                    break;
                case this.a_lilian:
                    this.selectTab(1);
                    break;
                case this.a_boss:
                    this.selectTab(2);
                    break;
                case this.a_team:
                    if (TaskListUi.showType == 3) {
                        this.selectTab(3);
                        ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.SHOW_TEAM_PANEL));
                    } else {
                        this.selectTab(3);
                    }



                    break;
                case this.a_hide_but:
                    this.openOrClose = !this.openOrClose;
                    if (!this.openOrClose) {
                        TweenMoveTo(this, 0.2, { pxleft: -300 });
                    } else {
                        TweenMoveTo(this, 0.2, { pxleft: 0 });
                    }
                    this.a_hide_but.isU = !this.openOrClose;
                    this._midRender.applyObjData();
                    break;
                default:
                    break
            }
        }
        private tempLeft: number = 0
        public set pxleft(value: number) {

            this.tempLeft = value
            this.left = this.tempLeft;

            this.leftUiQuestPanel.left = value;
            this.leftUiQuestPanel.resize();
            this.leftGropPanel.left = value + 40;
            this.leftGropPanel.resize();

            this.resize();
        }
        public get pxleft(): number {
            return this.tempLeft;
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.refresh();
        }
        public hide(): void {
            this.leftUiQuestPanel.hide();
            this.leftGropPanel.hide();
            UIManager.getInstance().removeUIContainer(this);


        }

    }



}