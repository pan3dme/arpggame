module ranking {

    export class Avo {
        public id: number;
        public name1: string;
        public vipLev: number;
        public name2: string;
        public name3: string;
    }

    export class CurrentServerRanking extends UIVirtualContainer {
        private _winmidelRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _publicRender: UIRenderComponent
        private _topRender: UIRenderComponent
        private _roleRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            if (this.currentRankingCenterPanel) {
                this.currentRankingCenterPanel.dispose();
                this.currentRankingCenterPanel = null;
            }
            if (this.currentRankingrightPanel) {
                this.currentRankingrightPanel.dispose();
                this.currentRankingrightPanel = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._winmidelRender = new UIRenderComponent;
            this.addRender(this._winmidelRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas: UIAtlas, $publicuiAtlas: UIAtlas, $winmidrender: UIRenderComponent): void {
            this._winmidelRender = $winmidrender;
            this._roleRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicuiAtlas;
            var renderLevel: UIRenderComponent = this._topRender;
            this.initView(renderLevel);

        }


        public currentRankingCenterPanel: CurrentRankingCenterPanel;
        public currentRankingrightPanel: CurrentRankingRightPanel;

        private _tab_zhanli: SelectButton
        private _tab_lev: SelectButton
        private _tab_faction: SelectButton
        private _tab_wing: SelectButton
        private _tab_zuoqi: SelectButton
        private _tab_pws: SelectButton
        private _selectButtonAry: Array<SelectButton>;
        private initView(renderLevel: UIRenderComponent): void {
            var renderLevel: UIRenderComponent = this._baseRender;

            this.currentRankingCenterPanel = new CurrentRankingCenterPanel();
            this.currentRankingCenterPanel.setRender(this._bottomRender, this._baseRender, this._topRender);
            this.addVirtualContainer(this.currentRankingCenterPanel);

            this.currentRankingrightPanel = new CurrentRankingRightPanel();
            this.currentRankingrightPanel.setRender(this._publicRender, this._roleRender, this._baseRender, this._topRender);
            this.currentRankingrightPanel.parent = this
            this.addVirtualContainer(this.currentRankingrightPanel);

            var bg = this.addChild(this._winmidelRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "coffeeBg", renderLevel);

            var cnew_right_bg_top = this.addChild(this._winmidelRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "b_right_bg_top", this._baseRender);
            var cnew_right_bg_bottom = this.addChild(this._winmidelRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "b_right_bg_bottom", this._baseRender);

            this._winmidelRender.applyObjData();

            this._tab_zhanli = <SelectButton>this.addEvntBut("tab_zhanli", renderLevel);
            this._tab_zhanli.data = RankingType.RANK_TYPE_POWER
            this._tab_lev = <SelectButton>this.addEvntBut("tab_lev", renderLevel);
            this._tab_lev.data = RankingType.RANK_TYPE_LEVEL
            this._tab_faction = <SelectButton>this.addEvntBut("tab_faction", renderLevel);
            this._tab_faction.data = RankingType.RANK_TYPE_FACTION
            this._tab_wing = <SelectButton>this.addEvntBut("tab_wing", renderLevel);
            this._tab_wing.data = RankingType.RANK_TYPE_WINGS
            this._tab_zuoqi = <SelectButton>this.addEvntBut("tab_zuoqi", renderLevel);
            this._tab_zuoqi.data = RankingType.RANK_TYPE_MOUNT
            this._tab_pws = <SelectButton>this.addEvntBut("tab_pws", renderLevel);
            this._tab_pws.data = RankingType.RANK_TYPE_SINGLE_PVP

            this._selectButtonAry = new Array;
            this._selectButtonAry.push(this._tab_zhanli);
            this._selectButtonAry.push(this._tab_lev);
            this._selectButtonAry.push(this._tab_faction);
            this._selectButtonAry.push(this._tab_wing);
            this._selectButtonAry.push(this._tab_zuoqi);
            this._selectButtonAry.push(this._tab_pws);
            this.resize();

        }

        public resize(): void {
            super.resize();
        }


        public show($value: number = 0): void {
            UIManager.getInstance().addUIContainer(this);
            this.selecttab(this._selectButtonAry[$value]);
            this.currentRankingCenterPanel.currentServerRankingList.show();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.currentRankingCenterPanel.currentServerRankingList.hide();
        }

        private _last: UICompenent
        public butClik(evt: InteractiveEvent): void {
            this.selecttab(evt.target);
        }

        private selecttab($uicomponent: UICompenent): void {
            //选中状态重置
            for (var i = 0; i < this._selectButtonAry.length; i++) {
                if (this._selectButtonAry[i] == <SelectButton>$uicomponent) {
                    this._selectButtonAry[i].selected = true;
                } else {
                    this._selectButtonAry[i].selected = false;
                }
            }
            if (this._last == $uicomponent) {
                return;
            }
            this._last = $uicomponent;
            //切换页签时，重置每页的currentpage
            this.currentRankingCenterPanel.setUiTitle($uicomponent.data);
            // this.currentRankingCenterPanel.currentpage = 1;
            this.currentRankingCenterPanel.currentServerRankingList.clearAryData();
            this.currentRankingCenterPanel.currentServerRankingList.sendrequest($uicomponent.data);
        }
    }


    export class CurrentRankingCenterPanel extends UIVirtualContainer {
        // private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public dispose() {
            if (this.currentServerRankingList) {
                this.currentServerRankingList.dispose();
                this.currentServerRankingList = null;
            }
        }

        public setRender($bottomRender: UIRenderComponent, $base: UIRenderComponent, $topRender: UIRenderComponent): void {
            // this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._topRender = $topRender;
            this._baseRender = $base;
            this.loadConfigCom();
        }

        public currentServerRankingList: CurrentServerRankingList;

        private slistIndex: UICompenent
        private RankNum: UICompenent
        private name1: UICompenent
        private name2: UICompenent
        private name3: UICompenent
        private t_norank: FrameCompenent

        private _titleAry_faction: Array<UICompenent>;
        private _titleAry_wing: Array<UICompenent>;
        private _titleAry_mount: Array<UICompenent>;
        private _titleAry_Lev: Array<UICompenent>;
        private _titleAry_zhanli: Array<UICompenent>;
        private _titleAry_pws: Array<UICompenent>;
        private loadConfigCom(): void {


            var facname = this._topRender.getComponent("c_7_1");
            var playername = this._topRender.getComponent("c_12_1");
            var zhiye = this._topRender.getComponent("c_7_2");


            this._titleAry_faction = new Array;
            this._titleAry_faction.push(facname);
            this._titleAry_faction.push(<UICompenent>this._topRender.getComponent("c_5_1"));
            this._titleAry_faction.push(<UICompenent>this._topRender.getComponent("c_3_1"));

            this._titleAry_wing = new Array;
            this._titleAry_wing.push(playername);
            this._titleAry_wing.push(<UICompenent>this._topRender.getComponent("c_8_1"));
            this._titleAry_wing.push(<UICompenent>this._topRender.getComponent("c_10_1"));


            this._titleAry_mount = new Array;
            this._titleAry_mount.push(playername);
            this._titleAry_mount.push(<UICompenent>this._topRender.getComponent("c_6"));
            this._titleAry_mount.push(<UICompenent>this._topRender.getComponent("c_2"));


            this._titleAry_Lev = new Array;
            this._titleAry_Lev.push(playername);
            this._titleAry_Lev.push(zhiye);
            this._titleAry_Lev.push(this._topRender.getComponent("c_1_1"));

            this._titleAry_zhanli = new Array;
            this._titleAry_zhanli.push(playername);
            this._titleAry_zhanli.push(zhiye);
            this._titleAry_zhanli.push(this._topRender.getComponent("c_4_1"));

            this._titleAry_pws = new Array;
            this._titleAry_pws.push(playername);
            this._titleAry_pws.push(zhiye);
            this._titleAry_pws.push(<UICompenent>this._topRender.getComponent("c_11"));


            var t_myranktitlebg = this.addChild(<UICompenent>this._bottomRender.getComponent("t_myranktitlebg1"));
            t_myranktitlebg.isU = true;

            this.RankNum = this.addChild(<UICompenent>this._baseRender.getComponent("nanknum"));
            this.name1 = this.addChild(<UICompenent>this._baseRender.getComponent("info1"));
            this.name2 = this.addChild(<UICompenent>this._baseRender.getComponent("info2"));
            this.name3 = this.addChild(<UICompenent>this._baseRender.getComponent("info3"));


            this.currentServerRankingList = new CurrentServerRankingList();
            this.currentServerRankingList.init(this._baseRender.uiAtlas);

            this.slistIndex = this.addChild(<UICompenent>this._topRender.getComponent("slistIndex"));
            this.t_norank = <FrameCompenent>this._topRender.getComponent("t_norank");
            this.addUIList(["t_myranktitlebg", "b_bg5_3"], this._bottomRender);
            this.addUIList(["line_1_1", "line_1_2", "line_1_4", "a_8", "t_myranktitle", "line_2"], this._topRender);

            this.resize();

        }

        public resetData($data: RankQueryData): void {
            this._data = $data;
            this.drawMyRank($data.rank);
            // this.setCurrentNum($data.allNum);
        }

        public drawMyRank($rank: number): void {
            this.setUiListVisibleByItem([this.t_norank], false);
            switch (this._type) {
                case RankingType.RANK_TYPE_POWER:
                    this.drawPowerRank();
                    break;
                case RankingType.RANK_TYPE_LEVEL:
                    this.drawLevRank();
                    break;
                case RankingType.RANK_TYPE_FACTION:
                    var factionId = GuidData.player.getFactionID();
                    if (!factionId || factionId.length == 0) {
                        UiDraw.clearUI(this.name1);
                        UiDraw.clearUI(this.name2);
                        UiDraw.clearUI(this.name3);
                        UiDraw.clearUI(this.RankNum);
                        this.setUiListVisibleByItem([this.t_norank], true);
                        this.t_norank.goToAndStop(0);
                        return;
                    }
                    this.drawFactionRank();
                    // this.drawMoneyRank();
                    break;
                case RankingType.RANK_TYPE_WINGS:
                    var wingID: number = GuidData.grow.getWingID();
                    if (wingID == 0) {
                        UiDraw.clearUI(this.name1);
                        UiDraw.clearUI(this.name2);
                        UiDraw.clearUI(this.name3);
                        UiDraw.clearUI(this.RankNum);
                        this.setUiListVisibleByItem([this.t_norank], true);
                        this.t_norank.goToAndStop(2);
                        return;
                    }
                    var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, wingID);
                    var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
                    this.drawWingsRank(wingInfo.id, wingInfo.name);
                    break;
                case RankingType.RANK_TYPE_MOUNT:
                    var num = GuidData.player.getMountLevel();
                    if (!num || num == 0) {
                        UiDraw.clearUI(this.name1);
                        UiDraw.clearUI(this.name2);
                        UiDraw.clearUI(this.name3);
                        UiDraw.clearUI(this.RankNum);
                        this.setUiListVisibleByItem([this.t_norank], true);
                        this.t_norank.goToAndStop(1);
                        return;
                    }
                    this.drawMountRank();
                    break;
                case RankingType.RANK_TYPE_SINGLE_PVP:
                    this.drawPWSRank();
                    break;
                default:
                    break;
            }

            //名次
            if ($rank == -1 || $rank == 0) {
                //未上榜
                UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.RankNum.skinName, "NoRank", 0, 9, false);
                // CurrentRankingCenterPanel.SharedDraw(this._topRender.uiAtlas, this.RankNum.skinName, "NoRank", 0, 6);
            } else if ($rank < 4) {
                //前三名
                UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.RankNum.skinName, String($rank), 10, 0, false);
                // CurrentRankingCenterPanel.SharedDraw(this._topRender.uiAtlas, this.RankNum.skinName, String($rank), 10, 0);
            } else {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.RankNum.skinName, String($rank), 16, TextAlign.CENTER, ColorType.Brown7a2f21, "", 7);
            }
        }


        private drawPowerRank(): void {
            //战力数据
            this.drawNameAndVip(this.name1, 1);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, getProfessional(GameInstance.mainChar.unit.getCharType()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        private drawPWSRank(): void {
            //排位赛
            this.drawNameAndVip(this.name1, 1);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, getProfessional(GameInstance.mainChar.unit.getCharType()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            var qs: number = GuidData.player.getQualifyScore();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(qs), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        private drawLevRank(): void {
            //等级数据
            this.drawNameAndVip(this.name1, 1);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, getProfessional(GameInstance.mainChar.unit.getCharType()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, String(GuidData.player.getLevel()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawMoneyRank(): void {
            //财富数据
            this.drawNameAndVip(this.name1, 1);

            // var x: number = Math.ceil(this.KeyWidth[this._type][2]);
            // this.writeTxtByXY(this._topRender.uiAtlas, this.name2.skinName, GuidData.player.getFactionName() ? getBaseName(GuidData.player.getFactionName()) : "暂无帮派", 16, x, 0, "#d6e7ff");
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, GuidData.player.getFactionName() ? getBaseName(GuidData.player.getFactionName()) : "暂无帮派", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            // var x: number = Math.ceil(this.KeyWidth[this._type][3]) / 2;
            var silver = GuidData.player.getSilver();
            if (silver) {
                // this.writeArtFontByXY(this._topRender.uiAtlas, this.name3.skinName, String(float2int(silver)), ArtFont.num3, x, 0);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(silver), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
        }
        private drawWingsRank($num: number, $name: string): void {
            //神羽数据
            this.drawNameAndVip(this.name1, 1);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, $name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, getChiNum($num) + "阶", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawMountRank(): void {
            //坐骑数据
            this.drawNameAndVip(this.name1, 1);
            var mountlevel = GuidData.grow.getMountLevel();
            var mounttabvo = tb.TB_mount_base_vo.get_TB_mount_base_vo(mountlevel);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, mounttabvo.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, getChiNum(mountlevel) + "阶" + GuidData.grow.getMountStart() + "星", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawFactionRank(): void {
            //家族数据
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name1.skinName, GuidData.player.getFactionName() ? getBaseName(GuidData.player.getFactionName()) : "暂无帮派", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name2.skinName, String(GuidData.faction.getLev()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.name3.skinName, Snum(GuidData.player.getForce()), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        /**
         * $key:对应KeyWidth中的索引
         */
        private drawNameAndVip($ui: UICompenent, $key: number): void {
            IconManager.getInstance().getIcon(getVipIconUrl(GuidData.player.getVipLevel()),
                ($img: any) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    var x: number;
                    var name: string;
                    if ($key == 1) {
                        name = GuidData.player.getName();
                    } else {
                        name = GuidData.faction.getManagerName();
                    }
                    if (name && name.length > 0) {
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Brown7a2f21 + getBaseName(name), 16, 57, 0)
                    }

                    ctx.drawImage($img, 0, 0, 29, 14, 108, 4, 29, 14);
                    // social.SocialUitl.drawVipToCtx(ctx, GuidData.player.getVipLevel(), x + 1);
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        private _type: number
        private _last: Array<UICompenent>;
        public setUiTitle($type: number): void {
            this._type = $type;
            if (this._last) {
                this.setUiListVisibleByItem(this._last, false);
            }

            switch ($type) {
                case RankingType.RANK_TYPE_POWER:
                    this.setUiListVisibleByItem(this._titleAry_zhanli, true);
                    this._last = this._titleAry_zhanli;
                    break;
                case RankingType.RANK_TYPE_LEVEL:
                    this.setUiListVisibleByItem(this._titleAry_Lev, true);
                    this._last = this._titleAry_Lev;
                    break;
                case RankingType.RANK_TYPE_FACTION:
                    this.setUiListVisibleByItem(this._titleAry_faction, true);
                    this._last = this._titleAry_faction;
                    break;
                case RankingType.RANK_TYPE_WINGS:
                    this.setUiListVisibleByItem(this._titleAry_wing, true);
                    this._last = this._titleAry_wing;
                    break;
                case RankingType.RANK_TYPE_MOUNT:
                    this.setUiListVisibleByItem(this._titleAry_mount, true);
                    this._last = this._titleAry_mount;
                    break;
                case RankingType.RANK_TYPE_SINGLE_PVP:
                    this.setUiListVisibleByItem(this._titleAry_pws, true);
                    this._last = this._titleAry_pws;
                    break;
                default:
                    break;
            }
        }

        private _first: boolean;
        private _end: boolean;

        public resize(): void {
            super.resize();
            this.currentServerRankingList.top = this.slistIndex.parent.y / UIData.Scale + this.slistIndex.y
            this.currentServerRankingList.left = this.slistIndex.parent.x / UIData.Scale + this.slistIndex.x
        }

        private _data: RankQueryData

    }

    export class CurrentRankingRightPanel extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _topRender: UIRenderComponent

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public dispose() {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.destory();
                this.mountRoleSprite = null;
            }
            if (this.wingDisplay) {
                this.wingDisplay.destory();
                this.wingDisplay = null;
            }
        }

        public setRender($publicRender: UIRenderComponent, $roleRender: UIRenderComponent, $base: UIRenderComponent, $topRender: UIRenderComponent): void {
            this._bgRender = $roleRender;
            this._roleRender = $base;
            this._topRender = $topRender;
            this._baseRender = $publicRender;
            this.loadConfigCom();
        }

        private b_btnreward: UICompenent
        private b_btnsocial: UICompenent
        private b_bg_role: UICompenent
        private t_curname: UICompenent
        private t_curvip: UICompenent
        private t_curtitle: UICompenent

        private _aryUI: Array<UICompenent>;//0被膜拜次数
        private _BtnaryUI: Array<UICompenent>;//0被膜拜次数

        private loadConfigCom(): void {

            this.b_btnreward = this.addEvntButUp("b_btn2", this._topRender);
            this.b_btnsocial = this.addEvntButUp("b_btn3", this._topRender);

            this.b_bg_role = this.addEvntBut("b_bg_role", this._bgRender);
            getUItittleUrl

            this.addChild(<UICompenent>this._bgRender.getComponent("b_bg2"));
            this.addChild(<UICompenent>this._bgRender.getComponent("a_namebg"));

            this._aryUI = new Array
            this._aryUI.push(this.b_btnsocial);
            this._aryUI.push(this.b_btnreward);

            this._BtnaryUI = new Array
            var btn = <UICompenent>this._baseRender.getComponent("cnew_but_yes");
            this.setSizeForPanelUiCopy(btn, "b_btn1", this._roleRender);
            btn.addEventListener(InteractiveEvent.Up, this.zanClik, this);
            this._BtnaryUI.push(btn);
            this._BtnaryUI.push(<UICompenent>this._topRender.getComponent("b_mbtxt"));
            this._BtnaryUI.push(<UICompenent>this._topRender.getComponent("b_ymb"));
            this._BtnaryUI.push(<UICompenent>this._topRender.getComponent("a_17"));
            this._BtnaryUI.push(<UICompenent>this._roleRender.getComponent("a_7"));

            this.t_curname = this.addChild(this._topRender.getComponent("t_curname"));
            this.t_curvip = this.addChild(this._topRender.getComponent("t_curvip"));
            this.t_curtitle = this.addChild(this._topRender.getComponent("t_curtitle"));


            this.mountRoleSprite = new Person2DChar();
            this._bgRender.addModel(this.mountRoleSprite);

            this._scale = 4
            this._rotationY = 0
            this._posY = -110;

            this._bgRender.applyObjData();
            this.resize();
        }

        private mountRoleSprite: Person2DChar;
        private _lastMouseX: number = 0;
        private _lastRoleRotatioinY: number = 0;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.mountRoleSprite.rotationY;

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {
            this.mountRoleSprite.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        }
        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }
        private rotationRole(): void {
            this.mountRoleSprite.rotationY -= 0.5;
        }
        private setAvatar($num: number, $name: string = ""): void {

            this.mountRoleSprite.setAvatar($num)

            // this.mountRoleSprite.rotationY = 45
            // LabelTextFont.writeSingleLabel(this._roleRender.uiAtlas, "B_name_0", $name, 20, TextAlign.CENTER, "#ff00ff")
        }


        private _scale: number
        private _rotationY: number
        private _posY: number

        private setWeapon(num: number): void {
            this.mountRoleSprite.setWeapon(num);
        }


        private resizeRole(): void {

            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = this._scale * UIData.Scale;
                this.mountRoleSprite.rotationY = this._rotationY
                this.mountRoleSprite.x = -200 * UIData.Scale;
                this.mountRoleSprite.y = this._posY * UIData.Scale;
            }

            if (this.wingDisplay) {
                this.wingDisplay.resize();
                this.wingDisplay.scale = this._scale * UIData.Scale;
            }
        }


        private _data: SListItemData;
        public resetData($data: SListItemData): void {
            var vo: ApplyFactionListVo = $data.data;
            this._data = $data;
            this.likenum = vo.data.like;

            var $flag: boolean = vo.type == RankingType.RANK_TYPE_MOUNT || vo.type == RankingType.RANK_TYPE_WINGS
            this.setUiListVisibleByItem(this._aryUI, !$flag);

            //设置模型
            if ($flag) {
                this._bgRender.removeModel(this.wingDisplay);
                var $curname: string;
                if (vo.type == RankingType.RANK_TYPE_MOUNT) {
                    //坐骑
                    var $tb_mount_base_vo: tb.TB_mount_base_vo = tb.TB_mount_base_vo.get_TB_mount_base_vo(vo.data.mountLev);
                    this.mountRoleSprite.needUIUrl = true;
                    this.setAvatar($tb_mount_base_vo.mountID);
                    $curname = $tb_mount_base_vo.name
                    this._scale = 3
                    this._rotationY = 30
                    this._posY = -110;
                } else {
                    //翅膀
                    var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, vo.data.level);
                    var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
                    this.mountRoleSprite.needUIUrl = false;
                    this.setAvatar(wingInfo.model);
                    $curname = wingInfo.name
                    this._scale = 4
                    this._rotationY = 0

                    this._posY = -50;
                }
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_curname.skinName, getBaseName($curname), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.clearUI(this.t_curtitle);
                UiDraw.clearUI(this.t_curvip);

                this.setWeapon(0);
                this.setUiListVisibleByItem(this._BtnaryUI, false);
            } else {
                //人物
                this._scale = 4
                this._rotationY = 0
                this._posY = -110;

                this.mountRoleSprite.needUIUrl = true;
                console.log("---vo.data.weapon---", vo.data.coat, vo.data.weapon);
                this.mountRoleSprite.setBaseRoleAvatar(vo.data.coat, vo.data.gender);
                this.mountRoleSprite.setBaseRoleWeapon(vo.data.weapon, vo.data.gender);
                this.setWing(vo.data.wingid);

                //排名前三，有点赞功能
                if (vo.data.rank <= 3) {
                    this.setNum(vo.data.like);
                } else {
                    this.setUiListVisibleByItem(this._BtnaryUI, false);
                }

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_curname.skinName, getBaseName(vo.data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this._topRender.uiAtlas.upDataPicToTexture(getVipIconUrl(vo.data.vip), this.t_curvip.skinName);
                if (vo.data.title > 0) {
                    this._topRender.uiAtlas.upDataPicToTexture(getUItittleUrl(String(vo.data.title)), this.t_curtitle.skinName);
                } else {
                    UiDraw.clearUI(this.t_curtitle);
                }
            }
            this.resizeRole();
        }

        private wingDisplay: Person2DChar;
        public setWing($wingid: number): void {
            if ($wingid && $wingid > 0) {
                if (!this.wingDisplay) {
                    this.wingDisplay = new Person2DChar();
                    this.wingDisplay.needUIUrl = false;
                    this.wingDisplay.setBind(this.mountRoleSprite, SceneChar.WING_SLOT);
                }
                this._bgRender.addModel(this.wingDisplay);

                console.log("---$wingid---", $wingid);
                var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, $wingid);
                var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
                if (wingInfo.model) {
                    this.wingDisplay.setAvatar(wingInfo.model);
                }
            } else {
                this._bgRender.removeModel(this.wingDisplay);
            }
        }

        private setBtnZan(): void {
            var vo: ApplyFactionListVo = this._data.data;
            var stateary = GuidData.player.getRankLikeState();
            var index = vo.typeShareDef * 3 + vo.data.rank - 1
            if (stateary[index]) {
                //已经点赞了
                this.setUiListVisibleByItem([this._BtnaryUI[0], this._BtnaryUI[1]], false);
                this.setUiListVisibleByItem([this._BtnaryUI[2], this._BtnaryUI[3], this._BtnaryUI[4]], true);
            } else {
                this.setUiListVisibleByItem([this._BtnaryUI[0], this._BtnaryUI[1], this._BtnaryUI[3], this._BtnaryUI[4]], true);
                this.setUiListVisibleByItem([this._BtnaryUI[2]], false);
            }
        }

        public likenum: number
        public setNum($like: number): void {
            this._data.data.data.like = $like
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._BtnaryUI[3].skinName, "被膜拜次数：" + $like, 16, TextAlign.CENTER, ColorType.Whitefff7db);
            this.setBtnZan();
        }

        public resize(): void {
            this.resizeRole();
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            var vo: ApplyFactionListVo = this._data.data;
            switch (evt.target) {
                case this.b_bg_role:
                    this.A_left_bg_MouseDown(evt)
                    break
                case this.b_btnreward:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var ttt = new RankingEvent(RankingEvent.REWARD_RANK_PANLE);
                    ttt.data = vo.typeShareDef;
                    ModuleEventManager.dispatchEvent(ttt);
                    break
                case this.b_btnsocial:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    NetManager.getInstance().protocolos.get_player_overview(vo.data.guid);
                    break
                default:
                    break;
            }

        }

        public zanClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            NetManager.getInstance().protocolos.rank_add_like(this._data.data.typeShareDef, this._data.data.data.guid);
        }
    }
}