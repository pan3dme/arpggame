module copytask {

    export class TeamcopyUiPanel extends UIVirtualContainer {
        private _winmidRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _bigPic: UIRenderOnlyPicComponent;

        public dispose(): void {
            this._topRender.dispose();
            this._topRender = null;
            this._baseRender.dispose();
            this._baseRender = null;

            if (this.treasureList) {
                this.treasureList.dispose();
                this.treasureList = null;
            }

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._winmidRender = new UIRenderComponent;
            this.addRender(this._winmidRender)
            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

        }

        public initUiAtlas($uiAtlas, $publicuiAtlas, $winmidRender: UIRenderComponent): void {
            this._bigPic.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winmidRender = $winmidRender
            this.initView();
        }

        public treasureList: TeamCopyList;
        private a_listindex: UICompenent;
        // private b_pic: UICompenent;
        private b_info: UICompenent;
        private b_neednum: UICompenent;
        private b_recomforce: UICompenent;
        private b_taskname: UICompenent;
        private cnew_btn1: UICompenent;
        private b_buynum: UICompenent;
        private b_vip_add: UICompenent;
        private b_desc: FrameCompenent;
        private b_rewardtitle: FrameCompenent;
        private rewarduiary: Array<UICompenent>;
        private rewardtxtuiary: Array<UICompenent>;
        private bguiary: Array<UICompenent>;
        private initView(): void {
            var renderLevel = this._baseRender;

            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));  

            var cnew_bg_yellow = this._winmidRender.getComponent("cnew_bg_yellow");
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._baseRender);
            var cnew_right_bg_top = this._winmidRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            var cnew_right_bg_bottom = this._winmidRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);

            this._winmidRender.applyObjData();

            this.bguiary = new Array
            this.bguiary.push(cnew_bg_yellow);
            this.bguiary.push(cnew_right_bg_top);
            this.bguiary.push(cnew_right_bg_bottom);

            this.a_listindex = this.addChild(renderLevel.getComponent("a_listindex"));


            // this.b_pic = this.addChild(renderLevel.getComponent("b_pic"));
            this.b_info = this.addChild(renderLevel.getComponent("b_info"));
            this.b_neednum = this.addChild(renderLevel.getComponent("b_neednum"));
            this.b_recomforce = this.addChild(renderLevel.getComponent("b_recomforce"));
            this.b_taskname = this.addChild(renderLevel.getComponent("b_taskname"));
            this.b_vip_add = this.addChild(renderLevel.getComponent("b_vip_add"));
            
            this.b_buynum = this.addEvntBut("b_buynum", renderLevel);

            this.b_desc = <FrameCompenent>this.addChild(renderLevel.getComponent("b_desc"));

            this.addUIList(["b_title", "b_recomforcetxt", "b_neednumtxt", "b_bgleft", "b_bg1", "b_bg_center", "b_bg2", "b_bgright", "b_btntxt"], renderLevel);

            this.addChild(this._topRender.getComponent("b_titletxt"));
            this.b_rewardtitle = <FrameCompenent>this.addChild(this._topRender.getComponent("b_rewardtitle"));

            this.rewarduiary = new Array
            this.rewardtxtuiary = new Array
            for (var i = 0; i < 6; i++) {
                this.rewarduiary.push(this._topRender.getComponent("b_reward" + i));
                this.rewardtxtuiary.push(this._topRender.getComponent("b_rewardtxt" + i));
            }

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this._publicRender.applyObjData();
        }

        public resize(): void {
            super.resize();
            if (this.treasureList) {
                this.treasureList.left = this.a_listindex.parent.x / UIData.Scale + this.a_listindex.x
                this.treasureList.top = this.a_listindex.parent.y / UIData.Scale + this.a_listindex.y
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.treasureList) {
                this.treasureList = new TeamCopyList();
                this.treasureList.init(this._baseRender.uiAtlas);
            }
            
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_vip_add.skinName, getvipadd("groupReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            
            this.setUiListVisibleByItem(this.bguiary,true);
            this.treasureList.show();
            this.drawBuynum();
            this.resize();
        }

        public hide(): void {
            this.setUiListVisibleByItem(this.bguiary,false);
            UIManager.getInstance().removeUIContainer(this);
            if (this.treasureList) {
                this.treasureList.hide();
            }
        }

        private _itdata: TeamCopyItemVo;
        private _curstate: number;//1：可升级 2：未解锁 3：已满级
        public resetData($data: TeamCopyItemVo): void {
            this._itdata = $data;
            this._bigPic.setImgUrl(getTeamcopyIconUrl($data.tabvo.map_pic));
            // this._baseRender.uiAtlas.upDataPicToTexture(getTeamcopyIconUrl($data.tabvo.map_pic), this.b_pic.skinName);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_taskname.skinName, $data.tabvo.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_neednum.skinName, $data.tabvo.need_Num + "人", 14, TextAlign.LEFT, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_recomforce.skinName, String($data.tabvo.recom_force), 14, TextAlign.LEFT, GuidData.player.getForce() >= $data.tabvo.recom_force ? ColorType.Green2ca937 : ColorType.colorcd2000);
            var rewardvoary: Array<Array<number>> = new Array
            if ($data.state == 2) {
                this.b_desc.goToAndStop(0);
                this.b_rewardtitle.goToAndStop(1);
            } else {
                this.b_desc.goToAndStop(1);
                this.b_rewardtitle.goToAndStop(0);
            }

            LabelTextFont.writeText(this._baseRender.uiAtlas, this.b_info.skinName, 0, 0, $data.tabvo.info, 14, ColorType.color9a683f, 155, true);

            var rewardlist = this.getrewardAry($data.state, $data.tabvo);
            for (var i = 0; i < 6; i++) {
                if (i >= rewardlist.length) {
                    //清空绘制
                    this.setUiListVisibleByItem([this.rewarduiary[i], this.rewardtxtuiary[i]], false);
                } else {
                    this.setUiListVisibleByItem([this.rewarduiary[i], this.rewardtxtuiary[i]], true);
                    IconManager.getInstance().drawItemIcon60(this.rewarduiary[i], rewardlist[i][0], rewardlist[i][1]);
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.rewardtxtuiary[i].skinName, GameData.getPropName(rewardlist[i][0]), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }
            }
        }

        public drawBuynum() {
            var tab = tb.TB_group_instance_buy.getTempVo(1);
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.b_buynum.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
            UiDraw.cxtDrawImg(ctx, PuiData.BTNADD, new Rectangle(112, 2, 30, 30), UIData.publicUi);
            LabelTextFont.writeSingleLabelToCtx(ctx, "挑战次数:" + GuidData.instanceData.getTeamCopyNum() + "/" + tab.daily_reset, 14, 8, 7, TextAlign.LEFT, ColorType.Brown7a2f21);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        //获得奖励列表
        private getrewardAry($state: number, $tab: tb.TB_group_instance_base): Array<Array<number>> {
            var c: Array<Array<number>> = new Array;
            var a: Array<number>;
            var b: Array<number>;
            if ($state == 2) {
                a = $tab.passRewardId
                b = $tab.passRewardCnt
            } else {
                a = $tab.fpRewardId
                b = $tab.fpRewardCnt
            }
            for (var i = 0; i < a.length; i++) {
                c.push([a[i], b[i]]);
            }
            return c;
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.cnew_btn1:
                    //匹配
                    if (this._itdata.state < 3) {
                        if (GuidData.instanceData.getTeamCopyNum() > 0 || this._itdata.state == 1) {
                            NetManager.getInstance().protocolos.group_instance_match(this._itdata.tabvo.id);
                        } else {
                            //次数不足
                            AlertUtil.show("挑战次数不足，是否前往购买？", "提示", (a: any) => {
                                if (a == 1) {
                                    this.showbuypanel();
                                }
                            },2,["前往购买","取消"])
                        }
                    } else {
                        //未开启
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "未解锁", 99)
                    }

                    break;
                case this.b_buynum:
                    //购买次数
                    this.showbuypanel();
                    break;

                default:
                    break;
            }
        }


        private showbuypanel() {
            var tab = tb.TB_group_instance_buy.getTempVo(1);
            var resary: Array<Array<number>> = new Array;
            for (var i = GuidData.instanceData.getBuyTeamCopyNum(); i < tab.buy_type.length; i++) {
                resary.push([tab.buy_type[i], tab.buy_price[i]]);
            }

            var $evt: popbuy.PopBuyEvent = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL)
            $evt.resoureItem = resary;
            // $evt.Type = popbuy.PopBuyType.SPEEDBUILD;
            $evt.Info1 = "组队副本剩余可购买";
            $evt.cutNum = tab.buy_price.length - GuidData.instanceData.getBuyTeamCopyNum();
            if ($evt.cutNum > 0) {
                $evt.SubmitFun = (value: number) => {
                    NetManager.getInstance().protocolos.buy_group_instance_times(value);
                }
                ModuleEventManager.dispatchEvent($evt);
            } else {
                msgtip.MsgTipManager.outStrById(22, 58);
            }
        }
    }

    export class TeamCopyList extends SList {

        public constructor() {
            super();
            this.left = 47;
            this.top = 83;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, TeamCopyListRender, 223, 435, 0, 81, 5, 256, 1024, 1, 8, 2);
        }

        public refreshDataByNewData(): void {
            var $sListItemData: Array<SListItemData> = this.getData(CopytaskModel.getInstance().getList());
            this.refreshData($sListItemData);
            this.setSelectIndex(0);
        }

        public getData($data: Array<TeamCopyItemVo>): Array<SListItemData> {
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
            this.refreshDataByNewData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class TeamCopyListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private UnlockBg: UICompenent;
        private Sname: UICompenent;
        private Slev: UICompenent;
        private Spass: UICompenent;
        private Sselect: UICompenent;
        private Spic: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var cententRender: UIRenderComponent = this._customRenderAry[0];
            var topRender: UIRenderComponent = this._customRenderAry[1];

            this.UnlockBg = this.creatGrid9SUI(cententRender, this.parentTarget.baseAtlas, "UnlockBg", 0, 0, 223, 76, 15, 15);
            $container.addChild(this.UnlockBg);

            this.Sname = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Sname", 71, 15, 100, 20);
            $container.addChild(this.Sname);

            this.Slev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Slev", 176, 17, 40, 18);
            $container.addChild(this.Slev);

            this.Sselect = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Sselect", 0, 0, 223, 76, 15, 15);
            $container.addChild(this.Sselect);
            this.Sselect.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.Spass = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Spass", 163, 44, 45, 18);
            $container.addChild(this.Spass);
            this.Spic = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Spic", 0, 2, 220, 72);
            $container.addChild(this.Spic);
        }


        private drawIcon(): void {
            var $vo: TeamCopyItemVo = this.itdata.data
            IconManager.getInstance().getIcon(getTeamcopyIconUrl($vo.tabvo.map_pic + "_b"),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Spic.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 3, 1, $rec.pixelWitdh, $rec.pixelHeight);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyrender();
            }
            if (val) {
                var $evt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SELECT_ITEM_EVENT);
                $evt.data = this.itdata;
                ModuleEventManager.dispatchEvent($evt);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: TeamCopyItemVo = this.itdata.data

                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_select);
                } else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }

                this.drawIcon();

                if ($vo.state == 3) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.limLev + "级解锁", 16, TextAlign.RIGHT, ColorType.Yellowffecc6);
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                    LabelTextFont.clearLabel(this.uiAtlas, this.Slev.skinName);
                    LabelTextFont.clearLabel(this.uiAtlas, this.Spass.skinName);
                } else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                    LabelTextFont.clearLabel(this.uiAtlas, this.UnlockBg.skinName);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Slev.skinName, $vo.tabvo.limLev + "级", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                    var passstr: string = "已通关";
                    var passcolor: string = ColorType.Green2ca937;
                    if ($vo.state == 1) {
                        passstr = "未通关"
                        passcolor = ColorType.colorcd2000
                    }
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Spass.skinName, passstr, 14, TextAlign.RIGHT, passcolor);
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
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.UnlockBg);
            UiDraw.clearUI(this.Sname);
            UiDraw.clearUI(this.Slev);
            UiDraw.clearUI(this.Spass);
            UiDraw.clearUI(this.Sselect);
            UiDraw.clearUI(this.Spic);
        }
    }


}