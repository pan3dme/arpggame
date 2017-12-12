module sboss {
    export class WbossRewardPanel extends WindowCentenMin {

        private _baseRender: UIRenderComponent;

        public _baseUiAtlas: UIAtlas;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this.setBlackBg();

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

        }
        public applyLoad(): void {
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/boss/sboss/wbossreward.xml", "ui/uidata/boss/sboss/wbossreward.png", () => { this.loadConfigCom() });
        }
        private uiAtlasComplet: boolean = false;

        //private labAry: Array<UICompenent>;
        //private myInfo: UICompenent;
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._baseUiAtlas;

            this.addUIList(["t_line1", "t_line2", "t_win_title"], this._baseRender);
            var ui: UICompenent;
            ui = this.addChild(this._baseRender.getComponent("t_title1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "排行", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_title2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_reward_title"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "奖励说明", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("t_info"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "●对boss造成伤害的玩家都可以获得奖励。\n排名越高的玩家获得的奖励越多", 16, TextAlign.LEFT, ColorType.Green2ca937);

            this.addLists();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }

        private rewardSList: WbossRewardSList;
        private addLists(): void {
            this.rewardSList = new WbossRewardSList;
            this.rewardSList.init(this._baseUiAtlas);
        }
        public resize(): void {
            super.resize();

        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.c_close) {
                this.hide();
            }
        }
        public hide(): void {
            this.rewardSList.hide()
            UIManager.getInstance().removeUIContainer(this);
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.rewardSList.show();
        }
    }

    export class WbossRewardSList extends SList {

        public constructor() {
            super();
        }
        public init($uiAtlas: UIAtlas): void {
            WbossRewardSListRender.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            var w: number = 400;
            var h: number = 330;
            this.setData($ary, WbossRewardSListRender, w, h, 355, 56, 5, 256, 512, 1, 6);
            this.center = 20;
            this.middle = 30;
            this.setRankData();
        }
        public setRankData(): void {
            var $tbDataArr: Array<SListItemData> = new Array();
            var size: number = TableData.getInstance().getTabSize(TableData.tb_worldboss_rank_reward)
            for (var i: number = 0; i < size; i++) {
                var $vo: SListItemData = new SListItemData();

                var tabObj: any = TableData.getInstance().getData(TableData.tb_worldboss_rank_reward, i + 1);
                var obj: any = new Object;
                if(tabObj.range[0] == tabObj.range[1]){
                    obj.rank = String(tabObj.range[0]);
                }else if(tabObj.range[1] > 0){
                    obj.rank = tabObj.range[0] + "-" +  tabObj.range[1];
                }else{
                    obj.rank = tabObj.range[0] + "以上";
                }

                obj.reward = tabObj.showRewards;

                $vo.id = i;
                $vo.data = obj;
                $tbDataArr.push($vo);
            }

            this.refreshData($tbDataArr);
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.setShowLevel(2);
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }

        }

    }

    export class WbossRewardSListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private r_bg: UICompenent;
        private r_rank: UICompenent;
        private iconAry: Array<UICompenent>;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.r_rank = this.creatSUI($baseRender, WbossRewardSListRender.baseAtlas, "s_lab", 5, 16, 100, 20);
            $container.addChild(this.r_rank);

            this.r_bg = this.creatGrid9SUI($bgRender, WbossRewardSListRender.baseAtlas, "s_bg", 0, 0, 356, 56, 5, 5);
            $container.addChild(this.r_bg);

            this.iconAry = new Array;
            for (var i: number = 0; i < 4; i++) {
                var icon: UICompenent = this.creatSUI($baseRender, WbossRewardSListRender.baseAtlas, "s_r" + i, 120 + i * 55, 6, 48, 48);
                $container.addChild(icon);
                this.iconAry.push(icon);
            }


        }
        private applyRender(): void {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }

            var $vo: any = this.itdata.data;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_rank.skinName, ColorType.Brown7a2f21 + $vo.rank, 14, TextAlign.CENTER);

            for (var i: number = 0; i < this.iconAry.length; i++) {
                if($vo.reward[i]){
                    IconManager.getInstance().drawItemIcon40(this.iconAry[i], $vo.reward[i][0], $vo.reward[i][1]);
                }                
            }

        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if (this.itdata && this.itdata.data) {
                this.applyRender();
            }
        }


    }



}