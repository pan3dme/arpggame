module warehousetreasure {

    export class TreasurePanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._midRender.dispose();
            this._midRender = null;

            //if (this.treasureList) {
            //    this.treasureList.dispose();
            //    this.treasureList = null;
            //}
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
        }

        public initUiAtlas($uiAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            var renderLevel: UIRenderComponent = this._topRender;

            //this.treasureList = new TreasureList();
            //this.treasureList.init($uiAtlas);

            this.initView(renderLevel);


        }

        private b_yinbijx: UICompenent
        private b_yuanbaojx: UICompenent
     //   public treasureList: TreasureList;

 
        private a_duihuanIcon: UICompenent

        private a_add_label_num_0: UICompenent
        private a_add_label_num_1: UICompenent

       // private a_txt_bg_1:UICompenent
        private initView(renderLevel: UIRenderComponent): void {
            var renderLevel: UIRenderComponent = this._topRender;


            this.addRoundBg();

            this.a_add_label_num_0=  this.addChild(this._midRender.getComponent("a_add_label_num_0"));
            this.a_add_label_num_1 =this.addChild(this._midRender.getComponent("a_add_label_num_1"));
            
            var $tabelary: Array<tb.Tb_faction_donation> = tb.Tb_faction_donation.get_Tb_faction_donation();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_add_label_num_0.skinName, ColorType.color9a683f+ "增加贡献" + $tabelary[0].devote[1],14, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_add_label_num_1.skinName, ColorType.color9a683f +"增加贡献" + $tabelary[1].devote[1], 14, TextAlign.CENTER);

            this.a_duihuanIcon = this.addChild(this._topRender.getComponent("a_duihuanIcon"));
            //捐献种类  1：银币  2：元宝  和配表相符
            this.b_yinbijx = this.addEvntButUp("b_yinbi", this._midRender);
            this.b_yinbijx.data = 1
            this.b_yuanbaojx = this.addEvntButUp("b_yuanbao", this._midRender);
            this.b_yuanbaojx.data = 2



           this.addChild(this._midRender.getComponent("a_shenyu_label_txt0"));
           this.addChild(this._midRender.getComponent("a_shenyu_label_txt1"));
           var a_shenyu_label_txt2: UICompenent = this.addChild(this._midRender.getComponent("a_shenyu_label_txt2"));
           LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, a_shenyu_label_txt2.skinName, ColorType.Orange853d07 + "剩余次数:", 14, TextAlign.CENTER);

           this.a_duihuan_txt = this.addChild(<UICompenent>this._midRender.getComponent("a_duihuan_txt"));


           this.a_yuanbao_need_num = this.addChild(this._midRender.getComponent("a_yuanbao_need_num"));
           this.a_yinbi_need_num = this.addChild(this._midRender.getComponent("a_yinbi_need_num"));
           this.a_yinbi_can_num =  this.addChild(this._midRender.getComponent("a_yinbi_can_num"));
           this.a_yuanbao_can_num = this.addChild(this._midRender.getComponent("a_yuanbao_can_num"));

           this.a_duanhuan_need_num = this.addChild(this._midRender.getComponent("a_duanhuan_need_num"));
           this.a_duanhuan_has_num = this.addChild(this._midRender.getComponent("a_duanhuan_has_num"));
           this.addChild(this._midRender.getComponent("a_txt2"));
           this.addChild(this._midRender.getComponent("a_txt3"));


           this.a_duanhuan_but = this.addEvntButUp("a_duanhuan_but", this._topRender)


        }

  

        private a_fenge_line: UICompenent;
        private a_duanhuan_but: UICompenent;
        private a_yuanbao_need_num: UICompenent;
        private a_yinbi_need_num: UICompenent;
        private a_yinbi_can_num: UICompenent;
        private a_yuanbao_can_num: UICompenent;

        private a_duanhuan_need_num:UICompenent
        private a_duanhuan_has_num:UICompenent

        private addRoundBg(): void
        {
            var a_duihuan_round_bg0: UICompenent = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg0"));
            var a_duihuan_round_bg1: UICompenent = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg1"));
            var a_duihuan_round_bg2: UICompenent = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg2"));
            var a_duihuan_round_bg3: UICompenent = this.addChild(this._bottomRender.getComponent("a_duihuan_round_bg3"));

            a_duihuan_round_bg0.isU = true
            a_duihuan_round_bg0.isV = true

            a_duihuan_round_bg1.isV = true

            a_duihuan_round_bg2.isU = true




            this._bottomRender.applyObjData();
            
        }
        private a_duihuan_txt:UICompenent
        public refreshFactionMoney(): void {
            var $tabelary: Array<tb.Tb_faction_donation> = tb.Tb_faction_donation.get_Tb_faction_donation();

            //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yinbi_need_num.skinName, ColorType.Orange + String($tabelary[0].devote), 14, TextAlign.CENTER)
            //LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yuanbao_need_num.skinName, ColorType.Orange + $tabelary[0].cost[0][1], 14, TextAlign.CENTER)
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_yinbi_need_num.skinName, $tabelary[0].cost[0], ColorType.Orange853d07, 118, 20);
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_yuanbao_need_num.skinName, $tabelary[1].cost[0], ColorType.Orange853d07, 118, 20);
        }
        private _totalYinBi: number
        private _totalYuanBao: number
        private _residueTimesYinBi: number
        private _residueTimesYuanBao: number
        public setdonationByYinBiTimes(): void {
            var $viplev: number = GuidData.player.getVipLevel();
            var $tabelvo: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (GuidData.player.getIsVIP()) {
                var tabeldata: tb.TB_vip_base = tb.TB_vip_base.get_TB_vip_baseById($viplev);
                this._totalYinBi = $tabelvo.golddonation + tabeldata.factiondonation;
            } else {
                this._totalYinBi = $tabelvo.golddonation;
            }

            this._residueTimesYinBi = this._totalYinBi - GuidData.faction.goldDonation
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yinbi_can_num.skinName, ColorType.Green2ca937 + this._residueTimesYinBi + "/" + this._totalYinBi, 14, TextAlign.CENTER)
        }
        public setdonationByYuanBaoTimes(): void {
            var $viplev: number = GuidData.player.getVipLevel();
            var $tabelvo: tb.Tb_faction_base = tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
            if (GuidData.player.getIsVIP()) {
                var tabeldata: tb.TB_vip_base = tb.TB_vip_base.get_TB_vip_baseById($viplev);
                this._totalYuanBao = $tabelvo.ybdonation + tabeldata.factionybdonation;
            } else {
                this._totalYuanBao = $tabelvo.ybdonation;
            }
            this._residueTimesYuanBao = this._totalYuanBao - GuidData.faction.ybDonation
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_yuanbao_can_num.skinName, ColorType.Green2ca937 + this._residueTimesYuanBao + "/" + this._totalYuanBao, 14, TextAlign.CENTER)
        }
        public refrishDuiHuanTxt(): void
        {

            var $tb: tb.TB_faction_building = faction.FactionBuildModel.getInstance().getTabvo(2)
            console.log($tb);
            var $num: number = GuidData.player.getPlayerIntFiledFactionDonateGiftExchangeDailyCount();
           LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_duihuan_txt.skinName, ColorType.Green2ca937 + $num + "/" + $tb.params[0], 16);


            // UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_duihuan_txt.skinName, [String(-1), $num + "/" + $tb.params[0]], ColorType.Orange853d07);

            var $aColor: string = GuidData.player.getResType(6) >= $tb.params[3] ? ColorType.Orange853d07 : ColorType.colorce0a00;
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_duanhuan_need_num.skinName, [String(6), String($tb.params[3])], $aColor, 118, 20);
            UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.a_duanhuan_has_num.skinName, [String(6), String(GuidData.player.getResType(6))], ColorType.Brown7a2f21, 118, 20);

            IconManager.getInstance().drawItemIcon60(this.a_duihuanIcon, $tb.params[2]);
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.refreshFactionMoney();
                this.setdonationByYinBiTimes();
                this.setdonationByYuanBaoTimes();
                this.refrishDuiHuanTxt()
            }
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }

        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.b_yinbijx:
                case this.b_yuanbaojx:
                    var residueTimes: number;
                    if (evt.target.data == 1) {
                        //银币
                        residueTimes = this._residueTimesYinBi
                        this.showDuihuanYinbiPanel();
                        return 
                    } else {
                        //元宝
                        residueTimes = this._residueTimesYuanBao
                        this.showDuihuanYanBaoPanel()
                    }
                    if (residueTimes < 1) {
                        msgtip.MsgTipManager.outStrById(22, 19);
                        return;
                    }


                    var $donationEvent: donation.DonationEvent = new donation.DonationEvent(donation.DonationEvent.SHOW_DONATION_PANEL)
                    $donationEvent.data = evt.target.data
                    ModuleEventManager.dispatchEvent($donationEvent)
                    break

                case this.a_duanhuan_but:

                    this.showDuihuanPanel();
                    break
                default:
                    break;
            }
        }
        private showDuihuanYinbiPanel(): void {
            var $tb: tb.Tb_faction_donation = tb.Tb_faction_donation.get_Tb_faction_donationById(1)
            var $evt: duihuan.DuiHuanEvent = new duihuan.DuiHuanEvent(duihuan.DuiHuanEvent.SHOW_DUIHUAN_PANEL)
            $evt.UseResType = $tb.cost[0][0];
            $evt.tittleid = 1;
            $evt.MaxSelectNum = this._residueTimesYinBi;
            $evt.UnitPrice = $tb.cost[0][1];
            $evt.SubmitFun = (value: number) => {
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 1, value, "", "");
            }
            ModuleEventManager.dispatchEvent($evt);
        }
        private showDuihuanYanBaoPanel(): void {
            var $tb: tb.Tb_faction_donation = tb.Tb_faction_donation.get_Tb_faction_donationById(2)
            var $evt: duihuan.DuiHuanEvent = new duihuan.DuiHuanEvent(duihuan.DuiHuanEvent.SHOW_DUIHUAN_PANEL)
            $evt.UseResType = $tb.cost[0][0];
            $evt.tittleid = 0;
            $evt.MaxSelectNum = this._residueTimesYuanBao;
            $evt.UnitPrice = $tb.cost[0][1];
            $evt.SubmitFun = (value: number) => {
              //  NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 1, value, "", "");
                NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_JUANXIAN, 2, value, "", "");
            }
            ModuleEventManager.dispatchEvent($evt);
        }

        private showDuihuanPanel(): void
        {
            var $tb: tb.TB_faction_building = faction.FactionBuildModel.getInstance().getTabvo(2);
            var $num: number = GuidData.player.getPlayerIntFiledFactionDonateGiftExchangeDailyCount();
            if (GuidData.player.getResType(6) >= $tb.params[3]) {
                if (($tb.params[0] - $num) > 0) {
                    var $evt: duihuan.DuiHuanEvent = new duihuan.DuiHuanEvent(duihuan.DuiHuanEvent.SHOW_DUIHUAN_PANEL)
                    $evt.UseResType = 6;
                    $evt.tittleid = 2;
                    $evt.MaxSelectNum = $tb.params[0] - $num;
                    $evt.UnitPrice = $tb.params[3];
                   // $evt.SubmitFun = (value: number) => { this.clikDuanFunction(value) }
                    $evt.SubmitFun = (value: number) => {
                        NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_DONATE_GIFT_EXCHANGE, value, 0, "", "");
                    }
                    ModuleEventManager.dispatchEvent($evt);
                } else {
                    msgtip.MsgTipManager.outStr("[ff0000]今日已全部兑换", 99);
                }
            } else {
                // msgtip.MsgTipManager.outStr("[ff0000]拥有的贡献不足", 99);
                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                $aaa.data = 6
                ModuleEventManager.dispatchEvent($aaa);
            }
        }
    
        public getListItem(): Array<SListItemData>  {
            var $ary: Array<FactionEventData> = this.getDataEventList();
            var $sListItemData: Array<SListItemData>  = this.getData($ary);
            return $sListItemData
        }
        private getDataEventList(): Array<FactionEventData> {
            var $ary: Array<FactionEventData> = GuidData.faction.getEventList();
            var flag: number = GuidData.faction.getEventFlag();
            var list: Array<FactionEventData> = new Array;
            for (var i: number = flag; i < $ary.length; i++) {
                list.push($ary[i]);
            }
            for (var i: number = 0; i < flag; i++) {
                list.push($ary[i]);
            }
            return list;
        }

        private getData($ary: Array<FactionEventData>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = $ary.length-1; i >=0 ; i--) {
                var item: SListItemData = new SListItemData;
                item.data = this.getToStr($ary[i]);
                item.id = ary.length;
                ary.push(item);
            }
            return ary;
        }
        private getToStr($vo: FactionEventData): string
        {
            var $ybstr: string = ($vo.type == 2 ? "元宝" : "银币");
            var tabelvo: tb.Tb_faction_donation = tb.Tb_faction_donation.get_Tb_faction_donationById($vo.type);
            var num = tabelvo.money * $vo.value;
            var $str: string = "[]" + getBaseName($vo.name) + "使用" + ColorType.Green56da35 + $ybstr + "[]捐献了" + ColorType.Green56da35 + $vo.value + "[]次,家族资金增加了" + ColorType.Green56da35+num;
           return $str;
        }
    }



}