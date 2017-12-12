module whisper {

    export class WhisperChatVo {
        public basevo: Chat.ChatVo
        public items: Array<number>;
        public id: number;
    }

    export class whisperChatListPanel extends SList {
        public constructor() {
            super();
            this.left = 428;
            this.top = 100;
            this.setShowLevel(6);
        }


        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            this.initData();
        }

        private initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            this.setData(ary, WhisperChatRender, 332, 322, 0, 87, 3, 512, 256, 1, 6);
        }

        /**
         * refreshData
         */
        public guid: string = "";
        public refreshDataByNewData($guid: string): void {
            this.guid = $guid;
            var $arr: Array<Chat.ChatVo> = Chat.ChatModel.getInstance().getChatItemByToGuid($guid);
            var $sListItemData = this.getData($arr);

            this.refreshData($sListItemData);
            this.scrollIdx($sListItemData.length - 1);

            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        }

        public getData($ary: Array<Chat.ChatVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;

            for (var i: number = 0; i < $ary.length; i++) {
                var $data: WhisperChatVo = new WhisperChatVo();
                $data.basevo = $ary[i];
                $data.items = [11];
                $data.id = i;

                var item: SListItemData = new SListItemData;
                item.data = $data;
                // item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show($guid: string): void {
            UIManager.getInstance().addUIContainer(this);
            this.refreshDataByNewData($guid);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class WhisperChatRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private BSname: UICompenent;
        private BStime: UICompenent;
        private BSbg: UICompenent;
        private BStext: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.BSbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "BSbg", 0, 21, 332, 60, 18, 18);
            $container.addChild(this.BSbg);
            this.BSbg.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.BSname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BSname", 8, 0, 100, 20);
            $container.addChild(this.BSname);

            this.BStime = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BStime", 108, 0, 100, 20);
            $container.addChild(this.BStime);

            this.BStext = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "BStext", 9, 32, 317, 39);
            $container.addChild(this.BStext);
        }

        public set selected(val: boolean) {
            this._selected = val;
            if (this.itdata) {
                this.applyrender();
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

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                var vo: Chat.ChatVo = this.itdata.data.basevo;
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BSname.skinName, getBaseName(vo.s2c_send_chat.name), 16, TextAlign.LEFT, vo.isSelf ? ColorType.Green2ca937 : ColorType.color4392ff);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.BStime.skinName, vo.time, 16, TextAlign.LEFT, vo.isSelf ? ColorType.Green2ca937 : ColorType.color4392ff);

                // this.drawTxt(vo);

                LabelTextFont.writeTextAutoVerticalCenter(this.uiAtlas, this.BStext.skinName, vo.contentTxt, 16, ColorType.Brown7a2f21, 300);

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.BSbg.skinName, UIData.publicUi, PuiData.CHATBG);

            }
        }

        // private drawTxt($vo: Chat.ChatVo ) {
        //     var $skillrec: UIRectangle = this.uiAtlas.getRec(this.BStext.skinName);
        //     var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);

        //     $ctx.font = (true ? "bolder " : "") + " " + 16 + "px " + UIData.font;

        //     FaceFontLabel.wrapFaceText($ctx, ColorType.Brown7a2f21 + $vo.contentTxt, 16, ColorType.Brown7a2f21, 1, 1, 300, 20,false)

        //     this.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
        // }

        private setnull(): void {
            UiDraw.clearUI(this.BSname);
            UiDraw.clearUI(this.BStime);
            UiDraw.clearUI(this.BSbg);
            UiDraw.clearUI(this.BStext);
        }



        private equClick(evt: InteractiveEvent): void {
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                //选中，事件派发
                this.setSelect();
                PopMenuUtil.show(this.itdata, (value: number) => { this.popBackFun(value) }, evt.x, evt.y);
            }
        }

        private popBackFun(value: number): void {
            if (value == 11) {
                // console.log("复制");
                var aa = new WhisperUiEvent(WhisperUiEvent.COPY_ONE_MSG_EVENT);
                aa.data = this.itdata.data.basevo.contentTxt;
                ModuleEventManager.dispatchEvent(aa);
            }
        }
    }
}