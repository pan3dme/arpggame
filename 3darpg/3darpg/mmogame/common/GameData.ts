
class AreaType {
    public static topleft_1: number = 1;   //左上角头像
    public static topleftpalce_2: number = 2;  //左边任务
    public static toprightPanda_3: number = 3;  //右上角系统列表
    public static toprightmap_4: number = 4;   //左上角地图
    //    public static midleftQuest_5: number = 5;
    public static rightChange_6: number = 6;   //右边切换和家族
    public static fightSKill_7: number = 7;   //只显示技能


    public static sceneExit_30: number = 30;   //副本推出按钮

    public static fubenLeftPane_20: number = 20;  //副本左边任务

    public static worldboos_22: number = 22;
    public static kuafu1V1top_23: number = 23;
    public static kuafu3V3top_24: number = 24;
    public static kuafuXFtop_25: number = 25;
    public static xiuliantop_26: number = 26;

    public static sceneExit_27: number = 27;


    public static restAreaPanel(): void {

        if (GuidData.map.showAreaById(AreaType.fubenLeftPane_20)) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT));//显示副本左边任务
        }
        if (GuidData.map.showAreaById(AreaType.worldboos_22)) {
            //   ModuleEventManager.dispatchEvent(new worldboss.WorldBossEvent(worldboss.WorldBossEvent.SHOW_LEFT_WORLD_BOSS_PANEL));//世界BOSS
        }
        if (GuidData.map.showAreaById(AreaType.kuafu1V1top_23)) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFu1v1Event(kuafu.KuaFu1v1Event.SHOW_1V1_SCENE_PANEL));//跨服1v1
        }
        if (GuidData.map.showAreaById(AreaType.xiuliantop_26)) {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFu1v1Event(kuafu.KuaFu1v1Event.SHOW_1V1_SCENE_PANEL));//修炼
        }
        // if (GuidData.map.showAreaById(AreaType.kuafu3V3top_24)) {
        //     ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.SHOW_KUAFU_3V3_SCENE_PANEL));//显示跨服3V3副本面板
        // }
        // if (GuidData.map.showAreaById(AreaType.kuafuXFtop_25)) {
        //     ModuleEventManager.dispatchEvent(new kuafu.XianFuEvent(kuafu.XianFuEvent.SHOW_XIANFU_SCENEPANEL_EVENT)); //仙府
        // }



    }
}

class Play_Skill_Vo {

    public skill: Skill;
    public tb_skill_base: tb.TB_skill_base

    public static get_Play_Skill_Vo($id: number): Play_Skill_Vo {
        var k: Play_Skill_Vo = new Play_Skill_Vo()
        k.tb_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
        return k
    }
    public destory(): void {
        this.skill = null;
    }
}

module tb {
    //自己技能相关
    export class SkillData {
        public static skillList: Array<tb.SkillDataVo>;
        public static passiveSkillList: Array<tb.SkillDataVo>;
        // public static divineSkillVo: tb.SkillDataVo;
        public static angerSkillVo: tb.SkillDataVo;
        public static jumpSkillVo: tb.SkillDataVo
        public static threeSkillList: Array<tb.SkillDataVo>;

