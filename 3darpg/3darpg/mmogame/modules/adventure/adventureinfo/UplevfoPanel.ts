module adventureinfo {

    export class UplevfoPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._midRender.uiAtlas = new UIAtlas;

            this.interfaceUI = true;
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/uplev/uplev.xml", "ui/uidata/adventure/uplev/uplev.png", () => { this.loadConfigCom() });
        }


        private a_time: UICompenent
        private tickFun: Function;
        private _attrary: Array<UICompenent>
        private _nextattrary: Array<UICompenent>
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(this._bottomRender.getComponent("a_bg"));
            this.a_time = this.addChild(this._midRender.getComponent("a_time"));

            this._attrary = new Array
            this._nextattrary = new Array
            for (var i = 0; i < 3; i++) {
                this._attrary.push(this.addChild(this._midRender.getComponent("a_attr" + i)));
                this._nextattrary.push(this.addChild(this._midRender.getComponent("a_nextattr" + i)));
            }

            this.tickFun = (t: number) => { this.update(t) }

            this.applyLoadComplete();
        }

        public show() {
            UIManager.getInstance().addUIContainer(this);
            this._curtime = -1;
            this.endTime = TimeUtil.getTimer() + 6 * 1000;//未来时间
            TimeUtil.addFrameTick(this.tickFun);

            var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();
            var exp: number = $tb.expReward[1] * 360
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._nextattrary[0].skinName, exp + "/小时 ", 16, TextAlign.CENTER, ColorType.Green54db36, ColorType.colord27262e);

            var gold: number = $tb.goldReward[1] * 360
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._nextattrary[1].skinName, gold + "/小时 ", 16, TextAlign.CENTER, ColorType.Green54db36, ColorType.colord27262e);

            var equipnum: number = Math.ceil($tb.suitScore * 360 / $tb.suitScoreChange)
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._nextattrary[2].skinName, equipnum + "件/小时", 16, TextAlign.CENTER, ColorType.Green54db36, ColorType.colord27262e);

            var $lasttb: tb.TB_risk_data = tb.TB_risk_data.get_TB_risk_data($tb.parentid);
            var lastexp: number = $lasttb.expReward[1] * 360
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._attrary[0].skinName, lastexp + "/小时 ", 16, TextAlign.CENTER, ColorType.Whitefff7db, ColorType.colord27262e);

            var lastgold: number = $lasttb.goldReward[1] * 360
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._attrary[1].skinName, lastgold + "/小时 ", 16, TextAlign.CENTER, ColorType.Whitefff7db, ColorType.colord27262e);

            var lastequipnum: number = Math.ceil($lasttb.suitScore * 360 / $lasttb.suitScoreChange)
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this._attrary[2].skinName, lastequipnum + "件/小时", 16, TextAlign.CENTER, ColorType.Whitefff7db, ColorType.colord27262e);
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }

        private endTime: number = 0;
        private lastTxtNum: number = 0;
        private _curtime: number;
        private update(t: number): void {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.tickFun);
            } else {
                var $time: number = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000)
                if ($time <= -1) {
                    this.hide()
                } else if ($time >= 0 && this.lastTxtNum != $time) {
                    this.lastTxtNum = $time
                    console.log($time)
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_time.skinName, ColorType.Whitefff7db + getScencdStr($time) + "秒后自动关闭", 14, TextAlign.CENTER);
                }
            }
        }



    }
}