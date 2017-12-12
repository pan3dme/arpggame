var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MapInfo = /** @class */ (function (_super) {
    __extends(MapInfo, _super);
    function MapInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MapInfo.prototype.onBaseCreated = function () {
        var _this = this;
        this.initMap();
        if (!MapInfo.hasInit) {
            Engine.resReady();
        }
        this._after_update = function ($flag, $intMask, $strMask) { _this.dataUpdate($intMask, $strMask); };
        this.AddListen(SharedDef.MAP_INT_FIELD_END_TM, function ($binlog) { _this.mapIntFieldEndTmChange(); });
        this.AddListenString(SharedDef.MAP_STR_REWARD, function ($binlog) { _this.mapRewardChange(); });
    };
    MapInfo.prototype.getMapWaveCount = function () {
        return this.GetUInt16(SharedDef.MAP_INT_FIELD_INSTANCE_WAVE, 0);
    };
    MapInfo.prototype.getMapWaveAllCount = function () {
        return this.GetUInt16(SharedDef.MAP_INT_FIELD_INSTANCE_WAVE, 1);
    };
    MapInfo.prototype.getKuafuGropuInstanceFieldsHard = function () {
        return this.GetUInt32(SharedDef.KUAFU_GROUP_INSTANCE_FIELDS_HARD);
    };
    MapInfo.prototype.getVipInstanceFieldReward = function () {
        return this.GetStr(SharedDef.MAP_STR_REWARD);
    };
    MapInfo.prototype.mapRewardChange = function () {
        var $evt = new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_REWARD_EVENT);
        var $rewardItem = new Array;
        var $rewardStr = GuidData.map.getVipInstanceFieldReward();
        var $arr = $rewardStr.split(",");
        for (var i = 0; i < $arr.length; i++) {
            var $kkkk = new Array();
            var rwid = $arr[i].split(":");
            $kkkk.push(Number(rwid[0]));
            $kkkk.push(Number(rwid[1]));
            $rewardItem.push($kkkk);
        }
        console.log("副本奖励", $rewardItem);
        $evt.data = $rewardItem;
        ModuleEventManager.dispatchEvent($evt); //副本
        // ModuleEventManager.dispatchEvent(new  adventuresettlement.AdventureSettlementEvent(adventuresettlement.AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL))
    };
    MapInfo.prototype.getResMapID = function () {
        return this.GetUInt32(SharedDef.RES_INSTANCE_FIELD_ID);
    };
    MapInfo.prototype.getPersonBossMapID = function () {
        return this.GetUInt32(SharedDef.MAP_PRIVATE_BOSS_INT_FIELD_ID);
    };
    MapInfo.prototype.mapIntFieldEndTmChange = function () {
        if (this.is3V3()) {
            //ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.KUAFU_3V3_FINISH_EVENT));
        }
        if (this.is1V1()) {
            //ModuleEventManager.dispatchEvent(new kuafu.KuaFu1v1Event(kuafu.KuaFu1v1Event.SHOW_1V1_END_PANEL));
        }
        if (this.isXianfu()) {
            //ModuleEventManager.dispatchEvent(new kuafu.XianFuEvent(kuafu.XianFuEvent.XIANFU_ENDPANEL_EVENT));
            // this.getXianFuBangData();
        }
        if (this.isFuBen()) {
            //ModuleEventManager.dispatchEvent(new  adventuresettlement.AdventureSettlementEvent(adventuresettlement.AdventureSettlementEvent.SHOW_ADVENTURE_SETTLEMENT_UI_PANEL))
            var $state = GuidData.map.GetUInt8(SharedDef.MAP_INT_FIELD_STATE, 1);
            if ($state == MapInfo.STATE_250) {
                ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_REWARD_EVENT)); //副本成功
            }
            else {
                ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.FUBEN_SHOW_FAIL_EVENT)); //副本失败
            }
        }
    };
    MapInfo.prototype.dataUpdate = function ($intMask, $strMask) {
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
            var $process = false;
            for (var k in $intMask) {
                var kNum = Number(k);
                if (kNum >= SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_START && kNum < SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_END) {
                    $process = true;
                    break;
                }
                if (kNum >= SharedDef.MAP_INT_FIELD_QUESTS_START && kNum < SharedDef.MAP_INT_FIELD_QUESTS_END) {
                    $process = true;
                    break;
                }
            }
            if ($process) {
                ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS));
            }
        }
        else if (this.is3V3()) {
            var $dic = new Object();
            for (var k in $intMask) {
                var kNum = Number(k);
                if (kNum < SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START)
                    continue;
                // console.log("int", kNum)
                var kuafu3v3Indx = Math.floor((kNum - SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START) / SharedDef.MAX_KUAFU_3V3_INT_COUNT);
                if (!$dic[kuafu3v3Indx]) {
                    $dic[kuafu3v3Indx] = 1;
                }
            }
            for (var k in $strMask) {
                var kNum = Number(k);
                if (kNum < SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START)
                    continue;
                // console.log("str", kNum)
                var kuafu3v3Indx = Math.floor((kNum - SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START) / SharedDef.MAX_KUAFU_3V3_STR_COUNT);
                if (!$dic[kuafu3v3Indx]) {
                    $dic[kuafu3v3Indx] = 1;
                }
            }
            for (var $key in $dic) {
                this.changeKuafu3V3Fields(Number($key));
            }
        }
    };
    MapInfo.prototype.changeKuafu3V3Fields = function (indx) {
        var intStart = SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START + indx * SharedDef.MAX_KUAFU_3V3_INT_COUNT;
        var strStart = SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START + indx * SharedDef.MAX_KUAFU_3V3_STR_COUNT;
        //var $vo: Kuafu3V3dataVo = new Kuafu3V3dataVo();
        //$vo.makeData(this, intStart, strStart, indx);
        this._kuafu3V3DataItem = null;
        //ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.KUAFU_3V3_FIELDS_REFRESH_EVENT));//跨服匹配
    };
    MapInfo.prototype.getKuafu3V3DataItem = function () {
        if (!this._kuafu3V3DataItem) {
            var $arr = new Array();
            for (var i = 0; i < SharedDef.MAX_KUAFU_3V3_COUNT; i++) {
                var intStart = SharedDef.KUAFU_3V3_FIELDS_INT_INFO_START + i * SharedDef.MAX_KUAFU_3V3_INT_COUNT;
                var strStart = SharedDef.KUAFU_3V3_FIELDS_STR_INFO_START + i * SharedDef.MAX_KUAFU_3V3_STR_COUNT;
                var $vo = new Kuafu3V3dataVo();
                $vo.makeData(this, intStart, strStart, i);
                if ($vo.name) {
                    $arr.push($vo);
                }
            }
            this._kuafu3V3DataItem = $arr;
        }
        return this._kuafu3V3DataItem;
    };
    MapInfo.prototype.initMap = function () {
        FpsMc.tipStr = "-v4";
        //   console.log("进入地图");
        var $mapId = this.getMapID();
        var str = "地图信息- 地图id:" + this.getMapID() + " 实例ID：" + this.getInstanceID() + " 线程ID：" + this.getLineID() + " 名字：" + this.getMapStrGeneralId();
        this.tbMapVo = tb.TB_map.getTB_map($mapId);
        GameInstance.intLoadScene(this.tbMapVo.mapres);
    };
    MapInfo.prototype.is3V3 = function () {
        if (this.tbMapVo && this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_KUAFU_3V3) {
            return true;
        }
        return false;
    };
    MapInfo.prototype.isWBoss = function () {
        if (this.tbMapVo && this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_WORLD_BOSS) {
            return true;
        }
        return false;
    };
    MapInfo.prototype.is1V1 = function () {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {
            if (this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_DOUJIANTAI) {
                return true;
            }
        }
        return false;
    };
    //挂机场景;
    MapInfo.prototype.isAdventureScene = function () {
        var $num = GuidData.map.getTrialInstanceFieldSectionId();
        if ($num > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MapInfo.prototype.isAdventureBossScene = function () {
        var $num = Math.floor(GuidData.map.getTrialInstanceFieldSectionId() / 1000000);
        if ($num == 2) {
            return true;
        }
        else {
            return false;
        }
    };
    MapInfo.prototype.isAdventureBaseScene = function () {
        var $num = Math.floor(GuidData.map.getTrialInstanceFieldSectionId() / 1000000);
        if ($num == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    //家族场景;
    MapInfo.prototype.isFamilyScene = function () {
        return GuidData.map.tbMapVo.inst_sub_type == 11;
    };
    MapInfo.prototype.isXiuLian = function () {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {
            if (this.tbMapVo.inst_sub_type == 9) {
                return true;
            }
        }
        return false;
    };
    MapInfo.prototype.isXianfu = function () {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {
            if (this.tbMapVo.inst_sub_type == 6) {
                return true;
            }
            if (this.tbMapVo.inst_sub_type == 8) {
                return true;
            }
        }
        return false;
    };
    MapInfo.prototype.isWorldBoss = function () {
        if (this.tbMapVo && this.tbMapVo.inst_type == 1) {
            if (this.tbMapVo.inst_sub_type == SharedDef.INSTANCE_SUB_TYPE_WORLD_BOSS) {
                return true;
            }
        }
        return false;
    };
    MapInfo.prototype.isBaseMap = function () {
        if (this.tbMapVo && this.tbMapVo.inst_type == 0) {
            return true;
        }
        return false;
    };
    MapInfo.prototype.showAreaById = function ($id) {
        if (this.tbMapVo) {
            return this.tbMapVo.showAreaById($id);
        }
        return false;
    };
    MapInfo.prototype.getTrialInstanceFieldSectionId = function () {
        return this.GetUInt32(SharedDef.TRIAL_INSTANCE_FIELD_SECTION_ID);
    };
    MapInfo.prototype.getTialID = function () {
        return this.GetUInt32(SharedDef.TRIAL_INSTANCE_FIELD_ID);
    };
    MapInfo.prototype.isFuBen = function () {
        if (this.tbMapVo && this.tbMapVo.is_instance) {
            return true;
        }
        return false;
    };
    MapInfo.prototype.isKuafuZhuDuiFuben = function () {
        if (this.tbMapVo && this.tbMapVo.inst_sub_type == 12) {
            return true;
        }
        else {
            return false;
        }
    };
    MapInfo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        GameInstance.clearRoleList();
        AstarUtil.clear();
        SceneManager.getInstance().clearScene();
    };
    // 地图
    MapInfo.prototype.getMapID = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_MAP_ID);
    };
    MapInfo.prototype.getInstanceID = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_INSTANCE_ID);
    };
    MapInfo.prototype.getLineID = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_LINE_NO);
    };
    //关卡层数
    MapInfo.prototype.getFloorNum = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_RESERVE3);
    };
    MapInfo.prototype.getReserve2 = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_RESERVE2);
    };
    /**仙府夺宝玩家名称列表 */
    MapInfo.prototype.getXianFuPlayerList = function () {
        var ary = new Array;
        for (var i = SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_START; i < SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_END; i += SharedDef.MAX_KUAFU_XIANFU_STR_COUNT) {
            var name = this.GetStr(i + SharedDef.KUAFU_XIANFU_PLAYER_NAME);
            if (name && name != "") {
                ary.push(name);
            }
        }
        return ary;
    };
    /**仙府夺宝玩家GUID列表 */
    MapInfo.prototype.getXianFuPlayerGuidList = function () {
        var ary = new Array;
        for (var i = SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_START; i < SharedDef.KUAFU_XIANFU_FIELDS_STR_INFO_END; i += SharedDef.MAX_KUAFU_XIANFU_STR_COUNT) {
            var name = this.GetStr(i + SharedDef.KUAFU_XIANFU_PLAYER_GUID);
            if (name && name != "") {
                ary.push(name);
            }
        }
        return ary;
    };
    /**仙府夺宝玩家宝箱数量 */
    MapInfo.prototype.getXianFuPlayerScore = function (id) {
        var idx = SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START + id * SharedDef.MAX_KUAFU_XIANFU_INT_COUNT + SharedDef.KUAFU_XIANFU_PLAYER_SHOW_INFO;
        return this.GetByte(idx, 0);
    };
    MapInfo.prototype.getXianFuBangData = function () {
        var $backItem = new Array;
        var $playList = this.getXianFuPlayerList();
        for (var i = 0; i < $playList.length; i++) {
            var $arr = new EndVo();
            $arr.name = $playList[i];
            // byte0: 宝箱数量, byte1:击杀人数, byte2:击杀BOSS数量)
            var idx = SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START + i * SharedDef.MAX_KUAFU_XIANFU_INT_COUNT + SharedDef.KUAFU_XIANFU_PLAYER_SHOW_INFO;
            var idx2 = SharedDef.KUAFU_XIANFU_FIELDS_INT_INFO_START + i * SharedDef.MAX_KUAFU_XIANFU_INT_COUNT + SharedDef.KUAFU_XIANFU_PLAYER_SETTLEMENT;
            $arr.power = this.GetDouble(idx2);
            $arr.boxNum = this.GetByte(idx, 0);
            $arr.killperson = this.GetByte(idx, 1);
            $arr.killboss = this.GetByte(idx, 2);
            $backItem.push($arr);
        }
        $backItem.sort(function (a, b) {
            if (a.boxNum == b.boxNum) {
                //宝箱数量相等
                if (a.killperson == b.killperson) {
                    //击杀人数相等
                    if (a.killboss == b.killboss) {
                        //击杀boss相等,按人物战力排序
                        return b.power - a.power;
                    }
                    else {
                        return b.killboss - a.killboss;
                    }
                }
                else {
                    return b.killperson - a.killperson;
                }
            }
            else {
                return b.boxNum - a.boxNum;
            }
        });
        console.log("endvo----", $backItem);
        return $backItem;
    };
    MapInfo.prototype.getXianFuBoss = function () {
        var ary = new Array;
        for (var i = SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INFO_START; i < SharedDef.KUAFU_XIANFU_FIELDS_INT_BOSS_INFO_END; i += SharedDef.MAX_KUAFU_XIANFU_BOSS_INT_COUNT) {
            var idx = i + SharedDef.KUAFU_XIANFU_BOSS_SHOW_INFO;
            var entry = this.GetUInt16(idx, 0);
            if (entry > 0) {
                var obj = new Object();
                obj.entry = entry;
                obj.idx = idx;
                obj.time = this.GetUInt32(i + SharedDef.KUAFU_XIANFU_BOSS_BORN_TIME);
                ary.push(obj);
            }
        }
        return ary;
    };
    /**获取boss状态 */
    MapInfo.prototype.getXianFuBossState = function ($idx) {
        return this.GetUInt16($idx, 1);
    };
    /**获取仙府等级 */
    MapInfo.prototype.getXianFuLevel = function () {
        return this.GetUInt32(SharedDef.KUAFU_XIANFU_FIELDS_HARD);
    };
    MapInfo.prototype.getMapStrGeneralId = function () {
        return this.GetStr(SharedDef.MAP_STR_GENERAL_ID);
    };
    /**副本结束时间戳 */
    MapInfo.prototype.getMapIntFieldEndTM = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_END_TM);
    };
    MapInfo.prototype.getMapIntFieldCreateTm = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_CREATE_TM);
    };
    /**1v1 */
    MapInfo.prototype.getDouJianTaiFieldsIntRank = function () {
        var a = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_RANK, 0);
        var b = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_RANK, 1);
        return [a, b];
    };
    /**1v1 */
    MapInfo.prototype.getDouJianTaiFieldsIntCombatWinInfo = function () {
        var a = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_COMBAT_WIN_INFO, 0);
        var b = this.GetUInt16(SharedDef.DOUJIANTAI_FIELDS_INT_COMBAT_WIN_INFO, 1);
        return [a, b];
    };
    MapInfo.prototype.getMapIntFieldQuestEndTm = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_QUEST_END_TM);
    };
    //MAP_INT_FIELD_START_TM
    MapInfo.prototype.getMapIntFieldStartTm = function () {
        return this.GetUInt32(SharedDef.MAP_INT_FIELD_START_TM);
    };
    //VIP_INSTANCE_FIELD_ID
    MapInfo.prototype.getVipInstanceFieldId = function () {
        return this.GetUInt32(SharedDef.VIP_INSTANCE_FIELD_ID);
    };
    MapInfo.prototype.getMapIntFieldQuests = function () {
        //public static INSTANCE_QUEST_TYPE_KILL_MONSTER: number = 1;	// 击杀怪物(creatureId, num)
        //public static INSTANCE_QUEST_TYPE_PICK_ITEM: number = 2;	// 收集物品
        //public static INSTANCE_QUEST_TYPE_ACTIVE_MACHINE: number = 3;	// 激活机关
        //public static INSTANCE_QUEST_TYPE_PROTECT_NPC: number = 4;	// 守护NPC
        //public static INSTANCE_QUEST_TYPE_ESCORT_NPC: number = 5;	// 护送NPC
        //public static INSTANCE_QUEST_TYPE_DEFENSE: number = 6;	// 防守
        //public static INSTANCE_QUEST_TYPE_BREAK_THROUGH: number = 7;	// 闯关
        var item = new Array;
        for (var i = SharedDef.MAP_INT_FIELD_QUESTS_START; i < SharedDef.MAP_INT_FIELD_QUESTS_END; i += 2) {
            var $instanceQuestType = this.GetByte(i, 0);
            if ($instanceQuestType > 0) {
                switch ($instanceQuestType) {
                    case SharedDef.INSTANCE_QUEST_TYPE_KILL_MONSTER:
                        var num = this.GetByte(i, 1);
                        var creatureId = this.GetUInt16(i, 1);
                        item.push({ creatureId: creatureId, num: num, questType: $instanceQuestType });
                        break;
                    case SharedDef.INSTANCE_QUEST_TYPE_PROTECT_NPC:
                        var HP = this.GetByte(i, 1);
                        var creatureId = this.GetUInt16(i, 1);
                        item.push({ creatureId: creatureId, num: HP, questType: $instanceQuestType });
                        break;
                    default:
                        break;
                }
            }
        }
        return item;
    };
    MapInfo.prototype.getMapIntFieldQuestProcess = function () {
        var item = new Array;
        for (var i = SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_START; i < SharedDef.MAP_INT_FIELD_QUESTS_PROCESS_END; i++) {
            for (var j = 0; j < 4; j++) {
                var $dd = this.GetByte(i, j);
                item.push($dd);
            }
        }
        return item;
    };
    MapInfo.hasInit = false;
    MapInfo.STATE_249 = 249; //失败
    MapInfo.STATE_250 = 250; //成功
    MapInfo.STATE_251 = 251; //副本未通关
    return MapInfo;
}(GuidObject));
var Kuafu3V3dataVo = /** @class */ (function () {
    function Kuafu3V3dataVo() {
        this.name = "1,2,没有极杰";
        this.group = 1;
        this.gender = 1;
        this.dieState = 0;
        this.level = 45;
        this.hprate = random(100);
    }
    Kuafu3V3dataVo.prototype.makeData = function ($pake, intStart, strStart, indx) {
        var a = $pake.GetInt32(intStart + SharedDef.KUAFU_3V3_PLAYER_DAMAGE);
        // 2个byte, 1个short(byte0:gender, byte1:hprate, short1:level)
        this.gender = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO, 0);
        this.hprate = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO, 1);
        this.level = $pake.GetUInt16(intStart + SharedDef.KUAFU_3V3_PLAYER_SHOW_INFO, 1);
        // 计算信息, 4个byte(0:击杀数量,1:死亡状态,2:所属阵营,3:保留)
        this.killnum = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 0);
        this.dieState = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 1);
        this.group = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 2);
        this.jifen = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_SETTLEMENT, 3);
        this.rongyu = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_HONOR, 0);
        this.zuijia = $pake.GetByte(intStart + SharedDef.KUAFU_3V3_PLAYER_HONOR, 1);
        this.shanghai = $pake.GetDouble(intStart + SharedDef.KUAFU_3V3_PLAYER_DAMAGE);
        this.name = $pake.GetStr(strStart + SharedDef.KUAFU_3V3_PLAYER_NAME);
        //public static KUAFU_3V3_PLAYER_SETTLEMENT: number = 3;	//  计算信息, 4bytes(0:击杀数量,1:死亡状态,2:所属阵营,3:积分)
        //public static KUAFU_3V3_PLAYER_HONOR: number = 4;	//  荣誉及全场最佳, 4bytes(0:获得荣誉, 1:全场最佳,2:保留,3:保留)
    };
    return Kuafu3V3dataVo;
}());
var EndVo = /** @class */ (function () {
    function EndVo() {
    }
    return EndVo;
}());
var FirstvictoryVo = /** @class */ (function () {
    function FirstvictoryVo() {
    }
    return FirstvictoryVo;
}());
//# sourceMappingURL=MapInfo.js.map