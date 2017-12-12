class FightDataVo {
    public target: number;
    public isKilled: boolean;
    public type: number;
    //用于二级重影
    public typeUp: number = -1;
    public txtNum: number;
    public lastHp: number;
    public damagenum: string;
    public isme: boolean;//目标是我
    public casterme:boolean;//释放者是我
}
class AttackEffectsManager {
    public static playLyf($url: string, $taget: SceneChar,$offset:Vector3D=null): void {
        if (!this.lyfItem) {
            this.lyfItem=new Array()
        }
        GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + $url, (groupRes: GroupRes) => {
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];
                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ParticleManager.getInstance().addParticle($particle);
                    $particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
                    this.lyfItem.push({ dis: $particle, tg: $taget,offset:$offset})
                } else {
                    console.log("播放的不是单纯特效");
                }
            }
        })
     
    }
    private static lyfItem: Array<any>;
    public static frameUpData(): void
    {
        if (this.lyfItem) {
            var $campos: Vector3D = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z)
            for (var i: number = 0; i < this.lyfItem.length; i++) {
                var $particle: CombineParticle = <CombineParticle> this.lyfItem[i].dis;
                var $sceneChar: SceneChar = <SceneChar>this.lyfItem[i].tg;
                var $pos: Vector3D = new Vector3D($sceneChar.x, $sceneChar.y + $sceneChar.tittleHeight/3, $sceneChar.z);
                if(this.lyfItem[i].offset){
                    $pos = $pos.add(this.lyfItem[i].offset)
                }
                var $tpos: Vector3D = $campos.subtract($pos)
                $tpos.normalize();
                $tpos.scaleBy(10);
                $pos = $pos.add($tpos);
                $particle.setPos($pos.x, $pos.y, $pos.z);
              
            }
        }
    }
   
    private static onPlayCom(event: BaseEvent): void {
        var $particle: CombineParticle = <CombineParticle>event.target;
        var $indexs:number=-1
        for (var i: number = 0; i < this.lyfItem.length; i++) {
            if (this.lyfItem[i].dis == $particle) {
                $indexs = i;
            }
        }
        if ($indexs != -1) {
            this.lyfItem.splice($indexs, 1);
        }
        $particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
        ParticleManager.getInstance().removeParticle($particle);

    }
}

class FightManager {
    private static _instance: FightManager;
    public static getInstance(): FightManager {
        if (!this._instance) {
            this._instance = new FightManager();
        }
        return this._instance;
    }

    public fightUpdate(bytes: ByteArray): void {
        //console.log("收到战斗消息：+" + bytes.bytesAvailable + "--" + bytes.length, TimeUtil.getTimer());

        var caster: number = bytes.readUnsignedInt();
        var count: number = bytes.readUnsignedByte();
        var sdAry: Array<SkillBeAttackData> = new Array;
        for (var i: number = 0; i < count; i++) {
            var sd: SkillBeAttackData = new SkillBeAttackData();
            sd.target = bytes.readUnsignedInt();
            sd.lastHp = bytes.readUnsignedInt();
            sd.utype = bytes.readUnsignedByte();
            sd.isKilled = bytes.readUnsignedByte();
            sd.damage = bytes.readDouble();

            if (sd.lastHp == 0) {
                sd.isKilled = 1
            }
            sdAry.push(sd);
        }
        var skillid: number = bytes.readUnsignedInt();
        var $tx: number = bytes.readShort();
        var $ty: number = bytes.readShort();
        var $fightDataArr: Array<FightDataVo> = this.getFightDataItem(sdAry, caster);
        //    console.log("收到战斗消息：+", caster);
        //  console.log("skillid",skillid)

        var targetSc: SceneChar;
        if (sdAry.length) {
            targetSc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[0].target);

        }
        if (targetSc && targetSc.unit.isMain) {

            //   console.log("自己的消息")
        } else {
            // console.log("其它的消息")
        }

