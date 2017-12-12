class ResCount extends GC {
    private _useNum: number = 0;
    public idleTime: number = 0;
    public static GCTime: number = 2;

    public get useNum(): number {
        return this._useNum;
    }

    public set useNum(n:number) {
        this._useNum = n;
        if (this._useNum == 0){
            this.idleTime = 0;
        }
    }

    public clearUseNum(): void {
        this._useNum--;
        if (this._useNum <= 0){
            this.idleTime = ResCount.GCTime;
        }
    }
} 