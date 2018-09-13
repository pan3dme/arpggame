class EngineEvent extends BaseEvent {
  public static CREAT_SCENE_EVENT: string = "creat_scene_event";
  public static CREAT_MAINCHAR_EVENT: string = "creat_mainchar_event";
  public static ENTER_SCENE_EVENT: string = "enter_scene_event";



  public static MONEY_CHANGE: string = "MONEY_CHANGE";	// 货币变化
  public static MONEY_TYPE_GOLD_INGOT: string = "MONEY_TYPE_GOLD_INGOT";	// 元宝
  public static MONEY_TYPE_BIND_GOLD: string = "MONEY_TYPE_BIND_GOLD";	// 绑定元宝
  public static MONEY_TYPE_SILVER: string = "MONEY_TYPE_SILVER";	// 身上的银子
  public static MONEY_TYPE_SILVER_WAREHOUSE: string = "MONEY_TYPE_SILVER_WAREHOUSE";	// 仓库的银子
  public static MONEY_TYPE_GOLD_WAREHOUSE: string = "MONEY_TYPE_GOLD_WAREHOUSE";	// 仓库元宝
  public static MONEY_TYPE_BIND_GOLD_WAREHOUSE: string = "MONEY_TYPE_BIND_GOLD_WAREHOUSE";	// 仓库的绑元
  public static MONEY_TYPE_QI: string = "MONEY_TYPE_QI";	// 真气
  public static MONEY_TYPE_BEAST: string = "MONEY_TYPE_BEAST";	// 兽灵
  public static MONEY_TYPE_GEM: string = "MONEY_TYPE_GEM";	// 宝石精华

  public static PLAYER_FIELD_VIP_LEVEL: string = "PLAYER_FIELD_VIP_LEVEL";	// 角色vip等级
  public static PLAYER_FIELD_LEVEL: string = "PLAYER_FIELD_LEVEL";	// 角色等级

  public static PLAYER_FIELD_FORCE: string = "PLAYER_FIELD_FORCE";	// 角色战力
  public static PLAYER_FIELD_DIVINE: string = "PLAYER_FIELD_DIVINE";	// 神兵



  public static PLAYER_EXPAND_INT_XP: string = "PLAYER_EXPAND_INT_XP";	// 经验改变

  public static MAP_INT_FIELD_QUESTS_PROCESS: string = "MAP_INT_FIELD_QUESTS_PROCESS";	// 任务变化


  public static CORE_DATA_CREATED_EVENT: string = "CORE_DATA_CREATED_EVENT";
  public static CORE_DATA_COMPLETE_EVENT: string = "CORE_DATA_COMPLETE_EVENT";
  public static SYSTEM_OPEN_EVENT: string = "SYSTEM_OPEN_EVENT";//新系统开启事件



  public sceneName: string;
  public sceneLoadcomplteFun: Function;
  public sceneProgressFun: Function;
  public sceneAnylsizFun: Function;
}

