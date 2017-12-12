
class AlertUtil extends UIConatiner {

    public static YES: number = 0x0001;
    public static NO: number = 0x0002;




    private _bottomRender: UIRenderComponent
    private _midRender: UIRenderComponent
    private _topRender: UIRenderComponent;
    public handlerFun: Function
    constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.center = 0;
        this.middle = 0;

        this._bottomRender = new UIRenderComponent;
        this.addRender(this._bottomRender)

        this._midRender = new UIRenderComponent;
        this.addRender(this._midRender)

        this._topRender = new UIRenderComponent;
        this.addRender(this._topRender)

        this._topRender.setInfo("ui/uidata/alert/alert.xml", "ui/uidata/alert/alert.png", () => { this.loadConfigCom() });

    }
    private a_confirm: UICompenent;
    private a_cancel: UICompenent;

    private a_context: UICompenent
    private a_basebg: UICompenent
    private btnname0: UICompenent
    private btnname1: UICompenent
    private loadConfigCom(): void {
        this._bottomRender.uiAtlas = this._topRender.uiAtlas
        this._midRender.uiAtlas = this._topRender.uiAtlas


        var a_round0: UICompenent = this.addChild(this._topRender.getComponent("a_round0"));
        a_round0.isU = true
        a_round0.isV = true;
        var a_round1: UICompenent = this.addChild(this._topRender.getComponent("a_round1"));
        a_round1.isV = true;
        var a_round2: UICompenent = this.addChild(this._topRender.getComponent("a_round2"));
        a_round2.isU = true
        var a_round3: UICompenent = this.addChild(this._topRender.getComponent("a_round3"));



        this.a_basebg = this.addEvntButUp("a_basebg", this._bottomRender);
        this.a_basebg.addEventListener(InteractiveEvent.Down, () => { }, this);

        this.addChild(<UICompenent>this._bottomRender.getComponent("a_bg"));

        this.addChild(this._midRender.getComponent("a_tittle_bg"));

        this.a_context = this.addChild(<UICompenent>this._topRender.getComponent("a_context"));
        this.btnname0 = this.addChild(<UICompenent>this._topRender.getComponent("btnname0"));
        this.btnname1 = this.addChild(<UICompenent>this._topRender.getComponent("btnname1"));

        this.a_confirm = this.addEvntButUp("a_confirm", this._midRender);
        this.a_cancel = this.addEvntButUp("a_cancel", this._midRender);


        this.refrish()
    }


    public resize(): void {
        if (this.a_basebg) {
            this.a_basebg.top = 0
            this.a_basebg.left = 0
            this.a_basebg.y = 0;
            this.a_basebg.x = 0;
            this.a_basebg.height = Scene_data.stageHeight / UIData.Scale;
            this.a_basebg.width = Scene_data.stageWidth / UIData.Scale;
        }
        super.resize();
    }

    private hide(): void {
        UIManager.getInstance().removeUIContainer(this);
    }
    protected butClik(evt: InteractiveEvent): void {
        this.hide();
        if (this.handlerFun) {
            switch (evt.target) {
                case this.a_confirm:
                    this.handlerFun(1);
                    break;
                case this.a_cancel:
                    this.handlerFun(0);
                    break;
                default:
                    break;
            }
        }

    }
    private _contentTxt: string;
    private _tittleTxt: string;
    private _flags: number
    private _btnname: Array<string>
    private initData($text: string = "", $title: string = "", $flags: number = 0x4, closeHandler: Function = null, $btnname: Array<string>): void {
        this.handlerFun = closeHandler
        this._contentTxt = $text;
        this._tittleTxt = $title;
        this._flags = $flags
        this._btnname = $btnname

        this.refrish()
    }
    public refrish(): void {
        if (this.a_context) {
            // LabelTextFont.writeTextAutoCenter(this._topRender.uiAtlas, this.a_context.skinName, this._contentTxt, 16, ColorType.Brown6a4936, 300, true);
            LabelTextFont.writeTextAutoCenterByAnchor(this._topRender.uiAtlas, this.a_context.skinName,this._contentTxt, 16, ColorType.Brown6a4936,300);
            if (this._flags == 1) {
                this.a_confirm.x = this.btnname0.x = 427;
            } else {
                this.a_confirm.x = this.btnname0.x = 345;
                this.a_cancel.x = this.btnname1.x = 520;
            }
            this.setUiListVisibleByItem([this.a_cancel,this.btnname1], this._flags != 1)
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.btnname0.skinName, this._btnname[0], 16, TextAlign.CENTER, ColorType.Brown6a4936);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.btnname1.skinName, this._btnname[1], 16, TextAlign.CENTER, ColorType.Brown6a4936);
        }


        this.resize();
    }
    private static alertUtilPan: AlertUtil
    public static show(text: string = "", title: string = "", closeHandler: Function = null, flags: number = 2, $btnname: Array<string> = ["确定", "取消"]): AlertUtil {

        if (!this.alertUtilPan) {
            this.alertUtilPan = new AlertUtil();
        }
        this.alertUtilPan.initData(text, title, flags, closeHandler, $btnname);
        UIManager.getInstance().addUIContainer(this.alertUtilPan);
        return this.alertUtilPan;
    }
}