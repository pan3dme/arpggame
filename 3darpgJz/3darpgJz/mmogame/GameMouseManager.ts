
class GameMouseManager {
    private static _instance: GameMouseManager;
    public static getInstance(): GameMouseManager {
        if (!this._instance) {
            this._instance = new GameMouseManager();
        }
        return this._instance;
    }
    public constructor() {
    }
    private ready: boolean = false
    public setBtn($a: UICompenent, $b: UICompenent): void {
        this.b_yaogan_bar = $a
        this.b_yaogan_bg = $b
        this.ready = true;
    }
    private b_yaogan_bar: UICompenent;
    private b_yaogan_bg: UICompenent;
    public uiConatiner: UIVirtualContainer
    private resetPos: Vector2D = new Vector2D(150, 380)
    private bindPos: Vector2D = new Vector2D()
    public addMouseEvent(): void {
        if (Scene_data.isPc) {
            document.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
            document.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
            document.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
            document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
        } else {
            document.addEventListener(MouseType.TouchMove, ($evt: TouchEvent) => { this.onTouchMove($evt) });
            document.addEventListener(MouseType.TouchEnd, ($evt: TouchEvent) => { this.onTouchEnd($evt) });
            document.addEventListener(MouseType.TouchStart, ($evt: TouchEvent) => { this.onTouchStart($evt) });

        }
        this.bindPos.x = this.resetPos.x;
        this.bindPos.y = this.resetPos.y;
        this.updataFun = (t: number) => { this.updata(t) }
    }
    public onMouseWheel($evt: MouseWheelEvent): void {
        AstarUtil.sceneVectList = null;
        Scene_data.gameAngle += $evt.wheelDelta / 100;
    }
    public useMouseEvent: boolean = true;

    private isCanUseMouseEvent(): boolean {
        return this.useMouseEvent;
    }

