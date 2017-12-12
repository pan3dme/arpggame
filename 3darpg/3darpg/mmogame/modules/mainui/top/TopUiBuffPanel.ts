module topui {
    export class BuffCdUi {
        public ui: FrameCompenent;
        public cd: CdUICompenent;
        public endTM: number = 0;
        public len: number = 20;  //秒

        public update(t: number): void {
            var $tm: number = this.endTM - TimeUtil.getTimer();
            if ($tm > 0) {
                var $int: number = 1 - ($tm / 1000) / this.len;
                this.cd.setCdNum(Math.min($int, 1));
            }
        }

    }
    export class TopBuffUiList {
        private perent: UIConatiner;
        private render: UIRenderComponent;
        private cdRender: CdRenderComponent;
        public constructor($perent: UIConatiner, $render: UIRenderComponent, $cd: CdRenderComponent) {

            this.perent = $perent;
            this.render = $render;
            this.cdRender = $cd;

            TimeUtil.addFrameTick((t: number) => { this.update(t) });
        }
        private update(t: number): void {
            for (var i: number = 0; this.buffuiItem && i < this.buffuiItem.length; i++) {
                this.buffuiItem[i].update(t);
            }
        }
        private buffuiItem: Array<BuffCdUi>;
        private static cdKeyLen: Object = new Object;
        public refresh(): void {
            this.clear();
            var $buff: BuffUnit = GameInstance.mainChar.unit.buffUnit;
            for (var $keystr in $buff.item) {
                console.log($keystr, $buff.item[$keystr]);
                var keynum = Number($keystr);
                if (this.needShowById(keynum)) {

                    var $maxLen: number = $buff.item[keynum] - TimeUtil.getTimer();
                    if (TopBuffUiList.cdKeyLen[keynum]) {
                        if (TopBuffUiList.cdKeyLen[keynum] < $maxLen) {
                            TopBuffUiList.cdKeyLen[keynum] = $maxLen;
                        }
                    } else {
                        TopBuffUiList.cdKeyLen[keynum] = $maxLen;
                    }
                    var $buffCdUi: BuffCdUi = new BuffCdUi()
                    $buffCdUi.len = (TopBuffUiList.cdKeyLen[keynum] / 1000);


                    $buffCdUi.ui = <FrameCompenent>this.perent.addChild(this.render.getComponent("a_buff_cd"));
                    $buffCdUi.ui.goToAndStop(this.buffuiItem.length);
                    $buffCdUi.cd = <CdUICompenent>this.perent.addChild(this.cdRender.getComponent("a_buff_mask"));

                    $buffCdUi.ui.x = $buffCdUi.ui.x + this.buffuiItem.length * 28;
                    $buffCdUi.cd.x = $buffCdUi.ui.x;
                    $buffCdUi.cd.y = $buffCdUi.ui.y;
                    $buffCdUi.cd.width = $buffCdUi.ui.width;
                    $buffCdUi.cd.height = $buffCdUi.ui.height;

                    this.ctxIconPic($buffCdUi.ui, keynum)
 
                    $buffCdUi.endTM = $buff.item[keynum]

                    this.buffuiItem.push($buffCdUi);
                  //  console.log("显示", keynum);
                }
            }
        }
        private ctxIconPic($ui: FrameCompenent, $key: number): void {

            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/buff/" + $key + ".png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $img.width, $img.height);
                    $ui.drawToCtx(this.render.uiAtlas, $ctx)
                });
        }
        private needShowById($id: number): boolean {
            for (var i: number = 0; i < this._showListArr.length; i++) {
                if (this._showListArr[i] == $id) {
                    return true
                }
            }
            return false

        }
        private _showListArr: Array<number> = [148, 151,152]
        private clear(): void {
            if (this.buffuiItem) {
                while (this.buffuiItem.length) {
                    var $BuffCdUi: BuffCdUi = this.buffuiItem.pop()
                    this.perent.removeChild($BuffCdUi.ui);
                    this.perent.removeChild($BuffCdUi.cd);
                }
            } else {
                this.buffuiItem = new Array;
            }

        }
    }
    export class TopUiBuffPanel extends UIVirtualContainer {

        private _cdRender:CdRenderComponent
        private _topRender: UIRenderComponent
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0;
            this.left = 0;
        }
        public setRender($top: UIRenderComponent, $cd: CdRenderComponent): void {
            this._topRender = $top;
            this._cdRender = $cd;
            this.loadConfigCom();
        }
        private topBuffUiList: TopBuffUiList;
        private loadConfigCom(): void {
            this.topBuffUiList = new TopBuffUiList(this, this._topRender, this._cdRender);
        }
        public refresh(): void
        {
            this.topBuffUiList.refresh();
            /*
            if (GuidData.map.showAreaById(AreaType.topleft_1)) {
                this.left = 0
            } else {
                this.left = -1000;
            }
            */
        }
    }
}