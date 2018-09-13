module adventuremap {

    export class WorldAdventureUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;


            if (this.adventureMapPanel) {
                this.adventureMapPanel.dispose();
                this.adventureMapPanel = null;
            }
            if (this.mapWorldPanel) {
                this.mapWorldPanel.dispose();
                this.mapWorldPanel = null;
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
            this._bgRender.uiAtlas.setInfo("ui/uidata/adventure/adventuremap/adventuremap.xml", "ui/uidata/adventure/adventuremap/adventuremap.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();

            this.applyLoadComplete();
        }

        private TabAry: Array<SelectButton>
        private UnlockUIAry: Array<UICompenent>
        private t_unlock0: UICompenent
        private t_unlock1: UICompenent

        private initData(): void {
            this.TabAry = new Array
            for (var i = 0; i < 2; i++) {
                var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = 2 * i + 1;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }


            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bgRender);

            this.UnlockUIAry = new Array
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock1);

            this.winmidRender.applyObjData();

            this.addUIList(["a_tittle_name"], this._bgRender);
            this.addUIList(["t_bgline"], this._baseRender);

        }

        public resize(): void {
            super.resize();
        }

        public refreshOpenLev() {
            //判断解锁情况
            for (var i = 0; i < 2; i++) {
                if (GuidData.player.getsyspageopen(SharedDef.MODULE_TEST, 2 * i + 1)) {
                    this.setUiListVisibleByItem([this.TabAry[i]], true);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                } else {
                    this.setUiListVisibleByItem([this.TabAry[i]], false);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                    this.UnlockUIAry[i].data = tb.TB_system_base.getTempVo(SharedDef.MODULE_TEST * 10 + 2 * i + 1);
                }
            }
        }

        public show($data: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.refreshOpenLev();
            this.selectedTab($data);
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        }

        private _lastvalue: number
        public selectedTab($value: number) {
            this._lastvalue = $value;
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


        public adventureMapPanel: AdventureMapPanel
        public mapWorldPanel: MapWorldPanel
        
        private showTabPage($value: number) {
            switch ($value) {
                case SharedDef.MODULE_TEST_RISK:
                    if (!this.adventureMapPanel) {
                        this.adventureMapPanel = new AdventureMapPanel();
                        this.adventureMapPanel.initUiAtlas(this._bgRender.uiAtlas);
                        this.adventureMapPanel.parent = this;
                    }
                    this.adventureMapPanel.refresh();
                    break;
                case SharedDef.MODULE_TEST_WORLD:
                    if (!this.mapWorldPanel) {
                        this.mapWorldPanel = new MapWorldPanel();
                        this.mapWorldPanel.initUiAtlas(this._bgRender.uiAtlas);
                        this.mapWorldPanel.parent = this;
                    }
                    this.mapWorldPanel.show();
                    break;

                default:
                    break;
            }
        }

        private hideTabPage($value: number = -1) {
            switch ($value) {
                case SharedDef.MODULE_TEST_RISK:
                    if (this.mapWorldPanel) {
                        this.mapWorldPanel.hide();
                    }
                    break;
                case SharedDef.MODULE_TEST_WORLD:
                    if (this.adventureMapPanel) {
                        this.adventureMapPanel.hide();
                    }
                    break;

                default:
                    if (this.adventureMapPanel) {
                        this.adventureMapPanel.hide();
                    }
                    if (this.mapWorldPanel) {
                        this.mapWorldPanel.hide();
                    }
                    break;
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new AdventureMapEvent(AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL))

                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock1.data.level + "级后解锁", 99);
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