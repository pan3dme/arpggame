module social {
    export class SocialUiModule extends Module {
        public getModuleName(): string {
            return "SocialUiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new SocialProcessor()];
        }
    }
    export class SocialUiEvent extends BaseEvent {
        //展示添加好友面板
        public static SHOW_ADDFRIEND_EVENT: string = "SHOW_ADDFRIEND_EVENT";
        //展示添加好友面板
        public static SHOW_APPLYPANEL_EVENT: string = "SHOW_APPLYPANEL_EVENT";
        //展示技能面板
        public static SHOW_SOCIAL_EVENT: string = "SHOW_SOCIAL_EVENT";
        //隐藏技能面板
        public static HIDE_SOCIAL_EVENT: string = "HIDE_SOCIAL_EVENT";
        //添加好友 推荐列表数据变化
        public static REFRESHADDlIST_EVENT: string = "REFRESHADDlIST_EVENT";
        //好友申请列表数据变化
        public static REFRESHAPPLYlIST_EVENT: string = "REFRESHAPPLYlIST_EVENT";
        //好友列表数据变化
        public static REFRESHFRIENDlIST_EVENT: string = "REFRESHFRIENDlIST_EVENT";
        //好友列表selected选中处理
        public static REFRESHFRIENDSELECTED_EVENT: string = "REFRESHFRIENDSELECTED_EVENT";
        //复仇次数变化
        public static REVENGE_NUM_CHG_EVENT: string = "REVENGE_NUM_CHG_EVENT";
        //复仇面板变化
        public static REVENGE_PANEL_EVENT: string = "REVENGE_PANEL_EVENT";

        public index: number;

        public isvisiable: boolean;
        public data: any

    }

    export class SocialProcessor extends BaseProcessor {
        private _socialUiPanel: SocialUiPanel

        public getName(): string {
            return "SocialProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            this.processRedPoint();
            if ($event instanceof SocialUiEvent) {
                var $socialUiEvent: SocialUiEvent = <SocialUiEvent>$event;
                if ($socialUiEvent.type == SocialUiEvent.SHOW_SOCIAL_EVENT) {
                    this.showUi();
                } else if ($socialUiEvent.type == SocialUiEvent.HIDE_SOCIAL_EVENT) {
                    this.hideUi()
                } else if ($socialUiEvent.type == SocialUiEvent.REFRESHADDlIST_EVENT) {
                    this.refreshAddList($socialUiEvent.index);
                } else if ($socialUiEvent.type == SocialUiEvent.REFRESHAPPLYlIST_EVENT) {
                    this.refreshApplyList($socialUiEvent.isvisiable);
                } else if ($socialUiEvent.type == SocialUiEvent.REFRESHFRIENDlIST_EVENT) {
                    this.refreshFriendList();
                } else if ($socialUiEvent.type == SocialUiEvent.REFRESHFRIENDSELECTED_EVENT) {
                    this.refreshFriendList($socialUiEvent.index);
                } else if ($socialUiEvent.type == SocialUiEvent.REVENGE_NUM_CHG_EVENT) {
                    this.revengenumchg();
                } else if ($socialUiEvent.type == SocialUiEvent.SHOW_ADDFRIEND_EVENT) {
                    this.showAddFriendUi();
                } else if ($socialUiEvent.type == SocialUiEvent.SHOW_APPLYPANEL_EVENT) {
                    this.showApplyPanelUi();
                } else if ($socialUiEvent.type == SocialUiEvent.REVENGE_PANEL_EVENT) {
                    this.refreshRevengeList();
                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._socialUiPanel) {
                    this._socialUiPanel.dispose();
                    this._socialUiPanel = null;
                    console.log("释放面板 _socialUiPanel")
                }
                if (panelEvent.panel == this._addfriendUi) {
                    this._addfriendUi.dispose();
                    this._addfriendUi = null;
                    console.log("释放面板 _addfriendUi")
                }
                if (panelEvent.panel == this._applyPanelUi) {
                    this._applyPanelUi.dispose();
                    this._applyPanelUi = null;
                    console.log("释放面板 _addfriendUi")
                }
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                if (GuidData.social) {
                    var enemylist = GuidData.social.getEnemyList();
                    if (enemylist && enemylist.length > 0) {
                        GuidData.social.enemyredstate = true;
                    } else {
                        GuidData.social.enemyredstate = false;
                    }
                    this.processRedPoint();
                }
            }
            // if ($event instanceof EngineEvent) {
            //     var $engineEvent: EngineEvent = <EngineEvent>$event;
            //     if ($engineEvent.type == EngineEvent.MONEY_TYPE_QI || $engineEvent.type == EngineEvent.MONEY_TYPE_SILVER) {
            //         if (this._socialUiPanel) {
            //             this._socialUiPanel.skillTopRightPanel.resetMoney()
            //             this.resetSkillUiData()
            //         }
            //     }
            // }
        }
        // private resetSkillUiData(): void {
        //    if (this._skillUiPanel) {

        //         this._skillUiPanel.refresh()
        //    }
        // }
        /**
         *选择技能详细内容
         */
        // private selectSkillContent($SkillBaseDataVo: tb.SkillBaseDataVo): void {
        //     if (this._skillUiPanel) {
        //         this._skillUiPanel.skillPanelC.resetData($SkillBaseDataVo);
        //     }
        // }


        private processRedPoint(): void {
            console.log("---红点----", GuidData.social.getApplyList());
            if (GuidData.player.getsyspageopen(SharedDef.MODULE_SOCIAL,SharedDef.MODULE_SOCIAL_FRIEND)) {
                var node: RedPointNode = RedPointManager.getInstance().getNodeByID(57);
                if (GuidData.social) {
                    var friendlist;
                    friendlist = GuidData.social.getApplyList();
                    if (friendlist && friendlist.length > 0) {
                        node.show = true;
                    } else {
                        node.show = false;
                    }

                    var node1: RedPointNode = RedPointManager.getInstance().getNodeByID(58);
                    node1.show = GuidData.social.enemyredstate;
                }
            }
        }

        private revengenumchg() {
            if (this._socialUiPanel && this._socialUiPanel.hasStage && this._socialUiPanel.type == 1) {
                this._socialUiPanel.bottomUiparts.setrevengenum();
            }
        }

        private refreshFriendList($index: number = 0): void {
            if (this._socialUiPanel && this._socialUiPanel.socialListPanel && this._socialUiPanel.socialListPanel.hasStage && this._socialUiPanel.socialListPanel.type == 0) {
                this._socialUiPanel.bottomUiparts.setFriendNum();
                this._socialUiPanel.socialListPanel.refreshDataByNewData($index, 0);
            }
        }

        private refreshRevengeList($index: number = 0): void {
            if (this._socialUiPanel && this._socialUiPanel.socialListPanel && this._socialUiPanel.socialListPanel.hasStage && this._socialUiPanel.socialListPanel.type == 1) {
                this._socialUiPanel.socialListPanel.refreshDataByNewData($index, 1);
            }
        }

        private refreshApplyList($isvisiable: boolean): void {
            if (this._applyPanelUi && this._applyPanelUi.applyList && this._applyPanelUi.applyList.hasStage) {
                this._applyPanelUi.applyList.refreshDataByNewData();
            }
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        }

        private refreshAddList($index: number): void {
            if (this._addfriendUi && this._addfriendUi.addfriendList && this._addfriendUi.addfriendList.hasStage) {
                this._addfriendUi.addfriendList.refreshDataByindex($index);
            }
        }
        private hideUi(): void {
            if (this._socialUiPanel) {
                this._socialUiPanel.hide();
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            }
        }


        private showUi(): void {
            if (!this._socialUiPanel) {
                this._socialUiPanel = new SocialUiPanel();
            }
            this._socialUiPanel.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));

                this._socialUiPanel.show();
            })
        }
        /**
         * 开启添加好友界面
         */
        private _addfriendUi: AddFriendPanel;
        private showAddFriendUi(): void {
            if (!this._addfriendUi) {
                this._addfriendUi = new AddFriendPanel();
            }
            this._addfriendUi.load(() => {
                this._addfriendUi.show();
            })
        }
        /**
         * 开启申请界面
         */
        private _applyPanelUi: ApplyPanel;
        private showApplyPanelUi(): void {
            if (!this._applyPanelUi) {
                this._applyPanelUi = new ApplyPanel();
            }
            this._applyPanelUi.load(() => {
                this._applyPanelUi.show();
            })
        }
        public getRecommend($byte: ByteArray): void {
            var parmLen: number = $byte.readUint16();
            var ary: Array<SocialItemData> = new Array;
            for (var i: number = 0; i < parmLen; i++) {
                var sitem: social_friend_info = new social_friend_info;
                sitem.read($byte);
                var item: SocialItemData = new SocialItemData()

                item.guid = sitem.guid;
                item.name = sitem.name;
                item.faction = sitem.faction;
                item.level = sitem.level;
                item.gender = sitem.icon;
                item.vip = sitem.vip;

                ary.push(item);
            }
            // alert(str);
            if (this._addfriendUi && this._addfriendUi.addfriendList) {
                this._addfriendUi.addfriendList.refreshDataByNewData(ary);
            }
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SocialUiEvent(SocialUiEvent.SHOW_SOCIAL_EVENT),
                new SocialUiEvent(SocialUiEvent.HIDE_SOCIAL_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHADDlIST_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHAPPLYlIST_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHFRIENDlIST_EVENT),
                new SocialUiEvent(SocialUiEvent.REFRESHFRIENDSELECTED_EVENT),
                new SocialUiEvent(SocialUiEvent.REVENGE_NUM_CHG_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

                new SocialUiEvent(SocialUiEvent.SHOW_ADDFRIEND_EVENT),
                new SocialUiEvent(SocialUiEvent.SHOW_APPLYPANEL_EVENT),
                new SocialUiEvent(SocialUiEvent.REVENGE_PANEL_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                // new EngineEvent(EngineEvent.MONEY_TYPE_QI),
                // new EngineEvent(EngineEvent.MONEY_TYPE_SILVER),
            ];
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SOCIAL_GET_RECOMMEND_FRIEND] = ($byte: ByteArray) => { this.getRecommend($byte) };
            return obj;
        }
    }

}