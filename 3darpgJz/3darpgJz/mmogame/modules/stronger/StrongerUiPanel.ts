module stronger {

    export class StrongerUiPanel extends WindowUi {
        private _publicbgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            // this._publicbgRender.dispose();
            // this._publicbgRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this.strongerTabList) {
                this.strongerTabList.dispose();
                this.strongerTabList = null;
            }
            if (this.strongerList) {
                this.strongerList.dispose();
                this.strongerList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            // this._baseRender.setInfo("ui/uidata/ranking/ranking.xml", "ui/uidata/ranking/ranking.png", () => { this.loadConfigCom() });
            GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
                this._publicbgRender.uiAtlas = $publicbgUiAtlas;
                this._baseRender.uiAtlas.setInfo("ui/uidata/stronger/stronger.xml", "ui/uidata/stronger/stronger.png", () => { this.loadConfigCom() }, "ui/uidata/stronger/strongerpc.png");
            });
        }


        public listindex0: UICompenent;
        public listindex1: UICompenent;
        public curlev: UICompenent;
        public goodzhanli: UICompenent;
        public curzhanli: UICompenent;
        private a_zhanli_numAry: Array<FrameCompenent>
        private loadConfigCom(): void {
            this._topRender.uiAtlas = this._baseRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._baseRender;

            this.listindex0 = this.addChild(<UICompenent>renderLevel.getComponent("listindex0"));
            this.listindex1 = this.addChild(<UICompenent>renderLevel.getComponent("listindex1"));

            this.addUIList(["a_4", "a_3", "a_2"], this._topRender);
            this.addUIList(["a_bg0", "a_bg1", "line_s", "line1", "a_title"], this._baseRender);


            this.curlev = this.addChild(<UICompenent>this._topRender.getComponent("a_7"));
            this.curzhanli = this.addChild(<UICompenent>this._topRender.getComponent("a_5"));
            this.goodzhanli = this.addChild(<UICompenent>this._topRender.getComponent("a_6"));

            this.a_zhanli_numAry = new Array
            for (var i = 0; i < 5; i++) {
                this.a_zhanli_numAry.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_zhanli_num" + i)));
            }

            var bg = this.addChild(this._publicbgRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "c_coffeeBg", renderLevel);
            this._publicbgRender.applyObjData();

            this.applyLoadComplete();
        }

        public strongerTabList: StrongerTabList;
        public strongerList: StrongerList;
        public show($type: number = 0): void {
            if (!$type) {
                $type = 0
            }
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            if (!this.strongerTabList) {
                this.strongerTabList = new StrongerTabList();
                this.strongerTabList.init(this._baseRender.uiAtlas);
            }
            this.strongerTabList.show($type);

            this.fresh();
            this.resize();
        }

        private fresh(): void {
            var curlev: number = GuidData.player.getLevel();
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curlev.skinName, String(curlev), 16, TextAlign.RIGHT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curzhanli.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            var tabvo: tb.TB_bianqiang_value = tb.TB_bianqiang_value.get_TB_bianqiang_valueById(curlev);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.goodzhanli.skinName, Snum(tabvo.value), 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            var lev:number = StrongerUitl.getGrade(Math.floor(GuidData.player.getForce()), tabvo.value);
            for (var i = 0; i < 5; i++) {
                var selx: number = lev >= i ? 0 : 1;
                this.a_zhanli_numAry[i].goToAndStop(selx);
            }
        }

        public showStrongerList($index: number): void {
            if (!this.strongerList) {
                this.strongerList = new StrongerList();
                this.strongerList.init(this._baseRender.uiAtlas);
            }
            this.strongerList.show($index);
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.strongerTabList) {
                this.strongerTabList.hide();
            }
            if (this.strongerList) {
                this.strongerList.hide();
            }
            ModulePageManager.hideResTittle();
        }


        public resize(): void {
            // this.b_bg1_1.top = 53
            // // this.b_bg1_1.y = 0;
            // this.b_bg1_1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1_1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
            if (this.strongerTabList) {
                this.strongerTabList.left = this.listindex0.parent.x / UIData.Scale + this.listindex0.x
                this.strongerTabList.top = this.listindex0.parent.y / UIData.Scale + this.listindex0.y
            }
            if (this.strongerList) {
                this.strongerList.left = this.listindex1.parent.x / UIData.Scale + this.listindex1.x
                this.strongerList.top = this.listindex1.parent.y / UIData.Scale + this.listindex1.y
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.HIDE_Stronger_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}