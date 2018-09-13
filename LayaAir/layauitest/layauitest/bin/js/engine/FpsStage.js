var engine;
(function (engine) {
    var FpsMc = (function () {
        function FpsMc() {
            this.drawNum = 0;
            this.fpsStr = "";
        }
        FpsMc.update = function () {
        };
        FpsMc.prototype.getStr = function () {
            if (true) {
                // FpsMc.fpsNowNum = Math.min(this.drawNum + float2int(this.drawNum / 10 * FpsMc.addFps), 60)
                FpsMc.fpsNowNum = Math.min(this.drawNum, 600);
                this.fpsStr = "Fps:" + String(FpsMc.fpsNowNum) + "-" + FpsMc.tipStr;
            }
            return this.fpsStr;
        };
        return FpsMc;
    }());
    FpsMc.addFps = 0;
    FpsMc.fpsNowNum = 0;
    FpsMc.tipStr = "";
    engine.FpsMc = FpsMc;
    var FpsStage = (function () {
        function FpsStage() {
            this.lastTime = 0;
            this.cPos = new engine.math.Vector2D(150, 100);
        }
        FpsStage.getInstance = function () {
            if (!this._instance) {
                this._instance = new FpsStage();
            }
            return this._instance;
        };
        FpsStage.prototype.init = function ($cadves, $loadCav) {
            var _this = this;
            this.canvas2D = $cadves;
            this.loadCav = $loadCav;
            this.fps = new FpsMc();
            this.canvasUi = this.canvas2D.getContext("2d");
            this.loadCtx = this.loadCav.getContext("2d");
            engine.utils.TimeUtil.addFrameTick(function () { _this.upData(); });
        };
        FpsStage.prototype.showLoadInfo = function (str) {
            /*
            this.loadCtx.clearRect(0, 0, this.loadCav.width, this.loadCav.height);
            this.loadCtx.font = "40px Helvetica";
            this.loadCtx.fillStyle = "#ffffff";
            this.loadCtx.textBaseline = "top";
            this.loadCtx.textAlign = "left";
            this.loadCtx.fillText(str, 0, 0);
    
            */
        };
        FpsStage.prototype.removeShowLoad = function () {
            if (this.loadCav.parentElement) {
                this.loadCav.parentElement.removeChild(this.loadCav);
            }
            FpsStage.showFps = true;
        };
        FpsStage.prototype.upData = function () {
            this.fps.drawNum++;
            if (this.lastTime >= engine.utils.TimeUtil.getTimer() - 1000) {
                return;
            }
            this.lastTime = engine.utils.TimeUtil.getTimer();
            if (!FpsStage.showFps) {
                this.canvasUi.clearRect(0, 0, this.canvas2D.width, this.canvas2D.height);
                return;
            }
            this.canvasUi.font = "40px Helvetica";
            var wNum = this.canvasUi.measureText(this.fps.getStr()).width;
            this.canvas2D.width = wNum;
            this.canvas2D.height = 30;
            this.canvasUi.clearRect(50, 0, this.canvas2D.width - 50, this.canvas2D.height);
            this.canvasUi.fillStyle = "#000000"; // text color
            this.canvasUi.fillRect(50, 0, this.canvas2D.width - 50, this.canvas2D.height);
            this.canvasUi.font = "30px Helvetica";
            this.canvasUi.fillStyle = "#ffffff"; // text color
            this.canvasUi.textBaseline = engine.ui.base.TextAlign.TOP;
            this.canvasUi.textAlign = engine.ui.base.TextAlign.LEFT;
            this.canvasUi.fillText(this.fps.getStr(), 50, 0);
            this.fps.drawNum = 0;
        };
        FpsStage.prototype.makeXyzLine = function () {
            var xPos = new engine.math.Vector3D(80, 0, 0);
            var yPos = new engine.math.Vector3D(0, 70, 0);
            var zPos = new engine.math.Vector3D(0, 0, 80);
            var $m = new engine.math.Matrix3D;
            $m.appendRotation(engine.context.Scene_data.cam3D.rotationY, engine.math.Vector3D.Y_AXIS);
            $m.appendRotation(engine.context.Scene_data.cam3D.rotationX, engine.math.Vector3D.X_AXIS);
            xPos = $m.transformVector(xPos);
            yPos = $m.transformVector(yPos);
            zPos = $m.transformVector(zPos);
            this.drawLine(new engine.math.Vector2D(0, 0), new engine.math.Vector2D(xPos.x, -xPos.y), "#ff0000");
            this.drawLine(new engine.math.Vector2D(0, 0), new engine.math.Vector2D(yPos.x, -yPos.y), "#00ff00");
            this.drawLine(new engine.math.Vector2D(0, 0), new engine.math.Vector2D(zPos.x, -zPos.y), "#0000ff");
            this.canvasUi.font = "12px Helvetica";
            this.canvasUi.fillStyle = "#ff0000"; // text color
            this.canvasUi.fillText("x", xPos.x + this.cPos.x, -xPos.y + this.cPos.y);
            this.canvasUi.fillStyle = "#00ff00"; // text color
            this.canvasUi.fillText("y", yPos.x + this.cPos.x, -yPos.y + this.cPos.y);
            this.canvasUi.fillStyle = "#0000ff"; // text color
            this.canvasUi.fillText("z", zPos.x + this.cPos.x, -zPos.y + this.cPos.y);
        };
        FpsStage.prototype.drawLine = function (a, b, $color) {
            if ($color === void 0) { $color = "red"; }
            this.canvasUi.beginPath();
            this.canvasUi.lineWidth = 2;
            this.canvasUi.strokeStyle = $color;
            this.canvasUi.moveTo(a.x + this.cPos.x, a.y + this.cPos.y);
            this.canvasUi.lineTo(b.x + this.cPos.x, b.y + this.cPos.y);
            this.canvasUi.stroke();
        };
        FpsStage.prototype.resetSize = function () {
            this.cPos = new engine.math.Vector2D(150, engine.context.Scene_data.stageHeight - 100);
        };
        return FpsStage;
    }());
    FpsStage.showFps = false;
    engine.FpsStage = FpsStage;
})(engine || (engine = {}));
//# sourceMappingURL=FpsStage.js.map