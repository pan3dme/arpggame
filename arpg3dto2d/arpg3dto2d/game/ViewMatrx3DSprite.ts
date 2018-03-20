class ViewMatrx3DSprite extends LineDisplaySprite{
    constructor() {
        super();
        SceneManager.getInstance().addDisplay(this)
    }
    private static _instance: ViewMatrx3DSprite;
    public static getInstance(): ViewMatrx3DSprite {
        if (!this._instance) {
            this._instance = new ViewMatrx3DSprite();
        }
        return this._instance;
    }
    public update(): void {
    
        if (true) {
            this.x = Scene_data.focus3D.x
            this.y = Scene_data.focus3D.y+5
            this.z = Scene_data.focus3D.z
        }
        super.update();
        
    }
    public drawCircle($num: number): void
    {
        var n: number = 36;
        var last: Vector3D;
        this.clear();
        this.baseColor = new Vector3D(0, 1, 1, 1)
        for (var i: number = 0; i < n; i++) {
            var m: Matrix3D = new Matrix3D;
            m.appendRotation(i * (360 / n), Vector3D.Y_AXIS);
            var a: Vector3D = m.transformVector(new Vector3D($num, 0, 0))
            if (last) {
                this.makeLineMode(last, a)
            }
            last = a;
        }
       // this.makeLineMode(new Vector3D, new Vector3D(100,100,100))
        this.upToGpu();
    }
    public draw(): void
    {
        this.drawCircle(100)
        return 

       
    }

    private makePolygonObjData($data: any): ObjData {
        var tempSprite: LineDisplaySprite = new LineDisplaySprite();
        tempSprite.clear();
        tempSprite.baseColor = new Vector3D(0, 1, 1, 1)

        var a: number;
        var b: number;
        var c: number;
        var A: Vector3D;
        var B: Vector3D;
        var C: Vector3D;
        for (var i: number = 0; i < $data.indexs.length / 3; i++) {
            a = $data.indexs[i * 3 + 0];
            b = $data.indexs[i * 3 + 1];
            c = $data.indexs[i * 3 + 2];
            A = new Vector3D($data.vertices[a * 3 + 0], $data.vertices[a * 3 + 1], $data.vertices[a * 3 + 2])
            B = new Vector3D($data.vertices[b * 3 + 0], $data.vertices[b * 3 + 1], $data.vertices[b * 3 + 2])
            C = new Vector3D($data.vertices[c * 3 + 0], $data.vertices[c * 3 + 1], $data.vertices[c * 3 + 2])

            tempSprite.makeLineMode(A, B)
            tempSprite.makeLineMode(B, C)
            tempSprite.makeLineMode(C, A)

        }
        tempSprite.upToGpu();


        return tempSprite.objData;

    }

}