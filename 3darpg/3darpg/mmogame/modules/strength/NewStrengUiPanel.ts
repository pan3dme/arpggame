module strengthgem {

    export class NewStrengUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _publicbguiRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _redPointRender: RedPointRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._baseRender.dispose();
            this._baseRender = null;


            if (this.strengTab0) {
                this.strengTab0.dispose();
                this.strengTab0 = null;
            }
            if (this.strengTab1) {
                this.strengTab1.dispose();
                this.strengTab1 = null;
            }
            if (this.strengTab2) {
                this.strengTab2.dispose();
                this.strengTab2 = null;
            }
            if (this.strengTab3) {
                this.strengTab3.dispose();
                this.strengTab3 = null;
            }
            if (this._redPointRender) {
                this._redPointRender.dispose();
                this._redPointRender = null;
            }

            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._publicbguiRender = new UIRenderComponent;
            this.addRender(this._publicbguiRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);



            this._roleRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {

            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this._publicbguiRender.uiAtlas = WindowUi.winUIAtlas;
            this._roleRender.uiAtlas.setInfo("ui/uidata/streng/newstreng.xml", "ui/uidata/streng/newstreng.png", () => { this.loadConfigCom() }, "ui/uidata/streng/strengthuse.png");
            // });
        }

        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._baseRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = this._publicbguiRender.uiAtlas;
            this.initData();
            this.resize();

            this.applyLoadComplete();
        }

        private TabAry: Array<SelectButton>
        private UnlockUIAry: Array<UICompenent>
        private OtherBgUIAry: Array<UICompenent>
        private MasterUIAry: Array<UICompenent>
        private t_rewardBtn: UICompenent
        private t_unlock0: UICompenent
        private t_unlock1: UICompenent
        private t_unlock2: UICompenent
        private t_unlock3: UICompenent

        private initData(): void {
            this.TabAry = new Array
            for (var i = 0; i < 4; i++) {
                var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
                a.data = SharedDef.MODULE_MIX_STRENGTH + i;
                a.addEventListener(InteractiveEvent.Up, this.click, this);
                this.TabAry.push(a);
                this._redPointRender.getRedPointUI(this, 38 + i * 3, new Vector2D(a.x + a.width - 5, a.y));
            }

            this.MasterUIAry = new Array
            this.MasterUIAry.push(this._bgRender.getComponent("b_txtbg"));
            this.t_rewardBtn = this.addEvntButUp("t_rewardBtn", this._roleRender);
            this.MasterUIAry.push(this.t_rewardBtn);
            this.MasterUIAry.push(this._roleRender.getComponent("t_curlev"));

            this.UnlockUIAry = new Array
            this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock1 = this.addEvntBut("t_unlock1", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock1);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock2);
            this.t_unlock3 = this.addEvntBut("t_unlock3", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock3);


            this.OtherBgUIAry = new Array
            this.OtherBgUIAry.push(this._bgRender.getComponent("t_bgleft"));
            this.OtherBgUIAry.push(this._bgRender.getComponent("t_bgcenter"));
            this.OtherBgUIAry.push(this._bgRender.getComponent("t_bgright"));
            this.OtherBgUIAry.push(this._roleRender.getComponent("t_huawenright"));
            var t_huawenleft = this._roleRender.getComponent("t_huawenleft");
            t_huawenleft.isU = true;
            this.OtherBgUIAry.push(t_huawenleft);
            this.OtherBgUIAry.push(this._roleRender.getComponent("t_huawen1right"));
            var t_huawen1left = this._roleRender.getComponent("t_huawen1left");
            t_huawen1left.isU = true;
            this.OtherBgUIAry.push(t_huawen1left);
            this._roleRender.applyObjData();

            this.OtherBgUIAry.push(this._baseRender.getComponent("t_uparrow"));

            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._roleRender);

            var cnew_bg_yellow = this.addChild(this.winmidRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._roleRender);

            this.winmidRender.applyObjData();


            // this.addUIList(["a_titlt", "a_line1", "t_mountshadow", "a_namebg"], this._roleRender)
            this.addUIList(["t_title", "t_equBg"], this._bgRender);
            this.addUIList(["t_line"], this._baseRender);

        }

        public resize(): void {
            super.resize();
        }

        public refreshOpenLev() {
            var tabsysary: Array<tb.TB_system_base> = new Array
            //读表，判断解锁情况
            for (var j = 0; j < SharedDef.MODULE_MIX_WASH; j++) {
                var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_MIX * 10 + j + 1));
                tabsysary.push($tb_system_base);
            }

            for (var i = 0; i < tabsysary.length; i++) {
                if (tabsysary[i].level <= GuidData.player.getLevel()) {
                    this.setUiListVisibleByItem([this.TabAry[i]], true);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
                } else {
                    this.setUiListVisibleByItem([this.TabAry[i]], false);
                    this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
                    this.UnlockUIAry[i].data = tabsysary[i];
                }
            }
        }

        //是否激活
        private activation: boolean;
        public show($data: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.refreshOpenLev();
            this.selectedTab($data);
        }

        public hide(): void {
            if (this.strengTab3) {
                if (!this.strengTab3.canshowAlert()) {
                    return;
                }
            }
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        }

        private _lastvalue: number
        public selectedTab($value: number) {
            this._lastvalue = $value;
            for (var i = 0; i < this.TabAry.length; i++) {
                if (this.TabAry[i].data == $value) {
                    this.TabAry[i].selected = true;
                } else {
                    this.TabAry[i].selected = false;
                }
            }
            //公共背景显隐逻辑
            this.setUiListVisibleByItem(this.OtherBgUIAry, $value != SharedDef.MODULE_MIX_GEM);
            this.setUiListVisibleByItem(this.MasterUIAry, $value != SharedDef.MODULE_MIX_WASH);
            this.hideTabPage($value);
            this.showTabPage($value);
        }


        public strengTab0: StrengTab0
        public strengTab1: StrengTab1
        public strengTab2: StrengTab2
        public strengTab3: StrengTab3
        private showTabPage($value: number) {
            this._type = $value - 1;//比value少1
            var ary = GuidData.grow.getMasterLevVo();
            switch ($value) {
                case SharedDef.MODULE_MIX_STRENGTH:
                    if (!this.strengTab0) {
                        this.strengTab0 = new StrengTab0();
                        this.strengTab0.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab0.parent = this;
                    }
                    this.strengTab0.show();
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[0] + ":" + ary[0] + "级", 14, TextAlign.CENTER);
                    break;
                case SharedDef.MODULE_MIX_POLISHED:
                    if (!this.strengTab1) {
                        this.strengTab1 = new StrengTab1();
                        this.strengTab1.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab1.parent = this;
                    }
                    this.strengTab1.show();
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[1] + ":" + ary[1] + "级", 14, TextAlign.CENTER);
                    break;
                case SharedDef.MODULE_MIX_GEM:
                    if (!this.strengTab2) {
                        this.strengTab2 = new StrengTab2();
                        this.strengTab2.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab2.parent = this;
                    }
                    this.strengTab2.show();
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[2] + ":" + ary[2] + "级", 14, TextAlign.CENTER);
                    break;
                case SharedDef.MODULE_MIX_WASH:
                    if (!this.strengTab3) {
                        this.strengTab3 = new StrengTab3();
                        this.strengTab3.initUiAtlas(this._roleRender.uiAtlas, this._publicbguiRender.uiAtlas);
                        this.strengTab3.parent = this;
                    }
                    this.strengTab3.show();
                    break;

                default:
                    break;
            }
        }

        private hideTabPage($value: number = -1) {
            switch ($value) {
                case SharedDef.MODULE_MIX_STRENGTH:
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
                case SharedDef.MODULE_MIX_POLISHED:
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
                case SharedDef.MODULE_MIX_GEM:
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
                case SharedDef.MODULE_MIX_WASH:
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    break;

                default:
                    if (this.strengTab1) {
                        this.strengTab1.hide();
                    }
                    if (this.strengTab0) {
                        this.strengTab0.hide();
                    }
                    if (this.strengTab2) {
                        this.strengTab2.hide();
                    }
                    if (this.strengTab3) {
                        this.strengTab3.hide();
                    }
                    break;
            }
        }

        private _type: number;
        public refreshCurMasterLev() {
            var ary = GuidData.grow.getMasterLevVo();
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.MasterUIAry[2].skinName, ColorType.color802626 + StrengUtil.KeyNameByType[this._type] + ":" + ary[this._type] + "级", 14, TextAlign.CENTER);
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:

           
                    ModuleEventManager.dispatchEvent(new StrengthGemEvent(StrengthGemEvent.HIDE_STRENGTHGEM_PANEL));
                 
                    break;
                case this.t_rewardBtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var $evttt = new StrengthGemEvent(StrengthGemEvent.SHOW_MASTER_TIPS_EVENT);
                    $evttt.data = this._lastvalue;
                    ModuleEventManager.dispatchEvent($evttt);
                    break;
                case this.t_unlock0:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock1:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock1.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock2.data.level + "级后解锁", 99);
                    break;
                case this.t_unlock3:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock3.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        }

        private click(evt: InteractiveEvent): void {
            if (this.strengTab3) {
                if (!this.strengTab3.canshowAlert()) {
                    //tab按钮状态设置
                    for (var i = 0; i < this.TabAry.length; i++) {
                        if (i == 3) {
                            this.TabAry[i].selected = true;
                        } else {
                            this.TabAry[i].selected = false;
                        }
                    }
                    return;
                }
            }
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);

        }
    }

}