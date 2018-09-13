module mapnew {

    export class MapUiPanel extends UIPanel {
        private winbgRender: UIRenderComponent;
        protected winmidRender: UIRenderComponent;
        protected wintopRender: UIRenderComponent;
        private winBlackBgRender: UIRenderComponent;

        private _bgRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;

        public minimap: MiniMap;
        public worldmap: WorldMap;
        public dispose(): void {
            if (this.winbgRender) {
                this.winbgRender.uiAtlas = null;
                this.winbgRender.dispose();
            }
            if (this.winBlackBgRender) {
                this.winBlackBgRender.uiAtlas = null;
                this.winBlackBgRender.dispose();
            }

            if (this.winmidRender) {
                this.winmidRender.uiAtlas = null;
                this.winmidRender.dispose();
            }
            if (this.wintopRender) {
                this.wintopRender.uiAtlas = null;
                this.wintopRender.dispose();
            }

            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            if (this.minimap) {
                this.minimap.dispose();
                this.minimap = null;
            }
            if (this.worldmap) {
                this.worldmap.dispose();
                this.worldmap = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this.addWinUiPanel();

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)

            this._roleRender.uiAtlas = new UIAtlas;


        }

        private addWinUiPanel(): void {


            this.winbgRender = new UIRenderComponent;
            this.addRender(this.winbgRender);
            this.winmidRender = new UIRenderComponent;
            this.addRender(this.winmidRender);
            this.wintopRender = new UIRenderComponent;
            this.addRender(this.wintopRender);
        }

        private _blackBgUI: UICompenent;
        private addBlackBg(): void {
            this.winBlackBgRender = new UIRenderComponent;
            this.winBlackBgRender.uiAtlas = this._roleRender.uiAtlas;
            this.addRenderAt(this.winBlackBgRender, 0);
            this._blackBgUI = this.winBlackBgRender.getComponent("b_bg");
            this.addChild(this._blackBgUI);
            this._blackBgUI.addEventListener(InteractiveEvent.Down, v => { }, this);
            this._blackBgUI.addEventListener(InteractiveEvent.Up, v => { }, this);
        }

        public applyLoad(): void {
            this._roleRender.uiAtlas.setInfo("ui/uidata/mapnew/mapnew.xml", "ui/uidata/mapnew/mapnew.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._roleRender.uiAtlas;
            this.wintopRender.uiAtlas = this._roleRender.uiAtlas;
            this.winbgRender.uiAtlas = this._roleRender.uiAtlas;
            this.winComplete();
            this.initData();
            this.resize();
            this.applyLoadComplete();
        }

        protected e_close: UICompenent;
        private winComplete(): void {

            this.addChild(this.winbgRender.getComponent("b_basebg"));

            var b_titlebg1 = this.addChild(this._bgRender.getComponent("b_titlebg1"));
            b_titlebg1.isU = true;
            var b_verticalline1 = this.addChild(this.wintopRender.getComponent("b_verticalline1"));
            b_verticalline1.isU = true;
            this.addChild(this.winmidRender.getComponent("b_rightbg"));
            this.addChild(this._bgRender.getComponent("b_titlebg0"));
            this.addChild(this.wintopRender.getComponent("b_verticalline0"));

            this.addChild(this.wintopRender.getComponent("b_horizontalline"));
            this.e_close = this.addEvntButUp("b_closebtn", this._roleRender);

            this.addBlackBg();

        }

        private TabAry: Array<SelectButton>
        private initData(): void {
            //添加UI控件初始化

            this.addChild(this._bgRender.getComponent("a_title"));

            //this.winmidRender.applyObjData();
            this.TabAry = new Array
            for (var i = 0; i < 2; i++) {
                var a = <SelectButton>this.addEvntBut("tab" + i, this._roleRender);
                a.data = SharedDef.MODULE_MAP_REGION + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }

            this.addChild(this._roleRender.getComponent("b_line"));
        }

        private selecttype($value: number): void {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }

            if ($value == SharedDef.MODULE_MAP_REGION) {
                this.showTab1pnael();
            } else if ($value == SharedDef.MODULE_MAP_WORLD) {
                this.showTab0pnael();
            }
        }


        private click(evt: InteractiveEvent): void {

            UIManager.popClikNameFun(evt.target.name);
            this.selecttype(evt.target.data);
        }

        private showTab0pnael() {
            if (this.minimap) {
                this.minimap.hide();
            }

            if (!this.worldmap) {
                this.worldmap = new WorldMap();
                this.worldmap.initUiAtlas(this._roleRender.uiAtlas);
            }
            this.worldmap.show();
        }

        private showTab1pnael() {
            if (this.worldmap) {
                this.worldmap.hide();
            }
            if (!this.minimap) {
                this.minimap = new MiniMap();
                this.minimap.initUiAtlas(this._roleRender.uiAtlas, this.winmidRender.uiAtlas, this.winmidRender);
            }
            this.minimap.show();
        }


        private hidealltab() {
            if (this.minimap) {
                this.minimap.hide();
            }
            if (this.worldmap) {
                this.worldmap.hide();
            }
        }

        public refreshRes(): void {
            // if (this.resCopyTaskPanel && this.resCopyTaskPanel.hasStage) {
            //     this.resCopyTaskPanel.refreshRes();
            // }
        }

        public refreshTower(): void {
            // if (this.towerCopyTaskPanel && this.towerCopyTaskPanel.hasStage) {
            //     this.towerCopyTaskPanel.refreshSweep();
            // }
        }

        public resize(): void {
            if (this._blackBgUI) {
                this._blackBgUI.left = 0;
                this._blackBgUI.top = 0;
                this._blackBgUI.height = Scene_data.stageHeight / UIData.Scale;
                this._blackBgUI.width = Scene_data.stageWidth / UIData.Scale;
            }
            super.resize();
        }


        //只能默认选中第一个。如果需要设定选中哪个，则自己调整Tab顺序
        public show($selTab: number): void {
            UIManager.getInstance().addUIContainer(this);

            this.selecttype($selTab);
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.hidealltab();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new MapNewEvent(MapNewEvent.HIDE_MAP_FORM_MINI));
                    break;
                default:
                    break;
            }
        }
    }

}