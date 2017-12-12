module stronger {
    /**
     * 变强list
     */
    export class StrongerList extends SList {

        public constructor() {
            super();
            this.left = 237;
            this.top = 157;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, StrongerListRender, 671, 352, 0, 89, 3, 512, 1024, 1, 6);
        }

        public refreshDataByNewData(): void {
            var $sListItemData: Array<SListItemData> = this.getData(this._ary);
            this.refreshData($sListItemData);
        }


        public getData($data: Array<StrongerItemVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _ary: Array<StrongerItemVo>;
        public show($type: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._ary = StrongerModel.getInstance().getList($type);
            //排序
            if ($type == StrongerUitl.STRONGER_UP) {
                this._ary.sort(
                    function (a: StrongerItemVo, b: StrongerItemVo): number {
                        if (a.state == b.state) {
                            return a.data.id - b.data.id;
                        } else {
                            return b.state - a.state;
                        }
                    }
                )
            } else {
                this._ary.sort(
                    function (a: StrongerItemVo, b: StrongerItemVo): number {
                        return b.data.priority - a.data.priority;
                    }
                )
            }
            this.refreshDataByNewData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class StrongerListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Icon: UICompenent;
        private Name: UICompenent;
        private State: UICompenent;
        private Info: UICompenent;
        private Progress: UICompenent;
        private Btn: UICompenent;
        private Itembg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 18, 9, 68, 68);
            $container.addChild(this.Icon);

            this.Name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Name", 106, 18, 82, 19);
            $container.addChild(this.Name);

            this.Info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Info", 192, 20, 190, 17);
            $container.addChild(this.Info);

            this.State = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "State", 467, 31, 72, 25);
            $container.addChild(this.State);


            this.Progress = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Progress", 110, 49, 333, 22);
            $container.addChild(this.Progress);

            this.Btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Btn", 552, 20, 103,45);
            $container.addChild(this.Btn);
            this.Btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);

            this.Itembg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Itembg", 0, 0, 671, 86, 10, 10);
            $container.addChild(this.Itembg);
        }


        private drawIcon(): void {
            var vo: StrongerItemVo = this.itdata.data
            IconManager.getInstance().getIcon(getstrongerIconUrl(String(vo.data.icon)),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        private drawProgress(): void {
            var vo: StrongerItemVo = this.itdata.data
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Progress.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            if (vo.data.parent_id == StrongerUitl.STRONGER_UP) {
                //绘制进度条
                //背景
                var progressbgRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("progressbg");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, progressbgRect1.pixelX, progressbgRect1.pixelY, progressbgRect1.pixelWitdh, progressbgRect1.pixelHeight, 0, 5, progressbgRect1.pixelWitdh, progressbgRect1.pixelHeight);

                // var ratio: number = (3 - vo.state) / 3;
                var ratio: number = vo.curzhanli / vo.zhanli;
                var progressupRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("progressup");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, progressupRect1.pixelX, progressupRect1.pixelY, progressupRect1.pixelWitdh * ratio, progressupRect1.pixelHeight, 5, 5, progressupRect1.pixelWitdh * ratio, progressupRect1.pixelHeight);

            } else {
                //绘制星星
                var startRect1: UIRectangle = this.parentTarget.baseAtlas.getRec("start");
                for (var i = 0; i < vo.data.priority; i++) {
                    ctx.drawImage(this.parentTarget.baseAtlas.useImg, startRect1.pixelX, startRect1.pixelY, startRect1.pixelWitdh, startRect1.pixelHeight, i * startRect1.pixelWitdh, 0, startRect1.pixelWitdh, startRect1.pixelHeight);
                }
            }

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo: StrongerItemVo = this.itdata.data

                this.drawProgress();

                this.drawIcon();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, vo.data.name, 16, TextAlign.LEFT,ColorType.Brown7a2f21);

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Info.skinName, vo.data.info, 14, TextAlign.LEFT, ColorType.color9a683f);

                if (vo.data.parent_id == StrongerUitl.STRONGER_UP) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.State.skinName, "State" + vo.state);
                }else{
                    LabelTextFont.clearLabel(this.uiAtlas,this.State.skinName);
                }

                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Btn.skinName, "Btn");

                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Itembg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
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

        private btnChick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            console.log("--dianji--");
            if (this.itdata && this.itdata.data) {
                var vo: StrongerItemVo = this.itdata.data
                ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.HIDE_Stronger_EVENT));
                ModulePageManager.openPanel(vo.data.goto, vo.data.goto_sub);
            }
        }

        private setnull(): void {
            LabelTextFont.clearLabel(this.uiAtlas, this.Icon.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Name.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.State.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Info.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Progress.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Btn.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Itembg.skinName);
        }
    }


}