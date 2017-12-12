module topui {
    export class TopIconVo {
        public ui: FrameCompenent;
        public red: RedPointCompenent;

    }
    export class ActivityManager {
        private _container: TopPandaPanel
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;
        private _itemUi: Array<TopIconVo>;

        public constructor() {

        }

        private b_bg: UICompenent
        private b_text: UICompenent
        private b_arrow: UICompenent
        private aryUI: Array<UICompenent>
        public initUI($container: TopPandaPanel, $bg: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent, $redpointRender: RedPointRender) {
            this._container = $container;
            this._bottomRender = $bg;
            this._midRender = $mid;
            this._topRender = $top;
            this._redPointRender = $redpointRender;
            this._itemUi = new Array;

            this.aryUI = new Array
            this.b_bg = <UICompenent>this._midRender.getComponent("b_bg");
            this.b_text = <UICompenent>this._topRender.getComponent("b_text");
            this.b_arrow = <UICompenent>this._topRender.getComponent("b_arrow");
            this.aryUI.push(this.b_bg);
            this.aryUI.push(this.b_text);
            this.aryUI.push(this.b_arrow);
        }

        private showData: Array<tb.TB_system_icon>
        /*
        private getSysList(): void {
            var $sysArr: Array<SystemOpenData> = GuidData.player.systemOpenItem;
            this.showData = new Array()
            for (var i: number = 0; i < $sysArr.length; i++) {
                var $tb: tb.TB_system_icon = tb.TB_system_icon.getTempVo($sysArr[i].systemId);
                if (($tb.position == 1 || $tb.position == 2) && $sysArr[i].needShowIcon) {
                    this.showData.push($tb)
                }
            }
            this.showData.sort(
                function (a: tb.TB_system_icon, b: tb.TB_system_icon): number {
                    return a.index - b.index;
                }
            )

        }
        */
        private nodeDic: any = { 504: 74, 601: 112, 111: 116, 501: 120, 113: 123 };
        public visible: boolean = true;
        public refresh(): void {
            this.clear();
            if (this.visible) {
                var $cellAtx: number = 0;
                var $cellBtx: number = 0;
                // this.getSysList();
                this.showData = mainUi.MainUiModel.getSysList();
                for (var i: number = 0; i < this.showData.length; i++) {
                    var $tb: tb.TB_system_icon = this.showData[i]
                    if (($tb.position == 1 || $tb.position == 2)) {
                        var $vo: TopIconVo = new TopIconVo();
                        $vo.ui = <FrameCompenent>this._container.addChild(this._bottomRender.getComponent("t_panda_frame"));
                        $vo.ui.data = $tb;
                        $vo.ui.goToAndStop(this._itemUi.length)
                        $vo.ui.addEventListener(InteractiveEvent.Up, this.butClik, this);
                        $vo.ui.addEventListener(InteractiveEvent.Down, v => { }, this);
                        var $pos: Vector2D = mainUi.MainUiModel.getPandaPostionBySysId($tb.id);
                        $vo.ui.x = $pos.x
                        $vo.ui.y = $pos.y

                        if (this.nodeDic[$tb.id]) {
                            $vo.red = this._redPointRender.getRedPointUI(this._container, this.nodeDic[$tb.id], new Vector2D(0, 0));
                            $vo.red.setPos($pos.x + $vo.ui.width - 17, $pos.y);
                        }
                        this.ctxIconPic($vo.ui, $tb)
                        this._itemUi.push($vo)
                    }
                }
            }
        }

        public showTips($data: string) {
            this._container.setUiListVisibleByItem(this.aryUI, false);
            if (this.visible && $data) {
                var topiconvo: TopIconVo = this.getUiById(SharedDef.MODULE_BOSS);
                if (topiconvo) {
                    this._container.setUiListVisibleByItem(this.aryUI, true);
                    var $txtWidth: number = LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_text.skinName, $data, 16, TextAlign.LEFT);

                    this.b_arrow.x = topiconvo.ui.x + 20
                    this.b_arrow.y = topiconvo.ui.y + topiconvo.ui.height - 5

                    this.b_bg.x = this.b_arrow.x - ($txtWidth - 69)
                    this.b_bg.y = this.b_arrow.y + 12
                    this.b_bg.width = $txtWidth + 20;

                    this.b_text.x = this.b_bg.x + 12
                    this.b_text.y = this.b_bg.y + 11
                }
                // for (var i = 0; i < this._itemUi.length; i++) {
                //     var tb: tb.TB_system_icon = this._itemUi[i].ui.data
                //     if (tb.id == SharedDef.MODULE_BOSS) {
                //         this._container.setUiListVisibleByItem(this.aryUI, true);
                //         var $txtWidth: number = LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.b_text.skinName, $data, 16, TextAlign.LEFT);

                //         this.b_arrow.x = this._itemUi[i].ui.x + 20
                //         this.b_arrow.y = this._itemUi[i].ui.y + this._itemUi[i].ui.height - 5

                //         this.b_bg.x = this.b_arrow.x - ($txtWidth - 69)
                //         this.b_bg.y = this.b_arrow.y + 12
                //         this.b_bg.width = $txtWidth + 20;

                //         this.b_text.x = this.b_bg.x + 12
                //         this.b_text.y = this.b_bg.y + 11
                //     }
                // }
            }
        }


        private getIconByID($id): string {
            return "ui/load/systemicon/" + $id + ".png"
        }
        private ctxIconPic($ui: FrameCompenent, $data: tb.TB_system_icon): void {
            $ui.name = "panda" + $data.id
            LoadManager.getInstance().load(Scene_data.fileRoot + this.getIconByID($data.id), LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = $ui.getSkinCtxRect();

                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);

                    $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $toRect.width, $toRect.height);


                    $ui.drawToCtx(this._bottomRender.uiAtlas, $ctx)
                });
        }
        public butClik(evt: InteractiveEvent): void {
            if (evt.target.data instanceof tb.TB_system_icon) {
                var $tb: tb.TB_system_icon = <tb.TB_system_icon>evt.target.data;
                UiTweenScale.getInstance().changeButSize(evt.target);
                console.log($tb)

                if ($tb.id == SharedDef.MODULE_FISH) {
                    var topiconvo: TopIconVo = this.getUiById(SharedDef.MODULE_FISH);
                    if (topiconvo) {
                        var $evt = new chgfish.ChgfishEvent(chgfish.ChgfishEvent.SHOW_Chgfish_EVENT);
                        $evt.data = topiconvo.ui;
                        ModuleEventManager.dispatchEvent($evt);
                    }
                } else {
                    ModulePageManager.openPanel($tb.id);
                }
            }

        }


        private getUiById($id: number): TopIconVo {
            for (var i = 0; i < this._itemUi.length; i++) {
                var tb: tb.TB_system_icon = this._itemUi[i].ui.data
                if (tb.id == $id) {
                    return this._itemUi[i];
                }
            }
            return null;
        }

        private clear(): void {
            while (this._itemUi.length) {
                var $vo: TopIconVo = this._itemUi.pop();
                this._container.removeChild($vo.ui);
                if ($vo.red) {
                    if($vo.red.node){
                        $vo.red.node.unBind();
                    }                    
                    this._container.removeChild($vo.red);
                }
            }

        }
    }
    export class TopPandaPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _redPointRender: RedPointRender;


        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.top = 0;
            this.right = 0;

        }
        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent, $redpointRender: RedPointRender): void {
            this._bottomRender = $bottom
            this._midRender = $mid;
            this._topRender = $top;
            this._redPointRender = $redpointRender;
            this._activityManager = new ActivityManager();
            this._activityManager.initUI(this, this._bottomRender, this._midRender, this._topRender, this._redPointRender);
            this.loadConfigCom();
        }
        private _activityManager: ActivityManager
        private t_show_but: UICompenent
        private loadConfigCom(): void {
            this.t_show_but = this.addEvntButUp("t_show_but", this._topRender);
            this.t_show_but.addEventListener(InteractiveEvent.Down, v => { }, this);
            GameInstance.pandaVisibel = true

        }
 

        private canAotuOpen: boolean = false
        public changePandaVisible(value: boolean): void {

            if (value == false) {
                this.canAotuOpen = true
                GameInstance.pandaVisibel = false;
            } else {
                if (this.canAotuOpen) {
                    GameInstance.pandaVisibel = true;
                }
                this.canAotuOpen = false
            }
            this.refresh();


        }
        public refresh(): void {
            this._activityManager.visible = GameInstance.pandaVisibel;
            this.t_show_but.isV = GameInstance.pandaVisibel
            this._activityManager.refresh();
            this._activityManager.showTips(this._tipsVo);
            this._topRender.applyObjData();

            if (GuidData.map.showAreaById(AreaType.toprightPanda_3)) {
                this.right = 0
            } else {
                this.right = 1000
            }
        }

        private _tipsVo: string;
        public setTipsData($data: string) {
            this._tipsVo = $data;
            this.refresh();
        }

        public butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.t_show_but:
                    GameInstance.pandaVisibel = !GameInstance.pandaVisibel;
                    this.refresh();

                    break;
                default:
                    break;
            }
        }
    }
}