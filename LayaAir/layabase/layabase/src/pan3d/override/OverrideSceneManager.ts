module pan3d {
    export class OverrideSceneManager extends SceneManager {
        constructor() {
            super()
        }
        public static initConfig(): void {
            SceneManager._instance = new OverrideSceneManager;
        }
        public update(): void {
     
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer()
            }
            this.updateMovieFrame();
            if (this._ready) {
                ParticleManager.getInstance().updateTime();
                SkillManager.getInstance().update();
                if (this.render) {
                    Scene_data.context3D.cullFaceBack(false)
                    Scene_data.context3D.cullFaceBack(true)
                    Scene_data.context3D.cullFaceBack(true)
            


                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();

                    Scene_data.context3D.setWriteDepth(false);
                    ParticleManager.getInstance().update();
                //    BloodManager.getInstance().update();
                    Scene_data.context3D.setBlendParticleFactors(0)
                    Scene_data.context3D.setWriteDepth(true);
                }
                Scene_data.context3D.setDepthTest(false);
                UIManager.getInstance().update();
            }

        }

    }
}