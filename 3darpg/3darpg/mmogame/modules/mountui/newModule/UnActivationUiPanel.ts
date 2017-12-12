module mountui {

    export class UnActivationUiPanel extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private cnew_btn1: UICompenent
        private attrary: Array<UICompenent>
        private initView(): void {
            var renderLevel = this._baseRender;

            this.addUIList([ "t_titlebg"], renderLevel);
            this.addUIList(["a_btntxt", "a_info", "a_attrtitle", "t_line2","t_line2"], this._topRender);

            this.attrary = new Array
            for (var i = 0; i < 8; i++) {
                this.attrary.push(this.addChild(renderLevel.getComponent("a_attr" + i)));
            }

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this._publicRender.applyObjData();

        }

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.showAttr();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        private _vo:MountLevAttribute;
        public showAttr(): void {
            this._vo = NewMountModel.getInstance().getOrderAttribute();
            //绘制当前属性
            for (var i = 0; i < this.attrary.length; i++) {
                if (this._vo.curtab.prosKeys.length - 1 < i) {
                    this.setUiListVisibleByItem([this.attrary[i]], false);
                } else {
                    UiDraw.drawAttValAdd(this.attrary[i], this._vo.curtab.prosKeys[i], this._vo.curtab.prosValues[i]);
                }
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.cnew_btn1:
                    UIManager.popClikNameFun("cnew_btn1");
                    NetManager.getInstance().protocolos.active_mount();
                    break;
                default:
                    break;
            }
        }
    }
}