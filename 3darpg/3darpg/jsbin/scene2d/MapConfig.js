var scene2d;
(function (scene2d) {
    var MapConfig = /** @class */ (function () {
        function MapConfig() {
            this._singSeparate = ",";
            /**日期*/
            this.dateStr = "";
            /**小地图缩放比*/
            this.thumbScale = 1;
            /**地图宽度*/
            this.pxWidth = 0;
            /**地图高度*/
            this.pxHeight = 0;
            /**行*/
            this.row = 0;
            /**列*/
            this.column = 0;
            /**网格宽*/
            this.tileWidth = 48;
            /**网格高*/
            this.tileHeight = 24;
            /**地图类型*/
            this.mapType = 0;
            this.teleports = new Array();
            this.reborns = new Array();
            this.gameobjects = new Array();
            this.collects = new Array();
            this.obstacleMask = new UpdateMask();
        }
        MapConfig.getInstance = function () {
            if (!this._instance) {
                this._instance = new MapConfig();
            }
            return this._instance;
        };
        MapConfig.prototype.anlyData = function (data) {
            this.obstacleMask = new UpdateMask();
            var configText = data.split("\n");
            var first = configText[0].split(this._singSeparate);
            //第一行 基本配置
            this.id = parseInt(first[0]), this.name = first[1], this.dateStr = first[2], this.pxWidth = Number(first[3]), this.pxHeight = Number(first[4]);
            this.sliceWidth = Number(first[5]) || 512;
            this.sliceHeight = Number(first[6]) || 512;
            this.column = Number(first[7]);
            this.row = Number(first[8]);
            this.tileWidth = Number(first[14]) || 48;
            this.tileHeight = Number(first[15]) || 24;
            this.tileWidth = 24;
            this.tileHeight = 24;
            MapConfig.pix15.x = this.tileWidth;
            MapConfig.pix15.y = this.tileHeight;
            var obstacleInfo = configText[1].split(this._singSeparate);
            var len = obstacleInfo.length;
            var i;
            for (i = 0; i < len; i++) {
                this.obstacleMask.baseByteArray.writeUnsignedInt(Number(obstacleInfo[i]));
            }
            //生物
            var strobjs = configText[10].split(this._singSeparate);
            i = 0;
            len = strobjs.length;
            for (; i < len;) {
                this.gameobjects.push(new PosGameObject(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //传送
            var strteles = configText[11].split(this._singSeparate);
            i = 0;
            len = strteles.length;
            for (i = 0; i < len;) {
                this.teleports.push(new PosTeleport(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //复活点
            var strborns = configText[12].split(this._singSeparate);
            i = 0;
            len = strborns.length;
            for (i = 0; i < len;) {
                this.reborns.push(new PosReborn(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //采集物
            var strcollects = new Array;
            if (configText[13]) {
                var strcollects = configText[13].split(this._singSeparate);
            }
            i = 0;
            len = strcollects.length;
            for (i = 0; i < len;) {
                this.collects.push(new PosCollect(strobjs[i++], strobjs[i++], strobjs[i++], strobjs[i++]));
            }
            //a*
            this.makeAstarItem();
        };
        //a*
        MapConfig.prototype.makeAstarItem = function () {
            this.astarItem = new Array();
            for (var j = 0; j < this.row; j++) {
                var $arr = new Array;
                for (var i = 0; i < this.column; i++) {
                    $arr.push(this.isBlock(i, j) ? 0 : 1);
                }
                this.astarItem.push($arr);
            }
        };
        MapConfig.prototype.isBlock = function (x, y) {
            if (x < 0 || x >= this.column || y < 0 || y >= this.row) {
                return true;
            }
            return this.obstacleMask.GetBit(this.column * y + x);
        };
        MapConfig.pix15 = new Vector2D(24, 24);
        MapConfig.Scale = 1;
        return MapConfig;
    }());
    scene2d.MapConfig = MapConfig;
    //传送点
    var PosTeleport = /** @class */ (function () {
        //24,27,新手传送,1,33,33,330002
        function PosTeleport(p1, p2, p3, p4, p5, p6, p7) {
            this.px = parseInt(p1);
            this.py = parseInt(p2);
            this.name = p3;
            this.tmapId = parseInt(p4);
            this.tx = parseInt(p5);
            this.ty = parseInt(p6);
            this.modelId = p7;
        }
        return PosTeleport;
    }());
    //复活点
    var PosReborn = /** @class */ (function () {
        //2,27,29,1
        function PosReborn(p1, p2, p3, p4) {
            this.mapId = parseInt(p1);
            this.px = parseInt(p2);
            this.py = parseInt(p3);
            this.zhenying = parseInt(p4);
        }
        return PosReborn;
    }());
    //生物
    var PosGameObject = /** @class */ (function () {
        //330002,21,26,1,1,1
        function PosGameObject(p1, p2, p3, p4, p5, p6) {
            this.modelId = p1;
            this.px = parseInt(p2);
            this.py = parseInt(p3);
            this.moveType = parseInt(p4);
            this.dir = parseInt(p5);
            this.script = p6;
        }
        return PosGameObject;
    }());
    //采集物
    var PosCollect = /** @class */ (function () {
        //330004,29,33,1
        function PosCollect(p1, p2, p3, p4) {
            this.modelId = p1;
            this.px = parseInt(p2);
            this.py = parseInt(p3);
        }
        return PosCollect;
    }());
})(scene2d || (scene2d = {}));
//# sourceMappingURL=MapConfig.js.map