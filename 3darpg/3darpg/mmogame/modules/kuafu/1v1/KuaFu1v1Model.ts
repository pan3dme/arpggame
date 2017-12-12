module kuafu {
    export class KuaFu1v1BangData
    {
        public name: string;
        public force: number;
        public rank:number
        public avatar: number;
        public weapon:number
        public divine:number
        public postion: number
        public gender: number
        public level:number

        public pass: boolean

        constructor() {
        }
      

    }
    export class Scene1v1Data
    {
        public name: string
        public force: number
        public vip: number
        public charType: number;
        public life: number;
        public level:number
        constructor() {
        }
      
    }
    export class KuaFu1v1Model {

        private static _instance: KuaFu1v1Model;
        public static getInstance(): KuaFu1v1Model {
            if (!this._instance) {
                this._instance = new KuaFu1v1Model();
            }
            return this._instance;
        }
        public tb_doujiantai_base: tb.TB_doujiantai_base
        constructor() {

            this.tb_doujiantai_base = tb.TB_doujiantai_base.get_TB_doujiantai_baseById(1);
        }
      
 
        public get1V1sceneData(): Array<Scene1v1Data> {
      
            var $arr: Array<Scene1v1Data>=new Array
            for (var i: number = 0; i < GameInstance.roleList.length; i++)
            {
                $arr.push( this.getScene1v1DataByUnit(GameInstance.roleList[i].unit))
            }
            return $arr
      
        }
        private getScene1v1DataByUnit($unit: Unit): Scene1v1Data
        {
            var vo: Scene1v1Data = new Scene1v1Data()
            vo.charType = $unit.getCharType();
            vo.name = $unit.getName();
            vo.force = $unit.getForce();
            vo.level = $unit.getLevel();
            vo.vip = $unit.getVipLevel();
            vo.life = $unit.getHp() / $unit.getMaxHp();
           
            return vo
        }

        public setFullHp(): void {
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                GameInstance.roleList[i].setHp(GameInstance.roleList[i].unit.getMaxHp());
                console.log(GameInstance.roleList[i].unit.getHp(), GameInstance.roleList[i].unit.getMaxHp());
                GameInstance.roleList[i].refreshHP();
            }

        }
       

    }

}