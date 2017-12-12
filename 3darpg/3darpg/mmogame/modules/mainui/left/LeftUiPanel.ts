module leftui {

    export class LeftUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent

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


            this._midRender.uiAtlas = new UIAtlas;


            this.leftUiQuestPanel = new LeftUiQuestPanel();
           // this.leftHangUpPanel = new LeftHangUpPanel();


        }
     //   public leftHangUpPanel: LeftHangUpPanel
        //public leftFamilyUiPanel: LeftFamilyUiPanel;
        public leftUiQuestPanel: LeftUiQuestPanel;
        public applyLoad(): void {

            this.leftUiQuestPanel.loadAtlas(() => {

                //this.leftHangUpPanel.loadAtlas(() => {
                //    this._midRender.uiAtlas.setInfo("ui/uidata/mainui/left/left.xml", "ui/uidata/mainui/left/left.png", () => { this.loadConfigCom() });
                //})
                this._midRender.uiAtlas.setInfo("ui/uidata/mainui/left/left.xml", "ui/uidata/mainui/left/left.png", () => { this.loadConfigCom() });
            })

        }
        private a_hide_but: UICompenent;
        private a_state2_tab0: SelectButton
        private a_state2_tab1: SelectButton
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(<UICompenent>this._bottomRender.getComponent("a_bg"));
            this.a_state2_tab1 = <SelectButton>this.addEvntBut("a_state2_tab1", this._midRender);
            this.a_state2_tab0 = <SelectButton>this.addEvntBut("a_state2_tab0", this._midRender);
            this.a_hide_but = this.addEvntBut("a_hide_but", this._midRender);
            this.a_hide_but.left = 6;

            this.uiAtlasComplet = true;
            this.applyLoadComplete();

            mainUi.MainUiModel.mainUiLoadFinish();

        }
        public refresh(): void {
            if (GuidData.map.showAreaById(AreaType.topleftpalce_2)) {
                this.left = 0
                this.setUiListVisibleByItem([this.a_hide_but], true);
            } else {
                this.left = -1000
                this.setUiListVisibleByItem([this.a_hide_but], false);
                return
            }

            this.setUiListVisibleByItem([this.a_state2_tab1], GuidData.player.isOpenSystemById(SharedDef.MODULE_EXP));
           // a_state2_tab1

            this.a_hide_but.isU = !this.openOrClose;
            if (!this.openOrClose) {
                this.pxleft = -300
            } else {
                this.pxleft = 0
            }

            this.selectTab(TaskListUi.showType);
            this.leftUiQuestPanel.show()
        }

        private selectTab($type: number) {
            TaskListUi.showType = $type
            if ($type == 0) {
                this.a_state2_tab0.selected = true;
                this.a_state2_tab1.selected = false;
           
                this.leftUiQuestPanel.refreshType(TaskListUi.showType);
             //   this.leftHangUpPanel.hide()
            } else {
                this.a_state2_tab1.selected = true;
                this.a_state2_tab0.selected = false;
                this.leftUiQuestPanel.refreshType(TaskListUi.showType);
           //     this.leftHangUpPanel.show()
            }
     
        }
        private openOrClose: boolean = true
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_state2_tab0:
                    
                    this.selectTab(0);
                    break;
                case this.a_state2_tab1:
                    this.selectTab(1);
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
            //this.leftHangUpPanel.left = value + 40;
            //this.leftHangUpPanel.resize();

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
          //  this.leftHangUpPanel.hide();

            UIManager.getInstance().removeUIContainer(this);


        }

    }



}