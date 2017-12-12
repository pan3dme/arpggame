module sboss {
    export class MeshBossVo {
        public tb: tb.TB_mass_boss_info
        public state: number;
        public time: number;
        public flag: boolean;
        public targetTime: number = -1;
    }

    export class SbossModel {
        private static _instance: SbossModel;
        public static getInstance(): SbossModel {
            if (!this._instance) {
                this._instance = new SbossModel();
            }
            return this._instance;
        }

        private itemData: Array<SListItemData>;
        public getItemData(): Array<SListItemData> {

            if (!this.itemData) {
                var meshBossItem: Array<MeshBossVo> = this.getMessBossItem()
                this.itemData = new Array;
                for (var i: number = 0; i < meshBossItem.length; i++) {
                    var $vo: SListItemData = new SListItemData();
                    $vo.id = i;
                    $vo.data = meshBossItem[i];
                    this.itemData.push($vo);
                }
            }
            for (var i: number = 0; i < this.itemData.length; i++) {
                var $MeshBossVo: MeshBossVo = this.itemData[i].data;
                var $v: any = GuidData.globelValue.getFieldMassBoss($MeshBossVo.tb.id - 1);
                $MeshBossVo.state = $v.state;
                $MeshBossVo.time = $v.time;
                if ($MeshBossVo.targetTime == -1) {
                    $MeshBossVo.flag = true;
                    $MeshBossVo.targetTime = $MeshBossVo.time;
                }
                if ($MeshBossVo.targetTime != $MeshBossVo.time) {
                    $MeshBossVo.flag = false;
                    $MeshBossVo.targetTime = $MeshBossVo.time;
                }
            }

            return this.itemData

        }
        private getMessBossItem(): Array<MeshBossVo> {
            var $tbItem: Array<tb.TB_mass_boss_info> = tb.TB_mass_boss_info.getItem()
            var $ary: Array<MeshBossVo> = new Array;
            for (var i: number = 0; i < $tbItem.length; i++) {
                var $vo: MeshBossVo = new MeshBossVo();
                $vo.tb = $tbItem[i];
                $ary.push($vo)
            }
            return $ary
        }
        public refrishBossItemData(): void {


        }


        private _pBossItemData: Array<SListItemData>
        public getPersonBossItemData(): Array<SListItemData> {

            if (!this._pBossItemData) {
                this._pBossItemData = new Array;
                var tabary: Array<tb.Tb_private_boss_info> = tb.Tb_private_boss_info.get_Tb_private_boss_info();
                for (var i = 0; i < tabary.length; i++) {
                    var aa: PersonBossVo = new PersonBossVo;
                    aa.tabbossinfo = tabary[i];
                    var $vo: SListItemData = new SListItemData();
                    $vo.id = i;
                    $vo.data = aa;
                    this._pBossItemData.push($vo);
                }
            }

            var timeary: Array<number> = GuidData.instanceData.getPersonbosstime();
            for (var i: number = 0; i < this._pBossItemData.length; i++) {
                var $pBossVo: PersonBossVo = this._pBossItemData[i].data;
                $pBossVo.openstate = $pBossVo.tabbossinfo.permitLevel <= GuidData.player.getLevel();
                $pBossVo.times = timeary[i];
                if ($pBossVo.targetTime == -1) {
                    $pBossVo.flag = true;
                    $pBossVo.targetTime = $pBossVo.times;
                }
                if ($pBossVo.targetTime != $pBossVo.times) {
                    $pBossVo.flag = false;
                    $pBossVo.targetTime = $pBossVo.times;
                }
            }

            return this._pBossItemData;
        }

        // public getMaxIndex(): number {
        //     var aryvo = this.getPersonBossItemData();
        //     for (var i = aryvo.length - 1; i >= 0; i--) {
        //         if (aryvo[i].data.openstate) {
        //             return i;
        //         }
        //     }
        //     return 0;
        // }
    }

    export class PersonBossVo {
        public node: RedPointNode;
        public tabbossinfo: tb.Tb_private_boss_info;
        public times: number;
        public openstate: boolean;//0：未开放  1：已开放
        private _targetTime: number = -1;
        public flag: boolean;

        public set targetTime($val: number) {
            this._targetTime = $val;
        }

        public get targetTime(): number {
            return this._targetTime;
        }
        //回复时间
        public getTime(): string {
            var $massBossCdNum: number = GameInstance.getGameSecond(this.times);
            if ($massBossCdNum > 0) {
                return getScencdStr($massBossCdNum);
            } else {
                return "";
            }
        }
        //当前剩余次数str
        public getTims(): string {
            var tims = this.hasTims();
            var $color: string = tims <= 0 ? ColorType.Redd92200 : ColorType.Brown7a2f21
            return $color + tims + ColorType.Brown7a2f21 + "/" + this.tabbossinfo.maxTimes;
        }

        //当前剩余次数num
        public hasTims(): number {
            var $massBossCdNum: number = GameInstance.getGameSecond(this.times);
            if ($massBossCdNum > 0) {
                var hastimes = this.tabbossinfo.maxTimes - Math.ceil($massBossCdNum / (this.tabbossinfo.rebornTime * 60))
                return hastimes;
            } else {
                return this.tabbossinfo.maxTimes;
            }
        }
    }

}