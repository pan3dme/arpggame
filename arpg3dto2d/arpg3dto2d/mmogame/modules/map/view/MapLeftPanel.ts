module map {
    export class MapLeftPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }
        public setRender($bottom: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bottom;
            this._topRender = $top;
            this.loadConfigCom();
        }

        private a_tab_0: SelectButton
        private a_tab_1: SelectButton
        private loadConfigCom(): void {
            var renderLevel: UIRenderComponent = this._topRender;
            this.a_tab_0 = <SelectButton>this.addEvntBut("a_tab_0", this._topRender);
            this.a_tab_1 = <SelectButton>this.addEvntBut("a_tab_1", this._topRender);
            this.addUIList(["a_red_line_0", "a_red_line_1"], this._topRender);
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_tab_0:
                    (<MapPanel>this.parent).setTabType(0)
                    break
                case this.a_tab_1:
                    (<MapPanel>this.parent).setTabType(1)
                    break
                default:
                    break;

            }

        }
        public setTabType(value: number): void
        {
            if (value == 0) {
                this.a_tab_0.enable = false
                this.a_tab_0.selected = true
                this.a_tab_1.enable = true
                this.a_tab_1.selected = false
            } else {
                this.a_tab_0.enable = true
                this.a_tab_0.selected = false
                this.a_tab_1.enable = false
                this.a_tab_1.selected = true
            }
     
        }
    }
}