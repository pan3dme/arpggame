var engine;
(function (engine) {
    var vo;
    (function (vo) {
        var Test = (function () {
            function Test() {
            }
            Test.prototype.readData = function ($bytes) {
                this._byte = $bytes;
                this.type = this._byte.readShort();
                this.name = this._byte.readUTF();
                this.age = this._byte.readInt();
            };
            Test.prototype.writeData = function () {
                this._byte.writeShort(Test.IMG_TYPE);
                this._byte.writeUTF(this.name);
                var sss = 90;
                this._byte.writeInt(sss);
            };
            return Test;
        }());
        Test.IMG_TYPE = 1;
        Test.OBJS_TYPE = 2;
        Test.MATERIAL_TYPE = 3;
        vo.Test = Test;
    })(vo = engine.vo || (engine.vo = {}));
})(engine || (engine = {}));
//# sourceMappingURL=TestCplus.js.map