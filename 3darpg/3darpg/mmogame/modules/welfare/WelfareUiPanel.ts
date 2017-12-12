module welfare {

    export class WelfareUiPanel extends WindowUi {
        private _publicbgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;


        public welfareEveryCheckin: WelfareEveryCheckin;
        public welfareLevel: WelfareLevel;
        public welfareRecharge: WelfareRecharge;
        public welfareCost: WelfareCost;
        public welfareSevenDay: WelfareSevenDay;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            if (this.welfareEveryCheckin) {
                this.welfareEveryCheckin.dispose();
                this.welfareEveryCheckin = null;
            }
            if (this.welfareLevel) {
                this.welfareLevel.dispose();
                this.welfareLevel = null;
            }
            if (this.welfareRecharge) {
                this.welfareRecharge.dispose();
                this.welfareRecharge = null;
            }
            if (this.welfareCost) {
                this.welfareCost.dispose();
                this.welfareCost = null;
            }

            if (this.welfareSevenDay) {
                this.welfareSevenDay.dispose();
                this.welfareSevenDay = null;
            }
            if (this.welfareTabList) {
                this.welfareTabList.dispose();
                this.welfareTabList = null;
            }
            if (this.popVipPanel) {
                this.popVipPanel.dispose();
                this.popVipPanel = null;
            }
            if (this.popBuqianPanel) {
                this.popBuqianPanel.dispose();
                this.popBuqianPanel = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._baseRender.uiAtlas.setInfo("ui/uidata/welfare/newwelfare.xml", "ui/uidata/welfare/newwelfare.png", () => { this.loadConfigCom() }, "ui/uidata/welfare/welfarepc.png");
        }


        private slistIndex: UICompenent
        private loadConfigCom(): void {

            var renderLevel: UIRenderComponent = this._baseRender;

            this.slistIndex = this.addChild(renderLevel.getComponent("slistIndex"));
            this.addChild(renderLevel.getComponent("t_title"));
            var bg = this.addChild(this._publicbgRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "a_coffeeBg", renderLevel);

            this._publicbgRender.applyObjData();

            this.applyLoadComplete();
        }


        public selecttype($value: number): void {
            if ($value == SharedDef.MODULE_WELFARE_MONTH) {
                if (!this.welfareEveryCheckin) {
                    this.welfareEveryCheckin = new WelfareEveryCheckin();
                    this.welfareEveryCheckin.parent = this;
                    this.welfareEveryCheckin.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareEveryCheckin.show();
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
            } else if ($value == SharedDef.MODULE_WELFARE_LEVEL) {
                if (!this.welfareLevel) {
                    this.welfareLevel = new WelfareLevel();
                    this.welfareLevel.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareLevel.show();
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
            } else if ($value == SharedDef.MODULE_WELFARE_SEVEN) {
                if (!this.welfareSevenDay) {
                    this.welfareSevenDay = new WelfareSevenDay();
                    this.welfareSevenDay.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareSevenDay.show();
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
            } else if ($value == SharedDef.MODULE_WELFARE_RECHARGE) {
                if (!this.welfareRecharge) {
                    this.welfareRecharge = new WelfareRecharge();
                    this.welfareRecharge.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareRecharge.show();
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareCost) {
                    this.welfareCost.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
            } else if ($value == SharedDef.MODULE_WELFARE_CONSUME) {
                if (!this.welfareCost) {
                    this.welfareCost = new WelfareCost();
                    this.welfareCost.initUiAtlas(this._baseRender.uiAtlas);
                }
                this.welfareCost.show();
                if (this.welfareRecharge) {
                    this.welfareRecharge.hide();
                }
                if (this.welfareEveryCheckin) {
                    this.welfareEveryCheckin.hide();
                }
                if (this.welfareLevel) {
                    this.welfareLevel.hide();
                }
                if (this.welfareSevenDay) {
                    this.welfareSevenDay.hide();
                }
            }
        }

        public welfareTabList: WelfareTabList;
        public show($type: number): void {
            if (!$type) {
                $type = 0
            }
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            if (!this.welfareTabList) {
                this.welfareTabList = new WelfareTabList();
                this.welfareTabList.init(this._baseRender.uiAtlas);
            }
            this.welfareTabList.show($type);
            this.resize();
        }

        private popVipPanel: PopVipPanel;
        public showVipPop(): void {
            if (!this.popVipPanel) {
                this.popVipPanel = new PopVipPanel();
                this.popVipPanel.initUiAtlas(this._baseRender.uiAtlas, this._publicbgRender.uiAtlas);
            }
            this.popVipPanel.show();
            this.resize();
        }

        private popBuqianPanel: PopBuqianPanel;
        public showBuqianPop($data: SigninEveryDayItemData): void {
            if (!this.popBuqianPanel) {
                this.popBuqianPanel = new PopBuqianPanel();
                this.popBuqianPanel.initUiAtlas(this._baseRender.uiAtlas, this._publicbgRender.uiAtlas);
            }
            this.popBuqianPanel.show($data);
            this.resize();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.welfareTabList) {
                this.welfareTabList.hide();
            }
            if (this.welfareEveryCheckin) {
                this.welfareEveryCheckin.hide();
            }
            if (this.welfareLevel) {
                this.welfareLevel.hide();
            }
            if (this.welfareRecharge) {
                this.welfareRecharge.hide();
            }
            if (this.welfareSevenDay) {
                this.welfareSevenDay.hide();
            }
            if (this.welfareCost) {
                this.welfareCost.hide();
            }
            ModulePageManager.hideResTittle();
        }


        public resize(): void {
            super.resize();
            if (this.welfareTabList) {
                this.welfareTabList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x
                this.welfareTabList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new welfare.WelfareEvent(welfare.WelfareEvent.HIDE_Welfare_EVENT));
                    break
                default:
                    break;
            }
        }
    }


    /**
     * 左侧tablist
     */
    export class WelfareTabList extends SList {

        public constructor() {
            super();
            this.left = 52;
            this.top = 88;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, WelfareTabRender, 153, 420, 0, 50, 8, 256, 512, 1, 10);
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
            var nodeList = RedPointManager.getInstance().getNodeByID(113).children;
            for (var i: number = 0; i < 5; i++) {
                var item: SListItemData = new SListItemData;
                item.data = nodeList[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _type: number
        public show($type: number): void {
            this._type = $type
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        }

        public refreshAndselectIndex(): void {
            this.refreshDataByNewData();
            this.setSelectIndex(this._type);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class WelfareTabRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Tab: UICompenent;
        private RedPoint: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Tab = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tab", 0, 0, 153, 50);
            $container.addChild(this.Tab);

            this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 136, 0, 17, 16);
            this.RedPoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        }

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
            if (val) {
                var bb = new welfare.WelfareEvent(welfare.WelfareEvent.SELECTTAB_Welfare_EVENT);
                bb.data = this.itdata.id + 1;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawTab(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Tab.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_1");
            } else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("T" + this.itdata.id + "_0");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata) {
                if (this.itdata.data) {
                    this.itdata.data.bindUI(this.RedPoint);
                }
                this.drawTab();
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
                this.Tab.addEventListener(InteractiveEvent.Down, this.equClick, this);
            } else {
                this.Tab.removeEventListener(InteractiveEvent.Down, this.equClick, this);
                this.setnull();
            }
        }

        private equClick(): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            this.setSelect();
        }

        private setnull(): void {
            UiDraw.clearUI(this.Tab);
           this.RedPoint.preHide();
        }
    }
}