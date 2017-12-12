module charbg {

    export class SmeltEquPanel extends WindowCentenMin {
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

        private _slist: SmeltEquList;
        private _selLab: UICompenent;
        private setUIAtlas($atlas: UIAtlas): void {
            if (this._slist) {
                return;
            }
            this._slist = new SmeltEquList();
            this._slist.init($atlas, this);
            this._baseRender.uiAtlas = $atlas;
            this.addChild(this._baseRender.getComponent("b_title"));
            var ui: UICompenent = this._baseRender.getComponent("t_smelt_lab1");
            LabelTextFont.writeSingleLabel($atlas, ui.skinName, "默认保留玩家可使用的最高分装备", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.addChild(ui);
            ui = this._baseRender.getComponent("t_smelt_btn");
            this.addChild(ui);
            ui.addEventListener(InteractiveEvent.Down, this.onSmelt, this);
            this._selLab = this.addChild(this._baseRender.getComponent("t_smelt_lab2"));
        }

        private lock:boolean = false;
        public onSmelt($e: InteractiveEvent): void {
            if(this.lock){
                return;
            }
            UIManager.popClikNameFun("t_smelt_btn");
            var str: string = ""
            for (var i: number = 0; i < this.srcAry.length; i++) {
                if (this.srcAry[i].data) {
                    str += (this.srcAry[i].data.pos) + "|";
                }
            }
            str = str.slice(0, str.length - 1);
            console.log(str);
            this._slist.playEff();
            this.lock = true;
            TimeUtil.addTimeOut(300,()=>{
                this.lock = false;
                NetManager.getInstance().protocolos.smelting_equip(str);
            })
        }

        public bagDataChg(): void {
            this._slist.refreshData(this.getDataAry());
        }

        public onRemove(): void {
            if (this._slist) {
                this._slist.hide();
            }
        }

        public dataShow(ary: Array<BagItemData>): void {
            var dataList: Array<SListItemData> = new Array;
            for (var i: number = 0; i < ary.length; i++) {

                var data: SListItemData = new SListItemData();
                data.data = ary[i];
                data.id = i;
                dataList.push(data);

            }

            for (var i: number = ary.length; i < 9; i++) {
                var data: SListItemData = new SListItemData();
                data.id = i;
                dataList.push(data);
            }

            this._slist.refreshData(dataList);
            this.srcAry = dataList;

            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
        }

        public show($uiatlas: UIAtlas = null): void {
            this.setUIAtlas($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();

            this._slist.refreshData(this.getDataAry());
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.c_close) {

                UIManager.popClikNameFun("c_close");
                this.hide();
            }
        }
        public testGender($obj:any):boolean{
            if($obj.availableGender){
                var idx:number = $obj.availableGender.indexOf(GuidData.player.getCharType());
                return (idx != -1);
            }
            return false;
        }
        private srcAry: Array<SListItemData>;
        public getDataAry(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array<SListItemData>();

            var bgData: Array<BagItemData> = GuidData.bag.getEquBgData();

            for (var i: number = bgData.length - 1; i >= 0; i--) {
                if (bgData[i]) {
                    if(this.testGender(bgData[i].entryData)){
                        var equitem: BagItemData = GuidData.bag.getEquByPart(bgData[i].entryData.pos);
                        if (equitem) {
                            if (equitem.data.propData.force < bgData[i].data.propData.force) {
                                continue;
                            }
                        } else {
                            continue;
                        }
                    }
                    var data: SListItemData = new SListItemData();

                    data.data = bgData[i];
                    data.id = i;
                    ary.push(data);
                }
                if (ary.length >= 9) {
                    break;
                }
            }
            for (var i: number = ary.length; i < 9; i++) {
                var data: SListItemData = new SListItemData();
                data.id = i;
                ary.push(data);
            }
            this.srcAry = ary;
            return ary;
        }

        private _eqlSelPanel: SmeltEquSelPanel;
        public showEquSel(): void {
            if (!this._eqlSelPanel) {
                this._eqlSelPanel = new SmeltEquSelPanel();
            }
            this.hide();
            this._eqlSelPanel.load(() => {
                var ary: Array<BagItemData> = new Array;
                for (var i: number = 0; i < this.srcAry.length; i++) {
                    if (this.srcAry[i].data) {
                        ary.push(this.srcAry[i].data);
                    }
                }
                this._eqlSelPanel.show(this._baseRender.uiAtlas, ary, this);
            })

        }

    }

    export class SmeltEquList extends SList {
        public constructor() {
            super();

        }
        public smeltPanel: SmeltEquPanel;
        private _frameRender: FrameUIRender;
        public init($atlas: UIAtlas, $sp: SmeltEquPanel): void {
            this.baseAtlas = $atlas;
            this.smeltPanel = $sp;
            this.initData();
        }

        private effAry: Array<FrameTipCompenent>;
        public initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var w: number = 283;
            var h: number = 256;
            this.setData(ary, SmeltEquListItemRender, w, h, 100, 90, 3, 256, 256, 3, 3);
            this.center = 5;
            this.middle = -10;
            this.setShowLevel(4);

            this._frameRender = new FrameUIRender();
            this.addRender(this._frameRender);
            this._frameRender.setImg(getEffectUIUrl("ui_rl"), 4, 4, ($ary: any) => {
                this.effAry = $ary;
                for (var i: number = 0; i < this.effAry.length; i++) {
                    var xNum: number = i % 3;
                    var yNum: number = float2int(i / 3);
                    this.effAry[i].x = -30 + xNum * 100;
                    this.effAry[i].y = -30 + yNum * 90;
                    this.effAry[i].speed = 3;
                }
            }, 9);
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this._dataAry.length; i++) {
                if(this._dataAry[i].data){
                    this.effAry[i].playOne(this);
                }                
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }



    }

    export class SmeltEquListItemRender extends SListItem {
        //public static baseAtlas: UIAtlas;
        private _ibg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "s_item", 0, 0, 68, 68);
            $container.addChild(this._ibg);

            this._ibg.addEventListener(InteractiveEvent.Down, this.onclick, this);
        }
        private onclick($e: InteractiveEvent): void {
            if (this.itdata.data) {
                this.itdata.data = null;
                this.applyRender();
            } else {
                (<SmeltEquList>this.parentTarget).smeltPanel.showEquSel();
            }
        }
        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data) {
                this.applyRender();
            }
        }

        private applyRender(): void {
            if (this.itdata.data) {
                IconManager.getInstance().drawItemIcon60(this._ibg, this.itdata.data.entry, 1, false, false);
            } else {
                this.drawNull(this._ibg);
            }
        }

        private drawNull($ui: UICompenent): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);

            UiDraw.cxtDrawImg(ctx, PuiData.ADDITEM, new Rectangle(16, 16, 35, 35), UIData.publicUi);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


    }
}