class ScenePortal extends SceneChar {
    public tb: tb.TB_gameobject_template
    public constructor() {
        super();
        this.shadow = false;
    }
    public removeStage(): void {
        super.removeStage();
    }
    public showBlood($colorType: number = 0): void {
    }
    public setAvatar(num: number): void {
        this.addPart("abc", "cde", getModelUrl(String(num)))
        this.tittleHeight = 20;
    }
    public addStage(): void {
        super.addStage();


    }
    public mouseClik($lineA: Vector3D, $lineB: Vector3D): boolean {
    
        var $pos: Vector3D = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos())
        if ($pos.z < Scene_data.cam3D.distance / 3) { //在Z后面
            return null
        }
        var hitVec2: Vector2D = MathUtil.math3DWorldtoDisplay2DPos($lineB)
        var centVec2: Vector2D = MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)
        if (this.tb.hitarray && this.tb.hitarray.length==4) {
            var $rect: Rectangle = new Rectangle(this.tb.hitarray[0], this.tb.hitarray[1], this.tb.hitarray[2], this.tb.hitarray[3])
            if (hitVec2.x > (centVec2.x + $rect.x - $rect.width ) && hitVec2.x < (centVec2.x + $rect.x + $rect.width )) {
                if (hitVec2.y > (centVec2.y + $rect.y - $rect.height) && hitVec2.y < (centVec2.y + $rect.y + $rect.height )) {
                    return true
                }
            }
        } else {
            if (Vector2D.distance(hitVec2, centVec2) < 20) {
                return true
            }
        }

       
        return false
    }

}