var engine;
(function (engine) {
    var particle;
    (function (particle) {
        var ctrl;
        (function (ctrl) {
            var KeyFrame = (function () {
                function KeyFrame() {
                }
                return KeyFrame;
            }());
            ctrl.KeyFrame = KeyFrame;
        })(ctrl = particle.ctrl || (particle.ctrl = {}));
    })(particle = engine.particle || (engine.particle = {}));
})(engine || (engine = {}));
//# sourceMappingURL=KeyFrame.js.map