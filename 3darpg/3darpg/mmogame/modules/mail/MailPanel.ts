module email {
    export class MailPanel extends WindowMinUi {

        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _redPointRender: RedPointRender;

        public _baseUiAtlas: UIAtlas;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this.setBlackBg();

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

        }
        public applyLoad(): void {
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/mail/mail.xml", "ui/uidata/mail/mail.png", () => { this.loadConfigCom() }, "ui/uidata/mail/mailuse.png");
        }
        private uiAtlasComplet: boolean = false;

        private mailnumLab: UICompenent;
        private mailTitle: UICompenent;
        private mailContent: UICompenent;
        private getBtn: UICompenent;

        private mailIconLab: UICompenent;
        private mailIconAry: Array<UICompenent>;
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;

            this.addUIList(["t_win_title", "t_list_bg", "t_content_bg"], this._bgRender);

            var ui: UICompenent;
            ui = this.addChild(this._baseRender.getComponent("t_del_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.delread, this);
            ui = this.addChild(this._baseRender.getComponent("t_delall_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.getAll, this);
            this._redPointRender.getRedPointUI(this, 4, new Vector2D(ui.x + ui.width, ui.y));
            this.mailnumLab = this.addChild(this._baseRender.getComponent("t_mail_num"));
            this.getBtn = this._baseRender.getComponent("t_get_btn");
            this.getBtn.addEventListener(InteractiveEvent.Up, this.getclick, this);


            this.mailTitle = this.addChild(this._baseRender.getComponent("t_title"));
            this.mailContent = this.addChild(this._baseRender.getComponent("t_content"));
            this.mailIconLab = this.addChild(this._baseRender.getComponent("t_icon_lab"));


            this.mailIconAry = new Array;
            for (var i: number = 0; i < 4; i++) {
                this.mailIconAry.push(this.addChild(this._baseRender.getComponent("t_icon" + i)));
            }

            this.addLists();
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }

        public mailChg($type: number): void {
            if ($type == 1) {
                this.windowRankSList.refreshDraw();
                this.drawShowData();
            } else {
                this.windowRankSList.setRankData();
            }
            this.drawNum();
        }

        private delread($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.remove_mail_one_step();
        }
        private getAll($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            NetManager.getInstance().protocolos.pick_mail_one_step();
        }

        private getclick($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._showData) {
                NetManager.getInstance().protocolos.pick_mail(this._showData.indx);
            }
        }

        private _showData: GiftBaseVo;
        public setShowData($data: GiftBaseVo): void {
            this._showData = $data;

            if ($data) {
                this.drawShowData();
            } else {
                this.clearShowData();
                this.removeChild(this.getBtn);
            }


        }
        public clearShowData(): void {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailTitle.skinName, "无邮件", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            UiDraw.clearUI(this.mailContent);
            UiDraw.clearUI(this.mailIconLab);
            for (var i: number = 0; i < this.mailIconAry.length; i++) {
                UiDraw.clearUI(this.mailIconAry[i]);
            }
        }
        public drawShowData(): void {

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailTitle.skinName, this._showData.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailContent.skinName, "   " + this._showData.desc, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            var strAry: Array<string> = new Array;

            if (this._showData.item != "") {
                strAry = this._showData.item.split(",");
                if (this._showData.isGetItem) {
                    this.removeChild(this.getBtn);
                } else {
                    this.addChild(this.getBtn);
                }
            } else {
                this.removeChild(this.getBtn);
            }

            for (var i: number = 0; i < this.mailIconAry.length; i++) {
                if (strAry[i * 2]) {
                    IconManager.getInstance().drawItemIcon60(this.mailIconAry[i], Number(strAry[i * 2]), Number(strAry[i * 2 + 1]));
                } else {
                    IconManager.getInstance().drawItemIcon60(this.mailIconAry[i], 0, 0);
                }
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailIconLab.skinName, "奖励附件：", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        }
        public drawNum(): void {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mailnumLab.skinName, ColorType.Brown7a2f21 + "邮件数量：" +
                ColorType.Green2ca937 + this.windowRankSList.getDataSize() + "/" + SharedDef.MAX_GIFTPACKS_INFO_COUNT, 16, TextAlign.LEFT);
        }
        private windowRankSList: MailSList;
        private addLists(): void {
            this.windowRankSList = new MailSList;
            this.windowRankSList.init(this._baseUiAtlas, this);
        }
        public resize(): void {
            super.resize();

        }
        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }
        }
        public hide(): void {
            this.windowRankSList.hide()
            UIManager.getInstance().removeUIContainer(this);
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.windowRankSList.show();
            this.drawNum();
            //this.windowRankSList.setRankData();
        }
    }

    export class MailSList extends SList {

        private _panel: MailPanel;
        public constructor() {
            super();
        }
        public init($uiAtlas: UIAtlas, $panel: MailPanel): void {
            MailSListRender.baseAtlas = $uiAtlas;
            this._panel = $panel;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            var w: number = 230;
            var h: number = 320;
            this.setData($ary, MailSListRender, w, h, 230, 90, 4, 256, 512, 1, 7);
            this.center = -180;
            this.middle = -10;
        }
        public setRankData(): void {
            var $data: Array<GiftBaseVo> = GuidData.giftPacks.getGiftDataItem()
            var $tbDataArr: Array<SListItemData> = new Array();
            for (var i: number = 0; i < $data.length; i++) {
                var $vo: SListItemData = new SListItemData();
                if ($data[i]) {
                    $vo.data = $data[i];
                }
                $vo.id = i;
                $tbDataArr.push($vo);
            }

            this.refreshData($tbDataArr);
            if ($data.length) {
                this.setSelectIndex(0);
            }
            this._panel.setShowData($data[0]);
        }

        public setSelect($item: SListItem): void {
            super.setSelect($item);
            this._panel.setShowData($item.itdata.data);
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.setRankData();
            this.setShowLevel(2);
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }

        }
    }

    export class MailSListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private r_title: UICompenent;
        private r_time: UICompenent;
        private r_lasttime: UICompenent;
        private r_bg: UICompenent;
        private r_icon: UICompenent;


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.r_bg = this.creatGrid9SUI($bgRender, MailSListRender.baseAtlas, "s_bg", 0, 0, 224, 90, 10, 10);
            $container.addChild(this.r_bg);
            this.r_bg.addEventListener(InteractiveEvent.Up, this.onclick, this);

            this.r_icon = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_icon", 9, 9, 60, 64);
            $container.addChild(this.r_icon);

            this.r_title = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_title", 82, 12, 135, 20);
            $container.addChild(this.r_title);

            this.r_time = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_time", 82, 32, 135, 20);
            $container.addChild(this.r_time);

            this.r_lasttime = this.creatSUI($baseRender, MailSListRender.baseAtlas, "s_lasttime", 82, 56, 135, 20);
            $container.addChild(this.r_lasttime);

        }

        private onclick($e: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                UiTweenScale.getInstance().changeButSize($e.target);
                this.parentTarget.setSelect(this);
            }
        }

        public set selected(val: boolean) {
            if (this._selected == val) {
                return;
            }
            this._selected = val;
            if (this._selected) {
                NetManager.getInstance().protocolos.read_mail(this.itdata.data.indx);
            }
            if (this.itdata && this.itdata.data) {
                this.drawSel();
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        private drawSel(): void {
            if (this._selected) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.Slist_select);
            } else {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.Slist_nselect);
            }
        }

        private applyRender(): void {
            this.drawSel();

            var $vo: GiftBaseVo = this.itdata.data;
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_title.skinName, ColorType.Brown7a2f21 + $vo.name, 16, TextAlign.LEFT);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_time.skinName, ColorType.Brown7a2f21 + TimeUtil.getLocalTime0($vo.startTime), 16, TextAlign.LEFT);

            var $ts: number = $vo.endTime - GameInstance.getServerNow();
            $ts = Math.floor($ts / 60 / 60 / 12);
            if ($ts > 0) {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_lasttime.skinName, ColorType.Green2ca937 + "剩余时间:" + $ts + "天", 16, TextAlign.LEFT);
            } else {
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_lasttime.skinName, ColorType.Green2ca937 + "已过期", 16, TextAlign.LEFT);
            }

            if ($vo.item != "") {
                this.drawIcon($vo.isGetItem);
            } else {
                this.drawIcon($vo.isRead);
            }



        }

        private drawIcon($isRead: boolean): void {
            var $ui: UICompenent = this.r_icon;
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect: UIRectangle = MailSListRender.baseAtlas.getRec($isRead ? "u_unlock" : "u_lock");
            ctx.drawImage(MailSListRender.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight,
                0, 0, $rec.pixelWitdh, $rec.pixelHeight);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public refreshDraw(): void {
            if (this.itdata && this.itdata.data) {
                this.applyRender();
            } else {
                this.setnull();
            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if (this.itdata && this.itdata.data) {
                this.applyRender();
            } else {
                this.setnull();
            }
        }
        private setnull(): void {

            UiDraw.clearUI(this.r_bg);
            UiDraw.clearUI(this.r_lasttime);
            UiDraw.clearUI(this.r_time);
            UiDraw.clearUI(this.r_icon);
            UiDraw.clearUI(this.r_title);
        }

    }

    export class WindowRankVo {
        public rank: string;
        public name: string;
        public val: string;
    }
}
