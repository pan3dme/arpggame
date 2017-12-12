module training {

    export class TaskVo {
        public tab_quest: tb.TB_quest;
        public tab_adventure: tb.TB_quest_adventure_base;
        public questData: QuestDataVo;//此对象不存在时，表示此任务未开启。
    }

    export class TrainingModel {
        public constructor() {

        }
        private static _instance: TrainingModel;
        public static getInstance(): TrainingModel {
            if (!this._instance) {
                this._instance = new TrainingModel();
            }
            return this._instance;
        }

        /**
         * 任务列表
         * @param  
         */
        private tasklist: Array<TaskVo>
        public getTaskvo(): Array<TaskVo> {
            if (!this.tasklist) {
                this.tasklist = this.getTaskAry();
                this.refreshTaskAry();
            }
            return this.tasklist;
        }

        public refreshTaskAry() {
            for (let i = 0; i < this.tasklist.length; i++) {
                this.tasklist[i].questData = this.hasTrainingVo(this.tasklist[i].tab_adventure.quest_id);
            }
        }

        public getTaskAry(): Array<TaskVo> {
            var finary: Array<TaskVo> = new Array
            var tabary: Array<tb.TB_quest_adventure_base> = tb.TB_quest_adventure_base.get_TB_quest_adventure_base();
            for (var i = 0; i < tabary.length; i++) {
                var aaa: TaskVo = new TaskVo();
                aaa.tab_adventure = tabary[i];
                aaa.tab_quest = tb.TB_quest.getTbById(tabary[i].quest_id);
                finary.push(aaa);
            }
            return finary;
        }

        private hasTrainingVo($taskid: number): QuestDataVo {
            var $arr: Array<QuestDataVo> = GuidData.quest.getTrainingTaskList();
            for (var i = 0; i < $arr.length; i++) {
                if ($taskid == $arr[i].id) {
                    return $arr[i];
                }
            }
            return null;
        }

        public getprev_limitflag($prev: Array<number>): boolean {
            switch ($prev[0]) {
                case 1:
                    //幻境通关
                    var $tb: tb.TB_risk_data = adventure.AdventureModel.getInstance().getCurTb();
                    return $tb.id > $prev[1];
                case 2:
                    //击杀某只怪
                    return false;
                case 3:
                    //战力达到
                    return GuidData.player.getForce() >= $prev[1];
                case 4:
                    //人物达到等级
                    return GuidData.player.getLevel() >= $prev[1];
                case 5:
                    //翅膀达到
                    var lev: boolean = false
                    var star: boolean = false
                    if (GuidData.grow.getWingIsActive()) {
                        var targetData: any = TableData.getInstance().getData(TableData.tb_wings_bless, GuidData.grow.getWingID());
                        lev = targetData.rank >= $prev[1]
                        star = true;
                        if (targetData.rank == $prev[1]) {
                            star = targetData.star >= $prev[2];
                        }
                    }
                    return lev && star;
                case 6:
                    //坐骑达到
                    var lev: boolean = GuidData.grow.getMountLevel() >= $prev[1]
                    var star: boolean = true;
                    if (GuidData.grow.getMountLevel() == $prev[1]) {
                        star = GuidData.grow.getMountStart() >= $prev[2]
                    }
                    return lev && star;

                default:
                    return false;
            }
        }

        public getprev_limitstr($prev: Array<number>): string {
            switch ($prev[0]) {
                case 1:
                    //幻境通关
                    var $tb: tb.TB_risk_data = tb.TB_risk_data.get_TB_risk_data($prev[1]);
                    return "幻境通关至"+$tb.name + "可升级";
                case 2:
                    //击杀某只怪
                    return "击杀某只怪物";
                case 3:
                    //战力达到
                    return "战力达到"+Snum($prev[1]) +"可升级";
                case 4:
                    //人物达到等级
                    return "人物达到" + $prev[1]+"级可升级";
                case 5:
                    //翅膀达到
                    return "翅膀达到" + $prev[1] +"阶"+ $prev[2] + "星可升级";
                case 6:
                    //坐骑达到
                    return "坐骑达到" + $prev[1] +"阶"+ $prev[2] + "星可升级";

                default:
                    return "";
            }
        }

    }

}