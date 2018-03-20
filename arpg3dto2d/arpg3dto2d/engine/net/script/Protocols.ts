/***********************************************************************/
/***************本代码由协议工具自动生成，请勿手动修改****************/
/************************ 协议版本号:#类型名称，注释 ******************************/
/***********************************************************************/





//package cow.net.structs
//{	
	//import sys.utils.Stream;	
	
class Protocols {
	/*无效动作*/
	public static  MSG_NULL_ACTION :number = 0;	//null_action
	/*测试连接状态*/
	public static  MSG_PING_PONG :number = 1;	//ping_pong
	/*踢掉在线的准备强制登陆*/
	public static  CMSG_FORCED_INTO :number = 2;	//forced_into
	/*获得Session对象*/
	public static  CMSG_GET_SESSION :number = 3;	//get_session
	/*网关服数据包路由测试*/
	public static  MSG_ROUTE_TRACE :number = 4;	//route_trace
	/*记录客户端日志*/
	public static  CMSG_WRITE_CLIENT_LOG :number = 5;	//write_client_log
	/*操作失败*/
	public static  SMSG_OPERATION_FAILED :number = 6;	//operation_failed
	/*同步时间*/
	public static  MSG_SYNC_MSTIME :number = 7;	//sync_mstime
	/*对象更新*/
	public static  SMSG_UD_OBJECT :number = 8;	//ud_object
	/*对象更新控制协议*/
	public static  CMSG_UD_CONTROL :number = 9;	//ud_control
	/*对象更新控制协议结果*/
	public static  SMSG_UD_CONTROL_RESULT :number = 10;	//ud_control_result
	/*GRID的对象更新*/
	public static  SMSG_GRID_UD_OBJECT :number = 11;	//grid_ud_object
	/*GRID的对象更新*/
	public static  SMSG_GRID_UD_OBJECT_2 :number = 12;	//grid_ud_object_2
	/*告诉客户端，目前自己排在登录队列的第几位*/
	public static  SMSG_LOGIN_QUEUE_INDEX :number = 13;	//login_queue_index
	/*踢人原因*/
	public static  SMSG_KICKING_TYPE :number = 14;	//kicking_type
	/*获取角色列表*/
	public static  CMSG_GET_CHARS_LIST :number = 15;	//get_chars_list
	/*角色列表*/
	public static  SMSG_CHARS_LIST :number = 16;	//chars_list
	/*检查名字是否可以使用*/
	public static  CMSG_CHECK_NAME :number = 17;	//check_name
	/*检查名字结果*/
	public static  SMSG_CHECK_NAME_RESULT :number = 18;	//check_name_result
	/*创建角色*/
	public static  CMSG_CHAR_CREATE :number = 19;	//char_create
	/*角色创建结果*/
	public static  SMSG_CHAR_CREATE_RESULT :number = 20;	//char_create_result
	/*删除角色*/
	public static  CMSG_DELETE_CHAR :number = 21;	//delete_char
	/*角色删除结果*/
	public static  SMSG_DELETE_CHAR_RESULT :number = 22;	//delete_char_result
	/*玩家登录*/
	public static  CMSG_PLAYER_LOGIN :number = 23;	//player_login
	/*玩家退出*/
	public static  CMSG_PLAYER_LOGOUT :number = 24;	//player_logout
	/*临时账号转正规*/
	public static  CMSG_REGULARISE_ACCOUNT :number = 25;	//regularise_account
	/*角色配置信息*/
	public static  CMSG_CHAR_REMOTESTORE :number = 26;	//char_remotestore
	/*角色配置信息*/
	public static  CMSG_CHAR_REMOTESTORE_STR :number = 27;	//char_remotestore_str
	/*传送，如果是C->S，mapid变量请填成传送点ID*/
	public static  CMSG_TELEPORT :number = 28;	//teleport
	/*停止移动*/
	public static  MSG_MOVE_STOP :number = 29;	//move_stop
	/*unit对象移动*/
	public static  MSG_UNIT_MOVE :number = 30;	//unit_move
	/*使用游戏对象*/
	public static  CMSG_USE_GAMEOBJECT :number = 31;	//use_gameobject
	/*包裹操作-交换位置*/
	public static  CMSG_BAG_EXCHANGE_POS :number = 32;	//bag_exchange_pos
	/*包裹操作-销毁物品*/
	public static  CMSG_BAG_DESTROY :number = 33;	//bag_destroy
	/*分割物品*/
	public static  CMSG_BAG_ITEM_SPLIT :number = 34;	//bag_item_split
	/*使用物品*/
	public static  CMSG_BAG_ITEM_USER :number = 35;	//bag_item_user
	/*下发物品冷却*/
	public static  SMSG_BAG_ITEM_COOLDOWN :number = 36;	//bag_item_cooldown
	/*grid中的unit移动整体打包*/
	public static  SMSG_GRID_UNIT_MOVE :number = 37;	//grid_unit_move
	/*grid中的unit移动整体打包2*/
	public static  SMSG_GRID_UNIT_MOVE_2 :number = 38;	//grid_unit_move_2
	/*兑换物品*/
	public static  CMSG_EXCHANGE_ITEM :number = 39;	//exchange_item
	/*背包扩展*/
	public static  CMSG_BAG_EXTENSION :number = 40;	//bag_extension
	/*请求NPC商品列表*/
	public static  CMSG_NPC_GET_GOODS_LIST :number = 41;	//npc_get_goods_list
	/*Npc商品列表*/
	public static  SMSG_NPC_GOODS_LIST :number = 42;	//npc_goods_list
	/*购买商品*/
	public static  CMSG_STORE_BUY :number = 43;	//store_buy
	/*出售物品*/
	public static  CMSG_NPC_SELL :number = 44;	//npc_sell
	/*回购物品*/
	public static  CMSG_NPC_REPURCHASE :number = 45;	//npc_repurchase
	/*时装是否启用*/
	public static  CMSG_AVATAR_FASHION_ENABLE :number = 46;	//avatar_fashion_enable
	/*任务对话选项*/
	public static  CMSG_QUESTHELP_TALK_OPTION :number = 47;	//questhelp_talk_option
	/*与NPC对话获得传送点列表*/
	public static  CMSG_TAXI_HELLO :number = 48;	//taxi_hello
	/*发送传送点列表*/
	public static  SMSG_TAXI_STATIONS_LIST :number = 49;	//taxi_stations_list
	/*选择传送点*/
	public static  CMSG_TAXI_SELECT_STATION :number = 50;	//taxi_select_station
	/*与NPC交流选择选项*/
	public static  CMSG_GOSSIP_SELECT_OPTION :number = 51;	//gossip_select_option
	/*与NPC闲聊获取选项*/
	public static  CMSG_GOSSIP_HELLO :number = 52;	//gossip_hello
	/*发送闲聊信息和选项*/
	public static  SMSG_GOSSIP_MESSAGE :number = 53;	//gossip_message
	/*任务发布者状态查询*/
	public static  CMSG_QUESTGIVER_STATUS_QUERY :number = 54;	//questgiver_status_query
	/*任务NPC状态*/
	public static  SMSG_QUESTGIVER_STATUS :number = 55;	//questgiver_status
	/*查询任务状态*/
	public static  MSG_QUERY_QUEST_STATUS :number = 56;	//query_quest_status
	/*可接任务*/
	public static  CMSG_QUESTHELP_GET_CANACCEPT_LIST :number = 57;	//questhelp_get_canaccept_list
	/*下发可接任务列表*/
	public static  SMSG_QUESTHELP_CANACCEPT_LIST :number = 58;	//questhelp_canaccept_list
	/*任务失败*/
	public static  SMSG_QUESTUPDATE_FAILD :number = 59;	//questupdate_faild
	/*任务条件完成*/
	public static  SMSG_QUESTUPDATE_COMPLETE :number = 60;	//questupdate_complete
	/*放弃任务*/
	public static  CMSG_QUESTLOG_REMOVE_QUEST :number = 61;	//questlog_remove_quest
	/*完成任务*/
	public static  CMSG_QUESTGIVER_COMPLETE_QUEST :number = 62;	//questgiver_complete_quest
	/*完成任务后通知任务链的下个任务*/
	public static  SMSG_QUESTHELP_NEXT :number = 63;	//questhelp_next
	/*任务系统强制完成任务*/
	public static  CMSG_QUESTHELP_COMPLETE :number = 64;	//questhelp_complete
	/*接受任务成功*/
	public static  SMSG_QUESTUPDATE_ACCEPT :number = 65;	//questupdate_accept
	/*更新任务进度_下标数量*/
	public static  CMSG_QUESTHELP_UPDATE_STATUS :number = 66;	//questhelp_update_status
	/*任务已完成*/
	public static  SMSG_QUESTGETTER_COMPLETE :number = 67;	//questgetter_complete
	/*接任务*/
	public static  CMSG_QUESTGIVER_ACCEPT_QUEST :number = 68;	//questgiver_accept_quest
	/*任务使用物品*/
	public static  CMSG_QUESTUPDATE_USE_ITEM :number = 69;	//questupdate_use_item
	/*查询天书任务*/
	public static  CMSG_QUESTHELP_QUERY_BOOK :number = 70;	//questhelp_query_book
	/*下发可接天书任务*/
	public static  SMSG_QUESTHELP_BOOK_QUEST :number = 71;	//questhelp_book_quest
	/*玩家使用游戏对象以后的动作*/
	public static  SMSG_USE_GAMEOBJECT_ACTION :number = 72;	//use_gameobject_action
	/*设置攻击模式*/
	public static  CMSG_SET_ATTACK_MODE :number = 73;	//set_attack_mode
	/*选择目标*/
	public static  MSG_SELECT_TARGET :number = 74;	//select_target
	/*进入战斗*/
	public static  SMSG_COMBAT_STATE_UPDATE :number = 75;	//combat_state_update
	/*经验更新*/
	public static  SMSG_EXP_UPDATE :number = 76;	//exp_update
	/*客户端释放技能*/
	public static  MSG_SPELL_START :number = 77;	//spell_start
	/*施法停止*/
	public static  MSG_SPELL_STOP :number = 78;	//spell_stop
	/*跳*/
	public static  MSG_JUMP :number = 79;	//jump
	/*复活*/
	public static  CMSG_RESURRECTION :number = 80;	//resurrection
	/*交易发出请求*/
	public static  MSG_TRADE_REQUEST :number = 81;	//trade_request
	/*交易请求答复*/
	public static  MSG_TRADE_REPLY :number = 82;	//trade_reply
	/*交易开始*/
	public static  SMSG_TRADE_START :number = 83;	//trade_start
	/*交易确认物品*/
	public static  MSG_TRADE_DECIDE_ITEMS :number = 84;	//trade_decide_items
	/*交易完成*/
	public static  SMSG_TRADE_FINISH :number = 85;	//trade_finish
	/*交易取消*/
	public static  MSG_TRADE_CANCEL :number = 86;	//trade_cancel
	/*交易准备好*/
	public static  MSG_TRADE_READY :number = 87;	//trade_ready
	/*生物讲话*/
	public static  SMSG_CHAT_UNIT_TALK :number = 88;	//chat_unit_talk
	/*就近聊天*/
	public static  CMSG_CHAT_NEAR :number = 89;	//chat_near
	/*私聊*/
	public static  CMSG_CHAT_WHISPER :number = 90;	//chat_whisper
	/*阵营聊天*/
	public static  MSG_CHAT_FACTION :number = 91;	//chat_faction
	/*世界*/
	public static  MSG_CHAT_WORLD :number = 92;	//chat_world
	/*喇叭*/
	public static  MSG_CHAT_HORN :number = 93;	//chat_horn
	/*公告*/
	public static  MSG_CHAT_NOTICE :number = 94;	//chat_notice
	/*查询玩家信息*/
	public static  CMSG_QUERY_PLAYER_INFO :number = 95;	//query_player_info
	/*查询信息对象更新*/
	public static  SMSG_QUERY_RESULT_UPDATE_OBJECT :number = 96;	//query_result_update_object
	/*领取礼包*/
	public static  CMSG_RECEIVE_GIFT_PACKS :number = 97;	//receive_gift_packs
	/*地图对象更新*/
	public static  SMSG_MAP_UPDATE_OBJECT :number = 98;	//map_update_object
	/*战斗信息binlog*/
	public static  SMSG_FIGHTING_INFO_UPDATE_OBJECT :number = 99;	//fighting_info_update_object
	/*战斗信息binlog*/
	public static  SMSG_FIGHTING_INFO_UPDATE_OBJECT_2 :number = 100;	//fighting_info_update_object_2
	/*进入副本*/
	public static  CMSG_INSTANCE_ENTER :number = 101;	//instance_enter
	/*向服务端发送副本进入下一阶段指令*/
	public static  CMSG_INSTANCE_NEXT_STATE :number = 102;	//instance_next_state
	/*副本退出*/
	public static  CMSG_INSTANCE_EXIT :number = 103;	//instance_exit
	/*限时活动领取*/
	public static  CMSG_LIMIT_ACTIVITY_RECEIVE :number = 104;	//limit_activity_receive
	/*杀人啦~~！！！！*/
	public static  SMSG_KILL_MAN :number = 105;	//kill_man
	/*玩家升级*/
	public static  SMSG_PLAYER_UPGRADE :number = 106;	//player_upgrade
	/*仓库存钱*/
	public static  CMSG_WAREHOUSE_SAVE_MONEY :number = 107;	//warehouse_save_money
	/*仓库取钱*/
	public static  CMSG_WAREHOUSE_TAKE_MONEY :number = 108;	//warehouse_take_money
	/*使用元宝操作某事*/
	public static  CMSG_USE_GOLD_OPT :number = 109;	//use_gold_opt
	/*使用铜钱操作某事*/
	public static  CMSG_USE_SILVER_OPT :number = 110;	//use_silver_opt
	/*后台弹窗*/
	public static  SMSG_GM_RIGHTFLOAT :number = 111;	//gm_rightfloat
	/*删除某条后台弹窗*/
	public static  SMSG_DEL_GM_RIGHTFLOAT :number = 112;	//del_gm_rightfloat
	/*应用服同步时间*/
	public static  MSG_SYNC_MSTIME_APP :number = 113;	//sync_mstime_app
	/*玩家打开某个窗口*/
	public static  CMSG_OPEN_WINDOW :number = 114;	//open_window
	/*禁言操作*/
	public static  CMSG_PLAYER_GAG :number = 115;	//player_gag
	/*踢人操作*/
	public static  CMSG_PLAYER_KICKING :number = 116;	//player_kicking
	/*合服通知*/
	public static  SMSG_MERGE_SERVER_MSG :number = 117;	//merge_server_msg
	/*获取排行信息*/
	public static  CMSG_RANK_LIST_QUERY :number = 118;	//rank_list_query
	/*客户端获取排行榜返回结果*/
	public static  SMSG_RANK_LIST_QUERY_RESULT :number = 119;	//rank_list_query_result
	/*客户端热更场景模块后获取uint*/
	public static  CMSG_CLIENT_UPDATE_SCENED :number = 120;	//client_update_scened
	/*数值包*/
	public static  SMSG_NUM_LUA :number = 121;	//num_lua
	/*战利品拾取*/
	public static  CMSG_LOOT_SELECT :number = 122;	//loot_select
	/*通知登录服把玩家传回游戏服*/
	public static  CMSG_GOBACK_TO_GAME_SERVER :number = 123;	//goback_to_game_server
	/*客户端把比赛人员数据传给比赛服*/
	public static  CMSG_WORLD_WAR_CS_PLAYER_INFO :number = 124;	//world_war_CS_player_info
	/*玩家加入或者离开某服务器*/
	public static  SMSG_JOIN_OR_LEAVE_SERVER :number = 125;	//join_or_leave_server
	/*客户端请求跨服人员数据*/
	public static  MSG_WORLD_WAR_SC_PLAYER_INFO :number = 126;	//world_war_SC_player_info
	/*客户端订阅信息*/
	public static  MSG_CLIENTSUBSCRIPTION :number = 127;	//clientSubscription
	/*服务端下发lua脚本*/
	public static  SMSG_LUA_SCRIPT :number = 128;	//lua_script
	/*角色更改信息*/
	public static  CMSG_CHAR_UPDATE_INFO :number = 129;	//char_update_info
	/*通知客户端观察者的视角*/
	public static  SMSG_NOTICE_WATCHER_MAP_INFO :number = 130;	//notice_watcher_map_info
	/*客户端订阅对象信息*/
	public static  CMSG_MODIFY_WATCH :number = 131;	//modify_watch
	/*跨服传送*/
	public static  CMSG_KUAFU_CHUANSONG :number = 132;	//kuafu_chuansong
	/*显示当前装备*/
	public static  CMSG_SHOW_SUIT :number = 133;	//show_suit
	/*显示当前坐标*/
	public static  CMSG_SHOW_POSITION :number = 134;	//show_position
	/*元宝复活*/
	public static  CMSG_GOLD_RESPAWN :number = 135;	//gold_respawn
	/*野外死亡倒计时*/
	public static  SMSG_FIELD_DEATH_COOLDOWN :number = 136;	//field_death_cooldown
	/*商城购买*/
	public static  CMSG_MALL_BUY :number = 137;	//mall_buy
	/*强化*/
	public static  CMSG_STRENGTH :number = 139;	//strength
	/*强化成功*/
	public static  SMSG_STRENGTH_SUCCESS :number = 140;	//strength_success
	/*强制进入*/
	public static  CMSG_FORCEINTO :number = 141;	//forceInto
	/*创建帮派*/
	public static  CMSG_CREATE_FACTION :number = 142;	//create_faction
	/*升级帮派*/
	public static  CMSG_FACTION_UPGRADE :number = 143;	//faction_upgrade
	/*申请加入帮派*/
	public static  CMSG_FACTION_JOIN :number = 144;	//faction_join
	/*申请升级技能*/
	public static  CMSG_RAISE_BASE_SPELL :number = 145;	//raise_base_spell
	/*申请升阶愤怒技能*/
	public static  CMSG_UPGRADE_ANGER_SPELL :number = 146;	//upgrade_anger_spell
	/*申请升级坐骑*/
	public static  CMSG_RAISE_MOUNT :number = 147;	//raise_mount
	/*申请升阶坐骑*/
	public static  CMSG_UPGRADE_MOUNT :number = 148;	//upgrade_mount
	/*申请一键升阶坐骑*/
	public static  CMSG_UPGRADE_MOUNT_ONE_STEP :number = 149;	//upgrade_mount_one_step
	/*申请解锁幻化坐骑*/
	public static  CMSG_ILLUSION_MOUNT_ACTIVE :number = 150;	//illusion_mount_active
	/*申请幻化坐骑*/
	public static  CMSG_ILLUSION_MOUNT :number = 151;	//illusion_mount
	/*坐骑骑乘操作*/
	public static  CMSG_RIDE_MOUNT :number = 152;	//ride_mount
	/*grid中的unit跳跃*/
	public static  SMSG_GRID_UNIT_JUMP :number = 153;	//grid_unit_jump
	/*宝石*/
	public static  CMSG_GEM :number = 154;	//gem
	/*请求切换模式*/
	public static  CMSG_CHANGE_BATTLE_MODE :number = 155;	//change_battle_mode
	/*和平模式CD*/
	public static  SMSG_PEACE_MODE_CD :number = 156;	//peace_mode_cd
	/*激活神兵*/
	public static  CMSG_DIVINE_ACTIVE :number = 157;	//divine_active
	/*激活神兵*/
	public static  CMSG_DIVINE_UPLEV :number = 158;	//divine_uplev
	/*切换神兵*/
	public static  CMSG_DIVINE_SWITCH :number = 159;	//divine_switch
	/*请求跳跃*/
	public static  CMSG_JUMP_START :number = 160;	//jump_start
	/*请求进入vip副本*/
	public static  CMSG_ENTER_VIP_INSTANCE :number = 161;	//enter_vip_instance
	/*请求扫荡vip副本*/
	public static  CMSG_SWEEP_VIP_INSTANCE :number = 162;	//sweep_vip_instance
	/*进行挂机*/
	public static  CMSG_HANG_UP :number = 163;	//hang_up
	/*进行挂机设置*/
	public static  CMSG_HANG_UP_SETTING :number = 164;	//hang_up_setting
	/*请求进入试炼塔副本*/
	public static  CMSG_ENTER_TRIAL_INSTANCE :number = 165;	//enter_trial_instance
	/*扫荡试炼塔副本*/
	public static  CMSG_SWEEP_TRIAL_INSTANCE :number = 166;	//sweep_trial_instance
	/*重置试炼塔*/
	public static  CMSG_RESET_TRIAL_INSTANCE :number = 167;	//reset_trial_instance
	/*扫荡副本奖励*/
	public static  SMSG_SWEEP_INSTANCE_REWARD :number = 168;	//sweep_instance_reward
	/*重进副本*/
	public static  CMSG_REENTER_INSTANCE :number = 169;	//reenter_instance
	/*走马灯信息*/
	public static  SMSG_MERRY_GO_ROUND :number = 170;	//merry_go_round
	/*添加好友*/
	public static  CMSG_SOCIAL_ADD_FRIEND :number = 171;	//social_add_friend
	/*同意添加好友*/
	public static  CMSG_SOCIAL_SUREADD_FRIEND :number = 172;	//social_sureadd_friend
	/*赠送礼物*/
	public static  CMSG_SOCIAL_GIFT_FRIEND :number = 173;	//social_gift_friend
	/*推荐好友列表*/
	public static  CMSG_SOCIAL_RECOMMEND_FRIEND :number = 174;	//social_recommend_friend
	/*推荐好友列表*/
	public static  SMSG_SOCIAL_GET_RECOMMEND_FRIEND :number = 175;	//social_get_recommend_friend
	/*复仇*/
	public static  CMSG_SOCIAL_REVENGE_ENEMY :number = 176;	//social_revenge_enemy
	/*删除好友*/
	public static  CMSG_SOCIAL_DEL_FRIEND :number = 177;	//social_del_friend
	/*回城*/
	public static  CMSG_TELEPORT_MAIN_CITY :number = 178;	//teleport_main_city
	/*不同频道聊天*/
	public static  CMSG_CHAT_BY_CHANNEL :number = 179;	//chat_by_channel
	/*发送聊天*/
	public static  SMSG_SEND_CHAT :number = 180;	//send_chat
	/*清空申请列表*/
	public static  CMSG_SOCIAL_CLEAR_APPLY :number = 181;	//social_clear_apply
	/*设置拒绝接受消息*/
	public static  CMSG_MSG_DECLINE :number = 182;	//msg_decline
	/*帮派列表*/
	public static  SMSG_FACTION_GET_LIST_RESULT :number = 183;	//faction_get_list_result
	/*获取帮派列表*/
	public static  CMSG_FACTION_GETLIST :number = 184;	//faction_getlist
	/*帮派管理*/
	public static  CMSG_FACTION_MANAGER :number = 185;	//faction_manager
	/*帮派成员操作*/
	public static  CMSG_FACTION_MEMBER_OPERATE :number = 186;	//faction_member_operate
	/*快速加入帮派*/
	public static  CMSG_FACTION_FAST_JOIN :number = 187;	//faction_fast_join
	/*通过名字添加好友*/
	public static  CMSG_SOCIAL_ADD_FRIEND_BYNAME :number = 188;	//social_add_friend_byname
	/*读邮件*/
	public static  CMSG_READ_MAIL :number = 190;	//read_mail
	/*领取邮件*/
	public static  CMSG_PICK_MAIL :number = 191;	//pick_mail
	/*删除邮件*/
	public static  CMSG_REMOVE_MAIL :number = 192;	//remove_mail
	/*一键领取邮件*/
	public static  CMSG_PICK_MAIL_ONE_STEP :number = 193;	//pick_mail_one_step
	/*一键删除邮件*/
	public static  CMSG_REMOVE_MAIL_ONE_STEP :number = 194;	//remove_mail_one_step
	/*屏蔽某人*/
	public static  CMSG_BLOCK_CHAT :number = 195;	//block_chat
	/*取消屏蔽*/
	public static  CMSG_CANCEL_BLOCK_CHAT :number = 196;	//cancel_block_chat
	/*使用需要广播的游戏对象*/
	public static  CMSG_USE_BROADCAST_GAMEOBJECT :number = 200;	//use_broadcast_gameobject
	/*世界BOSS报名*/
	public static  CMSG_WORLD_BOSS_ENROLL :number = 201;	//world_boss_enroll
	/*世界BOSS挑战*/
	public static  CMSG_WORLD_BOSS_FIGHT :number = 202;	//world_boss_fight
	/*换线*/
	public static  CMSG_CHANGE_LINE :number = 203;	//change_line
	/*roll世界BOSS箱子*/
	public static  CMSG_ROLL_WORLD_BOSS_TREASURE :number = 204;	//roll_world_boss_treasure
	/*roll点结果*/
	public static  SMSG_ROLL_RESULT :number = 205;	//roll_result
	/*当前BOSS伤害排名*/
	public static  SMSG_BOSS_RANK :number = 206;	//boss_rank
	/*排行榜点赞*/
	public static  CMSG_RANK_ADD_LIKE :number = 207;	//rank_add_like
	/*排行榜点赞结果*/
	public static  SMSG_RANK_ADD_LIKE_RESULT :number = 208;	//rank_add_like_result
	/*进入资源副本*/
	public static  CMSG_RES_INSTANCE_ENTER :number = 210;	//res_instance_enter
	/*扫荡资源副本*/
	public static  CMSG_RES_INSTANCE_SWEEP :number = 211;	//res_instance_sweep
	/*查看本地图的分线号*/
	public static  CMSG_SHOW_MAP_LINE :number = 212;	//show_map_line
	/*返回本地图的分线号信息*/
	public static  SMSG_SEND_MAP_LINE :number = 213;	//send_map_line
	/*获得奖励提示*/
	public static  SMSG_ITEM_NOTICE :number = 214;	//item_notice
	/*传送到某个世界地图*/
	public static  CMSG_TELEPORT_MAP :number = 216;	//teleport_map
	/*传送到野外boss旁边*/
	public static  CMSG_TELEPORT_FIELD_BOSS :number = 217;	//teleport_field_boss
	/*活跃度奖励*/
	public static  CMSG_GET_ACTIVITY_REWARD :number = 218;	//get_activity_reward
	/*成就奖励*/
	public static  CMSG_GET_ACHIEVE_REWARD :number = 220;	//get_achieve_reward
	/*总成就奖励*/
	public static  CMSG_GET_ACHIEVE_ALL_REWARD :number = 221;	//get_achieve_all_reward
	/*装备称号*/
	public static  CMSG_SET_TITLE :number = 222;	//set_title
	/*初始化称号*/
	public static  CMSG_INIT_TITLE :number = 223;	//init_title
	/*领取首充奖励*/
	public static  CMSG_WELFARE_SHOUCHONG_REWARD :number = 224;	//welfare_shouchong_reward
	/*每日签到奖励*/
	public static  CMSG_WELFARE_CHECKIN :number = 225;	//welfare_checkin
	/*累积签到奖励*/
	public static  CMSG_WELFARE_CHECKIN_ALL :number = 226;	//welfare_checkin_all
	/*补签奖励*/
	public static  CMSG_WELFARE_CHECKIN_GETBACK :number = 227;	//welfare_checkin_getback
	/*等级奖励*/
	public static  CMSG_WELFARE_LEVEL :number = 228;	//welfare_level
	/*活动找回奖励*/
	public static  CMSG_WELFARE_ACTIVE_GETBACK :number = 229;	//welfare_active_getback
	/*领取任务奖励*/
	public static  CMSG_PICK_QUEST_REWARD :number = 230;	//pick_quest_reward
	/*和npc对话*/
	public static  CMSG_TALK_WITH_NPC :number = 231;	//talk_with_npc
	/*使用虚拟物品*/
	public static  CMSG_USE_VIRTUAL_ITEM :number = 232;	//use_virtual_item
	/*领取任务章节奖励*/
	public static  CMSG_PICK_QUEST_CHAPTER_REWARD :number = 233;	//pick_quest_chapter_reward
	/*3v3跨服匹配*/
	public static  CMSG_KUAFU_3V3_MATCH :number = 234;	//kuafu_3v3_match
	/*跨服开始匹配*/
	public static  SMSG_KUAFU_MATCH_START :number = 235;	//kuafu_match_start
	/*3v3购买次数*/
	public static  CMSG_KUAFU_3V3_BUYTIMES :number = 236;	//kuafu_3v3_buytimes
	/*3v3每日活跃奖励*/
	public static  CMSG_KUAFU_3V3_DAYREWARD :number = 237;	//kuafu_3v3_dayreward
	/*请求3v3排行榜*/
	public static  CMSG_KUAFU_3V3_GETRANLIST :number = 238;	//kuafu_3v3_getranlist
	/*3v3排行榜结果列表*/
	public static  SMSG_KUAFU_3V3_RANLIST :number = 239;	//kuafu_3v3_ranlist
	/*福利所有奖励列表*/
	public static  CMSG_WELFARE_GETALLLIST_GETBACK :number = 240;	//welfare_getalllist_getback
	/*奖励列表*/
	public static  SMSG_WELFARE_REWARDLIST_GETBACK :number = 241;	//welfare_rewardlist_getback
	/*一键领取所有福利*/
	public static  CMSG_WELFARE_GETALL_GETBACK :number = 242;	//welfare_getall_getback
	/*请求3v3排行榜自己的名次*/
	public static  CMSG_KUAFU_3V3_GETMYRANK :number = 248;	//kuafu_3v3_getmyrank
	/*3v3排行榜自己的名次结果*/
	public static  SMSG_KUAFU_3V3_MYRANK :number = 249;	//kuafu_3v3_myrank
	/*击杀数据*/
	public static  SMSG_KUAFU_3V3_KILL_DETAIL :number = 250;	//kuafu_3v3_kill_detail
	/*跨服匹配等待数据*/
	public static  SMSG_KUAFU_3V3_WAIT_INFO :number = 251;	//kuafu_3v3_wait_info
	/*取消匹配*/
	public static  MSG_KUAFU_3V3_CANCEL_MATCH :number = 252;	//kuafu_3v3_cancel_match
	/*匹配到人&接受或者拒绝*/
	public static  CMSG_KUAFU_3V3_MATCH_OPER :number = 253;	//kuafu_3v3_match_oper
	/*拒绝比赛*/
	public static  SMSG_KUAFU_3V3_DECLINE_MATCH :number = 254;	//kuafu_3v3_decline_match
	/*仙府夺宝跨服匹配*/
	public static  CMSG_KUAFU_XIANFU_MATCH :number = 255;	//kuafu_xianfu_match
	/*单方跨服匹配等待*/
	public static  SMSG_KUAFU_MATCH_WAIT :number = 256;	//kuafu_match_wait
	/*仙府夺宝小地图信息*/
	public static  SMSG_KUAFU_XIANFU_MINIMAP_INFO :number = 257;	//kuafu_xianfu_minimap_info
	/*购买仙府进入券*/
	public static  CMSG_BUY_XIANFU_ITEM :number = 258;	//buy_xianfu_item
	/*随机复活*/
	public static  CMSG_XIANFU_RANDOM_RESPAWN :number = 259;	//xianfu_random_respawn
	/*斗剑台挑战*/
	public static  CMSG_DOUJIANTAI_FIGHT :number = 260;	//doujiantai_fight
	/*斗剑台购买次数*/
	public static  CMSG_DOUJIANTAI_BUYTIME :number = 261;	//doujiantai_buytime
	/*斗剑台清理CD*/
	public static  CMSG_DOUJIANTAI_CLEARCD :number = 262;	//doujiantai_clearcd
	/*斗剑台首胜奖励*/
	public static  CMSG_DOUJIANTAI_FIRST_REWARD :number = 263;	//doujiantai_first_reward
	/*斗剑台挑战对手信息*/
	public static  MSG_DOUJIANTAI_GET_ENEMYS_INFO :number = 265;	//doujiantai_get_enemys_info
	/*斗剑台排行榜*/
	public static  CMSG_DOUJIANTAI_GET_RANK :number = 266;	//doujiantai_get_rank
	/*斗剑台刷新对手*/
	public static  CMSG_DOUJIANTAI_REFRESH_ENEMYS :number = 270;	//doujiantai_refresh_enemys
	/*斗剑台三甲*/
	public static  MSG_DOUJIANTAI_TOP3 :number = 271;	//doujiantai_top3
	/*使用跳点*/
	public static  MSG_USE_JUMP_POINT :number = 272;	//use_jump_point
	/*出售物品*/
	public static  CMSG_BAG_ITEM_SELL :number = 273;	//bag_item_sell
	/*整理物品*/
	public static  CMSG_BAG_ITEM_SORT :number = 274;	//bag_item_sort
	/*提交日常任务*/
	public static  CMSG_SUBMIT_QUEST_DAILY2 :number = 280;	//submit_quest_daily2
	/*属性改变*/
	public static  SMSG_ATTRIBUTE_CHANGED :number = 281;	//attribute_changed
	/*背包有更强装备*/
	public static  SMSG_BAG_FIND_EQUIP_BETTER :number = 282;	//bag_find_equip_better
	/*模块解锁*/
	public static  SMSG_MODULE_ACTIVE :number = 283;	//module_active
	/*领取日常任务奖励*/
	public static  CMSG_PICK_DAILY2_QUEST_REWARD :number = 284;	//pick_daily2_quest_reward
	/*完成当前引导*/
	public static  CMSG_FINISH_NOW_GUIDE :number = 285;	//finish_now_guide
	/*取得修炼场信息*/
	public static  CMSG_GET_CULTIVATION_INFO :number = 286;	//get_cultivation_info
	/*返回修炼场信息*/
	public static  SMSG_UPDATE_CULTIVATION_INFO :number = 287;	//update_cultivation_info
	/*取得当前所有修炼场对手信息*/
	public static  CMSG_GET_CULTIVATION_RIVALS_INFO :number = 288;	//get_cultivation_rivals_info
	/*返回修炼场对手信息*/
	public static  SMSG_UPDATE_CULTIVATION_RIVALS_INFO_LIST :number = 289;	//update_cultivation_rivals_info_list
	/*领取修炼场奖励*/
	public static  CMSG_GET_CULTIVATION_REWARD :number = 290;	//get_cultivation_reward
	/*刷新修炼场对手*/
	public static  CMSG_REFRESH_CULTIVATION_RIVALS :number = 291;	//refresh_cultivation_rivals
	/*掠夺修炼场对手*/
	public static  CMSG_PLUNDER_CULTIVATION_RIVAL :number = 292;	//plunder_cultivation_rival
	/*反击复仇修炼场对手*/
	public static  CMSG_REVENGE_CULTIVATION_RIVAL :number = 293;	//revenge_cultivation_rival
	/*增加修炼场剩余挑战次数*/
	public static  CMSG_BUY_CULTIVATION_LEFT_PLUNDER_COUNT :number = 294;	//buy_cultivation_left_plunder_count
	/*返回修炼场战斗结果*/
	public static  SMSG_SHOW_CULTIVATION_RESULT_LIST :number = 295;	//show_cultivation_result_list
	/*领取登录大礼奖励*/
	public static  CMSG_GET_LOGIN_ACTIVITY_REWARD :number = 296;	//get_login_activity_reward
	/*通知客户端释放蓄力技能*/
	public static  SMSG_CAST_SPELL_START :number = 300;	//cast_spell_start
	/*完成非强制引导的步骤*/
	public static  CMSG_FINISH_OPTIONAL_GUIDE_STEP :number = 301;	//finish_optional_guide_step
	/*执行接到任务以后的命令*/
	public static  CMSG_EXECUTE_QUEST_CMD_AFTER_ACCEPTED :number = 302;	//execute_quest_cmd_after_accepted
	/*通知客户端显示属性*/
	public static  SMSG_SHOW_UNIT_ATTRIBUTE :number = 310;	//show_unit_attribute
	/*返回家族*/
	public static  CMSG_BACK_TO_FAMITY :number = 320;	//back_to_famity
	/*返回家族boss结果*/
	public static  SMSG_FACTION_BOSS_SEND_RESULT :number = 321;	//faction_boss_send_result
	/*挑战boss*/
	public static  CMSG_CHALLANGE_BOSS :number = 322;	//challange_boss
	/*领取离线奖励*/
	public static  CMSG_PICK_OFFLINE_REWARD :number = 325;	//pick_offline_reward
	/*离线奖励结果*/
	public static  SMSG_OFFLINE_REWARD_RESULT :number = 326;	//offline_reward_result
	/*熔炼装备*/
	public static  CMSG_SMELTING_EQUIP :number = 327;	//smelting_equip
	/*上交装备*/
	public static  CMSG_STOREHOUSE_HAND_IN :number = 328;	//storehouse_hand_in
	/*兑换装备*/
	public static  CMSG_STOREHOUSE_EXCHANGE :number = 329;	//storehouse_exchange
	/*销毁装备*/
	public static  CMSG_STOREHOUSE_DESTROY :number = 330;	//storehouse_destroy
	/*赠送礼物*/
	public static  CMSG_SEND_FACTION_GIFT :number = 331;	//send_faction_gift
	/*领取额外奖励*/
	public static  CMSG_GET_FACTION_GIFT_EXREWARD :number = 332;	//get_faction_gift_exreward
	/*领取所有额外奖励*/
	public static  CMSG_GET_ALL_FACTION_GIFT_EXREWARD :number = 333;	//get_all_faction_gift_exreward
	/*返回礼物列表*/
	public static  SMSG_SHOW_FACTION_GIFT_PAGE :number = 334;	//show_faction_gift_page
	/*返回礼物信息*/
	public static  SMSG_SHOW_FACTION_GIFT_INFO :number = 335;	//show_faction_gift_info
	/*返回女王未感谢礼物*/
	public static  SMSG_SHOW_FACTION_GIFT_UNTHANK_PAGE :number = 336;	//show_faction_gift_unthank_page
	/*返回女王历史记录*/
	public static  SMSG_SHOW_FACTION_GIFT_HISTORY_PAGE :number = 337;	//show_faction_gift_history_page
	/*请求家族魅力排行*/
	public static  CMSG_GET_FACTION_GIFT_RANK_PAGE :number = 338;	//get_faction_gift_rank_page
	/*返回家族魅力排行*/
	public static  SMSG_SHOW_FACTION_GIFT_RANK_RESULT_LIST :number = 339;	//show_faction_gift_rank_result_list
	/*返回家族魅力排行变化*/
	public static  SMSG_SHOW_FACTION_GIFT_RANK_CHANGE :number = 340;	//show_faction_gift_rank_change
	/*返回本家族魅力排行*/
	public static  SMSG_SHOW_FACTION_GIFT_RANK_INFO :number = 341;	//show_faction_gift_rank_info
	/*神兵强化*/
	public static  CMSG_DIVINE_FORGE :number = 342;	//divine_forge
	/*神兵升阶*/
	public static  CMSG_DIVINE_ADVANCE :number = 343;	//divine_advance
	/*神兵铸魂*/
	public static  CMSG_DIVINE_SPIRIT :number = 344;	//divine_spirit
	/*查询全民boss信息*/
	public static  CMSG_QUERY_MASS_BOSS_INFO :number = 352;	//query_mass_boss_info
	/*全民boss信息结果*/
	public static  SMSG_MASS_BOSS_INFO_RET :number = 353;	//mass_boss_info_ret
	/*查询全民boss排行榜*/
	public static  CMSG_QUERY_MASS_BOSS_RANK :number = 354;	//query_mass_boss_rank
	/*全民boss排行结果*/
	public static  SMSG_MASS_BOSS_RANK_RESULT :number = 355;	//mass_boss_rank_result
	/*挑战全民boss*/
	public static  CMSG_TRY_MASS_BOSS :number = 356;	//try_mass_boss
	/*购买挑战全民boss次数*/
	public static  CMSG_BUY_MASS_BOSS_TIMES :number = 357;	//buy_mass_boss_times
	/*组队副本跨服匹配*/
	public static  CMSG_GROUP_INSTANCE_MATCH :number = 358;	//group_instance_match
	/*组队副本跨服次数购买*/
	public static  CMSG_BUY_GROUP_INSTANCE_TIMES :number = 359;	//buy_group_instance_times
	/*法宝激活*/
	public static  CMSG_TALISMAN_ACTIVE :number = 360;	//talisman_active
	/*法宝注灵*/
	public static  CMSG_TALISMAN_LVUP :number = 361;	//talisman_lvup
	/*神羽激活*/
	public static  CMSG_WINGS_ACTIVE :number = 362;	//wings_active
	/*神羽祝福*/
	public static  CMSG_WINGS_BLESS :number = 363;	//wings_bless
	/*神羽升阶*/
	public static  CMSG_WINGS_RANKUP :number = 364;	//wings_rankup
	/*神羽强化*/
	public static  CMSG_WINGS_STRENGTH :number = 365;	//wings_strength
	/*经脉修炼*/
	public static  CMSG_MERIDIAN_PRACTISE :number = 366;	//meridian_practise
	/*加经脉修炼经验值*/
	public static  CMSG_ADD_MERIDIAN_EXP :number = 367;	//add_meridian_exp
	/*提升坐骑等级*/
	public static  CMSG_RAISE_MOUNT_LEVEL_BASE :number = 368;	//raise_mount_level_base
	/*解锁坐骑*/
	public static  CMSG_ACTIVE_MOUNT :number = 369;	//active_mount
	/*家族领主挑战输出排行*/
	public static  SMSG_SHOW_FACTION_BOSSDEFENSE_DAMAGE_LIST :number = 370;	//show_faction_bossdefense_damage_list
	/*家族无尽远征扫荡结果*/
	public static  SMSG_SHOW_FACTION_TOWER_SWEEP_LIST :number = 371;	//show_faction_tower_sweep_list
	/*副本结果*/
	public static  SMSG_SEND_INSTANCE_RESULT :number = 375;	//send_instance_result
	/*匹配单人pvp*/
	public static  CMSG_MATCH_SINGLE_PVP :number = 376;	//match_single_pvp
	/*购买单人pvp次数*/
	public static  CMSG_BUY_MATCH_SINGLE_PVP_TIMES :number = 377;	//buy_match_single_pvp_times
	/*领取单人pvp额外奖励*/
	public static  CMSG_PICK_MATCH_SINGLE_PVP_EXTRA_REWARD :number = 378;	//pick_match_single_pvp_extra_reward
	/*装备养成操作*/
	public static  CMSG_EQUIPDEVELOP_OPERATE :number = 380;	//equipdevelop_operate
	/*激活外观*/
	public static  CMSG_ACTIVE_APPEARANCE :number = 381;	//active_appearance
	/*装备外观*/
	public static  CMSG_EQUIP_APPEARANCE :number = 382;	//equip_appearance
	/*取消装备外观*/
	public static  CMSG_CANCEL_EQUIP_APPEARANCE :number = 383;	//cancel_equip_appearance
	/*改名*/
	public static  CMSG_RENAME :number = 384;	//rename
	/*道具解锁称号*/
	public static  CMSG_UNLOCK_TITLE :number = 385;	//unlock_title
	/*购买复仇次数*/
	public static  CMSG_SOCIAL_BUY_REVENGE_TIMES :number = 386;	//social_buy_revenge_times
	/*请求进入世界冒险副本*/
	public static  CMSG_ENTER_RISK_INSTANCE :number = 387;	//enter_risk_instance
	/*删除仇人*/
	public static  CMSG_SOCIAL_REMOVE_ENEMY :number = 388;	//social_remove_enemy
	/*查看玩家详情*/
	public static  CMSG_GET_PLAYER_OVERVIEW :number = 389;	//get_player_overview
	/*返回玩家详情*/
	public static  SMSG_SHOW_PLAYER_OVERVIEW :number = 390;	//show_player_overview
	/*邀请加入帮派*/
	public static  CMSG_SEND_FACTION_INVITE :number = 391;	//send_faction_invite
	/*显示邀请*/
	public static  SMSG_SHOW_FACTION_INVITE :number = 392;	//show_faction_invite
	/*购买vip礼包*/
	public static  CMSG_BUY_VIPGIFT :number = 393;	//buy_vipgift
	/*购买活动每日礼包*/
	public static  CMSG_ACTIVITY_OPT_BUY_DAILYGIFT :number = 394;	//activity_opt_buy_dailygift
	/*抽奖*/
	public static  CMSG_DRAW_LOTTERY :number = 395;	//draw_lottery
	/*获取活动开服排行进度奖励*/
	public static  CMSG_ACTIVITY_OPT_GET_RANK_PROCESS_REWARD :number = 396;	//activity_opt_get_rank_process_reward
	/*获取活动开服排行榜*/
	public static  CMSG_ACTIVITY_OPT_GET_RANK_LIST :number = 397;	//activity_opt_get_rank_list
	/*返回活动开服排行榜*/
	public static  SMSG_ACTIVITY_OPT_SHOW_RANK_LIST :number = 398;	//activity_opt_show_rank_list
	/*购买活动限定礼包*/
	public static  CMSG_ACTIVITY_OPT_BUY_LIMITGIFT :number = 399;	//activity_opt_buy_limitgift
	/*领取累计充值奖励*/
	public static  CMSG_WELFARE_GET_RECHARGE_REWARD :number = 400;	//welfare_get_recharge_reward
	/*领取累计消费奖励*/
	public static  CMSG_WELFARE_GET_CONSUME_REWARD :number = 401;	//welfare_get_consume_reward
	/*领取七日大礼奖励*/
	public static  CMSG_WELFARE_GET_SEVENDAY_REWARD :number = 402;	//welfare_get_sevenday_reward
	/*服务器开服时间*/
	public static  SMSG_SEND_SERVER_OPEN_TIME :number = 403;	//send_server_open_time
	/*请求世界冒险排行榜*/
	public static  CMSG_RISK_GET_RANK :number = 404;	//risk_get_rank
	/*世界冒险排行榜信息 */
	public static  SMSG_RISK_GET_RANK_RESULT :number = 405;	//risk_get_rank_result
	/*设置朝向*/
	public static  CMSG_SET_ORIENT :number = 406;	//set_orient
	/*摇动摇钱树*/
	public static  CMSG_USE_MONEYTREE :number = 407;	//use_moneytree
	/*领取摇钱树礼包*/
	public static  CMSG_GET_MONEYTREE_GIFT :number = 408;	//get_moneytree_gift
	/*修改幻境最后进入id*/
	public static  CMSG_SET_WORLD_RISK_LAST_ID :number = 409;	//set_world_risk_last_id
	/*进入个人Boss*/
	public static  CMSG_ENTER_PRIVATE_BOSS :number = 410;	//enter_private_boss
	/*申请升级全部技能*/
	public static  CMSG_RAISE_BASE_SPELL_ALL :number = 411;	//raise_base_spell_all
	/*使用回复药*/
	public static  CMSG_USE_RESTORE_POTION :number = 413;	//use_restore_potion
	/*提交冒险任务*/
	public static  CMSG_PICK_QUEST_ADVENTURE :number = 414;	//pick_quest_adventure
	/*升级冒险技能*/
	public static  CMSG_RAISE_ADVENTURESPELL :number = 415;	//raise_adventurespell
	/*领取境界任务奖励*/
	public static  CMSG_PICK_QUEST_REALMBREAK :number = 416;	//pick_quest_realmbreak
	/*领取境界每日奖励*/
	public static  CMSG_PICK_REALMBREAK_DAILY_REWARD :number = 417;	//pick_realmbreak_daily_reward
	/*创建队伍*/
	public static  CMSG_GROUP_CREATE :number = 418;	//group_create
	/*申请加入队伍*/
	public static  CMSG_GROUP_JOIN_REQUEST :number = 419;	//group_join_request
	/*同意加入队伍*/
	public static  CMSG_GROUP_JOIN_ACCEPT :number = 420;	//group_join_accept
	/*退出队伍*/
	public static  CMSG_GROUP_QUIT :number = 421;	//group_quit
	/*移交队伍队长*/
	public static  CMSG_GROUP_GIVE_CAPTAIN :number = 422;	//group_give_captain
	/*踢队员*/
	public static  CMSG_GROUP_KICK :number = 423;	//group_kick
	/*显示掉落东西*/
	public static  SMSG_SHOW_LOOT_ANIMATE :number = 424;	//show_loot_animate
	/*进入闯关副本*/
	public static  CMSG_ENTER_STAGE_INSTANCE :number = 425;	//enter_stage_instance
	/*领取闯关副本奖励*/
	public static  CMSG_PICK_STAGE_INSTANCE_BONUS :number = 426;	//pick_stage_instance_bonus
	/*进入组队副本*/
	public static  CMSG_ENTER_GROUP_EXP :number = 427;	//enter_group_exp
	/*队长通知进入某副本*/
	public static  SMSG_CHECK_FOR_GROUP_ENTER :number = 428;	//check_for_group_enter
	/*队伍成员选择AorD*/
	public static  CMSG_SELECT_GROUP_ENTER :number = 429;	//select_group_enter
	/*经验副本次数购买*/
	public static  CMSG_BUY_GROUP_EXP_TIMES :number = 430;	//buy_group_exp_times
	/*购买鼓舞*/
	public static  CMSG_BUY_INSPIRATION :number = 431;	//buy_inspiration
	/*家族战进入*/
	public static  CMSG_ENTER_FACTION_MATCH_MAP :number = 440;	//enter_faction_match_map
	/*领取家族战盟主每日奖励*/
	public static  CMSG_PICK_FACTION_MATCH_CHAMPION_DAILY_REWARD :number = 441;	//pick_faction_match_champion_daily_reward
	/*请求家族战榜单*/
	public static  CMSG_QUERY_FACTION_MATCH_INFO :number = 442;	//query_faction_match_info
	/*返回家族战榜单*/
	public static  SMSG_SHOW_FACTION_MATCH_INFO_LIST :number = 443;	//show_faction_match_info_list
	/*领取资源副本首次通关奖励*/
	public static  CMSG_PICK_RES_INSTANCE_FIRST_REWARD :number = 444;	//pick_res_instance_first_reward
	/*发送组队邀请*/
	public static  CMSG_GROUP_SEND_INVITE :number = 445;	//group_send_invite
	/*显示组队邀请*/
	public static  SMSG_SHOW_GROUP_INVITE :number = 446;	//show_group_invite
	/*同意组队邀请*/
	public static  CMSG_GROUP_AGREE_INVITE :number = 447;	//group_agree_invite
	/*便捷组队队伍列表*/
	public static  CMSG_GET_GROUP_SEARCH_INFO_LIST :number = 448;	//get_group_search_info_list
	/*返回便捷组队队伍列表*/
	public static  SMSG_SHOW_GROUP_SEARCH_INFO_LIST :number = 449;	//show_group_search_info_list
	/*修改组队设置*/
	public static  CMSG_GROUP_CHANGE_CONFIG :number = 450;	//group_change_config
	/*显示玩家入队申请*/
	public static  SMSG_SHOW_GROUP_JOIN_REQUEST :number = 451;	//show_group_join_request
	/*拒绝加入队伍*/
	public static  CMSG_GROUP_JOIN_DENIED :number = 452;	//group_join_denied
	/*拒绝邀请*/
	public static  CMSG_GROUP_INVITE_DENIED :number = 453;	//group_invite_denied
	/*装备法宝*/
	public static  CMSG_TALISMAN_EQUIP :number = 454;	//talisman_equip
	/*卸下法宝*/
	public static  CMSG_TALISMAN_UNEQUIP :number = 455;	//talisman_unequip
	/*回满血*/
	public static  SMSG_FULLIZE_HP :number = 460;	//fullize_hp
	/*自动匹配*/
	public static  CMSG_AUTO_GROUP_MATCH :number = 461;	//auto_group_match
	/*取消自动匹配*/
	public static  CMSG_CANCEL_AUTO_GROUP_MATCH :number = 462;	//cancel_auto_group_match
	/*组队3v3跨服匹配*/
	public static  CMSG_KUAFU_3V3_GROUP_MATCH :number = 463;	//kuafu_3v3_group_match
	/*记录购买订单*/
	public static  CMSG_BOOKING_MONEY :number = 470;	//booking_money
	/*记录购买订单成功*/
	public static  SMSG_BOOKING_MONEY_RESULT :number = 471;	//booking_money_result
	/*一键机器人强化*/
	public static  CMSG_ONE_STEP_ROBOT_UP :number = 472;	//one_step_robot_up
	/*领取7日充值额外奖励*/
	public static  CMSG_GET_SEVEN_DAY_RECHARGE_EXTRA_REWARD :number = 473;	//get_seven_day_recharge_extra_reward
	/*使用兑换码*/
	public static  CMSG_USE_GIFTCODE :number = 474;	//use_giftcode
	/*显示兑换结果*/
	public static  SMSG_SHOW_GIFTCODE_REWARD_LIST :number = 475;	//show_giftcode_reward_list
	/*转盘抽奖*/
	public static  CMSG_LOTTERY_RECHARGE :number = 480;	//lottery_recharge
	/*转盘抽奖结果*/
	public static  SMSG_LOTTERY_RECHARGE_RESULT :number = 481;	//lottery_recharge_result
	/*通知前端释放了持续技能*/
	public static  SMSG_SHOW_CAST_REMAIN_SKILL :number = 482;	//show_cast_remain_skill
	/*角色创建完*/
	public static  SMSG_AFTER_CREATE_ROLE :number = 483;	//after_create_role
	private _FUNCS:Object = new Object();
		
