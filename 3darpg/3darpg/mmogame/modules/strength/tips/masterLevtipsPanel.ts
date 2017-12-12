module strengthgem {

    export class masterLevtipsPanel extends WindowMinUi {

        // private _publicbgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
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
        private TabAry: Array<SelectButton>
        private b_tab0: SelectButton
        private b_tab1: SelectButton
        private b_tab2: SelectButton
        private loadConfigCom(): void {

            this._midRender.uiAtlas = this._bgRender.uiAtlas;

            this.addUIList(["b_title", "b_bg0", "b_bg1"], this._bgRender);
            this.addUIList(["b_line", "b_arrow"], this._midRender);

            this.AttrCurAry = new Array
            this.AttrNextAry = new Array
            for (var i = 0; i < 11; i++) {
                this.AttrCurAry.push(this.addChild(this._midRender.getComponent("b_attr" + i)));
                this.AttrNextAry.push(this.addChild(this._midRender.getComponent("b_nattr" + i)));
            }

            this.b_tab0 = <SelectButton>this.addEvntBut("b_tab0", this._bgRender);
            this.b_tab1 = <SelectButton>this.addEvntBut("b_tab1", this._bgRender);
            this.b_tab2 = <SelectButton>this.addEvntBut("b_tab2", this._bgRender);
            this.TabAry = new Array
            this.TabAry.push(this.b_tab0);
            this.TabAry.push(this.b_tab1);
            this.TabAry.push(this.b_tab2);

            this.resize();
            this.applyLoadComplete();
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    UIManager.getInstance().removeUIContainer(this);
                    break;
                case this.b_tab0:
                    this.setSelectTab(SharedDef.MODULE_MIX_STRENGTH);
                    break;
                case this.b_tab1:
                    this.setSelectTab(SharedDef.MODULE_MIX_POLISHED);
                    break;
                case this.b_tab2:
                    this.setSelectTab(SharedDef.MODULE_MIX_GEM);
                    break;

                default:
                    break;
            }
        }

        public setSelectTab($value: number) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if ((i + 1) == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }
            this.drawPage($value);
        }
        public KeyByType: Array<string> = ["全身强化:  ", "全身精炼:  ", "全身镶嵌总和:  "];
        public KeyLevNameByType: Array<string> = ["级", "段", "级"];
        private drawPage($value: number) {
            var type = $value - 1;
            var lev = this._masterlevvo[type] == 0 ? 1 : this._masterlevvo[type];
            var ary = this.getTabAry($value);
            var curtab = ary[lev - 1];
            // console.log("---lev--", lev, curtab, ary);
            //下一级加成情况
            if (lev == ary.length) {
                //满级
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[3].skinName, "已满级", 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.AttrNextAry[0]);
                UiDraw.clearUI(this.AttrNextAry[1]);
                UiDraw.clearUI(this.AttrNextAry[2]);
                UiDraw.clearUI(this.AttrNextAry[4]);
                UiDraw.clearUI(this.AttrNextAry[5]);
                UiDraw.clearUI(this.AttrNextAry[6]);
            } else if (lev < ary.length) {
                var tabvo;
                if (this._masterlevvo[type] == 0) {
                    tabvo = curtab;
                } else {
                    tabvo = ary[lev];
                }
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[0].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[type] + ":  " + ColorType.Green2ca937 + tabvo.level + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrNextAry[1].skinName, ColorType.color802626 + this.KeyByType[type] + ColorType.Green2ca937 + tabvo.need_lv[0] + this.KeyLevNameByType[type], 14, TextAlign.LEFT);
                for (var i = 0; i < this.AttrNextAry.length - 2; i++) {
                    if (i < tabvo.props.length) {
                        UiDraw.drawAttValAdd(this.AttrNextAry[i + 2], tabvo.props[i][0], tabvo.props[i][1]);
                    } else {
                        UiDraw.clearUI(this.AttrNextAry[i + 2]);
                    }
                }
            } else {
                return;
            }

            //现有属性加成情况
            if (this._masterlevvo[type] > 0) {
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[0].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[type] + ":  " + ColorType.color9a683f + curtab.level + "级", 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[1].skinName, ColorType.color802626 + this.KeyByType[type] + ColorType.color9a683f + curtab.need_lv[0] + this.KeyLevNameByType[type], 14, TextAlign.LEFT);
                for (var i = 0; i < this.AttrCurAry.length - 2; i++) {
                    if (i < curtab.props.length) {
                        this.drawAttrVal(this.AttrCurAry[i + 2], curtab.props[i][0], curtab.props[i][1]);
                    } else {
                        UiDraw.clearUI(this.AttrCurAry[i + 2]);
                    }
                }
            } else {
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[3].skinName, this.KeyByType[type] + curtab.need_lv[0] + this.KeyLevNameByType[type], 14, TextAlign.CENTER, ColorType.color802626);
                LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.AttrCurAry[4].skinName, "即可获得属性提升", 14, TextAlign.CENTER, ColorType.color802626);
                UiDraw.clearUI(this.AttrCurAry[0]);
                UiDraw.clearUI(this.AttrCurAry[1]);
                UiDraw.clearUI(this.AttrCurAry[2]);
                UiDraw.clearUI(this.AttrCurAry[5]);
                UiDraw.clearUI(this.AttrCurAry[6]);
            }
        }

        private getTabAry($type: number): Array<tb.TB_equipdevelop_bonus> {
            var comebackary: Array<tb.TB_equipdevelop_bonus> = new Array
            var ary: Array<tb.TB_equipdevelop_bonus> = tb.TB_equipdevelop_bonus.get_TB_equipdevelop_bonus();
            for (var index = 0; index < ary.length; index++) {
                if (ary[index].type == $type) {
                    comebackary.push(ary[index]);
                }
            }
            return comebackary;
        }

        private _masterlevvo: Array<number>
        public show($tabid: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._masterlevvo = GuidData.grow.getMasterLevVo();
            this.setSelectTab($tabid);
        }

        private drawAttrVal($ui: UICompenent, $att: number, $val: number) {
            var num = Math.floor($val / 100);
            LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, ColorType.color802626 + getKeyProById($att) + ":    " + ColorType.color9a683f + "+" + Snum(num), 14, TextAlign.LEFT);
        }
    }
}