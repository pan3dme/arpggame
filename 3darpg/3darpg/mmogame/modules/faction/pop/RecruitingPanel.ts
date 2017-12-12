module faction {

    export class RecruitingPanel extends WindowCentenMin {

        //服务端限制等级
        public static ServerMaxLev: number = 60
        private _bgRender: UIRenderComponent;
        private _publicbgRender: UIRenderComponent;
        private _AtopRender1: UIRenderComponent;
        private _BtopRender1: UIRenderComponent;
        private _BtopRender2: UIRenderComponent;
        private _BtopRender3: UIRenderComponent;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;

            if (this.shengpiPanel) {
                this.shengpiPanel.dispose();
                this.shengpiPanel = null;
            }

            if (this.zhaomuSettingPanel) {
                this.zhaomuSettingPanel.dispose();
                this.zhaomuSettingPanel = null;
            }

            if (this.applyFactionList) {
                this.applyFactionList.dispose();
                this.applyFactionList = null;
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
            this._publicbgRender = new UIRenderComponent;
            this.addRender(this._publicbgRender);
            this._AtopRender1 = new UIRenderComponent;

            this._BtopRender1 = new UIRenderComponent;
            this._BtopRender2 = new UIRenderComponent;
            this._BtopRender3 = new UIRenderComponent;


            this.ARenderList = new Array
            this.ARenderList.push(this._AtopRender1)
            this.BRenderList = new Array
            this.BRenderList.push(this._BtopRender1)
            this.BRenderList.push(this._BtopRender2)
            this.BRenderList.push(this._BtopRender3)

        }

        public applyLoad(): void {
            this._bgRender.uiAtlas = new UIAtlas();
            this._bgRender.uiAtlas.setInfo("ui/uidata/faction/zhaomu/recruiting.xml", "ui/uidata/faction/zhaomu/recruiting.png", () => { this.loadConfigCom() }, "ui/uidata/faction/factionpc.png");
        }

        private ARenderList: Array<UIRenderComponent>;
        private BRenderList: Array<UIRenderComponent>;

        public applyFactionList: ApplyFactionList;

        private tab_shenpi: SelectButton;
        private tab_zhaosetting: SelectButton;
        private no: UICompenent;

        public shengpiPanel: ShenpiPanel;
        public zhaomuSettingPanel: ZhaomuSettingPanel;
        private loadConfigCom(): void {
            this._AtopRender1.uiAtlas = this._bgRender.uiAtlas;

            this._BtopRender1.uiAtlas = this._bgRender.uiAtlas;
            this._BtopRender2.uiAtlas = this._bgRender.uiAtlas;
            this._BtopRender3.uiAtlas = this._bgRender.uiAtlas;

            this._publicbgRender.uiAtlas = WindowUi.winUIAtlas;

            this.tab_shenpi = <SelectButton>this.addEvntBut("tab_shenpi", this._bgRender);
            this.tab_zhaosetting = <SelectButton>this.addEvntBut("tab_zhaomu", this._bgRender);

            this.addChild(<UICompenent>this._bgRender.getComponent("a_5"));
            this.no = this.addChild(<UICompenent>this._bgRender.getComponent("no"));
            var bg3 = this.addChild(<UICompenent>this._publicbgRender.getComponent("cnew_infobg"));
            this.setSizeForPanelUiCopy(bg3, "g_bg_2", this._bgRender);

            //审批列表
            this.shengpiPanel = new ShenpiPanel();
            this.shengpiPanel.setRender(this._AtopRender1, this._publicbgRender);
            this.addVirtualContainer(this.shengpiPanel);
            //招募设置
            this.zhaomuSettingPanel = new ZhaomuSettingPanel();
            this.zhaomuSettingPanel.setRender(this._BtopRender1, this._BtopRender2, this._BtopRender3, this._publicbgRender);
            this.zhaomuSettingPanel.parent = this
            this.addVirtualContainer(this.zhaomuSettingPanel);
            this.applyLoadComplete();
        }


        private selecttype($value: number): void {
            if ($value == 0) {
                this.tab_shenpi.selected = true;
                this.tab_zhaosetting.selected = false;
                this.renderSetVisibel(this.ARenderList, true);
                this.renderSetVisibel(this.BRenderList, false);

                if (!this.applyFactionList) {
                    this.applyFactionList = new ApplyFactionList();
                    this.applyFactionList.init(this._bgRender.uiAtlas);
                }
                this.applyFactionList.show();
            } else {
                this.tab_zhaosetting.selected = true;
                this.tab_shenpi.selected = false;
                this.renderSetVisibel(this.BRenderList, true);
                this.renderSetVisibel(this.ARenderList, false);

                if (this.applyFactionList) {
                    this.applyFactionList.hide();
                }
            }
            this.selectdata($value);
        }
        private _type: number;//当前tab
        private selectdata($value: number): void {
            if (this._type == $value)
                return;
            this._type = $value
            //处理逻辑

            if (this.shengpiPanel) {
                this.shengpiPanel.setSelect(!$value);
            }
            if (this.zhaomuSettingPanel) {
                this.zhaomuSettingPanel.setSelect($value != 0);
            }

            this.resize();
        }

        public resize(): void {
            super.resize();
            if (this.applyFactionList) {
                this.applyFactionList.left = this.no.parent.x / UIData.Scale + this.no.x
                this.applyFactionList.top = this.no.parent.y / UIData.Scale + this.no.y
            }
        }

        public show(): void {
            console.log("-----招募页面");
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.selecttype(0);
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
                this.applyFactionList.hide();
            }
            // var $factionPersonPanel: FactionPersonPanel = <FactionPersonPanel>this.parent;
            // $factionPersonPanel.show();
        }


        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.c_close:
                    this.hide();
                    break
                case this.tab_shenpi:
                    this.selecttype(0);
                    break
                case this.tab_zhaosetting:
                    this.selecttype(1);
                    break
                default:
                    break;
            }
        }
    }



    export class ShenpiPanel extends UIVirtualContainer {

        private _bgRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

        }

        public dispose() {
            this._bgRender.dispose();
            this._bgRender = null;
        }

        public setRender($bgRender: UIRenderComponent, $publicbgUiAtlas: UIRenderComponent): void {
            this._bgRender = $bgRender;
            this._publicRender = $publicbgUiAtlas;
            this.loadConfigCom();
        }

        private b_btnbg_no: UICompenent;
        private b_btnbg_ok: UICompenent;
        private _uiAry: Array<UICompenent>
        private loadConfigCom(): void {
            this.addUIList(["a_19", "a_20", "a_18", "a_17", "line_4", "line_2_7", "line_2_8", "line_2_9", "a_23", "a_22"], this._bgRender);
            this._uiAry = new Array;
            this.b_btnbg_no = this.addEvntBut("cnew_but_no", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_no, "b_btnbg_no", this._bgRender);
            this._uiAry.push(this.b_btnbg_no);
            this.b_btnbg_ok = this.addEvntBut("cnew_but_yes", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_ok, "b_btnbg_ok", this._bgRender);
            this._uiAry.push(this.b_btnbg_ok);
        }

        public setSelect($flag: boolean): void {
            this.setUiListVisibleByItem(this._uiAry, $flag);
        }


        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.b_btnbg_no:
                    // console.log("全部拒绝");
                    NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_REFUSE_JOIN_ALL, 0, 0, "", "");
                    break
                case this.b_btnbg_ok:
                    // console.log("全部同意");
                    NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_AGREE_JOIN_ALL, 0, 0, "", "");
                    break
                default:
                    break;
            }

        }
    }





    export class ZhaomuSettingPanel extends UIVirtualContainer {


        private _bgRender: UIRenderComponent;
        private _publicRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

        }

        public dispose() {
            this._bgRender.dispose();
            this._bgRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
        }
        
        public setRender($bgRender: UIRenderComponent, $bottomRender: UIRenderComponent, $base: UIRenderComponent, $publicbgUiAtlas: UIRenderComponent): void {
            this._bgRender = $bgRender;
            this._bottomRender = $bottomRender;
            this._baseRender = $base;
            this._publicRender = $publicbgUiAtlas;
            this.loadConfigCom();
        }

        private minlev: UICompenent;
        private maxlev: UICompenent;
        private a_25: UICompenent;
        private a_27: UICompenent;
        private a_32: UICompenent;
        private a_33: UICompenent;
        private a_26: UICompenent;
        private b_bg5: UICompenent;
        private a_37: UICompenent;
        private b_btnbg_sure: UICompenent;
        private b_selectbtn: SelectButton;

        private _aryUI: Array<UICompenent>
        private loadConfigCom(): void {

            var renderLevel: UIRenderComponent = this._baseRender

            this.b_selectbtn = <SelectButton>this.addChild(renderLevel.getComponent("b_selectbtn"));
            this.a_33 = this.addChild(<UICompenent>renderLevel.getComponent("a_33"));

            this.a_25 = this.addEvntBut("a_25", renderLevel);

            this.a_37 = this.addChild(<UICompenent>renderLevel.getComponent("a_37"));

            this.minlev = this.addChild(<UICompenent>renderLevel.getComponent("a_35"));
            this.maxlev = this.addChild(<UICompenent>renderLevel.getComponent("a_36"));


            this.a_26 = this.addChild(<UICompenent>this._bottomRender.getComponent("a_26"));

            this.a_27 = this.addChild(<UICompenent>this._bgRender.getComponent("a_27"));
            this.a_32 = this.addChild(<UICompenent>this._bgRender.getComponent("a_32"));

            this.addUIList(["c_4", "c_3"], this._bottomRender);
            this.addUIList(["a_24_1", "a_24_2"], this._bgRender);
            this.addUIList(["a_28", "a_29", "a_34", "a_30"], renderLevel);


            this._aryUI = new Array
            this.b_bg5 = this.addEvntBut("cnew_txtbg", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_bg5, "b_bg5", this._bottomRender);
            this._aryUI.push(this.b_bg5);

            this.b_btnbg_sure = this.addEvntBut("cnew_but_yes", this._publicRender);
            this.setSizeForPanelUiCopy(this.b_btnbg_sure, "b_btnbg_sure", this._bottomRender);
            this._aryUI.push(this.b_btnbg_sure);

            // this.initData();

        }


        private initData(): void {
            // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.minlev.skinName, String(1), ArtFont.num10, TextAlign.CENTER);

            // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.maxlev.skinName, String(RecruitingPanel.ServerMaxLev), ArtFont.num10, TextAlign.CENTER);

            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.minlev.skinName, String(1), 16, TextAlign.CENTER, ColorType.Orange853d07);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.maxlev.skinName, String(RecruitingPanel.ServerMaxLev), 16, TextAlign.CENTER, ColorType.Orange853d07);

            //初始化宣言面板
            var zmgg: string = GuidData.faction.getZhaomuGG()
            if (zmgg && zmgg.length > 0) {
                this._msgTxt = zmgg;
                this._type = true;
            }
            this.refreshInputBfun(this._msgTxt, this._type);

            //初始化审批按钮
            this.b_selectbtn.selected = GuidData.faction.getAutoJoin();

            //初始化进度条
            this._currentLev = GuidData.faction.getJoinLimtLev()
            this._percentage = GuidData.faction.getJoinLimtLev() / RecruitingPanel.ServerMaxLev;
            this.drawProbar(this._percentage);
            this.setPercentage(this._currentLev);
            this.setcoordinates();
        }

        public setSelect($flag: boolean): void {
            this.setUiListVisibleByItem(this._aryUI, $flag);
            this.initData();
        }


        //控件a_17的偏移量
        private _tx1: number = 3;
        //控件b_txt的偏移量
        private _tx2: number = 0;

        private setcoordinates(): void {
            //最大宽度
            var $w2: number = this.a_27.width - this.a_25.width;
            this.a_25.x = this._percentage * $w2 + this.a_27.x;
            this.a_32.x = this.a_25.x - this._tx1
            this.a_33.x = this.a_25.x - this._tx2
        }

        private _lastMouseX: number = 0;
        private _lastMcX: number = 0
        private _percentage: number = 0;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastMcX = this.a_25.x

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {

            //移动的时候重绘圆形的坐标，但是要判断其是否超出范围
            //起始位置
            var $posx: number = this.a_27.x;
            //终点位置
            var $disx: number = this.a_27.x + this.a_27.width - this.a_25.width;
            //按钮当前位置
            var $distion: number = this._lastMcX + (evt.x - this._lastMouseX) / UIData.Scale;
            //最大宽度
            var $w2: number = this.a_27.width - this.a_25.width;
            if ($disx > $distion
                && $posx < $distion) {
                this.a_25.x = $distion
                this.a_32.x = $distion - this._tx1
                this.a_33.x = $distion - this._tx2
            } else {
                if (this.a_25.x < $posx) {
                    this.a_25.x = $posx;
                    this.a_32.x = $posx - this._tx1
                    this.a_33.x = $posx - this._tx2
                }
                if (this.a_25.x > $disx) {
                    this.a_25.x = $disx;
                    this.a_32.x = $disx - this._tx1
                    this.a_33.x = $disx - this._tx2
                }
            }
            //绘制进度
            this._percentage = (this.a_25.x - this.a_27.x) / $w2;
            this.drawProbar(this._percentage);
            this._currentLev = Math.ceil(this._percentage * RecruitingPanel.ServerMaxLev);
            this.setPercentage(this._currentLev);
        }

        private _currentLev: number

        private drawProbar($ratio: number): void {

            if ($ratio == 0) {
                $ratio = 0.01;
            }

            this.a_26.uvScale = $ratio;
            // var $rec: UIRectangle = this._bottomRender.uiAtlas.getRec(this.a_26.skinName);
            // var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            // var progress_bar: UIRectangle = this._bottomRender.uiAtlas.getRec("progress_bar")
            // ctx.drawImage(this._bottomRender.uiAtlas.useImg, progress_bar.pixelX, progress_bar.pixelY, progress_bar.pixelWitdh * $ratio, progress_bar.pixelHeight, 0, 0, 329 * $ratio, 11);

            // this._baseRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }

        private setPercentage($num: number): void {
            // ArtFont.getInstance().writeFontToSkinName(this._baseRender.uiAtlas, this.a_33.skinName, $num == 0 ? String(1) : String($num), ArtFont.num3, TextAlign.CENTER)
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.a_33.skinName, $num == 0 ? String(1) : String($num), 16, TextAlign.CENTER, ColorType.Whitefff4d6);
        }

        public _msgTxt: string = "在此输入文字（50）"
        public _type: boolean = false
        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_25:
                    //拖动条事件
                    this.A_left_bg_MouseDown(evt)
                    break;
                case this.b_bg5:
                    //文本框监听事件  
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._type ? this._msgTxt : "", 0, 50)
                    break;
                case this.b_btnbg_sure:
                    //提交按钮事件
                    if (this.dataChangFlag()) {
                        //设置改变，则提交，否则不提交
                        var str: string
                        if (this._msgTxt == "在此处输入文字（50）" || this._msgTxt == "") {
                            str = "";
                        } else {
                            str = this._msgTxt;
                        }
                        var byte: ByteArray = new ByteArray()
                        byte.writeUTF(str);
                        if (byte.length > 100) {
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "字符太长", 99);
                            return;
                        }

                        NetManager.getInstance().protocolos.faction_manager(SharedDef.FACTION_MANAGER_TYPE_RECRUIT, this.b_selectbtn.selected ? 1 : 0, this._currentLev, str, "")
                    }
                    var $recruitingPanel: RecruitingPanel = <RecruitingPanel>this.parent;
                    $recruitingPanel.hide();
                    break;
                default:
                    break;
            }
        }

        private dataChangFlag(): boolean {
            if (this.b_selectbtn.selected != GuidData.faction.getAutoJoin()) {
                return true;
            }
            if (this._msgTxt != GuidData.faction.getZhaomuGG()) {
                return true;
            }
            if (GuidData.faction.getJoinLimtLev() != this._currentLev) {
                return true;
            }
            return false;
        }

        private inputBfun($str: string): void {
            if ($str.length > 0) {
                this._type = true;
                this._msgTxt = $str;
            } else {
                this._type = false;
                this._msgTxt = "在此处输入文字（50）";
            }
            this.refreshInputBfun(this._msgTxt, this._type)
        }

        private refreshInputBfun($str: string, $type: boolean): void {
            LabelTextFont.writeText(this._bgRender.uiAtlas, this.a_37.skinName, 10, 5, $str, 16, $type ? "#853d07" : "#853d07", 320, true);
        }
    }
}