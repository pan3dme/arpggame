function get2dMappicById($id: number): string {
    return "pan/zymap2d/scene/" + $id + "/maps/";
}
function get2dMapdataById($id: number): string {
    return "pan/zymap2d/maps/" + $id + ".txt";
}
module scene2d {
 
    export class GroundMapVo {
        public id: number;
        public key: Vector2D;
        public ui: UICompenent;
        private lastUrl: string;
        private _mapresId: number;
        public set mapresId(value: number) {

            if (this._mapresId != value) {
                this.key = null;
                this.lastUrl = null;

            }
            this._mapresId = value
        }
        public get mapresId(): number {
            return this._mapresId
        }
        public drawCtx($uiAtlas: UIAtlas, $v2d: Vector2D): void {
            var $mapid: number = 1007
            if (isNaN(this._mapresId)) {
                return
            }
            if (this._mapresId > 0) {
                $mapid = this._mapresId
            }
            
            var $url: string = get2dMappicById($mapid )+ $v2d.y + "_" + $v2d.x + ".jpg";
            if (this.lastUrl != $url) {
                //  console.log($url)
                this.lastUrl = $url;
                $uiAtlas.upDataPicToTexture(this.lastUrl, this.ui.skinName)
            }
            this.key = $v2d
        }


    }

    export class SceneGroundModel extends UIPanel {
        private static _instance: SceneGroundModel;
        public static getInstance(): SceneGroundModel {
            if (!this._instance) {
                this._instance = new SceneGroundModel();
            }
            return this._instance;
        }
        private _bottomRender: UIRenderComponent;
        public constructor() {
            super();
            this.top = 0;
            this.left = 0;
            this.layer = -1;
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);
            this.initConfigGroundUiAtlas()
        }


        public initData(value: number = 0): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            for (var i: number = 0; i < this.mapuiItem.length; i++) {
                var $vo: GroundMapVo = this.mapuiItem[i];
                $vo.mapresId = value
            }
            this.resetViewMatrx3D()
        }
        private mapuiItem: Array<GroundMapVo>;
        public static configSize: number
        private key256: number = 256;
        private initConfigGroundUiAtlas(): void {

            if (SceneGroundModel.configSize) {
                this.key256 = SceneGroundModel.configSize;
            }

            this.mapuiItem = new Array();
            this._bottomRender.uiAtlas = new UIAtlas
            var $uiAtlas: UIAtlas = this._bottomRender.uiAtlas;
            $uiAtlas.configData = new Array();

            console.log("configSize", this.key256)
            var $textureSize1024: number = this.key256 * 4;
            $uiAtlas.ctx = UIManager.getInstance().getContext2D($textureSize1024, $textureSize1024, false);
            $uiAtlas.textureRes = new TextureRes;
            $uiAtlas.textureRes.texture = Scene_data.context3D.getTexture($uiAtlas.ctx.canvas, 0, 1)//不是线性纹理
            // this._bottomRender.scale=2

            for (var i: number = 0; i < (4 * 4); i++) {
                var $vo: GroundMapVo = new GroundMapVo;
                $vo.id = i;
                var $pos: Vector2D = new Vector2D(Math.floor(i % 4), Math.floor(i / 4));
                $uiAtlas.configData.push($uiAtlas.getObject("idk" + i, $pos.x * this.key256, $pos.y * this.key256, this.key256, this.key256, $textureSize1024, $textureSize1024));
                $vo.ui = this.addChild(this._bottomRender.creatBaseComponent("idk" + i));
                $vo.ui.scale = 2 / UIData.Scale * (Engine2d.htmlScale)
                this.mapuiItem.push($vo);
            }

        }
        public resetViewMatrx3D(): void {
            this.saveUseKey()
            var $v2: Vector2D = AppDataArpg.sceneStagePos
            for (var i: number = 0; i < this.mapuiItem.length; i++) {
                var $vo: GroundMapVo = this.mapuiItem[i];
                if ($vo.key) {
                    $vo.ui.x = (this.key256 * $vo.key.x + $v2.x)
                    $vo.ui.y = (this.key256 * $vo.key.y + $v2.y)
                } else {
                    $vo.ui.x = 9999;
                }
            }
        }

        private saveUseKey(): void {
            var $keyItem: Array<Vector2D> = new Array()
            var $v2: Vector2D = AppDataArpg.sceneStagePos
            var tx: number = $v2.x % this.key256 - this.key256;
            var ty: number = $v2.y % this.key256 - this.key256;

            for (var i: number = 0; i < this.mapuiItem.length; i++) {
                var $moveWH: Vector2D = new Vector2D(Math.floor(i % 4), Math.floor(i / 4));
                var $kt: Vector2D = new Vector2D(Math.floor($moveWH.x - $v2.x / this.key256), Math.floor($moveWH.y - $v2.y / this.key256));
                if ($kt.x >= 0 && $kt.y >= 0) {
                    $keyItem.push($kt);
                }
            }
            this.clearKey($keyItem)
            this.addKeyToUi($keyItem)
        }
        private clearKey($keyItem: Array<Vector2D>): void {
            for (var i: number = 0; i < this.mapuiItem.length; i++) {
                var $has: boolean = false
                for (var j: number = 0; j < $keyItem.length; j++) {
                    if (this.mapuiItem[i].key && this.mapuiItem[i].key.x == $keyItem[j].x && this.mapuiItem[i].key.y == $keyItem[j].y) {
                        $has = true;
                    }
                }
                if (!$has) {
                    this.mapuiItem[i].key = null;
                }
            }
        }
        private addKeyToUi($keyItem: Array<Vector2D>): void {
            for (var j: number = 0; j < $keyItem.length; j++) {
                var $has: boolean = false
                for (var i: number = 0; i < this.mapuiItem.length; i++) {
                    if (this.mapuiItem[i].key && this.mapuiItem[i].key.x == $keyItem[j].x && this.mapuiItem[i].key.y == $keyItem[j].y) {
                        $has = true;
                    }
                }
                if (!$has) {
                    var $vo: GroundMapVo = this.getEempty()
                    $vo.drawCtx(this._bottomRender.uiAtlas, $keyItem[j]);
                }
            }
        }
        private getEempty(): GroundMapVo {
            for (var i: number = 0; i < this.mapuiItem.length; i++) {
                if (!this.mapuiItem[i].key) {
                    return this.mapuiItem[i]
                }
            }
        }
    }
}