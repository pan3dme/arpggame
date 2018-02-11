module team {

    export class groupTypeVo {
        public tab: tb.TB_group_type
        public idx: number;
    }

    export class ApplyCell {
        public gender: number;
        public guid: string;
        public lev: number;
        public force: number;
        public vip: number;
        public name: string;

    }

    export class InviRequestCell {
        public teamGuid: string;
        public name: string;
        public type: number;
        public level: number;
        public force: number;
        public sender_guid: string;
    }

    export class InvitationCell {
        public icon: number;
        public name: string;
        public lev: number;
        public guid: string;
        public online: boolean;
        public isflag: boolean;
    }

    export class TeamModel {
        public constructor() {

        }
        private static _instance: TeamModel;
        public static getInstance(): TeamModel {
            if (!this._instance) {
                this._instance = new TeamModel();
            }
            return this._instance;
        }

        public getAutoList(): Array<TeamMemberVo> {
            var finary: Array<TeamMemberVo> = new Array
            for (let i = 0; i < 3; i++) {
                var vo: TeamMemberVo = new TeamMemberVo;
                vo.guid = "";
                vo.items = [];
                finary.push(vo);
            }
            return finary;
        }

        public getGroupTypeAry(): Array<groupTypeVo> {
            var tbary: Array<groupTypeVo> = new Array
            var index: number = 0;
            var ary: Array<tb.TB_group_type> = tb.TB_group_type.get_TB_group_type();
            for (let i = 0; i < ary.length; i++) {
                if (ary[i].lv <= GuidData.player.getLevel()) {
                    var vo: groupTypeVo = new groupTypeVo;
                    vo.tab = ary[i];
                    tbary.push(vo);
                }
            }
            tbary.sort(function (a: groupTypeVo, b: groupTypeVo): number {
                return a.tab.sort - b.tab.sort;
            })

            for (let k = 0; k < tbary.length; k++) {
                index++;
                tbary[k].idx = index;
            }
            return tbary;
        }


        public loadRolePic($sex: number, $ui: UICompenent,$isonline:boolean): void {
            var $url: string = getTouPic($sex)
            $ui.uiRender.uiAtlas.upDataPicToTexture($url, $ui.skinName);

            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    var rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

                    // UiDraw.cxtDrawImg(this._baseRender.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);

                    if(!$isonline){
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight))
                    }
                    $ui.uiRender.uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
                });

        }


        public getExp(): number {
            var exp: number = 0;
            if (GuidData.team) {
                var factorA: number = TableData.getInstance().getData(TableData.tb_group_exp, 1)["factorA"];
                var groupCnt: number = 0;
                var itemary: Array<TeamMemberVo> = GuidData.team.getTeamItemAry();
                for (let i = 0; i < itemary.length; i++) {
                    if (itemary[i].guid != "" && itemary[i].state != SharedDef.GROUP_MEMBER_STATE_OFFLINE) {
                        groupCnt += 1;
                    }
                }
                exp = factorA / 100 * (groupCnt - 1)
            }
            return exp;
        }

        public getTabVoByType($type: number): groupTypeVo {
            var aaa: Array<groupTypeVo> = this.getGroupTypeAry();
            for (let i = 0; i < aaa.length; i++) {
                if ($type == aaa[i].tab.id) {
                    return aaa[i];
                }
            }
            return null;
        }

        public getdefaultTabVo(): TabVo {
            var tabvo: TabVo = new TabVo;
            if (GuidData.team) {
                tabvo.tab = this.getTabVoByType(GuidData.team.getTeamType());
                // tabvo.id = tabvo.tab.sort - 1;
                tabvo.maxlev = GuidData.team.getTeamLevScope()[1];
                tabvo.minlev = GuidData.team.getTeamLevScope()[0];
            } else {
                // tabvo.id = 0;
                tabvo.tab = this.getTabVoByType(101);
                tabvo.maxlev = tabvo.tab.tab.max_lev[1];
                tabvo.minlev = tabvo.tab.tab.min_lev[0];
            }

            return tabvo;
        }

        public getTeamMemberNum() {
            var num: number = 0;
            if (!GuidData.team) {
                return 0;
            }
            var ary: Array<TeamMemberVo> = GuidData.team.getTeamItemAry();
            for (let i = 0; i < ary.length; i++) {
                if (ary[i].guid != "") {
                    num++;
                }
            }
            return num;
        }

        private _applylist: Array<ApplyCell>
        public addapplyList(vo: ApplyCell) {
            if (!this._applylist) {
                this._applylist = new Array
            }

            for (let i = 0; i < this._applylist.length; i++) {
                if (vo.guid == this._applylist[i].guid) {
                    return;
                }
            }
            this._applylist.push(vo);
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        }

        public popapplyList($vo: ApplyCell) {
            if (!this._applylist) {
                this._applylist = new Array
            }
            var idx: number = this._applylist.indexOf($vo);
            if (idx != -1) {
                this._applylist.splice(idx, 1);
            }
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));

        }

        public removeAllApply() {
            if (!this._applylist) {
                this._applylist = new Array
            } else {
                //拒绝组队请求时，会返回给发送人提示
                for (let i = 0; i < this._applylist.length; i++) {
                    NetManager.getInstance().protocolos.group_join_denied(this._applylist[i].guid);
                }
                this._applylist = new Array
            }

            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        }

        public getApplyList(): Array<ApplyCell> {
            if (!this._applylist) {
                this._applylist = new Array
            }
            return this._applylist;
        }

        public getInvireqList(): Array<InviRequestCell> {
            if (!this._invitationlist) {
                this._invitationlist = new Array
            }
            return this._invitationlist;
        }

        public addInvireqList(vo: InviRequestCell) {
            if (!this._invitationlist) {
                this._invitationlist = new Array
            }

            for (let i = 0; i < this._invitationlist.length; i++) {
                if (vo.teamGuid == this._invitationlist[i].teamGuid) {
                    return;
                }
            }

            this._invitationlist.push(vo);
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        }

        public popInvireqList($vo: InviRequestCell) {
            if (!this._invitationlist) {
                this._invitationlist = new Array
            }
            var idx: number = this._invitationlist.indexOf($vo);
            if (idx != -1) {
                this._invitationlist.splice(idx, 1);
            }
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));

        }

        private _invitationlist: Array<InviRequestCell>
        public removeAllInvitation() {
            if (!this._invitationlist) {
                this._invitationlist = new Array
            } else {
                //拒绝组队请求时，会返回给发送人提示
                // for (let i = 0; i < this._invitationlist.length; i++) {
                //     NetManager.getInstance().protocolos.group_join_denied(this._applylist[i].guid);
                // }
                this._invitationlist = new Array
            }

            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_APPLYLIST_TEAM_PANEL));
        }




        private getNearList(): Array<InvitationCell> {
            var nearAry: Array<InvitationCell> = new Array
            if (GameInstance.roleList) {
                for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                    var $tempChar: SceneChar = <SceneChar>GameInstance.roleList[i];
                    if ($tempChar.unit && $tempChar.unit.isPlayer() && !$tempChar.unit.isMain) {
                        var vo: InvitationCell = new InvitationCell;
                        vo.guid = $tempChar.unit.getPlayerGUID();
                        vo.icon = $tempChar.unit.getCharType();
                        vo.lev = $tempChar.unit.getLevel();
                        vo.name = $tempChar.unit.getName();
                        vo.online = true;
                        vo.isflag = false;
                        nearAry.push(vo);
                    }
                }
            }
            console.log("----nearAry---", nearAry);
            return nearAry;
        }

        private getFriendList(): Array<InvitationCell> {
            var friendAry: Array<InvitationCell> = new Array
            if (GuidData.social) {
                var ary: Array<SocialItemData> = GuidData.social.getFriendList()
                for (var i: number = 0; i < ary.length; i++) {
                    if (ary[i].guid != GuidData.player.getGuid()) {
                        var vo: InvitationCell = new InvitationCell;
                        vo.guid = ary[i].guid;
                        vo.icon = ary[i].gender;
                        vo.lev = ary[i].level;
                        vo.name = ary[i].name;
                        vo.online = ary[i].inOnline;
                        vo.isflag = false;
                        friendAry.push(vo);
                    }
                }
            }
            console.log("----friendAry---", friendAry);
            return friendAry;
        }

        private getFactionList(): Array<InvitationCell> {
            var factionAry: Array<InvitationCell> = new Array
            if (GuidData.faction) {
                var ary: Array<FactionItemData> = GuidData.faction.getFactionList();
                for (var i: number = 0; i < ary.length; i++) {
                    if (ary[i].guid != GuidData.player.getGuid()) {
                        var vo: InvitationCell = new InvitationCell;
                        vo.guid = ary[i].guid;
                        vo.icon = ary[i].gender;
                        vo.lev = ary[i].level;
                        vo.name = ary[i].name;
                        vo.online = ary[i].isOnline;
                        vo.isflag = false;
                        factionAry.push(vo);
                    }
                }
            }
            console.log("----factionAry---", factionAry);
            return factionAry;
        }

        public getInvitationList($type: number): Array<InvitationCell> {
            var retary: Array<InvitationCell>;
            switch ($type) {
                case 0:
                    //附近
                    retary = this.getNearList();
                    break;
                case 1:
                    //好友
                    retary = this.getFriendList();
                    break;
                case 2:
                    //家族
                    retary = this.getFactionList();
                    break;
                default:
                    retary = new Array
                    break;
            }

            return retary;
        }

        public enterTask($tab: TabVo) {
            var curNum: number = this.getTeamMemberNum();
            var issingle: boolean = curNum <= 1;


            switch ($tab.tab.tab.id & 65535) {
                case 5:
                    // if (issingle) {
                    //     NetManager.getInstance().protocolos.kuafu_3v3_match();
                    // } else {
                    //     NetManager.getInstance().protocolos.kuafu_3v3_match();
                    // }
                    if (curNum < 3) {
                        msgtip.MsgTipManager.outStr("[ff0000]人数不足无法进行副本", 99);
                    } else {
                        NetManager.getInstance().protocolos.kuafu_3v3_group_match();
                    }
                    break;
                case 20:
                    if (issingle) {
                        NetManager.getInstance().protocolos.enter_group_exp(0);
                    } else {
                        NetManager.getInstance().protocolos.enter_group_exp(1);
                    }
                    break;
                case 101:
                    //野外打怪
                    msgtip.MsgTipManager.outStr("[ff0000]目标不是副本类型", 99);
                    break;
                case 12:
                    //组队副本
                    if (issingle) {
                        NetManager.getInstance().protocolos.group_instance_match($tab.tab.tab.id >> 16, 0);
                    } else {
                        NetManager.getInstance().protocolos.group_instance_match($tab.tab.tab.id >> 16, 1);
                    }
                    break;

                default:
                    break;
            }
        }
    }
}