module msgtip {
    export class MsgPicData {
        public type: number; //1升级 2特效提示;
        public info: any;   //数字或图片地址;
    }
    export class MsgPicVo {
        public ui: UICompenent;
        public data: MsgPicData
        public time: number;
    }
    export class FrameTipUi {
        public bottomRender: MoveFrameComponent;
        public topRender: MovePicComponent;
        public container: UIConatiner;
        public constructor($cs: UIConatiner) {
            this.container = $cs;
            this.bottomRender = new MoveFrameComponent();
            this.topRender = new MovePicComponent();
            this.container.addRender(this.bottomRender);
            this.container.addRender(this.topRender);
        }
        public loadPic($msgPicData: MsgPicData): void {
            this.bottomRender.endFun = () => { this.playEndFun() }
            var a: string = "ui/load/toptip/ui_sj.png";
            var b: string;
            if ($msgPicData.type == 2) {
                b = String($msgPicData.info);
            } else {
                b = "ui/load/toptip/leveluptxtnew.png"
            }
            this.bottomRender.scale = 1.5;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + a, ($aaaa: TextureRes) => {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + b, ($bbbb: TextureRes) => {
                    this.bottomRender.setTextureTo($aaaa);
                    this.topRender.setTextureTo($bbbb, $msgPicData);
                });
            });

        }
        public playEndFun(): void {
            TimeUtil.addTimeOut(1, () => { //只算是规避闪硕的问题
                this.container.removeRender(this.bottomRender);
                this.container.removeRender(this.topRender);
            });
        }

    }
    export class MovePicComponent extends UIRenderComponent {
        public constructor() {
            super();
            this.uiAtlas = new UIAtlas();
            this.uiAtlas.configData = new Array();
        }
        private picUi: UICompenent;
        public setTextureTo($textureRes: TextureRes, $msgPicData: MsgPicData): void {

            this.uiAtlas.configData = new Array();
            this.uiAtlas.textureRes = $textureRes;

            if ($msgPicData.type == 1) {
                this.makeLevelUpPic($msgPicData.info)
            } else {
                this.makeSamplePic()
            }

        }

        private makeLevelUpPic($lev: number): void {

            var $levStr: string = String($lev);

            var $rect: Rectangle = new Rectangle(0, 0, $levStr.length * 20 + 90)

            var $basePos: Vector2D = new Vector2D(UIData.designWidth / 2, 100);
            $basePos.x -= $rect.width / 2;
            this.uiAtlas.configData.push(this.uiAtlas.getObject("leftSkin", 1, 31, 60, 28, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.uiAtlas.configData.push(this.uiAtlas.getObject("rightSkin", 61, 31, 30, 28, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.uiAtlas.configData.push(this.uiAtlas.getObject("frameskill", 2, 4, 170, 25, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, 10, 1));



            for (var i: number = 0; i < $levStr.length; i++) {
                var $numFrameUi: FrameCompenent = <FrameCompenent>this.createFrame("frameskill");
                $numFrameUi.width = 17;
                $numFrameUi.height = 25;
                $numFrameUi.x = i * 20 + $basePos.x + 60
                $numFrameUi.y = $basePos.y - 0;
                $numFrameUi.goToAndStop(Number($levStr.charAt(i)));
                this.container.addChild($numFrameUi);
            }


            var $leftUi: UICompenent = <UICompenent>this.creatBaseComponent("leftSkin");
            //$leftUi.width = 80;
            //$leftUi.height = 64;
            $leftUi.x = $basePos.x;
            $leftUi.y = $basePos.y;
            this.container.addChild($leftUi);

            var $rightUi: UICompenent = <UICompenent>this.creatBaseComponent("rightSkin");
            //$rightUi.width = 40;
            //$rightUi.height = 64;
            $rightUi.x = $basePos.x + ($rect.width - $rightUi.width);
            $rightUi.y = $basePos.y;
            this.container.addChild($rightUi);

            this.container.resize();
        }
        private makeSamplePic(): void {
            this.uiAtlas.configData.push(this.uiAtlas.getObject("picSkin", 0, 0, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.picUi = <UICompenent>this.creatBaseComponent("picSkin");
            var $basePos: Vector2D = new Vector2D(UIData.designWidth / 2, 100);
            this.picUi.width = this.uiAtlas.textureRes.width;
            this.picUi.height = this.uiAtlas.textureRes.height;
            this.picUi.x = - this.picUi.width / 2 + $basePos.x;
            this.picUi.y = - this.picUi.height / 2 + $basePos.y;
            this.container.addChild(this.picUi);
        }




    }
    export class MoveFrameComponent extends UIRenderComponent {
        public constructor() {
            super();
            this.uiAtlas = new UIAtlas();
            this.uiAtlas.configData = new Array();
        }
        private moveUi: FrameCompenent;

        public setTextureTo($img: TextureRes): void {

            var cellx: number = 2;
            var celly: number = 8;
            var $imgRect: Rectangle = new Rectangle(0, 0, $img.width, $img.height)
            var $textureRect: Rectangle = new Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));

            this.uiAtlas.textureRes = $img
            this.uiAtlas.configData = new Array();
            this.uiAtlas.configData.push(this.uiAtlas.getObject("frameskill", 0, 0, $imgRect.width, $imgRect.height, $textureRect.width, $textureRect.height, cellx, celly));
            this.moveUi = <FrameCompenent>this.createFrame("frameskill");


            this.moveUi.width = $imgRect.width / cellx * this.scale;
            this.moveUi.height = $imgRect.height / celly * this.scale;


            var $basePos: Vector2D = new Vector2D(UIData.designWidth / 2, 100);

            this.moveUi.x = - this.moveUi.width / 2 + $basePos.x
            this.moveUi.y = - this.moveUi.height / 2 + $basePos.y

            this.moveUi.speed = 2;
            this.container.addChild(this.moveUi);

            this.applyObjData();

        }

        public endFun: Function;
        public update(): void {
            if (this.moveUi) {
                if (this.moveUi.current >= this.moveUi.totalcurrent - 2) {
                    if (this.endFun) {
                        this.endFun();
                    }
                } else {
                    super.update();
                }
            }
        }
        public dispose(): void {
            super.dispose();
            this.moveUi = null;
        }

    }
    export class MsgTopCenterPic extends UIConatiner {

        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0;
            this.frameUpFun = (t: number) => { this.upData(t) }
            TimeUtil.addFrameTick(this.frameUpFun)
        }
        private frameUpFun: Function
        public upData(t: number): void {
            if (this.renderList.length <= 0) {
                this.close();
            }
        }
        private frameItem: Array<FrameTipUi> = new Array
        private _msgPicVoItem: Array<MsgPicVo> = new Array;
        public pushData(value: MsgPicData): void {
            var $FrameTipUi: FrameTipUi = new FrameTipUi(this)
            $FrameTipUi.loadPic(value)
            this.frameItem.push($FrameTipUi);
        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.dispose()
        }
        public dispose(): void {
            TimeUtil.removeFrameTick(this.frameUpFun);
            this.frameUpFun = null
            MsgTopCenterPic._msgTopCenterPic = null
        }

        private static _msgTopCenterPic: MsgTopCenterPic
        public static show(value: MsgPicData) {
            if (!this._msgTopCenterPic) {
                this._msgTopCenterPic = new MsgTopCenterPic();
            }
            this._msgTopCenterPic.pushData(value);
            UIManager.getInstance().addUIContainer(this._msgTopCenterPic);
        }

    }
}