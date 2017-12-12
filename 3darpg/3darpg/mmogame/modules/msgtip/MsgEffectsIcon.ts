module msgtip {

    export class MsgEffectsMoveData  {
        public pos: Vector2D;
        public bezierPos: Vector2D;
        public toPos: Vector2D;
        public startTM: number;
        public endTM: number;
        public MONEY_TYPE: number;//资源类型
    }
    export class MsgEffectsIconRender extends Disp2DBaseText {
        private msgEffectsMoveData: MsgEffectsMoveData;
        private afterStr:string
        public makeData(): void {
            if (this._data) {
                this.msgEffectsMoveData = <MsgEffectsMoveData>this.data;

                var $typeStr: string = PuiData.A_YUANBAO;
                switch (this.msgEffectsMoveData.MONEY_TYPE) {
                    case SharedDef.MONEY_TYPE_SILVER:
                        $typeStr = PuiData.A_YINBI;
                        break
                    case 1:
                        $typeStr = PuiData.A_SHOULING;
                        break
                    case 2:
                        $typeStr = PuiData.A_JINGHUA;
                        break
                    case 101:
                        $typeStr = PuiData.A_HIGHT_START;
                        break
                    case 107:
                        $typeStr = PuiData.A_HIGHT_START;
                        break
                    default:
                        break
                }
         
                if (this.afterStr != $typeStr) {
                    console.log("更新")
                    UiDraw.uiAtlasDrawImg(this.parent.uiAtlas, this.textureStr, UIData.publicUi, $typeStr);
                }
                this.afterStr = $typeStr
                this.ui.width = 24;
                this.ui.height = 24;
            }
        }
        public update(): void {
            if (this.msgEffectsMoveData.startTM < TimeUtil.getTimer()) {
                if (this.msgEffectsMoveData.endTM < TimeUtil.getTimer()) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                } else {
                    var $nTime: number = (TimeUtil.getTimer() - this.msgEffectsMoveData.startTM) / (this.msgEffectsMoveData.endTM - this.msgEffectsMoveData.startTM);
                    var nAdd: number = MathClass.easeInOut($nTime, 0, 1, 1)
                    this.ui.height = 24 - (nAdd * 14);
                    this.ui.width = 24 - (nAdd * 14);
                    var $bezierPos: Vector2D = (MsgEffectsIconRender.drawbezier([this._data.pos, this._data.bezierPos, this._data.toPos], $nTime))
                    this.ui.x = $bezierPos.x;
                    this.ui.y = $bezierPos.y;
                }
            } else {
                this.ui.x = 3000;
            }
        }
        static drawbezier(_array: Array<Vector2D>, _time: number): Vector2D {
            var _newarray: Array<Vector2D> = new Array()
            if (_array.length == 0) {
                return new Vector2D()
            }
            for (var i: number = 0; i < _array.length; i++) {
                _newarray.push(new Vector2D(_array[i].x, _array[i].y))
            }
            while (_newarray.length > 1) {
                for (var j: number = 0; j < _newarray.length - 1; j++) {
                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time)
                }
                _newarray.pop()
            }
            return _newarray[0];
        }
        static mathmidpoint(a: Vector2D, b: Vector2D, t: number): void {
            var _nx: number, _ny: number, _nz: number;
            _nx = a.x + (b.x - a.x) * t;
            _ny = a.y + (b.y - a.y) * t;
            a.x = _nx;
            a.y = _ny;
        }

    }
    export class MsgEffectsManager {

        private static _instance: MsgEffectsManager;
        public static getInstance(): MsgEffectsManager {
            if (!this._instance) {
                this._instance = new MsgEffectsManager();
            }
            return this._instance;
        }
        private show(): void
        {
            if (!this._dis2DUIContianerPanel.hasStage) {
                UIManager.getInstance().addUIContainer(this._dis2DUIContianerPanel);
                TimeUtil.addFrameTick(this.frameUpFun);
            }

        }
        public setPopMsgVo(value: MsgEffectsMoveData): void {
            this.show()
            this._dis2DUIContianerPanel.showTemp(value);
        }
        private _dis2DUIContianerPanel: Dis2DUIContianerPanel;//名字
        public constructor() {
            this._dis2DUIContianerPanel = new Dis2DUIContianerPanel(MsgEffectsIconRender, new Rectangle(0, 0, 32, 32),15);
            this.frameUpFun = (t: number) => { this.upData(t) }
        }
        private frameUpFun: Function;
        public upData(t: number): void {
      
            this._dis2DUIContianerPanel.update(0)
            for (var i: number = 0; i < this._dis2DUIContianerPanel.renderList.length; i++) {
                this._dis2DUIContianerPanel.renderList[i].update();
            }
            if (this._dis2DUIContianerPanel.hasStage) {
                if (this._dis2DUIContianerPanel.getUiItemLen() == 0) {
                    UIManager.getInstance().removeUIContainer(this._dis2DUIContianerPanel);
                }
            } else {
                TimeUtil.removeFrameTick(this.frameUpFun);
            }
        }
      
    }
}