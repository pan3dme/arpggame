class InstanceData extends GuidObject {

    public onBaseCreated(): void {

        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };
        // this.AddListen(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, ($binlog: any) => { this.instanceIntFieldTrialSweep() });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_ACTIVE, ($binlog: any) => { ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_CHANGE_EVENT)) });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_REWARD_EVENT))
        });

        this.AddListen(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.INSTANCE_INT_FIELD_3V3_TIMES));//跨服匹配
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.INSTANCE_INT_FIELD_3V3_DAY_REWARD));//跨服匹配
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_REWARD, ($binlog: any) => { this.FirstvictoryrewardChange() });

        this.AddListen(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_1V1_REFRESH));//1V1
        });
        // this.AddListen(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIGHT_CD, ($binlog: any) => {
        //     ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_1V1_REFRESH));//1V1
        // });
        //组队副本剩余挑战次数
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CHALLENGE_COUNT, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.CHG_TEAM_NUM));//1V1
        });

        this.AddListen(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA_PICKED, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_QUALIFY_REWARD_EVENT));
        });
        
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_QUALIFY_DAILY_TIMES, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_QUALIFY_NUM_EVENT));
        });
        this.AddListen(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.TOWER_FUBEN_SWEEP));            
        });
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }
    private dataUpdate($intMask: Object, $strMask: Object): void {
        for (var k in $intMask) {
            var $kNum: number = Number(k);
            if ($kNum >= SharedDef.INSTANCE_INT_FIELD_VIP_START && $kNum < SharedDef.INSTANCE_INT_FIELD_VIP_END) {
                ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.RES_FUBEN_REFRESH));
            } else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_RES_START && $kNum < SharedDef.INSTANCE_INT_FIELD_RES_END) {
                
                ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.RES_FUBEN_REFRESH));
            } else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_ACTIVE_START && $kNum < SharedDef.INSTANCE_INT_FIELD_ACTIVE_END) {
                var evt: activity.ActivityEvent = new activity.ActivityEvent(activity.ActivityEvent.ACTIVITY_ITEM_CHANGE_EVENT);
                evt.data = $kNum;
                ModuleEventManager.dispatchEvent(evt);
            } else if ($kNum >= SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_START && $kNum < SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_END) {
                //个人boss次数回复时间戳监听
                // ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.PBOSS_REDPOINT_CHG));
            }
        }
    }

    /** 已挑战次数 */
    public getHasChallengeNum(): number {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, 0);
    }
    /** 今日连胜记录 */
    public getwinningstreakrecord(): number {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_COMBATWIN, 0);
    }
    /** 首胜最高记录 */
    public getvictoryrecord(): number {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_MAX_RANK);
    }
    /** 已可购买挑战次数 */
    public getCanbuyChallengeNum(): number {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_TIMES, 1);
    }
    /** 斗剑台挑战CD时间戳 */
    public getDJcdtime(): number {

        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIGHT_CD);
    }

    /** 首胜奖励领取情况vo */
    public getFirstvictoryList(): Array<FirstvictoryVo> {
        var $aryflag: Array<FirstvictoryVo> = new Array
        for (var i: number = 0; i < 20; i++) {
            var vo: FirstvictoryVo = new FirstvictoryVo();
            //是否达到该名次
            var a: boolean = this.GetBit(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_GET, i + 1);
            if (a) {
                //达到
                //是否领取
                var b: boolean = this.GetBit(SharedDef.INSTANCE_INT_FIELD_DOUJIAN_FIRST_REWARD, i + 1);
                if (b) {
                    vo.state = 2
                } else {
                    vo.state = 0
                }
            } else {
                //未达到
                vo.state = 1
            }
            vo.data = tb.TB_doujiantai_first.get_TB_doujiantai_firstById(i + 1);
            $aryflag.push(vo);
        }

        $aryflag.sort(function (a: FirstvictoryVo, b: FirstvictoryVo): number {
            if (a.state == b.state) {
                return a.data.id - b.data.id;
            } else {
                return a.state - b.state;
            }
        });
        return $aryflag;
    }

    private FirstvictoryrewardChange(): void {
        ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.FIRSTREWARD_DJ_EVENT));
    }

    private instanceIntFieldTrialSweep(): void {
        ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.RES_FUBEN_REFRESH));
    }

    public getInstanceIntFieldVipSatrt(): Array<any> {
        var $arr: Array<any> = new Array()
        for (var i: number = SharedDef.INSTANCE_INT_FIELD_VIP_START; i < SharedDef.INSTANCE_INT_FIELD_VIP_END; i++)//FIXME
        {
            //vip副本开始	每个信息4个byte[0:预留, 1:预留, 2:挑战次数, 3:购买次数]
            var idx: number = i
            var passed: number = this.GetByte(idx, 1);
            var num: number = this.GetByte(idx, 2);
            var buys: number = this.GetByte(idx, 3);
            $arr.push({ num: num, passed: passed, buys: buys })

        }
        return $arr


    }
    public getInstanceIntFieldResSatrt(): Array<any> {
        var $arr: Array<any> = new Array()
        for (var i: number = SharedDef.INSTANCE_INT_FIELD_RES_START; i < SharedDef.INSTANCE_INT_FIELD_RES_END; i++)//FIXME
        {
            //vip副本开始	 每个信息4个byte[0:挑战次数,1:是否通关,2:预留,3:预留]
            var idx: number = i
            var num: number = this.GetByte(idx, 0);
            var passed: number = this.GetByte(idx, 1);
            $arr.push({ num: num, passed: passed })

        }
        console.log("===$arr==",$arr);
        return $arr


    }
    public getInstanceIntFieldTrialPassed(): any {
        //(0:今日可扫荡层数,1:历史通关层数)
        
        var sweepCurrent: number = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT, 0);
        var trialCurrent: number = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_PASSED_SHORT, 1);

        //var sweepCurrent: number = 1
        //var trialCurrent: number = 1
        return [sweepCurrent,trialCurrent];

        // console.log({ sweepCurrent: sweepCurrent, trialCurrent: trialCurrent })
        // return { sweepCurrent: sweepCurrent, trialCurrent: trialCurrent }
    }

    public getInstanceIntFieldXianfuDayTimes(): number {
        //仙府使用次数
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_XIANFU_DAY_TIMES)
    }






    public getInstanceIntFieldTrialSweep(): any {
        // (0:扫荡次数,1:可购买扫荡次数)
        var sweepNum: number = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, 0);
        var canBuyNum: number = this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_TRIAL_SWEEP_SHORT, 1);

        // var sweepNum: number = 1
        // var canBuyNum: number = 1


        //console.log({ sweepNum: sweepNum, canBuyNum: canBuyNum })
        //return { sweepNum: sweepNum, canBuyNum: canBuyNum }
        return [sweepNum,canBuyNum];
    }
    /**活动次数 */
    public getActivityNum($idx: number): number {
        return this.GetUInt32($idx);
    }
    /**通过ID活动次数 */
    public getActivityNumByID($id: number): number {
        var idx: number = $id - 1 + SharedDef.INSTANCE_INT_FIELD_ACTIVE_START;
        return this.GetUInt32(idx);
    }
    /**活跃度数值 */
    public getActivity(): number {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_ACTIVE);
    }
    //3v3参与次数
    public getInstanceIntField3V3Times0(): number {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, 0)
    }
    //3v3购买次数
    public getInstanceIntField3V3Times1(): number {
        return this.GetUInt16(SharedDef.INSTANCE_INT_FIELD_3V3_TIMES, 1)
    }


    //3v3每日奖励
    public getInstanceIntField3V3DayReward(): Array<number> {

        var $arr: Array<number> = new Array
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 0))
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 1))
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 2))
        $arr.push(this.GetByte(SharedDef.INSTANCE_INT_FIELD_3V3_DAY_REWARD, 3))
        console.log($arr)
        return $arr
    }

    /**活跃度奖励领取状态 */
    public getActivityRewardState(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i: number = 0; i < SharedDef.MAX_ACTIVE_COUNT; i++) {
            var idx: number = i * 2 + 2;
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, idx));
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_ACTIVE_REWARD, idx + 1));
        }
        return ary;
    }

    public get1v1Records(): Array<string> {


        var ret: Array<string> = new Array;

        var cursor: number = this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_DOUJIANTAI_CURSOR)

        var last: number = (cursor - 1) % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        var start: number = cursor % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;

        if (last < start) {
            last += SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
        }

        console.log(start, last);

        for (var i: number = start; i <= last; ++i) {
            var indx: number = i % SharedDef.MAX_DOUJIANTAI_RECORD_COUNT;
            var str: string = this.GetStr(SharedDef.INSTANCE_STR_FIELD_DOUJIANTAI_RECORD_START + indx);

            console.log(str);
            if (str) {
                ret.push(str)
            }
        }

        return ret;
    }


    /**
     * 当日组队副本挑战次数购买次数
     */
    public getBuyTeamCopyNum(): number {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_BUY_COUNT);
    }
    /**
     * 组队副本剩余挑战次数
     */
    public getTeamCopyNum(): number {
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_GROUP_INSTANCE_CHALLENGE_COUNT);
    }

    
    //排位赛胜利额外可领取奖励
    public getQualifyExtra(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i: number = 0; i < 3; i++) {
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA,i));
        }
        return ary;
    }
    //排位赛胜利额外已领取奖励
    public getQualifyExtraPicked(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i: number = 0; i < 3; i++) {
            ary.push(this.GetBit(SharedDef.INSTANCE_INT_FIELD_QUALIFY_EXTRA_PICKED,i));
        }
        return ary;
    }
    //排位赛每天次数
    public getQualifyDailyTimes():number{
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_DAILY_TIMES);
    }

    // 排位赛购买次数
    public getQualifyBuyTimes():number{
        return this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_BUY_TIMES);
    }

    //排位赛记录
    public getQualify1Log(): Array<string> {


        var ret: Array<string> = new Array;

        var cursor: number = this.GetUInt32(SharedDef.INSTANCE_INT_FIELD_QUALIFY_CURSOR)

        var last: number = (cursor - 1) % SharedDef.MAX_QUALIFY_RECORD_COUNT;
        var start: number = cursor % SharedDef.MAX_QUALIFY_RECORD_COUNT;

        if (last < start) {
            last += SharedDef.MAX_QUALIFY_RECORD_COUNT;
        }

        console.log(start, last);

        for (var i: number = start; i <= last; ++i) {
            var indx: number = i % SharedDef.MAX_QUALIFY_RECORD_COUNT;
            var str: string = this.GetStr(SharedDef.INSTANCE_STR_FIELD_QUALIFY_RECORD_START + indx);

            if (str) {
                ret.push(str)
            }
        }

        return ret;
    }

    /**
     * 个人boss次数回复时间戳
     */
    public getPersonbosstime():Array<number>{
        var aa:Array<number> = new Array;
        for (var i = SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_START; i < SharedDef.INSTANCE_INT_FIELD_PRIVATE_BOSS_RECOVER_TIME_END; i++) {
            aa.push(this.GetUInt32(i));
        }
        return aa;
    }




}  