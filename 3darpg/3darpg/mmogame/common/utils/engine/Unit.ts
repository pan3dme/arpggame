//
class SkillServesVo {
    public id: number;
    public lev: number;
}

class BuffUnit {
    public item: Object
    private unit: Unit
    public constructor($unit: Unit) {
        this.unit = $unit
    }
    private changeBuffById($indx: number): void {
        var id: number = $indx >> 1;
        var di: number = $indx & 1;
        var $buffid: number = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF + id, di);
        var $endTime: number = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF_TM + id, di);
        if ($buffid != 0) {
            var $time: number = $endTime;
            //console.log("buff=》change", $indx);
            // console.log("uffid, time", $buffid, $time);
            this.item[$buffid] = TimeUtil.getTimer() + $time * 1000;
        }
    }

    public getBuffGiverByBuffId($id: number): number {
        for (var i: number = 0; i < SharedDef.MAX_UNIT_BUFF; i++) {
            var id: number = i >> 1;
            var di: number = i & 1;
            var $buffid: number = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF + id, di);
            if ($id == $buffid) {
                return this.unit.GetUInt32(SharedDef.UNIT_FIELD_BUFF_CASTER_GUID + i);
            }
        }
        return -1
    }

    public resetAllBufData(): void {
        this.item = new Object
        for (var i: number = 0; i < SharedDef.MAX_UNIT_BUFF; i++) {
            this.changeBuffById(i);
        }
        this.resetVisible()

    }
    private resetVisible(): void {
        if (this.unit.sceneChar) {
            this.unit.sceneChar.showName();
        }
        if (this.unit.isMain) {
            ModuleEventManager.dispatchEvent(new topui.TopUiEvent(topui.TopUiEvent.REFRESH_TOP_LEFT_BUFF));
        }
    }
    public isBuffNeedGetByID($indx: number): boolean {

        var $hasBuff: boolean = false
        var id: number = $indx >> 1;
        var di: number = $indx & 1;
        var $buffid: number = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF + id, di);
        var $endTime: number = this.unit.GetUInt16(SharedDef.UNIT_FIELD_BUFF_TM + id, di);
        if ($buffid != 0) {
            $hasBuff = true
        }
        return $hasBuff;
    }
    public getSubscribeInfo(): void {
        var $needGet: boolean = false
        for (var i: number = SharedDef.UNIT_FIELD_BUFF_CASTER_GUID; i < SharedDef.UNIT_FIELD_FORCE; i++) {
            var $indx: number = i - SharedDef.UNIT_FIELD_BUFF_CASTER_GUID;
            if (this.isBuffNeedGetByID($indx)) {
                $needGet = true
            }
        }
        if ($needGet) {
            // console.log("请求订阅", this.unit.uintGuid);
            NetManager.getInstance().protocolos.clientSubscription(this.unit.uintGuid);
        } else {
            this.item = null;
            this.resetVisible();

        }
    }
    public isBuffByID(value: number): boolean {
        if (this.item && this.item[value]) {
            return true;
        } else {
            return false;
        }

    }

}
class Unit extends GuidObject {
    public path: Array<Vector2D> = new Array;

    public sceneChar: SceneChar;

    public uintGuid: number;

    public isMain: boolean = false;

    private originalRotation: number = 0;

    public buffUnit: BuffUnit

    public constructor(g: string = "") {
        super(g);

    }
    public ReadFromCopy(flags: number, bytes: ByteArray, evFilter: SyncEventFilter = null): boolean {

        if (!this.buffUnit) {
            this.buffUnit = new BuffUnit(this)
        }
        return super.ReadFrom(flags, bytes, evFilter);
    }

