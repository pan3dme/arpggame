class RelationManager {
    private static _instance: RelationManager;
    public static getInstance(): RelationManager {
        if (!this._instance) {
            this._instance = new RelationManager();
        }
        return this._instance;
    }
    public constructor() {
        this.attackItem = new Array;
        this.jumpItem=new Array
    }
    public attackItem: Array<SceneChar>;
    public jumpItem:Array<SceneChar>
    public refresh(): void
    {
        this.attackItem.length = 0;
        this.jumpItem.length = 0;
        this.refreshBaseAttackList();
        if(GameInstance.attackTarget){
            if(this.attackItem.indexOf(GameInstance.attackTarget) == -1){
                GameInstance.attackTarget = null;
            }
        }

    }

    public findNearAttackMonsterTaget(): SceneChar {////最近的可攻击的怪
        var $dis: number;
        var $nearattack: SceneChar
        for (var i: number = 0; i < this.attackItem.length; i++) {
            var $tempChar: SceneChar = this.attackItem[i];
            if (!$tempChar.isDeath && $tempChar.onStage && $tempChar.unit.isMonster() && !$tempChar.unit.isSkillNpc()) {
                var $tempDis: number = GameInstance.mainChar.math_distance($tempChar);
                if (isNaN($dis) || $dis > $tempDis) {
                    $dis = $tempDis;
                    $nearattack = $tempChar;
                }
            }
        }
        return $nearattack
    }
    
    public findNearAttackPlayerTaget(): SceneChar {  //最近的可攻击的人
        var $dis: number;
        var $nearattack: SceneChar
        for (var i: number = 0; i < this.attackItem.length; i++) {
            var $tempChar: SceneChar = this.attackItem[i];
            if (!$tempChar.isDeath && $tempChar.onStage && $tempChar.unit.isPlayer() && !$tempChar.unit.isSkillNpc()) {
                var $tempDis: number = GameInstance.mainChar.math_distance($tempChar);
                if (isNaN($dis) || $dis > $tempDis) {
                    $dis = $tempDis;
                    $nearattack = $tempChar;
                }
            }
        }
        return $nearattack
    }
    public findNearCanAttackScene(): SceneChar {
        if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
            if (!GameInstance.attackTarget.isDeath) {
                return GameInstance.attackTarget
            }
        }
        var $temp: SceneChar = this.findNearAttackMonsterTaget();
        if (!$temp) {//没有怪，就去找人
            $temp = this.findNearAttackPlayerTaget();
        }
       


        return $temp
    }

    private isBuffRoadFind(): boolean
    {
        if (GameInstance.mainChar.unit.isBuffRoad()) {
            var $buffGiver: number = GameInstance.mainChar.unit.buffUnit.getBuffGiverByBuffId(SharedDef.BUFF_ROAR)
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                console.log(GameInstance.roleList[i].unit.guid)
                if (GameInstance.roleList[i].unit.uintGuid == $buffGiver) {
                    GameInstance.attackTarget == GameInstance.roleList[i]
                    console.log("锁定攻击对象", $buffGiver);
                    return true
                }
            }
        }
        return false
    }
    //找到最近可攻击的对象
    public findNearAttackBySkill(): SceneChar
    {
        if (this.isBuffRoadFind()) {
            return;
        }
        if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
            if (!GameInstance.attackTarget.isDeath) {
                return GameInstance.attackTarget;
            }
        }
        var $a: SceneChar = this.findNearAttackMonsterTaget();
        var $b: SceneChar = this.findNearAttackPlayerTaget();
        if ($a && $b) {
            if (GameInstance.mainChar.math_distance($a) < GameInstance.mainChar.math_distance($b)) {
                return $a
            } else {
                return $b
            }
        } else {
            if ($a) {
                return $a
            }
            if ($b) {
                return $b
            }
        }
        return null
    }


    //添加基础攻击列表
    private refreshBaseAttackList(): void
    {
        if (!GameInstance.mainChar) {
            return;
        }
        var $selfFaction: string = GameInstance.mainChar.unit.getUnitStringFieldFactionGuid();
        var $selfGroup: string = GameInstance.mainChar.unit.getUnitStringFieldGroupPeaceId();
        var $fieldNotoriety: number = GuidData.player.getUnitFieldNotoriety(); //战斗模式

        var mainCharGuid:string = GameInstance.mainChar.unit.getGuid();
        for (var i: number = 0; GameInstance.roleList && i < GameInstance.roleList.length; i++) {
            var $tempChar: SceneChar = <SceneChar>GameInstance.roleList[i];
            if (!$tempChar.unit.isMain) { //不是自己
                if ($tempChar instanceof ScenePortal) {
                    if ((<ScenePortal>$tempChar).tb.judge == 4) {
                        this.jumpItem.push($tempChar);
                        $tempChar.showName("[ff00ff]");
                    }
                }else if ($tempChar.unit.isMonster()) { //怪物自己动添加
                    if($tempChar.unit.getOwner() != mainCharGuid){//自己的宠物或者物品
                        this.attackItem.push($tempChar);                       
                    }
                } else {
                    if ($tempChar.unit.isPlayer()) {
                        switch ($fieldNotoriety) {
                            case SharedDef.FAMILY_MODE: // 家族模式
                                if (!$selfFaction || $selfFaction != $tempChar.unit.getUnitStringFieldFactionGuid()) {
                                    this.attackItem.push($tempChar);
                                } 
                                break;
                            case SharedDef.GROUP_MODE: // 组队
                                if ($selfGroup != $tempChar.unit.getUnitStringFieldGroupPeaceId()) {
                                    this.attackItem.push($tempChar);
                                    $tempChar.showBlood(2);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }
            } 
        }
        if (GuidData.map && (GuidData.map.isXianfu() || GuidData.map.is3V3())) {  //仙府守宝3v3
            if (GuidData.map.is3V3()) {
                GameInstance.mainChar.showName("[00ff00]");
                GameInstance.mainChar.showBlood(2);
            } else {
                GameInstance.mainChar.showBlood(1)
            }
        }

    }
    //对象是否在攻击队列里
    public inAttackItemByChar($tempChar: SceneChar): boolean
    {
        for (var i: number = 0; i < this.attackItem.length; i++) {
            if (this.attackItem[i] == $tempChar) {
               return true
            }
        }
        return false

    }
    
    //判断在3V3里是否为对方组
    private In3V3isAttack($tempChar:SceneChar): boolean
    {
        var $item: Array<Kuafu3V3dataVo> = GuidData.map.getKuafu3V3DataItem();

        var $selfGrop: number;
        for (var i: number = 0; i < $item.length; i++) {
            if ($item[i].name == GuidData.player.getName()) {
                $selfGrop = $item[i].group;
            }
        }
        for (var j: number = 0; j < $item.length; j++) {
            if ($tempChar.unit.getName() == $item[j].name && $selfGrop != $item[j].group) {
                return true
            }
        }
        return false
    }




} 