        public zhudong_list: Array<number>;//主动技能列表;
        public anger_list: Array<number>;//怒气技能列表;
        public passive_list: Array<number>;//被动技能列表;
        public constructor() {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_show, GuidData.player.getCharType());
            this.parse($obj);
        }
        public parse($obj: any) {
            this.zhudong_list = new Array;
            this.anger_list = new Array;
            this.passive_list = new Array;
            makeArray($obj.zhudong_list, this.zhudong_list);
            makeArray($obj.anger_list, this.anger_list);
            makeArray($obj.passive_list, this.passive_list);
        }
        private static _instance: SkillData;
        public static getInstance(): SkillData {
            if (!this._instance) {
                this._instance = new SkillData();
            }
            return this._instance;
        }
        public static initData(): void {
            if (!SkillData.threeSkillList) {
                SkillData.threeSkillList = new Array()
                SkillData.skillList = this.getZhuDongList();
                SkillData.passiveSkillList = this.getPassiveList();
                this.initeCdMesh();
            }
        }
        //收获主动技能列表数据
        private static getZhuDongList(): Array<tb.SkillDataVo> {
            var $arr: Array<tb.SkillDataVo> = new Array();
            for (var i: number = 0; i < tb.SkillData.getInstance().zhudong_list.length; i++) {
                var $id: number = tb.SkillData.getInstance().zhudong_list[i];
                var $vo: tb.SkillDataVo = tb.SkillDataVo.getSkillBaseDataById($id)
                $arr.push($vo);
            }
            return $arr
        }
        private static getPassiveList(): Array<tb.SkillDataVo> {
            var $arr: Array<tb.SkillDataVo> = new Array();
            for (var i: number = 0; i < tb.SkillData.getInstance().passive_list.length; i++) {
                var $id: number = tb.SkillData.getInstance().passive_list[i];
                var $vo: tb.SkillDataVo = tb.SkillDataVo.getSkillBaseDataById($id)
                $arr.push($vo);
            }
            return $arr
        }
        private static initeCdMesh(): void {
            if (!this.cdMeshObj) {
                this.cdMeshObj = new Object();
                for (var i: number = 0; i < GameInstance.skillCdItem.length; i++) {
                    var $obj: any = GameInstance.skillCdItem[i]
                    if ($obj.cd <= 0) {
                        this.cdMeshObj[$obj.id] = TimeUtil.getTimer();
                    } else {
                        this.cdMeshObj[$obj.id] = $obj.cd + TimeUtil.getTimer();
                    }
                }
            }
        }
        private static cdMeshObj: any;
        public static setCdMeshData($skillId: number, $singleCD: number): void {
            this.cdMeshObj[$skillId] = TimeUtil.getTimer() + $singleCD;
        }
        public static getCdMeshBySkillId($skillId: number): number {
            if (!this.cdMeshObj) {
                return 0
            }
            return this.cdMeshObj[$skillId];
        }

        public static resetSkillData(): void {
            if (!tb.SkillData.skillList) {
                tb.SkillData.initData()
            }
            var $arr: Array<SkillUintVo> = GuidData.player.skillItem;
            //console.log($arr)

            for (var i: number = 0; i < $arr.length; i++) {
                var $skillUintVo: SkillUintVo = $arr[i];
                if ($skillUintVo) {
                    if ($skillUintVo.lev == 0 || $skillUintVo.slot == 0) {
                        break;
                    }
                    if ($skillUintVo.slot == 1) {
                        this.addThreeSkillList($skillUintVo.id, $skillUintVo.lev, $skillUintVo.slot);
                    } else {
                        this.setDataToSkillVo($skillUintVo.id, $skillUintVo.lev, $skillUintVo.slot);
                    }

                    this.initPreSkill($skillUintVo.id)
                }
            }

            this.jumpSkillVo = SkillDataVo.getSkillBaseDataById(10001)
        }
        private static initPreSkill($skillId: number): void {
            //  var $skilldata: TB_skill_Vo = TableData.getInstance().getTBskillVo($skillId);
            var $skilldata: tb.SkillDataVo = tb.SkillDataVo.getSkillBaseDataById($skillId)

            if ($skilldata.tb_skill_base.effect_file) {
                SkillManager.getInstance().preLoadSkill(getSkillUrl($skilldata.tb_skill_base.effect_file));//FIXME

                SkillManager.getInstance().preLoadSkill(getSkillUrl("nuqi"));//FIXME
            }

        }

