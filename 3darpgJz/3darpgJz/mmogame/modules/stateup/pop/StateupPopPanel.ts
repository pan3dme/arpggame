class StateupPopPanel extends UIPanel {

    private _basebgRender: UIRenderComponent;
    private _bgRender: UIRenderComponent;
    private _baseRender: UIRenderComponent;
    private _topRender: UIRenderComponent;

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
        this._topRender = new UIRenderComponent;
        this.addRender(this._topRender);

    }
    public applyLoad(): void {
        this._baseUiAtlas = new UIAtlas();
        this._baseUiAtlas.setInfo("ui/uidata/stateup/stateuppop.xml", "ui/uidata/stateup/stateuppop.png", () => { this.loadConfigCom() }, "ui/uidata/stateup/stateuppc.png");
    }

    private c_basebg: UICompenent
    private a_icon: UICompenent
    private a_name: UICompenent
    private a_txt0: UICompenent
    private aryui: Array<UICompenent>
    private loadConfigCom(): void {
        this._basebgRender.uiAtlas = this._baseUiAtlas;
        this._baseRender.uiAtlas = this._baseUiAtlas;
        this._bgRender.uiAtlas = this._baseUiAtlas;
        this._topRender.uiAtlas = this._baseUiAtlas;

        var a_bg0 = this.addChild(this._bgRender.getComponent("a_bg0"));
        var a_bg1 = this.addChild(this._bgRender.getComponent("a_bg1"));
        a_bg1.isU = true;
        a_bg0.addEventListener(InteractiveEvent.Down, () => { }, this);
        a_bg0.addEventListener(InteractiveEvent.Up, () => { }, this);
        a_bg1.addEventListener(InteractiveEvent.Down, () => { }, this);
        a_bg1.addEventListener(InteractiveEvent.Up, () => { }, this);
        
        this._bgRender.applyObjData();

        this.aryui = new Array
        this.aryui.push(this._baseRender.getComponent("a_txtbg1"));
        this.aryui.push(this._topRender.getComponent("a_txt1"));

        this.addUIList(["a_txtbg0", "a_title"], this._baseRender);

        this.a_icon = this.addChild(this._topRender.getComponent("a_icon"));
        this.a_name = this.addChild(this._topRender.getComponent("a_name"));
        this.a_txt0 = this.addChild(this._topRender.getComponent("a_txt0"));

        this.c_basebg = this.addEvntButUp("a_basebg", this._basebgRender);
        this.c_basebg.addEventListener(InteractiveEvent.Down, () => { }, this);

        this.resize();
        this.applyLoadComplete();
    }

    public resize(): void {
        this.c_basebg.top = 0
        this.c_basebg.left = 0
        this.c_basebg.y = 0;
        this.c_basebg.x = 0;
        this.c_basebg.height = Scene_data.stageHeight / UIData.Scale;
        this.c_basebg.width = Scene_data.stageWidth / UIData.Scale;
        super.resize();
    }

    protected butClik(evt: InteractiveEvent): void {
        if (evt.target == this.c_basebg) {
            this.hide();
        }
    }

    public hide(): void {
        UIManager.getInstance().removeUIContainer(this);
    }

    public show(): void {
        UIManager.getInstance().addUIContainer(this);
        this.aaa();
    }

    private aaa() {
        var $obj: any = TableData.getInstance().getData(TableData.tb_realmbreak_base, GuidData.player.getStateLev());
        if ($obj["level"] > GuidData.player.getLevel()) {
            //未达到等级
            var defvalue: number = Number($obj["level"]) - GuidData.player.getLevel()
            this.bbb(defvalue, $obj);
        } else {
            this.bbb(0, $obj);
        }
    }

    private bbb($defval: number, $tab: any) {
        //渲染用
        this.setUiListVisibleByItem(this.aryui, $defval > 0);
        if ($defval > 0) {
            LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.aryui[1].skinName, ColorType.Brown541616 + "再升" + ColorType.Redff0000 + $defval + ColorType.Brown541616 + "级,战力暴涨" + ColorType.Redff0000 + $tab["force"] + "!!!", 16, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.a_txt0.skinName, ColorType.Brown541616 + "境界领先等级！请尽快提升等级", 16, TextAlign.CENTER);
        } else {
            LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.a_txt0.skinName, ColorType.Brown541616 + "成功突破" + $tab["name"] + ",战力暴涨" + $tab["force"] + "!!!", 16, TextAlign.CENTER);
        }
        LabelTextFont.writeSingleLabel(this._basebgRender.uiAtlas, this.a_name.skinName, ColorType.Whiteffeec9 + $tab["name"], 16, TextAlign.CENTER);
        this.drawPic(this.a_icon, $tab["id"]);
    }

    private drawPic($ui: UICompenent, $iconurl: string) {
        IconManager.getInstance().getIcon(getStateUpIconUrl($iconurl), ($img: any) => {
            var rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture($ui.uiRender.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        });
    }
}