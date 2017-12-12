module chgfish {

    export class ChgfishUiPanel extends UIPanel {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this.fishTabList) {
                this.fishTabList.dispose();
                this.fishTabList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0;
            this.right = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/dropmenu/dropmenu.xml", "ui/uidata/dropmenu/dropmenu.png", () => { this.loadConfigCom() }, "ui/uidata/dropmenu/dropmenupc.png");
        }


        private c_basebg: UICompenent
        private c_bg: UICompenent
        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._baseRender;

            this.c_basebg = this.addChild(this._bgRender.getComponent("c_basebg"));
            this.c_basebg.addEventListener(InteractiveEvent.Up, v => { }, this);
            this.c_basebg.addEventListener(InteractiveEvent.Down, v => {
                this.hide();
            }, this);

            this.c_bg = this.addChild(renderLevel.getComponent("c_bg"));

            this.applyLoadComplete();
        }

        public fishTabList: FishTabList;
        public show($ui: FrameCompenent): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (!this.fishTabList) {
                this.fishTabList = new FishTabList();
                this.fishTabList.init(this._baseRender.uiAtlas);
            }
            this.fishTabList.show();


            this.c_bg.x = $ui.x - 5
            this.c_bg.y = $ui.y + $ui.height

            this.fresh();
            this.resize();
        }

        private fresh(): void {

        }


        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.fishTabList) {
                this.fishTabList.hide();
            }
        }


        public resize(): void {
            this.c_basebg.top = 0
            this.c_basebg.left = 0;
            this.c_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.c_basebg.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
            if (this.fishTabList) {
                this.fishTabList.left = this.c_bg.parent.x / UIData.Scale + this.c_bg.x + 6
                this.fishTabList.top = this.c_bg.parent.y / UIData.Scale + this.c_bg.y + 17
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                // case this.w_close:
                //     ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.HIDE_Stronger_EVENT));
                //     break

                default:
                    break;
            }
        }
    }



    export class FishTabList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, FishTabRender, 154, 182, 0, 52, 3, 256, 512, 1, 6);
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
            var redary: Array<RedPointNode> = ChgfishModel.getInstance().getList();
            for (var i: number = 0; i < redary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = redary[i];
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
            this.setSelectIndex(0);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class FishTabRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private CS_tab: UICompenent;
        private CS_name: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.CS_tab = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "CS_tab", 0, 0, 154, 52);
            $container.addChild(this.CS_tab);
            this.CS_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "CS_name", 9, 13, 140, 20);
            $container.addChild(this.CS_name);
        }


        private drawTab(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.CS_tab.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3 = this.parentTarget.baseAtlas.getRec("Tabbg");
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata) {
                // this.drawTab();
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.CS_tab.skinName, "Tabbg");
                var vo:RedPointNode = this.itdata.data;
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.CS_name.skinName, vo.tab.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21)
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.CS_tab.addEventListener(InteractiveEvent.Up, this.equClick, this);

            } else {
                this.CS_tab.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                var vo:RedPointNode = this.itdata.data;
                ModuleEventManager.dispatchEvent(new ChgfishEvent(ChgfishEvent.HIDE_Chgfish_EVENT));
                ModulePageManager.openPanel(vo.tab.link[0],vo.tab.link.slice(1,vo.tab.link.length));
            }
        }

        private setnull(): void {
            LabelTextFont.clearLabel(this.uiAtlas, this.CS_tab.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.CS_name.skinName);
        }
    }
}