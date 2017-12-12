module meridian {


    export class MeridianListVo {
        public tb: tb.TB_meridian_source;
        public progress: number



    }

    export class MeridianListRender extends SListItem {
        //public static baseAtlas: UIAtlas;

        private S_NAME: UICompenent;
        private S_NUM: UICompenent;
        private S_EXP: UICompenent;
        private S_BG: UICompenent;
        private S_TO_BUT: UICompenent


        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            this.S_NAME = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_NAME", 10, 6, 80, 18);
            $container.addChild(this.S_NAME);

            this.S_NUM = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_NUM", 117, 6, 60, 18);
            $container.addChild(this.S_NUM);

            this.S_EXP = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_EXP", 190, 6, 80, 18);
            $container.addChild(this.S_EXP);


            this.S_TO_BUT = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_TO_BUT", 275, 1, 65, 31);
            $container.addChild(this.S_TO_BUT);
            this.S_TO_BUT.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.S_BG = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_BG", 0, 0, 342, 32, 10, 10);

            $container.addChild(this.S_BG);

        }
        private butClik(evt: any): void {
            if (this.itdata && this.itdata.data) {
                var $vo: MeridianListVo = this.itdata.data
                console.log("---$vo.tb---", $vo.tb);
                switch ($vo.tb.goto[0]) {
                    case 1:
                        if(GuidData.player.getsyspageopen($vo.tb.goto[1],$vo.tb.goto[2])){
                            ModulePageManager.openPanel($vo.tb.goto[1], $vo.tb.goto[2]);
                        }else{
                            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "系统未开启", 99)
                        }
                        break;
                    default:
                        break;
                }

                console.log($vo.tb.goto)

            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.setnull();
            }


        }
        private setnull(): void {
        }
        private applyRender(): void {
            if (this.itdata && this.itdata.data) {
                var $vo: MeridianListVo = this.itdata.data
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_NAME.skinName, ColorType.color9a683f + $vo.tb.name, 14, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_NUM.skinName, ColorType.color9a683f + "(" + $vo.progress + "/" + $vo.tb.limit + ")", 14, TextAlign.CENTER);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.S_EXP.skinName, ColorType.color9a683f + $vo.tb.exp, 14, TextAlign.CENTER);


                UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.S_TO_BUT.skinName, "U_TO_PLAY");

                if ($vo.tb.id % 2 == 0) {
                    UiDraw.SharedDrawImg(this.uiAtlas, this.parentTarget.baseAtlas, this.S_BG.skinName, "U_LIST_BG");
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.S_BG.skinName)
                }
            }
        }

    }
    export class MeridianList extends SList {

        public constructor() {
            super();
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, MeridianListRender, 342, 32 * 5, 256, 32, 5, 256, 512, 1, 9);
        }

        public resetData(): void {
            var $severData: Array<number> = GuidData.grow.getSpellIntFieldMeridianCnt();
            var $tbDataArr: Array<SListItemData> = new Array();
            var $tbItem: Array<tb.TB_meridian_source> = tb.TB_meridian_source.getItem();
            console.log("$severData", $severData)
            for (var i: number = 0; i < $tbItem.length; i++) {
                var $vo: SListItemData = new SListItemData();
                var $MeridianListVo: MeridianListVo = new MeridianListVo();
                $MeridianListVo.tb = $tbItem[i];
                $MeridianListVo.progress = $severData[$MeridianListVo.tb.id - 1]
                $vo.data = $MeridianListVo;
                $vo.id = i;
                $tbDataArr.push($vo);
            }
            this.refreshData($tbDataArr);

        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
            this.resetData();


        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class MeridianPanel extends WindowUi {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _effRender: FrameUIRender;

        private uiAtlasComplet: boolean = false;

        public dispose() {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
            this._redPointRender.dispose();
            this._redPointRender = null;
            if (this._effRender) {
                this._effRender.dispose();
                this._effRender = null;
            }
            if (this.meridianList) {
                this.meridianList.dispose();
                this.meridianList = null;
            }
            super.dispose();
        }

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

            this._redPointRender = new RedPointRender;
            this.addRender(this._redPointRender);

            this._effRender = new FrameUIRender();
            this.addRender(this._effRender);

            this._midRender.uiAtlas = new UIAtlas;
        }

        public applyLoad(): void {

            // GameData.getPublicUiAtlas(($publicbgUiAtlas: UIAtlas) => {
            this.winmidRender.uiAtlas = WindowUi.winUIAtlas;
            this._midRender.uiAtlas.setInfo("ui/uidata/meridian/meridian.xml", "ui/uidata/meridian/meridian.png", () => { this.loadConfigCom() }, "ui/uidata/meridian/meridianuse.png");

            // });

        }


        private a_exp_txt: UICompenent;
        private a_xiulian_but: UICompenent;
        private a_tupo_but: UICompenent;
        private a_label0: UICompenent;
        private a_jindu_bar: UICompenent;
        private a_tupo_use_res: UICompenent;
        private a_list_pos: UICompenent;
        private a_but_bg: UICompenent;
        private a_point_line_bg: UICompenent;
        private a_left_pic_name: UICompenent;
        private a_jindu_bg: UICompenent;
        private a_bar_move_point: UICompenent;
        private a_exp_but: UICompenent;
        private a_zhanli_num: UICompenent;
        private a_curlev: UICompenent;
        private a_limit: UICompenent;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(this._bottomRender.getComponent("a_bottom_bg"));
            this.a_list_pos = this.addChild(this._midRender.getComponent("a_list_pos"));


            this.addChild(this._midRender.getComponent("a_right_label_bg"));
            this.addChild(this._topRender.getComponent("a_label2"));



            this.addChild(this._midRender.getComponent("a_label_9_bg2"));
            this.addChild(this._midRender.getComponent("a_label_9_bg1"));
            this.addChild(this._midRender.getComponent("a_label_9_bg0"));

            this.a_jindu_bg = this.addChild(this._midRender.getComponent("a_jindu_bg"));

            this.addChild(this._midRender.getComponent("a_centen_label_bg"));



            this.addChild(this._midRender.getComponent("a_left_pic_bg"));

            this.a_left_pic_name = this.addChild(this._topRender.getComponent("a_left_pic_name"));

            this.a_but_bg = this.addEvntButUp("a_but_bg", this._midRender);

            this._redPointRender.getRedPointUI(this, 81, new Vector2D(this.a_but_bg.x + this.a_but_bg.width, this.a_but_bg.y));

            this.addChild(this._midRender.getComponent("a_win_tittle"));
            this.addChild(this._midRender.getComponent("a_zhanli_label"));

            this.a_curlev = this.addChild(this._midRender.getComponent("a_curlev"));
            this.a_zhanli_num = this.addChild(this._midRender.getComponent("a_zhanli_num"));




            this.a_label0 = this.addChild(this._midRender.getComponent("a_label0"));

            //this.a_xiulian_but = this.addEvntBut("a_xiulian_but", this._topRender)
            //this.a_tupo_but = this.addEvntBut("a_tupo_but", this._topRender)

            this.a_xiulian_but = this.addChild(this._topRender.getComponent("a_xiulian_but"));
            this.a_tupo_but = this.addChild(this._topRender.getComponent("a_tupo_but"));

            this.a_jindu_bar = this.addChild(this._midRender.getComponent("a_jindu_bar"));


            this.a_exp_but = this.addEvntButUp("a_exp_but", this._topRender)
            this._redPointRender.getRedPointUI(this, 117, new Vector2D(this.a_exp_but.x + this.a_exp_but.width, this.a_exp_but.y));
            this.addChild(this._midRender.getComponent("a_info"));

            this.addChild(this._midRender.getComponent("a_pic"));

            this.a_point_line_bg = this.addChild(this._topRender.getComponent("a_point_line_bg"));


            this.a_exp_txt = this.addChild(this._topRender.getComponent("a_exp_txt"));
            this.a_tupo_use_res = this.addChild(this._topRender.getComponent("a_tupo_use_res"));

            for (var i: number = 0; i < 7; i++) {
                this.a_valueItem.push(this.addChild(this._topRender.getComponent("a_value_txt" + i)))
                this.a_upItem.push(this.addChild(this._topRender.getComponent("a_value_up" + i)))
            }


            this.a_bar_move_point = this.addChild(this._topRender.getComponent("a_bar_move_point"));
            this.a_limit = this.addChild(this._topRender.getComponent("a_limit"));

            this.xiulianUiList = [this.a_jindu_bg, this.a_xiulian_but, this.a_jindu_bar, this.a_bar_move_point, this.a_exp_txt]
            this.tuPoUiList = [this.a_tupo_but, this.a_tupo_use_res]

            this.initList();
            this.initRightBg()
            this.uiAtlasComplet = true;
            this.applyLoadComplete();



        }
        private xiulianUiList: Array<UICompenent>
        private tuPoUiList: Array<UICompenent>
        private initRightBg(): void {


            var cnew_right_bg_top: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg_top"));
            this.setSizeForPanelUiCopy(cnew_right_bg_top, "a_right_bg_top", this._midRender);
            var cnew_right_bg_bottom: UICompenent = this.addChild(this.winmidRender.getComponent("cnew_right_bg_bottom"));
            this.setSizeForPanelUiCopy(cnew_right_bg_bottom, "a_right_bg_bottom", this._midRender);

            this.winmidRender.applyObjData();
        }
        public meridianList: MeridianList
        private initList(): void {
            this.meridianList = new MeridianList;
            this.meridianList.init(this._midRender.uiAtlas)

        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            this.meridianList.show();
            this.refresh(true);

        }
        public resize(): void {
            super.resize();
            if (this.meridianList) {

                this.meridianList.left = this.a_list_pos.parent.x / UIData.Scale + this.a_list_pos.x + 3
                this.meridianList.top = this.a_list_pos.parent.y / UIData.Scale + this.a_list_pos.y + 5
            }

        }

        private a_valueItem: Array<UICompenent> = new Array
        private a_upItem: Array<UICompenent> = new Array

        private selectTb: tb.TB_meridian_info;
        private canXiulian: boolean = false;

        private getPicId($id: number): number {
            //Math.floor(Math.max($id - 1, 0) / 7) + 1
            return Math.floor(Math.max($id, 0) / 8) + 1
        }

        private getCurLev($id: number): number {
            //Math.floor(Math.max($id - 1, 0) / 7) + 1
            return Math.floor(Math.max($id - 1, 0) / 8)
        }
        public refresh($init: boolean = false): void {
            if (this.uiAtlasComplet) {
                var $lev: number = GuidData.grow.getSpellIntFieldMeridianLevel(0);
                var $exp: number = GuidData.grow.getSpellIntFieldMeridianExp()

                this.selectTb = tb.TB_meridian_info.getTempVo($lev);
                var aaary = tb.TB_meridian_info.getItem();
                var completeflag: boolean = aaary[aaary.length - 1].id <= $lev;
                if (completeflag) {
                    //满级
                    this.drawComplete();
                } else {
                    this.mathValuesLabel();
                    var netxTb: tb.TB_meridian_info = tb.TB_meridian_info.getTempVo($lev + 1);
                    var $tupoOrxiulian: boolean = true
                    if (netxTb.costMoney.length) {
                        $tupoOrxiulian = true;
                    } else {
                        $tupoOrxiulian = false;
                    }
                    this.setUiListVisibleByItem([this.a_limit], false);
                    this.setUiListVisibleByItem(this.tuPoUiList, $tupoOrxiulian);
                    this.setUiListVisibleByItem(this.xiulianUiList, !$tupoOrxiulian);

                    if ($tupoOrxiulian) {
                        //突破
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_tupo_use_res.skinName,
                            ColorType.Orange7a2f21 + "消耗" + getResName(netxTb.costMoney[0][0]) +
                            (hasEnoughRes(netxTb.costMoney[0]) ? ColorType.Green2ca937 : ColorType.colorce0a00) + netxTb.costMoney[0][1],
                            14, TextAlign.CENTER);

                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_label0.skinName, ColorType.Orange7a2f21 + "筋脉突破", 14, TextAlign.CENTER);

                    } else {
                        //修炼进度
                        var nextTb: tb.TB_meridian_info = tb.TB_meridian_info.getTempVo($lev + 1);
                        this.canXiulian = ($exp >= nextTb.costExp);
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp_txt.skinName, ColorType.Whiteffffff + $exp + "/" + nextTb.costExp, 14, TextAlign.CENTER);

                        var $uvScaleNum: number = Math.min($exp / nextTb.costExp, 1);
                        this.a_jindu_bar.uvScale = $uvScaleNum;

                        if ($uvScaleNum <= 0 || $uvScaleNum >= 1) {
                            this.a_bar_move_point.x = 10000;
                        } else {
                            this.a_bar_move_point.x = this.a_jindu_bar.x + this.a_jindu_bar.width * $uvScaleNum - this.a_bar_move_point.width / 2;
                        }
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_label0.skinName, ColorType.Orange7a2f21 + "穴位修炼进度", 14, TextAlign.CENTER);

                    }
                }
                this.upToPicById(this.selectTb.pic);
                this.drawPointToPic(this.getPicId(this.selectTb.id), this.getCurLev(this.selectTb.id));
                if (!$init) {
                    this.showSkillUpEff();
                }
                //  LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_curlev.skinName, ColorType.Green20a200 + curLev + "级", 16, TextAlign.CENTER);
                this._istupoOrxiulian = $tupoOrxiulian;
                this.setForce();
                this.curAttr(completeflag);
            }
        }

        public setForce() {
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_zhanli_num.skinName, String(GuidData.player.getPlayerIntFieldMeridianForce()), ArtFont.num53, TextAlign.LEFT);
        }

        /*
        public refresh(): void {
            if (this.uiAtlasComplet) {
                var $lev: number = GuidData.grow.getSpellIntFieldMeridianLevel(0);
                var $tupo: number = GuidData.grow.getSpellIntFieldMeridianLevel(1);
                var $exp: number = GuidData.grow.getSpellIntFieldMeridianExp()


                console.log("等级", $lev);
                this.selectTb = tb.TB_meridian_info.getTempVo($lev);
                var $tupoOrxiulian: boolean = true
                if (this.selectTb.costMoney.length && Boolean($tupo)) {
                    $tupoOrxiulian = true;
                } else {
                    $tupoOrxiulian = false;
                }

                var aaary = tb.TB_meridian_info.getItem();
                var completeflag:boolean = aaary[aaary.length - 1].id <= $lev;
                if (completeflag) {
                    this.drawComplete();
                } else {
                    this.setUiListVisibleByItem([this.a_limit], false);
                    this.setUiListVisibleByItem(this.tuPoUiList, $tupoOrxiulian);
                    this.setUiListVisibleByItem(this.xiulianUiList, !$tupoOrxiulian);
                }


                //console.log("经验", GuidData.grow.getSpellIntFieldMeridianExp());
                //  console.log(GuidData.grow.getSpellIntFieldMeridianCnt());


                var showPic: number = this.getPicId(this.selectTb.id)
                // console.log("-----showPic------", this.selectTb.id,showPic);
                var curLev: number = this.getCurLev(this.selectTb.id)
                if ($tupoOrxiulian) {
                    //strengthgem.EquDrawUtil.drawResourceIconAndtxt(this._topRender.uiAtlas, this.a_tupo_use_res.skinName, this.selectTb.costMoney[0][1], this.selectTb.costMoney[0][0]);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_tupo_use_res.skinName,
                        ColorType.Orange7a2f21 + "消耗" + getResName(this.selectTb.costMoney[0][0]) +
                        (hasEnoughRes(this.selectTb.costMoney[0]) ? ColorType.Green2ca937 : ColorType.colorce0a00) + this.selectTb.costMoney[0][1],
                        14, TextAlign.CENTER);

                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_label0.skinName, ColorType.Orange7a2f21 + "筋脉突破", 14, TextAlign.CENTER);

                } else {
                    if (!completeflag) {
                        var nextTb: tb.TB_meridian_info = tb.TB_meridian_info.getTempVo($lev + 1);
                        this.canXiulian = ($exp >= nextTb.costExp);
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exp_txt.skinName, ColorType.Whiteffffff + $exp + "/" + nextTb.costExp, 14, TextAlign.CENTER);

                        var $uvScaleNum: number = Math.min($exp / nextTb.costExp, 1)
                        this.a_jindu_bar.uvScale = $uvScaleNum

                        if ($uvScaleNum <= 0 || $uvScaleNum >= 1) {
                            this.a_bar_move_point.x = 10000
                        } else {
                            this.a_bar_move_point.x = this.a_jindu_bar.x + this.a_jindu_bar.width * $uvScaleNum - this.a_bar_move_point.width / 2;
                        }
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_label0.skinName, ColorType.Orange7a2f21 + "穴位修炼进度", 14, TextAlign.CENTER);
                        if (this.selectTb.costMoney.length) {
                            //如果到末尾，则循环
                            showPic = showPic == 7 ? 0 : showPic + 1;
                        }
                    }
                }
                this.drawPointToPic(showPic, curLev);

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_curlev.skinName, ColorType.Green20a200 + curLev + "级", 16, TextAlign.CENTER);

                this._istupoOrxiulian = $tupoOrxiulian

                this.curAttr(completeflag);
                if (!completeflag) {
                    this.mathValuesLabel();
                }
                this.upToPicById(showPic);

                // if(this._istupoOrxiulian || this.canXiulian){
                //     RedPointManager.getInstance().getNodeByID(81).show = true;
                // }else{
                //     RedPointManager.getInstance().getNodeByID(81).show = false;
                // }

                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_zhanli_num.skinName, String(GuidData.player.getPlayerIntFieldMeridianForce()), ArtFont.num53, TextAlign.LEFT);

                // console.log(245 / 1.5, 268 / 1.5)
                //  163,178
            }
        }
        */

        private drawComplete() {
            this.setUiListVisibleByItem(this.xiulianUiList, false);
            this.setUiListVisibleByItem(this.tuPoUiList, false);
            this.setUiListVisibleByItem([this.a_but_bg], false);
            this.setUiListVisibleByItem([this.a_limit], true);
        }

        private lastPicId: number = 0
        private upToPicById(value: number): void {

            this._topRender.uiAtlas.upDataPicToTexture("ui/load/meridian/name/" + value + ".png", this.a_left_pic_name.skinName);
            this._topRender.uiAtlas.upDataPicToTexture("ui/load/meridian/pic/" + value + ".png", this.a_point_line_bg.skinName);

        }

        private _istupoOrxiulian; boolean

        private mathValuesLabel(): void {
            var nextTb: tb.TB_meridian_info = tb.TB_meridian_info.getTempVo(this.selectTb.id + 1);
            nextTb.refrishById(GuidData.player.getCharType())
            this.selectTb.refrishById(GuidData.player.getCharType())

            for (var i: number = 0; i < nextTb.attrKeys.length; i++) {
                var $upNum: number = nextTb.attrValues[i] - this.selectTb.attrValues[i]
                UiDraw.drawAddValTop(this.a_upItem[i], $upNum)

            }
        }

        private curAttr(completeflag: boolean) {
            this.selectTb.refrishById(GuidData.player.getCharType())
            for (var i: number = 0; i < this.selectTb.attrKeys.length; i++) {
                UiDraw.drawAttVal(this.a_valueItem[i], this.selectTb.attrKeys[i], this.selectTb.attrValues[i])
                this.a_valueItem[i].x = completeflag ? 689 : 602;
            }
        }
        private drawPointToPic($pic: number, $curlev: number): void {
            this.clearGreedPoint()
            var $item: Array<tb.TB_meridian_info> = tb.TB_meridian_info.getItem();
            var $num: number = 0;
            for (var i: number = 0; i < $item.length; i++) {
                if (this.getPicId($item[i].id) == $pic && this.getCurLev($item[i].id) == $curlev && $item[i].id <= this.selectTb.id) {
                    if ($item[i].pos.length) {
                        var $point: UICompenent = this.addChild(this._topRender.getComponent("a_greed_point"));
                        $point.x = $item[i].pos[0] - 15;
                        $point.y = $item[i].pos[1] - 16;
                        this.greedItem.push($point)
                        console.log($point)
                    }
                }
            }
            console.log("------------")
        }
        private upLevEff: FrameTipCompenent;
        public showSkillUpEff(): void {
            var ui: UICompenent = this.greedItem[this.greedItem.length - 1];
            if (!ui) {
                return;
            }
            console.log("up skill lev",ui);
                
            if (!this.upLevEff) {
                this._effRender.setImg(getEffectUIUrl("ui_jn"), 4, 4, ($ui: any) => {
                    this.upLevEff = $ui;
                    this.upLevEff.x = ui.x - 10;
                    this.upLevEff.y = ui.y - 10;
                    this.upLevEff.width = this.upLevEff.baseRec.width * 0.4;
                    this.upLevEff.height = this.upLevEff.baseRec.height * 0.4;
                    this.upLevEff.speed = 1;
                    this.upLevEff.playOne(this);
                })
            }else{
                this.upLevEff.x = ui.x - 11;
                this.upLevEff.y = ui.y - 11;
                this.upLevEff.playOne(this);
            }


        }
        private clearGreedPoint(): void {
            while (this.greedItem.length) {
                this.removeChild(this.greedItem.pop());
            }
        }
        private greedItem: Array<UICompenent> = new Array()

        public hide(): void {
            this.meridianList.hide();
            UIManager.getInstance().removeUIContainer(this);
            super.hide();

        }
        private _canclick: boolean = true;
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.w_close:
                    this.hide()
                    break
                case this.a_but_bg:
                    if (this._canclick) {
                        UiTweenScale.getInstance().changeButSize(evt.target);
                        this._canclick = false;
                        TimeUtil.addTimeOut(btnClickTime, () => {
                            this._canclick = true;
                        });
                        if (this._istupoOrxiulian) {
                            console.log("请求突破", this.selectTb.costMoney);
                            var nextTb: tb.TB_meridian_info = tb.TB_meridian_info.getTempVo(this.selectTb.id + 1);
                            if (GuidData.player.getResType(nextTb.costMoney[0][0]) >= nextTb.costMoney[0][1]) {
                                NetManager.getInstance().protocolos.meridian_practise()
                            } else {
                                // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "资源不足", 99)
                                var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
                                $aaa.data = nextTb.costMoney[0][0]
                                ModuleEventManager.dispatchEvent($aaa);
                            }


                        } else {
                            if (this.canXiulian) {
                                NetManager.getInstance().protocolos.meridian_practise()
                            } else {
                                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不可修炼", 99)
                            }
                        }
                    } else {
                        // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "您操作太快了", 99);
                    }
                    break;
                case this.a_exp_but:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    ModuleEventManager.dispatchEvent(new MeridianEvent(MeridianEvent.SHOW_MERIDIAN_BUY_EVENT));
                    break;
                default:


                    break;

            }

        }





    }
}