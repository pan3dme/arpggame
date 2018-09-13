module sboss {

    export class BossInfoPanel extends WindowCentenMin {

        private _baseRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
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

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)


            this._baseRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/boss/bosshow.xml", "ui/uidata/boss/bosshow.png", () => { this.loadConfigCom() });
        }

        private uiary:Array<UICompenent>
        private t_name:UICompenent
        private loadConfigCom(): void {
            this._roleRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;

            this.addUIList(["t_title","t_bg","t_bg2"],this._roleRender);

            this.t_name = this.addChild(this._topRender.getComponent("t_name"));

            this.uiary = new Array
            for (let i = 0; i < 6; i++) {
                this.uiary.push(this.addChild(this._topRender.getComponent("t_lab"+i)));
            }
            this.addBossChar();
            this.resize();
            this.applyLoadComplete();
        }

        private bossChar: MonsterUIChar
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this._roleRender.addModel(this.bossChar);
        }


        public resize(): void {
            super.resize();
            if (this.bossChar) {
                this.bossChar.resize();
                this.bossChar.scale = 1.8 * UIData.Scale;
                this.bossChar.x = 1 * UIData.Scale;
                this.bossChar.y = -70 * UIData.Scale;
            }
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

        public show($tb: tb.TB_mass_boss_info): void {
            UIManager.getInstance().addUIContainer(this);
            var $tb_Vo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($tb.bossEntry)

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas,this.t_name.skinName,$tb_Vo.name +" Lv"+$tb_Vo.level,16,TextAlign.CENTER,ColorType.Brown7a2f21);

            this.bossChar.setAvatar($tb_Vo.avatar);

            for (let i = 0; i < 6; i++) {
                if($tb.props.length > i){
                    UiDraw.drawAttVal(this.uiary[i],$tb.props[i][0],$tb.props[i][1]);
                }else{
                    UiDraw.clearUI(this.uiary[i]);
                }
            }
            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}