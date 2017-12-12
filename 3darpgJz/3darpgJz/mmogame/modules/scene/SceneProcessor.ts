class SceneEvent extends BaseEvent {
    public static SCENE_NEW_ACHIEVEMENT_EVENT = "SCENE_NEW_ACHIEVEMENT_EVENT";
    public static SCENE_NEW_DESIGNATION_EVENT = "SCENE_NEW_DESIGNATION_EVENT";
    public static SCENE_NEW_WEAPONS_EVENT = "SCENE_NEW_WEAPONS_EVENT";


    public data: any
}

class SceneModule extends Module {
    public getModuleName(): string {
        return "SceneModule";
    }
    protected listProcessors(): Array<Processor> {
        return [new SceneProcessor()];
    }

}
class SceneProcessor extends BaseProcessor {
    public getName(): string {
        return "SceneProcessor";
    }
    protected receivedModuleEvent($event: BaseEvent): void {
        var $sceneEvent: SceneEvent = <SceneEvent>$event;
        if ($sceneEvent.type == SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT) {
            this.popnewachieventpanel($sceneEvent.data);
        } else if ($sceneEvent.type == SceneEvent.SCENE_NEW_DESIGNATION_EVENT) {
            this.popnewdesignationpanel($sceneEvent.data);
        }

    }
    private popnewachieventpanel($data: any): void {
        PopNewPromptUtil.show(PopNewPromptUtil.NEW_ACHIEVEMENT, $data);
    }
    private popnewdesignationpanel($data: any): void {
        PopNewPromptUtil.show(PopNewPromptUtil.NEW_DESIGNATION, $data);
    }
    protected listenModuleEvents(): Array<BaseEvent> {

        return [
            new SceneEvent(SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT),
            new SceneEvent(SceneEvent.SCENE_NEW_DESIGNATION_EVENT),
            new SceneEvent(SceneEvent.SCENE_NEW_WEAPONS_EVENT),
            new EngineEvent(EngineEvent.CREAT_SCENE_EVENT),

        ];

    }
    public smsgMapUpdataObject($byte: ByteArray): void {
        GuidObjManager.getInstance().ApplyBlock($byte);
    }
    public smsgNoticeWatcherMapInfo($byte: ByteArray): void {

        var $vo: s2c_notice_watcher_map_info = new s2c_notice_watcher_map_info()
        s2c_notice_watcher_map_info.read($vo, $byte)
        console.log("观察者信息", $vo);
    }

