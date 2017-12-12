module stronger {

    export class StrongerUitl {
        public static getGrade($curzhanli: number, $goodzhanli: number): number {
            var lev: number;
            var bqary:Array<tb.TB_bianqiang_rank> = tb.TB_bianqiang_rank.get_TB_bianqiang_rank();
            var ratio = ($curzhanli / $goodzhanli) * 100;
            for (var i = 0; i < bqary.length; i++) {
                if (ratio >= bqary[i].percent) {
                    lev = i;
                }
            }
            // if (ratio >= 100) {
            //     lev = 0;
            // } else if (ratio >= 80) {
            //     lev = 1;
            // } else if (ratio >= 60) {
            //     lev = 2;
            // } else {
            //     lev = 3;
            // }
            return lev;
        }

        public static STRONGER_UP: number = 1;//我要变强
        public static STRONGER_LEV: number = 2;//我要升级
        public static STRONGER_EQUIP: number = 3;//我要装备
        public static STRONGER_MOUNT: number = 4;//我要坐骑
        public static STRONGER_WINGS: number = 5;//我要翅膀
    }

    export class StrongerModel {

        private static _instance: StrongerModel;
        public static getInstance(): StrongerModel {
            if (!this._instance) {
                this._instance = new StrongerModel();
            }
            return this._instance;
        }

        public constructor() {

        }

        /**
         * getList
         */
        public getList($type: number): Array<StrongerItemVo> {
            var $finalary: Array<StrongerItemVo> = new Array;
            var tabary: Array<tb.TB_bianqiang_sub> = tb.TB_bianqiang_sub.get_TB_bianqiang_sub();
            for (var i = 0; i < tabary.length; i++) {
                if ($type == tabary[i].parent_id && GuidData.player.getLevel() >= tabary[i].limitlev) {
                    var strongerItemVo: StrongerItemVo = new StrongerItemVo();
                    strongerItemVo.data = tabary[i];
                    if ($type == StrongerUitl.STRONGER_UP) {
                        var zhanli: number = this.getzhanli(tabary[i].value_type);
                        if (zhanli == -1) {
                            alert("战力出错");
                        } else {
                            strongerItemVo.zhanli = zhanli;
                            var curzhanli: number = this.getCurrentZhanli(tabary[i].value_type);
                            strongerItemVo.curzhanli = curzhanli;
                            strongerItemVo.state = StrongerUitl.getGrade(curzhanli, zhanli);
                        }
                    }
                    $finalary.push(strongerItemVo);
                }
            }
            console.log("--$finalary--", $finalary);
            return $finalary;
        }

        private getzhanli($index: number): number {
            var tabvo: tb.TB_bianqiang_value = tb.TB_bianqiang_value.get_TB_bianqiang_valueById(GuidData.player.getLevel());
            for (var i = 0; i < tabvo.value_devide.length; i++) {
                if (tabvo.value_devide[i][0] == $index) {
                    return tabvo.value_devide[i][1];
                }
            }
            return -1;
        }

        private getCurrentZhanli($type: number): number {
            var curzhanli: number = 0;
            switch ($type) {
                case 1:
                    curzhanli = GuidData.player.getDivineForce();
                    break;
                case 2:
                    curzhanli = GuidData.player.getSkillForce();
                    break;
                case 3:
                    //强化
                    for (var i = 0; i < 10; i++) {
                        console.log("--强化--",GuidData.grow.getStrengLev(i+1));
                        curzhanli = curzhanli + GuidData.grow.getStrengLev(i+1);
                    }
                    break;
                case 4:
                    //宝石
                    for (var i = 0; i < 10; i++) {
                        console.log("--宝石--",GuidData.grow.getGemLev(i+1, 0),GuidData.grow.getGemLev(i+1, 1),GuidData.grow.getGemLev(i+1, 2));
                        // curzhanli = curzhanli + Math.max(GuidData.grow.getGemLev(i+1, 0),GuidData.grow.getGemLev(i+1, 1),GuidData.grow.getGemLev(i+1, 2));
                        curzhanli = curzhanli + Math.min(GuidData.grow.getGemLev(i+1, 0),GuidData.grow.getGemLev(i+1, 1),GuidData.grow.getGemLev(i+1, 2));
                    }
                    break;
                case 5:
                    curzhanli = GuidData.player.getMountForce();
                    break;
            }
            return curzhanli;
        }
    }



    export class StrongerItemVo {
        public data: tb.TB_bianqiang_sub;
        public zhanli: number;
        public curzhanli: number;
        public state: number;
    }

}