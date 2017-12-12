module mountui {

    export class NewMountUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _publicbguiRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _effRender: FrameUIRender;


        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;

            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;

            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }

            if(this.mountUpOrder){
                this.mountUpOrder.dispose();
                this.mountUpOrder = null;
            }
            if(this.mountUpLev){
                this.mountUpLev.dispose();
                this.mountUpLev = null;
            }
            if(this.mountSkill){
                this.mountSkill.dispose();
                this.mountSkill = null;
            }
            if(this.mountHuanhua){
                this.mountHuanhua.dispose();
                this.mountHuanhua = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._publicbguiRender = new UIRenderComponent;
            this.addRender(this._publicbguiRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._roleRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {

            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/mountui/newmountui.xml", "ui/uidata/mountui/newmountui.png", () => { this.loadConfigCom() }, "ui/uidata/mountui/mountpc.png");
            // });
        }

        private mountRoleSprite: Person2DChar;
        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._baseRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.initData();
            this.resize();

            this.applyLoadComplete();
        }

        private TabAry: Array<SelectButton>
        private SkillAry: Array<UICompenent>
        private SkillUnlockAry: Array<UICompenent>
        private AdvanceUIAry: Array<UICompenent>
        private SkillRightBgAry: Array<UICompenent>
        private OtherRightBgAry: Array<UICompenent>
        private wingStarAry: Array<FrameCompenent>

        private a_ro_bg: UICompenent
        private a_name: UICompenent
        private a_force: UICompenent
        private wingExPer: UICompenent
        private wingExp: UICompenent
        private t_cursor: UICompenent
        private a_huanhuaok: UICompenent
        private initData(): void {
            this.mountRoleSprite = new Person2DChar();
            this._roleRender.addModel(this.mountRoleSprite);

            this.a_ro_bg = this.addEvntBut("a_ro_bg", this._roleRender);

            this.SkillAry = new Array
            this.SkillUnlockAry = new Array
            for (var i = 0; i < 4; i++) {
                this.SkillAry.push(this._roleRender.getComponent("a_skill" + i));
                this.SkillUnlockAry.push(this.addChild(this._topRender.getComponent("a_skillunlock" + i)));

            }

            this.TabAry = new Array
            for (var i = 0; i < 4; i++) {
                var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = i + SharedDef.MODULE_MOUNT_UPGRADE;
                a.addEventListener(InteractiveEvent.Down, this.click, this);
                this.TabAry.push(a);
                this._redPointRender.getRedPointUI(this, 28 + i * 2, new Vector2D(a.x + a.width - 5, a.y));
            }

            this.wingStarAry = new Array;
            for (var i: number = 0; i < 10; i++) {
                var star: FrameCompenent = <FrameCompenent>this.addChild(this._baseRender.getComponent("t_star" + i));
                star.goToAndStop(1);
                this.wingStarAry.push(star);
            }


            this.wingExPer = this._baseRender.getComponent("t_pre");
            this.wingExPer.uvScale = 0.01;
            this.t_cursor = this._baseRender.getComponent("t_cursor");
            this.wingExp = this._topRender.getComponent("t_exp");

            this.a_name = this.addChild(this._topRender.getComponent("a_name"));
            this.a_force = this.addChild(this._topRender.getComponent("a_force"));

            this.AdvanceUIAry = new Array;
            this.AdvanceUIAry.push(this.wingExPer);
            this.AdvanceUIAry.push(this.t_cursor);
            this.AdvanceUIAry.push(this.wingExp);
            this.AdvanceUIAry.push(this._roleRender.getComponent("t_bg4"));
            this.AdvanceUIAry.push(this._roleRender.getComponent("a_forcebg"));

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);

            this.SkillRightBgAry = new Array
            this.OtherRightBgAry = new Array

            var cnew_bg_yellow = this.winmidRender.getComponent("cnew_bg_yellow");
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._roleRender);
            this.SkillRightBgAry.push(cnew_bg_yellow);

            var cnew_right_bg_top = this.winmidRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._roleRender);
            this.OtherRightBgAry.push(cnew_right_bg_top);
            var cnew_right_bg_bottom = this.winmidRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._roleRender);
            this.OtherRightBgAry.push(cnew_right_bg_bottom);

            this.winmidRender.applyObjData();

            this.addUIList(["a_titlt", "a_line1", "t_mountshadow", "a_namebg"], this._roleRender)
            this.addUIList(["t_bg"], this._bgRender);


            this.a_huanhuaok = this._roleRender.getComponent("a_huanhuaok");


            this.UnlockUIAry = new Array
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.t_unlock0.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.t_unlock1.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock1);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.t_unlock2.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock2);
            this.t_unlock3 = this.addEvntBut("t_unlock3", this._bgRender);
            this.t_unlock3.data = "请先激活坐骑";
            this.UnlockUIAry.push(this.t_unlock3);

        }

        private _lastMouseX: number = 0;
        private _lastRoleRotatioinY: number = 0;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.mountRoleSprite.rotationY;
            // console.log(this._lastMouseX)

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {
            this.mountRoleSprite.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        }
        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }
        private rotationRole(): void {
            this.mountRoleSprite.rotationY -= 0.5;
        }
        public setAvatar(): void {
            var tabvo;
            var orderlev = GuidData.grow.getMountLevel();
            if (orderlev == 0) {
                orderlev = 1;
            }

            if (GuidData.player.getMountHuanhua() != 0) {
                //有幻化
                tabvo = tb.TB_mount_illusion_vo.get_TB_mount_illusion_vo(GuidData.player.getMountHuanhua());
                this.a_huanhuaok
            } else {
                //无幻化
                tabvo = tb.TB_mount_base_vo.get_TB_mount_base_vo(orderlev);
            }

            this.mountRoleSprite.setAvatar(tabvo.mountID);
            this.mountRoleSprite.rotationY = 45
            LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, this.a_name.skinName, tabvo.name + "     " + getChiNum(orderlev) + "阶", 16, TextAlign.CENTER, ColorType.Brown7a2f21)

            // if ($value == 6) {
            //     this._b_name_level.Invisible();
            // } else {
            //     this._b_name_level.goToAndStop($value);
            // }
        }

        //幻化分页时显示的模型
        public setHuanHuaAvatar($id: number, $name: string): void {
            this.mountRoleSprite.setAvatar($id);
            this.mountRoleSprite.rotationY = 45
            LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, this.a_name.skinName, $name, 16, TextAlign.CENTER, ColorType.Brown7a2f21)
        }

        private resizeRole(): void {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 3 * UIData.Scale;
                this.mountRoleSprite.rotationY = 45
                this.mountRoleSprite.x = 100 * UIData.Scale;
                this.mountRoleSprite.y = -75 * UIData.Scale;

            }
        }

        public resize(): void {
            this.resizeRole();
            super.resize();
        }

        private t_unlock0: UICompenent
        private t_unlock1: UICompenent
        private t_unlock2: UICompenent
        private t_unlock3: UICompenent
        private UnlockUIAry: Array<UICompenent>


        public refreshOpenLev() {
            if (!this.activation) {
                var tabsysary: Array<tb.TB_system_base> = new Array
                //读表，判断解锁情况
                for (var j = 0; j < SharedDef.MODULE_MOUNT_ILLUSION; j++) {
                    var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_MOUNT * 10 + j + 1));
                    tabsysary.push($tb_system_base);
                }

                for (var i = 0; i < tabsysary.length; i++) {
                    if (tabsysary[i].level <= GuidData.player.getLevel()) {
                        this.setUiListVisibleByItem([this.TabAry[i]], true);
                        this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                    } else {
                        this.setUiListVisibleByItem([this.TabAry[i]], false);
                        this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                        this.UnlockUIAry[i].data = "人物等级达到" + tabsysary[i].level + "级后解锁";
                    }
                }
            } else {
                this.setUiListVisibleByItem(this.TabAry, false);
                this.setUiListVisibleByItem(this.UnlockUIAry, true);
            }
        }

        //是否激活
        private activation: boolean;
        private unActivationUiPanel: UnActivationUiPanel;
        public show($data: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.activation = GuidData.grow.getMountLevel() == 0
            this.refreshOpenLev();
            this.setUiListVisibleByItem(this.AdvanceUIAry, !this.activation);
            this.setUiListVisibleByItem(this.wingStarAry, !this.activation);
            this.setUiListVisibleByItem(this.SkillAry, true);
            if (!this.activation) {
                //已激活
                if (this.unActivationUiPanel) {
                    this.unActivationUiPanel.hide();
                }
                this.selectedTab($data);
                this.refreshLevStar();
                //设置坐骑总战力
                this.setForce();
            } else {
                if (!this.unActivationUiPanel) {
                    this.unActivationUiPanel = new UnActivationUiPanel();
                    this.unActivationUiPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                }
                this.unActivationUiPanel.show();
                this.setUiListVisibleByItem(this.OtherRightBgAry, true);
                this.setUiListVisibleByItem(this.SkillRightBgAry, false);
            }
            //设置模型
            this.setAvatar();
            this.refreshSkill();

        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.unActivationUiPanel) {
                this.unActivationUiPanel.hide();
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        }

        private _lastlev: number;
        private _laststar: number;
        public refreshLevStar() {
            this.drawExp();
            console.log("--阶数和星数--", this._lastlev, this._laststar, GuidData.grow.getMountLevel(), GuidData.grow.getMountStart());
            if (this._lastlev == GuidData.grow.getMountLevel() && this._laststar == GuidData.grow.getMountStart()) {
                //星数和阶数不变，只更新经验进度
            } else {
                this._lastlev = GuidData.grow.getMountLevel();
                this._laststar = GuidData.grow.getMountStart();
                for (var i: number = 0; i < this.wingStarAry.length; i++) {
                    if (this._laststar > i) {
                        this.wingStarAry[i].goToAndStop(0);
                    } else {
                        this.wingStarAry[i].goToAndStop(1);
                    }
                }
            }
        }

        private expEff: FrameTipCompenent;
        public showExpEff(): void {
            console.log("up skill lev");
            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_cb"), 3, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.wingExPer.x - 70;
                    this.expEff.y = this.wingExPer.y - 55;
                    this.expEff.width = this.expEff.baseRec.width * 1.1;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    this.expEff.speed = 5;
                    this.expEff.playOne(this);
                })
            }
            if (this.expEff) {
                this.expEff.playOne(this);
            }
        }

        private drawExp(): void {
            var $toScale;
            var $str;
            var finalary: Array<tb.TB_mount_train_vo> = tb.TB_mount_train_vo.getTabelItem();
            var $level = GuidData.grow.getMountLevel();
            var $star = GuidData.grow.getMountStart();
            if ($level == finalary[finalary.length - 1].level && $star == finalary[finalary.length - 1].star) {
                //满级
                $toScale = 1;
                $str = "已满级";
            } else {
                var $id: number = ($level - 1) * 11 + $star + 1;
                var targetData;
                if ($star == 10) {
                    targetData = finalary[$id - 2];
                    if (!targetData) {
                        return;
                    }
                    $toScale = 1;
                    $str = targetData.exp + "/" + targetData.exp;
                } else {
                    targetData = finalary[$id - 1];
                    if (!targetData) {
                        return;
                    }

                    //计算经验比
                    $toScale = GuidData.grow.getMountExp() / targetData.exp;
                    $str = GuidData.grow.getMountExp() + "/" + targetData.exp;
                }
            }

            if ($toScale > this.wingExPer.uvScale) {
                TweenMoveTo(this.wingExPer, 0.1, { uvScale: $toScale });
                TweenMoveTo(this.t_cursor, 0.1, { x: $toScale * 240 + 197 });
            } else {
                TweenMoveTo(this.wingExPer, 0.1, { uvScale: 1 });
                this.wingExPer.uvScale = 0;
                TweenMoveTo(this.wingExPer, 0.1, { uvScale: $toScale });

                TweenMoveTo(this.t_cursor, 0.1, { x: 437 });
                this.t_cursor.x = 197;
                TweenMoveTo(this.t_cursor, 0.1, { x: $toScale * 240 + 197 });
                console.log("-$toScale--", $toScale);
            }

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.wingExp.skinName, $str, 14, TextAlign.CENTER, ColorType.Whiteffffff, "", 0, 0, true);

        }

        public refreshSkill() {
            var listitem = NewMountModel.getInstance().getSkillList();
            var listitemleng = listitem.length;
            if (listitemleng > 4) {
                listitemleng = 4
            }
            for (var i = 0; i < listitemleng; i++) {
                var skilllev: number = 1;
                if (listitem[i].state == 2) {
                    LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, this.SkillUnlockAry[i].skinName, " " + listitem[i].lev + "阶\n开启", 14, TextAlign.LEFT, ColorType.Whiteffffff)
                } else {
                    skilllev = listitem[i].lev;
                    LabelTextFont.clearLabel(this._roleRender.uiAtlas, this.SkillUnlockAry[i].skinName);
                }
                IconManager.getInstance().drawMinSkillIcon(this.SkillAry[i], listitem[i].tab.id, listitem[i].state == 2, skilllev);
            }
        }

        private _lastforce: number
        public setForce() {
            var strforce: number = GuidData.player.getMountForce();
            // if (GuidData.grow.getMountLevel() == 0) {
            //     strforce = "";
            // } else {
            //     strforce = Snum(GuidData.player.getMountForce());
            // }
            if (this._lastforce == strforce) {
                return;
            }
            this._lastforce = strforce;
            ArtFont.getInstance().writeFontToSkinNameCenter(this._roleRender.uiAtlas, this.a_force.skinName, Snum(this._lastforce), ArtFont.num56)
        }

        public selectedTab($value: number) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }
            //公共背景显隐逻辑
            this.setUiListVisibleByItem(this.OtherRightBgAry, $value != SharedDef.MODULE_MOUNT_SKILL);
            this.setUiListVisibleByItem(this.SkillRightBgAry, $value == SharedDef.MODULE_MOUNT_SKILL);
            this.showTabPage($value);
            this.hideTabPage($value);
        }


        public mountUpOrder: MountUpOrder
        public mountUpLev: MountUpLev
        public mountSkill: MountSkill
        public mountHuanhua: MountHuanhua
        private showTabPage($value: number) {
            switch ($value) {
                case SharedDef.MODULE_MOUNT_UPGRADE:
                    if (!this.mountUpOrder) {
                        this.mountUpOrder = new MountUpOrder();
                        this.mountUpOrder.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountUpOrder.parent = this;
                    }
                    this.mountUpOrder.show();
                    break;
                case SharedDef.MODULE_MOUNT_LEVEL:
                    if (!this.mountUpLev) {
                        this.mountUpLev = new MountUpLev();
                        this.mountUpLev.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountUpLev.parent = this;
                    }
                    this.mountUpLev.show();
                    break;
                case SharedDef.MODULE_MOUNT_SKILL:
                    if (!this.mountSkill) {
                        this.mountSkill = new MountSkill();
                        this.mountSkill.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountSkill.parent = this;
                    }
                    this.mountSkill.show();
                    break;
                case SharedDef.MODULE_MOUNT_ILLUSION:
                    if (!this.mountHuanhua) {
                        this.mountHuanhua = new MountHuanhua();
                        this.mountHuanhua.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.mountHuanhua.parent = this;
                    }
                    this.mountHuanhua.show();
                    break;

                default:
                    break;
            }

            //切换至幻化页面时。主页面的个别布局显隐逻辑
            var skillvisiable: boolean = false;
            if ($value == SharedDef.MODULE_MOUNT_UPGRADE) {
                skillvisiable = true;
            }
            if ($value == SharedDef.MODULE_MOUNT_ILLUSION) {
                this.setUiListVisibleByItem([this.a_huanhuaok], false);
            } else {
                this.setUiListVisibleByItem([this.a_huanhuaok], GuidData.player.getMountHuanhua() != 0);
            }
            this.setUiListVisibleByItem(this.AdvanceUIAry, skillvisiable);
            this.setUiListVisibleByItem([this.AdvanceUIAry[this.AdvanceUIAry.length - 1]], true);
            this.setUiListVisibleByItem(this.wingStarAry, skillvisiable);
            this.setUiListVisibleByItem(this.SkillUnlockAry, $value < 3);
            this.setUiListVisibleByItem(this.SkillAry, $value < 3);
        }

        private hideTabPage($value: number = -1) {
            switch ($value) {
                case SharedDef.MODULE_MOUNT_UPGRADE:
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
                case SharedDef.MODULE_MOUNT_LEVEL:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
                case SharedDef.MODULE_MOUNT_SKILL:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
                case SharedDef.MODULE_MOUNT_ILLUSION:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    break;

                default:
                    if (this.mountUpOrder) {
                        this.mountUpOrder.hide();
                    }
                    if (this.mountUpLev) {
                        this.mountUpLev.hide();
                    }
                    if (this.mountSkill) {
                        this.mountSkill.hide();
                    }
                    if (this.mountHuanhua) {
                        this.mountHuanhua.hide();
                    }
                    break;
            }
        }

        public showflyword($str:string): void {
            var v21d: Vector2D = new Vector2D(this.wingExPer.parent.x + this.wingExPer.width, this.wingExPer.y);
            var v2d: Vector2D = UiTweenVo.getPosByPanel(v21d, { width: UIData.designWidth, height: UIData.designHeight})
            // var v2d: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(204, 473), { width: 960, height: 540 })
            v2d.x = v2d.x * UIData.Scale;
            v2d.y = v2d.y * UIData.Scale;
            
            msgtip.MsgTipManager.outStr(ColorType.Yellowedce7e+"坐骑经验+"+$str, msgtip.PopMsgVo.type8, v2d);
        }


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_ro_bg:

                
                    this.A_left_bg_MouseDown(evt)
                    break
                case this.w_close:
                    UIManager.popClikNameFun("w_close");
                    ModuleEventManager.dispatchEvent(new MountUiEvent(MountUiEvent.HIDE_MOUNT_EVENT));
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock0.data, 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock1.data, 99);
                    break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock2.data, 99);
                    break;
                case this.t_unlock3:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this.t_unlock3.data, 99);
                    break;
                default:
                    break;
            }
        }

        private click(evt: InteractiveEvent): void {
            this.selectedTab(evt.target.data);
        }

        // public showLevelUp($num: number = 1): void {
        //     var $obj: msgtip.MsgPicData = new msgtip.MsgPicData
        //     $obj.type = 2; //加载图片
        //     $obj.info = getSuccesspromptUrl(String($num));
        //     var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA)
        //     $MsgTipEvent.data = $obj
        //     ModuleEventManager.dispatchEvent($MsgTipEvent);
        // }
    }

}