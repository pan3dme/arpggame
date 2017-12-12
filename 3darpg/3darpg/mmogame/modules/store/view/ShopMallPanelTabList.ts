module store {

    export class TabVo {
        public id: number;
        public data: tb.TB_shop_base;
    }

    /**
     * 左侧tablist
     */
    export class ShopMallPanelTabList extends SList {

        public constructor() {
            super();
            this.left = 51;
            this.top = 90;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, ShopMallPanelTabRender, 152, 422, 0, 50, 8, 256, 512, 1, 10);
        }

        /**
         * refreshData
         */
        private _itemDataList: Array<SListItemData>;
        public refreshDataByNewData(): void {
            var aaa = StoreModel.getInstance().getTablist(this._type[0]);
            this._itemDataList = this.getData(aaa);
            this.refreshData(this._itemDataList);
        }

        public getData($aary: Array<number>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $aary.length; i++) {
                var bbb = new TabVo();
                bbb.data = tb.TB_shop_base.get_TB_shop_base($aary[i]);
                bbb.id = bbb.data.id;
                var item: SListItemData = new SListItemData;
                item.data = bbb;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _type: Array<number>;
        public show($type: Array<number>): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._type = $type;
            this.refreshAndselectIndex();
        }

        private getSelectIdByTid($tid: number): number {
            console.log("---表id---", $tid);
            for (var i = 0; i < this._itemDataList.length; i++) {
                if (this._itemDataList[i].data.id == $tid) {
                    return this._itemDataList[i].id;
                }
            }
            console.log("--没有符合的项", $tid);
            return 0;
        }

        public refreshAndselectIndex(): void {
            this.refreshDataByNewData();
            var page: number = StoreModel.getInstance().getPage(this._type[0]);
            if (this._type.length > 1) {
                page = this._type[1]
            }
            // this.setSelectIndexCopy(page);
            var selid = this.getSelectIdByTid(page);
            this.setSelectIndex(selid);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class ShopMallPanelTabRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Tabbg: UICompenent;
        private Tabname: UICompenent;
        // private RedPoint: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Tabbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tabbg", 0, 0, 152, 48);
            $container.addChild(this.Tabbg);
            this.Tabbg.addEventListener(InteractiveEvent.Down, this.equClick, this);


            this.Tabname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tabname", 26, 14, 100, 20);
            $container.addChild(this.Tabname);

            // this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 136, 0, 17, 16);
            // this.RedPoint.preParent = $container;
            // UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        }

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
            if (val) {
                var bb = new store.StoreEvent(store.StoreEvent.SELECT_TAB_EVENT);
                bb.data = this.itdata.data.id;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawTab(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Tabbg.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("btn_select");
            } else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("btn_noselect");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var vo: TabVo = this.itdata.data;
                // if (this.itdata.data) {
                //     this.itdata.data.bindUI(this.RedPoint);
                // }
                this.drawTab();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, vo.data.typename, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.Tabbg.addEventListener(InteractiveEvent.Down, this.equClick, this);
            } else {
                this.Tabbg.removeEventListener(InteractiveEvent.Down, this.equClick, this);
                this.setnull();
            }
        }

        private equClick(): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            this.setSelect();
        }

        private setnull(): void {
            UiDraw.clearUI(this.Tabbg);
            UiDraw.clearUI(this.Tabname);
            //    this.RedPoint.preHide();
        }
    }
}