module store {

    export class StoreModel {

        private static _instance: StoreModel;
        public static getInstance(): StoreModel {
            if (!this._instance) {
                this._instance = new StoreModel();
            }
            return this._instance;
        }

        public constructor() {
            this.getBaseList();
        }

        private _activityary: Array<StoreItemVo>;
        private getBaseList(): void {
            this._activityary = new Array<StoreItemVo>();
            var tabary: Array<tb.TB_shop> = tb.TB_shop.get_TB_shop();
            for (var i = 0; i < tabary.length; i++) {
                var aa: StoreItemVo = new StoreItemVo();
                aa.data = tabary[i];
                if (aa.canBuy()) {
                    this._activityary.push(aa);
                }
            }

            console.log("----this._activityary-----", this._activityary);

        }

        /**
         * 
         * @param  获取二级从属页签
         */
        public getPage($tab: number): number {
            if ($tab == SharedDef.MODULE_MALL_SCORE && GuidData.faction) {
                return 1;
            }
            for (var i = 0; i < this._activityary.length; i++) {
                var element = this._activityary[i];
                if ($tab == element.data.tab) {
                    return element.data.type;
                }
            }
        }

        /**
         * getList
         */
        public getList($tabid: number): Array<StoreItemVo> {
            // var $finalary: Array<StoreItemVo>;
            // //未选中二级页签时，处理逻辑
            // var page:number;
            // if($type.length > 1){
            //     page = $type[1]
            // }else{
            //     page = this.getPage($type[0]);
            // }

            // //获取家族数据和其他数据的区分
            // if($type[0] == SharedDef.MODULE_MALL_SCORE &&　page　== 1){
            //     $finalary = this.getFactionList();
            // }else{
            //     $finalary = this.getrecommendList($type[0],page);
            // }

            // console.log("--$finalary--", $finalary);
            // return $finalary;

            //默认情况下，填表的二级分类页签不会共用的逻辑
            var $finalary: Array<StoreItemVo>;
            //获取家族数据和其他数据的区分
            if ($tabid == 1) {
                $finalary = this.getFactionList();
            } else {
                $finalary = this.getrecommendList($tabid);
            }
            console.log("--$finalary--", $finalary);
            return $finalary;
        }


        public getItemVo($itemid: number): StoreItemVo {

            for (var i = 0; i < this._activityary.length; i++) {
                var element = this._activityary[i];
                if ($itemid == element.data.itemId) {
                    return element;
                }
            }
            return null;
        }

        //普通商店列表
        private getrecommendList($page: number): Array<StoreItemVo> {
            var $recommendList: Array<StoreItemVo> = new Array;
            for (var i = 0; i < this._activityary.length; i++) {
                var element = this._activityary[i];
                if ($page == element.data.type) {
                    $recommendList.push(this._activityary[i]);
                }
            }
            return $recommendList;
        }

        //家族商店列表
        private getFactionList(): Array<StoreItemVo> {
            var $featsList: Array<StoreItemVo> = new Array;
            var $shopListVo: Array<FactionShopData> = GuidData.faction.getShopList();
            
            for (var i: number = 0; i < $shopListVo.length; i++) {
                var factionshopdvo: StoreItemVo = new StoreItemVo();
                factionshopdvo.data1 = $shopListVo[i];
                factionshopdvo.data2 = this.getfactionshopnumVo($shopListVo[i].id);
                $featsList.push(factionshopdvo);
            }

            return $featsList;
        }


        private getfactionshopnumVo($id:number){
            var $factionShopNumList: Array<factionShopNumData> = GuidData.player.getFactionShopNumList();
            for (var i = 0; i < $factionShopNumList.length; i++) {
                if($factionShopNumList[i].id == $id){
                    return $factionShopNumList[i];
                }
            }
            return $factionShopNumList[$factionShopNumList.length - 1];
        }

        public getTablist($tab: number): Array<number> {
            var aaa = new Array
            if ($tab == SharedDef.MODULE_MALL_SCORE && GuidData.faction) {
                aaa.push(1);
            }
            for (var i = 0; i < this._activityary.length; i++) {
                if (this._activityary[i].data.tab == $tab) {
                    if (this.completeAB(aaa, this._activityary[i].data.type)) {
                        aaa.push(this._activityary[i].data.type);
                    }
                }
            }
            return aaa;
        }

        private completeAB($ary: Array<number>, $type: number): boolean {
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i] == $type) {
                    return false;
                }
            }
            return true;
        }
    }



    export class StoreItemVo {
        public data: tb.TB_shop;
        //家族商店对象
        public data1: FactionShopData;
        public data2: factionShopNumData;
        public isnewprop: boolean = false;
        public type: number;

        public canBuy(): boolean {
            if (this.data.time && this.data.time.length > 0) {
                if (!this.compareTime(this.data.time[0], this.data.time[1] - 1, this.data.time[2]) && this.compareTime(this.data.time[3], this.data.time[4] - 1, this.data.time[5])) {
                    //正处于上架中
                    var $ts: number = GameInstance.getServerNow();
                    var $sever: Date = new Date($ts * 1000);
                    var time = $sever.getTime() - this.getTime(this.data.time[0], this.data.time[1], this.data.time[2]);
                    var time1 = this.getTime(2017, 1, 2) - this.getTime(2017, 1, 5);
                    if (time < time1) {
                        this.isnewprop = true;
                    }
                    return true;
                } else {
                    //未上架
                    return false;
                }
            } else {
                //常驻道具
                return true;
            }
        }

        /**
         * 剩余可购买个数
         */
        public getNum(): number {
            var num = -1;
            if (this.data.limtype != 0) {
                var num1 = this.data.limdata
                var num2 = GuidData.player.getLimShopNum(this.data.id);
                num = num1 - num2
            }
            return num;
        }

        private compareTime($year: number, $month: number, $day: number): boolean {
            //服务器当前标准时间
            var $ts: number = GameInstance.getServerNow();
            var $sever: Date = new Date($ts * 1000);
            var $play: Date = new Date($ts * 1000);

            $play.setFullYear($year);
            $play.setMonth($month);
            $play.setDate($day);
            $play.setHours(0);
            $play.setMinutes(0);
            $play.setSeconds(0);
            //时间未到 true 时间到了 false
            return $sever.getTime() < $play.getTime();
        }

        private getTime($year: number, $month: number, $day: number): number {
            //服务器当前标准时间
            var $ts: number = GameInstance.getServerNow();
            var $play: Date = new Date($ts * 1000);

            $play.setFullYear($year);
            $play.setMonth($month);
            $play.setDate($day);
            $play.setHours(0);
            $play.setMinutes(0);
            $play.setSeconds(0);
            return $play.getTime();
        }

    }

}