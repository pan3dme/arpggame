module sboss {
    export class SbossLeftListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private S_BG: UICompenent
        private S_ICON: UICompenent;
        private S_NAME: UICompenent;
        private S_LEVEL: UICompenent;
        private S_TIME: UICompenent;
        private S_KILL_TIP: UICompenent;


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            this.S_BG = this.creatGrid9SUI($bgRender, SbossLeftListRender.baseAtlas, "S_BG", 0, 0, 222, 87, 8, 8);
            $container.addChild(this.S_BG);

            this.S_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);


            this.S_ICON = this.creatSUI($baseRender, SbossLeftListRender.baseAtlas, "S_ICON", 8, 8, 68, 68);
            $container.addChild(this.S_ICON);

            this.S_KILL_TIP = this.creatSUI($baseRender, SbossLeftListRender.baseAtlas, "S_KILL_TIP", 185, 0, 35, 60);
            $container.addChild(this.S_KILL_TIP);



            this.S_NAME = this.creatSUI($baseRender, SbossLeftListRender.baseAtlas, "S_NAME", 85, 12, 120, 18);
            $container.addChild(this.S_NAME);

            this.S_LEVEL = this.creatSUI($baseRender, SbossLeftListRender.baseAtlas, "S_LEVEL", 85, 36, 120, 18);
            $container.addChild(this.S_LEVEL);

            this.S_TIME = this.creatSUI($baseRender, SbossLeftListRender.baseAtlas, "S_TIME", 85, 57, 120, 18);
            $container.addChild(this.S_TIME);





            this.upDataFun = (t: number) => { this.update(t) }



        }
        private upDataFun: Function;
        private update(t: number): void {
            if (!this.parentTarget.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            } else {
                this.drawTimeInfo();
                this.loadIcon();
            }
        }


        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyRender();
            }
            if (val) {
                var $kevt: SbossEvent = new SbossEvent(SbossEvent.SELECT_MESH_BOSS_ID);
                $kevt.selectMeshBossVo = this.itdata.data;
                ModuleEventManager.dispatchEvent($kevt);
            }
        }
        public get selected(): boolean {
            return this._selected;
        }

        private applyRender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: MeshBossVo = <MeshBossVo>this.itdata.data;
                var $tb_Vo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($vo.tb.bossEntry)


                if (this.selected) {
                    console.log(this.selected, this.itdata.id)
                }

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.S_BG.skinName, UIData.publicUi, this.selected ? PuiData.Slist_select : PuiData.Slist_nselect);

                if (GuidData.player.getLevel() < $vo.tb.permitLevel) {
                    UiDraw.clearUI(this.S_NAME);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, ColorType.colorb96d49 + $vo.tb.permitLevel + "级解锁", 16, TextAlign.LEFT);
                } else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_NAME.skinName, ColorType.Orange853d07 + $tb_Vo.name, 16, TextAlign.LEFT);
                    var $color: string = GuidData.player.getLevel() < $vo.tb.permitLevel ? ColorType.colorce0a00 : ColorType.Orange853d07;
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, $color + "等级:" + $vo.tb.permitLevel, 14, TextAlign.LEFT);
                }
            }
        }
        private lastTmStr: string;
        private drawTimeInfo(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: MeshBossVo = <MeshBossVo>this.itdata.data;
                if (GuidData.player.getLevel() >= $vo.tb.permitLevel) {
                    var $vo: MeshBossVo = <MeshBossVo>this.itdata.data;
                    var $tm: number = GameInstance.getGameSecond($vo.time);
                    var $str: string;
                    if ($vo.state == 1 && $tm > 0) {
                        $str = ColorType.Green20a200;
                        $str += getScencdStr($tm)
                        $str += "后刷新";
                        getBaseName

                    } else {
                        $str = ColorType.Orange853d07 + "可挑战";
                    }
                    if ($str != this.lastTmStr) {
                        LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_TIME.skinName, $str, 14, TextAlign.LEFT);
                        this.lastTmStr = $str;
                    }
                }else{
                    UiDraw.clearUI(this.S_TIME);
                }
            }
        }
        private lastState: number;
        private loadIcon(): void {
            var $vo: MeshBossVo = <MeshBossVo>this.itdata.data;
            if (this.lastState != $vo.state) {
                this.lastState = $vo.state;

                var $url: string = "ui/load/boss/tou.png";
                var obj: any = TableData.getInstance().getData(TableData.tb_creature_template, $vo.tb.bossEntry)
                IconManager.getInstance().getIcon(getRoleIconUrl(obj.avatar),
                    ($img: any) => {

                        var rec: UIRectangle = this.uiAtlas.getRec(this.S_ICON.skinName);

                        this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

                        UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight), UIData.publicUi);

                        this.uiAtlas.ctx.drawImage($img, 3, 3, rec.pixelWitdh - 6, rec.pixelHeight - 6);

                        TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);



                    });

                this.drawKillIcon();
            }
        }
        private drawKillIcon(): void {
            if (this.lastState == 1) {
                UiDraw.SharedDrawImg(this.uiAtlas, SbossLeftListRender.baseAtlas, this.S_KILL_TIP.skinName, "U_KILL_TITTLE");
            } else {
                this.uiAtlas.clearCtxTextureBySkilname(this.S_KILL_TIP.skinName);
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                TimeUtil.removeFrameTick(this.upDataFun);
                TimeUtil.addFrameTick(this.upDataFun);
                this.lastTmStr = "";

                this.applyRender();
            } else {
                this.setnull();
            }
        }
        private setnull(): void {
            this.uiAtlas.clearCtxTextureBySkilname(this.S_BG.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.S_ICON.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.S_NAME.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.S_LEVEL.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.S_TIME.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.S_KILL_TIP.skinName)
        }
        protected butClik(evt: InteractiveEvent): void {

            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                var $vo: MeshBossVo = <MeshBossVo>this.itdata.data;
                if ($vo.tb.permitLevel > GuidData.player.getLevel()) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "等级不够，请多多练练再来", 99)
                } else {
                    this.setSelect();

                }
            }
        }
    }
    export class SbossLeftList extends SList {

        public constructor() {
            super();
            this.left = 325;
            this.top = 149;
        }

        public init($uiAtlas: UIAtlas): void {
            SbossLeftListRender.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, SbossLeftListRender, 225, 87 * 5, 225, 87, 5, 256, 1024, 1, 7);
        }

        public resetData(): void {
            var $tbDataArr: Array<SListItemData> = SbossModel.getInstance().getItemData();
            this.refreshData($tbDataArr);
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();

            this.setSelectIndex(0);
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class SmassBossPanel extends UIConatiner {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

            this._frameFun = (t: number) => { this.upTime(t) };

        }
        private _frameFun: Function;
        private _winRender: UIRenderComponent;
        public setRender($uiAtlas: UIAtlas, $win: UIRenderComponent): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._winRender = $win;
            this.loadConfigCom()
        }
        private lastCdStr: string
        public upTime(t: number): void {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._frameFun);
                return;
            }

            var $cdStr: string = "";
            var $massBossCdNum: number = GameInstance.getGameSecond(GuidData.player.getPlayerIntFieldMassBossCd());
            if ($massBossCdNum > 0) {
                $cdStr = ColorType.colorce0a00 + getScencdStr($massBossCdNum);
                $cdStr += ColorType.Orange853d07 + " 增加1次挑战次数";
            }
            if (this.lastCdStr != $cdStr) {
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_cd_label.skinName, ColorType.Orange853d07 + $cdStr, 14, TextAlign.CENTER);
                this.lastCdStr = $cdStr;
            }

        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.sbossLeftList.show();
            this.refristhPanel();
            for (var i: number = 0; i < this.winBgAry.length; i++) {
                this.addChild(this.winBgAry[i]);
            }
            TimeUtil.addFrameTick(this._frameFun);
        }

        public refristhPanel(): void {
            var $a: number = GuidData.player.getPlayerIntFieldMassBossTimes();
            var $b: number = tb.TB_mass_boss_base.getTempVo(1).dailytimes;
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_tz_num.skinName, ColorType.Orange853d07 + "挑战次数(" + $a + "/" + $b + ")", 14, TextAlign.CENTER);

        }
        public hide(): void {
            this.sbossLeftList.hide()
            for (var i: number = 0; i < this.winBgAry.length; i++) {
                this.removeChild(this.winBgAry[i]);
            }
            UIManager.getInstance().removeUIContainer(this);

        }
        protected butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {

                case this.a_tiaozhan:
                    this.tiaozhanBoss();
                    break
                case this.a_add_buy_but:
                    this.showBuyMeshBoss();
                    break;
                case this.t_selbtn:
                    console.log("----this.t_selbtn.selected----",this.t_selbtn.selected);
                    // this.t_selbtn.selected = !this.t_selbtn.selected;
                    GameData.configData.setopen_prompting_sboss(this.selectVo.tb.id - 1,this.t_selbtn.selected);
                    break;
                case this.a_seach_person_list:
                    NetManager.getInstance().protocolos.query_mass_boss_rank(this.selectVo.tb.id);
                    console.log("查看列表")
                    break;
                default:
                    break;

            }



        }
        private tiaozhanBoss(): void {
            if (this.selectVo) {
                if (this.selectVo.state == 1) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "BOSS还未刷新，请耐心等待", 99);
                } else {
                    if (GuidData.player.getLevel() < this.selectVo.tb.permitLevel) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "等级不够，先练练再来", 99);
                    } else {
                        var $a: number = GuidData.player.getPlayerIntFieldMassBossTimes();
                        if ($a <= 0) {
                            AlertUtil.show("挑战次数不足，是否前往购买？", "提示", (a: any) => {
                                if (a == 1) {
                                    this.showBuyMeshBoss();
                                }
                            },2,["前往购买","取消"])
                        } else {
                            console.log("挑战", this.selectVo.tb.id);
                            NetManager.getInstance().protocolos.try_mass_boss(this.selectVo.tb.id);
                        }
                    }
                }

            }
        }

        private showBuyMeshBoss(): void {
            var $a: number = GuidData.player.getPlayerIntFieldMassBossTimes();
            var $b: number = tb.TB_mass_boss_base.getTempVo(1).dailytimes + tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel()).massbossBuyTimes;
            if ($a >= $b) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数满了", 99);
                return;
            }
            var $evt: popbuy.PopBuyEvent = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL);
            var $arr: Array<tb.TB_mass_boss_times> = tb.TB_mass_boss_times.getItem();
            $evt.resoureItem = new Array;
            var curNum: number = GuidData.player.getPlayerIntFieldMassBossBuyedTimes();
            for (var i: number = curNum; i < $arr.length && i < (curNum + ($b - $a)); i++) {

                $evt.resoureItem.push($arr[i].cost[0]);
            }
            $evt.Info1 = "Boss挑战剩余可购买"
            // $evt.Type = popbuy.PopBuyType.MESHBOSS;
            $evt.cutNum = $evt.resoureItem.length;
            if ($evt.cutNum > 0) {
                $evt.SubmitFun = (value: number) => {
                    NetManager.getInstance().protocolos.buy_mass_boss_times(value);
                }
                ModuleEventManager.dispatchEvent($evt);
            } else {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "次数满了", 99);
            }

        }
        private a_list_pos: UICompenent;
        private a_boss_name: UICompenent;
        private a_tiaozhan: UICompenent;
        private a_tz_num: UICompenent;
        private a_add_buy_but: UICompenent;
        private a_cd_label: UICompenent;
        private a_person_num: UICompenent;
        private a_seach_person_list: UICompenent;
        private a_boss_blood: UICompenent;
        private a_boss_blood_bg: UICompenent;
        private t_selbtn: SelectButton;

        private winBgAry: Array<UICompenent>;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;


            var cnew_right_bg_top: UICompenent = this._winRender.getComponent("cnew_right_bg_top");
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "a_right_bg_top", this._midRender);
            var cnew_right_bg_bottom: UICompenent = this._winRender.getComponent("cnew_right_bg_bottom");
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "a_right_bg_bottom", this._midRender);

            this.winBgAry = [cnew_right_bg_top, cnew_right_bg_bottom];

            //this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._bottomRender.getComponent("a_list_bg"));
            this.a_list_pos = this.addChild(this._bottomRender.getComponent("a_list_pos"));

            this.addChild(this._bottomRender.getComponent("a_right_has_bg"));



            this.addChild(this._topRender.getComponent("a_right_cell_line"));
            this.addChild(this._topRender.getComponent("a_right_cell_tittle"));

            this.addChild(this._bottomRender.getComponent("t_info"));



            this.a_tz_num = this.addChild(this._midRender.getComponent("a_tz_num"));

            this.addChild(this._bottomRender.getComponent("a_boss_name_bg"));


            this.a_boss_name = this.addChild(this._midRender.getComponent("a_boss_name"));

            this.a_tiaozhan = this.addEvntButUp("a_tiaozhan", this._midRender);

            this.a_add_buy_but = this.addEvntButUp("a_add_buy_but", this._midRender);

            this.t_selbtn = <SelectButton>this.addEvntBut("t_selbtn", this._midRender);


            this.rewardIconItem = new Array();
            this.rewardNameItem = new Array();
            for (var i: number = 0; i < 4; i++) {
                // var $rewardIcon: FrameCompenent = <FrameCompenent>this.addChild(this._midRender.getComponent("a_reward_frame"));
                // $rewardIcon.goToAndStop(i);
                // $rewardIcon.x += i % 2 * 100;
                // $rewardIcon.y += Math.floor(i / 2) * 100;
                // this.rewardIconItem.push($rewardIcon);

                // var $a_reward_frame_name: FrameCompenent = <FrameCompenent>this.addChild(this._midRender.getComponent("a_reward_frame_name"));
                // $a_reward_frame_name.goToAndStop(i);
                // $a_reward_frame_name.x += i % 2 * 100;
                // $a_reward_frame_name.y += Math.floor(i / 2) * 100;
                // this.rewardNameItem.push($a_reward_frame_name);
                var ui: UICompenent = this.addChild(this._midRender.getComponent("a_reward" + i));
                this.rewardIconItem.push(ui);
                ui = this.addChild(this._midRender.getComponent("a_reward_name" + i));
                this.rewardNameItem.push(ui);
            }




            this.a_cd_label = this.addChild(this._midRender.getComponent("a_cd_label"));
            this.a_person_num = this.addChild(this._midRender.getComponent("a_person_num"));
            this.a_boss_blood_bg = this.addChild(this._midRender.getComponent("a_boss_blood_bg"));
            this.a_boss_blood = this.addChild(this._midRender.getComponent("a_boss_blood"));
            this.a_bar_tip_point = this.addChild(this._topRender.getComponent("a_bar_tip_point"));
            this.a_seach_person_list = this.addEvntButUp("a_seach_person_list", this._midRender);

            this.a_boss_blood_num = this.addChild(this._topRender.getComponent("a_boss_blood_num"));


            this.seachUiarr = new Array();
            this.seachUiarr.push(this.a_boss_blood_bg);
            this.seachUiarr.push(this.a_boss_blood);
            this.seachUiarr.push(this.a_person_num);
            this.seachUiarr.push(this.a_seach_person_list);
            this.seachUiarr.push(this.a_bar_tip_point);
            this.seachUiarr.push(this.a_boss_blood_num);

            this.setUiListVisibleByItem(this.seachUiarr, false);

            this.initList();
            this.addBossChar();

        }
        private a_boss_blood_num: UICompenent;
        private a_bar_tip_point: UICompenent;
        private rewardIconItem: Array<UICompenent>;
        private rewardNameItem: Array<UICompenent>;

        private seachUiarr: Array<UICompenent>;
        private selectVo: MeshBossVo;
        public selectMeshBossByVo(vo: MeshBossVo): void {
            this.selectVo = vo;
            var $tb_Vo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template(vo.tb.bossEntry)
            this.bossChar.setAvatar($tb_Vo.avatar);
            if (this.selectVo.state == 0) {
                this.setUiListVisibleByItem(this.seachUiarr, true);
                NetManager.getInstance().protocolos.query_mass_boss_info(vo.tb.id);
            } else {
                this.setUiListVisibleByItem(this.seachUiarr, true);
                this.setMassBossInfoRet(0, 0)
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_person_num.skinName, ColorType.Orange853d07 + "已击杀", 14, TextAlign.CENTER);



            }
            for (var i: number = 0; i < this.selectVo.tb.show.length; i++) {
                this.drawRewardById(i, this.selectVo.tb.show[i]);
                this.drawRewardyName(i, this.selectVo.tb.show[i]);
            }
            var $bossNameStr: string = ""
            if ($tb_Vo.name.length <= 3) {
                $bossNameStr += "\n";
            }
            for (var i: number = 0; i < $tb_Vo.name.length; i++) {
                $bossNameStr += $tb_Vo.name.substr(i, 1)
                $bossNameStr += "\n";
            }


            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_boss_name.skinName, ColorType.colorfef3d7 + $bossNameStr, 16, TextAlign.LEFT);

            this.t_selbtn.selected = GameData.configData.getopen_prompting_sboss(vo.tb.id - 1);
        }
        private drawRewardById($id: number, $equid: number): void {

            IconManager.getInstance().drawItemIcon60(this.rewardIconItem[$id], $equid, 1);
        }
        private drawRewardyName($id: number, $equid: number): void {
            var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($equid)

            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.rewardNameItem[$id].skinName, getColorQua($vo.quality)+$vo.name, 14, TextAlign.CENTER);
        }


        public setMassBossInfoRet($personnum: number, $bloodnum: number): void {
            this.a_boss_blood.uvScale = $bloodnum / 100;
            if ($bloodnum < 100 && $bloodnum > 0) {
                this.a_bar_tip_point.x = this.a_boss_blood.x + this.a_boss_blood.width * ($bloodnum / 100) - this.a_bar_tip_point.width / 2;
            } else {
                this.a_bar_tip_point.x = 10000;
            }
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_boss_blood_num.skinName, ColorType.Whiteffffff + $bloodnum + "%", 14, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_person_num.skinName, ColorType.Orange853d07 + "争夺人数：" + ColorType.colorcd2000 + $personnum, 14, TextAlign.CENTER);
        }
        public refrishListData(): void {
            this.sbossLeftList.resetData();
        }


        private bossChar: MonsterUIChar
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this._midRender.addModel(this.bossChar);


        }
        private sbossLeftList: SbossLeftList
        private initList(): void {
            this.sbossLeftList = new SbossLeftList;
            this.sbossLeftList.init(this._midRender.uiAtlas)

        }
        public resize(): void {
            super.resize();
            if (this.sbossLeftList) {

                this.sbossLeftList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x + 3
                this.sbossLeftList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y + 5
            }

            if (this.bossChar) {
                this.bossChar.resize();
                this.bossChar.scale = 2 * UIData.Scale;
                this.bossChar.x = 0 * UIData.Scale;
                this.bossChar.y = -60 * UIData.Scale;
            }
        }


    }

}