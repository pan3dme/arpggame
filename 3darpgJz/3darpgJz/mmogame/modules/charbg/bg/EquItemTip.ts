/**
 * 背包内的装备
 *   */
class EquItemTip extends EquTip {

    public constructor() {
        super();

        this.center = -115;


    }

    public refreshIconName(): void {
        IconManager.getInstance().getIcon(geteqiconIconUrl(this._entryData.icon),
            ($img: any) => {
                var rec: UIRectangle = this._uiAtlas.getRec(this._t_icon.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(this._entryData.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);           
                if(this._entryData.type == 1){//装备
                    UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                    ArtFont.getInstance().writeFontToCtxCenten(ctx,String(this._entryData.level),ArtFont.num63,18,4,4);
                }     
                this._uiAtlas.updateCtx(ctx, rec.pixelX, rec.pixelY);
            });

        LabelTextFont.writeSingleLabel(this._uiAtlas,
            this._t_name.skinName,this._entryData.name, 18, TextAlign.LEFT, this.getColorQua(this._entryData.quality));
    }

    private _useBtn: UICompenent;
    private _changeBtn: UICompenent;
    private _getBtn: UICompenent;
    private _selBtn: UICompenent;

    /**家族仓库 取出按钮 */
    private _quchuBtn: UICompenent;
    /**家族仓库 销毁按钮 */
    private _xiaohuiBtn: UICompenent;

    /**家族仓库 放入按钮 */
    private _shangjiaoBtn:UICompenent;

    public initBtn(): void {

        
        this._useBtn = this._nextRender.getComponent("t_cxh_n");
        this.addChild(this._useBtn);        
        this._useBtn.addEventListener(InteractiveEvent.Down, this.useItem, this);

        this._xiaohuiBtn = this._nextRender.getComponent("t_gh_btn");        
        this._xiaohuiBtn.addEventListener(InteractiveEvent.Down, this.xiaohuiItem, this);

        this._quchuBtn = this._nextRender.getComponent("t_qc_btn");        
        this._quchuBtn.addEventListener(InteractiveEvent.Down, this.quchuItem, this);

        this._shangjiaoBtn = this._nextRender.getComponent("t_sj_btn");        
        this._shangjiaoBtn.addEventListener(InteractiveEvent.Down, this.shangjiaoItem, this);

        this._hasInitBtn = true;

        var gap: number = 50;
        var baseY:number = 30;
        this._useBtn.y = this.height - 50 - baseY;
        this._xiaohuiBtn.y = this.height - gap * 2  - baseY;
        this._quchuBtn.y = this.height - gap  - baseY;
        this._shangjiaoBtn.y = this.height - gap  - baseY;

        this.initBottom();
    }
    private _facLab1:UICompenent;
    private _facVal1:UICompenent;
    private _facIcon1:UICompenent;

    private _facLab2:UICompenent;
    private _facVal2:UICompenent;
    private _facIcon2:UICompenent;

    private _facUIAry:Array<UICompenent>;
    private initBottom():void{
        this._facLab1 = this._nextRender.getComponent("t_fac_lab1");
        this._facVal1 = this._nextRender.getComponent("t_fac_val1");
        this._facIcon1 = this._nextRender.getComponent("t_fac_icon1");

        this._facLab2 = this._nextRender.getComponent("t_fac_lab2");
        this._facVal2 = this._nextRender.getComponent("t_fac_val2");
        this._facIcon2 = this._nextRender.getComponent("t_fac_icon2");

        UiDraw.uiAtlasDrawImg(this._uiAtlas, this._facIcon1.skinName, UIData.publicUi, UIuitl.getInstance().costtype(6));
        UiDraw.uiAtlasDrawImg(this._uiAtlas, this._facIcon2.skinName, UIData.publicUi, UIuitl.getInstance().costtype(6));

        this._facUIAry = [this._facLab1,this._facVal1,this._facIcon1,this._facLab2,this._facVal2,this._facIcon2];
    }

    public addFac():void{
        for(var i:number=0;i<this._facUIAry.length;i++){
            this.addChild(this._facUIAry[i]);
        }
        this.removeChild(this._t_info);
    }
    public removeFac():void{
        for(var i:number=0;i<this._facUIAry.length;i++){
            this.removeChild(this._facUIAry[i]);
        }
        this.addChild(this._t_info);
    }

    public showUpFac():void{
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facLab1.skinName,"上交获得:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facLab2.skinName,"购买消耗:", 14, TextAlign.LEFT, ColorType.coloraa874a);

        this._facVal2.x = this._facVal2.baseRec.x;
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facVal1.skinName,Snum(this._entryData.handInReward[0][1]), 16, TextAlign.LEFT, ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facVal2.skinName,Snum(this._entryData.exchangeCost[0][1]), 16, TextAlign.LEFT, ColorType.colorfde87e);
    }

