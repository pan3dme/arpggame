module selectserver {

    export class SelectServerModel {

        private static _instance: SelectServerModel;
        public static getInstance(): SelectServerModel {
            if (!this._instance) {
                this._instance = new SelectServerModel();
            }
            return this._instance;
        }

        public constructor() {

        }

        public StateKey = ["red", "orange", "green", "gray"];
        // public RoleKey = ["道士", "枪客", "枪客", "剑客", "剑客", "道士", "道士"];

        private _finalAry: Array<ServerAryVo>;
        private _currentVo: ServerVo;
        public convertObj($obj: Array<Object>) {
            console.log("-------$obj---", $obj);
            if (!this._finalAry) {
                this._finalAry = new Array
                // var objary: Array<Array<Object>> = $obj["aaa"];

                
                //已有角色
                var hasserverAryVo: ServerAryVo = new ServerAryVo();
                hasserverAryVo.serverary = new Array;
                hasserverAryVo.tabname = "已有角色"

                // for (var i = 0; i < objary.length; i++) {
                //     var obja: Array<Object> = objary[i];
                var serverAryVo: ServerAryVo;
                for (var k = 0; k < $obj.length; k++) {
                    var element = $obj[k];
                    var serverVo: ServerVo = new ServerVo();
                    serverVo.id = element["id"]
                    serverVo.isnew = element["isnew"]
                    serverVo.name = element["name"]
                    serverVo.state = element["state"]
                    // serverVo.curvo = element["curvo"]//是否为当前选则的服（第一次则为推荐）
                    serverVo.sid = element["sid"]
                    serverVo.pid = element["pid"]
                    serverVo.gate_ip = element["gate_ip"]
                    serverVo.gate_port = element["gate_port"]

                    var elm_rolevo:ServerVo = this.combackVo(serverVo.id);
                    if(elm_rolevo){
                        // var roleVo: RoleVo = new RoleVo();
                        // roleVo.roleid = element["role"]["roleid"]
                        // roleVo.rolelev = element["role"]["rolelev"]
                        // roleVo.rolename = element["role"]["rolename"]
                        // roleVo.roletype = element["role"]["roletype"]
                        serverVo.role = elm_rolevo.role;
                        hasserverAryVo.serverary.push(serverVo);
                    }

                    //每十个一组
                    if(k % 10 == 0){//0-9
                        serverAryVo = new ServerAryVo();
                        serverAryVo.serverary = new Array;
                        this._finalAry.push(serverAryVo);
                    }

                    serverAryVo.serverary.push(serverVo);

                    // if (serverVo.curvo) {
                    //     this._currentVo = serverVo;
                    //     serverAryVo.select = true;
                    // }
                }
                
                // }

                this._finalAry.unshift(hasserverAryVo);

                //默认选中服初始化数据
                for (let n = 0; n < hasserverAryVo.serverary.length; n++) {
                    if(this._listAry[0].id == hasserverAryVo.serverary[n].id){
                        this._currentVo = hasserverAryVo.serverary[n];
                        break;
                    }
                }
                

                //console.log("---最终解析vo----",this._finalAry);
            } else {

            }
        }

        private _listAry: Array<ServerVo>
        private combackVo($id:number):ServerVo{
            if(!this._listAry){
                this._listAry = this.readServerLog();
            }
            for (let i = 0; i < this._listAry.length; i++) {
                if (this._listAry[i].id == $id) {
                    return this._listAry[i];
                }
            }
            return null;
        }

        public readServerLog(): Array<ServerVo> {
            var str: string = localStorage.getItem("loginseverlist");
            if (str) {
                return JSON.parse(str);
            } else {
                return [];
            }
        }

        public writeServerLog(): void {
            if(!this._listAry){
                this._listAry = this.readServerLog();
            }
            for (let i = 0; i < this._listAry.length; i++) {
                if (this._listAry[i].id == GameData.mergeServerMsgVo.id) {
                    if(i == 0){
                        return;
                    }else{
                        this._listAry.splice(i,1);
                    }
                }
            }

            var vo: ServerVo = new ServerVo;
            vo.id = GameData.mergeServerMsgVo.id
            vo.role = new RoleVo;
            vo.role.rolename = GuidData.player.getBaseName();
            vo.role.roletype = GuidData.player.getCharType();
            
            this._listAry.unshift(vo);

            localStorage.setItem("loginseverlist", JSON.stringify(this._listAry));
        }

        public ChgCurVo($vo: ServerVo) {
            this._currentVo = $vo
        }

        //this._currentVo不存在时，代表新玩家
        public hasCurVo():boolean{
            if(this._currentVo){
                return true;
            }
            return false;
        }
        //获得当前服务器
        public getCurVo(): ServerVo {
            if (this._currentVo) {
                return this._currentVo;
            } else {
                var index = this._finalAry[this._finalAry.length - 1].serverary.length;
                return this._finalAry[this._finalAry.length - 1].serverary[index - 1];
            }
        }

        public getFinalList(): Array<ServerAryVo> {
            if (!this._finalAry) {

            } else {
                return this._finalAry;
            }
        }
    }

    export class ServerAryVo {
        public serverary: Array<ServerVo>;
        public tabname: string;
        public select: boolean = false;
    }

    export class ServerVo {
        public id: number;
        public name: string;
        public state: number;
        public isnew: boolean;
        // public curvo: boolean;
        public role: RoleVo;
        public pid: number;
        public sid: number;
        public gate_ip: string;
        public gate_port: number;
        // "id": 1,
        // "name": "九天梦游",
        // "state": 1,
        // "isnew": true,
    }

    export class RoleVo {
        // public roleid: number;
        public rolename: string;
        public rolelev: number;
        public roletype: number;
        // "roleid": 123,
        // "rolename": "hdsao",
        // "rolelev": 100,
        // "roletype": 1
    }
}