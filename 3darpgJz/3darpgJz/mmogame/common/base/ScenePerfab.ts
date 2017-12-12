class ScenePerfab extends Display3dMovie {

    public setPerfabName($str: string): void {
        this.addPart("abcdef", "abcdef", getModelUrl($str));

    }

}