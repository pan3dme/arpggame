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

        public StateKey = ["red","orange","green","gray"];
        public RoleKey = ["道士","枪客","枪客","剑客","剑客","道士","道士"];

        private _finalAry: Array<ServerAryVo>;
        private _currentVo:ServerVo;
        public convertObj($obj: Object) {
            if (!this._finalAry) {
                this._finalAry = new Array
                var objary: Array<Array<Object>> = $obj["aaa"];

                //已有角色
                var hasserverAryVo: ServerAryVo = new ServerAryVo();
                hasserverAryVo.serverary = new Array;
                hasserverAryVo.tabname = "已有角色"

                for (var i = 0; i < objary.length; i++) {
                    var obja: Array<Object> = objary[i];
                    var serverAryVo: ServerAryVo = new ServerAryVo();
                    serverAryVo.serverary = new Array;
                    for (var k = 0; k < obja.length; k++) {
                        var element = obja[k];
                        var serverVo: ServerVo = new ServerVo();
                        serverVo.id = element["id"]
                        serverVo.isnew = element["isnew"]
                        serverVo.name = element["name"]
                        serverVo.state = element["state"]
                        serverVo.curvo = element["curvo"]
                        
                        var elm_rolevo = element["role"];
                        if(elm_rolevo){
                            var roleVo: RoleVo = new RoleVo();
                            roleVo.roleid = element["role"]["roleid"]
                            roleVo.rolelev = element["role"]["rolelev"]
                            roleVo.rolename = element["role"]["rolename"]
                            roleVo.roletype = element["role"]["roletype"]
                            serverVo.role = roleVo;
                            hasserverAryVo.serverary.push(serverVo);
                        }
                        
                        if(serverVo.curvo){
                            this._currentVo = serverVo;
                            serverAryVo.select = true;
                        }
                        serverAryVo.serverary.push(serverVo);
                    }
                    this._finalAry.push(serverAryVo);
                }

                this._finalAry.unshift(hasserverAryVo);

                console.log("---最终解析vo----",this._finalAry);
            } else {

            }
        }

        public ChgCurVo($vo:ServerVo){
            this._currentVo = $vo
        }

        //获得当前服务器
        public getCurVo():ServerVo{
            if(this._currentVo){
                return this._currentVo;
            }else{
               var index =  this._finalAry[this._finalAry.length - 1].serverary.length;
               return this._finalAry[this._finalAry.length - 1].serverary[index - 1];
            }
        }

        public getFinalList():Array<ServerAryVo>{
            if(!this._finalAry){
                
            }else{
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
        public curvo: boolean;
        public role: RoleVo;
        // "id": 1,
        // "name": "九天梦游",
        // "state": 1,
        // "isnew": true,
    }

    export class RoleVo {
        public roleid: number;
        public rolename: string;
        public rolelev: number;
        public roletype: number;
        // "roleid": 123,
        // "rolename": "hdsao",
        // "rolelev": 100,
        // "roletype": 1
    }
}