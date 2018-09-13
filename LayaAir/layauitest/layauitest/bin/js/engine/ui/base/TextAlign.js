var engine;
(function (engine) {
    var ui;
    (function (ui) {
        var base;
        (function (base) {
            var TextAlign = (function () {
                function TextAlign() {
                }
                return TextAlign;
            }());
            TextAlign.LEFT = "left";
            TextAlign.CENTER = "center";
            TextAlign.RIGHT = "right";
            TextAlign.TOP = "top";
            TextAlign.MIDDLE = "middle";
            TextAlign.BOTTOM = "bottom";
            base.TextAlign = TextAlign;
        })(base = ui.base || (ui.base = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=TextAlign.js.map