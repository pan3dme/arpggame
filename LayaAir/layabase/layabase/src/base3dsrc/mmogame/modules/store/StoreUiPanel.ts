module store {

    export class StoreUiPanel extends UIPanel {
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _baImg: UIBackImg;

        public dispose(): void {
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if(this.shopMallPanel){
                this.shopMallPanel.dispose();
                this.shopMallPanel = null;
            }
            this.rechargePanel.dispose();
            this.rechargePanel = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baImg = new UIBackImg();
            this._baImg.alpha = 0.5;
            this._baImg.setFbo();
            this.addRender(this._baImg);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public onAdd(): void {
            super.onAdd();
            SceneManager.getInstance().updateFBO();
        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/store/store.xml", "ui/uidata/store/store.png", () => { this.loadConfigCom() }, "ui/uidata/store/storepc.png");
        }


        public tab_yuanbao: SelectButton;
        public tab_duihuan: SelectButton;
        public tab_money: SelectButton;
        private b_close: UICompenent;
        private b_bgleft: UICompenent;
        private Slistindex: UICompenent;
        public shopMallPanel: ShopMallPanelTabList;
        public rechargePanel: RechargePanel;
        private loadConfigCom(): void {

            this._topRender.uiAtlas = this._baseRender.uiAtlas

            var renderLevel: UIRenderComponent = this._baseRender;

            this.Slistindex = this.addChild(<UICompenent>this._topRender.getComponent("slistindex"));
            this.addChild(<UICompenent>renderLevel.getComponent("b_bg"));
            this.addChild(<UICompenent>renderLevel.getComponent("b_bgborrow"));


            var bg_2: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("bg_2"));
            var bg_21: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("bg_2"));
            bg_21.isU = true
            bg_21.x = 912

            var bg_1: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("bg_1"));
            var bg_1_1: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("bg_1"));
            bg_1_1.isU = true
            bg_1_1.x = bg_1.x + 477

            this.addChild(<UICompenent>renderLevel.getComponent("bg_title"));

            var b_titleribbon: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("b_titleribbon"));
            var b_titleribbon1: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("b_titleribbon"));
            b_titleribbon1.isU = true
            b_titleribbon1.x = 560

            var bg_3: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("bg_3"));
            var bg_31: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("bg_3"));
            bg_31.isU = true
            bg_31.x = 901

            var b_bgribbon: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("b_bgribbon"));
            var b_bgribbon1: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("b_bgribbon"));
            b_bgribbon1.isU = true
            b_bgribbon1.x = 910

            this.addChild(<UICompenent>renderLevel.getComponent("b_bghuawen3"));
            this.addChild(<UICompenent>renderLevel.getComponent("b_bghuwen1"));
            this.addChild(<UICompenent>renderLevel.getComponent("b_bghuawen2"));
            this.addChild(<UICompenent>renderLevel.getComponent("b_bg_bottomline"));

            this.tab_yuanbao = <SelectButton>this.addEvntBut("tab_0", this._topRender);
            this.tab_duihuan = <SelectButton>this.addEvntBut("tab_1", this._topRender);
            this.tab_money = <SelectButton>this.addEvntBut("tab_2", this._topRender);
            this.addChild(<UICompenent>this._topRender.getComponent("b_rightline"));

            this.b_bgleft = <UICompenent>this._topRender.getComponent("b_bgleft");

            this.b_close = this.addEvntButUp("b_close", this._topRender);

            this.applyLoadComplete();

            this.resize();
        }

        public shop: Shop;
        private selecttype($value: Array<number>): void {
            if (!$value) {
                $value = [SharedDef.MODULE_MALL_GOLD]
            }

            if (!this.shop) {
                this.shop = new Shop();
                this.shop.initUiAtlas(this._baseRender.uiAtlas);
            }
            if (!this.shopMallPanel) {
                this.shopMallPanel = new ShopMallPanelTabList();
                this.shopMallPanel.init(this._baseRender.uiAtlas);
            }
            if (!this.rechargePanel) {
                this.rechargePanel = new RechargePanel();
                this.rechargePanel.initUiAtlas(this._baseRender.uiAtlas);
            }

            this.setUiListVisibleByItem([this.b_bgleft],$value[0] != SharedDef.MODULE_MALL_RECHARGE);
            if ($value[0] == SharedDef.MODULE_MALL_GOLD) {
                this.tab_yuanbao.selected = true;
                this.tab_duihuan.selected = false;
                this.tab_money.selected = false;
                this.shopMallPanel.show($value);
                this.rechargePanel.hide();
            } else if ($value[0] == SharedDef.MODULE_MALL_SCORE) {
                this.tab_duihuan.selected = true;
                this.tab_yuanbao.selected = false;
                this.tab_money.selected = false;
                this.shopMallPanel.show($value);
                this.rechargePanel.hide();
            } else {
                this.tab_money.selected = true;
                this.tab_yuanbao.selected = false;
                this.tab_duihuan.selected = false;
                this.rechargePanel.show();
                this.shopMallPanel.hide();
                this.shop.hide();
            }

        }


        public show($type: Array<number>): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype($type);
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.shopMallPanel) {
                this.shopMallPanel.hide();
            }
            if (this.rechargePanel) {
                this.rechargePanel.hide();
            }
            if (this.shop) {
                this.shop.hide();
            }
            ModulePageManager.hideResTittle();
        }


        public resize(): void {
            super.resize();
            if (this.shopMallPanel) {
                this.shopMallPanel.left = this.Slistindex.parent.x / UIData.Scale + this.Slistindex.x
                this.shopMallPanel.top = this.Slistindex.parent.y / UIData.Scale + this.Slistindex.y
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.tab_yuanbao:
                    this.selecttype([SharedDef.MODULE_MALL_GOLD]);
                    break
                case this.tab_duihuan:
                    this.selecttype([SharedDef.MODULE_MALL_SCORE]);
                    break
                case this.tab_money:
                    this.selecttype([SharedDef.MODULE_MALL_RECHARGE]);
                    break
                case this.b_close:
                    ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.HIDE_Store_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}