module homeui {
    export class SystemUi {

        public frame: FrameCompenent;
        public tb: tb.TB_system_icon
        public redPoint: RedPointCompenent;

        public clik(): void {
            var $data: any = 1;
            if (this.tb.id == SharedDef.MODULE_MALL || this.tb.id == SharedDef.MODULE_MOUNT) {
                $data = [1];
            }
            ModulePageManager.openPanel(this.tb.id, $data);
        }
        public drawIcon($bottom: UIRenderComponent): void {
            this.frame.getSkinCtxRect
            var $ui: FrameCompenent = this.frame;

            var $url: string = "ui/load/systemicon/" + this.tb.id + ".png"
            IconManager.getInstance().getIcon($url,
                ($img: any) => {
                    var $skillrec: Rectangle = $ui.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);

                    $ctx.drawImage($img, 0, 0, 100, 100);
                    $ui.drawToCtx($bottom.uiAtlas, $ctx);

                });


        }
    }
    export class HomeSysPanel extends UIVirtualContainer {

        private _baseRender: UIRenderComponent
        private _redPointRender: RedPointRender;


        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.bottom = 0;
        }
        public setRender($bottom: UIRenderComponent, $top: RedPointRender): void {
            this._baseRender = $bottom
            this._redPointRender = $top;
            this.loadConfigCom();
        }

        private loadConfigCom(): void {
            this.addBaseSysFram()
            this.refresh();

        }
        private frameSysItem: Array<SystemUi>;
        private addBaseSysFram(): void {

            this.frameSysItem = new Array()
            var $tbItem: Array<tb.TB_system_icon> = tb.TB_system_icon.getItem();

            for (var i: number = 0; i < $tbItem.length; i++) {
                var $tb: tb.TB_system_icon = $tbItem[i];
                if ($tb.position >= 4 && $tb.position <= 7) {
                    var $uivo: SystemUi = new SystemUi()
                    $uivo.tb = $tb;
                    $uivo.frame = <FrameCompenent>this.addEvntButUp("a_sys_fram", this._baseRender)
                    $uivo.frame.addEventListener(InteractiveEvent.Down,v=>{}, this);
                    $uivo.frame.goToAndStop(this.frameSysItem.length);
                    if (this.nodeDic[$tb.id]) {
                        $uivo.redPoint = this._redPointRender.getRedPointUI(this, this.nodeDic[$tb.id], new Vector2D(0, 0));
                    }
                    this.frameSysItem.push($uivo)

                }
            }
        }

        public refresh(): void {

            for (var i: number = 0; i < this.frameSysItem.length; i++) {
                var $temp: SystemUi = this.frameSysItem[i];
                var $visible: boolean = this.getSysIconVisible($temp.tb);
                if ($visible) {
                    this.addChild($temp.frame);
                    //   var $pos: Vector2D = this.getPandaPostionBySysId(i);
                    var $pos: Vector2D = mainUi.MainUiModel.getPandaPostionBySysId($temp.tb.id);
                    $temp.frame.x = $pos.x;
                    $temp.frame.y = $pos.y;
                    $temp.drawIcon(this._baseRender);
                    if ($temp.redPoint) {
                        $temp.redPoint.setPos($pos.x + $temp.frame.width - 17, $pos.y);
                    }
                    console.log($pos)
                } else {
                    this.removeChild($temp.frame);
                }
            }
        }

        private nodeDic: any = { 201: 6, 202: 14, 203: 17, 204: 20, 205: 27, 206: 37, 207: 50, 301: 55, 302: 60, 208: 80, 209: 127 };




        private getSysIconVisible($tb: tb.TB_system_icon): boolean {
            var $visible: boolean = GuidData.player.isOpenSystemNeedShow($tb.id);
            return $visible
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                default:
                    for (var i: number = 0; i < this.frameSysItem.length; i++) {
                        if (this.frameSysItem[i].frame == evt.target) {
                            UIManager.popClikNameFun("sys" + this.frameSysItem[i].tb.id);
                            UiTweenScale.getInstance().changeButSize(evt.target);
                            this.frameSysItem[i].clik()
                          
              
                  
                            break;
                        }
                    }
                    break;
            }
        }
    }
}