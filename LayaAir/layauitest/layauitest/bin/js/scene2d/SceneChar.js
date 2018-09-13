var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* name
*/
var scene2d;
(function (scene2d) {
    var SceneChar = (function (_super) {
        __extends(SceneChar, _super);
        function SceneChar() {
            var _this = _super.call(this) || this;
            _this.isMount = false;
            _this._px = 0;
            _this._py = 0;
            _this._pz = 0;
            _this._pRotationY = 0;
            _this._isBoss = false;
            _this._optimization = false; //当优化为true的时候 不显示
            _this._weaponNum = -1;
            _this.tittleHeight = 50;
            _this.toRotationY = 0;
            _this._resultVisible = true;
            _this._showHitBox = false;
            // private triIndex: Array<number> = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
            // private triIndex: Array<number> = [0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0]
            _this.triIndex = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 4, 5, 0, 5, 1, 1, 5, 6, 1, 6, 2, 2, 6, 7, 2, 7, 3, 3, 7, 4, 3, 4, 0];
            _this.shadow = true;
            _this.skillitem = new Array();
            return _this;
        }
        Object.defineProperty(SceneChar.prototype, "isBoss", {
            get: function () {
                return this._isBoss;
            },
            set: function (val) {
                this._isBoss = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "px", {
            get: function () {
                return this._px;
            },
            set: function (val) {
                this._px = val;
                if (this.isMount) {
                    this.mountChar.x = val;
                    if (this._shadow) {
                        this._shadow.x = val;
                    }
                }
                else {
                    this.x = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "py", {
            get: function () {
                return this._py;
            },
            set: function (val) {
                this._py = val;
                if (this.isMount) {
                    this.mountChar.y = val;
                    if (this._shadow) {
                        this._shadow.y = val;
                    }
                }
                else {
                    this.y = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "pz", {
            get: function () {
                return this._pz;
            },
            set: function (val) {
                this._pz = val;
                if (this.isMount) {
                    this.mountChar.z = val;
                    if (this._shadow) {
                        this._shadow.z = val;
                    }
                }
                else {
                    this.z = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "forceRotationY", {
            /**强制角度 */
            set: function (val) {
                this.pRotationY = val;
                this.rotationY = val;
                this.toRotationY = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "pRotationY", {
            get: function () {
                return this._pRotationY;
            },
            set: function (val) {
                this._pRotationY = val;
                if (this.isMount) {
                    this.mountChar.rotationY = val;
                }
                else {
                    this.rotationY = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        SceneChar.prototype.play = function ($action, $completeState, needFollow) {
            if ($completeState === void 0) { $completeState = 0; }
            if (needFollow === void 0) { needFollow = true; }
            if (this.isSinging) {
                $completeState = 0; //吟唱时动作状态成为2;
                if ($action == scene2d.CharAction.WALK || $action == scene2d.CharAction.STANAD) {
                    return true;
                }
            }
            if (this.isMount) {
                this.mountChar.visible = Boolean($action != scene2d.CharAction.JUMP);
                if ($action == scene2d.CharAction.STANAD) {
                    _super.prototype.play.call(this, scene2d.CharAction.STAND_MOUNT);
                }
                else if ($action == scene2d.CharAction.WALK) {
                    _super.prototype.play.call(this, scene2d.CharAction.WALK_MOUNT);
                }
                else {
                    if (this.mountChar.visible) {
                        _super.prototype.play.call(this, scene2d.CharAction.STAND_MOUNT);
                    }
                    else {
                        _super.prototype.play.call(this, scene2d.CharAction.JUMP);
                    }
                }
                return this.mountChar.play($action, $completeState, needFollow);
            }
            else {
                return _super.prototype.play.call(this, $action, $completeState, needFollow);
            }
        };
        SceneChar.prototype.getCurrentAction = function () {
            if (this.isMount) {
                return this.mountChar.curentAction;
            }
            else {
                return this.curentAction;
            }
        };
        SceneChar.prototype.getSceneCharAvatarUrl = function (num) {
            var $tempNum = String(num);
            if (num == 0) {
                //console.log("衣服为0")
                throw new Error("衣服为getSceneCharAvatarUrl");
            }
            var $url = getRoleUrl($tempNum);
            return $url;
        };
        SceneChar.prototype.setMount = function ($mountId) {
            if (!this.mountChar) {
                this.mountChar = new scene2d.MountChar();
            }
            this.mountChar.x = this.px;
            this.mountChar.y = this.py;
            this.mountChar.z = this.pz;
            this.mountChar.rotationY = this._pRotationY;
            this.mountChar.setRoleUrl(getRoleUrl($mountId));
            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
            SceneManager.getInstance().addMovieDisplay(this.mountChar);
            this.play(this.curentAction);
        };
        SceneChar.prototype.setWing = function ($wingId) {
            if (!this._wingDisplay) {
                this._wingDisplay = new Display3dMovie();
            }
            this._wingDisplay.setRoleUrl(getRoleUrl($wingId));
            this._wingDisplay.setBind(this, SceneChar.WING_SLOT);
            SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
        };
        SceneChar.prototype.setWeapon = function (num) {
            if (this._weaponNum == num) {
                return;
            }
            this._weaponNum = num;
            if (num <= 0) {
                this.removePart(SceneChar.WEAPON_PART);
            }
            else {
                this.setWeaponByAvatar(this._weaponNum);
            }
        };
        SceneChar.prototype.setWeaponByAvatar = function (avatar, $suffix) {
            if ($suffix === void 0) { $suffix = ""; }
            this.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(avatar, $suffix));
        };
        SceneChar.prototype.addTestWeapon = function () {
            this.addPart("test" + Math.random(), SceneChar.WEAPON_DEFAULT_SLOT, this.getSceneCharWeaponUrl(Math.random() > 0.5 ? 5202 : 5201));
        };
        SceneChar.prototype.onMeshLoaded = function () {
            if (this._skinMesh) {
                this.tittleHeight = this._skinMesh.tittleHeight;
            }
        };
        SceneChar.prototype.updateFrame = function (t) {
            _super.prototype.updateFrame.call(this, t);
            if (this.curentAction != scene2d.CharAction.WALK) {
                this.play(scene2d.CharAction.WALK);
            }
            if (this._rotationMatrix) {
                this.rotationToNew(this.toRotationY, 2);
            }
        };
        //平滑num=1为直接
        SceneChar.prototype.rotationToNew = function (value, num) {
            if (num === void 0) { num = 1; }
            var anum = value - this.pRotationY;
            if (anum == 0) {
                return;
            }
            if (anum < 1) {
                this.pRotationY = value;
                return;
            }
            var a = ((value - this.pRotationY) % 360 + 360) % 360;
            if (a > 180) {
                this.pRotationY -= (360 - a) / num;
            }
            else {
                this.pRotationY += a / num;
            }
        };
        SceneChar.prototype.mathAngle = function (x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        };
        SceneChar.prototype.stopMove = function () {
            this.play(scene2d.CharAction.STANAD);
        };
        SceneChar.prototype.watch = function ($obj, $syn) {
            if ($syn === void 0) { $syn = false; }
            if (!$obj) {
                //console.log("面向对象无")
                return;
            }
            var xx = $obj.x - this.px;
            var yy = $obj.z - this.pz;
            var distance = Math.sqrt(xx * xx + yy * yy);
            xx /= distance;
            yy /= distance;
            var angle = Math.asin(xx) / Math.PI * 180;
            if (yy <= 0) {
                angle = 180 - angle;
            }
            if (!isNaN(angle)) {
                this.forceRotationY = angle;
            }
        };
        SceneChar.prototype.getCurrentPos = function () {
            return new Vector3D(this.px, this.py, this.pz);
        };
        SceneChar.prototype.playSkill = function ($skill) {
            SkillManager.getInstance().playSkill($skill);
            this.skillVo = $skill;
        };
        SceneChar.prototype.msgSpellStop = function () {
            if (this.skillVo) {
                ////console.log("停止技能播放");
                this.skillVo.removeSkillForce();
                this.changeAction(this._defaultAction);
                this.skillVo = null;
            }
            this.isSinging = false;
        };
        SceneChar.prototype.destory = function () {
            if (this._hasDestory) {
                return;
            }
            _super.prototype.destory.call(this);
            if (this.skillVo) {
                this.skillVo.removeSkillForce();
                this.skillVo = null;
            }
            if (this._wingDisplay) {
                this._wingDisplay.destory();
            }
            this._hasDestory = true;
        };
        SceneChar.prototype.removeStage = function () {
            _super.prototype.removeStage.call(this);
            if (this.mountChar) {
                SceneManager.getInstance().removeMovieDisplay(this.mountChar);
            }
            if (this._wingDisplay) {
                SceneManager.getInstance().removeMovieDisplay(this._wingDisplay);
            }
        };
        SceneChar.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            if (this.mountChar) {
                SceneManager.getInstance().addMovieDisplay(this.mountChar);
            }
            if (this._wingDisplay) {
                SceneManager.getInstance().addMovieDisplay(this._wingDisplay);
            }
        };
        SceneChar.prototype.math_distance = function ($other) {
            return MathClass.math_distance(this.px, this.pz, $other.x, $other.z);
        };
        Object.defineProperty(SceneChar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                this.applyVisible();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "optimization", {
            get: function () {
                return this._optimization;
            },
            set: function (value) {
                this._optimization = value;
                this.applyVisible();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneChar.prototype, "resultVisible", {
            get: function () {
                return this._resultVisible;
            },
            enumerable: true,
            configurable: true
        });
        SceneChar.prototype.applyVisible = function () {
            var value = this._visible;
            if (this._visible) {
                if (this._optimization) {
                    value = false;
                }
                else {
                    value = true;
                }
            }
            else {
                value = false;
            }
            if (this._partDic) {
                if (this._partDic[SceneChar.WEAPON_PART]) {
                    for (var _i = 0, _a = this._partDic[SceneChar.WEAPON_PART]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        obj.sceneVisible = value;
                    }
                }
            }
            // if (this._wingDisplay) {
            // 	this._wingDisplay.visible = value;
            // }
            this.shadow = value;
            this._resultVisible = value;
        };
        SceneChar.prototype.update = function () {
            if (!this._skinMesh) {
                return;
            }
            if (this._optimization) {
                return;
            }
            _super.prototype.update.call(this);
            if (this._showHitBox) {
                if (!this.lineSprite) {
                    ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
                    this.lineSprite = new LineDisplaySprite();
                    this.lineSprite.clear();
                    for (var i = 0; i < this.triIndex.length / 3; i++) {
                        var a = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 0]];
                        var b = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 1]];
                        var c = this._skinMesh.hitPosItem[this.triIndex[i * 3 + 2]];
                        this.lineSprite.makeLineMode(a, b);
                        this.lineSprite.makeLineMode(b, c);
                        this.lineSprite.makeLineMode(c, a);
                    }
                    this.lineSprite.upToGpu();
                }
                this.lineSprite.posMatrix = this.posMatrix.clone();
                this.lineSprite.update();
            }
        };
        SceneChar.prototype.mouseClik = function ($lineA, $lineB) {
            var $pos = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos());
            if ($pos.z < Scene_data.cam3D.distance / 3) {
                return null;
            }
            var hitVec2 = MathUtil.math3DWorldtoDisplay2DPos($lineB);
            if (this._skinMesh) {
                if (!this.hitBox2DItem) {
                    this.hitBox2DItem = new Array;
                }
                this.hitBox2DItem.length = 0;
                for (var j = 0; j < this._skinMesh.hitPosItem.length; j++) {
                    var temppp = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j]);
                    this.hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp));
                }
                for (var i = 0; i < this.triIndex.length / 3; i++) {
                    TestTriangle.baseTri.p1 = this.hitBox2DItem[this.triIndex[i * 3 + 0]];
                    TestTriangle.baseTri.p2 = this.hitBox2DItem[this.triIndex[i * 3 + 1]];
                    TestTriangle.baseTri.p3 = this.hitBox2DItem[this.triIndex[i * 3 + 2]];
                    if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
                        return true;
                    }
                }
            }
            else {
                if (Vector2D.distance(hitVec2, MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 20) {
                    return true;
                }
            }
            return false;
        };
        return SceneChar;
    }(scene2d.SceneBaseChar));
    SceneChar.Defaul_Man_Avatar = 2002; //男
    SceneChar.Defaul_WoMan_Avater = 2012; //女
    SceneChar.WEAPON_PART = "weapon";
    SceneChar.WEAPON_DEFAULT_SLOT = "w_01";
    SceneChar.MOUNT_SLOT = "mount_01";
    SceneChar.WING_SLOT = "wing_01";
    SceneChar.SEL_PART = "select";
    SceneChar.QUEST_ICON = "questicon";
    SceneChar.NONE_SLOT = "none";
    scene2d.SceneChar = SceneChar;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=SceneChar.js.map