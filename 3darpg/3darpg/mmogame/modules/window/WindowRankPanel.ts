class WindowRankPanel extends WindowCentenMin {

    private _baseRender: UIRenderComponent;

    public _baseUiAtlas: UIAtlas;


    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.middle = 0;
        this.center = 0;

        this.setBlackBg();

        this._baseRender = new UIRenderComponent;
        this.addRender(this._baseRender);

    }
    public applyLoad(): void {
        this._baseUiAtlas = new UIAtlas();
        this._baseUiAtlas.setInfo("ui/uidata/window/windowrank.xml", "ui/uidata/window/windowrank.png", () => { this.loadConfigCom() });
    }
    private uiAtlasComplet: boolean = false;

    private labAry: Array<UICompenent>;
    private myInfo: UICompenent;
    private loadConfigCom(): void {
        this._baseRender.uiAtlas = this._baseUiAtlas;

        this.labAry = new Array;
        for (var i: number = 0; i < 3; i++) {
            this.labAry.push(this.addChild(this._baseRender.getComponent("t_lab" + i)));
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas,ui.skinName,this._labName[i],16,TextAlign.CENTER,ColorType.color9a683f)
        }
        this.addUIList(["t_line1", "t_line2", "t_line3", "t_title"], this._baseRender);
        this.myInfo = this.addChild(this._baseRender.getComponent("t_my"));

        this.addLists();
        this.uiAtlasComplet = true;
        this.applyLoadComplete();
    }

    private windowRankSList: WindowRankSList;
    private addLists(): void {
        this.windowRankSList = new WindowRankSList;
        this.windowRankSList.init(this._baseUiAtlas);
    }
    public resize(): void {
        super.resize();

    }
    protected butClik(evt: InteractiveEvent): void {
        if (evt.target == this.c_close) {
            this.hide();
        }
    }
    public hide(): void {
        this.windowRankSList.hide()
        UIManager.getInstance().removeUIContainer(this);
    }
    public show($labAry: Array<string>, $data: Array<WindowRankVo>,myStr:string): void {
        for (var i: number = 0; i < this.labAry.length; i++) {
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.labAry[i].skinName, $labAry[i], 16, TextAlign.CENTER, ColorType.color9a683f)
        }
        UIManager.getInstance().addUIContainer(this);
        this.windowRankSList.show();
        this.windowRankSList.setRankData($data);
        if(myStr != ""){
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas,this.myInfo.skinName,myStr,14,TextAlign.CENTER,ColorType.Brown7a2f21);
            UiDraw.drawTxtLab(this.myInfo,ColorType.Brown7a2f21 + myStr,14,TextAlign.CENTER,0,5);
        }else{
            UiDraw.clearUI(this.myInfo);
        }
    }
}

class WindowRankSList extends SList {

    public constructor() {
        super();
    }
    public init($uiAtlas: UIAtlas): void {
        WindowRankSListRender.baseAtlas = $uiAtlas;
        this.initData();
    }
    private initData(): void {
        var $ary = new Array<SListItemData>();
        var w: number = 400;
        var h: number = 330;
        this.setData($ary, WindowRankSListRender, w, h, 400, 33, 10, 256, 512, 1, 12);
        this.center = 20;
        this.middle = 30;
    }
    public setRankData($data: Array<WindowRankVo>): void {
        var $tbDataArr: Array<SListItemData> = new Array();
        for (var i: number = 0; i < $data.length; i++) {
            var $vo: SListItemData = new SListItemData();
            if ($data[i]) {
                $vo.data = $data[i];
                $vo.id = i;
                $tbDataArr.push($vo);
            }
        }

        this.refreshData($tbDataArr);
    }

    public show(): void {
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
        }
        this.setShowLevel(2);
    }
    public hide(): void {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
        }

    }
}

class WindowRankSListRender extends SListItem {
    public static baseAtlas: UIAtlas;

    private r_name: UICompenent;
    private r_num: UICompenent;
    private r_bg: UICompenent;
    private r_rank: UICompenent;

    public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

        super.create($container, $bgRender, $baseRender, $customizeRenderAry);

        this.r_num = this.creatSUI($baseRender, WindowRankSListRender.baseAtlas, "s_lab2", 261, 6, 100, 20);
        $container.addChild(this.r_num);

        this.r_name = this.creatSUI($baseRender, WindowRankSListRender.baseAtlas, "s_lab1", 112, 6, 130, 20);
        $container.addChild(this.r_name);

        this.r_rank = this.creatSUI($baseRender, WindowRankSListRender.baseAtlas, "s_lab0", 20, 6, 60, 20);
        $container.addChild(this.r_rank);

        this.r_bg = this.creatGrid9SUI($bgRender, WindowRankSListRender.baseAtlas, "s_bg", 0, 0, 356, 33,5,5);
        $container.addChild(this.r_bg);

    }
    private applyRender(): void {
        if (!(this.itdata.id % 2)) {
            UiDraw.uiAtlasDrawImg(this.uiAtlas, this.r_bg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
        }
        var $vo: any = this.itdata.data;
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_name.skinName, ColorType.Brown7a2f21 + $vo.name, 14, TextAlign.CENTER);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_num.skinName, ColorType.Brown7a2f21 + $vo.val, 14, TextAlign.CENTER);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.r_rank.skinName, ColorType.Brown7a2f21 + $vo.rank, 14, TextAlign.CENTER);

    }
    public render($data: SListItemData): void {
        this.itdata = $data;
        console.log("--$data----",$data);
        if (this.itdata && this.itdata.data) {
            this.applyRender();
        } else {
            this.setnull();
        }
    }
    private setnull(): void {
        UiDraw.clearUI(this.r_bg);
        UiDraw.clearUI(this.r_rank);
        UiDraw.clearUI(this.r_name);
        UiDraw.clearUI(this.r_num);
    }

}

class WindowRankVo {
    public rank: string;
    public name: string;
    public val: string;
    public isme: boolean;
}

