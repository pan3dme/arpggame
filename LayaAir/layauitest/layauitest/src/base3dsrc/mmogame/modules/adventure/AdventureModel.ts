module adventure {

    export class AdventureModel  {
        private static _instance: AdventureModel;
        public static getInstance(): AdventureModel {
            if (!this._instance) {
                this._instance = new AdventureModel();
            }
            return this._instance;
        }
        public constructor() {
            this.initData();
        }
        private initData(): void
        {

        }
        public getPlayCurId(): number
        {
            var $playCur:number=0
            var $id: number = GuidData.player.getPlayerIntFieldTrialFinishedSectionid();
            if ($id == 0) {
                $playCur = tb.TB_risk_base.get_TB_risk_base(1).firstSection;
            } else {
                var $tb: tb.TB_risk_data= tb.TB_risk_data.get_TB_risk_data($id)
                if ($tb.nextId > 0) {
                    $playCur = $tb.nextId;
                } else {
                    $playCur = $tb.id;
                }
            }
            return $playCur
    
        }
        public getCurTb(): tb.TB_risk_data {
            return tb.TB_risk_data.get_TB_risk_data(this.getPlayCurId());
        }
        public getCurBossTb(): tb.TB_risk_data {
            return tb.TB_risk_data.get_TB_risk_data(this.getPlayCurId() + 1000000);
        }
    }
}