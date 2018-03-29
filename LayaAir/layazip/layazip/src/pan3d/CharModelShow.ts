class CharModelShow {
    constructor() {
        this.addModelChar()
    }
    private  addModelChar(): void {


        var $sc: scenedis.ModelSceneChar = new scenedis.ModelSceneChar();
        $sc.setRoleUrl(getRoleUrl("50003"));
        $sc.setWingByID("901");
        $sc.setMountById("4103");
        $sc.setWeaponByAvatar(50011);
        $sc.play(CharAction.STAND_MOUNT);


        SceneManager.getInstance().addMovieDisplay($sc);



    }
}