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
var CharShow;
(function (CharShow) {
    var TpSceneModule = /** @class */ (function (_super) {
        __extends(TpSceneModule, _super);
        function TpSceneModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TpSceneModule.prototype.getModuleName = function () {
            return "TpSceneModule";
        };
        TpSceneModule.prototype.listProcessors = function () {
            return [new TpSceneProcessor()];
        };
        return TpSceneModule;
    }(Module));
    CharShow.TpSceneModule = TpSceneModule;
    var TpSceneEvent = /** @class */ (function (_super) {
        __extends(TpSceneEvent, _super);
        function TpSceneEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //展示面板
        TpSceneEvent.SHOW_TP_SCENE_EVENT = "SHOW_TP_SCENE_EVENT";
        TpSceneEvent.ENTER_SCENE_EVENT = "ENTER_SCENE_EVENT";
        return TpSceneEvent;
    }(BaseEvent));
    CharShow.TpSceneEvent = TpSceneEvent;
    var TpSceneProcessor = /** @class */ (function (_super) {
        __extends(TpSceneProcessor, _super);
        function TpSceneProcessor() {
            return _super.call(this) || this;
        }
        TpSceneProcessor.prototype.getName = function () {
            return "TpSceneProcessor";
        };
        TpSceneProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TpSceneEvent) {
                var $tpMenuEvent = $event;
                if ($tpMenuEvent.type == TpSceneEvent.SHOW_TP_SCENE_EVENT) {
                    this.addGridLineSprite();
                    var $role = getUrlParam("role");
                    if ($role) {
                        this.makeUrlParamList();
                    }
                    else {
                        window.location.href = "index.html?role=50001&mount=4104&wing=902&&weapon=50011&action=0";
                    }
                    Scene_data.cam3D.distance = 250;
                }
            }
        };
        TpSceneProcessor.prototype.makeUrlParamList = function () {
            //?role=50006&mount=5104&wing=901&&weapon=50011;
            var $sc = new CharShow.ModelSceneChar();
            var $role = getUrlParam("role");
            $sc.setRoleUrl(getRoleUrl($role));
            if (getUrlParam("mount")) {
                if (Number(getUrlParam("mount")) > 0) {
                    $sc.setMountById(getUrlParam("mount"));
                }
            }
            if (getUrlParam("wing")) {
                if (Number(getUrlParam("wing")) > 0) {
                    $sc.setWingByID(getUrlParam("wing"));
                }
            }
            if (Number(getUrlParam("weapon"))) {
                $sc.setWeaponByAvatar(Number(getUrlParam("weapon")));
            }
            SceneManager.getInstance().addMovieDisplay($sc);
            this.mainChar = $sc;
            var $actionId = Number(getUrlParam("action"));
            switch ($actionId) {
                case 1:
                    $sc.play(CharAction.WALK);
                    break;
                case 2:
                    $sc.play(CharAction.DEATH);
                    break;
                case 3:
                    $sc.play(CharAction.ATTACK_01);
                    break;
                case 4:
                    $sc.play(CharAction.ATTACK_02);
                    break;
                case 5:
                    $sc.play(CharAction.ATTACK_03);
                    break;
                case 6:
                    $sc.play("m_attack_01");
                    break;
                case 7:
                    $sc.play("m_attack_02");
                    break;
                case 8:
                    $sc.play("m_attack_03");
                    break;
                case 9:
                    $sc.play("m_attack_04");
                    break;
                default:
                    $sc.play(CharAction.STANAD);
                    break;
            }
            if (getUrlParam("mount")) {
                if (Number(getUrlParam("mount")) > 0) {
                    if ($actionId == 0) {
                        $sc.play(CharAction.STAND_MOUNT);
                    }
                    else {
                        $sc.play(CharAction.WALK_MOUNT);
                    }
                }
            }
        };
        TpSceneProcessor.prototype.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            var $GridLineSprite = new GridLineSprite();
            $GridLineSprite.y = 0;
            SceneManager.getInstance().addDisplay($GridLineSprite);
            SceneManager.getInstance().ready = true;
        };
        TpSceneProcessor.prototype.listenModuleEvents = function () {
            return [
                new TpSceneEvent(TpSceneEvent.SHOW_TP_SCENE_EVENT),
            ];
        };
        return TpSceneProcessor;
    }(BaseProcessor));
    CharShow.TpSceneProcessor = TpSceneProcessor;
})(CharShow || (CharShow = {}));
//# sourceMappingURL=TpSceneProcessor.js.map