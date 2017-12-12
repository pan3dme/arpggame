class GameControlManager {
    private static _instance: GameControlManager;
    public static getInstance(): GameControlManager {
        if (!this._instance) {
            this._instance = new GameControlManager();
        }
        return this._instance;
    }

    private _lastMousePos: Vector3D;
    private _lastFocus: Vector3D;
    private _isMouseDown: boolean;
    private _lock: boolean;

    public constructor() {
        this._lastMousePos = new Vector3D;
        this._lastFocus = new Vector3D;
        this._isMouseDown = false;
        this._lock = false;
        document.addEventListener(MouseType.KeyDown, ($evt: KeyboardEvent) => { this.onKeyDown($evt) })
    }

    public init(): void {
        //if (Scene_data.user == 1) {
        //    return 
        //} 
        //Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        //Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
        //Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);

        //document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) })

        //document.addEventListener(MouseType.KeyUp, ($evt: KeyboardEvent) => { this.onKeyUp($evt) })

    }

    public onMouseMove($evt: InteractiveEvent): void {

        if (this._isMouseDown) {
            Scene_data.focus3D.rotationY = this._lastFocus.y - ($evt.x - this._lastMousePos.x) / 10;
        }

    }
    public onMouseDown($evt: InteractiveEvent): void {

        this._lastMousePos.x = $evt.x;
        this._lastFocus.y = Scene_data.focus3D.rotationY;

        this._isMouseDown = true;

    }
    public onMouseUp($evt: InteractiveEvent): void {
        this._isMouseDown = false;
    }

    public static waitGmItem: Array<string> = new Array;
    public static oneByone(): void {
        if (this.waitGmItem.length) {
            var $str: string = this.waitGmItem[0]
            console.log("gm", SharedDef.CHAT_TYPE_WORLD, $str);
            NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_WORLD, $str)
            TimeUtil.addTimeOut(1500, () => {
                this.waitGmItem.shift()
                this.oneByone()
            });


        }
    }

    public static sendGmCom($str: string): void {

        this.waitGmItem.push($str);
        if (this.waitGmItem.length <= 1) {
            this.oneByone();
        }
        //console.log("gm", SharedDef.CHAT_TYPE_WORLD, $str);
        //NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_WORLD, $str)
    }
    /*
    public playSkillToAttack($vo: tb.SkillDataVo): void {

        MainCharControlModel.getInstance().downMount()
        if (TimeUtil.getTimer() > (AotuSkillManager.lastPlaySkillTime + $vo.tb_skill_base.groupCD)) {
            if (AotuSkillManager.getInstance().aotuBattle) {
                AotuSkillManager.getInstance().aotuBattle = false;
            }
            AotuSkillManager.getInstance().findNearAttackTaget();
            GameInstance.fightSkillSelect = null
            if ($vo.tb_skill_base.lock_type == 1) {  //需要目标
                if (GameInstance.attackTarget) {
                    var $dis: number = Math.ceil(GameInstance.mainChar.math_distance(GameInstance.attackTarget) / 10)
                    if ($dis > $vo.tb_skill_uplevel.distance) {
                        console.log("目标太远", $dis, $vo.tb_skill_uplevel.distance)
                        GameInstance.fightSkillSelect = $vo;
                        return
                    }
                } else {
                    console.log("没有攻击目标")
                }
            }
            console.log("ui来的")
            AotuSkillManager.getInstance().playSkillToAttack($vo);
            if (GameInstance.attackTarget && $vo.tb_skill_base.lock_type == 0) {
                var $dis: number = Math.ceil(GameInstance.mainChar.math_distance(GameInstance.attackTarget) / 10)
                if ($dis > $vo.tb_skill_uplevel.distance) {
                    GameInstance.attackTarget = null;
                }
            }
        } else {
            console.log("时间CD没准备好，备给下一次");
            AotuSkillManager.getInstance().lostSkillVo = $vo
        }

    }
    */

   
    private baseAngle: number
    public onKeyDown($evt: KeyboardEvent): void {
        if (!$evt.shiftKey) {
            if ($evt.keyCode == KeyboardType.G) {
                GameControlManager.sendGmCom("@完成当前主线");
                //  AotuSkillManager.getInstance().jumpTo();

                // MainCharControlModel.getInstance().setSpeedDirect(new Vector3D(1, 0, 0));
                // MainCharControlModel.getInstance().setSpeedDirect(new Vector3D(1, 0, 0));
                //var bsc: SceneChar = GameInstance.mainChar;
                //BloodManager.getInstance().setJumpNum(new Vector3D(bsc.x + random(50) - 25, bsc.y + 30, bsc.z + random(50) - 25),999);

                //var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SYSTEM_OPEN_DATA)
                //$MsgTipEvent.data = PanelClass.SHOW_FUBEN_EVENT
                //ModuleEventManager.dispatchEvent($MsgTipEvent);
                // this.showTopCenterPic()
            }

            if ($evt.keyCode == KeyboardType.T) {
                // ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.AAA));
                // ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.SHOW_MOUNT_EVENT));
                // ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.SHOW_TREASURE_EVENT));
                // ModuleEventManager.dispatchEvent(new stateup.StateUpEvent(stateup.StateUpEvent.SHOW_STATEUP_PANEL));
                ModulePageManager.openNpcPanel(SharedDef.MODULE_ARENA,[4,1],1); 
            }
            if ($evt.keyCode == KeyboardType.Z) {
                this.showEffectsMove()
            }

            if ($evt.keyCode == KeyboardType.R) {
                
                /*
                var $obj: msgtip.MsgPicData = new msgtip.MsgPicData
                $obj.type = 1; //升级
                $obj.info =8
                var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA)
                $MsgTipEvent.data = $obj;
                ModuleEventManager.dispatchEvent($MsgTipEvent);;
                */
               // var v2d: Vector2D = new Vector2D(960 * UIData.Scale, 540 * UIData.Scale);


              
               // AttackEffectsManager.playLyf(getModelUrl("beiji_lyf"), GameInstance.mainChar)
         
                this.upPopTxt()

            }
            if ($evt.keyCode == KeyboardType.U) {
                //  ModulePageManager.openPanel(803); 
                //  ModuleEventManager.dispatchEvent(new adventurebossnotice.AdventureBossNoticeEvent(adventurebossnotice.AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL))

                var a: linklist.LinkListPanel = new linklist.LinkListPanel()
                a.load(() => {
                    UIManager.getInstance().addUIContainer(a);
                }, false);

            }





            if ($evt.keyCode == KeyboardType.Up) {
                Scene_data.cam3D.distance--
            }
            if ($evt.keyCode == KeyboardType.Down) {
                Scene_data.cam3D.distance++
            }
            if ($evt.keyCode == KeyboardType.Left) {
                Engine.sceneCamScale += 0.03;
                Engine.resetViewMatrx3D();
            }
            if ($evt.keyCode == KeyboardType.Right) {
                Engine.sceneCamScale -= 0.03;
                Engine.resetViewMatrx3D();
            }
            console.log("距离", Scene_data.cam3D.distance, "张口", Engine.sceneCamScale);

            return
        }
        if ($evt.keyCode == KeyboardType.Up) {
            msgtip.GuideModel.getInstance().hideGuidePop()

        } else
            if ($evt.keyCode == KeyboardType.B) {
                var evt: charbg.CharBgEvent = new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_CHAR_BG_PANEL);
                evt.showType = 2;//1为背包 2为熔炉
                ModuleEventManager.dispatchEvent(evt);
            } else if ($evt.keyCode == KeyboardType.R) {//R 刷新脚本
                GameControlManager.sendGmCom("@Script")
            } else if ($evt.keyCode == KeyboardType.Q) {
                // ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.SHOW_STRENGTHGEM_PANEL));
            } else if ($evt.keyCode == KeyboardType.X) {
                // ModuleEventManager.dispatchEvent(new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.HIDE_BIEGUIDE_EVENT));
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.HIDE_JOINGAME_EVENT));
            } else if ($evt.keyCode == KeyboardType.Z) {
                //福利系统
                // var a = new kuafu.KuafuPanelModuleEvent(kuafu.KuafuPanelModuleEvent.SHOW_POWERPROMPT_DJ_EVENT);
                // a.data = [999,9999];//[我的战力，敌方战力]
                // ModuleEventManager.dispatchEvent(a);
                // ModuleEventManager.dispatchEvent(new kuafu.DJModuleEvent(kuafu.DJModuleEvent.SHOW_DJREWARD_EVENT));
                // ModuleEventManager.dispatchEvent(new kuafu.KuafuPanelModuleEvent(kuafu.KuafuPanelModuleEvent.SHOW_BUYNUM_DJ_EVENT));

                // ModuleEventManager.dispatchEvent(new stronger.StrongerEvent(stronger.StrongerEvent.SHOW_Stronger_EVENT));

                // ModulePageManager.openPanel(PanelClass.SHOW_bianqiang_PANEL);

                // ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_BOSS_EVENT));
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));

                // GameControlManager.sendGmCom("@假充值 1")

            } else if ($evt.keyCode == KeyboardType.E) {

                //NetManager.getInstance().protocolos.init_title(10);

                //NetManager.getInstance().protocolos.welfare_shouchong_reward();

                //每日签到领奖
                //    NetManager.getInstance().protocolos.welfare_checkin();
                //累计签到领奖
                //NetManager.getInstance().protocolos.welfare_checkin_all(3);
                //升级奖励领取
                //NetManager.getInstance().protocolos.welfare_level(1);
                //找回请求 1是完美，0是普通
                //   NetManager.getInstance().protocolos.welfare_active_getback(1,1,2);
                //福利所有奖励列表 1是完美，0是普通
                // NetManager.getInstance().protocolos.welfare_getalllist_getback(1);
                //一件领取所有福利 1是完美，0是普通
                // NetManager.getInstance().protocolos.welfare_getall_getback(1)

                //NetManager.getInstance().protocolos.kuafu_3v3_buytimes(2);
                //NetManager.getInstance().protocolos.kuafu_3v3_dayreward(2);
                //NetManager.getInstance().protocolos.kuafu_3v3_getranlist()
                //NetManager.getInstance().protocolos.kuafu_3v3_getmyrank();

                //ModuleEventManager.dispatchEvent(new kuafu.XianFuEvent(kuafu.XianFuEvent.SHOW_XIANFU_SCENEPANEL_EVENT));

                //NetManager.getInstance().protocolos.doujiantai_buytime(1);
                //NetManager.getInstance().protocolos.doujiantai_first_reward(20);

                //NetManager.getInstance().protocolos.doujiantai_get_rank(1,10);

                //NetManager.getInstance().protocolos.bag_exchange_pos(-1, 101, 0, 0);

                // GameInstance.clearRoleList();
                // SceneManager.getInstance().clearScene();
                // ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                // GameInstance.mainChar = new SceneChar();

                // for(var i:number=0;i<120;i++){
                //     GameInstance.mainChar.addTestWeapon();
                // }

                //NetManager.getInstance().close();

                //copy2clipboard("http://192.168.88.16/arpg/index.html?p=s.998sc");

                //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_QUEEN_RANK_PANEL_EVENT));

                //ModuleEventManager.dispatchEvent(new faction.GiftreceiveEvent(faction.GiftreceiveEvent.RECEIVE_THANK_GIFT_EVENT));

                //ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.SHOW_WING_PANEL_EVENT));

                //DeathPanel.show(1,10,30);

                //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT));
                //ModuleEventManager.dispatchEvent(new kuafu.KuaFuEvent(kuafu.KuaFuEvent.KUAFU_SHOW_ARENA_PANEL_EVENT));
                //ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT));

                //ModuleEventManager.dispatchEvent(new copytask.CopytaskUiEvent(copytask.CopytaskUiEvent.SHOW_COPYTASK_EVENT));
                //ModuleEventManager.dispatchEvent(new email.MailEvent(email.MailEvent.SHOW_MAIL_PANEL_EVENT));
                //ModuleEventManager.dispatchEvent(new charbg.CharBgEvent(charbg.CharBgEvent.SHOW_VIP_EVENT));

                // var node:RedPointNode = RedPointManager.getInstance().getNodeByID(21);
                // node.show = !node.show;

                
                //ModuleEventManager.dispatchEvent(new kaifu.KaiFuEvent(kaifu.KaiFuEvent.SHOW_KAIFU_PANEL_EVENT));
                
                //console.log(GuidData.player.getGuid())
                //GameControlManager.sendGmCom("@完成当前主线");
                //GameControlManager.sendGmCom("@全图秒杀");

                // NetManager.getInstance().close();
                // TableData.getInstance().tb = null;
                // SceneManager.getInstance().clearStaticScene();
                // SceneManager.getInstance().test = true;
                // GameInstance.mainChar.destory();
                // AstarUtil.graphData = null;

                //GameControlManager.sendGmCom("@制造 2002 1");
                

                // var itemAry:Array<number> = [2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
                // //var itemAry:Array<number> = [2711,2712,2713,2714,2715,2716,2717,2718,2719,2720];
                // for(var i:number = 0;i<itemAry.length;i++){
                //     GameControlManager.sendGmCom("@制造 " + itemAry[i] + " 1");
                // }            
                //ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.SHOW_SKILLUI_EVENT));

                //ModulePageManager.openPanel(503,0);
                //ModulePageManager.openPanel(SharedDef.MODULE_MAIL);
                // TimeUtil.addFrameTick(()=>{
                //     GameInstance.mainChar.py++;
                //     GameInstance.mainChar.refreshPos()
                // })
                

                // var base:number = GameInstance.mainChar.py;
                // var obj:any = GameInstance.mainChar;
                // var upfun = ()=>{GameInstance.mainChar.refreshPos()};
                // TweenLite.to(obj,1.5,{py:base + 200,onComplete:()=>{
                //     TweenLite.to(obj,1.5,{py:base,onUpdate:upfun});
                // },onUpdate:upfun});
                //GameInstance.mainChar.stopMove();
                

                ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT));


            } else if ($evt.keyCode == KeyboardType.F1) {
                var $fps: any = document.getElementById('FpsTipsCanvas')
                if ($fps.style["z-index"] == 0) {
                    $fps.style["z-index"] = 2
                } else {
                    $fps.style["z-index"] = 0
                }


            }

        if ($evt.keyCode == KeyboardType.P) {
            var aa: Array<SceneChar> = GameInstance.roleList;
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                console.log(GameInstance.roleList[i].unit.getName(), GameInstance.roleList[i].unit.getGuid(), GameInstance.roleList[i].isDeath)
            }

        }


        return;

    }


    private showTopCenterPic(): void {
        var $obj: msgtip.MsgPicData = new msgtip.MsgPicData
        $obj.type = 1; //升级
        $obj.info = random(99);
        if (Math.random() > 0.5) {
            $obj.type = 2; //加载图片
            $obj.info = "ui/load/toptip/success.png"
        }

        //msgtip.MsgTopCenterPic.show($obj);
        var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_MSG_PIC_DATA)
        $MsgTipEvent.data = $obj
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    }

    private showEffectsMove(): void {
        var $data: msgtip.MsgEffectsMoveData = new msgtip.MsgEffectsMoveData()
        var $pos: Vector2D = new Vector2D(UIData.designWidth / 2, UIData.designHeight / 2)
        $data.startTM = TimeUtil.getTimer() + random(200);
        $data.endTM = $data.startTM + 500;
        $data.pos = $pos;
        $data.MONEY_TYPE = 1
        $data.bezierPos = new Vector2D($pos.x + Math.random() * 400 - 200, $pos.y + Math.random() * 400 - 200);
        $data.toPos = new Vector2D(150, 178);
        var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_EFFECTS_DATA)
        $MsgTipEvent.data = $data
        ModuleEventManager.dispatchEvent($MsgTipEvent);
    }
    private upPopTxt(): void {
        // AlertUtil.show("你确定要购买这样的东西么","就是这样子")
        var $s2c_send_chat: s2c_send_chat = new s2c_send_chat()
        $s2c_send_chat.content = "[ffffff]玩家名字[00ff00]获得[ffffff][ffffff]玩家名字[00ff00]获得[ffffff]玩家名字[00ff00][ffffff]玩家名字[00ff00]获得[ffffff]bbcc[00ff00]";
        //   $s2c_send_chat.content = "我哭着对你说，熊猫住得比我好太多……";
        // $s2c_send_chat.content = $s2c_send_chat.content.substr(0, random($s2c_send_chat.content.length - 11) + 10);

        $s2c_send_chat.channel = SharedDef.CHAT_TYPE_HORM;

        var $MsgTipEvent: bottomui.BottomUiEvent = new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO)
        $MsgTipEvent.data = $s2c_send_chat
        ModuleEventManager.dispatchEvent($MsgTipEvent);



    }
    private backFun(a: any): void {
        console.log(a)

    }
    private makeTBvo(): void {
        var aa: string = "id, name, info, output_info, zhuangbility, icon, avatar, level, rank, bind_type, type, type_c, type_name, pos, quality, sex, price, is_transaction, max_overlap, is_slather, output, use_result, isdoubleclick, double_click, basic_properties, suit_id, using_effect, category, category_cooldown, cooldown, goods_id, arrange, expend_data, use_object, quest, forge_pro_max, is_auction, auction_money";
        var bb: string = "int, string, string, string, string, string, int, int, int, int, int, int, string, int, int, int, int, int, int, int, array, int, int, array, array, array, array, int, int, int, int, int, int, int, int, array, int, int";

        var a: Array<string> = aa.split(",");
        var b: Array<string> = bb.split(",");

        console.log("-------##############--------")
        for (var i: number = 0; i < a.length; i++) {
            a[i] = a[i].replace(" ", "");
            b[i] = b[i].replace(" ", "");
            var tStr: string = b[i].replace(" ", "");
            var classStr: string = ""
            switch (tStr) {
                case "int":
                    classStr = "number;"
                    break
                case "string":
                    classStr = "string;"
                    break
                case "array":
                    classStr = "Array<any>;"
                    break
                default:

                    break
            }
            console.log("public " + a[i] + ":" + classStr)
        }
        console.log("-----------------")
        for (var i: number = 0; i < a.length; i++) {
            var tStr: string = b[i].replace(" ", "");

            switch (tStr) {
                case "array":
                    console.log("this." + a[i] + "=new Array;")
                    console.log("makeArray($obj." + a[i] + ",this." + a[i] + ");")
                    break
                default:
                    console.log("this." + a[i] + "=$obj." + a[i] + ";")
                    break
            }

        }
        console.log("--#########################----")

    }
    public test(): void {
        console.log("回城回城")
        NetManager.getInstance().protocolos.teleport_main_city();  //回城

        var aotu: boolean = true    //AotuSkillManager.getInstance().aotu
        var hangUpResurrection: boolean = true// GuidData.player.getHangUpResurrection()
        var useA: boolean = true  //AotuSkillManager.hangupdata[8]
        var useB: boolean = true  //AotuSkillManager.hangupdata[9]

        var kId: number = tb.TB_hook_hp_item_Vo.get_TB_hook_hp_item_Vo(2).items[0];
        var $unit: Unit = GameInstance.mainChar.unit;
        var n: number = $unit.getHp() / $unit.getMaxHp();
        if (!hangUpResurrection) {
            useA = false;
            useB = false;
        }
        console.log(GuidData.player.getHangupdata())
        var $dagItemData: BagItemData = GuidData.bag.getItemByEntry(kId)
        if (aotu) {
            var aa: boolean = this.useItem(kId);  // 选中的自动吃的物品
            if (!aa) {
                var $tb_shop: tb.TB_shop = tb.TB_shop.get_TB_shopById(kId)
                if (useA || useB) {
                    var needMoneyNum: number = $tb_shop.costResource[0][1]
                    if ($tb_shop && GuidData.player.getBindGold() >= needMoneyNum) {
                        console.log("使用绑定元宝")
                    } else if (useB) {
                        if ($tb_shop && GuidData.player.getGoldIngot() >= needMoneyNum) {
                            console.log("使用非绑元宝")
                        } else {
                            console.log("无钱购买")
                        }
                    }
                }
            } else {
                console.log("从背包中得到复活丹")
            }

        }
    }
    private useItem($id): boolean {
        if (GuidData.bag.hasItem($id, 1)) {
            var $dagItemData: BagItemData = GuidData.bag.getItemByEntry($id)
            NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, 1);
            console.log("吃药了")
            return true
        } else {
            return false
        }

    }



} 