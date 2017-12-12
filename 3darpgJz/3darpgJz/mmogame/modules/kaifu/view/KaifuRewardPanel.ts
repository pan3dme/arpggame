module kaifu {
    export class KaifuRewardPanel extends KaifuBaseContainer {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
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


            this.initUI();

        }
        private _timeUI: UICompenent;

        private _slist: KaiFuRewardList;
        private _baseTabObj: any;
        private _activeTabObj: any;
        private initUI(): void {
            this._baseTabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            this._activeTabObj = TableData.getInstance().getData(TableData.tb_activity_limit_gift_base, this._baseTabObj.params[0]);

            this.addChild(this._banner.getComponent("t_banner"));
            this._banner.setImgUrl(getKaifuIconUrl("b0"));

            var ui: UICompenent;

            this._timeUI = this.addChild(this._baseRender.getComponent("t_lb_time"));
            ui = this.addChild(this._baseRender.getComponent("t_lb_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "活动说明：" + this._activeTabObj.desc, 16, TextAlign.LEFT);



            this._slist = new KaiFuRewardList();
            this._slist.init(this._baseUiAtlas, this._activeTabObj, this._activeID, this._baseTabObj.category);
            this.initEndTime();
            this._drawTimeFun = () => {
                this.drawTime();
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

        public refresh(): void {
            if(this._slist){
                this._slist.reGetData();
            }
        }


        public show(): void {
            //UIManager.getInstance().addUIContainer(this);
            //super.show($activeID);
            super.show();
            //this.addChild(this._bg);
            //this.draw();
            this._slist.show();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
            NetManager.getInstance().protocolos.activity_opt_get_rank_list(this._activeID);
        }


        public hide(): void {
            //UIManager.getInstance().removeUIContainer(this);
            super.hide();
            //this.removeChild(this._bg);
            this._slist.hide();
            TimeUtil.removeTimeTick(this._drawTimeFun);
        }


    }


    export class KaiFuRewardList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas, $activeTabObj: any, $activeTabID: number, $dataOffset: number): void {
            this._activeTabObj = $activeTabObj;
            this.baseAtlas = $atlas;
            this._activeTabID = $activeTabID;
            this._dataOffset = $dataOffset;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = this.getDataAry();
            var w: number = 695;
            var h: number = 300;
            this.setData(ary, KaiFuRewardListItemRender, w, h, 692, 128, 2, 512, 512, 1, 3, 1);
            this.center = 80;
            this.middle = 80;
            this.setShowLevel(4);
        }
        private _activeTabObj: any;
        private _activeTabID: number;
        private _dataOffset: number;
        public getDataAry(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var pdata: Array<number> = GuidData.grow.getActivePlayerData(this._dataOffset);
            for (var i: number = 0; i < 3; i++) {
                var data: SListItemData = new SListItemData();
                var gift: number = this._activeTabObj.gift_list[i];
                var vo: KaiFuRewardItemVo = new KaiFuRewardItemVo();
                vo.tabObj = TableData.getInstance().getData(TableData.tb_activity_limit_gift, gift);
                vo.hasBuy = getBit(pdata[1], i);
                data.data = vo;
                data.id = i;
                ary.push(data);
            }

            return ary;
        }

        public reGetData(): void {
            var pdata: Array<number> = GuidData.grow.getActivePlayerData(this._dataOffset);
            for (var i: number = 0; i < this._dataAry.length; i++) {
                this._dataAry[i].data.hasBuy = getBit(pdata[1], i);
            }
            this.refreshDraw();
        }

        public getRandomAry($src: Array<number>, $num: number): Array<number> {
            var desAry: Array<number> = [].concat($src);
            desAry.sort(function (a, b) { return Math.random() > .5 ? -1 : 1; });
            desAry.length = $num;
            return desAry;
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
        public buyGift($idx: number): void {
            NetManager.getInstance().protocolos.activity_opt_buy_limitgift(this._activeTabID, $idx);
        }

    }

    export class KaiFuRewardItemVo {
        public tabObj: any;
        public hasBuy: boolean;
    }

    export class KaiFuRewardListItemRender extends SListItem {
        //public static baseAtlas: UIAtlas;
        private _ibg: UICompenent;
        private _icon: UICompenent;

        private _lab1: UICompenent;
        private _lab2: UICompenent;
        private _lab3: UICompenent;

        private _cost1: UICompenent;
        private _cost2: UICompenent;

        private _btn: UICompenent;


        private _iconAry: Array<UICompenent> = new Array;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "l_s_bg", 0, 0, 692, 128, 10, 10);
            $container.addChild(this._ibg);

            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_id", 4, 2, 504, 33);
            $container.addChild(this._icon);

            this._lab1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_lab1", 271, 53, 150, 20);
            $container.addChild(this._lab1);

            this._lab2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_lab2", 337, 87, 80, 20);
            $container.addChild(this._lab2);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab2.skinName, "战力暴涨", 16, TextAlign.RIGHT, ColorType.Brown7a2f21);

            this._lab3 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_lab3", 418, 85, 90, 25);
            $container.addChild(this._lab3);

            this._cost1 = this.creatSUI($customizeRenderAry[0], this.parentTarget.baseAtlas, "l_s_cost0", 361, 2, 160, 30);
            $container.addChild(this._cost1);

            this._cost2 = this.creatSUI($customizeRenderAry[0], this.parentTarget.baseAtlas, "l_s_cost1", 522, 2, 160, 30);
            $container.addChild(this._cost2);

            this._btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_btn", 520, 42, 157, 60);
            $container.addChild(this._btn);
            this._btn.addEventListener(InteractiveEvent.Up, this.onclick, this);

            for (var i: number = 0; i < 3; i++) {
                var ui: UICompenent = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "l_s_icon" + i, 28 + i * 76, 45, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }

        }

        private onclick($e: InteractiveEvent): void {
            if (!this.itdata.data.hasBuy) {
                (<KaiFuRewardList>this.parentTarget).buyGift(this.itdata.id);
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && $data.data) {
                this.applyRender();
            }
        }

        public refreshDraw():void{
            this.drawBuy();
        }

        private applyRender(): void {

            //var vo: KaiFuDayTargetItemVo = this.itdata.data;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.ITEMBIGBG);

            UiDraw.drawUseImg(this._icon, this.parentTarget.baseAtlas, "u_l_t" + this.itdata.id);
            var tabObj: any = this.itdata.data.tabObj;


            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab1.skinName, tabObj.desc, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab3.skinName, tabObj.force, 20, TextAlign.LEFT, ColorType.Green2ca937);

            for (var i: number = 0; i < this._iconAry.length; i++) {
                if (tabObj.item[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], tabObj.item[i][0], tabObj.item[i][1]);
                } else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 0);
                }
            }

            this.drawKillPrice(this._cost1, "原价：", tabObj.fake_cost, true);
            this.drawKillPrice(this._cost2, "现价：", tabObj.cost, false);

            this.drawBuy();

        }

        public drawBuy():void{
            if (this.itdata.data.hasBuy) {
                UiDraw.drawUseImg(this._btn, this.parentTarget.baseAtlas, "u_l_btn2");
            } else {
                UiDraw.drawUseImg(this._btn, this.parentTarget.baseAtlas, "u_l_btn1");
            }
        }

        public drawKillPrice($ui: UICompenent, str: string, $cost: any, $kill: boolean): void {
            var $rec: UIRectangle = this.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            //UiDraw.drawUseImg(this._btn, KaiFuRewardListItemRender.baseAtlas, "u_l_btn1");
            var useRec: any = this.parentTarget.baseAtlas.getRec("u_l_cost");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, useRec.pixelX, useRec.pixelY, useRec.pixelWitdh, useRec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);

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

            this.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }




    }
}