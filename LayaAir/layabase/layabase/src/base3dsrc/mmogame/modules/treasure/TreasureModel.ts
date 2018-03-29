module treasure {
    export class TreasureItemVo {
        public id: number;
        public tabvo: tb.TB_talisman_base;
        public state: number;//1:激活 2：未激活
        public wear: boolean;//true 穿 false 未穿
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

        private hasWearItem($ary: Array<TreasureWearVo>, $id: number): boolean {
            for (let index = 0; index < $ary.length; index++) {
                if ($ary[index].state == 1) {
                    if ($ary[index].treasureid == $id) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
          * getList
          */
        public getList(): Array<TreasureItemVo> {
            var $finalary: Array<TreasureItemVo> = new Array;
            var tabary: Array<tb.TB_talisman_base> = tb.TB_talisman_base.get_TB_talisman_base();
            var talismanslotlist: Array<TreasureWearVo> = GuidData.grow.gettalismanslotlist();
            for (var i = 0; i < tabary.length; i++) {
                var itemvo: TreasureItemVo = new TreasureItemVo();
                itemvo.id = i;
                itemvo.wear = this.hasWearItem(talismanslotlist, tabary[i].id);
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
                    if (a.state == b.state) {
                        return a.tabvo.id - b.tabvo.id;
                    } else {
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

        public getTreasureList():Array<TreasureVo> {
            var finary:Array<TreasureVo> = new Array
            var ary: Array<TreasureVo> = GuidData.grow.getTreasureList();
            for (let i = 0; i < ary.length; i++) {
                if(!this.hasItem(ary[i].id)){
                    finary.push(ary[i]);
                }
            }
            return finary;
        }

        private hasItem($id:number){
            var slotlist =  GuidData.grow.gettalismanslotlist();
            for (let k = 0; k < slotlist.length; k++) {
                if(slotlist[k].treasureid == $id){
                    return true;
                }
            }
            return false;
        }
    }
}