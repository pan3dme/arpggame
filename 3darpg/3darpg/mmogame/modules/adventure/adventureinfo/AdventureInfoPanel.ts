module adventureinfo {

    export class AdventureInfoPanel extends UIPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;
        private _frameRender: FrameUIRender;


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.bottom = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);


            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;
            this.interfaceUI = true;
        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/adventurinfo/adventurinfo.xml", "ui/uidata/adventure/adventurinfo/adventurinfo.png", () => { this.loadConfigCom() });
        }
        private a_kill_info: UICompenent;
        private a_info_bar: UICompenent;
        private a_kill_info_bg: UICompenent;

        private a_boss_but: UICompenent;
        private a_unlockbtn: UICompenent;
        private a_autoplay: FrameCompenent;

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.unlockArray = new Array()
            this.a_unlockbtn = this.addEvntButUp("a_unlockbtn", this._topRender)
            this.unlockArray.push(this.a_unlockbtn);
            this.unlockArray.push(this._bottomRender.getComponent("a_bg"));
            this.unlockArray.push(this._topRender.getComponent("a_unlockinfo"));

            this.a_boss_but = this.addEvntButUp("a_boss_but", this._topRender)

            this.a_autoplay = <FrameCompenent>this.addEvntButUp("a_autoplay", this._topRender)

            this.killInfoUiList = new Array()
            this.a_kill_info_bg = this.addChild(<UICompenent>this._bottomRender.getComponent("a_kill_info_bg"));
            this.a_info_bar = this.addChild(<UICompenent>this._midRender.getComponent("a_info_bar"));
            this.a_kill_info = this.addChild(<UICompenent>this._topRender.getComponent("a_kill_info"));

            this.a_move_point = this.addChild(<UICompenent>this._topRender.getComponent("a_move_point"));

            this.killInfoUiList.push(this.a_move_point);

            this.killInfoUiList.push(this.a_kill_info_bg);
            this.killInfoUiList.push(this.a_info_bar);
            this.killInfoUiList.push(this.a_kill_info);

            this.uiAtlasComplet = true
            this.buildFram();
        }
        private a_move_point: UICompenent


        private unlockArray: Array<UICompenent>
        private killInfoUiList: Array<UICompenent>
        private _autoplayflag: boolean = false;
        protected butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_boss_but:
                    UIManager.popClikNameFun("a_boss_but");
                    this.setUiListVisibleByItem([this.a_boss_but], false);
                    this.playEff(false);
                    //  ModuleEventManager.dispatchEvent(new adventurebossnotice.AdventureBossNoticeEvent(adventurebossnotice.AdventureBossNoticeEvent.SHOW_Adventure_Notice_UI_PANEL))

                    TimeUtil.addTimeOut(100, this.showBossView)

                    break
                case this.a_unlockbtn:
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + this._curtb.level + "级开启本关BOSS挑战", 99);
                    break
                case this.a_autoplay:
                    this.setautoflag(!this._autoplayflag);
                    this.refresh();
                    break
                default:
                    break
            }
        }

        public setautoflag($val:boolean){
            this._autoplayflag = $val;
            if(this.a_autoplay){
                this.a_autoplay.goToAndStop(this._autoplayflag ? 1 : 0);
            }
        }

        private showBossView(): void {

            var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurBossTb();
            var $rewardList: Array<Array<number>> = new Array
            for (var i: number = 0; i < $tb.showitems.length; i++) {

                $rewardList.push([$tb.showitems[i], 1])
            }
            var $bossId: number = $tb.bossId;
            //var obj:any = TableData.getInstance().getData(TableData.tb_creature_worldrisk,$bossId)
            var $tb_creature_template: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($bossId);
            var $bossName: string = $tb.name.replace("BOSS", $tb_creature_template.name);

            var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_BOSSVIEW_PANEL);
            var data: boss.BossViewData = new boss.BossViewData();
            data.bossID = $tb.bossId
            data.force = $tb.advisepoint;
            data.checkpoint = $tb.name;
            data.showRank = false;
            data.rewardList = $rewardList;
            data.submitFun = () => {
                UIManager.popClikNameFun("t_btn");
                NetManager.getInstance().protocolos.challange_boss();
                console.log("请求挑战boss")
            };
            evt.data = data;
            ModuleEventManager.dispatchEvent(evt);
        }


        private effui: FrameTipCompenent;
        private buildFram(): void {
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_tzboss"), 4, 4, ($ui: any) => {
                    this.effui = $ui;
                    this.effui.x = this.a_boss_but.x + 5
                    this.effui.y = this.a_boss_but.y - 33
                    this.effui.width = this.effui.baseRec.width * 1.2;
                    this.effui.height = this.effui.baseRec.height * 1.2;
                    this.effui.speed = 3;
                    this.applyLoadComplete();
                }, 1);
            }else{
                this.applyLoadComplete();
            }
        }

        public playEff($isvisiable:boolean): void {
            if (!this.effui) {
                return;
            }
            if ($isvisiable) {
                this.addChild(this.effui);
                this.effui.play();
            } else {
                this.removeChild(this.effui);
            }
        }

        private _curtb: tb.TB_risk_data;
        public refresh(): void {
            if (this.uiAtlasComplet) {
                var $curNum: number = GuidData.player.getPlayerIntFieldTrialProcessCur();
                var $tatolNum: number = GuidData.player.getPlayerIntFieldTrialProcessTotal();
                var $strInfo: string = ColorType.Yellowffe9b4 + "击杀小怪 " + $curNum + "/" + $tatolNum + " ";

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_kill_info.skinName, $strInfo, 14, TextAlign.CENTER, "#ffffff");

                var $temp: boolean = $curNum >= $tatolNum;

                var unlockflag: boolean = false;//未解锁状态
                // var enoughflag: boolean = false;//是否足够数量
                var attackflag: boolean = false;//是否正在打boss
                var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurBossTb();
                this._curtb = $tb;
                // enoughflag = GuidData.map.isAdventureBaseScene() && $temp;
                if ($tb.level && $tb.level > GuidData.player.getLevel()) {
                    unlockflag = true;
                    attackflag = false
                } else {
                    unlockflag = false;
                    attackflag = $temp && GuidData.map.isAdventureBossScene()
                }

                var autoflag: boolean = false;
                var tabid: number = Number(String($tb.id).substr(1, 6));
                if (tabid > 1003) {
                    autoflag = GuidData.map.isAdventureBaseScene() || GuidData.map.isAdventureBossScene();
                    if ($tb.level && $tb.level > GuidData.player.getLevel()) {
                        autoflag = false
                    }
                }

                var limitflag: boolean = GuidData.map.isAdventureBaseScene() && unlockflag && $temp;
                this.setUiListVisibleByItem(this.killInfoUiList, GuidData.map.isAdventureBaseScene() && !$temp)
                this.setUiListVisibleByItem([this.a_boss_but], GuidData.map.isAdventureBaseScene() && !unlockflag && $temp);
                this.setUiListVisibleByItem(this.unlockArray, limitflag);
                this.setUiListVisibleByItem([this.a_autoplay], autoflag);

                this.playEff(GuidData.map.isAdventureBaseScene() && !unlockflag && $temp);
                if (limitflag) {
                    var str = $tb.level + "级开启本关BOSS挑战"
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.unlockArray[2].skinName, str, 14, TextAlign.CENTER, ColorType.Yellowffe9b4);
                }

                if (autoflag) {
                    this.a_autoplay.goToAndStop(this._autoplayflag ? 1 : 0);
                    if (GuidData.map.isAdventureBaseScene() && $temp && this._autoplayflag) {
                        NetManager.getInstance().protocolos.challange_boss();
                    }
                }

                // console.log("----tb----", $tb);

                console.log("显示退出boss", unlockflag, attackflag, GuidData.map.isAdventureBossScene(), GuidData.map.isAdventureBaseScene(), $temp);

                this.a_info_bar.uvScale = $curNum / $tatolNum;

                if ($curNum == $tatolNum || $curNum == 0) {
                    this.a_move_point.x = 10000;
                } else {

                    this.a_move_point.x = this.a_info_bar.x + this.a_info_bar.width * ($curNum / $tatolNum) - this.a_move_point.width / 2;
                    this.a_move_point.y = this.a_info_bar.y - 2;
                }
                this._midRender.applyObjData();
            }
        }
        public hideExitBossBut(): void {

        }

        public needUpLevShow():boolean{
            var aaa = GuidData.player.getworldrisklastid();
            var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();
            var type = Math.floor($tb.id / 1000000);
            if(type == 1 && $tb.id > 1001001 && aaa != $tb.id){
                return true;
            }
            return false;
        }
        public showuppanel(){
            var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();
            NetManager.getInstance().protocolos.set_world_risk_last_id($tb.id);
            ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.UPLEV_SHOW));
        }


    }
}