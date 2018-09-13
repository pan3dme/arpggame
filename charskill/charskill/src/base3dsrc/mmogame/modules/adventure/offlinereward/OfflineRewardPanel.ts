module offlinereward {

    export class OfflineRewardPanel extends PopWindowMin {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;

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

        private a_equ: UICompenent
        private a_exp: UICompenent
        private a_lev: UICompenent
        private a_time: UICompenent
        private a_info: UICompenent
        private a_btnname: UICompenent
        private b_close: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.a_submit = this.addEvntButUp("a_submit", this._midRender)
            this.b_close = this.addEvntButUp("b_close", this._topRender)

            this.addChild(this._topRender.getComponent("a_title"));
            this.a_equ = this.addChild(this._topRender.getComponent("a_equ"));
            this.a_exp = this.addChild(this._topRender.getComponent("a_exp"));
            this.a_lev = this.addChild(this._topRender.getComponent("a_lev"));
            this.a_time = this.addChild(this._topRender.getComponent("a_time"));

            this.a_info = this.addChild(this._topRender.getComponent("a_info"));
            this.a_btnname = this.addChild(this._topRender.getComponent("a_btnname"));

            this.applyLoadComplete();

        }

        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_submit:
                    if (this._type == 1) {
                        ModulePageManager.openPanel(SharedDef.MODULE_MALL, [SharedDef.MODULE_MALL_GOLD, 6]);
                    }
                    this.hide();
                    break
                case this.b_close:
                    this.hide();
                    break

            }
        }
        public hide(): void {
            ModuleEventManager.dispatchEvent(new OfflineRewardEvent(OfflineRewardEvent.HIDE_OFFLINE_REWARD_PANEL));
        }

        private a_submit: UICompenent;

        private _type: number;
        public refresh($data: s2c_offline_reward_result): void {
            //console.log("=============================================$data", $data);

            var sell = $data.reserve & 65535
            var getnum = $data.reserve >> 16

            var minutes: number = $data.reserve2//已经挂了多少分钟
            var exp = $data.reserve3
            var level = $data.reserve4
            var topLevel = $data.reserve5
            var endtime = GuidData.player.getHangUpTime()
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_lev.skinName, "角色等级: " + level + "~" + topLevel, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_exp.skinName, ColorType.Brown7a2f21 + "获得人物经验: " + ColorType.Green2ca937 + exp, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_equ.skinName, "获得装备: " + getnum + "件(已卖出" + sell + "件)", 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            var infostr: string;
            var btnstr: string;
            var color:string;
            if (endtime < 60) {
                this._type = 1;
                infostr = "(当前离线时间不足1小时)"
                btnstr = "前往获取"
                color = ColorType.Redd92200;
            } else {
                this._type = 0;
                btnstr = "我知道了"
                infostr = "(角色战力越高离线收益越大)"
                color = ColorType.Brown7a2f21;
            }

            var str: string = ColorType.Brown7a2f21 + "离线挂机时间: " + float2int(minutes / 60) + "时" + (minutes % 60) + "分(剩余: " + color + float2int(endtime / 60) + "时" + (endtime % 60) + "分"+ColorType.Brown7a2f21+")"
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_time.skinName, str, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_info.skinName, infostr, 20, TextAlign.CENTER, ColorType.Redd92200);
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_btnname.skinName, btnstr, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
        }
    }
}