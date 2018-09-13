module newbieguide {
    export class OptionalGuidePop extends UIPanel {

        public _bottomRender: UIRenderComponent;
        public _baseRender: AlphaUIRenderComponent;
        public _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0
            this.left = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new AlphaUIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public applyLoad(): void {
            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            // this._bottomRender.uiAtlas = $publicbgUiAtlas;
            this._baseRender.setInfo("ui/uidata/poptimeout/newbieguide.xml", "ui/uidata/poptimeout/newbieguide.png", () => { this.loadConfigCom() });
            // });
        }

        private _rect: Rectangle;
        private _type: number;
        private _text: string;
        private tb: tb.TB_system_guide
        private _starttime: number
        public initData($tb: tb.TB_system_guide): void {
            this.tb = $tb
            this._type = $tb.type;
            this._text = $tb.text

            this._rect = this.getLayoutRect();

            this.showItems();
            this._scale = 1;
            this._num = 0;
            TimeUtil.addFrameTick(this.upDataFun);

        }
        private getLayoutRect(): Rectangle {
            var $tb: tb.TB_system_guide = this.tb
            var $rect: Rectangle = new Rectangle();
            var $pos: Vector2D = new Vector2D($tb.area[0], $tb.area[1])
            $pos = UiTweenVo.getPosByPanel($pos, $tb.layout)
            $rect.x = $pos.x
            $rect.y = $pos.y
            $rect.width = $tb.area[2];
            $rect.height = $tb.area[3];
            return $rect
        }

        private loadConfigCom(): void {
            this._topRender.uiAtlas = this._baseRender.uiAtlas
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas
            this.initUI();
            this.upDataFun = (t: number) => { this.update(t) }
            this.applyLoadComplete();
        }


        private b_1: AlphaGrid9UICompenent
        private b_2: UICompenent
        private b_3: UICompenent
        private b_4: FrameCompenent
        private initUI(): void {
            var renderLevel: UIRenderComponent = this._baseRender

            this.b_2 = <UICompenent>renderLevel.getComponent("b_2");
            this.b_1 = <AlphaGrid9UICompenent>this.addChild(renderLevel.getComponent("b_1"));
            this.b_3 = this.addChild(<UICompenent>this._topRender.getComponent("b_3"));
            this.b_4 = <FrameCompenent>this._topRender.getComponent("b_4");

 
        }

        private upDataFun: Function
        private _scale: number;
        private _num: number
        private update(t): void {
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.upDataFun);
            }


            //this._scale = 1
            //this.b_1.alpha = 1

            var bbb = this._num % 60;
            if (bbb == 0) {
                this._scale = 1.2
                this.b_1.alpha = 1
            } else {
                this._scale -= 0.003
                if (bbb >= 49) {
                    this.b_1.alpha -= 0.1
                }
            }

            var $aaa = this.getNewVect(this._scale);
            this.drawHighlighted($aaa);
            this._baseRender.applyObjData();
            this._num++;
        }

        private getNewVect($scale: number): Rectangle {
            var $rec: Rectangle = new Rectangle();
            if ($scale > 1) {
                $rec.width = $scale * this._rect.width
                $rec.height = $scale * this._rect.height
                $rec.x = this._rect.x - (($rec.width - this._rect.width) / 2);
                $rec.y = this._rect.y - (($rec.height - this._rect.height) / 2);
            } else {
                $rec = this._rect;
            }

            return $rec;
        }



        private showItems(): void {

  
            if (this._text.length > 0) {
                this.setUiListVisibleByItem([this.b_2, this.b_4], true);

                var ary: Array<number> = LabelTextFont.writeText(this._topRender.uiAtlas, this.b_3.skinName, 0, 0, this._text, 16, "#4c2605", 225, true);
                this.b_2.width = ary[0] + 30
                this.b_2.height = ary[1] + 20

                var posary: Array<number> = this.getposxAndposy();

                this.b_3.x = posary[0] + 15
                this.b_3.y = posary[1] + 10

                this.b_2.x = posary[0]
                this.b_2.y = posary[1]
            } else {
                this.setUiListVisibleByItem([this.b_2, this.b_4], false);
                LabelTextFont.clearLabel(this._topRender.uiAtlas, this.b_3.skinName);
            }

            this._baseRender.applyObjData();
        }

        private drawHighlighted($rect): void {
            this.b_1.x = $rect.x
            this.b_1.y = $rect.y
            this.b_1.width = $rect.width
            this.b_1.height = $rect.height
        }


        private getposxAndposy(): Array<number> {
            var posx;
            var posy;
            var index: number;
            switch (this._type) {
                case 1:
                    //上
                    posx = this._rect.x - ((this.b_2.width - this._rect.width) / 2);
                    posy = this._rect.y - this.b_2.height - 10;
                    index = 1
                    this.b_4.x = posx + this.b_2.width / 2 - this.b_4.width / 2
                    this.b_4.y = this._rect.y - 20
                    break;
                case 2:
                    //右
                    posx = this._rect.x + this._rect.width + 10;
                    posy = this._rect.y - ((this.b_2.height - this._rect.height) / 2);
                    index = 3
                    this.b_4.x = posx - this.b_4.width * 0.5
                    this.b_4.y = posy + this.b_2.height / 2 - this.b_4.height / 2
                    break;
                case 3:
                    //下
                    posx = this._rect.x - ((this.b_2.width - this._rect.width) / 2);
                    posy = this._rect.y + this._rect.height + 10;
                    index = 0

                    this.b_4.x = posx + this.b_2.width / 2 - this.b_4.width / 2
                    this.b_4.y = posy - this.b_4.height * 0.6
                    break;
                case 4:
                    //左
                    posx = this._rect.x - this.b_2.width - 10;
                    posy = this._rect.y - ((this.b_2.height - this._rect.height) / 2);
                    index = 2

                    this.b_4.x = this._rect.x - 23
                    this.b_4.y = posy + this.b_2.height / 2 - this.b_4.height / 2
                    break;
            }

            this.b_4.goToAndStop(index);
            return [posx, posy];
        }


        public resize(): void {
            this.width = Scene_data.stageWidth / UIData.Scale;
            this.height = Scene_data.stageHeight / UIData.Scale;
            super.resize();
            this._rect = this.getLayoutRect();
            this.showItems()
        }

        public clickEvt($evt: InteractiveEvent): void {
            return;
        }
    }
}