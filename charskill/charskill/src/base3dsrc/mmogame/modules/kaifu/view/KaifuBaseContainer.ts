module kaifu {
    export class KaifuBaseContainer extends UIConatiner {
        public constructor() {
            super();
        }
        public _activeID:number;
        public show(): void {
            //this._activeID = $activeID;
            UIManager.getInstance().addUIContainer(this);
        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public setActiveID($val:number):void{
            this._activeID = $val;
        }

    }
}