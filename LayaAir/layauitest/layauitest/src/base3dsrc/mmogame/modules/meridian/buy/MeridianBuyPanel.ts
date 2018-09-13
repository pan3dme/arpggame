module meridian {


    export class MeridianBuyListRender extends SListItem {
        //public static baseAtlas: UIAtlas;

        private BUY_BG: UICompenent;
        private BUY_BUT: UICompenent


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            this.BUY_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "BUY_BG", 0, 5, 560, 100 - 10, 10, 10);
            $container.addChild(this.BUY_BG);


            this.BUY_ICON = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_ICON", 15, 15, 68, 68);
            $container.addChild(this.BUY_ICON);


            this.BUY_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_NAME", 90, 23, 80, 18);
            $container.addChild(this.BUY_NAME);

            this.BUY_GET_RES = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_GET_RES", 90, 55, 200, 18);
            $container.addChild(this.BUY_GET_RES);

            this.BUY_HAS_RES = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_HAS_RES", 240, 23, 140, 18);
            $container.addChild(this.BUY_HAS_RES);


            this.BUY_BUT = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "BUY_BUT", 430, 21, 120, 54);
            $container.addChild(this.BUY_BUT);
            this.BUY_BUT.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.BUY_BUT_TXT = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BUY_BUT_TXT", 430 + 20, 21 + 17, 80, 18);
            $container.addChild(this.BUY_BUT_TXT);



        }
        private BUY_BUT_TXT: UICompenent
        private BUY_ICON: UICompenent
        private BUY_HAS_RES: UICompenent
        private BUY_NAME: UICompenent
        private BUY_GET_RES: UICompenent
        private _canclick: boolean = true;
        private butClik(evt: any): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(500, () => {
                    this._canclick = true;
                });

                UiTweenScale.getInstance().changeButSize(evt.target);
                if (this.itdata && this.itdata.data) {
                    var $vo: tb.TB_meridian_item = <tb.TB_meridian_item>this.itdata.data;
                    var $hasNum: number = GuidData.bag.getItemCount($vo.itemId);
                    if ($hasNum > 0) {
                        // this.changeHasItemNum($hasNum - 1);
                        NetManager.getInstance().protocolos.add_meridian_exp($vo.id);
                    } else {
                        ModulePageManager.openPanel($vo.goto, $vo.goto_sub);
                    }
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }

        public refreshDraw() {
            this.render(this.itdata);
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.setnull();
            }


        }
        private setnull(): void {
            UiDraw.clearUI(this.BUY_BG);
            UiDraw.clearUI(this.BUY_BUT);
            UiDraw.clearUI(this.BUY_BUT_TXT);
            UiDraw.clearUI(this.BUY_ICON);
            UiDraw.clearUI(this.BUY_HAS_RES);
            UiDraw.clearUI(this.BUY_NAME);
            UiDraw.clearUI(this.BUY_GET_RES);
        }
        private applyRender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: tb.TB_meridian_item = <tb.TB_meridian_item>this.itdata.data;
                IconManager.getInstance().drawItemIcon60(this.BUY_ICON, $vo.itemId, 1)

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.BUY_BG.skinName, UIData.publicUi, PuiData.Slist_nselect);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_NAME.skinName, ColorType.Brown7a2f21 + $vo.name, 16, TextAlign.LEFT)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_GET_RES.skinName, ColorType.color9a683f + "增加穴位修炼经验" + $vo.exp + "点", 16, TextAlign.LEFT)

                this.changeHasItemNum(GuidData.bag.getItemCount($vo.itemId))

            }
        }
        private changeHasItemNum(value: number): void {
            var $skinName: string = "U_BUY_BUT_B"
            var $str: string = "购买"
            if (value > 0) {
                $skinName = "U_BUY_BUT_A"
                $str = "使用"
            }
            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.BUY_BUT.skinName, $skinName);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_BUT_TXT.skinName, ColorType.Brown7a2f21 + $str, 16, TextAlign.CENTER)
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.BUY_HAS_RES.skinName, ColorType.Brown7a2f21 + "拥有：" + value, 16, TextAlign.LEFT)


        }

    }
    export class MeridianBuyList extends SList {

        public constructor() {
            super();
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, MeridianBuyListRender, 560, 100 * 4, 512, 100, 4, 512, 1024, 1, 7);
        }

        private _tbDataArr: Array<SListItemData>;
        public resetData(): void {
            //该方法只初始化时走
            if (!this._tbDataArr) {
                this._tbDataArr = new Array;
                var $item: Array<tb.TB_meridian_item> = tb.TB_meridian_item.getItem()
                for (var i: number = 0; i < $item.length; i++) {
                    var $vo: SListItemData = new SListItemData();
                    $vo.data = $item[i]
                    this._tbDataArr.push($vo);
                }
                this.refreshData(this._tbDataArr);
            } else {
                this.refreshVo();
            }
        }

        /**
         * 数据变化刷新数据
         */
        public refreshVo() {
            this.refreshDraw();
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }
    export class MeridianBuyPanel extends WindowMinUi {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false;

        public dispose() {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.meridianBuyList) {
                this.meridianBuyList.dispose();
                this.meridianBuyList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {

            GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
                this.winmidRender.uiAtlas = $publicbgUiAtlas;
                this._midRender.uiAtlas.setInfo("ui/uidata/meridian/meridian.xml", "ui/uidata/meridian/meridian.png", () => { this.loadConfigCom() }, "ui/uidata/meridian/meridianuse.png");

            });

        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.meridianBuyList.show();
        }
        public hide(): void {
            this.meridianBuyList.hide();
            UIManager.getInstance().removeUIContainer(this);
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.baseBg:
                    this.hide()
                    break;
                case this.e_close:
                    this.hide()
                    break
            }
        }
        private b_list_pos: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;


            this.addChild(this._topRender.getComponent("b_win_tittle"));
            this.b_list_pos = this.addChild(this._topRender.getComponent("b_list_pos"));

            this.initList();

            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }

        public resize(): void {
            super.resize();
            if (this.meridianBuyList) {
                this.meridianBuyList.left = this.b_list_pos.parent.x / UIData.Scale + this.b_list_pos.x;
                this.meridianBuyList.top = this.b_list_pos.parent.y / UIData.Scale + this.b_list_pos.y;
            }

        }
        public meridianBuyList: MeridianBuyList
        private initList(): void {
            this.meridianBuyList = new MeridianBuyList;
            this.meridianBuyList.init(this._midRender.uiAtlas)

        }
    }
}