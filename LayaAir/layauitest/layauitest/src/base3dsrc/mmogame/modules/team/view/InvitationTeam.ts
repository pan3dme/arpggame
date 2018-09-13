module team {

    export class InvitationTeam extends WindowMinUi {
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

            if (this.incitationList) {
                this.incitationList.dispose();
                this.incitationList = null;
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

        private TabAry: Array<SelectButton>
        private d_index: UICompenent
        private loadConfigCom(): void {
            this._midRender.uiAtlas = this._bgRender.uiAtlas;
            this._topRender.uiAtlas = this._bgRender.uiAtlas;
            this._topupRender.uiAtlas = this._bgRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;

            this.d_index = this.addChild(this._bgRender.getComponent("d_index"));

            this.addUIList(["d_line", "d_basebg", "d_title"], this._bgRender);
            this.addUIList(["d_txt1", "d_txt2", "d_txt0"], this._midRender);
            // this.addUIList(["c_txt4", "c_txt3", "c_txt5"], this._topRender);

            this.TabAry = new Array
            for (let i = 0; i < 3; i++) {
                var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
            }

            this.resize();
            this.applyLoadComplete();
        }

        public selectedTab($value: number) {
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }

            this.incitationList.show(TeamModel.getInstance().getInvitationList($value));
        }


        private click(evt: InteractiveEvent): void {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);

        }

        private _cansend: boolean = true;
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        }

        // private _curTypeVo: TabVo
        // public resetData($tab: TabVo) {
        //     this._curTypeVo = $tab
        // }



        public incitationList: IncitationList;
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            if (!this.incitationList) {
                this.incitationList = new IncitationList;
                this.incitationList.init(this._bgRender.uiAtlas);
            }
            this.selectedTab(0);
            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
            if (this.incitationList) {
                this.incitationList.hide();
            }
        }

        public resize(): void {
            super.resize();
            if (this.incitationList) {
                this.incitationList.left = this.d_index.parent.x / UIData.Scale + this.d_index.x
                this.incitationList.top = this.d_index.parent.y / UIData.Scale + this.d_index.y
            }

        }
    }


    /**
     * 邀请组队list
     */
    export class IncitationList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, IncitationListRender, 407, 388, 0, 87, 4, 256, 1024, 1, 8);
        }

        public refreshDataByNewData($id: string): void {
            for (var i = 0; i < this._curAry.length; i++) {
                if ($id == this._curAry[i].data.guid) {
                    this._curAry[i].data.isflag = true;
                }
            }
            this.refreshDraw();
        }


        public getData($aary: Array<InvitationCell>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $aary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $aary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private _curAry: Array<SListItemData>
        public show($data: Array<InvitationCell>): void {
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

    export class IncitationListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Dsbtn: UICompenent;
        private Dsname: UICompenent;
        private Dslev: UICompenent;
        private Dsbg: UICompenent;
        private Dsicon: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Dsbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dsbtn", 299, 20, 106, 47);
            $container.addChild(this.Dsbtn);
            this.Dsbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.Dsicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dsicon", 9, 8, 68, 68);
            $container.addChild(this.Dsicon);

            this.Dsname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dsname", 96, 15, 100, 20);
            $container.addChild(this.Dsname);

            this.Dslev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Dslev", 96, 45, 100, 20);
            $container.addChild(this.Dslev);

            this.Dsbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Dsbg", 0, 0, 407, 87);
            $container.addChild(this.Dsbg);
        }


        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var vo: InvitationCell = this.itdata.data;
                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Dsbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.Dsbg.skinName);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Dsname.skinName, getBaseName(vo.name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Dslev.skinName, vo.lev + "级", 16, TextAlign.LEFT, ColorType.Green2ca937);
                TeamModel.getInstance().loadRolePic(vo.icon, this.Dsicon,vo.online);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Dsbtn.skinName, vo.isflag ? "ApplyTeamOK" : "InvitationTeam");
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
                var vo: InvitationCell = this.itdata.data;
                if (vo.isflag) {
                    return;
                }
                if(!vo.online){
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "玩家不在线", 99)
                    return;
                }
                if (!GuidData.team) {
                    //如果没有队伍。先创建队伍
                    ModuleEventManager.dispatchEvent(new TeamEvent(TeamEvent.BUILD_TEAM_PANEL));
                }
                NetManager.getInstance().protocolos.group_send_invite(vo.guid);
                var bb = new TeamEvent(TeamEvent.CONVENIENT_SELECT_PANEL);
                bb.data = vo.guid;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Dsbtn);
            UiDraw.clearUI(this.Dsname);
            UiDraw.clearUI(this.Dslev);
            UiDraw.clearUI(this.Dsbg);
            UiDraw.clearUI(this.Dsicon);
        }
    }

}