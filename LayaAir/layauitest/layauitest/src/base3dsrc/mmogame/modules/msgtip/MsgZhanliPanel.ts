module msgtip {
    export class MsgZhanliPanel extends UIConatiner {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);


            this._midRender.uiAtlas = new UIAtlas
            this.frameUpFun = (t: number) => { this.upData(t) }
        
        }
        private frameUpFun:Function
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/msg/zhanli.xml", "ui/uidata/msg/zhanli.png", () => { this.loadConfigCom() });
        }
        private a_zanli_txt: UICompenent;
        private a_up_txt: UICompenent;
        private a_jiantou: FrameCompenent;
        private loadConfigCom(): void {
     
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this.addChild(<UICompenent>this._bottomRender.getComponent("a_bg"));
            this.a_zanli_txt = this.addChild(<UICompenent>this._midRender.getComponent("a_zanli_txt"));
            this.a_up_txt = this.addChild(<UICompenent>this._midRender.getComponent("a_up_txt"));
            this.a_jiantou = <FrameCompenent> this.addChild(this._midRender.getComponent("a_jiantou"));

            this.applyLoadComplete();

        }
        private endTime: number
        private waitTime2000=2000
        public upData(t): void
        {
            if (this.endTime >TimeUtil.getTimer()) {
                var a: number = this.forceVect.x
                var b: number = this.forceVect.y

      
                var tn: number = ((this.endTime - TimeUtil.getTimer()) / this.waitTime2000);
                tn = 1 - Math.max(0, Math.min((tn - (1 / 5)) * (1 / (3 / 5)), 1));
                var $tnum: number = MathClass.easeInOut(tn, 0, b - a, 1);
                var $showTxt: string = String(Math.floor($tnum + a))

            
                ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, this.a_zanli_txt.skinName, $showTxt, ArtFont.num61, TextAlign.CENTER);

          
                if (b > a) {
                    this.a_jiantou.goToAndStop(0)
                    ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, this.a_up_txt.skinName, String(Math.floor(b - a)), ArtFont.num61, TextAlign.LEFT);
                } else {
                    this.a_jiantou.goToAndStop(1)
                    ArtFont.getInstance().writeFontToSkinName(this._midRender.uiAtlas, this.a_up_txt.skinName, String(Math.abs(b - a)), ArtFont.num61, TextAlign.LEFT);
                }

               
            } else {
                this.close();
            }
        }
        private close(): void
        {
            TimeUtil.removeFrameTick(this.frameUpFun)
            UIManager.getInstance().removeUIContainer(this);
        }
        private forceVect: Vector2D;
        public setData($forceVe:Vector2D): void
        {
            this.forceVect = $forceVe
            this.endTime = TimeUtil.getTimer() + this.waitTime2000
            TimeUtil.addFrameTick(this.frameUpFun)
            
        }


     
    }


}