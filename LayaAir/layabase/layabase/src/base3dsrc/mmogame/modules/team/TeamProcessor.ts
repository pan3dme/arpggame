module team {
    export class TeamEvent extends BaseEvent {
        public static SHOW_TEAM_PANEL: string = "SHOW_TEAM_PANEL"; //显示面板
        public static HIDE_TEAM_PANEL: string = "HIDE_TEAM_PANEL"; //隐藏面板
        public static JOIN_EXIT_TEAM_PANEL: string = "JOIN_EXIT_TEAM_PANEL"; //加入或退出队伍
        public static AUTOMATCH_TEAM_PANEL: string = "AUTOMATCH_TEAM_PANEL"; //匹配状态改变
        public static REFRESHLIST_TEAM_PANEL: string = "REFRESHLIST_TEAM_PANEL"; //组队list变化

        public static SHOW_TEAMTYPE_PANEL: string = "SHOW_TEAMTYPE_PANEL"; //显示选择任务类型面板
        public static SELECT_TEAMTYPE_PANEL: string = "SELECT_TEAMTYPE_PANEL"; //选中任务类型
        public static SURE_TEAMTYPE_PANEL: string = "SURE_TEAMTYPE_PANEL"; //确认任务类型选则
        public static CHG_TEAMTYPE_PANEL: string = "CHG_TEAMTYPE_PANEL"; //队伍任务类型选则

        public static TARGET_INST_TEAM_PANEL: string = "TARGET_INST_TEAM_PANEL"; //队员确认进入副本面板

        public static CONVENIENT_TEAM_PANEL: string = "CONVENIENT_TEAM_PANEL"; //便捷组队入口

        public static CONVENIENT_SELECT_PANEL: string = "CONVENIENT_SELECT_PANEL"; //便捷组队发送一次请求后

        public static APPLY_TEAM_PANEL: string = "APPLY_TEAM_PANEL"; //入队申请界面
        public static CHG_APPLYLIST_TEAM_PANEL: string = "CHG_APPLYLIST_TEAM_PANEL"; //入队申请数据变化

        public static INVITATION_LIST_TEAM_PANEL: string = "INVITATION_LIST_TEAM_PANEL"; //邀请入队界面
        public static BUILD_TEAM_PANEL: string = "BUILD_TEAM_PANEL"; //创建队伍
        public static INVIREQUEST_TEAM_PANEL: string = "INVIREQUEST_TEAM_PANEL"; //邀请处理


        public data: any
    }
    export class TeamModule extends Module {
        public getModuleName(): string {
            return "TeamModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new TeamProcessor()];
        }
    }

    export class TeamProcessor extends BaseProcessor {
        public getName(): string {
            return "TeamProcessor";
        }

        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof TeamEvent) {
                var $TeamEvent: TeamEvent = <TeamEvent>$event;


                if ($TeamEvent.type == TeamEvent.SHOW_TEAM_PANEL) {
                    this.showPanel($TeamEvent.data);
                } else if ($TeamEvent.type == TeamEvent.HIDE_TEAM_PANEL) {
                    this.hidePanel();
                } else if ($TeamEvent.type == TeamEvent.REFRESHLIST_TEAM_PANEL) {

                } else if ($TeamEvent.type == TeamEvent.SELECT_TEAMTYPE_PANEL) {
                    if (this.chgTeamType && this.chgTeamType.hasStage) {
                        this.chgTeamType.resetData($TeamEvent.data);
                    }
                    if (this.convenientTeam && this.convenientTeam.hasStage) {
                        this.convenientTeam.resetData($TeamEvent.data);
                    }
                } else if ($TeamEvent.type == TeamEvent.CONVENIENT_SELECT_PANEL) {
                    if (this.convenientTeam && this.convenientTeam.convenientList &&　this.convenientTeam.convenientList.hasStage) {
                        this.convenientTeam.convenientList.refreshDataByNewData($TeamEvent.data);
                    }
                    if (this.invitationTeam && this.invitationTeam.incitationList &&　this.invitationTeam.incitationList.hasStage) {
                        this.invitationTeam.incitationList.refreshDataByNewData($TeamEvent.data);
                    }
                } else if ($TeamEvent.type == TeamEvent.CONVENIENT_TEAM_PANEL) {
                    this.showConvenientPanel($TeamEvent.data);
                } else if ($TeamEvent.type == TeamEvent.TARGET_INST_TEAM_PANEL) {
                    console.log("--------进入副本确认------",GuidData.team.getTeamTargetInst());
                    if(GuidData.team.getTeamTargetInst() > 0){
                        this.showTargetInstPanel();
                    }
                } else if ($TeamEvent.type == TeamEvent.SURE_TEAMTYPE_PANEL) {
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.refreshType($TeamEvent.data);
                    }
                } else if ($TeamEvent.type == TeamEvent.CHG_TEAMTYPE_PANEL) {
                    this.drawTarget();
                } else if ($TeamEvent.type == TeamEvent.AUTOMATCH_TEAM_PANEL) {
                    this.refreshTeamList();
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.setAutoState();
                    }
                } else if ($TeamEvent.type == TeamEvent.APPLY_TEAM_PANEL) {
                    this.showApplyPanel();
                } else if ($TeamEvent.type == TeamEvent.CHG_APPLYLIST_TEAM_PANEL) {
                    if(this.applyPanel && this.applyPanel.applyTeamList && this.applyPanel.applyTeamList.hasStage){
                        this.applyPanel.applyTeamList.refreshDataByNewData();
                    }
                    if(this.inviResquestPanel && this.inviResquestPanel.invitationList && this.inviResquestPanel.invitationList.hasStage){
                        this.inviResquestPanel.invitationList.resetData();
                    }
                } else if ($TeamEvent.type == TeamEvent.INVIREQUEST_TEAM_PANEL) {
                    this.showInviRequestPanel();
                } else if ($TeamEvent.type == TeamEvent.BUILD_TEAM_PANEL) {
                    if(this.teamUiPanel && this.teamUiPanel.hasStage){
                        this.teamUiPanel.buildEvent();
                    }
                } else if ($TeamEvent.type == TeamEvent.INVITATION_LIST_TEAM_PANEL) {
                    this.showInvitationPanel();
                } else if ($TeamEvent.type == TeamEvent.SHOW_TEAMTYPE_PANEL) {
                    this.showTypePanel($TeamEvent.data);
                } else if ($TeamEvent.type == TeamEvent.JOIN_EXIT_TEAM_PANEL) {
                    if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                        this.teamUiPanel.chgTeam();
                        this.teamUiPanel.drawExp();
                    }
                    this.refreshTeamList();
                    this.drawTarget();
                    if(this.teamSurePanel && this.teamSurePanel.hasStage){
                        this.teamSurePanel.refresh();
                    }
                }

            }

            if ($event instanceof EngineEvent) {
                var $engineEvent: EngineEvent = <EngineEvent>$event;
                if ($engineEvent.type == EngineEvent.PLAYER_FIELD_LEVEL) {

                } else if ($engineEvent.type == EngineEvent.CORE_DATA_COMPLETE_EVENT) {

                }
            }

            if ($event instanceof UIPanelEvent) {
                var panelEvent: UIPanelEvent = <UIPanelEvent>$event;
                if (panelEvent.panel == this.teamUiPanel) {
                    this.teamUiPanel.dispose();
                    this.teamUiPanel = null;
                    //console.log("释放面板 passUiPanel")
                }
                if (panelEvent.panel == this.chgTeamType) {
                    this.chgTeamType.dispose();
                    this.chgTeamType = null;
                    //console.log("释放面板 chgTeamType")
                }
                if (panelEvent.panel == this.teamSurePanel) {
                    this.teamSurePanel.dispose();
                    this.teamSurePanel = null;
                    //console.log("释放面板 teamSurePanel")
                }
                if (panelEvent.panel == this.convenientTeam) {
                    this.convenientTeam.dispose();
                    this.convenientTeam = null;
                    //console.log("释放面板 convenientTeam")
                }
                if (panelEvent.panel == this.applyPanel) {
                    this.applyPanel.dispose();
                    this.applyPanel = null;
                    //console.log("释放面板 applyPanel")
                }
                if (panelEvent.panel == this.invitationTeam) {
                    this.invitationTeam.dispose();
                    this.invitationTeam = null;
                    //console.log("释放面板 invitationTeam")
                }
                if (panelEvent.panel == this.inviResquestPanel) {
                    this.inviResquestPanel.dispose();
                    this.inviResquestPanel = null;
                    //console.log("释放面板 inviResquestPanel")
                }
            }
        }

        private drawTarget(){
            if(GuidData.team){
                var $tabvo = TeamModel.getInstance().getdefaultTabVo();
                if (this.teamUiPanel && this.teamUiPanel.hasStage) {
                    this.teamUiPanel.refreshType($tabvo);
                }
            }
        }

        private refreshTeamList(){
            if (this.teamUiPanel && this.teamUiPanel.teamList && this.teamUiPanel.teamList.hasStage) {
                this.teamUiPanel.teamList.refreshDataByNewData();
            }
        }


        private hidePanel(): void {
            if (this.teamUiPanel) {
                this.teamUiPanel.hide();
            }
        }
        private teamUiPanel: TeamUiPanel
        private showPanel($tabvo:TabVo = null): void {
            if (!this.teamUiPanel) {
                this.teamUiPanel = new TeamUiPanel();
            }
            this.teamUiPanel.load(() => {
                if(!$tabvo){
                    $tabvo = TeamModel.getInstance().getdefaultTabVo();
                }
                this.teamUiPanel.show($tabvo);
            })
        }

        private teamSurePanel: TeamSurePanel
        private showTargetInstPanel(): void {
            if (!this.teamSurePanel) {
                this.teamSurePanel = new TeamSurePanel();
            }
            this.teamSurePanel.load(() => {
                this.teamSurePanel.show();
            })
        }

        private invitationTeam: InvitationTeam
        private showInvitationPanel(): void {
            if (!this.invitationTeam) {
                this.invitationTeam = new InvitationTeam();
            }
            this.invitationTeam.load(() => {
                this.invitationTeam.show();
            })
        }


        private chgTeamType: ChgTeamType
        private showTypePanel($tabvo:TabVo): void {
            if (!this.chgTeamType) {
                this.chgTeamType = new ChgTeamType();
            }
            this.chgTeamType.load(() => {
                this.chgTeamType.show($tabvo);
            })
        }

        private convenientTeam: ConvenientTeam
        private showConvenientPanel($tabvo:TabVo): void {
            if (!this.convenientTeam) {
                this.convenientTeam = new ConvenientTeam();
            }
            this.convenientTeam.load(() => {
                this.convenientTeam.show($tabvo);
            })
        }

        private applyPanel: ApplyPanel
        private showApplyPanel(): void {
            if (!this.applyPanel) {
                this.applyPanel = new ApplyPanel();
            }
            this.applyPanel.load(() => {
                this.applyPanel.show();
            })
        }

        private inviResquestPanel: InviResquestPanel
        private showInviRequestPanel(): void {
            if (!this.inviResquestPanel) {
                this.inviResquestPanel = new InviResquestPanel();
            }
            this.inviResquestPanel.load(() => {
                this.inviResquestPanel.show();
            })
        }

        //便捷组队
        private smsgsearchinfolist($byte: ByteArray): void {
            var $data: s2c_show_group_search_info_list = new s2c_show_group_search_info_list();
            s2c_show_group_search_info_list.read($data, $byte);
            if(this.convenientTeam && this.convenientTeam.convenientList){
                this.convenientTeam.convenientList.show($data.list);
       
            }
        }

        //申请入队
        private smsgjoinrequest($byte: ByteArray): void {

            var vo: ApplyCell = new ApplyCell;
            vo.guid = $byte.readString();
            vo.name =$byte.readString();
            vo.gender = $byte.readUint32();
            vo.lev = $byte.readUint32();
            vo.vip = $byte.readUint32();
            vo.force = $byte.readDouble();
            TeamModel.getInstance().addapplyList(vo);

            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        }

        //邀请入队
        private smsginvitationrequest($byte: ByteArray): void {
            var vo: InviRequestCell = new InviRequestCell;
            vo.teamGuid = $byte.readString();
            vo.name =$byte.readString();
            vo.type = $byte.readUint32();
            vo.level = $byte.readUint32();
            vo.force = $byte.readDouble();
            vo.sender_guid = $byte.readString();
            TeamModel.getInstance().addInvireqList(vo);
            console.log("---vo---",vo);
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        }


        public getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_SHOW_GROUP_SEARCH_INFO_LIST] = ($byte: ByteArray) => { this.smsgsearchinfolist($byte) };
            obj[Protocols.SMSG_SHOW_GROUP_JOIN_REQUEST] = ($byte: ByteArray) => { this.smsgjoinrequest($byte) };
            obj[Protocols.SMSG_SHOW_GROUP_INVITE] = ($byte: ByteArray) => { this.smsginvitationrequest($byte) };
            return obj;
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TeamEvent(TeamEvent.SHOW_TEAM_PANEL),
                new TeamEvent(TeamEvent.HIDE_TEAM_PANEL),
                new TeamEvent(TeamEvent.JOIN_EXIT_TEAM_PANEL),
                new TeamEvent(TeamEvent.INVITATION_LIST_TEAM_PANEL),
                new TeamEvent(TeamEvent.BUILD_TEAM_PANEL),
                new TeamEvent(TeamEvent.INVIREQUEST_TEAM_PANEL),
                new TeamEvent(TeamEvent.AUTOMATCH_TEAM_PANEL),
                new TeamEvent(TeamEvent.SURE_TEAMTYPE_PANEL),
                new TeamEvent(TeamEvent.REFRESHLIST_TEAM_PANEL),
                new TeamEvent(TeamEvent.SELECT_TEAMTYPE_PANEL),
                new TeamEvent(TeamEvent.SHOW_TEAMTYPE_PANEL),
                new TeamEvent(TeamEvent.CHG_APPLYLIST_TEAM_PANEL),
                new TeamEvent(TeamEvent.APPLY_TEAM_PANEL),
                new TeamEvent(TeamEvent.TARGET_INST_TEAM_PANEL),
                new TeamEvent(TeamEvent.CONVENIENT_TEAM_PANEL),
                new TeamEvent(TeamEvent.CONVENIENT_SELECT_PANEL),
                new TeamEvent(TeamEvent.CHG_TEAMTYPE_PANEL),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
                new EngineEvent(EngineEvent.PLAYER_FIELD_LEVEL),
                new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT),
            ];
        }






    }

}
