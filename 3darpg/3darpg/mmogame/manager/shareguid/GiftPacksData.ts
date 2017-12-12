class GiftPacksData extends GuidObject {

    public onBaseCreated(): void {

        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }

    private dataUpdate($intMask: Object, $strMask: Object): void {

        var $dic: any = new Object();

        for (var k in $intMask) {
            var kNum: number = Number(k);
            if (kNum < SharedDef.GIFTPACKS_INT_FIELD_BEGIN) continue;
            // console.log("int", kNum)
            var giftIndx: number = Math.floor((kNum - SharedDef.GIFTPACKS_INT_FIELD_BEGIN) / SharedDef.MAX_GIFTPACKS_INFO_INT);
            if (!$dic[giftIndx]) {
                $dic[giftIndx] = 1;
            }
        }

        for (var k in $strMask) {
            var kNum: number = Number(k);
            if (kNum < SharedDef.GIFTPACKS_STRING_FIELD_BEGIN) continue;
            // console.log("str", kNum)
            var giftIndx: number = Math.floor((kNum - SharedDef.GIFTPACKS_STRING_FIELD_BEGIN) / SharedDef.MAX_GIFTPACKS_INFO_STRING);
            if (!$dic[giftIndx]) {
                $dic[giftIndx] = 1;
            }
        }

        this._dataState = 0;
        for (var $key in $dic) {
            this.changeGiftDataByKey(Number($key))
        }
        if(this._dataState > 0){
            var evt:email.MailEvent = new email.MailEvent(email.MailEvent.MAIL_CHG_EVENT);
            evt.data = this._dataState;
            ModuleEventManager.dispatchEvent(evt);
        }

    }
    private changeGiftDataByKey(indx: number): void {
        var intStart: number = SharedDef.GIFTPACKS_INT_FIELD_BEGIN + indx * SharedDef.MAX_GIFTPACKS_INFO_INT
        var strStart: number = SharedDef.GIFTPACKS_STRING_FIELD_BEGIN + indx * SharedDef.MAX_GIFTPACKS_INFO_STRING
        var $vo: GiftBaseVo = new GiftBaseVo();
        $vo.makeData(this, intStart, strStart, indx)

        this.refreshGiftList($vo);
        //ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.REFRESH_EMAIL_LIST));
        ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));

    }
    private _giftList: Array<GiftBaseVo>;
    public getGiftDataItem(): Array<GiftBaseVo> {
        // console.log("----------------")
        if (this._giftList) {
            return this._giftList;
        }
        var $arr: Array<GiftBaseVo> = new Array()
        for (var i: number = 0; i < SharedDef.MAX_GIFTPACKS_INFO_COUNT; i++) {
            var intStart: number = SharedDef.GIFTPACKS_INT_FIELD_BEGIN + i * SharedDef.MAX_GIFTPACKS_INFO_INT;
            var strStart: number = SharedDef.GIFTPACKS_STRING_FIELD_BEGIN + i * SharedDef.MAX_GIFTPACKS_INFO_STRING;
            var $vo: GiftBaseVo = new GiftBaseVo();
            $vo.makeData(this, intStart, strStart, i)
            if (!$vo.isDele && $vo.startTime != 0) {
                $arr.push($vo)
            }
        }
        //  console.log("邮件数", $arr.length)
        //   console.log( $arr)
        this._giftList = $arr;
        return $arr
    }
    private _dataState:number = 0;
    public refreshGiftList($vo: GiftBaseVo): void {
        if(!this._giftList){
            return;
        }
        for (var i: number = 0; i < this._giftList.length; i++) {

            if ($vo.indx == this._giftList[i].indx) {
                if ($vo.isDele || $vo.startTime == 0) {
                    this._giftList.splice(i, 1);
                    this._dataState = 2;
                    return;
                }

                this._giftList[i].isGetItem = $vo.isGetItem;
                this._giftList[i].isRead = $vo.isRead;
                this._giftList[i].item = $vo.item;
                this._dataState = 1;
                return;
            }

        }
        this._dataState = 2;
        this._giftList.push($vo);
    }
    
}
class GiftBaseVo {

    public indx: number
    public id: number
    public startTime: number
    public endTime: number
    public type: number
    public isGetItem: boolean
    public isRead: boolean
    public isDele: boolean

    public name: string
    public desc: string
    public from: string
    public item: string;


    //GIFTPACKS_INFO_INT_ID = 0,	//礼包ID
    //GIFTPACKS_INFO_INT_START_TIME = 1,	//发放时间
    //GIFTPACKS_INFO_INT_END_TIME = 2,	//结束时间
    //GIFTPACKS_INFO_INT_BYTE = 3,	//0,礼包类型，1，领取状态,2 已阅读,3是否删除
    //MAX_GIFTPACKS_INFO_INT,

    //GIFTPACKS_INFO_STRING_GIFT_NAME = 0,	//礼包名称
    //GIFTPACKS_INFO_STRING_GIFT_DESC = 1,	//礼包说明
    //GIFTPACKS_INFO_STRING_GIFT_FROM = 2,	//礼包出处，当玩家赠送时填写玩家名字，默认为空，系统赠送
    //GIFTPACKS_INFO_STRING_GIFT_ITEM = 3,	//礼包物品集合
    //MAX_GIFTPACKS_INFO_STRING,

    public makeData($pake: GiftPacksData, intStart: number, strStart: number, indx: number): void {
        this.id = $pake.GetInt32(intStart + SharedDef.GIFTPACKS_INFO_INT_ID)
        this.indx = indx
        this.startTime = $pake.GetInt32(intStart + SharedDef.GIFTPACKS_INFO_INT_START_TIME)
        this.endTime = $pake.GetInt32(intStart + SharedDef.GIFTPACKS_INFO_INT_END_TIME)

        this.type = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 0);
        this.isGetItem = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 1) == 1;
        this.isRead = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 2) == 1;
        this.isDele = $pake.GetUInt8(intStart + SharedDef.GIFTPACKS_INFO_INT_BYTE, 3) == 1;

        this.name = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_NAME);
        this.desc = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_DESC);
        this.from = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_FROM);
        this.item = $pake.GetStr(strStart + SharedDef.GIFTPACKS_INFO_STRING_GIFT_ITEM);


    }
}