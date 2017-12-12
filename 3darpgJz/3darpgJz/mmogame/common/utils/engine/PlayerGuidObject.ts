class SystemOpenData {

    public systemId: number;
    public data: Array<number>;
    public needShowIcon: boolean
}

class factionShopNumData {
    public id: number;
    public num: number;

}
// "id": id, "lev": lev, "slot": slot
class SkillUintVo {
    public id: number
    public lev: number
    public slot: number
}

class PlayerGuidObject extends GuidObject {


    public onBaseCreated(): void {
        GuidData.player = this;
        //this.initPreSkill();
        this.loginTime();
        this.initData();
        this.AddListen(SharedDef.PLAYER_EXPAND_INT_TO_MAP, ($binlog: any) => { this.teleMap() });
        this.AddListen(SharedDef.PLAYER_FIELD_LEVEL, ($binlog: any) => { this.playerFieldLevelChange() });

        this.AddListen(SharedDef.PLAYER_FIELD_FORCE, ($binlog: any) => { this.playerFieldForceChange() });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_MERIDIAN_FORCE, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.CHG_MERIDIAL_FORCE));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_VIP_LEVEL, ($binlog: any) => { this.playerFieldVipChange() });






        this.AddListen(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD, ($binlog: any) => { this.playIntFieldRestorePotioncd() });

        this.AddListen(SharedDef.PLAYER_EXPAND_INT_XP, ($binlog: any) => { this.playerFieldExpandIntXpChange() });

        this.AddListen(SharedDef.PLAYER_INT_FIELD_DIVINE_ID, ($binlog: any) => { this.playerFieldDivineIdChange() });


        this.AddListen(SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS, ($binlog: any) => { this.playerIntFieldTrialProcess() });

        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPMENT + SharedDef.EQUIPMENT_TYPE_COAT, ($binlog: any) => { this.chgAvatar() });

        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPMENT + SharedDef.EQUIPMENT_TYPE_MAIN_WEAPON, ($binlog: any) => { this.chgWeapon() });



        this.AddListen(SharedDef.PLAYER_FIELD_EQUIPMENT + SharedDef.EQUIPMENT_TYPE_MAIN_WEAPON, ($binlog: any) => { this.chgWeapon() });
        //复仇次数改变
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REVENGE_TIMES, ($binlog: any) => { this.chgRevengeNum() });



        this.AddListen(SharedDef.PLAYER_INT_FIELD_TITLE_FORCE, ($binlog: any) => { this.titleforceChg() });
        //角色名字变化
        this.AddListenString(SharedDef.BINLOG_STRING_FIELD_NAME, ($binlog: any) => { this.Chgname() });
        //法宝总战力
        this.AddListen(SharedDef.PLAYER_INT_FIELD_TALISMAN_FORCE, ($binlog: any) => { this.talismantotalzhanli() });
        //组队副本首胜flag
        this.AddListen(SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG, ($binlog: any) => { this.teamflagchange() });
        //摇钱树礼包领取状态
        this.AddListen(SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_GIFT_FLAG, ($binlog: any) => { this.moneyTreeChg() });
        //排行榜点赞状态变化
        this.AddListen(SharedDef.PLAYER_FIELD_USE_RANK_LIKE, ($binlog: any) => { this.rankLikeChg() });

        this.AddListen(SharedDef.PLAYER_APPD_INT_FIELD_RECHARGE_SUM, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.VIP_CHG_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_INT_FIELD_VIPGIFT_FLAG, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.VIP_GIFT_EVENT));
        });
        this.AddListen(SharedDef.PLAYER_FIELD_MOUNT_FORCE, ($binlog: any) => {
            ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.CHG_MOUNT_FORCE));
        });

        this.AddListen(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_LAST, ($binlog: BinLogStru) => {
            console.log("上次完成的引导")

        })
        this.AddListen(SharedDef.PLAYER_INT_FIELD_APPEARANCE, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new exterior.ExteriorEvent(exterior.ExteriorEvent.REFRISH_EXTERIOR_PANEL));

        })


        this.AddListen(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_NOW, ($binlog: BinLogStru) => {
            console.log("当前进行中的引导")
            this.changePlayerIntFieldGuid()
        })
        this.AddListen(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_TIMES, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new sboss.SbossEvent(sboss.SbossEvent.REFRISH_SBOSS_PANEL));
        })



        this.AddListen(SharedDef.PLAYER_FIELD_NOTORIETY, ($binlog: BinLogStru) => {
            this.changeUnitFieldNotoriety();
        })
        this.AddListen(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, ($binlog: BinLogStru) => {
            this.changeHuanhuaMountLevel();
        })
        this.AddListen(SharedDef.PLAYER_FIELD_BYTES_2, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.CHANGE_MY_Designation_EVENT));
        })
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_LEVEL, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_LEV_PANEL));
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.POP_SHOW_PANEL));
        })
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_EXP, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_EXP_PANEL));
        })
        this.AddListen(SharedDef.PLAYER_INT_FIELD_REALMBREAK_DAILYQUEST_STATE, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.REFRESH_TASK_PANEL));
        })
        this.AddListen(SharedDef.PLAYER_INT_FILED_FACTION_DONATE_GIFT_EXCHANGE_DAILY_COUNT, ($binlog: BinLogStru) => {


            ModuleEventManager.dispatchEvent(new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.TREASURE_NUM_REFRESH));
        })

        this.AddListen(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG, ($binlog: BinLogStru) => {
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT));
        })
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }
    private playIntFieldRestorePotioncd(): void {

        var $cdnum: number = this.GetUInt32(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD)
        $cdnum = $cdnum - GameInstance.getServerNow()
        $cdnum = $cdnum * 1000
        console.log("吃药CD变化", $cdnum)



        tb.SkillData.setCdMeshData(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD, $cdnum)
    }

    public getPlayerIntFieldAppearance(value: number): number //0为衣服1为装备
    {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_APPEARANCE, value)
    }
    private playerIntFieldTrialProcess(): void {
        ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
    }
    public getPlayerIntFieldTrialProcessCur(): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS, 0)
    }
    public getPlayerIntFieldTrialProcessTotal(): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_TRIAL_PROCESS, 1)
    }

    public getPlayerIntFieldTrialFinishedSectionid(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_TRIAL_FINISHED_SECTIONID);

    }
    public getPlayerIntFieldMassBossBuyedTimes(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_BUYED_TIMES);
    }
    public getPlayerIntFieldMassBossTimes(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_TIMES);
    }
    public getPlayerIntFieldMassBossCd(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MASS_BOSS_CD);

    }
    public getPlayerIntFiledLevaeRiskTime(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FILED_LEAVE_RISK_TIME);
    }
    public getPlaerExpAndIntLastLogoutTime(): number {
        return this.GetUInt32(SharedDef.PLAYER_EXPAND_INT_LAST_LOGOUT_TIME);
    }


    public getPlayerIntFiledLeaveRiskPicked(): number {
        return 0
    }

    public getPlayerIntFiledFactionDonateGiftExchangeDailyCount(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FILED_FACTION_DONATE_GIFT_EXCHANGE_DAILY_COUNT);
    }



    private changePlayerIntFieldGuid(): void {
        ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_GUIDE_POP_VIEW));
    }
    public getPlayerIntFieldGuidIdLast(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_LAST);
    }




    public getPlayerIntFieldGuideIdNow(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_GUIDE_ID_NOW);
    }
    public get needGuididPop(): boolean {
        //   console.log("当前进度",this.getPlayerIntFieldGuidIdLast() ,this.getPlayerIntFieldGuideIdNow())
        return this.getPlayerIntFieldGuidIdLast() != this.getPlayerIntFieldGuideIdNow();
    }

    public nextCanJumpTM: number = 0;//下次可跳的时间
    public jumpButcanClik(): boolean {
        return GuidData.player.nextCanJumpTM < TimeUtil.getTimer();
    }

    private initData(): void {
        this.lastForceNum = this.getForce()
        this.resetSystemItem();
        this.resetSkillItem();
        this.resetOptionalGuidItem();
    }
    public resetSkillItem(): void {
        this.skillItem = this.getBaseSkillItem();
    }
    public getPlayerIntFieldDailyQuestFinished(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DAILY_QUEST_FINISHED)
    }

    /**
     * 个人帮派归属情况发生变化时，派发事件
     */
    public getFactionstate(): void {
        console.log("帮派：" + this.getFactionName())

    }


    /**
     * 获取复仇次数
     */
    public getSocial_revenge_num(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REVENGE_TIMES);
    }

    /**
     * 好友数量上线值
     */
    public getSocial_friend_max_num(): number {
        return SharedDef.SOCIAL_FRIEND_MAX_NUM;
    }

    //跨服3v3积分
    public getPlayerIntFieldWorld3V3Score1(): number {

        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_3V3_SCORE)
    }
    //跨服3v3总积分
    public getPlayerIntFieldWorld3V3TotalScore1(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_3V3_TOTAL_SCORE)
    }



    //胜负走
    public getPlayerIntFieldWorld3V3TrendInfo(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_3V3_TREND_INFO)
    }


    public getUnitfieldhook_num(): number {

        return this.GetUInt16(SharedDef.PLAYER_FIELD_HOOK_SHORT, 0)
    }

    public isPlayerIntFieldGroupClearFlag(idx: number): boolean {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG, idx)
    }




    public getPlayerFieldDeclineChanel(): Array<number> {


        var $arr: Array<number> = new Array<number>();
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE0, 3));

        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_DECLINE_CHANNEL_BYTE1, 0));

        return $arr;
    }



    public getUnitfieldhook_id(): number {

        return this.GetUInt16(SharedDef.PLAYER_FIELD_HOOK_SHORT, 1)
    }

    public getHangUpResurrection(): number {
        return this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 0);
    }

    public getHangupdata(): Array<number> {
        var $arr: Array<number> = new Array<number>();
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE0, 3));

        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE1, 3));

        // $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 0));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 1));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 2));
        $arr.push(this.GetUInt8(SharedDef.PLAYER_FIELD_HOOK_BYTE3, 3));

        return $arr;
    }

    private changeHuanhuaMountLevel(): void {
        var aa: number = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 2);
        var bb: number = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 3);
        console.log("========监听到幻化坐骑位置======>", aa, bb);
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.POP_THE_UNREAL_PANEL));
    }
    public getMountHuanhua(): number {
        var aa: number = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 2);
        var bb: number = this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 3);
        console.log("========当前幻化坐骑位置======>", aa, bb);
        return bb;
    }

    private playerFieldExpandIntXpChange(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_EXPAND_INT_XP));
        // console.log("经验改变&^^^^^^^^^^^^^^^^^^^^^^^^^")
    }
    private playerFieldDivineIdChange(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_DIVINE));
        console.log("神兵改变&^^^^^^^^^^^^^^^^^^^^^^^^^")
        this.resetSkillItem();

    }
    private playerFieldForceChange(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE));
    }
    private playerFieldVipChange(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL));
        ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.VIP_CHG_EVENT));
        console.log("vip等级变化")
    }

    private changeUnitFieldNotoriety(): void {
        //  var aa: number = this.GetUInt16(SharedDef.PLAYER_FIELD_NOTORIETY, 0);
        console.log("========战斗模式换======>");
        ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.UNIT_FIELD_NOTORIETY));


    }
    public getPlayerIntFieldDivineId(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DIVINE_ID)
    }
    public getUnitFieldNotoriety(): number {

        return this.GetUInt16(SharedDef.PLAYER_FIELD_NOTORIETY, 0)
    }
    public getUnitFieldNotorietyValue(): number {

        return this.GetUInt16(SharedDef.PLAYER_FIELD_NOTORIETY, 1)

    }
    private lastLevel: number = 1
    private playerFieldLevelChange(): void {
        var curlev: number = this.getLevel();
        if (curlev != this.lastLevel) {
            this.lastLevel = curlev //这里有问题，升级后会接收到两次变化
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL));
            ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
        }

    }
    //真气数量变化
    private money_type_qi_change(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_QI));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    }
    //身上的银子数量变化
    private money_type_silver_change(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_SILVER));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    }
    //兽灵数量有变化
    private money_type_beast(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_BEAST));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    }
    //元宝数量有变化
    private gemgoldChange(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    }
    //帮贡变化
    private factionChange(): void {
        //console.log("帮贡:" + this.getFactionBG());
        ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.REFRESHFACTIONGX_EVENT));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
    }

    private gemChange(): void {
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_TYPE_GEM));
        // ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.REFRISH_RES_DATA));
        //console.log("宝石精华：" + this.getGem())
    }

    private dataUpdate($intMask: Object, $strMask: Object): void {
        /** 技能变化回调*/
        var $skillChange: boolean = false;
        var $moneyChange: boolean = false;
        for (var k in $intMask) {
            var kNum: number = Number(k);

            if (kNum >= SharedDef.PLAYER_INT_FIELD_SPELL_START && kNum < SharedDef.PLAYER_INT_FIELD_SPELL_END) {
                $skillChange = true
            } else if (kNum >= SharedDef.PLAYER_STRING_FIELD_BLOCK_START && kNum < SharedDef.PLAYER_STRING_FIELD_BLOCK_END) {
                this.playerChatBlockChange(kNum);
            } else if (kNum >= SharedDef.PLAYER_FIELD_SHOP_LIMIT_START && kNum < SharedDef.PLAYER_FIELD_SHOP_LIMIT_END) {
                var tid: number = this.GetUInt16(kNum, 0);
                var num: number = this.GetUInt16(kNum, 1);
                ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.STORE_NUM_EVENT));
            } else if (kNum >= SharedDef.PLAYER_FIELD_MAX_HEALTH && kNum < SharedDef.PLAYER_FIELD_CONTROL_RESIST_RATE) {


            } else if (kNum >= SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_START && kNum < SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_END) {
                //登入大礼领取情况变化
                ModuleEventManager.dispatchEvent(new logingift.LogingiftEvent(logingift.LogingiftEvent.REFRESH_Logingift_EVENT));

            } else if (kNum >= SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP && kNum < SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP_END) {
                //家族商店已购物品个数变化
                this._factionShopNumList = this.refreshFactionShopNumList();
                ModuleEventManager.dispatchEvent(new store.StoreEvent(store.StoreEvent.STORE_NUM_EVENT));
            } else if (kNum >= SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START && kNum < SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END) {
                this.resetOptionalGuidItem()
                console.log("非强制引导有变化")
            } else if (kNum >= SharedDef.PLAYER_INT_FILED_FACTION_GIFT_START && kNum < SharedDef.PLAYER_INT_FILED_FACTION_GIFT_END) {
                //帮众自己送礼物历史记录
                var changid = (kNum - SharedDef.PLAYER_INT_FILED_FACTION_GIFT_START) % SharedDef.MAX_FACTION_DATA_INT_GIFT;
                if (changid == SharedDef.FACTION_DATA_INT_GIFT_COUNT_ID && this.GetUInt32(kNum - 2) == 0) {
                    //新增数据
                    return;
                }
                if (changid == SharedDef.FACTION_DATA_INT_GIFT_FLAG_THANK) {
                    //数据变化。
                }

            } else if (kNum >= SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_START && kNum < SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_END) {
                ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT));
            } else if (kNum >= SharedDef.PLAYER_EXPAND_INT_MONEY && kNum < SharedDef.PLAYER_EXPAND_INT_MONEY_END) {
                $moneyChange = true;
            } else if (kNum >= SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START && kNum < SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END) {
                //系统开启有变化
                ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT));
            }

            //  for (var i: number = SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START; i < SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END; i += 2) {

        }

        //被动技能变化
        var $passiveChangeBoole: boolean = false
        for (var i: number = SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START; i < SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_END; i++) {
            if ($intMask[i]) {
                $passiveChangeBoole = true;
                if (this._passiveskillLevDic) {
                    var id: number = this.GetUInt16(i, SharedDef.SHORT_SPELL_ID);
                    if (id == 0) {
                        break;
                    }
                    var lev: number = this.GetUInt16(i, SharedDef.SHORT_SPELL_LV);
                    this._passiveskillLevDic[id] = lev;
                }

            }
        }
        if ($passiveChangeBoole) {
            ModuleEventManager.dispatchEvent(new divinesword.DivineswordEvent(divinesword.DivineswordEvent.REFRESH_SKILL_PANEL));
        }

        for (var k in $strMask) {
            var kNum1: number = Number(k);
            // if (kNum1 >= SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_START && kNum1 < SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_END) {
            //     //修炼场战斗记录变化
            //     ModuleEventManager.dispatchEvent(new training.TrainingEvent(training.TrainingEvent.RECORD_Training_EVENT));
            // }
        }

        if ($skillChange) {
            this.sendChangeSkillEvent();
        }
        if ($moneyChange) {
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.MONEY_CHANGE));
        }
    }
    private sendChangeSkillEvent(): void {
        console.log("技能更新 -----");
        var $hasEvet: boolean = false
        var $arr: Array<SkillUintVo> = this.getBaseSkillItem();
        for (var i: number = 0; i < $arr.length; i++) {
            var $has: boolean = false;
            for (var j: number = 0; j < this.skillItem.length; j++) {
                if ($arr[i].slot == this.skillItem[j].slot) {
                    $has = true
                }
            }
            if (!$has) {
                console.log("新插口开启", $arr[i].slot);
                if ($arr[i].slot >= 2 && $arr[i].slot <= 4) {
                    var evt: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.OPEN_SKILL_SLOT);
                    evt.data = $arr[i]
                    ModuleEventManager.dispatchEvent(evt);
                } else {
                    this.resetSkillItem();
                    ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.RESET_SKILL_ICON));
                }
                $hasEvet = true
            }

        }
        if (!$hasEvet) {
            //只是技能数据更新，而不是插孔变化。刷新技能数据
            this.resetSkillItem();
        }



    }

    public getsyspageopen($sysId: number, $page: number): boolean { //2051
        for (var i: number = SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START; i < SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END; i += SharedDef.MAX_OPEN_MENU_ATTR_COUNT) {
            var systemId: number = this.GetUInt32(i + SharedDef.OPEN_MENU_MAIN_ID);
            var flag: number = this.GetUInt32(i + SharedDef.OPEN_MENU_SUB_FLAG);
            if (systemId == $sysId) {
                // 全部解锁
                if (flag & 1) {
                    //   console.log("全部解锁");
                    return true

                } else {
                    // 部分解锁
                    var off: number = 1;
                    for (var j: number = 1; j < 10; j++) {
                        off <<= 1;
                        if (flag & off) {
                            if ($page == j) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    public systemOpenItem: Array<SystemOpenData>
    public resetSystemItem(): Array<SystemOpenData> {
        console.log("开启系统刷新getTimer()", TimeUtil.getTimer())
        this.systemOpenItem = new Array
        //var $k: number = SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START + SharedDef.MAX_OPEN_MENU_ATTR_COUNT * SharedDef.MAX_PLAYER_OPEN_MENU_COUNT
        for (var i: number = SharedDef.PLAYER_INT_FIELD_OPEN_MENU_START; i < SharedDef.PLAYER_INT_FIELD_OPEN_MENU_END; i += SharedDef.MAX_OPEN_MENU_ATTR_COUNT) {
            var systemId: number = this.GetUInt32(i + SharedDef.OPEN_MENU_MAIN_ID);
            var flag: number = this.GetUInt32(i + SharedDef.OPEN_MENU_SUB_FLAG);
            if (systemId > 0) {
                var $systemOpenData: SystemOpenData = new SystemOpenData();
                $systemOpenData.systemId = systemId;
                $systemOpenData.data = new Array;
                this.systemOpenItem.push($systemOpenData);

                console.log("---------------------系统===============", systemId);
                if (systemId == 502) {
                    console.log("---------------------家族");
                }
                // 全部解锁
                if (flag & 1) {
                    //   console.log("全部解锁");
                    $systemOpenData.needShowIcon = true

                } else {
                    // 部分解锁
                    var off: number = 1;
                    for (var j: number = 1; j < 10; j++) {
                        off <<= 1;
                        if (flag & off) {
                            $systemOpenData.data.push(j)
                            //  console.log("j", j);
                            if (tb.TB_system_base.getTempVo(systemId * 10 + j).show) {
                                $systemOpenData.needShowIcon = true;
                                console.log("显示图标=>", systemId);
                            }

                        }
                    }
                }
            }
        }
        return this.systemOpenItem;
    }
    public optionalGuidItem: Array<Vector2D>;
    public resetOptionalGuidItem(): Array<Vector2D> {
        this.optionalGuidItem = new Array
        for (var i: number = SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_START; i < SharedDef.PLAYER_INT_FIELD_OPTIONAL_GUIDE_END; i += 2) {
            var $optionalId: number = this.GetUInt32(i + 0);
            var $flag: number = this.GetUInt32(i + 1);
            if ($optionalId > 0) {
                console.log("$optionalId", $optionalId, $flag)
                this.optionalGuidItem.push(new Vector2D($optionalId, $flag));
            }
        }
        return this.optionalGuidItem;
    }

    /**系统是否开启显示开启效果 */
    public isOpenSystemNeedShow($id: number): boolean {

        for (var i: number = 0; i < this.systemOpenItem.length; i++) {
            if (this.systemOpenItem[i].systemId == $id) {
                return this.systemOpenItem[i].needShowIcon
            }
        }
        return false
    }
    /**系统是否开启 */
    public isOpenSystemById($id: number): boolean {
        for (var i: number = 0; i < this.systemOpenItem.length; i++) {
            if (this.systemOpenItem[i].systemId == $id) {
                return this.systemOpenItem[i].needShowIcon;
            }
        }
        return false;
    }

    /**限购商品购买次数 */
    public getLimShopNum(id: number): number {
        for (var i: number = SharedDef.PLAYER_FIELD_SHOP_LIMIT_START; i < SharedDef.PLAYER_FIELD_SHOP_LIMIT_END; i++) {

            var tid: number = this.GetUInt16(i, 0);
            if (tid == id) {
                return this.GetUInt16(i, 1)
            }

        }
        return 0;
    }

    /**家族商店购买物品个数 */
    private _factionShopNumList: Array<factionShopNumData>
    public getFactionShopNumList(): Array<factionShopNumData> {
        if (this._factionShopNumList) {
            return this._factionShopNumList;
        }

        this._factionShopNumList = this.refreshFactionShopNumList();
        console.log("---家族商店购买物品个数---", this._factionShopNumList);
        return this._factionShopNumList;
    }

    private refreshFactionShopNumList(): Array<factionShopNumData> {
        var aa: Array<factionShopNumData> = new Array<factionShopNumData>();
        for (var i: number = SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP; i < SharedDef.PLAYER_INT_FIELD_BUYED_FACTION_SHOP_END; i++) {
            var dat: factionShopNumData = this.getShopData(i);
            if (dat) {
                aa.push(dat);
            }
        }
        console.log("---880aa---", aa);
        return aa;
    }

    private getShopData(idx: number): factionShopNumData {
        var data: factionShopNumData = new factionShopNumData;
        var id: number = this.GetUInt16(idx, 0);
        data.id = id;
        data.num = this.GetUInt16(idx, 1);
        // if (id == 0) {

        // } else {
        //     data.num = this.GetUInt16(idx, 1);
        // }
        return data;
    }

    private playerChatBlockChange($id: number): void {
        ModuleEventManager.dispatchEvent(new shieldui.ShieldUiEvent(shieldui.ShieldUiEvent.PLAYER_STRING_FIELD_BLOCK));
    }
    public getPlayChatBlock(): Array<string> {
        var $arr: Array<string> = new Array
        for (var i: number = SharedDef.PLAYER_STRING_FIELD_BLOCK_START; i < SharedDef.PLAYER_STRING_FIELD_BLOCK_END; i++) {
            var $str: string = this.GetStr(i)
            $arr.push($str)
        }
        return $arr;
    }
    public teleMap(): void {
        var $mpaId: number = this.GetUInt32(SharedDef.PLAYER_EXPAND_INT_TO_MAP);
        if ($mpaId) {
            var $vo: tb.TB_map = tb.TB_map.getTB_map($mpaId)
            GameInstance.mapName = $vo.mapres
        }

    }
    public loginTime(): void {
        GameInstance.skillCdItem = new Array();
        var lt: number = this.GetUInt32(SharedDef.PLAYER_EXPAND_INT_LAST_LOGIN_TIME);
        for (var i: number = SharedDef.PLAYER_INT_FIELD_IMPORTANT_SPELL_CD_START; i < SharedDef.PLAYER_INT_FIELD_IMPORTANT_SPELL_CD_END; i += SharedDef.MAX_IMPORTANT_SPELL_ATTR_COUNT) {
            var $id: number = this.GetUInt32(i);
            var $cd: number = this.GetUInt32(i + 1) - lt;

            //console.log("{ id: $id, cd: $cd }");
            //console.log({ id: $id, cd: $cd })
            GameInstance.skillCdItem.push({ id: $id, cd: $cd });

        }
    }
    public lastForceNum: number
    /**战斗力 */
    public getForce(): number {
        return this.GetDouble(SharedDef.PLAYER_FIELD_FORCE);
    }
    public getPlayerIntFieldMeridianForce(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_MERIDIAN_FORCE);
    }

    public get1v1Rank(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DOUJIANTAI_RANK);
    }

    /**vip等级 */
    public getVipLevel(): number {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_VIP_LEVEL);
    }
    /**是否为VIP */
    public getIsVIP(): boolean {
        return this.getVipLevel() > 0;
    }
    /**是否已购买VIP礼包*/
    public getVIPBuyGift(vip: number): boolean {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_VIPGIFT_FLAG, vip);
    }
    /**帮派名称 */
    public getFactionName(): string {
        return this.GetStr(SharedDef.PLAYER_STRING_FIELD_FACTION_NAME);
    }
    /**帮派ID */
    public getFactionID(): string {
        return this.GetStr(SharedDef.PLAYER_STRING_FIELD_FACTION_GUID);
    }
    /**累积充值 */
    public getChongZhiSum(): number {
        return this.GetUInt32(SharedDef.PLAYER_APPD_INT_FIELD_RECHARGE_SUM);
    }
    /**已装备称号ID */
    public getTitleID(): number {
        return this.GetByte(SharedDef.PLAYER_FIELD_BYTES_2, 3);
    }
    public chgAvatar(): void {
        var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.EQUVIEW_CHANGE_EVENT);
        evt.showType = 0;
        ModuleEventManager.dispatchEvent(evt);
    }
    public chgWeapon(): void {
        var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.EQUVIEW_CHANGE_EVENT);
        evt.showType = 1;
        ModuleEventManager.dispatchEvent(evt);
    }
    //获取批数据中技能列表
    public skillItem: Array<SkillUintVo>
    private getBaseSkillItem(): Array<SkillUintVo> {
        var $arr: Array<SkillUintVo> = new Array;
        var num: number = (SharedDef.PLAYER_INT_FIELD_SPELL_END - SharedDef.PLAYER_INT_FIELD_SPELL_START);
        for (var i: number = 0; i < num; i++) {
            var $vo: SkillUintVo = this.getSkill(i)
            if ($vo) {
                //console.log($vo)
                $arr.push($vo)
            }
        }
        return $arr
    }
    private getSkill($i: number): SkillUintVo {
        var idx: number = SharedDef.PLAYER_INT_FIELD_SPELL_START + $i;
        var id: number = this.GetUInt16(idx, 0);
        //    console.log("get skill index = ", idx, " id = ", id)
        if (id == 0) {
            return null;
        }
        var $vo: SkillUintVo = new SkillUintVo()
        $vo.id = this.GetUInt16(idx, 0)
        $vo.lev = this.GetUInt8(idx, 2);
        $vo.slot = this.GetUInt8(idx, 3);
        return $vo;
    }

    //获取被动技能数据
    public getPlayerIntFieldPassiveSpell(): Array<SkillUintVo> {
        var item: Array<SkillUintVo> = new Array
        for (var i: number = SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START; i < this._uint32_values_len; i++) {
            var id: number = this.GetUInt16(i, SharedDef.SHORT_SPELL_ID);
            if (id == 0) {
                break;
            }
            var $vo: SkillUintVo = new SkillUintVo();
            $vo.id = id
            $vo.lev = this.GetUInt16(i, SharedDef.SHORT_SPELL_LV)
            item.push($vo);
        }
        return item
    }

    //被动技能字典
    private _passiveskillLevDic: Object;
    public getPassiveSkillLev($id: number): number {
        if (!this._passiveskillLevDic) {
            this._passiveskillLevDic = new Object;

            for (var i: number = SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_START; i < SharedDef.PLAYER_INT_FIELD_PASSIVE_SPELL_END; i++) {
                var id: number = this.GetUInt16(i, SharedDef.SHORT_SPELL_ID);
                if (id == 0) {
                    break;
                }
                var lev: number = this.GetUInt16(i, SharedDef.SHORT_SPELL_LV);
                this._passiveskillLevDic[id] = lev;
            }
        }
        if (this._passiveskillLevDic[$id]) {
            return this._passiveskillLevDic[$id];
        } else {
            return 0;
        }

    }

    /**当前经验 */
    public getExp(): number {
        return this.GetDouble(SharedDef.PLAYER_EXPAND_INT_XP)
    }
    /**最大经验 */
    public getMaxExp(): number {
        return this.GetDouble(SharedDef.PLAYER_EXPAND_INT_NEXT_LEVEL_XP)
    }

    //元宝
    public getGoldIngot(): number {
        var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_GOLD_INGOT;
        return this.GetDouble(idx);
    }
    //绑定元宝
    public getBindGold(): number {
        var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_BIND_GOLD;
        return this.GetDouble(idx);
    }


    //银两
    public getSilver(): number {
        var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_SILVER;
        return this.GetDouble(idx);
    }
    //真气
    public getQI(): number {
        // var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_QI;
        return 0;
    }

    //斗魂
    public getDouHun(): number {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_DOUHUN;
        return 0
    }
    //荣誉
    public getHonor(): number {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_HONOR;
        return 0;
    }


    //兽灵
    public getBeast(): number {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_BEAST;
        return 0
    }
    //宝石精华
    public getGem(): number {
        //    var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_GEM;
        return 0
    }
    //帮贡
    public getFactionBG(): number {
        //  var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * SharedDef.MONEY_TYPE_FACTION;
        return 0
    }

    //获取资源
    public getResType($type: number): number {
        var idx: number = SharedDef.PLAYER_EXPAND_INT_MONEY + 2 * $type;
        return this.GetDouble(idx);
    }
    //获得标准化资源数目
    public getResTypeStr($type: number): string {
        return Snum(this.getResType($type));
    }


    /**1男 2女*/
    public getCharType(): number {
        return this.GetUInt8(SharedDef.PLAYER_FIELD_BYTES_0, 0);
    }

    public getLevel(): number {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_LEVEL);
    }

    /**
     * 累计消耗元宝
     */
    public getConsume(): number {
        return this.GetUInt32(SharedDef.PLAYER_APPD_INT_FIELD_CONSUME_SUM);
    }

    public getBaseName(): string {
        var str: string = this.getName();
        return str.split(",")[2];
    }





    public getAvatar(): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_APPEARANCE, 1);
    }

    public getWeapon(): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_APPEARANCE, 0);
    }

    /**
     * 家族建筑升级加速每日次数
     */
    public getFactionSpeedUpNum(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FILED_FACTION_BUILDING_SPEEDUP_DAILY_COUNT);
    }

    /**
     * 获取属性的值
     * @param  
     */
    public getPropById($id: number): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MAX_HEALTH + ($id - 1) * 2) / 100);
    }

    //获得所有防御
    public getAllArmor(): number {
        return Math.floor((this.GetDouble(SharedDef.PLAYER_FIELD_ARMOR) + this.GetDouble(SharedDef.PLAYER_FIELD_STRENGTH_ARMOR)) / 100);
    }

    // 获得攻击力
    // public getDamage(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE) / 100);
    // }

    // 获得防御力
    // public getArmor(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_ARMOR) / 100);
    // }

    // 获得命中
    // public getHit(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_HIT) / 100);
    // }

    // 获得闪避
    // public getMiss(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MISS) / 100);
    // }

    // 获得暴击
    // public getCrit(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT) / 100);
    // }

    // 获得坚韧
    // public getTough(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_TOUGH) / 100);
    // }

    // 获得攻击速度
    // public getAttackSpeed(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_ATTACK_SPEED) / 100);
    // }

    // 获得移动速度
    // public getMoveSpeed(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MOVE_SPEED) / 100);
    // }

    // 获得忽视防御
    // public getIgnoreArmor(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_IGNORE_ARMOR) / 100);
    // }

    // 获得忽视闪避
    // public getIgnoreMiss(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_IGNORE_MISS) / 100);
    // }

    // 获得生命值回复
    // public getRecovery(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_RECOVERY) / 100);
    // }

    // 获得伤害加深(万分比)
    // public getDamageAmplifyRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE_AMPLIFY_RATE) / 100);
    // }

    // 获得伤害减免(万分比)
    // public getDamageResistRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE_RESIST_RATE) / 100);
    // }

    // 获得反弹伤害(万分比)
    // public getDamageReturnRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_DAMAGE_RETURN_RATE) / 100);
    // }

    // 获得吸血光环(万分比)
    // public getVampiricRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_VAMPIRIC_RATE) / 100);
    // }

    // 获得回复效率(万分比)
    // public getRecoveryRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_RECOVERY_RATE) / 100);
    // }

    // 获得暴击率(万分比)
    // public getCritRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_RATE) / 100);
    // }

    // 获得抗暴率(万分比)
    // public getCritResistRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_RESIST_RATE) / 100);
    // }

    // 获得暴击伤害倍数(万分比)
    // public getCritDamRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_DAM_RATE) / 100);
    // }

    // 获得降暴伤害倍数(万分比)
    // public getCritResistDamRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CRIT_RESIST_DAM_RATE) / 100);
    // }

    // 获得命中率(万分比)
    // public getHitRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_HIT_RATE) / 100);
    // }

    // 获得闪避率(万分比)
    // public getMissRate(): number {
    //     return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_MISS_RATE) / 100);
    // }

    // 获得眩晕
    public getStunRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_STUN_RATE) / 100);
    }

    // 获得定身
    public getRootsRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_ROOTS_RATE) / 100);
    }

    // 获得沉默
    public getSilenceRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_SILENCE_RATE) / 100);
    }

    // 获得混乱
    public getChaosRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CHAOS_RATE) / 100);
    }

    // 获得魅惑
    public getCharmRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CHARM_RATE) / 100);
    }

    // 获得控制增强
    public getControlEnhanceRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CONTROL_ENHANCE_RATE) / 100);
    }

    // 获得控制减免
    public getControlResistRate(): number {
        return Math.floor(this.GetDouble(SharedDef.PLAYER_FIELD_CONTROL_RESIST_RATE) / 100);
    }






    /**角色已装配的神兵id */
    public getDivineID(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_DIVINE_ID);
    }
    /**今日已点赞状态集合 */
    public getRankLikeState(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i = 0; i < 32; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_FIELD_USE_RANK_LIKE, i));
        }
        return ary;
    }

    private rankLikeChg() {
        console.log("---====");
        ModuleEventManager.dispatchEvent(new ranking.RankingEvent(ranking.RankingEvent.RANKING_LIKE_CHG_EVENT));
    }

    /**是否对某个排行榜点赞过 */
    public testAddLike(type: number, guid: string): boolean {
        var spkey: string = "\1"
        var key: string = guid + spkey + type;
        for (var i: number = SharedDef.PLAYER_STRING_FIELD_RANKLIKE_START; i < SharedDef.PLAYER_STRING_FIELD_RANKLIKE_ENE; i++) {
            if (this.GetStr(i) == key) {
                return true
            }
        }
        return false;
    }
    /**神兵总战力 */
    public getDivineForce(): number {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_DIVINE_FORCE);
    }
    /**技能总战力 */
    public getSkillForce(): number {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_SKILL_FORCE);
    }
    /**神兵数量 */
    public getDivineNum(): number {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_DIVINE_NUM);
    }
    /**坐骑总战力 */
    public getMountForce(): number {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_MOUNT_FORCE);
    }
    /**坐骑阶数 */
    public getMountLevel(): number {
        return this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 0);
    }
    /** 坐骑星数*/
    public getMountStar(): number {
        return this.GetByte(SharedDef.PLAYER_INT_FIELD_MOUNT_LEVEL, 1);
    }

    // 修炼-上次挑战时间戳 冷却使用
    public getTraininglasttime(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_LAST_PLUNDER_TIME);
    }


    // 修炼-当日累计掠夺经验
    public getTrainingplunderexp(): number {
        console.log("--expnum--", this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_EXP));
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_EXP);
    }

    // 修炼-当日累计掠夺宝箱数
    public getTrainingplunderchest(): number {
        console.log("--bosnum--", this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_CHEST));
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PLUNDER_CHEST);
    }

    // 修炼-当日购买次数
    public getTrainingplundercount(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TODAY_PURCHASE_COUNT);
    }

    // 修炼-当前剩余挑战次数
    public getTrainingleftplundercount(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_LEFT_PLUNDER_COUNT);
    }

    // 修炼-修炼开始时间
    public getTrainingStartTime(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_START_TIME);
    }

    // 修炼-宝箱掠夺信息
    public getTrainingLostinfo(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_LOST_INFO);
    }

    // 修炼-被掠夺成功数
    public getTrainingTotalCount(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_CULTIVATION_TOTAL_BEEN_PLUNDER_COUNT);
    }

    // 修炼-战斗记录
    public getTrainingcombatlog(): Array<string> {
        var ary: Array<string> = new Array;
        for (var i: number = SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_START; i < SharedDef.PLAYER_STRING_INT_FIELD_CULTIVATION_PLUNDER_RECORD_END; i++) {
            ary.push(this.GetStr(i));
        }
        return ary;
    }


    // 登录大礼 --累计登录天数
    public getLogingiftDay(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_TOTAL_DAYS);
    }

    // 登录大礼 --奖励领取情况
    public getLogingiftReward(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i = 0; i < 32; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_INT_FIELD_LOGIN_ACTIVITY_REWARD_STATUS_START, i));
        }
        return ary;
    }

    /**翅膀战斗力 */
    public getWingForce(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WINGS_FORCE);
    }

    /**
     * 法宝总战力变化
     */
    public talismantotalzhanli() {
        ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_ZHANLI_EVENT));
    }
    /**
      * 法宝总战力
      */
    public gettalismantotalzhanli(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_TALISMAN_FORCE);
    }

    /**
     * 法宝总战力变化
     */
    public teamflagchange() {
        ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_ZHANLI_EVENT));
    }
    /**
      * 组队副本首胜通过字段
      */
    public getteamflag(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i = 0; i < 32; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_INT_FIELD_GROUP_INSTANCE_CLEAR_FLAG, i));
        }
        return ary;
    }
    /**家族首领剩余调整次数 */
    public getFactionLeadNum(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_FACTION_BOSSDEFENSE_TICKETS);
    }
    /**家族无尽远程层数 */
    public getFactionTripLev(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_CLEAR_FLOOR);
    }

    /**家族远程奖励状态*/
    public getFactionTripReward(): Array<boolean> {
        var ary: Array<boolean> = new Array;
        for (var i: number = 1; i < 6; i++) {
            ary.push(this.GetBit(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG, i));
        }
        return ary;
    }

    /**扫荡状态*/
    public getFactionTripSweep(): boolean {
        return this.GetBit(SharedDef.PLAYER_INT_FIELD_FACTION_TOWER_FLAG, 0);
    }

    /**
     * 排位赛积分
     */
    public getQualifyScore() {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_QUALIFY_SCORE);
    }
    /**家族技能等级 */
    public getFactionSkillLv($id: number): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_FACTION_SKILL_LV_START + $id - 1, 0);
    }

    //已改名次数
    public getChgNameTime(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_RENAME_TIMES);
    }
    //称号战斗力
    public getTitleForce(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_TITLE_FORCE);
    }
    //称号战斗力变化
    public titleforceChg() {
        ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.TITLE_FORCE_CHG_EVENT));
    }
    //名字变化
    public Chgname() {
        ModuleEventManager.dispatchEvent(new role.RoleUiEvent(role.RoleUiEvent.NAME_CHG_EVENT));
    }

    //复仇次数变化
    public chgRevengeNum() {
        ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.REVENGE_NUM_CHG_EVENT));
    }

    //复仇购买次数
    public getRevengeBuyNum(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REVENGE_BUY_TIMES);
    }

    //摇钱树次数
    public getMoneyTreeNum(): number {
        return this.GetUInt32(SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_COUNT);
    }

    //摇钱树满足次数奖励领取状况
    public getMoneyTreeState($idx: number): boolean {
        return this.GetBit(SharedDef.PLAYER_APPD_INT_FIELD_MONEYTREE_GIFT_FLAG, $idx);
    }
    //摇钱树领取状态改变
    private moneyTreeChg() {
        ModuleEventManager.dispatchEvent(new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.CHG_MoneyTree_REWARD_EVENT));
    }

    //当前挑战的幻境id
    public getworldrisklastid(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_WORLD_RISK_LAST_ID);
    }

    //上一次地图子类型
    public getLastMapType(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_LAST_INSTANCE_TYPE);
    }
    //上一次地图子类型参数
    public getLastMapParam(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_LAST_INSTANCE_PARAM);
    }
    //模式切换cd
    public getCDtime() {
        return this.GetUInt32(SharedDef.PLAYER_FIELD_PEACE_MODE_CD);
    }

    //境界突破等级
    public getStateLev(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REALMBREAK_LEVEL);
    }
    //境界突破经验
    public getStateExp(): number {
        return this.GetUInt32(SharedDef.PLAYER_INT_FIELD_REALMBREAK_EXP);
    }
    //境界突破任务完成个数
    public getStateTaskNum(): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_REALMBREAK_DAILYQUEST_STATE, 0);
    }
    //境界突破任务奖励领取情况
    public getStateTaskRecive(): number {
        return this.GetUInt16(SharedDef.PLAYER_INT_FIELD_REALMBREAK_DAILYQUEST_STATE, 1);
    }
}


