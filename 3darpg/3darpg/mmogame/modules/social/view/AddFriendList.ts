﻿module social {

    export class AddFriendList extends SList {

        public constructor() {
            super();
            this.left = 184;
            this.top = 140;
            this.setShowLevel(4);
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        public recommend(): void {
            NetManager.getInstance().protocolos.social_recommend_friend();
        }
        private _ary: Array<SListItemData>;
        private initData(): void {
            this._ary = new Array<SListItemData>();
            this.setData(this._ary, AddFriendItemRender, 593, 264, 0, 82, 3, 256, 512, 1, 5);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData($ary: Array<SocialItemData>): void {
            this._ary = this.getData($ary);
            this.refreshData(this._ary);
        }

        public refreshDataByindex($index: number): void {
            this._ary.splice($index, 1);
            for (var i = 0; i < this._ary.length; i++) {
                this._ary[i].id = i;
            }
            this.refreshData(this._ary);
        }

        public getData($ary: Array<SocialItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var data: SocialItemData = $ary[i];
                var item: SListItemData = new SListItemData;
                item.data = data;
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                // this.recommend();
            }
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class AddFriendItemRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private icon1: UICompenent;
        private name1: UICompenent;
        private vip1: UICompenent;
        private fam1: UICompenent;
        private btn1: UICompenent;
        private bg1: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.icon1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Icon", 9, 6, 68, 68);
            $container.addChild(this.icon1);
            this.icon1.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.fam1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ifac", 299, 30, 100, 20);
            $container.addChild(this.fam1);

            this.name1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Iname", 93, 30, 100, 20);
            $container.addChild(this.name1);

            this.vip1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ivip", 199, 33, 29, 14);
            $container.addChild(this.vip1);

            this.btn1 = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Ibtn", 499, 19, 72, 46);
            $container.addChild(this.btn1);
            this.btn1.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.bg1 = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Ibg", 0, 0, 593, 82);
            $container.addChild(this.bg1);
            // this.bg1.addEventListener(InteractiveEvent.Down, this.butClik, this);
        }



        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data) {
                if (!($data.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.bg1.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
                this.setIcon($data.data);
                // //vip等级
                this.uiAtlas.upDataPicToTexture(getVipIconUrl($data.data.vip), this.vip1.skinName);
                // ArtFont.getInstance().writeFontToSkinName(this._bgRender.uiAtlas, this.vip1.skinName, $data.data.vip, ArtFont.num21)
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.name1.skinName, getBaseName($data.data.name), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.fam1.skinName, $data.data.faction == "" ? "暂无家族" : getBaseName($data.data.faction), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.btn1.skinName, "add");
            } else {
                this.setnull();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.bg1);
            UiDraw.clearUI(this.icon1);
            UiDraw.clearUI(this.vip1);
            UiDraw.clearUI(this.name1);
            UiDraw.clearUI(this.fam1);
            UiDraw.clearUI(this.btn1);
        }

        private setIcon($obj): void {
            IconManager.getInstance().getIcon(getTouPic($obj.gender),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.icon1.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    //绘制底色
                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //绘制头像
                    ctx.drawImage($img, 0, 0, 82, 82, 3, 3, 62, 62);

                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_LEV_BG, new Rectangle(15, 50, 53, 18), UIData.publicUi);

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String($obj.level), 14, 42, 50, TextAlign.CENTER);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private _num: number = 1;
        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.btn1:
                    if (this.itdata) {
                        // console.log("申请");
                        this.addFriend();
                    }
                    break
                default:
                    break;
            }
        }

        public addFriend(): void {
            NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.guid);
            var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHADDlIST_EVENT);
            $evt.index = this.itdata.id;
            ModuleEventManager.dispatchEvent($evt);
        }
    }

}