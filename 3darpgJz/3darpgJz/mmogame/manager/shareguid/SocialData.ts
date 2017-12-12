class SocialData extends GuidObject {

    public onBaseCreated(): void {
        // console.log("创建社交对象");
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };

        //  console.log("好友数据刷新")
        //  console.log("--申请-------------------");
        //this.traceList(this.getApplyList());
        //   console.log("--好友-------------------");
        //this.traceList(this.getFriendList());
        //   console.log("--仇人-------------------");
        //this.traceList(this.getEnemyList());

        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }

    private dataUpdate($intMask: Object, $strMask: Object): void {
        var indexAry: Array<number> = new Array;
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SOCIAL_FRIEND_START && keyNum < SharedDef.SOCIAL_APPLY_END) {
                var idx: number = keyNum - SharedDef.SOCIAL_FRIEND_START;
                if (idx % SharedDef.MAX_FRIENT_COUNT != 0) {
                    keyNum--;
                }
                if (indexAry.indexOf(keyNum) == -1) {
                    indexAry.push(keyNum);
                }
            }

        }

        for (var key in $strMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SOCIAL_FRIEND_START && keyNum < SharedDef.SOCIAL_APPLY_END) {
                var idx: number = keyNum - SharedDef.SOCIAL_FRIEND_START;
                if (idx % SharedDef.MAX_FRIENT_COUNT != 0) {
                    keyNum--;
                }
                if (indexAry.indexOf(keyNum) == -1) {
                    indexAry.push(keyNum);
                }
            }
        }
        var obj: any = new Object;
        for (var i: number = 0; i < indexAry.length; i++) {
            var r = this.refreshData(indexAry[i]);
            obj[r] = true;
        }

        for (var key in obj) {
            var keyNum = Number(key);
            if (keyNum == 1) {
                if (this._friendList && this._friendList.length > 1) {
                    this.sortList(this._friendList);
                }
                ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDlIST_EVENT));
                ModuleEventManager.dispatchEvent(new whisper.WhisperUiEvent(whisper.WhisperUiEvent.REFRESHFRIENDlIST_EVENT));
            } else if (keyNum == 2) {
                ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REVENGE_PANEL_EVENT));
            } else if (keyNum == 3) {
                // if(this._applyList){
                //     this.sortList(this._applyList);
                // }
                var $aaa = new social.SocialUiEvent(social.SocialUiEvent.REFRESHAPPLYlIST_EVENT);
                if (this._applyList.length > 0) {
                    $aaa.isvisiable = true;
                } else {
                    $aaa.isvisiable = false;
                }
                ModuleEventManager.dispatchEvent($aaa);
            }
        }

        // console.log("好友数据刷新")
        // console.log("--申请-------------------");
        // this.traceList(this.getApplyList());
        // console.log("--好友-------------------");
        // this.traceList(this.getFriendList());
        // console.log("--仇人-------------------");
        // this.traceList(this.getEnemyList());
    }

    private getItemName($index): string {
        return this._str_values[$index];
    }
    private getInfo($index): string {
        return this._str_values[$index + 1];
    }

    public enemyredstate: boolean = false;
    public refreshData($index): number {
        var isRemove: boolean = false;
        if ($index < SharedDef.SOCIAL_FRIEND_END) {
            if (!this._friendList) {
                return;
            }
            for (var i: number = 0; i < this._friendList.length; i++) {
                if (this._friendList[i].index == $index) {
                    //this._friendList[i] = this.getData($index);
                    var dat: SocialItemData = this.getData($index);
                    if (dat) {
                        if (!this._friendList[i].inOnline && dat.inOnline) {
                            console.log("好友：" + dat.name + "上线了")
                        } else if (this._friendList[i].inOnline && !dat.inOnline) {
                            console.log("好友：" + dat.name + "下线了")
                        }
                        this._friendList[i] = dat;
                        // 朋友列表 第i个变化 
                    } else {
                        this._friendList.splice(i, 1);
                        isRemove = true;
                        // 朋友列表 第i个删除
                    }
                    //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDlIST_EVENT));
                    //ModuleEventManager.dispatchEvent(new giving.GivingUiEvent(giving.GivingUiEvent.REFRESHFRIENDlIST_EVENT));
                    break;
                }
            }

            if (i == this._friendList.length && !isRemove) {
                var data = this.getData($index)
                if (data) {
                    this._friendList.push(data);
                }
                //朋友列表第i个增加
                //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHFRIENDlIST_EVENT));
                //ModuleEventManager.dispatchEvent(new giving.GivingUiEvent(giving.GivingUiEvent.REFRESHFRIENDlIST_EVENT));
            }
            return 1;
        } else if ($index < SharedDef.SOCIAL_ENEMY_END) {
            if (!this._enemyList) {
                return;
            }

            for (var i: number = 0; i < this._enemyList.length; i++) {
                if (this._enemyList[i].index == $index) {
                    var dat: SocialItemData = this.getData($index);
                    if (dat) {
                        this._enemyList[i] = dat;
                        //敌人列表 第i个变化
                    } else {
                        this._enemyList.splice(i, 1);
                        isRemove = true;
                        //敌人列表 第i个删除
                    }
                    break;
                }
            }

            if (i == this._enemyList.length && !isRemove) {
                var aaa = this.getData($index);
                if (aaa) {
                    this._enemyList.push(aaa);
                }
                //敌人列表 第i个增加
                this.enemyredstate = true;
                console.log("---列表增加");
            }
            return 2;
        } else if ($index < SharedDef.SOCIAL_APPLY_END) {
            if (!this._applyList) {
                return;
            }

            for (var i: number = 0; i < this._applyList.length; i++) {
                if (this._applyList[i].index == $index) {
                    var dat: SocialItemData = this.getData($index);
                    if (dat) {
                        this._applyList[i] = dat;
                        //申请列表 第i个变化
                    } else {
                        this._applyList.splice(i, 1);
                        isRemove = true;
                        //申请列表 第i个删除
                    }
                    //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHAPPLYlIST_EVENT));
                    break;
                }
            }

            if (i == this._applyList.length && !isRemove) {
                var aaa = this.getData($index);
                if (aaa) {
                    this._applyList.push(aaa);
                }
                //申请列表 第i个增加
                //ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REFRESHAPPLYlIST_EVENT));
            }
            return 3;
        }


    }
    private traceList(ary: Array<SocialItemData>): void {
        console.log("--ary-", ary);
        for (var i: number = 0; i < ary.length; i++) {
            var item: SocialItemData = ary[i];
            console.log("item " + item.index + "," + item.guid + "," + item.name + ",等级" + item.level + ","
                + item.familiayLev + "," + item.familiayExp + "," + (item.inOnline ? "在线" : "离线"));
        }
    }

    private getData($index): SocialItemData {
        if (!this.getItemName($index) || !this.getInfo($index) || this.getItemName($index) == "" || this.getInfo($index) == "") {
            return null;
        }
        var data: SocialItemData = new SocialItemData;
        data.id = $index;
        data.index = $index;
        data.guid = this.getItemName($index);

        var infoStr: string = this.getInfo($index);
        console.log("==infoStr==", infoStr)
        var ary: Array<string> = infoStr.split("\1");

        data.name = ary[0];
        data.faction = ary[1];
        data.gender = this.GetByte($index, 0);
        data.vip = this.GetByte($index, 1);
        data.level = this.GetUInt16($index, 1);

        data.familiayExp = this.GetUInt16($index + 1, 0);
        data.familiayLev = this.GetByte($index + 1, 2);
        data.inOnline = this.GetByte($index + 1, 3) == 1 ? true : false;
        data.force = this.GetDouble($index + 2);
        return data;

    }
    public sortList($list: Array<SocialItemData>): void {
        $list.sort(function (a: SocialItemData, b: SocialItemData): number {
            if (a.inOnline && !b.inOnline) {
                return -1;
            } else if (!a.inOnline && b.inOnline) {
                return 1;
            } else if (a.inOnline && b.inOnline) {
                if (a.familiayLev > b.familiayLev) {
                    return -1;
                } else if (a.familiayLev == b.familiayLev) {
                    if (a.familiayExp > b.familiayExp) {
                        return -1
                    } else {
                        return 1
                    }
                }
            } else {
                return 0;
            }

        })
    }

    private _friendList: Array<SocialItemData>;
    public getFriendList(): Array<SocialItemData> {
        if (this._friendList) {
            return this._friendList;
        }
        var ary: Array<SocialItemData> = new Array;
        var end: number = Math.min(this._str_values.length, SharedDef.SOCIAL_FRIEND_END);
        for (var i: number = SharedDef.SOCIAL_FRIEND_START; i < end; i += SharedDef.MAX_FRIENT_COUNT) {
            var data: SocialItemData = this.getData(i);
            if (data) {
                ary.push(data);
            }
        }
        this.sortList(ary);
        this._friendList = ary;
        return this._friendList;
    }

    private _applyList: Array<SocialItemData>;
    public getApplyList(): Array<SocialItemData> {
        if (!this._applyList) {
            var ary: Array<SocialItemData> = new Array;
            var end: number = Math.min(this._str_values.length, SharedDef.SOCIAL_APPLY_END);
            for (var i: number = SharedDef.SOCIAL_APPLY_START; i < end; i += SharedDef.MAX_FRIENT_COUNT) {
                var data: SocialItemData = this.getData(i);
                if (data) {
                    ary.push(data);
                }
            }
            this._applyList = ary;
        }
        return this._applyList;
    }

    public getApplyFlag(): number {
        return this.GetUInt32(SharedDef.SOCIAL_APPLY_CLEAR_FLAG);
    }

    private _enemyList: Array<SocialItemData>;
    public getEnemyList(): Array<SocialItemData> {
        if (this._enemyList) {
            return this._enemyList;
        }
        var ary: Array<SocialItemData> = new Array;
        var end: number = Math.min(this._str_values.length, SharedDef.SOCIAL_ENEMY_END);
        for (var i: number = SharedDef.SOCIAL_ENEMY_START; i < end; i += SharedDef.MAX_FRIENT_COUNT) {
            var data: SocialItemData = this.getData(i);
            if (data) {
                ary.push(data);
            }
        }
        this.sortList(ary);
        this._enemyList = ary;
        return this._enemyList;
    }

}

class SocialItemData {
    public id: number;
    public guid: string;
    public name: string;
    public faction: string;

    public level: number;
    public gender: number;
    public vip: number;

    public index: number;

    public familiayLev: number;
    public familiayExp: number;

    public inOnline: boolean;
    public type: string;
    public force: number;


}