module sboss {
    export class PbossLeftListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private S_BG: UICompenent
        private S_ICON: UICompenent;
        private S_NAME: UICompenent;
        private S_LEVEL: UICompenent;
        private S_TIME: UICompenent;
        private Redpoint: UICompenent;
        // private S_KILL_TIP: UICompenent;


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);
            var cententRender: UIRenderComponent = this._customRenderAry[0];

            this.S_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_BG", 0, 0, 222, 87, 8, 8);
            $container.addChild(this.S_BG);

            this.S_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);


            this.S_ICON = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_ICON", 8, 8, 68, 68);
            $container.addChild(this.S_ICON);

            // this.S_KILL_TIP = this.creatSUI($baseRender, PbossLeftListRender.baseAtlas, "S_KILL_TIP", 185, 0, 35, 60);
            // $container.addChild(this.S_KILL_TIP);

            this.S_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_NAME", 85, 12, 120, 18);
            $container.addChild(this.S_NAME);

            this.S_LEVEL = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_LEVEL", 85, 36, 120, 18);
            $container.addChild(this.S_LEVEL);

            this.S_TIME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_TIME", 85, 57, 120, 18);
            $container.addChild(this.S_TIME);

            this.Redpoint = this.creatSUI(cententRender, this.parentTarget.baseAtlas, "S_REDPOINT", 205, 1, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);

            this.upDataFun = (t: number) => { this.update(t) }
        }
        private upDataFun: Function;
        private update(t: number): void {
            if (!this.parentTarget.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            } else {
                this.drawTimeInfo();
            }
        }


        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyRender();
            }
            if (val) {
                var $kevt: SbossEvent = new SbossEvent(SbossEvent.PBOSS_REFRISH_PANEL);
                $kevt.data = this.itdata.data;
                ModuleEventManager.dispatchEvent($kevt);
            }
        }
        public get selected(): boolean {
            return this._selected;
        }

        private applyRender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: PersonBossVo = <PersonBossVo>this.itdata.data;
                var $tb_Vo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($vo.tabbossinfo.bossEntry)

                if ($vo.node) {
                    $vo.node.bindUI(this.Redpoint);
                }

                this.loadIcon(String($tb_Vo.avatar));
                // if (this.selected) {
                //     console.log(this.selected, this.itdata.id)
                // }

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.S_BG.skinName, UIData.publicUi, this.selected ? PuiData.Slist_select : PuiData.Slist_nselect);
                var name: string;
                if (!$vo.openstate) {
                    name = ColorType.colorb96d49 + $tb_Vo.name
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, ColorType.colorb96d49 + $vo.tabbossinfo.permitLevel + "级解锁", 16, TextAlign.LEFT);
                } else {
                    name = ColorType.Orange853d07 + $tb_Vo.name
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_LEVEL.skinName, ColorType.Orange853d07 + "等级:" + $vo.tabbossinfo.permitLevel, 14, TextAlign.LEFT);
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_NAME.skinName, name, 16, TextAlign.LEFT);
            }
        }
        private lastTmStr: string;
        private drawTimeInfo(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: PersonBossVo = <PersonBossVo>this.itdata.data;
                if ($vo.openstate) {
                    var $str: string = ColorType.Brown7a2f21 + "剩余次数:" + $vo.getTims();
                    if ($str != this.lastTmStr) {
                        LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_TIME.skinName, $str, 14, TextAlign.LEFT);
                        this.lastTmStr = $str;
                    }
                } else {
                    UiDraw.clearUI(this.S_TIME);
                }
            }
        }
        private loadIcon($bossavatar: string): void {
            // var $vo: PersonBossVo = <PersonBossVo>this.itdata.data;
            // var obj: any = TableData.getInstance().getData(TableData.tb_creature_template, $vo.tabbossinfo.bossEntry)
            IconManager.getInstance().getIcon(getRoleIconUrl($bossavatar),
                ($img: any) => {

                    var rec: UIRectangle = this.uiAtlas.getRec(this.S_ICON.skinName);

                    this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, rec.pixelWitdh, rec.pixelHeight), UIData.publicUi);

                    this.uiAtlas.ctx.drawImage($img, 3, 3, rec.pixelWitdh - 6, rec.pixelHeight - 6);

                    TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
                });

            // this.drawKillIcon();
        }
        // private drawKillIcon(): void {
        //     if (this.lastState == 1) {
        //         UiDraw.SharedDrawImg(this.uiAtlas, PbossLeftListRender.baseAtlas, this.S_KILL_TIP.skinName, "U_KILL_TITTLE");
        //     } else {
        //         this.uiAtlas.clearCtxTextureBySkilname(this.S_KILL_TIP.skinName);
        //     }
        // }

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
            this.Redpoint.preHide();

        }
        protected butClik(evt: InteractiveEvent): void {

            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                // var $vo: PersonBossVo = <PersonBossVo>this.itdata.data;
                // if (!$vo.openstate) {
                //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "等级不够，请多多练练再来", 99)
                // } else {
                this.setSelect();
                // }
            }
        }
    }
    export class PbossLeftList extends SList {

        public constructor() {
            super();
            this.left = 325;
            this.top = 149;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, PbossLeftListRender, 225, 87 * 5, 225, 87, 5, 256, 1024, 1, 7, 1);
        }

        public resetData(): void {
            var $tbDataArr: Array<SListItemData> = SbossModel.getInstance().getPersonBossItemData();
            var nodeList = RedPointManager.getInstance().getNodeByID(119).children;
            for (var i = 0; i < $tbDataArr.length; i++) {
                nodeList[i].data = $tbDataArr[i].data;
                $tbDataArr[i].data.node = nodeList[i];
            }

            this.refreshData($tbDataArr);
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
            // var idx = SbossModel.getInstance().getMaxIndex();
            var idx = this.getCurrentSelectIndex();
            this.scrollIdx(idx);
            this.setSelectIndex(idx);
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class PersonBossPanel extends UIConatiner {


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

            if (this.selectVo && this.selectVo.openstate) {
                var $str: string = this.selectVo.getTime();
                if ($str != "") {
                    $str = ColorType.Redd92200 + $str + ColorType.Brown7a2f21 + "恢复挑战次数";
                }
                if ($str != this.lastCdStr) {
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_cd_label.skinName, $str, 14, TextAlign.CENTER);
                    this.lastCdStr = $str;
                }
            } else {
                //清空
                UiDraw.clearUI(this.a_cd_label);
            }
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.pbossleftList.show();
            TimeUtil.addFrameTick(this._frameFun);
        }

        public hide(): void {
            this.pbossleftList.hide()
            UIManager.getInstance().removeUIContainer(this);

        }
        protected butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.e_tiaozhan:
                    this.tiaozhanBoss();
                    break
                case this.e_leftbtn:
                    this._curpage = Math.max(1, --this._curpage);
                    this.drawReward();
                    this.setPage();
                    break
                case this.e_rightbtn:
                    this._curpage = Math.min(this._maxpage, ++this._curpage);
                    this.drawReward();
                    this.setPage();
                    break
                case this.e_selbtn:
                    // this.t_selbtn.selected = !this.t_selbtn.selected;
                    GameData.configData.setopen_prompting_pboss(this.selectVo.tabbossinfo.id - 1, this.e_selbtn.selected);
                    break;
                default:
                    break;

            }
        }


        // private getbuffvalue($num:number):number{
        //     var tabary:Array<tb.Tb_private_boss_buff>= tb.Tb_private_boss_buff.get_Tb_private_boss_buff();
        //     for (var index = 0; index < tabary.length; index++) {
        //         var element = tabary[index];
        //         console.log("---$num---",$num);
        //         if($num >= element.force_range_left && $num <= element.force_range_right){
        //             var tab:any = TableData.getInstance().getData(TableData.tb_buff_effect, element.buffeffect_id);
        //             if(tab){
        //                 return tab.value;
        //             }else{
        //                 return 0;
        //             }
        //         }   
        //     }
        //     return 0;
        // }

        private tiaozhanBoss(): void {
            if (this.selectVo && this.selectVo.openstate) {
                if (this.selectVo.hasTims() > 0) {
                    //战斗力提示
                    if (this.selectVo.tabbossinfo.force > GuidData.player.getForce()) {
                        // var aa = Math.floor((GuidData.player.getForce() / this.selectVo.tabbossinfo.force) * 100);
                        // var bb = this.getbuffvalue(aa);
                        // var $str:string = "";
                        // if(bb < 0){
                        //     $str = "该BOSS属性会大幅增加"+Math.abs(bb);
                        // }else{
                        //     $str = "该BOSS增加属性0";
                        // }

                        AlertUtil.show(
                            ColorType.Brown7a2f21 + "当前您的战斗力" + ColorType.colorcd2000 + GuidData.player.getForce()
                            + ColorType.Brown7a2f21 + "低于BOSS战斗力" + this.selectVo.tabbossinfo.force + "\n挑战会受到影响，该BOSS属性会大幅增加\n是否进行挑战？"
                            , "提示", (a: any) => {
                                if (a == 1) {
                                    NetManager.getInstance().protocolos.enter_private_boss(this.selectVo.tabbossinfo.id);
                                }
                            },2,["前往挑战","取消"])
                    } else {
                        NetManager.getInstance().protocolos.enter_private_boss(this.selectVo.tabbossinfo.id);
                    }
                } else {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "挑战次数不足", 99);
                }
            }
        }

        private a_list_pos: UICompenent;
        private a_boss_name: UICompenent;
        private e_tiaozhan: UICompenent;
        private a_cd_label: UICompenent;
        private e_force: UICompenent;
        private e_leftbtn: UICompenent
        private e_rightbtn: UICompenent
        private unlockAry: Array<UICompenent>
        private btnAry: Array<UICompenent>
        private e_selbtn: SelectButton;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.addUIList(["e_reward_r", "e_reward_c", "e_reward_l"], this._bottomRender);
            this.addUIList(["e_rewardtitle"], this._midRender);


            this.e_leftbtn = this.addEvntButUp("e_leftbtn", this._midRender);
            this.e_rightbtn = this.addEvntButUp("e_rightbtn", this._midRender);

            this.unlockAry = new Array
            this.unlockAry.push(this._bottomRender.getComponent("e_right_has_bg0"));
            this.unlockAry.push(this._midRender.getComponent("e_openinfo"));

            this.e_tiaozhan = this.addEvntButUp("e_tiaozhan", this._topRender);
            this.a_cd_label = this.addChild(this._bottomRender.getComponent("e_cd_label"));

            this.e_selbtn = <SelectButton>this.addEvntBut("e_selbtn", this._topRender);

            this.btnAry = new Array
            this.btnAry.push(this.e_tiaozhan);
            this.btnAry.push(this.a_cd_label);
            this.btnAry.push(this._midRender.getComponent("e_info"));
            this.btnAry.push(this.e_selbtn);

            //this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._bottomRender.getComponent("e_boss_bg"));
            this.addChild(this._bottomRender.getComponent("a_list_bg"));
            this.a_list_pos = this.addChild(this._bottomRender.getComponent("a_list_pos"));


            this.addChild(this._midRender.getComponent("a_boss_name_bg"));

            this.addChild(this._midRender.getComponent("e_forcebg"));

            this.a_boss_name = this.addChild(this._topRender.getComponent("a_boss_name"));
            this.e_force = this.addChild(this._topRender.getComponent("e_force"));


            

            this.rewardIconItem = new Array();
            for (var i: number = 0; i < 6; i++) {
                var ui: UICompenent = this.addChild(this._midRender.getComponent("e_reward" + i));
                this.rewardIconItem.push(ui);
            }

            this.initList();
            this.addBossChar();

        }
        private rewardIconItem: Array<UICompenent>;

        private selectVo: PersonBossVo;
        private _curpage: number;
        private _maxpage: number;
        public selectMeshBossByVo(vo: PersonBossVo): void {
            this.selectVo = vo;
            var $tb_Vo: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template(vo.tabbossinfo.bossEntry)
            this.bossChar.setAvatar($tb_Vo.avatar);
            var $bossNameStr: string = ""
            if ($tb_Vo.name.length <= 3) {
                $bossNameStr += "\n";
            }
            for (var i: number = 0; i < $tb_Vo.name.length; i++) {
                $bossNameStr += $tb_Vo.name.substr(i, 1)
                $bossNameStr += "\n";
            }

            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.e_force.skinName, String(vo.tabbossinfo.force), ArtFont.num56);
            LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_boss_name.skinName, ColorType.colorfef3d7 + $bossNameStr, 16, TextAlign.LEFT);

            this._curpage = 1;
            this._maxpage = Math.ceil(vo.tabbossinfo.show.length / 6);
            this.drawReward();
            this.setPage();

            if (!vo.openstate) {
                this.setUiListVisibleByItem(this.unlockAry, true);
                this.setUiListVisibleByItem(this.btnAry, false);
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.unlockAry[1].skinName, ColorType.Brown7a2f21 + vo.tabbossinfo.permitLevel + "级解锁BOSS", 16, TextAlign.CENTER);
            } else {
                this.setUiListVisibleByItem(this.unlockAry, false);
                this.setUiListVisibleByItem(this.btnAry, true);
            }

            this.e_selbtn.selected = GameData.configData.getopen_prompting_pboss(vo.tabbossinfo.id - 1);
        }

        private drawReward() {
            var idx = (this._curpage - 1) * 6;
            for (var i = idx; i < idx + 6; i++) {
                if (i < this.selectVo.tabbossinfo.show.length) {
                    this.setUiListVisibleByItem([this.rewardIconItem[i % 6]], true);
                    IconManager.getInstance().drawItemIcon60(this.rewardIconItem[i % 6], this.selectVo.tabbossinfo.show[i]);
                } else {
                    this.setUiListVisibleByItem([this.rewardIconItem[i % 6]], false);
                }
            }
        }

        private setPage(): void {
            if (this._curpage == this._maxpage && this._maxpage == 1) {
                this.setUiListVisibleByItem([this.e_leftbtn, this.e_rightbtn], false);
            } else if (this._curpage < this._maxpage && this._curpage == 1) {
                this.setUiListVisibleByItem([this.e_leftbtn], false);
                this.setUiListVisibleByItem([this.e_rightbtn], true);
            } else if (this._curpage == this._maxpage && this._curpage != 1) {
                this.setUiListVisibleByItem([this.e_leftbtn], true);
                this.setUiListVisibleByItem([this.e_rightbtn], false);
            } else {
                this.setUiListVisibleByItem([this.e_leftbtn, this.e_rightbtn], true);
            }
        }

        public refrishListData(): void {
            this.pbossleftList.resetData();
        }


        private bossChar: MonsterUIChar
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this._bottomRender.addModel(this.bossChar);
        }

        private pbossleftList: PbossLeftList
        private initList(): void {
            this.pbossleftList = new PbossLeftList;
            this.pbossleftList.init(this._midRender.uiAtlas)

        }
        public resize(): void {
            super.resize();
            if (this.pbossleftList) {

                this.pbossleftList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x + 3
                this.pbossleftList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y + 5
            }

            if (this.bossChar) {
                this.bossChar.resize();
                this.bossChar.scale = 1.8 * UIData.Scale;
                this.bossChar.x = -60 * UIData.Scale;
                this.bossChar.y = -30 * UIData.Scale;
            }
        }
    }

}