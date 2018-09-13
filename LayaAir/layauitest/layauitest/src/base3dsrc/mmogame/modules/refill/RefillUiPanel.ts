module refill {

    export class RefillUiPanel extends UIPanel {
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _baImg: UIBackImg;
        private _bigPic: UIRenderComponent;


        public dispose(): void {
            this._bigPic.dispose();
            this._bigPic = null;
            this._baImg.dispose();
            this._baImg = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this.weaponRoleSprite.destory();
            this.weaponRoleSprite = null;
            this.roleSprite.destory();
            this.roleSprite = null;
            this.weaponRoleBgSprite.destory();
            this.weaponRoleBgSprite = null;
            this.roleBgSprite.destory();
            this.roleBgSprite = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baImg = new UIBackImg();
            this._baImg.alpha = 0.5;
            this._baImg.setFbo();
            this.addRender(this._baImg);

            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public onAdd(): void {
            super.onAdd();
            SceneManager.getInstance().updateFBO();
        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/refill/refill.xml", "ui/uidata/refill/refill.png", () => { this.loadConfigCom() });
        }

        private b_close: UICompenent
        private a_refillbtn: UICompenent
        private iconAry: Array<UICompenent>
        private forceAry: Array<UICompenent>
        private roleSprite: Person2DChar;
        private weaponRoleSprite: Person2DChar;
        private roleBgSprite: Person2DChar;
        private weaponRoleBgSprite: Person2DChar;
        private loadConfigCom(): void {
            this._bigPic.uiAtlas = this._baseRender.uiAtlas
            this._topRender.uiAtlas = this._baseRender.uiAtlas

            var renderLevel: UIRenderComponent = this._baseRender;

            //大背景
            this.addChild(this._bigPic.getComponent("basebg"));
            this._bigPic.setImgUrl("ui/uidata/refill/basebg.png");

            this.addUIList(["a_forcebg0", "a_forcebg1"], this._baseRender);
            this.addUIList(["a_info0", "a_info1"], this._topRender);

            this.a_refillbtn = this.addEvntButUp("a_refillbtn", this._baseRender);
            this.b_close = this.addEvntButUp("a_closebtn", this._topRender);

            this.iconAry = new Array
            this.forceAry = new Array
            for (let i = 0; i < 4; i++) {
                if (i < 2) {
                    this.forceAry.push(this.addChild(this._topRender.getComponent("a_force" + i)));
                }
                this.iconAry.push(this.addChild(this._topRender.getComponent("a_icon" + i)));
            }

            this.weaponRoleSprite = new Person2DChar();
            this.weaponRoleSprite.uishow = true;
            // this.mountRoleSprite.needUIUrl = false;
            this._baseRender.addModel(this.weaponRoleSprite);

            this.roleSprite = new Person2DChar();
            // this.roleSprite.needUIUrl = false;
            this._baseRender.addModel(this.roleSprite);

            this.roleBgSprite = new Person2DChar();
            // this.roleSprite.needUIUrl = false;
            this._baseRender.addModel(this.roleBgSprite);

            this.weaponRoleBgSprite = new Person2DChar();
            // this.roleSprite.needUIUrl = false;
            this._baseRender.addModel(this.weaponRoleBgSprite);


            this.resize();

            this.applyLoadComplete();
        }

        public resetData() {
            var $obj = TableData.getInstance().getData(TableData.tb_recharge_first_reward, GuidData.player.getCharType());
            var $ary: Array<Array<number>> = $obj["reward"]
            for (let i = 0; i < $ary.length; i++) {
                IconManager.getInstance().drawItemIcon60(this.iconAry[i], $ary[i][0], $ary[i][1]);
            }

            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.forceAry[0].skinName, Snum($obj["weapon_force"]), ArtFont.num56, TextAlign.LEFT);
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.forceAry[1].skinName, Snum($obj["avatar_force"]), ArtFont.num56, TextAlign.LEFT);

            this.weaponRoleSprite.showAvatarVisibel = false;
            this.weaponRoleSprite.setAvatar(6302);
            this.weaponRoleSprite.setWeaponByAvatar($obj["weapon"]);

            this.roleSprite.showAvatarVisibel = true;
            this.roleSprite.setAvatar($obj["avatar"]);

            this.weaponRoleBgSprite.showAvatarVisibel = false;
            this.weaponRoleBgSprite.setAvatar(6310);
            // this.weaponRoleBgSprite.setWeaponByAvatar($obj["weapon"]);

            this.roleBgSprite.showAvatarVisibel = false;
            this.roleBgSprite.setAvatar(6310);
            // this.roleSprite.setWeapon(0);
            this.resize();
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        }

        private resizeRole(): void {
            if (this.weaponRoleSprite) {
                this.weaponRoleSprite.resize();
                this.weaponRoleSprite.scale = 4 * UIData.Scale;
                // this.weaponRoleSprite.rotationX = 45
                // this.weaponRoleSprite.rotationX = 80
                this.weaponRoleSprite.y = -20 * UIData.Scale;
                this.weaponRoleSprite.x = 190 * UIData.Scale;
            }
            if (this.roleSprite) {
                this.roleSprite.resize();
                this.roleSprite.scale = 4 * UIData.Scale;
                // this.roleSprite.rotationY = 0
                this.roleSprite.y = -90 * UIData.Scale;
                this.roleSprite.x = -190 * UIData.Scale;
            }
            if (this.roleBgSprite) {
                this.roleBgSprite.resize();
                this.roleBgSprite.scale = 4 * UIData.Scale;
                // this.roleSprite.rotationY = 0
                this.roleBgSprite.y = -90 * UIData.Scale;
                this.roleBgSprite.x = -190 * UIData.Scale;
            }
            if (this.weaponRoleBgSprite) {
                this.weaponRoleBgSprite.resize();
                this.weaponRoleBgSprite.scale = 4 * UIData.Scale;
                // this.roleSprite.rotationY = 0
                this.weaponRoleBgSprite.y = -90 * UIData.Scale;
                this.weaponRoleBgSprite.x = 190 * UIData.Scale;
            }
        }

        public resize(): void {
            this.resizeRole()
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_close:
                    ModuleEventManager.dispatchEvent(new RefillEvent(RefillEvent.HIDE_Refill_EVENT));
                    break
                case this.a_refillbtn:
                    ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_RECHARGE]);
                    break

                default:
                    break;
            }
        }
    }
}