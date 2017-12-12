module selectserver {

    export class Ssxuanfu extends UIVirtualContainer {
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.ssTabList) {
                this.ssTabList.dispose();
                this.ssTabList = null;
            }
            if (this.xuanfulist) {
                this.xuanfulist.dispose();
                this.xuanfulist = null;
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
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();

        }

        private a_index: UICompenent
        private a_index0: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            this.addChild(renderLevel.getComponent("c_bg0"));
            this.addChild(renderLevel.getComponent("c_bg1"));
            this.addChild(renderLevel.getComponent("a_title"));
            this.addChild(renderLevel.getComponent("c_info"));
            this.a_index = this.addChild(renderLevel.getComponent("a_index"));
            this.a_index0 = this.addChild(renderLevel.getComponent("a_index0"));
        }

        public ssTabList: SsTabList
        public resize(): void {
            super.resize();
            if (this.ssTabList) {
                this.ssTabList.left = this.a_index.parent.x / UIData.Scale + this.a_index.x
                this.ssTabList.top = this.a_index.parent.y / UIData.Scale + this.a_index.y
            }
            if (this.xuanfulist) {
                this.xuanfulist.left = this.a_index0.parent.x / UIData.Scale + this.a_index0.x
                this.xuanfulist.top = this.a_index0.parent.y / UIData.Scale + this.a_index0.y
            }
        }

        public xuanfulist:xuanfuList
        public refreshData($data:Array<ServerVo>){
            if(!this.xuanfulist){
                this.xuanfulist = new xuanfuList();
                this.xuanfulist.init(this._baseRender.uiAtlas);
            }
            this.xuanfulist.show($data);
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            if (!this.ssTabList) {
                this.ssTabList = new SsTabList();
                this.ssTabList.init(this._baseRender.uiAtlas);
            }
            this.ssTabList.show();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.ssTabList) {
                this.ssTabList.hide();
            }
            if (this.xuanfulist) {
                this.xuanfulist.hide();
            }
        }
    }


    /**
     * 左侧tablist
     */
    export class SsTabList extends SList {

        public constructor() {
            super();
            this.left = 111;
            this.top = 98;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, SsTabListRender, 152, 354, 0, 48, 7, 256, 512, 1, 10);
        }

        /**
         * refreshData
         */
        private _itemDataList: Array<SListItemData>;
        public refreshDataByNewData(): void {
            var aaa = SelectServerModel.getInstance().getFinalList();
            this._itemDataList = this.getData(aaa);
            this.refreshData(this._itemDataList);

            for (var i = 0; i < aaa.length; i++) {
                var element = aaa[i];
                if (element.select) {
                    this.scrollIdx(i);
                    this.setSelectIndex(i);
                }
            }
        }

        public getData($aary: Array<ServerAryVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $aary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $aary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

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

    export class SsTabListRender extends SListItem {
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
            this.Tabbg.addEventListener(InteractiveEvent.Up, this.equClick, this);


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
                var bb = new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SELECT_TAB_EVENT);
                bb.data = this.itdata.data.serverary;
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
                var vo: ServerAryVo = this.itdata.data;
                if (vo.tabname && vo.tabname.length > 0) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, vo.tabname, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                } else {
                    var str: string;
                    var a = vo.serverary[0].id
                    var b = vo.serverary[vo.serverary.length - 1].id
                    if (a > b) {
                        str = b + " - " + a + "服"
                    } else {
                        str = a + " - " + b + "服"
                    }
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                }
                this.drawTab();
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染

            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Tabbg);
            UiDraw.clearUI(this.Tabname);
            //    this.RedPoint.preHide();
        }
    }
}