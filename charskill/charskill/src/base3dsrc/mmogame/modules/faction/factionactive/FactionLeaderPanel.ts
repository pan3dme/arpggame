module faction {

    export class FactionLeaderPanel extends UIConatiner {

        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        public parentWindow: FactionActivePanel;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public dispose(){
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
        }

        public setUIAtlas($uiatlas: UIAtlas, $win: FactionActivePanel): void {
            this._baseUiAtlas = $uiatlas;
            this.parentWindow = $win;


            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);

            this.initUI();
            this.initLead();

            this.drawBase();

            this._updateFun = () => {
                this.updateY();
            }

            if (this.hasStage) {
                this.showBg();
                TimeUtil.addFrameTick(this._updateFun);
            }
        }
        private _updateFun: Function;
        public updateY(): void {
            var ypos: number = Math.sin(TimeUtil.getTimer() / 300) * 5;
            if (!this.leadAry) {
                return;
            }
            for (var i: number = 0; i < this.leadAry.length; i++) {
                this.leadAry[i].offsety = ypos;
            }
        }
        public onAdd(): void {
            this.showBg();
            if (this._updateFun) {
                TimeUtil.addFrameTick(this._updateFun);
            }

            this.drawLead();
            this.drawBase();

        }

        public onRemove(): void {
            this.hideBg();
            if(this._updateFun){
                TimeUtil.removeFrameTick(this._updateFun);
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        private _bgInit: boolean = false;
        public showBg(): void {
            if (this.parentWindow && !this._bgInit) {
                var ui: UICompenent = this.parentWindow.loadBigPicByUrl("ui/uidata/faction/factionactive/factionbg.jpg");
                this._bgInit = true;
                ui.width = 824;
                ui.height = 448;
            }
            if (this.parentWindow) {
                this.parentWindow.addBigPic();
            }

        }

        public hideBg(): void {
            if (this.parentWindow) {
                this.parentWindow.removeBigPic();
            }
        }



        private datingLev: UICompenent;
        private attAdd: UICompenent;
        private rewardAdd: UICompenent;
        private lastNum: UICompenent;

        private rewardIconAry: Array<UICompenent> = new Array;
        //private rewardIconLabAry: Array<UICompenent> = new Array;

        public initUI(): void {
            var title: UICompenent = this._baseRender.getComponent("t_title");
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, title.skinName, "首领挑战", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.addChild(title);

            this.datingLev = this._baseRender.getComponent("t_dating_lev");
            this.addChild(this.datingLev);

            this.attAdd = this._baseRender.getComponent("t_att_aa");
            this.addChild(this.attAdd);

            this.rewardAdd = this._baseRender.getComponent("t_reward_add");
            this.addChild(this.rewardAdd);

            var rewardLab: UICompenent = this._baseRender.getComponent("t_reward_lab");
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, rewardLab.skinName, "击杀所有怪物奖励:通过邮件发放", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
            this.addChild(rewardLab);

            this.lastNum = this._baseRender.getComponent("t_last_num");
            this.addChild(this.lastNum);

            for (var i: number = 0; i < 3; i++) {
                var icon: UICompenent = this._baseRender.getComponent("t_icon" + i);
                this.addChild(icon);
                this.rewardIconAry.push(icon);

                // var iconLab: UICompenent = this._baseRender.getComponent("t_icon_lab" + i);
                // this.addChild(iconLab);
                // this.rewardIconLabAry.push(iconLab);
            }

        }

        private hallLev: number = 0;
        private leadNum: number = -1;
        private drawBase(): void {
            if (!this._baseUiAtlas) {
                return;
            }
            var vo: tb.TB_faction_building = FactionBuildModel.getInstance().getTabvo(SharedDef.FACTION_BUILDING_TYPE_EVENT);
            if (vo.level != this.hallLev) {
                this.hallLev = vo.level;
                var obj: any = TableData.getInstance().getData(TableData.tb_faction_bossdefense_base, this.hallLev);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.datingLev.skinName, ColorType.Brown7a2f21 + "活动大厅等级：" + ColorType.Green2ca937 + this.hallLev, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.attAdd.skinName, ColorType.Brown7a2f21 + "玩家属性 " + ColorType.Green2ca937 + "+" + obj.buffeadd + "%", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.rewardAdd.skinName, ColorType.Brown7a2f21 + "帮派贡献奖励 " + ColorType.Green2ca937 + "+" + obj.donate_up + "%", 14, TextAlign.LEFT, ColorType.Brown7a2f21);

                for (var i: number = 0; i < this.rewardIconAry.length; i++) {
                    if (!obj.clear_reward[i]) {
                        continue;
                    }
                    IconManager.getInstance().drawItemIcon40(this.rewardIconAry[i], obj.clear_reward[i][0], obj.clear_reward[i][1]);
                }
            }

            var pnum: number = GuidData.player.getFactionLeadNum();
            if (pnum != this.leadNum) {
                this.leadNum = pnum;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.lastNum.skinName, "剩余挑战次数：" + this.leadNum, 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            }


        }

        public leadAry: Array<LeaderIcon>;
        private initLead(): void {
            this.leadAry = new Array;
            var posAry: Array<Array<number>> = [[578, 133], [313, 158], [327, 339], [516, 328], [704, 283], [120, 378]];
            for (var i: number = 0; i < 6; i++) {
                var leadIcon: LeaderIcon = new LeaderIcon();
                leadIcon.creat(this._bgRender, this._baseRender, i, this);
                leadIcon.setBasePos(posAry[i][0], posAry[i][1]);
                this.leadAry.push(leadIcon);
            }
            this.drawLead();
        }

        public drawLead(): void {
            if (!this.leadAry) {
                return;
            }
            var ary: Array<FactionLeadData> = GuidData.faction.getLeaderData();
            for (var i: number = 0; i < this.leadAry.length; i++) {
                this.leadAry[i].setData(ary[i], i + 1);
            }
        }




    }


    export class LeaderIcon {
        public bloodBg: UICompenent;
        public blood: UICompenent;
        public icon: UICompenent;
        public lev: UICompenent;
        public state: UICompenent;
        public stateBg: UICompenent;
        public jian: FrameCompenent;

        public posAry: Array<Array<number>> = [[26, -10], [0, 69], [0, 69], [4, 80], [9, 83], [9, 98], [28, -54]];
        public uiList: Array<UICompenent>;
        public baseX: number = 0;
        public baseY: number = 0;
        private _uiContainer: UIConatiner;

        public creat($bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $id: number, $uicontainer: UIConatiner): void {
            this._uiContainer = $uicontainer;
            this.icon = $bgRender.getComponent("t_lead_icon" + $id);
            this.bloodBg = $bgRender.getComponent("t_lead_bb" + $id);
            this.blood = $baseRender.getComponent("t_lead_bt" + $id);
            this.stateBg = $bgRender.getComponent("t_lead_bg" + $id);
            this.lev = $baseRender.getComponent("t_lead_l" + $id);
            this.state = $baseRender.getComponent("t_lead_s" + $id);
            this.jian = <FrameCompenent>$baseRender.getComponent("t_jian" + $id);
            this.icon.addEventListener(InteractiveEvent.Up, this.onClick, this);


            this.uiList = new Array;

            this.uiList.push(this.icon, this.bloodBg, this.blood, this.stateBg, this.lev, this.state, this.jian);

            for (var i: number = 0; i < this.uiList.length; i++) {
                this.uiList[i].baseRec.x = this.posAry[i][0];
                this.uiList[i].baseRec.y = this.posAry[i][1];
            }

            //this._uiContainer.addChild(this.jian);
            this._uiContainer.addChild(this.icon);
            this._uiContainer.addChild(this.stateBg);
            this._uiContainer.addChild(this.state);
        }
        private onClick($e: InteractiveEvent): void {
            if (this._leadData.state == 2) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "Boss已死亡", 99);
                return;
            } else if (GuidData.player.getFactionLeadNum() == 0) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您的剩余挑战次数不足，请明天再来挑战！", 99);
                return;
            } else if (this._leadData.state == 1) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前BOSS已有人挑战，请耐心等待！", 99);
                return;
            }

            if (GuidData.player.getForce() < this._leadData.pool.advisepoint) {
                AlertUtil.show("您当前战力低于推荐战力，是否确定挑战？", "", ($type: number) => {
                    if ($type == 1) {
                        this.showBossView();
                    }
                },2,["前往挑战","取消"]);
            } else {
                this.showBossView();
            }

        }

        private showBossView(): void {
            var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_BOSSVIEW_PANEL);
            var data: boss.BossViewData = new boss.BossViewData();
            data.bossID = this._leadData.pool.entry;
            data.showRank = true;
            data.force = this._leadData.pool.advisepoint;
            data.rewardList = this._leadData.pool.reward_preview;
            data.submitFun = () => {
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BOSSDEFENSE_CHALLENGE, this._leadData.idx, 0, "", "");
            };
            data.rankFun = () => {
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BOSSDEFENSE_DAMAGE_LIST, this._leadData.indexlocal, 0, "", "");
            };
            evt.data = data;
            ModuleEventManager.dispatchEvent(evt);
        }
        private _leadID: number;
        private _stateType: number = -1;
        private _stateFight: number = -1;
        private _leadData: FactionLeadData;
        public setData($data: FactionLeadData, $idx: number): void {

            this._leadData = $data;
            this._leadData.indexlocal = $idx;
            if (this._leadID != $data.id) {
                var typObj: any = TableData.getInstance().getData(TableData.tb_faction_bossdefense_point, $idx);
                IconManager.getInstance().drawCircleBossIcon(this.icon, $data.pool.entry, typObj.type);
            }
            
            var type: number = 0;
            if ($data.state == 2) {
                type = 1;
                if (this.jian.parent) {
                    this._uiContainer.removeChild(this.jian);
                }
            } else {
                type = 0;
                if (this._stateFight != $data.state) {
                    if ($data.state == 0) {
                        if (this.jian.parent) {
                            this._uiContainer.removeChild(this.jian);
                        }
                    } else {
                        if (!this.jian.parent) {
                            this._uiContainer.addChild(this.jian);
                        }
                    }
                }
            }
            // 怪物状态	0:空闲 1:战斗 2:死亡
            if (this._stateType != type) {
                if (type == 1) {
                    if (this.bloodBg.parent) {
                        this._uiContainer.removeChild(this.bloodBg);
                        this._uiContainer.removeChild(this.blood);
                        this._uiContainer.removeChild(this.lev);
                    }
                    this.stateBg.height = 32;
                    this.state.baseRec.y = 85;
                    LabelTextFont.writeSingleLabel(this.state.uiRender.uiAtlas, this.state.skinName, "已死亡", 16, TextAlign.CENTER, ColorType.Yellowffe9b4);

                } else {

                    if (!this.bloodBg.parent) {
                        this._uiContainer.addChild(this.bloodBg);
                        this._uiContainer.addChild(this.blood);
                        this._uiContainer.addChild(this.lev);
                    }
                    this.stateBg.height = 42;
                    this.state.baseRec.y = 98;
                    LabelTextFont.writeSingleLabel(this.state.uiRender.uiAtlas, this.lev.skinName, "Lv" + $data.boos.level, 16, TextAlign.CENTER, ColorType.Yellowffe9b4);
                    LabelTextFont.writeSingleLabel(this.state.uiRender.uiAtlas, this.state.skinName,
                        ColorType.Yellowffe9b4 + "战力:" + (GuidData.player.getForce() < $data.pool.advisepoint ? ColorType.Redd92200 : "") + Snum($data.pool.advisepoint), 16, TextAlign.CENTER);
                }
                this._stateType = type;
            }

            if (this._stateType == 0) {
                this.blood.uvScale = $data.hp / $data.maxHp;
            }


        }

        private _offsety: number = 0;
        public set offsety(val: number) {
            this._offsety = val;
            this.refreshPos();
        }

        public get offsety(): number {
            return this._offsety;
        }

        public setBasePos($x: number, $y: number): void {
            this.baseX = $x;
            this.baseY = $y;
            this.refreshPos();
        }

        public refreshPos(): void {
            for (var i: number = 0; i < this.uiList.length; i++) {
                this.uiList[i].x = this.uiList[i].baseRec.x + this.baseX;
                this.uiList[i].y = this.uiList[i].baseRec.y + this.baseY + this._offsety;
            }
        }





    }




}