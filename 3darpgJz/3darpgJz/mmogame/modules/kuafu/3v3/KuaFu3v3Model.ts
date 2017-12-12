module kuafu {
    export class KuaFu3v3Model {

        private static _instance: KuaFu3v3Model;
        public static getInstance(): KuaFu3v3Model {
            if (!this._instance) {
                this._instance = new KuaFu3v3Model();
            }
            return this._instance;
        }
        public wait_info_vo: s2c_kuafu_3v3_wait_info
        private static nextCatchTime: number=0;
        public static  frameUpData(): void
        {
            if (GuidData.map.is3V3() || GuidData.map.isWorldBoss()) { //3v3场景
                if (this.nextCatchTime < TimeUtil.getTimer()) {
                    var $displayList: Array<Display3dMovie> = GameInstance.roleList;
                    for (var i: number = 0; $displayList && i < $displayList.length; i++) {
                        var $tempChar: SceneChar = <SceneChar>$displayList[i];
                        if (GameMouseManager.getInstance().isCatchSceneCharDis($tempChar)) {

                            NetManager.getInstance().protocolos.use_gameobject($tempChar.unit.getUintGuid());
                            this.nextCatchTime = TimeUtil.getTimer() + 1000
                        }
                    }
                }
                if (TimeUtil.getTimer() > this.lastTm) {
                    RelationManager.getInstance().refresh();
                    this.lastTm = TimeUtil.getTimer() + 1000;
                }
            }
          
        }
        private  static lastTm: number = 0
        

        public constructor() {
            //MERGE_TYPE_GAME_TO_PK
            this.tb_kuafu3v3_base = tb.TB_kuafu3v3_base.getItem()[0];
        }
        public get_month_reward_item(): tb.TB_kuafu3v3_month_reward
        {
            var $item = tb.TB_kuafu3v3_month_reward.getItem();
            var $score: number = GuidData.player.getPlayerIntFieldWorld3V3TotalScore1() //总积分
            var $vo: tb.TB_kuafu3v3_month_reward;
            for (var i: number = 0; i < $item.length; i++) {
                if ($score >= $item[i].score) {
                    $vo = $item[i]
                }
            }
            return $vo

        }
        public worldWarByte: ByteArray;
        public mergeTypeGameToPk(): void
        {
            var $sendByte: ByteArray = new ByteArray();
            $sendByte.endian = Endian.LITTLE_ENDIAN;
            $sendByte.optcode = 124;
            $sendByte.writeUint16(124);
            $sendByte.writeBytes(this.worldWarByte)
            NetManager.getInstance().send($sendByte);

        }
        public kuafuItem: Array<Kuafu3V3dataVo>;
        public selfVo: Kuafu3V3dataVo;
        public tb_kuafu3v3_base: tb.TB_kuafu3v3_base;
        public end: boolean;
        public killTittleTxt: Vector2D;
        public refreshKufuData($vo: Kuafu3V3dataVo=null): void
        {
            this.kuafuItem = GuidData.map.getKuafu3V3DataItem();
            this.killTittleTxt = new Vector2D();
            for (var i: number = 0; i < this.kuafuItem.length; i++) {
                if (this.kuafuItem[i].name == GuidData.player.getName()) {
                    this.selfVo = this.kuafuItem[i];
                } 
                if (this.kuafuItem[i].dieState == 1) {
                    if (this.kuafuItem[i].group==1) {
                        this.killTittleTxt.x++
                    } else {
                        this.killTittleTxt.y++
                    }
                }
            }
        }

 
        public get isSelfDie(): boolean
        {
            if (this.selfVo && this.selfVo.dieState == 1) {
                return true;
            } else {
                return false;
            }
        }

         
    }
     
}