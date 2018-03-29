module popbuy {

    export class PopVipBuyPanel extends WindowPopUi {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/window/popbuy/popbuy.xml", "ui/uidata/window/popbuy/popbuy.png", () => { this.loadConfigCom() });
        }

        private a_bg: UICompenent

        private a_close: UICompenent
        private setSizeForPanelUi($ui: UICompenent, $uiName: string): void {
            var temp: UICompenent = this._midRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        }

        private b_curnum: UICompenent
        private b_nextnum: UICompenent
        private b_info: UICompenent
        private b_viptxt1: UICompenent
        private b_viptxt0: UICompenent
        private NextVipAry: Array<UICompenent>
        private CurVipAry: Array<UICompenent>
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.a_cancal = this.addEvntButUp("b_cancal", this._midRender);
            this.a_submit = this.addEvntButUp("b_submit", this._midRender);

            this.a_tittle = this.addChild(this._bottomRender.getComponent("b_tittle"));

            // this.addUIList([""], this._bottomRender);
            this.addChild(this._bottomRender.getComponent("b_txt0"));

            this.b_curnum = this.addChild(this._midRender.getComponent("b_curnum"));
            this.b_nextnum = this._midRender.getComponent("b_nextnum");
            this.b_info = this.addChild(this._midRender.getComponent("b_info"));

            this.b_viptxt1 = this._midRender.getComponent("b_viptxt1");
            this.b_viptxt0 = this.addChild(this._midRender.getComponent("b_viptxt0"));

            this.CurVipAry = new Array
            this.CurVipAry.push(this.addChild(this._bottomRender.getComponent("b_bg0")));
            this.CurVipAry.push(this.addChild(this._midRender.getComponent("b_vip0")));
            this.CurVipAry.push(this.addChild(this._midRender.getComponent("b_txt1")));

            this.NextVipAry = new Array
            this.NextVipAry.push(this._bottomRender.getComponent("b_bg1"));
            this.NextVipAry.push(this._midRender.getComponent("b_vip1"));
            this.NextVipAry.push(this._bottomRender.getComponent("b_arrow"));
            this.NextVipAry.push(this.b_viptxt1);
            this.NextVipAry.push(this.b_nextnum);

            this.applyLoadComplete();

        }


        private a_tittle: UICompenent;

        private seletEvent: PopBuyEvent
        public refresh(value: PopBuyEvent): void {

            //console.log(value)
            this.seletEvent = value;
            this.selectNum = 1;

            var info: string = ColorType.Brownd662c0d + "是否使用" + ColorType.Green2ca937 + this.seletEvent.resoureItem[0][1] + ColorType.Brownd662c0d + getResName(this.seletEvent.resoureItem[0][0]) + "购买" + ColorType.Green2ca937 + "1" + ColorType.Brownd662c0d + "次此副本次数"
            var curnum: string = ColorType.Brownd662c0d + "今日还可购买" + ColorType.Green2ca937 + this.seletEvent.cutNum + ColorType.Brownd662c0d + "次"

            var $obj: any = this.seletEvent.data;
            if ($obj) {
                this.setUiListVisibleByItem(this.NextVipAry, true);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_nextnum.skinName, this.seletEvent.Info1, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.b_viptxt1.skinName, String($obj["id"]), ArtFont.num58, TextAlign.LEFT);
            } else {
                //达到上限
                this.setUiListVisibleByItem(this.NextVipAry, false);
                this.CurVipAry[0].x = 411
                this.CurVipAry[1].x = this.CurVipAry[0].x + 25
                this.CurVipAry[2].x = this.CurVipAry[0].x + 47
                this.b_viptxt0.x = this.CurVipAry[0].x + 82
                this.b_curnum.x = this.CurVipAry[0].x - 4
            }


            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.b_viptxt0.skinName, String(GuidData.player.getVipLevel()), ArtFont.num58, TextAlign.LEFT);
            
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_curnum.skinName, curnum, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_info.skinName, info, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        private a_cancal: UICompenent;
        private a_submit: UICompenent;

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_submit:
                    this.sendSelectNum();
                    break
                case this.a_cancal:
                case this.f_close:
                    this.hide()
                    break
                default:
                    break
            }

        }
        private sendSelectNum(): void {
            costRes([this.seletEvent.resoureItem[0][0], this.selectNum], () => {
                this.seletEvent.SubmitFun(this.selectNum);
            }, () => {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            });
        }

        private _totalNum: number;
        private selectNum: number;

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }
}