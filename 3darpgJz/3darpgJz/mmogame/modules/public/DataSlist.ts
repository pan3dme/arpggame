class DataSlist extends SList {
    public constructor() {
        super();
        this.listResoureArr = new Array
        this.backFun = (a: boolean, b: boolean, val: number) => { this.moveEndFun(a, b, val) }
        NetManager.getInstance().reg(this);
    }
    protected pageId: number = -1;
    protected contextNum: number;
    protected typeId: number;
    protected listResoureArr: Array<SListItemData>;
    protected pushDataToList($SListItemData: SListItemData): void {
        var $needAdd: boolean = true
        var $index: number
        for (var i: number = 0; i < this.listResoureArr.length; i++) {
            if (this.listResoureArr[i].id == $SListItemData.id) {
                $needAdd = false
                $index = i;
                break;
            }
        }
        //如果数据不存在就添加，存在就替换
        if ($needAdd) {
            this.listResoureArr.push($SListItemData)
            this.pageId = Math.floor($SListItemData.id / this.contextNum) + 1;
            console.log("--同步页数--", this.pageId, $SListItemData.id, this.contextNum);
        } else {
            this.listResoureArr.splice($index, 1, $SListItemData);
        }
       
    }

    private _requestTimes: boolean = true;
    private moveEndFun(a: boolean, b: boolean, val: number): void {
        if (this._requestTimes) {
            //可见区域第一条数据索引
            var topItemIndex = Math.floor(Math.abs(this.p_scrollY) / this.p_itemHeight);
            //可见区域最后一条数据索引
            var bottomItemIndex = Math.floor((Math.abs(this.p_scrollY) + this._height) / this.p_itemHeight);

            if (val > 0) {
                if (topItemIndex == (this.pageId - 1) * this.contextNum) {
                    console.log("--上一页--");
                    this._requestTimes = false
                    if (this.pageId == 1) {
                        this.sendPageByNum(this.pageId,this.typeId);
                    } else {
                        this.sendPageByNum(this.pageId - 1,this.typeId);
                    }
                }
            }

            if (val < 0) {
                if (bottomItemIndex == (this.pageId * this.contextNum - 1)) {
                    console.log("--下一页--");
                    this._requestTimes = false
                    this.sendPageByNum(this.pageId + 1,this.typeId);
                }else if(!b){
                    console.log("--当前页--");
                    this._requestTimes = false
                    this.sendPageByNum(this.pageId,this.typeId);
                }
            }

        }

        if (!this._requestTimes) {
            TimeUtil.addTimeOut(3000, () => {
                this._requestTimes = true;
            });
        }
    }

    protected sendPageByNum(value: number,$type:number = 0): void {
        this.pageId = value;
        this.typeId = $type;
        this.toSeversUrl();
    }
    protected getSeverFunData(byte: ByteArray): void {
        var $frist: boolean = this.listResoureArr.length == 0
        console.log("---555--",this.listResoureArr);
        this.meshSeverData(byte)
        if ($frist) {
            this.refreshData(this.listResoureArr);
        } else {
            this.changeMinScrollY();
        }
    }
    public changeMinScrollY(): void {
        this.listResoureArr.sort(
            function (a: SListItemData, b: SListItemData): number {
                return a.id - b.id;
            }
        )
        super.changeMinScrollY();
    }
    protected getHanderMap(): Object {
        return null
    }
    protected toSeversUrl(): void {

    }
    protected meshSeverData(byte: ByteArray): void {
    
    }

    public clearAryData(): void {
        while (this.listResoureArr.length > 0) {
            this.listResoureArr.pop();
        }
    }
}