var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var ui;
    (function (ui) {
        var compenent;
        (function (compenent) {
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Button.prototype.interactiveEvent = function (e) {
                    //if (e.type == InteractiveEvent.Down) {
                    //    if (this.testPoint(e.x, e.y)) {
                    //        this._state = 1;
                    //    }
                    //} else if (e.type == InteractiveEvent.Up){
                    //    if (this.testPoint(e.x, e.y)) {
                    //        this._state = 0;
                    //    }
                    //}
                    return _super.prototype.interactiveEvent.call(this, e);
                };
                return Button;
            }(engine.ui.compenent.BaseButton));
            compenent.Button = Button;
        })(compenent = ui.compenent || (ui.compenent = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Button.js.map