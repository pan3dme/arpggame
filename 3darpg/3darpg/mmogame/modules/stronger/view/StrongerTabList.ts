module stronger {

    export class StrongerTabList extends SList {

        public constructor() {
            super();
            this.left = 56;
            this.top = 164;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, StrongerTabRender, 152, 340, 0, 50, 7, 256, 512, 1, 8);
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
            for (var i: number = 0; i < 5; i++) {
                var item: SListItemData = new SListItemData;
                // item.data = i;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _type: number
        public show($type: number): void {
            this._type = $type
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

    export class StrongerTabRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Tab: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Tab = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tab", 0, 0, 152, 48);
            $container.addChild(this.Tab);
        }

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
            if (val) {
                var bb = new stronger.StrongerEvent(stronger.StrongerEvent.SELECTTAB_Stronger_EVENT);
                bb.data = this.itdata.id + 1;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawTab(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Tab.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_1");
            } else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_0");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata) {
                this.drawTab();
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.Tab.addEventListener(InteractiveEvent.Down, this.equClick, this);
            } else {
                this.Tab.removeEventListener(InteractiveEvent.Down, this.equClick, this);
                this.setnull();
            }
        }

        private equClick(): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            this.setSelect();
        }

        private setnull(): void {
            LabelTextFont.clearLabel(this.uiAtlas, this.Tab.skinName);
        }
    }

}