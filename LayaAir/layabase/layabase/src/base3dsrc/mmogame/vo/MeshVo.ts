class BaoshiMeshVo {
    public name: string
    public url:string
}
class EquMeshVo
{

    public name: string;
    public color: number;
    public num: number;
    public info: string;
    public money: number;
    public url: string;
    public Physical_attack: number
    public Max_life: number
    public Magic_attack: number

    public zl: number
    public zbpj: number
    public qhdj: number
    public jcgj: number
    public qhgj: number

    public txt0: string
    public txt1: string
    public txt2: string
    public txt3: string

    public txt4: string
    public txt5: string
    public txt6: string
    public txt7: string

    public bigIconUrl:string

    public baoshiList: Array<BaoshiMeshVo>
    



    private static nameArr: Array<string> = ["铁鞭", "石子镖", "流星锤", "金锁甲", "网羽", "绝刃"]
    public constructor() {
        var num: number = float2int(EquMeshVo.nameArr.length * Math.random());
        this.name = EquMeshVo.nameArr[num];


        this.zl = float2int(Math.random() * 99999);
        this.zbpj = float2int(Math.random() * 99);
        this.qhdj = float2int(Math.random() * 99);
        this.jcgj = float2int(Math.random() * 99999);
        this.qhgj = float2int(Math.random() * 99999);

        this.txt0 = String(float2int(Math.random() * 100));
        this.txt1 = String(float2int(Math.random() * 100)) + "/" + String(float2int(Math.random() * 100));
        this.txt2 = String(float2int(Math.random() * 999));
        this.txt3 = String(float2int(Math.random() * 999));

        this.txt4 = String(float2int(Math.random() * 100));
        this.txt5 = String(float2int(Math.random() * 100)) + "/" + String(float2int(Math.random() * 100));
        this.txt6 = String(float2int(Math.random() * 999));
        this.txt7 = String(float2int(Math.random() * 999));


        this.bigIconUrl = "ui/eqicon/qi00"+float2int(Math.random()*4)+".png"


    
    }

}
class ChengjiuMeshVo {
    public title: string
    public info: string
    public jiangli_money: number
    public jiangli_diamond: number
    public finish: boolean
    public url:string
}
class RoleMeshVo
{
    public name: string;
    public url: string;
    public select: boolean
    public eqList: Array<EquMeshVo>

}
