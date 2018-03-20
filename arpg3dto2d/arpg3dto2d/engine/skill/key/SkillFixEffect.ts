class SkillFixEffect extends SkillEffect {
    public pos: Vector3D;
    public rotation: Vector3D;
    public outPos: Vector3D;
    public hasSocket: boolean;
    public socket: string;

    public setInfo(obj: SkillKeyVo): void {
        super.setInfo(obj);
        var data: SkillFixEffectKeyVo = <SkillFixEffectKeyVo>obj;
        this.pos = data.pos;
        this.rotation = data.rotation;
        this.hasSocket = data.hasSocket;
        this.socket = data.socket;

    }
    public addToRender(): void {
        super.addToRender();


        if (this.outPos) {
            this.particle.x = this.outPos.x;
            this.particle.y = this.outPos.y;
            this.particle.z = this.outPos.z;

            this.particle.rotationX = this.rotation.x;
            this.particle.rotationY = this.rotation.y + this.active.rotationY;
            this.particle.rotationZ = this.rotation.z;

            this.particle.bindTarget = null;
        } else if (this.hasSocket) {
            var targetActive: any = this.active;
            this.particle.bindTarget = <IBind>(targetActive);
            this.particle.bindSocket = this.socket;
        } else {
            var ma: Matrix3D = new Matrix3D;
            ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
            var v3d: Vector3D = ma.transformVector(this.pos);
            v3d.x += this.active.x;
            v3d.y += this.active.y;
            v3d.z += this.active.z;

            this.particle.x = v3d.x;
            this.particle.y = v3d.y;
            this.particle.z = v3d.z;

            this.particle.rotationX = this.rotation.x;
            this.particle.rotationY = this.rotation.y + this.active.rotationY;
            this.particle.rotationZ = this.rotation.z;

            this.particle.bindTarget = null;
        }






    }
} 