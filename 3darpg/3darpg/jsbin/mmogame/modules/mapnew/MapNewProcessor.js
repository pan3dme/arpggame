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
var mapnew;
(function (mapnew) {
    var MapNewEvent = /** @class */ (function (_super) {
        __extends(MapNewEvent, _super);
        function MapNewEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapNewEvent.SHOW_MAP_FORM_MINI = "SHOW_MAP_FORM_MINI"; //显示面板
        MapNewEvent.SHOW_MAP_NEW_EVENT = "SHOW_MAP_NEW_EVENT"; //显示面板
        MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT = "SHOW_MAP_NEW_WORLD_EVENT"; //显示面板
        MapNewEvent.HIDE_MAP_NEW_EVENT = "HIDE_MAP_NEW_EVENT"; //显示面板
        MapNewEvent.SELECT_MAP_NEW_CELL = "SELECT_MAP_NEW_CELL"; //显示面板
        return MapNewEvent;
    }(BaseEvent));
    mapnew.MapNewEvent = MapNewEvent;
    var MapNewModule = /** @class */ (function (_super) {
        __extends(MapNewModule, _super);
        function MapNewModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MapNewModule.prototype.getModuleName = function () {
            return "MapNewModule";
        };
        MapNewModule.prototype.listProcessors = function () {
            return [new MapNewProcessor()];
        };
        return MapNewModule;
    }(Module));
    mapnew.MapNewModule = MapNewModule;
    var MapNewProcessor = /** @class */ (function (_super) {
        __extends(MapNewProcessor, _super);
        function MapNewProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastOpenTab = 0;
            return _this;
        }
        MapNewProcessor.prototype.getName = function () {
            return "MapNewProcessor";
        };
        MapNewProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MapNewEvent) {
                var $mapNewEvent = $event;
                if ($mapNewEvent.type == MapNewEvent.SHOW_MAP_FORM_MINI) {
                    if (this.lastOpenTab == 0) {
                        $mapNewEvent.type = MapNewEvent.SHOW_MAP_NEW_EVENT;
                    }
                    else {
                        $mapNewEvent.type = MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT;
                    }
                }
                if ($mapNewEvent.type == MapNewEvent.SHOW_MAP_NEW_EVENT) {
                    this.showmapNewPanel();
                    this.lastOpenTab = 0;
                }
                if ($mapNewEvent.type == MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT) {
                    this.showMapNewWorldPanel();
                    this.lastOpenTab = 1;
                }
                if (this.mapNewPanel) {
                    if ($mapNewEvent.type == MapNewEvent.HIDE_MAP_NEW_EVENT) {
                        this.hidePanel();
                    }
                    if ($mapNewEvent.type == MapNewEvent.SELECT_MAP_NEW_CELL) {
                        //console.log($mapNewEvent.data)
                        var $dd = $mapNewEvent.data;
                        if ($dd.type == 0) {
                            console.log("换线");
                            NetManager.getInstance().protocolos.change_line(Number($dd.data));
                        }
                        if ($dd.type == 1) {
                            this.mapNewPanel.selectmapOBJ($dd.data);
                        }
                        //   
                    }
                }
            }
        };
        MapNewProcessor.prototype.hidePanel = function () {
            if (this.mapNewPanel) {
                this.mapNewPanel.hide();
            }
        };
        MapNewProcessor.prototype.showmapNewPanel = function () {
            var _this = this;
            if (!this.mapNewPanel) {
                this.mapNewPanel = new mapnew.MapNewPanel();
            }
            this.mapNewPanel.load(function () {
                _this.mapNewPanel.show();
            });
        };
        MapNewProcessor.prototype.showMapNewWorldPanel = function () {
            var _this = this;
            if (!this.mapNewWorldPanel) {
                this.mapNewWorldPanel = new mapnew.MapNewWorldPanel();
            }
            this.mapNewWorldPanel.load(function () {
                _this.mapNewWorldPanel.show();
            });
        };
        MapNewProcessor.prototype.smsgSendMapLine = function ($byte) {
            var $vo = new s2c_send_map_line();
            s2c_send_map_line.read($vo, $byte);
            this.mapNewPanel.refreshLine($vo);
        };
        MapNewProcessor.prototype.getHanderMap = function () {
            var _this = this;
            var obj = new Object;
            obj[Protocols.SMSG_SEND_MAP_LINE] = function ($byte) { _this.smsgSendMapLine($byte); };
            return obj;
        };
        MapNewProcessor.prototype.listenModuleEvents = function () {
            return [
                new MapNewEvent(MapNewEvent.SHOW_MAP_NEW_EVENT),
                new MapNewEvent(MapNewEvent.HIDE_MAP_NEW_EVENT),
                new MapNewEvent(MapNewEvent.SELECT_MAP_NEW_CELL),
                new MapNewEvent(MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT),
                new MapNewEvent(MapNewEvent.SHOW_MAP_FORM_MINI),
            ];
        };
        return MapNewProcessor;
    }(BaseProcessor));
    mapnew.MapNewProcessor = MapNewProcessor;
})(mapnew || (mapnew = {}));
//# sourceMappingURL=MapNewProcessor.js.map