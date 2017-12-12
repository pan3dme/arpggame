class FightSkillModel {
    private static _instance: FightSkillModel;
    public static getInstance(): FightSkillModel {
        if (!this._instance) {
            this._instance = new FightSkillModel();
        }
        return this._instance;
    }
    public  playSkillToAttack($vo: tb.SkillDataVo,$ui:boolean): void {
  
        if (GameInstance.mainChar.isSinging) {
            return;
        }
        if (!$ui || $vo.tb_skill_base.is_play_forbid==0) {
            this.playSkillEffect($vo.tb_skill_base.id);
        }
        //发送技能消息给服务器
        var attack2D: Vector2D = new Vector2D;
        var $guid: number = 0;
        if (GameInstance.attackTarget) {
            attack2D = GameInstance.attackTarget.getAstarPos();
            GameInstance.mainChar.watch(GameInstance.attackTarget);
            if ($vo.tb_skill_base.lock_type == 1) {
                $guid = GameInstance.attackTarget.unit.uintGuid;
            }
        } else {
            attack2D = this.getMainCharFrontPos($vo);
        }
      
        //console.log("$vo.slot, attack2D.x, attack2D.y, 0, $guid");
        //console.log($vo.slot, attack2D.x, attack2D.y, 0, $guid, GameInstance.mainChar.unit.getGuid());


       
        var angly: number = (-GameInstance.mainChar.rotationY - 270) % 360
        NetManager.getInstance().protocolos.set_orient(angly);


        NetManager.getInstance().protocolos.spell_start($vo.slot, attack2D.x, attack2D.y, 0, $guid);


    }
    private getMainCharFrontPos($vo: tb.SkillDataVo): Vector2D {
        var a: Vector2D = AstarUtil.getGrapIndexByPos(GameInstance.mainChar.getCurrentPos());
        var m: Matrix3D = new Matrix3D()
        var angly: number = (-GameInstance.mainChar.rotationY - 270) % 360
        m.appendRotation(angly, Vector3D.Y_AXIS);
        var $p: Vector3D = new Vector3D(1, 0, 0);
        $p = m.transformVector($p);
        $p.normalize();
        $p.scaleBy($vo.tb_skill_uplevel.distance);
        a.x += $p.x;
        a.y += $p.z;
        a.x = Math.floor(a.x);
        a.y = Math.floor(a.y);
        return a;
    }
    public canPlaySkillToAttackTarger(range: number): boolean {

        if (GameInstance.attackTarget && GameInstance.mainChar.math_distance(GameInstance.attackTarget) < range) {
            return true
        }
        return false


    }
    //走到新攻击目标附近
    public moveToAttackTarger($sceneChar: SceneChar, $selectSkill: tb.SkillDataVo, $fun: Function = null): void {
        var $dis: number = $selectSkill.tb_skill_uplevel.distance - 2;
        var $to2D: Vector2D = $sceneChar.getAstarPos()
        var $self2D: Vector2D = GameInstance.mainChar.getAstarPos()
        if(!$self2D){
            return
        }

        var $nrm: Vector2D = new Vector2D($self2D.x - $to2D.x, $self2D.y - $to2D.y)
        $nrm.normalize()
        $nrm.scaleBy($dis)
        $nrm.x = Math.floor($nrm.x);
        $nrm.y = Math.floor($nrm.y);
        $to2D.x += $nrm.x;
        $to2D.y += $nrm.y;

        var item: Array<Vector2D> = AstarUtil.findPath2D($self2D, $to2D);
        if (item && item.length) {
            MainCharControlModel.getInstance().setWalkPathFun(item, $fun);
        }
    }
    private playSkillEffect(skillid: number): void {
        var $skilldata: Play_Skill_Vo = Play_Skill_Vo.get_Play_Skill_Vo(skillid)
        if ($skilldata.tb_skill_base.effect_file && $skilldata.tb_skill_base.effect) {
            var $skill: Skill = SkillManager.getInstance().getSkill(getSkillUrl($skilldata.tb_skill_base.effect_file), $skilldata.tb_skill_base.effect);
            if ($skill) {
                $skill.reset();
                //$skill.isDeath = false;
                $skill.needSound = true;
                var $hitPosItem: Array<Vector3D>=new Array
                if ($skilldata.tb_skill_base.is_remain == 0) { //不是持续技能
                    if ($skilldata.tb_skill_base.isOrbit == 1) { //锁定技能
                        if (GameInstance.attackTarget) {
                            $skill.configTrajectory(GameInstance.mainChar, GameInstance.attackTarget);
                        } else {
                            return;
                        }
                    } else {
                        
                        if (GameInstance.attackTarget && $skilldata.tb_skill_base.target_type==4) {
                            $hitPosItem.push(GameInstance.attackTarget.getCurrentPos())
                        }
                        $skill.configFixEffect(GameInstance.mainChar, null, $hitPosItem);
                    }
                    GameInstance.mainChar.playSkill($skill);
                    FightManager.getInstance().setSelfSkillCd(skillid);
                }
            }
        }
    }



}


