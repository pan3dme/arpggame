class GameStart {

    /**是否是外网 */
    public static outNet: boolean = false;
    public static GM: boolean = true
    public static ready: boolean = false;
    public dataReady: boolean = false;
    public uiReadyNum: number = 0;
    public uiAllNum: number = 0;
    public static appVersion: number = 0;
    public init(): void {
        TextureManager.getInstance().getTexture(Scene_data.fileRoot + "ui/load/001.jpg", ($texture: TextureRes) => {
          
        });
        if (GameStart.outNet) {
            GameStart.GM = false
        }

        var $baseUiList: Array<any> = new Array;

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
        GameMouseManager.getInstance().addMouseEvent()
        this.loadMainUiBase()
 
    }

    private loadMainUiBase(): void {
        var $mainUiList: Array<any> = new Array;
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/left/left.xml", picurl: "ui/uidata/mainui/left/left.png", name: "left", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/right/right.xml", picurl: "ui/uidata/mainui/right/right.png", name: "right", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/top/top.xml", picurl: "ui/uidata/mainui/top/top.png", name: "top", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/bootom/bootom.xml", picurl: "ui/uidata/mainui/bootom/bootom.png", name: "bootom", isTexture: true });

        $mainUiList.push({ xmlurl: "ui/uidata/mainui/fight/fight.xml", picurl: "ui/uidata/mainui/fight/fight.png", name: "fight", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/home/home.xml", picurl: "ui/uidata/mainui/home/home.png", name: "home", isTexture: true });
        $mainUiList.push({ xmlurl: "ui/uidata/mainui/left/leftgroup/leftgroup.xml", picurl: "ui/uidata/mainui/left/leftgroup/leftgroup.png", name: "leftgroup", isTexture: true });

        MainUiLoad.init($mainUiList,
            () => {
                console.log("主UI加载完成")
            },
            (num: number) => {
                console.log("主UI加载进度", num, "/", $mainUiList.length)
            }
        );
    }

    private loadAll(): void {
        if (this.uiReadyNum == this.uiAllNum && this.dataReady) {
            this.loadDataComplet();
            FpsStage.getInstance().showLoadInfo("正在连接服务器");
            GameStart.ready = true;
            RedPointManager.getInstance().init();
            //ModuleEventManager.dispatchEvent(new LoginEvent(LoginEvent.LOGIN_ENTER_EVENT));
        }
    }
    private loadDataComplet(): void {
        if (GameStart.outNet) {
            GameStart.GM = false;
        }

        ModuleList.startup();//启动所有模块
        //console.log("启动所有模块-----------------------------")
        GameData.needCreatChar = false
        if (GameData.userinfo) {
            //GameInstance.init();
            FpsStage.getInstance().removeShowLoad();
            
            var obj: any = GameData.userinfo;
            if(!GameData.mergeServerMsgVo){
                GameData.mergeServerMsgVo = new MergeServerMsgVo();
            }
            if(GameData.sdk == 0){
                GameData.mergeServerMsgVo.userName = String(obj.userid);
            }else if(GameData.sdk == 1){
                GameData.mergeServerMsgVo.userName = String(obj.uid);
            }
            
            ModuleEventManager.dispatchEvent(new selectserver.SelectServerEvent(selectserver.SelectServerEvent.SHOW_JOINGAME_EVENT));
        } else {
            GameInstance.init();
        }


    }




}