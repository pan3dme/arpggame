module map {


    export class MapLinePanel extends UIVirtualContainer {
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
        private lineFramList:Array<FrameCompenent>
        private loadConfigCom(): void {

        }
        private clearFramAll(): void
        {
            while (this.lineFramList && this.lineFramList.length) {
                var indx: number = this.lineFramList.length-1
                this.lineFramList[indx].removeEventListener(InteractiveEvent.Up, this.butClik, this);
                this.removeChild(this.lineFramList[indx])
                this.lineFramList.pop();
            }
            this.lineFramList = new Array();
        }
        public showLinePanel(): void {
            this.clearFramAll()
            var $vo: s2c_send_map_line = MapModel.getInstance().mapLineData;
            for (var i: number = 0; i < 10; i++) {
                if ($vo.info[i]||i<4) {
                    var rate:number=0
                    if ($vo.info[i]) {
                        rate= $vo.info[i].rate
                    }
                    var line_label: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("line_label"));
                    line_label.goToAndStop(i)
                    line_label.data = i;
                    line_label.addEventListener(InteractiveEvent.Up, this.butClik, this);
                    line_label.x = 680;
                    line_label.y = 75 + i * 40;
                    this.drawToCtxB(line_label, i + 1, rate)
                    this.lineFramList.push(line_label);

                }
            }

        }
        private drawToCtxB($ui: FrameCompenent, $id: number, $rate: number): void {

            
            var $uiRec: UIRectangle = this._bottomRender.uiAtlas.getRec($ui.skinName);
            var $toRect: Rectangle = $ui.getSkinCtxRect()
       
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);

            var $bgRect: UIRectangle = MapNpcListItemRender.uiAtlas.getRec("S_line_bg");
            $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, $bgRect.pixelX, $bgRect.pixelY, $bgRect.pixelWitdh, $bgRect.pixelHeight, 0, 0, $toRect.width, $toRect.height);
            var tpos: Vector2D = new Vector2D(30, 10);
            var $rateStr: string = "S_yellow";
            if ($rate < 60) {
                $rateStr = "S_green";
            }
            if ($rate > 95) {
                $rateStr = "S_red";
            }
            var $txtBRect: UIRectangle = MapNpcListItemRender.uiAtlas.getRec($rateStr);
            $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, $txtBRect.pixelX, $txtBRect.pixelY, $txtBRect.pixelWitdh, $txtBRect.pixelHeight, 30 + tpos.x, 0 + tpos.y, $txtBRect.pixelWitdh, $txtBRect.pixelHeight);
            ArtFont.getInstance().writeFontToCtxCenten($ctx, String($id), ArtFont.num1, 10 + tpos.x, 0 + tpos.y);
            $ui.drawToCtx(this._bottomRender.uiAtlas, $ctx);
        }

        private changeLine(value: number): void
        {
            console.log("换线" + (value + 1));
            NetManager.getInstance().protocolos.change_line(value + 1);
   
        }
        public butClik(evt: InteractiveEvent): void {

            this.changeLine(evt.target.data);
            (<MapPanel>this.parent).showLinePanel();
            (<MapPanel>this.parent).close();

        }
    }
}