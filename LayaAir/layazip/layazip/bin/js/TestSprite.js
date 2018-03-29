var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var TestSprite = (function (_super) {
    __extends(TestSprite, _super);
    function TestSprite(scene2d) {
        var _this = _super.call(this) || this;
        //设置当前显示对象的渲染模式为自定义渲染模式。
        _this._renderType |= Laya.RenderSprite.CUSTOM;
        _this._scene2d = scene2d;
        return _this;
    }
    //重写渲染函数。
    TestSprite.prototype.customRender = function (context, x, y) {
        context.clear();
        this._scene2d.update();
    };
    return TestSprite;
}(Laya.Sprite));
//# sourceMappingURL=TestSprite.js.map