module activity {
    export class RewardVo {
        public data: tb.TB_activity_reward;//表数据
        public index: number;//索引
        public hasvip: boolean;//是否为vip礼包
        public hasreceive: boolean;//是否领取
        public conditionsok: boolean;//是否活跃值达到
    }

    export class ActivityUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _frameRender: FrameUIRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }

            if (this.everydayActivityList) {
                this.everydayActivityList.dispose();
                this.everydayActivityList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/activity/activity.xml", "ui/uidata/activity/activity.png", () => { this.loadConfigCom() }, "ui/uidata/activity/activitypc.png");
        }

        private pro_base: UICompenent
        private currentNum: UICompenent
        private slistIndex: UICompenent
        private _fraary: Array<FrameCompenent>
        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._baseRender;

            this._fraary = new Array;
            this._fraary.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_1_0")));
            this._fraary.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_1_1")));
            this._fraary.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_1_2")));
            this._fraary.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_1_3")));
            this._fraary.push(<FrameCompenent>this.addChild(this._topRender.getComponent("a_1_4")));

            this.addUIList(["a_3", "a_bg", "a_line_bg", "a_line", "a_title"], this._bgRender);

            this.slistIndex = this.addChild(<UICompenent>renderLevel.getComponent("slistIndex"));

            this._Uiary = new Array

            this.pro_base = this.addChild(<UICompenent>renderLevel.getComponent("a_line_base"));
            this.currentNum = this.addChild(<UICompenent>renderLevel.getComponent("a_2"));

            var $tabAryReward: Array<tb.TB_activity_reward> = tb.TB_activity_reward.get_TB_activity_reward();
            var $num: number = 0;
            for (var i = 0; i < $tabAryReward.length; i++) {
                var a = this.addChild(<UICompenent>renderLevel.getComponent("a_active" + i));
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a.skinName, String($tabAryReward[i].active), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

                var flag: boolean = false;
                if ($tabAryReward[i].vipreward.length > 0) {
                    flag = true;
                }
                //绘制普通奖励
                var baseui = this.initUI($tabAryReward[i], i * 2, i, false);
                //绘制vip
                if (flag) {
                    var vipui = this.initUI($tabAryReward[i], i * 2 + 1, i, true);
                    //设置位置
                    vipui.x = this._KeyLocation[i] + 51
                    baseui.x = this._KeyLocation[i]
                } else {
                    //没有vip奖励时，居中显示
                    baseui.x = this._KeyLocation[i] + 26
                }
            }

            this.buildFram();

            this.setProgressAndAchievement(GuidData.instanceData.getActivity());

            this.applyLoadComplete();
        }

        private _Uiary: Array<UICompenent>
        private initUI($tabvo: tb.TB_activity_reward, $num: number, $index: number, $hasvip: boolean): UICompenent {
            var rewardvo: RewardVo = new RewardVo();
            rewardvo.data = $tabvo
            rewardvo.hasvip = $hasvip;
            rewardvo.index = $index;

            var prop: UICompenent = this.addChild(<UICompenent>this._topRender.getComponent("prop_" + $num));
            prop.data = rewardvo;
            prop.addEventListener(InteractiveEvent.Up, this.PropClik, this);
            this._Uiary.push(prop);
            this.Receivereward(prop);

            return prop;
        }

        public resetRewardState(): void {
            for (var i = 0; i < this._Uiary.length; i++) {
                this.Receivereward(this._Uiary[i]);
            }
            this.playEff();
        }

        private Receivereward($ui: UICompenent): void {

            var $rewardState: Array<boolean> = GuidData.instanceData.getActivityRewardState()
            var $data: RewardVo = $ui.data;

            if (GuidData.instanceData.getActivity() >= $data.data.active) {
                $data.conditionsok = true;
                if ($data.hasvip) {
                    $data.hasreceive = $rewardState[$data.index * 2 + 1]
                } else {
                    $data.hasreceive = $rewardState[$data.index * 2]
                }
            } else {
                $data.conditionsok = false;
            }
            $ui.data = $data;

            this.drawProp($ui);
        }

        private drawProp($ui: UICompenent): void {
            var $data: RewardVo = $ui.data
            var icon: string;
            var rewardnum: number;
            var $vo: tb.TB_item_template;
            if ($data.hasvip) {
                $vo = tb.TB_item_template.get_TB_item_template($data.data.vipreward[0][0])
                rewardnum = $data.data.vipreward[0][1]
            } else {
                $vo = tb.TB_item_template.get_TB_item_template($data.data.reward[0][0])
                rewardnum = $data.data.reward[0][1]
            }
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(1, 0, 48, 48), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(3, 2, 44, 44), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 5, 4, 40, 40);

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String(rewardnum), 14, 44, 30, TextAlign.CENTER);

                    if ($data.hasvip) {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_V, new Rectangle(5, 29, 22, 19), UIData.publicUi);
                    }
                    if ($data.conditionsok) {
                        //可领取   
                        if ($data.hasreceive) {
                            //已领取
                            UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 50, 48))
                            var imgUseRect1: UIRectangle = this._topRender.uiAtlas.getRec("receive")
                            ctx.drawImage(this._baseRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 12, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
                        } else {
                            //未领取
                            // UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(2, 1, 46, 46), UIData.publicUi);
                            if ($data.hasvip) {
                                if (GuidData.player.getIsVIP()) {
                                    UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(33, 0, 17, 16), UIData.publicUi);
                                }
                            } else {
                                UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(33, 0, 17, 16), UIData.publicUi);
                            }
                        }
                    } else {
                        //不可领取
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 50, 48))
                    }
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }



        private setProgressAndAchievement($num: number): void {
            this.currentAchievementNum($num);
            var anum = $num / this.getTotal();
            this.pro_base.uvScale = anum > 1 ? 1 : anum;

            var tabary = tb.TB_activity_reward.get_TB_activity_reward();
            for (var i = 0; i < this._fraary.length; i++) {

                if ($num < tabary[i].active) {
                    this._fraary[i].goToAndStop(1);
                } else {
                    this._fraary[i].goToAndStop(0);
                }
            }
        }


        private currentAchievementNum($num: number): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.currentNum.skinName, $num + "/" + this.getTotal(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        private getTotal(): number {
            var tabary = tb.TB_activity_reward.get_TB_activity_reward();
            return tabary[tabary.length - 1].active;
        }

        private effAry: Array<FrameTipCompenent>;
        private buildFram(): void {
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, ($ary: any) => {
                    this.effAry = $ary;
                    for (var i: number = 0; i < this.effAry.length; i++) {
                        this.effAry[i].x = this._Uiary[i].x - 20
                        this.effAry[i].y = this._Uiary[i].y - 20
                        this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        this.effAry[i].speed = 3;
                    }
                    this.playEff();
                }, this._Uiary.length);

            }
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this._Uiary.length; i++) {
                var vo: RewardVo = this._Uiary[i].data;
                if (vo && vo.conditionsok && !vo.hasreceive) {
                    this.addChild(this.effAry[i]);
                    this.effAry[i].play();
                } else {
                    this.removeChild(this.effAry[i]);
                }
            }
        }

        private PropClik(evt: InteractiveEvent): void {
            var $data: RewardVo = <RewardVo>evt.target.data
            if ($data.conditionsok && !$data.hasreceive) {
                //可以领取
                var flag: boolean = false;
                if ($data.hasvip && GuidData.player.getIsVIP()) {
                    flag = true;
                } else if (!$data.hasvip) {
                    flag = true;
                } else {
                    AlertUtil.show("充值vip即可领取", "领取提示", (a: any) => {
                        if (a == 1) {
                            //购买vip
                            ModulePageManager.openPanel(SharedDef.MODULE_MALL, [2]);
                        }
                    },2,["前往充值","取消"])
                }

                if (flag) {
                    // console.log("领取奖励", $data.index, $data.hasvip);
                    NetManager.getInstance().protocolos.get_activity_reward($data.index + 1, $data.hasvip ? 1 : 0);
                }
            } else {
                //查看奖励信息
                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                if ($data.hasvip) {
                    aa.id = $data.data.vipreward[0][0];
                } else {
                    aa.id = $data.data.reward[0][0];
                }
                ModuleEventManager.dispatchEvent(aa);
            }
        }

        private _KeyLocation = [249, 385, 519, 654, 789];

        public resetData(): void {
            this.resetRewardState();
            this.setProgressAndAchievement(GuidData.instanceData.getActivity());
        }


        public everydayActivityList: EverydayActivityList
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.everydayActivityList) {
                this.everydayActivityList = new EverydayActivityList();
                this.everydayActivityList.init(this._baseRender.uiAtlas);
            }
            this.everydayActivityList.show();
            console.log("---show----");
            this.resetData();
            this.resize();
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.everydayActivityList) {
                this.everydayActivityList.hide();
            }
            ModulePageManager.hideResTittle();
        }


        public resize(): void {
            super.resize();
            if (this.everydayActivityList) {
                this.everydayActivityList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x;
                this.everydayActivityList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y;
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.HIDE_ACTIVITY_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}