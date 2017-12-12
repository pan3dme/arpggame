module fightui {
    export class SkillUIVo {
        public iconUi: UICompenent
        public cd: CdUICompenent;
        public blackMask: UICompenent
        public cdnumA: FrameCompenent;
        public cdnumB: FrameCompenent;
        public baseRect: Rectangle

    }
    export class JumpAndEatCompenent {
        public jumpUi: UICompenent;
        public jumpcd: CdUICompenent;

        public eatUi: UICompenent;
        public eatcd: CdUICompenent;
        public constructor() {

        }
        public update(): void {

            var $num: number = Math.ceil((GuidData.player.nextCanJumpTM - TimeUtil.getTimer()) / 1000);


            if ($num > 0) {
                var $kt: number = (GuidData.player.nextCanJumpTM - TimeUtil.getTimer()) / (10 * 1000)
                this.jumpcd.setCdNum(1 - $kt);

            } else {
                this.jumpcd.setCdNum(0.999999);
            }
            this.resetEatCd()
          //  console.log(tb.SkillData.getCdMeshBySkillId(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD))
        }
        private resetEatCd(): void
        {
            var $num: number = 0
            var $cdTime: number = tb.SkillData.getCdMeshBySkillId(SharedDef.PLAYER_INT_FIELD_RESTORE_POTION_CD);
            if (isNaN($cdTime)) {
                $num = 0
            } else {
                $num = $cdTime - TimeUtil.getTimer()
            }
            if ($num > 0) {
                var $leveCdtb: number = tb.TB_restore_potion_base.get_TB_restore_potion_base(GuidData.player.getLevel()).cd
                $num = $num / ($leveCdtb * 1000);
                $num = Math.max(0, Math.min($num, 0.999999));
                this.eatcd.setCdNum(1 - $num)
            } else {
                this.eatcd.setCdNum(0.999999);
            }
        }
        public clikJump(): void {
            if (GuidData.player.jumpButcanClik()) {
                AotuSkillManager.getInstance().jumpTo();
            } else {
                console.log("clikJumpCd中 ")
            }
        }


    }
    export class FightSkillPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _cdRender: CdRenderComponent;
        private _jumpAndEatCompenent: JumpAndEatCompenent
        

        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.bottom = 0;


        }
        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent, $cd: CdRenderComponent): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._topRender = $top;
            this._cdRender = $cd;

            this.loadConfigCom();
        }
        private a_skill_1: UICompenent;
        private a_skill_2: UICompenent;
        private a_skill_3: UICompenent;
        private a_skill_4: UICompenent;
        private a_skill_5: UICompenent;
        private a_skill_6: UICompenent;



        
        private a_jump_but: UICompenent;


        private a_eat_icon:UICompenent
        private loadConfigCom(): void {

            this.a_skill_1 = this.addEvntBut("a_skill_1", this._bottomRender)
            this.a_skill_2 = this.addEvntBut("a_skill_2", this._bottomRender)
            this.a_skill_3 = this.addEvntBut("a_skill_3", this._bottomRender)
            this.a_skill_4 = this.addEvntBut("a_skill_4", this._bottomRender)
            this.a_skill_5 = this.addEvntBut("a_skill_5", this._bottomRender)
            this.a_skill_6 = this.addEvntBut("a_skill_6", this._bottomRender)



            this.addSkillUiToList(this.a_skill_2);
            this.addSkillUiToList(this.a_skill_3);
            this.addSkillUiToList(this.a_skill_4);
            this.addSkillUiToList(this.a_skill_5);


            this.a_jump_but = this.addChild(this._bottomRender.getComponent("a_jump_but"));
            this.a_jump_but.addEventListener(InteractiveEvent.Up, this.butClikSample, this);

            this.a_eat_icon = this.addChild(this._bottomRender.getComponent("a_eat_icon"));
            this.a_eat_icon.addEventListener(InteractiveEvent.Up, this.butClikSample, this);


            this._jumpAndEatCompenent = new JumpAndEatCompenent()
            this._jumpAndEatCompenent.jumpUi = this.a_jump_but;
            this._jumpAndEatCompenent.jumpcd = <CdUICompenent>this._cdRender.getComponent("a_jump_cd")

            this._jumpAndEatCompenent.eatUi = this.a_eat_icon;
            this._jumpAndEatCompenent.eatcd = <CdUICompenent>this._cdRender.getComponent("a_eat_cd")


            this._jumpAndEatCompenent.jumpcd.x = this._jumpAndEatCompenent.jumpUi.x;
            this._jumpAndEatCompenent.jumpcd.y = this._jumpAndEatCompenent.jumpUi.y;
            this._jumpAndEatCompenent.jumpcd.clockwise = false

            this._jumpAndEatCompenent.eatcd.x = this._jumpAndEatCompenent.eatUi.x;
            this._jumpAndEatCompenent.eatcd.y = this._jumpAndEatCompenent.eatUi.y;
            this._jumpAndEatCompenent.eatcd.clockwise=false

            this.addChild(this._jumpAndEatCompenent.jumpcd);
            this.addChild(this._jumpAndEatCompenent.eatcd);


  
           //
            
            this.refresh();
        }
        private butClikSample(evt: InteractiveEvent): void
        {
            if (!GameInstance.canclikFightui) {
                return
            }
            switch (evt.target) {
                case this.a_jump_but:
                    this._jumpAndEatCompenent.clikJump()
                    break;
                case this.a_eat_icon:
                    MainCharControlModel.getInstance().clikEat()
                    break;
                default:
                    break;
            }
        }

        


        public addEvntBut($name: string, $uiRender: UIRenderComponent): any {
            var $temp: UICompenent = this.addChild(<UICompenent>$uiRender.getComponent($name));
            $temp.addEventListener(InteractiveEvent.Down, this.butClik, this);
            $temp.addEventListener(InteractiveEvent.Up, this.butUpClik, this);
            return $temp;
        }
        private butUpClik(evt: InteractiveEvent): void {

        }

        //需要加上倒计时和CD技能
        private addSkillUiToList($ui: UICompenent): void {
            var $cdRender: CdRenderComponent = this._cdRender;
            var $vo: SkillUIVo = new SkillUIVo();
            var $cd: CdUICompenent = <CdUICompenent>this._cdRender.getComponent("a_cd_mask")
            var $alpha: number = 0.3;
           // $cd.colorVer = [1 * $alpha, 1 * $alpha, 1 * $alpha, $alpha];
            $cd.setCdNum(1);
            $cd.x = $ui.x + 1
            $cd.y = $ui.y + 1

            $vo.baseRect = new Rectangle($ui.x, $ui.y, $ui.width, $ui.height)

            this.addChild($cd);
            $vo.cd = $cd;
            $vo.iconUi = $ui;

            $vo.blackMask = this.addChild(this._midRender.getComponent("a_bleak_ui"))
            $vo.blackMask.x = $vo.iconUi.x
            $vo.blackMask.y = $vo.iconUi.y
            $vo.blackMask.width = $vo.iconUi.width
            $vo.blackMask.height = $vo.iconUi.height

            $vo.cdnumA = <FrameCompenent>this.addChild(this._topRender.getComponent("a_cd_num"))
            $vo.cdnumB = <FrameCompenent>this.addChild(this._topRender.getComponent("a_cd_num"))
            $vo.cdnumA.Invisible();
            $vo.cdnumB.Invisible();

            var $pos: Vector2D = new Vector2D(25, 22);
            $vo.cdnumB.y = $pos.y + $vo.iconUi.y;
            $vo.cdnumA.y = $pos.y + $vo.iconUi.y;

            this.skillList.push($vo)

        }
        public update(t: number): void {

            for (var i: number = 0; i < this.skillList.length; i++) {
                var $skillUIVo: SkillUIVo = this.skillList[i];
                if ($skillUIVo.cd && $skillUIVo.cdnumA) {
                    var $k: number = TimeUtil.getTimer() - $skillUIVo.cd.lastTime;
                    if ($k < $skillUIVo.cd.cdTotalnum) {
                        var $pos: Vector2D = new Vector2D(25, 22);

                        var $second: number = Math.ceil(($skillUIVo.cd.cdTotalnum - $k) / 1000);
                        var $A: number = $second % 10;
                        $skillUIVo.cdnumA.goToAndStop($A)

                        var $B: number = Math.floor($second / 10);
                        $skillUIVo.cdnumB.goToAndStop($B)
                        if ($B <= 0) {
                            $skillUIVo.cdnumB.Invisible()
                            $skillUIVo.cdnumA.x = $pos.x + $skillUIVo.baseRect.x;
                        } else {
                            $skillUIVo.cdnumB.x = $pos.x + $skillUIVo.baseRect.x - 8;
                            $skillUIVo.cdnumA.x = $pos.x + $skillUIVo.baseRect.x + 8;
                        }
                        $skillUIVo.blackMask.x = $skillUIVo.iconUi.x

                    } else {
                        $skillUIVo.cdnumB.Invisible()
                        $skillUIVo.cdnumA.Invisible()
                        $skillUIVo.blackMask.x = 2000
                    }

                }

            }
            this._jumpAndEatCompenent.update()
        }
        //设置当前主技能的功能
        public loadBaseSkillIconById(value: number): void {
            var $url: string = this.getPicToSkillById(value)
            this.drawPicToSkill($url);
            this.lastNeedShowUrl = $url;
        }
        private getPicToSkillById($id: number): string {
            return "ui/load/skill/" + $id + ".png";
        }
        private lastNeedShowUrl: string
        private skilImgKey: any = new Object
        private drawPicToSkill($url): void {
            if ($url != this.lastNeedShowUrl) {
                return
            }
            if (this.skilImgKey[$url]) {
                var rec: UIRectangle = this._bottomRender.uiAtlas.getRec(this.a_skill_1.skinName);
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                $ctx.drawImage(this.skilImgKey[$url], 0, 0, rec.pixelWitdh, rec.pixelHeight);
                TextureManager.getInstance().updateTexture(this._bottomRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $ctx);
            } else {
                var img: any = new Image();
                img.onload = () => {
                    this.skilImgKey[$url] = img;
                    this.drawPicToSkill($url);
                }
                img.src = Scene_data.fileRoot + $url
            }
        }
        private skillList: Array<SkillUIVo> = new Array;
        public refresh(): void {

            tb.SkillData.resetSkillData();
            var $skillList: Array<tb.SkillDataVo> = tb.SkillData.skillList;
            for (var i: number = 0; i < $skillList.length; i++) {
                var $vo: tb.SkillDataVo = $skillList[i];
                if ($vo.slot >= 2 && $vo.slot <= 5) {
                    this.drawSkillIcon($vo);
                } else if (i > 0 && isNaN($vo.slot)) {
                    this.drawFristIconPic($vo, i + 1, this.getunlocklev($vo.tb_skill_base.id));
                }
            }
            // this.showDivneSkillIcon();
        }


        private getunlocklev($skillid: number): number {
            var tabvo = tb.TB_char_skill.get_TB_char_skillById(GuidData.player.getCharType());
            for (var i = 0; i < tabvo.unlocks.length; i++) {
                var element = tabvo.unlocks[i][1];
                if (element == $skillid) {
                    return tabvo.unlocks[i][0];
                }
            }
            return -1;
        }
        private drawFristIconPic($vo: tb.SkillDataVo, $id: number, $unlocklev: number): void {
            console.log("---");
            var $tempBut: UICompenent = <UICompenent>this["a_skill_" + $id];

            IconManager.getInstance().getIcon(getSkillIconUrl(String($vo.tb_skill_base.icon)),
                ($img: any) => {
                    var $rec: UIRectangle = this._topRender.uiAtlas.getRec($tempBut.skinName);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg($ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                    $ctx.drawImage($img, 4, 4, 62, 62);
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, 71, 71))

                    var str: string = $unlocklev > 9 ? "" : " ";
                    str += $unlocklev + " 级\n开 启";
                    LabelTextFont.writeSingleLabelToCtx($ctx, str, 16, 16, 15, TextAlign.LEFT, ColorType.colorffe9b4, ColorType.colord27262e)

                    this._topRender.uiAtlas.updateCtx($ctx, $rec.pixelX, $rec.pixelY);
                });
        }

        //绘制神兵图标
        private drawPicToFristDiveneIcon(): void {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_divine_base)  //找到第一个神兵
            for (var $key in $obj.data) {
                var sele = $obj.data[$key]
                break
            }
            var $vo: tb.TB_divine_baseVO = tb.TB_divine_baseVO.get_TB_divine_base(sele.id)
            LoadManager.getInstance().load(Scene_data.fileRoot + getSkillIconUrl(String($vo.skillvo.tb_skill_base.icon)), LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $skillrec: UIRectangle = this._topRender.uiAtlas.getRec(this.a_skill_5.skinName);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                    $ctx.drawImage($img, 2, 2, 65, 65);
                    UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, 69, 69));
                    //推送至显卡
                    this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
                });
        }
        private drawSkillIcon($vo: tb.SkillDataVo): void {
            var $tempBut: UICompenent = <UICompenent>this["a_skill_" + $vo.slot];
            this.drawPicToSkillBut($vo, $tempBut);
        }
        //给技能加上图标， 神兵和主动技能
        private drawPicToSkillBut($vo: tb.SkillDataVo, $ui: UICompenent): void {
            $ui.data = $vo

            LoadManager.getInstance().load(Scene_data.fileRoot + getSkillIconUrl(String($vo.tb_skill_base.icon)), LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $skillrec: UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);

                    UiDraw.cxtDrawImg($ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 71, 71), UIData.publicUi);
                    $ctx.drawImage($img, 4, 4, 62, 62);


                    //推送至显卡
                    this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
                });
            this.setSkillCdTime($ui);
        }

        public refreshCdBySkillId($skillId: number): void {

            if ($skillId == 1) {  //特殊标记给刷新跳跃的CD
                GuidData.player.nextCanJumpTM = TimeUtil.getTimer() + tb.SkillData.jumpSkillVo.singleCD;

            } else {
                for (var i: number = 0; i < this.skillList.length; i++) {
                    var $skillUIVo: SkillUIVo = this.skillList[i]
                    var $skillVo: tb.SkillDataVo = $skillUIVo.iconUi.data
                    if ($skillVo && $skillVo.id == $skillId) {
                        tb.SkillData.setCdMeshData($skillVo.id, $skillVo.singleCD);
                        $skillUIVo.cd.lastTime = TimeUtil.getTimer();
                    }
                }
            }
        }
        private setSkillCdTime($ui: UICompenent): void {
            for (var i: number = 0; i < this.skillList.length; i++) {
                var $skillUIVo: SkillUIVo = this.skillList[i]
                if ($skillUIVo.iconUi == $ui) {
                    var $skillBaseDataVo: tb.SkillDataVo = $ui.data
                    var $saveTime: number = tb.SkillData.getCdMeshBySkillId($skillBaseDataVo.id)
                    $skillUIVo.cd.cdTotalnum = $skillBaseDataVo.singleCD;
                    $skillUIVo.cd.lastTime = $saveTime - $skillBaseDataVo.singleCD;
                }
            }
        }

        public butClik(evt: InteractiveEvent): void {

            if (!GameInstance.canclikFightui) {
                return 
            }
            if (GuidData.map.is1V1()) {
                msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
                return;
            }
            switch (evt.target) {
                case this.a_skill_2:
                case this.a_skill_3:
                case this.a_skill_4:
                case this.a_skill_5:
                    // console.log("--技能名--",evt.target.data.tb_skill_base.id);
                    this.selectSkillButUi(evt.target);
                    break
                case this.a_skill_1:
                    this.selectThreeBut();
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    break
                case this.a_jump_but:
                    AotuSkillManager.getInstance().jumpTo();
                    UiTweenScale.getInstance().changeButSize(evt.target)
                    break
                
                default:
                    break;
            }
        }
        
        private nextThreeButTime: number = 0
        private selectThreeBut(): void {

            if (this.nextThreeButTime < TimeUtil.getTimer()) {
                var $vo: tb.SkillDataVo = tb.SkillData.threeSkillList[GameInstance.threeBattarId++ % 3];
                this.playSkillToAttack($vo);
                this.nextThreeButTime = TimeUtil.getTimer() + 700;
            }

        }
        private testCdFinishBySkillId($ui: UICompenent): boolean {
            for (var i: number = 0; i < this.skillList.length; i++) {
                var $skillUIVo: SkillUIVo = this.skillList[i]
                if ($skillUIVo.iconUi == $ui) {
                    return $skillUIVo.cd.isFinish;
                }
            }
            return false
        }
        public selectSkillButUi($ui: UICompenent): void {
            if (GameInstance.mainChar.isDeath) {
                return;
            }
            if (!this.testCdFinishBySkillId($ui)) {
                return;
            }
            if ($ui.data) {
                this.playSkillToAttack(<tb.SkillDataVo>$ui.data);
            }
        }
        private playSkillToAttack($vo: tb.SkillDataVo): void {

            // if (GuidData.map.is1V1()) {
            //     msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "斗剑台不能操作", 99);
            //     return;
            // }

            GameInstance.attackTarget = RelationManager.getInstance().findNearAttackBySkill();

            var $canPlay: boolean = FightSkillModel.getInstance().canPlaySkillToAttackTarger($vo.tb_skill_uplevel.distance * 10)
            if ($canPlay) {
                MainCharControlModel.getInstance().sendStop();
                MainCharControlModel.getInstance().downMount();
                AotuSkillManager.getInstance().aotuBattle = false;

                FightSkillModel.getInstance().playSkillToAttack($vo, true);

            } else {
                if (GameInstance.mainChar._speedDirect) { //在使用摇杆时，如果放技能找最近的

                    GameInstance.attackTarget = null;
                } else {
                    if (GameInstance.attackTarget) {
                        FightSkillModel.getInstance().moveToAttackTarger(GameInstance.attackTarget, $vo, () => {
                            this.playSkillToAttack($vo);
                        })
                    } else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "附近没有目标", 99);
                    }
                }




            }

        }



    }
}