module pass {
    export class BossUiPanel extends WindowMinUi {

        private _faceRender: UIRenderComponent;
        private _midRender: UIRenderComponent;

        public dispose(): void {
            this._faceRender.dispose();
            this._faceRender = null;
            this._midRender.dispose();
            this._midRender = null;
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            this.setBlackBg();
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._faceRender = new UIRenderComponent();
            this.addRender(this._faceRender);

            this._midRender.uiAtlas = new UIAtlas
        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/openpass/openpass.xml", "ui/uidata/openpass/openpass.png", () => { this.loadConfigCom() });
        }

        private c_btn: UICompenent
        private c_force0: UICompenent
        private c_force1: UICompenent
        private c_desc: UICompenent
        private c_arrow: FrameCompenent
        private resiconAry: Array<UICompenent>
        private loadConfigCom(): void {
            this._faceRender.uiAtlas = this._midRender.uiAtlas

            this.addUIList(["c_title", "c_titlebg0", "c_titlebg1", "c_titlebg2", "c_rolebg", "c_forcebg"], this._midRender);
            this.addUIList(["c_txt0", "c_txt1", "c_txt2","c_forcetxt0","c_forcetxt1"], this._faceRender);

            this.c_btn = this.addEvntButUp("c_btn", this._faceRender);

            this.c_force0 = this.addChild(this._faceRender.getComponent("c_force0"));
            this.c_force1 = this.addChild(this._faceRender.getComponent("c_force1"));
            this.c_desc = this.addChild(this._faceRender.getComponent("c_desc"));

            this.c_arrow = <FrameCompenent>this.addChild(this._faceRender.getComponent("c_arrow"));

            this.resiconAry = new Array
            for (let i = 0; i < 3; i++) {
                this.resiconAry.push(this.addChild(this._faceRender.getComponent("c_res" + i)));
            }

            this.addBossChar();

            this.applyLoadComplete();

        }


        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new PassEvent(PassEvent.HIDE_BOSS_PANEL));
                    break;
                case this.c_btn:
                    UIManager.popClikNameFun("c_btn");
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (GuidData.player.getForce() < this._curvo["force"]) {
                        AlertUtil.show(
                            ColorType.Brown7a2f21 + "当前您的战斗力" + ColorType.colorcd2000 + GuidData.player.getForce()
                            + ColorType.Brown7a2f21 + "低于BOSS战斗力" + this._curvo["force"] + "\n挑战会受到影响，该BOSS属性会大幅增加\n是否进行挑战？"
                            , "提示", (a: any) => {
                                if (a == 1) {
                                    this.challengeFun();
                                }else{
                                    ModulePageManager.openPanel(SharedDef.MODULE_STRENGTH);
                                }
                            }, 2, ["前往挑战", "提升战力"])
                    } else {
                        this.challengeFun();
                    }
                    break;
                default:
                    break;
            }
        }

        private challengeFun() {
            NetManager.getInstance().protocolos.enter_stage_instance();
            ModuleEventManager.dispatchEvent(new PassEvent(PassEvent.HIDE_BOSS_PANEL));
        }

        private _curvo: any
        public show($vo: any) {
            this._curvo = $vo
            UIManager.getInstance().addUIContainer(this);

            var descary: Array<string> = $vo["desc"][0]
            var info: string = "";
            for (let i = 0; i < descary.length; i++) {
                info += descary[i] + "\n"
            }

            LabelTextFont.writeTextLabel(this._faceRender.uiAtlas, this.c_desc.skinName, info, 16, TextAlign.LEFT, 235, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._faceRender.uiAtlas, this.c_force1.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this._faceRender.uiAtlas, this.c_force0.skinName, Snum($vo["force"]), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            var idx: number = GuidData.player.getForce() < $vo["force"] ? 1 : 0;
            this.c_arrow.goToAndStop(idx)

            var resary: Array<Array<number>> = $vo["basereward"];
            for (let i = 0; i < this.resiconAry.length; i++) {
                if (i < resary.length) {
                    IconManager.getInstance().drawItemIcon60(this.resiconAry[i], resary[i][0], resary[i][1]);
                } else {
                    IconManager.getInstance().clearItemEvent(this.resiconAry[i]);
                    UiDraw.clearUI(this.resiconAry[i]);
                }
            }

            //boss模型
            var $tb_creature_template: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($vo["boss"])
            this.bossChar.setAvatar($tb_creature_template.avatar);

            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }

        private bossChar: MonsterUIChar;
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this.wintopRender.addModel(this.bossChar);
        }

        public resize(): void {
            super.resize();
            if (this.bossChar) {

                this.bossChar.scale = 2 * UIData.Scale;
                this.bossChar.x = 110 * UIData.Scale;
                this.bossChar.y = -90 * UIData.Scale;
                this.bossChar.resize();
            }
        }
    }
}