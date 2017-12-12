module skillUi {

    export class SkillPanel extends WindowUi {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _skillRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _frameRender: FrameUIRender;
        public _baseUiAtlas: UIAtlas;

        public dispose(): void {

            this._baseRender.dispose();
            this._baseRender = null;

            this._bgRender.dispose();
            this._bgRender = null;
            this._skillRender.dispose();
            this._skillRender = null;

            var ary15: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(15).children;
            for (var i: number = 0; i < ary15.length; i++) {
                ary15[i].unBind();
            }
            var ary16: Array<RedPointNode> = RedPointManager.getInstance().getNodeByID(16).children;
            for (var i: number = 0; i < ary16.length; i++) {
                ary16[i].unBind();
            }


            this._redPointRender.dispose();
            this._redPointRender = null;



            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            super.dispose();
        }


        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;


            this._skillRender = new UIRenderComponent();
            this.addRender(this._skillRender);

            this._bgRender = new UIRenderComponent();
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._redPointRender = new RedPointRender();
            this.addRender(this._redPointRender);

            this._baseUiAtlas = new UIAtlas();

        }

        protected butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.w_close:
                    this.hide();
                    break;
                case this.zhudongbtn:

                    UIManager.popClikNameFun("t_Allbtn0");
                    var $type: number = this.hasZhuDongUp();
                    if ($type == 0) {
                        NetManager.getInstance().protocolos.raise_base_spell_all(SharedDef.RAISE_BASE_SKILL, this.getZhuDongUpStr());
                    } else if ($type == 1) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "技能等级已达上限，请提升人物等级再来升级技能！", 99);
                    } else {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足！", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = 3
                        ModuleEventManager.dispatchEvent($aaa);
                    }
                    break;
                case this.beidongbtn:
                    var $type: number = this.hasBeiDongUp();
                    if ($type == 0) {
                        NetManager.getInstance().protocolos.raise_base_spell_all(SharedDef.RAISE_BASE_SKILL, this.getBeiDongUpStr());
                    } else if ($type == 1) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "技能等级已达上限，请提升人物等级再来升级技能！", 99);
                    } else if ($type == 3) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "技能未解锁", 99);
                    } else {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足！", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = 3
                        ModuleEventManager.dispatchEvent($aaa);
                    }
                    break;
                default:
                    break;
            }


        }
        private upLevEff: FrameTipCompenent;
        public showSkillUpEff(): void {
            console.log("up skill lev");
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ui_jn"), 4, 4, ($ui: any) => {
                    this.upLevEff = $ui;
                    this.upLevEff.x = 595;
                    this.upLevEff.y = 58;
                    //this.upLevEff.width = this.upLevEff.baseRec.width * 0.8;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    this.upLevEff.speed = 1;
                    this.upLevEff.playOne(this);
                })
            }
            if (this.upLevEff) {
                this.upLevEff.playOne(this);
            }


        }

        public lockDic: Object;
        public getData(): void {
            var lockObj: any = TableData.getInstance().getData(TableData.tb_char_skill, GuidData.player.getCharType());
            this.lockDic = new Object;
            for (var i: number = 0; i < lockObj.unlocks.length; i++) {
                this.lockDic[lockObj.unlocks[i][1]] = lockObj.unlocks[i][0];
            }
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_show, GuidData.player.getCharType());
            var zhudongList: Array<number> = $obj.zhudong_list;
            var beidongList: Array<number> = $obj.passive_list;

            var zhudongAry: Array<SkillItemData> = new Array;
            for (var i: number = 0; i < zhudongList.length; i++) {
                var item: SkillItemData = new SkillItemData;
                item.id = zhudongList[i];
                item.lev = GuidData.grow.getSkillLev(item.id);
                item.baseData = TableData.getInstance().getData(TableData.tb_skill_base, zhudongList[i]);
                item.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, item.baseData.uplevel_id[0] + item.lev - 1);
                zhudongAry.push(item);
                if (this.zhudongSkilUIList[i]) {
                    this.zhudongSkilUIList[i].setData(item);
                }
            }

            var beidongAry: Array<SkillItemData> = new Array;
            for (var i: number = 0; i < beidongList.length; i++) {
                var item: SkillItemData = new SkillItemData;
                item.id = beidongList[i];
                item.lev = GuidData.grow.getSkillLev(item.id);
                item.baseData = TableData.getInstance().getData(TableData.tb_skill_base, beidongList[i]);
                item.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, item.baseData.uplevel_id[0] + item.lev - 1);
                beidongAry.push(item);
                if (this.beidongSkilUIList[i]) {
                    this.beidongSkilUIList[i].setData(item);
                }
            }

        }
        /**0可升级 1表示等级上限 2表示资源不够 */
        public hasZhuDongUp(): number {
            if (!this.zhudongSkilUIList) {
                return 1;
            }
            var curLev: number = GuidData.player.getLevel();
            var maxNum: number = 0;
            var allNum: number = 0;
            for (var i: number = 0; i < this.zhudongSkilUIList.length; i++) {
                if (this.zhudongSkilUIList[i].redShow) {
                    return 0;
                }
                if (this.zhudongSkilUIList[i].data) {
                    allNum++;
                    if (this.zhudongSkilUIList[i].data.lev >= curLev) {
                        maxNum++;
                    }
                }

            }
            if (maxNum == allNum) {
                return 1;
            }
            return 2;
        }

        public getZhuDongUpStr(): string {
            var $str: string = "";
            for (var i: number = 0; i < this.zhudongSkilUIList.length; i++) {
                if (this.zhudongSkilUIList[i].redShow) {
                    $str = $str + this.zhudongSkilUIList[i].data.id + "|"
                }
            }
            return $str;
        }

        public getBeiDongUpStr(): string {
            var $str: string = "";
            for (var i: number = 0; i < this.beidongSkilUIList.length; i++) {
                if (this.beidongSkilUIList[i].redShow) {
                    $str = $str + this.beidongSkilUIList[i].data.id + "|"
                }
            }
            return $str;
        }

        /**0可升级 1表示等级上限 2表示资源不够 3表示未激活*/
        public hasBeiDongUp(): number {
            if (!this.beidongSkilUIList) {
                return 1;
            }
            var curLev: number = GuidData.player.getLevel();
            var maxNum: number = 0;
            var maxActNum:number = 0;

            var allNum: number = 0;
            var disNum: number = 0;
            for (var i: number = 0; i < this.beidongSkilUIList.length; i++) {
                if (this.beidongSkilUIList[i].redShow) {
                    return 0;
                }
                if (this.beidongSkilUIList[i].data) {
                    allNum++;
                    if (this.beidongSkilUIList[i].data.lev >= curLev) {
                        maxNum++;
                    }
                    if (this.beidongSkilUIList[i].data.lev == 0) {
                        disNum++;
                    }else{
                        maxActNum++;
                    }
                }

            }
            if (disNum == allNum) {
                return 3;
            }
            if (maxNum == maxActNum) {
                return 1;
            }
            return 2;
        }

        public refreshLev(): void {
            for (var i: number = 0; i < this.zhudongSkilUIList.length; i++) {
                this.zhudongSkilUIList[i].refresh();
            }
            for (var i: number = 0; i < this.beidongSkilUIList.length; i++) {
                this.beidongSkilUIList[i].refresh();
            }
        }

        public drawItemSkill(): void {

        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/skillui/skill.xml", "ui/uidata/skillui/skill.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {

            this._skillRender.uiAtlas = this._baseUiAtlas;
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this.resize();
            this.applyLoadComplete();

        }


        public zhudongSkilUIList: Array<SkillItemIcon>;
        public beidongSkilUIList: Array<SkillItemIcon>;

        private initUI(): void {

            this.addUIList(["a_line", "a_line1"], this._baseRender);
            this.addUIList(["t_bg", "t_skill_bg", "t_skill_bg1", "t_skill_bg2", "a_minbottom", "a_maxcenter", "a_maxbottom"], this.winmidRender);
            //var list: Array<UICompenent> = this.addUIList(["t_skill_bg_u", "t_skill_bg1_u", "t_skill_bg2_u"], this.winmidRender);

            this.addIsUComponent("t_skill_bg_u", this.winmidRender);
            this.addIsUComponent("t_skill_bg1_u", this.winmidRender);
            this.addIsUComponent("t_skill_bg2_u", this.winmidRender);
            this.addIsUComponent("a_minbottom1", this.winmidRender);
            this.addIsUComponent("a_maxcenter1", this.winmidRender);
            this.addIsUComponent("a_maxbottom1", this.winmidRender);

            // var ui: UICompenent;
            // ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            this.zhudongSkilUIList = new Array;
            for (var i: number = 0; i < 5; i++) {
                var sitem: SkillItemIcon = new SkillItemIcon();
                sitem.panel = this;
                sitem.init(i, true, this._skillRender, this._bgRender, this, this._redPointRender);
                this.zhudongSkilUIList.push(sitem);
            }

            this.beidongSkilUIList = new Array;
            for (var i: number = 0; i < 9; i++) {
                var sitem: SkillItemIcon = new SkillItemIcon();
                sitem.panel = this;
                sitem.init(i, false, this._skillRender, this._bgRender, this, this._redPointRender);
                this.beidongSkilUIList.push(sitem);
            }

            this.addUIList(["t_lab_bg", "t_lab_bg1", "t_win_title"], this._bgRender);

            var ui: UICompenent;

            ui = this.addChild(this._bgRender.getComponent("t_lab1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "主动技能", 16, TextAlign.CENTER, ColorType.color9a683f)
            ui = this.addChild(this._bgRender.getComponent("t_lab2"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "被动技能", 16, TextAlign.CENTER, ColorType.color9a683f)

            ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "技能效果", 16, TextAlign.CENTER, ColorType.color9a683f)
            ui = this.addChild(this._baseRender.getComponent("t_lab4"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "学习条件", 16, TextAlign.CENTER, ColorType.color9a683f)

            this.initSelSkilPanel();

            this.getData();

            this.setSel(this.zhudongSkilUIList[0]);
        }

        private selSkillIcon: UICompenent;
        private selSkillName: UICompenent;
        private selSkillForce: UICompenent;
        private selSkillLev: UICompenent;
        private selSkillType: UICompenent;

        private selSkillDesc: UICompenent;
        private selSkillCD: UICompenent;
        private nextSkillDesc: UICompenent;
        private nextSkillCD: UICompenent;

        private selSkillLevLimt: UICompenent;
        private selSkillCostLimt: UICompenent;
        private selSkillCostIcon: UICompenent;

        private selSkillBtn: UICompenent;
        private zhudongbtn: UICompenent;
        private beidongbtn: UICompenent;
        public selRedPoint: RedPointCompenent;
        public beidongRedPoint: RedPointCompenent;
        public zhudongRedPoint: RedPointCompenent;
        public initSelSkilPanel(): void {
            this.selSkillIcon = this.addChild(this._baseRender.getComponent("t_s_icon"));
            this.selSkillName = this.addChild(this._baseRender.getComponent("t_s_name"));
            this.selSkillForce = this.addChild(this._baseRender.getComponent("t_s_force"));
            this.selSkillLev = this.addChild(this._baseRender.getComponent("t_s_lev"));
            this.selSkillType = this.addChild(this._baseRender.getComponent("t_s_type"));

            this.selSkillDesc = this.addChild(this._baseRender.getComponent("t_s_cur"));
            this.selSkillCD = this.addChild(this._baseRender.getComponent("t_s_cur_cd"));

            this.nextSkillDesc = this.addChild(this._baseRender.getComponent("t_s_next"));
            this.nextSkillCD = this.addChild(this._baseRender.getComponent("t_s_next_cd"));

            this.selSkillLevLimt = this.addChild(this._baseRender.getComponent("t_s_up_lev"));
            this.selSkillCostLimt = this._baseRender.getComponent("t_s_up_cost");
            this.selSkillCostIcon = this._baseRender.getComponent("t_s_up_icon");

            this.zhudongbtn = this.addEvntButUp("t_Allbtn0", this._baseRender);
            this.beidongbtn = this.addEvntButUp("t_Allbtn1", this._baseRender);
            this.zhudongRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.zhudongbtn.x + this.zhudongbtn.width, this.zhudongbtn.y));
            this.beidongRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.beidongbtn.x + this.beidongbtn.width, this.beidongbtn.y));

            this.selSkillBtn = this._baseRender.getComponent("t_btn");
            this.selSkillBtn.addEventListener(InteractiveEvent.Up, this.upClick, this);

            this.selRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.selSkillBtn.x + this.selSkillBtn.width, this.selSkillBtn.y));
        }

        private _canclick: boolean = true;
        private upClick($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._canclick) {
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._canclick = true;
                });
                if (this._selectedData.lev >= GuidData.player.getLevel()) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "技能等级已达上限，请提升人物等级再来升级技能！", 99);
                    return;
                } else if (!hasEnoughRes(this._selectedData.levData.uplevel_cost[0])) {
                    var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                    $aaa.data = 3
                    ModuleEventManager.dispatchEvent($aaa);
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + getResName(this._selectedData.levData.uplevel_cost[0][0]) + "不足，无法升级", 99);
                    return;
                }
                NetManager.getInstance().protocolos.raise_base_spell(SharedDef.RAISE_BASE_SKILL, this._selectedData.id);
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }

        private _selectedData: SkillItemData;
        public drawSelSkill($data: SkillItemData, redPoint: boolean): void {
            this._selectedData = $data;
            IconManager.getInstance().drawCircleIcon(this.selSkillIcon, 2, $data.baseData.id);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillName.skinName, $data.baseData.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillLev.skinName, ColorType.Brown7a2f21 + "等级：" + ColorType.colorff7200 + $data.lev, 14, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillType.skinName,
                ColorType.Brown7a2f21 + "类型：" + ColorType.color4392ff + ($data.baseData.is_initiative == 1 ? "主动" : "被动"), 14, TextAlign.LEFT);

            if ($data.lev == 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillForce.skinName, "战力0", 14, TextAlign.LEFT, ColorType.color9a683f);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillDesc.skinName,
                    ColorType.Brown7a2f21 + "当前效果：" + ColorType.Green2ca937 + "无", 16, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillCD.skinName,
                    ColorType.Brown7a2f21 + "冷却时间：" + ColorType.color4392ff + "0秒", 14, TextAlign.LEFT);
            } else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillForce.skinName, "战力" + $data.levData.fight_value, 14, TextAlign.LEFT, ColorType.color9a683f);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillDesc.skinName,
                    ColorType.Brown7a2f21 + "当前效果：" + ColorType.Green2ca937 + tb.SkillDataVo.getSkillDesc($data.id, $data.lev), 16, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillCD.skinName,
                    ColorType.Brown7a2f21 + "冷却时间：" + ColorType.color4392ff + (($data.baseData.singleCD - $data.levData.mcd) / 1000) + "秒", 14, TextAlign.LEFT);
            }


            var nextlevData: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, $data.baseData.uplevel_id[0] + $data.lev);
            if ($data.lev > ($data.baseData.uplevel_id[1] - $data.baseData.uplevel_id[0])) {
                nextlevData = null;
            }

            if (nextlevData) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nextSkillDesc.skinName,
                    ColorType.Brown7a2f21 + "下级效果：" + ColorType.Green2ca937 + tb.SkillDataVo.getSkillDesc($data.id, $data.lev + 1), 16, TextAlign.LEFT);

                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nextSkillCD.skinName,
                    ColorType.Brown7a2f21 + "冷却时间：" + ColorType.color4392ff + (($data.baseData.singleCD - nextlevData.mcd) / 1000) + "秒", 14, TextAlign.LEFT);
            } else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nextSkillDesc.skinName,
                    ColorType.Brown7a2f21 + "下级效果：" + ColorType.Green2ca937 + "已满级", 16, TextAlign.LEFT);

                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nextSkillCD.skinName,
                    ColorType.Brown7a2f21 + "冷却时间：" + ColorType.color4392ff + "0秒", 14, TextAlign.LEFT);
            }

            if ($data.lev == 0) {

                this.selSkillLevLimt.x = this.selSkillLevLimt.baseRec.x + 40;
                this.selSkillLevLimt.y = this.selSkillLevLimt.baseRec.y + 32;

                if (this.selSkillCostLimt.parent) {
                    this.removeChild(this.selSkillCostLimt);
                }
                if (this.selSkillCostIcon.parent) {
                    this.removeChild(this.selSkillCostIcon);
                }
                if (this.selSkillBtn.parent) {
                    this.removeChild(this.selSkillBtn);
                }

                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillLevLimt.skinName, ColorType.Brown7a2f21 + "解锁等级：" + ColorType.colorff7200 + this.lockDic[$data.id], 16, TextAlign.CENTER);

            } else if (nextlevData == null) {
                this.selSkillLevLimt.x = this.selSkillLevLimt.baseRec.x + 40;
                this.selSkillLevLimt.y = this.selSkillLevLimt.baseRec.y + 32;

                if (this.selSkillCostLimt.parent) {
                    this.removeChild(this.selSkillCostLimt);
                }
                if (this.selSkillCostIcon.parent) {
                    this.removeChild(this.selSkillCostIcon);
                }
                if (this.selSkillBtn.parent) {
                    this.removeChild(this.selSkillBtn);
                }

                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillLevLimt.skinName, ColorType.Brown7a2f21 + "已满级", 16, TextAlign.CENTER);

            } else {
                this.selSkillLevLimt.x = this.selSkillLevLimt.baseRec.x;
                this.selSkillLevLimt.y = this.selSkillLevLimt.baseRec.y;
                if (!this.selSkillCostLimt.parent) {
                    this.addChild(this.selSkillCostLimt);
                }
                if (!this.selSkillCostIcon.parent) {
                    this.addChild(this.selSkillCostIcon);
                }
                if (!this.selSkillBtn.parent) {
                    this.addChild(this.selSkillBtn);
                }

                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillLevLimt.skinName, ColorType.Brown7a2f21 + "需求等级：" + ColorType.colorff7200 + $data.levData.need_level, 16, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.selSkillCostLimt.skinName, ColorType.Brown7a2f21 + "需求" + getResName($data.levData.uplevel_cost[0][0]) + "：" + ColorType.color4392ff + Snum($data.levData.uplevel_cost[0][1]), 16, TextAlign.LEFT);

            }

            if (redPoint) {
                this.selRedPoint.preShow();
            } else {
                this.selRedPoint.preHide();
            }

        }

        public setSel($item: SkillItemIcon): void {
            for (var i: number = 0; i < this.zhudongSkilUIList.length; i++) {
                if (this.zhudongSkilUIList[i] == $item) {
                    $item.selected = true;
                } else {
                    this.zhudongSkilUIList[i].selected = false;
                }
            }
            for (var i: number = 0; i < this.beidongSkilUIList.length; i++) {
                if (this.beidongSkilUIList[i] == $item) {
                    $item.selected = true;
                } else {
                    this.beidongSkilUIList[i].selected = false;
                }
            }
            this.drawSelSkill($item.data, $item.redShow);
        }


        private addIsUComponent($name: string, $render: UIRenderComponent): void {
            var ui: UICompenent = $render.getComponent($name);
            ui.isU = true;
            this.addChild(ui);
        }


        public showRedPoint() {
            if (!this.zhudongRedPoint) {
                return;
            }
            if (!this.beidongRedPoint) {
                return;
            }
            if (this.hasZhuDongUp() == 0) {
                this.zhudongRedPoint.preShow();
            } else {
                this.zhudongRedPoint.preHide();
            }
            if (this.hasBeiDongUp() == 0) {
                this.beidongRedPoint.preShow();
            } else {
                this.beidongRedPoint.preHide();
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            SceneManager.getInstance().render = false;

            if (this._baseRender.uiAtlas) {
                this.refreshLev();
            }

            this.showRedPoint();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            SceneManager.getInstance().render = true;
            //this._slist.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            super.hide();
        }


    }

    export class SkillItemIcon {
        public icon: UICompenent;
        public name: UICompenent;
        public lev: UICompenent;
        public data: SkillItemData;
        public panel: SkillPanel;
        public redPoint: RedPointNode;

        public init($id: number, $initiative: boolean, $baseRender: UIRenderComponent, $topRender: UIRenderComponent, $container: UIConatiner,
            $redPointRender: RedPointRender): void {
            var ab: string = $initiative ? "a" : "b";
            var key: string = "t_" + ab + "s" + $id;
            this.icon = $baseRender.getComponent(key);
            $container.addChild(this.icon);
            key = "t_" + ab + "n" + $id;

            this.name = $baseRender.getComponent(key);
            $container.addChild(this.name);

            key = "t_" + ab + "l" + $id;
            this.lev = $baseRender.getComponent(key);
            $container.addChild(this.lev);

            var pnode: RedPointNode;
            if ($initiative) {
                pnode = RedPointManager.getInstance().getNodeByID(15);
            } else {
                pnode = RedPointManager.getInstance().getNodeByID(16)
            }
            if (pnode.children[$id]) {
                var red: RedPointCompenent = $redPointRender.getRedPointUI($container, 0, new Vector2D(this.icon.x + this.icon.width, this.icon.y), "style1");
                pnode.children[$id].bindUI(red);
                this.redPoint = pnode.children[$id];
            }

            this.icon.addEventListener(InteractiveEvent.Down, this.onClick, this);
        }

        public get redShow(): boolean {
            if (!this.redPoint) {
                return false;
            }
            return this.redPoint.show;
        }

        private onClick($e: InteractiveEvent): void {
            if (this.data) {
                this.panel.setSel(this);
            }
        }

        private _selected: boolean = false;
        public get selected(): boolean {
            return this._selected;
        }
        public set selected(val: boolean) {
            if (this._selected == val) {
                return;
            }
            this._selected = val;
            this.drawIcon();
        }

        public setData($data: SkillItemData): void {
            if (!$data) {
                return;
            }
            this.data = $data;
            this.draw();
        }
        public draw(): void {
            this.drawIcon();
            LabelTextFont.writeSingleLabel(this.name.uiRender.uiAtlas, this.name.skinName, this.data.baseData.name, 16, TextAlign.CENTER, ColorType.Orange7a2f21);
            this.drawLev();
        }
        private drawIcon(): void {
            IconManager.getInstance().drawCircleIcon(this.icon, 2, this.data.baseData.id, this.data.lev == 0, null, this._selected);
        }
        private drawLev(): void {
            if (this.data.lev > 0) {
                this.lev.x = this.lev.baseRec.x;
                this.lev.y = this.lev.baseRec.y;
                this.drawApplyLev();
            } else {
                this.lev.x = this.lev.baseRec.x - 17;
                this.lev.y = this.lev.baseRec.y - 22;
                LabelTextFont.writeSingleLabel(this.lev.uiRender.uiAtlas, this.lev.skinName, this.panel.lockDic[this.data.id] + "级解锁", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            }

        }

        private drawApplyLev(): void {
            var $rec: UIRectangle = this.lev.uiRender.uiAtlas.getRec(this.lev.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.SKILL_LEV_BG, new Rectangle(8, 1, 53, 18), UIData.publicUi);

            LabelTextFont.writeSingleLabelToCtx(ctx, String(this.data.lev), 16, 0, 0, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.lev.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public refresh(): void {
            if (!this.data) {
                return;
            }
            var lev: number = GuidData.grow.getSkillLev(this.data.id);
            if (lev == this.data.lev && !this._selected) {
                return;
            }
            if (this.data.lev == 0) {
                this.data.lev = lev;
                this.drawIcon();
            }
            this.data.lev = lev;
            this.data.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, this.data.baseData.uplevel_id[0] + lev - 1);
            this.drawLev();
            if (this._selected) {
                this.panel.setSel(this);
            }
        }

    }

    export class SkillItemData {
        public id: number;
        public lev: number;
        public baseData: any;
        public levData: any;
    }

}