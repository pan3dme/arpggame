module kaifu {
    export class KaifuVIPRewardPanel extends KaifuBaseContainer {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        private _winMidRender: UIRenderComponent;
        private _banner: UIRenderOnlyPicComponent;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public setUIAtlas($uiatlas: UIAtlas, $winMidRender: UIRenderComponent): void {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;

            this._banner = new UIRenderOnlyPicComponent();
            this._banner.uiAtlas = $uiatlas;
            this.addRender(this._banner);

            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);

            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);

            this.initUI();

        }
        private _timeUI: UICompenent;

        //private _slist: KaiFuRewardList;
        private _baseTabObj: any;
        private _activeTabObj: any;
        private initUI(): void {
            this._baseTabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            this._activeTabObj = TableData.getInstance().getData(TableData.tb_activity_daily_gift_base, this._baseTabObj.params[0]);

            this.addChild(this._banner.getComponent("t_banner1"));
            this._banner.setImgUrl(getKaifuIconUrl("b1"));

            var ui: UICompenent;

            this._timeUI = this.addChild(this._baseRender.getComponent("t_vr_time"));
            //ui = this.addChild(this._baseRender.getComponent("t_lb_info"));
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "活动说明：" + this._activeTabObj.desc, 16, TextAlign.LEFT);

            this.addBg();
            this.addItems();

            this.initEndTime();
            this._drawTimeFun = () => {
                this.drawTime();
            }

        }

        private addBg(): void {
            var bgStr: Array<string> = ["t_vr_t0", "t_vr_t1", "t_vr_t2", "t_vr_y0", "t_vr_y1", "t_vr_y2", "t_vr_j0", "t_vr_j1", "t_vr_j2"]
            this.addUIList(bgStr, this._bgRender);
            for (var i: number = 0; i < bgStr.length; i++) {
                var sname: string = bgStr[i] + "c";
                var ui: UICompenent = this._bgRender.getComponent(sname);
                ui.isU = true;
                this.addChild(ui);
            }
        }
        private items: Array<KaifuVipRewardItem>;
        private addItems(): void {
            this.items = new Array;
            for (var i: number = 0; i < 3; i++) {
                var item: KaifuVipRewardItem = new KaifuVipRewardItem();
                item.create(this._baseRender, this._topRender, i, this);
                var tabObj: any = TableData.getInstance().getData(TableData.tb_activity_daily_gift, this._activeTabObj.gift_list[i]);
                item.drawBase(tabObj);
                this.items.push(item);
            }
        }

        public draw(): void {
            var pdata: Array<number> = GuidData.grow.getActivePlayerData(this._baseTabObj.category);
            for (var i: number = 0; i < this.items.length; i++) {
                this.items[i].drawBtn(pdata[i+1]==1);
            }
        }


        private _activeEndTime: number;

        private initEndTime(): void {
            var startTime: number;
            if (this._baseTabObj.startTime == -1) {
                startTime = TimeUtil.getZeroTime(GameInstance.serverOpenTime);
            } else {
                startTime = this._baseTabObj.startTime;
            }
            this._activeEndTime = startTime + (this._baseTabObj.delayDays + this._baseTabObj.lastDays) * 24 * 60 * 60;
        }



        private _drawTimeFun: Function;
        public drawTime(): void {
            var lastTime: number = this._activeEndTime - GameInstance.getServerNow();
            var str: string = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "剩余时间：" + ColorType.colorcd2000 + str;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 16, TextAlign.LEFT);
        }




        public show(): void {
            //UIManager.getInstance().addUIContainer(this);
            //super.show($activeID);
            super.show();
            //this.addChild(this._bg);
            this.draw();

            TimeUtil.addTimeTick(1000, this._drawTimeFun);
            //NetManager.getInstance().protocolos.activity_opt_get_rank_list(this._activeID);
        }


        public hide(): void {
            //UIManager.getInstance().removeUIContainer(this);
            super.hide();
            //this.removeChild(this._bg);
            TimeUtil.removeTimeTick(this._drawTimeFun);
        }

        public buyGift($id: number): void {
            NetManager.getInstance().protocolos.activity_opt_buy_dailygift(this._activeID, $id);
        }


    }

    export class KaifuVipRewardItem {
        public title: UICompenent;
        public vip: UICompenent;
        public icon: UICompenent;
        public cost1: UICompenent;
        public cost2: UICompenent;
        public btn: UICompenent;
        public btnLab: UICompenent;

        private root: KaifuVIPRewardPanel;
        private id: number;
        public create($render: UIRenderComponent, $topRender: UIRenderComponent, $id: number, $container: KaifuVIPRewardPanel): void {
            this.title = $container.addChild($render.getComponent("t_vr_title" + $id));
            this.vip = $container.addChild($render.getComponent("t_vr_vip" + $id));
            this.icon = $container.addChild($render.getComponent("t_vr_icon" + $id));
            this.cost1 = $container.addChild($render.getComponent("t_vr_co" + $id));
            this.cost2 = $container.addChild($render.getComponent("t_vr_po" + $id));
            this.btn = $render.getComponent("t_vr_btn" + $id);
            this.btnLab = $container.addChild($topRender.getComponent("t_vr_btnlab" + $id));
            this.btn.addEventListener(InteractiveEvent.Up, this.onclick, this);
            this.root = $container;
            this.id = $id;
        }

        private onclick($e: InteractiveEvent): void {
            if(this.minVip > GuidData.player.getVipLevel()){
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "VIP等级不够", 99);
                return;
            }
            this.root.buyGift(this.id);
        }
        public minVip:number;

        public drawBase(tabObj: any): void {
            var uiAtlas: UIAtlas = this.title.uiRender.uiAtlas;
            LabelTextFont.writeSingleLabel(uiAtlas, this.title.skinName, tabObj.title, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(uiAtlas, this.vip.skinName, "VIP" + tabObj.vip + "可购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.minVip = tabObj.vip;
            IconManager.getInstance().drawItemIcon60(this.icon, tabObj.item[0][0], tabObj.item[0][1]);

            this.drawKillPrice(this.cost1, "原价：", tabObj.fake_cost, true);
            this.drawKillPrice(this.cost2, "现价：", tabObj.cost, false);
        }

        public drawBtn($hasBuy: boolean): void {
            if ($hasBuy) {
                this.root.removeChild(this.btn);
                LabelTextFont.writeSingleLabel(this.btnLab.uiRender.uiAtlas, this.btnLab.skinName, "已购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            } else {
                this.root.addChild(this.btn);
                LabelTextFont.writeSingleLabel(this.btnLab.uiRender.uiAtlas, this.btnLab.skinName, "购买", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        }

        public drawKillPrice($ui: UICompenent, str: string, $cost: any, $kill: boolean): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);

            var xoff: number = 20;
            var yoff: number = 3;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, xoff, yoff, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.drawCost(ctx, xoff, yoff - 10, getresIdByreward($cost[0][0]));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, String($cost[0][1]), 16, xoff, yoff, TextAlign.LEFT, ColorType.Brown7a2f21);

            if ($kill) {
                ctx.strokeStyle = "#cd2000";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(10, 10);
                ctx.lineTo(xoff + 5, 10 + yoff);
                ctx.stroke();
                ctx.closePath();
            }

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

    }



}