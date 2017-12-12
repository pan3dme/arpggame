module mainUi {
    export class MainUiModule extends Module {
        public getModuleName(): string {
            return "MainUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MainUiProcessor()];
        }
    }
    export class MainUiEvent extends BaseEvent {
        public static SHOW_MAINUI_EVENT: string = "SHOW_MAINUI_EVENT";
        public static SHOW_PANDA_EVENT: string = "SHOW_PANDA_EVENT";
        public static HIDE_MAINUI_EVENT: string = "HIDE_MAINUI_EVENT";
        public static RESET_SKILL_ICON: string = "RESET_SKILL_ICON";
        public static ANGER_SKILL_CHANGE: string = "ANGER_SKILL_CHANGE";
        public static REFRESH_MAINUI_PANEL: string = "REFRESH_MAINUI_PANEL";
        public static PLAYER_SKILL_CD_REFRESH: string = "PLAYER_SKILL_CD_REFRESH";	//重新更新自己的CD



        public data: any
    

    }

    export class MainOperatEvent extends BaseEvent {
        public static SHOW_MAIN_OPERAT_EVENT: string = "show_main_operat_event";
        public static HIDE_MAIN_OPERAT_EVENT: string = "hide_main_operat_event";

        public data: any;
        public fun: Function;
        public triggerOne: boolean;
    }

    export class MainUiProcessor extends BaseProcessor {
        public getName(): string {
            return "MainUiProcessor";
        }
     //   private _mainUiPanel: MainUiPanel;
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MainUiEvent) {
                var $mainUIEvent: MainUiEvent = <MainUiEvent>$event;
                if ($mainUIEvent.type == MainUiEvent.SHOW_MAINUI_EVENT) {
                    SceneManager.getInstance().render = true;
                    if ((GuidData.map.isAdventureBaseScene() || GuidData.map.isAdventureBossScene()) && mainUi.MainUiModel.skillTabIndex == 0) {
                      //  mainUi.MainUiModel.skillTabIndex =1
                    }
                    ModuleEventManager.dispatchEvent(new rightui.RightUiEvent(rightui.RightUiEvent.SHOW_RIGHT_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.SHOW_LEFT_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.SHOW_TOP_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.SHOW_BOTTOM_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.SHOW_ADVENTURE_INFO_UI_PANEL));

                    if (mainUi.MainUiModel.skillTabIndex == 0) {
                        ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.SHOW_FIGHT_UI_PANEL));
                    } else {
                        ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.SHOW_HOME_UI_PANEL));
                    }

                    AreaType.restAreaPanel();
                    ModuleEventManager.dispatchEvent(new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_GUIDE_POP_VIEW));

                    Engine.needVertical = true
                    Engine.resetSize();

                }
                if ($mainUIEvent.type == MainUiEvent.HIDE_MAINUI_EVENT) {
                    ModuleEventManager.dispatchEvent(new leftui.LeftUiEvent(leftui.LeftUiEvent.HIDE_LEFT_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.HIDE_TOP_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.HIDE_BOTTOM_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new homeui.HomeUiEvent(homeui.HomeUiEvent.HIDE_HOME_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.HIDE_FIGHT_UI_PANEL));
                }
                if ($mainUIEvent.type == MainUiEvent.REFRESH_MAINUI_PANEL) {
                    ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_PANDA));

                }

            } 
        }
        /*
          protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MainUiEvent) {
                var $mainUIEvent: MainUiEvent = <MainUiEvent>$event;
                if ($mainUIEvent.type == MainUiEvent.SHOW_MAINUI_EVENT) {
                    this.showUi();
                } else if ($mainUIEvent.type == MainUiEvent.HIDE_MAINUI_EVENT) {
                    this.hideUi();
                } else if ($mainUIEvent.type == MainUiEvent.RESET_SKILL_ICON) {
                    this.resetSkillIcon();
                } else if ($mainUIEvent.type == MainUiEvent.ANGER_SKILL_CHANGE) {
                    this.angerSkillChange();
                } else if ($mainUIEvent.type == MainUiEvent.REFRESH_MAINUI_PANEL) {
                    this.resetPanel();
                } else if ($mainUIEvent.type == MainUiEvent.PLAYER_SKILL_CD_REFRESH) {
                    if (this._mainUiPanel) {
                        this._mainUiPanel.bottomSkillPanel.refreshCdBySkillId($mainUIEvent.data)
                    }
                } else if ($mainUIEvent.type == MainUiEvent.SHOW_PANDA_EVENT) {
                    if (MainUiModel.pandaCanAotu) {
                        MainUiModel.pandaState = Boolean($mainUIEvent.data);
                        this.resetPanel();
                    }
                } else if ($mainUIEvent.type == MainUiEvent.REFRESH_TOP_LEFT_BUFF) {
                 

                    if (this._mainUiPanel) {
                      //  this._mainUiPanel.topLeftPanel.topBuffUiList.refresh();
                    }
                } 



            } else if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.UNIT_FIELD_NOTORIETY) {
                    if (this._mainUiPanel) {
                      //  this._mainUiPanel.topLeftPanel.showPlaceModel(true);
                    }
                } else if ($engineEvent.type == EngineEvent.PLAYER_EXPAND_INT_XP) {
                    this._mainUiPanel.bottomCenterPanel.refresh();
                } else if ($engineEvent.type == EngineEvent.ENTER_SCENE_EVENT) {
                    if (GameInstance.mainUi) {
                        if (GuidData.map.tbMapVo.id == 1) {
                            MainUiModel.skillTabIndex = 1;
                        } else {
                            MainUiModel.skillTabIndex = 0;
                        }
                        GameInstance.mainUi.setSkillMenuPanelType(MainUiModel.skillTabIndex, MainUiModel.skillTabIndex== 0);
                        this.resetPanel()
                    }
  
                } else {
                    this.resetPanel()
                    if ($engineEvent.type == EngineEvent.MONEY_TYPE_SILVER) {
                    }
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    }
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_FORCE) {
                    }
                    if ($engineEvent.type == EngineEvent.PLAYER_FIELD_VIP_LEVEL) {
                    }
                }

            } else if ($event instanceof MainOperatEvent) {
                var $mainOperatEvent: MainOperatEvent = <MainOperatEvent>$event;
                console.log($mainOperatEvent, this._mainUiPanel)
                if ($mainOperatEvent.type == MainOperatEvent.SHOW_MAIN_OPERAT_EVENT) {
                    if (this._mainUiPanel) {
                        this._mainUiPanel.bottomSkillPanel.setOperatIconToSkill($mainOperatEvent)
                    } else {
                        this.mainOperatEvent = $mainOperatEvent
                    }
                }
                if ($mainOperatEvent.type == MainOperatEvent.HIDE_MAIN_OPERAT_EVENT) {
                    this._mainUiPanel.bottomSkillPanel.setOperatIconToSkill(null)
                }

            }
            if ($event instanceof quest.QuestEvent) {
                var $QuestEvent: quest.QuestEvent = <quest.QuestEvent>$event;
                if ($QuestEvent.type == quest.QuestEvent.REFRESH_QUEST_EVENT) {
                    if (GameInstance.mainUi) {
                        GameInstance.mainUi.middleLeftPanel.refresh();
                    }
                }
            }
        }
        */
        private mainOperatEvent: MainOperatEvent

        private resetPanel(): void {
     
        }

        private angerSkillChange(): void {
            console.log("怒气技能")
        }
        private resetSkillIcon(): void {
      
                    console.log("技能刷新")
        
        }
        private hideUi(): void {

        }
        private showUi(): void {


        }



        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MainUiEvent(MainUiEvent.HIDE_MAINUI_EVENT),
                new MainUiEvent(MainUiEvent.SHOW_MAINUI_EVENT),
                new MainUiEvent(MainUiEvent.RESET_SKILL_ICON),
                new MainUiEvent(MainUiEvent.ANGER_SKILL_CHANGE),
                new MainUiEvent(MainUiEvent.PLAYER_SKILL_CD_REFRESH),
                new MainUiEvent(MainUiEvent.REFRESH_MAINUI_PANEL),
                new MainUiEvent(MainUiEvent.SHOW_PANDA_EVENT),


                new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                new EngineEvent(EngineEvent.PLAYER_EXPAND_INT_XP),
                new EngineEvent(EngineEvent.PLAYER_FIELD_VIP_LEVEL),
                new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),


                new MainOperatEvent(MainOperatEvent.SHOW_MAIN_OPERAT_EVENT),
                new MainOperatEvent(MainOperatEvent.HIDE_MAIN_OPERAT_EVENT),


                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

            ];
        }

        private smsgCombatStateUpData($byte: ByteArray): void {
            var a: number = $byte.readByte()
            //console.log("战斗状态变化", a);
        }
        private smsgPeaceModeCd($byte: ByteArray): void {

        }
        private smsgBagItemCooldwn($byte: ByteArray): void {
            var $num: number = $byte.readUint16();
            for (var i: number = 0; i < $num; i++) {
                var $vo: item_cooldown_info = new item_cooldown_info();
                $vo.read($byte);
                GameInstance.bagCdItem[$vo.item] = TimeUtil.getTimer() + $vo.cooldown
            }
        }
        private smsgfieldDeathCooldown($byte: ByteArray): void {
            var $num: number = $byte.readUint16();
            console.log($num)
            TimeUtil.addTimeOut(3000, () => {
                this.resurrection()
            });
        }
        private resurrection(): void  //死亡挂机
        {
            var aotu: boolean = AotuSkillManager.getInstance().aotuBattle    //AotuSkillManager.getInstance().aotu
            var hangUpResurrection: boolean = GuidData.player.getHangUpResurrection() == 1;
            var $hangupData: Array<number> = GuidData.player.getHangupdata()
            var useA: boolean = $hangupData[8] == 1;
            var useB: boolean = $hangupData[9] == 1;

            var kId: number = tb.TB_hook_hp_item_Vo.get_TB_hook_hp_item_Vo(2).items[0];
            var $unit: Unit = GameInstance.mainChar.unit;
            var n: number = $unit.getHp() / $unit.getMaxHp();
            if (!hangUpResurrection) {
                useA = false;
                useB = false;
                if (aotu) {
                    console.log("退出场景回城")
                    NetManager.getInstance().protocolos.teleport_main_city();  //回城
                    return;
                }

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
                            console.log("使用绑定元宝", GuidData.player.getBindGold())
                            NetManager.getInstance().protocolos.gold_respawn(SharedDef.MONEY_TYPE_BIND_GOLD);

                        } else if (useB) {
                            if ($tb_shop && GuidData.player.getGoldIngot() >= needMoneyNum) {
                                NetManager.getInstance().protocolos.gold_respawn(SharedDef.MONEY_TYPE_GOLD_INGOT);
                                console.log("使用元宝", "protocolos.gold_respawn", GuidData.player.getGoldIngot())
                            } else {
                                console.log("无钱购买")
                            }
                        } else {
                            console.log("绑定元宝不足够")
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
                console.log("吃药复活了")
                return true
            } else {
                return false
            }
        }


        public getHanderMap(): Object {
            var obj: Object = new Object;

            obj[Protocols.SMSG_COMBAT_STATE_UPDATE] = ($byte: ByteArray) => { this.smsgCombatStateUpData($byte) };
            obj[Protocols.SMSG_PEACE_MODE_CD] = ($byte: ByteArray) => { this.smsgPeaceModeCd($byte) };
            obj[Protocols.SMSG_BAG_ITEM_COOLDOWN] = ($byte: ByteArray) => { this.smsgBagItemCooldwn($byte) };
            obj[Protocols.SMSG_FIELD_DEATH_COOLDOWN] = ($byte: ByteArray) => { this.smsgfieldDeathCooldown($byte) };


            return obj;
        }
    }

}