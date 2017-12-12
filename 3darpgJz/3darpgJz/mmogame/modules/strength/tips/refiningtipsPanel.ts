module strengthgem {

    export class refiningtipsPanel extends UIPanel {

        // private _publicbgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
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
            // this._publicbgRender = new UIRenderComponent;
            // this.addRender(this._publicbgRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)


            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            //     this._publicbgRender.uiAtlas = $publicbgUiAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/streng/tips.xml", "ui/uidata/streng/tips.png", () => { this.loadConfigCom() });
            // });

        }

        private AttrCurAry: Array<UICompenent>
        private AttrNextAry: Array<UICompenent>
        private a_closebtn: UICompenent
        private loadConfigCom(): void {

            this._midRender.uiAtlas = this._bgRender.uiAtlas;

            this.a_closebtn = this.addEvntBut("a_closebtn", this._midRender);
            this.a_closebtn.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.addUIList(["a_bg"], this._bgRender);
            this.addUIList(["a_txt"], this._midRender);

            this.AttrCurAry = new Array
            this.AttrNextAry = new Array
            for (var i = 0; i < 7; i++) {
                this.AttrCurAry.push(this.addChild(this._midRender.getComponent("a_attr" + i)));
                this.AttrNextAry.push(this.addChild(this._midRender.getComponent("a_nattr" + i)));
            }
            this.resize();
            this.applyLoadComplete();
        }

        protected butClik(evt: InteractiveEvent): void {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.butClik, this);
        }

        public show($partid_rare: Array<number>): void {
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.butClik, this);
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var equData = GuidData.bag.getEquByPart($partid_rare[0]);
            //基础属性绘制
            var obj: any = equData.entryData.basic_properties
            console.log("==基础属性绘制==", obj);
            if (obj && obj.length) {
                this.drawAttrVal(this.AttrCurAry[0], obj[0][0], obj[0][1]);
                UiDraw.drawAddValRight(this.AttrNextAry[0], ($partid_rare[1] + 1) * obj[0][1], false, TextAlign.LEFT);
            } else {
                UiDraw.clearUI(this.AttrCurAry[0]);
                UiDraw.clearUI(this.AttrNextAry[0]);
            }
            //附加属性绘制
            var ary = equData.data.AttrData
            var len: number = ary.length / 3;
            console.log("==附加属性绘制==", ary, len);
            for (var i = 0; i < this.AttrCurAry.length - 1; i++) {//下标从0开始
                if (i < len) {
                    this.drawAttrVal(this.AttrCurAry[i + 1], ary[i * 3], ary[i * 3 + 1]);
                    UiDraw.drawAddValRight(this.AttrNextAry[i + 1], ($partid_rare[1] + 1) * ary[i * 3 + 1], false, TextAlign.LEFT);
                } else {
                    UiDraw.clearUI(this.AttrCurAry[i + 1]);
                    UiDraw.clearUI(this.AttrNextAry[i + 1]);
                }
            }

        }

        private drawAttrVal($ui: UICompenent, $att: number, $val: number) {
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.colorefe4c4 + getKeyProById($att) + ":  " + Snum($val), 14, TextAlign.RIGHT);
        }
    }
}