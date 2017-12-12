module faction {

    export class FactionBuildList extends SList {

        public constructor() {
            super();
            this.left = 54;
            this.top = 88;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, FactionBuildRender, 152, 421, 0, 50, 6, 256, 512, 1, 8);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var $sListItemData = this.getData();
            this.refreshData($sListItemData);
        }


        public getData(): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            var listary = FactionBuildModel.getInstance().getList();
            for (var i: number = 0; i < listary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = listary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show($type: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            // this.refreshAndselectIndex();
        }

        public refreshAndselectIndex(): void {
            this.refreshDataByNewData();
            this.setSelectIndex(this.getCurrentSelectIndex());
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class FactionBuildRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private ItemBg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.ItemBg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ItemBg", 0, 0, 152, 50);
            this.ItemBg.addEventListener(InteractiveEvent.Up, this.equClick, this);
            $container.addChild(this.ItemBg);
        }

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
            if (val) {
                var bb = new faction.FactionBuildEvent(faction.FactionBuildEvent.CLICK_BUILD_ITEM);
                bb.data = this.itdata.data;
                ModuleEventManager.dispatchEvent(bb);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }


        private applyrender(): void {
            var vo: FBuildItemVo = this.itdata.data

            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.ItemBg.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var selectkey: string;
            if (this.selected) {
                selectkey = "Selectok";
            } else {
                selectkey = "Selectno";
            }

            var state: UIRectangle = this.parentTarget.baseAtlas.getRec(selectkey);
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, state.pixelX, state.pixelY, state.pixelWitdh, state.pixelHeight, 0, 0, state.pixelWitdh, state.pixelHeight);
            //居中的位置
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, vo.data.name, 16, 76, 14, TextAlign.CENTER, ColorType.Brown7a2f21);

            if (vo.state == 1) {
                //正在挑战
                var txtrect: UIRectangle = this.parentTarget.baseAtlas.getRec("Buiild");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, txtrect.pixelX, txtrect.pixelY, txtrect.pixelWitdh, txtrect.pixelHeight, 0, 0, txtrect.pixelWitdh, txtrect.pixelHeight);
                //居中的位置
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "建造中", 20, 76, 13, TextAlign.CENTER, "#ffffff");
            } else if (vo.state == 2) {
                var txtrect: UIRectangle = this.parentTarget.baseAtlas.getRec("Noopen");
                ctx.drawImage(this.parentTarget.baseAtlas.useImg, txtrect.pixelX, txtrect.pixelY, txtrect.pixelWitdh, txtrect.pixelHeight, 0, 0, txtrect.pixelWitdh, txtrect.pixelHeight);
                //居中的位置
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "主殿 LV" + vo.data.unlock + " 解锁", 20, 76, 13, TextAlign.CENTER, "#ffffff");
            }
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染

            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            console.log("--点击--", this.itdata);
            if (this.itdata) {
                var vo: FBuildItemVo = this.itdata.data
                if (vo.state == 2) {
                    msgtip.MsgTipManager.outStrById(22, 51);
                    return;
                }
                this.setSelect();
            }
        }

        private setnull(): void {
            LabelTextFont.clearLabel(this.uiAtlas, this.ItemBg.skinName);
        }
    }


    export class FactionBuildRightPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;

            if (this.buildlist) {
                this.buildlist.dispose();
                this.buildlist = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
        }

        private _publicRender: UIRenderComponent
        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            // this._topRender.uiAtlas = $uiAtlas;

            this._publicRender.uiAtlas = $publicuiAtlas;
            this.initView();

        }


        public name: UICompenent
        public maxlev: UICompenent
        public oncetime: UICompenent
        public res: UICompenent
        public curmoney: UICompenent
        public a_5: UICompenent
        public build: UICompenent
        public icon: UICompenent
        private _uiAry: Array<UICompenent>;
        private _MaxLevAry: Array<UICompenent>;
        private _buildLevAry: Array<UICompenent>;
        private initView(): void {
            var renderLevel = this._baseRender;

            this.build = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.build.x = 725
            this.build.y = 352

            this._buildLevAry = new Array
            this._buildLevAry.push(this.build);
            this._buildLevAry.push(<UICompenent>renderLevel.getComponent("build"));

            this.name = this.addChild(<UICompenent>renderLevel.getComponent("a_16"));
            this.maxlev = <UICompenent>renderLevel.getComponent("a_21");
            this.oncetime = this.addChild(<UICompenent>renderLevel.getComponent("a_22"));
            this.res = this.addChild(<UICompenent>renderLevel.getComponent("a_23"));
            this.curmoney = this.addChild(<UICompenent>renderLevel.getComponent("a_24"));
            this.icon = this.addChild(<UICompenent>renderLevel.getComponent("a_25"));

            this.addUIList(["bg3_4", "bg3_5", "bg3_6", "a_26"], this._bottomRender);

            var a_6 = <UICompenent>renderLevel.getComponent("a_6");
            var a_7 = this.addChild(<UICompenent>renderLevel.getComponent("a_7"));
            var a_8 = this.addChild(<UICompenent>renderLevel.getComponent("a_8"));
            var a_9 = this.addChild(<UICompenent>renderLevel.getComponent("a_9"));

            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_6.skinName, "建筑等级上限：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_7.skinName, "建造所需时间：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_8.skinName, "消耗家族资金：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, a_9.skinName, "当前家族资金：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            this._MaxLevAry = new Array
            this._MaxLevAry.push(a_6);
            this._MaxLevAry.push(this.maxlev);
            this._MaxLevAry.push(<UICompenent>this._bottomRender.getComponent("bg3_3"));

            this._uiAry = new Array
            for (var i = 0; i < 5; i++) {
                this._uiAry.push(<UICompenent>renderLevel.getComponent("a_" + (11 + i)));
            }

            this.a_5 = this.addChild(<UICompenent>renderLevel.getComponent("a_5"))

            this.addUIList(["line1", "xBg1"], renderLevel);

        }


        public resize(): void {
            super.resize();
            if (this.buildlist) {
                this.buildlist.left = this.a_5.parent.x / UIData.Scale + this.a_5.x
                this.buildlist.top = this.a_5.parent.y / UIData.Scale + this.a_5.y
            }
        }


        public buildlist: FactionBuildList;
        public show(): void {
            if (!this.buildlist) {
                this.buildlist = new FactionBuildList();
                this.buildlist.init(this._bottomRender.uiAtlas);
            }
            this.buildlist.show(0);

            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            this.buildlist.refreshAndselectIndex();
            this.resize();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            if (this.buildlist) {
                this.buildlist.hide();
            }
        }

        private _data: FBuildItemVo;
        public resetData($data: FBuildItemVo): void {
            this._data = $data;

            this.setUiListVisibleByItem(this._buildLevAry, $data.data.can_lvup != 0);

            this._bottomRender.uiAtlas.upDataPicToTexture(getFactionBuildMapUrl($data.data.type), this.icon.skinName);


            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.name.skinName, $data.data.level + "级" + $data.data.name, 16, TextAlign.CENTER, ColorType.colorb96d49)
            if ($data.data.type == 1) {
                LabelTextFont.clearLabel(this._bottomRender.uiAtlas, this.maxlev.skinName);
                this.setUiListVisibleByItem(this._MaxLevAry, false);
            } else {
                this.setUiListVisibleByItem(this._MaxLevAry, true);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.maxlev.skinName, "  " + GuidData.faction.getLev() + "级", 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e)
            }

            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.oncetime.skinName, "  " + this.getTimestr($data.data.time), 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e)

            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.res.skinName, "  " + String($data.data.cost), 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e)
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.curmoney.skinName, "  " + String(GuidData.faction.getMoney()), 16, TextAlign.LEFT, ColorType.Green2ca937, ColorType.colord27262e)
            this.setUiListVisibleByItem(this._uiAry, false);
            for (var i = 0; i < $data.data.desc.length; i++) {
                // LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this._uiAry[i].skinName, $data.data.desc[i], 16, TextAlign.LEFT, )
                this.drawinfo(this._uiAry[i], $data.data.desc[i], 16, ColorType.Green56da35, 264);
                this.setUiListVisibleByItem([this._uiAry[i]], true);
            }
            this.resize();
        }

        private drawinfo($ui: UICompenent, $ms: string, fontsize: number, fontColor: string, $maxWidth: number = 0): void {
            if (fontColor.indexOf("[") != -1) {  //[00ff00]
                fontColor = "#" + fontColor.substr(1, 6);
            }
            var $skilldescribe: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skilldescribe.pixelWitdh, $skilldescribe.pixelHeight, false);

            $ctx.font = "bolder " + fontsize + "px " + UIData.font;

            TextRegExp.wrapText($ctx, "[853d07]" + $ms, fontColor, 0, 0, $maxWidth, 16);
            this._baseRender.uiAtlas.updateCtx($ctx, $skilldescribe.pixelX, $skilldescribe.pixelY);
        }

        private getTimestr($time: number): string {
            var hour: number = Math.floor($time / 60)
            var min: number = $time - hour * 60
            var str1: string = ""
            if (hour > 0) {
                var str1 = hour + "小时"
            }
            var str2: string = str1 + min + "分钟"
            return str2;
        }



        public rewardClik(evt: InteractiveEvent): void {
            var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
            aa.id = evt.target.data
            ModuleEventManager.dispatchEvent(aa);
        }

        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.build:

                    if (!this.getIdentity()) {
                        msgtip.MsgTipManager.outStrById(22, 52);
                        return;
                    }

                    if (GuidData.faction.getBuildCur() != 0) {
                        TimeUtil.addTimeOut(30, () => {
                            AlertUtil.show("当前有建筑正在建造中，是否需要加速建造？", "提示", (a: any) => { this.backFun(a) })
                        })
                        return;
                    }

                    if (GuidData.faction.getMoney() < this._data.data.cost) {
                        msgtip.MsgTipManager.outStrById(22, 55);
                        return;
                    }

                    if (GuidData.faction.getLev() <= this._data.data.level && this._data.data.type != 1) {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "当前建筑已达等级上限", 99);
                        return;
                    }

                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_BUILDING_UPGRADE, this._data.data.id, 0, "", "");
                    break;

                default:
                    break;
            }
        }

        private backFun(a: any): void {
            if (a == 1) {
                //购买次数
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

        private getIdentity(): boolean {
            var ary: Array<FactionItemData> = GuidData.faction.getFactionList();
            var identity: number;
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].guid == GuidData.player.getGuid()) {
                    identity = ary[i].identity
                    break;
                }
            }

            var basetabvo = tb.TB_faction_building_base.get_TB_faction_building_baseById(1);
            for (var i = 0; i < basetabvo.zhiwei_limit.length; i++) {
                if (basetabvo.zhiwei_limit[i] == identity) {
                    return true;
                }
            }
            return false;
        }

    }



}