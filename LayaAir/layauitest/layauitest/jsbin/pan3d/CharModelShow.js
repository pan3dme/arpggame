var CharModelShow = /** @class */ (function () {
    function CharModelShow() {
        this.addModelChar();
    }
    CharModelShow.prototype.addModelChar = function () {
        var $sc = new scenedis.ModelSceneChar();
        $sc.setRoleUrl(getRoleUrl("50003"));
        $sc.setWingByID("901");
        $sc.setMountById("4103");
        $sc.setWeaponByAvatar(50011);
        $sc.play(CharAction.STAND_MOUNT);
        SceneManager.getInstance().addMovieDisplay($sc);
    };
    return CharModelShow;
}());
//# sourceMappingURL=CharModelShow.js.map