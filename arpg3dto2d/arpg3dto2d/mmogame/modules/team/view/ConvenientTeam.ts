module team {

    export class ConvenientTeam extends WindowMinUi {
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
            if (this.convenientList) {
                this.convenientList.dispose();
                this.convenientList = null;
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


        private c_index: UICompenent
        private c_index1: UICompenent
        private c_refrebtn: UICompenent
        private c_autobtn: UICompenent
        private c_buildbtn: UICompenent
        private loadConfigCom(): void {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this._topupRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;

            this.c_index = this.addChild(this._bgRender.getComponent("c_index"));
            this.c_index1 = this.addChild(this._bgRender.getComponent("c_index1"));

            this.addUIList(["c_line1", "c_basebg", "c_title"], this._bgRender);
            this.addUIList(["c_txt0", "c_baseline0", "c_line", "c_txt1", "c_baseline1", "c_txt2"], this._midRender);
            this.addUIList(["c_txt4", "c_txt3", "c_txt5"], this._topRender);

            this.c_autobtn = this.addEvntButUp("cnew_but_operation", this.winmidRender);
            this.setSizeForPanelUiCopy(this.c_autobtn, "c_autobtn", this._midRender);

            this.c_buildbtn = this.addEvntButUp("cnew_but_yes", this.winmidRender);
            this.setSizeForPanelUiCopy(this.c_buildbtn, "c_buildbtn", this._midRender);

            this.c_refrebtn = this.addEvntButUp("cnew_but_yes", this.winmidRender);
            this.setSizeForPanelUiCopy(this.c_refrebtn, "c_refrebtn", this._midRender);

            this.resize();
            this.applyLoadComplete();
        }

        private _cansend: boolean = true;
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                case this.c_buildbtn:
                    NetManager.getInstance().protocolos.group_create(this._curTypeVo.tab.tab.id, this._curTypeVo.minlev, this._curTypeVo.maxlev, 1);
                    this.hide();
                    break;
                case this.c_refrebtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    
                    if(this._cansend){
                        this._cansend = false;
                        this.sendmsg();
                        TimeUtil.addTimeOut(5000, () => {
                            this._cansend = true;
                        });
                    }else{
                        msgtip.MsgTipManager.outStr("[ff0000]冷却中...", 99);
                    }
                    break;
                case this.c_autobtn:
                    NetManager.getInstance().protocolos.auto_group_match(this._curTypeVo.tab.tab.id);
                    this.hide();
                    break;

                default:
                    break;
            }
        }

        private _curTypeVo: TabVo
        public resetData($tab: TabVo) {
            this._curTypeVo = $tab
            this.sendmsg();
        }

        private sendmsg() {
            NetManager.getInstance().protocolos.get_group_search_info_list(this._curTypeVo.tab.tab.id);
        }


        public tablist: TeamTypeTabList;
        public convenientList: ConvenientList;
        public show($tabvo: TabVo): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            if (!this.convenientList) {
                this.convenientList = new ConvenientList;
                this.convenientList.init(this._bgRender.uiAtlas);
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
            if (this.convenientList) {
                this.convenientList.hide();
            }
        }

        public resize(): void {
            super.resize();
            if (this.tablist) {
                this.tablist.left = this.c_index.parent.x / UIData.Scale + this.c_index.x
                this.tablist.top = this.c_index.parent.y / UIData.Scale + this.c_index.y
            }
            if (this.convenientList) {
                this.convenientList.left = this.c_index1.parent.x / UIData.Scale + this.c_index1.x
                this.convenientList.top = this.c_index1.parent.y / UIData.Scale + this.c_index1.y
            }

        }
    }

    export class ConvenientVo {
        public groupvo: group_search_info;
        public isselect: boolean;
    }

    /**
     * 便捷组队list
     */
    export class ConvenientList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, ConvenientListRender, 413, 288, 0, 58, 4, 256, 512, 1, 8);
        }

        public refreshDataByNewData($id: string): void {
            for (var i = 0; i < this._curAry.length; i++) {
                if ($id == this._curAry[i].data.groupvo.guid) {
                    this._curAry[i].data.isselect = true;
                }
            }
            this.refreshDraw();
        }


        public getData($aary: Array<group_search_info>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $aary.length; i++) {
                var vo: ConvenientVo = new ConvenientVo;
                vo.groupvo = $aary[i]
                vo.isselect = false;
                var item: SListItemData = new SListItemData;
                item.data = vo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _curAry: Array<SListItemData>
        public show($data: Array<group_search_info>): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            var itemDataList = this.getData($data);
            this._curAry = itemDataList;
            this.refreshData(itemDataList);

        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class ConvenientListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Csbtn: UICompenent;
        private Csname: UICompenent;
        private Csnum: UICompenent;
        private Csbg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Csbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Csbtn", 305, 7, 106, 47);
            $container.addChild(this.Csbtn);
            this.Csbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);


            this.Csname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Csname", 24, 20, 100, 20);
            $container.addChild(this.Csname);
            this.Csnum = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Csnum", 185, 20, 50, 20);
            $container.addChild(this.Csnum);
            this.Csbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Csbg", 6, 0, 407, 58);
            $container.addChild(this.Csbg);
        }


        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var vo: ConvenientVo = this.itdata.data;

                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Csbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.Csbg.skinName);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Csname.skinName, getBaseName(vo.groupvo.cap_name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Csnum.skinName, vo.groupvo.members + "/3", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Csbtn.skinName, vo.isselect ? "ApplyTeamOK" : "ApplyTeam");
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

        public refreshDraw() {
            this.render(this.itdata);
        }

        private equClick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo: ConvenientVo = this.itdata.data;
                if (vo.isselect) {
                    return;
                }
                NetManager.getInstance().protocolos.group_join_request(vo.groupvo.guid);
                var bb = new TeamEvent(TeamEvent.CONVENIENT_SELECT_PANEL);
                bb.data = vo.groupvo.guid;
                ModuleEventManager.dispatchEvent(bb);

            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Csbtn);
            UiDraw.clearUI(this.Csname);
            UiDraw.clearUI(this.Csnum);
            UiDraw.clearUI(this.Csbg);
        }
    }

}