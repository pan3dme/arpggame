module mapnew {

    export class MapClikVo {
        public pic: FrameCompenent;
        public txt: FrameCompenent;
        public txtbg: UICompenent;
        public id: number;
        public tb_world_map: tb.TB_world_map
        public isOpen: boolean
        public constructor() {
        }
        public draw($uiAtlas: UIAtlas): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.tb_world_map.mapid) + ".png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = this.pic.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $img.width, $img.height, ($toRect.width - $img.width) / 2, ($toRect.height - $img.height) / 2, $img.width, $img.height, );

                    var $mapobj: any = TableData.getInstance().getData(TableData.tb_map, this.tb_world_map.mapid)
                    this.isOpen = $mapobj["levellimit"] <= GuidData.player.getLevel();
                    if (!this.isOpen) {
                        UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                    }

                    this.pic.drawToCtx($uiAtlas, $ctx);
                });
            this.drawLabel($uiAtlas)
        }
        private drawLabel($uiAtlas: UIAtlas): void {
            var $toRect: Rectangle = this.txt.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var $mapobj: any = TableData.getInstance().getData(TableData.tb_map, this.tb_world_map.mapid)
            var str: string = $mapobj["name"]
            if (!$mapobj["levellimit"]) {
                str += "·" + $mapobj["types"]
            } else {
                str += "·" + $mapobj["levellimit"] + "级"
            }
            LabelTextFont.writeSingleLabelToCtxSetAnchor($ctx, ColorType.Whiteffe9b4 + str, 16, $toRect.width / 2, 0, TextAlign.CENTER);
            this.txt.drawToCtx($uiAtlas, $ctx);
        }
    }

    export class WorldMap extends UIPanel {

        private _bigPic: UIRenderOnlyPicComponent;
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();

            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;


            this._bigPic = new UIRenderOnlyPicComponent();
            this.addRender(this._bigPic)
            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);

        }

        private _curUi: UICompenent;
        private _updateFun: Function;
        public initUiAtlas($uiAtlas): void {
            this._bigPic.uiAtlas = $uiAtlas;
            this._bottomRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
            this._updateFun = () => {
                this.updateY();
            }

        }

        private initView(): void {
            this.addChild(this._bigPic.getComponent("b_world_map_pic"));
            this._bigPic.setImgUrl("ui/load/map/bigworld.jpg");
            this._curUi = this.addChild(this._topRender.getComponent("b_curarrow"));
            this.resetPicData();
        }
        private wIconItem: Array<MapClikVo>;
        private resetPicData(): void {
            var $uiPosList: Array<tb.TB_world_map> = tb.TB_world_map.getItem();
            this.wIconItem = new Array()
            for (var i: number = 0; i < $uiPosList.length; i++) {
                var $vo: MapClikVo = new MapClikVo()
                $vo.tb_world_map = $uiPosList[i];
                $vo.id = i;

                $vo.txtbg = this.addChild(this._bottomRender.getComponent("b_mapnamebg"));
                $vo.txt = <FrameCompenent>this._midRender.getComponent("w_label");
                $vo.txt.goToAndStop(i);
                this.addChild($vo.txt);
                $vo.pic = <FrameCompenent>this.addEvntButUp("w_icon", this._midRender);
                $vo.pic.data = $vo
                $vo.pic.goToAndStop(i);


                $vo.pic.x = $vo.tb_world_map.x;
                $vo.pic.y = $vo.tb_world_map.y;

                $vo.txtbg.x = $vo.pic.x - 8;
                $vo.txtbg.y = $vo.pic.y + 78;

                $vo.txt.x = $vo.txtbg.x + 1;
                $vo.txt.y = $vo.txtbg.y + 4;

                this.wIconItem.push($vo);
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            if (evt.target.data instanceof MapClikVo) {
                var $vo: MapClikVo = evt.target.data;

                if ($vo.tb_world_map.mapid == GuidData.map.tbMapVo.id && $vo.isOpen) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "已在此地图中", 99)
                } else if (!$vo.isOpen) {
                    msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "该地图未解锁", 99)
                } else {
                    NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                    ModuleEventManager.dispatchEvent(new MapNewEvent(MapNewEvent.HIDE_MAP_FORM_MINI));
                }
            }
        }
        public hide(): void {
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.refreshUi();
        }

        private _lastY: number;
        public refreshUi() {
            this.setUiListVisibleByItem([this._curUi], false);
            for (var i: number = 0; i < this.wIconItem.length; i++) {
                this.wIconItem[i].draw(this._topRender.uiAtlas);
                if (this.wIconItem[i].tb_world_map.mapid == GuidData.map.tbMapVo.id) {
                    this.setUiListVisibleByItem([this._curUi], true);
                    this._curUi.x = this.wIconItem[i].pic.x + 32
                    this._curUi.y = this.wIconItem[i].pic.y
                    this._lastY = this._curUi.y;
                    TimeUtil.addFrameTick(this._updateFun);
                }
            }
        }

        public onRemove(): void {
            super.onRemove();
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
        }

        public updateY(): void {
            var ypos: number = Math.sin(TimeUtil.getTimer() / 250) * 5;
            if (!this._curUi) {
                return;
            }
            this._curUi.y = this._lastY + ypos;
        }
    }
}