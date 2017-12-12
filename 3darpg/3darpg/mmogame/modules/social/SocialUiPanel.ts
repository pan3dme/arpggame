module social {

    export class SocialUiPanel extends WindowUi {
        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _PaneltopRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _redPointRender1: RedPointRender;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._PaneltopRender.dispose();
            this._PaneltopRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            this._redPointRender1.dispose();
            this._redPointRender1 = null;

            if (this.socialListPanel) {
                this.socialListPanel.dispose();
                this.socialListPanel = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._PaneltopRender = new UIRenderComponent;
            this.addRender(this._PaneltopRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);
            this._redPointRender1 = new RedPointRender;

            this._baseRender.uiAtlas = new UIAtlas();
        }

        public applyLoad(): void {
            this._publicRender.uiAtlas = WindowUi.winUIAtlas
            this._baseRender.uiAtlas.setInfo("ui/uidata/social/socialmodel.xml", "ui/uidata/social/socialmodel.png", () => { this.loadConfigCom() }, "ui/uidata/social/socialpc.png");
        }

        private _a_leftbottom: UICompenent;
        private _a_lefttop: UICompenent;
        private listIndex: UICompenent;

        public socialListPanel: SocialListPanel;
        public bottomUiparts: BottomUiparts;
        private tab_0: SelectButton;
        private tab_1: SelectButton;
        private loadConfigCom(): void {
            this.winmidRender.uiAtlas = this._publicRender.uiAtlas;
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;
            this._PaneltopRender.uiAtlas = this._baseRender.uiAtlas;


            var renderLevel: UIRenderComponent = this._topRender;

            this.initUI(renderLevel);
            var rightLinebg = this.addChild(this.winmidRender.getComponent("cnew_right_bg"));
            this.setSizeForPanelUiCopy(rightLinebg, "rightLinebg", this._bottomRender);
            var cnew_line = this.addChild(this._publicRender.getComponent("cnew_line"));
            this.setSizeForPanelUiCopy(cnew_line, "cnew_line", this._bottomRender);
            this.winmidRender.applyObjData();
            this._publicRender.applyObjData();

            this.addUIList(["a_title", "a_1", "a_4", "a_3", "a_2", "line1", "line11", "line111", "line2", "line3"], this._topRender);
            this.listIndex = this.addChild(this._topRender.getComponent("listIndex"));

            this.bottomUiparts = new BottomUiparts();
            this.bottomUiparts.setRender(this._bottomRender, this._baseRender, this._publicRender, this._topRender,this._redPointRender1);
            this.addVirtualContainer(this.bottomUiparts);


            this._redPointRender.getRedPointUI(this, 56, new Vector2D(this.tab_0.x + this.tab_0.width - 5, this.tab_0.y));
            this._redPointRender.getRedPointUI(this, 58, new Vector2D(this.tab_1.x + this.tab_1.width - 5, this.tab_1.y));

            this.applyLoadComplete();
        }

        private initUI(renderLevel: UIRenderComponent): void {

            this.tab_0 = <SelectButton>this.addEvntBut("tab_0", this._bottomRender);
            this.tab_1 = <SelectButton>this.addEvntBut("tab_1", this._bottomRender);
        }


        private selecttype($value: number): void {
            if ($value == 0) {
                this.tab_0.selected = true;
                this.tab_1.selected = false;
                this.addRender(this._redPointRender1);
            } else {
                this.removeRender(this._redPointRender1);
                this.tab_0.selected = false;
                this.tab_1.selected = true;
                GuidData.social.enemyredstate = false;
            }
            this.selectdata($value);
        }
        public type: number;//当前tab
        private selectdata($value: number): void {
            this.type = $value
            //处理逻辑
            if (this.bottomUiparts) {
                this.bottomUiparts.resetData($value);
            }
            if (!this.socialListPanel) {
                this.socialListPanel = new SocialListPanel(this);
                this.socialListPanel.init(this._baseRender.uiAtlas);
            }
            this.socialListPanel.show(this.type);
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.selecttype(0);
            this.resize();
        }

        public hide(): void {
            // Poppanel.close();
            this.socialListPanel.hide();
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        }

        private close(): void {
            UIManager.getInstance().removeUIContainer(this)
        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.tab_0:
                    this.selecttype(0);
                    break
                case this.tab_1:
                    this.selecttype(1);
                    break
                case this.w_close:
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.HIDE_SOCIAL_EVENT));
                    break;
                default:
                    break;
            }
        }

        public resize(): void {
            super.resize();
            if (this.socialListPanel) {
                this.socialListPanel.left = this.listIndex.parent.x / UIData.Scale + this.listIndex.x
                this.socialListPanel.top = this.listIndex.parent.y / UIData.Scale + this.listIndex.y
            }
        }
    }

    export class BottomUiparts extends UIVirtualContainer {

        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;
        private _topRender: UIRenderComponent
        private _redPointRender: RedPointRender;

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

        }
        private _type: number;
        public setRender($bottomRender: UIRenderComponent, $base: UIRenderComponent, $public: UIRenderComponent, $topRender: UIRenderComponent,$redRender:RedPointRender): void {
            this._bottomRender = $bottomRender;
            this._publicRender = $public;
            this._topRender = $topRender;
            this._baseRender = $base;
            this._redPointRender = $redRender;
            this.loadConfigCom();
        }


        private fri_num: UICompenent;
        private a_btn1: UICompenent;
        private a_btn2: UICompenent;
        private a_btn4: UICompenent;
        private FriendList: Array<UICompenent>;
        private RevengeList: Array<UICompenent>;
        private loadConfigCom(): void {
            var renderLevel: UIRenderComponent = this._topRender;

            this.RevengeList = new Array<UICompenent>();
            this.RevengeList.push(<UICompenent>renderLevel.getComponent("fC_cishu"));
            this.RevengeList.push(<UICompenent>this._baseRender.getComponent("a_txtbg"));
            this.a_btn4 = this.addEvntButUp("a_btn4", renderLevel);
            this.RevengeList.push(this.a_btn4);

            this.FriendList = new Array<UICompenent>();
            this.FriendList.push(this._baseRender.getComponent("fra_txt1"));
            this.FriendList.push(renderLevel.getComponent("fra_txt2"));
            this.a_btn1 = this.addEvntButUp("a_btn1", renderLevel);
            this.FriendList.push(this.a_btn1);
            this.a_btn2 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.a_btn2, "a_btn2", renderLevel);
            this.FriendList.push(this.a_btn2);
            this.fri_num = <UICompenent>renderLevel.getComponent("fri_num");
            this.FriendList.push(this.fri_num);

            this._redPointRender.getRedPointUI(this, 57, new Vector2D(this.a_btn2.x + this.a_btn2.width, this.a_btn2.y));

            this._publicRender.applyObjData();

        }

        public resetData($type): void {
            this._type = $type;
            this.setUiListVisibleByItem(this.FriendList, $type == 0);
            this.setUiListVisibleByItem(this.RevengeList, $type != 0);
            if ($type != 0) {
                this.setrevengenum();
            } else {
                this.setFriendNum();
            }
        }

        public setFriendNum(): void {
            var $tabvo = tb.TB_social_num.get_TB_social_num(GuidData.player.getLevel());
            var str: string = GuidData.social.getFriendList().length + "/" + $tabvo.num;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.fri_num.skinName, "好友:" + str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        /**
         * 复仇次数
         */
        public setrevengenum(): void {
            var tab = tb.TB_enemy_revenge_base.get_TB_enemy_revenge_baseById(1);
            var str: string = "剩余复仇次数:" + GuidData.player.getSocial_revenge_num() + "/" + tab.daily_revenge_times;
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.RevengeList[0].skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_btn4:
                    //购买复仇次数
                    var tabary: Array<tb.TB_enemy_revenge_buy> = tb.TB_enemy_revenge_buy.get_TB_enemy_revenge_buy();
                    var resary: Array<Array<number>> = new Array;
                    for (var i = GuidData.player.getRevengeBuyNum(); i < tabary.length; i++) {
                        resary.push(tabary[i].cost[0]);
                    }
                    var $evt: popbuy.PopBuyEvent = new popbuy.PopBuyEvent(popbuy.PopBuyEvent.SHOW_POPBUY_PANEL)
                    $evt.resoureItem = resary;
                    // $evt.Type = popbuy.PopBuyType.SPEEDBUILD;
                    $evt.Info1 = "今日仇人挑战可购买"
                    $evt.cutNum = tabary.length - GuidData.player.getRevengeBuyNum();
                    if ($evt.cutNum > 0) {
                        $evt.SubmitFun = (value: number) => {
                            NetManager.getInstance().protocolos.social_buy_revenge_times(value);
                        }
                        ModuleEventManager.dispatchEvent($evt);
                    } else {
                        msgtip.MsgTipManager.outStrById(22, 58);
                    }

                    break;
                case this.a_btn2:
                    //好友申请
                    console.log("applyPanel");
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.SHOW_APPLYPANEL_EVENT));
                    break
                case this.a_btn1:
                    //添加好友
                    ModuleEventManager.dispatchEvent(new social.SocialUiEvent(social.SocialUiEvent.SHOW_ADDFRIEND_EVENT));
                    break
                default:
                    break;
            }

        }

    }
}