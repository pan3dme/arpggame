class WarningEffectChar extends SceneChar {

    public constructor() {
        super();
        this.shadow = false;
    }
    public removeStage(): void {
        super.removeStage();
    }
    public showBlood($colorType: number = 0): void {
    }
   
    private _disappearTm:number
    public updateFrame(t: number): void {
        if (this._disappearTm < TimeUtil.getTimer()) {
            SceneManager.getInstance().removeMovieDisplay(this);
        } else {
            super.updateFrame(t);
        }
    }
    public setSpellName($alarmEffect: number): void {
        this.addPart("abc", "cde", getModelUrl(String($alarmEffect)))
        this.tittleHeight = 20;
        this._disappearTm=TimeUtil.getTimer()+2000
    }
    public addStage(): void {
        super.addStage();
    }

}