module ranking {

    export class ApplyFactionListVo {
        public data: RankItemData;
        public type: number;
        public typeShareDef: number;
        public items: Array<number>;
    }

    export class RankingType {
        public static RANK_TYPE_POWER: number = 0;
        public static RANK_TYPE_LEVEL: number = 1;
        public static RANK_TYPE_FACTION: number = 2;
        public static RANK_TYPE_WINGS: number = 3;
        public static RANK_TYPE_MOUNT: number = 4;
        public static RANK_TYPE_SINGLE_PVP: number = 5;
    }

    export class CurrentServerRankingList extends DataSlist {

        public constructor() {
            super();
            this.left = 221;
            this.top = 131;

        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.contextNum = 10;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, CurrentRankingRender, 427, 293, 0, 51, 5, 256, 512, 1, 8);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData($ary: Array<RankItemData>): void {
            // var $sListItemData = this.getData($ary);
            // this.refreshData($sListItemData);
        }

        private KeyShareDefType = [
            SharedDef.RANK_TYPE_POWER,// 战斗力排行
            SharedDef.RANK_TYPE_LEVEL,// 等级排行
            SharedDef.RANK_TYPE_FACTION,// 家族排行
            SharedDef.RANK_TYPE_WINGS,// 翅膀排行
            SharedDef.RANK_TYPE_MOUNT,// 坐骑排行
            SharedDef.RANK_TYPE_SINGLE_PVP// 单人PVP排行
        ];

        public sendrequest($type: number): void {
            this._type = $type;
            this.sendPageByNum(1, $type);
        }

        protected toSeversUrl(): void {
            var start = (this.pageId - 1) * this.contextNum + 1;
            var end = this.pageId * this.contextNum;
            console.log("==页数==", this.pageId, "==类型==", this.typeId, "==开始==", start, "==结束==", end);
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_POWER, this.KeyShareDefType[this.typeId], start, end);
        }

