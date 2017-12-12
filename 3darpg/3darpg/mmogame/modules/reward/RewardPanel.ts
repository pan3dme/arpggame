module reward {

    export class RewardPanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this._baseRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/reward/reward.xml", "ui/uidata/reward/reward.png", () => { this.loadConfigCom() });
        }
        protected uiAtlasComplet: boolean = false;
        private a_bg: UICompenent
        private b_close: UICompenent

        private loadConfigCom(): void {


            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;

            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.b_close = this.addEvntBut("b_close", this._topRender);

            this.addChild(<UICompenent>this._baseRender.getComponent("a_win_bg"));
            this.addChild(<UICompenent>this._topRender.getComponent("a_line"));
            this.addChild(<UICompenent>this._topRender.getComponent("a_tittle_txt"));


            this.iconList = new Array
            for (var i: number = 0; i < 8; i++) {
                this.iconList.push(this.addChild(<UICompenent>this._topRender.getComponent("b_icon" + i)))
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh()
            this.resize()
        }
        protected iconList: Array<UICompenent>
        public resize(): void {
            if (this.a_bg) {
                this.a_bg.top = 0;
                this.a_bg.left = 0;
                this.a_bg.width = Scene_data.stageWidth / UIData.Scale
                this.a_bg.height = Scene_data.stageHeight / UIData.Scale
            }

            super.resize()
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target.name) {
                case "a_bg":
                    break
                case "b_close":
                    this.close();
                    break
                default:
                    break;
            }

        }
        public rewardVo: s2c_sweep_instance_reward
        public refresh(): void {
            if (this.uiAtlasComplet) {
                for (var i: number = 0; i < this.iconList.length; i++) {
                    var $ui: UICompenent = this.iconList[i]
                    if (this.rewardVo.list[i]) {
                        //this.drawRewardIconCtx($ui, this.rewardVo.list[i].item_id, this.rewardVo.list[i].num)
                        IconManager.getInstance().drawItemIcon60($ui,this.rewardVo.list[i].item_id,this.rewardVo.list[i].num);
                    }else{
                        IconManager.getInstance().drawItemIcon60($ui,0,0);
                    }
                }
            }
        }
        // protected drawRewardIconCtx($ui: UICompenent, $id: number, $num: number): void {
        //     var $key: string = $ui.skinName
        //     IconManager.getInstance().getIcon(GameData.getIconCopyUrl($id),
        //         ($img: any) => {
        //             var $skillrec: UIRectangle = this._baseRender.uiAtlas.getRec($key);
        //             var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
        //             UiDraw.cxtDrawImg($ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 60, 60), UIData.publicUi);
        //             $ctx.drawImage($img, 2, 2, 56, 56);
        //             ArtFont.getInstance().writeFontToCtxRight($ctx, String($num), ArtFont.num1, 58, 40)
        //             this._baseRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
        //         });
        // }
        public close(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }


}