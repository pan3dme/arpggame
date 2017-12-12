module role {
    export class TabItemData {
        public id: number;
        public name: string;
        public data: Array<AchieveItemData>;
        /** 数据状态   1：一级页签  2：二级页签 */
        public state: number;
        public isredpoint: boolean;
        public selecteds: boolean = false;
    }

    export class TabKey {
        public static TabAction = 1
        public static Tabdesignation = 2
    }

    export class TitleData {
        public id: number;
        public data: tb.TB_title_base;
        /** 数据状态   1：未获得  2：未查看  3：未装备  4：已装备 */
        public state: number = 1;
        public time: number  //称号失效时间
        public node:RedPointNode;
    }


    export class ObtainData {
        public isObtain: boolean = false;
        public time: number  //称号失效时间
        public init: boolean;
    }

    export class RoleModel {

        private static _instance: RoleModel;
        public static getInstance(): RoleModel {
            if (!this._instance) {
                this._instance = new RoleModel();
            }
            return this._instance;
        }

        public constructor() {
            this.getBaseList();
        }

        private _alltitleary: Array<tb.TB_title_base>;
        private _allachieveary: Array<tb.TB_achieve_base>;
        private getBaseList(): void {
            this._allachieveary = tb.TB_achieve_base.getTB_achieve_base();
            this._allachieveary.sort(function (a: tb.TB_achieve_base, b: tb.TB_achieve_base): number {
                if (a.type == b.type) {
                    return a.id - b.id;
                } else {
                    return a.type - b.type;
                }
            })
            console.log("---this._allary---", this._allachieveary);

            this._alltitleary = tb.TB_title_base.getTB_title_base();
        }


        public getTabListByType($type): Array<TabItemData> {
            var lastvo: TabItemData
            var type: number = -1;
            var stype: number = -1;
            var $ary: Array<TabItemData> = new Array;
            for (var i = 0; i < this._allachieveary.length; i++) {
                //先获取所有的一级页签
                if (this._allachieveary[i].type != type) {
                    //是否有这个一级页签  没有，则添加上去
                    type = this._allachieveary[i].type;
                    var tabitemData: TabItemData = new TabItemData();
                    tabitemData.state = 1
                    tabitemData.id = type;
                    tabitemData.name = "T1_" + type;
                    tabitemData.isredpoint = this.isredpointByOne(type);
                    if ($type == type) {
                        tabitemData.selecteds = true;
                    } else {
                        tabitemData.selecteds = false;
                    }
                    $ary.push(tabitemData);
                }
                //再获取选中的一级页签下的，二级页签
                if ($type == this._allachieveary[i].type && this._allachieveary[i].stype != stype) {
                    //二级页签 当前选中的一级页签下的二级页签
                    stype = this._allachieveary[i].stype;
                    var tabitemData: TabItemData = new TabItemData();
                    tabitemData.state = 2
                    tabitemData.id = stype
                    tabitemData.name = "T1_" + type + "_" + stype;
                    this.setAry(tabitemData, this._allachieveary[i].type, this._allachieveary[i].stype);
                    tabitemData.isredpoint = this.isredpointBytwo(tabitemData.data);
                    $ary.push(tabitemData);
                }
            }

            return $ary;
        }

        private setAry($tabitemData: TabItemData, $type: number, $stype: number): Array<AchieveItemData> {
            var $ary1: Array<AchieveItemData> = new Array;  //已完成 已领取
            var $ary2: Array<AchieveItemData> = new Array;  //已完成 未领取
            var $ary3: Array<AchieveItemData> = new Array;  //未完成
            for (var i = 0; i < this._allachieveary.length; i++) {
                if (this._allachieveary[i].type == $type && this._allachieveary[i].stype == $stype) {
                    var bb: AchieveItemData = GuidData.quest.getAchieveInfo(this._allachieveary[i].id);
                    bb.data = this._allachieveary[i];
                    if (bb.hasReach && bb.hasReward) {
                        $ary1.push(bb);
                    }
                    if (bb.hasReach && !bb.hasReward) {
                        $ary2.push(bb);
                    }
                    if (!bb.hasReach) {
                        $ary3.push(bb);
                    }
                }
            }
            var list = $ary2.concat($ary3, $ary1);
            $tabitemData.data = list;
            return list;
        }


        public getFirstList(): Array<AchieveItemData> {
            var $type: number = 1;
            var $stype: number = 1;
            for (var i = 0; i < this._allachieveary.length; i++) {
                var bb: AchieveItemData = GuidData.quest.getAchieveInfo(this._allachieveary[i].id);
                bb.data = this._allachieveary[i];
                if (bb.hasReach && !bb.hasReward) {
                    $type = this._allachieveary[i].type
                    $stype = this._allachieveary[i].stype
                    break;
                }
            }
            return this.setAry(new TabItemData, $type, $stype);
        }

        public getListBy2Type($type: number, $stype: number): Array<AchieveItemData> {
            return this.setAry(new TabItemData, $type, $stype);
        }

        private isredpointByOne($type: number): boolean {
            for (var i = 0; i < this._allachieveary.length; i++) {
                if (this._allachieveary[i].type == $type) {
                    var aa = GuidData.quest.getAchieveInfo(this._allachieveary[i].id);
                    if (aa.hasReach && !aa.hasReward) {
                        return true;
                    }
                }
            }
            return false;
        }

        private isredpointBytwo($data: Array<AchieveItemData>): boolean {
            for (var i = 0; i < $data.length; i++) {
                if ($data[i].hasReach && !$data[i].hasReward) {
                    return true;
                }
            }
            return false;
        }

        /**
         * getListByTab
         */
        public getListByTab($type: number): Array<TitleData> {
            var typeAry: Array<TitleData> = new Array
            for (var i = 0; i < this._alltitleary.length; i++) {
                if (this._alltitleary[i].type == $type) {
                    var aary: TitleData = new TitleData();
                    aary.data = this._alltitleary[i]
                    typeAry.push(aary);
                }
            }

            var okary: Array<TitleData> = new Array  //已获得称号
            var noary: Array<TitleData> = new Array  //未获得称号

            for (var i = 0; i < typeAry.length; i++) {
                var $obtainData: ObtainData = this.obtainTitle(typeAry[i]);
                if ($obtainData.isObtain) {
                    typeAry[i].time = $obtainData.time
                    if ($obtainData.init) {
                        typeAry[i].state = 3
                    } else {
                        typeAry[i].state = 2
                    }
                    okary.push(typeAry[i]);
                } else {
                    noary.push(typeAry[i]);
                }
            }
            //已获得装备的排序
            okary = this.SortByQualityDESC(okary);
            var currenttitle = GuidData.player.getTitleID();
            if (currenttitle != 0) {
                var vobyid: tb.TB_title_base = tb.TB_title_base.get_TB_title_baseById(currenttitle);
                if (vobyid.type == $type) {
                    //当前装备称号在此分类中
                    for (var i = 0; i < okary.length; i++) {
                        if (currenttitle == okary[i].data.id) {
                            var aaa: TitleData = okary[i];
                            aaa.state = 4;
                            //删除
                            okary.splice(i, 1);
                            //插入
                            okary.splice(0, 0, aaa);
                        }
                    }
                }
            } else {
                // console.log("当前无装备称号");
            }
            //未获得装备的排序
            noary = this.SortByQualityASC(noary);
            return okary.concat(noary);
        }

        private SortByQualityDESC($ary: Array<TitleData>): Array<TitleData> {
            //按品质降序排序
            $ary.sort(
                function (a: TitleData, b: TitleData): number {
                    if (a.data.qua == b.data.qua) {
                        return b.data.id - a.data.id
                    } else {
                        return b.data.qua - a.data.qua;
                    }
                }
            )
            return $ary;
        }

        private SortByQualityASC($ary: Array<TitleData>): Array<TitleData> {
            //按品质升序排序
            $ary.sort(
                function (a: TitleData, b: TitleData): number {
                    if (a.data.qua == b.data.qua) {
                        return a.data.id - b.data.id
                    } else {
                        return a.data.qua - b.data.qua;
                    }
                }
            )
            return $ary;
        }

        private obtainTitle($vo: TitleData): ObtainData {
            var a: Array<TitleItemData> = GuidData.quest.getTitleList();
            var obtainData: ObtainData = new ObtainData();
            if (a) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == $vo.data.id) {
                        //封装成一个对象过去。
                        obtainData.isObtain = true;
                        obtainData.init = a[i].init;
                        obtainData.time = a[i].time
                    }
                }
            }
            return obtainData;
        }

    }
}