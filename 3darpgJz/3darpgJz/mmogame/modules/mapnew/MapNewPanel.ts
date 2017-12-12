module mapnew {

    export class MapnewLisDataMesh
    {
        public type: number
        public txt: string
        public data: any;


    }

    export class MapnewListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private G_BG: UICompenent;

        private G_NAME: UICompenent;



        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {

            super.create($container, $bgRender, $baseRender, $customizeRenderAry);



            this.G_BG = this.creatGrid9SUI($bgRender, MapnewListRender.baseAtlas, "G_BG", 2, 0, 170, 34, 5, 5);
            $container.addChild(this.G_BG);
            this.G_BG.addEventListener(InteractiveEvent.Up, this.butClik, this);


            this.G_NAME = this.creatSUI($baseRender, MapnewListRender.baseAtlas, "G_NAME", 35, 8, 100, 18);
            $container.addChild(this.G_NAME);

       


        }
        private butClik(evt: any): void {
          
            if (this.itdata && this.itdata.data) {
                if (!UIManager.getInstance().disMoveNnum(new Vector2D(evt.x, evt.y), 10)) {
                    return;
                }
                this.setSelect();
                var $MapNewEvent: MapNewEvent = new MapNewEvent(MapNewEvent.SELECT_MAP_NEW_CELL)
                $MapNewEvent.data = this.itdata.data
                ModuleEventManager.dispatchEvent($MapNewEvent);

            }
        }

        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                this.applyRender();
            } else {
                this.setnull();
            }
        }
        private setnull(): void {
            this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName)
            this.uiAtlas.clearCtxTextureBySkilname(this.G_NAME.skinName)

        }
        public set selected(val: boolean) {
            this._selected = val;
            this.applyRender();
            if (val) {
                if (this.itdata && this.itdata.data) {
            
                }
            }
        }
        public get selected(): boolean {
            return this._selected;
        }
        private applyRender(): void {
            if (this.itdata && this.itdata.data) {

                var $MapnewLisDataMesh: MapnewLisDataMesh = this.itdata.data

                if (this.itdata.id % 2 == 0) {
                    UiDraw.uiAtlasDrawImg(this.uiAtlas, this.G_BG.skinName, UIData.publicUi, PuiData.LISTITEMBG);
                } else {
                    this.uiAtlas.clearCtxTextureBySkilname(this.G_BG.skinName);
                }

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.G_NAME.skinName, $MapnewLisDataMesh.txt, 16, TextAlign.CENTER);
            }
        }

    }



    export class MapNewList extends SList {

        public constructor() {
            super();
        }
        public init($uiAtlas: UIAtlas): void {
            MapnewListRender.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, MapnewListRender, 175, 35 * 6 , 175, 35, 6, 128, 1024, 1, 9);
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }

        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }


    export class MapNewPanel extends WindowMinUi {

        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public mapWalkLineComponent:map. MapWalkLineComponent


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

            this.mapWalkLineComponent = new map. MapWalkLineComponent;
            this.addRender(this.mapWalkLineComponent)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender);
            this.upDataFun = () => { this.upDataFrame() }
        }
        private upDataFun:Function

        public applyLoad(): void {

            this._topRender.setInfo("ui/uidata/mapnew/mapnew.xml", "ui/uidata/mapnew/mapnew.png", () => { this.loadConfigCom() });
  
        }
        private a_big_pic_bg:UICompenent
        private a_map_pic: UICompenent;
        private a_self_pos_point: UICompenent;
        private a_map_name_txt: UICompenent;
        private a_right_list_bg: UICompenent;
        private a_word_map_enter:UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;

            this.addChild(this._topRender.getComponent("a_map_name_bg"));
            this.a_big_pic_bg=   this.addChild(this._midRender.getComponent("a_big_pic_bg"));

            this.a_map_pic = this.addEvntBut("a_map_pic",this._midRender)
            this.a_map_pic.x = this.a_big_pic_bg.x+3;
            this.a_map_pic.y = this.a_big_pic_bg.y + 3;

            this.a_word_map_enter = this.addEvntButUp("a_word_map_enter", this._topRender);


            this.a_map_name_txt = this.addChild(this._topRender.getComponent("a_map_name_txt"));
            this.addChild(this._topRender.getComponent("a_left_bg_line"));

            this.a_self_pos_point = this.addChild(this._topRender.getComponent("a_self_pos_point"));


            this.a_right_tab_0 = <FrameCompenent>this.addEvntButUp("a_right_tab_0",this._midRender)
            this.a_right_tab_1 = <FrameCompenent>this.addEvntButUp("a_right_tab_1", this._midRender)



            this.a_tab_name0=  this.addChild(this._topRender.getComponent("a_tab_name0"));
            this.a_tab_name1 = this.addChild(this._topRender.getComponent("a_tab_name1"));

            this.a_right_list_bg = this.addChild(this._bottomRender.getComponent("a_right_list_bg"));

            
            this.initList()
            this.applyLoadComplete();



        }
        private a_tab_name0: UICompenent;
        private a_tab_name1: UICompenent;

        private mapNewList: MapNewList
        private initList(): void {
            this.mapNewList = new MapNewList;
            this.mapNewList.init(this._midRender.uiAtlas)

        }
        public show(): void {
            UIManager.getInstance().addUIContainer(this);
            this.mapNewList.show();
            this.refrish();
            this.setTabType(1)
            NetManager.getInstance().protocolos.show_map_line()
            TimeUtil.addTimeTick(50, this.upDataFun);
       
        }
        private refrish(): void {
            this.mapWalkLineComponent.makeLineUiItem(null)
            this.mathMinMapRect();
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_map_name_txt.skinName, ColorType.Yellowffe9b4 + GuidData.map.tbMapVo.name, 16)
            this._topRender.uiAtlas.upDataPicToTexture("ui/load/map/" + GuidData.map.getMapID() + ".jpg", this.a_map_pic.skinName);
        }
        private typeNum:number
        private setTabType(value: number): void
        {
            if (this.typeNum == value) {
                return;
            }

            this.typeNum = value
            this.mapNewList.refreshData(new Array());
            if (value == 0) {
                this.a_right_tab_0.goToAndStop(1);
                this.a_right_tab_1.goToAndStop(0);
                this.a_right_tab_1.y = 360
                this.a_right_list_bg.y = 135
                NetManager.getInstance().protocolos.show_map_line()
            } else {
                this.a_right_tab_0.goToAndStop(0);
                this.a_right_tab_1.goToAndStop(1);
                this.a_right_tab_1.y = 140
                this.a_right_list_bg.y = 175

                this.getMapCharList()
            }
            this.a_tab_name0.y = this.a_right_tab_0.y + 8;
            this.a_tab_name1.y = this.a_right_tab_1.y + 8;
            this.resize()

        }
        private getMapCharList(): void
        {
            var $mapId: number = GuidData.map.getMapID()
            var $itemArr: Array<SListItemData> = new Array();
            var $tb_map_navigation: tb.TB_map_navigation = tb.TB_map_navigation.get_TB_map_navigation($mapId);
            for (var i: number = 0; i < $tb_map_navigation.navi.length; i++) {
                var $tb_map_object: tb.TB_map_object = tb.TB_map_object.get_TB_map_object($tb_map_navigation.navi[i]);

                var $cellVo: SListItemData = new SListItemData;

                var $temp: MapnewLisDataMesh = new MapnewLisDataMesh()
                $temp.txt = ColorType.Brown7a2f21 +$tb_map_object.name
                $temp.type = 1;
                $temp.data = $tb_map_object;
                $cellVo.data = $temp;
                $cellVo.id = i
                $itemArr.push($cellVo)

            }
            this.mapNewList.refreshData($itemArr);
        }
        public selectmapOBJ($tb: tb.TB_map_object): void
        {
            console.log("就是这个地方", $tb);

            var pos3d: Vector3D = AstarUtil.getWorldPosByStart2D($tb.position)
            this.sendWalkToPos(pos3d)

        }
        public refreshLine($vo: s2c_send_map_line): void
        {
            var $line_info: line_info = new line_info()
            $line_info.rate = 0;  //默认
            $line_info.lineNo =1
            for (var i: number = 0; i < $vo.info.length; i++) {
                if ($vo.info[i].lineNo == GuidData.map.getLineID()) {
                    $line_info = $vo.info[i];
                }
            }
            var $showStr: string = ColorType.Orange7a2f21 + $line_info.lineNo + "线" + "(" + this.getRateStr($line_info.rate) + ")";
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_tab_name0.skinName, $showStr,18)

            if (this.typeNum == 0) {
                this.mapNewList.refreshData(this.getLineData($vo));
            }
        }
        private getRateStr(value:number): string
        {
            var $rateStr: string = "繁忙";
            if (value < 60) {
                $rateStr = "顺畅";
            } 
            if (value > 95) {
                $rateStr = "拥挤";
            }
            return $rateStr
        }
        private getLineData($vo: s2c_send_map_line): Array<SListItemData>
        {
            var $itemArr: Array<SListItemData> = new Array();

            for (var i: number = 0; i < 10; i++) {
                if ($vo.info[i] || i < 4) {
                    var rate: number = 0
                    if ($vo.info[i]) {
                        rate = $vo.info[i].rate
                    }
                    var $cellVo: SListItemData = new SListItemData;
                    var $temp: MapnewLisDataMesh = new MapnewLisDataMesh()

                  
                    $temp.txt = ColorType.Brown7a2f21 + (i + 1) + "线" + "(" + this.getRateStr(rate) + ")";
                    $temp.type = 0;
                    $temp.data = i+1;
                    $cellVo.data = $temp;
                    $cellVo.id = i

                    $itemArr.push($cellVo)

                }
            }

            return $itemArr
        }
        public resize(): void {
            super.resize();
            if (this.mapNewList) {
                this.mapNewList.left = this.a_right_list_bg.parent.x / UIData.Scale + this.a_right_list_bg.x;
                this.mapNewList.top = this.a_right_list_bg.parent.y / UIData.Scale + this.a_right_list_bg.y+5;
            }

        }
        private a_right_tab_0: FrameCompenent
        private a_right_tab_1: FrameCompenent


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.e_close:
                    this.hide()
                    break;
                case this.a_right_tab_0:
                    this.setTabType(0)
                    break;

                case this.a_right_tab_1:
                    this.setTabType(1)
                    break
                case this.a_word_map_enter:
                    this.hide();
                    ModuleEventManager.dispatchEvent(new mapnew.MapNewEvent(mapnew.MapNewEvent.SHOW_MAP_NEW_WORLD_EVENT));
                    break

                case this.a_map_pic:

                    var hitv2: Vector2D = new Vector2D
                    console.log(this.a_map_pic.x, this.a_map_pic.y)
                    console.log(this.x, this.y)
                    console.log("---------------")
                    hitv2.x = evt.x / UIData.Scale - this.x / UIData.Scale;
                    hitv2.y = evt.y / UIData.Scale - this.y / UIData.Scale;
                    var hitV3: Vector3D = this.uiPosToWorldPos(hitv2)
                    this.sendWalkToPos(hitV3)


                    break



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


                MainCharControlModel.getInstance().setWalkPathFun($item, () => { this.walkPathComplete() })
            }
        }
        public walkPathComplete(): void {
            this.meshToWalkLine(null)
        }
        public meshToWalkLine($arr: Array<Vector2D>): void {
            var $walkItem: Array<Vector2D> = new Array();
            for (var i: number = 0; $arr && i < $arr.length; i++) {
                var pos3d = AstarUtil.getWorldPosByStart2D($arr[i]);
                var pos2d: Vector2D = this.worldPosToUiPos(pos3d);
                $walkItem.push(pos2d)
            }
            this.mapWalkLineComponent.makeLineUiItem($walkItem);
        }
        private uiPosToWorldPos($v2: Vector2D): Vector3D {

            var $num512: number = this.a_map_pic.width
            var tx: number = this.a_map_pic.x + $num512 / 2;
            var ty: number = this.a_map_pic.y + $num512 / 2;
            var pos = new Vector3D
            pos.x = (($v2.x - tx) * 2) / $num512 * this.minMapRect.width;
            pos.z = ((ty - $v2.y) * 2) / $num512 * this.minMapRect.width;

            return pos
        }
    

        private upDataFrame(): void
        {
            if (!this.hasStage) {
                TimeUtil.removeTimeTick(this.upDataFun);
            } else {
                this.resetPostion()
            }

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
        private minMapRect: Rectangle;
        private resetPostion(): void {
            var pos: Vector3D = GameInstance.mainChar.getCurrentPos();
            var pos2d: Vector2D = this.worldPosToUiPos(pos)
            this.a_self_pos_point.x = pos2d.x - this.a_self_pos_point.width / 2;
            this.a_self_pos_point.y = pos2d.y - this.a_self_pos_point.height / 2;

        }
        private worldPosToUiPos(pos: Vector3D): Vector2D {

            var $num512: number = this.a_map_pic.width
            var tx: number = this.a_map_pic.x + $num512 / 2;
            var ty: number = this.a_map_pic.y + $num512 / 2;

            tx = tx + (pos.x / this.minMapRect.width * $num512) / 2
            ty = ty - (pos.z / this.minMapRect.width * $num512) / 2

            return new Vector2D(tx, ty)
        }
        public hide(): void
        {
            this.mapNewList.hide()
            UIManager.getInstance().removeUIContainer(this);
        }
   

    }


}