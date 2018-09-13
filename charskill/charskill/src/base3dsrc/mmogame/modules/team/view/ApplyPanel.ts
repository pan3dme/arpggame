module team {

    export class ApplyPanel extends WindowCentenMin {

        private _bgRender: UIRenderComponent;
        private _AtopRender1: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;

            if (this.applyTeamList) {
                this.applyTeamList.dispose();
                this.applyTeamList = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.setBlackBg();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);
            this._AtopRender1 = new UIRenderComponent;
            this.addRender(this._AtopRender1);
        }

        public applyLoad(): void {
            this._bgRender.uiAtlas = new UIAtlas();
            this._bgRender.uiAtlas.setInfo("ui/uidata/team/apply.xml", "ui/uidata/team/apply.png", () => { this.loadConfigCom() }, "ui/uidata/team/teampc.png");
        }


        public applyTeamList: ApplyTeamList;

        private a_selbtn: SelectButton
        private a_btn: UICompenent
        private a_index: UICompenent
        private loadConfigCom(): void {
            this._AtopRender1.uiAtlas = this._bgRender.uiAtlas;
            this.addUIList(["a_title", "a_basebg"], this._bgRender);
            this.addUIList(["a_txt1", "a_line0", "a_txt2", "a_line1", "a_txt3", "a_line2", "a_txt4", "a_baseline", "a_txt0"], this._AtopRender1);

            this.a_selbtn = <SelectButton>this.addEvntBut("a_selbtn", this._AtopRender1);
            this.a_btn = this.addEvntButUp("a_btn", this._AtopRender1);
            this.a_index = this.addChild(this._AtopRender1.getComponent("a_index"));

            this.applyLoadComplete();
        }



        public resize(): void {
            super.resize();
            if (this.applyTeamList) {
                this.applyTeamList.left = this.a_index.parent.x / UIData.Scale + this.a_index.x
                this.applyTeamList.top = this.a_index.parent.y / UIData.Scale + this.a_index.y
            }
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            var flag: number = GuidData.team.getTeamAutoAccept();
            this.a_selbtn.selected = flag == 1
            
            if(!this.applyTeamList){
                this.applyTeamList = new ApplyTeamList
                this.applyTeamList.init(this._AtopRender1.uiAtlas);
            }
            this.applyTeamList.show();
            this.resize();
        }

        public hide(): void {
            if(this.applyTeamList){
                this.applyTeamList.hide();
            }
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
            ModuleEventManager.dispatchEvent(new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_REFRESH_INFO_ICON));
        }


        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.c_close:
                    this.hide();

                    break
                case this.a_selbtn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    NetManager.getInstance().protocolos.group_change_config(0, 0, 0, this.a_selbtn.selected ? 1 : 0);
                    break
                case this.a_btn:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    TeamModel.getInstance().removeAllApply();
                    break
                default:
                    break;
            }
        }
    }


    export class ApplyTeamList extends SList {

        public constructor() {
            super();
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, ApplyFactionRender, 350, 277, 0, 53, 5, 256, 512, 1, 8);
        }

        /**
         * refreshData
         */
        public refreshDataByNewData(): void {
            var $ary: Array<ApplyCell> = TeamModel.getInstance().getApplyList();
            var $sListItemData = this.getData($ary);
            this.refreshData($sListItemData);
        }

        public getData($ary: Array<ApplyCell>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.refreshDataByNewData();
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class ApplyFactionRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private I2name: UICompenent;
        private I2vip: UICompenent;
        private I2lev: UICompenent;
        private I2zhanli: UICompenent;
        private I2btn: UICompenent;
        private I2bg: UICompenent;
        //private _bgRender: UIRenderComponent;
        //private _baseRender: UIRenderComponent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            //this._bgRender = $bgRender;
            //this._baseRender = $baseRender;
            super.create($container,$bgRender,$baseRender,$customizeRenderAry);

            this.I2zhanli = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2zhanli", 188, 20, 88, 20);
            $container.addChild(this.I2zhanli);

            this.I2name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2name", 2, 20, 100, 20);
            $container.addChild(this.I2name);

            this.I2vip = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2vip", 100, 21, 29, 14);
            $container.addChild(this.I2vip);

            this.I2lev = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2lev", 142, 20, 35, 20);
            $container.addChild(this.I2lev);

            this.I2btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "I2btn", 277, 5, 71, 46);
            $container.addChild(this.I2btn);

            this.I2bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "I2bg", 0, 0, 350, 53);
            $container.addChild(this.I2bg);
        }



        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var vo: ApplyCell = $data.data
                this.I2btn.addEventListener(InteractiveEvent.Down, this.butClik, this);

                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.I2bg.skinName, UIData.publicUi, PuiData.NEWLISTITEMBG);
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.I2bg.skinName);
                }

                //名字
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2name.skinName, getBaseName(vo.name), 16, TextAlign.CENTER, ColorType.Orange853d07);
                // //vip等级
                this.uiAtlas.upDataPicToTexture(getVipIconUrl(vo.vip),this.I2vip.skinName);
                //等级
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2lev.skinName, String(vo.lev), 16, TextAlign.CENTER, ColorType.Orange853d07);
                //战力
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.I2zhanli.skinName, Snum(vo.force), 16, TextAlign.CENTER, ColorType.Orange853d07);

                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.I2btn.skinName, "ApplyOk");
            } else {
                this.I2btn.removeEventListener(InteractiveEvent.Down, this.butClik, this);
                this.setnull();
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.I2zhanli);
            UiDraw.clearUI(this.I2name);
            UiDraw.clearUI(this.I2vip);
            UiDraw.clearUI(this.I2lev);
            UiDraw.clearUI(this.I2btn);
            UiDraw.clearUI(this.I2bg);
        }

        private _num: number = 1;
        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.I2btn:
                    if (this.itdata && this.itdata.data) {
                        var vo: ApplyCell = this.itdata.data
                        NetManager.getInstance().protocolos.group_join_accept(vo.guid);
                        TeamModel.getInstance().popapplyList(vo);
                    }
                    break
                default:
                    break;
            }
        }

    }
}