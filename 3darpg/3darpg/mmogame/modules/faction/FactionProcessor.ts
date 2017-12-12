module faction {

    export class FactionModule extends Module {
        public getModuleName(): string {
            return "FactionModule";
        }
        protected listProcessors(): Array<Processor> {
            //this.init();
            return [new FactionProcessor()
                , new FactionBossProcessor()
                , new FactionBuildProcessor()
            ];
        }

    }

    export class FactionEvent extends BaseEvent {
        public static SHOW_FACTIONUI_EVENT: string = "SHOW_FACTIONUI_EVENT";
        public static HIDE_APPLYFACTIONUI_EVENT: string = "HIDE_APPLYFACTIONUI_EVENT";
        public static HIDE_EXISTFACTIONUI_EVENT: string = "HIDE_EXISTFACTIONUI_EVENT";
        public static REFRESHAPPLYZHAOMUlIST_EVENT: string = "REFRESHAPPLYZHAOMUlIST_EVENT";
        public static REFRESHAPPLYZHAOMUlISTISOK_EVENT: string = "REFRESHAPPLYZHAOMUlISTISOK_EVENT";

        //加入家族
        public static JOINFACTIONITEM_EVENT: string = "JOINFACTIONITEM_EVENT";
        //家族列表
        public static REFRESHFACTIONITEM_EVENT: string = "REFRESHFACTIONITEM_EVENT";
        //家族申请列表
        public static REFRESHFACTIONITEMAPPLY_EVENT: string = "REFRESHFACTIONITEMAPPLY_EVENT";
        //家族等级变化
        public static REFRESHFACTIONLEV_EVENT: string = "REFRESHFACTIONLEV_EVENT";
        //家族资金变化
        public static REFRESHFACTIONMONEY_EVENT: string = "REFRESHFACTIONMONEY_EVENT";
        //我的贡献变化
        public static REFRESHFACTIONGX_EVENT: string = "REFRESHFACTIONGX_EVENT";
        //家族公告变化
        public static REFRESHFACTIONGG_EVENT: string = "REFRESHFACTIONGG_EVENT";
        //家族职位变化
        public static REFRESHFACTIONIDENTITY_EVENT: string = "REFRESHFACTIONIDENTITY_EVENT";

        //退出家族
        public static FACTION_QUIT_EVENT: string = "faction_quit_event";


        //打开家族职务任免弹框
        public static SHOW_FACTIONAPPOINTMENT_EVENT: string = "SHOW_FACTIONAPPOINTMENT_EVENT";
        //打开家族审批弹框
        public static SHOW_FACTIONRECRUITING_EVENT: string = "SHOW_FACTIONRECRUITING_EVENT";
        //打开家族公告弹框
        public static SHOW_FACTIONNOTICE_EVENT: string = "SHOW_FACTIONNOTICE_EVENT";
        // //选中一条消息回复
        // public static SELECT_INFOMATION_REPLY: string = "SELECT_INFOMATION_REPLY";
        // //周排行变化
        // public static WEEK_RANK_CHANGE_EVENT: string = "WEEK_RANK_CHANGE_EVENT";

        // //打开女王排行面板
        // public static SHOW_QUEEN_RANK_PANEL_EVENT: string = "SHOW_QUEEN_RANK_PANEL_EVENT";

        //打开活动面板
        public static SHOW_FACTIONACTIVE_PANEL_EVENT: string = "SHOW_FACTIONACTIVE_PANEL_EVENT";
        //打开首领数据变化
        public static SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT: string = "SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT";
        //远征数据变化
        public static SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT: string = "SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT";

        //打开技能面板
        public static SHOW_FACTIONSKILL_PANEL_EVENT: string = "SHOW_FACTIONSKILL_PANEL_EVENT";
        public static SHOW_FACTIONSKILL_CHG_EVENT: string = "SHOW_FACTIONSKILL_CHG_EVENT";
        //邀请入家族数据变化
        public static SHOW_INVITATION_EVENT: string = "SHOW_INVITATION_EVENT";
        public static INVITATION_CHG_EVENT: string = "INVITATION_CHG_EVENT";
        //家族建筑变化了
        public static FUNBUILD_CHG_EVENT: string = "FUNBUILD_CHG_EVENT";


        public data: any;
    }

    export class FactionProcessor extends BaseProcessor {
        // private _factionUiPanel: FactionUiPanel
        private _applyFactionUiPanel: ApplyFactionUiPanel;
        private _existFactionUiPanel: ExistFactionUiPanel;

        public getName(): string {
            return "FactionProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            var evt: FactionEvent = <FactionEvent>$event;
            this.processRedPoint();
            if ($event instanceof FactionEvent) {
                if (evt.type == FactionEvent.SHOW_FACTIONUI_EVENT) {
                    this.showFactionUi(evt.data);
                } else if (evt.type == FactionEvent.HIDE_APPLYFACTIONUI_EVENT) {
                    this.hideApplyFactionUi()
                } else if (evt.type == FactionEvent.HIDE_EXISTFACTIONUI_EVENT) {
                    this.hideExistFactionUi()
                } else if (evt.type == FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT) {
                    this.refreshapplyzhaomulist(evt.data);
                } else if (evt.type == FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT) {
                    this.refreshapplyzhaomulistisok(evt.data);
                } else if (evt.type == FactionEvent.REFRESHFACTIONITEM_EVENT) {
                    this.refreshFactionPlayerList();
                } else if (evt.type == FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT) {
                    // this.refreshapplyzhaomulistisok(evt.data);
                    this.ApplyFactionListChange();
                    ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
                } else if (evt.type == FactionEvent.JOINFACTIONITEM_EVENT) {
                    this.joinFactionevent();
                } else if (evt.type == FactionEvent.REFRESHFACTIONLEV_EVENT) {
                    //等级变化
                    this.refreshFactionLev();
                } else if (evt.type == FactionEvent.REFRESHFACTIONMONEY_EVENT) {
                    //资金变化
                    this.refreshFactionMoney();
                } else if (evt.type == FactionEvent.REFRESHFACTIONGX_EVENT) {
                    //贡献变化
                    this.refreshFactionGX();
                } else if (evt.type == FactionEvent.REFRESHFACTIONGG_EVENT) {
                    //公告变化
                    this.refreshFactionGG();
                } else if (evt.type == FactionEvent.REFRESHFACTIONIDENTITY_EVENT) {
                    //职位变化
                    this.refreshFactionIdentity();
                } else if (evt.type == FactionEvent.SHOW_FACTIONAPPOINTMENT_EVENT) {
                    //打开家族职位任免弹窗
                    this.showFactionAppointment(evt.data);
                } else if (evt.type == FactionEvent.FACTION_QUIT_EVENT) {
                    //退出帮派
                    this.exitFactionevent();
                } else if (evt.type == FactionEvent.SHOW_FACTIONRECRUITING_EVENT) {
                    //打开家族审批弹窗
                    this.showFactionRecruiting();
                } else if (evt.type == FactionEvent.SHOW_FACTIONNOTICE_EVENT) {
                    this.showFactionNotice();
                    // } else if (evt.type == FactionEvent.SELECT_INFOMATION_REPLY) {
                    //     console.log("--数据---", evt.data);
                    //     this.selectinfomationreply(evt.data);
                    // } else if (evt.type == FactionEvent.WEEK_RANK_CHANGE_EVENT) {
                    //     this.weekrankchang();

                    // } else if (evt.type == FactionEvent.SHOW_QUEEN_RANK_PANEL_EVENT) {
                    //     this.showQueenRankPanel();
                } else if (evt.type == FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT) {
                    this.showActivePanel();
                } else if (evt.type == FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT) {
                    this.refreshActiveLeadPanel();
                } else if (evt.type == FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT) {
                    this.refreshActiveTripPanel();
                } else if (evt.type == FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT) {
                    this.showSkillPanel();
                } else if (evt.type == FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT) {
                    this.skillChg();
                } else if (evt.type == FactionEvent.SHOW_INVITATION_EVENT) {
                    this.showinvitationpanel();
                } else if (evt.type == FactionEvent.INVITATION_CHG_EVENT) {
                    this.invitationchg();
                } else if (evt.type == FactionEvent.FUNBUILD_CHG_EVENT) {
                    this.funbuildChg();
                }
            } else if ($event.type == EngineEvent.CORE_DATA_COMPLETE_EVENT || $event.type == EngineEvent.SYSTEM_OPEN_EVENT) {
                this.processRedPoint();
            } else if ($event.type == EngineEvent.MONEY_CHANGE) {
                this.Chgmoney();
            }


            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this._applyFactionUiPanel) {
                    this._applyFactionUiPanel.dispose();
                    this._applyFactionUiPanel = null;
                    console.log("释放面板 _applyFactionUiPanel")
                }
                if (panelEvent.panel == this._existFactionUiPanel) {
                    this._existFactionUiPanel.dispose();
                    this._existFactionUiPanel = null;
                    console.log("释放面板 _existFactionUiPanel")
                }

                if (panelEvent.panel == this.appointmentPanel) {
                    this.appointmentPanel.dispose();
                    this.appointmentPanel = null;
                    console.log("释放面板 appointmentPanel")
                }
                if (panelEvent.panel == this.noticePanel) {
                    this.noticePanel.dispose();
                    this.noticePanel = null;
                    console.log("释放面板 noticePanel")
                }
                if (panelEvent.panel == this.recruitingPanel) {
                    this.recruitingPanel.dispose();
                    this.recruitingPanel = null;
                    console.log("释放面板 recruitingPanel")
                }
                if (panelEvent.panel == this._invitationPanel) {
                    this._invitationPanel.dispose();
                    this._invitationPanel = null;
                    console.log("释放面板 _invitationPanel")
                }

                if (panelEvent.panel == this.activePanel) {
                    this.activePanel.dispose();
                    this.activePanel = null;
                    console.log("释放面板 activePanel")
                }
                if (panelEvent.panel == this.skillPanel) {
                    this.skillPanel.dispose();
                    this.skillPanel = null;
                    console.log("释放面板 factionskillPanel")
                }

            }

        }

        private funbuildChg() {
            if (this._existFactionUiPanel && this._existFactionUiPanel.factionFunctionPanel && this._existFactionUiPanel.factionFunctionPanel.hasStage) {
                this._existFactionUiPanel.factionFunctionPanel.resetData();
            }
        }

        private Chgmoney() {
            if (this.skillPanel) {
                this.skillPanel.drawBase();
            }


            if (this._applyFactionUiPanel && this._applyFactionUiPanel.applybuildpanel && this._applyFactionUiPanel.applybuildpanel.hasStage) {
                this._applyFactionUiPanel.applybuildpanel.set_a_9();
            }
        }

        private processRedPoint(): void {

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_FACTION, SharedDef.MODULE_FACTION_RECRUIT)) {
                var node: RedPointNode = RedPointManager.getInstance().getNodeByID(62);
                var facApplylist;
                if (GuidData.faction) {
                    facApplylist = GuidData.faction.getApplyList();
                }
                if (facApplylist && facApplylist.length > 0 && GuidData.faction.playerIdentity < 4) {
                    node.show = true;
                } else {
                    node.show = false;
                }
            }
        }

        private _invitationPanel: InvitationPanel
        private showinvitationpanel() {
            if (!this._invitationPanel) {
                this._invitationPanel = new InvitationPanel();
            }

            this._invitationPanel.load(() => {
                this._invitationPanel.show();
            })
        }

        private invitationchg() {
            if (this._invitationPanel && this._invitationPanel.invitationList && this._invitationPanel.invitationList.hasStage) {
                this._invitationPanel.invitationList.resetData();
            }
        }

        private activePanel: FactionActivePanel;
        private showActivePanel(): void {
            if (!GuidData.faction) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "你还没有加入家族", 99);
                return;
            }
            if (!this.activePanel) {
                this.activePanel = new FactionActivePanel;
            }

            this.activePanel.load(() => {
                this.activePanel.show();
            })
        }

        private skillPanel: FactionSkillPanel;
        private showSkillPanel(): void {
            if (!GuidData.faction) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "你还没有加入家族", 99);
                return;
            }
            if (!this.skillPanel) {
                this.skillPanel = new FactionSkillPanel;
            }

            this.skillPanel.load(() => {
                this.skillPanel.show();
            })
        }

        private skillChg(): void {
            if (this.skillPanel && this.skillPanel.hasStage) {
                this.skillPanel.dataChg();
            }
        }



        private refreshActiveLeadPanel(): void {
            if (this.activePanel && this.activePanel.hasStage) {
                this.activePanel.leadDataChg();
            }
        }

        private refreshActiveTripPanel(): void {
            if (this.activePanel && this.activePanel.hasStage) {
                this.activePanel.tripDataChg();
            }
        }

        /**
         * 职务任命面板
         */
        private appointmentPanel: AppointmentPanel;
        private showFactionAppointment($data: any): void {
            if (!this.appointmentPanel) {
                this.appointmentPanel = new AppointmentPanel();
            }

            this.appointmentPanel.load(() => {
                //停止绘制前面的ui
                this.appointmentPanel.show($data);
            })
        }

        /**
         * 公告面板
         */
        private noticePanel: NoticePanel;
        private showFactionNotice(): void {
            if (!this.noticePanel) {
                this.noticePanel = new NoticePanel();
            }

            this.noticePanel.load(() => {
                //停止绘制前面的ui
                this.noticePanel.show();
            })
        }

        /**
         * 审批面板
         */
        private recruitingPanel: RecruitingPanel;
        private showFactionRecruiting(): void {
            if (!this.recruitingPanel) {
                this.recruitingPanel = new RecruitingPanel();
            }

            this.recruitingPanel.load(() => {
                //停止绘制前面的ui
                this.recruitingPanel.show();
            })
        }

        private ApplyFactionListChange(): void {
            if (this.recruitingPanel && this.recruitingPanel.applyFactionList && this.recruitingPanel.applyFactionList.hasStage) {
                this.recruitingPanel.applyFactionList.refreshDataByNewData();
                return;
            }
        }

        private refreshFactionIdentity(): void {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionIdentity();
            }
        }

        private refreshFactionGG(): void {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionNotice();
            }
        }

        private refreshFactionGX(): void {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionContribution();
            }
            // if (this._existFactionUiPanel
            //     && this._existFactionUiPanel.factionStorePanel) {
            //     this._existFactionUiPanel.factionStorePanel.shopRightPanel.resetMoney();
            // }
        }

        private refreshFactionMoney(): void {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionMoney();
            }
        }

        private refreshFactionLev(): void {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionLev();
            }
        }

        private refreshFactionPlayerList(): void {
            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel
                && this._existFactionUiPanel.factionPersonPanel.personListPanel) {
                this._existFactionUiPanel.factionPersonPanel.personListPanel.refreshDataByNewData(
                    GuidData.faction.getFactionListBySortType(
                        this._existFactionUiPanel.factionPersonPanel.SortType
                        , this._existFactionUiPanel.factionPersonPanel.SortFlag), false);
            }

            if (this._existFactionUiPanel
                && this._existFactionUiPanel.factionPersonPanel) {
                this._existFactionUiPanel.factionPersonPanel.rightPanel.resetFactionPlayerNum();
                this._existFactionUiPanel.factionPersonPanel.bottomLeftPanel.resetData();
            }
        }

        private joinFactionevent(): void {
            if (this._applyFactionUiPanel && this._applyFactionUiPanel.hasStage) {
                this.hideApplyFactionUi();
                this.showFactionUi(null);
            }

        }

        private exitFactionevent(): void {
            if (this._existFactionUiPanel && this._existFactionUiPanel.hasStage) {
                this.hideExistFactionUi();
                this.showFactionUi(null);
            }

        }

        private refreshapplyzhaomulist($data: any): void {
            if (this._applyFactionUiPanel
                && this._applyFactionUiPanel.applyzhaomupanel
                && this._applyFactionUiPanel.applyzhaomupanel.applylist) {
                this._applyFactionUiPanel.applyzhaomupanel.setFactionInfo($data);
            }
        }

        private refreshapplyzhaomulistisok($data: any): void {
            if (this._applyFactionUiPanel
                && this._applyFactionUiPanel.applyzhaomupanel
                && this._applyFactionUiPanel.applyzhaomupanel.applylist) {
                this._applyFactionUiPanel.applyzhaomupanel.applylist.isokstate($data);
            }
        }

        private hideExistFactionUi(): void {
            if (this._existFactionUiPanel) {
                this._existFactionUiPanel.hide();
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));


        }

        private hideApplyFactionUi(): void {
            if (this._applyFactionUiPanel) {
                this._applyFactionUiPanel.hide();
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
        }

        private showFactionUi($tab: number): void {
            var $obj: any;

            if (GuidData.faction) {
                //已经加入帮派了 
                if (!this._existFactionUiPanel) {
                    this._existFactionUiPanel = new ExistFactionUiPanel();
                }
                $obj = this._existFactionUiPanel;
            } else {
                //未加入帮派
                if (!this._applyFactionUiPanel) {
                    this._applyFactionUiPanel = new ApplyFactionUiPanel();
                }
                $obj = this._applyFactionUiPanel;
            }

            $obj.load(() => {
                //停止绘制前面的ui
                SceneManager.getInstance().render = false;
                ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
                // UIManager.getInstance().addUIContainer(this._factionUiPanel);
                if ($tab == 7) {
                    $obj.show(1);
                } else {
                    $obj.show();
                }



                var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
                $scenePange.data = SharedDef.MODULE_FACTION
                ModuleEventManager.dispatchEvent($scenePange);



            })
        }

        private getNewList(byte: ByteArray): void {
            var faction: s2c_faction_get_list_result = new s2c_faction_get_list_result()
            s2c_faction_get_list_result.read(faction, byte);
            if (this._applyFactionUiPanel && this._applyFactionUiPanel.applyzhaomupanel) {
                this._applyFactionUiPanel.applyzhaomupanel.getDataAndRefresh(faction);
            }
            console.log("---faction---", faction);
        }


        private rankLiskResult($byte: ByteArray): void {
            var sral: s2c_rank_add_like_result = new s2c_rank_add_like_result();
            s2c_rank_add_like_result.read(sral, $byte);
            console.log("---sral.type, sral.guid, sral.num--", sral.type, sral.guid, sral.num);
        }

        private getnewInvite($byte: ByteArray) {
            var sral: s2c_show_faction_invite = new s2c_show_faction_invite();
            s2c_show_faction_invite.read(sral, $byte);
            console.log("---来新的邀请了--", sral.faction_guid, sral.faction_name, sral.guid, sral.name);
            FactionModel.getInstance().chgInvitationList_add(sral);

            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FactionEvent(FactionEvent.SHOW_FACTIONUI_EVENT),
                new FactionEvent(FactionEvent.HIDE_APPLYFACTIONUI_EVENT),
                new FactionEvent(FactionEvent.HIDE_EXISTFACTIONUI_EVENT),
                new FactionEvent(FactionEvent.REFRESHAPPLYZHAOMUlIST_EVENT),
                new FactionEvent(FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONITEM_EVENT),
                new FactionEvent(FactionEvent.JOINFACTIONITEM_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONITEMAPPLY_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONLEV_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONMONEY_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONGX_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONGG_EVENT),
                new FactionEvent(FactionEvent.REFRESHFACTIONIDENTITY_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONAPPOINTMENT_EVENT),
                new FactionEvent(FactionEvent.FACTION_QUIT_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),

                new FactionEvent(FactionEvent.SHOW_FACTIONRECRUITING_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONNOTICE_EVENT),
                new FactionEvent(FactionEvent.FUNBUILD_CHG_EVENT),

                new FactionEvent(FactionEvent.SHOW_FACTIONACTIVE_PANEL_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONACTIVE_LEAD_CHANGE_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONACTIVE_TRIP_CHANGE_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONSKILL_PANEL_EVENT),
                new FactionEvent(FactionEvent.SHOW_FACTIONSKILL_CHG_EVENT),
                new FactionEvent(FactionEvent.SHOW_INVITATION_EVENT),
                new FactionEvent(FactionEvent.INVITATION_CHG_EVENT),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
                new EngineEvent(EngineEvent.SYSTEM_OPEN_EVENT),
                new EngineEvent(EngineEvent.MONEY_CHANGE),
            ];
        }

        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_FACTION_GET_LIST_RESULT] = ($byte: ByteArray) => { this.getNewList($byte) };
            // obj[Protocols.SMSG_SHOW_FACTION_GIFT_PAGE] = ($byte: ByteArray) => { this.getgiftpage($byte) };
            // obj[Protocols.SMSG_SHOW_FACTION_GIFT_INFO] = ($byte: ByteArray) => { this.getgiftinfo($byte) };
            obj[Protocols.SMSG_RANK_ADD_LIKE_RESULT] = ($byte: ByteArray) => { this.rankLiskResult($byte) };
            // obj[Protocols.SMSG_SHOW_FACTION_GIFT_RANK_INFO] = ($byte: ByteArray) => { this.queenRankList($byte) };
            obj[Protocols.SMSG_SHOW_FACTION_INVITE] = ($byte: ByteArray) => { this.getnewInvite($byte) };
            return obj;
        }

    }
}