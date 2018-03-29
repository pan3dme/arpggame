module ranking {

    export class RankReward extends WindowCentenMin {

        private _baseRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            super.dispose();
        }


        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)


            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/window/windowrank.xml", "ui/uidata/window/windowrank.png", () => { this.loadConfigCom() });
        }

        private _rewardAry: Array<UICompenent>
        private loadConfigCom(): void {

            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;

            this.addUIList(["b_title", "b_line2", "b_line1", "b_line", "b_bg2", "b_bg1"], this._bgRender);
            this.addUIList(["b_info", "b_rank3", "b_rank2", "b_rank1", "b_titlebg1", "b_titlebg2", "b_titlebg3", "b_1", "b_2"], this._baseRender);

            this._rewardAry = new Array
            for (var i = 0; i < 3; i++) {
                this._rewardAry.push(this.addChild(this._midRender.getComponent("b_reward" + i)));
            }
            this.resize();
            this.applyLoadComplete();
        }

        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_close:
                    UIManager.getInstance().removeUIContainer(this);
                    break
                default:
                    break;
            }
        }

        public show($type: number): void {
            UIManager.getInstance().addUIContainer(this);
            for (var i = 0; i < 3; i++) {
                var tabrankreward = tb.Tb_rank_reward.getTempByID($type,(i+1));
                this._midRender.uiAtlas.upDataPicToTexture(getUItittleUrl(String(tabrankreward.title)),this._rewardAry[i].skinName);
            }
        }
    }
}