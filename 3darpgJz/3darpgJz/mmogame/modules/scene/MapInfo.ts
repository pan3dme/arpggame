class MapInfo extends GuidObject {

    public static hasInit: boolean = false;
    public static STATE_249: number = 249;  //失败
    public static STATE_250: number = 250;  //成功
    public static STATE_251: number = 251;  //副本未通关

    public onBaseCreated(): void {
        this.initMap();
        if (!MapInfo.hasInit) {
            Engine.resReady();
        }
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };

        this.AddListen(SharedDef.MAP_INT_FIELD_END_TM, ($binlog: any) => { this.mapIntFieldEndTmChange() });

        this.AddListenString(SharedDef.MAP_STR_REWARD, ($binlog: any) => { this.mapRewardChange() })
    }


    public getMapWaveCount(): number {
        return this.GetUInt16(SharedDef.MAP_INT_FIELD_INSTANCE_WAVE, 0);
    }

    public getMapWaveAllCount(): number {
        return this.GetUInt16(SharedDef.MAP_INT_FIELD_INSTANCE_WAVE, 1);
    }


    public getKuafuGropuInstanceFieldsHard(): number {
        return this.GetUInt32(SharedDef.KUAFU_GROUP_INSTANCE_FIELDS_HARD)
    }



    public getVipInstanceFieldReward(): string {
        return this.GetStr(SharedDef.MAP_STR_REWARD);
    }
    private mapRewardChange(): void {

        var $evt: fb.FubenEvent = new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_REWARD_EVENT)
        var $rewardItem: Array<Array<number>> = new Array
        var $rewardStr: string = GuidData.map.getVipInstanceFieldReward();
        var $arr: Array<string> = $rewardStr.split(",");
        for (var i: number = 0; i < $arr.length; i++) {
            var $kkkk: Array<number> = new Array()
            var rwid: Array<string> = $arr[i].split(":")
            $kkkk.push(Number(rwid[0]))
            $kkkk.push(Number(rwid[1]))
            $rewardItem.push($kkkk)
        }
        console.log("副本奖励", $rewardItem);
        $evt.data = $rewardItem
        ModuleEventManager.dispatchEvent($evt);//副本


        // ModuleEventManager.dispatchEvent(new  adventuresettlement.AdventureSettlementEvent(adventuresettlement.AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL))
    }

    public getResMapID(): number {
        return this.GetUInt32(SharedDef.RES_INSTANCE_FIELD_ID);
    }
    public getPersonBossMapID(): number {
        return this.GetUInt32(SharedDef.MAP_PRIVATE_BOSS_INT_FIELD_ID);
    }
    private mapIntFieldEndTmChange(): void {

        if (this.is3V3()) {  //跨服3v3
            //ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT));
        }
        if (this.is1V1()) {  //跨服1v1
            //ModuleEventManager.dispatchEvent(new kuafu.KuaFu1v1Event(kuafu.KuaFu1v1Event.SHOW_1V1_END_PANEL));
        }
        if (this.isXianfu()) {  //跨服3v3
            //ModuleEventManager.dispatchEvent(new kuafu.XianFuEvent(kuafu.XianFuEvent.XIANFU_ENDPANEL_EVENT));
            // this.getXianFuBangData();
        }
        if (this.isFuBen()) {  //vip副本 试练,资源

            //ModuleEventManager.dispatchEvent(new  adventuresettlement.AdventureSettlementEvent(adventuresettlement.AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL))

            var $state: number = GuidData.map.GetUInt8(SharedDef.MAP_INT_FIELD_STATE, 1);
            if ($state == MapInfo.STATE_250) {
                ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_REWARD_EVENT));//副本成功
            } else {
                ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_FAIL_EVENT));//副本失败
            }
        }





    }





    private dataUpdate($intMask: Object, $strMask: Object): void {
        // if (this.isXianfu()) {
        //     for (var k in $intMask) {
        //         var kNum: number = Number(k);
        //         if (kNum >= SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START && kNum < SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_END) {
        //             var ks: number = (kNum - SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START);
        //             var kd: number = float2int(ks / SharedDef.MAX_KUAFU_XIANFU_INT_COUNT);
        //             ks = ks % SharedDef.MAX_KUAFU_XIANFU_INT_COUNT;
        //             if (ks == SharedDef.KUAFU_XIANFU_PLAYER_SHOW_INFO) {
        //                 //第kd个数量变化
        //                 var evt: kuafu.XianFuEvent = new kuafu.XianFuEvent(kuafu.XianFuEvent.XIANFU_BAOXIANG_CHANG_EVENT);
        //                 evt.id = kd;
        //                 ModuleEventManager.dispatchEvent(evt);
        //             }
        //         }
        //     }

        //     for (var k in $strMask) {
        //         var kNum: number = Number(k);
        //         if (kNum >= SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_START && kNum < SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_END) {
        //             var evt: kuafu.XianFuEvent = new kuafu.XianFuEvent(kuafu.XianFuEvent.XIANFU_PLAYER_CHANG_EVENT);
        //             ModuleEventManager.dispatchEvent(evt);
        //         }
        //     }

        // } else 
        if (this.isFuBen()) {
            var $process: boolean = false
            for (var k in $intMask) {
                var kNum: number = Number(k);
                if (kNum >= SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_START && kNum < SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_END) {
                    $process = true
                    break;
                }
                if (kNum >= SharedDef.MAP_INT_FIELD_QUESTS_START && kNum < SharedDef.MAP_INT_FIELD_QUESTS_END) {
                    $process = true
                    break;
                }
            }
            if ($process) {
                ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS));
            }
        } else if (this.is3V3()) {
            var $dic: any = new Object();
            for (var k in $intMask) {
                var kNum: number = Number(k);
                if (kNum < SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START) continue;
                // console.log("int", kNum)
                var kuafu3v3Indx: number = Math.floor((kNum - SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START) / SharedDef.MAX_KUAFU_3V3_INT_COUNT);
                if (!$dic[kuafu3v3Indx]) {
                    $dic[kuafu3v3Indx] = 1;
                }
            }

            for (var k in $strMask) {
                var kNum: number = Number(k);
                if (kNum < SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START) continue;
                // console.log("str", kNum)
                var kuafu3v3Indx: number = Math.floor((kNum - SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START) / SharedDef.MAX_KUAFU_3V3_STR_COUNT);
                if (!$dic[kuafu3v3Indx]) {
                    $dic[kuafu3v3Indx] = 1;
                }
            }
            for (var $key in $dic) {
                this.changeKuafu3V3Fields(Number($key))
            }
        }
    }
    private changeKuafu3V3Fields(indx: number): void {
        var intStart: number = SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START + indx * SharedDef.MAX_KUAFU_3V3_INT_COUNT
        var strStart: number = SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START + indx * SharedDef.MAX_KUAFU_3V3_STR_COUNT
        //var $vo: Kuafu3V3dataVo = new Kuafu3V3dataVo();
        //$vo.makeData(this, intStart, strStart, indx);
        this._kuafu3V3DataItem = null
        //ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT));//跨服匹配

    }
    private _kuafu3V3DataItem: Array<Kuafu3V3dataVo>
    public getKuafu3V3DataItem(): Array<Kuafu3V3dataVo> {
        if (!this._kuafu3V3DataItem) {
            var $arr: Array<Kuafu3V3dataVo> = new Array()
            for (var i: number = 0; i < SharedDef.MAX_KUAFU_3V3_COUNT; i++) {
                var intStart: number = SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START + i * SharedDef.MAX_KUAFU_3V3_INT_COUNT;
                var strStart: number = SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START + i * SharedDef.MAX_KUAFU_3V3_STR_COUNT;
                var $vo: Kuafu3V3dataVo = new Kuafu3V3dataVo();
                $vo.makeData(this, intStart, strStart, i)
                if ($vo.name) {
                    $arr.push($vo);
                }
            }
            this._kuafu3V3DataItem = $arr;
        }
        return this._kuafu3V3DataItem;
    }


    public tbMapVo: tb.TB_map;
    public initMap(): void {
        FpsMc.tipStr = "-v4";
        //   console.log("进入地图");
        var $mapId: number = this.getMapID()
        var str: string = "地图信息- 地图id:" + this.getMapID() + " 实例ID：" + this.getInstanceID() + " 线程ID：" + this.getLineID() + " 名字：" + this.getMapStrGeneralId();
        this.tbMapVo = tb.TB_map.getTB_map($mapId)
        GameInstance.intLoadScene(this.tbMapVo.mapres);


    }
    public is3V3(): Boolean {
        if (this.tbMapVo && this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_KUAFU_3V3) {  //跨服3v3
            return true
        }
        return false
    }
    public isWBoss(): Boolean {
        if (this.tbMapVo && this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_WORLD_BOSS) {  //跨服3v3
            return true
        }
        return false
    }
    public is1V1(): Boolean {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {  //
            if (this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_DOUJIANTAI) {  //跨服1v1
                return true
            }
        }
        return false
    }
    //挂机场景;
    public isAdventureScene(): boolean {
        var $num: number = GuidData.map.getTrialInstanceFieldSectionId()
        if ($num > 0) {
            return true
        } else {
            return false
        }
    }
    public isAdventureBossScene(): boolean {
        var $num: number = Math.floor(GuidData.map.getTrialInstanceFieldSectionId() / 1000000)
        if ($num == 2) {
            return true
        } else {
            return false
        }
    }
    public isAdventureBaseScene(): boolean {
        var $num: number = Math.floor(GuidData.map.getTrialInstanceFieldSectionId() / 1000000)
        if ($num == 1) {
            return true
        } else {
            return false
        }
    }

    //家族场景;
    public isFamilyScene(): boolean {
        return GuidData.map.tbMapVo.inst_sub_type == 11;

    }
    public isXiuLian(): Boolean {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {  //
            if (this.tbMapVo.inst_sub_type == 9) {  //跨服1v1
                return true
            }
        }
        return false
    }
    public isXianfu(): Boolean {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {  //
            if (this.tbMapVo.inst_sub_type == 6) {  //仙府
                return true
            }
            if (this.tbMapVo.inst_sub_type == 8) {  //仙府夺宝体验副本
                return true
            }
        }
        return false
    }
    public isWorldBoss(): boolean {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {  //
            if (this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_WORLD_BOSS) {  //世界BOSS
                return true
            }
        }
        return false

    }
    public isBaseMap(): boolean {
        if (this.tbMapVo && this.tbMapVo.inst_type == 0) {  //
            return true
        }
        return false

    }

    public showAreaById($id: number): boolean {

        if (this.tbMapVo) {  //
            return this.tbMapVo.showAreaById($id)
        }
        return false

    }
    public getTrialInstanceFieldSectionId(): number {
        return this.GetUInt32(SharedDef.TRIAL_INSTANCE_FIELD_SECTION_ID);
    }

    public getTialID(): number {
        return this.GetUInt32(SharedDef.TRIAL_INSTANCE_FIELD_ID);
    }


    public isFuBen(): boolean {

        if (this.tbMapVo && this.tbMapVo.is_instance) {  //副本
            return true
        }
        return false

    }
    public isKuafuZhuDuiFuben(): boolean {
        if (this.tbMapVo && this.tbMapVo.inst_sub_type == 12) {
            return true;
        } else {
            return false;
        }
    }

    public dispose(): void {//离开地图
        super.dispose();
        GameInstance.clearRoleList();
        AstarUtil.clear();
        SceneManager.getInstance().clearScene();
    }


    // 地图
    public getMapID(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_MAP_ID);
    }
    public getInstanceID(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_INSTANCE_ID);
    }

    public getLineID(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_LINE_NO);
    }
    //关卡层数
    public getFloorNum(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_RESERVE3);
    }

    public getReserve2(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_RESERVE2);
    }

    /**仙府夺宝玩家名称列表 */
    public getXianFuPlayerList(): Array<string> {
        var ary: Array<string> = new Array;
        for (var i: number = SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_START; i < SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_END; i += SharedDef.MAX_KUAFU_XIANFU_STR_COUNT) {
            var name: string = this.GetStr(i + SharedDef.KUAFU_XIANFU_PLAYER_NAME);
            if (name && name != "") {
                ary.push(name);
            }
        }
        return ary;
    }

    /**仙府夺宝玩家GUID列表 */
    public getXianFuPlayerGuidList(): Array<string> {
        var ary: Array<string> = new Array;
        for (var i: number = SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_START; i < SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_END; i += SharedDef.MAX_KUAFU_XIANFU_STR_COUNT) {
            var name: string = this.GetStr(i + SharedDef.KUAFU_XIANFU_PLAYER_GUID);
            if (name && name != "") {
                ary.push(name);
            }
        }
        return ary;
    }


    /**仙府夺宝玩家宝箱数量 */
    public getXianFuPlayerScore(id: number): number {
        var idx: number = SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START + id * SharedDef.MAX_KUAFU_XIANFU_INT_COUNT + SharedDef.KUAFU_XIANFU_PLAYER_SHOW_INFO;
        return this.GetByte(idx, 0);
    }
    public getXianFuBangData(): Array<EndVo> {
        var $backItem: Array<EndVo> = new Array;
        var $playList: Array<string> = this.getXianFuPlayerList()
        for (var i: number = 0; i < $playList.length; i++) {
            var $arr: EndVo = new EndVo();
            $arr.name = $playList[i];
            // byte0: 宝箱数量, byte1:击杀人数, byte2:击杀BOSS数量)
            var idx: number = SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START + i * SharedDef.MAX_KUAFU_XIANFU_INT_COUNT + SharedDef.KUAFU_XIANFU_PLAYER_SHOW_INFO;
            var idx2: number = SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START + i * SharedDef.MAX_KUAFU_XIANFU_INT_COUNT + SharedDef.KUAFU_XIANFU_PLAYER_SETTLEMENT;

            $arr.power = this.GetDouble(idx2);
            $arr.boxNum = this.GetByte(idx, 0);
            $arr.killperson = this.GetByte(idx, 1);
            $arr.killboss = this.GetByte(idx, 2);

            $backItem.push($arr);
        }

        $backItem.sort(
            function (a: EndVo, b: EndVo): number {
                if (a.boxNum == b.boxNum) {
                    //宝箱数量相等
                    if (a.killperson == b.killperson) {
                        //击杀人数相等
                        if (a.killboss == b.killboss) {
                            //击杀boss相等,按人物战力排序
                            return b.power - a.power
                        } else {
                            return b.killboss - a.killboss
                        }
                    } else {
                        return b.killperson - a.killperson
                    }
                } else {
                    return b.boxNum - a.boxNum;
                }
            }
        );
        console.log("endvo----", $backItem);
        return $backItem;
    }

    public getXianFuBoss(): Array<any> {
        var ary: Array<any> = new Array
        for (var i: number = SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INFO_START; i < SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INFO_END; i += SharedDef.MAX_KUAFU_XIANFU_BOSS_INT_COUNT) {
            var idx: number = i + SharedDef.KUAFU_XIANFU_BOSS_SHOW_INFO
            var entry: number = this.GetUInt16(idx, 0);
            if (entry > 0) {
                var obj: any = new Object();
                obj.entry = entry
                obj.idx = idx;
                obj.time = this.GetUInt32(i + SharedDef.KUAFU_XIANFU_BOSS_BORN_TIME);
                ary.push(obj);
            }
        }
        return ary;
    }

    /**获取boss状态 */
    public getXianFuBossState($idx: number): number {
        return this.GetUInt16($idx, 1);
    }
    /**获取仙府等级 */
    public getXianFuLevel(): number {
        return this.GetUInt32(SharedDef.KUAFU_XIANFU_FIELDS_HARD);
    }


    public getMapStrGeneralId(): string {
        return this.GetStr(SharedDef.MAP_STR_GENERAL_ID);
    }
    /**副本结束时间戳 */
    public getMapIntFieldEndTM(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_END_TM);
    }
    public getMapIntFieldCreateTm(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_CREATE_TM);
    }
    /**1v1 */
    public getDouJianTaiFieldsIntRank(): Array<number> {
        var a: number = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_RANK, 0);
        var b: number = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_RANK, 1);
        return [a, b]
    }
    /**1v1 */
    public getDouJianTaiFieldsIntCombatWinInfo(): Array<number> {
        var a: number = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_COMBAT_WIN_INFO, 0);
        var b: number = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_COMBAT_WIN_INFO, 1);
        return [a, b]
    }



    public getMapIntFieldQuestEndTm(): number {


        return this.GetUInt32(SharedDef.MAP_INT_FIELD_QUEST_END_TM);
    }
    //MAP_INT_FIELD_START_TM
    public getMapIntFieldStartTm(): number {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_START_TM);
    }
    //VIP_INSTANCE_FIELD_ID
    public getVipInstanceFieldId(): number {
        return this.GetUInt32(SharedDef.VIP_INSTANCE_FIELD_ID);
    }
    public getMapIntFieldQuests(): Array<any> {
        //public static INSTANCE_QUEST_TYPE_KILL_MONSTER: number = 1;	// 击杀怪物(creatureId, num)
        //public static INSTANCE_QUEST_TYPE_PICK_ITEM: number = 2;	// 收集物品
        //public static INSTANCE_QUEST_TYPE_ACTIVE_MACHINE: number = 3;	// 激活机关
        //public static INSTANCE_QUEST_TYPE_PROTECT_NPC: number = 4;	// 守护NPC
        //public static INSTANCE_QUEST_TYPE_ESCORT_NPC: number = 5;	// 护送NPC
        //public static INSTANCE_QUEST_TYPE_DEFENSE: number = 6;	// 防守
        //public static INSTANCE_QUEST_TYPE_BREAK_THROUGH: number = 7;	// 闯关

        var item: Array<any> = new Array
        for (var i: number = SharedDef.MAP_INT_FIELD_QUESTS_START; i < SharedDef.MAP_INT_FIELD_QUESTS_END; i += 2) {
            var $instanceQuestType: number = this.GetByte(i, 0);
            if ($instanceQuestType > 0) {
                switch ($instanceQuestType) {
                    case SharedDef.INSTANCE_QUEST_TYPE_KILL_MONSTER:
                        var num: number = this.GetByte(i, 1);
                        var creatureId: number = this.GetUInt16(i, 1);

                        item.push({ creatureId: creatureId, num: num, questType: $instanceQuestType })
                        break;
                    case SharedDef.INSTANCE_QUEST_TYPE_PROTECT_NPC:
                        var HP: number = this.GetByte(i, 1);
                        var creatureId: number = this.GetUInt16(i, 1);

                        item.push({ creatureId: creatureId, num: HP, questType: $instanceQuestType })
                        break;

                    default:
                        break;

                }
            }
        }
        return item
    }

    public getMapIntFieldQuestProcess(): Array<any> {
        var item: Array<any> = new Array
        for (var i: number = SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_START; i < SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_END; i++) {
            for (var j: number = 0; j < 4; j++) {
                var $dd: number = this.GetByte(i, j);
                item.push($dd);
            }
        }
        return item
    }


}