    private onMouse($e: MouseEvent): void {

        if (!this.isCanUseMouseEvent()) {
            return
        }
        var evt: InteractiveEvent;
        var point: Vector2D = new Vector2D();
        if ($e instanceof MouseEvent) {
            if ($e.type == MouseType.MouseDown) {
                evt = new InteractiveEvent(InteractiveEvent.Down);
            } else if ($e.type == MouseType.MouseUp) {
                evt = new InteractiveEvent(InteractiveEvent.Up);
            } else if ($e.type == MouseType.MouseMove) {
                evt = new InteractiveEvent(InteractiveEvent.Move);
            } else if ($e.type == MouseType.MouseClick) {

            }
            point.x = $e.pageX;
            point.y = $e.pageY;
        }
        this.makeMouseEvent(evt, point);
    }
    private canTestClikGroundMove: InteractiveEvent //假如是点地面空白非UI区域才会有数据
    public lastMouseEvetTime: number = 0
    private makeMouseEvent(evt: InteractiveEvent, point: Vector2D): void {

     
        this.lastMouseEvetTime = TimeUtil.getTimer();
        var temp: boolean = UIManager.getInstance().mouseEvetData(evt, point);
        if (evt.type == InteractiveEvent.Move) {
            return;
        }
        if (GuidData.map&&GuidData.map.is1V1()) {
            if (this.lastMouseEvetTime < TimeUtil.getTimer()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                this.lastMouseEvetTime = TimeUtil.getTimer() + 3000
            }
            return 
        }
        if (evt.type == InteractiveEvent.Up && this.canTestClikGroundMove && !temp) {
            if (this.isSkillAer(point)) {  //特殊区域，基本没什么问题

             
                AotuSkillManager.getInstance().aotuBattle = false;
                AotuSkillManager.getInstance().aotuWalk = false;
                AotuSkillManager.getInstance().timeoutAuto();

                this.canTestClikGroundMove.x = point.x;
                this.canTestClikGroundMove.y = point.y;
                this.onSceneMouseDown(this.canTestClikGroundMove);
                //evt.x = point.x;
                //evt.y = point.y;
                //this.onSceneMouseDown(evt);
                this.canTestClikGroundMove = null;
            }
        }
        if (!temp && evt.type == InteractiveEvent.Down) {
            evt.x = point.x;
            evt.y = point.y;
            this.canTestClikGroundMove = evt;
        } else {
            this.canTestClikGroundMove = null;
        }
    }
    private isSkillAer(point: Vector2D): boolean {
        var $basePos: Vector2D
        if (document.body.clientWidth > document.body.clientHeight) {
            $basePos = new Vector2D(document.body.clientWidth, document.body.clientHeight)
        } else {
            $basePos = new Vector2D(0, document.body.clientHeight)
        }

        //    console.log("====",Vector2D.distance($basePos, point) ,(250 * UIData.Scale))

        return Vector2D.distance($basePos, point) > (250 * UIData.Scale);


    }
    private mouseToEvent($touchEvent: TouchEvent): InteractiveEvent {
        var evt: InteractiveEvent;
        var point: Vector2D = new Vector2D();
        if ($touchEvent.type == MouseType.TouchStart) {
            evt = new InteractiveEvent(InteractiveEvent.Down);
        } else if ($touchEvent.type == MouseType.TouchEnd) {
            evt = new InteractiveEvent(InteractiveEvent.Up);
            point.x = $touchEvent.changedTouches[0].pageX;
            point.y = $touchEvent.changedTouches[0].pageY;
        } else if ($touchEvent.type == MouseType.TouchMove) {
            evt = new InteractiveEvent(InteractiveEvent.Move);
        }
        if ($touchEvent.touches.length) {
            point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
            point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
        }
        this.makeMouseEvent(evt, point);

        return evt;
    }
    private cantClikGround($mousePos: Vector2D): boolean {
        if (GameInstance.useYaoGan) {
            return false;
        }
        if (!GameInstance.mainChar) {
            return false;
        }
        if (!SceneManager.getInstance().render) {
            return false;
        }
        if (GameInstance.mainChar.isDeath) {
            return false;
        }
        if (GuidData.map.is1V1()) {
            if (this.lastMouseEvetTime < TimeUtil.getTimer()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                this.lastMouseEvetTime = TimeUtil.getTimer() + 3000
            }
            return false
        }
        var kpos: Vector2D = new Vector2D($mousePos.x / UIData.Scale, $mousePos.y / UIData.Scale)
        var dis: number = Vector2D.distance($mousePos, this.bindPos);
        // console.log($mousePos, this.bindPos, dis)

        return true
    }
    //判断是否在左右下角区域，将不给于寻路
    private inYaoganButRound($evt: InteractiveEvent, $disNum: number = 100): boolean {
        if (Scene_data.isPc && !this.ready && !SceneManager.getInstance().ready) {
            return false
        }
        var $mousePos: Vector2D = new Vector2D
        if (!Scene_data.verticalScene) {
            $mousePos.x = $evt.x / UIData.Scale
            $mousePos.y = $evt.y / UIData.Scale
        } else {
            $mousePos.x = $evt.y / UIData.Scale
            $mousePos.y = (Scene_data.stageHeight - $evt.x) / UIData.Scale
        }

        $mousePos.x = $evt.x / UIData.Scale  //重置
        $mousePos.y = $evt.y / UIData.Scale   //重置 

        //var kk: UIConatiner = this.b_yaogan_bg.parent
        //var $txy: Vector2D = new Vector2D()

        //$txy.x = $mousePos.x - this.b_yaogan_bar.width / 2;
        //$txy.y = $mousePos.y - this.b_yaogan_bar.height / 2 - kk.y;

        var disA: number = Vector2D.distance($mousePos, new Vector2D(0, Scene_data.stageHeight / UIData.Scale))
    //    var disB: number = Vector2D.distance($mousePos, new Vector2D(960, Scene_data.stageHeight / UIData.Scale)) //右下角技能区域
        if (disA < 300) {
            return true
        } else {
            return false
        }

    }


