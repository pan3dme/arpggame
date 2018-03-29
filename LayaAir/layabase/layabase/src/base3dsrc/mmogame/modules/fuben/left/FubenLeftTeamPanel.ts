module fb {
    export class FubenLeftTeamPanel extends UIConatiner {
        private uiAtlasComplet: boolean = false;
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.left = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;
            this._midRender.uiAtlas.setInfo("ui/uidata/fuben/left/fubenleft.xml", "ui/uidata/fuben/left/fubenleft.png", () => { this.loadConfigCom() });

            //this.upDataFun = (t: number) => { this.update(t) }
        }

        //private upDataFun: Function


        private a_tittle_name: UICompenent;
        //private a_reward_name: UICompenent;
        //private a_reward_more: UICompenent;
        //private a_reward_icon_0: UICompenent;
        //private a_reward_icon_1: UICompenent;
        //private a_reward_icon_2: UICompenent;

        private a_top_bg: UICompenent
        private a_mid_bg: UICompenent
        private a_bottom_bg: UICompenent;
        
        private _labNum:FrameCompenent;
        private _labExp:FrameCompenent;
        private _labDamBuff:FrameCompenent;
        private _labExpBuff:FrameCompenent;
        private _labTeamBuff:FrameCompenent;

        public expBuffID:number

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.a_top_bg = this.addChild(this._bottomRender.getComponent("a_top_bg"));
            this.a_mid_bg = this.addChild(this._bottomRender.getComponent("a_mid_bg"));
            this.a_bottom_bg = this.addChild(this._bottomRender.getComponent("a_bottom_bg"));

            this.a_tittle_name = this.addChild(this._topRender.getComponent("a_tittle_name"));
           
            this.a_mid_bg.addEventListener(InteractiveEvent.Down, this.midClick, this);

            this._labNum = this.getEmptyFrameUi();
            this._labExp = this.getEmptyFrameUi();
            this._labDamBuff = this.getEmptyFrameUi();
            this._labExpBuff = this.getEmptyFrameUi();
            this._labTeamBuff = this.getEmptyFrameUi();

            var $th: number = this.useFrameItem.length * 22;
            $th += 5;

            this.a_bottom_bg.y = this.getBasyTy() + $th;
            this.a_mid_bg.height = this.a_bottom_bg.y - this.a_top_bg.y - this.a_top_bg.height;

            this.uiAtlasComplet = true;

            var obj:any = TableData.getInstance().getData(TableData.tb_buff_base,1);
            this.expBuffID = obj.exp;
            this.refresh();

        }

        private midClick($e: InteractiveEvent): void { }
        private hideOrShow: boolean = true;
        private rewardData: any;
        public refresh(): void {
            if (this.uiAtlasComplet) {
                this.drawReward();
            }
        }
        //private refresnum: number = 0;
        //private hasMoreReward: boolean = false;
        private drawReward(): void {
            //this.hasMoreReward = rewardObj.morereward;
            //var $reward: Array<Array<number>> = rewardObj.reward;

            // for (var i: number = 0; i < 3; i++) {
            //     var $ui: UICompenent = this["a_reward_icon_" + i];
            //     $ui.y = 255;
            //     if ($reward[i]) {
            //         IconManager.getInstance().drawItemIcon40($ui, $reward[i][0], $reward[i][1]);
            //         $ui.x = 12 + i * 60;
            //     } else {
            //         $ui.x = -200;
            //     }
            // }

            //LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_reward_name.skinName, ColorType.Yellowffe9b4 + rewardObj.name, 14 * 1.5, TextAlign.LEFT);

            this.refreshQuestList();

            //var floorID: number = GuidData.map.getFloorNum();
            var nameStr: string = tb.TB_map.getTB_map(GuidData.map.getMapID()).name;
            // if (rewardObj.lev) {
            //     nameStr += "[第" + rewardObj.lev + "关]";
            // }

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_tittle_name.skinName, ColorType.Yellowffd500 + nameStr, 14 * 1.5, TextAlign.LEFT);
        }
        public refreshQuestList(): void {
            if (this.uiAtlasComplet) {
                var info:any = GuidData.map.getExpFubenInfo();
                this.drawFrontToFrame(this._labNum,ColorType.Yellowffe9b4 + "累计杀怪：" + info.num);
                this.drawFrontToFrame(this._labExp,ColorType.Yellowffe9b4 + "经验获得：" + info.exp);
                this.drawFrontToFrame(this._labDamBuff,ColorType.Yellowffe9b4 + "伤害鼓舞加成：" + info.eff + "%");
                //GameInstance.mainChar.unit.buffUnit.getBuffByID()
                var buffInfo:any = GameInstance.mainChar.unit.buffUnit.getBuffByID(this.expBuffID);
                var expVal:number = 0;
                if(buffInfo && buffInfo.effectid){
                    var obj:any = TableData.getInstance().getData(TableData.tb_buff_effect,buffInfo.effectid);
                    expVal = obj.value;
                }
                this.drawFrontToFrame(this._labExpBuff,ColorType.Yellowffe9b4 + "药水经验加成：" + expVal + "%");

            }
        }
        private getBasyTy(): number {
            return this.a_top_bg.y + 25
        }
        //private timeUiFrame: FrameCompenent
        private drawFrontToFrame($ui: FrameCompenent, $str: string): void {
            var $toRect: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 14 * 1.5, 0, 0, TextAlign.LEFT);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        }
        private useFrameItem: Array<FrameCompenent> = new Array()
        private getEmptyFrameUi(): FrameCompenent {
            var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_task_frame"));
            $ui.goToAndStop(this.useFrameItem.length);

            $ui.y = this.getBasyTy() + this.useFrameItem.length * 22;
            this.useFrameItem.push($ui)
            return $ui;
        }
        // private clearFrameItem(): void {
        //     while (this.useFrameItem.length) {
        //         this.removeChild(this.useFrameItem.pop());
        //     }

        // }
        
        private hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}