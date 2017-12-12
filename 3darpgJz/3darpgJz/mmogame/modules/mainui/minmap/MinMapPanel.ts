module minmap {
    export class MinMapPanel extends UIConatiner {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _effRender: FrameUIRender;
        private _effGuaRender:FrameUIRender;

        public constructor() {
            super();
            this.interfaceUI = true;
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.top = 0;



            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._effRender = new FrameUIRender();
            this.addRender(this._effRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._effGuaRender = new FrameUIRender();
            this.addRender(this._effGuaRender);
            this._effGuaRender.blenderMode = 1;

            this._midRender.setInfo("ui/uidata/minmap/minmap.xml", "ui/uidata/minmap/minmap.png", () => { this.loadConfigCom() });

        }
        private a_self_point: UICompenent;

        private a_pos_txt: UICompenent;
        //private a_server_id_txt: UICompenent;
        // private a_open_map: UICompenent;
        private a_bg_map: UICompenent;
        //private a_server_line_num: UICompenent;
        //private a_email_icon: UICompenent;
        private a_map: UICompenent;
        private a_map_name: UICompenent;
        private a_money: UICompenent;
        private a_exp: UICompenent;
        private a_map_icon:FrameCompenent;
        private a_guaji:UICompenent;
        private expEff:FrameTipCompenent;
        private guaEff:FrameTipCompenent;

        private loadConfigCom(): void {


            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;


            this.a_bg_map = this.addChild(<UICompenent>this._bottomRender.getComponent("w_bg"));

            //this.addChild(this._topRender.getComponent("a_open_map"));
            //this.a_email_icon = this.addEvntBut("a_email_icon", this._topRender)

            //var red: RedPointCompenent = this._redPointRender.getRedPointUI(this, 3, new Vector2D(this.a_email_icon.x + this.a_email_icon.width, this.a_email_icon.y));


            this.a_map = this.addChild(<UICompenent>this._topRender.getComponent("a_map"));
            this.a_map_name = this.addChild(<UICompenent>this._topRender.getComponent("a_map_name"));

            this.a_money = this.addChild(<UICompenent>this._topRender.getComponent("a_money"));
            this.a_exp = this.addChild(<UICompenent>this._topRender.getComponent("a_exp"));

            this.a_guaji = this.addChild(<UICompenent>this._topRender.getComponent("a_guaji"));

            this.a_pos_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_pos_txt"));

            this.a_map_icon = <FrameCompenent>this._topRender.getComponent("a_map_icon");
            this.addChild(this.a_map_icon);
            this.a_map_icon.goToAndStop(0);
            this.a_map_icon.addEventListener(InteractiveEvent.Up,this.butClik,this);

            this._effRender.setImg(getEffectUIUrl("ui_zidong"), 4, 4, ($ui: any) => {
                this.expEff = $ui;
                this.expEff.x = this.a_guaji.x - 10;
                this.expEff.y = this.a_guaji.y - 38;
                this.expEff.width = this.expEff.baseRec.width;
                this.expEff.height = this.expEff.baseRec.height;
                this.expEff.speed = 2;
                this.addChild(this.expEff);
            })

            this._effGuaRender.setImg(getEffectUIUrl("ef_guangshu"), 4, 8, ($ui: any) => {
                this.guaEff = $ui;
                this.guaEff.x = this.a_map_icon.x - 8;
                this.guaEff.y = this.a_map_icon.y + 8;
                this.guaEff.width = this.guaEff.baseRec.width * 0.5;
                this.guaEff.height = this.guaEff.baseRec.height * 0.5;
                this.guaEff.speed = 2;
                if(this.a_map_icon.current == 1){
                    this.addChild(this.guaEff);
                }                
            })
            //TimeUtil.addFrameTick((t: number) => { this.update(t) });



            this.refresh()

        }
        public butClik(evt: InteractiveEvent): void {
            var page:number = 3
            if(GuidData.map.isAdventureScene()){
                page = 1
            }else{
                if(!GuidData.player.getsyspageopen(SharedDef.MODULE_WORLD_RISK,SharedDef.MODULE_WORLD_RISK_MAIN)){
                    var sy:tb.TB_system_base = tb.TB_system_base.getTempVo(SharedDef.MODULE_WORLD_RISK * 10 + SharedDef.MODULE_WORLD_RISK_MAIN);
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级" + sy.level + "级后解锁", 99);
                    return;
                }
            }
            ModulePageManager.openPanel(SharedDef.MODULE_TEST,page);

        }
        private update(t: number): void {
            if (AstarUtil.minMapRect && this.hasStage) {

                var $v: Vector2D = GameInstance.mainChar.getAstarPos()
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_pos_txt.skinName, ColorType.Yellowffe9b4 + "" + $v.x + ":" + $v.y, 14)
            }
        }

        private nextDrawGMtime: number = 0

        public refresh(): void {
            if (this._topRender.uiAtlas) {
                if (SceneManager.getInstance().ready) {
                    //ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_server_id_txt.skinName, String(GameInstance.sid), ArtFont.num1);
                    //console.log("ui/load/map/" + String(GuidData.map.tbMapVo.id) + ".png")
                    var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();

                    if(GuidData.map.isAdventureScene()){
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.colorffe9b4 + $tb.name, 28);
                        this.a_map_icon.goToAndStop(0);
                        if(this.guaEff){
                            this.removeChild(this.guaEff);
                        }
                    }else{
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.colorffe9b4 + GuidData.map.tbMapVo.name, 28);
                        this.a_map_icon.goToAndStop(1);
                        if(this.guaEff){
                            this.addChild(this.guaEff);
                        }
                    }
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map.skinName, ColorType.Coffeeff9200 + GuidData.map.tbMapVo.types, 28);
                    

                    
                    var exp: number = $tb.expReward[1] * 360;
                    var wnum:number = LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp.skinName, ColorType.colorffe9b4 + Snum(exp) + "/小时 ", 24, TextAlign.CENTER);
                    
                    var gold: number = $tb.goldReward[1] * 360;
                    wnum = LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_money.skinName, ColorType.colorffe9b4 + Snum(gold) + "/小时", 24, TextAlign.CENTER);



                }

            }
        }
        public resize(): void {
            super.resize();

        }

    }




}