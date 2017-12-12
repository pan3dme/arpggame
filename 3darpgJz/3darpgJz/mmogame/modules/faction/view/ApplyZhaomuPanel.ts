module faction {

    export class Avo {
        public name: string;
        public info: string;
        public icon: string;
    }

    export class ApplyZhaomuPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if (this.applylist) {
                this.applylist.dispose();
                this.applylist = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._publicRender = new UIRenderComponent;
            this.addRender(this._publicRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas, $publicuiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicuiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;

            this.applylist = new ApplyZhaoMuListPanel();
            this.applylist.init($uiAtlas);
            // this.applylist.setDragFun(() => {
            //     UILoading.getInstance().show();
            //     TimeUtil.addTimeOut(1000, () => {
            //         UILoading.getInstance().hide();
            //     })
            // }, () => {
            //     UILoading.getInstance().show();
            //     TimeUtil.addTimeOut(1000, () => {
            //         UILoading.getInstance().hide();
            //     })
            // })

            this.initView();
        }

        public applylist: ApplyZhaoMuListPanel;
        private a_right1: UICompenent;
        private a_left1: UICompenent;
        private _pagenum: UICompenent;
        private _a_3_1: UICompenent;
        private _a_19: UICompenent;
        private _a_20: UICompenent;
        private btn1: UICompenent;
        private b_bg2: UICompenent;
        private a_18: UICompenent;
        private b_01: SelectButton;
        private initView(): void {
            var renderLevel: UIRenderComponent = this._baseRender;

            this.a_left1 = <UICompenent>this._topRender.getComponent("a_left1");
            this.a_left1.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.a_right1 = <UICompenent>this._topRender.getComponent("a_right1");
            this.a_right1.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this._pagenum = this.addChild(<UICompenent>this._topRender.getComponent("a_8_1"));
            this.addChild(<UICompenent>renderLevel.getComponent("a_2_1"));


            var xbg1_2 = this.addChild(renderLevel.getComponent("xbg1_2"));
            xbg1_2.isU = true;
            this.addUIList(["f_1_2"], this._topRender);

            this._a_3_1 = this.addChild(<UICompenent>this._topRender.getComponent("a_3_1"));

            this.addUIList(["b_bg4", "b_bg5", "a_10", "a_11", "a_12", "a_13", "a_14", "a_17_0", "a_17_1", "a_17_2", "a_17_3", "a_16", "line2", "line4"], renderLevel);
            this.a_18 = this.addChild(<UICompenent>renderLevel.getComponent("a_18"));
            var a_15 = this.addChild(<UICompenent>renderLevel.getComponent("a_15"));


            this.btn1 = this.addEvntButUp("f_1_0", this._topRender);

            this.b_bg2 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_bg2, "btnBg", renderLevel);


            this.b_01 = <SelectButton>this.addEvntBut("b_01", this._topRender);
            this._a_20 = this.addChild(<UICompenent>this._topRender.getComponent("a_20"));//name
            this._a_19 = this.addChild(<UICompenent>this._topRender.getComponent("a_19"));//描述

            //初始化当前页数
            this._currentpage = 1;
            this.resetData(new SListItemData());
            this.resize();


        }
        private _selectdata: SListItemData;
        public setFactionInfo($data: SListItemData): void {
            this._selectdata = $data;
            this.resetData($data);
        }

        private setnum(): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._pagenum.skinName, this._currentpage + "/" + this._allpage, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        /**
         * 设置_a_3_1控件的data并绘制
         */
        private resetData($data: SListItemData): void {
            this.setDataToUicompontent(this._a_3_1, $data);
            this.drawSelect();
        }

        private setvisiableleft_right(): void {
            if (this._allpage == 1) {
                this.setUiListVisibleByItem([this.a_left1, this.a_right1], false);
                return;
            }
            if (this._allpage == this._currentpage) {
                this.setUiListVisibleByItem([this.a_right1], false);
                this.setUiListVisibleByItem([this.a_left1], true);
                return;
            }
            if (this._currentpage == 1 && this._allpage > 1) {
                this.setUiListVisibleByItem([this.a_right1], true);
                this.setUiListVisibleByItem([this.a_left1], false);
                return;
            }
            if (this._currentpage < this._allpage) {
                this.setUiListVisibleByItem([this.a_left1, this.a_right1], true);
                return;
            }
        }

        private setDataToUicompontent($Ui: UICompenent, $data: SListItemData): void {
            $Ui.data = $data;
        }

        private drawSelect(): void {
            var $data: SListItemData = this._a_3_1.data;
            if ($data) {
                var $vo: ZhaoMuVo = <ZhaoMuVo>$data.data;
                if ($vo) {
                    var a = $vo.vo.icon == 0 ? 1 : $vo.vo.icon;
                    IconManager.getInstance().getIcon(getload_FacBuildUrl(String(a+"_c")),
                        ($img: any) => {
                            var $rec: UIRectangle = this._baseRender.uiAtlas.getRec(this._a_3_1.skinName);
                            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                            UiDraw.cxtDrawImg(ctx, PuiData.PropBg100, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);
                            ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, $img.width, $img.height);

                            this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                        });
                    // var name = $vo.vo.faction_bz.sp lit(",");
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._a_20.skinName, "[853d07]" + getBaseName($vo.vo.faction_bz), 16, TextAlign.CENTER)
                    LabelTextFont.writeText(this._topRender.uiAtlas, this._a_19.skinName, 10, 0, $vo.vo.faction_gg ? $vo.vo.faction_gg : "四海之内皆兄弟，欢迎加入我们的大家庭", 16, "#853d07", 180, true);
                } else {
                    UiDraw.uiAtlasDrawImg(this._topRender.uiAtlas, this._a_3_1.skinName, UIData.publicUi, PuiData.PropBg100);
                }
            }
        }

        private _currentpage: number;
        private _allpage: number;
        private getList(): void {
            // var tabary: Array<tb.TB_faction_creat> = tb.TB_faction_creat.getItem();
            NetManager.getInstance().protocolos.faction_getlist(this._currentpage, 5, this._num % 2);
        }

        /**
         * 刷新数据
         */
        public getDataAndRefresh($data: s2c_faction_get_list_result): void {
            this._allpage = $data.maxpag == 0 ? 1 : $data.maxpag;
            this._currentpage = $data.curpag;
            this.setvisiableleft_right();
            this.setnum();
            this.applylist.refreshDataByNewData($data.list);
        }

        public resize(): void {
            super.resize();
            this.applylist.top = this.a_18.parent.y / UIData.Scale + this.a_18.y + this.a_18.height
            this.applylist.left = this.a_18.parent.x / UIData.Scale + this.a_18.x
        }


        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.applylist.show();
            //请求数据
            this.getList();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.applylist.hide();
        }

        private applyJoin($guid): void {
            NetManager.getInstance().protocolos.faction_join($guid);
        }

        private _num: number = 0;
        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.btn1:
                    // console.log("快速加入");
                    NetManager.getInstance().protocolos.faction_fast_join();
                    break
                case this.b_bg2:
                    // console.log("申请加入");
                    if (this._selectdata && this._selectdata.data) {
                        var $evt = new faction.FactionEvent(faction.FactionEvent.REFRESHAPPLYZHAOMUlISTISOK_EVENT);
                        $evt.data = this._selectdata;
                        ModuleEventManager.dispatchEvent($evt);
                        this.applyJoin(this._selectdata.data.vo.faction_guid);
                    } else {
                        msgtip.MsgTipManager.outStrById(22, 28);
                    }
                    UIManager.popClikNameFun(this.b_bg2.name, SharedDef.MODULE_FACTION);
                    break

                case this.a_left1:
                    this._currentpage -= 1;
                    this.getList();
                    break

                case this.a_right1:
                    this._currentpage += 1;
                    this.getList();
                    break

                case this.b_01:
                    this._num++;
                    this.getList();
                    break
                default:
                    break;
            }

        }

    }
}