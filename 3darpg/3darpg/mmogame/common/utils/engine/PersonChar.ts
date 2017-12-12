class PersonChar extends SceneChar {
    public constructor() {
        super();
    }


}

class Display3DSprite2DBind extends Display3DSprite {
    constructor() {
        super();
    }

    public uiMatrix: Matrix3D;
    public uiViewMatrix: Matrix3D;
    public uiCamPos: Vector3D;
    public vpMatrix: Matrix3D = new Matrix3D;

    public lightData: any;

    public setCam(): void {

        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
        //Scene_data.context3D.setVcMatrix4fv(this.material.shader, "camMatrix3D", this.uiMatrix.m);

        this.vpMatrix.identity();
        this.vpMatrix.prepend(this.uiViewMatrix);
        this.vpMatrix.prepend(this.uiMatrix);
        Scene_data.context3D.setVpMatrix(this.material.shader, this.vpMatrix.m);

    }
    public updateBind(): void {
        if (this.bindTarget) {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ)
            this.bindTarget.getSocket(this.bindSocket, this.bindMatrix)
            this.posMatrix.append(this.bindMatrix);
            this.bindMatrix.copyTo(this._rotationMatrix);
            this._rotationMatrix.identityPostion();

            if (this._rotationData) {
                this._rotationMatrix.getRotaion(this._rotationData);
            }

        }
    }

    public setCamPos($material: Material): void {
        //var p: Vector3D = new Vector3D(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z, 1.0);
        //Scene_data.context3D.setVc4fv($material.shader, "fc2", [p.x, p.y, p.z, p.w]);
        $material.updateCam(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z);
    }

    public setDirectLight($material: Material): void {

        if ($material.directLight && this.lightData) {
            Scene_data.context3D.setVc3fv($material.shader, "ambientColor", this.lightData[0]);
            Scene_data.context3D.setVc3fv($material.shader, "sunDirect", this.lightData[1]);
            Scene_data.context3D.setVc3fv($material.shader, "sunColor", this.lightData[2]);
        }


    }



}
class TestModel {
    public objData: ObjData;
    private static _instance: TestModel;
    public static getInstance(): TestModel {
        if (!this._instance) {
            this._instance = new TestModel();
        }
        return this._instance;
    }

    public constructor() {
        this.objData = new ObjData();



        var vertices: Array<number> = []
        var uvs: Array<number> = []
        var lightuvs: Array<number> = []
        var normals: Array<number> = []
        var index: Array<number> = []


        this.objData.indexs = new Array;
        this.objData.uvs = new Array;
        this.objData.lightuvs = new Array;
        this.objData.normals = new Array;
        this.objData.indexs = new Array;
        var i: number = 0;
        for (i = 0; i < vertices.length; i++) {
            this.objData.vertices.push(vertices[i])
        }
        for (i = 0; i < uvs.length; i++) {
            this.objData.uvs.push(uvs[i])
        }
        for (i = 0; i < lightuvs.length; i++) {
            this.objData.lightuvs.push(lightuvs[i])
        }
        for (i = 0; i < normals.length / 3; i++) {
            this.objData.normals.push(normals[i * 3 + 0] * +1)
            this.objData.normals.push(normals[i * 3 + 2] * -1)
            this.objData.normals.push(normals[i * 3 + 1] * +1)
        }


        for (i = 0; i < index.length; i++) {
            this.objData.indexs.push(index[i])
        }

        this.upToGpu()

    }
    public upToGpu(): void {
        var $objData: ObjData = this.objData;
        $objData.treNum = $objData.indexs.length;
        $objData.vertexBuffer = Scene_data.context3D.uploadBuff3D($objData.vertices);
        $objData.uvBuffer = Scene_data.context3D.uploadBuff3D($objData.uvs);
        $objData.lightUvBuffer = Scene_data.context3D.uploadBuff3D($objData.lightuvs);
        $objData.normalsBuffer = Scene_data.context3D.uploadBuff3D($objData.normals);
        $objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D($objData.indexs);
    }


}



