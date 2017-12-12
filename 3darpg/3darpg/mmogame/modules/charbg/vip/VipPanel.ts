module charbg {
    export class VipPanel extends WindowMinUi {

        private _bgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public _baseUiAtlas: UIAtlas;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this.setBlackBg();

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

        }
        public applyLoad(): void {
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/charbg/vip.xml", "ui/uidata/charbg/vip.png", () => { this.loadConfigCom() });
        }
        private uiAtlasComplet: boolean = false;

        //private charName: UICompenent;
        private vipNum: UICompenent;
        //private charTitle: UICompenent;




        private chongzhiLab1: UICompenent;
        private chongzhiLab2: UICompenent;
        private chongzhiLab3: UICompenent;
        private chongzhiProgre: UICompenent;
        private chongzhiExp: UICompenent;

        private giftTitle: UICompenent;
        private giftIconAry: Array<UICompenent>;
        private giftLab1: UICompenent;
        private giftLab2: UICompenent;
        private giftBtnLab: UICompenent;

        private infoLab1: UICompenent;
        private infoLab2: UICompenent;
        private infoTitle: UICompenent;
        private infoContent: UICompenent;

        private leftBtn: UICompenent;
        private rightBtn: UICompenent;
        private buyBtn: UICompenent;

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._midRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;


            this.addUIList(["t_title_bg", "t_main_bg"], this.winmidRender);

            this.addUIList(["t_bg1", "t_bg", "t_pro_bg", "t_vip_big", "t_win_title"], this._bgRender);
            this.addUIList(["t_yun1", "t_yun", "t_vip_min", "t_chongzhi_lab1"], this._midRender);
            this.addUIList(["t_lab_bg1", "t_lab_bg"], this._baseRender);

            var ui: UICompenent;
            this.leftBtn = this.addChild(this._bgRender.getComponent("t_arr1"));
            this.leftBtn.isU = true;
            this.leftBtn.addEventListener(InteractiveEvent.Up, this.leftclick, this);

            this.rightBtn = this.addChild(this._bgRender.getComponent("t_arr2"));
            this.rightBtn.addEventListener(InteractiveEvent.Up, this.rightclick, this);
            // ui.addEventListener(InteractiveEvent.Down, this.delread, this);

            this.vipNum = this.addChild(this._baseRender.getComponent("t_vip_big_num"));
            this.buyBtn = this._baseRender.getComponent("t_btn_bg");
            this.buyBtn.addEventListener(InteractiveEvent.Up, this.buyGift, this);

            this.chongzhiLab1 = this.addChild(this._midRender.getComponent("t_chongzhi_lab2"));
            this.chongzhiLab2 = this.addChild(this._midRender.getComponent("t_chongzhi_lab3"));
            this.chongzhiLab3 = this.addChild(this._midRender.getComponent("t_chongzhi_lab4"));
            this.chongzhiProgre = this.addChild(this._midRender.getComponent("t_pro"));
            this.chongzhiExp = this.addChild(this._baseRender.getComponent("t_chongzhi_pro"));

            this.giftTitle = this.addChild(this._midRender.getComponent("t_gift_title"));

            this.giftIconAry = new Array;
            for (var i: number = 0; i < 6; i++) {
                this.giftIconAry.push(this.addChild(this._baseRender.getComponent("t_icon" + i)));
            }

            this.giftLab1 = this.addChild(this._topRender.getComponent("t_gift_lab1"));
            this.giftLab2 = this.addChild(this._topRender.getComponent("t_gift_lab2"));
            this.giftBtnLab = this.addChild(this._topRender.getComponent("t_btn_lab"));

            this.infoLab1 = this.addChild(this._baseRender.getComponent("t_vip_min_num"));
            this.infoLab2 = this.addChild(this._baseRender.getComponent("t_vip_min_lab"));
            this.infoTitle = this.addChild(this._baseRender.getComponent("t_tq_title"));
            this.infoContent = this.addChild(this._baseRender.getComponent("t_tq_content"));
            // this.addChild(this.winmidRender.getComponent("t_bg"));
            // this.addUIList(["t_win_title", "t_title_bg"], this._bgRender);

            // 
            // ui = this.addChild(this._baseRender.getComponent("t_btn1"));
            // ui.addEventListener(InteractiveEvent.Down, this.delread, this);
            // ui = this.addChild(this._baseRender.getComponent("t_btn2"));
            // ui.addEventListener(InteractiveEvent.Down, this.getAll, this);

            // this.charName = this.addChild(this._baseRender.getComponent("t_name"));
            // this.charVip = this.addChild(this._baseRender.getComponent("t_vip"));
            // this.charTitle = this.addChild(this._baseRender.getComponent("t_title"));





            this.uiAtlasComplet = true;
            this.draw();
            this.applyLoadComplete();


        }

        private buyGift($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.buy_vipgift(this._currentShowVip);
        }
        private _currentShowVip: number = 0;
        private _currentVip: number = 0;
        private _maxVip: number = 0;
        public draw(): void {
            var vip: number = GuidData.player.getVipLevel();
            this._currentShowVip = vip;


            this.drawBaseVip();
            this.drawVipInfo(vip);
            this.setBtnVisible();
        }

        public redrawVipInfo(): void {
            this.drawVipInfo(this._currentShowVip);
        }

        public drawBaseVip(): void {
            var vip: number = GuidData.player.getVipLevel();
            this._currentVip = vip;

            var vipData: any = TableData.getInstance().getData(TableData.tb_vip_base, vip);
            var nextVipData: any = TableData.getInstance().getData(TableData.tb_vip_base, vip + 1);
            var czNum: number = GuidData.player.getChongZhiSum();
            this._maxVip = TableData.getInstance().getTabSize(TableData.tb_vip_base) - 1;
            this._maxVip = Math.min(vip + 8, this._maxVip);

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.chongzhiExp.skinName, czNum + "/" + nextVipData.chongzhi, 16, TextAlign.CENTER, ColorType.Whiteffffff);
            this.chongzhiProgre.uvScale = czNum / nextVipData.chongzhi;
            ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.vipNum.skinName, String(vip), ArtFont.num60);
            var needNum: number = nextVipData.chongzhi - czNum;
            var xoff: number = ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.chongzhiLab1.skinName, String(needNum), ArtFont.num59);
            this.chongzhiLab2.x = this.chongzhiLab2.baseRec.x + xoff;
            this.chongzhiLab3.x = this.chongzhiLab3.baseRec.x + xoff;
            ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.chongzhiLab3.skinName, String(vip + 1), ArtFont.num59);
        }

        private drawVipInfo(vip: number): void {
            var vipData: any = TableData.getInstance().getData(TableData.tb_vip_base, vip);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftTitle.skinName, "VIP" + vip + "特权礼包", 16, TextAlign.CENTER, ColorType.colorb96d49);
            for (var i: number = 0; i < this.giftIconAry.length; i++) {
                if (vipData.gift[i]) {
                    IconManager.getInstance().drawItemIcon60(this.giftIconAry[i], vipData.gift[i][0], vipData.gift[i][1]);
                } else {
                    IconManager.getInstance().drawItemIcon60(this.giftIconAry[i], 0, 1);
                }
            }

            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftLab1.skinName, "原价：" + vipData.fake_cost[0][1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawPrice(this.giftLab1,"原价：", vipData.fake_cost, true);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftLab2.skinName, "现价：" + vipData.cost[0][1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawPrice(this.giftLab2,"现价："  ,vipData.cost, false);

            if (GuidData.player.getVIPBuyGift(vip)) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftBtnLab.skinName, "已购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.removeChild(this.buyBtn);
            } else if (this._currentVip < vip) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftBtnLab.skinName, "VIP" + vip + "可购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.removeChild(this.buyBtn);
            } else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.giftBtnLab.skinName, "购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.addChild(this.buyBtn);
            }


            var xoff: number = ArtFont.getInstance().writeFontToSkinName(this._baseUiAtlas, this.infoLab1.skinName, String(vip), ArtFont.num58);
            this.infoLab2.x = this.infoLab2.baseRec.x + xoff;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.infoTitle.skinName, "【充" + vipData.chongzhi + "元可升级到该级VIP】", 16, TextAlign.CENTER, ColorType.colorb96d49);
            var desc: string = String(vipData.desc).replace(/\\n/g, "\n");
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.infoContent.skinName, desc, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        }

        private drawPrice($ui: UICompenent,str:string, $cost: any, $kill: boolean): void {
            var $rec: UIRectangle = this._baseUiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var xoff: number = 20;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.drawCost(ctx, xoff, 0, getresIdByreward($cost[0][0]));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, String($cost[0][1]), 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);

            if ($kill) {
                ctx.strokeStyle = "#cd2000";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(5, 17);
                ctx.lineTo(xoff + 5, 17);
                ctx.stroke();
                ctx.closePath();
            }

            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }





        private rightclick($e: InteractiveEvent): void {
            if (this._currentShowVip == this._maxVip) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($e.target);
            this._currentShowVip++;
            this.drawVipInfo(this._currentShowVip);
            this.setBtnVisible();
        }
        private leftclick($e: InteractiveEvent): void {
            if (this._currentShowVip == 0) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($e.target);
            this._currentShowVip--;
            this.drawVipInfo(this._currentShowVip);
            this.setBtnVisible();
        }

        public setBtnVisible(): void {

            if (this._currentShowVip <= 0) {
                this.removeChild(this.leftBtn);
            } else {
                this.addChild(this.leftBtn);
            }

            if (this._currentShowVip >= this._maxVip) {
                this.removeChild(this.rightBtn);
            } else {
                this.addChild(this.rightBtn);
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public show(): void {
            // this._data = spo;
            // this.draw(spo);
            this.draw();
            UIManager.getInstance().addUIContainer(this);
        }
    }
}