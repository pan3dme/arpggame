module selectserver {

    export class JoinGameUiPanel extends UIPanel {
        private _bgRender: UIRenderComponent;
        private _middleRender: UIRenderComponent;
        // private _baseRender: UIRenderComponent;
        // private _topRender: UIRenderComponent;
        private _baImg: UIBackImg;

        public dispose(): void {
            this._baImg.dispose();
            this._baImg = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._middleRender.dispose();
            this._middleRender = null;
            // this._baseRender.dispose();
            // this._baseRender = null;
            // this._topRender.dispose();
            // this._topRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baImg = new UIBackImg();
            this._baImg.setImgInfo("ui/load/goplay.png", 1024, 512);
            this.addRender(this._baImg);


            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._middleRender = new UIRenderComponent;
            this.addRender(this._middleRender)
            // this._baseRender = new UIRenderComponent;
            // this.addRender(this._baseRender)
            // this._topRender = new UIRenderComponent;
            // this.addRender(this._topRender)

            this._bgRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/selectserver/goplay.xml", "ui/uidata/selectserver/goplay.png", () => { this.loadConfigCom() }, "ui/uidata/selectserver/selectserverpc.png");
        }

        private a_gg: UICompenent
        private a_bg: UICompenent
        private a_enter: UICompenent
        private a_state: UICompenent
        private a_serverid: UICompenent
        private a_servername: UICompenent
        private loadConfigCom(): void {

            // this._topRender.uiAtlas = this._baseRender.uiAtlas
            // this._bgRender.uiAtlas = this._baseRender.uiAtlas
            this._middleRender.uiAtlas = this._bgRender.uiAtlas

            var renderLevel: UIRenderComponent = this._middleRender;

            this.a_gg = this.addEvntButUp("a_gg", renderLevel);
            this.a_bg = this.addEvntButUp("a_bg", this._bgRender);
            this.a_enter = this.addEvntButUp("a_enter", renderLevel);

            this.a_state = this.addChild(renderLevel.getComponent("a_state"));
            this.a_serverid = this.addChild(renderLevel.getComponent("a_serverid"));
            this.a_servername = this.addChild(renderLevel.getComponent("a_servername"));

            this.resize();
            LoadManager.getInstance().load("xuanfu.txt", LoadManager.XML_TYPE, ($str: string) => {
                var obj: Object = JSON.parse($str);
                SelectServerModel.getInstance().convertObj(obj);
                this.applyLoadComplete();
                // console.log("--公告---", obj["aaa"]);
            });
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public resetData() {
            var curvo = SelectServerModel.getInstance().getCurVo();

            var statestr: string = SelectServerModel.getInstance().StateKey[curvo.state]
            UiDraw.SharedDrawImg(this._bgRender.uiAtlas, this._bgRender.uiAtlas, this.a_state.skinName, statestr);

            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_serverid.skinName, curvo.id + "服", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_servername.skinName, curvo.name, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
        }

        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_enter:
                    ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.HIDE_JOINGAME_EVENT));
                    break
                case this.a_bg:
                    this.hide();
                    ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.OPEN_SELECTSERVER_EVENT));
                    break
                case this.a_gg:
                    ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.OPEN_GG_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}