﻿class QuestMoveVo {
    public pos: Vector2D;
    public data: any;
    public autoplay:boolean = false;
}
class GameInstance {
    

    public static smsgFullizehp: string
    public static gameSyncTime: both_sync_mstime; //场景服时间
    public static gameSyncClientTime: number;//同步客户端场景时间 毫秒
    public static appSynctTime: both_sync_mstime_app; //应用服时间
    public static appSyncClientTime: number;  //同步客户端应用时间 毫秒
    public static serverOpenTime:number;//开服时间

    public static getGameEndMillisecond($endT:number): number   //传入服务器场景结束时间 返回剩余时间  都是毫秒;
    {
        return TimeUtil.getTimer()  + ($endT - GameInstance.gameSyncTime.time_now)*1000
    }
    public static getGameSecond($endT: number): number {  //返回剩余时间秒;都是秒;
        // var $a: number = Math.floor(GameInstance.gameSyncTime.time_now + (TimeUtil.getTimer() - GameInstance.gameSyncClientTime) / 1000);
        var $a: number = this.getServerNow();
        return $endT - $a;
    }
    public static getServerNow():number
    {
        var $t: number = (TimeUtil.getTimer() - GameInstance.appSyncClientTime) / 1000 + GameInstance.appSynctTime.time_now;
        return float2int($t);
    }

    private static _questMoveVo: QuestMoveVo; //任务移动
    public static set questMoveVo(value: QuestMoveVo) {
        if (GuidData.map && GuidData.map.tbMapVo&&GuidData.map.tbMapVo.inst_sub_type == 10 && !value) {
            //剧情副本将保留任务
            return;
        }
        this._questMoveVo = value;
    }
    public static get questMoveVo(): QuestMoveVo {
        return this._questMoveVo
    }
    public static pingpontm: number=9999999
    public static pandaVisibel: boolean = true
    public static canclikFightui:boolean=true
    public static mapName: string;
    public static roleList: Array<SceneChar> = new Array;
    private static loadComplteFun: Function;
    private static loadProgressFun: Function;
    public static mainChar: SceneChar;
    public static skillCdItem: Array<any>;
    public static bagCdItem: any=new Object
    private static _attackTarget: SceneChar;
   // public static fightSkillSelect: tb.SkillDataVo;//按键选中的技能
    public static sid: string
    public static useYaoGan: boolean = false
    private static _threeBattarId: number = 0; //三连击序号 换场景从0开始
    public static sceneResEqu:boolean = false;

    public static set threeBattarId(value: number) {
        this._threeBattarId = value
        ////console.log("this._threeBattarId", this._threeBattarId)
    }
    public static get threeBattarId():number {
        return this._threeBattarId
    }

    public static setAttackTargetByName($name:string):void{
        for (var i: number = 0; i < this.roleList.length; i++) {
            if (this.roleList[i].unit.getName() == $name) {
                this.attackTarget = this.roleList[i];
                break;
            }
        }
    }

    public static init(): void {
        ModuleEventManager.dispatchEvent(new LoginEvent(LoginEvent.LOGIN_CONNET_EVENT));
    }
    public static set attackTarget(value: SceneChar) {
        if (GameInstance._attackTarget) {
            GameInstance._attackTarget.removePart(SceneChar.SEL_PART)
        }
        GameInstance._attackTarget = value;
        if (GameInstance._attackTarget) {
            GameInstance._attackTarget.addPart(SceneChar.SEL_PART, SceneChar.NONE_SLOT, getModelUIUrl("6301"))
        }
     
    }
    public static get attackTarget(): SceneChar {
        return GameInstance._attackTarget;
    }

    public static addSceneChar($char:SceneChar): void {
        this.roleList.push($char);
        SceneManager.getInstance().addMovieDisplay($char);   
        this.roleListOptimization();    
    }

    public static removeSceneChar($char: SceneChar): void {

        this.removeAttackTarget($char);
        var index: number = this.roleList.indexOf($char);
        if (index != -1) {
            this.roleList.splice(index, 1);
        }
        SceneManager.getInstance().removeMovieDisplay($char);
        this.roleListOptimization();
    }
    public static clearRoleList(): void
    {
        while (this.roleList && this.roleList.length) {
            SceneCharManager.getInstance().removeSceneChar(this.roleList.pop());
        }
    }

    public static roleListOptimization():void{
        var num:number = 0;
        for(var i:number=0;i<this.roleList.length;i++){
            if(this.roleList[i].unit && this.roleList[i].unit.isPlayer()){
                num++;
                if(num > 100 && this.roleList[i] != this.mainChar){
                    this.roleList[i].optimization = true;
                }else{
                    this.roleList[i].optimization = false;
                }
            }
        }

        //console.log("当前场景人数：" + this.roleList.length);
    }
    public static removeAttackTarget($char: SceneChar): void
    {
        if (GameInstance.attackTarget == $char) {
          //  //console.log("-------------移除攻击目标------")
            GameInstance.attackTarget = null;
        }
    }
    public static getSceneCharByID($id:number): SceneChar {
        for (var i: number = 0; i < this.roleList.length; i++) {
            if (this.roleList[i].id == $id) {
                return this.roleList[i];
            }
        }
        return null;
    }

