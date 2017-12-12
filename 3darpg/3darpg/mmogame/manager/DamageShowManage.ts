//伤害飘字显示类
class DamageShowManage {
    private static _instance: DamageShowManage;
    public static getInstance(): DamageShowManage {
        if (!this._instance) {
            this._instance = new DamageShowManage();
        }
        return this._instance;
    }

    public showHP($sc:SceneChar,hp:number): void {
        console.log($sc.unit.getName() + "掉血:" + hp);
    }
    

}