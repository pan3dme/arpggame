class YaoGanModelPanel extends UIPanel {

    private _bottomRender: UIRenderComponent
    private _midRender: UIRenderComponent

    private static _instance: YaoGanModelPanel;
    public static getInstance(): YaoGanModelPanel {
        if (!this._instance) {
            this._instance = new YaoGanModelPanel();
        }
        return this._instance;
    }
    public initData($bfun: Function = null): void {
        this.yaoganFunction = $bfun
    }
    public addMouseEvent(): void {
        if (Scene_data.isPc) {
            document.addEventListener(MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
            document.addEventListener(MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
            document.addEventListener(MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });

            this.b_yaogan_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);

            this.baseBindPos = new Vector2D(this.b_yaogan_bg.x + this.b_yaogan_bg.width / 2, this.b_yaogan_bg.y + this.b_yaogan_bg.height / 2)

        }

    }
    private baseBindPos: Vector2D
    private setBasePostion(): void {
        this.b_yaogan_bar.x = this.baseBindPos.x - this.b_yaogan_bar.width / 2;
        this.b_yaogan_bar.y = this.baseBindPos.y - this.b_yaogan_bar.height / 2;

        this.b_yaogan_bg.x = this.baseBindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.baseBindPos.y - this.b_yaogan_bg.height / 2;

        var $mainChar: SceneChar = GameInstance.mainChar;
        if ($mainChar && $mainChar._speedDirect) {
            MainCharControlModel.getInstance().sendStop()
        }

    }
    private isMouseDown: boolean = false
    private onMouse($e: MouseEvent): void {
        if ($e.type) {
            if ($e.type == MouseType.MouseDown) {
            } else if ($e.type == MouseType.MouseUp) {
                this.isMouseDown = false
                this.setBasePostion()
            } else if ($e.type == MouseType.MouseMove) {

            }
        }
    }
    private bindPos: Vector2D = new Vector2D()
    private onStageMouseMove(evt: InteractiveEvent): void {
        if (this.isMouseDown) {


            var $mouse: Vector2D = new Vector2D;
            $mouse.x = evt.x / UIData.Scale - this.x / UIData.Scale
            $mouse.y = evt.y / UIData.Scale - this.y / UIData.Scale
            this.changeBingPostion($mouse)


        }
    }
    private changeBingPostion(mousePos: Vector2D): void {
        var dis: number = Vector2D.distance(mousePos, this.bindPos);
        if (dis > 50) {
            var $nrm: Vector2D = new Vector2D(this.bindPos.x - mousePos.x, this.bindPos.y - mousePos.y);
            $nrm.normalize();
            $nrm.scaleBy(50);
            this.bindPos.x = mousePos.x + $nrm.x;
            this.bindPos.y = mousePos.y + $nrm.y;
        }
        var kk: UIConatiner = this.b_yaogan_bg.parent
        var v2d: Vector2D = new Vector2D(mousePos.x - this.bindPos.x, mousePos.y - this.bindPos.y);
        v2d.normalize();
        this.b_yaogan_bar.x = this.bindPos.x - this.b_yaogan_bar.width / 2 + v2d.x * 20;
        this.b_yaogan_bar.y = this.bindPos.y - this.b_yaogan_bar.height / 2 + v2d.y * 20;
        this.b_yaogan_bg.x = this.bindPos.x - this.b_yaogan_bg.width / 2;
        this.b_yaogan_bg.y = this.bindPos.y - this.b_yaogan_bg.height / 2;
        var $a: number = Math.atan2(v2d.y, v2d.x) * 180 / Math.PI;



        var $m: Matrix3D = new Matrix3D()
        $m.appendRotation($a, Vector3D.Y_AXIS)
        this._speedDirect = $m.transformVector(new Vector3D(1, 0, 0))
        this.changeMainChar($a);

        if (this.yaoganFunction) {
            this.yaoganFunction($a);
        }
    }
    private _speedDirect: Vector3D
    private changeMainChar($a: number): void {
        MainCharControlModel.getInstance().setSpeedDirect(this._speedDirect);
    }
    public yaoganFunction: Function;
    protected butClik(evt: InteractiveEvent): void {
        this.isMouseDown = true
        MainCharControlModel.getInstance().sendStop()
    }
    public b_yaogan_bar: UICompenent;
    public b_yaogan_bg: UICompenent;

    public constructor() {
        super();
        this.interfaceUI = true
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.bottom = 0;
        this.left = 0;
        this._bottomRender = new UIRenderComponent;
        this.addRender(this._bottomRender);
        this._midRender = new UIRenderComponent;
        this.addRender(this._midRender);

        if (!this.hasStage) {
            UIManager.getInstance().addUIContainer(this);
        }
        this.configuiAtlas()
    }

    private configuiAtlas(): void {

        var $uiAtlas: UIAtlas = new UIAtlas
        $uiAtlas.configData = new Array();
        var $uiRect: Rectangle = new Rectangle(0, 0, 256, 128);
        $uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRect.width, $uiRect.height, false);
        $uiAtlas.textureRes = new TextureRes;
        $uiAtlas.textureRes.texture = Scene_data.context3D.getTexture($uiAtlas.ctx.canvas, 0, 1)//不是线性纹理

        $uiAtlas.configData.push($uiAtlas.getObject("b_yaogan_bg", 0, 0, 128, 128, $uiRect.width, $uiRect.height));
        $uiAtlas.configData.push($uiAtlas.getObject("b_yaogan_bar", 128, 0, 128, 128, $uiRect.width, $uiRect.height));

        this._bottomRender.uiAtlas = $uiAtlas;
        this._midRender.uiAtlas = $uiAtlas;
        this.loadConfigCom();

    }



    private loadConfigCom(): void {


        this.b_yaogan_bg = <UICompenent>this.addChild(this._bottomRender.creatBaseComponent("b_yaogan_bg"));
        this.b_yaogan_bar = <UICompenent>this.addChild(this._bottomRender.creatBaseComponent("b_yaogan_bar"));

        this.b_yaogan_bg.x = 90;
        this.b_yaogan_bg.y = 334;
        this.b_yaogan_bg.width = 130;
        this.b_yaogan_bg.height = 130;

        this.b_yaogan_bar.x = 115;
        this.b_yaogan_bar.y = 360;
        this.b_yaogan_bar.width = 80;
        this.b_yaogan_bar.height = 80;

        this._midRender.uiAtlas.upDataPicToTexture("pan/pic/b_yaogan_bar.png", this.b_yaogan_bar.skinName)
        this._midRender.uiAtlas.upDataPicToTexture("pan/pic/b_yaogan_bg.png", this.b_yaogan_bg.skinName)

       // GameMouseManager.getInstance().setBtn(this.b_yaogan_bar, this.b_yaogan_bg);
        this.addMouseEvent();
    }
}