    public onSceneMouseDown($evt: InteractiveEvent): void {

        if (this.ready && this.inYaoganButRound($evt)) {
            return;
        }
        var $mousePos: Vector2D = new Vector2D
        if (!Scene_data.verticalScene) {
            $mousePos.x = $evt.x
            $mousePos.y = $evt.y
        } else {
            $mousePos.x = $evt.y
            $mousePos.y = Scene_data.stageHeight - $evt.x
        }

        // console.log("---diban",this.cantClikGround($mousePos), GuidData.player);
        if (this.cantClikGround($mousePos) && GuidData.player) {

            if (GameInstance.questMoveVo) {
                GameInstance.questMoveVo = null;
            }
            var $fieldNotoriety: number = GuidData.player.getUnitFieldNotoriety(); //战斗模式
            var $selectChar: SceneChar = this.findHitChat(new Vector2D($evt.x, $evt.y));
            if ($selectChar && !$selectChar.isDeath) {
                if ($selectChar.unit.isPlayer() ) {
             
                    if (RelationManager.getInstance().inAttackItemByChar($selectChar)) {
                        GameInstance.attackTarget = $selectChar;
                        console.log("选人为攻击对象");
                    } else {
                        console.log("不在攻击队列中");
                    }
                }
                if ($selectChar.unit.isMonster() ) {
                    GameInstance.attackTarget = $selectChar;
                }
                if ($selectChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT) {
                    if ($selectChar instanceof ScenePortal) {
                        var $xcenePortal: ScenePortal = <ScenePortal>$selectChar
                        if ($xcenePortal.tb.judge == 0) {
                            quest.QuestModel.getInstance().use_gameobject($selectChar)
                            console.log("采集对象")
                        }
                    }

                }
                if ($selectChar.unit.isNpc()) {
                    this.talk_with_npc($selectChar.unit.getEntry())
                }
            } else {
                if (GameInstance.attackTarget) {
                    if (GameInstance.attackTarget.unit.isPlayer()) { //攻击对象为玩家
                    } else {
                        GameInstance.attackTarget = null;
                    }
                }
                if (!AotuSkillManager.getInstance().aotuBattle) {
                    this.lastMousePos = $mousePos;

                    if (GameInstance.mainChar.isSinging) {
                        if (GameInstance.mainChar.skillVo.tbSkillId) {
                            if (tb.TB_skill_base.get_TB_skill_base(GameInstance.mainChar.skillVo.tbSkillId).can_move == 0) {
                                GameInstance.mainChar.msgSpellStop();
                            }
                        }
                    }
                    this.findMoveTo();
                  //  console.log("地面寻路")
                }
               

            }

        }

    }
    private talk_with_npc($entryId: number): void {


        var $k: dialog.DialogueEvent = new dialog.DialogueEvent(dialog.DialogueEvent.SHOW_DIALOGUE_PANEL);
        $k.entryId = $entryId
        ModuleEventManager.dispatchEvent($k);//

    }



