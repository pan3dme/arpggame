class FocusRect {
    public minx: number;
    public minz: number;
    public maxx: number;
    public maxz: number;
    public mindis: number;
    public maxdis: number;
    public centX: number
    public centZ: number
    public constructor($centX: number, $centZ: number,$minx: number, $minz: number, $maxx: number, $maxz: number, $mindis: number, $maxdis: number) {
        this.centX = $centX
        this.centZ = $centZ

        this.minx = $minx
        this.minz = $minz
        this.maxx = $maxx
        this.maxz = $maxz
        this.mindis = $mindis
        this.maxdis = $maxdis


    }

}
class KeyControlManager
{
    private static _instance: KeyControlManager;
    public static getInstance(): KeyControlManager {
        if (!this._instance) {
            this._instance = new KeyControlManager();
        }
        return this._instance;
    }
    private _lastMousePos: Vector3D;
    private _lastFocus: Vector3D;
    private _isMouseDown: boolean;
    private _lock: boolean;

    public constructor() {
        this._lastMousePos = new Vector3D;
        this._lastFocus = new Vector3D;
        this._isMouseDown = false;
        this._lock = false;
    }

    public init(): void {

        
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.PinchStart, this.onMousePinchStart, this);
        Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Pinch, this.onMouseSwipe, this);
        document.addEventListener(MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) })
    }



    private lastCamDis:number
    private onMousePinchStart($evt: InteractiveEvent): void {

        this.lastCamDis = Scene_data.cam3D.distance
    }
    private onMouseSwipe($evt: InteractiveEvent): void {
   
        var num: number =Math.max(0.2, Math.min($evt.data, 2))
        Scene_data.cam3D.distance = this.lastCamDis * (2 - $evt.data);

        this.upData()
       // Scene_data.focus3D.rotationY = this.lastRotationY + $evt.roation
  
    }
    public onMouseWheel($evt: MouseWheelEvent): void {
        Scene_data.cam3D.distance += $evt.wheelDelta / 10;
    }
    public focusRect: FocusRect = new FocusRect(0,0,-200, -200, 200, 200,500,1500);
 

    public onMouseMove($evt: InteractiveEvent): void {

        if (this._isMouseDown) {
            var _E: Vector3D = Groundposition.getGroundPos( $evt.x, $evt.y);
            Scene_data.focus3D.x = this.lastFopcus3DPos.x - (_E.x - this.lastMouseHit.x);
            Scene_data.focus3D.z = this.lastFopcus3DPos.z - (_E.z - this.lastMouseHit.z);
     
        }
        this.upData()
    }
    public upData(): void
    {
 
        if (this.focusRect) {
            if (Scene_data.focus3D.x < (this.focusRect.minx + this.focusRect.centX)) {
                Scene_data.focus3D.x = (this.focusRect.minx + this.focusRect.centX)
            }
            if (Scene_data.focus3D.x > (this.focusRect.maxx + this.focusRect.centX)) {
                Scene_data.focus3D.x = (this.focusRect.maxx + this.focusRect.centX)
            }

            if (Scene_data.focus3D.z < (this.focusRect.minz + this.focusRect.centZ)) {
                Scene_data.focus3D.z = (this.focusRect.minz + this.focusRect.centZ)
            }
            if (Scene_data.focus3D.z > (this.focusRect.maxz + this.focusRect.centZ)) {
                Scene_data.focus3D.z = (this.focusRect.maxz + this.focusRect.centZ)
            }
        }
        Scene_data.cam3D.distance = Math.max(Scene_data.cam3D.distance, this.focusRect.mindis)
        Scene_data.cam3D.distance = Math.min(Scene_data.cam3D.distance, this.focusRect.maxdis)
    }
    public addCentZ($num:number): void
    {
        Scene_data.focus3D.z += $num;
        this.focusRect.centZ += $num
        this.upData()
    }

    private lastFopcus3DPos: Vector3D = new Vector3D;
    private lastMouseHit: Vector3D = new Vector3D;
    private lastRotationY:number=0
    public onMouseDown($evt: InteractiveEvent): void {

        this._lastMousePos.x = $evt.x;
        this.lastRotationY = Scene_data.focus3D.rotationY;
        this._isMouseDown = true;

        this.lastFopcus3DPos.x = Scene_data.focus3D.x
        this.lastFopcus3DPos.y = Scene_data.focus3D.y
        this.lastFopcus3DPos.z = Scene_data.focus3D.z

        this.lastMouseHit = Groundposition.getGroundPos($evt.x, $evt.y);


    }
    public onMouseUp($evt: InteractiveEvent): void {
        this._isMouseDown = false;
    }



 

} 

