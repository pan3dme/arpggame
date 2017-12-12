module charbg {
    export class CharBgEvent extends BaseEvent {
        public static SHOW_CHAR_BG_PANEL: string = "SHOW_CHAR_BG_PANEL"; //显示面板
        public static SHOW_CHAR_INFO_PANEL: string = "SHOW_CHAR_INFO_PANEL"; //显示面板
        public static BGDATA_CHANGE_EVENT: string = "bgdata_change_event";
        public static EQUVIEW_CHANGE_EVENT: string = "equview_change_event";
        public static EQUDATA_CHANG_EVENT: string = "equdata_chang_event";
        public static SHOW_VIP_EVENT: string = "SHOW_VIP_EVENT";
        public static VIP_GIFT_EVENT: string = "SHOW_VIP_GIFT_EVENT";
        public static VIP_CHG_EVENT: string = "VIP_CHG_EVENT";
        public static BAG_DATA_INIT_EVENT: string = "BAG_DATA_INIT_EVENT";

        public data: any;
        public change:any;
        public showType: number;

    }

    export class ItemTipEvent extends BaseEvent {
        public static SHOW_TIP_ITEM_EVENT: string = "show_tip_item_event";
        public static SHOW_TIP_ITEM_ID_EVENT: string = "show_tip_item_id_event";

        public data: any;
        public id: number;
        public buttonType: number = -1;//-1纯信息 1装备栏装备 2背包物品 3背包装备 4家族仓库中物品 5上交家族装备
    }
    export class CharBgModule extends Module {
        public getModuleName(): string {
            return "CharBgModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new CharBgProcessor()];
        }
    }

    export class CharBgProcessor extends BaseProcessor {
        public getName(): string {
            return "CharBgProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof EngineEvent) {
                if ($event.type == EngineEvent.PLAYER_FIELD_FORCE) {
                    if (this._charBgPanel) {
                        this._charBgPanel.refreshForce();
                    }
                } else if ($event.type == EngineEvent.PLAYER_FIELD_LEVEL) {
                    if (this._charBgPanel) {
                        this._charBgPanel.refreshLevel();
                    }
                }
                // else if ($event.type == EngineEvent.MONEY_TYPE_SILVER) {
                //     if (this._charBgPanel) {
                //         this._charBgPanel.refreshMoney();
                //     }
                // } else if ($event.type == EngineEvent.MONEY_TYPE_GOLD_INGOT) {
                //     if (this._charBgPanel) {
                //         this._charBgPanel.refreshYuanbao();
                //     }
                // }
            } else if ($event instanceof CharBgEvent) {
                var evt: CharBgEvent = <CharBgEvent>$event;
                if (evt.type == CharBgEvent.SHOW_CHAR_BG_PANEL) {
                    this.showChatEvent(evt.showType);
                } else if (evt.type == CharBgEvent.BGDATA_CHANGE_EVENT) {
                    this.setBgChgData(evt.data, evt.showType);
                } else if (evt.type == CharBgEvent.EQUVIEW_CHANGE_EVENT) {
                    this.setPanelRole(evt.showType);
                } else if (evt.type == CharBgEvent.SHOW_VIP_EVENT) {
                    this.showVip();
                } else if (evt.type == CharBgEvent.VIP_CHG_EVENT) {
                    this.vipChg();
                } else if (evt.type == CharBgEvent.VIP_GIFT_EVENT) {
                    this.vipGift();
                }
            } else if ($event instanceof ItemTipEvent) {
                var itemevt: ItemTipEvent = <ItemTipEvent>$event;
                if (itemevt.type == ItemTipEvent.SHOW_TIP_ITEM_EVENT) {
                    this.showTip(itemevt.data, itemevt.buttonType);
                } else if (itemevt.type == ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT) {
                    this.showBaseTip(itemevt.id);
                }
            } else if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._charBgPanel) {
                    this._charBgPanel.dispose();
                    this._charBgPanel = null;
                    console.log("释放面板 _charBgPanel")
                }
            }

        }
        private showChatEvent($type: number): void {
            if (!this._charBgPanel) {
                this._charBgPanel = new CharBgPanel();
            }

            this._charBgPanel.load(() => {
                UIManager.getInstance().addUIContainer(this._charBgPanel);
                this._charBgPanel.add($type);
                SceneManager.getInstance().render = false;
                var evt: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
                ModuleEventManager.dispatchEvent(evt);

                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_BAG
                ModuleEventManager.dispatchEvent($scenePange);

            })


        }
        private _vipPanel: VipPanel;
        private showVip(): void {
            if (!this._vipPanel) {
                this._vipPanel = new VipPanel();
            }
            this._vipPanel.load(() => {
                this._vipPanel.show();
            })
        }
        private vipGift(): void {
            if (this._vipPanel && this._vipPanel.hasStage) {
                this._vipPanel.redrawVipInfo();
            }
        }
        private vipChg(): void {
            if (this._vipPanel && this._vipPanel.hasStage) {
                this._vipPanel.drawBaseVip();
            }
        }

        private setPanelRole($type: number): void {
            if (this._charBgPanel) {
                this._charBgPanel.refreshRoleType($type);
            }
        }

        // private wingChg():void{
        //     if(this._charBgPanel){
        //         this._charBgPanel.setWing();
        //     }
        // }

        private showTip($data: any, $btnType: number): void {
            // if (!this._goodsTip){
            //     this._goodsTip = new GoodsTip();
            //     //this._goodsTip.setUIAtlas(this._charBgPanel._baseUiAtlas);
            // }
            //this._goodsTip.setData($data);
            //this._goodsTip.show($showType);

            GoodsTip.getInstance().show($data, $btnType);
        }
        private baseTipItemData: BagItemData = new BagItemData;
        private showBaseTip(itemId: number): void {
            this.baseTipItemData.entryData = TableData.getInstance().getData(TableData.tb_item_template, itemId);
            GoodsTip.getInstance().show(this.baseTipItemData, -1);
        }

        private setBgChgData($data: any, $showType: number): void {
            if (!this._charBgPanel) {
                return;
            }

            this._charBgPanel.bgDataChg($data, $showType);


        }

        private _charBgPanel: CharBgPanel;
        //private _goodsTip: GoodsTip;

        private _charInfo: CharInfoPanel;
        private showCharInfo(spo: PlayerOverview): void {
            if (!this._charInfo) {
                this._charInfo = new CharInfoPanel;
            }

            this._charInfo.load(() => {
                this._charInfo.show(spo);
            })

        }

        private receiveInfo($byte: ByteArray): void {
            var pvo: PlayerOverview = new PlayerOverview;
            var spo: s2c_show_player_overview = new s2c_show_player_overview();
            s2c_show_player_overview.read(spo, $byte);
            pvo.spo = spo;
            var equLen: number = $byte.readUint16();
            for (var i: number = 0; i < equLen; i++) {
                var ei: equip_info = new equip_info();
                ei.equip = $byte.readUTF();
                ei.strength_lv = $byte.readUint32();
                ei.refine_rank = $byte.readUint32();
                ei.refine_star = $byte.readUint32();
                ei.gem1_lv = $byte.readUint32();
                ei.gem2_lv = $byte.readUint32();
                ei.gem3_lv = $byte.readUint32();
                pvo.equAry.push(ei)
            }
            this.showCharInfo(pvo)
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [

                new CharBgEvent(CharBgEvent.SHOW_CHAR_BG_PANEL),
                new CharBgEvent(CharBgEvent.SHOW_CHAR_INFO_PANEL),
                //new CharBgEvent(CharBgEvent.SHOW_TIP_BG_EVENT),
                new ItemTipEvent(ItemTipEvent.SHOW_TIP_ITEM_EVENT),
                new ItemTipEvent(ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT),
                new CharBgEvent(CharBgEvent.BGDATA_CHANGE_EVENT),
                new CharBgEvent(CharBgEvent.EQUVIEW_CHANGE_EVENT),
                new CharBgEvent(CharBgEvent.SHOW_VIP_EVENT),
                new CharBgEvent(CharBgEvent.VIP_CHG_EVENT),
                new CharBgEvent(CharBgEvent.VIP_GIFT_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_FORCE),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                //new wing.WingEvent(wing.WingEvent.WING_ID_CHANG_EVENT),
                // new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
                // new EngineEvent(EngineEvent.MONEY_TYPE_GOLD_INGOT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SHOW_PLAYER_OVERVIEW] = ($byte: ByteArray) => { this.receiveInfo($byte) };

            return obj;
        }

    }

    export class PlayerOverview {
        public spo: s2c_show_player_overview;
        public equAry: Array<equip_info> = new Array;
    }


}