class Arpg2dAstarUtil {
    public static _instance: Arpg2dAstarUtil;
    public static getInstance(): Arpg2dAstarUtil {
        if (!this._instance) {
            this._instance = new Arpg2dAstarUtil();
        }
        return this._instance;
    }
    public initAstarFun(): void {
        AstarUtil.getWorldPosByStart2D = this.getWorldPosByStart2D;
        AstarUtil.getGrapIndexByPos = this.getGrapIndexByPos;
        AstarUtil.getHeightByPos = this.getHeightByPos;
        AstarUtil.getScenePos = this.getScenePos;
    }
    public getScenePos($x: number, $y: number): Vector3D {
        var $evt: InteractiveEvent = new InteractiveEvent(InteractiveEvent.Down)
        $evt.x = $x
        $evt.y = $y
        var $toV2: Vector2D = scene2d.SceneAstarModel.getInstance().getAstarSceneByMouse($evt);
        var $to3d: Vector3D = this.getWorldPosByStart2D($toV2);
        return $to3d;
    }
    public getPosIsCanMove($pos: Vector3D): boolean {
        var $kt: Vector2D = this.getGrapIndexByPos($pos);
        return this.isGridCanWalk($kt);
    }
    public isGridCanWalk(p: Vector2D): boolean {
        return !scene2d.MapConfig.getInstance().isBlock(p.x, p.y)
    }
    public getGrapIndexByPos($pos: Vector3D): Vector2D {
        return scene2d.SceneAstarModel.getAstarBySceneV3D($pos)
    }
    public getWorldPosByStart2D($v2d: Vector2D): Vector3D {
        return scene2d.SceneAstarModel.getInstance().getWorldPosByStart2D($v2d)
    }
    public getHeightByPos($pos: Vector3D): number {
        return 0
    }


}