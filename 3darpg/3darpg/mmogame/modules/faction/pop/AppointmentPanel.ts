module faction {

    export class AppointmentPanel extends WindowCentenMin {


        private _publicbgRender: UIRenderComponent;

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            if (this.cellMask) {
                this.cellMask.dispose();
                this.cellMask = null;
            }
            if (this._bottomRender) {
                this._bottomRender.dispose();
                this._bottomRender = null;
            }
            if (this._midRender) {
                this._midRender.dispose();
                this._midRender = null;
            }
            if (this._topRender) {
                this._topRender.dispose();
                this._topRender = null;
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

            //添加好友面板渲染器
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender)

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)



            this.cellMask = new UIMask();
            this.cellMask.x = 298;
            this.cellMask.y = 133;
            this.cellMask.width = 365;
            this.cellMask.height = 290;
            this.addMask(this.cellMask);
            //this._bottomRender.mask = this.cellMask;
            this._midRender.mask = this.cellMask;
            this._topRender.mask = this.cellMask;
        }
        private cellMask: UIMask;

        public applyLoad(): void {
            this._midRender.setInfo("ui/uidata/faction/zhiwu/appointments.xml", "ui/uidata/faction/zhiwu/appointments.png", () => { this.loadConfigCom() });
        }

        private b_btnbg_agree: UICompenent;
        private _selectbtnary: Array<SelectButton>;
        private _numary: Array<UICompenent>;
        private _permissionsary: Array<UICompenent>;
        private _rewardary: Array<UICompenent>;

        private b_select_0: SelectButton;
        private b_select_1: SelectButton;
        private b_select_2: SelectButton;
        private b_select_3: SelectButton;
        private b_select_4: SelectButton;

        private moveCellUi: Array<UICompenent>;
        private loadConfigCom(): void {

            this.moveCellUi = new Array();

            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;

            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;


            this.addChild(<UICompenent>this._topRender.getComponent("a_57"));

            this.b_btnbg_agree = this.addEvntButUp("cnew_but_yes", this._publicbgRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_agree, "b_btnbg_agree", this._midRender);

            this.addUIList(["line_2_10", "line_2_11", "line_2_12", "line_5", "line_6", "a_46", "a_44", "a_45", "a_47", "a_43"], this._bottomRender);





            this.moveCellUi = this.moveCellUi.concat(this.addUIList(["downbg1", "downbg2", "downbg3"], this._bottomRender));
            this.moveCellUi = this.moveCellUi.concat(this.addUIList(["a_38", "a_40", "a_42", "a_39", "a_41"], this._topRender));


            this._rewardary = new Array
            this._permissionsary = new Array
            this._numary = new Array
            this._selectbtnary = new Array

            var $tabelary: Array<tb.Tb_faction_zhiwei> = tb.Tb_faction_zhiwei.get_Tb_faction_zhiwei();
            for (var i = 0; i < 3; i++) {
                var aa = this.addChild(<UICompenent>this._topRender.getComponent("personreward_" + i))
                aa.addEventListener(InteractiveEvent.Up, this.RewardClik, this);
                aa.data = $tabelary[i].reward;
                this.drawReward(aa.skinName, $tabelary[i].reward);
                this._rewardary.push(aa)
            }

            for (var i = 0; i < 5; i++) {
                var aa = this.addChild(<UICompenent>this._topRender.getComponent("personInfo_" + i))
                this._permissionsary.push(aa)
            }

            for (var i = 0; i < 4; i++) {
                this._numary.push(this.addChild(<UICompenent>this._topRender.getComponent("personNum_" + i)))
            }

            this.b_select_0 = <SelectButton>this.addEvntBut("b_select_0", this._topRender)
            this.b_select_0.data = 0
            this._selectbtnary.push(this.b_select_0)
            this.b_select_1 = <SelectButton>this.addEvntBut("b_select_1", this._topRender)
            this.b_select_1.data = 1
            this._selectbtnary.push(this.b_select_1)
            this.b_select_2 = <SelectButton>this.addEvntBut("b_select_2", this._topRender)
            this.b_select_2.data = 2
            this._selectbtnary.push(this.b_select_2)
            this.b_select_3 = <SelectButton>this.addEvntBut("b_select_3", this._topRender)
            this.b_select_3.data = 3
            this._selectbtnary.push(this.b_select_3)
            this.b_select_4 = <SelectButton>this.addEvntBut("b_select_4", this._topRender)
            this.b_select_4.data = 4
            this._selectbtnary.push(this.b_select_4)


            this.initBasePos();
            this.applyLoadComplete();
        }
        private baseKeyDic: any
        private initBasePos(): void {
            this.moveCellUi = this.moveCellUi.concat(this._rewardary);
            this.moveCellUi = this.moveCellUi.concat(this._permissionsary);
            this.moveCellUi = this.moveCellUi.concat(this._numary);
            this.moveCellUi = this.moveCellUi.concat(this._selectbtnary);
            this.baseKeyDic = new Object
            for (var i: number = 0; i < this.moveCellUi.length; i++) {

                this.baseKeyDic[this.moveCellUi[i].name] = this.moveCellUi[i].y
            }
        }

        /**
         * 物品奖励框事件回调 
         */
        private RewardClik(evt: InteractiveEvent): void {
            var x: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_ID_EVENT);
            x.id = evt.target.data;
            ModuleEventManager.dispatchEvent(x);
        }

        private drawReward($key: string, $propid: number): void {
            var propvo: any = TableData.getInstance().getData(TableData.tb_item_template, $propid);
            IconManager.getInstance().getIcon(geteqiconIconUrl(String(propvo.icon)),
                ($img: any) => {
                    var $rec: UIRectangle = this._topRender.uiAtlas.getRec($key);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 46, 46), UIData.publicUi);
                    //头像
                    ctx.drawImage($img, 0, 0, 60, 60, 3, 3, 40, 40);
                    this._topRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        /**
         * 根据职位返回该职位被任命的人数
         */
        private getNum($identity): number {
            var ary: Array<FactionItemData> = GuidData.faction.getFactionList();
            var num: number = 0
            //族长
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].identity == $identity) {
                    num++;
                }
            }
            return num;
        }

        private SelectThisBtn($identity: number): void {
            console.log($identity)
            for (var i = 0; i < this._selectbtnary.length; i++) {
                var flag: boolean = false;
                if (i == $identity) {
                    flag = true;
                }
                this._selectbtnary[i].selected = flag;
            }
        }

        private initData(): void {
            this._currentSelect = this._data.factionItemData.identity - 1;
            this.SelectThisBtn(this._data.factionItemData.identity - 1);

            for (var i = 0; i < this._numary.length; i++) {
                var ui: UICompenent = this._numary[i];
                var tabelvo: tb.Tb_faction_zhiwei = tb.Tb_faction_zhiwei.get_Tb_faction_zhiweiById(i + 1);
                var $numstring: string = this.getNum(i + 1) + "/" + tabelvo.num
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, ui.skinName, $numstring, 16, TextAlign.CENTER, ColorType.Orange853d07);
                // ArtFont.getInstance().writeFontToSkinName(this._AtopRender2.uiAtlas, ui.skinName, $numstring, ArtFont.num10, TextAlign.CENTER)
            }

            this.changePostion();
        }
        private changePostion(): void {
            var ty: number = 0;
            switch (GuidData.faction.playerIdentity) {
                case 1:
                    ty = 0;
                    break;
                case 2:
                    ty = 78;
                    break;
                case 3:
                    ty = 78 + 60;
                    break;
                case 4:
                    ty = 0;
                    break;
                default:
                    ty = 0;
                    break;
            }
            for (var i: number = 0; i < this.moveCellUi.length; i++) {
                this.moveCellUi[i].y = this.baseKeyDic[this.moveCellUi[i].name] - ty;
            }
        }

        public resize(): void {
            super.resize();
        }
        private _data: PersonListVo
        public show($data: any): void {
            this._data = $data.data
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.initData();
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }

        private backFun(a: any): void {
            if (a == 1) {
                NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_APPOINT, 1, 0, this._data.factionItemData.guid, "");
                this.hide();
            }
        }

        private _currentSelect: number;
        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.b_btnbg_agree:
                    var tabelvo: tb.Tb_faction_zhiwei = tb.Tb_faction_zhiwei.get_Tb_faction_zhiweiById(this._currentSelect + 1);
                    if (this._currentSelect == 0) {
                        AlertUtil.show("您将进行族长转移，是否确认此操作？", "提示", (a: any) => { this.backFun(a) })
                    } else if (this._currentSelect == (this._data.factionItemData.identity - 1)) {
                        //无变化时
                        this.hide();
                    } else if (this.getNum(this._currentSelect + 1) < tabelvo.num) {
                        NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_APPOINT, (this._currentSelect + 1), 0, this._data.factionItemData.guid, "");
                        this.hide();
                    } else if (this.getNum(this._currentSelect + 1) >= tabelvo.num) {
                        msgtip.MsgTipManager.outStrById(22, 15);
                    }
                    break
                case this.b_select_0:
                case this.b_select_1:
                case this.b_select_2:
                case this.b_select_3:
                case this.b_select_4:
                    this._currentSelect = evt.target.data;
                    this.SelectThisBtn(evt.target.data);
                    break
                case this.c_close:
                    this.hide();
                    break;
                default:
                    break;
            }
        }
    }
}