    public showDownFac():void{
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facLab1.skinName,"购买消耗:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facLab2.skinName,"销毁获得:", 14, TextAlign.LEFT, ColorType.coloraa874a);
        this.removeChild(this._facIcon2);
        this._facVal2.x = this._facIcon2.x;
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facVal1.skinName,Snum(this._entryData.exchangeCost[0][1]), 16, TextAlign.LEFT, ColorType.colorfde87e);
        LabelTextFont.writeSingleLabel(this._uiAtlas,this._facVal2.skinName,"家族资金 " + Snum(this._entryData.destroyReward), 16, TextAlign.LEFT, ColorType.colorfde87e);
    }
    public testGender():boolean{
        if(this._entryData.availableGender){
            var idx:number = this._entryData.availableGender.indexOf(GuidData.player.getCharType());
            return (idx != -1);
        }
        return false;
    }
    public showBtn(): void {
        this.removeAllBtn();

        if (this._needBtn) {
            
            var gap: number = 50;
            var baseY:number = 30;
            if(this._entryData.suitId){
                baseY = 30;
            }else{
                baseY = 150;
            }

            this._xiaohuiBtn.y = this.height - gap * 2  - baseY;
            this._quchuBtn.y = this.height - gap  - baseY;
            this._shangjiaoBtn.y = this.height - gap  - baseY;

            if (this._btnType == 2) {
                if(this.testGender()){
                    this.addChild(this._useBtn);
                    this._t_btn_bg.height = 55;   

                    if(this._entryData.suitId){
                        this._t_btn_bg.y = 373;
                    }else{
                        this._t_btn_bg.y = 253;
                    }
                    
                    this._useBtn.y = this.height - 50 - baseY;

                }else{
                    this._t_btn_bg.y = 100000;
                }
            } else if (this._btnType == 4) {
                this.addChild(this._xiaohuiBtn);
                this.addChild(this._quchuBtn);
                this._t_btn_bg.height = 105;
                this._t_btn_bg.y = 323;
            } else if (this._btnType == 5) {
                this.addChild(this._shangjiaoBtn);
                this._t_btn_bg.height = 55;
                this._t_btn_bg.y = 373;
            }

            this.addChild(this._t_btn_bg);

        }else{
            this.removeChild(this._t_btn_bg);
        }

        if(this._btnType == 4){
            this.addFac();
            this.showDownFac();
        }else if(this._btnType == 5){
            this.addFac();
            this.showUpFac();
        }else{
            this.removeFac();
        }
    }

    private removeAllBtn(): void {
        this.removeChild(this._getBtn);
        this.removeChild(this._selBtn);
        this.removeChild(this._useBtn);
        this.removeChild(this._xiaohuiBtn);
        this.removeChild(this._quchuBtn);
        this.removeChild(this._shangjiaoBtn);
    }


    public useItem(): void {
        if(this._entryData.level > GuidData.player.getLevel()){
            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "等级不足，无法装备", 99);            
            return;
        }
        UIManager.popClikNameFun("t_sy_btn");
        NetManager.getInstance().protocolos.bag_exchange_pos(SharedDef.BAG_TYPE_EQUIP_BAG, this._data.pos, SharedDef.BAG_TYPE_EQUIP, Number(this._entryData.pos));
        this.hide();
    }

    public xiaohuiItem():void{
        var obj:any = TableData.getInstance().getData(TableData.tb_faction_privilege,1);
        if(GuidData.faction.playerIdentity <= obj.destroyItem){
            NetManager.getInstance().protocolos.storehouse_destroy(this._data.pos);
        }else{
            msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "权限不足", 99);
        }
        
    }

    public quchuItem():void{
        if(!hasEnoughRes(this._entryData.exchangeCost[0])) {
            // msgtip.MsgTipManager.outStr(ColorType.colorce0a00 + "家族贡献不足", 99);
            var $aaa = new wintittle.WindowRestTittleEvent(wintittle.WindowRestTittleEvent.SHOW_WINDOW_RES_PANEL);
            $aaa.data = 6
            ModuleEventManager.dispatchEvent($aaa);
            return;
        }
        NetManager.getInstance().protocolos.storehouse_exchange(this._data.pos);
    }

    public shangjiaoItem():void{
         NetManager.getInstance().protocolos.storehouse_hand_in(String(this._data.pos));
    }

}