var copytask;
(function (copytask) {
    var TeamCopyItemVo = /** @class */ (function () {
        function TeamCopyItemVo() {
        }
        return TeamCopyItemVo;
    }());
    copytask.TeamCopyItemVo = TeamCopyItemVo;
    var CopytaskModel = /** @class */ (function () {
        function CopytaskModel() {
        }
        CopytaskModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new CopytaskModel();
            }
            return this._instance;
        };
        /**
          * getList
          */
        CopytaskModel.prototype.getList = function () {
            var firstflagary = GuidData.player.getteamflag();
            var $finalary = new Array;
            var tabary = tb.TB_group_instance_base.getItem();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo = new TeamCopyItemVo();
                if (tabary[i].limLev > GuidData.player.getLevel()) {
                    itemvo.state = 3;
                }
                else {
                    if (firstflagary[tabary[i].id]) {
                        itemvo.state = 2;
                    }
                    else {
                        itemvo.state = 1;
                    }
                }
                itemvo.tabvo = tabary[i];
                $finalary.push(itemvo);
            }
            // $finalary.sort(
            //     function (a: TeamCopyItemVo, b: TeamCopyItemVo): number {
            //         if (a.state == b.state) {
            //             return a.tabvo.id - b.tabvo.id;
            //         } else {
            //             return a.state - b.state;
            //         }
            //     }
            // )
            console.log("--$finalary--", $finalary);
            return $finalary;
        };
        return CopytaskModel;
    }());
    copytask.CopytaskModel = CopytaskModel;
})(copytask || (copytask = {}));
//# sourceMappingURL=CopytaskModel.js.map