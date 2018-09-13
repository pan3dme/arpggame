module copytask {
    export class TeamCopyItemVo {
        public tabvo: tb.TB_group_instance_base;
        public state: number;//1:未通过 2：通过 3：未解锁
    }

    export class ResItemvo{
        public tab:any;//tb_instance_res
        public passed:number;//是否首通
        public receive:number;//是否领取首通奖励
        public num:number;
    }

    export class CopytaskModel {
        public constructor() {

        }

        private static _instance: CopytaskModel;
        public static getInstance(): CopytaskModel {
            if (!this._instance) {
                this._instance = new CopytaskModel();
            }
            return this._instance;
        }

        /**
          * getList
          */
        public getList(): Array<TeamCopyItemVo> {

            var firstflagary: Array<boolean> = GuidData.player.getteamflag();
            var $finalary: Array<TeamCopyItemVo> = new Array;
            var tabary: Array<tb.TB_group_instance_base> = tb.TB_group_instance_base.getItem();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo: TeamCopyItemVo = new TeamCopyItemVo();
                if (tabary[i].limLev > GuidData.player.getLevel()) {
                    itemvo.state = 3;
                } else {
                    if (firstflagary[tabary[i].id]) {
                        itemvo.state = 2;
                    } else {
                        itemvo.state = 1;
                    }
                }
                itemvo.tabvo = tabary[i];
                $finalary.push(itemvo);
            }

            // $finalary.sort(
            //     function (a: TeamCopyItemVo, b: TeamCopyItemVo): number {
            //         if (a.state == b.state) {
            //             return a.tabvo.id - b.tabvo.id;
            //         } else {
            //             return a.state - b.state;
            //         }
            //     }
            // )

            //console.log("--$finalary--", $finalary);
            return $finalary;
        }

        public getResItems($type:number):Array<ResItemvo>{
            var finiary:Array<ResItemvo> = new Array
            var kk: Array<any> = GuidData.instanceData.getInstanceIntFieldResSatrt();
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_instance_res)
            for (var $key in $obj.data) {
                if($type == $obj.data[$key]["type"]){
                    var cell:ResItemvo = new ResItemvo;
                    cell.tab = $obj.data[$key];
                    var idx:number = cell.tab["id"]
                    var type:number = cell.tab["type"]
                    if (kk[idx]) {
                        cell.passed = kk[idx - 1].passed;
                        cell.receive = kk[idx - 1].recive;
                        cell.num = cell.tab["times"] - kk[type - 1].num;
                    }else{
                        //console.log("---后端的数据未存在----");
                        cell.passed = 0;
                        cell.receive = 0;
                        cell.num = 0;
                    }
                    finiary.push(cell);
                }
            }
            //console.log("----finiary---",finiary);
            return finiary;
        }
    }
}