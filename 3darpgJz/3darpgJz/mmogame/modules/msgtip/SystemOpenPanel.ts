module msgtip {
    export class SystemOpenPanel extends UIConatiner {

        private _winBgRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.middle = 0;
            this.center = 0;
       
            this._winBgRender = new UIRenderComponent();
            this.addRender(this._winBgRender);

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {
            GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
                this._winBgRender.uiAtlas = $publicbgUiAtlas;
                this._midRender.uiAtlas.setInfo("ui/uidata/msg/systemopen.xml", "ui/uidata/msg/systemopen.png", () => { this.loadConfigCom() });
            });
          
        }
        private win_bg:UICompenent
        private addBg(): void {
            var $bg: UICompenent = this.addEvntBut("t_rightbg2", this._winBgRender);
            $bg.x = 0;
            $bg.y = 0;
            $bg.width = UIData.designWidth
            $bg.height = UIData.designHeight
            this.uiItem.push($bg)
            this.win_bg = $bg;
         
            this.resize();
        }
        public resize(): void {
            this.win_bg.top = 0
            this.win_bg.left = 0
            this.win_bg.width = Scene_data.stageWidth / UIData.Scale;
            this.win_bg.height = Scene_data.stageHeight / UIData.Scale;
            super.resize()
        }
        private a_icon: UICompenent;
        private a_text: UICompenent;
        private a_tittle:FrameCompenent
        private loadConfigCom(): void {
            this.uiItem = new Array;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this.addBg()
            this.uiItem.push(this.addChild(this._bottomRender.getComponent("a_bg")));
            this.uiItem.push(this.addChild(this._midRender.getComponent("a_icon_bg")));
            this.a_icon = this.addChild(this._topRender.getComponent("a_icon"));


            this.a_tittle = <FrameCompenent>this.addChild(this._topRender.getComponent("a_tittle"));
            this.uiItem.push(this.a_tittle);
            this.uiItem.push(  this.addChild(this._topRender.getComponent("a_txt_bg")));
            this.a_text=  this.addChild(this._topRender.getComponent("a_text"));

            this.baseIonPos = new Vector2D(this.a_icon.x, this.a_icon.y)
            this.uiItem.push(this.a_text)
            this.applyLoadComplete();
        }
        private baseIonPos:Vector2D
        private uiItem: Array<UICompenent>
        private getOpenSkillIconUrl(name:string): string {
            return "ui/load/activity/skillopen/openskill1.png";
        }
        private drawSkillOpen($id:number): void
        {
         //  this._topRender.uiAtlas.upDataPicToTexture(this.getOpenSkillIconUrl(String($id)), this.a_icon.skinName);
           var $url: string = getSkillIconUrl(tb.TB_skill_base.get_TB_skill_base($id).icon)
           LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
               ($img: any) => {
                   var rec: UIRectangle = this._topRender.uiAtlas.getRec(this.a_icon.skinName);
                   this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                   UiDraw.cxtDrawImg(this._topRender.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                   this._topRender.uiAtlas.ctx.drawImage($img, 4, 4, 62, 62);
                   TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, this._topRender.uiAtlas.ctx);
               });

            /*
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    var rec: UIRectangle = this._topRender.uiAtlas.getRec(this.a_icon.skinName);
                    var $ctx: CanvasRenderingContext2D= UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                  //  $ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    UiDraw.cxtDrawImg($ctx, PuiData.SKILL_BG, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                    //$ctx.drawImage(imgA, 4, 4, 62, 62);
                    TextureManager.getInstance().updateTexture(this._topRender.texture, rec.pixelX, rec.pixelY, $ctx);
                });
            */
        }
        public setData($tb: tb.TB_system_icon ): void
        {
         
            GameMouseManager.getInstance().useMouseEvent=false

            var $picUrl: string = this.getIconByID($tb.id);
            var $text: string = ColorType.Yellowffe9b4 + $tb.text;
            this.setUiListVisibleByItem(this.uiItem, true);
            if ($tb.position == 99) {//技能开启
                this.drawSkillOpen($tb.id)
                this.a_tittle.goToAndStop(1);
            } else {
                this._topRender.uiAtlas.upDataPicToTexture($picUrl, this.a_icon.skinName);
                this.a_tittle.goToAndStop(0);
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_text.skinName, $text, 14, TextAlign.CENTER, ColorType.Yellowffe9b4)

            this.a_icon.x = this.baseIonPos.x;
            this.a_icon.y = this.baseIonPos.y;
            this.toPos = new Vector2D(UIData.designWidth, UIData.designHeight);
            if ($tb.position == 4 || $tb.position == 5 || $tb.position == 6 || $tb.position == 7) {  //为大系统
                if (mainUi.MainUiModel.skillTabIndex == 0) {
                    this.toPos = UiTweenVo.getPosByPanel(new Vector2D(900, 150), { width: UIData.designWidth, height: UIData.designHeight, right: 0 }, this); //切换按钮位置
                } else {
                    this.toPos = UiTweenVo.getPosByPanel(this.getPandaPos($tb), { width: UIData.designWidth, height: UIData.designHeight, right: 0, bottom: 0 }, this);
                }
            } else if ($tb.position == 3) {
                this.toPos = UiTweenVo.getPosByPanel(new Vector2D(3, 471), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
            } else if ($tb.position == 9) {
                this.toPos = UiTweenVo.getPosByPanel(new Vector2D(750, 170), { width: UIData.designWidth, height: UIData.designHeight, right: 0, top: 0 }, this);
            } else if ($tb.position == 99) {
                switch ($tb.index) {
                    case 2:
                        this.toPos = UiTweenVo.getPosByPanel(new Vector2D(727, 454), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
                        break
                    case 3:
                        this.toPos = UiTweenVo.getPosByPanel(new Vector2D(728, 374), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
                        break
                    case 4:
                        this.toPos = UiTweenVo.getPosByPanel(new Vector2D(787, 316), { width: UIData.designWidth, height: UIData.designHeight, left: 0, bottom: 0 }, this);
                        break
                    default:
                        break;
                }
              
            }else {
                //右上角系统提示
                this.toPos = UiTweenVo.getPosByPanel(this.getPandaPos($tb), { width: UIData.designWidth, height: UIData.designHeight, right: 0, top: 0 }, this);
            }

            TimeUtil.addTimeOut(1500, () => {
                this.setUiListVisibleByItem(this.uiItem, false);
                TweenMoveTo(this.a_icon, 0.6, { x: this.toPos.x, y: this.toPos.y, onComplete: () => { this.changeButEnd() } });
            });
    
        }
        private getPandaPos($tb: tb.TB_system_icon ): Vector2D
        {
            var $cellNum:number=1
            for (var i: number = 0; i < GuidData.player.systemOpenItem.length; i++)
            {
                if (GuidData.player.systemOpenItem[i].needShowIcon) {
                    var $temp: tb.TB_system_icon = tb.TB_system_icon.getTempVo(GuidData.player.systemOpenItem[i].systemId);
                    if ($temp.position == $tb.position) {
                        if ($temp.index < $tb.index) {
                            $cellNum++
                        }
                    }
                }
            }
            var $pandaPos: Vector2D = new Vector2D;

            if ($tb.position == 1) {
                $pandaPos.x = 780 - $cellNum * 65;
                $pandaPos.y = 10 
            }
            if ($tb.position == 2) {
                $pandaPos.x = 780 - $cellNum * 65;
                $pandaPos.y = 10 +  65;
            }
            if ($tb.position == 4) {
                $pandaPos.x = 890 - $cellNum * 70
                $pandaPos.y = 464
            }
            if ($tb.position == 5) {
                $pandaPos.x = 890 
                $pandaPos.y = 464 - $cellNum * 68
            }
      
            return $pandaPos
        }
        private getMoveToPos($v2d:Vector2D,$typeId:number): Vector2D
        {
            var $pos: Vector2D = new Vector2D(896, 466)
            if (mainUi.MainUiModel.systemTab == $typeId) {
                return UiTweenVo.getPosByPanel($v2d, { width: UIData.designWidth, height: UIData.designHeight, right: 0, bottom: 0 }, this);
            } else {
                return UiTweenVo.getPosByPanel($pos, { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom: 0 }, this);
            }

        }
        private getIconByID($id): string {
          //  return "ui/load/activity/panda/" + $id + ".png"
            return "ui/load/systemicon/" + $id + ".png"
           
        }
        private toPos: Vector2D
        public changeButEnd(): void {
       
            UIManager.getInstance().removeUIContainer(this);
         
            GuidData.player.resetSystemItem();
            GuidData.player.resetSkillItem();
            if (SceneManager.getInstance().render) {
                // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON));
                ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.REFRESH_HOME_UI_PANEL));
                ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.SHOW_TOP_UI_PANEL));
                ModuleEventManager.dispatchEvent(new rightui.RightUiEvent(rightui.RightUiEvent.SHOW_RIGHT_UI_PANEL));
                ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_GUIDE_POP_VIEW));

                ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.SHOW_LEFT_UI_PANEL));
            }
            GameMouseManager.getInstance().useMouseEvent = true;

          
        }
 
    }


}