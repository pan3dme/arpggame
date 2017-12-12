function traceNoTabelData(): void {
    console.log("数据表无")
    throw new Error("数据表无");
}
module tb {
    export class SkillLevelVo {
        public id: number
        public lev: number
        public constructor() {
        }
    }

    export class TB_item_template {

        public id: number;
        public name: string;
        public info: string;
        public output_info: string;
        public zhuangbility: string;
        public icon: string;
        public avatar: number;
        public level: number;
        public rank: number;
        public bind_type: number;
        public Auto: number;
        public type: number;
        public money_type: number
        public type_c: number;
        public type_name: string;
        public pos: number;
        public quality: number;
        public sex: number;
        public price: number;
        public is_transaction: number;
        public max_overlap: number;
        public is_slather: number;
        public output: Array<any>;
        public forge_pro: Array<any>;
        public use_result: number;
        public isdoubleclick: number;
        public double_click: Array<any>;
        public basic_properties: Array<any>;
        public suit_id: Array<any>;
        public using_effect: Array<any>;
        public category: number;
        public category_cooldown: number;
        public cooldown: number;
        public goods_id: number;
        public arrange: number;
        public expend_data: number;
        public use_object: number;
        public quest: number;
        public forge_pro_max: Array<any>;
        public is_auction: number;
        public auction_money: number;
        public out_bag: number
        public suitId:number;

        public handInReward: Array<number>;
        public exchangeCost: Array<number>;
        public destroyReward: number




        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.info = $obj.info;
            this.output_info = $obj.output_info;
            this.zhuangbility = $obj.zhuangbility;
            this.icon = $obj.icon;
            this.avatar = $obj.avatar;
            this.level = $obj.level;
            this.money_type = $obj.money_type;
            this.rank = $obj.rank;
            this.bind_type = $obj.bind_type;
            this.type = $obj.type;
            this.type_c = $obj.type_c;
            this.type_name = $obj.type_name;
            this.pos = $obj.pos;
            this.quality = $obj.quality;
            this.sex = $obj.sex;
            this.price = $obj.price;
            this.is_transaction = $obj.is_transaction;
            this.max_overlap = $obj.max_overlap;
            this.Auto = $obj.Auto;
            this.is_slather = $obj.is_slather;
            this.output = new Array;
            makeArray($obj.output, this.output);
            this.use_result = $obj.use_result;
            this.isdoubleclick = $obj.isdoubleclick;
            this.double_click = new Array;
            makeArray($obj.double_click, this.double_click);
            this.basic_properties = new Array;
            makeArray($obj.basic_properties, this.basic_properties);
            this.suit_id = new Array;
            makeArray($obj.suit_id, this.suit_id);
            this.using_effect = new Array;
            makeArray($obj.using_effect, this.using_effect);
            this.category = $obj.category;
            this.category_cooldown = $obj.category_cooldown;
            this.cooldown = $obj.cooldown;
            this.goods_id = $obj.goods_id;
            this.arrange = $obj.arrange;
            this.expend_data = $obj.expend_data;
            this.use_object = $obj.use_object;
            this.quest = $obj.quest;
            this.forge_pro_max = new Array;
            makeArray($obj.forge_pro_max, this.forge_pro_max);
            this.forge_pro = new Array;
            makeArray($obj.forge_pro, this.forge_pro);
            this.is_auction = $obj.is_auction;
            this.auction_money = $obj.auction_money;
            this.out_bag = $obj.out_bag;
            this.suitId = $obj.suitId;


            this.handInReward = new Array;
            makeArray($obj.handInReward, this.handInReward);
            this.exchangeCost = new Array;
            makeArray($obj.exchangeCost, this.exchangeCost);
            this.destroyReward = $obj.destroyReward;


