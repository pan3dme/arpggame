module faction {

    export class FactionUitl {
        public static getNameByGuid($guid: string): FactionItemData {
            var ary: Array<FactionItemData> = GuidData.faction.getFactionList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == $guid) {
                    return ary[i];
                }
            }
            return null;
        }


        public static parsingToOneitemlist($itemstr: string): Array<string> {
            var parsing2 = $itemstr.split("\2");
            var ary1 = new Array<string>();
            for (var j = 0; j < parsing2.length; j++) {
                ary1.push(parsing2[j]);
            }
            return ary1;
        }

        //通过道具id获得道具名
        public static getPropNameByItemID($itemid: number): string {
            var tabvo = tb.TB_item_template.get_TB_item_template($itemid);
            return tabvo.getColorName();
        }

        public static getRestTime($msgtime: number): string {
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts * 1000);
            //今日日期
            var currentday = $sever.toLocaleDateString().replace(/\//g, "-");

            var $play: Date = new Date($msgtime * 1000);
            //发帖日期
            var completeday = $play.toLocaleDateString().replace(/\//g, "-");
            console.log("==", currentday, completeday);
            var timestr: string = completeday;
            if (currentday == completeday) {
                //如果相等，取分时，字符串
                timestr = $play.toTimeString().substr(0, 5);
            }

            return timestr;
        }
    }

    export class FactionModel {

        private static _instance: FactionModel;
        public static getInstance(): FactionModel {
            if (!this._instance) {
                this._instance = new FactionModel();
            }
            return this._instance;
        }

        public constructor() {

        }



        private _invitationList: Array<s2c_show_faction_invite>
        public getInvitationList(): Array<s2c_show_faction_invite> {
            if (!this._invitationList) {
                this._invitationList = new Array
            }
            return this._invitationList;
        }

        public chgInvitationList_add($data: s2c_show_faction_invite) {
            if (!this._invitationList) {
                this._invitationList = new Array
            }
            //判断是否已经存在
            for (var i = 0; i < this._invitationList.length; i++) {
                if (this._invitationList[i].guid == $data.guid && this._invitationList[i].faction_guid == $data.faction_guid) {
                    return;
                }
            }
            //往第一个索引添加
            this._invitationList.unshift($data);
        }

        public chgInvitationList_remove($data: s2c_show_faction_invite) {
            if (!this._invitationList) {
                this._invitationList = new Array
            }
            //判断是否已经存在
            for (var i = 0; i < this._invitationList.length; i++) {
                if (this._invitationList[i].guid == $data.guid && this._invitationList[i].faction_guid == $data.faction_guid) {
                    this._invitationList.splice(i,1);
                    break;
                }
            }
        }

        public chgInvitationList_clear() {
            if (!this._invitationList) {
                this._invitationList = new Array
            } else {
                while (this._invitationList.length > 0) {
                    this._invitationList.pop();
                }
            }
        }
    }
}