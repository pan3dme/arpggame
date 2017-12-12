module leftui {

    export class FamilyLeftUiVo {
        public id: number = 0;
        public rect: Rectangle;
        private perent: UIPanel;
        private uiBasePos: any;

        protected uiList: Array<UICompenent>;
        protected _midRender: UIRenderComponent;
        protected _topRender: UIRenderComponent;
        public constructor($perent: UIPanel, $mid: UIRenderComponent, $top: UIRenderComponent,$data:number) {
            this.perent = $perent;
            this._midRender = $mid;
            this._topRender = $top;
            this.id = $data;
            this.rect = new Rectangle(0, 0, 256, 100);

            this.uiList = new Array();
            this.makeUi();
            this.initBasePos();

        }
        public refresh(): void {
        }
        protected makeUi(): void
        {
            this.addCellBig();

        }
        private addCellBig(): void {
            var w_bg_top: UICompenent = this._midRender.getComponent("w_bg_top");
            var w_bg_mid: UICompenent = this._midRender.getComponent("w_bg_mid");
            var w_bg_bottom: UICompenent = this._midRender.getComponent("w_bg_bottom");

            this.uiList.push(w_bg_top);
            this.uiList.push(w_bg_mid);
            this.uiList.push(w_bg_bottom);

            w_bg_top.x = 2
            w_bg_mid.x = 2
            w_bg_bottom.x = 2
            w_bg_top.y = 0
            w_bg_mid.y = w_bg_top.height
            w_bg_mid.height = this.rect.height - w_bg_top.height - w_bg_bottom.height
            w_bg_bottom.y = this.rect.height - w_bg_bottom.height

        }
        private initBasePos(): void
        {
            this.uiBasePos = new Object();
            for (var i: number = 0; i < this.uiList.length; i++)
            {
                var $ui: UICompenent = this.uiList[i];
                this.uiBasePos[$ui.name] = new Vector2D($ui.x, $ui.y)
            }
        }
        public get_Tb_faction_base(): tb.Tb_faction_base
        {
            return tb.Tb_faction_base.get_Tb_faction_baseById(GuidData.faction.getLev());
        }
        //剩余可获令牌
        public getShenyuLinPai(): number
        {
            var $tb: tb.Tb_faction_base=this.get_Tb_faction_base()
            return $tb.token_daily - GuidData.faction.getBossTokenPointscount();
        }
        public isFullLinPai(): boolean
        {
            var $tb: tb.Tb_faction_base = this.get_Tb_faction_base()
            return GuidData.faction.getBossTokenNum() >= $tb.token_max_keep;
        }
       

    
        public get y():number {
            return this._y;
        }
        private _y: number = 0
        public set y(value:number) {
            this._y = value;
            for (var i: number = 0; i < this.uiList.length; i++) {
                var $ui: UICompenent = this.uiList[i];
                $ui.y = this.uiBasePos[$ui.name].y + this._y
            }
        }
        public clik($evt: InteractiveEvent): boolean {
            for (var i: number = 0; i < this.uiList.length; i++) {
                if (this.uiList[i].testPoint($evt.x, $evt.y)) {
                    console.log(this);
                    this.mouseClik()
                    return true
                }
            }
            return false
        }
        protected mouseClik(): void
        {

        }
        public show(): void {
            this.perent.setUiListVisibleByItem(this.uiList, true)
            this.refresh();
        }
        public hide(): void {
            this.perent.setUiListVisibleByItem(this.uiList, false)
        }
    }

  
   
    export class BoosChallenge extends FamilyLeftUiVo {
   
        protected makeUi(): void {
            this.rect = new Rectangle(0, 0, 256, 90);
            this.uiList.push(this._midRender.getComponent("c_bg"));
        }
    }
    export class FamilyPk extends FamilyLeftUiVo {
   
        private d_attack_name:UICompenent
        protected makeUi(): void {
            this.rect = new Rectangle(0, 0, 256, 30);
            this.uiList.push(this._topRender.getComponent("d_bg"));
            this.d_attack_name = this._topRender.getComponent("d_attack_name")
            this.uiList.push(this.d_attack_name);

            super.makeUi();

        }
        public refresh(): void {
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.d_attack_name.skinName, ColorType.Coffeeff9200 + "荥蒙受或", 14 * 1.5, TextAlign.LEFT, ColorType.Coffeeff9200, "#27262e", 4);
        }
    }

}