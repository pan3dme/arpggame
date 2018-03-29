module Hangup {

    export class HangupSettingModel {
        
        private static _instance: HangupSettingModel;
        public static getInstance(): HangupSettingModel {
            if (!this._instance) {
                this._instance = new HangupSettingModel();
            }
            return this._instance;
        }

        public constructor() {

        }

        private _tb_hook_quality_list:Array<tb.TB_hook_quality_Vo>;
        public  getTb_hook_quality():Array<tb.TB_hook_quality_Vo>{
            //读取tb_mount_base
            if(!this._tb_hook_quality_list){
                this._tb_hook_quality_list = new Array<tb.TB_hook_quality_Vo>();
            }
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_hook_quality);
            for (var $key in $obj.data) {
                var $tb_hook_quality_vo: tb.TB_hook_quality_Vo = new tb.TB_hook_quality_Vo($obj.data[$key])
                this._tb_hook_quality_list.push($tb_hook_quality_vo)
            }

            return this._tb_hook_quality_list;
        }


        private _tb_hook_hp_item_list:Array<tb.TB_hook_hp_item_Vo>;
        public  getTb_hook_hp_item():Array<tb.TB_hook_hp_item_Vo>{
            //读取tb_mount_base
            if(!this._tb_hook_hp_item_list){
                this._tb_hook_hp_item_list = new Array<tb.TB_hook_hp_item_Vo>();
            }
            var $obj: any = TableData.getInstance().getTableByName(TableData.tb_hook_hp_item);
            for (var $key in $obj.data) {
                var $tb_hook_hp_item_vo: tb.TB_hook_hp_item_Vo = new tb.TB_hook_hp_item_Vo($obj.data[$key])
                this._tb_hook_hp_item_list.push($tb_hook_hp_item_vo)
            }
            return this._tb_hook_hp_item_list;
        }
    }

}