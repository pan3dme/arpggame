var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var skill;
    (function (skill) {
        var SkillData = (function (_super) {
            __extends(SkillData, _super);
            function SkillData() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.srcList = new Array();
                return _this;
            }
            SkillData.prototype.addSrcSkill = function ($skill) {
                this.srcList.push($skill);
            };
            SkillData.prototype.destory = function () {
                for (var i = 0; i < this.srcList.length; i++) {
                    this.srcList[i].destory();
                    skill.SkillManager.getInstance().gcSkill(this.srcList[i]);
                }
            };
            SkillData.prototype.testDestory = function () {
                for (var i = 0; i < this.srcList.length; i++) {
                    if (!(this.srcList[i].isDeath && this.srcList[i].idleTime >= ResCount.GCTime)) {
                        return false;
                    }
                }
                return true;
            };
            return SkillData;
        }(engine.base.ResCount));
        skill.SkillData = SkillData;
    })(skill = engine.skill || (engine.skill = {}));
})(engine || (engine = {}));
//# sourceMappingURL=SkillData.js.map