    public ReadFrom(flags: number, bytes: ByteArray, evFilter: SyncEventFilter = null): boolean {
        if (this.ReadFromCopy(flags, bytes, evFilter)) {
            //创建包会带路径信息
            if (flags & SyncEvent.OBJ_OPT_NEW) {

                var x: number = bytes.readShort();
                var y: number = bytes.readShort();


                var last_x: number = x;
                var last_y: number = y;
                this.path.push(new Vector2D(last_x, last_y));

                var len = bytes.readShort();
                for (var i: number = 0; i < len; i += 2) {
                    last_x += bytes.readByte();
                    last_y += bytes.readByte();
                    this.path.push(new Vector2D(last_x, last_y));
                }

                var tempr: number = bytes.readFloat()-Math.PI;
              //  console.log(tempr)
                this.originalRotation = - radian2angle(tempr)
              //  this.originalRotation = 0

                this.onCreated();
            }
        }
        else {
            return false;
        }
        return true;
    }
    public onBaseCreated(): void {
        this.buffUnit = new BuffUnit(this);
        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };


    }


    public getUnitStringFieldGroupPeaceId(): string {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_FACTION_GUID);
    }
    public getUnitStringFieldFactionGuid(): string {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_FACTION_GUID);
    }




    public dataUpdate($intMask: Object, $strMask: Object): void {

        var $dic: any = new Object();
        for (var k in $intMask) {
            var kNum: number = Number(k);
            if (kNum < SharedDef.UNIT_FIELD_BUFF_CASTER_GUID || kNum >= SharedDef.UNIT_FIELD_FORCE) continue;
            var idex: number = kNum - SharedDef.UNIT_FIELD_BUFF_CASTER_GUID;
            if (!$dic[idex]) {
                $dic[idex] = 1;
            }
        }
        var $needGetBuff: boolean = false
        for (var $key in $dic) {
            $needGetBuff = true
        }
        if ($needGetBuff) {
            // console.log(this.uintGuid, "buff数据有变");
            this.buffUnit.getSubscribeInfo()
        }

    }
    private _hasCreated: boolean = false;
    public onCreated(): void {
        this.uintGuid = ObjectDef.getGUIDIndex(this._guid);
        this.buffUnit.getSubscribeInfo()
        var tf: boolean;
        if (this._hasCreated) {
            tf = this.sceneChar ? true : false;
        } else {
            tf = SceneCharManager.getInstance().creatChar(this);
        }
        //console.log("创建UINT", this.getGuid())
        if (tf) {
            if (!this._hasCreated) {
                this.sceneChar.moveToPos2D = this.path[0];
                if (!this.isMain && this.path.length > 1) {
                    this.path.shift()
                    this.sceneChar.applyWalk(this.path)
                }
            }
            this.sceneChar.speedUseTime = this.getSpeed();
            this.sceneChar.forceRotationY = this.originalRotation;
            this.sceneChar.setAstarNrmAndRotation();
            this.sceneChar.refreshHP();
            RelationManager.getInstance().refresh();
        }
        this.sceneChar.isBoss = this.getIsBoss();

        if (this._hasCreated) {
            return;
        }
        this.AddListen(SharedDef.UNIT_FIELD_MOVE_SPEED, ($binlog: BinLogStru) => {
            this.sceneChar.refreshSpeed();
        });

        this.AddListen(SharedDef.UNIT_FIELD_EQUIPMENT_COAT, ($binlog: BinLogStru) => {
            this.changeCoat();
        })

        this.AddListen(SharedDef.UNIT_FIELD_EQUIPMENT_MAIN_WEAPON, ($binlog: BinLogStru) => {
            this.changeWeapon();
        })
        this.AddListen(SharedDef.UNIT_FIELD_DIVINE_ID, ($binlog: BinLogStru) => {
            this.changeWeapon();
        })

        this.AddListen(SharedDef.UNIT_FIELD_ANGER, ($binlog: BinLogStru) => {
            this.changeAnger();
   
        })

        this.AddListen(SharedDef.UNIT_FIELD_MOUNT_LEVEL, ($binlog: BinLogStru) => {
            this.mountChange();
        })

        this.AddListen(SharedDef.UINT_INT_FIELD_WINGS_RANK, ($binlog: BinLogStru) => {
            this.wingChange();
        })

        this.AddListen(SharedDef.UNIT_FIELD_MAX_HEALTH, ($binlog: BinLogStru) => {
            this.sceneChar.refreshHP();
        })
        this.AddListen(SharedDef.UNIT_FIELD_BYTE_0, ($binlog: BinLogStru) => {
            this.sceneChar.unitFieldByteChg();
        })
        this.AddListen(SharedDef.UINT_FIELD_XIANFU_INFO, ($binlog: BinLogStru) => {
            this.sceneChar.refreshTittle();
        })
        this.AddListen(SharedDef.UNIT_FIELD_BYTE_2, ($binlog: BinLogStru) => {
            this.sceneChar.refreshTittle();
        })
        this.AddListen(SharedDef.UINT_INT_FIELD_ILLUSION, ($binlog: BinLogStru) => {

            this.sceneChar.refreshIllusion();
        })
        this.AddListenString(SharedDef.UNIT_STRING_FIELD_PICK_NAME, ($binlog: BinLogStru) => {
            if (this.sceneChar instanceof SceneCollection) {
                (<SceneCollection>this.sceneChar).changeState();
            }
        })
        this.AddListenString(SharedDef.BINLOG_STRING_FIELD_OWNER, ($binlog: BinLogStru) => {
            RelationManager.getInstance().refresh();
        })
        this._hasCreated = true;
    }
    public getIllusionId(): number {

        return this.GetUInt32(SharedDef.UINT_INT_FIELD_ILLUSION);
    }
    public isInvishibel(): boolean {
        return this.buffUnit.isBuffByID(SharedDef.BUFF_INVISIBLE);
    }
    public isBuffRoad(): boolean {
        return this.buffUnit.isBuffByID(SharedDef.BUFF_ROAR);
    }

    public getXianfuBaoXiang(): number {
        return this.GetByte(SharedDef.UINT_FIELD_XIANFU_INFO, 0);
    }
    /**战斗力 */
    public getForce(): number {
        return Math.floor(this.GetDouble(SharedDef.UNIT_FIELD_FORCE));
    }

    private mountChange(): void {
        this.sceneChar.setMount();
    }

    private wingChange(): void {
        this.sceneChar.setWing();
    }

    public getWing(): number {
        //UINT_INT_FIELD_WINGS_RANK
        return this.GetUInt32(SharedDef.UINT_INT_FIELD_WINGS_RANK);
    }

    /**是否骑乘 */
    public hasMount(): boolean {
        return this.GetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 2) == 1;
    }
    /**坐坐骑上下来**/
    public setDownMount(): void {
        this.SetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 2, 0);
    }
    /**坐骑阶数*/
    public getMountRank(): number {
        return this.GetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 0);
    }
    /**坐骑幻化ID */
    public getMountIllusionID(): number {
        return this.GetByte(SharedDef.UNIT_FIELD_MOUNT_LEVEL, 3);
    }

    private changeAnger(): void {
        if (this.sceneChar) {
            this.sceneChar.refreshTittle();
        }
    }


    private changeCoat(): void {

        // var num: number = this.getAvatar();
        // if (this.sceneChar) {
        //     if (num== 0) {
        //         num = tb.TB_char_info.getTempVo(this.getCharType()).avatar;
        //     } else {
        //         num = tb.TB_appearance_info.getTempVo(num).avatar;
        //     }
        //     this.sceneChar.setAvatar(num);
        // }

        if (this.sceneChar) {
            this.sceneChar.setAvatarExterior();
        }
    }

    private changeWeapon(): void {

        this.sceneChar.setWeaponDivine();
    }

    public getTabelAvater(value: number): number {
        var roleAvatar: number
        if (value == 0) {
            roleAvatar = tb.TB_char_info.getTempVo(this.getCharType()).avatar;
        } else {
            roleAvatar = tb.TB_appearance_info.getTempVo(value).avatar;
        }
        return roleAvatar;
    }

    public getAvatar(): number {

        return this.GetUInt32(SharedDef.UNIT_FIELD_EQUIPMENT_COAT);
    }
    public getDivine(): number {
        return this.GetUInt32(SharedDef.UNIT_FIELD_DIVINE_ID);
    }

    public getWeapon(): number {

        return this.GetUInt32(SharedDef.UNIT_FIELD_EQUIPMENT_MAIN_WEAPON)
    }
    //职业
    public getCharType(): number {
        return this.GetUInt8(SharedDef.UNIT_FIELD_BYTE_1, 0);
    }

    //称号
    public getCharTittle(): number {
        return this.GetUInt8(SharedDef.UNIT_FIELD_BYTE_2, 3);
    }



    public getPickName(): string {
        return this.GetStr(SharedDef.UNIT_STRING_FIELD_PICK_NAME);
    }

    public getPickTime(): number {
        return this.GetUInt32(SharedDef.UNIT_FIELD_PROCESS_TIME);
    }

    public tempSendPath: Array<number> = new Array;
    public sendPath(sp: Array<Vector2D>): void {
        if (!this.isMain) {
            return;
        }

        var beginPos: Vector2D = sp[0];
        this.tempSendPath.length = 0;
        for (var i: number = 1; i < sp.length; i++) {
            this.tempSendPath.push(sp[i].x - sp[i - 1].x, sp[i].y - sp[i - 1].y);
        }
        if (!beginPos) {
            console.log("有错")
        }

        // console.log("寻路发送GUID和路线=====>", this.uintGuid, beginPos.x, beginPos.y, this.tempSendPath);
        NetManager.getInstance().protocolos.unit_move(this.uintGuid, beginPos.x, beginPos.y, this.tempSendPath);
    }

    private sendStop(pos: Vector2D): void {
        if (!this.isMain) {
            return;
        }
        NetManager.getInstance().protocolos.move_stop(this.uintGuid, pos.x, pos.y);

    }

    public setSceneChar(sc: SceneChar): void {
        if (sc) {
            this.sceneChar = sc;
            sc.unit = this;
        }
    }
    public setPath($path: Array<Vector2D>): void {
        // console.log("收到路径消息：" + this.guid);
        if (!this.isMain && this.sceneChar) {
            this.sceneChar.applyWalk($path);
        }
    }
    public setJump($topos: Vector2D): void {
        if (this.sceneChar) {

            var $arr: Array<Vector3D> = new Array();
            var b: Vector3D = AstarUtil.getWorldPosByStart2D($topos)
            b.y = AstarUtil.getHeightByPos(b)
            $arr.push(this.sceneChar.getCurrentPos());
            $arr.push(b);

            this.sceneChar.applyJump($arr, 1000);


        }
    }

    public msgSpellStop(): void {
        if (this.sceneChar) {
            this.sceneChar.msgSpellStop()
        }
    }
    public setJumpShow($arr: Array<Array<number>>, $t: number): void {
        if (this.sceneChar) {
            var $jumpArr: Array<Vector3D> = new Array();
            $jumpArr.push(this.sceneChar.getCurrentPos());
            for (var i: number = 0; i < $arr.length; i++) {
                var $pos: Vector3D = AstarUtil.getWorldPosByStart2D(new Vector2D($arr[i][0], $arr[i][1]))
                $pos.y = AstarUtil.getHeightByPos($pos);
                if (this.sceneChar.isMount && i < ($arr.length - 1)) {
                    $pos.y -= 40;//40为坐骑高度;
                }
                $jumpArr.push($pos);
            }
        }
        this.sceneChar.applyJump($jumpArr, $t);
    }


    public stop(xpos: number, ypos: number): void {
        //console.log("收到停止消息：" + this.guid + "," + xpos + "," + ypos);
        if (this.sceneChar) {
            this.sceneChar.moveToPos2D = (new Vector2D(xpos, ypos));
        }
    }

    public dispose(): void {
        if (this.sceneChar) {
            SceneCharManager.getInstance().removeSceneChar(this.sceneChar);
        }
        // if (this.getIsBoss()) {

        // }
        super.dispose();
    }

    public getSpeed(): number {
        return this.GetUInt32(SharedDef.UNIT_FIELD_MOVE_SPEED);
    }
    public getLevel(): number {
        return this.GetUInt16(SharedDef.UNIT_FIELD_UINT16_0, 1);
    }
    public getVipLevel(): number {
        return this.GetUInt32(SharedDef.UINT_FIELD_VIP_LEVEL);
    }
    public getHp(): number {
        return this.GetUInt32(SharedDef.UNIT_FIELD_HEALTH);
    }
    public getAnger(): number {
        return this.GetUInt32(SharedDef.UNIT_FIELD_ANGER);
    }

    public setHp(val: number): void {
        //console.log(val,"/",this.getMaxHp())
        this.SetUInt32(SharedDef.UNIT_FIELD_HEALTH, val);
    }

    public getMaxHp(): number {
        return this.GetUInt32(SharedDef.UNIT_FIELD_MAX_HEALTH);
    }

    //当前血量，展示用
    public getCurHpView(): number {
        return Math.floor(this.getHp() / 100);
    }
    //最大血量，展示用
    public getMaxHpView(): number {
        return Math.floor(this.getMaxHp() / 100);
    }

    public getTypeID(): number {
        return this.GetByte(SharedDef.UNIT_FIELD_BYTE_0, 0);
    }
    public getAlivestate(): number {
        return this.GetByte(SharedDef.UNIT_FIELD_BYTE_0, 1);
    }

    public getEntry(): number {
        return this.GetUInt16(SharedDef.UNIT_FIELD_UINT16_0, 0);
    }
    /**是否是Boss */
    public getIsBoss(): boolean {

        return this.GetBit(SharedDef.UNIT_FIELD_FLAGS, SharedDef.UNIT_FIELD_FLAGS_IS_BOSS_CREATURE)
    }
    /**是否是野怪 */
    public isMonster(): boolean {
        return this.getTypeID() == SharedDef.TYPEID_UNIT && this.GetUInt32(SharedDef.UNIT_FIELD_NPC_FLAG) == 0;
    }
    /**是否是NPC */
    public isNpc(): boolean {
        return this.getTypeID() == SharedDef.TYPEID_UNIT && this.GetUInt32(SharedDef.UNIT_FIELD_NPC_FLAG) == 1;
    }
    /**是否是技能用NPC */
    public isSkillNpc(): boolean {
        return this.GetBit(SharedDef.UNIT_FIELD_FLAGS, SharedDef.UNIT_FIELD_FLAGS_IS_INVISIBLE_SPELL)
    }
    public getOwner(): string {
        return this.GetStr(SharedDef.BINLOG_STRING_FIELD_OWNER);
    }
    /**是否是玩家 */
    public isPlayer(): boolean {
        return this.getTypeID() == SharedDef.TYPEID_PLAYER;
    }
    public getPlayerGUID(): string {
        var str: string = this.getGuid();
        var ary: Array<string> = str.split(".");
        if (ary.length == 3) {
            return ary[1] + "." + ary[2];
        }
        return "";
    }
    /**数值GUID */
    public getUintGuid(): number {
        var str: string = this.getGuid();
        str = str.substring(1);
        return Number(str);
    }

} 