class BagData extends GuidObject {

    public static TYPE_EQU: number = 0;//装备
    public static TYPE_BAG: number = 1;//背包
    public static TYPE_EQU_BG: number = 2;//装备背包
    public static TYPE_GEM: number = 3;//其他

    public onBaseCreated(): void {
        this.readData();
        //this._after_update = ($this: any, $flag: number, $intMask: UpdateMask, $strMask: UpdateMask) => { this.updateData($flag, $intMask, $strMask) }
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.updateData($intMask, $strMask) }
        this.initData();
    }

    public readData(): void {

        var str: string = "";
        for (var i: number = 9; i <= 23; i++) {
            str += i + ":" + this.GetUInt16(i, 0) + ",";
            str += this.GetUInt16(i, 1) + "\n";
        }


        for (i = 128; i < 180; i++) {
            str += (i + ":" + this.GetUInt32(i)) + "\n";
        }

        //console.log(str);

        //this.setGmBg();

    }



    public getBagSize($type: number = 0): number {
        if ($type == BagData.TYPE_BAG) {
            $type = 0;
        } else if ($type == BagData.TYPE_EQU_BG) {
            $type = 2;
        } else if ($type == BagData.TYPE_GEM) {
            $type = 3;
        }
        var idx: number = 9 + float2int($type / 2);
        var offs: number = $type % 2;
        return this.GetUInt16(idx, offs);
    }

    public getBagNum($type: number = 0): number {
        if ($type == BagData.TYPE_BAG) {
            return this.getListSize(this._bgList);
        } else if ($type == BagData.TYPE_EQU_BG) {
            return this.getListSize(this._equBgList);
        } else if ($type == BagData.TYPE_GEM) {
            return this.getListSize(this._gemBgList);
        } else {
            return 0;
        }
    }

    private getListSize($ary: Array<BagItemData>): number {
        var num: number = 0;
        for (var i: number = 0; i < $ary.length; i++) {
            if ($ary[i]) {
                num++;
            }
        }
        return num;
    }

    private initData(): void {
        this.getAllBgData();
        this.getEquData();
        this.getEquBgData();
        this.getGemBgData();

        this.processRedPoint();

        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }
    private _bgList: Array<BagItemData>;
    public getAllBgData(): Array<BagItemData> {
        if (this._bgList) {
            return this._bgList;
        }
        var ary: Array<BagItemData> = new Array;
        for (var key in this._str_values) {
            var keyNum: number = Number(key);
            if (keyNum >= 128) {
                var itemData: BagItemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos < 1000) {
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._bgList = ary;
        return ary;
    }

    private _equBgList: Array<BagItemData>;
    public getEquBgData(): Array<BagItemData> {
        if (this._equBgList) {
            return this._equBgList;
        }
        var ary: Array<BagItemData> = new Array;
        for (var key in this._str_values) {
            var keyNum: number = Number(key);
            if (keyNum >= 128) {
                var itemData: BagItemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos >= 2000 && itemData.pos < 3000) {
                    itemData.pos -= 2000;
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._equBgList = ary;
        return ary;
    }

    private _gemBgList: Array<BagItemData>;
    public getGemBgData(): Array<BagItemData> {
        if (this._gemBgList) {
            return this._gemBgList;
        }
        var ary: Array<BagItemData> = new Array;
        for (var key in this._str_values) {
            var keyNum: number = Number(key);
            if (keyNum >= 128) {
                var itemData: BagItemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos >= 3000 && itemData.pos < 4000) {
                    itemData.pos -= 2000;
                    ary[itemData.pos] = itemData;
                }
            }
        }
        this._gemBgList = ary;
        return ary;
    }

    public getBgItemData($pos: number, $bagType: number): BagItemData {
        var ary: Array<BagItemData>;
        if ($bagType == BagData.TYPE_BAG) {
            ary = this.getAllBgData();
        } else if ($bagType == BagData.TYPE_EQU_BG) {
            ary = this.getEquBgData();
        } else if ($bagType == BagData.TYPE_GEM) {
            ary = this.getGemBgData();
        }

        return ary[$pos];
    }

    public getBagAllItemCount(): number {
        var num: number = 0;
        for (var key in this._str_values) {
            var keyNum: number = Number(key);
            if (keyNum >= 128) {
                var itemData: BagItemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos < 1000) {
                    num++;
                }
            }
        }
        return num;
    }

    /**背包中是否有指定的数量的道具  */
    public hasItem($entry: number, $count: number = 1): boolean {
        var ary: Array<BagItemData> = this.getAllBgData();
        var all: number = 0;
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                all += ary[i].count;
                if (all >= $count) {
                    return true;
                }
            }

        }
        return false;
    }
    /**获取指定道具的数量 */
    public getItemCount($entry: number): number {
        var ary: Array<BagItemData> = this.getAllBgData();
        var all: number = 0;
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                all += ary[i].count;
            }

        }
        return all;
    }

    public getItemByEntry($entry: number): BagItemData {
        var ary: Array<BagItemData> = this.getAllBgData();
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                return ary[i]
            }

        }
        return null;
    }


    public getItemByEntryCopy($entry: number): BagItemData {
        var ary: Array<BagItemData> = this.getGemBgData();
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i] && ary[i].entry == $entry) {
                return ary[i]
            }

        }
        return null;
    }

    public getEmptyPos(): number {
        var ary: Array<BagItemData> = this.getAllBgData();
        var posAry: Array<number> = new Array;
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i]) {
                posAry.push(ary[i].pos);
            }

        }
        var maxBg: number = this.getBagSize();
        for (var i: number = 0; i < maxBg; i++) {
            if (posAry.indexOf(i) == -1) {
                return i;
            }
        }
        return -1;
    }

    public getEmptyEquBagPos(): number {
        var ary: Array<BagItemData> = this.getEquBgData();
        var posAry: Array<number> = new Array;
        for (var i: number = 0; i < ary.length; i++) {
            if (ary[i]) {
                posAry.push(ary[i].pos);
            }

        }
        var maxBg: number = this.getBagSize(2);
        for (var i: number = 0; i < maxBg; i++) {
            if (posAry.indexOf(i) == -1) {
                return i;
            }
        }
        return -1;
    }

    private _equList: Array<BagItemData>;
    public getEquData(): Array<BagItemData> {

        if (this._equList) {
            return this._equList;
        }

        this.refreshEquData();

        return this._equList;
    }

    public getEquPart($pos:number):BagItemData{
       return this.getEquData()[$pos];
    }


    public refreshEquData(): void {
        var ary: Array<BagItemData> = new Array;

        for (var key in this._str_values) {
            var keyNum: number = Number(key);
            if (keyNum >= 128) {
                var itemData: BagItemData = this.getItmeData(keyNum);
                if (itemData && itemData.pos >= 1000 && itemData.pos < 2000) {
                    itemData.pos -= 1000;
                    ary[itemData.pos] = itemData;
                }
            }
        }

        this._equList = ary;
    }

    public refreshBagDataChange(intMashObj: Object, maskObj: Object): void {
        if (!this._equList || !this._bgList) {
            return;
        }
        var equAry: Array<number> = new Array;
        var bgAry: Array<number> = new Array;
        var equBgAry: Array<number> = new Array;
        var gemBgAry: Array<number> = new Array;

        for (var key in this._str_values) {
            var keyNum: number = Number(key);
            if (keyNum >= 128) {
                var pos: number = this.getItemPos(keyNum);
                if (pos >= 0 && pos < 1000) {
                    bgAry[pos] = keyNum;
                } else if (pos < 2000) {
                    pos -= 1000;
                    equAry[pos] = keyNum;
                } else if (pos < 3000) {
                    pos -= 2000;
                    equBgAry[pos] = keyNum;
                } else if (pos < 4000) {
                    pos -= 3000;
                    gemBgAry[pos] = keyNum;
                }
            }
        }

        this.processEquChg(equAry, maskObj);
        this.processBagChg(bgAry, maskObj);
        this.processEquBagChg(equBgAry, maskObj);
        this.processGemBagChg(gemBgAry, maskObj);



    }

    //private clearList($ary: Array<BagItemData>): void {
    // for (var i: number = $ary.length - 1; i >= 0; i--) {
    //     if(!$ary[i]){
    //         $ary.splice(i,1);
    //     }
    // }
    //}

    private processEquChg(equAry: Array<number>, maskObj: Object): void {
        var minLeng: number = Math.max(this._equList.length, equAry.length);

        var equChangeAry: Array<number> = new Array;
        for (var i: number = 0; i < minLeng; i++) {
            var flag = false;

            if (equAry[i]) {//
                if (!this._equList[i]) {//添加
                    flag = true;
                } else if (maskObj[this._equList[i].dataIndex]) {//更新
                    flag = true;
                } else if (this._equList[i].dataIndex != equAry[i]) {
                    flag = true;
                }
            } else {
                if (this._equList[i]) {//移除
                    flag = true;
                }
            }

            if (flag) {
                this._equList[i] = this.getItmeData(equAry[i]);
                if (this._equList[i]) {
                    this._equList[i].pos -= 1000;
                }
                equChangeAry.push(i);
            }

        }

        if (equChangeAry.length) {
            //this.clearList(this._equList);
            var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_EQU;
            evt.data = equChangeAry;
            ModuleEventManager.dispatchEvent(evt);
        }
    }


    private processBagChg(bgAry: Array<number>, maskObj: Object): void {
        var minLeng: number = Math.max(this._bgList.length, bgAry.length);
        var bgChangeAry: Array<number> = new Array;
        var itemChageAry:Array<number> = new Array;
        for (var i: number = 0; i < minLeng; i++) {
            var flag = false;

            if (bgAry[i]) {//
                if (!this._bgList[i]) {//添加
                    flag = true;
                } else if (maskObj[this._bgList[i].dataIndex]) {//更新
                    flag = true;
                } else if (this._bgList[i].dataIndex != bgAry[i]) {
                    flag = true;
                }
            } else {
                if (this._bgList[i]) {//移除
                    flag = true;
                }
            }

            if (flag) {
                this._bgList[i] = this.getItmeData(bgAry[i]);
                bgChangeAry.push(i);
                if(this._bgList[i]){
                    itemChageAry.push(this._bgList[i].entry);
                }                
            }

        }


        if (bgChangeAry.length) {
            //this.clearList(this._bgList);
            var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_BAG;
            evt.data = bgChangeAry;
            evt.change = itemChageAry;
            ModuleEventManager.dispatchEvent(evt);
        }
    }

    public bindItemFun($id: number, $fun: Function): void {

    }

    public unBindItemFun($fun: Function): void {

    }

    private processEquBagChg(equBgAry: Array<number>, maskObj: Object): void {
        var minLeng: number = Math.max(this._equBgList.length, equBgAry.length);
        var equBgChangeAry: Array<number> = new Array;
        for (var i: number = 0; i < minLeng; i++) {
            var flag = false;

            if (equBgAry[i]) {//
                if (!this._equBgList[i]) {//添加
                    flag = true;
                } else if (maskObj[this._equBgList[i].dataIndex]) {//更新
                    flag = true;
                } else if (this._equBgList[i].dataIndex != equBgAry[i]) {
                    flag = true;
                }
            } else {
                if (this._equBgList[i]) {//移除
                    flag = true;
                }
            }

            if (flag) {
                this._equBgList[i] = this.getItmeData(equBgAry[i]);
                if (this._equBgList[i]) {
                    this._equBgList[i].pos -= 2000;
                }
                equBgChangeAry.push(i);
            }

        }



        if (equBgChangeAry.length) {
            //this.clearList(this._equBgList);
            var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_EQU_BG;
            evt.data = equBgChangeAry;
            ModuleEventManager.dispatchEvent(evt);
            this.processRedPoint();
        }
    }

    private processRedPoint(): void {
        var num: number = this.getBagNum(BagData.TYPE_EQU_BG);
        var allNum: number = this.getBagSize(BagData.TYPE_EQU_BG);
        num = allNum - num;
        if (num <= 5 && allNum > 0) {
            RedPointManager.getInstance().getNodeByID(2).show = true;
        } else {
            RedPointManager.getInstance().getNodeByID(2).show = false;
        }
        this.setBagAlert();
        
    }

    public setBagAlert():void{
        var num: number = this.getBagNum(BagData.TYPE_EQU_BG);
        var allNum: number = this.getBagSize(BagData.TYPE_EQU_BG);
        num = allNum - num;
        if(GameInstance.first){
            if (num < 1 && allNum > 0) {
                AlertUtil.show("背包已满，是否前往熔炼？","",($data)=>{
                    if($data == 1){
                        ModulePageManager.openPanel(SharedDef.MODULE_RONGLIAN);
                    }
                },2,["前往熔炼","取消"])
            }
        }
    }

    private processGemBagChg(gemBgAry: Array<number>, maskObj: Object): void {
        var minLeng: number = Math.max(this._gemBgList.length, gemBgAry.length);
        var gemBgChangeAry: Array<number> = new Array;
        for (var i: number = 0; i < minLeng; i++) {
            var flag = false;

            if (gemBgAry[i]) {//
                if (!this._gemBgList[i]) {//添加
                    flag = true;
                } else if (maskObj[this._gemBgList[i].dataIndex]) {//更新
                    flag = true;
                } else if (this._gemBgList[i].dataIndex != gemBgAry[i]) {
                    flag = true;
                }
            } else {
                if (this._gemBgList[i]) {//移除
                    flag = true;
                }
            }

            if (flag) {
                this._gemBgList[i] = this.getItmeData(gemBgAry[i]);
                if (this._gemBgList[i]) {
                    this._gemBgList[i].pos -= 3000;
                }
                gemBgChangeAry.push(i);
            }

        }



        if (gemBgChangeAry.length) {
            //this.clearList(this._gemBgList);
            var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.BGDATA_CHANGE_EVENT);
            evt.showType = BagData.TYPE_GEM;
            evt.data = gemBgChangeAry;
            ModuleEventManager.dispatchEvent(evt);
        }
    }

    public getEquByPart(part: number): BagItemData {
        var ary: Array<BagItemData> = this.getEquData();
        return ary[part];
    }
    public getItemPos($id: number): number {
        var itemStr: string = this._str_values[$id];
        if (!itemStr || itemStr == "") {
            return -1;
        }
        return this.GetUInt32($id);
    }
    public getItmeData($id: number): BagItemData {
        var itemStr: string = this._str_values[$id];
        if (!itemStr || itemStr == "") {
            return null;
        }

        var bgItem: BagItemData = BagData.paserItemData(itemStr);
        bgItem.pos = this.GetUInt32($id);
        bgItem.dataIndex = $id;
        return bgItem;
    }

    public static paserItemData(itemStr: string): BagItemData {
        var ary: Array<string> = itemStr.split(";");

        var bgItem: BagItemData = new BagItemData();

        bgItem.id = Number(ary[0]);
        bgItem.entry = Number(ary[1]);
        bgItem.count = Number(ary[2]);
        bgItem.flags = Number(ary[3]);
        var itemData: ItemData = new ItemData();
        itemData.propData = JSON.parse(ary[4]);
        itemData.AttrData = BagData.getNumFromStr(ary[5]);
        bgItem.data = itemData;

        bgItem.entryData = TableData.getInstance().getData(TableData.tb_item_template, bgItem.entry);

        return bgItem;
    }

    public static getNumFromStr(str: string): Array<number> {
        if (!str) {
            return new Array;
        }
        var ary: Array<string> = str.split(",");
        var r: Array<number> = new Array;
        for (var i: number = 0; i < ary.length; i++) {
            r.push(Number(ary[i]));
        }
        return r;
    }

    public getPos($id: number): number {
        return this.GetUInt32($id);
    }

    public updateData($intMask: Object, $strMask: Object): void {
        this.refreshBagDataChange($intMask, $strMask);

        //console.log("背包数据发生变化------");

        //ModuleEventManager.dispatchEvent(new sb.ShenBingEvent(sb.ShenBingEvent.CHANGE_BAG_DATA_EVENT));
    }

    public getPlayerGuid(): string {
        return this._str_values[0];
    }

    public useItem(): void {
        var uid: string = this.getPlayerGuid() + ";" + 1;
        NetManager.getInstance().protocolos.bag_item_user(uid, 1);
    }

}

class BagItemData {
    /**物品ID*/
    public id: number;
    /**模版ID*/
    public entry: number;
    /**数量*/
    public count: number;
    /**标记位*/
    public flags: number;

    /**位置*/
    public pos: number;

    public dataIndex: number;

    public data: ItemData;

    public entryData: any;

    public qhGemData:any;//附带强化宝石信息

    //public tempStr:string;

    public get guid(): string {
        return GuidData.bag.getPlayerGuid() + ";" + this.id;
    }
}

class ItemData {
    public propData: any;
    public AttrData: Array<number>;
}