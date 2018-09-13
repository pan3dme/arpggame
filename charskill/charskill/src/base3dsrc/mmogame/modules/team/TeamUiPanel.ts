module team {
    export class TeamUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            super.dispose();

            if (this.teamList) {
                this.teamList.dispose();
                this.teamList = null;
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
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._roleRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {
            this._roleRender.uiAtlas.setInfo("ui/uidata/team/team.xml", "ui/uidata/team/team.png", () => { this.loadConfigCom() }, "ui/uidata/team/teampc.png");
        }

        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.initData();
            this.resize();
            this.applyLoadComplete();
        }

        private invitationBtn: UICompenent
        private a_index: UICompenent
        private a_target: UICompenent
        private a_membernum: UICompenent
        private a_exptxt: UICompenent
        private unteamUi: Array<UICompenent>
        private leaderUi: Array<UICompenent>
        private memberUi: Array<UICompenent>
        private initData(): void {
            //添加UI控件初始化

            this.a_index = this.addChild(this._bgRender.getComponent("a_index"));
            this.a_target = this.addChild(this._roleRender.getComponent("a_target"));
            var cnew_right_bg_top = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._roleRender);
            var cnew_right_bg_bottom = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._roleRender);
            this.winmidRender.applyObjData();

            this.addUIList(["a_targettitle", "a_title", "a_basebg", "a_cutline", "a_cutline1"], this._bgRender);
            this.addUIList(["a_txt0", "a_txt6"], this._roleRender);

            this.invitationBtn = this.addEvntButUp("a_btnw0", this._bgRender);

            this.a_membernum = this.addChild(this._roleRender.getComponent("a_membernum"));
            this.a_exptxt = this.addChild(this._roleRender.getComponent("a_exptxt"));

            this.unteamUi = new Array
            this.leaderUi = new Array
            this.memberUi = new Array
            //没有队伍时的ui初始化
            this.unteamUi.push(this._topRender.getComponent("a_autotxt"));
            var a_btnchgtarget = this._roleRender.getComponent("a_btnchgtarget");//更换目标
            a_btnchgtarget.addEventListener(InteractiveEvent.Up, this.chgTargetEvent, this);
            this.unteamUi.push(a_btnchgtarget);
            this.unteamUi.push(this._topRender.getComponent("a_txt1"));
            var convenientteam = this._roleRender.getComponent("a_btnw1");//便捷组队
            convenientteam.addEventListener(InteractiveEvent.Up, this.convenientEvent, this);
            this.unteamUi.push(convenientteam);
            var autoplay = this._roleRender.getComponent("a_btnauto");//自动匹配
            autoplay.addEventListener(InteractiveEvent.Up, this.autoEvent, this);
            this.unteamUi.push(autoplay);

            var buildteam = this._roleRender.getComponent("a_btny");//创建队伍
            buildteam.addEventListener(InteractiveEvent.Up, this.buildEvent, this);
            this.unteamUi.push(buildteam);
            this.unteamUi.push(this._topRender.getComponent("a_txt5"));
            //队长时候的ui
            this.leaderUi.push(this._topRender.getComponent("a_autotxt"));
            var a_btnchgtarget = this._roleRender.getComponent("a_btnchgtarget");//更换目标
            a_btnchgtarget.addEventListener(InteractiveEvent.Up, this.chgTargetEvent, this);
            this.leaderUi.push(a_btnchgtarget);
            this.leaderUi.push(this._topRender.getComponent("a_txt2"));
            var applybtn = this._roleRender.getComponent("a_btnw1");//申请列表
            applybtn.addEventListener(InteractiveEvent.Up, this.applyEvent, this);
            this.leaderUi.push(applybtn);
            var speak = this._roleRender.getComponent("a_btnw2");//世界喊话
            speak.addEventListener(InteractiveEvent.Up, this.speakEvent, this);
            this.leaderUi.push(speak);
            this.leaderUi.push(this._topRender.getComponent("a_txt3"));
            var autoplay = this._roleRender.getComponent("a_btnauto");//自动匹配
            autoplay.addEventListener(InteractiveEvent.Up, this.autoEvent, this);
            this.leaderUi.push(autoplay);
            var enterbtn = this._roleRender.getComponent("a_btny");//进入副本
            enterbtn.addEventListener(InteractiveEvent.Up, this.enterEvent, this);
            this.leaderUi.push(enterbtn);
            this.leaderUi.push(this._topRender.getComponent("a_txt4"));
        }

        private enterEvent($evt: InteractiveEvent) {
            if (this.PopautoMacth()) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($evt.target);
            TeamModel.getInstance().enterTask(this._curTypeVo);
        }

        private applyEvent($evt: InteractiveEvent) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            ModuleEventManager.dispatchEvent(new TeamEvent(TeamEvent.APPLY_TEAM_PANEL));
        }

        public buildEvent($evt: InteractiveEvent = null) {
            if (this.PopautoMacth()) {
                return;
            }
            if ($evt) {
                UiTweenScale.getInstance().changeButSize($evt.target);
            }
            NetManager.getInstance().protocolos.group_create(this._curTypeVo.tab.tab.id, this._curTypeVo.minlev, this._curTypeVo.maxlev, 1);
        }

        private speakEvent($evt: InteractiveEvent) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            var $str: string = ColorType.Green20a200 + "邀请组队" + "[]" + "{\"T\":3,\"G\":" + "\"" + GuidData.team.guid + "\"" + "}";
            NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_WORLD, $str)
        }


        private autoEvent($evt: InteractiveEvent) {
            UiTweenScale.getInstance().changeButSize($evt.target);
            console.log("-----自动匹配---");
            var flag: boolean = false;
            if (GuidData.team) {
                if (GuidData.team.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            } else {
                if (GuidData.player.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            }

            if (flag) {
                //取消匹配
                NetManager.getInstance().protocolos.cancel_auto_group_match();
            } else {
                //自动匹配
                NetManager.getInstance().protocolos.auto_group_match(this._curTypeVo.tab.tab.id);
            }
        }

        private chgTargetEvent($evt: InteractiveEvent) {
            if (this.PopautoMacth()) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($evt.target);
            var $teamtype = new TeamEvent(TeamEvent.SHOW_TEAMTYPE_PANEL)
            $teamtype.data = this._curTypeVo
            ModuleEventManager.dispatchEvent($teamtype);
        }

        private convenientEvent($evt: InteractiveEvent) {
            if (this.PopautoMacth()) {
                return;
            }
            UiTweenScale.getInstance().changeButSize($evt.target);
            var $teamtype = new TeamEvent(TeamEvent.CONVENIENT_TEAM_PANEL)
            $teamtype.data = this._curTypeVo
            ModuleEventManager.dispatchEvent($teamtype);
        }

        private PopautoMacth(): boolean {
            var flag: boolean = false;
            if (GuidData.team) {
                if (GuidData.team.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            } else {
                if (GuidData.player.getTeamAutoMatch() > 0) {
                    flag = true;
                }
            }
            if (flag) {
                AlertUtil.show("您正处于自动匹配中,是否中断?", "提示", (a: any) => {
                    if (a == 1) {
                        NetManager.getInstance().protocolos.cancel_auto_group_match();
                    }
                }, 2, ["是", "否"]);
            }
            return flag;
        }

        public resize(): void {
            // if (this.UnlockAry[6] && this.UnlockAry[6].parent) {
            //     this.UnlockAry[6].top = 0
            //     this.UnlockAry[6].left = 0
            //     this.UnlockAry[6].y = 0;
            //     this.UnlockAry[6].x = 0;
            //     this.UnlockAry[6].height = Scene_data.stageHeight / UIData.Scale;
            //     this.UnlockAry[6].width = Scene_data.stageWidth / UIData.Scale;
            // }
            super.resize();
            if (this.teamList) {
                this.teamList.left = this.a_index.parent.x / UIData.Scale + this.a_index.x
                this.teamList.top = this.a_index.parent.y / UIData.Scale + this.a_index.y
            }

        }

        public teamList: TeamList;
        public chgTeam() {
            var hasteam: boolean = false;
            var isleader: boolean = false;
            if (GuidData.team) {
                hasteam = true;
                //有队伍
                if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                    //我是队长
                    isleader = true;
                }
            }

            this.setUiListVisibleByItem(this.unteamUi, !hasteam);
            this.setUiListVisibleByItem(this.leaderUi, hasteam && isleader);
            this.setAutoState();
        }

        public setAutoState() {
            if (GuidData.team) {
                (<FrameCompenent>this.leaderUi[0]).goToAndStop(GuidData.team.getTeamAutoMatch() == 0 ? 0 : 1);
            } else {
                (<FrameCompenent>this.unteamUi[0]).goToAndStop(GuidData.player.getTeamAutoMatch() == 0 ? 0 : 1);
            }
        }

        //刷新任务目标
        private _curTypeVo: TabVo
        public refreshType($vo: TabVo) {
            this._curTypeVo = $vo;
            var str: string = $vo.tab.tab.name + "(" + $vo.minlev + "-" + $vo.maxlev + ")"
            LabelTextFont.writeTextAutoCenter(this._bgRender.uiAtlas, this.a_target.skinName, str, 16, ColorType.Brown7a2f21, 200, true);
        }

        public drawExp() {
            var membernum: number = 0;
            if (GuidData.team) {
                membernum = GuidData.team.getTeamMemberNum();
            }

            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_exptxt.skinName, ColorType.Brown7a2f21 + "经验加成: " + ColorType.Green2ca937 + TeamModel.getInstance().getExp() + "%", 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.a_membernum.skinName, ColorType.Brown7a2f21 + "队员: " + ColorType.Green2ca937 + "x" + membernum, 16, TextAlign.LEFT);
        }

        public show($tabvo: TabVo): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);

            this.chgTeam();
            if (!this.teamList) {
                this.teamList = new TeamList
                this.teamList.init(this._bgRender.uiAtlas);
            }
            this.teamList.show();
            this.refreshType($tabvo);
            this.drawExp();
            this.resize();
        }

        public hide(): void {
            if (this.teamList) {
                this.teamList.hide();
            }
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        }


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    if (this.PopautoMacth()) {
                        return;
                    }
                    ModuleEventManager.dispatchEvent(new TeamEvent(TeamEvent.HIDE_TEAM_PANEL));
                    break;

                case this.invitationBtn:
                    if (this.PopautoMacth()) {
                        return;
                    }
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    ModuleEventManager.dispatchEvent(new TeamEvent(TeamEvent.INVITATION_LIST_TEAM_PANEL));
                    break;
                // case this.left_arrow:
                //     this.curchapterId--;
                //     break;
                default:
                    break;
            }
        }
    }


    /**
     * 组队list
     */
    export class TeamList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, TeamListRender, 570, 291, 0, 97, 3, 256, 512, 1, 3, 1);
        }


        public refreshDataByNewData(): void {
            var hasteam: boolean = false;
            if (GuidData.team) {
                hasteam = true;
                //有队伍
            }

            var teammemberary: Array<TeamMemberVo> = TeamModel.getInstance().getAutoList();
            if (hasteam) {
                teammemberary = GuidData.team.getTeamItemAry();
                var isleader: boolean = GuidData.player.getGuid() == GuidData.team.getTeamLeaderGuid();
                for (let i = 0; i < teammemberary.length; i++) {
                    if (teammemberary[i].guid != GuidData.player.getGuid()) {
                        if (isleader) {
                            teammemberary[i].items = [0, 12];
                        } else {
                            teammemberary[i].items = [0];
                        }
                    }
                }
            }

            var $sListItemData: Array<SListItemData> = this.getData(teammemberary, hasteam);
            this.refreshData($sListItemData);
        }


        public getData($data: Array<TeamMemberVo>, $hasteam: boolean): Array<SListItemData> {
            var autonum: number = GuidData.player.getTeamAutoMatch();
            if ($hasteam) {
                autonum = GuidData.team.getTeamAutoMatch();
            }
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = autonum;//是否自动匹配中
                ary.push(item);
            }
            return ary;
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        }


        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class TeamListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Asbg: UICompenent;
        private Asicon: UICompenent;
        private Ashuawen: UICompenent;
        private Asleader: UICompenent;
        private Aswaittxt: UICompenent;
        private Asbtn: UICompenent;
        private Asname: UICompenent;
        private Aslev: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var topRender: UIRenderComponent = $customizeRenderAry[0];

            this.Asicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Asicon", 24, 11, 68, 68);
            $container.addChild(this.Asicon);
            this.Asicon.addEventListener(InteractiveEvent.Up, this.iconClick, this);

            this.Ashuawen = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ashuawen", 409, 9, 156, 80);
            $container.addChild(this.Ashuawen);

            this.Asleader = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Asleader", 0, 0, 33, 54);
            $container.addChild(this.Asleader);

            this.Aswaittxt = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Aswaittxt", 229, 36, 126, 22);
            $container.addChild(this.Aswaittxt);

            this.Asbtn = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Asbtn", 430, 19, 114, 46);
            $container.addChild(this.Asbtn);
            this.Asbtn.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.Asname = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Asname", 111, 19, 100, 20);
            $container.addChild(this.Asname);

            this.Aslev = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Aslev", 111, 49, 100, 20);
            $container.addChild(this.Aslev);

            this.Asbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Asbg", 0, 0, 570, 94, 22, 20);
            $container.addChild(this.Asbg);
        }

        private applyrender(): void {

            var vo: TeamMemberVo = this.itdata.data
            if (this.itdata.id == 0 && vo.guid == "") {
                this.setnull();
            } else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Asbg.skinName, UIData.publicUi, PuiData.TEAMLISTBG);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Ashuawen.skinName, "Huawen");

                if (vo.guid != "") {
                    var isleader: boolean = GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid();//我是不是队长
                    TeamModel.getInstance().loadRolePic(vo.icon, this.Asicon, vo.state != SharedDef.GROUP_MEMBER_STATE_OFFLINE);
                    UiDraw.clearUI(this.Aswaittxt);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Asname.skinName, getBaseName(vo.name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Aslev.skinName, vo.lev + "级", 16, TextAlign.LEFT, ColorType.Green2ca937);

                    if (GuidData.team.getTeamLeaderGuid() == vo.guid) {
                        UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asleader.skinName, "Leader");
                    } else {
                        UiDraw.clearUI(this.Asleader);
                    }

                    //按钮逻辑处理
                    if (isleader) {
                        if (GuidData.player.getGuid() == vo.guid) {
                            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asbtn.skinName, "Btnexit");
                        } else {
                            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asbtn.skinName, "BtnKick");
                        }
                    } else {
                        if (GuidData.player.getGuid() == vo.guid) {
                            UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asbtn.skinName, "Btnexit");
                        } else {
                            UiDraw.clearUI(this.Asbtn);
                        }
                    }
                } else {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Asicon.skinName, "Iconwait");
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Aswaittxt.skinName, "Txtwait");
                    UiDraw.clearUI(this.Asbtn);
                    UiDraw.clearUI(this.Asleader);
                    UiDraw.clearUI(this.Aslev);
                    UiDraw.clearUI(this.Asname);
                }
            }
        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                //如果对象不存在就setnull
                this.setnull();
            }
        }

        private iconClick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                var $vo: TeamMemberVo = this.itdata.data
                if ($vo.guid != GuidData.player.getGuid()) {
                    // this.showPop(evt);
                    PopMenuUtil.show(this.itdata, (value: number) => { this.popBackFun(value) }, evt.x, evt.y)
                }
            }
        }

        private popBackFun(value: number): void {
            if (value == 0) {
                //查看信息
                NetManager.getInstance().protocolos.get_player_overview(this.itdata.data.guid);
            } else if (value == 12) {
                NetManager.getInstance().protocolos.group_give_captain(this.itdata.data.posidx);
            }
        }

        private equClick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                var vo: TeamMemberVo = this.itdata.data
                var isleader: boolean = false;
                if (GuidData.team) {
                    isleader = GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid();//我是不是队长
                }
                if (GuidData.player.getGuid() == vo.guid) {
                    //退出队伍
                    NetManager.getInstance().protocolos.group_quit();
                } else {
                    if (isleader) {
                        //踢出队伍
                        NetManager.getInstance().protocolos.group_kick(vo.posidx);
                    }
                }
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.Asbg);
            UiDraw.clearUI(this.Asicon);
            UiDraw.clearUI(this.Ashuawen);
            UiDraw.clearUI(this.Asleader);
            UiDraw.clearUI(this.Aswaittxt);
            UiDraw.clearUI(this.Asbtn);
            UiDraw.clearUI(this.Asname);
            UiDraw.clearUI(this.Aslev);
        }
    }
}