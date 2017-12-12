class SceneLoadUI extends UIConatiner {

    private _baImg: UIBackImg;
    private _baseRender: UIRenderComponent;
    private _midRender:UIRenderComponent

    public constructor() {
        super();

        this.width = 400;
        this.height = 80;
        this.center = 0;
        this.bottom = 50;

        this._baImg = new UIBackImg();
     //   this._baImg.setImgInfo("ui/load/lod.jpg", 1024, 512);
        this.addRender(this._baImg);

        this._baseRender = new UIRenderComponent
        this.addRender(this._baseRender)
    
        this._midRender = new UIRenderComponent
        this.addRender(this._midRender)

       this.loadConfigCom();
    }
    public loadBackImg($url): void
    {
        this._baImg.setImgInfo($url, 1024, 512);
    }
    private _loadbar: UICompenent

    private barB: UICompenent
    private barC: UICompenent
   
    private loadConfigCom(): void
    {
    
        this._baseRender.uiAtlas = new UIAtlas()
        this._midRender.uiAtlas=this._baseRender.uiAtlas
        var $uiAtlas: UIAtlas = this._baseRender.uiAtlas
        $uiAtlas.configData = new Array;
        $uiAtlas.configData.push($uiAtlas.getObject("numLabel", 0, 40, 100, 18, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("numText", 100, 40, 60, 20, 256, 64));

        $uiAtlas.configData.push($uiAtlas.getObject("barA", 0, 0, 15, 16, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("barB", 15, 0, 24, 16, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("barC", 54-15, 0, 15, 16, 256, 64));

        $uiAtlas.configData.push($uiAtlas.getObject("backA", 100, 0, 20, 32, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("backB", 122, 0, 15, 32, 256, 64));
        $uiAtlas.configData.push($uiAtlas.getObject("backC", 164 - 20, 0, 20, 32, 256, 64));

        $uiAtlas.configData.push($uiAtlas.getObject("flashMc", 256 - 64, 0, 64, 64, 256, 64));

        $uiAtlas.ctx = UIManager.getInstance().getContext2D(256, 64, false);

 

        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_yellow_bar", new Rectangle(0, 0, 54, 16), UIData.textlist);
        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_yellow_bg", new Rectangle(100, 0, 64, 32), UIData.textlist);
        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_flash", new Rectangle(256 - 64, 0, 64, 64), UIData.textlist);
        

        UiDraw.cxtDrawImg($uiAtlas.ctx, "load_txt", new Rectangle(0, 40, 100, 20), UIData.textlist);


        

        $uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture($uiAtlas.ctx);



        var backA: UICompenent = <UICompenent>this._baseRender.creatBaseComponent("backA")
        backA.x=0-20
        this.addChild(backA)
        var backB: UICompenent = <UICompenent>this._baseRender.creatBaseComponent("backB")
        backB.x=0
        backB.width = 400 - 2;
        this.addChild(backB)
        var backC: UICompenent = <UICompenent>this._baseRender.creatBaseComponent("backC")
        backC.x = backB.width + backB.x
        this.addChild(backC)



        var barA: UICompenent = <UICompenent>this._midRender.creatBaseComponent("barA")
        barA.x = 2;
        barA.y = 7;
        this.addChild(barA)

        this.barB = <UICompenent>this._midRender.creatBaseComponent("barB")
        this.barB.x = 13;
        this.barB.y = barA.y;
        this.addChild(this.barB);

        this.barC = <UICompenent>this._midRender.creatBaseComponent("barC")
        this.barC.x = 26;
        this.barC.y = barA.y;
        this.addChild(this.barC);

   
        var numLabel: UICompenent = <UICompenent>this._baseRender.creatBaseComponent("numLabel")
        numLabel.y = 22 + 20;
        numLabel.x = 3;
        this.addChild(numLabel);

        var numText: UICompenent = <UICompenent>this._baseRender.creatBaseComponent("numText")
        numText.y = 20 + 20;
        numText.x = 100;
        this.addChild(numText);

        this.flashMc = <UICompenent>this._midRender.creatBaseComponent("flashMc")
        this.flashMc.x = 0;
        this.flashMc.y = -15;
        this.addChild(this.flashMc);

        this.setProgress(0.01);
        this.upDataFun = () => { this.updData(0) };
    }
    private flashMc: UICompenent
    public remove(): void {
        TimeUtil.removeFrameTick(this.upDataFun);
    }
    public show(): void {
        TimeUtil.addFrameTick(this.upDataFun);
    }
    private upDataFun: Function;
    private skipNum:number=0
    private updData($num:number): void
    {
        if (this.barB) {
            if (this.skipNum > 50) {
                this.skipNum=0
            }
            var str: string = "";
            for (var i: number = 0; i < this.skipNum/10; i++) {
                str+="."
            }
            ArtFont.getInstance().upArtFont(this._baseRender.uiAtlas, "numText", str, 15, ArtFont.Yellow, TextAlign.LEFT);
            this.skipNum++
        }

    }

    public setProgress(num: number): void {
        if (this.barB) {
            if ((400 - 50) > 0) {
                this.barB.width = (400 - 31) * num;
                this.barC.x = this.barB.width + this.barB.x;
                this.barB.x = 13

                this.flashMc.x = this.barC.x -20
            } else {
                this.barB.x = 10000;
                this.barC.x = 10000;
            }
        }
    }

    public setTxt(str:string): void {
      //  this.loadAtals.setTxt(str);
    }

    public resize(): void {
        super.resize();
        this._baImg.resize();
    }


} 