module faction {
    export class FactionBossRender extends SListItem {
        public static baseAtlas: UIAtlas;


        private C_list_cell:UICompenent
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var centerRender: UIRenderComponent = this._customRenderAry[0];
            var topRender: UIRenderComponent = this._customRenderAry[1];

            this.C_list_cell = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "C_list_cell", 0, 0, 256, 80);
            $container.addChild(this.C_list_cell);
    
            
        }


        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
            if (val) {
                var bb = new faction.FactionBossEvent(faction.FactionBossEvent.CLICK_BOSS_ITEM);
                bb.data = this.itdata.data;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }
        /*
        private drawToUiAtlasToCtx($ctx: CanvasRenderingContext2D, $fromuiAtlas: UIAtlas, $shareName:string,$posRect:Rectangle): void
        {
            var imgUseRect: UIRectangle = $fromuiAtlas.getRec($shareName)
            if (!$posRect) {
                $posRect=new Rectangle(0,0,0,0)
            }
            if ($posRect.width > 1 && $posRect.height > 1) {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, $posRect.width, $posRect.height);
            } else {
                $ctx.drawImage($fromuiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, $posRect.x, $posRect.y, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
            }

        }
        */
        private applyrender(): void {
            var vo: FBossItemVo = this.itdata.data
    

            LoadManager.getInstance().load(Scene_data.fileRoot + getUIIconUrl(String(vo.data.entry)), LoadManager.IMG_TYPE,
                ($img: any) => {
          

                    var $touiAtlas: UIAtlas = this.uiAtlas
                    var $fromuiAtlas: UIAtlas = this.parentTarget.baseAtlas;
                    var $skinName: string = this.C_list_cell.skinName;
                    var $uiRectangle: UIRectangle = $touiAtlas.getRec($skinName)
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);

                    if (this.selected) {
                        UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_select_bg", new Rectangle(0, 0, 256, 80))
                    }
                    UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_icon_bg", new Rectangle(6, 11))

                    $ctx.drawImage($img, 0, 0, 65, 65, 6+4, 11+4, 52, 52);

                    LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Green20a200 + vo.data1.name, 18, 75, 14, TextAlign.LEFT)
                    if (vo.state == 1) {
                        //正在挑战
                        UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_tiaozhan", new Rectangle(195, 6))
                        LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Orange853d07 + "剩余时间:" + ColorType.colorce0a00 + vo.time[0] + ":" + vo.time[1], 14, 75, 46, TextAlign.LEFT)
                    } else if (vo.state == 3) {
                        UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_tiaozhan", new Rectangle(195, 6))
                        LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Orange853d07 + "倒计时间:" + ColorType.colorce0a00 + vo.time[0] + ":" + vo.time[1], 14, 75, 46, TextAlign.LEFT)
                    }
                    if (vo.state1 == 1) {
                        //已通关
                        UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_pass", new Rectangle(185, 18))
                    }
                    if (vo.state1 == 3) {
                        //未开放
                        var str: string = "";
                        if (vo.data.faction_lv_limit > GuidData.faction.getLev()) {
                            str = "帮会" + vo.data.faction_lv_limit + "级解锁";
                            UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_mask", new Rectangle(0, 0, 256, 80))
                            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whiteffffff + str, 20, 75, 25, TextAlign.LEFT)
                        } else {
                            str = "击杀上一个boss解锁";
                            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Orange853d07 + str, 14, 75, 46, TextAlign.LEFT)
                        }

                    }
                    UiDraw.drawToUiAtlasToCtx($ctx, $fromuiAtlas, "S_line", new Rectangle(0, 0, 256, 4))
                    TextureManager.getInstance().updateTexture($touiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, $ctx);


                });



           
 
          //  FactionBossRender.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.C_list_cell.skinName, "S_tiaozhan");
            /*
            FactionBossRender.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.B_bottom_line.skinName, "S_line");
            UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.B_head_icon.skinName, "S_icon_bg");
            //boss名字
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.BossName.skinName, ColorType.Green20a200 + vo.data1.name, 18, TextAlign.LEFT);
            if (vo.state == 1) {
                //正在挑战
                UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.Challenge.skinName, "S_tiaozhan");
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, vo.time[0] + ":" + vo.time[1], 16, TextAlign.CENTER);
            } else if (vo.state == 3) {
                UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.Challenge.skinName, "S_tiaozhan");
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, ColorType.Orange + vo.time[0] + ":" + vo.time[1], 16, TextAlign.CENTER);
            } else {
                this.uiAtlas.clearCtxTextureBySkilname(this.Challenge.skinName)
                this.uiAtlas.clearCtxTextureBySkilname(this.Time.skinName)
            }

            if (vo.state1 == 1) {
                //已通关
                UiDraw.SharedDrawImg(this.uiAtlas, FactionBossRender.baseAtlas, this.Over.skinName, "S_pass");
            } else {
                this.uiAtlas.clearCtxTextureBySkilname(this.Over.skinName)

            }
            if (vo.state1 == 3) {
                //未开放
                var str: string = "";
                if (vo.data.faction_lv_limit > GuidData.faction.getLev()) {
                    str = "帮会" + vo.data.faction_lv_limit + "解锁";
                } else {
                    str = "击杀上一个boss解锁";
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Open.skinName, ColorType.Orange + str, 14, TextAlign.LEFT);
            } else {
                LabelTextFont.clearLabel(this.uiAtlas, this.Open.skinName);
            }

            if (this.selected) {
           //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Select.skinName, UIData.publicUi, PuiData.A_HIGHT_F);
            } else {
         //       LabelTextFont.clearLabel(this.uiAtlas, this.Select.skinName);
            }


            */
        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.C_list_cell.addEventListener(InteractiveEvent.Up, this.equClick, this);
            } else {
                this.C_list_cell.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染

            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata) {
                var vo: FBossItemVo = this.itdata.data
                if (vo.state1 == 3) {
                    msgtip.MsgTipManager.outStrById(22, 51);
                    return;
                }
                this.setSelect();
            }
        }

        private setnull(): void {
            /*
            LabelTextFont.clearLabel(this.uiAtlas, this.Over.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.BossName.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Challenge.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Time.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Bg.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Select.skinName);
            */
        }
    }

    export class FactionBossList extends SList {

        public constructor() {
            super();
            this.left = 141;
            this.top = 118;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, FactionBossRender, 256, 350, 0, 80, 3, 256, 256*2, 1, 6, 2);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        }


        public getData(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            var listary = FactionBossModel.getInstance().getList();
            console.log("--listary--",listary);
            for (var i: number = 0; i < listary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = listary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _type: number
        public show($type: number): void {
            this._type = $type
            console.log("$type--", $type);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        }

        public refreshAndselectIndex(): void {
            this.refreshDataByNewData();
            this.setSelectIndex(this._type);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    

    export class FactionBossRightPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;

            if (this.bosslist) {
                this.bosslist.dispose();
                this.bosslist = null;
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
        }

        private _publicuiAtlas: UIAtlas
        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;

            this._publicuiAtlas = $publicuiAtlas;
            this.initView();

        }

        private tickFun: Function;
        public a_1: UICompenent
        public a_2: UICompenent

     
        public b_zhaohuan: UICompenent
        public a_4: UICompenent
        public b_add: UICompenent
        public a_8: UICompenent
        public a_9: UICompenent

        private initView(): void {
            var renderLevel = this._baseRender;

            this.tickFun = () => { this.refreshBossState() };

            this.Needrefresh();


            

            this.addChild(<UICompenent>renderLevel.getComponent("a_select_boss_label"));
 
            this.a_1 = this.addChild(<UICompenent>renderLevel.getComponent("a_1"));
            this.a_2 = this.addChild(<UICompenent>renderLevel.getComponent("a_2"));

            this.b_zhaohuan = this.addEvntBut("b_zhaohuan", renderLevel);
            this.a_4 = this.addChild(<UICompenent>renderLevel.getComponent("a_4"));
            this.b_add = this.addEvntBut("b_add", renderLevel);

  

            this.a_8 = <UICompenent>renderLevel.getComponent("a_8")
            this.Isneedredpoint();
            this.a_9 = this.addChild(<UICompenent>renderLevel.getComponent("a_9"))

        }

        private refreshBossState(): void {
            if (this.bosslist) {
                this.bosslist.refreshDataByNewData();
            }

            if (!FactionBossModel.getInstance().isneedcountdown || !this.hasStage) {
                TimeUtil.removeTimeTick(this.tickFun);
            }
        }

        /**
         * 监听当前挑战的bossid，若不为0，则表示正在挑战boss。需要倒计时刷新界面
         */
        public Needrefresh(): void {
            if (GuidData.faction.getBosschallengeidCur() != 0) {
                TimeUtil.addTimeTick(1000, this.tickFun);
            }
        }


        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
            if (this.bosslist) {
                this.bosslist.left = this.a_9.parent.x / UIData.Scale + this.a_9.x
                this.bosslist.top = this.a_9.parent.y / UIData.Scale + this.a_9.y
            }
        }


        public bosslist: FactionBossList;
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.bosslist) {
                this.bosslist = new FactionBossList();
                this.bosslist.init(this._bottomRender.uiAtlas);
            }
            this.bosslist.show(FactionBossModel.getInstance().getIndex());
            this.resize();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.bosslist) {
                this.bosslist.hide();
            }
        }

        private _data: FBossItemVo;
        public resetData($data: FBossItemVo): void {
            console.log("---data---", $data);
            this._data = $data;
 
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_1.skinName, ColorType.Brown6a4936+"LV" +$data.data1.level, 14, TextAlign.LEFT, "#000000")
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_2.skinName, ColorType.Brown6a4936 +($data.data.time / 60) + "分钟", 14, TextAlign.LEFT, "#000000")

            while (this.starItem.length) {
                this.removeChild(this.starItem.pop())
            }
            var $starNum: number = FactionBossModel.getInstance().getBossStart($data.data1.level);
          //  $starNum=5
            for (var i: number = 0; i < $starNum; i++) {
                var $a_star: UICompenent = this.addChild(this._baseRender.getComponent("a_star"));
                $a_star.x += i * 20;
                this.starItem.push($a_star);
            }

            this.drawRewardFrame($data.data.all_rewards)


            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_4.skinName, ColorType.Orange853d07 + $data.data.token_cost,  16);
            this.resize();
        }
        private starItem:Array<UICompenent>=new Array

        private drawRewardFrame($arr: Array<Array<number>>): void
        {
            this.clearRewardUi();
            for (var i: number = 0; i < $arr.length; i++) {
                var $a_reward_frame: FrameCompenent = <FrameCompenent> this.addChild(this._baseRender.getComponent("a_reward_frame"));
                $a_reward_frame.addEventListener(InteractiveEvent.Down, this.rewardClik, this);

                $a_reward_frame.x += i * 75;
                $a_reward_frame.goToAndStop(i);
                this.drawRewardFrameCtx($arr[i], $a_reward_frame)
                this.rewardFrameUiArr.push($a_reward_frame)
            }
        }

        private drawRewardFrameCtx($ary: Array<number>, $ui: FrameCompenent): void {
            $ui.data = $ary[0];
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($ary[0]),
                ($img: any) => {
                    var $uiRect: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.width, $uiRect.height, false);
 
                    UiDraw.cxtDrawImg($ctx, PuiData.PropBg60, new Rectangle(0, 0, 66, 66), UIData.publicUi);
                    $ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 58, 58);

                    ArtFont.getInstance().writeFontToCtxRight($ctx, String($ary[1]), ArtFont.num1, 64, 45);
                    $ui.drawToCtx(this._baseRender.uiAtlas, $ctx);
                });
        }
        private rewardFrameUiArr: Array<FrameCompenent>;
        private clearRewardUi(): void
        {
            if (this.rewardFrameUiArr) {
                while (this.rewardFrameUiArr.length) {
                    this.removeChild(this.rewardFrameUiArr.pop());
                }
            } else {
                this.rewardFrameUiArr=new Array()
            }
        }


        public Isneedredpoint(): void {
            var tab2 = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (tab2.token_max_keep <= GuidData.faction.getBossTokenNum()) {
                this.setUiListVisibleByItem([this.a_8], true);
            } else {
                this.setUiListVisibleByItem([this.a_8], false);
            }
        }


        public rewardClik(evt: InteractiveEvent): void {
            var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
            aa.id = evt.target.data
            ModuleEventManager.dispatchEvent(aa);
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_zhaohuan:
                    if (this.getIdentity() != 1) {
                        msgtip.MsgTipManager.outStrById(22, 52);
                        return;
                    }

                    if (GuidData.faction.getBosschallengeidCur() != 0) {
                        msgtip.MsgTipManager.outStrById(22, 53);
                        return;
                    }

                    if (this._data.state1 == 3) {
                        msgtip.MsgTipManager.outStrById(22, 51);
                        return;
                    }

                    if (GuidData.faction.getBossTokenNum() < this._data.data.token_cost) {
                        msgtip.MsgTipManager.outStrById(22, 54);
                        return;
                    }

                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_CHALLENGE_BOSS, this._data.data.id, 0, "", "");
                    break;
                case this.b_add:
                    //购买次数
                    this.showDuihuanYinbiPanel()
                    break;

                default:
                    break;
            }
        }
        /*
        private aaaa(): void
        {
                   var $ett = new kuafu.KuafuPanelModuleEvent(kuafu.KuafuPanelModuleEvent.SHOW_BUYNUM_DJ_EVENT);
                    $ett.data = 3;
                    ModuleEventManager.dispatchEvent($ett);

        }
        */
        private showDuihuanYinbiPanel(): void {
            var tab2: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (GuidData.faction.getBossTokenNum() < tab2.token_max_keep) {
                var buynum: number = GuidData.faction.getBossTokentodaybuycount();
                if (buynum < tab2.token_buy_price.length) {
                    var $evt: popbuy.PopBuyEvent = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL)
                    $evt.resoureItem = tab2.token_buy_price;
                    // $evt.Type = popbuy.PopBuyType.TOKEN;
                    $evt.cutNum = tab2.token_buy_price.length - buynum;
                    $evt.Info1 = "家族Boss剩余可购买";
                    $evt.SubmitFun = (value: number) => {
                        // NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 1, value, "", "");
                        NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUY_TOKEN, value, 0, "", "");
                    }
                    ModuleEventManager.dispatchEvent($evt);
                } else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "购买次数已用完..", 99)
                }
            } else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "先请挑战..", 99)
            }
        }

        private getIdentity(): number {
            var ary: Array<FactionItemData> = GuidData.faction.getFactionList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == GuidData.player.getGuid()) {
                    return ary[i].identity;
                }
            }
            return -1;
        }

    }



}