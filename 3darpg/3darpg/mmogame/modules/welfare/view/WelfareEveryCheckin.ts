module welfare {

    export class WelfareEveryCheckin extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _frameRender: FrameUIRender;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList.dispose();
                this.welfareEveryCheckinList = null;
            }

            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();

        }

        public welfareEveryCheckinList: WelfareEveryCheckinList;
        private _aryRewardUI: Array<UICompenent>;
        private _aryRewardnameUI: Array<UICompenent>;
        private _aryRewardstateUI: Array<UICompenent>;
        private _aryProUI: Array<FrameCompenent>;
        private slistIndex1: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this._aryRewardUI = new Array;
            this._aryRewardnameUI = new Array;
            this._aryRewardstateUI = new Array;
            for (var i = 0; i < 5; i++) {
                var reward: UICompenent = this.addChild(<UICompenent>renderLevel.getComponent("t_prop" + i));
                reward.addEventListener(InteractiveEvent.Up, this.RewardClik, this);
                this._aryRewardUI.push(reward);
                this._aryRewardnameUI.push(this.addChild(<UICompenent>renderLevel.getComponent("t_name" + i)));
                this._aryRewardstateUI.push(this._topRender.getComponent("a_wj_chuo" + i));
            }


            this._aryProUI = new Array;
            for (var i: number = 0; i < 4; i++) {
                var frame: FrameCompenent = <FrameCompenent>this._baseRender.getComponent("a_wj_line" + i);
                this.addChild(frame);
                this._aryProUI.push(frame);
                frame.goToAndStop(1);
            }
            var a_huawen1 = this.addChild(<UICompenent>this._bottomRender.getComponent("a_huawen1"));
            a_huawen1.isU = true;
            this.addUIList(["a_titlebg", "a_bg"], this._bgRender);
            this.addUIList(["a_title", "a_huawen", "t_hua1", "t_hua2", "t_hua3", "t_hua4", "t_hua5", "t_hua6"], this._bottomRender);

            this.slistIndex1 = this.addChild(<UICompenent>this._bottomRender.getComponent("slistIndex1"));

            this.buildFram();
        }


        private effAry: Array<FrameTipCompenent>;
        private buildFram(): void {
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, ($ary: any) => {
                    this.effAry = $ary;
                    for (var i: number = 0; i < this.effAry.length; i++) {
                        this.effAry[i].x = this._aryRewardUI[i].x - 30
                        this.effAry[i].y = this._aryRewardUI[i].y - 30
                        // this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        // this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        this.effAry[i].speed = 3;
                    }
                    this.playEff();
                }, this._aryRewardUI.length);

            }
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this._aryRewardUI.length; i++) {
                var vo: SigninWeekItemData = this._aryRewardUI[i].data;
                if (vo && vo.state == 2) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                } else {
                    this.removeChild(this.effAry[i]);
                }
            }
        }


        public resize(): void {
            super.resize();
            if (this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList.left = this.slistIndex1.parent.x / UIData.Scale + this.slistIndex1.x
                this.welfareEveryCheckinList.top = this.slistIndex1.parent.y / UIData.Scale + this.slistIndex1.y
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList.hide();
            }
        }

        public resetData(): void {
            if (!this.welfareEveryCheckinList) {
                this.welfareEveryCheckinList = new WelfareEveryCheckinList();
                this.welfareEveryCheckinList.init(this._baseRender.uiAtlas);
            }
            this.welfareEveryCheckinList.show();

            this.setUiListVisibleByItem(this._aryRewardstateUI, false);
            var $arytabvo: Array<SigninWeekItemData> = GuidData.quest.getSigninWeekList();
            for (var i = 0; i < $arytabvo.length; i++) {
                var itemary: SigninWeekItemData = $arytabvo[i];
                this._aryRewardUI[i].data = itemary;
                this.drawReward(this._aryRewardUI[i]);
                if (itemary.state == 3) {
                    this.setUiListVisibleByItem([this._aryRewardstateUI[i]], true);
                }

                if (i > 0) {
                    if (itemary.state != 1) {
                        this._aryProUI[i - 1].goToAndStop(0);
                    } else {
                        this._aryProUI[i - 1].goToAndStop(1);
                    }
                }
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryRewardnameUI[i].skinName, "签到" + itemary.data.num + "天", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }

            this.playEff();
            this.resize();
        }

        private drawReward($ui: UICompenent): void {
            var itemary: SigninWeekItemData = $ui.data
            var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(itemary.data.item[0][0])
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    //底色
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(3, 3, 62, 62), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String(itemary.data.item[0][1]), 16, 62, 42, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    if (itemary.state != 2) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68))
                    } else {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(51, 0, 17, 16), UIData.publicUi);
                    }
                    this._bottomRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        public butClik(evt: InteractiveEvent): void {
            //购买vip
            ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
            ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
        }

        public RewardClik(evt: InteractiveEvent): void {
            var vo: SigninWeekItemData = evt.target.data;
            if (vo) {
                if (vo.state == 2) {
                    //可以领取
                    NetManager.getInstance().protocolos.welfare_checkin_all(vo.data.id);
                } else {
                    //查看奖励信息
                    var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(vo.data.item[0][0]);

                    var bag: BagItemData = new BagItemData();
                    bag.entryData = obj;

                    var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                    aa.data = bag;
                    aa.buttonType = -1;
                    ModuleEventManager.dispatchEvent(aa);
                }
            }
        }

    }



    /**
     * 签到List
     */
    export class WelfareEveryCheckinList extends EffectSlist {

        public constructor() {
            super();
            this.left = 217;
            this.top = 79;
        }

        // private _frameRender: FrameUIRender;
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        // private _effUI: FrameTipCompenent;
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, WelfareEveryCheckinListRender, 686, 295, 98, 128, 2, 1024, 512, 7, 4, 2);
        }

        /**
         * refreshData
         */
        private _everycheckinlist: Array<SigninEveryDayItemData>;
        private compareAry($ary: Array<SigninEveryDayItemData>): boolean {
            if ($ary.length != this._everycheckinlist.length) {
                return true;
            }
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i].state != this._everycheckinlist[i].state) {
                    return true;
                }
            }
            return false;
        }

        public refreshDataByNewData(): void {
            var $flag: boolean = true;
            var a: Array<SigninEveryDayItemData> = GuidData.quest.getSigninEveryDayVoList();
            if (this._everycheckinlist) {
                $flag = this.compareAry(a);
            }

            if ($flag) {
                console.log("数据变化了");
                this._everycheckinlist = a;
                var $sListItemData: Array<SListItemData> = this.getData(this._everycheckinlist);
                this.refreshData($sListItemData);
            }
            var effflag: boolean = false;
            for (var i = 0; i < a.length; i++) {
                if (a[i].state == 2) {
                    effflag = true;
                }
            }

            if (effflag) {
                // this.showEffect(0, this.getIdxX(this.getscrollX()) - 45, this.getIdxY(this.getscrollnum()) - 55, 1.4, 1.8);
                this.showEffect(0, this.getIdxX(this.getscrollX()) - 25, this.getIdxY(this.getscrollnum()) + 71, 1.1, 0.5);
            } else {
                this.hideEffect(0);
            }
        }

        public effectComplte(): void {
            console.log("加载好了，回调");
            this.refreshDataByNewData();
            this.scrollIdx(this.getscrollnum());
        }


        public getData($data: Array<SigninEveryDayItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        private _type: number
        private _start: number
        private _end: number
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            // this.effectComplte();
            this.setEffectUrl("ef_fl", 4, 4);
        }

        private getscrollnum(): number {
            var num: number
            var curday: number = GuidData.quest.getcurDays();
            var flagary: Array<boolean> = GuidData.quest.getSigninEveryDayList();
            var isreceive: boolean = flagary[curday - 1];
            if (isreceive) {
                num = 0;
            } else {
                num = Math.floor((curday - 1) / 7);
            }
            return num;
        }

        private getscrollX(): number {
            var curday: number = GuidData.quest.getcurDays();
            return (curday - 1) % 7;
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
            this.hideEffect();
        }
    }

    export class WelfareEveryCheckinListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private I1icon: UICompenent;
        private I1btn: UICompenent;
        private I1bg: UICompenent;
        private I1select: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var cententRender: UIRenderComponent = this._customRenderAry[0];
            var topRender: UIRenderComponent = this._customRenderAry[1];

            this.I1bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "I1bg", 0, 0, 98, 128, 22, 22);
            $container.addChild(this.I1bg);

            this.I1icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I1icon", 0, 0, 83, 81);
            $container.addChild(this.I1icon);
            this.I1icon.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.I1btn = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "I1btn", 8, 87, 81, 34);
            $container.addChild(this.I1btn);
            this.I1btn.addEventListener(InteractiveEvent.Up, this.btnClick, this);

            this.I1select = this.creatGrid9SUI(topRender, this.parentTarget.baseAtlas, "I1select", 0, 0, 98, 128, 14, 14);
            $container.addChild(this.I1select);


        }


        private drawIcon(): void {
            var vo: SigninEveryDayItemData = this.itdata.data
            var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(vo.data.item[0][0])
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon),
                ($img: any) => {
                    //置空和回调先后顺序问题
                    if (this.itdata && this.itdata.data) {
                        var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.I1icon.skinName);
                        var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                        UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(14, 13, 68, 68), UIData.publicUi);
                        UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(14, 13, 68, 68), UIData.publicUi);
                        //头像
                        ctx.drawImage($img, 0, 0, 60, 60, 18, 17, 60, 60);

                        if (vo.state == 3) {
                            //图像灰
                            UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(18, 17, 60, 60))
                            UiDraw.cxtDrawImg(ctx, PuiData.A_gou, new Rectangle(42, 41, 38, 38), UIData.publicUi);
                        }

                        if (vo.data.vip > 0) {
                            var vipRect1 = this.parentTarget.baseAtlas.getRec("vip" + vo.data.vip);
                            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect1.pixelX, vipRect1.pixelY, vipRect1.pixelWitdh, vipRect1.pixelHeight, 2, 2, vipRect1.pixelWitdh, vipRect1.pixelHeight);
                        }

                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String(vo.data.item[0][1]), 16, 78, 58, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);

                        this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                    }
                });
        }


        private drawBtn() {
            var vo: SigninEveryDayItemData = this.itdata.data

            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.I1btn.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var str: string = "第" + vo.data.id + "天";
            var colortxt: string = ColorType.Brown7a2f21;
            if (vo.state == 4) {
                var StateRect1 = this.parentTarget.baseAtlas.getRec("I1bq");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, StateRect1.pixelX, StateRect1.pixelY, StateRect1.pixelWitdh, StateRect1.pixelHeight, 0, 0, StateRect1.pixelWitdh, StateRect1.pixelHeight);
                str = "补签";
                colortxt = ColorType.Green464b11
            } else if (vo.state == 2) {
                var StateRect2 = this.parentTarget.baseAtlas.getRec("I1qd");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, StateRect2.pixelX, StateRect2.pixelY, StateRect2.pixelWitdh, StateRect2.pixelHeight, 0, 0, StateRect2.pixelWitdh, StateRect2.pixelHeight);
            } else if (vo.state == 3) {
                colortxt = ColorType.colorb96d49
            }

            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, colortxt + str, 16, 39, 6);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                console.log("--this.itdata.id---", this.itdata.id);
                var vo: SigninEveryDayItemData = this.itdata.data
                if (vo.state == 3) {
                    //底色
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I1bg.skinName, UIData.publicUi, PuiData.I1bg_2);
                } else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I1bg.skinName, UIData.publicUi, PuiData.I1bg_1);
                }

                this.drawBtn();
                this.drawIcon();

                // //高亮
                if (vo.state == 2) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I1select.skinName, UIData.publicUi, PuiData.TITLEHIGHT);
                }
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo: SigninEveryDayItemData = this.itdata.data
                var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(vo.data.item[0][0]);
                var bag: BagItemData = new BagItemData();
                bag.entryData = obj;

                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                aa.data = bag;
                aa.buttonType = -1;
                ModuleEventManager.dispatchEvent(aa);
            }
        }

        private btnClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染

            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                var vo: SigninEveryDayItemData = this.itdata.data
                if (vo.state == 2) {
                    //领取事件
                    this.receiveReward();
                } else if (vo.state == 4) {
                    //补领事件
                    if (GuidData.player.getIsVIP()) {
                        this.receiveReward();
                    } else {
                        // TimeUtil.addTimeOut(30, () => {
                        AlertUtil.show("成为vip后，才可使用补签功能", "补签提示", (a: any) => {
                            if (a == 1) {
                                //购买vip
                                ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                            }
                        },2,["前往充值","取消"])
                        // });
                        // ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.OPPENWIN_Vip_Welfare_EVENT));
                    }
                }
            }
        }

        private receiveReward(): void {
            var vo: SigninEveryDayItemData = this.itdata.data
            if (vo.data.vip <= GuidData.player.getVipLevel()) {
                //不提示，直接领取
                if (vo.state == 2) {
                    NetManager.getInstance().protocolos.welfare_checkin();
                } else {
                    NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
                }
            } else {
                AlertUtil.show("成为vip" + vo.data.vip + "后，可以领取" + vo.data.times + "倍签到奖励", "签到提示", (a: any) => {
                    if (a == 1) {
                        //直接签到
                        if (vo.state == 2) {
                            NetManager.getInstance().protocolos.welfare_checkin();
                        } else {
                            NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
                        }
                    } else {
                        //购买vip
                        ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                    }
                },2,["直接签到","前往充值"])
                // var $evtee = new welfare.WelfareEvent(welfare.WelfareEvent.OPPENWIN_Qiandao_Welfare_EVENT);
                // $evtee.data = vo
                // ModuleEventManager.dispatchEvent($evtee);
            }
        }

        // private CheckinFun(a: any): void {
        //     if (a == 1) {
        //         var vo: SigninEveryDayItemData = this.itdata.data
        //         //确定
        //         if (vo.state == 2) {
        //             NetManager.getInstance().protocolos.welfare_checkin();
        //         } else {
        //             NetManager.getInstance().protocolos.welfare_checkin_getback(vo.data.id);
        //         }
        //     } else {
        //         //取消
        //         ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
        //         ModulePageManager.openPanel(PanelClass.SHOW_shangcheng_PANEL, [2]);

        //     }
        // }

        private setnull(): void {
            UiDraw.clearUI(this.I1icon);
            UiDraw.clearUI(this.I1bg);
            UiDraw.clearUI(this.I1btn);
            UiDraw.clearUI(this.I1select);
        }
    }


}