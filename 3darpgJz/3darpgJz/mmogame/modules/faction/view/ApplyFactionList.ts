module faction {

    export class ApplyFactionListVo {
        public data: FactionItemData;
    }

    export class ApplyFactionList extends SList {

        public constructor() {
            super();
            this.left = 305;
            this.top = 174;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, ApplyFactionRender, 357, 243, 0, 42, 5, 256, 512, 1, 8);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var $ary: Array<FactionItemData> = GuidData.faction.getApplyList();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        }

        public getData($ary: Array<FactionItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var applyFactionListVo: ApplyFactionListVo = new ApplyFactionListVo();
                applyFactionListVo.data = $ary[i];
                var item: SListItemData = new SListItemData;
                item.data = applyFactionListVo;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshDataByNewData();
            }
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class ApplyFactionRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private I2name: UICompenent;
        private I2vip: UICompenent;
        private I2lev: UICompenent;
        private I2zhanli: UICompenent;
        private I2btn: UICompenent;
        private I2bg: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container,$bgRender,$baseRender,$customizeRenderAry);

            this.I2zhanli = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2zhanli", 185, 11, 88, 20);
            $container.addChild(this.I2zhanli);

            this.I2name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2name", 5, 12, 100, 20);
            $container.addChild(this.I2name);

            this.I2vip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2vip", 106, 14, 29, 14);
            $container.addChild(this.I2vip);

            this.I2lev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2lev", 143, 12, 35, 20);
            $container.addChild(this.I2lev);

            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 277, 2, 78, 37);
            $container.addChild(this.I2btn);

            this.I2bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2bg", 0, 0, 357, 42);
            $container.addChild(this.I2bg);
        }



        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo: ApplyFactionListVo = <ApplyFactionListVo>$data.data
                this.I2btn.addEventListener(InteractiveEvent.Down, this.butClik, this);
                if (!($data.id % 2)) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.I2bg.skinName, "bg");
                }
                //名字
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, getBaseName(vo.data.name), 16, TextAlign.CENTER, ColorType.Orange853d07);
                // //vip等级
                // social.SocialUitl.drawVip(this.uiAtlas, this.I2vip.skinName, vo.data.vipLev ? vo.data.vipLev : 15);
                this.uiAtlas.upDataPicToTexture(getVipIconUrl(vo.data.vipLev),this.I2vip.skinName);
                //等级
                // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.I2lev.skinName, String(vo.data.level), ArtFont.num10, TextAlign.CENTER)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2lev.skinName, String(vo.data.level), 16, TextAlign.CENTER, ColorType.Orange853d07);
                //战力
                // ArtFont.getInstance().writeFontToSkinName(this.uiAtlas, this.I2zhanli.skinName, String(vo.data.force), ArtFont.num10, TextAlign.CENTER)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2zhanli.skinName, String(vo.data.force), 16, TextAlign.CENTER, ColorType.Orange853d07);

                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.I2btn.skinName, "btn_ok");
            } else {
                this.I2btn.removeEventListener(InteractiveEvent.Down, this.butClik, this);
                this.setnull();
            }
        }

        private setnull(): void {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2zhanli.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2vip.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2lev.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2btn.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2bg.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
        }

        private _num: number = 1;
        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.I2btn:
                    if (this.itdata) {
                        // console.log("同意");
                        this.sureJoin(this.itdata.data.data.guid);
                    }
                    break
                default:
                    break;
            }
        }

        private sureJoin(guid: string): void {
            //同意入帮
            NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_AGREE_JOIN, 0, 0, guid, "");
        }
    }

}