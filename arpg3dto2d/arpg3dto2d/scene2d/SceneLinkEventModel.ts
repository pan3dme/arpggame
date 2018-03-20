
module scene2d {
    export class SceneLinkEventModel {
        constructor() {

        }
        private static _instance: SceneLinkEventModel;
        public static getInstance(): SceneLinkEventModel {
            if (!this._instance) {
                this._instance = new SceneLinkEventModel();
            }
            return this._instance;
        }
        public addEvets(): void {
            document.addEventListener(MouseType.KeyDown, ($evt: KeyboardEvent) => { this.onKeyDown($evt) })
            GameMouseManager.getInstance().onSceneMouseDown = ($evt: InteractiveEvent) => { this.onSceneMouseDown($evt) }
            GameMouseManager.getInstance().addMouseEvent();
        }
        public onSceneMouseDown($evt: InteractiveEvent): void {
            this.onMouseDown($evt);
        }
        public onKeyDown($evt: KeyboardEvent): void {
         
        }
        protected onMouseDown($evt: InteractiveEvent): void {

            if (GameInstance.mainChar) {
                var $beginV2: Vector2D = SceneAstarModel.getAstarBySceneV3D(new Vector3D(GameInstance.mainChar.x, 0, GameInstance.mainChar.z))
                var $toV2: Vector2D = SceneAstarModel.getInstance().getAstarSceneByMouse($evt);
                var $item: Array<Vector2D> = AstarUtil.findPath2D($beginV2, $toV2);
                if ($item && $item.length) {
                    $item.shift();
                    GameInstance.mainChar.applyWalk($item);
                }
            }
        }
    }

}