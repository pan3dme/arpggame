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
    var SceneAstarModel = /** @class */ (function (_super) {
        __extends(SceneAstarModel, _super);
        function SceneAstarModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._showOrHide = false;
            _this.lastMouseDownTm = 0;
            return _this;
        }
        SceneAstarModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneAstarModel();
            }
            return this._instance;
        };
        SceneAstarModel.prototype.showAstarLine = function () {
            if (!this._astarLineSprite) {
                ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
                this._astarLineSprite = new MulLineSprite();
            }
            this._showOrHide = !this._showOrHide;
            if (this._showOrHide) {
                MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                SceneManager.getInstance().addDisplay(this._astarLineSprite);
                // this.drawTemp(AstarUtil.navmeshData.astarItem)
                this.drawTemp(scene2d.MapConfig.getInstance().astarItem);
                var $k = this.getWorldPosByStart2D(new Vector2D());
                this._astarLineSprite.x = $k.x;
                this._astarLineSprite.z = $k.z;
            }
            else {
                this.clearAstarLine();
            }
        };
        SceneAstarModel.prototype.getWorldPosByStart2D = function (a) {
            var $v2d = new Vector2D;
            $v2d.x = scene2d.AppDataArpg.sceneStagePos.x + a.x * scene2d.MapConfig.pix15.x;
            $v2d.y = scene2d.AppDataArpg.sceneStagePos.y + a.y * scene2d.MapConfig.pix15.y;
            $v2d.x *= scene2d.Engine2d.htmlScale;
            $v2d.y *= scene2d.Engine2d.htmlScale;
            var $p = scene2d.AppDataArpg.math2Dto3DGroundarpg($v2d);
            return $p;
        };
        SceneAstarModel.prototype.clearAstarLine = function () {
            this._astarLineSprite.clear();
            this._astarLineSprite.upToGpu();
        };
        SceneAstarModel.prototype.mouseDownFindLoad = function ($evt) {
            this.lastMouseDownTm = TimeUtil.getTimer();
        };
        SceneAstarModel.prototype.mouseMoveFindLoad = function ($evt) {
            this.lastMouseDownTm = 0;
        };
        SceneAstarModel.prototype.mouseUpFindLoad = function ($evt) {
            if (!GameInstance.mainChar) {
                return;
            }
            if ((TimeUtil.getTimer() - this.lastMouseDownTm) < 200) {
                var $hitSceneChar = this.findHitChat(new Vector2D($evt.x, $evt.y));
                GameInstance.attackTarget = $hitSceneChar;
                if ($hitSceneChar) {
                    scene2d.AppDataArpg.lockMainChar = true;
                }
                else {
                    var $beginV2 = SceneAstarModel.getAstarBySceneV3D(new Vector3D(GameInstance.mainChar.x, 0, GameInstance.mainChar.z));
                    var $toV2 = this.getAstarSceneByMouse($evt);
                    var item = AstarUtil.findPath2D($beginV2, $toV2);
                    if (item && item.length) {
                        MainCharControlModel.getInstance().setWalkPathFun(item);
                    }
                }
            }
        };
        SceneAstarModel.prototype.findHitChat = function ($evt) {
            return null;
        };
        SceneAstarModel.getPosIsCanMove = function ($v3d) {
            if (!scene2d.MapConfig.getInstance().astarItem) {
                console.log("寻路这时是不可的a");
                return false;
            }
            var $v2d = this.getAstarBySceneV3D($v3d);
            return !scene2d.MapConfig.getInstance().isBlock($v2d.x, $v2d.y);
        };
        //收获鼠标的A星坐标
        SceneAstarModel.prototype.getAstarSceneByMouse = function ($evt) {
            var mouse2D = new Vector2D();
            mouse2D.x = $evt.x / scene2d.MapConfig.Scale - scene2d.AppDataArpg.sceneStagePos.x;
            mouse2D.y = $evt.y / scene2d.MapConfig.Scale - scene2d.AppDataArpg.sceneStagePos.y;
            mouse2D.x = Math.round(mouse2D.x / scene2d.MapConfig.pix15.x);
            mouse2D.y = Math.round(mouse2D.y / scene2d.MapConfig.pix15.y);
            return mouse2D;
        };
        //3d世界坐标得到2D坐标
        SceneAstarModel.getAstarBySceneV3D = function ($v3d) {
            var $v2 = scene2d.AppDataArpg.getScene2DBy3Dpostion($v3d);
            $v2.x = Math.round($v2.x / scene2d.MapConfig.pix15.x);
            $v2.y = Math.round($v2.y / scene2d.MapConfig.pix15.y);
            return $v2;
        };
        SceneAstarModel.prototype.drawTemp = function (astarItem) {
            this._astarLineSprite.clear();
            this._astarLineSprite.baseColor = new Vector3D(0.6, 0.6, 0.6, 1);
            var w = astarItem[0].length;
            var h = astarItem.length;
            var miduX15 = scene2d.MapConfig.pix15.x / scene2d.MapConfig.Scale * scene2d.Engine2d.htmlScale;
            var miduY15 = scene2d.MapConfig.pix15.y / scene2d.MapConfig.Scale * scene2d.Engine2d.htmlScale;
            var $hscale = 1 / Math.sin(45 * Math.PI / 180);
            for (var i = 0; i < astarItem.length; i++) {
                for (var j = 0; j < astarItem[i].length; j++) {
                    if (astarItem[i][j] == 1) {
                        var pos = new Vector3D(j * miduX15, 0, -i * miduY15);
                        pos.z = pos.z * $hscale;
                        var $a = new Vector3D(pos.x, pos.y, pos.z);
                        var $b = new Vector3D(pos.x + miduX15, pos.y, pos.z);
                        var $c = new Vector3D(pos.x + miduX15, pos.y, pos.z - miduY15 * $hscale);
                        var $d = new Vector3D(pos.x, pos.y, pos.z - miduY15 * $hscale);
                        this._astarLineSprite.makeLineMode($a, $b);
                        this._astarLineSprite.makeLineMode($a, $d);
                        if (astarItem[i + 1] && astarItem[i + 1][j] != 1) {
                            this._astarLineSprite.makeLineMode($c, $d);
                        }
                        if (astarItem[i][j + 1] && astarItem[i][j + 1] != 1) {
                            this._astarLineSprite.makeLineMode($b, $c);
                        }
                    }
                }
            }
            this._astarLineSprite.upToGpu();
        };
        SceneAstarModel.prototype.Path2dTo3d = function (result) {
            var astarPosItem = new Array;
            for (var i = 0; i < result.length; i++) {
                astarPosItem.push(this.getWorldPosByStart2D(result[i]));
            }
            return astarPosItem;
        };
        return SceneAstarModel;
    }(UIPanel));
    scene2d.SceneAstarModel = SceneAstarModel;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=SceneAstarModel.js.map