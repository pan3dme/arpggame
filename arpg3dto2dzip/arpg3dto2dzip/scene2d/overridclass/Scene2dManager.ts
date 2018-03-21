module scene2d {
    export class Scene2dManager extends SceneManager {

        public update(): void {
            if (this.test) {
                return;
            }
            Scene_data.context3D.update();
            Scene_data.context3D.setDepthTest(false);
            UIManager.getInstance().upBgGroundZero();

            Scene_data.context3D.setDepthTest(true);
            this.updateMovieFrame();
            MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            if (SceneManager.getInstance().ready) {

                ParticleManager.getInstance().updateTime();
                SkillManager.getInstance().update();

                if (this.render) {
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    Scene_data.context3D.setWriteDepth(true);
                    this.updateMovieDisplay();
                    ShadowManager.getInstance().update();
                    Scene_data.context3D.setWriteDepth(false);
                    ParticleManager.getInstance().update();
                    BloodManager.getInstance().update();

                }

            }
            Scene_data.context3D.setDepthTest(false);
            UIManager.getInstance().update();

        }

    



    }
}