class Kuafu3V3dataVo {

    public gender: number
    public hprate: number
    public level: number

    public killnum: number
    public dieState: number
    public group: number
    public name: string

    public jifen: number;
    public rongyu: number;
    public zuijia: number;
    public shanghai: number;

    public constructor() {
        this.name = "1,2,没有极杰";
        this.group = 1
        this.gender = 1;
        this.dieState = 0
        this.level = 45
        this.hprate = random(100)
    }

    public makeData($pake: MapInfo, intStart: number, strStart: number, indx: number): void {

        var a: number = $pake.GetInt32(intStart + SharedDef.KUAFU_3V3_PLAYER_DAMAGE)

        // 2个byte, 1个short(byte0:gender, byte1:hprate, short1:level)
        this.gender = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO, 0)
        this.hprate = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO, 1)
        this.level = $pake.GetUInt16(intStart + SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO, 1)

        // 计算信息, 4个byte(0:击杀数量,1:死亡状态,2:所属阵营,3:保留)
        this.killnum = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 0)
        this.dieState = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 1)
        this.group = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 2)
        this.jifen = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 3)

        this.rongyu = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_HONOR, 0)
        this.zuijia = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_HONOR, 1)

        this.shanghai = $pake.GetDouble(intStart + SharedDef.KUAFU_3V3_PLAYER_DAMAGE)

        this.name = $pake.GetStr(strStart + SharedDef.KUAFU_3V3_PLAYER_NAME)



        //public static KUAFU_3V3_PLAYER_SETTLEMENT: number = 3;	//  计算信息, 4bytes(0:击杀数量,1:死亡状态,2:所属阵营,3:积分)
        //public static KUAFU_3V3_PLAYER_HONOR: number = 4;	//  荣誉及全场最佳, 4bytes(0:获得荣誉, 1:全场最佳,2:保留,3:保留)



    }


}
class EndVo {
    public name: string
    public killboss: number
    public killperson: number
    public boxNum: number
    public power: number
}

class FirstvictoryVo {
    public data: tb.TB_doujiantai_first
    /** 0:达到未领取  1：未达到  2：达到已领取 */
    public state: number
}