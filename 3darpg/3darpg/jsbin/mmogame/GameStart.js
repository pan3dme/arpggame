var GameStart = /** @class */ (function () {
    function GameStart() {
        this.dataReady = false;
        this.uiReadyNum = 0;
        this.uiAllNum = 0;
    }
    GameStart.prototype.init = function () {
        var _this = this;
        var $baseUiList = new Array;
        $baseUiList.push({ xmlurl: "ui/arpgui/textlist.xml", picurl: "ui/arpgui/textlist.png", name: UIData.textlist });
        $baseUiList.push({ xmlurl: "ui/uidata/public/public.xml", picurl: "ui/uidata/public/public.png", name: UIData.publicUi });
        this.uiAllNum = UIData.init($baseUiList, function () {
            _this.loadAll();
        }, function (num) {
            _this.uiReadyNum = num;
            if (_this.dataReady) {
                FpsStage.getInstance().showLoadInfo("读取UI数据：" + _this.uiReadyNum + "/" + _this.uiAllNum);
            }
        });
        if (GameStart.outNet) {
            TableData.getInstance().loadZipGameData(function () {
                _this.dataReady = true;
                _this.loadAll();
            }, function (num) {
                FpsStage.getInstance().showLoadInfo("读取游戏数据" + float2int(num * 100) + "%");
            });
        }
        else {
            TableData.getInstance().loadGameData(function () {
                _this.dataReady = true;
                _this.loadAll();
            }, function (num) {
                FpsStage.getInstance().showLoadInfo("读取游戏数据" + float2int(num * 100) + "%");
            });
        }
        this.loadDataComplet();
        GameMouseManager.getInstance().addMouseEvent();
    };
    GameStart.prototype.loadAll = function () {
        if (this.uiReadyNum == this.uiAllNum && this.dataReady) {
            //this.loadDataComplet();
            FpsStage.getInstance().showLoadInfo("正在连接服务器");
            GameStart.ready = true;
            RedPointManager.getInstance().init();
            ModuleEventManager.dispatchEvent(new LoginEvent(LoginEvent.LOGIN_ENTER_EVENT));
        }
    };
    GameStart.prototype.loadDataComplet = function () {
        if (GameStart.outNet) {
            //GameStart.GM = false;
        }
        ModuleList.startup(); //启动所有模块
        GameData.needCreatChar = false;
        GameInstance.init();
    };
    /**是否是外网 */
    GameStart.outNet = false;
    GameStart.GM = true;
    GameStart.ready = false;
    GameStart.appVersion = 0;
    return GameStart;
}());
//# sourceMappingURL=GameStart.js.map