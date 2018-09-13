/**
* name
*/
var scene2d;
(function (scene2d) {
    var GameInstance = (function () {
        function GameInstance() {
        }
        GameInstance.initData = function () {
            this.threeBattarId = 0;
        };
        GameInstance.getModelUrl = function (name) {
            return "lyf/" + name + getBaseUrl() + ".txt";
        };
        GameInstance.playLyf = function ($str, $pos) {
            var _this = this;
            GroupDataManager.getInstance().getGroupData(Scene_data.fileRoot + this.getModelUrl($str), function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        $particle.setPos($pos.x, $pos.y, $pos.z);
                        //  $particle.rotationY=random(360)
                        ParticleManager.getInstance().addParticle($particle);
                        //  console.log("添加一次");
                        $particle.addEventListener(BaseEvent.COMPLETE, _this.onPlayCom, _this);
                        console.log($particle.sourceData.maxTime, $str);
                        //  TweenMoveTo($particle, 2.3, { x: -200 });
                        if ($particle.sourceData.maxTime > 10000000) {
                            _this.allStr += $str;
                            _this.allStr += ",";
                            console.log(_this.allStr);
                        }
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        GameInstance.onPlayCom = function (event) {
            var $particle = event.target;
            //  console.log("移除")
            $particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
            ParticleManager.getInstance().removeParticle($particle);
        };
        return GameInstance;
    }());
    //单独在场景播放特效
    GameInstance.allStr = "";
    scene2d.GameInstance = GameInstance;
})(scene2d || (scene2d = {}));
//# sourceMappingURL=GameInstance.js.map