        private static setDataToSkillVo($id: number, $lev: number, $slot: number): void {
            for (var i: number = 0; i < tb.SkillData.skillList.length; i++) {
                if (tb.SkillData.skillList[i].id == $id) {
                    tb.SkillData.skillList[i].level = $lev;
                    tb.SkillData.skillList[i].slot = $slot
                    tb.SkillData.skillList[i].activation = true;
                }

            }

            if ($slot == 6) {  //怒气技能
                if (!tb.SkillData.angerSkillVo) {
                    tb.SkillData.angerSkillVo = tb.SkillDataVo.getSkillBaseDataById($id);
                }
                tb.SkillData.angerSkillVo.level = $lev;
                tb.SkillData.angerSkillVo.slot = $slot;
            }

        }
        private static addThreeSkillList($id: number, $lev: number, $slot: number): void {
            var tempSkill: tb.SkillDataVo = this.gteThreeSillById($id);
            if (!tempSkill) {
                tempSkill = tb.SkillDataVo.getSkillBaseDataById($id);
                tb.SkillData.threeSkillList.push(tempSkill)
            }
            tempSkill.level = $lev;
            tempSkill.slot = $slot;
        }
        private static gteThreeSillById($id: number): tb.SkillDataVo {
            for (var i: number = 0; i < tb.SkillData.threeSkillList.length; i++) {
                if (tb.SkillData.threeSkillList[i].id == $id) {
                    return tb.SkillData.threeSkillList[i]
                }
            }
            return null
        }
    }

    export class SkillDataVo {
        public id: number;

        public is_initiative: number;  //技能类型;
        public maxLev: number //最大等级;
        public singleCD: number//冷却时间
        public infoA: string; //当前效果文字;
        public infoB: string; //一下级效果显示;
        public levelUpStat: number; //升级开始的ID

        public typtId: number;  //技能类型
        public slot: number; //插孔专问给主界面技能标记
        private _activation: boolean;//是否激活
        public fight_value: number
        private _level: number
        public skillLearnVo: SkillLearnVo;
        private _showGreenUp: boolean;
        public drawChange: boolean;  //特别标记用于重绘时需要重新执行  //如等级变化。升级状态

        public tb_skill_uplevel: TB_skill_uplevel;
        public tb_skill_base: TB_skill_base

        public constructor($obj: any) {
            if (!$obj) {
                console.log("技能表无")
            }

            this.id = $obj.id;

            this.is_initiative = $obj.is_initiative;
            this.singleCD = $obj.singleCD;

            this.levelUpStat = $obj.uplevel_id[0];
            this.maxLev = $obj.uplevel_id[1] - this.levelUpStat + 1;
            this.drawChange = true;
            ;
        }
        public set showGreenUp(value: boolean) {
            if (this._showGreenUp != value) {
                this.drawChange = true;
            }
            this._showGreenUp = value;
        }
        public get showGreenUp(): boolean {
            return this._showGreenUp;
        }
        public set activation(value: boolean) {
            if (this._activation != value) {
                this.drawChange = true;
            }
            this._activation = value;
        }
        public get activation(): boolean {
            return this._activation;
        }
        public set level(value: number) {
            if (this._level != value) {
                this.drawChange = true;
            }
            this._level = value;
            this.tb_skill_uplevel = TB_skill_uplevel.get_TB_skill_uplevel(this.levelUpStat + this.level - 1);
        }
        public get level(): number {
            return this._level;
        }

        public static getSkillBaseDataById($id): tb.SkillDataVo {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_base, $id);
            var $vo: tb.SkillDataVo = new tb.SkillDataVo($obj);
            $vo.tb_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
            return $vo;
        }
        //获取升级条件
        public static getLevelUpInof($skillId: number, $nextLevel: number): tb.SkillLearnVo {
            var $objB: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, $nextLevel);
            var $vo: tb.SkillLearnVo = new tb.SkillLearnVo();
            if (!$objB) {
                console.log("没有数据")
            }
            $vo.resource = $objB.uplevel_cost;
            $vo.playerLevel = $objB.need_level;
            return $vo
        }
        //是否有升级条件
        public static isCanUpLevel($Vo: tb.SkillDataVo): boolean {
            if ($Vo.skillLearnVo.playerLevel) {
                if ($Vo.skillLearnVo.playerLevel > GameInstance.mainChar.unit.getLevel()) {
                    return false
                }
            }
            if ($Vo.skillLearnVo.item) {  //道具
                if (!this.havaMoreDaojuItem($Vo.skillLearnVo.item)) {
                    return false
                }
            }
            if ($Vo.skillLearnVo.resource) { //资源
                if (!this.havaMoreResourceItem($Vo.skillLearnVo.resource)) {
                    return false
                }
            }
            if ($Vo.level == $Vo.maxLev) {
                if ($Vo.typtId != skillUi.SkillBaseType.NUQI) {
                    return false
                }
            }
            return true
        }
        //道具是否足够
        private static havaMoreDaojuItem($item: Array<Array<number>>): boolean {
            for (var i: number = 0; i < $item.length; i++) {
                var $id: number = $item[i][0];
                var $num: number = $item[i][1];
                if (!skillUi.SkillUiModel.haveMoneyType($id, $num)) {
                    return false
                }
            }
            return true
        }
        //资源是否足够
        private static havaMoreResourceItem($item: Array<Array<number>>): boolean {
            for (var i: number = 0; i < $item.length; i++) {
                var $id: number = $item[i][0];
                var $num: number = $item[i][1];
                if (!skillUi.SkillUiModel.haveMoneyType($id, $num)) {
                    return false
                }
            }
            return true
        }


        public singleCDA: number;
        public singleCDB: number;

        //刷新对象数据用于显示
        public refresh(): void {

            var $objA: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, this.levelUpStat + this.level - 1);
            this.singleCDA = this.singleCD - $objA.mcd
            this.infoA = this.replaceInfo($objA, true);

            this.fight_value = $objA.fight_value;
            if (this.level < this.maxLev) {
                var $objB: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, this.levelUpStat + this.level);
                this.infoB = this.replaceInfo($objB, false)
                this.singleCDB = this.singleCD - $objB.mcd;
            } else {
                this.infoB = "";
                this.singleCDB = NaN;
            }
        }

        private replaceInfo($obj: any, $flag: boolean): string {
            var temp: string = this.getStrByInfo(this.tb_skill_base.info);
            for (var key in $obj) {
                var kkkk: string = "{" + key + "}";
                temp = temp.replace(kkkk, $flag ? "[ffffff]" + $obj[key] + "[8595ae]" : "[00ff00]" + $obj[key] + "[8595ae]")
            }
            return temp
        }

        private getStrByInfo($str: string): string {
            var endStr: string = ""
            var $canAdd: boolean = true
            for (var i: number = 0; i < $str.length; i++) {

                if ($canAdd) {
                    if ($str.substr(i, 1) != "<") {
                        endStr += $str.substr(i, 1)
                    } else {
                        $canAdd = false;
                    }
                } else {
                    if ($str.substr(i, 1) == ">") {
                        $canAdd = true
                    }
                }
            }
            return endStr
        }

        public static getSkillDesc($skillID: number, $lev: number = 1): string {
            var tabObj: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($skillID);
            var desc: string = tabObj.info;

            var keyAry: Array<string> = desc.match(/\{\w+#*\d*\_*\d*\}/g);

            if (!keyAry || keyAry.length == 0) {
                return desc;
            }

            var $objA: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, tabObj.uplevel_id[0] + $lev - 1);

            for (var i: number = 0; i < keyAry.length; i++) {
                var key: string = keyAry[i];
                var sKey: string = key.substring(1, key.length - 1);
                var param: number;
                if (sKey.indexOf("#") != -1) {
                    var ks: Array<string> = sKey.split("#");
                    sKey = ks[0];
                    var ssKs: Array<string> = ks[1].split("_");
                    var temp: any = $objA[sKey];
                    var needMath: boolean = (sKey == "passive_type")
                    for (var j: number = 0; j < ssKs.length; j++) {
                        if (temp) {
                            temp = temp[Number(ssKs[j])];
                        } else {
                            temp = 0;
                            break;
                        }
                    }
                    param = temp;
                    if (needMath) {
                        param = float2int(temp / 100);
                    }
                } else {
                    param = $objA[sKey];
                }
                desc = desc.replace(key, param.toFixed(1));
            }

            return desc;
        }
    }

}


