module faction {

    export class FactionSkillPanel extends WindowUi {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;

        private _slist: FactionSkillList;
        public dispose(): void {

            this._baseRender.dispose();
            this._baseRender = null;

            this._bgRender.dispose();
            this._bgRender = null;

            if(this._slist){
                this._slist.dispose();
                this._slist = null;
            }
            super.dispose();

        }


        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent();
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);


            this._slist = new FactionSkillList();
            this._slist.mainPanel = this;
            this._baseUiAtlas = new UIAtlas();

        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.w_close) {
                this.hide();
            }


        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/faction/factionskill/factionskill.xml", "ui/uidata/faction/factionskill/factionskill.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this.applyLoadComplete();

            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this._slist.init(this._baseUiAtlas);

            this.resize();

        }

        private _skillIcon: UICompenent;
        private _skillName: UICompenent;
        private _skillLev: UICompenent;

        private _skillCurLevDesc: UICompenent;
        private _skillNextLevDesc: UICompenent;

        private _skillCost: UICompenent;
        private _skillMax: UICompenent;

        private _factionLev: UICompenent;
        private _factionGong: UICompenent;

        private initUI(): void {
            this.addUIList(["t_win_bg1", "t_win_bg2"], this.winmidRender);
            this.addUIList(["t_win_title", "t_line1", "t_line2"], this._bgRender);

            this._skillIcon = this.addChild(this._baseRender.getComponent("t_icon"));
            this._skillName = this.addChild(this._baseRender.getComponent("t_lab1"));
            this._skillLev = this.addChild(this._baseRender.getComponent("t_lab2"));

            var ui: UICompenent;

            ui = this.addChild(this._baseRender.getComponent("t_lab3"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "当前效果", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._skillCurLevDesc = this.addChild(this._baseRender.getComponent("t_lab4"));
            ui = this.addChild(this._baseRender.getComponent("t_lab5"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "下级效果", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this._skillNextLevDesc = this.addChild(this._baseRender.getComponent("t_lab6"));

            ui = this.addChild(this._baseRender.getComponent("t_lab7"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "升级消耗", 16, TextAlign.CENTER, ColorType.colorb96d49);
            this._skillCost = this.addChild(this._baseRender.getComponent("t_lab8"));
            this._skillMax = this.addChild(this._baseRender.getComponent("t_lab9"));
            ui = this.addChild(this._baseRender.getComponent("t_lab10"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "(提高技能坊等级可以提高技能等级上限)", 14, TextAlign.CENTER, ColorType.colorcd2000);

            ui = this.addChild(this._baseRender.getComponent("t_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.upLev, this);

            this._factionLev = this.addChild(this._baseRender.getComponent("t_lab11"));
            this._factionGong = this.addChild(this._baseRender.getComponent("t_lab12"));

            //this.drawSkill();
            this.drawBase();
            this.drawMax();
        }

        private upLev($e: InteractiveEvent): void {
            if (this.curData) {
                if (this.curData.lev >= this._levelLimit) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "技能等级已达上限", 99);
                    return;
                }
                var idx: number = 10000 * this.curData.id + this.curData.lev + 1;
                var tabObj: any = TableData.getInstance().getData(TableData.tb_faction_skill_lvup, idx);
                if (tabObj) {                   
                    if(!hasEnoughRes(tabObj.cost[0])){
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前家族贡献不足，无法升级", 99);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = 6
                        ModuleEventManager.dispatchEvent($aaa);
                        return;
                    }
                }
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_SKILL_LVUP, this.curData.id, 0, "", "");
            }
        }

        public dataChg(): void {
            this._slist.dataChg();
        }

        private _levelLimit: number = 0;
        private drawMax(): void {
            var vo: tb.TB_faction_building = FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_SKILL);
            var tabObj: any = TableData.getInstance().getData(TableData.tb_faction_skill_building, vo.level);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillMax.skinName,
                ColorType.Brown7a2f21 + "当前技能等级上限：" + ColorType.colorff7200 + tabObj.level_limit, 16, TextAlign.LEFT);
            UiDraw.drawTxtLab(this._factionLev, ColorType.Brown7a2f21 + "家族技能坊Lv:" + vo.level, 16, TextAlign.CENTER);
            this._levelLimit = tabObj.level_limit;
        }

        private _lastSkillID: number = -1;
        private drawSkill($data: any): void {

            var objskill: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($data.skillID);
            if (this._lastSkillID != $data.skillID) {
                IconManager.getInstance().drawCircleIcon(this._skillIcon, 2, $data.skillID);
                this._lastSkillID = $data.skillID;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillName.skinName, objskill.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            }

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillLev.skinName, "LV" + $data.lev, 16, TextAlign.LEFT, ColorType.colorff7200);

            if ($data.lev == 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCurLevDesc.skinName, "无", 16, TextAlign.LEFT, ColorType.Green2ca937);
            } else {
                var desc: string = tb.SkillDataVo.getSkillDesc($data.skillID, $data.lev);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCurLevDesc.skinName, desc, 16, TextAlign.LEFT, ColorType.Green2ca937);
            }

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillNextLevDesc.skinName, tb.SkillDataVo.getSkillDesc($data.skillID, $data.lev + 1), 16, TextAlign.LEFT, ColorType.Green2ca937);

            var idx: number = 1000 * $data.id + $data.lev + 1;
            var tabObj: any = TableData.getInstance().getData(TableData.tb_faction_skill_lvup, idx);
            if (tabObj) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._skillCost.skinName,
                    ColorType.Brown7a2f21 + "消耗个人家族贡献：" + ColorType.color4392ff + tabObj.cost[0][1], 16, TextAlign.LEFT);
            } else {
                console.log("---家族技能等级无----",tabObj,idx,$data.id,$data.lev);
                UiDraw.clearUI(this._skillCost);
            }
        }

        public drawBase(): void {
            UiDraw.drawTxtLab(this._factionGong, ColorType.Brown7a2f21 + "家族贡献:" + GuidData.player.getResTypeStr(6), 16, TextAlign.CENTER);
        }
        private curData: any;
        public setData($data: any): void {
            this.drawSkill($data);
            this.curData = $data;
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 6]);
            SceneManager.getInstance().render = false;

            this._slist.show();
            if (this._baseRender.uiAtlas) {
                this.drawMax();
            }


            var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            SceneManager.getInstance().render = true;
            this._slist.hide();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            super.hide();
        }


    }


    export class FactionSkillList extends SList {
        public mainPanel: FactionSkillPanel;
        public constructor() {
            super();
        }

        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            this.initData();
        }
        private _hasInit: boolean = false;
        public initData(): void {
            var ary: Array<SListItemData> = this.getDataAry();
            var w: number = 536;
            var h: number = 380;
            this.setData(ary, FactionSkillListItemRender, w, h, 270, 95, 4, 512, 512, 2, 6, 2);
            this.center = -150;
            this.middle = 5;
            this.setShowLevel(4);
            this._hasInit = true;
            this.setSelectIndex(1);
        }

        public refreshAll(): void {
            if (this._hasInit) {
                var ary: Array<SListItemData> = this.getDataAry();
                this.refreshData(ary);
            }

        }

        public getDataAry(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var vo: tb.TB_faction_building = FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_SKILL)
            var size: number = TableData.getInstance().getTabSize(TableData.tb_faction_skill_base);
            for (var i: number = 1; i <= size; i++) {
                var tabObj: any = TableData.getInstance().getData(TableData.tb_faction_skill_base, i);

                var idata: any = new Object;
                idata.skillID = tabObj.skill_id;
                idata.lock = vo.level < tabObj.unlock_level;
                idata.lockLev = tabObj.unlock_level;
                idata.lev = GuidData.player.getFactionSkillLv(i);
                idata.id = i;

                var data: SListItemData = new SListItemData();
                data.data = idata;
                data.id = i;
                ary.push(data);
            }
            return ary;
        }

        public dataChg(): void {
            for (var i: number = 0; i < this._dataAry.length; i++) {
                var cur: number = GuidData.player.getFactionSkillLv(i + 1);
                if (this._dataAry[i].data.lev != cur) {
                    this._dataAry[i].data.lev = cur
                    this._itemList[i].refreshDraw();
                }
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //var ary: Array<SListItemData> = this.getDataAry();
            //this.refreshData(ary);
            this.refreshAll();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }



    }

    export class FactionSkillListItemRender extends SListItem {
        //public static baseAtlas: UIAtlas;
        private _itme0: UICompenent;
        private _iitem1: UICompenent;
        private _iitem2: UICompenent;
        private _ibg: UICompenent;
        private _imask: UICompenent;

        private _container: UIConatiner;
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "s_bg", 0, 0, 256, 88, 10, 10);
            $container.addChild(this._ibg);
            this._ibg.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this._itme0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon", 15, 10, 68, 68);
            $container.addChild(this._itme0);

            this._imask = this.creatGrid9SUI($customizeRenderAry[0], this.parentTarget.baseAtlas, "s_mask", 0, 0, 256, 88, 10, 10);
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this._imask.skinName, UIData.publicUi, PuiData.MASK);

            this._iitem1 = this.creatSUI($customizeRenderAry[1], this.parentTarget.baseAtlas, "s_name", 100, 20, 140, 20);
            $container.addChild(this._iitem1);

            this._iitem2 = this.creatSUI($customizeRenderAry[1], this.parentTarget.baseAtlas, "s_lev", 100, 50, 140, 20);
            $container.addChild(this._iitem2);

            this._container = $container;

        }

        protected butClik(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && !this.itdata.data.lock) {
                this.setSelect();
            }
        }
        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyRender();
            }
            if (val) {
                (<FactionSkillList>this.parentTarget).mainPanel.setData(this.itdata.data);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data) {
                this.applyRender();
            }
        }

        public refreshDraw(): void {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, "Lv" + this.itdata.data.lev, 16, TextAlign.LEFT, ColorType.colorff7200);
            if (this._selected) {
                (<FactionSkillList>this.parentTarget).mainPanel.setData(this.itdata.data);
            }
        }

        private applyRender(): void {

            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_select);
            } else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            }


            var lock: boolean = this.itdata.data.lock;
            if (lock) {
                if (!this._imask.parent) {
                    this._container.addChild(this._imask);
                }
            } else {
                if (this._imask.parent) {
                    this._container.removeChild(this._imask);
                }
            }


            IconManager.getInstance().drawCircleIcon(this._itme0, 2, this.itdata.data.skillID);

            var objskill: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base(this.itdata.data.skillID);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem1.skinName, objskill.name, 16, TextAlign.LEFT, lock ? ColorType.Whitefff4d6 : ColorType.Brown7a2f21);
            if (lock) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, "技能坊等级" + this.itdata.data.lockLev + "级解锁", 16, TextAlign.LEFT, ColorType.Whitefff4d6);
            } else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this._iitem2.skinName, "Lv" + this.itdata.data.lev, 16, TextAlign.LEFT, ColorType.colorff7200);
            }

        }



    }

}