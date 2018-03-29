var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var ui;
    (function (ui) {
        var base;
        (function (base) {
            var InteractiveEvent = (function (_super) {
                __extends(InteractiveEvent, _super);
                function InteractiveEvent() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return InteractiveEvent;
            }(engine.events.BaseEvent));
            InteractiveEvent.Down = "down";
            InteractiveEvent.Up = "Up";
            InteractiveEvent.Move = "Move";
            InteractiveEvent.PinchStart = "PinchStart";
            InteractiveEvent.Pinch = "Pinch";
            base.InteractiveEvent = InteractiveEvent;
        })(base = ui.base || (ui.base = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=InteractiveEvent.js.map