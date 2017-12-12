module warehousetreasure {

    export class WarehousePanel extends UIVirtualContainer {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public dispose() {
            this._bottomRender.dispose();
            this._bottomRender = null;
            this._midRender.dispose();
            this._midRender = null;
            this._topRender.dispose();
            this._topRender = null;

            if(this.treasurehouseList){
                this.treasurehouseList.dispose();
                this.treasurehouseList = null;
            }
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)
            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

        }

        public treasurehouseList: WarehouseList
        //public treasureLogList: WarehouseLog
        private e_txt_bg_0: UICompenent
        private e_txt_bg_1: UICompenent
        public initView($uiAtlas: UIAtlas): void {

            this._bottomRender.uiAtlas = $uiAtlas
            this._midRender.uiAtlas = $uiAtlas
            this._topRender.uiAtlas = $uiAtlas


            this.e_shangjiao_but = this.addEvntButUp("e_shangjiao_but", this._topRender);


            this.e_txt_bg_0 = this.addChild(this._bottomRender.getComponent("e_txt_bg_0"));
            this.e_txt_bg_1 = this.addChild(this._bottomRender.getComponent("e_txt_bg_1"));


            var e_gonxian_label: UICompenent = this.addChild(this._topRender.getComponent("e_gonxian_label"));
            // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, e_gonxian_label.skinName, ColorType.Brown6a4936 + "贡献:", 16, TextAlign.LEFT);
            var e_cangku_num_label: UICompenent = this.addChild(this._topRender.getComponent("e_cangku_num_label"));
            // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, e_cangku_num_label.skinName, ColorType.Brown6a4936 + "仓库上限:", 16, TextAlign.LEFT);


            // this.e_gonxian_txt= this.addChild(this._topRender.getComponent("e_gonxian_txt"));
            // this.e_cangku_num_txt = this.addChild(this._topRender.getComponent("e_cangku_num_txt"));


            this.treasurehouseList = new WarehouseList(this)

            // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_gonxian_txt.skinName, ColorType.Orange + "99999", 16, TextAlign.CENTER);



        }
        // private e_gonxian_txt: UICompenent;
        // private e_cangku_num_txt: UICompenent;


        private e_shangjiao_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.e_shangjiao_but:
                    // ModuleEventManager.dispatchEvent(new WarehouseEvent(WarehouseEvent.SHOW_WAREHOUSE_UP_PANEL))
                    ModuleEventManager.dispatchEvent(new turnonwarehouse.TurnonWarehouseEvent(turnonwarehouse.TurnonWarehouseEvent.SHOW_TURNON_WAREHOUSE_PANEL))
                    break
                default:
                    break

            }
        }

        public refreshWareBagList(): void {
            if (this.hasStage) {
                this.treasurehouseList.refresh()

                var $list: Array<BagItemData> = GuidData.faction.getFactionStorehouse();
                var $tb: tb.TB_faction_building = faction.FactionBuildModel.getInstance().getTabvo(2)
                var $has: number = 0
                for (var i: number = 0; i < $list.length; i++) {
                    if ($list[i]) {
                        $has++
                    }
                }
                // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_cangku_num_txt.skinName, ColorType.Orange853d07 + $has+"/" + $tb.params[0], 16, TextAlign.CENTER);
                UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.e_txt_bg_0.skinName, [String(-1), $has + "/" + $tb.params[0]], ColorType.Orange853d07, 100, 20);

                UIuitl.getInstance().drawCostUI(this._topRender.uiAtlas, this.e_txt_bg_1.skinName, [6, GuidData.player.getResTypeStr(6)], ColorType.Orange853d07, 83, 20);

                // LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_gonxian_txt.skinName, String(GuidData.player.getResTypeStr(6)), 16, TextAlign.CENTER, ColorType.Orange853d07);
            }
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
                this.treasurehouseList.show();
                this.refreshWareBagList()
            }
        }
        public hide(): void {
            this.treasurehouseList.hide();
            UIManager.getInstance().removeUIContainer(this);

            ModuleEventManager.dispatchEvent(new turnonwarehouse.TurnonWarehouseEvent(turnonwarehouse.TurnonWarehouseEvent.HIDE_TURNON_WAREHOUSE_PANEL))
        }

        public getListItem(): Array<SListItemData> {
            var $ary: Array<string> = GuidData.faction.getFactionStorehouseLog()
            var $backAry: Array<SListItemData> = new Array;
            for (var i: number = $ary.length - 1; i >= 0; i--) {
                var item: SListItemData = new SListItemData;
                item.data = this.getListStr($ary[i]);
                item.id = $backAry.length;;
                $backAry.push(item);
            }
            return $backAry;
        }

        private getListStr($str: string): string {
            //·玩家将道具放入仓库，显示：【玩家名称】将【装备名称】放入仓库					0| playerName | entry
            //·玩家将道具从仓库取出，显示：【玩家名称】将【道具名称】从仓库取出				1| playerName | entry
            //·系统将道具放入仓库，显示：系统奖励 【道具名称】								2 | entry
            //·装备销毁，显示：【玩家名称】将【道具名称】销毁 获得家族资金【N】	
            var $arr: Array<string> = $str.split("|");
            var $showStr: string = $str
            switch (Number($arr[0])) {
                case 0:

                    $showStr = getBaseName($arr[1]) + "将" + this.getEquName($arr[2]) + "放入仓库";
                    break
                case 1:
                    $showStr = getBaseName($arr[1]) + "将" + this.getEquName($arr[2]) + "从仓库取出";
                    break;
                case 2:
                    $showStr = "系统奖励" + this.getEquName($arr[1]);
                    break;
                case 3:
                    $showStr = getBaseName($arr[1]) + "将" + this.getEquName($arr[2]) + "销毁 获得家族资金" + ColorType.Green56da35 + $arr[3];
                    break;
                default:
                    $showStr = $str;
                    break
            }
            return ColorType.Orange853d07 + $showStr
        }
        private getEquName($idStr: string): string {
            var $tb: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(Number($idStr))
            var $str: string = "[" + tb.TB_item_quality_color.getTempVo($tb.quality).color + "]";
            return $str + " " + $tb.name + " " + ColorType.Orange853d07;
        }


    }
}