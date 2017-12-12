module Chat {

    export class CellClikBox {
        public headRect: Rectangle;
        public chatRect: Rectangle;
        public chatVo: ChatVo;
        private testPoint($x: number, $y: number, $rect: Rectangle): boolean {
            if ($x > $rect.x && $x < ($rect.x + $rect.width) && $y > $rect.y && $y < ($rect.y + $rect.height)) {
                return true;
            } else {
                return false;
            }
        }
        public clik($x: number, $y: number): number {
            if (this.testPoint($x, $y, this.headRect)) {
                return 1
            } else {
                if (this.testPoint($x, $y, this.chatRect)) {
                    return 2
                }
            }
            return 0
        }

    }
    export class ChatListContextComponent extends UIRenderComponent {

        public chatPanel: UIConatiner
        public pageBasePos: Vector2D = new Vector2D(0, 0)
        public constructor() {
            super();
        }
        public makeChatData(value: number): void {

            this.refresh();
        }
        private _textureRect: Rectangle = new Rectangle(0, 0, 512, 1024)
        public configUIAtlas($perent: UIConatiner): void {
            this.chatPanel = $perent
            this.uiAtlas = new UIAtlas()
            this.uiAtlas.configData = new Array();
            // this.uiAtlas.configData.push(this.uiAtlas.getObject("ccav", 0, 0, ChatPanel.num350, 1024, this._textureRect.width, this._textureRect.height));
            this.uiAtlas.configData.push(this.uiAtlas.getObject("ccav", 0, 0, 512, 1024, this._textureRect.width, this._textureRect.height));

            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);
            this.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this.uiAtlas.ctx);

            this.uiAtlas.ctx.fillStyle = "#ff0000";
            this.uiAtlas.ctx.fillRect(0, 0, 512, 256);
            this.uiAtlas.updateCtx(this.uiAtlas.ctx, 0, 0);

            this.pageMc = <UICompenent>this.creatBaseComponent("ccav");
            $perent.addChild(this.pageMc);

            this.pageMc.x = 0;
            this.pageMc.y = 0;
            this.pageMc.width = 512 / this._textScale;
            this.pageMc.height = 1024 / this._textScale;
        }

        private pageMc: UICompenent
        public resize(): void {
            super.resize();
            this.pageMc.x = this.pageBasePos.x

        }
        public get pagey(): number {
            return this.disRect.y;
        }
        public set pagey(value: number) {
            var $num: number = Math.max(value, 0);
            if (this.totalH > this.disRect.height) {
                $num = Math.min($num, this.totalH - this.disRect.height);
            } else {
                $num = 0
            }
            this.disRect.y = $num;
            this.resetNewPageMcY();

        }
        public uptoCtx(): void {
            this.drawList()
        }
        private _textScale: number = 1.40
        public set textScale(value: number) {
            this._textScale = value;
        }
        public get textScale(): number {
            return this._textScale;
        }

        public textHeight: number = 220;
        private baseFontsize: number = 12;
        private textFontStr: string = "bolder 22px Georgia";

        private getCharCellRect($vo: ChatVo): Rectangle {

            this.uiAtlas.ctx.font = this.textFontStr
            var $rect: Rectangle = new Rectangle;

            var $metrics: TextMetrics = TextRegExp.getTextMetrics(this.uiAtlas.ctx, $vo.contentTxt);

            var $cellNum: number = Math.ceil($metrics.width / ChatModel._textWidth + 0.01)
            if ($cellNum == 1) {
                $rect.width = $metrics.width + 50
            } else {
                $rect.width = ChatModel._textWidth + 50
            }
            $rect.height = $cellNum * 30 + 20
            return $rect;

        }
        private _countitem: Array<ChatVo>;
        private disRect: Rectangle;



        public refresh(): void {
            if (ChatModel.showType == SharedDef.CHAT_TYPE_WHISPER) {
                this._countitem = ChatModel.getInstance().getWhisperByGuid();
            } else {
                this._countitem = ChatModel.getInstance().getChatItemByType(ChatModel.showType);
            }
            this.makeItemRect(this._countitem);
            this.disRect = new Rectangle(0, 0, ChatModel._textWidth, this.textHeight * this.textScale);
            this.mathTempH();

            if (this.totalH > this.disRect.height) {
                this.disRect.y = this.totalH - this.disRect.height;
            } else {
                this.disRect.y = 0;
            }

            this.drawList();
            this.pagey = 10000;
            this.resize();
            if (ChatModel.showType == SharedDef.CHAT_TYPE_WHISPER) {
                ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
            }

        }
        private getTestItem($arr: Array<ChatVo>): Array<ChatVo> {
            if ($arr.length) {
                var $barr: Array<ChatVo> = new Array
                for (var i: number = 0; i < 50; i++) {
                    var $vo: ChatVo = new ChatVo()
                    $vo.s2c_send_chat = $arr[0].s2c_send_chat
                    $vo.isSelf = Math.random() > 0.5
                    $vo.contentTxt = "就这样吧，" + i
                    $barr.push($vo)
                }
                return $barr;
            } else {
                return $arr;
            }
        }
        private mathTempH(): void {
            this.tempH = (1024 - this.disRect.height) / 2;
            this.tempH = this.tempH;
        }
        private lastMcY: number = 0;
        private tempH: number = 0;
        private drawList(): void {
            this.clikBoxItem = new Array;
            this.mathTempH();

            this.uiAtlas.ctx.font = this.textFontStr;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(this._textureRect.width, this._textureRect.height, false);

            this.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(this.uiAtlas.ctx);

            var $ty: number = this.disRect.y  //20偏差
            for (var i: number = 0; i < this._countitem.length; i++) {
                var $chatVo: ChatVo = this._countitem[i]
                $chatVo.showLast = true
                if (ChatModel.showType == SharedDef.CHAT_TYPE_SYSTEM) {

                } else {
                    if (!$chatVo.isSelf) {
                        this.drawChatLeftToCtx($chatVo, new Vector2D(40, $chatVo.startY - $ty + this.tempH), $chatVo.rect)
                    } else {
                        this.drawChatRightToCtx($chatVo, new Vector2D(40, $chatVo.startY - $ty + this.tempH), $chatVo.rect)
                    }
                }
            }
            this.lastMcY = this.disRect.y
            this.resetNewPageMcY();
            this.uiAtlas.updateCtx(this.uiAtlas.ctx, 0, 0);

        }
        private resetNewPageMcY(): void {
            this.pageMc.y = ((-(this.disRect.y - this.lastMcY)) - this.tempH) / this.textScale;
            this.pageMc.y += this.pageBasePos.y;
        }
        //计算所有记录所对应的位置;
        private totalH: number = 0;
        private makeItemRect(_item: Array<ChatVo>): void {
            var ty: number = 0;
            for (var i: number = 0; i < _item.length; i++) {
                var $chatVo: ChatVo = _item[i];
                this.uiAtlas.ctx.font = this.textFontStr;
                if (!$chatVo.rect) {
                    $chatVo.rect = this.getCharCellRect($chatVo);
                    $chatVo.startY = ty;
                }
                ty = $chatVo.startY + $chatVo.rect.height + 40;
            }

            this.totalH = ty + 20;
        }
        private drawStytem($vo: ChatVo, $pos: Vector2D, $rect: Rectangle): number {

            var $iconRect: Rectangle = new Rectangle($pos.x - 25, $pos.y + 10, 50 * this._textScale, 22 * this._textScale)
            if (Math.random() > 0.5) {
                this.drawImageToCtx("L_system_icon", $iconRect)
            } else {
                this.drawImageToCtx("L_tip_icon", $iconRect)
            }
            var $tipStr: string = "[000000]恭喜[ff0000]玩家名字[000000][000000]恭喜[ff0000]玩家名字[000000][000000]恭喜[ff0000]玩家名字[000000][000000]恭喜[ff0000]玩家名字[000000]获得神器[00ff00]霸王枪[000000]恭喜/大笑[ff0000]玩家名字[000000]获/大笑得神器[00ff00]霸/大笑王枪"
            var lineNum: number = ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, $vo.contentTxt, 23, $pos.x + 70, $pos.y + 10);

            return lineNum * 25


            //   Multi line

        }

        private drawCharBg($rect: Rectangle, $isLeft: boolean = true): void {

            var $minTre: Rectangle = new Rectangle(0, 0, 10, 10);
            var $keyTre: UIRectangle = this.panelUiAtlas.getRec("Chat_txt_bg");
            var $uiScale: number = this._textScale * 1
            var $cxt: CanvasRenderingContext2D = this.uiAtlas.ctx;
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY, $minTre.width, $minTre.height, $rect.x, $rect.y, $minTre.width * $uiScale, $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY + $minTre.height, $minTre.width, $keyTre.pixelHeight - (2 * $minTre.height), $rect.x, $rect.y + $minTre.height * $uiScale, $minTre.width * $uiScale, $rect.height - ($minTre.height * $uiScale * 2));
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY + $keyTre.pixelHeight - $minTre.height, $minTre.width, $minTre.height, $rect.x, $rect.y + $rect.height - ($minTre.height * $uiScale), $minTre.width * $uiScale, $minTre.height * $uiScale);


            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $minTre.width, $keyTre.pixelY, $keyTre.pixelWitdh - $minTre.width * 2, $minTre.height, $rect.x + $minTre.height * $uiScale, $rect.y, $rect.width - ($minTre.width * $uiScale * 2), $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $minTre.width, $keyTre.pixelY + $keyTre.pixelHeight - $minTre.height, $keyTre.pixelWitdh - $minTre.width * 2, $minTre.height, $rect.x + $minTre.height * $uiScale, $rect.y + $rect.height - $minTre.height * $uiScale, $rect.width - ($minTre.width * $uiScale * 2), $minTre.height * $uiScale);



            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $keyTre.pixelWitdh - $minTre.width, $keyTre.pixelY, $minTre.width, $minTre.height, $rect.x + $rect.width - $minTre.width * $uiScale, $rect.y, $minTre.width * $uiScale, $minTre.height * $uiScale);
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $keyTre.pixelWitdh - $minTre.width, $keyTre.pixelY + $minTre.width, $minTre.width, $keyTre.pixelHeight - (2 * $minTre.height), $rect.x + $rect.width - $minTre.width * $uiScale, $rect.y + $minTre.height * $uiScale, $minTre.width * $uiScale, $rect.height - ($minTre.height * $uiScale * 2));
            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $keyTre.pixelWitdh - $minTre.width, $keyTre.pixelY + $keyTre.pixelHeight - $minTre.height, $minTre.width, $minTre.height, $rect.x + $rect.width - $minTre.width * $uiScale, $rect.y + $rect.height - ($minTre.height * $uiScale), $minTre.width * $uiScale, $minTre.height * $uiScale);


            $cxt.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX + $minTre.width, $keyTre.pixelY + $minTre.height, $keyTre.pixelWitdh - $minTre.width * 2, $keyTre.pixelHeight - $minTre.height * 2, $rect.x + $minTre.width * $uiScale, $rect.y + $minTre.height * $uiScale, $rect.width - $minTre.width * $uiScale * 2, $rect.height - $minTre.height * $uiScale * 2);

            var $jiantou: UIRectangle = this.panelUiAtlas.getRec($isLeft ? "Chat_left" : "Chat_right");
            if ($isLeft) {
                this.uiAtlas.ctx.drawImage(this.panelUiAtlas.useImg, $jiantou.pixelX, $jiantou.pixelY, $jiantou.pixelWitdh, $jiantou.pixelHeight, $rect.x - 6 * $uiScale, $rect.y + 10 * $uiScale, $jiantou.pixelWitdh * $uiScale, $jiantou.pixelHeight * $uiScale);

            } else {
                this.uiAtlas.ctx.drawImage(this.panelUiAtlas.useImg, $jiantou.pixelX, $jiantou.pixelY, $jiantou.pixelWitdh, $jiantou.pixelHeight, $rect.x + $rect.width - 5 * $uiScale, $rect.y + 10 * $uiScale, $jiantou.pixelWitdh * $uiScale, $jiantou.pixelHeight * $uiScale);

            }

        }
        private outCtx(ty: number, th: number): boolean {
            if (ty >= (1024 - th - 40)) {
                return true
            }
            if (ty < 0) {
                return true
            }
            return false
        }
        private getHeadBgSize(): number {
            return 68
        }
        private drawChatLeftToCtx($vo: ChatVo, $pos: Vector2D, $rect: Rectangle): void {

            if (this.outCtx($pos.y, $rect.height)) {
                return
            }
            var lineNum: number = ChatModel.getTextHeight(this.uiAtlas.ctx, $vo.contentTxt, 23, $pos.x + 70, $pos.y + 40);
            $rect.height = lineNum * 30 + 20

            var $headRect: Rectangle = new Rectangle($pos.x - 38, $pos.y + 30, this.getHeadBgSize(), this.getHeadBgSize())
            var $chatRect: Rectangle = new Rectangle($pos.x + 50, $pos.y + 30, $rect.width, $rect.height)

            this.drawCharBg($chatRect, true);
            this.drawImageToCtx("Chat_head_round", $headRect)
            //this.writeFontToCtx(this.uiAtlas.ctx, String($vo.s2c_send_chat.lvl), ArtFont.num1, 48, $pos.y+80)

            UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.SKILL_LEV_BG, new Rectangle( 20, $pos.y + 84, 53, 18), UIData.publicUi);
            
            LabelTextFont.writeSingleLabelToCtxSetAnchor(this.uiAtlas.ctx, ColorType.Whitefff4d6 + String($vo.s2c_send_chat.lvl), 18, 48, $pos.y + 80, TextAlign.CENTER,ColorType.Whitefff4d6,ColorType.colord27262e)

            ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, ColorType.Brown7a2f21 + $vo.contentTxt, 23, $pos.x + 70, $pos.y + 40);

            var $chatName: string = getBaseName($vo.s2c_send_chat.name)

            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, "[2a3553]" + $chatName, 22, $pos.x + 65, $pos.y + 5, TextAlign.LEFT);


            this.addClikBox($vo, $headRect, $chatRect)

            var metrics = this.uiAtlas.ctx.measureText($chatName);
            var $vipRect: Rectangle = new Rectangle($pos.x + 70 + metrics.width + 10, $pos.y + 2, 71 * 0.8, 35 * 0.8)
            if ($vo.s2c_send_chat.vip > 0) {
                this.drawImageToCtx("Vip_" + String($vo.s2c_send_chat.vip), $vipRect)
            }

        }


        private drawChatRightToCtx($vo: ChatVo, $pos: Vector2D, $rect: Rectangle): void {
            if (this.outCtx($pos.y, $rect.height)) {
                return
            }
            var k300: number = 420;

            var lineNum: number = ChatModel.getTextHeight(this.uiAtlas.ctx, $vo.contentTxt, 23, k300 - $rect.width + 10, $pos.y + 35);

            $rect.height = lineNum * 30 + 20

            var $headRect: Rectangle = new Rectangle(k300 + 15, $pos.y + 30, this.getHeadBgSize(), this.getHeadBgSize());
            var $chatRect: Rectangle = new Rectangle(k300 - $rect.width, $pos.y + 25, $rect.width, $rect.height);

            this.drawCharBg($chatRect, false);
            this.drawImageToCtx("Chat_head_round", $headRect);


            //    this.writeFontToCtx(this.uiAtlas.ctx, String(GuidData.player.getLevel()), ArtFont.num1, $headRect.x + 45, $pos.y + 80)

            UiDraw.cxtDrawImg(this.uiAtlas.ctx, PuiData.SKILL_LEV_BG, new Rectangle( 455, $pos.y + 86, 53, 18), UIData.publicUi);

            LabelTextFont.writeSingleLabelToCtxSetAnchor(this.uiAtlas.ctx, ColorType.Whitefff4d6 + String(GuidData.player.getLevel()), 18, 482, $pos.y + 83, TextAlign.CENTER,ColorType.Whitefff4d6,ColorType.colord27262e)
            
            ChatModel.writeMultiFaceLineToCtx(this.uiAtlas.ctx, ColorType.Brown7a2f21 + $vo.contentTxt, 23, k300 - $rect.width + 10, $pos.y + 35);

            this.addClikBox($vo, new Rectangle(), $chatRect);
        }
        private addClikBox($vo: ChatVo, $headRect: Rectangle, $chatRect: Rectangle): void {
            var $cellClikBox: CellClikBox = new CellClikBox();
            $cellClikBox.headRect = $headRect;
            $cellClikBox.chatRect = $chatRect;
            $cellClikBox.chatVo = $vo;
            this.clikBoxItem.push($cellClikBox);

        }
        private drawImageToCtx($key: string, $rect: Rectangle): void {
            var $keyTre: UIRectangle = this.panelUiAtlas.getRec($key);
            this.uiAtlas.ctx.drawImage(this.panelUiAtlas.useImg, $keyTre.pixelX, $keyTre.pixelY, $keyTre.pixelWitdh, $keyTre.pixelHeight, $rect.x, $rect.y, $rect.width, $rect.height);

        }
        public panelUiAtlas: UIAtlas
        private textTotalHeight1024: number = 0;
        private clikBoxItem: Array<CellClikBox>;

        public clikEvent(evt: InteractiveEvent): void {
            //console.log(evt.x, evt.y)
            //console.log("UIData.Scale, this._textScale");
            //console.log(UIData.Scale, this._textScale);
            //console.log("走起")
            var p: Vector2D = new Vector2D(evt.x / UIData.Scale - this.pageMc.x, evt.y / UIData.Scale - this.pageMc.y)
            p.scaleBy(this._textScale);
            for (var i: number = 0; i < this.clikBoxItem.length; i++) {
                var $clikNum: number = this.clikBoxItem[i].clik(p.x, p.y)
                if ($clikNum) {
                    this.clikChatVo = this.clikBoxItem[i].chatVo
                    if (this.clikChatVo.jasonlink) {
                        var $linkVo: ChatLinkJasonVo = this.clikChatVo.jasonlink
                        if (GuidData.map.getMapID() == $linkVo.M) {
                            quest.QuestModel.getInstance().toplay(new Vector2D($linkVo.X, $linkVo.Y))
                        } else {
                            GameInstance.questMoveVo = new QuestMoveVo()
                            GameInstance.questMoveVo.pos = new Vector2D($linkVo.X, $linkVo.Y)
                            bottomui.Progress_line.getInstance().show(1000, () => {
                                NetManager.getInstance().protocolos.teleport_map($linkVo.M, GuidData.map.getLineID());
                            });
                        }

                        ModuleEventManager.dispatchEvent(new Chat.ChatEvent(Chat.ChatEvent.HIDE_CHAT_EVENT));


                    } else {
                        var itdata: SListItemData = new SListItemData()
                        itdata.data = new Object();
                        if ($clikNum == 2) {
                            itdata.data.items = [11]
                        }
                        if ($clikNum == 1) {
                            itdata.data.items = ChatModel.getInstance().getPopMenuItemByGuid(this.clikChatVo.s2c_send_chat);
                        }
                        PopMenuUtil.show(itdata, (value: number) => { this.popBackFun(value) }, evt.x, evt.y)
                    }



                }
            }
        }
        private clikChatVo: ChatVo
        private popBackFun(value: number): void {

            switch (value) {

                case 11:
                    //this.toPaste()
                    console.log(this.clikChatVo.contentTxt)
                //    ChatHtmlInput.setChatHtmlText( this.clikChatVo.contentTxt)
                    break
                case 1:
                    NetManager.getInstance().protocolos.send_faction_invite(this.clikChatVo.s2c_send_chat.guid)
                    console.log("邀请，", this.clikChatVo.s2c_send_chat.guid,"加入家族")
                    break
                case 6:
                    //  this.toPinbi()

                    NetManager.getInstance().protocolos.block_chat(this.clikChatVo.s2c_send_chat.guid);
                    msgtip.MsgTipManager.outStrById(22, 38);
                    break
                case 7:

                    NetManager.getInstance().protocolos.social_add_friend(this.clikChatVo.s2c_send_chat.guid);

                    break
                case 8:
                    //  this.toWhisper()
                    // ChatModel.toWhisper(this.clikChatVo.s2c_send_chat.name, this.clikChatVo.s2c_send_chat.guid);
                    console.log("---milao");
                    ModulePageManager.openPanel(SharedDef.MODULE_CHATPERSON,this.clikChatVo.s2c_send_chat.guid);
                    break
                default:
                    break
            }

        }
        public addFriend(): void {

           
            //NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.guid);
            //var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHADDlIST_EVENT);
            //$evt.index = this.itdata.id;
            //ModuleEventManager.dispatchEvent($evt);
        }

        public testPoint($x: number, $y: number, $rect: Rectangle): boolean {
            if ($x > $rect.x && $x < ($rect.x + $rect.width) && $y > $rect.y && $y < ($rect.y + $rect.height)) {
                return true;
            } else {
                return false;
            }
        }





    }
}