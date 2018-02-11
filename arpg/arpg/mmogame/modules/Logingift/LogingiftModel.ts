module logingift {

    export class LogingiftModel {

        private static _instance: LogingiftModel;
        public static getInstance(): LogingiftModel {
            if (!this._instance) {
                this._instance = new LogingiftModel();
            }
            return this._instance;
        }

        public constructor() {

        }

        /**获得第一个未领取奖励的展示模型索引 */
        public getnearday(): number {
            var aflag: Array<boolean> = GuidData.player.getLogingiftReward();
            for (var i = 0; i < aflag.length; i++) {
                if (!aflag[i]) {
                    var tab: tb.TB_login_activity_reward = tb.TB_login_activity_reward.get_TB_login_activity_rewardById(i + 1);
                    return tab.indx;
                }
            }
        }


        public getList(): Array<LogingiftVo> {
            var arylist: Array<LogingiftVo> = new Array;
            var curday: number = GuidData.player.getLogingiftDay();
            var arytab: Array<tb.TB_login_activity_reward> = tb.TB_login_activity_reward.get_TB_login_activity_reward();
            var aflag: Array<boolean> = GuidData.player.getLogingiftReward();
            for (var i = 0; i < arytab.length; i++) {
                var vo: LogingiftVo = new LogingiftVo();
                vo.data = arytab[i];
                if (curday >= arytab[i].day) {
                    //满足领取条件
                    if (aflag[i]) {
                        //已领取
                        vo.state = 3;
                    } else {
                        //可领取
                        vo.state = 1;
                    }
                } else {
                    vo.state = 2;
                }
                arylist.push(vo);
            }

            arylist.sort(function (a: LogingiftVo, b: LogingiftVo): number {
                if (a.state == b.state) {
                    return a.data.id - b.data.id;
                } else {
                    return a.state - b.state;
                }
            })

            return arylist;
        }

        public isVisiable(): boolean {
            var ary = this.getList();
            for (var i = 0; i < ary.length; i++) {
                if(ary[i].state != 3){
                    return true;
                }
            }
            return  false;
        }
    }

    export class LogingiftVo {
        public data: tb.TB_login_activity_reward;
        /** 1:可领取  2：未领取 3：已领取 */
        public state: number;
    }
}