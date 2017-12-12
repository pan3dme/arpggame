
class SceneLoadEvent extends BaseEvent {
    public static SHOW_LOAD_EVENT: string = "show_load_event";
    public static REMOVE_LOAD_EVENT: string = "remove_load_event";
    public static PROGRESS_LOAD_EVENT: string = "progress_load_event";
    public static ANALYSIS_LOAD_EVENT: string = "analysis_load_event";
    public static INFO_EVENT: string = "info_event";
    public static SCENE_TRANSITION_EVENT: string = "scene_transition_event";
    public static SCENE_TRANSITION_HIDE_EVENT: string = "scene_transition_hide_event";
    public progress: number = 0;
    public str: string;     //加载提示文本
    public backImgUrl: string  //加载背景图片
} 
class SceneLoadModule extends Module {
    public getModuleName(): string {
        return "SceneLoadModule";
    }

    protected listProcessors(): Array<Processor> {
        return [new SceneLoadProcessor()];
    }
}  
class SceneLoadProcessor extends BaseProcessor {
    public getName(): string {
        return "SceneLoadProcessor";
    }
    private _baImg: UIBackImg;
    private _tempNum: number = 0;
    private _sceneLoadUI: SceneLoadUI;
    protected receivedModuleEvent($event: BaseEvent): void {
       
        var evt: SceneLoadEvent = <SceneLoadEvent>$event;
        if (evt.type == SceneLoadEvent.SHOW_LOAD_EVENT) {
            this.showLoadPanel(evt);
            this._sceneLoadUI.setTxt("正在加载地图资源...");
        } else if (evt.type == SceneLoadEvent.REMOVE_LOAD_EVENT) {
            this.removeUI();
        } else if (evt.type == SceneLoadEvent.PROGRESS_LOAD_EVENT) {
            this._sceneLoadUI.setProgress(evt.progress);
        } else if (evt.type == SceneLoadEvent.ANALYSIS_LOAD_EVENT){

        } else if (evt.type == SceneLoadEvent.INFO_EVENT) {
            this._sceneLoadUI.setTxt(evt.str);
        }else if(evt.type == SceneLoadEvent.SCENE_TRANSITION_EVENT){
            this.showTransition();
        }else if(evt.type == SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT){
            this.hideTransition();
        }
    }

    private showLoadPanel(evt:SceneLoadEvent): void {
        if (!this._sceneLoadUI){
            this._sceneLoadUI = new SceneLoadUI();
        }
        this._sceneLoadUI.show()
        this._sceneLoadUI.resize();
        this._sceneLoadUI.loadBackImg(evt.backImgUrl)
        UIManager.getInstance().addUIContainer(this._sceneLoadUI);

    }

    public removeUI(): void {
        this._sceneLoadUI.remove()
        UIManager.getInstance().removeUIContainer(this._sceneLoadUI);
        this.initTransition();
    }

    public initTransition():void{
        if(!this.sceneTransitionUI){
            this.sceneTransitionUI = new SceneTransitionUI;
        }
    }

    private sceneTransitionUI:SceneTransitionUI;
    private _target:any;
    private _baseY:number;
    private _showTime:number;
    public showTransition():void{
        
        if(!this.sceneTransitionUI){
            this.sceneTransitionUI = new SceneTransitionUI;
        }    
        //SceneManager.getInstance().ready = false;   
        
        GameInstance.mainChar.toRotationY = 180-Scene_data.cam3D.rotationY;        
        GameInstance.mainChar.refreshPos();
        
        
        var target:any = GameInstance.mainChar;
        var base:number = GameInstance.mainChar.py;

        this._target = target;
        this._baseY = base;
        this._showTime = TimeUtil.getTimer();

        var runfun = ()=>{GameInstance.mainChar.refreshPos()};
        // var hideFun:Function = ()=>{
        //     TweenLite.to(target,0.5,{py:base,onUpdate:runfun,onComplete:()=>{
        //         AttackEffectsManager.playLyf(getModelUrl("ef_xiaosi_lyf"),GameInstance.mainChar,new Vector3D(0,-30,0));
        //         UIManager.getInstance().removeUIContainer(this.sceneTransitionUI);
        //         TimeUtil.addTimeOut(300,()=>{GameInstance.mainChar.visible = true})
        //     }});
        // }

        AttackEffectsManager.playLyf(getModelUrl("ef_xiaosi_lyf"),GameInstance.mainChar,new Vector3D(0,-30,0));
        TimeUtil.addTimeOut(200,()=>{
            TimeUtil.addTimeOut(300,()=>{this.sceneTransitionUI.show()});
            GameInstance.mainChar.visible = false;
            TweenLite.to(target,1,{py:base + 200,onComplete:()=>{
                
            //TimeUtil.addTimeOut(1000,hideFun);
                
            },onUpdate:runfun});
        });

    }

    public hideTransition():void{
        if(!this._target){
            return;
        }
        var deltime:number = 2300 - (TimeUtil.getTimer() - this._showTime);
        if(deltime > 0){
            TimeUtil.addTimeOut(deltime,()=>{this.applyHide()})
        }else{
            this.applyHide();
        }

    }

    public applyHide():void{
        if(this._target != GameInstance.mainChar){
            this._target = GameInstance.mainChar;
            this._baseY = GameInstance.mainChar.py;
            GameInstance.mainChar.py += 200;
            GameInstance.mainChar.visible = false;
        }
        var runfun = ()=>{GameInstance.mainChar.refreshPos()};
        if(this.sceneTransitionUI){
            this.sceneTransitionUI.hide()
        }
        
        TweenLite.to(this._target,0.5,{py:this._baseY,onUpdate:runfun,onComplete:()=>{
            AttackEffectsManager.playLyf(getModelUrl("ef_xiaosi_lyf"),GameInstance.mainChar,new Vector3D(0,-30,0));
            if(this.sceneTransitionUI){
                UIManager.getInstance().removeUIContainer(this.sceneTransitionUI);
            }
            TimeUtil.addTimeOut(300,()=>{
                GameInstance.mainChar.visible = true;
                this._target = null;
                //SceneManager.getInstance().ready = true;
            })
        }});
        
    }

    protected listenModuleEvents(): Array<BaseEvent> {
        return [
            new SceneLoadEvent(SceneLoadEvent.SHOW_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.REMOVE_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.PROGRESS_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.ANALYSIS_LOAD_EVENT),
            new SceneLoadEvent(SceneLoadEvent.INFO_EVENT),
            new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT),
            new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_HIDE_EVENT),
        ];
    }
}  