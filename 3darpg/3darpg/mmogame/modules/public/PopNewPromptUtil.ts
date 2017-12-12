
class PopNewPromptUtil extends UIConatiner {

    /** 获得新成就 */
    public static NEW_ACHIEVEMENT: number = 0;
    /** 获得新称号 */
    public static NEW_DESIGNATION: number = 1;

    public _bottomRender: UIRenderComponent;
    public _baseRender: UIRenderComponent;
    // public _topRender: UIRenderComponent;

    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.center = 0
        this.middle = 0


        this._bottomRender = new UIRenderComponent;
        this.addRender(this._bottomRender)
        this._baseRender = new UIRenderComponent;
        this.addRender(this._baseRender)
        // this._topRender = new UIRenderComponent;
        // this.addRender(this._topRender)

        this._bottomRender.setInfo("ui/uidata/poptimeout/popnewprompt.xml", "ui/uidata/poptimeout/popnewprompt.png", () => { this.loadConfigCom() });

    }
    private _type: number
    private _endtime: number
    // private _lastvo: any
    public initData($vo: NewPromptVo): void {
        // if (this._lastvo && $vo.data.id == this._lastvo.data.id) {
        //     return;
        // }
        // this._lastvo = $vo;
        if (this._aryItems && this.hasStage) {
            this._aryItems.push($vo);
        } else {
            if (!this._aryItems) {
                this._aryItems = new Array;
            }
            this._aryItems.push($vo);
            UIManager.getInstance().addUIContainer(this);
            this.selectItem();
        }


    }

    private selectItem(): void {
        console.log("_ary------", this._aryItems);
        if (this._aryItems && this._aryItems.length > 0) {
            this._type = this._aryItems[0].type;
            this._endtime = this._aryItems[0].times + TimeUtil.getTimer();
            this.RefreshItems();
        } else {
            this.close();
        }
    }

    private RefreshItems(): void {
        if (this._complete) {
            this.type2draw();
            TimeUtil.addFrameTick(this._tickFun);
        }
    }

    private _complete: boolean = false
    private loadConfigCom(): void {
        // this._bottomRender.uiAtlas = this._topRender.uiAtlas
        this._baseRender.uiAtlas = this._bottomRender.uiAtlas
        this.initUI();
        this._complete = true
        this.RefreshItems();
    }

    private _a_time: UICompenent
    private bg: UICompenent
    private c_info: UICompenent
    private a_1: FrameCompenent
    private _aryachive: Array<UICompenent>
    private _arytitle: Array<UICompenent>
    /**
     * 添加时，类型相对应，数字对应枚举
     */
    private initUI(): void {
        var renderLevel: UIRenderComponent = this._baseRender

        this.addChild(<UICompenent>this._bottomRender.getComponent("bg"));
        this.c_info = this.addChild(renderLevel.getComponent("c_info"));
        renderLevel.applyObjData();

        this._aryachive = new Array
        this._aryachive.push(<UICompenent>renderLevel.getComponent("c_name"));
        this._aryachive.push(<UICompenent>renderLevel.getComponent("c_reward2"));

        this.a_1 = <FrameCompenent>this.addChild(renderLevel.getComponent("a_1"));
        this._arytitle = new Array
        this._arytitle.push(renderLevel.getComponent("c_icon"));
        this._tickFun = (t: number) => { this.tickRefreshState(t) };
    }

    private _tickFun: Function;

    private _curtime: number;
    public tickRefreshState(t: number): void {

        var $time: number = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
        if (this._curtime != $time) {
            this._curtime = $time;
            console.log("刷新", $time);
            if ($time < 0) {
                //回调
                this.nextprompt();
            }
        }
        if (!this.hasStage) {
            TimeUtil.removeFrameTick(this._tickFun);
        }
    }

    private nextprompt(): void {
        this._aryItems.shift();
        // this._aryItems.splice(0, 1);
        this.selectItem();
    }

    private drawicon($ui: UICompenent, $url: string): void {
        LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
            ($img: any) => {
                var $rec: UIRectangle = this._bottomRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                var ratio = Math.min(($rec.pixelWitdh / $img.width), ($rec.pixelHeight / $img.height));
                // var posx: number = ($rec.pixelWitdh / 2) - ($img.width * ratio / 2);
                // var posy: number = ($rec.pixelHeight / 2) - ($img.height * ratio / 2);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, $rec.pixelWitdh - ($img.width * ratio), $rec.pixelHeight - ($img.height * ratio), $img.width * ratio, $img.height * ratio);
                this._bottomRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
    }

    private drawReward($ui: UICompenent, $ary: Array<number>): void {
        IconManager.getInstance().getIcon(GameData.getIconCopyUrl($ary[0]),
            ($img: any) => {
                var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.A_BLACK_F, new Rectangle(0, 0, 64, 64), UIData.publicUi);
                //图标
                ctx.drawImage($img, 0, 0, 60, 60, 2, 2, 60, 60);
                ArtFont.getInstance().writeFontToCtxRight(ctx, String($ary[1]), ArtFont.num1, 64, 45);

                this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
    }

    private showachievement(): void {
        var $vo: AchieveItemData = this._aryItems[0].data

        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryachive[0].skinName, $vo.data.name, 18, TextAlign.CENTER, ColorType.Green56da35);

        var $str: string = "奖励： ";
        if ($vo.data.title && $vo.data.title > 0) {
            //有奖励称号
            var $titletab: tb.TB_title_base = tb.TB_title_base.get_TB_title_baseById($vo.data.title);
            if ($vo.data.reward.length > 0) {
                $str += getResName($vo.data.reward[0][0]) + " x" + $vo.data.reward[0][1] + "   ";
                // UiDraw.drawRewardIconAndtxt(this._aryachive[2], $vo.data.reward[0], false, TextAlign.LEFT)
            }
            $str += $titletab.name + " x1"
        } else {
            for (var i = 0; i < $vo.data.reward.length; i++) {
                $str += getResName($vo.data.reward[i][0]) + " x" + $vo.data.reward[i][1] + "   ";
                // UiDraw.drawRewardIconAndtxt(this._aryachive[i + 1], $vo.data.reward[i], false, TextAlign.LEFT)
            }
        }
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryachive[1].skinName, $str, 16, TextAlign.LEFT, ColorType.Whiteffffff);

        LabelTextFont.writeTextAutoCenter(this._baseRender.uiAtlas, this.c_info.skinName, $vo.data.info, 16, ColorType.Whiteffffff, 315, true);
    }


    private showdesignation(): void {
        var $vo: tb.TB_title_base = this._aryItems[0].data
        this.drawicon(this._arytitle[0], "ui/load/tittle/" + $vo.id + ".png");
        LabelTextFont.writeTextAutoCenter(this._baseRender.uiAtlas, this.c_info.skinName, $vo.info, 16, ColorType.Whiteffffff, 315, true);
    }

    private type2draw(): void {
        switch (this._type) {
            case PopNewPromptUtil.NEW_ACHIEVEMENT:
                this.setUiListVisibleByItem(this._aryachive, true);
                this.setUiListVisibleByItem(this._arytitle, false);
                this.a_1.goToAndStop(0);
                this.showachievement();
                break;
            case PopNewPromptUtil.NEW_DESIGNATION:
                this.setUiListVisibleByItem(this._arytitle, true);
                this.setUiListVisibleByItem(this._aryachive, false);
                this.a_1.goToAndStop(1);
                this.showdesignation();
                break;
            default:
                break;
        }
    }

    public close(): void {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
        }
    }

    private static popNewPromptUtil: PopNewPromptUtil

    /**

     * $type：类型 
     * $data 数据对象
         * $backFun：倒计时结束回调
     */
    private _aryItems: Array<NewPromptVo>
    public static show($type: number, $data: any): PopNewPromptUtil {
        console.log("---shuju-----", $data, $type);
        var newpromotvo = new NewPromptVo();
        newpromotvo.data = $data;
        newpromotvo.type = $type;

        if (!this.popNewPromptUtil) {
            this.popNewPromptUtil = new PopNewPromptUtil();
        }
        // if (this.popNewPromptUtil.hasStage) {
        //     return;
        // }
        this.popNewPromptUtil.initData(newpromotvo)
        return this.popNewPromptUtil;
    }
}

class NewPromptVo {
    public data: any;
    public type: number
    public id: number = 1;
    public times: number = 3000;
}