class StrengGuidObject extends GuidObject {

    public constructor(g: string = "") {
        super();

        //this.AddListen(4, (binlog: BinLogStru) => { this.dataChg(binlog) });
        this.AddListen(200, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(201, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(202, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(203, (binlog: BinLogStru) => { this.dataChg(binlog) });
        //this.AddListen(204, (binlog: BinLogStru) => { this.dataChg(binlog) });

        //this.AddListenString(4, (binlog: BinLogStru) => { this.dataChgStr(binlog) });
       // this._after_update = (obj, flags, intMask, strMask) => { this.after_update(obj, flags, intMask, strMask) };

    }

    private after_update(obj: GuidObject, flags: number, intMask: UpdateMask, strMask: UpdateMask): void {
        // console.log("更新代号：" + flags);

        if (flags == SyncEvent.OBJ_OPT_BINLOG) {

            for (var i: number = 0; i < 8; i++){
                var partIndex = SharedDef.APPD_LOGICAL_INFO_INT_FIELD_STRENGTH_START + SharedDef.EQUIP_PART_OPT_TYPE_ONE_PART_INFO_LENGTH * i;
                if (intMask.GetBit(partIndex)) {
                    // console.log("强化部位：" + i + " 等级：" + this.GetUInt32(partIndex));
                }
            }

        }

        

    }

    public dataChg(binlog: BinLogStru): void {

        // console.log("强化结果：index:" + binlog.index + "opt:" + binlog.opt + "type:" + binlog.typ + "value:" + binlog.value);
        if (binlog.index == 203){
            // console.log("float :" + this.GetFloat(binlog.index));
        }
    }
    public dataChgStr(binlog: BinLogStru): void {
        //traceInfo("强化结果str：" + binlog.index + ":" + binlog._value_str);
    }



}