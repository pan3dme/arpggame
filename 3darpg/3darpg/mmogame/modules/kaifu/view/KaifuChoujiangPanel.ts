module kaifu {
    export class KaifuChoujiangPanel extends KaifuBaseContainer {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        private _winMidRender: UIRenderComponent;

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

            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);


            this.initUI();

        }
        private _bg: UICompenent;
        private _contentTxt: UICompenent;
        private _timeUI: UICompenent;
        private _cost1: UICompenent;
        private _cost2: UICompenent;

        private _slist: KaiFuChoujiangList;
        private initUI(): void {
            this._bg = this._winMidRender.getComponent("t_cj_bg");

            this.addChild(this._bgRender.getComponent("t_cj_bg1"));
            var ui: UICompenent;
            ui = this.addChild(this._bgRender.getComponent("t_cj_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.btn1Click, this);
            ui = this.addChild(this._bgRender.getComponent("t_cj_btn1"));
            ui.addEventListener(InteractiveEvent.Up, this.btn2Click, this);
            ui = this.addChild(this._baseRender.getComponent("t_cj_btn_lab1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "买一次", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_cj_btn_lab2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "买10次", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this._contentTxt = this.addChild(this._baseRender.getComponent("t_cj_content"));
            this._timeUI = this.addChild(this._baseRender.getComponent("t_cj_time"));
            ui = this.addChild(this._baseRender.getComponent("t_cj_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName,
                ColorType.Brown7a2f21 + "买" + ColorType.Green56da35 + "10" + ColorType.Brown7a2f21 + "次必得" + ColorType.colorb759ff + "紫色" + ColorType.Brown7a2f21 + "以上装备", 14)
            this._cost1 = this.addChild(this._baseRender.getComponent("t_cj_cost_lab1"));
            this._cost2 = this.addChild(this._baseRender.getComponent("t_cj_cost_lab2"));

            this._slist = new KaiFuChoujiangList();
            this._slist.init(this._baseUiAtlas, this._activeID);
            this.initEndTime();
            this._drawTimeFun = () => {
                this.drawTime();
            }
            this.draw();
        }

        private btn1Click($e: InteractiveEvent): void {
            if (this._canbuy1) {
                NetManager.getInstance().protocolos.draw_lottery(this._activeID, 1);
            } else {

            }
        }

        private btn2Click($e: InteractiveEvent): void {
            if (this._canbuy2) {
                NetManager.getInstance().protocolos.draw_lottery(this._activeID, 2);
            } else {

            }
        }


        //private _activeID: number = 2;
        private _activeEndTime: number;

        private _canbuy1: boolean;
        private _canbuy2: boolean;
        private initEndTime(): void {
            var tabObj: any = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            var startTime: number;
            if (tabObj.startTime == -1) {
                startTime = TimeUtil.getZeroTime(GameInstance.serverOpenTime);
            } else {
                startTime = tabObj.startTime;
            }
            this._activeEndTime = startTime + (tabObj.delayDays + tabObj.lastDays) * 24 * 60 * 60;

            var pm: number = tabObj.params;
            tabObj = TableData.getInstance().getData(TableData.tb_activity_lottery_base, pm);
            this._canbuy1 = UiDraw.drawRewardIconAndtxt(this._cost1, tabObj.costs[0], true, TextAlign.CENTER, 5);
            this._canbuy2 = UiDraw.drawRewardIconAndtxt(this._cost2, tabObj.costs[1], true, TextAlign.CENTER, 5);
        }

        public draw(): void {
            //this.drawTime();
            this.drawReward();
        }

        private _drawTimeFun: Function;
        public drawTime(): void {
            var lastTime: number = this._activeEndTime - GameInstance.getServerNow();
            //var day: number = float2int(lastTime / 24 / 60 / 60);
            var str: string = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "宝库将在" + ColorType.colorcd2000 + str + ColorType.Brown7a2f21 + "后关闭";
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 14);
        }
        public drawReward(): void {
            var tabObj: any = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            var ary: Array<string> = GuidData.globelValue.getLotteryRecord(tabObj.offset);
            console.log(ary.length);

            var resultStr: string = "";
            for (var i: number = 0; i < ary.length; i++) {
                var strAry: Array<string> = ary[i].split("#");
                var item: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(Number(strAry[1]))
                resultStr += ColorType.Brown7a2f21 + getBaseName(strAry[0]) + ColorType.colorb96d49 + " 获得 "
                    + getColorQua(item.quality) + item.name + "*" + strAry[2] + "\n";
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._contentTxt.skinName, resultStr, 16, TextAlign.LEFT);

        }


        public show(): void {
            //UIManager.getInstance().addUIContainer(this);
            super.show();
            this.addChild(this._bg);
            this.draw();
            this._slist.show();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
        }


        public hide(): void {
            //UIManager.getInstance().removeUIContainer(this);
            super.hide();
            this.removeChild(this._bg);
            this._slist.hide();
            TimeUtil.removeTimeTick(this._drawTimeFun);
        }


    }


    export class KaiFuChoujiangList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas, $activeID: number): void {
            this._activeID = $activeID;
            //KaifuChoujiangListItemRender.baseAtlas = $atlas;
            this.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = this.getDataAry();
            var w: number = 450;
            var h: number = 430;
            this.setData(ary, KaifuChoujiangListItemRender, w, h, 150, 150, 3, 512, 256, 3, 3);
            this.center = -35;
            this.middle = 25;
            this.setShowLevel(4);
        }
        private _activeID: number;
        public getDataAry(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var tabObj: any = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            var pm: number = tabObj.params;
            tabObj = TableData.getInstance().getData(TableData.tb_activity_lottery_base, pm);

            var resultAry: Array<any> = new Array;
            var randomAry: Array<number>;

            randomAry = this.getRandomAry(tabObj.low, 3);
            for (var i: number = 0; i < randomAry.length; i++) {
                var itemObj: any = TableData.getInstance().getData(TableData.tb_activity_lottery_low, randomAry[i]);
                resultAry.push(itemObj.item);
            }

            randomAry = this.getRandomAry(tabObj.middle, 3);
            for (var i: number = 0; i < randomAry.length; i++) {
                var itemObj: any = TableData.getInstance().getData(TableData.tb_activity_lottery_middle, randomAry[i]);
                resultAry.push(itemObj.item);
            }

            randomAry = this.getRandomAry(tabObj.high, 3);
            for (var i: number = 0; i < randomAry.length; i++) {
                var itemObj: any = TableData.getInstance().getData(TableData.tb_activity_lottery_high, randomAry[i]);
                resultAry.push(itemObj.item);
            }

            for (var i: number = 0; i < resultAry.length; i++) {
                var data: SListItemData = new SListItemData();
                data.data = resultAry[i];
                data.id = i;
                ary.push(data);
            }

            return ary;
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

    }

    export class KaifuChoujiangListItemRender extends SListItem {
        //public static baseAtlas: UIAtlas;
        private _icon: UICompenent;
        private _nameui: UICompenent;
        private _ibg: UICompenent;

        private _iconAry: Array<UICompenent>;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "k_s_bg", 0, 0, 133, 133, 10, 10);
            $container.addChild(this._ibg);

            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "k_s_icon", 30, 18, 68, 68);
            $container.addChild(this._icon);

            this._nameui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "k_s_lab", 17, 98, 100, 20);
            $container.addChild(this._nameui);


        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && $data.data) {
                this.applyRender();
            }
        }

        private applyRender(): void {

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.ITEMBIGBG);
            var item: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this.itdata.data[0][0]);
            IconManager.getInstance().drawItemIcon60(this._icon, this.itdata.data[0][0], this.itdata.data[0][1]);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, item.name, 16, TextAlign.CENTER, getColorQua(item.quality));

        }


    }
}