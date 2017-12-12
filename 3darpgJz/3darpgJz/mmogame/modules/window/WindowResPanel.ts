class WindowResPanel extends UIPanel {

    private _basebgRender: UIRenderComponent;
    private _bgRender: UIRenderComponent;
    private _baseRender: UIRenderComponent;

    public _baseUiAtlas: UIAtlas;


    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.middle = 0;
        this.center = 0;


        this._basebgRender = new UIRenderComponent;
        this.addRender(this._basebgRender);
        this._bgRender = new UIRenderComponent;
        this.addRender(this._bgRender);
        this._baseRender = new UIRenderComponent;
        this.addRender(this._baseRender);

        this.layer = 310;

    }
    public applyLoad(): void {
        this._baseUiAtlas = new UIAtlas();
        this._baseUiAtlas.setInfo("ui/uidata/window/windowres.xml", "ui/uidata/window/windowres.png", () => { this.loadConfigCom() }, "ui/uidata/window/windowpc.png");
    }

    private c_name: UICompenent
    private c_icon: UICompenent
    private t_slistindex: UICompenent
    private c_basebg: UICompenent
    private c_bg: UICompenent
    private loadConfigCom(): void {
        this._basebgRender.uiAtlas = this._baseUiAtlas;
        this._baseRender.uiAtlas = this._baseUiAtlas;
        this._bgRender.uiAtlas = this._baseUiAtlas;


        this.c_basebg = this.addEvntButUp("c_basebg", this._basebgRender);
        this.c_basebg.addEventListener(InteractiveEvent.Down, () => { }, this);

        this.c_bg = this.addChild(this._bgRender.getComponent("c_bg"));
        this.c_bg.addEventListener(InteractiveEvent.Up, () => { }, this);

        this.t_slistindex = this.addChild(this._baseRender.getComponent("t_slistindex"));
        this.c_name = this.addChild(this._baseRender.getComponent("c_name"));
        this.c_icon = this.addChild(this._baseRender.getComponent("c_icon"));

        this.addLists();
        this.resize();
        this.applyLoadComplete();
    }

    private windowResSList: WindowResSList;
    private addLists(): void {
        this.windowResSList = new WindowResSList;
        this.windowResSList.init(this._baseUiAtlas);
    }
    public resize(): void {
        this.c_basebg.top = 0
        this.c_basebg.left = 0
        this.c_basebg.y = 0;
        this.c_basebg.x = 0;
        this.c_basebg.height = Scene_data.stageHeight / UIData.Scale;
        this.c_basebg.width = Scene_data.stageWidth / UIData.Scale;
        super.resize();
        if (this.windowResSList) {
            this.windowResSList.left = this.t_slistindex.parent.x / UIData.Scale + this.t_slistindex.x
            this.windowResSList.top = this.t_slistindex.parent.y / UIData.Scale + this.t_slistindex.y
        }


    }
    protected butClik(evt: InteractiveEvent): void {
        if (evt.target == this.c_basebg) {
            this.hide();
        }
    }
    public hide(): void {
        this.windowResSList.hide();
        UIManager.getInstance().removeUIContainer(this);
    }
    public show($propid: number): void {
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.c_name.skinName, getResName($propid), 16, TextAlign.CENTER, ColorType.Whiteffeed0);
            IconManager.getInstance().drawItemIcon60(this.c_icon, $propid, 0, false, false);
            this.windowResSList.show($propid);
        }
    }
}

class WindowResSList extends SList {

    public constructor() {
        super();
        // this.left = 315;
        // this.top = 255;
        // this.setShowLevel(8);
        this.layer = 320;
    }
    public init($uiAtlas: UIAtlas): void {
        this.baseAtlas = $uiAtlas;
        this.initData();
    }
    private initData(): void {
        var $ary = new Array<SListItemData>();
        this.setData($ary, WindowResSListRender, 373, 120, 0, 55, 2, 128, 256, 1, 4);
    }
    public setResData($data: number): void {
        var tab: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($data);
        if (tab.output && tab.output.length > 0) {
            var $tbDataArr: Array<SListItemData> = new Array();
            for (var i: number = 0; i < tab.output.length; i++) {
                var outputtab: tb.TB_item_output = tb.TB_item_output.get_TB_item_output(tab.output[i]);
                var $vo: SListItemData = new SListItemData();
                $vo.data = outputtab;
                $vo.id = i;
                $tbDataArr.push($vo);
            }

            this.refreshData($tbDataArr);
        } else {
            console.log($data, "道具表没有配置获取途径      ");
        }
    }

    public show($propid: number): void {
        UIManager.getInstance().addUIContainer(this);
        this.setResData($propid);
    }
    public hide(): void {
        UIManager.getInstance().removeUIContainer(this);
    }
}

class WindowResSListRender extends SListItem {
    public static baseAtlas: UIAtlas;

    private Resbtn: UICompenent;
    private Resbg: UICompenent;
    private Resinfo: UICompenent;

    public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

        super.create($container, $bgRender, $baseRender, $customizeRenderAry);

        this.Resinfo = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Resinfo", 47, 16, 120, 20);
        $container.addChild(this.Resinfo);

        this.Resbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Resbg", 0, 0, 373, 51, 4, 4);
        $container.addChild(this.Resbg);

        this.Resbtn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Resbtn", 275, 8, 82, 36);
        $container.addChild(this.Resbtn);
        this.Resbtn.addEventListener(InteractiveEvent.Up, this.RewardClik, this);

    }
    private applyRender(): void {
        var $vo: tb.TB_item_output = this.itdata.data;
        UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Resbg.skinName, UIData.publicUi, PuiData.RESBG);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this.Resinfo.skinName, ColorType.color903713 + (this.itdata.id + 1) + "." + $vo.name, 16, TextAlign.LEFT);
        UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.Resbtn.skinName, "GoBtn");
    }
    public render($data: SListItemData): void {
        this.itdata = $data;
        console.log("--$data----", $data);
        if (this.itdata && this.itdata.data) {
            this.applyRender();
        } else {
            this.setnull();
        }
    }

    private RewardClik(evt: InteractiveEvent): void {
        if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
            return;
        }

        if (this.itdata && this.itdata.data) {
            ModuleEventManager.dispatchEvent(new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.HIDE_WINDOW_RES_PANEL));
            var $vo: tb.TB_item_output = this.itdata.data;
            var sub: number = $vo.output.shift();
            ModulePageManager.openPanel(sub, $vo.output);
        }
    }

    private setnull(): void {
        UiDraw.clearUI(this.Resbtn);
        UiDraw.clearUI(this.Resbg);
        UiDraw.clearUI(this.Resinfo);
    }

}