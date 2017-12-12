module sboss {

    export class WbossPanel extends UIConatiner {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;
        private _winMidRender: UIRenderComponent;

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

            this._bgRender = new UIRenderComponent();
            this._bgRender.uiAtlas = $uiatlas;
            this.addRender(this._bgRender);

            this._midRender = new UIRenderComponent();
            this._midRender.uiAtlas = $uiatlas;
            this.addRender(this._midRender);

            this._baseRender = new UIRenderComponent();
            this._baseRender.uiAtlas = $uiatlas;
            this.addRender(this._baseRender);

            this.initUI();

            this.addSelfRole();

        }


        private rewardIcon: UICompenent;
        private iconAry: Array<UICompenent>;
        private bossName1: UICompenent;
        private bossName2: UICompenent;
        private rewardAry1: Array<UICompenent>;
        private rewardAry2: Array<UICompenent>;
        private _btnLab:UICompenent;
        private t_vip_add:UICompenent;
        private initUI(): void {

            this.initBg();
            this.addUIList(["t_boss_bg1", "t_boss_bg2", "t_right_has_bg"], this._bgRender);
            this.addUIList(["t_title_bg1", "t_title_bg2", "t_reward_l", "t_reward_c", "t_reward_r", "t_reward_l1", "t_reward_c1", "t_reward_r1"], this._midRender);
            this.addUIList(["d_rewardtitle", "d_rewardtitle1"], this._baseRender);
            var ui: UICompenent;
            this.bossName1 = this.addChild(this._baseRender.getComponent("t_boss_name1"));
            this.bossName2 = this.addChild(this._baseRender.getComponent("t_boss_name2"));

            this.rewardAry1 = new Array;
            this.rewardAry2 = new Array;

            for (var i: number = 0; i < 5; i++) {
                this.rewardAry1.push(this.addChild(this._baseRender.getComponent("t_ba" + i)));
                this.rewardAry2.push(this.addChild(this._baseRender.getComponent("t_bb" + i)));
            }

            this.t_vip_add = this.addChild(this._baseRender.getComponent("t_vip_add"));

            ui = this.addChild(this._baseRender.getComponent("t_boos_desc"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "今日挑战boss从以上怪物中随机，在活动时揭晓", 16, TextAlign.CENTER, ColorType.Green2ca937);

            ui = this.addChild(this._baseRender.getComponent("t_boss_time"));
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, "开启时间：19:00-19:15", 16, TextAlign.CENTER, ColorType.Brown7a2f21);

            ui = this.addChild(this._bgRender.getComponent("t_btn"));
            ui.addEventListener(InteractiveEvent.Up, this.onclick, this);

            this._btnLab = this.addChild(this._baseRender.getComponent("t_btn_lab"));

            this.setBtnLab();

        }
        private onclick($e: InteractiveEvent): void {
            
            var playType:number = GuidData.globelValue.getWorldBossState();

            if (playType == SharedDef.WORLD_BOSS_PROCESS_ENROLL) {
                NetManager.getInstance().protocolos.world_boss_enroll();
            }else if (playType == SharedDef.WORLD_BOSS_PROCESS_BORN) {
                NetManager.getInstance().protocolos.world_boss_fight();
            }else{
                msgtip.MsgTipManager.outStr("世界boss时间未到", 99);
            }
        }

        public setBtnLab():void{
            var playType:number = GuidData.globelValue.getWorldBossState();

            if (playType == SharedDef.WORLD_BOSS_PROCESS_ENROLL) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas,this._btnLab.skinName,"报名",16,TextAlign.CENTER,ColorType.Brown7a2f21);
            }else if (playType == SharedDef.WORLD_BOSS_PROCESS_BORN) {
                LabelTextFont.writeSingleLabel(this._baseUiAtlas,this._btnLab.skinName,"挑战",16,TextAlign.CENTER,ColorType.Brown7a2f21);
            }else{
                LabelTextFont.writeSingleLabel(this._baseUiAtlas,this._btnLab.skinName,"未开始",16,TextAlign.CENTER,ColorType.Brown7a2f21);
            }
        }
        private _curid1: number = -1;
        private _curid2: number = -1;
        public draw(): void {
            var ids: any = GuidData.globelValue.getWorldBossId();
            if (this._curid1 != ids[0]) {
                this._curid1 = ids[0];

                var idInfo: any = TableData.getInstance().getData(TableData.tb_worldboss_base, this._curid1);
                var boss: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template(idInfo.entry);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.bossName1.skinName, boss.name + " LV" + boss.level, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.selfRole1.setAvatar(boss.avatar);
                for (var i: number = 0; i < this.rewardAry1.length; i++) {
                    if (idInfo.items[i]) {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry1[i], idInfo.items[i], 1);
                    } else {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry1[i], 0, 1);
                    }
                }
            }

            if (this._curid2 != ids[1]) {
                this._curid2 = ids[1];

                var idInfo: any = TableData.getInstance().getData(TableData.tb_worldboss_base, this._curid2);
                var boss: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template(idInfo.entry);
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.bossName2.skinName, boss.name + " LV" + boss.level, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                this.selfRole2.setAvatar(boss.avatar);
                for (var i: number = 0; i < this.rewardAry2.length; i++) {
                    if (idInfo.items[i]) {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry2[i], idInfo.items[i], 1);
                    } else {
                        IconManager.getInstance().drawItemIcon60(this.rewardAry2[i], 0, 1);
                    }
                }
            }
        }


        private _bgAry: Array<UICompenent>;
        private initBg(): void {
            this._bgAry = new Array;
            this._bgAry.push(this.addByCopy("cnew_right_bg_top", "t_win_bg1"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "t_win_bg2"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_top", "t_win_bg3"));
            this._bgAry.push(this.addByCopy("cnew_right_bg_bottom", "t_win_bg4"));
        }

        private addByCopy($name1: string, $name2: string): UICompenent {
            var ui: UICompenent = this._winMidRender.getComponent($name1);
            this.setSizeForPanelUiCopy(ui, $name2, this._bgRender);
            return ui;
        }




        private selfRole1: MonsterUIChar;
        private selfRole2: MonsterUIChar;
        private addSelfRole(): void {
            this.selfRole1 = new MonsterUIChar();
            this._midRender.addModel(this.selfRole1);
            this.selfRole2 = new MonsterUIChar();
            this._midRender.addModel(this.selfRole2);
            //this.selfRole1.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            //this.selfRole2.setBaseRoleAvatar(GuidData.player.getAvatar(), GuidData.player.getCharType());
            //this.selfRole.setBaseRoleWeapon(GuidData.player.getDivineID(), GuidData.player.getCharType());
            this.resize();
        }



        public resize(): void {
            super.resize();
            if (this.selfRole1) {
                this.selfRole1.resize();
                this.selfRole1.scale = 1.5 * UIData.Scale;
                this.selfRole1.x = 150 * UIData.Scale;
                this.selfRole1.y = -10 * UIData.Scale;

                this.selfRole2.resize();
                this.selfRole2.scale = 1.5 * UIData.Scale;
                this.selfRole2.x = -130 * UIData.Scale;
                this.selfRole2.y = -10 * UIData.Scale;
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

            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this.t_vip_add.skinName, getvipadd("worldbossReward"), 14, TextAlign.CENTER, ColorType.color9a683f);
            

            if (this._baseUiAtlas) {

                this.addWinmid();
                this.draw();
                this.setBtnLab();
            }

        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.removeWinmid();

        }
    }




}