class MainCharControlModel {
    private static _instance: MainCharControlModel;
    public static getInstance(): MainCharControlModel {
        if (!this._instance) {
            this._instance = new MainCharControlModel();
        }
        return this._instance;
    }
    public constructor() {

    }

    public update(t): void {
        var $mainChar:SceneChar = GameInstance.mainChar;
        if ($mainChar.jumpItem) {

        }  else if ($mainChar._speedDirect) {
            if ($mainChar.curentAction == CharAction.WALK || $mainChar.curentAction == CharAction.WALK_MOUNT || $mainChar.isSinging) {
                this.walkDirect(t);
            }
            $mainChar.refreshY();
        }
    }
    public frameUpData(): boolean
    {
        var $mainChar: SceneChar = GameInstance.mainChar;
        if ($mainChar.isDeath) {
            return true;
        }
        if (GameInstance.useYaoGan) { //正在使用遥感
            return true;
        }

        if (!AotuSkillManager.getInstance().aotuBattle) {
            if (GameInstance.attackTarget) {
                if (GameInstance.attackTarget.unit.isPlayer()) {
                    return true
                }
                if (!GameInstance.attackTarget.onStage) {
                    GameInstance.attackTarget = null
                }
            } else {
                return true
            }
        } else {

            if ($mainChar.isSinging && GameInstance.mainChar.skillVo && tb.TB_skill_base.get_TB_skill_base(GameInstance.mainChar.skillVo.tbSkillId).can_move==1) {
                if (GameInstance.attackTarget) {
                    if (!GameInstance.attackTarget.onStage) {
                        GameInstance.attackTarget = null
                    }
                } else {
                    console.log("没有对像")
                  //  AotuSkillManager.getInstance().findNearAttackTaget()
                    GameInstance.attackTarget = RelationManager.getInstance().findNearCanAttackScene()
                }
  
                if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
                   var $to2D:Vector2D= GameInstance.attackTarget.getAstarPos()
                   if (Vector2D.distance($to2D, this.singingToPos) > 3) {
                       this.singingToPos = $to2D
                       var item: Array<Vector2D> = AstarUtil.findPath2D($mainChar.getAstarPos(), $to2D);
                       if (item && item.length) {
                           MainCharControlModel.getInstance().setWalkPathFun(item);
                       }
                   }
                }
                return true;
            }
        }
        return false
    }
    private singingToPos:Vector2D=new Vector2D
    public setSpeedDirect(value: Vector3D): void {
        var mainChar: SceneChar = GameInstance.mainChar;
        if (!mainChar.isDeath) {
            mainChar.setSpeedDirect(value);
        }
    }

    public sendStop(): void {

        var $mainChar: SceneChar = GameInstance.mainChar;
        $mainChar.stopMove();
        if ($mainChar.unit) {

            var $arr: Array<Vector2D> = [$mainChar.getAstarPos(), $mainChar.getAstarPos()];
            $mainChar.unit.sendPath($arr);
        }
       

    }
    public sendPath($ary: Array<Vector2D>): void {
        var mainChar: SceneChar = GameInstance.mainChar;
        if (mainChar.unit) {
            mainChar.unit.sendPath($ary);
           // console.log("发送移动线路--------------",TimeUtil.getTimer())
        }
    }
    public setWalkPathFun($item: Array<Vector2D>, $bfun: Function = null): void {

        if (SceneManager.getInstance().ready) {
            var mainChar: SceneChar = GameInstance.mainChar;
            this.sendPath($item);
            $item.shift();
            mainChar.applyWalk($item);
            mainChar.walkCompleteBackFun = $bfun

        
        }
    }
    public clikEat(): void {
        var $cdTime: number = tb.SkillData.getCdMeshBySkillId(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD);
        if (isNaN($cdTime) || ($cdTime - TimeUtil.getTimer()) < 0) {
            tb.SkillData.setCdMeshData(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD, 12 * 1000)
            NetManager.getInstance().protocolos.use_restore_potion();
          //  console.log("发送吃药")
        } else {
          //  console.log("clikEatCd中")
        }
    }
    public downMount(): void
    {
        var mainChar: SceneChar = GameInstance.mainChar;
        if (mainChar.isMount) {
            mainChar.unit.setDownMount(); //修改下坐骑的U数据
            mainChar.setMount();//刷新
        }
    }

    
    public isWalkOrStand(): boolean {
        var mainChar: SceneChar = GameInstance.mainChar;
        var $buff: BuffUnit = mainChar.unit.buffUnit;
        for (var $keystr in $buff.item) {
            if (Number($keystr) == 152) {
                console.log("有吟唱buff时可移动");
                return true;
            }
        }
        if (mainChar.isMount) {
            return true;
        }
        var $action: string = mainChar.getCurrentAction()
        if ($action == CharAction.WALK || $action == CharAction.STANAD) {
            return true;
        } else {
            return false;
        }


     

    }
    public isWalk(): boolean {
        var mainChar: SceneChar = GameInstance.mainChar;
        var $action: string = mainChar.getCurrentAction()
        if ($action == CharAction.WALK || $action == CharAction.WALK_MOUNT || mainChar.isSinging ) {
            return true;
        } else {
            return false;
        }

    }
    protected walkDirect(t: number): void {
        t = Math.min(Math.max((1000 / 60), t), 30)  //特殊限制摇杆移动
        var $mainChar: SceneChar = GameInstance.mainChar;
        if (this.nextAstartNoCanWalk) {
            var $nextPos: Vector2D = this.getNearFiledRoad();
            if ($nextPos) {
                this.walkToNearPosBy2D($nextPos, t)
            }
            return;
        }
        var sn: number = t * $mainChar.speedTX;
        var nextPos: Vector3D = new Vector3D();
        var tx: number = $mainChar._speedDirect.x * sn;
        var ty: number = $mainChar._speedDirect.z * sn;
        $mainChar.toRotationY = -Math.atan2(ty, tx) * 180 / Math.PI + 90;
        nextPos.x = $mainChar.px + tx;
        nextPos.z = $mainChar.pz + ty;
        if (AstarUtil.getPosIsCanMove(nextPos)) {
            $mainChar.px = nextPos.x;
            $mainChar.pz = nextPos.z;
        }

        if (bottomui.Progress_line.getInstance()) {
            bottomui.Progress_line.getInstance().hide()
        }
    }
    private walkToNearPosBy2D($v2d: Vector2D, t: number): void {
        var $mainChar: SceneChar = GameInstance.mainChar;
        var sn: number = t * $mainChar.speedTX;
        var a: Vector3D = $mainChar.getCurrentPos();
        var b: Vector3D = AstarUtil.getWorldPosByStart2D($v2d);

        var nrm: Vector3D = b.subtract(a);
        nrm.y = 0;
        nrm.normalize()
        nrm.scaleBy(sn)
        var $anglynum: number = 0;
        var $nextPos: Vector3D = new Vector3D($mainChar.px, $mainChar.py, $mainChar.pz);
        var $m: Matrix3D = new Matrix3D
        var $testPosV3D: Vector3D
        while ($anglynum < 60) {
            $m.identity();
            $m.appendRotation(0 + $anglynum, Vector3D.Y_AXIS);
            $testPosV3D = $m.transformVector(nrm);
            $testPosV3D.x = $mainChar.px + $testPosV3D.x;
            $testPosV3D.z = $mainChar.pz + $testPosV3D.z;
            if (AstarUtil.getPosIsCanMove($testPosV3D)) {
                $nextPos = $testPosV3D
                break;
            } else {
                $m.identity();
                $m.appendRotation(0 - $anglynum, Vector3D.Y_AXIS);
                $testPosV3D = $m.transformVector(nrm);
                $testPosV3D.x = $mainChar.px + $testPosV3D.x;
                $testPosV3D.z = $mainChar.pz + $testPosV3D.z;
                if (AstarUtil.getPosIsCanMove($testPosV3D)) {
                    $nextPos = $testPosV3D
                    break;
                }
            }
            $anglynum++

        }
        if (AstarUtil.getPosIsCanMove($nextPos)) {
            $mainChar.px = $nextPos.x;
            $mainChar.pz = $nextPos.z;
        } else {
           // console.log("不在可行走格子里", $nextPos)
        }
    }
    private lastOutStr: string = "";
    private getNearFiledRoad(): Vector2D {
        var $mainChar: SceneChar = GameInstance.mainChar;
        var a: Vector2D = $mainChar.getAstarPos();
        if (!a) {
            return null;
        }
        var $tx: number = a.x;
        var $ty: number = a.y;

        var $anglyItem: Array<Vector2D> = new Array;

        var $item: Array<Vector2D> = new Array;
        $item.push(new Vector2D($tx - 1, $ty - 1));
        $item.push(new Vector2D($tx, $ty - 1));
        $item.push(new Vector2D($tx + 1, $ty - 1));

        $item.push(new Vector2D($tx - 1, $ty));
        $item.push(new Vector2D($tx, $ty));
        $item.push(new Vector2D($tx + 1, $ty));

        $item.push(new Vector2D($tx - 1, $ty + 1));
        $item.push(new Vector2D($tx, $ty + 1));
        $item.push(new Vector2D($tx + 1, $ty + 1));

        $anglyItem.push($item[5]);
        $anglyItem.push($item[8]);
        $anglyItem.push($item[7]);
        $anglyItem.push($item[6]);
        $anglyItem.push($item[3]);
        $anglyItem.push($item[0]);
        $anglyItem.push($item[1]);
        $anglyItem.push($item[2]);

        var $outStr: string = ""
        for (var i: number = 0; i < $item.length; i++) {
            if (AstarUtil.isGridCanWalk($item[i])) {
                $outStr += "1,"
            } else {
                $outStr += "0,"
            }
            if (i % 3 == 2) {
                $outStr += "\n"
            }
        }
        var $needOutput: boolean = this.lastOutStr.length != $outStr.length;
        for (var k: number = 0; k < this.lastOutStr.length; k++) {
            if (this.lastOutStr[k] != $outStr[k]) {
                $needOutput = true
            }
        }
        if ($needOutput) {
            //    console.log($outStr)
            //    console.log("-----------------------------", TimeUtil.getTimer());
        }
        //var rrr: number = -Math.atan2(this._speedDirect.z, this._speedDirect.x) * 180 / Math.PI + 90;
        //console.log(Math.floor((rrr % 360 + 360) % 360));


        var rrr: number = -Math.atan2($mainChar._speedDirect.z, $mainChar._speedDirect.x) * 180 / Math.PI;
        rrr = (rrr % 360 + 360) % 360;
        var disR: number = 360 / 8
        var $id: number = Math.floor((rrr + disR / 2) / disR)
        // console.log(Math.floor(rrr), $id)

        var $turnNum: number = 1
        while ($turnNum < 3) {
            var aleft: number = ($id + $turnNum + 8) % 8;
            var aright: number = ($id - $turnNum + 8) % 8;
            var leftPos: Vector2D = $anglyItem[aleft];
            var rightPos: Vector2D = $anglyItem[aright];
            if (!AstarUtil.isGridCanWalk(leftPos) && !AstarUtil.isGridCanWalk(rightPos)) {
                $turnNum++
            } else {
                if (AstarUtil.isGridCanWalk(leftPos) && AstarUtil.isGridCanWalk(rightPos)) {
                    //console.log("两边都可选")
                } else {
                    if (AstarUtil.isGridCanWalk(leftPos)) {
                        // console.log(aleft, "左");
                        return leftPos;
                    } else if (AstarUtil.isGridCanWalk(rightPos)) {
                        //  console.log(aright, "右");
                        return rightPos;
                    }
                }
                $turnNum = 3
                break;
            }
        }


        this.lastOutStr = $outStr

        return null
    }
    //指定方向下一个不可走
    private get nextAstartNoCanWalk(): boolean {
        var $mainChar: SceneChar = GameInstance.mainChar;
        var tx: number = $mainChar._speedDirect.x * 5;
        var ty: number = $mainChar._speedDirect.z * 5;
        var nextPos: Vector3D = new Vector3D();
        nextPos.x = $mainChar.px + tx;
        nextPos.z = $mainChar.pz + ty;
        if (AstarUtil.getPosIsCanMove(nextPos)) {
            return false
        } else {
            return true
        }

    }

}