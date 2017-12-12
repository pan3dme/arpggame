module activity {

    export class EverydayActivityList extends SList {

        public constructor() {
            super();
            this.left = 49;
            this.top = 84;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
            this._tickFun = () => { this.tickRefreshState() };
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, EverydayActivityRender, 860, 300, 430, 100, 3, 1024, 512, 2, 5, 1);
        }

        private _tickFun: Function;
        public addTick(): void {
            TimeUtil.addTimeTick(1000, this._tickFun);
        }

        public removeTick(): void {
            TimeUtil.removeTimeTick(this._tickFun);
        }

        public tickRefreshState(): void {
            if (ActivityModel.getInstance().compareAandB(this._aryList, ActivityType.ALL)) {
                ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_TABREDPOINT_EVENT));
            }
        }

        /**
         * refreshData
         */
        private _aryList: Array<ActivityItemVo>
        public refreshDataByNewData($type: number): void {
            //通过type，获得所对应的列表
            this._aryList = ActivityModel.getInstance().getList($type);
            var $sListItemData = this.getData(this._aryList);
            // console.log("$sListItemDat----", $sListItemData);
            this.refreshData($sListItemData);
        }

        public getData($ary: Array<ActivityItemVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshDataByNewData(ActivityType.ALL);
                this.addTick();
            }
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
            this.removeTick();
        }
    }

    export class EverydayActivityRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private Icon: UICompenent;
        private Name: UICompenent;
        private Num: UICompenent;
        private Action: UICompenent;
        private Time: UICompenent;
        private Btn: UICompenent;
        private Bg: UICompenent;
        private Recomand: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var customRender: UIRenderComponent = this._customRenderAry[0];

            this.Recomand = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Recomand", 2, 1, 58, 60);
            $container.addChild(this.Recomand);
            this.Icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 17, 16, 68, 68);
            $container.addChild(this.Icon);
            this.Name = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Name", 106, 12, 164, 25);
            $container.addChild(this.Name);
            this.Num = this.creatSUI(customRender, this.parentTarget.baseAtlas, "Num", 106, 40, 106, 20);
            $container.addChild(this.Num);
            this.Action = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Action", 212, 40, 80, 20);
            $container.addChild(this.Action);
            this.Time = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Time", 308, 12, 108, 20);
            $container.addChild(this.Time);
            this.Btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Btn", 308, 34, 108, 54);
            $container.addChild(this.Btn);
            this.Bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 427, 98, 10, 10);
            $container.addChild(this.Bg);

            // this.Bg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this.Btn.addEventListener(InteractiveEvent.Up, this.butClik, this);
        }

        // public set selected(val: boolean) {
        //     this._selected = val;
        //     this.applyrender();
        // }

        // public get selected(): boolean {
        //     return this._selected;
        // }

        private drawIcon($data: ActivityItemVo): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + getactivityIconUrl(String($data.data.icon)), LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawNameAndPk($data: ActivityItemVo): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Name.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            LabelTextFont.writeSingleLabelToCtx(ctx, $data.data.name, 16, 0, 0, TextAlign.LEFT, ColorType.Brown7a2f21);

            if ($data.data.pvp) {
                var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("PK")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 109, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private drawBtn($data: ActivityItemVo): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            if ($data.state == -1) {
                //未激活
                var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("Btn_5")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
                ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.data.limdata), ArtFont.num27, 24, 18);
            } else if ($data.state == 0) {
                //未开始
                var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("Btn_2")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            } else if ($data.state == 1) {
                //正在进行中
                if ($data.canreceive) {
                    var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("Btn_1")
                } else {
                    var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("Btn_4")
                }
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            } else if ($data.state == 2) {
                //已完成  判断是否领取奖励
                var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("Btn_1")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            } else {
                //已结束
                var imgUseRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("Btn_0")
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 0, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private time2timestr($num: number): string {
            var aa: string;
            if ($num < 10) {
                aa = "0" + $num;
            } else {
                aa = $num + ""
            }
            return aa;
        }

        private applyrender(): void {
            var vo: ActivityItemVo = <ActivityItemVo>this.itdata.data

            // if (this.selected) {
            //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RankSelect.skinName, UIData.publicUi, PuiData.A_HIGHT_F);
            // } else {
            //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.RankSelect.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            // }

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.Slist_select);

            this.drawIcon(vo);
            // this.uiAtlas.upDataPicToTexture(getactivityIconUrl(String(vo.data.icon)), this.Icon.skinName);
            if (vo.data.recommend == 1) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Recomand.skinName, "T_1");
            } else {
                UiDraw.clearUI(this.Recomand);
            }

            this.drawNameAndPk(vo);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Num.skinName, ColorType.Brown7a2f21 + "次数:" + ColorType.Green2ca937 + vo.getNum() + "/" + vo.data.nums, 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Action.skinName, ColorType.Brown7a2f21 + "活跃:" + ColorType.colorff7200 + (vo.data.active * vo.data.nums), 16, TextAlign.LEFT, "#d5e7ff");


            var color: string;
            if (vo.state >= 2 || vo.state == -1) {
                color = ColorType.Brown7a2f21;
            } else if (vo.state == 0) {
                color = ColorType.colorcd2000;
            } else if (vo.state == 1) {
                color = ColorType.Green2ca937;
            }
            if (vo.isallday) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, "全天", 16, TextAlign.CENTER, color);
            } else if (vo.data.time.length == 2) {
                var str = this.time2timestr(vo.data.time[0][0]) + ":" + this.time2timestr(vo.data.time[0][1]) + "," + this.time2timestr(vo.data.time[1][0]) + ":" + this.time2timestr(vo.data.time[1][1]);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, str, 16, TextAlign.CENTER, color);
            } else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Time.skinName, this.time2timestr(vo.data.time[0][0]) + ":" + this.time2timestr(vo.data.time[0][1]) + "-" + this.time2timestr(vo.data.time[0][2]) + ":" + this.time2timestr(vo.data.time[0][3]), 16, TextAlign.CENTER, color);
            }

            this.drawBtn(vo);

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        public butClik(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                var vo: ActivityItemVo = this.itdata.data;
                if (vo.state == 1 && !vo.canreceive) {
                    //正在进行中
                    // ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.HIDE_ACTIVITY_EVENT));
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var aaa: any = vo.data.goto_sub[0];
                    if (vo.data.goto == SharedDef.MODULE_MALL) {
                        aaa = vo.data.goto_sub
                    }
                    console.log("--vo.data.goto,vo.data.goto_sub--", vo.data.goto, aaa);
                    ModulePageManager.openPanel(vo.data.goto, aaa);
                }
            }
        }

        // private equClick(evt: InteractiveEvent): void {
        //     //选中，事件派发
        //     if (this.itdata && this.itdata.data) {
        //         if (UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
        //             var bb = new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_SELECT_EVENT);
        //             bb.data = this.itdata;
        //             ModuleEventManager.dispatchEvent(bb);
        //         }
        //     }

        // }

        private setnull(): void {
            UiDraw.clearUI(this.Bg);
            UiDraw.clearUI(this.Icon);
            UiDraw.clearUI(this.Name);
            UiDraw.clearUI(this.Num);
            UiDraw.clearUI(this.Action);
            UiDraw.clearUI(this.Time);
            UiDraw.clearUI(this.Btn);
            UiDraw.clearUI(this.Recomand);
        }
    }
}