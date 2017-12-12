class ScenePortal extends SceneChar {
    public tb: tb.TB_gameobject_template
    public constructor() {
        super();
        this.shadow = false;
    }
    public removeStage(): void {
        super.removeStage();
    }
    public showBlood($colorType: number = 0): void {
    }
    public setAvatar(num: number): void {
        this.addPart("abc", "cde", getModelUrl(String(num)))
        this.tittleHeight = 20;
    }
    public addStage(): void {
        super.addStage();
    }

}