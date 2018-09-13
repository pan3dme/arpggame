var engine;
(function (engine) {
    var vo;
    (function (vo) {
        var collistion;
        (function (collistion) {
            var CapsuleVo = (function () {
                function CapsuleVo($radius, $height) {
                    this.radius = $radius;
                    this.height = $height;
                }
                return CapsuleVo;
            }());
            collistion.CapsuleVo = CapsuleVo;
        })(collistion = vo.collistion || (vo.collistion = {}));
    })(vo = engine.vo || (engine.vo = {}));
})(engine || (engine = {}));
//# sourceMappingURL=CapsuleVo.js.map