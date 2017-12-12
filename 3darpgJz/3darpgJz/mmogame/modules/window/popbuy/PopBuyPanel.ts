module popbuy {

    export class PopBuyPanel extends WindowPopUi {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false

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

        private a_info2: UICompenent
        private a_res_icon: UICompenent;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.a_cancal = this.addEvntButUp("a_cancal", this._midRender);
            this.a_submit = this.addEvntButUp("a_submit", this._midRender);

            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.addChild(this._bottomRender.getComponent("a_tatol_label"));
            this.addChild(this._bottomRender.getComponent("a_num_bg1"));
            this.addChild(this._bottomRender.getComponent("a_num_bg0"));
            this.a_info_tittle = this.addChild(this._bottomRender.getComponent("a_info_tittle"));


            this.a_tittle = this.addChild(this._bottomRender.getComponent("a_tittle"));

            this.a_sub_but = this.addEvntButUp("a_sub_but", this._bottomRender)
            this.a_add_but = this.addEvntButUp("a_add_but", this._bottomRender)


            this.a_res_icon = this.addChild(this._topRender.getComponent("a_res_icon"));


            this.a_need_money = this.addChild(this._topRender.getComponent("a_need_money"));
            this.a_select_num = this.addChild(this._topRender.getComponent("a_select_num"));

            this.uiAtlasComplet = true

            this.a_info2 = this.addChild(this._topRender.getComponent("a_buildinfo"));

            this.applyLoadComplete();

        }
        private a_info_tittle: UICompenent
        private a_need_money: UICompenent;
        private a_select_num: UICompenent;


        private a_tittle: UICompenent;
        private a_sub_but: UICompenent;
        private a_add_but: UICompenent;

        private seletEvent: PopBuyEvent
        public refresh(value: PopBuyEvent): void {

            console.log(value)
            this.selectNum = 1;
            this.seletEvent = value;

            this.drawLabelNum()

        }

        private a_cancal: UICompenent;
        private a_submit: UICompenent;

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_sub_but:
                    this.toPrent();
                    break
                case this.a_add_but:
                    this.toNext();
                    break
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
            costRes([this.seletEvent.resoureItem[0][0], this._totalNum], () => {
                this.seletEvent.SubmitFun(this.selectNum);
            }, () => {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            });
            // if (this.isEnough) {
            //     this.hide();
            //     this.seletEvent.SubmitFun(this.selectNum);
            // } else {
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            // }
        }

        private _totalNum: number;
        private drawLabelNum(): void {
            var $max: number = this.seletEvent.cutNum;
            var $k: string = ColorType.Orange853d07 + this.seletEvent.Info1 + ColorType.colorce0a00 + $max + ColorType.Orange853d07 + "次";
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_info_tittle.skinName, $k, 18, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_info2.skinName, ColorType.Orange853d07 + this.seletEvent.Info2, 16, TextAlign.CENTER);
            this.selectNum = Math.max(0, this.selectNum);
            this.selectNum = Math.min($max, this.selectNum);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_select_num.skinName, ColorType.Orange853d07 + String(this.selectNum), 18, TextAlign.CENTER);
            var $totalNum: number = 0;
            for (var i: number = 0; i < this.selectNum; i++) {
                if (this.seletEvent.resoureItem.length > 1) {
                    var $kNum: number = this.seletEvent.resoureItem.length - $max;
                    $totalNum += this.seletEvent.resoureItem[i + $kNum][1];
                } else {
                    $totalNum += this.seletEvent.resoureItem[0][1];
                }
            }
            this._totalNum = $totalNum;
            var $resType: number = this.seletEvent.resoureItem[0][0];
            UiDraw.uiAtlasDrawImg(this._midRender.uiAtlas, this.a_res_icon.skinName, UIData.publicUi, UIuitl.getInstance().costtype($resType));
            var $hasNum: number = 0
            $hasNum = GuidData.player.getResType($resType);
            this.isEnough = $hasNum >= $totalNum;
            console.log($resType, $hasNum, "/", $totalNum);
            var $color: string = this.isEnough ? ColorType.Orange853d07 : ColorType.colorce0a00;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_need_money.skinName, $color + String($totalNum), 18, TextAlign.CENTER);
        }
        private isEnough = false
        private selectNum: number = 1
        private toPrent(): void {
            this.selectNum--
            this.drawLabelNum()
        }
        private toNext(): void {
            this.selectNum++
            this.drawLabelNum()
        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }
}