module pan2d {
    export class Override2dSceneManager extends pan3d.OverrideSceneManager {
        constructor() {
            super()
        }
        public static initConfig(): void {
            SceneManager._instance = new Override2dSceneManager;
        }
    }
}