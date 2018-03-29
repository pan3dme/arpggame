module leftui {

    export class LeftFamilyUiPanel extends UIPanel {
        private _bottomRender: UIRenderComponent
        private _topRender: UIRenderComponent;
     
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.left = 40;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();

            this._tickFun = () => { this.upTimeFrame() };


        }
        public upTimeFrame(): void {

            if (this.hasStage) {
                if (this.left >= 0 && GuidData.faction) {
                  
                    for (var k: number = 0; k < this.showItemVo.length; k++) {
                        this.showItemVo[k].refresh();
                    }
                }
            } else {
                TimeUtil.removeTimeTick(this._tickFun);
            }
        }
        private _tickFun: Function;
    
        private bFun: Function;
        private mask_mc:UICompenent
        public loadAtlas($bfun:Function): void
        {
            this.bFun = $bfun
            this._topRender.uiAtlas.setInfo("ui/uidata/mainui/left/familyleft/familyleft.xml", "ui/uidata/mainui/left/familyleft/familyleft.png", () => { this.loadConfigCom() });
        }
        private uiVoItem: Array<FamilyLeftUiVo>;

        private familyLinPai: FamilyLinPai
        private familyBoss: FamilyBoss
        private boosChallenge: BoosChallenge
        private familyPk: FamilyPk

        private loadConfigCom(): void {
            this.uiVoItem=new Array
            this._bottomRender.uiAtlas=this._topRender.uiAtlas
            this.mask_mc = this.addEvntBut("mask_mc", this._bottomRender);

            this.familyLinPai=new FamilyLinPai(this, this._bottomRender, this._topRender, 0);
            this.familyBoss =new FamilyBoss(this, this._bottomRender, this._topRender, 1);
            this.boosChallenge =new BoosChallenge(this, this._bottomRender, this._topRender, 2);
            this.familyPk =new FamilyPk(this, this._bottomRender, this._topRender, 3);

            this.uiVoItem.push(this.familyLinPai);
            this.uiVoItem.push(this.familyBoss);
            this.uiVoItem.push(this.boosChallenge);
            this.uiVoItem.push(this.familyPk);


            this._listMask = new UIMask();
            this._listMask.x = this.mask_mc.x
            this._listMask.y = this.mask_mc.y
            this._listMask.width = this.mask_mc.width;
            this._listMask.height = this.mask_mc.height;

            this.addMask(this._listMask);
            this._bottomRender.mask = this._listMask;
            this._topRender.mask = this._listMask;

            if (this.bFun) {
                this.bFun();
            }
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.mask_mc:
                    this.taskListMouseDown(evt);
                    break
                default:
                    break
            }
        }
        private _lastMouseY: number = 0;
        private _lastFriendTy: number = 0;
        private _isMoveBar: boolean = false
        private taskListMouseDown(evt: InteractiveEvent): void {
            this._isMoveBar = false
            this._lastMouseY = evt.y;
            this._lastFriendTy = this.mouseTy
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);

        }
        private onStageMouseMove(evt: InteractiveEvent): void {
            this._isMoveBar = true
            this.mouseTy = this._lastFriendTy + (evt.y - this._lastMouseY);
            this.tureTy();
       
        }
        private onStageMouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onStageMouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this._isMoveBar = false
            if (this._lastMouseY == evt.y) {
                this.clikUi(evt)
            }
        }
        private clikUi(evt: InteractiveEvent): void
        {
            for (var k: number = 0; k < this.showItemVo.length; k++) {
                this.showItemVo[k].clik(evt)
            }
        }
       
        private showItemVo: Array<FamilyLeftUiVo>
        public refresh(): void {
            this.showItemVo = this.getShowItemVo();
            this.maxShowRect=new Rectangle()
            for (var i: number = 0; i < this.showItemVo.length; i++) {
                this.showItemVo[i].rect.y = this.maxShowRect.height;
                this.maxShowRect.height += this.showItemVo[i].rect.height
            }
            this.tureTy();
        }
        private getShowItemVo(): Array<FamilyLeftUiVo>
        {
            var $arr: Array<FamilyLeftUiVo> = new Array
            var $showData: Array<number> = [0, 1];
            for (var i: number = 0; i < this.uiVoItem.length; i++) {
                var $has: boolean = false;
                for (var j: number = 0; j < $showData.length; j++) {
                    if ($showData[j] == this.uiVoItem[i].id) {
                        $arr.push(this.uiVoItem[i])
                        $has = true
                    }
                }
                if ($has) {
                    this.uiVoItem[i].show()
                } else {
                    this.uiVoItem[i].hide()
                }
            }
            return $arr

        }

        private maxShowRect: Rectangle;
        private mouseTy: number = 0;
        private tureTy(): void
        {
            this.mouseTy = Math.min(this.mouseTy, 0);
            if (this.maxShowRect.height > this._listMask.height) {
                this.mouseTy = Math.max(this.mouseTy, this._listMask.height - this.maxShowRect.height)
            } else {
                this.mouseTy = 0
            }
            for (var k: number = 0; k < this.showItemVo.length; k++) {
                this.showItemVo[k].y = this.showItemVo[k].rect.y + this._listMask.y + this.mouseTy;
            }
        }
        private _listMask:UIMask
        public show(): void
        {
            UIManager.getInstance().addUIContainer(this);
            TimeUtil.addTimeTick(1000, this._tickFun);
        }
        public hide(): void
        {
 
            UIManager.getInstance().removeUIContainer(this);
  
        }
    }
}