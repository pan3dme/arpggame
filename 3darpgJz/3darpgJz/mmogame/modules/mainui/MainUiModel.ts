module mainUi {

    export class MainUiModel {

        public static pandaState: boolean = true
        public static pandaCanAotu: boolean = true  //是否为人为关闭
        public static skillTabIndex: number = 0;//0技能，1为系统
        public static systemTab: number = 1;//true第一组，false第二组
        /*
        *获得提示信息 好友，家族，聊天，邮件;
        */
        public static mainUiLoadFinish(): void {
            // console.log("主菜单加载完毕");
            // //如果是女王需要检查是否有人赠送礼物
            // if(GuidData.faction){
            //     GuidData.faction.queenGiftUncheck();
            // }
            // //检测是否有女王回复礼物
            // ModuleEventManager.dispatchEvent(new faction.GiftreceiveEvent(faction.GiftreceiveEvent.RECEIVE_THANK_GIFT_EVENT));
        }

        public static getMsgTipData(): Array<number> {
            var $arr: Array<number> = new Array;
            if (GuidData.social) {
                if (GuidData.social.getApplyList().length) {
                    $arr.push(1);
                }
            }
            if (GuidData.faction) {
                if (GuidData.faction.getApplyList().length && GuidData.faction.playerIdentity < 4) {
                    $arr.push(2);
                }
                // if (GuidData.faction.queenGiftUncheckNum > 0) {
                //     $arr.push(3);
                // }
            } else {
                if (faction.FactionModel.getInstance().getInvitationList().length) {
                    $arr.push(2);
                }

            }

            if (Chat.ChatModel.getInstance().getHaveNewChatInfo()) {
                $arr.push(4);
            }
            if (email.EmailModel.getInstance().getHaveNewEmailInfo()) {
                $arr.push(5);
            }

            //  FactionModel.getInstance().getInvitationList()

            return $arr;
        }

        //采集按钮
        public static collectionMouseDown(): void {
            console.log("collectionMouseDown");
            if (GameData.collectionType == 1) { //对话
                this.talkNearNpc();
            } else {
                this.getNextCollention();
            }
        }

        private static getNextCollention(): void {
            var $nearChar: SceneChar;
            var $dis: number;
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                var $sceneChar: SceneChar = GameInstance.roleList[i];
                if ($sceneChar.unit.getTypeID() == SharedDef.TYPEID_GAMEOBJECT && !$sceneChar.isDeath) {

                    if (!$nearChar || $dis > GameInstance.mainChar.math_distance($sceneChar)) {
                        $nearChar = $sceneChar;
                        $dis = GameInstance.mainChar.math_distance($sceneChar);
                    }
                }
            }
            if ($nearChar) {
                console.log($nearChar.unit.getName(), $nearChar.isDeath)
                TimeUtil.addTimeOut(50, () => {
                    quest.QuestModel.getInstance().use_gameobject($nearChar)
                });
            }

        }

        private static talkNearNpc(): void {
            var $nearChar: SceneChar;
            var $dis: number;
            for (var i: number = 0; i < GameInstance.roleList.length; i++) {
                var $sceneChar: SceneChar = GameInstance.roleList[i];
                if ($sceneChar.unit.isNpc()) {
                    if (!$nearChar || $dis > $sceneChar.math_distance(GameInstance.mainChar)) {
                        $nearChar = $sceneChar;
                        $dis = GameInstance.mainChar.math_distance($sceneChar);
                    }
                }
            }
            if ($nearChar) {
                var $k: dialog.DialogueEvent = new dialog.DialogueEvent(dialog.DialogueEvent.SHOW_DIALOGUE_PANEL);
                $k.entryId = $nearChar.unit.getEntry()
                ModuleEventManager.dispatchEvent($k);//
            }
        }
        public static getIllusionSkillItem(): Array<tb.SkillDataVo> {
            // var $skillList: Array<tb.SkillBaseVo> = tb.SkillData.skillList;
            var $illusionList: Array<tb.SkillDataVo> = new Array;
            var $illusionId: number = GameInstance.mainChar.unit.getIllusionId();
            var $tb: tb.TB_item_illusion = tb.TB_item_illusion.get_TB_item_illusion($illusionId);
            for (var j: number = 0; j < $tb.skills.length; j++) {
                var $vo: tb.SkillDataVo = tb.SkillDataVo.getSkillBaseDataById($tb.skills[j][0]);
                $vo.slot = (j + 1);
                $vo.level = 1;

            }
            return $illusionList;
        }

        public static getSysList(): Array<tb.TB_system_icon> {
            var $sysArr: Array<SystemOpenData> = GuidData.player.systemOpenItem;
            var $showData: Array<tb.TB_system_icon> = new Array()
            for (var i: number = 0; i < $sysArr.length; i++) {
                var $tb: tb.TB_system_icon = tb.TB_system_icon.getTempVo($sysArr[i].systemId);
                if ($sysArr[i].needShowIcon) {
                    if ($tb.bindactive.length > 0) {
                        if(this.getActiveIsOpen($tb.bindactive)){
                            $showData.push($tb);
                        }
                    } else {
                        $showData.push($tb);
                    }

                }
            }
            $showData.sort(
                function (a: tb.TB_system_icon, b: tb.TB_system_icon): number {
                    return a.index - b.index;
                }
            )
            return $showData

        }

        public static getActiveIsOpen($ary: Array<number>): boolean {
            var activeAry: Array<number> = GuidData.globelValue.getActiveList();
            for (var i: number = 0; i < $ary.length; i++) {
                if(activeAry.indexOf($ary[i]) != -1){
                    return true;
                }
            }
            return false;
        }
        public static getPandaPostionBySysId($sysId: number): Vector2D {

            var $showData: Array<tb.TB_system_icon> = this.getSysList()

            var $postion1: number = 0;
            var $postion2: number = 0;
            var $postion4: number = 0;
            var $postion5: number = 0;

            

            var $pos: Vector2D = new Vector2D();
            for (var j: number = 0; j < $showData.length; j++) {
                var $tb: tb.TB_system_icon = $showData[j]
                if ($tb.position == 1) {
                    $postion1++;
                }
                if ($tb.position == 2) {
                    $postion2++;
                }
                if ($tb.position == 4) {
                    $postion4++;
                }
                if ($tb.position == 5) {
                    $postion5++;
                }

                if ($tb.id == $sysId) {
                    if ($tb.position == 1) {
                        $pos = new Vector2D(730 - $postion1 * 65, 10);
                    }
                    if ($tb.position == 2) {
                        $pos = new Vector2D(730 - $postion2 * 65, 10 + 65);
                    }
                    if ($tb.position == 4) {

                        $pos = new Vector2D(890, 464 - $postion4 * 65);
                    }
                    if ($tb.position == 5) {
                        $pos = new Vector2D(950 - $postion5 * 65, 464);
                    }

                }
                if ($tb.position == 9) {
                    $pos = new Vector2D(731, 160);
                }
            }
            return $pos
        }
    }
}