            if (!this.avatar) {
                this.avatar = this.id;
            }
        }
        public static get_TB_item_template($id: number): TB_item_template {
            var $obj: any = TableData.getInstance().getData(TableData.tb_item_template, $id);
            return new TB_item_template($obj);
        }
        public static getAvatarById($id): number {
            if ($id == 0) {
                return 0;
            }
            return this.get_TB_item_template($id).avatar;
        }
        public getColorName(): string {

            var $str: string = "[" + tb.TB_item_quality_color.getTempVo(this.quality).color + "]";
            console.log("--------颜色---------",$str);
            return $str + this.name;
        }


    }

    export class SkillLearnVo {
        public playerLevel: number;//角色等级
        public item: Array<Array<number>>;//所需道具
        public resource: Array<Array<number>>;//所需要资源
        public questid: number; //任务ID
        public Pre_skill: number; //所需前置技能
        public cost: number
        public constructor() {
        }
        public parse($obj: any) {
            this.playerLevel = $obj.playerLevel;
            this.questid = $obj.questid;
            this.Pre_skill = $obj.Pre_skill;
            this.item = new Array;
            makeArray($obj.item, this.item);
            this.resource = new Array;
            makeArray($obj.resource, this.resource);

        }
    }


    export class TB_restore_potion_base {
        public id: number
        public cd: number
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.cd = $obj.cd
        }
        public static get_TB_restore_potion_base($id: number): TB_restore_potion_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_restore_potion_base, $id)
            var $vo: TB_restore_potion_base = new TB_restore_potion_base($obj)
            return $vo
        }




    }

    export class TB_item_output {
        public id: number
        public name: string
        public output: Array<number>
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name
            this.output = new Array;
            makeArray($obj.output, this.output);
        }
        public static get_TB_item_output($id: number): TB_item_output {
            var $obj: any = TableData.getInstance().getData(TableData.tb_item_output, $id)
            var $vo: TB_item_output = new TB_item_output($obj)
            console.log("----id---",$id,$vo);
            return $vo
        }
    }

    export class TB_skill_uplevel {
        public id: number
        public distance: number
        public mcd: number
        public num: number
        public hurt_percent: number
        public cannot_defence_hure: number
        public fight_value: number
        public uplevel_item: Array<any>
        public need_level: number
        public uplevel_cost: Array<any>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.distance = $obj.distance
            this.mcd = $obj.mcd
            this.num = $obj.num
            this.hurt_percent = $obj.hurt_percent
            this.cannot_defence_hure = $obj.cannot_defence_hure
            this.fight_value = $obj.fight_value
            this.uplevel_item = new Array
            makeArray($obj.uplevel_item, this.uplevel_item)
            this.need_level = $obj.need_level
            this.uplevel_cost = new Array
            makeArray($obj.uplevel_cost, this.uplevel_cost)

        }
        public static get_TB_skill_uplevel($id: number): TB_skill_uplevel {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_uplevel, $id)
            var $vo: TB_skill_uplevel = new TB_skill_uplevel($obj)
            return $vo
        }




    }
    export class TB_world_map {

        public id: number;
        public mapid: number;
        public x: number;
        public y: number;
        public info: string;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.mapid = $obj.mapid;
            this.x = $obj.x;
            this.y = $obj.y;
            this.info = $obj.info;

        }
        public static getItem(): Array<TB_world_map> {
            var $arr: Array<TB_world_map> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_world_map)
            for (var $key in $obj.data) {
                var $vo: TB_world_map = new TB_world_map($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_world_map {
            var $obj: any = TableData.getInstance().getData(TableData.tb_world_map, $id)
            var $vo: TB_world_map = new TB_world_map($obj)
            return $vo
        }
    }


    export class TB_char_info {
        public id: number;
        public avatar: number;
        public weapon: number;
        public waiguan: Array<number>;
        public weaponwg: Array<number>;
        public waiguantj: Array<number>;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.avatar = $obj.avatar;
            this.weapon = $obj.weapon;

            this.waiguan = new Array
            makeArray($obj.waiguan, this.waiguan);

            this.weaponwg = new Array
            makeArray($obj.weaponwg, this.weaponwg);

            this.waiguantj = new Array
            makeArray($obj.waiguantj, this.waiguantj);
        }

        public static getTempVo($id): TB_char_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_char_info, $id)
            var $vo: TB_char_info = new TB_char_info($obj)
            return $vo
        }
    }

    export class TB_appearance_info {
        public id: number;
        public name: string;
        public avatar: number;
        public icon: number;
        public level: number;

        public attrKeys: Array<number>
        public attrValues: Array<number>
        public costs: Array<Array<number>>


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.avatar = $obj.avatar;
            this.icon = $obj.icon;
            this.level = $obj.level;


            this.attrKeys = new Array
            makeArray($obj.attrKeys, this.attrKeys);

            this.attrValues = new Array
            makeArray($obj.attrValues, this.attrValues);

            this.costs = new Array
            makeArray($obj.costs, this.costs);
        }
        public static getItem(): Array<TB_appearance_info> {
            var $arr: Array<TB_appearance_info> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_appearance_info)
            for (var $key in $obj.data) {
                var $vo: TB_appearance_info = new TB_appearance_info($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_appearance_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_appearance_info, $id)
            var $vo: TB_appearance_info = new TB_appearance_info($obj)
            return $vo
        }
    }

    export class TB_appearance_pokedex {
        public id: number;
        public attrKeys: Array<number>;
        public attrValues: Array<number>;
        public exterior: Array<number>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id

            this.attrKeys = new Array
            makeArray($obj.attrKeys, this.attrKeys);
            this.attrValues = new Array
            makeArray($obj.attrValues, this.attrValues);
            this.exterior = new Array
            makeArray($obj.exterior, this.exterior);
        }
        public static getItem(): Array<TB_appearance_pokedex> {
            var $arr: Array<TB_appearance_pokedex> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_appearance_pokedex)
            for (var $key in $obj.data) {
                var $vo: TB_appearance_pokedex = new TB_appearance_pokedex($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_appearance_pokedex {
            var $obj: any = TableData.getInstance().getData(TableData.tb_appearance_pokedex, $id)
            var $vo: TB_appearance_pokedex = new TB_appearance_pokedex($obj)
            return $vo
        }
    }



    export class TB_meridian_item {

        public id: number;
        public itemId: number;
        public name: string;
        public exp: number;
        public goto: number;
        public goto_sub: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.itemId = $obj.itemId
            this.name = $obj.name
            this.exp = $obj.exp
            this.goto = $obj.goto
            this.goto_sub = new Array
            makeArray($obj.goto_sub, this.goto_sub);
        }
        public static getItem(): Array<TB_meridian_item> {
            var $arr: Array<TB_meridian_item> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_meridian_item)
            for (var $key in $obj.data) {
                var $vo: TB_meridian_item = new TB_meridian_item($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_meridian_item {
            var $obj: any = TableData.getInstance().getData(TableData.tb_meridian_item, $id)
            var $vo: TB_meridian_item = new TB_meridian_item($obj)
            return $vo
        }
    }
    export class TB_meridian_source {

        public id: number;
        public name: string;
        public exp: number;
        public limit: number;
        public goto: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name
            this.exp = $obj.exp
            this.limit = $obj.limit

            this.goto = new Array
            makeArray($obj.goto, this.goto)
        }
        public static getItem(): Array<TB_meridian_source> {
            var $arr: Array<TB_meridian_source> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_meridian_source)
            for (var $key in $obj.data) {
                var $vo: TB_meridian_source = new TB_meridian_source($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_meridian_source {
            var $obj: any = TableData.getInstance().getData(TableData.tb_meridian_source, $id)
            var $vo: TB_meridian_source = new TB_meridian_source($obj)
            return $vo
        }
    }



    export class TB_meridian_info {

        public id: number;
        //public currAttr: Array<number>;
        //public attrKeys: Array<number>;
        //public attrValues: Array<number>;

        public attrKeys0: Array<number>;
        public attrValues0: Array<number>;

        public attrKeys1: Array<number>;
        public attrValues1: Array<number>;

        public attrKeys2: Array<number>;
        public attrValues2: Array<number>;


        public costMoney: Array<Array<number>>;
        public pos: Array<number>;
        public costExp: number;

        public pic: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.costExp = $obj.costExp;

            this.pic = $obj.pic;


            this.costMoney = new Array;
            makeArray($obj.costMoney, this.costMoney);
            //this.currAttr = new Array;
            //makeArray($obj.currAttr, this.currAttr);

            this.attrKeys0 = new Array
            makeArray($obj.attrKeys0, this.attrKeys0);
            this.attrValues0 = new Array
            makeArray($obj.attrValues0, this.attrValues0);

            this.attrKeys1 = new Array
            makeArray($obj.attrKeys1, this.attrKeys1);
            this.attrValues1 = new Array
            makeArray($obj.attrValues1, this.attrValues1);

            this.attrKeys2 = new Array
            makeArray($obj.attrKeys2, this.attrKeys2);
            this.attrValues2 = new Array
            makeArray($obj.attrValues2, this.attrValues2);


            this.pos = new Array
            makeArray($obj.pos, this.pos);

        }
        public attrKeys: Array<number>;
        public attrValues: Array<number>;
        public refrishById($id: number): void {
            var $v: number = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.attrKeys = this.attrKeys0;
                this.attrValues = this.attrValues0;
            }
            if ($v == 1) {
                this.attrKeys = this.attrKeys1;
                this.attrValues = this.attrValues1;
            }
            if ($v == 2) {
                this.attrKeys = this.attrKeys2;
                this.attrValues = this.attrValues2;
            }



        }
        public static getItem(): Array<TB_meridian_info> {
            var $arr: Array<TB_meridian_info> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_meridian_info)
            for (var $key in $obj.data) {
                var $vo: TB_meridian_info = new TB_meridian_info($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_meridian_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_meridian_info, $id)
            var $vo: TB_meridian_info = new TB_meridian_info($obj)
            return $vo
        }
    }



    export class TB_group_instance_base {

        public id: number
        public mapid: number
        public name: string
        public info: string
        public need_Num: number
        public recom_force: number
        public map_pic: string
        public monster: Array<number>
        public passRewardId: Array<number>
        public passRewardCnt: Array<number>
        public fpRewardId: Array<number>
        public fpRewardCnt: Array<number>
        public times: number
        public limLev: number


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.mapid = $obj.mapid
            this.name = $obj.name
            this.info = $obj.info
            this.need_Num = $obj.need_Num
            this.recom_force = $obj.recom_force
            this.map_pic = $obj.map_pic
            this.monster = new Array
            makeArray($obj.monster, this.monster)
            this.passRewardId = new Array
            makeArray($obj.passRewardId, this.passRewardId)
            this.passRewardCnt = new Array
            makeArray($obj.passRewardCnt, this.passRewardCnt)
            this.fpRewardId = new Array
            makeArray($obj.fpRewardId, this.fpRewardId)
            this.fpRewardCnt = new Array
            makeArray($obj.fpRewardCnt, this.fpRewardCnt)
            this.times = $obj.times
            this.limLev = $obj.limLev

        }
        public static getItem(): Array<TB_group_instance_base> {
            var $arr: Array<TB_group_instance_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_group_instance_base)
            for (var $key in $obj.data) {
                var $vo: TB_group_instance_base = new TB_group_instance_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_group_instance_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_group_instance_base, $id)
            var $vo: TB_group_instance_base = new TB_group_instance_base($obj)
            return $vo
        }
    }


    export class TB_group_instance_buy {

        public id: number
        public daily_reset: number
        public buy_type: Array<number>
        public buy_price: Array<number>


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.daily_reset = $obj.daily_reset
            this.buy_type = new Array
            makeArray($obj.buy_type, this.buy_type)
            this.buy_price = new Array
            makeArray($obj.buy_price, this.buy_price)

        }
        public static getItem(): Array<TB_group_instance_buy> {
            var $arr: Array<TB_group_instance_buy> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_group_instance_buy)
            for (var $key in $obj.data) {
                var $vo: TB_group_instance_buy = new TB_group_instance_buy($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_group_instance_buy {
            var $obj: any = TableData.getInstance().getData(TableData.tb_group_instance_buy, $id)
            var $vo: TB_group_instance_buy = new TB_group_instance_buy($obj)
            return $vo
        }
    }




    export class TB_mass_boss_info {

        public id: number;
        public mapid: number;
        public bossEntry: number;
        public permitLevel: number;
        public show: Array<number>;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.mapid = $obj.mapid;
            this.bossEntry = $obj.bossEntry;
            this.permitLevel = $obj.permitLevel;

            this.show = new Array;
            makeArray($obj.show, this.show);

        }
        public static getItem(): Array<TB_mass_boss_info> {
            var $arr: Array<TB_mass_boss_info> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_mass_boss_info)
            for (var $key in $obj.data) {
                var $vo: TB_mass_boss_info = new TB_mass_boss_info($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_mass_boss_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_mass_boss_info, $id)
            var $vo: TB_mass_boss_info = new TB_mass_boss_info($obj)
            return $vo
        }
    }

    export class TB_mass_boss_base {

        public id: number;
        public cd: number;
        public dailytimes: number;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.cd = $obj.mapid;
            this.dailytimes = $obj.dailytimes;
        }

        public static getTempVo($id): TB_mass_boss_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_mass_boss_base, $id)
            var $vo: TB_mass_boss_base = new TB_mass_boss_base($obj)
            return $vo
        }
    }

    export class TB_mass_boss_times {
        public id: number;
        public cost: Array<any>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }
        public static getItem(): Array<TB_mass_boss_times> {
            var $arr: Array<TB_mass_boss_times> = new Array;
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_mass_boss_times);
            for (var $key in $obj.data) {
                var $vo: TB_mass_boss_times = new TB_mass_boss_times($obj.data[$key]);
                $arr.push($vo)
            }
            return $arr;
        }
        public static getTempVo($id): TB_mass_boss_times {
            var $obj: any = TableData.getInstance().getData(TableData.tb_mass_boss_times, $id);
            var $vo: TB_mass_boss_times = new TB_mass_boss_times($obj);
            return $vo;
        }
    }






    export class TB_anger_limit {
        public id: number;
        public limit: number;
        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.limit = value.limit;
        }
        public static get_TB_anger_limit($id): TB_anger_limit {
            var $obj: any = TableData.getInstance().getData(TableData.tb_anger_limit, $id)
            var $vo: TB_anger_limit = new TB_anger_limit($obj)
            return $vo
        }
    }
    export class TB_item_illusion {
        public id: number;
        public divine: number;
        public avatar: number;
        public skills: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.divine = $obj.divine;
            this.avatar = $obj.avatar;
            this.skills = new Array;
            makeArray($obj.skills, this.skills)
        }
        public static get_TB_item_illusion($id): TB_item_illusion {
            var $obj: any = TableData.getInstance().getData(TableData.tb_item_illusion, $id)
            var $vo: TB_item_illusion = new TB_item_illusion($obj)
            return $vo
        }
    }


    export class TB_system_guide {

        public id: number;
        public params: string;
        public isfinish: number;
        public area: Array<number>;
        public layout: any
        public type: number;
        public text: string;
        public isMainui: boolean
        public skinName: string

        public constructor($obj: any) {
            if (!$obj) {
               // traceNoTabelData();
                return
            }
            this.id = $obj.id
            this.params = $obj.params;
            this.skinName = this.params.split(",")[1];
            this.isMainui = Boolean(Number(this.params.split(",")[0]) == 1);
            this.isfinish = $obj.isfinish;
            this.type = $obj.type;

            this.text = $obj.text;
            this.area = new Array;
            makeArray($obj.area, this.area);

            var $arr: Array<string> = $obj.layout.split(",");
            this.layout = new Object;
            for (var i: number = 0; i < $arr.length; i++) {
                var dddddd: Array<string> = $arr[i].split(":");
                var $key: string = <string>trim(dddddd[0]);
                this.layout[$key] = Number(dddddd[1])
            }


        }
        public static get_TB_system_guide($id): TB_system_guide {
            var $obj: any = TableData.getInstance().getData(TableData.tb_system_guide, $id);
            if ($obj) {
                var $vo: TB_system_guide = new TB_system_guide($obj);
                return $vo
            } else {
                return null;
            }
        }
    }



    export class TB_quest_daily2_base {

        public id: number;
        public dailyLimit: number;
        public questshow: string


        // id,limit
        // int,int
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.dailyLimit = $obj.dailyLimit;
            this.questshow = $obj.questshow;
        }
        public static getTempVo($id): TB_quest_daily2_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_daily2_base, $id)
            var $vo: TB_quest_daily2_base = new TB_quest_daily2_base($obj)
            return $vo
        }
    }
    export class TB_map_field_boss {

        public id: number;
        public indx: number;
        public entry: number;
        public show: Array<number>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.indx = $obj.indx;
            this.entry = $obj.entry;
            this.show = new Array;
            makeArray($obj.show, this.show);
        }
        public static getItem(): Array<TB_map_field_boss> {
            var $arr: Array<TB_map_field_boss> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_map_field_boss)
            for (var $key in $obj.data) {
                var $vo: TB_map_field_boss = new TB_map_field_boss($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_map_field_boss {
            var $obj: any = TableData.getInstance().getData(TableData.tb_map_field_boss, $id)
            var $vo: TB_map_field_boss = new TB_map_field_boss($obj)
            return $vo
        }
    }

    export class TB_item_slot {

        public id: number;
        public slot: string;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.slot = $obj.slot;
        }
        public static getItem(): Array<TB_item_slot> {
            var $arr: Array<TB_item_slot> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_item_slot)
            for (var $key in $obj.data) {
                var $vo: TB_item_slot = new TB_item_slot($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id): TB_item_slot {
            var $obj: any = TableData.getInstance().getData(TableData.tb_item_slot, $id)
            if ($obj) {
                var $vo: TB_item_slot = new TB_item_slot($obj)
                return $vo
            } else {
                return null;
            }
        }
    }


    export class TB_quest_daily2_set {

        public id: number;
        public questSet: Array<number>;
        public rewards: Array<Array<number>>;//暂不使用
        public quality: number;


        // id,limit
        // int,int
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.questSet = new Array;
            makeArray($obj.questSet, this.questSet);
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
            this.quality = $obj.quality;
        }
        public static getTempVo($id): TB_quest_daily2_set {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_daily2_set, $id)
            var $vo: TB_quest_daily2_set = new TB_quest_daily2_set($obj)
            return $vo
        }
    }

    export class TB_quest_daily2_finish_reward {

        public id: number;
        public rewards: Array<Array<number>>;
        // id,limit
        // int,int
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
        }
        public static getTempVo($id): TB_quest_daily2_finish_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_daily2_finish_reward, $id)
            var $vo: TB_quest_daily2_finish_reward = new TB_quest_daily2_finish_reward($obj)
            return $vo
        }
    }

    export class TB_quest_daily2 {

        public id: number;
        public levelrange: Array<number>;
        public questSet: Array<number>;
        public questSelectNum: Array<number>;
        public finishQuestsNum: Array<number>;
        public rewardsSelect: Array<number>;
        public allFinishrewards: Array<Array<number>>;


        // id,limit
        // int,int
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.levelrange = new Array;
            makeArray($obj.levelrange, this.levelrange);
            this.questSet = new Array;
            makeArray($obj.questSet, this.questSet);
            this.questSelectNum = new Array;
            makeArray($obj.questSelectNum, this.questSelectNum);
            this.finishQuestsNum = new Array;
            makeArray($obj.finishQuestsNum, this.finishQuestsNum);
            this.rewardsSelect = new Array;
            makeArray($obj.rewardsSelect, this.rewardsSelect);
            this.allFinishrewards = new Array;
            makeArray($obj.allFinishrewards, this.allFinishrewards);
        }
        public static getTempVo($id): TB_quest_daily2 {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_daily2, $id)
            var $vo: TB_quest_daily2 = new TB_quest_daily2($obj)
            return $vo
        }
    }
    export class TB_item_quality_color {
        public id: number;
        public color: string
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.color = $obj.color;
        }
        public static getTempVo($id): TB_item_quality_color {
            var $obj: any = TableData.getInstance().getData(TableData.tb_item_quality_color, $id)
            var $vo: TB_item_quality_color = new TB_item_quality_color($obj)
            return $vo
        }
    }


    export class TB_quest_daily_base {

        public id: number;
        public dailyLimit: number;
        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.dailyLimit = value.dailyLimit;
        }
        public static getTempByID($id): TB_quest_daily_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_daily_base, $id)
            var $vo: TB_quest_daily_base = new TB_quest_daily_base($obj)
            return $vo
        }

    }



    export class TB_kuafu3v3_month_reward {

        public id: number;
        public name: string;
        public score: number;
        public reward: Array<Array<number>>
        public title: number
        public type: number
        public rewardtype: Array<number>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name;
            this.score = $obj.score;
            this.title = $obj.title;
            this.type = $obj.type;
            this.reward = new Array();
            makeArray($obj.reward, this.reward);

            this.rewardtype = new Array;
            makeArray($obj.rewardtype, this.rewardtype);
        }
        public static getItem(): Array<TB_kuafu3v3_month_reward> {
            var $arr: Array<TB_kuafu3v3_month_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_month_reward)
            for (var $key in $obj.data) {
                var $vo: TB_kuafu3v3_month_reward = new TB_kuafu3v3_month_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempByID($id): TB_kuafu3v3_month_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_kuafu3v3_month_reward, $id)
            var $vo: TB_kuafu3v3_month_reward = new TB_kuafu3v3_month_reward($obj)
            return $vo

        }

    }

    export class TB_map_jump_point_detail {
        public id: number;
        public show: Array<Array<number>>
        public last: number
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.last = $obj.last
            this.show = new Array();
            makeArray($obj.show, this.show);
        }

        public static getTempByID($id): TB_map_jump_point_detail {
            var $obj: any = TableData.getInstance().getData(TableData.tb_map_jump_point_detail, $id)
            var $vo: TB_map_jump_point_detail = new TB_map_jump_point_detail($obj)
            return $vo

        }

    }






    export class TB_kuafu3v3_week_reward {

        public id: number;
        public rank: Array<number>
        public reward: Array<Array<number>>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.reward = new Array();
            makeArray($obj.reward, this.reward);
            this.rank = new Array();
            makeArray($obj.rank, this.rank);

        }
        public static getItem(): Array<TB_kuafu3v3_week_reward> {
            var $arr: Array<TB_kuafu3v3_week_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_week_reward)
            for (var $key in $obj.data) {
                var $vo: TB_kuafu3v3_week_reward = new TB_kuafu3v3_week_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempByID($id): TB_kuafu3v3_week_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_kuafu3v3_week_reward, $id)
            var $vo: TB_kuafu3v3_week_reward = new TB_kuafu3v3_week_reward($obj)
            return $vo

        }

    }

    export class TB_kuafu3v3_base {


        public daytimes: number;
        public daybuytimes: number
        public daybuycost: Array<number>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.daytimes = $obj.daytimes;
            this.daybuytimes = $obj.daybuytimes;

            this.daybuycost = new Array();
            makeArray($obj.daybuycost, this.daybuycost);

        }
        public static getItem(): Array<TB_kuafu3v3_base> {
            var $arr: Array<TB_kuafu3v3_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_base)
            for (var $key in $obj.data) {
                var $vo: TB_kuafu3v3_base = new TB_kuafu3v3_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }


    }

    export class TB_kuafu3v3_day_reward {

        public id: number;
        public num: number
        public reward: Array<number>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.num = $obj.num;
            this.reward = new Array();
            makeArray($obj.reward, this.reward);
        }
        public static getItem(): Array<TB_kuafu3v3_day_reward> {
            var $arr: Array<TB_kuafu3v3_day_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_kuafu3v3_day_reward)
            for (var $key in $obj.data) {
                var $vo: TB_kuafu3v3_day_reward = new TB_kuafu3v3_day_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

        public static getTempByID($id): TB_kuafu3v3_day_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_kuafu3v3_day_reward, $id)
            var $vo: TB_kuafu3v3_day_reward = new TB_kuafu3v3_day_reward($obj)
            return $vo

        }

    }




    export class Tb_rank_reward {

        public id: number;
        public type: number;
        public rank: number;
        public level: string;
        public reward: string;
        public title: number;

        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.type = value.type;
            this.rank = value.rank;
            this.reward = value.reward;
            this.title = value.title;
        }
        public static getTempByID($type: number, $rankid: number): Tb_rank_reward {
            var $id = $type * 10 + $rankid;
            var $obj: any = TableData.getInstance().getData(TableData.tb_rank_reward, $id)
            var $vo: Tb_rank_reward = new Tb_rank_reward($obj)
            return $vo


        }

    }


    export class TB_faction_creat {

        public id: number;
        public cost: Array<any>;
        public maxnum: number;

        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.cost = new Array;
            makeArray(value.cost, this.cost);
            this.maxnum = value.maxnum
        }

        public static getItemById($id: number): TB_faction_creat {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_creat, $id);
            var $vo: TB_faction_creat = new TB_faction_creat($obj);
            return $vo;
        }

    }

    export class Tb_faction_icon {

        public id: number;
        public icon: number;
        private isactivity: boolean;
        public isvisiable: boolean;

        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.icon = value.icon;
        }
        public static getTempByID(): Array<Tb_faction_icon> {
            var $arr: Array<Tb_faction_icon> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_icon)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_faction_icon = new Tb_faction_icon($obj.data[$key])
                $vo.isactivityflag = false;
                $vo.isvisiable = false;
                $arr.push($vo)
            }
            return $arr
        }

        public set isactivityflag(value: boolean) {
            this.isactivity = value;
        }
        public get isactivityflag(): boolean {
            return this.isactivity;
        }
    }

    export class Tb_faction_base {

        public id: number;
        /** 升级消耗 */
        public cost: number;
        /** 最大成员数量 */
        public maxnum: number;
        /** 金币捐献次数 */
        public golddonation: number;
        /** 元宝捐献次数 */
        public ybdonation: number;
        /** 商店商品数量 */
        public shop: number;
        /** boss令牌每日购买次数上限 */
        public token_max_buy: number;
        /** boss令牌价格 */
        public token_buy_price: Array<Array<number>>;
        /** boss令牌每日获得上限 */
        public token_daily: number;
        /** boss令牌持有上限 */
        public token_max_keep: number;
        /** boss令牌积分需求 */
        public token_points: number;
        /** 必须回复的礼物魅力值下限 */
        public gift_points_must_reply: number;
        /** 礼物界面显示条数 */
        public gift_view_rows: number;

        public constructor(value: any) {
            if (!value) {
                traceNoTabelData()
            }
            this.id = value.id
            this.cost = value.cost;
            this.maxnum = value.maxnum;
            this.golddonation = value.golddonation;
            this.ybdonation = value.ybdonation;
            this.shop = value.shop;
            this.token_max_buy = value.token_max_buy;
            this.token_buy_price = new Array;
            makeArray(value.token_buy_price, this.token_buy_price);
            this.token_daily = value.token_daily;
            this.token_max_keep = value.token_max_keep;
            this.token_points = value.token_points;
            this.gift_points_must_reply = value.gift_points_must_reply;
            this.gift_view_rows = value.gift_view_rows;
        }
        public static get_Tb_faction_base(): Array<Tb_faction_base> {
            var $arr: Array<Tb_faction_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_base)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_faction_base = new Tb_faction_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

        public static get_Tb_faction_baseById($id): Tb_faction_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_base, $id);
            var $vo: Tb_faction_base = new Tb_faction_base($obj);
            return $vo;
        }
    }

    export class Tb_faction_zhiwei {

        public id: number;
        /** 人数 */
        public num: number;
        /** 奖励 */
        public reward: number;
        /** 描述 */
        public info: string;
        /** 名称 */
        public title: string;

        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.num = value.num;
            this.reward = value.reward;
            this.info = value.info;
            this.title = value.title;
        }
        public static get_Tb_faction_zhiwei(): Array<Tb_faction_zhiwei> {
            var $arr: Array<Tb_faction_zhiwei> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_zhiwei)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_faction_zhiwei = new Tb_faction_zhiwei($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

        public static get_Tb_faction_zhiweiById($id): Tb_faction_zhiwei {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_zhiwei, $id);
            var $vo: Tb_faction_zhiwei = new Tb_faction_zhiwei($obj);
            return $vo;
        }
    }


    export class Tb_faction_donation {

        public id: number;
        /** 捐献消耗资源 */
        public cost: Array<any>;
        /** 帮贡 */
        public devote: number;
        /** 帮派资金 */
        public money: number;


        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.devote = value.devote;
            this.money = value.money;
            this.cost = new Array;
            makeArray(value.cost, this.cost);


        }
        public static get_Tb_faction_donation(): Array<Tb_faction_donation> {
            var $arr: Array<Tb_faction_donation> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_donation)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_faction_donation = new Tb_faction_donation($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

        public static get_Tb_faction_donationById($id): Tb_faction_donation {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_donation, $id);
            var $vo: Tb_faction_donation = new Tb_faction_donation($obj);
            return $vo;
        }
    }


    export class Tb_faction_shop {

        public id: number;
        /** 道具id */
        public itemId: number;
        /** 购买一组道具获得数量 */
        public itemNum: number;
        /** 数量 */
        public num: number;
        /** 等级 */
        public lev: number;
        /** 消耗资源 */
        public costResource: Array<any>;
        /** 折扣标识 */
        public discount_flag: number;


        public constructor(value: any) {
            if (!value) {
                traceNoTabelData();
            }
            this.id = value.id
            this.itemId = value.itemId;
            this.itemNum = value.itemNum;
            this.num = value.num;
            this.lev = value.lev;
            this.costResource = new Array;
            makeArray(value.costResource, this.costResource);
            this.discount_flag = value.discount_flag;

        }
        public static get_Tb_faction_shop(): Array<Tb_faction_shop> {
            var $arr: Array<Tb_faction_shop> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_shop)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_faction_shop = new Tb_faction_shop($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

        public static get_Tb_faction_shopById($id): Tb_faction_shop {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_shop, $id);
            var $vo: Tb_faction_shop = new Tb_faction_shop($obj);
            return $vo;
        }
    }
    export class TB_skill_base {
        public id: number
        public name: string
        public desc: string
        public info: string
        public icon: string
        public is_initiative: number
        public skill_type: number
        public type: number
        public target_type: number
        public pre: number
        public is_end: number
        public follow: Array<any>
        public time_change: Array<any>
        public singleCD: number
        public groupCD: number
        public self_cd: number
        public group: number
        public uplevel_id: Array<any>
        public magic_type: number
        public nuqi_change: number
        public attack_mast: Array<any>
        public is_fix: number
        public effect_file: string
        public effect: string
        public isOrbit: number
        public condition_skill: number

        public study_requirement: string
        public is_remain: number
        public alarmEffect: number;
        public can_move: number
        public is_play_forbid: number
        public lock_type: number
        public timeout: number;
        public specialtype: number;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name
            this.desc = $obj.desc
            this.info = $obj.info
            this.icon = $obj.icon
            this.is_initiative = $obj.is_initiative
            this.skill_type = $obj.skill_type
            this.type = $obj.type
            this.target_type = $obj.target_type
            this.pre = $obj.pre
            this.is_end = $obj.is_end
            this.follow = new Array
            makeArray($obj.follow, this.follow)
            this.time_change = new Array
            makeArray($obj.time_change, this.time_change)
            this.singleCD = $obj.singleCD
            this.groupCD = $obj.groupCD
            this.self_cd = $obj.self_cd
            this.group = $obj.group
            this.uplevel_id = new Array
            makeArray($obj.uplevel_id, this.uplevel_id)
            this.magic_type = $obj.magic_type
            this.nuqi_change = $obj.nuqi_change
            this.attack_mast = new Array
            makeArray($obj.attack_mast, this.attack_mast)
            this.is_fix = $obj.is_fix
            this.effect_file = $obj.effect_file
            this.effect = $obj.effect
            this.isOrbit = $obj.isOrbit
            this.condition_skill = $obj.condition_skill

            this.study_requirement = $obj.study_requirement

            this.alarmEffect = $obj.alarmEffect;
            this.can_move = $obj.can_move;
            this.is_remain = $obj.is_remain;
            this.is_play_forbid = $obj.is_play_forbid;
            this.lock_type = $obj.lock_type;
            this.timeout = $obj.timeout;
            this.specialtype = $obj.specialtype;


        }
        public static get_TB_skill_base($id: number): TB_skill_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_base, $id)
            var $vo: TB_skill_base = new TB_skill_base($obj)
            return $vo
        }
    }




    //坐骑基本属性
    export class TB_mount_base_vo {
        public id: number;   //坐骑阶数;
        public name: string;  //坐骑名称;
        public mountID: number;  //坐骑模型;
        public skills: Array<number>;   //解锁技能;
        public addTrainExp: number;   //培养增加经验;
        public speed: number;   //坐骑速度;
        // public activation: boolean;//是否激活
        // public current: boolean;  //是否为当前阶
        // public needExp: number;//一星到下一星培养需要总经验
        // public prosItem: Array<any>  //存放当前属性数据;
        // public nextprosItem: Array<any>  //存放下一属性数据;
        // public combatNum: number  //战斗力;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.mountID = $obj.mountID;
            this.addTrainExp = $obj.addTrainExp;
            this.speed = $obj.speed;
            this.skills = new Array;
            makeArray($obj.skills, this.skills);
        }

        public static get_TB_mount_base_vo($id: number): TB_mount_base_vo {
            var $obj: any = TableData.getInstance().getData(TableData.tb_mount_base, $id)
            var $vo: TB_mount_base_vo = new TB_mount_base_vo($obj)
            return $vo
        }
        public static getItem(): Array<TB_mount_base_vo> {
            var $arr: Array<TB_mount_base_vo> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_mount_base)
            for (var $key in $obj.data) {
                var $vo: TB_mount_base_vo = new TB_mount_base_vo($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

    }


    export class TB_quest_chapter {
        public id: number;

        public items: Array<Array<number>>
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.items = new Array;
            makeArray($obj.items, this.items);
        }
        public static get_TB_quest_chapter($id: number): TB_quest_chapter {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_chapter, $id)
            var $vo: TB_quest_chapter = new TB_quest_chapter($obj)
            return $vo
        }

    }

    export class TB_risk_chapter {
        public id: number;
        public name: string;
        public icon: number;
        public iconpos: Array<number>
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.icon = $obj.icon;
            this.iconpos = new Array;
            makeArray($obj.iconpos, this.iconpos);
        }
        public static getItem(): Array<TB_risk_chapter> {
            var $arr: Array<TB_risk_chapter> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_risk_chapter)
            for (var $key in $obj.data) {
                var $vo: TB_risk_chapter = new TB_risk_chapter($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_risk_chapter($id: number): TB_risk_chapter {
            var $obj: any = TableData.getInstance().getData(TableData.tb_risk_chapter, $id)
            var $vo: TB_risk_chapter = new TB_risk_chapter($obj)
            return $vo
        }

    }

    export class TB_risk_menu {
        public id: number;
        public count: number;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.count = $obj.count;
        }
        public static get_TB_risk_menu($id: number): TB_risk_menu {
            var $obj: any = TableData.getInstance().getData(TableData.tb_risk_menu, $id)
            var $vo: TB_risk_menu = new TB_risk_menu($obj)
            return $vo
        }

    }
    export class TB_risk_data {
        public id: number
        public mapid: number
        public name: string
        public level: number
        public advisepoint: number
        public showitems: Array<any>
        public nextId: number
        public goldReward: Array<any>
        public expReward: Array<any>
        public suitScore: number
        public suitScoreChange: number
        public bossId: number
        public parentid: number

        public chapterId: number;
        public cardId: number
        public bossmap: number;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.name = $obj.name;
            this.nextId = $obj.nextId;
            this.advisepoint = $obj.advisepoint;
            this.parentid = $obj.parentid;


            this.bossId = $obj.bossId;
            this.suitScore = $obj.suitScore;
            this.suitScoreChange = $obj.suitScoreChange;
            this.level = $obj.level;


            this.goldReward = new Array;
            makeArray($obj.goldReward, this.goldReward);
            this.expReward = new Array;
            makeArray($obj.expReward, this.expReward);

            this.showitems = new Array;
            makeArray($obj.showitems, this.showitems);


            this.chapterId = Math.floor((this.id % 1000000) / 1000)
            this.cardId = Math.floor(this.id % 1000)
            this.bossmap = Math.floor(this.id / 1000000)


        }
        public static get_TB_risk_data($id: number): TB_risk_data {
            var $obj: any = TableData.getInstance().getData(TableData.tb_risk_data, $id)
            var $vo: TB_risk_data = new TB_risk_data($obj)
            return $vo
        }

    }

    export class TB_risk_base {
        public id: number;
        public firstSection: number

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.firstSection = $obj.firstSection;
        }
        public static get_TB_risk_base($id: number): TB_risk_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_risk_base, $id)
            var $vo: TB_risk_base = new TB_risk_base($obj)
            return $vo
        }

    }




    /**
     * 挂机品质选择表数据
     */
    export class TB_hook_quality_Vo {
        public id: number;
        public quality: number;    //品质
        public text: string;  //说明;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.quality = $obj.quality;
            this.text = $obj.text;
        }
    }



    /**
     * 挂机血瓶种类表数据
     */
    export class TB_hook_hp_item_Vo {
        public id: number;
        public items: Array<number>;    //道具id
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.items = new Array;
            makeArray($obj.items, this.items);
        }
        public static get_TB_hook_hp_item_Vo($id): TB_hook_hp_item_Vo {
            var $upgradeobj: any = TableData.getInstance().getData(TableData.tb_hook_hp_item, $id);
            var $vo: TB_hook_hp_item_Vo = new TB_hook_hp_item_Vo($upgradeobj)
            return $vo
        }

    }

    /*
    *坐骑升星表
    */
    export class TB_mount_train_vo {
        public id: number;
        public level: number;
        public star: number;
        public exp: number;
        public prosKeys: Array<number>;
        public prosValues: Array<number>;
        public traincost: Array<any>;  //培养消耗;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.level = $obj.level;
            this.star = $obj.star;
            this.exp = $obj.exp;
            this.prosKeys = new Array;
            makeArray($obj.prosKeys, this.prosKeys);
            this.prosValues = new Array;
            makeArray($obj.prosValues, this.prosValues);
            this.traincost = new Array;
            makeArray($obj.traincost, this.traincost);

        }
        public static getTB_mount_train_vo($level: number, $star: number): TB_mount_train_vo {
            var $id: number = ($level - 1) * 11 + $star + 1;
            var $obj: any = TableData.getInstance().getData(TableData.tb_mount_train, $id);
            var $vo: TB_mount_train_vo = new TB_mount_train_vo($obj)
            return $vo
        }

        public static getTabelItem(): Array<TB_mount_train_vo> {
            var $arr: Array<TB_mount_train_vo> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_mount_train)
            for (var $key in $obj.data) {
                var $vo: TB_mount_train_vo = new TB_mount_train_vo($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }
    /*
    *坐骑进阶表数据
    */
    export class TB_mount_upgrade {
        public id: number;
        public upgradeExp: number;
        public upgradeMode: number;
        public upgradecost: Array<any>;

        public constructor($obj: any) {

            this.id = $obj.id;
            this.upgradeExp = $obj.upgradeExp;
            this.upgradeMode = $obj.upgradeMode;

            this.upgradecost = new Array;
            makeArray($obj.upgradecost, this.upgradecost);

        }
        public static get_TB_mount_upgrade($id): TB_mount_upgrade {
            var $upgradeobj: any = TableData.getInstance().getData(TableData.tb_mount_upgrade, $id);
            var $vo: TB_mount_upgrade = new TB_mount_upgrade($upgradeobj)
            return $vo
        }
    }


    //坐骑幻化数据
    export class TB_mount_illusion_vo {

        public id: number;  //序号
        public name: string;  //幻化坐骑名
        public mountID: number;  //坐骑模型
        public condition: number;  //激活条件激活条件(1:消耗对应坐骑碎片,2:消耗一定数量元宝,3:特殊PVP活动奖励)
        public mountLevel: number;  //需要坐骑等阶
        public force: number;  //皮肤战力

        public costResource: Array<any>;  //激活消耗资源
        public costItem: Array<any>;  //激活消耗道具
        public spells: Array<any>;  //技能ID

        public last: number;  //激活时限(0:表示永久, N:表示天数)
        public battlepoint: number;  //战斗力
        public activation: boolean;//是否激活
        public current: boolean;  //是否为当前幻化
        public spellVolist: Array<SpellVo> = new Array;  //坐骑幻化技能列表
        public prosKeys: Array<number> = new Array;  //坐骑属性key
        public prosValues: Array<number> = new Array;  //坐骑属性值

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.mountID = $obj.mountID;
            this.condition = $obj.condition
            this.mountLevel = $obj.mountLevel
            this.last = $obj.last
            this.battlepoint = $obj.battlepoint;
            this.force = $obj.force;

            this.costResource = new Array;
            this.costItem = new Array;
            this.spells = new Array;
            makeArray($obj.costResource, this.costResource);
            makeArray($obj.costItem, this.costItem);
            makeArray($obj.spells, this.spells);

            this.prosKeys = new Array;
            makeArray($obj.prosKeys, this.prosKeys);
            this.prosValues = new Array;
            makeArray($obj.prosValues, this.prosValues);
        }

        public static getTabelItem(): Array<TB_mount_illusion_vo> {
            var $arr: Array<TB_mount_illusion_vo> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_mount_illusion)
            for (var $key in $obj.data) {
                var $vo: TB_mount_illusion_vo = new TB_mount_illusion_vo($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_mount_illusion_vo($id): TB_mount_illusion_vo {
            var $obj: any = TableData.getInstance().getData(TableData.tb_mount_illusion, $id);
            var $vo: TB_mount_illusion_vo = new TB_mount_illusion_vo($obj)
            return $vo
        }


    }

    //坐骑幻化技能
    export class SpellVo {

        public id: number;  //技能id
        public name: string;  //技能名
        public desc: string;  //技能描述
        public info: string;  //技能效果
        public icon: string;  //技能图标
        public is_initiative: number;  //技能类型
        public uplevel_id: Array<any>;  //升级id

        public alllevel: number;  //技能总等级
        public currentlevel: number;  //技能当前等级

        public parse($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.desc = $obj.desc;
            this.info = $obj.info;
            this.icon = $obj.icon;
            this.is_initiative = $obj.is_initiative;

            this.uplevel_id = new Array;
            makeArray($obj.uplevel_id, this.uplevel_id);
        }
    }

    export class TB_divine_skill_vo extends SkillDataVo {
        public openSart: number;
        public constructor($obj: any) {
            super($obj)
        }
        public static getTB_divine_skillById($id): tb.TB_divine_skill_vo {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_base, $id);
            var $vo: tb.TB_divine_skill_vo = new tb.TB_divine_skill_vo($obj);
            return $vo;
        }

    }
    export class TB_divine_streng {
        public id: number;
        public divineid: number
        public lev: number
        public props: Array<Array<number>>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }

            this.id = $obj.id;
            this.divineid = $obj.divineid;
            this.lev = $obj.lev;
            this.props = new Array;
            makeArray($obj.props, this.props);

        }
        public static get_TB_divine_streng($id): TB_divine_streng {
            var $upgradeobj: any = TableData.getInstance().getData(TableData.tb_divine_streng, $id);
            var $vo: TB_divine_streng = new TB_divine_streng($upgradeobj)
            return $vo
        }
    }

    export class TB_divine_bless {
        public id: number;
        public bless: number
        public cost: Array<number>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.bless = $obj.bless;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);

        }
        public static get_TB_divine_bless($id): TB_divine_bless {
            var $upgradeobj: any = TableData.getInstance().getData(TableData.tb_divine_bless, $id);
            var $vo: TB_divine_bless = new TB_divine_bless($upgradeobj)
            return $vo
        }
    }
    export class TB_creature_template {
        public id: number
        public name: string
        public info: string
        public npcflag: number
        public monster_type: number
        public hp_num: number
        public level: number
        //public pro: Array<any>
        //public spell: Array<any>
        public ainame: string
        public attack_type: number
        public avatar: number
        public lockfaceto: number
        public title_flag: string
        public drop_belong: number
        public dialogue_id: number

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name
            this.info = $obj.info
            this.npcflag = $obj.npcflag
            this.monster_type = $obj.monster_type
            this.hp_num = $obj.hp_num
            this.level = $obj.level
            //this.pro = new Array
            //makeArray($obj.pro, this.pro)
            //this.spell = new Array
            //makeArray($obj.spell, this.spell)
            this.ainame = $obj.ainame
            this.attack_type = $obj.attack_type
            this.avatar = Number($obj.avatar)
            this.lockfaceto = $obj.lockfaceto
            this.title_flag = $obj.title_flag
            this.drop_belong = $obj.drop_belong
            this.dialogue_id = $obj.dialogue_id
        }
        public static getTabelItem(): Array<TB_creature_template> {
            var $arr: Array<TB_creature_template> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_creature_template)
            for (var $key in $obj.data) {
                var $vo: TB_creature_template = new TB_creature_template($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_creature_template($id): TB_creature_template {
            var $obj: any = TableData.getInstance().getData(TableData.tb_creature_template, $id);
            var $vo: TB_creature_template = new TB_creature_template($obj)
            return $vo
        }
    }
    export class TB_quest_vip_instance {
        public id: number;
        public texst: string

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.texst = $obj.texst;
        }
        public static get_TB_quest_vip_instance($id): TB_quest_vip_instance {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_vip_instance, $id);
            var $vo: TB_quest_vip_instance = new TB_quest_vip_instance($obj)
            return $vo
        }
    }
    export class TB_divine_base {
        public id: number;
        public name: string;
        public model: number;
        public skill: number
        public avtivetype: number
        public icon: number
        public time: number;
        public strength: number
        public type: number
        public avtivedata: Array<number>;
        public passiveskill: Array<Array<number>>;


        public constructor($obj: any) {

            if (!$obj) {
                traceNoTabelData();
            }

            this.id = $obj.id;
            this.name = $obj.name;
            this.model = Number($obj.model);
            this.skill = $obj.skill
            this.avtivetype = $obj.avtivetype;
            this.icon = $obj.icon;
            this.time = $obj.time;
            this.strength = $obj.strength;
            this.type = $obj.type;
            this.avtivedata = new Array;
            makeArray($obj.avtivedata, this.avtivedata);
            this.passiveskill = new Array;
            makeArray($obj.passiveskill, this.passiveskill);




        }
        public static get_TB_divine_base($id): TB_divine_base {
            var $upgradeobj: any = TableData.getInstance().getData(TableData.tb_divine_base, $id);
            var $vo: TB_divine_base = new TB_divine_base($upgradeobj)
            return $vo
        }

    }

    export class TB_divine_baseVO {
        public skillvo: tb.SkillDataVo;
        public passiveskillItem: Array<tb.TB_divine_skill_vo>;
        public showGreenUp: boolean;
        public activation: boolean;  //激活
        public use: boolean;
        public index: number;
        public lev: number;
        public bless: number;
        public outTime: number;
        public tb: TB_divine_base
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.tb = TB_divine_base.get_TB_divine_base($obj.id)
            this.skillvo = tb.SkillDataVo.getSkillBaseDataById($obj.skill);
            this.passiveskillItem = new Array;
            for (var i: number = 0; i < this.tb.passiveskill.length; i++) {
                var $tempOjb: Array<number> = this.tb.passiveskill[i]
                var $skillVo: tb.TB_divine_skill_vo = tb.TB_divine_skill_vo.getTB_divine_skillById($tempOjb[0])
                $skillVo.openSart = $tempOjb[1]
                this.passiveskillItem.push($skillVo)
            }
        }

        public static getTabelItem(): Array<TB_divine_baseVO> {
            var $arr: Array<TB_divine_baseVO> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_divine_base)
            for (var $key in $obj.data) {
                var $vo: TB_divine_baseVO = new TB_divine_baseVO($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_divine_base($id): TB_divine_baseVO {
            var $obj: any = TableData.getInstance().getData(TableData.tb_divine_base, $id);
            var $vo: TB_divine_baseVO = new TB_divine_baseVO($obj)
            return $vo
        }

    }
    export class TB_map {
        public id: number;
        public name: string;
        public type: number; //地图类型
        public types:string;//地图类型描述
        public inst_type: number; //地图副本类型
        public levellimit: number; //限制等级
        public is_PK: number; //是否可以pk
        public mapres: string;
        public inst_sub_type: number;
        public aotubattle: number;
        public is_instance: boolean;
        public allowChangeMode: number;



        public show: Array<number>
        public path: Array<Array<any>>


        //id,parentid,name,type, inst_type, is_instance, shadow, count, day_limit, week_limit, music
        //int, int, string, int, int, int, int, int, int, int, string
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.type = $obj.type;
            this.mapres = $obj.mapres;
            this.levellimit = $obj.levellimit;
            this.is_PK = $obj.is_PK;
            this.inst_sub_type = $obj.inst_sub_type;
            this.aotubattle = $obj.aotubattle;
            this.allowChangeMode = $obj.allowChangeMode;
            this.types = $obj.types;

            this.inst_type = $obj.inst_type;
            this.is_instance = $obj.is_instance;

            var $mainshow: Array<number> = new Array;
            makeArray($obj.mainshow, $mainshow);
            var $show: Array<number> = new Array;
            makeArray($obj.show, $show);
            this.show = $mainshow.concat($show);


            this.path = new Array;
            makeArray($obj.path, this.path);
        }
        public showAreaById($id: number): boolean {
            for (var i: number = 0; i < this.show.length; i++) {
                if (this.show[i] == $id) {
                    return true
                }
            }
            return false;
        }
        public static getTB_map($id: number): TB_map {
            var $obj: any = TableData.getInstance().getData(TableData.tb_map, $id)
            var $vo: TB_map = new TB_map($obj)
            return $vo
        }
        public static getTabelItem(): Array<TB_map> {
            var $arr: Array<TB_map> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_map)
            for (var $key in $obj.data) {
                var $vo: TB_map = new TB_map($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

    }

    export class TB_map_trial {
        public id: number;
        public name: string;
        public model: number;
        public force: number
        public resetgold: number
        public time: number
        public firstReward: Array<Array<number>>
        public showreward: Array<number>



        // id,model,firstReward,showreward,force,resetgold,time
        //   int,int,array,array,int,int,int
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.model = $obj.model;
            this.force = $obj.force;
            this.resetgold = $obj.resetgold;
            this.time = $obj.time;
            this.firstReward = new Array;
            makeArray($obj.firstReward, this.firstReward);
            this.showreward = new Array;
            makeArray($obj.showreward, this.showreward);
        }
        public static get_TB_map_trial($id: number): TB_map_trial {
            var $obj: any = TableData.getInstance().getData(TableData.tb_instance_trial, $id)
            var $vo: TB_map_trial = new TB_map_trial($obj)
            return $vo
        }
        public static getTabelItem(): Array<TB_map_trial> {
            var $arr: Array<TB_map_trial> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_instance_trial)
            for (var $key in $obj.data) {
                var $vo: TB_map_trial = new TB_map_trial($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }


    }
    export class TB_store {
        public id: number;
        public limit: number;
        public costResource: Array<number>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.limit = $obj.limit;
            this.costResource = new Array;
            makeArray($obj.costResource, this.costResource);
        }
        public static get_TB_store($id: number): TB_store {

            var $obj: any = TableData.getInstance().getData(TableData.tb_store, $id)
            var $vo: TB_store = new TB_store($obj)
            return $vo
        }
    }
    export class TB_shop_base {
        public id: number;
        public typename: string
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.typename = $obj.typename;
        }
        public static get_TB_shop_base($id: number): TB_shop_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_shop_base, $id)
            var $vo: TB_shop_base = new TB_shop_base($obj)
            return $vo
        }
    }


    export class TB_shop {
        public id: number;
        public itemId: number;
        public tab: number;
        public type: number;
        public recommend: number;
        public limtime: number;
        public limtype: number;
        public limdata: number;
        public discount: number;
        public count: number;
        public costResource: Array<Array<number>>
        public time: Array<number>
        public limit: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemId = $obj.itemId;
            this.tab = $obj.tab;
            this.type = $obj.type;
            this.recommend = $obj.recommend;
            this.limtime = $obj.limtime;
            this.limtype = $obj.limtype;
            this.limdata = $obj.limdata;
            this.discount = $obj.discount;
            this.count = $obj.count;
            this.time = $obj.time;
            this.limit = $obj.limit;
            this.costResource = new Array;
            makeArray($obj.costResource, this.costResource);
        }
        public static get_TB_shopById($id: number): TB_shop {

            var $obj: any = TableData.getInstance().getData(TableData.tb_shop, $id)
            var $vo: TB_shop = new TB_shop($obj)
            return $vo
        }

        public static get_TB_shop(): Array<TB_shop> {
            var $arr: Array<TB_shop> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_shop)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_shop = new TB_shop($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_map_navigation {
        public id: number;
        public navi: Array<number>;
        public constructor($obj: any) {
            this.navi = new Array;
            if (!$obj) {
                traceNoTabelData();

                return

            }
            this.id = $obj.id;

            makeArray($obj.navi, this.navi);
        }
        public static get_TB_map_navigation($id: number): TB_map_navigation {

            var $obj: any = TableData.getInstance().getData(TableData.tb_map_navigation, $id)
            var $vo: TB_map_navigation = new TB_map_navigation($obj)
            return $vo
        }
    }

    export class TB_map_object {
        public id: number;
        public type: number;
        public name: string;
        public position: Vector2D
        public color: number;

        //    id,type, name, position, color
        //int, int, string, array, int
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }

            this.id = $obj.id;
            this.type = $obj.type;
            this.name = $obj.name;
            this.color = $obj.color;
            this.position = new Vector2D()
            this.position.x = $obj.position[0]
            this.position.y = $obj.position[1]




        }
        public static get_TB_map_object($id: number): TB_map_object {

            var $obj: any = TableData.getInstance().getData(TableData.tb_map_object, $id)
            var $vo: TB_map_object = new TB_map_object($obj)
            return $vo
        }
    }



    export class TB_map_vip {
        public id: number;
        public name: string;

        public vip: number;
        public modle: number;
        public reward: Array<Array<number>>;
        public forces: Array<number>;
        public passed: number;
        public num: number;//当前次数;
        public buynum: number;//购买次数;
        public times: number; //挑战次数上限
        public cost: Array<number>;
        public creatures: Array<number>;
        public canPlayModel: number;
        //id,indx,vip,modle,reward,raiseHardBattlePoints
        //  int,int,int,int,array,array
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;


            this.vip = $obj.vip;

            this.times = $obj.times;
            this.forces = new Array;
            makeArray($obj.forces, this.forces);
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.creatures = new Array;
            makeArray($obj.creatures, this.creatures);

        }
        public static get_TB_map_vip($id: number): TB_map_vip {
            var $obj: any = TableData.getInstance().getData(TableData.tb_map_vip, $id)
            var $vo: TB_map_vip = new TB_map_vip($obj)
            return $vo
        }
        public static getTabelItem(): Array<TB_map_vip> {
            var $arr: Array<TB_map_vip> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_map_vip)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_map_vip = new TB_map_vip($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

    }


    export class Tb_social_familiay {
        public id: number;
        public exp: number;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.exp = $obj.exp;
        }
        public static get_Tb_social_familiay($id: number): Tb_social_familiay {
            var $obj: any = TableData.getInstance().getData(TableData.tb_social_familiay, $id)
            var $vo: Tb_social_familiay = new Tb_social_familiay($obj)
            return $vo
        }
    }



    export class Tb_social_shop {
        public id: number;
        public itemId: number;
        public costResource: Array<number>;
        public familiay: number;
        public type: string;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemId = $obj.itemId;
            this.familiay = $obj.familiay;
            this.costResource = new Array;
            makeArray($obj.costResource, this.costResource);
        }

        public static get_Tb_social_shopItem(): Array<Tb_social_shop> {
            var $arr: Array<Tb_social_shop> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_social_shop)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_social_shop = new Tb_social_shop($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_msg_text_type {
        public id: number;
        public content: string

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.content = $obj.content;

        }
        public static get_TB_msg_text_type($id: number): TB_msg_text_type {
            var $obj: any = TableData.getInstance().getData(TableData.tb_msg_text_type, $id)
            var $vo: TB_msg_text_type = new TB_msg_text_type($obj)
            return $vo
        }
    }

    export class TB_worldboss_base {
        public id: number;
        public entry: number
        public items: Array<number>
        //id,entry,items
        //int,int,array
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.entry = $obj.entry;
            this.items = new Array;
            makeArray($obj.items, this.items);

        }
        public static get_TB_worldboss_base($id: number): TB_worldboss_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_worldboss_base, $id)
            var $vo: TB_worldboss_base = new TB_worldboss_base($obj)
            return $vo
        }
    }
    export class TB_worldboss_time {
        public id: number;
        public time: Array<number>;
        public enrolllast: number;
        public time_last: number;
        //id,entry,items
        //int,int,array
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.enrolllast = $obj.enrolllast;
            this.time_last = $obj.time_last;
            this.time = new Array;
            makeArray($obj.time, this.time);

        }
        public static get_TB_worldboss_time($id: number): TB_worldboss_time {
            var $obj: any = TableData.getInstance().getData(TableData.tb_worldboss_time, $id)
            var $vo: TB_worldboss_time = new TB_worldboss_time($obj)
            return $vo
        }
    }

    export class TB_vip_base {
        public id: number;
        public resReward: number;
        public djtReward: number;
        public qualifyReward: number;
        public groupReward: number;
        public worldbossReward: number;
        public trialReward: number;
        public riskReward: number;
        public massbossBuyTimes: number;
        public djtBuyTimes: number;
        public factiondonation: number;
        public factionybdonation: number;
        // public instance: number;
        public chongzhi: number;
        public treeTimes: number;
        public desc: string;
        public gift: Array<Array<number>>;
        public cost: Array<Array<number>>;
        public fake_cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();;
            }
            this.id = $obj.id;
            this.factiondonation = $obj.factiondonation;
            this.factionybdonation = $obj.factionybdonation;
            this.resReward = $obj.resReward;
            this.djtReward = $obj.djtReward;
            this.qualifyReward = $obj.qualifyReward;
            this.groupReward = $obj.groupReward;
            this.worldbossReward = $obj.worldbossReward;
            this.trialReward = $obj.trialReward;
            this.riskReward = $obj.riskReward;
            this.massbossBuyTimes = $obj.massbossBuyTimes;
            this.djtBuyTimes = $obj.djtBuyTimes;
            this.chongzhi = $obj.chongzhi;
            this.treeTimes = $obj.treeTimes;
            this.desc = $obj.desc;
            this.gift = new Array;
            makeArray($obj.gift, this.gift);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.fake_cost = new Array;
            makeArray($obj.fake_cost, this.fake_cost);


        }
        public static get_TB_vip_baseById($id: number): TB_vip_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_vip_base, $id)
            var $vo: TB_vip_base = new TB_vip_base($obj)
            return $vo
        }

        public static getTB_vip_base(): Array<TB_vip_base> {
            var $arr: Array<TB_vip_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_vip_base)
            for (var $key in $obj.data) {
                var $vo: TB_vip_base = new TB_vip_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

    }

    export class TB_worldboss_rank_reward {
        public id: number;
        public id2: number;
        public reward: string
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.id2 = $obj.id2;
            this.reward = $obj.reward


        }
        public static getTabelItem(): Array<TB_worldboss_rank_reward> {
            var $arr: Array<TB_worldboss_rank_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_worldboss_rank_reward)
            for (var $key in $obj.data) {
                var $vo: TB_worldboss_rank_reward = new TB_worldboss_rank_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

    }
    export class TB_skill_show {
        public zhudong_list: Array<number>;//主动技能列表
        public anger_list: Array<number>;//怒气技能列表
        public passive_list: Array<number>;//被动技能列表
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.zhudong_list = new Array;
            makeArray($obj.zhudong_list, this.zhudong_list);
            this.anger_list = new Array;
            makeArray($obj.anger_list, this.anger_list);
            this.passive_list = new Array;
            makeArray($obj.passive_list, this.passive_list);

        }
        public static get_TB_skill_show($id: number): TB_skill_show {
            var $obj: any = TableData.getInstance().getData(TableData.tb_skill_show, $id)
            var $vo: TB_skill_show = new TB_skill_show($obj)
            return $vo
        }


    }
    export class TB_msg {
        public id: number;
        public type: number;
        public reason: string;
        public text: string
        public msgtype: number
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.reason = $obj.reason;
            this.text = $obj.text;
            this.msgtype = $obj.msgtype;

        }
        public static get_TB_msg($id: number): TB_msg {
            var $obj: any = TableData.getInstance().getData(TableData.tb_msg, $id)
            var $vo: TB_msg = new TB_msg($obj)
            return $vo
        }


    }

    export class TB_activity_base {
        public id: number;
        public name: string;
        public nums: number;
        public vipnums: Array<number>;
        public active: number;
        public icon: number;
        public goto_sub: number
        public goto: number

        public time: Array<Array<number>>;

        public greptimelim: number;
        public grepone: number;
        public grepgroup: number;
        public grepfaction: number;
        public recommend: number;
        public pvp: number;
        public limtype: number;
        public limdata: number;

        public basereward: Array<Array<number>>;
        public reward: Array<Array<number>>;

        public info: string;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.nums = $obj.nums;
            this.active = $obj.active;
            this.icon = $obj.icon;
            this.greptimelim = $obj.greptimelim;
            this.grepone = $obj.grepone;
            this.grepgroup = $obj.grepgroup;
            this.grepfaction = $obj.grepfaction;
            this.recommend = $obj.recommend;
            this.pvp = $obj.pvp;
            this.limtype = $obj.limtype;
            this.limdata = $obj.limdata;
            this.goto = $obj.goto;
            this.goto_sub = $obj.goto_sub;

            this.vipnums = new Array;
            makeArray($obj.vipnums, this.vipnums);
            this.time = new Array;
            makeArray($obj.time, this.time);
            this.basereward = new Array;
            makeArray($obj.basereward, this.basereward);
            this.reward = new Array;
            makeArray($obj.reward, this.reward);

            this.info = $obj.info;
        }
        public static get_TB_activity_baseByid($id: number): TB_activity_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_activity_base, $id)
            var $vo: TB_activity_base = new TB_activity_base($obj)
            return $vo
        }

        public static get_TB_activity_base(): Array<TB_activity_base> {
            var $arr: Array<TB_activity_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_activity_base)
            for (var $key in $obj.data) {
                var $vo: TB_activity_base = new TB_activity_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

    }

    export class TB_activity_reward {
        public id: number;
        public active: number;
        public reward: Array<Array<number>>;
        public vipreward: Array<Array<number>>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.active = $obj.active;

            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.vipreward = new Array;
            makeArray($obj.vipreward, this.vipreward);

        }
        public static get_TB_activity_rewardByid($id: number): TB_activity_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_activity_reward, $id)
            var $vo: TB_activity_reward = new TB_activity_reward($obj)
            return $vo
        }

        public static get_TB_activity_reward(): Array<TB_activity_reward> {
            var $arr: Array<TB_activity_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_activity_reward)
            for (var $key in $obj.data) {
                var $vo: TB_activity_reward = new TB_activity_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_social_num {
        public id: number;
        public num: number;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.num = $obj.num;
        }
        public static get_TB_social_num($id: number): TB_social_num {
            var $obj: any = TableData.getInstance().getData(TableData.tb_social_num, $id)
            var $vo: TB_social_num = new TB_social_num($obj)
            return $vo
        }
    }
    export class TB_creature_dialogue {
        public id: number;
        public npc_dialogue: string;
        public next_id: number
        public type:number;
        public typedata:any;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.npc_dialogue = $obj.npc_dialogue;
            this.next_id = $obj.next_id;
            this.type = $obj.type;
            this.typedata = $obj.typedata;

        }
        public static get_TB_creature_dialogue($id: number): TB_creature_dialogue {
            var $obj: any = TableData.getInstance().getData(TableData.tb_creature_dialogue, $id)
            var $vo: TB_creature_dialogue = new TB_creature_dialogue($obj)
            return $vo
        }
    }


    export class TB_quest {
        public id: number;
        public type: number;
        public ctype: number;
        public level: number
        public chapterName: string;
        public chapter: number;
        public questName: string;
        public desc: string;
        public text: Array<string>;
        public popup: number;
        public targetsPosition: Array<Array<number>>
        public rewards: Array<any>
        public flag: number;
        public dialogue: number;
        public start: number;
        public showpage: number;
        public icon: Array<number>;
        public belongSet: number;
        public specialButton: string;
        public hint: Array<any>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
                return;
            }
            this.id = $obj.id;
            this.start = $obj.start;
            this.type = $obj.type;
            this.ctype = $obj.ctype;
            this.showpage = Number($obj.showpage);

            this.level = $obj.level;
            this.chapterName = $obj.chapterName;
            this.chapter = $obj.chapter;
            this.questName = $obj.questName;
            this.desc = $obj.desc;
            this.popup = $obj.popup;
            this.flag = $obj.flag;
            this.dialogue = $obj.dialogue;

            this.belongSet = $obj.belongSet;
            this.specialButton = $obj.specialButton;


            this.hint = new Array;
            makeArray($obj.hint, this.hint);

            this.icon = new Array;
            makeArray($obj.icon, this.icon);


            this.text = new Array;
            makeArray($obj.text, this.text);

            this.targetsPosition = new Array;
            makeArray($obj.targetsPosition, this.targetsPosition);

            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);

        }
        public static getItem(): Array<TB_quest> {
            var $arr: Array<TB_quest> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_quest);
            for (var $key in $obj.data) {
                var $vo: TB_quest = new TB_quest($obj.data[$key]);
                $arr.push($vo);
            }
            return $arr;


        }
        public static getTbById($id: number): TB_quest {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest, $id)
            var $vo: TB_quest = new TB_quest($obj)
            return $vo
        }
    }



    export class TB_instance_res {
        public id: number;
        public mapid: number;
        public type: number
        public name: string
        public randomreward: Array<Array<number>>;
        public basereward: Array<Array<number>>;
        public time: number;
        public times: number;
        public limLev: number
        public boss: number
        public refresnum: number

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapid = $obj.mapid;
            this.name = $obj.name;
            this.type = $obj.type;
            this.time = $obj.time;
            this.times = $obj.times;
            this.limLev = $obj.limLev;
            this.boss = $obj.boss;
            this.refresnum = $obj.refresnum;

            this.randomreward = new Array;
            makeArray($obj.randomreward, this.randomreward);
            this.basereward = new Array;
            makeArray($obj.basereward, this.basereward);

            console.log("TB_instance_res", this, $obj)
        }
        public static getTabelItem(): Array<TB_instance_res> {
            var $arr: Array<TB_instance_res> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_instance_res)
            for (var $key in $obj.data) {
                var $vo: TB_instance_res = new TB_instance_res($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_TB_instance_res($id: number): TB_instance_res {
            var $obj: any = TableData.getInstance().getData(TableData.tb_instance_res, $id)
            var $vo: TB_instance_res = new TB_instance_res($obj)
            return $vo
        }


    }


    export class TB_achieve_base {
        public id: number;
        public name: string
        public type: number
        public stype: number
        public info: string
        public maxnum: number
        public icon: number
        public linktype: number
        public reward: Array<Array<number>>;
        public achval: number
        public title: number

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.type = $obj.type;
            this.stype = $obj.stype;
            this.info = $obj.info;
            this.maxnum = $obj.maxnum;
            this.icon = $obj.icon;
            this.linktype = $obj.linktype;

            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.achval = $obj.achval;
            this.title = $obj.title;
        }
        public static getTB_achieve_base(): Array<TB_achieve_base> {
            var $arr: Array<TB_achieve_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_achieve_base)
            for (var $key in $obj.data) {
                var $vo: TB_achieve_base = new TB_achieve_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_achieve_baseById($id: number): TB_achieve_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_achieve_base, $id)
            var $vo: TB_achieve_base = new TB_achieve_base($obj)
            return $vo
        }
    }


    export class TB_achieve_progress {
        public id: number;
        public achval: number
        public reward: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.achval = $obj.achval;

            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        public static getTB_achieve_progress(): Array<TB_achieve_progress> {
            var $arr: Array<TB_achieve_progress> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_achieve_progress)
            for (var $key in $obj.data) {
                var $vo: TB_achieve_progress = new TB_achieve_progress($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_achieve_progressById($id: number): TB_achieve_progress {
            var $obj: any = TableData.getInstance().getData(TableData.tb_achieve_progress, $id)
            var $vo: TB_achieve_progress = new TB_achieve_progress($obj)
            return $vo
        }
    }

    export class TB_title_base {
        public id: number;
        public name: string
        public type: number
        public info: string
        public getinfo: string
        public limtime: number
        public qua: number
        public prop: Array<Array<number>>;
        public unlock_type: number
        public unlock_cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.type = $obj.type;
            this.info = $obj.info;
            this.getinfo = $obj.getinfo;
            this.limtime = $obj.limtime;
            this.unlock_type = $obj.unlock_type;
            this.qua = $obj.qua;

            this.prop = new Array;
            makeArray($obj.prop, this.prop);
            this.unlock_cost = new Array;
            makeArray($obj.unlock_cost, this.unlock_cost);
        }
        public static getTB_title_base(): Array<TB_title_base> {
            var $arr: Array<TB_title_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_title_base)
            for (var $key in $obj.data) {
                var $vo: TB_title_base = new TB_title_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static get_TB_title_baseById($id: number): TB_title_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_title_base, $id)
            var $vo: TB_title_base = new TB_title_base($obj)
            return $vo
        }
    }


    export class TB_shop_chongzhi {
        public id: number;
        public yuanbao: number

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.yuanbao = $obj.yuanbao;
        }
        public static getTB_shop_chongzhi(): Array<TB_shop_chongzhi> {
            var $arr: Array<TB_shop_chongzhi> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_shop_chongzhi)
            for (var $key in $obj.data) {
                var $vo: TB_shop_chongzhi = new TB_shop_chongzhi($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_gameobject_template {
        public id: number
        public name: string
        public time: number
        public actionState: number
        public regX: number
        public regY: number
        public taskShow: number
        public judge: number
        public quest_id0: number
        public quest_id1: number
        public quest_id2: number
        public quest_id3: number
        public trigger_width: number
        public trigger_height: number
        public avatar: number
        public style: number
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name
            this.time = $obj.time
            this.actionState = $obj.actionState
            this.regX = $obj.regX
            this.regY = $obj.regY
            this.taskShow = $obj.taskShow
            this.judge = $obj.judge
            this.quest_id0 = $obj.quest_id0
            this.quest_id1 = $obj.quest_id1
            this.quest_id2 = $obj.quest_id2
            this.quest_id3 = $obj.quest_id3
            this.trigger_width = $obj.trigger_width
            this.trigger_height = $obj.trigger_height
            this.avatar = Number($obj.avatar)
            this.style = $obj.style
        }
        public static get_TB_gameobject_template($id: number): TB_gameobject_template {
            var $obj: any = TableData.getInstance().getData(TableData.tb_gameobject_template, $id)
            var $vo: TB_gameobject_template = new TB_gameobject_template($obj)
            return $vo
        }
    }


    export class TB_welfare_shouchong {
        public id: number;
        public item: Array<Array<number>>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        public static get_TB_welfare_shouchongById($id: number): TB_welfare_shouchong {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_shouchong, $id)
            var $vo: TB_welfare_shouchong = new TB_welfare_shouchong($obj)
            return $vo
        }

        public static get_TB_welfare_shouchong(): Array<TB_welfare_shouchong> {
            var $arr: Array<TB_welfare_shouchong> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_shouchong)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_shouchong = new TB_welfare_shouchong($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_welfare_checkin {
        public id: number;
        public item: Array<Array<number>>
        public vip: number;
        public times: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
            this.vip = $obj.vip;
            this.times = $obj.times;
        }
        public static get_TB_welfare_checkinById($id: number): TB_welfare_checkin {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_checkin, $id)
            var $vo: TB_welfare_checkin = new TB_welfare_checkin($obj)
            return $vo
        }

        public static get_TB_welfare_checkin(): Array<TB_welfare_checkin> {
            var $arr: Array<TB_welfare_checkin> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_checkin)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_checkin = new TB_welfare_checkin($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_welfare_checkin_all {
        public id: number;
        public num: number;
        public item: Array<Array<number>>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.num = $obj.num;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        public static get_TB_welfare_checkin_allById($id: number): TB_welfare_checkin_all {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_checkin_all, $id)
            var $vo: TB_welfare_checkin_all = new TB_welfare_checkin_all($obj)
            return $vo
        }

        public static get_TB_welfare_checkin_all(): Array<TB_welfare_checkin_all> {
            var $arr: Array<TB_welfare_checkin_all> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_checkin_all)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_checkin_all = new TB_welfare_checkin_all($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_welfare_level {
        public id: number;
        public lev: number;
        public item: Array<Array<number>>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.lev = $obj.lev;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }
        public static get_TB_welfare_levelById($id: number): TB_welfare_level {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_level, $id)
            var $vo: TB_welfare_level = new TB_welfare_level($obj)
            return $vo
        }

        public static get_TB_welfare_level(): Array<TB_welfare_level> {
            var $arr: Array<TB_welfare_level> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_level)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_level = new TB_welfare_level($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }



    export class TB_welfare_back {
        public id: number;
        public basecost: Array<Array<number>>
        public allcost: Array<Array<number>>
        public basedc: number;
        public alldc: number;
        public name: string;
        public basereward: Array<Array<number>>
        public allreward: Array<Array<number>>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.basecost = new Array;
            makeArray($obj.basecost, this.basecost);
            this.allcost = new Array;
            makeArray($obj.allcost, this.allcost);
            this.basedc = $obj.basedc;
            this.alldc = $obj.alldc;
            this.name = $obj.name;
            this.basereward = new Array;
            makeArray($obj.basereward, this.basereward);
            this.allreward = new Array;
            makeArray($obj.allreward, this.allreward);
        }
        public static get_TB_welfare_backById($id: number): TB_welfare_back {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_back, $id)
            var $vo: TB_welfare_back = new TB_welfare_back($obj)
            return $vo
        }

        public static get_TB_welfare_back(): Array<TB_welfare_back> {
            var $arr: Array<TB_welfare_back> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_back)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_back = new TB_welfare_back($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_kuafu_xianfu_condition {
        public id: number;
        public levelrange: Array<number>
        public ticket: Array<Array<number>>
        public price: Array<Array<number>>
        public boxid: number;
        public joinReward: Array<Array<number>>;
        public ticketid: number;
        public showReward: Array<Array<number>>;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.levelrange = new Array;
            makeArray($obj.levelrange, this.levelrange);
            this.ticket = new Array;
            makeArray($obj.ticket, this.ticket);
            this.price = new Array;
            makeArray($obj.price, this.price);
            this.boxid = $obj.boxid;
            this.joinReward = new Array;
            makeArray($obj.joinReward, this.joinReward);
            this.ticketid = $obj.ticketid;

            this.showReward = new Array;
            makeArray($obj.showReward, this.showReward);
        }
        public static get_TB_kuafu_xianfu_conditionById($id: number): TB_kuafu_xianfu_condition {
            var $obj: any = TableData.getInstance().getData(TableData.tb_kuafu_xianfu_condition, $id)
            var $vo: TB_kuafu_xianfu_condition = new TB_kuafu_xianfu_condition($obj)
            return $vo
        }

        public static get_TB_kuafu_xianfu_condition(): Array<TB_kuafu_xianfu_condition> {
            var $arr: Array<TB_kuafu_xianfu_condition> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_kuafu_xianfu_condition)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_kuafu_xianfu_condition = new TB_kuafu_xianfu_condition($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_welfare_level_show {
        public id: number;
        public item: Array<Array<number>>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }

        public static get_TB_welfare_level_show(): Array<TB_welfare_level_show> {
            var $arr: Array<TB_welfare_level_show> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_level_show)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_level_show = new TB_welfare_level_show($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }



    }
    export class TB_kuafu_xianfu_base {
        public id: number;
        public dailytimes: number
        public boxid: number
        public joinTime: Array<Array<number>>

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.dailytimes = $obj.dailytimes;
            this.boxid = $obj.boxid;
            this.joinTime = new Array;
            makeArray($obj.joinTime, this.joinTime);
        }
        public static getTempVo($id: number): TB_kuafu_xianfu_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_kuafu_xianfu_base, $id)
            var $vo: TB_kuafu_xianfu_base = new TB_kuafu_xianfu_base($obj)
            return $vo
        }
    }


    export class TB_doujiantai_first {
        public id: number;
        public rank: number;
        public reward: Array<Array<number>>


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rank = $obj.rank;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        public static get_TB_doujiantai_firstById($id: number): TB_doujiantai_first {
            var $obj: any = TableData.getInstance().getData(TableData.tb_doujiantai_first, $id)
            var $vo: TB_doujiantai_first = new TB_doujiantai_first($obj)
            return $vo
        }

        public static get_TB_doujiantai_first(): Array<TB_doujiantai_first> {
            var $arr: Array<TB_doujiantai_first> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_doujiantai_first)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_doujiantai_first = new TB_doujiantai_first($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_doujiantai_day {
        public id: number;
        public rank: number;
        public reward: number;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rank = $obj.rank;
            this.reward = $obj.reward;
        }
        public static get_TB_doujiantai_dayById($id: number): TB_doujiantai_day {
            var $obj: any = TableData.getInstance().getData(TableData.tb_doujiantai_day, $id)
            var $vo: TB_doujiantai_day = new TB_doujiantai_day($obj)
            return $vo
        }

        public static get_TB_doujiantai_day(): Array<TB_doujiantai_day> {
            var $arr: Array<TB_doujiantai_day> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_doujiantai_day)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_doujiantai_day = new TB_doujiantai_day($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_system_preview {
        public id: number;
        public type2: number;
        public name: string;
        public level: number;
        public level_start: number;
        
        public info: string;
        public system_id: Array<number>;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type2 = $obj.type2;
            this.name = $obj.name;
            this.level = $obj.level;
            this.level_start = $obj.level_start;
            this.info = $obj.info;

            this.system_id = new Array;
            makeArray($obj.system_id, this.system_id);
        }
        public static getTempVo($id: number): TB_system_preview {
            var $obj: any = TableData.getInstance().getData(TableData.tb_system_preview, $id)
            var $vo: TB_system_preview = new TB_system_preview($obj)
            return $vo
        }
        public static getItem(): Array<TB_system_preview> {
            var $arr: Array<TB_system_preview> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_system_preview)
            for (var $key in $obj.data) {
                var $vo: TB_system_preview = new TB_system_preview($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_system_icon {
        public id: number
        public position: number
        public index: number
        public move: number
        public list: Array<number>;
        public optional_list: Array<number>;
        public bindactive: Array<number>;

        public text: string;
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.position = $obj.position
            this.index = $obj.index
            this.move = $obj.move
            this.index = $obj.index
            this.text = $obj.text

            this.list = new Array;
            this.bindactive = new Array;
            makeArray($obj.list, this.list);
            makeArray($obj.bindactive, this.bindactive);

            this.optional_list = new Array;
            if ($obj.optional_list) {
                makeArray($obj.optional_list, this.optional_list);
            }

            //  this.text="就这样显示在这里"

        }
        public static getItem(): Array<TB_system_icon> {
            var $arr: Array<TB_system_icon> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_system_icon)
            for (var $key in $obj.data) {
                var $vo: TB_system_icon = new TB_system_icon($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
        public static getTempVo($id: number): TB_system_icon {
            var $obj: any = TableData.getInstance().getData(TableData.tb_system_icon, $id)
            var $vo: TB_system_icon = new TB_system_icon($obj)
            return $vo
        }

    }
    export class TB_system_base {
        public id: number
        public name: string
        public level: number
        public position: number
        public index: number
        public view: number
        public isguide: number
        public guide_id: number
        public condition_info: string
        public info: string
        public show: number
        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id
            this.name = $obj.name
            this.level = $obj.level
            this.position = $obj.position
            this.index = $obj.index
            this.view = $obj.view
            this.isguide = $obj.isguide
            this.guide_id = $obj.guide_id
            this.condition_info = $obj.condition_info
            this.info = $obj.info
            this.show = $obj.show
        }
        public static getTempVo($id: number): TB_system_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_system_base, $id)
            var $vo: TB_system_base = new TB_system_base($obj)
            return $vo
        }
        public static getItem(): Array<TB_system_base> {
            var $arr: Array<TB_system_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_system_base)
            for (var $key in $obj.data) {
                var $vo: TB_system_base = new TB_system_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }




    export class TB_doujiantai_combat_win {
        public id: number;
        public reward: number;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.reward = $obj.reward;
        }
        public static get_TB_doujiantai_combat_winById($id: number): TB_doujiantai_combat_win {
            var $obj: any = TableData.getInstance().getData(TableData.tb_doujiantai_combat_win, $id)
            if ($obj) {
                var $vo: TB_doujiantai_combat_win = new TB_doujiantai_combat_win($obj)
                return $vo
            } else {
                return null
            }
        }

        public static get_TB_doujiantai_combat_win(): Array<TB_doujiantai_combat_win> {
            var $arr: Array<TB_doujiantai_combat_win> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_doujiantai_combat_win)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_doujiantai_combat_win = new TB_doujiantai_combat_win($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_doujiantai_base {
        public id: number;
        public joinTime: Array<number>
        public dailytimes: number;
        public tryReward: Array<Array<number>>
        public buyInfo: Array<number>
        public level: number;
        public refreshCountdown: number;
        public battleCountdown: Array<number>
        public changeRate: number;


        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.joinTime = new Array;
            makeArray($obj.joinTime, this.joinTime);
            this.dailytimes = $obj.dailytimes;
            this.level = $obj.level;
            this.changeRate = $obj.changeRate;
            this.refreshCountdown = $obj.refreshCountdown;
            this.tryReward = new Array;
            makeArray($obj.tryReward, this.tryReward);
            this.buyInfo = new Array;
            makeArray($obj.buyInfo, this.buyInfo);
            this.battleCountdown = new Array;
            makeArray($obj.battleCountdown, this.battleCountdown);
        }
        public static get_TB_doujiantai_baseById($id: number): TB_doujiantai_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_doujiantai_base, $id)
            var $vo: TB_doujiantai_base = new TB_doujiantai_base($obj)
            return $vo
        }

        public static get_TB_doujiantai_base(): Array<TB_doujiantai_base> {
            var $arr: Array<TB_doujiantai_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_doujiantai_base)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_doujiantai_base = new TB_doujiantai_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_bianqiang_sub {
        public id: number;
        public parent_id: number;
        public icon: number;
        public name: string;
        public info: string;
        public value_type: number;
        public priority: number;
        public goto: number;
        public goto_sub: Array<number>;
        public limitlev: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.parent_id = $obj.parent_id;
            this.icon = $obj.icon;
            this.name = $obj.name;
            this.info = $obj.info;
            this.value_type = $obj.value_type;
            this.priority = $obj.priority;
            this.goto = $obj.goto;
            this.goto_sub = new Array;
            makeArray($obj.goto_sub, this.goto_sub);
            this.limitlev = $obj.limitlev;
        }
        public static get_TB_bianqiang_subById($id: number): TB_bianqiang_sub {
            var $obj: any = TableData.getInstance().getData(TableData.tb_bianqiang_sub, $id)
            var $vo: TB_bianqiang_sub = new TB_bianqiang_sub($obj)
            return $vo
        }

        public static get_TB_bianqiang_sub(): Array<TB_bianqiang_sub> {
            var $arr: Array<TB_bianqiang_sub> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_bianqiang_sub)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_bianqiang_sub = new TB_bianqiang_sub($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_bianqiang_value {
        public id: number;
        public value: number;
        public value_devide: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.value = $obj.value;
            this.value_devide = new Array;
            makeArray($obj.value_devide, this.value_devide);
        }
        public static get_TB_bianqiang_valueById($id: number): TB_bianqiang_value {
            var $obj: any = TableData.getInstance().getData(TableData.tb_bianqiang_value, $id)
            var $vo: TB_bianqiang_value = new TB_bianqiang_value($obj)
            return $vo
        }

        public static get_TB_bianqiang_value(): Array<TB_bianqiang_value> {
            var $arr: Array<TB_bianqiang_value> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_bianqiang_value)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_bianqiang_value = new TB_bianqiang_value($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_bianqiang_rank {
        public id: number;
        public name: string;
        public info: string;
        public color: string;
        public percent: number;
        public icon: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.info = $obj.info;
            this.color = $obj.color;
            this.percent = $obj.percent;
            this.icon = $obj.icon;
        }
        public static get_TB_bianqiang_rankById($id: number): TB_bianqiang_rank {
            var $obj: any = TableData.getInstance().getData(TableData.tb_bianqiang_rank, $id)
            var $vo: TB_bianqiang_rank = new TB_bianqiang_rank($obj)
            return $vo
        }

        public static get_TB_bianqiang_rank(): Array<TB_bianqiang_rank> {
            var $arr: Array<TB_bianqiang_rank> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_bianqiang_rank)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_bianqiang_rank = new TB_bianqiang_rank($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_xiulianchang_base {
        public id: number;
        public max_plunder_recover_count: number;
        public plunder_recover_time: number;
        public rival_refresh_cd: number;
        public module_id: number;
        public base_exp_reward: number;
        public plunder_exp_reward: number;
        public get_reward_time_limit: number;
        public base_exp_time_unit: number;
        public max_been_plunder_count: number;
        public plunder_exp_lost: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.max_plunder_recover_count = $obj.max_plunder_recover_count;
            this.plunder_recover_time = $obj.plunder_recover_time;
            this.rival_refresh_cd = $obj.rival_refresh_cd;
            this.module_id = $obj.module_id;
            this.base_exp_reward = $obj.base_exp_reward;
            this.plunder_exp_reward = $obj.plunder_exp_reward;
            this.get_reward_time_limit = $obj.get_reward_time_limit;
            this.base_exp_time_unit = $obj.base_exp_time_unit;
            this.max_been_plunder_count = $obj.max_been_plunder_count;
            this.plunder_exp_lost = $obj.plunder_exp_lost;
        }
        public static get_TB_xiulianchang_baseById($id: number): TB_xiulianchang_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_xiulianchang_base, $id)
            var $vo: TB_xiulianchang_base = new TB_xiulianchang_base($obj)
            return $vo
        }

        public static get_TB_xiulianchang_base(): Array<TB_xiulianchang_base> {
            var $arr: Array<TB_xiulianchang_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_xiulianchang_base)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_xiulianchang_base = new TB_xiulianchang_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_xiulianchang_vip {
        public id: number;
        public time_limit: number;
        public buy_limit: number;
        public buy_price: Array<Array<number>>;
        public plunder_limit: number;
        public extend_exp_reward: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.time_limit = $obj.time_limit;
            this.buy_limit = $obj.buy_limit;
            this.plunder_limit = $obj.plunder_limit;
            this.extend_exp_reward = $obj.extend_exp_reward;

            this.buy_price = new Array;
            makeArray($obj.buy_price, this.buy_price);
        }
        public static get_TB_xiulianchang_vipById($id: number): TB_xiulianchang_vip {
            var $obj: any = TableData.getInstance().getData(TableData.tb_xiulianchang_vip, $id)
            var $vo: TB_xiulianchang_vip = new TB_xiulianchang_vip($obj)
            return $vo
        }

        public static get_TB_xiulianchang_vip(): Array<TB_xiulianchang_vip> {
            var $arr: Array<TB_xiulianchang_vip> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_xiulianchang_vip)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_xiulianchang_vip = new TB_xiulianchang_vip($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_faction_privilege {
        public id: number;
        public destroyItem: number;
        public manager: number;
        public coreManager: number;
        public replaceFlag: number;
        public handInQuality: number;



        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.destroyItem = $obj.destroyItem;
            this.manager = $obj.manager;
            this.coreManager = $obj.coreManager;
            this.replaceFlag = $obj.replaceFlag;
            this.handInQuality = $obj.handInQuality;

        }
        public static get_TB_faction_privilege($id: number): TB_faction_privilege {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_privilege, $id)
            var $vo: TB_faction_privilege = new TB_faction_privilege($obj)
            return $vo
        }
    }
    export class TB_xiulianchang_reward {
        public id: number;
        public time: number;
        public reward: Array<Array<number>>;
        public vip_label: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.time = $obj.time;
            this.vip_label = $obj.vip_label;

            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }
        public static get_TB_xiulianchang_rewardById($id: number): TB_xiulianchang_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_xiulianchang_reward, $id)
            var $vo: TB_xiulianchang_reward = new TB_xiulianchang_reward($obj)
            return $vo
        }

        public static get_TB_xiulianchang_reward(): Array<TB_xiulianchang_reward> {
            var $arr: Array<TB_xiulianchang_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_xiulianchang_reward)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_xiulianchang_reward = new TB_xiulianchang_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_char_level {
        public id: number;
        public next_exp: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.next_exp = $obj.next_exp;
        }
        public static get_TB_char_levelById($id: number): TB_char_level {
            var $obj: any = TableData.getInstance().getData(TableData.tb_char_level, $id)
            var $vo: TB_char_level = new TB_char_level($obj)
            return $vo
        }

        public static get_TB_char_level(): Array<TB_char_level> {
            var $arr: Array<TB_char_level> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_char_level)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_char_level = new TB_char_level($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_login_activity_reward {
        public id: number;
        public day: number;
        public reward: Array<Array<number>>;
        public menu_title: string;
        public indx: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.day = $obj.day;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.menu_title = $obj.menu_title;
            this.indx = $obj.indx;
        }
        public static get_TB_login_activity_rewardById($id: number): TB_login_activity_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_login_activity_reward, $id)
            var $vo: TB_login_activity_reward = new TB_login_activity_reward($obj)
            return $vo
        }

        public static get_TB_login_activity_reward(): Array<TB_login_activity_reward> {
            var $arr: Array<TB_login_activity_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_login_activity_reward)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_login_activity_reward = new TB_login_activity_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_login_activity_preview {
        public id: number;
        public preview_name: string;
        public preview_model: number;
        public preview_effect: number;
        public preview_info: string;
        public day: number;
        public type: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.preview_name = $obj.preview_name;
            this.preview_model = $obj.preview_model;
            this.preview_effect = $obj.preview_effect;
            this.preview_info = $obj.preview_info;
            this.day = $obj.day;
            this.type = $obj.type;
        }
        public static get_TB_login_activity_previewById($id: number): TB_login_activity_preview {
            var $obj: any = TableData.getInstance().getData(TableData.tb_login_activity_preview, $id)
            var $vo: TB_login_activity_preview = new TB_login_activity_preview($obj)
            return $vo
        }

        public static get_TB_login_activity_preview(): Array<TB_login_activity_preview> {
            var $arr: Array<TB_login_activity_preview> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_login_activity_preview)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_login_activity_preview = new TB_login_activity_preview($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_worldboss_roll {
        public id: number;
        public itemid: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.itemid = $obj.itemid;
        }
        public static get_TB_worldboss_rollById($id: number): TB_worldboss_roll {
            var $obj: any = TableData.getInstance().getData(TableData.tb_worldboss_roll, $id)
            var $vo: TB_worldboss_roll = new TB_worldboss_roll($obj)
            return $vo
        }

        public static get_TB_worldboss_roll(): Array<TB_worldboss_roll> {
            var $arr: Array<TB_worldboss_roll> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_worldboss_roll)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_worldboss_roll = new TB_worldboss_roll($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_faction_boss {
        public id: number;
        public entry: number;
        public faction_zhiwei_limit: Array<number>;
        public faction_lv_limit: number;
        public wait_time: number;
        public time: number;
        public token_cost: number;
        public difficult: number;
        public all_rewards: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.entry = $obj.entry;
            this.faction_zhiwei_limit = new Array;
            makeArray($obj.faction_zhiwei_limit, this.faction_zhiwei_limit);
            this.faction_lv_limit = $obj.faction_lv_limit;
            this.wait_time = $obj.wait_time;
            this.time = $obj.time;
            this.token_cost = $obj.token_cost;
            this.difficult = $obj.difficult;
            this.all_rewards = new Array;
            makeArray($obj.all_rewards, this.all_rewards);
        }

        public static get_TB_faction_bossById($id: number): TB_faction_boss {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_boss, $id)
            var $vo: TB_faction_boss = new TB_faction_boss($obj)
            return $vo
        }

        public static get_TB_faction_boss(): Array<TB_faction_boss> {
            var $arr: Array<TB_faction_boss> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_boss)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_faction_boss = new TB_faction_boss($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_faction_boss_reward {
        public id: number;
        public monster_id: number;
        public rank: Array<number>;
        public reward: Array<Array<number>>;
        public fail_reward: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.monster_id = $obj.monster_id;
            this.rank = new Array;
            makeArray($obj.rank, this.rank);
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.fail_reward = new Array;
            makeArray($obj.fail_reward, this.fail_reward);
        }

        public static get_TB_faction_boss_rewardById($id: number): TB_faction_boss_reward {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_boss_reward, $id)
            var $vo: TB_faction_boss_reward = new TB_faction_boss_reward($obj)
            return $vo
        }

        public static get_TB_faction_boss_reward(): Array<TB_faction_boss_reward> {
            var $arr: Array<TB_faction_boss_reward> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_boss_reward)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_faction_boss_reward = new TB_faction_boss_reward($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_faction_building_base {

        public id: number;
        public zhiwei_limit: Array<number>;
        public speedup_cost: Array<Array<number>>;
        public speedup_time: number;
        public speedup_limit: number;
        public speedup_donate: number;



        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.zhiwei_limit = new Array;
            makeArray($obj.zhiwei_limit, this.zhiwei_limit);
            this.speedup_cost = new Array;
            makeArray($obj.speedup_cost, this.speedup_cost);
            this.speedup_time = $obj.speedup_time;
            this.speedup_limit = $obj.speedup_limit;
            this.speedup_donate = $obj.speedup_donate;
        }

        public static get_TB_faction_building_baseById($id: number): TB_faction_building_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_building_base, $id)
            var $vo: TB_faction_building_base = new TB_faction_building_base($obj)
            return $vo
        }

        public static get_TB_faction_building_base(): Array<TB_faction_building_base> {
            var $arr: Array<TB_faction_building_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_building_base)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_faction_building_base = new TB_faction_building_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_faction_building {
        public id: number;
        public type: number;
        public level: number;
        public name: string;
        public unlock: number;
        public need_buildinglv: Array<number>;
        public cost: number;
        public time: number;
        public can_lvup: number;
        public desc: Array<string>;
        public params: Array<number>;
        public goto: number;
        public goto_sub: Array<number>;
        public icon: number;
        public pos: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.level = $obj.level;
            this.name = $obj.name;
            this.unlock = $obj.unlock;
            this.need_buildinglv = new Array;
            makeArray($obj.need_buildinglv, this.need_buildinglv);
            this.cost = $obj.cost;
            this.time = $obj.time;
            this.can_lvup = $obj.can_lvup;
            this.desc = new Array;
            makeArray($obj.desc, this.desc);
            this.params = new Array;
            makeArray($obj.params, this.params);
            this.goto = $obj.goto;
            this.icon = $obj.icon;
            this.goto_sub = new Array;
            makeArray($obj.goto_sub, this.goto_sub);
            this.pos = new Array;
            makeArray($obj.pos, this.pos);
        }

        public static get_TB_faction_buildingById($id: number): TB_faction_building {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_building, $id)
            var $vo: TB_faction_building = new TB_faction_building($obj)
            return $vo
        }

        public static get_TB_faction_building(): Array<TB_faction_building> {
            var $arr: Array<TB_faction_building> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_building)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_faction_building = new TB_faction_building($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_faction_gift {
        public id: number;
        public point: number;
        public reward: Array<Array<number>>;
        public ex_reward: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.point = $obj.point;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
            this.ex_reward = new Array;
            makeArray($obj.ex_reward, this.ex_reward);
        }

        public static get_TB_faction_giftById($id: number): TB_faction_gift {
            var $obj: any = TableData.getInstance().getData(TableData.tb_faction_gift, $id)
            var $vo: TB_faction_gift = new TB_faction_gift($obj)
            return $vo
        }

        public static get_TB_faction_gift(): Array<TB_faction_gift> {
            var $arr: Array<TB_faction_gift> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_faction_gift)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_faction_gift = new TB_faction_gift($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_talisman_base {
        public id: number;
        public name: string;
        public quality: number;
        public model: string;
        public icon: string;
        public passiveskill: Array<Array<number>>;
        public avtivetype: number;
        public avtivedata: Array<Array<number>>;
        public props: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.quality = $obj.quality;
            this.model = $obj.model;
            this.icon = $obj.icon;
            this.avtivetype = $obj.avtivetype;
            this.passiveskill = new Array;
            makeArray($obj.passiveskill, this.passiveskill);
            this.avtivedata = new Array;
            makeArray($obj.avtivedata, this.avtivedata);
            this.props = new Array;
            makeArray($obj.props, this.props);
        }

        public static get_TB_talisman_baseById($id: number): TB_talisman_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_talisman_base, $id)
            var $vo: TB_talisman_base = new TB_talisman_base($obj)
            return $vo
        }

        public static get_TB_talisman_base(): Array<TB_talisman_base> {
            var $arr: Array<TB_talisman_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_talisman_base)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_talisman_base = new TB_talisman_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_mount_raise_level {
        public id: number;
        public cost: Array<Array<number>>;
        public prosKeys: Array<number>;
        public prosValues: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.prosKeys = new Array;
            makeArray($obj.prosKeys, this.prosKeys);
            this.prosValues = new Array;
            makeArray($obj.prosValues, this.prosValues);
        }

        public static get_TB_mount_raise_levelById($id: number): TB_mount_raise_level {
            var $obj: any = TableData.getInstance().getData(TableData.tb_mount_raise_level, $id)
            var $vo: TB_mount_raise_level = new TB_mount_raise_level($obj)
            return $vo
        }

        public static get_TB_mount_raise_level(): Array<TB_mount_raise_level> {
            var $arr: Array<TB_mount_raise_level> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_mount_raise_level)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_mount_raise_level = new TB_mount_raise_level($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_talisman_spirit {
        public id: number;
        public talisman_id: number;
        public level: number;
        public attr_id: Array<number>;
        public attr_value: Array<number>;
        public item_cost: Array<Array<number>>;
        public money_cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.talisman_id = $obj.talisman_id;
            this.level = $obj.level;
            this.attr_id = new Array;
            makeArray($obj.attr_id, this.attr_id);
            this.attr_value = new Array;
            makeArray($obj.attr_value, this.attr_value);
            this.item_cost = new Array;
            makeArray($obj.item_cost, this.item_cost);
            this.money_cost = new Array;
            makeArray($obj.money_cost, this.money_cost);
        }

        public static get_TB_talisman_spiritById($index: number, $lev: number): TB_talisman_spirit {
            var $id = $index * 1000 + $lev;
            var $obj: any = TableData.getInstance().getData(TableData.tb_talisman_spirit, $id)
            var $vo: TB_talisman_spirit = new TB_talisman_spirit($obj)
            return $vo
        }

        public static get_TB_talisman_spirit(): Array<TB_talisman_spirit> {
            var $arr: Array<TB_talisman_spirit> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_talisman_spirit)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_talisman_spirit = new TB_talisman_spirit($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }

        public static get_TB_talisman_spiritByIdArray($id: number): Array<TB_talisman_spirit> {
            var $arr: Array<TB_talisman_spirit> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_talisman_spirit)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_talisman_spirit = new TB_talisman_spirit($obj.data[$key])
                if ($id == $vo.talisman_id) {
                    $arr.push($vo)
                }
            }
            return $arr
        }
    }


    export class TB_equipdevelop_strength {
        public id: number;
        public part: number;
        public level: number;
        public props: Array<Array<number>>;
        public props0: Array<Array<number>>;
        public props1: Array<Array<number>>;
        public props2: Array<Array<number>>;
        public cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.part = $obj.part;
            this.level = $obj.level;
            this.props0 = new Array;
            makeArray($obj.props0, this.props0);
            this.props1 = new Array;
            makeArray($obj.props1, this.props1);
            this.props2 = new Array;
            makeArray($obj.props2, this.props2);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }

        public refrishById($id: number): void {
            var $v: number = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.props = this.props0;
            }
            if ($v == 1) {
                this.props = this.props1;
            }
            if ($v == 2) {
                this.props = this.props2;
            }
        }

        public static get_TB_equipdevelop_strengthById($partid: number, $partlev: number): TB_equipdevelop_strength {
            var $id = $partid * 1000 + $partlev;
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_strength, $id)
            var $vo: TB_equipdevelop_strength = new TB_equipdevelop_strength($obj)
            $vo.refrishById(GuidData.player.getCharType());
            return $vo
        }

        public static get_TB_equipdevelop_strength(): Array<TB_equipdevelop_strength> {
            var $arr: Array<TB_equipdevelop_strength> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_strength)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_strength = new TB_equipdevelop_strength($obj.data[$key])
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_equipdevelop_refine {
        public id: number;
        public part: number;
        public rank: number;
        public star: number;
        public lvup_type: number;
        public props: Array<Array<number>>;
        public props0: Array<Array<number>>;
        public props1: Array<Array<number>>;
        public props2: Array<Array<number>>;
        public chance: number;
        public cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.part = $obj.part;
            this.rank = $obj.rank;
            this.star = $obj.star;
            this.lvup_type = $obj.lvup_type;
            this.chance = $obj.chance;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.props0 = new Array;
            makeArray($obj.props0, this.props0);
            this.props1 = new Array;
            makeArray($obj.props1, this.props1);
            this.props2 = new Array;
            makeArray($obj.props2, this.props2);
        }

        public refrishById($id: number): void {
            var $v: number = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.props = this.props0;
            }
            if ($v == 1) {
                this.props = this.props1;
            }
            if ($v == 2) {
                this.props = this.props2;
            }
        }

        public static get_TB_equipdevelop_refineById($partid: number, $lev: number, $star: number): TB_equipdevelop_refine {
            var $id = $partid * 10000 + $lev * 100 + $star
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_refine, $id)
            var $vo: TB_equipdevelop_refine = new TB_equipdevelop_refine($obj)
            $vo.refrishById(GuidData.player.getCharType());
            return $vo
        }

        public static get_TB_equipdevelop_refine(): Array<TB_equipdevelop_refine> {
            var $arr: Array<TB_equipdevelop_refine> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_refine)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_refine = new TB_equipdevelop_refine($obj.data[$key])
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo)
            }
            return $arr
        }

    }


    export class TB_equipdevelop_gem_part {
        public id: number;
        public gem_array: Array<number>;
        public unlock_strength_lv: Array<number>;
        public unlock_refine_lv: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.gem_array = new Array;
            makeArray($obj.gem_array, this.gem_array);
            this.unlock_strength_lv = new Array;
            makeArray($obj.unlock_strength_lv, this.unlock_strength_lv);
            this.unlock_refine_lv = new Array;
            makeArray($obj.unlock_refine_lv, this.unlock_refine_lv);
        }

        public static get_TB_equipdevelop_gem_partById($id: number): TB_equipdevelop_gem_part {
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_gem_part, $id)
            var $vo: TB_equipdevelop_gem_part = new TB_equipdevelop_gem_part($obj)
            return $vo
        }

        public static get_TB_equipdevelop_gem_part(): Array<TB_equipdevelop_gem_part> {
            var $arr: Array<TB_equipdevelop_gem_part> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_gem_part)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_gem_part = new TB_equipdevelop_gem_part($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_equipdevelop_gem {
        public id: number;
        public type: number;
        public level: number;
        public props: Array<Array<number>>;
        public cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.level = $obj.level;
            this.props = new Array;
            makeArray($obj.props, this.props);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }

        public static get_TB_equipdevelop_gemById($gemid: number, $gemlev: number): TB_equipdevelop_gem {
            var $id = $gemid * 1000 + $gemlev
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_gem, $id)
            var $vo: TB_equipdevelop_gem = new TB_equipdevelop_gem($obj)
            return $vo
        }

        public static get_TB_equipdevelop_gem(): Array<TB_equipdevelop_gem> {
            var $arr: Array<TB_equipdevelop_gem> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_gem)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_gem = new TB_equipdevelop_gem($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_equipdevelop_washattrs {
        public id: number;
        public part: number;
        public rare: number;
        public cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.part = $obj.part;
            this.rare = $obj.rare;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }

        public static get_TB_equipdevelop_washattrsById($partid: number, $que: number): TB_equipdevelop_washattrs {
            var $id = $partid * 100 + $que;
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_washattrs, $id)
            var $vo: TB_equipdevelop_washattrs = new TB_equipdevelop_washattrs($obj)
            return $vo
        }

        public static get_TB_equipdevelop_washattrs(): Array<TB_equipdevelop_washattrs> {
            var $arr: Array<TB_equipdevelop_washattrs> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_washattrs)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_washattrs = new TB_equipdevelop_washattrs($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_equipdevelop_bonus {
        public id: number;
        public type: number;
        public level: number;
        public need_lv: Array<number>;
        public props: Array<Array<number>>;
        public props0: Array<Array<number>>;
        public props1: Array<Array<number>>;
        public props2: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.level = $obj.level;
            this.need_lv = new Array;
            makeArray($obj.need_lv, this.need_lv);
            this.props0 = new Array;
            makeArray($obj.props0, this.props0);
            this.props1 = new Array;
            makeArray($obj.props1, this.props1);
            this.props2 = new Array;
            makeArray($obj.props2, this.props2);
        }


        public refrishById($id: number): void {
            var $v: number = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.props = this.props0;
            }
            if ($v == 1) {
                this.props = this.props1;
            }
            if ($v == 2) {
                this.props = this.props2;
            }
        }

        public static get_TB_equipdevelop_bonusById($type: number, $lev: number): TB_equipdevelop_bonus {
            var $id = $type * 100 + $lev;
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_bonus, $id)
            var $vo: TB_equipdevelop_bonus = new TB_equipdevelop_bonus($obj)
            $vo.refrishById(GuidData.player.getCharType());
            return $vo
        }

        public static get_TB_equipdevelop_bonus(): Array<TB_equipdevelop_bonus> {
            var $arr: Array<TB_equipdevelop_bonus> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_bonus)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_bonus = new TB_equipdevelop_bonus($obj.data[$key])
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_equipdevelop_base {
        public id: number;
        public unlocklev: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.unlocklev = $obj.unlocklev;
        }

        public static get_TB_equipdevelop_baseById($id): TB_equipdevelop_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_equipdevelop_base, $id)
            var $vo: TB_equipdevelop_base = new TB_equipdevelop_base($obj)
            return $vo
        }

        public static get_TB_equipdevelop_base(): Array<TB_equipdevelop_base> {
            var $arr: Array<TB_equipdevelop_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_equipdevelop_base)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_equipdevelop_base = new TB_equipdevelop_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_battle_force {
        public id: number;
        public rate: number;
        public rate0: number;
        public rate1: number;
        public rate2: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rate0 = $obj.rate0;
            this.rate1 = $obj.rate1;
            this.rate2 = $obj.rate2;
        }


        public refrishById($id: number): void {
            var $v: number = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.rate = this.rate0;
            }
            if ($v == 1) {
                this.rate = this.rate1;
            }
            if ($v == 2) {
                this.rate = this.rate2;
            }
        }


        public static get_TB_battle_forceById($id: number): TB_battle_force {
            var $obj: any = TableData.getInstance().getData(TableData.tb_battle_force, $id)
            var $vo: TB_battle_force = new TB_battle_force($obj)
            $vo.refrishById(GuidData.player.getCharType());
            return $vo
        }

        public static get_TB_battle_force(): Array<TB_battle_force> {
            var $arr: Array<TB_battle_force> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_battle_force)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_battle_force = new TB_battle_force($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_rename_info {
        public id: number;
        public range: Array<number>;
        public costs: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.range = new Array;
            makeArray($obj.range, this.range);
            this.costs = new Array;
            makeArray($obj.costs, this.costs);
        }

        public static get_TB_rename_infoById($id: number): TB_rename_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_rename_info, $id)
            var $vo: TB_rename_info = new TB_rename_info($obj)
            return $vo
        }

        public static get_TB_rename_info(): Array<TB_rename_info> {
            var $arr: Array<TB_rename_info> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_rename_info)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_rename_info = new TB_rename_info($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_enemy_revenge_buy {
        public id: number;
        public cost: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
        }

        public static get_TB_enemy_revenge_buyById($id: number): TB_enemy_revenge_buy {
            var $obj: any = TableData.getInstance().getData(TableData.tb_enemy_revenge_buy, $id)
            var $vo: TB_enemy_revenge_buy = new TB_enemy_revenge_buy($obj)
            return $vo
        }

        public static get_TB_enemy_revenge_buy(): Array<TB_enemy_revenge_buy> {
            var $arr: Array<TB_enemy_revenge_buy> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_enemy_revenge_buy)
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_enemy_revenge_buy = new TB_enemy_revenge_buy($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_enemy_revenge_base {
        public id: number;
        public daily_revenge_times: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.daily_revenge_times = $obj.daily_revenge_times;
        }

        public static get_TB_enemy_revenge_baseById($id: number): TB_enemy_revenge_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_enemy_revenge_base, $id)
            var $vo: TB_enemy_revenge_base = new TB_enemy_revenge_base($obj)
            return $vo
        }
    }

    export class TB_welfare_base {
        public id: number;
        public lev_info: string;
        public recharge_info: string;
        public expense_info: string;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.lev_info = $obj.lev_info;
            this.recharge_info = $obj.recharge_info;
            this.expense_info = $obj.expense_info;
        }

        public static get_TB_welfare_baseById($id: number): TB_welfare_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_base, $id);
            var $vo: TB_welfare_base = new TB_welfare_base($obj)
            return $vo
        }
    }
    export class TB_welfare_consume {
        public id: number;
        public money: number;
        public item: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.money = $obj.money;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }

        public static get_TB_welfare_consumeById($id: number): TB_welfare_consume {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_consume, $id);
            var $vo: TB_welfare_consume = new TB_welfare_consume($obj)
            return $vo
        }

        public static get_TB_welfare_consume(): Array<TB_welfare_consume> {
            var $arr: Array<TB_welfare_consume> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_consume);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_consume = new TB_welfare_consume($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_welfare_recharge {
        public id: number;
        public money: number;
        public item: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.money = $obj.money;
            this.item = new Array;
            makeArray($obj.item, this.item);
        }

        public static get_TB_welfare_rechargeById($id: number): TB_welfare_recharge {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_recharge, $id);
            var $vo: TB_welfare_recharge = new TB_welfare_recharge($obj)
            return $vo
        }

        public static get_TB_welfare_recharge(): Array<TB_welfare_recharge> {
            var $arr: Array<TB_welfare_recharge> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_recharge);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_recharge = new TB_welfare_recharge($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_welfare_sevengift {
        public id: number;
        public item: Array<Array<number>>;
        public show: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.item = new Array;
            makeArray($obj.item, this.item);
            this.show = $obj.show;
        }

        public static get_TB_welfare_sevengiftById($id: number): TB_welfare_sevengift {
            var $obj: any = TableData.getInstance().getData(TableData.tb_welfare_sevengift, $id);
            var $vo: TB_welfare_sevengift = new TB_welfare_sevengift($obj)
            return $vo
        }

        public static get_TB_welfare_sevengift(): Array<TB_welfare_sevengift> {
            var $arr: Array<TB_welfare_sevengift> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_welfare_sevengift);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_welfare_sevengift = new TB_welfare_sevengift($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_moneytree_base {
        public id: number;
        public cost: Array<Array<number>>;
        public rate: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.rate = $obj.rate;
        }

        public static get_TB_moneytree_baseById($id: number): TB_moneytree_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_moneytree_base, $id);
            var $vo: TB_moneytree_base = new TB_moneytree_base($obj)
            return $vo
        }

        public static get_TB_moneytree_base(): Array<TB_moneytree_base> {
            var $arr: Array<TB_moneytree_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_moneytree_base);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_moneytree_base = new TB_moneytree_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_moneytree_lv {
        public id: number;
        public reward: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.reward = new Array;
            makeArray($obj.reward, this.reward);
        }

        public static get_TB_moneytree_lvById($id: number): TB_moneytree_lv {
            var $obj: any = TableData.getInstance().getData(TableData.tb_moneytree_lv, $id);
            var $vo: TB_moneytree_lv = new TB_moneytree_lv($obj)
            return $vo
        }

        public static get_TB_moneytree_lv(): Array<TB_moneytree_lv> {
            var $arr: Array<TB_moneytree_lv> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_moneytree_lv);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_moneytree_lv = new TB_moneytree_lv($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_moneytree_gift {
        public id: number;
        public rewards: Array<number>;
        public count: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.rewards = new Array;
            makeArray($obj.rewards, this.rewards);
            this.count = $obj.count;
        }

        public static get_TB_moneytree_giftById($id: number): TB_moneytree_gift {
            var $obj: any = TableData.getInstance().getData(TableData.tb_moneytree_gift, $id);
            var $vo: TB_moneytree_gift = new TB_moneytree_gift($obj)
            return $vo
        }

        public static get_TB_moneytree_gift(): Array<TB_moneytree_gift> {
            var $arr: Array<TB_moneytree_gift> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_moneytree_gift);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_moneytree_gift = new TB_moneytree_gift($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }


    export class TB_char_skill {
        public id: number;
        public unlocks: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.unlocks = new Array;
            makeArray($obj.unlocks, this.unlocks);
        }

        public static get_TB_char_skillById($id: number): TB_char_skill {
            var $obj: any = TableData.getInstance().getData(TableData.tb_char_skill, $id);
            var $vo: TB_char_skill = new TB_char_skill($obj)
            return $vo
        }

        public static get_TB_char_skill(): Array<TB_char_skill> {
            var $arr: Array<TB_char_skill> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_char_skill);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_char_skill = new TB_char_skill($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class Tb_buff_effect {
        public id: number;
        public value: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.value = $obj.value;
        }

        public static get_Tb_buff_effectById($id: number): Tb_buff_effect {
            var $obj: any = TableData.getInstance().getData(TableData.tb_buff_effect, $id);
            var $vo: Tb_buff_effect = new Tb_buff_effect($obj)
            return $vo
        }

        public static get_Tb_buff_effect(): Array<Tb_buff_effect> {
            var $arr: Array<Tb_buff_effect> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_buff_effect);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_buff_effect = new Tb_buff_effect($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class Tb_private_boss_info {
        public id: number;
        public mapId: number;
        public bossEntry: number;
        public rebornTime: number;
        public maxTimes: number;
        public permitLevel: number;
        public force: number;
        public show_0: Array<number>;
        public show_1: Array<number>;
        public show_2: Array<number>;
        public show: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.mapId = $obj.mapId;
            this.bossEntry = $obj.bossEntry;
            this.rebornTime = $obj.rebornTime;
            this.maxTimes = $obj.maxTimes;
            this.permitLevel = $obj.permitLevel;
            this.force = $obj.force;

            this.show_0 = new Array;
            makeArray($obj.show_0, this.show_0);
            this.show_1 = new Array;
            makeArray($obj.show_1, this.show_1);
            this.show_2 = new Array;
            makeArray($obj.show_2, this.show_2);
        }

        public refrishById($id: number): void {
            var $v: number = Math.floor(($id - 1) / 2);
            if ($v == 0) {
                this.show = this.show_0;
            }
            if ($v == 1) {
                this.show = this.show_1;
            }
            if ($v == 2) {
                this.show = this.show_2;
            }
        }

        public static get_Tb_private_boss_infoById($id: number): Tb_private_boss_info {
            var $obj: any = TableData.getInstance().getData(TableData.tb_private_boss_info, $id);
            var $vo: Tb_private_boss_info = new Tb_private_boss_info($obj)
            $vo.refrishById(GuidData.player.getCharType());
            return $vo
        }

        public static get_Tb_private_boss_info(): Array<Tb_private_boss_info> {
            var $arr: Array<Tb_private_boss_info> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_private_boss_info);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_private_boss_info = new Tb_private_boss_info($obj.data[$key])
                $vo.refrishById(GuidData.player.getCharType());
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class Tb_private_boss_buff {
        public id: number;
        public force_range_left: number;
        public force_range_right: number;
        public buffeffect_id: number;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.force_range_left = $obj.force_range_left;
            this.force_range_right = $obj.force_range_right;
            this.buffeffect_id = $obj.buffeffect_id;
        }

        public static get_Tb_private_boss_buffById($id: number): Tb_private_boss_buff {
            var $obj: any = TableData.getInstance().getData(TableData.tb_private_boss_buff, $id);
            var $vo: Tb_private_boss_buff = new Tb_private_boss_buff($obj)
            return $vo
        }

        public static get_Tb_private_boss_buff(): Array<Tb_private_boss_buff> {
            var $arr: Array<Tb_private_boss_buff> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_private_boss_buff);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: Tb_private_boss_buff = new Tb_private_boss_buff($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_red_point {
        public id: number;
        public name: string;
        public tip: number;
        public link: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.name = $obj.name;
            this.tip = $obj.tip;
            this.link = new Array;
            makeArray($obj.link, this.link);
        }

        public static get_TB_red_pointById($id: number): TB_red_point {
            var $obj: any = TableData.getInstance().getData(TableData.tb_red_point, $id);
            var $vo: TB_red_point = new TB_red_point($obj)
            return $vo
        }
    }

    export class TB_quest_adventure_base {
        public id: number;
        public quest_id: number;
        public map_id: number;
        public type: number;
        public upres: Array<number>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.type = $obj.type;
            this.quest_id = $obj.quest_id;
            this.map_id = $obj.map_id;

            this.upres = new Array;
            makeArray($obj.upres, this.upres);
        }

        public static get_TB_quest_adventure_baseById($id: number): TB_quest_adventure_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_quest_adventure_base, $id);
            var $vo: TB_quest_adventure_base = new TB_quest_adventure_base($obj)
            return $vo
        }

        public static get_TB_quest_adventure_base(): Array<TB_quest_adventure_base> {
            var $arr: Array<TB_quest_adventure_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_quest_adventure_base);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_quest_adventure_base = new TB_quest_adventure_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }

    export class TB_adventure_skill_base {
        public id: number;
        public line: number;
        public order: number;
        public prev_limit: Array<Array<number>>;
        public cost: Array<Array<number>>;
        public goto: Array<Array<number>>;

        public constructor($obj: any) {
            if (!$obj) {
                traceNoTabelData();
            }
            this.id = $obj.id;
            this.line = $obj.line;
            this.order = $obj.order;

            this.prev_limit = new Array;
            makeArray($obj.prev_limit, this.prev_limit);
            this.cost = new Array;
            makeArray($obj.cost, this.cost);
            this.goto = new Array;
            makeArray($obj.goto, this.goto);
        }

        public static get_TB_adventure_skill_baseById($id: number): TB_adventure_skill_base {
            var $obj: any = TableData.getInstance().getData(TableData.tb_adventure_skill_base, $id);
            var $vo: TB_adventure_skill_base = new TB_adventure_skill_base($obj)
            return $vo
        }

        public static get_TB_quest_adventure_base(): Array<TB_adventure_skill_base> {
            var $arr: Array<TB_adventure_skill_base> = new Array
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_adventure_skill_base);
            // console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                var $vo: TB_adventure_skill_base = new TB_adventure_skill_base($obj.data[$key])
                $arr.push($vo)
            }
            return $arr
        }
    }
}

