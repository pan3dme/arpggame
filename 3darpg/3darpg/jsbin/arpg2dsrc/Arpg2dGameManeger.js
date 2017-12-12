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
var Arpg2dGameManeger = /** @class */ (function (_super) {
    __extends(Arpg2dGameManeger, _super);
    function Arpg2dGameManeger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arpg2dGameManeger.prototype.loadScene = function ($url, $completeFun, $progressFun, $analysisCompleteFun) {
        var _this = this;
        this.clearStaticScene();
        this.ready = false;
        var $mapid1007 = GuidData.map.tbMapVo.id;
        if ($mapid1007 == 1001) {
            if (GuidData.player.getLevel() < 100) {
                GameControlManager.sendGmCom("@Rank " + String(100));
            }
            TimeUtil.addTimeOut(2000, function () {
                NetManager.getInstance().protocolos.teleport_map(1007, 1);
            });
            TimeUtil.addTimeOut(3000, function () {
                var $indexUrl = window.location.toString();
                window.location.href = $indexUrl;
            });
            return;
        }
        LoadManager.getInstance().load(Scene_data.fileRoot + get2dMapdataById($mapid1007), LoadManager.XML_TYPE, function ($dtstr) {
            scene2d.MapConfig.getInstance().anlyData($dtstr);
            AstarUtil.makeStarGraph(scene2d.MapConfig.getInstance().astarItem);
            scene2d.SceneGroundModel.getInstance().initData($mapid1007);
            $analysisCompleteFun();
            _this.ready = true;
        });
    };
    return Arpg2dGameManeger;
}(scene2d.Scene2dManager));
//# sourceMappingURL=Arpg2dGameManeger.js.map