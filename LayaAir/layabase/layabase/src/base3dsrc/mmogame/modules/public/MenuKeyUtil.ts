
class MenuKeyUtil extends UIConatiner {

    public _bottomRender: UIRenderComponent;
    public _baseRender: UIRenderComponent;
    public _topRender: UIRenderComponent;

    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;


        this._bottomRender = new UIRenderComponent;
        this.addRender(this._bottomRender)
        this._baseRender = new UIRenderComponent;
        this.addRender(this._baseRender)
        this._topRender = new UIRenderComponent;
        this.addRender(this._topRender)


        this._topRender.setInfo("ui/uidata/dropmenu/dropmenu.xml", "ui/uidata/dropmenu/dropmenu.png", () => { this.loadConfigCom() });

    }
    private _backFun: Function
    public initData($x: number, $y: number, $backFun: Function = null): void {
        this._posx = $x
        this._posy = $y
        this._backFun = $backFun
        this.RefreshItems()
    }

    private RefreshItems(): void {
        if (this._complete) {
            this.showItems(this._posx, this._posy);
        }
    }

    private _posx: number;
    private _posy: number;
    private _complete: boolean = false
    private loadConfigCom(): void {
        this._bottomRender.uiAtlas = this._topRender.uiAtlas
        this._baseRender.uiAtlas = this._topRender.uiAtlas

        this.initUI();
        this._complete = true
        this.RefreshItems()
    }

    private one: UICompenent
    private two: UICompenent
    private three: UICompenent
    private four: UICompenent
    private five: UICompenent
    private six: UICompenent
    private seven: UICompenent
    private eight: UICompenent
    private nine: UICompenent
    private delete: UICompenent
    private zero: UICompenent
    private ok: UICompenent
    private keyPanel: UICompenent
    private initUI(): void {
        var renderLevel: UIRenderComponent = this._baseRender
        this.keyPanel = this.addChild(<UICompenent>this._bottomRender.getComponent("keyPanel"));

        this.one = this.addEvntBut("1", renderLevel);
        this.one.data = 1
        this.two = this.addEvntBut("2", renderLevel);
        this.two.data = 2
        this.three = this.addEvntBut("3", renderLevel);
        this.three.data = 3
        this.four = this.addEvntBut("4", renderLevel);
        this.four.data = 4
        this.five = this.addEvntBut("5", renderLevel);
        this.five.data = 5
        this.six = this.addEvntBut("6", renderLevel);
        this.six.data = 6
        this.seven = this.addEvntBut("7", renderLevel);
        this.seven.data = 7
        this.eight = this.addEvntBut("8", renderLevel);
        this.eight.data = 8
        this.nine = this.addEvntBut("9", renderLevel);
        this.nine.data = 9
        this.delete = this.addEvntBut("delete", renderLevel);
        this.delete.data = -1
        this.zero = this.addEvntBut("0", renderLevel);
        this.zero.data = 0
        this.ok = this.addEvntBut("ok", renderLevel);
        this.ok.data = 10


        this.addChild(<UICompenent>this._topRender.getComponent("key_1"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_2"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_3"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_4"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_6"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_5"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_0"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_9"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_8"));
        this.addChild(<UICompenent>this._topRender.getComponent("key_7"));

    }


    private movetip($posx: number, $posy: number): void {
        this.left = $posx / UIData.Scale;
        this.top = $posy / UIData.Scale;
    }

    public butClik(evt: InteractiveEvent): void {

        var $num: number = evt.target.data
        if (this._backFun) {
            this._backFun($num)
        }
    }


    private showItems(x: number, y: number): void {
        this.movetip(x, y);
        Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);

    }

    public close(): void {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }

    }

    public static closeMune(): void {
        if (this.menuKeyUtil) {
            this.menuKeyUtil.close();
        }
    }

    public clickEvt($evt: InteractiveEvent): void {

        var rect: Rectangle = new Rectangle(this.keyPanel.absoluteX, this.keyPanel.absoluteY, this.keyPanel.absoluteWidth, this.keyPanel.absoluteHeight)
        if (rect.isHitByPoint($evt.x, $evt.y)) {

        } else {
            this.close();
        }
    }
    private static menuKeyUtil: MenuKeyUtil
    public static show($backFun: Function = null, $x: number, $y: number): MenuKeyUtil {
        if (!this.menuKeyUtil) {
            this.menuKeyUtil = new MenuKeyUtil();
        }
        this.menuKeyUtil.initData($x, $y, $backFun)
        UIManager.getInstance().addUIContainer(this.menuKeyUtil);
        return this.menuKeyUtil;
    }
}