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
var popbuy;
(function (popbuy) {
    var PopBuyModule = /** @class */ (function (_super) {
        __extends(PopBuyModule, _super);
        function PopBuyModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PopBuyModule.prototype.getModuleName = function () {
            return "PopBuyModule";
        };
        PopBuyModule.prototype.listProcessors = function () {
            return [new PopBuyProcessor()];
        };
        return PopBuyModule;
    }(Module));
    popbuy.PopBuyModule = PopBuyModule;
    var PopBuyEvent = /** @class */ (function (_super) {
        __extends(PopBuyEvent, _super);
        function PopBuyEvent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Info1 = "次数剩余";
            _this.Info2 = "";
            return _this;
        }
        PopBuyEvent.SHOW_POPBUY_PANEL = "SHOW_POPBUY_PANEL";
        PopBuyEvent.HIDE_POPBUY_PANEL = "HIDE_POPBUY_PANEL";
        return PopBuyEvent;
    }(BaseEvent));
    popbuy.PopBuyEvent = PopBuyEvent;
    var PopBuyProcessor = /** @class */ (function (_super) {
        __extends(PopBuyProcessor, _super);
        function PopBuyProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PopBuyProcessor.prototype.getName = function () {
            return "PopBuyProcessor";
        };
        PopBuyProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof PopBuyEvent) {
                var evt = $event;
                if (evt.type == PopBuyEvent.SHOW_POPBUY_PANEL) {
                    if ($event.resoureItem.length > 0) {
                        this.showPanel($event);
                    }
                    else {
                        msgtip.MsgTipManager.outStr("[ff0000]今日次数已用完", 99);
                    }
                }
                if (this.exchangepPanel) {
                    if (evt.type == PopBuyEvent.HIDE_POPBUY_PANEL) {
                        this.hidePanel();
                    }
                }
            }
        };
        PopBuyProcessor.prototype.hidePanel = function () {
            this.exchangepPanel.hide();
        };
        PopBuyProcessor.prototype.showPanel = function ($event) {
            var _this = this;
            if (!this.exchangepPanel) {
                this.exchangepPanel = new popbuy.PopBuyPanel();
            }
            this.exchangepPanel.load(function () {
                UIManager.getInstance().addUIContainer(_this.exchangepPanel);
                _this.exchangepPanel.refresh($event);
            }, false);
        };
        PopBuyProcessor.prototype.listenModuleEvents = function () {
            return [
                new PopBuyEvent(PopBuyEvent.SHOW_POPBUY_PANEL),
                new PopBuyEvent(PopBuyEvent.HIDE_POPBUY_PANEL),
            ];
        };
        return PopBuyProcessor;
    }(BaseProcessor));
    popbuy.PopBuyProcessor = PopBuyProcessor;
})(popbuy || (popbuy = {}));
//# sourceMappingURL=PopBuyprocessor.js.map