class MergeServerMsgVo {
    public host: string
    public port: number
    public key: string
    public type: number
    public reserve: number
    public reserve2: number
    public constructor() {

        var $portId: number = 443;
        var $hostId: string = localStorage.getItem("ipurl");
        if (!$hostId || $hostId.length < 5) {
            $hostId = "192.168.88.5";
            localStorage.setItem("ipurl", $hostId);
        }
        if (GameStart.outNet) {
            $hostId = "xy.turaing.com";
            localStorage.setItem("ipurl", $hostId);
        }
        this.port = $portId;
        this.host = $hostId;
        this.type = 3  //默认在游戏服
        //MERGE_TYPE_MERGE = 0,	//从服迁移连接到主服
        //MERGE_TYPE_GAME_TO_PK = 1,	//游戏服到Pk服
        //MERGE_TYPE_PK_TO_GAME = 2,	//pk服到游戏服
    }
    public makeBaseKey(): void {
        var userName: string = sessionStorage.getItem("name");
        if (!Boolean(userName)) {
            userName = localStorage.getItem("name");
        }
        var sid: string = sessionStorage.getItem("sid");
        if (!Boolean(sid)) {
            sid = localStorage.getItem("sid");
        }
        var platformid: string = localStorage.getItem("platformid");
        if (GameStart.outNet) {
            if(sid == ""){
                sid = "1001";
            }
            platformid = "3";
        }
        if (userName) {
            this.key = this.makesession(userName, sid, platformid, false, false);
        }

    }
    public makesession(userName: string, m_sid: string, platformid: string, indulge: boolean = false, mobile: boolean = false): string {

        //var platformid: string = localStorage.getItem("platformid");
        GameInstance.sid = m_sid;
        var m_pid: number
        if (platformid && platformid.length) {
            m_pid = Number(platformid);
        } else {
            m_pid = 2;  //内网2.外网3
        }


        var m_uid: string = userName;
        var m_remote_ip: string = "";
        var m_login_key: string = "84adc98ee63b26e2063a796ac982ad77";

        var session_key: string = "";
        var sIndulge: string = "n";
        if (indulge)
            sIndulge = "y";
        var now: number = (new Date().getTime() / 1000) | 0;

        var inviteGuid: string = null;

        if (getUrlParam("inviteGuid")) {
            inviteGuid = getUrlParam("inviteGuid");
        }

        //b64加密
        var src: string;
        src = "pid=" + m_pid + "&sid=" + m_sid + "&uid=" + m_uid + "&time=" + now + "&indulge=" + sIndulge
            + "&mobile=" + (mobile ? "y" : "n") + "&remote_ip=" + m_remote_ip + (inviteGuid ? "&factionguid=" + inviteGuid : "");

        var b = new Base64();
        var auth: string = b.encode(src)

        var md5_str: string = hex_md5(auth + m_login_key);


        var session_key: string = "?auth=" + auth + "&sign=" + md5_str;
        //console.log(auth);
        //console.log(md5_str);
        //console.log(session_key);

        return session_key;
    }


