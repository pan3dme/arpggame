module newbieguide {
    export class Systemtrailer extends UIPanel {

        public _bgRender: UIRenderComponent;
        public _bottomRender: UIRenderComponent;
        public _baseRender: UIRenderComponent;
        public _topRender: UIRenderComponent;
        private _bigPic: UIRenderOnlyPicComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this.layer=300

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new AlphaUIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
        }

        public applyLoad(): void {
            this._baseRender.setInfo("ui/uidata/poptimeout/systemtrailer.xml", "ui/uidata/poptimeout/systemtrailer.png", () => { this.loadConfigCom() });
        }


        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas
            this._topRender.uiAtlas = this._baseRender.uiAtlas
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas
            this._bigPic.uiAtlas = this._baseRender.uiAtlas
            this.initUI();
            this.resize();
            this.applyLoadComplete();
        }

        // private b_basebg: UICompenent
        private b_close: UICompenent
        private b_unlock: UICompenent
        private b_btn: UICompenent
        private b_info: UICompenent
        private b_titlename: FrameCompenent
        private initUI(): void {
            var renderLevel: UIRenderComponent = this._baseRender
            // this.b_basebg = this.addChild(this._bgRender.getComponent("b_basebg"));
            // this.b_basebg.addEventListener(InteractiveEvent.Down, () => { }, this);
            // this.b_basebg.addEventListener(InteractiveEvent.Up, () => { }, this);

            this.addChild(this._bottomRender.getComponent("b_bg"));
            this.addChild(renderLevel.getComponent("b_infobg"));

            this.b_titlename = <FrameCompenent>this.addChild(this._topRender.getComponent("b_titlename"));
            this.b_close = this.addEvntButUp("b_close", renderLevel);

            this.b_info = this.addChild(this._topRender.getComponent("b_info"));
            this.b_unlock = this.addChild(renderLevel.getComponent("b_unlock"));
            this.b_btn = this.addEvntButUp("b_btn", renderLevel);

            this.addChild(this._bigPic.getComponent("ccav"));
        }


        private curvo: tb.TB_system_preview
        public show($data: number) {
            UIManager.getInstance().addUIContainer(this);
            var tab: tb.TB_system_preview = tb.TB_system_preview.getTempVo($data);
            this.curvo = tab;
            this.b_titlename.goToAndStop(tab.type2 - 1);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_info.skinName, tab.info, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            var syslevtab:tb.TB_system_base = tb.TB_system_base.getTempVo(tab.system_id[0] * 10 + tab.system_id[1]);
            var flag: boolean = syslevtab.level <= GuidData.player.getLevel();
            this.setUiListVisibleByItem([this.b_btn], flag);
            var str: string = syslevtab.level + "级开启" + tab.name;
            if (flag) {
                str = "";
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_unlock.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this._bigPic.setImgUrl("ui/load/systrailer/" + tab.type2 + ".png");

            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }

        public resize(): void {
            // if (this.b_basebg) {
            //     this.b_basebg.top = 0
            //     this.b_basebg.left = 0
            //     this.b_basebg.y = 0;
            //     this.b_basebg.x = 0;
            //     this.b_basebg.height = Scene_data.stageHeight / UIData.Scale;
            //     this.b_basebg.width = Scene_data.stageWidth / UIData.Scale;
            // }
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_close:
                    this.hide();
                    break;
                case this.b_btn:
                    this.hide();
                    ModulePageManager.openPanel(this.curvo.system_id[0], this.curvo.system_id.slice(1, this.curvo.system_id.length));
                    break;

                default:
                    break;
            }
        }
    }
}