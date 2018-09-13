class SkillTip extends UIConatiner {

    protected _baseRender: UIRenderComponent;

    protected _bgRender: UIRenderComponent;

    protected _uiAtlas: UIAtlas;

    protected _data: any;



    public constructor() {
        super();
        this.width = 370;
        this.height = 266;
        this.center = -115;
        this.middle = 0;

        this._baseRender = new UIRenderComponent();
        this._bgRender = new UIRenderComponent();

        this.addRender(this._bgRender);
        this.addRender(this._baseRender);

    }


    public setUIAtlas($us: UIAtlas): void {
        this._uiAtlas = $us;
        this._baseRender.uiAtlas = $us;
        this._bgRender.uiAtlas = $us;
        this.initBase();
    }


    public show($data: any): void {
        this.refresh($data);
        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }

    }


    public hide(): void {
        if (this.hasStage) {
            UIManager.getInstance().removeUIContainer(this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Down, this.clickEvt, this);
        }

    }

    public clickEvt($evt: any): void {
        this.hide();
    }

    /**组件列表*************************/
    protected _bg: UICompenent;

    protected _t_icon: UICompenent;
    protected _t_name: UICompenent;





    public refresh($data: any): void {
        this.refreshIcon($data.baseData);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._t_name.skinName,$data.baseData.name, 18, TextAlign.LEFT, ColorType.colorffecc6);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._t_val1.skinName,String($data.lev), 16, TextAlign.LEFT, ColorType.colorffecc6);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._t_val2.skinName,($data.baseData.is_initiative == 1 ? "主动" : "被动"), 16, TextAlign.LEFT,ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._t_val3.skinName,String($data.levData.fight_value), 16, TextAlign.LEFT,ColorType.colorfde87e);

        LabelTextFont.writeSingleLabel(this._uiAtlas,this._t_txt.skinName,tb.SkillDataVo.getSkillDesc($data.baseData.id, $data.lev), 16, TextAlign.LEFT,ColorType.colorfde87e);
    }

    private refreshIcon(objskill:any): void {
        var url: string = getSkillIconUrl(String(objskill.icon))

        IconManager.getInstance().getIcon(url,
            ($img) => {
                var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this._t_icon.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG58, new Rectangle(0, 0, 58, 58), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 50, 50);

                this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
    }

    private _t_val1: UICompenent;
    private _t_val2: UICompenent;
    private _t_val3: UICompenent;

    private _t_txt: UICompenent;

    protected initBase(): void {
        var ui: UICompenent;
        this._bg = this._bgRender.getComponent("s_tip_bg");
        this.addChild(this._bg);

        this.addUIList(["s_end_line1", "s_end_line2"], this._baseRender)

        this._t_icon = this._baseRender.getComponent("s_icon");
        this.addChild(this._t_icon);

        this._t_name = this._baseRender.getComponent("s_title");
        this.addChild(this._t_name);

        ui = this._baseRender.getComponent("s_lab1");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "等级:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);

        ui = this._baseRender.getComponent("s_lab2");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "类型:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);

        ui = this._baseRender.getComponent("s_lab3");
        LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, ui.skinName, "战力:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.addChild(ui);

        this._t_val1 = this.addChild(this._baseRender.getComponent("s_val1"));
        this._t_val2 = this.addChild(this._baseRender.getComponent("s_val2"));
        this._t_val3 = this.addChild(this._baseRender.getComponent("s_val3"));

        this._t_txt = this.addChild(this._baseRender.getComponent("s_txt"));

    }

}
