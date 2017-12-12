module boss {
    export class BossRankCellVo {
        public rankid: number
        public name: string
        public ratio: number

    }

    export class BossRankRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private RankCell_txt: UICompenent;
  

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.RankCell_txt = this.creatSUI($baseRender, BossRankRender.baseAtlas, "RankCell_txt", 0, 0, 210, 22);
            $container.addChild(this.RankCell_txt);


        }

        private applyrender(): void {
            var vo: BossRankCellVo = this.itdata.data;

         
            /*
            ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.Rankid.skinName, String(vo.rankid), ArtFont.num1, TextAlign.LEFT)
            //名字
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name.skinName, vo.name, 16, TextAlign.CENTER, "#000000");
            //输出
            ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.Output.skinName, vo.ratio + "%", ArtFont.num3, TextAlign.CENTER)
            */

            //ffe400
            //d3ecff
            //dd6d29
            //ffe9b4

            var $str:string="    " 
            $str += String(vo.rankid) + "     ";
            $str += getBaseName(vo.name) + "     ";
            $str += vo.ratio + "%";

            var colorStr: string = "ffe9b4"
            switch (vo.rankid) {
                case 1:
                    colorStr = "[ffe400]"
                    break;
                case 2:
                    colorStr = "[d3ecff]"
                    break;
                case 3:
                    colorStr = "[dd6d29]"
                    break;
                default:
                    colorStr = "[ffe9b4]"
                    break
            }

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.RankCell_txt.skinName, $str, 14, TextAlign.LEFT, colorStr);
        }



        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染

            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                aa.id = evt.target.data;
                ModuleEventManager.dispatchEvent(aa);
            }
        }

        private setnull(): void {

            this.uiAtlas.clearCtxTextureBySkilname(this.RankCell_txt.skinName)
        }
    }
    export class BossRankList extends SList {

        public constructor() {
            super();
            this.center = 220;
            this.top = 80;
        }
        public init($uiAtlas: UIAtlas): void {
            BossRankRender.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, BossRankRender, 210, 160, 210, 20, 8, 256, 256, 1, 10);
        }
        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            //var $sListItemData = this.getMassBossRankData();
            //this.refreshData($sListItemData);
        }
        private getFamilyBossRankData(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            var listary: Array<faction.RankVo>  = faction.FactionBossModel.getInstance().getRankList(GuidData.faction.getBosschallengeidCur());
            for (var i: number = 0; i < listary.length; i++) {
                var item: SListItemData = new SListItemData;

                var $BossRankCellVo: BossRankCellVo = new BossRankCellVo();
                $BossRankCellVo.rankid = listary[i].rankid;
                $BossRankCellVo.name = listary[i].name;
                $BossRankCellVo.ratio = listary[i].ratio;
                item.data = $BossRankCellVo;
                item.id = i;
                ary.push(item);
            }

            return ary;
        }
        private getMassBossRankData(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i <5; i++) {
                var item: SListItemData = new SListItemData;
                var $BossRankCellVo: BossRankCellVo = new BossRankCellVo()
                $BossRankCellVo.rankid = i + 1;
                $BossRankCellVo.name = "ccavet";
                $BossRankCellVo.ratio = 10;
                item.data = $BossRankCellVo;
                item.id = i;
                ary.push(item);
            }

            return ary;
        }


        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshAndselectIndex();
        }

        public refreshAndselectIndex(): void {
            this.refreshDataByNewData();
            this.setSelectIndex(0);
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

   
    export class BossRankPanel extends UIConatiner {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.top = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();

            this._frameFun = (t: number) => { this.upTime(t) };
        }
        private _frameFun: Function;
        public applyLoad(): void {
  
                this._topRender.uiAtlas.setInfo("ui/uidata/boss/oftenrank/oftenrank.xml", "ui/uidata/boss/oftenrank/oftenrank.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
     
        }
        private a_self_tip: UICompenent;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;

            this.addEvntBut("a_list_bg", this._bottomRender)

            this.addChild(this._topRender.getComponent("a_bottom_line"));
            this.addChild(this._topRender.getComponent("a_top_line"));

            this.a_self_tip = this.addChild(this._topRender.getComponent("a_self_tip"));
   
            this.bossRankList = new BossRankList()
            this.bossRankList.init(this._midRender.uiAtlas)
            this.applyLoadComplete();

        }

 
        public hide(): void {
            if (this.bossRankList) {
                this.bossRankList.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        }

        public bossRankList: BossRankList;
        public show(value: Boolean): void {
            UIManager.getInstance().addUIContainer(this);
            this.bossRankList.show();
            TimeUtil.addFrameTick(this._frameFun);
            if (!value) {
                TimeUtil.addTimeOut(5000, () => { this.hide()});
            }
        }

        private refreshOwn(): void {
            /*
            var listary: Array<faction.RankVo>  = faction.FactionBossModel.getInstance().getRankList(GuidData.faction.getBosschallengeidCur());
            var join: boolean = false;
            var $str:string=""
            for (var i = 0; i < listary.length; i++) {
                if (listary[i].isme) {
                    $str +=String(listary[i].rankid)+"     ";
                    $str += getBaseName(listary[i].name) + "     ";
                    $str += listary[i].ratio + "%";
           
                    join = true;
                    break;
                }
            }
            if (!join) {
                $str = "暂时没有上榜单";
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_self_tip.skinName, $str, 14, TextAlign.CENTER, ColorType.Greenadff00);
            */
            var $str: string = "";
            if (this.mineNum == -1) {
                $str="暂时没有上榜单"
            } else {
                $str =( this.mineNum+1) + "  " + getBaseName(GuidData.player.getName());
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_self_tip.skinName, $str, 14, TextAlign.CENTER, ColorType.Greenadff00);
           
        }
       
        private mineNum:number=-1
        public setRankData($s2c_boss_rank: s2c_boss_rank): void {

            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $s2c_boss_rank.rankList.length; i++) {
                var $vo: SListItemData = new SListItemData;
                var $BossRankCellVo: BossRankCellVo = new BossRankCellVo()
                $BossRankCellVo.rankid = i + 1;
                $BossRankCellVo.name = $s2c_boss_rank.rankList[i].name;
                $BossRankCellVo.ratio = Math.floor($s2c_boss_rank.rankList[i].value*10)/10;
                $vo.data = $BossRankCellVo;
                $vo.id = i;
                ary.push($vo);
            }
            this.mineNum=  $s2c_boss_rank.mine
            this.bossRankList.refreshData(ary);
            console.log("更新数据")
            this.refreshOwn();
        }

        private _curtime: number
        private upTime(t): void {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
            } else {
                var $time: number = Math.floor( TimeUtil.getTimer() / 1000);
                if (this._curtime != $time) {
                    this._curtime = $time;
                    console.log("更新", this._curtime)
                    this._curtime = $time;
                    if (this.bossRankList && this.bossRankList.hasStage) {
                      //  this.bossRankList.refreshDataByNewData();
                        this.refreshOwn();
                    }
                  
                }
            }

        }



    }


  
}