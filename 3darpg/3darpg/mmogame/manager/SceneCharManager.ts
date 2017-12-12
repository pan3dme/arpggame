class SceneCharManager {
    private static _instance: SceneCharManager;
    public static getInstance(): SceneCharManager {
        if (!this._instance) {
            this._instance = new SceneCharManager();
        }
        return this._instance;
    }

    public creatChar($unit: Unit): boolean {
        

        var utype: number = $unit.getTypeID();
        var roleAvatar: number = 0;
        var sc: SceneChar;
        if (utype == SharedDef.TYPEID_UNIT) {
            roleAvatar = $unit.getAvatar();
            if (roleAvatar == 0) {
                var entry = $unit.getEntry();
                roleAvatar = tb.TB_creature_template.get_TB_creature_template(entry).avatar
            } else {
                roleAvatar = tb.TB_item_template.getAvatarById(roleAvatar)
            }
            sc = this.getSceneChar();

        } else if (utype == SharedDef.TYPEID_PLAYER) {
            //roleAvatar = $unit.getTabelAvater($unit.getAvatar())
            sc = this.getSceneChar();
        } else if (utype == SharedDef.TYPEID_GAMEOBJECT) {
            var entry = $unit.getEntry();
            var $tb_gameobject_template: tb.TB_gameobject_template = tb.TB_gameobject_template.get_TB_gameobject_template(entry)
            roleAvatar = $tb_gameobject_template.avatar;
            var judge = $tb_gameobject_template.judge;
            if (judge == 1) {  //野外BOSS宝箱
                sc = this.getCollection();
                (<SceneCollection>sc).setSpecialType(judge);
            } else {
                sc = this.getScenePortal();
                (<ScenePortal>sc).tb = $tb_gameobject_template;
            }
        }

        if (!sc) {
            console.log("没创建正确的对象")
        }

        $unit.sceneChar = sc;
        sc.unit = $unit;

        if (ObjectDef.testUG($unit.guid, GuidData.player.guid)) {
            $unit.isMain = true;
            GameInstance.mainChar = sc;
            Scene_data.cam3D.lookAtTarget = GameInstance.mainChar;
            sc.setHp(sc.unit.getHp());
            // this.sendGm();
            console.log("角色创建自己==========>", $unit.guid, sc.unit.getHp(), sc.unit.getMaxHp());
            console.log("----------------------------------");
        }

        if (utype == SharedDef.TYPEID_PLAYER) {
            sc.setAvatarExterior();
            sc.setWeaponDivine();
        } else {
            sc.setAvatar(roleAvatar);
        }

        GameInstance.addSceneChar(sc);
        sc.setMount();
        sc.setWing();
        sc.showName();
        if (sc.unit.isPlayer()) {
            sc.refreshTittle();
            sc.showBlood(0);
        } else {
            sc.showBlood(1);
        }
        sc.refreshUnitFieldByte();
        if($unit.isSkillNpc()){
            sc.meshVisible = false;
        }
        

        //console.log("创建角色");
        return true;
    }

    public sendGm(): void {
        if (GuidData.player && GameData.initGMbg) {

            // NetManager.getInstance().protocolos.chat_world(GuidData.player.getGuid(), 0, GuidData.player.getName(), "@CUSTOM");

            if (GameStart.outNet) {
                // GameControlManager.sendGmCom("@CUSTOM")
            }

            GameData.initGMbg = false;
        }

    }


    public removeSceneChar($sc: SceneChar): void {
        if ($sc.unit.isMain) {
            console.log("移除自己")
        }
        GameInstance.removeSceneChar($sc);
        $sc.destory();

    }

    private getSceneChar(): SceneChar {
        var char: SceneChar = new SceneChar();
        //char.setRoleUrl(getRoleUrl(name));
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    }
    private getScenePortal(): ScenePortal {
        var char: ScenePortal = new ScenePortal();
        //char.setRoleUrl(getRoleUrl(name));
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    }
    private getCollection(): SceneCollection {
        var char: SceneCollection = new SceneCollection();
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    }
    public addWarningEffectChar($pos: Vector3D, $alarmEffect: number): WarningEffectChar {
        var $sc: WarningEffectChar = new WarningEffectChar();
        $sc.x = $pos.x;
        $sc.y = $pos.y;
        $sc.z = $pos.z;
        $sc.forceRotationY = $pos.w * 180 / Math.PI + 90;
        SceneManager.getInstance().addMovieDisplay($sc);
        $sc.setSpellName($alarmEffect);
        return $sc;
    }

    private getSceneBaseCollection(): SceneBaseCollection {
        var char: SceneBaseCollection = new SceneBaseCollection();
        char.x = 0;
        char.y = 5;
        char.z = 0;
        char.setShadowSize(10);
        return char;
    }
    public getSceneCharByUID($id: number): SceneChar {
        var unit: Unit = GuidObjManager.getInstance().getUnitByID($id);
        if (unit) {
            return unit.sceneChar;
        }
        return null;
    }

} 