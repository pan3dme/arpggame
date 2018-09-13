module kuafu {
    export class Kuafu1v1UI {
        public headUi: UICompenent
        public lifeUi: UICompenent
        public nameUi: UICompenent
        public forceUi: UICompenent
        public vipUi: UICompenent
        public levelUi: UICompenent

    }

    export class Kuafu1v1SceneTopPanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _timeRender:UIRenderComponent

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._timeRender.dispose();
            this._timeRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

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
            this._timeRender = new UIRenderComponent;
            this.addRender(this._timeRender)

            this._topRender.uiAtlas = new UIAtlas();

            this._frameFun = (t: number) => { this.upTime(t) };
        }
        private _frameFun:Function
        public applyLoad(): void {
  
            this._topRender.uiAtlas.setInfo("ui/uidata/kuafu/1v1/kuafu1v1.xml", "ui/uidata/kuafu/1v1/kuafu1v1.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {

            this._timeRender.uiAtlas = this._topRender.uiAtlas;
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;

            this.addChild(<UICompenent>this._bottomRender.getComponent("a_left_color"));
            this.addChild(<UICompenent>this._bottomRender.getComponent("a_right_color"));
            this.addChild(<UICompenent>this._bottomRender.getComponent("a_life_bg0"));
            this.addChild(<UICompenent>this._bottomRender.getComponent("a_life_bg1"));

            this.addChild(<UICompenent>this._bottomRender.getComponent("a_headbg0"));
            this.addChild(<UICompenent>this._bottomRender.getComponent("a_headbg1"));


            

            this.addChild(<UICompenent>this._topRender.getComponent("a_zl_label1"));
            this.addChild(<UICompenent>this._topRender.getComponent("a_zl_label0"));


            this.addLeft();
            this.addRight()

            this.addChild(<UICompenent>this._topRender.getComponent("a_time_bg"));
            this.a_time_txt = this.addChild(<UICompenent>this._timeRender.getComponent("a_time_txt"));

            this.applyLoadComplete();
        }
        public show(): void {
            var stim: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            if(stim > 0){
                PopTimeOutUtil.show(PopTimeOutUtil.PLAYGO, stim,()=>{
                    AotuSkillManager.getInstance().aotuBattle = true;
                });
            }else{
                AotuSkillManager.getInstance().aotuBattle = true;
            }
            this.endTime = TimeUtil.getTimer()+GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
            TimeUtil.addFrameTick(this._frameFun)
            UIManager.getInstance().addUIContainer(this);
            KuaFu1v1Model.getInstance().setFullHp()
        }

        public close(): void
        {
            UIManager.getInstance().removeUIContainer(this);
        }
        private endTime: number;
        private upTime(t): void
        {
            var timeNum: number = Math.ceil((this.endTime - TimeUtil.getTimer()) / 1000);
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun)
            } else {
                var $str: string="00:00"
                if (timeNum > 0) {
                    var m: number = Math.floor((timeNum / 60 % 60))
                    var s: number = Math.floor(timeNum % 60)
                    $str = String(m < 10 ? "0" : "") + String(m) + ":" + String(s < 10 ? "0" : "") + String(s);

                }
                if (this.lastTimeStr != $str) {
                    this.lastTimeStr = $str
                    //ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_time_txt.skinName, $str, ArtFont.num1, TextAlign.CENTER, 4)
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time_txt.skinName,$str,16,TextAlign.CENTER,ColorType.Yellowffe9b4);
                    this.refresh();

                }
            }
        }
        public refresh(): void
        {
            var $item: Array<Scene1v1Data> = KuaFu1v1Model.getInstance().get1V1sceneData();
            if ($item.length == 2) {
                if (GuidData.player.getName() == $item[0].name) {
                    this.drawLeft($item[0]);
                    this.drawRight($item[1]);
                } else {
                    this.drawLeft($item[1]);
                    this.drawRight($item[0]);
                }
            }

        }
        private drawLeft($data: Scene1v1Data): void {
            var $voui: Kuafu1v1UI = this.leftKuafu1v1UI;
            this.setUvScaleByUi($voui.lifeUi, $data.life);
            this.drawPublicTempVo($voui, $data);
        }
        private drawPublicTempVo($voui: Kuafu1v1UI, $data: Scene1v1Data): void
        {
     
            this.drawHead($voui.headUi, $data.charType, $data.level)


            //ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, $voui.levelUi.skinName, String($data.level), ArtFont.num1,TextAlign.CENTER,2);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, $voui.levelUi.skinName,"LV " + String($data.level),16,TextAlign.CENTER,ColorType.Yellowffe9b4);

            //ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, $voui.forceUi.skinName, String(Math.floor($data.force)), ArtFont.num99, TextAlign.CENTER)
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, $voui.forceUi.skinName,String(Math.floor($data.force)),16,TextAlign.CENTER,ColorType.Yellowffe9b4);

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, $voui.nameUi.skinName, ColorType.Yellowffe9b4 + getBaseName($data.name), 16)

            if ($data.vip > 0) {
                this.drawVipToCtx($voui.vipUi, $data.vip)
            } else {
                this._topRender.uiAtlas.clearCtxTextureBySkilname($voui.vipUi.skinName)
            }
        }
        private  drawVipToCtx($ui:UICompenent, $num: number): void {
        
            var $uiRect: UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
            UiDraw.cxtDrawImg($ctx, PuiData.A_V, new Rectangle(0, 0, 22, 19), UIData.publicUi);
            ArtFont.getInstance().writeFontToCtxLeft($ctx, String($num), ArtFont.BigYellow, 25, 3);
            this._topRender.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
         
        }

        private drawRight($data: Scene1v1Data): void {
            var $voui: Kuafu1v1UI = this.rightKuafu1v1UI;
            $voui.lifeUi.uvScale = $data.life;
            this.drawPublicTempVo($voui, $data);

        }
        private setUvScaleByUi($ui:UICompenent,$uvScale:number): void
        {
            $ui.renderX = $ui.absoluteX / Scene_data.stageWidth;
            $ui.renderY = $ui.absoluteY / Scene_data.stageHeight;

            $ui.renderWidth = $ui.absoluteWidth / Scene_data.stageWidth;
            $ui.renderHeight = $ui.absoluteHeight / Scene_data.stageHeight;

            $ui.renderData[0] = $ui.renderX + ($ui.renderWidth * (1-$uvScale));
            $ui.renderData[2] = $ui.renderWidth * $uvScale;

            $ui.renderData2[0] = $ui.tr.width * $uvScale;
            $ui.renderData2[2] = $ui.tr.x + ($ui.tr.width * (1-$uvScale));


            $ui.uiRender.makeRenderDataVc($ui.vcId)
        }

        public drawHead($ui: UICompenent, $num,$level:number): void {
            if (!$ui.data) {
                $ui.data = true
                IconManager.getInstance().getIcon(getTouPic($num),
                    ($img: any) => {
                        var $skillrec: UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
                        var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);

                        $ctx.drawImage($img, 0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight);

                        this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);

                    });
            }
                
        }

        private lastTimeStr: string;
        private a_time_txt: UICompenent;


        private leftKuafu1v1UI: Kuafu1v1UI
        private addLeft(): void {
            var $left: Kuafu1v1UI = new Kuafu1v1UI();
            $left.nameUi = this.addChild(<UICompenent>this._midRender.getComponent("a_left_name"));
            $left.forceUi = this.addChild(<UICompenent>this._midRender.getComponent("a_left_zl"));
            $left.headUi = this.addChild(<UICompenent>this._midRender.getComponent("a_left_head"));
            $left.lifeUi = this.addChild(<UICompenent>this._midRender.getComponent("a_left_life"));
            $left.vipUi = this.addChild(<UICompenent>this._midRender.getComponent("a_left_vip"));
            $left.levelUi = this.addChild(<UICompenent>this._midRender.getComponent("a_left_level"));
            
            this.leftKuafu1v1UI = $left
        }
        private rightKuafu1v1UI: Kuafu1v1UI
        private addRight(): void {
            var $right: Kuafu1v1UI = new Kuafu1v1UI();
            $right.nameUi = this.addChild(<UICompenent>this._midRender.getComponent("a_right_name"));
            $right.forceUi = this.addChild(<UICompenent>this._midRender.getComponent("a_right_zl"));
            $right.headUi = this.addChild(<UICompenent>this._midRender.getComponent("a_right_head"));
            $right.lifeUi = this.addChild(<UICompenent>this._midRender.getComponent("a_right_life"));
            $right.vipUi = this.addChild(<UICompenent>this._midRender.getComponent("a_right_vip"));
            $right.levelUi = this.addChild(<UICompenent>this._midRender.getComponent("a_right_level"));
            this.rightKuafu1v1UI = $right
        }


    }
}