class Person2DChar extends SceneChar {
    protected uiMatrix: Matrix3D;
    protected uiViewMatrix: Matrix3D;
    public vpMatrix: Matrix3D = new Matrix3D;
    public uiCamPos: Vector3D;
    public lightData: any;
    private _camRx: number = 0;
    private _camRy: number = 0;
    public needUIUrl: boolean = true;
    public bindZero:boolean = false;
    public constructor() {
        super();
        this.uiMatrix = new Matrix3D;
        this.uiMatrix.prependTranslation(0, 0, 600);
        this.uiMatrix.prependRotation(-10, Vector3D.X_AXIS);
        this.uiMatrix.prependRotation(180, Vector3D.Y_AXIS);
        var $m: Matrix3D = this.uiMatrix.clone();
        $m.invert();
        this.uiCamPos = $m.position;

        this.uiViewMatrix = new Matrix3D;
        this.resize();
        this.addStage();
    }

    public setCamData(rx: number, ry: number, distance: number): void {
        this.uiMatrix = new Matrix3D;
        this.uiMatrix.prependTranslation(0, 0, distance);
        this.uiMatrix.prependRotation(rx, Vector3D.X_AXIS);
        this.uiMatrix.prependRotation(ry, Vector3D.Y_AXIS);
        var $m: Matrix3D = this.uiMatrix.clone();
        $m.invert();
        this.uiCamPos = $m.position;
        this.resize();
        this._camRx = rx;
        this._camRy = ry;
    }
    public showAvatarVisibel: boolean = true  //是否显示角色模型， 区别于显示唯一武器时
    public updateMaterialMesh($mesh: MeshData): void {
        if (this.showAvatarVisibel) {
            super.updateMaterialMesh($mesh);
        }
    }

    // public updateBind(): void {
    //     super.updateBind()
    //     if (this.bindTarget) {
    //         this.posMatrix.identity();
    //         this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ)
    //         this.bindTarget.getSocket(this.bindSocket, this.bindMatrix)
    //         this.posMatrix.append(this.bindMatrix);
    //         this.bindMatrix.copyTo(this._rotationMatrix);
    //         this._rotationMatrix.identityPostion();

    //         if (this._rotationData) {
    //             this._rotationMatrix.getRotaion(this._rotationData);
    //         }

    //     }
    // }

    public resize(): void {
        this.uiViewMatrix.identity();

        var $scr: number = 3 / 1000
        this.uiViewMatrix.appendScale($scr, $scr, 1 / 1000);
        this.uiViewMatrix.appendScale(1000 / Scene_data.stageWidth, 1000 / Scene_data.stageHeight, 1);
    }
    public onMeshLoaded(): void {
        if (this._skinMesh.lightData) {
            for (var i: number = 0; this._displayItem && i < this._displayItem.length; i++) {
                this._displayItem[i].lightData = this._skinMesh.lightData;
            }
        }
    }
    //  用于加载UI里的角色和武器
    protected getSceneCharAvatarUrl(num: number): string {
        if (this.needUIUrl) {
            return getRoleUIUrl(String(num));
        } else {
            return super.getSceneCharAvatarUrl(num);
        }

    }
    protected getSceneCharWeaponUrl(num: number): string {
        return getModelUIUrl(String(num));
    }


    public removePart($key: string): void {

        for (var i: number = 0; this._displayItem && i < this._displayItem.length; i++) {
            this._displayItem[i].destory();
        }
        for (var j: number = 0; this._particleItem && j < this._particleItem.length; j++) {
            this._particleItem[j].destory();
        }

        this._displayItem = new Array;
        this._particleItem = new Array;

        this._partUrl = new Object;
    }

    public getSocket(socketName: string, resultMatrix: Matrix3D): void {
        if(this.bindZero){
            super.getSocket(socketName,resultMatrix);
            return;
        }
        if (!this._skinMesh) {
            resultMatrix.identity();
            resultMatrix.appendTranslation(0,100000,0);
        } else {
            super.getSocket(socketName,resultMatrix);
        }
    }

