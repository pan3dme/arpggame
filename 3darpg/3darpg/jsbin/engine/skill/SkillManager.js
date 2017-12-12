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
var SkillManager = /** @class */ (function (_super) {
    __extends(SkillManager, _super);
    function SkillManager() {
        var _this = 
        //this._dic = new Object();
        _super.call(this) || this;
        _this._time = 0;
        _this._skillDic = new Object;
        _this._loadDic = new Object;
        _this._skillAry = new Array;
        _this._preLoadDic = new Object;
        return _this;
    }
    SkillManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new SkillManager();
        }
        return this._instance;
    };
    SkillManager.prototype.update = function () {
        var _tempTime = TimeUtil.getTimer();
        var t = _tempTime - this._time;
        for (var i = 0; i < this._skillAry.length; i++) {
            this._skillAry[i].update(t);
        }
        this._time = _tempTime;
    };
    SkillManager.prototype.preLoadSkill = function ($url) {
        var _this = this;
        if (this._dic[$url] || this._preLoadDic[$url]) {
            return;
        }
        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, function ($skillRes) {
            var skillData = new SkillData();
            skillData.data = $skillRes.data;
            //skillData.useNum++;
            _this._dic[$url] = skillData;
        });
        this._preLoadDic[$url] = true;
    };
    //private _itemLoadDic: Object;
    //加载完整的一组技能
    // public getSkillToItem($url: string, $item: Array<Skill>)
    // {
    //     if (!(this._itemLoadDic)) {
    //         this._itemLoadDic=new Object()
    //     }
    //     if (this._dic[$url]) {
    //         this.readKey($url, $item)
    //     } else {
    //         if (this._itemLoadDic[$url]) {
    //             this._itemLoadDic[$url].push($item)
    //             return ;
    //         }
    //         this._itemLoadDic[$url] = new Array;
    //         this._itemLoadDic[$url].push($item)
    //         ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {
    //             var skillData: SkillData = new SkillData();
    //             skillData.data = $skillRes.data;
    //             this._dic[$url] = skillData;
    //             for (var i: number = 0; i < this._itemLoadDic[$url].length; i++) {
    //                 this.readKey($url, this._itemLoadDic[$url][i])
    //             }
    //             this._itemLoadDic[$url].length = 0
    //             this._itemLoadDic[$url] = null;
    //         });
    //     }
    // }
    // private readKey($url: string, $item: Array<Skill>): void {
    //     for (var keystr in this._dic[$url].data) {
    //         var $skill: Skill = this.getSkill($url, keystr)
    //         $skill.useNum = 1;
    //         $item.push($skill);
    //     }
    // }
    SkillManager.prototype.getSkill = function ($url, $name) {
        var _this = this;
        var skill;
        var key = $url + $name;
        var ary = this._skillDic[key];
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                skill = ary[i];
                if (skill.isDeath && skill.useNum == 0) {
                    skill.reset();
                    skill.isDeath = false;
                    return skill;
                }
            }
        }
        skill = new Skill();
        skill.name = $name;
        skill.isDeath = false;
        if (!this._skillDic[key]) {
            this._skillDic[key] = new Array;
        }
        this._skillDic[key].push(skill);
        if (this._dic[$url]) {
            skill.setData(this._dic[$url].data[skill.name], this._dic[$url]);
            this._dic[$url].useNum++;
            return skill;
        }
        if (this._loadDic[$url]) {
            var obj = new Object;
            obj.name = $name;
            obj.skill = skill;
            this._loadDic[$url].push(obj);
            return skill;
        }
        this._loadDic[$url] = new Array;
        var obj = new Object;
        obj.name = $name;
        obj.skill = skill;
        this._loadDic[$url].push(obj);
        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, function ($skillRes) {
            _this.loadSkillCom($url, $skillRes);
        });
        return skill;
    };
    SkillManager.prototype.loadSkillCom = function ($url, $skillRes) {
        var skillData = new SkillData();
        skillData.data = $skillRes.data;
        for (var i = 0; i < this._loadDic[$url].length; i++) {
            var obj = this._loadDic[$url][i];
            obj.skill.setData(skillData.data[obj.name], skillData);
            skillData.useNum++;
        }
        this._loadDic[$url].length = 0;
        this._loadDic[$url] = null;
        this._dic[$url] = skillData;
    };
    SkillManager.prototype.playSkill = function ($skill) {
        this._skillAry.push($skill);
        $skill.play();
    };
    SkillManager.prototype.removeSkill = function ($skill) {
        var index = this._skillAry.indexOf($skill);
        if (index != -1) {
            this._skillAry.splice(index, 1);
        }
    };
    SkillManager.prototype.gc = function () {
        _super.prototype.gc.call(this);
        for (var key in this._skillDic) {
            var ary = this._skillDic[key];
            for (var i = ary.length - 1; i >= 0; i--) {
                if (ary[i].isDeath && ary[i].useNum <= 0) {
                    ary[i].idleTime++;
                    if (ary[i].idleTime >= ResCount.GCTime) {
                        ary[i].destory();
                        ary.splice(i, 1);
                    }
                }
            }
            if (ary.length == 0) {
                console.log("清理 -" + key);
                delete this._skillDic[key];
            }
        }
    };
    return SkillManager;
}(ResGC));
var ShockUtil = /** @class */ (function () {
    function ShockUtil() {
        var _this = this;
        this.upFun = function ($d) {
            _this.update($d);
        };
    }
    ShockUtil.getInstance = function () {
        if (!this._instance) {
            this._instance = new ShockUtil();
        }
        return this._instance;
    };
    ShockUtil.prototype.update = function ($dtime) {
        this.ctime += $dtime;
        if (this.ctime > this.time) {
            TimeUtil.removeFrameTick(this.upFun);
            Scene_data.cam3D.offset.setTo(0, 0, 0);
            return;
        }
        var ranX = (Math.random() - 0.5) * this.amp;
        var ranY = (Math.random() - 0.5) * this.amp;
        var ranZ = (Math.random() - 0.5) * this.amp;
        Scene_data.cam3D.offset.setTo(ranX, ranY, ranZ);
    };
    ShockUtil.prototype.shock = function (time, amp) {
        this.time = time;
        this.ctime = 0;
        this.amp = amp;
        TimeUtil.addFrameTick(this.upFun);
    };
    return ShockUtil;
}());
//# sourceMappingURL=SkillManager.js.map