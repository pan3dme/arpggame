module fb {
    export class FuBenResVo {
        public data: tb.TB_instance_res;
        public num: number;
        public maxtime: number;
        public vipAddTime: number;
        public passed: number
        public node: RedPointNode
    }

    export class FuBenModel {

        private static _instance: FuBenModel;
        public static getInstance(): FuBenModel {
            if (!this._instance) {
                this._instance = new FuBenModel();
            }
            return this._instance;
        }
        public constructor() {
            this.initData();
        }
        public getWorldBossReward(): any {
            var tabObj: any = TableData.getInstance().getData(TableData.tb_worldboss_base, 1);
            var obj: any = new Object;
            obj.name = "可能获得";
            obj.notarget = true;
            obj.morereward = true;

            var ary: any = new Array;
            for (var i: number = 0; i < tabObj.items.length; i++) {
                ary.push([tabObj.items[i], 1]);
            }
            obj.reward = ary;

            return obj;
        }
        public getTowerReawrd(): any {
            var floodID: number = GuidData.map.getTialID();
            var tabObj: any = TableData.getInstance().getData(TableData.tb_instance_trial, floodID);
            var obj: any = new Object;
            obj.name = "首通奖励";
            obj.reward = tabObj.firstReward;
            obj.lev = floodID;
            return obj;
        }
        public getResFubenRewad(): any {
            var floodID: number = GuidData.map.getResMapID();
            var tabObj: any = TableData.getInstance().getData(TableData.tb_instance_res, floodID);
            var obj: any = new Object;
            obj.name = "基础奖励";
            obj.reward = tabObj.basereward;
            return obj;
        }
        public getPersonBossRewad(): any {
            var floodID: number = GuidData.map.getPersonBossMapID();
            var tabObj: tb.Tb_private_boss_info = tb.Tb_private_boss_info.get_Tb_private_boss_infoById(floodID);
            // var tabObj: any = TableData.getInstance().getData(TableData.tb_private_boss_info, floodID);
            var obj: any = new Object;
            obj.name = "参与可能获得以下奖励";
            var aaa:Array<Array<number>> = new Array
            for (var i = 0; i < tabObj.show.length; i++) {
                aaa.push([tabObj.show[i],0]);
            }
            obj.reward = aaa;
            return obj;
        }
        public getFactionLeadRewad(): any {
            var floodID: number = GuidData.map.getReserve2();
            var tabObj: any = TableData.getInstance().getData(TableData.tb_faction_bossdefense_pool, floodID)
            var obj: any = new Object;
            obj.name = "首通奖励";
            obj.reward = tabObj.reward_preview;
            obj.lev = floodID;
            return obj;
        }
        public getFactionTripReward(): any {
            var floodID: number = GuidData.map.getFloorNum();
            var tabObj: any = TableData.getInstance().getData(TableData.tb_faction_tower_floor, floodID);
            var obj: any = new Object;
            obj.name = "参与可能获得以下奖励";
            obj.reward = tabObj.firstpass_reward;
            obj.lev = floodID;
            return obj;
        }
        public getTbGroupReward(): any {
            var $hardId: number = GuidData.map.getKuafuGropuInstanceFieldsHard();
            var $groupTb: tb.TB_group_instance_base = tb.TB_group_instance_base.getTempVo($hardId)
            var $rewardid: Array<number>
            var $rewardnum: Array<number>
            var title: string;
            if (GuidData.player.isPlayerIntFieldGroupClearFlag($hardId)) {
                //console.log("普通通关");
                title = "通关奖励";
                $rewardid = $groupTb.passRewardId
                $rewardnum = $groupTb.passRewardCnt
            } else {
                //console.log("首次通关");
                title = "首通奖励";
                $rewardid = $groupTb.fpRewardId
                $rewardnum = $groupTb.fpRewardCnt
            }
            var $barr: Array<Array<number>> = new Array
            for (var i: number = 0; i < $rewardid.length; i++) {
                var $tempArr: Array<number> = new Array()
                $tempArr.push($rewardid[i]);
                $tempArr.push($rewardnum[i]);
                $barr.push($tempArr);
            }
            var obj: any = new Object;
            obj.name = title;
            obj.reward = $barr;
            return obj;
        }


        public vipItem: Array<tb.TB_map_vip>
        public trialItem: Array<tb.TB_map_trial>
        public sweepLastTime: number;
        public trialCurrent: number;  //历史通关层数;
        public sweepCurrent: number;//今日可扫荡层数;
        public sweepNum: number;  // 扫荡次数;
        public canBuyNum: number;//可购买扫荡次数;
        private initData(): void {
            this.sweepLastTime = 0;
            this.vipItem = tb.TB_map_vip.getTabelItem();
            this.trialItem = tb.TB_map_trial.getTabelItem();


        }

        public refresh(): void {

            this.getVipData();
            this.getTrialData();

        }

        private getTrialData(): void {
            var A: any = GuidData.instanceData.getInstanceIntFieldTrialPassed();
            this.sweepCurrent = A[0];
            this.trialCurrent = A[1];

            //   this.sweepCurrent=2  
            var B: any = GuidData.instanceData.getInstanceIntFieldTrialSweep();
            this.sweepNum = B[0];
            this.canBuyNum = B[1];

            //    console.log("今天可扫荡层次----", this.sweepCurrent);
            //    console.log("可扫荡----", this.sweepNum);
            //    console.log("可购买----", this.canBuyNum);

        }
        private getVipData(): void {
            var $list: Array<any> = GuidData.instanceData.getInstanceIntFieldVipSatrt();

            var selfForce: number = GuidData.player.getForce()
            for (var i: number = 0; i < this.vipItem.length; i++) {
                var $vo: tb.TB_map_vip = this.vipItem[i]
                $vo.canPlayModel = 0 //可以达到的难度
                for (var j: number = 0; j < $vo.forces.length; j++) {
                    if (selfForce >= $vo.forces[j]) {
                        $vo.canPlayModel = j;
                    }
                }
                $vo.num = $list[i].num;  //已挑战次数;
                $vo.buynum = $list[i].buys; //已购买次数;
                $vo.passed = $list[i].passed; //已通过的难度

            }
        }

        private fubenResItem: Array<FuBenResVo>
        public getFubenResItem(): Array<FuBenResVo> {
            if (!this.fubenResItem) {
                this.fubenResItem = new Array();
                var $arr: Array<tb.TB_instance_res> = tb.TB_instance_res.getTabelItem();
                for (var i: number = 0; i < $arr.length; i++) {
                    var $vo: FuBenResVo = new FuBenResVo();
                    $vo.data = $arr[i];
                    this.fubenResItem.push($vo);
                }
            }
            this.getResData()

            this.fubenResItem.sort(function (a: fb.FuBenResVo, b: fb.FuBenResVo): number {
                return a.data.type - b.data.type;
            })
            return this.fubenResItem
        }
        private getResData(): void {
            var $tb_vip_base: tb.TB_vip_base;
            if (GuidData.player.getVipLevel() > 0) {
                $tb_vip_base = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel())
            }
            var kk: Array<any> = GuidData.instanceData.getInstanceIntFieldResSatrt();
            for (var i: number = 0; i < this.fubenResItem.length; i++) {
                var $vo: FuBenResVo = this.fubenResItem[i]
                if (kk[i]) {
                    this.fubenResItem[i].num = kk[this.fubenResItem[i].data.id - 1].num;
                    this.fubenResItem[i].passed = kk[this.fubenResItem[i].data.id - 1].passed;
                }
                if ($tb_vip_base) {
                    this.fubenResItem[i].vipAddTime = 1;
                } else {
                    this.fubenResItem[i].vipAddTime = 0
                }
                $vo.maxtime = $vo.data.times;

            }
        }


    }

}