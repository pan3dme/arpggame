var activity;
(function (activity) {
    //活动类型
    var ActivityType = /** @class */ (function () {
        function ActivityType() {
        }
        ActivityType.ALL = 0;
        return ActivityType;
    }());
    activity.ActivityType = ActivityType;
    var ActivityModel = /** @class */ (function () {
        function ActivityModel() {
            this.getBaseList();
        }
        ActivityModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ActivityModel();
            }
            return this._instance;
        };
        ActivityModel.prototype.getBaseList = function () {
            this._activityary = new Array();
            var tabary = tb.TB_activity_base.get_TB_activity_base();
            for (var i = 0; i < tabary.length; i++) {
                var aa = new ActivityItemVo();
                aa.data = tabary[i];
                this._activityary.push(aa);
            }
        };
        ActivityModel.prototype.compareAandB = function ($ary, $type) {
            if ($ary) {
                var newAry = this.getList($type);
                for (var i = 0; i < newAry.length; i++) {
                    if (newAry[i].data.id != $ary[i].data.id) {
                        return true;
                    }
                    if (newAry[i].state != $ary[i].state) {
                        return true;
                    }
                    if (newAry[i].getNum() != $ary[i].getNum()) {
                        return true;
                    }
                }
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * getList
         */
        ActivityModel.prototype.getList = function ($type) {
            var $finalary;
            switch ($type) {
                case ActivityType.ALL:
                    //所有活动
                    $finalary = this.divisionAry(this.getAllList());
                    break;
                default:
                    break;
            }
            return $finalary;
        };
        //限时活动列表
        ActivityModel.prototype.getAllList = function () {
            var $allList = new Array;
            for (var i = 0; i < this._activityary.length; i++) {
                $allList.push(this._activityary[i]);
            }
            return $allList;
        };
        ActivityModel.prototype.SortListByTime = function ($ary) {
            $ary.sort(function (a, b) {
                if (a.getNearTime() < b.getNearTime()) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            return $ary;
        };
        ActivityModel.prototype.SortListByOpenLev = function ($ary) {
            $ary.sort(function (a, b) {
                if (a.openLev < b.openLev) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            return $ary;
        };
        ActivityModel.prototype.SortListByConditions = function ($ary) {
            $ary.sort(function (a, b) {
                if (b.getActivitySortNum() < a.getActivitySortNum()) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            return $ary;
        };
        ActivityModel.prototype.divisionAry = function ($ary) {
            //区分当前可以参加的活动 和 已过时或者不足条件而限制的活动
            var arycanplay = new Array;
            var arydontplay = new Array;
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i].getActivate() && $ary[i].getActivityStart()) {
                    arycanplay.push($ary[i]);
                }
                else {
                    arydontplay.push($ary[i]);
                }
            }
            //区分可参加中的进行中和全天
            var aryproceed = new Array;
            var aryallday = new Array;
            for (var i = 0; i < arycanplay.length; i++) {
                if (arycanplay[i].isallday) {
                    aryallday.push(arycanplay[i]);
                }
                else {
                    aryproceed.push(arycanplay[i]);
                }
            }
            aryproceed = this.SortListByConditions(aryproceed);
            aryallday = this.SortListByConditions(aryallday);
            //区分不可参加中的未激活，未开始，还有已结束
            var arydontactivate = new Array;
            var arydontstart = new Array;
            var aryend = new Array;
            for (var i = 0; i < arydontplay.length; i++) {
                if (arydontplay[i].state == -1) {
                    //未激活
                    arydontactivate.push(arydontplay[i]);
                }
                else if (arydontplay[i].state == 0) {
                    //未开始
                    arydontstart.push(arydontplay[i]);
                }
                else {
                    aryend.push(arydontplay[i]);
                }
            }
            arydontstart = this.SortListByTime(arydontstart);
            arydontactivate = this.SortListByOpenLev(arydontactivate);
            //区分已结束中的已完成和未完成
            var arycomplete = new Array;
            var arydontcomplete = new Array;
            for (var i = 0; i < aryend.length; i++) {
                if (aryend[i].state == 2) {
                    arycomplete.push(aryend[i]);
                }
                else {
                    arydontcomplete.push(aryend[i]);
                }
            }
            arycomplete = this.SortListByConditions(arycomplete);
            arydontcomplete = this.SortListByConditions(arydontcomplete);
            return aryproceed.concat(aryallday, arydontstart, arydontactivate, arycomplete, arydontcomplete);
        };
        return ActivityModel;
    }());
    activity.ActivityModel = ActivityModel;
    var ActivityItemVo = /** @class */ (function () {
        function ActivityItemVo() {
            this.isallday = false; //是否为全天活动
            this.canreceive = false; //是否可领取奖励
        }
        //剩余次数
        ActivityItemVo.prototype.getNum = function () {
            return this.data.nums - GuidData.instanceData.getActivityNumByID(this.data.id);
        };
        ActivityItemVo.prototype.getActivateIsComplete = function () {
            var completenum = GuidData.instanceData.getActivityNumByID(this.data.id);
            var total = this.data.nums;
            var $viplev = GuidData.player.getVipLevel();
            var vipnum;
            if (GuidData.player.getIsVIP()) {
                vipnum = this.data.vipnums[$viplev - 1];
            }
            else {
                vipnum = 0;
            }
            if (total <= completenum) {
                this.canreceive = true;
                if (completenum >= total + vipnum) {
                    //完成了vip次数和总次数，则状态置完成
                    return true;
                }
            }
            return false;
        };
        ActivityItemVo.prototype.getActivate = function () {
            this.openLev = this.data.limdata;
            if (this.data.limtype == 1 && this.data.limdata <= GuidData.player.getLevel()) {
                this.state = 0;
                return true;
            }
            var $time = this.data.time;
            if ($time && $time.length > 0) {
            }
            else {
                //全天活动
                this.isallday = true;
            }
            this.state = -1;
            return false;
        };
        /**
         * 活动是否处于可参加状态
         */
        ActivityItemVo.prototype.getActivityStart = function () {
            var timelimit = false;
            var completelimit = false;
            //1.活动时间
            var $time = this.data.time;
            if ($time && $time.length > 0) {
                //有时限活动
                for (var i = 0; i < $time.length; i++) {
                    if (this.compareTime($time[i][0], $time[i][1])) {
                        //活动未开始
                        this.state = 0;
                        break;
                    }
                    else {
                        if (this.compareTime($time[i][2], $time[i][3])) {
                            //正在进行的活动
                            timelimit = true;
                            break;
                        }
                    }
                    //活动已结束
                    this.state = 3;
                }
            }
            else {
                //全天活动
                this.isallday = true;
                timelimit = true;
            }
            //2.活动完成情况
            if (!this.getActivateIsComplete()) {
                completelimit = true;
            }
            else {
                //活动已完成
                this.state = 2;
            }
            if (timelimit && completelimit) {
                this.state = 1;
            }
            return (timelimit && completelimit);
        };
        ActivityItemVo.prototype.getNearTime = function () {
            //设置状态
            if (this.getActivate()) {
                this.getActivityStart();
            }
            //找一个最近的时间
            var $time = this.data.time;
            if ($time && $time.length > 0) {
                //有时限活动
                for (var i = 0; i < $time.length; i++) {
                    //比较结束时间
                    if (this.compareTime($time[i][2], $time[i][3])) {
                        //记录结束时间
                        return $time[i][2] * 60 + $time[i][3];
                    }
                }
                //如果已结束，则时间最早的日期+1    结束了的，记录开始时间
                return ($time[0][0] + 24) * 60 + $time[0][1];
            }
            else {
                //全天活动
                this.isallday = true;
                //服务器当前标准时间
                var $ts = GameInstance.getServerNow();
                var $sever = new Date($ts * 1000);
                return $sever.getHours() * 60 + $sever.getMinutes();
            }
        };
        ActivityItemVo.prototype.getNearStartTime = function () {
            var $time = this.data.time;
            if ($time && $time.length > 0) {
                //有时限活动
                for (var i = 0; i < $time.length; i++) {
                    //比较结束时间
                    if (this.compareTime($time[i][2], $time[i][3])) {
                        //记录结束时间
                        return this.time2timestr($time[i][0]) + ":" + this.time2timestr($time[i][1]);
                    }
                }
                //如果已结束，则时间最早的日期+1    结束了的，记录开始时间
                return this.time2timestr($time[0][0]) + ":" + this.time2timestr($time[0][1]);
            }
            return "";
        };
        ActivityItemVo.prototype.time2timestr = function ($num) {
            var aa;
            if ($num < 10) {
                aa = "0" + $num;
            }
            else {
                aa = $num + "";
            }
            return aa;
        };
        ActivityItemVo.prototype.compareTime = function ($hour, $min) {
            //服务器当前标准时间
            var $ts = GameInstance.getServerNow();
            var $sever = new Date($ts * 1000);
            var $play = new Date($ts * 1000);
            $play.setHours($hour);
            $play.setMinutes($min);
            $play.setSeconds(0);
            $play.setMilliseconds(0);
            //越过时间
            var $endt = $sever.getTime() - $play.getTime();
            if ($endt < 0) {
                //未到达指定时间
                return true;
            }
            return false;
        };
        //活动排序值 1.推荐与否 2.全天、时间早-晚 3.全天中（等级低-高）
        ActivityItemVo.prototype.getActivitySortNum = function () {
            var total = 0;
            if (this.data.recommend == 1) {
                //推荐活动
                total += 5000;
            }
            //开启等级
            total += (3100 - this.openLev);
            return total;
        };
        return ActivityItemVo;
    }());
    activity.ActivityItemVo = ActivityItemVo;
})(activity || (activity = {}));
//# sourceMappingURL=ActivityModel.js.map