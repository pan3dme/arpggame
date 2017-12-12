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

    public getHanderMap(): Object {
        var obj: Object = new Object;
        obj[Protocols.SMSG_MAP_UPDATE_OBJECT] = ($byte: ByteArray) => { this.smsgMapUpdataObject($byte) };
        obj[Protocols.SMSG_NOTICE_WATCHER_MAP_INFO] = ($byte: ByteArray) => { this.smsgNoticeWatcherMapInfo($byte) };
        obj[Protocols.SMSG_FIELD_DEATH_COOLDOWN] = ($byte: ByteArray) => { this.msgDeath($byte) };
        obj[Protocols.SMSG_BAG_FIND_EQUIP_BETTER] = ($byte: ByteArray) => { this.newWeapons($byte) };

        obj[Protocols.SMSG_SHOW_UNIT_ATTRIBUTE] = ($byte: ByteArray) => { this.smsgShowUnitAttribute($byte) };




        return obj;
    }
}




