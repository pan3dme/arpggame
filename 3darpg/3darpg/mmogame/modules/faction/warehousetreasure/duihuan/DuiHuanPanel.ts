module duihuan {

    export class DuiHuanPanel extends WindowCentenMin {



        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false

        public constructor() {
            super();
            this.setBlackBg();
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

      
                
                this._midRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/duihuan/duihuan.xml", "ui/uidata/faction/warehousetreasure/duihuan/duihuan.png", () => { this.loadConfigCom() });
      
        }
  
       
        private a_tittle_frame: FrameCompenent;
        private a_bar_red: UICompenent;
        private a_move_bar_txt:UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            

            this.a_tittle_frame = <FrameCompenent>this.addChild(this._midRender.getComponent("a_tittle_frame"));
            this.a_tittle_frame.goToAndStop(0)

            this.addChild(this._midRender.getComponent("a_label2"));
            this.addChild(this._midRender.getComponent("a_label1"));
            this.addChild(this._midRender.getComponent("a_label0"));

            this.addChild(this._bottomRender.getComponent("a_txt_bg"));

            this.a_bar_red= this.addChild(this._midRender.getComponent("a_bar_red"));
            this.addChild(this._bottomRender.getComponent("a_bar_bg"));
        
            this.a_move_bar_txt = this.addChild(this._topRender.getComponent("a_move_bar_txt"));
            



            this.addChild(this._midRender.getComponent("a_res_num_bg1"));
            this.addChild(this._midRender.getComponent("a_res_num_bg0"));
            this.addChild(this._midRender.getComponent("a_right_num_bg"));
            this.addChild(this._midRender.getComponent("a_left_num_bg"));



            this.a_have_txt= this.addChild(this._midRender.getComponent("a_have_txt"));
            this.a_use_txt = this.addChild(this._midRender.getComponent("a_use_txt"));
            this.a_remaining = this.addChild(this._midRender.getComponent("a_remaining"));

            this.a_cancal =this.addEvntButUp("a_cancal", this._topRender)
            this.a_submit = this.addEvntButUp("a_submit", this._topRender)

            this.a_bar = this.addEvntBut("a_bar", this._topRender);
            this.a_move_bar_tip = this.addChild(this._midRender.getComponent("a_move_bar_tip"));
            this.a_bar_bg_line = this._midRender.getComponent("a_bar_bg_line");
            
            
            this.a_left_txt = this.addChild(this._midRender.getComponent("a_left_txt"));
            this.a_right_txt = this.addChild(this._midRender.getComponent("a_right_txt"));


            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }
        private a_move_bar_tip: UICompenent;
        private a_bar: UICompenent;
        private a_have_txt: UICompenent;
        private a_use_txt: UICompenent;
        private a_remaining: UICompenent;
        private a_left_txt: UICompenent;
        private a_right_txt: UICompenent;
        private a_bar_bg_line:UICompenent
        private selectEvet: DuiHuanEvent;
        private drawHasResIcon(): void
        {
            UiDraw.drawRewardIconAndtxt(this.a_have_txt, [this.selectEvet.UseResType, GuidData.player.getResType(this.selectEvet.UseResType)],false, TextAlign.LEFT,10)
            // this.drawCostUI(this._topRender.uiAtlas, this.a_have_txt.skinName, [this.selectEvet.UseResType, String(this.getHasResNum())], ColorType.Orange853d07);
        }

        // public drawCostUI($uiAtlas: UIAtlas, $skinName: string, $costary: Array<any>, $fontcolor: string = "#000000", $bgwidth: number = 0, $bgheight: number = 0): void {
        //     if ($fontcolor.indexOf("[") != -1) {  //[00ff00]
        //         $fontcolor = "#" + $fontcolor.substr(1, 6);
        //     }
        //     var $rec: UIRectangle = $uiAtlas.getRec($skinName);
        //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
        //     if ($bgwidth == 0) {
        //         $bgwidth = $rec.pixelWitdh;
        //         $bgheight = $rec.pixelHeight;
        //     }
        //     var posx: number
        //     var posy: number
        //     if (Number($costary[0]) > -1) {
        //         UiDraw.cxtDrawImg(ctx, UIuitl.getInstance().costtype(Number($costary[0])), new Rectangle(0, 0, 35, 35), UIData.publicUi);
        //         posx = ($bgwidth - 35) / 2 + 35;
        //         if ($bgheight >= 35) {
        //             posy = 2
        //         } else {
        //             posy = 35 - $bgheight
        //         }
        //     } else {
        //         posx = $bgwidth / 2 + ($rec.pixelWitdh - $bgwidth)
        //         posy = $rec.pixelHeight - $bgheight
        //     }

        //     LabelTextFont.writeSingleLabelToCtx(ctx, $costary[1], 16, posx, posy, TextAlign.CENTER, $fontcolor);

        //     $uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        // }
        public refresh(value: DuiHuanEvent): void {
            
            this.selectEvet = value
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_remaining.skinName, ColorType.Orange853d07 + String(this.selectEvet.MaxSelectNum), 16,TextAlign.LEFT);


            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_right_txt.skinName, ColorType.Orange853d07 +  String(this.selectEvet.MaxSelectNum), 16);

            this.drawHasResIcon();
           
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_left_txt.skinName, ColorType.Orange853d07 +  "1", 16);
            this.selectNum = 1;
            this.refreshDrawUseIcon();
      
            this.a_tittle_frame.goToAndStop(this.selectEvet.tittleid)
        }
        private refreshDrawUseIcon(): void
        {
            UiDraw.drawRewardIconAndtxt(this.a_use_txt, [this.selectEvet.UseResType, this.selectEvet.UnitPrice * this.selectNum],false, TextAlign.LEFT,10)
            // this.drawCostUI(this._topRender.uiAtlas, this.a_use_txt.skinName, [String(this.selectEvet.UseResType), String(this.selectEvet.UnitPrice * this.selectNum)], ColorType.Orange853d07);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_move_bar_txt.skinName, ColorType.Orange853d07 + String(this.selectNum), 16);
            var $scale: number =1;
            if (this.selectEvet.MaxSelectNum>1) {
                $scale = (this.selectNum - 1) / (this.selectEvet.MaxSelectNum - 1);
            } else{
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_left_txt.skinName, "0", 16);
            }
            this.a_bar.x = this.a_bar_bg_line.x + this.a_bar_bg_line.width * $scale;
            this.a_move_bar_tip.x = this.a_bar.x;
            this.a_move_bar_txt.x = this.a_bar.x+4;
            this.a_bar_red.uvScale = $scale;

        }
        private a_cancal: UICompenent
        private a_submit: UICompenent

        protected butClik(evt: InteractiveEvent): void {
            console.log("---evt.target--",evt.target);
            switch (evt.target) {
                case this.a_bar:
                    if (this.selectEvet.MaxSelectNum > 1) {
                        this.barMouseDown(evt)
                    }
                    break;
                case this.a_submit:
                    if (this.selectNum * this.selectEvet.UnitPrice <= GuidData.player.getResType(this.selectEvet.UseResType)) {
                        this.selectEvet.SubmitFun(this.selectNum)
                        this.hide();
                    } else {
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = this.selectEvet.UseResType
                        ModuleEventManager.dispatchEvent($aaa);
                        // msgtip.MsgTipManager.outStr("[ff0000]所需要资源不足", 99);
                    }
                    
                    break;
                case this.c_close:
                case this.a_cancal:
                    this.hide();
                    break;
                default:
                    // this.hide();
                    break
            }
          
        }
        private selectNum:number=0
        private _lastMouseX: number = 0;
        private _lastMcX: number = 0
        private _percentage: number = 0;
        private barMouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastMcX = this.a_bar.x;

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.barMouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.barMouseUp, this);

        }
        private barMouseMove(evt: InteractiveEvent): void {

            var $curPiexy: number = this._lastMcX + (evt.x - this._lastMouseX) / UIData.Scale;
            $curPiexy = Math.max(this.a_bar_bg_line.x, $curPiexy);
            $curPiexy = Math.min(this.a_bar_bg_line.x + this.a_bar_bg_line.width, $curPiexy);

            this.selectNum = (($curPiexy - this.a_bar_bg_line.x) / this.a_bar_bg_line.width) * (this.selectEvet.MaxSelectNum-1 );
            this.selectNum = Math.floor(this.selectNum)+1;
            this.refreshDrawUseIcon();

        }
        private barMouseUp(evt: InteractiveEvent): void {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.barMouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.barMouseUp, this);
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }
}