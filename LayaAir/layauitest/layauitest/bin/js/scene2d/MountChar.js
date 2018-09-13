var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
* name
*/
var scene2d;
(function (scene2d) {
    var MountChar = (function (_super) {
        __extends(MountChar, _super);
        function MountChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MountChar.prototype.setData = function ($rank, $iid) {
            var avatar = 0;
            if ($iid > 0) {
                avatar = $iid;
            }
            else if ($rank > 0) {
                avatar = $rank;
            }
            //  var obj:any = TableData.getInstance().getData(TableData.tb_mount_base,$rank);
            // 	var avatar:number = obj.mountID;
            avatar && this.setAvatar(avatar);
        };
        return MountChar;
    }(scene2d.SceneBaseChar));
    scene2d.MountChar = MountChar;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=MountChar.js.map