

module kuafu {
 
    export class KuaFu3v3MatchTimePanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

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
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas
            this.updateFun = (t: number) => { this.update(t) };

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/matchlist3v3.xml", "ui/uidata/kuafu/3v3/matchlist3v3.png", () => { this.loadConfigCom() });
        }

        private uiAtlasComplet: boolean = false
        private c_pipei_label: UICompenent
        private c_matching_time:UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            
           this.addChild(this._midRender.getComponent("c_pipei_label"));
  

            this.addChild(<UICompenent>this._bottomRender.getComponent("c_matching"));

            this.addChild(<UICompenent>this._midRender.getComponent("c_pipei"));
     
            this.c_matching_time = this.addChild(this._midRender.getComponent("c_matching_time"));


            this.c_close= this.addEvntBut("c_close",this._midRender)

   
            this.uiAtlasComplet = true;
            this.applyLoadComplete();

        }

        private c_close:UICompenent

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_close:
                    //console.log("kuafu_3v3_cancel_match")
                    NetManager.getInstance().protocolos.kuafu_3v3_cancel_match(SharedDef.KUAFU_TYPE_FENGLIUZHEN);
                    this.hide();
                    break;
                default:
                    break
            }
        }
        private openTime: number;
        private lastTimeTxt:number
        private update(t: number): void {
   
                var $time: number = Math.floor((TimeUtil.getTimer() - this.openTime) / 1000)
                if (this.lastTimeTxt != $time) {
                    this.lastTimeTxt = $time
                    var $str: string = ""
                    var $m: number = Math.floor($time / 60)
                    var $s: number = Math.floor($time % 60)
                    $str += $m > 9 ? String($m) : "0" + String($m);
                    $str += ":"
                    $str += $s > 9 ? String($s) : "0" + String($s);
                    ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.c_matching_time.skinName, $str, ArtFont.num1, TextAlign.CENTER)
                }
                if (!this.hasStage) {
                    TimeUtil.removeFrameTick(this.updateFun);

                }

        }
        private updateFun: Function
        public show(): void
        {
            if (!this.hasStage) {
                this.openTime = TimeUtil.getTimer()
                UIManager.getInstance().addUIContainer(this);
                TimeUtil.addFrameTick(this.updateFun);
   
            }
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }

        }


    }
}