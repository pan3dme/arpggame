module linklist {


    export class LinkListPanel extends WindowCentenMin {
        private _midRender:UIRenderComponent

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

        }

        public applyLoad(): void {
            this._midRender.uiAtlas=new UIAtlas();
            this.applyLoadComplete();
        }
        protected butClik(evt: InteractiveEvent): void {
   
            UIManager.getInstance().removeUIContainer(this);
        }
          
    }
}