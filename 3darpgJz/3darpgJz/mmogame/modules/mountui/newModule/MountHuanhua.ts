module mountui {

    export class MountHuanhua extends UIVirtualContainer {
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

        private attrary: Array<UICompenent>
        private actionary: Array<UICompenent>
        private cnew_btn1: UICompenent
        private h_force: UICompenent
        private h_listadjust: UICompenent
        private h_btntxt: FrameCompenent
        private _btnRedPoint: RedPointCompenent;
        private initView(): void {
            var renderLevel = this._baseRender;
            this.attrary = new Array
            for (var i = 0; i < 7; i++) {
                this.attrary.push(this.addChild(this._topRender.getComponent("h_attr" + i)));
            }

            this.h_btntxt = <FrameCompenent>this.addChild(this._topRender.getComponent("h_btntxt"));

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this._publicRender.applyObjData();

            this.actionary = new Array
            this.actionary.push(renderLevel.getComponent("h_item"));
            this.actionary.push(renderLevel.getComponent("h_itemname"));
            this.actionary.push(renderLevel.getComponent("h_itemnum1"));

            this.addUIList(["h_line2", "h_titlebg"], renderLevel);
            this.addUIList(["h_forcetxt", "h_title"], this._topRender);

            this.h_force = this.addChild(this._topRender.getComponent("h_force"));
            this.h_listadjust = this.addChild(renderLevel.getComponent("h_listadjust"));

            this._btnRedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        }

        public resize(): void {
            super.resize();
            if (this.huanhuaList) {
                this.huanhuaList.left = this.h_listadjust.parent.x / UIData.Scale + this.h_listadjust.x
                this.huanhuaList.top = this.h_listadjust.parent.y / UIData.Scale + this.h_listadjust.y
            }
        }

        public huanhuaList: HuanhuaList;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.huanhuaList) {
                this.huanhuaList = new HuanhuaList();
                this.huanhuaList.init(this._baseRender.uiAtlas);
            }
            this.huanhuaList.show();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.huanhuaList) {
                this.huanhuaList.hide();
            }
        }

        private _data: HuanhuaVo
        public resetData($data: HuanhuaVo): void {
            this._data = $data;
            this.drawResItem();
            this.showAttr();
            var force = getForceByAtt($data.tab.prosKeys, $data.tab.prosValues);
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.h_force.skinName, Snum(force), ArtFont.num56)
            var srt: number;
            if (this._data.state == 1) {
                srt = 0
            } else if (this._data.state == 0) {
                srt = 1
            } else {
                srt = 2
            }
            console.log("---srt---", srt);
            this.h_btntxt.goToAndStop(srt);

            (<NewMountUiPanel>this.parent).setHuanHuaAvatar($data.tab.mountID, $data.tab.name);

            if ($data.node.show) {
                this._btnRedPoint.preShow();
            } else {
                this._btnRedPoint.preHide();
            }
        }

        private _canbuy: boolean;
        private drawResItem() {
            this.setUiListVisibleByItem(this.actionary, this._data.state == 1);
            if (this._data.state == 1) {
                var itemary: Array<Array<number>>;
                if (this._data.tab.costItem && this._data.tab.costItem.length > 0) {
                    itemary = this._data.tab.costItem;
                }
                if (this._data.tab.costResource && this._data.tab.costResource.length > 0) {
                    itemary = this._data.tab.costResource;
                }
                IconManager.getInstance().drawItemIcon60(this.actionary[0], itemary[0][0]);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.actionary[1].skinName, GameData.getPropName(itemary[0][0]), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this._canbuy = UiDraw.drawResHasNumAndAllNum(this.actionary[2], itemary[0]);
            }
        }

        public showAttr(): void {
            //绘制当前属性
            for (var i = 0; i < this.attrary.length; i++) {
                if (this._data.tab.prosKeys.length - 1 < i) {
                    this.setUiListVisibleByItem([this.attrary[i]], false);
                } else {
                    UiDraw.drawAttVal(this.attrary[i], this._data.tab.prosKeys[i], this._data.tab.prosValues[i]);
                }
            }
        }

        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.cnew_btn1:
                    if (this._data.state == 1) {
                        //未激活
                        var flag: boolean;
                        var itemary: Array<Array<number>>;
                        if (this._data.tab.costItem && this._data.tab.costItem.length > 0) {
                            itemary = this._data.tab.costItem;
                            flag = false;
                        }
                        if (this._data.tab.costResource && this._data.tab.costResource.length > 0) {
                            itemary = this._data.tab.costResource;
                            flag = true;
                        }
                        //flag:true 为消耗资源
                        if (flag) {
                            costRes(itemary[0], () => {
                                NetManager.getInstance().protocolos.illusion_mount_active(this._data.tab.id);
                            }, () => {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            });
                        } else {
                            //flag:true 为消耗道具
                            if (this._canbuy) {
                                NetManager.getInstance().protocolos.illusion_mount_active(this._data.tab.id);
                            } else {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);

                                var itemary: Array<Array<number>>;
                                if (this._data.tab.costItem && this._data.tab.costItem.length > 0) {
                                    itemary = this._data.tab.costItem;
                                }
                                if (this._data.tab.costResource && this._data.tab.costResource.length > 0) {
                                    itemary = this._data.tab.costResource;
                                }

                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = itemary[0][0]
                                ModuleEventManager.dispatchEvent($aaa);
                            }
                        }
                    } else {
                        //已激活
                        NetManager.getInstance().protocolos.illusion_mount(this._data.tab.id);
                    }

                    break;
                default:
                    break;
            }
        }
    }


    export class HuanhuaList extends TransverseSList {

        public constructor() {
            super();
            this.left = 147;
            this.top = 425;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var ary = new Array<SListItemData>();
            this.setData(ary, HuanhuaListRender, 365, 95, 81, 0, 4, 1024, 128, 8, 1);
        }

        public refreshDataByNewData(): void {
            // var $sListItemData: Array<SListItemData> = this.getData(NewMountModel.getInstance().getHuanhuaVO());
            // this._ItemDataList = this.getData(NewMountModel.getInstance().getHuanhuaVO());
            var nodeList = RedPointManager.getInstance().getNodeByID(35).children;
            var $data: Array<HuanhuaVo> = NewMountModel.getInstance().getHuanhuaVO();
            for (var i = 0; i < this._ItemDataList.length; i++) {
                nodeList[i].data = $data[i];
                $data[i].node = nodeList[i];
                this._ItemDataList[i].data = $data[i];
            }
            this.refreshDraw();
            this.scrollAndselect();
        }



        public getData($data: Array<HuanhuaVo>): Array<SListItemData> {
            var nodeList = RedPointManager.getInstance().getNodeByID(35).children;
            var ary: Array<SListItemData> = new Array;
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

        public setSelect($item: SListItem): void {
            super.setSelect($item);
            this._lastTid = $item.itdata.data.id;
        }

        private _lastTid: number
        private getSelectIdByTid($tid: number): number {
            console.log("---表id---", $tid);
            for (var i = 0; i < this._ItemDataList.length; i++) {
                if (this._ItemDataList[i].data.id == $tid) {
                    return this._ItemDataList[i].id;
                }
            }
            console.log("--没有符合的项", $tid);
            return 0;
        }


        private _type: number
        private _start: number
        private _end: number
        private _ItemDataList: Array<SListItemData>;
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._ItemDataList = this.getData(NewMountModel.getInstance().getHuanhuaVO());
            // this.refreshDraw();
            // this.refreshDataByNewData();
            this.refreshData(this._ItemDataList);
            this._lastTid = NewMountModel.getInstance().getHuanhuaIndex();
            this.scrollAndselect();
        }

        private scrollAndselect() {
            var selid = this.getSelectIdByTid(this._lastTid);
            this.scrollIdx(selid);
            this.setSelectIndex(selid);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class HuanhuaListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Spic: UICompenent;
        private ScurHuanhua: UICompenent;
        private Sredpoint: UICompenent;

        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Spic = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Spic", 0, 0, 74, 74);
            $container.addChild(this.Spic);
            this.Spic.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.ScurHuanhua = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ScurHuanhua", 2, 70, 70, 24);
            $container.addChild(this.ScurHuanhua);

            this.Sredpoint = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Sredpoint", 57, 3, 17, 16);
            this.Sredpoint.preParent = $container;
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Sredpoint.skinName, UIData.publicUi, PuiData.A_RED_POINT);
        }

        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyrender();
            }
            if (val) {
                var $evt = new mountui.MountUiEvent(mountui.MountUiEvent.HUANHUA_SELECT_ITEM_EVENT);
                $evt.data = this.itdata;
                ModuleEventManager.dispatchEvent($evt);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: HuanhuaVo = this.itdata.data

                // this.drawIcon();
                // if (this.selected) {
                //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ScurHuanhua.skinName, UIData.publicUi, PuiData.A_HIGHT_C);
                // } else {
                //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ScurHuanhua.skinName, UIData.publicUi, PuiData.Slist_nselect);
                // }

                IconManager.getInstance().drawMountIcon(this.Spic, $vo.tab.mountID, $vo.state == 1, this.selected);

                if ($vo.state == 2) {
                    this.drawCurHuanhua();
                } else {
                    UiDraw.clearUI(this.ScurHuanhua);
                }


                // if ($vo.state == 3) {
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.limLev + "级解锁", 16, TextAlign.RIGHT, ColorType.Brown7a2f21);
                //     UiDraw.uiAtlasDrawImg(this.uiAtlas, this.UnlockBg.skinName, UIData.publicUi, PuiData.MASK);
                //     LabelTextFont.clearLabel(this.uiAtlas, this.Slev.skinName);
                //     LabelTextFont.clearLabel(this.uiAtlas, this.Spass.skinName);
                // } else {
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Sname.skinName, $vo.tabvo.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                //     LabelTextFont.clearLabel(this.uiAtlas, this.UnlockBg.skinName);
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Slev.skinName, $vo.tabvo.limLev + "级", 14, TextAlign.LEFT, ColorType.Brown7a2f21);
                //     var passstr: string = "已通关";
                //     var passcolor: string = ColorType.Green2ca937;
                //     if ($vo.state == 1) {
                //         passstr = "未通关"
                //         passcolor = ColorType.colorcd2000
                //     }
                //     LabelTextFont.writeSingleLabel(this.uiAtlas, this.Spass.skinName, passstr, 14, TextAlign.RIGHT, passcolor);
                // }

                if ($vo.node) {
                    $vo.node.bindUI(this.Sredpoint);
                }

            }

        }

        private drawCurHuanhua() {
            var $uiRec: UIRectangle = this.uiAtlas.getRec(this.ScurHuanhua.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);

            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("CurHuanhua")
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight, 0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);

            this.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
        }

        private drawIcon() {
            IconManager.getInstance().getIcon("ui/skillicon/zuoqi.png",
                ($img: any) => {
                    var $uiRec: UIRectangle = this.uiAtlas.getRec(this.Spic.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                    //绘制坐骑头像的底色
                    UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_BASE, new Rectangle(1, 1, 48, 48), UIData.publicUi);
                    //绘制坐骑头像
                    ctx.drawImage($img, 0, 0, 65, 65, 3, 3, 44, 44);
                    // //选中高亮绘制
                    // if (this.hasLight) {
                    //     UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_C, new Rectangle(14, 17, 75, 75), UIData.publicUi);
                    // }
                    // //是否可激活红点绘制
                    // if (this.canctxredpoint($vo)) {
                    //     UiDraw.cxtDrawImg(ctx, PuiData.A_RED_POINT, new Rectangle(67, 22, 17, 16), UIData.publicUi);
                    // }

                    // // LabelTextFont.writeText(ctx, 0, 90, $vo.name, 16, "#FFD700", true);
                    // //绘制名字
                    // LabelTextFont.writeSingleLabelToCtx(ctx, "[d5e7ff]" + $vo.name, 16, 102 / 2, 80)

                    this.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
                });
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
            UiDraw.clearUI(this.Spic);
            UiDraw.clearUI(this.ScurHuanhua);
            this.Sredpoint.preHide();
        }
    }
}