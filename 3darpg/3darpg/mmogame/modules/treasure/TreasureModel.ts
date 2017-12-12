module treasure {
    export class TreasureItemVo {
        public id:number;
        public tabvo: tb.TB_talisman_base;
        public state: number;//1:激活 2：未激活
        public activityvo: TreasureVo
        public node: RedPointNode
    }

    export class TreasureModel {
        public constructor() {
        }

        private static _instance: TreasureModel;
        public static getInstance(): TreasureModel {
            if (!this._instance) {
                this._instance = new TreasureModel();
            }
            return this._instance;
        }

        /**
          * getList
          */
        public getList(): Array<TreasureItemVo> {
            var $finalary: Array<TreasureItemVo> = new Array;
            var tabary: Array<tb.TB_talisman_base> = tb.TB_talisman_base.get_TB_talisman_base();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo: TreasureItemVo = new TreasureItemVo();
                itemvo.id = i;
                var recallvo = this.compareAB(tabary[i].id);
                if (recallvo == null) {
                    itemvo.state = 2;
                } else {
                    itemvo.state = 1;
                }
                itemvo.tabvo = tabary[i];
                itemvo.activityvo = recallvo;
                $finalary.push(itemvo);
            }
            
            $finalary.sort(
                function (a: TreasureItemVo, b: TreasureItemVo): number {
                    if(a.state == b.state){
                        return a.tabvo.id - b.tabvo.id;
                    }else{
                        return a.state - b.state;
                    }
                }
            )

            return $finalary;
        }


        private compareAB($id: number): TreasureVo {
            var $arr: Array<TreasureVo> = GuidData.grow.getTreasureList();
            for (var i = 0; i < $arr.length; i++) {
                if ($arr[i].id == $id) {
                    return $arr[i];
                }
            }
            return null;
        }
    }
}