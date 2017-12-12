module treasure {

    export class TreasureUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _publicbguiRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        public treasureRightPanel: TreasureRightPanel;
        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;

            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;
            
            if (this.treasureRightPanel) {
                this.treasureRightPanel.dispose();
                this.treasureRightPanel = null;
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
            this._publicbguiRender = new UIRenderComponent;
            this.addRender(this._publicbguiRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)

            this._roleRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/treasure/TreasureUi.xml", "ui/uidata/treasure/TreasureUi.png", () => { this.loadConfigCom() });
            // });
        }

        private mountRoleSprite: Person2DChar;
        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;

            this.initData();
            this.resize();
            this.applyLoadComplete();
        }

        private a_ro_bg: UICompenent
        private a_listindex: UICompenent
        private a_zhanli_all: UICompenent
        private initData(): void {
            //添加UI控件初始化
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;

            this.addChild(this._bgRender.getComponent("t_bg"));

            this.a_ro_bg = this.addEvntBut("a_ro_bg", this._roleRender);
            this.addChild(this._bgRender.getComponent("a_zhanlinum"));
            this.addChild(this._bgRender.getComponent("a_title"));

            var cnew_bg_yellow = this.addChild(this.winmidRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._roleRender);

            this.a_zhanli_all = this.addChild(this._roleRender.getComponent("a_zhanli_all"));


            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._roleRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._roleRender);
            this.winmidRender.applyObjData();


            this.mountRoleSprite = new Person2DChar();
            this.mountRoleSprite.needUIUrl = false;

            // this.mountRoleSprite .showAvatarVisibel=false
            // this.mountRoleSprite.setAvatar(6013);
            this._roleRender.addModel(this.mountRoleSprite);
        }

        public setAvatar($num: number, $name: string, $value: number): void {
            // console.log($num);
            this.mountRoleSprite.setAvatar($num)
        }

        private resizeRole(): void {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 4 * UIData.Scale;
                //this.mountRoleSprite.rotationY = 45
                this.mountRoleSprite.x = -10 * UIData.Scale;
                this.mountRoleSprite.y = -90 * UIData.Scale;
            }
        }

        public resize(): void {
            this.resizeRole();
            super.resize();
        }

        public setZhanli() {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._roleRender.uiAtlas, this.a_zhanli_all.skinName, String(GuidData.player.gettalismantotalzhanli()), ArtFont.num56)
        }

        public show($type: number = 0): void {
            if (!$type) {
                $type = 0
            }
            UIManager.getInstance().addUIContainer(this);

            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.treasureRightPanel) {
                this.treasureRightPanel = new TreasureRightPanel();
                this.treasureRightPanel.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                this.treasureRightPanel.parent = this;
            }
            this.treasureRightPanel.show();
            this.setZhanli();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.treasureRightPanel) {
                this.treasureRightPanel.hide();
            }
            ModulePageManager.hideResTittle();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_ro_bg:
                    // this.A_left_bg_MouseDown(evt)
                    break
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.HIDE_TREASURE_EVENT));
                    break;
                default:
                    break;
            }
        }
    }
}