		/**
		 * 获取发送协议函数名称
		 * @param cmd:uint
		 */		
	public getFuncName(cmd:number):string{
		if(this._FUNCS[cmd]){
			return this._FUNCS[cmd];
		}
		return null;
	}
		
	private _send_func:Function;
	private _stream:ByteArray = new ByteArray;
		
		/**
		 * 发送明文数据包（自动加密） 
		 * @param stream
		 */
	public constructor(f:Function){
		this._send_func = f;
		this._stream.endian = Endian.LITTLE_ENDIAN;
			
		this._FUNCS[0] = "null_action";
		this._FUNCS[1] = "ping_pong";
		this._FUNCS[2] = "forced_into";
		this._FUNCS[3] = "get_session";
		this._FUNCS[4] = "route_trace";
		this._FUNCS[5] = "write_client_log";
		this._FUNCS[7] = "sync_mstime";
		this._FUNCS[9] = "ud_control";
		this._FUNCS[15] = "get_chars_list";
		this._FUNCS[17] = "check_name";
		this._FUNCS[19] = "char_create";
		this._FUNCS[21] = "delete_char";
		this._FUNCS[23] = "player_login";
		this._FUNCS[24] = "player_logout";
		this._FUNCS[25] = "regularise_account";
		this._FUNCS[26] = "char_remotestore";
		this._FUNCS[27] = "char_remotestore_str";
		this._FUNCS[28] = "teleport";
		this._FUNCS[29] = "move_stop";
		this._FUNCS[30] = "unit_move";
		this._FUNCS[31] = "use_gameobject";
		this._FUNCS[32] = "bag_exchange_pos";
		this._FUNCS[33] = "bag_destroy";
		this._FUNCS[34] = "bag_item_split";
		this._FUNCS[35] = "bag_item_user";
		this._FUNCS[39] = "exchange_item";
		this._FUNCS[40] = "bag_extension";
		this._FUNCS[41] = "npc_get_goods_list";
		this._FUNCS[43] = "store_buy";
		this._FUNCS[44] = "npc_sell";
		this._FUNCS[45] = "npc_repurchase";
		this._FUNCS[46] = "avatar_fashion_enable";
		this._FUNCS[47] = "questhelp_talk_option";
		this._FUNCS[48] = "taxi_hello";
		this._FUNCS[50] = "taxi_select_station";
		this._FUNCS[51] = "gossip_select_option";
		this._FUNCS[52] = "gossip_hello";
		this._FUNCS[54] = "questgiver_status_query";
		this._FUNCS[56] = "query_quest_status";
		this._FUNCS[57] = "questhelp_get_canaccept_list";
		this._FUNCS[61] = "questlog_remove_quest";
		this._FUNCS[62] = "questgiver_complete_quest";
		this._FUNCS[64] = "questhelp_complete";
		this._FUNCS[66] = "questhelp_update_status";
		this._FUNCS[68] = "questgiver_accept_quest";
		this._FUNCS[69] = "questupdate_use_item";
		this._FUNCS[70] = "questhelp_query_book";
		this._FUNCS[73] = "set_attack_mode";
		this._FUNCS[74] = "select_target";
		this._FUNCS[77] = "spell_start";
		this._FUNCS[78] = "spell_stop";
		this._FUNCS[79] = "jump";
		this._FUNCS[80] = "resurrection";
		this._FUNCS[81] = "trade_request";
		this._FUNCS[82] = "trade_reply";
		this._FUNCS[84] = "trade_decide_items";
		this._FUNCS[86] = "trade_cancel";
		this._FUNCS[87] = "trade_ready";
		this._FUNCS[89] = "chat_near";
		this._FUNCS[90] = "chat_whisper";
		this._FUNCS[91] = "chat_faction";
		this._FUNCS[92] = "chat_world";
		this._FUNCS[93] = "chat_horn";
		this._FUNCS[94] = "chat_notice";
		this._FUNCS[95] = "query_player_info";
		this._FUNCS[97] = "receive_gift_packs";
		this._FUNCS[101] = "instance_enter";
		this._FUNCS[102] = "instance_next_state";
		this._FUNCS[103] = "instance_exit";
		this._FUNCS[104] = "limit_activity_receive";
		this._FUNCS[107] = "warehouse_save_money";
		this._FUNCS[108] = "warehouse_take_money";
		this._FUNCS[109] = "use_gold_opt";
		this._FUNCS[110] = "use_silver_opt";
		this._FUNCS[113] = "sync_mstime_app";
		this._FUNCS[114] = "open_window";
		this._FUNCS[115] = "player_gag";
		this._FUNCS[116] = "player_kicking";
		this._FUNCS[118] = "rank_list_query";
		this._FUNCS[120] = "client_update_scened";
		this._FUNCS[122] = "loot_select";
		this._FUNCS[123] = "goback_to_game_server";
		this._FUNCS[124] = "world_war_CS_player_info";
		this._FUNCS[126] = "world_war_SC_player_info";
		this._FUNCS[127] = "clientSubscription";
		this._FUNCS[129] = "char_update_info";
		this._FUNCS[131] = "modify_watch";
		this._FUNCS[132] = "kuafu_chuansong";
		this._FUNCS[133] = "show_suit";
		this._FUNCS[134] = "show_position";
		this._FUNCS[135] = "gold_respawn";
		this._FUNCS[137] = "mall_buy";
		this._FUNCS[139] = "strength";
		this._FUNCS[141] = "forceInto";
		this._FUNCS[142] = "create_faction";
		this._FUNCS[143] = "faction_upgrade";
		this._FUNCS[144] = "faction_join";
		this._FUNCS[145] = "raise_base_spell";
		this._FUNCS[146] = "upgrade_anger_spell";
		this._FUNCS[147] = "raise_mount";
		this._FUNCS[148] = "upgrade_mount";
		this._FUNCS[149] = "upgrade_mount_one_step";
		this._FUNCS[150] = "illusion_mount_active";
		this._FUNCS[151] = "illusion_mount";
		this._FUNCS[152] = "ride_mount";
		this._FUNCS[154] = "gem";
		this._FUNCS[155] = "change_battle_mode";
		this._FUNCS[157] = "divine_active";
		this._FUNCS[158] = "divine_uplev";
		this._FUNCS[159] = "divine_switch";
		this._FUNCS[160] = "jump_start";
		this._FUNCS[161] = "enter_vip_instance";
		this._FUNCS[162] = "sweep_vip_instance";
		this._FUNCS[163] = "hang_up";
		this._FUNCS[164] = "hang_up_setting";
		this._FUNCS[165] = "enter_trial_instance";
		this._FUNCS[166] = "sweep_trial_instance";
		this._FUNCS[167] = "reset_trial_instance";
		this._FUNCS[169] = "reenter_instance";
		this._FUNCS[171] = "social_add_friend";
		this._FUNCS[172] = "social_sureadd_friend";
		this._FUNCS[173] = "social_gift_friend";
		this._FUNCS[174] = "social_recommend_friend";
		this._FUNCS[176] = "social_revenge_enemy";
		this._FUNCS[177] = "social_del_friend";
		this._FUNCS[178] = "teleport_main_city";
		this._FUNCS[179] = "chat_by_channel";
		this._FUNCS[181] = "social_clear_apply";
		this._FUNCS[182] = "msg_decline";
		this._FUNCS[184] = "faction_getlist";
		this._FUNCS[185] = "faction_manager";
		this._FUNCS[186] = "faction_member_operate";
		this._FUNCS[187] = "faction_fast_join";
		this._FUNCS[188] = "social_add_friend_byname";
		this._FUNCS[190] = "read_mail";
		this._FUNCS[191] = "pick_mail";
		this._FUNCS[192] = "remove_mail";
		this._FUNCS[193] = "pick_mail_one_step";
		this._FUNCS[194] = "remove_mail_one_step";
		this._FUNCS[195] = "block_chat";
		this._FUNCS[196] = "cancel_block_chat";
		this._FUNCS[200] = "use_broadcast_gameobject";
		this._FUNCS[201] = "world_boss_enroll";
		this._FUNCS[202] = "world_boss_fight";
		this._FUNCS[203] = "change_line";
		this._FUNCS[204] = "roll_world_boss_treasure";
		this._FUNCS[207] = "rank_add_like";
		this._FUNCS[210] = "res_instance_enter";
		this._FUNCS[211] = "res_instance_sweep";
		this._FUNCS[212] = "show_map_line";
		this._FUNCS[216] = "teleport_map";
		this._FUNCS[217] = "teleport_field_boss";
		this._FUNCS[218] = "get_activity_reward";
		this._FUNCS[220] = "get_achieve_reward";
		this._FUNCS[221] = "get_achieve_all_reward";
		this._FUNCS[222] = "set_title";
		this._FUNCS[223] = "init_title";
		this._FUNCS[224] = "welfare_shouchong_reward";
		this._FUNCS[225] = "welfare_checkin";
		this._FUNCS[226] = "welfare_checkin_all";
		this._FUNCS[227] = "welfare_checkin_getback";
		this._FUNCS[228] = "welfare_level";
		this._FUNCS[229] = "welfare_active_getback";
		this._FUNCS[230] = "pick_quest_reward";
		this._FUNCS[231] = "talk_with_npc";
		this._FUNCS[232] = "use_virtual_item";
		this._FUNCS[233] = "pick_quest_chapter_reward";
		this._FUNCS[234] = "kuafu_3v3_match";
		this._FUNCS[236] = "kuafu_3v3_buytimes";
		this._FUNCS[237] = "kuafu_3v3_dayreward";
		this._FUNCS[238] = "kuafu_3v3_getranlist";
		this._FUNCS[240] = "welfare_getalllist_getback";
		this._FUNCS[242] = "welfare_getall_getback";
		this._FUNCS[248] = "kuafu_3v3_getmyrank";
		this._FUNCS[252] = "kuafu_3v3_cancel_match";
		this._FUNCS[253] = "kuafu_3v3_match_oper";
		this._FUNCS[255] = "kuafu_xianfu_match";
		this._FUNCS[258] = "buy_xianfu_item";
		this._FUNCS[259] = "xianfu_random_respawn";
		this._FUNCS[260] = "doujiantai_fight";
		this._FUNCS[261] = "doujiantai_buytime";
		this._FUNCS[262] = "doujiantai_clearcd";
		this._FUNCS[263] = "doujiantai_first_reward";
		this._FUNCS[265] = "doujiantai_get_enemys_info";
		this._FUNCS[266] = "doujiantai_get_rank";
		this._FUNCS[270] = "doujiantai_refresh_enemys";
		this._FUNCS[271] = "doujiantai_top3";
		this._FUNCS[272] = "use_jump_point";
		this._FUNCS[273] = "bag_item_sell";
		this._FUNCS[274] = "bag_item_sort";
		this._FUNCS[280] = "submit_quest_daily2";
		this._FUNCS[284] = "pick_daily2_quest_reward";
		this._FUNCS[285] = "finish_now_guide";
		this._FUNCS[286] = "get_cultivation_info";
		this._FUNCS[288] = "get_cultivation_rivals_info";
		this._FUNCS[290] = "get_cultivation_reward";
		this._FUNCS[291] = "refresh_cultivation_rivals";
		this._FUNCS[292] = "plunder_cultivation_rival";
		this._FUNCS[293] = "revenge_cultivation_rival";
		this._FUNCS[294] = "buy_cultivation_left_plunder_count";
		this._FUNCS[296] = "get_login_activity_reward";
		this._FUNCS[301] = "finish_optional_guide_step";
		this._FUNCS[302] = "execute_quest_cmd_after_accepted";
		this._FUNCS[320] = "back_to_famity";
		this._FUNCS[322] = "challange_boss";
		this._FUNCS[325] = "pick_offline_reward";
		this._FUNCS[327] = "smelting_equip";
		this._FUNCS[328] = "storehouse_hand_in";
		this._FUNCS[329] = "storehouse_exchange";
		this._FUNCS[330] = "storehouse_destroy";
		this._FUNCS[331] = "send_faction_gift";
		this._FUNCS[332] = "get_faction_gift_exreward";
		this._FUNCS[333] = "get_all_faction_gift_exreward";
		this._FUNCS[338] = "get_faction_gift_rank_page";
		this._FUNCS[342] = "divine_forge";
		this._FUNCS[343] = "divine_advance";
		this._FUNCS[344] = "divine_spirit";
		this._FUNCS[352] = "query_mass_boss_info";
		this._FUNCS[354] = "query_mass_boss_rank";
		this._FUNCS[356] = "try_mass_boss";
		this._FUNCS[357] = "buy_mass_boss_times";
		this._FUNCS[358] = "group_instance_match";
		this._FUNCS[359] = "buy_group_instance_times";
		this._FUNCS[360] = "talisman_active";
		this._FUNCS[361] = "talisman_lvup";
		this._FUNCS[362] = "wings_active";
		this._FUNCS[363] = "wings_bless";
		this._FUNCS[364] = "wings_rankup";
		this._FUNCS[365] = "wings_strength";
		this._FUNCS[366] = "meridian_practise";
		this._FUNCS[367] = "add_meridian_exp";
		this._FUNCS[368] = "raise_mount_level_base";
		this._FUNCS[369] = "active_mount";
		this._FUNCS[376] = "match_single_pvp";
		this._FUNCS[377] = "buy_match_single_pvp_times";
		this._FUNCS[378] = "pick_match_single_pvp_extra_reward";
		this._FUNCS[380] = "equipdevelop_operate";
		this._FUNCS[381] = "active_appearance";
		this._FUNCS[382] = "equip_appearance";
		this._FUNCS[383] = "cancel_equip_appearance";
		this._FUNCS[384] = "rename";
		this._FUNCS[385] = "unlock_title";
		this._FUNCS[386] = "social_buy_revenge_times";
		this._FUNCS[387] = "enter_risk_instance";
		this._FUNCS[388] = "social_remove_enemy";
		this._FUNCS[389] = "get_player_overview";
		this._FUNCS[391] = "send_faction_invite";
		this._FUNCS[393] = "buy_vipgift";
		this._FUNCS[394] = "activity_opt_buy_dailygift";
		this._FUNCS[395] = "draw_lottery";
		this._FUNCS[396] = "activity_opt_get_rank_process_reward";
		this._FUNCS[397] = "activity_opt_get_rank_list";
		this._FUNCS[399] = "activity_opt_buy_limitgift";
		this._FUNCS[400] = "welfare_get_recharge_reward";
		this._FUNCS[401] = "welfare_get_consume_reward";
		this._FUNCS[402] = "welfare_get_sevenday_reward";
		this._FUNCS[404] = "risk_get_rank";
		this._FUNCS[406] = "set_orient";
		this._FUNCS[407] = "use_moneytree";
		this._FUNCS[408] = "get_moneytree_gift";
		this._FUNCS[409] = "set_world_risk_last_id";
		this._FUNCS[410] = "enter_private_boss";
		this._FUNCS[411] = "raise_base_spell_all";
		this._FUNCS[413] = "use_restore_potion";
		this._FUNCS[414] = "pick_quest_adventure";
		this._FUNCS[415] = "raise_adventurespell";
		this._FUNCS[416] = "pick_quest_realmbreak";
		this._FUNCS[417] = "pick_realmbreak_daily_reward";
		this._FUNCS[418] = "group_create";
		this._FUNCS[419] = "group_join_request";
		this._FUNCS[420] = "group_join_accept";
		this._FUNCS[421] = "group_quit";
		this._FUNCS[422] = "group_give_captain";
		this._FUNCS[423] = "group_kick";
		this._FUNCS[425] = "enter_stage_instance";
		this._FUNCS[426] = "pick_stage_instance_bonus";
		this._FUNCS[427] = "enter_group_exp";
		this._FUNCS[429] = "select_group_enter";
		this._FUNCS[430] = "buy_group_exp_times";
		this._FUNCS[431] = "buy_inspiration";
		this._FUNCS[440] = "enter_faction_match_map";
		this._FUNCS[441] = "pick_faction_match_champion_daily_reward";
		this._FUNCS[442] = "query_faction_match_info";
		this._FUNCS[444] = "pick_res_instance_first_reward";
		this._FUNCS[445] = "group_send_invite";
		this._FUNCS[447] = "group_agree_invite";
		this._FUNCS[448] = "get_group_search_info_list";
		this._FUNCS[450] = "group_change_config";
		this._FUNCS[452] = "group_join_denied";
		this._FUNCS[453] = "group_invite_denied";
		this._FUNCS[454] = "talisman_equip";
		this._FUNCS[455] = "talisman_unequip";
		this._FUNCS[461] = "auto_group_match";
		this._FUNCS[462] = "cancel_auto_group_match";
		this._FUNCS[463] = "kuafu_3v3_group_match";
		this._FUNCS[470] = "booking_money";
		this._FUNCS[472] = "one_step_robot_up";
		this._FUNCS[473] = "get_seven_day_recharge_extra_reward";
		this._FUNCS[474] = "use_giftcode";
		this._FUNCS[480] = "lottery_recharge";
	}
		
