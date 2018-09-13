

module kuafu {

    export class KuaFuPkCellVo {
        public headPic: UICompenent;
        public uiname: UICompenent;
        public bar: UICompenent;
        public bg: UICompenent
        public kuafu3V3dataVo: Kuafu3V3dataVo;
        public e_char_cell_kill: UICompenent;

        public e_char_cell_mask: FrameCompenent
        private uiAtlas: UIAtlas
        public constructor($bottomRender: UIRenderComponent, $midRender: UIRenderComponent, $topRender: UIRenderComponent, $id: number) {
            this.headPic = <UICompenent>$midRender.getComponent("e_char_cell_" + $id);
            this.uiname = <UICompenent>$midRender.getComponent("e_char_cell_name" + $id);

            this.e_char_cell_mask = <FrameCompenent>$topRender.getComponent("e_char_cell_mask");

            this.bar = <UICompenent>$midRender.getComponent("e_char_cell_hp");
            this.bg = <UICompenent>$bottomRender.getComponent("e_char_cell_hp_bg");

            this.e_char_cell_kill = <UICompenent>$topRender.getComponent("e_char_cell_kill");



            var $pos: Vector2D = new Vector2D(this.headPic.x, this.headPic.y + 1)

            this.uiname.y = $pos.y + 8;
            this.bg.y = $pos.y - 5;
            this.bar.y = this.bg.y + 32;


            this.e_char_cell_mask.y = $pos.y - 6;
            this.e_char_cell_mask.x = $pos.x - 4;

            this.e_char_cell_kill.y = this.bg.y + 6;

            this.uiAtlas = $bottomRender.uiAtlas;
        }
        public draw($vo: Kuafu3V3dataVo, $prente: UIConatiner): void {



          
                IconManager.getInstance().getIcon(getTouPic($vo.gender),
                ($img: any) => {
                    var $skillrec: UIRectangle = this.uiAtlas.getRec(this.headPic.skinName);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                    $ctx.drawImage($img, 0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight);
                    if ($vo.dieState == 1) {
                        UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $skillrec.pixelWitdh, $skillrec.pixelHeight));
                    }

                //    ArtFont.getInstance().writeFontToCtxRight($ctx, String($vo.level), ArtFont.num1, 44, 5, 4)
                    this.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
                });

            LabelTextFont.writeSingleLabel(this.uiAtlas, this.uiname.skinName, "[d6e7ff]" + getBaseName($vo.name), 14, TextAlign.LEFT, "#ffffff")
            this.bar.uvScale = $vo.hprate / 100;


            $prente.setUiListVisibleByItem([this.e_char_cell_kill], $vo.dieState == 1);

            $prente.setUiListVisibleByItem([this.headPic, this.uiname, this.bar, this.bg, this.e_char_cell_mask], true)