class ResTabelVo {
    public name: string;
    public field: Array<string>;
    public typs: Array<string>;
    public data: Object;
    public size: number = 0;
    public maxId: number = 0;
    public constructor() {
    }
    public parseTable($name: string, $typs: string, $field: string, $data: string): void {
        this.name = $name;
        this.field = $field.split(",");
        this.typs = $typs.split(",");
        var lines: Array<string> = $data.split(String.fromCharCode(1));

        var tw: number = this.field.length;
        var th: number = lines.length / tw;  //行数
        var id: number = 0;
        this.data = new Object;
        var maxId: number = 0;

        for (var i: number = 0; i < th; i++) {
            //   var $celarr: Array<string> = new Array;

            var obj: any = new Object;
            for (var j: number = 0; j < tw; j++) {
                var $str: string = lines[id]
                //      $celarr.push(tempCell);
                switch (this.typs[j]) {
                    case "int":
                        obj[this.field[j]] = Number($str);
                        break;
                    case "string":
                        obj[this.field[j]] = $str;
                        break;
                    case "array":
                        try {
                            obj[this.field[j]] = JSON.parse($str);
                        }
                        catch (ex) {
                            console.log($name,i,this.field[j], $str)
                            throw new Error("数据表有错");
                        }
              
                        break;
                    default:
                        obj[this.field[j]] = $str;
                        break;
                }
                id++;
            }
            this.data[obj.id] = obj;
            if (obj.id > maxId) {
                maxId = obj.id;
            }
        }

        this.size = th;
        this.maxId = maxId;




    }

