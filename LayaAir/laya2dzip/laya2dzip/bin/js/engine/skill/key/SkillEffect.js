var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engine;
(function (engine) {
    var skill;
    (function (skill) {
        var key;
        (function (key) {
            var SkillEffect = (function (_super) {
                __extends(SkillEffect, _super);
                function SkillEffect() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SkillEffect.prototype.addToRender = function () {
                    _super.prototype.addToRender.call(this);
                    this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
                };
                SkillEffect.prototype.onPlayCom = function (event) {
                    if (event === void 0) { event = null; }
                    this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
                    ParticleManager.getInstance().removeParticle(this.particle);
                    this.removeCallFun(this);
                };
                return SkillEffect;
            }(engine.skill.key.SkillKey));
            key.SkillEffect = SkillEffect;
        })(key = skill.key || (skill.key = {}));
    })(skill = engine.skill || (engine.skill = {}));
})(engine || (engine = {}));
//# sourceMappingURL=SkillEffect.js.map