module treasure {
    export class cilckVo {
        public id: number;
        public type: number;
    }

    export class SlotCell {
        public sloticon: UICompenent
        public slottxt: UICompenent
        public uiAtlas: UIAtlas;
        public parent: TreasureWear
        public data: TreasureWearVo

        public draw($vo: TreasureWearVo) {
            this.data = $vo;
            if ($vo.state == 0) {
                this.sloticon.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                //未解锁
                UiDraw.SharedDrawImg(this.uiAtlas, this.uiAtlas, this.sloticon.skinName, "Iconno");
                this.parent.setUiListVisibleByItem([this.slottxt], true);
                var $objslotitem: any = TableData.getInstance().getData(TableData.tb_talisman_slot, $vo.slotid);
                var $realmbreakobj: any = TableData.getInstance().getData(TableData.tb_realmbreak_base, $objslotitem["realmbreak_lev"]);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.slottxt.skinName, "境界\n" + $realmbreakobj["name"] + "\n解锁", 16, TextAlign.LEFT, ColorType.Whitefff4d6);
                this.slottxt.x = 29 + this.sloticon.x
                this.slottxt.y = 18 + this.sloticon.y
            } else {
                this.sloticon.addEventListener(InteractiveEvent.Up, this.equClick, this);
                if ($vo.treasureid > 0) {
                    var $obj: any = TableData.getInstance().getData(TableData.tb_talisman_base, $vo.treasureid)
                    var $url: string = "ui/load/treasure/" + $obj["icon"]
                    IconManager.getInstance().getIcon($url + "_c.png",
                        ($img: any) => {
                            var $rec: UIRectangle = this.uiAtlas.getRec(this.sloticon.skinName);
                            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                            var iconok: UIRectangle = this.uiAtlas.getRec("Iconok")
                            ctx.drawImage(this.uiAtlas.useImg, iconok.pixelX, iconok.pixelY, iconok.pixelWitdh, iconok.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
                            
                            var equ: UIRectangle = this.uiAtlas.getRec("equ" + $obj["quality"]);
                            ctx.drawImage(this.uiAtlas.useImg, equ.pixelX, equ.pixelY, equ.pixelWitdh, equ.pixelHeight, 8, 8, 72, 72);

                            ctx.drawImage($img, 0, 0, $img.width, $img.height, 15, 15, 60, 60);

                            this.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                        });
                } else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.uiAtlas, this.sloticon.skinName, "Iconok");
                }

