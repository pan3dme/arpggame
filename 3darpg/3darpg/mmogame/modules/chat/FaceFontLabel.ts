
//带表情的文字
class FaceFontLabel {

    public static writeMultiFaceLineToCtx($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, $tx: number = 0, $ty: number = 0, _textWidth: number, _thh: number = 0, baseColor: string = "[]"): number {

        //$ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
        var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str);
        return this.wrapFaceText($ctx, $str, fontsize, baseColor, $tx, $ty, _textWidth, fontsize + _thh)
    }
    public static getTextHeight($ctx: CanvasRenderingContext2D, $str: string, fontsize: number = 12, _textWidth: number): number {
        // $ctx.font = (true ? "bolder " : "") + " " + fontsize + "px " + UIData.font;
        var $textMetrics: TextMetrics = TextRegExp.getTextMetrics($ctx, $str);
        return this.wrapFaceText($ctx, $str, fontsize, "[]", 0, 0, _textWidth, fontsize + Math.ceil(fontsize / 10), false)
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
    public static getFaceTxtStrLen(text: string): number {
        var len: number = 0
        TextRegExp.pushStr(text);
        var $lineNum: number = 1 //行数
        for (var n = 0; n < text.length; n++) {
            if (TextRegExp.isColor(n, null)) {
                continue;
            }
            var $faceId: number = this.getNextWords(text, n)
            if ($faceId == -1) {
                len += 1
            } else {
                len += 2;
            }
        }
        return len

    }
    public static wrapFaceText($ctx: CanvasRenderingContext2D, text: string, fontsize: number = 12, baseColor: string, x: number = 0, y: number = 0, maxWidth: number = 500, lineHeight: number = 10, $wirte: boolean = true): number {

        if (baseColor) {
            TextRegExp.defaultColor = baseColor
            $ctx.fillStyle = TextRegExp.defaultColor;
        }
        $ctx.strokeStyle = "#222222";
        $ctx.lineWidth = 4;

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
                // console.log($ctx.font)
                if (metrics.width > maxWidth || words[n] == "\n") {
                    ty += lineHeight;
                    line = "";
                    if (words[n] != "\n") {
                        if ($wirte) {
                            $ctx.strokeText(words[n], x, y + ty);

                            $ctx.fillText(words[n], x, y + ty);
                        }
                    }
                    $lineNum++
                } else {
                    if ($wirte) {
                        $ctx.strokeText(words[n], x + metrics.width * 1.0, y + ty);
                        $ctx.fillText(words[n], x + metrics.width * 1.0, y + ty);
                    }
                }

                line += words[n];
            } else {
                var faceSize: number = fontsize * 1.4
                var $rect: Rectangle = new Rectangle(x + metrics.width * 1.0 + 0, y + ty - faceSize / 10, faceSize, faceSize);
                if (metrics.width > maxWidth) {
                    ty += lineHeight;
                    line = "";
                    $lineNum++
                    $rect = new Rectangle(x + 0, y + ty - faceSize / 10, faceSize, faceSize);
                }
                // if ($wirte) {
                this.drawFaceIcon($ctx, $rect, $faceId)
                // }
                n = n + 2;
                line += "脸1"
            }

        }

        return $lineNum
    }
    private static drawFaceIcon(ctx: CanvasRenderingContext2D, $rect: Rectangle, $faceId: number): void {
        UiDraw.cxtDrawImg(ctx, "F_FACE_" + $faceId, $rect, UIData.publicUi);
    }

}