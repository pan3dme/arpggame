class Arpg2dGameManeger extends scene2d.Scene2dManager {


    public loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void {
        this.clearStaticScene();
        this.ready = false;

        var $mapid1007: number = GuidData.map.tbMapVo.id;
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