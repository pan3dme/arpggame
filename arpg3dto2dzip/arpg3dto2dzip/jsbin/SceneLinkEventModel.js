var scene2d;
(function (scene2d) {
    var SceneLinkEventModel = /** @class */ (function () {
        function SceneLinkEventModel() {
        }
        SceneLinkEventModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneLinkEventModel();
            }
            return this._instance;
        };
        SceneLinkEventModel.prototype.addEvets = function () {
            var _this = this;
            document.addEventListener(MouseType.KeyDown, function ($evt) { _this.onKeyDown($evt); });
            GameMouseManager.getInstance().onSceneMouseDown = function ($evt) { _this.onSceneMouseDown($evt); };
            GameMouseManager.getInstance().addMouseEvent();
        };
        SceneLinkEventModel.prototype.onSceneMouseDown = function ($evt) {
            this.onMouseDown($evt);
        };
        SceneLinkEventModel.prototype.onKeyDown = function ($evt) {
        };
        SceneLinkEventModel.prototype.onMouseDown = function ($evt) {
            if (GameInstance.mainChar) {
                var $beginV2 = scene2d.SceneAstarModel.getAstarBySceneV3D(new Vector3D(GameInstance.mainChar.x, 0, GameInstance.mainChar.z));
                var $toV2 = scene2d.SceneAstarModel.getInstance().getAstarSceneByMouse($evt);
                var $item = AstarUtil.findPath2D($beginV2, $toV2);
                if ($item && $item.length) {
                    $item.shift();
                    GameInstance.mainChar.applyWalk($item);
                }
            }
        };
        return SceneLinkEventModel;
    }());
    scene2d.SceneLinkEventModel = SceneLinkEventModel;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=SceneLinkEventModel.js.map