class Arpg2dGameStart extends GameStart {
    public init(): void {

        super.init();
        var $show: boolean = true
        if ($show) {
            scene2d.Engine2d.init(); //初始2D引擎
            SceneManager._instance = new Arpg2dGameManeger();//更换场景管理

            Arpg2dAstarUtil.getInstance().initAstarFun()
            Scene_data.cam3D.update = this.cam3Dupdate;
            document.addEventListener(MouseType.KeyDown, ($evt: KeyboardEvent) => { this.onKeyDown($evt) });
            this.traceLog()
        }
    }
    private traceLog(): void {
        var $str: string = "7013,40,20,0,0,0,7013,33,18,0,0,0,7013,48,22,0,0,0,7013,55,28,0,0,0,7013,62,31,0,0,0,7013,29,17,0,0,0";
        var $item: Array<string> = $str.split(",");
        var $outStr: string = "";
        for (var i: number = 0; i < $item.length/6; i++) {

            $outStr += $item[i * 6 + 0] + "," + $item[i * 6 + 1] + "," + $item[i * 6 + 2]+",0,0,0,0,0,0,0,0,0,1,0,0";
        }
        console.log($outStr)
    }

    public onKeyDown($evt: KeyboardEvent): void {

       
    }
    public cam3Dupdate(): void {
       // scene2d.AppDataArpg.resetSelfPosCenter();
    }

 
 
   
}