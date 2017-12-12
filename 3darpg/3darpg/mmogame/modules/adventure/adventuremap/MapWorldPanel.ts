module adventuremap {

    export class MapClikVo {
        public pic: FrameCompenent;
        public w_titlebg: FrameCompenent;
        public w_title: FrameCompenent;
        public w_openlev: FrameCompenent;
        public w_infobg: UICompenent;
        public w_openbg: UICompenent;
        public w_info: FrameCompenent;
        public id: number;
        public tb_world_map: tb.TB_world_map
        public tb_map: tb.TB_map
        public constructor() {
        }
        public draw($uiAtlas: UIAtlas): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.tb_world_map.mapid) + ".png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = this.pic.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $img.width, $img.height, ($toRect.width - $img.width) / 2, ($toRect.height - $img.height) / 2, $img.width, $img.height);
                    if (this.tb_map.levellimit > GuidData.player.getLevel()) {
                        UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                    }

                    this.pic.drawToCtx($uiAtlas, $ctx);
                });
            this.drawLabel($uiAtlas)
        }
        private drawLabel($uiAtlas: UIAtlas): void {
            //地图名
            var $toRect: Rectangle = this.w_title.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.colorffe9b4 + this.tb_map.name, 16);
            this.w_title.drawToCtx($uiAtlas, $ctx);
            //活动名
            var $toRect: Rectangle = this.w_info.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtxByVertical($ctx, ColorType.colorffe9b4 + this.tb_world_map.info, 14);
            this.w_info.drawToCtx($uiAtlas, $ctx);

            if (this.tb_map.levellimit > GuidData.player.getLevel()) {
                var $toRect: Rectangle = this.w_openlev.getSkinCtxRect()
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whiteffffff + "LV" + this.tb_map.levellimit + "解锁", 16);
                this.w_openlev.drawToCtx($uiAtlas, $ctx);
            }
        }

        private getSelectTbname(): string {
            var $strName: string = ""
            for (var i: number = 0; i < this.tb_world_map.info.length; i++) {
                $strName += this.tb_world_map.info.substr(i, 1)
                $strName += "\n";
            }

            if (this.tb_world_map.info.length < 4) {
                $strName = "\n" + $strName;
            }
            console.log($strName);
            return $strName
        }
    }

    export class MapWorldPanel extends UIVirtualContainer {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();

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

        }

        public dispose(): void {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;
        }

        private _curUi: UICompenent;
        private _updateFun: Function;
        public initUiAtlas($uiAtlas: UIAtlas): void {
            this._bottomRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this._midRender.uiAtlas = $uiAtlas;

            this._curUi = this.addChild(this._topRender.getComponent("w_cur"));
            this.resetPicData();


            this._updateFun = () => {
                this.updateY();
            }
        }

        private wIconItem: Array<MapClikVo>;
        private resetPicData(): void {
            var $uiPosList: Array<tb.TB_world_map> = tb.TB_world_map.getItem();
            this.wIconItem = new Array()
            for (var i: number = 0; i < $uiPosList.length; i++) {
                var $vo: MapClikVo = new MapClikVo()
                $vo.tb_world_map = $uiPosList[i];
                $vo.tb_map = tb.TB_map.getTB_map($uiPosList[i].mapid);
                $vo.id = i;

                $vo.w_titlebg = <FrameCompenent>this._bottomRender.getComponent("w_titlebg");
                $vo.w_titlebg.goToAndStop($vo.tb_map.is_PK);
                this.addChild($vo.w_titlebg);
                $vo.pic = <FrameCompenent>this.addEvntButUp("w_icon", this._bottomRender);
                $vo.pic.data = $vo
                $vo.pic.goToAndStop(i);

                $vo.w_title = <FrameCompenent>this.addChild(this._midRender.getComponent("w_title"));
                $vo.w_title.goToAndStop(i);

                $vo.w_infobg = this.addChild(this._bottomRender.getComponent("w_infobg"));
                $vo.w_info = <FrameCompenent>this.addChild(this._midRender.getComponent("w_info"));
                $vo.w_info.goToAndStop(i);

                $vo.pic.x = $vo.tb_world_map.x * 0.95 - 35;
                $vo.pic.y = $vo.tb_world_map.y * 0.95 - 40;


                $vo.w_titlebg.x = $vo.pic.x + 22;
                $vo.w_titlebg.y = $vo.pic.y + $vo.pic.height;

                $vo.w_title.x = $vo.w_titlebg.x + 18;
                $vo.w_title.y = $vo.w_titlebg.y + 1;

                $vo.w_infobg.x = $vo.pic.x + $vo.pic.width - 10;
                $vo.w_infobg.y = $vo.pic.y

                $vo.w_info.x = $vo.w_infobg.x + 5;
                $vo.w_info.y = $vo.w_infobg.y;

                if ($vo.tb_map.levellimit > GuidData.player.getLevel()) {
                    $vo.w_openlev = <FrameCompenent>this.addChild(this._topRender.getComponent("w_openlev"));
                    $vo.w_openlev.goToAndStop(i);

                    $vo.w_openbg = this.addChild(this._midRender.getComponent("w_openbg"));

                    $vo.w_openbg.x = $vo.pic.x + 38;
                    $vo.w_openbg.y = $vo.pic.y + 31;

                    $vo.w_openlev.x = $vo.w_openbg.x + 4;
                    $vo.w_openlev.y = $vo.w_openbg.y + 5;
                }

                this.wIconItem.push($vo);

            }
        }

        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                default:
                    if (evt.target.data instanceof MapClikVo) {
                        var $vo: MapClikVo = evt.target.data;
                        if ($vo.tb_world_map.mapid != GuidData.map.tbMapVo.id && $vo.tb_map.levellimit <= GuidData.player.getLevel()) {
                            if ($vo.tb_map.is_PK) {
                                AlertUtil.show(
                                    ColorType.Brown7a2f21 + "当前前往地图为PVP地图，可能会被家族外的其他玩家攻击，是否继续前往？"
                                    , "提示", (a: any) => {
                                        if (a == 1) {
                                            ModuleEventManager.dispatchEvent(new AdventureMapEvent(AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL))
                                            NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                                        }
                                    }, 2, ["是", "否"])
                            } else {
                                ModuleEventManager.dispatchEvent(new AdventureMapEvent(AdventureMapEvent.HIDE_ADVENTURE_MAP_PANEL))
                                NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                            }
                        } else {
                            console.log("当前地图不传")
                        }
                    }
                    break
            }

        }
        public hide(): void {
            if (this._updateFun) {
                TimeUtil.removeFrameTick(this._updateFun);
            }
            UIManager.getInstance().removeUIContainer(this);
        }
        private _lastY:number;
        public show(): void {
            this.setUiListVisibleByItem([this._curUi], false);
            for (var i: number = 0; i < this.wIconItem.length; i++) {
                this.wIconItem[i].draw(this._topRender.uiAtlas);
                if (this.wIconItem[i].tb_map.id == GuidData.map.tbMapVo.id) {
                    this.setUiListVisibleByItem([this._curUi], true);
                    this._curUi.x = this.wIconItem[i].pic.x + 51
                    this._curUi.y = this.wIconItem[i].pic.y
                    this._lastY = this._curUi.y;
                    TimeUtil.addFrameTick(this._updateFun);
                }
            }
            UIManager.getInstance().addUIContainer(this);


            var ui: UICompenent = (<WorldAdventureUiPanel>this.parent).loadBigPicByUrl("ui/load/map/bigworld.jpg")
            ui.width = 826;
            ui.height = 451;

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