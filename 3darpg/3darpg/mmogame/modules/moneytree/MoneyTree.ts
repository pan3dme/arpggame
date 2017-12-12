module moneytree {

    export class MoneyTree extends WindowCentenMin {

        private _baseRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _frameRender: FrameUIRender;
        private _frameRender1: FrameUIRender;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;

            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            if (this._frameRender1) {
                this._frameRender1.dispose();
                this._frameRender1 = null;
            }
            super.dispose();
        }


        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)


            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/moneytree/moneytree.xml", "ui/uidata/moneytree/moneytree.png", () => { this.loadConfigCom() });
        }

        private a_btn: UICompenent
        private a_times: UICompenent
        private a_money: UICompenent
        private a_txt: UICompenent
        private a_cost: UICompenent
        private a_tree: UICompenent
        private _rewardAry: Array<UICompenent>
        private _infoAry: Array<UICompenent>
        private _stateAry: Array<FrameCompenent>
        private _proAry: Array<FrameCompenent>
        private loadConfigCom(): void {

            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;

            this.addUIList(["a_tiitle"], this._bgRender);
            this.addUIList(["a_info", "a_bg"], this._baseRender);

            this.a_tree = this.addChild(this._bgRender.getComponent("a_tree"));
            this.a_times = this.addChild(this._baseRender.getComponent("a_times"));
            this.a_money = this.addChild(this._midRender.getComponent("a_money"));

            this.a_txt = this.addChild(this._midRender.getComponent("a_txt"));
            this.a_cost = this.addChild(this._midRender.getComponent("a_cost"));

            this._rewardAry = new Array
            this._infoAry = new Array
            this._stateAry = new Array
            this._proAry = new Array

            this._proAry.push(<FrameCompenent>this.addChild(this._bgRender.getComponent("a_pro0")));
            this._proAry.push(<FrameCompenent>this.addChild(this._bgRender.getComponent("a_pro1")));

            this._rewardAry = new Array
            for (var i = 0; i < 3; i++) {
                this.addChild(this._bgRender.getComponent("a_rewardbg" + i));
                var btn = this.addChild(this._baseRender.getComponent("a_icon" + i));
                btn.addEventListener(InteractiveEvent.Up, this.rewardClik, this);
                this._rewardAry.push(btn);
                this._infoAry.push(this.addChild(this._baseRender.getComponent("a_timesinfo" + i)));
                this._stateAry.push(<FrameCompenent>this.addChild(this._midRender.getComponent("a_state" + i)));
            }
            this.a_btn = this.addEvntButUp("a_btn", this._midRender);
            this.resize();

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
                        this.effAry[i].x = this._rewardAry[i].x - 21
                        this.effAry[i].y = this._rewardAry[i].y - 21
                        this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        this.effAry[i].speed = 3;
                    }
                    this.playEff();
                    this.applyLoadComplete();
                }, this._rewardAry.length);

            }
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this._rewardAry.length; i++) {
                var vo: MoneyTreeGiftVo = this._rewardAry[i].data;
                if (vo && vo.state == 1) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                } else {
                    this.removeChild(this.effAry[i]);
                }
            }
        }


        private upLevEff: FrameTipCompenent;
        public showSkillUpEff(): void {
            console.log("up skill lev");
            if (!this._frameRender1) {
                this._frameRender1 = new FrameUIRender();
                this.addRender(this._frameRender1);
                this._frameRender1.setImg(getEffectUIUrl("ui_yqs"), 4, 4, ($ui: any) => {
                    this.upLevEff = $ui;
                    this.upLevEff.x = this.a_tree.x + 55;
                    this.upLevEff.y = this.a_tree.y + 35;
                    this.upLevEff.width = this.upLevEff.baseRec.width * 1.6;
                    this.upLevEff.height = this.upLevEff.baseRec.height * 1.6;
                    this.upLevEff.speed = 3;
                    this.upLevEff.playOne(this);
                })
            }
            if (this.upLevEff) {
                this.upLevEff.playOne(this);
            }
        }

        public showflyword($str: string): void {

            var v21d: Vector2D = new Vector2D(this.a_btn.parent.x / UIData.Scale + this.a_btn.x + this.a_btn.width, this.a_btn.parent.y / UIData.Scale + this.a_btn.y);
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(v21d, { width: 960, height: 540 })
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
            // v2d.x = v2d.x * UIData.Scale;
            // v2d.y = v2d.y * UIData.Scale;
            var a = $str.split("|");

            msgtip.MsgTipManager.outStr(ColorType.Yellowedce7e + a[1] + "倍暴击", msgtip.PopMsgVo.type8, v21d);
        }

        public resetData() {
            this.residueTime();
            this.drawReward();
            this.drawMoney();
            this.playEff();
        }

        public drawReward() {
            var bbb: Array<MoneyTreeGiftVo> = MoneyTreeModel.getInstance().getGiftAry();
            for (var i = 0; i < bbb.length; i++) {
                if (i < this._rewardAry.length) {
                    this._rewardAry[i].data = bbb[i];
                    IconManager.getInstance().drawItemIcon40(this._rewardAry[i], bbb[i].tab.rewards[0][0], bbb[i].tab.rewards[0][1], bbb[i].state == 2, false);

                    var reciveStr: string;
                    var times: number = bbb[i].tab.count - GuidData.player.getMoneyTreeNum();
                    if (times > 0) {
                        reciveStr = times + "次可领取"
                    } else {
                        reciveStr = "可领取"
                    }
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._infoAry[i].skinName, reciveStr, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                    var state: number = bbb[i].state != 2 ? 0 : 1;
                    this._stateAry[i].goToAndStop(state);
                }

                if (i < this._proAry.length) {
                    var prosta: number = bbb[i + 1].state != 0 ? 1 : 0;
                    this._proAry[i].goToAndStop(prosta);
                }
            }


        }

        private _hastimes: number;
        public residueTime() {
            if(this.a_times){
                var viptab = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel());
                this._hastimes = viptab.treeTimes - GuidData.player.getMoneyTreeNum();
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_times.skinName, ColorType.color9a683f + "剩余次数：" + ColorType.Green2ca937 + this._hastimes, 14, TextAlign.CENTER);
            }
        }

        private _canbuy: boolean;
        public drawMoney() {
            var aaa: MoneyTreeBaseVo = MoneyTreeModel.getInstance().getCurVo();

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_money.skinName, "本次可获得" + aaa.money, 14, TextAlign.CENTER, ColorType.Whitefff4d6);
            var str: string;
            if (aaa.state == 0) {
                UiDraw.clearUI(this.a_cost);
                this.a_txt.x = 456
                str = ColorType.Green2ca937 + "免费"
                this._canbuy = true;
            } else {
                this.a_txt.x = 414
                str = ColorType.color9a683f + "消耗:"
                this._canbuy = UiDraw.drawRewardIconAndtxt(this.a_cost, aaa.tab.cost[0], true, TextAlign.LEFT, 10);
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_txt.skinName, str, 14, TextAlign.CENTER);
        }

        public rewardClik(evt: InteractiveEvent): void {
            var $data: MoneyTreeGiftVo = <MoneyTreeGiftVo>evt.target.data
            if ($data) {
                if ($data.state == 1) {
                    //可以领取
                    NetManager.getInstance().protocolos.get_moneytree_gift($data.tab.id);
                } else {
                    //查看奖励信息
                    var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($data.tab.rewards[0][0]);

                    var bag: BagItemData = new BagItemData();
                    bag.entryData = obj;

                    var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                    aa.data = bag;
                    aa.buttonType = -1;
                    ModuleEventManager.dispatchEvent(aa);
                }
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_close:
                    ModuleEventManager.dispatchEvent(new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.HIDE_MoneyTree_EVENT));
                    break
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);

                    var aaa: MoneyTreeBaseVo = MoneyTreeModel.getInstance().getCurVo();
                    var ary: Array<number> = new Array;
                    if (aaa.state == 0) {
                        ary.push(2);
                        ary.push(0);
                    } else {
                        ary = aaa.tab.cost[0];
                    }

                    costRes(ary, () => {
                        if (this._hastimes > 0) {
                            NetManager.getInstance().protocolos.use_moneytree();
                        } else {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数不足，提升vip等级可增加每日上限哦", 99);
                        }
                    }, () => {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    });

                    // if (this._canbuy) {
                    //     if (this._hastimes > 0) {

                    //         NetManager.getInstance().protocolos.use_moneytree();
                    //     } else {
                    //         msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数不足，提升vip等级可增加每日上限哦", 99);
                    //     }
                    // } else {
                    //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    // }
                    break
                default:
                    break;
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}