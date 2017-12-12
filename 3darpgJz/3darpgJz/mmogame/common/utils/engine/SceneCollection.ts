class SceneCollection extends SceneChar {
    private _specialType: number;
    public constructor() {
        super();

    }

    public showBlood($colorType: number = 0): void {

    }

    // public fixAstartData(pos: Vector2D): void {
    //     super.fixAstartData(pos);
    //     this.setOprateState();
    // }

    public setSpecialType($type: number): void {
        this._specialType = $type;
        // if ($type == 1) {//宝箱
        //     this.setOprateState();
        // }
    }


    /**是否为宝箱 */
    public isBx(): boolean {
        return this._specialType == 1;
    }

    private baoXiangBeginTime: number;
    // /**设置操作按钮状态 */
    // private setOprateState(): void {
    //     if (GuidData.map && GuidData.map.getMapID() != 0) {
    //         var bossInfo: any = this.applyOprateState(true);
    //         var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.SHOW_CHEST_EVENT);
    //         evt.data = bossInfo;
    //         ModuleEventManager.dispatchEvent(evt);
    //     }

    // }

    public getBossInfo(isAddTime: boolean): any {
        var bossInfo: any = GuidData.globelValue.getCurrentBossInfo();

        var $time: number = GameInstance.getGameSecond(bossInfo.time) * 1000;
        console.log("boss时间-------------------" + $time);
        bossInfo.outTime = $time;
        // if ($time > 0) {
        //     if (GuidData.player.getGuid() == bossInfo.owner) {
        //         this.showOprateState();
        //     } else {
        //         if(isAddTime){
        //             TimeUtil.addTimeOut($time, () => { this.changeState() })
        //         }
        //     }
        // } else {
        //     this.showOprateState();
        // }

        return bossInfo;
    }

    private _currentOprateState: boolean = false;
    public setOprateState(tf: boolean): void {
        var pickName: string = this.unit.getPickName();
        var myName: string = GameInstance.mainChar.unit.getName();

        var resultState:boolean = false;
        if (tf) {//在范围内
            if (pickName != "") {
                if (myName != pickName) {
                    //攻击
                    resultState = false;
                }else{
                    //采集
                    resultState = true;
                }
            }else{
                //采集
                resultState = true;
            }
        }else{//不在范围内
            //攻击
            resultState = false;
        }

        if(resultState != this._currentOprateState){
            if(resultState){
                this.showOprateState();
            }else{
                this.hideOprateState();
            }

            this._currentOprateState = resultState;
        }


    }

    public changeState(): void {
        var pickName: string = this.unit.getPickName();
        var myName: string = GameInstance.mainChar.unit.getName();
        // if (pickName != "") {
        //     if (myName != pickName) {
        //         this.hideOprateState();
        //     }
        // } else {
        //     this.getBossInfo(false);
        //     //this.showOprateState();
        // }
        console.log("当前正在采集:" + pickName + "当前名字：" + myName);
        var time: number = this.unit.getPickTime();
        console.log("采集时间:" + time);
        time = 5000;

        var evt: boss.BossEvent = new boss.BossEvent(boss.BossEvent.CHEST_CHANGE_EVENT);
        evt.data = { "name": pickName, "time": time };
        ModuleEventManager.dispatchEvent(evt);
    }

    public showOprateState(): void {
        var evt: mainUi.MainOperatEvent = new mainUi.MainOperatEvent(mainUi.MainOperatEvent.SHOW_MAIN_OPERAT_EVENT);
        evt.data = null;
        evt.triggerOne = false;
        evt.fun = ($data: any) => {
            NetManager.getInstance().protocolos.use_broadcast_gameobject(this.unit.getUintGuid());
        }
        ModuleEventManager.dispatchEvent(evt);
    }

    public hideOprateState(): void {
        var evt: mainUi.MainOperatEvent = new mainUi.MainOperatEvent(mainUi.MainOperatEvent.HIDE_MAIN_OPERAT_EVENT);
        ModuleEventManager.dispatchEvent(evt);
    }

    public destory(): void {
        super.destory();
        if (this._specialType == 1) {
            this.hideOprateState();
        }
    }


}