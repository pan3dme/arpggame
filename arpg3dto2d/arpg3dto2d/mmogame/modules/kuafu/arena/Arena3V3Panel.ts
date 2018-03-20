module kuafu {

    export class Arena3V3Panel extends UIConatiner {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        private _winMidRender: UIRenderComponent;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public setUIAtlas($uiatlas: UIAtlas, $winMidRender: UIRenderComponent): void {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;

            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);


            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);

            this.initUI();

        }



        private _winUIRenderAry: Array<UICompenent>;
        private _itemDjRoleAry: Array<Item3V3Role>;

        private _myRank: UICompenent;
        private _myScore: UICompenent;
        private _myRate: UICompenent;
        private _timeLab: UICompenent;

        private _helpBtn: UICompenent;
        private _rankBtn: UICompenent;
        private _rewardBtn: UICompenent;
        private _autoBtn: UICompenent;
        private _teamBtn: UICompenent;
        private _personBtn: UICompenent;

        private rewardAry: Array<RewardItem3V3>
        private initUI(): void {

            this._winUIRenderAry = this.getUIList(["t_bg", "a_role_line", "a_role_line1",
                "a_dz0", "a_dz1", "a_dz2", "a_name_bg0", "a_name_bg1", "a_name_bg2"], this._winMidRender);


            this.addUIList(["a_reward_title", "a_jifen_bg"], this._bgRender);


            this._itemDjRoleAry = new Array;
            for (var i: number = 0; i < 3; i++) {
                var item: Item3V3Role = new Item3V3Role;
                item.init(this._bgRender, this._topRender, i, this);
                this._itemDjRoleAry.push(item);
                var frameUI: FrameCompenent = <FrameCompenent>this.addChild(this._baseRender.getComponent("a_flg_bg" + i));
                frameUI.goToAndStop(i);
            }

            this.rewardAry = new Array;
            for (var i: number = 0; i < 3; i++) {
                var rewardItem: RewardItem3V3 = new RewardItem3V3();
                var robj: any = TableData.getInstance().getData(TableData.tb_kuafu3v3_day_reward, i + 1);
                rewardItem.init(this._bgRender, this._baseRender, i, this, robj);
                rewardItem.applyState();
                this.rewardAry.push(rewardItem);
            }

            this._helpBtn = this.addEvntButUp("a_help", this._bgRender);
            this._rankBtn = this.addEvntButUp("a_rank_btn", this._bgRender);
            this._rewardBtn = this.addEvntButUp("a_reward_btn", this._bgRender);
            this._autoBtn = this.addEvntButUp("a_aotu_btn", this._bgRender);
            this._teamBtn = this.addEvntButUp("a_team_btn", this._bgRender);
            this._personBtn = this.addEvntButUp("a_person_btn", this._bgRender);


            this._myRank = this.addChild(this._baseRender.getComponent("a_rank"));
            this._myScore = this.addChild(this._baseRender.getComponent("a_score"));
            this._myRate = this.addChild(this._baseRender.getComponent("a_rate"));
            this._timeLab = this.addChild(this._baseRender.getComponent("a_time"));

            var ui: UICompenent = this.addChild(this._baseRender.getComponent("a_rank_reward"));

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, ColorType.Brown7a2f21 + "排名奖励:", 16, TextAlign.LEFT);

            //this.c_vip_add = this.addChild(this._baseRender.getComponent("c_vip_add"));

            //this.challengeLab = this.addChild(this._baseRender.getComponent("a_bottom_lab3"));

            //this.addSelfRole();
            this.drawBaseInfo();
            //this.drawChallengNum();
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_3V3, SharedDef.RANK_TYPE_3V3, 1, 3);
        }

        public refreshReward(): void {
            if (this.rewardAry) {
                for (var i: number = 0; i < this.rewardAry.length; i++) {
                    this.rewardAry[i].applyState();
                }
            }
        }
        private _upFun: Function;
        private targetTime: number;
        private initUpdate(): void {
            if (!this._upFun) {
                this._upFun = () => {
                    this.drawTime();
                }
            }
            var obj: any = TableData.getInstance().getData(TableData.tb_kuafu3v3_base, 1);
            //obj.day = [3, 5, 6];
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts * 1000);
            var day: number = $sever.getDay();
            if (obj.day.indexOf(day) == -1) {//未开始
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, ColorType.Brown7a2f21 + "活动未开始", 16, TextAlign.CENTER);
                return;
            }

            var time: Array<number> = obj.activetime[0];
            if (!TimeUtil.compareTime(time[0], time[1]) && TimeUtil.compareTime(time[2], time[3])) {
                var $ts: number = GameInstance.getServerNow();
                var $play: Date = new Date($ts * 1000);

                $play.setHours(time[2]);
                $play.setMinutes(time[3]);
                $play.setSeconds(0);
                $play.setMilliseconds(0);

                this.targetTime = $play.getTime() / 1000;

                TimeUtil.addTimeTick(1000, this._upFun);
            } else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, ColorType.Brown7a2f21 + "活动未开始", 16, TextAlign.CENTER);
            }


        }




        private drawBaseInfo(): void {
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRank.skinName, ColorType.Brown7a2f21 + "我的排名:" + ColorType.Green2ca937 + "90", 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myScore.skinName, ColorType.Brown7a2f21 + "我的积分:" + ColorType.Green2ca937 + GuidData.player.get3V3Score(), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRate.skinName,
                ColorType.Brown7a2f21 + "胜率:" + ColorType.Green2ca937 + GuidData.player.get3V3Wins() + "/" + GuidData.player.get3V3Count(), 16, TextAlign.LEFT);
        }


        private _lastTime: number = 0;
        private drawTime(): void {

            var dtime: number = this.targetTime - GameInstance.getServerNow();
            var timeStr: string;
            if (dtime > 0) {
                timeStr = ColorType.Brown7a2f21 + "活动剩余：" + ColorType.colorcd2000 + TimeUtil.getLocalTime3(dtime);
            } else {
                timeStr = ColorType.Brown7a2f21 + "活动未开始";
                TimeUtil.removeTimeTick(this._upFun);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._timeLab.skinName, timeStr, 16, TextAlign.CENTER);

        }




        /*************************************** */
        //private _logPanel: ArenaQualifyingLog;
        private _rewardPanel: Arena3V3Reward;
        private _rankPanel: Arena3V3Rank;
        protected butClik($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            switch ($e.target) {
                case this._rewardBtn:
                    this.showRewardPanel();
                    break;
                case this._rankBtn:
                    this.showRankPanel();
                    break;
                case this._personBtn:
                    // if (GuidData.team && GuidData.team.getTeamItemAry().length) {
                    //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请先离开队伍", 99);
                    // } else {
                    //     NetManager.getInstance().protocolos.kuafu_3v3_match();
                    // }

                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            msgtip.MsgTipManager.outStr("[ff0000]请点击<队伍进入>按钮进入副本挑战", 99);
                        } else {
                            msgtip.MsgTipManager.outStr("[ff0000]当前处于队伍中，无法操作", 99);
                        }
                        return;
                    }
                    NetManager.getInstance().protocolos.kuafu_3v3_match();

                    break;
                case this._autoBtn:
                    if (GuidData.team) {
                        msgtip.MsgTipManager.outStr("[ff0000]当前已在队伍中", 99);
                    } else {
                        this.gotoTeamModul();
                    }
                    break;
                case this._teamBtn:
                    if (GuidData.team) {
                        if (GuidData.team.getTeamLeaderGuid() == GuidData.player.getGuid()) {
                            //队长
                            if (GuidData.team.getTeamMemberNum() < 3) {
                                msgtip.MsgTipManager.outStr("[ff0000]只有队伍满员状态，才可发起挑战", 99);
                            } else {
                                NetManager.getInstance().protocolos.kuafu_3v3_group_match();
                            }
                        } else {
                            msgtip.MsgTipManager.outStr("[ff0000]只有队长可以发起挑战", 99);
                        }
                    } else {
                        AlertUtil.show("不在队伍中，是否前往创建或寻找队伍？", "提示", (a: any) => {
                            if (a == 1) {
                                this.gotoTeamModul();
                            }
                        }, 2, ["是", "否"])
                    }
                    //     if (GuidData.team && GuidData.team.getTeamItemAry().length) {

                    //         NetManager.getInstance().protocolos.kuafu_3v3_group_match();
                    //     } else {
                    //         msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请先加入队伍", 99);
                    //     }

                    break;
                case this._helpBtn:
                    this.showGG();
                    break;
                default:
                    break;
            }
        }

        private gotoTeamModul() {
            ModuleEventManager.dispatchEvent(new KuaFuEvent(KuaFuEvent.KUAFU_HIDE_ARENA_PANEL_EVENT))
            var tabvo: team.TabVo = new team.TabVo
            // tabvo.id = 0;
            tabvo.tab = team.TeamModel.getInstance().getTabVoByType(5);
            tabvo.maxlev = tabvo.tab.tab.max_lev[1];
            tabvo.minlev = tabvo.tab.tab.min_lev[0];
            ModulePageManager.openPanel(SharedDef.MODULE_TEAM, tabvo);

        }

        public showRewardPanel(): void {
            if (!this._rewardPanel) {
                this._rewardPanel = new Arena3V3Reward();
            }
            this._rewardPanel.load(() => {
                this._rewardPanel.show(this._baseUiAtlas);
            })
        }

        public showRankPanel(): void {
            if (!this._rankPanel) {
                this._rankPanel = new Arena3V3Rank();
            }
            this._rankPanel.load(() => {
                this._rankPanel.show(this._baseUiAtlas);
            })
        }

        private bossGz: sboss.BossGz;
        private showGG(): void {
            if (!this.bossGz) {
                this.bossGz = new sboss.BossGz();
            }
            this.bossGz.load(() => {
                this.bossGz.show("3v3");
            })
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_vip_add.skinName, getvipadd("djtReward"), 14, TextAlign.CENTER, ColorType.color9a683f);

            if (this._baseUiAtlas) {
                this.addWinmid();
                //NetManager.getInstance().protocolos.doujiantai_get_enemys_info();
                //this.drawBaseInfo();
                //this.drawChallengNum();
                NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_3V3, SharedDef.RANK_TYPE_3V3, 1, 3);
                this.refreshReward();
                this.drawBaseInfo();
            }

            this.initUpdate();

        }

        public refresh3v3Info($data: any): void {
            var list: Array<RankData> = $data.list;
            var selfLev: number = $data.self;
            //console.log("-----3v3 data---------------")
            var rAry: Array<any> = new Array;
            for (var i: number = 0; i < list.length; i++) {
                var obj: any = new Object;
                var rdata: RankData = list[i];
                obj.name = rdata.getRankName();
                obj.faction = rdata.getRankFaction();
                obj.coat = rdata.getRankCoat();
                obj.weapon = rdata.getRankWeapon();
                obj.chartype = rdata.getRankGender();
                obj.win = rdata.getRank3v3Win();
                obj.all = rdata.getRank3v3Count();
                obj.score = rdata.getRank3v3Scores();
                obj.rank = rdata.getRank();
                rAry.push(obj);
                ////console.log(obj);
            }
            if (rAry.length == 3 && rAry[0].name != "") {
                for (var i: number = 0; i < rAry.length; i++) {
                    if (this._itemDjRoleAry[i] && rAry[i].name != "") {
                        this._itemDjRoleAry[i].setData(rAry[i]);
                    }
                }
            } else if (rAry.length > 3) {
                if (this._rankPanel && this._rankPanel.hasStage) {
                    this._rankPanel.setRankData(rAry, selfLev, $data.all);
                }
            }
            var selfLevStr: string;
            if (selfLev > 0) {
                selfLevStr = String(selfLev);
            } else {
                selfLevStr = "未上榜";
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._myRank.skinName, ColorType.Brown7a2f21 + "我的排名:" + ColorType.Green2ca937 + selfLevStr, 16, TextAlign.LEFT);
        }

        public addWinmid(): void {
            for (var i: number = 0; i < this._winUIRenderAry.length; i++) {
                this.addChild(this._winUIRenderAry[i]);
            }
        }

        public removeWinmid(): void {
            for (var i: number = 0; i < this._winUIRenderAry.length; i++) {
                this.removeChild(this._winUIRenderAry[i]);
            }
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
            //this.removeChild(this._mainBg);
            TimeUtil.removeTimeTick(this._upFun);
        }

    }
    export class RewardItem3V3 {
        public icon: UICompenent;
        public flag: FrameCompenent;
        public arrui: FrameCompenent;
        public getui: UICompenent;

        private container: UIConatiner;
        private data: any;
        public init($bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $id: number, $container: UIConatiner, $data: any): void {
            this.container = $container;
            this.data = $data;
            this.icon = $container.addChild($bgRender.getComponent("b_icon" + $id));
            if ($id > 0) {
                this.arrui = <FrameCompenent>$container.addChild($bgRender.getComponent("a_reward_f" + $id));
            }
            this.flag = <FrameCompenent>$baseRender.getComponent("a_chuo" + $id);
            this.flag.goToAndStop($id);
            this.getui = $baseRender.getComponent("a_get" + $id);
            this.icon.addEventListener(InteractiveEvent.Up, this.onClick, this);
        }
        private _sta: number = -1;

        public applyState(): void {
            var all: number = GuidData.player.get3V3Count();
            var hasGet: boolean = GuidData.instanceData.get3V3DayRewardState(this.data.id);
            if (hasGet) {
                this.setState(2);
            } else if (all >= this.data.num) {
                this.setState(1);
            } else {
                this.setState(0);
            }

        }

        public setState($sta: number): void {
            if (this._sta == $sta) {
                return;
            }
            if ($sta == 0) {//未达到
                IconManager.getInstance().drawItemIcon40(this.icon, this.data.reward[0][0], this.data.reward[0][1], true);
                this.container.addChild(this.flag);
                if (this.arrui) { this.arrui.goToAndStop(1); }
                this.container.removeChild(this.getui);
            } else if ($sta == 1) {//可领取
                IconManager.getInstance().drawItemIcon40(this.icon, this.data.reward[0][0], this.data.reward[0][1]);
                this.container.addChild(this.flag);
                if (this.arrui) { this.arrui.goToAndStop(0); }
                this.container.removeChild(this.getui);
            } else if ($sta == 2) {//已领取
                IconManager.getInstance().drawItemIcon40(this.icon, this.data.reward[0][0], this.data.reward[0][1]);
                this.container.removeChild(this.flag);
                if (this.arrui) { this.arrui.goToAndStop(0); }
                this.container.addChild(this.getui);
            }
            this._sta = $sta;
        }
        private onClick($e: InteractiveEvent): void {
            if (this._sta == 1) {
                NetManager.getInstance().protocolos.kuafu_3v3_dayreward(this.data.id);
            }
        }
    }
    export class Item3V3Role {
        public role: Person2DChar;
        public factionUI: UICompenent
        public nameUI: UICompenent;
        public scoreUI: UICompenent
        public rewardbtn: UICompenent;
        public rateUI: UICompenent;
        public id: number = 0
        public constructor() {
            this.role = new Person2DChar();
            this.resize();
        }

        public resize(): void {
            this.role.scale = 3.5 * UIData.Scale;
            var xoff: number = this.id;
            if (this.id == 0) {
                xoff = 1;
            } else if (this.id == 1) {
                xoff = 0;
            }
            this.role.x = (225 - 125 * xoff) * UIData.Scale;
            this.role.y = (-70 - this.id * 10) * UIData.Scale;
            this.role.resize();
        }
        private rewardAry: Array<any>;
        public init($roleRender: UIRenderComponent, $render: UIRenderComponent, $id: number, $container: UIConatiner): void {
            $roleRender.addModel(this.role);
            this.id = $id;

            this.nameUI = $container.addChild($render.getComponent("a_r_n" + $id));
            this.factionUI = $container.addChild($render.getComponent("a_r_f" + $id));
            this.scoreUI = $container.addChild($render.getComponent("a_r_s" + $id));
            this.rateUI = $container.addChild($render.getComponent("a_r_r" + $id));
            this.rewardbtn = $container.addChild($render.getComponent("a_rewarditem" + $id));
            this.rewardbtn.addEventListener(InteractiveEvent.Up, this.onClick, this);


            //var obj: any = TableData.getInstance().getData(TableData.tb_doujiantai_base, 1);
            //var str: string = "挑战奖励:" + getResName(obj.tryReward[0][0]) + Snum(obj.tryReward[0][1]);
            //LabelTextFont.writeSingleLabel(this.rateUI.uiRender.uiAtlas, this.rateUI.skinName, str, 16, TextAlign.CENTER, ColorType.Whitefff4d6);

            // var temp: any = new Object();
            // temp.name = "虚位以待";
            // temp.faction = "";
            // temp.score = "";
            // temp.rate = "";

            this.rewardAry = new Array;
            var obj: any = TableData.getInstance().getData(TableData.tb_local3v3_daily_reward, this.id + 1);
            var ary: Array<string> = obj.reward.split(",");
            for (var i: number = 0; i < ary.length; i += 2) {
                this.rewardAry.push([Number(ary[i]), Number(ary[i + 1])]);
            }

            // this.setData(temp);
            LabelTextFont.writeSingleLabel(this.nameUI.uiRender.uiAtlas, this.nameUI.skinName, "虚位以待", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
        }
        //public data: KuaFu1v1BangData;
        public setData($data: any): void {
            //this.data = $data;
            LabelTextFont.writeSingleLabel(this.nameUI.uiRender.uiAtlas, this.nameUI.skinName, getBaseName($data.name), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            LabelTextFont.writeSingleLabel(this.factionUI.uiRender.uiAtlas, this.factionUI.skinName, getBaseName($data.faction), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.scoreUI.uiRender.uiAtlas, this.scoreUI.skinName, ColorType.Brown7a2f21 + "积分:" + ColorType.Green2ca937 + $data.score, 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this.rateUI.uiRender.uiAtlas, this.rateUI.skinName,
                ColorType.Brown7a2f21 + "胜率:" + ColorType.Green2ca937 + $data.win + "/" + $data.all, 16, TextAlign.CENTER);
            this.role.setBaseRoleAvatar($data.coat, $data.chartype);
            this.role.setBaseRoleWeapon($data.weapon, $data.chartype);
            this.resize();
        }

        private onClick($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            var aaa: pass.BoxVo = new pass.BoxVo;
            aaa.rewardary = this.rewardAry;
            aaa.id = -1;
            aaa.title = 0
            aaa.canbuy = false;
            var $eee = new pass.PassEvent(pass.PassEvent.SHOW_BOXREWARD_PANEL);
            $eee.data = aaa;
            ModuleEventManager.dispatchEvent($eee);
        }

    }


    export class Arena3V3Reward extends WindowMinUi {
        private _baseRender: UIRenderComponent;
        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

        }

        public applyLoad(): void {
            this.applyLoadComplete();
        }

        private _slist: Arena3V3RewardList;
        private initUI($atlas: UIAtlas): void {
            if (this._slist) {
                return;
            }
            this._slist = new Arena3V3RewardList();
            this._slist.init($atlas);
            this._baseRender.uiAtlas = $atlas;
            this.addUIList(["a_b_title", "a_r_line1", "a_r_line2"], this._baseRender);
            var ui: UICompenent;
            ui = this.addChild(this._baseRender.getComponent("a_b_rank"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "排名", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_b_reward"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "奖励", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        public onRemove(): void {
            if (this._slist) {
                this._slist.hide();
            }
        }

        public show($uiatlas: UIAtlas): void {
            this.initUI($uiatlas);
            UIManager.getInstance().addUIContainer(this);
            this._slist.show();
        }
        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }
        }

    }

    export class Arena3V3RewardList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = this.getDataAry();
            var w: number = 512;
            var h: number = 330;
            this.setData(ary, Arena3V3RewardListItemRender, w, h, 500, 85, 4, 512, 512, 1, 6);
            this.center = 0;
            this.middle = 20;
            this.setShowLevel(4);
        }

        public getDataAry(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var size: number = TableData.getInstance().getTabMaxID(TableData.tb_local3v3_daily_reward);
            for (var i: number = 1; i <= size; i++) {
                var data: SListItemData = new SListItemData();
                data.data = TableData.getInstance().getData(TableData.tb_local3v3_daily_reward, i);
                data.id = i;
                ary.push(data);
            }
            //ary.reverse();
            return ary;
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }



    }

    export class Arena3V3RewardListItemRender extends SListItem {
        private _icon: UICompenent;
        private _nameui: UICompenent;
        private _ibg: UICompenent;

        private _iconAry: Array<UICompenent>;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "r_bg", 0, 0, 512, 85);
            $container.addChild(this._ibg);

            // this._icon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "r_icon", 33, 8, 66, 70);
            // $container.addChild(this._icon);

            this._nameui = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "r_name", 40, 29, 80, 23);
            $container.addChild(this._nameui);

            this._iconAry = new Array;
            for (var i: number = 0; i < 4; i++) {
                var ui: UICompenent = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "r_i" + i, 190 + 76 * i, 8, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }


        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && $data.data) {
                this.applyRender();
            }
        }

        private applyRender(): void {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            var rankStr: string;
            if (this.itdata.data.rank[0] == 0) {
                rankStr = "未上榜";
            } else if (this.itdata.data.rank[0] == this.itdata.data.rank[1]) {
                rankStr = String(this.itdata.data.rank[0]);
            } else {
                rankStr = this.itdata.data.rank[0] + "-" + this.itdata.data.rank[1];
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._nameui.skinName, rankStr, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            //UiDraw.clearUI(this._icon);
            //this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._icon.skinName);

            //var rary:Array<number> = this.itdata.data.itemWinKeys;
            //var nary:Array<number> = this.itdata.data.itemWinValues;
            var rnary: Array<number> = this.itdata.data.reward.split(",");
            for (var i: number = 0; i < this._iconAry.length; i++) {
                IconManager.getInstance().drawItemIcon60(this._iconAry[i], rnary[i * 2], rnary[i * 2 + 1]);
            }
        }


    }


    export class Arena3V3Rank extends WindowMinUi {
        private _baseRender: UIRenderComponent;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this.setBlackBg();

        }

        public applyLoad(): void {
            this.applyLoadComplete();
        }

        private _slist: Arena3V3RankList;

        private _myRank: UICompenent;
        private _myScore: UICompenent;
        private _myRate: UICompenent;

        private initUI($atlas: UIAtlas): void {
            if (this._slist) {
                return;
            }
            this._slist = new Arena3V3RankList();
            this._slist.init($atlas);
            this._baseRender.uiAtlas = $atlas;
            this.addUIList(["a_c_title", "a_c_line1", "a_c_line2", "a_c_line3", "a_c_line", "a_r_line2"], this._baseRender);
            var ui: UICompenent;
            ui = this.addChild(this._baseRender.getComponent("a_c_rank"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "排名", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_c_name"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "名字", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_c_score"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "积分", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            ui = this.addChild(this._baseRender.getComponent("a_c_rate"));
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "胜率", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            this._myRank = this.addChild(this._baseRender.getComponent("a_c_my_rank"));
            this._myScore = this.addChild(this._baseRender.getComponent("a_c_my_score"));
            this._myRate = this.addChild(this._baseRender.getComponent("a_c_my_rate"));
            //this.drawMyInfo();
        }

        public drawMyInfo($rank: number): void {
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._myRank.skinName, ColorType.Brown7a2f21 + "我的排名:" + ColorType.Green2ca937 + ($rank < 0 ? "未上榜" : $rank), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._myScore.skinName, ColorType.Brown7a2f21 + "我的积分:" + ColorType.Green2ca937 + GuidData.player.get3V3Score(), 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._myRate.skinName, ColorType.Brown7a2f21 + "我的胜率:" + ColorType.Green2ca937 + GuidData.player.get3V3Wins() + "/" + GuidData.player.get3V3Count(), 16, TextAlign.LEFT);
        }

        public onRemove(): void {
            if (this._slist) {
                this._slist.hide();
            }

        }

        public show($uiatlas: UIAtlas, $type: number = 0): void {
            UIManager.getInstance().addUIContainer(this);
            this.initUI($uiatlas);
            this._slist.show($type);
        }

        public setRankData($list: Array<any>, self: number, $all: number): void {
            if (this._slist) {
                this._slist.setRankData($list, $all);
            }
            this.drawMyInfo(self);
        }
        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }
        }

    }

    export class Arena3V3RankList extends SList {
        public constructor() {
            super();
        }

        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = new Array();
            var w: number = 590;
            var h: number = 300;
            this.setData(ary, Arena3V3RankListItemRender, w, h, 512, 60, 5, 512, 256, 1, 9);
            this.center = 0;
            this.middle = 5;
            this.setShowLevel(4);
            this.setDragFun(() => {
                ////console.log("up");
                if (this._page > 0) {
                    this._page--;
                    this.getPageData();
                }
            }, () => {
                ////console.log("down");
                if (this._page < (this._allPage - 1)) {
                    this._page++;
                    this.getPageData();
                }
            });
        }

        // public getDataAry(): Array<SListItemData> {
        //     var ary: Array<SListItemData> = new Array<SListItemData>();

        //     for (var i: number = 0; i < 10; i++) {
        //         var data: SListItemData = new SListItemData();
        //         data.data = { rank: String(i + 1), name: "张三" + i, score: String(i), rate: String(i) };
        //         data.id = i;
        //         ary.push(data);
        //     }
        //     return ary;
        // }
        private _type: number;
        private _page: number;
        private _allPage: number = 1;
        private _pageNum: number = 10;
        public show($type: number = 0): void {
            this._type = $type;
            UIManager.getInstance().addUIContainer(this);
            //var ary: Array<SListItemData> = this.getDataAry();
            //this.refreshData(ary);
            this._page = 0;
            this.getPageData();
        }

        public getPageData(): void {
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_3V3, SharedDef.RANK_TYPE_3V3, this._page * this._pageNum + 1, (this._page + 1) * this._pageNum);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public setRankData($list: Array<any>, $all: number): void {
            this._allPage = Math.ceil($all / this._pageNum);
            var ary: Array<SListItemData> = new Array<SListItemData>();

            for (var i: number = 0; i < $list.length; i++) {
                if ($list[i].name != "") {
                    var data: SListItemData = new SListItemData();
                    data.data = $list[i];
                    data.id = i;
                    ary.push(data);
                }

            }
            this.refreshData(ary);

        }



    }

    export class Arena3V3RankListItemRender extends SListItem {
        private _rank: UICompenent;
        private _name: UICompenent;
        private _score: UICompenent;
        private _rate: UICompenent;
        private _ibg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "q_bg", 0, 0, 590, 60);
            $container.addChild(this._ibg);

            this._rank = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_rank", 30, 20, 70, 25);
            $container.addChild(this._rank);

            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_name", 140, 20, 150, 25);
            $container.addChild(this._name);

            this._score = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_score", 310, 20, 120, 25);
            $container.addChild(this._score);

            this._rate = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "q_rate", 460, 20, 120, 25);
            $container.addChild(this._rate);

        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.clearRender();
            }
        }

        private applyRender(): void {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            } else {
                UiDraw.clearUI(this._ibg);
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._rank.skinName, String(this.itdata.data.rank), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, getBaseName(this.itdata.data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._score.skinName, String(this.itdata.data.score), 16, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._rate.skinName, this.itdata.data.win + "/" + this.itdata.data.all, 16, TextAlign.CENTER, ColorType.Green2ca937);

        }

        private clearRender(): void {
            UiDraw.clearUI(this._rank);
            UiDraw.clearUI(this._name);
            UiDraw.clearUI(this._score);
            UiDraw.clearUI(this._rate);
        }



    }

}