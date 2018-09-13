module bottomui {

    export class BottomAotuScaleText extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.bottom = 0;
            this.center = 0;


        }

        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        }
        private aotuTxtItem:Array<UICompenent>
        private loadConfigCom(): void {
            this.aotuTxtItem = new Array();
            for (var i: number = 0; i < 5; i++) {
                this.aotuTxtItem.push(this._topRender.getComponent("e_aotu_txt_"+i))
            }
        }
        public updata(t): void {

            if (AotuSkillManager.getInstance().aotuBattle) {
                if (!this.lastAotuTextVisible) {
                    this.lastAotuTextVisible = true;
                    this.setUiListVisibleByItem(this.aotuTxtItem, this.lastAotuTextVisible)
                }
                this.changeUiSize(this.aotuTxtItem);
            } else {
                if (this.lastAotuTextVisible) {
                    this.lastAotuTextVisible = false;
                    this.setUiListVisibleByItem(this.aotuTxtItem, this.lastAotuTextVisible)
                }
            }
      
        }
        private lastAotuTextVisible:boolean=false

        private changeUiSize($arr: Array<UICompenent>): void {
            for (var i: number = 0; i < $arr.length; i++) {
                var $sn: number = (TimeUtil.getTimer() % 1000) / 1000;
                var $t: number = (TimeUtil.getTimer() + 100) / 200 - i
                var $ui: UICompenent = $arr[i]
                var $scale: number = 0.5 + (Math.sin($t) + 1) / 5;
                $ui.width = 48 * $scale;
                $ui.height = 48 * $scale;
                var basPos: Vector2D = new Vector2D(354 + i * 50, 323)
                $ui.x = basPos.x + (48 - $ui.width) / 2;
                $ui.y = basPos.y + (48 - $ui.height) / 2;
            }
        }
 
    }
}