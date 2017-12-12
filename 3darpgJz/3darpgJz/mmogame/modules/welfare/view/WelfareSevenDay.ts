module welfare {

    export class WelfareSevenDay extends UIVirtualContainer {
        private _bigPic: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._bigPic.dispose();
            this._bigPic = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._bigPic.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private mountRoleSprite: Person2DChar;
        private titleary: Array<UICompenent>
        private iconary: Array<UICompenent>
        private nameary: Array<UICompenent>
        private btnary: Array<FrameCompenent>
        private b_role: UICompenent
        private initView(): void {
            var renderLevel = this._baseRender;

            //大背景
            this.addChild(this._bigPic.getComponent("c_pic"));
            this._bigPic.setImgUrl("ui/uidata/welfare/sevendaybg.png");

            this.b_role = this.addChild(this._baseRender.getComponent("b_role"));
            this.titleary = new Array
            this.nameary = new Array
            this.btnary = new Array
            for (var i = 0; i < 7; i++) {
                this.addChild(this._baseRender.getComponent("b_titlebg" + i));
                this.titleary.push(this.addChild(this._topRender.getComponent("b_title" + i)));
                this.nameary.push(this.addChild(this._topRender.getComponent("b_name" + i)));
                var btn = <FrameCompenent>this.addChild(this._topRender.getComponent("b_btn" + i));
                btn.addEventListener(InteractiveEvent.Up, this.receiveClik, this);
                this.btnary.push(btn);
            }

            this.iconary = new Array
            for (var j = 0; j < 6; j++) {
                this.iconary.push(this.addChild(this._topRender.getComponent("b_prop" + j)));
                this.addChild(this._bottomRender.getComponent("b_bg" + j));
            }

            this.mountRoleSprite = new Person2DChar();
            this.mountRoleSprite.needUIUrl = false;
            // this.mountRoleSprite.showAvatarVisibel = false
            // this.mountRoleSprite.setAvatar(6013);
            this._baseRender.addModel(this.mountRoleSprite);
        }


        public setAvatar($avatar: number): void {
            console.log("---$avatar--", $avatar);
            this.mountRoleSprite.setAvatar($avatar);
        }

        private resizeRole(): void {
            if (this.mountRoleSprite) {
                this.mountRoleSprite.resize();
                this.mountRoleSprite.scale = 4 * UIData.Scale;
                this.mountRoleSprite.rotationY = 0
                this.mountRoleSprite.x = -203 * UIData.Scale;
                this.mountRoleSprite.y = -90 * UIData.Scale;
            }
        }


        public resize(): void {
            this.resizeRole();
            super.resize();
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //请求数据
            this.resetData();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public resetData(): void {
            var a: Array<SevenDayaItemData> = GuidData.quest.getSevenDayList();
            for (var i = 0; i < a.length; i++) {
                this.btnary[i].data = a[i];
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.titleary[i].skinName, "登陆" + a[i].data.id + "天可领取", 16, TextAlign.CENTER, ColorType.Whitefff4d6);
                this.btnary[i].goToAndStop(a[i].state);
                if (i < a.length - 1) {
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.nameary[i].skinName, GameData.getPropName(a[i].data.item[0][0]), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                    IconManager.getInstance().drawItemIcon60(this.iconary[i], a[i].data.item[0][0], a[i].data.item[0][1], false, true);
                } else {
                    console.log("---a[i].data.show--", a[i].data.show, i, a[i]);
                    UiDraw.clearUI(this.nameary[i]);
                    this.setAvatar(a[i].data.show);
                }
            }
            this.resize();
        }


        public receiveClik(evt: InteractiveEvent) {
            var data: SevenDayaItemData = evt.target.data
            console.log("---data",data);
            if (data && data.state == 1) {
                NetManager.getInstance().protocolos.welfare_get_sevenday_reward(data.data.id);
                console.log("---data.data.id");
            }
        }
    }
}