module role {

    export class DesignationPanel extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;

            if (this.gdesignationList) {
                this.gdesignationList.dispose();
                this.gdesignationList = null;
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

        public gdesignationList: GDesignationList;
        private c_listindex: UICompenent
        private c_titleforce: UICompenent
        private c_tab0: SelectButton
        private c_tab1: SelectButton
        private c_force: UICompenent
        private c_titlename: UICompenent
        private c_timetxt: UICompenent
        private AttrAry: Array<UICompenent>
        private cnew_btn1: UICompenent
        private BtnAry: Array<UICompenent>
        private CostAry: Array<UICompenent>
        private _btnRedPoint: RedPointCompenent;

        private _uiAry:Array<UICompenent>

        private initView(): void {
            var renderLevel = this._baseRender;

            this._uiAry = new Array

            this.c_listindex = this.addChild(renderLevel.getComponent("c_listindex"));

            var bg = this.addChild(this._publicRender.getComponent("cnew_coffeeBg"));
            this.setSizeForPanelUiCopy(bg, "c_coffeeBg", renderLevel);

            this.addChild(this._topRender.getComponent("c_forcebg"))
            this.addChild(this._baseRender.getComponent("c_kuang"));

            this._uiAry.push(this._baseRender.getComponent("c_txtbg0"));
            this._uiAry.push(this._baseRender.getComponent("c_txtbg1"));
            this._uiAry.push(this._baseRender.getComponent("c_line"));
            this._uiAry.push(this._topRender.getComponent("c_txt"));
            this._uiAry.push(this._topRender.getComponent("c_forcebg1"));
            // this.addUIList(["c_kuang", "c_txtbg0", "c_txtbg1", "c_line"], this._baseRender);
            // this.addUIList(["c_txt", "c_forcebg", "c_forcebg1"], this._topRender);

            this.c_titleforce = this.addChild(this._topRender.getComponent("c_titleforce"));


            this.c_tab0 = <SelectButton>this.addEvntBut("c_tab0", this._topRender);
            this.c_tab1 = <SelectButton>this.addEvntBut("c_tab1", this._topRender);

            //---------右侧面板
            this.c_titlename = this.addChild(this._topRender.getComponent("c_titlename"));
            this.c_force = this.addChild(this._topRender.getComponent("c_force"));
            this.c_timetxt = this.addChild(this._topRender.getComponent("c_timetxt"));

            this._uiAry.push(this.c_titlename);
            this._uiAry.push(this.c_force);
            this._uiAry.push(this.c_timetxt);


            this.AttrAry = new Array
            for (var i = 0; i < 6; i++) {
                this.AttrAry.push(this.addChild(this._topRender.getComponent("c_attr" + i)));
            }

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);

            this.BtnAry = new Array
            this.BtnAry.push(this.cnew_btn1);
            this.BtnAry.push(this._topRender.getComponent("c_btntxt"));

            this.CostAry = new Array
            this.CostAry.push(this._topRender.getComponent("c_propicon"));
            this.CostAry.push(this._topRender.getComponent("c_propnum"));
            this.CostAry.push(this._topRender.getComponent("c_info"));

            this._redPointRender.getRedPointUI(this, 11, new Vector2D(this.c_tab0.x + this.c_tab0.width - 5, this.c_tab0.y));
            this._redPointRender.getRedPointUI(this, 114, new Vector2D(this.c_tab1.x + this.c_tab1.width - 5, this.c_tab1.y));

            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
            this._publicRender.applyObjData();
        }


        private selecttype($value: number): void {
            this.setUiListVisibleByItem(this._uiAry,false);
            this.setUiListVisibleByItem(this.AttrAry,false);
            this.setUiListVisibleByItem(this.BtnAry,false);
            this.setUiListVisibleByItem(this.CostAry,false);
            if (!this.gdesignationList) {
                this.gdesignationList = new GDesignationList();
                this.gdesignationList.init(this._baseRender.uiAtlas);
            }
            if ($value == 0) {
                this.c_tab0.selected = true;
                this.c_tab1.selected = false;
                this.gdesignationList.show(TabKey.TabAction);
                // this.rechargePanel.hide();
            } else if ($value == 1) {
                this.c_tab1.selected = true;
                this.c_tab0.selected = false;
                this.gdesignationList.show(TabKey.Tabdesignation);
                // this.rechargePanel.hide();
            }

            this.resize();
        }