    public addPart($key: string, $bindSocket: string, $url: string): void {

        if (this._partUrl[$key] == $url) {//如果相同则返回
            if (this.loadPartComFun) {
                this.loadPartComFun();
            }
            return;
        } else if (this._partUrl[$key]) {//如果不同则先移除
            this.removePart($key);
        }

        this._partUrl[$key] = $url;

        var ary: Array<any> = new Array;
        var groupRes: GroupRes = new GroupRes;
        groupRes.load(Scene_data.fileRoot + $url, () => { this.loadPartResA($bindSocket, groupRes, ary) });
    }
    private _displayItem: Array<Display3DSprite2DBind>;
    private _particleItem: Array<CombineParticle>;
    public loadPartComFun: Function;
    private loadPartResA($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void {

        this._displayItem = new Array
        this._particleItem = new Array
        for (var i: number = 0; i < groupRes.dataAry.length; i++) {
            var item: GroupItem = groupRes.dataAry[i];

            var posV3d: Vector3D;
            var rotationV3d: Vector3D;
            var scaleV3d: Vector3D;
            if (item.isGroup) {
                posV3d = new Vector3D(item.x, item.y, item.z);
                rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
            }

            if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                var particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                ary.push(particle);
                particle.bindTarget = this;
                particle.bindSocket = $bindSocket;
                particle.dynamic = true;
                this._particleItem.push(particle)
                if (item.isGroup) {
                    particle.setGroup(posV3d, rotationV3d, scaleV3d);
                }

            }
            if (item.types == BaseRes.PREFAB_TYPE) {
                var display: Display3DSprite2DBind = new Display3DSprite2DBind();
                display.uiCamPos = this.uiCamPos;
                if (this._skinMesh) {
                    display.lightData = this._skinMesh.lightData;
                } else if (this.lightData) {
                    display.lightData = this.lightData;
                }
                display.setObjUrl(item.objUrl);
                // display.objData=TestModel.getInstance().objData
                display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                display.dynamic = true;
                ary.push(display);
                display.setBind(this, $bindSocket);
                this._displayItem.push(display);
                if (item.isGroup) {
                    display.setGroup(posV3d, rotationV3d, scaleV3d);
                }

            }

        }

        if (this.loadPartComFun) {
            this.loadPartComFun();
        }

    }

    public addSkinMeshParticle(): void {
        if(!this._skinMesh){
            return;
        }
        var meshAry: Array<MeshData> = this._skinMesh.meshAry;
        if(!meshAry){
            return;
        }
        for (var i: number = 0; i < meshAry.length; i++) {
            var particleAry: Array<BindParticle> = meshAry[i].particleAry;
            for (var j: number = 0; j < particleAry.length; j++) {
                var bindPartcle: BindParticle = particleAry[j];

                var particle: CombineParticle;

                particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);

                particle.dynamic = true;

                particle.bindSocket = bindPartcle.socketName;

                this._particleItem.push(particle);

                particle.bindTarget = this;

            }
        }
    }

    public removeSkinMeshParticle(): void {
        this.removePart("mesh");
    }

    protected updataBindDis(t: number): void {
        for (var i: number = 0; this._displayItem && i < this._displayItem.length; i++) {
            this._displayItem[i].uiViewMatrix = this.uiViewMatrix
            this._displayItem[i].uiMatrix = this.uiMatrix
            this._displayItem[i].scale = this.scale * 0.8;
            this._displayItem[i].update();
        }
        Scene_data.context3D.setDepthTest(true);
        Scene_data.context3D.setWriteDepth(false);

        // Scene_data.cam3D.rotationY
        // 
        var tempx: number = Scene_data.cam3D.rotationX;
        var tempy: number = Scene_data.cam3D.rotationY;

        Scene_data.cam3D.rotationX = this._camRx;
        Scene_data.cam3D.rotationY = this._camRy;

        for (var j: number = 0; this._particleItem && j < this._particleItem.length; j++) {
            this._particleItem[j].scaleX = this.scale * 0.8;
            this._particleItem[j].scaleY = this.scale * 0.8;
            this._particleItem[j].scaleZ = this.scale * 0.8;
            this.upParticleData(this._particleItem[j], t)
        }

        Scene_data.cam3D.rotationX = tempx;
        Scene_data.cam3D.rotationY = tempy;

    }
    private upParticleData(particle: CombineParticle, t: number): void {
        particle.updateTime(t)
        for (var i: number = 0; i < particle.displayAry.length; i++) {
            var temp: Display3DParticle = particle.displayAry[i]
            Scene_data.context3D.setBlendParticleFactors(temp.data._alphaMode);
            Scene_data.context3D.cullFaceBack(temp.data.materialParam.material.backCull);
            if (temp.data.materialParam) {
                Scene_data.context3D.setProgram(temp.data.materialParam.program);
            }
            temp.updateMatrix();
            temp.setVc();
            //Scene_data.context3D.setVcMatrix4fv(temp.data.materialParam.shader, "viewMatrix3D", this.uiViewMatrix.m);
            temp.data.setFloat32Mat("viewMatrix3D", this.uiViewMatrix.m);
            //Scene_data.context3D.setVcMatrix4fv(temp.data.materialParam.shader, "camMatrix3D", this.uiMatrix.m);
            temp.data.setFloat32Mat("camMatrix3D", this.uiMatrix.m);
            temp.pushVc();
            temp.setVa();
            temp.resetVa();
        }
    }

    public setVcMatrix($mesh: MeshData): void {
        this.vpMatrix.identity();
        this.vpMatrix.prepend(this.uiViewMatrix);
        this.vpMatrix.prepend(this.uiMatrix);
        Scene_data.context3D.setVpMatrix($mesh.material.shader, this.vpMatrix.m);
        //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "viewMatrix3D", this.uiViewMatrix.m);
        //Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "camMatrix3D", this.uiMatrix.m);
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrix3D", this.posMatrix.m);
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
    }
    public refreshY(): void {
    }


    protected rotationToNew(value: number, num: number = 1): void {

    }


    public setCamPos($material: Material): void {
        // var p: Vector3D = new Vector3D(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z, 1.0);
        //Scene_data.context3D.setVc4fv($material.shader, "fc2", [p.x, p.y, p.z, p.w]);
        $material.updateCam(this.uiCamPos.x, this.uiCamPos.y, this.uiCamPos.z);
    }

    public setDirectLight($material: Material): void {
        if ($material.directLight && this._skinMesh) {
            if (this._skinMesh.lightData) {
                Scene_data.context3D.setVc3fv($material.shader, "ambientColor", this._skinMesh.lightData[0]);
                Scene_data.context3D.setVc3fv($material.shader, "sunDirect", this._skinMesh.lightData[1]);
                Scene_data.context3D.setVc3fv($material.shader, "sunColor", this._skinMesh.lightData[2]);
            }

        }
    }
    private deltTime: number = 0;
    public update(): void {

        if (!this.visible) {
            return;
        }
        var t: number = TimeUtil.getTimer() - this.deltTime;
        this.updateFrame(t);
        Scene_data.context3D.setDepthTest(true);
        Scene_data.context3D.setWriteDepth(true);
        super.update();
        this.updataBindDis(t);
        Scene_data.context3D.setDepthTest(false);
        Scene_data.context3D.setWriteDepth(false);

        this.deltTime = TimeUtil.getTimer();


    }



}

