module copytask {

    export class TowerCopyTaskPanel extends UIConatiner {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _btnRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        private _winMidRender: UIRenderComponent;

        private _middleRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }

        public setUIAtlas($uiatlas: UIAtlas, $winMidRender: UIRenderComponent): void {
            this._baseUiAtlas = $uiatlas;
            this._winMidRender = $winMidRender;
            this._winMidRender.uiAtlas = WindowUi.winUIAtlas;

            // this._winMidRender = new UIRenderComponent();
            // this._winMidRender.uiAtlas = $uiatlas;
            // this.addRender(this._winMidRender);

            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._btnRender = new UIRenderComponent();
            this._btnRender.uiAtlas = WindowUi.winUIAtlas;
            this.addRender(this._btnRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);

            this._middleRender = new UIRenderComponent();
            this._middleRender.uiAtlas = $uiatlas;
            this.addRender(this._middleRender);

            this._topRender = new UIRenderComponent();
            this._topRender.uiAtlas = $uiatlas;
            this.addRender(this._topRender);

            this.initUI();

            this.addSelfRole();

        }

        private _bgAry: Array<UICompenent>;
        private _titleAry: Array<UICompenent>;
        private _mapAry: Array<UICompenent>;
        private _rewardAry: Array<UICompenent>;
        private _iconAry: Array<Array<UICompenent>>;
        private progresUI: UICompenent;
        private stateAry: Array<FrameCompenent>;
        private _leftBtn: UICompenent;
        private _rightBtn: UICompenent;
        private _uvScaleAry: Array<number> = [0.1, 0.3, 0.5, 0.7, 0.9, 1.0];
        private _roleList: Array<MonsterUIChar>;
        private _sweepBtnLab: UICompenent;
        private _sweepBtn: UICompenent;
        private _sweepLab: UICompenent;
        private _sweepLabBg: UICompenent;
        private _maxLab: UICompenent;
        private d_vip_add: UICompenent;

        private initUI(): void {

            this._bgAry = new Array;
            this._titleAry = new Array;
            this._rewardAry = new Array;
            this._iconAry = new Array;
            this.stateAry = new Array;
            this._mapAry = new Array;
            for (var i: number = 0; i < 5; i++) {
                this._bgAry.push(this.addByCopy("cnew_right_bg_top", "e_bga" + i));
                this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "e_bgb" + i));
                var ui: UICompenent;

                this.addChild(this._bgRender.getComponent("e_t_bg" + i));
                this.addChild(this._bgRender.getComponent("e_boss_bg" + i));
                ui = this.addChild(this._baseRender.getComponent("e_title" + i));
                this._titleAry.push(ui);
                ui = this.addChild(this._baseRender.getComponent("e_r" + i));
                this._rewardAry.push(ui);
                ui = this.addChild(this._baseRender.getComponent("e_line" + i));
                var icon1: UICompenent = this.addChild(this._baseRender.getComponent("e_a" + i));
                var icon2: UICompenent = this.addChild(this._baseRender.getComponent("e_b" + i));
                this._iconAry.push([icon1, icon2]);


                var fm: FrameCompenent = <FrameCompenent>this._topRender.getComponent("e_s" + i);
                this.addChild(fm);
                fm.goToAndStop(2);
                this.stateAry.push(fm);