    private lastMousePos: Vector2D
    private findMoveTo(): void {
        if (this.lastMousePos) {
            var bsc: SceneChar = GameInstance.mainChar;
            if (MainCharControlModel.getInstance().isWalkOrStand()) {
                this.sendWalkToPos(this.lastMousePos);
                this.lastMousePos = null;
            } else {
                TimeUtil.addTimeOut(100, () => {
                    this.findMoveTo();
                });
            }


            if (bottomui.Progress_line.getInstance()) {
                bottomui.Progress_line.getInstance().hide()
            }
        }
    }
    private findHitChat($evt: Vector2D): SceneChar {
        var $pos: Vector2D = new Vector2D
        if (!Scene_data.verticalScene) {
            $pos.x = $evt.x
            $pos.y = $evt.y
        } else {
            $pos.x = $evt.y
            $pos.y = Scene_data.stageHeight - $evt.x
        }

        var $hitPos: Vector3D = AstarUtil.getScenePos($pos.x, $pos.y);
        if ($hitPos) {
            var $camVec: Vector3D = new Vector3D;
            $camVec.x = Scene_data.cam3D.x
            $camVec.y = Scene_data.cam3D.y
            $camVec.z = Scene_data.cam3D.z

            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                var $sceneChar: SceneChar = GameInstance.roleList[i];
       
                if ($sceneChar.mouseClik($camVec, $hitPos) && !$sceneChar.unit.isMain && $sceneChar.visible) {
                    console.log($sceneChar.unit.getName())
                    return $sceneChar;
                }
            }
        }
        return null

    }

    private sendWalkToPos($pos: Vector2D): void {
        
        var $hitPos: Vector3D = AstarUtil.getScenePos($pos.x, $pos.y);
        if ($hitPos) {
            var $v2d: Vector2D = AstarUtil.getGrapIndexByPos($hitPos)
            if (AstarUtil.getJumpDataByV2d($v2d.x, $v2d.y)) {
                $hitPos = this.findNearJumpCharPos();
                if (!$hitPos) {
                    return;
                }
            }
            var item: Array<Vector2D> = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if (item) {
                MainCharControlModel.getInstance().setWalkPathFun(item, () => { GameMouseManager.getInstance().walkPathComplete() })

            }
        }
    }
    private findNearJumpCharPos(): Vector3D {
        var $displayList: Array<SceneChar> = GameInstance.roleList
        var $dis: number;
        var $selectChar: ScenePortal
        for (var i: number = 0; i < $displayList.length; i++) {
            if ($displayList[i] instanceof ScenePortal) {
                var $tempChar: ScenePortal = <ScenePortal>$displayList[i];
                if ($tempChar.tb.judge == 4) {
                    $selectChar = $tempChar
                }

            }
        }
        if ($selectChar) {
            return $selectChar.getCurrentPos()
        } else {
            return null
        }

    }

    private onTouchStart($e: TouchEvent): void {
        if (!this.isCanUseMouseEvent()) {
            return
        }
        this.mouseToEvent($e);
    }
    private onTouchEnd($e: TouchEvent): void {

        if (!this.isCanUseMouseEvent()) {
            return
        }
        if (GameInstance.useYaoGan) {
   
            var hasYaoGan:boolean=false
            for (var i: number = 0; i < $e.touches.length; i++) {
                if ($e.touches[i].identifier == this.yaoganIdentifier) {
                    hasYaoGan=true
                }
            }
            if (!hasYaoGan) {
                this.bindPos.x = this.resetPos.x;
                this.bindPos.y = this.resetPos.y;
                TimeUtil.removeFrameTick(this.updataFun);
                this.canTestClikGroundMove = null; //
                GameInstance.useYaoGan = false;
                this.setBasePostion();
                GameInstance.mainChar.stopMove();
                GameMouseManager.getInstance().walkPathComplete()
                this.yaoganIdentifier=-1
                AotuSkillManager.getInstance().timeoutAuto();
            }
  
        }
        this.mouseToEvent($e);

    }
    private setBasePostion(): void {
        this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2;
        this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2;
        console.log(this.b_yaogan_bar.y)

        this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2;

    }
    private onTouchMove($e: TouchEvent): void {

        // alert("--MOve--");
        if (!this.isCanUseMouseEvent()) {
            return
        }
        if (this.b_yaogan_bar && SceneManager.getInstance().ready) {

            var $evt = this.mouseToEvent($e);
            // console.log("--GameInstance.useYaoGan--",GameInstance.useYaoGan)
            if (!GameInstance.useYaoGan) {
                if (this.canTestClikGroundMove || this.inYaoganButRound($evt)) { //如果是点的地面，才可以用遥感。在UI上将不可以
                    if (GuidData.map.is1V1()) {
                        if (this.lastMouseEvetTime < TimeUtil.getTimer()) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                            this.lastMouseEvetTime = TimeUtil.getTimer() + 3000
                        }
                        return;
                    }
                    
                    this.beginYaogan($e)
                
                    this.isFristTouchMove = true
                }
                // return
            } else {
                this.isFristTouchMove = false
                //GameInstance.mainUi.bottomRightSystem.changeBaskSkillIcon(0);
                var mousePos: Vector2D;
                for (var i: number = 0; i < $e.touches.length; i++) {
                    if ($e.touches[i].identifier == this.yaoganIdentifier) {
                        var temp: Vector2D = this.getMouseDownPos($e.touches[i]);
                        if (mousePos) {
                            if (Vector2D.distance(mousePos, this.bindPos) > Vector2D.distance(temp, this.bindPos)) {
                                mousePos = temp
                            }
                        } else {
                            mousePos = temp
                        }
                    }
                }
                //此处为技能播放与寻路判断，暂时改为+400.正确情况应该是去掉该层判断，并修改技能表的self_cd值。
                // if (TimeUtil.getTimer() > AotuSkillManager.lastPlaySkillTime+400){
                    this.changeBingPostion(new Vector2D(mousePos.x, mousePos.y));
                // }

            }
        }
    }
    private changeBingPostion(mousePos: Vector2D): void {
        var dis: number = Vector2D.distance(mousePos, this.bindPos);
        if (dis > 50) {
            var $nrm: Vector2D = new Vector2D(this.bindPos.x - mousePos.x, this.bindPos.y - mousePos.y);
            $nrm.normalize();
            $nrm.scaleBy(50);
            this.bindPos.x = mousePos.x + $nrm.x;
            this.bindPos.y = mousePos.y + $nrm.y;
        }
        var kk: UIConatiner = this.b_yaogan_bg.parent
        var v2d: Vector2D = new Vector2D(mousePos.x - this.bindPos.x, mousePos.y - this.bindPos.y);
        v2d.normalize();
        this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2 + v2d.x * 20;
        this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2 + v2d.y * 20 - kk.y;
        this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2 - kk.y;



        var kAngly: number = 30//度
        var $a: number = Math.atan2(v2d.y, v2d.x) * 180 / Math.PI;
        if (this._lastV2dNrm) {
            var $b: number = Math.atan2(this._lastV2dNrm.y, this._lastV2dNrm.x) * 180 / Math.PI;
            if (Math.abs($a - $b) < kAngly) { //小于特定角度将不更新
                return
            }
        }
        this._lastV2dNrm = new Vector2D(v2d.x, v2d.y)
        var ma: Matrix3D = new Matrix3D();
        ma.appendRotation(-Scene_data.focus3D.rotationY, Vector3D.Y_AXIS);
        this._speedDirect = ma.transformVector(new Vector3D(v2d.x, 0, -v2d.y))
        this.changeMainChar()

        // console.log("修改摇杆")

    }
    private changeMainChar(): void {
        if (this.isCanChangeRole) {

            MainCharControlModel.getInstance().setSpeedDirect(this._speedDirect);
            this.sendYaoGanPath();
     
        } else {
            TimeUtil.addTimeOut(100, () => {
                //    this.changeMainChar();
            });
        }
    }
    private nextSendTime: number = 0;
    private sendYaoGanPath(): void {

        if (this.isCanChangeRole) {
            if (AotuSkillManager.getInstance().aotuBattle) {
                AotuSkillManager.getInstance().aotuBattle = false;
            }
            if (AotuSkillManager.getInstance().aotuWalk) {
                AotuSkillManager.getInstance().aotuWalk = false;
            }
            if (this._speedDirect && !GameInstance.mainChar.isDeath) {
                if (!MainCharControlModel.getInstance().isWalk()) {
                    return;
                }
                var $toPos: Vector3D = GameInstance.mainChar.getCurrentPos();
                $toPos.x = $toPos.x + this._speedDirect.x * 20;
                $toPos.z = $toPos.z + this._speedDirect.z * 20;
                $toPos = AstarUtil.findNearLinePoint(GameInstance.mainChar.getCurrentPos(), $toPos)
                var a: Vector2D = GameInstance.mainChar.getAstarPos();
                var b: Vector2D = AstarUtil.getGrapIndexByPos($toPos);
                this.nextSendTime = TimeUtil.getTimer() + 300;
                if (!GameInstance.useYaoGan) {
                    this._speedDirect = null;
                }
                if ((a.x == b.x && a.y == b.y)) {
                    //    this.getNearFiledRoad();
                } else {
                    GameInstance.questMoveVo = null
                    if (AstarUtil.isGridCanWalk(a)) {

                        if (AstarUtil.isGridCanWalk(b)) {
                            MainCharControlModel.getInstance().sendPath([a, b]);
                        } else {
                            MainCharControlModel.getInstance().sendPath([a, a]);
                        }
                    } else {
                        if (AstarUtil.isGridCanWalk(b)) {
                            MainCharControlModel.getInstance().sendPath([b, b]);
                        } else {
                            console.log("移动的两个位置都不可移动。需要优化")
                        }
                    }
                }
            }
        }

    }
    private getNearFiledRoad(): void {
        var a: Vector2D = GameInstance.mainChar.getAstarPos();

        var $tx: number = a.x;
        var $ty: number = a.y;

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
        console.log($outStr)
        console.log("-----------------------------")
    }
    public skipNum: number = 0
    private get isCanChangeRole(): boolean {
        if (JumpModel.isTestJumpNow()) { //正在检测场景跳点
            return false;
        }
        var $curentAction: string = GameInstance.mainChar.curentAction;
        // console.log("-- $curentAction--", $curentAction);
        if (GameInstance.mainChar.isSinging || $curentAction == CharAction.WALK || $curentAction == CharAction.STANAD || $curentAction == CharAction.STAND_MOUNT || $curentAction == CharAction.WALK_MOUNT) {
            return true
        } else {
            return false
        }
    }

    private _speedDirect: Vector3D;
    private isFristTouchMove: boolean = true;
    private yaoganIdentifier:number=-1
    private beginYaogan($e: TouchEvent): void {
        for (var i: number = 0; i < $e.touches.length; i++) {
            var tempPos: Vector2D = this.getMouseDownPos($e.touches[i]);
            if (tempPos.x < Scene_data.stageWidth / 4) {
                if (!GameInstance.useYaoGan) {
                    this.bindPos.x = tempPos.x
                    this.bindPos.y = tempPos.y
                    TimeUtil.addFrameTick(this.updataFun);
                    GameInstance.useYaoGan = true;

                    FpsMc.tipStr = String($e.touches[i].identifier);
                    this.yaoganIdentifier = $e.touches[i].identifier;
                }
            }
        }

    }
    private updataFun: Function;
    private _lastV2dNrm: Vector2D
    public updata(t: number): void {

        if (TimeUtil.getTimer() > this.nextSendTime && this.isCanChangeRole) {

            if (!this.isFristTouchMove && GameInstance.mainChar) {
                if (GameInstance.mainChar.curentAction == CharAction.STANAD) {
                    this.changeMainChar()
                }
                this.sendYaoGanPath();
            }
        }

    }

    private getMouseDownPos($touch: Touch): Vector2D {
        var $mousePos: Vector2D = new Vector2D
        if (!Scene_data.verticalScene) {
            $mousePos.x = $touch.pageX / UIData.Scale
            $mousePos.y = $touch.pageY / UIData.Scale
        } else {
            $mousePos.x = $touch.pageY / UIData.Scale
            $mousePos.y = (Scene_data.stageHeight - $touch.pageX) / UIData.Scale
        }
        $mousePos.y += (Scene_data.stageHeight / UIData.Scale - 540)
        return $mousePos;

    }

    //寻路结束后回调用是否有传送点
    private collectionType: number = 0
    public walkPathComplete(): void {



        var $displayList: Array<SceneChar> = GameInstance.roleList;
        this.collectionType = 0;  //默认为0攻击图标
        for (var i: number = 0; $displayList && i < $displayList.length; i++) {
            var $tempChar: SceneChar = $displayList[i];
            if(!$tempChar.unit){
                continue;
            }
            if ($tempChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT) {
                if (this.teleportToScene($tempChar)) {
                    break;
                }
            } else if ($tempChar.unit.isNpc()) {
                //console.log($tempChar.math_distance(GameInstance.mainChar));
                if (GameInstance.mainChar.math_distance($tempChar) < 80) {
                    this.collectionType = 1 //和NPC对话1
                    break
                }
            }
        }
        //  GameInstance.mainUi.bottomRightSystem.changeBaskSkillIcon(this.collectionType);
        if (GameInstance.attackTarget) {
            if (GameInstance.attackTarget.unit.isPlayer()) {
                GameInstance.attackTarget = null;
            }
        }


    }


    //检测特殊对象
    public isCatchSceneCharDis($tempChar: SceneChar): boolean {
        if ($tempChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT) {
            var $tb_gameobject_template: tb.TB_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template($tempChar.unit.getEntry())
            var a: Vector2D = GameInstance.mainChar.getAstarPos();
            var b: Vector2D = $tempChar.getAstarPos();
            if (a && b && Math.abs(a.x - b.x) < $tb_gameobject_template.trigger_width && Math.abs(a.y - b.y) < $tb_gameobject_template.trigger_height) {
                return true;
            }
        }
        return false
    }
    /**检测掉落 */
    public isCatchSceneLoot(loot: SceneLoot): boolean {
        var g1: string = loot.getOwnderGuid();
        //var g2:string = GameInstance.mainChar.unit.getPlayerGUID();
        //console.log(g1,g2)
        if (g1 == "" || g1 == GameInstance.mainChar.unit.getPlayerGUID()) {
            var a: Vector2D = GameInstance.mainChar.getAstarPos();
            var b: Vector2D = loot.getAstarPos();
            if (a && b && Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1) {
                return true;
            }
        }

        return false;
    }

    private teleportToScene($tempChar: SceneChar): boolean {
        if ($tempChar instanceof SceneCollection) {
            return false;
        }

        if (this.isCatchSceneCharDis($tempChar)) {
            var $tb_gameobject_template: tb.TB_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template($tempChar.unit.getEntry())
            if ($tb_gameobject_template.id == 6) { //传送点
                NetManager.getInstance().protocolos.teleport($tempChar.unit.uintGuid);
                this.collectionType = 0;
            } else {
                this.collectionType = $tb_gameobject_template.style;
            }
            return true
        }
        return false

    }






}