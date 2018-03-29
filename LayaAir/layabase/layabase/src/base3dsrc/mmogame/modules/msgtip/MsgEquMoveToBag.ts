module msgtip {
    export class MoveTipUiRender extends AlphaUIRenderComponent {
        public constructor() {
            super();
            this.uiAtlas = new UIAtlas();
            this.uiAtlas.configData = new Array();
            
        }
        private picUi: AlphaUICompenent
        private makeSamplePic(): void {
            this.uiAtlas.configData.push(this.uiAtlas.getObject("picSkin", 0, 0, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.picUi = <AlphaUICompenent>this.creatBaseComponent("picSkin");

            var $basePos: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(150, 123), { width: UIData.designWidth, height: UIData.designHeight, left: 0, middle: 0 })

            //this.picUi.width = this.uiAtlas.textureRes.width;
            //this.picUi.height = this.uiAtlas.textureRes.height;
            this.picUi.width = 50;
            this.picUi.height = 50;
            this.picUi.x =  $basePos.x;
            this.picUi.y = $basePos.y;
            this.container.addChild(this.picUi);

            var $bagPos: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(277, 476), { width: UIData.designWidth, height: UIData.designHeight, center: 0, bottom:0})
            TweenMoveTo(this.picUi, 1, { x: $bagPos.x, y: $bagPos.y, width: 30, height: 30, onComplete: () => { this.changeButEnd() } });
        }
        public changeButEnd(): void {
            if (this.bFun) {
                this.bFun()
            }
        }
        public bFun: Function;
        public setTextures($textureRes: TextureRes): void {

            this.uiAtlas.textureRes = $textureRes
            this.makeSamplePic();
        }

    }
    export class MoveTipUi {

        public moveTipUiRender: MoveTipUiRender;

        public container: UIConatiner;
        public constructor($cs: UIConatiner) {
            this.container = $cs;
            this.moveTipUiRender = new MoveTipUiRender();
            this.container.addRender(this.moveTipUiRender);

        }
        public loadPicData($id: number): void {
            var a: string = GameData.getIconCopyUrl($id)
            this.moveTipUiRender.bFun = () => { this.playEnd() }
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + a, ($aaaa: TextureRes) => {
                this.moveTipUiRender.setTextures($aaaa);

            });
        }
        public playEnd(): void {
            this.container.removeRender(this.moveTipUiRender);
            this.moveTipUiRender.dispose();
        }
    }
    export class MsgEquMoveToBag extends UIConatiner {

        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0
            this.left = 0;
            this.frameUpFun = (t: number) => { this.upData(t) }
            TimeUtil.addFrameTick(this.frameUpFun)
        }
        private frameUpFun: Function
        public upData(t: number): void {
            if (this.renderList.length <= 0) {
                this.close();
            }
        }
        public setSystemData($id: number): void {
            var $vo: MoveTipUi = new MoveTipUi(this)
            $vo.loadPicData($id)
        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.dispose()
        }
        public dispose(): void {
            MsgEquMoveToBag.msgEquMoveToBag = null;
            TimeUtil.removeFrameTick(this.frameUpFun);
            this.frameUpFun = null;
        }
        private static msgEquMoveToBag: MsgEquMoveToBag
        public static show(value: number) {
            if (!this.msgEquMoveToBag) {
                this.msgEquMoveToBag = new MsgEquMoveToBag();
            }
            this.msgEquMoveToBag.setSystemData(value);
            UIManager.getInstance().addUIContainer(this.msgEquMoveToBag);
        }

    }
}