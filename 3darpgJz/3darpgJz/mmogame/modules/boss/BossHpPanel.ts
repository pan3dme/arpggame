

class BossHpPanel extends UIPanel {

    private _bottomRender: UIRenderComponent;
    private _midRender: UIRenderComponent
    private _topRender: UIRenderComponent

    public constructor() {
        super();
        this.interfaceUI = true
        this.width = UIData.designWidth;
        this.height = UIData.designHeight;
        this.center = 0;
        this.top = 0;

        this._bottomRender = new UIRenderComponent();
        this.addRender(this._bottomRender);

        this._midRender = new UIRenderComponent();
        this.addRender(this._midRender);

        this._topRender = new UIRenderComponent();
        this.addRender(this._topRender);


    }
    protected uiAtlasComplet:boolean=false
    public applyLoad(): void {
        this._topRender.uiAtlas = new UIAtlas;
        this._topRender.uiAtlas.setInfo("ui/uidata/boss/bosshp/bosshp.xml", "ui/uidata/boss/bosshp/bosshp.png", () => { this.loadConfigCom() });
       
    }
    private a_hp_bar: FrameCompenent;
    private a_mide_hp_bg: FrameCompenent;
    private a_rank_but: UICompenent;
    private a_hp_loop_x: UICompenent;
    private a_hp_loop_num: FrameCompenent;
    private loadConfigCom(): void {
        this._bottomRender.uiAtlas = this._topRender.uiAtlas;
        this._midRender.uiAtlas = this._topRender.uiAtlas;

        this.addChild(this._bottomRender.getComponent("a_hp_bg"));
        this.a_boss_name=this.addChild(this._topRender.getComponent("a_boss_name"));
        this.a_boss_lev = this.addChild(this._topRender.getComponent("a_boss_lev"));
        this.a_rank_but = this.addEvntBut("a_rank_but", this._topRender);

        this.a_hp_loop_num = <FrameCompenent>this.addChild(this._topRender.getComponent("a_hp_loop_num"));
        this.a_hp_loop_num.goToAndStop(5)
        this.a_hp_loop_x= this.addChild(this._topRender.getComponent("a_hp_loop_x"));
        
        
        this.a_mide_hp_bg = <FrameCompenent>this.addChild(this._bottomRender.getComponent("a_hp_bar"));

        this.a_hp_bar = <FrameCompenent>this.addChild(this._midRender.getComponent("a_hp_bar"));

        this.uiAtlasComplet = true;
        this.applyLoadComplete();
        this.refresh();
    }
    protected butClik(evt: InteractiveEvent): void {
        if (evt.target == this.a_rank_but) {
            var $bossEvent: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_OFTENRANK_PANEL);
            $bossEvent.data = true;
            ModuleEventManager.dispatchEvent($bossEvent);
        }

    }
    private a_boss_name: UICompenent;
    private a_boss_lev: UICompenent;
    public initUnitData($unit: Unit): void {
        LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_boss_name.skinName, ColorType.Yellowffe9b4 + $unit.getName(), 15);
        LabelTextFont.writeSingleLabel(this._bottomRender.uiAtlas, this.a_boss_lev.skinName, ColorType.Yellowffe9b4 + " Lv:" + $unit.getLevel(), 15);
        this.showRankBut(false)
        //this.setHp(1,0)
    }
    private hpcur: number = 1;
    public setHp(value: number,id:number): void
    {
        this.hpcur = value;
        if (tb.TB_creature_template.get_TB_creature_template(id)) {
            this.hptabelNum = tb.TB_creature_template.get_TB_creature_template(id).hp_num;

        }

        this.refresh();
    }
    public showRankBut(value: boolean): void {
        this.setUiListVisibleByItem([this.a_rank_but],value)
    }
    private hptabelNum:number=2
    private refresh(): void
    {
        if(this.uiAtlasComplet) {
            var hpNum: number = Math.ceil(this.hpcur * this.hptabelNum);
            hpNum = Math.max(0, hpNum)
            hpNum = Math.min(this.hptabelNum, hpNum)
            this.a_hp_loop_num.goToAndStop(hpNum)
            var kn: number = this.hptabelNum - hpNum;
            this.a_hp_bar.goToAndStop((kn%5));
            this.a_mide_hp_bg.goToAndStop((kn +1)%5);
      
            if (this.hpcur < (1 / this.hptabelNum)){
                this.a_mide_hp_bg.goToAndStop(5);
            }
            if (this.hpcur <= 0) {
                this.a_hp_bar.goToAndStop(5);
                return 
            }
       
    

            var sc: number = (this.hpcur - ((this.hptabelNum - 1) - kn) / this.hptabelNum) / (1 / this.hptabelNum);
            sc = Math.max(sc, 0.001)
            sc = Math.min(sc, 1)
            if (sc < this.a_hp_bar.uvScale) {
                TweenMoveTo(this.a_hp_bar, 0.1, { uvScale: sc });
            } else {
                this.a_hp_bar.uvScale = sc;
            }
         
  
       
          
        }
    }


}