module copytask {

    export class waitjoinPanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _publicbgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
        }


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)


            this._bgRender.uiAtlas = new UIAtlas();

            this._frameFun = (t: number) => { this.upTime(t) };
        }
        private _frameFun: Function
        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
                this._publicbgRender.uiAtlas = WindowUi.winUIAtlas
                this._bgRender.uiAtlas.setInfo("ui/uidata/copytask/matejoin.xml", "ui/uidata/copytask/matejoin.png", () => { this.loadConfigCom() });
            // });

        }

        private bg: UICompenent
        private cnew_btn1: UICompenent
        private a_name: UICompenent
        private a_time: UICompenent
        private a_num: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._bgRender.uiAtlas;
            this._midRender.uiAtlas = this._bgRender.uiAtlas;

            this.bg = this.addEvntBut("bg", this._bgRender);
            this.bg.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.addUIList(["a_timetxt", "a_jointxt"], this._midRender);
            this.addChild(this._midRender.getComponent("a_btntxt"));
            this.addChild(this._bottomRender.getComponent("a_bg"));

            this.a_name = this.addChild(this._midRender.getComponent("a_name"));
            this.a_time = this.addChild(this._midRender.getComponent("a_time"));
            this.a_num = this.addChild(this._midRender.getComponent("a_num"));

            this.cnew_btn1 = this.addEvntBut("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", this._midRender);
            this._publicbgRender.applyObjData();
            this.resize();
            this.applyLoadComplete();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.cnew_btn1:
                    NetManager.getInstance().protocolos.kuafu_3v3_cancel_match(this._itdata.type);
                    this.close()
                    NetManager.getInstance().protocolos.instance_exit(0);
                    break;
                case this.bg:
                    break;
                default:
                    break;
            }

        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        private _itdata: s2c_kuafu_match_wait;
        public show($data: s2c_kuafu_match_wait): void {
            this._itdata = $data
            if (!this.hasStage) {
                this._curtime = -1;
                this.lasttime = TimeUtil.getTimer();
                TimeUtil.addFrameTick(this._frameFun);
                UIManager.getInstance().addUIContainer(this);

                if ($data.type == SharedDef.KUAFU_TYPE_GROUP_INSTANCE) {
                    var tab: tb.TB_group_instance_base = tb.TB_group_instance_base.getTempVo($data.data);
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_name.skinName, tab.name, 16, TextAlign.CENTER, ColorType.Yellowf7d253);
                } else if ($data.type == SharedDef.MATCH_TYPE_LOCAL_SINGLE_PVP) {
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_name.skinName, "匹配赛", 16, TextAlign.CENTER, ColorType.Yellowf7d253);
                }
            }

            var str = $data.type == SharedDef.KUAFU_TYPE_GROUP_INSTANCE ? "(" + $data.count + "/" + $data.target + ")" : "...";
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_num.skinName, str, 14, TextAlign.LEFT, ColorType.Yellowffecc6);
        }

        public resize(): void {
            this.bg.top = 0
            this.bg.left = 0
            this.bg.y = 0;
            this.bg.x = 0;
            this.bg.height = Scene_data.stageHeight / UIData.Scale;
            this.bg.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }


        private lasttime: number;
        private _curtime: number;
        private upTime(t): void {

            var $time: number = Math.floor((TimeUtil.getTimer() - this.lasttime) / 1000);

            if (this._curtime != $time) {
                this._curtime = $time;
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_time.skinName, getScencdStr(this._curtime), 16, TextAlign.LEFT, ColorType.Yellowffecc6);
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
            }

        }

    }
}