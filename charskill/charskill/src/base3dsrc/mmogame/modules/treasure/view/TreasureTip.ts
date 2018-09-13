module treasure {
    export class TreasureTip extends UIConatiner {

        protected _baseRender: UIRenderComponent;
        protected _nextRender: UIRenderComponent;

        protected _bgRender: UIRenderComponent;

        protected _uiAtlas: UIAtlas;

        protected _data: BagItemData;
        protected _entryData: any;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._baseRender = new UIRenderComponent();
            this._bgRender = new UIRenderComponent();
            this._nextRender = new UIRenderComponent();

            this.addRender(this._bgRender);
            this.addRender(this._baseRender);
            //this.addRender(this._nextRender);

            this._baseRender.uiAtlas = new UIAtlas();
            this._baseRender.uiAtlas.setInfo("ui/uidata/treasure/tip.xml", "ui/uidata/treasure/tip.png", () => { this.loadConfigCom() });
        }

        private _fbID: number = 0;
        private _buttonType: number = 0;
        public show($id: number, buttonType: number): void {
            this._fbID = $id;
            this._buttonType = buttonType;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (this._bgRender.uiAtlas) {
                this.refresh();
            }

        }


        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }

        }


        /**组件列表*************************/

        private btn: FrameCompenent;
        private fbIcon: UICompenent;
        private skillIcon: UICompenent;
        private fbName: UICompenent;
        private fbType: UICompenent;
        private skillName: UICompenent;
        private skilladd: UICompenent;
        private skillZl: UICompenent;
        private skillInfo: UICompenent;
        private t_basebg: UICompenent;
        public loadConfigCom(): void {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this.t_basebg = this.addChild(this._bgRender.getComponent("t_basebg"));
            this.t_basebg.addEventListener(InteractiveEvent.Down, () => { }, this);
            this.t_basebg.addEventListener(InteractiveEvent.Up, () => { this.hide() }, this);
            this.addUIList(["t_bg", "t_btn_bg"], this._bgRender);
            this.btn = <FrameCompenent>this.addChild(this._baseRender.getComponent("t_btn"));
            this.btn.goToAndStop(0);
            this.btn.addEventListener(InteractiveEvent.Up, this.click, this);
            this.addChild(this._baseRender.getComponent("t_line"));

            this.fbIcon = this.addChild(this._baseRender.getComponent("t_icon_fb"));
            this.skillIcon = this.addChild(this._baseRender.getComponent("t_icon_skill"));
            this.fbName = this.addChild(this._baseRender.getComponent("t_fb_name"));
            this.fbType = this.addChild(this._baseRender.getComponent("t_fb_type"));
            this.skillName = this.addChild(this._baseRender.getComponent("t_skill_name"));
            this.skilladd = this.addChild(this._baseRender.getComponent("t_skill_info"));
            this.skillZl = this.addChild(this._baseRender.getComponent("t_zl"));
            this.skillInfo = this.addChild(this._baseRender.getComponent("t_info"));

            if (this._fbID > 0) {
                this.refresh();
            }
        }
        private click($e: InteractiveEvent): void {
            if (this._buttonType == 0) {

                UIManager.popClikNameFun("t_basebg")
                //佩戴
                if (this.hasempty()) {
                    if(this.getslotid(this._fbID) == -1){
                        NetManager.getInstance().protocolos.talisman_equip(this._fbID);
                        this.hide();
                    }else{
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "已装备该法宝", 99)
                    }
                   
                } else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "槽位装满，无法装备", 99)
                }
            } else {
                //卸下
                var slotid: number = this.getslotid(this._fbID);
                NetManager.getInstance().protocolos.talisman_unequip(slotid);
                this.hide();
            }
        }


        private hasempty(): boolean {
            var aaa: Array<TreasureWearVo> = GuidData.grow.gettalismanslotlist();
            for (let i = 0; i < aaa.length; i++) {
                if (aaa[i].state == 1 && aaa[i].treasureid == 0) {
                    return true;
                }
            }
            return false;
        }

        private getslotid($id: number): number {
            var ary: Array<TreasureWearVo> = GuidData.grow.gettalismanslotlist();
            for (let i = 0; i < ary.length; i++) {
                if (ary[i].treasureid == $id) {
                    return ary[i].slotid;
                }
            }
            return -1;
        }

        public refresh(): void {
            this.btn.goToAndStop(this._buttonType);
            var fbObj: any = TableData.getInstance().getData(TableData.tb_talisman_base, this._fbID);
            var skillObj: any = TableData.getInstance().getData(TableData.tb_skill_base, fbObj.passiveskill[0][0]);
            var skillLevObj: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, skillObj.uplevel_id[0]);

            IconManager.getInstance().drawCircleIcon(this.fbIcon, 1, fbObj.id);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.fbName.skinName, fbObj.name, 18, TextAlign.LEFT, getColorQua(fbObj.quality));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.fbType.skinName, getQuaName(fbObj.quality) + "法宝", 14, TextAlign.LEFT, ColorType.coloraa874a);

            IconManager.getInstance().drawCircleIcon(this.skillIcon, 2, skillObj.id);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skillName.skinName, skillObj.name, 18, TextAlign.LEFT, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skilladd.skinName, "(佩戴后生效)", 14, TextAlign.LEFT, ColorType.Green2ca937);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skillZl.skinName, ColorType.coloraa874a + "技能战力：" + ColorType.colorfde87e + skillLevObj.fight_value, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.skillInfo.skinName, tb.SkillDataVo.getSkillDesc(fbObj.passiveskill[0][0], fbObj.passiveskill[0][1]), 14, TextAlign.LEFT, ColorType.colord6e7ff);
        }

        public refreshIconName(): void {

        }


        protected initBase(): void {

        }



    }
}