module gift {

    export class GiftCell {
        private _id: number;
        private data: GiftSendVo;
        private cell_clear: UICompenent;
        private perent: UIPanel;
        private midRender: UIRenderComponent;
        private topRender: UIRenderComponent;
        private ui: FrameCompenent;
        public constructor($midRender: UIRenderComponent, $topRender: UIRenderComponent, $perent: UIPanel,$frameId:number) {
            this.midRender = $midRender;
            this.topRender = $topRender;
            this.perent = $perent;
            this.ui = <FrameCompenent>this.perent.addChild(this.midRender.getComponent("a_gift_frame"));
            this.ui.goToAndStop($frameId);
            this.ui.addEventListener(InteractiveEvent.Down, this.frameDown, this);
            this.ui.addEventListener(InteractiveEvent.Up, this.frameUp, this);
            this.cell_clear = this.perent.addChild(this.topRender.getComponent("a_cell_clear"));
            this.cell_clear.addEventListener(InteractiveEvent.Down, this.clearDown, this);
            this.cell_clear.addEventListener(InteractiveEvent.Up, this.clearUp, this);
            this._id = $frameId;//初始给独立ID
            this.updataFun = (t: number) => { this.updata(t) }
        }
        private updataFun: Function;
        private downPos: Vector2D;
        private downTime: number;
        private lastNum: number;
        private frameDown(evt: InteractiveEvent): void {
     
            
            if (this.data) {
                this.clearDown(evt);
                this.downUiPos = new Vector2D(this.ui.x, this.ui.y)
                this.downTime = TimeUtil.getTimer();
                this.lastNum = this.data.num;

                if (GiftModel.getInstance().isCanAddGiffById(this.id)) {
                    TimeUtil.addFrameTick(this.updataFun);
                    Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
                }
                this.select = true;
                this.draw();
                (<GiftPanel>this.perent).cellDownById(this);
            }
        }
        private downUiPos:Vector2D
        private A_left_bg_MouseUp(evt: InteractiveEvent=null): void
        {
            TimeUtil.removeFrameTick(this.updataFun);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
        }
        private updata(t: number): void
        {
            if (this.ui.x == this.downUiPos.x && this.ui.y == this.downUiPos.y) {
                var $useTm: number = (TimeUtil.getTimer() - this.downTime)-300;
                $useTm = Math.max(0, $useTm);
                if ($useTm > 0) {
                    if ($useTm < 3000) {
                        this.data.num = Math.min(this.lastNum + Math.floor($useTm / 10), this.data.has);
                    } else {
                        this.data.num = this.data.has
                    }
                    this.dispatchEventTo();
                    this.draw();
                }
            } else {
                this.A_left_bg_MouseUp()
            }
        }
        
