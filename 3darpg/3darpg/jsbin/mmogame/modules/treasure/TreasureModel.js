var treasure;
(function (treasure) {
    var TreasureItemVo = /** @class */ (function () {
        function TreasureItemVo() {
        }
        return TreasureItemVo;
    }());
    treasure.TreasureItemVo = TreasureItemVo;
    var TreasureModel = /** @class */ (function () {
        function TreasureModel() {
        }
        TreasureModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new TreasureModel();
            }
            return this._instance;
        };
        /**
          * getList
          */
        TreasureModel.prototype.getList = function () {
            var $finalary = new Array;
            var tabary = tb.TB_talisman_base.get_TB_talisman_base();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo = new TreasureItemVo();
                itemvo.id = i;
                var recallvo = this.compareAB(tabary[i].id);
                if (recallvo == null) {
                    itemvo.state = 2;
                }
                else {
                    itemvo.state = 1;
                }
                itemvo.tabvo = tabary[i];
                itemvo.activityvo = recallvo;
                $finalary.push(itemvo);
            }
            $finalary.sort(function (a, b) {
                if (a.state == b.state) {
                    return a.tabvo.id - b.tabvo.id;
                }
                else {
                    return a.state - b.state;
                }
            });
            return $finalary;
        };
        TreasureModel.prototype.compareAB = function ($id) {
            var $arr = GuidData.grow.getTreasureList();
            for (var i = 0; i < $arr.length; i++) {
                if ($arr[i].id == $id) {
                    return $arr[i];
                }
            }
            return null;
        };
        return TreasureModel;
    }());
    treasure.TreasureModel = TreasureModel;
})(treasure || (treasure = {}));
//# sourceMappingURL=TreasureModel.js.map