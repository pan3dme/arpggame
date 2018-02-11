


module kuafu {

    export class KuaFu3v3EndPanel extends UIPanel {

        private _topRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _bottomRender: UIRenderComponent
        public handlerFun: Function

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0
            this.middle = 0

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();

            this._topRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/kuafuend.xml", "ui/uidata/kuafu/3v3/kuafuend.png", () => { this.loadConfigCom() }, "ui/uidata/kuafu/pc.png");

        }

        private _aryItemBg: Array<FrameCompenent>
        private _aryItemIcon: Array<UICompenent>
        private _aryItemName: Array<UICompenent>
        private _aryItemJisha: Array<UICompenent>
        private _aryItemShanghai: Array<UICompenent>
        private _aryItemJifen: Array<UICompenent>
        private _aryItemRongyu: Array<UICompenent>
        private _aryItemZuijia: Array<UICompenent>
        private a_left_num: UICompenent
        private a_right_num: UICompenent
        private a_tip_txt: FrameCompenent
        private _curNum: UICompenent
        private _curGrade: UICompenent
        private _gradeIcon: UICompenent

        private _tickFun: Function;
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas
            this._midRender.uiAtlas = this._topRender.uiAtlas;

            var renderLevel: UIRenderComponent = this._topRender;

            var a_bg0 = this.addEvntBut("a_bg", this._bottomRender);
            var a_bg1 = this.addEvntBut("a_bg", this._bottomRender);
            a_bg1.x = a_bg0.x + 391
            a_bg1.isU = true;
            this.addChild(<UICompenent>this._bottomRender.getComponent("line1"));

            this.addUIList(["a_bottom_bg", "a_title_bg", "a_16"], this._midRender);

            this.a_left_num = this.addChild(<UICompenent>renderLevel.getComponent("a_left_num"));
            this.a_right_num = this.addChild(<UICompenent>renderLevel.getComponent("a_right_num"));

            this.a_tip_txt = <FrameCompenent>this.addChild(renderLevel.getComponent("a_tip_txt"));

            this.addUIList(["a_1_0", "a_2_0", "a_4_0", "a_3_0", "a_2_1", "a_4_1", "a_1_1", "a_3_1"], this._midRender);

            this._curNum = this.addChild(<UICompenent>renderLevel.getComponent("a_9"));
            this._gradeIcon = this.addChild(<UICompenent>renderLevel.getComponent("a_8"));
            this._curGrade = this.addChild(<UICompenent>renderLevel.getComponent("a_10"));



            this._aryItemBg = new Array
            this._aryItemIcon = new Array
            this._aryItemName = new Array
            this._aryItemJisha = new Array
            this._aryItemShanghai = new Array
            this._aryItemJifen = new Array
            this._aryItemRongyu = new Array
            this._aryItemZuijia = new Array

            for (var i = 0; i < 6; i++) {
                var uifra: FrameCompenent = <FrameCompenent>renderLevel.getComponent("fra_bg" + i);
                if (i > 2) {
                    uifra.isU = true;
                }
                this._aryItemBg.push(uifra);
                this._aryItemIcon.push(<UICompenent>renderLevel.getComponent("icon" + i));
                this._aryItemName.push(<UICompenent>renderLevel.getComponent("name" + i));
                this._aryItemJisha.push(<UICompenent>renderLevel.getComponent("j" + i));
                this._aryItemShanghai.push(<UICompenent>renderLevel.getComponent("sH" + i));
                this._aryItemJifen.push(<UICompenent>renderLevel.getComponent("jF" + i));
                this._aryItemRongyu.push(<UICompenent>renderLevel.getComponent("rY" + i));
                this._aryItemZuijia.push(<UICompenent>renderLevel.getComponent("a_7_" + i));
            }

            this._tickFun = (t: number) => { this.tickRefreshState(t) };

