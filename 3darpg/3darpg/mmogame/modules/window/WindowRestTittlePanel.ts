module wintittle {

    export class TittleUi {
        public lastDrawNum: number
        public bg: UICompenent;
        public label: FrameCompenent;
        public addbtn: UICompenent;
        public typeId: number;
    }

    export class WindowRestTittlePanel extends UIPanel {

        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/window/window.xml", "ui/uidata/window/window.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {

            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.uiAtlasComplet = true
            this.applyLoadComplete();


        }
        private showData: Array<number>;

        private tittleUiList: Array<TittleUi> = new Array
        public refresh($data: Array<number> = null): void {
            if ($data) {
                console.log("---到了");
                this.clear()
                this.showData = $data;
                for (var i: number = 0; i < this.showData.length; i++) {
                    var $vo: TittleUi = new TittleUi()
                    $vo.bg = this.addChild(this._midRender.getComponent("t_res_bg"));
                    $vo.addbtn = this.addEvntButUp("t_res_add", this._midRender);
                    $vo.label = <FrameCompenent>this.addChild(this._topRender.getComponent("t_res_frame"));
                    $vo.label.goToAndStop(i);
                    if (this.showData.length == 3) {
                        $vo.bg.x = 145 + i * 250;
                    } else if (this.showData.length == 2) {
                        $vo.bg.x = 250 + i * 300;
                    } else {
                        $vo.bg.x = 100 + i * 200;
                    }

                    $vo.addbtn.x = $vo.bg.x + $vo.bg.width;
                    $vo.label.x = $vo.bg.x + 30;
                    $vo.typeId = this.showData[i];
                    $vo.addbtn.data = $vo;
                    this.tittleUiList.push($vo)
                }
            }
            this.drawTxtToCtx();
        }
        private drawTxtToCtx(): void {
            for (var i: number = 0; i < this.tittleUiList.length; i++) {
                var $vo: TittleUi = this.tittleUiList[i];
                var $ui: FrameCompenent = $vo.label;
                var $toRect: Rectangle = $ui.getSkinCtxRect();

                var $strnum: string = GuidData.player.getResTypeStr($vo.typeId);

                // if ($vo.lastDrawNum != $num) {
                //     $vo.lastDrawNum = $num;
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                UiDraw.cxtDrawImg($ctx, UIuitl.getInstance().costtype($vo.typeId), new Rectangle(0, 0, 35, 35), UIData.publicUi);
                LabelTextFont.writeSingleLabelToCtx($ctx, $strnum, 16, 0, 13, TextAlign.CENTER);
                $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
                // }
            }
        }

        public butClik($evt: InteractiveEvent) {
            var idx: number = 4011;
            var vo: TittleUi = $evt.target.data;
            var goto: number = SharedDef.MODULE_MALL;
            var gosub: any = [SharedDef.MODULE_MALL_RECHARGE];
            if (vo.typeId == SharedDef.MONEY_TYPE_SILVER) {
                goto = SharedDef.MODULE_MONEYTREE;
                gosub = SharedDef.MODULE_MONEYTREE_ALL;
                idx = 1121
            }

            var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo(idx);
            if ($tb_system_base.level <= GuidData.player.getLevel()) {
                ModulePageManager.openPanel(goto, gosub);
            }else{
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + $tb_system_base.level + "级后解锁", 99);
            }
        }

        private clear(): void {
            while (this.tittleUiList.length) {
                var $vo: TittleUi = this.tittleUiList.pop();
                this.removeChild($vo.bg);
                this.removeChild($vo.label);
                this.removeChild($vo.addbtn);
            }

        }

    }
}