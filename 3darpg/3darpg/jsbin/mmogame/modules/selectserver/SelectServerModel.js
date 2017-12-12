var selectserver;
(function (selectserver) {
    var SelectServerModel = /** @class */ (function () {
        function SelectServerModel() {
            this.StateKey = ["red", "orange", "green", "gray"];
            this.RoleKey = ["道士", "枪客", "枪客", "剑客", "剑客", "道士", "道士"];
        }
        SelectServerModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new SelectServerModel();
            }
            return this._instance;
        };
        SelectServerModel.prototype.convertObj = function ($obj) {
            if (!this._finalAry) {
                this._finalAry = new Array;
                var objary = $obj["aaa"];
                //已有角色
                var hasserverAryVo = new ServerAryVo();
                hasserverAryVo.serverary = new Array;
                hasserverAryVo.tabname = "已有角色";
                for (var i = 0; i < objary.length; i++) {
                    var obja = objary[i];
                    var serverAryVo = new ServerAryVo();
                    serverAryVo.serverary = new Array;
                    for (var k = 0; k < obja.length; k++) {
                        var element = obja[k];
                        var serverVo = new ServerVo();
                        serverVo.id = element["id"];
                        serverVo.isnew = element["isnew"];
                        serverVo.name = element["name"];
                        serverVo.state = element["state"];
                        serverVo.curvo = element["curvo"];
                        var elm_rolevo = element["role"];
                        if (elm_rolevo) {
                            var roleVo = new RoleVo();
                            roleVo.roleid = element["role"]["roleid"];
                            roleVo.rolelev = element["role"]["rolelev"];
                            roleVo.rolename = element["role"]["rolename"];
                            roleVo.roletype = element["role"]["roletype"];
                            serverVo.role = roleVo;
                            hasserverAryVo.serverary.push(serverVo);
                        }
                        if (serverVo.curvo) {
                            this._currentVo = serverVo;
                            serverAryVo.select = true;
                        }
                        serverAryVo.serverary.push(serverVo);
                    }
                    this._finalAry.push(serverAryVo);
                }
                this._finalAry.unshift(hasserverAryVo);
                console.log("---最终解析vo----", this._finalAry);
            }
            else {
            }
        };
        SelectServerModel.prototype.ChgCurVo = function ($vo) {
            this._currentVo = $vo;
        };
        //获得当前服务器
        SelectServerModel.prototype.getCurVo = function () {
            if (this._currentVo) {
                return this._currentVo;
            }
            else {
                var index = this._finalAry[this._finalAry.length - 1].serverary.length;
                return this._finalAry[this._finalAry.length - 1].serverary[index - 1];
            }
        };
        SelectServerModel.prototype.getFinalList = function () {
            if (!this._finalAry) {
            }
            else {
                return this._finalAry;
            }
        };
        return SelectServerModel;
    }());
    selectserver.SelectServerModel = SelectServerModel;
    var ServerAryVo = /** @class */ (function () {
        function ServerAryVo() {
            this.select = false;
        }
        return ServerAryVo;
    }());
    selectserver.ServerAryVo = ServerAryVo;
    var ServerVo = /** @class */ (function () {
        function ServerVo() {
        }
        return ServerVo;
    }());
    selectserver.ServerVo = ServerVo;
    var RoleVo = /** @class */ (function () {
        function RoleVo() {
        }
        return RoleVo;
    }());
    selectserver.RoleVo = RoleVo;
})(selectserver || (selectserver = {}));
//# sourceMappingURL=SelectServerModel.js.map