        private _type: number
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }


        protected meshSeverData($byte: ByteArray): void {
            var rankTypeId: number = $byte.readUint32(); //回调ID
            var $selfLevel: number = $byte.readInt();  //自己的排名
            var allNum: number = $byte.readUint32();//排行榜总长度
            var $list: Array<GuidObject> = new Array
            var len: number = $byte.readShort();
            for (var i: number = 0; i < len; i++) {
                var $guidObject: GuidObject = new RankData()
                var $intLen: number = $byte.readShort()
                for (var j: number = 0; j < $intLen; j++) {
                    var $intValue: number = $byte.readUint32();
                    $guidObject.SetUInt32(j, $intValue);
                }
                var $strLen: number = $byte.readShort()
                for (var k: number = 0; k < $strLen; k++) {
                    var $strValue: string = $byte.readUTF();
                    $guidObject.SetStr(k, $strValue);
                }
                $list.push($guidObject);
            }

            var data: RankQueryData = new RankQueryData();
            data.type = rankTypeId;
            data.rank = $selfLevel;
            data.list = $list;
            data.allNum = allNum;

            var ary: Array<RankItemData> = this.rankQueryPaser(data.list, data.type);
            this.getData(ary);

            var bb = new RankingEvent(RankingEvent.RANKING_OWN_EVENT);
            bb.data = data;
            ModuleEventManager.dispatchEvent(bb);
        }

        private rankQueryPaser(ary: Array<RankData>, type: number): Array<RankItemData> {
            var list: Array<RankItemData> = new Array;
            for (var i: number = 0; i < ary.length; i++) {
                var guidObj: RankData = ary[i];
                var itemData: RankItemData = this.getRankQueryData(guidObj, type);
                if (itemData) {
                    list.push(itemData);
                }
            }
            console.log("---data--", list);
            return list;
        }

        private getRankQueryData(guidObj: RankData, type: number): RankItemData {

            var guid: string = guidObj.getRankGuid()
            var name: string = guidObj.getRankName();
            if (!name || name == "") {
                return null;
            }
            var obj: RankItemData = new RankItemData();
            obj.guid = guid;
            obj.rank = guidObj.getRank();
            obj.name = name;
            obj.faction = guidObj.getRankFaction();
            obj.title = guidObj.getTitle();

            obj.power = guidObj.getRankPower();
            obj.coat = guidObj.getRankCoat();
            obj.weapon = guidObj.getRankWeapon();
            obj.vip = guidObj.getRankVip();
            obj.gender = guidObj.getRankGender();
            obj.level = guidObj.getLevel();
            obj.money = guidObj.getMoney();
            obj.divineNum = guidObj.getDivineNum();
            obj.factionActive = guidObj.getFactionActive();
            obj.factionIcon = guidObj.getFactionIcon();
            obj.mountLev = guidObj.getMountLev();
            obj.mountStart = guidObj.getMountStart();
            obj.like = guidObj.getLike();
            obj.wingid = guidObj.getWingId();
            return obj;
        }

        public getData($ary: Array<RankItemData>): void {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var applyFactionListVo: ApplyFactionListVo = new ApplyFactionListVo();
                applyFactionListVo.data = $ary[i];
                applyFactionListVo.type = this._type
                applyFactionListVo.typeShareDef = this.KeyShareDefType[this._type]
                // applyFactionListVo.items = this.getItems($ary[i]);
                var item: SListItemData = new SListItemData;
                item.data = applyFactionListVo;
                item.id = (this.pageId - 1) * this.contextNum + i;
                this.pushDataToList(item);
            }
        }


        protected getHanderMap(): Object {
            var obj: Object = new Object;
            obj[Protocols.SMSG_RANK_LIST_QUERY_RESULT] = ($byte: ByteArray) => { this.getSeverFunData($byte) };
            return obj;
        }

        public dispose():void{
            super.dispose();
            NetManager.getInstance().unReg(Protocols.SMSG_RANK_LIST_QUERY_RESULT);
        }
    }

    export class CurrentRankingRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private RankId: UICompenent;
        private Name1: UICompenent;
        private Name2: UICompenent;
        private Name3: UICompenent;
        private RankBg: UICompenent;
        private RankSelect: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.RankId = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "RankId", 30, 8, 29, 32);
            $container.addChild(this.RankId);

            this.Name1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Name1", 84, 14, 138, 20);
            $container.addChild(this.Name1);

            this.Name2 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Name2", 232, 14, 98, 20);
            $container.addChild(this.Name2);

            this.Name3 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Name3", 342, 14, 82, 20);
            $container.addChild(this.Name3);

            this.RankBg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "RankBg", 0, 0, 427, 51);
            $container.addChild(this.RankBg);

            this.RankSelect = this.creatGrid9SUI($baseRender, this.parentTarget.baseAtlas, "RankSelect", 0, 0, 427, 51, 8, 8);
            $container.addChild(this.RankSelect);

        }

        /**
         * KeyCoordinates：X的坐标集
         * KeyWidth：宽度集
         * 索引0对应的“家族排行”的控件坐标和宽度
         */
        // private KeyCoordinates = [[19, 72, 254, 427], [19, 72, 254, 427], [19, 72, 254, 427], [18, 72, 283, 405], [19, 72, 254, 427], [12, 57, 192, 361],[19, 72, 254, 427]];
        // private KeyWidth = [[29, 177, 166, 136], [29, 177, 166, 136], [29, 177, 166, 136], [29, 198, 116, 160], [29, 177, 166, 136], [29, 126, 165, 198],[29, 177, 166, 136]];

        public set selected(val: boolean) {
            this._selected = val;
            this.applyrender();
        }

        public get selected(): boolean {
            return this._selected;
        }

        private applyrender(): void {
            var vo: ApplyFactionListVo = <ApplyFactionListVo>this.itdata.data
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RankBg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
            }
            //名次
            if (vo.data.rank < 4) {
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.RankId.skinName, String(vo.data.rank));
            } else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.RankId.skinName, String(vo.data.rank), 16, TextAlign.CENTER, ColorType.Brown7a2f21,"",7);
            }

            switch (vo.type) {
                case RankingType.RANK_TYPE_POWER:
                    this.drawPowerRank(vo);
                    break;
                case RankingType.RANK_TYPE_LEVEL:
                    this.drawLevRank(vo);
                    break;
                case RankingType.RANK_TYPE_FACTION:
                    this.drawFactionRank(vo);
                    break;
                case RankingType.RANK_TYPE_WINGS:
                    this.drawWingsRank(vo);
                    break;
                case RankingType.RANK_TYPE_MOUNT:
                    this.drawMountRank(vo);
                    break;
                case RankingType.RANK_TYPE_SINGLE_PVP:
                    this.drawPWSRank(vo);
                    break;
                default:
                    break;
            }

            if (this.selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.RankSelect.skinName, UIData.publicUi, PuiData.A_HIGHT_F);
            } else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.RankSelect.skinName, "", 16, TextAlign.LEFT, "#d5e7ff");
            }

        }

        private drawPowerRank(vo: ApplyFactionListVo): void {
            //战力数据
            this.drawNameAndVip(this.Name1, vo, 1);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name2.skinName, getProfessional(vo.data.gender), 16, TextAlign.CENTER, ColorType.Brown7a2f21);


            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name3.skinName, Snum(vo.data.power), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

        }
        private drawLevRank(vo: ApplyFactionListVo): void {
            //等级数据
            this.drawNameAndVip(this.Name1, vo, 1);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name2.skinName, getProfessional(vo.data.gender), 16, TextAlign.CENTER, ColorType.Brown7a2f21);


            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name3.skinName, String(vo.data.level), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawPWSRank(vo: ApplyFactionListVo): void {
            //pvp
            this.drawNameAndVip(this.Name1, vo, 1);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name2.skinName, getProfessional(vo.data.gender), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name3.skinName, Snum(vo.data.level), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawWingsRank(vo: ApplyFactionListVo): void {
            //神羽数据
            this.drawNameAndVip(this.Name1, vo, 1);

            var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, vo.data.level);
            var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name2.skinName, String(wingInfo.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name3.skinName, getChiNum(wingInfo.id) + "阶", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawMountRank(vo: ApplyFactionListVo): void {
            //坐骑数据
            this.drawNameAndVip(this.Name1, vo, 1);


            var mountlevel = vo.data.mountLev;
            var mounttabvo = tb.TB_mount_base_vo.get_TB_mount_base_vo(mountlevel);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name2.skinName, mounttabvo.name, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name3.skinName, getChiNum(mountlevel) + "阶" + vo.data.mountStart + "星", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }
        private drawFactionRank(vo: ApplyFactionListVo): void {
            //家族数据
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name1.skinName, vo.data.faction ? getBaseName(vo.data.faction) : "暂无帮派", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name2.skinName, String(vo.data.level), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.Name3.skinName, Snum(vo.data.power), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                // this.setItemUiX(this.RankId, this.KeyCoordinates[$data.data.type][0]);
                // this.setItemUiX(this.Name1, this.KeyCoordinates[$data.data.type][1]);
                // this.setItemUiX(this.Name2, this.KeyCoordinates[$data.data.type][2]);
                // this.setItemUiX(this.Name3, this.KeyCoordinates[$data.data.type][3]);

                this.RankBg.addEventListener(InteractiveEvent.Up, this.equClick, this);
                //默认选择第一个
                if ($data.id == 0) {
                    this.equClick();
                } else {
                    this.applyrender();
                }
            } else {
                this.RankBg.removeEventListener(InteractiveEvent.Up, this.equClick, this);
                this.setnull();
            }
        }

        private equClick(): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染
            if (!this.selected) {
                this.setSelect();
            } else {
                this.applyrender();
            }
            var bb = new ranking.RankingEvent(ranking.RankingEvent.REFRESH_RANKING_RIGHTPANEL_EVENT);
            bb.data = this.itdata;
            ModuleEventManager.dispatchEvent(bb);
        }

        // private drawMountAndOrder($ui: UICompenent, $data: ApplyFactionListVo, $key: number): void {
        //     var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
        //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
        //     var x: number = Math.ceil(this.KeyWidth[$data.type][$key]);
        //     ArtFont.getInstance().writeFontToCtxLeft(ctx, String($data.data.mountLev - 1), ArtFont.CN1, 45, 0);
        //     UiDraw.cxtDrawImg(ctx, PuiData.A_JIE, new Rectangle(65, 0, 15, 16), UIData.publicUi);
        //     ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.data.mountStart), ArtFont.num10, 92, 0);
        //     UiDraw.cxtDrawImg(ctx, PuiData.A_XING, new Rectangle(103, 0, 15, 16), UIData.publicUi);
        //     // $data.data.level
        //     this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        // }

        // private writeArtFontByXY($UIAtlas: UIAtlas, $iconName: string, $str: string, $color: string = ArtFont.ORANGE_TXT, $tx: number, $ty: number, $txtInterval: number = 0): void {
        //     var rec: UIRectangle = $UIAtlas.getRec($iconName);
        //     $UIAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

        //     ArtFont.getInstance().writeFontToCtxCenten($UIAtlas.ctx, $str, $color, $tx, $ty + 2, $txtInterval)
        //     TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $UIAtlas.ctx);
        // }

        /**
         * $width:显示宽度
         */
        // private writeTxtByXY($uiAtlas: UIAtlas, $key: string, $str: string, fontsize: number = 12, $width: number, $ty: number, $baseColor: string = "#ffffff"): void {
        //     var $uiRect: UIRectangle = $uiAtlas.getRec($key);
        //     var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);

        //     $ctx.fillStyle = $baseColor
        //     $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
        //     var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str)
        //     TextRegExp.wrapText($ctx, $str, $baseColor, ($width - $textMetrics.width) / 2, $ty, $uiRect.pixelWitdh, 20);
        //     $uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
        // }

        /**
         * $key:对应KeyWidth中的索引
         */
        private drawNameAndVip($ui: UICompenent, $data: ApplyFactionListVo, $key: number): void {
            IconManager.getInstance().getIcon(getVipIconUrl($data.data.vip),
                ($img: any) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Brown7a2f21 + getBaseName($data.data.name), 16, 57, 0)

                    ctx.drawImage($img, 0, 0, 29, 14, 108, 4, 29, 14);
                    // social.SocialUitl.drawVipToCtx(ctx, GuidData.player.getVipLevel(), x + 1);
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        // private drawLevAndActive($ui: UICompenent, $data: ApplyFactionListVo): void {
        //     var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
        //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

        //     ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.data.level), ArtFont.num3, 41, 0);
        //     ArtFont.getInstance().writeFontToCtxCenten(ctx, String($data.data.factionActive), ArtFont.num3, 141, 0);
        //     this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        // }


        private setnull(): void {
            UiDraw.clearUI(this.RankId);
            UiDraw.clearUI(this.Name1);
            UiDraw.clearUI(this.Name2);
            UiDraw.clearUI(this.Name3);
            UiDraw.clearUI(this.RankBg);
            UiDraw.clearUI(this.RankSelect);
        }

        private _num: number = 1;
        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                default:
                    break;
            }
        }
    }

}