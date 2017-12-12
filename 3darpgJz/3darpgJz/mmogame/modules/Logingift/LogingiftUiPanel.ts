module logingift {

    export class LogingiftUiPanel extends UIPanel {
        private _publicbgRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _baImg: UIBackImg;

        public dispose(): void {
            this._baImg.dispose();
            this._baImg = null;
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this._publicbgRender.dispose();
            // this._publicbgRender = null;

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baImg = new UIBackImg();
            this._baImg.setImgInfo("ui/uidata/basebg/skillbg.png", 128, 64);
            this.addRender(this._baImg)


            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            // this._baseRender.setInfo("ui/uidata/ranking/ranking.xml", "ui/uidata/ranking/ranking.png", () => { this.loadConfigCom() });
            GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
                this._publicbgRender.uiAtlas = $publicbgUiAtlas;
                this._baseRender.uiAtlas.setInfo("ui/uidata/logingift/logingift.xml", "ui/uidata/logingift/logingift.png", () => { this.loadConfigCom() }, "ui/uidata/logingift/logingiftpc.png");
            });
        }


        private b_close: UICompenent;
        public a_info: UICompenent;
        public a_receiveday: UICompenent;
        public a_name: UICompenent;
        public btn_up: UICompenent;
        public btn_down: UICompenent;
        public role: UICompenent;
        public t_rightbg2_1: UICompenent;
        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._baseRender;
            this.t_rightbg2_1 = this.addChild(<UICompenent>this._publicbgRender.getComponent("t_rightbg2"));
            this.setUiSizeByName(this.t_rightbg2_1, "bg");

            this.b_close = this.addEvntBut("b_close", this._publicbgRender);
            this.setUiSizeByName(this.b_close, "close");

            this.addChild(<UICompenent>this._bgRender.getComponent("a_18_0"));
            var a_18_3 = this.addChild(<UICompenent>this._bgRender.getComponent("a_18_3"));
            a_18_3.isU = true;
            a_18_3.isV = true;
            var a_18_2 = this.addChild(<UICompenent>this._bgRender.getComponent("a_18_2"));
            a_18_2.isV = true;
            var a_18_1 = this.addChild(<UICompenent>this._bgRender.getComponent("a_18_1"));
            a_18_1.isU = true;

            this.addUIList(["line", "a_18_0"], this._bgRender);


            this.a_info = this.addChild(<UICompenent>this._topRender.getComponent("a_info"));
            this.a_receiveday = this.addChild(<UICompenent>this._topRender.getComponent("a_receiveday"));
            this.a_name = this.addChild(<UICompenent>this._topRender.getComponent("a_name"));
            this.btn_up = this.addEvntBut("btn_up", renderLevel);
            this.btn_down = this.addEvntBut("btn_down", renderLevel);

            this.addUIList(["a_2", "a_4", "a_1", "a_3"], renderLevel);

            this.role = this.addChild(<UICompenent>renderLevel.getComponent("role"));
            this.role.isVirtual = true;
            this.role.addEventListener(InteractiveEvent.Down, this.A_left_bg_MouseDown, this);
            this.addPersonChar();
            this.applyLoadComplete();
        }

        private setUiSizeByName($ui: UICompenent, $name: string): void {
            var $temp: UICompenent = this._bgRender.getComponent($name);
            $ui.x = $temp.x
            $ui.y = $temp.y
            $ui.width = $temp.width
            $ui.height = $temp.height
        }


        public logingiftList: LogingiftList;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData();
            if (!this.logingiftList) {
                this.logingiftList = new LogingiftList();
                this.logingiftList.init(this._baseRender.uiAtlas);
            }
            this.logingiftList.show();
            this.resize();
        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


        public resize(): void {
            super.resize();
            if (this.logingiftList) {
                this.logingiftList.left = this.t_rightbg2_1.parent.x / UIData.Scale + this.t_rightbg2_1.x + 8
                this.logingiftList.top = this.t_rightbg2_1.parent.y / UIData.Scale + this.t_rightbg2_1.y + 6
            }
            this.resizeRole();
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_close:
                    console.log("b_close");
                    ModuleEventManager.dispatchEvent(new logingift.LogingiftEvent(logingift.LogingiftEvent.HIDE_Logingift_EVENT));
                    break
                case this.btn_up:
                    if (this._indx == 1) {
                        return;
                    }
                    this._indx--;
                    this.drawView();
                    break;
                case this.btn_down:
                    var arytab: Array<tb.TB_login_activity_preview> = tb.TB_login_activity_preview.get_TB_login_activity_preview();
                    if (this._indx == arytab[arytab.length - 1].id) {
                        return;
                    }
                    this._indx++;
                    this.drawView();
                    break;

                default:
                    break;
            }
        }

        /**
         * resetData
         */
        private _indx: number
        public resetData(): void {
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, "A_curday", String(GuidData.player.getLogingiftDay()), ArtFont.num7, 5);

            this._indx = LogingiftModel.getInstance().getnearday();
            this.drawView();

        }

        private _posy: number;
        private _scale: number;
        private _lastType: number;
        private drawView(): void {
            var tab: tb.TB_login_activity_preview = tb.TB_login_activity_preview.get_TB_login_activity_previewById(this._indx);

            this.drawName(this.a_name, getload_LogingiftUrl(tab.preview_name));
            ArtFont.getInstance().writeFontToSkinNameCenter(this._baseRender.uiAtlas, this.a_receiveday.skinName, String(tab.day), ArtFont.num26, 5);
            this.drawName(this.a_info, getload_LogingiftInfoUrl(tab.preview_info));

            if (tab.type == 1) {
                this.showDisPlay.showAvatarVisibel = false
                this.showDisPlay.setAvatar(6302);
                this.showDisPlay.setWeaponByAvatar(tab.preview_model);
                this._scale = 4
                this._posy = -40
            } else {
                this.showDisPlay.showAvatarVisibel = true
                this.showDisPlay.removePart(SceneChar.WEAPON_PART);
                this.showDisPlay.setAvatar(tab.preview_model);
                this._scale = 3
                this._posy = -110
            }


            this.resizeRole();

        }

        private drawName($key: UICompenent, $url: string): void {
            IconManager.getInstance().getIcon($url,
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($key.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, ($rec.pixelWitdh / 2) - ($img.width / 2), $rec.pixelHeight - $img.height, $img.width, $img.height);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private _rotationFun: Function;
        private addPersonChar(): void {
            this.showDisPlay = new Person2DChar();
            this._baseRender.addModel(this.showDisPlay);
            this._rotationFun = (d: number) => { this.rotationRole(); }
        }


        private _lastMouseX: number = 0;
        private _lastRoleRotatioinY: number = 0;
        private showDisPlay: Person2DChar;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastRoleRotatioinY = this.showDisPlay.rotationY;

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {
            this.showDisPlay.rotationY = this._lastRoleRotatioinY - (evt.x - this._lastMouseX);
        }
        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }
        private rotationRole(): void {
            this.showDisPlay.rotationY -= 0.5;
        }

        private resizeRole(): void {

            if (this.showDisPlay) {
                this.showDisPlay.resize();
                this.showDisPlay.scale = this._scale * UIData.Scale;
                this.showDisPlay.rotationY = 0
                this.showDisPlay.y = this._posy * UIData.Scale;
                this.showDisPlay.x = 205 * UIData.Scale;
            }
        }
    }


    /**
     * 登入大礼list
     */
    export class LogingiftList extends SList {

        public constructor() {
            super();
            this.left = 351;
            this.top = 75;

        }

        public init($uiAtlas: UIAtlas): void {
            LogingiftListRender.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, LogingiftListRender, 602, 465, 0, 86, 5, 512, 512, 1, 7);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var ary = LogingiftModel.getInstance().getList();
            var $sListItemData: Array<SListItemData> = this.getData(ary);
            this.refreshData($sListItemData);
        }


        public getData($data: Array<LogingiftVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        private _type: number
        private _start: number
        private _end: number
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class LogingiftListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Day: UICompenent;
        private Reward0: UICompenent;
        private Reward1: UICompenent;
        private Reward2: UICompenent;
        private Reward3: UICompenent;
        private Reward4: UICompenent;
        private Btn: UICompenent;
        private Itembg: UICompenent;

        private _ary: Array<UICompenent>
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Day = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Day", 30, 29, 81, 23);
            $container.addChild(this.Day);

            this._ary = new Array;
            this.Reward0 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward0", 124, 8, 64, 64);
            $container.addChild(this.Reward0);
            this.Reward0.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward0);
            this.Reward1 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward1", 194, 8, 64, 64);
            $container.addChild(this.Reward1);
            this.Reward1.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward1);
            this.Reward2 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward2", 264, 8, 64, 64);
            $container.addChild(this.Reward2);
            this.Reward2.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward2);
            this.Reward3 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward3", 334, 8, 64, 64);
            $container.addChild(this.Reward3);
            this.Reward3.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward3);
            this.Reward4 = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Reward4", 404, 8, 64, 64);
            $container.addChild(this.Reward4);
            this.Reward4.addEventListener(InteractiveEvent.Up, this.equClick, this);
            this._ary.push(this.Reward4);

            this.Btn = this.creatSUI($baseRender, LogingiftListRender.baseAtlas, "Btn", 489, 23, 98, 36);
            $container.addChild(this.Btn);
            this.Btn.addEventListener(InteractiveEvent.Up, this.btnChick, this);

            this.Itembg = this.creatGrid9SUI($bgRender, LogingiftListRender.baseAtlas, "Itembg", 0, 0, 601, 80, 20, 20);
            $container.addChild(this.Itembg);
        }


        private drawIcon($ui: UICompenent): void {
            var vo: LogingiftVo = this.itdata.data
            var ary: Array<number> = $ui.data
            IconManager.getInstance().getIcon(GameData.getIconCopyUrl(ary[0]),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 60, 60);

                    if (vo.state == 1) {
                        //领取
                        UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                    } else if (vo.state == 3) {
                        //图像灰
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 64, 64))
                    }

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawBtn(): void {
            var vo: LogingiftVo = this.itdata.data

            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Btn.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var btnstateRect1: UIRectangle = LogingiftListRender.baseAtlas.getRec(String(vo.state));
            ctx.drawImage(LogingiftListRender.baseAtlas.useImg, btnstateRect1.pixelX, btnstateRect1.pixelY, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight, 0, 0, btnstateRect1.pixelWitdh, btnstateRect1.pixelHeight);

            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private drawTitle(): void {
            var vo: LogingiftVo = this.itdata.data
            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.Day.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            var LibaoRect1: UIRectangle = LogingiftListRender.baseAtlas.getRec("Di")
            ctx.drawImage(LogingiftListRender.baseAtlas.useImg, LibaoRect1.pixelX, LibaoRect1.pixelY, LibaoRect1.pixelWitdh, LibaoRect1.pixelHeight, 0, 0, LibaoRect1.pixelWitdh, LibaoRect1.pixelHeight);
            
            var total: number = ArtFont.getInstance().getAirFontWidth(ctx, String(vo.data.day), ArtFont.num26, 5);
            ArtFont.getInstance().writeFontToCtxLeft(ctx, String(vo.data.day), ArtFont.num26, 23, 0, 5);

            var LibaoRect2: UIRectangle = LogingiftListRender.baseAtlas.getRec("Tian")
            ctx.drawImage(LogingiftListRender.baseAtlas.useImg, LibaoRect2.pixelX, LibaoRect2.pixelY, LibaoRect2.pixelWitdh, LibaoRect2.pixelHeight, total+26, 0, LibaoRect2.pixelWitdh, LibaoRect2.pixelHeight);
            
            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo: LogingiftVo = this.itdata.data
                for (var i = 0; i < 5; i++) {
                    if (i < vo.data.reward.length) {
                        this._ary[i].data = vo.data.reward[i]
                        this.drawIcon(this._ary[i]);
                    } else {
                        this._ary[i].data = null
                        LabelTextFont.writeSingleLabel(this.uiAtlas, this._ary[i].skinName, "", 16, TextAlign.LEFT, "#d6e7ff");
                    }
                }

                this.drawTitle();

                this.drawBtn();

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Itembg.skinName, UIData.publicUi, PuiData.ITEMBG);

            }

        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            var ary: Array<number> = evt.target.data
            if (ary && ary.length > 0) {
                //查看物品详情
                var aa: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
                aa.id = ary[0]
                ModuleEventManager.dispatchEvent(aa);
            }
        }

        private btnChick(evt: InteractiveEvent): void {
            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                var vo: LogingiftVo = this.itdata.data
                if (vo.state == 1) {
                    NetManager.getInstance().protocolos.get_login_activity_reward(vo.data.id);
                }
            }
        }


        private setnull(): void {
            LabelTextFont.clearLabel(this.uiAtlas, this.Day.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward0.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward1.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward2.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward3.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Reward4.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Btn.skinName);
            LabelTextFont.clearLabel(this.uiAtlas, this.Itembg.skinName);
        }
    }

}