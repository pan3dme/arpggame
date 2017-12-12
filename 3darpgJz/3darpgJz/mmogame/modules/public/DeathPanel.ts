
class DeathPanel extends UIConatiner {

    private _baseRender: UIRenderComponent;
    private _bgRender: UIRenderComponent;
    private _bg2Render: UIRenderComponent;

    private uiAtlas: UIAtlas;

    public constructor() {
        super();
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.center = 0;
        this.middle = 0;

        this._bgRender = new UIRenderComponent;
        this.addRender(this._bgRender)

        this._bg2Render = new UIRenderComponent;
        this.addRender(this._bg2Render)

        this._baseRender = new UIRenderComponent;
        this.addRender(this._baseRender)

        this.uiAtlas = new UIAtlas();

        this._baseRender.uiAtlas = this.uiAtlas;
        this._bgRender.uiAtlas = this.uiAtlas;
        this._bg2Render.uiAtlas = this.uiAtlas;

    }

    public applyLoad(): void {
        this.uiAtlas.setInfo("ui/uidata/public/deathnew.xml", "ui/uidata/public/deathnew.png", () => { this.loadConfigCom() });
    }

    private _mainBg: UICompenent;

    private _label1: UICompenent;
    private _val1: UICompenent;
    private _label2: UICompenent;
    private _val2: UICompenent;

    private _mainLabel: UICompenent;

    private _leftBtn: UICompenent;
    private _rightBtn: FrameCompenent;

    private _tickFun: Function;

    private loadConfigCom(): void {
        this._mainBg = this._bgRender.getComponent("t_bg");
        this.addChild(this._mainBg);
        this._mainBg.addEventListener(InteractiveEvent.Up, this.onClick, this);

        this.addUIList(["t_basebg"], this._bg2Render);

        this.addUIList(["t_title"], this._baseRender);

        this._label1 = this._baseRender.getComponent("t_lab1");
        this.addChild(this._label1);
        this._val1 = this._baseRender.getComponent("t_val1");
        this.addChild(this._val1);

        this._label2 = this._baseRender.getComponent("t_lab2");
        this.addChild(this._label2);
        this._val2 = this._baseRender.getComponent("t_val2");
        this.addChild(this._val2);

        this._mainLabel = this._baseRender.getComponent("t_death");
        this.addChild(this._mainLabel);
        LabelTextFont.writeSingleLabel(this.uiAtlas, this._mainLabel.skinName, "您已经死亡！", 16, TextAlign.CENTER, ColorType.Brown7a2f21);


        this._leftBtn = this._baseRender.getComponent("t_btn1");
        this.addChild(this._leftBtn);
        this._leftBtn.addEventListener(InteractiveEvent.Up, this.onClick, this);

        this._rightBtn = <FrameCompenent>this._baseRender.getComponent("t_btn2");
        this.addChild(this._rightBtn);
        this._rightBtn.addEventListener(InteractiveEvent.Up, this.onClick, this);

        this._tickFun = () => { this.tick() };

        LabelTextFont.writeSingleLabel(this.uiAtlas, this._label2.skinName, "自动复活：", 14, TextAlign.LEFT, ColorType.Orange9a683f);

        this.applyLoadComplete();

    }

    private onClick(e: InteractiveEvent): void {
        if (e.target == this._leftBtn) {
            if(this.showType == 1){
                if(this.showVal > 0){
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00+"原地复活时间未到", 99)
                    return;
                }
            }

            costRes([SharedDef.MONEY_TYPE_BIND_GOLD,this.showVal], () => {
                NetManager.getInstance().protocolos.gold_respawn(1)
                TimeUtil.removeTimeTick(this._tickFun);
                UIManager.getInstance().removeUIContainer(this);
            }, () => {
                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99);
            });

