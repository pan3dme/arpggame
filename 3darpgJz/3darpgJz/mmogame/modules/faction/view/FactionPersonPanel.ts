module faction {

    export class BtnVo {
        public indexselect: boolean;
        public index: number;
    }

    export class FactionPersonPanel extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent
        private _redPointRender: RedPointRender;

        public SortType: number;
        public SortFlag: boolean;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            // this._bottomRender.dispose();
            // this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            // this.noticePanel.dispose();
            // this.noticePanel = null;
            // this.recruitingPanel.dispose();
            // this.recruitingPanel = null;

            if (this.personListPanel) {
                this.personListPanel.dispose();
                this.personListPanel = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;


            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);
        }
        public personListPanel: PersonListPanel;
        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._bgRender.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            var renderLevel: UIRenderComponent = this._topRender;


            this.personListPanel = new PersonListPanel();
            this.personListPanel.init($uiAtlas);

            this.initView(renderLevel);
        }


        // public appointmentPanel: AppointmentPanel;
        // public noticePanel: NoticePanel;
        // public recruitingPanel: RecruitingPanel;

        public bottomLeftPanel: BottomLeftPanel;
        public rightPanel: RightPanel;
        private line_3: UICompenent;

        private title_0: UICompenent;
        private title_1: UICompenent;
        private title_2: UICompenent;
        private title_3: UICompenent;
        private title_4: UICompenent;

        private arraySelectButton: Array<SelectButton>;
        private arrayUIcomponent: Array<UICompenent>;
        private initView(renderLevel: UIRenderComponent): void {
            var renderLevel: UIRenderComponent = this._topRender;

            this.line_3 = this.addChild(<UICompenent>renderLevel.getComponent("line1"));

            this.addUIList(["a_16", "a_15", "line4A1", "line4A2", "line4A3", "line4A4", "line4A5", "line4A6"], renderLevel);

            this.title_2 = this.addEvntButUp("a_zhanli", this._baseRender);
            this.title_0 = this.addEvntButUp("a_zhiwu", this._baseRender);
            this.title_1 = this.addEvntButUp("a_lev", this._baseRender);
            this.title_3 = this.addEvntButUp("a_gx", this._baseRender);
            this.title_4 = this.addEvntButUp("a_huoyue", this._baseRender);


            this.arrayUIcomponent = new Array<UICompenent>();
            this.arrayUIcomponent.push(this.title_0);
            this.arrayUIcomponent.push(this.title_1);
            this.arrayUIcomponent.push(this.title_2);
            this.arrayUIcomponent.push(this.title_3);
            this.arrayUIcomponent.push(this.title_4);
            this.refreshUIdata();

            this.arraySelectButton = new Array<SelectButton>();
            for (var i = 0; i < 5; i++) {
                var select: SelectButton = <SelectButton>this.addChild(renderLevel.getComponent("j_" + i));
                this.arraySelectButton.push(select);
            }

            //右下对齐子面板
            this.bottomLeftPanel = new BottomLeftPanel();
            this.bottomLeftPanel.setRender(this._bgRender, this._bottomRender, this._baseRender, this._topRender);
            this.addVirtualContainer(this.bottomLeftPanel);
            //右对齐面板
            this.rightPanel = new RightPanel();
            this.rightPanel.setRender(this._bgRender, this._bottomRender, this._baseRender, this._topRender,this._redPointRender);
            this.rightPanel.parent = this;
            this.addVirtualContainer(this.rightPanel);
            //任命页面
            // this.appointmentPanel = new AppointmentPanel();
            // this.appointmentPanel.init(this._baseRender.uiAtlas);
            // this.appointmentPanel.parent = this
            //公告页面
            // this.noticePanel = new NoticePanel();
            // this.noticePanel.init(this._baseRender.uiAtlas);
            //招募页面
            // this.recruitingPanel = new RecruitingPanel();
            // this.recruitingPanel.init(this._baseRender.uiAtlas);
            // this.recruitingPanel.parent = this;

            this.resize();

        }

        private refreshUIdata(): void {
            for (var i = 0; i < this.arrayUIcomponent.length; i++) {
                var btnVo: BtnVo = new BtnVo();
                btnVo.indexselect = false;
                btnVo.index = i;
                this.arrayUIcomponent[i].data = btnVo;
            }
        }

        private _lastselect: number;
        private resetUiState($index: number, $isfirst: boolean): void {
            var $selectbtn: SelectButton = this.arraySelectButton[$index];
            if (this._lastselect == $index) {
                //点击了同一个
                this.arrayUIcomponent[$index].data.indexselect = !this.arrayUIcomponent[$index].data.indexselect;
            } else {
                this._lastselect = $index;
                this.SortType = $index;
                this.setUiListVisibleByItem(this.arraySelectButton, false);
                if (!$selectbtn.parent) {
                    this.addChild($selectbtn)
                }
                this.arrayUIcomponent[$index].data.indexselect = false;
                for (var i = 0; i < 5; i++) {
                    var $ui: UICompenent = this.arrayUIcomponent[i];
                    var aa: string = "t_" + i + "_0"
                    if ($index == i) {
                        aa = "t_" + i + "_1"
                    }
                    UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this._baseRender.uiAtlas, $ui.skinName, aa);
                }
            }
            $selectbtn.selected = this.arrayUIcomponent[$index].data.indexselect;
            this.SortFlag = $selectbtn.selected;
            this.personListPanel.refreshDataByNewData(GuidData.faction.getFactionListBySortType($index, $selectbtn.selected), $isfirst);
        }

        private _currentVo: ListItemData;

        public resize(): void {
            super.resize();
            this.personListPanel.top = this.line_3.parent.y / UIData.Scale + this.line_3.y + 6
            this.personListPanel.left = this.line_3.parent.x / UIData.Scale + this.line_3.x - 4
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.personListPanel.show();
            this._lastselect = -1;
            this.rightPanel.resetData();
            this.resetUiState(0, true);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.personListPanel.hide();
        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.title_0:
                case this.title_1:
                case this.title_2:
                case this.title_3:
                case this.title_4:
                    this.resetUiState(evt.target.data.index, false);
                    break

                default:
                    break;
            }

        }

    }


    export class BottomLeftPanel extends UIVirtualContainer {


        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

        }
        public setRender($bgRender: UIRenderComponent, $bottomRender: UIRenderComponent, $base: UIRenderComponent, $topRender: UIRenderComponent): void {
            this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._topRender = $topRender;
            this._baseRender = $base;
            this.loadConfigCom();
        }

        private _a_currentgold_txt: UICompenent;
        private _a_currentyinbi_txt: UICompenent;
        private _a_10: UICompenent;
        private loadConfigCom(): void {

            this.addChild(<UICompenent>this._topRender.getComponent("a_1"));
            this._a_10 = this.addChild(<UICompenent>this._topRender.getComponent("a_10"));//在线人数
            this.addChild(<UICompenent>this._baseRender.getComponent("b_bg3A1"));//在线人数

            this.initData()

        }

        private initData(): void {
            this.resetData();
        }

        public resetData(): void {
            var list: Array<FactionItemData> = GuidData.faction.getFactionList();
            var isonlinenum: number = this.getOnlineNum(list);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_10.skinName, isonlinenum + "/" + list.length, 16, TextAlign.CENTER, "#853d07");

            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_10.skinName, , ArtFont.num1, TextAlign.CENTER);
        }

        private getOnlineNum($list: Array<FactionItemData>): number {
            var num: number = 0;
            for (var i = 0; i < $list.length; i++) {
                if ($list[i].isOnline) {
                    num++;
                }
            }
            return num;
        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target.name) {
                default:
                    break;
            }

        }
    }






    export class RightPanel extends UIVirtualContainer {


        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent
        private _redRender:RedPointRender

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

        }
        public setRender($bgRender: UIRenderComponent, $bottomRender: UIRenderComponent, $base: UIRenderComponent, $topRender: UIRenderComponent,$redRender:RedPointRender): void {
            this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._topRender = $topRender;
            this._baseRender = $base;
            this._redRender = $redRender;
            this.loadConfigCom();
        }

        private b_exit: FrameCompenent;
        private b_edit: UICompenent;
        private b_btnbg_zhoamu: UICompenent;
        private a_3: UICompenent;
        private a_2: UICompenent;
        private a_9: UICompenent;
        private _a_13: UICompenent;
        private _a_12: UICompenent;
        private _a_14: UICompenent;
        private _a_11: UICompenent;
        private aryUIcompenent: Array<UICompenent>;
        private loadConfigCom(): void {

            this.addChild(<UICompenent>this._bgRender.getComponent("b_bg1"));
            this.addChild(<UICompenent>this._topRender.getComponent("x_bg1A1"));
            var x_bg1A2 = this.addChild(<UICompenent>this._topRender.getComponent("x_bg1A2"));
            x_bg1A2.isU = true;

            this.addChild(<UICompenent>this._baseRender.getComponent("b_bg4"));
            this.addChild(<UICompenent>this._baseRender.getComponent("b_bg5"));

            this.addUIList(["a_4", "a_5", "a_6", "a_7", "a_8"], this._topRender);
            this.addUIList(["b_bg3A2", "b_bg3A3", "b_bg3A4", "b_bg3A5"], this._baseRender);

            this.a_3 = this.addChild(<UICompenent>this._topRender.getComponent("a_3"));
            this.a_2 = this.addChild(<UICompenent>this._topRender.getComponent("a_2"));//name
            this.a_9 = this.addChild(<UICompenent>this._topRender.getComponent("a_9"));//公告

            this._a_13 = this.addChild(<UICompenent>this._topRender.getComponent("a_13"));//贡献
            this._a_12 = this.addChild(<UICompenent>this._topRender.getComponent("a_12"));//资金
            this._a_14 = this.addChild(<UICompenent>this._topRender.getComponent("a_14"));//成员数
            this._a_11 = this.addChild(<UICompenent>this._topRender.getComponent("a_11"));//等级

            this.b_exit = <FrameCompenent>this.addChild(this._topRender.getComponent("b_exit"));
            this.b_exit.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.aryUIcompenent = new Array<UICompenent>();
            this.b_edit = <UICompenent>this._topRender.getComponent("b_edit");
            this.b_edit.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.aryUIcompenent.push(this.b_edit);
            this.b_btnbg_zhoamu = <UICompenent>this._baseRender.getComponent("b_btnbg_zhoamu");
            this.b_btnbg_zhoamu.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.aryUIcompenent.push(this.b_btnbg_zhoamu);
            // this.aryUIcompenent.push(<UICompenent>this._topRender.getComponent("b_zhaomu"));

            this._redRender.getRedPointUI(this, 62, new Vector2D(this.b_btnbg_zhoamu.x + this.b_btnbg_zhoamu.width, this.b_btnbg_zhoamu.y));

            this.resize();
        }


        public resetFactionLev(): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_11.skinName, String(GuidData.faction.getLev()), 16, TextAlign.LEFT,"#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_11.skinName, String(GuidData.faction.getLev()), ArtFont.num3);
        }

        public resetFactionMoney(): void {
             LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_12.skinName, Snum(GuidData.faction.getMoney()), 16, TextAlign.LEFT,"#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_12.skinName, getNumToUnit(GuidData.faction.getMoney()), ArtFont.num3);
        }

        public resetFactionContribution(): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_13.skinName, String(GuidData.faction.getFactionForce()), 16, TextAlign.LEFT,"#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_13.skinName, String(GuidData.player.getFactionBG()), ArtFont.num3);
        }

        public resetFactionPlayerNum(): void {
            var lev: number = GuidData.faction.getLev();
            var tablevo: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById(lev);
            var list = GuidData.faction.getFactionList();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_14.skinName, list.length + "/" + tablevo.maxnum, 16, TextAlign.LEFT,"#853d07");
            // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._a_14.skinName, list.length + "/" + tablevo.maxnum, ArtFont.num3);
        }
        public resetFactionIcon(): void {
            var b: number = GuidData.faction.getIcon() == 0 ? 1 : GuidData.faction.getIcon();
            
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String(b)),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this.a_3.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_2.skinName, "[853d07]" + getBaseName(GuidData.faction.getName()), 16, TextAlign.CENTER)
        }

        public resetFactionNotice(): void {
            var str: string = GuidData.faction.getNotice();
            if (str) {
                var ary: Array<string> = str.split("\1")
                if (ary[1].length == 0) {
                    ary[1] = "";
                } else {
                    ary[1] = "QQ:" + ary[1];
                }
                if (ary[2].length == 0) {
                    ary[2] = "";
                } else {
                    ary[2] = "微信:" + ary[2];
                }
                LabelTextFont.writeText(this._topRender.uiAtlas, this.a_9.skinName, 0, 0, str ? ary[0] + "\n" + ary[1] + "\n" + ary[2] : "", 14, "#853d07", 200, true);
            }
        }

        public resetFactionIdentity(): void {
            if (GuidData.faction.playerIdentity < 4) {
                this.setUiListVisibleByItem(this.aryUIcompenent, true);
            } else {
                this.setUiListVisibleByItem(this.aryUIcompenent, false);
            }
            if (GuidData.faction.playerIdentity == 1) {
                this.b_exit.goToAndStop(1);
            } else {
                this.b_exit.goToAndStop(0);
            }
        }

        public resetData() {
            this.resetFactionIcon();
            this.resetFactionLev();
            this.resetFactionPlayerNum();
            this.resetFactionMoney();
            this.resetFactionContribution();
            this.resetFactionNotice();
            this.resetFactionIdentity();
        }

        public resize(): void {
            super.resize();
        }

        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.b_btnbg_zhoamu:
                    //点击招募按钮
                    var $factionPersonPanel: FactionPersonPanel = <FactionPersonPanel>this.parent;
                    // $factionPersonPanel.hide();
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONRECRUITING_EVENT));
                    console.log("--已经发送--");

                    // var $indexUrl: string = window.location.toString();
                    // var $d: number = $indexUrl.indexOf("?");
                    // if ($d != -1) {
                    //     $indexUrl = $indexUrl.substring(0, $d)
                    // }
                    // var $url: string = $indexUrl + "?inviteGuid=" + GuidData.faction.getGuid();
                    // $url = $url.replace("index.html", "login.html");

                    // console.log("outUrl", $url)
                    // copy2clipboard($url);
                    // alert($url)

                    break
                case this.b_edit:
                    //点击公告按钮
                    var $factionPersonPanel: FactionPersonPanel = <FactionPersonPanel>this.parent;
                    // $factionPersonPanel.noticePanel.show();
                    ModuleEventManager.dispatchEvent(new faction.FactionEvent(faction.FactionEvent.SHOW_FACTIONNOTICE_EVENT));
                    
                    break
                case this.b_exit:
                    var $strmsg: string;
                    if (GuidData.faction.playerIdentity == 1) {
                        $strmsg = "是否解散家族";
                    } else {
                        $strmsg = "是否退出家族";
                    }
                    AlertUtil.show($strmsg, "提示",  (a: any) => {
                        if (a == 1) {
                            NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_QUIT, 0, 0, "", "");
                        }
                    })
                    break;
                default:
                    break;
            }

        }

        private backFun(a: any): void {
            if (a == 1) {
                NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_LEVEL_UP, 0, 0, "", "");
            }
        }

    }
}