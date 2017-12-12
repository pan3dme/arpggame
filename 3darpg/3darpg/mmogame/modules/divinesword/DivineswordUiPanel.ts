module divinesword {

    export class DivineswordUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _redPointRender: RedPointRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;


            // if (this.divineswordTask) {
            //     this.divineswordTask.dispose();
            //     this.divineswordTask = null;
            // }
            if (this.divineswordSkill) {
                this.divineswordSkill.dispose();
                this.divineswordSkill = null;
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
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);



            this._bgRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._bgRender.uiAtlas.setInfo("ui/uidata/training/training.xml", "ui/uidata/training/training.png", () => { this.loadConfigCom() }, "ui/uidata/training/trainingps.png");
        }

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._bgRender.uiAtlas;
            this.initData();
            this.resize();

            this.applyLoadComplete();
        }

        private TabAry: Array<SelectButton>
        private UnlockUIAry: Array<UICompenent>
        // private t_unlock0: UICompenent
        private t_unlock2: UICompenent

        private initData(): void {
            this.TabAry = new Array
            // for (var i = 0; i < 2; i++) {
            //     var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab" + i));
            //     a.data = i + 1;
            //     a.addEventListener(InteractiveEvent.Up, this.click, this);
            //     this.TabAry.push(a);
            // }

            var a = <SelectButton>this.addChild(this._bgRender.getComponent("tab2"));
            a.data = SharedDef.MODULE_GW_ALL;
            a.addEventListener(InteractiveEvent.Up, this.click, this);
            this.TabAry.push(a);

            this._redPointRender.getRedPointUI(this, 127, new Vector2D(this.TabAry[0].x + this.TabAry[0].width - 5, this.TabAry[0].y));


            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bgRender);

            this.UnlockUIAry = new Array
            // this.t_unlock0 = this.addEvntBut("t_unlock0", this._bgRender);
            // this.UnlockUIAry.push(this.t_unlock0);
            this.t_unlock2 = this.addEvntBut("t_unlock2", this._bgRender);
            this.UnlockUIAry.push(this.t_unlock2);

            this.winmidRender.applyObjData();

            this.addUIList(["a_tittle_name"], this._bgRender);
            this.addUIList(["t_bgline"], this._baseRender);

        }

        public resize(): void {
            super.resize();
        }

        public refreshOpenLev() {
            //判断解锁情况
            // for (var i = 0; i < 2; i++) {
            //     if (GuidData.player.getsyspageopen(SharedDef.MODULE_EXP, SharedDef.MODULE_EXP_QUEST + i)) {
            //         this.setUiListVisibleByItem([this.TabAry[i]], true);
            //         this.setUiListVisibleByItem([this.UnlockUIAry[i]], false);
            //     } else {
            //         this.setUiListVisibleByItem([this.TabAry[i]], false);
            //         this.setUiListVisibleByItem([this.UnlockUIAry[i]], true);
            //         this.UnlockUIAry[i].data = tb.TB_system_base.getTempVo(SharedDef.MODULE_EXP * 10 + SharedDef.MODULE_EXP_QUEST + i);
            //     }
            // }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_GW, SharedDef.MODULE_GW_ALL)) {
                this.setUiListVisibleByItem([this.TabAry[0]], true);
                this.setUiListVisibleByItem([this.UnlockUIAry[0]], false);
            } else {
                this.setUiListVisibleByItem([this.TabAry[0]], false);
                this.setUiListVisibleByItem([this.UnlockUIAry[0]], true);
                this.UnlockUIAry[0].data = tb.TB_system_base.getTempVo(SharedDef.MODULE_GW * 10 + SharedDef.MODULE_GW_ALL);
            }
        }

        public show($data: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                ModulePageManager.showResTittle([1, 2, 3]);
            }
            this.refreshOpenLev();
            this.selectedTab(SharedDef.MODULE_GW_ALL);
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.hideTabPage();
            ModulePageManager.hideResTittle();
        }

        private _lastvalue: number
        public selectedTab($value: number) {
            this._lastvalue = $value;
            // for (var i = 0; i < this.TabAry.length; i++) {
            //     if (this.TabAry[i].data == $value) {
            //         this.TabAry[i].selected = true;
            //     } else {
            //         this.TabAry[i].selected = false;
            //     }
            // }
            this.TabAry[0].selected = true;
            this.hideTabPage($value);
            this.showTabPage($value);
        }


        // public divineswordTask: DivineswordTask
        public divineswordSkill: DivineswordSkill

        private showTabPage($value: number) {
            switch ($value) {
                // case SharedDef.MODULE_EXP_QUEST:
                    // if (!this.divineswordTask) {
                    //     this.divineswordTask = new DivineswordTask();
                    //     this.divineswordTask.initUiAtlas(this._bgRender.uiAtlas);
                    // }
                    // this.divineswordTask.show();
                    // break;
                case SharedDef.MODULE_GW_ALL:
                    if (!this.divineswordSkill) {
                        this.divineswordSkill = new DivineswordSkill();
                        this.divineswordSkill.parent = this;
                        this.divineswordSkill.initUiAtlas(this._bgRender.uiAtlas, this.winmidRender);
                    }
                    this.divineswordSkill.show();
                    break;

                default:
                    break;
            }
        }

        private hideTabPage($value: number = -1) {
            switch ($value) {
                case SharedDef.MODULE_GW_ALL:
                    if (this.divineswordSkill) {
                        this.divineswordSkill.hide();
                    }
                    break;
                // case SharedDef.MODULE_EXP_ARTIFACT:
                //     if (this.divineswordTask) {
                //         this.divineswordTask.hide();
                //     }
                //     break;

                default:
                    // if (this.divineswordTask) {
                    //     this.divineswordTask.hide();
                    // }
                    if (this.divineswordSkill) {
                        this.divineswordSkill.hide();
                    }
                    break;
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new DivineswordEvent(DivineswordEvent.HIDE_TRAINING_PANEL))

                    break;
                // case this.t_unlock0:
                //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock0.data.level + "级后解锁", 99);
                //     break;
                case this.t_unlock2:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.t_unlock2.data.level + "级后解锁", 99);
                    break;
                default:
                    break;
            }
        }

        private click(evt: InteractiveEvent): void {
            this.selectedTab(evt.target.data);
            UIManager.popClikNameFun(evt.target.name);
        }
    }

}