class JumpModel {

    public constructor() {
    }
    public static jumpNow: boolean = false;
    private static nextCheckTime: number = 0;
    private static walkPathPos: Vector3D;
    public static jumpTestIn(): void //检测是否在跳点里，
    {
        if (this.isTestJumpNow()) {
            return 
        }
        for (var i: number = 0; i < RelationManager.getInstance().jumpItem.length;i++)
        {
            var $jumpTemp: SceneChar = RelationManager.getInstance().jumpItem[i]
            if ($jumpTemp.onStage) {
                var $tb_gameobject_template: tb.TB_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template($jumpTemp.unit.getEntry())
                var a: Vector2D = GameInstance.mainChar.getAstarPos();
                var b: Vector2D = $jumpTemp.getAstarPos();
                if (a && b && Math.abs(a.x - b.x) < $tb_gameobject_template.trigger_width && Math.abs(a.y - b.y) < $tb_gameobject_template.trigger_height) {
                    var $kkkkk: number = $jumpTemp.unit.GetUInt32(SharedDef.GO_FIELD_DATA + 1);
                    this.walkPathPos = GameInstance.mainChar.getEndWalkPathPos()
                    GameInstance.mainChar.jumpEndFun = () => { JumpModel.selfJumpEnd() };
                    MainCharControlModel.getInstance().sendStop();
                    console.log("向服务器发送跳跃信息====>");
                    NetManager.getInstance().protocolos.use_jump_point($kkkkk);
                    this.nextCheckTime = TimeUtil.getTimer() + 1000;
                    break;
                }
            }
        }
    }
    public static selfJumpEnd(): void
    {
        this.jumpNow = false;
        if (GameInstance.questMoveVo) {
            quest.QuestModel.getInstance().toplay(GameInstance.questMoveVo.pos);
        } else {
            if (this.walkPathPos) {
                quest.QuestModel.getInstance().toplay(AstarUtil.getGrapIndexByPos(this.walkPathPos));
                this.walkPathPos = null
            }
        }

    }


    public static isTestJumpNow(): boolean
    {
        return this.nextCheckTime > TimeUtil.getTimer()
    }
    public static frameUpData(): boolean
    {
        if (JumpModel.jumpNow) {
            return true
        } else {
            JumpModel.jumpTestIn();
        }
        return false
    }

}
class AotuFunModelVo
{
    public name: string;
    public endSkillPlay: boolean;
    public fun: Function;
    public constructor($fun: Function,$end:boolean=false,$name:string=null) {
        this.fun = $fun;
        this.endSkillPlay = $end
        this.name = $name;
    }
}