    public getDataByID($id: number): Object {
        return this.data[$id];
    }




}
class TableData {
    private static _instance: TableData;
    public static getInstance(): TableData {
        if (!this._instance) {
            this._instance = new TableData();
        }
        return this._instance;
    }

    //   public static BAG: string = "tb_item_template";
    public static tb_creature_template: string = "tb_creature_template";
    public static tb_item_slot: string = "tb_item_slot";
    public static tb_skill_base: string = "tb_skill_base"
    public static tb_skill_uplevel: string = "tb_skill_uplevel"
    public static tb_gameobject_template: string = "tb_gameobject_template"
    public static tb_skill_show: string = "tb_skill_show"
    public static tb_char_skill: string = "tb_char_skill"
    public static tb_anger_limit: string = "tb_anger_limit"
    public static tb_learn_spell: string = "tb_learn_spell"
    public static tb_assistangerspell_upgrade: string = "tb_assistangerspell_upgrade"
    public static tb_mount_illusion: string = "tb_mount_illusion"
    public static tb_mount_base: string = "tb_mount_base"
    public static tb_mount_upgrade: string = "tb_mount_upgrade"
    public static tb_mount_train: string = "tb_mount_train"
    public static tb_item_template: string = "tb_item_template";
    public static tb_strengthen_bless: string = "tb_strengthen_bless";
    public static tb_strengthen_base: string = "tb_strengthen_base";
    public static tb_strengthen_mul: string = "tb_strengthen_mul";
    public static tb_gem_pos: string = "tb_gem_pos";
    public static tb_gem_cost: string = "tb_gem_cost";
    public static tb_gem_icon: string = "tb_gem_icon";
    public static tb_gem_base: string = "tb_gem_base";
    public static tb_gem_mul: string = "tb_gem_mul";
    public static tb_divine_base: string = "tb_divine_base";
    public static tb_divine_streng: string = "tb_divine_streng";
    public static tb_divine_clinet: string = "tb_divine_clinet";
    public static tb_divine_bless: string = "tb_divine_bless";
    public static tb_map_vip: string = "tb_map_vip";
    public static tb_map: string = "tb_map";
    public static tb_map_field_boss_time: string = "tb_map_field_boss_time";
    public static tb_instance_trial: string = "tb_instance_trial";
    public static tb_quest_vip_instance: string = "tb_quest_vip_instance";
    public static tb_hook_quality: string = "tb_hook_quality";
    public static tb_hook_hp_item: string = "tb_hook_hp_item";
    public static tb_store: string = "tb_store";  //商店 银俩
    public static tb_shop: string = "tb_shop";   //商城 元宝
    public static tb_shop_item_relate_id: string = "tb_shop_item_relate_id";   //商城 元宝
    public static tb_shop_base: string = "tb_shop_base";

