var engine;
(function (engine) {
    var material;
    (function (material) {
        var DynamicBaseTexItem = (function () {
            function DynamicBaseTexItem() {
            }
            DynamicBaseTexItem.prototype.destory = function () {
                if (this.textureRes) {
                    this.textureRes.useNum--;
                }
                this.target = null;
            };
            Object.defineProperty(DynamicBaseTexItem.prototype, "texture", {
                get: function () {
                    if (this.textureRes) {
                        return this.textureRes.texture;
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            return DynamicBaseTexItem;
        }());
        material.DynamicBaseTexItem = DynamicBaseTexItem;
    })(material = engine.material || (engine.material = {}));
})(engine || (engine = {}));
//# sourceMappingURL=DynamicBaseTexItem.js.map