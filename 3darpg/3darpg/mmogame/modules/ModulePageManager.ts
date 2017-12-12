﻿class ModulePageManager {
    public constructor() {

    }
    public static showResTittle($arr: Array<number>): void {
        var $evt: wintittle.WindowRestTittleEvent = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_TITTLE_PANEL);
        $evt.data = $arr;
        ModuleEventManager.dispatchEvent($evt)
    }

    public static hideResTittle(): void {
        var $evt: wintittle.WindowRestTittleEvent = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_TITTLE_PANEL);
        ModuleEventManager.dispatchEvent($evt)
    }
    
    /**
     * NPC对话打开系统
     * @param  系统id
     * @param  页签数组
     * @param  选中某个页签
     */
    public static openNpcPanel($tabid: number, $tabAry: Array<number> = null, $seltab: number = null): void {
        var $evt: any;
        switch ($tabid) {
            case SharedDef.MODULE_INSTANCE://副本501;
                $evt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_COPYTASK_EVENT);
                $evt.data = $tabAry;
                $evt.seltab = $seltab;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_ARENA: //竞技503;
                $evt = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT);
                $evt.data = $tabAry;
                $evt.selTab = $seltab;
                ModuleEventManager.dispatchEvent($evt);
                break;
            default:
                console.log("没有记录", $tabid, TimeUtil.getTimer());
                break;
        }
    }
    public static openPanel($tabid: number, $data: any = null): void {
        var $evt: any;
        console.log("--$tabid--", $tabid, "---$data--", $data);
        switch ($tabid) {
            case SharedDef.MODULE_SETTING: //设置101
                $evt = new Hangup.HangupUiEvent(Hangup.HangupUiEvent.SHOW_HANGUPUI_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_BAG: //背包102
                $evt = new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_CHAR_BG_PANEL)
                $evt.showType = 1;
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_RONGLIAN: //熔炼103
                $evt = new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_CHAR_BG_PANEL)
                $evt.showType = 0;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_QUEST: //任务104
                // $evt = new quest.QuestEvent(quest.QuestEvent.SHOW_QUEST_EVENT)
                // $evt.tabType = $data
                // ModuleEventManager.dispatchEvent($evt);
                break;

            case SharedDef.MODULE_MAIL: //邮件

                ModuleEventManager.dispatchEvent(new email.MailEvent(email.MailEvent.SHOW_MAIL_PANEL_EVENT));
                break;

            case SharedDef.MODULE_DAILY_TASKS: //日常任务105
                $evt = new quest.QuestEvent(quest.QuestEvent.SHOW_DAILY_QUEST_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_CHAT: //聊天106
                $evt = new Chat.ChatEvent(Chat.ChatEvent.SHOW_CHAT_EVENT)
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_MAIL: //邮件107

                // $evt.data = $data;
                // ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_MAP: //地图108
                // $evt = new achievement.AchievementEvent(achievement.AchievementEvent.SHOW_Achievement_EVENT)
                // $evt.data = $data;
                // ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_STRENGTH: //我要变强109
                $evt = new stronger.StrongerEvent(stronger.StrongerEvent.SHOW_Stronger_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_CHATPERSON: //私聊110
                $evt = new whisper.WhisperUiEvent(whisper.WhisperUiEvent.SHOW_WHISPER_PANEL);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_ACTIVE: //活跃111
                $evt = new activity.ActivityEvent(activity.ActivityEvent.SHOW_ACTIVITY_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_FISH: //我要变弱113
                $evt = new chgfish.ChgfishEvent(chgfish.ChgfishEvent.SHOW_Chgfish_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_MONEYTREE: //摇钱树112
                $evt = new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.SHOW_MoneyTree_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_REALM: //境界115
                $evt = new stateup.StateUpEvent(stateup.StateUpEvent.SHOW_STATEUP_PANEL);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_ROLE: //角色201
                $evt = new role.RoleUiEvent(role.RoleUiEvent.SHOW_ROLE_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_SPELL: //技能202
                $evt = new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SHOW_SKILLUI_EVENT) //技能
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_DIVINE: //法宝203
                $evt = new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TREASURE_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;

            case SharedDef.MODULE_FASHION: //时装204
                $evt = new exterior.ExteriorEvent(exterior.ExteriorEvent.SHOW_EXTERIOR_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_MOUNT: //坐骑205;
                $evt = new mountui.MountUiEvent(mountui.MountUiEvent.SHOW_MOUNT_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;

            case SharedDef.MODULE_MIX: //炼器206;
                $evt = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_STRENGTHGEM_PANEL); //练器
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_WING://翅膀207
                $evt = new wing.WingEvent(wing.WingEvent.SHOW_WING_PANEL_EVENT); //翅膀
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_TCM://经脉208
                $evt = new meridian.MeridianEvent(meridian.MeridianEvent.SHOW_MERIDIAN_EVENT)
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_GW://神剑209
                $evt = new divinesword.DivineswordEvent(divinesword.DivineswordEvent.SHOW_TRAINING_PANEL)
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_SOCIAL: //社交301;
                $evt = new social.SocialUiEvent(social.SocialUiEvent.SHOW_SOCIAL_EVENT)  //社交
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_FACTION: //家族302;
                $evt = new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONUI_EVENT);  //家族
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_RANK:  //排行榜303
                $evt = new ranking.RankingEvent(ranking.RankingEvent.SHOW_RANKING_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_FACTIONMAIN:  //主殿304
                $evt = new faction.FactionBuildEvent(faction.FactionBuildEvent.SHOW_BUILD_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_FACTIONSKILL:  //技能大厅305
                $evt = new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_FACTIONACTIVE:  //活动大厅306
                $evt = new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_FACTIONBOX:  //宝库307
                $evt = new warehousetreasure.WarehouseEvent(warehousetreasure.WarehouseEvent.SHOW_WAREHOUSE_PANEL);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_MALL://商城401
                $evt = new store.StoreEvent(store.StoreEvent.SHOW_Store_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_VIP: //VIP特权402
                $evt = new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_VIP_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_INSTANCE://副本501;
                $evt = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_COPYTASK_EVENT);
                $evt.seltab = $data;
                $evt.data = null;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_TEST://世界地图1001;
                $evt = new adventuremap.AdventureMapEvent(adventuremap.AdventureMapEvent.SHOW_ADVENTURE_MAP_PANEL);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_ARENA: //竞技503;
                $evt = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_BOSS: //BOSS504;
                $evt = new sboss.SbossEvent(sboss.SbossEvent.SHOW_SBOSS_PANEL);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_EXP: //历练任务505;
                $evt = new training.TrainingEvent(training.TrainingEvent.SHOW_TRAINING_PANEL)
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                break;
            case SharedDef.MODULE_WELFARE: //福利601;
                $evt = new welfare.WelfareEvent(welfare.WelfareEvent.SHOW_Welfare_EVENT);
                $evt.data = $data;
                ModuleEventManager.dispatchEvent($evt);
                // 
                break;
            case SharedDef.MODULE_OPENSERVICE: //开服活动701;
                // $evt = new store.StoreEvent(store.StoreEvent.SHOW_Store_EVENT);
                // $evt.data = $data;
                // ModuleEventManager.dispatchEvent($evt);
                ModuleEventManager.dispatchEvent(new kaifu.KaiFuEvent(kaifu.KaiFuEvent.SHOW_KAIFU_PANEL_EVENT));
                break;
            case SharedDef.MODULE_FIRST_RECHARGE: //首冲801;
                // $evt.data = $data;
                // ModuleEventManager.dispatchEvent($evt);
                break;

            default:
                console.log("没有记录", $tabid, TimeUtil.getTimer());
                break;
        }

    }

}