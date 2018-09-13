module team {
    export class InviResquestPanel extends WindowMinUi {

        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._topRender.dispose();
            this._topRender = null;

            if (this.invitationList) {
                this.invitationList.dispose();
                this.invitationList = null;
            }
            super.dispose();
        }

        constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0
            this.middle = 0


            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();

        }

        public applyLoad(): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/team/requset.xml", "ui/uidata/team/requset.png", () => { this.loadConfigCom() }, "ui/uidata/team/teampc.png");
        }


        private btn: UICompenent
        private slistIndex: UICompenent
        public invitationList: InvitationList;
        private loadConfigCom(): void {
            var renderLevel: UIRenderComponent = this._topRender;

            this.addUIList(["a_baseline", "a_title"], renderLevel);
            this.slistIndex = this.addChild(renderLevel.getComponent("a_index"));
            this.btn = this.addEvntButUp("a_btn", this._topRender);

            this.applyLoadComplete();
        }

        public show() {
            UIManager.getInstance().addUIContainer(this);
            if (!this.invitationList) {
                this.invitationList = new InvitationList();
                this.invitationList.init(this._topRender.uiAtlas);
            }
            this.invitationList.show();
            this.resize();
        }

        public close(): void {
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
            UIManager.getInstance().removeUIContainer(this);
            if (this.invitationList) {
                this.invitationList.hide();
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    this.close();
                    break;
                case this.btn:
                    TeamModel.getInstance().removeAllInvitation();
                    break;

                default:
                    break;
            }
        }


        public resize(): void {
            super.resize();
            if (this.invitationList) {
                this.invitationList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x
                this.invitationList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y
            }
        }
    }


    /**
     * 邀请入队伍list
     */
    export class InvitationList extends SList {

        public constructor() {
            super();
            this.setShowLevel(6);
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, InvitationListRender, 588, 315, 0, 57, 5, 512, 512, 1, 8);
        }



        public getData($ary: Array<InviRequestCell>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        public resetData(): void {
            var $sListItemData: Array<SListItemData> = this.getData(TeamModel.getInstance().getInvireqList());
            this.refreshData($sListItemData);
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class InvitationListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Asrefusebtn: UICompenent;
        private Asagreebtn: UICompenent;
        private Asinfo: UICompenent;
        private Asbg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Asbg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Asbg", 0, 0, 588, 57);
            $container.addChild(this.Asbg);

            this.Asinfo = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asinfo", 16, 18, 364, 20);
            $container.addChild(this.Asinfo);

            this.Asagreebtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asagreebtn", 391, 5, 71, 45);
            $container.addChild(this.Asagreebtn);
            this.Asagreebtn.addEventListener(InteractiveEvent.Up, this.AgreeEvt, this);

            this.Asrefusebtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asrefusebtn", 497, 5, 71, 45);
            $container.addChild(this.Asrefusebtn);
            this.Asrefusebtn.addEventListener(InteractiveEvent.Up, this.HelpEvt, this);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Asbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                } else {
                    UiDraw.clearUI(this.Asbg);
                }
                var vo: InviRequestCell = this.itdata.data
                var tab: tb.TB_group_type = tb.TB_group_type.get_TB_group_typeById(vo.type);
                var str: string = ColorType.Green2ca937 + "Lv." + vo.level + " " + getBaseName(vo.name) + ColorType.White9A683F + "邀请你加入" + ColorType.colorcd2000 + tab.name + ColorType.White9A683F + "队伍!"
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Asinfo.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Asrefusebtn.skinName, "REFUSE");
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Asagreebtn.skinName, "AGREE");
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private HelpEvt(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo: InviRequestCell = this.itdata.data
                NetManager.getInstance().protocolos.group_invite_denied(vo.teamGuid);
                TeamModel.getInstance().popInvireqList(vo);
            }
        }

        private AgreeEvt(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                var vo: InviRequestCell = this.itdata.data
                NetManager.getInstance().protocolos.group_agree_invite(vo.teamGuid, vo.sender_guid);
                TeamModel.getInstance().popInvireqList(vo);
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Asrefusebtn)
            UiDraw.clearUI(this.Asinfo)
            UiDraw.clearUI(this.Asbg)
            UiDraw.clearUI(this.Asagreebtn)
        }
    }
}