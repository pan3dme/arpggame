module adventuresettlement {

    export class AdventureSettlementPanel extends WindowCentenMin {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false
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
            this.updataFun = (t: number) => { this.updata(t) }
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/adventuresettlement/adventuresettlement.xml", "ui/uidata/adventure/adventuresettlement/adventuresettlement.png", () => { this.loadConfigCom() });
        }
        private a_close_time:UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

      
            this.addChild(this._topRender.getComponent("a_label1"));
            this.addChild(this._topRender.getComponent("a_tittle"));


            this.addChild(this._topRender.getComponent("a_line0"));
            this.addChild(this._topRender.getComponent("a_line1"));
            this.addChild(this._bottomRender.getComponent("a_reward_bg"));
            

            this.a_close_time= this.addChild(this._topRender.getComponent("a_close_time"));


            this.a_get_but=   this.addEvntBut("a_get_but", this._bottomRender);

          
            this.uiAtlasComplet = true
            this.applyLoadComplete();



        }
        private a_get_but:UICompenent
        protected butClik(evt: InteractiveEvent): void {
            this.hide();
            switch (evt.target) {
                case this.a_get_but:
   


                    break;
                default:
                    break;
            }
      
    
     
        }
        private refresh(): void {
            var $rewardStr: string = GuidData.map.getVipInstanceFieldReward();
            console.log("奖励：",$rewardStr);
            if ($rewardStr.length<1) {
                $rewardStr = "2001:1,2002:1,2003:1,2004:1,2005:1,2006:1,2007:2,2008:1";
                return;
            }
            var $arr: Array<string> = $rewardStr.split(",");

            this.clearRewardUi();
            for (var i: number = 0; i < $arr.length; i++) {

                var rwid: Array<string> = $arr[i].split(":")
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_reward_icon"));
                $ui.goToAndStop(i)
                $ui.x += (i % 4) * 100;
                $ui.y += Math.floor(i / 4) * 100;
                this.rewardUiArr.push($ui);
                this.drawRewardIconCtx($ui, Number(rwid[0]), Number(rwid[1]));
            }
            /*
            for (var i: number = 0; i < 10; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_reward_icon"));
                $ui.goToAndStop(i)
                $ui.x += (i % 4) * 60;
                $ui.y += Math.floor(i / 4) * 60;
                this.rewardUiArr.push($ui);
                this.drawRewardIconCtx($ui, 3, 100);
            }
            */


        }

        private drawRewardIconCtx($ui: FrameCompenent, $id: number, $num: number): void {
            $ui.data = $id
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($id),
                ($img: any) => {
                    var $skillrec: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                    UiDraw.cxtDrawImg($ctx, PuiData.NewPicBg, new Rectangle(10, 0, 70, 70), UIData.publicUi);
                    $ctx.drawImage($img, 0, 0, 60, 60, 16, 6, 58, 58);
                  //  ArtFont.getInstance().writeFontToCtxRight($ctx, String($num), ArtFont.num1, 50, 35)
                     var $name:string=   tb.TB_item_template.get_TB_item_template($id).getColorName()
                     LabelTextFont.writeSingleLabelToCtx($ctx, $name, 15, 50-5, 76, TextAlign.CENTER);
                     $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
                });
        }

        private rewardUiArr: Array<FrameCompenent> = new Array;
        private clearRewardUi(): void {
            while (this.rewardUiArr.length) {
                this.removeChild(this.rewardUiArr.pop())
            }
        }
        public show(): void
        {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addFrameTick(this.updataFun)
            this.refresh()
            console.log("添加时间事件")
        }
        public endTime:number
        private updata(t: number): void
        {
      
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updataFun)
                console.log("移除事件")
            } else {
                if (this.endTime > TimeUtil.getTimer()) {
                    var $tn: number = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                    var $timeStr: string = ColorType.Whiteffffff + Math.min($tn,9);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_close_time.skinName, $timeStr, 16);
                }
            }
     
        }
        private updataFun:Function
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


    }
}