    public readData($byte: ByteArray): void {
        this.host = $byte.readUTF();
        this.port = $byte.readUint32();
        this.key = $byte.readUTF();
        this.type = $byte.readUint32();
        this.reserve = $byte.readUint32();
        this.reserve2 = $byte.readUint32();
    }
    //merge_host, String, False,/*合服域名*/
    //merge_port, uint32, False,/*合服端口*/
    //merge_key, String, False,/*合服sessionkey*/
    //merge_type, uint32, False,/*合服类型*/
    //reserve, uint32, False,/*预留*/
    //reserve2, uint32, False,/*预留2*/
}
class GameConfigData {
    //通用0-1 0代表不屏蔽 1代表屏蔽
    private _block_other_plr: number;//屏蔽其他玩家
    private _block_effect_ski: number;//屏蔽技能特效
    private _block_plr_flyword: number;//屏蔽战斗飘字
    //0-1逐级增大
    private _block_volume_set: number;//设置音量
    private _block_sound_set: number;//设置音效

    private _open_prompting_pboss: string = ""//个人boss提醒设置
    private _open_prompting_sboss: string = ""//全民boss提醒设置

    public read(): void {
        // read cookie
        if (!localStorage.getItem("gameconfig_block_other_plr")) {
            this._block_other_plr = 0;
        } else {
            this._block_other_plr = Number(localStorage.getItem("gameconfig_block_other_plr"));
        }
        if (!localStorage.getItem("gameconfig_block_effect_ski")) {
            this._block_effect_ski = 0;
        } else {
            this._block_effect_ski = Number(localStorage.getItem("gameconfig_block_effect_ski"));
        }
        if (!localStorage.getItem("gameconfig_block_plr_flyword")) {
            this._block_plr_flyword = 0;
        } else {
            this._block_plr_flyword = Number(localStorage.getItem("gameconfig_block_plr_flyword"));
        }
        if (!localStorage.getItem("gameconfig_block_volume_set")) {
            this._block_volume_set = 1;
        } else {
            this._block_volume_set = Number(localStorage.getItem("gameconfig_block_volume_set"));
        }

        SoundManager.getInstance().setVolume(this._block_volume_set);

        if (!localStorage.getItem("gameconfig_block_sound_set")) {
            this._block_sound_set = 1;
        } else {
            this._block_sound_set = Number(localStorage.getItem("gameconfig_block_sound_set"));
        }

        SoundManager.getInstance().setSkillVolume(this._block_sound_set);

        if (!localStorage.getItem("gameconfig_open_prompting_pboss")) {
            var ary = tb.Tb_private_boss_info.get_Tb_private_boss_info();
            for (var i = 0; i < ary.length; i++) {
                this._open_prompting_pboss += "1|";
            }
        } else {
            this._open_prompting_pboss = localStorage.getItem("gameconfig_open_prompting_pboss");
        }

        if (!localStorage.getItem("gameconfig_open_prompting_sboss")) {
            var ary1 = tb.TB_mass_boss_info.getItem();
            for (var i = 0; i < ary1.length; i++) {
                this._open_prompting_sboss += "1|";
            }
        } else {
            this._open_prompting_sboss = localStorage.getItem("gameconfig_open_prompting_sboss");
        }

    }


