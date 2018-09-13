var engine;
(function (engine) {
    var skill;
    (function (skill) {
        var path;
        (function (path) {
            var PathManager = (function () {
                function PathManager() {
                }
                PathManager.reg = function (types, cls) {
                    this.dic[types] = cls;
                };
                PathManager.getNewPath = function (types) {
                    var cls = this.dic[types];
                    return new cls();
                };
                PathManager.init = function () {
                    this.dic[0] = path.SkillPath;
                    this.dic[1] = path.SkillSinPath;
                    this.dic[2] = path.SkillCosPath;
                };
                return PathManager;
            }());
            PathManager.dic = new Object;
            path.PathManager = PathManager;
        })(path = skill.path || (skill.path = {}));
    })(skill = engine.skill || (engine.skill = {}));
})(engine || (engine = {}));
//# sourceMappingURL=PathManager.js.map