        private frameUp(evt: InteractiveEvent): void {
            if (this.downPos && this.downPos.x == evt.x && this.downPos.y == evt.y) {
                if (this.data && this.data.num < this.data.has) {
                    if (GiftModel.getInstance().isCanAddGiffById(this.id)) {
                        console.log(this.id, "+++");
                        this.data.num++
                        this.dispatchEventTo();
                        this.draw()
                        UIManager.popClikNameFun("a_gift_frame");
                    } else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "不能选择大于4种礼物", 99)
                    }
               }
               
            }
        }
        private clearDown(evt: InteractiveEvent): void {
            (<GiftPanel>this.perent).A_left_bg_MouseDown(evt);
            this.downPos = new Vector2D(evt.x, evt.y)
        }
        private clearUp(evt: InteractiveEvent): void {
            if (this.downPos.x == evt.x && this.downPos.y == evt.y) {
                if (this.data) {
                    console.log(this.id, "clear");
                    this.data.num = 0
                    this.dispatchEventTo();
                    this.draw()
                }
            }
        }
        private dispatchEventTo(): void
        {
            ModuleEventManager.dispatchEvent(new GiftEvent(GiftEvent.REFRISH_CHANGE_CELL_DATA));

        }
        public set x(value: number) {
            this.ui.x = value
            this.cell_clear.x = value+70
        }
        public set y(value: number) {
            this.ui.y = value
            this.cell_clear.y = value-0
        }
        public set id(value: number) {
            if (this._id != value) {
                this._id = value;
                this.refresh()
            }
        }
   
        public refresh(): void {
            this.data = GiftModel.getInstance().getResouceById(this._id);
            this.draw();
        }

        public select:boolean=false
        public draw(): void {

            this.perent.setUiListVisibleByItem([this.cell_clear], false);
            if (this.data) {
                console.log("绘制", this._id);
                IconManager.getInstance().getIcon(GameData.getIconCopyUrl(this.data.tb_item_template.avatar),
                    ($img: any) => {
                        if (this.data) {
                            var $toRect: Rectangle = this.ui.getSkinCtxRect()
                            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);

                            UiDraw.cxtDrawImg($ctx, this.select ? "TBg12" : "TBg11", new Rectangle(2, 1, 116, 128), UIData.publicUi);

                            UiDraw.cxtDrawImg($ctx, PuiData.PropBg60, new Rectangle((120 - 66) / 2, 10, 66, 66), UIData.publicUi);

                            $ctx.drawImage($img, (120 - 66) / 2 + 5, 10 + 5, 56, 56);

                            var $color: string = ColorType.Orange853d07;
                            console.log(this.data)
                            if (this.data.has == 0) {
                                $color = ColorType.Orange853d07
                            } else {
                                if (this.data.has == this.data.num) {
                                    $color = "[ff0000]"
                                }
                            }
                            LabelTextFont.writeSingleLabelToCtx($ctx, $color + this.data.num + "/" + this.data.has, 16, $toRect.width / 2, $toRect.height - 16 - 10, TextAlign.CENTER);
                            LabelTextFont.writeSingleLabelToCtx($ctx, this.data.tb_item_template.getColorName(), 16, $toRect.width / 2, $toRect.height - 35 - 10, TextAlign.CENTER);
                            this.perent.setUiListVisibleByItem([this.cell_clear], this.data.num > 0);
                            this.ui.drawToCtx(this.midRender.uiAtlas, $ctx)
                        } 
                    });
               
            }

        }
        public get id():number {
            return this._id;
        }

    }

    export class GiftPanel extends WindowMinUi {


        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private _cellMidRender: UIRenderComponent
        private _cellTopRender: UIRenderComponent

        private uiAtlasComplet: boolean = false

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

            this._cellMidRender = new UIRenderComponent;
            this.addRender(this._cellMidRender);

            this._cellTopRender = new UIRenderComponent;
            this.addRender(this._cellTopRender);

            

            this._midRender.uiAtlas = new UIAtlas;

        }

        public applyLoad(): void {

            this._midRender.uiAtlas.setInfo("ui/uidata/gift/gift.xml", "ui/uidata/gift/gift.png", () => { this.loadConfigCom() });
     
        }
        private empty: UICompenent;
        private a_send_but: UICompenent;
        private a_reward_num0: UICompenent
        private a_reward_num1: UICompenent

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;
            this._cellMidRender.uiAtlas = this._midRender.uiAtlas;
            this._cellTopRender.uiAtlas = this._midRender.uiAtlas;
            

            this.addChild(this._topRender.getComponent("a_tittle"));
   
            this.addChild(this._topRender.getComponent("a_input_bg"));

            this.addChild(this._topRender.getComponent("a_reward_label0"));
            this.addChild(this._topRender.getComponent("a_reward_label1"));


            this.addChild(this._topRender.getComponent("a_input_label"));

            this.addChild(this._topRender.getComponent("a_record_but"));


            this.a_input_txt=    this.addEvntBut("a_input_txt", this._topRender);


            this.addChild(this._bottomRender.getComponent("a_gift_bg"));


            this.a_reward_num0 = this.addChild(this._topRender.getComponent("a_reward_num0"));
            this.a_reward_num1 =this.addChild(this._topRender.getComponent("a_reward_num1"));


            this.a_send_but = this.addEvntButUp("a_send_but", this._topRender);
            this.empty = this.addEvntBut("empty", this._topRender);
            
            
            this.itemList=new Array()
            for (var i: number = 0; i < 12; i++) {
                var $cell: GiftCell = new GiftCell(this._cellMidRender,this._cellTopRender,this,i);
             //   $cell.id = i;
                this.itemList.push($cell);
            }
 
            this.basePos.x = this.empty.x;
            this.basePos.y = this.empty.y;
            this.listMask = new UIMask();
            this.listMask.level=3
            this.listMask.x = this.empty.x;
            this.listMask.y = this.empty.y;
            this.listMask.width = this.empty.width;
            this.listMask.height = this.empty.height;
            this.addMask(this.listMask);
            this._cellMidRender.mask = this.listMask;
            this._cellTopRender.mask = this.listMask;

            this.uiAtlasComplet = true
            this.applyLoadComplete();
          
        }
        private a_input_txt:UICompenent
        private listMask: UIMask;
        private cellWidht:number=119
        private moveTx: number = 0;
        private basePos: Vector2D = new Vector2D(254, 180);
        private showScaloe(): void
        {
            if (GiftModel.getInstance().getResouceLen() > 10) {

                this.moveTx = this.cutFrameNum;
                this.moveTx = Math.min(0, this.moveTx);
                var $big: number = Math.ceil((GiftModel.getInstance().getResouceLen() - 10) / 2) * this.cellWidht * -1;
                this.moveTx = Math.max($big, this.moveTx);


                var $t: number = Math.floor(Math.abs(this.moveTx) / this.cellWidht);
                var $min: number = $t * 2;
                var $max: number = $min + 12;
                for (var i: number = $min; i < $max; i++) {
                    var $cell: GiftCell = this.getCellById(i)  //查找现有的
                    if (!$cell) {
                        $cell = this.getOutCell($min, $max); //找一个空的
                        if ($cell) {
                            $cell.id = i;
                        }
                    }
                }
                //  this.cutFrameNum = Math.min(0 + 60, this.cutFrameNum);
                //  this.cutFrameNum = Math.max($big - 60, this.cutFrameNum);
                if (this.cutFrameNum > 0) {
                    this.cutFrameNum = this.cutFrameNum / 4
                }
                if (this.cutFrameNum < $big) {
                    this.cutFrameNum = $big + (this.cutFrameNum - $big) / 4
                }
                for (var i: number = 0; i < this.itemList.length; i++) {
                    var $cell: GiftCell = this.itemList[i];
                    var $toPos: Vector2D = new Vector2D()
                    $toPos.x = Math.floor($cell.id / 2) * this.cellWidht + this.basePos.x + this.cutFrameNum;
                    $toPos.y = Math.floor($cell.id % 2) * 130 + this.basePos.y + 0;
                    $cell.x = $toPos.x;
                    $cell.y = $toPos.y;
                    if ($cell.id >= GiftModel.getInstance().getResouceLen()) {
                        $cell.x = 1000
                    }
                }
            } else {
                for (var i: number = 0; i < 10; i++) {
                    var $cell: GiftCell = this.getCellById(i)  //查找现有的
                    $cell.id = i;

                    var $toPos: Vector2D = new Vector2D()
                    $toPos.x = Math.floor($cell.id / 2) * this.cellWidht + this.basePos.x 
                    $toPos.y = Math.floor($cell.id % 2) * 130 + this.basePos.y + 0;
                    $cell.x = $toPos.x;
                    $cell.y = $toPos.y;
                }
            }
        }
        private selectCellVo: GiftCell;
        public cellDownById($cell: GiftCell): void {
            if (this.selectCellVo) {
                if (this.selectCellVo != $cell){
                    this.selectCellVo.select=false
                    this.selectCellVo.draw();
                }
            }
            this.selectCellVo = $cell;

        }
        private resetToCellPos(): void
        {
            var $toTx:number
            $toTx = Math.min(0, this.cutFrameNum);
            var $big: number = Math.ceil((GiftModel.getInstance().getResouceLen() - 10) / 2) * this.cellWidht * -1;
            $toTx = Math.max($big, $toTx);
            this._pxleft = this.cutFrameNum;
            TweenMoveTo(this, 0.1, { pxleft: $toTx });

        }
        private _pxleft:number=0
        public set pxleft(value: number) {
            this._pxleft = value
            this.cutFrameNum = this._pxleft;
            this.showScaloe();
        }
        public get pxleft(): number {
            return this._pxleft
        }

        private getCellById($id: number): GiftCell
        {
            for (var i: number = 0; i < this.itemList.length; i++) {
                var $cell: GiftCell = this.itemList[i];
                if ($cell.id == $id) {
                    return $cell
                }
            }
            return null
        }
        private getOutCell($min: number, $max: number): GiftCell
        {
            var $outCell: GiftCell
            for (var i: number = 0; i < this.itemList.length; i++) {
                var $cell: GiftCell = this.itemList[i];
                if ($cell.id < $min || $cell.id >= $max) {
                    $outCell = $cell
                }
            }
            return $outCell
        }
        private itemList: Array<GiftCell>;
        public refresh(): void {
          
            GiftModel.getInstance().refrishResouce()
            for (var i: number = 0; i < this.itemList.length; i++) {
                var $cell: GiftCell = this.itemList[i];
                $cell.refresh();
            }
           
            this.showScaloe();
            this.refreshCellData();

            this._msgTxt = "请输入文字..";
            this.writeInputTxt()
        }
        private writeInputTxt(): void
        {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_input_txt.skinName, this._msgTxt, 16, TextAlign.LEFT,ColorType.Orange853d07)
        }
        public refreshCellData(): void {

             LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_reward_num0.skinName,ColorType.colorce0a00+ GiftModel.getInstance().getResouceRewardNow(), 16, TextAlign.LEFT);
             LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_reward_num1.skinName, ColorType.colorce0a00 + GiftModel.getInstance().getResouceRewardEx(), 16, TextAlign.LEFT);

      
        }
        protected butClik(evt: InteractiveEvent): void {
        
            switch (evt.target) {
                case this.e_close:
                    this.hide();
                    break
                case this.empty:
                    this.A_left_bg_MouseDown(evt)
                    break
                case this.a_send_but:
                    UIManager.popClikNameFun("a_send_but");
                    var $infoStr: string = this._msgTxt;
                    if (this._msgTxt == "请输入文字.." || this._msgTxt.length == 0) {
                        $infoStr = "此玩家没有留言~";
                    }
                    var $temp: boolean = GiftModel.getInstance().sendGiftToServer($infoStr);
                    if ($temp) {
                        this.hide();
                    } else {
                        msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "请选赠送礼物", 99)
                    }
                    break;
                case this.a_input_txt:
                    if (this._msgTxt == "请输入文字..") {
                        this._msgTxt=""
                    }
                    InputPanel.show(($str: string) => { this.inputBfun($str) }, this._msgTxt)
                    break
                default:
                    break

            }
        }
        public _msgTxt: string = "请输入文字.."
        private inputBfun($str: string): void {
           
            this._msgTxt = $str;
            if (this._msgTxt == "") {
                this._msgTxt = "请输入文字..";
            }
            this.writeInputTxt();

        }

        private cutFrameNum:number=0
        private _lastMouseX: number = 0;
        private _lastRoleRotatioinY: number = 0;
        public A_left_bg_MouseDown(evt: InteractiveEvent): void {

            if (GiftModel.getInstance().getResouceLen() > 10) {
                this._lastMouseX = evt.x;
                this._lastRoleRotatioinY = this.cutFrameNum

                Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
                Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
            }

        }
        private A_left_bg_MouseMove(evt: InteractiveEvent): void {
            this.cutFrameNum = this._lastRoleRotatioinY + (evt.x - this._lastMouseX)/UIData.Scale;
            this.showScaloe();
        }
        private A_left_bg_MouseUp(evt: InteractiveEvent): void {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.A_left_bg_MouseMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.A_left_bg_MouseUp, this);
            this.resetToCellPos()
        }
  
        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

    }
}