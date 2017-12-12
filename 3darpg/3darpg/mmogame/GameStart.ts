class GameStart {

    /**是否是外网 */
    public static outNet: boolean = false;
    public static GM: boolean = true
    public static ready: boolean = false;
    public dataReady: boolean = false;
    public uiReadyNum: number = 0;
    public uiAllNum: number = 0;
    public static appVersion:number = 0;
    public init(): void {

       var $baseUiList:Array<any>= new Array;
       $baseUiList.push({ xmlurl: "ui/arpgui/textlist.xml", picurl: "ui/arpgui/textlist.png", name: UIData.textlist });
       $baseUiList.push({ xmlurl: "ui/uidata/public/public.xml", picurl: "ui/uidata/public/public.png", name: UIData.publicUi });

       this.uiAllNum = UIData.init($baseUiList,
            () => {
                this.loadAll();
            },
            (num: number) => {
                this.uiReadyNum = num;
                if (this.dataReady) {
                    FpsStage.getInstance().showLoadInfo("读取UI数据：" + this.uiReadyNum + "/" + this.uiAllNum);
                }
            }
        );
        if (GameStart.outNet) {
            TableData.getInstance().loadZipGameData(
                () => {
                    this.dataReady = true;
                    this.loadAll();
                },
                (num: number) => {
                    FpsStage.getInstance().showLoadInfo("读取游戏数据" + float2int(num * 100) + "%");
                });
        } else {
            TableData.getInstance().loadGameData(
                () => {
                    this.dataReady = true;
                    this.loadAll();
                },
                (num: number) => {
                    FpsStage.getInstance().showLoadInfo("读取游戏数据" + float2int(num * 100) + "%");
                });
        }
        
        this.loadDataComplet();

        GameMouseManager.getInstance().addMouseEvent()
    }



    private loadAll(): void {
        if (this.uiReadyNum == this.uiAllNum && this.dataReady) {
            //this.loadDataComplet();
            FpsStage.getInstance().showLoadInfo("正在连接服务器");
            GameStart.ready = true;
            RedPointManager.getInstance().init();
            ModuleEventManager.dispatchEvent(new LoginEvent(LoginEvent.LOGIN_ENTER_EVENT));
        }
    }
    private loadDataComplet(): void {
        if (GameStart.outNet) {
            //GameStart.GM = false;
        }

        ModuleList.startup();//启动所有模块
        GameData.needCreatChar = false
        GameInstance.init();



    }




}