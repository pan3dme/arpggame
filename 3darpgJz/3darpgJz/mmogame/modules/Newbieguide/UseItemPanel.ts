module newbieguide {
    export class UseItemVo {
        public itemId: number
        public time: number
        public guid: string
        public equPos: number
        public num: number
        public force: number
    }

    export class UseItemPanel extends UIPanel {

        public _bottomRender: UIRenderComponent;
        public _baseRender: UIRenderComponent;
        public _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this.layer=300

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new AlphaUIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public applyLoad(): void {
            this._baseRender.setInfo("ui/uidata/useitem/useitem.xml", "ui/uidata/useitem/useitem.png", () => { this.loadConfigCom() });
        }


        private loadConfigCom(): void {
            this._topRender.uiAtlas = this._baseRender.uiAtlas
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas
            this.initUI();
            this.applyLoadComplete();
        }

        private a_icon: UICompenent
        private useBtn: UICompenent
        private a_name: UICompenent
        private a_time: UICompenent
        private a_btntxt: FrameCompenent
        private _tickFun: Function;
        private initUI(): void {
            var renderLevel: UIRenderComponent = this._baseRender

            this.addChild(<UICompenent>this._bottomRender.getComponent("b_bg"));
            this.useBtn = this.addEvntBut("a_but", this._baseRender);  //使用按钮背景

            this.a_icon = this.addChild(<UICompenent>this._baseRender.getComponent("a_icon"));

            this.a_btntxt = <FrameCompenent>this.addChild(this._topRender.getComponent("a_btntxt"));
            this.a_name = <UICompenent>this.addChild(this._topRender.getComponent("a_name"));
            this.a_time = <UICompenent>this._topRender.getComponent("a_time");

            this._tickFun = (t: number) => { this.tickRefreshState(t) };

        }


        private _endtime: number
        private _curtime: number;
        public tickRefreshState(t: number): void {

            var $time: number = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, "A_timetxt", String($time + 1), 14, TextAlign.CENTER, ColorType.Brown7a2f21);
                if ($time < 0) {
                    //回调
                    var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this._curvo.itemId)
                    if ($vo.type == SharedDef.ITEM_TYPE_EQUIP && $vo.Auto == 1) {
                        NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos));
                        // } else {
                        //保留，以防日后自动开宝箱
                        //     var $dagItemData: BagItemData = GuidData.bag.getItemByEntryCopy($vo.id)
                        //     if ($dagItemData) {
                        //         NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, this._num);
                        //     } else {
                        //         alert("背包里没有物品")
                        //     }
                    }
                    this.nextprompt();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        }

        private nextprompt(): void {
            this._queItemAry.shift();
            // this._aryItems.splice(0, 1);
            this.selectItem();
        }


        private _curvo: UseItemVo
        public refresh(): void {
            this._curvo = this._queItemAry[0]
            var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this._curvo.itemId);
            this.a_btntxt.goToAndStop(this.getType($vo.type));
            // this._midRender.uiAtlas.upDataPicToTexture(geteqiconIconUrl($vo.icon), this.a_icon.skinName);
            this.drawItemIcon(this.a_icon, this._curvo.itemId, this._curvo.num);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_name.skinName, $vo.name, 16, TextAlign.CENTER, getColorQua($vo.quality));

            if (this._curvo.time > 0) {
                this.setUiListVisibleByItem([this.a_time], true);
                this.a_btntxt.x = 740
            } else {
                this.setUiListVisibleByItem([this.a_time], false);
                this.a_btntxt.x = 750
            }
        }

        public drawItemIcon($ui: UICompenent, id: number, num: number): void {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon,
                ($img) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);

                    if (obj.type == 1) {//装备
                        UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                        ArtFont.getInstance().writeFontToCtxCenten(ctx, String(obj.level), ArtFont.num63, 18, 4, 4);
                    }

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, "x" + num, 16, 64, 45, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private getType($num: number): number {
            switch ($num) {
                case 14:
                case 15:
                    return 0;
                case 1:
                    return 1;
                default:
                    return 2;
            }
        }


        private selectItem(): void {
            if (this._queItemAry.length > 0) {
                var curtab:tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this._queItemAry[0].itemId);
                if (curtab.type == SharedDef.ITEM_TYPE_EQUIP) {
                    //自身装备对象
                    var bagitem: BagItemData = GuidData.bag.getEquByPart(curtab.pos);
                    var test: boolean = false
                    if (bagitem) {
                        if (this._queItemAry[0].force > bagitem.data.propData.force) {
                            test = true;
                        }
                    } else {
                        test = true;
                    }
    
                    //当前未穿戴装备 或者 穿戴装备评分低时 弹窗
                    if (test) {
                        this._endtime = this._queItemAry[0].time + TimeUtil.getTimer();
                        this.refresh();
                    } else {
                        this.nextprompt();
                    }
                }else{
                    this._endtime = this._queItemAry[0].time + TimeUtil.getTimer();
                    this.refresh();
                }
            } else {
                this.hide();
            }
        }

        private _queItemAry: Array<UseItemVo>
        public addData($vo: UseItemVo):void{
            if (!this._queItemAry) {
                this._queItemAry = new Array;
            }
            this._queItemAry.push($vo);
            console.log("_UseItemary------", this._queItemAry);
        }

        public onAdd():void{
            //添加到舞台上时，执行的方法
            this.selectItem();
            TimeUtil.addFrameTick(this._tickFun);
        }


        public hide() {
            UIManager.getInstance().removeUIContainer(this);
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.useBtn:
                    var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this._curvo.itemId)
                    // if (this._isEqu) {
                    if ($vo.type == SharedDef.ITEM_TYPE_EQUIP) {
                        console.log("穿", SharedDef.BAG_TYPE_MAIN_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos))
                        NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._curvo.equPos, SharedDef.BAG_TYPE_EQUIP, Number($vo.pos));
                    } else {
                        // var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(this._itemId)
                        // if ($vo.out_bag == 0) { //在背包里
                        var $dagItemData: BagItemData = GuidData.bag.getItemByEntryCopy($vo.id)
                        if ($dagItemData) {
                            NetManager.getInstance().protocolos.bag_item_user($dagItemData.guid, this._curvo.num);
                        } else {
                            alert("背包里没有物品")
                        }
                        //     console.log("背包的物品")
                        // }
                        // if ($vo.out_bag == 1) {  //不在背包

                        //     NetManager.getInstance().protocolos.use_virtual_item($vo.id);
                        //     console.log("不在背包")
                        // }
                    }
                    this.nextprompt();

                    break;

                default:
                    break;
            }
        }
    }
}