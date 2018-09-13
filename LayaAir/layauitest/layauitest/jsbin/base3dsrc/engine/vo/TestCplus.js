var Test = /** @class */ (function () {
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
    Test.IMG_TYPE = 1;
    Test.OBJS_TYPE = 2;
    Test.MATERIAL_TYPE = 3;
    return Test;
}());
//# sourceMappingURL=TestCplus.js.map