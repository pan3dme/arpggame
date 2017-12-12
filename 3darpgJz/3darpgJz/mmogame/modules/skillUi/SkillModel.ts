
module skillUi {
    //技能的三个类型
    export class SkillBaseType {
        public static ZHUDONG: number = 0;
        public static NUQI: number = 1;
        public static BEIDONG: number = 2;
    }



    export class SkillUiModel {

        private static _instance: SkillUiModel;
        public static getInstance(): SkillUiModel {
            if (!this._instance) {
                this._instance = new SkillUiModel();
            }
            return this._instance;
        }
        //初始技能数据
        public constructor() {

        }
        //从服务器得到最新的数据
        public getSeverSkillData(): void {
            this.makeZhuDonHasItem();
            this.makePassiveData();
        }
        //基础技能和怒气技能列表
        private makeZhuDonHasItem(): void
        {
            this.zhudongHasItem = new Array;
            var $item: Array<any> = GuidData.grow.getSpellInitFieldBaseSpeell()
            for (var i: number = 0; i < $item.length; i++) {
                var $SkillLevelVo: tb.SkillLevelVo = new tb.SkillLevelVo;
                $SkillLevelVo.id = $item[i].id;
                $SkillLevelVo.lev = $item[i].lev;
                this.zhudongHasItem.push($SkillLevelVo)
            }
        }
        //创建被动技能数据
        private makePassiveData(): void {
            this.passiveHasItem = new Array();
            var $item: Array<SkillUintVo> = GuidData.player.getPlayerIntFieldPassiveSpell()
            for (var i: number = 0; i < $item.length; i++) {
                var $SkillLevelVo: tb.SkillLevelVo = new tb.SkillLevelVo;
                $SkillLevelVo.id = $item[i].id;
                for (var j: number = 0; j < this.zhudongHasItem.length; j++) {
                    if (this.zhudongHasItem[j].id == $SkillLevelVo.id) {
                        $SkillLevelVo.lev = this.zhudongHasItem[j].lev;
                    }
                }
                this.passiveHasItem.push($SkillLevelVo);
            }
        }
        //比较数据
        public resetDataToSkillBaseDataVo($vo: tb.SkillDataVo): void {
            $vo.typtId = this.getSkillType($vo.id);
            $vo.activation = this.isActivation($vo.id);
            $vo.level = this.getSkillLevelById($vo.id);
            this.setChooseInfoToVo($vo);
            $vo.refresh();
        }
  
        public setChooseInfoToVo($vo: tb.SkillDataVo ): void
        {
            if (!$vo.activation) {  //没有激活
                if($vo.tb_skill_base.study_requirement && $vo.tb_skill_base.study_requirement!=null){
                    $vo.skillLearnVo = null;
                }else{
                    $vo.skillLearnVo = this.getLearnInof($vo.id);
                }
            } else {
                if ($vo.level < $vo.maxLev) {  //可以学习
                    $vo.skillLearnVo = tb.SkillDataVo.getLevelUpInof($vo.id, $vo.levelUpStat + $vo.level - 1);
                  //  $vo.showGreenUp = tb.SkillBaseDataVo.isCanUpLevel($vo.skillLearnVo);
                } else {
                    if ($vo.typtId == SkillBaseType.NUQI) {
                        $vo.skillLearnVo = this.getupGradeUPInof($vo.id);
                    } else {
                        $vo.skillLearnVo = null;
                        $vo.showGreenUp = false;
                    }
                }
            }
            if ($vo.skillLearnVo) {
                $vo.showGreenUp = tb.SkillDataVo.isCanUpLevel($vo);
            } else {
                $vo.showGreenUp = false;
            }

        }
        
      
        public getStrByTypeAndNum(id: number, $num: number): string
        {
            var $addStr: string = ""
            switch (id) {
                case 0:
                    $addStr = " 金币:";
     
            
                    break
                case 1:
                    break;
                case 2:
                    //元宝
                    $addStr = " 银俩:";
                    break;
                case 3:
                    break;
                case 4:
                    break;
                case 5:
                    break;
                case 6:
                    $addStr = " 真气:";
   
                    break;
                default:
                    break
            }

            var str:string=""
            if (SkillUiModel.haveMoneyType(id, $num)) {
                str = "[00ff00]" + $addStr + $num + "[]";
            } else {
                str = "[ff0000]" + $addStr + $num + "[]";
            }
            return str
        }
        public static haveMoneyType($id: number, b: number):boolean
        {
            var $totalNum: number = 0
            /*
            switch ($id) {
                case SharedDef.MONEY_TYPE_GOLD_INGOT:     //0
                   // $str += "元宝";
                    break
                case SharedDef.MONEY_TYPE_BIND_GOLD://1
                   // $str += "绑定元宝";
                    break
                case SharedDef.MONEY_TYPE_SILVER://2
                   // $str += "身上的银子";

                    $totalNum = GuidData.player.getSilver()
                    break
                case SharedDef.MONEY_TYPE_SILVER_WAREHOUSE://3
                   // $str += "仓库的银子";
                    break
                case SharedDef.MONEY_TYPE_GOLD_WAREHOUSE://4
                   // $str += "仓库元宝";
                    break
                case SharedDef.MONEY_TYPE_BIND_GOLD_WAREHOUSE://5
                  //  $str += "仓库的绑元";
                    break
                case SharedDef.MONEY_TYPE_QI://6
                   // $str += "真气";

                    $totalNum = GuidData.player.getQI()
                    break
                default:
                    break;
            }
           */
            return b <= $totalNum;
       
         }
       // 获取进阶条件
        private getupGradeUPInof($skillId: number): tb.SkillLearnVo
        {
            var $obj: any = TableData.getInstance().getData(TableData.tb_assistangerspell_upgrade, $skillId);
            if ($obj) {
                var $vo: tb.SkillLearnVo = new tb.SkillLearnVo();
                $vo.resource = $obj.cost;
                return $vo;
            } else {
                return null
            }
        
        }