    public set block_other_plr(val: number) {
        this._block_other_plr = val;
        // write cookie
        localStorage.setItem("gameconfig_block_other_plr", String(this._block_other_plr));
    }

    public get block_other_plr(): number {
        return this._block_other_plr;
    }
    public set block_effect_ski(val: number) {
        this._block_effect_ski = val;
        // write cookie
        localStorage.setItem("gameconfig_block_effect_ski", String(val));
    }

    public get block_effect_ski(): number {
        return this._block_effect_ski;
    }
    public set block_plr_flyword(val: number) {
        this._block_plr_flyword = val;
        // write cookie
        localStorage.setItem("gameconfig_block_plr_flyword", String(val));
    }

    public get block_plr_flyword(): number {
        return this._block_plr_flyword;
    }
    public set block_volume_set(val: number) {
        this._block_volume_set = val;
        // write cookie
        SoundManager.getInstance().setVolume(this._block_volume_set);
        localStorage.setItem("gameconfig_block_volume_set", String(val));
    }

    public get block_volume_set(): number {
        return this._block_volume_set;
    }
    public set block_sound_set(val: number) {
        this._block_sound_set = val;
        // write cookie
        SoundManager.getInstance().setSkillVolume(this._block_sound_set);
        localStorage.setItem("gameconfig_block_sound_set", String(val));
    }

    public get block_sound_set(): number {
        return this._block_sound_set;
    }


    public setopen_prompting_pboss(id:number,val: boolean) {
        var ary = this._open_prompting_pboss.split("|")
        ary[id] = val?"1":"0"
        var cc:string = ""
        for (var i = 0; i < ary.length; i++) {
            cc += ary[i].concat("|");
        }
        this._open_prompting_pboss = cc
        console.log("----cccccccccccccc-------------------",cc);
        // write cookie
        localStorage.setItem("gameconfig_open_prompting_pboss", cc);
    }

