
class PopMenuUtil extends UIConatiner {

    public _bgRender: UIRenderComponent;
    public _topRender: UIRenderComponent;

    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;

        this._bgRender = new UIRenderComponent;
        this.addRender(this._bgRender)
        this._topRender = new UIRenderComponent;
        this.addRender(this._topRender)


        this._topRender.setInfo("ui/uidata/dropmenu/dropmenu.xml", "ui/uidata/dropmenu/dropmenu.png", () => { this.loadConfigCom() });

    }
    private _canclick: boolean = true;
    private _backFun: Function
    public initData($data: SListItemData, $x: number, $y: number, $backFun: Function = null): void {
        if (this._canclick) {
            this._canclick = false;
            UIManager.getInstance().addUIContainer(this);
            this._data = $data;
            this._posx = $x;
            this._posy = $y;
            this._backFun = $backFun
            this.RefreshItems()
        }
    }

    private RefreshItems(): void {
        if (this._complete) {
            this.showItems(this._data, this._posx, this._posy);
        }
    }

    private _posx: number;
    private _posy: number;
    private _complete: boolean = false
    private loadConfigCom(): void {
        this._bgRender.uiAtlas = this._topRender.uiAtlas
        this.initUI();
        this._complete = true
        this.RefreshItems()
    }

    private AList: Array<UICompenent>;
    private Aline: Array<UICompenent>;
    private bg: Grid9Compenent
    private initUI(): void {
        this.AList = new Array<UICompenent>();
        this.Aline = new Array<UICompenent>();
        for (var i = 0; i < 12; i++) {
            var btn = <UICompenent>this._topRender.getComponent("b_" + i);
            btn.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.AList.push(btn);
        }

        for (var j = 0; j < 11; j++) {
            this.Aline.push(<UICompenent>this._topRender.getComponent("line"));
        }

        this.bg = <Grid9Compenent>this.addChild(this._bgRender.getComponent("bg"));
    }

    private _panelheight: number;
    private _panelwidth: number;
    private addtip($data: any): void {

        this.setUiListVisibleByItem(this.AList, false);
        this.setUiListVisibleByItem(this.Aline, false);
        this.bg.height = $data.data.items.length * 38;

        for (var i: number = 0; i < $data.data.items.length; i++) {
            this.addChild(this.AList[$data.data.items[i]]);
            this.AList[$data.data.items[i]].y = 2 + i * 38
        }

        for (var j = 0; j < $data.data.items.length - 1; j++) {
            this.setUiListVisibleByItem([this.Aline[j]], true);
            this.Aline[j].y = (j + 1) * 38
        }

        this._panelheight = this.bg.height;
        this._panelwidth = this.bg.width;

        this._bgRender.applyObjData();
    }

    private movetip($posx: number, $posy: number): void {
        // var x = $posx / UIData.Scale;
        // var y = $posy / UIData.Scale;
        var x = $posx + 25;
        var y = $posy + 25;
        if ((x + this._panelwidth) > UIData.designWidth) {
            x = UIData.designWidth - this._panelwidth;
        }

        if ((y + this._panelheight) > UIData.designHeight) {
            y = UIData.designHeight - this._panelheight;
        }
        this.left = x;
        this.top = y;
    }

    public butClik(evt: InteractiveEvent): void {

        var $str: string = evt.target.name
        if (this._backFun) {
            this._backFun(Number($str.substring(2, $str.length)))
        }
        this.close();
    }

    /**
     * 0查看信息
     * 1邀请入家族
     * 2申请入队
     * 3邀请入队
     * 4赠送物品
     * 5删除好友
     * 6屏蔽消息
     * 7申请好友
     * 8密聊
     * 9职务任命
     * 10踢出家族
     * 11复制
     */
    private _data: SListItemData;
    private showItems($data: SListItemData, x: number, y: number): void {
        this._data = $data;
        this.addtip($data);
        this.movetip(x, y);
        Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);

    }

    public close(): void {
        this._data = null;
        this._backFun = null;
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }
        TimeUtil.addTimeOut(1000, () => {
            this._canclick = true;
        });
    }

    public clickEvt($evt: any): void {
        this.close();
    }
    private static popMenuUtil: PopMenuUtil
    public static show($data: SListItemData, $backFun: Function = null, $x: number = 136, $y: number = 115): PopMenuUtil {
        if (!this.popMenuUtil) {
            this.popMenuUtil = new PopMenuUtil();
        }
        this.popMenuUtil.initData($data, $x, $y, $backFun)
        return this.popMenuUtil;
    }

}