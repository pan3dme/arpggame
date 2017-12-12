module bloodTittle {
    export class TextJumpType {
        public static NORMALDAMAGE: number = 1;//普通伤害
        public static CRIT: number = 2;//暴击
        public static DODGE: number = 3;//闪避
        public static TREATMENT: number = 4;//治疗
        public static VERTIGO: number = 5;//眩晕
        public static FREEZE: number = 6;//定身
        public static ATTACKADD: number = 7;//攻击增加
        public static ATTACKREDUCE: number = 8;//攻击减少
        public static EXPERIENCE: number = 9;//经验
        public static NORMALDAMAGEUP: number = 11;//普通伤害上
        public static CRITUP: number = 12;//暴击上
        public static MYNORMALDAMAGE: number = 13;//自己受伤普通伤害
        public static MYNORMALDAMAGEUP: number = 14;//自己受伤普通伤害上
        public static MISS: number = 15;//未命中，对敌方

    }

    export class TextJumpUiVo {
        // { pos: $pos, str: $str, color: $color, arttype: true }
        public pos: Vector3D;
        public str: string;
        public type: number;
        public endtime: number;
        public starttime: number;
    }

    export class TextJumpUiDrawAndRefreash extends Disp2DBaseText {
        private _width: number
        public makeData(): void {
            if (this._data) {
                var vo: TextJumpUiVo = this._data;
                this.dtime = vo.endtime;
                // this.dtime = 60;
                this.pos = vo.pos;

                switch (vo.type) {
                    case TextJumpType.NORMALDAMAGE:
                    case TextJumpType.TREATMENT:
                        //数字类
                        ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), "NUM" + (vo.type + 50), TextAlign.RIGHT);
                        break;
                    case TextJumpType.MYNORMALDAMAGEUP:
                    case TextJumpType.MYNORMALDAMAGE:
                        ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), ArtFont.num53, TextAlign.RIGHT);
                        break;
                    case TextJumpType.NORMALDAMAGEUP:
                        ArtFont.getInstance().writeFontToSkinName(this.parent.uiAtlas, this.textureStr, String(vo.str), "NUM" + (vo.type + 40), TextAlign.RIGHT);
                        break;
                    case TextJumpType.DODGE:
                    case TextJumpType.VERTIGO:
                    case TextJumpType.FREEZE:
                    case TextJumpType.MISS:
                        //文字类
                        this.drawTxtBytext(vo);

                        break;
                    case TextJumpType.ATTACKADD:
                    case TextJumpType.ATTACKREDUCE:
                    case TextJumpType.EXPERIENCE:
                    case TextJumpType.CRIT:
                    case TextJumpType.CRITUP:
                        //文字 + 数字类（最多显示4位数字）
                        this._width = this.drawTxtBydigitalAndtext(vo);
                        break;

                    default:
                        break;
                }
            }
        }


        private drawTxtBytext($vo: TextJumpUiVo): number {
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);

            var $length = 50;
            if ($vo.type == TextJumpType.MISS) {
                $length = 67
            }
            UiDraw.cxtDrawImg(ctx, "TYPE" + $vo.type, new Rectangle(rec.pixelWitdh - $length, rec.pixelHeight - 25, $length, 25), UIData.publicUi);

            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return 50;
        }

        private drawTxtBydigitalAndtext($vo: TextJumpUiVo): number {
            var rec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var picid = $vo.type;
            var $width = 50;
            var $height = 25;
            var txtcolor: string;
            if ($vo.type == TextJumpType.ATTACKREDUCE) {
                picid = TextJumpType.ATTACKADD;
                txtcolor = ArtFont.num53
            } else if ($vo.type == TextJumpType.ATTACKADD) {
                txtcolor = ArtFont.num54
            } else if ($vo.type == TextJumpType.EXPERIENCE) {
                txtcolor = ArtFont.num54
            } else if ($vo.type == TextJumpType.CRIT) {
                txtcolor = ArtFont.num55
                $width = 78
                $height = 50
            } else if ($vo.type == TextJumpType.CRITUP) {
                picid -= 10;
                $width = 78
                $height = 50
                txtcolor = ArtFont.num55
            }


            var distion = ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
            distion += $width;
            UiDraw.cxtDrawImg(ctx, "TYPE" + picid, new Rectangle(rec.pixelWitdh - distion, rec.pixelHeight - $height, $width, $height), UIData.publicUi);

            ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, rec.pixelWitdh - distion + $width + 2, rec.pixelHeight - $height);

            TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);

            return distion;
        }


        private pos: Vector3D
        public update(): void {
            if (this._data) {
                this.time = TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }

                // if (this.time > this.dtime) {
                //     this.ui.parent.removeChild(this.ui);
                //     this._data = null;
                //     return;
                // }
                // this.time++;

                var vo: TextJumpUiVo = this._data;
                // var $ty: number = MathClass.easeInOut(this.time / this.dtime, 0, 20, 1)
                //变化
                var $ary = this.changerules(this.time);

                this.ui.width = 256 * $ary[2];
                this.ui.height = 50 * $ary[3];
                this.ui.y = $ary[1] - this.ui.height;
                this.ui.x = $ary[0] - this.ui.width / 2 + 25;
                (<AlphaUICompenent>this.ui).alpha = $ary[4];
            }
        }

        /** [posx,posy,Scalex,Scaley,alpha] */
        private _lastchange: Array<number>;
        private changerules(t: number): Array<number> {

            var vo: TextJumpUiVo = this._data;
            //当前处于哪一帧
            t = (t - vo.starttime) / 1000 * 60;
            var changevo: Array<number> = new Array<number>();

            var v2d: Vector2D = this.Vector3DToVector2D(new Vector3D(this.pos.x, this.pos.y, this.pos.z))
            var posx: number;
            var posy: number;
            var scalex: number;
            var scaley: number;
            var alpha: number;
            //选定初始化飘字位置 
            switch (vo.type) {
                case bloodTittle.TextJumpType.NORMALDAMAGE:
                case bloodTittle.TextJumpType.MYNORMALDAMAGE:
                    //头顶
                    posx = v2d.x
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.3 + 0.2;
                        if (scalex > 1.5) {
                            scalex = 1.5
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 6
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 6
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 20
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 72) {
                        if (t < 50) {
                            posy = this._lastchange[1] - 2;
                        } else {
                            posy = this._lastchange[1] + 2;
                        }
                        posx = this._lastchange[0] - 1.5;

                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 100;
                        if (alpha < 0) {
                            alpha = 0
                        }
                    }
                    break;

                case bloodTittle.TextJumpType.CRIT:
                    //暴击
                    posx = v2d.x
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.3 + 0.2;
                        if (scalex > 1.5) {
                            scalex = 1.5
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 6
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 4
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 20
                        scaley = scalex;
                        alpha = (t / 3) * 0.8 + 0.2;
                        if (alpha > 1) {
                            alpha = 1
                        }
                    } else if (t < 100) {
                        if (t < 50) {
                            posy = this._lastchange[1] - 2;
                        } else {
                            posy = this._lastchange[1] + 2;
                        }
                        posx = this._lastchange[0] - 1.5;

                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 100;
                        if (alpha < 0) {
                            alpha = 0
                        }
                    }
                    break;
                case bloodTittle.TextJumpType.NORMALDAMAGEUP:
                case bloodTittle.TextJumpType.CRITUP:
                case bloodTittle.TextJumpType.MYNORMALDAMAGEUP:
                    //头顶
                    posx = v2d.x
                    if (t < 4) {
                        posy = v2d.y - (t * 4);
                        scalex = (t / 4) * 1.5 + 0.2;
                        if (scalex > 1.7) {
                            scalex = 1.7
                        }
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5
                        }
                    } else if (t < 8) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 4
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5
                        }
                    } else if (t < 15) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] + 1 / 4
                        scaley = scalex;
                        alpha = (t / 3) * 0.3 + 0.2;
                        if (alpha > 0.5) {
                            alpha = 0.5
                        }
                    } else if (t < 30) {
                        posy = this._lastchange[1] - 2;
                        scalex = this._lastchange[2] - 1 / 15
                        scaley = scalex;
                        alpha = this._lastchange[4] - 1 / 80;
                        if (alpha < 0) {
                            alpha = 0
                        }
                    }

                    break;
                case bloodTittle.TextJumpType.TREATMENT:
                    //头顶
                    posx = v2d.x
                    posy = v2d.y - (t * 1.5);
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 0.8 + 0.2;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    } else if (t < 60) {
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 11) / 48);
                    }
                    break;
                case bloodTittle.TextJumpType.EXPERIENCE:
                    //玩家名
                    posy = v2d.y -= 15
                    posy = posy - (t * 0.5);
                    if (t < 40) {
                        posx = v2d.x - (t * 0.9);
                        scalex = (Math.ceil(t) / 40) * 0.3 + 0.5;
                        scaley = scalex;
                        alpha = 1;
                    } else if (t < 60) {
                        posx = v2d.x - (40 * 0.9);
                        scalex = this._lastchange[2];
                        scaley = scalex;
                        alpha = 1 - ((t - 39) / 20);
                    }
                    break;
                case bloodTittle.TextJumpType.ATTACKADD:
                case bloodTittle.TextJumpType.ATTACKREDUCE:
                    //右边
                    posx = v2d.x += 110
                    posy = v2d.y - (t * 1.8);
                    if (t < 12) {
                        scalex = (Math.ceil(t) / 12) * 1.3 + 0.1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12) * 0.8 + 0.2;
                    } else if (t < 24) {
                        scalex = 1.4 - ((t - 11) / 12) * 0.4;
                        scaley = scalex;
                        alpha = 1;
                    } else if (t < 60) {
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 23) / 36);
                    }
                    break;
                case bloodTittle.TextJumpType.DODGE:
                case bloodTittle.TextJumpType.MISS:
                case bloodTittle.TextJumpType.VERTIGO:
                case bloodTittle.TextJumpType.FREEZE:
                    //左边
                    posx = v2d.x -= 50
                    if (t < 12) {
                        posy = v2d.y - (t * 3);
                        scalex = 1;
                        scaley = scalex;
                        alpha = (Math.ceil(t) / 12);
                    } else if (t < 36) {
                        posy = v2d.y - (33);
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1;
                    } else if (t < 72) {
                        posy = v2d.y - 33 - ((t - 36) * 1.5);
                        scalex = 1;
                        scaley = scalex;
                        alpha = 1 - ((t - 35) / 36);
                    }
                    break;
                default:
                    break;
            }

            changevo.push(posx);
            changevo.push(posy);
            changevo.push(scalex);
            changevo.push(scaley);
            changevo.push(alpha);
            changevo.push(v2d.x);
            changevo.push(v2d.y);
            //保存上一次变化
            this._lastchange = changevo;
            return changevo;
        }
    }

    export class CharNameUiVo extends Disp2DBaseText {
        private charNameMeshVo: CharNameMeshVo
        public makeData(): void {
            if (this._data) {
                this.charNameMeshVo = <CharNameMeshVo>this.data;
                if (this.lastKey != this.charNameMeshVo.name) {
                    this.ui.width = 256 * 0.7;
                    this.ui.height = 22 * 0.7;
                    this.lastKey = this.charNameMeshVo.name
                    LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, this.charNameMeshVo.name, 20, TextAlign.CENTER, "#ffffff", "#27262e");
                }
                this.charNameMeshVo.needDraw = false;
            }
        }
        private tempMatrix: Matrix3D = new Matrix3D;
        public update(): void {
            if (this.charNameMeshVo) {
                if (this.charNameMeshVo.needDraw) {
                    this.makeData();
                }
                if (this.charNameMeshVo.pos) {
                    if (this.charNameMeshVo.visible) {
                        if (this.needUpData(this.charNameMeshVo.pos) || this.charNameMeshVo.visibleChange) {
                            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Scene_data.viewMatrx3D);
                            var p: Vector3D = m.transformVector(this.charNameMeshVo.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;

                            this.oldPos.x = this.charNameMeshVo.pos.x;
                            this.oldPos.y = this.charNameMeshVo.pos.y;
                            this.charNameMeshVo.visibleChange = false;

                        }
                    } else {
                        this.ui.x = 10000
                    }
                }
                if (this.charNameMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }

    export class CharTitleUiVo extends Disp2DBaseText {
        private _charTitleMeshVo: CharTitleMeshVo
        public makeData(): void {
            if (this._data) {
                this._charTitleMeshVo = <CharTitleMeshVo>this.data;
                //LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, "ccav", 22, TextAlign.CENTER, "#ffffff");
                // this.parent.uiAtlas.upDataPicToTexture(getUItittleUrl(String(this._charTitleMeshVo.num)), this.textureStr)
                LoadManager.getInstance().load(Scene_data.fileRoot + getUItittleUrl(String(this._charTitleMeshVo.num)), LoadManager.IMG_TYPE,
                    ($img: any) => {
                        var $uiRec: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
                        this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                        var $minScale: number = Math.min($uiRec.pixelWitdh / $img.width, $uiRec.pixelHeight / $img.height)
                        $minScale = Math.min($minScale, 1)
                        var $tw: number = $img.width * $minScale
                        var $th: number = $img.height * $minScale
                        this.parent.uiAtlas.ctx.drawImage($img, ($uiRec.pixelWitdh - $tw) / 2, ($uiRec.pixelHeight - $th) / 2, $tw, $th);
                        TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
                    });
            }
        }
        private tempMatrix: Matrix3D = new Matrix3D;

        public update(): void {
            if (this._charTitleMeshVo) {

                if (this._charTitleMeshVo.needDraw) {
                    this.makeData();
                    this._charTitleMeshVo.needDraw = false
                }

                if (this._charTitleMeshVo.pos) {
                    if (this._charTitleMeshVo.visible) {
                        if (this.needUpData(this._charTitleMeshVo.pos)) {
                            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Scene_data.viewMatrx3D);
                            var p: Vector3D = m.transformVector(this._charTitleMeshVo.pos);
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;

                            this.oldPos.x = this._charTitleMeshVo.pos.x;
                            this.oldPos.y = this._charTitleMeshVo.pos.y;

                        }
                    } else {
                        this.ui.x = 10000
                    }
                }
                if (this._charTitleMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }


    export class baseMeshVo {
        private _visible: boolean = true;
        public visibleChange: boolean = false
        public set visible(value: boolean) {
            this._visible = value
            this.visibleChange = true;
        }
        public get visible(): boolean {
            return this._visible;
        }
        public pos: Vector3D;
        public clear: boolean = false;
        public constructor() {
        }
    }
}
class CharTitleMeshVo extends bloodTittle.baseMeshVo {
    private _num: number;
    public needDraw: boolean;
    public destory(): void {
        this.pos = null;
        this._num = null;
        this.clear = true
    }
    public set num(value: number) {
        this._num = value;
        this.needDraw = true;
    }
    public get num(): number {
        return this._num;
    }
}
class CharNameMeshVo extends bloodTittle.baseMeshVo {
    private _name: string;
    public needDraw: boolean;
    public set name(value: string) {
        this._name = value;
        this.needDraw = true;
    }
    public get name(): string {
        return this._name;
    }
    public destory(): void {
        this.pos = null;
        this._name = null;
        this.needDraw = null;
        this.clear = true
    }
}
class BloodLineMeshVo extends bloodTittle.baseMeshVo {
    public num: number;
    public colortype: number;
    public destory(): void {
        this.pos = null;
        this.num = null;
        this.colortype = null
        this.clear = true
    }
}


class JumpTextMeshVo extends bloodTittle.baseMeshVo {
    public str: string
    public destory(): void {
        this.pos = null;
        this.clear = true
    }
}
class JumpTxtContianerPanel extends Dis2DUIContianerPanel {

    public constructor($classVo: any, $rect: Rectangle, $num: number) {
        super($classVo, $rect, $num);

    }


}
class BloodManager {
    private static _instance: BloodManager;
    public static getInstance(): BloodManager {
        if (!this._instance) {
            this._instance = new BloodManager();
        }
        return this._instance;
    }
    private _charTitleContianerPanel: Dis2DUIContianerPanel;//称号;
    private _charNameContianerPanel: Dis2DUIContianerPanel;//名字;
    private _jumpTxtContianerPanel: AlphaUiContianer;//跳字;
    private _bloodLineUIConatiner: bloodTittle.BloodLineUIConatiner//血条;


    private uiContianerItem: Array<Dis2DUIContianerBase>;
    public constructor() {
        this.uiContianerItem = new Array()
        this._charTitleContianerPanel = new Dis2DUIContianerPanel(bloodTittle.CharTitleUiVo, new Rectangle(0, 0, 131, 69), 10);
        this._charNameContianerPanel = new Dis2DUIContianerPanel(bloodTittle.CharNameUiVo, new Rectangle(0, 0, 256, 24), 50);
        this._jumpTxtContianerPanel = new AlphaUiContianer(bloodTittle.TextJumpUiDrawAndRefreash, new Rectangle(0, 0, 256, 50), 10);

        this._bloodLineUIConatiner = new bloodTittle.BloodLineUIConatiner();

        this.uiContianerItem.push(this._charTitleContianerPanel)
        this.uiContianerItem.push(this._charNameContianerPanel)
        this.uiContianerItem.push(this._jumpTxtContianerPanel);
        this.uiContianerItem.push(this._bloodLineUIConatiner);
    }
    public getCharTitleMeshVo(value: number = 0): CharTitleMeshVo {
        var $vo: CharTitleMeshVo = new CharTitleMeshVo;
        $vo.num = value;
        $vo.pos = new Vector3D(0, 50, 0);
        this._charTitleContianerPanel.showTemp($vo);
        return $vo;
    }
    public getCharNameMeshVo(value: string = "测试名"): CharNameMeshVo {
        var $vo: CharNameMeshVo = new CharNameMeshVo;
        $vo.name = value
        $vo.pos = new Vector3D(0, 50, 0);
        this._charNameContianerPanel.showTemp($vo);
        return $vo;
    }
    public getBloodLineMeshVo(): BloodLineMeshVo {
        var $vo: BloodLineMeshVo = new BloodLineMeshVo;
        $vo.num = 100;
        $vo.colortype = 0
        $vo.pos = new Vector3D(0, 50, 0);
        this._bloodLineUIConatiner.showTemp($vo);
        return $vo;
    }

    public setJumpNum($textJumpUiVo: bloodTittle.TextJumpUiVo): void {
        // if (!$color) {
        //     $color = $num > 0 ? ArtFont.Green : ArtFont.Red
        // }
        // var $str: string = String($num)
        // if ($num > 0) {
        //     $str = "+" + $str
        // }
        // console.log("---111");
        this._jumpTxtContianerPanel.showTemp($textJumpUiVo);
    }
    public update(): void {
        for (var i: number = 0; i < this.uiContianerItem.length; i++) {
            this.uiContianerItem[i].update(0)
            for (var j: number = 0; j < this._bloodLineUIConatiner.renderList.length; j++) {
                this.uiContianerItem[i].renderList[j].update();
            }
        }
    }
    public resize(): void {
        this._jumpTxtContianerPanel.resize();
        for (var j: number = 0; j < this.uiContianerItem.length; j++) {
            this.uiContianerItem[j].resize();
        }
        Scene_data.cam3D.needChange = true;
        //this.update();
    }
}
module bloodTittle {
    export class BloodUIShader extends Shader3D {
        static BloodUIShader: string = "BloodUIShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");
        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +

                "uniform vec4 ui[30];" +
                "uniform vec4 lifenum[30];" +

                "varying vec2 v_texCoord;\n" +
                "varying vec4 v_lifenum;\n" +

                "void main(void)" +
                "{" +

                " v_lifenum = lifenum[int(v2uv.z)];" +


                " v_texCoord = vec2(v2uv.x , v2uv.y );" +
                " vec4  data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy *data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "varying vec4 v_lifenum;\n" +


                "void main(void)\n" +
                "{\n" +
                "vec2  v_uv = v_texCoord;" +
                "if(v_texCoord.x<v_lifenum.x){;\n" +
                "v_uv.y = v_uv.y+v_lifenum.y;" +
                "};\n" +
                "vec4 infoUv = texture2D(s_texture, v_uv.xy);\n" +
                "infoUv.xyz *= infoUv.w;\n" +
                "gl_FragColor = infoUv;\n" +

                "}"
            return $str
        }

    }
    export class BloodUICompenent extends UICompenent {
        public constructor() {
            super();
        }
        public pushVaData(objData: ObjData, i: number, beginIndex: number): number {
            objData.vertices.push(
                0, 0, 0,
                1, 0, 0,
                1, -1, 0,
                0, -1, 0);
            objData.uvs.push(
                0, 0, i,
                1, 0, i,
                1, 8 / 32, i,
                0, 8 / 32, i);
            objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);
            return beginIndex + 4;
        }
        public lifeNum: number = 100;
        public colortype: number = 0;  //0,1,2;
    }

    export class BloodDisp2DBaseText extends Disp2DBaseText {
        private bloodLineMeshVo: BloodLineMeshVo

        public makeData(): void {
            if (this._data) {
                this.bloodLineMeshVo = <BloodLineMeshVo>this.data;
            }
        }
        private tempMatrix: Matrix3D = new Matrix3D;
        public update(): void {
            if (this.bloodLineMeshVo) {
                if (this.bloodLineMeshVo.pos) {
                    if (this.bloodLineMeshVo.visible) {

                        if (this.needUpData(this.bloodLineMeshVo.pos) || this.bloodLineMeshVo.visibleChange) {

                            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Scene_data.viewMatrx3D);
                            var p: Vector3D = m.transformVector(new Vector3D(this.bloodLineMeshVo.pos.x, this.bloodLineMeshVo.pos.y, this.bloodLineMeshVo.pos.z))
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;

                            this.bloodLineMeshVo.visibleChange = false

                        }

                        (<BloodUICompenent>this.ui).lifeNum = this.bloodLineMeshVo.num;
                        (<BloodUICompenent>this.ui).colortype = this.bloodLineMeshVo.colortype;


                    } else {
                        this.ui.x = 10000
                    }
                }
                if (this.bloodLineMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }
    export class BloodUIRenderComponent extends UIRenderComponent {
        public constructor() {
            super();
        }
        protected initData(): void {
            this._uiList = new Array;
            this.objData = new ObjData();

            ProgrmaManager.getInstance().registe(BloodUIShader.BloodUIShader, new BloodUIShader)
            this.shader = ProgrmaManager.getInstance().getProgram(BloodUIShader.BloodUIShader);
            this.program = this.shader.program;
            this.uiProLocation = Scene_data.context3D.getLocation(this.program, "ui")
            this.ui2ProLocation = Scene_data.context3D.getLocation(this.program, "lifenum")

        }

        private nextTime: number = 0
        public update(): void {
            if (!this.visible || this._uiList.length == 0) {
                return;
            }
            // console.log(this._uiList.length);
            Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            Scene_data.context3D.setProgram(this.program);

            if (this.nextTime < TimeUtil.getTimer() || this.renderData2.length != this._uiList.length * 4) {
                if (this.renderData2.length != this._uiList.length * 4) {
                    this.renderData2 = new Float32Array(this._uiList.length * 4);
                }
                for (var i: number = 0; i < this._uiList.length; i++) {
                    var $bloodUICompenent: BloodUICompenent = <BloodUICompenent>this._uiList[i];
                    var a: number = $bloodUICompenent.lifeNum / 100;
                    var b: number = ($bloodUICompenent.colortype + 1) * 8 / 32;
                    this.renderData2[i * 4 + 0] = a;
                    this.renderData2[i * 4 + 1] = b;
                }
                this.nextTime = TimeUtil.getTimer() + 300;
            }

            Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
            Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);


            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);

            if (this.uiAtlas) {
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
            }
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.modelRenderList) {
                for (var i: number = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        }
        public creatBaseComponent($skinName: string): BloodUICompenent {
            var ui: BloodUICompenent = new BloodUICompenent();
            ui.tr.setRec(new UIRectangle(0, 0, 1, 1));
            ui.width = 64;
            ui.height = 8;
            ui.uiRender = this;
            ui.lifeNum = 100
            return ui;
        }
        public makeRenderDataVc($vcId: number): void {
            if (!this.renderData || (this.renderData && this.renderData.length != this._uiList.length * 4)) {
                this.renderData = new Float32Array(this._uiList.length * 4);
            }
            if ($vcId == -1) {
                for (var i: number = 0; this._uiList && i < this._uiList.length; i++) {
                    this._uiList[i].vcId = i;
                    this.renderData[i * 4 + 0] = this._uiList[i].renderData[0];
                    this.renderData[i * 4 + 1] = this._uiList[i].renderData[1];
                    this.renderData[i * 4 + 2] = this._uiList[i].renderData[2];
                    this.renderData[i * 4 + 3] = this._uiList[i].renderData[3];
                }
            } else {
                if ($vcId < this._uiList.length) {
                    this.renderData[$vcId * 4 + 0] = this._uiList[$vcId].renderData[0];
                    this.renderData[$vcId * 4 + 1] = this._uiList[$vcId].renderData[1];
                    this.renderData[$vcId * 4 + 2] = this._uiList[$vcId].renderData[2];
                    this.renderData[$vcId * 4 + 3] = this._uiList[$vcId].renderData[3];
                }
            }

        }
    }
    export class BloodLineUIConatiner extends UIConatiner {
        private _baseRender: BloodUIRenderComponent;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this._baseRender = new BloodUIRenderComponent();
            this.addRender(this._baseRender);

            this._baseRender.uiAtlas = new UIAtlas
            this._baseRender.uiAtlas.configData = new Array;
            this._uiItem = new Array();
            this.loadBloodTexture()
        }
        private loadBloodTexture(): void {
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/blood.png", ($textureRes: TextureRes) => {
                this._baseRender.uiAtlas.textureRes = $textureRes
            });
        }
        protected _uiItem: Array<BloodDisp2DBaseText>;
        public update(t: number): void {
            if (this._baseRender.uiAtlas.textureRes) {
                for (var i: number = 0; i < this._uiItem.length; i++) {
                    if (this._uiItem[i].data) {
                        this._uiItem[i].update();
                    }
                }
            }


        }
        public removeChild($ui: UICompenent): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == $ui) {
                    this._uiItem.splice(i, 1);
                    break;
                }
            }
            super.removeChild($ui);
        }
        public showTemp($data: any): void {
            if (this._uiItem.length >= 50) {
                console.log("超过50。暂时设置不可再添加");
                return
            }
            var $BloodDisp2DBaseText: BloodDisp2DBaseText = new BloodDisp2DBaseText;
            $BloodDisp2DBaseText.parent = this._baseRender;
            $BloodDisp2DBaseText.ui = <UICompenent>this._baseRender.creatBaseComponent("test");
            $BloodDisp2DBaseText.data = $data;
            this.addChild($BloodDisp2DBaseText.ui);
            this._uiItem.push($BloodDisp2DBaseText);
        }
    }
}
/*
module bloodTittle {
    export class BloodUIShader extends Shader3D {
        static BloodUIShader: string = "BloodUIShader";
        constructor() {
            super();
        }
        binLocation($context: WebGLRenderingContext): void {
            $context.bindAttribLocation(this.program, 0, "v3Pos");
            $context.bindAttribLocation(this.program, 1, "v2uv");

        }
        getVertexShaderString(): string {
            var $str: string =
                "attribute vec3 v3Pos;" +
                "attribute vec3 v2uv;" +

                "uniform vec4 ui[30];" +
                "uniform float lifenum[30];" +
                "uniform float colortype[30];" +

                "varying vec2 v_texCoord;\n" +
                "varying float v_lifenum;\n" +
                "varying float v_colortype;\n" +


                "void main(void)" +
                "{" +

                " v_lifenum = lifenum[int(v2uv.z)];" +
                " v_colortype = colortype[int(v2uv.z)];" +

                " v_texCoord = vec2(v2uv.x , v2uv.y );" +
                " vec4  data = ui[int(v2uv.z)];" +
                "   vec3 pos = vec3(0.0,0.0,0.0);" +
                "   pos.xy = v3Pos.xy *data.zw * 2.0;" +
                "   pos.x += data.x * 2.0 - 1.0;" +
                "   pos.y += -data.y * 2.0 + 1.0;" +
                "   vec4 vt0= vec4(pos, 1.0);" +
                "   gl_Position = vt0;" +
                "}"
            return $str
        }
        getFragmentShaderString(): string {
            var $str: string =
                "precision mediump float;\n" +
                "varying vec2 v_texCoord;\n" +
                "varying float v_lifenum;\n" +

                "varying float v_colortype;\n" +
                "void main(void)\n" +
                "{\n" +
                "if(v_texCoord.x>v_lifenum){;\n" +

                "if(v_colortype==0.0){;\n" +
                "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n" +
                "}else{;\n" +
                "if(v_colortype==1.0){;\n" +
                "gl_FragColor =vec4(1.0,1.0,0.0,1.0);\n" +
                "}else{;\n" +
                "gl_FragColor =vec4(0.0,1.0,0.0,1.0);\n" +
                "};\n" +

                "};\n" +


                //"if(v_colortype>0.5){;\n" +
                //"gl_FragColor =vec4(0.0,1.0,0.0,1.0);\n" +
                //"}else{;\n" +
                //"gl_FragColor =vec4(0.164,0.517,1.0,1.0);\n" +
                //"};\n" +

                "}else{;\n" +
                "gl_FragColor =vec4(0.0,0.0,0.0,0.5);\n" +
                "};\n" +
                "}"
            return $str
        }

    }
    export class BloodUICompenent extends UICompenent {
        public constructor() {
            super();
        }
        public setVc(program: any, index: number): void {
            Scene_data.context3D.setVc4fv(program, "ui[" + index + "]", this.renderData);
            Scene_data.context3D.setVc1fv(program, "lifenum[" + index + "]", [1 - (this.lifeNum / 100)]);
            Scene_data.context3D.setVc1fv(program, "colortype[" + index + "]", [this.colortype]);
        }
        public lifeNum: number = 100;
        public colortype: number = 0;
    }
   
    export class BloodDisp2DBaseText extends Disp2DBaseText {
        private bloodLineMeshVo: BloodLineMeshVo

        public makeData(): void {
            if (this._data) {
                this.bloodLineMeshVo = <BloodLineMeshVo>this.data;
            }
        }
        private tempMatrix: Matrix3D = new Matrix3D;
        public update(): void {
            if (this.bloodLineMeshVo) {
                if (this.bloodLineMeshVo.pos) {
                    if (this.bloodLineMeshVo.visible) {
                        if (this.needUpData(this.bloodLineMeshVo.pos)) {

                            var m: Matrix3D = Scene_data.cam3D.cameraMatrix.clone(this.tempMatrix);
                            m.append(Scene_data.viewMatrx3D);
                            var p: Vector3D = m.transformVector(new Vector3D(this.bloodLineMeshVo.pos.x, this.bloodLineMeshVo.pos.y, this.bloodLineMeshVo.pos.z))
                            this.ui.x = ((p.x / p.w) + 1) * (Scene_data.stageWidth / 2) / UIData.Scale - this.ui.width / 2;
                            this.ui.y = ((-p.y / p.w) + 1) * (Scene_data.stageHeight / 2) / UIData.Scale - this.ui.height / 2;

                        }
                        (<BloodUICompenent>this.ui).lifeNum = this.bloodLineMeshVo.num;
                        (<BloodUICompenent>this.ui).colortype = this.bloodLineMeshVo.colortype;

                    } else {
                        this.ui.x = 10000
                    }
                }
                if (this.bloodLineMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }
    }
    export class BloodUIRenderComponent extends UIRenderComponent {
        public constructor() {
            super();
        }
        protected initData(): void {
            super.initData();
            ProgrmaManager.getInstance().registe(BloodUIShader.BloodUIShader, new BloodUIShader)
            this.shader = ProgrmaManager.getInstance().getProgram(BloodUIShader.BloodUIShader);
            this.program = this.shader.program;
        }
        public update(): void {
            if (!this.visible || this._uiList.length == 0) {
                return;
            }
            Scene_data.context3D.setBlendParticleFactors(0);
            Scene_data.context3D.setProgram(this.program);
            for (var i: number = 0; i < this._uiList.length; i++) {

                this._uiList[i].update();
                this._uiList[i].setVc(this.shader, i);
            }
            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.modelRenderList) {
                for (var i: number = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        }
        public creatBaseComponent($skinName: string): BloodUICompenent {
            var ui: BloodUICompenent = new BloodUICompenent();
            ui.tr.setRec(new UIRectangle(0, 0, 1, 1));
            ui.width = 55;
            ui.height = 5;
            ui.uiRender = this;
            ui.lifeNum = 100
            return ui;
        }
    }
    export class BloodLineUIConatiner extends UIConatiner {
        private _baseRender: BloodUIRenderComponent;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this._baseRender = new BloodUIRenderComponent();
            this.addRender(this._baseRender);

            this._baseRender.uiAtlas = new UIAtlas
            this._baseRender.uiAtlas.configData = new Array;
            this._uiItem = new Array();

        }

        protected _uiItem: Array<BloodDisp2DBaseText>;
        public update(t: number): void {
     


            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    this._uiItem[i].update();
                }
            }


     

        }
        public removeChild($ui: UICompenent): void {
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].ui == $ui) {
                    this._uiItem.splice(i, 1);
                    break;
                }
            }
            super.removeChild($ui);
        }
        public showTemp($data: any): void {
            if (this._uiItem.length >= 30) {
                console.log("超过30。暂时设置不可再添加");
                return
            }
            var $BloodDisp2DBaseText: BloodDisp2DBaseText = new BloodDisp2DBaseText;
            $BloodDisp2DBaseText.parent = this._baseRender;
            $BloodDisp2DBaseText.ui = <UICompenent>this._baseRender.creatBaseComponent("test");
            $BloodDisp2DBaseText.data = $data;
            this.addChild($BloodDisp2DBaseText.ui);
            this._uiItem.push($BloodDisp2DBaseText);
        }
    }
}
*/