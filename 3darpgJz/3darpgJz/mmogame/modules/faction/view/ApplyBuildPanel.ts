module faction {

    export class ApplyBuildPanel extends UIVirtualContainer {
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

        public initUiAtlas($uiAtlas: UIAtlas, $publicAtlas: UIAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._publicRender.uiAtlas = $publicAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            var renderLevel: UIRenderComponent = this._topRender;
            this.initView(renderLevel);
        }



        private a_left: UICompenent;
        private _pagenum: UICompenent;
        private a_right: UICompenent;
        private _a_3: UICompenent;
        private _a_9: UICompenent;
        private a_5: UICompenent;
        private _btncompentent: Array<UICompenent>;
        private initView(renderLevel: UIRenderComponent): void {
            var renderLevel: UIRenderComponent = this._baseRender;

            this.addChild(<UICompenent>renderLevel.getComponent("a_1"));
            this.a_left = <UICompenent>this._topRender.getComponent("a_left");
            this.a_left.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.a_right = <UICompenent>this._topRender.getComponent("a_right");
            this.a_right.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.addChild(<UICompenent>renderLevel.getComponent("a_2"));

            this._a_3 = this.addChild(<UICompenent>this._topRender.getComponent("a_3"));
            this._a_9 = this.addChild(<UICompenent>this._topRender.getComponent("a_9"));
            this.addChild(<UICompenent>this._topRender.getComponent("a_4"));
            this.addEvntBut("a_6", renderLevel);
            this.a_5 = this.addChild(<UICompenent>this._topRender.getComponent("a_5"));
            this.addChild(<UICompenent>renderLevel.getComponent("a_7"));

            var b_bg2 = this.addEvntButUp("cnew_btn1", this._publicRender);
            this.setSizeForPanelUiCopy(b_bg2, "btnBg", renderLevel);

            this.addChild(<UICompenent>this._topRender.getComponent("f_1_1"));

            this._pagenum = this.addChild(<UICompenent>this._topRender.getComponent("a_8"));

            this._btncompentent = new Array;
            for (var i = 0; i < 15; i++) {
                var pbtn: UICompenent = this.addEvntBut("p_" + i, this._topRender);
                this._btncompentent.push(pbtn);
            }

            this.resize();

            this.initData();

        }

        private _faction_icon_ary: Array<tb.Tb_faction_icon>;
        private _currentpage: number;
        private _allpage: number;
        private initData(): void {
            this._faction_icon_ary = tb.Tb_faction_icon.getTempByID();
            this._allpage = Math.floor(this._faction_icon_ary.length / 15) + 1;
            this._currentpage = 1;

            this._msgTxt = "名字3-6个汉字";
            this._type = false;
            this.refreshInputBfun(this._msgTxt, this._type);
        }

        public resize(): void {
            super.resize();
        }

        /**
         * 创建需要消耗
         */
        // private _moneytype: number;
        // private _needmoney: number;
        private _canbuy: boolean;
        public set_a_9(): void {
            var aa: tb.TB_faction_creat = tb.TB_faction_creat.getItemById(1);
            // this._moneytype = aa.cost[0][0];
            // this._needmoney = aa.cost[0][1];
            // strengthgem.EquDrawUtil.drawResourceIconAndtxt(this._topRender.uiAtlas, this._a_9.skinName, aa.cost[0][1], aa.cost[0][0], TextAlign.CENTER);
            this._canbuy = UiDraw.drawRewardIconAndtxt(this._a_9, aa.cost[0], true, TextAlign.LEFT, 10);
        }

        private setvisiableleft_right(): void {
            if (this._allpage == 1) {
                this.setUiListVisibleByItem([this.a_left, this.a_right], false);
                return;
            }
            if (this._allpage == this._currentpage) {
                this.setUiListVisibleByItem([this.a_right], false);
                this.setUiListVisibleByItem([this.a_left], true);
                return;
            }
            if (this._currentpage == 1 && this._allpage > 1) {
                this.setUiListVisibleByItem([this.a_right], true);
                this.setUiListVisibleByItem([this.a_left], false);
                return;
            }
            if (this._currentpage < this._allpage) {
                this.setUiListVisibleByItem([this.a_left, this.a_right], true);
                return;
            }
        }


        private setnum(): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._pagenum.skinName, this._currentpage + "/" + this._allpage, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
        }

        private drawPicAll(): void {
            var a: number = this._currentpage - 1;
            this.defaultData();
            for (var i = 0; i < this._btncompentent.length; i++) {
                var b = (a * 15 + i);
                if (b < this._faction_icon_ary.length) {
                    var $data = this._faction_icon_ary[b];
                    $data.isvisiable = true;
                    this.btnSetData(this._btncompentent[i], $data);
                    this.drawPic(this._btncompentent[i]);
                } else {
                    this.btnSetData(this._btncompentent[i]);
                    this.setnull(this._btncompentent[i]);
                    // UiDraw.clearUI(this._btncompentent[i]);
                }
            }
        }

        private defaultData(): void {
            for (var i = 0; i < this._faction_icon_ary.length; i++) {
                this._faction_icon_ary[i].isvisiable = false;
            }
        }

        private btnSetData($ui: UICompenent, $data: tb.Tb_faction_icon = null): void {
            $ui.data = $data;
            $ui.enable = true;
        }

        private setnull($ui: UICompenent): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $ui.skinName, "", 16, TextAlign.LEFT);
            $ui.enable = false;
        }


        private drawPic($ui: UICompenent): void {
            var $data: tb.Tb_faction_icon = $ui.data;
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String($data.icon)),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);
                    if ($data.isactivityflag) {
                        UiDraw.cxtDrawImg(ctx, PuiData.A_HIGHT_F, new Rectangle(3, 3, 62, 62), UIData.publicUi);
                    }

                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        private drawPicProp100($ui: UICompenent): void {
            var $data: tb.Tb_faction_icon = $ui.data;
            IconManager.getInstance().getIcon(getload_FacBuildUrl(String($data.icon) + "_c"),
                ($img: any) => {
                    var $rec: UIRectangle = this._baseRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg100, new Rectangle(0, 0, 108, 108), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 100, 100);
                    this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
        }


        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();
            this.setselect(this._btncompentent[0]);
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }

        private resetData(): void {
            this.drawPicAll();
            this.setnum();
            this.set_a_9();
            this.setvisiableleft_right();
        }

        private _lastData: tb.Tb_faction_icon;
        /**
         * 设置选中状态和索引位置
         */
        private setselect($selectUi: UICompenent): void {
            if (this._lastData) {
                //将上一个控件状态置回
                var data = <tb.Tb_faction_icon>this._lastData
                data.isactivityflag = false;
                //如果data存在，则更新UI
                for (var i = 0; i < this._btncompentent.length; i++) {
                    var uidata: tb.Tb_faction_icon = this._btncompentent[i].data;
                    if (uidata && uidata.id && uidata.id == data.id) {
                        this.btnSetData(this._btncompentent[i], data);
                        this.drawPic(this._btncompentent[i]);
                        break;
                    }
                }
            }
            var $data = <tb.Tb_faction_icon>$selectUi.data
            $data.isactivityflag = true;
            this.btnSetData($selectUi, $data);
            this.drawPic($selectUi);
            this._a_3.data = $data;
            this.drawPicProp100(this._a_3);
            this._lastData = $selectUi.data

            //重置data
            for (var j = 0; j < this._faction_icon_ary.length; j++) {
                if (this._faction_icon_ary[j].id == $data.id) {
                    this._faction_icon_ary.splice(j, 1, $data);
                    break;
                }
            }
        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target.name) {
                case "cnew_btn1":
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this._lastData && this._canbuy && this._type && this._msgTxt.length >= 3 && this._msgTxt.length <= 6) {
                        this.createFaction(this._lastData.icon);
                    } else if (!this._canbuy) {
                        var aa: tb.TB_faction_creat = tb.TB_faction_creat.getItemById(1);
                        var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                        $aaa.data = aa.cost[0][0]
                        ModuleEventManager.dispatchEvent($aaa);
                    } else {
                        msgtip.MsgTipManager.outStrById(22, 27);
                    }
                    break
                case "p_0":
                case "p_1":
                case "p_2":
                case "p_3":
                case "p_4":
                case "p_5":
                case "p_6":
                case "p_7":
                case "p_8":
                case "p_9":
                case "p_10":
                case "p_11":
                case "p_12":
                case "p_13":
                case "p_14":
                    this.setselect(evt.target);
                    break;

                case "a_left":
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this._currentpage -= 1;
                    this.resetData();
                    break;
                case "a_right":
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this._currentpage += 1;
                    this.resetData();
                    break;
                case "a_6":
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._type ? this._msgTxt : "", 2, 12)
                    break;
                default:
                    break;
            }

        }

        private _msgTxt: string
        private _type: boolean

        private inputBfun($str: string): void {
            if ($str.length > 0) {
                this._type = true;
                this._msgTxt = $str;
            } else {
                this._type = false;
                this._msgTxt = "名字3-6个汉字";
            }
            this.refreshInputBfun(this._msgTxt, this._type)
        }

        /**
         * $type:false 默认文案
         */
        private refreshInputBfun($str: string, $type: boolean): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_5.skinName, $str, 16, TextAlign.CENTER, ColorType.colorb96d49);
        }

        private createFaction($icon: number): void {
            // var str: string = GuidData.player.getBaseName() + "的帮派"
            NetManager.getInstance().protocolos.create_faction(this._msgTxt, $icon);
        }
    }
}