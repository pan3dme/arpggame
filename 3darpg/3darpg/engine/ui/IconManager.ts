class IconManager {
    private static _instance: IconManager;
    public static getInstance(): IconManager {
        if (!this._instance) {
            this._instance = new IconManager();
        }
        return this._instance;
    }

    private _dic: Object;
    private _loadDic: Object;

    public constructor() {
        this._dic = new Object;
        this._loadDic = new Object;
    }

    public getIconName(name: string, $fun: Function, $info: any = null): void {
        this.getIcon(geteqiconIconUrl(name), $fun, $info);
    }

    public getIcon(url: string, $fun: Function, $info: any = null): void {
        var uri = Scene_data.fileRoot + url;
        if (this._dic[uri]) {
            if ($info) {
                $fun(this._dic[uri], $info);
            } else {
                $fun(this._dic[uri]);
            }
            return;
        } else if (!this._loadDic[uri]) {
            this._loadDic[uri] = new Array;

            this._loadDic[uri].push({ fun: $fun, info: $info });

            var _img: any = new Image();
            _img.onload = () => {
                var loadList: any = this._loadDic[uri]
                for (var i: number = 0; i < loadList.length; i++) {
                    var obj: any = loadList[i];
                    if (obj.info) {
                        obj.fun(_img, obj.info);
                    } else {
                        obj.fun(_img);
                    }
                    //loadList[i](_img);
                }
                delete this._loadDic[uri];
                this._dic[uri] = _img;
            }
            _img.src = uri;
        } else {
            this._loadDic[uri].push({ fun: $fun, info: $info });
        }


    }

    public drawLoadImg($ui: UICompenent, $url: string): void {

    }

    /**绘制原型图标 
     * type 0 野怪 1 法宝 2 技能 3角色
     * 
    */
    public drawCircleIcon($ui: UICompenent, $type: number, $id: number, gray: boolean = false, $data: any = null, $select: boolean = false): void {
        var url: string = ""
        if ($type == 0) {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($id);
            url = geteqiconIconUrl(obj.icon);
        } else if ($type == 1) {

        } else if ($type == 2) {
            var objskill: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
            url = getSkillIconUrl(String(objskill.icon))
        } else if ($type == 3) {
            url = getRoleIconUrl("1");
        }

        IconManager.getInstance().getIcon(url,
            ($img) => {
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 60, 60);

                if (gray) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
                }

                if ($select) {
                    UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                }

                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        if ($type == 2 && $data > 0) {
            var skillObj: any = new Object;
            skillObj.baseData = objskill
            skillObj.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, objskill.uplevel_id[0] + $data - 1);
            skillObj.lev = $data;
            $ui.data = skillObj;
            $ui.addEventListener(InteractiveEvent.Up, this.itemSkillClick, this);
        }
    }

    /**
     * 绘制坐骑头像74*74
     * @param  $ui
     * @param  $id
     * @param gray 
     * @param select 
     */
    public drawMountIcon($ui: UICompenent, $id: number, gray: boolean = false, select: boolean = false): void {
        // var objskill: tb.TB_skill_base = tb.TB_skill_base.get_TB_skill_base($id);
        // var url: string = getSkillIconUrl(String(objskill.icon))

        IconManager.getInstance().getIcon(getMountIconUrl(String($id)),
            ($img) => {
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG68, new Rectangle(3, 3, 68, 68), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 6, 6, 62, 62);

                if (gray) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 74, 74));
                    UiDraw.cxtDrawImg(ctx, PuiData.A_CHAIN, new Rectangle(4, 4, 65, 65), UIData.publicUi);
                }

                if (select) {
                    UiDraw.cxtDrawImg(ctx, PuiData.CIRCL74, new Rectangle(0, 0, 74, 74), UIData.publicUi);
                }


                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
    }

    /**
     * 绘制58*58的技能图标
     */
    public drawMinSkillIcon($ui: UICompenent, $id: number, gray: boolean = false, lev: number = 1): void {
        var objskill: any = TableData.getInstance().getData(TableData.tb_skill_base, $id);
        var url: string = getSkillIconUrl(String(objskill.icon))

        IconManager.getInstance().getIcon(url,
            ($img) => {
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                UiDraw.cxtDrawImg(ctx, PuiData.SKILL_BG58, new Rectangle(0, 0, 58, 58), UIData.publicUi);
                ctx.drawImage($img, 0, 0, $img.width, $img.height, 4, 4, 50, 50);

                if (gray) {
                    UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 58, 58));
                }

                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
        var skillObj: any = new Object;
        skillObj.baseData = objskill
        skillObj.levData = TableData.getInstance().getData(TableData.tb_skill_uplevel, objskill.uplevel_id[0] + lev - 1);
        skillObj.lev = lev;
        $ui.data = skillObj;
        $ui.addEventListener(InteractiveEvent.Up, this.itemSkillClick, this);
    }

    public drawCircleBossIcon($ui: UICompenent, $id: number, $type: number): void {
        var obj: tb.TB_creature_template = tb.TB_creature_template.get_TB_creature_template($id)
        var url: string = "ui/load/npc/" + "tou.png";
        IconManager.getInstance().getIcon(url,
            ($img) => {
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                if ($type == 1) {
                    UiDraw.cxtDrawImg(ctx, PuiData.BOSSBG76, new Rectangle(0, 0, 76, 76), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 8, 8, 60, 60);
                } else {
                    UiDraw.cxtDrawImg(ctx, PuiData.BOSSBG64, new Rectangle(0, 0, 72, 72), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 8, 8, 56, 56);
                }



                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
    }

    public drawTxtLabel($ui: UICompenent, $str: string): void {
        var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
        var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

        UiDraw.cxtDrawImg(ctx, PuiData.TXTBG, new Rectangle(0, 0, $rec.pixelWitdh, $rec.pixelHeight), UIData.publicUi);

        LabelTextFont.writeSingleLabelToCtx(ctx, $str, 16, $rec.pixelWitdh - ctx.measureText($str).width - 15, 5, TextAlign.LEFT, ColorType.Orange7a2f21);
        $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);

    }

    public drawCostTxtLabel($ui: UICompenent, $str: string): void {

    }

    public drawSkillIcon($ui: UICompenent): void {

    }

    public clearItemEvent($ui:UICompenent){
        $ui.data = null;
        $ui.removeEventListener(InteractiveEvent.Up, this.itemClick, this);
    }

    public drawItemIcon60($ui: UICompenent, id: number, num: number = 0, gray: boolean = false, hasTips: boolean = true): void {

        if (id > 0) {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon,
                ($img) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 68, 68), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 60, 60);
                    
                    if(obj.type == 1){//装备
                        UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4, 4, 41, 17), UIData.publicUi);
                        ArtFont.getInstance().writeFontToCtxCenten(ctx,String(obj.level),ArtFont.num63,18,4,4);
                    }

                    if (num > 1) {
                        var strNum: string = Snum(num)
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, strNum, 16, 64, 45, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    }
                    if (gray) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 68, 68));
                    }
                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            if (hasTips) {
                $ui.data = obj;
                $ui.addEventListener(InteractiveEvent.Up, this.itemClick, this);
            }
        } else {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0, 0, 68, 68), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

    }
    public drawItemIcon40($ui: UICompenent, id: number, num: number = 0, gray: boolean = false, hasTips: boolean = true): void {
        if (id > 0) {
            var obj: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(id);
            IconManager.getInstance().getIconName(obj.icon,
                ($img) => {
                    var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                    var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                    UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 48, 48), UIData.publicUi);
                    UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr(obj.quality), new Rectangle(0, 0, 48, 48), UIData.publicUi);
                    ctx.drawImage($img, 0, 0, 60, 60, 4, 4, 40, 40);
                    
                    if (num > 1) {
                        var strNum: string = Snum(num)
                        LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, strNum, 12, 44, 30, TextAlign.RIGHT, ColorType.Whitefff4d6, ColorType.colord27262e);
                    }

                    if (gray) {
                        UIManager.getInstance().makeCtxToGray(ctx, new Rectangle(0, 0, 48, 48));
                    }

                    $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                });
            if (hasTips) {
                $ui.data = obj;
                $ui.addEventListener(InteractiveEvent.Up, this.itemClick, this);
            }
        } else {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

            UiDraw.cxtDrawImg(ctx, PuiData.PropBg40, new Rectangle(0, 0, 48, 48), UIData.publicUi);
            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }
    }

    public drawVip($ui: UICompenent, vip: number): void {
        IconManager.getInstance().getIcon(getVipIconUrl(vip),
            ($img: any) => {
                var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);

                ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $img.width, $img.height);

                $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
            });
    }

    public itemClick($e: InteractiveEvent): void {
        var itemData: any = $e.target.data;
        var bag: BagItemData = new BagItemData();
        bag.entryData = itemData;
        var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        evt.data = bag;
        evt.buttonType = -1;
        ModuleEventManager.dispatchEvent(evt);
    }

    public itemSkillClick($e: InteractiveEvent): void {
        var skillData: any = $e.target.data;
        var evt: charbg.ItemTipEvent = new charbg.ItemTipEvent(charbg.ItemTipEvent.SHOW_TIP_ITEM_EVENT);
        evt.data = skillData;
        evt.buttonType = 7;
        ModuleEventManager.dispatchEvent(evt);
    }


}
