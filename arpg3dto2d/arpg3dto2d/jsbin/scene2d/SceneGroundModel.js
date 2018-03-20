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
function get2dMappicById($id) {
    return "pan/zymap2d/scene/" + $id + "/maps/";
}
function get2dMapdataById($id) {
    return "pan/zymap2d/maps/" + $id + ".txt";
}
var scene2d;
(function (scene2d) {
    var GroundMapVo = /** @class */ (function () {
        function GroundMapVo() {
        }
        Object.defineProperty(GroundMapVo.prototype, "mapresId", {
            get: function () {
                return this._mapresId;
            },
            set: function (value) {
                if (this._mapresId != value) {
                    this.key = null;
                    this.lastUrl = null;
                }
                this._mapresId = value;
            },
            enumerable: true,
            configurable: true
        });
        GroundMapVo.prototype.drawCtx = function ($uiAtlas, $v2d) {
            var $mapid = 1007;
            if (isNaN(this._mapresId)) {
                return;
            }
            if (this._mapresId > 0) {
                $mapid = this._mapresId;
            }
            var $url = get2dMappicById($mapid) + $v2d.y + "_" + $v2d.x + ".jpg";
            if (this.lastUrl != $url) {
                //  console.log($url)
                this.lastUrl = $url;
                $uiAtlas.upDataPicToTexture(this.lastUrl, this.ui.skinName);
            }
            this.key = $v2d;
        };
        return GroundMapVo;
    }());
    scene2d.GroundMapVo = GroundMapVo;
    var SceneGroundModel = /** @class */ (function (_super) {
        __extends(SceneGroundModel, _super);
        function SceneGroundModel() {
            var _this = _super.call(this) || this;
            _this.key256 = 256;
            _this.top = 0;
            _this.left = 0;
            _this.layer = -1;
            _this.width = UIData.designWidth;
            _this.height = UIData.designHeight;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this.initConfigGroundUiAtlas();
            return _this;
        }
        SceneGroundModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneGroundModel();
            }
            return this._instance;
        };
        SceneGroundModel.prototype.initData = function (value) {
            if (value === void 0) { value = 0; }
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            for (var i = 0; i < this.mapuiItem.length; i++) {
                var $vo = this.mapuiItem[i];
                $vo.mapresId = value;
            }
            this.resetViewMatrx3D();
        };
        SceneGroundModel.prototype.initConfigGroundUiAtlas = function () {
            if (SceneGroundModel.configSize) {
                this.key256 = SceneGroundModel.configSize;
            }
            this.mapuiItem = new Array();
            this._bottomRender.uiAtlas = new UIAtlas;
            var $uiAtlas = this._bottomRender.uiAtlas;
            $uiAtlas.configData = new Array();
            console.log("configSize", this.key256);
            var $textureSize1024 = this.key256 * 4;
            $uiAtlas.ctx = UIManager.getInstance().getContext2D($textureSize1024, $textureSize1024, false);
            $uiAtlas.textureRes = new TextureRes;
            $uiAtlas.textureRes.texture = Scene_data.context3D.getTexture($uiAtlas.ctx.canvas, 0, 1); //不是线性纹理
            // this._bottomRender.scale=2
            for (var i = 0; i < (4 * 4); i++) {
                var $vo = new GroundMapVo;
                $vo.id = i;
                var $pos = new Vector2D(Math.floor(i % 4), Math.floor(i / 4));
                $uiAtlas.configData.push($uiAtlas.getObject("idk" + i, $pos.x * this.key256, $pos.y * this.key256, this.key256, this.key256, $textureSize1024, $textureSize1024));
                $vo.ui = this.addChild(this._bottomRender.creatBaseComponent("idk" + i));
                $vo.ui.scale = 2 / UIData.Scale * (scene2d.Engine2d.htmlScale);
                this.mapuiItem.push($vo);
            }
        };
        SceneGroundModel.prototype.resetViewMatrx3D = function () {
            this.saveUseKey();
            var $v2 = scene2d.AppDataArpg.sceneStagePos;
            for (var i = 0; i < this.mapuiItem.length; i++) {
                var $vo = this.mapuiItem[i];
                if ($vo.key) {
                    $vo.ui.x = (this.key256 * $vo.key.x + $v2.x);
                    $vo.ui.y = (this.key256 * $vo.key.y + $v2.y);
                }
                else {
                    $vo.ui.x = 9999;
                }
            }
        };
        SceneGroundModel.prototype.saveUseKey = function () {
            var $keyItem = new Array();
            var $v2 = scene2d.AppDataArpg.sceneStagePos;
            var tx = $v2.x % this.key256 - this.key256;
            var ty = $v2.y % this.key256 - this.key256;
            for (var i = 0; i < this.mapuiItem.length; i++) {
                var $moveWH = new Vector2D(Math.floor(i % 4), Math.floor(i / 4));
                var $kt = new Vector2D(Math.floor($moveWH.x - $v2.x / this.key256), Math.floor($moveWH.y - $v2.y / this.key256));
                if ($kt.x >= 0 && $kt.y >= 0) {
                    $keyItem.push($kt);
                }
            }
            this.clearKey($keyItem);
            this.addKeyToUi($keyItem);
        };
        SceneGroundModel.prototype.clearKey = function ($keyItem) {
            for (var i = 0; i < this.mapuiItem.length; i++) {
                var $has = false;
                for (var j = 0; j < $keyItem.length; j++) {
                    if (this.mapuiItem[i].key && this.mapuiItem[i].key.x == $keyItem[j].x && this.mapuiItem[i].key.y == $keyItem[j].y) {
                        $has = true;
                    }
                }
                if (!$has) {
                    this.mapuiItem[i].key = null;
                }
            }
        };
        SceneGroundModel.prototype.addKeyToUi = function ($keyItem) {
            for (var j = 0; j < $keyItem.length; j++) {
                var $has = false;
                for (var i = 0; i < this.mapuiItem.length; i++) {
                    if (this.mapuiItem[i].key && this.mapuiItem[i].key.x == $keyItem[j].x && this.mapuiItem[i].key.y == $keyItem[j].y) {
                        $has = true;
                    }
                }
                if (!$has) {
                    var $vo = this.getEempty();
                    $vo.drawCtx(this._bottomRender.uiAtlas, $keyItem[j]);
                }
            }
        };
        SceneGroundModel.prototype.getEempty = function () {
            for (var i = 0; i < this.mapuiItem.length; i++) {
                if (!this.mapuiItem[i].key) {
                    return this.mapuiItem[i];
                }
            }
        };
        return SceneGroundModel;
    }(UIPanel));
    scene2d.SceneGroundModel = SceneGroundModel;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=SceneGroundModel.js.map