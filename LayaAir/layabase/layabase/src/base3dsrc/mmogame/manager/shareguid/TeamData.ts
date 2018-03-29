class TeamData extends GuidObject {

    public onBaseCreated(): void {

        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };

        this.AddListen(SharedDef.GROUP_INT_FIELD_STATE, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.AUTOMATCH_TEAM_PANEL));
        });
        this.AddListen(SharedDef.GROUP_INT_FIELD_TARGET_INST, ($binlog: any) => {
            console.log("----收到弹窗申请——----",this.getTeamTargetInst());
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.TARGET_INST_TEAM_PANEL));
        });
        this.AddListen(SharedDef.GROUP_INT_FIELD_TYPE, ($binlog: any) => {
            //队伍类型变化了
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_TEAMTYPE_PANEL));
        });
        this.AddListen(SharedDef.GROUP_INT_FIELD_LEVEL_RANGE, ($binlog: any) => {
            //队伍限制等级变化了
            ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.CHG_TEAMTYPE_PANEL));
        });
        //    this.AddListen(SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP, ($binlog: any) => { this.spellIntFieldMeridExpChg() });
        this.changeGroup();

    }

    public dispose(): void {
        //对象消失
        GuidData.team = null;
        this.changeGroup();
        super.dispose();
    }

    private changeGroup(): void {
        ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.REFRESH_GROUP_EVENT));
        ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.JOIN_EXIT_TEAM_PANEL));
    }


    private dataUpdate($intMask: Object, $strMask: Object): void {


        // if ($intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP]) {
        //     ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.REFRISH_MERIDIAL_PANEL))
        // }
        // if ($intMask[SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP]) {
        //     //console.log("---经验和等级变化--");
        //     ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT));
        // }
        //队伍成员数据变化
        var $teamChangeBoole: boolean = false
        for (var i: number = SharedDef.GROUP_INT_FIELD_MEMBER_INFO_START; i < SharedDef.GROUP_INT_FIELD_MEMBER_INFO_END; i++) {
            //     if ($intMask[i]) {
            //         $jichuChangeBoole = true;
            //         if (this._skillLevDic) {
            //             var id: number = GuidData.grow.GetUInt16(i, 0);
            //             var lev: number = GuidData.grow.GetUInt16(i, 1);
            //             this._skillLevDic[id] = lev;
            //         }

            //     }
            $teamChangeBoole = true;

        }

        for (var j: number = SharedDef.GROUP_STR_FIELD_MEMBER_INFO_START; j < SharedDef.GROUP_STR_FIELD_MEMBER_INFO_END; j++) {
            $teamChangeBoole = true;
        }

        if ($teamChangeBoole) {
            //变化了
            this._itemary = this.refreshTeamItemAry();
            this._MemberNum = this.chgTeamMemberNum();
            this.changeGroup();
        }
    }

    // 组队类型
    public getTeamType(): number {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_TYPE);
    }
    // 组队等级范围
    public getTeamLevScope(): Array<number> {
        return [this.GetUInt16(SharedDef.GROUP_INT_FIELD_LEVEL_RANGE, 0), this.GetUInt16(SharedDef.GROUP_INT_FIELD_LEVEL_RANGE, 1)];
    }
    // 队长GUID
    public getTeamLeaderGuid(): string {
        return this.GetStr(SharedDef.GROUP_STR_FIELD_CAPTAIN_GUID);
    }

    // 队伍自动匹配状态
    public getTeamAutoMatch(): number {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_STATE);
    }

    // 队伍确认面板
    public getTeamTargetInst(): number {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_TARGET_INST);
    }

    // 队伍自动接受申请
    public getTeamAutoAccept(): number {
        return this.GetUInt32(SharedDef.GROUP_INT_FIELD_AUTO_ACCEPT_FLAG);
    }

    private _MemberNum: number = -1;
    private chgTeamMemberNum(): number {
        var iteamAry: Array<TeamMemberVo> = this.getTeamItemAry();
        var num: number = 0;
        for (let i = 0; i < iteamAry.length; i++) {
            if (iteamAry[i].guid != "") {
                num = num + 1;
            }
        }
        return num;
    }

    public getTeamMemberNum() {
        if (this._MemberNum == -1) {
            this._MemberNum = this.chgTeamMemberNum();
        }
        return this._MemberNum;
    }



    private _itemary: Array<TeamMemberVo>
    public getTeamItemAry(): Array<TeamMemberVo> {
        if (!this._itemary) {
            this._itemary = this.refreshTeamItemAry();
        }
        return this._itemary;
    }

    private refreshTeamItemAry(): Array<TeamMemberVo> {
        var finary: Array<TeamMemberVo> = new Array
        console.log("refreshTeamItemAry")
        //int数据
        for (let i = SharedDef.GROUP_INT_FIELD_MEMBER_INFO_START; i < SharedDef.GROUP_INT_FIELD_MEMBER_INFO_END; i += SharedDef.MAX_GROUP_MEMBER_INFO_INT_COUNT) {
            var vo: TeamMemberVo = new TeamMemberVo;
            vo.icon = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_ICON);
            vo.lev = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_LEVEL);
            vo.state = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_STATE);
            vo.response = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_RESPONSE_STATE);

            var mapline = this.GetUInt32(i + SharedDef.GROUP_MEMBER_INT_MAPID_LINENO)
            vo.mapid = mapline >> 16;
            vo.lineid = mapline & 65535;

            

            finary.push(vo);
        }

        //str数据
        for (let k = SharedDef.GROUP_STR_FIELD_MEMBER_INFO_START; k < SharedDef.GROUP_STR_FIELD_MEMBER_INFO_END; k += SharedDef.MAX_GROUP_MEMBER_INFO_STR_COUNT) {
            var idx = (k - SharedDef.GROUP_STR_FIELD_MEMBER_INFO_START) / SharedDef.MAX_GROUP_MEMBER_INFO_STR_COUNT;
            finary[idx].posidx = idx;
            finary[idx].guid = this.GetStr(k + SharedDef.GROUP_MEMBER_STR_GUID);
            finary[idx].name = this.GetStr(k + SharedDef.GROUP_MEMBER_STR_NAME);
        }
        return finary;
    }


}

class TeamMemberVo {
    public posidx: number;
    public icon: number;
    public lev: number;
    public mapid: number;
    public lineid: number;
    public state: number;
    public response: number;
    public guid: string;
    public name: string;
    //poppanel需要哪些item
    public items: Array<number>;

}