    public static tb_social_familiay: string = "tb_social_familiay";
    public static tb_social_shop: string = "tb_social_shop";
    public static tb_msg_text_type: string = "tb_msg_text_type";

    public static tb_map_field_boss: string = "tb_map_field_boss";
    public static tb_world_map: string = "tb_world_map";

    public static tb_faction_icon: string = "tb_faction_icon";
    public static tb_faction_creat: string = "tb_faction_creat";
    public static tb_faction_base: string = "tb_faction_base";
    public static tb_faction_zhiwei: string = "tb_faction_zhiwei";
    public static tb_faction_donation: string = "tb_faction_donation";
    public static tb_faction_shop: string = "tb_faction_shop";
    public static tb_map_object: string = "tb_map_object";
    public static tb_map_navigation: string = "tb_map_navigation";
    public static tb_worldboss_base: string = "tb_worldboss_base";
    public static tb_worldboss_rank_reward: string = "tb_worldboss_rank_reward";
    public static tb_worldboss_time: string = "tb_worldboss_time";
    public static tb_instance_res: string = "tb_instance_res";
    public static tb_vip_base: string = "tb_vip_base";
    public static tb_rank_reward: string = "tb_rank_reward";
    public static tb_msg: string = "tb_msg";
    public static tb_social_num: string = "tb_social_num";
    public static tb_activity_base: string = "tb_activity_base";
    public static tb_activity_reward: string = "tb_activity_reward";
    public static tb_quest: string = "tb_quest";
    public static tb_achieve_base: string = "tb_achieve_base";
    public static tb_achieve_progress: string = "tb_achieve_progress";
    public static tb_activity_time: string = "tb_activity_time";
    public static tb_activity_lottery_base: string = "tb_activity_lottery_base";
    public static tb_activity_lottery_high: string = "tb_activity_lottery_high";
    public static tb_activity_lottery_middle: string = "tb_activity_lottery_middle";
    public static tb_activity_lottery_low: string = "tb_activity_lottery_low";
    public static tb_activity_rank_base: string = "tb_activity_rank_base";
    public static tb_activity_rank_process_reward: string = "tb_activity_rank_process_reward";
    public static tb_activity_rank_rank_reward: string = "tb_activity_rank_rank_reward";
    public static tb_activity_limit_gift_base: string = "tb_activity_limit_gift_base";
    public static tb_activity_daily_gift_base: string = "tb_activity_daily_gift_base";
    public static tb_activity_limit_gift: string = "tb_activity_limit_gift";
    public static tb_activity_daily_gift: string = "tb_activity_daily_gift";
    public static tb_title_base: string = "tb_title_base";
    public static tb_shop_chongzhi: string = "tb_shop_chongzhi";
    public static tb_creature_dialogue: string = "tb_creature_dialogue";
    public static tb_quest_chapter: string = "tb_quest_chapter";
    public static tb_welfare_shouchong: string = "tb_welfare_shouchong";
    public static tb_welfare_checkin: string = "tb_welfare_checkin";
    public static tb_welfare_checkin_all: string = "tb_welfare_checkin_all";
    public static tb_welfare_level: string = "tb_welfare_level";
    public static tb_welfare_back: string = "tb_welfare_back";
    public static tb_welfare_level_show: string = "tb_welfare_level_show";
    public static tb_kuafu3v3_base: string = "tb_kuafu3v3_base";
    public static tb_kuafu3v3_month_reward: string = "tb_kuafu3v3_month_reward";
    public static tb_kuafu3v3_day_reward: string = "tb_kuafu3v3_day_reward";
    public static tb_kuafu3v3_week_reward: string = "tb_kuafu3v3_week_reward";

