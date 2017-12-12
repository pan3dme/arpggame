class SceneLoot extends SceneChar {
    public lootIndex:number;
    public gridX:number;
    public gridY:number;
    public data:any;
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

    public showName($color: string = null): void {
        
        if (!this._charNameVo) {
            this._charNameVo = BloodManager.getInstance().getCharNameMeshVo($color)
        } else {
            this._charNameVo.name = $color;
        }

        this.refreshPos();
        
    }

    public get px(): number {
        return this._px;
    }

    public set px(val: number) {
        this._px = val;
        this.x = val;
        this.refreshPos();
    }

    public get py(): number {
        return this._py;
    }
    public set py(val: number) {
        this._py = val;
        this.y = val;
        this.refreshPos();
    }

    public get pz(): number {
        return this._pz;
    }
    public set pz(val: number) {
        this._pz = val;
        this.z = val;
        this.refreshPos();
    }



}