        public resize(): void {
            super.resize();
            if (this.gdesignationList) {
                this.gdesignationList.left = this.c_listindex.parent.x / UIData.Scale + this.c_listindex.x
                this.gdesignationList.top = this.c_listindex.parent.y / UIData.Scale + this.c_listindex.y
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.selecttype(0);
            this.setAllForce();
            this.resize();
        }

        public setAllForce() {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.c_titleforce.skinName, Snum(GuidData.player.getTitleForce()), ArtFont.num57);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.gdesignationList) {
                this.gdesignationList.hide();
            }
        }

        private _canbuy: boolean;
        private _vo: TitleData
        public resetData($data: TitleData) {
            this.setUiListVisibleByItem(this._uiAry,true);
            this.setUiListVisibleByItem(this.AttrAry,true);
            // this.setUiListVisibleByItem(this.BtnAry,false);
            // this.setUiListVisibleByItem(this.CostAry,false);
            this._vo = $data;
            var attr_id: Array<number> = new Array
            var attr_val: Array<number> = new Array
            for (var i = 0; i < $data.data.prop.length; i++) {
                attr_id.push($data.data.prop[i][0]);
                attr_val.push($data.data.prop[i][1]);
            }

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_titlename.skinName, $data.data.name, 16, TextAlign.CENTER, getColorQua($data.data.qua));
            ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.c_force.skinName, Snum(getForceByAtt(attr_id, attr_val)), ArtFont.num56);

            this.drawAttr($data.data.prop);

            this.drawTime($data.data.limtime);

            this.setUiListVisibleByItem(this.BtnAry, !($data.state == 1 && $data.data.unlock_type == 1));
            this.setUiListVisibleByItem(this.CostAry, $data.state == 1);
            if ($data.state == 1) {
                (<FrameCompenent>this.BtnAry[1]).goToAndStop(2);
            } else if ($data.state == 4) {
                (<FrameCompenent>this.BtnAry[1]).goToAndStop(0);
            } else {
                (<FrameCompenent>this.BtnAry[1]).goToAndStop(1);
            }

            if ($data.data.unlock_type == 1) {
                UiDraw.clearUI(this.CostAry[0]);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.CostAry[1].skinName, "<激活条件>", 16, TextAlign.CENTER, ColorType.color9a683f);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.CostAry[2].skinName, $data.data.getinfo, 16, TextAlign.CENTER, ColorType.color2daa35);
            } else {
                UiDraw.clearUI(this.CostAry[2]);
                IconManager.getInstance().drawItemIcon40(this.CostAry[0], $data.data.unlock_cost[0][0]);
                this._canbuy = UiDraw.drawResHasNumAndAllNum(this.CostAry[1], $data.data.unlock_cost[0]);
            }
            //红点逻辑

            if ($data.state == 1 && $data.node.show) {
                this._btnRedPoint.preShow();
            } else {
                this._btnRedPoint.preHide();
            }
        }

        public drawAttr($attrary: Array<Array<number>>) {
            for (var i = 0; i < this.AttrAry.length; i++) {
                if ($attrary.length - 1 < i) {
                    UiDraw.clearUI(this.AttrAry[i]);
                } else {
                    UiDraw.drawAttVal(this.AttrAry[i], $attrary[i][0], $attrary[i][1], TextAlign.CENTER);
                }
            }
        }

        private drawTime($minutes: number) {
            if ($minutes == 0) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_timetxt.skinName, "有效时间：无期限", 16, TextAlign.CENTER, ColorType.colorce0a00);
            } else {
                this.drawlimtime();
            }
        }

        private drawlimtime(): void {
            var str = "";
            if (this._vo.state == 1) {
                //未获得时，显示这个称号的时效
                var a = this.getTimeAry(this._vo.data.limtime)
                str = "有效时间：" + a[0] + "天" + a[1] + "小时" + a[2] + "分钟";
            } else {
                //已获得时，显示这个称号剩余时间
                var $ts: number = GameInstance.getServerNow();
                var $sever: Date = new Date($ts * 1000);
                var time = Math.floor((this._vo.time - Math.floor($sever.getTime() / 1000)) / 60);

                var b = this.getTimeAry(time);
                str = "剩余时间：" + b[0] + "天" + b[1] + "小时" + b[2] + "分钟";
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_timetxt.skinName, str, 14, TextAlign.CENTER, ColorType.colorce0a00);
        }

        private getTimeAry($min: number): Array<number> {
            var _date: number;
            var _hour: number;
            var _min: number;
            var _ary: Array<number> = new Array
            var $hour: number = $min / 60;
            if ($hour >= 24) {
                //大于一天
                _date = Math.floor($hour / 24) + 1;
                // $hour = $hour - (_date * 24);

                // _hour = Math.floor($hour);
                // $hour = $hour - _hour;

                // _min = Math.floor($hour * 60);
                _hour = 0
                _min = 0
            } else if ($hour < 1) {
                //不足1小时
                _date = 0
                _hour = 0
                _min = $min + 1;
            } else {
                //显示小时
                _date = 0

                _hour = Math.floor($hour + 1);
                // $hour = $hour - _hour;

                // _min = Math.floor($hour * 60);
                _min = 0
            }

            _ary.push(_date);
            _ary.push(_hour);
            _ary.push(_min);
            return _ary;
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_tab0:
                    this.selecttype(0);
                    break;
                case this.c_tab1:
                    this.selecttype(1);
                    break;
                case this.cnew_btn1:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._vo) {
                        if (this._vo.state == 3 || this._vo.state == 2) {
                            NetManager.getInstance().protocolos.set_title(this._vo.data.id);
                        } else if (this._vo.state == 4) {
                            NetManager.getInstance().protocolos.set_title(0);
                        } else if (this._vo.state == 1) {
                            if (this._canbuy) {
                                NetManager.getInstance().protocolos.unlock_title(this._vo.data.id);
                            } else {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = this._vo.data.unlock_cost[0][0]
                                ModuleEventManager.dispatchEvent($aaa);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }


    /**
     * DesignationList
     */
    export class GDesignationList extends SList {

        public constructor() {
            super();
            this.left = 222;
            this.top = 83;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, GDesignationListRender, 400, 422, 200, 85, 5, 512, 1024, 2, 7);
        }

        /**
         * refreshData
         */
        public type: number
        private _aryList: Array<TitleData>

        public selectDataToIndex(): void {
            this.refreshDataByNewData();
            this.setSelectIndex(this.getCurrentSelectIndex());
        }

        public refreshDataByNewData(): void {
            //通过type，获得所对应的列表
            this._aryList = RoleModel.getInstance().getListByTab(this.type);
            var $sListItemData = this.getData(this._aryList);
            this.refreshData($sListItemData);
        }

        public getData($ary: Array<TitleData>): Array<SListItemData> {
            var a: number = this.type == TabKey.TabAction ? 12 : 115
            var nodeList = RedPointManager.getInstance().getNodeByID(a).children;
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                // nodeList[i].data = $ary[i];
                $ary[i].node = nodeList[i];
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show($value: number): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            if (this.type == $value) {
                return;
            }
            this.type = $value;
            this.selectDataToIndex();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class GDesignationListRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private Tab: UICompenent;
        private RedPoint: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Tab = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Tab", 0, 1, 193, 82);
            $container.addChild(this.Tab);
            this.Tab.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.RedPoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RedPoint", 176, 3, 17, 16);
            this.RedPoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RedPoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);

        }

        public set selected(val: boolean) {
            this._selected = val;

            if (val) {
                var bb = new RoleUiEvent(RoleUiEvent.SHOWVIEW_Designation_EVENT);
                bb.data = this.itdata;
                ModuleEventManager.dispatchEvent(bb);

                var vo: TitleData = <TitleData>this.itdata.data
                if (vo.state == 2) {
                    NetManager.getInstance().protocolos.init_title(vo.data.id);
                }
            }
            this.applyrender();
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawDesignation(): void {
            var vo: TitleData = <TitleData>this.itdata.data
            LoadManager.getInstance().load(Scene_data.fileRoot + getUItittleUrl(String(vo.data.id)), LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Tab.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.TITLEBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);

                    var ratio = Math.min(($rec.pixelWitdh / $img.width), ($rec.pixelHeight / $img.height));
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, ($rec.pixelWitdh / 2) - ($img.width * ratio / 2), ($rec.pixelHeight / 2) - ($img.height * ratio / 2), $img.width * ratio, $img.height * ratio);

                    // LabelTextFont.writeSingleLabelToCtx(ctx, vo.tabdata.name, 16, $rec.pixelWitdh / 2, $rec.pixelHeight / 2 - 8, TextAlign.CENTER, DesignationModel.getInstance().getColorQua(vo.tabdata.qua));
                    if (vo.state == 1) {
                        //遮罩
                        UiDraw.cxtDrawImg(ctx, PuiData.MASK, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                    } else if (vo.state == 2) {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(172, 5, 17, 16), UIData.publicUi);
                    } else if (vo.state == 4) {
                        var baseRec: any = this.parentTarget.baseAtlas.getRec("outfit");
                        ctx.drawImage(this.parentTarget.baseAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, baseRec.pixelWitdh, baseRec.pixelHeight);
                    }

                    if (this.selected) {
                        UiDraw.cxtDrawImg(ctx, PuiData.TITLEHIGHT, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                    }

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                if (this.itdata.data.node) {
                    this.itdata.data.node.bindUI(this.RedPoint);
                }
                this.drawDesignation();
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

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Tab);
            this.RedPoint.preHide();
        }
    }

}