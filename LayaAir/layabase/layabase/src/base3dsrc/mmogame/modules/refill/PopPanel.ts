module refill {

    export class PopPanel extends UIPanel {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;

            this.weaponRoleSprite.destory();
            this.weaponRoleSprite = null;

            super.dispose();
        }


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.top = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)

            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/refill/pop.xml", "ui/uidata/refill/pop.png", () => { this.loadConfigCom() });
        }

        private a_close: UICompenent
        private a_btn: UICompenent
        private a_force: UICompenent
        private a_basebg: UICompenent
        private weaponRoleSprite: Person2DChar;
        private _updateFun: Function;
        private loadConfigCom(): void {

            this._baseRender.uiAtlas = this._bgRender.uiAtlas;

            this.a_basebg = this.addChild(this._bgRender.getComponent("a_basebg"));
            this.a_basebg.addEventListener(InteractiveEvent.Up, ()=>{}, this);
            this.a_basebg.addEventListener(InteractiveEvent.Down, ()=>{}, this);
            this.a_force = this.addChild(this._baseRender.getComponent("a_force"));
            this.a_close = this.addEvntButUp("a_close", this._baseRender);
            this.a_btn = this.addEvntButUp("a_btn", this._baseRender);

            this.weaponRoleSprite = new Person2DChar();
            this._baseRender.addModel(this.weaponRoleSprite);

            this.layer = 250

            this._updateFun = () => {
                this.hide();
            }

            this.applyLoadComplete();
        }


        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_close:
                    this.hide();
                    break
                case this.a_btn:
                    this.hide();
                    ModulePageManager.openPanel(SharedDef.MODULE_FIRST_RECHARGE);
                    break
                default:
                    break;
            }
        }

        public show($data: topui.TopIconVo): void {
            UIManager.getInstance().addUIContainer(this);
            var $obj = TableData.getInstance().getData(TableData.tb_recharge_first_reward, GuidData.player.getCharType());
            this.weaponRoleSprite.showAvatarVisibel = false;
            this.weaponRoleSprite.uishow = true;
            this.weaponRoleSprite.setAvatar(6309);
            this.weaponRoleSprite.setWeaponByAvatar($obj["weapon"]);

            ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_force.skinName, Snum($obj["weapon_force"]), ArtFont.num56, TextAlign.LEFT);
            this.a_basebg.x = $data.ui.x - 104
            this.a_basebg.y = $data.ui.y + 62

            this.selectUi = $data.ui
            this.resizepos();
            this.resize();
            TimeUtil.addTimeOut(5 * 1000, this._updateFun);
        }
        private selectUi: UICompenent
        private resizepos() {
            this.a_close.x = 160 + this.a_basebg.x
            this.a_close.y = 38 + this.a_basebg.y
            this.a_force.x = 73 + this.a_basebg.x
            this.a_force.y = 218 + this.a_basebg.y
            this.a_btn.x = 48 + this.a_basebg.x
            this.a_btn.y = 246 + this.a_basebg.y

        }

        public resize(): void {
            this.resizeRole()
            super.resize();
        }

        private resizeRole(): void {
            if (this.weaponRoleSprite) {
                this.weaponRoleSprite.scale = 2.3 * UIData.Scale;
                this.weaponRoleSprite.y = 0
                this.weaponRoleSprite.x = 0
                if (this.selectUi) {
                    this.weaponRoleSprite.trueMove.x = (this.selectUi.absoluteX) / Scene_data.stageWidth;
                    this.weaponRoleSprite.trueMove.y = (this.selectUi.absoluteY + 210 * UIData.Scale) / Scene_data.stageHeight;
                }
                this.weaponRoleSprite.resize();
            }
        }

        public hide() {
            if (this._updateFun) {
                TimeUtil.removeTimeOut(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}