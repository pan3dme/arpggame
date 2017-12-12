module kaifu {
    export class KaifuDayTargetPanel extends KaifuBaseContainer {
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
        private _bg: UICompenent;
        //private _contentTxt: UICompenent;
        private _timeUI: UICompenent;
        private _targetLab1: UICompenent;
        private _targetVal1: UICompenent;
        private _myLab1: UICompenent;
        private _rewardIcon0: UICompenent;
        private _rewardIcon1: UICompenent;
        private _btnLab: UICompenent;

        private _slist: KaiFuDayTargetList;
        private _baseTabObj: any;
        private _activeTabObj: any;
        private initUI(): void {
            this._baseTabObj = TableData.getInstance().getData(TableData.tb_activity_time, this._activeID);
            this._activeTabObj = TableData.getInstance().getData(TableData.tb_activity_rank_base, this._baseTabObj.params[0]);

            this.addChild(this._banner.getComponent("t_banner"));

            this._banner.setImgUrl(getKaifuIconUrl("b0"));

            this._bg = this._winMidRender.getComponent("t_qt_bg2");

            this.addChild(this._bgRender.getComponent("t_title_bg"))
            var ui: UICompenent;
            ui = this.addChild(this._bgRender.getComponent("t_base_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.btn1Click, this);
            this._btnLab = this.addChild(this._baseRender.getComponent("t_qt_lab5"));
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "领取奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_qt_lab4"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "我的进度", 14, TextAlign.CENTER, ColorType.colorb96d49);

            //this._contentTxt = this.addChild(this._baseRender.getComponent("t_cj_content"));
            this._timeUI = this.addChild(this._baseRender.getComponent("t_qt_time"));
            ui = this.addChild(this._baseRender.getComponent("t_qt_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "活动说明：" + this._activeTabObj.desc, 16, TextAlign.LEFT);

            this._targetLab1 = this.addChild(this._baseRender.getComponent("t_qt_lab1"));
            this._targetVal1 = this.addChild(this._baseRender.getComponent("t_qt_lab2"));
            this._myLab1 = this.addChild(this._baseRender.getComponent("t_qt_lab3"));

            this._rewardIcon0 = this.addChild(this._baseRender.getComponent("t_qt_icon1"));
            this._rewardIcon1 = this.addChild(this._baseRender.getComponent("t_qt_icon2"));

            this._slist = new KaiFuDayTargetList();
            this._slist.init(this._baseUiAtlas, this._activeID);
            this.initEndTime();
            this._drawTimeFun = () => {
                this.drawTime();
            }
            // this.draw();
        }

        private btn1Click($e: InteractiveEvent): void {
            if (this.canGet) {
                NetManager.getInstance().protocolos.activity_opt_get_rank_process_reward(this._activeID, this.processRewardID);
            }

        }

        private btn2Click($e: InteractiveEvent): void {
            NetManager.getInstance().protocolos.draw_lottery(this._activeID, 2);
        }


        //private _activeID: number = 2;
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

        public draw(): void {
            //this.drawTime();
            this.drawReward();
        }

        private _drawTimeFun: Function;
        public drawTime(): void {
            var lastTime: number = this._activeEndTime - GameInstance.getServerNow();
            var str: string = TimeUtil.getDiffTime1(lastTime);
            str = ColorType.Brown7a2f21 + "剩余时间：" + ColorType.colorcd2000 + str;
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeUI.skinName, str, 16, TextAlign.LEFT);
        }
        public canGet: boolean = false;
        public processRewardID: number;
        public drawReward(): void {

            var dataAry: Array<number> = GuidData.grow.getActivePlayerData(this._baseTabObj.category);
            var maxLev: boolean = false;
            if (dataAry[2] > 5) {
                dataAry[2] = 5;
                maxLev = true;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._targetLab1.skinName, "达到目标(" + (dataAry[2] + 1) + "/6)", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            var targetNum: number = this._activeTabObj.process[dataAry[2]];
            var dataStr: string;
            dataStr = this.getDataStr(this._activeTabObj.type, targetNum);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._targetVal1.skinName,
                ColorType.colorb96d49 + this._activeTabObj.title + ":" + ColorType.Brown7a2f21 + dataStr, 16, TextAlign.CENTER);

            var rewardObj: any = TableData.getInstance().getData(TableData.tb_activity_rank_process_reward, this._activeTabObj.process_reward[dataAry[2]]);
            if (rewardObj.item[0]) {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon0, rewardObj.item[0][0], rewardObj.item[0][1]);
            } else {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon0, 0, 0);
            }

            if (rewardObj.item[1]) {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon1, rewardObj.item[1][0], rewardObj.item[1][1]);
            } else {
                IconManager.getInstance().drawItemIcon60(this._rewardIcon1, 0, 0);
            }

            dataStr = this.getDataStr(this._activeTabObj.type, dataAry[1]);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myLab1.skinName,
                ColorType.colorb96d49 + this._activeTabObj.title + ":" + ColorType.Brown7a2f21 + dataStr, 16, TextAlign.CENTER);

            this.processRewardID = dataAry[2] + 1;
            if (dataAry[1] >= targetNum) {
                if (maxLev) {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "已领取", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    this.canGet = false;
                } else {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "领取奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    this.canGet = true;
                }

            } else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._btnLab.skinName, "未达到", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.canGet = false;
            }

        }

        public setListData(saosrl: s2c_activity_opt_show_rank_list): void {
            //console.log(saosrl);
            if (saosrl.act_id != this._activeID) {
                return;
            }
            var ary: Array<SListItemData> = new Array<SListItemData>();

            for (var i: number = 0; i < 3; i++) {
                var data: SListItemData = new SListItemData();
                if (saosrl.list[i]) {
                    var vo: KaiFuDayTargetItemVo = new KaiFuDayTargetItemVo();
                    vo.name = saosrl.list[i].name;
                    vo.value = saosrl.list[i].value;
                    vo.dataStr = [this._activeTabObj.title, this.getDataStr(this._activeTabObj.type, vo.value)];
                    vo.reward = TableData.getInstance().getData(TableData.tb_activity_rank_rank_reward, i + 1);
                    vo.rank = i + 1;
                    data.data = vo;
                    data.id = i;
                    ary.push(data);
                }
            }
            this._slist.refreshData(ary);

        }

        public getDataStr($type: number, $data: number): string {
            if ($type == 0) {
                return String($data);
            } else if ($type == 2) {
                return String($data);
            } else if ($type == 3) {
                return String($data);
            } else if ($type == 4) {
                var jie: number = float2int($data / 1000) + 10;
                var start: number = $data % 1000;
                return (jie + "阶" + start + "星");
            } else if ($type == 5) {
                var jie: number = float2int($data / 1000);
                var start: number = $data % 1000;
                return (jie + "阶" + start + "星");
            } else if ($type == 6) {
                return String($data);
            } else if ($type == 7) {
                var jie: number = float2int($data / 1000);
                var start: number = $data % 1000;
                return (jie + "阶" + start + "星");
            }
            return "";
        }


        public show(): void {
            //UIManager.getInstance().addUIContainer(this);
            //super.show($activeID);
            super.show();
            this.addChild(this._bg);
            this.draw();
            this._slist.show();
            TimeUtil.addTimeTick(1000, this._drawTimeFun);
            NetManager.getInstance().protocolos.activity_opt_get_rank_list(this._activeID);
        }


        public hide(): void {
            //UIManager.getInstance().removeUIContainer(this);
            super.hide();
            this.removeChild(this._bg);
            this._slist.hide();
            TimeUtil.removeTimeTick(this._drawTimeFun);
        }


    }
    export class KaiFuDayTargetItemVo {
        public name: string;
        public value: number;
        public rank: number;
        public dataStr: Array<string>;
        public reward: any;
    }

    export class KaiFuDayTargetList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas, $activeID: number): void {
            this._activeID = $activeID;
            this.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = new Array;
            var w: number = 458;
            var h: number = 322;
            this.setData(ary, KaiFuDayTargetListItemRender, w, h, 453, 105, 3, 256, 512, 1, 3);
            this.center = -35;
            this.middle = 95;
            this.setShowLevel(4);
        }
        private _activeID: number;
        // public getDataAry(): Array<SListItemData> {
        //     var ary: Array<SListItemData> = new Array<SListItemData>();

        //     for (var i: number = 0; i < 3; i++) {
        //         var data: SListItemData = new SListItemData();
        //         data.data = null;
        //         data.id = i;
        //         ary.push(data);
        //     }

        //     return ary;
        // }

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

    export class KaiFuDayTargetListItemRender extends SListItem {
        //public static baseAtlas: UIAtlas;
        private _icon: UICompenent;
        private _nameui: UICompenent;
        private _infoui: UICompenent;
        private _ibg: UICompenent;

        private _iconAry: Array<UICompenent> = new Array;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "q_s_bg", 0, 0, 450, 105, 10, 10);
            $container.addChild(this._ibg);

            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_rank", 8, 0, 76, 94);
            $container.addChild(this._icon);

            this._nameui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_lab1", 115, 23, 140, 20);
            $container.addChild(this._nameui);

            this._infoui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_lab2", 115, 54, 140, 20);
            $container.addChild(this._infoui);

            for (var i: number = 0; i < 2; i++) {
                var ui: UICompenent = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_s_icon" + i, 290 + i * 76, 18, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }

        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && $data.data) {
                this.applyRender();
            }
        }

        private applyRender(): void {

            var vo: KaiFuDayTargetItemVo = this.itdata.data;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.ITEMBIGBG);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, getBaseName(vo.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._infoui.skinName, ColorType.colorb96d49 + vo.dataStr[0] + ":" + ColorType.Brown7a2f21 + vo.dataStr[1], 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.uiAtlas.upDataPicToTexture(getKaifuIconUrl("d" + vo.rank), this._icon.skinName);

            for (var i: number = 0; i < this._iconAry.length; i++) {
                if (vo.reward.item[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], vo.reward.item[i][0], vo.reward.item[i][1]);
                } else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 0);
                }

            }

        }


    }
}