module stronger {

    export class StrongerUitl {
        public static getGrade($curzhanli: number, $goodzhanli: number): number {
            var lev: number;
            var bqary: Array<tb.TB_bianqiang_rank> = tb.TB_bianqiang_rank.get_TB_bianqiang_rank();
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
                if ($type == tabary[i].parent_id) {
                    if (tabary[i].parent_id == StrongerUitl.STRONGER_UP) {
                        if (GuidData.player.getLevel() >= tabary[i].limitlev) {
                            //如果是我要变强，就把等级足够的显示出来
                            var strongerItemVo: StrongerItemVo = new StrongerItemVo();
                            strongerItemVo.data = tabary[i];
                            var zhanli: number = this.getzhanli(tabary[i].value_type);
                            if (zhanli == -1) {
                                alert("战力出错");
                            } else {
                                strongerItemVo.zhanli = zhanli;
                                var curzhanli: number = this.getCurrentZhanli(tabary[i].value_type);
                                strongerItemVo.curzhanli = curzhanli;
                                strongerItemVo.state = StrongerUitl.getGrade(curzhanli, zhanli);
                            }
                            $finalary.push(strongerItemVo);
                        }
                    } else {
                        //如果不是我要变强，那就把所有的显示出来，但是按钮变成未开启
                        var strongerItemVo: StrongerItemVo = new StrongerItemVo();
                        strongerItemVo.data = tabary[i];
                        $finalary.push(strongerItemVo);
                    }
                }
            }
            //console.log("--$finalary--", $finalary);
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
                case 115://境界
                    curzhanli = GuidData.player.getRealmbreakForce();
                    break;
                case 102://角色装备
                    curzhanli = GuidData.player.getEquipForce();
                    break;
                case 202://角色技能
                    curzhanli = GuidData.player.getSkillForce();
                    break;
                case 206://炼器
                    curzhanli = GuidData.player.getStrengForce();
                    break;
                case 205://坐骑
                    curzhanli = GuidData.player.getMountForce();
                    break;
                case 203://法宝
                    curzhanli = GuidData.player.gettalismantotalzhanli();
                    break;
                case 209://神器
                    curzhanli = GuidData.player.getAdventureForce();
                    break;
                case 208://经脉
                    curzhanli = GuidData.player.getPlayerIntFieldMeridianForce();
                    break;
                case 207://翅膀
                    curzhanli = GuidData.player.getWingForce();
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