var engine;
(function (engine) {
    var events;
    (function (events) {
        var BaseEvent = (function () {
            function BaseEvent($type) {
                this.type = $type;
            }
            return BaseEvent;
        }());
        BaseEvent.COMPLETE = "complete";
        events.BaseEvent = BaseEvent;
    })(events = engine.events || (engine.events = {}));
})(engine || (engine = {}));
//# sourceMappingURL=Event.js.map