module store {

    export class ShopList extends SList {

        public constructor() {
            super();
            this.left = 216;
            this.top = 89;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, ShopListRender, 428, 421, 214, 91, 4, 256, 1024, 2, 7, 1);
        }

        /**
         * refreshData
         */
        private _type: number
        private _aryList: Array<StoreItemVo>
        public refreshDataByNewData(): void {
            //通过type，获得所对应的列表
            this._aryList = StoreModel.getInstance().getList(this._type);
            var $sListItemData = this.getData(this._aryList);
            this.refreshData($sListItemData);
            this.setSelectIndex(this.getCurrentSelectIndex());
        }

        public getData($ary: Array<StoreItemVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                $ary[i].type = this._type;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            console.log("--选中的数据--", ary);
            return ary;
        }

        public show($value: number): void {
            this._type = $value;
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

    export class ShopListRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private I_selects: UICompenent;
        private I_icon: UICompenent;
        private I_name: UICompenent;
        private I_money: UICompenent;
        private I_bg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var customRender: UIRenderComponent = this._customRenderAry[0];

            this.I_icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_icon", 0, 0, 80, 78);
            this.I_icon.addEventListener(InteractiveEvent.Up, this.onTip, this);
            $container.addChild(this.I_icon);

            this.I_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_name", 89, 20, 100, 20);
            $container.addChild(this.I_name);

            this.I_money = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I_money", 86, 42, 109, 35);
            $container.addChild(this.I_money);

            this.I_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "I_bg", 0, 0, 205, 88, 10, 10);
            $container.addChild(this.I_bg);

            this.I_selects = this.creatGrid9SUI(customRender, this.parentTarget.baseAtlas, "I_selects", 0, 0, 205, 88, 14, 14);
            $container.addChild(this.I_selects);

            this.I_bg.addEventListener(InteractiveEvent.Up, this.equClick, this);
        }

        public onTip() {
            if (this.itdata && this.itdata.data) {
                var vo: StoreItemVo = <StoreItemVo>this.itdata.data
                var itemid: number;
                if (vo.type == 1) {
                    var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(vo.data1.id);
                    itemid = $tabelvo.itemId;
                } else {
                    itemid = vo.data.itemId;
                }
                var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(itemid);

                var bag: BagItemData = new BagItemData();
                bag.entryData = obj;

                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
                aa.data = bag;
                aa.buttonType = -1;
                ModuleEventManager.dispatchEvent(aa);
            }
        }

        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata && this.itdata.data) {
                if (val) {
                    var bb = new store.StoreEvent(store.StoreEvent.SELECT_PROP_EVENT);
                    bb.data = this.itdata;
                    ModuleEventManager.dispatchEvent(bb);
                }

                this.applyrender();
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawIconAndRecommend($data: StoreItemVo): void {
            var itemid: number;
            //1代表家族商店  特殊
            if ($data.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById($data.data1.id);
                itemid = $tabelvo.itemId;
            } else {
                itemid = $data.data.itemId;
            }

            var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(itemid)
            IconManager.getInstance().getIcon(geteqiconIconUrl($vo.icon),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.I_icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(12, 10, 68, 68), UIData.publicUi);

                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($vo.quality), new Rectangle(12, 10, 68, 68), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 16, 14, 60, 60);

                    if ($data.type == 1) {
                        if ($tabelvo.discount_flag < 100) {
                            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("Discount")
                            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                        }

                        if ($data.data1.num == $data.data2.num) {
                            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("SoldOut")
                            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 30, 28, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                            // } else {
                        }
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($tabelvo.itemNum), 16, 75, 54, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    } else {
                        if ($data.data.discount < 10) {
                            //显示打折信息
                            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("Discount")
                            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                        } else if ($data.data.recommend) {
                            //显示推荐信息
                            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("Recommend")
                            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                        } else if ($data.isnewprop) {
                            //显示新物品信息
                            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("New")
                            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                        }

                        var aa = $data.getNum();
                        if (aa != -1) {
                            if (aa == 0) {
                                //售罄
                                var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("SoldOut")
                                ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 30, 28, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);
                                // } else {
                            }
                        }
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($data.data.count), 16, 75, 54, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    }

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawName($data: StoreItemVo): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.I_name.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var itemid: number;
            if ($data.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById($data.data1.id);
                itemid = $tabelvo.itemId;
            } else {
                itemid = $data.data.itemId;
            }
            var $obj: any = TableData.getInstance().getData(TableData.tb_item_template, itemid);

            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, $obj.name, 16, 0, 0, TextAlign.LEFT, ColorType.Brown7a2f21);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private getpriceMoney(): number {
            var price = Math.ceil(this.itdata.data.data.discount / 10 * this.itdata.data.data.costResource[0][1])
            return price;
        }

        private applyrender(): void {
            var vo: StoreItemVo = <StoreItemVo>this.itdata.data

            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I_selects.skinName, UIData.publicUi, PuiData.TITLEHIGHT);
            } else {
                UiDraw.clearUI(this.I_selects);
            }

            this.drawIconAndRecommend(vo);

            this.drawName(vo);
            var price: number;
            var ptype: number;
            if (vo.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(vo.data1.id);
                price = $tabelvo.costResource[0][1];
                ptype = $tabelvo.costResource[0][0];
            } else {
                price = this.getpriceMoney();
                ptype = vo.data.costResource[0][0];
            }
            // this.drawDiscountPrice(price, ptype);
            UiDraw.drawRewardIconAndtxt(this.I_money, [ptype, price], true, TextAlign.LEFT, 10);

            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I_bg.skinName, UIData.publicUi, PuiData.Slist_select);

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
            UiDraw.clearUI(this.I_selects);
            UiDraw.clearUI(this.I_icon);
            UiDraw.clearUI(this.I_name);
            UiDraw.clearUI(this.I_money);
            UiDraw.clearUI(this.I_bg);
        }
    }
}