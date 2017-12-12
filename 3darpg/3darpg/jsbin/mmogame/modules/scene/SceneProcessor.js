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
var SceneEvent = /** @class */ (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT = "SCENE_NEW_ACHIEVEMENT_EVENT";
    SceneEvent.SCENE_NEW_DESIGNATION_EVENT = "SCENE_NEW_DESIGNATION_EVENT";
    SceneEvent.SCENE_NEW_WEAPONS_EVENT = "SCENE_NEW_WEAPONS_EVENT";
    return SceneEvent;
}(BaseEvent));
var SceneModule = /** @class */ (function (_super) {
    __extends(SceneModule, _super);
    function SceneModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneModule.prototype.getModuleName = function () {
        return "SceneModule";
    };
    SceneModule.prototype.listProcessors = function () {
        return [new SceneProcessor()];
    };
    return SceneModule;
}(Module));
var SceneProcessor = /** @class */ (function (_super) {
    __extends(SceneProcessor, _super);
    function SceneProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneProcessor.prototype.getName = function () {
        return "SceneProcessor";
    };
    SceneProcessor.prototype.receivedModuleEvent = function ($event) {
        var $sceneEvent = $event;
        if ($sceneEvent.type == SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT) {
            this.popnewachieventpanel($sceneEvent.data);
        }
        else if ($sceneEvent.type == SceneEvent.SCENE_NEW_DESIGNATION_EVENT) {
            this.popnewdesignationpanel($sceneEvent.data);
        }
    };
    SceneProcessor.prototype.popnewachieventpanel = function ($data) {
        PopNewPromptUtil.show(PopNewPromptUtil.NEW_ACHIEVEMENT, $data);
    };
    SceneProcessor.prototype.popnewdesignationpanel = function ($data) {
        PopNewPromptUtil.show(PopNewPromptUtil.NEW_DESIGNATION, $data);
    };
    SceneProcessor.prototype.listenModuleEvents = function () {
        return [
            new SceneEvent(SceneEvent.SCENE_NEW_ACHIEVEMENT_EVENT),
            new SceneEvent(SceneEvent.SCENE_NEW_DESIGNATION_EVENT),
            new SceneEvent(SceneEvent.SCENE_NEW_WEAPONS_EVENT),
            new EngineEvent(EngineEvent.CREAT_SCENE_EVENT),
        ];
    };
    SceneProcessor.prototype.smsgMapUpdataObject = function ($byte) {
        GuidObjManager.getInstance().ApplyBlock($byte);
    };
    SceneProcessor.prototype.smsgNoticeWatcherMapInfo = function ($byte) {
        var $vo = new s2c_notice_watcher_map_info();
        s2c_notice_watcher_map_info.read($vo, $byte);
        console.log("观察者信息", $vo);
    };
    SceneProcessor.prototype.newWeapons = function ($byte) {
        var sfdc = new s2c_bag_find_equip_better();
        s2c_bag_find_equip_better.read(sfdc, $byte);
        // UseItemPanel.getInstance().show(sfdc.item_id, "", true, sfdc.pos, 5000);
        var vo = new newbieguide.UseItemVo;
        vo.itemId = sfdc.item_id;
        vo.time = 5000;
        vo.guid = "";
        vo.equPos = sfdc.pos;
        vo.num = 1;
        vo.force = sfdc.force;
        var $evt = new newbieguide.NewbieguideEvent(newbieguide.NewbieguideEvent.SHOW_USEITEM_EVENT);
        $evt.data = vo;
        ModuleEventManager.dispatchEvent($evt);
    };
    SceneProcessor.prototype.msgDeath = function ($byte) {
        var sfdc = new s2c_field_death_cooldown();
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
    };
    SceneProcessor.prototype.smsgShowUnitAttribute = function ($byte) {
        var $len = $byte.readUint16();
        console.log($len);
        for (var i = 0; i < $len; i++) {
            var id = $byte.readUint32();
            var num = $byte.readUint32();
            console.log(getKeyProById(id - 1), ":", num);
        }
        console.log("----------------------------------");
    };
    SceneProcessor.prototype.getHanderMap = function () {
        var _this = this;
        var obj = new Object;
        obj[Protocols.SMSG_MAP_UPDATE_OBJECT] = function ($byte) { _this.smsgMapUpdataObject($byte); };
        obj[Protocols.SMSG_NOTICE_WATCHER_MAP_INFO] = function ($byte) { _this.smsgNoticeWatcherMapInfo($byte); };
        obj[Protocols.SMSG_FIELD_DEATH_COOLDOWN] = function ($byte) { _this.msgDeath($byte); };
        obj[Protocols.SMSG_BAG_FIND_EQUIP_BETTER] = function ($byte) { _this.newWeapons($byte); };
        obj[Protocols.SMSG_SHOW_UNIT_ATTRIBUTE] = function ($byte) { _this.smsgShowUnitAttribute($byte); };
        return obj;
    };
    return SceneProcessor;
}(BaseProcessor));
//# sourceMappingURL=SceneProcessor.js.map