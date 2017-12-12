class NetBaseProcessor extends BaseProcessor {

    public getName(): string {
        return "NetBaseProcessor";
    }

    protected receivedModuleEvent($event: BaseEvent): void {

    }

    public getError($byte: ByteArray): void {
        var $msgVo: s2c_operation_failed = new s2c_operation_failed();
        s2c_operation_failed.read($msgVo, $byte);
        var str: string = OperationFailedToString($msgVo.type, $msgVo.reason, $msgVo.data);
        msgtip.MsgTipManager.setMsgData($msgVo)

        if ($msgVo.type == 27 && ($msgVo.reason == 22 || $msgVo.reason == 37)) {
            this.showLevelUp(5);
        } else if ($msgVo.type == 20 && $msgVo.reason == 1) {
            var $massBossCdNum: number = GameInstance.getGameSecond(GuidData.player.getCDtime());
            if ($massBossCdNum > 0) {
                msgtip.MsgTipManager.outStr(getScencdStr($massBossCdNum) + "后可设置为和平模式", 99);
            }
        } else if ($msgVo.type == 27 && $msgVo.reason == 0) {//技能升级成功
            this.showLevelUp(5);
            ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SKILL_UP_EVENT));
        } else if ($msgVo.type == 27 && $msgVo.reason == 1) {
            var aaa = new mountui.MountUiEvent(mountui.MountUiEvent.EFF_EVENT);
            aaa.data = $msgVo.data
            ModuleEventManager.dispatchEvent(aaa);
        } else if ($msgVo.type == 27 && $msgVo.reason == 2) {
            this.showLevelUp(1);
        } else if ($msgVo.type == 27 && $msgVo.reason == 10) {
            this.showLevelUp(12);
        } else if ($msgVo.type == 27 && $msgVo.reason == 3) {
            this.showLevelUp(55);
        } else if ($msgVo.type == 27 && ($msgVo.reason == 9 || $msgVo.reason == 29 || $msgVo.reason == 30 || $msgVo.reason == 31 || $msgVo.reason == 32)) {
            this.showLevelUp(3);
            console.log("---$msgVo.type，$msgVo.type----", $msgVo.type, $msgVo.reason);
        } else if ($msgVo.type == 27 && $msgVo.reason == 12) {
            this.showLevelUp(4);
        } else if ($msgVo.type == 27 && $msgVo.reason == 14) {
            this.showLevelUp(13);
        } else if ($msgVo.type == 27 && $msgVo.reason == 15) {
            this.showLevelUp(14);
        } else if ($msgVo.type == 27 && $msgVo.reason == 16) {
            ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.EFF_EVENT));
            this.showLevelUp(2);
        } else if ($msgVo.type == 27 && $msgVo.reason == 17) {
            ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.EFF_EVENT));
            this.showLevelUp(15);
        } else if ($msgVo.type == 27 && $msgVo.reason == 18) {
            this.showLevelUp(16);
        } else if ($msgVo.type == 27 && $msgVo.reason == 21) {
            this.showLevelUp(17);
        } else if ($msgVo.type == 27 && $msgVo.reason >= 25 && $msgVo.reason <= 27) {
            var poptips = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.POP_TIPS_EVENT);
            poptips.data = [$msgVo.reason,$msgVo.data]
            ModuleEventManager.dispatchEvent(poptips);
        } else if ($msgVo.type == 27 && $msgVo.reason == 33) {
            this.showLevelUp(8);
        } else if ($msgVo.type == 27 && $msgVo.reason == 34) {
            this.showLevelUp(9);
        } else if ($msgVo.type == 27 && $msgVo.reason == 35) {
            this.showLevelUp(6);
        } else if ($msgVo.type == 27 && $msgVo.reason == 36) {
            this.showLevelUp(7);
        } else if ($msgVo.type == 27 && $msgVo.reason == 39) {
            this.showLevelUp(18);
        } else if ($msgVo.type == 27 && $msgVo.reason == 40) {
            var bbb = new wing.WingEvent(wing.WingEvent.EFF_EVENT);
            bbb.data = $msgVo.data
            ModuleEventManager.dispatchEvent(bbb);
        } else if ($msgVo.type == 35 && $msgVo.reason == 0) {
            ModuleEventManager.dispatchEvent(new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.SHOW_EFF_MoneyTree_EVENT));
        } else if ($msgVo.type == 35 && $msgVo.reason == 1) {
            var bbb = new moneytree.MoneyTreeEvent(moneytree.MoneyTreeEvent.EFF_EVENT);
            bbb.data = $msgVo.data
            ModuleEventManager.dispatchEvent(bbb);
        }




        if ($msgVo.type == OprateResult.OPRATE_TYPE_LOGIN && $msgVo.reason == OprateResult.OPRATE_RESULT_LOGINED_IN) {
            NetManager.getInstance().protocolos.forced_into();
            TimeUtil.addTimeOut(200, () => {
                var connetEvt: LoginEvent = new LoginEvent(LoginEvent.LOGIN_RECONNET_EVENT);
                ModuleEventManager.dispatchEvent(connetEvt);
            })
            console.log("强制登录");
        }
        if ($msgVo.type == OprateResult.OPRATE_TYPE_LOGIN && $msgVo.reason == OprateResult.OPRATE_RESULT_SCENED_ERROR) {
            var $indexUrl: string = window.location.toString();
            window.location.href = $indexUrl;

        }

    }

    /**
     * 各类提示
     */
    private showLevelUp($id: number): void {
        var $obj: msgtip.MsgPicData = new msgtip.MsgPicData
        $obj.type = 2; //加载图片
        $obj.info = getSuccesspromptUrl(String($id));
        var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA)
        $MsgTipEvent.data = $obj
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    }

    public guidObj($byte: ByteArray): void {
        GuidObjManager.getInstance().ApplyBlock($byte);
    }
    public gridObj($byte: ByteArray): void {
        GuidObjManager.getInstance().ApplyBlock($byte);

    }
    public guidCtrl($byte: ByteArray): void {
        // console.log("对象更新协议控制");
    }

    public sysTime($byte: ByteArray): void {
        GameInstance.gameSyncTime = new both_sync_mstime();
        both_sync_mstime.read(GameInstance.gameSyncTime, $byte);
        //console.log("场景服时间同步");

        GameInstance.gameSyncClientTime = TimeUtil.getTimer()
    }

    public sysOpenTime($byte: ByteArray): void {
        var sssot: s2c_send_server_open_time = new s2c_send_server_open_time();
        s2c_send_server_open_time.read(sssot, $byte);
        GameInstance.serverOpenTime = sssot.open_time;
    }

    public sysAppTime($byte: ByteArray): void {
        GameInstance.appSynctTime = new both_sync_mstime_app();
        both_sync_mstime_app.read(GameInstance.appSynctTime, $byte);
        // console.log("应用服时间同步");
        GameInstance.appSyncClientTime = TimeUtil.getTimer();
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }



    public gridMove($byte: ByteArray): void {

        GuidObjManager.getInstance().applyGridMove($byte);
    }
    public gridJump($byte: ByteArray): void {

        console.log("收到gridJump=>>")
        GuidObjManager.getInstance().applyGridJump($byte);
    }


    public gridStop($byte: ByteArray): void {
        GuidObjManager.getInstance().applyGridStop($byte);
    }

    public fight($byte: ByteArray): void {
        FightManager.getInstance().fightUpdate($byte);
    }


    public task($byte: ByteArray): void {
        // console.log("任务相关");
    }


    public aiChat($byte: ByteArray): void {
        var chat: s2c_chat_unit_talk = new s2c_chat_unit_talk();
        s2c_chat_unit_talk.read(chat, $byte);
        //console.log("ai chat:" + chat.say);
    }

    protected listenModuleEvents(): Array<BaseEvent> {
        return [

        ];
    }

    private smsgRankListQueryResult($byte: ByteArray): void {
        var rankTypeId: number = $byte.readUint32(); //回调ID
        var $selfLevel: number = $byte.readInt();  //自己的排名
        var allNum: number = $byte.readUint32();//排行榜总长度
        var $list: Array<GuidObject> = new Array
        var len: number = $byte.readShort();
        for (var i: number = 0; i < len; i++) {
            var $guidObject: GuidObject = new RankData()
            var $intLen: number = $byte.readShort()
            for (var j: number = 0; j < $intLen; j++) {
                var $intValue: number = $byte.readUint32();
                $guidObject.SetUInt32(j, $intValue);
            }
            var $strLen: number = $byte.readShort()
            for (var k: number = 0; k < $strLen; k++) {
                var $strValue: string = $byte.readUTF();
                $guidObject.SetStr(k, $strValue);
            }
            $list.push($guidObject);
        }

        switch (rankTypeId) {
            case SharedDef.RANK_TYPE_TRIAL:
                var fbevt: copytask.CopytaskUiEvent = new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_TOWER_RANK);
                fbevt.data = { list: $list, self: $selfLevel };
                ModuleEventManager.dispatchEvent(fbevt);
                break;
            case SharedDef.RANK_TYPE_SINGLE_PVP:
                var pvpevt: kuafu.KuaFuEvent = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_ARENA_QUALIFY_RANK_EVENT);
                pvpevt.data = $selfLevel;
                ModuleEventManager.dispatchEvent(pvpevt);
                break;
            case SharedDef.RANK_TYPE_FACTION:
                //var evt:faction.FactionEvent = new faction.FactionEvent(faction.FactionEvent.FACTION_GET_LIST_EVENT);
                //evt.data = $list;
                //ModuleEventManager.dispatchEvent(evt);
                break;
            case SharedDef.RANK_TYPE_POWER://排行榜callbackid决定的返回结果
                // case SharedDef.RANK_TYPE_DOUJIANTAI:
                var evt: ranking.RankingEvent = new ranking.RankingEvent(ranking.RankingEvent.RANKING_DATA_EVENT);
                var data: ranking.RankQueryData = new ranking.RankQueryData();
                data.type = rankTypeId;
                data.rank = $selfLevel;
                data.list = $list;
                data.allNum = allNum;
                evt.data = data;
                ModuleEventManager.dispatchEvent(evt);
                break;
            case SharedDef.RANK_TYPE_DOUJIANTAI:
                var kuafuevt: kuafu.KuaFuEvent = new kuafu.KuaFuEvent(kuafu.KuaFuEvent.SHOW_DJT_RANK);
                kuafuevt.data = { list: $list, self: $selfLevel };
                ModuleEventManager.dispatchEvent(kuafuevt);
                break;
            default:
                break
        }
    }

    private _lasttime: number = 0;
    public smsgExpUpData($byte: ByteArray): void {

        var $exp: number = $byte.readInt32();
        var $type: number = $byte.readUint8();
        var $vipExp: number = $byte.readInt32();
        // var $color: string = "[ff00ff]"
        var $expStr: string = ($exp > 0 ? "+" : "") + $exp;
        // var $popotype: number = msgtip.PopMsgVo.type4
        // if ($exp < 0) {
        //     $color = "[0000ff]"
        //     $popotype = msgtip.PopMsgVo.type5
        // }
        // var $str: string = $color + "经验" + $expStr
        // //  console.log($str)
        // msgtip.MsgTipManager.outStr($str, $popotype);

        var bsc: SceneChar = GameInstance.mainChar;
        var $textJumpUiVo: bloodTittle.TextJumpUiVo = new bloodTittle.TextJumpUiVo();
        $textJumpUiVo.str = String($expStr);
        $textJumpUiVo.type = bloodTittle.TextJumpType.EXPERIENCE;
        $textJumpUiVo.starttime = TimeUtil.getTimer();
        if ($textJumpUiVo.starttime - this._lasttime < 250) {
            $textJumpUiVo.starttime = this._lasttime + 250;
        }
        $textJumpUiVo.endtime = $textJumpUiVo.starttime + 1200;
        //飘字初始化位置均为玩家头顶

        this._lasttime = $textJumpUiVo.starttime;

        if (bsc) {
            $textJumpUiVo.pos = new Vector3D(bsc.x, bsc.y + bsc.tittleHeight - 5, bsc.z);
        } else {
            $textJumpUiVo.pos = new Vector3D(Scene_data.focus3D.x, Scene_data.focus3D.y, Scene_data.focus3D.z);
        }
        // console.log("经验加了");
        BloodManager.getInstance().setJumpNum($textJumpUiVo);

    }


    public smsgItemNotice($byte: ByteArray): void {

        var $vo: s2c_item_notice = new s2c_item_notice
        s2c_item_notice.read($vo, $byte)


        for (var i: number = 0; i < $vo.list.length; i++) {
            var $item_reward_info: item_reward_info = $vo.list[i]
            var $obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($item_reward_info.item_id)
            
            var $str: string = "[FFE57E]获得 " + getColorQua($obj.quality) + $obj.name + "[FFE57E]×" + $item_reward_info.num;
            // var $str: string = "[FFE57E]获得 " + $obj.getColorName() + "[FFE57E]×" + $item_reward_info.num;
            // var $str: string = "[ffffff]获得 " + $obj.name + "*" + $item_reward_info.num;
            //   var $str: string = "[b9d4f2]" + getServerAndName(kkk[0]) + $A.getColorName() + "[b9d4f2]获得" + $B.getColorName() + "[b9d4f2]x" + kkk[3];

            this.showTempTime(i * 150, $str, 3);

        }
        switch ($vo.showType) {
            case SharedDef.ITEM_SHOW_TYPE_MINI_QUEST_BAR:

                var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SMSG_ITEM_NOTICE)
                $MsgTipEvent.data = $vo;
                ModuleEventManager.dispatchEvent($MsgTipEvent);

                break
            case SharedDef.ITEM_SHOW_TYPE_MINI_QUEST_DAILY2:

                break
            default:
        }

    }
    private showTempTime($time: number, $str: string, $type: number): void {
        TimeUtil.addTimeOut($time, () => {
            msgtip.MsgTipManager.outStr($str, msgtip.MsgTipManager.getPopTypeByTB($type));
        });

    }
    public msgClientsubscription($byte: ByteArray): void {
        //  console.log("msgClientsubscription回来了");
        GuidObjManager.getInstance().msgClientsubscription($byte);
    }
    public smsgCastSpellStart($byte: ByteArray): void {

        var $vo: s2c_cast_spell_start = new s2c_cast_spell_start;
        s2c_cast_spell_start.read($vo, $byte);
        var posItem: Array<string> = $vo.data.split("|");
        var $v2d: Vector2D = new Vector2D(Number(posItem[1]), Number(posItem[2]));
        var $v3d: Vector3D = AstarUtil.getWorldPosByStart2D($v2d);

        var $skillVo: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($vo.spellid)



        if ($skillVo.alarmEffect) {
            console.log("预警特效---->预警特效");
            $v3d.y = AstarUtil.getHeightByPos($v3d) + 1;
            $v3d.w = Number(posItem[0]);
            SceneCharManager.getInstance().addWarningEffectChar($v3d, $skillVo.alarmEffect);
        } else {
            var $skillFile: Skill = SkillManager.getInstance().getSkill(getSkillUrl($skillVo.effect_file), $skillVo.effect);
            if ($skillFile) {
                $skillFile.reset();
                //$skillFile.isDeath = false;
                var $play_Skill_Vo: Play_Skill_Vo = Play_Skill_Vo.get_Play_Skill_Vo($skillVo.id)
                var $sc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID($vo.caster_guid);

                console.log("连续技能", TimeUtil.getTimer());
                if ($skillVo.is_remain == 1) {
                    $sc.isSinging = true;
                } else {
                    $sc.isSinging = false;
                }
                $skillFile.tbSkillId = $skillVo.id;
                FightManager.getInstance().playFixEffect($skillFile, $play_Skill_Vo, $v2d, $sc, null);
                if ($sc.unit.isMain) {
                    var $mainEvent: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH)
                    $mainEvent.data = $skillVo.id;
                    ModuleEventManager.dispatchEvent($mainEvent);

                    // if ($skillVo.is_remain) {
                    //     var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SKILL_TIP_DATA)
                    //     $MsgTipEvent.data = $skillVo.icon;
                    //     ModuleEventManager.dispatchEvent($MsgTipEvent);
                    // }
                }

            }
        }

    }


    public msgUseJumpPoint($byte: ByteArray): void {

        console.log("接收到跳跃消息");
        var $id: number = $byte.readUint32();
        var $uintGuid: number = $byte.readUint32();
        var $vo: tb.TB_map_jump_point_detail = tb.TB_map_jump_point_detail.getTempByID($id);
        var $len: number = $vo.show.length;
        GuidObjManager.getInstance().applyJumpShow($uintGuid, $vo.show, $vo.last * 1000);
    }
    public msgSpellStop($byte: ByteArray): void {

        var guidstr: string = $byte.readString();
        console.log("msgSpellStop", guidstr);
        GuidObjManager.getInstance().msgSpellStop(guidstr);
    }

    public smsgOfflineRewardResult($byte: ByteArray): void {
        console.log("---离线数据");
        var $vo: s2c_offline_reward_result = new s2c_offline_reward_result;
        s2c_offline_reward_result.read($vo, $byte);
        var $evt: offlinereward.OfflineRewardEvent = new offlinereward.OfflineRewardEvent(offlinereward.OfflineRewardEvent.SHOW_OFFLINE_REWARD_PANEL)
        $evt.data = $vo;
        TimeUtil.addTimeOut(2000, () => {
            ModuleEventManager.dispatchEvent($evt);
        });

    }


    public getHanderMap(): Object {
        var obj: Object = new Object;
        obj[Protocols.SMSG_OPERATION_FAILED] = ($byte: ByteArray) => { this.getError($byte) };
        obj[Protocols.SMSG_UD_OBJECT] = ($byte: ByteArray) => { this.guidObj($byte) };
        obj[Protocols.CMSG_UD_CONTROL] = ($byte: ByteArray) => { this.guidCtrl($byte) };
        obj[Protocols.MSG_SYNC_MSTIME] = ($byte: ByteArray) => { this.sysTime($byte) };
        obj[Protocols.MSG_SYNC_MSTIME_APP] = ($byte: ByteArray) => { this.sysAppTime($byte) };
        obj[Protocols.SMSG_GRID_UD_OBJECT] = ($byte: ByteArray) => { this.gridObj($byte) };
        obj[Protocols.SMSG_GRID_UD_OBJECT_2] = ($byte: ByteArray) => { this.gridObj($byte) };
        obj[Protocols.SMSG_QUESTHELP_CANACCEPT_LIST] = ($byte: ByteArray) => { this.task($byte) };
        obj[Protocols.SMSG_CHAT_UNIT_TALK] = ($byte: ByteArray) => { this.aiChat($byte) };
        obj[Protocols.SMSG_GRID_UNIT_MOVE] = ($byte: ByteArray) => { this.gridMove($byte) };
        obj[Protocols.SMSG_GRID_UNIT_JUMP] = ($byte: ByteArray) => { this.gridJump($byte) };
        obj[Protocols.SMSG_EXP_UPDATE] = ($byte: ByteArray) => {
            //  console.log("--经验来了---");
            this.smsgExpUpData($byte)
        };
        obj[Protocols.SMSG_ITEM_NOTICE] = ($byte: ByteArray) => { this.smsgItemNotice($byte) };

        obj[Protocols.MSG_CLIENTSUBSCRIPTION] = ($byte: ByteArray) => { this.msgClientsubscription($byte) };

        obj[Protocols.SMSG_GRID_UNIT_MOVE_2] = ($byte: ByteArray) => { this.gridMove($byte) };
        obj[Protocols.MSG_MOVE_STOP] = ($byte: ByteArray) => { this.gridStop($byte) };
        obj[Protocols.SMSG_FIGHTING_INFO_UPDATE_OBJECT] = ($byte: ByteArray) => { this.fight($byte) };
        obj[Protocols.SMSG_FIGHTING_INFO_UPDATE_OBJECT_2] = ($byte: ByteArray) => { this.fight($byte) };
        obj[Protocols.SMSG_RANK_LIST_QUERY_RESULT] = ($byte: ByteArray) => { this.smsgRankListQueryResult($byte) };
        obj[Protocols.MSG_USE_JUMP_POINT] = ($byte: ByteArray) => { this.msgUseJumpPoint($byte) };

        obj[Protocols.SMSG_CAST_SPELL_START] = ($byte: ByteArray) => { this.smsgCastSpellStart($byte) };
        obj[Protocols.MSG_SPELL_STOP] = ($byte: ByteArray) => { this.msgSpellStop($byte) };

        obj[Protocols.SMSG_OFFLINE_REWARD_RESULT] = ($byte: ByteArray) => { this.smsgOfflineRewardResult($byte) };

        obj[Protocols.SMSG_SEND_SERVER_OPEN_TIME] = ($byte: ByteArray) => { this.sysOpenTime($byte) };


        return obj;
    }

}