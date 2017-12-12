module topui {

    export class TopTargetHeadPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _centerRender: UIRenderComponent;

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0;
            this.left = 0;

        }

        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent, $centerRender: UIRenderComponent): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._centerRender = $centerRender;
            this._topRender = $top;
            this.loadConfigCom();
        }
        private bloodUI: UICompenent;
        private nameUI: UICompenent;
        private bloodTxt: UICompenent;
        private iconUI: UICompenent;
        private levUI: UICompenent;
        
        private loadConfigCom(): void {
            this.addUIList(["t_tar_bg"], this._bottomRender);

            this.bloodUI = this.addChild(this._midRender.getComponent("t_tar_blood"));
            this.iconUI = this.addChild(this._midRender.getComponent("t_tar_icon"));

            this.addUIList(["t_tar_mask"], this._centerRender);

            this.nameUI = this.addChild(this._topRender.getComponent("t_name"));
            this.bloodTxt = this.addChild(this._topRender.getComponent("t_blood_txt"));
            this.levUI = this.addChild(this._topRender.getComponent("t_level"));

            

            //this.draw();
            //this.refreshBlood();

            TimeUtil.addFrameTick((t: number) => { this.upDataFun(t) });
        }
        private upDataFun(t: number): void {
            var $isvisible: boolean = true;
            if (GameInstance.attackTarget && GuidData.map) {
                if (GameInstance.attackTarget.isBoss) {
                    $isvisible = false
                }
                if (GuidData.map.is1V1() || GuidData.map.is3V3() || GuidData.map.getMapID()==3018) {
                    $isvisible = false
                }
            } else {
                $isvisible = false
            }
    

            if ($isvisible) {
                this.setVisible(true);
                this.drawAttackName();
                this.drawBloodNum();
                this.drawIcon();

            } else {
                this.setVisible(false)
            }

        }
        private lastBloodnum: number
        public drawBloodNum() {
            var $num: number = GameInstance.attackTarget.unit.getHp() / GameInstance.attackTarget.unit.getMaxHp()
            if (this.lastBloodnum !== $num) {
                this.lastBloodnum = $num
                this.bloodUI.uvScale = $num * -1
                var $hpStr: string = Math.ceil(Math.abs($num * 100)) + "/100";
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.bloodTxt.skinName, $hpStr, 14 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)

            }
        }
        private lastVisble: boolean = true
        private setVisible(value: boolean): void {
            if (this.lastVisble != value) {
                if (value) {
                    this.left = 0;
                } else {
                    this.left = -1000;
                }
                this.lastVisble = value
            }
        }
        private lastIconId: number
        private drawIcon(): void {
            var $sid: number = GameInstance.attackTarget.unit.getEntry();
            if ($sid == 0) {
                $sid = GameInstance.attackTarget.unit.getCharType() % 2
            } else {
                $sid = tb.TB_creature_template.get_TB_creature_template($sid).avatar
            }
            if (this.lastIconId != $sid) {
                this.lastIconId = $sid
                IconManager.getInstance().getIcon(getRoleIconUrl(String(this.lastIconId)), ($img: any) => {
                    var rec: UIRectangle = this._midRender.uiAtlas.getRec(this.iconUI.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                    TextureManager.getInstance().updateTexture(this._midRender.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
                });
            }

        }
        private lastName: string
        private drawAttackName(): void {

            var $useName: string = getBaseName(GameInstance.attackTarget.unit.getName())
            if (this.lastName != $useName) {
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.nameUI.skinName, ColorType.Whitefff7db + $useName + " ", 16 * 1.5, TextAlign.RIGHT, ColorType.Whitefff7db)
                this.lastName = $useName

                var $level: string = String(GameInstance.attackTarget.unit.getLevel());
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.levUI.skinName, ColorType.Whitefff7db + $level, 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)

            }

        }
        /*
        public draw():void{
            IconManager.getInstance().getIcon(getRoleIconUrl("7031"),($img:any)=>{
                var rec: UIRectangle = this._midRender.uiAtlas.getRec(this.iconUI.skinName);
                var ctx: CanvasRenderingContext2D= UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture(this._midRender.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
            });
            var $level: string = String(20);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.levUI.skinName, ColorType.Whitefff7db + $level, 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)
            var $useName: string = getBaseName("小竹精");
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.nameUI.skinName, ColorType.Whitefff7db + $useName + " ", 16 * 1.5, TextAlign.RIGHT, ColorType.Whitefff7db)
        }
        public refreshBlood(){
            this.bloodUI.uvScale = 1.0;
            var $hpStr: string = "50/100";
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.bloodTxt.skinName, $hpStr, 14 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)
        }
        */

    }
    export class TopHeadPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _effRender: FrameUIRender;
        private _redRender:RedPointRender;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0;
            this.left = 0;

        }
        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent,$fra:FrameUIRender,$red:RedPointRender): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._topRender = $top;
            this._effRender = $fra;
            this._redRender = $red;
            this.loadConfigCom();
        }
        private a_blood_bar: UICompenent;
        private a_head_pic: UICompenent;
        private a_vip_num: UICompenent
        private a_name: UICompenent
        private a_level: UICompenent
        private a_blood_txt: UICompenent
        private a_froce: UICompenent
        private a_head_bg: UICompenent

        private a_pk_model: FrameCompenent;
        private mailUI:UICompenent;
        private loadConfigCom(): void {


            this.a_head_bg = this.addChild(this._bottomRender.getComponent("a_head_bg"));
            var ui: UICompenent = this.addChild(this._bottomRender.getComponent("a_vip_bg"));
            ui.addEventListener(InteractiveEvent.Down, this.vipclick, this);



            this.a_blood_bar = this.addChild(this._midRender.getComponent("a_blood_bar"));
            this.a_head_pic = this.addEvntBut("a_head_pic", this._midRender);
            this.a_head_pic.addEventListener(InteractiveEvent.Up, this.butClik, this);


            this.a_pk_model = <FrameCompenent>this.addEvntButUp("a_pk_model", this._midRender);

            this.addChild(this._topRender.getComponent("a_head_mask"));
            this.addChild(this._topRender.getComponent("a_levbg"));

            this.a_vip_num = this.addChild(<UICompenent>this._topRender.getComponent("a_vip_num"));
            this.a_name = this.addChild(<UICompenent>this._topRender.getComponent("a_name"));
            this.a_level = this.addChild(<UICompenent>this._topRender.getComponent("a_level"));
            this.a_blood_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_blood_txt"));
            this.a_froce = this.addChild(<UICompenent>this._topRender.getComponent("a_froce"));

            this.mailUI = this.addChild(this._topRender.getComponent("t_mail"));   
            this.mailUI.addEventListener(InteractiveEvent.Down, this.mailClick, this); 

            var red: RedPointCompenent = this._redRender.getRedPointUI(this, 3, new Vector2D(this.mailUI.x + this.mailUI.width, this.mailUI.y));

            this.buildeff();
            this.loadRolePic()
        }

        private _effUI: FrameTipCompenent;
        private buildeff(){
            this._effRender.setImg(getEffectUIUrl("ef_zhanli_01"), 8, 4, ($ui: any) => {
                this._effUI = $ui;
                this._effUI.x = this.a_head_bg.x + 83;
                this._effUI.y = this.a_head_bg.y + 23;
                //this.expEff.width = this.expEff.baseRec.width * 1.5;
                //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                this._effUI.speed = 1;
                this._effUI.play();
                this.addChild(this._effUI);
            })
        }

        private vipclick($e: InteractiveEvent): void {
            ModulePageManager.openPanel(SharedDef.MODULE_VIP);
        }
        
        private mailClick($e: InteractiveEvent): void {
            ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
        }

        private loadRolePic(): void {
            var $type: number = GuidData.player.getCharType();  //1男2女
            var $url: string = getTouPic($type)

            this._bottomRender.uiAtlas.upDataPicToTexture($url, this.a_head_pic.skinName);
        }
        public refreshBloodBar(): void {
            var $unit: Unit = GameInstance.mainChar.unit;

            //   console.log($unit.getHp(), "/", $unit.getMaxHp());
            this.a_blood_bar.uvScale = $unit.getCurHpView() / $unit.getMaxHpView();
            var $hpStr: string = String($unit.getCurHpView()) + "/" + String($unit.getMaxHpView());
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_blood_txt.skinName, $hpStr, 14 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)

            // ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.a_blood_txt.skinName, $hpStr, ArtFont.num30, TextAlign.RIGHT, 1);

        }
        public refresh(): void {
            if (GuidData.map.showAreaById(AreaType.topleft_1)) {
                this.left = 0
            } else {
                this.left = -1000;
            }
            var $level: string = String(GuidData.player.getLevel())
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_level.skinName, ColorType.Whitefff7db + $level, 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)
            var $useName: string = getBaseName(GuidData.player.getName())
            //ColorType.White, "#27262e", 3
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_name.skinName, ColorType.Whitefff7db + $useName + " ", 16 * 1.5, TextAlign.CENTER, ColorType.Whitefff7db)

            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.a_vip_num.skinName, String(GuidData.player.getVipLevel()), ArtFont.numVip, TextAlign.LEFT)
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.a_froce.skinName, String(Math.floor(GuidData.player.getForce())), ArtFont.numVip, TextAlign.LEFT)


            var $fieldNotoriety: number = GuidData.player.getUnitFieldNotoriety(); //战斗模式
            if ($fieldNotoriety == 0) {
                this.a_pk_model.goToAndStop(0);
            }
            if ($fieldNotoriety == 1) {
                this.a_pk_model.goToAndStop(1);
            }

            this.refreshBloodBar();
        }




        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_head_pic:
                    if (GameStart.GM && evt.type == InteractiveEvent.Up) {
                        ModuleEventManager.dispatchEvent(new Camand.ComandEvent(Camand.ComandEvent.SHOW_COMMAND_EVENT));
                    }
                    break
                case this.a_pk_model:
                    if(GuidData.map.tbMapVo.allowChangeMode == 1){
                        if (this.a_pk_model.current == 0) {
                            AlertUtil.show("切换为pk模式将攻击家族以外的所有玩家，是否确认？", "提示", (a: any) => {
                                if (a == 1) {
                                    NetManager.getInstance().protocolos.change_battle_mode(SharedDef.FAMILY_MODE);
                                }
                            })
                        } else {
                            NetManager.getInstance().protocolos.change_battle_mode(SharedDef.PEACE_MODE);
                        }
                    }else{
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "此场景无法切换模式", 99);
                    }

                    // public static PEACE_MODE: number = 0;	// 和平模式
                    //public static FAMILY_MODE: number = 1;	// 家族模式
                    //public static GROUP_MODE: number = 2;	// 组队模式

                    break;

                default:
                    break;
            }
        }
    }
}