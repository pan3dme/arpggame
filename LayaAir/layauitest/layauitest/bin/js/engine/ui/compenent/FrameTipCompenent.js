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
            var FrameTipCompenent = (function (_super) {
                __extends(FrameTipCompenent, _super);
                function FrameTipCompenent() {
                    return _super.call(this) || this;
                }
                FrameTipCompenent.prototype.playOne = function ($container) {
                    if (!this.parent) {
                        $container.addChild(this);
                    }
                    this.endFlag = false;
                    this.goToAndPlay(0);
                };
                FrameTipCompenent.prototype.updateEnd = function () {
                    if (this.endFlag) {
                        this.parent.removeChild(this);
                    }
                };
                return FrameTipCompenent;
            }(engine.ui.compenent.FrameCompenent));
            compenent.FrameTipCompenent = FrameTipCompenent;
        })(compenent = ui.compenent || (ui.compenent = {}));
    })(ui = engine.ui || (engine.ui = {}));
})(engine || (engine = {}));
//# sourceMappingURL=FrameTipCompenent.js.map