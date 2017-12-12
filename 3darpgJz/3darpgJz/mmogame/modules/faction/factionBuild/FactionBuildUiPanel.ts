module faction {

    export class FactionBuildUiPanel extends WindowUi {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this.factionBuildRightPanel) {
                this.factionBuildRightPanel.dispose();
                this.factionBuildRightPanel = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)


            this._topRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/faction/factionbuild/mainbuild.xml", "ui/uidata/faction/factionbuild/mainbuild.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
        }


        private curbuild: UICompenent;
        private buildtime: UICompenent;
        private b_speed: UICompenent;
        private tickFun: Function;
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._topRender.uiAtlas;

            this._publicRender.uiAtlas = WindowUi.winUIAtlas;

            var renderLevel: UIRenderComponent = this._topRender;

            this.tickFun = () => { this.refreshBossState() };

            var a = this.addChild(<UICompenent>this._publicRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(a, "coffeeBg", renderLevel);

            // this.addEvntBut("baseBg", this._publicRender) //大黑背景

            this.b_speed = this.addEvntButUp("cnew_but_operation", this._publicRender);
            this.b_speed.x = 743
            this.b_speed.y = 449

            this._publicRender.applyObjData();

            this.addUIList(["a_17", "a_18"], renderLevel);
            this.addUIList(["bg3_1", "bg3_2"], this._baseRender);
            this.curbuild = this.addChild(<UICompenent>renderLevel.getComponent("a_19"));
            this.buildtime = this.addChild(<UICompenent>renderLevel.getComponent("a_20"));

            var a_1 = this.addChild(<UICompenent>renderLevel.getComponent("a_1"));
            var a_3 = this.addChild(<UICompenent>renderLevel.getComponent("a_3"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a_1.skinName, "当前建造中:", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a_3.skinName, "剩余建造时间:", 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            this.Needrefresh();

            this.applyLoadComplete();
        }


        private refreshBossState(): void {
            if (GuidData.faction.getBuildCur() == 0 || !this.hasStage) {
                this._timeTickflag = false;
                TimeUtil.removeTimeTick(this.tickFun);
                return;
            }
            this.resetData();
        }

        /**
         * 监听当前挑战的bossid，若不为0，则表示正在挑战boss。需要倒计时刷新界面
         */
        private _timeTickflag: boolean = false;
        public Needrefresh(): void {
            if (GuidData.faction.getBuildCur() != 0 && !this._timeTickflag) {
                this._timeTickflag = true;
                TimeUtil.addTimeTick(5000, this.tickFun);
            }
        }

        public factionBuildRightPanel: FactionBuildRightPanel;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            if (!this.factionBuildRightPanel) {
                this.factionBuildRightPanel = new FactionBuildRightPanel();
                this.factionBuildRightPanel.initUiAtlas(this._topRender.uiAtlas, this._publicRender.uiAtlas);
            }
            this.factionBuildRightPanel.show();
            this.resetData();
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.factionBuildRightPanel) {
                this.factionBuildRightPanel.hide();
            }
            super.hide();
        }

        public resize(): void {
            super.resize();
        }

        public resetData(): void {
            var curbuildname: string = "无";
            var curbuildtime: string = "无";
            if (GuidData.faction.getBuildCur() > 0) {
                var tabvo: tb.TB_faction_building = tb.TB_faction_building.get_TB_faction_buildingById(GuidData.faction.getBuildCur());
                curbuildname = tabvo.name + "  LV" + tabvo.level + " - LV" + (tabvo.level + 1)
                var curtime = this.getRestTime();
                var hour: string = "";
                var min: string = "";
                if (curtime[0] > 0) {
                    hour = curtime[0] + "小时"
                }
                if (curtime[1] > 0) {
                    min = curtime[1] + "分钟"
                }

                curbuildtime = hour + min;
            }

            console.log("---", curbuildtime);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.curbuild.skinName, "  " + curbuildname + "  ", 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.buildtime.skinName, "  " + curbuildtime, 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e);
        }

        private getRestTime(): Array<number> {
            var endtime = GuidData.faction.getBuildEndTime();

            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts);

            var a: number = endtime - $sever.getTime();
            var min: number;
            var h: number;
            if (a < 3600) {
                min = Math.ceil(a / 60);
                h = 0;
            } else {
                h = Math.floor(a / 3600);
                min = Math.ceil(a / 60) - (h * 60);
            }
            return [h, min];
        }


        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new faction.FactionBuildEvent(faction.FactionBuildEvent.HIDE_BUILD_EVENT));
                    break
                case this.b_speed:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (GuidData.faction.getBuildCur() > 0) {
                        var tab3 = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
                        //加速建造
                        var $evt: popbuy.PopBuyEvent = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL)
                        $evt.resoureItem = tab3.speedup_cost;
                        // $evt.Type = popbuy.PopBuyType.SPEEDBUILD;
                        $evt.Info1 = "剩余";
                        var tab = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
                        $evt.Info2 = "一次加速减少" + tab.speedup_time + "分钟建造时间";
                        $evt.cutNum = tab3.speedup_limit - GuidData.player.getFactionSpeedUpNum();
                        $evt.SubmitFun = (value: number) => {
                            if (this.compareTime(value * tab3.speedup_time)) {
                                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE_SPEEDUP, value, 0, "", "");
                            } else {
                                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "建筑即将建造完成，请减少购买次数", 99);
                            }
                        }
                        ModuleEventManager.dispatchEvent($evt);
                    } else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前无可加速建筑", 99);
                    }
                    break

                default:
                    break;
            }
        }

        private compareTime($addtime: number): boolean {
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts);
            var time = ($sever.getTime() + $addtime * 60) - GuidData.faction.getBuildEndTime() - 59;
            if (time > 0) {
                return false;
            } else {
                return true;
            }
        }
    }
}