            // if(!hasEnoughRes([SharedDef.MONEY_TYPE_BIND_GOLD,this.showVal])){
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00+"元宝不足，无法复活", 99)
            //     return;
            // }
            // NetManager.getInstance().protocolos.gold_respawn(1)
            // TimeUtil.removeTimeTick(this._tickFun);
            // UIManager.getInstance().removeUIContainer(this);
        } else if (e.target == this._rightBtn) {
            NetManager.getInstance().protocolos.xianfu_random_respawn()
            TimeUtil.removeTimeTick(this._tickFun);
            UIManager.getInstance().removeUIContainer(this);
        }
    }

    public resize(): void {
        if (this._mainBg) {
            this._mainBg.top = 0;
            this._mainBg.left = 0;
            this._mainBg.width = Scene_data.stageWidth / UIData.Scale
            this._mainBg.height = Scene_data.stageHeight / UIData.Scale
        }
        super.resize();
    }
    private _timeNum: number;
    private _leftFun: Function;
    private _rightFun: Function;
    // public setData($str1: string, $str2: string, $str3: string, $cost: number, $time: number, $type: number, $leftFun: Function, $rightFun: Function): void {
    //     LabelTextFont.writeSingleLabel(this.uiAtlas, this._label1.skinName, $str1, 18, TextAlign.CENTER);

    //     if (!$str2 || $str2 == "") {
    //         LabelTextFont.clearLabel(this.uiAtlas, this._label2.skinName);
    //     } else {
    //         LabelTextFont.writeSingleLabel(this.uiAtlas, this._label2.skinName, $str2, 18, TextAlign.CENTER);
    //     }


    //     if ($type == 0) {
    //         this._rightBtn.goToAndStop(0);
    //     } else if ($type == 1) {
    //         this._rightBtn.goToAndStop(1);
    //     }

    //     this._leftFun = $leftFun;
    //     this._rightFun = $rightFun;
    //     this._timeNum = $time;
    //     TimeUtil.addTimeTick(1000, this._tickFun);
    // }

    private showType: number = 0;
    private showVal: number = 0;

    public setData($type: number, $val: number, $autotime: number): void {
        this.showType = $type;
        this.showVal = $val;
        this._timeNum = $autotime;
        if ($type == 0) {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._label1.skinName, "消耗：", 14, TextAlign.LEFT, ColorType.Orange9a683f);
            // this.drawCost($val);
            UiDraw.drawRewardIconAndtxt(this._val1,[SharedDef.MONEY_TYPE_BIND_GOLD,$val],true,TextAlign.LEFT,20);
        } else {
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._label1.skinName, "等待：", 14, TextAlign.LEFT, ColorType.Orange9a683f);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._val1.skinName, String($val), 16, TextAlign.LEFT, ColorType.colorcd2000,"",12);
        }

        LabelTextFont.writeSingleLabel(this.uiAtlas, this._val2.skinName, this._timeNum + "秒", 14, TextAlign.LEFT, ColorType.Green2ca937);

        TimeUtil.addTimeTick(1000, this._tickFun);
    }

    // private drawCost(val: number): void {
    //     var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this._val1.skinName);
    //     var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

    //     UiDraw.drawCost(ctx, 0, -10, SharedDef.MONEY_TYPE_BIND_GOLD);

    //     LabelTextFont.writeSingleLabelToCtx(ctx, String(val), 16, 35, 3, TextAlign.LEFT, ColorType.colorcd2000);
    //     this.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);

    // }

    private tick(): void {
        this._timeNum--;
        if (this._timeNum <= 0) {
            UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeTimeTick(this._tickFun);
            NetManager.getInstance().protocolos.xianfu_random_respawn();
        }
        if (this.showType == 1) {
            this.showVal--;
            if (this.showVal < 0) {
                this.showVal = 0;
                UIManager.getInstance().removeUIContainer(this);
                TimeUtil.removeTimeTick(this._tickFun);
                NetManager.getInstance().protocolos.gold_respawn(1);
            }
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._val1.skinName, String(this.showVal), 16, TextAlign.LEFT, ColorType.colorcd2000,"",12);
        }

        LabelTextFont.writeSingleLabel(this.uiAtlas, this._val2.skinName, this._timeNum + "秒", 14, TextAlign.LEFT, ColorType.Green2ca937);
    }

    public onRemove(): void {
        TimeUtil.removeTimeTick(this._tickFun);
        super.onRemove();
    }


    public static _instance: DeathPanel;
    /**主提示文字
     * 次提示文字
     * 时间提示文字
     * 花费
     * 时间
     * 类型
     * 左边按钮事件
     * 右边按钮事件
     */
    // public static show($str1: string, $str2: string, $str3: string, $cost: number, $time: number, $type: number, $leftFun: Function, $rightFun: Function): void {
    //     if (!this._instance) {
    //         this._instance = new DeathPanel();
    //     }

    //     this._instance.load(() => {
    //         UIManager.getInstance().addUIContainer(this._instance);
    //         this._instance.setData($str1, $str2, $str3, $cost, $time, $type, $leftFun, $rightFun);
    //     }, false);

    // }

    public static show($type: number, $val: number, $autotime: number): void {
        if (!this._instance) {
            this._instance = new DeathPanel();
        }

        this._instance.load(() => {
            UIManager.getInstance().addUIContainer(this._instance);
            this._instance.setData($type, $val, $autotime);
        }, false);

    }

}