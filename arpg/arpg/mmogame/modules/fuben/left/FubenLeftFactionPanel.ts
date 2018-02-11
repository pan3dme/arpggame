module fb {
    export class FubenLeftFactionPanel extends UIConatiner {
        private uiAtlasComplet: boolean = false;
        private _bottomRender: UIRenderComponent;
        //private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.left = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            // this._midRender = new UIRenderComponent();
            // this.addRender(this._midRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._bottomRender.uiAtlas = new UIAtlas;
            this._bottomRender.uiAtlas.setInfo("ui/uidata/fuben/left/fubenfactionleft.xml", "ui/uidata/fuben/left/fubenfactionleft.png", () => { this.loadConfigCom() });

        }


        private a_tittle_name: UICompenent;

        private a_mid_bg: UICompenent;

        private slab1: UICompenent;
        private slab2: UICompenent;
        private slab3: UICompenent;
        private sicon: UICompenent;

        private olab1: UICompenent;
        private olab2: UICompenent;
        private olab3: UICompenent;
        private oicon: UICompenent;

        private loadConfigCom(): void {


            this._topRender.uiAtlas = this._bottomRender.uiAtlas;

            this.a_mid_bg = this.addChild(this._bottomRender.getComponent("t_bg"));
            this.a_mid_bg.addEventListener(InteractiveEvent.Down, this.midClick, this);

            this.slab1 = this.addChild(this._topRender.getComponent("t_s1"));
            this.slab2 = this.addChild(this._topRender.getComponent("t_s2"));
            this.slab3 = this.addChild(this._topRender.getComponent("t_s3"));
            this.sicon = this.addChild(this._topRender.getComponent("t_icon1"));

            this.olab1 = this.addChild(this._topRender.getComponent("t_o1"));
            this.olab2 = this.addChild(this._topRender.getComponent("t_o2"));
            this.olab3 = this.addChild(this._topRender.getComponent("t_o3"));
            this.oicon = this.addChild(this._topRender.getComponent("t_icon2"));

            this.uiAtlasComplet = true;
            this.refresh();

        }

        private midClick($e: InteractiveEvent): void { }

        public refresh(): void {
            if (this.uiAtlasComplet) {

                var obj: any = GuidData.map.getFactionFubenInfo();

                var data: any = TableData.getInstance().getData(TableData.tb_faction_match_base, 1);

                //蓝方
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.slab1.skinName, ColorType.colorfff2d3 + (obj.g2 ? "本方" : "敌方") + "资源:" + obj.s2 + "/" + data.target_score, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.slab2.skinName, ColorType.colorfff2d3 + "人数：" + obj.m2, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.slab3.skinName, ColorType.colorfff2d3 + "资源点：" + obj.f2, 14, TextAlign.LEFT);

                //红方
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.olab1.skinName, ColorType.colorfff2d3 + (obj.g1 ? "本方" : "敌方") + "资源:" + obj.s1 + "/" + data.target_score, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.olab2.skinName, ColorType.colorfff2d3 + "人数：" + obj.m1, 14, TextAlign.LEFT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.olab3.skinName, ColorType.colorfff2d3 + "资源点：" + obj.f1, 14, TextAlign.LEFT);

                this.drawIcon(obj.i2, obj.i1);
            }
        }
        public reset(): void {
            this.iconAry = [-1, -1];
        }
        private iconAry: Array<number> = [-1, -1];
        public drawIcon(i1: number, i2: number): void {
            if (this.iconAry[0] != i1) {
                this.iconAry[0] = i1;
                LoadManager.getInstance().load(Scene_data.fileRoot + getload_FacBuildUrl(String(i1)), LoadManager.IMG_TYPE, ($img) => {
                    var $rec: UIRectangle = this._topRender.uiAtlas.getRec(this.sicon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, 42, 42);

                    this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            }

            if (this.iconAry[1] != i2) {
                this.iconAry[1] = i2;
                LoadManager.getInstance().load(Scene_data.fileRoot + getload_FacBuildUrl(String(i2)), LoadManager.IMG_TYPE, ($img) => {
                    var $rec: UIRectangle = this._topRender.uiAtlas.getRec(this.oicon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, 42, 42);

                    this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            }
        }



        private hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}