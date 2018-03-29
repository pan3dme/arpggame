module team {

    export class MemberCell {
        public icon: FrameCompenent
        public name: FrameCompenent
        public lev: FrameCompenent
        public state: FrameCompenent
        public parent: TeamSurePanel

        public visiable() {
            this.parent.setUiListVisibleByItem([this.icon, this.name, this.lev, this.state], true);
        }
        public unvisiable() {
            this.parent.setUiListVisibleByItem([this.icon, this.name, this.lev, this.state], false);
        }

        public setX($posx: number) {
            this.icon.x = $posx;
            this.icon.y = 189;

            this.name.x = this.icon.x - 16
            this.name.y = 257

            this.lev.x = this.icon.x - 16
            this.lev.y = 278

            this.state.x = this.icon.x + 44
            this.state.y = 224
        }

        public draw($cell: TeamMemberVo) {
            this.drawImg(getTouPic($cell.icon), this.icon);
            this.drawTxt(this.name, ColorType.Brown7a2f21 + getBaseName($cell.name));
            this.drawTxt(this.lev, ColorType.Green2ca937 + "Lv " + $cell.lev);

            this.state.goToAndStop($cell.response);
        }

        private drawImg($url: string, $ui: FrameCompenent) {
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = $ui.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $toRect.width, $toRect.height);
                    $ui.drawToCtx($ui.uiRender.uiAtlas, $ctx);
                });
        }

        private drawTxt($ui: FrameCompenent, $txt: string) {
            var $toRect: Rectangle = $ui.getSkinCtxRect();
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $txt, 16);
            $ui.drawToCtx($ui.uiRender.uiAtlas, $ctx);
        }
    }

    export class TeamSurePanel extends PopWindowMin {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.setBlackBg();
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

            this._midRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/team/teamsure.xml", "ui/uidata/team/teamsure.png", () => { this.loadConfigCom() });
        }

        private cellAry: Array<MemberCell>
        private btnAry: Array<UICompenent>
        private a_nobtn: UICompenent
        private a_okbtn: UICompenent
        private a_info: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(this._bottomRender.getComponent("a_title"));
            this.a_info = this.addChild(this._topRender.getComponent("a_info"));

            this.cellAry = new Array
            for (let i = 0; i < 3; i++) {
                var cell: MemberCell = new MemberCell;
                cell.parent = this;
                var icon: FrameCompenent = <FrameCompenent>this._midRender.getComponent("a_icon");
                icon.goToAndStop(i);
                cell.icon = icon;
                var a_name: FrameCompenent = <FrameCompenent>this._midRender.getComponent("a_name");
                a_name.goToAndStop(i);
                cell.name = a_name;
                var a_lev: FrameCompenent = <FrameCompenent>this._midRender.getComponent("a_lev");
                a_lev.goToAndStop(i);
                cell.lev = a_lev;
                cell.state = <FrameCompenent>this._midRender.getComponent("a_state");
                this.cellAry.push(cell);
            }

            this.btnAry = new Array
            this.a_nobtn = this.addEvntButUp("a_nobtn", this._topRender);
            this.a_okbtn = this.addEvntButUp("a_okbtn", this._topRender);
            this.btnAry.push(this.a_nobtn);
            this.btnAry.push(this.a_okbtn);

            this._tickFun = (t: number) => { this.tickRefreshState(t) };

            this.applyLoadComplete();

        }

        private _refusehide:number = 0;
        public tickRefreshState(t: number): void {

            var $time: number = Math.floor((this._endtime - TimeUtil.getTimer()) / 1000);
            if (this._curtime != $time) {
                this._curtime = $time;
                // console.log("刷新", $time);
                var str: string;
                if (this._select) {
                    str = ColorType.Redd92200 + $time + ColorType.color4392ff + "秒后默认选择同意"
                } else {
                    str = ColorType.color4392ff + "请等待..."
                }
                LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_info.skinName, str, 16, TextAlign.CENTER, ColorType.Brown7a2f21);
                
                if(!this._refused){
                    this._refusehide++;
                }

                if ($time < 0 || this._refusehide % 3 == 2) {
                    this.hide();
                }
            }
            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this._tickFun);
            }
        }

        private _tickFun: Function;
        private _select: boolean;
        private _refused: boolean;
        public refresh() {
            this._refused = true
            var memberary: Array<TeamMemberVo> = GuidData.team.getTeamItemAry();
            var ary: Array<TeamMemberVo> = new Array;
            for (let i = 0; i < memberary.length; i++) {
                if (memberary[i].guid != "") {
                    ary.push(memberary[i]);
                }
            }
            for (let index = 0; index < 3; index++) {
                if (index < ary.length) {
                    this.cellAry[index].visiable();
                    this.cellAry[index].draw(ary[index]);
                    if (ary.length == 2) {
                        this.cellAry[index].setX(365 + index * 167);
                    } else {
                        this.cellAry[index].setX(291 + index * 167);
                    }
                    var flag:boolean = ary[index].response == SharedDef.GROUP_MEMBER_RESPONSE_STATE_NONE;
                    var flag1:boolean = ary[index].response != SharedDef.GROUP_MEMBER_RESPONSE_STATE_DECLINE;
                    if (ary[index].guid == GuidData.player.getGuid()) {
                        //isme
                        this._select = flag;
                        this.setUiListVisibleByItem(this.btnAry, this._select);
                    }


                    this._refused = this._refused && flag1;
                } else {
                    this.cellAry[index].unvisiable();
                }
            }
        }

        private _endtime: number
        private _curtime: number
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.refresh();
            this._refusehide = 0;
            this._endtime = 16 * 1000 + TimeUtil.getTimer();
            TimeUtil.addFrameTick(this._tickFun);
        }


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_nobtn:
                    NetManager.getInstance().protocolos.select_group_enter(0);
                    break
                case this.a_okbtn:
                    NetManager.getInstance().protocolos.select_group_enter(1);
                    break
                default:
                    break
            }

        }


        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}