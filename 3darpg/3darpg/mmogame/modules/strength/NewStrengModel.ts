module strengthgem {

    export class WashVo {
        public partid: number;
        public guid: string;
        public attrary: Array<Array<number>>;
    }

    export class StrengVo {
        public partid: number;
        public partlev: number;
        public state: number;//0:满级 1:非满级
        public curtab: tb.TB_equipdevelop_strength
        public nexttab: tb.TB_equipdevelop_strength
    }

    export class RefiningVo {
        public partid: number;
        public partlevstar: Array<number>;
        public state: number;//0:满级 1:非满级
        public curtab: tb.TB_equipdevelop_refine
        public nexttab: tb.TB_equipdevelop_refine
    }

    export class GemVo {
        public index: number;
        public partid: number;
        public gemid: number;
        public gemlev: number;
        public state: number;// 1:未解锁 2:不可解锁 3:可升级 4:满级
        public curtab: tb.TB_equipdevelop_gem
        public nexttab: tb.TB_equipdevelop_gem
    }


    export class NewStrengModel {
        public constructor() {

        }
        private static _instance: NewStrengModel;
        public static getInstance(): NewStrengModel {
            if (!this._instance) {
                this._instance = new NewStrengModel();
            }
            return this._instance;
        }

        /**
         * 强化数据
         * @param  
         */
        public getstrengvo($part: number): StrengVo {
            var aaa: StrengVo = new StrengVo();
            aaa.partid = $part;
            aaa.partlev = GuidData.grow.getPartStrengLev($part);
            aaa.curtab = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById($part, aaa.partlev);

            var $nexobj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_strength, $part * 1000 + aaa.partlev + 1);

            if ($nexobj) {
                aaa.state = 1;
                aaa.nexttab = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById($part, aaa.partlev + 1);
            } else {
                aaa.state = 0;
            }
            return aaa;
        }


        /**
         * 精炼数据
         * @param  
         */
        public getrefiningvo($part: number): RefiningVo {
            var bbb: RefiningVo = new RefiningVo();
            bbb.partid = $part;
            bbb.partlevstar = GuidData.grow.getPartRefineVo($part);
            bbb.curtab = tb.TB_equipdevelop_refine.get_TB_equipdevelop_refineById($part, bbb.partlevstar[0], bbb.partlevstar[1]);

            if (bbb.curtab.lvup_type == 0) {
                bbb.state = 0;
            } else {
                bbb.state = 1;
                if (bbb.curtab.lvup_type == 2) {
                    bbb.nexttab = tb.TB_equipdevelop_refine.get_TB_equipdevelop_refineById($part, bbb.partlevstar[0] + 1, 1);
                } else {
                    bbb.nexttab = tb.TB_equipdevelop_refine.get_TB_equipdevelop_refineById($part, bbb.partlevstar[0], bbb.partlevstar[1] + 1);
                }
            }
            return bbb;
        }

        /**
         * 镶嵌宝石数据
         * @param  
         */
        public getGemvo($part: number, gemlevary: Array<number> = null): Array<GemVo> {
            var tab = tb.TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById($part);
            //var gemlevary: Array<number> = GuidData.grow.getPartGemVo($part);
            if (!gemlevary) {
                gemlevary = GuidData.grow.getPartGemVo($part);
            }
            var gemvoary: Array<GemVo> = new Array
            for (var index = 0; index < gemlevary.length; index++) {
                var ccc: GemVo = new GemVo();
                ccc.index = index + 1
                ccc.partid = $part;
                ccc.gemid = tab.gem_array[index];
                ccc.gemlev = gemlevary[index];

                var $nextobj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_gem, ccc.gemid * 1000 + ccc.gemlev + 1)

                var needgemlev: number = ccc.gemlev;
                if (ccc.gemlev == 0) {
                    var partlevstar = GuidData.grow.getPartRefineVo($part);
                    if (tab.unlock_strength_lv[index] <= GuidData.grow.getPartStrengLev($part) && partlevstar[0] >= tab.unlock_refine_lv[index]) {
                        ccc.state = 1;
                        //未解锁时。获取1级时的状态
                        needgemlev = 1;
                        ccc.nexttab = tb.TB_equipdevelop_gem.get_TB_equipdevelop_gemById(ccc.gemid, 1);
                    } else {
                        needgemlev = 1;
                        ccc.state = 2;
                    }
                } else if ($nextobj == null) {
                    ccc.state = 4
                } else {
                    ccc.state = 3
                    ccc.nexttab = tb.TB_equipdevelop_gem.get_TB_equipdevelop_gemById(ccc.gemid, ccc.gemlev + 1);
                }
                
                ccc.curtab = tb.TB_equipdevelop_gem.get_TB_equipdevelop_gemById(ccc.gemid, needgemlev);
                gemvoary.push(ccc);
            }
            return gemvoary;
        }
    }



    export class StrengUtil {

        public static GENERAL: string = "GENERAL";
        public static STRENG: string = "STRENG";
        public static REFINING: string = "REFINING";
        public static GEM: string = "GEM";
        // public static drawCost($ui: UICompenent, $CostAry: Array<number>): boolean {
        //     var costnum: string;
        //     var flag: boolean;
        //     var $vo: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($CostAry[0])
        //     if ($vo.money_type && $vo.money_type > 0) {
        //         //资源
        //         if (GuidData.player.getResType($vo.money_type - 1) >= $CostAry[1]) {
        //             costnum = ColorType.Green98ec2c + Snum($CostAry[1]);
        //             flag = true;
        //         } else {
        //             flag = false;
        //             costnum = ColorType.Redce0a00 + Snum($CostAry[1]);
        //         }
        //     } else {
        //         //材料
        //         if (GuidData.bag.hasItem($CostAry[0], $CostAry[1])) {
        //             costnum = ColorType.Green98ec2c + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
        //             flag = true;
        //         } else {
        //             flag = false;
        //             costnum = ColorType.Redce0a00 + GuidData.bag.getItemCount($CostAry[0]) + ColorType.Brown7a2f21 + "/" + $CostAry[1];
        //         }
        //     }
        //     LabelTextFont.writeSingleLabel($ui.uiRender.uiAtlas, $ui.skinName, costnum, 14, TextAlign.CENTER);
        //     return flag;
        // }
        public static KeyNameByType: Array<string> = ["强化大师", "精炼大师", "镶嵌大师"];
        public static equProp: Array<string> = ["武器", "衣服", "护手", "腰带", "鞋子", "头饰", "项链", "手镯", "戒指", "腰坠"];
        public static setEquIcon($ui: UICompenent, $iconUrl: string, $lev: Array<number>, $selected: boolean, $type: string, $que: string, $baselev: number): void {
            if ($iconUrl) {
                //var $url: string = getIconUrl(entryData.icon);
                IconManager.getInstance().getIcon($iconUrl,
                    ($img: any) => {
                        var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
                        var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
                        UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
                        console.log("---$que--", $que);

                        //头像
                        UiDraw.cxtDrawImg(ctx, ItemGoodQuality.getQuaStr($que), new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
                        ctx.drawImage($img, 0, 0, 60, 60, 4 + 4, 4, 60, 60);

                        UiDraw.cxtDrawImg(ctx, PuiData.A_EQULEVBG, new Rectangle(4 + 4, 4, 41, 17), UIData.publicUi);
                        ArtFont.getInstance().writeFontToCtxCenten(ctx, String($baselev), ArtFont.num63, 20, 4, 4);

                        if ($selected) {
                            UiDraw.cxtDrawImg(ctx, PuiData.Select, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
                        }

                        if ($type == StrengUtil.STRENG) {
                            var btnbg: UIRectangle = $ui.uiRender.uiAtlas.getRec("LevBg")
                            ctx.drawImage($ui.uiRender.uiAtlas.useImg, btnbg.pixelX, btnbg.pixelY, btnbg.pixelWitdh, btnbg.pixelHeight, 38 + 4, 53, btnbg.pixelWitdh, btnbg.pixelHeight);
                            LabelTextFont.writeSingleLabelToCtx(ctx, ColorType.Whiteffffff + "+" + $lev[0], 14, -8, 53, TextAlign.RIGHT);
                        } else if ($type == StrengUtil.REFINING) {
                            var DanBg: UIRectangle = $ui.uiRender.uiAtlas.getRec("DanBg")
                            ctx.drawImage($ui.uiRender.uiAtlas.useImg, DanBg.pixelX, DanBg.pixelY, DanBg.pixelWitdh, DanBg.pixelHeight, 0, 72 - DanBg.pixelHeight, DanBg.pixelWitdh, DanBg.pixelHeight);

                            var StarBg: UIRectangle = $ui.uiRender.uiAtlas.getRec("StarBg")
                            ctx.drawImage($ui.uiRender.uiAtlas.useImg, StarBg.pixelX, StarBg.pixelY, StarBg.pixelWitdh, StarBg.pixelHeight, 46 + 3, 72 - StarBg.pixelHeight, StarBg.pixelWitdh, StarBg.pixelHeight);

                            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[0], 14, 11 + 3, 49, TextAlign.CENTER);
                            LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[1], 14, 61 + 3, 49, TextAlign.CENTER);
                        } else if ($type == StrengUtil.GEM) {
                            for (var index = 0; index < $lev.length; index++) {
                                var Light = $lev[index] < 3 ? "Lightdown" : "Lightup"
                                var LightBg: UIRectangle = $ui.uiRender.uiAtlas.getRec(Light)
                                ctx.drawImage($ui.uiRender.uiAtlas.useImg, LightBg.pixelX, LightBg.pixelY, LightBg.pixelWitdh, LightBg.pixelHeight, 13 + 4 + index * 15, 52, LightBg.pixelWitdh, LightBg.pixelHeight);
                            }
                        }


                        $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
                    });
            }
        }
        /**没有装备的框 */
        public static setEquNoIcon($ui: UICompenent, $partid: number, $lev: Array<number>, $selected: boolean, $type: string): void {
            var $rec: UIRectangle = $ui.uiRender.uiAtlas.getRec($ui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($rec.pixelWitdh, $rec.pixelHeight, false);
            UiDraw.cxtDrawImg(ctx, PuiData.PropBg60, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);

            if ($selected) {
                UiDraw.cxtDrawImg(ctx, PuiData.Select, new Rectangle(0 + 4, 0, 68, 68), UIData.publicUi);
            }
            var tx = -4;//兼容tx
            if ($type == StrengUtil.STRENG) {
                var btnbg: UIRectangle = $ui.uiRender.uiAtlas.getRec("LevBg")
                ctx.drawImage($ui.uiRender.uiAtlas.useImg, btnbg.pixelX, btnbg.pixelY, btnbg.pixelWitdh, btnbg.pixelHeight, 38 + 4, 53, btnbg.pixelWitdh, btnbg.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(ctx, ColorType.Whiteffffff + "+" + $lev[0], 14, -8, 53, TextAlign.RIGHT);
            } else if ($type == StrengUtil.REFINING) {
                var DanBg: UIRectangle = $ui.uiRender.uiAtlas.getRec("DanBg")
                ctx.drawImage($ui.uiRender.uiAtlas.useImg, DanBg.pixelX, DanBg.pixelY, DanBg.pixelWitdh, DanBg.pixelHeight, 0, 72 - DanBg.pixelHeight, DanBg.pixelWitdh, DanBg.pixelHeight);

                var StarBg: UIRectangle = $ui.uiRender.uiAtlas.getRec("StarBg")
                ctx.drawImage($ui.uiRender.uiAtlas.useImg, StarBg.pixelX, StarBg.pixelY, StarBg.pixelWitdh, StarBg.pixelHeight, 46 + 3, 72 - StarBg.pixelHeight, StarBg.pixelWitdh, StarBg.pixelHeight);

                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[0], 14, 11 + 3, 49, TextAlign.CENTER);
                LabelTextFont.writeSingleLabelToCtxSetAnchor(ctx, ColorType.color4c1c07 + $lev[1], 14, 61 + 3, 49, TextAlign.CENTER);
            } else if ($type == StrengUtil.GEM) {
                for (var index = 0; index < $lev.length; index++) {
                    var Light = $lev[index] < 3 ? "Lightdown" : "Lightup"
                    var LightBg: UIRectangle = $ui.uiRender.uiAtlas.getRec(Light)
                    ctx.drawImage($ui.uiRender.uiAtlas.useImg, LightBg.pixelX, LightBg.pixelY, LightBg.pixelWitdh, LightBg.pixelHeight, 13 + 4 + index * 15, 52, LightBg.pixelWitdh, LightBg.pixelHeight);
                }
            }

            LabelTextFont.writeSingleLabelToCtx(ctx, ColorType.Browndb39264 + StrengUtil.equProp[$partid - 1], 14, tx + 4, 26, TextAlign.CENTER);

            $ui.uiRender.uiAtlas.updateCtx(ctx, $rec.pixelX, $rec.pixelY);
        }

        public static parseStr($str: string): WashVo {
            var vo: WashVo = new WashVo;
            var ary: Array<string> = $str.split("|");
            var count = Number(ary[1]);
            var group: Array<Array<number>> = new Array
            for (var i = 0; i < count; i++) {
                var aa: Array<number> = new Array
                var attrId = Number(ary[3 + i * 3]);
                var val = Number(ary[4 + i * 3]);
                var qua = Number(ary[5 + i * 3]);
                aa.push(attrId);
                aa.push(val);
                aa.push(qua);
                group.push(aa);
            }
            vo.attrary = group;
            vo.guid = ary[0];
            vo.partid = Number(ary[2]);
            return vo;
        }

        public static getMinMax($itemid: number, $attrid: number): Array<number> {
            var tab = tb.TB_item_template.get_TB_item_template($itemid);
            console.log("-----------$itemid-------", $itemid, $attrid, tab.forge_pro);
            for (var i = 0; i < tab.forge_pro.length; i++) {
                if (tab.forge_pro[i][0] == $attrid) {
                    return tab.forge_pro[i]
                }
            }
            return null;
        }
    }
}