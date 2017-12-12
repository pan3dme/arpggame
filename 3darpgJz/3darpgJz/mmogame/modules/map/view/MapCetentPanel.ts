module map {

    export class MapClikVo {
        public pic: FrameCompenent;
        public txt: FrameCompenent;
        public id: number;
        public tb_world_map: tb.TB_world_map
        public constructor() {
        }
        public draw($uiAtlas: UIAtlas): void {
             LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.id + 1) + ".png",LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = this.pic.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                    if (true) {
                        UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                    }

                    this.pic.drawToCtx($uiAtlas, $ctx);
                });
        }
    }

    export class NpcNameAndIcon {
        public txtUI: FrameCompenent;
        public pointUi: FrameCompenent;
        public id: number;
        public constructor() {
        }
        public draw($vo: MapMenuVo, $uiAtlas: UIAtlas): void {
            var $id: number = this.id

            this.txtUI.goToAndStop(this.id);

            this.txtUI.x = this.pointUi.x - 40;
            this.txtUI.y = this.pointUi.y + 20;

            this.pointUi.goToAndStop($vo.data.type)

            var $toRect: Rectangle = this.txtUI.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, "[000000]" + $vo.data.name, 15, $toRect.width / 2, 0, TextAlign.CENTER);
            this.txtUI.drawToCtx($uiAtlas, $ctx)
        }
    }
    export class MapCetentPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _pointRender: UIRenderComponent;

    

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }
        public setRender($bottom: UIRenderComponent, $mid: UIRenderComponent, $top: UIRenderComponent, $point: UIRenderComponent): void {
            this._bottomRender = $bottom;
            this._midRender = $mid;
            this._topRender = $top;
            this._pointRender = $point;

            this.loadConfigCom();
        }

        private w_mapA: UICompenent //大图
        private w_mapB: UICompenent  //小图
        private c_red: UICompenent
        private a_map_name: UICompenent
        private a_map_name_bg: UICompenent


        private loadConfigCom(): void {
            this.addUIList(["w_big_0", "w_big_1", "w_big_2"], this._bottomRender);

            this.w_mapA = <UICompenent>this.addChild(this._midRender.getComponent("w_mapA"));
            this.w_mapB = this.addEvntBut("w_mapB", this._midRender);


            this.c_red = <UICompenent>this.addChild(this._pointRender.getComponent("c_red"));
            this.a_map_name_bg = <UICompenent>this.addChild(this._pointRender.getComponent("a_map_name_bg"));
            this.a_map_name = <UICompenent>this.addChild(this._pointRender.getComponent("a_map_name"));


            this.a_bottom_mask = <UICompenent>this.addChild(this._topRender.getComponent("a_bottom_mask"));
            this.a_bottom_mask.isV = true
            this.a_top_mask = <UICompenent>this.addChild(this._topRender.getComponent("a_top_mask"));


            var $uiPosList: Array<tb.TB_world_map> = tb.TB_world_map.getItem();



            this.wIconItem = new Array()
            for (var i: number = 0; i < $uiPosList.length; i++) {
                var $vo: MapClikVo = new MapClikVo()
                $vo.tb_world_map = $uiPosList[i];
                $vo.id = i;

                $vo.txt = <FrameCompenent>this._topRender.getComponent("w_label");
                $vo.txt.goToAndStop($vo.id);
                $vo.pic = <FrameCompenent>this.addEvntBut("w_icon", this._topRender);
                $vo.pic.data = $vo
                $vo.pic.goToAndStop(i);


                $vo.pic.x = $vo.tb_world_map.x;
                $vo.pic.y = $vo.tb_world_map.y;

                $vo.txt.x = $vo.tb_world_map.x;
                $vo.txt.y = $vo.tb_world_map.y + $vo.pic.height;

                $vo.draw(this._topRender.uiAtlas);
                this.wIconItem.push($vo);

            }

        }

        private wIconItem: Array<MapClikVo>;

        private a_bottom_mask: UICompenent
        private a_top_mask: UICompenent
        protected butClik(evt: InteractiveEvent): void {


            switch (evt.target) {
                case this.w_mapB:
                    var hitv2: Vector2D = new Vector2D
                    console.log(this.w_mapB.x, this.w_mapB.y)
                    console.log(this.x, this.y)
                    console.log("---------------")
                    hitv2.x = evt.x / UIData.Scale - this.x / UIData.Scale;
                    hitv2.y = evt.y / UIData.Scale - this.y / UIData.Scale;
                    var hitV3: Vector3D = this.uiPosToWorldPos(hitv2)
                    this.sendWalkToPos(hitV3)
                    break
                default:
                    if (evt.target.data instanceof MapClikVo) {
                        var $vo: MapClikVo = evt.target.data;
                        NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());

                    }

                    break;

            }

        }
        private sendWalkToPos($hitPos: Vector3D): void {

            var $item: Array<Vector2D> = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if ($item) {
                for (var i: number = 0; i < $item.length; i++) {
                    console.log($item[i], AstarUtil.isGridCanWalk($item[i]));
                }
                console.log($item);
                this.meshToWalkLine($item)
                AotuSkillManager.getInstance().aotuWalk = true;
       
                MainCharControlModel.getInstance().setWalkPathFun($item, () => { this.walkPathComplete() })
            }
        }
        public meshToWalkLine($arr:Array<Vector2D>): void
        {
            var $walkItem: Array<Vector2D> = new Array();
            for (var i: number = 0; $arr&&i < $arr.length; i++)
            {
                var pos3d = AstarUtil.getWorldPosByStart2D($arr[i]);
                var pos2d: Vector2D = this.worldPosToUiPos(pos3d);
                $walkItem.push(pos2d)
            }
            (<MapPanel>this.parent).mapWalkLineComponent.makeLineUiItem($walkItem);
        }
        public walkPathComplete(): void {
    
            this.meshToWalkLine(null)
            AotuSkillManager.getInstance().aotuWalk = false;
        }

        public setTabType(value: number): void {
            this._bottomRender.uiAtlas.clearCtxTextureBySkilname(this.w_mapA.skinName)//清空一下，便加载图片时不显示其它
            this.mathMinMapRect();
            if (MapModel.tabType == 0) {
                this.loadMapById();
                this.setUiListVisibleByItem([this.w_mapA], false);
                this.setUiListVisibleByItem([this.w_mapB], true);
                this.clearNpc();
                this.makeNpcSprite()
                this.a_top_mask.width = 566
                this.a_bottom_mask.width = 566

            } else {
                this.setUiListVisibleByItem([this.w_mapA], true);
                this.setUiListVisibleByItem([this.w_mapB], false);
               // this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/worldmap.jpg", this.w_mapA.skinName)
                this.drawWorldMapImg()
                this.a_top_mask.width = 790
                this.a_bottom_mask.width = 790
            }
            var $visible: boolean = MapModel.tabType != 0
            for (var i: number = 0; i < this.wIconItem.length; i++) {
                this.setUiListVisibleByItem([this.wIconItem[i].pic], $visible);
                this.setUiListVisibleByItem([this.wIconItem[i].txt], $visible);
            }
        }
        private drawWorldMapImg(): void
        {
            var $uiAtlas:UIAtlas=this._midRender.uiAtlas
            var rec: UIRectangle = $uiAtlas.getRec(this.w_mapA.skinName);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            $ctx.drawImage(MapModel.worldMapImg, 0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this._bottomRender.uiAtlas.texture, rec.pixelX, rec.pixelY, $ctx);
        }

        private severList: Array<FrameCompenent> = new Array
        public showSeverMapInfo($arr: Array<MapServerVo>): void {
            if (!$arr || $arr.length == 0) {
                $arr = this.getTestData();
            }
            if (MapModel.tabType == 0) {
                while (this.severList.length > $arr.length) {
                    var tempUi: FrameCompenent = this.severList.pop();
                    this.removeChild(tempUi);
                }
                for (var i: number = 0; i < $arr.length; i++) {
                    var pos3d = AstarUtil.getWorldPosByStart2D($arr[i].pos)
                    var pos2d: Vector2D = this.worldPosToUiPos(pos3d)
                    var $ui: FrameCompenent
                    if (i >= this.severList.length) {
                        $ui = <FrameCompenent>this.addChild(this._pointRender.getComponent("f_icon"))
                        this.severList.push($ui);
                        $ui.x = pos2d.x - $ui.width / 2;
                        $ui.y = pos2d.y - $ui.height / 2;
                    }
                    $ui = this.severList[i]
                    $ui.goToAndStop($arr[i].type);
                    $ui.data = pos2d;


                }
            }

        }
        private getTestData(): Array<MapServerVo> {
            var $arr: Array<MapServerVo> = new Array
            var len: number = random(8) + 1;
            for (var i: number = 0; i < len; i++) {
                var $vo: MapServerVo = new MapServerVo();
                $vo.type = random(3);
                $vo.pos = new Vector2D()
                $vo.pos.x = 80
                $vo.pos.y = 80
                $arr.push($vo)
            }
            return $arr
        }
        private npcSpriteList: Array<NpcNameAndIcon> = new Array;
        private makeNpcSprite(): void {

            var $arr: Array<MapMenuVo> = MapModel.getInstance().getxmlList();
            for (var i: number = 0; i < $arr.length; i++) {
                var $vo: MapMenuVo = $arr[i]
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._pointRender.getComponent("f_icon"));
                $vo.pos3d = AstarUtil.getWorldPosByStart2D($vo.data.position)
                var pos2d: Vector2D = this.worldPosToUiPos($vo.pos3d)
                $ui.x = pos2d.x - $ui.width / 2;
                $ui.y = pos2d.y - $ui.height / 2;

                var $tempVo: NpcNameAndIcon = new NpcNameAndIcon()
                $tempVo.id = i;
                $tempVo.pointUi = $ui;

                $tempVo.txtUI = <FrameCompenent>this.addChild(this._pointRender.getComponent("t_npcname"))

                $tempVo.draw($vo, this._pointRender.uiAtlas)

                this.npcSpriteList.push($tempVo);
            }

            this.removeChild(this.c_red);  //为了排在最后面
            this.addChild(this.c_red);
        }
        private worldPosToUiPos(pos: Vector3D): Vector2D {

            var $num512: number = this.w_mapB.width
            var tx: number = this.w_mapB.x + $num512 / 2;
            var ty: number = this.w_mapB.y + $num512 / 2;

            tx = tx + (pos.x / this.minMapRect.width * $num512) / 2
            ty = ty - (pos.z / this.minMapRect.width * $num512) / 2

            return new Vector2D(tx, ty)
        }
        private uiPosToWorldPos($v2: Vector2D): Vector3D {

            var $num512: number = this.w_mapB.width
            var tx: number = this.w_mapB.x + $num512 / 2;
            var ty: number = this.w_mapB.y + $num512 / 2;
            var pos = new Vector3D
            pos.x = (($v2.x - tx) * 2) / $num512 * this.minMapRect.width;
            pos.z = ((ty - $v2.y) * 2) / $num512 * this.minMapRect.width;

            return pos
        }

        private clearNpc(): void {
            while (this.npcSpriteList.length) {
                var $tempVo: NpcNameAndIcon = this.npcSpriteList.pop()
                this.removeChild($tempVo.pointUi)
                this.removeChild($tempVo.txtUI)
            }
        }


        public upData(): void {
            if (this.minMapRect) {
                this.resetPostion();
                for (var i: number = 0; this.severList && i < this.severList.length; i++) {
                    var $ui: FrameCompenent = this.severList[i]
                    var pos2d: Vector2D = $ui.data;

                    var toPos: Vector2D = new Vector2D()
                    toPos.x = pos2d.x - $ui.width / 2;
                    toPos.y = pos2d.y - $ui.height / 2;

                    var $dis: number = Vector2D.distance(toPos, new Vector2D($ui.x, $ui.y))
                    if ($dis > 1 && $dis < 40) {
                        var kk: Vector2D = new Vector2D(toPos.x - $ui.x, toPos.y - $ui.y)
                        kk.normalize()
                        kk.scaleBy(0.5);
                        $ui.x += kk.x;
                        $ui.y += kk.y;
                    } else {
                        $ui.x = toPos.x;
                        $ui.y = toPos.y;
                    }


                }
            }

        }

        private minMapRect: Rectangle;
        private resetPostion(): void {
            //
            var pos: Vector3D = GameInstance.mainChar.getCurrentPos();
            var pos2d: Vector2D = this.worldPosToUiPos(pos)

            this.c_red.x = pos2d.x - this.c_red.width / 2;
            this.c_red.y = pos2d.y - this.c_red.height / 2;

        }
        private mathMinMapRect(): void {
            var midu: number = AstarUtil.navmeshData.midu;
            var mapW: number = AstarUtil.navmeshData.astarItem[0].length;
            var mapH: number = AstarUtil.navmeshData.astarItem.length;

            var tw: number = AstarUtil.navmeshData.aPos.x + mapW * AstarUtil.navmeshData.midu;
            var th: number = AstarUtil.navmeshData.aPos.z + mapH * AstarUtil.navmeshData.midu;

            tw = Math.max(Math.abs(AstarUtil.navmeshData.aPos.x), Math.abs(tw));
            th = Math.max(Math.abs(AstarUtil.navmeshData.aPos.z), Math.abs(th));
            var bsew: number = Math.max(tw, th)
            bsew += 100
            bsew = Math.round(bsew)
            var $infoRect: Rectangle = new Rectangle();
            $infoRect.x = -bsew;
            $infoRect.y = -bsew;
            $infoRect.width = bsew * 2;
            $infoRect.height = bsew * 2;

            $infoRect.x -= 1
            $infoRect.y -= 1
            $infoRect.width += 2
            $infoRect.height += 2

            $infoRect.width /= 2;
            $infoRect.height /= 2;

            this.minMapRect = $infoRect;
        }
        private loadMapById(): void {
            this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/" + GuidData.map.getMapID() + ".png", this.w_mapB.skinName);
            var vo: tb.TB_map = tb.TB_map.getTB_map(GuidData.map.getMapID())
            LabelTextFont.writeSingleLabel(this._pointRender.uiAtlas, this.a_map_name.skinName, "[ff0000]" + vo.name, 18)
        }
    }
}