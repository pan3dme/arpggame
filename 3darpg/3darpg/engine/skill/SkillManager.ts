class SkillManager extends ResGC {
    //private _dic: Object;
    private _skillDic: Object;
    private _loadDic: Object;
    private _preLoadDic: Object;
    private _skillAry: Array<Skill>;
    private _time:number = 0;

    private static _instance: SkillManager;
    constructor() {
        //this._dic = new Object();
        super();
        this._skillDic = new Object;
        this._loadDic = new Object;
        this._skillAry = new Array;
        this._preLoadDic = new Object;

    }
    public static getInstance(): SkillManager {
        if (!this._instance) {
            this._instance = new SkillManager();
        }
        return this._instance;
    }

    public update(): void {
        var _tempTime: number = TimeUtil.getTimer();
        var t: number = _tempTime - this._time;
        for (var i: number = 0; i < this._skillAry.length; i++) {
            this._skillAry[i].update(t);
        }
        this._time = _tempTime;
    }

    public preLoadSkill($url: string): void{
        
        if (this._dic[$url] || this._preLoadDic[$url]){
            return;
        }
        
        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {

            var skillData: SkillData = new SkillData();
            skillData.data = $skillRes.data;
            //skillData.useNum++;
            this._dic[$url] = skillData;

        });

        this._preLoadDic[$url] = true;
    }

    //private _itemLoadDic: Object;
    //加载完整的一组技能
    // public getSkillToItem($url: string, $item: Array<Skill>)
    // {
    //     if (!(this._itemLoadDic)) {
    //         this._itemLoadDic=new Object()
    //     }
    //     if (this._dic[$url]) {
    //         this.readKey($url, $item)
    //     } else {
    //         if (this._itemLoadDic[$url]) {
    //             this._itemLoadDic[$url].push($item)
    //             return ;
    //         }
    //         this._itemLoadDic[$url] = new Array;
    //         this._itemLoadDic[$url].push($item)
    //         ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {
    //             var skillData: SkillData = new SkillData();
    //             skillData.data = $skillRes.data;
    //             this._dic[$url] = skillData;
    //             for (var i: number = 0; i < this._itemLoadDic[$url].length; i++) {
    //                 this.readKey($url, this._itemLoadDic[$url][i])
    //             }
    //             this._itemLoadDic[$url].length = 0
    //             this._itemLoadDic[$url] = null;
    //         });
    //     }
    // }
    // private readKey($url: string, $item: Array<Skill>): void {
    //     for (var keystr in this._dic[$url].data) {
    //         var $skill: Skill = this.getSkill($url, keystr)
    //         $skill.useNum = 1;
    //         $item.push($skill);
    //     }
    // }


    public getSkill($url:string,$name:string): Skill {
        var skill: Skill;
        var key: string = $url + $name;

        var ary: Array<Skill> = this._skillDic[key];
        if (ary){
            for (var i: number = 0; i < ary.length; i++){
                skill = ary[i];
                if (skill.isDeath && skill.useNum ==0){
                    skill.reset();
                    skill.isDeath = false;
                    return skill;
                }
            }
        }

        skill = new Skill();
        skill.name = $name;
        skill.isDeath = false;

        if (!this._skillDic[key]) {
            this._skillDic[key] = new Array;
        }
        this._skillDic[key].push(skill);

        if (this._dic[$url]) {
            skill.setData(this._dic[$url].data[skill.name], this._dic[$url]);
            this._dic[$url].useNum++;
            return skill;
        }

        if (this._loadDic[$url]) {
            var obj: any = new Object;
            obj.name = $name;
            obj.skill = skill;
            this._loadDic[$url].push(obj);
            return skill;
        } 

        this._loadDic[$url] = new Array;
        var obj: any = new Object;
        obj.name = $name;
        obj.skill = skill;
        this._loadDic[$url].push(obj);


        ResManager.getInstance().loadSkillRes(Scene_data.fileRoot + $url, ($skillRes: SkillRes) => {

            this.loadSkillCom($url, $skillRes);

        });
        return skill;
    }

    private loadSkillCom($url: string, $skillRes: SkillRes): void {

        var skillData: SkillData = new SkillData();
        skillData.data = $skillRes.data;



        for (var i: number = 0; i < this._loadDic[$url].length; i++) {
            var obj:any = this._loadDic[$url][i];
            
            obj.skill.setData(skillData.data[obj.name], skillData);
            skillData.useNum++;

        }
        this._loadDic[$url].length = 0
        this._loadDic[$url] = null;

        this._dic[$url] = skillData;

    }



    public playSkill($skill: Skill): void {
        this._skillAry.push($skill);
        $skill.play();
    }

    public removeSkill($skill:Skill): void {
        var index: number = this._skillAry.indexOf($skill);
        if (index != -1){
            this._skillAry.splice(index, 1);
        }
    }

    public gc(): void {
        super.gc();

        for (var key in this._skillDic){
            var ary: Array<Skill> = this._skillDic[key];
            for (var i: number = ary.length-1; i >= 0 ; i--){
                if (ary[i].isDeath && ary[i].useNum <= 0){
                    ary[i].idleTime++;
                    if (ary[i].idleTime >= ResCount.GCTime){
                        ary[i].destory();
                        ary.splice(i, 1);
                    }
                }
            }
            if(ary.length == 0){
                console.log("清理 -" + key);
                delete this._skillDic[key];
            }

        }

    }



}



class ShockUtil{

    
    private static _instance: ShockUtil;
    public static getInstance(): ShockUtil {
        if (!this._instance) {
            this._instance = new ShockUtil();
        }
        return this._instance;
    }
    public constructor(){
        this.upFun = ($d:number)=>{
            this.update($d);
        }
    }
    private upFun:Function;
    private time:number;
    private amp:number;
    private ctime:number;
    private update($dtime):void{
        this.ctime += $dtime;
        if(this.ctime > this.time){
            TimeUtil.removeFrameTick(this.upFun);
            Scene_data.cam3D.offset.setTo(0,0,0);
            return;
        }
        var ranX:number = (Math.random()-0.5)*this.amp;
        var ranY:number = (Math.random()-0.5)*this.amp
        var ranZ:number = (Math.random()-0.5)*this.amp
        Scene_data.cam3D.offset.setTo(ranX,ranY,ranZ);
    }
    
    public shock(time:number,amp:number):void{
        this.time = time;
        this.ctime = 0;
        this.amp = amp;
        TimeUtil.addFrameTick(this.upFun);
    }
}