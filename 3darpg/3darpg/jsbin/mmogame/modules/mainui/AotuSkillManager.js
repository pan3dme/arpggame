var FightSkillModel = /** @class */ (function () {
    function FightSkillModel() {
    }
    FightSkillModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new FightSkillModel();
        }
        return this._instance;
    };
    FightSkillModel.prototype.playSkillToAttack = function ($vo, $ui) {
        if (GameInstance.mainChar.isSinging) {
            return;
        }
        if (!$ui || $vo.tb_skill_base.is_play_forbid == 0) {
            this.playSkillEffect($vo.tb_skill_base.id);
        }
        //发送技能消息给服务器
        var attack2D = new Vector2D;
        var $guid = 0;
        if (GameInstance.attackTarget) {
            attack2D = GameInstance.attackTarget.getAstarPos();
            GameInstance.mainChar.watch(GameInstance.attackTarget);
            if ($vo.tb_skill_base.lock_type == 1) {
                $guid = GameInstance.attackTarget.unit.uintGuid;
            }
        }
        else {
            attack2D = this.getMainCharFrontPos($vo);
        }
        //console.log("$vo.slot, attack2D.x, attack2D.y, 0, $guid");
        //console.log($vo.slot, attack2D.x, attack2D.y, 0, $guid, GameInstance.mainChar.unit.getGuid());
        var angly = (-GameInstance.mainChar.rotationY - 270) % 360;
        NetManager.getInstance().protocolos.set_orient(angly);
        NetManager.getInstance().protocolos.spell_start($vo.slot, attack2D.x, attack2D.y, 0, $guid);
    };
    FightSkillModel.prototype.getMainCharFrontPos = function ($vo) {
        var a = AstarUtil.getGrapIndexByPos(GameInstance.mainChar.getCurrentPos());
        var m = new Matrix3D();
        var angly = (-GameInstance.mainChar.rotationY - 270) % 360;
        m.appendRotation(angly, Vector3D.Y_AXIS);
        var $p = new Vector3D(1, 0, 0);
        $p = m.transformVector($p);
        $p.normalize();
        $p.scaleBy($vo.tb_skill_uplevel.distance);
        a.x += $p.x;
        a.y += $p.z;
        a.x = Math.floor(a.x);
        a.y = Math.floor(a.y);
        return a;
    };
    FightSkillModel.prototype.canPlaySkillToAttackTarger = function (range) {
        if (GameInstance.attackTarget && GameInstance.mainChar.math_distance(GameInstance.attackTarget) < range) {
            return true;
        }
        return false;
    };
    //走到新攻击目标附近
    FightSkillModel.prototype.moveToAttackTarger = function ($sceneChar, $selectSkill, $fun) {
        if ($fun === void 0) { $fun = null; }
        var $dis = $selectSkill.tb_skill_uplevel.distance - 2;
        var $to2D = $sceneChar.getAstarPos();
        var $self2D = GameInstance.mainChar.getAstarPos();
        if (!$self2D) {
            return;
        }
        var $nrm = new Vector2D($self2D.x - $to2D.x, $self2D.y - $to2D.y);
        $nrm.normalize();
        $nrm.scaleBy($dis);
        $nrm.x = Math.floor($nrm.x);
        $nrm.y = Math.floor($nrm.y);
        $to2D.x += $nrm.x;
        $to2D.y += $nrm.y;
        var item = AstarUtil.findPath2D($self2D, $to2D);
        if (item && item.length) {
            MainCharControlModel.getInstance().setWalkPathFun(item, $fun);
        }
    };
    FightSkillModel.prototype.playSkillEffect = function (skillid) {
        var $skilldata = Play_Skill_Vo.get_Play_Skill_Vo(skillid);
        if ($skilldata.tb_skill_base.effect_file && $skilldata.tb_skill_base.effect) {
            var $skill = SkillManager.getInstance().getSkill(getSkillUrl($skilldata.tb_skill_base.effect_file), $skilldata.tb_skill_base.effect);
            if ($skill) {
                $skill.reset();
                //$skill.isDeath = false;
                $skill.needSound = true;
                var $hitPosItem = new Array;
                if ($skilldata.tb_skill_base.is_remain == 0) {
                    if ($skilldata.tb_skill_base.isOrbit == 1) {
                        if (GameInstance.attackTarget) {
                            $skill.configTrajectory(GameInstance.mainChar, GameInstance.attackTarget);
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        if (GameInstance.attackTarget && $skilldata.tb_skill_base.target_type == 4) {
                            $hitPosItem.push(GameInstance.attackTarget.getCurrentPos());
                        }
                        $skill.configFixEffect(GameInstance.mainChar, null, $hitPosItem);
                    }
                    GameInstance.mainChar.playSkill($skill);
                    FightManager.getInstance().setSelfSkillCd(skillid);
                }
            }
        }
    };
    return FightSkillModel;
}());
var JumpModel = /** @class */ (function () {
    function JumpModel() {
    }
    JumpModel.jumpTestIn = function () {
        if (this.isTestJumpNow()) {
            return;
        }
        for (var i = 0; i < RelationManager.getInstance().jumpItem.length; i++) {
            var $jumpTemp = RelationManager.getInstance().jumpItem[i];
            if ($jumpTemp.onStage) {
                var $tb_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template($jumpTemp.unit.getEntry());
                var a = GameInstance.mainChar.getAstarPos();
                var b = $jumpTemp.getAstarPos();
                if (a && b && Math.abs(a.x - b.x) < $tb_gameobject_template.trigger_width && Math.abs(a.y - b.y) < $tb_gameobject_template.trigger_height) {
                    var $kkkkk = $jumpTemp.unit.GetUInt32(SharedDef.GO_FIELD_DATA + 1);
                    this.walkPathPos = GameInstance.mainChar.getEndWalkPathPos();
                    GameInstance.mainChar.jumpEndFun = function () { JumpModel.selfJumpEnd(); };
                    MainCharControlModel.getInstance().sendStop();
                    console.log("向服务器发送跳跃信息====>");
                    NetManager.getInstance().protocolos.use_jump_point($kkkkk);
                    this.nextCheckTime = TimeUtil.getTimer() + 1000;
                    break;
                }
            }
        }
    };
    JumpModel.selfJumpEnd = function () {
        this.jumpNow = false;
        if (GameInstance.questMoveVo) {
            quest.QuestModel.getInstance().toplay(GameInstance.questMoveVo.pos);
        }
        else {
            if (this.walkPathPos) {
                quest.QuestModel.getInstance().toplay(AstarUtil.getGrapIndexByPos(this.walkPathPos));
                this.walkPathPos = null;
            }
        }
    };
    JumpModel.isTestJumpNow = function () {
        return this.nextCheckTime > TimeUtil.getTimer();
    };
    JumpModel.frameUpData = function () {
        if (JumpModel.jumpNow) {
            return true;
        }
        else {
            JumpModel.jumpTestIn();
        }
        return false;
    };
    JumpModel.jumpNow = false;
    JumpModel.nextCheckTime = 0;
    return JumpModel;
}());
var AotuFunModelVo = /** @class */ (function () {
    function AotuFunModelVo($fun, $end, $name) {
        if ($end === void 0) { $end = false; }
        if ($name === void 0) { $name = null; }
        this.fun = $fun;
        this.endSkillPlay = $end;
        this.name = $name;
    }
    return AotuFunModelVo;
}());
var AotuSkillManager = /** @class */ (function () {
    function AotuSkillManager() {
        var _this = this;
        this._aotuBattle = false;
        this.lastUpTime = 0;
        this.nextPlaySkillTm = 0;
        this.initAotuFunItem();
        TimeUtil.addFrameTick(function (t) { _this.update(t); });
    }
    AotuSkillManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new AotuSkillManager();
        }
        return this._instance;
    };
    Object.defineProperty(AotuSkillManager.prototype, "aotuWalk", {
        get: function () {
            return this._aotuWalk;
        },
        set: function (value) {
            if (this.aotuWalk == value) {
                return;
            }
            this._aotuWalk = value;
            if (value) {
                this.aotuBattle = false;
            }
            //GameInstance.mainUi.bottomCenterPanel.showWalkTxt();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AotuSkillManager.prototype, "aotuBattle", {
        get: function () {
            return this._aotuBattle;
        },
        set: function (value) {
            //if(1==1){return}
            if (value) {
                this.aotuWalk = false;
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
        },
        enumerable: true,
        configurable: true
    });
    AotuSkillManager.prototype.timeoutAuto = function () {
        var _this = this;
        TimeUtil.addTimeOut(5000, function () {
            if (GuidData.map.tbMapVo.aotubattle) {
                _this.aotuBattle = true;
            }
        });
    };
    AotuSkillManager.prototype.isTestAotuFun = function () {
        var $stopEnd = false;
        for (var i = 0; i < this.aotuFunItem.length; i++) {
            if (this.aotuFunItem[i].endSkillPlay) {
                var $temp = this.aotuFunItem[i].fun();
                if ($temp) {
                    $stopEnd = true;
                }
            }
            else {
                this.aotuFunItem[i].fun();
            }
        }
        return $stopEnd;
    };
    AotuSkillManager.prototype.initAotuFunItem = function () {
        this.aotuFunItem = new Array();
        this.aotuFunItem.push(new AotuFunModelVo(function () { return AttackEffectsManager.frameUpData(); }));
        this.aotuFunItem.push(new AotuFunModelVo(function () { return kuafu.KuaFu3v3Model.frameUpData(); }));
        //this.aotuFunItem.push(new AotuFunModelVo(() => { return kuafu.XianFuModel.frameUpData() }));
        this.aotuFunItem.push(new AotuFunModelVo(function () { return boss.BossModel.frameUpData(); }));
        this.aotuFunItem.push(new AotuFunModelVo(function () { return JumpModel.frameUpData(); }, true));
        this.aotuFunItem.push(new AotuFunModelVo(function () { return MainCharControlModel.getInstance().frameUpData(); }, true));
        //this.aotuFunItem.push(new AotuFunModelVo(() => { return quest.QuestModel.getInstance().frameUpData() }));
    };
    AotuSkillManager.prototype.update = function (t) {
        if (!SceneManager.getInstance().ready) {
            return;
        }
        if (!GuidData.map) {
            return;
        }
        if (GuidData.player.needGuididPop) {
            // return
        }
        if (!tb.SkillData.skillList) {
            tb.SkillData.resetSkillData();
            return;
        }
        MainCharControlModel.getInstance().update(t);
        if (this.isTestAotuFun()) {
            return;
        }
        if (GameInstance.mainChar.isSinging) {
            return;
        }
        var $curentAction = GameInstance.mainChar.curentAction;
        if (this._aotuBattle && this.nextPlaySkillTm < TimeUtil.getTimer()) {
            MainCharControlModel.getInstance().clikEat();
            if (!GameInstance.attackTarget) {
                GameInstance.attackTarget = RelationManager.getInstance().findNearCanAttackScene();
            }
            if (GameInstance.attackTarget && $curentAction == CharAction.WALK) {
                if (GameInstance.mainChar.math_distance(GameInstance.attackTarget) < 50) {
                    MainCharControlModel.getInstance().sendStop();
                }
            }
            this.needAttackToSelect();
        }
    };
    AotuSkillManager.prototype.needAttackToSelect = function () {
        var _this = this;
        var $curentAction = GameInstance.mainChar.curentAction;
        if ($curentAction == CharAction.STANAD || $curentAction == CharAction.ATTACK_010 || $curentAction == CharAction.ATTACK_020) {
            this.nextPlaySkillTm = TimeUtil.getTimer() + 550;
            var $selectSkill;
            if (!$selectSkill) {
                for (var i = 0; i < tb.SkillData.skillList.length; i++) {
                    var $skillBaseDataVo = tb.SkillData.skillList[i];
                    var slot = $skillBaseDataVo.slot;
                    if ($skillBaseDataVo.level) {
                        var $saveCdTime = tb.SkillData.getCdMeshBySkillId($skillBaseDataVo.id);
                        if (isNaN($saveCdTime)) {
                            $saveCdTime = -1;
                        }
                        if ($saveCdTime < TimeUtil.getTimer()) {
                            $selectSkill = $skillBaseDataVo;
                        }
                    }
                }
            }
            if (!$selectSkill || !this._aotuBattle) {
                $selectSkill = tb.SkillData.threeSkillList[GameInstance.threeBattarId++ % 3];
            }
            if (!$selectSkill || !$selectSkill.tb_skill_uplevel) {
                console.log("有问题");
            }
            else {
                // console.log("现在选用的技能====>", $selectSkill.id)
                if ($selectSkill.tb_skill_base.is_remain && $selectSkill.tb_skill_base.can_move == 0) {
                    //  this.nextPlaySkillTm = TimeUtil.getTimer() + 10000
                }
            }
            if ($selectSkill.id != 10024) {
                //  return;
            }
            var $canPlay = FightSkillModel.getInstance().canPlaySkillToAttackTarger($selectSkill.tb_skill_uplevel.distance * 10);
            if ($canPlay) {
                //   var $skillPlayFinish: boolean = this.playSkillToAttack($selectSkill);
                FightSkillModel.getInstance().playSkillToAttack($selectSkill, false);
            }
            else {
                if ($selectSkill.slot == 1) {
                    GameInstance.threeBattarId--; //三连击没能发送将退回
                }
                if (GameInstance.attackTarget && GameInstance.attackTarget.onStage) {
                    FightSkillModel.getInstance().moveToAttackTarger(GameInstance.attackTarget, $selectSkill, function () { _this.walkPathComplete(); });
                }
            }
        }
    };
    AotuSkillManager.prototype.walkPathComplete = function () {
        this.nextPlaySkillTm = 0;
    };
    AotuSkillManager.prototype.jumpTo = function () {
        GameInstance.mainChar.jumpEndFun = function () { JumpModel.selfJumpEnd(); };
        MainCharControlModel.getInstance().sendStop();
        var $selfPos = GameInstance.mainChar.getCurrentPos();
        var m = new Matrix3D();
        m.appendRotation(GameInstance.mainChar.pRotationY - 90, Vector3D.Y_AXIS);
        var toPos = m.transformVector(new Vector3D(15 * 10, 0, 0));
        toPos = toPos.add($selfPos);
        var $b = AstarUtil.findNearLinePoint($selfPos, toPos);
        var gridVec2DB = AstarUtil.getGrapIndexByPos($b);
        NetManager.getInstance().protocolos.jump_start(gridVec2DB.x, gridVec2DB.y);
    };
    return AotuSkillManager;
}());
//# sourceMappingURL=AotuSkillManager.js.map