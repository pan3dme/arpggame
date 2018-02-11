module faction {

    export class LeagueItem {
        public type: number;
        public items: Array<faction_match_info>;

    }

    export class FactionLeagueList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, LeagueRender, 786, 265, 0, 74, 3, 512, 512, 1, 5, 1);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData($type: number): void {
            var $ary: Array<LeagueItem> = FactionLeagueModel.getInstance().readData();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        }

        public getData($ary: Array<LeagueItem>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show($type: number) {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData($type);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class LeagueRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private Bg: UICompenent;
        private Line: UICompenent;
        private LevPic: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        private _container: UIConatiner;
        private aryType0: Array<UICompenent>
        private aryType1: Array<UICompenent>
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            this._container = $container;
            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var topRender: UIRenderComponent = $customizeRenderAry[0];

            this.Bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Bg", 0, 0, 786, 71, 36, 22);
            $container.addChild(this.Bg);

            this.Line = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Line", 177, 33, 600, 6);
            $container.addChild(this.Line);

            this.LevPic = this.creatSUI(topRender, this.parentTarget.baseAtlas, "LevPic", 0, 6, 228, 61);
            $container.addChild(this.LevPic);

            this.aryType0 = new Array
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name0", 339, 10, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name1", 533, 10, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name2", 339, 44, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name3", 533, 44, 130, 20));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "VS0", 483, 9, 35, 24));
            this.aryType0.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "VS1", 483, 43, 35, 24));
            this.aryType1 = new Array
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Winnername", 433, 11, 150, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name0", 265, 44, 130, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Name1", 444, 44, 130, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Losername", 611, 44, 150, 20));
            this.aryType1.push(this.creatSUI(topRender, this.parentTarget.baseAtlas, "Winner", 403, 4, 30, 30));



        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo: LeagueItem = <LeagueItem>$data.data
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Bg.skinName, UIData.publicUi, PuiData.A_LEAGUELISTBG);

                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.Line.skinName, "Line");

                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.LevPic.skinName, "lev" + $data.id);

                if (vo.type == 0) {
                    this.pushUI(this.aryType0);
                    this.popUI(this.aryType1);
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.aryType0[4].skinName, "VS");
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.aryType0[5].skinName, "VS");
                    for (let i = 0; i < vo.items.length; i++) {
                        var aaa = vo.items[i].name;
                        var aaa = getBaseName(aaa);
                        if (vo.items[i].guid == "") {
                            aaa = "轮空"
                        } else {
                            if (vo.items[i].result > 0) {
                                var result: string = vo.items[i].result == 1 ? ColorType.Reddb4051 + "(负)" : ColorType.Green2ca937 + "(胜)"
                                aaa += result;
                            }
                        }
                        var color: string = i % 2 ? ColorType.Green20a200 : ColorType.Redd92200;
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.aryType0[i].skinName, aaa, 16, TextAlign.CENTER, color);
                    }
                } else {
                    this.popUI(this.aryType0);
                    this.pushUI(this.aryType1);
                    if ($data.id == 0) {
                        UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.aryType1[4].skinName, "Winner");
                    } else {
                        UiDraw.clearUI(this.aryType1[4]);
                    }
                    for (let i = 0; i < vo.items.length; i++) {
                        var color: string
                        var str: string = vo.items[i].name;
                        if (str != "") {
                            str = getBaseName(str);
                            if (i == 0) {
                                if ($data.id == 0) {
                                    color = ColorType.colorff7200
                                } else {
                                    str += "(晋级)"
                                    color = ColorType.Green2ca937;
                                }
                            } else if (i == vo.items.length - 1) {
                                str += "(降级)"
                                color = ColorType.colorcd2000;
                            } else {
                                color = ColorType.Brown7a2f21;
                            }
                        }
                        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.aryType1[i].skinName, str, 16, TextAlign.CENTER, color);
                    }
                }
            } else {
                this.setnull();
            }
        }

        private pushUI($ary: Array<UICompenent>) {
            for (let i = 0; i < $ary.length; i++) {
                if (!$ary[i].parent) {
                    this._container.addChild($ary[i]);
                }
            }
        }

        private popUI($ary: Array<UICompenent>) {
            for (let i = 0; i < $ary.length; i++) {
                if ($ary[i].parent) {
                    this._container.removeChild($ary[i]);
                }
            }
        }

        private setnull(): void {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Bg.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Line.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.LevPic.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
        }
    }

}