    public static tb_kuafu_xianfu_base: string = "tb_kuafu_xianfu_base";
    public static tb_kuafu_xianfu_condition: string = "tb_kuafu_xianfu_condition";
    public static tb_doujiantai_first: string = "tb_doujiantai_first";
    public static tb_doujiantai_day: string = "tb_doujiantai_day";
    public static tb_doujiantai_combat_win: string = "tb_doujiantai_combat_win";
    public static tb_doujiantai_base: string = "tb_doujiantai_base";
    public static tb_map_jump_point_detail: string = "tb_map_jump_point_detail";
    public static tb_quest_daily_base: string = "tb_quest_daily_base";

    public static tb_quest_daily2_base: string = "tb_quest_daily2_base";
    public static tb_quest_daily2: string = "tb_quest_daily2";
    public static tb_quest_daily2_set: string = "tb_quest_daily2_set";
    public static tb_system_preview: string = "tb_system_preview";
    public static tb_quest_daily2_finish_reward: string = "tb_quest_daily2_finish_reward";
    public static tb_system_base: string = "tb_system_base";
    public static tb_item_quality_color: string = "tb_item_quality_color";
    public static tb_system_icon: string = "tb_system_icon";

    public static tb_bianqiang_sub: string = "tb_bianqiang_sub";
    public static tb_bianqiang_value: string = "tb_bianqiang_value";
    public static tb_bianqiang_rank: string = "tb_bianqiang_rank";

