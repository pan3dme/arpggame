module gift {
    export class GiftSendVo {
    
        public id:number
        public num: number;
        public has: number;
        public tb_item_template: tb.TB_item_template;
        public tb_faction_gift:tb.TB_faction_gift
    }
    export class GiftModel{
        private static _instance: GiftModel;
        public static getInstance(): GiftModel {
            if (!this._instance) {
                this._instance = new GiftModel();
            }
            return this._instance;
        }
        //初始技能数据
        public constructor() {
            this.dataResouce = new Array()
            var $arr: Array<tb.TB_faction_gift> = tb.TB_faction_gift.get_TB_faction_gift();

            for (var i: number = 0; i < $arr.length; i++) {
                var $vo: GiftSendVo = new GiftSendVo();
                $vo.id = i;
                $vo.num = 0;
                $vo.has = 0;
                $vo.tb_faction_gift = $arr[i];
                $vo.tb_item_template = tb.TB_item_template.get_TB_item_template($vo.tb_faction_gift.id);
                this.dataResouce.push($vo)
            }
      
            this.sortItem();

        }
        private sortItem(): void
        {
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                var $vo: GiftSendVo = this.dataResouce[i];
                var $k: number = $vo.id % 10;
                var sortId:number = ($k * 2) % 10 + Math.floor($k / 5) + Math.floor($vo.id / 10) * 10;
                $vo.id = sortId;
            }
            /*
            this.dataResouce.sort(
                function (a: GiftSendVo, b: GiftSendVo): number {
                    return a.id - b.id;
                }
            )
            */
        }
        private dataResouce: Array<GiftSendVo>
        public getResouceLen(): number {
            return this.dataResouce.length;
        }
        public refrishResouce(): void
        {
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                var $itemID: number = this.dataResouce[i].tb_item_template.id;
                this.dataResouce[i].has = GuidData.bag.getItemCount($itemID);
                this.dataResouce[i].num = 0;
            }
        }

        //返回即时奖励，有可能会是多个类型;
        public getResouceRewardNow(): string {
            var obj: any = new Object;
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    for (var j: number = 0; j < this.dataResouce[i].tb_faction_gift.reward.length; j++) {
                        var $arr: Array<number> = this.dataResouce[i].tb_faction_gift.reward[j];
                        if (!obj[$arr[0]]) {
                            obj[$arr[0]] = 0
                        }
                        obj[$arr[0]] += $arr[1] * this.dataResouce[i].num;
                    }
                }
            }
            var $str: string = "×0"
            for (var $key in obj) {
                $str=""
                console.log($key, obj[$key]);
                var $tb: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(Number($key))
             //   $str += $tb.getColorName();
                $str += "×" + obj[$key];
            }
            return $str;
        }

        //返回即时奖励，有可能会是多个类型;
        public getResouceRewardEx(): string {
            var obj: any = new Object;
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    for (var j: number = 0; j < this.dataResouce[i].tb_faction_gift.ex_reward.length; j++) {
                        var $arr: Array<number> = this.dataResouce[i].tb_faction_gift.ex_reward[j];
                        if (!obj[$arr[0]]) {
                            obj[$arr[0]] = 0
                        }
                        obj[$arr[0]] += $arr[1] * this.dataResouce[i].num;
                    }
                }
            }
            var $str: string = "×0"
            for (var $key in obj) {
                $str=""
                console.log($key, obj[$key]);
                var $tb: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(Number($key))
             //   $str += $tb.getColorName();
                $str += "×" + obj[$key];
            }
            return $str;
        }
        public getResouceById(value: number): GiftSendVo
        {
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].id == value) {
                    return this.dataResouce [i]
                }
            }
            return null;
        }
        public isCanAddGiffById($id): boolean
        {
            var $idArr:Array<number>=new Array
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    $idArr.push(this.dataResouce[i].id);
                }
            }
            if ($idArr.length < 4) {
                return true
            } else {
                for (var j: number = 0; j < $idArr.length; j++)
                {
                    if ($idArr[j] == $id) {
                        return true
                    }
                }
            }
            return false;
        }
     //   private msg:string = "爱女王一万年么么哒爱女王一万年么么哒爱女王一万年么么哒"
        public sendGiftToServer($str:string): boolean {

            var $itemlist:Array<item_reward_info> = new Array
            for (var i: number = 0; i < this.dataResouce.length; i++) {
                if (this.dataResouce[i].num) {
                    var ary:item_reward_info = new item_reward_info
                    ary.item_id = this.dataResouce[i].tb_item_template.id
                    ary.num = this.dataResouce[i].num
                    $itemlist.push(ary);
                }
            }
            if ($itemlist.length) {
                NetManager.getInstance().protocolos.send_faction_gift($itemlist, $str, SharedDef.FACTION_DATA_REPLY_TYPE_TEXT);
                return true;
            } else {
                return false;
            }
        }

    }

}