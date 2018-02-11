
module scene2d {
    export class Engine2d {
        public static htmlScale: number = 1.0;
        public static init(): void {
            Engine2d.htmlScale = 1
            MapConfig.Scale = 2 * Engine2d.htmlScale;  //2是最基本的scale

            SceneGroundModel.configSize = 256 //设置地面贴图的4*4。尺寸   //256或512

            SceneManager._instance = new Scene2dManager();
            Scene_data.focus3D.x = 0;
            Scene_data.focus3D.y = 0;
            Scene_data.focus3D.z = 0;
            Scene_data.focus3D.rotationY = 0;
            Scene_data.focus3D.rotationX = -45
            Scene_data.cam3D.distance = 250;


            this.resetViewMatrx3D();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵

            AppDataArpg.refrishPos(AppDataArpg.sceneStagePos)


            Engine.resetViewMatrx3D = () => { this.resetViewMatrx3D() }
        }
        public static resetViewMatrx3D() {
            if (Scene_data.viewMatrx3D) {
                Scene_data.viewMatrx3D.identity()
            } else {
                Scene_data.viewMatrx3D = new Matrix3D;
            }
            var fovw: number = Scene_data.stageWidth
            var fovh: number = Scene_data.stageHeight
            Scene_data.sceneViewHW = Math.max(fovw, fovh)
            Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);
            Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
            Scene_data.viewMatrx3D.appendScale(2 * Engine2d.htmlScale, 2 * Engine2d.htmlScale, 1);
        }
        public static update(): void {
            Engine.update();
            if (AppDataArpg.lockMainChar) {
                AppDataArpg.resetSelfPosCenter();
            }
        }
        public static resetSize(): void {
            Engine.resetSize();
        }
    }
}