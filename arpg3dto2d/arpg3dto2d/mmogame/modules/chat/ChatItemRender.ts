module Chat {
    export class ChatItemRender extends ListItemRender {

        public draw(): void {


            var $obj: any = this._listItemData.data


            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);

            //   UiDraw.cxtDrawImg(ctx, "chat_list_bg", new Rectangle(0, 0, 395, 29), UIData.textlist);
            ctx.fillStyle = "#a9a9a9";
            ctx.fillRect(0, 0, 395, 29);

            this.drawLable(ctx, 3, 3, "我说：" + $obj.txt, 12, "#5d2a12", false);

            this.atlas.updateCtx(ctx, this.uvData.ox, this.uvData.oy);


        }
        private drawLable(ctx: CanvasRenderingContext2D,
            $xpos: number, $ypos: number,
            $str: string, fontsize: number, fontColor: string, bolder: boolean = false): void {

            ctx.textBaseline = TextAlign.TOP;
            ctx.textAlign = TextAlign.LEFT;
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px" + UIData.font;

            ctx.fillText($str, $xpos, $ypos);

        }


    }
}