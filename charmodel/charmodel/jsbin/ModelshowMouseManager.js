var CharShow;
(function (CharShow) {
    var ModelshowMouseManager = /** @class */ (function () {
        function ModelshowMouseManager() {
        }
        ModelshowMouseManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new ModelshowMouseManager();
            }
            return this._instance;
        };
        ModelshowMouseManager.prototype.addMouseEvent = function () {
            var _this = this;
            if (Scene_data.isPc) {
                document.addEventListener(MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
                document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
            }
            else {
                document.addEventListener(MouseType.TouchMove, function ($evt) { _this.mouseToEvent($evt); });
                document.addEventListener(MouseType.TouchEnd, function ($evt) { _this.mouseToEvent($evt); });
                document.addEventListener(MouseType.TouchStart, function ($evt) { _this.mouseToEvent($evt); });
            }
        };
        ModelshowMouseManager.prototype.onMouseWheel = function ($evt) {
        };
        ModelshowMouseManager.prototype.onMouse = function ($e) {
            var evt;
            var point = new Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == MouseType.MouseDown) {
                    evt = new InteractiveEvent(InteractiveEvent.Down);
                }
                else if ($e.type == MouseType.MouseUp) {
                    evt = new InteractiveEvent(InteractiveEvent.Up);
                }
                else if ($e.type == MouseType.MouseMove) {
                    evt = new InteractiveEvent(InteractiveEvent.Move);
                }
                else if ($e.type == MouseType.MouseClick) {
                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            this.makeMouseEvent(evt, point);
        };
        ModelshowMouseManager.prototype.mouseToEvent = function ($touchEvent) {
            var evt;
            var point = new Vector2D();
            if ($touchEvent.type == MouseType.TouchStart) {
                evt = new InteractiveEvent(InteractiveEvent.Down);
            }
            else if ($touchEvent.type == MouseType.TouchEnd) {
                evt = new InteractiveEvent(InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            }
            else if ($touchEvent.type == MouseType.TouchMove) {
                evt = new InteractiveEvent(InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
        };
        ModelshowMouseManager.prototype.makeMouseEvent = function (evt, point) {
            var temp = UIManager.getInstance().mouseEvetData(evt, point);
            if (!temp) {
                if (evt.type == InteractiveEvent.Up) {
                    this.clikSceneGround(point);
                }
            }
        };
        ModelshowMouseManager.prototype.clikSceneGround = function ($pos) {
        };
        ModelshowMouseManager.prototype.walkPathComplete = function () {
        };
        return ModelshowMouseManager;
    }());
    CharShow.ModelshowMouseManager = ModelshowMouseManager;
})(CharShow || (CharShow = {}));
//# sourceMappingURL=ModelshowMouseManager.js.map