    public static tb_system_guide: string = "tb_system_guide";

    public static tb_xiulianchang_base: string = "tb_xiulianchang_base";
    public static tb_xiulianchang_vip: string = "tb_xiulianchang_vip";
    public static tb_xiulianchang_reward: string = "tb_xiulianchang_reward";
    public static tb_char_level: string = "tb_char_level";
    public static tb_item_illusion: string = "tb_item_illusion";
    public static tb_login_activity_preview: string = "tb_login_activity_preview";
    public static tb_login_activity_reward: string = "tb_login_activity_reward";
    public static tb_worldboss_roll: string = "tb_worldboss_roll";
    public static tb_faction_boss: string = "tb_faction_boss";
    public static tb_faction_boss_reward: string = "tb_faction_boss_reward";
    public static tb_faction_gift_rank_reward: string = "tb_faction_gift_rank_reward";

    public static tb_risk_data: string = "tb_risk_data";
    public static tb_risk_base: string = "tb_risk_base";
    public static tb_risk_chapter: string = "tb_risk_chapter";
    public static tb_risk_menu: string = "tb_risk_menu";

    public static tb_faction_building_base: string = "tb_faction_building_base";
    public static tb_faction_building: string = "tb_faction_building";
    public static tb_faction_gift: string = "tb_faction_gift";
    public static tb_faction_privilege: string = "tb_faction_privilege";
    public static tb_talisman_base: string = "tb_talisman_base";
    public static tb_talisman_spirit: string = "tb_talisman_spirit";

