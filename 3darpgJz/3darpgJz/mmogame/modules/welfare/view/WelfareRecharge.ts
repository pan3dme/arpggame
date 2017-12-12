module welfare {

    export class WelfareRecharge extends UIVirtualContainer {
        private _bigPic: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._bigPic.dispose();
            this._bigPic = null;
            this._baseRender.dispose();
            this._baseRender = null;

            if (this.welfareRechargeList) {
                this.welfareRechargeList.dispose();
                this.welfareRechargeList = null;
            }

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            // this._bottomRender = new UIRenderComponent;
            // this.addRender(this._bottomRender)
            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._bigPic.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this.initView();

        }

        public welfareRechargeList: WelfareRechargeList;
        private slistIndex2: UICompenent;
        private initView(): void {
            var renderLevel = this._baseRender;

            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));
            this._bigPic.setImgUrl("ui/uidata/welfare/adbg.png");


            var t_info = this.addChild(<UICompenent>renderLevel.getComponent("t_info"));
            var tab = tb.TB_welfare_base.get_TB_welfare_baseById(1);

            LabelTextFont.writeTextAutoVerticalCenter(this._baseRender.uiAtlas, t_info.skinName, "活动说明：" + tab.recharge_info, 16, ColorType.Brown40120a, 545,"", true);

            // var tabvo: Array<tb.TB_welfare_level_show> = tb.TB_welfare_level_show.get_TB_welfare_level_show();
            // for (var i = 0; i < tabvo[0].item.length; i++) {
            //     var aa: UICompenent = this.addEvntButUp("l_reward" + i, renderLevel);
            //     aa.data = tabvo[0].item[i]
            //     this.drawReward(aa);
            // }

            // this.addChild(<UICompenent>renderLevel.getComponent("a_37"));


            // this.addChild(<UICompenent>renderLevel.getComponent("a_36"));

            // this._lev = this.addChild(<UICompenent>renderLevel.getComponent("lev"));
            this.slistIndex2 = this.addChild(<UICompenent>renderLevel.getComponent("slistIndex2"));
        }


        public resize(): void {
            super.resize();
            if (this.welfareRechargeList) {
                this.welfareRechargeList.left = this.slistIndex2.parent.x / UIData.Scale + this.slistIndex2.x
                this.welfareRechargeList.top = this.slistIndex2.parent.y / UIData.Scale + this.slistIndex2.y
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.welfareRechargeList) {
                this.welfareRechargeList.hide();
            }
        }

        public resetData(): void {
            if (!this.welfareRechargeList) {
                this.welfareRechargeList = new WelfareRechargeList();
                this.welfareRechargeList.init(this._baseRender.uiAtlas);
            }
            this.welfareRechargeList.show();
            this.resize();
        }
    }


    /**
     * 充值返利list
     */
    export class WelfareRechargeList extends SList {

        public constructor() {
            super();
            this.left = 222;
            this.top = 192;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, WelfareGeneralListRender, 681, 319, 0, 83, 3, 512, 512, 1, 6);
        }

        /**
         * refreshData
         */
        private _everycheckinlist: Array<RechargeRewardItemData>;
        private compareAry($ary: Array<RechargeRewardItemData>): boolean {
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
            var a: Array<RechargeRewardItemData> = GuidData.quest.getRechargeRewardList();
            if (this._everycheckinlist) {
                $flag = this.compareAry(a);
            }

            if ($flag) {
                console.log("数据变化了");
                this._everycheckinlist = a;
                var $sListItemData: Array<SListItemData> = this.getData(this._everycheckinlist);
                this.refreshData($sListItemData);
            }
        }


        public getData($data: Array<RechargeRewardItemData>): Array<SListItemData> {
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
            this.refreshAndselectIndex();
        }

        public refreshAndselectIndex(): void {
            // var num: number = Math.floor(GuidData.quest.getcurDays() / 7);
            // console.log("num----", num);
            // this.scrollY(100);
            this.refreshDataByNewData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class WelfareGeneralListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Txt: UICompenent;
        private Cost: UICompenent;
        private I2reward0: UICompenent;
        private I2reward1: UICompenent;
        private I2reward2: UICompenent;
        private I2reward3: UICompenent;
        private I2btn: UICompenent;
        private I2tembg: UICompenent;

        private _ary: Array<UICompenent>
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Txt", 12, 34, 36, 20);
            $container.addChild(this.Txt);

            this.Cost = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cost", 59, 19, 100, 35);
            $container.addChild(this.Cost);

            this._ary = new Array;
            this.I2reward0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward0", 171, 8, 68, 68);
            $container.addChild(this.I2reward0);
            this.I2reward0.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward0);
            this.I2reward1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward1", 251, 8, 68, 68);
            $container.addChild(this.I2reward1);
            this.I2reward1.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward1);
            this.I2reward2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward2", 331, 8, 68, 68);
            $container.addChild(this.I2reward2);
            this.I2reward2.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward2);
            this.I2reward3 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2reward3", 411, 8, 68, 68);
            $container.addChild(this.I2reward3);
            this.I2reward3.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.I2reward3);

            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 536, 19, 105, 46);
            $container.addChild(this.I2btn);
            this.I2btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);

            this.I2tembg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2tembg", 0, 0, 681, 83);
            $container.addChild(this.I2tembg);
        }

        private drawBtn(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.I2btn.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var btnstateRect1: UIRectangle;
            if (this.itdata.data.state == 1) {
                //领取
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("receivebtn");
            } else if (this.itdata.data.state == 2) {
                //未达到
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("no");
            } else {
                //已领取
                btnstateRect1 = this.parentTarget.baseAtlas.getRec("ok");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, btnstateRect1.pixelX, btnstateRect1.pixelY, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight, 0, 0, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                //奖励
                for (var i = 0; i < this._ary.length; i++) {
                    var vo = this.itdata.data
                    if (i < this.itdata.data.data.item.length) {
                        this._ary[i].data = vo.data.item[i]
                        // this.drawIcon(this._ary[i]);
                        IconManager.getInstance().drawItemIcon60(this._ary[i],vo.data.item[i][0],vo.data.item[i][1],vo.state == 3,false)
                    } else {
                        this._ary[i].data = null
                        UiDraw.clearUI(this._ary[i]);
                    }
                }
                var txt:string;
                if (this.itdata.data.type == SharedDef.MODULE_WELFARE_CONSUME) {
                    txt = "TxtCost";
                } else if (this.itdata.data.type == SharedDef.MODULE_WELFARE_RECHARGE) {
                    txt = "TxtRecharge";
                }
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Txt.skinName, txt);

                UiDraw.drawRewardIconAndtxt(this.Cost, [1, this.itdata.data.data.money], false, TextAlign.LEFT,18);

                this.drawBtn();

                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2tembg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
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

            var ary: Array<number> = evt.target.data
            if (ary && ary.length > 0) {
                //查看物品详情
                var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(ary[0]);

                var bag: BagItemData = new BagItemData();
                bag.entryData = obj;

                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                aa.data = bag;
                aa.buttonType = -1;
                ModuleEventManager.dispatchEvent(aa);
            }
        }

        private btnChick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                if (this.itdata.data.state == 1) {
                    if (this.itdata.data.type == SharedDef.MODULE_WELFARE_CONSUME) {
                        NetManager.getInstance().protocolos.welfare_get_consume_reward(this.itdata.data.data.id);
                    } else if (this.itdata.data.type == SharedDef.MODULE_WELFARE_RECHARGE) {
                        NetManager.getInstance().protocolos.welfare_get_recharge_reward(this.itdata.data.data.id);
                    }
                }
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.Txt);
            UiDraw.clearUI(this.Cost);
            UiDraw.clearUI(this.I2reward0);
            UiDraw.clearUI(this.I2reward1);
            UiDraw.clearUI(this.I2reward2);
            UiDraw.clearUI(this.I2reward3);
            UiDraw.clearUI(this.I2btn);
            UiDraw.clearUI(this.I2tembg);
        }
    }


}