                this._mapAry.push(this.addChild(this._topRender.getComponent("e_t" + i)));
            }

            this._leftBtn = this._topRender.getComponent("e_left");
            this._leftBtn.addEventListener(InteractiveEvent.Down, this.perPage, this);
            this._rightBtn = this._topRender.getComponent("e_right");
            this._rightBtn.addEventListener(InteractiveEvent.Down, this.nextPage, this);


            this.addUIList(["e_bg_line", "e_info_bg1"], this._bgRender);

            this._sweepLabBg = this._bgRender.getComponent("e_info_bg2");

            var ui: UICompenent;

            ui = this.addChild(this._bgRender.getComponent("e_rank"));
            ui.addEventListener(InteractiveEvent.Down,this.getRank,this);
            ui = this.addChild(this._baseRender.getComponent("e_line_bg"));

            this.progresUI = this.addChild(this._middleRender.getComponent("e_line_base"));
            this.progresUI.uvScale = 0.5;


            this._sweepBtn = this._btnRender.getComponent("cnew_btn1");
            this.setSizeForPanelUiCopy(this._sweepBtn, "e_btnbg1", this._bgRender);
            this._sweepBtn.addEventListener(InteractiveEvent.Up, this.sweep, this);

            ui = this.addChild(this._btnRender.getComponent("cnew_btn1"));
            this.setSizeForPanelUiCopy(ui, "e_btnbg2", this._bgRender);
            ui.addEventListener(InteractiveEvent.Down, this.btnclick, this);

            this._sweepBtnLab = this._topRender.getComponent("e_btn0");
            
            this._maxLab = this.addChild(this._topRender.getComponent("e_info0"));
            this._sweepLab = this._topRender.getComponent("e_info1");

            this.d_vip_add = this.addChild(this._topRender.getComponent("d_vip_add"));
            
            ui = this.addChild(this._topRender.getComponent("e_btn1"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "开始挑战", 16, TextAlign.CENTER, ColorType.Brown7a2f21);


        }

        public visiableBtn(){
            this.setUiListVisibleByItem([this._sweepBtn,this._sweepBtnLab,this._sweepLab,this._sweepLabBg],this.sweepCurrent > 0);
        }

        private getRank($e:InteractiveEvent):void{
            NetManager.getInstance().protocolos.rank_list_query(SharedDef.RANK_TYPE_TRIAL, SharedDef.RANK_TYPE_TRIAL, 1,10);
        }

        private sweep($e: InteractiveEvent): void {
            if(this.sweepNum == 1){
                NetManager.getInstance().protocolos.sweep_trial_instance();
            }else if(this.canBuyNum == 1){
                var tabObj: any = TableData.getInstance().getData(TableData.tb_instance_trial, this.trialCurrent);
                AlertUtil.show(ColorType.Brown7a2f21 + "您是否花费" + ColorType.Green2ca937 + tabObj.resetCosts[0][1] + "元宝" + ColorType.Brown7a2f21 + "重置扫荡", "",
                (val: number) => {
                    if(val == 1){
                        NetManager.getInstance().protocolos.reset_trial_instance();
                    }                
                })
            }
        }

        private btnclick($e: InteractiveEvent): void {
            NetManager.getInstance().protocolos.enter_trial_instance();
        }

        private _curPage: number;
        private _maxPage: number;
        private _drawPage: number = -1;
        private sweepCurrent: number;
        private trialCurrent: number;
        private sweepNum: number;
        private canBuyNum: number;
        private setTowerPage(): void {

            this.setBaseData();

            this.draw();
            this.drawBase();
        }

        private setBaseData():void{
            var ary: any = GuidData.instanceData.getInstanceIntFieldTrialPassed();
            this.sweepCurrent = ary[0];
            this.trialCurrent = ary[1];

            var ary: any = GuidData.instanceData.getInstanceIntFieldTrialSweep();
            this.sweepNum = ary[0];
            this.canBuyNum = ary[1];

            this._maxPage = Math.floor(this.trialCurrent / 5);
            this._curPage = this._maxPage;
        }

        public refreshSweep():void{
            this.setBaseData();
            this.drawBase();
        }

        private perPage($e: InteractiveEvent): void {
            if (this._curPage == 0) {
                return;
            }
            this._curPage--;
            this.draw();
        }

        private nextPage($e: InteractiveEvent): void {
            if (this._curPage == this._maxPage) {
                return;
            }
            this._curPage++;
            this.draw();
        }

        private drawBase(): void {

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._maxLab.skinName, ColorType.Brown7a2f21 + "已通关" + ColorType.Green2ca937 + this.trialCurrent + ColorType.Brown7a2f21 + "层", 16, TextAlign.CENTER);
            if (this.sweepCurrent > 0) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepLab.skinName, ColorType.Brown7a2f21 + "可扫荡：" + ColorType.Green2ca937 + "1-" + this.sweepCurrent + ColorType.Brown7a2f21 + "层", 16, TextAlign.CENTER);
            } else {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepLab.skinName, "不可扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }

            if(this.sweepNum == 1){
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepBtnLab.skinName, "一键扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }else{
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._sweepBtnLab.skinName, "重置扫荡", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            }

            // if(this.canBuyNum == 0 && this.sweepNum == 0){
            //     this.removeSweep();
            // }else{
            //     this.addSweep();
            // }

            this.visiableBtn();

        }

        private removeSweep(): void {
            this.removeChild(this._sweepBtn);
            this.removeChild(this._sweepBtnLab);
            this.removeChild(this._sweepLab);
            this.removeChild(this._sweepLabBg);
        }
        private addSweep(): void {
            if(this._sweepBtn.parent){
                return;
            }
            this.addChild(this._sweepBtn);
            this.addChild(this._sweepBtnLab);
            this.addChild(this._sweepLab);
            this.addChild(this._sweepLabBg);
        }

        public draw(): void {
            // if(this._drawPage == this._curPage){
            //     return;
            // }
            // var ary: any = GuidData.instanceData.getInstanceIntFieldTrialPassed();
            // var sweepCurrent: number = ary[0];
            // var trialCurrent: number = ary[1];


            var flag: number = -1;
            for (var i: number = 0; i < 5; i++) {
                var idx: number = this._curPage * 5 + i;
                var tabObj: any = TableData.getInstance().getData(TableData.tb_instance_trial, idx + 1);
                this.applyCellView(i, tabObj, idx < this.trialCurrent, idx < this.sweepCurrent, this.sweepNum == 0);
                if (idx < this.trialCurrent) {
                    this.stateAry[i].goToAndStop(2);
                } else if (idx == this.trialCurrent) {
                    this.stateAry[i].goToAndStop(0);
                    flag = i;
                } else {
                    this.stateAry[i].goToAndStop(1);
                }
            }
            if (flag == -1) {
                flag = 5;
            }
            this.progresUI.uvScale = this._uvScaleAry[flag];

            if (this._curPage == 0) {
                this.removeChild(this._leftBtn)
            } else {
                this.addChild(this._leftBtn);
            }

            if (this._curPage == this._maxPage) {
                this.removeChild(this._rightBtn);
            } else {
                this.addChild(this._rightBtn);
            }

        }

        public applyCellView($id: number, $tabObj: any, $hasPass: boolean, $canSweep: boolean, $hasSweep: boolean): void {
            var contentStr: string;
            if ($hasPass) {
                if ($canSweep) {
                    if ($hasSweep) {
                        contentStr = ColorType.colorcd2000 + "已扫荡";
                    } else {
                        contentStr = ColorType.Green2ca937 + "可扫荡";
                    }
                } else {
                    contentStr = ColorType.colorcd2000 + "明日可扫荡";
                }
            } else {
                contentStr = ColorType.Brown7a2f21 + "推荐战力：" + ($tabObj.force > GuidData.player.getForce() ? ColorType.colorcd2000 : ColorType.colorff7200) + Snum($tabObj.force);
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleAry[$id].skinName, contentStr, 14, TextAlign.CENTER);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._mapAry[$id].skinName, "第" + $tabObj.id + "关", 14, TextAlign.CENTER, ColorType.Brown7a2f21);

            var rewardInfo: any;
            if ($hasPass) {
                contentStr = "每日奖励";
                rewardInfo = $tabObj.showreward;
            } else {
                contentStr = "首通奖励";
                rewardInfo = $tabObj.firstReward;
            }
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._rewardAry[$id].skinName, contentStr, 14, TextAlign.CENTER, ColorType.color9a683f);
            for (var i: number = 0; i < 2; i++) {
                if (rewardInfo[i]) {
                    IconManager.getInstance().drawItemIcon40(this._iconAry[$id][i], rewardInfo[i][0], rewardInfo[i][1]);
                } else {
                    IconManager.getInstance().drawItemIcon40(this._iconAry[$id][i], 0, 1);
                }
            }

            this._roleList[$id].setAvatar(getAvataByID($tabObj.model));
        }

        private addByCopy($name1: string, $name2: string): UICompenent {
            var ui: UICompenent = this._winMidRender.getComponent($name1);
            this.setSizeForPanelUiCopy(ui, $name2, this._bgRender);
            return ui;
        }

        private addSelfRole(): void {
            this._roleList = new Array;
            for (var i: number = 0; i < 5; i++) {
                var selfRole = new MonsterUIChar();
                this._bgRender.addModel(selfRole);
                this._roleList.push(selfRole);
            }

            this.resize();
        }


        public resize(): void {
            super.resize();
            if (this._roleList) {
                for (var i: number = 0; i < this._roleList.length; i++) {
                    var sr: MonsterUIChar = this._roleList[i];
                    sr.scale = 1.5 * UIData.Scale;
                    sr.x = (230 - 105 * i) * UIData.Scale;
                    sr.y = -20 * UIData.Scale;
                    sr.resize();
                }

            }
        }

        public addWinmid(): void {
            for (var i: number = 0; i < this._bgAry.length; i++) {
                this.addChild(this._bgAry[i]);
            }
        }

        public removeWinmid(): void {
            for (var i: number = 0; i < this._bgAry.length; i++) {
                this.removeChild(this._bgAry[i]);
            }
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);

            LabelTextFont.writeSingleLabel(this._baseUiAtlas,this.d_vip_add.skinName, getvipadd("trialReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            
            if (this._baseUiAtlas) {
                this.setTowerPage();
                this.addWinmid();
            }

        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();
        }
    }



}