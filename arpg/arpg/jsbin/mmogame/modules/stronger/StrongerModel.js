var stronger;
(function (stronger) {
    var StrongerUitl = (function () {
        function StrongerUitl() {
        }
        StrongerUitl.getGrade = function ($curzhanli, $goodzhanli) {
            var lev;
            var bqary = tb.TB_bianqiang_rank.get_TB_bianqiang_rank();
            var ratio = ($curzhanli / $goodzhanli) * 100;
            for (var i = 0; i < bqary.length; i++) {
                if (ratio >= bqary[i].percent) {
                    lev = i;
                }
            }
            // if (ratio >= 100) {
            //     lev = 0;
            // } else if (ratio >= 80) {
            //     lev = 1;
            // } else if (ratio >= 60) {
            //     lev = 2;
            // } else {
            //     lev = 3;
            // }
            return lev;
        };
        return StrongerUitl;
    }());
    StrongerUitl.STRONGER_UP = 1; //我要变强
    StrongerUitl.STRONGER_LEV = 2; //我要升级
    StrongerUitl.STRONGER_EQUIP = 3; //我要装备
    StrongerUitl.STRONGER_MOUNT = 4; //我要坐骑
    StrongerUitl.STRONGER_WINGS = 5; //我要翅膀
    stronger.StrongerUitl = StrongerUitl;
    var StrongerModel = (function () {
        function StrongerModel() {
        }
        StrongerModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new StrongerModel();
            }
            return this._instance;
        };
        /**
         * getList
         */
        StrongerModel.prototype.getList = function ($type) {
            var $finalary = new Array;
            var tabary = tb.TB_bianqiang_sub.get_TB_bianqiang_sub();
            for (var i = 0; i < tabary.length; i++) {
                if ($type == tabary[i].parent_id) {
                    if (tabary[i].parent_id == StrongerUitl.STRONGER_UP) {
                        if (GuidData.player.getLevel() >= tabary[i].limitlev) {
                            //如果是我要变强，就把等级足够的显示出来
                            var strongerItemVo = new StrongerItemVo();
                            strongerItemVo.data = tabary[i];
                            var zhanli = this.getzhanli(tabary[i].value_type);
                            if (zhanli == -1) {
                                alert("战力出错");
                            }
                            else {
                                strongerItemVo.zhanli = zhanli;
                                var curzhanli = this.getCurrentZhanli(tabary[i].value_type);
                                strongerItemVo.curzhanli = curzhanli;
                                strongerItemVo.state = StrongerUitl.getGrade(curzhanli, zhanli);
                            }
                            $finalary.push(strongerItemVo);
                        }
                    }
                    else {
                        //如果不是我要变强，那就把所有的显示出来，但是按钮变成未开启
                        var strongerItemVo = new StrongerItemVo();
                        strongerItemVo.data = tabary[i];
                        $finalary.push(strongerItemVo);
                    }
                }
            }
            //console.log("--$finalary--", $finalary);
            return $finalary;
        };
        StrongerModel.prototype.getzhanli = function ($index) {
            var tabvo = tb.TB_bianqiang_value.get_TB_bianqiang_valueById(GuidData.player.getLevel());
            for (var i = 0; i < tabvo.value_devide.length; i++) {
                if (tabvo.value_devide[i][0] == $index) {
                    return tabvo.value_devide[i][1];
                }
            }
            return -1;
        };
        StrongerModel.prototype.getCurrentZhanli = function ($type) {
            var curzhanli = 0;
            switch ($type) {
                case 115:
                    curzhanli = GuidData.player.getRealmbreakForce();
                    break;
                case 102:
                    curzhanli = GuidData.player.getEquipForce();
                    break;
                case 202:
                    curzhanli = GuidData.player.getSkillForce();
                    break;
                case 206:
                    curzhanli = GuidData.player.getStrengForce();
                    break;
                case 205:
                    curzhanli = GuidData.player.getMountForce();
                    break;
                case 203:
                    curzhanli = GuidData.player.gettalismantotalzhanli();
                    break;
                case 209:
                    curzhanli = GuidData.player.getAdventureForce();
                    break;
                case 208:
                    curzhanli = GuidData.player.getPlayerIntFieldMeridianForce();
                    break;
                case 207:
                    curzhanli = GuidData.player.getWingForce();
                    break;
            }
            return curzhanli;
        };
        return StrongerModel;
    }());
    stronger.StrongerModel = StrongerModel;
    var StrongerItemVo = (function () {
        function StrongerItemVo() {
        }
        return StrongerItemVo;
    }());
    stronger.StrongerItemVo = StrongerItemVo;
})(stronger || (stronger = {}));
//# sourceMappingURL=StrongerModel.js.map