            this.e_char_cell_mask.goToAndStop(KuaFu3v3Model.getInstance().selfVo.group - 1)
        }

    }
    export class KillInfoUi {

        public bg: FrameCompenent;
        private e_kill_info_icon0: UICompenent
        private e_kill_info_icon1: UICompenent

        private e_kill_info_name0: UICompenent
        private e_kill_info_name1: UICompenent

        private e_kill_pic_mask0: FrameCompenent
        private e_kill_pic_mask1: FrameCompenent

        private e_kill_top_pic: UICompenent

        private perent: UIConatiner
        private _bottomRender: UIRenderComponent
        private _topRender: UIRenderComponent
        public constructor($perent: UIConatiner, $bottom: UIRenderComponent, $top: UIRenderComponent) {
            this.perent = $perent;
            this._bottomRender = $bottom;
            this._topRender = $top;
            this.bg = <FrameCompenent>this._bottomRender.getComponent("e_kill_info");

            this.e_kill_top_pic = <FrameCompenent>this._topRender.getComponent("e_kill_top_pic");



            this.e_kill_info_icon0 = this._bottomRender.getComponent("e_kill_info_icon0");
            this.e_kill_info_icon1 = this._bottomRender.getComponent("e_kill_info_icon1");

            this.e_kill_info_name0 = this._topRender.getComponent("e_kill_info_name0");
            this.e_kill_info_name1 = this._topRender.getComponent("e_kill_info_name1");

            this.e_kill_pic_mask0 = <FrameCompenent>this._topRender.getComponent("e_kill_pic_mask0");

            this.e_kill_pic_mask1 = <FrameCompenent>this._topRender.getComponent("e_kill_pic_mask1");



            this.basePos = new Vector2D(this.bg.x, this.bg.y);
        }
        private basePos: Vector2D
        public endTime: number;

        private infoItem: Array<any>
        public pushKillData($A: Kuafu3V3dataVo, $B: Kuafu3V3dataVo): void {
            if (!this.infoItem) {
                this.infoItem = new Array()
            }
            this.infoItem.push({ a: $A, b: $B, });

            this.show();
        }
        private show() {
            if (this.visible == false && this.infoItem.length) {
                var obj: any = this.infoItem.pop()
                var $A: Kuafu3V3dataVo = obj.a;
                var $B: Kuafu3V3dataVo = obj.b;
                this.killState = $A.group == 1;
                // this.killState = !this.killState
                this.endTime = TimeUtil.getTimer() + 2 * 1000;
                
                this._bottomRender.uiAtlas.upDataPicToTexture(getTouPic($A.gender), this.e_kill_info_icon0.skinName)
                this._bottomRender.uiAtlas.upDataPicToTexture(getTouPic($B.gender), this.e_kill_info_icon1.skinName)
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.e_kill_info_name0.skinName, "[ffe57e]" + getBaseName($A.name), 18, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.e_kill_info_name1.skinName, "[ffe57e]" + getBaseName($B.name), 18, TextAlign.CENTER);
                this.visible = true;
                this.ttyy = -50;
                TimeUtil.addTimeOut(3000, () => {
                    if (this.endTime < TimeUtil.getTimer()) {
                        TweenLite.to(this, 0.1, { ttyy: 50, onComplete: () => { this.changeMoveOut() } });
                    }
                });
                TweenLite.to(this, 0.1, { ttyy: 0 });
            }

        }
        private changeMoveOut(): void {
            this.visible = false;

            this.show();
        }
        private _ttyy: number = 0
        public get ttyy(): number {
            return this._ttyy;
        }
        private killState: boolean = false
        public set ttyy(value) {
            this._ttyy = value;
            this.bg.y = this.basePos.y - this._ttyy;

            if (this.killState) {
                this.bg.goToAndStop(0)
                this.e_kill_pic_mask0.goToAndStop(0)
                this.e_kill_pic_mask1.goToAndStop(1)

            } else {
                this.bg.goToAndStop(1)
                this.e_kill_pic_mask0.goToAndStop(1)
                this.e_kill_pic_mask1.goToAndStop(0)

            }


            this.e_kill_info_icon0.y = this.bg.y + 10;
            this.e_kill_info_icon1.y = this.bg.y + 10;

            this.e_kill_info_name0.y = this.bg.y + 20;
            this.e_kill_info_name1.y = this.bg.y + 30;

            this.e_kill_top_pic.y = this.bg.y;



            this.e_kill_pic_mask0.y = this.e_kill_info_icon0.y - 8
            this.e_kill_pic_mask1.y = this.e_kill_info_icon1.y - 8

        }

        public set visible(value: boolean) {
            if (this._visible != value) {
                this._visible = value;
                this.perent.setUiListVisibleByItem([this.bg, this.e_kill_info_icon0, this.e_kill_info_icon1, this.e_kill_info_name0, this.e_kill_pic_mask0, this.e_kill_pic_mask1, this.e_kill_info_name1, this.e_kill_top_pic], value);
            }

        }
        private _visible: boolean = false
        public get visible(): boolean {
            return this._visible;
        }

    }

    export class KuaFu3v3PkPanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;


            this.middle = 0;
            this.left = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas
            this.kuaFuPkTopPanel = new KuaFu3v3PkTopPanel();

            this.updateFun = (t: number) => { this.update(t) };

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/kuafupk.xml", "ui/uidata/kuafu/3v3/kuafupk.png", () => { this.loadConfigCom() });
        }

        private uiAtlasComplet: boolean = false



        private killInfoUi: KillInfoUi

        private cellUiItem: Array<KuaFuPkCellVo>;

        private kuaFuPkTopPanel: KuaFu3v3PkTopPanel
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;



            this.kuaFuPkTopPanel.setRender(this._bottomRender, this._midRender, this._topRender);
            this.addVirtualContainer(this.kuaFuPkTopPanel);


            this.killInfoUi = new KillInfoUi(this, this._bottomRender, this._topRender)


            this.cellUiItem = new Array;
            for (var i: number = 0; i < 3; i++) {
                this.cellUiItem.push(new KuaFuPkCellVo(this._bottomRender, this._midRender, this._topRender, i))
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh();

        }


        public refresh(): void {

            if (this.uiAtlasComplet) {
                KuaFu3v3Model.getInstance().refreshKufuData();
                if (KuaFu3v3Model.getInstance().selfVo) {
                    var $num: number = 0
                    for (var i: number = 0; i < KuaFu3v3Model.getInstance().kuafuItem.length; i++) {
                        var $vo: Kuafu3V3dataVo = KuaFu3v3Model.getInstance().kuafuItem[i];
                        if ($vo.group == KuaFu3v3Model.getInstance().selfVo.group) {
                            this.cellUiItem[$num].draw($vo, this)
                            $num++
                        }
                    }
                }
                this.kuaFuPkTopPanel.reeee()
            }
        }
        public showKillLastInfo(a: number, b: number): void {
            var $A: Kuafu3V3dataVo = KuaFu3v3Model.getInstance().kuafuItem[a];
            var $B: Kuafu3V3dataVo = KuaFu3v3Model.getInstance().kuafuItem[b];
            this.killInfoUi.pushKillData($A, $B);
        }
        public butClik(evt: InteractiveEvent): void {

        }


        private update(t: number): void {
            if (KuaFu3v3Model.getInstance().end) {
                return;
            }
            this.kuaFuPkTopPanel.update(t);
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updateFun);
            }
        }
        private updateFun: Function;

        public show(): void {

            this.kuaFuPkTopPanel.initTime()
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addFrameTick(this.updateFun);
        }
        public hide(): void {

            UIManager.getInstance().removeUIContainer(this);

        }


    }
}