class GlobelValueData extends GuidObject {

    public onBaseCreated(): void {
        //console.log("globevalue")
        this.AddListen(SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.WBOSS_STATE_CHG));
        });
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }
    public getWorldBossId(): any {

        //  GLOBALVALUE_INT_FIELD_WORLD_BOSS_ID
        // 0:世界BOSS类型1, 1:世界BOSS类型2, 2:当前选定的类型
        var idx: number = SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_ID;
        var a: number = this.GetByte(idx, 0);
        var b: number = this.GetByte(idx, 1);
        var c: number = this.GetByte(idx, 2);
        var d: number = this.GetByte(idx, 3);


        //return { id0: a, id1: b };
        return [a, b];
    }
    //    -- GLOBALVALUE_STRING_FIELD_XIANFU_RECORD_START
    //--MAX_XIANFU_RECORD_COUNT
    //--GLOBALVALUE_INT_FIELD_XIANFU_RECORD_CURSOR

    private dataUpdate($intMask: Object, $strMask: Object): void {

        var $massBossChange: boolean = false;
        var choujinangFlag:boolean = false;
        for (var k in $intMask) {
            var $kNum: number = Number(k);
            if ($kNum >= SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START && $kNum < SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START + SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT * SharedDef.MAX_MASS_BOSS_COUNT) {
                $massBossChange = true;
            }else if($kNum >= SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_START && $kNum < SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_END){
                choujinangFlag = true;
            }
        }

        if(choujinangFlag){
            ModuleEventManager.dispatchEvent(new ActiveEvent(ActiveEvent.ACTIVE_GLOBEL_CHOUJIANG_EVENT));
        }

        if ($massBossChange) {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.REFRISH_LIST_DATA))
        }
    }
    public getXianfuRecords(): Array<string> {


        var ret: Array<string> = new Array;

        var cursor: number = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_XIANFU_RECORD_CURSOR)

        var last: number = (cursor - 1) % SharedDef.MAX_XIANFU_RECORD_COUNT;
        var start: number = cursor % SharedDef.MAX_XIANFU_RECORD_COUNT;

        if (last < start) {
            last += SharedDef.MAX_XIANFU_RECORD_COUNT;
        }

        console.log(start, last);

        for (var i: number = start; i <= last; ++i) {
            var indx: number = i % SharedDef.MAX_XIANFU_RECORD_COUNT;
            var str: string = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_XIANFU_RECORD_START + indx);
            if (str && str.length) {
                ret.push(str)
            }
        }

        return ret;
    }

    public getCurrentBossInfo(): any {


        var idx: number = this.getBossIndex(GuidData.map.getMapID(), GuidData.map.getLineID());
        return this.getBaseBossInfo(idx);
    }

    public getBossInfo($mapID: number, $lineId: number): any {
        var idx: number = this.getBossIndex($mapID, $lineId);
        return this.getBaseBossInfo(idx);
    }

    public getFieldMassBoss(value: number): any {
        var idx: number = SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START + SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT * value;
        var $state: number = this.GetUInt32(idx + SharedDef.MASS_BOSS_STATE);
        var $time: number = this.GetUInt32(idx + SharedDef.MASS_BOSS_TIME);
        return { state: $state, time: $time }
        /*
          for (var i: number = 0; i < SharedDef.MAX_MASS_BOSS_COUNT; i++) {
            var idx: number = SharedDef.GLOBALVALUE_INT_FIELD_MASS_BOSS_START + SharedDef.MAX_MASS_BOSS_INT_FIELD_COUNT * i;
            var $state: number = this.GetUInt32(idx + SharedDef.MASS_BOSS_STATE);
            var $time: number = this.GetUInt32(idx + SharedDef.MASS_BOSS_TIME);
        
          }
        */

    }
    public getMoneyChangeMassBossBuyTimes(): number {

        return this.GetUInt32(SharedDef.MONEY_CHANGE_MASS_BOSS_BUY_TIMES)
    }


    // GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE

    public getWorldBossState(): number {
        var $id: number = SharedDef.GLOBALVALUE_INT_FIELD_WORLD_BOSS_STATE;
        return this.GetUInt32($id)
    }

    private getBossIndex($mapID: number, $lineId: number): number {
        var config: any = TableData.getInstance().getData(TableData.tb_map_field_boss, $mapID);
        var idx: number = config.indx;
        return idx * SharedDef.MAX_DEFAULT_LINE_COUNT + $lineId - 1;
    }

    private getBaseBossInfo(idx: number): any {
        var time: number = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START
            + idx * SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_PRIORITY_TIME);
        var refreshTime: number = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START
            + idx * SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_NEXT_BORN_TIME);
        var type: number = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_FIELD_BOSS_START
            + idx * SharedDef.MAX_FIELD_BOSS_INT_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_PROCESS_TYPE);
        var ownerGuid: string = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FIELD_BOSS_START + idx * SharedDef.MAX_FIELD_BOSS_STR_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_MAX_DAMAGE_GUID);
        var ownerName: string = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_FIELD_BOSS_START + idx * SharedDef.MAX_FIELD_BOSS_STR_DATA_COUNT + SharedDef.FIELD_BOSS_DATA_NAME);
        console.log("----111---", { "time": time, "refreshTime": refreshTime, "type": type, "owner": ownerGuid, "name": ownerName });
        return { "time": time, "refreshTime": refreshTime, "type": type, "owner": ownerGuid, "name": ownerName };
    }

    public getQueenChampion(): any {
        var flag: number = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_WINER_FACTION_FLAG);
        var name1: string = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_QUEEN_NAME);
        var name2: string = this.GetStr(SharedDef.GLOBALVALUE_STRING_FIELD_GIFT_RANK_WINER_GUARD_NAME);
        return { img: flag, queen: name1, qs: name2 };
    }

    public getQueenRankRound(): number {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_CUR_ROUND);
    }

    public getQueenRankTime(): number {
        return this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_GIFT_RANK_NEXT_UPDATE_TIME);
    }
    // /**正在开启的活动列表 */
    public getActiveList(): Array<number> {
        var ary: Array<number> = new Array;

        for (var i: number = SharedDef.GLOBALVALUE_INT_FIELD_ACTIVITIES_RUNNING_START; i < SharedDef.GLOBALVALUE_INT_FIELD_ACTIVITIES_RUNNING_END; i++) {
            var id: number = this.GetUInt32(i);
            if (id > 0) {
                ary.push(id);
            }
        }
        return ary;
    }
    /**开服活动列表*/
    public getKaiFuActiveList(): Array<number> {
        var ary: Array<number> = new Array;
        var allList:Array<number> = this.getActiveList();
        for(var i:number=0;i<allList.length;i++){
            var tabObj:any = TableData.getInstance().getData(TableData.tb_activity_time,allList[i]);
            if(tabObj.type == 1){
                ary.push(allList[i])
            }
        }
        return ary;
    }

    public getLotteryRecord($id: number): Array<string> {
        var ret: Array<string> = new Array;
        $id--;

        var cursor: number = this.GetUInt32(SharedDef.GLOBALVALUE_INT_FIELD_LOTTERY_RECORD_CURSOR_START + $id);
        
        var start: number = SharedDef.GLOBALVALUE_STRING_FIELD_LOTTERY_RECORD_START + $id * SharedDef.MAX_LOTTERY_RECORD_COUNT;
        var center:number = start + cursor;
        var end:number = start + SharedDef.MAX_LOTTERY_RECORD_COUNT;



        for (var i: number = center; i < end; ++i) {
            var str: string = this.GetStr(i);
            if (str) {
                ret.push(str)
            }
        }

        for (var i: number = start; i < center; ++i) {
            var str: string = this.GetStr(i);
            if (str) {
                ret.push(str)
            }
        }
        return ret.reverse();
    }
}