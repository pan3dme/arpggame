module mountui {

    export class MountUpLev extends UIVirtualContainer {
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redRender: RedPointRender;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redRender.dispose();
            this._redRender = null;
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
            this._redRender = new RedPointRender;
            this.addRender(this._redRender);
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private attrary: Array<UICompenent>
        private nextattrary: Array<UICompenent>
        private actionary: Array<UICompenent>
        private noactionary: Array<UICompenent>
        private curlevary: Array<UICompenent>
        private nextlevary: Array<UICompenent>
        private cnew_btn1: UICompenent
        private btnRedPoint: RedPointCompenent
        private initView(): void {
            var renderLevel = this._baseRender;
            this.attrary = new Array;
            this.nextattrary = new Array;
            for (var i = 0; i < 7; i++) {
                this.attrary.push(this.addChild(renderLevel.getComponent("e_attr" + i)));
                this.nextattrary.push(renderLevel.getComponent("e_nextattr" + i));
            }

            this.curlevary = new Array
            this.nextlevary = new Array
            this.curlevary.push(this.addChild(renderLevel.getComponent("e_levtxt0")));
            this.curlevary.push(this.addChild(renderLevel.getComponent("e_curlev")));
            this.nextlevary.push(renderLevel.getComponent("e_levtxt1"));
            this.nextlevary.push(renderLevel.getComponent("e_nextlev"));
            this.nextlevary.push(renderLevel.getComponent("a_arrow"));


            this.addUIList(["e_titlebg", "e_line2"], this._baseRender);
            this.addUIList(["e_attrtitle"], this._topRender);

            this.cnew_btn1 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.cnew_btn1, "btnBg", renderLevel);
            this._publicRender.applyObjData();

            this.actionary = new Array
            this.actionary.push(renderLevel.getComponent("e_itemname"));
            this.actionary.push(renderLevel.getComponent("e_item"));
            this.actionary.push(this._topRender.getComponent("e_btntxt"));
            this.actionary.push(this.cnew_btn1);

            this.noactionary = new Array
            this.noactionary.push(this._topRender.getComponent("e_over"));

            this.btnRedPoint = this._redRender.getRedPointUI(this, 31, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        }

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            (<NewMountUiPanel>this.parent).setAvatar();
            this.resetData();
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public resetData() {
            this._vo = NewMountModel.getInstance().getLevAttribute();
            this.showAttr();
            this.drawLev();
            this.drawResItem();
        }

        public drawLev() {
            this.setUiListVisibleByItem(this.nextlevary, this._vo.state != 2);
            this.curlevary[0].x = this._vo.state == 2 ? 679 : 637
            this.curlevary[1].x = this._vo.state == 2 ? 725 : 672
            if (this._vo.state != 2) {
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.nextlevary[1].skinName, String(this._vo.nexttab.id), 16, TextAlign.RIGHT, ColorType.color9a683f);
            }
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.curlevary[1].skinName, String(this._vo.curtab.id), 16, TextAlign.LEFT, ColorType.color9a683f);
        }

        private _vo: MountLevAttribute
        public showAttr(): void {
            this.setUiListVisibleByItem(this.nextattrary, this._vo.state != 2);
            //绘制当前属性
            for (var i = 0; i < this.attrary.length; i++) {
                if (this._vo.curtab.prosKeys.length - 1 < i) {
                    this.setUiListVisibleByItem([this.attrary[i]], false);
                } else {
                    UiDraw.drawAttVal(this.attrary[i], this._vo.curtab.prosKeys[i], this._vo.curtab.prosValues[i]);
                    this.attrary[i].x = this._vo.state == 2 ? 679 : 637
                }
            }
            //绘制下一级属性
            console.log("下一阶数据-----", this._vo);
            for (var j = 0; j < this.nextattrary.length; j++) {
                if (this._vo.nexttab == null) {
                    break;
                }
                if (this._vo.nexttab.prosKeys.length - 1 < j) {
                    this.setUiListVisibleByItem([this.nextattrary[j]], false);
                } else {
                    UiDraw.drawAddValRight(this.nextattrary[j], this._vo.nexttab.prosValues[j]);
                }
            }
        }

        private _canbuy: boolean;
        public drawResItem() {
            this.setUiListVisibleByItem(this.noactionary, this._vo.state == 2);
            this.setUiListVisibleByItem(this.actionary, this._vo.state != 2);
            if (this._vo.state != 2) {
                IconManager.getInstance().drawItemIcon60(this.actionary[1], this._vo.curtab.cost[0][0]);
                this._canbuy = UiDraw.drawResHasNumAndAllNum(this.actionary[0], this._vo.curtab.cost[0]);
            }
        }

        // private drawCost($ui: UICompenent, $CostAry: Array<number>): boolean {
        //     var costnum: string;
        //     var flag: boolean;
        //     var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($CostAry[0])
        //     if ($vo.money_type && $vo.money_type > 0) {
        //         //资源
        //         if (GuidData.player.getResType($vo.money_type - 1) >= $CostAry[1]) {
        //             costnum = ColorType.Green98ec2c + Snum($CostAry[1]);
        //             flag = true;
        //         } else {
        //             flag = false;
        //             costnum = ColorType.Redce0a00 + Snum($CostAry[1]);
        //         }
        //     } else {
        //         //材料
        //         if (GuidData.bag.hasItem($CostAry[0], $CostAry[1])) {
        //             costnum = ColorType.Green98ec2c + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
        //             flag = true;
        //         } else {
        //             flag = false;
        //             costnum = ColorType.Redce0a00 + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
        //         }
        //     }
        //     LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $ui.skinName, costnum, 14, TextAlign.CENTER);
        //     return flag;
        // }
        private _canclick: boolean = true;
        public butClik(evt: InteractiveEvent): void {
            if (this._canclick) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                this._canclick = false;
                TimeUtil.addTimeOut(btnClickTime, () => {
                    this._canclick = true;
                });
                switch (evt.target) {
                    case this.cnew_btn1:
                        // if (GuidData.player.getResType(this._vo.curtab.cost[0][0]) >= this._vo.curtab.cost[0][1])){
                        if (this._vo.state == 1) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可超过人物等级", 99);
                            return;
                        }
                        if (this._canbuy) {
                            NetManager.getInstance().protocolos.raise_mount_level_base();
                        } else {
                            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                            $aaa.data = this._vo.curtab.cost[0][0]
                            ModuleEventManager.dispatchEvent($aaa);
                        }
                        // }
                        break;
                    default:
                        break;
                }
            } else {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
            }
        }
    }
}