        this.showSkill(caster, skillid, sdAry, new Vector2D($tx, $ty), targetSc, () => { this.showFightDataByItem($fightDataArr) });
        //console.log("延迟掉血：",bloodTime);
        // TimeUtil.addTimeOut(bloodTime, () => {
        //     this.showFightDataByItem($fightDataArr);
        // });

    }
    private showFightDataByItem($arr: Array<FightDataVo>): void {
        //   console.log("技能回调函数==============>")
        for (var i: number = 0; $arr && i < $arr.length; i++) {
            var $FightDataVo: FightDataVo = $arr[i];
            var bsc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID($FightDataVo.target)
            if (!bsc) {
                return;
            }

            if ($FightDataVo.type == SharedDef.HITINFO_NORMALSWING || $FightDataVo.type == SharedDef.HITINFO_CRITHIT) {

                var $ty: number = GuidData.player.getCharType();
                if ($ty == 1 || $ty == 2) {
                    AttackEffectsManager.playLyf(getModelUrl("beiji_lyf"), bsc)
                } else if ($ty == 3 || $ty == 4) {
                    AttackEffectsManager.playLyf(getModelUrl("beiji_ds_lyf"), bsc)
                } else {
                    AttackEffectsManager.playLyf(getModelUrl("beiji_jk_lyf"), bsc)
                }
          
            }
         

            bsc.setHp($FightDataVo.lastHp);
            if ($FightDataVo.txtNum != 0) {
                //显示飘字时，走的流程
                var $textJumpUiVo: bloodTittle.TextJumpUiVo = new bloodTittle.TextJumpUiVo();
                $textJumpUiVo.str = $FightDataVo.damagenum;
                $textJumpUiVo.type = $FightDataVo.type;
                $textJumpUiVo.starttime = TimeUtil.getTimer();
                $textJumpUiVo.endtime = TimeUtil.getTimer() + 1200;
                var $bscy = bsc.py + Math.min(bsc.tittleHeight - 5, 40);
                $textJumpUiVo.pos = new Vector3D(bsc.px, $bscy, bsc.pz);
                BloodManager.getInstance().setJumpNum($textJumpUiVo);

                if (!$FightDataVo.isKilled ) {
                    bsc.refreshLifeNum();
                }
            
            } else {
                // if ($FightDataVo.type != 4) {
                    //不现实数字时，走的飘字流程
                    var $textJumpUiVo: bloodTittle.TextJumpUiVo = new bloodTittle.TextJumpUiVo();
                    $textJumpUiVo.type = $FightDataVo.type;
                    $textJumpUiVo.starttime = TimeUtil.getTimer();
                    $textJumpUiVo.endtime = TimeUtil.getTimer() + 1200;
                    //飘字初始化位置均为玩家头顶
                    $textJumpUiVo.pos = new Vector3D(bsc.x, bsc.y + bsc.tittleHeight - 5, bsc.z);
                    BloodManager.getInstance().setJumpNum($textJumpUiVo);
                // }
            }

            //目标死亡，播放完飘字后，设置血量。并移除攻击对象
            if ($FightDataVo.isKilled) {
                bsc.setHp(0);
                GameInstance.removeAttackTarget(bsc);
                bsc.refreshUnitFieldByte();
                bsc.play(CharAction.DEATH, 1);
                if($FightDataVo.casterme && !$FightDataVo.isme){
                    this.attackFly(bsc);
                }
            }


        }

    }

    private needdrawNum(sdAry: Array<SkillBeAttackData>, caster: number): boolean {
        var bsc: SceneChar;


        for (var i = 0; i < sdAry.length; i++) {
            bsc = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
            if (bsc && bsc.unit.isMain) {
                return true;
            }
        }

        bsc = SceneCharManager.getInstance().getSceneCharByUID(caster);
        if (bsc && bsc.unit.isMain) {
            return true;
        }
        return false;
    }

    //延时500毫秒设置攻击对象数据。掉血
    private getFightDataItem(sdAry: Array<SkillBeAttackData>, caster: number): Array<FightDataVo> {
        
        var casterChar:SceneChar = SceneCharManager.getInstance().getSceneCharByUID(caster);

        if (this.needdrawNum(sdAry, caster)) {
            //是否为我的战斗飘字
            var $arr: Array<FightDataVo> = new Array
            for (var i: number = 0; i < sdAry.length; i++) {
                if (sdAry[i].target == 0) {
                    continue;
                }
                var bsc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
                if (bsc) {
                    var $FightDataVo: FightDataVo = new FightDataVo();
                    $FightDataVo.target = sdAry[i].target;
                    $FightDataVo.txtNum = 0;
                    $FightDataVo.lastHp = sdAry[i].lastHp;//现在血量 减 原来血量
                    if (sdAry[i].utype != SharedDef.HITINFO_CURE) {
                        $FightDataVo.txtNum = Math.floor(sdAry[i].damage / 100);
                        //  console.log("战斗掉血：" + sdAry[i].damage)
                        $FightDataVo.damagenum = String(Math.abs($FightDataVo.txtNum));
                    } else {
                        var cureNum = Math.floor((Math.abs($FightDataVo.lastHp) - bsc.unit.getHp()) / 100);
                        $FightDataVo.damagenum = String(cureNum);
                        $FightDataVo.txtNum = 100;//这里是为了后面判断的时候使用。不作具体使用
                    }
                                                                                                                                 

                    if (bsc.unit.isMain) {
                        //我自己
                        if (sdAry[i].utype == SharedDef.HITINFO_CRITHIT || sdAry[i].utype == SharedDef.HITINFO_NORMALSWING) {
                            $FightDataVo.type = bloodTittle.TextJumpType.MYNORMALDAMAGE;
                            $FightDataVo.typeUp = bloodTittle.TextJumpType.MYNORMALDAMAGEUP;
                        } else if (sdAry[i].utype == SharedDef.HITINFO_CURE) {
                            //治疗
                            $FightDataVo.typeUp = -1;
                            $FightDataVo.type = bloodTittle.TextJumpType.TREATMENT;
                            if (Number($FightDataVo.damagenum) <= 0) {
                                $FightDataVo.damagenum = "";
                            } else {
                                $FightDataVo.damagenum = "+" + $FightDataVo.damagenum
                            }
                        } else if (sdAry[i].utype == SharedDef.HITINFO_MISS) {
                            //闪避
                            $FightDataVo.typeUp = -1;
                            $FightDataVo.type = bloodTittle.TextJumpType.DODGE;
                        }
                    } else {
                        //其他人
                        if (sdAry[i].utype == SharedDef.HITINFO_MISS) {
                            //闪避
                            $FightDataVo.typeUp = -1;
                            $FightDataVo.type = bloodTittle.TextJumpType.MISS;

                        } else if (sdAry[i].utype == SharedDef.HITINFO_NORMALSWING) {
                            //普通
                            $FightDataVo.type = bloodTittle.TextJumpType.NORMALDAMAGE;
                            $FightDataVo.typeUp = bloodTittle.TextJumpType.NORMALDAMAGEUP;
        
                        } else if (sdAry[i].utype == SharedDef.HITINFO_CRITHIT) {
                            //暴击
                            $FightDataVo.type = bloodTittle.TextJumpType.CRIT;
                            $FightDataVo.typeUp = bloodTittle.TextJumpType.CRITUP;

                          
                        }
                       
                    }
                    $FightDataVo.isme = bsc.unit.isMain;
                    $FightDataVo.casterme = casterChar.unit.isMain;
                    if (sdAry[i].isKilled) {
                        $FightDataVo.isKilled = true
                    }
                    $arr.push($FightDataVo);
                }
            }
            return $arr
        } else {
            //设置血量
            for (var i: number = 0; i < sdAry.length; i++) {
                if (sdAry[i].target == 0) {
                    continue;
                }
                var bsc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
                if (bsc) {
                    if (sdAry[i].isKilled) {
                        bsc.setHp(0);
                    } else {
                        bsc.setHp(sdAry[i].lastHp); //现在血量 减 原来血量
                    }
                    bsc.refreshLifeNum();
                }
            }
            return null;
        }
    }

    public setSelfSkillCd($skillid: number): void {

        var $tb_skill_base: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($skillid)
        if ($tb_skill_base.effect_file && $tb_skill_base.effect) {


            if (!$tb_skill_base.is_remain) {

                var $mainEvent: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH)
                $mainEvent.data = $skillid;
                ModuleEventManager.dispatchEvent($mainEvent);

            }

        }


        // if (tb.SkillData.angerSkillVo) {
        //     if ($skillid == tb.SkillData.angerSkillVo.id) {
        //         var $MsgTipEvent: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_SKILL_TIP_DATA)
        //         $MsgTipEvent.data = tb.SkillData.angerSkillVo.tb_skill_base.icon;
        //         ModuleEventManager.dispatchEvent($MsgTipEvent);
        //     }
        // }


    }

    private showSkill(caster: number, skillid: number, sdAry: Array<SkillBeAttackData>,
        tagetPos: Vector2D, dynamicTarget: Display3D, bloodFun: Function): void {

        if (skillid == 0) {
            // for (var i: number = 0; i < sdAry.length; i++) {
            //     if (sdAry[i].target == 0) {
            //         continue;
            //     }
            //     var bsc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID(sdAry[i].target);
            //     if (!bsc && GameInstance.mainChar) {
            //         if (GameInstance.mainChar.unit.uintGuid == sdAry[i].target) {
            //             bsc = GameInstance.mainChar;
            //         }
            //     }
            //     if (bsc) {
            //         bsc.setHp(sdAry[i].lastHp);
            //         bsc.refreshLifeNum();
            //     }
            // }
            bloodFun();
            return;
        }

        var sc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID(caster);
        if (!sc) {
            console.log("技能释放找不到施法者：" + caster);
            bloodFun();
            return;
        }
        var $skilldata: Play_Skill_Vo = Play_Skill_Vo.get_Play_Skill_Vo(skillid)
        var timeout = $skilldata.tb_skill_base.timeout;
        if (sc.unit.isMain) {
            this.setSelfSkillCd(skillid);
            // console.log(skillid)
            //bloodFun();
            if (timeout > 0) {
                TimeUtil.addTimeOut(timeout, bloodFun);
            } else {
                bloodFun();
            }
            return;
        }
        if ($skilldata.tb_skill_base.specialtype == 1) {//特殊类型判断
            bloodFun();
            return;
        }
        if (sc.isDeath) {
            bloodFun();
            return;
        }
        if ($skilldata.tb_skill_base.is_play_forbid == 0) {
            if ($skilldata.tb_skill_base.effect_file && $skilldata.tb_skill_base.effect) {
                var $skill: Skill = SkillManager.getInstance().getSkill(getSkillUrl($skilldata.tb_skill_base.effect_file), $skilldata.tb_skill_base.effect);
                if ($skill) {
                    $skill.reset();
                    $skill.needSound = sc.unit.isMain;
                    if ($skilldata.tb_skill_base.isOrbit == 1) {
                        this.playDynamicTarget($skill, $skilldata, sc, dynamicTarget, bloodFun);
                    } else {
                        if ($skilldata.tb_skill_base.is_remain == 0) {
                            this.playFixEffect($skill, $skilldata, tagetPos, sc, sdAry);
                        }
                    }
                }
            }
        }
        if (timeout > 0) {
            TimeUtil.addTimeOut(timeout, bloodFun);
        } else {
            bloodFun();
        }

    }

    public playDynamicTarget($skill: Skill, $skilldata: Play_Skill_Vo, sc: SceneChar, dynamicTarget: Display3D, $bloodFun: Function): void {
        $skill.configTrajectory(sc, dynamicTarget, () => { }, 0, $bloodFun);
        this.playBaseSkill($skill, $skilldata, sc);
    }

    public playBaseSkill($skill: Skill, $skilldata: Play_Skill_Vo, sc: SceneChar): void {
        if (sc.isMount) {
            sc.unit.setDownMount(); //修改下坐骑的U数据
            sc.setMount();//刷新
        }

        if ($skilldata.tb_skill_base.group != 0 && sc.unit.isMain) {
            $skilldata.skill = $skill;

        } else {
            sc.playSkill($skill);
        }
        //sc.playSkill($skill);
    }
    public playFixEffect($skill: Skill, $skilldata: Play_Skill_Vo, tagetPos: Vector2D, sc: SceneChar, sdAry: Array<SkillBeAttackData>): void {
        //console.log("$skill$skill$skill$skill", $skill)
        var $hitPosItem: Array<Vector3D>;
        var $tempPos: Vector3D = AstarUtil.getWorldPosByStart2D(tagetPos)
        if ($skilldata.tb_skill_base.target_type == 4) {
            $hitPosItem = new Array()
            $tempPos.y = AstarUtil.getHeightByPos($tempPos);
            $hitPosItem.push($tempPos)
        }
        if (tagetPos.x && tagetPos.y) {
            var $watch3D: Display3D = new Display3D();
            $watch3D.x = $tempPos.x;
            $watch3D.z = $tempPos.z;
            sc.watch($watch3D, true);
        }

        $skill.configFixEffect(sc, null, $hitPosItem);
        if (sdAry && sdAry.length && $skilldata.tb_skill_base.lock_type == 1) {
            //这里还要修改
            var bsc: SceneChar = SceneCharManager.getInstance().getSceneCharByUID(sdAry[0].target)
            sc.watch(bsc);
        }
        this.playBaseSkill($skill, $skilldata, sc);
        //console.log($skill, $skilldata, sc)
    }

    public attackFly(target:SceneChar):void{
        var self:SceneChar = GameInstance.mainChar;
        var a:Vector2D = self.getAstarPos();
        var b:Vector2D = target.getAstarPos();
        var dir:Vector2D = b.sub(a);
        dir.normalize();
        dir.scaleBy(-5);
        b = b.add(dir);
        var targetpos:Vector3D = AstarUtil.getWorldPosByStart2D(b);
        targetpos.y = AstarUtil.getHeightByPos(targetpos);
        var obj:any = target
        var fun = ()=>{target.refreshPos()}
       TweenLite.to(obj,0.3,{px:targetpos.x,py:targetpos.y,pz:targetpos.z,onUpdate:fun});
    }

}

class SkillBeAttackData {
    public target: number;
    public lastHp: number;
    public utype: number;
    public isKilled: number;
    public damage: number;
}