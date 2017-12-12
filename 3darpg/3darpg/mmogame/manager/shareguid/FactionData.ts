class FactionData extends GuidObject {

    public onBaseCreated(): void {
        //var level: number = this.GetUInt32(0);
        //console.log("帮派名字：" + this.getName() + " 等级：" + this.getLev() + " 资金：" + this.getMoney());

        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_NUM, ($binlog: any) => { this.bossTokenNum() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS, ($binlog: any) => { this.bossTokenPoints() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS_COUNT, ($binlog: any) => { this.bossTokenPointscount() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOKEN_TODAY_BUY_COUNT, ($binlog: any) => { this.bossTokentodaybuycount() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID_MAX, ($binlog: any) => { this.bosschallengeidMax() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID, ($binlog: any) => { this.bosschallengeidCur() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID, ($binlog: any) => { this.buildCur() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_FINISH_TIME, ($binlog: any) => { this.buildEnd() });
        this.AddListen(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FLOOR, ($binlog: any) => { this.tripFloorChg() });

        var list: Array<FactionItemData> = this.getFactionList();
        var appList: Array<FactionItemData> = this.getApplyList();
        var evtList: Array<FactionEventData> = this.getEventList();
        var shopList: Array<FactionShopData> = this.getShopList();
        /**
        console.log("--家族列表-----------")
        this.traceList(list);
        console.log("--家族申请列表-----------")
        this.traceList(appList);
        console.log("--家族事件列表-----------")
        this.traceEvtList(evtList);
        console.log("--家族商店列表-----------")
        this.traceShopList(shopList);
        */
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.JOINFACTIONITEM_EVENT));

    }

    public getFactionStorehouse(): Array<BagItemData> {
        var $arr: Array<BagItemData> = new Array<BagItemData>();
        for (var i: number = SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START; i < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_END; i++) {
            var itemStr: string = this.GetStr(i);
            if (itemStr.length) {
                var bgItem: BagItemData = BagData.paserItemData(itemStr);
                bgItem.pos = i - SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START;
                $arr.push(bgItem)
            } else {
                $arr.push(null)
            }

        }
        return $arr
    }
    public getFactionStorehouseLog1111(): Array<string> {
        var $arr: Array<string> = new Array<string>();
        for (var i: number = SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START; i < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_END; i++) {
            var itemStr: string = this.GetStr(i);
            if (itemStr.length) {
                console.log(itemStr)
                $arr.push(itemStr)
            }
        }
        return $arr
    }

    public getFactionStorehouseLog(): Array<string> {
        var ret: Array<string> = new Array;
        var cursor: number = this.GetUInt32(SharedDef.FACTION_INT_FIELD_STOREHOUSE_RECORD_CURSOR)
        var last: number = (cursor - 1) % SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
        var start: number = cursor % SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
        if (last < start) {
            last += SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
        }
        for (var i: number = start; i <= last; ++i) {
            var indx: number = i % SharedDef.MAX_FACTION_STOREHOUSE_RECORD_COUNT;
            var str: string = this.GetStr(SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START + indx);
            if (str && str.length) {
                ret.push(str)
            }
        }
        return ret;
    }

    public dispose(): void {
        GuidData.faction = null;
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.FACTION_QUIT_EVENT));
        super.dispose();
    }

    public traceList(list: Array<FactionItemData>): void {

        var zhiwei: Array<string> = ["族长", "副族长", "长老", "精英", "群众"]
        for (var i: number = 0; i < list.length; i++) {
            var item: FactionItemData = list[i];
            console.log("成员：" + item.name + " idx:" + item.index + " 职位：" + zhiwei[item.identity - 1]
                + " 历史贡献：" + item.contribution + " 最后登录时间：" + item.logoutTime + (item.isOnline ? "在线" : "离线"))
        }
        console.log("-------------------------")
    }

    public traceEvtList(list: Array<FactionEventData>): void {

        var zhiwei: Array<string> = ["族长", "副族长", "长老", "精英", "群众"]
        for (var i: number = 0; i < list.length; i++) {
            var item: FactionEventData = list[i];
            console.log(item.name + " 捐献方式:" + item.type + " 捐献数量：" + item.value)
        }
        console.log("-------------------------")
    }

    public traceShopList(list: Array<FactionShopData>): void {


        for (var i: number = 0; i < list.length; i++) {
            var item: FactionShopData = list[i];
            console.log("商品id：" + item.id + " 数量:" + item.num)
        }
        console.log("-------------------------")
    }

    private dataUpdate($intMask: Object, $strMask: Object): void {
        //console.log("家族数据更新");
        var baseChg: Array<number> = new Array;
        var applyChg: Array<number> = new Array;
        var evtChg: Array<number> = new Array;
        var shopChg: Array<number> = new Array;
        var bagChg: Array<number> = new Array;
        var logChg: Array<number> = new Array;
        for (var k in $intMask) {
            var kNum: number = Number(k);
            if (kNum >= SharedDef.FACTION_INT_FIELD_PLAYER && kNum < SharedDef.FACTION_INT_FIELD_PLAYER_END) {
                var idx: number = kNum - ((kNum - SharedDef.FACTION_INT_FIELD_PLAYER) % SharedDef.MAX_FACTION_INT_MEMBER);
                //成员列表变化
                this.pushList(baseChg, idx);
            } else if (kNum >= SharedDef.FACTION_INT_FIELD_APPLY_PLAYER && kNum < SharedDef.FACTION_INT_FIELD_APPLY_PLAYER_END) {
                var idx: number = kNum - ((kNum - SharedDef.FACTION_INT_FIELD_APPLY_PLAYER) % SharedDef.MAX_FACTION_INT_MEMBER);
                //申请列表变化
                this.pushList(applyChg, idx);
            } else if (kNum >= SharedDef.FACTION_INT_FIELD_EVENT && kNum < SharedDef.FACTION_INT_FIELD_EVENT_END) {
                var idx: number = float2int((kNum - SharedDef.FACTION_INT_FIELD_EVENT) / SharedDef.MAX_FACTION_INT_EVENT);
                this.pushList(evtChg, idx);
            } else if (kNum >= SharedDef.FACTION_INT_FIELD_SHOP && kNum < SharedDef.FACTION_INT_FIELD_SHOP_END) {
                shopChg.push(kNum);

            } else if (kNum == SharedDef.FACTION_INT_FIELD_MONEY) {
                //帮派资金变化
                // console.log("帮派资金：" + this.getMoney())
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONMONEY_EVENT));
            } else if (kNum == SharedDef.FACTION_INT_FIELD_LEVEL) {
                //帮派等级变化
                //console.log("帮派等级：" + this.getLev())
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONLEV_EVENT));

            } else if (kNum >= SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_START && kNum < SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_END) {
                // 礼物周榜魅力值计数监听
                // ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.WEEK_RANK_CHANGE_EVENT));
            } else if (kNum >= SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START && kNum < SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END) {
                this.leadChange();
            } else if (kNum >= SharedDef.FACTION_INT_FIELD_BUILDING_ID_START && kNum < SharedDef.FACTION_INT_FIELD_BUILDING_ID_END) {
                this.buildChange();
            }
        }

        for (var k in $strMask) {
            var kNum: number = Number(k);
            if (kNum == SharedDef.FACTION_STRING_FIELD_GONGGAO) {
                //帮派公告变化
                var str: string = this.getNotice();
                var ary: Array<string> = str.split("\1")
                //console.log("公告：" + ary[0] + " QQ:" + ary[1] + " 微信:" + ary[2]);
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONGG_EVENT));
            } else if (kNum >= SharedDef.FACTION_STRING_FIELD_PLAYER && kNum < SharedDef.FACTION_STRING_FIELD_PLAYER_END) {
                var idx: number = float2int((kNum - SharedDef.FACTION_STRING_FIELD_PLAYER) / SharedDef.MAX_FACTION_STRING_MEMBER)
                    * SharedDef.MAX_FACTION_INT_MEMBER + SharedDef.FACTION_INT_FIELD_PLAYER;
                //成员列表变化
                this.pushList(baseChg, idx);
            } else if (kNum >= SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER && kNum < SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER_END) {
                var idx: number = float2int((kNum - SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER) / SharedDef.MAX_FACTION_STRING_MEMBER)
                    * SharedDef.MAX_FACTION_INT_MEMBER + SharedDef.FACTION_INT_FIELD_APPLY_PLAYER;
                this.pushList(applyChg, idx);
            } else if (kNum >= SharedDef.FACTION_STRING_FIELD_STOREHOUSE_START && kNum < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_END) {
                bagChg.push(kNum);
            } else if (kNum >= SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_START && kNum < SharedDef.FACTION_STRING_FIELD_STOREHOUSE_RECORD_END) {
                logChg.push(kNum);
            }
        }

        if (bagChg.length) {

            console.log("仓库发生变化")
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.WAREHOUSE_BAG_REFRESH));
        }
        if (logChg.length) {

            console.log("记录发生变化")
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.WAREHOUSE_LOG_REFRESH));
        }
        if (baseChg.length) {
            this.factionListChg(baseChg);
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEM_EVENT));
        }

        if (applyChg.length) {
            this.applyListChg(applyChg);
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT));
        }

        if (evtChg.length) {
            this.evtListChg(evtChg);
            //   ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONITEMEVENT_EVENT));
            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_LOG_REFRESH));
        }

        if (shopChg.length) {
            this.shopChg(shopChg);
            ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.STORE_NUM_EVENT));
        }


        var list: Array<FactionItemData> = this.getFactionList();
        var appList: Array<FactionItemData> = this.getApplyList();
        var evtList: Array<FactionEventData> = this.getEventList();
        var shopList: Array<FactionShopData> = this.getShopList();
        /**
        console.log("--家族列表-----------")

        this.traceList(list);
        console.log("--家族申请列表-----------")
        this.traceList(appList);
        console.log("--家族事件列表-----------")
        this.traceEvtList(evtList);
        console.log("--家族商店列表-----------")
        this.traceShopList(shopList);
         */
    }

    public pushList(list: Array<number>, idx: number): void {
        if (list.indexOf(idx) == -1) {
            list.push(idx);
        }
    }

    public factionListChg(list: Array<number>): void {
        for (var i: number = 0; i < list.length; i++) {
            for (var j: number = this._factionList.length - 1; j >= 0; j--) {
                if (this._factionList[j].index == list[i]) {
                    var data: FactionItemData = this.getData(list[i], this.baseIdxint2str(list[i]));
                    if (data) {
                        this._factionList[j] = data;
                    } else {
                        this._factionList.splice(j, 1);
                    }
                    break;
                }
            }
            if (j == -1) {
                var data: FactionItemData = this.getData(list[i], this.baseIdxint2str(list[i]));
                if (data) {
                    this._factionList.push(data);
                }
            }
        }
    }

    public applyListChg(list: Array<number>): void {
        for (var i: number = 0; i < list.length; i++) {
            for (var j: number = this._applyList.length - 1; j >= 0; j--) {
                if (this._applyList[j].index == list[i]) {
                    var data: FactionItemData = this.getData(list[i], this.applyIdxint2str(list[i]));
                    if (data) {
                        this._applyList[j] = data;
                    } else {
                        this._applyList.splice(j, 1);
                    }
                    break;
                }
            }
            if (j == -1) {
                var data: FactionItemData = this.getData(list[i], this.applyIdxint2str(list[i]));
                if (data) {
                    this._applyList.push(data);
                }

            }
        }
    }

    public evtListChg(list: Array<number>): void {
        for (var i: number = 0; i < list.length; i++) {
            var pos: number = list[i];
            var evtData: FactionEventData = this.getEventData(pos);
            if (evtData) {
                this._eventList[pos] = evtData;
            }
        }
    }

    public shopChg(list: Array<number>): void {
        for (var i: number = 0; i < list.length; i++) {
            var pos: number = list[i];
            var idx: number = list[i] - SharedDef.FACTION_INT_FIELD_SHOP;
            var dat: FactionShopData = this.getShopData(pos);
            if (dat) {
                this._shopList[idx] = dat;
            } else if (this._shopList[idx]) {
                this._shopList.splice(idx, 1);
            }
        }
    }

    /**帮派等级 */
    public getLev(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_LEVEL);
    }
    /**帮派资金 */
    public getMoney(): number {
        return this.GetDouble(SharedDef.FACTION_INT_FIELD_MONEY);
    }
    public getNotice(): string {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_GONGGAO);
    }
    /**家族Icon */
    public getIcon(): number {
        return this.GetByte(SharedDef.FACTION_INT_FIELD_FLAGS_ID, 0)
    }

    /**同意自动加入帮派 */
    public getAutoJoin(): boolean {
        return this.GetBit(SharedDef.FACTION_INT_FIELD_FLAG, SharedDef.FACTION_FLAGS_AUTO);
    }
    /**加入帮派最小等级 */
    public getJoinLimtLev(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_MINLEV);
    }
    /**招募公告 */
    public getZhaomuGG(): string {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_ZHAOMU_GONGGAO);
    }
    /**帮主名字 */
    public getManagerName(): string {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_MANGER_NAME);
    }
    /**帮主Guid */
    public getManagerGuid(): string {
        return this.GetStr(SharedDef.FACTION_STRING_FIELD_MANGER_GUID);
    }
    /**帮派活跃度 */
    public getActive(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_ACTIVITY);
    }
    /**帮派总战力 */
    public getFactionForce(): number {
        return this.GetDouble(SharedDef.FACTION_INT_FIELD_TOTAL_FORCE);
    }

    private _factionList: Array<FactionItemData>;
    public getFactionList(): Array<FactionItemData> {
        if (this._factionList) {
            return this._factionList;
        } else {
            this._factionList = new Array;
        }

        for (var i: number = SharedDef.FACTION_INT_FIELD_PLAYER; i < SharedDef.FACTION_INT_FIELD_PLAYER_END; i += SharedDef.MAX_FACTION_INT_MEMBER) {
            var strIdx: number = this.baseIdxint2str(i);
            var data: FactionItemData = this.getData(i, strIdx);
            if (data) {
                this._factionList.push(data);
            }
        }
        return this._factionList;
    }

    /**
     * 职位排序
     * $flag:true 升序 
     * $flag:false 降序 
     */
    private getFactionListSortDuty($flag: boolean): Array<FactionItemData> {
        var $ary = this.getFactionList();
        $ary.sort(
            function (a: FactionItemData, b: FactionItemData): number {
                if ($flag) {
                    return b.identity - a.identity;
                }
                return a.identity - b.identity;
            }
        )
        return $ary;
    }

    /**
     * 活跃度排序
     * $flag:true 升序 
     * $flag:false 降序 
     */
    private getFactionListSortActive($flag: boolean): Array<FactionItemData> {
        var $ary = this.getFactionList();
        $ary.sort(
            function (a: FactionItemData, b: FactionItemData): number {
                if ($flag) {
                    return b.active - a.active;
                }
                return a.active - b.active;
            }
        )
        return $ary;
    }

    /**
     * 贡献度排序 
     * $flag:true 升序 
     * $flag:false 降序 
     */
    private getFactionListSortContribution($flag: boolean): Array<FactionItemData> {
        var $ary = this.getFactionList();
        $ary.sort(
            function (a: FactionItemData, b: FactionItemData): number {
                if ($flag) {
                    return a.contribution - b.contribution;
                }
                return b.contribution - a.contribution;
            }
        )
        return $ary;
    }

    /**
     * 战斗力排序 
     * $flag:true 升序 
     * $flag:false 降序 
     */
    private getFactionListSortForce($flag: boolean): Array<FactionItemData> {
        var $ary = this.getFactionList();
        $ary.sort(
            function (a: FactionItemData, b: FactionItemData): number {
                if ($flag) {
                    return a.force - b.force;
                }
                return b.force - a.force;
            }
        )
        return $ary;
    }

    /**
     * 等级排序 
     * $flag:true 升序 
     * $flag:false 降序 
     */
    private getFactionListSortLevel($flag: boolean): Array<FactionItemData> {
        var $ary = this.getFactionList();
        $ary.sort(
            function (a: FactionItemData, b: FactionItemData): number {
                if ($flag) {
                    return a.level - b.level;
                }
                return b.level - a.level;
            }
        )
        return $ary;
    }

    public getFactionListBySortType($type: number, $flag: boolean): Array<FactionItemData> {
        var $ary: Array<FactionItemData>;
        switch ($type) {
            case 0:
                $ary = this.getFactionListSortDuty($flag);
                break;
            case 1:
                $ary = this.getFactionListSortLevel($flag);
                break;
            case 2:
                $ary = this.getFactionListSortForce($flag);
                break;
            case 3:
                $ary = this.getFactionListSortContribution($flag);
                break;
            case 4:
                $ary = this.getFactionListSortActive($flag);
                break;

            default:
                break;
        }
        return $ary;
    }

    public baseIdxint2str(i: number): number {
        return ((i - SharedDef.FACTION_INT_FIELD_PLAYER) / SharedDef.MAX_FACTION_INT_MEMBER) * SharedDef.MAX_FACTION_STRING_MEMBER + SharedDef.FACTION_STRING_FIELD_PLAYER;
    }
    public applyIdxint2str(i: number): number {
        return ((i - SharedDef.FACTION_INT_FIELD_APPLY_PLAYER) / SharedDef.MAX_FACTION_INT_MEMBER) * SharedDef.MAX_FACTION_STRING_MEMBER + SharedDef.FACTION_STRING_FIELD_APPLY_PLAYER
    }

    private _applyList: Array<FactionItemData>;
    public getApplyList(): Array<FactionItemData> {
        if (this._applyList) {
            return this._applyList;
        } else {
            this._applyList = new Array;
        }

        for (var i: number = SharedDef.FACTION_INT_FIELD_APPLY_PLAYER; i < SharedDef.FACTION_INT_FIELD_APPLY_PLAYER_END; i += SharedDef.MAX_FACTION_INT_MEMBER) {
            var strIdx: number = this.applyIdxint2str(i);
            var data: FactionItemData = this.getData(i, strIdx);
            if (data) {
                this._applyList.push(data);
            }
        }
        return this._applyList;

    }

    private _eventList: Array<FactionEventData>;
    public getEventList(): Array<FactionEventData> {
        if (this._eventList) {
            return this._eventList;
        } else {
            this._eventList = new Array;
        }
        for (var i: number = SharedDef.FACTION_INT_FIELD_EVENT; i < SharedDef.FACTION_INT_FIELD_EVENT_END; i += SharedDef.MAX_FACTION_INT_EVENT) {
            var pos: number = float2int((i - SharedDef.FACTION_INT_FIELD_EVENT) / SharedDef.MAX_FACTION_INT_EVENT);
            var evtdata: FactionEventData = this.getEventData(pos);
            if (evtdata) {
                this._eventList.push(evtdata);
            }
        }
        return this._eventList;
    }

    public getEventFlag(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_EVENT_FALG);
    }

    private _shopList: Array<FactionShopData>
    public getShopList(): Array<FactionShopData> {
        if (this._shopList) {
            return this._shopList;
        } else {
            this._shopList = new Array;
        }

        for (var i: number = SharedDef.FACTION_INT_FIELD_SHOP; i < SharedDef.FACTION_INT_FIELD_SHOP_END; i++) {
            var dat: FactionShopData = this.getShopData(i);
            if (dat) {
                this._shopList.push(dat);
            }
        }
        return this._shopList;
    }

    public getShopData(idx: number): FactionShopData {
        var id: number = this.GetUInt16(idx, 0);
        if (id == 0) {
            return null;
        }
        var data: FactionShopData = new FactionShopData;
        data.id = id;
        data.num = this.GetUInt16(idx, 1);
        return data;
    }

    public getEventData(pos: number): FactionEventData {
        var strIdx: number = SharedDef.FACTION_STRING_FIELD_EVENT + pos;
        var name: string = this.GetStr(strIdx);
        if (!name || name == "") {
            return null;
        }
        var evtData: FactionEventData = new FactionEventData;
        evtData.name = name;
        var intIdx: number = SharedDef.FACTION_INT_FIELD_EVENT + pos * SharedDef.MAX_FACTION_INT_EVENT;

        evtData.type = this.GetUInt16(intIdx, 0);
        evtData.value = this.GetUInt16(intIdx, 1);

        return evtData;
    }
    //获得自己的职务
    private _playerIdentity: number = -1;
    public get playerIdentity(): number {
        return this._playerIdentity;
    }
    public set playerIdentity(val: number) {
        this._playerIdentity = val;
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONIDENTITY_EVENT));
    }

    private _goldDonation: number = 0;
    public get goldDonation(): number {
        return this._goldDonation;
    }
    public set goldDonation(val: number) {
        this._goldDonation = val;
        ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_NUM_REFRESH));
    }

    private _ybDonation: number = 0;
    public get ybDonation(): number {
        return this._ybDonation;
    }
    public set ybDonation(val: number) {
        this._ybDonation = val;
        ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_NUM_REFRESH));
    }

    public getData(intIdx: number, strIdx: number): FactionItemData {
        var guid: string = this.GetStr(strIdx + SharedDef.FACTION_STRING_MEMBER_GUID);
        if (!guid || guid == "") {
            return null;
        }
        var data: FactionItemData = new FactionItemData();
        data.force = this.GetDouble(intIdx + SharedDef.FACTION_INT_MEMBER_FORCE);
        data.level = this.GetUInt16(intIdx + SharedDef.FACTION_INT_MEMBER_UINT16, 0);
        data.isOnline = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_BYTE, 0) == 1 ? true : false;
        data.identity = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_BYTE, 1);
        data.vipLev = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_BYTE, 2);
        data.logoutTime = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_LOGOUT_TIME);
        data.active = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_FLAGS);
        data.contribution = this.GetUInt32(intIdx + SharedDef.FACTION_INT_MEMBER_TOTAL_CONTRIBUTION);
        data.guid = guid;
        if (guid == GuidData.player.guid) {
            this.playerIdentity = data.identity;
            this.goldDonation = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_UINT16, 2);
            this.ybDonation = this.GetByte(intIdx + SharedDef.FACTION_INT_MEMBER_UINT16, 3);
        }
        data.name = this.GetStr(strIdx + SharedDef.FACTION_STRING_MEMBER_NAME);
        data.index = intIdx;
        return data;
    }

    /**
     * 令牌数量变化
     */
    private bossTokenNum(): void {
        console.log("--令牌数目变化--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTNUM));
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.BOSS_NEED_REDPOINT));
    }

    public getBossTokenNum(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_NUM);
    }

    /**
     * 令牌今日积分进度
     */
    private bossTokenPoints(): void {
        console.log("--令牌今日积分进度--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_INTEGRAL));
    }

    public getBossTokenPoints(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS);
    }

    /**
     * 令牌今日积分完成次数
     */
    private bossTokenPointscount(): void {
        console.log("--令牌今日积分完成次数--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_RESIDUE));
    }

    public getBossTokenPointscount(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_POINTS_COUNT);
    }

    /**
     * 今日令牌购买次数
     */
    private bossTokentodaybuycount(): void {
        console.log("--今日令牌购买次数--");
        // ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTNUM));
    }

    public getBossTokentodaybuycount(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOKEN_TODAY_BUY_COUNT);
    }

    /**
     * 已挑战最大boss id
     */
    private bosschallengeidMax(): void {
        console.log("--已挑战最大boss id--");
        // ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTNUM));
    }

    public getBosschallengeidMax(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID_MAX);
    }

    /**
     * 当前挑战boss id
     */
    private bosschallengeidCur(): void {
        console.log("--当前挑战boss id--");
        ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.CHANGE_BOSS_CURRENTID));
    }

    public getBosschallengeidCur(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_ID);
    }

    /**
     * boss开始时间（包括等待时间）
     */
    public getBosschallengeStartTime(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_START_TIME);
    }

    /**
     * 排行榜
     */
    public getRankList(): Array<FactionBossRankData> {
        var ary: Array<FactionBossRankData> = new Array
        for (var i = 0; i < SharedDef.MAX_FACTION_MAMBER_COUNT; i++) {
            var str: string = this.GetStr(SharedDef.FACTION_STRING_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_START + i);
            if (str.length > 0) {
                var vo: FactionBossRankData = new FactionBossRankData();
                vo.guid = str;
                vo.output = this.GetUInt32(SharedDef.FACTION_INT_FIELD_CHALLENGE_BOSS_DAMAGE_RANK_START + i);
                ary.push(vo);
            }
        }

        ary.sort(
            function (a: FactionBossRankData, b: FactionBossRankData): number {
                return b.output - a.output;
            }
        )
        return ary;
    }


    /**
     * 当前正在升级的建筑id
     */
    private buildCur(): void {
        console.log("--当前正在升级的建筑id--");
        ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.BUILD_STATE));
    }

    public getBuildCur(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID);
    }

    private buildEnd(): void {
        console.log("--完成时间--");
        ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.BUILD_ENDTIME));
    }
    /**
     * 当前升级建筑完成时间戳
     */
    public getBuildEndTime(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_FINISH_TIME);
    }

    /**
      * 已有建筑id开始
      */
    public getHaveBuild(): Array<number> {
        var ary: Array<number> = new Array;
        for (var i = SharedDef.FACTION_INT_FIELD_BUILDING_ID_START; i < SharedDef.FACTION_INT_FIELD_BUILDING_ID_END; i++) {
            ary.push(this.GetUInt32(i));
        }
        return ary;
    }

    private buildChange(){
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.FUNBUILD_CHG_EVENT));
    }

    /**
     * getWeekRankGiftList
     */
    public getWeekRankGiftList(): Array<FactionItemData> {
        var $data: Array<FactionItemData> = new Array;
        for (var i: number = SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_START; i < SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_END; i++) {
            var pointid: number = SharedDef.FACTION_INT_FIELD_GIFT_WEEK_POINT_START + (i - SharedDef.FACTION_STRING_FIELD_GIFT_PLAYER_GUID_START);
            var point = this.GetUInt32(pointid);
            var guid = this.GetStr(i);
            if (point != 0 && guid && guid.length > 0) {
                var vo: FactionItemData = this.getInfomation(guid);
                vo.point = point;
                $data.push(vo);
            }
        }

        $data.sort(
            function (a: FactionItemData, b: FactionItemData): number {
                return b.point - a.point;
            }
        )
        return $data;
    }

    //通过guid找到对应的用户数据
    private getInfomation($guid: string): FactionItemData {
        var ary: Array<FactionItemData> = this.getFactionList();
        for (var i = 0; i < ary.length; i++) {
            if (ary[i].guid == $guid) {
                return ary[i];
            }
        }
        return null;
    }


    /**
     * 礼物未处理信息
     */
    private Giftflag(): void {
        console.log("--当前正在升级的建筑id--");
        ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.BUILD_STATE));
    }

    public getGiftflag(): number {
        return this.GetUInt32(SharedDef.FACTION_INT_FIELD_BUILDING_LVUP_ID);
    }

    private _listAry: Array<FactionLeadData>;
    public getLeaderData(): Array<FactionLeadData> {
        if (this._listAry) {
            return this._listAry;
        }
        this._listAry = new Array();
        var flag: number = 0;
        for (var i: number = SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START; i < SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END; i += SharedDef.MAX_FACTION_BOSSDEFENSE) {
            var leadData: FactionLeadData = new FactionLeadData();
            leadData.idx = flag;
            leadData.id = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID);
            leadData.hp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_HP);
            leadData.maxHp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_MAX_HP);
            leadData.state = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_STATUS);
            leadData.pool = TableData.getInstance().getData(TableData.tb_faction_bossdefense_pool, leadData.id);
            leadData.boos = tb.TB_creature_template.get_TB_creature_template(leadData.pool.entry);
            this._listAry.push(leadData);
            flag++;
        }
        return this._listAry;
    }

    public leadChange(): void {
        if (!this._listAry) {
            return;
        }
        var flag: number = 0;
        for (var i: number = SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_START; i < SharedDef.FACTION_INT_FIELD_BOSSDENFENSE_END; i += SharedDef.MAX_FACTION_BOSSDEFENSE) {
            var leadData: FactionLeadData = this._listAry[flag];

            var newID: number = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID);
            if (newID != leadData.id) {
                leadData.id = newID;
                leadData.pool = TableData.getInstance().getData(TableData.tb_faction_bossdefense_pool, leadData.id);
                leadData.boos = tb.TB_creature_template.get_TB_creature_template(leadData.pool.entry);
            }
            leadData.id = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_POOL_ID);
            leadData.hp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_HP);
            leadData.maxHp = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_MAX_HP);
            leadData.state = this.GetUInt32(i + SharedDef.FACTION_INT_BOSSDEFENSE_STATUS);
            flag++;
        }

        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT));

    }
    /**无尽的远程关卡通关人数 */
    public getTripNum(tripLev: number): number {
        var num: number = 0;
        for (var i: number = SharedDef.FACTION_INT_FIELD_PLAYER; i < SharedDef.FACTION_INT_FIELD_PLAYER_END; i += SharedDef.MAX_FACTION_INT_MEMBER) {
            var lev: number = this.GetUInt32(i + SharedDef.FACTION_INT_MEMBER_TOWER_TODAY_FLOOR);
            if (lev >= tripLev) {
                num++;
            }
        }
        return num;

    }
    /**
     * 最高通关信息
     */
    public getMaxTripRole(): any {
        var obj: any = new Object();
        obj.name = this.GetStr(SharedDef.FACTION_STRING_FIELD_TOWER_TODAY_TOP_NAME);
        obj.icon = this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_ICON);
        obj.floor = this.GetUInt32(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FLOOR);
        obj.force = this.GetDouble(SharedDef.FACTION_INT_FIELD_TOWER_TODAY_TOP_FORCE);
        return obj;
    }

    public tripFloorChg(): void {
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT));
    }




}

class FactionItemData {
    public force: number = 0//成员战斗力
    public level: number = 0//0.成员等级
    public isOnline: boolean = false;//是否在线
    public identity: number = 0;//身份
    public logoutTime: number = 0;//最后离线时间
    public vipLev: number = 0;//VIP
    public active: number = 0;//活跃度
    public contribution: number = 0;//历史贡献

    public point: number;//女王魅力数
    public guid: string;
    public name: string;
    public index: number;
}

class FactionEventData {
    public type: number;
    public value: number;
    public name: string
}

class FactionShopData {
    public id: number;
    public num: number;
}

class FactionBossRankData {
    public guid: string;
    public output: number;
}

class FactionLeadData {
    public indexlocal: number;//怪物点
    public idx: number;
    public id: number;
    public hp: number;
    public maxHp: number;
    public state: number;
    public pool: any;
    public boos: any;
}