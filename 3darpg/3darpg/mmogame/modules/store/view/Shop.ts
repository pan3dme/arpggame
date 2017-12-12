module store {

    export class Shop extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            if (this.shoplist) {
                this.shoplist.dispose();
                this.shoplist = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            // this._bgRender = new UIRenderComponent;
            // this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            // this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;

            this.initView();

        }

        private _b_btn_selectnum: UICompenent
        private _b_minus: UICompenent
        private _b_add_1: UICompenent
        private _b_add_2: UICompenent
        private _b_buy: UICompenent
        private _num: UICompenent
        private _cost: UICompenent
        private _have: UICompenent
        private _name: UICompenent
        private _info: UICompenent
        private slistindex1: UICompenent

        private _aryUI1: Array<UICompenent>;
        private _aryUI2: Array<UICompenent>;
        private initView(): void {
            var renderLevel: UIRenderComponent = this._topRender;

            this.addUIList(["a_22", "a_21", "a_20", "b_rightline1"], this._baseRender);

            this._b_minus = this.addEvntButUp("b_minus", renderLevel);
            this._b_add_1 = this.addEvntButUp("b_add_1", renderLevel);
            this._b_add_2 = this.addEvntButUp("b_add_2", renderLevel);
            this._b_buy = this.addEvntButUp("b_buy", renderLevel);
            this._b_btn_selectnum = this.addEvntButUp("a_18_1", this._baseRender);


            this.slistindex1 = this.addChild(<UICompenent>renderLevel.getComponent("slistindex1"));
            this._num = this.addChild(<UICompenent>renderLevel.getComponent("a_29"));
            this._cost = this.addChild(<UICompenent>this._baseRender.getComponent("a_30"));
            this._have = this.addChild(<UICompenent>this._baseRender.getComponent("a_31"));
            this._name = this.addChild(<UICompenent>renderLevel.getComponent("a_26"));
            this._info = this.addChild(<UICompenent>renderLevel.getComponent("a_27"));


            this._aryUI1 = new Array;   //限购UI
            this._aryUI2 = new Array;   //打折UI

            this._aryUI1.push(<FrameCompenent>renderLevel.getComponent("a_23"));
            this._aryUI1.push(<UICompenent>renderLevel.getComponent("a_25"));
            this._aryUI1.push(<UICompenent>renderLevel.getComponent("a_28"));

            this._aryUI2.push(<UICompenent>renderLevel.getComponent("a_19"));
            this._aryUI2.push(<UICompenent>renderLevel.getComponent("a_16"));
            this._aryUI2.push(<UICompenent>renderLevel.getComponent("a_24"));
            this._aryUI2.push(<UICompenent>renderLevel.getComponent("a_16_1"));

        }

        private _vo: StoreItemVo;
        public resetData($data: SListItemData): void {
            var $vo: StoreItemVo = $data.data
            this._vo = $vo;

            this.totalnum = 1;
            var itemid: number;
            //类型1是家族商店。特殊
            if ($vo.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById($vo.data1.id);
                itemid = $tabelvo.itemId;
                if (($vo.data1.num - $vo.data2.num) == 0) {
                    this.totalnum = 0
                }
            } else {
                itemid = $vo.data.itemId
                if ($vo.getNum() == 0) {
                    this.totalnum = 0
                }
            }
            var $proptabvo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(itemid);

            this.resetlimNum();

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._name.skinName, $proptabvo.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeTextAutoVerticalCenter(this._topRender.uiAtlas, this._info.skinName, $proptabvo.info, 16, ColorType.color9a683f, 170,"", true);
            this.setNum(this.totalnum);
            this.setOwnMoney();
        }

        /**
         * 数据变化
         */
        public resetlimNum(): void {
            if (this._vo.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(this._vo.data1.id);
                if ($tabelvo.discount_flag < 100) {
                    //折扣物品
                    this.setUiListVisibleByItem(this._aryUI2, true);
                    //原价
                    this.drawDiscountPrice("A_16", $tabelvo.costResource[0][1], $tabelvo.costResource[0][0], false);
                    //折扣价
                    this.drawDiscountPrice("A_16_1", this.getpriceMoneyByfaction(), $tabelvo.costResource[0][0], true);
                } else {
                    this.setUiListVisibleByItem(this._aryUI2, false);
                }

                // if (this._vo.data.limtype == 0) {
                //     //不限购
                //     this.setUiListVisibleByItem(this._aryUI1, false);
                // } else {
                this.setUiListVisibleByItem(this._aryUI1, true);
                var $aa: FrameCompenent = <FrameCompenent>this._aryUI1[0];
                // if (this._vo.data.limtype == 1) {
                //每日限购
                $aa.goToAndStop(1);
                // } else if (this._vo.data.limtype == 2) {
                //     //每周限购
                //     $aa.goToAndStop(0);
                // }
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, "A_28", String(this._vo.data1.num - this._vo.data2.num), ArtFont.num6);
                // }
            } else {
                if (this._vo.data.discount < 10) {
                    //折扣物品
                    this.setUiListVisibleByItem(this._aryUI2, true);
                    //原价
                    this.drawDiscountPrice("A_16", this._vo.data.costResource[0][1], this._vo.data.costResource[0][0], false);
                    //折扣价
                    this.drawDiscountPrice("A_16_1", this.getpriceMoney(), this._vo.data.costResource[0][0], true);
                } else {
                    this.setUiListVisibleByItem(this._aryUI2, false);
                }

                if (this._vo.data.limtype == 0) {
                    //不限购
                    this.setUiListVisibleByItem(this._aryUI1, false);
                } else {
                    this.setUiListVisibleByItem(this._aryUI1, true);
                    var $aa: FrameCompenent = <FrameCompenent>this._aryUI1[0];
                    if (this._vo.data.limtype == 1) {
                        //每日限购
                        $aa.goToAndStop(1);
                    } else if (this._vo.data.limtype == 2) {
                        //每周限购
                        $aa.goToAndStop(0);
                    }
                    ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, "A_28", String(this._vo.getNum()), ArtFont.num6);
                }
            }
        }

        private totalnum: number;

        private drawDiscountPrice($key: string, $price: number, type: number, isdiscount: boolean): void {
            var $rec: UIRectangle = this._topRender.uiAtlas.getRec($key);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            //底
            var baseRec: any = this._topRender.uiAtlas.getRec("DiscountBg");
            ctx.drawImage(this._topRender.uiAtlas.useImg, baseRec.pixelX, baseRec.pixelY, baseRec.pixelWitdh, baseRec.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            //资源图标
            UiDraw.cxtDrawImg(ctx, UIuitl.getInstance().costtype(type), new Rectangle(2, 0, 35, 35), UIData.publicUi);

            // ArtFont.getInstance().writeFontToCtxCenten(ctx, String($price), ArtFont.num16, 94, 6)
            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, Snum($price), 16, 84, 14, TextAlign.CENTER, ColorType.Brown7a2f21);

            if (!isdiscount) {
                //折扣物品划痕
                var baseRec1: any = this._topRender.uiAtlas.getRec("Line");
                ctx.drawImage(this._topRender.uiAtlas.useImg, baseRec1.pixelX, baseRec1.pixelY, baseRec1.pixelWitdh, baseRec1.pixelHeight, 58, 22, baseRec1.pixelWitdh, baseRec1.pixelHeight);
            }

            this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private _costnum: number;
        public setNum($num: number): void {
            this.totalnum = $num;
            // ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this._num.skinName, String($num), ArtFont.num16);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._num.skinName, String($num), 16,TextAlign.CENTER,ColorType.Brown7a2f21);
            this._costnum = $num * this.getpriceMoney();

            var type: number;
            if (this._vo.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(this._vo.data1.id);
                type = $tabelvo.costResource[0][0]
            } else {
                type = this._vo.data.costResource[0][0];
            }
            this.drawDiscountPrice(this._cost.skinName, this._costnum, type, true);
        }

        public setOwnMoney(): void {
            var type: number;
            if (this._vo.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(this._vo.data1.id);
                type = $tabelvo.costResource[0][0]
            } else {
                type = this._vo.data.costResource[0][0];
            }
            this.drawDiscountPrice(this._have.skinName, GuidData.player.getResType(type), type, true);
        }

        private getpriceMoney(): number {
            var price;
            if (this._vo.type == 1) {
                var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(this._vo.data1.id);
                price = Math.ceil($tabelvo.discount_flag / 100 * $tabelvo.costResource[0][1])
            } else {
                price = Math.ceil(this._vo.data.discount / 10 * this._vo.data.costResource[0][1])
            }

            return price;
        }

        private getpriceMoneyByfaction(): number {
            var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(this._vo.data1.id);
            var price = Math.ceil($tabelvo.discount_flag / 100 * $tabelvo.costResource[0][1])
            return price;
        }

        public shoplist: ShopList;
        public show($value: number): void {
            UIManager.getInstance().addUIContainer(this);
            if (!this.shoplist) {
                this.shoplist = new ShopList();
                this.shoplist.init(this._bottomRender.uiAtlas);
            }
            this.shoplist.show($value);
            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this.shoplist) {
                this.shoplist.hide();
            }
        }


        public resize(): void {
            super.resize();
            if (this.shoplist) {
                this.shoplist.left = this.slistindex1.parent.x / UIData.Scale + this.slistindex1.x
                this.shoplist.top = this.slistindex1.parent.y / UIData.Scale + this.slistindex1.y
            }
        }


        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this._b_minus:
                    //减号
                    if (this.totalnum == 0) {
                        return;
                    }
                    this.setNum(--this.totalnum);
                    break
                case this._b_add_1:
                    //加号
                    if (this.getMaxNum() == this.totalnum) {
                        return;
                    }
                    this.setNum(++this.totalnum);
                    break
                case this._b_add_2:
                    //添加资源
                    //AddMaxvpPanel.show("aaa", "获得真气")
                    break
                case this._b_buy:
                    //购买
                    var type: number;
                    if (this._vo.type == 1) {
                        var $tabelvo: tb.Tb_faction_shop = tb.Tb_faction_shop.get_Tb_faction_shopById(this._vo.data1.id);
                        type = $tabelvo.costResource[0][0]
                    } else {
                        type = this._vo.data.costResource[0][0];
                    }

                    costRes([type, this._costnum], () => {
                        if(this._vo.type == 1){
                            NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_SHOP,this._vo.data1.id, this.totalnum,"","");
                        }else{
                            NetManager.getInstance().protocolos.mall_buy(this._vo.data.id, this.totalnum, 0);
                        }
                    }, () => {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
                    });
                    break
                case this._b_btn_selectnum:
                    //选择数目
                    MenuKeyUtil.show((value: number) => { this.popBackFun(value) }, evt.x - 85 * UIData.Scale, evt.y - 240 * UIData.Scale)
                    break

                default:
                    break;
            }
        }

        private popBackFun(value: number): void {
            switch (value) {
                case -1:
                    // console.log("清除");
                    this.setNum(0);
                    break
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    var changeNum;
                    if (this.totalnum == 0) {
                        changeNum = value;
                    } else {
                        changeNum = this.totalnum * 10 + value;
                    }

                    if (this.getMaxNum() < changeNum) {
                        changeNum = this.getMaxNum();
                    }

                    this.setNum(changeNum);
                    break
                case 10:
                    // console.log("确认");
                    MenuKeyUtil.closeMune();
                    break
                default:
                    break
            }
        }
        /**
         * 获得单次可购买最大数量
         */
        private getMaxNum(): number {
            if (this._vo.type == 1) {
                return this._vo.data1.num - this._vo.data2.num;
            } else {
                if (this._vo.data.limtype == 0) {
                    //不限购
                    return this._vo.data.limit;
                } else {
                    //限购
                    if (this._vo.getNum() > this._vo.data.limit) {
                        //可购买数大于单次购买最大限度
                        return this._vo.data.limit;
                    } else {
                        //可购买数不大于单次购买最大限度
                        return this._vo.getNum();
                    }
                }
            }
        }

    }
}