	public null_action ():void{
		this._stream.reset();
		this._stream.optcode = 0;
		this._stream.writeUint16( 0 );
		this._send_func(this._stream);			
	}
	public ping_pong ():void{
		this._stream.reset();
		this._stream.optcode = 1;
		this._stream.writeUint16( 1 );
		this._send_func(this._stream);			
	}
	public forced_into ():void{
		this._stream.reset();
		this._stream.optcode = 2;
		this._stream.writeUint16( 2 );
		this._send_func(this._stream);			
	}
	public get_session ( sessionkey :string  ,account :string  ,version :string ):void{
		this._stream.reset();
		this._stream.optcode = 3;
		this._stream.writeUint16( 3 );
			//
		this._stream.writeString (sessionkey);		
			//玩家id
		this._stream.writeString (account);		
			//版本
		this._stream.writeString (version);		
		this._send_func(this._stream);			
	}
	public route_trace ( val :string ):void{
		this._stream.reset();
		this._stream.optcode = 4;
		this._stream.writeUint16( 4 );
			//
		this._stream.writeString (val);		
		this._send_func(this._stream);			
	}
	public write_client_log ( type :number  ,uid :string  ,guid :string  ,log :string ):void{
		this._stream.reset();
		this._stream.optcode = 5;
		this._stream.writeUint16( 5 );
			//类型
		this._stream.writeUint32 (type);		
			//uid
		this._stream.writeString (uid);		
			//guid
		this._stream.writeString (guid);		
			//内容
		this._stream.writeString (log);		
		this._send_func(this._stream);			
	}
	public sync_mstime ( mstime_now :number  ,time_now :number  ,open_time :number ):void{
		this._stream.reset();
		this._stream.optcode = 7;
		this._stream.writeUint16( 7 );
			//服务器运行的毫秒数
		this._stream.writeUint32 (mstime_now);		
			//自然时间
		this._stream.writeUint32 (time_now);		
			//自然时间的服务器启动时间
		this._stream.writeUint32 (open_time);		
		this._send_func(this._stream);			
	}
	public ud_control ():void{
		this._stream.reset();
		this._stream.optcode = 9;
		this._stream.writeUint16( 9 );
		this._send_func(this._stream);			
	}
	public get_chars_list ():void{
		this._stream.reset();
		this._stream.optcode = 15;
		this._stream.writeUint16( 15 );
		this._send_func(this._stream);			
	}
	public check_name ( name :string ):void{
		this._stream.reset();
		this._stream.optcode = 17;
		this._stream.writeUint16( 17 );
			//名称
		this._stream.writeString (name);		
		this._send_func(this._stream);			
	}
	public char_create ( info :char_create_info  ):void{
		this._stream.reset();
		this._stream.optcode = 19;
		this._stream.writeUint16( 19 );
			//角色创建信息
		info .write(this._stream);
		this._send_func(this._stream);			
	}
	public delete_char ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 21;
		this._stream.writeUint16( 21 );
			//玩家ID
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public player_login ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 23;
		this._stream.writeUint16( 23 );
			//玩家ID
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public player_logout ():void{
		this._stream.reset();
		this._stream.optcode = 24;
		this._stream.writeUint16( 24 );
		this._send_func(this._stream);			
	}
	public regularise_account ( uid :string ):void{
		this._stream.reset();
		this._stream.optcode = 25;
		this._stream.writeUint16( 25 );
			//
		this._stream.writeString (uid);		
		this._send_func(this._stream);			
	}
	public char_remotestore ( key :number  ,value :number ):void{
		this._stream.reset();
		this._stream.optcode = 26;
		this._stream.writeUint16( 26 );
			//类型
		this._stream.writeUint32 (key);		
			//配置信息
		this._stream.writeUint32 (value);		
		this._send_func(this._stream);			
	}
	public char_remotestore_str ( key :number  ,value :string ):void{
		this._stream.reset();
		this._stream.optcode = 27;
		this._stream.writeUint16( 27 );
			//类型
		this._stream.writeUint32 (key);		
			//配置信息
		this._stream.writeString (value);		
		this._send_func(this._stream);			
	}
	public teleport ( intGuid :number ):void{
		this._stream.reset();
		this._stream.optcode = 28;
		this._stream.writeUint16( 28 );
			//传送点intGuid
		this._stream.writeUint32 (intGuid);		
		this._send_func(this._stream);			
	}
	public move_stop ( guid :number  ,pos_x :number  ,pos_y :number ):void{
		this._stream.reset();
		this._stream.optcode = 29;
		this._stream.writeUint16( 29 );
			//玩家GUID
		this._stream.writeUint32 (guid);		
			//
		this._stream.writeUint16 (pos_x);		
			//
		this._stream.writeUint16 (pos_y);		
		this._send_func(this._stream);			
	}
	public unit_move ( guid :number  ,pos_x :number  ,pos_y :number  ,path : Array< number >):void{
		this._stream.reset();
		this._stream.optcode = 30;
		this._stream.writeUint16( 30 );
			//怪物GUID
		this._stream.writeUint32 (guid);		
			//
		this._stream.writeUint16 (pos_x);		
			//
		this._stream.writeUint16 (pos_y);		
			//路线
		this._stream.writeUint16(path .length);
		for(var i:number=0;i<path .length;i++){
			this._stream.writeInt8 (path [i]);
		}		
		this._send_func(this._stream);			
	}
	public use_gameobject ( target :number ):void{
		this._stream.reset();
		this._stream.optcode = 31;
		this._stream.writeUint16( 31 );
			//目标
		this._stream.writeUint32 (target);		
		this._send_func(this._stream);			
	}
	public bag_exchange_pos ( src_bag :number  ,src_pos :number  ,dst_bag :number  ,dst_pos :number ):void{
		this._stream.reset();
		this._stream.optcode = 32;
		this._stream.writeUint16( 32 );
			//源包裹
		this._stream.writeUint32 (src_bag);		
			//源位置
		this._stream.writeUint32 (src_pos);		
			//目标包裹
		this._stream.writeUint32 (dst_bag);		
			//目标位置
		this._stream.writeUint32 (dst_pos);		
		this._send_func(this._stream);			
	}
	public bag_destroy ( item_guid :string  ,num :number  ,bag_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 33;
		this._stream.writeUint16( 33 );
			//物品guid
		this._stream.writeString (item_guid);		
			//数量（预留）
		this._stream.writeUint32 (num);		
			//包裹ID
		this._stream.writeUint32 (bag_id);		
		this._send_func(this._stream);			
	}
	public bag_item_split ( bag_id :number  ,src_pos :number  ,count :number  ,dst_pos :number  ,dst_bag :number ):void{
		this._stream.reset();
		this._stream.optcode = 34;
		this._stream.writeUint16( 34 );
			//包裹ID
		this._stream.writeUint8 (bag_id);		
			//切割哪个位置物品
		this._stream.writeUint16 (src_pos);		
			//切割多少出去
		this._stream.writeUint32 (count);		
			//切割到什么位置
		this._stream.writeUint16 (dst_pos);		
			//切割到什么包裹
		this._stream.writeUint8 (dst_bag);		
		this._send_func(this._stream);			
	}
	public bag_item_user ( item_guid :string  ,count :number ):void{
		this._stream.reset();
		this._stream.optcode = 35;
		this._stream.writeUint16( 35 );
			//物品guid
		this._stream.writeString (item_guid);		
			//个数
		this._stream.writeUint32 (count);		
		this._send_func(this._stream);			
	}
	public exchange_item ( entry :number  ,count :number  ,tar_entry :number ):void{
		this._stream.reset();
		this._stream.optcode = 39;
		this._stream.writeUint16( 39 );
			//物品模版
		this._stream.writeUint32 (entry);		
			//兑换数量
		this._stream.writeUint32 (count);		
			//兑换物品模版
		this._stream.writeUint32 (tar_entry);		
		this._send_func(this._stream);			
	}
	public bag_extension ( bag_id :number  ,extension_type :number  ,bag_pos :number ):void{
		this._stream.reset();
		this._stream.optcode = 40;
		this._stream.writeUint16( 40 );
			//包裹
		this._stream.writeUint8 (bag_id);		
			//扩展类型
		this._stream.writeUint8 (extension_type);		
			//开启位置
		this._stream.writeUint32 (bag_pos);		
		this._send_func(this._stream);			
	}
	public npc_get_goods_list ( npc_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 41;
		this._stream.writeUint16( 41 );
			//
		this._stream.writeUint32 (npc_id);		
		this._send_func(this._stream);			
	}
	public store_buy ( id :number  ,count :number ):void{
		this._stream.reset();
		this._stream.optcode = 43;
		this._stream.writeUint16( 43 );
			//商品id
		this._stream.writeUint32 (id);		
			//商品数量
		this._stream.writeUint32 (count);		
		this._send_func(this._stream);			
	}
	public npc_sell ( npc_id :number  ,item_guid :string  ,num :number ):void{
		this._stream.reset();
		this._stream.optcode = 44;
		this._stream.writeUint16( 44 );
			//NPCID
		this._stream.writeUint32 (npc_id);		
			//物品guid
		this._stream.writeString (item_guid);		
			//数量
		this._stream.writeUint32 (num);		
		this._send_func(this._stream);			
	}
	public npc_repurchase ( item_id :string ):void{
		this._stream.reset();
		this._stream.optcode = 45;
		this._stream.writeUint16( 45 );
			//物品guid
		this._stream.writeString (item_id);		
		this._send_func(this._stream);			
	}
	public avatar_fashion_enable ( pos :number ):void{
		this._stream.reset();
		this._stream.optcode = 46;
		this._stream.writeUint16( 46 );
			//时装装备位置
		this._stream.writeUint8 (pos);		
		this._send_func(this._stream);			
	}
	public questhelp_talk_option ( quest_id :number  ,option_id :number  ,value0 :number  ,value1 :number ):void{
		this._stream.reset();
		this._stream.optcode = 47;
		this._stream.writeUint16( 47 );
			//任务ID
		this._stream.writeUint32 (quest_id);		
			//选项ID
		this._stream.writeUint32 (option_id);		
			//
		this._stream.writeInt32 (value0);		
			//
		this._stream.writeInt32 (value1);		
		this._send_func(this._stream);			
	}
	public taxi_hello ( guid :number ):void{
		this._stream.reset();
		this._stream.optcode = 48;
		this._stream.writeUint16( 48 );
			//npc guid
		this._stream.writeUint32 (guid);		
		this._send_func(this._stream);			
	}
	public taxi_select_station ( station_id :number  ,guid :number ):void{
		this._stream.reset();
		this._stream.optcode = 50;
		this._stream.writeUint16( 50 );
			//
		this._stream.writeUint32 (station_id);		
			//
		this._stream.writeUint32 (guid);		
		this._send_func(this._stream);			
	}
	public gossip_select_option ( option :number  ,guid :number  ,unknow :string ):void{
		this._stream.reset();
		this._stream.optcode = 51;
		this._stream.writeUint16( 51 );
			//选项ID
		this._stream.writeUint32 (option);		
			//NPCguid
		this._stream.writeUint32 (guid);		
			//输入值
		this._stream.writeString (unknow);		
		this._send_func(this._stream);			
	}
	public gossip_hello ( guid :number ):void{
		this._stream.reset();
		this._stream.optcode = 52;
		this._stream.writeUint16( 52 );
			//交流目标
		this._stream.writeUint32 (guid);		
		this._send_func(this._stream);			
	}
	public questgiver_status_query ( guid :number ):void{
		this._stream.reset();
		this._stream.optcode = 54;
		this._stream.writeUint16( 54 );
			//NPC GUID
		this._stream.writeUint32 (guid);		
		this._send_func(this._stream);			
	}
	public query_quest_status ( quest_array : Array< quest_status  >):void{
		this._stream.reset();
		this._stream.optcode = 56;
		this._stream.writeUint16( 56 );
			//
		this._stream.writeUint16(quest_array .length);
		for(var i:number=0;i<quest_array .length;i++){
			quest_array [i].write(this._stream);
		}
		this._send_func(this._stream);			
	}
	public questhelp_get_canaccept_list ():void{
		this._stream.reset();
		this._stream.optcode = 57;
		this._stream.writeUint16( 57 );
		this._send_func(this._stream);			
	}
	public questlog_remove_quest ( slot :number  ,reserve :number ):void{
		this._stream.reset();
		this._stream.optcode = 61;
		this._stream.writeUint16( 61 );
			//任务下标位置
		this._stream.writeUint8 (slot);		
			//保留
		this._stream.writeUint64 (reserve);		
		this._send_func(this._stream);			
	}
	public questgiver_complete_quest ( guid :number  ,quest_id :number  ,reward :number ):void{
		this._stream.reset();
		this._stream.optcode = 62;
		this._stream.writeUint16( 62 );
			//NPC_GUID
		this._stream.writeUint32 (guid);		
			//任务ID
		this._stream.writeUint32 (quest_id);		
			//选择奖励项
		this._stream.writeUint8 (reward);		
		this._send_func(this._stream);			
	}
	public questhelp_complete ( quest_id :number  ,quest_statue :number  ,reserve :number ):void{
		this._stream.reset();
		this._stream.optcode = 64;
		this._stream.writeUint16( 64 );
			//任务ID
		this._stream.writeUint32 (quest_id);		
			//任务
		this._stream.writeUint8 (quest_statue);		
			//保留
		this._stream.writeUint8 (reserve);		
		this._send_func(this._stream);			
	}
	public questhelp_update_status ( quest_id :number  ,slot_id :number  ,num :number ):void{
		this._stream.reset();
		this._stream.optcode = 66;
		this._stream.writeUint16( 66 );
			//任务ID
		this._stream.writeUint32 (quest_id);		
			//下标ID
		this._stream.writeUint32 (slot_id);		
			//增加数量
		this._stream.writeUint32 (num);		
		this._send_func(this._stream);			
	}
	public questgiver_accept_quest ( npcid :number  ,quest_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 68;
		this._stream.writeUint16( 68 );
			//npcGUID
		this._stream.writeUint32 (npcid);		
			//
		this._stream.writeUint32 (quest_id);		
		this._send_func(this._stream);			
	}
	public questupdate_use_item ( item_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 69;
		this._stream.writeUint16( 69 );
			//任务物品ID
		this._stream.writeUint32 (item_id);		
		this._send_func(this._stream);			
	}
	public questhelp_query_book ( dynasty :number ):void{
		this._stream.reset();
		this._stream.optcode = 70;
		this._stream.writeUint16( 70 );
			//朝代
		this._stream.writeUint32 (dynasty);		
		this._send_func(this._stream);			
	}
	public set_attack_mode ( mode :number  ,reserve :number ):void{
		this._stream.reset();
		this._stream.optcode = 73;
		this._stream.writeUint16( 73 );
			//模式
		this._stream.writeUint8 (mode);		
			//保留
		this._stream.writeUint64 (reserve);		
		this._send_func(this._stream);			
	}
	public select_target ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 74;
		this._stream.writeUint16( 74 );
			//目标GUID
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public spell_start ( spell_id :number  ,target_pos_x :number  ,target_pos_y :number  ,caster :number  ,target :number ):void{
		this._stream.reset();
		this._stream.optcode = 77;
		this._stream.writeUint16( 77 );
			//技能ID
		this._stream.writeUint32 (spell_id);		
			//
		this._stream.writeUint16 (target_pos_x);		
			//
		this._stream.writeUint16 (target_pos_y);		
			//
		this._stream.writeUint32 (caster);		
			//目标
		this._stream.writeUint32 (target);		
		this._send_func(this._stream);			
	}
	public spell_stop ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 78;
		this._stream.writeUint16( 78 );
			//停止施法者
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public jump ( guid :number  ,pos_x :number  ,pos_y :number ):void{
		this._stream.reset();
		this._stream.optcode = 79;
		this._stream.writeUint16( 79 );
			//跳的对象
		this._stream.writeUint32 (guid);		
			//目的地坐标
		this._stream.writeFloat (pos_x);		
			//
		this._stream.writeFloat (pos_y);		
		this._send_func(this._stream);			
	}
	public resurrection ( type :number  ,reserve :number ):void{
		this._stream.reset();
		this._stream.optcode = 80;
		this._stream.writeUint16( 80 );
			//0:原地复活 1:回城复活
		this._stream.writeUint8 (type);		
			//保留
		this._stream.writeUint64 (reserve);		
		this._send_func(this._stream);			
	}
	public trade_request ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 81;
		this._stream.writeUint16( 81 );
			//被请求人guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public trade_reply ( guid :string  ,reply :number ):void{
		this._stream.reset();
		this._stream.optcode = 82;
		this._stream.writeUint16( 82 );
			//请求交易的人guid
		this._stream.writeString (guid);		
			//0:拒绝1:接受
		this._stream.writeUint8 (reply);		
		this._send_func(this._stream);			
	}
	public trade_decide_items ( items : Array< string > ,gold_ingot :number  ,silver :number ):void{
		this._stream.reset();
		this._stream.optcode = 84;
		this._stream.writeUint16( 84 );
			//确认交易的物品
		if(items .length > 1000)
			throw("StringArray::length max 1000");
		this._stream.writeUint16(items .length);
		for(var i:number=0;i<items .length;i++){
			this._stream.writeString (items [i]);
		}		
			//元宝
		this._stream.writeInt32 (gold_ingot);		
			//银子
		this._stream.writeInt32 (silver);		
		this._send_func(this._stream);			
	}
	public trade_cancel ():void{
		this._stream.reset();
		this._stream.optcode = 86;
		this._stream.writeUint16( 86 );
		this._send_func(this._stream);			
	}
	public trade_ready ():void{
		this._stream.reset();
		this._stream.optcode = 87;
		this._stream.writeUint16( 87 );
		this._send_func(this._stream);			
	}
	public chat_near ( content :string ):void{
		this._stream.reset();
		this._stream.optcode = 89;
		this._stream.writeUint16( 89 );
			//发言内容
		this._stream.writeString (content);		
		this._send_func(this._stream);			
	}
	public chat_whisper ( guid :string  ,content :string ):void{
		this._stream.reset();
		this._stream.optcode = 90;
		this._stream.writeUint16( 90 );
			//玩家id
		this._stream.writeString (guid);		
			//说话内容
		this._stream.writeString (content);		
		this._send_func(this._stream);			
	}
	public chat_faction ( guid :string  ,name :string  ,content :string  ,faction :number ):void{
		this._stream.reset();
		this._stream.optcode = 91;
		this._stream.writeUint16( 91 );
			//玩家id
		this._stream.writeString (guid);		
			//玩家名称
		this._stream.writeString (name);		
			//说话内容
		this._stream.writeString (content);		
			//玩家阵营
		this._stream.writeUint8 (faction);		
		this._send_func(this._stream);			
	}
	public chat_world ( guid :string  ,faction :number  ,name :string  ,content :string ):void{
		this._stream.reset();
		this._stream.optcode = 92;
		this._stream.writeUint16( 92 );
			//玩家guid
		this._stream.writeString (guid);		
			//玩家阵营
		this._stream.writeUint8 (faction);		
			//玩家名称
		this._stream.writeString (name);		
			//说话内容
		this._stream.writeString (content);		
		this._send_func(this._stream);			
	}
	public chat_horn ( guid :string  ,faction :number  ,name :string  ,content :string ):void{
		this._stream.reset();
		this._stream.optcode = 93;
		this._stream.writeUint16( 93 );
			//玩家guid
		this._stream.writeString (guid);		
			//玩家阵营
		this._stream.writeUint8 (faction);		
			//玩家名称
		this._stream.writeString (name);		
			//说话内容
		this._stream.writeString (content);		
		this._send_func(this._stream);			
	}
	public chat_notice ( id :number  ,content :string  ,data :string ):void{
		this._stream.reset();
		this._stream.optcode = 94;
		this._stream.writeUint16( 94 );
			//公告id
		this._stream.writeUint32 (id);		
			//公告内容
		this._stream.writeString (content);		
			//预留参数
		this._stream.writeString (data);		
		this._send_func(this._stream);			
	}
	public query_player_info ( guid :string  ,flag :number  ,callback_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 95;
		this._stream.writeUint16( 95 );
			//玩家guid
		this._stream.writeString (guid);		
			//每一位表示玩家各种信息
		this._stream.writeUint32 (flag);		
			//回调ID
		this._stream.writeUint32 (callback_id);		
		this._send_func(this._stream);			
	}
	public receive_gift_packs ():void{
		this._stream.reset();
		this._stream.optcode = 97;
		this._stream.writeUint16( 97 );
		this._send_func(this._stream);			
	}
	public instance_enter ( instance_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 101;
		this._stream.writeUint16( 101 );
			//副本ID
		this._stream.writeUint32 (instance_id);		
		this._send_func(this._stream);			
	}
	public instance_next_state ( level :number  ,param :number ):void{
		this._stream.reset();
		this._stream.optcode = 102;
		this._stream.writeUint16( 102 );
			//进入关卡
		this._stream.writeUint16 (level);		
			//预留参数
		this._stream.writeUint32 (param);		
		this._send_func(this._stream);			
	}
	public instance_exit ( reserve :number ):void{
		this._stream.reset();
		this._stream.optcode = 103;
		this._stream.writeUint16( 103 );
			//保留
		this._stream.writeUint32 (reserve);		
		this._send_func(this._stream);			
	}
	public limit_activity_receive ( id :number  ,type :number ):void{
		this._stream.reset();
		this._stream.optcode = 104;
		this._stream.writeUint16( 104 );
			//领取id
		this._stream.writeUint32 (id);		
			//领取类型
		this._stream.writeUint32 (type);		
		this._send_func(this._stream);			
	}
	public warehouse_save_money ( money :number  ,money_gold :number  ,money_bills :number ):void{
		this._stream.reset();
		this._stream.optcode = 107;
		this._stream.writeUint16( 107 );
			//多少钱
		this._stream.writeInt32 (money);		
			//多少元宝
		this._stream.writeInt32 (money_gold);		
			//多少银票
		this._stream.writeInt32 (money_bills);		
		this._send_func(this._stream);			
	}
	public warehouse_take_money ( money :number  ,money_gold :number  ,money_bills :number ):void{
		this._stream.reset();
		this._stream.optcode = 108;
		this._stream.writeUint16( 108 );
			//多少钱
		this._stream.writeInt32 (money);		
			//多少元宝
		this._stream.writeInt32 (money_gold);		
			//多少银票
		this._stream.writeInt32 (money_bills);		
		this._send_func(this._stream);			
	}
	public use_gold_opt ( type :number  ,param :string ):void{
		this._stream.reset();
		this._stream.optcode = 109;
		this._stream.writeUint16( 109 );
			//操作类型
		this._stream.writeUint8 (type);		
			//字符串
		this._stream.writeString (param);		
		this._send_func(this._stream);			
	}
	public use_silver_opt ( type :number ):void{
		this._stream.reset();
		this._stream.optcode = 110;
		this._stream.writeUint16( 110 );
			//使用铜钱类型
		this._stream.writeUint8 (type);		
		this._send_func(this._stream);			
	}
	public sync_mstime_app ( mstime_now :number  ,time_now :number  ,open_time :number ):void{
		this._stream.reset();
		this._stream.optcode = 113;
		this._stream.writeUint16( 113 );
			//服务器运行的毫秒数
		this._stream.writeUint32 (mstime_now);		
			//自然时间
		this._stream.writeUint32 (time_now);		
			//自然时间的服务器启动时间
		this._stream.writeUint32 (open_time);		
		this._send_func(this._stream);			
	}
	public open_window ( window_type :number ):void{
		this._stream.reset();
		this._stream.optcode = 114;
		this._stream.writeUint16( 114 );
			//窗口类型
		this._stream.writeUint32 (window_type);		
		this._send_func(this._stream);			
	}
	public player_gag ( player_id :string  ,end_time :number  ,content :string ):void{
		this._stream.reset();
		this._stream.optcode = 115;
		this._stream.writeUint16( 115 );
			//玩家ID
		this._stream.writeString (player_id);		
			//结束时间
		this._stream.writeUint32 (end_time);		
			//禁言理由
		this._stream.writeString (content);		
		this._send_func(this._stream);			
	}
	public player_kicking ( player_id :string ):void{
		this._stream.reset();
		this._stream.optcode = 116;
		this._stream.writeUint16( 116 );
			//玩家ID
		this._stream.writeString (player_id);		
		this._send_func(this._stream);			
	}
	public rank_list_query ( call_back_id :number  ,rank_list_type :number  ,start_index :number  ,end_index :number ):void{
		this._stream.reset();
		this._stream.optcode = 118;
		this._stream.writeUint16( 118 );
			//回调号
		this._stream.writeUint32 (call_back_id);		
			//排行类型
		this._stream.writeUint8 (rank_list_type);		
			//开始
		this._stream.writeUint16 (start_index);		
			//结束
		this._stream.writeUint16 (end_index);		
		this._send_func(this._stream);			
	}
	public client_update_scened ():void{
		this._stream.reset();
		this._stream.optcode = 120;
		this._stream.writeUint16( 120 );
		this._send_func(this._stream);			
	}
	public loot_select ( x :number  ,y :number ):void{
		this._stream.reset();
		this._stream.optcode = 122;
		this._stream.writeUint16( 122 );
			//x
		this._stream.writeUint16 (x);		
			//y
		this._stream.writeUint16 (y);		
		this._send_func(this._stream);			
	}
	public goback_to_game_server ():void{
		this._stream.reset();
		this._stream.optcode = 123;
		this._stream.writeUint16( 123 );
		this._send_func(this._stream);			
	}
	public world_war_CS_player_info ():void{
		this._stream.reset();
		this._stream.optcode = 124;
		this._stream.writeUint16( 124 );
		this._send_func(this._stream);			
	}
	public world_war_SC_player_info ():void{
		this._stream.reset();
		this._stream.optcode = 126;
		this._stream.writeUint16( 126 );
		this._send_func(this._stream);			
	}
	public clientSubscription ( guid :number ):void{
		this._stream.reset();
		this._stream.optcode = 127;
		this._stream.writeUint16( 127 );
			//玩家guid
		this._stream.writeUint32 (guid);		
		this._send_func(this._stream);			
	}
	public char_update_info ( info :char_create_info  ):void{
		this._stream.reset();
		this._stream.optcode = 129;
		this._stream.writeUint16( 129 );
			//角色更改信息
		info .write(this._stream);
		this._send_func(this._stream);			
	}
	public modify_watch ( opt :number  ,cid :number  ,key :string ):void{
		this._stream.reset();
		this._stream.optcode = 131;
		this._stream.writeUint16( 131 );
			//操作类型
		this._stream.writeUint8 (opt);		
			//修改对象订阅
		this._stream.writeUint32 (cid);		
			//订阅key
		this._stream.writeString (key);		
		this._send_func(this._stream);			
	}
	public kuafu_chuansong ( str_data :string  ,watcher_guid :string  ,reserve :number ):void{
		this._stream.reset();
		this._stream.optcode = 132;
		this._stream.writeUint16( 132 );
			//战斗信息
		this._stream.writeString (str_data);		
			//观察者guid
		this._stream.writeString (watcher_guid);		
			//预留参数
		this._stream.writeUint32 (reserve);		
		this._send_func(this._stream);			
	}
	public show_suit ( position :number ):void{
		this._stream.reset();
		this._stream.optcode = 133;
		this._stream.writeUint16( 133 );
			//主背包位置
		this._stream.writeUint8 (position);		
		this._send_func(this._stream);			
	}
	public show_position ( channel :number ):void{
		this._stream.reset();
		this._stream.optcode = 134;
		this._stream.writeUint16( 134 );
			//频道id
		this._stream.writeUint8 (channel);		
		this._send_func(this._stream);			
	}
	public gold_respawn ( useGold :number ):void{
		this._stream.reset();
		this._stream.optcode = 135;
		this._stream.writeUint16( 135 );
			//是否使用元宝
		this._stream.writeUint8 (useGold);		
		this._send_func(this._stream);			
	}
	public mall_buy ( id :number  ,count :number  ,time :number ):void{
		this._stream.reset();
		this._stream.optcode = 137;
		this._stream.writeUint16( 137 );
			//商品序列号
		this._stream.writeUint32 (id);		
			//商品数量
		this._stream.writeUint32 (count);		
			//时效ID
		this._stream.writeUint32 (time);		
		this._send_func(this._stream);			
	}
	public strength ( part :number ):void{
		this._stream.reset();
		this._stream.optcode = 139;
		this._stream.writeUint16( 139 );
			//强化的位置
		this._stream.writeUint8 (part);		
		this._send_func(this._stream);			
	}
	public forceInto ():void{
		this._stream.reset();
		this._stream.optcode = 141;
		this._stream.writeUint16( 141 );
		this._send_func(this._stream);			
	}
	public create_faction ( name :string  ,icon :number ):void{
		this._stream.reset();
		this._stream.optcode = 142;
		this._stream.writeUint16( 142 );
			//帮派名称
		this._stream.writeString (name);		
			//icon
		this._stream.writeUint8 (icon);		
		this._send_func(this._stream);			
	}
	public faction_upgrade ():void{
		this._stream.reset();
		this._stream.optcode = 143;
		this._stream.writeUint16( 143 );
		this._send_func(this._stream);			
	}
	public faction_join ( id :string ):void{
		this._stream.reset();
		this._stream.optcode = 144;
		this._stream.writeUint16( 144 );
			//帮派guid
		this._stream.writeString (id);		
		this._send_func(this._stream);			
	}
	public raise_base_spell ( raiseType :number  ,spellId :number ):void{
		this._stream.reset();
		this._stream.optcode = 145;
		this._stream.writeUint16( 145 );
			//技能类型
		this._stream.writeUint8 (raiseType);		
			//技能ID
		this._stream.writeUint16 (spellId);		
		this._send_func(this._stream);			
	}
	public upgrade_anger_spell ( spellId :number ):void{
		this._stream.reset();
		this._stream.optcode = 146;
		this._stream.writeUint16( 146 );
			//技能ID
		this._stream.writeUint16 (spellId);		
		this._send_func(this._stream);			
	}
	public raise_mount ():void{
		this._stream.reset();
		this._stream.optcode = 147;
		this._stream.writeUint16( 147 );
		this._send_func(this._stream);			
	}
	public upgrade_mount ( useItem :number ):void{
		this._stream.reset();
		this._stream.optcode = 148;
		this._stream.writeUint16( 148 );
			//是否自动使用道具
		this._stream.writeUint8 (useItem);		
		this._send_func(this._stream);			
	}
	public upgrade_mount_one_step ( useItem :number ):void{
		this._stream.reset();
		this._stream.optcode = 149;
		this._stream.writeUint16( 149 );
			//是否自动使用道具
		this._stream.writeUint8 (useItem);		
		this._send_func(this._stream);			
	}
	public illusion_mount_active ( illuId :number ):void{
		this._stream.reset();
		this._stream.optcode = 150;
		this._stream.writeUint16( 150 );
			//幻化坐骑ID
		this._stream.writeUint16 (illuId);		
		this._send_func(this._stream);			
	}
	public illusion_mount ( illuId :number ):void{
		this._stream.reset();
		this._stream.optcode = 151;
		this._stream.writeUint16( 151 );
			//幻化坐骑ID
		this._stream.writeUint16 (illuId);		
		this._send_func(this._stream);			
	}
	public ride_mount ( oper :number ):void{
		this._stream.reset();
		this._stream.optcode = 152;
		this._stream.writeUint16( 152 );
			//1:上&0:下
		this._stream.writeUint8 (oper);		
		this._send_func(this._stream);			
	}
	public gem ( part :number ):void{
		this._stream.reset();
		this._stream.optcode = 154;
		this._stream.writeUint16( 154 );
			//宝石位置
		this._stream.writeUint8 (part);		
		this._send_func(this._stream);			
	}
	public change_battle_mode ( mode :number ):void{
		this._stream.reset();
		this._stream.optcode = 155;
		this._stream.writeUint16( 155 );
			//需要切换的模式
		this._stream.writeUint8 (mode);		
		this._send_func(this._stream);			
	}
	public divine_active ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 157;
		this._stream.writeUint16( 157 );
			//神兵ID
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public divine_uplev ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 158;
		this._stream.writeUint16( 158 );
			//神兵ID
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public divine_switch ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 159;
		this._stream.writeUint16( 159 );
			//神兵ID
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public jump_start ( pos_x :number  ,pos_y :number ):void{
		this._stream.reset();
		this._stream.optcode = 160;
		this._stream.writeUint16( 160 );
			//坐标x
		this._stream.writeUint16 (pos_x);		
			//坐标x
		this._stream.writeUint16 (pos_y);		
		this._send_func(this._stream);			
	}
	public enter_vip_instance ( id :number  ,hard :number ):void{
		this._stream.reset();
		this._stream.optcode = 161;
		this._stream.writeUint16( 161 );
			//vip副本序号id
		this._stream.writeUint16 (id);		
			//vip副本难度
		this._stream.writeUint8 (hard);		
		this._send_func(this._stream);			
	}
	public sweep_vip_instance ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 162;
		this._stream.writeUint16( 162 );
			//vip副本序号id
		this._stream.writeUint16 (id);		
		this._send_func(this._stream);			
	}
	public hang_up ():void{
		this._stream.reset();
		this._stream.optcode = 163;
		this._stream.writeUint16( 163 );
		this._send_func(this._stream);			
	}
	public hang_up_setting ( value0 :number  ,value1 :number  ,value2 :number  ,value3 :number ):void{
		this._stream.reset();
		this._stream.optcode = 164;
		this._stream.writeUint16( 164 );
			//同PLAYER_FIELD_HOOK_BYTE0
		this._stream.writeUint32 (value0);		
			//同PLAYER_FIELD_HOOK_BYTE1
		this._stream.writeUint32 (value1);		
			//同PLAYER_FIELD_HOOK_BYTE2
		this._stream.writeUint32 (value2);		
			//同PLAYER_FIELD_HOOK_BYTE3
		this._stream.writeUint32 (value3);		
		this._send_func(this._stream);			
	}
	public enter_trial_instance ():void{
		this._stream.reset();
		this._stream.optcode = 165;
		this._stream.writeUint16( 165 );
		this._send_func(this._stream);			
	}
	public sweep_trial_instance ():void{
		this._stream.reset();
		this._stream.optcode = 166;
		this._stream.writeUint16( 166 );
		this._send_func(this._stream);			
	}
	public reset_trial_instance ():void{
		this._stream.reset();
		this._stream.optcode = 167;
		this._stream.writeUint16( 167 );
		this._send_func(this._stream);			
	}
	public reenter_instance ():void{
		this._stream.reset();
		this._stream.optcode = 169;
		this._stream.writeUint16( 169 );
		this._send_func(this._stream);			
	}
	public social_add_friend ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 171;
		this._stream.writeUint16( 171 );
			//好友GUID
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public social_sureadd_friend ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 172;
		this._stream.writeUint16( 172 );
			//好友GUID
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public social_gift_friend ( guid :string  ,gift : Array< item_reward_info  >):void{
		this._stream.reset();
		this._stream.optcode = 173;
		this._stream.writeUint16( 173 );
			//好友GUID
		this._stream.writeString (guid);		
			//礼物列表
		this._stream.writeUint16(gift .length);
		for(var i:number=0;i<gift .length;i++){
			gift [i].write(this._stream);
		}
		this._send_func(this._stream);			
	}
	public social_recommend_friend ():void{
		this._stream.reset();
		this._stream.optcode = 174;
		this._stream.writeUint16( 174 );
		this._send_func(this._stream);			
	}
	public social_revenge_enemy ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 176;
		this._stream.writeUint16( 176 );
			//仇人GUID
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public social_del_friend ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 177;
		this._stream.writeUint16( 177 );
			//好友GUID
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public teleport_main_city ():void{
		this._stream.reset();
		this._stream.optcode = 178;
		this._stream.writeUint16( 178 );
		this._send_func(this._stream);			
	}
	public chat_by_channel ( channel :number  ,content :string ):void{
		this._stream.reset();
		this._stream.optcode = 179;
		this._stream.writeUint16( 179 );
			//聊天频道
		this._stream.writeUint8 (channel);		
			//说话内容
		this._stream.writeString (content);		
		this._send_func(this._stream);			
	}
	public social_clear_apply ():void{
		this._stream.reset();
		this._stream.optcode = 181;
		this._stream.writeUint16( 181 );
		this._send_func(this._stream);			
	}
	public msg_decline ( value0 :number  ,value1 :number ):void{
		this._stream.reset();
		this._stream.optcode = 182;
		this._stream.writeUint16( 182 );
			//PLAYER_FIELD_DECLINE_CHANNEL_BYTE0
		this._stream.writeUint32 (value0);		
			//PLAYER_FIELD_DECLINE_CHANNEL_BYTE1
		this._stream.writeUint32 (value1);		
		this._send_func(this._stream);			
	}
	public faction_getlist ( page :number  ,num :number  ,grep :number ):void{
		this._stream.reset();
		this._stream.optcode = 184;
		this._stream.writeUint16( 184 );
			//当前页
		this._stream.writeUint8 (page);		
			//每页数量
		this._stream.writeUint8 (num);		
			//自动过滤
		this._stream.writeUint8 (grep);		
		this._send_func(this._stream);			
	}
	public faction_manager ( opt_type :number  ,reserve_int1 :number  ,reserve_int2 :number  ,reserve_str1 :string  ,reserve_str2 :string ):void{
		this._stream.reset();
		this._stream.optcode = 185;
		this._stream.writeUint16( 185 );
			//操作类型
		this._stream.writeUint8 (opt_type);		
			//预留int值1
		this._stream.writeUint16 (reserve_int1);		
			//预留int值2
		this._stream.writeUint16 (reserve_int2);		
			//预留string值1
		this._stream.writeString (reserve_str1);		
			//预留string值2
		this._stream.writeString (reserve_str2);		
		this._send_func(this._stream);			
	}
	public faction_member_operate ( opt_type :number  ,reserve_int1 :number  ,reserve_int2 :number  ,reserve_str1 :string  ,reserve_str2 :string ):void{
		this._stream.reset();
		this._stream.optcode = 186;
		this._stream.writeUint16( 186 );
			//操作类型
		this._stream.writeUint8 (opt_type);		
			//预留int值1
		this._stream.writeUint16 (reserve_int1);		
			//预留int值2
		this._stream.writeUint16 (reserve_int2);		
			//预留string值1
		this._stream.writeString (reserve_str1);		
			//预留string值2
		this._stream.writeString (reserve_str2);		
		this._send_func(this._stream);			
	}
	public faction_fast_join ():void{
		this._stream.reset();
		this._stream.optcode = 187;
		this._stream.writeUint16( 187 );
		this._send_func(this._stream);			
	}
	public social_add_friend_byname ( name :string ):void{
		this._stream.reset();
		this._stream.optcode = 188;
		this._stream.writeUint16( 188 );
			//好友name
		this._stream.writeString (name);		
		this._send_func(this._stream);			
	}
	public read_mail ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 190;
		this._stream.writeUint16( 190 );
			//邮件索引
		this._stream.writeUint16 (indx);		
		this._send_func(this._stream);			
	}
	public pick_mail ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 191;
		this._stream.writeUint16( 191 );
			//邮件索引
		this._stream.writeUint16 (indx);		
		this._send_func(this._stream);			
	}
	public remove_mail ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 192;
		this._stream.writeUint16( 192 );
			//邮件索引
		this._stream.writeUint16 (indx);		
		this._send_func(this._stream);			
	}
	public pick_mail_one_step ():void{
		this._stream.reset();
		this._stream.optcode = 193;
		this._stream.writeUint16( 193 );
		this._send_func(this._stream);			
	}
	public remove_mail_one_step ():void{
		this._stream.reset();
		this._stream.optcode = 194;
		this._stream.writeUint16( 194 );
		this._send_func(this._stream);			
	}
	public block_chat ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 195;
		this._stream.writeUint16( 195 );
			//人物guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public cancel_block_chat ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 196;
		this._stream.writeUint16( 196 );
			//索引
		this._stream.writeUint8 (indx);		
		this._send_func(this._stream);			
	}
	public use_broadcast_gameobject ( target :number ):void{
		this._stream.reset();
		this._stream.optcode = 200;
		this._stream.writeUint16( 200 );
			//gameobject uintguid
		this._stream.writeUint32 (target);		
		this._send_func(this._stream);			
	}
	public world_boss_enroll ():void{
		this._stream.reset();
		this._stream.optcode = 201;
		this._stream.writeUint16( 201 );
		this._send_func(this._stream);			
	}
	public world_boss_fight ():void{
		this._stream.reset();
		this._stream.optcode = 202;
		this._stream.writeUint16( 202 );
		this._send_func(this._stream);			
	}
	public change_line ( lineNo :number ):void{
		this._stream.reset();
		this._stream.optcode = 203;
		this._stream.writeUint16( 203 );
			//线号
		this._stream.writeUint32 (lineNo);		
		this._send_func(this._stream);			
	}
	public roll_world_boss_treasure ():void{
		this._stream.reset();
		this._stream.optcode = 204;
		this._stream.writeUint16( 204 );
		this._send_func(this._stream);			
	}
	public rank_add_like ( type :number  ,guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 207;
		this._stream.writeUint16( 207 );
			//排行榜类型
		this._stream.writeUint8 (type);		
			//GUID
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public res_instance_enter ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 210;
		this._stream.writeUint16( 210 );
			//副本类型
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public res_instance_sweep ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 211;
		this._stream.writeUint16( 211 );
			//副本类型
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public show_map_line ():void{
		this._stream.reset();
		this._stream.optcode = 212;
		this._stream.writeUint16( 212 );
		this._send_func(this._stream);			
	}
	public teleport_map ( mapid :number  ,lineNo :number ):void{
		this._stream.reset();
		this._stream.optcode = 216;
		this._stream.writeUint16( 216 );
			//地图id
		this._stream.writeUint32 (mapid);		
			//分线号
		this._stream.writeUint32 (lineNo);		
		this._send_func(this._stream);			
	}
	public teleport_field_boss ( mapid :number  ,lineNo :number ):void{
		this._stream.reset();
		this._stream.optcode = 217;
		this._stream.writeUint16( 217 );
			//地图id
		this._stream.writeUint32 (mapid);		
			//分线号
		this._stream.writeUint32 (lineNo);		
		this._send_func(this._stream);			
	}
	public get_activity_reward ( id :number  ,vip :number ):void{
		this._stream.reset();
		this._stream.optcode = 218;
		this._stream.writeUint16( 218 );
			//礼包序号
		this._stream.writeUint8 (id);		
			//vip奖励
		this._stream.writeUint8 (vip);		
		this._send_func(this._stream);			
	}
	public get_achieve_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 220;
		this._stream.writeUint16( 220 );
			//成就序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public get_achieve_all_reward ():void{
		this._stream.reset();
		this._stream.optcode = 221;
		this._stream.writeUint16( 221 );
		this._send_func(this._stream);			
	}
	public set_title ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 222;
		this._stream.writeUint16( 222 );
			//称号序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public init_title ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 223;
		this._stream.writeUint16( 223 );
			//称号序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public welfare_shouchong_reward ():void{
		this._stream.reset();
		this._stream.optcode = 224;
		this._stream.writeUint16( 224 );
		this._send_func(this._stream);			
	}
	public welfare_checkin ():void{
		this._stream.reset();
		this._stream.optcode = 225;
		this._stream.writeUint16( 225 );
		this._send_func(this._stream);			
	}
	public welfare_checkin_all ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 226;
		this._stream.writeUint16( 226 );
			//签到序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public welfare_checkin_getback ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 227;
		this._stream.writeUint16( 227 );
			//签到序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public welfare_level ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 228;
		this._stream.writeUint16( 228 );
			//等级序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public welfare_active_getback ( id :number  ,best :number  ,num :number ):void{
		this._stream.reset();
		this._stream.optcode = 229;
		this._stream.writeUint16( 229 );
			//活动类型
		this._stream.writeUint8 (id);		
			//完美找回
		this._stream.writeUint8 (best);		
			//找回次数
		this._stream.writeUint16 (num);		
		this._send_func(this._stream);			
	}
	public pick_quest_reward ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 230;
		this._stream.writeUint16( 230 );
			//任务序号
		this._stream.writeUint8 (indx);		
		this._send_func(this._stream);			
	}
	public talk_with_npc ( u_guid :number  ,questId :number ):void{
		this._stream.reset();
		this._stream.optcode = 231;
		this._stream.writeUint16( 231 );
			//npc uint guid
		this._stream.writeUint32 (u_guid);		
			//任务id
		this._stream.writeUint16 (questId);		
		this._send_func(this._stream);			
	}
	public use_virtual_item ( entry :number ):void{
		this._stream.reset();
		this._stream.optcode = 232;
		this._stream.writeUint16( 232 );
			//itemid
		this._stream.writeUint16 (entry);		
		this._send_func(this._stream);			
	}
	public pick_quest_chapter_reward ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 233;
		this._stream.writeUint16( 233 );
			//章节id
		this._stream.writeUint8 (indx);		
		this._send_func(this._stream);			
	}
	public kuafu_3v3_match ():void{
		this._stream.reset();
		this._stream.optcode = 234;
		this._stream.writeUint16( 234 );
		this._send_func(this._stream);			
	}
	public kuafu_3v3_buytimes ( num :number ):void{
		this._stream.reset();
		this._stream.optcode = 236;
		this._stream.writeUint16( 236 );
			//购买次数
		this._stream.writeUint8 (num);		
		this._send_func(this._stream);			
	}
	public kuafu_3v3_dayreward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 237;
		this._stream.writeUint16( 237 );
			//购买次数
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public kuafu_3v3_getranlist ():void{
		this._stream.reset();
		this._stream.optcode = 238;
		this._stream.writeUint16( 238 );
		this._send_func(this._stream);			
	}
	public welfare_getalllist_getback ( best :number ):void{
		this._stream.reset();
		this._stream.optcode = 240;
		this._stream.writeUint16( 240 );
			//完美找回
		this._stream.writeUint8 (best);		
		this._send_func(this._stream);			
	}
	public welfare_getall_getback ( best :number ):void{
		this._stream.reset();
		this._stream.optcode = 242;
		this._stream.writeUint16( 242 );
			//完美找回
		this._stream.writeUint8 (best);		
		this._send_func(this._stream);			
	}
	public kuafu_3v3_getmyrank ():void{
		this._stream.reset();
		this._stream.optcode = 248;
		this._stream.writeUint16( 248 );
		this._send_func(this._stream);			
	}
	public kuafu_3v3_cancel_match ( type :number ):void{
		this._stream.reset();
		this._stream.optcode = 252;
		this._stream.writeUint16( 252 );
			//取消匹配跨服类型
		this._stream.writeUint32 (type);		
		this._send_func(this._stream);			
	}
	public kuafu_3v3_match_oper ( oper :number ):void{
		this._stream.reset();
		this._stream.optcode = 253;
		this._stream.writeUint16( 253 );
			//0:取消& 1:接受
		this._stream.writeUint32 (oper);		
		this._send_func(this._stream);			
	}
	public kuafu_xianfu_match ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 255;
		this._stream.writeUint16( 255 );
			//仙府类型
		this._stream.writeUint8 (indx);		
		this._send_func(this._stream);			
	}
	public buy_xianfu_item ( type :number  ,indx :number  ,count :number ):void{
		this._stream.reset();
		this._stream.optcode = 258;
		this._stream.writeUint16( 258 );
			//仙府券类型
		this._stream.writeUint8 (type);		
			//购买类型
		this._stream.writeUint8 (indx);		
			//购买数量
		this._stream.writeUint16 (count);		
		this._send_func(this._stream);			
	}
	public xianfu_random_respawn ():void{
		this._stream.reset();
		this._stream.optcode = 259;
		this._stream.writeUint16( 259 );
		this._send_func(this._stream);			
	}
	public doujiantai_fight ( rank :number ):void{
		this._stream.reset();
		this._stream.optcode = 260;
		this._stream.writeUint16( 260 );
			//排名
		this._stream.writeUint16 (rank);		
		this._send_func(this._stream);			
	}
	public doujiantai_buytime ( num :number ):void{
		this._stream.reset();
		this._stream.optcode = 261;
		this._stream.writeUint16( 261 );
			//排名
		this._stream.writeUint8 (num);		
		this._send_func(this._stream);			
	}
	public doujiantai_clearcd ():void{
		this._stream.reset();
		this._stream.optcode = 262;
		this._stream.writeUint16( 262 );
		this._send_func(this._stream);			
	}
	public doujiantai_first_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 263;
		this._stream.writeUint16( 263 );
			//序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public doujiantai_get_enemys_info ():void{
		this._stream.reset();
		this._stream.optcode = 265;
		this._stream.writeUint16( 265 );
		this._send_func(this._stream);			
	}
	public doujiantai_get_rank ( startIdx :number  ,endIdx :number ):void{
		this._stream.reset();
		this._stream.optcode = 266;
		this._stream.writeUint16( 266 );
			//类型
		this._stream.writeUint16 (startIdx);		
			//类型
		this._stream.writeUint16 (endIdx);		
		this._send_func(this._stream);			
	}
	public doujiantai_refresh_enemys ():void{
		this._stream.reset();
		this._stream.optcode = 270;
		this._stream.writeUint16( 270 );
		this._send_func(this._stream);			
	}
	public doujiantai_top3 ():void{
		this._stream.reset();
		this._stream.optcode = 271;
		this._stream.writeUint16( 271 );
		this._send_func(this._stream);			
	}
	public use_jump_point ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 272;
		this._stream.writeUint16( 272 );
			//跳点id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public bag_item_sell ( item_guid :string  ,count :number ):void{
		this._stream.reset();
		this._stream.optcode = 273;
		this._stream.writeUint16( 273 );
			//物品guid
		this._stream.writeString (item_guid);		
			//个数
		this._stream.writeUint32 (count);		
		this._send_func(this._stream);			
	}
	public bag_item_sort ( bag_type :number ):void{
		this._stream.reset();
		this._stream.optcode = 274;
		this._stream.writeUint16( 274 );
			//背包类型
		this._stream.writeUint32 (bag_type);		
		this._send_func(this._stream);			
	}
	public submit_quest_daily2 ():void{
		this._stream.reset();
		this._stream.optcode = 280;
		this._stream.writeUint16( 280 );
		this._send_func(this._stream);			
	}
	public pick_daily2_quest_reward ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 284;
		this._stream.writeUint16( 284 );
			//任务序号
		this._stream.writeUint8 (indx);		
		this._send_func(this._stream);			
	}
	public finish_now_guide ():void{
		this._stream.reset();
		this._stream.optcode = 285;
		this._stream.writeUint16( 285 );
		this._send_func(this._stream);			
	}
	public get_cultivation_info ():void{
		this._stream.reset();
		this._stream.optcode = 286;
		this._stream.writeUint16( 286 );
		this._send_func(this._stream);			
	}
	public get_cultivation_rivals_info ():void{
		this._stream.reset();
		this._stream.optcode = 288;
		this._stream.writeUint16( 288 );
		this._send_func(this._stream);			
	}
	public get_cultivation_reward ():void{
		this._stream.reset();
		this._stream.optcode = 290;
		this._stream.writeUint16( 290 );
		this._send_func(this._stream);			
	}
	public refresh_cultivation_rivals ():void{
		this._stream.reset();
		this._stream.optcode = 291;
		this._stream.writeUint16( 291 );
		this._send_func(this._stream);			
	}
	public plunder_cultivation_rival ( index :number ):void{
		this._stream.reset();
		this._stream.optcode = 292;
		this._stream.writeUint16( 292 );
			//对手序号
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public revenge_cultivation_rival ( index :number ):void{
		this._stream.reset();
		this._stream.optcode = 293;
		this._stream.writeUint16( 293 );
			//掠夺记录序号
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public buy_cultivation_left_plunder_count ( count :number ):void{
		this._stream.reset();
		this._stream.optcode = 294;
		this._stream.writeUint16( 294 );
			//购买数量
		this._stream.writeUint32 (count);		
		this._send_func(this._stream);			
	}
	public get_login_activity_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 296;
		this._stream.writeUint16( 296 );
			//奖励id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public finish_optional_guide_step ( guide_id :number  ,step :number ):void{
		this._stream.reset();
		this._stream.optcode = 301;
		this._stream.writeUint16( 301 );
			//引导id
		this._stream.writeUint32 (guide_id);		
			//引导分步骤
		this._stream.writeUint8 (step);		
		this._send_func(this._stream);			
	}
	public execute_quest_cmd_after_accepted ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 302;
		this._stream.writeUint16( 302 );
			//任务序号下标
		this._stream.writeUint16 (indx);		
		this._send_func(this._stream);			
	}
	public back_to_famity ():void{
		this._stream.reset();
		this._stream.optcode = 320;
		this._stream.writeUint16( 320 );
		this._send_func(this._stream);			
	}
	public challange_boss ():void{
		this._stream.reset();
		this._stream.optcode = 322;
		this._stream.writeUint16( 322 );
		this._send_func(this._stream);			
	}
	public pick_offline_reward ():void{
		this._stream.reset();
		this._stream.optcode = 325;
		this._stream.writeUint16( 325 );
		this._send_func(this._stream);			
	}
	public smelting_equip ( pos_str :string ):void{
		this._stream.reset();
		this._stream.optcode = 327;
		this._stream.writeUint16( 327 );
			//装备pos 用竖线隔开
		this._stream.writeString (pos_str);		
		this._send_func(this._stream);			
	}
	public storehouse_hand_in ( pos_str :string ):void{
		this._stream.reset();
		this._stream.optcode = 328;
		this._stream.writeUint16( 328 );
			//装备pos 用竖线隔开
		this._stream.writeString (pos_str);		
		this._send_func(this._stream);			
	}
	public storehouse_exchange ( pos :number ):void{
		this._stream.reset();
		this._stream.optcode = 329;
		this._stream.writeUint16( 329 );
			//宝库的pos
		this._stream.writeUint32 (pos);		
		this._send_func(this._stream);			
	}
	public storehouse_destroy ( pos :number ):void{
		this._stream.reset();
		this._stream.optcode = 330;
		this._stream.writeUint16( 330 );
			//宝库的pos
		this._stream.writeUint32 (pos);		
		this._send_func(this._stream);			
	}
	public send_faction_gift ( list : Array< item_reward_info  > ,msg :string  ,msg_type :number ):void{
		this._stream.reset();
		this._stream.optcode = 331;
		this._stream.writeUint16( 331 );
			//礼物list
		this._stream.writeUint16(list .length);
		for(var i:number=0;i<list .length;i++){
			list [i].write(this._stream);
		}
			//留言
		this._stream.writeString (msg);		
			//留言类型
		this._stream.writeUint32 (msg_type);		
		this._send_func(this._stream);			
	}
	public get_faction_gift_exreward ( count_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 332;
		this._stream.writeUint16( 332 );
			//礼物的count_id
		this._stream.writeUint32 (count_id);		
		this._send_func(this._stream);			
	}
	public get_all_faction_gift_exreward ():void{
		this._stream.reset();
		this._stream.optcode = 333;
		this._stream.writeUint16( 333 );
		this._send_func(this._stream);			
	}
	public get_faction_gift_rank_page ( page :number ):void{
		this._stream.reset();
		this._stream.optcode = 338;
		this._stream.writeUint16( 338 );
			//页数
		this._stream.writeUint32 (page);		
		this._send_func(this._stream);			
	}
	public divine_forge ( id :number  ,count :number ):void{
		this._stream.reset();
		this._stream.optcode = 342;
		this._stream.writeUint16( 342 );
			//神兵id
		this._stream.writeUint32 (id);		
			//次数
		this._stream.writeUint32 (count);		
		this._send_func(this._stream);			
	}
	public divine_advance ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 343;
		this._stream.writeUint16( 343 );
			//神兵id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public divine_spirit ( id :number  ,protect :number  ,improve :number ):void{
		this._stream.reset();
		this._stream.optcode = 344;
		this._stream.writeUint16( 344 );
			//神兵id
		this._stream.writeUint32 (id);		
			//失败保护
		this._stream.writeUint32 (protect);		
			//提升概率
		this._stream.writeUint32 (improve);		
		this._send_func(this._stream);			
	}
	public query_mass_boss_info ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 352;
		this._stream.writeUint16( 352 );
			//全民boss编号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public query_mass_boss_rank ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 354;
		this._stream.writeUint16( 354 );
			//全民boss编号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public try_mass_boss ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 356;
		this._stream.writeUint16( 356 );
			//全民boss编号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public buy_mass_boss_times ( cnt :number ):void{
		this._stream.reset();
		this._stream.optcode = 357;
		this._stream.writeUint16( 357 );
			//购买次数
		this._stream.writeUint8 (cnt);		
		this._send_func(this._stream);			
	}
	public group_instance_match ( indx :number  ,isGroup :number ):void{
		this._stream.reset();
		this._stream.optcode = 358;
		this._stream.writeUint16( 358 );
			//组队副本类型
		this._stream.writeUint8 (indx);		
			//是否组队进入
		this._stream.writeUint8 (isGroup);		
		this._send_func(this._stream);			
	}
	public buy_group_instance_times ( count :number ):void{
		this._stream.reset();
		this._stream.optcode = 359;
		this._stream.writeUint16( 359 );
			//数量
		this._stream.writeUint8 (count);		
		this._send_func(this._stream);			
	}
	public talisman_active ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 360;
		this._stream.writeUint16( 360 );
			//法宝id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public talisman_lvup ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 361;
		this._stream.writeUint16( 361 );
			//法宝id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public wings_active ():void{
		this._stream.reset();
		this._stream.optcode = 362;
		this._stream.writeUint16( 362 );
		this._send_func(this._stream);			
	}
	public wings_bless ():void{
		this._stream.reset();
		this._stream.optcode = 363;
		this._stream.writeUint16( 363 );
		this._send_func(this._stream);			
	}
	public wings_rankup ():void{
		this._stream.reset();
		this._stream.optcode = 364;
		this._stream.writeUint16( 364 );
		this._send_func(this._stream);			
	}
	public wings_strength ():void{
		this._stream.reset();
		this._stream.optcode = 365;
		this._stream.writeUint16( 365 );
		this._send_func(this._stream);			
	}
	public meridian_practise ():void{
		this._stream.reset();
		this._stream.optcode = 366;
		this._stream.writeUint16( 366 );
		this._send_func(this._stream);			
	}
	public add_meridian_exp ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 367;
		this._stream.writeUint16( 367 );
			//修炼道具的序号列表
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public raise_mount_level_base ():void{
		this._stream.reset();
		this._stream.optcode = 368;
		this._stream.writeUint16( 368 );
		this._send_func(this._stream);			
	}
	public active_mount ():void{
		this._stream.reset();
		this._stream.optcode = 369;
		this._stream.writeUint16( 369 );
		this._send_func(this._stream);			
	}
	public match_single_pvp ():void{
		this._stream.reset();
		this._stream.optcode = 376;
		this._stream.writeUint16( 376 );
		this._send_func(this._stream);			
	}
	public buy_match_single_pvp_times ( cnt :number ):void{
		this._stream.reset();
		this._stream.optcode = 377;
		this._stream.writeUint16( 377 );
			//购买次数
		this._stream.writeUint8 (cnt);		
		this._send_func(this._stream);			
	}
	public pick_match_single_pvp_extra_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 378;
		this._stream.writeUint16( 378 );
			//领取序号
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public equipdevelop_operate ( opt_type :number  ,reserve_int1 :number  ,reserve_int2 :number  ,reserve_str1 :string  ,reserve_str2 :string ):void{
		this._stream.reset();
		this._stream.optcode = 380;
		this._stream.writeUint16( 380 );
			//操作类型
		this._stream.writeUint8 (opt_type);		
			//预留int值1
		this._stream.writeUint16 (reserve_int1);		
			//预留int值2
		this._stream.writeUint16 (reserve_int2);		
			//预留string值1
		this._stream.writeString (reserve_str1);		
			//预留string值2
		this._stream.writeString (reserve_str2);		
		this._send_func(this._stream);			
	}
	public active_appearance ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 381;
		this._stream.writeUint16( 381 );
			//外观id
		this._stream.writeUint16 (id);		
		this._send_func(this._stream);			
	}
	public equip_appearance ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 382;
		this._stream.writeUint16( 382 );
			//外观id
		this._stream.writeUint16 (id);		
		this._send_func(this._stream);			
	}
	public cancel_equip_appearance ( type :number ):void{
		this._stream.reset();
		this._stream.optcode = 383;
		this._stream.writeUint16( 383 );
			//外观类型
		this._stream.writeUint8 (type);		
		this._send_func(this._stream);			
	}
	public rename ( name :string ):void{
		this._stream.reset();
		this._stream.optcode = 384;
		this._stream.writeUint16( 384 );
			//修改的名称
		this._stream.writeString (name);		
		this._send_func(this._stream);			
	}
	public unlock_title ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 385;
		this._stream.writeUint16( 385 );
			//称号id
		this._stream.writeUint8 (indx);		
		this._send_func(this._stream);			
	}
	public social_buy_revenge_times ( count :number ):void{
		this._stream.reset();
		this._stream.optcode = 386;
		this._stream.writeUint16( 386 );
			//次数
		this._stream.writeUint8 (count);		
		this._send_func(this._stream);			
	}
	public enter_risk_instance ():void{
		this._stream.reset();
		this._stream.optcode = 387;
		this._stream.writeUint16( 387 );
		this._send_func(this._stream);			
	}
	public social_remove_enemy ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 388;
		this._stream.writeUint16( 388 );
			//guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public get_player_overview ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 389;
		this._stream.writeUint16( 389 );
			//玩家id
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public send_faction_invite ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 391;
		this._stream.writeUint16( 391 );
			//玩家id
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public buy_vipgift ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 393;
		this._stream.writeUint16( 393 );
			//礼包id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public activity_opt_buy_dailygift ( act_id :number  ,index :number ):void{
		this._stream.reset();
		this._stream.optcode = 394;
		this._stream.writeUint16( 394 );
			//活动id
		this._stream.writeUint32 (act_id);		
			//礼包下标
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public draw_lottery ( actId :number  ,type :number ):void{
		this._stream.reset();
		this._stream.optcode = 395;
		this._stream.writeUint16( 395 );
			//活动id
		this._stream.writeUint32 (actId);		
			//类型
		this._stream.writeUint8 (type);		
		this._send_func(this._stream);			
	}
	public activity_opt_get_rank_process_reward ( act_id :number  ,index :number ):void{
		this._stream.reset();
		this._stream.optcode = 396;
		this._stream.writeUint16( 396 );
			//活动id
		this._stream.writeUint32 (act_id);		
			//奖励下标
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public activity_opt_get_rank_list ( act_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 397;
		this._stream.writeUint16( 397 );
			//活动id
		this._stream.writeUint32 (act_id);		
		this._send_func(this._stream);			
	}
	public activity_opt_buy_limitgift ( act_id :number  ,index :number ):void{
		this._stream.reset();
		this._stream.optcode = 399;
		this._stream.writeUint16( 399 );
			//活动id
		this._stream.writeUint32 (act_id);		
			//礼包下标
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public welfare_get_recharge_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 400;
		this._stream.writeUint16( 400 );
			//奖励id
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public welfare_get_consume_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 401;
		this._stream.writeUint16( 401 );
			//奖励id
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public welfare_get_sevenday_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 402;
		this._stream.writeUint16( 402 );
			//奖励id
		this._stream.writeUint8 (id);		
		this._send_func(this._stream);			
	}
	public risk_get_rank ():void{
		this._stream.reset();
		this._stream.optcode = 404;
		this._stream.writeUint16( 404 );
		this._send_func(this._stream);			
	}
	public set_orient ( angle :number ):void{
		this._stream.reset();
		this._stream.optcode = 406;
		this._stream.writeUint16( 406 );
			//角度
		this._stream.writeUint16 (angle);		
		this._send_func(this._stream);			
	}
	public use_moneytree ():void{
		this._stream.reset();
		this._stream.optcode = 407;
		this._stream.writeUint16( 407 );
		this._send_func(this._stream);			
	}
	public get_moneytree_gift ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 408;
		this._stream.writeUint16( 408 );
			//礼包id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public set_world_risk_last_id ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 409;
		this._stream.writeUint16( 409 );
			//幻境id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public enter_private_boss ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 410;
		this._stream.writeUint16( 410 );
			//Bossid
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public raise_base_spell_all ( raiseType :number  ,spellIdStr :string ):void{
		this._stream.reset();
		this._stream.optcode = 411;
		this._stream.writeUint16( 411 );
			//技能类型
		this._stream.writeUint8 (raiseType);		
			//技能ID字符串
		this._stream.writeString (spellIdStr);		
		this._send_func(this._stream);			
	}
	public use_restore_potion ():void{
		this._stream.reset();
		this._stream.optcode = 413;
		this._stream.writeUint16( 413 );
		this._send_func(this._stream);			
	}
	public pick_quest_adventure ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 414;
		this._stream.writeUint16( 414 );
			//下标
		this._stream.writeUint32 (indx);		
		this._send_func(this._stream);			
	}
	public raise_adventurespell ( spellId :number ):void{
		this._stream.reset();
		this._stream.optcode = 415;
		this._stream.writeUint16( 415 );
			//技能ID
		this._stream.writeUint32 (spellId);		
		this._send_func(this._stream);			
	}
	public pick_quest_realmbreak ( indx :number ):void{
		this._stream.reset();
		this._stream.optcode = 416;
		this._stream.writeUint16( 416 );
			//下标
		this._stream.writeUint32 (indx);		
		this._send_func(this._stream);			
	}
	public pick_realmbreak_daily_reward ():void{
		this._stream.reset();
		this._stream.optcode = 417;
		this._stream.writeUint16( 417 );
		this._send_func(this._stream);			
	}
	public group_create ( type :number  ,min_lev :number  ,max_lev :number  ,auto_flag :number ):void{
		this._stream.reset();
		this._stream.optcode = 418;
		this._stream.writeUint16( 418 );
			//队伍类型
		this._stream.writeUint32 (type);		
			//队伍最低等级
		this._stream.writeUint32 (min_lev);		
			//队伍最大等级
		this._stream.writeUint32 (max_lev);		
			//队伍自动接受申请 0 关闭 1 打开
		this._stream.writeUint32 (auto_flag);		
		this._send_func(this._stream);			
	}
	public group_join_request ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 419;
		this._stream.writeUint16( 419 );
			//队伍guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public group_join_accept ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 420;
		this._stream.writeUint16( 420 );
			//玩家guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public group_quit ():void{
		this._stream.reset();
		this._stream.optcode = 421;
		this._stream.writeUint16( 421 );
		this._send_func(this._stream);			
	}
	public group_give_captain ( index :number ):void{
		this._stream.reset();
		this._stream.optcode = 422;
		this._stream.writeUint16( 422 );
			//玩家index
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public group_kick ( index :number ):void{
		this._stream.reset();
		this._stream.optcode = 423;
		this._stream.writeUint16( 423 );
			//玩家index
		this._stream.writeUint32 (index);		
		this._send_func(this._stream);			
	}
	public enter_stage_instance ():void{
		this._stream.reset();
		this._stream.optcode = 425;
		this._stream.writeUint16( 425 );
		this._send_func(this._stream);			
	}
	public pick_stage_instance_bonus ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 426;
		this._stream.writeUint16( 426 );
			//宝箱下标
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public enter_group_exp ( isGroup :number ):void{
		this._stream.reset();
		this._stream.optcode = 427;
		this._stream.writeUint16( 427 );
			//是否组队进入
		this._stream.writeUint8 (isGroup);		
		this._send_func(this._stream);			
	}
	public select_group_enter ( choise :number ):void{
		this._stream.reset();
		this._stream.optcode = 429;
		this._stream.writeUint16( 429 );
			//结果
		this._stream.writeUint8 (choise);		
		this._send_func(this._stream);			
	}
	public buy_group_exp_times ( count :number ):void{
		this._stream.reset();
		this._stream.optcode = 430;
		this._stream.writeUint16( 430 );
			//数量
		this._stream.writeUint8 (count);		
		this._send_func(this._stream);			
	}
	public buy_inspiration ( category :number ):void{
		this._stream.reset();
		this._stream.optcode = 431;
		this._stream.writeUint16( 431 );
			//购买类型
		this._stream.writeUint8 (category);		
		this._send_func(this._stream);			
	}
	public enter_faction_match_map ():void{
		this._stream.reset();
		this._stream.optcode = 440;
		this._stream.writeUint16( 440 );
		this._send_func(this._stream);			
	}
	public pick_faction_match_champion_daily_reward ():void{
		this._stream.reset();
		this._stream.optcode = 441;
		this._stream.writeUint16( 441 );
		this._send_func(this._stream);			
	}
	public query_faction_match_info ():void{
		this._stream.reset();
		this._stream.optcode = 442;
		this._stream.writeUint16( 442 );
		this._send_func(this._stream);			
	}
	public pick_res_instance_first_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 444;
		this._stream.writeUint16( 444 );
			//副本id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public group_send_invite ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 445;
		this._stream.writeUint16( 445 );
			//玩家guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public group_agree_invite ( guid :string  ,sendGuid :string ):void{
		this._stream.reset();
		this._stream.optcode = 447;
		this._stream.writeUint16( 447 );
			//队伍guid
		this._stream.writeString (guid);		
			//邀请者guid
		this._stream.writeString (sendGuid);		
		this._send_func(this._stream);			
	}
	public get_group_search_info_list ( type :number ):void{
		this._stream.reset();
		this._stream.optcode = 448;
		this._stream.writeUint16( 448 );
			//队伍类型
		this._stream.writeUint32 (type);		
		this._send_func(this._stream);			
	}
	public group_change_config ( type :number  ,min_lev :number  ,max_lev :number  ,auto_flag :number ):void{
		this._stream.reset();
		this._stream.optcode = 450;
		this._stream.writeUint16( 450 );
			//队伍类型
		this._stream.writeUint32 (type);		
			//队伍最低等级
		this._stream.writeUint32 (min_lev);		
			//队伍最大等级
		this._stream.writeUint32 (max_lev);		
			//队伍自动接受申请 0 关闭 1 打开
		this._stream.writeUint32 (auto_flag);		
		this._send_func(this._stream);			
	}
	public group_join_denied ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 452;
		this._stream.writeUint16( 452 );
			//玩家guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public group_invite_denied ( guid :string ):void{
		this._stream.reset();
		this._stream.optcode = 453;
		this._stream.writeUint16( 453 );
			//队伍guid
		this._stream.writeString (guid);		
		this._send_func(this._stream);			
	}
	public talisman_equip ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 454;
		this._stream.writeUint16( 454 );
			//法宝id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public talisman_unequip ( slot_id :number ):void{
		this._stream.reset();
		this._stream.optcode = 455;
		this._stream.writeUint16( 455 );
			//槽位id
		this._stream.writeUint32 (slot_id);		
		this._send_func(this._stream);			
	}
	public auto_group_match ( targetType :number ):void{
		this._stream.reset();
		this._stream.optcode = 461;
		this._stream.writeUint16( 461 );
			//目标类型
		this._stream.writeUint32 (targetType);		
		this._send_func(this._stream);			
	}
	public cancel_auto_group_match ():void{
		this._stream.reset();
		this._stream.optcode = 462;
		this._stream.writeUint16( 462 );
		this._send_func(this._stream);			
	}
	public kuafu_3v3_group_match ():void{
		this._stream.reset();
		this._stream.optcode = 463;
		this._stream.writeUint16( 463 );
		this._send_func(this._stream);			
	}
	public booking_money ( orderid :string  ,goodsname :string  ,money1 :string  ,goodsnum :number ):void{
		this._stream.reset();
		this._stream.optcode = 470;
		this._stream.writeUint16( 470 );
			//订单号
		this._stream.writeString (orderid);		
			//商品名称
		this._stream.writeString (goodsname);		
			//金额
		this._stream.writeString (money1);		
			//元宝数量
		this._stream.writeUint32 (goodsnum);		
		this._send_func(this._stream);			
	}
	public one_step_robot_up ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 472;
		this._stream.writeUint16( 472 );
			//参数
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public get_seven_day_recharge_extra_reward ( id :number ):void{
		this._stream.reset();
		this._stream.optcode = 473;
		this._stream.writeUint16( 473 );
			//奖励id
		this._stream.writeUint32 (id);		
		this._send_func(this._stream);			
	}
	public use_giftcode ( giftcode :string ):void{
		this._stream.reset();
		this._stream.optcode = 474;
		this._stream.writeUint16( 474 );
			//兑换码
		this._stream.writeString (giftcode);		
		this._send_func(this._stream);			
	}
	public lottery_recharge ():void{
		this._stream.reset();
		this._stream.optcode = 480;
		this._stream.writeUint16( 480 );
		this._send_func(this._stream);			
	}
}
//}