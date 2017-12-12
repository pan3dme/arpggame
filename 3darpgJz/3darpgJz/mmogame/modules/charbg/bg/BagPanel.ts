module charbg {

    export class BagItemRender extends SListItem {
        private baseui: UICompenent;


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.baseui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_item", 0, 0, 68, 68);
            $container.addChild(this.baseui);
            this.baseui.addEventListener(InteractiveEvent.Up, this.equClick, this);

        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            this.draw();
        }

        public drawUpDown(): void {
            if(!this.itdata){
                return;
            }
            var $EquMeshVo: BagItemData = <BagItemData>this.itdata.data;
            if (!$EquMeshVo) {
                return;
            }
            var test: boolean = false;
            if ($EquMeshVo.entryData.type == 1) {//装备
                var bagitem: BagItemData = GuidData.bag.getEquByPart($EquMeshVo.entryData.pos);
                if (bagitem) {
                    if ($EquMeshVo.data.propData.force > bagitem.data.propData.force) {
                        test = true;
                    }
                } else {
                    test = true;
                }
            }
            if (test != this.equUpDown) {
                this.draw();
            }
        }

        public draw():void{
            if(this.itdata && this.itdata.data){
                this.applyrender();
            }else{
                this.setnull();
            }
        }
        private equUpDown: boolean = false;
        private disableEqu: boolean = false;

        public testGender($obj: any): boolean {
            if ($obj.availableGender) {
                var idx: number = $obj.availableGender.indexOf(GuidData.player.getCharType());
                return (idx != -1);
            }
            return false;
        }

        public setnull():void{
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.baseui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(68, 68, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


        public applyrender(): void {
            var $EquMeshVo: BagItemData = <BagItemData>this.itdata.data;

            if (!$EquMeshVo) {
                var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.baseui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(68, 68, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                return;
            }

            if ($EquMeshVo.entryData.type == 1) {//装备
                var bagitem: BagItemData = GuidData.bag.getEquByPart($EquMeshVo.entryData.pos);
                this.equUpDown = false;
                if (bagitem) {
                    if ($EquMeshVo.data.propData.force > bagitem.data.propData.force) {
                        this.equUpDown = true;
                    }
                } else {
                    this.equUpDown = true;
                }
                this.disableEqu = !this.testGender($EquMeshVo.entryData);
            }

            IconManager.getInstance().getIcon(geteqiconIconUrl($EquMeshVo.entryData.icon),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.baseui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(68, 68, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($EquMeshVo.entryData.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                    


                    if ($EquMeshVo.entryData.type == 1) {//装备

                        UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                        ArtFont.getInstance().writeFontToCtxCenten(ctx, String($EquMeshVo.entryData.level), ArtFont.num63, 18, 4, 4);

                        if (this.disableEqu) {
                            UiDraw.cxtDrawImg(ctx, PuiData.EQUBG, new Rectangle(4, 4, 60, 60), UIData.publicUi);
                        }else {
                            if($EquMeshVo.entryData.level > GuidData.player.getLevel()){
                                UiDraw.cxtDrawImg(ctx, PuiData.DISABLE, new Rectangle(42, 40, 23, 23), UIData.publicUi);
                            }else{
                                UiDraw.cxtDrawImg(ctx, this.equUpDown ? PuiData.ARROWUP : PuiData.ARROWDOWN, new Rectangle(45, 40, 17, 21), UIData.publicUi);
                            }                            
                        }

                    } else if ($EquMeshVo.count > 1) {
                        //ArtFont.getInstance().writeFontToCtxRight(ctx, String($EquMeshVo.count), ArtFont.GARY_TXT, 60, 40);
                        var strNum: string = String($EquMeshVo.count)
                        LabelTextFont.writeSingleLabelToCtx(ctx, strNum, 16, 55 - ctx.measureText(strNum).width, 43, TextAlign.LEFT, ColorType.Whitefff4d6, "#27262e");
                    }

                    if (this.selected) {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(2, 2, 64, 64), UIData.publicUi);
                    }

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private equClick(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();

                var itemevt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                itemevt.data = this.itdata.data;
                itemevt.buttonType = 2;
                ModuleEventManager.dispatchEvent(itemevt);
            }
        }

        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyrender();
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        public refreshDraw():void{
            this.draw();
        }

    }
    export class BagList extends SList {
        public constructor() {
            super();
            this.center = 205;
            this.middle = 0;
        }
        public initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, BagItemRender, 350, 350, 70, 70, 5, 512, 1024, 5, 10);
        }

        public refreshDrawUpDow():void{
            for (var i: number = 0; i < this._itemList.length; i++) {
                var item:BagItemRender = <BagItemRender>this._itemList[i]
                item.drawUpDown();
            }
        }

        // public setGridItemData(a: any, b: any): boolean {
        //     console.log("setGridItemData")
        //     return true;
        // }

        // public clearItemByPos(a: any): void {
        //     console.log("clearItemByPos")
        // }
        // public setGridItemFun(a: any, b: any): void {
        //     console.log("setGridItemFun")
        // }
    }
    export class BagPanel extends UIConatiner {

        //private _listRender: UIListRenderComponent;
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private uiAtlasComplet: boolean = false;

        private _bgList: BagList;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            //this._listRender.dispose();
            //this._listRender = null;
        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent();
            this._baseRender = new UIRenderComponent();
            //this._listRender = new UIListRenderComponent();

            this.addRender(this._bgRender);
            //this.addRender(this._listRender);
            this.addRender(this._baseRender);
            //this.addList();

            this._bgList = new BagList();
            // this._bgList.x = 512;
            // this._bgList.y = 90;
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            UIManager.getInstance().addUIContainer(this._bgList);

            var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
            $scenePange.data = SharedDef.MODULE_BAG;
            ModuleEventManager.dispatchEvent($scenePange);
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            UIManager.getInstance().removeUIContainer(this._bgList);
        }

        public setUIAtlas($us: UIAtlas): void {
            this._baseRender.uiAtlas = $us;
            this._bgRender.uiAtlas = $us;

            this._bgList.baseAtlas = $us;
            this._bgList.initData();

            this.loadConfigCom();
        }
        private _bagNum: UICompenent;
        private loadConfigCom(): void {

            var renderLevel: UIRenderComponent = this._bgRender;

            this.b_tab0 = <SelectButton>renderLevel.getComponent("b_tab0");
            this.addChild(this.b_tab0);
            this.b_tab0.data = BagData.TYPE_EQU_BG;
            this.b_tab0.addEventListener(InteractiveEvent.Down, this.butClik, this);

            this.b_tab1 = <SelectButton>renderLevel.getComponent("b_tab1");
            this.addChild(this.b_tab1);
            this.b_tab1.data = BagData.TYPE_BAG;
            this.b_tab1.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.b_tab2 = <SelectButton>renderLevel.getComponent("b_tab2");
            this.addChild(this.b_tab2);
            this.b_tab2.data = BagData.TYPE_GEM;
            this.b_tab2.addEventListener(InteractiveEvent.Down, this.butClik, this);



            var b_zhengli: UICompenent = this._baseRender.getComponent("b_zhengli")
            this.addChild(b_zhengli)
            b_zhengli.addEventListener(InteractiveEvent.Down, this.onZhengli, this);

            this.addChild(this._baseRender.getComponent("a_win_line2"));

            this._bagNum = this._baseRender.getComponent("b_bag_num")
            this.addChild(this._bagNum)

            this.uiAtlasComplet = true;

            this.selectTab(this.b_tab0);

        }

        public onZhengli($e: any): void {
            var $type:number;
            if (this.selcetTabId == BagData.TYPE_BAG) {
                $type = 0;
            } else if (this.selcetTabId== BagData.TYPE_EQU_BG) {
                $type = 2;
            } else if (this.selcetTabId == BagData.TYPE_GEM) {
                $type = 3;
            }
            NetManager.getInstance().protocolos.bag_item_sort($type);
        }

        public refreshNum(size: number, allSize: number): void {
            var str: string = size + "/" + allSize;

            UiDraw.drawTxtLab(this._bagNum, ColorType.Brown7a2f21 + str, 14, TextAlign.CENTER);
        }

        public drawUpDown(): void {
            this._bgList.refreshDrawUpDow();
        }

        public drawEquDis():void{
            this._bgList.refreshDraw();
        }

        public bgDataChg($data: any, type: number): void {

            if (type != this.selcetTabId) {
                return;
            }

            for (var i: number = 0; i < $data.length; i++) {
                var bgData: BagItemData = GuidData.bag.getBgItemData($data[i], type);
                if (bgData) {
                    this._bgList.setItemData(bgData, bgData.pos);
                    // if (!tf) {
                    //     this._bgList.setGridItemFun(($listItemData: ListItemData) => { this.itemDataClick($listItemData) }, bgData.pos);
                    // }

                } else {
                    this._bgList.clearItemByPos($data[i]);
                }

            }

            this.refreshNum(GuidData.bag.getBagNum(this.selcetTabId), GuidData.bag.getBagSize(this.selcetTabId));

        }

        public refreshListData(idx: number): void {
            var ary: Array<SListItemData> = new Array;

            var bgData: any;
            var bagSize: number = GuidData.bag.getBagSize(idx);
            if (idx == BagData.TYPE_BAG) {
                bgData = GuidData.bag.getAllBgData();
            } else if (idx == BagData.TYPE_EQU_BG) {
                bgData = GuidData.bag.getEquBgData();
            } else if (idx == BagData.TYPE_GEM) {
                bgData = GuidData.bag.getGemBgData();
            } else {
                return;
            }

            for (var i: number = 0; i < bagSize; i++) {
                var listItemData: SListItemData = new SListItemData();
                listItemData.data = bgData[i];
                // if (listItemData.data) {
                //     listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                // }
                ary.push(listItemData);
            }

            //this._bgList.contentY = 0;
            //this._bgList.setGridData(ary, BgRender, 5, 70, 70, 512, 512, 360, 350);
            this._bgList.refreshData(ary)

            this.refreshNum(GuidData.bag.getBagNum(idx), bagSize);
        }



        public refreshItem(): void {

        }

        private itemDataClick($listItemData: ListItemData): void {

            /* UIManager.popClikNameFun("beibaowupinlan");

            var _listItemArr: Array<ListItemData> = this._bgList.data;
            var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
            evt.data = $listItemData.data;
            evt.buttonType = 2;
            ModuleEventManager.dispatchEvent(evt);

            for (var i: number = 0; _listItemArr && i < _listItemArr.length; i++) {
                if (_listItemArr[i] == $listItemData) {
                    _listItemArr[i].itemRender.selected = true;
                } else {
                    _listItemArr[i].itemRender.selected = false
                }
            } */

        }

        // private _bgList: GridList;
        // private _bgMask: UIMask;
        // private addList(): void {
        //     var $pos: Vector2D = new Vector2D(512, 90);
        //     this._bgList = this._listRender.createGridList();
        //     this._bgList.x = $pos.x;
        //     this._bgList.y = $pos.y;
        //     this.addChild(this._bgList);


        //     this._bgMask = new UIMask();
        //     this._bgMask.x = $pos.x;
        //     this._bgMask.y = $pos.y;
        //     this._bgMask.width = 350;
        //     this._bgMask.height = 350;
        //     this._bgMask.level = 5;
        //     this.addMask(this._bgMask);
        //     this._listRender.mask = this._bgMask;
        // }
        private b_tab0: SelectButton
        private b_tab1: SelectButton
        private b_tab2: SelectButton
        protected butClik(evt: InteractiveEvent): void {

            this.selectTab(evt.target);

        }
        private selcetTabId: number = 0;

        private selectTab($ui: UICompenent): void {
            if ($ui == this.b_tab0) {
                this.b_tab0.selected = true;
                this.b_tab1.selected = false;
                this.b_tab2.selected = false;
            } else if ($ui == this.b_tab1) {
                this.b_tab0.selected = false;
                this.b_tab1.selected = true;
                this.b_tab2.selected = false;
            } else if ($ui == this.b_tab2) {
                this.b_tab0.selected = false;
                this.b_tab1.selected = false;
                this.b_tab2.selected = true;
            }
            this.refreshData($ui.data);
        }
        private refreshData(idx: number): void {
            this.selcetTabId = idx;
            if (this.uiAtlasComplet) {
                this.refreshListData(idx)
            }

        }
    }
}