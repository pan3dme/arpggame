module treasure {

    export class TreasureUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;

            this._redPointRender.dispose();
            this._redPointRender = null;
            if(this.treasureWear){
                this.treasureWear.dispose();
                this.treasureWear = null;
            }
            if(this.treasurePage){
                this.treasurePage.dispose();
                this.treasurePage = null;
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
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._roleRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._roleRender.uiAtlas.setInfo("ui/uidata/treasure/treasureui.xml", "ui/uidata/treasure/treasureui.png", () => { this.loadConfigCom() }, "ui/uidata/treasure/treasurepc.png");
        }


        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;

            this.initData();
            this.resize();
            this.applyLoadComplete();
        }

        private TabAry: Array<SelectButton>
        private initData(): void {
            //添加UI控件初始化
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;

            this.TabAry = new Array
            for (var i = 0; i < 2; i++) {
                var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = SharedDef.MODULE_DIVINE_ALL + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
                this._redPointRender.getRedPointUI(this, 131 + i, new Vector2D(a.x + a.width - 5, a.y));
            }

            this.addChild(this._bgRender.getComponent("a_title"));

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);
            this.winmidRender.applyObjData();

            this.addUIList(["e_line"], this._roleRender);

        }

        public resize(): void {
            super.resize();
        }

        private click(evt: InteractiveEvent): void {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);

        }

        public selectedTab($value: number) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }
            //公共背景显隐逻辑
            this.hideTabPage($value);
            this.showTabPage($value);
        }

        public treasurePage: TreasurePage;
        public treasureWear: TreasureWear;
        private showTabPage($value: number) {
            switch ($value) {
                case SharedDef.MODULE_DIVINE_ALL:
                    if (!this.treasurePage) {
                        this.treasurePage = new TreasurePage();
                        this.treasurePage.initUiAtlas(this._roleRender.uiAtlas, this.winmidRender);
                        this.treasurePage.parent = this;
                    }
                    this.treasurePage.show();
                    break;
                case SharedDef.MODULE_DIVINE_USE:
                    if (!this.treasureWear) {
                        this.treasureWear = new TreasureWear();
                        this.treasureWear.parent = this;
                        this.treasureWear.initUiAtlas(this._roleRender.uiAtlas, this.winmidRender);
                    }
                    this.treasureWear.show();
                    break;

                default:
                    break;
            }
        }

        private hideTabPage($value: number = -1) {
            switch ($value) {
                case SharedDef.MODULE_DIVINE_ALL:
                    if (this.treasureWear) {
                        this.treasureWear.hide();
                    }
                    break;
                case SharedDef.MODULE_DIVINE_USE:
                    if (this.treasurePage) {
                        this.treasurePage.hide();
                    }
                    break;
                default:
                    if (this.treasurePage) {
                        this.treasurePage.hide();
                    }
                    if (this.treasureWear) {
                        this.treasureWear.hide();
                    }
                    break;
            }
        }


        public show($data:number): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selectedTab($data);
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    UIManager.popClikNameFun(this.w_close.name);
                    ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.HIDE_TREASURE_EVENT));
                    break;
                default:
                    break;
            }
        }
    }
}