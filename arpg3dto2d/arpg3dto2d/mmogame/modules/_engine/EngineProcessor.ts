class EngineProcessor extends BaseProcessor {

    public getName(): string {
        return "EngineProcessor";
    }
    private role: SceneChar
    protected receivedModuleEvent($event: BaseEvent): void {
        var engEvt: EngineEvent = <EngineEvent>$event;
        if (engEvt.type == EngineEvent.CREAT_SCENE_EVENT) {
            GameInstance.threeBattarId = 0;
            var sName: string = engEvt.sceneName;
            SceneManager.getInstance().loadScene(sName,
                engEvt.sceneLoadcomplteFun,
                engEvt.sceneProgressFun,
                engEvt.sceneAnylsizFun
            );
        } else if (engEvt.type == EngineEvent.ENTER_SCENE_EVENT) {
            GameControlManager.getInstance().init();
            this.AnalysisMapData();
            this.enterSceneDothing();
        }
        else if (engEvt.type == EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS) {
            this.mapIntFieldQuestsProcess();
        }
        else if (engEvt.type == EngineEvent.CORE_DATA_CREATED_EVENT) {
            this.addCoreNum();
        }

    }
    private coreDataNum: number = 0;
    private hasCoreDataInit: boolean = false;
    private addCoreNum(): void {
        if (this.hasCoreDataInit) {
            return;
        }
        this.coreDataNum++;
        if (this.coreDataNum >= 9) {
            this.hasCoreDataInit = true;
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT));
        }
    }

    private findNextTaskPos(): void {
        if (Boolean(GuidData.map.tbMapVo.aotubattle == 1)) {
            //自动战斗地图将不找下个任务
            return;
        }


        //console.log("--findNextTaskPos---");
        TimeUtil.addTimeOut(250, () => {
            // if (GameInstance.questMoveVo && GuidData.map.isBaseMap()) {
            if (GameInstance.questMoveVo) {
                // console.log("寻路到下个坐标点", GameInstance.questMoveVo)
                if (GameInstance.questMoveVo.autoplay) {
                    //寻路后回调
                    var item: Array<Vector2D> = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), GameInstance.questMoveVo.pos);
                    if (item && item.length) {
                        MainCharControlModel.getInstance().setWalkPathFun(item, () => {
                            AotuSkillManager.getInstance().aotuBattle=true
                        });
                    }
                    GameInstance.questMoveVo = null;
                } else {
                   
                    quest.QuestModel.getInstance().toplay(GameInstance.questMoveVo.pos)
                }

              
            }
        });
    }
    /**进入场景需要处理的逻辑*/
    private enterSceneDothing(): void {

        if (GuidData.map.isFuBen() || GuidData.map.is1V1() || GuidData.map.is3V3()) {
            if (GameInstance.questMoveVo && GameInstance.questMoveVo.autoplay){ 
                //全民boss自动寻路找boss
            } else {
                GameInstance.questMoveVo = null
            }
        }
        this.findNextTaskPos();

        //console.log("----前置地图----", GuidData.player.getLastMapType());

        if (GuidData.player.getLastMapType() == SharedDef.INSTANCE_SUB_TYPE_PRIVATE_BOSS) {
            ModulePageManager.openPanel(SharedDef.MODULE_BOSS, SharedDef.MODULE_BOSS_PERSON_BOSS);
        } else if (GuidData.player.getLastMapType() == SharedDef.INSTANCE_SUB_TYPE_STAGE) {
            var bbb = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.player.getCurPassId());
            if(bbb){
                if(GuidData.map.tbMapVo.inst_sub_type != SharedDef.INSTANCE_SUB_TYPE_STAGE){
                    //如果我不在当前地图里
                        if(bbb["autoui"] == 1){
                            TimeUtil.addTimeOut(500, () => {
                                ModulePageManager.openPanel(SharedDef.MODULE_CP);
                            })
                        }
                }
            }
        } else if (GuidData.player.getLastMapType() == SharedDef.INSTANCE_SUB_TYPE_RES) {
            TimeUtil.addTimeOut(500, () => {
                ModulePageManager.openNpcPanel(SharedDef.MODULE_INSTANCE, [SharedDef.MODULE_INSTANCE_RES]);
            })
        }
    }


    private mapIntFieldQuestsProcess(): void {
        ////console.log("更新副本进度")
        if (GuidData.map.is3V3()) {

        } else if (GuidData.map.isFuBen()) {  //vip副本
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST));//副本
        }
    }
    private AnalysisMapData(): void {  //显示副本任务

        //if (GuidData.map.isFuBen()) {  //副本
        //    AotuSkillManager.getInstance().aotuBattle = true;
        //}
        //if (GuidData.map.isBaseMap()) {  //基础场景
        //    AotuSkillManager.getInstance().aotuBattle = false;
        //}

        //if (GuidData.map.tbMapVo && GuidData.map.tbMapVo.inst_type == 2) {
        //    AotuSkillManager.getInstance().aotuBattle = true;
        //} else {
        //    AotuSkillManager.getInstance().aotuBattle = false;
        //}
        //AotuSkillManager.getInstance().aotuBattle = false;


        if (GuidData.map.tbMapVo.path.length) {
            var $path: Array<Vector2D> = new Array();
            for (var i: number = 0; i < GuidData.map.tbMapVo.path.length; i++) {
                $path.push(new Vector2D(GuidData.map.tbMapVo.path[i][0], GuidData.map.tbMapVo.path[i][1]));
            }
            AotuSkillManager.getInstance().pathItem = $path;
            //console.log($path)

        } else {
            AotuSkillManager.getInstance().pathItem = null
        }

        quest.QuestModel.getInstance().changeTab();

    }



    private loadSecenCom(): void {
        //console.log("over");
    }

    private loadProgress(num: number): void {
        //console.log("loading " + float2int(num * 100) + "%");
    }

    protected listenModuleEvents(): Array<BaseEvent> {
        return [
            new EngineEvent(EngineEvent.CREAT_SCENE_EVENT),
            new EngineEvent(EngineEvent.CREAT_MAINCHAR_EVENT),
            new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
            new EngineEvent(EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS),
            new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT),
        ];
    }


}