module welfare {

    export class WelfareRefill extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _frameRender: FrameUIRender;


        public dispose(): void {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
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

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private d_pro: UICompenent
        private d_info: UICompenent
        private selbtn: FrameCompenent
        private propAry: Array<UICompenent>
        private txtAry: Array<UICompenent>
        private resAry: Array<UICompenent>
        private initView(): void {
            var renderLevel = this._baseRender;

            //大背景
            var ui: UICompenent = (<WelfareUiPanel>this.parent).loadBigPicByUrl("ui/uidata/welfare/refillbg.jpg");
            this.parent.setSizeForPanelUiCopy(ui, "d_basebg", this._baseRender);

            this.propAry = new Array
            this.txtAry = new Array
            this.resAry = new Array
            for (let i = 0; i < 3; i++) {
                this.propAry.push(this.addChild(renderLevel.getComponent("d_prop" + i)));
                this.resAry.push(this.addEvntButUp("d_rew" + i, renderLevel));
                this.txtAry.push(this.addChild(renderLevel.getComponent("d_txt" + i)));
            }

            this.d_pro = this.addChild(this._bottomRender.getComponent("d_pro"));

            this.selbtn = <FrameCompenent>this.addChild(renderLevel.getComponent("selbtn"));
            this.selbtn.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.d_info = this.addChild(renderLevel.getComponent("d_info"));
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
                        this.effAry[i].x = this.resAry[i].x - 30
                        this.effAry[i].y = this.resAry[i].y - 30
                        // this.effAry[i].width = this.effAry[i].baseRec.width * 0.7;
                        // this.effAry[i].height = this.effAry[i].baseRec.height * 0.7;
                        this.effAry[i].speed = 3;
                    }
                    this.playEff();
                }, this.resAry.length);

            }
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this.resAry.length; i++) {
                if(this.resAry[i].data){
                    if (this.resAry[i].data[0] == 1) {
                        this.addChild(this.effAry[i]);
                        this.effAry[i].play();
                    } else {
                        this.removeChild(this.effAry[i]);
                    }
                }
            }
        }

        public resize(): void {
            super.resize();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            (<WelfareUiPanel>this.parent).addBigPic();
            this.resetData();
        }

        public hide(): void {
            (<WelfareUiPanel>this.parent).removeBigPic();
            UIManager.getInstance().removeUIContainer(this);
        }

        public resetData(): void {
            var tabary: Array<tb.TB_recharge_7day_extra_reward> = tb.TB_recharge_7day_extra_reward.get_TB_quest_adventure_base();
            var flagary: Array<boolean> = GuidData.quest.getRefillrewardflag();
            var rechargeday: number = GuidData.quest.getRechargeDay();
            //进度条进度
            var proratio: number = 0;
            for (let i = 0; i < tabary.length; i++) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.txtAry[i].skinName, "累充" + tabary[i].day + "天", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                var state: number = 2
                if (!flagary[i]) {
                    state = tabary[i].day > rechargeday ? 0 : 1
                }

                if (state > 0) {
                    proratio = i * 0.5
                }
                this.resAry[i].data = [state, tabary[i].id, tabary[i].reward[0][0]]
                this.drawIcon(this.resAry[i], tabary[i].reward[0][0], tabary[i].reward[0][1], state);
            }

            this.d_pro.scale = proratio

            this.setUiListVisibleByItem([this.d_info], rechargeday < 7);
            if (rechargeday < 7) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, "D_day", String(rechargeday), 32, TextAlign.CENTER, ColorType.Whitefff4d6);
            }

            var $objreward: Array<Array<number>>
            if (GuidData.quest.isRefillToDay()) {
                rechargeday = Math.max(rechargeday,1);
                $objreward = TableData.getInstance().getData(TableData.tb_recharge_7day_reward, rechargeday)["reward"];
            } else {
                rechargeday = Math.min(rechargeday,7);
                $objreward = TableData.getInstance().getData(TableData.tb_recharge_7day_reward, rechargeday + 1)["reward"];
            }

            for (let k = 0; k < $objreward.length; k++) {
                IconManager.getInstance().drawItemIcon60(this.propAry[k], $objreward[k][0], $objreward[k][1]);
            }

            this.selbtn.goToAndStop(GuidData.quest.isRefillToDay() ? 0 : 1);

            this.playEff();
            this.resize();
        }

        /**
         * @param  $state 0不可领取 1可领取 2已领取
         */
        private drawIcon($ui: UICompenent, $id: number, $num: number, $state: number) {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($id);
            IconManager.getInstance().getIconName(obj.icon,
                ($img) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    if (obj.type == 1) {//装备
                        UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                        ArtFont.getInstance().writeFontToCtxCenten(ctx, String(obj.level), ArtFont.num63, 18, 4, 4);
                    }

                    if ($num > 1) {
                        var strNum: string = Snum($num)
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, strNum, 16, 64, 45, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    }
                    if ($state == 0) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
                    }
                    if ($state == 2) {
                        var StateRect2 = this._baseRender.uiAtlas.getRec("iconrec");
                        ctx.drawImage(this._baseRender.uiAtlas.useImg, StateRect2.pixelX, StateRect2.pixelY, StateRect2.pixelWitdh, StateRect2.pixelHeight, 3, 20, StateRect2.pixelWitdh, StateRect2.pixelHeight);

                    }
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.selbtn:
                    if (!GuidData.quest.isRefillToDay()) {
                        ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                    }
                    break;
                default:
                    if (evt.target.data[0] == 1) {
                        NetManager.getInstance().protocolos.get_seven_day_recharge_extra_reward(evt.target.data[1]);
                    } else if (evt.target.data[0] == 0) {
                        //查看奖励信息
                        var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(evt.target.data[2]);

                        var bag: BagItemData = new BagItemData();
                        bag.entryData = obj;

                        var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                        aa.data = bag;
                        aa.buttonType = -1;
                        ModuleEventManager.dispatchEvent(aa);
                    }
                    break;
            }
        }
    }
}