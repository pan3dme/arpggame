module faction {

    export class FactionLeagueUiPanel extends UIPanel {
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _bigPic: UIRenderOnlyPicComponent

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/league/league.xml", "ui/uidata/faction/league/league.png", () => { this.loadConfigCom() }, "ui/uidata/faction/league/leaguepc.png");
        }


        private a_rulebtn: UICompenent
        private a_hallbtn: UICompenent
        private a_joinbtn: UICompenent
        private a_day: UICompenent
        private a_time1: UICompenent
        private a_time2: UICompenent
        private t_listindex: UICompenent
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._topRender.uiAtlas;
            this._bigPic.uiAtlas = this._topRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._topRender;

            this._bigPic.setImgUrl("ui/uidata/faction/league/bg.png");
            this.addChild(this._bigPic.getComponent("basebg"));

            this.a_rulebtn = this.addEvntButUp("a_rulebtn", renderLevel);

            this.addChild(this._baseRender.getComponent("a_timebg"));
            this.addChild(this._topRender.getComponent("a_baseline"));
            this.t_listindex = this.addChild(this._topRender.getComponent("t_listindex"));
            this.a_day = this.addChild(renderLevel.getComponent("a_day"));
            this.a_time1 = this.addChild(renderLevel.getComponent("a_time1"));
            this.a_time2 = this.addChild(renderLevel.getComponent("a_time2"));

            this.a_hallbtn = this.addChild(renderLevel.getComponent("a_hallbtn"));
            this.a_hallbtn.addEventListener(InteractiveEvent.Up, this.hallClick, this);
            this.a_joinbtn = renderLevel.getComponent("a_joinbtn");
            this.a_joinbtn.addEventListener(InteractiveEvent.Up, this.joinClick, this);

            this._baseRender.sortnum = 200
            this._topRender.sortnum = 210

            this.modul0Ary = new Array
            this.modul1Ary = new Array
            this.modul2Ary = new Array
            this.addModul0();
            this.addModul1();
            this.addModul2();
            this.applyLoadComplete();
        }

        private modul0Ary: Array<UICompenent>
        private modul1Ary: Array<UICompenent>
        private modul2Ary: Array<UICompenent>
        private addModul0() {
            this.modul0Ary.push(this._baseRender.getComponent("modul0_titlebg"));
            this.modul0Ary.push(this._topRender.getComponent("modul0_title"));
            this.modul0Ary.push(this._topRender.getComponent("modul0_info"));
        }
        private addModul1() {
            this.modul1Ary.push(this._baseRender.getComponent("modul0_titlebg"));
            this.modul1Ary.push(this._topRender.getComponent("modul0_title"));
            this.modul1Ary.push(this._topRender.getComponent("modul0_info"));
        }
        private addModul2() {
            this.modul2Ary.push(this._topRender.getComponent("modul2_txt"));
            this.modul2Ary.push(this._topRender.getComponent("modul2_info"));
            this.modul2Ary.push(this._baseRender.getComponent("modul2_bg"));
            this.modul2Ary.push(this._topRender.getComponent("modul2_tips"));
            for (let i = 0; i < 5; i++) {
                this.modul2Ary.push(this._topRender.getComponent("modul2_line" + i));
                this.modul2Ary.push(this._topRender.getComponent("modul2_lev" + i));
            }

            for (let k = 0; k < 20; k++) {
                this.modul2Ary.push(this._topRender.getComponent("modul2_name" + k));
            }
            this.modul2Ary.push(this._topRender.getComponent("modul2_time"));

        }

        private hallClick(evt: InteractiveEvent) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            //console.log("---打开荣耀殿堂----");
            ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTION_HONOR_EVENT));
        }

        private joinClick(evt: InteractiveEvent) {
            UiTweenScale.getInstance().changeButSize(evt.target);
            NetManager.getInstance().protocolos.enter_faction_match_map();
            //console.log("---加入战场----");
        }

        public showbtn() {
            //如果是即将开始阶段，显示加入战场按钮
            var flag: boolean = false;
            var stage: number = FactionLeagueModel.getInstance().getCurStage();
            if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_FIRST || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_FIRST || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_SECOND || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_SECOND) {
                var qualified: faction_match_info = FactionLeagueModel.getInstance().getMyFaction();
                if (qualified && qualified.result == 0) {
                    flag = true;
                }
            }

            this.setUiListVisibleByItem([this.a_joinbtn], flag);
            this.a_hallbtn.x = flag ? 537 : 702
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this._curModul = -1;
            this.sendmsg();
            this.selecModul();
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.hidemodul(-1);
        }

        public resize(): void {
            super.resize();
            if (this.factionLeagueList) {
                this.factionLeagueList.left = this.t_listindex.parent.x / UIData.Scale + this.t_listindex.x
                this.factionLeagueList.top = this.t_listindex.parent.y / UIData.Scale + this.t_listindex.y
            }
        }

        public drawData() {
            if (this._curModul == 0) {
                this.factionLeagueList.show(0);
            } else if (this._curModul == 1) {
                this.factionLeagueList.show(1);
            } else if (this._curModul == 2) {
                this.drawModul2();
            }

            this.drawBaseUI();
            this.showbtn();
        }

        private weeklist: Array<string> = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        public drawBaseUI() {
            //哪些阶段绘制基础UI
            //服务器时间
            var datestr: string = ColorType.Whitefff4d6 + "战盟 ";
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts * 1000);
            var time: number = GuidData.globelValue.getFactionLeagueTime();
            var data: Date = new Date(time * 1000);
            if ($sever.getDate() == data.getDate() && $sever.getMonth() == data.getMonth()) {
                //今天是比赛日期
                datestr += ColorType.Green2ca937 + "今天"
            } else {
                var day: number = data.getDay();
                datestr += ColorType.Green2ca937 + "(本" + this.weeklist[day] + ")"
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_day.skinName, datestr, 16, TextAlign.CENTER, ColorType.Redd92200);

            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_match_phase);
            // //console.log("基本数据", $obj)
            var bbb: string = ColorType.Green2ca937
            var ddd: string = ColorType.Green2ca937
            var ggg: string = ColorType.Green2ca937
            for (var $key in $obj.data) {
                if ($obj.data[$key]["script"] == SharedDef.FACTION_MATCH_SCRIPT_TYPE_DECIDE_FIRST) {
                    ggg += "今日" + TimeUtil.getLocalTime6(time);
                } else if ($obj.data[$key]["script"] == SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_FIRST) {
                    //第一轮开始时间
                    bbb += TimeUtil.getLocalTime6(time);
                } else if ($obj.data[$key]["script"] == SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_FIRST) {
                    bbb += "-" + TimeUtil.getLocalTime6(time);
                } else if ($obj.data[$key]["script"] == SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_SECOND) {
                    ddd += TimeUtil.getLocalTime6(time);
                } else if ($obj.data[$key]["script"] == SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_SECOND) {
                    ddd += "-" + TimeUtil.getLocalTime6(time);
                }
                time += $obj.data[$key]["time"]
            }

            var aaa: string = ColorType.Whitefff4d6 + "第一轮: "
            var ccc: string = ColorType.Whitefff4d6 + "第二轮: "
            var eee: string = ColorType.Redd92200 + "已结束"
            var fff: string = ColorType.Green2ca937 + "进行中"
            var stage: number = FactionLeagueModel.getInstance().getCurStage();
            if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_INIT || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_UPDATE) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul2Ary[this.modul2Ary.length - 1].skinName, ColorType.Whitefff4d6 + "截止时间: " + ggg, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time1.skinName, aaa + bbb, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time2.skinName, ccc + ddd, 16, TextAlign.CENTER, ColorType.Redd92200);
            } else if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_SECOND || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_NONE) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time1.skinName, aaa + eee, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time2.skinName, ccc + eee, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul1Ary[1].skinName, "家族联赛（已结束）", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            } else if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_DECIDE_FIRST) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul0Ary[1].skinName, "家族联赛（第一轮即将开始）", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time1.skinName, aaa + bbb, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time2.skinName, ccc + ddd, 16, TextAlign.CENTER, ColorType.Redd92200);
            } else if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_FIRST || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_FIRST) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul0Ary[1].skinName, "家族联赛（第一轮正在进行中）", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time1.skinName, aaa + fff, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time2.skinName, ccc + ddd, 16, TextAlign.CENTER, ColorType.Redd92200);
            } else if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_END_FIRST) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul0Ary[1].skinName, "家族联赛（第二轮即将开始）", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time1.skinName, aaa + eee, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time2.skinName, ccc + ddd, 16, TextAlign.CENTER, ColorType.Redd92200);
            } else if (stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_OPEN_SECOND || stage == SharedDef.FACTION_MATCH_SCRIPT_TYPE_START_SECOND) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul0Ary[1].skinName, "家族联赛（第二轮正在进行中）", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time1.skinName, aaa + eee, 16, TextAlign.CENTER, ColorType.Redd92200);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_time2.skinName, ccc + fff, 16, TextAlign.CENTER, ColorType.Redd92200);
            }
        }

        public sendmsg() {
            //console.log("-------发送请求-----");
            NetManager.getInstance().protocolos.query_faction_match_info();
        }

        public factionLeagueList: FactionLeagueList
        private _curModul: number = -1;
        public selecModul() {
            var modul: number = FactionLeagueModel.getInstance().getCurModul();
            //console.log("-------当前模式-----", modul, GuidData.globelValue.getFactionLeagueStage());
            if (this._curModul == modul) {
                return;
            }
            this._curModul = modul;
            this.hidemodul(modul);
            if (modul == 2) {
                this.setUiListVisibleByItem(this.modul2Ary, true);
            } else {
                if (!this.factionLeagueList) {
                    this.factionLeagueList = new FactionLeagueList();
                    this.factionLeagueList.init(this._baseRender.uiAtlas);
                }
                if (modul == 0) {
                    this.setUiListVisibleByItem(this.modul0Ary, true);
                } else {
                    this.setUiListVisibleByItem(this.modul1Ary, true);
                }
            }
            this.resize();
        }

        private hidemodul($modul: number) {
            switch ($modul) {
                case 0:
                    this.setUiListVisibleByItem(this.modul1Ary, false);
                    this.setUiListVisibleByItem(this.modul2Ary, false);
                    break;
                case 1:
                    this.setUiListVisibleByItem(this.modul0Ary, false);
                    this.setUiListVisibleByItem(this.modul2Ary, false);
                    break;
                case 2:
                    this.setUiListVisibleByItem(this.modul0Ary, false);
                    this.setUiListVisibleByItem(this.modul1Ary, false);
                    if (this.factionLeagueList) {
                        this.factionLeagueList.hide();
                    }
                    break;

                default:
                    this.setUiListVisibleByItem(this.modul0Ary, false);
                    this.setUiListVisibleByItem(this.modul1Ary, false);
                    this.setUiListVisibleByItem(this.modul2Ary, false);
                    if (this.factionLeagueList) {
                        this.factionLeagueList.hide();
                    }
                    break;
            }
        }

        public drawModul2() {
            var session: number = GuidData.globelValue.getFactionLeagueSession();
            if (session > 1) {
                this.setUiListVisibleByItem([this.modul2Ary[30], this.modul2Ary[31], this.modul2Ary[32], this.modul2Ary[33]], false);
                this.setUiListVisibleByItem([this.modul2Ary[3]], true);
            } else {
                this.setUiListVisibleByItem([this.modul2Ary[30], this.modul2Ary[31], this.modul2Ary[32], this.modul2Ary[33]], true);
                this.setUiListVisibleByItem([this.modul2Ary[3]], false);
            }
            var ary: Array<LeagueItem> = FactionLeagueModel.getInstance().readData();
            for (let i = 0; i < ary.length; i++) {
                //14 + 4 *i  3
                if (this.isemempty(ary[i].items)) {
                    this.modul2Ary[14 + 4 * i].x = 475;
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul2Ary[14 + 4 * i].skinName, "虚位以待", 16, TextAlign.CENTER, ColorType.Redd92200);
                } else {
                    this.modul2Ary[14 + 4 * i].x = 230
                    for (let k = 0; k < ary[i].items.length; k++) {
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.modul2Ary[14 + 4 * i + k].skinName, getBaseName(ary[i].items[k].name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                    }
                }
            }
        }

        private isemempty($ary: Array<faction_match_info>): boolean {
            for (let i = 0; i < $ary.length; i++) {
                if ($ary[i].guid != "") {
                    return false;
                }
            }
            return true;
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_rulebtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    ModuleEventManager.dispatchEvent(new FactionLeaguEvent(FactionLeaguEvent.SHOW_GZ_EVENT));
                    break

                default:
                    break;
            }
        }
    }
}