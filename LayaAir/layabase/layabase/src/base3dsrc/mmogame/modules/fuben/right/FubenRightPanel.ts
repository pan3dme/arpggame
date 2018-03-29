module fb {
    export class FubenRightPanel extends UIConatiner {

        private _baseRender: UIRenderComponent;
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.middle = 0;


            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._baseRender.uiAtlas = new UIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/fuben/right/fubenright.xml", "ui/uidata/fuben/right/fubenright.png", () => { this.loadConfigCom() });

        }


        private _damBtn: UICompenent;
        private _expBtn: UICompenent;


        private loadConfigCom(): void {

            this._expBtn = this.addEvntButUp("t_exp", this._baseRender);
            this._damBtn = this.addEvntButUp("t_dam", this._baseRender);

        }

        protected butClik($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if ($e.target == this._expBtn) {
                this.showExpPanel();
            } else if ($e.target == this._damBtn) {
                this.showDamPanel();
            }
        }

        private _damPanel: FubenRightDamPanel;
        private showDamPanel(): void {
            if (!this._damPanel) {
                this._damPanel = new FubenRightDamPanel();
            }
            this._damPanel.load(() => {
                //UIManager.getInstance().addUIContainer(this._damPanel);
                this._damPanel.show();
            })
        }

        private _expPanel: FubenRightExpPanel;
        private showExpPanel(): void {
            if (!this._expPanel) {
                this._expPanel = new FubenRightExpPanel();
            }
            this._expPanel.load(() => {
                this._expPanel.show();
            })
        }

        private hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class FubenRightDamPanel extends WindowPopUi {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        //private _topRender: UIRenderComponent;

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

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

            //this._topRender = new UIRenderComponent;
            //this.addRender(this._topRender);

            this._baseRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/fuben/right/fubenrightdam.xml", "ui/uidata/fuben/right/fubenrightdam.png", () => { this.loadConfigCom() });
        }


        private cancal: UICompenent;
        private submit: UICompenent;

        private sel1: FrameCompenent;
        private sel2: FrameCompenent;

        private curDamUI: UICompenent;
        private curYinbiNum: UICompenent;
        private maxEffNum: number;
        private curEffNum: number;
        private goldTimes: number;
        private curGoldTimes:number;
        private moneyCost: any;
        private goldCost: any;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            //this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this.addUIList(["t_title", "t_bg"], this._bottomRender);

            var obj: any = TableData.getInstance().getData(TableData.tb_instance_group_exp, 1);

            var ui: UICompenent = this.addChild(this._baseRender.getComponent("t_lab"));
            this.maxEffNum = obj.buffinfo[1];
            this.goldTimes = obj.goldTimes;
            this.moneyCost = obj.moneyCost[0];
            this.goldCost = obj.goldCost[0];
            var str: string = ColorType.Brownd662c0d + "每次鼓舞可增加人物" + ColorType.Green2ca937 + obj.buffinfo[0] + "%" + ColorType.Brownd662c0d + "伤害(上限" + ColorType.Green2ca937 + obj.buffinfo[1] + "%" + ColorType.Brownd662c0d + ")"
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, str, 16, TextAlign.CENTER);



            ui = this.addChild(this._baseRender.getComponent("t_lab1"));
            this.drawPrice(ui, "银币鼓舞(", obj.moneyCost[0][0], obj.moneyCost[0][1] + "/次)");
            ui = this.addChild(this._baseRender.getComponent("t_lab2"));
            this.drawPrice(ui, "元宝鼓舞(", obj.goldCost[0][0], obj.goldCost[0][1] + "/次)");

            ui = this.addChild(this._baseRender.getComponent("t_faq"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, ColorType.White9A683F + "(优先使用绑定元宝)", 16, TextAlign.CENTER);

            this.curDamUI = this.addChild(this._baseRender.getComponent("t_cur_dam"));
            this.curYinbiNum = this.addChild(this._baseRender.getComponent("t_info1"));
            ui = this.addChild(this._baseRender.getComponent("t_info2"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, ColorType.White9A683F + "(不限制)", 16, TextAlign.LEFT);

            this.sel1 = <FrameCompenent>this._baseRender.getComponent("t_sel1");
            this.addChild(this.sel1);
            this.sel1.addEventListener(InteractiveEvent.Up, this.selClick, this);

            this.sel2 = <FrameCompenent>this._baseRender.getComponent("t_sel2");
            this.addChild(this.sel2);
            this.sel2.addEventListener(InteractiveEvent.Up, this.selClick, this);

            this.setSel(this.sel1);

            this.cancal = this.addEvntButUp("t_no", this._bottomRender);
            this.submit = this.addEvntButUp("t_yes", this._bottomRender);

            this.drawDynamic();

            this._refreshFun = () => { this.drawDynamic() }

            this.applyLoadComplete();
        }

        public drawDynamic(): void {
            var info: any = GuidData.map.getExpFubenInfo();
            this.curEffNum = info.eff;
            this.curGoldTimes = info.buy;
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curDamUI.skinName,
                ColorType.Brownd662c0d + "当前伤害提升" + ColorType.Green2ca937 + info.eff + "%", 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curYinbiNum.skinName,
                ColorType.White9A683F + "银币可提升(" + ColorType.Green2ca937 + (this.goldTimes - this.curGoldTimes) + ColorType.White9A683F + ")", 16, TextAlign.LEFT);
        }

        private drawPrice($ui: UICompenent, str: string, $cost: any, str2: string): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var xoff: number = 20;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.drawCost(ctx, xoff, 0, getresIdByreward($cost));
            xoff += 35;
            xoff += LabelTextFont.writeSingleLabelToCtx(ctx, str2, 16, xoff, 10, TextAlign.LEFT, ColorType.Brown7a2f21);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
        private subType: number = 0;
        private setSel(ui: FrameCompenent): void {
            if (this.sel1 == ui) {
                this.sel1.goToAndStop(0);
                this.subType = 0;
            } else {
                this.sel1.goToAndStop(1);
            }

            if (this.sel2 == ui) {
                this.sel2.goToAndStop(0);
                this.subType = 1;
            } else {
                this.sel2.goToAndStop(1);
            }
        }

        private selClick(evt: InteractiveEvent): void {
            this.setSel(evt.target);
        }



        protected butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.submit:
                    this.sumbitHandle();
                    break
                // case this.a_add_but:
                //     this.toNext();
                //     break
                // case this.a_submit:
                //     this.sendSelectNum();
                //     break
                case this.cancal:
                case this.f_close:
                    this.hide()
                    break
                default:
                    break
            }

        }

        public sumbitHandle(): void {
            
            if (this.curEffNum >= this.maxEffNum) {
                msgtip.MsgTipManager.outStr("伤害加成已到达上限", 99);
                return;
            }

            if (this.subType == 0) {
                
                if(this.curGoldTimes >= this.goldTimes){
                    msgtip.MsgTipManager.outStr("银币购买次数已满", 99);
                    return;
                }

                if (!hasEnoughRes(this.moneyCost)) {
                    msgtip.MsgTipManager.outStr("银币不足", 99);
                    return;
                }
            } else {
                if (!hasEnoughRes(this.goldCost)) {
                    msgtip.MsgTipManager.outStr("元宝不足", 99);
                    return;
                }
            }

            NetManager.getInstance().protocolos.buy_inspiration(this.subType);
            //this.hide();
        }

        private _refreshFun: Function;

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeTimeTick(this._refreshFun);
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addTimeTick(300, this._refreshFun)
        }

    }

    export class FubenRightExpPanel extends WindowPopUi {
        //private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        //private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false

        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

            this._baseRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/fuben/right/fubenrightexp.xml", "ui/uidata/fuben/right/fubenrightexp.png",
                () => { this.loadConfigCom() }, "ui/uidata/fuben/right/fubenrightexpuse.png");
        }

        private noItemUI: UICompenent;
        private storeBtn: UICompenent;
        private loadConfigCom(): void {

            this.addChild(this._baseRender.getComponent("t_title"));

            var ui: UICompenent = this.addChild(this._baseRender.getComponent("t_lab"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, ColorType.Brownd662c0d + "使用经验药水，打怪经验翻倍", 16, TextAlign.CENTER);

            this.initList();

            this.noItemUI = this._baseRender.getComponent("t_no");
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.noItemUI.skinName, ColorType.Brownd662c0d + "(当前背包无经验药水)", 16, TextAlign.CENTER);

            this.storeBtn = this.addEvntButUp("t_btn", this._baseRender)
            this.applyLoadComplete();
        }


        private _rlist: FubenRightExpList;
        private initList(): void {
            this._rlist = new FubenRightExpList();
            this._rlist.init(this._baseRender.uiAtlas);
            this._rlist.pPanel = this;
            if (this.hasStage) {
                this._rlist.show();
            }
        }

        public refreshBtn(): void {
            var num: number = GuidData.bag.getExpItemList().length;
            if (num == 0) {
                this.addChild(this.noItemUI);
                this.addChild(this.storeBtn);
                this._rlist.hide();
            } else {
                this.removeChild(this.noItemUI);
                this.removeChild(this.storeBtn);
                this._rlist.show();

            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (this._rlist) {
                this._rlist.show();
            }
            this.refreshBtn();
        }

        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.f_close:
                    this.hide();
                    break
                case this.storeBtn:
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL,[SharedDef.MODULE_MALL_GOLD,6]);
                    this.hide();
                    break

            }

        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this._rlist) {
                this._rlist.hide();
            }
        }

    }

    export class FubenRightExpList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            // ArenaDjRewardListItemRender.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var w: number = 420;
            var h: number = 200;
            this.setData(ary, FubenRightExpListItemRender, w, h, 400, 100, 2, 512, 512, 1, 5);
            this.center = 30;
            this.middle = -10;
            this.setShowLevel(4);
            this.resize();
        }

        public reget(): void {
            this.refreshData(this.getDataAry());
        }

        public getDataAry(): Array<SListItemData> {
            var srcList: Array<BagItemData> = GuidData.bag.getExpItemList();
            var ary: Array<SListItemData> = new Array<SListItemData>();

            for (var i: number = 0; i < srcList.length; i++) {
                var data: SListItemData = new SListItemData();
                data.data = srcList[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public pPanel: FubenRightExpPanel;
        public sunApplyHide(): void {
            if (this.pPanel) {
                this.pPanel.hide();
            }
        }



    }

    export class FubenRightExpListItemRender extends SListItem {
        //public static baseAtlas: UIAtlas;
        private _btn: UICompenent;
        private _name: UICompenent;
        private _ibg: UICompenent;

        private _icon: UICompenent;

        private _up: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "s_bg", 0, 0, 356, 97);
            $container.addChild(this._ibg);

            this._btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_btn", 236, 25, 105, 46);
            $container.addChild(this._btn);
            this._btn.addEventListener(InteractiveEvent.Down, this.onclick, this);

            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_lab", 92, 34, 94, 28);
            $container.addChild(this._name);

            this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon", 21, 14, 68, 68);
            $container.addChild(this._icon);

            this._up = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_up", 186, 24, 26, 33);
            $container.addChild(this._up);

        }
        private onclick($e: InteractiveEvent): void {
            //NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
            if (this.itdata && this.itdata.data) {
                (<FubenRightExpList>this.parentTarget).sunApplyHide();
                GuidData.bag.useItem(this.itdata.data.id);
            }

        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && this.itdata.data) {
                this.applyRender();
            } else {
                this.applyNull();
            }
        }

        private applyNull(): void {
            UiDraw.clearUI(this._icon);
            UiDraw.clearUI(this._up);
            UiDraw.clearUI(this._ibg);
            UiDraw.clearUI(this._btn);
            UiDraw.clearUI(this._name);
        }

        private applyRender(): void {

            var bd: any = this.itdata.data;

            IconManager.getInstance().drawItemIcon60(this._icon, bd.entryData.id, bd.count);
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, this.itdata.data.name, 16, TextAlign.CENTER,ColorType.Brown7a2f21);
            if (bd.entryData.using_effect.length) {
                var tab: any = TableData.getInstance().getData(TableData.tb_buff_effect, bd.entryData.using_effect[0]);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, ColorType.Brownd662c0d + "经验" + ColorType.Green2ca937 + tab.value + "%", 16, TextAlign.RIGHT);
            }
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._btn.skinName, "按钮" + bd.state, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            // UiDraw.clearUI(this._btn);
            // this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._btn.skinName);

            // var rary: Array<any> = bd.data.reward;
            // for (var i: number = 0; i < this._iconAry.length; i++) {
            //     if (rary[i]) {
            //         IconManager.getInstance().drawItemIcon60(this._iconAry[i], rary[i][0], rary[i][1]);
            //     } else {
            //         IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 1);
            //     }
            // }

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._up.skinName, UIData.publicUi, PuiData.A_JIANTOU);
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.STATEUP_LISTBG);
            this.drawBtn();
        }

        private drawBtn(): void {
            var $ui: UICompenent = this._btn;
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("u_btn");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight,
                0, 0, $rec.pixelWitdh, $rec.pixelHeight);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
    }
}