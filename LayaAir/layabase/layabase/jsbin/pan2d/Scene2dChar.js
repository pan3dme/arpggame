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
var pan2d;
(function (pan2d) {
    var Scene2dChar = /** @class */ (function (_super) {
        __extends(Scene2dChar, _super);
        function Scene2dChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Scene2dChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        };
        Scene2dChar.prototype.setWingByID = function ($wingId) {
            if (!this._wingDisplay) {
                this._wingDisplay = new SceneBaseChar();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        };
        Scene2dChar.prototype.setMountById = function ($mountId) {
            if (!this.mountChar) {
                this.mountChar = new MountChar();
            }
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
            SceneManager.getInstance().addMovieDisplay(this.mountChar);
            this.isMount = true;
        };
        Scene2dChar.prototype.set2dPos = function ($x, $y) {
            this.x = $x * pan2d.Override2dEngine.htmlScale;
            this.z = $y * pan2d.Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
            if (this.mountChar) {
                this.mountChar.x = this.x;
                this.mountChar.z = this.z;
            }
        };
        Object.defineProperty(Scene2dChar.prototype, "rotationY", {
            set: function (value) {
                this._rotationY = value;
                if (this.mountChar) {
                    this.mountChar.rotationY = this._rotationY;
                }
                this.updateMatrix();
                this.updateRotationMatrix();
            },
            enumerable: true,
            configurable: true
        });
        return Scene2dChar;
    }(SceneChar));
    pan2d.Scene2dChar = Scene2dChar;
})(pan2d || (pan2d = {}));
//# sourceMappingURL=Scene2dChar.js.map