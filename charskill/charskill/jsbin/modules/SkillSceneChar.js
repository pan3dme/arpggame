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
var SkillSceneChar = /** @class */ (function (_super) {
    __extends(SkillSceneChar, _super);
    function SkillSceneChar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkillSceneChar.prototype.onMeshLoaded = function () {
        _super.prototype.onMeshLoaded.call(this);
        if (this.loadFinishFun) {
            this.loadFinishFun();
        }
    };
    SkillSceneChar.prototype.changeAction = function ($action) {
        this.curentAction = this._defaultAction;
        if (this.changeActionFun) {
            this.changeActionFun($action);
        }
    };
    return SkillSceneChar;
}(SceneChar));
//# sourceMappingURL=SkillSceneChar.js.map