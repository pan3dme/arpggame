module kuafu {
    export class KuaFu3v3PkTopPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public static testNum: number = 0
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0;
            this.center = 0;

        }

        public setRender($bg: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent): void {
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top;
            this.loadConfigCom();
        }
        private e_top_bg: UICompenent
        private e_start_time_bg: UICompenent;
        private e_start_time_txt: UICompenent;
        private e_die_label: UICompenent;
        private d_top_left_txt: UICompenent;
        private d_top_right_txt: UICompenent;
        private d_time_txt: UICompenent;

        private loadConfigCom(): void {

            this.e_top_bg = this.addEvntBut("e_top_bg", this._bottomRender)
            this.d_top_left_txt = this.addChild(<UICompenent>this._midRender.getComponent("d_top_left_txt"));
            this.d_top_right_txt = this.addChild(<UICompenent>this._midRender.getComponent("d_top_right_txt"));
            this.d_time_txt = this.addChild(<UICompenent>this._midRender.getComponent("d_time_txt"));

            this.e_start_time_bg =this._midRender.getComponent("e_start_time_bg");
            this.e_start_time_txt = this._midRender.getComponent("e_start_time_txt");
            this.e_die_label = this.addChild(<UICompenent>this._midRender.getComponent("e_die_label"));

        }
        public reeee(): void {
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_top_left_txt.skinName, String(KuaFu3v3Model.getInstance().killTittleTxt.x), ArtFont.num23, TextAlign.CENTER);
            ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_top_right_txt.skinName, String(KuaFu3v3Model.getInstance().killTittleTxt.y), ArtFont.num23, TextAlign.CENTER);

        }
        private startTime: number;
        private endTime: number;
        private lastTimeTxt: number
        public initTime(): void {
            var stim:number = GameInstance.getGameSecond(GuidData.map.getMapIntFieldStartTm()) * 1000;
            PopTimeOutUtil.show(PopTimeOutUtil.PLAYGO, stim);
            this.startTime = stim+TimeUtil.getTimer();

      

            this.endTime = GameInstance.getGameSecond(GuidData.map.getMapIntFieldQuestEndTm()) * 1000;
            if (this.endTime < 0) {
                this.endTime = 60 * 10000;
            }
            this.endTime += TimeUtil.getTimer();

           
        }
        public update(t: number): void {
            if (KuaFu3v3Model.getInstance().end) {
                return;
            }

            if (TimeUtil.getTimer() < this.startTime) {
                ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_time_txt.skinName, "00:00", ArtFont.num12, TextAlign.CENTER,4)
            } else {
                var $time: number = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000);
                if ($time < 0) {

                } else {
                    if (this.lastTimeTxt != $time) {
                        this.lastTimeTxt = $time
                        var $str: string = ""
                        var $m: number = Math.floor($time / 60)
                        var $s: number = Math.floor($time % 60)
                        $str += $m > 9 ? String($m) : "0" + String($m);
                        $str += ":";
                        $str += $s > 9 ? String($s) : "0" + String($s);
                        ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_time_txt.skinName, $str, ArtFont.num12, TextAlign.CENTER, 4)
                    }

                }
            }
            this.setUiListVisibleByItem([this.e_die_label], KuaFu3v3Model.getInstance().isSelfDie)

        }
    }
} 