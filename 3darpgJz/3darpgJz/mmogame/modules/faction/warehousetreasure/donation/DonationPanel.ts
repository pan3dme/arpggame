module donation {

    export class DonationPanel extends UIPanel {

        private _AbgRender: UIRenderComponent;
        private _AbottomRender: UIRenderComponent;
        private _AbaseRender: UIRenderComponent;
        private _AtopRender1: UIRenderComponent;
        private _AtopRender2: UIRenderComponent;
        private _AtopRender3: UIRenderComponent;

        public dispose(): void {
            this._AbgRender.dispose();
            this._AbgRender = null;
            this._AbottomRender.dispose();
            this._AbottomRender = null;
            this._AbaseRender.dispose();
            this._AbaseRender = null;
            this._AtopRender1.dispose();
            this._AtopRender1 = null;
            this._AtopRender2.dispose();
            this._AtopRender2 = null;
            this._AtopRender3.dispose();
            this._AtopRender3 = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0
            this.center = 0

            //添加好友面板渲染器
            this._AbgRender = new UIRenderComponent;
            this.addRender(this._AbgRender)
            this._AbottomRender = new UIRenderComponent;
            this.addRender(this._AbottomRender)
            this._AbaseRender = new UIRenderComponent;
            this.addRender(this._AbaseRender)
            this._AtopRender1 = new UIRenderComponent;
            this.addRender(this._AtopRender1)
            this._AtopRender2 = new UIRenderComponent;
            this.addRender(this._AtopRender2)
            this._AtopRender3 = new UIRenderComponent;
            this.addRender(this._AtopRender3)
        }
        public applyLoad(): void {
            this._AbgRender.uiAtlas=new UIAtlas
            this._AbgRender.uiAtlas.setInfo("ui/uidata/faction/warehousetreasure/donation/donation.xml", "ui/uidata/faction/warehousetreasure/donation/donation.png", () => { this.loadUiatalsFinsish() }, "ui/uidata/faction/warehousetreasure/warehouseuse.png");
        }
        private uiAtlasComplet: boolean = false;
        private loadUiatalsFinsish(): void {
            this.init(this._AbgRender.uiAtlas);
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }

        public init($uiAtlas: UIAtlas): void {
            this._AbgRender.uiAtlas = $uiAtlas;
            this._AbottomRender.uiAtlas = $uiAtlas;
            this._AbaseRender.uiAtlas = $uiAtlas;
            this._AtopRender1.uiAtlas = $uiAtlas;
            this._AtopRender2.uiAtlas = $uiAtlas;
            this._AtopRender3.uiAtlas = $uiAtlas;
            this.loadConfigCom();
        }


        private b_btn8bg_qr: UICompenent
        private b_btn8bg_qx: UICompenent
        private b_close4: UICompenent
        private a_26_1: UICompenent
        private a_27_1: UICompenent
        private a_25_1: UICompenent
        private a_33_1: UICompenent
        private a_32_1: UICompenent
        private minTimes: UICompenent
        private maxTimes: UICompenent
        private otherTimes: UICompenent
        private needcost: UICompenent
        private mymoney: UICompenent
        private b_bg9_1: UICompenent
        private f_1: FrameCompenent
        private loadConfigCom(): void {
            var renderLevel: UIRenderComponent = this._AtopRender1;
            this.addChild(<UICompenent>this._AbottomRender.getComponent("g_bg_9"));
            this.addChild(<UICompenent>this._AbaseRender.getComponent("g_bg_10"));

            this.b_bg9_1 = this.addEvntBut("b_bg9_1", this._AbgRender);

            this.addUIList(["a_21_2", "a_59", "a_71", "a_72", "a8_51", "a8_34"], this._AtopRender1);

            this.needcost = this.addChild(<UICompenent>this._AtopRender1.getComponent("a_74"));
            this.mymoney = this.addChild(<UICompenent>this._AtopRender1.getComponent("a_75"));

            this.minTimes = this.addChild(<UICompenent>this._AtopRender1.getComponent("a_35_1"));
            this.maxTimes = this.addChild(<UICompenent>this._AtopRender1.getComponent("a_36_1"));
            this.otherTimes = this.addChild(<UICompenent>this._AtopRender1.getComponent("a_73"));

            this.a_26_1 = this.addChild(<UICompenent>this._AtopRender2.getComponent("a_26_1"));

            this.a_27_1 = this.addChild(<UICompenent>this._AtopRender1.getComponent("a_27_1"));


            this.a_25_1 = this.addEvntBut("a_25_1", this._AtopRender3);
            this.a_33_1 = this.addChild(<UICompenent>this._AtopRender2.getComponent("a_33_1"));
            this.a_32_1 = this.addChild(<UICompenent>this._AtopRender2.getComponent("a_32_1"));

            this.b_btn8bg_qr = this.addEvntBut("b_btn8bg_qr", this._AbaseRender);
            this.b_btn8bg_qx = this.addEvntBut("b_btn8bg_qx", this._AbaseRender);
            this.b_close4 = this.addEvntBut("b_close4", this._AbaseRender);

            this.f_1 = <FrameCompenent>this.addChild(this._AtopRender1.getComponent("f_1"));
        }

        private _tabelary: Array<tb.Tb_faction_donation>;
        private initData(): void {
            this._tabelary = tb.Tb_faction_donation.get_Tb_faction_donation();
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender1.uiAtlas, this.minTimes.skinName, String(1), ArtFont.num10, TextAlign.CENTER);

            this.setMyMoney();
            var $tabelvo: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());

            if (this._type == 1) {
                //银币
                this.f_1.goToAndStop(1);
            } else {
                //元宝
                this.f_1.goToAndStop(0);
            }
            var residueTimes: number = this.getresidueTimes(this._type);

            //设置剩余次数
            this.setMaxTimes(residueTimes);

            this._currentYB = 1
            this._percentage = 0;
            this.drawProbar(this._percentage);
            this.setPercentage(this._currentYB);
            this.setcoordinates();
            this.setNeedCost();

            this.resize();
        }

        public setMyMoney(): void {
            var mymoney = this.getMyMoney();
            var aaa = this._type == 1 ? 3 : 1;
            UiDraw.drawRewardIconAndtxt(this.mymoney,[aaa,mymoney],false,TextAlign.LEFT)
        }

        private _needCost: number
        private setNeedCost(): void {
            var num: number;
            if (this._type == 1) {
                num = this._currentYB * this._tabelary[0].cost[0][1];
            } else {
                num = this._currentYB * this._tabelary[1].cost[0][1];
            }

            this._needCost = num;
            var aaa = this._type == 1 ? 3 : 1;
            UiDraw.drawRewardIconAndtxt(this.needcost,[aaa,num],false,TextAlign.LEFT)
        }

        private getresidueTimes($type): number {
            var $total: number
            var $viplev: number = GuidData.player.getVipLevel();
            var $tabelvo: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            var $basenum: number
            var $useTimes: number
            if ($type == 1) {
                //银币
                $basenum = $tabelvo.golddonation
                $useTimes = GuidData.faction.goldDonation
            } else {
                //元宝
                $basenum = $tabelvo.ybdonation
                $useTimes = GuidData.faction.ybDonation
            }
            if (GuidData.player.getIsVIP()) {
                var tabeldata: tb.TB_vip_base = tb.TB_vip_base.get_TB_vip_baseById($viplev);
                var currenttype = $type == 1 ? tabeldata.factiondonation : tabeldata.factionybdonation;
                $total = $basenum + currenttype;
            } else {
                $total = $basenum;
            }

            return ($total - $useTimes);
        }


        public setMaxTimes($num: number): void {
            // if ($num == -1) {
            //     $num = this.getresidueTimes(this._type);
            // }
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender1.uiAtlas, this.maxTimes.skinName, String($num), ArtFont.num10, TextAlign.CENTER);
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender1.uiAtlas, this.otherTimes.skinName, String($num), ArtFont.num10, TextAlign.CENTER);
        }


        public resize(): void {
            this.b_bg9_1.top = 0
            this.b_bg9_1.left = 0
            this.b_bg9_1.y = 0;
            this.b_bg9_1.x = 0;
            this.b_bg9_1.height = Scene_data.stageHeight / UIData.Scale;
            this.b_bg9_1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }

        private _type: number
        public show($data: any): void {
            this._type = $data;
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.initData();
                console.log("添加到舞台上来")
            }
        }

        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }


        //控件a_17的偏移量
        private _tx1: number = 10;
        //控件b_txt的偏移量
        private _tx2: number = 4;

        private setcoordinates(): void {
            //最大宽度
            var $w2: number = this.a_27_1.width - this.a_25_1.width;
            this.a_25_1.x = this._percentage * $w2 + this.a_27_1.x;
            this.a_32_1.x = this.a_25_1.x - this._tx1
            this.a_33_1.x = this.a_25_1.x - this._tx2
        }

        private _lastMouseX: number = 0;
        private _lastMcX: number = 0
        private _percentage: number = 0;
        private A_left_bg_MouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastMcX = this.a_25_1.x

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {

            //移动的时候重绘圆形的坐标，但是要判断其是否超出范围
            //起始位置
            var $posx: number = this.a_27_1.x;
            //终点位置
            var $disx: number = this.a_27_1.x + this.a_27_1.width - this.a_25_1.width;
            //按钮当前位置
            var $distion: number = this._lastMcX + (evt.x - this._lastMouseX) / UIData.Scale;
            //最大宽度
            var $w2: number = this.a_27_1.width - this.a_25_1.width;
            if ($disx > $distion
                && $posx < $distion) {
                this.a_25_1.x = $distion
                this.a_32_1.x = $distion - this._tx1
                this.a_33_1.x = $distion - this._tx2
            } else {
                if (this.a_25_1.x < $posx) {
                    this.a_25_1.x = $posx;
                    this.a_32_1.x = $posx - this._tx1
                    this.a_33_1.x = $posx - this._tx2
                }
                if (this.a_25_1.x > $disx) {
                    this.a_25_1.x = $disx;
                    this.a_32_1.x = $disx - this._tx1
                    this.a_33_1.x = $disx - this._tx2
                }
            }
            var residueTimes: number = this.getresidueTimes(this._type);
            //绘制进度
            this._percentage = (this.a_25_1.x - this.a_27_1.x) / $w2;
            this.drawProbar(this._percentage);
            this._currentYB = Math.ceil(this._percentage * residueTimes);
            this.setPercentage(this._currentYB);
            this.setNeedCost();
        }

        private _currentYB: number

        private drawProbar($ratio: number): void {
            var $rec: UIRectangle = this._AtopRender2.uiAtlas.getRec(this.a_26_1.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var progress_bar: UIRectangle = this._AtopRender2.uiAtlas.getRec("progress_bar")
            ctx.drawImage(this._AtopRender2.uiAtlas.useImg, progress_bar.pixelX, progress_bar.pixelY, progress_bar.pixelWitdh * $ratio, progress_bar.pixelHeight, 0, 0, 329 * $ratio, 11);

            this._AtopRender2.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }

        private setPercentage($num: number): void {
            ArtFont.getInstance().writeFontToSkinName(this._AtopRender2.uiAtlas, this.a_33_1.skinName, String($num), ArtFont.num3, TextAlign.CENTER)
        }


        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_25_1:
                    //拖动条事件
                    this.A_left_bg_MouseDown(evt)
                    break;
                case this.b_close4:
                case this.b_btn8bg_qx:
                    this.hide();
                    break;
                case this.b_bg9_1:
                    break;
                case this.b_btn8bg_qr:
                    if (this._needCost > this.getMyMoney()) {
                        msgtip.MsgTipManager.outStrById(22, 29);
                        return;
                    }
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, this._type, this._currentYB, "", "");
                    this.hide();
                    break;
                default:
                    break;
            }
        }

        private getMyMoney(): number {
            var mymoney: number;
            if (this._type == 1) {
                mymoney = GuidData.player.getSilver();
            } else {
                mymoney = GuidData.player.getGoldIngot();
            }
            return mymoney;
        }
    }
}