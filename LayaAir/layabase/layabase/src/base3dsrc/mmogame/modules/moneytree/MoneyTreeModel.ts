module moneytree {
    export class MoneyTreeGiftVo {
        public tab: tb.TB_moneytree_gift;
        public state: number //0:不可领取 1：未领取 2：已领取
    }

    export class MoneyTreeBaseVo {
        public tab: tb.TB_moneytree_base;
        public state: number //0:免费 1：消耗
        public money:String;
    }

    export class MoneyTreeModel {
        private static _instance: MoneyTreeModel;
        public static getInstance(): MoneyTreeModel {
            if (!this._instance) {
                this._instance = new MoneyTreeModel();
            }
            return this._instance;
        }
        public constructor() {

        }

        public getGiftAry(): Array<MoneyTreeGiftVo> {
            var finshary: Array<MoneyTreeGiftVo> = new Array
            var tabary: Array<tb.TB_moneytree_gift> = tb.TB_moneytree_gift.get_TB_moneytree_gift();
            for (var i = 0; i < tabary.length; i++) {
                var data: MoneyTreeGiftVo = new MoneyTreeGiftVo;
                data.tab = tabary[i];
                if (GuidData.player.getMoneyTreeNum() >= tabary[i].count) {
                    data.state = GuidData.player.getMoneyTreeState(i) ? 2 : 1;
                } else {
                    data.state = 0
                }
                finshary.push(data);
            }
            return finshary;
        }

        public getCurVo():MoneyTreeBaseVo {
            var tabary: Array<tb.TB_moneytree_base> = tb.TB_moneytree_base.get_TB_moneytree_base();
            var times: number = GuidData.player.getMoneyTreeNum() >= tabary.length ? (tabary.length - 1) : GuidData.player.getMoneyTreeNum();

            var tablv:tb.TB_moneytree_lv = tb.TB_moneytree_lv.get_TB_moneytree_lvById(GuidData.player.getLevel());
            var basevo:MoneyTreeBaseVo = new MoneyTreeBaseVo;
            basevo.tab = tabary[times];
            basevo.state = 0;
            if(basevo.tab.cost && basevo.tab.cost.length > 0){
                basevo.state = 1;
            }
            basevo.money = Snum(Math.floor(tablv.reward[1] * basevo.tab.rate / 10000));
            return basevo;
        }
    }
}