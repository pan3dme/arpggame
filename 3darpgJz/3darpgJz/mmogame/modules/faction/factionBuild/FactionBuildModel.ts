module faction {


    export class FactionBuildModel {

        private static _instance: FactionBuildModel;
        public static getInstance(): FactionBuildModel {
            if (!this._instance) {
                this._instance = new FactionBuildModel();
            }
            return this._instance;
        }

        public constructor() {

        }

        /**
         * getList
         */
        public getList(): Array<FBuildItemVo> {
            var $type: number = -100;
            // var $index: number = 0;
            var $finalary: Array<FBuildItemVo> = new Array;
            var tabary: Array<tb.TB_faction_building> = tb.TB_faction_building.get_TB_faction_building();


            var arynum: Array<number> = GuidData.faction.getHaveBuild();
            for (var i = 0; i < arynum.length; i++) {
                if (arynum[i] > 0) {
                    var vo: FBuildItemVo = new FBuildItemVo();
                    vo.data = tb.TB_faction_building.get_TB_faction_buildingById(arynum[i]);
                    if (GuidData.faction.getBuildCur() == arynum[i]) {
                        vo.state = 1
                    } else {
                        vo.state = 3
                    }
                    $finalary.push(vo);
                }
            }

            for (var i = 0; i < tabary.length; i++) {
                if (tabary[i].type != $type && !this.hasItem(tabary[i],$finalary)) {
                    var vo: FBuildItemVo = new FBuildItemVo();
                    vo.data = tabary[i];
                    vo.state = 2;
                    $finalary.push(vo);
                }
                $type = tabary[i].type;
            }

            return $finalary;
        }

        private hasItem($tabvo:tb.TB_faction_building,$completeary: Array<FBuildItemVo>): boolean {
            for (var i = 0; i < $completeary.length; i++) {
                if($completeary[i].getType() == $tabvo.type){
                    return true;
                }
            }
            return false;
        }

        public getTime($overtime: number): Array<number> {

            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts);

            var a: number = $overtime - $sever.getTime();
            var min: number;
            var s: number;
            if (a < 60) {
                min = 0;
                s = a;
            } else {
                min = Math.floor(a / 60);
                s = a - min * 60;
            }
            return [min, s];
        }

        public comPareTime($overtime: number): boolean {
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts);

            var a: number = $overtime - $sever.getTime();
            if (a < 0) {
                return false;
            }
            return true;
        }

        public getTabvo($buildtype: number): tb.TB_faction_building {
            var havebuildlist = GuidData.faction.getHaveBuild();
            for (var i = 0; i < havebuildlist.length; i++) {
                if (havebuildlist[i] > 0) {
                    var a = havebuildlist[i];
                    var b = Math.floor(a / 100);
                    if (b == $buildtype) {
                        return tb.TB_faction_building.get_TB_faction_buildingById(a);
                    }
                }

            }

            return null;
        }

    }



    export class FBuildItemVo {
        public data: tb.TB_faction_building;
        public state: number;//1：正在建造  2：未开放 3：已开放
        private type: number;

        public getType(): number {
            return (this.data.id - this.data.level) / 100;
        }
    }
}