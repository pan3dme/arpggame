module copytask {
    export class TeamCopyItemVo {
        public tabvo: tb.TB_group_instance_base;
        public state: number;//1:未通过 2：通过 3：未解锁
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

            console.log("--$finalary--", $finalary);
            return $finalary;
        }
    }
}