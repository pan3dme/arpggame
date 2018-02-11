module faction {
    export class InvitationPanel extends WindowMinUi {

        private _publicbgRender: UIRenderComponent;
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

            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();

        }

        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/invitation/fac_invitation.xml", "ui/uidata/faction/invitation/fac_invitation.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
            // });
        }


        private btn: UICompenent
        private slistIndex: UICompenent
        public invitationList: InvitationList;
        private loadConfigCom(): void {
            var renderLevel: UIRenderComponent = this._topRender;

            this.addUIList(["a_title", "a_line", "a_btntxt"], renderLevel);
            this.slistIndex = this.addChild(renderLevel.getComponent("slistIndex"));
            this.btn = this.addEvntBut("cnew_btn1", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.btn, "btn", renderLevel);
            this._publicbgRender.applyObjData();

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
                    FactionModel.getInstance().chgInvitationList_clear();
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.INVITATION_CHG_EVENT));
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
     * 邀请入家族list
     */
    export class InvitationList extends SList {

        public constructor() {
            super();
            this.left = 184;
            this.top = 99;
            this.setShowLevel(6);
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, InvitationListRender, 593, 308, 0, 84, 3, 512, 512, 1, 6);
        }



        public getData($ary: Array<s2c_show_faction_invite>): Array<SListItemData> {
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
            var $sListItemData: Array<SListItemData> = this.getData(FactionModel.getInstance().getInvitationList());
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

        private Aslist_btn: UICompenent;
        private Aslist_info: UICompenent;
        private Aslist_bg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Aslist_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Aslist_bg", 0, 0, 593, 84);
            $container.addChild(this.Aslist_bg);

            this.Aslist_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Aslist_info", 33, 32, 438, 20);
            $container.addChild(this.Aslist_info);

            this.Aslist_btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Aslist_btn", 498, 19, 71, 45);
            $container.addChild(this.Aslist_btn);
            this.Aslist_btn.addEventListener(InteractiveEvent.Up, this.HelpEvt, this);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Aslist_bg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                var vo: s2c_show_faction_invite = this.itdata.data
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.Aslist_info.skinName, ColorType.Brown7a2f21 + getBaseName(vo.name) + ColorType.color9a683f + "邀请你加入" + ColorType.Brown7a2f21 + getBaseName(vo.faction_name) + ColorType.color9a683f + ",共同闯荡江湖。", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Aslist_btn.skinName, "Agree");
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
            var vo: s2c_show_faction_invite = this.itdata.data
            NetManager.getInstance().protocolos.faction_join(vo.faction_guid);
            FactionModel.getInstance().chgInvitationList_remove(vo);
            //刷新一下数据源
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.INVITATION_CHG_EVENT));
        }

        private setnull(): void {
            UiDraw.clearUI(this.Aslist_btn)
            UiDraw.clearUI(this.Aslist_info)
            UiDraw.clearUI(this.Aslist_bg)
        }
    }
}