    public static tb_mass_boss_info: string = "tb_mass_boss_info";
    public static tb_mass_boss_base: string = "tb_mass_boss_base";
    public static tb_mass_boss_times: string = "tb_mass_boss_times";

    public static tb_wings_bless: string = "tb_wings_bless";
    public static tb_wings_base: string = "tb_wings_base";
    public static tb_wings_strength: string = "tb_wings_strength";

    public static tb_group_instance_base: string = "tb_group_instance_base";
    public static tb_group_instance_buy: string = "tb_group_instance_buy";

    public static tb_meridian_info: string = "tb_meridian_info";
    public static tb_meridian_source: string = "tb_meridian_source";
    public static tb_mount_raise_level: string = "tb_mount_raise_level";

    public static tb_meridian_item: string = "tb_meridian_item";

    public static tb_faction_bossdefense_pool: string = "tb_faction_bossdefense_pool";
    public static tb_faction_bossdefense_point: string = "tb_faction_bossdefense_point";
    public static tb_faction_bossdefense_base: string = "tb_faction_bossdefense_base";
    public static tb_faction_tower_base: string = "tb_faction_tower_base";
    public static tb_faction_tower_floor: string = "tb_faction_tower_floor";

    public static tb_single_pvp_base: string = "tb_single_pvp_base";
    public static tb_single_pvp_extra: string = "tb_single_pvp_extra";
    public static tb_single_pvp_grade: string = "tb_single_pvp_grade";

    public static tb_single_pvp_times: string = "tb_single_pvp_times";

    public static tb_buff_effect: string = "tb_buff_effect";

    public static tb_equipdevelop_strength: string = "tb_equipdevelop_strength";
    public static tb_equipdevelop_refine: string = "tb_equipdevelop_refine";
    public static tb_equipdevelop_gem_part: string = "tb_equipdevelop_gem_part";
    public static tb_equipdevelop_gem: string = "tb_equipdevelop_gem";
    public static tb_equipdevelop_washattrs: string = "tb_equipdevelop_washattrs";
    public static tb_equipdevelop_bonus: string = "tb_equipdevelop_bonus";

    public static tb_faction_skill_base: string = "tb_faction_skill_base";
    public static tb_faction_skill_building: string = "tb_faction_skill_building";
    public static tb_faction_skill_lvup: string = "tb_faction_skill_lvup";


    public static tb_appearance_info: string = "tb_appearance_info";
    public static tb_appearance_pokedex: string = "tb_appearance_pokedex";

    public static tb_char_info: string = "tb_char_info";
    public static tb_battle_force: string = "tb_battle_force";
    public static tb_equipdevelop_base: string = "tb_equipdevelop_base";
    public static tb_rename_info: string = "tb_rename_info";
    public static tb_enemy_revenge_base: string = "tb_enemy_revenge_base";
    public static tb_enemy_revenge_buy: string = "tb_enemy_revenge_buy";

    public static tb_red_point: string = "tb_red_point";
    public static tb_welfare_base: string = "tb_welfare_base";
    public static tb_welfare_consume: string = "tb_welfare_consume";
    public static tb_welfare_recharge: string = "tb_welfare_recharge";
    public static tb_welfare_sevengift: string = "tb_welfare_sevengift";

    public static tb_moneytree_base: string = "tb_moneytree_base";
    public static tb_moneytree_lv: string = "tb_moneytree_lv";
    public static tb_moneytree_gift: string = "tb_moneytree_gift";
    public static tb_creature_worldrisk: string = "tb_creature_worldrisk";
    public static tb_private_boss_info: string = "tb_private_boss_info";
    public static tb_private_boss_buff: string = "tb_private_boss_buff";

    public static tb_restore_potion_base: string = "tb_restore_potion_base";
    public static tb_item_output: string = "tb_item_output";
    public static tb_quest_adventure_base: string = "tb_quest_adventure_base";
    public static tb_adventure_skill_base: string = "tb_adventure_skill_base";
    public static tb_equip_suit_base: string = "tb_equip_suit_base";
    public static tb_equip_suit_effect: string = "tb_equip_suit_effect";
    public static tb_achieve_page: string = "tb_achieve_page";
    public static tb_realmbreak_dailyquest_base: string = "tb_realmbreak_dailyquest_base";
    public static tb_realmbreak_base: string = "tb_realmbreak_base";
    
    public constructor() {
        this.tb = new Object;
    }


    public loadGameData($fun: Function = null, $progessFun: Function = null): void {
        var configUrl: string = Scene_data.fileRoot + "data/scene.txt";
        var tbUrl: string = Scene_data.fileRoot + "data/tb.txt";

        var configComplete: boolean = false;
        var tbComplte: boolean = false;

        var loadFun: Function = () => {
            if (configComplete && tbComplte) {
                $fun();
            }
        }
        LoadManager.getInstance().load(configUrl, LoadManager.XML_TYPE, ($str: any) => {
            SceneRes.sceneConfigData = JSON.parse($str);
            configComplete = true;
            loadFun();
        })

        LoadManager.getInstance().load(tbUrl, LoadManager.XML_TYPE, ($str: any) => {
            this.parseLineByStr($str)
            tbComplte = true;
            loadFun();
        }, null, $progessFun);


    }

    public loadZipGameData($fun: Function = null, $progessFun: Function = null): void {
        var tbUrl: string = Scene_data.fileRoot + "data/tb.zip.txt" + "?v=" + GameStart.appVersion;

        LoadManager.getInstance().load(tbUrl, LoadManager.BYTE_TYPE, ($buf: ArrayBuffer) => {
            var byte: ByteArray = new ByteArray($buf);
            var zipLength: number = byte.readInt();
            var zipBuf: ArrayBuffer = $buf.slice(4, 4 + zipLength);
            byte.position += zipLength;
            var sceneLenght: number = byte.readInt();
            var str: string = byte.readUTFBytes(sceneLenght);
            SceneRes.sceneConfigData = JSON.parse(str);
            //console.log(this.sceneConfigData);

            zipBuf = unZip(zipBuf);
            byte = new ByteArray(zipBuf);

            //var t:number = TimeUtil.getTimer();
            str = byte.readUTFBytes(byte.length);
            //console.log(TimeUtil.getTimer() - t);
            this.parseLineByStr(str);

            //console.log(TimeUtil.getTimer() - t);

            
            $fun();

        }, null, $progessFun);


    }






    public loadTbDataByName($tbName: string, $fun: Function = null): void {
        var $url: string = Scene_data.fileRoot + "data/" + $tbName + ".txt";
        LoadManager.getInstance().load($url, LoadManager.XML_TYPE, ($str: any) => {
            this.parseLineByStr($str)
            if ($fun) {
                $fun()
            }
        });
    }
    private loadTbItemByArr($item: Array<string>, $fun: Function): void {
        if ($item.length > 0) {
            var $url: string = Scene_data.fileRoot + "data/" + $item.pop() + ".txt";
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE, ($str: any) => {
                this.parseLineByStr($str);
                this.loadTbItemByArr($item, $fun);
            });
        } else {
            $fun();
        }
    }
    public tb: Object;
    private parseLineByStr($str: string): void {

        var lines: Array<string> = $str.split(String.fromCharCode(13));
        var loop: number = lines.length / 4;
        for (var i: number = 0; i < loop; ++i) {
            var $name: string = lines[i * 4 + 0];
            var $field: string = lines[i * 4 + 1];
            var $typs: string = lines[i * 4 + 2];
            var $data: string = lines[i * 4 + 3];
            var vo: ResTabelVo = new ResTabelVo();
            vo.parseTable($name, $typs, $field, $data);
          //   console.log("表", $name);
            // if ($name == TableData.tb_skill_uplevel) {
            //        console.log("表", $name);
            // }

            this.tb[$name] = vo;
        }

        this.processExtData();
        //console.log("parse table data Over");
    }

    public getData($tbName: string, $id: number): Object {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].getDataByID($id);
        }
        return null;
    }

    public getTabSize($tbName: string): number {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].size;
        }
        return 0;
    }
    public getTabMaxID($tbName: string): number {
        if (this.tb[$tbName]) {
            return this.tb[$tbName].maxId;
        }
        return 0;
    }
    public getTableByName($tbName: string): any {
        if (this.tb[$tbName]) {
            return this.tb[$tbName]
        }
        return null;
    }

    public processExtData():void{
        var dic:Object = this.tb[TableData.tb_risk_data].data;
        for(var key in dic){
            var item:any = dic[key];
            if(dic[item.nextId]){
                dic[item.nextId].parentid = item.id;
            }
        }
    }




}