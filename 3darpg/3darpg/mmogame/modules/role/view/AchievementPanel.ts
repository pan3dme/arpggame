module role {

    export class AchievementPanel extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this.achievementTabList) {
                this.achievementTabList.dispose();
                this.achievementTabList = null;
            }
            if (this.achievementList) {
                this.achievementList.dispose();
                this.achievementList = null;
            }

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        public achievementTabList: AchievementTabList;
        public achievementList: AchievementList;
        private t_listindex0: UICompenent
        private t_listindex1: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this.t_listindex0 = this.addChild(renderLevel.getComponent("t_listindex0"));
            this.t_listindex1 = this.addChild(renderLevel.getComponent("t_listindex1"));

            var bg = this.addChild(this._publicRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "coffeeBg", renderLevel);

            this._publicRender.applyObjData();
        }

        public resize(): void {
            super.resize();
            if (this.achievementTabList) {
                this.achievementTabList.left = this.t_listindex0.parent.x / UIData.Scale + this.t_listindex0.x
                this.achievementTabList.top = this.t_listindex0.parent.y / UIData.Scale + this.t_listindex0.y
            }
            if (this.achievementList) {
                this.achievementList.left = this.t_listindex1.parent.x / UIData.Scale + this.t_listindex1.x
                this.achievementList.top = this.t_listindex1.parent.y / UIData.Scale + this.t_listindex1.y
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.achievementList) {
                this.achievementList = new AchievementList();
                this.achievementList.init(this._baseRender.uiAtlas);
            }

            if (!this.achievementTabList) {
                this.achievementTabList = new AchievementTabList();
                this.achievementTabList.init(this._baseRender.uiAtlas);
            }
            this.achievementTabList.show();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.achievementTabList) {
                this.achievementTabList.hide();
            }
            if (this.achievementList) {
                this.achievementList.hide();
            }
        }
    }

    /**
     * TabList
     */
    export class AchievementTabList extends SList {

        public constructor() {
            super();
            this.left = 45;
            this.top = 82;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, AchievementTabRender, 167, 426, 0, 58, 7, 256, 1024, 1, 10);
        }

        /**
         * refreshData
         * 若不传参数，则代表领取完奖励的数据更新，维持当前_type
         */
        public refreshDataByNewData($type: number = -2): void {
            if ($type != -2) {
                this._type = $type
            }
            var aa: Array<TabItemData> = RoleModel.getInstance().getTabListByType(this._type);
            var $sListItemData = this.getData(aa);
            this.refreshData($sListItemData);
        }


        public getData(aa: Array<TabItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < aa.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = aa[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _type: number = -1
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData(-1);
            //分发第一条数据
            var aa1: Array<AchieveItemData> = RoleModel.getInstance().getFirstList();
            var bb = new RoleUiEvent(RoleUiEvent.Achievement_VIEW_ITEM_EVENT);
            bb.data = aa1;
            ModuleEventManager.dispatchEvent(bb);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class AchievementTabRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Tab: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Tab = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tab", 0, 0, 167, 58);
            $container.addChild(this.Tab);
        }

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
        }

        public get selected(): boolean {
            return this._selected;
        }

        private draw(vo: TabItemData): void {
            var $uiRectangle: UIRectangle = this.uiAtlas.getRec(this.Tab.skinName)
            var ctx = UIManager.getInstance().getContext2D($uiRectangle.pixelWitdh, $uiRectangle.pixelHeight, false);

            //二级页签的偏移量
            var posx: number = 0;
            var posy: number = 0;
            var flag: boolean = false;
            if (vo.state == 2) {
                posx = 7
                posy = 4
                flag = true;
            }

            if (flag) {
                //二级页签
                var selectedRect: UIRectangle;
                //二级页签选中
                if (this.selected) {
                    selectedRect = this.parentTarget.baseAtlas.getRec("StypeBG2")
                } else {
                    selectedRect = this.parentTarget.baseAtlas.getRec("StypeBG1")
                }
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, selectedRect.pixelX, selectedRect.pixelY, selectedRect.pixelWitdh, selectedRect.pixelHeight, posx, posy, selectedRect.pixelWitdh, selectedRect.pixelHeight);
                // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx,"aaa",16,66, 19,TextAlign.CENTER,ColorType.Brown7a2f21);
                var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec(vo.name)
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 68, 21, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            } else {
                //一级页签
                var imgUseRect = this.parentTarget.baseAtlas.getRec("TpeBG")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, posx, posy, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);

                // var $obj: any = TableData.getInstance().getData(TableData.tb_achieve_page, vo.);
                
                // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx,"aaa",16,66, 19,TextAlign.CENTER,ColorType.Brown7a2f21);
                imgUseRect1 = this.parentTarget.baseAtlas.getRec(vo.name)
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 66, 19, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }

            if (!flag) {
                var imgUseRect2: UIRectangle;
                if (vo.selecteds) {
                    imgUseRect2 = this.parentTarget.baseAtlas.getRec("UP")
                } else {
                    imgUseRect2 = this.parentTarget.baseAtlas.getRec("DOWN")
                }
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect2.pixelX, imgUseRect2.pixelY, imgUseRect2.pixelWitdh, imgUseRect2.pixelHeight, 128, 24, imgUseRect2.pixelWitdh, imgUseRect2.pixelHeight);
            }

            if(vo.isredpoint){
                UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(143, posy, 17, 16), UIData.publicUi);
            }

            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $uiRectangle.pixelX, $uiRectangle.pixelY, ctx);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var vo: TabItemData = this.itdata.data;
                this.draw(vo);
            }
        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.Tab.addEventListener(InteractiveEvent.Up, this.equClick, this);
                this.applyrender();
            } else {
                this.Tab.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        }


        private equClick(): void {
            //选中，事件派发
            var bb = new RoleUiEvent(RoleUiEvent.Achievement_SELECT_TAB_EVENT);
            bb.data = this.itdata;
            ModuleEventManager.dispatchEvent(bb);
            this.setSelect();
        }

        private setnull(): void {
            UiDraw.clearUI(this.Tab);
        }
    }


    /**
     * RightList
     */
    export class AchievementList extends SList {

        public constructor() {
            super();
            this.left = 229;
            this.top = 87;

        }

        public init($uiAtlas: UIAtlas): void {
            AchievementRender.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, AchievementRender, 622, 422, 0, 91, 4, 512, 1024, 1, 7);
        }

        public getData(aa: Array<AchieveItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < aa.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = aa[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show($data: Array<AchieveItemData>): void {
            console.log("-$data--", $data);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var $sListItemData = this.getData($data);
            this.refreshData($sListItemData);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class AchievementRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Bg: UICompenent;
        private Icon: UICompenent;
        private Name: UICompenent;
        private Info: UICompenent;
        private Progress: UICompenent;
        private Reward1: UICompenent;
        private Reward2: UICompenent;
        private Btn: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Bg = this.creatGrid9SUI($bgRender, AchievementRender.baseAtlas, "Bg", 0, 0, 622, 86, 15, 15);
            $container.addChild(this.Bg);

            this.Icon = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Icon", 8, 9, 68, 68);
            $container.addChild(this.Icon);
            this.Name = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Name", 93, 8, 125, 20);
            $container.addChild(this.Name);
            this.Info = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Info", 93, 30, 245, 20);
            $container.addChild(this.Info);
            this.Progress = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Progress", 92, 60, 239, 16);
            $container.addChild(this.Progress);
            this.Reward1 = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Reward1", 342, 9, 68, 68);
            $container.addChild(this.Reward1);
            this.Reward2 = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Reward2", 415, 9, 68, 68);
            $container.addChild(this.Reward2);

            this.Btn = this.creatSUI($baseRender, AchievementRender.baseAtlas, "Btn", 501, 22, 105, 45);
            $container.addChild(this.Btn);
            this.Btn.addEventListener(InteractiveEvent.Up, this.butClik, this);
        }

        private applyrender(): void {
            var vo: AchieveItemData = this.itdata.data;

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.Slist_nselect);

            this.drawIcon();
            //name
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, vo.data.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            // this.drawInfo();
            //成就说明
            var str: string = vo.data.info + "(" + vo.progress + "/" + vo.data.maxnum + ")";
            if (vo.hasReward) {
                str = ColorType.Green2ca937 + str;
            } else {
                str = ColorType.color9a683f + str;
            }

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Info.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            this.drawProgress();

            if (vo.data.title && vo.data.title > 0) {
                //有奖励称号
                this.drawReward([0, 1], this.Reward1, true);
                this.Reward1.data = null;
                if (vo.data.reward.length > 0) {
                    IconManager.getInstance().drawItemIcon60(this.Reward2, vo.data.reward[0][0],vo.data.reward[0][1],vo.hasReward);
                }
            } else {
                for (var i = 0; i < vo.data.reward.length; i++) {
                    if (i) {
                        IconManager.getInstance().drawItemIcon60(this.Reward2, vo.data.reward[i][0],vo.data.reward[i][1],vo.hasReward);
                    } else {
                        IconManager.getInstance().drawItemIcon60(this.Reward1, vo.data.reward[i][0],vo.data.reward[i][1],vo.hasReward);
                    }
                }
            }

            if (vo.data.reward.length == 1 && vo.data.title == 0) {
                UiDraw.clearUI(this.Reward2);
            }

            this.drawBtn();
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }


        private drawBtn(): void {
            var vo: AchieveItemData = this.itdata.data;
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var btnrect: UIRectangle;
            if (vo.hasReach) {
                if (vo.hasReward) {
                    btnrect = AchievementRender.baseAtlas.getRec("Ok");
                } else {
                    btnrect = AchievementRender.baseAtlas.getRec("Receive");
                }
            } else {
                btnrect = AchievementRender.baseAtlas.getRec("Go");
            }
            ctx.drawImage(AchievementRender.baseAtlas.useImg, btnrect.pixelX, btnrect.pixelY, btnrect.pixelWitdh, btnrect.pixelHeight, 0, 0, btnrect.pixelWitdh, btnrect.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private drawReward($ary: Array<number>, $ui: UICompenent, $istitle: boolean): void {
            var vo: AchieveItemData = this.itdata.data;
            var url: string;
            if ($istitle) {
                url = "ui/load/tittle/icon" + $ary[0] + ".png";
            } else {
                url = GameData.getIconCopyUrl($ary[0]);
            }
            IconManager.getInstance().getIcon(url,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                    //图标
                    ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 60, 60);
                    ArtFont.getInstance().writeFontToCtxRight(ctx, String($ary[1]), ArtFont.num1, 64, 45);

                    if (vo.hasReward) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 64, 64))
                    }

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawProgress(): void {
            var vo: AchieveItemData = this.itdata.data;
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Progress.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var posx: number = 40
            var posy: number = 3

            var progress_bg: UIRectangle = AchievementRender.baseAtlas.getRec("Pro_bg")
            ctx.drawImage(AchievementRender.baseAtlas.useImg, progress_bg.pixelX, progress_bg.pixelY, progress_bg.pixelWitdh, progress_bg.pixelHeight, 0, 0, progress_bg.pixelWitdh, progress_bg.pixelHeight);

            var ratio: number = vo.progress / vo.data.maxnum;
            var progress_bar: UIRectangle = AchievementRender.baseAtlas.getRec("Pro")
            ctx.drawImage(AchievementRender.baseAtlas.useImg, progress_bar.pixelX, progress_bar.pixelY, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight, posx, posy, progress_bar.pixelWitdh * ratio, progress_bar.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        // private drawInfo(): void {
        //     var vo: AchieveItemData = this.itdata.data;
        //     var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Info.skinName);
        //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

        //     LabelTextFont.writeTextAutoCenterToCtx(ctx, vo.data.info, 16, 261, $rec.pixelHeight, vo.hasReward ? "#56da35" : "#d6e7ff");

        //     var posy: number = vo.hasReward ? 11 : 9
        //     var colorstr: string = vo.hasReward ? ArtFont.num7 : ArtFont.num10
        //     ArtFont.getInstance().writeFontToCtxLeft(ctx, vo.progress + "/" + vo.data.maxnum, colorstr, 268, posy);
        //     var distion = ArtFont.getInstance().getAirFontWidth(ctx, vo.progress + "/" + vo.data.maxnum, colorstr);

        //     var kuoleft: UIRectangle;
        //     var kuoright: UIRectangle;
        //     if (vo.hasReward) {
        //         kuoleft = AchievementRender.baseAtlas.getRec("Green_0")
        //         kuoright = AchievementRender.baseAtlas.getRec("Green_1")
        //     } else {
        //         kuoleft = AchievementRender.baseAtlas.getRec("Gray_0")
        //         kuoright = AchievementRender.baseAtlas.getRec("Gray_1")
        //     }
        //     ctx.drawImage(AchievementRender.baseAtlas.useImg, kuoleft.pixelX, kuoleft.pixelY, kuoleft.pixelWitdh, kuoleft.pixelHeight, 260, 11, kuoleft.pixelWitdh, kuoleft.pixelHeight);
        //     ctx.drawImage(AchievementRender.baseAtlas.useImg, kuoright.pixelX, kuoright.pixelY, kuoright.pixelWitdh, kuoright.pixelHeight, 268 + distion, 11, kuoright.pixelWitdh, kuoright.pixelHeight);

        //     this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        // }

        private drawIcon(): void {
            var vo: AchieveItemData = this.itdata.data;
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/achievementicon/1.png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    ArtFont.getInstance().writeFontToCtxCenten(ctx, String(vo.data.achval), ArtFont.num1, 34, 45);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });

        }

        private butClik(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                var vo: AchieveItemData = this.itdata.data;
                if (vo.hasReach) {
                    if (!vo.hasReward) {
                        //领取
                        NetManager.getInstance().protocolos.get_achieve_reward(vo.data.id);
                    }
                } else {
                    //前往
                    console.log("前往");
                }
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.Bg);
            UiDraw.clearUI(this.Icon);
            UiDraw.clearUI(this.Name);
            UiDraw.clearUI(this.Info);
            UiDraw.clearUI(this.Progress);
            UiDraw.clearUI(this.Reward1);
            UiDraw.clearUI(this.Reward2);
            UiDraw.clearUI(this.Btn);
        }
    }

}