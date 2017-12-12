module rightui {

    export class RightUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _aotuRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _exitRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _effRender: FrameUIRender;

        private _frameRender: FrameUIRender;

        private uiAtlasComplet: boolean = false;

        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._aotuRender = new UIRenderComponent;
            this.addRender(this._aotuRender);


            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._exitRender = new UIRenderComponent;
            this.addRender(this._exitRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._effRender = new FrameUIRender;
            this.addRender(this._effRender);

            this._frameRender = new FrameUIRender;
            this.addRender(this._frameRender);

            this._midRender.uiAtlas = new UIAtlas;


        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/mainui/right/right.xml", "ui/uidata/mainui/right/right.png", () => { this.loadConfigCom() });
        }

        private a_bag: UICompenent;
        private a_change: UICompenent;
        private a_exit: UICompenent;
        private a_hunjing: UICompenent;
        private a_skill_aotu: SelectButton;

        private bag_red: RedPointCompenent;
        private change_red: RedPointCompenent;

        private _huanjingEff: FrameTipCompenent;

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;

            this._exitRender.uiAtlas = this._midRender.uiAtlas;

            this._aotuRender.uiAtlas = this._midRender.uiAtlas;

            this.a_bag = this.addEvntButUp("a_bag", this._bottomRender);
            this.a_bag.addEventListener(InteractiveEvent.Down, v => { }, this);


            this.a_hunjing = this.addEvntButUp("a_hunjing", this._bottomRender);
            this.a_hunjing.addEventListener(InteractiveEvent.Down, v => { }, this);
            this.removeChild(this.a_hunjing)

            this.a_skill_aotu = this.addEvntBut("a_skill_aotu", this._aotuRender);

            this.a_sys_tip_pic = this.addEvntButUp("a_sys_tip_pic", this._bottomRender);
            this.a_sys_tip_pic.addEventListener(InteractiveEvent.Down, v => { }, this);
            this.a_sys_tip_pic.addEventListener(InteractiveEvent.Up, this.a_sys_tip_picClik, this);
            //  this.removeChild(this.a_sys_tip_pic)


            this.a_sys_tip_txt = this.addChild(this._midRender.getComponent("a_sys_tip_txt"));
            this.a_sys_tip_icon = this.addChild(this._midRender.getComponent("a_sys_tip_icon"));


            this.a_change = this.addEvntButUp("a_change", this._bottomRender);
            this.a_change.addEventListener(InteractiveEvent.Down, v => { }, this);

            this._redPointRender.getRedPointUI(this, 124, new Vector2D(this.a_hunjing.x + this.a_hunjing.width, this.a_hunjing.y));
            this.bag_red = this._redPointRender.getRedPointUI(this, 1, new Vector2D(this.a_bag.x + this.a_bag.width, this.a_bag.y));
            this.change_red = this._redPointRender.getRedPointUI(this, 5, new Vector2D(this.a_change.x + this.a_change.width, this.a_change.y));

            this.a_exit = this.addChild(this._exitRender.getComponent("a_exit"));
            this.a_exit.addEventListener(InteractiveEvent.Up, this.exitMap, this);
            this.a_exit.addEventListener(InteractiveEvent.Down, v => { }, this);




            this.uiAtlasComplet = true;

            this.refreshNotice();
            this.buildFram();

            BagData.uipos.x = this.a_bag.absoluteX + this.a_bag.width / 2;
            BagData.uipos.y = this.a_bag.absoluteY + this.a_bag.height / 2;
        }

        public resize():void{
            super.resize();
            BagData.uipos.x = this.a_bag.absoluteX + this.a_bag.width / 2;
            BagData.uipos.y = this.a_bag.absoluteY + this.a_bag.height / 2;
        }

        private effui: FrameTipCompenent;
        private buildFram(): void {
            // if (!this._frameRender) {
            // this._frameRender = new FrameUIRender();
            // this.addRender(this._frameRender);
            this._frameRender.setImg(getEffectUIUrl("ef_zd"), 4, 4, ($ui: any) => {
                this.effui = $ui;
                this.effui.x = this.a_skill_aotu.x - 46
                this.effui.y = this.a_skill_aotu.y - 42
                this.effui.width = this.effui.baseRec.width * 1.1;
                this.effui.height = this.effui.baseRec.height * 1.1;
                this.effui.speed = 3;
                this.applyLoadComplete();
            }, 1);
            // }else{
            //     this.refresh();
            // }
        }

        public playEff($isvisiable: boolean): void {
            if (!this.effui) {
                return;
            }
            if ($isvisiable) {
                console.log("----对象------", this.effui);
                this.addChild(this.effui);
                this.effui.play();
            } else {
                this.removeChild(this.effui);
            }
        }

        private a_sys_tip_txt: UICompenent
        private a_sys_tip_icon: UICompenent
        public a_sys_tip_picClik($e: InteractiveEvent): void {

            if (this.a_sys_tip_pic.data instanceof tb.TB_system_preview) {
                var $tb: tb.TB_system_preview = this.a_sys_tip_pic.data;
                console.log($tb)
                // var a: vec3DshowVo = new vec3DshowVo();
                // a.info = $tb.p_info;
                // a.name = $tb.p_name;
                // a.type = $tb.type;
                // a.id = $tb.id;
                // if ($tb.p_model[0].length > 1) {
                //     if (GuidData.player.getCharType() == 1) {
                //         a.modelid = $tb.p_model[0][0];
                //     } else {
                //         a.modelid = $tb.p_model[0][1];
                //     }
                // } else {
                //     a.modelid = $tb.p_model[0][0];
                // }
                // a.state = 2;
                // Vec3DshowPanel.getInstance().show(a);
                var $evt = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_SYSTRAILER_EVENT)
                $evt.data = $tb.id;
                ModuleEventManager.dispatchEvent($evt);

            } else {
                var $showActivityVo: activity.ActivityItemVo = this.a_sys_tip_pic.data
                ModulePageManager.openPanel($showActivityVo.data.goto, $showActivityVo.data.goto_sub);

            }
        }
        private a_sys_tip_pic: UICompenent

        public isaddHuanjingBut(): void {
            if (!this._huanjingEff) {
                this.addChild(this.a_hunjing)
                this._effRender.setImg(getEffectUIUrl("ui_mx"), 4, 4, ($ui: any) => {
                    this._huanjingEff = $ui;
                    this._huanjingEff.x = this.a_hunjing.x - 10;
                    this._huanjingEff.y = this.a_hunjing.y - 10;
                    this._huanjingEff.width = this._huanjingEff.baseRec.width * 0.7;
                    this._huanjingEff.height = this._huanjingEff.baseRec.height * 0.7;
                    this.addChild(this._huanjingEff);
                    this._huanjingEff.speed = 3;
                    this._huanjingEff.play();

                })
            }
        }

        public refreshNotice(): void {
            var $has: boolean = false
            if (this.uiAtlasComplet) {
                if (GuidData.faction) {
                    if (GuidData.faction.getApplyList().length) {
                        $has = true
                    }
                }
            }
        }
        protected butClik(evt: InteractiveEvent): void {
            if (!GameInstance.canclikFightui) {
                return 
            }
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_bag:
                    ModulePageManager.openPanel(SharedDef.MODULE_BAG, 2);
                    break
                case this.a_change:
                    UIManager.popClikNameFun(this.a_change.skinName);
                    mainUi.MainUiModel.skillTabIndex = (mainUi.MainUiModel.skillTabIndex + 1) % 2;
                    if (mainUi.MainUiModel.skillTabIndex == 0) {
                        ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL));
                        ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.HIDE_HOME_UI_PANEL));
                    } else {
                        ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL));
                        ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.HIDE_FIGHT_UI_PANEL));
                    }
                    ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
                    break
                case this.a_hunjing:
                    console.log("---a_hunjing---");
                    ModulePageManager.openPanel(SharedDef.MODULE_REALM);
                    // msgtip.GuideModel.getInstance().clikOptionalGuide
                    UIManager.popClikNameFun(this.a_hunjing.name);

                    break
                case this.a_skill_aotu:
                    
                    AotuSkillManager.getInstance().aotuBattle = !AotuSkillManager.getInstance().aotuBattle;
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    break
                default:
                    break;

            }
        }

        public changeSkillAotu(): void {
            if (this.a_skill_aotu) {
                this.a_skill_aotu.selected = AotuSkillManager.getInstance().aotuBattle;

                if (GuidData.map.showAreaById(AreaType.rightChange_6) || GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                    this.playEff(this.a_skill_aotu.selected);
                    console.log("====自动战斗按钮======", this.a_skill_aotu.selected)
                }


             
            }
        }

        private _exitFun: Function;
        public exitMap($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (!this._exitFun) {
                this._exitFun = ($type: number) => {
                    if ($type == 1) {
                        NetManager.getInstance().protocolos.instance_exit(0);
                    }
                }
            }
            if (GuidData.map.tbMapVo.inst_sub_type == 13) {//家族boss
                AlertUtil.show("放弃挑战不会获得任何奖励并扣除挑战次数！是否放弃？", "", this._exitFun, 2, ["是", "否"]);
            } else {
                this._exitFun(1);
            }


        }
        public show(): void {

            UIManager.getInstance().addUIContainer(this);
            this.renderSetVisibel([this._bottomRender, this._midRender, this._redPointRender, this._effRender], GuidData.map.showAreaById(AreaType.rightChange_6))
            this.renderSetVisibel([this._exitRender], GuidData.map.showAreaById(AreaType.sceneExit_30))

            // if (GuidData.map.isAdventureBaseScene() || GuidData.map.isAdventureBossScene()) {
            //     if (GuidData.map.isAdventureBaseScene()) {
            //         this.a_hunjing.goToAndStop(1);
            //     } else {
            //         this.a_hunjing.goToAndStop(2);
            //     }

            //     if (this._huanjingEff) {
            //         this.removeChild(this._huanjingEff);
            //     }
            // } else {
            //     this.a_hunjing.goToAndStop(0);
            //     if (this._huanjingEff) {
            //         this.addChild(this._huanjingEff)
            //     }
            // }
            if (GuidData.player.isOpenSystemNeedShow(SharedDef.MODULE_REALM)) {

                this.isaddHuanjingBut()
            }
            if (GuidData.map.showAreaById(AreaType.rightChange_6) || GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                this.renderSetVisibel([this._aotuRender], true)
            } else {
                this.renderSetVisibel([this._aotuRender], false)
            }


            this.drawSysTemTip()
            this.changeSkillAotu();
        }

        public drawSysTemTip(): void {
            var $arr: Array<tb.TB_system_preview> = tb.TB_system_preview.getItem();
            var temp: tb.TB_system_preview
            for (var i: number = 0; i < $arr.length; i++) {
                if ($arr[i].level_start <= GuidData.player.getLevel() && $arr[i].level > GuidData.player.getLevel()) {
                    temp = $arr[i]
                    break;
                }
            }
            if (temp) {
                var syslevtab:tb.TB_system_base = tb.TB_system_base.getTempVo(temp.system_id[0] * 10 + temp.system_id[1]);
                this._bottomRender.uiAtlas.upDataPicToTexture(this.getIconByID(temp.system_id[0]), this.a_sys_tip_icon.skinName);
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_sys_tip_txt.skinName, syslevtab.level + "级解锁", 24, TextAlign.CENTER, ColorType.Whitefff4d6);

                this.a_sys_tip_pic.data = temp
            }
            this.setUiListVisibleByItem([this.a_sys_tip_pic, this.a_sys_tip_icon, this.a_sys_tip_txt], Boolean(temp));
        }
        private getIconByID($id): string {
            //  return "ui/load/activity/panda/" + $id + ".png"
            return "ui/load/systemicon/" + $id + ".png"

        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }



}