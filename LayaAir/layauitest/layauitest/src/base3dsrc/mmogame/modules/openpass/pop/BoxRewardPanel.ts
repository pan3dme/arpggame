module pass {
    export class BoxVo {
        public id: number;
        public title: number;
        public canbuy: boolean;
        public rewardary: Array<Array<number>>;
    }

    export class BoxRewardPanel extends WindowCentenMin {

        private _baseRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;

            super.dispose();
        }


        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)


            this._baseRender.uiAtlas = new UIAtlas();

        }
        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/openpass/popbox.xml", "ui/uidata/openpass/popbox.png", () => { this.loadConfigCom() });
        }

        private b_index: UICompenent
        private b_btn: FrameCompenent
        private b_title: FrameCompenent
        private loadConfigCom(): void {


            this.b_index = this.addChild(this._baseRender.getComponent("b_index"));
            this.b_title = <FrameCompenent>this.addChild(this._baseRender.getComponent("b_title"));
            this.b_btn = <FrameCompenent>this.addEvntButUp("b_btn", this._baseRender);
            this.resize();
            this.applyLoadComplete();
        }


        public resize(): void {
            super.resize();
            if (this.rewardList) {
                this.rewardList.left = this.b_index.parent.x / UIData.Scale + this.b_index.x
                this.rewardList.top = this.b_index.parent.y / UIData.Scale + this.b_index.y
            }
        }


        public btnFun: Function
        private seletEvent: PassEvent
        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.c_close:
                    ModuleEventManager.dispatchEvent(new PassEvent(PassEvent.HIDE_BOXREWARD_PANEL));
                    break
                case this.b_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._curvo.canbuy) {
                        this.seletEvent.SubmitFun();
                        ModuleEventManager.dispatchEvent(new PassEvent(PassEvent.HIDE_BOXREWARD_PANEL));
                    } else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "条件未达成，暂不可领", 99)
                    }
                    break
                default:
                    break;
            }
        }

        public rewardList: RewardList
        private _curvo: BoxVo
        public show($vo: PassEvent): void {
            UIManager.getInstance().addUIContainer(this);

            this.seletEvent = $vo;
            this._curvo = $vo.data

            if (this._curvo.canbuy) {
                //不可领取
                this.b_btn.goToAndStop(1);
            } else {
                this.b_btn.goToAndStop(0);
            }

            this.b_title.goToAndStop($vo.data.title);

            if (this._curvo.id >= 0) {
                this.addChild(this.b_btn);
            } else {
                this.removeChild(this.b_btn);
            }

            if (!this.rewardList) {
                this.rewardList = new RewardList();
                this.rewardList.init(this._baseRender.uiAtlas);
            }
            this.rewardList.show(this._curvo.rewardary);
            this.resize();
        }

        public hide() {
            UIManager.getInstance().removeUIContainer(this);
            if (this.rewardList) {
                this.rewardList.hide();
            }
        }
    }


    /**
     * 奖励list
     */
    export class RewardList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, RewardListRender, 348, 321, 0, 84, 3, 256, 512, 1, 6);
        }


        public getData($data: Array<Array<number>>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $data.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $data[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }


        public show($vo: Array<Array<number>>): void {
            UIManager.getInstance().addUIContainer(this);
            var $sListItemData: Array<SListItemData> = this.getData($vo);
            this.refreshData($sListItemData);
        }


        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class RewardListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private Cicon: UICompenent;
        private Cname: UICompenent;
        private Cnum: UICompenent;
        private Cbg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.Cicon = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cicon", 9, 9, 68, 68);
            $container.addChild(this.Cicon);

            this.Cname = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cname", 97, 9, 100, 20);
            $container.addChild(this.Cname);

            this.Cnum = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Cnum", 97, 47, 100, 20);
            $container.addChild(this.Cnum);

            this.Cbg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Cbg", 0, 0, 348, 84, 10);
            $container.addChild(this.Cbg);
        }

        private applyrender(): void {
            if (this.itdata && this.itdata.data) {
                //奖励
                var vo: Array<number> = this.itdata.data

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Cname.skinName, getResName(vo[0]), 16, TextAlign.LEFT, ColorType.Brown7a2f21);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Cnum.skinName, "x " + vo[1], 16, TextAlign.LEFT, ColorType.Green20a200);

                IconManager.getInstance().drawItemIcon60(this.Cicon, vo[0])
                if (!(this.itdata.id % 2)) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Cbg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                }
            }

        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.Cicon);
            UiDraw.clearUI(this.Cname);
            UiDraw.clearUI(this.Cnum);
            UiDraw.clearUI(this.Cbg);
            IconManager.getInstance().clearItemEvent(this.Cicon);
        }
    }
}