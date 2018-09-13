module exterior {

    export class IdentificationListRender extends SListItem {
        //public static baseAtlas: UIAtlas;

        private G_BG: UICompenent;
        private G_NAME: UICompenent;
        private G_INFO: UICompenent;

        private G_LEFT_TOP: UICompenent;

        private G_ICON0: UICompenent;
        private G_ICON1: UICompenent;
        private G_ICON2: UICompenent;
        private iconAry: Array<UICompenent>

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.G_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "G_BG", 0, 0, 530, 88, 10, 10);
            $container.addChild(this.G_BG);
            this.G_BG.addEventListener(InteractiveEvent.Down, this.butClik, this);

            this.iconAry = new Array
            this.G_ICON0 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON0", 12, 10, 68, 68);
            $container.addChild(this.G_ICON0);
            this.G_ICON1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON1", 87, 10, 68, 68);
            $container.addChild(this.G_ICON1);
            this.G_ICON2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_ICON2", 160, 10, 68, 68);
            $container.addChild(this.G_ICON2);
            this.iconAry.push(this.G_ICON0);
            this.iconAry.push(this.G_ICON1);
            this.iconAry.push(this.G_ICON2);


            this.G_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_NAME", 240, 20, 300, 18);
            $container.addChild(this.G_NAME);

            this.G_INFO = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_INFO", 240, 45, 300, 18);
            $container.addChild(this.G_INFO);

            this.G_LEFT_TOP = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "G_LEFT_TOP", 2, 2, 47, 41);
            $container.addChild(this.G_LEFT_TOP);




        }
        private butClik(evt: any): void {
            if (this.itdata && this.itdata.data) {
                this.setSelect();
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.setnull();
            }
        }
        private setnull(): void {

        }
        private applyRender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: tb.TB_appearance_pokedex = this.itdata.data;

                var $nameTips: string = "收集:"
                var $infoTips: string = ColorType.Brown7a2f21 + "属性:"
                var $allPass: boolean = true
                for (var i: number = 0; i < $vo.exterior.length; i++) {
                    var $has: boolean = GuidData.grow.isSpellIntFieldAppearanceById($vo.exterior[i])
                    var $TB_appearance_info: tb.TB_appearance_info = tb.TB_appearance_info.getTempVo($vo.exterior[i]);
                    $nameTips += "[" + $TB_appearance_info.name + "]";
                    IconManager.getInstance().drawItemIcon60(this.iconAry[i], $TB_appearance_info.icon, 1, !$has, false);
                    if (!$has) {
                        $allPass = false
                        $infoTips += ColorType.color5f5c59
                    } else {
                        $infoTips += ColorType.colorcd2000

                    }

                    for (var j = 0; j < $vo.attrKeys.length; j++) {
                        $infoTips += getKeyProById($vo.attrKeys[j]) + " +" + $vo.attrValues[j] + ";";
                    }

                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_NAME.skinName, ColorType.Brown7a2f21 + $nameTips, 16, TextAlign.LEFT);
                    LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_INFO.skinName, $infoTips, 16, TextAlign.LEFT);


                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_BG.skinName, "U_BG");
                    if ($allPass) {
                        UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.G_LEFT_TOP.skinName, "U_LEFT_TOP");
                    } else {
                        this.uiAtlas.clearCtxTextureBySkilname(this.G_LEFT_TOP.skinName);
                    }
                }
            }
        }
    }

    export class IdentificationList extends SList {

        public constructor() {
            super();
            this.setShowLevel(12)
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, IdentificationListRender, 530, 88 * 3 - 40, 530, 88, 3, 512, 1024, 1, 5);
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            var $exterior: Array<number> = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguantj;
            var $item: Array<SListItemData> = new Array()
            for (var i: number = 0; i < $exterior.length; i++) {
                var $vo: SListItemData = new SListItemData()
                $vo.data = tb.TB_appearance_pokedex.getTempVo($exterior[i])
                $vo.id = i;
                $item.push($vo);
            }
            this.refreshData($item);


        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }
    export class IdentificationPanel extends WindowMinUi {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private uiAtlasComplet: boolean = false;

        public dispose(){
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/exterior/identification/identification.xml", "ui/uidata/exterior/identification/identification.png", () => { this.loadConfigCom() }, "ui/uidata/exterior/identification/identificationuse.png");
        }
        private sxItem: Array<UICompenent>;
        private a_list_pos: UICompenent;
        private a_zhanli_num: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;


            this.addChild(this._bottomRender.getComponent("a_list_title"));
            this.a_zhanli_num = this.addChild(this._bottomRender.getComponent("a_zhanli_num"));
            this.addChild(this._bottomRender.getComponent("a_zhanli_label"));
            this.addChild(this._bottomRender.getComponent("a_win_tittle"));

            this.addChild(this._bottomRender.getComponent("a_list_bg"));

            this.a_list_pos = this.addChild(this._bottomRender.getComponent("a_list_pos"));



            this.sxItem = new Array;
            for (var i: number = 0; i < 6; i++) {
                this.sxItem.push(this.addChild(this._bottomRender.getComponent("a_sx_" + i)));
            }
            this.initList()
            this.uiAtlasComplet = true;
            this.applyLoadComplete();


        }
        private identificationList: IdentificationList
        private initList(): void {
            this.identificationList = new IdentificationList;
            this.identificationList.init(this._midRender.uiAtlas)

        }
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.baseBg:
                case this.e_close:
                    this.hide();
                    break
            }
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.identificationList.hide()
        }
        public show(): void {

            UIManager.getInstance().addUIContainer(this);
            this.identificationList.show();

            this.refrish();
        }
        private refrish(): void {
            var $waiguantj: Array<number> = tb.TB_char_info.getTempVo(GuidData.player.getCharType()).waiguantj;
            var $dicKey: any = new Object;
            for (var i: number = 0; i < $waiguantj.length; i++) {
                var $exteriorArr: Array<number> = tb.TB_appearance_pokedex.getTempVo($waiguantj[i]).exterior;

                var $allPass: boolean = true
                for (var k: number = 0; k < $exteriorArr.length; k++) {
                    var $has: boolean = GuidData.grow.isSpellIntFieldAppearanceById($exteriorArr[k]);
                    if (!$has) {
                        $allPass = false
                    }
                }
                if ($allPass) {
                    for (var j: number = 0; j < $exteriorArr.length; j++) {
                        var $TB_appearance_info: tb.TB_appearance_info = tb.TB_appearance_info.getTempVo($exteriorArr[j]);
                        for (var k: number = 0; k < $TB_appearance_info.attrKeys.length; k++) {
                            if (!$dicKey[$TB_appearance_info.attrKeys[k]]) {
                                $dicKey[$TB_appearance_info.attrKeys[k]] = 0
                            }
                            $dicKey[$TB_appearance_info.attrKeys[k]] += $TB_appearance_info.attrValues[k]
                        }
                    }
                }
            }
            var uiSkipNum: number = 0;

            var $aaa: Array<number> = new Array();
            var $bbb: Array<number> = new Array();
            for (var key in $dicKey) {
                UiDraw.drawAttVal(this.sxItem[uiSkipNum++], Number(key), $dicKey[key]);
                $aaa.push(Number(key))
                $bbb.push($dicKey[key])
            }
            ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, this.a_zhanli_num.skinName, String(getForceByAtt($aaa, $bbb)), ArtFont.num56, 3)


        }
        public resize(): void {
            super.resize();
            if (this.identificationList) {
                this.identificationList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x;
                this.identificationList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y;
            }

        }


    }
}