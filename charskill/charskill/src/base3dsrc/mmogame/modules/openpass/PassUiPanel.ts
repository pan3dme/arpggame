module pass {

    export class OpenpassCell {
        public pic: FrameCompenent;
        public tittle: FrameCompenent;
        public bg: UICompenent;
        public arrow: UICompenent;
        public pass_icon: UICompenent;
        public idex: number
        public parent: PassUiPanel

        public clearUi() {
            this.parent.setUiListVisibleByItem([this.pic, this.tittle, this.bg, this.pass_icon, this.arrow], false);
        }

        public addUi() {
            this.parent.setUiListVisibleByItem([this.pic, this.tittle, this.bg], true);
        }

        public setPost($pos: Array<number>) {
            this.pic.x = $pos[0];
            this.pic.y = $pos[1];

            this.tittle.x = this.pic.x - 8;
            this.tittle.y = this.pic.y + 112;

            this.bg.x = this.pic.x - 18;
            this.bg.y = this.pic.y + 110;

            this.pass_icon.x = this.pic.x + 6;
            this.pass_icon.y = this.pic.y + 16;

            this.arrow.x = this.pic.x + 20;
            this.arrow.y = this.pic.y + 7;
        }
    }

    export class PassUiPanel extends WindowUi {
        private _bgRender: UIRenderComponent;
        private _roleRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _boxRender: UIRenderComponent;
        private _boxstateRender: UIRenderComponent;
        private _frameRender: FrameUIRender;

        private _unlockbgRender: UIRenderComponent;
        private _unlockarrowRender: UIRenderComponent;
        private _unlockiconRender: UIRenderComponent;
        private _unlockinfobgRender: UIRenderComponent;
        private _unlockinfoRender: UIRenderComponent;



        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._roleRender.dispose();
            this._roleRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._boxRender.dispose();
            this._boxRender = null;
            this._boxstateRender.dispose();
            this._boxstateRender = null;

            this._unlockbgRender.dispose();
            this._unlockbgRender = null;
            this._unlockarrowRender.dispose();
            this._unlockarrowRender = null;
            this._unlockiconRender.dispose();
            this._unlockiconRender = null;
            this._unlockinfobgRender.dispose();
            this._unlockinfobgRender = null;
            this._unlockinfoRender.dispose();
            this._unlockinfoRender = null;

            if (this._frameRender) {
                this._frameRender.dispose();
                this._frameRender = null;
            }
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._roleRender = new UIRenderComponent;
            this.addRender(this._roleRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            this._boxRender = new UIRenderComponent;
            this.addRender(this._boxRender)
            this._boxstateRender = new UIRenderComponent;
            this.addRender(this._boxstateRender)

            this._unlockbgRender = new UIRenderComponent;
            this.addRender(this._unlockbgRender)
            this._unlockarrowRender = new UIRenderComponent;
            this.addRender(this._unlockarrowRender)
            this._unlockiconRender = new UIRenderComponent;
            this.addRender(this._unlockiconRender)
            this._unlockinfobgRender = new UIRenderComponent;
            this.addRender(this._unlockinfobgRender)
            this._unlockinfoRender = new UIRenderComponent;
            this.addRender(this._unlockinfoRender)

            this._roleRender.uiAtlas = new UIAtlas;


        }

        public applyLoad(): void {
            this._roleRender.uiAtlas.setInfo("ui/uidata/openpass/openpass.xml", "ui/uidata/openpass/openpass.png", () => { this.loadConfigCom() });
        }

        private loadConfigCom(): void {
            this._bgRender.uiAtlas = this._roleRender.uiAtlas;
            this._topRender.uiAtlas = this._roleRender.uiAtlas;
            this._boxstateRender.uiAtlas = this._roleRender.uiAtlas;
            this._boxRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockbgRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockarrowRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockiconRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockinfobgRender.uiAtlas = this._roleRender.uiAtlas;
            this._unlockinfoRender.uiAtlas = this._roleRender.uiAtlas;
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this.initData();
            this.initBoxUI();
            this.initUnlockUI();

            this._updateFun = () => {
                this.updateY();
            }

            this.resize();
            this.applyLoadComplete();
        }

        private UnlockAry: Array<UICompenent>
        private closeBtn: UICompenent
        private initUnlockUI() {
            this.UnlockAry = new Array

            var d_namebg1 = this.addChild(this._unlockinfobgRender.getComponent("d_namebg1"));
            d_namebg1.isU = true;

            this.UnlockAry.push(this._unlockiconRender.getComponent("d_icon"));
            this.UnlockAry.push(this._unlockinfoRender.getComponent("d_name"));
            this.UnlockAry.push(this._unlockinfoRender.getComponent("d_info"));
            this.UnlockAry.push(this._unlockinfobgRender.getComponent("d_namebg0"));
            this.UnlockAry.push(d_namebg1);
            this.UnlockAry.push(this._unlockarrowRender.getComponent("d_iconbg"));

            this.closeBtn = this.addEvntButUp("e_close",this._unlockinfoRender);
            var basebg = this._unlockbgRender.getComponent("d_basebg");
            basebg.addEventListener(InteractiveEvent.Up, () => { }, this);
            basebg.addEventListener(InteractiveEvent.Down, () => { }, this);
            this.UnlockAry.push(basebg);
        }

        private right_arrow: UICompenent
        private left_arrow: UICompenent
        private a_chapter: UICompenent
        private mapIconUiList: Array<OpenpassCell>;
        private initData(): void {
            //添加UI控件初始化

            this.addChild(this._bgRender.getComponent("a_title"));

            this.a_chapter = this.addChild(this._topRender.getComponent("a_chapter"));

            var a_chapterbg1 = this.addChild(this._bgRender.getComponent("a_chapterbg1"));
            a_chapterbg1.isU = true;
            this.addChild(this._bgRender.getComponent("a_chapterbg"));


            this.right_arrow = this.addEvntButUp("a_arrow1", this._unlockarrowRender);
            this.right_arrow.isU = true;
            this.left_arrow = this.addEvntButUp("a_arrow", this._unlockarrowRender);


            this.mapIconUiList = new Array();
            for (var i: number = 0; i < 6; i++) {

                var $vo: OpenpassCell = new OpenpassCell()
                $vo.idex = i
                $vo.pic = <FrameCompenent>this._roleRender.getComponent("a_chart_frame");
                $vo.pic.goToAndStop(i);

                $vo.pass_icon = this._topRender.getComponent("a_pass_icon");

                $vo.tittle = <FrameCompenent>this._topRender.getComponent("a_tittle_frame");
                $vo.tittle.goToAndStop(i);

                $vo.bg = this._roleRender.getComponent("a_txt_bg");
                $vo.arrow = this._topRender.getComponent("w_cur");
                $vo.parent = this;

                this.mapIconUiList.push($vo);

            }

        }


        private effAry: Array<FrameTipCompenent>;
        private buildFram(): void {
            if (!this._frameRender) {
                this._frameRender = new FrameUIRender();
                this.addRender(this._frameRender);
                this._frameRender.setImg(getEffectUIUrl("ef_fl"), 4, 4, ($ary: any) => {
                    this.effAry = $ary;
                    for (var i: number = 0; i < this.effAry.length; i++) {
                        this.effAry[i].x = this.boxAry[i].x - 25
                        this.effAry[i].y = this.boxAry[i].y - 20
                        this.effAry[i].width = this.effAry[i].baseRec.width * 0.9;
                        this.effAry[i].height = this.effAry[i].baseRec.height * 0.8;
                        this.effAry[i].speed = 3;
                    }
                    this.playEff();
                }, this.boxAry.length);

            }
        }

        public playEff(): void {
            if (!this.effAry) {
                return;
            }
            for (var i: number = 0; i < this.boxAry.length; i++) {
                var vo: BoxVo = this.boxAry[i].data;
                if (vo) {
                    if (this.boxAry[i].current > 0 && vo.canbuy) {
                        this.addChild(this.effAry[i]);
                        this.effAry[i].play();
                    } else {
                        this.removeChild(this.effAry[i]);
                    }
                }
            }
        }


        private a_pro: UICompenent
        private boxAry: Array<FrameCompenent>
        private boxstaAry: Array<UICompenent>
        private initBoxUI() {
            this.a_pro = this.addChild(this._roleRender.getComponent("a_pro"));
            this.addUIList(["a_huawen", "a_2", "a_4", "a_6"], this._topRender);
            this.addUIList(["a_boxbg", "a_probg"], this._bgRender);

            this.boxAry = new Array
            this.boxstaAry = new Array
            for (let i = 0; i < 3; i++) {
                var boxui: FrameCompenent = <FrameCompenent>this.addChild(this._boxRender.getComponent("a_box" + i));
                boxui.goToAndStop(0);
                this.boxAry.push(boxui);

                this.boxstaAry.push(this._boxstateRender.getComponent("a_ok" + i));
            }
            this.buildFram();
        }

        public resize(): void {
            // if (this.UnlockAry[6] && this.UnlockAry[6].parent) {
            //     this.UnlockAry[6].top = 0
            //     this.UnlockAry[6].left = 0
            //     this.UnlockAry[6].y = 0;
            //     this.UnlockAry[6].x = 0;
            //     this.UnlockAry[6].height = Scene_data.stageHeight / UIData.Scale;
            //     this.UnlockAry[6].width = Scene_data.stageWidth / UIData.Scale;
            // }
            super.resize();
        }

        private _updateFun: Function;
        private _lastY: number;
        private _curCell: OpenpassCell
        public drawMapIcon($vo: OpenpassCell, $tab: any) {
            var $iconUrl: string;
            if (GuidData.player.getCurPassId() + 1 >= $tab["id"]) {
                $iconUrl = "ui/load/adventure/icon/1.png";
            } else {
                $iconUrl = "ui/load/adventure/icon/2.png";
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + $iconUrl, LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = $vo.pic.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                    $vo.pic.drawToCtx(this._topRender.uiAtlas, $ctx);
                });

            //如果通关了
            this.setUiListVisibleByItem([$vo.pass_icon], GuidData.player.getCurPassId() + 1 > $tab["id"]);

            this.drawLabelTittle($vo.tittle, $tab["name"]);

            $vo.setPost($tab["iconpos"]);

            //当前位置
            if (GuidData.player.getCurPassId() + 1 == $tab["id"]) {
                this.setUiListVisibleByItem([$vo.arrow], true);
                this._curCell = $vo;
                this._lastY = $vo.arrow.y;
                TimeUtil.addFrameTick(this._updateFun);
                $vo.pic.data = $tab;
                $vo.pic.addEventListener(InteractiveEvent.Up, this.click, this);
            } else {
                this.setUiListVisibleByItem([$vo.arrow], false);
                $vo.pic.removeEventListener(InteractiveEvent.Up, this.click, this);
            }
        }

        private drawLabelTittle($ui: FrameCompenent, $txt: string): void {
            var $skillrec: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whitefffce6 + $txt, 16, 0, 0, TextAlign.CENTER);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        }

        public refreshCell() {
            var $chapterobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_chapter.skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
            this.loadBigPicByUrl("ui/load/adventure/" + $chapterobj["back"] + ".jpg")

            var $stages: Array<number> = $chapterobj["stages"]
            for (let k = 0; k < this.mapIconUiList.length; k++) {
                var stagetab: any = TableData.getInstance().getData(TableData.tb_instance_stage, $stages[k]);
                if (stagetab) {
                    this.mapIconUiList[k].addUi();
                    this.drawMapIcon(this.mapIconUiList[k], stagetab);
                } else {
                    this.mapIconUiList[k].clearUi();
                }
            }
        }

        public getOpenstate($val: number): boolean {
            var $chapterobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, $val);
            var levstate: boolean = $chapterobj["limLev"] <= GuidData.player.getLevel()
            var passstate: boolean = $chapterobj["stages"][0] - 1 <= GuidData.player.getCurPassId()
            //console.log("-----levstate-----", levstate, passstate);
            if (levstate && passstate) {
                return true;
            } else {
                return false;
            }
        }

        public refreshBox() {

            var $chapterobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId);

            var ary: Array<boolean> = GuidData.instanceData.getOpenPassBoxReceiveAry();
            for (let i = 0; i < $chapterobj["bonuses"].length; i++) {
                var idx = (this.curchapterId - 1) * 3 + i
                var $bonusobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_bonus, $chapterobj["bonuses"][i]);

                var vo: BoxVo = new BoxVo();
                vo.id = idx;
                vo.title = 0
                vo.canbuy = $bonusobj["stage"] <= GuidData.player.getCurPassId();
                // if ($vo.needpass > GuidData.player.getCurPassId()) {
                vo.rewardary = $bonusobj["reward"];
                this.drawBox(i, ary[idx], vo);
            }

            //进度条
            var stagesary: Array<number> = $chapterobj["stages"];
            if (GuidData.player.getCurPassId() >= stagesary[stagesary.length - 1]) {
                this.a_pro.uvScale = 1
            } else if (GuidData.player.getCurPassId() < stagesary[0]) {
                this.a_pro.uvScale = 0
            } else {
                var aaa = GuidData.player.getCurPassId() % 6
                var ratio = aaa / 6
                this.a_pro.uvScale = ratio;
            }
            this.playEff();
        }

        private drawBox($index: number, $flag: boolean, $vo: BoxVo) {
            this.setUiListVisibleByItem([this.boxstaAry[$index]], $flag);
            if (!$flag) {
                //判断是未达到条件，还是等待领取
                this.boxAry[$index].addEventListener(InteractiveEvent.Up, this.boxcilck, this);
                this.boxAry[$index].goToAndStop($index + 1);


                //data里放置需达到关卡的id
                this.boxAry[$index].data = $vo
                // if ($vo.needpass <= GuidData.player.getCurPassId()) {
                //     //关卡达成 动效
                // }
            } else {
                this.boxAry[$index].goToAndStop(0);
                this.boxAry[$index].removeEventListener(InteractiveEvent.Up, this.boxcilck, this);
            }
        }

        public refreshUnlock() {
            var $chapterobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId - 1);
            var $newobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId);
            if ($chapterobj) {
                var stagesary: Array<number> = $chapterobj["stages"];
                if (GuidData.player.getCurPassId() >= stagesary[stagesary.length - 1]) {
                    if ($newobj["limLev"] > GuidData.player.getLevel()) {
                        this.setUiListVisibleByItem(this.UnlockAry, true);
                        this._bgRender.uiAtlas.upDataPicToTexture("ui/load/adventure/icon/2.png", this.UnlockAry[0].skinName);
                        LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[2].skinName, "Lv" + $newobj["limLev"] + " 解锁", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                        LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[1].skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                    } else {
                        this.setUiListVisibleByItem(this.UnlockAry, false);
                    }
                } else {
                    this.setUiListVisibleByItem(this.UnlockAry, true);
                    this._bgRender.uiAtlas.upDataPicToTexture("ui/load/adventure/icon/2.png", this.UnlockAry[0].skinName);
                    LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[2].skinName, "通关前置章节后开启", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                    LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[1].skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
                }
            } else {
                this.setUiListVisibleByItem(this.UnlockAry, false);
            }
        }

        private _curchapterId: number;
        public set curchapterId($val) {
            this._curchapterId = $val;
            this.setUiListVisibleByItem([this.left_arrow], $val != 1);
            this.setUiListVisibleByItem([this.right_arrow], this.getOpenstate($val));
            this.refreshCell();
            this.refreshBox();
            this.refreshUnlock();
        }

        public get curchapterId(): number {
            return this._curchapterId;
        }

        public showSysOpenEff() {
            this.setUiListVisibleByItem(this.UnlockAry, true);
            this._bgRender.uiAtlas.upDataPicToTexture("ui/load/adventure/icon/1.png", this.UnlockAry[0].skinName);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[2].skinName, "新章节开启中", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);
            LabelTextFont.writeSingleLabel(this._bgRender.uiAtlas, this.UnlockAry[1].skinName, "第" + getChiNum(this.curchapterId) + "章", 16, TextAlign.CENTER, ColorType.Whiteffe9b4);

            GameMouseManager.getInstance().useMouseEvent = false
            var topos: Vector2D = UiTweenVo.getPosByPanel(new Vector2D(84,77), { width: UIData.designWidth, height: UIData.designHeight, center: 0, middle: 0 }, this);

            TimeUtil.addTimeOut(1500, () => {
                TweenMoveTo(this.UnlockAry[0], 0.6, { x: topos.x, y: topos.y, onComplete: () => { this.changeButEnd() } });
            });
        }

        public changeButEnd(): void {
            GameMouseManager.getInstance().useMouseEvent = true;
            this.UnlockAry[0].x = 436
            this.UnlockAry[0].y = 194
            this.setUiListVisibleByItem(this.UnlockAry, false);
        }

        private _maxflag: boolean;
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);

            //当前章节id
            var bbb = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.player.getCurPassId() + 1);
            //console.log("=====GuidData.player.getCurPassId()=====", bbb);
            if (bbb) {
                this._maxflag = false;
                this.curchapterId = bbb["chapterId"]
            } else {
                this._maxflag = true;
                this.curchapterId = TableData.getInstance().getData(TableData.tb_instance_stage, GuidData.player.getCurPassId())["chapterId"];
            }
            this.resize();
        }

        public onRemove(): void {
            super.onRemove();
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
        }

        public hide(): void {
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
            ModulePageManager.hideResTittle();
        }

        private boxcilck(evt: InteractiveEvent): void {
            var $eee = new PassEvent(PassEvent.SHOW_BOXREWARD_PANEL);
            $eee.data = evt.target.data
            $eee.SubmitFun = (value: number) => {
                NetManager.getInstance().protocolos.pick_stage_instance_bonus(evt.target.data.id);
            }
            ModuleEventManager.dispatchEvent($eee);
        }

        private click(evt: InteractiveEvent): void {
            var $eee = new PassEvent(PassEvent.SHOW_BOSS_PANEL);
            $eee.data = evt.target.data
            ModuleEventManager.dispatchEvent($eee);

            UIManager.popClikNameFun("a_chart_frame");
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.closeBtn:
                    ModuleEventManager.dispatchEvent(new PassEvent(PassEvent.HIDE_PASS_PANEL));
                    break;
                case this.right_arrow:
                    var $chapterobj: any = TableData.getInstance().getData(TableData.tb_instance_stage_chapter, this.curchapterId + 1);
                    if ($chapterobj) {
                        this.curchapterId++;
                    } else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "敬请期待...", 99)
                    }
                    break;
                case this.left_arrow:
                    this.curchapterId--;
                    break;
                default:
                    break;
            }
        }

        public updateY(): void {
            var ypos: number = Math.sin(TimeUtil.getTimer() / 250) * 5;
            if (!this._curCell.arrow.parent) {
                return;
            }
            this._curCell.arrow.y = this._lastY + ypos;
        }
    }

}