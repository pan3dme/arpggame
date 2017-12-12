module boss {
    export class BossModel {
        private static nextCatchTime: number = 0;
        private static _boss: SceneChar;
        private static _bx: SceneCollection;
        public static frameUpData(): void {
            if (!GuidData.map.isBaseMap) {
                return;
            }

            if (this.nextCatchTime < TimeUtil.getTimer()) {
                var $displayList: Array<Display3dMovie> = GameInstance.roleList;

                var needRemoveBoss: boolean = true;
                var needRemoveBx: boolean = true;

                for (var i: number = 0; $displayList && i < $displayList.length; i++) {
                    var $tempChar: SceneChar = <SceneChar>$displayList[i];
                    if ($tempChar.isBoss) {

                        if (Math.abs($tempChar.x - GameInstance.mainChar.x) < 100 && Math.abs($tempChar.z - GameInstance.mainChar.z) < 100) {
                            if ($tempChar != this._boss) {
                                var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_BOSSHP_EVENT);
                                evt.data = $tempChar.unit;
                                ModuleEventManager.dispatchEvent(evt);
                                $tempChar.refreshLifeNum();
                                this._boss = $tempChar;
                                this.showhidePandaPanel(false);

                                //家族boss排行榜
                                if (GuidData.map.isFamilyScene()) {
                                    ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.SHOW_OFTENRANK_PANEL));
                                }

                            }
                            needRemoveBoss = false;
                        }

                    } else if ($tempChar instanceof SceneCollection) {
                        var sc: SceneCollection = <SceneCollection>($tempChar);
                        if (sc.isBx()) {
                            if (Math.abs($tempChar.x - GameInstance.mainChar.x) < 100 && Math.abs($tempChar.z - GameInstance.mainChar.z) < 100) {
                                if (sc != this._bx) {
                                    var bossInfo: any = sc.getBossInfo(true);
                                    var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_CHEST_EVENT);
                                    evt.data = bossInfo;
                                    ModuleEventManager.dispatchEvent(evt);
                                    this._bx = sc;
                                    this.showhidePandaPanel(false);
                                }

                                needRemoveBx = false;
                            }

                            if (Math.abs($tempChar.x - GameInstance.mainChar.x) < 50 && Math.abs($tempChar.z - GameInstance.mainChar.z) < 50) {
                                sc.setOprateState(true);
                            } else {
                                sc.setOprateState(false);
                            }

                        }
                    }

                }

                if ((this._boss && needRemoveBoss)) {//离开boxx
                    console.log("---隐藏222--",GuidData.map.isFamilyScene());
                    if (GuidData.map.isFamilyScene()) {
                        ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.HIDE_OFTENRANK_PANEL));
                    }

                    ModuleEventManager.dispatchEvent(new boss.BossEvent(boss.BossEvent.HIDE_BOSSHP_EVENT));
                    this._boss = null;
                    this.showhidePandaPanel(true);
                }

                if ((this._bx && needRemoveBx)) {//离开宝箱
                    var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.HIDE_CHEST_EVENT);
                    ModuleEventManager.dispatchEvent(evt);
                    this._bx = null;
                    this.showhidePandaPanel(true);
                }

                this.nextCatchTime = TimeUtil.getTimer() + 1000;

            }
        }

        public static showhidePandaPanel(tf: boolean): void {

            var $MainUiEvent: topui.TopUiEvent = new topui.TopUiEvent(topui.TopUiEvent.SHOW_TOP_PANDA_LIST)
            $MainUiEvent.data = tf
            ModuleEventManager.dispatchEvent($MainUiEvent)
        }

    }
}