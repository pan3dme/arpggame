
module hornui {

    export class HornUiPanel extends WindowCentenMin {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;



        public _msgTxt: string = "请输入文字.."
        public constructor() {
            super();

   


            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);


            this._topRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/horn/horn.xml", "ui/uidata/chat/horn/horn.png", () => { this.loadConfigCom() });
        
        }

        private a_input_bg:UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas
            this._midRender.uiAtlas = this._topRender.uiAtlas


          


            this._bottomRender.applyObjData();
            this._midRender.applyObjData()
            

           this.a_input_bg = this.addEvntBut("a_input_bg", this._bottomRender)


            this.addEvntBut("a_tittle", this._topRender)
            this.addEvntBut("a_label", this._topRender)
            this.a_addhorn =this.addEvntBut("a_addhorn", this._topRender)
            this.a_face=  this.addEvntBut("a_face", this._topRender)
            this.a_send = this.addEvntBut("a_send", this._topRender)

            this.a_input_txt = this.addEvntBut("a_input_txt", this._topRender)


            this.a_horn_num= this.addChild(<UICompenent>this._topRender.getComponent("a_horn_num"));


            
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();

        }
        private a_addhorn: UICompenent;
        private a_face: UICompenent;
        private a_send: UICompenent;
        private a_input_txt: UICompenent;
        private a_horn_num: UICompenent;

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.c_close:
                    this.close();
                    break;
                case this.a_input_bg:
                case this.a_input_txt:
                    if (this._msgTxt.search("请输入文字") != -1) {
                        this._msgTxt = "";
                    }
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._msgTxt)
                    break;
                case this.a_face:
                    //var $facePanel: Chat.FacePanel = Chat.FacePanel.show(this._topRender.uiAtlas, ($str: string) => { this.addFaceText($str) });
                    //$facePanel.bottom = (Scene_data.stageHeight - evt.y) / UIData.Scale
                    //$facePanel.left = (Scene_data.stageWidth / UIData.Scale - 450) / 2;

                    var $skd: faceui.FaceUiEvent = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL)
                    $skd.data = { bfun: ($faceStr: string) => { this.addFaceText($faceStr) }, bottom: (Scene_data.stageHeight - evt.y-30) / UIData.Scale, left: (Scene_data.stageWidth / UIData.Scale - 450) / 2}
                    ModuleEventManager.dispatchEvent($skd);
                    break;
                case this.a_send:
                    console.log("发送喇叭=》", this._msgTxt)
                    NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_HORM, this._msgTxt)
                    this._msgTxt = "";
                    this.refresh();
                    break;
                default:
                    break;

            }

        }
   

        public addFaceText(value: string): void {

            this._msgTxt = this._msgTxt + value
            this.refresh()
        }

        private uiAtlasComplet: boolean = false
 
        public refresh(): void {
            if (this.uiAtlasComplet) {
                this.drawDescTxt(this._msgTxt)
       

                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_horn_num.skinName, ColorType.Green2ca937+"99",16)
            }
        }
        private inputBfun($str: string): void {
            this._msgTxt = $str;
            this.refresh()

        }
        private drawDescTxt($desc: string): void {
            var $rect: UIRectangle = this._topRender.uiAtlas.getRec(this.a_input_txt.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            HornUiPanel.writeMultiFaceLineToCtx($ctx, ColorType.Brown7a2f21 + $desc, 16, 0, 0);
            this._topRender.uiAtlas.updateCtx($ctx, $rect.pixelX, $rect.pixelY);

        }


        public static writeMultiFaceLineToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0): number {

            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, 270, fontsize + 5)
        }
        private static getNextWords($str: string, indx: number): number {
            var $iconId: number = -1
            if ($str[indx] == "/" && $str.length > (indx + 2)) {
                var tempA: string = $str[indx + 0] + $str[indx + 1] + $str[indx + 2]
                for (var i: number = 0; i < UIData.faceItem.length; i++) {
                    if (UIData.faceItem[i] == tempA) {
                        return i + 1
                    }
                }
            }
            return $iconId
        }
        public static wrapFaceText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x: number = 0, y: number = 0, maxWidth: number = 500, lineHeight: number = 10): number {
            TextRegExp.pushStr(text);
            var words: string = text;
            var line: string = "";
            var ty: number = 0
            var $lineNum: number = 1 //行数
            for (var n = 0; n < words.length; n++) {
                if (TextRegExp.isColor(n, $ctx)) {
                    continue;
                }
                var metrics: TextMetrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId: number = this.getNextWords(words, n)
                if ($faceId == -1) {
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        ty += lineHeight;
                        line = "";
                        if (words[n] != "\n") {

                            $ctx.fillText(words[n], x, y + ty);

                        }
                        $lineNum++
                    } else {

                        $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);

                    }
                    line += words[n];
                } else {

                    var $rect: Rectangle = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - 3, 24, 24);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++

                        $rect.x = x;
                        $rect.y = y + ty - 3;

                    }

                    this.drawFaceIcon($ctx, $rect, $faceId)

                    n = n + 2;
                    line += "大1"
                }

            }
            return $lineNum
        }
        private static drawFaceIcon(ctx: CanvasRenderingContext2D, $rect: Rectangle, $faceId: number): void {
            UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
        }


       


        private close(): void {
            UIManager.getInstance().removeUIContainer(this);

        }


    }

}
/*

module hornui {

    export class HornUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;



        public _msgTxt: string = "请输入文字.."
        public constructor() {
            super();

            this.width = 450;
            this.height = 350;

            this.center = 0;
            this.middle = 0;


            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);


            this._topRender.uiAtlas = new UIAtlas

        }
        public applyLoad(): void {
            GameData.getPublicUiAtlas(($uiAtlas: UIAtlas) => { this.makePanelUi($uiAtlas) });
        }
        private makePanelUi($uiAtlas: UIAtlas): void {
            this._topRender.uiAtlas.setInfo("ui/uidata/chat/horn/horn.xml", "ui/uidata/chat/horn/horn.png", () => { this.loadConfigCom() });
        }
        private setSizeForPanelUi($ui: UICompenent, $uiName: string): void {
            var temp: UICompenent = this._topRender.getComponent($uiName);
            $ui.x = temp.x;
            $ui.y = temp.y;
            $ui.width = temp.width;
            $ui.height = temp.height;
        }
        private b_close:UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = GameData.publicbgUiAtlas
            this._midRender.uiAtlas = GameData.publicbgUiAtlas

            var guiBg0: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("guiBg0"));
            this.setSizeForPanelUi(guiBg0, "a_bg");
            this.b_close = this.addEvntBut("b_close", this._bottomRender)
            this.setSizeForPanelUi(this.b_close , "a_close");
            var titleBg: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("titleBg"));
            this.setSizeForPanelUi(titleBg, "a_tittle_bg");

            var but_7: UICompenent = this.addChild(<UICompenent>this._bottomRender.getComponent("but_7"));
            this.setSizeForPanelUi(but_7, "a_send_bg");

            var guiBg1: UICompenent = this.addChild(<UICompenent>this._midRender.getComponent("guiBg1"));
            this.setSizeForPanelUi(guiBg1, "a_input_bg");


            this._bottomRender.applyObjData();
            this._midRender.applyObjData()
            
       
            

            this.addEvntBut("a_tittle", this._topRender)
            this.addEvntBut("a_label", this._topRender)
            this.a_addhorn =this.addEvntBut("a_addhorn", this._topRender)
            this.a_face=  this.addEvntBut("a_face", this._topRender)
            this.a_send = this.addEvntBut("a_send", this._topRender)

            this.a_input_txt = this.addEvntBut("a_input_txt", this._topRender)


            this.a_horn_num= this.addChild(<UICompenent>this._topRender.getComponent("a_horn_num"));


            
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();

        }
        private a_addhorn: UICompenent;
        private a_face: UICompenent;
        private a_send: UICompenent;
        private a_input_txt: UICompenent;
        private a_horn_num: UICompenent;

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.b_close:
                    this.close();
                    break;
                case this.a_input_txt:
                    if (this._msgTxt.search("请输入文字") != -1) {
                        this._msgTxt = "";
                    }
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._msgTxt)
                    break;
                case this.a_face:
                    //var $facePanel: Chat.FacePanel = Chat.FacePanel.show(this._topRender.uiAtlas, ($str: string) => { this.addFaceText($str) });
                    //$facePanel.bottom = (Scene_data.stageHeight - evt.y) / UIData.Scale
                    //$facePanel.left = (Scene_data.stageWidth / UIData.Scale - 450) / 2;

                    var $skd: faceui.FaceUiEvent = new faceui.FaceUiEvent(faceui.FaceUiEvent.SHOW_FACE_UI_PANEL)
                    $skd.data = { bfun: ($faceStr: string) => { this.addFaceText($faceStr) }, bottom: (Scene_data.stageHeight - evt.y-30) / UIData.Scale, left: (Scene_data.stageWidth / UIData.Scale - 450) / 2}
                    ModuleEventManager.dispatchEvent($skd);
                    break;
                case this.a_send:
                    console.log("发送喇叭=》", this._msgTxt)
                    NetManager.getInstance().protocolos.chat_by_channel(SharedDef.CHAT_TYPE_HORM, this._msgTxt)
                    this._msgTxt = "";
                    this.refresh();
                    break;
                default:
                    break;

            }

        }
   

        public addFaceText(value: string): void {

            this._msgTxt = this._msgTxt + value
            this.refresh()
        }

        private uiAtlasComplet: boolean = false
 
        public refresh(): void {
            if (this.uiAtlasComplet) {
                this.drawDescTxt(this._msgTxt)
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_horn_num.skinName, "99", ArtFont.num1)
            }
        }
        private inputBfun($str: string): void {
            this._msgTxt = $str;
            this.refresh()

        }
        private drawDescTxt($desc: string): void {
            var $rect: UIRectangle = this._topRender.uiAtlas.getRec(this.a_input_txt.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            HornUiPanel.writeMultiFaceLineToCtx($ctx, "[b9d4f2]" + $desc, 16, 0, 0);
            this._topRender.uiAtlas.updateCtx($ctx, $rect.pixelX, $rect.pixelY);

        }


        public static writeMultiFaceLineToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0): number {

            $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
            var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str);
            return this.wrapFaceText($ctx, $str, "[]", $tx, $ty, 270, fontsize + 5)
        }
        private static getNextWords($str: string, indx: number): number {
            var $iconId: number = -1
            if ($str[indx] == "/" && $str.length > (indx + 2)) {
                var tempA: string = $str[indx + 0] + $str[indx + 1] + $str[indx + 2]
                for (var i: number = 0; i < UIData.faceItem.length; i++) {
                    if (UIData.faceItem[i] == tempA) {
                        return i + 1
                    }
                }
            }
            return $iconId
        }
        public static wrapFaceText($ctx: CanvasRenderingContext2D, text: string, baseColor: string, x: number = 0, y: number = 0, maxWidth: number = 500, lineHeight: number = 10): number {
            TextRegExp.pushStr(text);
            var words: string = text;
            var line: string = "";
            var ty: number = 0
            var $lineNum: number = 1 //行数
            for (var n = 0; n < words.length; n++) {
                if (TextRegExp.isColor(n, $ctx)) {
                    continue;
                }
                var metrics: TextMetrics = $ctx.measureText(line.replace("\n", ""));
                var $faceId: number = this.getNextWords(words, n)
                if ($faceId == -1) {
                    if (metrics.width > maxWidth || words[n] == "\n") {
                        ty += lineHeight;
                        line = "";
                        if (words[n] != "\n") {

                            $ctx.fillText(words[n], x, y + ty);

                        }
                        $lineNum++
                    } else {

                        $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);

                    }
                    line += words[n];
                } else {

                    var $rect: Rectangle = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - 3, 24, 24);
                    if (metrics.width > maxWidth) {
                        ty += lineHeight;
                        line = "";
                        $lineNum++

                        $rect.x = x;
                        $rect.y = y + ty - 3;

                    }

                    this.drawFaceIcon($ctx, $rect, $faceId)

                    n = n + 2;
                    line += "大1"
                }

            }
            return $lineNum
        }
        private static drawFaceIcon(ctx: CanvasRenderingContext2D, $rect: Rectangle, $faceId: number): void {
            UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
        }


       


        private close(): void {
            UIManager.getInstance().removeUIContainer(this);

        }


    }

}

*/
