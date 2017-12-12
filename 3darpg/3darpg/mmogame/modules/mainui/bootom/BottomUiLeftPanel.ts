module bottomui {

    export class BottomUiLeftPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.left = 0;
            this.bottom = 0;

        }
        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        }
        private b_yaogan_bg: UICompenent;
        private b_yaogan_bar: UICompenent;
        private b_qichen: UICompenent
        private loadConfigCom(): void {

            this.b_yaogan_bg = <UICompenent>this.addChild(this._bottomRender.getComponent("b_yaogan_bg"));
            this.b_yaogan_bar = <UICompenent>this.addChild(this._midRender.getComponent("b_yaogan_bar"));
            this.b_qichen = <UICompenent>this.addEvntBut("b_qichen", this._bottomRender);
            GameMouseManager.getInstance().setBtn(this.b_yaogan_bar, this.b_yaogan_bg);
        }
        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.b_qichen:
                    if (GuidData.grow.getMountLevel() == 0) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "坐骑未激活", 99);
                        return;
                    }
                    AotuSkillManager.getInstance().aotuBattle = false
                    NetManager.getInstance().protocolos.ride_mount();
                    UiTweenScale.getInstance().changeButSize(evt.target)
                    UIManager.popClikNameFun("f_qichen");
                    break
                default:
                    break;

            }
        }
        public refresh(): void
        {


            this.setUiListVisibleByItem([this.b_qichen], GuidData.grow.getMountLevel()>0)

        }

    }
}