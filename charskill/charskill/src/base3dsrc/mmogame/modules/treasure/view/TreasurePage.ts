module treasure {
    export class TreasurePage extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;

            this.mountRoleSprite.destory();
            this.mountRoleSprite = null;
            
            if (this.treasureRightPanel) {
                this.treasureRightPanel.dispose();
                this.treasureRightPanel = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
        }

        public initUiAtlas($uiAtlas, $winRender: UIRenderComponent): void {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._publicRender = $winRender;
            this.initView();
        }

        private a_listindex: UICompenent
        private a_zhanli_all: UICompenent
        private mountRoleSprite: Person2DChar;
        private pubbg:Array<UICompenent>;
        private initView(): void {
            this.addChild(this._bgRender.getComponent("t_bg"));

            this.addChild(this._bgRender.getComponent("a_zhanlinum"));
            this.addChild(this._bgRender.getComponent("e_linev"));

            this.pubbg = new Array
            var cnew_bg_yellow = this.addChild(this._publicRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._baseRender);
            this.pubbg.push(cnew_bg_yellow);

            this.a_zhanli_all = this.addChild(this._baseRender.getComponent("a_zhanli_all"));

            var cnew_right_bg_top = this.addChild(this._publicRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            this.pubbg.push(cnew_right_bg_top);

            var cnew_right_bg_bottom = this.addChild(this._publicRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);
            this.pubbg.push(cnew_right_bg_bottom);
            this._publicRender.applyObjData();


            this.mountRoleSprite = new Person2DChar();
            this.mountRoleSprite.needUIUrl = false;

            // this.mountRoleSprite .showAvatarVisibel=false
            // this.mountRoleSprite.setAvatar(6013);
            this._baseRender.addModel(this.mountRoleSprite);
        }

        public setZhanli() {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_zhanli_all.skinName, String(GuidData.player.gettalismantotalzhanli()), ArtFont.num56)
        }

        public setAvatar($num: number, $name: string, $value: number): void {
            // //console.log($num);
            this.mountRoleSprite.setAvatar($num)
        }

        private resizeRole(): void {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 3 * UIData.Scale;
                //this.mountRoleSprite.rotationY = 45
                this.mountRoleSprite.x = 10 * UIData.Scale;
                this.mountRoleSprite.y = -50 * UIData.Scale;
            }
        }

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            this.resizeRole();
            super.resize();
        }

        public treasureRightPanel: TreasureRightPanel;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.treasureRightPanel) {
                this.treasureRightPanel = new TreasureRightPanel();
                this.treasureRightPanel.initUiAtlas(this._baseRender.uiAtlas, this._publicRender.uiAtlas);
                this.treasureRightPanel.parent = this;
            }
            this.treasureRightPanel.show();
            this.setZhanli();
            this.setUiListVisibleByItem(this.pubbg,true);
            this.resize();
        }

        public hide(): void {
            if (this.treasureRightPanel) {
                this.treasureRightPanel.hide();
            }
            this.setUiListVisibleByItem(this.pubbg,false);
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}