module Hangup {

    export class HangupSettingUiPanel extends WindowMinUi {
        private _baseRender: UIRenderComponent;
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._baseRender.dispose();
            this._baseRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
            super.dispose();
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.right = 0;
            this.middle = 0;
            this.setBlackBg();
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)


            //SkillUiModel.getInstance().getSeverSkillData();


            this._baseRender.uiAtlas = new UIAtlas();


        }

        public applyLoad(): void {
            this._baseRender.uiAtlas.setInfo("ui/uidata/hangup/hangupsetting.xml", "ui/uidata/hangup/hangupsetting.png", () => { this.loadConfigCom() }, "ui/uidata/hangup/hanguppc.png");
        }

        private a_selectbtn0: FrameCompenent
        private a_selectbtn1: FrameCompenent
        private a_selectbtn2: FrameCompenent
        private a_selectbtn3: FrameCompenent
        private a_selectbtn4: FrameCompenent
        private a_useid: UICompenent
        private a_usename: UICompenent
        private a_servername: UICompenent
        private a_bar_red: UICompenent;
        private a_bar_red_1: UICompenent;
        private a_bar: UICompenent;
        private a_bar_1: UICompenent;
        private a_bar_bg_line: UICompenent;
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._baseRender.uiAtlas;
            this._topRender.uiAtlas = this._baseRender.uiAtlas;

            this.addUIList(["a_bg0", "a_info4", "a_info6_1", "a_info6", "a_info5", "a_info2", "a_info0", "a_info1", "a_bar_bg", "a_bar_bg_1"], this._bottomRender);

            this.addUIList(["a_bg1", "a_bg2", "a_title"], this._baseRender);

            this.addChild(this._topRender.getComponent("a_info3"));

            this.a_selectbtn0 = <FrameCompenent>this.addEvntButUp("a_selectbtn0", this._baseRender);
            this.a_selectbtn1 = <FrameCompenent>this.addEvntButUp("a_selectbtn1", this._baseRender);
            this.a_selectbtn2 = <FrameCompenent>this.addEvntButUp("a_selectbtn2", this._baseRender);
            this.a_selectbtn3 = <FrameCompenent>this.addEvntButUp("a_selectbtn3", this._baseRender);
            this.a_selectbtn4 = <FrameCompenent>this.addEvntButUp("a_selectbtn4", this._baseRender);

            this.a_servername = this.addChild(this._topRender.getComponent("a_servername"));
            this.a_usename = this.addChild(this._topRender.getComponent("a_usename"));
            this.a_useid = this.addChild(this._topRender.getComponent("a_useid"));

            this.a_bar_red = this.addChild(this._baseRender.getComponent("a_bar_red"));
            this.a_bar_red_1 = this.addChild(this._baseRender.getComponent("a_bar_red_1"));
            this.a_bar_bg_line = this.addChild(this._bottomRender.getComponent("a_bar_bg_line"));
            this.a_bar = this.addEvntBut("a_bar", this._topRender);
            this.a_bar_1 = this.addEvntBut("a_bar_1", this._topRender);

            this.applyLoadComplete();
        }

        public resize(): void {
            super.resize();
        }

        public show(): void {
            UIManager.getInstance().addUIContainer(this);

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_servername.skinName, "服务器名： " + GameInstance.sid, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_usename.skinName, "角色名： " + getBaseName(GuidData.player.getName()), 16, TextAlign.LEFT, ColorType.Brown7a2f21);




            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_useid.skinName, "角色ID： " + this.getuseridstr(), 16, TextAlign.LEFT, ColorType.Brown7a2f21);

            this.setTargetState(this.a_selectbtn0, GameData.configData.block_other_plr);
            this.setTargetState(this.a_selectbtn1, GameData.configData.block_effect_ski);
            this.setTargetState(this.a_selectbtn2, GameData.configData.block_plr_flyword);

            this.refreshDrawUseIcon(GameData.configData.block_volume_set);
            this.refreshDrawUseIconCopy(GameData.configData.block_sound_set);
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        private getuseridstr(): string {
            var guidstr: string = GuidData.player.getGuid();
            guidstr = guidstr.split("p")[1];
            var ary0 = guidstr.split(".");
            var ary1 = ary0[1].split("_");
            // 002 001007 31
            // ary1[0] + ary1[1] + ary0[0]
            var str: string = "";
            if (ary1[0].length < 3) {
                for (var i = 0; i < (3 - ary1[0].length); i++) {
                    str += "0";
                }
            }
            str += ary1[0];
            if (ary1[1].length < 6) {
                for (var i = 0; i < (6 - ary1[1].length); i++) {
                    str += "0";
                }
            }
            return str + ary1[1] + ary0[0];
        }

        private _lastMouseX: number = 0;
        private _lastMcX: number = 0
        private _MouseDownEvt: UICompenent;
        private barMouseDown(evt: InteractiveEvent): void {
            this._lastMouseX = evt.x;
            this._lastMcX = evt.target == this.a_bar ? this.a_bar.x : this.a_bar_1.x;
            this._MouseDownEvt = evt.target

            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.barMouseMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.barMouseUp, this);

        }
        private barMouseMove(evt: InteractiveEvent): void {

            var $curPiexy: number = this._lastMcX + (evt.x - this._lastMouseX) / UIData.Scale;
            $curPiexy = Math.max(this.a_bar_bg_line.x, $curPiexy);
            $curPiexy = Math.min(this.a_bar_bg_line.x + this.a_bar_bg_line.width, $curPiexy);
            var rato = ($curPiexy - this.a_bar_bg_line.x) / this.a_bar_bg_line.width;
            if (this._MouseDownEvt == this.a_bar) {
                this.refreshDrawUseIcon(rato);
            } else {
                this.refreshDrawUseIconCopy(rato);
            }
        }
        private barMouseUp(evt: InteractiveEvent): void {
            //抬起的时候取消监听
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.barMouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.barMouseUp, this);
        }

        private refreshDrawUseIcon($rato: number): void {
            GameData.configData.block_volume_set = $rato;
            this.a_bar.x = this.a_bar_bg_line.x + this.a_bar_bg_line.width * $rato;
            this.a_bar_red.uvScale = $rato;
            if ($rato == 0) {
                this.setTargetState(this.a_selectbtn3, 1);
            } else {
                this.setTargetState(this.a_selectbtn3, 0);
            }
        }

        private refreshDrawUseIconCopy($rato: number): void {
            GameData.configData.block_sound_set = $rato;
            this.a_bar_1.x = this.a_bar_bg_line.x + this.a_bar_bg_line.width * $rato;
            this.a_bar_red_1.uvScale = $rato;
            if ($rato == 0) {
                this.setTargetState(this.a_selectbtn4, 1);
            } else {
                this.setTargetState(this.a_selectbtn4, 0);
            }
        }


        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    ModuleEventManager.dispatchEvent(new Hangup.HangupUiEvent(Hangup.HangupUiEvent.HIDE_HANGUPUI_EVENT));
                    break;
                case this.a_bar:
                case this.a_bar_1:
                    this.barMouseDown(evt)
                    break;
                default:
                    break;
            }

            switch (evt.target) {
                case this.a_selectbtn0:
                case this.a_selectbtn1:
                case this.a_selectbtn2:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    this.setTargetState(evt.target);
                    break;
                case this.a_selectbtn3:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var aaa = evt.target.current;
                    if (aaa == 0) {
                        this.refreshDrawUseIcon(0);
                    } else {
                        this.refreshDrawUseIcon(1);
                    }
                    break;
                case this.a_selectbtn4:
                    UiTweenScale.getInstance().changeButSize(evt.target);
                    var aaa = evt.target.current;
                    if (aaa == 0) {
                        this.refreshDrawUseIconCopy(0);
                    } else {
                        this.refreshDrawUseIconCopy(1);
                    }
                    break;
                default:
                    break;
            }
        }

        private setTargetState($fraui: FrameCompenent, $num: number = -1) {
            var curnum: number = $num;
            if ($num == -1) {
                curnum = ($fraui.current + 1) % 2
            }
            $fraui.goToAndStop(curnum);

            if ($fraui == this.a_selectbtn0) {
                GameData.configData.block_other_plr = curnum;
            } else if ($fraui == this.a_selectbtn1) {
                GameData.configData.block_effect_ski = curnum;
            } else if ($fraui == this.a_selectbtn2) {
                GameData.configData.block_plr_flyword = curnum;
            }
        }
    }
}