class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
    public activeList: Array<Object3D>;
    public currentPosList: Array<Vector3D>;
    public pathMul: SkillMulPath;


    public update(t: number): void {

        this.pathMul.update(t);

    }

    public getSunType(): number {
        return 1;
    }


    public addToRender(): void {
        if (!this.particle) {
            return;
        }
        this.particle.reset();
        ParticleManager.getInstance().addParticle(this.particle);

        if (!this.currentPosList) {
            this.currentPosList = new Array;
            for (var i: number = 0; i < this.activeList.length; i++) {
                this.currentPosList.push(new Vector3D(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5));
            }
            this.pathMul.setInitCurrentPos(this.currentPosList);
        } else {
            for (var i: number = 0; i < this.activeList.length; i++) {
                this.currentPosList[i].setTo(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5);
                this.currentPosList[i].w = 0;
            }
        }
        
        //this.particle.setMulPos(this.currentPosList);
        this.pathMul.add();
        this.particle.setMulPos(this.pathMul.resultAry);
    }

    public setMulPlayData($activeList: Array<Object3D>, $target: Object3D, $removeCallFun: Function, types: number = 0): void {
        
    }

    public getMulSocket(ary: Array<Vector3D>): void {
        if (ary){
            this.pathMul.applyData(ary);
        }
    }

} 