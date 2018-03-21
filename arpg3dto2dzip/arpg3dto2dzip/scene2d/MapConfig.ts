


module scene2d {
    export class MapConfig {
        public static pix15: Vector2D = new Vector2D(24, 24);
        public static Scale: number = 1
        private static _instance: MapConfig;
        public static getInstance(): MapConfig {
            if (!this._instance) {
                this._instance = new MapConfig();
            }
            return this._instance;
        }
        protected _singSeparate: string = ",";
        public id: number;
        /**场景名称*/
        public name: string;
        /**日期*/
        public dateStr: string = "";
        /**背景音乐*/
        public bgMusicPath: string;
        /**小地图缩放比*/
        public thumbScale: number = 1;
        /**小地图加载地址*/
        public smallMapPath: string;
        /**地图宽度*/
        public pxWidth: number = 0;
        /**地图高度*/
        public pxHeight: number = 0;
        /**行*/
        public row: number = 0;
        /**列*/
        public column: number = 0;
        /**切片宽度*/
        public sliceWidth: number;
        /**切片高度*/
        public sliceHeight: number;
        /**网格宽*/
        public tileWidth: number = 48;
        /**网格高*/
        public tileHeight: number = 24;
        /**地图类型*/
        public mapType: number = 0;
        /**是否副本*/
        public isCopyMap: boolean;
        /**传送点列表*/
        public teleports: Array<PosTeleport>;
        /**复活点列表*/
        public reborns: Array<PosReborn>;
        /**生物列表*/
        public gameobjects: Array<PosGameObject>;
        /**采集物列表*/
        public collects: Array<PosCollect>;

        public obstacleMask: UpdateMask;

        public constructor() {
            this.teleports = new Array<PosTeleport>();
            this.reborns = new Array<PosReborn>();
            this.gameobjects = new Array<PosGameObject>();
            this.collects = new Array<PosCollect>();
            this.obstacleMask = new UpdateMask();
        }
        public anlyData(data: string): void {
            this.obstacleMask = new UpdateMask();
            var configText: Array<string> = data.split("\n");
            var first: Array<string> = configText[0].split(this._singSeparate);
            //第一行 基本配置
            this.id = parseInt(first[0]), this.name = first[1], this.dateStr = first[2], this.pxWidth = Number(first[3]), this.pxHeight = Number(first[4]);
            this.sliceWidth = Number(first[5]) || 512;
            this.sliceHeight = Number(first[6]) || 512;
            this.column = Number(first[7]);
            this.row = Number(first[8]);
            this.tileWidth = Number(first[14]) || 48;
            this.tileHeight = Number(first[15]) || 24;

            MapConfig.pix15.x = this.tileWidth;
            MapConfig.pix15.y = this.tileHeight;

            var obstacleInfo: Array<string> = configText[1].split(this._singSeparate);
            var len: number = obstacleInfo.length;
            var i: number;
            for (i = 0; i < len; i++) {
                this.obstacleMask.baseByteArray.writeUnsignedInt(Number(obstacleInfo[i]));
            }
            //生物
            var strobjs: Array<string> = configText[10].split(this._singSeparate);
            i = 0
            len = strobjs.length;
            for (; i < len;) {
                this.gameobjects.push(new PosGameObject(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //传送
            var strteles: Array<string> = configText[11].split(this._singSeparate);
            i = 0
            len = strteles.length;
            for (i = 0; i < len;) {
                this.teleports.push(new PosTeleport(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //复活点
            var strborns: Array<string> = configText[12].split(this._singSeparate);
            i = 0
            len = strborns.length;
            for (i = 0; i < len;) {
                this.reborns.push(new PosReborn(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //采集物
            var strcollects: Array<string> = new Array
            if (configText[13]) {
                var strcollects: Array<string> = configText[13].split(this._singSeparate);
            }

            i = 0
            len = strcollects.length;
            for (i = 0; i < len;) {
                this.collects.push(new PosCollect(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //a*
            this.makeAstarItem()
        }
        //a*
        public astarItem: Array<Array<number>>
        //a*
        private makeAstarItem(): void {
            this.astarItem = new Array()
            for (var j: number = 0; j < this.row; j++) {
                var $arr: Array<number> = new Array
                for (var i: number = 0; i < this.column; i++) {
                    $arr.push(this.isBlock(i, j) ? 0 : 1);
                }
                this.astarItem.push($arr);
            }

        }
        public isBlock(x: number, y: number): boolean {
            if (x < 0 || x >= this.column || y < 0 || y >= this.row) {
                return true;
            }
            return this.obstacleMask.GetBit(this.column * y + x);
        }

    }
    //传送点
    class PosTeleport {
        public modelId: string;
        public px: number;
        public py: number;
        public tmapId: number;
        public tx: number;
        public ty: number;
        public name: string;
        //24,27,新手传送,1,33,33,330002
        public constructor(p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string) {
            this.px = parseInt(p1);
            this.py = parseInt(p2);
            this.name = p3;
            this.tmapId = parseInt(p4);
            this.tx = parseInt(p5);
            this.ty = parseInt(p6);
            this.modelId = p7;
        }
    }

    //复活点
    class PosReborn {
        public zhenying: number;
        public mapId: number;
        public px: number;
        public py: number;
        //2,27,29,1
        public constructor(p1: string, p2: string, p3: string, p4: string) {

            this.mapId = parseInt(p1);
            this.px = parseInt(p2);
            this.py = parseInt(p3);
            this.zhenying = parseInt(p4);
        }
    }

    //生物
    class PosGameObject {
        public modelId: string;
        public px: number;
        public py: number;
        public moveType: number;
        public dir: number;
        public script: string;
        //330002,21,26,1,1,1
        public constructor(p1: string, p2: string, p3: string, p4: string, p5: string, p6: string) {
            this.modelId = p1;
            this.px = parseInt(p2);
            this.py = parseInt(p3);
            this.moveType = parseInt(p4);
            this.dir = parseInt(p5);
            this.script = p6;
        }
    }

    //采集物
    class PosCollect {
        public modelId: string;
        public px: number;
        public py: number;
        //330004,29,33,1
        public constructor(p1: string, p2: string, p3: string, p4: string) {
            this.modelId = p1;
            this.px = parseInt(p2);
            this.py = parseInt(p3);
        }
    }

}