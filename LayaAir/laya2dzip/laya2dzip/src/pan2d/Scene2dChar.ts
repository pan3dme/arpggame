module pan2d
{


    export class Scene2dChar extends SceneChar {

        public setWeaponByAvatar(avatar: number, $suffix: string = ""): void {
            this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        }


        public setWingByID($wingId: string): void {
            if (!this._wingDisplay) {
                this._wingDisplay = new SceneBaseChar();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        }


        public setMountById($mountId: string): void {
            if (!this.mountChar) {
                this.mountChar = new MountChar();
            }
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
            SceneManager.getInstance().addMovieDisplay(this.mountChar);

            this.isMount = true
        }
        public set2dPos($x: number, $y: number): void {
            this.x = $x * Override2dEngine.htmlScale;
            this.z = $y * Override2dEngine.htmlScale / (Math.sin(45 * Math.PI / 180)) * -1;
            if (this.mountChar) {
                this.mountChar.x = this.x;
                this.mountChar.z = this.z;
            }
        }
        public set rotationY(value: number) {
            this._rotationY = value;
            if (this.mountChar) {
                this.mountChar.rotationY = this._rotationY;
            }
            this.updateMatrix();
            this.updateRotationMatrix();
        }
     

    }

}