            this.refrish();
        }

        private _curtime: number;
        public tickRefreshState(t: number): void {

            var $time: number = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                ArtFont.getInstance().writeFontToSkinNameCenter(this._midRender.uiAtlas, "A_17", String($time), ArtFont.num7, 5);
                //console.log("刷新", $time);
                if ($time < 0) {
                    //回调
                    this.close();
                    NetManager.getInstance().protocolos.goback_to_game_server();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        }

        private close(): void {
            this.setUiListVisibleByItem(this._aryItemBg, false);
            this.setUiListVisibleByItem(this._aryItemIcon, false);
            this.setUiListVisibleByItem(this._aryItemName, false);
            this.setUiListVisibleByItem(this._aryItemJisha, false);
            this.setUiListVisibleByItem(this._aryItemShanghai, false);
            this.setUiListVisibleByItem(this._aryItemJifen, false);
            this.setUiListVisibleByItem(this._aryItemRongyu, false);
            this.setUiListVisibleByItem(this._aryItemZuijia, false);

            UIManager.getInstance().removeUIContainer(this);


        }

        protected butClik(evt: InteractiveEvent): void {
            this.close();
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));

            NetManager.getInstance().protocolos.instance_exit(0);
            //console.log("推出副本")
        }

        public refrish(): void {

            //正常交互数据
            var $item: Array<Kuafu3V3dataVo> = KuaFu3v3Model.getInstance().kuafuItem;

            //比分临时变量
            var $leftnum: number = 0;
            var $rightnum: number = 0;
            //当前绘制索引变量
            var anum: number = 0
            var bnum: number = 3
            //玩家战斗结算数据循环绘制
            for (var i: number = 0; i < $item.length; i++) {
                var index: number
                //绘制ItemUI
                if ($item[i].group == 1) {
                    index = anum;
                    anum++
                } else {
                    index = bnum;
                    bnum++
                }

                var uibg: FrameCompenent = this._aryItemBg[index];
                var uiicon: UICompenent = this._aryItemIcon[index];
                var uiname: UICompenent = this._aryItemName[index];
                var uijisha: UICompenent = this._aryItemJisha[index];
                var uishanghai: UICompenent = this._aryItemShanghai[index];
                var uijifen: UICompenent = this._aryItemJifen[index];
                var uirongyu: UICompenent = this._aryItemRongyu[index];

                this.setUiListVisibleByItem([uibg, uiicon, uiname, uijisha, uishanghai, uijifen, uirongyu], true);

                if ($item[i].zuijia == 1) {
                    this.setUiListVisibleByItem([this._aryItemZuijia[index]], true);
                }



                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, uiname.skinName, getServerAndName($item[i].name), 14, TextAlign.CENTER, "#d6e7ff");

                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uijisha.skinName, String($item[i].killnum), ArtFont.num3);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uishanghai.skinName, String($item[i].shanghai), ArtFont.num3);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uijifen.skinName, String($item[i].jifen), ArtFont.num3);
                ArtFont.getInstance().writeFontToSkinNameCenter(this._topRender.uiAtlas, uirongyu.skinName, String($item[i].rongyu), ArtFont.num3);

                this.drawIcon(uiicon, $item[i]);

                var $selfGrop = KuaFu3v3Model.getInstance().selfVo;
                if ($selfGrop == $item[i]) {
                    uibg.goToAndStop(0);
                } else {
                    uibg.goToAndStop(1);
                }

                //统计比分逻辑
                if ($item[i].dieState == 1) { //没死
                    if ($item[i].group == 1) {
                        $rightnum++
                    } else {
                        $leftnum++
                    }
                }
            }
            //上部绘制
            this.drawTop($leftnum, $rightnum);
            //底部绘制
            this.drawBottom();


            var $time: number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldEndTM())
            this._endtime = TimeUtil.getTimer() + $time * 1000;//结束时间
            // this._endtime = (15 * 1000) + TimeUtil.getTimer();
            TimeUtil.addFrameTick(this._tickFun);
        }

        private _endtime: number;


        private drawIcon($ui: UICompenent, $kuafu3V3dataVo: Kuafu3V3dataVo): void {
           
            var $picUrl: string = getTouPic($kuafu3V3dataVo.gender)
            IconManager.getInstance().getIcon($picUrl,
                ($img: any) => {
                    var $uiRec: UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                    //头像
                    ctx.drawImage($img, 0, 0, 82, 82, 2, 2, 64, 64);

                    var bg: UIRectangle;
                    if ($kuafu3V3dataVo.group == 1) {
                        bg = this._topRender.uiAtlas.getRec("Blue")
                    } else {
                        bg = this._topRender.uiAtlas.getRec("Red")
                    }
                    ctx.drawImage(this._topRender.uiAtlas.useImg, bg.pixelX, bg.pixelY, bg.pixelWitdh, bg.pixelHeight, 0, 0, 68, 68);

                    var levelbg: UIRectangle = this._topRender.uiAtlas.getRec("Levelbg")
                    ctx.drawImage(this._topRender.uiAtlas.useImg, levelbg.pixelX, levelbg.pixelY, levelbg.pixelWitdh, levelbg.pixelHeight, 16, 56, levelbg.pixelWitdh, levelbg.pixelHeight);

                    ArtFont.getInstance().writeFontToCtxCenten(ctx, String($kuafu3V3dataVo.level), ArtFont.num28, 36, 56)

                    this._topRender.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
                });
        }


        private drawTop($leftnum: number, $rightnum: number): void {
            //胜负ui
            if ($leftnum == $rightnum) {
                this.a_tip_txt.goToAndStop(2);
            } else {
                var $selfGrop: number = KuaFu3v3Model.getInstance().selfVo.group;
                if ($leftnum > $rightnum && $selfGrop == 1 || $leftnum < $rightnum && $selfGrop == 2) {
                    this.a_tip_txt.goToAndStop(1);
                } else {
                    this.a_tip_txt.goToAndStop(0);
                }
            }
            //左右比分绘制
            UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.a_left_num.skinName, String($leftnum));
            UiDraw.SharedDrawImg(this._topRender.uiAtlas, this._topRender.uiAtlas, this.a_right_num.skinName, String($rightnum));
        }

        private drawBottom(): void {
            //当前段位
            var $tb_kuafu3v3_month_reward: tb.TB_kuafu3v3_month_reward = KuaFu3v3Model.getInstance().get_month_reward_item();
            this.drawPkGrade($tb_kuafu3v3_month_reward.type);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this._curGrade.skinName, $tb_kuafu3v3_month_reward.name, 16, TextAlign.CENTER, "#d5e7ff");
            //本局积分
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this._curNum.skinName, "+" + KuaFu3v3Model.getInstance().selfVo.jifen, ArtFont.num7, TextAlign.CENTER, 5);
        }

        private drawPkGrade($type: number): void {
            LoadManager.getInstance().load(Scene_data.fileRoot +getUIpkGradeUrl(String($type)),LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $uiRec: UIRectangle = this._topRender.uiAtlas.getRec(this._gradeIcon.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                    //头像
                    ctx.drawImage($img, 0, 0, 82, 106, 0, 0, 82, 106);
                    this._topRender.uiAtlas.updateCtx(ctx, $uiRec.pixelX, $uiRec.pixelY);
                });
        }
    }
}