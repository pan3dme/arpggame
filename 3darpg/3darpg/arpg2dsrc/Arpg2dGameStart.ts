class Arpg2dGameStart extends GameStart {
    public init(): void {

        super.init();
        var $show: boolean = true
        if ($show) {
            this.configNetRoot()
            scene2d.Engine2d.init(); //初始2D引擎
            SceneManager._instance = new Arpg2dGameManeger();//更换场景管理
            Arpg2dAstarUtil.getInstance().initAstarFun()
            quest.QuestModel.getInstance().meshQuestTargets = this.meshQuestTargets;
            Scene_data.cam3D.update = this.cam3Dupdate;
            msgtip.GuideModel.getInstance().hideGuidePop();
            this.traceLog()
        }
    }
    private configNetRoot(): void {
        if (document.domain.search("h5abc") != -1 || document.domain.search("h5key") != -1) {
            localStorage.setItem("sid", "1001");
            localStorage.setItem("ipurl", "123.56.3.241");
            localStorage.setItem("platformid", "5");
        }
    }
    public meshQuestTargets($taskVo: quest.QuestTaskVo, $temp: Array<number>): void {
        if (GuidData.map.tbMapVo.id == 1007) {
            NetManager.getInstance().protocolos.teleport_map(1008, 1);
        } else {
            NetManager.getInstance().protocolos.teleport_map(1007, 1);
        }
    }
    private traceLog(): void {
        var $str: string = "7013,40,20,0,0,0,7013,33,18,0,0,0,7013,48,22,0,0,0,7013,55,28,0,0,0,7013,62,31,0,0,0,7013,29,17,0,0,0";
        var $item: Array<string> = $str.split(",");
        var $outStr: string = "";
        for (var i: number = 0; i < $item.length / 6; i++) {

            $outStr += $item[i * 6 + 0] + "," + $item[i * 6 + 1] + "," + $item[i * 6 + 2] + ",0,0,0,0,0,0,0,0,0,1,0,0";
        }
        console.log($outStr)
    }
    public cam3Dupdate(): void {

    }




}