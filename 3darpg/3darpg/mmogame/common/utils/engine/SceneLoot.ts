class SceneLoot extends SceneChar {
    public lootIndex:number;
    public gridX:number;
    public gridY:number;
    public constructor() {
        super();
        this.shadow = true;
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

    public get loot():Loot{
        return <Loot>(this.unit);
    }

    public getOwnderGuid():string{
        return this.loot.getOwnerGuid(this.lootIndex);
    }



}