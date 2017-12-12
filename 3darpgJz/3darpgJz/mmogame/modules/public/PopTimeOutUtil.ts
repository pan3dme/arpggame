
class PopTimeOutUtil extends UIConatiner {

    /**复活 只能设置5秒以下倒计时*/
    public static FUHUO: number = 2;
    /**战斗开始 */
    public static PLAYGO: number = 1;
    /**匹配成功 */
    public static MATCHINGOK: number = 0;

    public _bottomRender: UIRenderComponent;
    // public _baseRender: UIRenderComponent;
    // public _topRender: UIRenderComponent;

    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.center = 0
        this.middle = 0


        this._bottomRender = new UIRenderComponent;
        this.addRender(this._bottomRender)
        // this._baseRender = new UIRenderComponent;
        // this.addRender(this._baseRender)
        // this._topRender = new UIRenderComponent;
        // this.addRender(this._topRender)

        this._bottomRender.setInfo("ui/uidata/poptimeout/poptimeout.xml", "ui/uidata/poptimeout/poptimeout.png", () => { this.loadConfigCom() });

    }
    private _backFun: Function
    private _type: number
    private _endtime: number
    public initData($backFun: Function = null, $type: number, $time: number): void {
        this._backFun = $backFun
        this._type = $type
        this._endtime = $time + TimeUtil.getTimer();
        this.RefreshItems();
    }

    private RefreshItems(): void {
        if (this._complete) {
            this.showItems();
        }
    }

    private _complete: boolean = false
    private loadConfigCom(): void {
        // this._bottomRender.uiAtlas = this._topRender.uiAtlas
        // this._baseRender.uiAtlas = this._topRender.uiAtlas
        this.initUI();
        this._complete = true
        this.RefreshItems()
    }

    private _a_time: UICompenent
    private _icon: UICompenent
    private bg: UICompenent

    /**
     * 添加时，类型相对应，数字对应枚举
     */
    private initUI(): void {
        var renderLevel: UIRenderComponent = this._bottomRender

        this._icon = this.addChild(<UICompenent>renderLevel.getComponent("type0"));
        this._a_time = this.addChild(<UICompenent>renderLevel.getComponent("a_time"));
        this._tickFun = (t: number) => { this.tickRefreshState(t) };
    }

    private _tickFun: Function;

    private _curtime: number;
    public tickRefreshState(t: number): void {

        var $time: number = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
        if (this._curtime != $time) {
            this._curtime = $time;
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this._a_time.skinName, String($time + 1), this.type2font(), TextAlign.CENTER);
            //console.log("刷新", $time);
            if ($time < 0) {
                //回调
                if (this._backFun) {
                    this._backFun();
                }
                this.close();
            }
        }
        if (!this.hasStage) {
            TimeUtil.removeFrameTick(this._tickFun);
        }
    }


    private showItems(): void {
        LoadManager.getInstance().load(Scene_data.fileRoot + getUItimeOutUrl(String(this._type)),LoadManager.IMG_TYPE,
           
            ($img: any) => {
                var $rec: UIRectangle = this._bottomRender.uiAtlas.getRec(this._icon.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                var posx: number = ($rec.pixelWitdh / 2) - ($img.width / 2);
                var posy: number = $rec.pixelHeight - $img.height;
                ctx.drawImage($img, 0, 0, $img.width, $img.height, posx, posy, $img.width, $img.height);

                this._bottomRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                TimeUtil.addFrameTick(this._tickFun);
            });
    }

    private type2font(): string {
        switch (this._type) {
            case PopTimeOutUtil.MATCHINGOK:
                return ArtFont.num61;
            case PopTimeOutUtil.PLAYGO:
                return ArtFont.num61;
            case PopTimeOutUtil.FUHUO:
                return ArtFont.num101;
            default:
                break;
        }
    }

    public close(): void {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
        }

    }

    private static popTimeOutUtil: PopTimeOutUtil

    /**

     * $type：类型 
     * $time：时间 毫秒
         * $backFun：倒计时结束回调
     */
    public static show($type: number, $time: number = 5000, $backFun: Function = null): PopTimeOutUtil {
        if (!this.popTimeOutUtil) {
            this.popTimeOutUtil = new PopTimeOutUtil();
        }
        if (this.popTimeOutUtil.hasStage) {
            return;
        }
        this.popTimeOutUtil.initData($backFun, $type, $time)
        UIManager.getInstance().addUIContainer(this.popTimeOutUtil);
        return this.popTimeOutUtil;
    }
}