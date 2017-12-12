module logall {
    export class WarehouseTreasureLogListRender extends SListItem {
        public static baseAtlas: UIAtlas;
        private F_log_txt: UICompenent;
        private F_log_bg: UICompenent;
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {


            super.create($container, $bgRender, $baseRender, $customizeRenderAry);
            this.F_log_txt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "F_log_txt", 50, 5, 480, 18);
            $container.addChild(this.F_log_txt);
            this.F_log_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "F_log_bg", 0, 0, 470, 38);
            $container.addChild(this.F_log_bg);
        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var $str: string = <string>$data.data
                if (!($data.id % 2)) {
                    
                    UiDraw.uiAtlasDrawImg(this._baseRender.uiAtlas, this.F_log_bg.skinName, UIData.publicUi, PuiData.BG2);
                } 
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.F_log_txt.skinName,  $str, 16, TextAlign.LEFT, ColorType.Orange853d07)
            } else {
                this.setnull();
            }
        }
        private setnull(): void {
            this.uiAtlas.clearCtxTextureBySkilname(this.F_log_txt.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.F_log_bg.skinName)
        }
    }

    export class WarehouseTreasureLogList extends SList {

        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.left = 45;
            this.top = 120;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

        }

        public init($uiAtlas: UIAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, WarehouseTreasureLogListRender, 488, 440, 0, 38, 11, 512, 256, 1, 11);
        }
        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var $backAry: Array<SListItemData> = new Array;
            for (var i: number = 0; i < 10; i++) {
                var item: SListItemData = new SListItemData;
                item.data = "就是这条几率嘎嘎大吃大喝";
                item.id = i;
                $backAry.push(item);
            }
            this.refreshData($backAry);
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        }
   
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }



}