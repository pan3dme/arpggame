

module kuafu {
    export class WaitListRoleUi {
        public bg: UICompenent;
        public pic: UICompenent;
        public txt: UICompenent;
    }

    export class KuaFu3v3MatchListPanel extends UIPanel {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose(): void {
            this._midRender.dispose();
            this._midRender = null;
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;

            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas
            this.updateFun = (t: number) => { this.update(t) };

        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/kuafu/3v3/matchlist3v3.xml", "ui/uidata/kuafu/3v3/matchlist3v3.png", () => { this.loadConfigCom() });
        }

        private uiAtlasComplet: boolean = false

        private d_but0: SelectButton;
        private d_but1: SelectButton;
        private d_end_txt: UICompenent;

        private d_enabel_mask0: UICompenent;
        private d_enabel_mask1: UICompenent;
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;

            this.addChild(<UICompenent>this._bottomRender.getComponent("d_bg"));

            this.addChild(<UICompenent>this._topRender.getComponent("d_3v3_title"));

            this.d_but0 = <SelectButton>this.addEvntBut("d_but0", this._midRender);
            this.d_but1 = <SelectButton>this.addEvntBut("d_but1", this._midRender);

            this.d_end_txt = this.addChild(<UICompenent>this._topRender.getComponent("d_end_txt"));

            this.d_enabel_mask0 = this._topRender.getComponent("d_enabel_mask0");
            this.d_enabel_mask1 = this._topRender.getComponent("d_enabel_mask1");


            

            this.roleUiList=new Array()
            for (var i: number = 0; i < 6; i++)
            {
                var $temp: WaitListRoleUi = new WaitListRoleUi()
                $temp.pic = this.addChild(<UICompenent>this._topRender.getComponent("d_role_icon" + i))
                $temp.txt = this.addChild(<UICompenent>this._topRender.getComponent("d_role_name" + i))
                this.roleUiList.push($temp)
     
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();
            this.refresh()

        }
        private roleUiList: Array<WaitListRoleUi>
        public refresh(): void {
            if (this.uiAtlasComplet) {
               var $tw:number=100
                var $vo: s2c_kuafu_3v3_wait_info = KuaFu3v3Model.getInstance().wait_info_vo
                var $len: number = $vo.list.length
                for (var i: number = 0; i < $len; i++) {
                    var $waitListRoleUi: WaitListRoleUi = this.roleUiList[i]
                    $waitListRoleUi.pic.x = 480 - ($len * ($tw / 2)) + (i * $tw) - ($waitListRoleUi.pic.width / 2) + $tw/2;
                    $waitListRoleUi.txt.x = this.roleUiList[i].pic.x-5;
                    $waitListRoleUi.txt.y = this.roleUiList[i].pic.y + this.roleUiList[i].pic.height;
                    this.drawRole($waitListRoleUi, $vo.list[i]);
                }
 
           
            }

        }
        private drawRole($uiVo: WaitListRoleUi, $wait_info: wait_info): void
        {
            var $color: string = "[d6e7ff]";
            if ($wait_info.state == -1) {
                $color = "[ff0000]";
            } 
            if ($wait_info.state == 1 || $wait_info.state == 11 || $wait_info.state == 2 || $wait_info.state == 12) {
                $color = "[00ff00]";
            }
            var $roleName: string = getBaseName($wait_info.name);
            var $picUrl: string = "ui/tou/2.png";
            if ($wait_info.name == GuidData.player.getName()) {
        
                $roleName = getBaseName(GuidData.player.getName())
                $picUrl = getTouPic(GuidData.player.getCharType())
            }
            LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, $uiVo.txt.skinName, $color + $roleName, 16, TextAlign.CENTER)
            IconManager.getInstance().getIcon($picUrl,
                ($img: any) => {
                    var $skillrec: UIRectangle = this._topRender.uiAtlas.getRec($uiVo.pic.skinName);
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($skillrec.pixelWitdh, $skillrec.pixelHeight, false);
                    $ctx.drawImage($img, 1, 1, $skillrec.pixelWitdh - 2, $skillrec.pixelHeight-2);
                    if ($color == "[00ff00]") {
                        UiDraw.cxtDrawImg($ctx, PuiData.A_gou, new Rectangle(10, 10, 38, 38), UIData.publicUi);
                    }
                    if ($color == "[ff0000]") {
                        UiDraw.cxtDrawImg($ctx, PuiData.A_cha, new Rectangle(10, 10, 38, 38), UIData.publicUi);
                    }
                    UiDraw.cxtDrawImg($ctx, PuiData.A_BLACK_C, new Rectangle(0, 0, 69, 69), UIData.publicUi);
                    this._topRender.uiAtlas.updateCtx($ctx, $skillrec.pixelX, $skillrec.pixelY);
                });

        }
 

        public butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.d_but0:
                    this.hide()
                    //console.log("拒绝")
                    NetManager.getInstance().protocolos.kuafu_3v3_match_oper(0);
                   
                    break
                case this.d_but1:
                    this.d_but1.selected = true;
                    this.d_but1.enable = false;
                    this.d_but0.enable = false;
                    this.d_but0.selected = true;

                    this.setUiListVisibleByItem([this.d_enabel_mask0, this.d_enabel_mask1], true)
                    //console.log("接受")
                    NetManager.getInstance().protocolos.kuafu_3v3_match_oper(1);
                    break
                default:
                    break
            }

        }
        private _endTime: number;
        private lastTimeTxt: number
        private update(t: number): void {
            var $time: number = Math.floor((this._endTime - TimeUtil.getTimer()) / 1000);
            if ($time > 0) {
                var $vo: s2c_kuafu_3v3_wait_info = KuaFu3v3Model.getInstance().wait_info_vo;
                var $need: boolean = false;
                for (var i: number = 0; i < $vo.list.length; i++) {
                    if ($vo.list[i].state != 2) {
                        $need = true;
                    }
                }
                if ($need) {
                    ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.d_end_txt.skinName, String($time), ArtFont.num1, TextAlign.CENTER)
                }
            } else {
                this.hide()
            }

            if (!this.hasStage) {
                TimeUtil.removeFrameTick(this.updateFun);
            }
         
           
        }
        private updateFun: Function;
        public show(): void {
            if (!this.hasStage) {
                this._endTime = TimeUtil.getTimer()+60*1000;
                UIManager.getInstance().addUIContainer(this);
                TimeUtil.addFrameTick(this.updateFun);
                this.d_but1.selected = false;
                this.d_but1.enable = true;
                this.d_but0.enable = true;
                this.d_but0.selected = false;
                this.setUiListVisibleByItem([this.d_enabel_mask0, this.d_enabel_mask1], false)
            }
            this.refresh()
        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


    }
}