module mountui {
    export class MountSkillData {
        public id: number
        public tab: tb.TB_skill_base
        public tabskill_uplev: tb.TB_skill_uplevel
        public state: number;//0:可升级  1：满级  2：未解锁
        public lev: number;//若未解锁，则代表第几阶解锁——阶数
        public node: RedPointNode
    }

    export class MountLevAttribute {
        public curtab: any
        public nexttab: any
        public state: number;//0：未满级可升级  1：未满级不可升级 2：满级
    }

    export class HuanhuaVo {
        public id: number;
        public tab: tb.TB_mount_illusion_vo;
        public state: number;//0:已解锁 1：未解锁 2：已幻化
        public node: RedPointNode
    }

    export class NewMountModel {
        public constructor() {

        }
        private static _instance: NewMountModel;
        public static getInstance(): NewMountModel {
            if (!this._instance) {
                this._instance = new NewMountModel();
            }
            return this._instance;
        }

        public getSkillList(): Array<MountSkillData> {
            var skillary: Array<MountSkillData> = new Array
            var $list: Array<any> = GuidData.grow.getzuoqiJinengList();
            var tabary = tb.TB_mount_base_vo.getItem();
            for (var i = 0; i < tabary.length; i++) {
                if (tabary[i].skills.length == 0 || tabary[i].skills[0] == 0) {
                    continue;
                }
                var aa = new MountSkillData();
                aa.id = i;
                aa.tab = tb.TB_skill_base.get_TB_skill_base(tabary[i].skills[0]);

                //可升级的等级上限
                var levup = aa.tab.uplevel_id[1] - aa.tab.uplevel_id[0] + 1

                aa.state = 2;
                aa.lev = tabary[i].id
                aa.tabskill_uplev = null;
                for (var j: number = 0; j < $list.length; j++) {
                    if (tabary[i].skills[0] == $list[j].id) {
                        aa.lev = $list[j].lev
                        j == $list.length;
                        if ($list[j].lev == levup) {
                            aa.state = 1;
                        } else {
                            aa.state = 0;
                            aa.tabskill_uplev = tb.TB_skill_uplevel.get_TB_skill_uplevel(aa.tab.uplevel_id[0] + aa.lev - 1);
                        }
                    }
                }

                skillary.push(aa);
            }
            return skillary;
        }

        /**
         * 获取等级属性对象
         */
        public getLevAttribute(): MountLevAttribute {
            var levattr = new MountLevAttribute();
            var mountlev = GuidData.grow.getMountlev();
            var tabary = tb.TB_mount_raise_level.get_TB_mount_raise_level();
            levattr.nexttab = null;
            levattr.curtab = tabary[mountlev - 1]
            if (mountlev < tabary.length) {
                //未满级
                levattr.nexttab = tabary[mountlev]
                levattr.state = 0;
                if (GuidData.player.getLevel() <= mountlev) {
                    levattr.state = 1;
                }
            } else {
                //满级
                levattr.state = 2;
            }
            console.log("==-levattr=", levattr, mountlev);
            return levattr;
        }

        /**
         * 获取阶数属性对象
         */
        public getOrderAttribute(): MountLevAttribute {
            var levattr = new MountLevAttribute();
            var tabary = tb.TB_mount_train_vo.getTabelItem();
            var mountlevel: number = GuidData.grow.getMountLevel() == 0 ? 1 : GuidData.grow.getMountLevel();//阶数
            var start: number = GuidData.grow.getMountStart();
            var $id: number = (mountlevel - 1) * 11 + start + 1;//索引id计算
            levattr.nexttab = null;
            levattr.curtab = tabary[$id - 1]
            var finalvo: tb.TB_mount_train_vo = tabary[tabary.length - 1];
            if (mountlevel == finalvo.level && start == finalvo.star) {
                //满级
                levattr.state = 2;
            } else {
                //未满级
                levattr.nexttab = this.differenceNum(tabary[$id], tabary[$id - 1]);
                levattr.state = 0;
            }
            return levattr;
        }

        private differenceNum($nexttab: tb.TB_mount_train_vo, $curtab: tb.TB_mount_train_vo): Array<number> {
            var Numary: Array<number> = new Array
            for (var i = 0; i < $nexttab.prosKeys.length; i++) {
                Numary.push($nexttab.prosValues[i] - $curtab.prosValues[i]);
            }
            return Numary;
        }


        /**
         * 获取幻化属性对象
         */
        public getHuanhuaAttribute($id: number): MountLevAttribute {
            var levattr = new MountLevAttribute();
            var tab = tb.TB_mount_illusion_vo.get_TB_mount_illusion_vo($id);
            levattr.nexttab = null;
            levattr.curtab = tab;
            levattr.state = 2
            return levattr;
        }

        /**
         * 获取幻化数据
         */
        public getHuanhuaVO(): Array<HuanhuaVo> {
            var ary: Array<HuanhuaVo> = new Array;
            var tabary = tb.TB_mount_illusion_vo.getTabelItem();
            for (var i = 0; i < tabary.length; i++) {
                var a = new HuanhuaVo();
                a.tab = tabary[i];
                a.id = tabary[i].id;
                console.log("id -- ",a.id);
                a.state = this.isactivation(tabary[i].id);
                ary.push(a);
            }

            ary.sort(
                function (a: HuanhuaVo, b: HuanhuaVo): number {
                    if (a.state != b.state) {
                        if (a.state == 1 || b.state == 1) {
                            return a.state == 1?1:-1;
                        } else {
                            return a.tab.id - b.tab.id;
                        }
                    } else {
                        return a.tab.id - b.tab.id;
                    }
                }
            )

            return ary;
        }

        /**
         * 获取数组中，幻化指针索引
         */
        public getHuanhuaIndex():number{
            var aary = this.getHuanhuaVO();
            console.log("---aary--",aary);
            for (var i = 0; i < aary.length; i++) {
                if(aary[i].state == 2){
                    return aary[i].id;
                }
            }
            //如果没有查询到，则返回幻化表第一条数据的id
            return aary[0].id;
        }

        private isactivation($id): number {
            //已激活id
            var $ActivatedList: Array<number> = GuidData.grow.getHuanhuaID();

            for (var index = 0; index < $ActivatedList.length; index++) {
                if ($ActivatedList[index] == $id) {
                    //已激活该幻化坐骑
                    if (GuidData.player.getMountHuanhua() == $id) {
                        return 2;
                    } else {
                        return 0;
                    }
                }
            }
            return 1;
        }
    }



    export class MountUtil {
        
    }
}