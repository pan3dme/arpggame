module faction {

    export class ZhaoMuVo {
        public vo: faction_info;
        public isok: boolean = false;
    }



    export class ApplyZhaoMuListPanel extends SList {
        public constructor() {
            super();
            this.left = 43;
            this.top = 132;
        }
        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            // this.contextNum = 10;
            this.initData();
        }
        public initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            this.setData(ary, ApplyZhaoMuListItemRender, 589, 250, 0, 50, 5, 256, 512, 1, 5, 1);
        }
        /**
         * refreshData
         */

        private _sListItemData: Array<SListItemData>
        public refreshDataByNewData($ary: Array<faction_info>): void {
            this._sListItemData = this.getData($ary);
            // this.resetDataByok();
            this.refreshData(this._sListItemData);
            this.setSelectIndex(0);
        }

        public getData($ary: Array<faction_info>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                var $zhaoMuVo: ZhaoMuVo = new ZhaoMuVo();
                $zhaoMuVo.vo = $ary[i];
                // if ($index == i) {
                //     item.selected = true;
                // }
                item.data = $zhaoMuVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _isokary: Array<SListItemData>;
        public isokstate($data: SListItemData): void {

            if (!this._isokary) {
                this._isokary = new Array
            }
            this._isokary.push($data);
            this.resetDataByok();
        }

        private resetDataByok(): void {

            if (this._isokary && this._isokary.length > 0) {
                for (var i = 0; i < this._sListItemData.length; i++) {
                    if (this.compareData(this._sListItemData[i])) {
                        this._sListItemData[i].data.isok = true;
                    }
                }
                this.refreshDraw();
            }

        }

        private compareData($data: SListItemData): boolean {
            for (var i = 0; i < this._isokary.length; i++) {
                if ($data.data.vo.faction_guid == this._isokary[i].data.vo.faction_guid) {
                    return true;
                }
            }
            return false;
        }

        // protected toSeversUrl(): void {
        //     console.log("==页数==",this.pageId);
        //     NetManager.getInstance().protocolos.faction_getlist(this.pageId, this.contextNum, 0);
        // }
        // protected meshSeverData(byte: ByteArray): void {
        //     var faction: s2c_faction_get_list_result = new s2c_faction_get_list_result()
        //     s2c_faction_get_list_result.read(faction, byte);
        //     for (var i: number = 0; i < faction.list.length; i++) {
        //         var $itemDataVo: SListItemData = new SListItemData()
        //         $itemDataVo.id = (faction.curpag - 1) * this.contextNum + i
        //         var $zhaoMuVo: ZhaoMuVo = new ZhaoMuVo();
        //         $zhaoMuVo.vo = faction.list[i]
        //         $itemDataVo.data = $zhaoMuVo
        //         this.pushDataToList($itemDataVo)
        //     }

        // }
        // protected getHanderMap(): Object {
        //     var obj: Object = new Object;
        //     obj[Protocols.SMSG_FACTION_GET_LIST_RESULT] = ($byte: ByteArray) => { this.getSeverFunData($byte) };
        //     return obj;
        // }


        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                // this.sendPageByNum(1);
            }
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class ApplyZhaoMuListItemRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private bg_0: UICompenent;
        private b_S_0: UICompenent;
        private i_0: UICompenent;
        private n_0: UICompenent;
        private lev_0: UICompenent;
        private levMax_0: UICompenent;
        private zn_0: UICompenent;
        private needLev_0: UICompenent;
        private select_0: UICompenent;


        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var centerRender: UIRenderComponent = this._customRenderAry[0];

            this.bg_0 = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 589, 50);
            $container.addChild(this.bg_0);

            this.b_S_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_S", 11, 8, 30, 30);
            $container.addChild(this.b_S_0);

            this.i_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I", 55, 4, 42, 42);
            $container.addChild(this.i_0);

            this.n_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "N", 121, 16, 98, 20);
            $container.addChild(this.n_0);

            this.lev_0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Lev", 240, 16, 40, 20);
            $container.addChild(this.lev_0);

            this.levMax_0 = this.creatSUI(centerRender, this.parentTarget.baseAtlas, "LevMax", 295, 16, 80, 20);
            $container.addChild(this.levMax_0);

            this.zn_0 = this.creatSUI(centerRender, this.parentTarget.baseAtlas, "Zn", 385, 16, 110, 20);
            $container.addChild(this.zn_0);

            this.needLev_0 = this.creatSUI(centerRender, this.parentTarget.baseAtlas, "NeedLev", 520, 16, 45, 20);
            $container.addChild(this.needLev_0);

            this.select_0 = this.creatGrid9SUI(centerRender, this.parentTarget.baseAtlas, "Select", 0, 0, 589, 50, 15, 15);
            $container.addChild(this.select_0);

        }

        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyRender();
            }
            if (val) {
                var $evt = new faction.FactionEvent(faction.FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT);
                $evt.data = this.itdata;
                ModuleEventManager.dispatchEvent($evt);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }
        public refreshDraw(): void {
            if (this.itdata) {
                this.applyRender();
            }
        }
        private applyRender(): void {
            console.log("===this.itdata==", this.itdata);
            var $data = this.itdata;
            var $vo: ZhaoMuVo = $data.data;
            var $tab: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById($vo.vo.level);
            this.bg_0.addEventListener(InteractiveEvent.Down, this.equClick, this);
            if (!($data.id % 2)) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.bg_0.skinName, "bg");
            } else {
                LabelTextFont.clearLabel(this.uiAtlas, this.bg_0.skinName);
            }
            //勾选框
            if ($vo.isok) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.b_S_0.skinName, UIData.publicUi, PuiData.SELECT_1);
            } else {
                LabelTextFont.clearLabel(this.uiAtlas, this.b_S_0.skinName);
            }
            //头像
            this.setIcon($data);
            //家族名
            // var name = $vo.vo.faction_name.split(",");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.n_0.skinName, "[853d07]" + getBaseName($vo.vo.faction_name), 16, TextAlign.CENTER);
            //家族等级
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.lev_0.skinName, "[853d07]" + String($vo.vo.level), 16, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.lev_0.skinName, String($vo.vo.level), ArtFont.num1, TextAlign.CENTER);
            //人数
            var bb = $vo.vo.player_count + "/" + $tab.maxnum
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.levMax_0.skinName, "[853d07]" + bb, 16, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.levMax_0.skinName, bb, ArtFont.num1, TextAlign.CENTER)

            //帮主名字
            // var bzname = $vo.vo.faction_bz.split(",");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.zn_0.skinName, "[853d07]" + getBaseName($vo.vo.faction_bz), 16, TextAlign.CENTER);
            //最低等级
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.needLev_0.skinName, "[853d07]" + String($vo.vo.minlev), 16, TextAlign.CENTER);
            // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.needLev_0.skinName, String($vo.vo.minlev), ArtFont.num1, TextAlign.CENTER)

            if (this.selected) {
                // this.drawselect();
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.select_0.skinName, UIData.publicUi, PuiData.Select);
            } else {
                LabelTextFont.clearLabel(this.uiAtlas, this.select_0.skinName);
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.bg_0.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.bg_0);
            UiDraw.clearUI(this.b_S_0);
            UiDraw.clearUI(this.i_0);
            UiDraw.clearUI(this.n_0);
            UiDraw.clearUI(this.lev_0);
            UiDraw.clearUI(this.levMax_0);
            UiDraw.clearUI(this.zn_0);
            UiDraw.clearUI(this.needLev_0);
            UiDraw.clearUI(this.select_0);
        }

        private equClick(evt: InteractiveEvent): void {
            // UIManager.popClikNameFun("ApplyZhaoMuListPanel", SharedDef.MODULE_FACTION);

            //  if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
            //     return;
            // }
            //选中，事件派发
            this.setSelect();
        }

        private setIcon($obj: SListItemData): void {
            var $vo: ZhaoMuVo = $obj.data;
            var b = $vo.vo.icon == 0 ? 1 : $vo.vo.icon
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String(b)),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.i_0.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 42, 42), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0,$img.width, $img.height, 1, 1, 40, 40);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }
    }

}