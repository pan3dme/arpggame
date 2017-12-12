module kuafu {
    export class ArenaDjRewardPanel extends WindowMinUi {
        private _baseRender: UIRenderComponent;
        private _bgRender: UIRenderComponent;
        public _baseUiAtlas: UIAtlas;


        public dispose(): void {

            this._baseRender.dispose();
            this._baseRender = null;

            this._bgRender.dispose();
            this._bgRender = null;

            super.dispose();

        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this.setBlackBg();

            this._bgRender = new UIRenderComponent();
            this.addRender(this._bgRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);


            this._baseUiAtlas = new UIAtlas();


        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target == this.e_close) {
                this.hide();
            }

        }

        public applyLoad(): void {
            this._baseUiAtlas.setInfo("ui/uidata/kuafu/arena/arenadjreward.xml", "ui/uidata/kuafu/arena/arenadjreward.png", () => { this.loadConfigCom() }, "ui/uidata/kuafu/arena/arenadjrewardbtn.png");
        }

        private loadConfigCom(): void {
            
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._bgRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;

            this.initUI();

            this.applyLoadComplete();

            this.resize();

        }

        private _title1: UICompenent;
        private _title2: UICompenent;
        private _titleLab1: UICompenent;
        private _titleLab2: UICompenent;
        private _titleBg1: UICompenent;
        private _titleBg2: UICompenent;
        private _btnAry: Array<FrameCompenent>;
        private initUI(): void {
            this.addChild(this.winmidRender.getComponent("t_main_bg"));
            var nameAry: Array<string> = ["首胜奖励", "每日排名", "每日连胜", "挑战奖励"];
            this._btnAry = new Array();
            for (var i: number = 0; i < 4; i++) {
                var btn: FrameCompenent = <FrameCompenent>this.addChild(this._bgRender.getComponent("t_btn" + i));
                btn.goToAndStop(1);
                btn.data = i;
                btn.addEventListener(InteractiveEvent.Down, this.onClick, this);
                this._btnAry.push(btn);
                var ui: UICompenent = this.addChild(this._baseRender.getComponent("t_btn_lab" + i));
                LabelTextFont.writeSingleLabel(this._baseUiAtlas, ui.skinName, nameAry[i], 14, TextAlign.CENTER, ColorType.Brown7a2f21);
            }
            this._title1 = this.addChild(this._baseRender.getComponent("t_title1"));
            this._title2 = this._baseRender.getComponent("t_title2");
            this._titleLab1 = this._baseRender.getComponent("t_title_lab1");
            this._titleLab2 = this._baseRender.getComponent("t_title_lab2");
            this._titleBg1 = this._bgRender.getComponent("t_title_bg1");
            this._titleBg2 = this._bgRender.getComponent("t_title_bg2");
            this.addChild(this._bgRender.getComponent("a_title"));

            if(this.hasStage){
                this.setIdx(0);
            }

        }
        private _rewardList: ArenaDjRewardList;
        private _infoList: ArenaDjInfoList;
        private addReward():void{
            if (!this._rewardList) {
                this._rewardList = new ArenaDjRewardList();
                this._rewardList.init(this._baseUiAtlas);
            }
            this._rewardList.show();
            if (this._infoList) {
                this._infoList.hide();
            }
        }
        private addInfo($type:number):void{
            if (!this._infoList) {
                this._infoList = new ArenaDjInfoList();
                this._infoList.init(this._baseUiAtlas);
            }
            this._infoList.show($type);
            if (this._rewardList) {
                this._rewardList.hide();
            }
        }
        private hideList(){
            if (this._infoList) {
                this._infoList.hide();
            }
            if (this._rewardList) {
                this._rewardList.hide();
            }
        }
        public setIdx0(): void {
            this.addListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "最佳首胜排名：" + GuidData.instanceData.getvictoryrecord(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title2.skinName, "首次胜利挑战以下名次将获得以下奖励：", 14, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab1.skinName, "首胜排名", 16, TextAlign.CENTER, ColorType.color9a683f);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab2.skinName, "排名奖励", 16, TextAlign.CENTER, ColorType.color9a683f);
            this.addReward();
        }
        public setIdx1(): void {
            this.addListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "今日当前排名：" + GuidData.player.get1v1Rank(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title2.skinName, "每日22 :00结算奖励，并以邮件发放：", 14, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab1.skinName, "每日排名", 16, TextAlign.CENTER, ColorType.color9a683f);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab2.skinName, "排名奖励", 16, TextAlign.CENTER, ColorType.color9a683f);
            this.addInfo(0);
        }
        public setIdx2(): void {
            this.addListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "今日连胜次数：" + GuidData.instanceData.getwinningstreakrecord(), 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title2.skinName, "每日主动挑战并连胜达到以下数，可获额外奖励", 14, TextAlign.CENTER, ColorType.Green2ca937);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab1.skinName, "连胜次数", 16, TextAlign.CENTER, ColorType.color9a683f);
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._titleLab2.skinName, "额外奖励", 16, TextAlign.CENTER, ColorType.color9a683f);
            this.addInfo(1);
        }
        public setIdx3(): void {
            this.removeListTitle();
            LabelTextFont.writeSingleLabel(this._baseUiAtlas, this._title1.skinName, "每次挑战都会获得50荣誉", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.hideList();
        }

        private _idx: number = -1;
        public setIdx($idx: number): void {
            console.log("---进来了");
            // if (this._idx == $idx) {
            //     return;
            // }
            this._idx = $idx;
            if ($idx == 0) {
                this.setIdx0();
            } else if ($idx == 1) {
                this.setIdx1();
            } else if ($idx == 2) {
                this.setIdx2();
            } else if ($idx == 3) {
                this.setIdx3();
            }

            for (var i: number = 0; i < this._btnAry.length; i++) {
                if (i == $idx) {
                    this._btnAry[i].goToAndStop(0);
                } else {
                    this._btnAry[i].goToAndStop(1);
                }
            }
        }



        public addListTitle(): void {
            if (this._title2.parent) {
                return;
            }
            this._title1.y = this._title1.baseRec.y;
            this.addChild(this._title2);
            this.addChild(this._titleLab1);
            this.addChild(this._titleLab2);
            this.addChild(this._titleBg1);
            this.addChild(this._titleBg2);
        }
        public removeListTitle(): void {
            if (!this._title2.parent) {
                return;
            }
            this._title1.y = this._title1.baseRec.y + 50;
            this.removeChild(this._title2);
            this.removeChild(this._titleLab1);
            this.removeChild(this._titleLab2);
            this.removeChild(this._titleBg1);
            this.removeChild(this._titleBg2);
        }
        private onClick($e: InteractiveEvent): void {
            this.setIdx($e.target.data);
        }
        public djRewardChg(): void {
            if (this._rewardList && this._rewardList.hasStage) {
                this._rewardList.reget();
            }
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            //this.addChild(this._mainBg);

            if (this._baseUiAtlas) {
                //this.draw();
                this.setIdx(0);
            }

        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
            this.hideList();
            this._idx = -1;
        }
    }

    /**rewardlist */
    export class ArenaDjRewardList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas): void {
            this.baseAtlas = $atlas;
            // ArenaDjRewardListItemRender.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var w: number = 420;
            var h: number = 300;
            this.setData(ary, ArenaDjRewardListItemRender, w, h, 400, 100, 3, 512, 512, 1, 6);
            this.center = 95;
            this.middle = 55;
            this.setShowLevel(4);
            this.resize();
        }

        public reget(): void {
            this.refreshData(this.getDataAry());
        }

        public getDataAry(): Array<SListItemData> {
            var baseary: Array<FirstvictoryVo> = GuidData.instanceData.getFirstvictoryList();
            var ary: Array<SListItemData> = new Array<SListItemData>();

            for (var i: number = 0; i < baseary.length; i++) {
                var data: SListItemData = new SListItemData();
                data.data = baseary[i];
                data.id = i;
                ary.push(data);
            }
            return ary;
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.reget();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }



    }

    export class ArenaDjRewardListItemRender extends SListItem {
        public static baseAtlas: UIAtlas;
        private _btn: UICompenent;
        private _name: UICompenent;
        private _ibg: UICompenent;

        private _iconAry: Array<UICompenent>;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender,  this.parentTarget.baseAtlas, "s_bg", 0, 0, 400, 100);
            $container.addChild(this._ibg);

            this._btn = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_btn", 296, 30, 107, 46);
            $container.addChild(this._btn);
            this._btn.addEventListener(InteractiveEvent.Down, this.onclick, this);

            this._name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_lab", 15, 43, 100, 20);
            $container.addChild(this._name);

            this._iconAry = new Array;
            for (var i: number = 0; i < 3; i++) {
                var ui: UICompenent = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "s_icon" + i, 86 + 70 * i, 18, 68, 68);
                $container.addChild(ui);
                this._iconAry.push(ui);
            }


        }
        private onclick($e: InteractiveEvent): void {
            NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && this.itdata.data) {
                this.applyRender();
            }
        }

        private applyRender(): void {
            if (this.itdata.id % 2) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            }
            var bd: any = this.itdata.data;

            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, this.itdata.data.name, 16, TextAlign.CENTER,ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._name.skinName, "第" + bd.data.rank + "名", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            //LabelTextFont.writeSingleLabel(this.uiAtlas, this._btn.skinName, "按钮" + bd.state, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            this.drawBtn(bd.state);

            // UiDraw.clearUI(this._btn);
            // this.uiAtlas.upDataPicToTexture("ui/load/arena/" + this.itdata.data.id + "_s.png",this._btn.skinName);

            var rary: Array<any> = bd.data.reward;
            for (var i: number = 0; i < this._iconAry.length; i++) {
                if (rary[i]) {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], rary[i][0], rary[i][1]);
                } else {
                    IconManager.getInstance().drawItemIcon60(this._iconAry[i], 0, 1);
                }
            }
        }

        private drawBtn($state: number): void {
            var $ui: UICompenent = this._btn;
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            var imgUseRect: UIRectangle = this.parentTarget.baseAtlas.getRec("u_s" + $state)
            ctx.drawImage(this.parentTarget.baseAtlas.useImg, imgUseRect.pixelX, imgUseRect.pixelY, imgUseRect.pixelWitdh, imgUseRect.pixelHeight,
                0, 0, $rec.pixelWitdh, $rec.pixelHeight);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
    }
    /**end rewardlist */


    /**连胜list***/
    export class ArenaDjInfoList extends SList {
        public constructor() {
            super();

        }

        public init($atlas: UIAtlas): void {
            ArenaDjInfoListItemRender.baseAtlas = $atlas;
            this.initData();
        }

        public initData(): void {
            var ary: Array<SListItemData> = new Array;
            var w: number = 420;
            var h: number = 320;
            this.setData(ary, ArenaDjInfoListItemRender, w, h, 400, 55, 6, 128, 512, 1, 10);
            this.center = 95;
            this.middle = 70;
            this.setShowLevel(4);
            this.resize();
        }

        public resetData($type: number): void {
            if($type == 0){
                this.refreshData(this.getDayReward());
            }else{
                this.refreshData(this.getCombatwinReward());
            }
            
        }

        private getCombatwinReward(): Array<SListItemData>  {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var arytab = tb.TB_doujiantai_combat_win.get_TB_doujiantai_combat_win();
            for (var i: number = 0; i < arytab.length; i++) {
                var obj: any = new Object;
                obj.lab = arytab[i].id + "连胜";
                obj.val = getResName(arytab[i].reward[0][0]) + arytab[i].reward[0][1];

                var data: SListItemData = new SListItemData();
                data.data = obj;
                data.id = i;
                ary.push(data);
            }
            return ary;
        }

        private getDayReward(): Array<SListItemData>  {
            var ary: Array<SListItemData> = new Array<SListItemData>();
            var arytab = tb.TB_doujiantai_day.get_TB_doujiantai_day();
            for (var i: number = 0; i < arytab.length; i++) {
                var obj: any = new Object;
                if (i == 0) {
                    obj.lab = "第" + arytab[i].rank + "名";
                } else {
                    var r: number = arytab[i - 1].rank + 1;
                    if (r != arytab[i].rank) {
                        obj.lab = "第" + r + "-" + arytab[i].rank + "名";
                    } else {
                        obj.lab = "第" + arytab[i].rank + "名";
                    }
                }
                obj.val = getResName(arytab[i].reward[0][0]) + arytab[i].reward[0][1];

                var data: SListItemData = new SListItemData();
                data.data = obj;
                data.id = i;
                ary.push(data);
            }
            return ary;
        }


        public show($type: number = 0): void {
            UIManager.getInstance().addUIContainer(this);
            this.resetData($type);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }



    }

    export class ArenaDjInfoListItemRender extends SListItem {
        public static baseAtlas: UIAtlas;
        private _val: UICompenent;
        private _lab: UICompenent;
        private _ibg: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this._ibg = this.creatGrid9SUI($bgRender, ArenaDjInfoListItemRender.baseAtlas, "b_bg", 0, 0, 400, 55);
            $container.addChild(this._ibg);

            this._val = this.creatSUI($baseRender, ArenaDjInfoListItemRender.baseAtlas, "b_lab2", 200, 20, 120, 20);
            $container.addChild(this._val);

            this._lab = this.creatSUI($baseRender, ArenaDjInfoListItemRender.baseAtlas, "b_lab1", 20, 20, 100, 20);
            $container.addChild(this._lab);



        }
        private onclick($e: InteractiveEvent): void {
            NetManager.getInstance().protocolos.doujiantai_first_reward(this.itdata.data.data.id);
        }

        public render($data: SListItemData): void {
            this.itdata = $data;

            if ($data && this.itdata.data) {
                this.applyRender();
            }else{
                UiDraw.clearUI(this._ibg);
                UiDraw.clearUI(this._lab);
                UiDraw.clearUI(this._val);
            }
        }

        private applyRender(): void {
            if (!(this.itdata.id % 2)) {
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this._ibg.skinName, UIData.publicUi, PuiData.LISTITEMBG);
            } else {
                UiDraw.clearUI(this._ibg);
            }
            var bd: any = this.itdata.data;

            LabelTextFont.writeSingleLabel(this.uiAtlas, this._lab.skinName, bd.lab, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this.uiAtlas, this._val.skinName, bd.val, 16, TextAlign.CENTER, ColorType.Brown7a2f21);

        }


    }


    /**end 连胜list***/
}