    public static initGameConfig(): void {

    }
    public static intLoadScene($url:string): void
    {
        if(SceneManager.getInstance().testUrl($url)){
            GameInstance.sceneResEqu = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT));
        }else{
            GameInstance.sceneResEqu = false;
            UIManager.getInstance().removeAll();
        }
        
        GameInstance.setMapData();
        GameInstance.loadScene($url, this.configFinish);
    }

    //public static test(): void {
    //    var movie: Display2dMovie = new Display2dMovie();
    //    movie.initData(6, 1, 40 / 512, 40 / 128, 12);
    //    movie.setUrl("rolemovie/gjs_00.png");
    //    movie.play(CharAction.ATTACK_01);
    //    SceneManager.getInstance().addDisplay2D(movie);
    //}

    public static loadScene(name:string,completeFun:Function=null,progressFun:Function=null): void {

        GameInstance.mapName = name;
        GameInstance.loadComplteFun = completeFun;
        GameInstance.loadProgressFun = progressFun;

        var loadevt: SceneLoadEvent = new SceneLoadEvent(SceneLoadEvent.SHOW_LOAD_EVENT);
        loadevt.backImgUrl ="ui/load/001.jpg"
        ModuleEventManager.dispatchEvent(loadevt);

        var evt: EngineEvent = new EngineEvent(EngineEvent.CREAT_SCENE_EVENT);
        evt.sceneName = GameInstance.mapName;
        evt.sceneLoadcomplteFun = GameInstance.mainSceneComplete;
        evt.sceneAnylsizFun = GameInstance.mainSceneAnalysisComplete;
        evt.sceneProgressFun = GameInstance.mainSceneProgress;
        ModuleEventManager.dispatchEvent(evt); 
       

    }

    public static setMapData(): void {

      //  Scene_data.focus3D.rotationY = 0;
        Scene_data.focus3D.rotationX = -45;
        Scene_data.cam3D.distance = 281;
        Scene_data.focus3D.x = 0;
        Scene_data.focus3D.z = 0;
        Scene_data.focus3D.y = 0;
        SceneManager.mapQudaTreeDistance = 2000;

    }

    

    private static mainSceneAnalysisComplete(): void {
        if (GameInstance.loadComplteFun){
            GameInstance.loadComplteFun();
        }

        ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.REMOVE_LOAD_EVENT));
        GameInstance.firstEnterScene();
    }

    private static configFinish(): void {

        msgtip.GuideModel.getInstance().stepGuideId = 0//重置步骤
        msgtip.GuideModel.getInstance().lastPage = null//重置步骤
        if (GameData.enterSceneNextOpenEvent) {
            ModuleEventManager.dispatchEvent(GameData.enterSceneNextOpenEvent);
            GameData.enterSceneNextOpenEvent=null
        } else {

            SceneManager.getInstance().render = true;
            if (GuidData.map.showAreaById(AreaType.fightSKill_7)) {
                mainUi.MainUiModel.skillTabIndex = 0
            }
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            

            AotuSkillManager.getInstance().aotuBattle = Boolean(GuidData.map.tbMapVo.aotubattle == 1);
   


            if (AotuSkillManager.getInstance().aotuBattle) {
                MainCharControlModel.getInstance().downMount();
            }

            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.ENTER_SCENE_EVENT));

            if (GuidData.map.is3V3()) {
                ModuleEventManager.dispatchEvent(new kuafu.KuaFu3v3PkEvent(kuafu.KuaFu3v3PkEvent.SHOW_KUAFU_PK_SCENE_EVENT));
            }
        }
        
    }

    public static first:boolean = false;
    public static firstEnterScene():void{
        if(GameInstance.first){
            return;
        }
        GameInstance.first = true;

        if(GuidData.bag){
            GuidData.bag.setBagAlert();
        }
        
        //SoundManager.getInstance().playSound();
        
        GameData.configData.read();
    }

    private static mainSceneComplete(): void {
        var loadevt: SceneLoadEvent = new SceneLoadEvent(SceneLoadEvent.ANALYSIS_LOAD_EVENT);
        ModuleEventManager.dispatchEvent(loadevt);
    }

    private static mainSceneProgress(num: number): void {
        if (GameInstance.loadProgressFun){
            GameInstance.loadProgressFun(num);
        }
        var loadevt: SceneLoadEvent = new SceneLoadEvent(SceneLoadEvent.PROGRESS_LOAD_EVENT);
        loadevt.progress = num;
        ModuleEventManager.dispatchEvent(loadevt);
    }

    public static teleportMap(mapid :number  ,lineNo :number):void{
        var tb_map:tb.TB_map = tb.TB_map.getTB_map(mapid);

        if (tb_map.is_PK) {
            AlertUtil.show(
                ColorType.Brown7a2f21 + "当前前往地图为PVP地图，可能会被家族外的其他玩家攻击，是否继续前往？"
                , "提示", (a: any) => {
                    if (a == 1) {
                        NetManager.getInstance().protocolos.teleport_map(mapid,lineNo);
                    }
                }, 2, ["是", "否"])
        }else{
            NetManager.getInstance().protocolos.teleport_map(mapid,lineNo);
        }
        
    }




} 