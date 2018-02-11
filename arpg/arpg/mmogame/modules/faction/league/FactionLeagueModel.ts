module faction {


    export class FactionLeagueModel {

        private static _instance: FactionLeagueModel;
        public static getInstance(): FactionLeagueModel {
            if (!this._instance) {
                this._instance = new FactionLeagueModel();
            }
            return this._instance;
        }

        public constructor() {

        }
        /**
         * 返回当前属于哪个阶段
         */
        public getCurStage(): number {
            var stage: number = GuidData.globelValue.getFactionLeagueStage();
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_match_phase, stage);
            var id: number = 0;
            if ($obj) {
                id = $obj["script"];
            }
            return id;
        }
        /**
         * 返回当前属于哪个模块
         */
        public getCurModul(): number {
            var stage: number = GuidData.globelValue.getFactionLeagueStage();
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_match_phase, stage);
            var id: number = 0;
            if ($obj) {
                id = $obj["script"];
            }
            return this.retModul(id);
        }

        private retModul($script): number {
            switch ($script) {
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_INIT:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_UPDATE:
                    //生成对战列表阶段
                    return 2;
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_DECIDE_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_FIRST:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_SECOND:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_SECOND:
                    //比赛阶段
                    return 0;
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_SECOND:
                case SharedDef.FACTION_MATCH_SCRIPT_TYPE_NONE:
                    //结束
                    return 1;
            }
        }

        public readData(): Array<LeagueItem> {
            var list: Array<LeagueItem> = new Array
            var curmodul: number = this.getCurModul();
            if (curmodul == 1) {
                this._modullist.sort(
                    function (a: faction_match_info, b: faction_match_info): number {
                        return a.rank - b.rank;
                    })
            }

            for (let i = 0; i < 5; i++) {
                var cell: LeagueItem = new LeagueItem;
                cell.items = new Array
                cell.type = curmodul;
                for (let k = 0; k < 4; k++) {
                    var idx = i * 4 + k;
                    if (this._modullist.length > idx) {
                        cell.items.push(this._modullist[idx]);
                    } else {
                        cell.items.push(null);
                    }
                }
                list.push(cell);
            }
            //console.log("---list-----", list);
            return list;
        }

        private _modullist: Array<faction_match_info>
        public writeData($vo: s2c_show_faction_match_info_list) {
            this._modullist = $vo.list
        }

        //获取是否有我家族参赛资格
        public getMyFaction():faction_match_info {
            if(!GuidData.faction){
                return null;
            }
            for (let i = 0; i < this._modullist.length; i++) {
                if (this._modullist[i].guid == GuidData.faction.getGuid()) {
                    return this._modullist[i];
                }
            }
            return null;
        }
    }
}