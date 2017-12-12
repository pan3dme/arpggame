module social {

    export class AddFriendPanel extends WindowMinUi {

        private _AbgRender: UIRenderComponent;
        private _AbottomRender: UIRenderComponent;
        private _AbaseRender: UIRenderComponent;
        private _AtopRender: UIRenderComponent;


        public dispose(): void {
            this._AbgRender.dispose();
            this._AbgRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
            this._AtopRender.dispose();
            this._AtopRender = null;

            if (this.addfriendList) {
                this.addfriendList.dispose();
                this.addfriendList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            this.setBlackBg();

            //添加好友面板渲染器
            this._AbgRender = new UIRenderComponent;
            this.addRender(this._AbgRender)
            this._AbottomRender = new UIRenderComponent;
            this.addRender(this._AbottomRender)
            this._AbaseRender = new UIRenderComponent;
            this.addRender(this._AbaseRender)
            this._AtopRender = new UIRenderComponent;
            this.addRender(this._AtopRender)

            this._AbgRender.uiAtlas = new UIAtlas;

            this.upDataFun = (t: number) => { this.update(t) }
        }

        public applyLoad(): void {
            this._AbottomRender.uiAtlas = WindowUi.winUIAtlas
            this._AbgRender.uiAtlas.setInfo("ui/uidata/social/socialmodel.xml", "ui/uidata/social/socialmodel.png", () => { this.loadConfigCom() }, "ui/uidata/social/socialpc.png");
        }

        private lasttime: number = 0;
        private update(t): void {
            this.setUiListVisibleByItem([this.aF_time], true);
            var currentnum: number = Math.ceil((this.nextTime - TimeUtil.getTimer()) / 1000);
            if (this._AtopRender) {
                if (this.lasttime != currentnum) {
                    LabelTextFont.writeSingleLabel(this._AtopRender.uiAtlas, this.aF_time.skinName, currentnum + "秒", 14, TextAlign.LEFT, ColorType.colorb96d49);
                    this.lasttime = currentnum;
                }
                if (TimeUtil.getTimer() > this.nextTime) {
                    TimeUtil.removeFrameTick(this.upDataFun)
                    this.setUiListVisibleByItem([this.aF_time], false);
                }
            } else {
                TimeUtil.removeFrameTick(this.upDataFun)
            }

        }
        private upDataFun: Function;

        public addfriendList: AddFriendList;
        // public init($uiAtlas: UIAtlas, $publicuiAtlas: UIAtlas): void {
        //     this._AbgRender.uiAtlas = $uiAtlas;
        //     this._AbottomRender.uiAtlas = $publicuiAtlas;
        //     this._AbaseRender.uiAtlas = $uiAtlas;
        //     this._AtopRender.uiAtlas = $uiAtlas;
        //     this.loadConfigCom();
        // }

        private aF_time: UICompenent;
        private _a_8: UICompenent;
        private a_btn: UICompenent;
        private aF_refreshbtn: UICompenent;
        private aF_bg1_1: UICompenent;
        private listIndex1: UICompenent;
        private loadConfigCom(): void {
            this._AbaseRender.uiAtlas = this._AbgRender.uiAtlas;
            this._AtopRender.uiAtlas = this._AbgRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._AtopRender;
            this.a_btn = this.addEvntButUp("a_btn", renderLevel);
            this.aF_refreshbtn = this.addEvntButUp("aF_refreshbtn", renderLevel);
            this.addUIList(["aF_txt3", "aF_txt2", "aF_txt1", "line1111", "line11111", "aF_txt", "line22", "line3_1"], renderLevel);
            this.aF_time = <UICompenent>renderLevel.getComponent("aF_time");

            this._a_8 = this.addChild(<UICompenent>renderLevel.getComponent("a_8"));
            this.aF_bg1_1 = this.addEvntButUp("aF_bg1_1", this._AbaseRender);

            this.listIndex1 = this.addChild(renderLevel.getComponent("listIndex1"));

            this._msg = "输入玩家昵称或者ID"
            this._type = false;
            this.refreshInputBfun(this._msg, this._type);

            this.applyLoadComplete();
            this.resize();
        }

        private _msg: string
        private _type: boolean

        public resize(): void {
            super.resize();
            if (this.addfriendList) {
                this.addfriendList.left = this.listIndex1.parent.x / UIData.Scale + this.listIndex1.x
                this.addfriendList.top = this.listIndex1.parent.y / UIData.Scale + this.listIndex1.y
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);

            if (!this.addfriendList) {
                this.addfriendList = new AddFriendList();
                this.addfriendList.init(this._AbaseRender.uiAtlas);
            }
            this.addfriendList.show();
            this.listrecommend();
            this.resize();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            this.addfriendList.hide();
        }

        private nextTime: number = 0

        private listrecommend(): void {
            if (TimeUtil.getTimer() > this.nextTime) {
                this.nextTime = TimeUtil.getTimer() + 5 * 1000
                TimeUtil.addFrameTick(this.upDataFun)
                this.addfriendList.recommend();
            }
        }

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break
                case this.aF_refreshbtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this.listrecommend();
                    break
                case this.aF_bg1_1:
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._type ? this._msg : "", 0, 12)
                    break
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this.addFriend();
                    break
                default:
                    break;
            }
        }

        public addFriend(): void {
            // for (var i: number = 0; i < GameInstance.roleList.length; i++) {
            //     if (GameInstance.roleList[i].unit.isPlayer() && GameInstance.roleList[i] != GameInstance.mainChar) {
            //         NetManager.getInstance().protocolos.social_add_friend(this.itdata.data.guid);
            //         console.log("发送成功");
            //         var $evt = new social.SocialUiEvent(social.SocialUiEvent.REFRESHADDlIST_EVENT);
            //         $evt.index = this.itdata.id;
            //         ModuleEventManager.dispatchEvent($evt);
            //         break;
            //     }
            // }
            if (this._msg) {
                NetManager.getInstance().protocolos.social_add_friend_byname(this._msg);
                this.inputBfun("");
            }

        }

        private inputBfun($str: string): void {
            if ($str.length > 0) {
                this._type = true;
                this._msg = $str;
            } else {
                this._type = false;
                this._msg = "输入玩家昵称或者ID";
            }
            this.refreshInputBfun(this._msg, this._type)
        }

        private refreshInputBfun($str: string, $type: boolean): void {
            LabelTextFont.writeSingleLabel(this._AtopRender.uiAtlas, this._a_8.skinName, $str, 16, TextAlign.CENTER, ColorType.colorb96d49);
        }
    }
}