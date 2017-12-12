module whisper {
    export class whisperUiPanel extends WindowMinUi {

        private _bootomRender: UIRenderComponent;
        private _faceRender: UIRenderComponent;
        private _midRender: UIRenderComponent;

        public dispose(): void {
            this._faceRender.dispose();
            this._faceRender = null;
            this._midRender.dispose();
            this._midRender = null;

            if (this.whisperFriendList) {
                this.whisperFriendList.dispose();
                this.whisperFriendList = null;
            }
            if (this.whisperChatListPanel) {
                this.whisperChatListPanel.dispose();
                this.whisperChatListPanel = null;
            }
            // if (this.applyList) {
            //     this.applyList.dispose();
            //     this.applyList = null;
            // }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            this.setBlackBg();
            this._bootomRender = new UIRenderComponent();
            this.addRender(this._bootomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._faceRender = new UIRenderComponent();
            this.addRender(this._faceRender);

            this._midRender.uiAtlas = new UIAtlas
        }
        public applyLoad(): void {
            this._bootomRender.uiAtlas = WindowUi.winUIAtlas
            this._midRender.uiAtlas.setInfo("ui/uidata/chat/whisper/whisper.xml", "ui/uidata/chat/whisper/whisper.png", () => { this.loadConfigCom() });
        }

        private _msg: string
        private _type: boolean

        private a_sendbtn: UICompenent
        private a_face: UICompenent
        private a_txt: UICompenent
        private a_txtbg: UICompenent
        private indexSlist: UICompenent
        private indexSlist1: UICompenent
        private loadConfigCom(): void {
            this._faceRender.uiAtlas = this._midRender.uiAtlas
            this.a_sendbtn = this.addEvntBut("a_sendbtn", this._faceRender);
            this.a_face = this.addEvntBut("a_face", this._faceRender);

            this.addUIList(["a_chatbg", "a_title"], this._midRender);
            this.a_txtbg = this.addEvntBut("a_txtbg", this._midRender);
            this.a_txt = this.addChild(this._faceRender.getComponent("a_txt"));


            this.indexSlist = this.addChild(this._midRender.getComponent("indexSlist"));
            this.indexSlist1 = this.addChild(this._midRender.getComponent("indexSlist1"));
            var cnew_bg_yellow = this.addChild(this._bootomRender.getComponent("cnew_bg_yellow"));
            this.setSizeForPanelUiCopy(cnew_bg_yellow, "a_leftbg_yellow", this._midRender);
            this._bootomRender.applyObjData();

            this._msg = "玩家输入聊天"
            this._type = false;
            this.refreshInputBfun(this._msg);

            this.applyLoadComplete();

        }

        private _itdata: SocialItemData
        public whisperChatListPanel: whisperChatListPanel
        public refreshData($data: SocialItemData) {
            this._itdata = $data;
            if (!this.whisperChatListPanel) {
                this.whisperChatListPanel = new whisperChatListPanel();
                this.whisperChatListPanel.init(this._midRender.uiAtlas);
            }
            this.whisperChatListPanel.show($data.guid);
        }

        public copyTxt($txt: string) {
            if (this._type) {
                this._msg += $txt;
            } else {
                this._msg = $txt;
            }
            this._type = true;
            this.refreshInputBfun(this._msg);
        }

        private _cansend: boolean;
        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_face:
                    var $skd: faceui.FaceUiEvent = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL)
                    $skd.data = { bfun: ($faceStr: string) => { this.faceFunBack($faceStr) } }
                    ModuleEventManager.dispatchEvent($skd);
                    break
                case this.a_sendbtn:
                    if (this.checkStr(this._msg) && this._type && this._itdata && this._cansend && this._itdata.inOnline) {
                        this._cansend = false;
                        NetManager.getInstance().protocolos.chat_whisper(this._itdata.guid, this._msg);
                        this._msg = "玩家输入聊天";
                        this._type = false;
                        this.refreshInputBfun(this._msg)
                        TimeUtil.addTimeOut(3000, () => {
                            this._cansend = true;
                        });
                    } else {
                        if (!this._itdata) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请选择聊天对象", 99);
                            return;
                        }
                        if (!this._type) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不能发送空字符", 99);
                            return;
                        }
                        if (!this.checkStr(this._msg)) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "含敏感词汇,请更正", 99);
                            return;
                        }
                        if (!this._cansend) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您说话太快了", 99);
                            return;
                        }
                        if (!this._itdata.inOnline) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "对方不在线", 99);
                            return;
                        }
                    }
                    break;
                case this.e_close:
                    this.hide();
                    break;
                case this.a_txtbg:
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._type ? this._msg : "", 0, 12)
                    break;
                default:
                    break;
            }
        }

        public faceFunBack($faceStr: string): void {
            if (this._type) {
                this._msg += $faceStr;
            } else {
                this._type = true;
                this._msg = $faceStr;
            }
            this.refreshInputBfun(this._msg)
        }

        //Fix
        public checkStr($str: string): boolean {
            return true;
        }

        private inputBfun($str: string): void {
            if ($str.length > 0) {
                this._type = true;
                this._msg = $str;
            } else {
                this._type = false;
                this._msg = "玩家输入聊天";
            }
            this.refreshInputBfun(this._msg)
        }

        private refreshInputBfun($str: string): void {
            LabelTextFont.writeSingleLabel(this._faceRender.uiAtlas, this.a_txt.skinName, $str, 16, TextAlign.LEFT, ColorType.colorb96d49);
        }

        public whisperFriendList: WhisperFriendList
        public show($guid: string) {
            UIManager.getInstance().addUIContainer(this);
            if (!this.whisperFriendList) {
                this.whisperFriendList = new WhisperFriendList();
                this.whisperFriendList.init(this._midRender.uiAtlas);
            }
            this.whisperFriendList.show($guid);
            this._cansend = true;
            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);

            if (this.whisperFriendList) {
                this.whisperFriendList.hide();
            }
            if (this.whisperChatListPanel) {
                this.whisperChatListPanel.hide();
            }
        }

        public resize(): void {
            super.resize();
            if (this.whisperFriendList) {
                this.whisperFriendList.left = this.indexSlist.parent.x / UIData.Scale + this.indexSlist.x
                this.whisperFriendList.top = this.indexSlist.parent.y / UIData.Scale + this.indexSlist.y
            }
            if (this.whisperChatListPanel) {
                this.whisperChatListPanel.left = this.indexSlist1.parent.x / UIData.Scale + this.indexSlist1.x
                this.whisperChatListPanel.top = this.indexSlist1.parent.y / UIData.Scale + this.indexSlist1.y
            }
        }
    }



    /**
     * 好友列表
     */
    export class WhisperFriendList extends SList {
        public constructor() {
            super();
            this.left = 182;
            this.top = 97;
        }


        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            this.initData();
        }

        private initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            this.setData(ary, WhisperFriendRender, 224, 397, 0, 90, 4, 256, 512, 1, 6);
        }

        /**
         * refreshData
         */
        private _slistdata: Array<SListItemData>;
        public refreshDataByNewData($guid: string): void {
            console.log("---创建_slistdata");
            var $ary: Array<SocialItemData> = GuidData.social.getFriendList();
            this._slistdata = this.getData($ary);
            this.refreshData(this._slistdata);
            this.selectItem($guid, this._slistdata);
        }

        public getData($ary: Array<SocialItemData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        private selectItem($guid: string, $ary: Array<SListItemData>) {
            var index: number = 0;
            for (var i = 0; i < $ary.length; i++) {
                var a: SocialItemData = $ary[i].data
                if (a.guid == $guid) {
                    // index = a.id
                    index = i
                    break;
                }
            }
            // this.setSelectIndexCopy(index);
            this.setSelectIndex(index);
        }

        /**
         * 数据变化时，更新数据源
         */
        public resetData() {
            if (this._slistdata) {
                var $ary: Array<SocialItemData> = GuidData.social.getFriendList();

                var chatary = Chat.ChatModel.getInstance().getChatItemByType(SharedDef.CHAT_TYPE_WHISPER);
                var vo = chatary[chatary.length - 1];
                if (vo && !vo.showLast && vo.s2c_send_chat.guid != GuidData.player.getGuid()) {
                    for (var index = 0; index < $ary.length; index++) {
                        if ($ary[index].guid == vo.s2c_send_chat.guid) {
                            var newItem: Array<SocialItemData> = $ary.splice(index, 1);
                            $ary.unshift(newItem[0]);
                            //把新消息显示到第一条。
                            break;
                        }
                    }
                }

                for (var i = 0; i < this._slistdata.length; i++) {
                    this._slistdata[i].data = $ary[i];
                }

                this.refreshDraw();
                // this.setSelectIndexCopy(this.getCurrentSelectIndex());
                this.setSelectIndex(this.getCurrentSelectIndex());
            }
        }

        public show($guid: string): void {
            UIManager.getInstance().addUIContainer(this);
            this.refreshDataByNewData($guid);
        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }

    export class WhisperFriendRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private ASicon: UICompenent;
        private ASname: UICompenent;
        private ASvip: UICompenent;
        private ASfac: UICompenent;
        private ASforce: UICompenent;
        private ASbg: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.ASbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "ASbg", 0, 0, 224, 87, 10, 10);
            $container.addChild(this.ASbg);
            this.ASbg.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.ASicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASicon", 8, 11, 68, 68);
            $container.addChild(this.ASicon);

            this.ASname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASname", 84, 12, 100, 20);
            $container.addChild(this.ASname);

            this.ASvip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASvip", 186, 16, 29, 14);
            $container.addChild(this.ASvip);

            this.ASfac = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASfac", 84, 33, 100, 20);
            $container.addChild(this.ASfac);

            this.ASforce = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "ASforce", 84, 56, 135, 20);
            $container.addChild(this.ASforce);
        }


        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyrender();
            }
            if (val) {
                var $evt = new WhisperUiEvent(WhisperUiEvent.SELECT_ITEM_EVENT);
                $evt.data = this.itdata;
                ModuleEventManager.dispatchEvent($evt);
            }
        }

        public get selected(): boolean {
            return this._selected;
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        public refreshDraw() {
            console.log("--this.itdata-", this.itdata);
            this.render(this.itdata);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                if (this.selected) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ASbg.skinName, UIData.publicUi, PuiData.Slist_select);
                } else {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.ASbg.skinName, UIData.publicUi, PuiData.Slist_nselect);
                }
                this.setIcon(this.itdata);

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.ASname.skinName, getBaseName(this.itdata.data.name), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                this.uiAtlas.upDataPicToTexture(getVipIconUrl(this.itdata.data.vip), this.ASvip.skinName);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.ASfac.skinName, this.itdata.data.faction == "" ? "暂无家族" : getBaseName(this.itdata.data.faction), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.ASforce.skinName, "战力 " + Snum(this.itdata.data.force), 16, TextAlign.LEFT, ColorType.Green2ca937);
            }
        }


        private setnull(): void {
            UiDraw.clearUI(this.ASicon);
            UiDraw.clearUI(this.ASname);
            UiDraw.clearUI(this.ASvip);
            UiDraw.clearUI(this.ASfac);
            UiDraw.clearUI(this.ASforce);
            UiDraw.clearUI(this.ASbg);
        }

        private setIcon($obj: SListItemData): void {
            IconManager.getInstance().getIcon(getTouPic($obj.data.gender),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.ASicon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    //绘制底色
                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    //绘制头像
                    ctx.drawImage($img, 0, 0, 82, 82, 3, 3, 62, 62);
                    //选中高亮绘制
                    if ($obj.selected) {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHR_C_66, new Rectangle(1, 1, 66, 66), UIData.publicUi);
                    }

                    if (!$obj.data.inOnline) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight))
                    }
                    // console.log("--$obj.data.level-", $obj.data.level);
                    // LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, String($obj.data.level), 16, 66, 45, TextAlign.RIGHT, ColorType.Brown7a2f21);

                    UiDraw.cxtDrawImg(ctx, PuiData.SKILL_LEV_BG, new Rectangle(15, 50, 53, 18), UIData.publicUi);

                    LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.Whitefffce6 + String($obj.data.level), 14, 42, 50, TextAlign.CENTER);

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        private equClick(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
            }
        }
    }

}