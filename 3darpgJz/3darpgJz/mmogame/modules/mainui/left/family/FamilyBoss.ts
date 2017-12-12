module leftui {

    export class FamilyBoss extends FamilyLeftUiVo {

        private b_boss_label: UICompenent;
        private b_boss_time: UICompenent;
        protected makeUi(): void {
            this.rect = new Rectangle(0, 0, 256, 70);

     
            this.uiList.push(this._topRender.getComponent("b_bg"));

            this.b_boss_label = this._topRender.getComponent("b_boss_label")
            this.uiList.push(this.b_boss_label);
            this.b_boss_time = this._topRender.getComponent("b_boss_time")
            this.uiList.push(this.b_boss_time);

            super.makeUi();

        }

        private type: number = 0
        public refresh(): void {
            if (GuidData.faction) {
                // console.log(GuidData.faction.getBosschallengeidCur())
                var $bossCur: number = GuidData.faction.getBosschallengeidCur();
                var $str1: string = ""
                var $str2: string = ""

                this.type = 0

                if ($bossCur != 0) {  //当前正在进行击杀家族boss活动
                    $str1 = "击杀" + ColorType.colorce0a00 + "家族BOSS[]获得奖励";
                    var $tb: tb.TB_faction_boss = tb.TB_faction_boss.get_TB_faction_bossById($bossCur)
                    var $kt: number = -GameInstance.getGameSecond(GuidData.faction.getBosschallengeStartTime())
                    if ($kt < $tb.wait_time) {
                        this.type = 1
                        $str2 = "BOSS出现倒计时:"+ColorType.colorce0a00  + TimeUtil.getLocalTime3($tb.wait_time - $kt);
                    } else {
                        this.type = 2
                        $str2 = "挑战剩余时间:"+ColorType.colorce0a00 + TimeUtil.getLocalTime3(($tb.time + $tb.wait_time) - $kt);
                    }
                } else {
                    $str1 = "剩余家族BOSS令牌： " + GuidData.faction.getBossTokenNum() ;

                    if (GuidData.faction.getBossTokenNum() > 0) {
                        this.type = 3
                        $str2 = ColorType.Green56da35 +"前往召唤BOSS[]"
                    } else {
                        this.type = 4
                        $str2 = "击杀"+ColorType.Green56da35+"家族小怪[]收获令牌"
                    }
                }

                if (this.type == 3 || this.type == 4) {
                    if (this.getShenyuLinPai() == 0 && GuidData.faction.getBossTokenNum() == 0) {  //已无剩余
                        //  $str1 = "[ff0000]今日令牌已用完";
                        //    $str1 = "[000000]家族BOSS令牌[00ff00]" + GuidData.faction.getBossTokenNum() + "/" + GuidData.faction.getBossTokenPointscount();
                        $str2 = "[ff0000]今日令牌已用完";
                    }
                }

                if (this.skipNum++ % 1000 == 0) {
                    console.log("身上现在令牌", GuidData.faction.getBossTokenNum());
                    console.log("还可以获得令牌", this.getShenyuLinPai());
                    console.log("可以获得的总数", GuidData.faction.getBossTokenPointscount());
                    console.log("----------------------")
                }
                if (this.b_boss_label.data != $str1) {
                    this.b_boss_label.data = $str1
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_boss_label.skinName, ColorType.Yellowffe9b4 + $str1, 14 * 1.5, TextAlign.LEFT, ColorType.Yellowffe9b4, "#27262e", 4);
                }
                if (this.b_boss_time.data != $str2) {
                    this.b_boss_time.data = $str2
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_boss_time.skinName, ColorType.Yellowffe9b4 + $str2, 14 * 1.5, TextAlign.LEFT, ColorType.Yellowffe9b4, "#27262e", 4);

                }
            }

        }
        private skipNum:number=0
        protected mouseClik(): void {
            console.log(this.type)
            switch (this.type) {
                case 4:
                    var item: Array<Vector2D> = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), new Vector2D(132, 93));
                    AotuSkillManager.getInstance().aotuWalk = true;
                    MainCharControlModel.getInstance().setWalkPathFun(item, () => { this.walkPathComplete() });
                    break
                case 3:
                    ModuleEventManager.dispatchEvent(new faction.FactionBossEvent(faction.FactionBossEvent.SHOW_BOSS_EVENT));
                    break
                case 2:
                case 1:
                    var item: Array<Vector2D> = AstarUtil.findPath2D(GameInstance.mainChar.getAstarPos(), new Vector2D(132, 93));
                    MainCharControlModel.getInstance().setWalkPathFun(item);
                    break;
                default:

                    break;
            }
        }
        private walkPathComplete(): void {
            AotuSkillManager.getInstance().aotuWalk = false;
            AotuSkillManager.getInstance().aotuBattle = true;
        }
    }

}