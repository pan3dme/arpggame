module offlinereward {

    export class OfflineRewardPanel extends WindowCentenMin {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        private uiAtlasComplet: boolean = false
        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.center = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/adventure/offlinereward/offlinereward.xml", "ui/uidata/adventure/offlinereward/offlinereward.png", () => { this.loadConfigCom() });
        }
        private a_label5: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;



            this.a_label5 = this.addChild(this._topRender.getComponent("a_label5"));
            this.addChild(this._topRender.getComponent("a_label1"));

            this.addChild(this._topRender.getComponent("a_label0"));
            this.addChild(this._topRender.getComponent("a_label6"));
            this.addChild(this._topRender.getComponent("a_label4"));
            this.addChild(this._topRender.getComponent("a_label7"));

            //this.addChild(this._topRender.getComponent("a_label2"));
            //this.addChild(this._topRender.getComponent("a_label3"));

            this.addChild(this._topRender.getComponent("a_line1"));
            this.addChild(this._topRender.getComponent("a_line0"));

            this.addChild(this._bottomRender.getComponent("a_cell_bg"));
            this.addChild(this._bottomRender.getComponent("a_cell_bg1"));


            this.addChild(this._midRender.getComponent("a_time_bg"));

            this.a_use_time_txt = this.addChild(this._topRender.getComponent("a_use_time_txt"));


            this.a_submit = this.addEvntButUp("a_submit", this._topRender)


            this.addArray = new Array
            this.rewardUiArr = new Array
            this.iconArray = new Array
            for (var i = 0; i < 3; i++) {
                this.addChild(this._bottomRender.getComponent("a_label2_" + i));
                var vip = this.addChild(this._midRender.getComponent("a_vip" + i));
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, vip.skinName, "VIP" + GuidData.player.getVipLevel(), 12, TextAlign.CENTER, ColorType.Whitefff4d6);


                this.addArray.push(this.addChild(this._topRender.getComponent("b_reward" + i)));
                this.rewardUiArr.push(this.addChild(this._topRender.getComponent("a_reward" + i)));
                this.iconArray.push(this.addChild(this._topRender.getComponent("a_cion" + i)));
            }

            this.uiAtlasComplet = true
            this.applyLoadComplete();

        }

        private addArray: Array<UICompenent>
        private iconArray: Array<UICompenent>
        private a_use_time_txt: UICompenent
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_submit:
                    break

                case this.c_close:
                    break
            }
            this.hide();
        }
        public hide(): void {
            ModuleEventManager.dispatchEvent(new OfflineRewardEvent(OfflineRewardEvent.HIDE_OFFLINE_REWARD_PANEL));
        }

        private a_submit: UICompenent;

        public refresh($data: s2c_offline_reward_result): void {
            console.log("=============================================$data", $data);
            var rewardAry: Array<Array<number>> = new Array;
            for (var i: number = 0; i < $data.list.length; i++) {
                var $vo: item_reward_info = $data.list[i];
                var tabvo = tb.TB_item_template.get_TB_item_template($vo.item_id);
                if (tabvo.type == 1) {
                    var index = this.getIndex(rewardAry);
                    if (index == -1) {
                        rewardAry.push([-2, 1]);
                    } else {
                        rewardAry[index][1] += 1;
                    }
                } else {
                    rewardAry.push([$vo.item_id, $vo.num]);
                }
            }


            var viptab = tb.TB_vip_base.get_TB_vip_baseById(GuidData.player.getVipLevel());
            //预先绘制获得的武器数目
            var equbase: number = Math.floor(Number($data.reserve) / ((100 + viptab.riskReward) / 100))
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.rewardUiArr[2].skinName, String(equbase), 16, TextAlign.LEFT, ColorType.color843b11);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.addArray[2].skinName, String(Number($data.reserve) - equbase), 16, TextAlign.CENTER, ColorType.color843b11);


            // this.setUiListVisibleByItem(this.rewardUiArr, false);
            // this.setUiListVisibleByItem(this.iconArray, false);
            for (var j = 0; j < rewardAry.length; j++) {
                if (rewardAry[j][0] == 3) {
                    // this.setUiListVisibleByItem([this.rewardUiArr[0], this.iconArray[0]], true);
                    var base: number = Math.floor(rewardAry[j][1] / ((100 + viptab.riskReward) / 100))
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.rewardUiArr[0].skinName, String(base), 16, TextAlign.LEFT, ColorType.color843b11);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.addArray[0].skinName, String(rewardAry[j][1] - base), 16, TextAlign.CENTER, ColorType.color843b11);
                }
                if (rewardAry[j][0] == 104) {
                    // this.setUiListVisibleByItem([this.rewardUiArr[1], this.iconArray[1]], true);
                    var base: number = Math.floor(rewardAry[j][1] / ((100 + viptab.riskReward) / 100))
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.rewardUiArr[1].skinName, String(base), 16, TextAlign.LEFT, ColorType.color843b11);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.addArray[1].skinName, String(rewardAry[j][1] - base), 16, TextAlign.CENTER, ColorType.color843b11);
                }
                if (rewardAry[j][0] == -2) {
                    // this.setUiListVisibleByItem([this.rewardUiArr[2], this.iconArray[2]], true);
                    var total: number = rewardAry[j][1] + Number($data.reserve);
                    var base: number = Math.floor(total / ((100 + viptab.riskReward) / 100))
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.rewardUiArr[2].skinName, String(base), 16, TextAlign.LEFT, ColorType.color843b11);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.addArray[2].skinName, String(total - base), 16, TextAlign.CENTER, ColorType.color843b11);
                }
            }
            console.log("-------离线时间-----", $data.reserve2 + "秒");
            var hour: number = Math.floor($data.reserve2 / 3600);
            var min: number = Math.ceil(($data.reserve2 / 60) - (hour * 60));

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_use_time_txt.skinName, hour + "小时" + min + "分", 16, TextAlign.CENTER, ColorType.color843b11);

            if ($data.reserve > 0) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_label5.skinName, ColorType.Brown7a2f21 + "背包已满,自动出售 " + ColorType.colorce0a00 + $data.reserve + ColorType.Brown7a2f21 + " 件装备", 16, TextAlign.CENTER, ColorType.colorce0a00);
            } else {
                UiDraw.clearUI(this.a_label5);
            }

        }

        private getIndex($ary: Array<Array<number>>): number {
            for (var i = 0; i < $ary.length; i++) {
                if ($ary[i][0] == -2) {
                    return i;
                }
            }
            return -1;
        }

        private rewardUiArr: Array<UICompenent>;



    }
}