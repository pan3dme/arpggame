module welfare {

    export class LotteryPanel extends WindowUi {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _rotationRender: RoationUIRenderComponent;
        public _baseUiAtlas: UIAtlas;

        public dispose(): void {

            this._baseRender.dispose();
            this._baseRender = null;

            this._bgRender.dispose();
            this._bgRender = null;

            super.dispose();

        }


        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent();
            this.addRender(this._bgRender);

            this._rotationRender = new RoationUIRenderComponent();
            this.addRender(this._rotationRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._baseUiAtlas = new UIAtlas();

        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.w_close) {
                this.hide();
            }
        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/welfare/lottery.xml", "ui/uidata/welfare/lottery.png", () => { this.loadConfigCom() }, "ui/uidata/welfare/lotterynum.png");
        }

        private loadConfigCom(): void {


            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._rotationRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this.applyLoadComplete();
        }

        private _btn1: UICompenent;
        private _btn2: UICompenent;
        private _lsLab: UICompenent;
        private _cjBtn: UICompenent;

        private _costUI: UICompenent;
        private _jianUI: RoationUICompenent;

        //private _rewardList: Array<UICompenent>;
        //private _rewardDayList: Array<UICompenent>;

        private _lab1: UICompenent;
        private _lab2: UICompenent;

        private _infoAry: Array<UICompenent>;

        private _iAry: Array<UICompenent>;
        private _lAry: Array<UICompenent>;
        private initUI(): void {
            this.addUIList(["t_bg", "t_txtbg", "t_labbg"], this.winmidRender);
            this.addUIList(["t_txtitem0", "t_txtitem1", "t_txtitem2","t_title"], this._bgRender);

            this._btn1 = this.addChild(this._bgRender.getComponent("t_btn"));
            this._btn1.addEventListener(InteractiveEvent.Up, this.btnClick, this);

            this._infoAry = new Array;
            var ui: UICompenent;
            for (var i: number = 0; i < 6; i++) {
                ui = this.addChild(this._bgRender.getComponent("t_txt" + i));
                this._infoAry.push(ui);
            }

            this._lab1 = this.addChild(this._bgRender.getComponent("t_add_num"));
            this._lab2 = this.addChild(this._bgRender.getComponent("t_num"));

            this._iAry = new Array;
            this._lAry = new Array;
            for (var i: number = 0; i < 8; i++) {
                ui = this.addChild(this._bgRender.getComponent("t_i" + i));
                this._iAry.push(ui);
                ui = this.addChild(this._bgRender.getComponent("t_l" + i));
                this._lAry.push(ui);
            }

            this._jianUI = <RoationUICompenent>this.addChild(this._rotationRender.getComponent("t_jian"));
            this._cjBtn = this.addChild(this._baseRender.getComponent("t_cj_bg"));
            this._cjBtn.addEventListener(InteractiveEvent.Up, this.btnClick, this);
            this._costUI = this.addChild(this._topRender.getComponent("t_cost"));



            // ui = this.addChild(this._baseRender.getComponent("t_lab2"));
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "王者盟主特权", 16, TextAlign.CENTER, ColorType.Whitefff4d6);

            // ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            // LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "王者家族成员每日俸禄", 16, TextAlign.LEFT, ColorType.Whitefff4d6);


            this.refreshInfo();

            //this.drawBase();
            this._jianUI.paix.y = 0.9;

        }
        //
        public lock: boolean = false;
        public run($id: number): void {
            //console.log($id);
            var num: number = this.info.muls[$id - 1];
            //console.log(num);
            var idx: number = this.ary.indexOf(num);
            //console.log(this.ary);
            //console.log(idx);

            this._jianUI.rotation = 0;
            var s: number = idx * 45 + 360 * 5;
            TweenLite.to(this._jianUI, 3, { rotation: s, onComplete: () => { this.runFinish() } });
        }

        public runFinish(): void {
            ModulePageManager.refreshResTitle();
            TimeUtil.addTimeOut(2000, () => {
                this.lock = false;
                this.refreshInfo();
            });
        }

        private btnClick($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._btn1) {
                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                //ModuleEventManager.dispatchEvent(new faction.FactionLeaguEvent(faction.FactionLeaguEvent.SHOW_LEAGUE_EVENT));
            }else if ($e.target == this._cjBtn) {
                //this.run();

                if ((this.dataAry[1] - this.dataAry[0]) <= 0) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "抽奖次数不足", 99);
                    return;
                }
                if (!hasEnoughRes(this.info.cost[0])) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "元宝不足", 99);
                    return;
                }
                if (this.lock) {
                    return;
                }
                ModulePageManager.lockResTitle();
                NetManager.getInstance().protocolos.lottery_recharge();
                this.lock = true;
            }
        }




        public drawBase(): void {
            this.dataAry = GuidData.player.getLotteryData();
            var sum: number = GuidData.player.getChongZhiSum();

            var maxID: number = TableData.getInstance().getTabMaxID(TableData.tb_recharge_wheel);
            for (var i: number = 1; i <= maxID; i++) {
                var obj:any = TableData.getInstance().getData(TableData.tb_recharge_wheel,i);
                if(sum < obj.recharges){
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._lab1.skinName,
                        ColorType.White9A683F + "再充值" + ColorType.Green2ca937 + (obj.recharges - sum)  + ColorType.White9A683F + "元宝抽奖次数" + ColorType.Green2ca937 + "+1", 16, TextAlign.CENTER);
                    break;
                }
            }
            if(i > maxID){
                UiDraw.clearUI(this._lab1);
            }


            
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._lab2.skinName,
                ColorType.Brown7a2f21 + "剩余抽奖次数：" + ColorType.Green2ca937 + (this.dataAry[1] - this.dataAry[0]) + ColorType.Brown7a2f21 + "次", 14, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.drawYb(this._costUI, 1, this.info.cost[0][1]);
        }

        // public drawInfo(): void {

        // }

        private ary: Array<number>;
        public drawpan(): void {
            this.ary = [];
            for (var i: number = 0; i < this.info.muls.length; i++) {
                this.ary.push(this.info.muls[i]);
            }
            this.ary.sort((a, b) => { return Math.random() > 0.5 ? 1 : -1 });

            for (var i: number = 0; i < this._iAry.length; i++) {
                var num: number = this.info
                this.drawBei(this._iAry[i], (this.ary[i] / 100) + "倍");
                this.drawYb(this._lAry[i], 2, float2int(this.ary[i] * this.info.cost[0][1] / 100));
            }
        }

        public drawBei(ui: UICompenent, str: string): void {
            var rec: UIRectangle = this._baseUiAtlas.getRec(ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);


            var flag: number = 0;

            for (var i: number = 0; i < str.length; i++) {
                var key: string = this.getUk(str[i]);
                var src: UIRectangle = this._baseUiAtlas.getRec(key);
                flag += src.pixelWitdh;
            }
            flag = (rec.pixelWitdh - flag) / 2;
            for (var i: number = 0; i < str.length; i++) {
                var key: string = this.getUk(str[i]);
                var src: UIRectangle = this._baseUiAtlas.getRec(key);
                ctx.drawImage(this._baseUiAtlas.useImg, src.pixelX, src.pixelY, src.pixelWitdh, src.pixelHeight, flag, 0, src.pixelWitdh, src.pixelHeight);
                flag += src.pixelWitdh;
            }

            this._baseUiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
        }

        public drawYb($ui: UICompenent, type: number, num: number): void {
            var $rec: UIRectangle = this._baseUiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var xoff: number = 6;
            UiDraw.drawCost(ctx, xoff, 0, getresIdByreward(type));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, String(num), 18, xoff, 10, TextAlign.LEFT, ColorType.color73301c);

            this._baseUiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public getUk(str: string): string {
            if (str == "倍") {
                return "ub"
            } else if (str == ".") {
                return "ud"
            } else {
                return "u" + str;
            }
        }
        private info: any;
        private dataAry: Array<number>
        public refreshInfo(): void {
            this.dataAry = GuidData.player.getLotteryData();
            var idx: number = this.dataAry[0] + 1;
            var maxID: number = TableData.getInstance().getTabMaxID(TableData.tb_recharge_wheel);
            if (idx > maxID) {
                idx = maxID
            }
            this.info = TableData.getInstance().getData(TableData.tb_recharge_wheel, idx);
            this.drawBase();
            //this.drawInfo();
            this.drawpan();
        }

        public refeshLog(ary: Array<any>): void {
            for (var i: number = 0; i < this._infoAry.length; i++) {
                var data: any = ary[i];
                if (data) {
                    LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._infoAry[i].skinName,
                        ColorType.White9A683F + "玩家" + ColorType.Green2ca937 + data[0] + " " + ColorType.White9A683F + "投资" + data[1] + "元宝获得" + data[2] + "倍奖励," + ColorType.colorff7200 + data[3] + "绑定元宝", 14, TextAlign.LEFT);

                } else {
                    UiDraw.clearUI(this._infoAry[i]);
                }
            }
        }






        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            ModulePageManager.lockResTitle();
            SceneManager.getInstance().render = false;

            if (this._baseRender.uiAtlas) {
                this.refreshInfo();
            }
            this.lock = false;
            var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            SceneManager.getInstance().render = true;
            ModulePageManager.unlockResTitle();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            super.hide();
        }


    }


}