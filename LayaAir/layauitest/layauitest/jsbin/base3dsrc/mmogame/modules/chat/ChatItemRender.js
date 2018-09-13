var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Chat;
(function (Chat) {
    var ChatItemRender = /** @class */ (function (_super) {
        __extends(ChatItemRender, _super);
        function ChatItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChatItemRender.prototype.draw = function () {
            var $obj = this._listItemData.data;
            var ctx = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            //   UiDraw.cxtDrawImg(ctx, "chat_list_bg", new Rectangle(0, 0, 395, 29), UIData.textlist);
            ctx.fillStyle = "#a9a9a9";
            ctx.fillRect(0, 0, 395, 29);
            this.drawLable(ctx, 3, 3, "我说：" + $obj.txt, 12, "#5d2a12", false);
            this.atlas.updateCtx(ctx, this.uvData.ox, this.uvData.oy);
        };
        ChatItemRender.prototype.drawLable = function (ctx, $xpos, $ypos, $str, fontsize, fontColor, bolder) {
            if (bolder === void 0) { bolder = false; }
            ctx.textBaseline = TextAlign.TOP;
            ctx.textAlign = TextAlign.LEFT;
            ctx.fillStyle = fontColor;
            ctx.font = (bolder ? "bolder " : "") + fontsize + "px" + UIData.font;
            ctx.fillText($str, $xpos, $ypos);
        };
        return ChatItemRender;
    }(ListItemRender));
    Chat.ChatItemRender = ChatItemRender;
})(Chat || (Chat = {}));
//# sourceMappingURL=ChatItemRender.js.map