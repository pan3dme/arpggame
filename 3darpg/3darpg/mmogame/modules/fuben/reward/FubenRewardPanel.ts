module fb {
    export class FubenRewardPanel extends UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private uiAtlasComplet: boolean = false;
        public constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            //this.layer = 90;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);

            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._midRender.uiAtlas = new UIAtlas;

            this.interfaceUI = true;
            
            this.upDataFun = (t: number) => { this.update(t) }
        }
        public applyLoad(): void {
            this._midRender.uiAtlas.setInfo("ui/uidata/fuben/reward/reward.xml", "ui/uidata/fuben/reward/reward.png", () => { this.loadConfigCom() });
        }
        private upDataFun: Function;
        private a_exit_time: UICompenent;
        private a_exit_but: UICompenent;
        private a_next_but: UICompenent;
        private a_tittle_name: FrameCompenent;
        private a_win_bg: UICompenent;
        private t_lab1: UICompenent;
        private t_lab2: UICompenent;
        //private base: UICompenent;

        private moveAry: Array<UICompenent>;
        private loadConfigCom(): void {

            this.moveAry = new Array;
            this._bottomRender.uiAtlas = this._midRender.uiAtlas;
            this._topRender.uiAtlas = this._midRender.uiAtlas;


            //this.base = this.addChild(this._bottomRender.getComponent("base"));
            
            this.a_win_bg = this.addChild(this._bottomRender.getComponent("a_win_bg"));
            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.a_win_bg.addEventListener(InteractiveEvent.Up, () => { }, this);
            this.a_win_bg.addEventListener(InteractiveEvent.Down, () => { }, this);

            this.t_lab1 = this._topRender.getComponent("t_lab1");
            this.t_lab2 = this._topRender.getComponent("t_lab2");

            this.moveAry.push(this.addChild(this._topRender.getComponent("a_fenge_line_0")));
            this.moveAry.push(this.addChild(this._topRender.getComponent("a_fenge_line_1")));

            this.moveAry.push(this.addChild(this._midRender.getComponent("a_content_title_bg")));
            this.moveAry.push(this.addChild(this._topRender.getComponent("a_content_label")));

            this.a_tittle_name = <FrameCompenent>this.addChild(this._topRender.getComponent("a_tittle_name"));

            this.a_exit_time = this.addChild(this._topRender.getComponent("a_exit_time"));
            this.a_exit_but = this.addEvntBut("a_exit_but", this._topRender);
            this.a_next_but = this._topRender.getComponent("a_next_but");
            this.a_next_but.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.moveAry.push(this.a_exit_time, this.a_exit_but);

            this.rewardItem = new Array;
            this.rewardnameItem = new Array;
            for (var i: number = 0; i < 6; i++) {
                this.rewardItem.push(this.addChild(this._topRender.getComponent("a_reward_icon" + i)));
                this.rewardnameItem.push(this.addChild(this._topRender.getComponent("a_reward_name" + i)));
            }
            this.uiAtlasComplet = true;
            this.applyLoadComplete();

        }

        public setLabMove($tf: boolean, $vo: s2c_send_instance_result): void {
            var yoffset: number = 0;
            if ($tf) {
                yoffset = 60;
                this.a_win_bg.height = this.a_win_bg.baseRec.height + yoffset;
                if (!this.t_lab1.parent) {
                    this.addChild(this.t_lab1);
                    this.addChild(this.t_lab2);
                }
                if ($vo.type == 15) {
                    var nameAry: Array<string> = $vo.data.split("|");
                    var numStr: string;
                    if (250 == $vo.state) {
                        numStr = ColorType.Green2ca937 + "+" + nameAry[0];
                    } else {
                        numStr = ColorType.colorcd2000 + nameAry[0];
                    }
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_lab1.skinName,
                        ColorType.Brown7a2f21 + "排位赛胜利,排位积分" + numStr, 16, TextAlign.CENTER);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.t_lab2.skinName,
                        ColorType.Brown7a2f21 + "当前积分:" + ColorType.Orange9a683f + + nameAry[1], 16, TextAlign.CENTER);
                }
            } else {
                this.a_win_bg.height = this.a_win_bg.baseRec.height;
                if (this.t_lab1.parent) {
                    this.removeChild(this.t_lab1);
                    this.removeChild(this.t_lab2);
                }
            }

            for (var i: number = 0; i < this.moveAry.length; i++) {
                this.moveAry[i].y = this.moveAry[i].baseRec.y + yoffset;
            }
            for (var i: number = 0; i < this.rewardItem.length; i++) {
                this.rewardItem[i].y = this.rewardItem[i].baseRec.y + yoffset;
                this.rewardnameItem[i].y = this.rewardnameItem[i].baseRec.y + yoffset;
            }
        }
        private rewardItem: Array<UICompenent>;
        private rewardnameItem: Array<UICompenent>;

        private showRewardIconItem($rewardData: Array<item_reward_info>): void {
            var $len: number = Math.min($rewardData.length, 6);
            for (var i: number = 0; i < 6; i++) {
                var $uiicon: UICompenent = this.rewardItem[i];
                var $uiname: UICompenent = this.rewardnameItem[i];
                if ($rewardData[i]) {
                    $uiicon.x = 446 + i * 100;
                    $uiicon.x -= ($len - 1) * 50;
                    $uiname.x = $uiicon.x - 4;

                    var $equId: number = $rewardData[i].item_id
                    var $tb_item_template: tb.TB_item_template = tb.TB_item_template.get_TB_item_template($equId);

                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, $uiname.skinName, getColorQua($tb_item_template.quality)+$tb_item_template.name, 14, TextAlign.CENTER);
                    IconManager.getInstance().drawItemIcon60($uiicon, $equId, $rewardData[i].num)
                } else {
                    $uiicon.x = 2000;
                    $uiname.x = 2000
                }
            }
        }

        private getBaseData(): Array<Array<number>> {
            var $arr: Array<Array<number>> = new Array();
            for (var i: number = 0; i < 3; i++) {
                var $temp: Array<number> = new Array();
                $temp.push(104);
                $temp.push(99);
                $arr.push($temp);
            }
            return $arr;

        }
        private lastTxtNum: number = 0;
        private endTime: number = 0;
        public update(t): void {
            if (this.uiAtlasComplet) {
                if (!this.hasStage) {
                    TimeUtil.removeFrameTick(this.upDataFun);
                } else {
                    var $time: number = Math.floor((this.endTime - TimeUtil.getTimer()) / 1000)
                    if ($time <= -1) {
                        this.hide();
                        if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_RISK && GuidData.map.isAdventureBossScene()) {//世界冒险boss特殊处理
                            this.gotoRisk();
                        }
                    } else if ($time >= 0 && this.lastTxtNum != $time) {
                        this.lastTxtNum = $time
                        console.log($time)
                        var endStr: string;
                        if (this._currentBtnType == 0) {
                            endStr = "自动退出"
                        } else {
                            endStr = "自动下一关"
                        }
                        LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_exit_time.skinName, ColorType.colorce0a00 + getScencdStr($time) + "秒后" + endStr, 14, TextAlign.CENTER);
                    }
                }
            }
        }
        protected butClik(evt: InteractiveEvent): void {

            if (evt.target == this.a_exit_but) {
                this.hide()
                NetManager.getInstance().protocolos.instance_exit(0);
            } else if (evt.target == this.a_next_but) {
                this.hide();
                if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_RISK && GuidData.map.isAdventureBossScene()) {//世界冒险boss特殊处理
                    this.gotoRisk();
                } else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_FACTION_TOWER) {
                    NetManager.getInstance().protocolos.faction_member_operate(SharedDef.FACTION_MANAGER_TYPE_TOWER_CHALLENGE, 0, 0, "", "");
                } else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_TRIAL) {
                    NetManager.getInstance().protocolos.enter_trial_instance();
                }
            }
        }

        public gotoRisk():void{
            ModuleEventManager.dispatchEvent(new SceneLoadEvent(SceneLoadEvent.SCENE_TRANSITION_EVENT));
            TimeUtil.addTimeOut(500,()=>{
                NetManager.getInstance().protocolos.enter_risk_instance();
            })
            
        }

        public setNextBtn($tf: boolean): void {
            if ($tf) {
                this.addChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x + 80;
                this.a_next_but.x = this.a_next_but.baseRec.x + 80;
            } else {
                this.removeChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x;
            }
        }

        /**
         * 0 退出按钮
         * 1 下一关按钮
         * 2 全部有
         */
        public _currentBtnType: number;
        public showBtnType($type: number): void {
            this._currentBtnType = $type;
            if ($type == 0) {
                this.addChild(this.a_exit_but);
                this.removeChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x;
            } else if ($type == 1) {
                this.removeChild(this.a_exit_but);
                this.addChild(this.a_next_but);
                this.a_next_but.x = this.a_exit_but.baseRec.x;
            } else if ($type == 2) {
                this.addChild(this.a_exit_but);
                this.addChild(this.a_next_but);
                this.a_exit_but.x = this.a_exit_but.baseRec.x + 80;
                this.a_next_but.x = this.a_next_but.baseRec.x + 80;
            }
        }

        private _dataVo: s2c_send_instance_result;
        public show($vo: s2c_send_instance_result): void {
            console.log($vo);
            this._dataVo = $vo;
            if ($vo.type == SharedDef.INSTANCE_SUB_TYPE_QUALIFY) {//排位赛显示积分
                this.setLabMove(true, $vo);
            } else {
                this.setLabMove(false, $vo);
            }

            //this.setNextBtn($vo.type == SharedDef.INSTANCE_SUB_TYPE_TRIAL);//试炼塔显示下一关
            var btnType: number = 0;
            if ($vo.type == SharedDef.INSTANCE_SUB_TYPE_TRIAL || $vo.type == SharedDef.INSTANCE_SUB_TYPE_FACTION_TOWER) {//试炼塔
                btnType = 2;
            } else if (this._dataVo.type == SharedDef.INSTANCE_SUB_TYPE_RISK && GuidData.map.isAdventureBossScene()) {//世界boss
                btnType = 1;
            }
            this.showBtnType(btnType);

            var $time: number = $vo.cd;
            if ($time < 5) {
                $time = 10;//特殊加上的
            }

            this.endTime = TimeUtil.getTimer() + $time * 1000;//未来时间
            TimeUtil.addFrameTick(this.upDataFun);
            UIManager.getInstance().addUIContainer(this);

            if (250 == $vo.state) {
                this.a_tittle_name.goToAndStop(0)
            } else {
                this.a_tittle_name.goToAndStop(1)
            }


            this.showRewardIconItem($vo.list)

        }
        private hide(): void {
            TimeUtil.removeFrameTick(this.upDataFun);
            UIManager.getInstance().removeUIContainer(this);
        }
    }
}