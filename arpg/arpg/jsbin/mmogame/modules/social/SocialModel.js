var social;
(function (social) {
    //技能的三个类型
    var SkillBaseType = (function () {
        function SkillBaseType() {
        }
        return SkillBaseType;
    }());
    SkillBaseType.ZHUDONG = 0;
    SkillBaseType.NUQI = 1;
    SkillBaseType.BEIDONG = 2;
    social.SkillBaseType = SkillBaseType;
    var SocialgivingData = (function () {
        function SocialgivingData() {
        }
        return SocialgivingData;
    }());
    social.SocialgivingData = SocialgivingData;
    var SocialModel = (function () {
        function SocialModel() {
        }
        SocialModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SocialModel();
            }
            return this._instance;
        };
        return SocialModel;
    }());
    social.SocialModel = SocialModel;
})(social || (social = {}));
//# sourceMappingURL=SocialModel.js.map