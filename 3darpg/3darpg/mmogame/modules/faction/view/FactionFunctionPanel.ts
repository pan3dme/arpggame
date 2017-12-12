module faction {

    export class FactionFunctionPanel extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        // private _bigPic: UIRenderOnlyPicComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;

        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            // this._bigPic = new UIRenderOnlyPicComponent();
            // this.addRender(this._bigPic)
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
        }

        public parentWindow: ExistFactionUiPanel;
        public initUiAtlas($uiAtlas, $win: ExistFactionUiPanel): void {
            // this._bigPic.uiAtlas = $uiAtlas;
            this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this.parentWindow = $win;
            var renderLevel: UIRenderComponent = this._baseRender;

            this.initView(renderLevel);
        }

        public onAdd(): void {
            this.showBg();
        }

        public onRemove(): void {
            this.hideBg();
        }

        private _bgInit: boolean = false;
        public showBg(): void {
            if (this.parentWindow && !this._bgInit) {
                var ui: UICompenent = this.parentWindow.loadBigPicByUrl("ui/uidata/faction/factionbg.png");
                this._bgInit = true;
                ui.width = 824;
                ui.height = 448;
            }
            if (this.parentWindow) {
                this.parentWindow.addBigPic();
            }

        }

        public hideBg(): void {
            if (this.parentWindow) {
                this.parentWindow.removeBigPic();
            }
        }

        private _aryBgUI: Array<UICompenent>;
        private _aryLevUI: Array<UICompenent>;
        private _aryNameUI: Array<UICompenent>;
        private _aryOpenUI: Array<UICompenent>;
        private initView(renderLevel: UIRenderComponent): void {
            var renderLevel: UIRenderComponent = this._baseRender;
            //大背景
            // this._bigPic.setImgUrl("ui/uidata/faction/factionbg.png");
            // this.addChild(this._bigPic.getComponent("ccav"));

            var x_bg1A2 = this.addChild(<UICompenent>this._baseRender.getComponent("x_bg1A2"));
            x_bg1A2.isU = true;

            var ary = FactionBuildModel.getInstance().getList();
            this._aryBgUI = new Array;
            this._aryLevUI = new Array;
            this._aryNameUI = new Array;
            this._aryOpenUI = new Array;
            for (var i = 0; i < ary.length; i++) {
                var but: UICompenent = this.addChild(this._bgRender.getComponent("b_btnbg" + i));
                but.addEventListener(InteractiveEvent.Up, this.equClick, this);
                this._aryBgUI.push(but);
                this._aryLevUI.push(this.addChild(renderLevel.getComponent("b_lev" + i)));
                this._aryNameUI.push(this.addChild(renderLevel.getComponent("b_name" + i)));
                this._aryOpenUI.push(this.addChild(renderLevel.getComponent("b_noopen" + i)));
            }
        }

        public resetData(): void {
            var ary = FactionBuildModel.getInstance().getList();
            console.log("---ary---", ary);
            for (var i = 0; i < ary.length; i++) {
                this._aryBgUI[i].data = ary[i];
                this.setUiListVisibleByItem([this._aryOpenUI[i]], ary[i].state == 2);
                // this.setUiListVisibleByItem([this._aryBgUI[i]], ary[i].state != 2);
                this.setUiListVisibleByItem([this._aryLevUI[i]], ary[i].state != 2);
                this.setUiListVisibleByItem([this._aryNameUI[i]], ary[i].state != 2);
                this._aryBgUI[i].x = ary[i].data.pos[0]
                this._aryBgUI[i].y = ary[i].data.pos[1]
                if (ary[i].state != 2) {
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryLevUI[i].skinName, "Lv" + ary[i].data.level, 16, TextAlign.CENTER, ColorType.Whitefffce6);
                    LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this._aryNameUI[i].skinName, String(ary[i].data.name), 16, TextAlign.CENTER, ColorType.Whitefffce6);
                    this._aryNameUI[i].x = this._aryLevUI[i].x = this._aryBgUI[i].x + 19
                    this._aryLevUI[i].y = this._aryBgUI[i].y + 5
                    this._aryNameUI[i].y = this._aryBgUI[i].y + 25;
                } else {
                    this._aryOpenUI[i].x = this._aryBgUI[i].x + 48
                    this._aryOpenUI[i].y = this._aryBgUI[i].y + 12
                }
            }
            this.resize();
        }

        private equClick($evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($evt.target);
            var vo: FBuildItemVo = $evt.target.data
            if (vo.state == 2) {
                msgtip.MsgTipManager.outStrById(22, 56);
                return;
            }

            // ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.HIDE_EXISTFACTIONUI_EVENT));
            ModulePageManager.openPanel(vo.data.goto, vo.data.goto_sub);
        }



        public resize(): void {
            super.resize();
        }


        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }
}