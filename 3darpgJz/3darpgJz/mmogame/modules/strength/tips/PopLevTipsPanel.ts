module strengthgem {

    export class PopLevTipsPanel extends WindowCentenMin {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
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

            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/streng/tips.xml", "ui/uidata/streng/tips.png", () => { this.loadConfigCom() });
        }

        private c_info: FrameCompenent
        private c_lev: UICompenent
        private AttrCurAry: Array<UICompenent>
        private loadConfigCom(): void {

            this._baseRender.uiAtlas = this._bgRender.uiAtlas;

            this.addUIList(["c_title", "c_line"], this._bgRender);

            this.c_info = <FrameCompenent>this.addChild(this._bgRender.getComponent("c_info"));
            this.c_lev = this.addChild(this._baseRender.getComponent("c_lev"));

            this.AttrCurAry = new Array
            for (var i = 0; i < 9; i++) {
                this.AttrCurAry.push(this.addChild(this._baseRender.getComponent("c_attr" + i)));
            }

            this.applyLoadComplete();
            this.resize();
        }

        public resetData($data: Array<number>) {
            console.log("----奖励tips----");
            var $value: number;
            if ($data[0] == 25) {
                $value = SharedDef.MODULE_MIX_STRENGTH;
            } else if ($data[0] == 26) {
                $value = SharedDef.MODULE_MIX_POLISHED;
            } else {
                $value = SharedDef.MODULE_MIX_GEM;
            }


            var lev = $data[1] == 0 ? 1 : $data[1];

            var type = $value - 1;

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_lev.skinName, String(lev), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.c_info.goToAndStop(type);

            var ary = this.getTabAry($value);
            var curtab = ary[lev - 1];

            // if (lev > 0) {
                for (var i = 0; i < this.AttrCurAry.length; i++) {
                    if (i < curtab.props.length) {
                        UiDraw.drawAttValAdd(this.AttrCurAry[i], curtab.props[i][0], curtab.props[i][1]);
                        // this.drawAttrVal(this.AttrCurAry[i], curtab.props[i][0], curtab.props[i][1]);
                    } else {
                        UiDraw.clearUI(this.AttrCurAry[i]);
                    }
                }
            // } else {
            //     UiDraw.clearUI(this.AttrCurAry[0]);
            //     UiDraw.clearUI(this.AttrCurAry[1]);
            //     UiDraw.clearUI(this.AttrCurAry[2]);
            //     UiDraw.clearUI(this.AttrCurAry[3]);
            //     UiDraw.clearUI(this.AttrCurAry[4]);
            //     UiDraw.clearUI(this.AttrCurAry[5]);
            //     UiDraw.clearUI(this.AttrCurAry[6]);
            // }
        }

        // private drawAttrVal($ui: UICompenent, $att: number, $val: number) {
        //     var num = Math.floor($val / 100);
        //     LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.color802626 + getKeyProById($att) + ":    " + ColorType.color9a683f + "+" + Snum(num), 14, TextAlign.LEFT);
        // }

        private getTabAry($type: number): Array<tb.TB_equipdevelop_bonus> {
            var comebackary: Array<tb.TB_equipdevelop_bonus> = new Array
            var ary: Array<tb.TB_equipdevelop_bonus> = tb.TB_equipdevelop_bonus.get_TB_equipdevelop_bonus();
            for (var index = 0; index < ary.length; index++) {
                if (ary[index].type == $type) {
                    comebackary.push(ary[index]);
                }
            }
            console.log("--comebackary--", comebackary);
            return comebackary;
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break
                default:
                    break;
            }
        }

        public show($data: Array<number>): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData($data);
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}