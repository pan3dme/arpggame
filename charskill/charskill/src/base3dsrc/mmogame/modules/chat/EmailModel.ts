module email {
    export class EmailVo {
        public giftBaseVo: GiftBaseVo;
    }
    export class EmailModel {
        public static selectInfoIndex: number;

        private static _instance: EmailModel;
        public static getInstance(): EmailModel {
            if (!this._instance) {
                this._instance = new EmailModel();
            }
            return this._instance;
        }
        private _emailItem: Array<EmailVo> = new Array;
        public getEmailArr(): Array<EmailVo> {
            this._emailItem.length = 0
            var $baseList: Array<GiftBaseVo> = GuidData.giftPacks.getGiftDataItem()
            for (var i: number = 0; i < $baseList.length; i++) {
                var $vo: EmailVo = new EmailVo();
                $vo.giftBaseVo = $baseList[i]
                this._emailItem.push($vo)
            }
            return this._emailItem;
        }
        public lastGetEmailTipTime:number=0
        public getHaveNewEmailInfo(): Boolean {
    
            this.getEmailArr();

            var $ts: number = GameInstance.getServerNow();
            if (!this.lastGetEmailTipTime) {
                this.lastGetEmailTipTime = GameInstance.getServerNow();
            }
            var $sever: Date = new Date($ts * 1000);
            for (var i: number = 0; i < this._emailItem.length;i++){
                var $vo: EmailVo = this._emailItem[i];
                if ($vo.giftBaseVo.isRead==false) { //还没读

                    var $t: Date = new Date($vo.giftBaseVo.startTime * 1000);
         
                    if ($vo.giftBaseVo.startTime> this.lastGetEmailTipTime ) {  //
                        return true
                    }
                }
            }
   
            return false
        }
        public getEmailVoByIdex($idex: number): EmailVo {
            for (var i: number = 0; i < this._emailItem.length; i++) {
                if (this._emailItem[i].giftBaseVo.indx == $idex) {

                    return this._emailItem[i]
                }
            }
            return null
        }
        public i_dele_read_clik(): void {
            var $cando: boolean = false
            for (var i: number = 0; i < this._emailItem.length; i++) {
                if (this._emailItem[i].giftBaseVo.isRead && !this._emailItem[i].giftBaseVo.item) {
                    $cando = true
                }
            }
            if ($cando){
                NetManager.getInstance().protocolos.remove_mail_one_step();
            }
        }
        public i_get_item_clik(): void {
            NetManager.getInstance().protocolos.pick_mail_one_step();
        }
    }
} 