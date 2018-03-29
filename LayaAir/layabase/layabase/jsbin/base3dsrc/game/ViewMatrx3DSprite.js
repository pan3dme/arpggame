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
var ViewMatrx3DSprite = /** @class */ (function (_super) {
    __extends(ViewMatrx3DSprite, _super);
    function ViewMatrx3DSprite() {
        var _this = _super.call(this) || this;
        SceneManager.getInstance().addDisplay(_this);
        return _this;
    }
    ViewMatrx3DSprite.getInstance = function () {
        if (!this._instance) {
            this._instance = new ViewMatrx3DSprite();
        }
        return this._instance;
    };
    ViewMatrx3DSprite.prototype.update = function () {
        if (true) {
            this.x = Scene_data.focus3D.x;
            this.y = Scene_data.focus3D.y + 5;
            this.z = Scene_data.focus3D.z;
        }
        _super.prototype.update.call(this);
    };
    ViewMatrx3DSprite.prototype.drawCircle = function ($num) {
        var n = 36;
        var last;
        this.clear();
        this.baseColor = new Vector3D(0, 1, 1, 1);
        for (var i = 0; i < n; i++) {
            var m = new Matrix3D;
            m.appendRotation(i * (360 / n), Vector3D.Y_AXIS);
            var a = m.transformVector(new Vector3D($num, 0, 0));
            if (last) {
                this.makeLineMode(last, a);
            }
            last = a;
        }
        // this.makeLineMode(new Vector3D, new Vector3D(100,100,100))
        this.upToGpu();
    };
    ViewMatrx3DSprite.prototype.draw = function () {
        this.drawCircle(100);
        return;
    };
    ViewMatrx3DSprite.prototype.makePolygonObjData = function ($data) {
        var tempSprite = new LineDisplaySprite();
        tempSprite.clear();
        tempSprite.baseColor = new Vector3D(0, 1, 1, 1);
        var a;
        var b;
        var c;
        var A;
        var B;
        var C;
        for (var i = 0; i < $data.indexs.length / 3; i++) {
            a = $data.indexs[i * 3 + 0];
            b = $data.indexs[i * 3 + 1];
            c = $data.indexs[i * 3 + 2];
            A = new Vector3D($data.vertices[a * 3 + 0], $data.vertices[a * 3 + 1], $data.vertices[a * 3 + 2]);
            B = new Vector3D($data.vertices[b * 3 + 0], $data.vertices[b * 3 + 1], $data.vertices[b * 3 + 2]);
            C = new Vector3D($data.vertices[c * 3 + 0], $data.vertices[c * 3 + 1], $data.vertices[c * 3 + 2]);
            tempSprite.makeLineMode(A, B);
            tempSprite.makeLineMode(B, C);
            tempSprite.makeLineMode(C, A);
        }
        tempSprite.upToGpu();
        return tempSprite.objData;
    };
    return ViewMatrx3DSprite;
}(LineDisplaySprite));
//# sourceMappingURL=ViewMatrx3DSprite.js.map