module store {

    export class RechargePanel extends UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _top1Render: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._top1Render.dispose();
            this._top1Render = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            // this._bgRender = new UIRenderComponent;
            // this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._top1Render = new UIRenderComponent;
            this.addRender(this._top1Render)
        }

        public initUiAtlas($uiAtlas): void {
            // this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._top1Render.uiAtlas = $uiAtlas;
            this.initView();

        }

        private _b_btn_vip: UICompenent;
        // private _helpbtn: UICompenent;
        // private _refreshbtn: UICompenent;
        public currentviplev: UICompenent;
        public vipLevNum: UICompenent;
        public nextviplev: UICompenent;
        public probar: UICompenent;
        public c_numtxt: UICompenent;
        public aryLabel: Array<FrameCompenent>;
        public arygiftbg: Array<UICompenent>;
        public arygiftnum: Array<UICompenent>;
        private initView(): void {
            var renderLevel: UIRenderComponent = this._baseRender;

            this._b_btn_vip = this.addEvntButUp("b_btn_vip", this._topRender);
            // this._helpbtn = this.addEvntButUp("a_6", this._topRender);
            // this._refreshbtn = this.addEvntButUp("a_7", this._topRender);

            this.addUIList(["a_9"], this._baseRender);


            this.addChild(<UICompenent>this._bottomRender.getComponent("c_bg"));
            this.addChild(<UICompenent>this._bottomRender.getComponent("c_bg1"));
            this.addUIList(["a_3_1", "a_5_1", "a_4_1", "a_3_2", "a_5_2", "a_4_2", "c_huawen"], this._bottomRender);


            this.probar = this.addChild(<UICompenent>this._topRender.getComponent("a_10"));
            this.c_numtxt = this.addChild(<UICompenent>this._topRender.getComponent("c_numtxt"));

            this.currentviplev = this.addChild(<UICompenent>this._baseRender.getComponent("a_38111"));

            this.vipLevNum = this.addChild(<UICompenent>this._topRender.getComponent("a_54"));


            this.nextviplev = this.addChild(<UICompenent>this._topRender.getComponent("a_2"));

            var tabvo: Array<tb.TB_shop_chongzhi> = tb.TB_shop_chongzhi.getTB_shop_chongzhi();

            this.aryLabel = new Array
            this.arygiftbg = new Array
            this.arygiftnum = new Array
            for (var i = 0; i < tabvo.length; i++) {
                var a = this.addChild(<UICompenent>this._topRender.getComponent("a_" + (32 + i)));
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a.skinName, "¥" + tabvo[i].cost, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                var money: UICompenent = this.addEvntButUp("a_11_" + i, this._topRender);
                money.data = tabvo[i]

                var title = this.addChild(<UICompenent>this._topRender.getComponent("c_title" + i));

                var ui = this.addChild(<UICompenent>this._baseRender.getComponent("a_8_" + i));
                this.copyUI(ui, "a_8_" + i);

                var d_label = <FrameCompenent>this._top1Render.getComponent("d_label");
                d_label.x = title.x - 25
                d_label.y = title.y + 19
                this.aryLabel.push(d_label);
                var d_giftbg = this._top1Render.getComponent("d_giftbg");
                d_giftbg.x = title.x + 41
                d_giftbg.y = title.y + 75
                this.arygiftbg.push(d_giftbg);
                var d_giftnum = this._top1Render.getComponent("d_gift" + i);
                d_giftnum.x = title.x + 59
                d_giftnum.y = title.y + 97
                this.arygiftnum.push(d_giftnum);
            }

            this._baseRender.applyObjData();
            this.resize();
        }


        private copyUI($Ui: UICompenent, uikey: string) {
            var copyui: UICompenent = this.addChild(<UICompenent>this._baseRender.getComponent(uikey));
            copyui.isU = true
            copyui.x = $Ui.x - $Ui.width
        }

        public resetData(): void {
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.vipLevNum.skinName, String(GuidData.player.getVipLevel()), ArtFont.num58, TextAlign.LEFT);

            if (GuidData.player.getVipLevel() == 15) {
                this.probar.uvScale = 1;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_numtxt.skinName, "已满级", 12, TextAlign.CENTER, ColorType.color4b0808);
                this.drawNextVip(-1);
            } else {
                var $tabvo1: tb.TB_vip_base = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel() + 1);
                var $tabvo: tb.TB_vip_base = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel());
                var $rate = (GuidData.player.getChongZhiSum() - $tabvo.chongzhi) / ($tabvo1.chongzhi - $tabvo.chongzhi)
                this.probar.uvScale = $rate < 0 ? 0 : $rate
                var othermoney = $tabvo1.chongzhi - GuidData.player.getChongZhiSum();
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_numtxt.skinName, GuidData.player.getChongZhiSum() + "/" + $tabvo1.chongzhi, 12, TextAlign.CENTER, ColorType.color4b0808);
                this.drawNextVip(othermoney);
            }



            this.setUiListVisibleByItem(this.arygiftbg, true);
            this.setUiListVisibleByItem(this.arygiftnum, true);
            this.setUiListVisibleByItem(this.aryLabel, true);

            var tabvo: Array<tb.TB_shop_chongzhi> = tb.TB_shop_chongzhi.getTB_shop_chongzhi();
            for (let i = 0; i < tabvo.length; i++) {
                var flag: boolean = GuidData.player.getChongzhiState(tabvo[i].id);
                this.setUiListVisibleByItem([this.aryLabel[i]], tabvo[i].first_reward == 1 && !flag);
                this.setUiListVisibleByItem([this.arygiftnum[i]], flag && tabvo[i].non_first_extra_gold > 0);
                this.setUiListVisibleByItem([this.arygiftbg[i]], flag && tabvo[i].non_first_extra_gold > 0);
                if (flag) {
                    //充值过了
                    if (tabvo[i].non_first_extra_gold > 0) {
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.arygiftnum[i].skinName, String(tabvo[i].non_first_extra_gold), 14, TextAlign.CENTER, ColorType.colorffeeb5);
                    }
                } else {
                    this.aryLabel[i].goToAndStop(tabvo[i].rate - 2);
                }
            }

        }

        private drawNextVip(othermoney: number): void {
            var str: string
            if (othermoney == -1) {
                str = ColorType.Brown7a2f21 + "VIP等级已达上限"
            } else {
                var b: string = String(GuidData.player.getVipLevel() + 1);
                str = ColorType.Brown7a2f21 + "再充值" + ColorType.Green2ca937 + othermoney + ColorType.Brown7a2f21 + "元即可成为" + ColorType.colorff7200 + "VIP" + b;
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.nextviplev.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        public drawVip($uiatlas: UIAtlas, $key: string, $num: number, $tx: number = 0, $ty: number = 0): void {
            var $goldtxtrec: UIRectangle = $uiatlas.getRec($key);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($goldtxtrec.pixelWitdh, $goldtxtrec.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, PuiData.A_V, new Rectangle($tx, 0, 22, 19), UIData.publicUi);
            ArtFont.getInstance().writeFontToCtxLeft($ctx, String($num), ArtFont.BigYellow, $tx + 24, $ty);
            //推送至显卡
            $uiatlas.updateCtx($ctx, $goldtxtrec.pixelX, $goldtxtrec.pixelY);
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


        public resize(): void {
            super.resize();
        }


        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this._b_btn_vip:
                    ModulePageManager.openPanel(SharedDef.MODULE_VIP);
                    break;

                default:
                    console.log("=====充值金额====", evt.target.data);
                    GamePay.pay(evt.target.data.cost, 1, evt.target.data.yuanbao);
                    break;
            }
        }
    }
}