        //获取学习条件
        private getLearnInof($skillId: number): tb.SkillLearnVo
        {
            var $obj: any = TableData.getInstance().getData(TableData.tb_learn_spell, $skillId);
            var $vo: tb.SkillLearnVo = new tb.SkillLearnVo()
            $vo.parse($obj);
            return $vo
        }
        //获得技能当前等级
        private getSkillLevelById($skillId: number): number
        {
            for (var i: number = 0; i < this.zhudongHasItem.length; i++)
            {
                if (this.zhudongHasItem[i].id == $skillId) {
                    return this.zhudongHasItem[i].lev
                }
            }
            return 1;
        }
        //是否为激活状态
        private isActivation($skillId:number): boolean
        {
            for (var i: number = 0; i < this.zhudongHasItem.length; i++) {
                if (this.zhudongHasItem[i].id == $skillId) {
                    return true
                }
            }
            for (var j: number = 0; j < this.passiveHasItem.length;j++) {
                if (this.passiveHasItem[j].id == $skillId) {
                    return true
                }
            }
            return false
        }
        private getSkillType($skillId:number): number
        {
            for (var i: number = 0; i < tb.SkillData.getInstance().zhudong_list.length; i++) {
                if (tb.SkillData.getInstance().zhudong_list[i] == $skillId) {
                    return SkillBaseType.ZHUDONG
                }
            }
            for (var j: number = 0; j < tb.SkillData.getInstance().anger_list.length; j++) {
                if (tb.SkillData.getInstance().anger_list[j] == $skillId) {

                    return SkillBaseType.NUQI
                }
            }
            for (var k: number = 0; k < tb.SkillData.getInstance().passive_list.length; k++) {
                if (tb.SkillData.getInstance().passive_list[k] == $skillId) {
                    return SkillBaseType.BEIDONG
                }
            }
           return null
        }
        public getSkillNameById($skillId: number): string {
            var $skillObj: any = TableData.getInstance().getData(TableData.tb_skill_base, $skillId);
            return $skillObj.name
        }
        public getAngerItem(): Array<number>
        {
            var anHasItem:Array<number>=new Array
            for (var i: number = 0; i < tb.SkillData.getInstance().anger_list.length; i++)
            {
                var $id: number = tb.SkillData.getInstance().anger_list[i];
                for (var j: number = 0; j < tb.SkillData.getInstance().anger_list.length; j++) {
                    for (var j: number = 0; j < this.zhudongHasItem.length; j++) {
                        if (this.zhudongHasItem[j].id == $id) {
                            anHasItem.push($id);
                        }
                    }
                }

            }
            return anHasItem;
        }
    
        public getMoneyType($id: number): string {
            var $str: string = "";
            /*
            switch ($id) {
                case SharedDef.MONEY_TYPE_GOLD_INGOT:     //0
                    $str += "元宝";
                    break
                case SharedDef.MONEY_TYPE_BIND_GOLD://1
                    $str += "绑定元宝";
                    break
                case SharedDef.MONEY_TYPE_SILVER://2
                    $str += "身上的银子";
                    break
                case SharedDef.MONEY_TYPE_SILVER_WAREHOUSE://3
                    $str += "仓库的银子";
                    break
                case SharedDef.MONEY_TYPE_GOLD_WAREHOUSE://4
                    $str += "仓库元宝";
                    break
                case SharedDef.MONEY_TYPE_BIND_GOLD_WAREHOUSE://5
                    $str += "仓库的绑元";
                    break
                case SharedDef.MONEY_TYPE_QI://6
                    $str += "真气";
                    break
                default:
                    break;
            }
            */
            return $str
        }
  
       // public skillShowVo: tb.SkillUIVo;  //面板可显示的数据;
        public zhudongHasItem: Array<tb.SkillLevelVo>;  //自己有的主动技能;
        public passiveHasItem: Array<tb.SkillLevelVo>;  //自己有的被动技能;
    }

}