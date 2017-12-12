
module map {
    export class MapMenuVo {

        public pos3d: Vector3D;
        public menuType: number;
        public lock: boolean;
        public data: tb.TB_map_object
        public constructor() {

        }
    }
    //export class WorldMapVo {
    //    public id: number
    //    public pos: Vector2D
    //    public level: number
    //    public constructor($pos: Vector2D = null, $level: number = 0) {
    //        this.pos = $pos
    //        this.level = $level
    //    }
    //    public static getBaseItem(): Array<WorldMapVo> {

    //        var aaaa: Array<tb.TB_world_map> = tb.TB_world_map.getItem();
    //        console.log(aaaa)
    //        alert(aaaa)

    //        var $arr: Array<WorldMapVo> = new Array()
    //        $arr.push(new WorldMapVo(new Vector2D(555, 208), 1))
    //        $arr.push(new WorldMapVo(new Vector2D(671, 151), 10))
    //        $arr.push(new WorldMapVo(new Vector2D(495, 300), 20))
    //        $arr.push(new WorldMapVo(new Vector2D(369, 221), 80))
    //        $arr.push(new WorldMapVo(new Vector2D(427, 80), 99))

    //        return $arr;
    //    }

    //}
    export class MapServerVo{
        public name;

        public pos:Vector2D
        public type: number
        public constructor() {
        }

    }
    export class MapModel  {
        public static worldMapImg: any;
        public static tabType: number=0
        private static _instance: MapModel;
        public static getInstance(): MapModel {
            if (!this._instance) {
                this._instance = new MapModel();
            }
            return this._instance;
        }

        public constructor() {
  
            this._dic=new Object

        }
        public refresh(): void {

        }
        public mapLineData: s2c_send_map_line
        private _dic:any
        public getxmlList(): Array<MapMenuVo>
        {
            var $mapId: number = GuidData.map.getMapID()
            //临时写的的，

            if (!this._dic[$mapId]) {
                this._dic[$mapId] = new Array
                var $tb_map_navigation: tb.TB_map_navigation = tb.TB_map_navigation.get_TB_map_navigation($mapId);
                for (var i: number = 0; i < $tb_map_navigation.navi.length; i++)
                {
                    var e: tb.TB_map_object = tb.TB_map_object.get_TB_map_object($tb_map_navigation.navi[i]);
                    var $menuVo: MapMenuVo = new MapMenuVo();
                    $menuVo.data = e;
                    this._dic[$mapId].push($menuVo);

                }
            }
            return this._dic[$mapId]
        }

        public getMenuListArr(): Array<MapMenuVo>
        {
            var $backArr: Array<MapMenuVo> = new Array();

            this.addTempByType(3, $backArr);
            this.addTempByType(2, $backArr);
            this.addTempByType(0, $backArr);

            return $backArr
        }
        public lockItem:Array<boolean>=[false,true,true,true]
        private addTempByType(value:number,$list:Array<MapMenuVo>): void
        {
            var $has: boolean = false
            var $arr: Array<MapMenuVo> = this.getxmlList();
            for (var i: number = 0; i < $arr.length; i++) {
                if ($arr[i].data.type == value) {
                    $has=true
                }
            }
            if ($has) {
                var $menu: MapMenuVo = new MapMenuVo();
                $menu.menuType = value;
                $menu.lock = this.lockItem[value]
                $list.push($menu);
                for (var i: number = 0; i < $arr.length && $menu.lock; i++) {
                    if ($arr[i].data.type == value) {
                        $list.push($arr[i])
                    }
                }
            }

        }

       

 

    }
}