    public getopen_prompting_pboss(id:number): boolean {
        var ary = this._open_prompting_pboss.split("|")
        console.log("--------------------dddddddddddddddddd----------",id,ary);
        return Number(ary[id]) == 1;
    }

    public setopen_prompting_sboss(id:number,val: boolean) {
        var ary = this._open_prompting_sboss.split("|")
        ary[id] = val?"1":"0"
        var cc:string = ""
        for (var i = 0; i < ary.length; i++) {
            cc += ary[i].concat("|");
        }
        this._open_prompting_sboss = cc
        console.log("----cccccccccccccc-------------------",id,cc,val);
        // write cookie
        localStorage.setItem("gameconfig_open_prompting_sboss", cc);
    }

    public getopen_prompting_sboss(id:number): boolean {
        var ary = this._open_prompting_sboss.split("|")
        console.log("--------------------dddddddddddddddddd----------",id,ary);
        return Number(ary[id]) == 1;
    }




}
class GameData {

    public static mergeServerMsgVo: MergeServerMsgVo

    public static needCreatChar: boolean = true;
    public static roleInitPos: Vector2D = new Vector2D();

    public static initGMbg: boolean = false;
    public static collectionType: number = 0;  //基础攻击0, 采集1,对话2

    public static enterSceneNextOpenEvent: any;  //进入场景后的事件

    public static configData: GameConfigData = new GameConfigData;
    /*
    *$typeId  模块面板ID
    *data:属性显示
    */
    public static changeMsgToMainUi($panelId: number, value: boolean): void {
        GameData.changeMsgToMainUi
        msgtip.MsgTipManager.outStrById(22, 7);
    }
    public static getIconCopyUrl($id): string {
        var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($id)
        return geteqiconIconUrl($vo.icon)
    }
    public static getPropName($id): string {
        var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($id)
        return $vo.name
    }
    public static getAvataCopyUrl($id): number {
        var $aa: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($id)
        return $aa.avatar
    }

    public static getJoinTimeByItem($arr: Array<number>): string {
        var $str: string = ""
        if ($arr[0] < 10) {
            $str += "0";
        }
        $str += $arr[0] + ":";
        if ($arr[1] < 10) {
            $str += "0";
        }
        $str += $arr[1];
        $str += "-";
        if ($arr[2] < 10) {
            $str += "0";
        }
        $str += $arr[2] + ":";

        if ($arr[3] < 10) {
            $str += "0";
        }
        $str += $arr[3];


        return $str
    }

    public static drawEquToSkinName($key: string, $id: number, $num: number, $uiAtlas: UIAtlas): void {

        LoadManager.getInstance().load(Scene_data.fileRoot + GameData.getIconCopyUrl($id), LoadManager.IMG_TYPE,
            ($img: any) => {
                var $skillrec: UIRectangle = $uiAtlas.getRec($key);
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                UiDraw.cxtDrawImg($ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight), UIData.publicUi);
                $ctx.drawImage($img, 2, 2, $skillrec.pixelWitdh - 4, $skillrec.pixelHeight - 4);
                if ($num > 1) {
                    ArtFont.getInstance().writeFontToCtxRight($ctx, String($num), ArtFont.num1, $skillrec.pixelWitdh - 2, $skillrec.pixelHeight - 20, 3)
                }
                $uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
            });
    }
    public static publicbgUiAtlas: UIAtlas
    public static getPublicUiAtlas($fun: Function): void {
        if (!this.publicbgUiAtlas) {
            this.publicbgUiAtlas = new UIAtlas;
            this.publicbgUiAtlas.setInfo("ui/uidata/public/publicbg.xml", "ui/uidata/public/publicbg.png", () => {
                $fun(this.publicbgUiAtlas)
            });
        } else {
            $fun(this.publicbgUiAtlas)
        }

    }

}