                this.parent.setUiListVisibleByItem([this.slottxt], false);
            }

        }

        public equClick($evt: InteractiveEvent) {
            if (this.data.state > 0 && this.data.treasureid > 0) {
                var vo: cilckVo = new cilckVo;
                vo.id = this.data.treasureid
                vo.type = 1;
                var bb = new TreasureUiEvent(TreasureUiEvent.SHOW_TIPS_EVENT);
                bb.data = vo;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public clear() {
            this.data = null;
            this.parent.setUiListVisibleByItem([this.sloticon, this.slottxt], false);
        }
    }

    export class TreasureWear extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;

            if (this.wearList) {
                this.wearList.dispose();
                this.wearList = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
        }

        public initUiAtlas($uiAtlas, $winRender: UIRenderComponent): void {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._publicRender = $winRender;
            this.initView();
        }

        // private a_zhanli_all: UICompenent
        private d_listindex: UICompenent
        private slotAry: Array<SlotCell>
        private initView(): void {

            this.d_listindex = this.addChild(this._bgRender.getComponent("d_listindex"));
            this.addChild(this._bgRender.getComponent("e_listbg"));
            this.addChild(this._baseRender.getComponent("e_title"));
            // this.a_zhanli_all = this.addChild(this._baseRender.getComponent("a_zhanli_all"));
            var ui: UICompenent = (<TreasureUiPanel>this.parent).loadBigPicByUrl("ui/uidata/treasure/wearBg.png");
            this.parent.setSizeForPanelUiCopy(ui, "wearbg", this._baseRender);

            this.slotAry = new Array
            for (let i = 0; i < 5; i++) {
                var cell: SlotCell = new SlotCell;
                cell.sloticon = this.addChild(this._bgRender.getComponent("e_slot" + i));
                cell.slottxt = this.addChild(this._baseRender.getComponent("e_slottxt" + i));
                cell.parent = this;
                cell.uiAtlas = this._baseRender.uiAtlas;
                this.slotAry.push(cell);
            }

        }


        public setZhanli() {
            // ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_zhanli_all.skinName, String(GuidData.player.gettalismantotalzhanli()), ArtFont.num56)
        }

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
            if (this.wearList) {
                this.wearList.left = this.d_listindex.parent.x / UIData.Scale + this.d_listindex.x
                this.wearList.top = this.d_listindex.parent.y / UIData.Scale + this.d_listindex.y
            }
        }

        public chgslot() {
            var ary: Array<TreasureWearVo> = GuidData.grow.gettalismanslotlist();
            for (let i = 0; i < 5; i++) {
                if (i < ary.length) {
                    this.slotAry[i].draw(ary[i]);
                } else {
                    this.slotAry[i].clear();
                }
            }
        }

        public wearList: WearList;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            // this.setZhanli();
            (<TreasureUiPanel>this.parent).addBigPic();

            if (!this.wearList) {
                this.wearList = new WearList();
                this.wearList.init(this._baseRender.uiAtlas);
            }
            this.wearList.show();
            this.chgslot();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            (<TreasureUiPanel>this.parent).removeBigPic();
            if (this.wearList) {
                this.wearList.hide();
            }
        }
    }


    /**
     * 已有法宝list
     */
    export class WearList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, WearListRender, 400, 385, 80, 70, 5, 512, 512, 5, 7);
        }


        public refreshDataByNewData(): void {
            var $arr: Array<TreasureVo> = TreasureModel.getInstance().getTreasureList();
            var $sListItemData: Array<SListItemData> = this.getData($arr);
            this.refreshData($sListItemData);
        }


        public getData($data: Array<TreasureVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
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

    export class WearListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Dicon: UICompenent;
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Dicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dicon", 0, 0, 68, 68);
            $container.addChild(this.Dicon);
            this.Dicon.addEventListener(InteractiveEvent.Up, this.btnChick, this);
        }


        private applyrender(): void {
            if (this.itdata && this.itdata.data) {

                var $vo: TreasureVo = this.itdata.data
                var $obj: any = TableData.getInstance().getData(TableData.tb_talisman_base, $vo.id)
                var $url: string = "ui/load/treasure/" + $obj["icon"]
                IconManager.getInstance().getIcon($url + "_c.png",
                    ($img: any) => {
                        var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Dicon.skinName);
                        var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                        // UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                        
                        // console.log("---$obj-",$obj["quality"]);
                        var equ: UIRectangle = this.parentTarget.baseAtlas.getRec("equ" + $obj["quality"])
                        ctx.drawImage(this.parentTarget.baseAtlas.useImg, equ.pixelX, equ.pixelY, equ.pixelWitdh, equ.pixelHeight, 0, 0, 68, 68);

                        ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                        if (this.selected) {
                            UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                        }

                        this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                    });

            }
        }

        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata && this.itdata.data) {
                if (val) {
                    var vo: cilckVo = new cilckVo;
                    vo.id = this.itdata.data.id
                    vo.type = 0;
                    var bb = new TreasureUiEvent(TreasureUiEvent.SHOW_TIPS_EVENT);
                    bb.data = vo;
                    ModuleEventManager.dispatchEvent(bb);
                }

                this.applyrender();
            }
        }

        public get selected(): boolean {
            return this._selected;
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
            UIManager.popClikNameFun("Dicon")
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.Dicon);
        }
    }
}