class AotuSkillManager
{
    private static _instance: AotuSkillManager;
    public static getInstance(): AotuSkillManager {
        if (!this._instance) {
            this._instance = new AotuSkillManager();
        }
        return this._instance;
    }
    public constructor() {
        this.initAotuFunItem()
        TimeUtil.addFrameTick((t: number) => { this.update(t) });
    }
    private _aotuWalk: boolean;
    public get aotuWalk(): boolean {
        return this._aotuWalk;
    }
    public set aotuWalk(value: boolean) {
        if (this.aotuWalk == value) {
            return
        }
        this._aotuWalk = value;
        if (value) {
            this.aotuBattle = false
        }
        //GameInstance.mainUi.bottomCenterPanel.showWalkTxt();
    }
    private _aotuBattle: boolean = false;
    public pathItem: Array<Vector2D>;
    public get aotuBattle(): boolean {
        return this._aotuBattle;
    }
    public set aotuBattle(value: boolean) {
        //if(1==1){return}
        if (value) {
            this.aotuWalk = false
        }
        if (this._aotuBattle != value) {
            GameInstance.attackTarget = null; //重新设置攻击
            this._aotuBattle = value;
            if (this._aotuBattle) {
                if (GameInstance.mainChar.unit.hasMount()) {
                    NetManager.getInstance().protocolos.ride_mount();
                }
            } 
            ModuleEventManager.dispatchEvent(new fightui.FightUiEvent(fightui.FightUiEvent.REFRESH_SKILL_AOTUBATTLE));

        }

    }

    public timeoutAuto():void{
        TimeUtil.addTimeOut(5000,()=>{
            if(GuidData.map.tbMapVo.aotubattle){
                this.aotuBattle = true;
            }
        })
    }



