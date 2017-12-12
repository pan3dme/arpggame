class DualQuatFloat32Array
{
    public quat: Float32Array;
    public pos: Float32Array;
}
class AnimData {
    
    public inLoop: number = 0;

    public inter: Array<number> = new Array;

    public bounds: Array<Vector3D> = new Array;

    public nameHeight: number = 0;

    public posAry: Array<Vector3D> = new Array;

    public matrixAry: Array<Array<Matrix3D>>;

    public boneQPAry: Array<Array<DualQuatFloat32Array>>;

    public hasProcess: boolean = false;

    public processMesh($skinMesh:SkinMesh): void {
        if (this.hasProcess){
            console.log("has process logic error");
            return;
        }
      
        for (var i: number = 0; i < this.matrixAry.length; i++) {
            var frameAry: Array<Matrix3D> = this.matrixAry[i];
            for (var j: number = 0; j < frameAry.length; j++) {
                frameAry[j].prepend($skinMesh.bindPosMatrixAry[j]);
            }
        }
        this.makeFrameDualQuatFloatArray($skinMesh);

        this.hasProcess = true;
    }

    private makeFrameDualQuatFloatArray($skinMesh: SkinMesh): void
    {
        this.boneQPAry=new Array();
        var tempMatrix:Matrix3D = new Matrix3D();
        for (var i: number = 0; i < $skinMesh.meshAry.length; i++)
        {   
            var $frameDualQuat: Array<DualQuatFloat32Array> = new Array;
            var newIDBoneArr: Array< number>= $skinMesh.meshAry[i].boneNewIDAry;
            for (var j: number = 0; j < this.matrixAry.length; j++) {
                var baseBone: Array<Matrix3D> = this.matrixAry[j];
                var $DualQuatFloat32Array: DualQuatFloat32Array = new DualQuatFloat32Array;
                $DualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
                $DualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
                for (var k: number = 0; k < newIDBoneArr.length; k++)
                {
                    var $m: Matrix3D = baseBone[newIDBoneArr[k]].clone(tempMatrix);
                    $m.appendScale(-1,1,1)  //特别标记，因为四元数和矩阵运算结果不一
                    var $q: Quaternion = new Quaternion();
                    $q.fromMatrix($m)
                    var $p: Vector3D = $m.position;
                    $DualQuatFloat32Array.quat[k * 4 + 0] = $q.x
                    $DualQuatFloat32Array.quat[k * 4 + 1] = $q.y
                    $DualQuatFloat32Array.quat[k * 4 + 2] = $q.z
                    $DualQuatFloat32Array.quat[k * 4 + 3] = $q.w

                    $DualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
                    $DualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
                    $DualQuatFloat32Array.pos[k * 3 + 2] = $p.z;

                 

                }
                $frameDualQuat.push($DualQuatFloat32Array)

            }
            this.boneQPAry.push($frameDualQuat);

        }

    }

   

} 
