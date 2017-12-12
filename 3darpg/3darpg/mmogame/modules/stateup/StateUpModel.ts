module stateup {
    export class TaskCell {
        public tb_quest: tb.TB_quest;
        public qusdata: QuestDataVo;
    }

    export class StateUpModel {
        public constructor() {

        }
        private static _instance: StateUpModel;
        public static getInstance(): StateUpModel {
            if (!this._instance) {
                this._instance = new StateUpModel();
            }
            return this._instance;
        }

        private _taskAry: Array<TaskCell>
        public getTaskAry(): Array<TaskCell> {
            if (!this._taskAry) {
                this.refreshTaskAry();
            }
            return this._taskAry;
        }

        private setTaskAry(): Array<TaskCell> {
            var ary: Array<TaskCell> = new Array
            var $arr: Array<QuestDataVo> = GuidData.quest.getStateUpTaskList();
            for (let i = 0; i < $arr.length; i++) {
                var vo: TaskCell = new TaskCell;
                vo.qusdata = $arr[i];
                vo.tb_quest = tb.TB_quest.getTbById(vo.qusdata.id);
                ary.push(vo);
            }
            return ary;
        }

        public refreshTaskAry() {
            this._taskAry = this.setTaskAry();
        }

        public getRecommend(): any {
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_realmbreak_base);
            var lengstr: string;
            console.log("基本数据", $obj)
            for (var $key in $obj.data) {
                lengstr = $key;
            }

            for (var i = Number(lengstr); i >= 0; i--) {
                if ($obj.data[String(i)]["level"] <= GuidData.player.getLevel()) {
                    return $obj.data[String(i)];
                }
            }
            return null;

        }
    }
}