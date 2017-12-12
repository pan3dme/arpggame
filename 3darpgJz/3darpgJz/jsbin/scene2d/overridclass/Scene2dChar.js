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
var scene2d;
(function (scene2d) {
    var Scene2dChar = /** @class */ (function (_super) {
        __extends(Scene2dChar, _super);
        function Scene2dChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene2dChar.prototype.applyWalk = function ($item) {
            if ($item && $item.length == 2) {
                //排除是停止的路径将不处理
                if ($item[0].x == $item[1].x && $item[0].y == $item[1].y) {
                    console.log("收到寻路坐标是在原地==>", $item);
                    this._speedDirect = null;
                    this._walkPath = null;
                    if (this.curentAction == CharAction.WALK) {
                        this.play(CharAction.STANAD);
                    }
                    var $k = AstarUtil.getWorldPosByStart2D($item[0]);
                    this.px = $k.x;
                    this.pz = $k.z;
                    return;
                }
            }
            this.walkPath = scene2d.SceneAstarModel.getInstance().Path2dTo3d($item);
        };
        Scene2dChar.prototype.refreshY = function () {
            this.py = 0;
            this.refreshPos();
        };
        Object.defineProperty(Scene2dChar.prototype, "isDeath", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Scene2dChar.prototype.updateFrame = function (t) {
            _super.prototype.updateFrame.call(this, t);
            if (this._speedDirect) {
                this.walkDirect(t);
            }
        };
        Scene2dChar.prototype.walkDirect = function (tt) {
            var t = Math.min(Math.max((1000 / 60), tt), 30); //特殊限制摇杆移动
            var sn = t * this.speedTX;
            var nextPos = new Vector3D();
            var tx = this._speedDirect.x * sn;
            var ty = this._speedDirect.z * sn;
            this.toRotationY = -Math.atan2(ty, tx) * 180 / Math.PI + 90;
            nextPos.x = this.px + tx;
            nextPos.z = this.pz + ty;
            console.log(scene2d.SceneAstarModel.getPosIsCanMove(nextPos));
            if (scene2d.SceneAstarModel.getPosIsCanMove(nextPos)) {
                this.px = nextPos.x;
                this.pz = nextPos.z;
            }
            this.refreshPos();
        };
        Scene2dChar.prototype.showName = function ($color) {
            if ($color === void 0) { $color = null; }
            var $colorName = $color;
            if (!this._charNameVo) {
                this._charNameVo = BloodManager.getInstance().getCharNameMeshVo($colorName);
            }
            else {
                this._charNameVo.name = $colorName;
            }
            this.refreshPos();
        };
        Scene2dChar.prototype.showBlood = function ($colorType) {
            if ($colorType === void 0) { $colorType = 0; }
            //添加显示血条 -FIXME--0
            if (!this._charBloodVo) {
                this._charBloodVo = BloodManager.getInstance().getBloodLineMeshVo();
                this._charBloodVo.colortype = $colorType;
            }
            else {
                this._charBloodVo.colortype = $colorType;
            }
            this.refreshPos();
        };
        Scene2dChar.prototype.changeAction = function ($action) {
            this.curentAction = this._defaultAction;
        };
        return Scene2dChar;
    }(SceneChar));
    scene2d.Scene2dChar = Scene2dChar;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=Scene2dChar.js.map