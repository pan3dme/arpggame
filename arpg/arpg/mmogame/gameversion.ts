class GameVersion {
    private static _dic:any = new Object;
    public static init(str: string): void {
        var ary: Array<string> = str.split("\n");
        for (var i: number = 0; i < ary.length; i++) {
            var itemAry: Array<string> = ary[i].split("\t");
            if (itemAry.length == 2) {
                this._dic[itemAry[0]] = itemAry[1];
            }
        }
    }

    public static getVersion(key: string): string {
        return this._dic[key];
    }

}