class Arpg2dGameManeger extends scene2d.Scene2dManager {


    public loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void {
        this.clearStaticScene();
        this.ready = false;

        var $mapid1007: number = GuidData.map.tbMapVo.id;

        if ($mapid1007 == 1001) {
            if (GuidData.player.getLevel() < 100) { 
                GameControlManager.sendGmCom("@Rank " + String(100));
            }
            TimeUtil.addTimeOut(2000, () => {
                NetManager.getInstance().protocolos.teleport_map(1007, 1);
            });
            TimeUtil.addTimeOut(3000, () => {
                var $indexUrl = window.location.toString();
                window.location.href = $indexUrl
            });
            return;
        }

        LoadManager.getInstance().load(Scene_data.fileRoot + get2dMapdataById($mapid1007), LoadManager.XML_TYPE,
            ($dtstr: string) => {
                scene2d.MapConfig.getInstance().anlyData($dtstr);
                AstarUtil.makeStarGraph(scene2d.MapConfig.getInstance().astarItem);
                scene2d.SceneGroundModel.getInstance().initData($mapid1007);
                $analysisCompleteFun();
                this.ready = true
            });
    }

}