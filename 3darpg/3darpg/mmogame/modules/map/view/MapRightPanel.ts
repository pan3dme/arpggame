module map {
    export class MapNpcListItemRender extends ListItemRender {

        public static uiAtlas:UIAtlas
        public draw(): void {
            var $vo:MapMenuVo = this.listItemData.data

            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            //绘制坐骑头像的底色

            var $bgStr: string ="S_base_pic"
            if (!$vo.data) {
                if ($vo.menuType == 0) {
                    $bgStr = "S_pic0"
                }
                if ($vo.menuType == 2) {
                    $bgStr = "S_pic2"
                }
                if ($vo.menuType == 3) {
                    $bgStr = "S_pic3"
                }



            } else {
                if (this.hasLight) {
                    $bgStr = "S_select_pic"
                }
            }
            var $bgRect: any = MapNpcListItemRender.uiAtlas.getRec($bgStr);
            $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, $bgRect.pixelX, $bgRect.pixelY, $bgRect.pixelWitdh, $bgRect.pixelHeight, 0, 0, 200, 40);

            if ($vo.data) {
                // var $color: string = this.hasLight?"[00ffff]":"[ffffff]"
                LabelTextFont.writeSingleLabelToCtx($ctx, "[ffffff]" + $vo.data.name, 18, 100, 10, TextAlign.CENTER)
            } else {
                var yRtc: any = MapNpcListItemRender.uiAtlas.getRec($vo.lock ? "S_down":"S_up");
                $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, yRtc.pixelX, yRtc.pixelY, yRtc.pixelWitdh, yRtc.pixelHeight, 130, 12, 20, 20);
            }
            this.atlas.updateCtx($ctx, this.uvData.ox, this.uvData.oy);
          
            
        }
        protected hasLight: boolean = false;
        public set selected(value: boolean) {

            if (this.hasLight != value) {
                this.hasLight = value;
                this.draw();
            }
        }

    }
    export class MapRightPanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _listRender:UIListRenderComponent
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
        }
        public setRender($bottom: UIRenderComponent, $top: UIRenderComponent,$list:UIListRenderComponent): void {
            this._bottomRender = $bottom;
            this._topRender = $top;
            this._listRender = $list
            MapNpcListItemRender.uiAtlas = this._bottomRender.uiAtlas
            this.loadConfigCom();
        }
        public setTabType(value: number): void
        {
            this.setUiListVisibleByItem(this._uiList,value==0)

            if (value==0) {
                this.showData()
            }
         
        }
        public refreshLine(): void {
            console.log(MapModel.getInstance().mapLineData);
            var $vo: s2c_send_map_line = MapModel.getInstance().mapLineData;

            var $line_info: line_info = new line_info()
            $line_info.rate = 0;  //默认
            $line_info.lineNo = 1;
            for (var i: number = 0; i < $vo.info.length; i++) {
                if ($vo.info[i].lineNo == GuidData.map.getLineID()) {
                    $line_info = $vo.info[i];
                }
            }
            if ($line_info) {
                var $uiRect: UIRectangle = this._bottomRender.uiAtlas.getRec(this.a_line_label_txt.skinName);
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);
                var $rateStr: string = "S_yellow"
                if ($line_info.rate < 60) {
                    $rateStr = "S_green"
                }
                if ($line_info.rate > 95) {
                    $rateStr = "S_red"
                }
                var $bgRect: any = MapNpcListItemRender.uiAtlas.getRec($rateStr);
                $ctx.drawImage(MapNpcListItemRender.uiAtlas.useImg, $bgRect.pixelX, $bgRect.pixelY, $bgRect.pixelWitdh, $bgRect.pixelHeight, 25, 0, $bgRect.pixelWitdh, $bgRect.pixelHeight);
                ArtFont.getInstance().writeFontToCtxCenten($ctx, String(GuidData.map.getLineID()), ArtFont.num1, 10, 0);
                this._bottomRender.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);
            }
   
        }

        private a_win_close: UICompenent
        private _uiList: Array<UICompenent>
        private a_list_tittle: UICompenent
        private a_line_label_txt:UICompenent
        private loadConfigCom(): void {
            this._uiList=new Array()
     

            this.a_list_tittle = this.addEvntBut("a_list_tittle", this._topRender)
            this._uiList.push(this.a_list_tittle);

            this.a_line_label_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_line_label_txt"))
            this._uiList.push(this.a_line_label_txt);
            this._uiList.push(this.addChild(<UICompenent>this._bottomRender.getComponent("a_line_bg")));


            this.a_win_close= this.addEvntBut("a_win_close",this._topRender)

            this.addList();

        }
        private _bgMask: UIMask;
        private _itemlist:List
        private addList(): void {
            var pos: Vector2D = new Vector2D(685, 80);
            this._itemlist = this._listRender.createList();
            this._itemlist.x = pos.x;
            this._itemlist.y = pos.y;
            this.addChild(this._itemlist);
 
            //遮罩
            this._bgMask = new UIMask();
            this._bgMask.x = pos.x;
            this._bgMask.y = pos.y;
            this._bgMask.width = 200;
            this._bgMask.height = 410;
            this.addMask(this._bgMask);

            this._listRender.mask = this._bgMask;
        }
        private _listItemArr: Array<ListItemData> = new Array
        private showData(): void
        {
            var $arr: Array<MapMenuVo> = MapModel.getInstance().getMenuListArr();

            this._listItemArr.length=0
            for (var i: number = 0; i < $arr.length; i++) {
                var $listItemData:ListItemData=new ListItemData
                $listItemData.data = $arr[i];
                $listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                this._listItemArr.push($listItemData)
            }
            this._itemlist.setData(this._listItemArr, MapNpcListItemRender, 200, 40, 256, 1024, 200, 410);
            this._itemlist.contentY = 0
        }
        private itemDataClick($listItemData: ListItemData): void {

            var $vo: MapMenuVo = $listItemData.data;
            if ($vo.data) {
                var pos3d: Vector3D = AstarUtil.getWorldPosByStart2D($vo.data.position)
                this.sendWalkToPos(pos3d)

                for (var i: number = 0; this._listItemArr && i < this._listItemArr.length; i++) {
                    if (this._listItemArr[i] == $listItemData) {
                        this._listItemArr[i].itemRender.selected = true;
                    } else {
                        this._listItemArr[i].itemRender.selected = false
                    }
                }

            } else {
                console.log($vo.menuType)
                MapModel.getInstance().lockItem[$vo.menuType] = !MapModel.getInstance().lockItem[$vo.menuType]
                this.showData();
            }

        }

        private sendWalkToPos($hitPos: Vector3D): void {

            var item: Array<Vector2D> = AstarUtil.findPath3D(GameInstance.mainChar.getCurrentPos(), $hitPos);
            if (item) {
                (<MapPanel>this.parent).mapCetentPanel.meshToWalkLine(item);
                AotuSkillManager.getInstance().aotuWalk = true;
                MainCharControlModel.getInstance().setWalkPathFun(item, () => { this.walkPathComplete() });

         
            }
           
        }
        public walkPathComplete(): void {

            AotuSkillManager.getInstance().aotuWalk = false;
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_win_close:
                    (<MapPanel>this.parent).close()
                    break
                case this.a_list_tittle:
                    (<MapPanel>this.parent).showLinePanel()
                    console.log("显示")
                    break

                default:
                    break;

            }

        }



    
    }
}