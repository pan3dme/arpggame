module mapnew {

    export class MapClikVo {
        public pic: FrameCompenent;
        public txt: FrameCompenent;
        public id: number;
        public tb_world_map: tb.TB_world_map
        public isOpen:boolean
        public constructor() {
        }
        public draw($uiAtlas: UIAtlas): void {
            LoadManager.getInstance().load(Scene_data.fileRoot + "ui/load/map/world/" + (this.tb_world_map.mapid) + ".png", LoadManager.IMG_TYPE,
                ($img: any) => {
                    var $toRect: Rectangle = this.pic.getSkinCtxRect()
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                    this.isOpen = true;
                    if (!this.isOpen) {
                        UIManager.getInstance().makeCtxToGray($ctx, new Rectangle(0, 0, $toRect.width, $toRect.height));
                    }

                    this.pic.drawToCtx($uiAtlas, $ctx);
                });
          //  this.drawLabel($uiAtlas)
        }
        private drawLabel($uiAtlas: UIAtlas): void
        {

           
            var $toRect: Rectangle = this.txt.getSkinCtxRect()
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, ColorType.Whitefff4d6 + tb.TB_map.getTB_map(this.tb_world_map.mapid).name, 16);
            this.txt.drawToCtx($uiAtlas, $ctx);

        }
    }

    export class MapNewWorldPanel extends WindowMinUi {

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
        private upDataFun: Function

        public applyLoad(): void {

            this._topRender.setInfo("ui/uidata/mapnew/mapnew.xml", "ui/uidata/mapnew/mapnew.png", () => { this.loadConfigCom() });

        }
        private b_aer_map_but: UICompenent;
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this._topRender.uiAtlas;
            this._midRender.uiAtlas = this._topRender.uiAtlas;
            this.bigPic.uiAtlas = this._topRender.uiAtlas;

            this.b_aer_map_but= this.addEvntButUp("b_aer_map_but",this._topRender)


            this.loadBigPicByUrl("ui/load/map/bigworld.jpg")

            this.resetPicData();
            this.applyLoadComplete();

        }
        private wIconItem: Array<MapClikVo>;
        private resetPicData(): void
        {
            var $uiPosList: Array<tb.TB_world_map> = tb.TB_world_map.getItem();
            this.wIconItem = new Array()
            for (var i: number = 0; i < $uiPosList.length; i++) {
                var $vo: MapClikVo = new MapClikVo()
                $vo.tb_world_map = $uiPosList[i];
                $vo.id = i;

                $vo.txt = <FrameCompenent>this._topRender.getComponent("w_label");
                $vo.txt.goToAndStop($vo.id);
                this.addChild($vo.txt);
                $vo.pic = <FrameCompenent>this.addEvntButUp("w_icon", this._topRender);
                $vo.pic.data = $vo
                $vo.pic.goToAndStop(i);


                $vo.pic.x = $vo.tb_world_map.x * 0.95-35;
                $vo.pic.y = $vo.tb_world_map.y*0.95-40;

                $vo.txt.x = $vo.pic.x-15;
                $vo.txt.y = $vo.pic.y + $vo.pic.height;

        
                this.wIconItem.push($vo);

            }
        }
 
        public bigPicUI: UICompenent
        public loadBigPicByUrl($url: string): UICompenent {
            this.bigPic.setImgUrl($url);
            if (!this.bigPicUI) {
                this.bigPicUI = this.addChild(this.bigPic.getComponent("b_world_map_pic"));
            }
            return this.bigPicUI;
        }
        protected butClik(evt: InteractiveEvent): void {
            
            switch (evt.target) {
                case this.e_close:
                    this.hide()
                    break;
                case this.b_aer_map_but:
                    this.hide();
                    ModuleEventManager.dispatchEvent(new mapnew.MapNewEvent(mapnew.MapNewEvent.SHOW_MAP_NEW_EVENT));
                    break

                default:
                    if (evt.target.data instanceof MapClikVo) {
                        var $vo: MapClikVo = evt.target.data;

                        if ($vo.tb_world_map.mapid != GuidData.map.tbMapVo.id && $vo.isOpen) {
                            this.hide()
                            NetManager.getInstance().protocolos.teleport_map($vo.tb_world_map.mapid, GuidData.map.getLineID());
                        } else {
                            console.log("当前地图不传")
                        }
                    }
                    break
            }

        }
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
        public show(): void
        {
            for (var i: number = 0; i < this.wIconItem.length; i++) {
                this.wIconItem[i].draw(this._topRender.uiAtlas);
            }
            UIManager.getInstance().addUIContainer(this);

   
        }
    }
}