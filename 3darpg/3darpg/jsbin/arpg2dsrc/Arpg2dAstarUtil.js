var Arpg2dAstarUtil = /** @class */ (function () {
    function Arpg2dAstarUtil() {
    }
    Arpg2dAstarUtil.getInstance = function () {
        if (!this._instance) {
            this._instance = new Arpg2dAstarUtil();
        }
        return this._instance;
    };
    Arpg2dAstarUtil.prototype.initAstarFun = function () {
        AstarUtil.getWorldPosByStart2D = this.getWorldPosByStart2D;
        AstarUtil.getGrapIndexByPos = this.getGrapIndexByPos;
        AstarUtil.getHeightByPos = this.getHeightByPos;
        AstarUtil.getScenePos = this.getScenePos;
    };
    Arpg2dAstarUtil.prototype.getScenePos = function ($x, $y) {
        var $evt = new InteractiveEvent(InteractiveEvent.Down);
        $evt.x = $x;
        $evt.y = $y;
        var $toV2 = scene2d.SceneAstarModel.getInstance().getAstarSceneByMouse($evt);
        var $to3d = this.getWorldPosByStart2D($toV2);
        return $to3d;
    };
    Arpg2dAstarUtil.prototype.getPosIsCanMove = function ($pos) {
        var $kt = this.getGrapIndexByPos($pos);
        return this.isGridCanWalk($kt);
    };
    Arpg2dAstarUtil.prototype.isGridCanWalk = function (p) {
        return !scene2d.MapConfig.getInstance().isBlock(p.x, p.y);
    };
    Arpg2dAstarUtil.prototype.getGrapIndexByPos = function ($pos) {
        return scene2d.SceneAstarModel.getAstarBySceneV3D($pos);
    };
    Arpg2dAstarUtil.prototype.getWorldPosByStart2D = function ($v2d) {
        return scene2d.SceneAstarModel.getInstance().getWorldPosByStart2D($v2d);
    };
    Arpg2dAstarUtil.prototype.getHeightByPos = function ($pos) {
        return 0;
    };
    return Arpg2dAstarUtil;
}());
//# sourceMappingURL=Arpg2dAstarUtil.js.map