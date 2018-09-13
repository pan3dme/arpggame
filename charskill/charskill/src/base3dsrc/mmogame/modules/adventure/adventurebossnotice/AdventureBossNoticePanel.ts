module adventurebossnotice {

    export class AdventureBossNoticePanel extends WindowCentenMin {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false;
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
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/adventurebossnotice/adventurebossnotice.xml", "ui/uidata/adventure/adventurebossnotice/adventurebossnotice.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

      

            this.addChild(this._topRender.getComponent("a_tittle"));
            this.addChild(this._topRender.getComponent("a_reward_tittle"));

            
            this.a_boss_name_txt= this.addChild(this._topRender.getComponent("a_boss_name_txt"));

            this.addChild(this._midRender.getComponent("a_boss_name_bg"));
            this.addChild(this._midRender.getComponent("a_line0"));
            this.addChild(this._midRender.getComponent("a_reward_bg"));
            this.addChild(this._midRender.getComponent("a_line1"));


            this.a_submit = this.addEvntBut("a_submit", this._bottomRender);

            this.addBossChar()
          
            this.uiAtlasComplet = true
            this.applyLoadComplete();



        }
        private bossChar: MonsterUIChar;
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this._bottomRender.addModel(this.bossChar);
        }
        private a_submit: UICompenent;
        private a_boss_name_txt: UICompenent;
        protected butClik(evt: InteractiveEvent): void {
       
            switch (evt.target) {
                case this.a_submit:
                    UIManager.popClikNameFun("a_submit")
                    NetManager.getInstance().protocolos.challange_boss();
                    break
                default:
                    ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
                    break;
            }
            this.hide();
        }
        private refresh(): void {
            var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurBossTb();
            this.clearRewardUi();
            for (var i: number = 0; i < $tb.showitems.length; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_boss_reward_frame"));
                $ui.goToAndStop(i)
                $ui.x = i * 70 + 440 - (($tb.showitems.length-1)/5*170)
                this.rewardUiArr.push($ui);
                this.drawRewardIconCtx($ui, $tb.showitems[i]);
            }

          //  var $bossName: string = "青螺山1-BOSS";
            var $bossId: number = $tb.bossId
            if (!$bossId) {
                $bossId = 40001;
            }
            var $tb_creature_template: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($bossId)
            var $bossName: string = $tb.name.replace("BOSS", $tb_creature_template.name);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_boss_name_txt.skinName, $bossName, 16, TextAlign.CENTER, ColorType.color843b11)
            this.bossChar.setAvatar($tb_creature_template.avatar);
        }
        public resize(): void {
            super.resize();
            if (this.bossChar) {
        
                this.bossChar.scale = 1.5* UIData.Scale;
                this.bossChar.x = 0 * UIData.Scale;
                this.bossChar.y = 0 * UIData.Scale;
                this.bossChar.resize();
            }
       
        }

        private drawRewardIconCtx($ui: FrameCompenent, $id: number): void {
            $ui.data = $id
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl($id),
                ($img: any) => {
                    var $skillrec: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
                    UiDraw.cxtDrawImg($ctx, PuiData.NewPicBg, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    $ctx.drawImage($img, 0, 0, 60, 60, 6, 6, 56, 56);

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
            this.refresh()
        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


    }
}