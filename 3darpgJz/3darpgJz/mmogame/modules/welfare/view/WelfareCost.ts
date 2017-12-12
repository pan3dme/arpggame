module welfare {

    export class WelfareCost extends UIVirtualContainer {
        private _bigPic: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._bigPic.dispose();
            this._bigPic = null;
            this._baseRender.dispose();
            this._baseRender = null;

            if (this.welfarCostList) {
                this.welfarCostList.dispose();
                this.welfarCostList = null;
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
            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._bigPic.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;
            this.initView();

        }

        public welfarCostList: WelfarCostList;
        private slistIndex2: UICompenent;
        private initView(): void {
            var renderLevel = this._baseRender;

            //大背景
            this.addChild(this._bigPic.getComponent("b_pic"));  
            this._bigPic.setImgUrl("ui/uidata/welfare/adbg.png");

            
            var t_info = this.addChild(<UICompenent>renderLevel.getComponent("t_info"));
            var tab = tb.TB_welfare_base.get_TB_welfare_baseById(1);
            
            LabelTextFont.writeTextAutoVerticalCenter(this._baseRender.uiAtlas, t_info.skinName, "活动说明："+tab.expense_info, 16, ColorType.Brown40120a, 545,"", true);
           
            // var tabvo: Array<tb.TB_welfare_level_show> = tb.TB_welfare_level_show.get_TB_welfare_level_show();
            // for (var i = 0; i < tabvo[0].item.length; i++) {
            //     var aa: UICompenent = this.addEvntButUp("l_reward" + i, renderLevel);
            //     aa.data = tabvo[0].item[i]
            //     this.drawReward(aa);
            // }

            // this.addChild(<UICompenent>renderLevel.getComponent("a_37"));


            // this.addChild(<UICompenent>renderLevel.getComponent("a_36"));

            // this._lev = this.addChild(<UICompenent>renderLevel.getComponent("lev"));
            this.slistIndex2 = this.addChild(<UICompenent>renderLevel.getComponent("slistIndex2"));
        }


        public resize(): void {
            super.resize();
            if (this.welfarCostList) {
                this.welfarCostList.left = this.slistIndex2.parent.x / UIData.Scale + this.slistIndex2.x
                this.welfarCostList.top = this.slistIndex2.parent.y / UIData.Scale + this.slistIndex2.y
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.welfarCostList) {
                this.welfarCostList.hide();
            }
        }

        public resetData(): void {
            if (!this.welfarCostList) {
                this.welfarCostList = new WelfarCostList();
                this.welfarCostList.init(this._baseRender.uiAtlas);
            }
            this.welfarCostList.show();
            this.resize();
        }
    }



    /**
     * 消费有奖list
     */
    export class WelfarCostList extends SList {

        public constructor() {
            super();
            this.left = 222;
            this.top = 192;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, WelfareGeneralListRender, 681, 319, 0, 83, 3, 512, 512, 1, 6);
        }

        /**
         * refreshData
         */
        private _everycheckinlist: Array<CostRewardItemData>;
        private compareAry($ary: Array<CostRewardItemData>): boolean {
            if ($ary.length != this._everycheckinlist.length) {
                return true;
            }
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i].state != this._everycheckinlist[i].state) {
                    return true;
                }
            }
            return false;
        }

        public refreshDataByNewData(): void {
            var $flag: boolean = true;
            var a: Array<CostRewardItemData> = GuidData.quest.getCostRewardList();
            if (this._everycheckinlist) {
                $flag = this.compareAry(a);
            }

            if ($flag) {
                console.log("数据变化了");
                this._everycheckinlist = a;
                var $sListItemData: Array<SListItemData> = this.getData(this._everycheckinlist);
                this.refreshData($sListItemData);
            }
        }


        public getData($data: Array<CostRewardItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        private _type: number
        private _start: number
        private _end: number
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        }

        public refreshAndselectIndex(): void {
            // var num: number = Math.floor(GuidData.quest.getcurDays() / 7);
            // console.log("num----", num);
            // this.scrollY(100);
            this.refreshDataByNewData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }
}