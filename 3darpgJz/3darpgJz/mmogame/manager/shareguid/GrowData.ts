class GrowData extends GuidObject {

    public onBaseCreated(): void {

        this._after_update = ($flag: number, $intMask: Object, $strMask: Object) => { this.dataUpdate($intMask, $strMask) };

        this.AddListen(SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP, ($binlog: any) => { this.mountBlessChange() });
        this.AddListen(SharedDef.SPELL_STRENGTHEN_ALLMUL, ($binlog: any) => { this.strengMulChg() });
        this.AddListen(SharedDef.SPELL_GEM_ALLMUL, ($binlog: any) => { this.gemMulChg() });
        this.AddListen(SharedDef.SPELL_WINGS_ID, ($binlog: any) => { this.wingIDChg() });
        this.AddListen(SharedDef.SPELL_WINGS_BLESS_EXP, ($binlog: any) => { this.wingExpChg() });
        this.AddListen(SharedDef.SPELL_WINGS_LEVEL, ($binlog: any) => { this.wingLevChg() });

        //   this.AddListen(SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL, ($binlog: any) => { this.spellintFieldMeridianLevelChg() });
        //    this.AddListen(SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP, ($binlog: any) => { this.spellIntFieldMeridExpChg() });


        this.AddListen(SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL_BASE, ($binlog: any) => { this.spellIntFieldMountlevChg() });
        this.AddListen(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, ($binlog: any) => { this.masterLevChg() });
        this.AddListenString(SharedDef.SPELL_STRING_FIELD_EQUIPDEVELOP_WASHATTRS_INFO, ($binlog: any) => { this.washChg() })

        // for (var i: number = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT) {
        //     this.AddListen(i, ($binlog: any) => { this.huanhua($binlog._index) });
        // }
        ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT));
    }

    // private huanhua(i: number): void {
    //     console.log("-----------幻化ID,-----------", this.GetInt32(i))
    //     ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.CHANGE_BB_PANEL));

    // }

    /**
     * 已获取的幻化列表
     */
    private _aryhuanhuaid: Array<number>;
    public getHuanhuaID(): Array<number> {
        if (this._aryhuanhuaid) {
            return this._aryhuanhuaid;
        }

        this._aryhuanhuaid = this.refresharyhuanhuaid();
        return this._aryhuanhuaid;

    }

    private refresharyhuanhuaid(): Array<number> {
        var $arr: Array<number> = new Array()
        for (var i: number = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT) {
            if (this.GetInt32(i) == 0) {
                break;
            }
            $arr.push(this.GetInt32(i))
        }
        return $arr;
    }

    public getzuoqiJinengList(): Array<any> {
        var $arr: Array<any> = new Array()
        var num: number = (SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_END - SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START);
        for (var i: number = 0; i < num; i++) {
            var idx: number = SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START + i;
            var id: number = GuidData.grow.GetUInt16(idx, 0);
            var lev: number = GuidData.grow.GetUInt16(idx, 1);
            if (id != 0) {

                $arr.push({ id: id, lev: lev })
            }
        }
        console.log("-----------zhuoqi jineng----------", $arr);
        return $arr
    }
    public getHuanhuaJinengList(): Array<any> {
        var $arr: Array<any> = new Array()
        for (var i: number = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT)//FIXME
        {
            for (var j: number = SharedDef.ILLUSION_ATTR_SPELL_START; j < SharedDef.ILLUSION_ATTR_SPELL_END; j++) {
                var idx: number = i + j
                var id: number = GuidData.grow.GetUInt16(idx, 0);
                var lev: number = GuidData.grow.GetUInt16(idx, 1);
                if (id != 0) {
                    console.log("-----------huanhuajineng----------", id, lev)
                    $arr.push({ id: id, lev: lev })
                }

            }
        }
        return $arr
    }

    private mountBlessChange(): void {
        var idx: number = SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP;
        console.log("-----------祝福值-----------", this.GetInt32(idx))
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT));
    }


    private dataUpdate($intMask: Object, $strMask: Object): void {


        if ($intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP]) {
            ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.REFRISH_MERIDIAL_PANEL))

        }
        if ($intMask[SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL] || $intMask[SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP]) {
            console.log("---经验和等级变化--");
            ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEVET_STAR_CHANGE_EVENT));
        }
        //基础技能
        var $jichuChangeBoole: boolean = false
        for (var i: number = SharedDef.SPELL_INT_FIELD_BASE_SPELL_START; i < SharedDef.SPELL_INT_FIELD_BASE_SPELL_END; i++) {
            if ($intMask[i]) {
                $jichuChangeBoole = true;
                if (this._skillLevDic){
                    var id: number = GuidData.grow.GetUInt16(i, 0);
                    var lev: number = GuidData.grow.GetUInt16(i, 1);
                    this._skillLevDic[id] = lev;
                }

            }
        }
        if ($jichuChangeBoole) {
            ModuleEventManager.dispatchEvent(new skillUi.SkillUiEvent(skillUi.SkillUiEvent.RESET_SKILL_UI_DATA));
        }
        //坐骑技能
        for (var i: number = SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_SPELL_END; i++) {
            if ($intMask[i]) {
                this.zuoqiSkillChange(i);
                ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.SKILL_CHANGE_EVENT));
            }
        }
      
        //幻化技能列表
        for (var i: number = SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START; i < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END; i += SharedDef.MAX_ILLUSION_ATTR_COUNT)//FIXME
        {
            for (var j: number = SharedDef.ILLUSION_ATTR_SPELL_START; j < SharedDef.ILLUSION_ATTR_SPELL_END; j++) {
                if ($intMask[i + j]) {
                    this.huanhuaSkillChange(i + j);
                }
            }
        }
        //强化相关
        for (var i: number = SharedDef.SPELL_STRENGTHEN_START; i < SharedDef.SPELL_STRENGTHEN_END; i += SharedDef.MAX_STRENGTHEN_COUNT) {
            if ($intMask[i]) {
                //var part: number = i - SharedDef.SPELL_STRENGTHEN_START + 1;
                //console.log("强化变化:  部位：" + part + "等级：" + this.getStrengLev(part) + ", 祝福值：" + this.getStrengBless(part))
                this.strengDataChg(i - SharedDef.SPELL_STRENGTHEN_START);
            }
        }

        //宝石相关
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_GEM_START && keyNum < SharedDef.SPELL_GEM_END) {
                keyNum = (keyNum - SharedDef.SPELL_GEM_START);
                var keyPos: number = float2int(keyNum / SharedDef.MAX_GEM_COUNT);
                var keyVal: number = keyNum % SharedDef.MAX_GEM_COUNT;
                var part: number = keyPos + 1;
                if (keyVal < 3) {
                    //console.log("宝石部位：" + part + " 第" + keyVal + "个宝石升级" + this.getGemLev(part,keyVal));
                    this.gemLevChg(keyPos);
                } else {
                    //console.log("宝石部位：" +part + " 第" + this.getGemCurrentID(part) + "个宝石的祝福值" + this.getGemBless(part));
                    this.gemBlessChg(keyPos);
                }
            }
        }
        //外观相关
        var appearance_flag:boolean = false;
        for (var key in $intMask) {
            var keyNum: number = Number(key);            
            if (keyNum >= SharedDef.SPELL_INT_FIELD_APPEARANCE_START && keyNum < SharedDef.SPELL_INT_FIELD_APPEARANCE_END) {
                appearance_flag = true;
            }
        }
        if(appearance_flag){            
             ModuleEventManager.dispatchEvent(new exterior.ExteriorEvent(exterior.ExteriorEvent.REFRISH_EXTERIOR_PANEL));
        }
        //坐骑相关
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START && keyNum < SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_END) {
                var aa = (keyNum - SharedDef.SPELL_INT_FIELD_MOUNT_ILLUSION_START);
                var keyPos: number = float2int(aa / SharedDef.MAX_ILLUSION_ATTR_COUNT);
                var keyVal: number = aa % SharedDef.MAX_ILLUSION_ATTR_COUNT;
                if (keyVal == SharedDef.ILLUSION_ATTR_ID) {
                    var cur_huanhuaid = this.GetInt32(keyNum);
                    if (cur_huanhuaid > 0) {
                        var $flag: boolean = false;
                        for (var i = 0; i < this._aryhuanhuaid.length; i++) {
                            if (this._aryhuanhuaid[i] == cur_huanhuaid) {
                                $flag = true;
                                break;
                            }
                        }

                        //更新列表
                        this._aryhuanhuaid = this.refresharyhuanhuaid();

                        var $evtt = new mountui.MountUiEvent(mountui.MountUiEvent.POP_THE_UNREAL_PANEL);
                        $evtt.data = 3
                        ModuleEventManager.dispatchEvent($evtt);

                        if (!$flag) {
                            //新增
                            console.log("--2222");
                            // var $evtt = new mountui.MountUiEvent(mountui.MountUiEvent.POP_THE_UNREAL_PANEL);
                            // $evtt.data = 3
                            // ModuleEventManager.dispatchEvent($evtt);
                        } else {
                            //变化

                        }
                    }
                }
            }
        }

        /**
         * 神兵相关
         * 神兵id为0时，表示没有神兵。不为0时，表示存在神兵。
         */
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_DIVINE_START && keyNum < SharedDef.SPELL_DIVINE_END) {
                var keyTempNum = (keyNum - SharedDef.SPELL_DIVINE_START);
                var keyPos: number = float2int(keyTempNum / SharedDef.MAX_DIVINE_COUNT);
                var keyVal: number = keyTempNum % SharedDef.MAX_DIVINE_COUNT;

                if (keyVal == SharedDef.DIVINE_ID_LEV_BLESS) {
                    //console.log("神兵 id:" + this.getDivineID(keyNum) + " 等级：" + this.getDivineLev(keyNum) + " 祝福值：" + this.getDivineBless(keyNum))
                    var divineID: number = this.getDivineID(keyNum);
                    if (divineID > 0) {
                        var $flag: boolean = false;
                        for (var i = 0; i < this._divineList.length; i++) {
                            if (this._divineList[i].id == divineID) {
                                $flag = true;
                                break;
                            }
                        }

                        if (!$flag) {
                            //新增
                            // ModuleEventManager.dispatchEvent(new sb.ShenBingEvent(sb.ShenBingEvent.NEWADD_DIVINE_EVENT));
                        } else {
                            //变化
                        }
                    }
                }
                // if(keyVal >= SharedDef.DIVINE_SKILL){
                //     var obj:any = this.getDivineSkillDirect(keyNum);
                //     var idIndex:number = SharedDef.SPELL_DIVINE_START + keyPos * SharedDef.MAX_DIVINE_COUNT;
                //     console.log("神兵 id:" + this.getDivineID(idIndex)  +"神兵 技能" + obj.id + " 等级：" + obj.lev);

                // }else if(keyPos >= SharedDef.DIVINE_PASSIVE_SKILL){
                //     var obj:any = this.getDivineSkillDirect(keyNum);
                //     console.log("神兵 被动 技能" + obj.id + " 等级：" + obj.lev);
                //}

                //更新列表
                this._divineList = this.refreshDivineList();

                this.changeDivineData()

            }
        }

        /**
         * 法宝相关
         */
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_TALISMAN_START && keyNum < SharedDef.SPELL_TALISMAN_END) {

                var keyTempNum = (keyNum - SharedDef.SPELL_TALISMAN_START);
                var keyPos: number = float2int(keyTempNum / SharedDef.MAX_TALISMAN_COUNT);
                var keyVal: number = keyTempNum % SharedDef.MAX_TALISMAN_COUNT;

                if (keyVal == SharedDef.TALISMAN_ID_LV) {
                    var talismanid: number = this.GetByte(keyNum, 0);
                    if (talismanid > 0) {
                        console.log("talismanid---",talismanid);
                        var $flag: boolean = false;
                        for (var i = 0; i < this._treasureList.length; i++) {
                            if (this._treasureList[i].id == talismanid) {
                                $flag = true;
                                break;
                            }
                        }

                        //更新列表
                        this._treasureList = this.refreshTreasureList();
                        //发送事件修改ui
                        if (!$flag) {
                            //新增
                            ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.UNLOCK_WEAPON_EVENT));
                        } else {
                            //变化
                            ModuleEventManager.dispatchEvent(new treasure.TreasureUiEvent(treasure.TreasureUiEvent.CHANGE_WEAPON_EVENT));
                        }
                    }
                }
            }
        }


        /**
         * 新强化相关
         */
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START && keyNum < SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_END) {
                // 装备培养变化
                var keyTempNum = (keyNum - SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START);
                var keyPos: number = float2int(keyTempNum / SharedDef.MAX_EQUIPDEVELOP_COUNT);//第keyPos + 1个部件变化
                var keyVal: number = keyTempNum % SharedDef.MAX_EQUIPDEVELOP_COUNT;           //第几个属性变化
                var $type;
                if (keyVal == SharedDef.EQUIPDEVELOP_STRENGTH_LV) {
                    //强化等级变化
                    $type = strengthgem.StrengthGemEvent.STRENG_LEV_EVENT;
                } else if (keyVal == SharedDef.EQUIPDEVELOP_REFINE_LV) {
                    //0 int16 阶数 1 int16 星数
                    $type = strengthgem.StrengthGemEvent.REFINING_LEV_EVENT;
                } else {
                    //宝石变化
                    $type = strengthgem.StrengthGemEvent.GEM_LEV_EVENT;
                }
                var $evttt = new strengthgem.StrengthGemEvent($type);
                $evttt.data = keyPos + 1;
                ModuleEventManager.dispatchEvent($evttt);

            }
        }

        /**
         * 经脉相关
         */
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START && keyNum < SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_END) {
                ModuleEventManager.dispatchEvent(new meridian.MeridianEvent(meridian.MeridianEvent.REFRISH_MERIDIAL_LIST))
            }
        }

        /**
         * 活动数据相关
         */
         var activeFlag:boolean = false;
        for (var key in $intMask) {
            var keyNum: number = Number(key);
            if (keyNum >= SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START && keyNum < SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_END) {
                activeFlag = true;
            }
        }
        if(activeFlag){
            ModuleEventManager.dispatchEvent(new ActiveEvent(ActiveEvent.ACTIVE_PLAYER_CHANGE_EVENT));
        }

    }
    public changeDivineData(): void {
        // ModuleEventManager.dispatchEvent(new sb.ShenBingEvent(sb.ShenBingEvent.CHANGE_SHENBING_DATA_EVENT));
    }



    public strengDataChg($index: number): void {
        console.log("----强化数据变化了-----");
        var evt: strengthgem.StrengthGemEvent = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.STRENGTHGEM_DATA_CHG);
        evt.dataType = 1;
        evt.data = $index;
        ModuleEventManager.dispatchEvent(evt);
    }

    public strengMulChg(): void {
        console.log("----全身奖励变化了-----");
        var evt: strengthgem.StrengthGemEvent = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.STRENGTHGEM_MUL_CHG);
        ModuleEventManager.dispatchEvent(evt);
    }

    public gemLevChg($index: number): void {
        console.log("--gemLevChg--");
        var evt: strengthgem.StrengthGemEvent = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.GEM_UPLEV_CHG);
        evt.data = $index;
        ModuleEventManager.dispatchEvent(evt);
    }

    public gemBlessChg($index: number): void {
        console.log("--gemBlessChg--");
        var evt: strengthgem.StrengthGemEvent = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.GEM_BLESS_CHG);
        evt.data = $index;
        ModuleEventManager.dispatchEvent(evt);
    }

    public gemMulChg(): void {
        var evt: strengthgem.StrengthGemEvent = new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.GEM_MUL_CHG);
        ModuleEventManager.dispatchEvent(evt);
    }



    //基础技能开始
    public getSpellInitFieldBaseSpeell(): Array<any> {

        var $arr: Array<any> = new Array()
        var num: number = (SharedDef.SPELL_INT_FIELD_BASE_SPELL_END - SharedDef.SPELL_INT_FIELD_BASE_SPELL_START);
        for (var i: number = 0; i < num; i++) {

            var idx: number = SharedDef.SPELL_INT_FIELD_BASE_SPELL_START + i;
            var id: number = GuidData.grow.GetUInt16(idx, 0);
            var lev: number = GuidData.grow.GetUInt16(idx, 1);
            if (id != 0) {
                console.log("-----------基础技能----------", id, lev)
                $arr.push({ id: id, lev: lev })
            }

        }
        return $arr
    }

    private _skillLevDic: Object;

    public getSkillLev($id: number): number {
        if (!this._skillLevDic) {
            this._skillLevDic = new Object;
            var num: number = (SharedDef.SPELL_INT_FIELD_BASE_SPELL_END - SharedDef.SPELL_INT_FIELD_BASE_SPELL_START);
            for (var i: number = 0; i < num; i++) {
                var idx: number = SharedDef.SPELL_INT_FIELD_BASE_SPELL_START + i;
                var id: number = GuidData.grow.GetUInt16(idx, 0);
                var lev: number = GuidData.grow.GetUInt16(idx, 1);
                this._skillLevDic[id] = lev;
            }
        }
        if (this._skillLevDic[$id]) {
            return this._skillLevDic[$id];
        } else {
            return 0;
        }

    }



    //幻化技能更新
    private huanhuaSkillChange(i: number): void {
        console.log("-----------huanhuajinengenxing-----------", this.GetInt16(i, 0), this.GetInt16(i, 1))
    }
    //坐骑技能更新
    private zuoqiSkillChange(i: number): void {
        console.log("-----------zuoqijinenggengxin-----------", this.GetInt16(i, 0), this.GetInt16(i, 1))
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.CHANGE_jingjie_SKILL_PANEL));
    }
    public getMountLevel(): number {
        var idx: number = SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL;
        var $num: number = this.GetInt16(idx, 0)

        return $num;
    }
    public getMountStart(): number {
        var idx: number = SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL;
        var $num: number = this.GetInt16(idx, 1)
        return $num;
    }

    //坐骑等级变化
    private spellIntFieldMountlevChg() {
        console.log("--坐骑等级变化--");
        ModuleEventManager.dispatchEvent(new mountui.MountUiEvent(mountui.MountUiEvent.MOUNT_LEV_CHANGE_EVENT));
    }
    //获得坐骑等级（非阶级）
    public getMountlev(): number {
        return this.GetUInt32(SharedDef.SPELL_INT_FIELD_MOUNT_LEVEL_BASE);
    }

    public getSpellIntFieldMeridianLevel(value: number): number {
        //// 2shorts(0:经脉等级, 1:是否需要突破)
        return this.GetInt16(SharedDef.SPELL_INT_FIELD_MERIDIAN_LEVEL, value)
    }
    public getSpellIntFieldMeridianExp(): number {
        // 经脉经验
        return this.GetInt32(SharedDef.SPELL_INT_FIELD_MERIDIAN_EXP)
    }



    public getSpellIntFieldMeridianCnt(): Array<number> {

        var $arr: Array<any> = new Array()
        var $num: number = SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_END - SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START;
        for (var i: number = 0; i < $num; i++) {
            var idx: number = SharedDef.SPELL_INT_FIELD_MERIDIAN_CNT_START + i;
            $arr.push(this.GetByte(idx, 0))
            $arr.push(this.GetByte(idx, 1))
            $arr.push(this.GetByte(idx, 2))
            $arr.push(this.GetByte(idx, 3))
        }
        return $arr
    }
    

    public getSpellIntFieldAppearanceId(): Array<number> {
        var $arr: Array<any> = new Array()
        var $num: number = SharedDef.SPELL_INT_FIELD_APPEARANCE_END - SharedDef.SPELL_INT_FIELD_APPEARANCE_START;
        for (var i: number = 0; i < $num; i++) {
            var $id: number = this.GetUInt32(SharedDef.SPELL_INT_FIELD_APPEARANCE_START + i)
            if ($id) {
                $arr.push($id);
            }
        }
        return $arr
    }
    public isSpellIntFieldAppearanceById(value: number): boolean {
        var $arr: Array<number> = this.getSpellIntFieldAppearanceId()
        for (var i: number = 0; i < $arr.length; i++) {
            if ($arr[i] == value) {
                return true
            }
        }
        return false

    }



    public getMountExp(): number {
        var idx: number = SharedDef.SPELL_INT_FIELD_MOUNT_TRAIN_EXP;
        return this.GetInt32(idx);
    }
    public getMountBless(): number {
        var idx: number = SharedDef.SPELL_INT_FIELD_MOUNT_BLESS_EXP;
        return this.GetInt32(idx);
    }
    /**强化等级 */
    public getStrengLev(part: number): number {
        return this.GetUInt16(SharedDef.SPELL_STRENGTHEN_START + (part - 1) * SharedDef.MAX_STRENGTHEN_COUNT, 0)
    }
    /**强化数值 */
    public getStrengValue(part: number): any {
        var lev: number = this.getPartStrengLev(part);
        if (lev <= 0 || part == SharedDef.EQUIPMENT_TYPE_FASHION) {
            return 0;
        } else {
            var vo:tb.TB_equipdevelop_strength = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById(part, lev);            
            return vo.props[0][1];
        }
    }
    public getStrengValueByLev(part: number,lev: number): any {
        if (lev <= 0 || part == SharedDef.EQUIPMENT_TYPE_FASHION) {
            return 0;
        } else {
            var vo:tb.TB_equipdevelop_strength = tb.TB_equipdevelop_strength.get_TB_equipdevelop_strengthById(part, lev);            
            return vo.props[0][1];
        }
    }
    /**强化祝福值 */
    public getStrengBless(part: number): number {
        return this.GetUInt16(SharedDef.SPELL_STRENGTHEN_START + (part - 1) * SharedDef.MAX_STRENGTHEN_COUNT, 1)
    }
    /**全身强化标记 */
    public getStrengMul(): number {
        return this.GetUInt32(SharedDef.SPELL_STRENGTHEN_ALLMUL);
    }

    public getGemLev(part: number, index: number): number {
        return this.GetUInt32(SharedDef.SPELL_GEM_START + (part - 1) * SharedDef.MAX_GEM_COUNT + index);
    }

    public getGemByIndex(index: number): number {
        return this.GetUInt32(index);
    }

    public getGemBless(part: number): number {
        return this.GetUInt16(SharedDef.SPELL_GEM_START + (part - 1) * SharedDef.MAX_GEM_COUNT + SharedDef.GEM_CURID_BLESS, 1);
    }
    public getGemCurrentID(part: number): number {
        return this.GetUInt16(SharedDef.SPELL_GEM_START + (part - 1) * SharedDef.MAX_GEM_COUNT + SharedDef.GEM_CURID_BLESS, 0);
    }
    public getGemMul(): number {
        return this.GetUInt32(SharedDef.SPELL_GEM_ALLMUL);
    }

    /**神兵等级 */
    public getDivineLev($index: number): number {
        return this.GetByte($index, 1);
    }
    /**神兵祝福值 */
    public getDivineBless($index: number): number {
        return this.GetUInt16($index, 1);
    }
    /**神兵ID */
    public getDivineID($index: number): number {
        return this.GetByte($index, 0);
    }

    public getDivineSkillDirect($index: number): Object {
        var obj: any = new Object;
        obj.id = this.GetUInt16($index, 0)
        obj.lev = this.GetUInt16($index, 1)
        return obj;
    }


    public getDivineSkill($index: number): Object {
        var obj: any = new Object;
        obj.id = this.GetUInt16($index + SharedDef.DIVINE_SKILL, 0)
        obj.lev = this.GetUInt16($index + SharedDef.DIVINE_SKILL, 1)
        return obj;
    }

    public getDivinePassiveSkill($index: number): Array<Object> {
        var ary: Array<Object> = new Array;
        for (var i: number = 0; i < SharedDef.DIVINE_PASSIVE_SKILL_COUNT; i++) {
            var obj: any = new Object;
            obj.id = this.GetUInt16($index + SharedDef.DIVINE_PASSIVE_SKILL + i, 0);
            obj.lev = this.GetUInt16($index + SharedDef.DIVINE_PASSIVE_SKILL + i, 1);
            ary.push(obj);
        }
        return ary;
    }

    /**神兵列表 */
    private _divineList: Array<DivineVo>;
    public getDivineList(): Array<DivineVo> {
        if (this._divineList) {
            return this._divineList;
        }

        this._divineList = this.refreshDivineList();
        return this._divineList;
    }


    private refreshDivineList(): Array<DivineVo> {
        var ary: Array<DivineVo> = new Array;
        for (var i: number = SharedDef.SPELL_DIVINE_START; i < SharedDef.SPELL_DIVINE_END; i += SharedDef.MAX_DIVINE_COUNT) {
            var id: number = this.GetByte(i, 0);
            if (id != 0) {
                var vo: DivineVo = new DivineVo;
                vo.id = id;
                vo.index = i;
                vo.lev = this.GetByte(i, 1);
                vo.bless = this.GetUInt16(i, 1);
                vo.outTime = this.GetUInt32(i + 1);
                ary.push(vo);
            }
        }
        return ary;
    }



    /**
     * 法宝数据
     */
    private _treasureList: Array<TreasureVo>;
    public getTreasureList(): Array<TreasureVo> {
        if (this._treasureList) {
            return this._treasureList;
        }

        this._treasureList = this.refreshTreasureList();
        return this._treasureList;
    }


    private refreshTreasureList(): Array<TreasureVo> {
        var ary: Array<TreasureVo> = new Array;
        for (var i: number = SharedDef.SPELL_TALISMAN_START; i < SharedDef.SPELL_TALISMAN_END; i += SharedDef.MAX_TALISMAN_COUNT) {
            var id: number = this.GetByte(i, 0);
            if (id == 0) {
                i = SharedDef.SPELL_TALISMAN_END;
            } else {
                var vo: TreasureVo = new TreasureVo;
                vo.id = id;
                vo.lev = this.GetByte(i, 1);
                vo.power = this.GetUInt32(i + 1);
                ary.push(vo);
            }
        }
        return ary;
    }

    /***翅膀相关****************************************** */

    //翅膀是否被激活
    public getWingIsActive(): boolean {
        return this.GetUInt32(SharedDef.SPELL_WINGS_ID) != 0;
    }
    //翅膀ID
    public getWingID(): number {
        return this.GetUInt32(SharedDef.SPELL_WINGS_ID);
    }
    public getWingModel():number{
        if(this.getWingID() == 0){
            return 0;
        }
        var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, this.getWingID());
        var wingInfo: any = TableData.getInstance().getData(TableData.tb_wings_base, targetData.rank);
        return wingInfo.model;
    }
    //翅膀强化等级
    public getWingQh(): number {
        return this.GetUInt32(SharedDef.SPELL_WINGS_LEVEL);
    }
    //翅膀经验变化
    public getWingExp(): number {
        return this.GetUInt32(SharedDef.SPELL_WINGS_BLESS_EXP);
    }

    public wingIDChg(): void {
        ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.WING_ID_CHANG_EVENT));
    }

    public wingExpChg(): void {
        ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.WING_EXP_CHANG_EVENT));
    }

    public wingLevChg(): void {
        ModuleEventManager.dispatchEvent(new wing.WingEvent(wing.WingEvent.WING_LEV_CHANG_EVENT));
    }


    /***新强化相关****************************************** */
    /**部位强化等级 */
    public getPartStrengLev(part: number): number {
        return this.GetUInt16(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START + SharedDef.EQUIPDEVELOP_STRENGTH_LV + (part - 1) * SharedDef.MAX_EQUIPDEVELOP_COUNT, 0)
    }
    /**部位精炼阶数星数数组 */
    public getPartRefineVo(part: number): Array<number> {
        var idx = SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START + SharedDef.EQUIPDEVELOP_REFINE_LV + (part - 1) * SharedDef.MAX_EQUIPDEVELOP_COUNT;
        var ary: Array<number> = new Array
        ary.push(this.GetUInt16(idx, 0));// 0 int16 阶数 1 int16 星数
        ary.push(this.GetUInt16(idx, 1));
        return ary;
    }
    /**部位镶嵌宝石等级数组 */
    public getPartGemVo(part: number): Array<number> {
        var tab = tb.TB_equipdevelop_gem_part.get_TB_equipdevelop_gem_partById(part);
        var prefix = SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_START + (part - 1) * SharedDef.MAX_EQUIPDEVELOP_COUNT
        var ary: Array<number> = new Array
        for (var i = 0; i < tab.gem_array.length; i++) {
            ary.push(this.GetUInt16(prefix + SharedDef.EQUIPDEVELOP_GEM_LV_START + Math.floor(i / 2), i % 2));
        }
        return ary;
    }

    public getWashVo(): string {
        return this.GetStr(SharedDef.SPELL_STRING_FIELD_EQUIPDEVELOP_WASHATTRS_INFO);
    }

    private washChg() {
        //洗炼数据变化
        ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.WASH_CHG_EVENT));
    }

    //大师等级
    public getMasterLevVo(): Array<number> {
        var ary: Array<number> = new Array
        ary.push(this.GetUInt8(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, 0));
        ary.push(this.GetUInt8(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, 1));
        ary.push(this.GetUInt8(SharedDef.SPELL_INT_FIELD_EQUIPDEVELOP_BONUS_LV, 2));
        console.log("-----取用大师等级------");
        return ary;
    }
    // 大师等级变化
    private masterLevChg() {
        ModuleEventManager.dispatchEvent(new strengthgem.StrengthGemEvent(strengthgem.StrengthGemEvent.WASH_CHG_EVENT));
        console.log("-----监听到等级变化了------");
    }
    /**角色活动数据 */
    public getActivePlayerData($offset:number):Array<number>{
       return [this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START +  $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT),
        this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START +  $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT + 1),
        this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START +  $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT + 2),
        this.GetUInt32(SharedDef.SPELL_INT_FIELD_PLAYER_ACTIVITY_DATA_START +  $offset * SharedDef.MAX_PLAYERACTIVITTYDATAINT_COUNT + 3)]
    }

}

class DivineVo {
    public id: number;
    public index: number;
    public lev: number;
    public bless: number;
    public outTime: number;
}

class TreasureVo {
    public id: number;
    public lev: number;
    public power: number;
}

