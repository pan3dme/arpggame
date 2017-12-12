module charbg {

    export class SmeltEquSelPanel extends WindowMinUi {
        private _baseRender: UIRenderComponent;
        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

        }

        public applyLoad(): void {
            this.applyLoadComplete();
        }

        private _slist: SmeltEquSelList;
        private _selLab: UICompenent;
        private setUIAtlas($atlas: UIAtlas): void {
            if (this._slist) {
                return;
            }
            this._slist = new SmeltEquSelList();
            this._slist.init($atlas, this);
            this._baseRender.uiAtlas = $atlas;
            this.addChild(this._baseRender.getComponent("c_title"));
            var ui: UICompenent = this._baseRender.getComponent("t_smelt_sel_lab1");
            LabelTextFont.writeSingleLabel($atlas, ui.skinName, "点击选择想要熔炼的装备", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.addChild(ui);
            ui = this._baseRender.getComponent("t_sure_btn");
            this.addChild(ui);
            ui.addEventListener(InteractiveEvent.Down, this.onSmelt, this);
            this._selLab = this.addChild(this._baseRender.getComponent("t_smelt_sel_lab2"));
        }

        public onSmelt($e: InteractiveEvent): void {
            this.hide();
            this.rootPanel.dataShow(this.baseAry);            
        }

        public bagDataChg(): void {
            this._slist.refreshData(this.getDataAry());
        }

        public onRemove(): void {
            if (this._slist) {
                this._slist.hide();
            }
        }

        private rootPanel:SmeltEquPanel;
        public show($uiatlas: UIAtlas, $srcAry: Array<BagItemData>,$panel:SmeltEquPanel): void {
            this.rootPanel = $panel;
            this.setUIAtlas($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
            this.baseAry = $srcAry;
            this._slist.refreshData(this.getDataAry());
            this.drawNum();
        }
        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }
        }

        private srcAry: Array<SListItemData>;
        private baseAry: Array<BagItemData>;

        public getDataAry(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array<SListItemData>();

            var bgData: Array<BagItemData> = GuidData.bag.getEquBgData();

            for (var i: number = 0; i < bgData.length; i++) {
                if (bgData[i]) {
                    var data: SListItemData = new SListItemData();
                    data.data = bgData[i];
                    data.id = this.hasData(bgData[i]);
                    ary.push(data);
                }
            }
            this.srcAry = ary;
            return ary;
        }

        public hasData($bd: BagItemData): number {
            for (var i: number = 0; i < this.baseAry.length; i++) {
                if (this.baseAry[i].id == $bd.id) {
                    return 1;
                }
            }
            return 0;
        }

        public setSelItem($sd: SListItemData): boolean {
            if (this.baseAry.length >= 9) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "熔炉已满", 99);
                return false;
            }
            this.baseAry.push($sd.data);
            this.drawNum();
            return true;
        }


        public unSetSelItem($sd: SListItemData): boolean {
            for (var i: number = 0; i < this.baseAry.length; i++) {
                if(this.baseAry[i].id == $sd.data.id){
                    this.baseAry.splice(i,1);
                    break;
                }
            }
            this.drawNum();
            return true;
        }

        private drawNum(): void {
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._selLab.skinName,
                "已选中:" + this.baseAry.length + "/" + 9, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

    }

    export class SmeltEquSelList extends SList {
        public constructor() {
            super();

        }

        public selPanel: SmeltEquSelPanel;
        public init($atlas: UIAtlas, $selPanel: SmeltEquSelPanel): void {
            SmeltEquSelListItemRender.baseAtlas = $atlas;
            this.selPanel = $selPanel;
            this.initData();
            this.bgMask.level = 10;
        }

        public initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var w: number = 480;
            var h: number = 256;
            this.setData(ary, SmeltEquSelListItemRender, w, h, 100, 90, 3, 512, 512, 5, 6);
            this.center = 5;
            this.middle = -10;
            this.setShowLevel(4);
        }



        public show(): void {
            UIManager.getInstance().addUIContainer(this);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }



    }

    export class SmeltEquSelListItemRender extends SListItem {
        public static baseAtlas: UIAtlas;;
        private _ibg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatSUI($bgRender, SmeltEquSelListItemRender.baseAtlas, "s_item", 0, 0, 68, 68);
            $container.addChild(this._ibg);

            this._ibg.addEventListener(InteractiveEvent.Down, this.onclick, this);
        }
        private onclick($e: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (this.itdata.id == 0) {
                    var tf: boolean = (<SmeltEquSelList>this.parentTarget).selPanel.setSelItem(this.itdata);
                    if (tf) {
                        this.itdata.id = 1;
                        this.applyRender();
                    }
                } else {
                     (<SmeltEquSelList>this.parentTarget).selPanel.unSetSelItem(this.itdata);
                     this.itdata.id = 0;
                     this.applyRender();
                }

            } else {

            }
        }
        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data) {
                this.applyRender();
            } else {
                this.drawNull(this._ibg);
            }
        }

        private applyRender(): void {
            if (this.itdata.data) {
                this.drawSel(this._ibg, this.itdata.data.entry, this.itdata.id == 1);
            } else {
                this.drawNull(this._ibg);
            }
        }

        public drawSel($ui: UICompenent, id: number, sel: boolean): void {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon,
                ($img) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    
                    if (sel) {
                        UiDraw.cxtDrawImg(ctx, PuiData.HASSEL, new Rectangle(0, 20, 68, 27), UIData.publicUi);
                        LabelTextFont.writeSingleLabelToCtx(ctx, "已选择", 14, 0, 22, TextAlign.CENTER, ColorType.Whiteffffff);
                    }

                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawNull($ui: UICompenent): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


    }
}