    public newWeapons($byte: ByteArray): void {
        var sfdc: s2c_bag_find_equip_better = new s2c_bag_find_equip_better();
        s2c_bag_find_equip_better.read(sfdc, $byte);

        // UseItemPanel.getInstance().show(sfdc.item_id, "", true, sfdc.pos, 5000);

        var vo: newbieguide.UseItemVo = new newbieguide.UseItemVo;
        vo.itemId = sfdc.item_id;
        vo.time = 5000;
        vo.guid = "";
        vo.equPos = sfdc.pos;
        vo.num = 1;
        vo.force = sfdc.force

        var $evt = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_USEITEM_EVENT)
        $evt.data = vo;
        ModuleEventManager.dispatchEvent($evt);

    }

    public msgDeath($byte: ByteArray): void {
        var sfdc: s2c_field_death_cooldown = new s2c_field_death_cooldown();
        s2c_field_death_cooldown.read(sfdc, $byte);

        console.log("---死亡面板-==");
        //var evt:
        // if (sfdc.type == SharedDef.DEAD_PLACE_TYPE_XIANFU) {
        //     var evt: kuafu.XianFuEvent = new kuafu.XianFuEvent(kuafu.XianFuEvent.XIANFU_DEATH_EVENT);
        //     evt.data = sfdc;
        //     ModuleEventManager.dispatchEvent(evt);
        // } else {//普通野外复活
        //     DeathPanel.show("[d6e7ff]你被[ce0a00]" + getBaseName(sfdc.killername) + "[d6e7ff]击败了",
        //         null,
        //         "[d6e7ff]秒后自动随机复活", 10, 10, 1,
        //         () => { NetManager.getInstance().protocolos.gold_respawn(1) },
        //         () => { NetManager.getInstance().protocolos.xianfu_random_respawn() });
        // }
        DeathPanel.show(sfdc.type, sfdc.value, sfdc.cooldown);
    }

    public smsgShowUnitAttribute($byte: ByteArray): void {
        var $len: number = $byte.readUint16();
        console.log($len)
        for (var i: number = 0; i < $len; i++) {
            var id: number = $byte.readUint32();
            var num: number = $byte.readUint32();
            console.log(getKeyProById(id - 1), ":", num);

        }
        console.log("----------------------------------");
    }

    public smsgShowLoot($byte: ByteArray): void {
        var sla: s2c_show_loot_animate = new s2c_show_loot_animate();
        s2c_show_loot_animate.read(sla, $byte);
        console.log(sla.info);

        var ary: Array<string> = sla.info.split(",");
        var size: number = ary.length / 2;

        var posAry: Array<Vector2D> = this.getPosList(new Vector2D(Number(ary[0]), Number(ary[1])), size - 1);

        var scAry: Array<SceneLoot> = new Array;

        

        for (var i: number = 1; i < size; i++) {
            var item: tb.TB_item_template = tb.TB_item_template.get_TB_item_template(Number(ary[i * 2]));
            var urlName: string;
            if (item.type_c == 1) {//装备

            } else {

            }

            var sc: SceneLoot = new SceneLoot()
            sc.setShadowSize(10);
            sc.setAvatar(6500);
            sc.showName(getColorQua(item.quality) + item.name);
            sc.forceRotationY = 180 - Scene_data.gameAngle;
            var p2d: Vector2D = posAry[i - 1]
            sc.gridX = p2d.x;
            sc.gridY = p2d.y;
            sc.moveToPos2D = p2d;
            GameInstance.addSceneChar(sc);
            sc.data = { item: item, num: ary[i * 2 + 1] ,idx:i}

            scAry.push(sc);

            var t: number = 1000 * Math.random();
            this.showLoot(2000 + t, sc);
            this.hideLoot(3000 + t, sc);
            // TimeUtil.addTimeOut(2000 + t,()=>{
            //     var obj:any = sc;
            //     TweenLite.to(obj,1,{px:tpos.x,py:tpos.y,pz:tpos.z});
            // })
            // TimeUtil.addTimeOut(3000 + t,()=>{
            //     GameInstance.removeSceneChar(sc);
            //     sc.destory();
            // })
        }




        // TimeUtil.addTimeOut(2000, () => {
        //     for (var i: number = 0; i < scAry.length; i++) {
        //         var obj: any = scAry[i];
        //         TweenLite.to(obj, 1, { px: tpos.x, py: tpos.y, pz: tpos.z });

        //         var data: any = scAry[i].data;
        //         var $str: string = "[FFE57E]获得 " + getColorQua(data.item.quality) + data.item.name + "[FFE57E]×" + data.num;
        //         this.showTempTime(i * 150, $str, 3);
        //     }
        // });

        // TimeUtil.addTimeOut(3000, () => {
        //     for (var i: number = 0; i < scAry.length; i++) {
        //         GameInstance.removeSceneChar(scAry[i]);
        //         scAry[i].destory();
        //     }
        // });
    }

    public showLoot(time: number, obj: any): void {
        TimeUtil.addTimeOut(time, () => {
            var tpos: Vector3D = MathUtil.mathDisplay2Dto3DWorldPos(new Vector2D(BagData.uipos.x, BagData.uipos.y));
            TweenLite.to(obj, 1, { px: tpos.x, py: tpos.y, pz: tpos.z,scale:0.5 });
            var data: any = obj.data;
            var $str: string = "[FFE57E]获得 " + getColorQua(data.item.quality) + data.item.name + "[FFE57E]×" + data.num;
            this.showTempTime(data.idx * 150, $str, 3);
        })
    }
    public hideLoot(time: number, obj: SceneChar): void {
        TimeUtil.addTimeOut(time, () => {
            GameInstance.removeSceneChar(obj);
            obj.destory();
        })
    }

    private showTempTime($time: number, $str: string, $type: number): void {
        TimeUtil.addTimeOut($time, () => {
            msgtip.MsgTipManager.outStr($str, msgtip.MsgTipManager.getPopTypeByTB($type));
        });

    }

    private offsetAry: Array<Vector2D>;
    private createOffset(size: number, keyDic: any): void {
        for (var i: number = -size; i <= size; i++) {
            for (var j: number = -size; j <= size; j++) {
                var key: string = i + "," + j;
                if (!keyDic[key]) {
                    this.offsetAry.push(new Vector2D(i * 2, j * 2));
                    keyDic[key] = true;
                }
            }
        }
        if (size < 6) {
            this.createOffset(size + 1, keyDic);
        }
    }

    private getOffsetAry(): Array<Vector2D> {
        if (this.offsetAry) {
            return this.offsetAry;
        }
        this.offsetAry = new Array();
        var dic: any = new Object;
        this.offsetAry.push(new Vector2D(0, 0));
        dic["0,0"] = true;
        this.createOffset(1, dic);
        return this.offsetAry;
    }

    private getPosList(basePos: Vector2D, size: number): Array<Vector2D> {
        var basePosAry: Array<Vector2D> = this.getOffsetAry();
        var flag: number = 0;
        var ary: Array<Vector2D> = new Array;
        for (var i: number = 0; i < size;) {
            var tpos: Vector2D = basePosAry[flag];
            flag++;
            tpos = tpos.add(basePos);
            if (!AstarUtil.isGridCanWalk(tpos)) {
                continue;
            }
            i++;
            ary.push(tpos);
        }
        return ary;

    }




    public getHanderMap(): Object {
        var obj: Object = new Object;
        obj[Protocols.SMSG_MAP_UPDATE_OBJECT] = ($byte: ByteArray) => { this.smsgMapUpdataObject($byte) };
        obj[Protocols.SMSG_NOTICE_WATCHER_MAP_INFO] = ($byte: ByteArray) => { this.smsgNoticeWatcherMapInfo($byte) };
        obj[Protocols.SMSG_FIELD_DEATH_COOLDOWN] = ($byte: ByteArray) => { this.msgDeath($byte) };
        obj[Protocols.SMSG_BAG_FIND_EQUIP_BETTER] = ($byte: ByteArray) => { this.newWeapons($byte) };

        obj[Protocols.SMSG_SHOW_UNIT_ATTRIBUTE] = ($byte: ByteArray) => { this.smsgShowUnitAttribute($byte) };

        obj[Protocols.SMSG_SHOW_LOOT_ANIMATE] = ($byte: ByteArray) => { this.smsgShowLoot($byte) };

        return obj;
    }
}




