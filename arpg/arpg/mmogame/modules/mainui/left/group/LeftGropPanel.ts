module leftui {
    export class LeftGropCell {
        public bg: UICompenent
        public txt: UICompenent
        private panel: LeftGropPanel
        public constructor($panel: LeftGropPanel) {
            this.panel = $panel
        }
        public setTeamMemberVo($vo: TeamMemberVo, $render: UIRenderComponent): void {

            var $str: string = "";
            if ($vo.state == SharedDef.GROUP_MEMBER_STATE_OFFLINE) {
                $str = ColorType.Whiteffeec9 + "离线";
            } else {
                if ($vo.mapid == GuidData.map.getMapID() && GuidData.map.getLineID() == $vo.lineid) {
                    $str = ColorType.Whiteffeec9 + "附近";
                } else {
                    $str = ColorType.Whiteffeec9 + "远离";
                }
            }
            LabelTextFont.writeSingleLabel($render.uiAtlas, this.txt.skinName, "Lv" + $vo.lev + " " + ColorType.Whitefff7db + getBaseName($vo.name) + " " + $str, 16);
       
        }
        public show(): void {
            this.panel.setUiListVisibleByItem([this.bg, this.txt], true)
        }
        public hide(): void {
            this.panel.setUiListVisibleByItem([this.bg, this.txt], false)
        }
    }
    export class LeftGropPanel extends UIPanel {
        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.middle = 0;
            this.left = 40;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

            this._topRender.uiAtlas = new UIAtlas();


        }
        private bFun: Function;
        public loadAtlas($bfun: Function): void {

            this.bFun = $bfun
            this._topRender.uiAtlas.setInfo("ui/uidata/mainui/left/leftgroup/leftgroup.xml", "ui/uidata/mainui/left/leftgroup/leftgroup.png", () => { this.loadConfigCom() });
        }

        private g_no_group_label: UICompenent;
        private g_open_group_event: UICompenent;

        private _groupUiItem: Array<LeftGropCell>
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.addChild(this._bottomRender.getComponent("g_tittle_labe"));
            this.addChild(this._bottomRender.getComponent("g_list_bg"));

            this.g_no_group_label=  this.addChild(this._topRender.getComponent("g_no_group_label"));
            this.g_open_group_event = this.addEvntBut("g_open_group_event", this._topRender);


            this._groupUiItem = new Array
  
            for (var i: number = 0; i < 3; i++) {
                var $leftGropCell: LeftGropCell = new LeftGropCell(this)
                $leftGropCell.bg = this.addChild(this._midRender.getComponent("f_group_cell_bg"+i));
                $leftGropCell.txt = this.addChild(this._topRender.getComponent("f_cell_txt_" + i));
                this._groupUiItem.push($leftGropCell)
            }

            this.f_bottom_tip = this.addChild(this._topRender.getComponent("f_bottom_tip"));
            this.f_bottom_txt = this.addChild(this._topRender.getComponent("f_bottom_txt"));
            this.f_duizhang_icon = this.addChild(this._topRender.getComponent("f_duizhang_icon"));

            
            
            this.bFun&&this.bFun();
        }
        private f_duizhang_icon: UICompenent
        private f_bottom_tip: UICompenent
        private f_bottom_txt: UICompenent

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.g_open_group_event:
                    ModuleEventManager.dispatchEvent(new team.TeamEvent(team.TeamEvent.SHOW_TEAM_PANEL));
      
                    break
            }
        }
        private hasGroup: boolean = false
        public refrish(): void {
            this.hasGroup = false
            this.hideGroupCell();
            if (GuidData.team) {
                this.hasGroup = true
            }
            this.setUiListVisibleByItem([this.g_no_group_label, this.g_open_group_event], !this.hasGroup);
            this.setUiListVisibleByItem([this.f_bottom_tip, this.f_bottom_txt, this.f_duizhang_icon], this.hasGroup);

            
            if (this.hasGroup) {
                var $item: Array<TeamMemberVo> = GuidData.team.getTeamItemAry();
                console.log($item);

                var $numid: number=0
                for (var i: number = 0; i < $item.length; i++) {
                    if ($item[i].guid) {
                        if (GuidData.team.getTeamLeaderGuid() == $item[i].guid) {
                            this.f_duizhang_icon.y = 170 + $numid * 43
                        }
                        this._groupUiItem[$numid].show()
                        this._groupUiItem[$numid].setTeamMemberVo($item[i], this._bottomRender);
                        $numid++
                    }
                }
                var $strr: string = ColorType.Yellowffe9b4 + " 经验加成: " + ColorType.Yellowffe9b4 + team.TeamModel.getInstance().getExp() + "%";
                LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.f_bottom_txt.skinName, ColorType.Yellowffe9b4 + "队员x " + $numid + $strr, 14);

            }

        }
        private hideGroupCell(): void {
            for (var i: number = 0; i < this._groupUiItem.length; i++) {
                this._groupUiItem[i].hide()
            }
        }
     
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.refrish();

        }
        public hide(): void {

            UIManager.getInstance().removeUIContainer(this);

        }
    }
}