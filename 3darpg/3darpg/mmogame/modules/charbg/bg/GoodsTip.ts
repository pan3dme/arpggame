class GoodsTip {

    private static _instance: GoodsTip;
    public static getInstance(): GoodsTip {
        if (!this._instance) {
            this._instance = new GoodsTip();
        }
        return this._instance;
    }

    private atlasAry: Array<UIAtlas>;
    private _equTip: EquTip;
    private _itemTip: ItemTip;
    private _equItemTip: EquItemTip;
    private _skillTip:SkillTip;

    public constructor() {
        //this._uiAtlas = new UIAtlas();
        //this._uiAtlas.setInfo("ui/uidata/charbg/tip.xml", "ui/uidata/charbg/tip.png", () => { this.loadConfigCom() }, "ui/uidata/charbg/tipuse.png");
        this.atlasAry = new Array;
        this.atlasAry.push(new UIAtlas(), new UIAtlas());
        var atlasUtil: TipAtlasUtil = new TipAtlasUtil();
        atlasUtil.setInfo("ui/uidata/charbg/tip.xml", "ui/uidata/charbg/tip.png", () => { this.loadConfigCom() }, null, this.atlasAry);

    }

    public init(): void {

    }

    public loadConfigCom(): void {
        this._equTip = new EquTip();
        this._equTip.setUIAtlas(this.atlasAry[1]);

        this._itemTip = new ItemTip();
        this._itemTip.setUIAtlas(this.atlasAry[0]);

        this._equItemTip = new EquItemTip();
        this._equItemTip.setUIAtlas(this.atlasAry[0]);

        this._skillTip = new SkillTip();
        this._skillTip.setUIAtlas(this.atlasAry[0]);

        this._hasInit = true;
        if (this._data) {
            this.show(this._data, this._btnType);
        }
    }
    private _data: any;
    //private _showType:boolean;
    private _hasInit: boolean = false;
    private _btnType: number = -1;
    /**
    -1纯信息 1装备栏装备 2背包物品 3背包对比装备 4家族仓库中物品 5上交家族装备 6 他人装备 7 技能tip
     */
    public show($data: any, btnType: number = 0): void {
        console.log("当前物品GUID:", $data.guid)
        if (!this._hasInit) {
            this._data = $data;
            this._btnType = btnType;
            return;
        }

        if (btnType == 1 || btnType == 6) {
            this._equTip.show($data, btnType);
            this._equTip.center = -150;
            //this._equTip.setBtnVisible(true);
            var $scenePange: msgtip.MsgTipEvent = new msgtip.MsgTipEvent(msgtip.MsgTipEvent.SHOW_PAGE_POP_VIEW)
            $scenePange.data = SharedDef.MODULE_BAG;
            ModuleEventManager.dispatchEvent($scenePange);
            return;
        } else if (btnType == 2 || btnType == 4) {
            if (this.isEqu($data)) {
                this._equItemTip.show($data, btnType);
                var equData: any = this.getEquPosData($data.entryData.pos);
                if (equData) {
                    this._equTip.show(equData, 3);
                    this._equTip.center = -195;
                    this._equItemTip.center = 175;
                } else {
                    this._equItemTip.center = -115;
                }
            } else {
                this._itemTip.show($data, btnType);
            }
        }else if(btnType == 5){
            this._equItemTip.show($data, btnType);
            this._equItemTip.center = -115;
        }else if(btnType == -1){
            this._itemTip.show($data, btnType);
        }else if(btnType == 7){
            this._skillTip.show($data);
        }



    }

    protected isEqu($data: any): boolean {
        return Number($data.entryData.type_c) == SharedDef.ITEM_TYPE_EQUIP;
    }

    public getEquPosData(pos: number): any {
        return GuidData.bag.getEquByPart(pos);
    }



}

class TipAtlasUtil {
    private _useImgUrl: string;
    public configData: any;
    public layoutData: any;
    public useImg: any;
    private _baseImg: any;
    private _ary: Array<UIAtlas>;
    private _completeFun: Function;

    public setInfo(configUrl: string, imgUrl: string, $fun: Function, useImgUrl: string = null, $ary: Array<UIAtlas>): void {
        this._ary = $ary;
        this._useImgUrl = useImgUrl;
        this._completeFun = $fun;
        LoadManager.getInstance().load(Scene_data.fileRoot + configUrl, LoadManager.XML_TYPE, ($str: any) => {
            var obj: any = JSON.parse($str);
            this.configData = obj.uiArr;
            this.layoutData = obj.panelArr;
            this.loadImgUrl(imgUrl);
        });
    }


    public loadImgUrl(imgUrl: string): void {

        this._baseImg = new Image();
        this._baseImg.onload = () => {
            if (this._useImgUrl) {
                this.loadUseImg();
            } else {
                this.applyEnd();
            }
        }
        this._baseImg.src = Scene_data.fileRoot + imgUrl;
    }

    public loadUseImg(): void {
        this.useImg = new Image();
        this.useImg.onload = () => {
            this.applyEnd();
        }
        this.useImg.src = Scene_data.fileRoot + this._useImgUrl;
    }

    public applyEnd(): void {
        for (var i: number = 0; i < this._ary.length; i++) {
            var als: UIAtlas = this._ary[i];

            als.textureRes = TextureManager.getInstance().getTextureRes(this._baseImg);
            als.configData = this.configData;
            als.layoutData = this.layoutData;
            als.useImg = this.useImg;

        }
        this._completeFun();
    }

}

