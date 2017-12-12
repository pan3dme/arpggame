module shieldui {
    export class BlockVo {

        public gender: number;
        public level: number;
        public name: string
        public vip: number
        public factionName: string
        public guid: string
        public indx: number
    }
    export class ShieldItemRender extends SListItem {
        public static baseAtlas: UIAtlas;

        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        private icon: UICompenent;
        private l_name: UICompenent;
        private l_factionname: UICompenent;
        private l_but: UICompenent;
        private l_bg: UICompenent
        private l_base_color: UICompenent
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);
            var $tx: number = 50


            this.l_base_color = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_base_color", 0, 0, 400, 60);

            this.l_bg = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_bg", 0, 0, ShieldSList.listWidth600, 60);

            $container.addChild(this.l_bg);

            this.icon = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "Icon", 0 + $tx, 0, 60, 60);
            $container.addChild(this.icon);

            this.l_name = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_name", 100 + $tx, 20, 100, 16);
            $container.addChild(this.l_name);

            this.l_factionname = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_factionname", 270 + $tx, 20, 100, 16);
            $container.addChild(this.l_factionname);

            this.l_but = this.creatSUI($baseRender, ShieldItemRender.baseAtlas, "l_but", 425 + $tx, 10, 67, 39);
            $container.addChild(this.l_but);

            this.l_but.addEventListener(InteractiveEvent.Down, this.butClik, this);

        }
        public butClik(evt: InteractiveEvent): void {

            if (this.itdata) {
                var $vo: BlockVo = this.itdata.resdata
                console.log("取消", $vo.indx)
                NetManager.getInstance().protocolos.cancel_block_chat($vo.indx);
            }


        }

        public render($data: SListItemData): void {
            this.itdata = $data;


            if ($data) {
                var $vo: BlockVo = $data.resdata
                this.drawBg($data.id % 2 == 0);
                this.setIcon($vo)

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.l_name.skinName, getBaseName($vo.name), 16, TextAlign.LEFT);
                if ($vo.factionName.length) {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.l_factionname.skinName, getBaseName($vo.factionName), 16, TextAlign.LEFT);
                } else {
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.l_factionname.skinName, "", 16, TextAlign.LEFT);
                }


                this.drawBut();

            } else {
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.icon.skinName, "", ArtFont.num1);
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_name.skinName, "", ArtFont.num1);
                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_factionname.skinName, "", ArtFont.num1);

                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_base_color.skinName, "", ArtFont.num1);

                ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.l_but.skinName, "", ArtFont.num1);
            }
        }
        private drawBg(value: boolean): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.l_base_color.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var $but: UIRectangle = ShieldItemRender.baseAtlas.getRec(value ? "L_bgA" : "L_bgB")

            ctx.drawImage(ShieldItemRender.baseAtlas.useImg, $but.pixelX, $but.pixelY, $but.pixelWitdh, $but.pixelHeight, 0, 0, $rec.pixelWitdh, $rec.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);

        }
        private drawBut(): void {
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.l_but.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var $but: UIRectangle = ShieldItemRender.baseAtlas.getRec("L_dele_but")
            ctx.drawImage(ShieldItemRender.baseAtlas.useImg, $but.pixelX, $but.pixelY, $but.pixelWitdh, $but.pixelHeight, 0, 0, $but.pixelWitdh, $but.pixelHeight);
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);

        }
        private setIcon($vo: BlockVo): void {
            IconManager.getInstance().getIcon(getTouPic($vo.gender),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.icon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    //绘制底色
                    UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_BASE_66, new Rectangle(0, 0, 60, 60), UIData.publicUi);
                    //绘制头像
                    ctx.drawImage($img, 0, 0, 82, 82, 2, 2, 56, 56);



                    var $but: UIRectangle = ShieldItemRender.baseAtlas.getRec("L_dele_but")
                    //   ctx.drawImage(ShieldItemRender.baseAtlas.useImg, $but.pixelX, $but.pixelY, $but.pixelWitdh , $but.pixelHeight, distion + 4 + ji.pixelWitdh, 0, $but.pixelWitdh * ratio, $but.pixelHeight);


                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

    }
    export class ShieldSList extends SList {

        public static listWidth600: number = 600
        public constructor() {
            super();
            this.center = 0;
            this.middle = 0;

        }
        public init($uiAtlas: UIAtlas): void {
            ShieldItemRender.baseAtlas = $uiAtlas;
            this.initData();
        }


        private _ary: Array<SListItemData>;
        private initData(): void {
            this._ary = new Array<SListItemData>();

            this.setData(this._ary, ShieldItemRender, ShieldSList.listWidth600, Math.floor(60 * 5.5), 0, 60, 5, 512, 512, 1, 7);
        }

        /**
         * refreshData
         */
        public refreshNewData($data: Array<BlockVo>): void {
            this._ary.length = 0
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.resdata = $data[i]
                item.id = i;
                this._ary.push(item);
            }
            this.refreshData(this._ary);
        }


        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        }
        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }
    export class ShieldUiPanel extends UIConatiner {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.width = 640;
            this.height = 540;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);


            this._topRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {
            GameData.getPublicUiAtlas(($uiAtlas: UIAtlas) => { this.makePanelUi($uiAtlas) });
        }
        private makePanelUi($uiAtlas: UIAtlas): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/seting/seting.xml", "ui/uidata/chat/seting/seting.png", () => { this.loadConfigCom() }, "ui/uidata/chat/seting/setinguse.png");


        }
        private setSizeForPanelUi($ui: UICompenent, $uiName: string): void {
            var temp: UICompenent = this._topRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;

        }
        private b_close: UICompenent;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = GameData.publicbgUiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;


            var guiBg0: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("guiBg0"));
            this.setSizeForPanelUi(guiBg0, "b_bg");
            this.b_close = this.addEvntBut("b_close", this._bottomRender)
            this.setSizeForPanelUi(this.b_close, "b_close");
            var titleBg: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("titleBg"));
            this.setSizeForPanelUi(titleBg, "b_tittle_bg");

            var guiBg1: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("guiBg1"));
            this.setSizeForPanelUi(guiBg1, "b_in_bg");


            

            this._bottomRender.applyObjData();

            this.addChild(<UICompenent>this._topRender.getComponent("b_tittle_txt"));
            this.addChild(<UICompenent>this._topRender.getComponent("b_label2"));
            this.addChild(<UICompenent>this._topRender.getComponent("b_label1"));
            this.addChild(<UICompenent>this._topRender.getComponent("b_label0"));
            this.addChild(<UICompenent>this._topRender.getComponent("b_line"));

            this.addList();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();

        }
        private _shieldSList: ShieldSList
        private addList(): void {
            if (!this._shieldSList) {
                this._shieldSList = new ShieldSList();
            }
            this._shieldSList.init(this._topRender.uiAtlas);

        }

        public refresh(): void {
            if (this.uiAtlasComplet) {
                var $item: Array<BlockVo> =this.getChatBlockItem();
                this._shieldSList.refreshNewData($item)
                this._shieldSList.show()
                console.log("show")
            }

        }
        private blockItem: Array<BlockVo>
        public getChatBlockItem(value: boolean = true): Array<BlockVo> {
            if (!value && this.blockItem) {
                return this.blockItem
            }
            if (!this.blockItem) {
                this.blockItem = new Array
            }
            this.blockItem.length = 0

            var $strItem: Array<string> = GuidData.player.getPlayChatBlock();
            for (var i: number = 0; i < $strItem.length; i++) {
                if ($strItem[i]) {
                    var tempArr: Array<string> = $strItem[i].split("|");
                    var $vo: BlockVo = new BlockVo();
                    $vo.gender = Number(tempArr[0]);
                    $vo.level = Number(tempArr[1]);
                    $vo.name = String(tempArr[2]);
                    $vo.vip = Number(tempArr[3]);
                    $vo.factionName = String(tempArr[4]);
                    $vo.guid = String(tempArr[5]);
                    $vo.indx = i;
                    console.log($vo.indx)
                    this.blockItem.push($vo)
                }

            }
            return this.blockItem
        }
        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_close:
                    this.close();
                    break
                default:
                    break;
            }

        }
        public close(): void {
            if (this._shieldSList) {
                this._shieldSList.hide()
            }
            UIManager.getInstance().removeUIContainer(this);
        }
        private uiAtlasComplet: boolean = false
    

    }

}