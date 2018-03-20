module welfare {

    export class PoponebackVo {
        public type: number;
        public num: number;
    }

    export class PoponebackPanel extends UIConatiner {

        private _AbgRender: UIRenderComponent;
        private _AbottomRender: UIRenderComponent;
        private _AbaseRender: UIRenderComponent;
        // private _AtopRender1: UIRenderComponent;
        // private _AtopRender2: UIRenderComponent;
        // private _AtopRender3: UIRenderComponent;

        public dispose(): void {
            // this._AbgRender.dispose();
            // this._AbgRender = null;
            // this._AbottomRender.dispose();
            // this._AbottomRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            //添加好友面板渲染器
            this._AbgRender = new UIRenderComponent;
            this.addRender(this._AbgRender)
            this._AbottomRender = new UIRenderComponent;
            this.addRender(this._AbottomRender)
            this._AbaseRender = new UIRenderComponent;
            this.addRender(this._AbaseRender)
            // this._AtopRender1 = new UIRenderComponent;
            // this.addRender(this._AtopRender1)
            // this._AtopRender2 = new UIRenderComponent;
            // this.addRender(this._AtopRender2)
            // this._AtopRender3 = new UIRenderComponent;
            // this.addRender(this._AtopRender3)
        }

        public init($uiAtlas: UIAtlas, $publicuiAtlas: UIAtlas): void {
            this._AbgRender.uiAtlas = $publicuiAtlas;
            this._AbottomRender.uiAtlas = $publicuiAtlas;
            this._AbaseRender.uiAtlas = $uiAtlas;
            // this._AtopRender1.uiAtlas = $uiAtlas;
            // this._AtopRender2.uiAtlas = $uiAtlas;
            // this._AtopRender3.uiAtlas = $uiAtlas;
            this.loadConfigCom();
        }


        private bg_2_1: UICompenent
        private but_qx: UICompenent
        private but_qr: UICompenent
        private a_11: UICompenent
        private cost: UICompenent
        private costtype: UICompenent
        private a_7: FrameCompenent
        private loadConfigCom(): void {
            this.bg_2_1 = this.addEvntBut("baseBg", this._AbgRender);
            var guiBg0 = this.addChild(<UICompenent>this._AbgRender.getComponent("guiBg0"));
            guiBg0.x = 278
            guiBg0.y = 53
            guiBg0.width = 399
            guiBg0.height = 430

            var guiBg1 = this.addChild(<UICompenent>this._AbgRender.getComponent("guiBg1"));
            guiBg1.x = 287
            guiBg1.y = 136
            guiBg1.width = 381
            guiBg1.height = 276
            this._AbgRender.applyObjData();

            var titleBg = this.addChild(<UICompenent>this._AbottomRender.getComponent("titleBg"));
            titleBg.x = 374
            titleBg.y = 66
            titleBg.width = 219

            this.but_qx = this.addEvntButUp("but_1", this._AbottomRender);
            this.but_qx.x = 325
            this.but_qx.y = 421
            this.but_qr = this.addEvntButUp("but_1", this._AbottomRender);
            this.but_qr.x = 505
            this.but_qr.y = 421

            var qx = this.addChild(<UICompenent>this._AbottomRender.getComponent("qx"));
            qx.x = 362
            qx.y = 433
            var qr = this.addChild(<UICompenent>this._AbottomRender.getComponent("qr"));
            qr.x = 543
            qr.y = 433

            var renderLevel: UIRenderComponent = this._AbaseRender;

            this.addChild(<UICompenent>renderLevel.getComponent("a_56"));

            this.a_7 = <FrameCompenent>this.addChild(renderLevel.getComponent("a_7"));
            this.a_11 = this.addChild(<UICompenent>renderLevel.getComponent("a_11"));


            this.addUIList(["a_51", "a_52", "a_53"], renderLevel);
            this.cost = this.addChild(<UICompenent>renderLevel.getComponent("a_54"));
            this.costtype = this.addChild(<UICompenent>renderLevel.getComponent("a_55"));

        }

        public rewardMsgList: RewardMsgList;
        private initData(): void {
            var type = this._data.costtype ? 50 : 100;
            this.drawCost();
            ArtFont.getInstance().writeFontToSkinName(this._AbaseRender.uiAtlas, this.costtype.skinName, type + "%", this._data.costtype ? ArtFont.num7 : ArtFont.num3, TextAlign.LEFT, this._data.costtype ? 2 : 4);

            if (this._data.costtype) {
                this.a_7.goToAndStop(0);
            } else {
                this.a_7.goToAndStop(1);
            }

            if (!this.rewardMsgList) {
                this.rewardMsgList = new RewardMsgList();
                this.rewardMsgList.init(this._AbaseRender.uiAtlas);
            }
            this.rewardMsgList.show(this._data.items);
            this.resize();
        }

        private drawCost(): void {
            var $goldtxtrec: UIRectangle = this._AbaseRender.uiAtlas.getRec(this.cost.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($goldtxtrec.pixelWitdh, $goldtxtrec.pixelHeight, false);
            if (this._data.costtype) {
                //银币
                UiDraw.cxtDrawImg($ctx, PuiData.A_YINBI, new Rectangle(0, 0, 20, 20), UIData.publicUi);
            } else {
                //元宝
                UiDraw.cxtDrawImg($ctx, PuiData.A_YUANBAO, new Rectangle(0, 0, 20, 20), UIData.publicUi);
            }
            ArtFont.getInstance().writeFontToCtxLeft($ctx, String(this._data.cost), this._data.costtype ? ArtFont.num7 : ArtFont.num3, 21, 3, 4);

            this._AbaseRender.uiAtlas.updateCtx($ctx, $goldtxtrec.pixelX, $goldtxtrec.pixelY);
        }

        private type2str($type: number): string {
            var $str: string;
            switch ($type) {
                case 0:
                    $str = "元宝"
                    break;
                case 2:
                    $str = "银币"
                    break;

                default:
                    break;
            }
            return $str;
        }



        public resize(): void {
            this.bg_2_1.top = 0
            this.bg_2_1.left = 0
            this.bg_2_1.y = 0;
            this.bg_2_1.x = 0;
            this.bg_2_1.height = Scene_data.stageHeight / UIData.Scale;
            this.bg_2_1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();

            if (this.rewardMsgList) {
                this.rewardMsgList.left = this.a_11.parent.x / UIData.Scale + this.a_11.x - 6
                this.rewardMsgList.top = this.a_11.parent.y / UIData.Scale + this.a_11.y + 26
            }
        }

        private _data: rewardList_getback;
        public show($data: rewardList_getback): void {
            this._data = $data;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.initData();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }

            if (this.rewardMsgList) {
                this.rewardMsgList.hide();
            }
        }


        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.but_qx:
                    this.hide();
                    break;
                case this.but_qr:
                    if (this._data.cost > this.type2res(this._data.costtype)) {
                        // alert("资源不足");
                        msgtip.MsgTipManager.outStrById(22, 29);
                    } else {
                        var $type = this._data.costtype ? 0 : 1;
                        NetManager.getInstance().protocolos.welfare_getall_getback($type);
                        this.hide();
                    }
                    break;
                default:
                    break;
            }
        }

        private type2res($type: number): number {
            switch ($type) {
                case 0:
                    return GuidData.player.getGoldIngot();
                case 2:
                    return GuidData.player.getSilver();
                default:
                    break;
            }
        }

    }


    /**
     * 奖励信息list
     */
    export class RewardMsgList extends SList {

        public constructor() {
            super();
            this.left = 372;
            this.top = 198;
        }

        public init($uiAtlas: UIAtlas): void {
            RewardMsgListRender.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, RewardMsgListRender, 256, 230, 0, 21, 11, 256, 256, 1, 12);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var $sListItemData: Array<SListItemData> = this.getData(this._ary);
            this.refreshData($sListItemData);
        }


        public getData($data: Array<string>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i = 0; i < $data.length; i = i + 2) {
                if ($data[i].length > 0) {
                    var vo: PoponebackVo = new PoponebackVo();
                    vo.num = Number($data[i + 1]);
                    vo.type = Number($data[i]);
                    var item: SListItemData = new SListItemData;
                    item.data = vo;
                    item.id = i;
                    ary.push(item);
                }
            }
            return ary;
        }


        private _ary: Array<string>;
        public show($data: Array<string>): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this._ary = $data;
            this.refreshDataByNewData();
        }


        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class RewardMsgListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private I3text: UICompenent;

        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.I3text = this.creatSUI($baseRender, RewardMsgListRender.baseAtlas, "I3text", 0, 0, 256, 21);
            $container.addChild(this.I3text);
        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo: PoponebackVo = $data.data
                var entryData: any = TableData.getInstance().getData(TableData.tb_item_template, vo.type);
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.I3text.skinName, entryData.name + " *" + vo.num, 16, TextAlign.CENTER, getColorQua(entryData.quality));
            } else {
                this.setnull();
            }
        }

        private setnull(): void {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I3text.skinName, "", 16, TextAlign.LEFT, "#d6e7ff");
        }
    }

}