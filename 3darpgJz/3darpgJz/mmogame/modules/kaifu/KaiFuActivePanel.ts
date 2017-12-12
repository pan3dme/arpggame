module kaifu {
    export class KaiFuActivePanel extends WindowUi {

        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;

        public _baseUiAtlas: UIAtlas;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);

        }

        public applyLoad(): void {
            this._baseUiAtlas = new UIAtlas();
            this._baseUiAtlas.setInfo("ui/uidata/kaifu/kaifuactive.xml", "ui/uidata/kaifu/kaifuactive.png", () => { this.loadConfigCom() }, "ui/uidata/kaifu/kaifuactiveuse.png");
        }
        private uiAtlasComplet: boolean = false;

        private tabNameAry: Array<string> = ["开服寻宝", "七日目标", "每日礼包", "开服礼包"];
        private loadConfigCom(): void {
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;

            this.addChild(this.winmidRender.getComponent("t_list_bg"));
            this.addChild(this._bgRender.getComponent("t_win_title"));

            var ui: UICompenent;

            //this.initTabList();

            this.uiAtlasComplet = true;
            this.applyLoadComplete();
        }
        private _btnAry: Array<SelectButton>;
        private initTabList(): void {
            if (this._btnAry) {
                return;
            }
            this._btnAry = new Array;
            var yOff: number = 55;
            for (var i: number = 0; i < this._activeAry.length; i++) {
                var data: any = TableData.getInstance().getData(TableData.tb_activity_time, this._activeAry[i]);
                var btn: SelectButton = <SelectButton>this.addChild(this._bgRender.getComponent("t_list_btn_bg"));
                btn.data = i;
                btn.y = btn.baseRec.y + i * yOff;
                this._btnAry.push(btn);
                btn.addEventListener(InteractiveEvent.Down, this.tabclick, this);

                var lab: FrameCompenent = <FrameCompenent>this.addChild(this._baseRender.getComponent("t_list_lab"));
                lab.y = lab.baseRec.y + i * yOff;
                lab.goToAndStop(i);
                this.drawTabName(lab, i, data.name);
            }

            //this.setIdx(0)
        }
        private tabclick($e: InteractiveEvent): void {
            this.setIdx($e.target.data);
        }
        private _currentIdx: number = -1;
        private panelDic: Array<KaifuBaseContainer> = [];
        private setIdx($id: number): void {
            for (var i: number = 0; i < this._btnAry.length; i++) {
                if (this._btnAry[i].data == $id) {
                    this._btnAry[i].selected = true;
                } else {
                    this._btnAry[i].selected = false;
                }
            }
            if (this._currentIdx != $id) {
                if (!this.panelDic[$id]) {
                    this.panelDic[$id] = this.getPanel($id);
                }
                this.panelDic[$id].show();
                if (this.panelDic[this._currentIdx]) {
                    this.panelDic[this._currentIdx].hide();
                }
            }
            this._currentIdx = $id;
        }
        private getPanel($id: number): KaifuBaseContainer {
            var data: any = TableData.getInstance().getData(TableData.tb_activity_time, this._activeAry[$id]);
            var type:number = data.scriptIndx;
            if (type == 2) {
                var panel: KaifuChoujiangPanel = new KaifuChoujiangPanel();
                panel.setActiveID(data.id);
                panel.setUIAtlas(this._baseUiAtlas, this.winmidRender);
                return panel;
            } else if (type == 3) {
                var panel1: KaifuDayTargetPanel = new KaifuDayTargetPanel();
                panel1.setActiveID(data.id);
                panel1.setUIAtlas(this._baseUiAtlas, this.winmidRender);
                return panel1;
            } else if (type == 4) {
                var panel2: KaifuRewardPanel = new KaifuRewardPanel();
                panel2.setActiveID(data.id);
                panel2.setUIAtlas(this._baseUiAtlas, this.winmidRender);
                return panel2;
            } else if (type == 1) {
                var panel3: KaifuVIPRewardPanel = new KaifuVIPRewardPanel();
                panel3.setActiveID(data.id);
                panel3.setUIAtlas(this._baseUiAtlas, this.winmidRender);
                return panel3;
            }
        }

        private drawTabName(lab: FrameCompenent, $id: number, $name: string): void {
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(lab.baseRec.width, lab.baseRec.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $name, 16, 0, 0, TextAlign.CENTER, ColorType.Brown7a2f21);
            var $uiRect: UIRectangle = this._baseUiAtlas.getRec(lab.skinName);
            this._baseUiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY + lab.baseRec.height * $id);
        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.w_close) {
                this.hide();
            }
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.panelDic[this._currentIdx].hide();
            this._currentIdx = -1;
            super.hide();
        }
        private _activeAry: Array<number>
        public show($activeAry: Array<number>): void {
            this._activeAry = $activeAry;
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.initTabList();
            this.setIdx(0);
        }

        public getRankActiveID(): number {
            for (var i: number = 0; i < this._activeAry.length; i++) {
                var tabObj: any = TableData.getInstance().getData(TableData.tb_activity_time, this._activeAry[i]);
                if (tabObj.scriptIndx == 3) {
                    return this._activeAry[i];
                }
            }
            return 0;
        }
        public getChouJiangActiveID(): number {
            return 2;
        }

        public choujiangChg(): void {
            if (this._currentIdx == 0) {
                (<KaifuChoujiangPanel>this.panelDic[0]).drawReward();
            }
        }

        public playerDataChg(): void {
            if (this._currentIdx == 1) {
                (<KaifuDayTargetPanel>this.panelDic[1]).drawReward();
            } else if (this._currentIdx == 2) {
                (<KaifuRewardPanel>this.panelDic[2]).refresh();
            } else if (this._currentIdx == 3) {
                (<KaifuVIPRewardPanel>this.panelDic[3]).draw();
            }
        }
        public dayTargetList(saosrl: s2c_activity_opt_show_rank_list): void {
            if (this._currentIdx == 1) {
                (<KaifuDayTargetPanel>this.panelDic[1]).setListData(saosrl);
            }
        }


    }


}
