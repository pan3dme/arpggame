
module kuafu {

    export class Kuafu3V3FinishPanel extends UIPanel {

        private _topLeveltxtRender: UIRenderComponent
        private _topLevelBgRender: UIRenderComponent
        private _topHeadRender: UIRenderComponent
        private _topRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _bottomRender: UIRenderComponent
 
        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._topHeadRender.dispose();
            this._topHeadRender = null;
        }

        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0
            this.middle = 0

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            

            this._topHeadRender = new UIRenderComponent;
            this.addRender(this._topHeadRender)

            this._topLevelBgRender = new UIRenderComponent;
            this.addRender(this._topLevelBgRender)

            this._topLeveltxtRender = new UIRenderComponent;
            this.addRender(this._topLeveltxtRender)

            

            this._topRender.uiAtlas = new UIAtlas();

            this._topRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/kuafu3v3end.xml", "ui/uidata/kuafu/3v3/kuafu3v3end.png", () => { this.loadConfigCom() }, "ui/uidata/kuafu/pc.png");

        }


        private a_kuafu_tittle: Array<UICompenent>;
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this._topHeadRender.uiAtlas = this._topRender.uiAtlas;
            this._topLevelBgRender.uiAtlas = this._topRender.uiAtlas;
            this._topLeveltxtRender.uiAtlas = this._topRender.uiAtlas;
            
            
            this.addChild(this._topRender.getComponent("a_kuafu_tip_bg"));


            this.a_kuafu_tittle = new Array()

            this.a_kuafu_tittle.push(this._midRender.getComponent("a_kuafu_tittle_0"));
            this.a_kuafu_tittle.push(this._midRender.getComponent("a_kuafu_tittle_1"));
            this.a_kuafu_tittle.push(this._midRender.getComponent("a_kuafu_tittle_2"));



            this.addChild(this._midRender.getComponent("a_kuafu_jifen_txt"));
            this.addChild(this._midRender.getComponent("a_kuafu_jisha_txt"));
  
            this.addChild(this._midRender.getComponent("a_kuafu_jifen_txt1"));
            this.addChild(this._midRender.getComponent("a_kuafu_jisha_txt1"));


            this.addChild(this._bottomRender.getComponent("a_win_bg_line"));

            this.addEvntBut("a_win_bg_color", this._bottomRender);
            var a_win_bg_color_right: UICompenent = this.addEvntBut("a_win_bg_color_right", this._bottomRender);
            a_win_bg_color_right.isU = true
            var a_win_bg_line_right: UICompenent = this.addChild(this._bottomRender.getComponent("a_win_bg_line_right"));
            a_win_bg_line_right.isU = true



            this.a_kuafu_dangqian_jifen_txt = this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_dangqian_jifen_txt"));
            this.addChild(this._bottomRender.getComponent("a_kuafu_tip_bg1"));
            this.a_kuafu_timeout = this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_timeout"));
         


            this.a_kuafu_head_bg = new Array();
            this.a_kuafu_head_icon = new Array();
            this.a_kuafu_head_name = new Array();
            this.a_kuafu_head_level = new Array();
            this.a_kuafu_jifen_frame = new Array();
            this.a_kuafu_jisha_frame = new Array();
            this.a_kuafu_cell_bg = new Array()
            this.a_kuafu_level_bg = new Array()

            this.a_kuafu_cell_bgslef=  this.addChild(this._midRender.getComponent("a_kuafu_cell_bgslef"));
            
            for (var i: number = 0; i < 6; i++) {
                var $temp = this.addChild(this._midRender.getComponent("a_kuafu_cell_bg"+i));
                if (i % 2 == 1) {
                    $temp.isU = true
                }
                this.a_kuafu_cell_bg.push($temp);
                this.a_kuafu_level_bg.push(this.addChild(this._topLevelBgRender.getComponent("a_kuafu_level_bg" + i)));
                this.a_kuafu_head_bg.push(this.addChild(this._topRender.getComponent("a_kuafu_head_bg"+i)));
                this.a_kuafu_head_icon.push(this.addChild(this._topHeadRender.getComponent("a_kuafu_head_icon" + i)));
                this.a_kuafu_head_name.push(this.addChild(this._topHeadRender.getComponent("a_kuafu_head_name" + i)));
                this.a_kuafu_head_level.push(this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_head_level" + i)));
                this.a_kuafu_jifen_frame.push(this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_jifen_frame" + i)));
                this.a_kuafu_jisha_frame.push(this.addChild(this._topLeveltxtRender.getComponent("a_kuafu_jisha_frame" + i)));
   
            }
            

            this.a_bifen_right=  this.addChild(this._topLeveltxtRender.getComponent("a_bifen_right"));
            this.a_bifen_left=this.addChild(this._topLeveltxtRender.getComponent("a_bifen_left"));

            this._bottomRender.applyObjData()
            this._midRender.applyObjData()
            this._topRender.applyObjData()

            this._tickFun = (t: number) => { this.tickRefreshState(t) };
            this.refrish();

        }
        private a_bifen_left: UICompenent
        private a_bifen_right: UICompenent
        private a_kuafu_cell_bgslef: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            this.close();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            NetManager.getInstance().protocolos.instance_exit(0);
            //console.log("推出副本")
        }
        private _endtime: number;
        private _curtime: number;
        public tickRefreshState(t: number): void {
            var $time: number = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                //console.log("刷新", $time);

                LabelTextFont.writeTextAutoCenter(this._bottomRender.uiAtlas, this.a_kuafu_timeout.skinName, ColorType.Redd92200 + $time + ColorType.Whitefff7db +"秒后自动返回匹配界面", 16, ColorType.Yellowedce7e, 200, true);
                if ($time < 0) {
                    this.close();
                    NetManager.getInstance().protocolos.goback_to_game_server();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
        private _tickFun: Function;
        private a_kuafu_cell_bg: Array<UICompenent>
        private a_kuafu_level_bg: Array<UICompenent>
        private a_kuafu_head_bg: Array<UICompenent>
        private a_kuafu_head_icon: Array<UICompenent>
        private a_kuafu_head_name: Array<UICompenent>
        private a_kuafu_head_level: Array<UICompenent>
        private a_kuafu_jifen_frame: Array<UICompenent>
        private a_kuafu_jisha_frame: Array<UICompenent>

        private a_kuafu_timeout: UICompenent
        private a_kuafu_dangqian_jifen_txt: UICompenent
 

        public refrish(): void {
            this.setUiListVisibleByItem(this.a_kuafu_head_bg, false);
            this.setUiListVisibleByItem(this.a_kuafu_head_icon, false);
            this.setUiListVisibleByItem(this.a_kuafu_head_name, false);
            this.setUiListVisibleByItem(this.a_kuafu_head_level, false);
            this.setUiListVisibleByItem(this.a_kuafu_jifen_frame, false);
            this.setUiListVisibleByItem(this.a_kuafu_jisha_frame, false);
            this.setUiListVisibleByItem(this.a_kuafu_cell_bg, false);
            this.setUiListVisibleByItem(this.a_kuafu_level_bg, false);



            var $itemArr: Array<Kuafu3V3dataVo> = KuaFu3v3Model.getInstance().kuafuItem;
            if (!$itemArr) {
                $itemArr = new Array();
            }
            var $leftnum: number = 0;
            var $rightnum: number = 0;
            //当前绘制索引变量
            var anum: number = 0
            var bnum: number = 0
   

            for (var k: number = 0; k < $itemArr.length; k++) {
                var $selecVo: Kuafu3V3dataVo = $itemArr[k];
                var $cellIdx: number = k;
                if ($selecVo.group == 1) {
                    $cellIdx = anum * 2 + 0
                    anum++
                } else {
                    $cellIdx = bnum * 2 + 1
                    bnum++
                }
    

                if ($selecVo == KuaFu3v3Model.getInstance().selfVo) {
                    this.a_kuafu_cell_bgslef.x = this.a_kuafu_cell_bg[$cellIdx].x;
                    this.a_kuafu_cell_bgslef.y = this.a_kuafu_cell_bg[$cellIdx].y;
                    this.a_kuafu_cell_bgslef.isU = this.a_kuafu_cell_bg[$cellIdx].isU;
                } else {
                    this.setUiListVisibleByItem([this.a_kuafu_cell_bg[$cellIdx]], true);
                }

                this.setUiListVisibleByItem([this.a_kuafu_level_bg[$cellIdx]], true);
                this.setUiListVisibleByItem([this.a_kuafu_head_bg[$cellIdx]], true);

                var $a_kuafu_head_name: FrameCompenent = <FrameCompenent> this.a_kuafu_head_name[$cellIdx];
                $a_kuafu_head_name.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_head_name, ColorType.Yellowffecc6 + getBaseName($selecVo.name))
                this.setUiListVisibleByItem([$a_kuafu_head_name], true);

                var $a_kuafu_head_icon: FrameCompenent = <FrameCompenent> this.a_kuafu_head_icon[$cellIdx];
                $a_kuafu_head_icon.goToAndStop($cellIdx);

               
                this.drawHeadIconToCtx($a_kuafu_head_icon, $selecVo.gender)
                this.setUiListVisibleByItem([$a_kuafu_head_icon], true);

                var $a_kuafu_head_level: FrameCompenent = <FrameCompenent> this.a_kuafu_head_level[$cellIdx];
                $a_kuafu_head_level.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_head_level, ColorType.Whitefff7db + String($selecVo.level))
                this.setUiListVisibleByItem([$a_kuafu_head_level], true);

                var $a_kuafu_jifen_frame: FrameCompenent = <FrameCompenent>  this.a_kuafu_jifen_frame[$cellIdx];
                $a_kuafu_jifen_frame.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_jifen_frame, ColorType.Whitefff7db + String($selecVo.jifen))
                this.setUiListVisibleByItem([$a_kuafu_jifen_frame], true);

                var $a_kuafu_jisha_frame: FrameCompenent = <FrameCompenent> this.a_kuafu_jisha_frame[$cellIdx];
                $a_kuafu_jisha_frame.goToAndStop($cellIdx);
                this.drawFrontToFrame($a_kuafu_jisha_frame, ColorType.Whitefff7db + String($selecVo.killnum))
                this.setUiListVisibleByItem([$a_kuafu_jisha_frame], true);

                if ($selecVo.dieState == 1) { //没死
                    if ($selecVo.group == 1) {
                        $rightnum++
                    } else {
                        $leftnum++
                    }
                }
            }

            $rightnum = ($itemArr.length / 2) - $rightnum;
            $leftnum = ($itemArr.length / 2) - $leftnum;

     

            LabelTextFont.writeTextAutoCenter(this._bottomRender.uiAtlas, this.a_kuafu_dangqian_jifen_txt.skinName, ColorType.Whitefff7db +"当前积分:" + KuaFu3v3Model.getInstance().selfVo.score, 16, ColorType.Yellowedce7e, 200, true);
          

            
            this.drawTop($rightnum,$leftnum );
      
            var $time: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM())
            if ($time < 1) {
                $time=15
            }
            this._endtime = TimeUtil.getTimer() + $time * 1000;//结束时间

            TimeUtil.addFrameTick(this._tickFun);
        }
        private drawTop($leftnum: number, $rightnum: number): void {
            //胜负ui
            this.setUiListVisibleByItem(this.a_kuafu_tittle, false);
            if ($leftnum == $rightnum) {
                this.setUiListVisibleByItem([this.a_kuafu_tittle[1]], true);
            } else {
                var $selfGrop: number = KuaFu3v3Model.getInstance().selfVo.group;
                if ($leftnum > $rightnum && $selfGrop == 1 || $leftnum < $rightnum && $selfGrop == 2) {
                    this.setUiListVisibleByItem([this.a_kuafu_tittle[0]], true);
                } else {
                    this.setUiListVisibleByItem([this.a_kuafu_tittle[2]], true);
                }
            }
            //左右比分绘制
            ArtFont.getInstance().writeFontToSkinNameCenter(this._bottomRender.uiAtlas, this.a_bifen_left.skinName, String($leftnum), ArtFont.num23)
            ArtFont.getInstance().writeFontToSkinNameCenter(this._bottomRender.uiAtlas, this.a_bifen_right.skinName, String($rightnum), ArtFont.num23)
        }

        private drawHeadIconToCtx($ui: FrameCompenent, $id: number): void {
 

            IconManager.getInstance().getIcon(getTouPic($id),
                ($img: any) => {
                    var $skillrec: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
          
                    $ctx.drawImage($img, 0, 0, $skillrec.width, $skillrec.height);
                    $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
                });
        }
        private drawFrontToFrame($ui: FrameCompenent, $str: string, $align: string = TextAlign.CENTER): void {
            var $toRect: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $str, 14, 0, 0, $align);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        }
     

  
    }
}