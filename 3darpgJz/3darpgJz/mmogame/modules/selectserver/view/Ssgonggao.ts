module selectserver {

    export class Ssgonggao extends UIVirtualContainer {
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

            this._bgMask = new UIMask();
            this._bgMask.x = 146
            this._bgMask.y = 110
            this._bgMask.width = 695;
            this._bgMask.height = 355;
            this.addMask(this._bgMask);
            this._topRender.mask = this._bgMask;
        }

        private _bgMask: UIMask;
        public initUiAtlas($uiAtlas): void {
            // this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();

        }

        private b_gonggao: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;
            var b_angel3 = this.addChild(renderLevel.getComponent("b_angel3"));
            b_angel3.isU = true;
            b_angel3.isV = true;
            var b_angel1 = this.addChild(renderLevel.getComponent("b_angel1"));
            b_angel1.isU = true;
            this.addChild(renderLevel.getComponent("b_angel0"));
            var b_angel2 = this.addChild(renderLevel.getComponent("b_angel2"));
            b_angel2.isV = true;

            this.addUIList(["b_topline", "b_leftline", "b_leftline_copy", "b_topline_copy", "b_title"], renderLevel);

            this.b_gonggao = this.addChild(this._topRender.getComponent("b_gonggao"));
            this.b_gonggao.addEventListener(InteractiveEvent.Down, this.onDown, this);
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
                this.b_gonggao.y = 110;
                return;
            }
            if (this.curY >= scrollYnum) {
                this.b_gonggao.y = 110 - scrollYnum
                return;
            }
            this.b_gonggao.y = this.b_gonggao.y + delatY;

            // this.scrollY(delatY);
        }

        public onUp($e: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
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
            LoadManager.getInstance().load("gg.txt", LoadManager.XML_TYPE, ($str: string) => {
                $str = $str.replace(/\r/g, "\n");
                var aaa = LabelTextFont.writeText(this._baseRender.uiAtlas, this.b_gonggao.skinName, 0, 0, $str, 16, ColorType.color9a683f, 685, true);
                this._txtHight = aaa[1];
                this.scrollLock = this._txtHight <= this._bgMask.height
                this.b_gonggao.y = 110;
            });
            this.resize();
        }
    }
}