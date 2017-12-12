module treasure {

    export class TreasureRightPanel extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;

            if (this.treasureList) {
                this.treasureList.dispose();
                this.treasureList = null;
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
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();

        }

        public treasureList: TreasureList;
        private btnuiary: Array<UICompenent>;
        private Okuiary: Array<UICompenent>;
        private a_listindex: UICompenent;
        private b_zhanli: UICompenent;
        private b_currentname: UICompenent;
        private b_skillicon: UICompenent;
        private b_skillname: UICompenent;
        private b_skillinfo: UICompenent;
        private _btnRedPoint: RedPointCompenent;
        private initView(): void {
            var renderLevel = this._baseRender;

            this.a_listindex = this.addChild(this._baseRender.getComponent("a_listindex"));

            this.b_zhanli = this.addChild(this._topRender.getComponent("b_zhanli"));
            this.addChild(this._topRender.getComponent("a_zhanli_txt"));
            this.addChild(renderLevel.getComponent("b_numberBg"));
            this.b_currentname = this.addChild(renderLevel.getComponent("b_currentname"));


            this.addUIList(["b_line1_1", "b_line1_2", "b_titleBg"], renderLevel);


            this.b_skillicon = this.addChild(renderLevel.getComponent("b_skillicon"));
            this.b_skillname = this.addChild(renderLevel.getComponent("b_skillname"));
            this.b_skillinfo = this.addChild(renderLevel.getComponent("b_skillinfo"));

            this.btnuiary = new Array;
            var b_btntxt: FrameCompenent = <FrameCompenent>renderLevel.getComponent("b_btntxt");
            this.btnuiary.push(b_btntxt);

            var cnew_btn1 = this._publicRender.getComponent("cnew_btn1");
            this.setSizeForPanelUiCopy(cnew_btn1, "btnBg", renderLevel);
            cnew_btn1.addEventListener(InteractiveEvent.Up, this.butClik, this)
            this.btnuiary.push(cnew_btn1);

            this.btnuiary.push(renderLevel.getComponent("c_item0"));
            this.btnuiary.push(renderLevel.getComponent("c_item1"));
            this.btnuiary.push(renderLevel.getComponent("c_itemnum0"));
            this.btnuiary.push(renderLevel.getComponent("c_itemnum1"));
            // this.btnuiary.push(renderLevel.getComponent("b_propicon"));
            // this.btnuiary.push(renderLevel.getComponent("b_res1"));
            // this.btnuiary.push(renderLevel.getComponent("b_res2"));


            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(cnew_btn1.x + cnew_btn1.width, cnew_btn1.y));


            this.Okuiary = new Array;
            this.Okuiary.push(renderLevel.getComponent("b_infotxt"));

            this.attribute_cur_ary = new Array
            this.attribute_next_ary = new Array
            this.attribute_lev_ary = new Array
            for (var i = 0; i < 7; i++) {
                this.attribute_cur_ary.push(this._topRender.getComponent("c_attribute_c" + i));
                this.attribute_next_ary.push(this._topRender.getComponent("c_attribute_n" + i));
            }

            this.attribute_lev_ary.push(this._topRender.getComponent("c_lev"));
            this.attribute_lev_ary.push(this._topRender.getComponent("c_curlevtxt"));


        }

        private attribute_cur_ary: Array<UICompenent>;
        private attribute_next_ary: Array<UICompenent>;
        private attribute_lev_ary: Array<UICompenent>;

        public resize(): void {
            super.resize();
            if (this.treasureList) {
                this.treasureList.left = this.a_listindex.parent.x / UIData.Scale + this.a_listindex.x
                this.treasureList.top = this.a_listindex.parent.y / UIData.Scale + this.a_listindex.y
            }
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.treasureList) {
                this.treasureList = new TreasureList();
                this.treasureList.init(this._baseRender.uiAtlas);
            }
            this.treasureList.show();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.treasureList) {
                this.treasureList.hide();
            }
        }

        private _itdata: TreasureItemVo;
        private _curstate: number;//1：可升级 2：未解锁 3：已满级
        public resetData($data: TreasureItemVo): void {
            console.log("-$data--", $data);
            this._itdata = $data;
            //设置模型
            var $uiPanel: TreasureUiPanel = <TreasureUiPanel>this.parent;
            $uiPanel.setAvatar(Number($data.tabvo.model), $data.tabvo.name, 6);
            this.drawIcon(this.b_currentname, "ui/load/treasure/" + $data.tabvo.icon + ".png");
            var str: string;

            var a: FrameCompenent = <FrameCompenent>this.btnuiary[0];
            var resitem1: Array<number>;//必要道具
            var resitem2: Array<number> = null;//必要资源

            var spirittabary: Array<tb.TB_talisman_spirit> = tb.TB_talisman_spirit.get_TB_talisman_spiritByIdArray($data.tabvo.id);

            if ($data.state == 2) {
                //未激活 
                this._curstate = 2;
                resitem1 = $data.tabvo.avtivedata[0]
                a.goToAndStop(0);
                str = String(getForceByAtt(spirittabary[0].attr_id, spirittabary[0].attr_value))
            } else if ($data.state == 1) {
                //已激活
                a.goToAndStop(1);
                str = String($data.activityvo.power);

                var nextlev = $data.activityvo.lev + 1;
                if (nextlev > spirittabary[spirittabary.length - 1].level) {
                    resitem1 = null;
                } else {
                    this._nextlevtab = spirittabary[nextlev - 1];
                    resitem1 = this._nextlevtab.item_cost[0];
                    resitem2 = this._nextlevtab.money_cost[0];
                }

                if (resitem1 == null) {
                    this._curstate = 3;
                } else {
                    this._curstate = 1;
                }

            }
            //绘制战力
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_zhanli.skinName, str, 14, TextAlign.RIGHT, ColorType.Yellowffe9b4);

            if (resitem1 == null) {
                //等级已达上限
                this.setUiListVisibleByItem(this.btnuiary, false);
                this.setUiListVisibleByItem(this.Okuiary, true);
            } else {
                this.setUiListVisibleByItem(this.btnuiary, true);
                this.setUiListVisibleByItem(this.Okuiary, false);

                //资源2的绘制
                if (resitem2 == null) {
                    IconManager.getInstance().drawItemIcon40(this.btnuiary[2], resitem1[0]);
                    UiDraw.drawResHasNumAndAllNum(this.btnuiary[4], resitem1)
                    UiDraw.clearUI(this.btnuiary[3]);
                    UiDraw.clearUI(this.btnuiary[5]);
                    this.btnuiary[2].x = 783
                    this.btnuiary[4].x = 762
                } else {
                    IconManager.getInstance().drawItemIcon40(this.btnuiary[2], resitem1[0]);
                    UiDraw.drawResHasNumAndAllNum(this.btnuiary[4], resitem1)
                    IconManager.getInstance().drawItemIcon40(this.btnuiary[3], resitem2[0]);
                    UiDraw.drawResHasNumAndAllNum(this.btnuiary[5], resitem2)
                    this.btnuiary[2].x = 726
                    this.btnuiary[4].x = 708
                }
            }

            //技能绘制
            var skilltab: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($data.tabvo.passiveskill[0][0]);
            // this.drawIcon(this.b_skillicon, getSkillIconUrl(skilltab.icon), PuiData.SKILL_BG58);
            IconManager.getInstance().drawCircleIcon(this.b_skillicon, 2, $data.tabvo.passiveskill[0][0], false, 1);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.b_skillname.skinName, skilltab.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeText(this._baseRender.uiAtlas, this.b_skillinfo.skinName, 0, 0, tb.SkillDataVo.getSkillDesc($data.tabvo.passiveskill[0][0]), 14, ColorType.color9a683f, 125);

            //绘制属性
            this.drawAttribute();

            this.drawLev();

            if ($data.node.show) {
                this._btnRedPoint.preShow();
            } else {
                this._btnRedPoint.preHide();
            }
        }

        private _nextlevtab: tb.TB_talisman_spirit;
        private drawAttribute() {

            var lev: number;
            if (this._itdata.activityvo) {
                lev = this._itdata.activityvo.lev;
            } else {
                lev = 1;
            }
            var curlevtab = tb.TB_talisman_spirit.get_TB_talisman_spiritById(this._itdata.tabvo.id, lev);

            for (var i = 0; i < 7; i++) {
                this.setUiListVisibleByItem([this.attribute_cur_ary[i], this.attribute_next_ary[i]], false);
                if (i <= curlevtab.attr_id.length - 1) {
                    if (this._curstate == 1) {
                        this.setUiListVisibleByItem([this.attribute_cur_ary[i], this.attribute_next_ary[i]], true);
                        this.drawCurAttr(i, curlevtab.attr_id[i], curlevtab.attr_value[i]);
                    } else {
                        this.setUiListVisibleByItem([this.attribute_cur_ary[i]], true);
                        this.drawAttr(i, curlevtab.attr_id[i], curlevtab.attr_value[i]);
                    }
                }
            }
            // for (var i = 0; i < 7; i++) {
            //     this.setUiListVisibleByItem([this.attribute_cur_ary[i], this.attribute_next_ary[i]], true);
            //             this.drawAttr(i,1,1000);
            // }
        }

        private drawLev() {
            if (this._curstate == 1) {
                this.setUiListVisibleByItem(this.attribute_lev_ary, true);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.attribute_lev_ary[0].skinName, String(this._itdata.activityvo.lev), 16, TextAlign.LEFT, ColorType.colorff7200);
            } else {
                this.setUiListVisibleByItem(this.attribute_lev_ary, false);
            }
        }


        private drawCurAttr($index: number, $attrid: number, $attrvalue: number) {
            //显示当前属性和下一阶属性
            // var curlevtab = tb.TB_talisman_spirit.get_TB_talisman_spiritById(this._itdata.tabvo.id,this._itdata.activityvo.lev);

            // var attrid = this._itdata.tabvo.props[$index][0]
            // var attrNum_base = this._itdata.tabvo.props[$index][1]
            // var comebackid1 = this.gettabindex(attrid, curlevtab);
            // var comebackid2 = this.gettabindex(attrid, this._nextlevtab);
            // if (comebackid1 == -1 || comebackid2 == -1) {
            //     console.log(":--出错");
            // } else {
            //     var attrNum_c = attrNum_base + curlevtab.attr_value[comebackid1];
            //     var attrNum_n = attrNum_base + this._nextlevtab.attr_value[comebackid2];
            // }
            UiDraw.drawAttVal(this.attribute_cur_ary[$index], $attrid, $attrvalue);
            UiDraw.drawAddValRight(this.attribute_next_ary[$index], this._nextlevtab.attr_value[$index], false, TextAlign.LEFT);

            this.attribute_cur_ary[$index].y = this.attribute_next_ary[$index].y = 142 + $index * 20;

            this.attribute_cur_ary[$index].x = 717;

        }

        private drawAttr($index: number, $attrid: number, $attrvalue: number) {
            //显示当前属性


            // var attrid = this._itdata.tabvo.props[$index][0]
            // var attrNum_base = this._itdata.tabvo.props[$index][1]
            // var attrNum_c = attrNum_base;
            // if (this._curstate == 3) {

            //     var comebackid1 = this.gettabindex(attrid, curlevtab);
            //     if (comebackid1 == -1) {
            //         console.log(":--出错");
            //     } else {
            //         attrNum_c = attrNum_base + curlevtab.attr_value[comebackid1];
            //     }
            // }

            UiDraw.drawAttVal(this.attribute_cur_ary[$index], $attrid, $attrvalue);
            this.attribute_cur_ary[$index].y = 142 + $index * 20 - 26;
            this.attribute_cur_ary[$index].x = 717 + 42;
        }

        // private gettabindex($attrid: number, $ary: tb.TB_talisman_spirit): number {
        //     for (var i = 0; i < $ary.attr_id.length; i++) {
        //         if ($ary.attr_id[i] == $attrid) {
        //             return i;
        //         }
        //     }
        //     return -1;
        // }

        private getcostStr($ary: Array<number>, $baseColor: string = ColorType.colorb96d49): string {
            var itemcount: string;
            if (GuidData.player.getResType($ary[0]) >= $ary[1]) {
                itemcount = ColorType.Green98ec2c + $ary[1];
            } else {
                itemcount = ColorType.colorce0a00 + $ary[1];
            }
            return itemcount;
        }

        private drawIcon($ui: UICompenent, $url: string, $bgname: string = null): void {
            IconManager.getInstance().getIcon($url,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    if ($bgname != null) {
                        UiDraw.cxtDrawImg(ctx, $bgname, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                    }
                    //头像
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 1, 1, $rec.pixelWitdh - 2, $rec.pixelHeight - 2);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private _canclick: boolean = true;
        public butClik(evt: InteractiveEvent): void {
            if (this._itdata) {
                if (this._canclick) {
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this._canclick = false;
                    TimeUtil.addTimeOut(btnClickTime, () => {
                        this._canclick = true;
                    });
                    if (this._curstate == 2) {
                        //激活操作
                        var $ary = this._itdata.tabvo.avtivedata[0]
                        if (hasEnoughResItem($ary)) {
                            console.log("--id-", this._itdata.tabvo.id);
                            NetManager.getInstance().protocolos.talisman_active(this._itdata.tabvo.id);
                        } else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99)
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = $ary[0]
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                    } else if (this._curstate == 1) {
                        //升级操作
                        var $ary1 = this._nextlevtab.item_cost[0]
                        var $ary2 = this._nextlevtab.money_cost[0]
                        if (hasEnoughResItem($ary1) && hasEnoughResItem($ary2)) {
                            console.log("--id-", this._itdata.tabvo.id);
                            NetManager.getInstance().protocolos.talisman_lvup(this._itdata.tabvo.id);
                        } else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99)
                            var $idx = hasEnoughResItem($ary1)?$ary2[0]:$ary1[0]

                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = $idx
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                    }
                } else {
                    // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
                    
                }
            } else {
                console.log("--未选中--");
            }
        }
    }


    /**
     * list
     */
    export class TreasureList extends EffectSlist {

        public constructor() {
            super();
            this.left = 46;
            this.top = 173;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }


        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, TreasureListRender, 234, 343, 0, 85, 4, 256, 512, 1, 6, 2);
        }


        public setSelect($item: SListItem): void {
            super.setSelect($item);
            this._lastTid = $item.itdata.data.id;
        }

        private _lastTid: number
        private getSelectIdByTid($tid: number): number {
            console.log("---表id---", $tid);
            for (var i = 0; i < this._itemDataList.length; i++) {
                if (this._itemDataList[i].data.id == $tid) {
                    return this._itemDataList[i].id;
                }
            }
            console.log("--没有符合的项", $tid);
            return 0;
        }

        public refreshDataByNewData(): void {
            var a: Array<TreasureItemVo> = TreasureModel.getInstance().getList();
            var nodeList = RedPointManager.getInstance().getNodeByID(18).children;
            for (var i = 0; i < this._itemDataList.length; i++) {
                nodeList[i].data = a[i];
                a[i].node = nodeList[i];
                this._itemDataList[i].data = a[i];
            }
            this.refreshDraw();
            var selid = this.getSelectIdByTid(this._lastTid);
            this.scrollIdx(selid);
            this.setSelectIndex(selid);
            
            this.setEffectUrl("ui_qh", 4, 4);
            // this.showExpEff(this.getIdxY(selid));
        }

        public effectComplte(): void {
            console.log("加载好了，回调");
            this.playEffect(0, -52, this.getIdxY(this.getSelectIdByTid(this._lastTid))-50, 1.5, 1.5);
        }



        public getData($data: Array<TreasureItemVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            var nodeList = RedPointManager.getInstance().getNodeByID(18).children;
            for (var i: number = 0; i < $data.length; i++) {
                nodeList[i].data = $data[i];
                $data[i].node = nodeList[i];
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        private _type: number
        private _start: number
        private _end: number
        private _itemDataList: Array<SListItemData>
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._itemDataList = this.getData(TreasureModel.getInstance().getList());
            this.refreshData(this._itemDataList);
            var selid = this.getSelectIdByTid(this._lastTid);
            this.scrollIdx(selid);
            // this.setSelectIndexCopy(this.getCurrentSelectIndex());
            this.setSelectIndex(selid);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class TreasureListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private UnlockBg: UICompenent;
        private Sicon: UICompenent;
        private Sname: UICompenent;
        private Sinfo: UICompenent;
        private Sselect: UICompenent;
        private Redpoint: UICompenent;

        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var cententRender: UIRenderComponent = this._customRenderAry[0];
            var topRender: UIRenderComponent = this._customRenderAry[1];

            this.UnlockBg = this.creatGrid9SUI(cententRender, this.parentTarget.baseAtlas, "UnlockBg", 0, 0, 234, 80, 15, 15);
            $container.addChild(this.UnlockBg);

            this.Sicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sicon", 9, 6, 68, 68);
            $container.addChild(this.Sicon);

            this.Sname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sname", 87, 19, 98, 22);
            $container.addChild(this.Sname);

            this.Sinfo = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sinfo", 87, 45, 140, 18);
            $container.addChild(this.Sinfo);

            this.Redpoint = this.creatSUI(topRender, this.parentTarget.baseAtlas, "Redpoint", 214, 3, 17, 16);
            this.Redpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Redpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);

            this.Sselect = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Sselect", 0, 0, 234, 80, 15, 15);
            $container.addChild(this.Sselect);
            this.Sselect.addEventListener(InteractiveEvent.Up, this.equClick, this);
        }


        private drawIcon(): void {
            var $vo: TreasureItemVo = this.itdata.data
            var $url: string = "ui/load/treasure/" + $vo.tabvo.icon
            IconManager.getInstance().getIcon($url + "_c.png",
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Sicon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    // UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 64, 64))

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyrender();
            }
            if (val) {
                var $evt = new TreasureUiEvent(TreasureUiEvent.SELECT_ITEM_EVENT);
                $evt.data = this.itdata;
                ModuleEventManager.dispatchEvent($evt);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: TreasureItemVo = this.itdata.data
                if ($vo.node) {
                    $vo.node.bindUI(this.Redpoint);
                }

                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_select);
                } else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sselect.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }

                this.drawIcon();
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.name, 16, TextAlign.LEFT, getColorQua($vo.tabvo.quality));
                if ($vo.state == 1) {
                    UiDraw.clearUI(this.UnlockBg);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sinfo.skinName, "+" + $vo.activityvo.lev, 14, TextAlign.LEFT, getColorQua($vo.tabvo.quality));
                } else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sinfo.skinName, "收集" + $vo.tabvo.avtivedata[0][1] + "个碎片激活", 14, TextAlign.LEFT, ColorType.Brown6a4936);
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                }



                // UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2tembg.skinName, UIData.publicUi, PuiData.ITEMBG);

            }

        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        public refreshDraw() {
            this.render(this.itdata);
        }

        private equClick(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        }

        private setnull(): void {
            this.uiAtlas.clearCtxTextureBySkilname(this.Sicon.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.Sname.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.Sinfo.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.Sselect.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.UnlockBg.skinName)
            this.Redpoint.preHide();
        }
    }


}