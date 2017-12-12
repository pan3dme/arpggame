class GuidObjManager extends GuidObjectTable {

    private static _instance: GuidObjManager;
    public static getInstance(): GuidObjManager {
        if (!this._instance) {
            this._instance = new GuidObjManager();
        }
        return this._instance;
    }

    public constructor() {
        super();

        this._hashGUID = (guid: string) => {

            if (ObjectDef.UNIT == ObjectDef.getPrefix(guid)) {

                return ObjectDef.getGUIDIndex(guid);
            } else if (ObjectDef.LOOT == ObjectDef.getPrefix(guid)) {

                return ObjectDef.getGUIDIndex(guid);
            } else {
                return 0;
            }

        }
    }

    //public player: PlayerGuidObject;
    //public map: MapInfo;
    //public bag: BagData;


    public CreateObject(k: string): GuidObject {
        //console.log("创--------------------------------建：",k);
        var p: GuidObject = this._objs[k];
        if (!p) {
            var types: string = ObjectDef.getPrefix(k);
            if (types == ObjectDef.STRENGTH) {
                p = new StrengGuidObject(k);
            } else if (types == ObjectDef.MAP) {
                p = new MapInfo(k);
                GuidData.map = <MapInfo>p;
            } else if (types == ObjectDef.UNIT) {
                p = new Unit(k);
            } else if (types == ObjectDef.LOOT) {
                p = new Loot(k);
            } else if (types == ObjectDef.PLAYER) {
                p = new PlayerGuidObject(k);
                GuidData.player = <PlayerGuidObject>p;
            } else if (types == ObjectDef.BAG) {
                p = new BagData(k);
                GuidData.bag = <BagData>p;
            } else if (types == ObjectDef.FACTION) {
                p = new FactionData(k);
                GuidData.faction = <FactionData>p;
            } else if (types == ObjectDef.GROW) {
                p = new GrowData(k);
                GuidData.grow = <GrowData>p;
            } else if (types == ObjectDef.INSTANCE) {
                p = new InstanceData(k);
                GuidData.instanceData = <InstanceData>p;
            } else if (types == ObjectDef.SOCIAL) {
                p = new SocialData(k);
                GuidData.social = <SocialData>p;
            } else if (types == ObjectDef.EMAIL) {
                p = new GiftPacksData(k);
                GuidData.giftPacks = <GiftPacksData>p;
            } else if (types == ObjectDef.QUEST) {
                p = new QuestData(k);
                GuidData.quest = <QuestData>p;
            } else if (types == ObjectDef.GLOBEL) {
                if (k == ObjectDef.GLOBAL_VALUE) {
                    p = new GlobelValueData(k);
                    GuidData.globelValue = <GlobelValueData>p;
                } else {
                    p = new GuidObject(k);
                }
            }else {
                p = new GuidObject(k);
            }

            p.guid = k;

            //  console.log(p);


        }



        this.AttachObject(p);
        return p;
    }

    public getGuidObject(preStr: string): GuidObject {

        for (var key in this._objs) {
            if (key.charAt(0) == preStr) {
                return this._objs[key];
            }
        }

        return null;
    }

    public getUnitByID($id: number): Unit {
        var guid: string = this._u_2_guid[$id];
        if (guid) {
            var unit: Unit = this._objs[guid];
            return unit;
        }
        return null;
    }
    public applyJumpShow(u_guid: number, $arr: Array<Array<number>>, $t: number): void {

        var guid: string = this._u_2_guid[u_guid];
        if (guid) {
            var $unit: Unit = this._objs[guid];
            $unit.setJumpShow($arr, $t);
        }

    }
    public msgSpellStop($guid: string): void {

        var $unit: Unit = this._objs[$guid];
        if ($unit) {
            $unit.msgSpellStop();
        }
    }


    public applyGridJump($byte: ByteArray): void {
        var count: number = $byte.readShort();

        for (var i: number = 0; i < count; i++) {
            var u_guid: number = $byte.readUnsignedInt();
            var xpos: number = $byte.readUnsignedShort();
            var ypos: number = $byte.readUnsignedShort();

            var guid: string = this._u_2_guid[u_guid];
            if (guid) {
                var $unit: Unit = this._objs[guid];
                $unit.setJump(new Vector2D(xpos, ypos));
                if ($unit.isMain) {
                    var $mainEvent: mainUi.MainUiEvent = new mainUi.MainUiEvent(mainUi.MainUiEvent.PLAYER_SKILL_CD_REFRESH)
                    $mainEvent.data = 1; //跳跃技能CD为1
                    ModuleEventManager.dispatchEvent($mainEvent);
                }
            }
        }

    }

    public applyGridMove($byte: ByteArray): void {
        var count: number = $byte.readShort();
        for (var i: number = 0; i < count; i++) {
            var u_guid: number = $byte.readUnsignedInt();
            var b: number = $byte.readByte();//标志位 FIXME
            var path: Array<Vector2D> = new Array;
            var xpos: number = $byte.readUnsignedShort();
            var ypos: number = $byte.readUnsignedShort();
            path.push(new Vector2D(xpos, ypos));
            var pathlen: number = $byte.readUnsignedShort();
            for (var j: number = 0; j < pathlen; j += 2) {
                xpos += $byte.readByte();
                ypos += $byte.readByte();
                var pos: Vector2D = new Vector2D(xpos, ypos);
                path.push(pos);
            }
            var guid: string = this._u_2_guid[u_guid];
            if (guid) {
                var unit: Unit = this._objs[guid];
                unit.setPath(path);
            }
        }

    }

    public applyGridStop($byte: ByteArray): void {

        var u_guid: number = $byte.readUnsignedInt();
        var xpos: number = $byte.readUnsignedShort();
        var ypos: number = $byte.readUnsignedShort();
        //console.log("---收到停止消息" + 　u_guid);
        var guid: string = this._u_2_guid[u_guid];
        if (guid) {
            var unit: Unit = this._objs[guid];
            unit.stop(xpos, ypos);
        }

    }



}