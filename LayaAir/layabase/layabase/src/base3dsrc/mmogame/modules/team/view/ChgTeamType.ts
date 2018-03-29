module team {

    export class ChgTeamType extends WindowMinUi {
        private _midRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _topupRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._topupRender.dispose();
            this._topupRender = null;

            if (this.tablist) {
                this.tablist.dispose();
                this.tablist = null;
            }
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
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._topupRender = new UIRenderComponent;
            this.addRender(this._topupRender)

            this._bgRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._bgRender.uiAtlas.setInfo("ui/uidata/team/team.xml", "ui/uidata/team/team.png", () => { this.loadConfigCom() }, "ui/uidata/team/teampc.png");
        }


        private b_minus_min: UICompenent
        private b_add_min: UICompenent
        private b_minus_max: UICompenent
        private b_add_max: UICompenent
        private b_index: UICompenent
        private b_btnbg_sure: UICompenent;
        private a_26_min: UICompenent;
        private a_26_max: UICompenent;
        private a_32_max: UICompenent;
        private a_32_min: UICompenent;
        private b_33max: UICompenent;
        private b_33min: UICompenent;
        private a_25_max: UICompenent;
        private a_25_min: UICompenent;
        private loadConfigCom(): void {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this._topupRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;

            this.addUIList(["b_line", "b_basebg", "b_title", "b_btntxt"], this._bgRender);
            this.addUIList(["b_targettitle1", "b_targettitle0", "a_27_max", "a_27_min"], this._midRender);
            this.addUIList(["b_maxlevtxt", "b_minlevtxt"], this._topRender);

            this.a_26_min = this.addChild(this._topRender.getComponent("a_26_min"));
            this.a_26_max = this.addChild(this._topRender.getComponent("a_26_max"));

            this.a_32_max = this.addChild(this._topRender.getComponent("a_32_max"));
            this.a_32_min = this.addChild(this._topRender.getComponent("a_32_min"));

            this.b_33max = this.addChild(this._topupRender.getComponent("b_33max"));
            this.b_33min = this.addChild(this._topupRender.getComponent("b_33min"));
            this.a_25_min = this.addEvntBut("a_25_min", this._topupRender);
            this.a_25_min.data = 0;
            this.a_25_max = this.addEvntBut("a_25_max", this._topupRender);
            this.a_25_max.data = 1;

            this.b_index = this.addChild(this._midRender.getComponent("b_index"))

            this.b_minus_min = this.addEvntButUp("b_minus_min", this._topRender);
            this.b_add_min = this.addEvntButUp("b_add_min", this._topRender);
            this.b_minus_max = this.addEvntButUp("b_minus_max", this._topRender);
            this.b_add_max = this.addEvntButUp("b_add_max", this._topRender);

            this.b_btnbg_sure = this.addEvntButUp("cnew_but_yes", this.winmidRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_sure, "b_btnbg_sure", this._topRender);

            this.resize();
            this.applyLoadComplete();
        }


        private _lastMouseX: number = 0;
        private _type: number = 0;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._type = evt.target.data;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {
            // var posx: number = (evt.x - this._lastMouseX) / UIData.Scale;
            var curx: number = evt.x / UIData.Scale
            curx = Math.min(curx, 678);
            curx = Math.max(curx, 421);
            var raio: number = (curx + 16 - 437) / 257
            if (this._type == 0) {
                var totalmin = this._curTypeVo.tab.tab.min_lev[1] - this._curTypeVo.tab.tab.min_lev[0]
                var finnum = Math.floor(raio * totalmin) + this._curTypeVo.tab.tab.min_lev[0];
                this._curTypeVo.minlev = finnum;
                this.drawMinPro();
            } else {
                var totalmax = this._curTypeVo.tab.tab.max_lev[1] - this._curTypeVo.tab.tab.max_lev[0]
                var finnum = Math.floor(raio * totalmax) + this._curTypeVo.tab.tab.max_lev[0];
                this._curTypeVo.maxlev = finnum;
                this.drawMaxPro();
            }
        }

        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.a_25_max:
                case this.a_25_min:
                    this.A_left_bg_MouseDown(evt);
                    break;
                case this.b_minus_min:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var minNum: number = this._curTypeVo.minlev - 1;
                    this._curTypeVo.minlev = Math.max(minNum, this._curTypeVo.tab.tab.min_lev[0]);
                    this.drawMinPro();
                    break;
                case this.b_add_min:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var minNum1: number = this._curTypeVo.minlev + 1;
                    this._curTypeVo.minlev = Math.min(minNum1, this._curTypeVo.tab.tab.min_lev[1]);
                    this.drawMinPro();
                    break;
                case this.b_minus_max:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var maxNum: number = this._curTypeVo.maxlev - 1;
                    this._curTypeVo.maxlev = Math.max(maxNum, this._curTypeVo.tab.tab.max_lev[0]);
                    this.drawMaxPro();
                    break;
                case this.b_add_max:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var maxNum1: number = this._curTypeVo.maxlev + 1;
                    this._curTypeVo.maxlev = Math.min(maxNum1, this._curTypeVo.tab.tab.max_lev[1]);
                    this.drawMaxPro();
                    break;
                case this.b_btnbg_sure:
                    if (this._curTypeVo.minlev > this._curTypeVo.maxlev) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "最小等级不能大于最大等级", 99)
                        return;
                    }
                    var $teamtype = new TeamEvent(TeamEvent.SURE_TEAMTYPE_PANEL)
                    $teamtype.data = this._curTypeVo
                    ModuleEventManager.dispatchEvent($teamtype);
                    NetManager.getInstance().protocolos.group_change_config(this._curTypeVo.tab.tab.id, this._curTypeVo.minlev, this._curTypeVo.maxlev, 1);
                    this.hide();
                    break;

                default:
                    break;
            }
        }

        private _curTypeVo: TabVo
        public resetData($tab: TabVo) {
            this._curTypeVo = $tab
            this.drawMinPro();
            this.drawMaxPro();
        }

        private drawMaxPro() {
            var totalmax = this._curTypeVo.tab.tab.max_lev[1] - this._curTypeVo.tab.tab.max_lev[0]
            var curmax = this._curTypeVo.maxlev - this._curTypeVo.tab.tab.max_lev[0];
            var raromax = curmax / totalmax;
            if (raromax == 0) {
                raromax = 0.01;
            }
            this.a_26_max.uvScale = raromax;

            var maxX: number = this.a_26_max.x + this.a_26_max.width * raromax - 16;
            maxX = Math.min(maxX, 672);
            this.a_32_max.x = maxX;
            this.b_33max.x = this.a_32_max.x + 2
            this.a_25_max.x = this.a_32_max.x + 4

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_33max.skinName, this._curTypeVo.maxlev + "级", 14, TextAlign.CENTER, ColorType.Whitefff7db);
        }

        private drawMinPro() {
            var totalmin = this._curTypeVo.tab.tab.min_lev[1] - this._curTypeVo.tab.tab.min_lev[0]
            var curmin = this._curTypeVo.minlev - this._curTypeVo.tab.tab.min_lev[0];
            var raromin = curmin / totalmin;
            if (raromin == 0) {
                raromin = 0.01;
            }
            this.a_26_min.uvScale = raromin;

            var maxX: number = this.a_26_min.x + this.a_26_min.width * raromin - 16;
            maxX = Math.min(maxX, 672);
            this.a_32_min.x = maxX;
            this.b_33min.x = this.a_32_min.x + 2
            this.a_25_min.x = this.a_32_min.x + 4

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_33min.skinName, this._curTypeVo.minlev + "级", 14, TextAlign.CENTER, ColorType.Whitefff7db);
        }


        public tablist: TeamTypeTabList;
        public show($tabvo: TabVo): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            if (!this.tablist) {
                this.tablist = new TeamTypeTabList;
                this.tablist.init(this._bgRender.uiAtlas);
            }
            this.tablist.show($tabvo);

            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
            if (this.tablist) {
                this.tablist.hide();
            }
        }

        public resize(): void {
            super.resize();
            if (this.tablist) {
                this.tablist.left = this.b_index.parent.x / UIData.Scale + this.b_index.x
                this.tablist.top = this.b_index.parent.y / UIData.Scale + this.b_index.y
            }

        }
    }


    export class TabVo {
        public tab: groupTypeVo;
        public minlev: number;
        public maxlev: number;
        // public id: number;
    }

    /**
     * 左侧tablist
     */
    export class TeamTypeTabList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, TeamTypeTabListRender, 152, 400, 0, 50, 8, 256, 512, 1, 10);
        }


        public getData($aary: Array<groupTypeVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $aary.length; i++) {
                var vo: TabVo = new TabVo;
                // vo.id = i;
                vo.tab = $aary[i];
                if (this._selvo.tab.tab.id == vo.tab.tab.id) {
                    vo.maxlev = this._selvo.maxlev
                    vo.minlev = this._selvo.minlev
                } else {
                    vo.maxlev = vo.tab.tab.max_lev[1]
                    vo.minlev = vo.tab.tab.min_lev[0]
                }

                var item: SListItemData = new SListItemData;
                item.data = vo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _selvo: TabVo;
        public show($vo: TabVo): void {
            this._selvo = $vo
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            var tbary: Array<groupTypeVo> = TeamModel.getInstance().getGroupTypeAry();
            var itemDataList = this.getData(tbary);
            this.refreshData(itemDataList);

            var idx: number = $vo.tab.idx - 1;
            this.scrollIdx(idx);
            this.setSelectIndex(idx);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class TeamTypeTabListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Tabbg: UICompenent;
        private Tabname: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Tabbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tabbg", 0, 0, 152, 48);
            $container.addChild(this.Tabbg);
            this.Tabbg.addEventListener(InteractiveEvent.Down, this.equClick, this);


            this.Tabname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Tabname", 26, 14, 100, 20);
            $container.addChild(this.Tabname);
        }

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
            if (val) {
                var bb = new TeamEvent(TeamEvent.SELECT_TEAMTYPE_PANEL);
                bb.data = this.itdata.data;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawTab(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Tabbg.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var vipRect3;
            if (this.selected) {
                vipRect3 = this.parentTarget.baseAtlas.getRec("Selectbg");
            } else {
                vipRect3 = this.parentTarget.baseAtlas.getRec("Unselectbg");
            }
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, vipRect3.pixelX, vipRect3.pixelY, vipRect3.pixelWitdh, vipRect3.pixelHeight, 0, 0, vipRect3.pixelWitdh, vipRect3.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var vo: TabVo = this.itdata.data;
                this.drawTab();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Tabname.skinName, vo.tab.tab.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Tabbg);
            UiDraw.clearUI(this.Tabname);
        }
    }
}