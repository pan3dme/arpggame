module divinesword {
    export class SkillItemCell {
        public skillui: UICompenent
        public parent: DivineswordSkill
        public data: SkillItemData;
        public redPoint: RedPointNode;
        public effup: FrameTipCompenent;
        public effko: FrameTipCompenent
        private _selected: boolean = false;

        public get selected(): boolean {
            return this._selected;
        }
        public set selected(val: boolean) {
            if (this._selected == val) {
                return;
            }
            this._selected = val;
            this.drawUi();
        }

        public get redShow(): boolean {
            if (!this.redPoint) {
                return false;
            }
            return this.redPoint.show;
        }

        private drawUi(): void {
            var $rec: UIRectangle = this.skillui.uiRender.uiAtlas.getRec(this.skillui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            //252 315
            // var levstr: string = "未解锁"
            var recstr: string = "Lineh" + this.data.baskData.line;
            if (this.data.lev > 0) {
                // levstr = "LV" + this.data.lev;
                recstr = "Line" + this.data.baskData.line;
            }
            var imgUseRect: UIRectangle = this.skillui.uiRender.uiAtlas.getRec(recstr);
            ctx.drawImage(this.skillui.uiRender.uiAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 3, imgUseRect.pixelWitdh, imgUseRect.pixelHeight);

            var imgUseRect1: UIRectangle = this.skillui.uiRender.uiAtlas.getRec("Levbg");
            ctx.drawImage(this.skillui.uiRender.uiAtlas.useImg, imgUseRect1.pixelX, imgUseRect1.pixelY, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight, 0, 50, imgUseRect1.pixelWitdh, imgUseRect1.pixelHeight);

            var basetab = tb.TB_skill_base.get_TB_skill_base(this.data.baskData.id);
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, basetab.name, 13, 25, 51, TextAlign.CENTER, ColorType.Whitefff4d6)

            if (this._selected) {
                UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(1, 4, 44, 44), UIData.publicUi);
            }

            // UiDraw.cxtDrawImg(ctx, PuiData.A_JIANTOU, new Rectangle(25, 0, 26, 33), UIData.publicUi);

            this.skillui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public refresh() {
            if (!this.data) {
                return;
            }
            var lev: number = GuidData.player.getPassiveSkillLev(this.data.id);
            if (lev == this.data.lev) {
                return;
            }
            this.data.lev = lev;
            if (this.data.lev > 0) {
                this.data.levData = tb.TB_skill_uplevel.get_TB_skill_uplevel(this.data.skillbaseData.uplevel_id[0] + this.data.lev - 1);
            }
            this.drawUi();
            this.refreshSel();
        }

        public refreshSel() {
            if (this._selected) {
                this.parent.setSel(this);
            }
        }



        public initRedpoint($id: number, $redPointRender: RedPointRender) {
            var pnode: RedPointNode = RedPointManager.getInstance().getNodeByID(128);
            if (pnode.children[$id]) {
                var red: RedPointCompenent = $redPointRender.getRedPointUI(this.parent, 0, new Vector2D(this.skillui.x + this.skillui.width - 8, this.skillui.y), "style1");
                pnode.children[$id].bindUI(red);
                this.redPoint = pnode.children[$id];
            }
        }
    }

    export class SkillItemData {
        public id: number;
        public lev: number;
        public skillbaseData: tb.TB_skill_base;
        public levData: tb.TB_skill_uplevel;
        public baskData: tb.TB_adventure_skill_base;
    }

    export class DivineswordSkill extends UIVirtualContainer {
        private _winRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _topbgRender: UIRenderComponent;
        private _toptopRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _frameRender: FrameUIRender;
        private _frameRedRender: FrameUIRender;
        private _frameBuleRender: FrameUIRender;
        private _frameRedKoRender: FrameUIRender;
        private _frameBuleKoRender: FrameUIRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._topbgRender.dispose();
            this._topbgRender = null;
            this._toptopRender.dispose();
            this._toptopRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;

            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            if (this._frameRedRender) {
                this._frameRedRender.dispose();
                this._frameRedRender = null;
            }
            if (this._frameBuleRender) {
                this._frameBuleRender.dispose();
                this._frameBuleRender = null;
            }
            if (this._frameRedKoRender) {
                this._frameRedKoRender.dispose();
                this._frameRedKoRender = null;
            }
            if (this._frameBuleKoRender) {
                this._frameBuleKoRender.dispose();
                this._frameBuleKoRender = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._frameRender = new FrameUIRender();
            this.addRender(this._frameRender);
            this._frameBuleKoRender = new FrameUIRender();
            this.addRender(this._frameBuleKoRender);
            this._frameRedKoRender = new FrameUIRender();
            this.addRender(this._frameRedKoRender);
            this._frameBuleRender = new FrameUIRender();
            this.addRender(this._frameBuleRender);
            this._frameRedRender = new FrameUIRender();
            this.addRender(this._frameRedRender);
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._topbgRender = new UIRenderComponent;
            this.addRender(this._topbgRender)
            this._toptopRender = new UIRenderComponent;
            this.addRender(this._toptopRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);
        }

        public initUiAtlas($uiAtlas, $winrender: UIRenderComponent): void {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._topbgRender.uiAtlas = $uiAtlas;
            this._toptopRender.uiAtlas = $uiAtlas;
            this._winRender = $winrender;
            this.initRedeffect();
        }

        private _cnew_right_bg_top: UICompenent
        private _cnew_right_bg_bottom: UICompenent
        private b_unlockbg: UICompenent
        private b_unlockarrow: UICompenent
        private b_unlockinfo: UICompenent
        private skilllist: Array<SkillItemCell>
        private initView(): void {
            var renderLevel = this._baseRender;

            this._cnew_right_bg_top = this._winRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(this._cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            this._cnew_right_bg_bottom = this._winRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(this._cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);

            this._winRender.applyObjData();

            var tabary: Array<tb.TB_adventure_skill_base> = tb.TB_adventure_skill_base.get_TB_quest_adventure_base();

            this.skilllist = new Array
            for (let i = 0; i < 10; i++) {
                var cell: SkillItemCell = new SkillItemCell();
                cell.parent = this;
                cell.skillui = this.addChild(renderLevel.getComponent("b_skill" + i));
                cell.skillui.data = cell;
                cell.skillui.addEventListener(InteractiveEvent.Up, this.onClick, this);
                var vo: SkillItemData = new SkillItemData();
                vo.id = tabary[i].id
                vo.baskData = tabary[i]
                vo.skillbaseData = tb.TB_skill_base.get_TB_skill_base(vo.id);

                cell.initRedpoint(i, this._redPointRender);

                if (vo.baskData.line == 1) {
                    cell.effko = this.effredkoAry[i];
                    cell.effup = this.effredAry[i];
                } else {
                    cell.effko = this.effbluekoAry[i - 5];
                    cell.effup = this.effblueAry[i - 5];
                }

                cell.data = vo;
                this.skilllist.push(cell);
            }

            var ui: UICompenent = (<DivineswordUiPanel>this.parent).loadBigPicByUrl("ui/load/training/trainingskillbg.jpg");
            this.parent.setSizeForPanelUiCopy(ui, "ccav", this._baseRender);

            this.initSelSkilPanel();

            this.b_unlockbg = <UICompenent>this._topbgRender.getComponent("b_unlockbg");
            this.b_unlockarrow = <UICompenent>this._topbgRender.getComponent("b_unlockarrow");
            this.b_unlockinfo = <UICompenent>this._toptopRender.getComponent("b_unlockinfo");

            // this.setSel(this.skilllist[0]);
            this._complete = true;
            this.show();
        }
        private _complete: boolean = false;

        public drawUnlock($cell: SkillItemCell) {
            var prevflag: boolean;
            var tab: tb.TB_adventure_skill_base = $cell.data.baskData;
            if (tab.prev_limit[0]) {
                prevflag = training.TrainingModel.getInstance().getprev_limitflag(tab.prev_limit[0])
            } else {
                //前置条件不存在
                prevflag = true;
            }

            prevflag = !prevflag && $cell.data.lev == 0

            this.setUiListVisibleByItem([this.b_unlockarrow, this.b_unlockbg, this.b_unlockinfo], prevflag);
            if (prevflag) {
                var str: string = training.TrainingModel.getInstance().getprev_limitstr($cell.data.baskData.prev_limit[0]);
                var ary: Array<number> = LabelTextFont.writeText(this._topRender.uiAtlas, this.b_unlockinfo.skinName, 0, 0, str, 16, "#fff4d6", 225, true);
                this.b_unlockbg.width = ary[0] + 30
                this.b_unlockbg.height = ary[1] + 20

                this.b_unlockarrow.x = $cell.skillui.x + $cell.skillui.width
                this.b_unlockarrow.y = $cell.skillui.y + 14;

                this.b_unlockbg.x = this.b_unlockarrow.x + this.b_unlockarrow.width - 2
                this.b_unlockbg.y = this.b_unlockarrow.y - (this.b_unlockbg.height - this.b_unlockarrow.height) / 2

                this.b_unlockinfo.x = this.b_unlockbg.x + 15
                this.b_unlockinfo.y = this.b_unlockbg.y + 10

                this._topbgRender.applyObjData();
            }
        }

        private onClick($e: InteractiveEvent): void {
            if ($e.target.data.data) {
                this.setSel($e.target.data);
            }
        }

        private upLevEff: FrameTipCompenent;
        public showSkillUpEff(): void {
            console.log("up skill lev");
            if (this.upLevEff) {
                this.upLevEff.playOne(this);
            } else {
                this._frameRender.setImg(getEffectUIUrl("ui_jn"), 4, 4, ($ui: any) => {
                    this.upLevEff = $ui;
                    this.upLevEff.x = this.b_skillicon.x - 30;
                    this.upLevEff.y = this.b_skillicon.y - 30;
                    //this.upLevEff.width = this.upLevEff.baseRec.width * 0.8;
                    //this.upLevEff.height = this.upLevEff.baseRec.height * 0.8;
                    this.upLevEff.speed = 1;
                    this.upLevEff.playOne(this);
                })
            }
        }


        private effredAry: Array<FrameTipCompenent>;
        private effblueAry: Array<FrameTipCompenent>;
        private effredkoAry: Array<FrameTipCompenent>;
        private effbluekoAry: Array<FrameTipCompenent>;
        public initRedeffect() {
            if (!this.effredAry) {
                this._frameRedRender.setImg(getEffectUIUrl("ef_jh_red"), 4, 4, ($ary: any) => {
                    this.effredAry = $ary;
                    for (var i: number = 0; i < this.effredAry.length; i++) {
                        this.effredAry[i].width = this.effredAry[i].baseRec.width;
                        this.effredAry[i].height = this.effredAry[i].baseRec.height;
                        this.effredAry[i].speed = 3;
                    }
                    this.initBuleeffect();
                }, 5);
            } else {
                this.initBuleeffect();
            }
        }
        public initBuleeffect() {
            if (!this.effblueAry) {
                this._frameBuleRender.setImg(getEffectUIUrl("ef_jh_blue"), 4, 4, ($ary: any) => {
                    this.effblueAry = $ary;
                    for (var i: number = 0; i < this.effblueAry.length; i++) {
                        this.effblueAry[i].width = this.effblueAry[i].baseRec.width;
                        this.effblueAry[i].height = this.effblueAry[i].baseRec.height;
                        this.effblueAry[i].speed = 3;
                    }
                    this.initredkoeffect();
                }, 5);
            } else {
                this.initredkoeffect();
            }
        }
        public initredkoeffect() {
            if (!this.effredkoAry) {
                this._frameRedKoRender.setImg(getEffectUIUrl("ef_jh_red_ko"), 4, 4, ($ary: any) => {
                    this.effredkoAry = $ary;
                    for (var i: number = 0; i < this.effredkoAry.length; i++) {
                        this.effredkoAry[i].width = this.effredkoAry[i].baseRec.width;
                        this.effredkoAry[i].height = this.effredkoAry[i].baseRec.height;
                        this.effredkoAry[i].speed = 3;
                    }
                    this.initbluekoeffect();
                }, 5);
            } else {
                this.initbluekoeffect();
            }
        }

        public initbluekoeffect() {
            if (!this.effbluekoAry) {
                this._frameBuleKoRender.setImg(getEffectUIUrl("ef_jh_blue_ko"), 4, 4, ($ary: any) => {
                    this.effbluekoAry = $ary;
                    for (var i: number = 0; i < this.effbluekoAry.length; i++) {
                        this.effbluekoAry[i].width = this.effbluekoAry[i].baseRec.width;
                        this.effbluekoAry[i].height = this.effbluekoAry[i].baseRec.height;
                        this.effbluekoAry[i].speed = 3;
                    }
                    this.initView();
                }, 5);
            } else {
                this.initView();
            }
        }



        private b_skillicon: UICompenent
        private b_skillname: UICompenent
        private b_skilllev: UICompenent
        private b_info: UICompenent
        private b_info1: UICompenent
        private b_force: UICompenent
        private b_force1: UICompenent
        private b_cost0: UICompenent
        private b_cost1: UICompenent
        private uplevbtn: FrameCompenent
        private b_btninfo: UICompenent
        private selRedPoint: RedPointCompenent
        private initSelSkilPanel(): void {
            this.addUIList(["b_titlebg", "b_titlebg1"], this._bgRender);

            this.b_skillicon = this.addChild(this._baseRender.getComponent("b_skillicon"));
            this.b_skillname = this.addChild(this._baseRender.getComponent("b_skillname"));
            this.b_skilllev = this.addChild(this._baseRender.getComponent("b_skilllev"));
            var b_title = this.addChild(this._baseRender.getComponent("b_title"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, b_title.skinName, "效果说明", 16, TextAlign.CENTER, ColorType.colorb96d49);
            var b_title1 = this.addChild(this._baseRender.getComponent("b_title1"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, b_title1.skinName, "升级条件", 16, TextAlign.CENTER, ColorType.colorb96d49);

            this.b_info = this.addChild(this._topRender.getComponent("b_info"));
            this.b_force = this.addChild(this._topRender.getComponent("b_force"));
            this.b_info1 = this.addChild(this._topRender.getComponent("b_info1"));
            this.b_force1 = this.addChild(this._topRender.getComponent("b_force1"));

            this.b_cost0 = this.addChild(this._topRender.getComponent("b_cost0"));
            this.b_cost1 = this.addChild(this._topRender.getComponent("b_cost1"));

            this.b_btninfo = this.addChild(this._topRender.getComponent("b_btninfo"));
            this.uplevbtn = <FrameCompenent>this.addChild(this._topRender.getComponent("b_uplevbtn"));
            this.uplevbtn.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.selRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.uplevbtn.x + this.uplevbtn.width, this.uplevbtn.y));
        }

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }

        public refreshLev(): void {
            for (var i: number = 0; i < this.skilllist.length; i++) {
                var cell: SkillItemCell = this.skilllist[i];
                cell.refresh();
                // var effkoui: FrameTipCompenent = cell.data.baskData.line == 1 ? this.effredkoAry[cell.data.baskData.idx - 1] : this.effbluekoAry[cell.data.baskData.idx - 6];
                // var effui: FrameTipCompenent = cell.data.baskData.line == 1 ? this.effredAry[cell.data.baskData.idx - 1] : this.effblueAry[cell.data.baskData.idx - 6];
                if (cell.data.lev > (cell.data.skillbaseData.uplevel_id[1] - cell.data.skillbaseData.uplevel_id[0])) {
                    //满级
                    this.removeChild(cell.effup);
                    this.playeff(cell.effko, cell.skillui);
                } else if (cell.redShow) {
                    //如果可升级
                    this.removeChild(cell.effko);
                    this.playeff(cell.effup, cell.skillui);
                } else {
                    this.removeChild(cell.effko);
                    this.removeChild(cell.effup);
                }
            }
        }

        private playeff($effui: FrameTipCompenent, $ui: UICompenent) {
            $effui.x = $ui.x - 8;
            $effui.y = $ui.y - 6;
            this.addChild($effui);
            $effui.play();
        }

        public refreshSel(): void {
            for (var i: number = 0; i < this.skilllist.length; i++) {
                this.skilllist[i].refreshSel();
            }
        }

        public setSel($item: SkillItemCell): void {
            for (var i: number = 0; i < this.skilllist.length; i++) {
                if (this.skilllist[i] == $item) {
                    this.skilllist[i].selected = true;
                    //绘制未解锁弹窗
                    this.drawUnlock(this.skilllist[i]);
                } else {
                    this.skilllist[i].selected = false;
                }
            }
            this.drawSelSkill($item);//, $item.redShow
        }

        private _curCell: SkillItemCell
        public drawSelSkill($vo: SkillItemCell) {
            this._curCell = $vo;
            var strlev: string = ColorType.colorce0a00 + "未解锁"
            if ($vo.data.lev > 0) {
                strlev = ColorType.Brown7a2f21 + "等级：" + ColorType.colorff7200 + $vo.data.lev
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_skilllev.skinName, strlev, 16, TextAlign.LEFT, ColorType.colorb96d49);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_skillname.skinName, $vo.data.skillbaseData.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            IconManager.getInstance().drawCircleIcon(this.b_skillicon, 2, $vo.data.skillbaseData.id);

            this._needcost = $vo.data.baskData.cost[0];
            var cureff: string = ColorType.Brown7a2f21 + "当前效果：" + ColorType.Green2ca937 + "待激活"
            var curforce: string = ColorType.Brown7a2f21 + "战力:" + ColorType.color4392ff + "0"
            if ($vo.data.lev > 0) {
                this._needcost = $vo.data.levData.uplevel_cost[0];
                cureff = ColorType.Brown7a2f21 + "当前效果：" + ColorType.Green2ca937 + tb.SkillDataVo.getSkillDesc($vo.data.id, $vo.data.lev);
                curforce = ColorType.Brown7a2f21 + "战力:" + ColorType.color4392ff + $vo.data.levData.fight_value
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_info.skinName, cureff, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_force.skinName, curforce, 14, TextAlign.LEFT);

            var nextlevData: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, $vo.data.skillbaseData.uplevel_id[0] + $vo.data.lev);
            if ($vo.data.lev > ($vo.data.skillbaseData.uplevel_id[1] - $vo.data.skillbaseData.uplevel_id[0])) {
                nextlevData = null;
            }

            var nexeff: string = ColorType.Brown7a2f21 + "下级效果：" + ColorType.Green2ca937 + "已满级"
            var nexforce: string = ""
            if (nextlevData) {
                nexeff = ColorType.Brown7a2f21 + "下级效果：" + ColorType.Green2ca937 + tb.SkillDataVo.getSkillDesc($vo.data.id, $vo.data.lev + 1);
                nexforce = ColorType.Brown7a2f21 + "战力:" + ColorType.color4392ff + nextlevData.fight_value
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_info1.skinName, nexeff, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_force1.skinName, nexforce, 14, TextAlign.LEFT);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_cost0.skinName, "需求" + getResName(this._needcost[0]) + ": " + this._needcost[1], 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.updataRes();

            if (nextlevData) {
                this.setUiListVisibleByItem([this.uplevbtn], true);
                this.b_btninfo.y = 496;
                if ($vo.data.baskData.prev_limit[0]) {
                    if (!training.TrainingModel.getInstance().getprev_limitflag($vo.data.baskData.prev_limit[0])) {
                        //多少级解锁
                        this.uplevbtn.goToAndStop(1);
                        // var basetab = tb.TB_skill_base.get_TB_skill_base($vo.data.baskData.prev_limit[0][0]);
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_btninfo.skinName, training.TrainingModel.getInstance().getprev_limitstr($vo.data.baskData.prev_limit[0]), 16, TextAlign.CENTER, ColorType.colorce0a00);
                    } else {
                        //按钮
                        UiDraw.clearUI(this.b_btninfo);
                        this.uplevbtn.goToAndStop(0);
                    }
                } else {
                    //按钮
                    UiDraw.clearUI(this.b_btninfo);
                    this.uplevbtn.goToAndStop(0);
                }
            } else {
                //已满级
                this.b_btninfo.y = 464;
                this.setUiListVisibleByItem([this.uplevbtn], false);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_btninfo.skinName, "已满级", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this.refreshredpoint();
        }

        public refreshredpoint() {
            if (this._curCell.redShow) {
                this.selRedPoint.preShow();
            } else {
                this.selRedPoint.preHide();
            }
        }

        private _canuplev: boolean;
        private _needcost: Array<number>;
        public updataRes() {
            if (this._needcost && this._needcost.length > 0) {
                var str: string = ColorType.colorce0a00
                this._canuplev = false;
                if (GuidData.player.getResType(this._needcost[0]) >= this._needcost[1]) {
                    str = ColorType.Green2ca937
                    this._canuplev = true;
                }
                str += GuidData.player.getResTypeStr(this._needcost[0])
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_cost1.skinName, ColorType.Brown7a2f21 + "拥有" + getResName(this._needcost[0]) + ": " + str, 16, TextAlign.LEFT);
            }
        }

        public initSelect() {
            this.skilllist.sort(
                function (a: SkillItemCell, b: SkillItemCell): number {
                    return a.data.baskData.order - b.data.baskData.order;
                }
            );
            var flag: boolean = true;
            for (var i: number = 0; i < this.skilllist.length; i++) {
                if (!this.skilllist[i].data) {
                    continue;
                }
                if (this.skilllist[i].data.lev == 0) {
                    flag = false;
                    this.setSel(this.skilllist[i]);
                    break;
                }
            }
            if (flag) {
                this.setSel(this.skilllist[0]);
            }
        }

        public show(): void {
            if (!this._complete) {
                return;
            }
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.setUiListVisibleByItem([this._cnew_right_bg_top, this._cnew_right_bg_bottom], true);
                (<DivineswordUiPanel>this.parent).addBigPic();
                this.refreshLev();
                this.initSelect();
                this.resize();
            }
        }

        public hide(): void {
            this.setUiListVisibleByItem([this._cnew_right_bg_top, this._cnew_right_bg_bottom], false);
            (<DivineswordUiPanel>this.parent).removeBigPic();
            UIManager.getInstance().removeUIContainer(this);
        }

        private _canclick: boolean = true;
        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.uplevbtn:
                    if (this._canclick) {
                        this._canclick = false;
                        TimeUtil.addTimeOut(500, () => {
                            this._canclick = true;
                        });
                        if (this.uplevbtn.current == 1) {
                            console.log("---this._curCell.data.baskData.goto[0]---", this._curCell.data.baskData.goto[0]);
                            this.meshQuestTargets(this._curCell.data.baskData.goto[0]);
                        } else {
                            if (this._canuplev) {
                                NetManager.getInstance().protocolos.raise_adventurespell(this._curCell.data.id);
                            } else {
                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = this._needcost[0]
                                ModuleEventManager.dispatchEvent($aaa);
                            }
                        }
                    }

                    break;
                // case this.a_arrowright:
                //     this.curpage++;
                //     break;

                default:
                    break;
            }
        }

        public meshQuestTargets($gotoVo: Array<number>): void {
            if ($gotoVo) {
                var $type: number = $gotoVo[0]

                switch ($type) {
                    case 2:
                        if (!GuidData.player.getsyspageopen($gotoVo[1], $gotoVo[2])) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "系统未开启", 99);
                            return;
                        }
                        ModulePageManager.openPanel($gotoVo[1], $gotoVo[2]);
                        break;
                    default:
                        break
                }
            }

        }

    }
}