    private isTestAotuFun(): boolean
    {
        var $stopEnd:boolean=false
        for (var i: number = 0; i < this.aotuFunItem.length; i++) {
            if (this.aotuFunItem[i].endSkillPlay) { //是否会中断自动战斗播放技能;
                var $temp: boolean = this.aotuFunItem[i].fun();
                if ($temp) {
                    $stopEnd = true;
                }
            } else {
                this.aotuFunItem[i].fun();
            }
        }
        return $stopEnd
    }
    private initAotuFunItem(): void
    {
        this.aotuFunItem = new Array();

        this.aotuFunItem.push(new AotuFunModelVo(() => { return AttackEffectsManager.frameUpData() }));
        this.aotuFunItem.push(new AotuFunModelVo(() => { return kuafu.KuaFu3v3Model.frameUpData() }));
        //this.aotuFunItem.push(new AotuFunModelVo(() => { return kuafu.XianFuModel.frameUpData() }));



        this.aotuFunItem.push(new AotuFunModelVo(() => { return boss.BossModel.frameUpData() }));

        this.aotuFunItem.push(new AotuFunModelVo(() => { return JumpModel.frameUpData() }, true));
        this.aotuFunItem.push(new AotuFunModelVo(() => { return MainCharControlModel.getInstance().frameUpData() }, true));
        //this.aotuFunItem.push(new AotuFunModelVo(() => { return quest.QuestModel.getInstance().frameUpData() }));
    }
    private aotuFunItem: Array<AotuFunModelVo>
    private lastUpTime:number=0
    public update(t): void {

        if (!SceneManager.getInstance().ready) {
            return;
        }
        if (!GuidData.map) {
            return
        }
        if (GuidData.player.needGuididPop) {
           // return
        }
        if (!tb.SkillData.skillList) {
            tb.SkillData.resetSkillData();
            return 
        }
        MainCharControlModel.getInstance().update(t);
        if (this.isTestAotuFun()) {
            return;
        }
        if (GameInstance.mainChar.isSinging) {
            return;
        }


   

        var $curentAction: string = GameInstance.mainChar.curentAction;
        if (this._aotuBattle && this.nextPlaySkillTm < TimeUtil.getTimer()) {
            MainCharControlModel.getInstance().clikEat()
            if (!GameInstance.attackTarget) {//没有攻击对象.找一个最近的攻击对象
                GameInstance.attackTarget=RelationManager.getInstance().findNearCanAttackScene()
            }
            if (GameInstance.attackTarget && $curentAction == CharAction.WALK) {//如果正在行走，并离攻击对象距离很近时设定为
                if (GameInstance.mainChar.math_distance(GameInstance.attackTarget) < 50) {
                    MainCharControlModel.getInstance().sendStop()
                }
            }
            this.needAttackToSelect();
       
        }
       
    }
    private nextPlaySkillTm:number=0
    private needAttackToSelect(): void  //有攻击对象，将对其进行攻击
    {
        var $curentAction: string = GameInstance.mainChar.curentAction;

        if ($curentAction == CharAction.STANAD || $curentAction == CharAction.ATTACK_010 || $curentAction == CharAction.ATTACK_020) {
            this.nextPlaySkillTm = TimeUtil.getTimer() + 550
            var $selectSkill: tb.SkillDataVo;
            if (!$selectSkill) {
                for (var i: number = 0; i < tb.SkillData.skillList.length; i++) {
                    var $skillBaseDataVo: tb.SkillDataVo = tb.SkillData.skillList[i]
                    var slot: number = $skillBaseDataVo.slot
                    if ($skillBaseDataVo.level) { //特殊处理神兵和怒气插口和位置互换
                        var $saveCdTime: number = tb.SkillData.getCdMeshBySkillId($skillBaseDataVo.id);
                        if (isNaN($saveCdTime)) {
                            $saveCdTime = -1;
                        }
                        if ($saveCdTime < TimeUtil.getTimer()) {
                            $selectSkill = $skillBaseDataVo;
                        }
                    }
                }
            }

            if (!$selectSkill || !this._aotuBattle) {  //如果只是锁定并非自动战斗
                $selectSkill = tb.SkillData.threeSkillList[GameInstance.threeBattarId++ % 3];
            }
            if (!$selectSkill || !$selectSkill.tb_skill_uplevel) {
                console.log("有问题")
            } else {
               // console.log("现在选用的技能====>", $selectSkill.id)

                if ($selectSkill.tb_skill_base.is_remain && $selectSkill.tb_skill_base.can_move==0) {
                 //  this.nextPlaySkillTm = TimeUtil.getTimer() + 10000
                }
                    

            }

            if ($selectSkill.id != 10024) {
              //  return;
            }
            var $canPlay: boolean = FightSkillModel.getInstance().canPlaySkillToAttackTarger($selectSkill.tb_skill_uplevel.distance * 10)
            if ($canPlay) {//在攻击范围内
             //   var $skillPlayFinish: boolean = this.playSkillToAttack($selectSkill);
                FightSkillModel.getInstance().playSkillToAttack($selectSkill,false);
            } else {
                if ($selectSkill.slot == 1) {
                    GameInstance.threeBattarId--//三连击没能发送将退回
                }
           
                if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
                    FightSkillModel.getInstance().moveToAttackTarger(GameInstance.attackTarget, $selectSkill, () => { this.walkPathComplete() });
                }
               
            }
        }
    }
    private walkPathComplete(): void
    {
        this.nextPlaySkillTm = 0
    }

 
    public jumpTo(): void {
        GameInstance.mainChar.jumpEndFun = () => { JumpModel.selfJumpEnd() };
        MainCharControlModel.getInstance().sendStop()
        var $selfPos: Vector3D = GameInstance.mainChar.getCurrentPos()
        var m: Matrix3D = new Matrix3D();
        m.appendRotation(GameInstance.mainChar.pRotationY - 90, Vector3D.Y_AXIS);
        var toPos: Vector3D = m.transformVector(new Vector3D(15 * 10, 0, 0))
        toPos = toPos.add($selfPos);
        var $b: Vector3D = AstarUtil.findNearLinePoint($selfPos, toPos)
        var gridVec2DB: Vector2D = AstarUtil.getGrapIndexByPos($b);
        NetManager.getInstance().protocolos.jump_start(gridVec2DB.x, gridVec2DB.y);
    }
   

}