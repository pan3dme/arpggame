module msgtip {
    export class SkillTipPicRender extends AlphaUIRenderComponent {
        public constructor() {
            super();
            this.uiAtlas = new UIAtlas();
            this.uiAtlas.configData = new Array();
        }
        private picUi: AlphaUICompenent
        private makeSamplePic(): void {
            this.uiAtlas.configData.push(this.uiAtlas.getObject("picSkin", 0, 0, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height, this.uiAtlas.textureRes.width, this.uiAtlas.textureRes.height));
            this.picUi = <AlphaUICompenent>this.creatBaseComponent("picSkin");
            var $basePos: Vector2D = new Vector2D(UIData.designWidth / 2-150, UIData.designHeight / 2-50);
            this.picUi.width = this.uiAtlas.textureRes.width;
            this.picUi.height = this.uiAtlas.textureRes.height;
            this.picUi.x = - this.picUi.width / 2 + $basePos.x;
            this.picUi.y = - this.picUi.height / 2 + $basePos.y;
            this.container.addChild(this.picUi);

           
            var $uiTweenVo: UiTweenVo= new UiTweenVo;
            $uiTweenVo.ui = this.picUi;
            $uiTweenVo.scale = 1;
            this.picUi.alpha = 0;
            TweenMoveTo(this.picUi, 0.2, { alpha: 1 });
            TweenMoveTo($uiTweenVo, 0.2, { scale: 1.3 });
            TimeUtil.addTimeOut(1500, () => {
                 TweenMoveTo(this.picUi, 0.1, { alpha: 0.3 });
                 TweenMoveTo($uiTweenVo, 0.1, { scale: 0.6, onComplete: () => { this.changeButEnd() } });
            });
            
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
    export class SkillTipUi {
      
        public picRender: SkillTipPicRender;

        public container: UIConatiner;
        public constructor($cs: UIConatiner) {
            this.container = $cs;
    
            this.picRender = new SkillTipPicRender();
            this.container.addRender(this.picRender);

        }

        public loadPicData($id: number): void {
            console.log("技能图标", $id)
            this.picRender.bFun = () => { this.playEnd() }
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + this.getIconById($id), ($aaaa: TextureRes) => {
                this.picRender.setTextures($aaaa);
            });
        }
        private getIconById($id:number): string
        {
            var a: string = "ui/load/toptip/skillpic/"+$id+".png";
            return  a
        }
        public playEnd(): void {
            this.container.removeRender(this.picRender);
            this.picRender.dispose();


        }
    }
    export class MsgSkillTipPanel extends UIConatiner {

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
        public setSystemData($id: number): void {
            var $vo: SkillTipUi = new SkillTipUi(this)
            $vo.loadPicData($id)
 
        }
        private close(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.dispose()
        }
        public dispose(): void {
            MsgSkillTipPanel.msgSkillTipPanel = null;
            TimeUtil.removeFrameTick(this.frameUpFun);
            this.frameUpFun = null;
        }
        private static msgSkillTipPanel: MsgSkillTipPanel
        public static show(value: number) {
            if (!this.msgSkillTipPanel) {
                this.msgSkillTipPanel = new MsgSkillTipPanel();
            }
            this.msgSkillTipPanel.setSystemData(value);
            UIManager.getInstance().addUIContainer(this.msgSkillTipPanel);
        }

    }
}