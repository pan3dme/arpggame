module training {

    export class TaskCell {
        public leftbg: UICompenent
        public rightbg: UICompenent
        public title: UICompenent
        public taskmap: UICompenent
        public taskinfo: UICompenent
        public line: UICompenent
        public resui: UICompenent
        public unopened: UICompenent
        public rewardtitle: UICompenent
        public rewardary: Array<UICompenent>
        public btn: FrameCompenent
        public openlev: UICompenent
        public data: TaskVo
        public parent: TrainingTask

        public setVo($vo: TaskVo, $indx: number) {
            this.data = $vo;
            this.parent.setUiListVisibleByItem([this.leftbg, this.rightbg, this.title, this.taskmap, this.taskinfo, this.line, this.resui, this.rewardtitle, this.btn, this.openlev], true);
            this.parent.setUiListVisibleByItem(this.rewardary, true);

            this.setXY($indx);
            LabelTextFont.writeSingleLabel(this.title.uiRender.uiAtlas, this.title.skinName, $vo.tab_quest.questName, 16, TextAlign.CENTER, ColorType.Whitefff4d6);
            this.drawReward($vo.tab_quest.rewards);
            this.taskuidraw();
            if ($vo.questData == null) {
                this.btn.goToAndStop(3);
                LabelTextFont.writeSingleLabel(this.openlev.uiRender.uiAtlas, this.openlev.skinName, "LV" + $vo.tab_quest.level + "解锁", 16, TextAlign.CENTER, ColorType.Brown7a2f21);
            } else {
                UiDraw.clearUI(this.openlev);
                if ($vo.questData.taskState == SharedDef.QUEST_STATUS_END) {
                    this.btn.goToAndStop(2);
                } else {
                    this.btnChgbyRes()
                }
            }

            this.btn.addEventListener(InteractiveEvent.Up, this.click, this)
        }

        public click(evt: InteractiveEvent): void {
            var vo: TaskVo = this.data
            if (vo.questData != null && vo.questData.taskState != SharedDef.QUEST_STATUS_END) {
                UiTweenScale.getInstance().changeButSize(evt.target);
                if (GuidData.player.getResType(vo.tab_adventure.upres[0]) < vo.tab_adventure.upres[1]) {
                    var $taskVo: quest.QuestTaskVo = new quest.QuestTaskVo();
                    $taskVo.questDataVo = vo.questData
                    quest.QuestModel.getInstance().meshQuestTargets($taskVo, vo.tab_quest.targetsPosition[0]);
                    ModuleEventManager.dispatchEvent(new TrainingEvent(TrainingEvent.HIDE_TRAINING_PANEL))
                } else {
                    NetManager.getInstance().protocolos.pick_quest_adventure(vo.questData.indx);
                }
            }

        }

        private setXY($indx: number) {
            var difval: number = $indx * 266;
            this.leftbg.x = difval + 64
            this.rightbg.x = this.leftbg.x + this.leftbg.width
            this.title.x = difval + 141
            this.taskmap.x = difval + 130
            this.taskinfo.x = difval + 91
            this.line.x = difval + 96
            this.resui.x = difval + 128
            this.unopened.x = difval + 122
            this.rewardtitle.x = difval + 86
            this.btn.x = difval + 138
            this.openlev.x = difval + 142
            for (let i = 0; i < this.rewardary.length; i++) {
                this.rewardary[i].x = difval + 111 + i * 60
            }
        }

        private btnChgbyRes() {
            var index: number = GuidData.player.getResType(this.data.tab_adventure.upres[0]) < this.data.tab_adventure.upres[1] ? 0 : 1
            this.btn.goToAndStop(index);
        }

        private drawCurCardNum() {
            var uiRect: UIRectangle = this.resui.uiRender.uiAtlas.getRec(this.resui.skinName);
            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(uiRect.pixelWitdh, uiRect.pixelHeight, false);

            var propid: number = this.data.tab_adventure.upres[0];
            var propnum: number = this.data.tab_adventure.upres[1];
            var txtcolor: string = GuidData.player.getResType(propid) >= propnum ? ColorType.Green2ca937 : ColorType.Redd92200;
            var str: string = ColorType.color9a683f + getResName(propid) + ":" + txtcolor + GuidData.player.getResTypeStr(propid)
            var posx = LabelTextFont.writeSingleLabelToCtx(ctx, str, 16, 0, 10, TextAlign.LEFT);
            UiDraw.cxtDrawImg(ctx, UIuitl.getInstance().costtype(propid), new Rectangle(posx, 0, 35, 35), UIData.publicUi);

            this.resui.uiRender.uiAtlas.updateCtx(ctx, uiRect.pixelX, uiRect.pixelY);


            if (this.data.questData != null && this.data.questData.taskState != SharedDef.QUEST_STATUS_END) {
                this.btnChgbyRes()
            }
        }

        public taskuidraw() {
            var $vo: TaskVo = this.data;
            this.parent.setUiListVisibleByItem([this.unopened], $vo.questData == null);
            this.parent.setUiListVisibleByItem([this.taskmap, this.taskinfo, this.line, this.resui], $vo.questData != null);
            LabelTextFont.writeSingleLabel(this.taskmap.uiRender.uiAtlas, this.taskmap.skinName, ColorType.Brown7a2f21 + "任务地图：" + ColorType.Green2ca937 + tb.TB_map.getTB_map($vo.tab_quest.targetsPosition[0][1]).name, 16, TextAlign.CENTER);
            
            var propid: number = $vo.tab_adventure.upres[0];
            var propnum: number = $vo.tab_adventure.upres[1];
            var txtcolor: string = GuidData.player.getResType(propid) >= propnum ? ColorType.Green2ca937 : ColorType.Redd92200;

            var str: string = ColorType.Brown7a2f21 + $vo.tab_quest.text[0][0] + "(" +txtcolor+ GuidData.player.getResTypeStr(propid) + ColorType.Brown7a2f21 + "/" + propnum + ")";
            if ($vo.tab_quest.hint[0] && $vo.tab_quest.hint[0][0]) {
                str = str + "\n" + $vo.tab_quest.hint[0][0]
            }
            LabelTextFont.writeTextAutoCenter(this.taskinfo.uiRender.uiAtlas, this.taskinfo.skinName, str, 16, ColorType.Brown7a2f21, 180, true);

            this.drawCurCardNum();
        }

        private drawReward($reward: Array<Array<Array<number>>>) {
            for (var i = 0; i < this.rewardary.length; i++) {
                if ($reward[0][i]) {
                    IconManager.getInstance().drawItemIcon40(this.rewardary[i], $reward[0][i][0], $reward[0][i][1]);
                } else {
                    UiDraw.clearUI(this.rewardary[i]);
                }
            }

        }

        public clearUi() {
            this.btn.removeEventListener(InteractiveEvent.Up, this.click, this)
            this.data = null;
            this.parent.setUiListVisibleByItem([this.leftbg, this.rightbg, this.title, this.taskmap, this.taskinfo, this.line, this.resui, this.rewardtitle, this.btn, this.openlev], false);
            this.parent.setUiListVisibleByItem(this.rewardary, false);
        }

    }

    export class TrainingTask extends UIVirtualContainer {
        private _bgRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        // private _redPointRender: RedPointRender;

        public dispose(): void {
            this._bgRender.dispose();
            this._bgRender = null;
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            // this._redPointRender.dispose();
            // this._redPointRender = null;
        }

        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)
            this._baseRender = new UIRenderComponent;
            this.addRender(this._baseRender)
            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)
            // this._redPointRender = new RedPointRender;
            // this.addRender(this._redPointRender);
        }

        public initUiAtlas($uiAtlas): void {
            this._bgRender.uiAtlas = $uiAtlas;
            this._baseRender.uiAtlas = $uiAtlas;
            this._topRender.uiAtlas = $uiAtlas;
            this.initView();
        }

        private ArrowAry: Array<UICompenent>
        private a_arrowright: UICompenent
        private a_arrowleft: UICompenent
        private taskCellAry: Array<TaskCell>;
        private initView(): void {
            var renderLevel = this._baseRender;

            this.taskCellAry = new Array
            for (let i = 0; i < 3; i++) {
                var $taskCell: TaskCell = new TaskCell();
                $taskCell.parent = this;
                $taskCell.leftbg = this._bgRender.getComponent("leftbg0");
                $taskCell.leftbg.isU = true;
                $taskCell.rightbg = this._bgRender.getComponent("right0");
                $taskCell.title = this._topRender.getComponent("a_name" + i);
                $taskCell.taskmap = this._baseRender.getComponent("a_task" + i + "0")
                $taskCell.taskinfo = this._baseRender.getComponent("a_task" + i + "1")
                $taskCell.line = this._baseRender.getComponent("a_task02")
                $taskCell.resui = this._baseRender.getComponent("a_task" + i + "3")
                $taskCell.unopened = this._baseRender.getComponent("a_task04")
                $taskCell.rewardtitle = this._baseRender.getComponent("a_rewardtitle0")
                $taskCell.rewardary = new Array
                for (var j = 0; j < 3; j++) {
                    $taskCell.rewardary.push(this.addChild(this._baseRender.getComponent("a_reward" + i + "" + j)));
                }
                $taskCell.btn = <FrameCompenent>this.addChild(this._baseRender.getComponent("a_btn0"));
                $taskCell.openlev = this.addChild(this._topRender.getComponent("a_openlev" + i));
                this.taskCellAry.push($taskCell);
            }


            this.ArrowAry = new Array
            this.a_arrowleft = this.addEvntButUp("a_arrowleft", this._topRender);
            this.a_arrowleft.isU = true;
            this.a_arrowright = this.addEvntButUp("a_arrowright", this._topRender);
            this.ArrowAry.push(this.a_arrowright);
            this.ArrowAry.push(this.a_arrowleft);

            this._topRender.applyObjData();
            // this._btn1RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn0.x + this.cnew_btn0.width, this.cnew_btn0.y));
            // this._btn0RedPoint = this._redPointRender.getRedPointUI(this, 0, new Vector2D(this.cnew_btn1.x + this.cnew_btn1.width, this.cnew_btn1.y));
        }

        public resize(): void {
            // this.b_bg1.top = 0
            // this.b_bg1.left = 0
            // this.b_bg1.y = 0;
            // this.b_bg1.x = 0;
            // this.b_bg1.height = Scene_data.stageHeight / UIData.Scale;
            // this.b_bg1.width = Scene_data.stageWidth / UIData.Scale;
            super.resize();
        }

        private _curpage: number;
        private set curpage($val) {
            if ($val == 1) {
                this.setUiListVisibleByItem([this.ArrowAry[1]], false);
            } else {
                this.setUiListVisibleByItem([this.ArrowAry[1]], true);
            }

            var total: number = Math.ceil(this._itemAry.length / 3);
            if (total == $val) {
                this.setUiListVisibleByItem([this.ArrowAry[0]], false);
            } else {
                this.setUiListVisibleByItem([this.ArrowAry[0]], true);
            }
            this._curpage = $val;

            this.drawUI();
        }

        private get curpage(): number {
            return this._curpage;
        }

        private drawUI() {
            for (var i = 0; i < 3; i++) {
                var idx: number = 3 * (this.curpage - 1) + i;
                if (idx > this._itemAry.length - 1) {
                    this.taskCellAry[i].clearUi();
                } else {
                    this.taskCellAry[i].setVo(this._itemAry[idx], i);

                }
            }
        }

        public refreshServerData() {
            this._itemAry = TrainingModel.getInstance().getTaskvo();
            this.drawUI();
        }

        //令牌数量变化刷新
        public refreshCurCardNum() {
            for (var i = 0; i < this.taskCellAry.length; i++) {
                if (this.taskCellAry[i].data) {
                    this.taskCellAry[i].taskuidraw();
                }
            }
        }


        private _itemAry: Array<TaskVo>
        public show(): void {
            UIManager.getInstance().addUIContainer(this);

            this._itemAry = TrainingModel.getInstance().getTaskvo();
            this.curpage = 1;

            this.resize();
        }

        public hide(): void {
            UIManager.getInstance().removeUIContainer(this);
        }


        public butClik(evt: InteractiveEvent): void {
            UiTweenScale.getInstance().changeButSize(evt.target);
            switch (evt.target) {
                case this.a_arrowleft:
                    this.curpage--;
                    break;
                case this.a_arrowright:
                    this.curpage++;
                    break;

                default:
                    break;
            }
        }
    }
}