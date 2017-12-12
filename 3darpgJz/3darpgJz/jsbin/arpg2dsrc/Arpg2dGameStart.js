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
var Arpg2dGameStart = /** @class */ (function (_super) {
    __extends(Arpg2dGameStart, _super);
    function Arpg2dGameStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arpg2dGameStart.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        var $show = true;
        if ($show) {
            scene2d.Engine2d.init(); //初始2D引擎
            SceneManager._instance = new Arpg2dGameManeger(); //更换场景管理
            Arpg2dAstarUtil.getInstance().initAstarFun();
            Scene_data.cam3D.update = this.cam3Dupdate;
            document.addEventListener(MouseType.KeyDown, function ($evt) { _this.onKeyDown($evt); });
            this.traceLog();
        }
    };
    Arpg2dGameStart.prototype.traceLog = function () {
        var $str = "7013,40,20,0,0,0,7013,33,18,0,0,0,7013,48,22,0,0,0,7013,55,28,0,0,0,7013,62,31,0,0,0,7013,29,17,0,0,0";
        var $item = $str.split(",");
        var $outStr = "";
        for (var i = 0; i < $item.length / 6; i++) {
            $outStr += $item[i * 6 + 0] + "," + $item[i * 6 + 1] + "," + $item[i * 6 + 2] + ",0,0,0,0,0,0,0,0,0,1,0,0";
        }
        console.log($outStr);
    };
    Arpg2dGameStart.prototype.onKeyDown = function ($evt) {
    };
    Arpg2dGameStart.prototype.cam3Dupdate = function () {
        // scene2d.AppDataArpg.resetSelfPosCenter();
    };
    return Arpg2dGameStart;
}(GameStart));
//# sourceMappingURL=Arpg2dGameStart.js.map