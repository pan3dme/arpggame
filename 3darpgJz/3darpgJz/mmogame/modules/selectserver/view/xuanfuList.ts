module selectserver {

    export class xuanfuList extends SList {

        public constructor() {
            super();
            this.left = 295;
            this.top = 98;
        }

        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }

        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, xuanfuListRender, 566, 354, 283, 66, 5, 1024, 512, 2, 7, 1);
        }


        public getData($ary: Array<ServerVo>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
                item.id = i;
                ary.push(item);
            }
            return ary;
        }

        public show($data: Array<ServerVo>): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

            var $sListItemData = this.getData($data);
            this.refreshData($sListItemData);
        }

        public hide(): void {
            if (this.hasStage)
                UIManager.getInstance().removeUIContainer(this);
        }
    }

    export class xuanfuListRender extends SListItem {
        public static baseAtlas: UIAtlas;
        // public static last_Uicontainer: UIConatiner;

        private bg: UICompenent;
        private new: UICompenent;
        private state: UICompenent;
        private serverid: UICompenent;
        private servername: UICompenent;
        private rolebg: UICompenent;
        private roleinfomation: UICompenent;

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            var customRender: UIRenderComponent = this._customRenderAry[0];

            this.bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "bg", 0, 0, 275, 62);
            $container.addChild(this.bg);
            this.bg.addEventListener(InteractiveEvent.Up, this.equClick, this);

            this.new = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "new", 0, 0, 33, 33);
            $container.addChild(this.new);
            this.state = this.creatSUI(customRender, this.parentTarget.baseAtlas, "state", 12, 19, 25, 25);
            $container.addChild(this.state);
            this.serverid = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "serverid", 47, 21, 36, 20);
            $container.addChild(this.serverid);
            this.servername = this.creatSUI(customRender, this.parentTarget.baseAtlas, "servername", 96, 21, 70, 20);
            $container.addChild(this.servername);
            this.rolebg = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "rolebg", 165, 18, 106, 27);
            $container.addChild(this.rolebg);
            this.roleinfomation = this.creatSUI(customRender, this.parentTarget.baseAtlas, "roleinfomation", 168, 22, 100, 20);
            $container.addChild(this.roleinfomation);
        }


        private applyrender(): void {
            var vo: ServerVo = this.itdata.data
            UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.bg.skinName, "bg");
            if (vo.isnew) {
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.new.skinName, "new");
            } else {
                UiDraw.clearUI(this.new);
            }

            var statestr: string = SelectServerModel.getInstance().StateKey[vo.state]
            UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.state.skinName, statestr);
            
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.serverid.skinName, vo.id + "服", 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.servername.skinName, vo.name, 16, TextAlign.LEFT, ColorType.Brown7a2f21);
            
            
            if (vo.role) {
                UiDraw.SharedDrawImg(this._baseRender.uiAtlas, this.parentTarget.baseAtlas, this.rolebg.skinName, "rolebg");
                var roletype = SelectServerModel.getInstance().RoleKey[vo.role.roletype];
                LabelTextFont.writeSingleLabel(this._baseRender.uiAtlas, this.roleinfomation.skinName, "LV"+vo.role.rolelev+" "+roletype, 14, TextAlign.CENTER, ColorType.Whitefff4d6);
            } else {
                UiDraw.clearUI(this.rolebg);
                UiDraw.clearUI(this.roleinfomation);
            }
        }


        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyrender();
            } else {
                this.setnull();
            }
        }

        private equClick(evt: InteractiveEvent): void {
            //选中，事件派发
            //如果切换数据源时，第一条仍为选中状态，则直接渲染

            if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                return;
            }

            if (this.itdata && this.itdata.data) {
                SelectServerModel.getInstance().ChgCurVo(this.itdata.data);
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.HIDE_SELECTSERVER_EVENT));
                ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
            }
        }

        private setnull(): void {
            UiDraw.clearUI(this.bg);
            UiDraw.clearUI(this.new);
            UiDraw.clearUI(this.state);
            UiDraw.clearUI(this.serverid);
            UiDraw.clearUI(this.servername);
            UiDraw.clearUI(this.rolebg);
            UiDraw.clearUI(this.roleinfomation);
        }
    }
}