module faction {
    
        export class LeagueLs extends WindowCentenMin {
            private _baseRender: UIRenderComponent;
            private _topRender: UIRenderComponent;
    
            public dispose(): void {
                this._baseRender.dispose();
                this._baseRender = null;
                this._topRender.dispose();
                this._topRender = null;
                this._bgMask.dispose();
                this._bgMask = null;
            }
    
            private posx: number = 305;
            private posy: number = 100;
            private posW: number = 346;
            private posH: number = 385;
    
            public constructor() {
                super();
                this.width = UIData.designWidth;
                this.height = UIData.designHeight;
                this.center = 0;
                this.middle = 0;
    
                // this._bottomRender = new UIRenderComponent;
                // this.addRender(this._bottomRender)
                this._baseRender = new UIRenderComponent;
                this.addRender(this._baseRender)
                this._topRender = new UIRenderComponent;
                this.addRender(this._topRender)
    
                this.setBlackBg();
    
                this._bgMask = new UIMask();
                this._bgMask.x = this.posx
                this._bgMask.y = this.posy
                this._bgMask.width = this.posW;
                this._bgMask.height = this.posH;
                this.addMask(this._bgMask);
                this._topRender.mask = this._bgMask;
    
                this._topRender.uiAtlas = new UIAtlas();
            }
    
            private _bgMask: UIMask;
    
            public applyLoad(): void {
                this._topRender.uiAtlas.setInfo("ui/uidata/faction/league/gz/leaguegz.xml", "ui/uidata/faction/league/gz/leaguegz.png", () => { this.loadConfigCom() });
            }
    
            private b_gonggao: UICompenent
            private loadConfigCom(): void {
                this._baseRender.uiAtlas = this._topRender.uiAtlas;
                var renderLevel = this._baseRender;
                this.addChild(renderLevel.getComponent("a_title2"));
    
                this.b_gonggao = this.addChild(this._topRender.getComponent("b_txt"));
                this.b_gonggao.addEventListener(InteractiveEvent.Down, this.onDown, this);
                this.layer = 310;
                this.applyLoadComplete();
            }
    
    
            public resize(): void {
                super.resize();
            }
    
            private _mouseY: number = 0;
            public onDown($e: InteractiveEvent) {
                if (this._bgMask.testPoint($e.x, $e.y)) {
                    this._mouseY = $e.y;
                    if (!this.scrollLock) {
                        Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
                        Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
                    }
                }
            }
    
            private curY: number = 0;
            private scrollLock: boolean = true;
            public onMove($e: InteractiveEvent): void {
                var delatY: number = $e.y - this._mouseY;
                this._mouseY = $e.y;
                // if (delatY < 0 && this.scrollLock) {
                //     return;
                // }
    
                var scrollYnum = this._txtHight - this._bgMask.height;
                this.curY = this.curY - delatY;
                if (this.curY <= 0) {
                    this.b_gonggao.y = this.posy;
                    return;
                }
                if (this.curY >= scrollYnum) {
                    this.b_gonggao.y = this.posy - scrollYnum
                    return;
                }
                this.b_gonggao.y = this.b_gonggao.y + delatY;
            }
    
            public onUp($e: InteractiveEvent): void {
                Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
                Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
            }
    
            protected butClik(evt: InteractiveEvent): void {
                if(evt.target == this.c_close){
                    this.hide();
                }
            }
    
            public show(): void {
                UIManager.getInstance().addUIContainer(this);
                //请求数据
                this.resetData();
            }
    
            public hide(): void {
                UIManager.getInstance().removeUIContainer(this);
            }
    
            private _txtHight: number = 0;
            public resetData(): void {
                LoadManager.getInstance().load(Scene_data.fileRoot + "txt/league_ls.txt", LoadManager.XML_TYPE, ($str: string) => {
                    $str = $str.replace(/\r/g, "");
                    //notepad++默认一个回车键入\n\r ,所以默认将所有的\r隐藏
                    var aaa = LabelTextFont.writeTextLabel(this._baseRender.uiAtlas, this.b_gonggao.skinName, $str, 16, TextAlign.LEFT, 330, ColorType.color9a683f);
                    this._txtHight = aaa[1];
                    this.scrollLock = this._txtHight <= this._bgMask.height
                    this.b_gonggao.y = this.posy;
                });
                this.resize();
            }
        }
    }