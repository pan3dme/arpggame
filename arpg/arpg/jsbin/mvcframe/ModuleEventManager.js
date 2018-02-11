var ModuleEventManager = (function () {
    function ModuleEventManager() {
    }
    ModuleEventManager.addEvents = function (ary, $fun, $thisObj) {
        for (var i = 0; i < ary.length; i++) {
            ModuleEventManager._instance.addEventListener(ary[i].type, $fun, $thisObj);
        }
    };
    ModuleEventManager.dispatchEvent = function ($event) {
        ModuleEventManager._instance.dispatchEvent($event);
    };
    return ModuleEventManager;
}());
ModuleEventManager._instance = new EventDispatcher();
//# sourceMappingURL=ModuleEventManager.js.map