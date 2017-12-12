module boss {

    export class BossViewPanel extends WindowMinUi {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent


        private uiAtlasComplet: boolean = false;
        public _baseUiAtlas: UIAtlas;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender);


            this._baseUiAtlas = new UIAtlas;

            this.setBlackBg();

        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/boss/bossview.xml", "ui/uidata/boss/bossview.png", () => { this.loadConfigCom() });
        }

        private mapLab: UICompenent;
        private nameLab: UICompenent;
        private bangIcon: UICompenent;
        private submitBtn: UICompenent;
        private rewardList: Array<UICompenent>;

        private loadConfigCom(): void {

            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this._baseRender.uiAtlas = this._baseUiAtlas;


            this.addBossChar()

            this.uiAtlasComplet = true;
            this.initUI();
            this.applyLoadComplete();



        }
        private initUI(): void {
            this.addUIList(["t_bg1"], this.winmidRender);
            this.addUIList(["t_name_bg", "t_bg3", "t_bg2", "t_win_title"], this._bgRender);

            var drop: UICompenent = this._baseRender.getComponent("t_drop");
            this.addChild(drop);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, drop.skinName, "关卡掉落", 14, TextAlign.CENTER, ColorType.colorb96d49);

            this.addChild(this._baseRender.getComponent("t_namebg"));

            this.mapLab = this._baseRender.getComponent("t_gk");
            this.addChild(this.mapLab);
            //LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mapLab.skinName, "虎牢关-1", 14, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.nameLab = this._baseRender.getComponent("t_name");
            this.addChild(this.nameLab);

            this.bangIcon = this._baseRender.getComponent("t_bang");
            this.bangIcon.addEventListener(InteractiveEvent.Down, this.showrankPanel, this);
            //this.addChild(this.bangIcon);

            this.submitBtn = this._baseRender.getComponent("t_btn");
            this.submitBtn.addEventListener(InteractiveEvent.Up, this.submit, this);
            this.addChild(this.submitBtn);

            this.rewardList = new Array;
            for (var i: number = 0; i < 6; i++) {
                var rewarui: UICompenent = this._baseRender.getComponent("t_reward" + i);
                this.addChild(rewarui);
                this.rewardList.push(rewarui);
                //IconManager.getInstance().drawItemIcon60(this.rewardList[i], 0, 0);
            }

        }

        private showrankPanel() {
            if (this._data && this._data.rankFun) {
                this._data.rankFun();
            }
        }

        private bossChar: MonsterUIChar;
        private addBossChar(): void {
            this.bossChar = new MonsterUIChar();
            this.wintopRender.addModel(this.bossChar);
        }
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new adventureinfo.AdventurInfoEvent(adventureinfo.AdventurInfoEvent.ADVENTURE_TRIAL_PROCESS));
                    this.hide();
            }

        }

        private submit($e: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize($e.target);
            if (this._data && this._data.submitFun) {
                this._data.submitFun();
                this.hide();
            }
        }
        private refresh(): void {

            var $bossId: number = this._data.bossID;

            var $tb_creature_template: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($bossId)
            var $bossName: string = $tb_creature_template.name;

            if (this._data.checkpoint && this._data.checkpoint.length > 0) {
                $bossName = this._data.checkpoint;
            }

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.nameLab.skinName, $bossName, 14, TextAlign.CENTER, ColorType.Brown7a2f21);

            this.bossChar.setAvatar($tb_creature_template.avatar);

            if (this._data.showRank) {
                if (!this.bangIcon.parent) {
                    this.addChild(this.bangIcon);
                }
            } else {
                if (this.bangIcon.parent) {
                    this.removeChild(this.bangIcon);
                }
            }

            if (this._data.force) {
                var colorstr:string = this._data.force > GuidData.player.getForce() ? ColorType.colorce0a00 : ColorType.color2daa35;
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.mapLab.skinName, ColorType.color9a683f + "推荐战力：" + colorstr + this._data.force, 14, TextAlign.CENTER);
            } else {
                UiDraw.clearUI(this.mapLab);
            }

            if (this._data.rewardList) {
                for (var i: number = 0; i < this.rewardList.length; i++) {
                    if (this._data.rewardList[i]) {
                        IconManager.getInstance().drawItemIcon60(this.rewardList[i], this._data.rewardList[i][0], this._data.rewardList[i][1]);
                    } else {
                        IconManager.getInstance().drawItemIcon60(this.rewardList[i], 0, 5);
                    }

                }
            } else {
                for (var i: number = 0; i < this.rewardList.length; i++) {
                    IconManager.getInstance().drawItemIcon60(this.rewardList[i], 0, 5);
                }
            }


        }
        public resize(): void {
            super.resize();
            if (this.bossChar) {

                this.bossChar.scale = 1.5 * UIData.Scale;
                this.bossChar.x = 0 * UIData.Scale;
                this.bossChar.y = -20 * UIData.Scale;
                this.bossChar.resize();
            }

        }

        private drawReward(): void {

        }

        private _data: BossViewData;
        public show($data: BossViewData): void {
            UIManager.getInstance().addUIContainer(this);
            this._data = $data;
            this.refresh()
        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this._data.rankFun = null;
            this._data.submitFun = null;
            this._data = null;
        }


    }

    export class BossViewData {
        public bossID: number;
        public force: number;//推荐战力
        public checkpoint: string;//关卡  当传入关卡时，显示关卡名，不显示boss名
        public mapName: string;
        public rewardList: any;
        public showRank: boolean;
        public rankFun: Function;
        public submitFun: Function;
    }
}