class MonsterUIChar extends Person2DChar {
    protected getSceneCharAvatarUrl(num: number): string {
        return getRoleUrl(String(num));
    }
    protected getSceneCharWeaponUrl(num: number): string {
        return getModelUrl(String(num));
    }

}
class DialogueUIChar extends MonsterUIChar {

    private uiRoleScale: number = 1
    public onMeshLoaded(): void {
        super.onMeshLoaded()
        if (this._skinMesh) {
            var $roleH: number = 0
            for (var j: number = 0; j < this._skinMesh.hitPosItem.length; j++) {
                $roleH = Math.max(this._skinMesh.hitPosItem[j].y, $roleH)
            }
            this.uiRoleScale = 50 / $roleH;
        }
        if (this.loadFinishFun) {
            this.loadFinishFun();//加载完后回调
        }
    }
    public loadFinishFun: Function
    public updateMatrix(): void {
        this.posMatrix.identity();
        this.posMatrix.appendScale(this._scaleX * this.uiRoleScale, this._scaleY * this.uiRoleScale, this._scaleZ * this.uiRoleScale);
        this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS)
        this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
        this.posMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS)

        var tx: number = this.num1000 / 3 * UIData.Scale - (this.x * (2 / 3)) * UIData.Scale;
        var ty: number = 540 / 3 * UIData.Scale - (this.y * (2 / 3)) * UIData.Scale;  //UIData.designWidth==540

        this.posMatrix.appendTranslation(tx, ty, 0);
    }
    private num1000: number = 960//UIData.designWidth==960
    public resize(): void {
        this.uiViewMatrix.identity();
        var $num1000: number = this.num1000
        var $scr: number = 3 / $num1000
        this.uiViewMatrix.appendScale($scr, $scr, 1 / $num1000);
        this.uiViewMatrix.appendScale($num1000 / Scene_data.stageWidth, $num1000 / Scene_data.stageHeight, 1);
    }
    private uiRole: boolean = false
    protected getSceneCharAvatarUrl(num: number): string {
        if (this.uiRole) {
            return getRoleUIUrl(String(num));
        }
        return getRoleUrl(String(num));
    }
    public setAvatarUI(num: number): void {
        this.uiRole = true
        super.setAvatar(num);
    }

}