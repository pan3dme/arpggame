var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CharShow;
(function (CharShow) {
    var ModelSceneChar = /** @class */ (function (_super) {
        __extends(ModelSceneChar, _super);
        function ModelSceneChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModelSceneChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        };
        ModelSceneChar.prototype.setWingByID = function ($wingId) {
            if (!this._wingDisplay) {
                this._wingDisplay = new SceneBaseChar();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        };
        ModelSceneChar.prototype.setMountById = function ($mountId) {
            if (!this.mountChar) {
                this.mountChar = new MountChar();
            }
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
            SceneManager.getInstance().addMovieDisplay(this.mountChar);
            this.isMount = true;
        };
        return ModelSceneChar;
    }(SceneChar));
    CharShow.ModelSceneChar = ModelSceneChar;
})(CharShow || (CharShow = {}));
//# sourceMappingURL=ModelSceneChar.js.map