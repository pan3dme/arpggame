module pan2d {
    export  class CanvasPostionModel {
        private static _instance: CanvasPostionModel;
        public static getInstance(): CanvasPostionModel {
            if (!this._instance) {
                this._instance = new CanvasPostionModel();
            }
            return this._instance;
        }
        constructor() {
            this.tureMoveV2d = new Vector2D(0,0)

            this.initSceneFocueEvent()
        }

        public initSceneFocueEvent(): void {
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);

        }
    

        private lastPostionV2d: Vector2D = new Vector2D;
        private _lastMousePos: Vector2D = new Vector2D();
        private _isMouseDown: boolean;
        private onMouseMove($evt: InteractiveEvent): void {
            if (this._isMouseDown) {
    
                this.tureMoveV2d.x = this.lastPostionV2d.x + $evt.x - this._lastMousePos.x;
                this.tureMoveV2d.y = this.lastPostionV2d.y + $evt.y - this._lastMousePos.y;
  
            
                this.resetSize()
            }
        }
        private onMouseDown($evt: InteractiveEvent): void {
   
            this._lastMousePos.x = $evt.x;
            this._lastMousePos.y = $evt.y;
            this.lastPostionV2d = new Vector2D(this.tureMoveV2d.x, this.tureMoveV2d.y)

            this._isMouseDown = true;
        }
        private onMouseUp($evt: InteractiveEvent): void {
            this._isMouseDown = false;
        }
        public tureMoveV2d: Vector2D
        public resetSize(): void {
       
            Scene_data.focus3D.x = 0 + Scene_data.stageWidth / 2 * Override2dEngine.htmlScale
            Scene_data.focus3D.z = 0 - Scene_data.stageHeight / 2 * Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180))

            Scene_data.focus3D.x -= this.tureMoveV2d.x * Override2dEngine.htmlScale;
            Scene_data.focus3D.z += this.tureMoveV2d.y * Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180));
      
            Ground2dBaseSprite.perentpos = this.tureMoveV2d
   
        }
    }
}