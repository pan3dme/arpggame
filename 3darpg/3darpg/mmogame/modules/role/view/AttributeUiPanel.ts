module role {

    export class AttributeUiPanel extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this.roleSprite.destory();
            this.roleSprite = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private roleSprite: Person2DChar;
        private wingDisplay: Person2DChar;
        private a_role: UICompenent
        private a_btn: UICompenent
        private a_name: UICompenent
        private a_force: UICompenent
        private a_pro: UICompenent
        private a_exp: UICompenent
        private a_lev: UICompenent
        private a_profession: FrameCompenent
        private attrary: Array<UICompenent>
        private initView(): void {
            var renderLevel = this._baseRender;

            this.roleSprite = new Person2DChar();
            this._baseRender.addModel(this.roleSprite);


            this.a_role = this.addEvntBut("a_role", this._baseRender);
            this.addUIList(["a_bg", "a_forcebg", "a_probg", "a_txtbg0", "a_levtxt"], this._bgRender);
            this.addUIList(["a_txt0"], this._baseRender);

            var a_namebg = this.addChild(this._bgRender.getComponent("a_namebg"));
            UiDraw.uiAtlasDrawImg(this._bgRender.uiAtlas, a_namebg.skinName, UIData.publicUi, PuiData.TXTBG);

            this.a_btn = this.addEvntButUp("a_btn", this._baseRender);
            this.a_pro = this.addChild(this._baseRender.getComponent("a_pro"));
            this.a_exp = this.addChild(this._baseRender.getComponent("a_exp"));
            this.a_name = this.addChild(this._baseRender.getComponent("a_name"));

            this.a_force = this.addChild(this._baseRender.getComponent("a_force"));
            this.a_lev = this.addChild(this._baseRender.getComponent("a_lev"));

            this.a_profession = <FrameCompenent>this.addChild(this._baseRender.getComponent("a_profession"));

            // this.addUIList(["a_btntxt", "a_info", "a_attrtitle", "t_line2", "t_line2"], this._topRender);

            this.attrary = new Array
            for (var i = 0; i < 11; i++) {
                this.attrary.push(this.addChild(renderLevel.getComponent("a_attr" + i)));
            }
        }


        private _lastMouseX: number = 0;
        private _lastRoleRotatioinY: number = 0;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.roleSprite.rotationY;
            // console.log(this._lastMouseX)

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {
            this.roleSprite.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        }
        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }
        private rotationRole(): void {
            this.roleSprite.rotationY -= 0.5;
        }
        public setAvatar(): void {
            //var $unit: Unit = GameInstance.mainChar.unit;
            //var roleAvatar = $unit.getTabelAvater($unit.getAvatar())
            //this.roleSprite.setAvatar(roleAvatar);
            this.roleSprite.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            this.roleSprite.setBaseRoleWeapon(GuidData.player.getWeapon(), GuidData.player.getCharType());
            this.roleSprite.rotationY = 0
            this.setWing();
        }

        private resizeRole(): void {
            if (this.roleSprite) {
                this.roleSprite.resize();
                this.roleSprite.scale = 5 * UIData.Scale;
                this.roleSprite.rotationY = 0
                this.roleSprite.x = 140 * UIData.Scale;
                this.roleSprite.y = -110 * UIData.Scale;

            }
        }

        public setWing(): void {
            if (!this.wingDisplay) {
                if (GuidData.grow.getWingID()) {
                    this.wingDisplay = new Person2DChar();
                    this.wingDisplay.needUIUrl = false;
                    this._baseRender.addModel(this.wingDisplay);
                    this.wingDisplay.setBind(this.roleSprite, SceneChar.WING_SLOT);
                }
            }
            if (GuidData.grow.getWingID()) {
                this.wingDisplay.setAvatar(GuidData.grow.getWingModel());
            }
        }

        public resize(): void {
            super.resize();
            this.resizeRole();
            if (this.wingDisplay) {
                this.wingDisplay.resize();
                this.wingDisplay.scale = 6.0 * UIData.Scale;
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.showAttr();
            this.setAvatar();
            this.setZhanli();
            this.setRolemsg();
            this.setEXP();
            this.setLev();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public showAttr() {
            UiDraw.drawAttVal(this.attrary[0], 1, GuidData.player.getPropById(1) * 100);
            UiDraw.drawAttVal(this.attrary[1], 2, GuidData.player.getPropById(2) * 100);
            UiDraw.drawAttVal(this.attrary[2], 3, GuidData.player.getAllArmor() * 100);
            UiDraw.drawAttVal(this.attrary[3], 4, GuidData.player.getPropById(4) * 100);
            UiDraw.drawAttVal(this.attrary[4], 5, GuidData.player.getPropById(5) * 100);
            UiDraw.drawAttVal(this.attrary[5], 6, GuidData.player.getPropById(6) * 100);
            UiDraw.drawAttVal(this.attrary[6], 7, GuidData.player.getPropById(7) * 100);
            UiDraw.drawAttVal(this.attrary[7], 20, GuidData.player.getPropById(20) * 100);
            UiDraw.drawAttVal(this.attrary[8], 21, GuidData.player.getPropById(21) * 100);
            UiDraw.drawAttVal(this.attrary[9], 13, GuidData.player.getPropById(13) * 100);
            UiDraw.drawAttVal(this.attrary[10], 14, GuidData.player.getPropById(14) * 100);
        }

        public setEXP() {
            var charlevtab = tb.TB_char_level.get_TB_char_level();
            var str;
            var rare;
            if (charlevtab[charlevtab.length - 1].id <= GuidData.player.getLevel()) {
                str = "等级已达上限";
                rare = 1;
            } else {
                str = GuidData.player.getExp() + "/" + GuidData.player.getMaxExp();
                rare = GuidData.player.getExp() / GuidData.player.getMaxExp();
            }
            this.a_pro.uvScale = rare;
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_exp.skinName, str, 16, TextAlign.CENTER, ColorType.color9f7b4d);
        }

        public setLev() {
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_lev.skinName, String(GuidData.player.getLevel()), 16, TextAlign.LEFT, ColorType.Green2ca937);
        }

        public setZhanli() {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_force.skinName, Snum(GuidData.player.getForce()), ArtFont.num56);
        }

        private KeyCharType = [0, 0, 0, 1, 1, 2, 2];//一种职业有男角色和女角色.索引0无效
        public setRolemsg() {
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_name.skinName, GuidData.player.getBaseName(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.a_profession.goToAndStop(this.KeyCharType[GuidData.player.getCharType()]);
        }


        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                // case this.cnew_btn1:
                //     NetManager.getInstance().protocolos.active_mount();
                //     break;
                case this.a_role:
                    this.A_left_bg_MouseDown(evt)
                    break
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.CHANGE_NAME_EVENT));
                    break
                default:
                    break;
            }
        }
    }
}