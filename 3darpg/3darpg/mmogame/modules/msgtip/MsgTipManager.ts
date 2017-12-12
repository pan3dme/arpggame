module msgtip {
    export class PopMsgVo {


        //全服广播1
        //升级提示2
        //拾取提示3
        //经验提示4
        //生命变化5
        //任务完成6
        //操作反馈7
        //属性、状态变化8
        //战斗提示9
        //行为状态提示10
        //地图信息11
        //战力提示12


        public static type1: number = 1//1固定;
        public static type2: number = 2// 2中间飘;
        public static type3: number = 3//3位置飘;
        public static type4: number = 4// 左上漂字;
        public static type5: number = 5// 右下漂字;
        public static type6: number = 6// 固定向上顶;
        public static type7: number = 7// 固定位置
        public static type8: number = 8// 固定位置


        public static HH: number = 35

        public v3d: Vector3D;
        public v2d: Vector2D;
        public text: string;
        public moveType: number; //移动方式; 1固定   2，中间飘，3位置飘


    }
    export class MsgTipItemRender extends Disp2DBaseText {
        public static textureSize1024: number = 1024
        public makeData(): void {

            this.ui.width = 1024 * 0.75;
            this.ui.height = PopMsgVo.HH * 0.75;

            this._msgTipVo = this._data;
            if (this._msgTipVo) {
                this.waitTime2000 = 3000;
                if (this._msgTipVo.moveType == PopMsgVo.type1) {
                    this.waitTime2000 = 1000;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type2) {
                    this.waitTime2000 = 1500;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type4) {
                    this.waitTime2000 = 1000;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type5) {
                    this.waitTime2000 = 1000;
                }
                if (this._msgTipVo.moveType == PopMsgVo.type7) {
                    this.waitTime2000 = 1500;
                }

                this.endTime = TimeUtil.getTimer() + this.waitTime2000;
                this.drawCtx();

                this.update();
            }
        }
        private waitTime2000: number = 3000;//2秒
        public endTime: number
        private drawCtx(): void {
            var $uiRect: UIRectangle = this.parent.uiAtlas.getRec(this.textureStr);
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($uiRect.pixelWitdh, $uiRect.pixelHeight, false);


            var txtLen: number = (FaceFontLabel.getFaceTxtStrLen(this._msgTipVo.text) * 25 + 20) * 1.0
            UiDraw.cxtDrawImg($ctx, PuiData.HASSEL, new Rectangle((MsgTipItemRender.textureSize1024 - txtLen) / 2, 0, txtLen, 36), UIData.publicUi);

            var $color: string = "[ff0000]"
            if (this._msgTipVo.moveType == PopMsgVo.type1) {
                $color = "[ffffff]"
            }
            if (this._msgTipVo.moveType == PopMsgVo.type2) {
                $color = "[0000ff]"
            }
            LabelTextFont.writeSingleLabelToCtx($ctx, $color + this._msgTipVo.text, 25, 0, 0, TextAlign.CENTER, "#ffffff", "#27262e")


            this.parent.uiAtlas.updateCtx($ctx, $uiRect.pixelX, $uiRect.pixelY);

        }
        private _msgTipVo: PopMsgVo
        public update(): void {
            if (this._msgTipVo) {
                var et: number = (1 - (this.endTime - TimeUtil.getTimer()) / this.waitTime2000);
                var $ty: number = MathClass.easeInOut(et, 0, 50, 1);
                var $tx: number = 0

                var $alp: AlphaUICompenent = <AlphaUICompenent>this.ui;
                $alp.alpha = Math.max(Math.min((1 - et) * 2, 1), 0);
                if (this._msgTipVo.moveType == PopMsgVo.type1) {
                    $ty = 0
                }
                if (this._msgTipVo.moveType == PopMsgVo.type2) {
                    $ty = 0
                }
                if (this._msgTipVo.moveType == PopMsgVo.type3) {
                    $ty = 0
                }
                if (this._msgTipVo.moveType == PopMsgVo.type7) {
                    $ty = et * 75
                }
                if (this._msgTipVo.moveType == PopMsgVo.type6) {
                    $ty = et * 40 * 2
                }
                if (this._msgTipVo.moveType == PopMsgVo.type4) {
                    $tx = $ty
                }
                if (this._msgTipVo.moveType == PopMsgVo.type5) {
                    $ty = -$ty
                    $tx = $ty
                }


                var $toV2d: Vector2D = new Vector2D();
                if (this._msgTipVo.v2d) {
                    $toV2d.x = this._msgTipVo.v2d.x / UIData.Scale - $tx;
                    $toV2d.y = this._msgTipVo.v2d.y / UIData.Scale - $ty
                }
                if (this._msgTipVo.v3d) {
                    //v2d.x = this._msgTipVo.v3d.x
                    //v2d.y = this._msgTipVo.v3d.y
                }
                this.ui.x = $toV2d.x - this.ui.width / 2;
                this.ui.y = $toV2d.y;
                if (this.endTime < TimeUtil.getTimer()) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        }

    }
    export class MsTip2DUIContianerPanel extends AlphaUiContianer {
        public constructor($classVo: any, $rect: Rectangle, $num: number) {
            super($classVo, $rect, $num);
        }
        public update(t: number): void {
            var $num1: number = 0;
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo: PopMsgVo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type1) {
                        $vo.v2d.y = 200 + $num1 * 40;
                        $num1++
                    }
                    this._uiItem[i].update();



                }
            }

        }
        /*
        public getNumByType($type: number): number
        {
            var $num: number = 0;
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo: PopMsgVo = this._uiItem[i].data;
                    if ($vo.moveType == $type) {
                        $num++
                    }
                }
            }
            return $num
        }
        */
        private getType6MaxTy(): number {
            var $maxY: number = 0
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo: PopMsgVo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type6) {
                        $maxY = Math.max(this._uiItem[i].ui.y, $maxY);
                    }
                }
            }
            return $maxY * UIData.Scale
        }
        public clearType2(): void {

            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo: PopMsgVo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type2) {
                        var $dd: MsgTipItemRender = <MsgTipItemRender>this._uiItem[i]
                        $dd.endTime = TimeUtil.getTimer();
                    }
                }
            }
        }
        public tureType6moveTy(): void {
            var $max: number = this.getType6MaxTy();
            var $ty: number = Math.max(0, $max - (250 - 40));
            for (var i: number = 0; i < this._uiItem.length; i++) {
                if (this._uiItem[i].data) {
                    var $vo: PopMsgVo = this._uiItem[i].data;
                    if ($vo.moveType == PopMsgVo.type6) {
                        $vo.v2d.y -= $ty;
                    }
                }
            }
        }
    }
    export class MsgTipManager extends Display3D {
        private static _instance: MsgTipManager;
        public static getInstance(): MsgTipManager {
            if (!this._instance) {
                this._instance = new MsgTipManager();
            }
            return this._instance;
        }
        public setPopMsgVo(value: PopMsgVo): void {
            if (value.moveType == PopMsgVo.type6) {
                this._jumpTxtContianerPanel.tureType6moveTy()
            }
            if (value.moveType == PopMsgVo.type2) {
                this._jumpTxtContianerPanel.clearType2()
            }
            var $vo: MsgTipItemRender = <MsgTipItemRender>this._jumpTxtContianerPanel.showTemp(value);
            if ($vo && value.moveType == PopMsgVo.type6) {
                var $PopMsgVo: PopMsgVo = $vo.data;
                $PopMsgVo.v2d.y = 250;
                $vo.ui.y = $PopMsgVo.v2d.y / UIData.Scale;//设置UI坐标
            }
        }
        private static id: number = 0
        public static setMsgId(value: number): void {
            //65546
            var $tb_msg: tb.TB_msg = tb.TB_msg.get_TB_msg(value)
            var $len: number = random(10) + 10;
            var $str: string = ""
            for (var i: number = 0; i < $len; i++) {
                $str += "中"
            }

            //全服广播1
            //升级提示2
            //拾取提示3
            //经验提示4
            //生命变化5
            //任务完成6
            //操作反馈7
            //属性、状态变化8
            //战斗提示9
            //行为状态提示10
            //地图信息11
            //战力提示12
            $tb_msg.msgtype = 7
            var showStr: string = "xxxxxxx"

            if ($tb_msg.msgtype == 1) {  //全服广播
                showStr = "[ffde13]玩家名字aecf[00ff00]获得/脸g[0000ff]神器[]";
                this.toSysHorn("[ffffff]" + $tb_msg.text);
                return;
            }
            if ($tb_msg.msgtype == 2) { //升级提示
                showStr = "升级提示升级提示升级提示升级提示";
            }
            if ($tb_msg.msgtype == 3) { //拾取提示
                showStr = "拾取提示拾取提示";
            }
            if ($tb_msg.msgtype == 7) { //操作反馈
                showStr = "操作反馈操作反馈";
            }
            this.outStr(showStr, this.getPopTypeByTB($tb_msg.msgtype))
            this.id++

        }
        public static getPopTypeByTB(msgtype: number): number {
            var $pType: number = PopMsgVo.type1
            if (msgtype == 2) { //升级提示
                $pType = PopMsgVo.type1
            }
            if (msgtype == 3) { //拾取提示
                $pType = PopMsgVo.type6
            }
            if (msgtype == 4) { //操作反馈
                $pType = PopMsgVo.type2
            }
            if (msgtype == 7) { //操作反馈
                $pType = PopMsgVo.type1
            }


            return $pType
        }

        public static setMsgData($msgVo: s2c_operation_failed): void {


            var $id: number = $msgVo.type * 65536 + $msgVo.reason;
            var $tb_msg: tb.TB_msg = tb.TB_msg.get_TB_msg($id);
            if ($tb_msg && $tb_msg.id) {
                var $newStr: string = $tb_msg.text;
                if ($msgVo.data != "") {
                    var $infoArr: Array<string> = $msgVo.data.split("|");
                    for (var i: number = 0; i < $infoArr.length; i++) {
                        var $oldStr: string = "{" + (i + 1) + "}";
                        $newStr = $newStr.replace($oldStr, $infoArr[i]);
                    }
                }
                // console.log("$aaa=", $newStr, "args = ", $msgVo);
                var $pType: number = 1;
                if ($tb_msg.msgtype == 1) {  //全服广播
                    this.toSysHorn("[ffffff]" + $newStr);
                    return;
                } else if ($tb_msg.msgtype == 15) {
                    AlertUtil.show($newStr, "", null, 1);
                } else if ($tb_msg.msgtype != 13) {
                    this.outStr($newStr, this.getPopTypeByTB($tb_msg.msgtype));
                }
                //console.log("提示信息：type:" + $msgVo.type + " reason:" + $msgVo.reason + " " + $msgVo.data,$newStr);
            } else {

                // console.log("操作失败：type:" + $msgVo.type + " reason:" + $msgVo.reason + " " + $msgVo.data);
            }


        }
        public static outStrById(a: number, b: number, $replItem: Array<string> = null): void {
            var $id: number = a * 65536 + b
            var $tb_msg: tb.TB_msg = tb.TB_msg.get_TB_msg($id);
            var $str: string = $tb_msg.text;

            for (var i: number = 0; $replItem && i < $replItem.length; i++) {
                var repls: string = "{" + (i + 1) + "}";
                $str = $str.replace(repls, $replItem[i]);
            }
            this.outStr($str, this.getPopTypeByTB($tb_msg.msgtype));
        }
        public static outStr($str: string, $type: number, $d2vPos: Vector2D = null): void {
            if ($type == 1 || $type == 99) {
                $type = 2;
            }

            var $vo: PopMsgVo = new PopMsgVo();
            $vo.text = ColorType.Redd92200 + $str;
            $vo.moveType = $type;
            $vo.v2d = new Vector2D((Scene_data.stageWidth / 2), (Scene_data.stageHeight / 2));
            if ($d2vPos) {
                $vo.v2d.x = $d2vPos.x
                $vo.v2d.y = $d2vPos.y
            }
            if ($vo.moveType == PopMsgVo.type1) {     //
                $vo.v2d.x = Scene_data.stageWidth / 2;
            }
            if ($vo.moveType == PopMsgVo.type2) {
                $vo.v2d.x = Scene_data.stageWidth / 2;
                $vo.v2d.y = Scene_data.stageHeight / 2;
            }
            if ($vo.moveType == PopMsgVo.type3) {
                $vo.v2d.x = Scene_data.stageWidth / 2;
                $vo.v2d.y = Scene_data.stageHeight / 2
            }
            if ($vo.moveType == PopMsgVo.type4) {
                $vo.v2d.x = Scene_data.stageWidth / 2 - 150
                $vo.v2d.y = Scene_data.stageHeight / 2 - 100

            }
            if ($vo.moveType == PopMsgVo.type5) {
                $vo.v2d.x = Scene_data.stageWidth / 2 + 150
                $vo.v2d.y = Scene_data.stageHeight / 2 - 100

            }

            MsgTipManager.getInstance().setPopMsgVo($vo);


        }

        private static toSysHorn($str: string): void {

            var $s2c_send_chat: s2c_send_chat = new s2c_send_chat()
            $s2c_send_chat.content = $str
            $s2c_send_chat.channel = SharedDef.CHAT_TYPE_HORM;
            //   GameInstance.mainUi.bottomCenterPanel.pushSysInfoTop($s2c_send_chat)
            var $MsgTipEvent: bottomui.BottomUiEvent = new bottomui.BottomUiEvent(bottomui.BottomUiEvent.BOTTOM_SYSTIME_HORM_INFO)
            $MsgTipEvent.data = $s2c_send_chat
            ModuleEventManager.dispatchEvent($MsgTipEvent);

        }

        private _jumpTxtContianerPanel: MsTip2DUIContianerPanel;//名字
        private _totalNum: number = 20
        public constructor() {
            super();
            this._jumpTxtContianerPanel = new MsTip2DUIContianerPanel(MsgTipItemRender, new Rectangle(0, 0, MsgTipItemRender.textureSize1024, PopMsgVo.HH), this._totalNum);
            SceneManager.getInstance().addDisplay2DList(this);
        }

        public update(): void {

            this._jumpTxtContianerPanel.update(0)
            for (var i: number = 0; i < this._jumpTxtContianerPanel.renderList.length; i++) {
                this._jumpTxtContianerPanel.renderList[i].update()
            }
        }
        public resize(): void {
            this._jumpTxtContianerPanel.resize();
            for (var i: number = 0; i < this._jumpTxtContianerPanel.renderList.length; i++) {
                this._jumpTxtContianerPanel.renderList[i].resize();
            }
        }
    }
}