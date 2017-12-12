module sboss {
    export class SbossRankPanelRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private R_NAME: UICompenent;
        private R_DAM: UICompenent;
        private R_BG: UICompenent;
        private R_RANK_ID: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.R_RANK_ID = this.creatSUI($baseRender, SbossRankPanelRender.baseAtlas, "R_RANK_ID", 35, 11, 35, 18);
            $container.addChild(this.R_RANK_ID);

            this.R_NAME = this.creatSUI($baseRender, SbossRankPanelRender.baseAtlas, "R_NAME", 160, 11, 100, 18);
            $container.addChild(this.R_NAME);

            this.R_DAM = this.creatSUI($baseRender, SbossRankPanelRender.baseAtlas, "R_DAM", 330, 11, 65, 18);
            $container.addChild(this.R_DAM);

            this.R_BG = this.creatSUI($bgRender, SbossRankPanelRender.baseAtlas, "R_BG", 0, 0, 430, 40);
            $container.addChild(this.R_BG);

        }
        private applyRender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: mass_boss_rank_info = this.itdata.data;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.R_NAME.skinName, ColorType.Brown6a4936 + getBaseName($vo.name), 14, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.R_DAM.skinName, ColorType.Brown6a4936 + String(Math.floor($vo.dam*10)/10) + "%", 14, TextAlign.CENTER);

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.R_RANK_ID.skinName, ColorType.Brown6a4936 + (this.itdata.id + 1), 14, TextAlign.CENTER);
            } 

            if (this.itdata) {
                if (this.itdata.id % 2 == 0) {
                    UiDraw.SharedDrawImg(this.uiAtlas, SbossRankPanelRender.baseAtlas, this.R_BG.skinName, "U_CELL_BG");
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.R_BG.skinName);
                }
        
            }
      
        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data ) {
                this.applyRender();
            } else {
                this.setnull();
            }
        }
        private setnull(): void {
            this.uiAtlas.clearCtxTextureBySkilname(this.R_BG.skinName);
        }
 
    }
    export class SbossRankPanelList extends SList {

        public constructor() {
            super();
            this.left = 325;
            this.top = 149;
        }
        public init($uiAtlas: UIAtlas): void {
            SbossRankPanelRender.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, SbossRankPanelRender, 430, 40 * 8, 256, 40, 8, 256, 1024, 1,10);
        }
        public setRandData($data: s2c_mass_boss_rank_result): void
        {
            var $tbDataArr: Array<SListItemData> = new Array();
            for (var i: number = 0; i < 10; i++) {
                var $vo: SListItemData = new SListItemData();
                if ($data.info[i]) {
                    $vo.data = $data.info[i];
                }
                $vo.id = i;
                $tbDataArr.push($vo);
                console.log($vo.id )
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
    export class SbossRandPanel extends WindowCentenMin {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            //添加好友面板渲染器

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);


        }
        public applyLoad(): void {
            this._midRender.uiAtlas = new UIAtlas();
            this._midRender.uiAtlas.setInfo("ui/uidata/boss/sboss/sboss.xml", "ui/uidata/boss/sboss/sboss.png", () => { this.loadConfigCom() }, "ui/uidata/boss/sboss/sbossuse.png");

        }
        private uiAtlasComplet: boolean = false;
        private r_list_pos: UICompenent;
        private loadConfigCom(): void {
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
    
            this.addChild(this._midRender.getComponent("r_name"));
            this.addChild(this._midRender.getComponent("r_smd"));
            this.addChild(this._midRender.getComponent("r_rank_id"));
            this.addChild(this._midRender.getComponent("r_tittle"));

            this.addChild(this._midRender.getComponent("r_line_a_1"));
            this.addChild(this._midRender.getComponent("r_line_b"));
            this.addChild(this._midRender.getComponent("r_line_a_0"));


            this.r_list_pos= this.addChild(this._midRender.getComponent("r_list_pos"));
            
            this.addLists();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }

        private sbossRankPanelList: SbossRankPanelList
        private addLists(): void {
            this.sbossRankPanelList = new SbossRankPanelList;
            this.sbossRankPanelList.init(this._midRender.uiAtlas);
        }
        public resize(): void {
            super.resize();
            if (this.sbossRankPanelList) {
                this.sbossRankPanelList.left = this.r_list_pos.parent.x / UIData.Scale + this.r_list_pos.x + 3;
                this.sbossRankPanelList.top = this.r_list_pos.parent.y / UIData.Scale + this.r_list_pos.y + 5;
            }

        }
        protected butClik(evt: InteractiveEvent): void {
            this.hide();
        }
        public hide(): void {
            this.sbossRankPanelList.hide()
            UIManager.getInstance().removeUIContainer(this);
        }
        public setRandData($data: s2c_mass_boss_rank_result): void
        {
            UIManager.getInstance().addUIContainer(this);
            this.sbossRankPanelList.show();
            this.sbossRankPanelList.setRandData($data)
        }
    }
}