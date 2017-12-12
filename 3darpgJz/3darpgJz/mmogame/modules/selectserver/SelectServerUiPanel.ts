module selectserver {

    export class SelectServerUiPanel extends UIPanel {
        private _bgRender: UIRenderComponent;
        private _middleRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _baImg: UIBackImg;

        public dispose(): void {
            this._baImg.dispose();
            this._baImg = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._middleRender.dispose();
            this._middleRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if(this.ssgonggao){
                this.ssgonggao.dispose();
                this.ssgonggao = null;
            }
            if(this.ssxuanfu){
                this.ssxuanfu.dispose();
                this.ssxuanfu = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baImg = new UIBackImg();
            this._baImg.alpha = 0.5;
            this._baImg.setImgInfo("ui/load/001.jpg", 1024, 512);
            this.addRender(this._baImg);


            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._middleRender = new UIRenderComponent;
            this.addRender(this._middleRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/selectserver/selectserver.xml", "ui/uidata/selectserver/selectserver.png", () => { this.loadConfigCom() }, "ui/uidata/selectserver/selectserverpc.png");
        }

        private t_but: UICompenent
        private loadConfigCom(): void {

            this._topRender.uiAtlas = this._baseRender.uiAtlas
            this._bgRender.uiAtlas = this._baseRender.uiAtlas
            this._middleRender.uiAtlas = this._baseRender.uiAtlas

            var renderLevel: UIRenderComponent = this._baseRender;

            
            this.addChild(this._topRender.getComponent("t_1"));


            var t_titlebg1 = this.addChild(this._middleRender.getComponent("t_titlebg1"));
            t_titlebg1.isU = true;
            var t_leftline1 = this.addChild(this._middleRender.getComponent("t_leftline1"));
            t_leftline1.isU = true;
            var t_angel1 = this.addChild(this._middleRender.getComponent("t_angel1"));
            t_angel1.isU = true;
            var t_towel1 = this.addChild(renderLevel.getComponent("t_towel1"));
            t_towel1.isU = true;

            this.addChild(this._bgRender.getComponent("t_leaf2_2"));
            this.addChild(this._bgRender.getComponent("t_leaf3_1"));

            this.addChild(this._bgRender.getComponent("t_bg"));

            this.addChild(this._middleRender.getComponent("t_titlebg"));
            this.addChild(this._middleRender.getComponent("t_leftline"));
            this.addChild(this._middleRender.getComponent("t_angel"));
            this.addChild(this._middleRender.getComponent("t_bottomline"));
            this.addChild(renderLevel.getComponent("t_towel"));


            this.addChild(this._topRender.getComponent("t_leaf2_1"));
            this.addChild(this._topRender.getComponent("t_leaf1_0"));
            this.addChild(this._topRender.getComponent("t_leaf2_0"));
            this.addChild(this._topRender.getComponent("t_leaf3_0"));

            this.t_but = this.addEvntButUp("t_but", this._topRender);
            this.resize();
            LoadManager.getInstance().load("xuanfu.txt", LoadManager.XML_TYPE, ($str: string) => {
                var obj: Object = JSON.parse($str);
                SelectServerModel.getInstance().convertObj(obj);
                this.applyLoadComplete();
                // console.log("--公告---", obj["aaa"]);
            });
        }


        public ssgonggao: Ssgonggao
        public showgg(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.ssgonggao) {
                this.ssgonggao = new Ssgonggao();
                this.ssgonggao.initUiAtlas(this._baseRender.uiAtlas);
            }
            this.ssgonggao.show();
        }
        public hidegg(): void {
            if (this.ssgonggao) {
                this.ssgonggao.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        }

        public ssxuanfu: Ssxuanfu
        public showss(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.ssxuanfu) {
                this.ssxuanfu = new Ssxuanfu();
                this.ssxuanfu.initUiAtlas(this._baseRender.uiAtlas);
            }
            this.ssxuanfu.show();
        }
        public hidess(): void {
            if (this.ssxuanfu) {
                this.ssxuanfu.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
        }


        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.t_but:
                    if(this.ssxuanfu && this.ssxuanfu.hasStage){
                        this.hidess();
                        ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
                    }
                    if(this.ssgonggao && this.ssgonggao.hasStage){
                        this.hidegg();
                    }
                    break

                default:
                    break;
            }
        }
    }
}