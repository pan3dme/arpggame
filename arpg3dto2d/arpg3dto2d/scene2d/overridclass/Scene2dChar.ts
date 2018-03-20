module scene2d {
    export  class Scene2dChar extends SceneChar {
        public applyWalk($item: Array<Vector2D>): void {

            if ($item && $item.length == 2) {
                //排除是停止的路径将不处理
                if ($item[0].x == $item[1].x && $item[0].y == $item[1].y) {
                    console.log("收到寻路坐标是在原地==>", $item)
                    this._speedDirect = null;
                    this._walkPath = null;
                    if (this.curentAction == CharAction.WALK) {
                        this.play(CharAction.STANAD);
                    }
                    var $k: Vector3D = AstarUtil.getWorldPosByStart2D($item[0]);
                    this.px = $k.x;
                    this.pz = $k.z;
                    return;
                }
            }
            this.walkPath = SceneAstarModel.getInstance().Path2dTo3d($item);


        }
        public refreshY(): void {
            this.py = 0
            this.refreshPos();
        }
        public get isDeath(): boolean {
            return false
        }
        public updateFrame(t: number): void {
            super.updateFrame(t);
            if (this._speedDirect) {
                this.walkDirect(t);
            }
        }
        protected walkDirect(tt: number): void {
            var t: number = Math.min(Math.max((1000 / 60), tt), 30)  //特殊限制摇杆移动
            var sn: number = t * this.speedTX;
            var nextPos: Vector3D = new Vector3D();
            var tx: number = this._speedDirect.x * sn;
            var ty: number = this._speedDirect.z * sn;
            this.toRotationY = -Math.atan2(ty, tx) * 180 / Math.PI + 90;
            nextPos.x = this.px + tx;
            nextPos.z = this.pz + ty;
            console.log(SceneAstarModel.getPosIsCanMove(nextPos))
            if (SceneAstarModel.getPosIsCanMove(nextPos)) {
                this.px = nextPos.x;
                this.pz = nextPos.z;
            }
            this.refreshPos()
        }
        public showName($color: string = null): void {
       
         
            var $colorName: string = $color 
            if (!this._charNameVo) {
                this._charNameVo = BloodManager.getInstance().getCharNameMeshVo($colorName)
            } else {
                this._charNameVo.name = $colorName;
            }

            this.refreshPos()
        }
        public showBlood($colorType: number = 0): void {
            //添加显示血条 -FIXME--0
            if (!this._charBloodVo) {
                this._charBloodVo = BloodManager.getInstance().getBloodLineMeshVo()
                this._charBloodVo.colortype = $colorType;
            } else {
                this._charBloodVo.colortype = $colorType;
            }
            this.refreshPos()
        }
        public changeAction($action: string): void {
            this.curentAction = this._defaultAction;
        }

    }
}