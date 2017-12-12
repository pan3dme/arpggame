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
var fb;
(function (fb) {
    var FubenEvent = /** @class */ (function (_super) {
        __extends(FubenEvent, _super);
        function FubenEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenEvent.SHOW_FUBEN_EVENT = "SHOW_FUBEN_EVENT"; //显示面板
        //public static FUBEN_REFRESH: string = "FUBEN_REFRESH";
        FubenEvent.FUBEN_RANKING_DATA_EVENT = "FUBEN_RANKING_DATA_EVENT";
        FubenEvent.FUBEN_SHOW_FINISH_PANEL_EVENT = "FUBEN_SHOW_FINISH_PANEL_EVENT";
        FubenEvent.FUBEN_SHOW_REWARD_EVENT = "FUBEN_SHOW_REWARD_EVENT";
        FubenEvent.FUBEN_SHOW_FAIL_EVENT = "FUBEN_SHOW_FAIL_EVENT";
        FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT = "FUBEN_SHOW_LEFT_PANEL_EVENT";
        FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST = "REFRESH_FUBEN_SCENE_LEFT_QUEST";
        FubenEvent.FUBEN_TRIAL_RANK_LIST_QUERY_RESULT = "FUBEN_TRIAL_RANK_LIST_QUERY_RESULT"; // 更新到试练塔排行数据
        return FubenEvent;
    }(BaseEvent));
    fb.FubenEvent = FubenEvent;
    var FubenModule = /** @class */ (function (_super) {
        __extends(FubenModule, _super);
        function FubenModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenModule.prototype.getModuleName = function () {
            return "FubenModule";
        };
        FubenModule.prototype.listProcessors = function () {
            return [new FubenProcessor()];
        };
        return FubenModule;
    }(Module));
    fb.FubenModule = FubenModule;
    var FubenProcessor = /** @class */ (function (_super) {
        __extends(FubenProcessor, _super);
        function FubenProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FubenProcessor.prototype.getName = function () {
            return "FubenProcessor";
        };
        FubenProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof FubenEvent) {
                var $fubenEvent = $event;
                if ($fubenEvent.type == FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT) {
                    this.showFubenLeftPanel();
                }
                if ($fubenEvent.type == FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST) {
                    if (this.fubenLeftPanel) {
                        this.fubenLeftPanel.refreshQuestList();
                    }
                }
            }
        };
        FubenProcessor.prototype.showFubenLeftPanel = function () {
            if (!this.fubenLeftPanel) {
                this.fubenLeftPanel = new fb.FubenLeftPanel();
            }
            UIManager.getInstance().addUIContainer(this.fubenLeftPanel);
            this.fubenLeftPanel.refresh();
        };
        FubenProcessor.prototype.showFubenRewardPanel = function ($vo) {
            var _this = this;
            if (!this.fubenRewardPanel) {
                this.fubenRewardPanel = new fb.FubenRewardPanel();
            }
            this.fubenRewardPanel.load(function () {
                _this.fubenRewardPanel.show($vo);
            });
        };
        FubenProcessor.prototype.showFubenFailPanel = function () {
            var _this = this;
            this.fubenFailPanel = new fb.FubenFailPanel();
            this.fubenFailPanel.load(function () {
                _this.fubenFailPanel.show();
            });
        };
        FubenProcessor.prototype.listenModuleEvents = function () {
            return [
                new FubenEvent(FubenEvent.FUBEN_SHOW_LEFT_PANEL_EVENT),
                new FubenEvent(FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST),
                new FubenEvent(FubenEvent.FUBEN_SHOW_REWARD_EVENT),
                new FubenEvent(FubenEvent.FUBEN_SHOW_FAIL_EVENT),
                new UIPanelEvent(UIPanelEvent.DISPOSE_PANEL_EVENT),
            ];
        };
        FubenProcessor.prototype.smsgSendInstanceResult = function ($byte) {
            var $vo = new s2c_send_instance_result();
            s2c_send_instance_result.read($vo, $byte);
            console.log($vo);
            if ($vo.state == MapInfo.STATE_249 && $vo.type != 15 && $vo.type != 7) {
                this.showFubenFailPanel();
            }
            else {
                this.showFubenRewardPanel($vo);
            }
        };
        FubenProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SEND_INSTANCE_RESULT] = function ($byte) { _this.smsgSendInstanceResult($byte); };
            return obj;
        };
        return FubenProcessor;
    }(BaseProcessor));
    fb.FubenProcessor = FubenProcessor;
})(fb || (fb = {}));
//# sourceMappingURL=FubenProcessor.js.map