module kuafu {

    export class ArenaPanel extends WindowUi {

        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;


        private _arenaQualifying: ArenaQualifying;
        private _arenaDjPanel: ArenaDjPanel;
        private _tripPanel: any;

        public dispose(): void {

            this._baseRender.dispose();
            this._baseRender = null;

            this._topRender.dispose();
            this._topRender = null;

            super.dispose();

        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._baseUiAtlas = new UIAtlas();

            this._arenaQualifying = new ArenaQualifying();
            this._arenaDjPanel = new ArenaDjPanel();
            //this._tripPanel = new FactionTripPanel();
        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.w_close) {
                this.hide();
            }else if(evt.target == this.tab1dis){
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "人物等级达到" + this.tab1dis.data.level + "级后解锁", 99);
            }
        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/kuafu/arena/arena.xml", "ui/uidata/kuafu/arena/arena.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this._arenaDjPanel.setUIAtlas(this._baseUiAtlas, this.winmidRender);
            this._arenaQualifying.setUIAtlas(this._baseUiAtlas, this.winmidRender);

            // this.setIdx(0);
            console.log("---初始化结束");

            this.resize();
            this.applyLoadComplete();
        }

        public djData($ary: Array<KuaFu1v1BangData>): void {
            console.log("---斗剑台排行---", $ary);
            if (this._arenaDjPanel && this._arenaDjPanel) {
                this._arenaDjPanel.setListData($ary);
            }
        }

        public qualifyDataChg(): void {
            if (this._arenaQualifying && this._arenaQualifying.hasStage) {
                this._arenaQualifying.dataChg();
            }
        }

        public qualifyRankChg($rank: number): void {
            if (this._arenaQualifying && this._arenaQualifying.hasStage) {
                this._arenaQualifying.drawRank($rank);
            }
        }

        public djRewardChg(): void {
            if (this._arenaDjPanel && this._arenaDjPanel.hasStage) {
                this._arenaDjPanel.djRewardChg();
            }
        }

        // private tab0: SelectButton;
        // private tab1: SelectButton;
        private aryTab:Array<SelectButton>
        private tab1dis:UICompenent;
        private initUI(): void {
            this.addUIList(["t_win_bian"], this.winmidRender);
            this.addUIList(["t_win_line"], this._topRender);

            this.addChild(this._baseRender.getComponent("t_win_title"));

            this.aryTab = new Array
            for (var i = 0; i < 2; i++) {
                var a = <SelectButton>this.addEvntBut("t_tab" + i, this._baseRender);
                a.data = SharedDef.MODULE_ARENA_DOUJIANTAI + i * 3;
                a.addEventListener(InteractiveEvent.Up, this.tabClick, this);
                this.aryTab.push(a);
            }

            // this.tab0 = <SelectButton>this._baseRender.getComponent("t_tab0");
            // this.addChild(this.tab0);
            // this.tab0.addEventListener(InteractiveEvent.Down, this.tabClick, this);

            // this.tab1 = <SelectButton>this._baseRender.getComponent("t_tab1");
            // //this.addChild(this.tab1);
            // this.tab1.addEventListener(InteractiveEvent.Down, this.tabClick, this);

            this.tab1dis = this._baseRender.getComponent("t_tab1_dis");
            this.tab1dis.addEventListener(InteractiveEvent.Up, this.butClik, this);
            // this.showTab1();
        }

        public showTab1():void{
            if(this.tab1dis.parent){
                this.refreshOpenLev(this.aryTab[1]);
            }
        }

        private refreshOpenLev($tab: SelectButton) {
            var $page: number = $tab.data;
            if($page == SharedDef.MODULE_ARENA_DOUJIANTAI){
                this.setUiListVisibleByItem([$tab], true);
                return;
            }

            if (GuidData.player.getsyspageopen(SharedDef.MODULE_ARENA, $page)) {
                this.setUiListVisibleByItem([$tab], true);
                this.setUiListVisibleByItem([this.tab1dis], false);
            } else {
                var $tb_system_base: tb.TB_system_base = tb.TB_system_base.getTempVo(Number(SharedDef.MODULE_ARENA * 10 + $page));
                this.setUiListVisibleByItem([$tab], false);
                this.setUiListVisibleByItem([this.tab1dis], true);
                this.tab1dis.data = $tb_system_base;
                this.tab1dis.y = $tab.y
            }
        }



        private tabClick($e: InteractiveEvent): void {
            this.setIdx($e.target.data);
        }

        private _selIdx: number = SharedDef.MODULE_ARENA_DOUJIANTAI;
        public setIdx($idx: number): void {
            if ($idx == SharedDef.MODULE_ARENA_DOUJIANTAI) {
                this.aryTab[0].selected = true;
                this.aryTab[1].selected = false;

                this._arenaDjPanel.show();
                this._arenaQualifying.hide();

            } else if ($idx == SharedDef.MODULE_ARENA_RANK) {
                this.aryTab[0].selected = false;
                this.aryTab[1].selected = true;

                this._arenaDjPanel.hide();
                this._arenaQualifying.show();
            }
            this._selIdx = $idx;
        }

        private getTabidx($aryTab: Array<number>, $curTab: number): number {
            return $aryTab.indexOf($curTab);
        }

        public show($tabary: Array<number>,$seltab:number): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);

            for (let i = 0; i < this.aryTab.length; i++) {
                var $idx: number = this.getTabidx($tabary, Number(this.aryTab[i].data));
                if ($idx != -1) {
                    this.aryTab[i].y = $idx * 95 + 95
                    this.refreshOpenLev(this.aryTab[i]);
                } else {
                    this.setUiListVisibleByItem([this.aryTab[i],this.tab1dis], false);
                }
            }
            
            if (this._baseRender.uiAtlas) {
                this.setIdx($seltab);
            }
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            if (this._selIdx == SharedDef.MODULE_ARENA_DOUJIANTAI) {
                this._arenaDjPanel.hide();
            } else if (this._selIdx == SharedDef.MODULE_ARENA_RANK) {
                this._arenaQualifying.hide();
            }
            
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            super.hide();
        }

        public leadDataChg(): void {

        }

        public tripDataChg(): void {


        }

        public djChg(): void {
            if (this._arenaDjPanel && this._arenaDjPanel.hasStage) {
                this._arenaDjPanel.dataChg();
            }
        }

    }



}