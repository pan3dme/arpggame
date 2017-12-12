module adventuremap {

    export class AdventureMapVo {
        public pic: FrameCompenent;
        public tittle: FrameCompenent;
        public bg: UICompenent;
        public idex: number
    }
    export class AdventureMapPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

        }

        public dispose(): void {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        private a_rank_but: UICompenent;
        private a_enter_but: UICompenent;
        private a_money_txt: UICompenent;
        private a_exp_txt: UICompenent;
        private a_equ_txt: UICompenent;
        private a_adventure_time: UICompenent;
        private a_card_num: UICompenent;
        private a_attact_now: FrameCompenent;
        private a_page_but_left: UICompenent;
        private a_guaji: UICompenent;
        private a_page_but_right: UICompenent;
        private a_card_num_bg: UICompenent

        public initUiAtlas($uiAtlas: UIAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;

            this.addChild(this._bottomRender.getComponent("a_txt_bg_exp"));
            this.addChild(this._bottomRender.getComponent("a_txt_bg_map_name"));

            this.addChild(<UICompenent>this._midRender.getComponent("a_info_txt"));

            this.a_map_name = this.addChild(<UICompenent>this._topRender.getComponent("a_map_name"));
            this.a_money_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_money_txt"));
            this.a_exp_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_exp_txt"));
            this.a_equ_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_equ_txt"));

            this.a_card_num = this.addChild(<UICompenent>this._topRender.getComponent("a_card_num"));
            this.a_card_num_bg = this.addChild(<UICompenent>this._midRender.getComponent("a_card_num_bg"));
            this.a_attact_now = <FrameCompenent>this.addEvntButUp("a_attact_now", this._topRender);


            this.a_adventure_time = this.addChild(<UICompenent>this._topRender.getComponent("a_adventure_time"));

            this.a_page_but_left = this.addEvntButUp("a_page_but_left", this._topRender)
            this.a_page_but_right = this.addEvntButUp("a_page_but_right", this._topRender)
            this.a_page_but_right.isU = true;


            this.mapIconUiList = new Array();
            for (var i: number = 0; i < 5; i++) {


                var $vo: AdventureMapVo = new AdventureMapVo()
                $vo.idex = i
                $vo.pic = <FrameCompenent>this.addChild(this._midRender.getComponent("a_chart_frame"));
                $vo.pic.goToAndStop(i);

                $vo.tittle = <FrameCompenent>this.addChild(this._topRender.getComponent("a_tittle_frame"));
                $vo.tittle.goToAndStop(i);

                $vo.bg = this.addChild(this._bottomRender.getComponent("a_pic_tittle_bg"));

                this.mapIconUiList.push($vo);

            }


            this.a_rank_but = this.addEvntButUp("a_rank_but", this._topRender);
            this.a_enter_but = this.addEvntButUp("a_enter_but", this._topRender);

            this.a_guaji = this.addChild(<UICompenent>this._topRender.getComponent("a_guaji"));
            this.uiAtlasComplet = true;

        }


        // private _tickFun: Function;
        // public upTimeFrame(): void {

        //     if (this.hasStage) {
        //         var $tm: number = TimeUtil.getTimer() - this.leaveTime;
        //         var $timeStr: string = TimeUtil.getDiffTime2(Math.floor($tm / 1000))
        //         LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_adventure_time.skinName, ColorType.Green98ec2c + $timeStr, 15, TextAlign.RIGHT, "#ff0000");
        //     } else {
        //         TimeUtil.removeTimeTick(this._tickFun);
        //     }

        // }
        private mapIconUiList: Array<AdventureMapVo>;

        private drawLabelTittle($ui: FrameCompenent, $txt: string): void {
            var $skillrec: Rectangle = $ui.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.width, $skillrec.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whitefffce6 + $txt, 16, 0, 0, TextAlign.CENTER);
            $ui.drawToCtx(this._topRender.uiAtlas, $ctx);
        }
        public drawMapIcon($vo: AdventureMapVo, $tb_risk_data: tb.TB_risk_data): void {
            var $chapterId: number = $tb_risk_data.chapterId
            var $startId: number = this.pageId * 5
            var $tb: tb.TB_risk_chapter = tb.TB_risk_chapter.get_TB_risk_chapter($vo.idex + $startId + 1);
            this.setUpost($vo, $tb.iconpos)
            this.drawLabelTittle($vo.tittle, $tb.name);


            var $iconUrl: string = "ui/load/map/world/" + $tb.icon + ".png";

            if ($tb.id < ($chapterId + 1)) {
                $iconUrl = "ui/load/adventure/icon/1.png";

            } else {
                $iconUrl = "ui/load/adventure/icon/2.png";
            }
            LoadManager.getInstance().load(Scene_data.fileRoot + $iconUrl, LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = $vo.pic.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                    //  console.log("$vo.id ,$chapterId", $tb.id, $chapterId);
                    if ($tb.id > ($chapterId + 1)) {
                        //  UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                    }
                    $vo.pic.drawToCtx(this._topRender.uiAtlas, $ctx);
                });


            if ($tb.id < $chapterId) {
                var $temp: UICompenent = this.addChild(<UICompenent>this._topRender.getComponent("a_pass_icon"))
                $temp.x = $tb.iconpos[0] - 30
                $temp.y = $tb.iconpos[1] - 10
                this.passUiItem.push($temp);
            }

            if ($tb.id == $chapterId) {

                this.a_attact_now.x = $tb.iconpos[0] - 30
                this.a_attact_now.y = $tb.iconpos[1] - 75

                this.a_guaji.x = $tb.iconpos[0] - 50
                this.a_guaji.y = $tb.iconpos[1] - 15

                this.a_card_num.x = $tb.iconpos[0] - 55 + 10;
                this.a_card_num.y = $tb.iconpos[1] + 20 - 10;

                this.a_card_num_bg.x = this.a_card_num.x
                this.a_card_num_bg.y = this.a_card_num.y

                var $count: number = tb.TB_risk_menu.get_TB_risk_menu($chapterId).count;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_card_num.skinName, ColorType.Green98ec2c + "关卡" + $tb_risk_data.cardId + "/" + $count, 15, TextAlign.CENTER);

            }

        }

        private setUpost($vo: AdventureMapVo, $iconpos: Array<number>): void {
            $vo.pic.x = $iconpos[0] - 50;
            $vo.pic.y = $iconpos[1] - 50;

            $vo.tittle.x = $vo.pic.x;
            $vo.tittle.y = $vo.pic.y + 90;

            $vo.bg.x = $vo.pic.x - 10;
            $vo.bg.y = $vo.pic.y + 60;
        }

        private a_map_name: UICompenent

        private passUiItem: Array<UICompenent> = new Array()
        public refresh(): void {

            UIManager.getInstance().addUIContainer(this);

            while (this.passUiItem.length) {
                this.removeChild(this.passUiItem.pop());
            }


            this.a_attact_now.x = -1000;
            this.a_attact_now.y = 0;

            this.a_guaji.x = -1000;
            this.a_guaji.y = 0;

            this.a_card_num.x = -1000;
            this.a_card_num.y = 0;

            this.a_card_num_bg.x = -1000;
            this.a_card_num_bg.y = 0;




            var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();
            if (this.pageId == -1) {
                this.pageId = Math.floor(($tb.chapterId - 1) / 5);
                // this.pageId=1
            }

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name.skinName, ColorType.Yellowffe9b4 + $tb.name, 16, TextAlign.CENTER);

            var exp: number = $tb.expReward[1] * 360
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp_txt.skinName, exp + "/小时 ", 14, TextAlign.RIGHT, ColorType.Green98ec2c, ColorType.colord27262e);

            var gold: number = $tb.goldReward[1] * 360
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_money_txt.skinName, gold + "/小时", 14, TextAlign.RIGHT, ColorType.Green98ec2c, ColorType.colord27262e);

            var equipnum: number = Math.ceil($tb.suitScore * 360 / $tb.suitScoreChange)
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_equ_txt.skinName, equipnum + "件/小时", 14, TextAlign.RIGHT, ColorType.Green98ec2c, ColorType.colord27262e);


            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_adventure_time.skinName, getvipadd("riskReward"), 16, TextAlign.CENTER, ColorType.Yellowffe9b4, ColorType.colord27262e);

            for (var j: number = 0; j < this.mapIconUiList.length; j++) {
                //this.mapIconUiList[j].idex = j + this.pageId *5

                this.drawMapIcon(this.mapIconUiList[j], $tb);
            }
            /*
                  */
            var $aaa: number = GuidData.player.getPlayerIntFiledLeaveRiskPicked()
            var $bbb: number = GuidData.player.getPlaerExpAndIntLastLogoutTime();

            this.leaveTime = TimeUtil.getTimer() + GameInstance.getGameSecond($bbb) * 1000;

            //TimeUtil.addTimeTick(1000, this._tickFun);



            var ui: UICompenent = (<WorldAdventureUiPanel>this.parent).loadBigPicByUrl("ui/load/adventure/" + (this.pageId + 1) + ".jpg")
            ui.width = 826;
            ui.height = 451;


            this.setUiListVisibleByItem([this.a_page_but_left], this.pageId > 0);
            var $len: number = tb.TB_risk_chapter.getItem().length
            this.setUiListVisibleByItem([this.a_page_but_right], this.pageId < ($len / 5 - 1));

        }
        private pageId: number = -1
        private leaveTime: number


        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_page_but_left:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this.pageId > 0) {
                        this.pageId--
                        this.refresh()
                    }
                    break
                case this.a_page_but_right:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    if (this.pageId < (tb.TB_risk_chapter.getItem().length / 5)) {
                        this.pageId++
                        this.refresh()
                    }
                    break
                case this.a_attact_now:
                case this.a_enter_but:

                    UIManager.popClikNameFun(this.a_enter_but.name);
                    ModuleEventManager.dispatchEvent(new AdventureMapEvent(AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL))
                    
                    console.log("=================enter_risk_instance")
                    NetManager.getInstance().protocolos.enter_risk_instance();
                    break
                case this.a_rank_but:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    NetManager.getInstance().protocolos.risk_get_rank();
                    break;
                default:
                    break;
            }
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


    }
}