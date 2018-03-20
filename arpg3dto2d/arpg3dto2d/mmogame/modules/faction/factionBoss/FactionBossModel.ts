module faction {


    export class FactionBossModel {

        private static _instance: FactionBossModel;
        public static getInstance(): FactionBossModel {
            if (!this._instance) {
                this._instance = new FactionBossModel();
            }
            return this._instance;
        }

        public constructor() {
            this.isneedcountdown = false;
        }

        public isneedcountdown: boolean;

        /**
         * getList
         */
        public getList(): Array<FBossItemVo> {
            var $finalary: Array<FBossItemVo> = new Array;
            var tabary: Array<tb.TB_faction_boss> = tb.TB_faction_boss.get_TB_faction_boss();
            var isflag: boolean = false;
            for (var i = 0; i < tabary.length; i++) {
                var fBossItemVo: FBossItemVo = new FBossItemVo();
                fBossItemVo.state = 2
                fBossItemVo.state1 = 2
                // if ("当前挑战id == i") {
                if (GuidData.faction.getBosschallengeidCur() == tabary[i].id) {
                    if (this.comPareTime(GuidData.faction.getBosschallengeStartTime() + tabary[i].wait_time)) {
                        //等待时间
                        fBossItemVo.state = 3
                        fBossItemVo.time = this.getTime(GuidData.faction.getBosschallengeStartTime() + tabary[i].wait_time);
                    } else {
                        fBossItemVo.state = 1
                        fBossItemVo.time = this.getTime(GuidData.faction.getBosschallengeStartTime() + tabary[i].wait_time + tabary[i].time);
                    }
                    isflag = true;
                } else {
                    // if ("当前通关id >= i") {
                    if (GuidData.faction.getBosschallengeidMax() >= tabary[i].id) {
                        fBossItemVo.state1 = 1
                    } else if ((GuidData.faction.getBosschallengeidMax() + 1) == tabary[i].id && GuidData.faction.getLev() >= tabary[i].faction_lv_limit) {
                        fBossItemVo.state1 = 2
                    } else {
                        fBossItemVo.state1 = 3
                    }
                }

                fBossItemVo.data = tabary[i];
                fBossItemVo.data1 = tb.TB_creature_template.get_TB_creature_template(tabary[i].entry);

                $finalary.push(fBossItemVo);
            }
            //存在 正在挑战中的信息，置状态值
            this.isneedcountdown = isflag;
            return $finalary;
        }



        /**
         * 获取选中索引
         */
        public getIndex(): number {
            var listitem: Array<FBossItemVo> = this.getList();
            var idx: number = 0;
            for (var i = 0; i < listitem.length; i++) {
                if (listitem[i].state != 2) {
                    return i;
                } else if (listitem[i].state1 != 3) {
                    idx = i;
                }
            }
            return idx;
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


        public getRankList($bossid: number): Array<RankVo> {
            var testvoary: Array<RankVo> = new Array;
            var ary: Array<FactionBossRankData> = GuidData.faction.getRankList();
            for (var i = 0; i < ary.length; i++) {
                var vo: FactionItemData = this.getcurvo(ary[i].guid);
                if (vo) {
                    var a: RankVo = new RankVo();
                    a.rankid = i + 1;
                    a.name = vo.name
                    a.title = "头衔名字" + i
                    a.output = ary[i].output;
                    a.ratio = this.getTotaloutput(a.output, ary);
                    a.rewardary = this.getReward($bossid, a.rankid);
                    if (vo.guid == GuidData.player.getGuid()) {
                        a.isme = true;
                    }
                    testvoary.push(a);
                }
            }
            return testvoary;

        }

        private getTotaloutput($cur: number, $ary: Array<FactionBossRankData>): number {
            var totaloutput: number = 0;
            for (var i = 0; i < $ary.length; i++) {
                totaloutput += $ary[i].output;
            }
            var ratio: number = Math.floor($cur / totaloutput * 100);
            return ratio;
        }

        private getReward($bossid: number, $rankid: number): tb.TB_faction_boss_reward {
            var ary: Array<tb.TB_faction_boss_reward> = tb.TB_faction_boss_reward.get_TB_faction_boss_reward();
            var ary1: Array<tb.TB_faction_boss_reward> = new Array;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].monster_id == $bossid) {
                    ary1.push(ary[i]);
                }
            }

            for (var i = 0; i < ary1.length; i++) {
                if ($rankid >= ary1[i].rank[0] && $rankid <= ary1[i].rank[1]) {
                    return ary1[i];
                }
            }
            return null;
        }

        private getcurvo($guid: string): FactionItemData {
            var ary: Array<FactionItemData> = GuidData.faction.getFactionList();
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == $guid) {
                    return ary[i];
                }
            }
            return null;
        }

        public getBossStart($bossLev: number): number {
            // BOSS星级：（BOSS等级*0.1）-帮会等级=a；a≤0=1星；0<a≤0.2=2星；0.2<a≤0.5=3星；0.5<a≤0.7=4星；0.7<a=5星
            var a: number = ($bossLev * 0.1) - GuidData.faction.getLev();
            var startnum: number;
            if (a <= 0) {
                startnum = 1
            } else if (a <= 0.2) {
                startnum = 2
            } else if (a <= 0.5) {
                startnum = 3
            } else if (a <= 0.7) {
                startnum = 4
            } else {
                startnum = 5
            }
            return startnum;
        }
    }



    export class FBossItemVo {
        public data: tb.TB_faction_boss;
        public data1: tb.TB_creature_template;
        public state: number;//1：正在挑战  2：未挑战  3:倒计时
        public state1: number;//1：已通过 2：未通关 3未开放
        public time: Array<number>;
    }

    export class RankVo {
        public rankid: number;
        public name: string;
        public title: string;
        public output: number;
        public ratio: number;
        public rewardary: tb.TB_faction_boss_reward;
        public isme: boolean = false;
    }

}